import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const published = JSON.parse(fs.readFileSync(new URL('../../content/public/meeting-notes-action-plan/v1.json', import.meta.url), 'utf8'));
// Only exact listed versions are readable; the next version has not been published.
const unpublished = `/learn/${published.id}/v/${published.version + 1}/${published.modules[0].lessons[0].id}`;

test('unpublished lesson stays inaccessible with helpful static and client recovery', async ({ page, browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  try {
    const staticPage = await context.newPage();
    for (const url of [unpublished, `${unpublished}/exercise`]) {
      expect((await staticPage.goto(url))?.status()).toBe(404);
      await expect(staticPage.getByRole('heading', { level: 1 })).toHaveText('Cette leçon est introuvable.');
    }
    await staticPage.getByRole('link', { name: 'Revenir aux parcours' }).click();
    await expect(staticPage).toHaveURL('/courses');
  } finally { await context.close(); }
  const html = await (await request.get(unpublished)).text();
  expect(html).not.toContain(published.modules[0].lessons[0].blocks[0].text);
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/courses');
  await page.evaluate(url => { history.pushState({}, '', url); dispatchEvent(new PopStateEvent('popstate')); }, unpublished);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette leçon est introuvable.');
  await expect(page.locator('#main')).toBeFocused();
  await expect(page).toHaveTitle('Leçon introuvable — Juvanga');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Revenir aux parcours' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/courses');
});
