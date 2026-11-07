# ADR-007 — native accessible course components

- Date: 2026-11-07.
- Status: adopted for JUV-104.
- Owner: Codex.

## Context and constraint

M0 needs consistent actions, fields, cards, notices and navigation before public pages and the reader. The existing React/Vite workshop and shared CSS tokens are the foundation. Keyboard operation, explicit field errors, 44 px touch targets and reflow must be demonstrable without publishing editorial drafts.

## Decision

Keep a small local React component module, [ui.tsx](../../../apps/web/src/components/ui.tsx), based on native buttons, anchors, inputs, landmarks and lists. Native semantics handle keyboard behavior; component contracts associate field labels, hints and errors. A busy button stays focusable with `aria-disabled` and cancels activation; actual unavailable buttons use native `disabled`. Callers must also guard form submission while busy. Use status regions for routine feedback and alerts for errors; no automatic focus movement on asynchronous success.

Styles consume [canonical tokens](../../../packages/design/tokens.css). State information includes words and structural cues, rather than relying on color. Demonstrate the components in the current workshop with clearly labelled, local-only interactions. No new route, provider, framework, content publication or persistence is introduced.

Components accept French copy as props. New workshop text belongs in a small [French catalogue](../../../apps/web/src/i18n/fr.ts); JUV-107 will extend it, migrate existing workshop literals and define formatting/fallback rules. This is not a complete localization system.

## Alternatives and consequences

- Copy markup into each future page: initially simple, but duplicates keyboard, error association and state styling; rejected.
- Add a component framework or headless UI dependency: unnecessary for these native controls and conflicts with avoiding convenience frameworks; deferred until a concrete interaction needs it.
- Build public course pages now: would mix JUV-106/JUV-108 into this ticket and risk publishing an unapproved release; deferred.

The components are deliberately small. Routing, data fetching, server authorization, progress storage and offline caching remain owned by later tickets. The workshop's access-denied/offline messages are simulations, not implementations of those capabilities. Automated axe checks do not establish full screen-reader compatibility.

## Migration and rollback

Replace existing action markup with `Button` or `ActionLink`; future pages consume the same module and catalogue. Navigation callers provide the current page/location explicitly. Forms supply business validation and submit guards. JUV-107 expands the catalogue without changing published course documents. Reverting JUV-104 restores the prior workshop; no data or schema migration is needed. There is no deviation from the V1.3 dossier.

## Validation and related work

See [component contracts and states](../../design/COMPONENTS.md) and [JUV-104 validation](../../delivery/VALIDATION-JUV-104.md). JUV-105 integrates fonts; JUV-106 public pages; JUV-107 localization; JUV-108 the reader. Browser QA covers keyboard, axe, 360 px and desktop zoom/reflow; actual results and limitations belong in the validation record.
