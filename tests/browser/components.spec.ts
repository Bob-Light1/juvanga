import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium, test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function checkAccessibility(page: Page) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
}

async function checkLayout(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const controls = page.locator('#components').locator('button, a, input, select');
  for (const control of await controls.all()) {
    const bounds = await control.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  }
}

test('complete keyboard journey validates, recovers and preserves focus', async ({ page }) => {
  await page.goto('/workshop');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Explorer l’identité' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Découvrir le principe' })).toBeFocused();
  await page.keyboard.press('Tab');
  const navigation = page.getByRole('navigation', { name: 'Démonstration des composants' });
  const formLink = navigation.getByRole('link', { name: 'Essayer le formulaire' });
  await expect(formLink).toBeFocused();
  expect(await formLink.evaluate(element => {
    const style = getComputedStyle(element);
    return { style: style.outlineStyle, width: style.outlineWidth };
  })).toEqual({ style: 'solid', width: '3px' });
  await page.keyboard.press('Enter');
  await expect(page.locator('#component-form')).toBeFocused();
  await expect(formLink).toHaveAttribute('aria-current', 'location');
  await page.keyboard.press('Tab');
  const input = page.getByRole('textbox', { name: 'Votre objectif (obligatoire)' });
  await expect(input).toBeFocused();
  await page.keyboard.press('Tab');
  const submit = page.getByRole('button', { name: 'Vérifier mon objectif' });
  await expect(submit).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveAccessibleDescription(/sans information personnelle.*Erreur : indiquez votre objectif/);
  await checkAccessibility(page);
  await page.keyboard.type('Rendre une consigne plus claire');
  await expect(input).not.toHaveAttribute('aria-invalid', 'true');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  const busy = page.getByRole('button', { name: 'Vérification en cours…' });
  await expect(busy).toBeFocused();
  await expect(busy).toHaveAttribute('aria-busy', 'true');
  await expect(busy).toHaveAttribute('aria-disabled', 'true');
  await expect(input).toHaveAttribute('readonly', '');
  await page.keyboard.press('Enter');
  await expect(submit).toBeVisible();
  await expect(submit).toBeFocused();
  await expect(page.getByRole('status').filter({ hasText: 'Exemple réussi' })).toContainText('ne valide aucune compétence');
  await expect(page.getByRole('button', { name: 'Publication indisponible' })).toBeDisabled();
  await checkAccessibility(page);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('article').getByRole('link', { name: 'Revenir au formulaire' })).toBeFocused();
  await page.keyboard.press('Tab');
  const selector = page.getByLabel('État à explorer');
  await expect(selector).toBeFocused();
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  await expect(selector).toHaveValue('error');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Réessayer la démonstration' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(selector).toHaveValue('empty');
  await expect(selector).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#component-states').getByRole('link', { name: 'Revenir au formulaire' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#component-form')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(navigation.getByRole('link', { name: 'Explorer les états' })).toBeFocused();
});

for (const width of [1280, 360]) {
  test(`components, all resource states and targets at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/workshop#components');
    await checkLayout(page);
    const states = {
      loading: 'Chargement en cours', empty: 'Aucun parcours à afficher',
      error: 'Erreur : contenu indisponible', denied: 'Accès indisponible', offline: 'Connexion indisponible',
    };
    for (const [state, title] of Object.entries(states)) {
      await page.getByLabel('État à explorer').selectOption(state);
      await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
      await checkLayout(page);
      await checkAccessibility(page);
    }
    await page.getByRole('button', { name: 'Réessayer la démonstration' }).click();
    await expect(page.getByLabel('État à explorer')).toHaveValue('empty');
    await page.getByRole('button', { name: 'Vérifier mon objectif' }).click();
    await expect(page.getByRole('textbox')).toBeFocused();
    await checkLayout(page);
    await checkAccessibility(page);
    await page.screenshot({ path: testInfo.outputPath('components.png'), fullPage: true });
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  });
}

test('actual 200% browser zoom preserves reflow and keyboard controls', async ({}, testInfo) => {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-component-zoom-'));
  fs.mkdirSync(path.join(profile, 'Default'));
  fs.writeFileSync(path.join(profile, 'Default', 'Preferences'), JSON.stringify({
    // Chromium stores default zoom by partition; "x" is the default partition.
    partition: { default_zoom_level: { x: Math.log(2) / Math.log(1.2) } },
  }));
  const context = await chromium.launchPersistentContext(profile, {
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    headless: true, viewport: null, args: ['--window-size=1280,900'],
  });
  try {
    const page = await context.newPage();
    const captureViewport = async (name: string) => {
      // Native viewport capture avoids unzoomed clipping coordinates at 200%.
      const client = await context.newCDPSession(page);
      const capture = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
      fs.writeFileSync(testInfo.outputPath(name), Buffer.from(capture.data, 'base64'));
      await client.detach();
    };
    await page.goto('http://127.0.0.1:4173/workshop#components');
    const metrics = await page.evaluate(() => ({ cssWidth: innerWidth, outerWidth, pixelRatio: devicePixelRatio }));
    await testInfo.attach('zoom-metrics', { body: JSON.stringify(metrics), contentType: 'application/json' });
    expect(metrics.pixelRatio).toBeCloseTo(2, 1);
    expect(metrics.cssWidth).toBeLessThanOrEqual(640);
    expect(metrics.cssWidth).toBeGreaterThanOrEqual(600);
    await checkLayout(page);
    await checkAccessibility(page);
    await page.locator('#components-title').scrollIntoViewIfNeeded();
    await captureViewport('zoom-200-overview.png');
    await page.getByRole('textbox').focus();
    await page.keyboard.type('Lire et pratiquer');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status').filter({ hasText: 'Exemple réussi' })).toBeVisible();
    await page.getByLabel('État à explorer').selectOption('error');
    await checkLayout(page);
    await checkAccessibility(page);
    await page.locator('.content-state-error').scrollIntoViewIfNeeded();
    await captureViewport('zoom-200.png');
  } finally {
    await context.close();
    fs.rmSync(profile, { recursive: true, force: true });
  }
});
