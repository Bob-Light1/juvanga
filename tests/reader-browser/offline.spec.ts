import { test, expect } from '@playwright/test';

const lesson = '/learn/fixture-course/v/2/fixture-lesson-1';
test('published exact lessons and exercises reload offline without persisting a response', async ({ page, context }) => {
  test.setTimeout(120000);
  await page.goto(lesson);
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' }).click();
  await page.evaluate(() => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * 0.6, behavior: 'instant' }));
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('juvanga.reading-progress')!).reading?.position)).toBeGreaterThan(450);
  // Apply failure to worker-originated fetches as well as the page's network target.
  await context.route('**/*', route => route.abort('internetdisconnected'));
  await context.setOffline(true);
  expect((await page.reload())?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lire les notes');
  await expect.poll(() => page.evaluate(() => scrollY / (document.documentElement.scrollHeight - innerHeight))).toBeGreaterThan(0.4);
  await page.getByRole('link', { name: 'Pratiquer et s’auto-évaluer' }).click();
  await page.getByRole('textbox').fill('Offline response must stay ephemeral');
  await page.reload();
  await expect(page.getByRole('textbox')).toHaveValue('');
  await page.getByText('Comparer avec le corrigé', { exact: true }).click();
  await expect(page.getByText('Tâche : vérifier l’invitation. Responsable : le facilitateur.', { exact: true })).toBeVisible();
  const values = await page.evaluate(async () => {
    const results: string[] = [];
    for (const name of await caches.keys()) for (const request of await (await caches.open(name)).keys()) {
      const response = await (await caches.open(name)).match(request);
      if (response?.headers.get('content-type')?.includes('text/html')) results.push(await response.text());
    }
    return { cache: results.join('\n'), storage: JSON.stringify(localStorage) };
  });
  expect(values.cache + values.storage).not.toContain('Offline response must stay ephemeral');
  expect((await page.goto('/learn/fixture-course/v/99/fixture-lesson-1'))?.status()).toBe(503);
  await expect(page.getByRole('heading', { name: 'Cette page nécessite une connexion' })).toBeVisible();
});
