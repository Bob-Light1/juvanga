---
name: juv-close
description: Close a Juvanga work session with verified evidence and a concise handoff.
argument-hint: "[JUV-xxx]"
disable-model-invocation: true
---

Close the session for ticket `$ARGUMENTS`.

1. Review `git status --short` and `git diff --stat`.
2. On Node 24, run `npm run verify` and the tests the ticket requires. Keep full logs in the scratchpad.
3. Update the ticket in `docs/backlog/backlog.json` (status, owner, branch, date, evidence, blocker), then run `npm run backlog:generate`. Use `done` only when its criteria, evidence and required review are satisfied.
4. Update `docs/STATUS.md` (under 700 words) and record any new decision where it belongs.
5. Add a short handoff from `docs/templates/SESSION.md`: result, commands actually run, files or commit, limits, next command.
6. Run `npm run check:docs`.
7. Reply in French with the outcome, checks not run and the next action.

Do not commit, push or deploy unless the owner asks.
