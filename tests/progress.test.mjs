import test from 'node:test';
import assert from 'node:assert/strict';
import { createProgressStore, isProgressRecord, progressKey, readProgress } from '../apps/web/src/progress/progress.ts';

const reading = { courseId: 'fixture-course', courseVersion: 2, lessonId: 'fixture-lesson-1', position: 400, updatedAt: '2026-11-07T12:00:00.000Z' };
const record = { schemaVersion: 1, consent: true, reading };
function storage() {
  const values = new Map(); const writes = [];
  return { values, writes, getItem: key => values.get(key) ?? null, setItem(key, value) { writes.push([key, value]); values.set(key, value); }, removeItem: key => values.delete(key) };
}

test('refusal and attempted saves before opt-in never persist anything', () => {
  const memory = storage(); const store = createProgressStore(() => memory);
  store.subscribe(() => {});
  assert.equal(store.getSnapshot().status, 'disabled');
  store.decline(); assert.equal(store.getSnapshot().declined, true);
  assert.equal(store.save(reading), false);
  assert.equal(memory.writes.length, 0);
  assert.equal(memory.values.size, 0);
});

test('explicit consent saves a minimal versioned record, reloads exactly and preserves unrelated keys on erase', () => {
  const memory = storage(); memory.values.set('unrelated', 'keep');
  const store = createProgressStore(() => memory);
  assert.ok(store.enable()); assert.equal(store.getSnapshot().record.reading, null);
  assert.ok(store.save(reading));
  assert.deepEqual(readProgress(memory).record, record);
  assert.ok(store.enable()); assert.deepEqual(store.getSnapshot().record, record);
  const restored = createProgressStore(() => memory); restored.subscribe(() => {});
  assert.deepEqual(restored.getSnapshot().record, record);
  assert.ok(restored.clear());
  assert.equal(memory.getItem(progressKey), null);
  assert.equal(memory.getItem('unrelated'), 'keep');
  assert.equal(restored.getSnapshot().notice, 'cleared');
  assert.equal(store.save(reading), false);
  assert.equal(memory.getItem(progressKey), null);
});

test('strict progress schema rejects responses, unknown fields, invalid positions and non-UTC dates', () => {
  for (const candidate of [
    { ...record, answer: 'deliverable' }, { ...record, consent: false },
    { ...record, reading: { ...reading, answer: 'deliverable' } },
    ...[-1, 1001, 0.5].map(position => ({ ...record, reading: { ...reading, position } })),
    ...['2026-02-30T12:00:00Z', '2026-11-07', '2026-11-07T12:00:00+01:00', '2026-11-07T12:00:00.1234Z'].map(updatedAt => ({ ...record, reading: { ...reading, updatedAt } })),
    { ...record, reading: { ...reading, courseId: '../private' } },
  ]) assert.equal(isProgressRecord(candidate), false);
  const memory = storage(); const store = createProgressStore(() => memory); store.enable();
  assert.equal(store.save({ ...reading, answer: 'deliverable' }), false);
  assert.equal(memory.getItem(progressKey), JSON.stringify({ schemaVersion: 1, consent: true, reading: null }));
});

test('malformed and unknown-format envelopes fail closed without writes or automatic erasure', () => {
  for (const [raw, status] of [['{broken', 'corrupt'], [JSON.stringify({ ...record, schemaVersion: 99 }), 'incompatible'], ['null', 'corrupt'], ['x'.repeat(5000), 'corrupt']]) {
    const memory = storage(); memory.values.set(progressKey, raw); const store = createProgressStore(() => memory);
    store.subscribe(() => {});
    assert.equal(store.getSnapshot().status, status);
    assert.equal(store.save(reading), false);
    assert.equal(memory.writes.length, 0); assert.equal(memory.getItem(progressKey), raw);
    assert.ok(store.clear()); assert.equal(memory.getItem(progressKey), null);
  }
});

test('denied reads/getters, quota writes and failed erasure are recoverable and never claim removal', () => {
  const denied = createProgressStore(() => { throw new Error('SecurityError'); });
  denied.subscribe(() => {}); assert.equal(denied.getSnapshot().status, 'unavailable');
  assert.equal(denied.enable(), false); assert.equal(denied.clear(), false);
  assert.equal(denied.getSnapshot().notice, 'erase-failed');
  const memory = storage(); memory.setItem(progressKey, JSON.stringify(record));
  memory.setItem = () => { throw new Error('QuotaExceededError'); };
  memory.removeItem = () => { throw new Error('SecurityError'); };
  const store = createProgressStore(() => memory); store.subscribe(() => {});
  assert.equal(store.save(reading), false); assert.equal(store.getSnapshot().notice, 'save-failed');
  assert.equal(store.clear(), false); assert.equal(store.getSnapshot().notice, 'erase-failed');
  store.refresh(); assert.equal(store.getSnapshot().notice, 'erase-failed');
  assert.equal(store.save(reading), false);
  assert.equal(memory.getItem(progressKey), JSON.stringify(record));
});

test('external erasure revokes pending saves; refresh listeners clean up without altering saved content', () => {
  const memory = storage(); let refresh, stopped = 0;
  const store = createProgressStore(() => memory, listener => { refresh = listener; return () => stopped++; });
  const unsubscribe = store.subscribe(() => {}); store.enable(); store.save(reading);
  memory.removeItem(progressKey); refresh();
  assert.equal(store.getSnapshot().status, 'disabled');
  assert.equal(store.save(reading), false); assert.equal(memory.getItem(progressKey), null);
  unsubscribe(); assert.equal(stopped, 1);
});

test('progress page stays noindex and outside public discovery even with saved reading support', async () => {
  const { getPage, publicPaths } = await import('../apps/web/src/routing.ts');
  assert.equal(getPage('/progress', [], []).kind, 'progress');
  assert.equal(getPage('/progress', [], []).indexable, false);
  assert.ok(!publicPaths([], []).includes('/progress'));
});
