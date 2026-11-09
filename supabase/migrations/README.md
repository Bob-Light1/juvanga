# Application migrations

JUV-201 introduces `20261109000000_initial_profiles.sql`, local configuration, two fictional fixtures and transactional SQL permission tests. [ADR-014](../../docs/architecture/decisions/014-local-database.md) defines this deliberately minimal boundary. These files do not create a hosted project or enable real accounts.

Use `YYYYMMDDHHMMSS_description.sql` names, UTC and one author per schema change. Migrations are immutable after application. Include constraints, indexes, RLS, grants and tests. Never make unrecorded manual changes to the hosted schema. Restore storage objects separately; PostgreSQL dumps do not include files.

Run `npm run db:start`, then `npm run test:db` using Node 24/npm 11 and Docker. The test command resets the disposable local Juvanga database twice; it must never contain real data. It verifies migration history, per-role SQL behavior and anonymous Data API rejection. `npm run db:stop` stops only this project's stack and retains its local volumes. See [local development](../../docs/delivery/DEVELOPMENT.md#local-database).

New application objects belong in `app` and require explicit grants. Enable RLS before granting access. The hardened defaults apply to the `postgres` migration owner; another owner requires its own defaults and tests. Future role/session/content tables belong in their respective tickets. Do not add a browser Supabase client or a `VITE_*` credential.
