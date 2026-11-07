import test from 'node:test';
import assert from 'node:assert/strict';
import { createCatalogue, formatDate, formatDateTime, formatXaf, locale, pseudoLocalize, resolveLanguage, supportedLanguages, timeZone } from '../apps/web/src/i18n/index.ts';
import { fr } from '../apps/web/src/i18n/fr.ts';

test('only French is available; unknown languages fall back to French', () => {
  assert.deepEqual(supportedLanguages, ['fr']);
  for (const input of [undefined, '', 'en', 'EN-us', 'fr-CM', 'FR-fr']) assert.equal(resolveLanguage(input), 'fr');
  const result = createCatalogue({ pages: { home: 'Translated', catalogue: '' }, workshop: { title: ['Translated'] } });
  assert.equal(result.pages.home, 'Translated');
  assert.equal(result.pages.catalogue, fr.pages.catalogue);
  assert.equal(result.pages.skip, fr.pages.skip);
  assert.deepEqual(result.workshop.title, ['Translated', ...fr.workshop.title.slice(1)]);
  assert.deepEqual(createCatalogue(), fr);
});

test('XAF amounts use Intl with integer precision and reject lossy inputs', () => {
  for (const amount of [0, 100000, -1500, Number.MAX_SAFE_INTEGER]) {
    assert.equal(formatXaf(amount), new Intl.NumberFormat(locale, { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(amount));
    assert.doesNotMatch(formatXaf(amount), /[.,]00/);
  }
  for (const amount of [0.1, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) assert.throws(() => formatXaf(amount), RangeError);
});

test('UTC instants display in Douala regardless of the machine timezone, including date rollover', () => {
  const date = '2026-11-07T23:30:00Z';
  assert.equal(timeZone, 'Africa/Douala');
  assert.equal(formatDate(date), '8 novembre 2026');
  assert.match(formatDateTime(date), /8 novembre 2026.*00:30/);
  assert.equal(formatDateTime(date), new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'long', timeStyle: 'short' }).format(new Date(date)));
  for (const invalid of ['2026-11-07', '2026-11-07T12:00:00', '2026-11-07T12:00:00+01:00', '2026-02-30T00:00:00Z', 'invalid']) assert.throws(() => formatDate(invalid), RangeError);
});

test('pseudo-localization expands every leaf without changing stable keys or array structure', () => {
  const pseudo = pseudoLocalize(fr);
  function visit(original, changed) {
    if (typeof original === 'string') { assert.ok(changed.length >= original.length * 1.4); assert.ok(changed.startsWith('[')); return; }
    assert.deepEqual(Object.keys(changed), Object.keys(original));
    assert.equal(Array.isArray(changed), Array.isArray(original));
    for (const key of Object.keys(original)) visit(original[key], changed[key]);
  }
  visit(fr, pseudo);
  assert.equal(fr.pages.home, 'Accueil');
});
