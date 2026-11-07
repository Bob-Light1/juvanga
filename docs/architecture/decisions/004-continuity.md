# ADR-004 — progressive documentation reading

Date: 2026-11-06. Status: adopted.

Context: multiple developers, discontinuous sessions and token efficiency. Decision: versioned files accessible from any IDE, without dependence on private assistant memory. Short STATUS and AGENTS, canonical JSON tickets with generated views, targeted ADRs and handoffs.

Alternatives: keeping everything in chat loses traceability; a huge master document is expensive to reread; SaaS-only tooling requires an account. GitHub Issues may serve as discussions/links without duplicating canonical status. Tracker migration must be explicit.

Checks: unique IDs, existing/acyclic dependencies, criteria and evidence, consistent milestones, local links. `context` and `task` avoid global reading. Session close: one concise handoff and updated STATUS. No automatic summary replaces a test or signed decision.

Language policy update, 2026-11-06 (DEC-14, JUV-007): all maintained documentation, code, identifiers and code comments are in English. Preserve original source archives and provide English text companions. The initial product interface remains in French. This changes the documentation language without changing the continuity workflow.
