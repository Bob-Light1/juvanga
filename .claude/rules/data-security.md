---
paths:
  - "supabase/**"
  - "apps/api/**"
  - "packages/contracts/**"
---

# Data, API and security work

Read as needed: `docs/architecture/SECURITY.md`, `DATA-MODEL.md`, `API.md`, ADR-005 (auth), ADR-014 (local database), `supabase/migrations/README.md`.

- Applied migrations are immutable. Add a new `YYYYMMDDHHMMSS_description.sql` file.
- New objects belong in schema `app`, with RLS enabled before explicit grants.
- No browser Supabase client and no credential in `VITE_*`.
- Critical transactions use one controlled SQL function. The actor comes from verified identity, never from client input.
- `SECURITY DEFINER` requires a fixed `search_path`, minimal `EXECUTE`, internal checks and direct-call tests.
- Use fictional data only. Validate with `npm run db:start`, `npm run test:db`, `npm run db:stop` (Node 24 and Docker).
- Auth, finance, SQL and cross-organization changes need review by a different person.
