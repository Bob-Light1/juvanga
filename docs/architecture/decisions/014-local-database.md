# ADR-014 — local database boundary and explicit privileges

- Date: 2026-11-09
- Status: adopted for local M1 preparation
- Owner: Codex
- Related ticket: JUV-201

## Context and decision

ADR-002 selects Supabase PostgreSQL. M0 remains static and anonymous; this ticket must not create hosted resources, publish the course or enable real accounts. Use a pinned project-local Supabase CLI with PostgreSQL 17, versioned SQL migrations and a fictional local seed. Commands explicitly target the local stack and accept no remote arguments. The local project ID and ports are distinct from other projects on the host.

The initial application schema is `app`, exposed by the local Data API instead of `public`. Its only table is `app.profiles`: an Auth UUID reference, bounded display name and UTC creation timestamp. It contains no email, business role, session, enrollment or entitlement. Authenticated users can read their own profile using `auth.uid()`; profile writes are reserved to the server role pending the profile/API tickets. Anonymous users have no application schema access. Enable and force RLS, revoke implicit grants and grant each necessary operation explicitly. The provider's `service_role` bypasses RLS: its key remains server-only and its use is not an authorization strategy for ordinary requests.

Harden default table and sequence privileges in `app` for the migration owner `postgres`. Revoke the global default function EXECUTE grant to PUBLIC for that owner: a per-schema revoke cannot override the global PostgreSQL default. This also affects new functions created by `postgres` outside `app`; subsequent extension installations must verify their intended grants. Future application functions require explicit grants. Application migrations must use that owner or separately harden and test the actual creator's defaults. Do not change provider-owned Auth/Storage tables, roles or extension schemas.

Seed two fictional, unconfirmed Auth identities with no password/identity credentials and their profiles. No real sign-in, account provisioning or email is claimed. Tests set the database role and JWT claim in a transaction; these simulate verified identities for RLS testing, not BFF authentication. The setup session remains privileged, so `SET ROLE` attempts cannot test an unprivileged login's role-switch boundary; test denied current-role operations such as `ALTER ROLE ... BYPASSRLS` instead. Actual login/JWT and role assignment attacks remain JUV-204/205 work.

## Alternatives

- Using `public` retains legacy automatic exposure and mixes application objects with extensions. A dedicated schema makes intended exposure and grants explicit.
- Implementing the complete target model now would preempt the identity, authorization, content and commercial tickets. Add their constraints and policies in their owning migrations.
- A second ORM or custom migration runner duplicates the selected CLI's ordered migration history. Keep SQL portable and use the existing provider tooling.
- PostgreSQL alone can check SQL behavior but cannot establish the Supabase reset history or Data API boundary. Local Supabase integration remains required evidence.

## Consequences and validation

The frontend has no database dependency or browser key. Auth/SMTP/Storage/BFF, real-role isolation, hosted configuration and restoration remain later work. SQL tests cover anonymous denial, user A/B isolation, unclaimed identities, denied writes and role escalation, service-role access, defaults and foreign-key/name constraints. The integration runner resets twice and applies pending migrations after each reset to check that history prevents replay. CI runs the same local integration separately from frontend verification.

Sources consulted on this date are recorded in [SOURCES](../../SOURCES.md). Results and unrun checks belong in [JUV-201 validation](../../delivery/VALIDATION-JUV-201.md).

## Migration and rollback

Apply ordered migrations through the local CLI; never edit an applied migration. Reset only the disposable fictional local database. Future hosted adoption must explicitly configure the exposed schema and validate grants with the actual migration owner before accepting data. M0 JSON publication and stable IDs are unaffected. Revert the code/configuration before hosted adoption, or add a forward migration afterward; do not drop real profile data as a rollback. Later profile editing, roles and sessions extend this boundary through reviewed migrations.
