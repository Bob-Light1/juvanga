import { Link } from 'react-router';
import { messages } from './i18n/index.ts';

const copy = messages.support;
export function SupportPage({ kind }: { kind: 'help' | 'privacy' | 'feedback' }) {
  const sections = kind === 'help' ? copy.helpSections : kind === 'privacy' ? copy.privacySections : [];
  return <article className="page-intro support-page">
    <h1>{copy[`${kind}Title`]}</h1><p className="intro">{copy[`${kind}Description`]}</p>
    {sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    {kind === 'feedback' ? <><p className="notice">{copy.unavailable}</p><p>{copy.feedbackInstructions}</p><p>{copy.sensitiveWarning}</p></> :
      <p><Link className="text-link" to="/progress">{copy.progressLink}</Link></p>}
    <p><Link className="text-link" to="/courses">{messages.pages.backToCatalogue}</Link></p>
  </article>;
}
