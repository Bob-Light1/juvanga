# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway; JUV-105/JUV-106 done.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette with verified contrast; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts and reviews. M2: V1.3 commercial pilot. Canonical JSON backlog, generated views and ADRs for structural changes. Documentation, code, identifiers and all code comments must be in English (DEC-14); the launch interface remains in French.

## Delivered and verified

Original F0: 86 detailed tasks, 47 traced requirements, product/architecture/quality/operations documents, brand/assets, frontend workshop, restart scripts, CI and contribution templates. Nine tooling and three browser tests passed; links/contrast/lint/typecheck/build passed; production dependency audit reported no known vulnerabilities. [Historical report and limitations](delivery/VALIDATION-F0.md).

Local `main` integrates JUV-101–103 by fast-forward through `9f46710`; their three merged feature branches were deleted locally. Full verification on integrated `main` passed. The project owner will push; remote access and CI remain unverified. Original PDFs and logo proposals retained. Dependencies installed locally and git-ignored. Target runtime: Node 24 LTS / npm 11.21.2; system runtime unchanged.

## Latest completed tasks

**JUV-105** — owner: Codex; branch: `feat/JUV-105-local-fonts-assets`; date: 2026-11-07; status: `done`; commit: `2ddc4a9`. Local Fraunces/Inter, licenses, provenance, preloads and adjusted fallbacks. Full verification passed (49 tests); 10 browser tests passed, including delayed-font CLS below 0.01 and small-asset review. [Evidence](delivery/VALIDATION-JUV-105.md).

**JUV-106** — owner: Codex; branch: `feat/JUV-106-indexable-public-pages`; date: 2026-11-07; status: `done`. Home/catalogue/approved-course overview, React Router, static HTML/metadata/sitemap and real 404 preview responses. Workshop moved to `/workshop`. Full `npm run verify` passed under Node 24.22.2/npm 11.21.2 (62 tests). Full preview browser suite: 14 passed; reserved-origin indexable artifact: four public scenarios passed. Includes no-JavaScript deep links, keyboard, axe, 360/1280 px, history, refresh, font stability and actual 200% workshop zoom. Technical/visual author review completed. [Evidence and limits](delivery/VALIDATION-JUV-106.md), [ADR-008](architecture/decisions/008-public-pages.md). Branches are stacked on JUV-104 and remain unmerged.

## Not implemented

No published lessons, reader, business backend, database, SMTP, domain or deployment. The approved French course stays in the editorial directory, with no publication timestamp; the published-lesson inventory is empty. Only selected presentation fields enter the public pages, marked coming soon. Default build is a noindex preview; the verified production origin remains unconfigured. Reader/progress/offline support and complete localization remain later tickets. Access-denied/offline workshop states are simulations. Remote CI and real hosting behavior are unverified.

## Next M0 task

**JUV-107** is ready: complete French catalogue, remaining UI literals and formatting/fallback rules. JUV-108 reader depends on JUV-107. Continue in dependency order; publication remains a separate release step.

Commands: `npm run context`, `npm run task -- JUV-107`. With Node 24/npm 11: `npm run verify`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, `npm run dev`.

## Owners and open decisions

M0 drafts: Codex; accountable course owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer, C1 author/reviewer and operators remain to appoint; [product decisions](product/DECISIONS.md). Verify remote/hosting in the delivery ticket. ADR-005 documents managed-auth bcrypt versus Argon2id: review before real accounts.

Latest handoff: [Public pages](sessions/2026-11-07-indexable-public-pages.md). Previous: [Local fonts/assets](sessions/2026-11-07-local-fonts-assets.md), [accessible components](sessions/2026-11-07-accessible-components.md). Integration baseline: [Local main integration](sessions/2026-11-07-main-integration.md). Product handoffs: [Free-course content](sessions/2026-11-07-free-course-content.md), [Public content schema](sessions/2026-11-07-public-content-schema.md), [M0 course plan](sessions/2026-11-07-m0-course-plan.md).
