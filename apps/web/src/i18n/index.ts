import { fr } from './fr.ts';

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };
export type Catalogue = Widen<typeof fr>;
type PartialCatalogue<T> = T extends string ? string : { [K in keyof T]?: PartialCatalogue<T[K]> };
export type Translation = PartialCatalogue<Catalogue>;
export const locale = 'fr-CM';
export const timeZone = 'Africa/Douala';
export const supportedLanguages = ['fr'] as const;

// Only reviewed, complete languages may be advertised in the interface.
export function resolveLanguage(requested?: string): 'fr' {
  return supportedLanguages.find(language => language === requested?.split('-')[0].toLowerCase()) ?? 'fr';
}

// A partial future translation falls back per key, including array entries.
export function createCatalogue(translation: Translation = {}): Catalogue {
  function merge(base: unknown, candidate: unknown): unknown {
    if (typeof base === 'string') return typeof candidate === 'string' && candidate.trim() ? candidate : base;
    const entries = Object.entries(base as object).map(([key, value]) =>
      [key, merge(value, candidate && typeof candidate === 'object' ? (candidate as Record<string, unknown>)[key] : undefined)]);
    return Array.isArray(base) ? entries.map(([, child]) => child) : Object.fromEntries(entries);
  }
  return merge(fr, translation) as Catalogue;
}

export function pseudoLocalize<T>(value: T): Widen<T> {
  if (typeof value === 'string') return `[${value} ${'é'.repeat(Math.ceil(value.length * 0.4))}]` as Widen<T>;
  if (Array.isArray(value)) return value.map(item => pseudoLocalize(item)) as unknown as Widen<T>;
  return Object.fromEntries(Object.entries(value as object).map(([key, child]) => [key, pseudoLocalize(child)])) as Widen<T>;
}

// Build-only QA mode; never a selectable product language.
export const messages: Catalogue = typeof __PSEUDO_LOCALIZATION__ !== 'undefined' && __PSEUDO_LOCALIZATION__ ? pseudoLocalize(fr) : fr;

function utcDate(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)) throw new RangeError('Expected an ISO UTC instant');
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 19) !== value.slice(0, 19)) throw new RangeError('Invalid UTC instant');
  return date;
}

export function isUtcInstant(value: string): boolean {
  try { utcDate(value); return true; } catch { return false; }
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'long' }).format(utcDate(value));
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'long', timeStyle: 'short' }).format(utcDate(value));
}

export function formatXaf(amount: number): string {
  if (!Number.isSafeInteger(amount)) throw new RangeError('XAF amounts must be safe integers');
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(amount);
}
