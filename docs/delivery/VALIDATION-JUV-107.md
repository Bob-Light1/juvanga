# JUV-107 — French catalogue and formatting validation

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-107-french-localization`. Status: done after local technical and visual author review.

## Delivered

All current UI prose, accessible labels, states and page metadata use the typed French catalogue. Versioned editorial content remains separate. Existing keys are retained; remaining brand-workshop copy moves to semantic `workshop.*` keys. French is the only supported language and no English selector is offered. The shared module supplies per-key French fallback, including missing/blank values and array entries, plus build-only pseudo-localization. Dates/date-times accept valid UTC instants and use Intl with `fr-CM` and explicit `Africa/Douala`; XAF formatting rejects non-safe integers and never silently rounds amounts. No dependency, persisted preference or provider is added. [ADR-009](../architecture/decisions/009-localization.md) records alternatives and migration.

## Executed checks and review

- Isolated Node 24.22.2/npm 11.21.2: `npm run verify` passed all **66 tests**, generated-view/docs/link checks, course checks, contrast, ESLint, TypeScript and the complete default noindex client/prerender build.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: **16 passed**. Includes public navigation/history, initial HTML without JavaScript, real 404s, keyboard recovery, 200% browser zoom, fonts/assets and accessibility checks.
- `JUVANGA_PSEUDO_LOCALE=1 npm run build`, then `JUVANGA_PSEUDO_LOCALE=1 PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- tests/browser/i18n.spec.ts`: **2 passed**, covering home/catalogue/course/workshop/missing-page at 360 and 1280 px with at least 40% UI-copy expansion. No horizontal overflow or axe WCAG A/AA violations; expanded workshop toggle, form error and focus remain usable. Screenshot artifacts are local and ignored under `test-results/`.
- Unit tests cover French resolution/fallback, unchanged keys and arrays, integer XAF (zero/negative/large values), invalid amounts, UTC validation and Douala's next-day midnight display independently of machine timezone.
- Visual review of the mobile expanded home capture confirms wrapped headings, readable cards, intact actions and footer. Source review confirms no remaining UI prose literals in TSX, no content/version mutation, no network language lookup and no English option. The pseudo browser test initially incorrectly expected editorial course titles to be expanded; the assertion was corrected to inspect shared catalogue text instead. Both scenarios then passed.
- Default French noindex artifact restored with the final `npm run verify`. `git diff --check` passed.

## Limits

Not run: remote CI/hosting, physical-device, non-Chromium or screen-reader software testing. No English translation or production origin is configured. No date or paid-price UI is invented solely to demonstrate the formatters. Existing full-suite browser zoom coverage is retained; pseudo-specific checks use mobile/desktop reflow.
