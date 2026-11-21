# Juvanga — Claude Code entry point

@AGENTS.md

`AGENTS.md` is the contract shared with Codex and takes precedence over this file. This file adds stable orientation and a low-token reading path. Never copy live state here: it belongs in `docs/STATUS.md`.

## Project in brief

Juvanga is a French-first, mobile-first platform for practical training. A learner completes a useful task against clear criteria, then can move on to human review, guided sessions and organization cohorts. First market: Cameroon (XAF, `Africa/Douala`). First topics: LLMs and office productivity, then websites and web applications.

Delivery is incremental. Each stage must prove value before the next one:

- **F0:** foundations.
- **M0:** free, anonymous, static course with local-only optional progress.
- **M1:** accounts, server progress, submissions and human reviews.
- **M2:** commercial pilot with verified external payments, entitlements, bookings, invoices and minimal B2B.
- **P1/P2:** extensions, only after observed demand.

Stack: React, strict TypeScript, Vite, Motion and CSS tokens on Cloudflare Pages (M0). Planned for M1: Hono on Workers and Supabase PostgreSQL/Auth/Storage behind a same-origin API.

## Start cheaply

1. Run `npm run --silent context` (STATUS plus ready tasks). Do not also read STATUS.
2. If a ticket is in scope, run `npm run --silent task -- JUV-xxx`.
3. Open only the row below that matches the work. Stop reading once you can act.

| Work | Read |
| --- | --- |
| Product or scope | `docs/product/BRIEF.md`, `SCOPE.md` |
| Human decision | `docs/product/DECISIONS.md`, `docs/operations/OWNER-ACTIONS.md` |
| Architecture | `docs/architecture/ARCHITECTURE.md`, then the one relevant ADR |
| Data, API, security | `docs/architecture/{DATA-MODEL,API,SECURITY}.md` |
| Course content | `docs/architecture/PUBLIC-CONTENT.md`, `docs/product/FREE-COURSE.md` |
| UI and brand | `docs/design/{UX,COMPONENTS,BRAND,MOTION}.md` |
| Release or hosting | `docs/operations/M0-RELEASE.md` (search the heading first) |
| Original requirements | `rg '^## ' docs/first_docs/en/functional-technical-design-v1.3.md`, then that section |

Path-scoped guidance loads automatically from `.claude/rules/`. `/juv-start` and `/juv-close` run the session routines.

## Token discipline

- Never read whole: `docs/backlog/backlog.json`, `package-lock.json`, the V1.3 design, PDFs, `docs/logo_choice/`.
- Query the backlog with `npm run task` or `npm run next`.
- Read only the latest handoff linked from STATUS, and only when the current ticket needs it.
- Open a `VALIDATION-*` file only for its own ticket.
- Send long command output to the scratchpad and show the tail or failures.
- Do not delegate to subagents unless the owner asks.

## Traps

- Node 24 is required. On Node 20, `check:course` crashes with `ERR_UNKNOWN_FILE_EXTENSION`; this is a runtime mismatch, not a code bug.
- Browser suites share the build output. Never run `test:e2e` and `test:reader` concurrently.
- `Wewigo` and `Furakili` in source archives are earlier or rejected names. The product is Juvanga.
- `check:docs` validates relative links in every Markdown file, including `.claude/`.

## Coexistence with Codex

Codex (ChatGPT) has worked on this repository and remains a valid contributor. Preserve `AGENTS.md`, its history, session handoffs and anything under `~/.codex/`. A ticket owned by Codex is not yours until the owner confirms it and the reassignment is recorded in the backlog.

Talk to the owner in French. Everything written to the repository stays in English, except French product copy in the i18n catalogue.
