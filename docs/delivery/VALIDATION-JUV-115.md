# JUV-115 — Orientation illustration, icons and motion

Owner: Claude. Branch: `feat/JUV-115-orientation-visuals` (stacked on the unmerged JUV-113 branch). Date: 2026-11-26.
Selections, two rounds: [brand record](../design/BRAND.md#orientation-visuals--2026-11-26); motion: [MOTION.md](../design/MOTION.md).

## Delivered behavior

- **Home illustration:** the learning loop replaces the large symbol card on the home page. Its four steps are listed in French in `fr.ts` (`pages.loop`, `pages.loopCaption`).
- **Icons:** the "line + sun" icons are on these pages:
  - course cards and the course page eyebrow;
  - the programme lessons;
  - the lesson practice call to action;
  - the exercise eyebrow and the worked-solution summary;
  - the offline status message;
  - the reading-resume page;
  - the three home approach steps.
- **Motion:** CSS only, within MOTION.md budgets, with a reduced-motion fade. Details are in [MOTION.md](../design/MOTION.md).
- **Round 2:**
  - the learner sits at the loop centre;
  - on phones, the loop is in the first screen: at 360 × 780 the button ends at 674 px and the tab bar starts at 711 px;
  - phones get a bottom tab bar with icons, and the menu labels are shortened;
  - two browser tests now use the new labels.
- **No new dependency:** the course text, version 1, the palette, the symbol and the fonts are unchanged.
- **Layout shift fix:** the home hero columns are now top-aligned. With the figure vertically centered, the font swap at 1280 px measured a cumulative layout shift of 0.038, above the 0.01 threshold.

## Reproducible validation

All commands ran on Node 24.22.3 (nvm). The host default is Node 20.

**Weight and size:**
- The public build gives 149,652 bytes of gzipped JavaScript, against 147,843 before (+1,809). Initial images are 12,576 bytes, against 12,908 before. The budgets are 250 KiB and 300 KiB.
- The public resource count is still 31.

**Automated suites:**
- After round 2, `npm run verify` passed again: 95 tests, docs, course, contrast, lint, strict TypeScript and build.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` passed 25 scenarios, including axe, keyboard, reduced motion and offline.
- The first run had one failure: the 1280 px font-swap shift described above. After the fix, and again after round 2, `fonts.spec.ts` passed 9 out of 9 runs (`--repeat-each=3`).
- `PLAYWRIGHT_CHANNEL=chrome npm run test:reader` then passed 17 scenarios and restored the normal noindex artifact.

**Manual screenshots:**
- At 360 px, in both normal and reduced-motion modes, there is no horizontal overflow and no console errors.
- The pages checked were home, course, lesson call to action, exercise, opened solution, progress and offline status.
- The before and after phone screenshots were shared with the owner (round 2 adds a desktop capture).

**Owner review:** on 2026-11-26 the project owner reviewed the round 2 screenshots and replied "Le rendu est valide" ("the rendering is valid"). This is owner-reported approval of the rendering, not tester acceptance.

## Not verified

- Physical devices, non-Chromium browsers, screen readers and throttled CPU.
- Remote deployment: the branch is not merged.
