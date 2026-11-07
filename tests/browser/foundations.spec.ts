import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const viewport of [{ width: 1280, height: 900 }, { width: 360, height: 800 }]) {
  test(`brand workshop at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Progresser');
    await expect(page.getByRole('img', { name: 'Juvanga', exact: true })).toBeVisible();
    expect(await page.locator('img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await expect(page.getByText('Socle de développement', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Découvrir le principe' }).click();
    await expect(page.getByRole('button', { name: 'Masquer le principe' })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('Comprendre une idée, l’essayer')).toBeVisible();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('brand.png'), fullPage: true });
  });
}

test('keyboard and reduced motion preserve interaction', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  const toggle = page.getByRole('button', { name: 'Découvrir le principe' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#motion-detail')).toContainText('Comprendre une idée');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').trim())).toMatch(/^0(?:ms|s)$/);
});
