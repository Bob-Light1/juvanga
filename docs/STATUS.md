# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway; JUV-103 in review.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette with verified contrast; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts and reviews. M2: V1.3 commercial pilot. Canonical JSON backlog, generated views and ADRs for structural changes. Documentation, code, identifiers and all code comments must be in English (DEC-14); the launch interface remains in French.

## Delivered and verified

Original F0: 86 detailed tasks, 47 traced requirements, product/architecture/quality/operations documents, brand/assets, frontend workshop, restart scripts, CI and contribution templates. Nine tooling and three browser tests passed; links/contrast/lint/typecheck/build passed; production dependency audit reported no known vulnerabilities. [Historical report and limitations](delivery/VALIDATION-F0.md).

Files integrated into this repository; current git inspection shows an initial commit and an `origin` remote. Remote access and CI have not been verified in this session. Original PDFs and logo proposals retained. Dependencies installed locally and git-ignored. Target runtime: Node 24 LTS / npm 11.21.2; system runtime unchanged.

## Latest completed task

**JUV-102** — owner: Codex; branch: `feat/JUV-102-public-content-schema`; date: 2026-11-07; status: `done`. [Public course contract](architecture/PUBLIC-CONTENT.md), strict Zod schemas, versioned inventory and CLI/Vite build gate. HTML, unsafe URLs, broken lesson references, drafts, unexpected files and symlinks are rejected. [ADR-006](architecture/decisions/006-public-content.md). Full `npm run verify` passed under isolated Node 24.22.2/npm 11.21.2: 49 tests, links/views, contrasts, lint, typecheck and build. [Evidence and limitations](delivery/VALIDATION-JUV-102.md).

## Not implemented

No published M0 course, business backend, cloud database, SMTP, domain or public deployment. Three French lessons are drafted for review; learner pages and reviewed publication remain unavailable. Current page is a brand workshop, not a first learning release. Local Fraunces/Inter remain JUV-105; workshop uses fallback fonts. Remote CI not run.

## Current M0 task

**JUV-103** — owner: Codex; branch: `feat/JUV-103-free-course-content`; date: 2026-11-07; status: `in_review`. Three complete French lessons, examples, exercises, versioned rubrics and solutions are prepared in the canonical draft; [readable review copy](reviews/meeting-notes-action-plan-v1.md). Provenance and rights are recorded. Full `npm run verify` passed with 49 tests and the new draft/review-copy check. [Evidence and limits](delivery/VALIDATION-JUV-103.md).

Next: the designated project owner performs the pedagogical review and full non-author exercise walkthrough. No review or publication timestamp is invented. JUV-103 stays in review until these results are recorded; dependent tickets stay unstarted. JUV-104 (components) is independently ready.

Commands: `npm run context`, `npm run task -- JUV-103`, `npm run course:review`, `npm run check:course`. With Node 24: `npm ci`, `npm run verify`, `npm run dev`.

## Owners and open decisions

M0 drafts: Codex; accountable course owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer, C1 author/reviewer and operators remain to appoint; [product decisions](product/DECISIONS.md). Verify remote/hosting in the delivery ticket. ADR-005 documents managed-auth bcrypt versus Argon2id: review before real accounts.

Latest handoff: [Free-course content](sessions/2026-11-07-free-course-content.md). Earlier: [Public content schema](sessions/2026-11-07-public-content-schema.md), [M0 course plan](sessions/2026-11-07-m0-course-plan.md), [English documentation](sessions/2026-11-06-english-documentation.md).
