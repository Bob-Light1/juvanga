import { useEffect, useSyncExternalStore } from 'react';
import { createProgressStore, progressKey, type ReadingPosition } from './progress.ts';

export const progressStore = createProgressStore(() => window.localStorage, refresh => {
  const listener = (event: StorageEvent) => { if (event.key === progressKey || event.key === null) refresh(); };
  window.addEventListener('storage', listener);
  return () => window.removeEventListener('storage', listener);
});

export function useProgress() {
  return useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getServerSnapshot);
}

export function useReadingPosition(courseId: string, courseVersion: number, lessonId: string) {
  const state = useProgress();
  useEffect(() => {
    if (state.status !== 'enabled') return;
    let position = 0, ready = false, disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame: number | undefined;
    const saved = progressStore.getSnapshot().record?.reading;
    function save() {
      if (!ready || disposed || progressStore.getSnapshot().status !== 'enabled') return;
      const reading: ReadingPosition = { courseId, courseVersion, lessonId, position, updatedAt: new Date().toISOString() };
      progressStore.save(reading);
    }
    const capture = () => {
      const range = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return range ? Math.round(Math.min(1, Math.max(0, window.scrollY / range)) * 1000) : 0;
    };
    const scroll = () => {
      if (!ready) return;
      position = capture();
      clearTimeout(timer); timer = setTimeout(save, 400);
    };
    document.fonts.ready.then(() => {
      if (disposed) return;
      frame = requestAnimationFrame(() => {
        if (disposed) return;
        if (saved?.courseId === courseId && saved.courseVersion === courseVersion && saved.lessonId === lessonId) {
          position = saved.position;
          window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * position / 1000, behavior: 'instant' });
        } else position = capture();
        ready = true;
        save();
      });
    });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pagehide', save);
    return () => {
      clearTimeout(timer);
      if (frame !== undefined) cancelAnimationFrame(frame);
      save(); disposed = true;
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pagehide', save);
    };
  }, [courseId, courseVersion, lessonId, state.status]);
}
