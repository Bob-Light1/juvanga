# Wewigo / Digital Campus — functional and technical design

English text translation of [WEWIGO_Dossier_Conception_V1_3.pdf](../WEWIGO_Dossier_Conception_V1_3.pdf), 26 pages. Version **1.3**, **5 November 2026**. Translated on 2026-11-06 for JUV-007. Original artwork remains in the PDF; the reference flyer's visible text is translated in appendix E. Repeated running headers and footers are omitted.

This is a historical source translation. Wewigo is the historical name; current project decisions select Juvanga. Proposed values, legal statements and references reproduce the source and are not new verification or approval. See [current decisions](../../product/DECISIONS.md), [scope](../../product/SCOPE.md) and [ADRs](../../architecture/decisions/README.md) for subsequent choices and explicit deviations.

Audience: management, product, education, architecture, development, UX, QA, security and operations.

Status: reference design document; P0 business decisions require approval before production.

A shared framework for launching a service that is simple for learners, robust for Wewigo teams and extensible without overengineering.

## 00 — Understanding the dossier

Wewigo trains executives, professionals and teams in practical uses of artificial intelligence. This platform brings together offer discovery, registration, verified external payments, session planning, courses, exercises, presentation and professional discussions.

| Area | Position |
| --- | --- |
| Direction | A limited real pilot, progressing toward a scalable product |
| Educational promise | Progress rests on demonstrated skills, not reading alone |
| Transactional principle | Payment evidence ≠ confirmed receipt; order ≠ booking; booking ≠ educational entitlement |
| Initial architecture | Modular monolith, PostgreSQL, private storage, outbox events and cautious PWA |

### Statuses and conventions

| Marker | Meaning |
| --- | --- |
| [REQUIRED] | Business need stated by the sponsor; P0 inclusion depends on approved scope |
| [PROPOSED] | Technical or operational hypothesis to confirm with the responsible person |
| [TO VALIDATE] | Open commercial, legal, educational or financial decision |
| P0 / P1 / P2 | P0: required for pilot; P1: after learning from pilot; P2: evolution |
| Reference: ID-xx | Requirement ID traceable to tests, decisions or exit criteria |

No [PROPOSED] value alone authorizes production. Named owners must approve P0 decisions, sales terms, financial procedures and applicable compliance.

### Contents and original page references

| Section | Original page |
| --- | ---: |
| 00 Understanding the dossier | 2 |
| 01 Product vision and audiences | 4 |
| 02 Scope and increments | 4 |
| 03 Identity, roles and privacy | 5 |
| 04 User journeys and bookings | 6 |
| 05 Offers, orders and access entitlements | 7 |
| 06 Calendar, capacity and fulfillment | 8 |
| 07 External payments and reconciliation | 9 |
| 08 Invoicing and financial documents | 10 |
| 09 Catalogue, resources and learning | 10 |
| 10 Editorial AI and presentation mode | 12 |
| 11 Organizations, communities and notifications | 12 |
| 12 UX, accessibility and PWA | 14 |
| 13 Data model and invariants | 15 |
| 14 API, events and concurrency scenarios | 15 |
| 15 Logical architecture and operations | 17 |
| 16 Security, compliance and data governance | 18 |
| 17 Performance, monitoring and availability | 19 |
| 18 Estimates, budget and roadmap | 20 |
| 19 Business decisions and responsibilities | 21 |
| 20 Acceptance testing, quality and launch | 22 |
| A Requirements reference | 23 |
| B Operational risk register | 24 |
| C Structured learning object example | 24 |
| D References and glossary | 25 |
| E Brand identity and reference material | 26 |

## 01 — Product vision and audiences

Wewigo training targets users often unfamiliar with large language models (LLMs). The experience must reduce apprehension, make benefits concrete and guide each person toward mastery of a useful professional task.

| Audience | Goal | UX criterion |
| --- | --- | --- |
| Individual executive | Understand AI, select training, pay outside the app and arrange sessions | Guided steps, transparent prices and states |
| Team / organization | Train a cohort, distribute seats and measure authorized progress | Simple invitations, private reporting |
| Trainer / editor | Publish materials, present, assess and guide | Retained content version and rubric |
| Wewigo operations | Reconcile payments, assign sessions, resolve disputes and monitor quality | Action queues, audit and measurable deadlines |

### Initial offers and content

- Initially considered courses: LLMs and Office Productivity, LLMs & Websites, LLMs & Web Applications.
- Initial domains: Artificial Intelligence, Web Development, Physics, Chemistry and Mathematics. Levels are integers starting at 0.
- Level 0 presents explicitly public free resources. Price comes from a versioned offer, never directly from domain or level.
- Formats: guidance at home, on company premises or remotely; individual, association or organization registration.

| Flyer commercial reference | Modeled hypothesis |
| --- | --- |
| 75,000 FCFA training | Training price line, configurable per offer |
| 25,000 FCFA registration | Separate optional line |
| 100,000 FCFA total | Arithmetic XAF example, never a universal price |
| 4 weeks / 2 × 2 hours per week | 16 session hours; explicit offer schedule |
| 3 months WhatsApp guidance | Bounded service entitlement and privacy policy |

## 02 — Scope and increments

| Increment | Scope | Excluded |
| --- | --- | --- |
| P0 / pilot | Email account, catalogue/level 0, offers, orders, verified external payments, access, Mode A booking, exercises, simple presentation, back office, support, monitoring | Operational Mode B; integrated payment; advanced forum |
| P1 / extension | Moderated public/private forums, richer notifications, secure AI import, English, alternative authentication, installments if justified | Heavy dependencies without demonstrated usage |
| P2 / growth | Advanced real-time optimization, large-scale reporting/media, high capacity demonstrated through tests | Contractual promise of 1M concurrent users without sizing |

### Explicit pilot non-goals

- No direct in-app payment, multiple currencies or automatic installment workflow.
- No native videoconferencing or AI agent authorized to publish, validate payment or manage privileges.
- No local password or financial-document storage; no offline paid-course downloads by default.
- No availability or massive-volume commitment without corresponding operations, budget and tests.

### Delivery gates

| Gate | Expected evidence |
| --- | --- |
| G0 / Decide | Signed P0 decisions, known commercial policy and responsibilities |
| G1 / Secure | Tested access control, four-eyes finance, concurrent bookings and B2B isolation |
| G2 / Teach | Complete reviewed free and paid courses, validated exercises and rubrics |
| G3 / Experiment | Mobile/slow-network, security, restoration and support tests; metrics |
| G4 / Launch | Written go/no-go, approved operating budget, tested rollback |

## 03 — Identity, roles and privacy

Every server authorization combines role, action, resource, organization/cohort, order state and entitlement period. A hidden button or hard-to-guess URL is never protection.

| Actor | Rights | Limit |
| --- | --- | --- |
| Visitor | Catalogue and public level 0 resources | No private course, forum or media |
| Learner | Own acquired courses, exercises, sessions, documents and groups | No other beneficiary's records |
| Trainer | Assigned sessions, reviews and relevant educational information | No payment documents or other cohort |
| B2B coordinator | Invitations, quotas and authorized aggregates | No named grades by default |
| Editor | Drafts, import and course review | Publication by a distinct authorized role |
| Scheduler | Opens slots, assigns resources, handles rescheduling | Confirms no receipt of funds |
| Finance / entry | Records proposals and drafts | Never confirms own entry |
| Finance / approval | Verifies and confirms against an independent source | Must be a different person from creator |
| Support / moderation | Minimized cases, reports, escalations | No raw documents or implicit powers |
| Super-administrator | Privileged settings, sensitive permissions | MFA, logging, separation of duties |

### Organization protection

- A person may belong to several organizations: access to cohort A grants no access to B.
- [PROPOSED] Suppress statistical cells with fewer than 5 people and prevent filters/totals that reconstruct individual grades. This alone does not guarantee anonymity.
- Individual professional progress data: specific authorization, purpose and explicit legal/contractual framework before activation.
- Every export, search, private media item, forum, cache or SSE stream reevaluates access scope.

## 04 — User journeys and bookings

### Mode A: verified payment, then session selection

[PROPOSED] reference mode for the pilot. It avoids unnecessarily blocking slots during manual verification. Educational access follows reconciliation; session booking is separate.

Journey A, recommended subject to validation:

1. Offer and order.
2. External payment.
3. Independent verification.
4. Course entitlement.
5. Assigned session.

- Order clearly states XAF price, validity, external payment methods and verification status.
- Before receipt of funds, the interface displays indicative availability and a session-proposal deadline without promising a particular slot.
- If no compatible slot exists after payment: Fulfillment.AWAITING_SLOT, priority support, a published deadline, then contractual rescheduling/refund choice.
- Confirmed booking is never required to read already acquired lessons, except an express restriction attached to a separate offer component.

### Mode B: capacity option before payment

Alternative mode specified but disabled by default for the pilot. Activation requires guaranteed review turnaround, nonworking-day procedures and concurrent capacity controls.

Journey B, conditional activation:

1. Choose a seat.
2. Time-limited hold.
3. Pay and submit.
4. Verify before cutoff.
5. Confirm or resolve.

- `mode_snapshot` is frozen on the order. No automatic A/B switch mid-transaction.
- Timely evidence moves the hold to REVIEW_PENDING, retaining capacity until an explicit review bound.
- If verification misses the announced deadline, notify, escalate and open a resolution. Never silently reactivate an expired hold.
- Customer may upload new evidence while their window is open; image rejection does not prove funds were not received.

### Company, association or team

Verified coordinator → B2B offer/quote → seat purchase → expiring invitations → individual accounts → cohort assignment → sessions and assessment → authorized statistics. Buyer, payer, training manager and beneficiary are distinct relationships.

## 05 — Offers, orders and access entitlements

### Price and validity

Working value to validate: an AWAITING_PAYMENT order retains the offer's price and lines for 7 calendar days. After expiry, no new commercial instruction is accepted, but late incoming transfers remain recorded and require financial resolution. No retroactive price changes.

| Object | States / rules |
| --- | --- |
| Order | DRAFT → AWAITING_PAYMENT → PAID; EXPIRED or CANCELLED; DISPUTED handled separately |
| PaymentEvidence | UPLOADED → PENDING_REVIEW → ACCEPTED / REJECTED; new evidence creates a new attempt |
| PaymentTransaction | PROPOSED → RECONCILED → CONFIRMED / REJECTED; REVERSED after validation with traceability |
| Enrollment | INVITED → ACTIVE → SUSPENDED / COMPLETED / CANCELLED |
| Entitlement | PENDING → ACTIVE → SUSPENDED / EXPIRED / REVOKED; independent of booking |
| Fulfillment | NOT_STARTED → AWAITING_SLOT → SCHEDULED → DELIVERED / DISPUTED |

### Entitlement triggers

| Entitlement | Verified condition | Effect |
| --- | --- | --- |
| Paid reading | CONFIRMED payment, valid offer, active beneficiary/enrollment | Access to authorized CourseVersion |
| Session | Usable service credit + available capacity + booking rules | Confirmed collision-free Booking |
| Private forum | Valid cohort/organization membership and forum scope | Read/write according to role |
| Certificate | Competence criteria and published conditions satisfied | Traceable generation; not attendance alone |

## 06 — Calendar, capacity and fulfillment

Slots are unavailable by default. Only an authorized scheduler makes them visible. Dates are stored in UTC and displayed in IANA Africa/Douala for Cameroonian sessions.

| Object | States | Capacity rule |
| --- | --- | --- |
| Slot | DRAFT → OPEN → SUSPENDED → CLOSED | Open capacity is not a booking |
| Hold (Mode B) | HELD → REVIEW_PENDING / RELEASED / EXPIRED / CONVERTED | Active HELD and REVIEW_PENDING consume associated seats until expiry |
| Booking | REQUESTED → CONFIRMED → ATTENDED → COMPLETED; CANCELLED / NO_SHOW | CONFIRMED consumes capacity; ATTENDED = presence; COMPLETED = closed session |
| Fulfillment | NOT_STARTED → AWAITING_SLOT → SCHEDULED → DELIVERED / DISPUTED | Tracks service delivery, not funds received |

### Invariants and edge cases

- [BOOK-01] Remaining capacity = published capacity − confirmed bookings − active holds; count exact seats held for groups.
- [BOOK-02] Atomic transactional allocation: simultaneous requests for the last seat cannot both succeed.
- [BOOK-03] An exclusive trainer or room cannot be assigned overlapping sessions; include home-visit travel and preparation time.
- [BOOK-04] An expired, closed or past slot cannot be purchased or reopened by a client. Late confirmations require resolution.
- [BOOK-05] Trainer cancellation: qualified replacement or new proposal, notification, consent and commercial compensation policy.
- [BOOK-06] Holds/extensions retain actor, reason, before/after, new deadline and notification. Configure maximums and delegations.

Mode B parameters to approve: proposed simulation of an initial 48-hour hold; review within one working day; cutoff at the end of the next working day after submission under Wewigo's calendar/timezone. These are not commercial guarantees. Without demonstrated on-call coverage, Mode B stays disabled.

## 07 — External payments and reconciliation

In the pilot, customers transfer funds outside the application. A customer-supplied screenshot, statement or SMS is not independent proof of receipt.

Simplified sequence (learner → API/DB → finance → outbox/entitlements): create order → instructions + price → upload evidence → reconciliation task → source and dual approval → commit + outbox → entitlement + notification.

### Nonnegotiable financial rules

- [PAY-01] Confirmation source: merchant Mobile Money account statement, bank statement or verifiable official provider interface, depending on available integration.
- [PAY-02] Four eyes: the creator of a manual entry cannot approve it. The approver is distinct, authenticated with MFA, and every action is logged.
- [PAY-03] Without a distinct verifier, the transaction remains PENDING_APPROVAL and grants no entitlement. Emergency procedures cannot bypass dual financial approval.
- [PAY-04] Unique external reference by operator, merchant account and actual reference; detect duplicates and represent transactions, evidence and allocations separately.
- [PAY-05] Integer XAF amounts: retain amount due, declared, actually received, known fees and allocations; no automatic tolerance threshold.
- [PAY-06] Discrepancy, late transfer, refund or reversal: resolution case with human decisions, supporting documents and effects on entitlements/documents.

### Multiple payments and future PSP

Installments are not open in the pilot. PaymentTransaction and PaymentAllocation nevertheless support multiple allocations to an order. A future gateway can feed the same concepts with event IDs, signatures, timestamps, replay prevention, deduplication and asynchronous verification.

## 08 — Invoicing and financial documents

| Phase | Required behavior |
| --- | --- |
| Draft / preview | Authorized operator selects customer and reconciled receipts, enters permitted lines and previews before issuance |
| Issuance | Dedicated permission; assign unique number/date; freeze content, taxes and version; generate printable/downloadable PDF |
| After issuance | No hard delete or rewrite; correction through credit note or approved tax mechanism; retain sequences and supporting records |
| Control | Compare issued documents with receipts/accounting; log actors, versions, downloads and sensitive actions |

- [INV-01] Draft is editable; issuance freezes data. Allocate number atomically at issuance. Explain gaps; never conceal them by reuse.
- [INV-02] Technical fields include issuer/customer identity, number, date, lines, amounts, taxes, currency and extensible notices.
- [INV-03] A PDF preview is not an issued tax invoice. Required information, exemptions, possible electronic requirements and credit-note mechanisms need Cameroonian validation before pilot.
- [INV-04] Issuance permission is distinct from receipt-entry permission and cannot modify transaction history.

## 09 — Catalogue, resources and learning

Educational structure: Domain → Level → Course → CourseVersion → Module → Lesson → Block, with exercises, assessment rubrics and media resources. Level 0 is a free-publication choice, not a universal absence of access control.

### Catalogue administration

- [COUR-01] Authorized roles alone manage domains/levels; integer levels ≥0; refuse deletion while referenced.
- [COUR-02] Editorial team creates, edits drafts, archives and hides courses/lessons; learners only read and submit.
- [COUR-03] Prices/terms attach to an OfferVersion; preserve price, tax and term history for existing orders.
- [COUR-04] Course pages display objectives, prerequisites, essential equipment, duration, formats, price and access policy.

| Editorial status | Consequence |
| --- | --- |
| DRAFT / REVIEW | Editing, preview and educational/technical/license checks |
| PUBLISHED | Immutable version; corrections through new version and change log |
| ARCHIVED | No longer for sale, retained for authorized people |
| SOFT DELETED | Hidden from catalogue; irreversible deletion prohibited while dependencies/retention obligations exist |

### Learning through demonstrated mastery

- [LEARN-01] Every exercise specifies observable deliverable, target skill, mandatory criteria, versioned rubric, threshold and reviewer.
- [LEARN-02] Lesson reading and competence acquisition are independent measures. A missed critical criterion blocks a milestone even if the overall score seems sufficient.
- [LEARN-03] Submission: DRAFT → SUBMITTED → IN_REVIEW → PASS / REWORK / REJECTED. Successive revisions remain tied to their cycle's RubricVersion.
- [LEARN-04] Rubric changes after submission never silently affect ongoing/reviewed work. Unsubmitted drafts display new criteria before confirmation.
- [LEARN-05] Trace appeals and human decisions; check consistency between reviewers when needed.

### Initial content: critical dependency

| Deliverable | Owner | Exit criterion |
| --- | --- | --- |
| Level 0: LLMs and Office Productivity | Education lead + AI expert | Objectives, concrete cases, free exercises, review |
| Complete paid C1 course | Domain expert + independent reviewer | Lessons, licensed media, quizzes, practical exercises and solutions |
| Websites / Web Applications | Education management | Validated prerequisites, professional value, progression and depth |
| Educational acceptance dataset | QA + education | Fictional submissions/accounts, reference reviews, no real data |

## 10 — Editorial AI and presentation mode

External generators (ChatGPT, Claude, Grok, etc.) create drafts. They never have authority to publish a course, grant entitlement, approve a transfer or change roles.

| Step | Minimum control |
| --- | --- |
| Generation | Documented structure, cited sources, provenance, version and GENERATED/DRAFT state |
| Import | JSON Schema, size limit, actual type checks, media quarantine, anti-XSS/anti-SSRF |
| Review | Educational accuracy, Cameroonian examples, licenses, accessibility and safe links |
| Publication | Authorized human decision, immutable snapshot, log and archiving option |
| Presentation | Full-screen rendering of the same CourseVersion blocks, keyboard navigation, no private grades |

Presentation scenario:

- Trainer opens an authorized course, selects its version, enters presentation mode and projects lessons without leaving the app.
- Load media on demand; offline mode allowed only under entitlement and cache policy.
- Personal data, learner results and private messages are never visible by default during presentation.
- Every AI connector action is server-authenticated, draft-limited, uses a short-lived token and ends with human control.

## 11 — Organizations, communities and notifications

### Structures and forums

- Organization has Memberships and Cohorts; Cohort has SeatAllocations and Enrollments. A person may belong to multiple structures.
- General forum and COURSE, ORG or COHORT spaces are isolated by scope and active membership; no global index may expose private content.
- Basic functions: ask, answer, mark helpful answers, report abuse, moderate and request decision review.
- Keep the feature flag disabled until private forums can be moderated.

### Messages and support

| Event | Working value | Fallback |
| --- | --- | --- |
| Confirmed booking | Immediate transactional email and internal inbox | Available in account |
| Session reminder | Previous day at 18:00 and two hours before, through authorized channel | Remove/reissue after rescheduling |
| Trainer absence | Priority notification and replacement/rescheduling proposal | Support ticket with owner |
| Late financial verification | Internal alert at deadline and escalation | No entitlement activation |
| Dispute / complaint | Timestamped ticket, category, severity, SLA and owner | Traced escalation if late |

The notification inbox retains essential events. Offer push only after consent and compatibility verification; lock-screen content contains neither financial documents nor secrets.

## 12 — UX, accessibility and PWA

The product must feel simple even when business rules are complex: one primary action per screen, clear French text, visible status, short steps, explicit cancellation/resume.

Scoping wireframes, not contractually binding graphic mockups:

| Catalogue | Order | Learner area |
| --- | --- | --- |
| Courses and domains | Offer and XAF price | Continue a lesson |
| Free level 0 | Validity date | Exercises and progress |
| Price / prerequisites | Pay outside the app | Schedule my session |
| Discover course | Track my payment | Ask for help |

### Inclusive design

- Mobile first: test screens/touch controls on modest Android phones, tablets and computers.
- WCAG 2.2 AA target: visible focus, contrast, keyboard, identified forms, zoom, resizable text, captions, messages beyond color alone.
- Lightweight useful animations respecting prefers-reduced-motion; decorative effects must not impair reading or increase data costs.
- French pilot interface; i18n architecture ready for P1 English. Handle XAF, dates, plurals and translated content.

### Intermittent mobile connectivity

| Area | Offline behavior | Resume |
| --- | --- | --- |
| Public catalogue | Versioned public cache, restrained fallback | Refresh on reconnection |
| Registration | No saved passwords or automatic submission | New online submission with deduplication |
| Exercise drafts | Optional local nonsensitive text on personal device | Explicit submission, announced version conflicts |
| Payment evidence | No automatic local queue for financial documents | Idempotent online resume and server state |
| Paid courses | No private cache by default | Possible P2 private offline mode with entitlement checks |

- Video on demand only, weight/duration indication, adaptive quality, captions/transcript and separate outgoing-GB measurement.
- Installable PWA where supported; do not promise identical capabilities across devices and systems.
- Link sharing through WhatsApp/other apps without automatic private data in URLs.

## 13 — Data model and invariants

Proposed transactional PostgreSQL database. Financial identities and audit events are append-only where relevant; sensitive files use private object storage.

| Domain | Relationships / cardinalities |
| --- | --- |
| Commerce | Order 1:N OrderLine; Order 1:N PaymentEvidence; PaymentTransaction 1:N PaymentAllocation; Order 1:N incoming allocations |
| Education | Course 1:N CourseVersion; CourseVersion 1:N Lesson/ExerciseVersion; ExerciseVersion 1:N RubricVersion; Submission N:1 RubricVersion |
| Access | Enrollment N:1 User and N:1 CourseVersion; Entitlement N:1 beneficiary + entitlement source (OrderLine or SeatAllocation) |
| Scheduling | Session 1:N Slot; Slot 1:N Hold/Booking; Booking 0:1 converted Hold; interval-reserved resources |
| B2B | Organization 1:N Cohort; Cohort 1:N SeatAllocation; active allocation tied to at most one beneficiary |
| Finance & audit | Invoice 1:N InvoiceLine; CreditNote N:1 Invoice; causally linked AuditEvent and OutboxEvent |

### Structural constraints

- [DATA-01] Normalized email, unique active memberships, tenant-aware resource keys.
- [DATA-02] Slot capacity, seat allocation and resource assignment under concurrent transactions; exclusion of exclusive intervals.
- [DATA-03] Immutable PUBLISHED versions; Submission explicitly references ExerciseVersion and RubricVersion. No implicit learner migration.
- [DATA-04] Idempotency keys retain responses for a configured period, while financial-reference deduplication persists independently.
- [DATA-05] Business mutation and OutboxEvent in the same commit; asynchronous recovery with idempotent consumers.
- [DATA-06] Catalogue soft delete ≠ personal-data anonymization ≠ accounting-document destruction: retention by category, purpose, legal basis and owner.
- [DATA-07] No personal data in public analytics, unprotected logs, public cache or shared links.

## 14 — API, events and concurrency scenarios

Versioned REST API /v1; OpenAPI contracts before integration coding; integer XAF, ISO 8601 UTC timestamps, schema checks and structured errors.

| Route / action | Minimum contract |
| --- | --- |
| POST /v1/orders | offer_id, beneficiary, Idempotency-Key → order_id, amount_xaf, mode_snapshot, expiration, state |
| POST /v1/payment-evidences | order_id and secure upload_token → evidence_id / PENDING_REVIEW |
| POST /v1/admin/reconciliations | Reference/source/amount/independent document → PROPOSED, maker_id |
| POST /v1/admin/reconciliations/{id}/confirm | Distinct checker and MFA; financially valid commit, entitlements and outbox |
| GET /v1/availability | Offer, date and timezone → indicative capacity; no seat hold |
| POST /v1/bookings | Entitlement, slot_id, seat_count, Idempotency-Key → atomic 201 or 409 |
| POST /v1/exercises/{id}/submissions | Exercise/rubric version, deliverable, If-Match → confirmed version or conflict |
| GET /v1/events | Optional SSE, rights-limited events and bounded Last-Event-ID resume |

### Errors and idempotency

Main codes: 400 format, 401 authentication, 403 authorization, 404 hidden resource, 409 state/capacity/key collision, 422 validation, 429 rate, 503 unavailable. Each error includes stable code, safe message and correlation_id.

```http
POST /v1/orders
Idempotency-Key: 01J...

{"offer_id":"off-12", "beneficiary_id":"usr-07"}
```

```json
{"order_id":"ord-31", "mode":"A", "amount_xaf":100000,
 "quote_expires_at":"2026-11-12T20:00:00Z", "state":"AWAITING_PAYMENT"}
```

The first response has status 201. A capacity conflict has status 409:

```json
{"code":"SLOT_CAPACITY_EXHAUSTED", "retryable":false,
 "correlation_id":"req-abc"}
```

- Same key/body returns the same result within the configured window; different body returns 409 IDEMPOTENCY_PAYLOAD_MISMATCH.
- [PROPOSED] Response memory retained 72 hours, separate from durable financial deduplication.
- Outbox events carry no private documents or secrets; consumers recheck entitlements before delivery.

## 15 — Logical architecture and operations

Recommended launch: modular monolith. Each module has a clear contract; critical transactions remain locally consistent.

Architecture layers:

1. Responsive PWA / public and authenticated access.
2. HTTP API / sessions / access control / validation.
3. Modular monolith: Identity · Catalogue/Learning · Commerce · Scheduling · Organizations · Community.
4. Transactional PostgreSQL · private storage · workers/outbox · monitoring.
5. CDN limited to public assets; private media through access controls and temporary URLs.

Pilot target: modules deploy together, with logical separation anticipating growth.

| Block | Responsibility |
| --- | --- |
| TypeScript frontend / PWA | Mobile routes, visible states, errors, cautious public service worker |
| Identity & Organizations | Sessions, entitlements, MFA, memberships, cohorts, invitations |
| Catalogue / Learning | Versions, lessons, exercises, rubrics, progress, presentation |
| Commerce / Scheduling | Offers, orders, reconciliation, invoicing, calendar, capacity |
| Jobs / Outbox / Notifications | Expiry, reminders, events, retries, escalations |
| PostgreSQL / private storage | Transactions, logs, uploaded documents, backups, restoration |
| Observability | Metrics, traces, errors, audit, budget, incident notifications |

Deployment and evolution:

- Isolated development/staging/production; CI/CD with reviewed migrations, security tests and rollback.
- Server feature flags for Mode B, private forums, Web Push, AI import and presentation, activated by cohort/organization.
- Add Redis cache, broker, replicas, SSE gateway or partitioning based on measurements, not abstract scalability.
- Prepare future PSP webhooks without changing Order, PaymentTransaction, PaymentAllocation or Entitlement semantics.

## 16 — Security, compliance and data governance

### Baseline measures

- [SEC-01] Correctly configured Argon2id password hashing, email verification, safe reset, rotating sessions, Secure/HttpOnly/SameSite cookies, CSRF defenses.
- [SEC-02] Mandatory MFA for roles approving payments, issuing invoices or modifying sensitive permissions.
- [SEC-03] Resource-tested deny-by-default RBAC/ABAC; request limits, anti-bot, CSP, CORS controls and injection defenses.
- [SEC-04] Uploads: actual type/size, antivirus or equivalent scanning, quarantine, access control, short-lived URLs and appropriate encryption.
- [SEC-05] AI/provider secrets server-side only; no sensitive data in URLs, telemetry, notifications or public cache.
- [SEC-06] Threat model, protected privilege log, targeted SAST/DAST, encrypted backups and restoration drills.
- [SEC-07] Verification reference: OWASP ASVS 5.0.0, with selection/justification of applicable level and requirements.

### Data protection in Cameroon

Historical legal context stated in the source: Cameroonian law no. 2024/017 of 23 December 2024 concerns personal data. Its article 73 provides eighteen months from promulgation to comply, giving 23 June 2026; the dossier states this deadline had passed at its reference date. Exact formalities, applicable obligations and implementing texts require validation by a local lawyer.

- The source states article 19 provides prior authorization for the processing it covers. Confirm applicable procedure, competent authorities and any exceptions/implementing provisions before pilot.
- Maintain a register of processing, purposes, data, recipients, processors, international transfers, security measures and retention.
- Provide registration transparency, data-subject rights, incident response, consent when applicable and special conditions for minors.
- Analyze transfers through hosting, AI APIs, email, analytics and storage outside Cameroon before contracting.
- Tax compliance, including invoice/credit-note validity, requires separate validation against current DGI texts.

## 17 — Performance, monitoring and availability

One million concurrent users is a long-term capacity hypothesis to define/test, not a pilot commitment. Separate registered accounts, five-minute active users, open sessions, SSE connections, video streams and server requests.

| Hypothesis for 1 million | Calculation | Interpretation |
| --- | --- | --- |
| 0.1 requests/s/person | 100,000 requests/s average | Intensive interactive profile, excluding bursts |
| 0.1 requests/min/person | Approximately 1,667 requests/s average | Low-activity profile, excluding bursts |

### Measurable pilot targets [PROPOSED]

| Measure | Initial target and conditions |
| --- | --- |
| Actual population | 50–200 users; synthetic tests beyond, without claiming to simulate a million |
| Booking latency | Server API p95 <1.5 s at agreed test load, realistic database, documented datacenter/region |
| HTTP errors | <1% 5xx in nominal operation over a meaningful window, excluding client faults/chaos tests |
| Concurrent booking | 0 overbooking under load; simultaneous last-seat test with DB log |
| RPO / RTO | Set according to budget; actually practise restoration before launch |
| Reproducibility | Retain build, environment, network/device profile, average/peak RPS, p95/p99, error rate |

### Alerts and organization

| Signal | Working threshold / owner |
| --- | --- |
| Reconciliation failure | Any verification exceeding SLA → finance supervision |
| Capacity violation | Any overbooking = major incident → technical + scheduling |
| 5xx errors | >2% over 5 min and ≥100 requests → technical on-call |
| Booking p95 | >1.5 s over 10 min and ≥50 requests → tech lead |
| Egress spending | >80% monthly budget or anomaly → finance + operations |

SSE is optional for pilot. If adopted, measure concurrent connections, RAM/connection, heartbeat, progressive reconnect, account limits and authorization per event.

## 18 — Estimates, budget and roadmap

Design-level orders of magnitude for an experienced team using proven components; neither quotation nor firm schedule.

| Workstream | Person-days | Main deliverables |
| --- | --- | --- |
| Decisions and UX | 12–22 | P0 decisions, journeys, tested prototypes |
| Identity and security | 22–40 | Sessions, MFA, roles, audit, isolation |
| Catalogue / editing | 25–45 | Versions, media, level 0, publication |
| External finance | 25–45 | Orders, evidence, four eyes, invoicing |
| Sessions / scheduling | 25–45 | Capacity, collisions, replacement, rescheduling |
| Education / presentation | 30–50 | Assessment, progress, simple presentation |
| Frontend / PWA | 18–32 | Mobile, accessibility, connectivity |
| QA / DevOps / operations | 35–65 | Acceptance, observability, restoration, pilot |

Working envelope: **192–344 person-days** for eight workstreams, excluding content production and specialist costs. Allow 15–25% contingency depending on unknowns. Interdependencies mean these figures do not directly determine calendar duration.

### Spending and critical path

- C1 content: separate 25–60 person-day hypothesis for a complete illustrated course, exercises and review; highly variable with quality expectations.
- Pilot hosting: [PROPOSED] exploratory 60,000–250,000 FCFA/month, excluding staff, SMS, heavy video, taxes and external audit. No provider price assumed.
- Monthly: total operations cost / active users; variable cost per order, booking, GB transmitted and 1,000 API operations.
- Validated free content and first paid course are launch requirements, not optional end-of-project tasks.

| Delivery order | Transition condition |
| --- | --- |
| 0. Business validation | Signed policies, prices, refunds, Mode A, permissions and tax rules |
| 1. Security foundation | Auth, CI/CD, roles, logs, tenant tests, backup |
| 2. Course production | Level 0 and paid C1, exercises, licenses, review, QA |
| 3. Commerce / calendar | Order, Payment, Entitlement, Booking A, dual approval |
| 4. User experience | PWA, learner journey, presentation, support, accessibility |
| 5. Pilot | Restoration, monitoring, cost, real test, go/no-go |
| 6. Extensions | Forums, Mode B, PSP, English and functions driven by feedback |

## 19 — Business decisions and responsibilities

Wewigo management decides commercial terms and accepted risk. Developers implement approved rules, not rules invented ticket by ticket.

### Decision register to approve before pilot

| ID | Question / working value | Approver |
| --- | --- | --- |
| DEC-01 | Mode A pilot; Mode B inactive | Management + product |
| DEC-02 | Order validity: 7 calendar days; fees/prices per offer | Management + finance |
| DEC-03 | Cancellations, absences, no-show, refunds, session-proposal deadline (e.g. 10 working days) | Management + legal |
| DEC-04 | Distinct entry/approval operators; reconciliation sources; review calendar | Finance owner |
| DEC-05 | Numbering, invoice, credit note, tax regime, legal retention | Tax expert + finance |
| DEC-06 | B2B reporting, individual tracking, minimum aggregate 5, employee departure | Legal + product |
| DEC-07 | Competence criteria, C1 course, publication roles | Education owner |
| DEC-08 | RPO/RTO, support, internal SLAs, budget, on-call intervention | Management + technical |
| DEC-09 | Mode B: 48-hour hold, working-day review, cutoff, on-call coverage if activated | Finance + operations |

### Operational RACI

| Activity | Product | Tech | Finance | Education | Management |
| --- | --- | --- | --- | --- | --- |
| Offer and customer policy | R | C | C | C | A |
| Payment and dual approval | C | R | A | I | I |
| Invoice and credit note | C | R | A | I | I |
| Course publication | C | R | I | A | I |
| Data and contracts | R | R | C | C | A |
| Security / backup | C | A | I | I | I |
| Pilot go/no-go | R | C | C | C | A |

R = responsible; A = accountable / approves; C = consulted; I = informed. Assign named people to every row in the project plan. Finance roles require at least two distinct people for reconciliation.

## 20 — Acceptance testing, quality and launch

Each scenario becomes Given/When/Then with accounts, datasets, preconditions, DB assertions, API check, log, notification and restoration to initial state. These scenarios guide tests to develop in the backlog.

| Test | Scenario and primary assertion |
| --- | --- |
| AT-AUTH-01 | Duplicate registration: neutral response, no account-existence leak |
| AT-BOOK-01 | Two bookings for last seat: one confirmation, other 409 |
| AT-BOOK-02 | Mode B timely evidence: capacity retained until cutoff |
| AT-BOOK-03 | Expired hold + received payment: no resurrection; open financial resolution |
| AT-BOOK-04 | Unavailable trainer: session not marked held, traceable replacement/rescheduling |
| AT-PAY-01 | Evidence without reconciliation: no paid entitlement |
| AT-PAY-02 | Same maker/checker: server denial and audit |
| AT-PAY-03 | Duplicate transaction reference: one confirmable transaction |
| AT-PAY-04 | Funds received after expiry: entitlement contingent on contractual resolution |
| AT-ENT-01 | Confirmed payment, no slot: acquired reading and Fulfillment.AWAITING_SLOT |
| AT-LEARN-01 | REWORK with new rubric: original cycle version retained |
| AT-LEARN-02 | Course read without critical competence: milestone not acquired |
| AT-ORG-01 | Three-person aggregate: cell suppressed and not inferable through filters |
| AT-COM-01 | Outside-cohort user: no private thread or search leak |
| AT-NOT-01 | Rescheduled time: old reminders canceled, new reminders scheduled |
| AT-PRES-01 | Presentation: no named data or private message |
| AT-AI-01 | AI connector attempts publication: rejection and audit |
| AT-UX-01 | Network loss during exercise: opt-in recovery, no silent submission |
| AT-SEC-01 | Another organization's object: denial without metadata |
| AT-DATA-01 | Replayed outbox: no duplicate entitlements/logical notifications |
| AT-PERF-01 | Documented load: retained latency, errors, RPS and environment |

### Pilot go/no-go criteria

- Zero overbooking and cross-organization isolation failures in defined tests; no untreated critical vulnerability.
- Every manual financial confirmation has two distinct named actors, independent source and approval trace.
- Complete, verified level 0 and paid C1 courses with exercises demonstrating mastery.
- Real tests with varied digital ability, inexpensive devices and imperfect mobile networks; blocking defects resolved.
- Tested restoration, actually received alerts, identified support owner, tracked budget and written launch decision.

## A — Requirements reference

IDs are requirement families enabling a complete ticket-system traceability matrix; a family does not imply exhaustive tests already exist.

| Family | Subject | Initial tests |
| --- | --- | --- |
| ID / SEC | Identity, roles, isolation, sessions, files, privacy | AT-AUTH-01; AT-SEC-01 |
| UX | A/B journeys, screens, accessibility, i18n, PWA, slow network | AT-UX-01 |
| BOOK | Opening, capacity, resources, holds, rescheduling, absence | AT-BOOK-01 to 04 |
| PAY / INV | Manual receipt, four eyes, invoice, credit note | AT-PAY-01 to 04 |
| ENT | Educational entitlements independent of slots | AT-ENT-01 |
| COUR / LEARN | Catalogue, immutability, exercises, rubrics, certificate | AT-LEARN-01 to 02 |
| ORG / COM | Cohorts, privacy, seats, forums, moderation | AT-ORG-01; AT-COM-01 |
| NOT / PRES / AI | Reminders, presentation, controlled AI import | AT-NOT-01; AT-PRES-01; AT-AI-01 |
| DATA / PERF | DB constraints, outbox, capacity, monitoring | AT-DATA-01; AT-PERF-01 |

Final backlog adds calendar/timezone, cancellations, invoice/credit note, hard delete, data-subject rights, retention, network loss, tax controls and advanced load tests.

## B — Operational risk register

| Risk | Effect | Response |
| --- | --- | --- |
| External payment delay | Blocked holds or wrongly granted access | Mode A pilot; four eyes; financial queue |
| Verified payment without seat | Dissatisfaction and disputes | Indicative availability, assignment deadline, contractual resolution |
| B2B group leak | Individual results exposed | Strict scope, suppressed small aggregates, legal review |
| Rubric changed mid-cycle | Unfair assessment | Frozen version, explicit migration |
| Expensive mobile data | Abandonment, high video cost | Multiple qualities, transcripts, egress measurement |
| Legal/tax noncompliance | Penalties and reputation | Local advice, obligations register, pre-pilot gate |
| Premature scaling | Excess cost and saturation | Load profile, gradual tests, verifiable SLOs |

## C — Structured learning object example

Illustrative exchange format. Its schema number differs from this dossier's version; production JSON Schema, media rights and validations need separate implementation. French product values and historical identifiers are preserved in this source example; the translated meanings are listed below.

```json
{
  "schemaVersion": "1.0",
  "courseId": "uuid",
  "courseVersion": 3,
  "domain": "intelligence-artificielle",
  "level": 1,
  "title": {"fr": "LLM et Bureautique"},
  "prerequisites": ["Navigateur web"],
  "modules": [{"id": "m-1", "lessons": [{
    "id": "l-1", "blocks": [
      {"type": "paragraph", "text": {"fr": "Objectif observable"}},
      {"type": "image", "assetId": "a-1",
       "alt": {"fr": "Schéma du processus"}, "licenseId": "lic-123"},
      {"type": "exerciseRef", "exerciseVersionId": "ex-v3"}
    ]
  }]}],
  "exercises": [{"id": "ex-v3", "rubricVersionId": "rub-v2",
    "requiredCriteria": ["livrable", "verifiabilite"],
    "assessment": "human_review"}]
}
```

Source value meanings: `intelligence-artificielle` = artificial intelligence; “LLM et Bureautique” = LLMs and Office Productivity; “Navigateur web” = web browser; “Objectif observable” = observable objective; “Schéma du processus” = process diagram; `livrable` = deliverable; `verifiabilite` = verifiability.

## D — References and glossary

### Source verification references

These links are reproduced from the original dossier; they were not newly checked for this translation.

| Reference | Source / use |
| --- | --- |
| S1 | [Presidency of Cameroon: law 2024/017 of 23 December 2024 on personal data, article 73](https://prc.cm/fr/multimedia/documents/10258-loi-n-2024-017-du-23-12-2024-web) |
| S2 | [Law text hosted by a Cameroonian institution](https://biblio-minsante.cm/server/api/core/bitstreams/e64503bf-0af9-4b85-bdf1-6628bbfc1654/content) |
| S3 | [Directorate General of Taxation, 2026 General Tax Code](https://www.impots.cm/index.php/fr/publication/code-general-des-impots-mis-jour-au-1er-janvier-2026) |
| S4 | [OWASP Application Security Verification Standard, stable 5.0.0](https://asvs.owasp.org/) |
| S5 | [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) |
| S6 | [MDN Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) |

### Operational glossary

| Term | Meaning in this product |
| --- | --- |
| Entitlement | Educational or service access granted to a beneficiary |
| Hold | Temporary seat option, Mode B only |
| Fulfillment | Service delivery tracking, separate from payments |
| Outbox | Durable event written with business transaction, then delivered asynchronously |
| RBAC / ABAC | Access control by role / resource, tenant, state and context attributes |
| RPO / RTO | Maximum tolerated data loss / target restoration time |
| SLO / SLA | Measured internal objective / operational or contractual commitment |
| PWA / SSE | Installable web app / server-to-client event stream |
| Tenant | Isolated organization/cohort scope in one product |

## E — Brand identity and reference material

Reference palette: strong night blue, bright orange, luminous background. Preserve identity without reproducing flyer density on mobile. Illustrations, charts and animations serve understanding.

The supplied Wewigo flyer is an example offer and visual reference. Prices are indicative and must remain configurable.

### Visible flyer text — English translation

- **wewigo — Learn today, build tomorrow.**
- Professional Training & Artificial Intelligence.
- **TRAINING IN ARTIFICIAL INTELLIGENCE & DIGITAL TOOLS.**
- Reserved for executives and managers.
- Gain efficiency, productivity and competitive advantage through AI.
- **What you will master:** use ChatGPT, Claude, Gemini and Copilot for your work; automate repetitive tasks and free strategic time; quickly produce high-quality analyses, reports and presentations; integrate AI into your field (management, administration, finance, HR, etc.).
- **Duration: 4 WEEKS.** Two hours twice a week, compatible with an executive's schedule.
- **Training: 75,000 FCFA. Registration: 25,000 FCFA. Total: 100,000 FCFA.**
- Access to AI tools included throughout training.
- Three months of personalized WhatsApp guidance after training.
- Limited seats — book your seat now.
- Contact printed on the historical flyer: +237 674 20 73 81; wewigo1@gmail.com. These are source details, not a configured Juvanga support channel.
- “Yes, it is possible. Concrete skills for tomorrow's decision makers.”

### Implementation precondition

Before irreversible P0 development: confirm commercial/financial rules, appoint owners, have the first validated course and approve applicable local requirements. This dossier is a design basis, not certification of compliance.
