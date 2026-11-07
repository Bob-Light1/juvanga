# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway; JUV-103 done.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette with verified contrast; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts and reviews. M2: V1.3 commercial pilot. Canonical JSON backlog, generated views and ADRs for structural changes. Documentation, code, identifiers and all code comments must be in English (DEC-14); the launch interface remains in French.

## Delivered and verified

Original F0: 86 detailed tasks, 47 traced requirements, product/architecture/quality/operations documents, brand/assets, frontend workshop, restart scripts, CI and contribution templates. Nine tooling and three browser tests passed; links/contrast/lint/typecheck/build passed; production dependency audit reported no known vulnerabilities. [Historical report and limitations](delivery/VALIDATION-F0.md).

Files integrated into this repository; current git inspection shows an initial commit and an `origin` remote. Remote access and CI have not been verified in this session. Original PDFs and logo proposals retained. Dependencies installed locally and git-ignored. Target runtime: Node 24 LTS / npm 11.21.2; system runtime unchanged.

## Latest completed task

**JUV-103** — owner: Codex; branch: `feat/JUV-103-free-course-content`; date: 2026-11-07; status: `done`; authoring commit: `fa9b20d`. Three French lessons with examples, exercises, versioned rubrics and solutions; [readable course copy](reviews/meeting-notes-action-plan-v1.md). The project owner explicitly confirmed complete-lesson review, all three exercises and approval without corrections. Review metadata recorded in UTC; the approved lesson text is unchanged. Full `npm run verify` passed after acceptance under isolated Node 24.22.2/npm 11.21.2 (49 tests, draft/copy, links/views, contrasts, lint, typecheck, build). [Evidence and limits](delivery/VALIDATION-JUV-103.md).

## Not implemented

No published M0 course, business backend, cloud database, SMTP, domain or public deployment. The three approved French lessons remain in the editorial directory, with no publication timestamp; public inventory is still empty. Course pages and reader remain to implement. Current page is a brand workshop, not a first learning release. Local Fraunces/Inter remain JUV-105; workshop uses fallback fonts. Remote CI not run.

## Next M0 task

**JUV-104**: accessible course components. Continue M0 in dependency order; JUV-103 now satisfies its editorial review and walkthrough requirements. Course publication remains a separate release step, not a consequence of ticket closure.

Commands: `npm run context`, `npm run next -- M0`, `npm run task -- JUV-104`, `npm run check:course`. With Node 24: `npm ci`, `npm run verify`, `npm run dev`.

## Owners and open decisions

M0 drafts: Codex; accountable course owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer, C1 author/reviewer and operators remain to appoint; [product decisions](product/DECISIONS.md). Verify remote/hosting in the delivery ticket. ADR-005 documents managed-auth bcrypt versus Argon2id: review before real accounts.

Latest handoff: [Free-course content](sessions/2026-11-07-free-course-content.md). Earlier: [Public content schema](sessions/2026-11-07-public-content-schema.md), [M0 course plan](sessions/2026-11-07-m0-course-plan.md), [English documentation](sessions/2026-11-06-english-documentation.md).
