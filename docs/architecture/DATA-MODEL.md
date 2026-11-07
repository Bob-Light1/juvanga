# Data model and invariants

Target model, not an already applied schema. UUID, UTC `timestamptz`, nonnegative integer XAF amounts (`bigint` with a safe bound in the JSON contract), optimistic versioning for mutable objects, organization IDs in relevant keys and constraints.

| Module | Entities and relationships | Essential constraints |
| --- | --- | --- |
| Identity | AuthUser 1:1 Profile; User 1:N Session; scoped RoleGrant | Normalized email, revocable sessions; administrative roles outside user-editable metadata |
| Catalogue | Domain → Level → Course → CourseVersion → Module → Lesson → Block | Integer Level ≥0; immutable PUBLISHED; archiving retains existing entitlements |
| Learning | ExerciseVersion → RubricVersion; Enrollment; Submission → Review; CompetencyEvidence | Submission freezes exercise/rubric; critical criteria block milestone; reading separate |
| Commerce | OfferVersion; Order → OrderLine; Evidence; PaymentTransaction → Allocation; Entitlement | Frozen price, unique external reference per operator/account, exact allocations, access tied to beneficiary |
| Scheduling | Session; Slot; Booking; ResourceAssignment; Fulfillment | Transactional capacity; resource time exclusions; distinct session credits |
| Finance | Invoice → InvoiceLine; CreditNote; FinancialResolution | Unique atomic number; immutable issued document; corrections through credit notes |
| B2B | Organization → Membership, Cohort; SeatAllocation → Enrollment | Unique active memberships; expiring invitations; one active seat per beneficiary/allocation |
| Operations | SupportCase; Notification; AuditEvent; OutboxEvent; IdempotencyRecord | Events without raw documents; replay without duplicate effects; protected log |

## Canonical states

- CourseVersion: DRAFT → REVIEW → PUBLISHED → ARCHIVED. Published change = new version.
- Submission: DRAFT → SUBMITTED → IN_REVIEW → PASS / REWORK / REJECTED. Revision tied to the same cycle/rubric; appeal recorded separately.
- Order: DRAFT → AWAITING_PAYMENT → PAID; EXPIRED/CANCELLED. Disputes follow a separate resolution.
- Evidence: UPLOADED → PENDING_REVIEW → ACCEPTED/REJECTED. ACCEPTED concerns the document, not receipt of funds.
- PaymentTransaction: PROPOSED → RECONCILED → CONFIRMED/REJECTED; REVERSED through a controlled procedure.
- Entitlement: PENDING → ACTIVE → SUSPENDED/EXPIRED/REVOKED.
- Booking: REQUESTED → CONFIRMED → ATTENDED → COMPLETED; CANCELLED/NO_SHOW. Attendance ≠ completion.
- Fulfillment: NOT_STARTED → AWAITING_SLOT → SCHEDULED → DELIVERED/DISPUTED.

The financial procedure's documentary `PENDING_APPROVAL` state is represented by an unconfirmed RECONCILED transaction; do not invent a competing status in code. A transition table per command will be implemented in M2.

## Concurrent booking

Lock the slot and usable credit in a stable order; verify entitlement, schedule, capacity and resources; insert booking and credit consumption; write outbox; commit. Define exclusions for `[start,end)` intervals including preparation/travel. Only one request wins the last seat; the other receives 409. Cancellation restores credit at most once under the approved policy.

## Financial confirmation

Verify maker differs from checker, MFA and current permissions, independent source, reference uniqueness, state and allocations. Lock transaction/order, confirm, activate eligible entitlements and write outbox in the same commit. Any error rolls everything back. Late transfer/discrepancy: resolution, no silent activation.

## Isolation and retention

Deny-by-default RLS on exposed tables; test visitor/user A/user B/trainer/coordinator/finance. Coordinators see authorized aggregates, not a filterable grade table. Account deletion, anonymization and financial retention are separate operations. Decide exact retention by category before real use.

## M0 → M1

M0 implements the [public JSON content contract](PUBLIC-CONTENT.md), with the versioning and migration rules in [ADR-006](decisions/006-public-content.md). Public stable IDs are preserved alongside M1 database UUIDs.

Each public course/lesson/exercise has a stable ID and content version. Initial import retains these IDs. Local reading progress may be offered for import after login and consent; it never becomes competence evidence. Require idempotency and confirmation before merging. No private files in static content.
