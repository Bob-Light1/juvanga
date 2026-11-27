# Juvanga brand guidelines — version 1

## Name and personality

Name: **Juvanga**. Tagline, translated: **Learn. Practise. Progress.** French launch tagline: “Apprendre. Pratiquer. Progresser.” Initial description, translated: “Practical training in artificial intelligence.” Warmth, mastery, clarity, trust. Do not present the coined name as a literal translation. Name origins and brand checks remain in the source documents.

## Selected logo

**Variant B: J monogram + sun**, examined alongside variants A, C and D. Decision ADR-003. B is compact, legible at small sizes, simple and usable beyond training. A explains learning but adds rays/pages; C depends on a long word; D is too vertical and detailed for the interface.

Symbol B is canonical; accompany it with the name in the header and at first contact. The supplied horizontal lockup combines symbol B and the vectorized Juvanga lettering already present in proposal A without creating a new symbol. Sources retained; provenance in `apps/web/public/brand/manifest.json`.

- `juvanga-symbol.svg`: circular symbol, minimum 24 px, 32 px recommended.
- `juvanga-lockup.svg`: symbol + name, minimum width 140 px.
- `juvanga-lockup-dark.svg`: sand lettering on night background; contrast preserved.
- `juvanga-app-icon.svg` and PNG 192/512: full square icon; the system applies its corners.
- Clear space: at least one small-sun diameter around the artwork.
- Preserve proportions and colors; no stretching, added shadows, rotation, gradients or looping animation.
- At 16 px, use the supplied favicon and check legibility; do not shrink a full lockup.
- Accessibility: accessible name “Juvanga — home” (French UI: “Juvanga — accueil”) for a link; decorative image `alt=""` if the name is already announced nearby.

## Canonical palette

Do not combine earlier PDF palette variants. Technical source: `packages/design/tokens.css`; permitted pairs: `packages/design/contrast.json`.

| Token | Hex | Usage |
| --- | --- | --- |
| night | #14213D | Primary text, navigation, primary button |
| sand | #FBF3E4 | Main background and text on night |
| white | #FFFFFF | Form surfaces, text on dark semantic colors |
| gold | #F5B82E | Solar accent, decorative progress, badge background with night text |
| dawn | #E8590C | Decorative accent, never small text on sand |
| action | #C2410C | Accented secondary action / underlined link |
| leaf | #1F7A5C | Success, with explicit text and icon |
| muted | #4B5563 | Secondary text on white/sand |
| border | #7A746A | Interactive borders on white/sand |
| danger | #B42318 | Error; helpful message associated with the field |
| warning | #854D0E | Warning, light background, never color alone |

Body text: contrast ≥4.5:1. Large text: ≥3:1. Meaningful control/focus: ≥3:1. Gold on sand and white on gold are prohibited for text. For a gold button, use night text. Do not use decorative orange as a button with small white text. `npm run check:contrast` calculates ratios; do not estimate visually.

## Typography and composition

Fraunces for large headings (600/700), Inter for interface and reading (400/600). Local fonts and Latin subsets, `font-display: swap`, with SIL OFL licenses in `apps/web/public/fonts/`. JUV-105 adds two preloaded Latin WOFF2 files (84,876 bytes combined), metric-adjusted Arial/Georgia fallbacks, then system fallbacks when those faces are unavailable. See the font manifest for source URLs and SHA-256 hashes. Interface weights 400/600/700 and heading weights 600/700 are available.

Body 17–18 px, minimum 16 px for mobile fields; line height 1.55–1.65; reading width 65–72 characters. Fluid headings with `clamp`, no text in images. Spacing scale 4/8/12/16/24/32/48/64 px; corner radii 8/16/24 px; product target touch controls at least 44 × 44 px. Subtle shadows; predominantly sand background, light surfaces and sparse accents.

## Orientation visuals — 2026-11-26

The project owner selected these JUV-115 options from a proposal sheet: home illustration **A, the learning loop**; icon style **3, line + sun**; motion level **lively**. Rejected options: B (worksheet scene), C (path on night background); icon styles 1 (plain line) and 2 (night disc like the symbol).

- Learning loop: `apps/web/src/components/LearningLoop.tsx`. Four nodes clockwise from the top (useful task, clear criteria, practice, worked solution) around a gold sun, on a white arch replacing the large home symbol card. The drawing is decorative and textless; a visible ordered list carries the steps.
- Icons: `apps/web/src/components/icons.tsx`. 24 px grid, 2 px round stroke in `currentColor`, with a gold sun disc behind the top right. Always `aria-hidden` next to visible text; never the only carrier of meaning.
- All artwork is original to the project; no external asset or library. The symbol, palette and typography are unchanged.

After reviewing the screenshots the same day, the owner asked for the loop in the first phone screen, a drawn character and a better menu, then selected from a second sheet: **character A**, a learner holding her notebook in front of the sun at the loop centre (rejected: B, a learner with a phone; C, the same learner in brand colors only), and **menu 1**, a bottom tab bar on phones (rejected: a "Menu" button; pill tabs under the logo). The character adds two illustration-only tones, `--illustration-skin` and `--illustration-hair` in `packages/design/tokens.css`, never used for interface text or controls. On phones, the loop sits between the title and the introduction with a side legend. The menu labels are shortened to "Accueil", "Parcours" and "Ma reprise", and wide screens keep the links at the top right.

## Tone

One primary action per screen. Concrete verbs: “Resume the lesson”, “Submit my exercise”, “View my payment” (localized into French for launch). Explain the next step after an error. No false counters, fictional testimonials, autonomous-AI promises or misleading certificates.
