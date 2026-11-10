# JUV-111 — Help, privacy and feedback

Owner: Codex. Branch: `feat/JUV-111-help-privacy-feedback`. Date: 2026-11-07.
Status: implementation prepared; blocked on a real support channel and hosting details.

`/help`, `/privacy` and `/feedback` are statically rendered and linked in the public footer. French copy lives in the shared catalogue. Help explains the actual unpublished/published course boundary, practice and optional resume. The notice describes the exact local record, no automatic expiry, targeted erasure and its failure fallback; exercise text is ephemeral. Hosting requests are distinguished from local storage. No provider, location or log retention is invented.

The feedback page gives a minimal optional problem description and forbids sensitive documents. It explicitly reports that no channel is configured; there is no fake form, address or delivery confirmation. A real address/URL, reception test, operator and feedback retention policy are required before completion. Hosting operator, processing locations and log retention also need confirmation before release (DEC-10).

Full verify passed (87 tests) and all three Chrome support scenarios passed; see the [session handoff](../sessions/2026-11-07-help-privacy-feedback.md). No support message has been sent or received; no production hosting or independent privacy/legal review has been verified. Author review checks copy against ADR-012 and the actual storage implementation; it is not a legal compliance certification.

## Email support decision — 2026-11-10

The owner selected email support, superseding the external form; the [owner action guide](../operations/OWNER-ACTIONS.md) defines the pending setup. JUV-111 was reassigned to Codex on `feat/JUV-111-email-support` and remains blocked. No address, reception/reply evidence or provider/hosting facts were supplied. This documentation decision does not change the product interface or establish a working contact channel. Current-session checks are recorded in the [handoff](../sessions/2026-11-10-email-support.md).
