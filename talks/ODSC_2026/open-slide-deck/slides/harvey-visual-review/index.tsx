import type { ReactNode } from 'react';
import { Steps, Step, type Page, type SlideMeta, type DesignSystem } from '@open-slide/core';
import comparison from './assets/harvey-harness-comparison.svg';
import architecture from './assets/harvey-architecture-original.svg';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#20201E', accent: '#2E70FF' },
  fonts: { display: 'Arial, sans-serif', body: 'Arial, sans-serif' },
  typeScale: { hero: 64, body: 34 }, radius: 0,
};
const source = 'https://www.harvey.ai/blog/post-training-rlm-agents-for-m-and-a-diligence';
const Frame = ({ title, children }: { title: string; children: ReactNode }) => <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
  <h1 style={{ position: 'absolute', left: 100, top: 65, width: 1710, fontSize: 62, lineHeight: 1.13, margin: 0, fontWeight: 700 }}>{title}</h1>
  {children}
  <a href={source} target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 100, bottom: 27, fontSize: 22, color: '#676358' }}>Harvey + Baseten · LAB Diligence · September 2026</a>
  <span style={{ position: 'absolute', right: 100, bottom: 27, fontSize: 25, color: '#999386' }}>@rajistics</span>
</div>;

const Results: Page = () => <Frame title="A document-review harness raised average rubric pass rate by 39 points">
  <img src={comparison} alt="Original Harvey Figure 6: seven root models compared in standard and RLM harnesses" style={{ position: 'absolute', left: 100, top: 235, width: 1210, height: 739, objectFit: 'contain' }} />
  <div style={{ position: 'absolute', left: 1370, top: 260, width: 440, fontSize: 33, lineHeight: 1.35 }}>The baseline agents left much of the data room unexamined.</div>
  <Steps>
    <Step><div style={{ position: 'absolute', left: 1370, top: 438, width: 440 }}><div style={{ fontSize: 25, color: '#676358' }}>MEAN CRITERIA PASS RATE</div><div style={{ fontSize: 48, marginTop: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>23.3% → 62.4%</div><div style={{ fontSize: 29, lineHeight: 1.4, marginTop: 20 }}>Seven models<br />50 held-out synthetic data rooms</div></div></Step>
    <Step><div style={{ position: 'absolute', left: 1370, top: 750, width: 430, borderTop: '3px solid #B5AD98', paddingTop: 24, fontSize: 27, lineHeight: 1.4 }}>Criteria passed, not complete tasks.<br />Generation cost rose for six of seven models.</div></Step>
  </Steps>
</Frame>;

// Each viewport is an independent reveal layer from the unchanged source SVG.
// Coordinates cover the original figure exactly, without cropping evidence from the final state.
const Region = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => <svg viewBox={`${x} ${y} ${w} ${h}`} style={{ position: 'absolute', left: 160 + x * 5 / 6, top: 212 + y * 5 / 6, width: w * 5 / 6, height: h * 5 / 6 }} aria-label="Region of Harvey's original RLM architecture figure">
  <image href={architecture} width={1920} height={944} />
</svg>;

const Mechanism: Page = () => <Frame title="The harness divided the reading and kept findings available for synthesis">
  <div style={{ position: 'absolute', left: 160, top: 212, width: 1600, height: 787, background: 'white' }} />
  <Region x={0} y={0} w={402} h={735} />
  <Steps>
    <Step><Region x={402} y={0} w={700} h={735} /></Step>
    <Step><Region x={1102} y={0} w={500} h={735} /></Step>
    <Step><Region x={0} y={735} w={1602} h={78} /></Step>
    <Step><Region x={1602} y={0} w={318} h={813} /><Region x={0} y={813} w={1920} h={131} /></Step>
  </Steps>
</Frame>;

export const notes = [
  'Harvey Figure 6, not the mixed training comparison in Figure 1. Same seven root model identities, with fixed Qwen3.6-35B-A3B subagents in the depth-1 RLM system. Not equal compute. Vendor-reported LLM judging of expert rubric criteria on 50 synthetic holdouts. First explain the coverage problem, then reveal the mean lift, then the cost qualification. Do not combine this average with the separate Qwen RL experiment.',
  'Original Harvey Figure 5 divided into independent reveal regions, with its labels and return paths preserved. Advance through data room, root and REPL, bounded subagents, findings returned as variables, and final memo. Subagents in this formulation have no tools or REPL. Printed output enters root context, not the full corpus. The SVG remains vector and the reveal wrappers remain separately editable. This is not a re-created diagram or a screenshot of a whole slide.',
];
export const meta: SlideMeta = { title: 'Harvey: visual review', createdAt: '2026-09-09T02:14:38.557Z' };
export default [Results, Mechanism] satisfies Page[];
