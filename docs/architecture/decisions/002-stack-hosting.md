# ADR-002 — incremental, portable stack

Date: 2026-11-06. Status: adopted.

React + TypeScript + Vite, CSS tokens, Motion, npm workspaces. M0: Cloudflare Pages, static/prerendered output. M1: Hono on Cloudflare Workers Static Assets, same-origin API and frontend, PostgreSQL/Auth/Storage at Supabase. Business logic remains modular in one repository; strong PostgreSQL transactions, no microservice per domain.

Alternatives: full-stack Next.js would add runtime/deployment constraints before a demonstrated need; a dedicated VM/Node backend is possible but requires more operations for a free pilot; a browser-only backend complicates enforcement of invariants.

Limitations: Workers Free has CPU/request quotas; avoid heavy PDF computation and local server hashing. M2 PDFs use lightweight deterministic rendering and measured load, otherwise budget a dedicated worker adapter. Supabase Free may pause, lacks paid-plan backups and requires external SMTP for public email. Do not promise an SLA or unlimited free usage.

Portability: versioned SQL, provider-SDK-free domain, adapters, DB and file exports. Pages → Worker migration in JUV-202/JUV-223, preserving links where possible; the provider domain may change without a purchased custom domain. Adjust CSP/connect-src to the actual origin, no wildcard.

V1.3 deviation: implements the modular monolith on an edge runtime and managed services. Before M1, prove auth/cookies, transactional RPC and CPU budget in a spike; if unsuitable, replace with a Node runtime through a superseding ADR, preserving invariants.
