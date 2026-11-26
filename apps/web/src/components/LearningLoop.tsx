import { Icon, iconPaths, type IconName } from './icons';

// Home orientation illustration (JUV-115, owner selections on 2026-11-26: option A "the loop"
// with character A, a learner holding her notebook, in front of the Juvanga sun).
// The drawing is decorative and contains no text; the ordered list carries the four steps.
// Steps run clockwise from the top. Entrance motion is pure CSS so prerendered and
// no-JavaScript pages show the complete figure at rest. Stagger delays live in CSS because
// the public CSP forbids inline style attributes.
const steps: { icon: IconName; x: number; y: number }[] = [
  { icon: 'task', x: 160, y: 36 },
  { icon: 'criteria', x: 246, y: 120 },
  { icon: 'exercise', x: 160, y: 204 },
  { icon: 'solution', x: 74, y: 120 },
];
const arrows = [[220.8, 59.2, 45], [220.8, 180.8, 135], [99.2, 180.8, 225], [99.2, 59.2, 315]] as const;

function Learner() {
  return <g className="loop-learner">
    <defs><clipPath id="loop-learner-clip"><circle cx="160" cy="120" r="55" /></clipPath></defs>
    <circle className="loop-sun" cx="160" cy="120" r="55" />
    <g clipPath="url(#loop-learner-clip)">
      <path className="learner-shirt" d="M106 186C108 152 128 141 160 141C192 141 212 152 214 186Z" />
      <rect className="learner-skin" x="152" y="121" width="16" height="24" rx="7" />
      <path className="learner-collar" d="M150 141L160 152L170 141" />
      <ellipse className="learner-skin" cx="160" cy="104" rx="18.5" ry="21.5" />
      <circle className="learner-hair" cx="160" cy="77" r="11" />
      <path className="learner-hair" d="M141 106C139 86 149 80 160 80C171 80 181 86 179 106C176 95 169 90 160 90C151 90 144 95 141 106Z" />
      <circle className="learner-earring" cx="141.5" cy="113" r="2.6" />
      <circle className="learner-earring" cx="178.5" cy="113" r="2.6" />
      <circle className="learner-face" cx="153" cy="105" r="2.1" />
      <circle className="learner-face" cx="167" cy="105" r="2.1" />
      <path className="learner-smile" d="M154 114Q160 119 166 114" />
      <g transform="rotate(-8 160 162)">
        <rect className="learner-notebook" x="137" y="148" width="46" height="32" rx="4" />
        <path className="learner-lines" d="M145 158h24M145 166h16" />
        <path className="learner-check" d="M147 172l3 3 6-6" />
      </g>
      <circle className="learner-skin" cx="137" cy="163" r="6" />
      <circle className="learner-skin" cx="183" cy="157" r="6" />
    </g>
  </g>;
}

export function LearningLoop({ caption, labels }: { caption: string; labels: readonly string[] }) {
  return <figure className="learning-loop">
    <svg className="loop-art" viewBox="42 4 236 234" width="236" height="234" aria-hidden="true" focusable="false">
      <circle className="loop-ring" cx="160" cy="120" r="84" />
      {arrows.map(([x, y, angle]) => <path key={angle} className="loop-arrow"
        transform={`translate(${x} ${y}) rotate(${angle})`} d="M-6 -7L3 0L-6 7" />)}
      <Learner />
      {steps.map(step => <g key={step.icon} className={`loop-step loop-step-${step.icon}`}>
        <circle cx={step.x} cy={step.y} r="29" />
        <svg x={step.x - 15} y={step.y - 15} width="30" height="30" viewBox="0 0 24 24" overflow="visible">
          {iconPaths(step.icon).map(d => <path key={d} d={d} />)}
        </svg>
      </g>)}
    </svg>
    <figcaption>
      <p className="eyebrow">{caption}</p>
      <ol className="loop-steps">{steps.map((step, index) => <li key={step.icon}><Icon name={step.icon} size={22} />{labels[index]}</li>)}</ol>
    </figcaption>
  </figure>;
}
