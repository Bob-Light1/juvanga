import { messages } from './i18n/index.ts';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ComponentWorkshop } from './components/ComponentWorkshop';
import { ActionLink, Button } from './components/ui';

const copy = messages.workshop;
const palette = [
  [copy.colors.night, '#14213D', 'night'], [copy.colors.sand, '#FBF3E4', 'sand'],
  [copy.colors.gold, '#F5B82E', 'gold'], [copy.colors.dawn, '#E8590C', 'dawn'],
  [copy.colors.leaf, '#1F7A5C', 'leaf'],
] as const;

export function BrandWorkshop() {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <>
      <a className="skip-link" href="#main">{messages.pages.skip}</a>
      <header className="header shell">
        <img src="/brand/juvanga-lockup.svg" alt={messages.pages.brand} width="228" height="70" />
        <span className="pill">{copy.badge}</span>
      </header>
      <main id="main" className="shell" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 id="hero-title">{copy.title[0]}<br />{copy.title[1]}<br /><em>{copy.title[2]}</em></h1>
            <p className="intro">{copy.introduction}</p>
            <ActionLink href="#identity">{copy.explore} <span aria-hidden="true">↘</span></ActionLink>
          </div>
          <div className="symbol-card">
            <img src="/brand/juvanga-symbol.svg" alt={copy.symbolAlt} width="280" height="280" />
            <p>{copy.symbolCaption[0]}<br />{copy.symbolCaption[1]}</p>
          </div>
        </section>
        <section id="identity" className="section" aria-labelledby="identity-title">
          <p className="eyebrow">{copy.paletteEyebrow}</p>
          <h2 id="identity-title">{copy.paletteTitle}</h2>
          <ul className="palette">
            {palette.map(([name, hex, token]) => (
              <li key={name}><div className={`swatch swatch-${token}`} /><strong>{name}</strong><span>{hex}</span></li>
            ))}
          </ul>
          <p className="note">{copy.paletteNote}</p>
        </section>
        <section className="section behavior" aria-labelledby="behavior-title">
          <div><p className="eyebrow">{copy.behaviorEyebrow}</p><h2 id="behavior-title">{copy.behaviorTitle[0]}<br />{copy.behaviorTitle[1]}</h2><p>{copy.behaviorDescription}</p></div>
          <div className="example-card">
            <span className="pill">{copy.interaction}</span>
            <h3>{copy.stepTitle}</h3>
            <Button aria-expanded={expanded} aria-controls="motion-detail" onClick={() => setExpanded(!expanded)}>{expanded ? copy.hide : copy.show}</Button>
            <div id="motion-detail" aria-live="polite">
              <AnimatePresence initial={false}>
                {expanded && <motion.p key="detail" initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>{copy.principle}</motion.p>}
              </AnimatePresence>
            </div>
          </div>
        </section>
        <ComponentWorkshop />
        <aside className="notice"><strong>{copy.noticeTitle}</strong><p>{copy.notice}</p></aside>
      </main>
      <footer className="shell footer"><span>{messages.pages.brand}</span><span>{messages.pages.tagline}</span></footer>
    </>
  );
}
