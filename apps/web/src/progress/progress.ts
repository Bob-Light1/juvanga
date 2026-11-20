import { isContentId } from '../content/id.ts';
import { isUtcInstant } from '../i18n/index.ts';

export const progressKey = 'juvanga.reading-progress';
export type ReadingPosition = {
  courseId: string; courseVersion: number; lessonId: string; position: number; updatedAt: string;
};
export type ProgressRecord = { schemaVersion: 1; consent: true; reading: ReadingPosition | null };

function hasExactKeys(value: unknown, keys: string[]): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value)
    && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key)));
}

export function isProgressRecord(value: unknown): value is ProgressRecord {
  if (!hasExactKeys(value, ['schemaVersion', 'consent', 'reading']) || value.schemaVersion !== 1 || value.consent !== true) return false;
  const reading = value.reading;
  if (reading === null) return true;
  return hasExactKeys(reading, ['courseId', 'courseVersion', 'lessonId', 'position', 'updatedAt'])
    && isContentId(reading.courseId) && isContentId(reading.lessonId)
    && typeof reading.courseVersion === 'number' && Number.isSafeInteger(reading.courseVersion) && reading.courseVersion > 0
    && typeof reading.position === 'number' && Number.isInteger(reading.position) && reading.position >= 0 && reading.position <= 1000
    && typeof reading.updatedAt === 'string' && isUtcInstant(reading.updatedAt);
}

export type ProgressStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type ProgressState = {
  status: 'loading' | 'disabled' | 'enabled' | 'corrupt' | 'incompatible' | 'unavailable';
  record?: ProgressRecord;
  declined?: boolean;
  notice?: 'cleared' | 'erase-failed' | 'save-failed';
};
export const initialProgress: ProgressState = { status: 'loading' };

export function readProgress(storage: ProgressStorage): ProgressState {
  let raw: string | null;
  try { raw = storage.getItem(progressKey); }
  catch { return { status: 'unavailable' }; }
  if (raw === null) return { status: 'disabled' };
  if (raw.length > 4000) return { status: 'corrupt' };
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return { status: 'corrupt' }; }
  if (value && typeof value === 'object' && 'schemaVersion' in value && typeof value.schemaVersion === 'number' && value.schemaVersion !== 1) return { status: 'incompatible' };
  return isProgressRecord(value) ? { status: 'enabled', record: value } : { status: 'corrupt' };
}

// Only a known validated envelope is serialized: attempts and personal fields cannot enter storage.
export function createProgressStore(getStorage: () => ProgressStorage, listen?: (refresh: () => void) => () => void) {
  let state = initialProgress;
  const listeners = new Set<() => void>();
  let stopListening: (() => void) | undefined;
  function publish(next: ProgressState) { state = next; listeners.forEach(listener => listener()); }
  function read() {
    try { return readProgress(getStorage()); } catch { return { status: 'unavailable' } as ProgressState; }
  }
  function refresh() {
    const next = read();
    if (state.notice === 'erase-failed' && next.status !== 'disabled') { publish({ ...state }); return; }
    publish(next.status === 'disabled' && state.status === 'disabled' ? { ...next, declined: state.declined, notice: state.notice } : next);
  }
  function write(record: ProgressRecord) {
    try {
      if (!isProgressRecord(record)) throw new Error('Invalid reading progress');
      getStorage().setItem(progressKey, JSON.stringify(record));
      publish({ status: 'enabled', record });
      return true;
    } catch { publish({ status: 'unavailable', notice: 'save-failed' }); return false; }
  }
  return {
    getSnapshot: () => state,
    getServerSnapshot: () => initialProgress,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (listeners.size === 1) { refresh(); stopListening = listen?.(refresh); }
      return () => { listeners.delete(listener); if (!listeners.size) { stopListening?.(); stopListening = undefined; } };
    },
    refresh,
    enable() {
      const existing = read();
      if (existing.status === 'enabled') { publish(existing); return true; }
      return write({ schemaVersion: 1, consent: true, reading: null });
    },
    decline: () => publish({ status: 'disabled', declined: true }),
    save(reading: ReadingPosition) {
      if (state.notice === 'erase-failed') return false;
      // Check durable consent again before every write, including during cross-tab revocation.
      const current = read();
      if (current.status !== 'enabled' || !current.record) { publish(current); return false; }
      return write({ ...current.record, reading });
    },
    clear() {
      try {
        getStorage().removeItem(progressKey);
        publish({ status: 'disabled', declined: true, notice: 'cleared' });
        return true;
      } catch { publish({ status: 'unavailable', declined: true, notice: 'erase-failed' }); return false; }
    },
  };
}
