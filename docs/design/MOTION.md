# Useful animation

Selected tool: **Motion for React**, package `motion`, import `motion/react`. CSS for hover/focus and simple transitions. No Motion+ subscription required. GSAP, Lottie, Rive and 3D are not added to the foundation; a justified request may receive an ADR.

| Situation | Behavior | Target duration |
| --- | --- | --- |
| Button | Color/subtle shadow; immediate focus | 120 ms |
| Card or panel opening | Opacity and movement ≤8 px | 180–220 ms |
| Step change | Preserve context, focus heading | 200–240 ms |
| Exercise result | Short confirmation after actual response | ≤300 ms |
| Loading | Stable skeleton; text for long waits | No artificial delay |

Wrap the app in `MotionConfig reducedMotion="user"`. Use `useReducedMotion` to disable custom behaviors. Reduced preference: remove translation/zoom/parallax and progress animations; render immediately or use a very short fade. Respect the preference in CSS too. Completed animation does not mean completed server operation.

Animate mainly transform and opacity; no height transitions on long lists. No animation essential to understanding, forced scrolling, hijacked horizontal scrolling or autoplay video. Use LazyMotion/code splitting when measurements justify it; route budget in QUALITY.

Tests: normal and reduced modes; keyboard and focus changes; 360 px width; throttled CPU; interruption/resume; no unexpected content shift. Reference: https://motion.dev/docs/react-accessibility (consulted on 2026-11-06).
