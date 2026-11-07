# Juvanga backlog

Generated from `backlog.json`. Edit the source, then run `npm run backlog:generate`. Do not edit this view.

87 tasks. Estimates are indicative person-days, excluding waiting, validation and provider costs. An estimate is not a delivery date.

Usage: `npm run next` for ready tasks; `npm run task -- JUV-101` for a ticket. Status and owner are in JSON. `done` requires evidence; an unchecked box in this generated view is a reference criterion, not a second tracker.

| Milestone | Tasks | Total estimated person-days |
| --- | ---: | ---: |
| F0 | 7 | 6–12.5 |
| M0 | 14 | 18.5–36.5 |
| M1 | 23 | 40–79 |
| M2 | 29 | 75–146 |
| P1 | 8 | 25–48 |
| P2 | 6 | 28–55 |

## Epics

- [foundation](epics/foundation.md)
- [public-learning](epics/public-learning.md)
- [identity-platform](epics/identity-platform.md)
- [learning-editorial](epics/learning-editorial.md)
- [commerce](epics/commerce.md)
- [scheduling](epics/scheduling.md)
- [invoicing](epics/invoicing.md)
- [organizations](epics/organizations.md)
- [pilot-operations](epics/pilot-operations.md)
- [extensions](epics/extensions.md)
- [growth](epics/growth.md)

## Order and dependencies

| Ticket | Milestone | Task | Dependencies | Status |
| --- | --- | --- | --- | --- |
| [JUV-001](epics/foundation.md#juv-001) | F0 | Establish sources of truth and a short restart workflow | — | done |
| [JUV-002](epics/foundation.md#juv-002) | F0 | Structure the backlog and its automated validation | JUV-001 | done |
| [JUV-003](epics/foundation.md#juv-003) | F0 | Choose the logo and formalize brand guidelines | JUV-001 | done |
| [JUV-004](epics/foundation.md#juv-004) | F0 | Install the frontend foundation and shared commands | JUV-003 | done |
| [JUV-005](epics/foundation.md#juv-005) | F0 | Prepare CI, quality and free delivery | JUV-002, JUV-004 | done |
| [JUV-006](epics/foundation.md#juv-006) | F0 | Install foundations in the repository and hand off | JUV-005 | done |
| [JUV-007](epics/foundation.md#juv-007) | F0 | Translate project documentation into English and define the code comment language | JUV-006 | done |
| [JUV-101](epics/public-learning.md#juv-101) | M0 | Define the free course and its professional outcome | JUV-006 | todo |
| [JUV-102](epics/public-learning.md#juv-102) | M0 | Create the versioned public content schema | JUV-101 | todo |
| [JUV-103](epics/public-learning.md#juv-103) | M0 | Produce and review the complete free course | JUV-102 | todo |
| [JUV-104](epics/public-learning.md#juv-104) | M0 | Build accessible course components | JUV-004 | todo |
| [JUV-105](epics/public-learning.md#juv-105) | M0 | Integrate local fonts and final assets | JUV-003, JUV-104 | todo |
| [JUV-106](epics/public-learning.md#juv-106) | M0 | Deliver indexable home, catalogue and course pages | JUV-102, JUV-104, JUV-105 | todo |
| [JUV-107](epics/public-learning.md#juv-107) | M0 | Prepare French and future localization | JUV-104 | todo |
| [JUV-108](epics/public-learning.md#juv-108) | M0 | Create the lesson reader | JUV-103, JUV-104, JUV-107 | todo |
| [JUV-109](epics/public-learning.md#juv-109) | M0 | Enable practice and self-assessment | JUV-108 | todo |
| [JUV-110](epics/public-learning.md#juv-110) | M0 | Save reading progress with local consent | JUV-108 | todo |
| [JUV-111](epics/public-learning.md#juv-111) | M0 | Add help, privacy and real feedback | JUV-106 | todo |
| [JUV-112](epics/public-learning.md#juv-112) | M0 | Optimize slow networks, public PWA and motion | JUV-108, JUV-110, JUV-105 | todo |
| [JUV-113](epics/public-learning.md#juv-113) | M0 | Run acceptance testing with real testers | JUV-106, JUV-109, JUV-110, JUV-111, JUV-112, JUV-107 | todo |
| [JUV-114](epics/public-learning.md#juv-114) | M0 | Publish M0 for free and test rollback | JUV-113, JUV-005 | todo |
| [JUV-201](epics/identity-platform.md#juv-201) | M1 | Initialize PostgreSQL, migrations and local environment | JUV-006 | todo |
| [JUV-202](epics/identity-platform.md#juv-202) | M1 | Create Hono API, OpenAPI and same-origin routing | JUV-201, JUV-114 | todo |
| [JUV-203](epics/identity-platform.md#juv-203) | M1 | Configure provider email, identity and MFA | JUV-202 | todo |
| [JUV-204](epics/identity-platform.md#juv-204) | M1 | Implement BFF sessions, rotation and CSRF protection | JUV-203 | todo |
| [JUV-205](epics/identity-platform.md#juv-205) | M1 | Implement authorization and resource isolation | JUV-204 | todo |
| [JUV-206](epics/identity-platform.md#juv-206) | M1 | Log actions and limit abuse | JUV-205 | todo |
| [JUV-207](epics/identity-platform.md#juv-207) | M1 | Build account and recovery screens | JUV-204, JUV-104, JUV-107 | todo |
| [JUV-208](epics/learning-editorial.md#juv-208) | M1 | Import catalogue and public versions into the database | JUV-201, JUV-102, JUV-205 | todo |
| [JUV-209](epics/learning-editorial.md#juv-209) | M1 | Create learner area and synchronized progress | JUV-207, JUV-208 | todo |
| [JUV-210](epics/learning-editorial.md#juv-210) | M1 | Create course drafts and level management | JUV-205, JUV-208 | todo |
| [JUV-211](epics/learning-editorial.md#juv-211) | M1 | Implement review, publication and archiving | JUV-210 | todo |
| [JUV-212](epics/learning-editorial.md#juv-212) | M1 | Manage private media and controlled uploads | JUV-205, JUV-206 | todo |
| [JUV-213](epics/learning-editorial.md#juv-213) | M1 | Version exercises, criteria and rubrics | JUV-211 | todo |
| [JUV-214](epics/learning-editorial.md#juv-214) | M1 | Submit and resume an exercise | JUV-213, JUV-212, JUV-209 | todo |
| [JUV-215](epics/learning-editorial.md#juv-215) | M1 | Review work and request revision | JUV-214, JUV-205 | todo |
| [JUV-216](epics/learning-editorial.md#juv-216) | M1 | Present a course in presentation mode | JUV-211, JUV-108 | todo |
| [JUV-217](epics/identity-platform.md#juv-217) | M1 | Create support and notification inbox | JUV-206, JUV-207 | todo |
| [JUV-218](epics/identity-platform.md#juv-218) | M1 | Handle deletion, export and retention | JUV-209, JUV-217 | todo |
| [JUV-219](epics/identity-platform.md#juv-219) | M1 | Back up and restore database and files | JUV-212, JUV-218 | todo |
| [JUV-220](epics/identity-platform.md#juv-220) | M1 | Test account security and accessibility | JUV-206, JUV-207, JUV-215, JUV-216, JUV-217, JUV-218 | todo |
| [JUV-221](epics/identity-platform.md#juv-221) | M1 | Measure free-backend load and cost | JUV-220, JUV-202 | todo |
| [JUV-222](epics/identity-platform.md#juv-222) | M1 | Configure environments, secrets and alerts | JUV-219, JUV-221 | todo |
| [JUV-223](epics/identity-platform.md#juv-223) | M1 | Deliver the free pilot with accounts | JUV-222, JUV-220, JUV-203 | todo |
| [JUV-301](epics/commerce.md#juv-301) | M2 | Formalize commercial policies and operators | JUV-223 | todo |
| [JUV-302](epics/commerce.md#juv-302) | M2 | Model versioned offers and distinct entitlements | JUV-301, JUV-208 | todo |
| [JUV-303](epics/commerce.md#juv-303) | M2 | Create idempotent orders and expiry | JUV-302, JUV-206 | todo |
| [JUV-304](epics/commerce.md#juv-304) | M2 | Upload and review payment evidence | JUV-303, JUV-212 | todo |
| [JUV-305](epics/commerce.md#juv-305) | M2 | Record transactions and allocations | JUV-303 | todo |
| [JUV-306](epics/commerce.md#juv-306) | M2 | Build independent reconciliation and dual approval | JUV-305, JUV-304, JUV-205 | todo |
| [JUV-307](epics/commerce.md#juv-307) | M2 | Activate entitlements in the financial transaction | JUV-306, JUV-302 | todo |
| [JUV-308](epics/commerce.md#juv-308) | M2 | Deliver outbox, retries and idempotent notifications | JUV-307, JUV-217 | todo |
| [JUV-309](epics/commerce.md#juv-309) | M2 | Handle discrepancies, delays, disputes and refunds | JUV-308, JUV-301 | todo |
| [JUV-310](epics/scheduling.md#juv-310) | M2 | Open schedule and resources | JUV-302, JUV-205 | todo |
| [JUV-311](epics/scheduling.md#juv-311) | M2 | Atomically book a seat in Mode A | JUV-310, JUV-307, JUV-308 | todo |
| [JUV-312](epics/scheduling.md#juv-312) | M2 | Build the learner booking journey | JUV-311, JUV-303 | todo |
| [JUV-313](epics/scheduling.md#juv-313) | M2 | Handle rescheduling, cancellations, absence and replacement | JUV-312, JUV-309, JUV-301 | todo |
| [JUV-314](epics/scheduling.md#juv-314) | M2 | Send reminders and track assignment deadlines | JUV-313, JUV-308 | todo |
| [JUV-315](epics/invoicing.md#juv-315) | M2 | Define invoices, credit notes and numbering rules | JUV-301, JUV-305 | todo |
| [JUV-316](epics/invoicing.md#juv-316) | M2 | Issue an immutable invoice with an atomic number | JUV-315, JUV-306, JUV-308 | todo |
| [JUV-317](epics/invoicing.md#juv-317) | M2 | Generate private PDF and print preview | JUV-316, JUV-212 | todo |
| [JUV-318](epics/invoicing.md#juv-318) | M2 | Issue credit notes and check accounting reconciliation | JUV-317, JUV-309 | todo |
| [JUV-319](epics/organizations.md#juv-319) | M2 | Create organizations, memberships and cohorts | JUV-205, JUV-302 | todo |
| [JUV-320](epics/organizations.md#juv-320) | M2 | Allocate seats and expiring invitations | JUV-319, JUV-307 | todo |
| [JUV-321](epics/organizations.md#juv-321) | M2 | Display authorized B2B progress | JUV-320, JUV-215, JUV-301 | todo |
| [JUV-322](epics/learning-editorial.md#juv-322) | M2 | Produce the first complete paid C1 course | JUV-213, JUV-301 | todo |
| [JUV-323](epics/learning-editorial.md#juv-323) | M2 | Issue a certificate based on competencies | JUV-322, JUV-215, JUV-317 | todo |
| [JUV-324](epics/pilot-operations.md#juv-324) | M2 | Manage sensitive permissions and separation of duties | JUV-306, JUV-318, JUV-320 | todo |
| [JUV-325](epics/pilot-operations.md#juv-325) | M2 | Finalize operations, retention and applicable compliance | JUV-318, JUV-321, JUV-218, JUV-301 | todo |
| [JUV-326](epics/pilot-operations.md#juv-326) | M2 | Run concurrent finance and booking acceptance tests | JUV-314, JUV-318, JUV-324 | todo |
| [JUV-327](epics/pilot-operations.md#juv-327) | M2 | Test privacy, accessibility and private cache | JUV-321, JUV-323, JUV-324, JUV-325 | todo |
| [JUV-328](epics/pilot-operations.md#juv-328) | M2 | Test pilot restoration, load and budget | JUV-326, JUV-327, JUV-219 | todo |
| [JUV-329](epics/pilot-operations.md#juv-329) | M2 | Launch and observe the commercial pilot | JUV-328, JUV-325, JUV-322 | todo |
| [JUV-401](epics/extensions.md#juv-401) | P1 | Define forum moderation and scopes | JUV-329 | todo |
| [JUV-402](epics/extensions.md#juv-402) | P1 | Build isolated forums and authorized search | JUV-401 | todo |
| [JUV-403](epics/extensions.md#juv-403) | P1 | Import safe, structured AI drafts | JUV-329, JUV-211, JUV-212 | todo |
| [JUV-404](epics/extensions.md#juv-404) | P1 | Deliver interface and first course in English | JUV-329, JUV-107 | todo |
| [JUV-405](epics/extensions.md#juv-405) | P1 | Add alternative authentication and account linking | JUV-329, JUV-204 | todo |
| [JUV-406](epics/extensions.md#juv-406) | P1 | Add consented push notifications | JUV-329, JUV-308, JUV-112 | todo |
| [JUV-407](epics/extensions.md#juv-407) | P1 | Improve search and explainable recommendations | JUV-329 | todo |
| [JUV-408](epics/extensions.md#juv-408) | P1 | Create a portfolio of evidence with controlled sharing | JUV-329, JUV-323 | todo |
| [JUV-501](epics/growth.md#juv-501) | P2 | Validate then implement Mode B options | JUV-329 | todo |
| [JUV-502](epics/growth.md#juv-502) | P2 | Integrate PSP and verified webhooks | JUV-329 | todo |
| [JUV-503](epics/growth.md#juv-503) | P2 | Define and deliver payment schedules | JUV-502 | todo |
| [JUV-504](epics/growth.md#juv-504) | P2 | Study and secure offline private content | JUV-329, JUV-112 | todo |
| [JUV-505](epics/growth.md#juv-505) | P2 | Size media and real-time services from measurements | JUV-329 | todo |
| [JUV-506](epics/growth.md#juv-506) | P2 | Test scaling and possible service separation | JUV-505 | todo |

## Tracking

[Traceability](TRACEABILITY.md) · [Roadmap](../delivery/ROADMAP.md) · [Contribution](../../CONTRIBUTING.md).
