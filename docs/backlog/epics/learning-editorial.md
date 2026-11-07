# Epic learning-editorial

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-208"></a>

## JUV-208 — Import catalogue and public versions into the database

Milestone **M1** · Backend · 1.5–3 person-days · status **todo**

Dependencies: JUV-201, JUV-102, JUV-205.

### Work

- Map M0 IDs and versions
- Create API reading of publications

### Acceptance criteria

- [ ] Same content retains IDs
- [ ] Drafts never accessible publicly
- [ ] Referenced levels cannot be deleted; archiving preserves authorized access

### Verification

- Repeated migration without duplicates
- State and FK tests

Requirements: COUR-01, COUR-02, DATA-03.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-209"></a>

## JUV-209 — Create learner area and synchronized progress

Milestone **M1** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-207, JUV-208.

### Work

- Save reading per account
- Offer explicit import of local progress

### Acceptance criteria

- [ ] Two devices recover progress
- [ ] Idempotent import, revocable before confirmation
- [ ] Imported reading creates no validated competence

### Verification

- Two-session and version-conflict E2E

Requirements: LEARN-02, DATA-04.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-210"></a>

## JUV-210 — Create course drafts and level management

Milestone **M1** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-205, JUV-208.

### Work

- Build authorized-block editor
- Add preview and content validation

### Acceptance criteria

- [ ] Learners cannot edit
- [ ] Concurrent save returns an explicit conflict
- [ ] Editing does not modify published versions

### Verification

- Permission, If-Match and immutability tests

Requirements: COUR-01, COUR-02, DATA-03.

References: [docs/architecture/API.md](../../../docs/architecture/API.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-211"></a>

## JUV-211 — Implement review, publication and archiving

Milestone **M1** · Fullstack · 1.5–3 person-days · status **todo**

Dependencies: JUV-210.

### Work

- Assign distinct publication permissions
- Freeze snapshot and change log

### Acceptance criteria

- [ ] Publication requires validation and authorized role
- [ ] Published correction creates a new version
- [ ] Archiving removes sale without breaking existing entitlements

### Verification

- Transition tests and before/after snapshot

Requirements: COUR-02, DATA-03.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-212"></a>

## JUV-212 — Manage private media and controlled uploads

Milestone **M1** · Backend · 2–4 person-days · status **todo**

Dependencies: JUV-205, JUV-206.

### Work

- Create private bucket and authorized upload/quarantine
- Check type/size and short-lived URLs

### Acceptance criteria

- [ ] Out-of-scope users retrieve neither files nor metadata
- [ ] Rejected/quarantined content not served
- [ ] Expired tokens and misleading types rejected

### Verification

- Malicious upload, size, expiry and cross-account access tests

Requirements: SEC-04, SEC-05.

References: [docs/architecture/SECURITY.md](../../../docs/architecture/SECURITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-213"></a>

## JUV-213 — Version exercises, criteria and rubrics

Milestone **M1** · Backend/education · 1.5–3 person-days · status **todo**

Dependencies: JUV-211.

### Work

- Model RubricVersion and critical criteria
- Define thresholds and explicit migration

### Acceptance criteria

- [ ] Published exercise references an immutable rubric
- [ ] Missed critical criterion blocks milestone
- [ ] New rubric displayed before a new submission

### Verification

- Tests where threshold is met but a critical criterion is missing

Requirements: LEARN-01, LEARN-02, LEARN-04.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-214"></a>

## JUV-214 — Submit and resume an exercise

Milestone **M1** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-213, JUV-212, JUV-209.

### Work

- Create draft/submission/version
- Handle interrupted network and explicit retry

### Acceptance criteria

- [ ] Submission freezes ExerciseVersion and RubricVersion
- [ ] Retry does not create two submissions
- [ ] Local draft for nonsensitive text only after opt-in; no private attachment queue

### Verification

- Network interruption, conflict, retry and revocation E2E

Requirements: LEARN-03, LEARN-04, DATA-04.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-215"></a>

## JUV-215 — Review work and request revision

Milestone **M1** · Fullstack · 2–4 person-days · status **todo**

Dependencies: JUV-214, JUV-205.

### Work

- Create trainer-assigned queue
- Apply rubric, feedback, appeal and history

### Acceptance criteria

- [ ] Only assigned trainer may review
- [ ] REWORK retains the cycle rubric
- [ ] Timestamped decision and appeal; reading alone never yields PASS

### Verification

- Review/rework/appeal E2E and out-of-cohort access

Requirements: LEARN-02, LEARN-03, LEARN-04, LEARN-05.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-216"></a>

## JUV-216 — Present a course in presentation mode

Milestone **M1** · Frontend · 1–2 person-days · status **todo**

Dependencies: JUV-211, JUV-108.

### Work

- Create full-screen rendering from the same CourseVersion
- Add keyboard navigation and exit

### Acceptance criteria

- [ ] No private grade/submission/message projected
- [ ] Same content/version as reader
- [ ] Usable when full-screen mode is denied

### Verification

- Presentation E2E and inspection for absence of private data

Requirements: USR-08.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-322"></a>

## JUV-322 — Produce the first complete paid C1 course

Milestone **M2** · Education · 15–30 person-days · status **todo**

Dependencies: JUV-213, JUV-301.

### Work

- Define depth/prerequisites/competencies
- Write lessons, exercises, licensed media and worked solutions

### Acceptance criteria

- [ ] Distinct author and reviewer recorded
- [ ] Every competency has a deliverable and rubric
- [ ] No sale of an incomplete course presented as complete

### Verification

- Full educational acceptance testing and review consistency

Requirements: LEARN-01, LEARN-05, COUR-04.

References: [docs/product/BRIEF.md](../../../docs/product/BRIEF.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-323"></a>

## JUV-323 — Issue a certificate based on competencies

Milestone **M2** · Fullstack/education · 2–4 person-days · status **todo**

Dependencies: JUV-322, JUV-215, JUV-317.

### Work

- Define published criteria and traceable generation
- Provide minimized verification and revocation

### Acceptance criteria

- [ ] Attendance/reading alone insufficient
- [ ] Missing critical criterion blocks issuance
- [ ] Document name does not imply unestablished accredited certification

### Verification

- Satisfied-criteria/missing-critical/version/revocation tests

Requirements: LEARN-02, LEARN-05.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
