---
paths:
  - "docs/**"
  - "AGENTS.md"
  - "CONTRIBUTING.md"
---

# Project documentation work

- `docs/backlog/backlog.json` is canonical. Edit it, then run `npm run backlog:generate`. Never edit generated Markdown or CSV views.
- Keep `docs/STATUS.md` under 700 words, with live state and a link to the latest handoff only.
- Supersede decisions and ADRs with a dated entry. Do not rewrite history.
- PDFs in `docs/first_docs/` and proposals in `docs/logo_choice/` are preserved archives.
- Record only what was observed. A plan, screenshot or owner statement must be labeled as what it is.
- Handoffs use `docs/templates/SESSION.md` and stay concise.
