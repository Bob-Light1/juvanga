---
name: juv-start
description: Resume Juvanga work with the minimum context for one ticket.
argument-hint: "[JUV-xxx]"
disable-model-invocation: true
---

Resume work on ticket `$ARGUMENTS` (if empty, identify the candidates).

1. Run `git status --short --branch`, `node -v` and `npm run --silent context`.
2. If a ticket is given, run `npm run --silent task -- $ARGUMENTS`. Read only the references needed for its next step.
3. Check that its dependencies are done, and compare its owner and branch with the current state. If another owner holds it, ask the project owner before editing.
4. Reply in French in at most eight lines: current state, blocker, next action, and what only the owner can do.

Do not edit files during this routine.
