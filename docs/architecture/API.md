# API contracts — implementation target

This document defines boundaries; JUV-202 produces and validates OpenAPI before M1 integration. No business route is available yet.

## Conventions

`/v1` prefix, JSON, UUID IDs, ISO 8601 UTC, integer XAF. HttpOnly session, Origin verification and CSRF token for mutations. Bounded cursor pagination. Error `{error:{code,message,correlationId,retryable}}`, without stack/PII. 400 format, 401 session, 403 permission, 404 hidden resource, 409 conflict, 422 validation, 429 quota, 503 unavailable.

Idempotency-Key for order creation, booking, confirmation and issuance; bind the key to actor/action and payload hash. Same key/body = same result; different body = 409. Proposed response retention: 72 hours; permanent financial deduplication subject to applicable retention. `If-Match` for mutable editing/submissions, with explicit version conflicts.

| Route | Main input | Output / control |
| --- | --- | --- |
| POST /auth/register, /login, /logout | Validated credentials / CSRF | Safe session; neutral messages |
| POST /auth/password-reset | Email | Neutral response, abuse prevention |
| GET /me | Session | Minimal profile and server capabilities |
| GET /courses, /courses/:id | Bounded filters | Visible publications only |
| GET /course-versions/:id/lessons/:lessonId | Session if private | Rechecked entitlements; no drafts |
| PUT /progress/:lessonId | Version, reading | Beneficiary progress, no competence granted |
| POST /exercises/:id/submissions | Exercise/rubric/deliverable | Retained version, authorization and If-Match |
| POST /submissions/:id/reviews | Rubric/result/comment | Assigned trainer; audit |
| POST /admin/course-versions/:id/publish | Reviewed version | Authorized publication, immutability |
| POST /orders | OfferVersion, beneficiary | Price/mode/date snapshot and ID; never client price |
| POST /payment-evidences | Order, authorized upload | PENDING_REVIEW; no access granted |
| POST /admin/reconciliations | Source, reference, receipt, allocations | PROPOSED and authenticated actor |
| POST /admin/reconciliations/:id/confirm | Version/idempotency | Distinct checker, MFA, transaction + entitlements + outbox |
| GET /availability | Offer, interval, timezone | Indicative availability without a hold |
| POST /bookings | Entitlement, slot, seat count | Confirmed 201 or atomic 409 |
| POST /bookings/:id/cancel | Reason and version | Policy applied, credit and capacity at most once |
| POST /admin/invoices/:id/issue | Draft version | Frozen number/PDF; dedicated permission |
| POST /organizations/:id/invitations | Beneficiary/seat | Authorized coordinator, bounded-use token |
| POST /support-cases | Category/bounded text | Ticket and owner; no public financial document |

## Storage and notifications

Obtain an upload token after authorization, verify actual type/size/quotas and quarantine the upload. Notifications contain only a minimal message and a link to the account. `/events` SSE is deferred; bounded polling is sufficient initially.

## Contracts to test

Evidence without reconciliation grants no entitlement. Calling an RPC directly does not bypass roles. User B requesting user A's resource receives neither content nor metadata. Reusing an idempotency key after a retry creates no extra seat, invoice or receipt.
