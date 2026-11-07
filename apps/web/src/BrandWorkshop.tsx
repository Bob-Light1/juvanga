import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ComponentWorkshop } from './components/ComponentWorkshop';
import { ActionLink, Button } from './components/ui';

const palette = [
  ['Nuit', '#14213D', 'night'], ['Sable', '#FBF3E4', 'sand'],
  ['Or', '#F5B82E', 'gold'], ['Aube', '#E8590C', 'dawn'],
  ['Feuille', '#1F7A5C', 'leaf'],
] as const;

export function BrandWorkshop() {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <header className="header shell">
        <img src="/brand/juvanga-lockup.svg" alt="Juvanga" width="228" height="70" />
        <span className="pill">Atelier de marque · F0</span>
      </header>
      <main id="main" className="shell" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">Des compétences qui ouvrent des possibilités</p>
            <h1 id="hero-title">Apprendre.<br />Pratiquer.<br /><em>Progresser.</em></h1>
            <p className="intro">L’identité de Juvanga prend forme : une lumière chaleureuse, des idées claires et la confiance d’avancer.</p>
            <ActionLink href="#identity">Explorer l’identité <span aria-hidden="true">↘</span></ActionLink>
          </div>
          <div className="symbol-card">
            <img src="/brand/juvanga-symbol.svg" alt="Monogramme J surmonté d’un soleil doré" width="280" height="280" />
            <p>Un signe simple.<br />Un horizon ouvert.</p>
          </div>
        </section>
        <section id="identity" className="section" aria-labelledby="identity-title">
          <p className="eyebrow">01 · La palette</p>
          <h2 id="identity-title">Une présence lumineuse.</h2>
          <ul className="palette">
            {palette.map(([name, hex, token]) => (
              <li key={name}><div className={`swatch swatch-${token}`} /><strong>{name}</strong><span>{hex}</span></li>
            ))}
          </ul>
          <p className="note">Le bleu nuit porte le texte. L’or attire le regard. Le sable laisse respirer la lecture.</p>
        </section>
        <section className="section behavior" aria-labelledby="behavior-title">
          <div><p className="eyebrow">02 · Les interactions</p><h2 id="behavior-title">Du mouvement,<br />avec intention.</h2><p>Des transitions courtes accompagnent l’action et respectent la préférence de mouvement réduit de l’appareil.</p></div>
          <div className="example-card">
            <span className="pill">Exemple d’interaction</span>
            <h3>Chaque étape a un objectif.</h3>
            <Button aria-expanded={expanded} aria-controls="motion-detail" onClick={() => setExpanded(!expanded)}>{expanded ? 'Masquer le principe' : 'Découvrir le principe'}</Button>
            <div id="motion-detail" aria-live="polite">
              <AnimatePresence initial={false}>
                {expanded && <motion.p key="detail" initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>Comprendre une idée, l’essayer et observer ce que l’on sait désormais faire.</motion.p>}
              </AnimatePresence>
            </div>
          </div>
        </section>
        <ComponentWorkshop />
        <aside className="notice"><strong>Socle de développement</strong><p>Cette page sert à vérifier l’identité et les composants. Le premier parcours gratuit sera développé au jalon M0.</p></aside>
      </main>
      <footer className="shell footer"><span>Juvanga</span><span>Apprendre. Pratiquer. Progresser.</span></footer>
    </>
  );
}
