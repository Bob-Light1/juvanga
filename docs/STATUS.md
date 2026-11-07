# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway; JUV-101–109 done.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts/reviews. M2: V1.3 commercial pilot. Canonical JSON backlog and generated views; ADRs for structural changes. Documentation, code, identifiers and comments in English (DEC-14); launch interface in French.

## Repository and validation

Local `main` integrates JUV-101–106 through `c05c3bd`; [previous integration](sessions/2026-11-07-ui-main-integration.md). Current delivery branch: `feat/JUV-109-practice-self-assessment`, based on JUV-108 commit `4fbee08`. Separate feature branches for JUV-107–109 are retained locally. Owner: Codex; delivery date: 2026-11-07. The project owner handles integration/pushes; remote access and CI remain unverified. Target Node 24 LTS/npm 11.21.2; system runtime unchanged.

Original F0 tooling, product/architecture/quality documents, brand/assets, workshop and CI: [historical evidence](delivery/VALIDATION-F0.md). Earlier public-page/assets/components evidence remains in [JUV-106](delivery/VALIDATION-JUV-106.md), [JUV-105](delivery/VALIDATION-JUV-105.md) and [JUV-104](delivery/VALIDATION-JUV-104.md).

## Latest completed tasks

**JUV-107** — owner: Codex; branch: `feat/JUV-107-french-localization`; date: 2026-11-07; status: `done`; commit: `3fcc6da`. Complete typed French UI catalogue, stable keys, French fallback, Intl integer XAF and UTC-to-Douala formats. Full verify passed (66 tests); Chrome suite 16 passed; expanded-copy scenarios 2 passed at 360/1280 px. [Evidence](delivery/VALIDATION-JUV-107.md), [ADR-009](architecture/decisions/009-localization.md).

**JUV-108** — owner: Codex; branch: `feat/JUV-108-lesson-reader`; date: 2026-11-07; status: `done`. Typed reading blocks/examples, versioned programme/previous/next links, static latest aliases, missing-lesson help/404s and requested illustrations with description/retry. Schema 1 remains text-only; explicit schema 2 adds local raster images. Full verify passed (75 tests); four reader browser scenarios and 17 default regressions passed. Keyboard, no-JavaScript, retained versions, 360/1280 px, axe and delayed/failed image recovery verified. Technical/visual author review completed. [Evidence and limits](delivery/VALIDATION-JUV-108.md), [ADR-010](architecture/decisions/010-lesson-reader.md).

## Not implemented or configured

No real published lessons: the approved French course remains editorial, with no publication timestamp and an empty public inventory. Only selected description fields are public, marked coming soon. Reader QA uses a separate synthetic inventory and restores the normal artifact. No progress storage, offline support, business backend, database, SMTP, domain or deployment. Default output remains a French noindex preview; English translation and verified production origin are unconfigured. Workshop denied/offline states remain simulations. Actual hosting/headers, remote CI and non-Chromium/screen-reader software checks remain unverified.

## Next M0 task and owners

**JUV-109** — owner: Codex; branch: `feat/JUV-109-practice-self-assessment`; date: 2026-11-07; status: `done`. Versioned public exercises, ephemeral response, personal criteria declarations, native solution comparison and retry/focus reset. Verify passed (80 tests); seven reader/practice scenarios passed; all 17 regressions verified (one zoom timeout passed in an isolated rerun). Semantic/technical/visual author review completed. [Evidence](delivery/VALIDATION-JUV-109.md), [ADR-011](architecture/decisions/011-practice.md).

JUV-110 is ready and explicitly authorized next: consented local reading resume. Publication remains a separate release step. Commands: `npm run context`, `npm run task -- JUV-110`. With Node 24/npm 11: `npm run verify`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`.

M0 drafts: Codex; accountable course owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer, C1 author/reviewer and operators remain to appoint; [product decisions](product/DECISIONS.md). ADR-005 requires review before real accounts. Verify hosting at release.

Latest handoff: [Practice](sessions/2026-11-07-practice-self-assessment.md). Previous: [Lesson reader](sessions/2026-11-07-lesson-reader.md). Previous: [French localization](sessions/2026-11-07-french-localization.md).
