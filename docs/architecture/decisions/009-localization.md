# ADR-009 — French catalogue and explicit formats

- Date: 2026-11-07
- Status: adopted for JUV-107.

## Context and decision

Launch copy must remain French without advertising an untranslated English interface. Extend the existing typed, nested French catalogue to all current UI text, including accessible labels, states, workshop text and metadata. Course prose remains in versioned content documents. Keys describe meaning and must not be renamed when wording changes. Do not construct keys from visible text.

Use a small local module rather than a new dependency: it exposes the catalogue, the supported language list (French only), French resolution for unknown languages, and per-key fallback for future partial translations. Blank or missing translation values fall back to French, including array entries. A future complete, reviewed language must be explicitly added to both resolution and the supported list before it is offered to users. No language preference is persisted.

All amounts use `Intl.NumberFormat` with `fr-CM`, XAF and integer precision. Reject non-safe integers rather than silently round money. Dates accept ISO UTC instants ending in Z; both date and date/time use `Intl.DateTimeFormat` with explicit `Africa/Douala`, independent of browser or server timezone. Reject invalid or timezone-less inputs. Published content timestamps remain unchanged.

`JUVANGA_PSEUDO_LOCALE=1 npm run build` expands every catalogue string by at least 40%, preserves the nested key structure and tests real page reflow. This build-only QA option is not a product language and must be unset for release. Rebuild without it after QA.

## Alternatives and consequences

An i18n dependency would provide plurals and dynamic language loading but adds configuration without a second language. Defer until real translations require it. Inline literals are simpler initially but spread copy and produce inconsistent formats. The typed catalogue has no interpolation/plural engine yet: add semantic full-sentence entries when needed, and use Intl for numbers and dates rather than concatenating language-specific formats.

## Migration and validation

Existing public/component copy retains its keys; workshop literals move to `workshop.*`. Consumers import `messages` from the module. No content, persisted data or publication migration is needed. Unit tests cover fallback, XAF, UTC/Douala midnight rollover, invalid input and pseudo expansion; browser checks cover real normal/expanded UI at 360 and 1280 px. See [JUV-107 validation](../../delivery/VALIDATION-JUV-107.md). Revert the commit and rebuild to roll back.
