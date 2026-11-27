// Orientation icon set selected by the owner for JUV-115 ("line + sun" style).
// Icons are always decorative: the visible text next to each one carries the meaning.
const paths = {
  course: ['M3 5.5c3-1.3 6-1.3 9 .5c3-1.8 6-1.8 9-.5V19c-3-1.3-6-1.3-9 .5c-3-1.8-6-1.8-9-.5z', 'M12 6v13.5'],
  lesson: ['M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M9 8h6M9 12h6M9 16h4'],
  task: ['M6 3h8l4 4v14H6z', 'M14 3v4h4M9 12h6M9 16h6'],
  criteria: ['M4 6.5l1.5 1.5L8 5.5M4 11.5l1.5 1.5L8 10.5M4 16.5l1.5 1.5L8 15.5', 'M11 7h9M11 12h9M11 17h9'],
  exercise: ['M4 20l1.2-4.2L15.5 5.5a2.1 2.1 0 0 1 3 3L8.2 18.8z', 'M13.5 7.5l3 3'],
  solution: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M8 12.5l2.7 2.7L16.2 9.5'],
  offline: ['M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5z', 'M12 7v7M9.5 11.5L12 14l2.5-2.5M10.5 18.5h3'],
  progress: ['M4 18l5-5 4 3 7-8', 'M15 8h5v5'],
  home: ['M4 11L12 4l8 7', 'M6.5 9.5V20h11V9.5M10 20v-5h4v5'],
  // ADR-015 lesson callouts.
  information: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M12 11v5.5M12 7.5v.01'],
  warning: ['M12 3.5L21.5 20h-19z', 'M12 9.5v5M12 17.5v.01'],
  tip: ['M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z', 'M10 20.5h4'],
} as const;

export type IconName = keyof typeof paths;

/** Path data for drawing an icon inside a larger illustration. */
export function iconPaths(name: IconName): readonly string[] {
  return paths[name];
}

export function Icon({ name, size = 24, sun = true, className = '' }: { name: IconName; size?: number; sun?: boolean; className?: string }) {
  const [outline, detail] = paths[name];
  return <svg className={`icon icon-${name} ${className}`} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
    {sun && <circle className="icon-sun" cx="16.5" cy="7.5" r="6" />}
    <path className="icon-line" d={outline} />
    {/* pathLength lets CSS draw the detail stroke, such as the worked-solution check. */}
    <path className="icon-line icon-detail" d={detail} pathLength={1} />
  </svg>;
}
