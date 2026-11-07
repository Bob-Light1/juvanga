# Epic scheduling

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-310"></a>

## JUV-310 — Open schedule and resources

Milestone **M2** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-302, JUV-205.

### Work

- Create slots closed by default
- Scheduler publishes capacity and resources

### Acceptance criteria

- [ ] Only authorized role opens a slot
- [ ] UTC stored, Africa/Douala displayed
- [ ] Past/closed slots never bookable; travel included

### Verification

- Timezone, closure and resource-collision tests

Requirements: BOOK-03, BOOK-04.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-311"></a>

## JUV-311 — Atomically book a seat in Mode A

Milestone **M2** · Backend · 3–5 person-days · status **todo**

Dependencies: JUV-310, JUV-307, JUV-308.

### Work

- Lock slot/credit and insert Booking
- Add capacity and exclusivity constraints

### Acceptance criteria

- [ ] Only one booking wins the last seat
- [ ] Credit consumed at most once
- [ ] Role/entitlement/capacity rechecked at commit, never only against displayed availability

### Verification

- AT-BOOK-01 with real PostgreSQL concurrency

Requirements: BOOK-01, BOOK-02, BOOK-03, DATA-02.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-312"></a>

## JUV-312 — Build the learner booking journey

Milestone **M2** · Frontend · 2–3 person-days · status **todo**

Dependencies: JUV-311, JUV-303.

### Work

- Show indicative availability before payment
- Book after entitlement and confirm server state

### Acceptance criteria

- [ ] 409 explains conflict and offers another seat
- [ ] No slot: reading retained and AWAITING_SLOT
- [ ] Button does not promise a booking before confirmation

### Verification

- Confirmed-payment→booking E2E and UI concurrency

Requirements: BOOK-02, BOOK-04.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-313"></a>

## JUV-313 — Handle rescheduling, cancellations, absence and replacement

Milestone **M2** · Fullstack · 3–5 person-days · status **todo**

Dependencies: JUV-312, JUV-309, JUV-301.

### Work

- Apply approved policy
- Transactionally restore credit/release capacity

### Acceptance criteria

- [ ] Repeated cancellation does not restore credit twice
- [ ] Absent trainer does not mark a session held
- [ ] Replacement/rescheduling records decision and notifies

### Verification

- AT-BOOK-04 and concurrent cancellations

Requirements: BOOK-05, PAY-06.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-314"></a>

## JUV-314 — Send reminders and track assignment deadlines

Milestone **M2** · Backend · 1.5–3 person-days · status **todo**

Dependencies: JUV-313, JUV-308.

### Work

- Schedule reminders with timezone/calendar
- Escalate waiting without a slot

### Acceptance criteria

- [ ] Rescheduling cancels old reminders
- [ ] Replayed reminder not logically duplicated
- [ ] Exceeded deadline alerts the identified owner

### Verification

- AT-NOT-01 and clock/weekend/worker-outage tests

Requirements: BOOK-05, DATA-05.

References: [docs/operations/RUNBOOK.md](../../../docs/operations/RUNBOOK.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
