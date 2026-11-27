import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root = '/learn/fixture-course';
const lesson = (number: number, version = 2) => `${root}/v/${version}/fixture-lesson-${number}`;

async function activateWithKeyboard(page: Page, target: ReturnType<Page['locator']>) {
  for (let index = 0; index < 80; index++) {
    await page.keyboard.press('Tab');
    if (await target.evaluate(element => element === document.activeElement)) {
      await page.keyboard.press('Enter');
      return;
    }
  }
  throw new Error('The target was not reachable through Tab navigation');
}

for (const width of [360, 1280]) test(`entire course by keyboard, exact versions, history and accessible reader at ${width}px`, async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/courses/fixture-course');
  await activateWithKeyboard(page, page.getByRole('link', { name: 'Commencer le parcours', exact: true }));
  for (let number = 1; number <= 3; number++) {
    await expect(page).toHaveURL(lesson(number));
    await expect(page.locator('#main')).toBeFocused();
    await expect(page.locator('[aria-current="page"]').filter({ hasText: ['Lire les notes', 'Préparer une action', 'Vérifier le résultat'][number - 1] })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    await expect(page.locator('audio, video, iframe')).toHaveCount(0);
    await expect(page.getByText('La lecture seule ne valide aucune compétence.', { exact: false })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`lesson-${number}.png`), fullPage: true });
    const pagination = page.getByRole('navigation', { name: 'Passer à une autre leçon' });
    if (number === 1) await expect(pagination.locator('[rel="prev"]')).toHaveCount(0);
    if (number < 3) await activateWithKeyboard(page, pagination.locator('[rel="next"]'));
    else {
      await expect(pagination.locator('[rel="next"]')).toHaveCount(0);
      await activateWithKeyboard(page, pagination.getByRole('link', { name: 'Revenir au parcours' }));
    }
  }
  await expect(page).toHaveURL('/courses/fixture-course');
  await page.goBack();
  await expect(page).toHaveURL(lesson(3));
  await page.getByRole('navigation', { name: 'Passer à une autre leçon' }).locator('[rel="prev"]').click();
  await expect(page).toHaveURL(lesson(2));
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Préparer une action');
  await page.goto(lesson(2, 1));
  const pinned = page.locator('main a[href^="/learn/"]');
  expect((await pinned.evaluateAll(links => links.map(link => link.getAttribute('href')))).every(href => href?.includes('/v/1/'))).toBe(true);
  await page.getByRole('link', { name: 'Revoir la première leçon de cette version' }).click();
  await expect(page).toHaveURL(lesson(1, 1));
  expect(errors).toEqual([]);
});

test('static aliases, retained versions and useful missing lessons work without JavaScript', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  try {
    const page = await context.newPage();
    for (const path of [lesson(1), lesson(2, 1), `${root}/fixture-lesson-3`]) {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Programme du parcours' })).toBeVisible();
      const canonical = path === `${root}/fixture-lesson-3` ? lesson(3) : path;
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://juvanga.example' + canonical);
    }
    await page.getByRole('navigation', { name: 'Passer à une autre leçon' }).locator('[rel="prev"]').click();
    await expect(page).toHaveURL(lesson(2));
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Préparer une action');
    for (const path of [lesson(4), lesson(1, 99), '/learn/unknown/missing']) {
      expect((await page.goto(path))?.status()).toBe(404);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cette leçon est introuvable.');
      await expect(page.getByText('Vérifiez le lien', { exact: false })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Revenir aux parcours' })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    }
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('https://juvanga.example' + lesson(1));
    expect(sitemap).not.toContain(`<loc>https://juvanga.example${root}/fixture-lesson-1</loc>`);
    const html = await (await request.get(lesson(1))).text();
    expect(html).toContain('Une note fictive à lire.');
    expect(html).not.toContain('src="/media/reader-fixture.png"');
    expect(html).not.toMatch(/workedSolution|Task: check the invitation/);
  } finally { await context.close(); }
});

test('requested illustration survives slow network, failure and keyboard retry', async ({ page, context }) => {
  let requests = 0;
  let release: (() => void) | undefined;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await context.route('**/media/reader-fixture.png', async route => {
    requests++;
    if (requests === 1) { await pending; await route.abort(); }
    else await route.fulfill({ contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aWZkAAAAASUVORK5CYII=', 'base64') });
  });
  await page.goto(lesson(1));
  const figure = page.locator('#block-reader-illustration');
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.getByText('Schéma fictif : une note mène à une action.', { exact: true })).toBeVisible();
  await expect(figure.locator('img')).toHaveCount(0);
  expect(requests).toBe(0);
  const button = figure.getByRole('button');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-busy', 'true');
  await expect(figure.getByRole('status')).toHaveText('Chargement de l’illustration…');
  await expect(page.getByRole('navigation', { name: 'Passer à une autre leçon' }).locator('[rel="next"]')).toBeVisible();
  release!();
  await expect(button).toHaveText('Réessayer l’illustration');
  await expect(button).toBeFocused();
  await expect(figure.getByRole('status')).toContainText('L’illustration est indisponible');
  await page.keyboard.press('Enter');
  await expect(figure.getByRole('img')).toHaveAttribute('alt', 'Schéma fictif : une note mène à une action.');
  await expect(figure.getByRole('status')).toHaveText('Illustration chargée.');
  expect(await figure.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(requests).toBe(2);
  await expect(button).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(figure.locator('img')).toHaveCount(0);
  await page.getByRole('navigation', { name: 'Passer à une autre leçon' }).locator('[rel="next"]').click();
  await expect(page).toHaveURL(lesson(2));
  await expect(page.locator('#main')).toBeFocused();
});

// ADR-015: automatic lightweight illustrations and icon callouts.
test('automatic illustration is prerendered, shown without action and recovers from failure', async ({ page, context, request }) => {
  const html = await (await request.get(lesson(1))).text();
  expect(html).toMatch(/<img[^>]+src="\/media\/reader-auto\.png"[^>]+loading="lazy"|<img[^>]+loading="lazy"[^>]+src="\/media\/reader-auto\.png"/);
  let requests = 0;
  await context.route('**/media/reader-auto.png', async route => {
    requests++;
    if (requests === 1) await route.abort();
    else await route.fulfill({ contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aWZkAAAAASUVORK5CYII=', 'base64') });
  });
  await page.goto(lesson(1));
  const figure = page.locator('#block-reader-auto-illustration');
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.getByText('Schéma fictif affiché automatiquement.', { exact: true })).toBeVisible();
  await expect(figure.getByRole('status')).toContainText('L’illustration est indisponible');
  const retry = figure.getByRole('button', { name: 'Réessayer l’illustration' });
  await retry.focus();
  await page.keyboard.press('Enter');
  await expect(figure.getByRole('img')).toHaveAttribute('alt', 'Schéma fictif affiché automatiquement.');
  await expect.poll(() => figure.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(figure).toBeFocused();
  expect(requests).toBe(2);
});

test('automatic illustration displays without JavaScript and callouts keep their labels', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    await context.route('**/media/reader-auto.png', route => route.fulfill({ contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aWZkAAAAASUVORK5CYII=', 'base64') }));
    const page = await context.newPage();
    await page.goto(lesson(1));
    const image = page.locator('#block-reader-auto-illustration img');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('#block-reader-tip')).toContainText('Astuce');
    await expect(page.locator('#block-reader-try')).toContainText('Essayez');
    await expect(page.locator('#block-reader-tip svg')).toHaveAttribute('aria-hidden', 'true');
  } finally { await context.close(); }
});
