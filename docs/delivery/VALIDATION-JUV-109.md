# JUV-109 — Practice and self-assessment validation

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-109-practice-self-assessment`. Status: done after technical, visual and semantic author review.

## Delivered

A dedicated version-pinned exercise page and latest short aliases offer the fictional prompt, instructions, optional response and rubric before a collapsed public worked solution. Native textarea/checkbox/details controls work without registration and retain a useful no-JavaScript path. Retry clears the response/declarations, closes the solution and returns focus to the response. The page explains ephemeral state and paper work. All UI copy is in the French catalogue and styles use shared tokens.

Feedback describes personal declarations only: unreviewed, some criteria remaining, or all criteria declared. Every state avoids scores, certification and human-review claims. Essential criteria are visibly identified. Reading alone never claims competence. Public solutions are presentation content, not protected data. The separate practice projection accepts published French versions only; reading and description projections retain their existing boundaries. Real editorial/public inventories are unchanged. [ADR-011](../architecture/decisions/011-practice.md).

## Executed checks and evidence

- `npm run verify` under isolated Node 24.22.2/npm 11.21.2: **80 tests passed**, docs/generated views/link checks, course review freshness, contrast, ESLint, TypeScript and client/prerender build passed. A routing review found the valid lesson ID `exercise` could be mistaken for a suffix; exact reading resolution now precedes suffix handling and a regression test covers both canonical/short forms.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`: **7 passed**, including three exercise scenarios and four existing reader scenarios on the actual app with a separate synthetic inventory. Tests cover attempt/compare/retry, essential/nonessential declarations, keyboard focus, 360/1280 px, axe, no overflow, no response submission/storage, reload reset, paper/no-JavaScript use and retained/latest-version links. The runner restored the normal noindex artifact.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: **16 passed; one existing 200% zoom scenario exceeded 60 seconds** without an assertion failure. Trace inspection showed the timeout during accessibility evaluation. Isolated rerun `npm run test:e2e -- tests/browser/components.spec.ts -g 'actual 200%'`: **1 passed in 19.8 seconds**, with unchanged assertions/deadline. All 17 regression scenarios were therefore verified across these runs. Unpublished exercise URLs also return helpful static 404s and expose no draft body.
- Unit checks cover exact exercise/rubric versions, noindex and sitemap exclusion, malformed/unpublished routes, practice projection, no editorial metadata, locale restrictions and declaration feedback when essential criteria are missing/all checked. They do not claim automated assessment of the learner's answer.
- Visual review of the mobile exercise capture confirms readable instructions/response, essential labels, wrapped feedback, visible comparison/retry actions and no pass badge. Semantic source review confirms all-declared copy explicitly denies certification/review; no answer, choices or solution-open state is serialized. Browser request/storage assertions confirm no sending or persistence. Screenshots/traces are ignored local artifacts replaced by subsequent runs.
- Closing `npm run check:docs` and `git diff --check` passed after backlog/STATUS/handoff updates.

## Limits

Not run: actual hosting/deployment, remote CI, physical-device/non-Chromium or screen-reader software checks, or independent learner/pedagogical review of this UI. Local author semantic/technical/visual review is complete; the underlying approved course remains unpublished. JUV-110 owns optional reading-only resume; it must not persist exercise responses or declarations.
