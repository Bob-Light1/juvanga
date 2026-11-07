# ADR-012 — Consented local reading position

- Date: 2026-11-07
- Status: adopted for JUV-110.

## Context and decision

M0 may offer local resume on a personal device without accounts, synchronization or deliverable retention. Reading must continue if storage is refused, denied, full, malformed or from an incompatible format. Progress is a reading location, not completion or competency evidence.

Share the canonical content-ID rules between the editorial Zod schema and a small strict progress type guard; the latter also uses the existing UTC validator. This avoids shipping editorial validators solely to read a small local record.

Use one namespaced localStorage key, `juvanga.reading-progress`, accessed through a small validated store and React's native external-store hook. The durable envelope has schemaVersion 1, explicit `consent: true` and either no reading yet or one latest reading position. The reading contains only course ID/version, lesson ID, a bounded approximate scroll position (0–1000) and an ISO UTC update timestamp. Strict validation rejects extra fields, including attempted deliverables or self-assessment selections. Never use URLs or browser form fields to serialize a response.

Read only that key to discover previously recorded consent. No test writes, consent cookie, anonymous identifier or progress writes occur before the learner explicitly enables storage. Refusal is held only in memory. Enabling stores the known empty envelope, then the current reading view may save its position. Only reader routes track; exercises never enter this store. Save debounced scroll updates and flush the last known location on navigation/pagehide. Restore a matching current lesson's approximate location after fonts/layout are ready. Do not redirect a visitor away from an explicitly opened route.

Add a noindex `/progress` page and navigation link. It explains device/browser limits, lack of synchronization/offline guarantee, optional storage and erasure. Resume targets the exact retained published course version/lesson, never silently substitutes a newer version. Unknown content versions remain visible as unavailable and can be erased. Format timestamps with the shared Douala Intl helper.

Erase only the namespaced key and stop tracking. Do not clear unrelated application data. A failed remove operation explicitly says erasure could not be confirmed and offers retry; never claim success on a storage exception. Invalid/future envelopes are not automatically deleted, overwritten, migrated or used for consent. A user may erase them explicitly. Cross-tab storage events refresh consent, and each save rechecks the durable consent before writing so pending updates do not normally recreate an erased record.

## Alternatives and consequences

Cookies, a backend and account synchronization introduce infrastructure and data handling outside M0. IndexedDB is unnecessary for one small record. A dependency or framework adds no value over native storage/React. An initial build importing the editorial Zod schema grew the default JavaScript from about 431 kB to 532 kB; use the strict lightweight allowlist guard instead, retaining shared ID/UTC validation and negative fixtures. Persisting every visited lesson or completion percentage would collect more history and could be confused with achievement; keep a single last reading location. Storing refusal would itself require persistence before opt-in, so it resets on a fresh page load. Approximate scroll restoration may differ after viewport/media layout changes; display no completion percentage or grade.

## Migration, rollback and verification

This is the first local-progress format. Unknown schema versions fail closed and need explicit erasure; no implicit migration. Published content/rubrics stay unchanged. M1 imports require separate consent and an explicit idempotent conversion (ADR-006); do not infer competence from these records. Reverting the feature disables reads/writes; existing local records can be erased in the browser or by the restored erasure UI before rollback.

Unit tests cover allowlist serialization, refusal, denied reads/writes/removal, malformed/future envelopes, erasure and consent rechecks. Browser tests cover real opt-in/refusal, scroll/reload, exact-version resume, incompatible/missing versions, corrupt/blocked/quota storage, cross-tab erasure, unrelated key preservation and no exercise retention. Static HTML and hydration share a neutral initial state. [Validation](../../delivery/VALIDATION-JUV-110.md).
