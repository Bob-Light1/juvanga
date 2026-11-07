# JUV-104 — accessible course components verification

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-104-accessible-components`. Status: `done` after local technical and visual review.

Implementation: [components](../../apps/web/src/components/ui.tsx), [interactive workshop](../../apps/web/src/components/ComponentWorkshop.tsx), [French copy](../../apps/web/src/i18n/fr.ts), [contracts and state inventory](../design/COMPONENTS.md), [ADR-007](../architecture/decisions/007-accessible-components.md).

## Criteria and evidence

| Criterion | Evidence |
| --- | --- |
| Visible focus and complete keyboard journey | Native controls and 3 px focus outline. Browser test starts at the skip link, reaches the form via navigation, submits an invalid field, corrects it, submits with Space, checks busy/repeat-submit handling and retained focus, reaches the card and select, then retries and returns. Errors are associated through `aria-describedby`; invalid submit focuses the field, retry focuses the surviving selector. |
| Touch controls at least 44 px; no color-only state | Browser tests measure every button, link, input and select in the component workshop at 1280 px, 360 px and 200% zoom. State text/symbols, dashed invalid/disabled borders, underlined navigation and a thicker current-location border supplement color. |
| Loading/empty/error states documented | The component guide inventories initial/loading/empty/success/error/access-denied/network-unavailable/disabled states. Interactive examples expose each resource state; invalid field, busy, success and disabled actions are also exercised. |

## Executed checks

- `npm run verify` under isolated Node 24.22.2/npm 11.21.2: passed content/review-copy checks, 87 tickets/links/generated views, 17 contrast pairs, all 49 tooling/content tests, ESLint, strict TypeScript and production build.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: **7 passed**, Chrome 148.0.7778.215, headless Linux, one worker. Includes the three existing foundation tests and four new component tests. Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA scans report no violations in the component scenarios, including all five resource states at desktop/mobile widths and field error/success states.
- Actual desktop zoom: a temporary Chromium profile sets 200% default zoom. Assertions confirm a 1280 px outer window, 640 CSS px viewport and device pixel ratio 2; layout has no horizontal overflow, controls retain their minimum sizes, and form submission works. No pinch zoom or CSS transform substitutes for browser zoom.
- Contrast additions on white: night 15.97:1, muted 7.56:1 and danger 6.57:1. Existing semantic/focus pairs remain valid. Build output: initial JS 119.02 kB gzip; CSS 2.12 kB gzip. These are bundle sizes, not real-device performance measurements.
- Mobile scenario confirms no local/session storage writes. Accepted lesson documents and public inventory are untouched; no dependency or lockfile change.

Initial browser failures were test setup issues: Enter reopened the native select, and zoom preferences require a partition-keyed dictionary. Both were corrected before the full seven-test passing run. Follow-up zoom-only runs refine screenshot capture; native Chrome viewport captures avoid Playwright clipping at actual browser zoom. Captures are local, git-ignored artifacts under `test-results/`; rerunning Playwright replaces that directory.

## Review and limits

Technical review checked native semantics, action-versus-navigation behavior, typed field associations, busy submit guards, stable focus on recovery, timer cleanup, token use and catalogue-only new UI copy. This is an author review of non-sensitive frontend work; no additional auth/finance/SQL review applies. Visual review of the 360 px full-page capture and native 200% viewport captures found readable wrapping, stacked cards, intact controls and explicit error/recovery text. The final zoom-only run passed after changing capture transport; application code was unchanged from the seven-test passing run.

Not run: screen-reader software, physical touch devices, other browser engines, remote CI, production headers/hosting or deployment. Automated axe and keyboard checks do not establish complete WCAG compliance. Access-denied/offline messages and the validation timer are explicitly labelled demonstrations; server authorization, real loading/network handling and PWA caching remain later-ticket work. The public course, reader, localization fallback/formatting and local fonts remain JUV-105–108/JUV-112 scope.

Closure checks: `npm run backlog:generate`, `npm run check:docs` and `git diff --check` passed after the final ticket metadata update. `npm run next -- M0` confirms JUV-105 and JUV-107 are ready. No merge, push or deployment performed.
