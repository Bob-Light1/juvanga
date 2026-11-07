# Epic organizations

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-319"></a>

## JUV-319 — Create organizations, memberships and cohorts

Milestone **M2** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-205, JUV-302.

### Work

- Create scopes and verified coordinator
- Separate buyer/payer/beneficiary

### Acceptance criteria

- [ ] A person can belong to two organizations without leaks
- [ ] Revoked membership cuts relevant access
- [ ] Coordinator does not receive grades/documents by default

### Verification

- AT-SEC-01 on search, list, detail and files

Requirements: DATA-01, SEC-03.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-320"></a>

## JUV-320 — Allocate seats and expiring invitations

Milestone **M2** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-319, JUV-307.

### Work

- Link purchase to quotas and invitations
- Accept invitation atomically

### Acceptance criteria

- [ ] One seat cannot have two active beneficiaries
- [ ] Expired/revoked invitation rejected
- [ ] Reinvitation and reallocation follow policy and audit

### Verification

- Last-seat concurrency and token replay tests

Requirements: DATA-01, DATA-02.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-321"></a>

## JUV-321 — Display authorized B2B progress

Milestone **M2** · Fullstack/product · 2–4 person-days · status **todo**

Dependencies: JUV-320, JUV-215, JUV-301.

### Work

- Define authorized aggregates and filters
- Apply agreed privacy rules

### Acceptance criteria

- [ ] Cell of 3 suppressed under proposed threshold of 5
- [ ] Totals/filters do not allow trivial inference
- [ ] Individual data stays closed without approved permission/purpose

### Verification

- AT-ORG-01 with small groups and filter differences

Requirements: DATA-07, SEC-03.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
