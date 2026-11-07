# Epic identity-platform

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-201"></a>

## JUV-201 — Initialize PostgreSQL, migrations and local environment

Milestone **M1** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-006.

### Work

- Create local Supabase project and minimal schema
- Define grants/RLS and reset with fictional seed

### Acceptance criteria

- [ ] Reproducible reset from scratch
- [ ] Nonpublic tables inaccessible anonymously
- [ ] Separate secrets; migration applied once

### Verification

- SQL reset integration and per-role permissions

Requirements: DATA-01, SEC-03.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-202"></a>

## JUV-202 — Create Hono API, OpenAPI and same-origin routing

Milestone **M1** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-201, JUV-114.

### Work

- Create /v1 and error/pagination contracts
- Test same-origin Static Assets and API

### Acceptance criteria

- [ ] Unknown /v1 route returns JSON 404, not SPA
- [ ] Validated OpenAPI schemas and errors without stack
- [ ] Worker preview contains frontend and API; no incompatible Node runtime dependency

### Verification

- Contract tests and local/staging Worker smoke

Requirements: SEC-05.

References: [docs/architecture/API.md](../../../docs/architecture/API.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-203"></a>

## JUV-203 — Configure provider email, identity and MFA

Milestone **M1** · Backend/operations · 1.5–3 person-days · status **todo**

Dependencies: JUV-202.

### Work

- Configure Auth/redirect allowlist and external SMTP
- Test verification, reset and TOTP

### Acceptance criteria

- [ ] External tester actually receives emails before public opening
- [ ] Quotas and sender domain recorded
- [ ] Explicit closed-invitation mode if SMTP unavailable

### Verification

- External inbox and unauthorized redirect tests

Requirements: SEC-01, SEC-02.

References: [docs/architecture/decisions/005-managed-auth.md](../../../docs/architecture/decisions/005-managed-auth.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-204"></a>

## JUV-204 — Implement BFF sessions, rotation and CSRF protection

Milestone **M1** · Backend/security · 3–6 person-days · status **todo**

Dependencies: JUV-203.

### Work

- Create opaque sessions and server token encryption
- Protect CSRF, concurrent refresh and revocation

### Acceptance criteria

- [ ] No refresh token accessible to JS
- [ ] Logout and role change actually revoke access
- [ ] Hostile origin rejected; multiple-tab refresh retains a valid session
- [ ] bcrypt/Argon2id deviation accepted or adapter replaced before real accounts

### Verification

- Rotation, expiry, CSRF, multiple-tab and cookie-flag tests

Requirements: SEC-01, SEC-05.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-205"></a>

## JUV-205 — Implement authorization and resource isolation

Milestone **M1** · Backend/security · 2–4 person-days · status **todo**

Dependencies: JUV-204.

### Work

- Define permissions/scopes/memberships
- Add RLS policies and service checks

### Acceptance criteria

- [ ] Deny by default; roles not user-editable
- [ ] User B cannot read/modify any of A's data
- [ ] Direct RPC calls do not bypass checks

### Verification

- Hostile API/DB/storage matrix and IDOR tests

Requirements: SEC-03, DATA-01.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-206"></a>

## JUV-206 — Log actions and limit abuse

Milestone **M1** · Backend · 1.5–3 person-days · status **todo**

Dependencies: JUV-205.

### Work

- Add correlationId, audit and request limits
- Hide secrets/PII and distinguish errors

### Acceptance criteria

- [ ] Audit immutable for ordinary business roles
- [ ] Brute force and large payloads limited
- [ ] Logs contain no passwords, tokens or deliverables

### Verification

- Rate-limit, payload-size tests and log inspection

Requirements: SEC-05, SEC-06, DATA-07.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-207"></a>

## JUV-207 — Build account and recovery screens

Milestone **M1** · Frontend · 2–4 person-days · status **todo**

Dependencies: JUV-204, JUV-104, JUV-107.

### Work

- Create register/login/reset/verification/profile
- Render neutral errors and explicit resume

### Acceptance criteria

- [ ] Reset does not reveal existing accounts
- [ ] Return URL must be authorized
- [ ] Expired session guides reconnection without disclosure

### Verification

- Registration, verification, reset, logout and network-error E2E

Requirements: SEC-01.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-217"></a>

## JUV-217 — Create support and notification inbox

Milestone **M1** · Fullstack · 2–3 person-days · status **todo**

Dependencies: JUV-206, JUV-207.

### Work

- Open minimal ticket and assign an owner
- Display persistent notifications

### Acceptance criteria

- [ ] Users see only their own tickets
- [ ] Important events available without email
- [ ] Support does not implicitly receive financial documents

### Verification

- Isolation and email-channel failure tests

Requirements: DATA-07.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-218"></a>

## JUV-218 — Handle deletion, export and retention

Milestone **M1** · Backend/product · 2–4 person-days · status **todo**

Dependencies: JUV-209, JUV-217.

### Work

- Write the agreed data/purpose/retention matrix
- Implement applicable export and deletion/anonymization

### Acceptance criteria

- [ ] Authenticated request and processing trace
- [ ] Deletion revokes sessions and files under policy
- [ ] Legitimate retention separate and explained; no future financial hard delete

### Verification

- Impersonated request, deletion and cross-account export tests

Requirements: DATA-06, DATA-07.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-219"></a>

## JUV-219 — Back up and restore database and files

Milestone **M1** · Operations · 1.5–3 person-days · status **todo**

Dependencies: JUV-212, JUV-218.

### Work

- Export DB and inventory/objects to secure storage
- Restore in an isolated environment

### Acceptance criteria

- [ ] Backup does not reside in git
- [ ] Files restored in addition to SQL
- [ ] Time/loss measured, owner and frequency recorded

### Verification

- Restoration drill checking accounts/content/files

Requirements: SEC-06.

References: [docs/operations/RUNBOOK.md](../../../docs/operations/RUNBOOK.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-220"></a>

## JUV-220 — Test account security and accessibility

Milestone **M1** · QA/security · 2–4 person-days · status **todo**

Dependencies: JUV-206, JUV-207, JUV-215, JUV-216, JUV-217, JUV-218.

### Work

- Execute permission matrix and keyboard journeys
- Select applicable ASVS requirements

### Acceptance criteria

- [ ] No open critical/high vulnerability at release
- [ ] Every exception has an owner and planned fix
- [ ] Authenticated axe test and manual review recorded

### Verification

- Security/ASVS report and account→exercise→review E2E

Requirements: SEC-03, SEC-07.

References: [docs/delivery/QUALITY.md](../../../docs/delivery/QUALITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-221"></a>

## JUV-221 — Measure free-backend load and cost

Milestone **M1** · Backend/QA · 1–2 person-days · status **todo**

Dependencies: JUV-220, JUV-202.

### Work

- Measure Worker CPU, DB, latency and egress
- Define thresholds and user limits

### Acceptance criteria

- [ ] Test profile and region recorded
- [ ] Sessions/auth fit runtime budget
- [ ] Overrun plan triggers no automatic payment

### Verification

- Gradual load with fictional data and documented costs

Requirements: USR-04.

References: [docs/operations/DEPLOYMENT.md](../../../docs/operations/DEPLOYMENT.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-222"></a>

## JUV-222 — Configure environments, secrets and alerts

Milestone **M1** · Operations · 1–2 person-days · status **todo**

Dependencies: JUV-219, JUV-221.

### Work

- Separate local/preview/production
- Configure secrets and actionable alert

### Acceptance criteria

- [ ] Preview does not read production data
- [ ] Rotatable secrets never in build/logs
- [ ] Alert received and owner named

### Verification

- Bundle leak test and simulated outage

Requirements: SEC-05, SEC-06.

References: [docs/operations/RUNBOOK.md](../../../docs/operations/RUNBOOK.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-223"></a>

## JUV-223 — Deliver the free pilot with accounts

Milestone **M1** · Operations/product · 1–2 person-days · status **todo**

Dependencies: JUV-222, JUV-220, JUV-203.

### Work

- Validate data/auth decisions and content
- Publish on the same origin and test with invitations

### Acceptance criteria

- [ ] External tester completes registration and exercise
- [ ] Public registration closed if SMTP missing
- [ ] Migration-compatible rollback tested; URL/version recorded

### Verification

- Production smoke and restoration/revocation scenario

Requirements: USR-04.

References: [docs/operations/DEPLOYMENT.md](../../../docs/operations/DEPLOYMENT.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
