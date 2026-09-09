import type { ReactNode } from 'react';
import { Step, Steps, type Page, type DesignSystem, type SlideMeta } from '@open-slide/core';
import search from './assets/uber-tool-search.jpeg';
import code from './assets/uber-code-mode.jpeg';
import ladder from './assets/cmu-tool-evaluation.png';
import policy from './assets/compaction-policy-adapted.svg';
import drift from './assets/cmu-compaction-drift.png';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#20201E', accent: '#2E70FF' },
  fonts: { display: 'Arial, sans-serif', body: 'Arial, sans-serif' },
  typeScale: { hero: 62, body: 34 }, radius: 0,
};
const uber = 'https://www.uber.com/ca/en/blog/efficient-software-factory/';
const cmu2 = 'https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=54';
const cmu3 = 'https://www.cmu-agents.com/slides/lecture-03-long-context.pdf';
const Frame = ({ title, source, label, children }: { title: string; source: string; label: string; children: ReactNode }) => <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
  <h1 style={{ position: 'absolute', top: 65, left: 100, width: 1720, margin: 0, fontSize: 62, lineHeight: 1.13, fontWeight: 700 }}>{title}</h1>
  {children}
  <a href={source} target="_blank" rel="noreferrer" style={{ position: 'absolute', bottom: 30, left: 100, fontSize: 23, color: '#676358' }}>{label}</a>
  <div style={{ position: 'absolute', bottom: 30, right: 100, fontSize: 25, color: '#999386' }}>@rajistics</div>
</div>;
const Caption = ({ children }: { children: ReactNode }) => <div style={{ position: 'absolute', left: 100, top: 910, width: 1720, fontSize: 34, lineHeight: 1.35 }}>{children}</div>;
// Independent regions preserve original evidence while allowing click-controlled reveals.
const Piece = ({ src, iw, ih, x, y, w, h, left, top, scale }: {src: string; iw: number; ih: number; x: number; y: number; w: number; h: number; left: number; top: number; scale: number}) => <svg viewBox={`${x} ${y} ${w} ${h}`} style={{ position: 'absolute', left: left + x * scale, top: top + y * scale, width: w * scale, height: h * scale }}><image href={src} width={iw} height={ih} /></svg>;

const Search: Page = () => <Frame title="Uber moved tool definitions out of the initial prompt" source={uber} label="Uber Engineering · Figure 7 · August 27, 2026">
  <img src={search} alt="Uber comparison of eagerly loaded schemas versus tool search and CLI" style={{ position: 'absolute', left: 100, top: 235, width: 1720, height: 640, objectFit: 'contain' }} />
  <Steps><Step><Caption>Available tools do not all need to appear in every model call.</Caption></Step></Steps>
</Frame>;
const Code: Page = () => <Frame title="Uber moved repetitive polling out of the model loop" source={uber} label="Uber Engineering · Figure 8 · August 27, 2026">
  <img src={code} alt="Uber model-mediated calls and code-mode sequence comparison" style={{ position: 'absolute', left: 100, top: 225, width: 1720, height: 650, objectFit: 'contain' }} />
  <Steps><Step><Caption>MCP still serves the tools. Code handles the intermediate steps.</Caption></Step></Steps>
</Frame>;
const Evaluation: Page = () => <Frame title="A valid tool call can still leave the task unfinished" source={cmu2} label="CMU 11-768 · Lecture 2, page 54 · source table">
  <div style={{ position: 'absolute', left: 100, top: 240, width: 1720, fontSize: 34 }}>The call returned valid JSON. What else would you check?</div>
  <div style={{ position: 'absolute', left: 100, top: 370, width: 1720, height: 441, background: '#fff' }} />
  <Piece src={ladder} iw={3312} ih={848} x={0} y={0} w={3312} h={178} left={100} top={370} scale={1720 / 3312} />
  <Steps>
    <Step><Piece src={ladder} iw={3312} ih={848} x={0} y={178} w={3312} h={170} left={100} top={370} scale={1720 / 3312} /></Step>
    <Step><Piece src={ladder} iw={3312} ih={848} x={0} y={348} w={3312} h={168} left={100} top={370} scale={1720 / 3312} /></Step>
    <Step><Piece src={ladder} iw={3312} ih={848} x={0} y={516} w={3312} h={166} left={100} top={370} scale={1720 / 3312} /></Step>
    <Step><Piece src={ladder} iw={3312} ih={848} x={0} y={682} w={3312} h={166} left={100} top={370} scale={1720 / 3312} /><Caption>Classify one failure from our workshop trace using these four levels.</Caption></Step>
  </Steps>
</Frame>;
const Preserve: Page = () => <Frame title="Compaction needs a policy for what stays exact" source={`${cmu3}#page=48`} label="Adapted from CMU 11-768 · Lecture 3, page 48">
  <img src={policy} alt="The next call keeps anchors, a checkpoint with an evidence reference, and recent actions. The reference points to the full log stored outside context. Duplicates are omitted from the next call." style={{ position: 'absolute', left: 100, top: 235, width: 1720, height: 640, objectFit: 'contain' }} />
  <Steps><Step><Caption>Which constraint in your task would be dangerous to paraphrase?</Caption></Step></Steps>
</Frame>;
const Drift: Page = () => <Frame title="Repeated summaries can erase a requirement" source={`${cmu3}#page=50`} label="CMU 11-768 · Lecture 3, page 50 · illustrative example">
  <div style={{ position: 'absolute', left: 100, top: 245, fontSize: 34 }}>When does this continuation stop preserving the original request?</div>
  <div style={{ position: 'absolute', left: 100, top: 380, width: 1720, height: 438, background: '#fff' }} />
  <Piece src={drift} iw={3340} ih={850} x={0} y={0} w={725} h={380} left={100} top={380} scale={1720 / 3340} />
  <Steps>
    <Step><Piece src={drift} iw={3340} ih={850} x={725} y={0} w={865} h={380} left={100} top={380} scale={1720 / 3340} /></Step>
    <Step><Piece src={drift} iw={3340} ih={850} x={1590} y={0} w={860} h={380} left={100} top={380} scale={1720 / 3340} /></Step>
    <Step><Piece src={drift} iw={3340} ih={850} x={2450} y={0} w={890} h={380} left={100} top={380} scale={1720 / 3340} /></Step>
    <Step><Piece src={drift} iw={3340} ih={850} x={0} y={380} w={3340} h={470} left={100} top={380} scale={1720 / 3340} /><Caption>The first summary already weakens the CUDA 12.4 constraint.</Caption></Step>
  </Steps>
</Frame>;
export const notes = [
  'Uber reports 50K–70K schema tokens with over 100 installed tools. Near zero refers to Uber MCP schemas in active context, not all prompt tokens or zero discovery overhead. Eager loading is an integration choice, not required by the MCP protocol.',
  'Uber reports five SQL queries in the same session. Treat as a small operational comparison, not a universal MCP versus CLI ranking. Code-mode still uses MCP through the gateway. Caption distinguishes orchestration from protocol.',
  'Original CMU table, progressively revealed by row. Ask participants to separate well-formed arguments from tool choice, valid dependency order, and externally checked task outcome. No empirical improvement claim.',
  'Adapted from CMU preservation policy, with an illustrative /tmp/ci.log example. The top group is what enters the next model call. The checkpoint keeps a reference to the full evidence stored outside context; a tool can read relevant details back when needed. Duplicates and superseded attempts are omitted from the next call, not necessarily deleted from audit history. The SVG contains named groups for future builds. This is a design framework, not a measured workshop result.',
  'Illustrative drift example from CMU, not an observed run or quantified rate. CUDA 12.4 to 12.x is already a weaker constraint. Final reveal shows the original slide recommendation. Keep this as an audience reasoning question.',
];
export const meta: SlideMeta = { title: 'Tools and context: visual review', createdAt: '2026-09-09T02:27:22.698Z' };
export default [Search, Code, Evaluation, Preserve, Drift] satisfies Page[];
