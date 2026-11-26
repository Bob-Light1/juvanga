# Current status — Juvanga

Updated on 2026-11-26. **F0 complete; M0 underway. JUV-101–112 done; approved course v1 published for acceptance on branch; JUV-113/114 blocked; technical `pages.dev` deployment verified. M1 local database foundation (JUV-201) done.**

## Stable decisions

Juvanga; symbol B (J + sun); night/sand/gold; React/TypeScript/Vite/Motion. M0 is free and anonymous; M1 adds accounts/reviews; M2 is the commercial pilot. English documentation/code/comments; French launch interface in the shared catalogue. UTC storage, Africa/Douala display, integer XAF. Published course versions and rubrics remain immutable. Canonical JSON backlog; generated views; ADRs for structural changes.

## Repository

PR #2 is merged at `7f78d38`; its main CI passed. Use isolated Node 24/npm 11. Account email verification and active TOTP are recorded. Pages serves `main` with automatic deployments, so every merge to `main` republishes the public nonindexable technical site.

## Current work and evidence

**JUV-201** — owner: Codex; branch: `feat/JUV-201-local-database`; date: 2026-11-09; status: `done`. Local PostgreSQL 17, minimal profiles, explicit grants/forced RLS, fictional seed and pinned CLI; [ADR-014](architecture/decisions/014-local-database.md). Full verify passed (94 tests); both reset cycles passed 39 SQL assertions, no migration replay and actual anonymous API denial. Author technical review completed. [Evidence](delivery/VALIDATION-JUV-201.md). No hosted service or real account configured.

**JUV-111** — owner: Claude, at the owner's request; branch: `docs/JUV-111-closure`; date: 2026-11-21; status: `done`. Support contact, retention rule, operator and owner-validated Cloudflare notice are live on `260ddbf`. Main CI and [remote checks](operations/M0-RELEASE.md#corrected-notice-deployment-evidence--2026-11-21) passed. No precise provider log retention was found, and the notice says so. Not legal review. [Evidence](delivery/VALIDATION-JUV-111.md).

**JUV-112** — owner: Codex; branch: `feat/JUV-112-public-offline-pwa`; date: 2026-11-07; status: `done`; commit: `9ae5e25`. Exact public snapshot, manifest, standalone offline fallback, explicit update, separate progress storage and reduced motion; [ADR-013](architecture/decisions/013-public-offline.md). Full verify passed (94 tests); all 25 default browser scenarios passed across full/focused runs. All 17 synthetic-reader scenarios passed; the normal French noindex artifact was restored. Author technical/cache-boundary/visual review completed. [Evidence and measurements](delivery/VALIDATION-JUV-112.md), [handoff](sessions/2026-11-07-public-offline-pwa.md).

Previous learning delivery: [reader](delivery/VALIDATION-JUV-108.md), [practice](delivery/VALIDATION-JUV-109.md), [consented local resume](delivery/VALIDATION-JUV-110.md). Progress remains one optional exact-version reading record; exercises remain ephemeral.

## Release gates and next work

The owner decided on 2026-11-26 to publish `meeting-notes-action-plan` v1 for acceptance ([DEC-07 publication decision](product/DECISIONS.md#dec-07-publication-decision--2026-11-26)). The public copy equals the approved draft except `status`/`publishedAt`, enforced by a test. It reaches the nonindexable technical site only after merge to `main`. Version 1 is immutable. Synthetic published content is test-only and must never remain in the default artifact.

JUV-113: owner Claude (reassigned from Codex by the owner, 2026-11-26); branch `feat/JUV-113-course-publication`; status `blocked` on real testers. Five real testers have no observations yet; the [protocol and blank observation sheet](reviews/M0-ACCEPTANCE.md) are prepared. JUV-114: owner Codex, reassigned for repository preparation; branch `feat/JUV-114-domain-record`; date 2026-11-20; status `blocked` (preparation only). **`juvanga.com` is purchased and active at Cloudflare Registrar**, evidenced by owner-supplied screenshots; see [registration facts and limits](operations/M0-RELEASE.md#domain-registration-evidence--2026-11-12). Custom-domain DNS/HTTPS attachment and email verification remain unverified. No official production origin or rollback exists. Official release requires completed acceptance; the separately authorized technical bootstrap is described in [the release record](operations/M0-RELEASE.md#technical-bootstrap-authorized--2026-11-20). Real testers, physical devices, non-Chromium, screen readers and independent learner review remain unverified.

No business backend, hosted database, real accounts, SMTP, synchronization or configured English translation. JUV-201 uses fictional local data only. ADR-005 requires review before real accounts. M0 course accountable owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer/C1 roles remain unassigned; the M0 hosting/support operator is confirmed; [decisions](product/DECISIONS.md).

Commands: `npm run context`, `npm run task -- JUV-113`, `npm run verify`, `npm run db:start`, `npm run test:db`, `npm run db:stop`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`. Run browser suites sequentially; they share the output artifact.

JUV-202 still depends on JUV-114. Full local verify passed (94 tests); 17 reader scenarios passed and the French noindex artifact was restored. CI on `f098d48` passed 94 tests, all 25 browser scenarios and two 39-assertion database cycles. Custom-domain DNS/HTTPS, rollback and human acceptance remain unverified.

Latest handoff: [Course publication](sessions/2026-11-26-course-publication.md). Prior: [technical deployment](sessions/2026-11-21-technical-deployment.md), [technical bootstrap](sessions/2026-11-20-technical-bootstrap.md).
