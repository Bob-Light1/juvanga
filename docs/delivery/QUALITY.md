# Quality strategy and delivery criteria

## Actually automated F0 foundation

Backlog validation (IDs, graph, active dependencies, evidence, coverage), generated-view consistency, local links, contrast calculation, node:test tests, ESLint, strict TypeScript and build. Playwright covers desktop/mobile, interaction, keyboard, reduced motion and axe. The CI workflow is supplied; remote execution depends on a configured remote.

## M0

| Area | Test and criterion |
| --- | --- |
| Journey | Home → course → three lessons → exercise → worked solution → resume; direct link and 404 |
| Local data | Opt-in/refusal/erase, unavailable/corrupt storage, version change; no persistent deliverable |
| Accessibility | Axe without serious/critical defects, keyboard, focus, screen readers, 200% zoom, 360 px; not color alone |
| Network | Slow 4G and offline profiles; explicit media; no automatic submission |
| Performance | Target initial-route JS ≤250 KiB gzip, initial images ≤300 KiB, CLS <0.1; LCP target ≤2.5 s under documented test conditions |
| Education | Named author/reviewer; task actually performed; distinguish reading/self-assessment/mastery |
| Production | Verified HTTPS URL, CSP/headers, deep links, version, support and rollback |

Budgets are project targets, not already achieved measurements. Document device, browser, bandwidth, latency and CPU. A Lighthouse score proves neither complete accessibility nor real-audience performance.

## M1/M2: mandatory scenarios

| Dossier ID | Precondition and action | Core assertion | Ticket |
| --- | --- | --- | --- |
| AT-AUTH-01 | Register an existing email | Neutral response without disclosure | 207 |
| AT-BOOK-01 | Two transactions for the last seat | One confirmation, one 409; correct capacity | 311/326 |
| AT-BOOK-04 | Trainer absent | No fictional attendance; traced rescheduling/replacement | 313 |
| AT-PAY-01 | Upload evidence only | No active entitlement | 304/326 |
| AT-PAY-02 | Maker confirms own entry | API AND DB denial, audit | 306/326 |
| AT-PAY-03 | Concurrent identical external reference | One confirmable transaction | 305/326 |
| AT-PAY-04 | Payment after expiry | Resolution, no automatic access | 309 |
| AT-ENT-01 | Confirmed payment, no seat | Active reading, pending fulfillment | 307/312 |
| AT-LEARN-01 | Change rubric during REWORK | Original cycle rubric retained | 213/215 |
| AT-LEARN-02 | Lesson read, critical criterion missed | No mastery granted | 109/215/323 |
| AT-ORG-01 | Group of 3, filters/differences | Suppressed result, no trivial inference | 321 |
| AT-NOT-01 | Rescheduled session | Old reminder invalidated | 314 |
| AT-PRES-01 | Presentation with trainer account | No named data/private messages | 216 |
| AT-UX-01 | Connection lost during draft | Consented resume and explicit submission | 214 |
| AT-SEC-01 | Object from another organization | Denial without metadata or media | 205/327 |
| AT-DATA-01 | Replay outbox | No duplicate entitlement or logical notification | 308 |
| AT-PERF-01 | Documented gradual load | Latency/errors/RPS and cost recorded | 221/328 |
| AT-COM-01 | Another cohort's forum | Denial also in search | 402 |
| AT-AI-01 | Connector attempts publication | Rejection and audit | 403 |
| AT-BOOK-02/03 | Timely evidence / expired hold | Bound respected, no resurrection | 501 |

Each transactional test verifies DB state, API response, audit and outbox. Mocks alone do not validate SQL constraints or concurrency. Add idempotency, invoice/credit note, duplicate cancellation, revocation, CSRF, malicious file and private cache cases.

## Milestone exit

Zero blocking bugs; zero untreated critical/high vulnerabilities for accounts/commerce; every ticket's criteria met; applicable review and decisions; reproducible tests; stated known limitations; rollback/restoration according to milestone. Planned test ≠ passed test.
