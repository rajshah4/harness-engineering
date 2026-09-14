import { Steps, Step, type Page, type DesignSystem, type SlideMeta } from '@open-slide/core';
import models from './assets/figure-1.png';
import context from './assets/figure-4.png';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#20201E', accent: '#2E70FF' },
  fonts: { display: 'Arial, sans-serif', body: 'Arial, sans-serif' },
  typeScale: { hero: 62, body: 36 }, radius: 0,
};
const root = { position: 'relative', width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' } as const;
const heading = { position: 'absolute', left: 100, top: 65, width: 1720, fontSize: 62, fontWeight: 700, lineHeight: 1.13, margin: 0 } as const;
const figure = { position: 'absolute', left: 100, top: 260, width: 1720, height: 547, objectFit: 'contain' } as const;
const takeaway = { position: 'absolute', left: 100, top: 830, width: 1720, margin: 0, fontSize: 36, lineHeight: 1.25 } as const;
const caveat = { position: 'absolute', left: 100, top: 958, width: 1700, fontSize: 25, color: '#676358', margin: 0 } as const;
const Footer = ({ figureNumber }: { figureNumber: number }) => <>
  <a href="https://arxiv.org/pdf/2609.03141" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 100, bottom: 30, fontSize: 23, color: '#676358' }}>Patel et al. (2026), Figure {figureNumber} · arXiv:2609.03141v1</a>
  <div style={{ position: 'absolute', right: 100, bottom: 30, fontSize: 25, color: '#999386' }}>@rajistics</div>
</>;

const ModelChange: Page = () => <div style={root}>
  <h1 style={heading}>A harness improvement can lose its value when the model improves</h1>
  <img src={models} alt="Original Figure 1: accuracy versus output tokens for Codex and specialized pipelines across three model generations on TAG-Bench and DAB" style={figure} />
  <Steps><Step><p style={takeaway}>Would the customization still help with the next model?</p></Step></Steps>
  <p style={caveat}>TAG uses a partial Agentar reconstruction. DAB uses DeepEye. Codex is itself a harness.</p>
  <Footer figureNumber={1} />
</div>;

const SavedContext: Page = () => <div style={root}>
  <h1 style={heading}>Saved context helps when it addresses a measured failure</h1>
  <img src={context} alt="Original Figure 4: accuracy and latency under five persistent-context strategies, alongside their exploration, analysis and verification turns" style={figure} />
  <Steps><Step><p style={takeaway}>Accuracy-focused context gained <strong style={{ color: 'var(--osd-accent)' }}>19 percentage points</strong>.<br />Schema-focused context reduced exploration but hurt accuracy.</p></Step></Steps>
  <p style={caveat}>12 development queries, 42 held-out queries. Context frozen before evaluation.</p>
  <Footer figureNumber={4} />
</div>;

export const notes = [
  'Compare the same model across the two tested systems before comparing model generations. TAG uses only part of Agentar, so this is a reason to retest customization, not proof that all custom harnesses lose. Source: https://arxiv.org/pdf/2609.03141, Figure 1 and Appendix A.1. Original chart, axes and legend preserved. One click reveals the audience question.',
  'Our stale-context result does not imply that all saved guidance hurts. In this study the accuracy-oriented instructions helped, while the schema-focused context hurt accuracy. Source: https://arxiv.org/pdf/2609.03141, Figure 4 and Appendix A.2. The held-out queries share the development environments. This evaluates reuse across queries, not generalization to unseen databases. One click reveals the comparison.',
];
export const meta: SlideMeta = { title: 'Model improvements and persistent context', createdAt: '2026-09-09T15:12:09.691Z' };
export default [ModelChange, SavedContext] satisfies Page[];
