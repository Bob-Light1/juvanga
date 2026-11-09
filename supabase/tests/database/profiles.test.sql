begin;
create extension if not exists pgtap with schema extensions;
set local search_path = app, extensions, public;
select no_plan();

select is((select count(*)::integer from supabase_migrations.schema_migrations where version = '20261109000000'),
  1, 'the initial migration is recorded exactly once');

-- Keep assertions privileged; execute the actual query as an unprivileged role.
-- Each call restores the role even when the query raises an expected error.
create function pg_temp.run_as(role_name name, subject text, statement text, returns_rows boolean default true)
returns jsonb language plpgsql security invoker as $$
declare result jsonb;
begin
  perform set_config('request.jwt.claim.sub', coalesce(subject, ''), true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', subject, 'role', role_name)::text, true);
  execute format('set local role %I', role_name);
  if returns_rows then
    execute statement into result;
  else
    execute statement;
  end if;
  reset role;
  return result;
exception when others then
  reset role;
  raise;
end;
$$;

select is((select count(*)::integer from app.profiles), 2, 'reset seeds exactly two fictional profiles');
select is((select count(*)::integer from auth.users where email like '%@example.invalid' and encrypted_password is null and email_confirmed_at is null), 2, 'fixtures have no password or confirmed email');
select col_type_is('app', 'profiles', 'user_id', 'uuid', 'identity uses UUID');
select col_type_is('app', 'profiles', 'created_at', 'timestamp with time zone', 'timestamps retain UTC instants');
select ok((select relrowsecurity and relforcerowsecurity from pg_class where oid = 'app.profiles'::regclass), 'profile RLS is enabled and forced');
select ok(not has_schema_privilege('anon', 'app', 'USAGE'), 'anonymous has no schema access');
select ok(not has_schema_privilege('authenticated', 'app', 'CREATE'), 'users cannot create application objects');
select ok(not has_table_privilege('anon', 'app.profiles', 'SELECT'), 'anonymous has no profile SELECT grant');
select ok(not has_table_privilege('authenticated', 'app.profiles', 'INSERT'), 'users cannot provision profiles');
select ok(not has_table_privilege('authenticated', 'app.profiles', 'UPDATE'), 'profile editing is not yet exposed');
select ok(not has_table_privilege('authenticated', 'app.profiles', 'DELETE'), 'users cannot delete profiles directly');
select ok(not has_table_privilege('service_role', 'app.profiles', 'TRUNCATE'), 'server role has no truncate grant');

select throws_ok($q$select pg_temp.run_as('anon', null, 'select to_jsonb(p) from app.profiles p')$q$, '42501', null, 'anonymous SQL read is denied');
select is(pg_temp.run_as('authenticated', '11111111-1111-4111-8111-111111111111',
  $$select jsonb_agg(display_name order by user_id) from app.profiles$$),
  '["Fictional learner A"]'::jsonb, 'user A reads only A');
select is(pg_temp.run_as('authenticated', '22222222-2222-4222-8222-222222222222',
  $$select jsonb_agg(display_name order by user_id) from app.profiles$$),
  '["Fictional learner B"]'::jsonb, 'user B reads only B');
select is(pg_temp.run_as('authenticated', '22222222-2222-4222-8222-222222222222',
  $$select to_jsonb(count(*)) from app.profiles where user_id = '11111111-1111-4111-8111-111111111111'$$),
  '0'::jsonb, 'explicit ID lookup cannot bypass isolation');
select is(pg_temp.run_as('authenticated', null, $$select to_jsonb(count(*)) from app.profiles$$),
  '0'::jsonb, 'missing identity sees no profiles');
select is(pg_temp.run_as('authenticated', '33333333-3333-4333-8333-333333333333',
  $$select to_jsonb(count(*)) from app.profiles$$), '0'::jsonb, 'unknown identity sees no profiles');
select throws_ok($q$select pg_temp.run_as('authenticated', '11111111-1111-4111-8111-111111111111',
  $$update app.profiles set display_name = 'Changed' returning to_jsonb(profiles)$$)$q$,
  '42501', null, 'direct profile writes are denied');
select throws_ok($q$select pg_temp.run_as('authenticated', '11111111-1111-4111-8111-111111111111',
  $$alter role authenticated bypassrls$$, false)$q$, '42501', null, 'users cannot grant themselves RLS bypass');
select is(pg_temp.run_as('service_role', null, $$select to_jsonb(count(*)) from app.profiles$$),
  '2'::jsonb, 'isolated server role can access both fictional profiles');
select lives_ok($q$select pg_temp.run_as('service_role', null,
  $$update app.profiles set display_name = 'Server-authorized fixture' where user_id = '11111111-1111-4111-8111-111111111111' returning to_jsonb(profiles)$$)$q$,
  'server role can perform an explicitly granted write');

select throws_ok($q$insert into app.profiles (user_id, display_name) values ('33333333-3333-4333-8333-333333333333', 'Unknown user')$q$,
  '23503', null, 'a profile requires a real Auth reference');
select throws_ok($q$insert into app.profiles (user_id, display_name) values ('11111111-1111-4111-8111-111111111111', 'Duplicate')$q$,
  '23505', null, 'one profile per Auth identity');
select throws_ok($q$update app.profiles set display_name = ''$q$, '23514', null, 'empty names are rejected');
select throws_ok($q$update app.profiles set display_name = ' padded '$q$, '23514', null, 'padded names are rejected');
select throws_ok($q$update app.profiles set display_name = repeat('a', 81)$q$, '23514', null, 'overlong names are rejected');

-- A later migration must explicitly grant access to every new object.
create table app.permission_probe (id bigint generated by default as identity);
create function app.permission_probe() returns boolean language sql as 'select true';
select ok(not has_table_privilege('anon', 'app.permission_probe', 'SELECT'), 'new tables are not granted to anonymous');
select ok(not has_table_privilege('authenticated', 'app.permission_probe', 'SELECT'), 'new tables are not implicitly granted to users');
select ok(not has_table_privilege('service_role', 'app.permission_probe', 'SELECT'), 'new tables require explicit server grants');
select ok(not has_sequence_privilege('authenticated', 'app.permission_probe_id_seq', 'USAGE'), 'new sequences have no implicit user grant');
select ok(not has_function_privilege('anon', 'app.permission_probe()', 'EXECUTE'), 'new functions have no PUBLIC execute grant');
select ok(not has_function_privilege('authenticated', 'app.permission_probe()', 'EXECUTE'), 'users require explicit function grants');
select ok(not has_function_privilege('service_role', 'app.permission_probe()', 'EXECUTE'), 'server functions also need explicit grants');

-- Verify RLS separately from grants, including accidental future broad grants.
grant usage on schema app to anon;
grant select on app.profiles to anon;
grant insert, update, delete on app.profiles to authenticated;
select is(pg_temp.run_as('anon', null, $$select to_jsonb(count(*)) from app.profiles$$),
  '0'::jsonb, 'RLS still denies anonymous rows after a mistaken grant');
select is(pg_temp.run_as('authenticated', '22222222-2222-4222-8222-222222222222',
  $$with changed as (update app.profiles set display_name = 'Stolen' returning user_id) select to_jsonb(count(*)) from changed$$),
  '0'::jsonb, 'RLS prevents updates even after a mistaken grant');
select is(pg_temp.run_as('authenticated', '22222222-2222-4222-8222-222222222222',
  $$with changed as (delete from app.profiles returning user_id) select to_jsonb(count(*)) from changed$$),
  '0'::jsonb, 'RLS prevents deletes even after a mistaken grant');
select throws_ok($q$select pg_temp.run_as('authenticated', '33333333-3333-4333-8333-333333333333',
  $$insert into app.profiles (user_id, display_name) values ('33333333-3333-4333-8333-333333333333', 'Forged') returning to_jsonb(profiles)$$)$q$,
  '42501', null, 'RLS prevents inserts even after a mistaken grant');

select * from finish();
rollback;
