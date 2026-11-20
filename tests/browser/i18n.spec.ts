import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [360, 1280]) test(`French catalogue and expanded text reflow at ${width}px`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ['/', '/courses', '/courses/meeting-notes-action-plan', '/workshop', '/missing']) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    if (process.env.JUVANGA_PSEUDO_LOCALE === '1') await expect(page.locator('.skip-link')).toContainText('[');
    await expect(page.getByRole('option', { name: /english|anglais/i })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    if (route === '/workshop') {
      await page.getByRole('button', { name: /Découvrir le principe/ }).click();
      await expect(page.locator('#motion-detail')).toContainText('Comprendre une idée');
      await page.getByRole('button', { name: /Vérifier mon objectif/ }).click();
      await expect(page.locator('[aria-invalid="true"]')).toBeFocused();
      await expect(page.locator('.field-error')).toContainText('Erreur');
    }
    await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll('/', '-') || 'home'}.png`), fullPage: true });
  }
});
