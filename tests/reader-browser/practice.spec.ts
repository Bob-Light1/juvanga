import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const reader = '/learn/fixture-course/v/2/fixture-lesson-1';
const exercise = `${reader}/exercise`;

for (const width of [360, 1280]) test(`attempt, compare, self-assess and retry at ${width}px without sending or persisting answers`, async ({ page }, testInfo) => {
  const writes: string[] = [];
  page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url()); });
  await page.setViewportSize({ width, height: 900 });
  await page.goto(reader);
  await page.getByRole('link', { name: 'Pratiquer et s’auto-évaluer' }).click();
  await expect(page).toHaveURL(exercise);
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.getByText('Une auto-évaluation personnelle', { exact: true })).toBeVisible();
  await expect(page.getByText('La tâche et la personne correspondent à la note.', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Un exemple de corrigé' })).not.toBeVisible();
  const response = page.getByRole('textbox', { name: 'Votre essai (facultatif)' });
  await response.fill('Brouillon fictif confidentiel de test');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('checkbox').first()).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('status').first()).toContainText('encore des critères à vérifier');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await expect(page.getByRole('status').first()).toContainText('ne certifie aucune compétence');
  await page.keyboard.press('Tab');
  await expect(page.locator('summary')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Un exemple de corrigé' })).toBeVisible();
  await expect(page.getByText('Tâche : vérifier l’invitation. Responsable : le facilitateur.')).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await page.screenshot({ path: testInfo.outputPath('exercise-compared.png'), fullPage: true });
  await page.getByRole('button', { name: 'Effacer cet essai et recommencer' }).click();
  await expect(response).toBeFocused();
  await expect(response).toHaveValue('');
  await expect(page.getByRole('checkbox').first()).not.toBeChecked();
  await expect(page.getByRole('checkbox').last()).not.toBeChecked();
  await expect(page.locator('details')).not.toHaveAttribute('open');
  await response.fill('Un autre essai éphémère');
  await page.reload();
  await expect(response).toHaveValue('');
  expect(writes).toEqual([]);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await page.getByRole('link', { name: 'Revenir à la leçon' }).first().click();
  await expect(page).toHaveURL(reader);
});

test('exercise is usable without JavaScript; short and retained-version routes work', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  try {
    const page = await context.newPage();
    for (const url of [exercise, '/learn/fixture-course/fixture-lesson-1/exercise', '/learn/fixture-course/v/1/fixture-lesson-1/exercise']) {
      expect((await page.goto(url))?.status()).toBe(200);
      await expect(page.getByRole('heading', { name: 'À vous d’essayer' })).toBeVisible();
      await page.getByRole('textbox').fill('Essai fictif sur la page');
      await page.getByRole('checkbox').first().check();
      await page.locator('summary').click();
      await expect(page.getByRole('heading', { name: 'Un exemple de corrigé' })).toBeVisible();
      const back = page.getByRole('link', { name: 'Revenir à la leçon' }).first();
      await expect(back).toHaveAttribute('href', url.includes('/v/1/') ? reader.replace('/v/2/', '/v/1/') : reader);
    }
    expect((await request.get('/learn/fixture-course/v/99/fixture-lesson-1/exercise')).status()).toBe(404);
    expect((await (await request.get('/sitemap.xml')).text())).not.toContain('/exercise');
  } finally { await context.close(); }
});
