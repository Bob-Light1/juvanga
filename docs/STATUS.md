# Current status — Juvanga

Updated on 2026-11-07. **F0 complete; M0 underway. JUV-101–110 done; JUV-111 blocked; JUV-112 done; JUV-113/114 blocked after preparation.**

## Stable decisions

Juvanga; symbol B (J + sun); night/sand/gold; React/TypeScript/Vite/Motion. M0 is free and anonymous; M1 adds accounts/reviews; M2 is the commercial pilot. English documentation/code/comments; French launch interface in the shared catalogue. UTC storage, Africa/Douala display, integer XAF. Published course versions and rubrics remain immutable. Canonical JSON backlog; generated views; ADRs for structural changes.

## Repository

Local `main` contains JUV-101–110 and integration/cleanup documentation through `500bebb`. This session uses sequential feature branches; no merge, push or deployment has occurred. The project owner handles pushes. Remote CI remains unverified. Use isolated Node 24/npm 11 rather than changing the system runtime. [Prior integration](sessions/2026-11-07-learning-main-integration.md).

## Current work and evidence

**JUV-111** — owner: Codex; branch: `feat/JUV-111-help-privacy-feedback`; date: 2026-11-07; status: `blocked`; commit: `dd78857`. Static help/privacy/feedback pages, footer navigation, exact local-data/erasure notice and minimal feedback guidance. Full verify passed (87 tests); all three support browser scenarios passed. The owner selected a support URL but has not supplied its address or an authorized reception test. Retention/operator and hosting-log details remain unverified. No fictional contact/form. [Evidence](delivery/VALIDATION-JUV-111.md).

**JUV-112** — owner: Codex; branch: `feat/JUV-112-public-offline-pwa`; date: 2026-11-07; status: `done`; commit: `9ae5e25`. Exact public snapshot, manifest, standalone offline fallback, explicit update, separate progress storage and reduced motion; [ADR-013](architecture/decisions/013-public-offline.md). Full verify passed (94 tests); all 25 default browser scenarios passed across full/focused runs. All 17 synthetic-reader scenarios passed; the normal French noindex artifact was restored. Author technical/cache-boundary/visual review completed. [Evidence and measurements](delivery/VALIDATION-JUV-112.md), [handoff](sessions/2026-11-07-public-offline-pwa.md).

Previous learning delivery: [reader](delivery/VALIDATION-JUV-108.md), [practice](delivery/VALIDATION-JUV-109.md), [consented local resume](delivery/VALIDATION-JUV-110.md). Progress remains one optional exact-version reading record; exercises remain ephemeral.

## Release gates and next work

No real lessons are published: the approved French course remains editorial, with no publication timestamp; the public inventory is empty. Upcoming descriptions alone are public. Synthetic published content is test-only and must never remain in the default artifact.

JUV-113: owner Codex; branch `feat/JUV-113-acceptance-preparation`; date 2026-11-07; status `blocked`; commit `c899564` (preparation only). It cannot enter active acceptance while JUV-111 is incomplete. Five real testers have no observations yet; the [protocol and blank observation sheet](reviews/M0-ACCEPTANCE.md) are prepared. JUV-114: owner Codex; branch `feat/JUV-114-release-preparation`; date 2026-11-07; status `blocked` (preparation only). It depends on completed acceptance; Cloudflare access is not configured. The [release/rollback record](operations/M0-RELEASE.md) is prepared. No production origin, hosting project, verified remote headers, domain or rollback exists. Publication is a separate gated release step. JUV-111 support reception, real testers, physical devices, non-Chromium, screen readers and independent learner review remain unverified.

No business backend, database, accounts, SMTP, synchronization or configured English translation. ADR-005 requires review before real accounts. M0 course accountable owner/reviewer: project owner, self-appointed on 2026-11-07. Maintainer/C1/operator roles remain unassigned; [decisions](product/DECISIONS.md).

Commands: `npm run context`, `npm run task -- JUV-111`, `npm run verify`, `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`. Run browser suites sequentially; they share the output artifact.

Latest handoff: [Release preparation](sessions/2026-11-07-release-preparation.md). Final full `npm run verify` passed (94 tests); no pending active ticket or deployment.
