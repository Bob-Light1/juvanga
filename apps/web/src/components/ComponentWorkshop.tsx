import { useEffect, useRef, useState, type FormEvent } from 'react';
import { fr } from '../i18n/fr';
import { ActionLink, Alert, Button, ContentState, CourseCard, CourseNavigation, TextField, type ContentStateKind } from './ui';

const copy = fr.components;
const stateKinds: ContentStateKind[] = ['loading', 'empty', 'error', 'denied', 'offline'];

export function ComponentWorkshop() {
  const [error, setError] = useState('');
  const [result, setResult] = useState<'initial' | 'loading' | 'success'>('initial');
  const [kind, setKind] = useState<ContentStateKind>('empty');
  const [location, setLocation] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const selector = useRef<HTMLSelectElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const updateLocation = () => setLocation(window.location.hash);
    updateLocation();
    window.addEventListener('hashchange', updateLocation);
    return () => { clearTimeout(timer.current); window.removeEventListener('hashchange', updateLocation); };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (result === 'loading') return;
    if (!input.current?.value.trim()) {
      setError(copy.form.error);
      setResult('initial');
      input.current?.focus();
      return;
    }
    setError('');
    setResult('loading');
    timer.current = setTimeout(() => setResult('success'), 700);
  }

  const state = copy.states[kind];
  return (
    <section id="components" className="section component-workshop" aria-labelledby="components-title">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 id="components-title">{copy.title}</h2>
      <Alert title={copy.introduction} />
      <CourseNavigation label={copy.navigation} items={[
        { href: '#component-form', label: copy.links.form, current: location === '#component-form' ? 'location' : undefined },
        { href: '#component-card', label: copy.links.card, current: location === '#component-card' ? 'location' : undefined },
        { href: '#component-states', label: copy.links.states, current: location === '#component-states' ? 'location' : undefined },
      ]} />
      <div className="component-grid">
        <section id="component-form" className="example-card" aria-labelledby="component-form-title" tabIndex={-1}>
          <h3 id="component-form-title">{copy.form.title}</h3>
          <form noValidate onSubmit={submit}>
            <TextField ref={input} name="objective" label={copy.form.label} hint={copy.form.hint} error={error} required
              readOnly={result === 'loading'} onChange={() => { setError(''); setResult('initial'); }} />
            <Button type="submit" busy={result === 'loading'}>{result === 'loading' ? copy.form.busy : copy.form.submit}</Button>
          </form>
          <div className="form-feedback">
            <Alert tone={result === 'success' ? 'success' : 'info'} title={result === 'success' ? copy.form.success : result === 'loading' ? copy.form.busy : copy.form.ready}>
              {result === 'success' ? copy.form.successDetail : null}
            </Alert>
          </div>
          <Button variant="secondary" disabled aria-describedby="publication-hint">{copy.form.disabled}</Button>
          <p id="publication-hint" className="field-hint">{copy.form.disabledHint}</p>
        </section>
        <div id="component-card" tabIndex={-1}>
          <CourseCard {...copy.card} actionLabel={copy.card.action} href="#component-form" />
        </div>
      </div>
      <section id="component-states" className="state-workshop" aria-labelledby="component-states-title" tabIndex={-1}>
        <h3 id="component-states-title">{copy.states.title}</h3>
        <label className="state-label" htmlFor="component-state">{copy.states.label}</label>
        <select ref={selector} id="component-state" className="field-input" value={kind} onChange={event => setKind(event.target.value as ContentStateKind)}>
          {stateKinds.map(value => <option key={value} value={value}>{copy.states[value].label}</option>)}
        </select>
        <ContentState kind={kind} title={state.title} action={kind === 'loading' ? undefined : kind === 'error' || kind === 'offline'
          ? <Button variant="secondary" onClick={() => { setKind('empty'); selector.current?.focus(); }}>{copy.states.retry}</Button>
          : <ActionLink variant="secondary" href="#component-form">{copy.states.back}</ActionLink>}>
          {state.description}
        </ContentState>
        <Alert tone="warning" title={copy.form.disabled}>{copy.form.disabledHint}</Alert>
      </section>
    </section>
  );
}
