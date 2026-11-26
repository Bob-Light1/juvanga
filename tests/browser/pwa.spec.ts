import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

test('public snapshot works offline; unknown/private documents stay outside cache', async ({ page, context }, testInfo) => {
  test.setTimeout(120000);
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  // Apply failure to worker-originated fetches as well as the page's network target.
  await context.route('**/*', route => route.abort('internetdisconnected'));
  await context.setOffline(true);
  await page.goto('/courses');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Choisir un parcours.');
  // Chromium can report a connected device even while network requests are blocked.
  if (!await page.evaluate(() => navigator.onLine)) await expect(page.getByText('Votre appareil indique', { exact: false })).toBeVisible();
  const missing = await page.goto('/account?token=fictional');
  expect(missing?.status()).toBe(503);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette page nécessite une connexion');
  await expect(page.locator('script')).toHaveCount(0);
  const paths = await page.evaluate(async () => {
    const keys = await caches.keys();
    return (await Promise.all(keys.map(async key => (await (await caches.open(key)).keys()).map(request => new URL(request.url).pathname)))).flat();
  });
  expect(paths).not.toContain('/progress');
  expect(paths).not.toContain('/workshop');
  expect(paths).not.toContain('/account');
  // Only the published course is precached: its exact version 1 and latest-version aliases.
  const lessons = paths.filter(path => path.includes('/learn/'));
  expect(lessons).toContain('/learn/meeting-notes-action-plan/v/1/separate-facts-and-questions');
  expect(lessons).toContain('/learn/meeting-notes-action-plan/separate-facts-and-questions');
  expect(lessons.every(path => /^\/learn\/meeting-notes-action-plan\/(v\/1\/)?[a-z0-9-]+(\/exercise)?$/.test(path))).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('offline-fallback.png'), fullPage: true });
  await context.setOffline(false);
  await context.unroute('**/*');
  await page.goto('/courses');
  await expect(page.getByText('Votre appareil indique', { exact: false })).toHaveCount(0);
});

test('waiting release offers explicit reload and preserves consented reading storage', async ({ page }) => {
  test.setTimeout(120000);
  const file = new URL('../../apps/web/dist/sw.js', import.meta.url);
  const original = fs.readFileSync(file, 'utf8');
  try {
    await page.goto('/progress');
    await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
    await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
    await page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' }).click();
    const record = JSON.stringify({ schemaVersion: 1, consent: true, reading: { courseId: 'fixture-course', courseVersion: 1, lessonId: 'fixture-lesson', position: 635, updatedAt: '2026-11-07T12:00:00.000Z' } });
    await page.evaluate(record => { localStorage.setItem('juvanga.reading-progress', record); localStorage.setItem('unrelated', 'preserve'); Object.assign(window, { releaseMarker: 'old-page' }); }, record);
    await page.evaluate(async () => (await caches.open('unrelated-cache')).put('/unrelated', new Response('keep')));
    fs.writeFileSync(file, original.replace(/juvanga-public-([a-f0-9]{20})/, 'juvanga-public-$1-update-test'));
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.update());
    const button = page.getByRole('button', { name: 'Charger la nouvelle version' });
    await expect(button).toBeVisible({ timeout: 30000 });
    expect(await page.evaluate(() => (window as unknown as { releaseMarker: string }).releaseMarker)).toBe('old-page');
    await button.click();
    await page.waitForFunction(() => !(window as unknown as { releaseMarker?: string }).releaseMarker);
    expect(await page.evaluate(() => localStorage.getItem('juvanga.reading-progress'))).toBe(record);
    expect(await page.evaluate(() => localStorage.getItem('unrelated'))).toBe('preserve');
    const keys = await page.evaluate(() => caches.keys());
    expect(keys.filter(key => key.startsWith('juvanga-public-'))).toHaveLength(1);
    expect(keys).toContain('unrelated-cache');
  } finally { fs.writeFileSync(file, original); }
});

test('slow 4G and reduced motion measurements', async ({ page, context }, testInfo) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8, connectionType: 'cellular4g' });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    const metrics = { lcp: 0, cls: 0 };
    Object.assign(window, { publicMetrics: metrics });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) if (!entry.hadRecentInput) metrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForFunction(() => (window as unknown as { publicMetrics: { lcp: number } }).publicMetrics.lcp > 0);
  const metrics = await page.evaluate(() => ({ ...(window as unknown as { publicMetrics: object }).publicMetrics, userAgent: navigator.userAgent, resources: performance.getEntriesByType('resource').map(entry => ({ name: new URL(entry.name).pathname, transferSize: (entry as PerformanceResourceTiming).transferSize, duration: entry.duration })) }));
  await testInfo.attach('slow-4g-measurements', { body: JSON.stringify({ ...metrics, profile: { latencyMs: 150, downloadBitsPerSecond: 1600000, uploadBitsPerSecond: 750000, cpuSlowdown: 4, width: 360 } }, null, 2), contentType: 'application/json' });
  console.log('Slow 4G measurements:', JSON.stringify(metrics));
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  expect(await page.getByRole('link', { name: 'Découvrir les parcours' }).evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThan(0.001);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('slow-4g-home.png'), fullPage: true });
});

test('a refused worker leaves online reading usable and reports the limitation', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(navigator.serviceWorker, 'register', { value: () => Promise.reject(new Error('Storage denied')) }); });
  await page.goto('/');
  await expect(page.getByText('La préparation hors ligne est indisponible', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: 'Découvrir les parcours' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Choisir un parcours.');
  expect(await page.evaluate(() => caches.keys())).toEqual([]);
});
