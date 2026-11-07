import { useEffect, useState, useSyncExternalStore } from 'react';
import { Button } from '../components/ui';
import { messages } from '../i18n/index.ts';

const subscribeConnection = (listener: () => void) => {
  window.addEventListener('online', listener);
  window.addEventListener('offline', listener);
  return () => { window.removeEventListener('online', listener); window.removeEventListener('offline', listener); };
};
const subscribeSupport = () => () => {};

export function PwaStatus() {
  const offline = useSyncExternalStore(subscribeConnection, () => !navigator.onLine, () => false);
  const supported = useSyncExternalStore(subscribeSupport, () => 'serviceWorker' in navigator, () => true);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [failed, setFailed] = useState(false);
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    let disposed = false;
    let registration: ServiceWorkerRegistration | undefined;
    let worker: ServiceWorker | null = null;
    const changed = () => {
      if (disposed) return;
      if (registration?.waiting && navigator.serviceWorker.controller) setWaiting(registration.waiting);
      if (worker?.state === 'redundant' && !registration?.active) setFailed(true);
    };
    const found = () => {
      worker?.removeEventListener('statechange', changed);
      worker = registration?.installing ?? null;
      worker?.addEventListener('statechange', changed);
    };
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).then(value => {
        if (disposed) return;
        registration = value;
        changed(); found();
        value.addEventListener('updatefound', found);
      }).catch(() => { if (!disposed) setFailed(true); });
    }
    return () => {
      disposed = true;
      registration?.removeEventListener('updatefound', found);
      worker?.removeEventListener('statechange', changed);
    };
  }, []);
  function update() {
    if (!waiting || updating) return;
    setUpdating(true);
    // Reload only after this explicit action. Consent and reading storage are untouched.
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
    waiting.postMessage('activate-public-release');
  }
  const copy = messages.pwa;
  return <aside className="pwa-status" aria-label={copy.label}>
    {offline && <p role="status">{copy.offline}</p>}
    {(failed || !supported) && <p role="status">{copy.unavailable}</p>}
    {waiting && <div><p role="status">{copy.update}</p><Button variant="secondary" disabled={updating} onClick={update}>{updating ? copy.updating : copy.accept}</Button></div>}
  </aside>;
}
