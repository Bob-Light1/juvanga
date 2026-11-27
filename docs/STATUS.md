# Current status — Juvanga

Updated on 2026-11-27. **F0 complete; M0 underway. JUV-101–112, JUV-115 and JUV-116 done; launch offer redefined (DEC-15); new N0 course (JUV-117) next; JUV-113/114 blocked. M1 local database foundation (JUV-201) done.**

## Stable decisions

Juvanga; symbol B (J + sun); night/sand/gold; React/TypeScript/Vite/Motion. M0 is free and anonymous; M1 adds accounts/reviews; M2 is the commercial pilot. English documentation/code/comments; French launch interface in the shared catalogue. UTC storage, Africa/Douala display, integer XAF. Published course versions and rubrics remain immutable. Canonical JSON backlog; generated views; ADRs for structural changes.

## Repository

PR #5 (JUV-113 course publication) and PR #6 (JUV-115 visuals) are merged; `main` is `5e80fcc` and its Quality CI passed. Use isolated Node 24/npm 11. Account email verification and active TOTP are recorded. Pages serves `main` with automatic deployments, so every merge to `main` republishes the public nonindexable technical site.

## Current work and evidence

**JUV-201** — owner: Codex; branch: `feat/JUV-201-local-database`; date: 2026-11-09; status: `done`. Local PostgreSQL 17, minimal profiles, explicit grants/forced RLS, fictional seed and pinned CLI; [ADR-014](architecture/decisions/014-local-database.md). Full verify passed (94 tests); both reset cycles passed 39 SQL assertions, no migration replay and actual anonymous API denial. Author technical review completed. [Evidence](delivery/VALIDATION-JUV-201.md). No hosted service or real account configured.

**JUV-111** — owner: Claude, at the owner's request; branch: `docs/JUV-111-closure`; date: 2026-11-21; status: `done`. Support contact, retention rule, operator and owner-validated Cloudflare notice are live on `260ddbf`. Main CI and [remote checks](operations/M0-RELEASE.md#corrected-notice-deployment-evidence--2026-11-21) passed. No precise provider log retention was found, and the notice says so. Not legal review. [Evidence](delivery/VALIDATION-JUV-111.md).

**JUV-112** — owner: Codex; branch: `feat/JUV-112-public-offline-pwa`; date: 2026-11-07; status: `done`; commit: `9ae5e25`. Exact public snapshot, manifest, standalone offline fallback, explicit update, separate progress storage and reduced motion; [ADR-013](architecture/decisions/013-public-offline.md). Full verify passed (94 tests); all 25 default browser scenarios passed across full/focused runs. All 17 synthetic-reader scenarios passed; the normal French noindex artifact was restored. Author technical/cache-boundary/visual review completed. [Evidence and measurements](delivery/VALIDATION-JUV-112.md), [handoff](sessions/2026-11-07-public-offline-pwa.md).

Previous learning delivery: [reader](delivery/VALIDATION-JUV-108.md), [practice](delivery/VALIDATION-JUV-109.md), [consented local resume](delivery/VALIDATION-JUV-110.md). Progress remains one optional exact-version reading record; exercises remain ephemeral.

## Release gates and next work

**JUV-116** — owner: Claude; branch: `docs/JUV-116-launch-offer`; date: 2026-11-27; status: `done`. The owner refocused launch on AI at work for executives and administrators: N0 free, N1, N2, leaders' session and community, with a waitlisted creator track. Durations, follow-up and prices excluding tax are approved; dual payment control is kept; nothing is on sale ([launch offer](product/OFFERS.md), [DEC-15](product/DECISIONS.md#dec-15-launch-offer--2026-11-27)). **JUV-117** (owner Claude, branch `feat/JUV-117-n0-course`, 2026-11-27, `in_progress`): owner-approved [N0 plan](product/N0-COURSE.md); [ADR-015](architecture/decisions/015-light-illustrations.md) automatic light images and icon callouts delivered; 6 diagrams and 6 draft lessons ready for owner review; 8 owner screenshots pending; `meeting-notes-action-plan` v1 stays live and immutable until N0 replaces it ([DEC-07](product/DECISIONS.md#dec-07-publication-decision--2026-11-26)).

JUV-113: owner Claude (reassigned from Codex by the owner, 2026-11-26); branch `docs/JUV-113-acceptance-artifact`; date 2026-11-27; status `blocked` on JUV-117 and real testers (DEC-15). The previous acceptance candidate is history: all 42 live public files match a local build of `5e80fcc`, cache `juvanga-public-2f9ae5e6c3ec725358ff`, 11 routes passed in headless Chrome at 360 px ([evidence](operations/M0-RELEASE.md#acceptance-candidate-deployment-evidence--2026-11-27)). JUV-115 (owner Claude, `done`): owner-approved loop, learner, icons, tab bar and motion ([evidence](delivery/VALIDATION-JUV-115.md)). Five real testers have no observations yet; the [protocol and blank observation sheet](reviews/M0-ACCEPTANCE.md) are prepared. JUV-114: owner Codex, reassigned for repository preparation; branch `feat/JUV-114-domain-record`; date 2026-11-20; status `blocked` (preparation only). **`juvanga.com` is purchased and active at Cloudflare Registrar**, evidenced by owner-supplied screenshots; see [registration facts and limits](operations/M0-RELEASE.md#domain-registration-evidence--2026-11-12). Custom-domain DNS/HTTPS attachment and email verification remain unverified. No official production origin or rollback exists. Official release requires completed acceptance; the separately authorized technical bootstrap is described in [the release record](operations/M0-RELEASE.md#technical-bootstrap-authorized--2026-11-20). Real testers, physical devices, non-Chromium, screen readers and independent learner review remain unverified.

No business backend, hosted database, real accounts, SMTP, synchronization or configured English translation. JUV-201 uses fictional local data only. ADR-005 requires review before real accounts. M0 course accountable owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer/C1 roles remain unassigned; the M0 hosting/support operator is confirmed; [decisions](product/DECISIONS.md).

Commands: `npm run context`, `npm run task -- JUV-113`, `npm run verify`, `npm run db:start`, `npm run test:db`, `npm run db:stop`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`. Run browser suites sequentially; they share the output artifact.

JUV-202 still depends on JUV-114. Custom-domain DNS/HTTPS, rollback and human acceptance remain unverified.

Latest handoff: [Launch offer](sessions/2026-11-27-launch-offer.md). Prior: [acceptance artifact](sessions/2026-11-27-acceptance-artifact.md), [orientation visuals](sessions/2026-11-26-orientation-visuals.md), [course publication](sessions/2026-11-26-course-publication.md), [technical deployment](sessions/2026-11-21-technical-deployment.md).
