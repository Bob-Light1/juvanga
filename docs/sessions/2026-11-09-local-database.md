# Local database and owner-action handoff

Date: 2026-11-09. Owner: Codex. Branch: `feat/JUV-201-local-database`. Status: done.

JUV-201 was the only ready ticket (JUV-006 done), independent of the blocked M0 release. Added the minimal local profile schema, explicit grants/forced RLS, fictional fixtures, fixed local commands and a separate database CI job under [ADR-014](../architecture/decisions/014-local-database.md). [Validation](../delivery/VALIDATION-JUV-201.md) records results and limitations. No hosted account, real identity or deployment was created; no merge or push occurred.

Full `npm run verify` passed with isolated Node 24.22.2/npm 11.21.2 (94 tests, lint, strict TypeScript and full static/PWA build). `npm run test:db` passed both full reset cycles: 39 pgTAP assertions per cycle, no migration replay and actual anonymous API denial (PostgreSQL `42501`). Author technical review completed. Browser suites and remote CI were not run for this backend change. M0 still has no published real lessons.

The owner chose an external support form and deletion 90 days after closure. [Owner actions](../operations/OWNER-ACTIONS.md) is the canonical setup guide; provider, responder URL, receiving operator, deletion routine and reception evidence remain pending. M0 real-tester and hosting gates remain open.

The Juvanga local stack was stopped after verification, retaining its fictional volumes. Other local projects remained running. No ticket is ready now: JUV-202 still requires completed M0 release (JUV-114).
