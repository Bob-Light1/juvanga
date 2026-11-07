# Epic growth

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-501"></a>

## JUV-501 — Validate then implement Mode B options

Milestone **P2** · Backend/finance · 5–9 person-days · status **todo**

Dependencies: JUV-329.

### Work

- Validate DEC-09 and on-call coverage
- Model hold/cutoff/review and atomic conversion

### Acceptance criteria

- [ ] Mode frozen on order
- [ ] Timely evidence retains capacity until an explicit bound
- [ ] Expired hold never reactivated; justified/audited extensions

### Verification

- AT-BOOK-02/03 and capacity/expiry concurrency

Requirements: BOOK-01, BOOK-02, BOOK-04, BOOK-06.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-502"></a>

## JUV-502 — Integrate PSP and verified webhooks

Milestone **P2** · Backend/security · 5–10 person-days · status **todo**

Dependencies: JUV-329.

### Work

- Choose operator and test environment
- Verify signatures/replay and map existing transactions

### Acceptance criteria

- [ ] Duplicate webhook duplicates neither payment nor entitlement
- [ ] Invalid signature and out-of-window timestamp rejected
- [ ] Refund/reversal and verifiable source handled

### Verification

- Provider sandbox tests and out-of-order replay

Requirements: PAY-01, PAY-04, PAY-06.

References: [docs/architecture/API.md](../../../docs/architecture/API.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-503"></a>

## JUV-503 — Define and deliver payment schedules

Milestone **P2** · Product/backend · 4–8 person-days · status **todo**

Dependencies: JUV-502.

### Work

- Validate due-date and partial-entitlement rules
- Model allocations and arrears without changing history

### Acceptance criteria

- [ ] Entitlements follow approved policy
- [ ] Installment total matches order
- [ ] Late payment/regularization/refund explicit

### Verification

- Due-date and out-of-order payment tests

Requirements: PAY-05, PAY-06.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-504"></a>

## JUV-504 — Study and secure offline private content

Milestone **P2** · Frontend/security · 5–10 person-days · status **todo**

Dependencies: JUV-329, JUV-112.

### Work

- Define shared-device threat and expiry
- Prototype private cache with explicit limitations

### Acceptance criteria

- [ ] Expired/revoked entitlement handled under published policy
- [ ] Logout/erasure clears private cache
- [ ] No promise of instant revocation without network

### Verification

- Offline, clock, account-switch and erasure tests

Requirements: SEC-04, DATA-07.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-505"></a>

## JUV-505 — Size media and real-time services from measurements

Milestone **P2** · Backend/operations · 4–8 person-days · status **todo**

Dependencies: JUV-329.

### Work

- Measure video traffic, connections and costs
- Test private streaming/CDN and SSE only if needed

### Acceptance criteria

- [ ] Controlled, nonindexable media URLs
- [ ] SSE rechecks entitlements and bounds resume
- [ ] Egress budget and adaptive quality measured

### Verification

- Media/SSE load and revocation during active connection

Requirements: SEC-03, DATA-07.

References: [docs/architecture/ARCHITECTURE.md](../../../docs/architecture/ARCHITECTURE.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-506"></a>

## JUV-506 — Test scaling and possible service separation

Milestone **P2** · Architecture/QA · 5–10 person-days · status **todo**

Dependencies: JUV-505.

### Work

- Define active users/RPS and actual targets
- Measure limits before cache/replicas/services

### Acceptance criteria

- [ ] No 1M promise without demonstrated test profile
- [ ] Finance/capacity invariants preserved under load
- [ ] New separation justified by ADR and migration plan

### Verification

- Reproducible benchmarks and failure tests

Requirements: DATA-02, USR-08.

References: [docs/architecture/ARCHITECTURE.md](../../../docs/architecture/ARCHITECTURE.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
