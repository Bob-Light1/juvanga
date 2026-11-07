# ADR-005 — managed identity and BFF sessions

Date: 2026-11-06. Status: adopted for M1 preparation; JUV-204 spike and security review required.

Decision: Supabase Auth for identity/email/MFA behind the Hono API. Opaque HttpOnly cookie; provider refresh tokens encrypted on the server, revocable session. No auth SDK persisting tokens in frontend localStorage. Data calls use user identity and RLS; service-role limited to isolated privileged operations.

Explicit PDF deviation: Supabase documents bcrypt for passwords, while SEC-01 proposed/required Argon2id. Managed auth avoids building infrastructure for M0/M1 but does not literally satisfy Argon2id. The technical owner must accept this deviation before real accounts; otherwise replace the auth adapter with an Argon2id solution and re-estimate M1.

Supabase built-in SMTP is limited to testing and authorized recipients; it does not establish working public registration. Plan external SMTP and sender domain, or a closed pilot with controlled test accounts. Never disable email confirmation to hide the issue.

Expected evidence: rotation/revocation, CSRF, concurrent refresh, no client tokens, server MFA, role isolation, CPU budget. Sources: https://supabase.com/docs/guides/auth/password-security and https://supabase.com/docs/guides/auth/auth-smtp, consulted on 2026-11-06.
