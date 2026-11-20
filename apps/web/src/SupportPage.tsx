import { Link } from 'react-router';
import { messages } from './i18n/index.ts';
import { ActionLink } from './components/ui.tsx';

const copy = messages.support;
// Contact identifiers are not translated or pseudo-localized.
const supportEmail = 'juvangasupport@gmail.com';
export function SupportPage({ kind }: { kind: 'help' | 'privacy' | 'feedback' }) {
  const sections = kind === 'help' ? copy.helpSections : kind === 'privacy' ? copy.privacySections : [];
  return <article className="page-intro support-page">
    <h1>{copy[`${kind}Title`]}</h1><p className="intro">{copy[`${kind}Description`]}</p>
    {sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    {kind === 'feedback' ? <>
      <p>{copy.feedbackInstructions}</p>
      <p><ActionLink href={`mailto:${supportEmail}`}>{copy.emailAction}</ActionLink></p>
      <p>{copy.emailDelivery}</p>
      <p>{copy.emailFallback} <span translate="no">{supportEmail}</span></p>
      <p>{copy.emailRetention}</p>
      <p>{copy.sensitiveWarning}</p>
    </> : <>
      {kind === 'privacy' && <>
        <p>{copy.emailRetention}</p>
        <p><a className="text-link" href="https://policies.google.com/privacy?hl=fr">{copy.emailProviderPrivacy}</a></p>
      </>}
      <p><Link className="text-link" to="/feedback">{copy.emailContact}</Link></p>
      <p><Link className="text-link" to="/progress">{copy.progressLink}</Link></p>
    </>}
    <p><Link className="text-link" to="/courses">{messages.pages.backToCatalogue}</Link></p>
  </article>;
}
