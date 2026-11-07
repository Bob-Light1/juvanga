# Accessible course components

JUV-104; [ADR-007](../architecture/decisions/007-accessible-components.md). Implementation: [ui.tsx](../../apps/web/src/components/ui.tsx). Interactive review: the current workshop, section 03 (`/workshop#components`). New French copy: [catalogue](../../apps/web/src/i18n/fr.ts).

## Contracts

| Component | Contract |
| --- | --- |
| `Button` | Native button, default `type="button"`; explicit `type="submit"` for forms. Primary/secondary variants. Busy state preserves focus, exposes `aria-busy`/`aria-disabled` and suppresses clicks, including keyboard activation. The caller supplies a loading label and guards form submission. Native `disabled` is reserved for unavailable actions, with a visible explanation nearby. |
| `ActionLink` | Native anchor with required `href`; use for navigation, not actions. JUV-106 adds opt-in `internal` React Router links, retaining native anchor behavior without JavaScript. Same action styles and minimum target size. |
| `TextField` | Visible `label`, stable generated or supplied ID, optional hint/error, composed `aria-describedby`, and `aria-invalid` on error. Native input props/ref pass through. Caller supplies required wording, validation and focus behavior. No placeholder-only labels. |
| `CourseCard` | Named article with heading, explicit badge/meta, description and one navigation action. JUV-106 adds an optional `internal` action flag. Current heading level is h3; place under an h2. Never nest interactive controls inside a clickable card. |
| `Alert` | Title and optional body; info/success/warning/error have explicit text and a decorative symbol. Status region for routine updates; assertive alert for errors. Keep a live region mounted before updating its text where possible. |
| `CourseNavigation` | Named navigation landmark and list of native links. Caller provides `current="page"` or `current="location"` as appropriate. Current location has bold text and a thicker border; links retain underlines. |
| `ContentState` | Named section, h4 title, description and optional recovery action. Use beneath h3. Routine states use a polite status; errors use an assertive alert. State text and recovery behavior belong to the caller. |

## State inventory

| State | Display and action |
| --- | --- |
| Initial | Label/hint and explicit primary action. No validation error before an attempt. |
| Loading | Busy button plus a visible status. Reject repeat submits without moving focus. Standalone loading example keeps navigation available; no progress percentage is invented. |
| Empty | Explain that nothing is available and offer a relevant way back. |
| Success | Announce the local validation result; explicitly distinguish a filled field from demonstrated competence. |
| Error | Text explains the problem and recovery. Invalid fields have an associated error and a dashed border; an invalid submit focuses the first invalid field. Resource errors offer retry. |
| Access denied | Explain unavailability and offer a way back. A component is not server authorization; M0's free public course requires no account. |
| Network unavailable | Explain the condition honestly and offer retry. This workshop only simulates the message; caching/connectivity handling belongs to JUV-112. |
| Disabled | Native disabled button with dashed border and nearby text explaining why it is unavailable. |

## Layout and review

Use shared palette, spacing, radii and motion tokens. Input text is at least 16 px; actionable controls are at least 44 × 44 CSS px. Focus has a visible contrasting outline; error, current and disabled states include a cue beyond color. Cards stack on narrow viewports, labels wrap and no fixed content height clips enlarged text.

Keyboard review: skip to main, reach workshop navigation, activate the form link, submit an empty field, correct it, submit with Enter/Space, continue to the card and state selector, choose each state and activate recovery. Native select uses platform arrow-key behavior. No trap, timer-based focus movement, network request or local storage is involved. Navigation current state follows hash changes.

The demo's timer only simulates field validation. It is cleaned up on unmount and does not validate a learning outcome. The catalogue/publication and accepted lesson text remain unchanged. [Validation evidence and limits](../delivery/VALIDATION-JUV-104.md).
