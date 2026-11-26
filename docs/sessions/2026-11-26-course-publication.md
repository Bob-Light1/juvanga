# Handoff — 2026-11-26 — Claude

- Ticket(s), branch and commit if any: JUV-113 (reassigned from Codex by the owner), `feat/JUV-113-course-publication`, based on the unmerged `docs/JUV-111-closure` commit `52c1e44`.
- Session objective: publish the owner-approved French course for real-tester acceptance.
- Completed / evidence: [owner decision](../product/DECISIONS.md#dec-07-publication-decision--2026-11-26). `content/public/meeting-notes-action-plan/v1.json` is the approved draft with only `status: published` and `publishedAt: 2026-11-26T07:50:59Z`; a content test enforces that equality. The discovery teaser is retired. Unit and browser tests that encoded the unpublished state now assert the published course, the exact-version boundary (v2 stays 404) and precaching limited to this course. Mobile screenshots of the detail page and first lesson were inspected.
- Commands actually run and results: on Node 24.22.3/npm 11.19.1 (installed with nvm; host default stays Node 20), `npm run verify` passed 95 tests, docs/course/contrast, lint, TypeScript and the noindex build (147,843 bytes gzip JS, 9 prerendered pages). `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` passed 25 scenarios, then `test:reader` passed 17 and restored the normal artifact. `git diff --check` passed.
- Not verified: remote site after merge, real testers, physical devices, non-Chromium browsers, screen readers, independent learner review.
- New decisions (ADR/DEC links): DEC-07 publication decision; no architecture change.
- Blockers / owner / next action: the owner merges to `main` (republishes the nonindexable `pages.dev` site), appoints a facilitator, recruits five consenting testers and chooses participant-record retention.
- Files in progress and conflict risks: merging publishes the course on the technical site; v1 is now immutable.
- Next task and first command: after merge, record the deployed commit and URL in [M0-ACCEPTANCE](../reviews/M0-ACCEPTANCE.md); `npm run task -- JUV-113`.
