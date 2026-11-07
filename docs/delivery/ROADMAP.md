# Executable roadmap

Each milestone total is calculated in the backlog in indicative person-days. Dependencies, people availability, content production and reviews determine actual elapsed time. Estimates are neither quotes nor guarantees and are not inferred from an assistant's generation speed.

## Quick first release

**M0 planning target: approximately 2–4 weeks** after an experienced developer, author/reviewer and occasional frontend/QA support are available; more likely 4–8 weeks for one person covering everything. Content and acceptance testing are on the critical path. Recalibrate after JUV-101 to 103; no firm date until owners and content are known.

The F0 foundation is locally visible immediately after installation. M0 delivers a real free course; M1/M2 must not delay this first validation.

| Wave | Goal | Tickets | Exit |
| --- | --- | --- | --- |
| F0 | Foundations | JUV-001 to 007 | Verified restart, docs, backlog, brand and build; English documentation |
| M0-A | Content and components | JUV-101 to 105, 107 | Reviewed course and accessible UI |
| M0-B | Complete journey | JUV-106, 108 to 112 | Reading, exercise, optional resume and help |
| M0-C | Free public testing | JUV-113, 114 | Testers + HTTPS + rollback |
| M1-A | Identity and security | JUV-201 to 208 | API, sessions, entitlements and readable publications |
| M1-B | Guided learning | JUV-209 to 218 | Submission, review, presentation and support |
| M1-C | Operations | JUV-219 to 223 | Restoration and free pilot with accounts |
| M2-A | Policies and commerce | JUV-301 to 309 | Verified receipts and reliable entitlements |
| M2-B | Scheduling, finance, B2B and course | JUV-310 to 325 | Complete P0 service |
| M2-C | Commercial pilot | JUV-326 to 329 | Documented acceptance and go/no-go |

## M0 critical path

JUV-101 → 102 → 103 → 108 → 109 → 113 → 114. In parallel: components/fonts/localization, home, support and resume. Adding minimum durations yields an optimistic plan, not a reliable forecast; allow for availability and a 20–30% buffer.

## Possible role allocation

- Product/education: objectives, content, reviews, testers, commercial decisions.
- Frontend: components, reader, forms, accessibility, motion and network.
- Backend: contracts, transactions, identity, permissions and jobs from M1.
- QA/operations: CI, acceptance matrix, deployment, restoration and observability.

One person can cover multiple technical roles. Dual financial approval requires two distinct people in operations. Named responsibilities belong in STATUS; a missing name is not an implicit assignment to the assistant.

## Scope guardrails

Do not add integrated payments, forums, AI generation or 3D to M0. First demonstrate that a learner completes a task. To move faster: reduce course count, media and variants; preserve accessibility, honest states, content quality and data isolation.

Weekly: demonstrate a slice, review blocked tickets, update remaining estimates, observed errors and next slice. Each release gets a RELEASE record. The PDF's G0–G4 decisions remain required for M2, according to DECISIONS.
