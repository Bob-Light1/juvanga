# Security and privacy by milestone

## M0: public surface

Reviewed content without arbitrary HTML, safe links, locked dependencies, CSP and headers, no implicit collection of deliverables. Optional, erasable local progress limited to reading. Describe feedback and host logs in the notice; do not publish a form that sends to a fictional address. Foundation preview pages remain `noindex`.

## M1: accounts and private data

The BFF API calls Supabase Auth. The browser receives neither refresh tokens nor a service-role key. Cookie `__Host-juvanga_session`, Secure/HttpOnly/SameSite=Lax, Path=/, no Domain in production; random opaque 256-bit ID, hashed in the DB. Revocable DB sessions with idle/absolute expiry. Provider tokens encrypted at rest with a server key (rotation planned), in a table not exposed to clients. Rate-limit auth requests; never log or cache passwords. Components never construct an admin role from user_metadata.

Proposed lifetimes (12 hours idle, 7 days absolute for learners; 30 minutes idle for privileges) need confirmation in JUV-204. Rotate after authentication/role change; protect concurrent refresh through DB lease/version and multiple-tab tests. Session-bound synchronizer CSRF token and strict Origin checks on mutations; no wildcard CORS with credentials.

The PDF's Argon2id is replaced by Supabase Auth managed hashing (documented bcrypt): explicit deviation in ADR-005, no claim of Argon2id compliance. If the requirement must remain strict, replace the auth adapter before M1.

Permissions combine RBAC + resource + organization/cohort + state + period. RLS and API complement each other; stored objects are private. IDOR tests for reading, search, exports, files and future notifications. Enforce duplicates/concurrency in the DB, never only with a frontend `if`.

## M2: finance and operations

MFA required for approval, issuance and permissions. Entry and approval by two distinct accounts/people; no “emergency” self-approval exception. Prove an independent source. Support role without raw documents; minimized audit logs immutable for ordinary roles.

Uploads: actual type/size, quarantine, scanning and temporary links; no public evidence access. Define malware scanning and operator review in JUV-304; do not claim an extension check suffices. Immutable invoices, encrypted backups, restoration tests for data AND files.

## Priority threats and evidence

| Threat | Control | Evidence |
| --- | --- | --- |
| Session theft/escalation | Cookies, rotation, CSRF, server role check | Login/logout/role change/CSRF tests |
| Access to another organization | RLS + API scope + storage | Hostile account matrix |
| False evidence / duplicate receipt | Dual control and unique reference | PAY-01 to 04 tests |
| Double booking | Transactions and constraints | Concurrent last-seat test |
| Content/import injection | Schema, sanitization, allowlisted links | XSS/SSRF payloads |
| Cache or log leak | Public-only cache, private no-store, minimized logs | Network/cache/log inspection |
| Data loss | Separate DB/file backups and restoration | Recorded drill |

Review of Cameroonian law and transfers is an assigned task, not a legal conclusion of this repository. Exact obligations, retention periods and tax information remain DEC-05/DEC-10. Publish fictional data for acceptance testing; no real documents in git.
