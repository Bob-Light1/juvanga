# JUV-201 — Local database foundation

Date: 2026-11-09. Owner: Codex. Branch: `feat/JUV-201-local-database`.
Status: done; local integration and author technical review completed.

## Scope

[ADR-014](../architecture/decisions/014-local-database.md) defines a local Supabase/PostgreSQL 17 project, an ordered migration for `app.profiles`, explicit grants, forced RLS and two fictional unconfirmed identities without credentials. The application schema contains no roles, sessions, learning access or financial state. The M0 frontend remains static and independent. Local start/reset/test/stop commands accept no remote target or additional flags. A separate database CI job is prepared; remote execution is not verified.

## Verification

- `npm run verify` passed with isolated Node 24.22.2/npm 11.21.2: docs/course/contrast, 94 tests, lint, strict TypeScript and full client/prerender/PWA build. Log: `/tmp/juvanga-201-verify.log`. The default artifact remains a French noindex preview with no real published lessons.
- All 39 pgTAP assertions passed in the focused run. Both complete reset cycles passed all 39 assertions, returned no pending migrations and denied anonymous Data API access with PostgreSQL code `42501`. `npm run test:db` exited successfully; the initial migration appears exactly once in each rebuilt history. Logs: `/tmp/juvanga-201-db-focused.log`, `/tmp/juvanga-201-db-tests.log`.
- The SQL checks cover fixture reproducibility/history, UUID/timestamp/name/FK constraints, forced RLS, anonymous denial, A/B isolation, missing/unknown identity, denied writes and RLS-bypass attribute changes, explicit server access, new-object defaults and accidental broad grants. Each test file rolls back its temporary objects/privileges.
- The command guard rejects additional remote flags before invoking the CLI. Author technical review checks schema ownership, explicit grants, RLS policies, test rollback, credential handling and local-only command selection.

The first starts encountered occupied ports and a cold-init timeout. Juvanga moved to free ports 56321/56322, left other projects intact and passed startup with a five-minute health timeout; no health check was skipped. Supabase CLI 2.121.0 is pinned and was installed from the local npm cache. The official Node 24 archive was verified against its SHA-256 list. Logs: `/tmp/juvanga-201-db-start.log`.

An initial role-switch assertion was invalid for a privileged SQL setup session. It was replaced with an actual current-role `ALTER ROLE ... BYPASSRLS` denial and the SQL helper now supports statements without rows. Tests do not claim that `SET ROLE` impersonation validates real login/session boundaries. Browser suites, hosted checks and remote CI were not run for this backend change.

`npm run db:stop` completed after validation; no Juvanga container remains running and other local projects remained active. Fictional Juvanga volumes were retained. Log: `/tmp/juvanga-201-db-stop.log`.

## Limits

No hosted Supabase project, real user, external SMTP, BFF session, MFA, role model, storage bucket or deployment is configured by this ticket. Database role/JWT-claim simulation is not proof of API authentication. Future identity/security tickets and ADR-005 review remain required before real accounts. The existing M0 support, real-tester and release gates remain open; [owner actions](../operations/OWNER-ACTIONS.md) describes them.
