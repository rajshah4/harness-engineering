import type { ReactNode } from 'react';
import { MorphElement, type Page, type DesignSystem, type SlideTransition } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#03030C', accent: '#2E70FF' },
  fonts: { display: 'Arial, sans-serif', body: 'Arial, sans-serif' },
  typeScale: { hero: 76, body: 38 }, radius: 8,
};
const blue = '#2E70FF', orange = '#C95121', green = '#427C3B', purple = '#795CA5', muted = '#767880';
export const transition: SlideTransition = {
  duration: 220,
  enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  morph: { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)' },
};

const Frame = ({ title, caption, children, section, beat }: { title: string; caption: string; children: ReactNode; section: string; beat: string }) => (
  <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ position: 'absolute', left: 136, top: 76, fontSize: 24, color: muted }}>{section} · {beat}</div>
    <h1 style={{ position: 'absolute', left: 136, top: 130, width: 1648, margin: 0, fontSize: 70, lineHeight: 1.12, letterSpacing: -2 }}>{title}</h1>
    {children}
    <p style={{ position: 'absolute', left: 136, right: 136, top: 865, margin: 0, fontSize: 34, lineHeight: 1.35 }}>{caption}</p>
    <div style={{ position: 'absolute', left: 136, bottom: 42, fontSize: 23, color: '#999386' }}>@rajistics</div>
    <div style={{ position: 'absolute', right: 136, bottom: 42, fontSize: 23, color: muted }}>Motion study · use ← and → · each state holds</div>
  </div>
);

const Box = ({ id, x, y, w = 310, title, sub, color, active }: { id: string; x: number; y: number; w?: number; title: string; sub: string; color: string; active: boolean }) => (
  <MorphElement id={id}><div style={{ position: 'absolute', left: x, top: y, width: w, height: 145, padding: 26, boxSizing: 'border-box', border: `3px solid ${active ? color : '#CEC7B5'}`, background: active ? color : '#FFFCF4', color: active ? 'white' : '#03030C', borderRadius: 8 }}>
    <div style={{ fontSize: 34, fontWeight: 700 }}>{title}</div><div style={{ fontSize: 25, marginTop: 16 }}>{sub}</div>
  </div></MorphElement>
);

function Loop({ stage }: { stage: number }) {
  const captions = [
    'A request starts the run. The harness prepares what the model will see.',
    'The model receives the context and chooses an action. Reasoning is not shown here.',
    'The model requests a tool. The harness checks and executes that request.',
    'The tool returns an observation. The harness adds it to the next model call.',
    'The model uses the new evidence and can request another action.',
    'A completion request reaches the harness. The configured verifier determines whether the task passes.',
  ];
  const positions = [[290,360],[825,360],[1370,360],[1370,620],[825,360],[825,620]];
  return <Frame title="The harness runs the loop around the model" section="01 / ReAct loop" beat={`${stage + 1} of 6`} caption={captions[stage]}>
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <defs><marker id="loop-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10" fill="none" stroke="#B3AD9E" strokeWidth="1.5" /></marker></defs>
      <path d="M465 435 H665 M975 435 H1210 M1365 508 V578 M1210 650 H1085 V555 H820 V508" fill="none" stroke="#B3AD9E" strokeWidth="3" markerEnd="url(#loop-arrow)" />
      <path d="M820 508 V578" fill="none" stroke="#B3AD9E" strokeWidth="3" markerEnd="url(#loop-arrow)" />
      <text x="520" y="415" fill={muted} fontSize="24">context</text><text x="1010" y="415" fill={muted} fontSize="24">request</text>
      <text x="1040" y="705" fill={muted} fontSize="24">next turn</text>
    </svg>
    <Box id="loop-context" x={155} y={365} title="Context" sub="Harness assembles" color={purple} active={stage === 0} />
    <Box id="loop-model" x={665} y={365} title="Model" sub="Chooses the action" color={blue} active={stage === 1 || stage === 4} />
    <Box id="loop-tool" x={1210} y={365} title="Tool execution" sub="Harness runs the tool" color={orange} active={stage === 2} />
    <Box id="loop-observation" x={1210} y={578} title="Observation" sub="Result or error" color={purple} active={stage === 3} />
    <Box id="loop-gate" x={665} y={578} title="Verification" sub={stage === 5 ? 'External check: PASS' : 'Checks completion'} color={green} active={stage === 5} />
    <MorphElement id="loop-token"><div style={{ position: 'absolute', left: positions[stage][0], top: positions[stage][1] - 45, width: 26, height: 26, borderRadius: 50, background: stage === 5 ? green : blue }} /></MorphElement>
    <div style={{ position: 'absolute', left: 155, top: 763, fontSize: 25, color: muted }}>Illustrative execution sequence. Completion gates vary by harness.</div>
  </Frame>;
}

const Call = ({ id, x, y, label, width = 215, color = blue }: { id: string; x: number; y: number; label: string; width?: number; color?: string }) => (
  <MorphElement id={id}><div style={{ position: 'absolute', left: x, top: y, width, height: 76, border: `2px solid ${color}`, color, background: '#FFFCF4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 600 }}>{label}</div></MorphElement>
);

function Tools({ stage }: { stage: number }) {
  const bundled = stage >= 2;
  return <Frame title={stage === 3 ? 'One evidence bundle removed repeated retrieval' : 'Where should the retrieval work happen?'} section="02 / Tool shape" beat={`${stage + 1} of 4`} caption={[
    'The agent must explain a pull request and cite the evidence. Predict which interface will help.',
    'Lower-level tools make the agent assemble the evidence across repeated calls.',
    'A task-shaped tool executes a general recipe and returns a bounded, citable bundle.',
    'The bundle matched the broad catalog’s evidence score with fewer calls and less elapsed time.',
  ][stage]}>
    <div style={{ position: 'absolute', left: 136, top: 310, fontSize: 32, fontWeight: 700 }}>Broad catalog</div>
    <Call id="b-meta" x={450} y={300} label="PR metadata" />
    <Call id="b-files" x={700} y={300} label="File list" />
    <Call id="b-patch" x={950} y={300} label="Patches" />
    <Call id="b-commit" x={1200} y={300} label="Commits" />
    <Call id="b-tests" x={1450} y={300} label="Validation" />
    {stage >= 1 && <div style={{ position: 'absolute', left: 450, top: 402, color: muted, fontSize: 27 }}>Inspect, fetch individual files, assemble citations, then answer.</div>}
    <div style={{ position: 'absolute', left: 136, top: 542, fontSize: 32, fontWeight: 700 }}>Task-shaped tool</div>
    <Call id="t-meta" x={450} y={530} width={bundled ? 1215 : 215} label={bundled ? 'One call: metadata + selected patches + commits + validation + citation URLs' : 'PR metadata'} color={green} />
    {!bundled && <><Call id="t-files" x={700} y={530} label="File list" color={green} /><Call id="t-patch" x={950} y={530} label="Patches" color={green} /><Call id="t-commit" x={1200} y={530} label="Commits" color={green} /><Call id="t-tests" x={1450} y={530} label="Validation" color={green} /></>}
    {stage === 3 && <div style={{ position: 'absolute', left: 450, top: 664, display: 'flex', gap: 100, fontSize: 35 }}><span><b style={{ color: green }}>6/6</b> evidence in both</span><span><b>12 → 1</b> tool calls</span><span><b>123 → 72s</b></span></div>}
    <div style={{ position: 'absolute', left: 136, top: 778, fontSize: 24, color: muted }}>{stage === 3 ? 'Workshop 2 · medians of 3 trials · broad catalog versus task-shaped tool · September 5' : 'Schematic work categories, not a literal call trace. The tool still performs retrieval internally.'}</div>
  </Frame>;
}

const Fact = ({ id, x, y, label, color = purple, width = 620 }: { id: string; x: number; y: number; label: string; color?: string; width?: number }) => <MorphElement id={id}><div style={{ position: 'absolute', left: x, top: y, width, height: 70, boxSizing: 'border-box', padding: '17px 24px', fontSize: 28, borderLeft: `6px solid ${color}`, background: '#FFFCF4', color: '#03030C' }}>{label}</div></MorphElement>;

function Compact({ stage }: { stage: number }) {
  const moved = stage >= 2;
  return <Frame title={stage === 3 ? 'The next call receives enough state to continue' : 'What should survive compaction?'} section="03 / Compaction" beat={`${stage + 1} of 4`} caption={[
    'A long task accumulates useful state alongside logs, repeated output, and abandoned hypotheses.',
    'Choose the objective, current changes, unresolved failure, and next action.',
    'Write those facts into a continuation record. Keep the raw evidence available separately.',
    'A fresh call can resume from the record, retrieve missing evidence, and recheck whether it is still current.',
  ][stage]}>
    <div style={{ position: 'absolute', left: 136, top: 300, fontSize: 32, fontWeight: 700 }}>{moved ? 'Raw history remains available' : 'Conversation history'}</div>
    <div style={{ position: 'absolute', left: 1060, top: 300, fontSize: 32, fontWeight: 700 }}>{stage === 3 ? 'Next model call' : 'Continuation record'}</div>
    <div style={{ position: 'absolute', left: 1025, top: 357, width: 750, height: 430, border: `2px solid ${moved ? purple : '#CEC7B5'}`, borderRadius: 8 }} />
    <Fact id="objective" x={moved ? 1060 : 136} y={380} label="Goal: add cursor pagination" />
    <Fact id="changes" x={moved ? 1060 : 136} y={moved ? 475 : 470} label="Changed: pagination.py and its tests" />
    <Fact id="failure" x={moved ? 1060 : 136} y={moved ? 570 : 650} label="Unresolved: malformed cursor token" color={orange} />
    <Fact id="next" x={moved ? 1060 : 136} y={moved ? 665 : 740} label="Next: validate token, rerun focused tests" color={blue} />
    {!moved && <div style={{ position: 'absolute', left: 136, top: 560, width: 620, padding: '18px 24px', boxSizing: 'border-box', color: muted, fontSize: 26, opacity: stage === 1 ? .3 : 1 }}>Repeated logs and an abandoned hypothesis</div>}
    {moved && <div style={{ position: 'absolute', left: 136, top: 390, width: 670, color: muted, fontSize: 31, lineHeight: 1.7 }}>Earlier tool output<br />Exact diffs and test logs<br />Abandoned hypotheses<br /><br />Retrieve when needed.</div>}
    <div style={{ position: 'absolute', left: 136, top: 825, fontSize: 23, color: muted }}>Illustrative pagination example. No measured compression ratio or observed compaction event is implied.</div>
  </Frame>;
}

const L0: Page = () => <Loop stage={0} />;
const L1: Page = () => <Loop stage={1} />;
const L2: Page = () => <Loop stage={2} />;
const L3: Page = () => <Loop stage={3} />;
const L4: Page = () => <Loop stage={4} />;
const L5: Page = () => <Loop stage={5} />;
const T0: Page = () => <Tools stage={0} />;
const T1: Page = () => <Tools stage={1} />;
const T2: Page = () => <Tools stage={2} />;
const T3: Page = () => <Tools stage={3} />;
const C0: Page = () => <Compact stage={0} />;
const C1: Page = () => <Compact stage={1} />;
const C2: Page = () => <Compact stage={2} />;
const C3: Page = () => <Compact stage={3} />;
T0.transition = { duration: 220, enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }] } };
C0.transition = T0.transition;
export const notes = [
  'Illustrative ReAct loop. Explain the harness prepares the context before the model runs.',
  'The model chooses an action. We are not visualizing private chain of thought.',
  'The tool request is data until the harness executes it. Mention permissions if useful.',
  'A result or error becomes evidence in the following context.',
  'Repeat the loop as needed. This is an abbreviated sequence, not a measured trace.',
  'The model asking to finish and external verification are distinct events. Our example has a configured completion gate.',
  'Predict before revealing the Workshop 2 comparison. Categories represent internal evidence work.',
  'The broad condition retrieved individual files repeatedly. This drawing is not its exact trace.',
  'The task-shaped tool uses a general evidence recipe, not a hard-coded answer to the PR.',
  'Broad versus task-shaped medians: 6/6 both, 12 versus 1 tool calls, 123.2 versus 72.4 seconds. Three trials. Calls contain unequal work. Source: harness-benchmark/results/workshop2-tool-surface-preliminary.md.',
  'Ask what a fresh agent must know before it can continue. This example is illustrative.',
  'Separate useful current state from noisy output. Exact evidence may still matter later.',
  'The history remains outside the active context. A summary does not preserve every detail.',
  'The fresh call may need retrieval and verification. This does not demonstrate measured quality or token savings.',
];
export const meta = { title: 'Harness animation studies', createdAt: '2026-09-07T23:43:25Z' };
export default [L0, L1, L2, L3, L4, L5, T0, T1, T2, T3, C0, C1, C2, C3] satisfies Page[];
