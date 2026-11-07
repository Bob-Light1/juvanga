# Contributing and handing off

## Task lifecycle

1. Run `git status --short`, `npm run context`, `npm run next`.
2. Claim the ticket in `backlog.json`: `status: in_progress`, `owner`, `branch`, `updated_at`. Confirm dependencies and criteria; a missing subtask gets a new ID, never a recycled one.
3. Create a short-lived branch. Define contracts before two people work on client and API. Assign migrations to one person at a time.
4. Implement the smallest verifiable slice. Business rule and security tests are mandatory; avoid tests that merely duplicate the implementation.
5. Run `npm run backlog:generate`, `npm run verify` and targeted tests. Link the PR to the ticket, with evidence and limitations. Require additional review for auth, finance, SQL and cross-organization access.
6. Move to `in_review`, then `done` after applicable criteria and review; fill in `evidence`. Update STATUS and hand off.

## Language

Write all project documentation, code, identifiers and code comments in English. This applies to inline comments, block comments and documentation comments, including comments in configuration examples. Keep archived source documents intact and provide English companion translations. The product interface launches in French; put product copy in the i18n catalogue planned by JUV-107. French product copy quoted as an example must be clearly identified.

## States

`todo` → `in_progress` → `in_review` → `done`. `blocked` requires a reason and next action in `blocker`. Dependencies determine ready tasks; readiness is not an editable status. A deferred task remains `todo` in its future milestone.

## Teamwork

- One person owns weekly integration, schema conflicts and releases; record their name in STATUS.
- Branch names: `feat/JUV-xxx-*`, `fix/JUV-xxx-*`, `docs/JUV-xxx-*`.
- Commits: `feat(learning): JUV-xxx ...`. Do not automatically commit secrets, private media or real data.
- Reserve shared files (lockfile, API contract, migrations, tokens) in the ticket. Generate the lockfile with the agreed npm version.
- Keep `main` runnable. Configure branch protection and a review requirement on the remote repository once created; local templates do not enable them.
- Author = delivery owner; reviewer = a different person for sensitive changes. The project owner appoints business roles.

## Resuming after several weeks

Read STATUS, the latest linked handoff, then the relevant ADRs and ticket. Check runtime versions, expired secrets, provider quotas and migrations before restarting. A previous plan is not evidence of execution.

## Session close (five minutes)

Use `docs/templates/SESSION.md`. Record result, commands actually run, files/commit, new decisions, blockers and next command. Keep only current state and a handoff link in STATUS. Any new customer commitment must appear in DECISIONS, not only in a conversation.

## Definition of done

Ticket criteria met; errors and empty states handled; applicable accessibility verified; server security tested; no known blocking regression; consistent documentation/contracts; identifiable evidence; dependencies completed. A mockup or simulation is not a successful integration.
