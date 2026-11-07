# Epic pilot-operations

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-324"></a>

## JUV-324 — Manage sensitive permissions and separation of duties

Milestone **M2** · Fullstack/security · 2–4 person-days · status **todo**

Dependencies: JUV-306, JUV-318, JUV-320.

### Work

- Create admin permission/MFA journey
- Revoke sessions and retain audit

### Acceptance criteria

- [ ] Admin cannot self-confirm a payment
- [ ] Role change logged and effective on server
- [ ] Support/scheduler do not implicitly gain finance privileges

### Verification

- Role matrix and metadata-escalation tests

Requirements: SEC-02, SEC-03, PAY-02.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-325"></a>

## JUV-325 — Finalize operations, retention and applicable compliance

Milestone **M2** · Product/operations · 2–5 person-days · status **todo**

Dependencies: JUV-318, JUV-321, JUV-218, JUV-301.

### Work

- Record purposes/retention/transfers and applicable notices
- Appoint support/incident/finance owners and procedures

### Acceptance criteria

- [ ] Applicable DEC-03 to DEC-08 decisions recorded
- [ ] Named owners and verified channels
- [ ] Proposed deadlines not presented as unapproved commitments

### Verification

- Operational review and documented business validation

Requirements: DATA-06, INV-03, SEC-07.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-326"></a>

## JUV-326 — Run concurrent finance and booking acceptance tests

Milestone **M2** · QA/backend · 3–5 person-days · status **todo**

Dependencies: JUV-314, JUV-318, JUV-324.

### Work

- Execute PAY/BOOK/ENT/DATA scenarios
- Inject failures and replays between commits

### Acceptance criteria

- [ ] No overbooking or entitlement without confirmation
- [ ] Zero financial self-approval
- [ ] Consistent DB/API/audit/outbox evidence

### Verification

- AT-PAY-01..04, AT-BOOK-01/04, AT-ENT-01, AT-DATA-01

Requirements: BOOK-01, BOOK-02, PAY-01, PAY-02, DATA-05.

References: [docs/delivery/QUALITY.md](../../../docs/delivery/QUALITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-327"></a>

## JUV-327 — Test privacy, accessibility and private cache

Milestone **M2** · QA/security · 3–5 person-days · status **todo**

Dependencies: JUV-321, JUV-323, JUV-324, JUV-325.

### Work

- Test all roles and resources
- Test PWA, logout, presentation and slow network

### Acceptance criteria

- [ ] No private data in public cache, URL or presentation
- [ ] Access controls tested on media/exports
- [ ] Commercial journeys usable with keyboard and screen reader

### Verification

- AT-SEC-01, AT-ORG-01, AT-PRES-01 and AT-UX-01

Requirements: SEC-03, SEC-04, DATA-07.

References: [docs/delivery/QUALITY.md](../../../docs/delivery/QUALITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-328"></a>

## JUV-328 — Test pilot restoration, load and budget

Milestone **M2** · QA/operations · 2–4 person-days · status **todo**

Dependencies: JUV-326, JUV-327, JUV-219.

### Work

- Restore recent DB+objects
- Load a 50–200-user scenario according to profile

### Acceptance criteria

- [ ] RPO/RTO measured and accepted
- [ ] Target booking p95 <1.5 s documented with context; nominal 5xx <1%
- [ ] Quota threshold and fallback plan decided before sales

### Verification

- AT-PERF-01 and restoration drill with evidence

Requirements: SEC-06, USR-04.

References: [docs/operations/RUNBOOK.md](../../../docs/operations/RUNBOOK.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-329"></a>

## JUV-329 — Launch and observe the commercial pilot

Milestone **M2** · Product/operations · 1–3 person-days · status **todo**

Dependencies: JUV-328, JUV-325, JUV-322.

### Work

- Written go/no-go and server flags
- Release to a small cohort and track incidents

### Acceptance criteria

- [ ] Free/C1 courses ready and product decisions approved
- [ ] Rollback and support ready; URL/commit/version recorded
- [ ] Mode B/PSP/forums/AI import stay closed; weekly monitoring established

### Verification

- Real smoke without fictional payment presented as real
- Metrics and incident review

Requirements: USR-04, USR-08.

References: [docs/operations/DEPLOYMENT.md](../../../docs/operations/DEPLOYMENT.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
