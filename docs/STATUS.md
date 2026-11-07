# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway; JUV-104 done.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette with verified contrast; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts and reviews. M2: V1.3 commercial pilot. Canonical JSON backlog, generated views and ADRs for structural changes. Documentation, code, identifiers and all code comments must be in English (DEC-14); the launch interface remains in French.

## Delivered and verified

Original F0: 86 detailed tasks, 47 traced requirements, product/architecture/quality/operations documents, brand/assets, frontend workshop, restart scripts, CI and contribution templates. Nine tooling and three browser tests passed; links/contrast/lint/typecheck/build passed; production dependency audit reported no known vulnerabilities. [Historical report and limitations](delivery/VALIDATION-F0.md).

Local `main` integrates JUV-101–103 by fast-forward through `9f46710`; their three merged feature branches were deleted locally. Full verification on integrated `main` passed. The project owner will push; remote access and CI remain unverified. Original PDFs and logo proposals retained. Dependencies installed locally and git-ignored. Target runtime: Node 24 LTS / npm 11.21.2; system runtime unchanged.

## Latest completed task

**JUV-104** — owner: Codex; branch: `feat/JUV-104-accessible-components`; date: 2026-11-07; status: `done`. Native accessible buttons/links, fields, cards, alerts, navigation and resource states; token-based styling, interactive workshop section and initial French copy catalogue. Local technical and visual review completed. Full `npm run verify` passed under isolated Node 24.22.2/npm 11.21.2 (49 tests, 17 contrast pairs, content/docs/views, lint, typecheck, build). Seven browser tests passed, including keyboard, axe, 360 px, 44 px targets and actual 200% zoom; final zoom-only capture rerun also passed. [Evidence and limits](delivery/VALIDATION-JUV-104.md), [contracts](design/COMPONENTS.md), [ADR-007](architecture/decisions/007-accessible-components.md). Work is on the feature branch, not integrated into `main`.

## Not implemented

No published M0 course, business backend, cloud database, SMTP, domain or public deployment. The three approved French lessons remain in the editorial directory, with no publication timestamp; public inventory is still empty. Course pages and reader remain to implement. Current page remains a brand/component workshop, not a first learning release. Access-denied/offline examples are simulations; no persistence or network integration is implied. The complete lessons remain approved under JUV-103. Local Fraunces/Inter remain JUV-105; workshop uses fallback fonts. Remote CI not run.

## Next M0 task

**JUV-105**: local Fraunces/Inter fonts and final assets. **JUV-107** is also ready: extend the initial French catalogue, migrate remaining UI literals and implement formatting/fallback rules. Continue in dependency order. Course publication remains a separate release step.

Commands: `npm run context`, `npm run next -- M0`, `npm run task -- JUV-105`. With Node 24/npm 11: `npm run verify`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` (or installed Playwright Chromium), `npm run dev`.

## Owners and open decisions

M0 drafts: Codex; accountable course owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer, C1 author/reviewer and operators remain to appoint; [product decisions](product/DECISIONS.md). Verify remote/hosting in the delivery ticket. ADR-005 documents managed-auth bcrypt versus Argon2id: review before real accounts.

Latest handoff: [Accessible components](sessions/2026-11-07-accessible-components.md). Integration baseline: [Local main integration](sessions/2026-11-07-main-integration.md). Product handoffs: [Free-course content](sessions/2026-11-07-free-course-content.md), [Public content schema](sessions/2026-11-07-public-content-schema.md), [M0 course plan](sessions/2026-11-07-m0-course-plan.md).
