# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway; JUV-101–110 done.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts/reviews. M2: V1.3 commercial pilot. Canonical JSON backlog and generated views; ADRs for structural changes. Documentation, code, identifiers and comments in English (DEC-14); launch interface in French.

## Repository and baseline

Local `main` now integrates JUV-101–110 through `c6f7761`. Integration owner: Codex; branch: `main`; date: 2026-11-07; status: `complete`. Full `npm run verify` passed on integrated `main` (87 tests, docs/content/contrast/lint/typecheck and client/prerender build). Four conflict-free fast-forward merges preserved JUV-107–110 commits and their local feature branches. The tree matched JUV-110 exactly before maintenance documentation edits. [Current integration](sessions/2026-11-07-learning-main-integration.md); [previous integration](sessions/2026-11-07-ui-main-integration.md). The project owner handles pushes; remote access and CI remain unverified. Target Node 24 LTS/npm 11.21.2; system runtime unchanged.

Earlier delivery evidence: [F0](delivery/VALIDATION-F0.md), [public pages](delivery/VALIDATION-JUV-106.md), [French catalogue/formats](delivery/VALIDATION-JUV-107.md) and [versioned reader](delivery/VALIDATION-JUV-108.md). Reader schema 1 remains text-only; explicit schema 2 permits requested same-origin raster illustrations. Published content/rubrics are immutable.

## Latest completed tasks

**JUV-109** — owner: Codex; branch: `feat/JUV-109-practice-self-assessment`; date: 2026-11-07; status: `done`; commit: `af14dc5`. Versioned exercises and latest aliases, ephemeral optional response, personal criteria declarations, native solution comparison and retry/focus reset. No score/certification or persisted attempts. Verify passed (80 tests); seven reader/practice browser scenarios passed; all 17 default scenarios verified (one zoom timeout passed in an unchanged isolated rerun). Semantic/technical/visual author review completed. [Evidence](delivery/VALIDATION-JUV-109.md), [ADR-011](architecture/decisions/011-practice.md).

**JUV-110** — owner: Codex; branch: `feat/JUV-110-consented-reading-progress`; date: 2026-11-07; status: `done`. Noindex `/progress`, explicit opt-in, one strict last-reading record, exact-version resume, approximate scroll restoration, targeted erasure and recoverable storage errors. No pre-consent writes or exercise persistence. Cross-tab erasure and pending-write consent checks verified. Full verify passed (87 tests); 16 synthetic reader/practice/progress scenarios and all 18 final default browser regressions passed. Includes 360/1280 px, axe, keyboard, 200% zoom, no-JavaScript fallback, denied/quota/corrupt/incompatible storage and failed-removal feedback. Technical/privacy-boundary/visual author review completed. [Evidence and limits](delivery/VALIDATION-JUV-110.md), [ADR-012](architecture/decisions/012-local-progress.md).

## Not implemented or configured

No real published lessons: the approved French course remains editorial, without a publication timestamp; the public inventory is empty. Only approved description fields are public, marked coming soon. Reader/practice/progress QA uses a separate synthetic inventory and restores the normal French noindex artifact. No help/privacy/feedback pages, offline guarantee, account synchronization, business backend, database, SMTP, verified domain or deployment. English translation and production origin are unconfigured. Workshop denied/offline states remain simulations. Actual hosting/headers, remote CI, physical-device/non-Chromium/screen-reader checks and independent learner UI review remain unverified.

## Next M0 task and owners

JUV-111 is next: help, privacy and real feedback. Publication remains a separate release step. Commands: `npm run context`, `npm run task -- JUV-111`. With Node 24/npm 11: `npm run verify`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`.

M0 drafts: Codex; accountable course owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer, C1 author/reviewer and operators remain to appoint; [product decisions](product/DECISIONS.md). ADR-005 requires review before real accounts. Verify hosting at release.

Latest handoff: [Main integration](sessions/2026-11-07-learning-main-integration.md). Product handoff: [Consented reading resume](sessions/2026-11-07-consented-reading-progress.md). Previous: [Practice](sessions/2026-11-07-practice-self-assessment.md).
