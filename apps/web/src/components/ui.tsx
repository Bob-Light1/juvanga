import { useId, type ButtonHTMLAttributes, type ComponentProps, type ReactNode } from 'react';

type ActionVariant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionVariant;
  busy?: boolean;
};

export function Button({ type = 'button', variant = 'primary', busy = false, disabled, className = '', onClick, children, ...props }: ButtonProps) {
  return (
    <button {...props} type={type} disabled={disabled} aria-disabled={busy || disabled || undefined}
      aria-busy={busy || undefined} className={`button button-${variant} ${className}`}
      onClick={event => {
        if (busy) { event.preventDefault(); return; }
        onClick?.(event);
      }}>
      {busy && <span aria-hidden="true">…</span>}{children}
    </button>
  );
}

export function ActionLink({ variant = 'primary', className = '', ...props }: ComponentProps<'a'> & { href: string; variant?: ActionVariant }) {
  return <a {...props} className={`button button-${variant} ${className}`} />;
}

type TextFieldProps = Omit<ComponentProps<'input'>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  type?: 'text' | 'email' | 'search' | 'url' | 'tel' | 'password';
};

export function TextField({ label, hint, error, id, className = '', 'aria-describedby': describedBy, ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = [describedBy, hint ? `${inputId}-hint` : undefined, error ? `${inputId}-error` : undefined].filter(Boolean).join(' ') || undefined;
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      {hint && <p id={`${inputId}-hint`} className="field-hint">{hint}</p>}
      <input {...props} id={inputId} className={`field-input ${className}`} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={description} />
      {error && <p id={`${inputId}-error`} className="field-error">{error}</p>}
    </div>
  );
}

type AlertProps = {
  tone?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  children?: ReactNode;
};

const alertSymbols = { info: 'i', success: '✓', warning: '!', error: '!' };

export function Alert({ tone = 'info', title, children }: AlertProps) {
  return (
    <div className={`alert alert-${tone}`} role={tone === 'error' ? 'alert' : 'status'} aria-atomic="true">
      <span className="alert-symbol" aria-hidden="true">{alertSymbols[tone]}</span>
      <div><strong>{title}</strong>{children && <div>{children}</div>}</div>
    </div>
  );
}

type CourseCardProps = {
  title: string;
  description: string;
  badge: string;
  meta: string;
  href: string;
  actionLabel: string;
};

export function CourseCard({ title, description, badge, meta, href, actionLabel }: CourseCardProps) {
  const titleId = useId();
  return (
    <article className="course-card" aria-labelledby={titleId}>
      <span className="pill">{badge}</span>
      <h3 id={titleId}>{title}</h3>
      <p className="course-meta">{meta}</p>
      <p>{description}</p>
      <ActionLink href={href} variant="secondary">{actionLabel}</ActionLink>
    </article>
  );
}

type NavigationItem = { href: string; label: string; current?: 'page' | 'location' };

export function CourseNavigation({ label, items }: { label: string; items: NavigationItem[] }) {
  return (
    <nav className="course-navigation" aria-label={label}>
      <ul>{items.map(item => (
        <li key={item.href}><a href={item.href} aria-current={item.current}>{item.label}</a></li>
      ))}</ul>
    </nav>
  );
}

export type ContentStateKind = 'loading' | 'empty' | 'error' | 'denied' | 'offline';

export function ContentState({ kind, title, children, action }: { kind: ContentStateKind; title: string; children: ReactNode; action?: ReactNode }) {
  const titleId = useId();
  return (
    <section className={`content-state content-state-${kind}`} aria-labelledby={titleId}>
      <div role={kind === 'error' ? 'alert' : 'status'} aria-atomic="true">
        <h4 id={titleId}>{title}</h4>
        <p>{children}</p>
      </div>
      {action}
    </section>
  );
}
