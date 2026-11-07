# Epic foundation

Generated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.

<a id="juv-001"></a>

## JUV-001 — Establish sources of truth and a short restart workflow

Milestone **F0** · Product/tech · 1–2 person-days · status **done**

Dependencies: none.

### Work

- Write brief, scope and decisions
- Define restart and handoff

### Acceptance criteria

- [ ] README locates status, tasks and architecture
- [ ] STATUS distinguishes delivered, planned and unverified work
- [ ] AGENTS is self-contained without chat history

### Verification

- Check links and read through the restart workflow

Requirements: USR-01, USR-02, USR-03.

References: [AGENTS.md](../../../AGENTS.md) ; [docs/STATUS.md](../../../docs/STATUS.md).

Owner: Codex — preparation ; branch: —.

Evidence: docs/delivery/VALIDATION-F0.md ; docs/sessions/2026-11-06-foundations.md.

---

<a id="juv-002"></a>

## JUV-002 — Structure the backlog and its automated validation

Milestone **F0** · Product/tech · 1–2 person-days · status **done**

Dependencies: JUV-001.

### Work

- Create tickets, dependencies and traceability
- Generate tickets and CSV from JSON

### Acceptance criteria

- [ ] Every ticket has steps, criteria, verification and role
- [ ] Acyclic graph with no unknown dependency
- [ ] Generated views match JSON

### Verification

- Validator tests: cycle, duplicate, done without evidence, incomplete dependency

Requirements: USR-01, USR-02, USR-03.

References: [docs/backlog/README.md](../../../docs/backlog/README.md).

Owner: Codex — preparation ; branch: —.

Evidence: docs/delivery/VALIDATION-F0.md ; docs/sessions/2026-11-06-foundations.md.

---

<a id="juv-003"></a>

## JUV-003 — Choose the logo and formalize brand guidelines

Milestone **F0** · Design · 0.5–1.5 person-days · status **done**

Dependencies: JUV-001.

### Work

- Compare A/B/C/D and select B
- Provide assets, tokens, contrast and motion

### Acceptance criteria

- [ ] Canonical logo and provenance available
- [ ] Text pairs meet 4.5:1
- [ ] Reduced motion planned without losing functionality

### Verification

- Calculated contrasts
- Review the four variants and lockup

Requirements: USR-05, USR-06, USR-07.

References: [docs/design/BRAND.md](../../../docs/design/BRAND.md) ; [docs/design/MOTION.md](../../../docs/design/MOTION.md).

Owner: Codex — preparation ; branch: —.

Evidence: docs/delivery/VALIDATION-F0.md ; docs/sessions/2026-11-06-foundations.md.

---

<a id="juv-004"></a>

## JUV-004 — Install the frontend foundation and shared commands

Milestone **F0** · Frontend · 1–2 person-days · status **done**

Dependencies: JUV-003.

### Work

- Initialize React/TS/Vite/Motion workspaces
- Add brand workshop and build

### Acceptance criteria

- [ ] npm ci then build succeed under the documented runtime
- [ ] No secrets required for the foundation
- [ ] Workshop identified as development, not a delivered course

### Verification

- Typecheck and build
- Desktop/mobile browser smoke and reduced motion

Requirements: USR-04, USR-07.

References: [docs/delivery/DEVELOPMENT.md](../../../docs/delivery/DEVELOPMENT.md).

Owner: Codex — preparation ; branch: —.

Evidence: docs/delivery/VALIDATION-F0.md ; docs/sessions/2026-11-06-foundations.md.

---

<a id="juv-005"></a>

## JUV-005 — Prepare CI, quality and free delivery

Milestone **F0** · Tech/QA · 1–2 person-days · status **done**

Dependencies: JUV-002, JUV-004.

### Work

- Add CI workflow and PR templates
- Document deployment, rollback and quotas

### Acceptance criteria

- [ ] CI includes docs, tests, lint, typecheck and build
- [ ] No unconfigured automatic deployment
- [ ] Free-plan costs and limits sourced and dated

### Verification

- Run CI commands locally
- Review provider procedure

Requirements: USR-01, USR-04.

References: [docs/operations/DEPLOYMENT.md](../../../docs/operations/DEPLOYMENT.md) ; [docs/delivery/QUALITY.md](../../../docs/delivery/QUALITY.md).

Owner: Codex — preparation ; branch: —.

Evidence: docs/delivery/VALIDATION-F0.md ; docs/sessions/2026-11-06-foundations.md.

---

<a id="juv-006"></a>

## JUV-006 — Install foundations in the repository and hand off

Milestone **F0** · Integration · 0.5–1 person-days · status **done**

Dependencies: JUV-005.

### Work

- Check existing files and copy without overwriting
- Initialize git and record final state

### Acceptance criteria

- [ ] Original PDFs and variants retained
- [ ] Files can be tracked in git; secrets ignored
- [ ] STATUS names next task and limitations; no invented remote

### Verification

- Compare before/after manifest
- git status and repeat validation

Requirements: USR-01, USR-02.

References: [docs/STATUS.md](../../../docs/STATUS.md) ; [CONTRIBUTING.md](../../../CONTRIBUTING.md).

Owner: Codex — integration ; branch: —.

Evidence: docs/delivery/VALIDATION-F0.md ; docs/sessions/2026-11-06-foundations.md ; Local main repository initialized; original sources verified with SHA-256.

---

<a id="juv-007"></a>

## JUV-007 — Translate project documentation into English and define the code comment language

Milestone **F0** · Documentation/tech · 1–2 person-days · status **done**

Dependencies: JUV-006.

### Work

- Translate maintained documentation, templates and canonical backlog text into English.
- Translate documentation generator output and existing code comments.
- Provide English companion documents for archived source PDFs while preserving the originals.
- Specify English for documentation, code, identifiers and code comments.

### Acceptance criteria

- [ ] Maintained documentation and regenerated backlog views are in English.
- [ ] All archived source PDFs have linked English text translations.
- [ ] AGENTS and CONTRIBUTING explicitly require code comments in English.
- [ ] The French launch interface and source archive provenance are preserved.

### Verification

- Run npm run verify.
- Check generated view consistency, local links and remaining French documentation text.
- Compare source archive hashes before and after translation.

Requirements: USR-01, USR-02, USR-03.

References: [AGENTS.md](../../../AGENTS.md) ; [CONTRIBUTING.md](../../../CONTRIBUTING.md) ; [docs/SOURCES.md](../../../docs/SOURCES.md).

Owner: Codex ; branch: feat/JUV-007-english-documentation.

Evidence: docs/sessions/2026-11-06-english-documentation.md ; docs/first_docs/en/README.md ; docs/product/DECISIONS.md.
