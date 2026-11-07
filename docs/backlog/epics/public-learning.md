# Epic public-learning

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-101"></a>

## JUV-101 — Define the free course and its professional outcome

Milestone **M0** · Education/product · 1–2 person-days · status **done**

Dependencies: JUV-006.

### Work

- Choose a useful office productivity task without sensitive data
- Define objectives, equipment, three lessons and deliverable

### Acceptance criteria

- [ ] A beginner understands what they will be able to do
- [ ] Plan includes observable criteria and worked solution
- [ ] Author and reviewer identified before publication

### Verification

- Review scenario and manually perform the task

Requirements: COUR-04, LEARN-01, USR-08.

References: [docs/product/BRIEF.md](../../../docs/product/BRIEF.md) ; [docs/product/FREE-COURSE.md](../../../docs/product/FREE-COURSE.md) ; [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: Codex ; branch: feat/JUV-101-free-course-outcome.

Evidence: docs/product/FREE-COURSE.md ; docs/delivery/VALIDATION-JUV-101.md ; docs/sessions/2026-11-07-m0-course-plan.md ; Project owner explicitly approved the course plan on 2026-11-07 in this conversation..

---

<a id="juv-102"></a>

## JUV-102 — Create the versioned public content schema

Milestone **M0** · Frontend/education · 1–2 person-days · status **todo**

Dependencies: JUV-101.

### Work

- Define IDs/version/blocks/exercises
- Validate data and links at build time

### Acceptance criteria

- [ ] Invalid content fails the build with a precise path
- [ ] Stable IDs and explicit version
- [ ] Arbitrary HTML and dangerous URLs rejected

### Verification

- Valid/invalid fixtures and rejected javascript link

Requirements: COUR-01, DATA-03, SEC-05.

References: [docs/architecture/DATA-MODEL.md](../../../docs/architecture/DATA-MODEL.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-103"></a>

## JUV-103 — Produce and review the complete free course

Milestone **M0** · Education · 3–6 person-days · status **todo**

Dependencies: JUV-102.

### Work

- Write three lessons, examples and exercises
- Check accuracy, media rights and worked solutions

### Acceptance criteria

- [ ] Every lesson has an objective, example, exercise and worked solution
- [ ] Sources/licenses recorded and reviewer identified
- [ ] No paid or private content included in build

### Verification

- Human review
- Full walkthrough by someone not involved in writing

Requirements: LEARN-01, COUR-04, USR-08.

References: [docs/product/SCOPE.md](../../../docs/product/SCOPE.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-104"></a>

## JUV-104 — Build accessible course components

Milestone **M0** · Frontend/design · 1.5–3 person-days · status **todo**

Dependencies: JUV-004.

### Work

- Create buttons, fields, cards, alerts and navigation
- Apply tokens and states

### Acceptance criteria

- [ ] Visible focus and complete keyboard journey
- [ ] 44 px touch controls; no dependence on color alone
- [ ] Loading/empty/error states documented

### Verification

- Playwright keyboard and axe
- 360 px and 200% zoom review

Requirements: USR-05, USR-07.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-105"></a>

## JUV-105 — Integrate local fonts and final assets

Milestone **M0** · Frontend/design · 0.5–1 person-days · status **todo**

Dependencies: JUV-003, JUV-104.

### Work

- Add Fraunces/Inter WOFF2 and licenses
- Check logo/favicon at small sizes

### Acceptance criteria

- [ ] No Google Fonts request needed
- [ ] Font-display swap; legible fallback
- [ ] Logo recognizable at 24/32 px and no visible CLS

### Verification

- Network inspection and screenshot comparison

Requirements: USR-05, USR-06.

References: [docs/design/BRAND.md](../../../docs/design/BRAND.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-106"></a>

## JUV-106 — Deliver indexable home, catalogue and course pages

Milestone **M0** · Frontend · 2–4 person-days · status **todo**

Dependencies: JUV-102, JUV-104, JUV-105.

### Work

- Create routes and React Router navigation
- Prerender public pages and metadata

### Acceptance criteria

- [ ] Direct URLs and refresh work
- [ ] No price for undefined offers; free clearly indicated
- [ ] Initial HTML contains course title and description; consistent sitemap and 404

### Verification

- Navigation/deep link/404 E2E
- Inspect HTML without JS

Requirements: COUR-04, USR-04.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-107"></a>

## JUV-107 — Prepare French and future localization

Milestone **M0** · Frontend · 0.5–1 person-days · status **todo**

Dependencies: JUV-104.

### Work

- Centralize UI strings and formats
- Define FR fallback and stable keys

### Acceptance criteria

- [ ] No misleading English selector
- [ ] Dates and amounts through Intl; explicit timezone
- [ ] Long text remains readable

### Verification

- XAF/date format tests and pseudo-localization

Requirements: USR-08.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-108"></a>

## JUV-108 — Create the lesson reader

Milestone **M0** · Frontend · 2–3 person-days · status **todo**

Dependencies: JUV-103, JUV-104, JUV-107.

### Work

- Render typed blocks and previous/next navigation
- Load media on demand

### Acceptance criteria

- [ ] Accessible text, links and illustrations
- [ ] Missing lesson displays help and a way back
- [ ] No heavy media starts automatically

### Verification

- Full keyboard course E2E
- Slow network and unavailable image

Requirements: COUR-02, USR-08.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-109"></a>

## JUV-109 — Enable practice and self-assessment

Milestone **M0** · Frontend/education · 1.5–3 person-days · status **todo**

Dependencies: JUV-108.

### Work

- Present instructions and criteria before the result
- Show worked solution and ways to retry

### Acceptance criteria

- [ ] Self-assessment clearly named
- [ ] Reading alone does not validate competence
- [ ] Response and exercise usable without registration

### Verification

- Attempt/retry/solution E2E
- Semantic review of results

Requirements: LEARN-01, LEARN-02.

References: [docs/product/SCOPE.md](../../../docs/product/SCOPE.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-110"></a>

## JUV-110 — Save reading progress with local consent

Milestone **M0** · Frontend · 1–2 person-days · status **todo**

Dependencies: JUV-108.

### Work

- Offer storage on a personal device
- Version progress and add erasure

### Acceptance criteria

- [ ] No persisted progress without opt-in
- [ ] Reload resumes after consent; erasure removes data
- [ ] Denied/corrupt storage does not break reading; no deliverable retained

### Verification

- Opt-in/refusal/reload/clear/incompatible-version tests

Requirements: DATA-07, USR-08.

References: [docs/design/UX.md](../../../docs/design/UX.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-111"></a>

## JUV-111 — Add help, privacy and real feedback

Milestone **M0** · Product/frontend · 1–2 person-days · status **todo**

Dependencies: JUV-106.

### Work

- Write help and notice based on M0 data
- Configure support channel and minimal feedback

### Acceptance criteria

- [ ] No fictional address or form
- [ ] User understands local retention and host logs
- [ ] Feedback requests no sensitive document or unnecessary data

### Verification

- Actually test the support channel
- Review notice and erasure

Requirements: DATA-06, DATA-07.

References: [docs/product/DECISIONS.md](../../../docs/product/DECISIONS.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-112"></a>

## JUV-112 — Optimize slow networks, public PWA and motion

Milestone **M0** · Frontend · 1.5–3 person-days · status **todo**

Dependencies: JUV-108, JUV-110, JUV-105.

### Work

- Add manifest and public-allowlist service worker
- Measure bundle and images; apply reduced motion

### Acceptance criteria

- [ ] Cache limited to assets and explicitly public courses
- [ ] Honest offline state; new version offered without losing reading progress
- [ ] No essential effect or autoplay; initial JS target ≤250 KiB gzip

### Verification

- Offline/update/reduced-motion E2E
- Network and build-size measurements

Requirements: USR-04, USR-07.

References: [docs/design/MOTION.md](../../../docs/design/MOTION.md) ; [docs/delivery/QUALITY.md](../../../docs/delivery/QUALITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-113"></a>

## JUV-113 — Run acceptance testing with real testers

Milestone **M0** · QA/produit · 1.5–3 person-days · status **todo**

Dependencies: JUV-106, JUV-109, JUV-110, JUV-111, JUV-112, JUV-107.

### Work

- Execute mobile/keyboard/network matrix
- Observe five consenting testers and fix blockers

### Acceptance criteria

- [ ] Course can be completed from start to finish
- [ ] No unresolved critical or serious accessibility defect
- [ ] Observed results and limitations recorded without invented figures

### Verification

- M0 report with devices, scenarios and fixes

Requirements: USR-04, USR-08.

References: [docs/delivery/QUALITY.md](../../../docs/delivery/QUALITY.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.

---

<a id="juv-114"></a>

## JUV-114 — Publish M0 for free and test rollback

Milestone **M0** · Operations · 0.5–1.5 person-days · status **todo**

Dependencies: JUV-113, JUV-005.

### Work

- Create Pages project with owner account
- Deploy validated commit and test rollback

### Acceptance criteria

- [ ] Public HTTPS URL and deep links work
- [ ] Headers and CSP verified remotely
- [ ] Free quotas and version/URL/support recorded; actual rollback succeeds

### Verification

- Production smoke and return to previous version

Requirements: USR-04.

References: [docs/operations/DEPLOYMENT.md](../../../docs/operations/DEPLOYMENT.md).

Owner: unassigned ; branch: —.

Evidence: none — task not delivered.
