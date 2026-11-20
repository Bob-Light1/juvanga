-- Application objects are opt-in; provider schemas remain provider-owned.
create schema app authorization postgres;
revoke all on schema app from public, anon, authenticated, service_role;
grant usage on schema app to authenticated, service_role;

alter default privileges for role postgres in schema app
  revoke all on tables from public, anon, authenticated, service_role;
alter default privileges for role postgres in schema app
  revoke all on sequences from public, anon, authenticated, service_role;
-- A per-schema revoke cannot remove PostgreSQL's global PUBLIC EXECUTE default.
alter default privileges for role postgres
  revoke execute on functions from public, anon, authenticated, service_role;

create table app.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null
    check (char_length(display_name) between 1 and 80 and display_name = btrim(display_name)),
  created_at timestamptz not null default now()
);

alter table app.profiles enable row level security;
alter table app.profiles force row level security;
revoke all on app.profiles from public, anon, authenticated, service_role;
grant select on app.profiles to authenticated;
grant select, insert, update, delete on app.profiles to service_role;

create policy profiles_read_own on app.profiles
  for select to authenticated
  using ((select auth.uid()) = user_id);

comment on table app.profiles is
  'Private identity profile. No business role or learning entitlement. Writes require server authorization.';
