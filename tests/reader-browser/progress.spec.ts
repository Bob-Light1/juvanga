import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const key = 'juvanga.reading-progress';
const lesson = '/learn/fixture-course/v/2/fixture-lesson-1';
const saved = { schemaVersion: 1, consent: true, reading: { courseId: 'fixture-course', courseVersion: 2, lessonId: 'fixture-lesson-1', position: 400, updatedAt: '2026-11-07T12:00:00.000Z' } };

for (const width of [360, 1280]) test(`refuse, opt in, resume after reload and erase reading only at ${width}px`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(lesson);
  await page.getByRole('button', { name: 'Continuer sans enregistrer' }).click();
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
  await page.reload();
  await page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' }).click();
  await expect.poll(async () => JSON.parse((await page.evaluate(key => localStorage.getItem(key), key))!).reading?.lessonId).toBe('fixture-lesson-1');
  await page.evaluate(() => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * 0.65, behavior: 'instant' }));
  await expect.poll(async () => JSON.parse((await page.evaluate(key => localStorage.getItem(key), key))!).reading.position).toBeGreaterThan(500);
  const position = JSON.parse((await page.evaluate(key => localStorage.getItem(key), key))!).reading.position;
  await page.reload();
  await expect.poll(() => page.evaluate(position => Math.abs(scrollY / (document.documentElement.scrollHeight - innerHeight) * 1000 - position), position)).toBeLessThan(90);
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Ma reprise' }).click();
  await expect(page).toHaveURL('/progress');
  await expect(page.getByRole('heading', { name: 'Lire les notes', exact: true })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('saved-reading.png'), fullPage: true });
  await page.getByRole('link', { name: 'Reprendre la lecture', exact: true }).click();
  await expect(page).toHaveURL(lesson);
  await page.getByRole('link', { name: 'Pratiquer et s’auto-évaluer' }).click();
  await page.getByRole('textbox').fill('Réponse de test qui ne doit jamais être conservée');
  await page.getByRole('checkbox').first().check();
  const raw = (await page.evaluate(key => localStorage.getItem(key), key))!;
  expect(raw).not.toMatch(/Réponse|criteria|answer|exercise|checked/);
  expect(Object.keys(JSON.parse(raw).reading).sort()).toEqual(['courseId', 'courseVersion', 'lessonId', 'position', 'updatedAt'].sort());
  await page.evaluate(() => localStorage.setItem('unrelated-test', 'keep'));
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Ma reprise' }).click();
  await page.getByRole('button', { name: 'Effacer ma reprise sur cet appareil' }).click();
  await expect(page.getByRole('status')).toHaveText('Votre reprise a été effacée. Aucun nouvel enregistrement ne sera effectué sans votre accord.');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('unrelated-test'))).toBe('keep');
  await page.goto(lesson); await page.reload();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});

for (const [label, value, text] of [
  ['corrupt', '{broken', 'Les données de reprise sont illisibles'],
  ['incompatible format', JSON.stringify({ ...saved, schemaVersion: 99 }), 'Ce format de reprise n’est pas compatible'],
  ['missing content version', JSON.stringify({ ...saved, reading: { ...saved.reading, courseVersion: 99 } }), 'Cette leçon ou cette version n’est plus disponible'],
]) test(`${label} is recoverable without implicit migration or incorrect resume`, async ({ page }) => {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [key, value]);
  await page.goto('/progress');
  await expect(page.getByText(text, { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Reprendre la lecture', exact: true })).toHaveCount(0);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(value);
  await page.getByRole('button', { name: 'Effacer ma reprise sur cet appareil' }).click();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});

test('retained version resumes exactly and erasure in another tab stops pending writes', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [key, JSON.stringify({ ...saved, reading: { ...saved.reading, courseVersion: 1 } })]);
  await page.goto('/progress');
  await page.getByRole('link', { name: 'Reprendre la lecture', exact: true }).click();
  await expect(page).toHaveURL(lesson.replace('/v/2/', '/v/1/'));
  const other = await context.newPage();
  await other.goto('/progress');
  await other.getByRole('button', { name: 'Effacer ma reprise sur cet appareil' }).click();
  await expect(page.getByText('La reprise locale est désactivée.', { exact: true })).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
  await page.reload();
  await expect(page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});

for (const operation of ['getItem', 'setItem', 'removeItem']) test(`storage ${operation} failure does not break reading or claim an erasure`, async ({ page }) => {
  if (operation === 'removeItem') {
    await page.goto('/');
    await page.evaluate(([key, value]) => localStorage.setItem(key, value), [key, JSON.stringify(saved)]);
  }
  await page.addInitScript(({ operation, key }) => {
    const original = Storage.prototype[operation as 'getItem'];
    Object.defineProperty(Storage.prototype, operation, { configurable: true, value: function (this: Storage, ...args: string[]) {
      if (args[0] === key) throw new DOMException('Blocked for test', operation === 'setItem' ? 'QuotaExceededError' : 'SecurityError');
      return Reflect.apply(original, this, args);
    } });
  }, { operation, key });
  await page.goto(lesson);
  await expect(page.getByRole('heading', { name: 'Lire les notes', exact: true })).toBeVisible();
  if (operation === 'setItem') await page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' }).click();
  if (operation === 'removeItem') {
    await page.getByRole('button', { name: 'Effacer ma reprise sur cet appareil' }).click();
    await expect(page.getByText('L’effacement n’a pas pu être confirmé', { exact: false })).toBeVisible();
    expect(await page.evaluate(key => localStorage.getItem(key), key)).not.toBeNull();
  } else await expect(page.locator('.progress-controls [role="status"]')).toContainText(operation === 'getItem' ? 'Le stockage de ce navigateur est indisponible' : 'La reprise n’a pas pu être enregistrée');
  await page.getByRole('link', { name: 'Pratiquer et s’auto-évaluer' }).click();
  await page.getByRole('textbox').fill('Essai toujours possible');
  await page.locator('summary').click();
  await expect(page.getByRole('heading', { name: 'Un exemple de corrigé' })).toBeVisible();
});
