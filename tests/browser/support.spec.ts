import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const supportEmail = 'juvangasupport@gmail.com';

for (const width of [360, 1280]) test(`help, privacy and email feedback at ${width}px`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ['/help', '/privacy', '/feedback']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`${route.slice(1)}.png`), fullPage: true });
  }
  const contact = page.getByRole('link', { name: /Écrire au support/ });
  await expect(contact).toHaveAttribute('href', `mailto:${supportEmail}`);
  await contact.focus();
  await expect(contact).toBeFocused();
  await expect(page.getByText(supportEmail, { exact: true })).toBeVisible();
  expect((await page.locator('main').innerText()).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)).toEqual([supportEmail]);
  await expect(page.getByText('Vous devez ensuite envoyer votre message', { exact: false })).toBeVisible();
  await expect(page.getByText('90 jours après la clôture', { exact: false })).toBeVisible();
  await expect(page.locator('form, input, textarea')).toHaveCount(0);
  await page.getByRole('contentinfo').getByRole('link', { name: 'Confidentialité' }).click();
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.getByText('Il n’y a pas de synchronisation', { exact: false })).toBeVisible();
  await expect(page.getByText('Effacer votre reprise locale ne supprime pas ces échanges', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Consulter les règles de confidentialité de Google' })).toHaveAttribute('href', 'https://policies.google.com/privacy?hl=fr');
  await page.getByRole('link', { name: 'Gérer ou effacer ma reprise' }).click();
  await page.getByRole('button', { name: 'Enregistrer ma lecture sur cet appareil' }).click();
  await page.getByRole('button', { name: 'Effacer ma reprise sur cet appareil' }).click();
  expect(await page.evaluate(() => localStorage.getItem('juvanga.reading-progress'))).toBeNull();
});

test('support pages are useful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    for (const route of ['/help', '/privacy', '/feedback']) {
      expect((await page.goto(`http://127.0.0.1:4173${route}`))?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
    await expect(page.getByRole('link', { name: /Écrire au support/ })).toHaveAttribute('href', `mailto:${supportEmail}`);
    await expect(page.getByText(supportEmail, { exact: true })).toBeVisible();
    await expect(page.getByText('copiez l’adresse ci-dessous', { exact: false })).toBeVisible();
    await expect(page.locator('form, input, textarea')).toHaveCount(0);
  } finally { await context.close(); }
});
