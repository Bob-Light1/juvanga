# ADR-015 — Automatic lightweight illustrations and icon callouts

- Date: 2026-11-27
- Status: adopted for JUV-117 by the project owner's choice on 2026-11-27. This amends the image-loading rule of [ADR-010](010-lesson-reader.md); ADR-010 remains in force otherwise.
- Owner: Claude (JUV-117)

## Context and constraint

The new N0 course ([N0-COURSE.md](../../product/N0-COURSE.md)) teaches interfaces step by step, with diagrams and screenshots on almost every page. ADR-010 requires a keyboard action before any image loads. That protects mobile data, but a course with ten click-to-load figures reads as a text course with buttons.

The project owner asked for courses that feel alive, with images and icons. On 2026-11-27, the owner chose to display lightweight images automatically and keep heavy images behind the action. The lesson schema also has no way to mark a tip or a “try it now” step with an icon.

## Decision

### Automatic image display

1. **Opt-in field.** Schema version 2 `image` blocks gain an optional field, `display: "auto" | "request"`. It defaults to `request`, the ADR-010 behavior, so existing documents keep their meaning.
2. **Build budgets.** Content validation enforces every `auto` image and fails otherwise. This runs in `npm run check:content` and in the build.
   - The asset must be a regular file in `apps/web/public/media/`.
   - The file must be at most **40 KiB**.
   - The `auto` images of one lesson page (blocks and example) total at most **120 KiB**, and so do those of one worked solution.
3. **Rendering.**
   - An `auto` image is present in the prerendered HTML with intrinsic `width`/`height`, `loading="lazy"`, `decoding="async"` and `referrerpolicy="no-referrer"`. It therefore appears without JavaScript, and below-the-fold images are fetched only when approached.
   - On failure, the reader shows the description, a status message and a keyboard retry. Focus stays in the figure.
   - `request` images are unchanged.
4. **Offline.** No worker change. Referenced media is already in the optional allowlist ([ADR-013](013-public-offline.md)), and an automatic display counts as a request, so a displayed image enters the cache.

### Icon callouts

5. **New note tones.** Schema version 2 notes gain the tones `tip` (*Astuce*) and `try` (*Essayez*). All four tones render a decorative icon from the existing JUV-115 set next to their visible French label. Information and warning icons are added to that set. Schema version 1 rejects the new tones.

## Alternatives and reasons for choosing

- **Keep every image behind the action:** rejected by the owner because the course looks inert.
- **Display every image automatically:** rejected because a screenshot-heavy lesson could cost hundreds of kilobytes on a prepaid mobile plan.
- **Size detection at runtime, or by the browser (`loading="lazy"` only):** rejected because the author would get no feedback and lazy loading alone still downloads everything the learner scrolls past.
- **SVG illustrations:** still excluded, as in ADR-010. Diagrams are authored as HTML and inline SVG sources and exported to WebP by `scripts/render-diagrams.mjs` with the existing Playwright browser.

## Consequences, costs and limitations

- Learners spend up to 120 KiB of data per page without an explicit action. That is below the 300 KiB initial-image budget of [QUALITY.md](../../delivery/QUALITY.md).
- Authors must compress diagrams; real screenshots will usually exceed 40 KiB and stay at `request`.
- The build checks file size, not pixel dimensions, relevance or rights. Those remain review checks before publication.
- One more content field and two tones to keep in M1's database import (JUV-208).

## Deviations from the V1.3 dossier

None. The dossier asks for a lightweight mobile experience; this ADR bounds the cost rather than removing the control.

## Validation / evidence

- **Unit tests:** default `display`, budget failures, missing files, schema-1 rejection of the new tones.
- **Reader browser suite:** an `auto` image is in the HTML and shown without action; failure keeps its description and retry; `request` behavior is unchanged.
- **Full verification:** `npm run verify`.

## Migration or rollback

No published document uses schema version 2, so there is no migration. Rollback means reverting the commit and setting any `auto` image back to `request`. The ADR-010 behavior then applies again.

## Related tickets

JUV-117 (N0 course), JUV-108 (reader), JUV-112 (offline), JUV-208 (catalogue import).
