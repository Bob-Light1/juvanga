-- Disposable local fixtures only. These unconfirmed identities have no login credentials.
insert into auth.users (id, aud, role, email, created_at, updated_at)
values
  ('11111111-1111-4111-8111-111111111111', 'authenticated', 'authenticated', 'learner-a@example.invalid', '2026-11-09T00:00:00Z', '2026-11-09T00:00:00Z'),
  ('22222222-2222-4222-8222-222222222222', 'authenticated', 'authenticated', 'learner-b@example.invalid', '2026-11-09T00:00:00Z', '2026-11-09T00:00:00Z');

insert into app.profiles (user_id, display_name, created_at)
values
  ('11111111-1111-4111-8111-111111111111', 'Fictional learner A', '2026-11-09T00:00:00Z'),
  ('22222222-2222-4222-8222-222222222222', 'Fictional learner B', '2026-11-09T00:00:00Z');
