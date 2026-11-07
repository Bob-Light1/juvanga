import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const course = JSON.parse(fs.readFileSync(new URL('../../content/drafts/meeting-notes-action-plan/v1.json', import.meta.url), 'utf8'));
const detail = `/courses/${course.id}`;
const routes = ['/', '/courses', detail];

for (const width of [360, 1280]) {
  test(`public navigation, history and accessible layout at ${width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    await page.evaluate(() => Object.assign(window, { navigationMarker: 'same-document' }));
    await page.getByRole('link', { name: 'Découvrir les parcours' }).click();
    await expect(page).toHaveURL('/courses');
    await expect(page.locator('#main')).toBeFocused();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Les parcours' })).toHaveAttribute('aria-current', 'page');
    await page.getByRole('link', { name: 'Voir le parcours' }).click();
    await expect(page).toHaveURL(detail);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(course.title);
    await expect(page).toHaveTitle(`${course.title} — Juvanga`);
    expect(await page.evaluate(() => (window as unknown as { navigationMarker?: string }).navigationMarker)).toBe('same-document');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', course.summary);
    await expect(page.getByText('Gratuit', { exact: true })).toBeVisible();
    await expect(page.getByText('Prochainement disponible', { exact: true })).toBeVisible();
    await expect(page.locator('main a[href^="/learn"]')).toHaveCount(0);
    await page.goBack();
    await expect(page).toHaveURL('/courses');
    await page.goForward();
    await expect(page).toHaveURL(detail);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(course.title);
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const targets = await page.locator('main a, header a').evaluateAll(links => links.map(link => ({ width: link.getBoundingClientRect().width, height: link.getBoundingClientRect().height })));
      expect(targets.every(target => target.width >= 44 && target.height >= 44)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${route === '/' ? 'home' : route === '/courses' ? 'catalogue' : 'course'}.png`), fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('initial HTML and deep links work without JavaScript, including a real HTTP 404', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  try {
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect((await request.get(route)).headers()['content-type']).toContain('text/html');
    }
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(course.title);
    await expect(page.getByText(course.summary, { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(course.title);
    await page.getByRole('link', { name: 'Revenir aux parcours' }).click();
    await expect(page).toHaveURL('/courses');
    await page.getByRole('link', { name: 'Voir le parcours' }).click();
    await expect(page).toHaveURL(detail);
    for (const route of ['/missing-page', '/courses/missing', '/courses/meeting-notes-action-plan/private']) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette page est introuvable.');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    }
  } finally { await context.close(); }
});

test('client missing-page metadata, release policy, sitemap and publication boundary agree', async ({ page, request }) => {
  await page.goto(detail);
  // Exercise client-side handling of an unknown target without a document request.
  await page.evaluate(() => { history.pushState({}, '', '/courses/unknown'); dispatchEvent(new PopStateEvent('popstate')); });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette page est introuvable.');
  await expect(page).toHaveTitle('Page introuvable — Juvanga');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page.getByRole('link', { name: 'Revenir aux parcours' }).click();
  await expect(page).toHaveURL('/courses');
  const robots = await (await request.get('/robots.txt')).text();
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const origin = robots.match(/Sitemap: (https:\/\/[^\n]+)\/sitemap.xml/)?.[1];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', origin ? 'index, follow' : 'noindex, nofollow');
    if (origin) {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', origin + route);
      expect(sitemap).toContain(`<loc>${origin}${route}</loc>`);
    } else await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    const html = await (await request.get(route)).text();
    expect(html).toContain('Gratuit');
    expect(html).not.toMatch(/100[\s\u00a0]?000|XAF|workedSolution|classify-welcome/);
    if (origin) {
      expect(html).toContain(`rel="canonical" href="${origin}${route}"`);
      expect(html).toContain('content="index, follow"');
    } else expect(html).toContain('content="noindex, nofollow"');
  }
  const html = await (await request.get(detail)).text();
  expect(html).toContain(course.title);
  expect(html).toContain(course.summary);
  const script = html.match(/src="(\/assets\/[^"\s]+\.js)"/)?.[1];
  expect(script).toBeTruthy();
  const bundle = await (await request.get(script!)).text();
  expect(bundle).not.toContain('classify-welcome');
  expect(bundle).not.toContain(course.modules[0].lessons[0].blocks[0].text);
  expect((await request.get('/content/drafts/meeting-notes-action-plan/v1.json')).status()).toBe(404);
  expect(sitemap).not.toContain('/workshop');
  expect(sitemap).not.toContain('/404');
  if (!origin) { expect(sitemap).not.toContain('<loc>'); expect(robots).toContain('Disallow: /'); }
  await page.goto('/workshop');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});
