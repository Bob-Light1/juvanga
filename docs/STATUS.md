# Current status — Juvanga

Updated on 2026-11-06. **F0 complete; next milestone M0.**

## Stable decisions

Name Juvanga; symbol B (J + sun); night/sand/gold palette with verified contrast; React/TypeScript/Vite/Motion. M0: free public course, no mandatory account. M1: accounts and reviews. M2: V1.3 commercial pilot. Canonical JSON backlog, generated views and ADRs for structural changes. Documentation, code, identifiers and all code comments must be in English (DEC-14); the launch interface remains in French.

## Delivered and verified

Original F0: 86 detailed tasks, 47 traced requirements, product/architecture/quality/operations documents, brand/assets, frontend workshop, restart scripts, CI and contribution templates. Nine tooling and three browser tests passed; links/contrast/lint/typecheck/build passed; production dependency audit reported no known vulnerabilities. [Historical report and limitations](delivery/VALIDATION-F0.md).

Files integrated into this repository; git initialized, no commit or remote created. Original PDFs and logo proposals retained. Dependencies installed locally and git-ignored. Target runtime: Node 24 LTS / npm 11.21.2; system runtime unchanged.

## Latest completed task

**JUV-007** — owner: Codex; branch: `feat/JUV-007-english-documentation`; date: 2026-11-06; status: `done`. Maintained docs, canonical backlog and generator translated; English source companions added; code-comment language made explicit. The backlog now has 87 tasks. `npm run verify` passed (9 tests, docs/links, contrasts, lint, typecheck and build); all 114 original archive files retain their SHA-256 hashes. See [translation handoff](sessions/2026-11-06-english-documentation.md).

## Not implemented

No real M0 course, business backend, cloud database, SMTP, domain or public deployment. Current page is a brand workshop, not a first learning release. Local Fraunces/Inter remain JUV-105; workshop uses fallback fonts. Remote CI not run.

## Next product task

**JUV-101**: define the first free course outcome, then author and reviewer. JUV-104 (components) and JUV-201 (local database, if backend team available) can proceed independently; prioritize M0.

Commands: `npm run context`, `npm run next -- M0`, `npm run task -- JUV-101`. With Node 24: `npm ci`, `npm run verify`, `npm run dev`.

## Owners and open decisions

Maintainer, author, reviewer and operators to appoint; [product decisions](product/DECISIONS.md). Configure remote/hosting in the delivery ticket. ADR-005 documents managed-auth bcrypt versus Argon2id: review before real accounts.

Latest handoff: [English documentation](sessions/2026-11-06-english-documentation.md). Earlier: [foundations](sessions/2026-11-06-foundations.md).
