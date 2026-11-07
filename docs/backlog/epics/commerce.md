# Epic commerce

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-301"></a>

## JUV-301 — Formalize commercial policies and operators

Milestone **M2** · Product/finance · 2–5 person-days · status **todo**

Dependencies: JUV-223.

### Work

- Write DEC-01 to DEC-05 and appoint maker/checker
- Define refunds, deadlines and external payment methods

### Acceptance criteria

- [ ] Prices/terms approved by named owners
- [ ] Two finance people available
- [ ] No-slot and late-payment cases have a customer procedure

### Verification

- Written review of business scenarios

Requirements: PAY-01, PAY-02, PAY-03, INV-03.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-302"></a>

## JUV-302 — Model versioned offers and distinct entitlements

Milestone **M2** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-301, JUV-208.

### Work

- Create OfferVersion, services and terms
- Distinguish reading/session/guidance

### Acceptance criteria

- [ ] Price set by offer, not level
- [ ] Future change has no effect on existing order
- [ ] Beneficiary, payer and buyer distinct

### Verification

- Snapshot and per-component entitlement tests

Requirements: COUR-03, COUR-04, PAY-05.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-303"></a>

## JUV-303 — Create idempotent orders and expiry

Milestone **M2** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-302, JUV-206.

### Work

- Create order/server price/instructions
- Handle expiry and Idempotency-Key hash

### Acceptance criteria

- [ ] Double click creates one order
- [ ] Same key with different payload returns 409
- [ ] Expiry prevents new instructions but retains late transfers for resolution

### Verification

- Clock, replay, different-payload and integer-XAF tests

Requirements: COUR-03, DATA-04, PAY-05.

References: [docs/architecture/API.md](../../../docs/architecture/API.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-304"></a>

## JUV-304 — Upload and review payment evidence

Milestone **M2** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-303, JUV-212.

### Work

- Create private upload and dedicated quarantine
- Allow retries and tracking

### Acceptance criteria

- [ ] Screenshot alone grants no entitlement
- [ ] Rejecting an image does not declare funds unreceived
- [ ] Actual type, limits and malware handling documented and tested

### Verification

- AT-PAY-01 and malicious/cross-account document test

Requirements: SEC-04, PAY-01.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-305"></a>

## JUV-305 — Record transactions and allocations

Milestone **M2** · Backend/finance · 2–4 person-days · status **todo**

Dependencies: JUV-303.

### Work

- Create unique operator/account reference
- Record declared/received/fees/allocations

### Acceptance criteria

- [ ] Duplicate reference rejected in DB
- [ ] No allocation exceeds available amount
- [ ] Integer amounts and discrepancies without implicit tolerance

### Verification

- AT-PAY-03 and identical-reference concurrency

Requirements: PAY-04, PAY-05, DATA-02.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-306"></a>

## JUV-306 — Build independent reconciliation and dual approval

Milestone **M2** · Fullstack/security · 3–5 person-days · status **todo**

Dependencies: JUV-305, JUV-304, JUV-205.

### Work

- Create entry/independent-source queue
- Verify distinct checker, MFA and current authorization

### Acceptance criteria

- [ ] Same maker/checker rejected on server
- [ ] No confirmation without second verifier
- [ ] Approval traces actor, source and decision; no implicit support role

### Verification

- AT-PAY-02 and missing-MFA/revoked-role/missing-source tests

Requirements: PAY-01, PAY-02, PAY-03, SEC-02.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-307"></a>

## JUV-307 — Activate entitlements in the financial transaction

Milestone **M2** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-306, JUV-302.

### Work

- Confirm payment and entitlements in one commit
- Handle frozen beneficiary and offer

### Acceptance criteria

- [ ] Entitlement creation error rolls back confirmation
- [ ] Confirmed payment opens reading even without a session
- [ ] Retry duplicates neither entitlements nor credits

### Verification

- AT-ENT-01 and injected transaction rollback

Requirements: PAY-03, DATA-02, DATA-05.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-308"></a>

## JUV-308 — Deliver outbox, retries and idempotent notifications

Milestone **M2** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-307, JUV-217.

### Work

- Create outbox in business commit
- Worker with lease, bounded retries and failure queue

### Acceptance criteria

- [ ] Crash after commit resumes without duplicate entitlement
- [ ] Unique logical notification despite repeated delivery
- [ ] Payload without secrets or documents; entitlements rechecked at rendering

### Verification

- AT-DATA-01, crash/replay/concurrent worker

Requirements: DATA-05, DATA-07.

References: [docs/architecture/ARCHITECTURE.md](../../../docs/architecture/ARCHITECTURE.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-309"></a>

## JUV-309 — Handle discrepancies, delays, disputes and refunds

Milestone **M2** · Fullstack/finance · 3–5 person-days · status **todo**

Dependencies: JUV-308, JUV-301.

### Work

- Create resolution case and human decisions
- Apply entitlement impacts without erasing transaction

### Acceptance criteria

- [ ] Late transfer retained without automatic entitlement
- [ ] Auditable refund and reversal with dual control
- [ ] Customer sees state and next contractual step

### Verification

- AT-PAY-04 and partial/excess/reversal cases

Requirements: PAY-06, DATA-06.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
