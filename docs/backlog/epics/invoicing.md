# Epic invoicing

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-315"></a>

## JUV-315 — Define invoices, credit notes and numbering rules

Milestone **M2** · Finance/backend · 1.5–3 person-days · status **todo**

Dependencies: JUV-301, JUV-305.

### Work

- Transcribe approved rules and required information
- Model draft/issued/credit note

### Acceptance criteria

- [ ] Issuer and required information approved by tax owner
- [ ] Preview clearly marked unissued
- [ ] Issuance permission separate from entry

### Verification

- Finance review and approved tax scenarios

Requirements: INV-02, INV-03, INV-04.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-316"></a>

## JUV-316 — Issue an immutable invoice with an atomic number

Milestone **M2** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-315, JUV-306, JUV-308.

### Work

- Freeze data/taxes/version at issuance
- Allocate number in a transaction

### Acceptance criteria

- [ ] Two issuances never share a number
- [ ] Retry returns the same document
- [ ] Issued document cannot be modified/deleted; gaps explained without reuse

### Verification

- Concurrency, idempotency and update/delete prohibition tests

Requirements: INV-01, INV-04, DATA-02.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-317"></a>

## JUV-317 — Generate private PDF and print preview

Milestone **M2** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-316, JUV-212.

### Work

- Render deterministic PDF with versioned template
- Deliver authorized and logged download

### Acceptance criteria

- [ ] PDF matches issued snapshot
- [ ] Expired/cross-account URL rejected
- [ ] CPU/memory/generation verified on runtime; separate adapter if quota exceeded

### Verification

- Amount/date/number content comparison and actual runtime test

Requirements: INV-02, SEC-04.

References: [docs/architecture/ARCHITECTURE.md](../../../docs/architecture/ARCHITECTURE.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-318"></a>

## JUV-318 — Issue credit notes and check accounting reconciliation

Milestone **M2** · Fullstack/finance · 2–4 person-days · status **todo**

Dependencies: JUV-317, JUV-309.

### Work

- Link credit note to invoice without rewriting
- Add issuance/receipt control state

### Acceptance criteria

- [ ] Correction preserves original
- [ ] Sensitive permissions and MFA verified
- [ ] Issuance/receipt discrepancy visible and traceable

### Verification

- Authorized full/partial credit-note tests and account checks

Requirements: INV-01, INV-03, INV-04, PAY-06.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
