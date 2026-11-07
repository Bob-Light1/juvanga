# Epic extensions

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-401"></a>

## JUV-401 — Define forum moderation and scopes

Milestone **P1** · Product/backend · 2–4 person-days · status **todo**

Dependencies: JUV-329.

### Work

- Define public/COURSE/ORG/COHORT
- Write reporting, moderation and appeal rules

### Acceptance criteria

- [ ] Owner and deadlines named
- [ ] Scope membership required
- [ ] Activation prohibited without moderation capacity

### Verification

- Policy review and access matrix

Requirements: USR-08.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-402"></a>

## JUV-402 — Build isolated forums and authorized search

Milestone **P1** · Fullstack · 4–8 person-days · status **todo**

Dependencies: JUV-401.

### Work

- Create threads/replies/helpful answer/reporting
- Filter search and notifications by permissions

### Acceptance criteria

- [ ] Outside cohort no private thread/metadata
- [ ] Traceable reporting and appeals
- [ ] Index does not expose private content to public

### Verification

- AT-COM-01 and cross-scope search tests

Requirements: SEC-03, DATA-07.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-403"></a>

## JUV-403 — Import safe, structured AI drafts

Milestone **P1** · Fullstack/security · 4–7 person-days · status **todo**

Dependencies: JUV-329, JUV-211, JUV-212.

### Work

- Define JSON Schema/provenance/version
- Quarantine media and review before publication

### Acceptance criteria

- [ ] AI limited to drafts with bounded token
- [ ] XSS/SSRF/oversized payloads rejected
- [ ] Connector cannot publish, pay or grant permissions

### Verification

- AT-AI-01 and hostile corpus

Requirements: SEC-04, SEC-05.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-404"></a>

## JUV-404 — Deliver interface and first course in English

Milestone **P1** · Content/frontend · 4–8 person-days · status **todo**

Dependencies: JUV-329, JUV-107.

### Work

- Translate interface and reviewed content
- Add language choice, SEO and formats

### Acceptance criteria

- [ ] Missing keys fall back cleanly to FR
- [ ] No mixing of nonequivalent rubrics
- [ ] Journey and layout tested by English speakers

### Verification

- FR/EN E2E and human review

Requirements: USR-08.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-405"></a>

## JUV-405 — Add alternative authentication and account linking

Milestone **P1** · Backend · 3–5 person-days · status **todo**

Dependencies: JUV-329, JUV-204.

### Work

- Choose provider based on demand
- Secure linking and identity conflicts

### Acceptance criteria

- [ ] No account merge based on unverified email
- [ ] Consistent revocation/logout
- [ ] Email journey keeps working

### Verification

- Takeover, duplicate and callback-CSRF tests

Requirements: SEC-01.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-406"></a>

## JUV-406 — Add consented push notifications

Milestone **P1** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-329, JUV-308, JUV-112.

### Work

- Detect compatibility and obtain consent
- Handle invalid subscriptions and revocation

### Acceptance criteria

- [ ] No detailed financial notifications on lock screen
- [ ] Refusal does not block usage
- [ ] Information remains in account without push

### Verification

- Refusal, logout, expired-subscription and duplicate tests

Requirements: DATA-07.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-407"></a>

## JUV-407 — Improve search and explainable recommendations

Milestone **P1** · Fullstack/product · 3–6 person-days · status **todo**

Dependencies: JUV-329.

### Work

- Observe needs and search objectives/prerequisites
- Explain why a course is suggested

### Acceptance criteria

- [ ] Search respects publication/entitlements
- [ ] Recommendation without implicit sensitive profiling
- [ ] Success measurement with consent and before/after comparison

### Verification

- Private search tests and user interviews

Requirements: USR-08, SEC-03.

References: [docs/product/BRIEF.md](../../../docs/product/BRIEF.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-408"></a>

## JUV-408 — Create a portfolio of evidence with controlled sharing

Milestone **P1** · Fullstack · 3–6 person-days · status **todo**

Dependencies: JUV-329, JUV-323.

### Work

- Choose validated evidence eligible for publication
- Add revocable link and granular consent

### Acceptance criteria

- [ ] Private by default
- [ ] Revocation cuts link with appropriate cache handling
- [ ] No sensitive employer/customer data published by default

### Verification

- Consent, expiry and post-revocation access tests

Requirements: USR-08, DATA-07.

References: [docs/product/BRIEF.md](../../../docs/product/BRIEF.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
