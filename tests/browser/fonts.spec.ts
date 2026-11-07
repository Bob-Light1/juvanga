import { test, expect } from '@playwright/test';

// Capture the intentionally blocked fallback before the WOFF2 responses arrive.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';

for (const width of [360, 1280]) {
  test(`local fonts and delayed swap at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const external: string[] = [];
    page.on('request', request => {
      if (!request.url().startsWith('http://127.0.0.1:4173/')) external.push(request.url());
    });
    await page.addInitScript(() => {
      const shifts: number[] = [];
      Object.assign(window, { fontShifts: shifts });
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!shift.hadRecentInput) shifts.push(shift.value);
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    await page.route('**/fonts/*.woff2', async route => { await gate; await route.continue(); });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(250);
    await page.screenshot({ path: testInfo.outputPath('fallback.png'), fullPage: true });
    release();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => document.fonts.check('700 32px Fraunces', 'Élève œuf') && document.fonts.check('400 16px Inter', 'Élève œuf'))).toBe(true);
    expect(external).toEqual([]);
    const cls = await page.evaluate(() => (window as unknown as { fontShifts: number[] }).fontShifts.reduce((a, b) => a + b, 0));
    await testInfo.attach('font-network-and-cls', { body: JSON.stringify({ external, cls }), contentType: 'application/json' });
    expect(cls).toBeLessThan(0.01);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('local-fonts.png'), fullPage: true });
  });
}

test('brand assets remain legible at their minimum sizes', async ({ page }, testInfo) => {
  await page.goto('/');
  // This isolated review board does not add product UI or alter the artwork.
  await page.setContent(`<html lang="en"><title>Juvanga asset review</title><body style="background:#FBF3E4;padding:32px">
    <h1>Juvanga asset review</h1>
    <p>Symbol 24 / 32 px</p><img src="/brand/juvanga-symbol.svg" width="24" height="24" alt="Symbol 24"><img src="/brand/juvanga-symbol.svg" width="32" height="32" alt="Symbol 32">
    <p>ICO 16 / 32 px</p><img src="/favicon.ico" width="16" height="16" alt="Favicon 16"><img src="/favicon.ico" width="32" height="32" alt="Favicon 32">
    <p>Lockup 140 px</p><img src="/brand/juvanga-lockup.svg" width="140" alt="Lockup">
    <p>Dark lockup 140 px</p><div style="background:#14213D;padding:16px"><img src="/brand/juvanga-lockup-dark.svg" width="140" alt="Dark lockup"></div>
  </body></html>`);
  await expect(page.locator('img')).toHaveCount(6);
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('small-assets.png') });
});
