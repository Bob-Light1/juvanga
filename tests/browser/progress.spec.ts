import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('normal progress page is static, noindex and offers optional empty storage without publishing a course', async ({ page, browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  try {
    const staticPage = await context.newPage();
    expect((await staticPage.goto('/progress'))?.status()).toBe(200);
    await expect(staticPage.getByRole('heading', { name: 'Reprendre ma lecture', exact: true })).toBeVisible();
    await expect(staticPage.getByText('La reprise locale nécessite JavaScript.', { exact: false })).toBeVisible();
    await expect(staticPage.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await staticPage.getByRole('link', { name: 'Revenir aux parcours' }).click();
    await expect(staticPage).toHaveURL('/courses');
  } finally { await context.close(); }
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/progress');
  await page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' }).click();
  await expect(page.getByText('Aucune position de lecture enregistrée.', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Reprendre la lecture', exact: true })).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Effacer ma reprise sur cet appareil' }).click();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/progress');
});
