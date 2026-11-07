# Operations, incidents and recovery

## Roles to appoint before real service

Product (go/no-go), technical (deployment/incident), education (content/reviews), finance entry, finance approval and support. The two finance roles require distinct people. The integration coordinator maintains STATUS and the shipped version.

## Release control

RELEASE record, commit and build, applicable decisions, tested migration, per-environment configuration, stored secrets, backup for private data, smoke tests and available owner. After delivery: open a course, check allowed/denied access, send feedback, inspect errors and quotas; in M2 check reminders, pending reconciliation and outbox queue state.

## Incident

1. Classify impact: outage, disclosure, finance, overbooking or content. Appoint an owner and record UTC time/Douala context.
2. Contain through a server feature flag or targeted maintenance; do not hide a real payment or arbitrarily change state.
3. Preserve minimized traces and correlation; do not copy private documents into public tickets.
4. Roll back to a compatible build if code is faulty; DB migrations require a forward fix or controlled restoration with known consequences.
5. Verify entitlements, data and outbox recovery; inform affected people through an approved channel.
6. Brief report: cause, impact, resolution, prevention and ticket. Any regulatory notifications belong to the authorized owner.

## M1/M2 backups

- Define frequency and RPO/RTO with the project owner; use measured values, never intuitive guarantees.
- Back up PostgreSQL and private objects separately, encrypt and restrict access; include schema, versions and file inventory.
- Do not store dumps, keys or documents in git. Keep a timestamped manifest and evidence of checks.
- Restore in an isolated environment; check accounts, RLS, one course, one submission and related files. In M2 add transactions, invoices and bookings.
- Do not blindly replay a restored outbox: compare already emitted effects, idempotency and external reconciliation.

## Pilot alerts (targets to calibrate)

Any overbooking or financial self-approval: immediate incident. Verification beyond the approved deadline: finance/support. 5xx >2% over 5 minutes with ≥100 requests: technical. Booking p95 >1.5 s over 10 minutes with ≥50 requests: technical. Quota ≥70%: preventive action. Every alert must actually be sent and received during acceptance testing.

## Tracked risks

| Risk | Signal | Response / owner |
| --- | --- | --- |
| Course not ready | Lessons without reviewer/solution | Reduce course count, preserve completeness; education |
| Lost context | Active task without handoff | STATUS + ticket + session; integration |
| Free plan saturated/paused | Quota or outage | Limit load, restore, decide budget; operations |
| Emails not delivered | Missing tester verification | Close public registration, configure SMTP; operations |
| Scope drift | M0 receives commercial features | ADR and replanning; product |
| Private data disclosed | Failed IDOR/cache test | Block release and fix; security |
| Finance without second operator | Queue waiting without checker | No activation; management/finance |
| Runtime mismatch | CPU/transaction spike fails | Adapt runtime through ADR; technical |

## Intermittent maintenance

Before restarting after a pause: supported runtime versions, exploitable vulnerabilities, quotas/paused projects, certificate and secret state, applied migrations, support capacity. Update evidence and source dates if providers have changed.
