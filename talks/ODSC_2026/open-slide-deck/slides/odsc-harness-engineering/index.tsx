import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import { RajisticsWordmark } from '../shared/rajistics-wordmark';
import { workshopClaimPages } from '../workshop-claim-placeholders';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#03030C', accent: '#2E70FF' },
  fonts: {
    display: '"Open Sans", Arial, sans-serif',
    body: '"Open Sans", Arial, sans-serif',
  },
  typeScale: { hero: 142, body: 38 },
  radius: 8,
};

// Phase 1 is a fidelity bridge: every source page is preserved as a 1920×1080
// reference image while individual pages are progressively rebuilt as native React.

const SourcePage = ({
  src,
  title,
  sourceId,
}: {
  src: string;
  title: string;
  sourceId: string;
}) => (
  <div
    data-source-slide-id={sourceId}
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'var(--osd-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img
      src={src}
      alt={title}
      draggable={false}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
    <RajisticsWordmark overlay />
  </div>
);

const muted = '#767880';
const orange = '#F05A24';
const green = '#4F8F45';
const purple = '#795CA5';

// Native content slides share one headline system. Hero, workshop-claim, and
// source-image slides keep their intentional display hierarchy.
const contentTitleStyle = {
  margin: '12px 0 0',
  maxWidth: 1660,
  fontFamily: 'var(--osd-font-display)',
  fontSize: 66,
  fontWeight: 850,
  lineHeight: 1.04,
  letterSpacing: '-0.038em',
} as const;

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 48,
        right: 72,
      bottom: 34,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
        color: '#A7A6A0',
        fontFamily: 'var(--osd-font-body)',
        fontSize: 22,
      }}
    >
      <RajisticsWordmark />
      <span>{String(current).padStart(3, '0')} / {String(total).padStart(3, '0')}</span>
    </div>
  );
};

const NewMaterialBadge = ({ detail }: { detail?: string }) => (
  <div
    style={{
      position: 'absolute',
      right: 112,
      top: 62,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: `2px solid ${orange}`,
      background: '#FFF8ED',
      color: orange,
      padding: '9px 15px',
      fontSize: 17,
      fontWeight: 900,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}
  >
    <span>New material</span>
    {detail ? <span style={{ color: muted, fontWeight: 800, letterSpacing: '0.04em' }}>· {detail}</span> : null}
  </div>
);

const ControlRow = ({ label, detail, color }: { label: string; detail: string; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, fontSize: 41, lineHeight: 1.25 }}>
    <strong style={{ minWidth: 250, color, fontWeight: 800 }}>{label}</strong>
    <span>{detail}</span>
  </div>
);

const Hypothesis = ({ name, question, color }: { name: string; question: string; color: string }) => (
  <div style={{ borderTop: `7px solid ${color}`, paddingTop: 24 }}>
    <h3 style={{ margin: 0, fontSize: 42, lineHeight: 1.15, fontWeight: 800 }}>{name}</h3>
    <p style={{ margin: '16px 0 0', color: muted, fontSize: 32, lineHeight: 1.38 }}>{question}</p>
  </div>
);

const AdoptionBar = ({
  label,
  current,
  previous,
  color,
  emphasis = false,
}: {
  label: string;
  current: number;
  previous: number;
  color: string;
  emphasis?: boolean;
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '252px 760px 110px 150px', alignItems: 'center', gap: 24 }}>
    <div style={{ fontSize: 34, fontWeight: emphasis ? 800 : 650, color: emphasis ? 'var(--osd-text)' : muted }}>{label}</div>
    <div style={{ position: 'relative', height: 56, borderBottom: '2px solid #D4CDB8' }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: current * 18.8, height: emphasis ? 42 : 30, background: color }} />
      <div style={{ position: 'absolute', left: previous * 18.8, bottom: -10, width: 3, height: 76, background: '#03030C', opacity: 0.34 }} />
    </div>
    <div style={{ fontSize: 46, fontWeight: 850, lineHeight: 1, color }}>{current}%</div>
    <div style={{ fontSize: 25, fontWeight: 650, color: current >= previous ? green : muted }}>
      {previous}% → {current}%
    </div>
  </div>
);

const ProviderLine = ({ provider, model, harness, stars, color }: { provider: string; model: string; harness: string; stars: string; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '210px 260px 48px 1fr 160px', alignItems: 'center', borderTop: '2px solid #D4CDB8', padding: '25px 0' }}>
    <div style={{ color: muted, fontSize: 24, fontWeight: 800, letterSpacing: '0.1em' }}>{provider}</div>
    <div style={{ fontSize: 38, fontWeight: 700 }}>{model}</div>
    <div style={{ color, fontSize: 39, fontWeight: 800 }}>→</div>
    <div style={{ color, fontSize: 42, fontWeight: 850 }}>{harness}</div>
    <div style={{ textAlign: 'right', fontSize: 27, fontWeight: 800, color: muted }}>{stars} stars</div>
  </div>
);

const BenchmarkStack = ({
  provider,
  product,
  model,
  swe,
  terminal,
  color,
}: {
  provider: string;
  product: string;
  model: string;
  swe: string;
  terminal: string;
  color: string;
}) => (
  <div style={{ borderTop: `8px solid ${color}`, paddingTop: 24 }}>
    <div style={{ color, fontSize: 20, fontWeight: 900, letterSpacing: '0.13em' }}>{provider}</div>
    <div style={{ marginTop: 11, fontSize: 36, fontWeight: 850, lineHeight: 1.08 }}>{product}</div>
    <div style={{ marginTop: 9, color: muted, fontSize: 24, fontWeight: 650 }}>{model}</div>
    <div style={{ marginTop: 38, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
      <div>
        <div style={{ color, fontSize: 76, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.045em' }}>{swe}</div>
        <div style={{ marginTop: 12, color: muted, fontSize: 21, fontWeight: 750, lineHeight: 1.2 }}>SWE-BENCH PRO<br />resolved</div>
      </div>
      <div>
        <div style={{ color, fontSize: 76, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.045em' }}>{terminal}</div>
        <div style={{ marginTop: 12, color: muted, fontSize: 21, fontWeight: 750, lineHeight: 1.2 }}>TERMINAL-BENCH 2.0<br />accuracy</div>
      </div>
    </div>
  </div>
);

const HarnessSpreadRow = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '148px 1fr 66px', alignItems: 'center', gap: 12 }}>
    <div style={{ fontSize: 21, fontWeight: 700 }}>{label}</div>
    <div style={{ position: 'relative', height: 24, borderBottom: '2px solid #D4CDB8' }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: Math.max(8, (score - 50) * 8.4), height: 13, background: color }} />
    </div>
    <div style={{ color, fontSize: 25, fontWeight: 900, textAlign: 'right' }}>{score.toFixed(1)}%</div>
  </div>
);

const CostScoreRow = ({ model, agent, score, cost, color }: { model: string; agent: string; score: string; cost: string; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '116px 142px 72px 82px', alignItems: 'baseline', gap: 10, borderTop: '1px solid #D4CDB8', padding: '12px 0' }}>
    <div style={{ color, fontSize: 19, fontWeight: 850 }}>{model}</div>
    <div style={{ fontSize: 20, fontWeight: 700 }}>{agent}</div>
    <div style={{ color, fontSize: 23, fontWeight: 900, textAlign: 'right' }}>{score}</div>
    <div style={{ color: muted, fontSize: 19, fontWeight: 750, textAlign: 'right' }}>{cost}</div>
  </div>
);

const FrontierRow = ({ stack, score, cost, color }: { stack: string; score: number; cost: string; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '174px 1fr 62px 78px', alignItems: 'center', gap: 10 }}>
    <div style={{ fontSize: 19, fontWeight: 720 }}>{stack}</div>
    <div style={{ position: 'relative', height: 20, borderBottom: '2px solid #D4CDB8' }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: score * 4.25, height: 11, background: color }} />
    </div>
    <div style={{ color, fontSize: 22, fontWeight: 900, textAlign: 'right' }}>{score.toFixed(1)}</div>
    <div style={{ color: muted, fontSize: 18, fontWeight: 750, textAlign: 'right' }}>{cost}</div>
  </div>
);

const Page001: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-001.png', import.meta.url).href}
    title="Engineering the Harness: "
    sourceId="g39b5ec0d82b_1_188"
  />
);

const Page002: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-002.png', import.meta.url).href}
    title="Engineering the Harness: "
    sourceId="g397b4ac3620_0_19"
  />
);

const Page003: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-003.png', import.meta.url).href}
    title="Rise of Agents"
    sourceId="g3c5632f9dff_0_128"
  />
);

const Page004: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-004.png', import.meta.url).href}
    title="Agents = Model + Harness"
    sourceId="g3f8b010c3e0_1_0"
  />
);

const Page005: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-005.png', import.meta.url).href}
    title="A harness is everything outside the model"
    sourceId="g3e638e6a787_0_3"
  />
);

const Page006: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-006.png', import.meta.url).href}
    title="A harness is everything outside the model"
    sourceId="g397b4ac3620_0_28"
  />
);

const PageMarketHarnesses: Page = () => (
  <div
    data-source-slide-id="odsc_harness_adoption_2026"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '78px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Workplace adoption · professional developers
    </div>
    <h1 style={contentTitleStyle}>
      The market is converging on agent harnesses.
    </h1>

    <div style={{ marginTop: 62, display: 'flex', flexDirection: 'column', gap: 38 }}>
      <AdoptionBar label="Claude Code" current={39} previous={18} color="var(--osd-accent)" emphasis />
      <AdoptionBar label="GitHub Copilot" current={21} previous={29} color="#8F918E" />
      <AdoptionBar label="OpenAI Codex" current={16} previous={3} color={orange} emphasis />
      <AdoptionBar label="Cursor" current={12} previous={18} color="#B3AFA3" />
    </div>

    <div style={{ position: 'absolute', right: 132, top: 306, width: 300, borderLeft: `6px solid ${orange}`, paddingLeft: 28 }}>
      <div style={{ fontSize: 60, fontWeight: 850, lineHeight: 1, color: orange }}>5.3×</div>
      <div style={{ marginTop: 12, fontSize: 27, fontWeight: 700, lineHeight: 1.32 }}>Codex adoption in six months</div>
    </div>

    <div style={{ position: 'absolute', left: 136, bottom: 78, color: muted, fontSize: 21, lineHeight: 1.35 }}>
      JetBrains Developer Ecosystem Survey 2026, May–July (n &gt; 15,000). Thin markers show Jan. 2026 adoption.
      <br />Multiple tools allowed; percentages are not additive.
    </div>
    <Footer />
  </div>
);

const PageProviderHarnesses: Page = () => (
  <div
    data-source-slide-id="odsc_provider_harnesses_2026"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '78px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      The product boundary is moving
    </div>
    <h1 style={contentTitleStyle}>
      Model providers now ship the harness, too.
    </h1>

    <div style={{ marginTop: 62, width: 1120 }}>
      <ProviderLine provider="ANTHROPIC" model="Claude" harness="Claude Code" stars="143K" color="var(--osd-accent)" />
      <ProviderLine provider="OPENAI" model="GPT / Codex" harness="Codex" stars="120K" color={orange} />
      <ProviderLine provider="DEEPSEEK" model="DeepSeek" harness="DeepSeek Harness" stars="205K" color={purple} />
    </div>

    <div style={{ position: 'absolute', right: 130, top: 294, width: 420, borderLeft: `8px solid ${purple}`, paddingLeft: 34 }}>
      <div style={{ color: purple, fontSize: 20, fontWeight: 900, letterSpacing: '0.13em', textTransform: 'uppercase' }}>DeepSeek only</div>
      <div style={{ color: purple, fontSize: 94, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.05em' }}>100K+</div>
      <div style={{ marginTop: 18, fontSize: 34, fontWeight: 800, lineHeight: 1.22 }}>GitHub stars within days</div>
      <div style={{ marginTop: 28, color: muted, fontSize: 28, fontWeight: 650, lineHeight: 1.35 }}>205K stars · 100K within days</div>
    </div>

    <div style={{ position: 'absolute', left: 136, bottom: 122, fontSize: 39, fontWeight: 750 }}>
      The competitive unit is becoming <span style={{ color: purple, fontWeight: 900 }}>model + harness.</span>
    </div>
    <div style={{ position: 'absolute', left: 136, bottom: 76, color: muted, fontSize: 21 }}>
      GitHub counts captured Aug. 30, 2026. DeepSeek launched Aug. 13; the velocity callout applies only to DeepSeek.
    </div>
    <Footer />
  </div>
);

const PageOpenSourceEcosystem: Page = () => (
  <div
    data-source-slide-id="odsc_open_source_harness_ecosystem"
    style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '68px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Alternatives are already here
    </div>
    <h1 style={contentTitleStyle}>
      Open-source harnesses are already viable.
    </h1>
    <p style={{ margin: '18px 0 0', color: muted, fontSize: 29, fontWeight: 650 }}>
      Different loops, interfaces, and extension points—not one default for every job.
    </p>

    <div style={{ marginTop: 48, borderBottom: '2px solid #C9C1AA' }}>
      {[
        ['Pi', 'Minimal, extensible agent loop', 'Build your own behavior', '99K', 'var(--osd-accent)'],
        ['OpenCode', 'Terminal-first coding agent', 'Provider and workflow choice', '203K', orange],
        ['OpenHands', 'Software-development agent platform', 'Autonomous repository work', '86K', purple],
        ['Aider', 'Git-native pair programming', 'A focused coding workflow', '49K', green],
        ['Cline', 'IDE-based autonomous coding', 'Editor-native tools and control', '67K', '#8A6A43'],
      ].map(([name, description, reason, stars, color]) => (
        <div key={name} style={{ display: 'grid', gridTemplateColumns: '270px minmax(0, 1fr) 345px 120px', alignItems: 'center', columnGap: 28, minHeight: 118, borderTop: '2px solid #C9C1AA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: color, flex: '0 0 auto' }} />
            <span style={{ fontSize: 39, fontWeight: 880 }}>{name}</span>
          </div>
          <div style={{ fontSize: 29, fontWeight: 700 }}>{description}</div>
          <div style={{ color: muted, fontSize: 25, fontWeight: 650 }}>{reason}</div>
          <div style={{ textAlign: 'right', fontSize: 28, fontWeight: 900 }}>{stars}<span style={{ color, marginLeft: 7 }}>★</span></div>
        </div>
      ))}
    </div>

    <div style={{ position: 'absolute', left: 136, bottom: 72, fontSize: 31, fontWeight: 790 }}>
      The decision is not <span style={{ color: muted }}>default or custom.</span> It is <span style={{ color: 'var(--osd-accent)', fontWeight: 900 }}>which harness fits the work.</span>
    </div>
    <div style={{ position: 'absolute', right: 136, bottom: 80, color: muted, fontSize: 17, fontWeight: 700 }}>GitHub stars · Aug. 30, 2026</div>
    <Footer />
  </div>
);

const PageHarnessDesignBets: Page = () => (
  <div
    data-source-slide-id="odsc_four_harness_design_bets"
    style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '56px 110px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 21, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      A design space—not a leaderboard
    </div>
    <h1 style={contentTitleStyle}>
      Four harnesses make four different bets.
    </h1>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px 30px', marginTop: 32 }}>
      {[
        {
          name: 'Hermes',
          focus: 'Remember the user',
          detail: 'Learning loop · durable memory · skills from experience',
          image: new URL('./assets/harness-focus-hermes.png', import.meta.url).href,
          href: 'https://github.com/NousResearch/hermes-agent',
          color: purple,
        },
        {
          name: 'Pi',
          focus: 'Keep the core small',
          detail: 'Minimal agent loop · model choice · extension surface',
          image: new URL('./assets/harness-focus-pi.png', import.meta.url).href,
          href: 'https://github.com/earendil-works/pi',
          color: 'var(--osd-accent)',
        },
        {
          name: 'Prime Agent',
          focus: 'Make the harness programmable',
          detail: 'Persistent REPL · recursive subagents · continual refinement',
          image: new URL('./assets/harness-focus-prime.png', import.meta.url).href,
          href: 'https://www.primeintellect.ai/blog/prime-agent',
          color: orange,
        },
        {
          name: 'DeepSeek Harness',
          focus: 'Make every layer composable',
          detail: 'Plugin-first architecture · event log · swappable loop',
          image: new URL('./assets/harness-focus-deepseek.png', import.meta.url).href,
          href: 'https://github.com/deepseek-ai/deepseek-harness',
          color: '#1E73A8',
        },
      ].map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          style={{ height: 330, boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '390px 1fr', overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D2CBB8', borderTop: `6px solid ${item.color}`, color: 'inherit', textDecoration: 'none', boxShadow: '0 10px 24px rgba(35, 29, 17, 0.08)' }}
        >
          <img src={item.image} alt={`${item.name} official project preview`} style={{ width: '100%', height: 195, alignSelf: 'center', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
          <div style={{ padding: '29px 30px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: item.color, fontSize: 20, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.name}</div>
            <div style={{ marginTop: 13, fontSize: 31, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em' }}>{item.focus}</div>
            <div style={{ marginTop: 17, color: muted, fontSize: 20, fontWeight: 670, lineHeight: 1.32 }}>{item.detail}</div>
          </div>
        </a>
      ))}
    </div>

    <div style={{ position: 'absolute', left: 110, right: 110, bottom: 52, color: muted, fontSize: 20, fontWeight: 680 }}>
      The model may be interchangeable. The architecture around it is not.
    </div>
    <Footer />
  </div>
);

const Page007: Page = () => (
  <div
    data-source-slide-id="odsc_why_harness_01"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 136, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 25, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase' }}>The obvious question</div>
    <h1 style={{ margin: '38px 0 0', maxWidth: 1580, fontFamily: 'var(--osd-font-display)', fontSize: 102, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.035em' }}>
      Why learn harness engineering if Claude Code and Codex already exist?
    </h1>
    <Footer />
  </div>
);

const Page008: Page = () => (
  <div
    data-source-slide-id="odsc_why_harness_02"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '72px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Real-repository evidence
    </div>
    <h1 style={contentTitleStyle}>
      The default harnesses are already good enough to start.
    </h1>

    <div style={{ marginTop: 24, color: muted, fontSize: 25, fontWeight: 650 }}>
      One comparable setup: bash + file editing · up to 500 steps · 512K context
    </div>

    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 58 }}>
      <BenchmarkStack provider="ANTHROPIC STACK" product="Claude Code" model="Claude Opus 4.6" swe="57.3%" terminal="65.4%" color="var(--osd-accent)" />
      <BenchmarkStack provider="OPENAI STACK" product="Codex" model="GPT-5.4" swe="57.7%" terminal="75.1%" color={orange} />
      <BenchmarkStack provider="DEEPSEEK STACK" product="DeepSeek Harness" model="DeepSeek-V4-Pro" swe="55.4%" terminal="67.9%" color={purple} />
    </div>

    <div style={{ position: 'absolute', left: 136, right: 136, bottom: 112, borderTop: '2px solid #C9C1AA', paddingTop: 23, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 52 }}>
      <div style={{ fontSize: 33, fontWeight: 800, lineHeight: 1.2 }}>
        Baseline competence is no longer the interesting question.
      </div>
      <div style={{ maxWidth: 680, color: muted, fontSize: 18, lineHeight: 1.35, textAlign: 'right' }}>
        Models—not branded UIs—run in DeepSeek’s minimal agent harness. Benchmarks contain known task noise; use directionally, not as a product ranking.
      </div>
    </div>
    <Footer />
  </div>
);

const PageModelAgnostic: Page = () => (
  <div
    data-source-slide-id="odsc_model_agnostic_harness"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '82px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 24, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Another reason to understand alternatives
    </div>
    <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--osd-font-display)', fontSize: 82, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.035em' }}>
      The harness should outlive the model.
    </h1>

    <div style={{ marginTop: 74, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 46, textAlign: 'center' }}>
      <div style={{ fontSize: 37, fontWeight: 800, color: 'var(--osd-accent)' }}>Claude</div>
      <div style={{ fontSize: 37, fontWeight: 800, color: orange }}>GPT / Codex</div>
      <div style={{ fontSize: 37, fontWeight: 800, color: purple }}>DeepSeek</div>
      <div style={{ fontSize: 37, fontWeight: 800, color: green }}>Gemini</div>
    </div>
    <div style={{ margin: '30px auto 0', width: 0, height: 0, borderLeft: '24px solid transparent', borderRight: '24px solid transparent', borderTop: '30px solid #A7A6A0' }} />

    <div style={{ marginTop: 32, borderTop: '8px solid var(--osd-accent)', borderBottom: '2px solid #BDB6A3', padding: '34px 48px 38px', textAlign: 'center' }}>
      <div style={{ fontSize: 51, fontWeight: 900, letterSpacing: '-0.02em' }}>YOUR MODEL-AGNOSTIC HARNESS</div>
      <div style={{ marginTop: 20, color: muted, fontSize: 31, fontWeight: 650, wordSpacing: 18 }}>
        tools · memory · policy · evals · workflow
      </div>
    </div>

    <div style={{ marginTop: 45, textAlign: 'center', fontSize: 42, fontWeight: 750 }}>
      Change the model—not the operating system around it.
    </div>
    <Footer />
  </div>
);

const Page009: Page = () => (
  <div
    data-source-slide-id="odsc_why_harness_03"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '94px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <h1 style={{ margin: 0, maxWidth: 1580, fontFamily: 'var(--osd-font-display)', fontSize: 82, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
      But no default harness knows your organization.
    </h1>
    <div style={{ marginTop: 70, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 100px', maxWidth: 1430 }}>
      <div style={{ fontSize: 46, fontWeight: 600 }}>Your systems</div>
      <div style={{ fontSize: 46, fontWeight: 600 }}>Your workflows</div>
      <div style={{ fontSize: 46, fontWeight: 600 }}>Your definition of done</div>
      <div style={{ fontSize: 46, fontWeight: 600 }}>Your risk tolerance</div>
    </div>
    <div style={{ position: 'absolute', left: 136, right: 136, bottom: 104, display: 'flex', alignItems: 'center', gap: 28 }}>
      <div style={{ width: 84, height: 8, background: orange }} />
      <strong style={{ fontSize: 42, fontWeight: 800 }}>That last mile is the harness you still own.</strong>
    </div>
    <Footer />
  </div>
);

const Page010: Page = () => (
  <div
    data-source-slide-id="odsc_why_harness_04"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '88px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 78, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
      Understanding the harness gives you control.
    </h1>
    <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 27 }}>
      <ControlRow label="Outcomes" detail="reliability, verification, recovery" color="var(--osd-accent)" />
      <ControlRow label="Economics" detail="quality per dollar and minute" color={orange} />
      <ControlRow label="Fit" detail="context, tools, memory, workflows" color={green} />
      <ControlRow label="Boundaries" detail="permissions, approvals, audit" color={purple} />
      <ControlRow label="Model choice" detail="swap providers without rebuilding the workflow" color="#27272A" />
    </div>
    <Footer />
  </div>
);

const Page011: Page = () => (
  <div
    data-source-slide-id="odsc_why_harness_05"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '88px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 82, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
      The design space is still moving.
    </h1>
    <div style={{ marginTop: 74, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '68px 100px' }}>
      <Hypothesis name="Hermes" question="Can the harness accumulate skills and memory?" color="var(--osd-accent)" />
      <Hypothesis name="Pi" question="How small and extensible can the loop be?" color={orange} />
      <Hypothesis name="Prime Agent" question="Can the harness modify its own state?" color={purple} />
      <Hypothesis name="DeepSeek Harness" question="Can every component be swappable and traceable?" color={green} />
    </div>
    <Footer />
  </div>
);

const Page012: Page = () => (
  <div
    data-source-slide-id="odsc_why_harness_06"
    style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 136, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 25, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase' }}>The workshop promise</div>
    <h1 style={{ margin: '38px 0 0', maxWidth: 1600, fontFamily: 'var(--osd-font-display)', fontSize: 104, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.038em' }}>
      We are not rebuilding Claude Code.
    </h1>
    <p style={{ margin: '38px 0 0', maxWidth: 1450, color: muted, fontSize: 48, fontWeight: 600, lineHeight: 1.35 }}>
      We are learning the levers that make any harness work.
    </p>
    <Footer />
  </div>
);

const Page013: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-013.png', import.meta.url).href}
    title="Hi, I'm Rajiv, and this is a masterclass on Harnesses."
    sourceId="g39ed7a36e69_0_0"
  />
);

const Page014: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-014.png', import.meta.url).href}
    title="ODSC Workshop · Six Claims on Trial"
    sourceId="odsc_route_slide"
  />
);

const Page015: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-015.png', import.meta.url).href}
    title="Why don’t we just use the default harnesses from Anthropic or OpenAI?"
    sourceId="odsc_claim1_slide"
  />
);

const Page016: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-016.png', import.meta.url).href}
    title="What we want to dig into today"
    sourceId="g3f8b010c3e0_1_8"
  />
);

const Page017: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-017.png', import.meta.url).href}
    title="Same model, 2× performance gap"
    sourceId="g3cfee166b75_1_241"
  />
);

const Page018: Page = () => (
  <div
    data-source-slide-id="g3d905d80d69_0_12"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '54px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Terminal-Bench 2.0 · official leaderboard · filtered view
    </div>
    <h1 style={contentTitleStyle}>
      Same model. Five harnesses. An 18-point spread.
    </h1>

    <div style={{ position: 'absolute', left: 136, right: 136, top: 215, height: 592, overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.14)' }}>
      <img
        src={new URL('./assets/terminal-bench-2-claude-opus-4-6.png', import.meta.url).href}
        alt="Terminal-Bench 2.0 filtered leaderboard for Claude Opus 4.6 across five harnesses"
        style={{ position: 'absolute', left: 0, top: -430, width: '100%', height: 'auto', display: 'block' }}
      />
      <div style={{ position: 'absolute', left: 42, right: 42, top: 173, height: 62, boxSizing: 'border-box', border: '5px solid var(--osd-accent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 42, right: 42, top: 420, height: 63, boxSizing: 'border-box', border: '5px solid var(--osd-accent)', pointerEvents: 'none' }} />
    </div>

    <div style={{ position: 'absolute', left: 136, right: 136, bottom: 76, display: 'grid', gridTemplateColumns: '420px 1fr', gap: 46, alignItems: 'center' }}>
      <div style={{ color: 'var(--osd-accent)', fontSize: 78, fontWeight: 920, lineHeight: 0.92, letterSpacing: '-0.045em' }}>18.4 pts</div>
      <div style={{ borderLeft: '3px solid #C9C1AA', paddingLeft: 42, fontSize: 31, fontWeight: 760, lineHeight: 1.25 }}>
        Meta-Harness: 76.4% <span style={{ color: muted }}>→</span> Claude Code: 58.0%
        <div style={{ marginTop: 8, color: muted, fontSize: 22, fontWeight: 650 }}>Same Claude Opus 4.6 model · cost not reported in 2.0</div>
      </div>
    </div>
    <Footer />
  </div>
);

const Page019: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-019.png', import.meta.url).href}
    title="AutoHarness: https://arxiv.org/pdf/2508.07995\u000bMeta-Harness: https://yoonholee.com/meta-harness/"
    sourceId="g3c5632f9dff_0_1"
  />
);

const Page020: Page = () => (
  <div
    data-source-slide-id="harness-bench-paper-slide"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '54px 100px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Harness-Bench · 106 tasks · 5,194 trajectories
    </div>
    <h1 style={contentTitleStyle}>
      Harness choice changes the whole operating profile.
    </h1>
    <p style={{ margin: '17px 0 0', color: muted, fontSize: 30, fontWeight: 650, lineHeight: 1.25 }}>
      Completion, process quality, token use, and turns all move together.
    </p>

    <div style={{ position: 'absolute', left: 90, top: 276, width: 1340, height: 574, overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)' }}>
      <img
        src={new URL('./assets/harness-bench-paper-table.png', import.meta.url).href}
        alt="Harness-Bench paper table comparing completion, process quality, tokens, and turns across six configurable harnesses and Codex"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>

    <div style={{ position: 'absolute', left: 1490, right: 90, top: 322 }}>
      <div style={{ borderTop: '7px solid var(--osd-accent)', paddingTop: 20 }}>
        <div style={{ color: muted, fontSize: 23, fontWeight: 850, letterSpacing: '0.08em' }}>CONFIGURABLE HARNESSES</div>
        <div style={{ marginTop: 9, color: 'var(--osd-accent)', fontSize: 82, fontWeight: 900, lineHeight: 0.96, letterSpacing: '-0.055em' }}>23.8</div>
        <div style={{ marginTop: 11, fontSize: 28, fontWeight: 760, lineHeight: 1.22 }}>point score spread</div>
        <div style={{ marginTop: 8, color: muted, fontSize: 22, fontWeight: 650, lineHeight: 1.3 }}>NanoBot 76.2<br />OpenClaw 52.4</div>
      </div>
      <div style={{ marginTop: 58, borderTop: '2px solid #C9C1AA', paddingTop: 20 }}>
        <div style={{ fontSize: 30, fontWeight: 830, lineHeight: 1.18 }}>Measure the pair:</div>
        <div style={{ marginTop: 7, color: 'var(--osd-accent)', fontSize: 31, fontWeight: 850, lineHeight: 1.18 }}>model + harness</div>
        <div style={{ marginTop: 12, color: muted, fontSize: 20, fontWeight: 650, lineHeight: 1.35 }}>Codex is reported separately because it is model-bound.</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 100, bottom: 88, color: muted, fontSize: 19, fontWeight: 650 }}>
      Source: Yao et al., Harness-Bench, arXiv:2605.27922v1 (2026) · Table 2
    </div>
    <Footer />
  </div>
);

const Page021: Page = () => (
  <div
    data-source-slide-id="sf01_slide"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '54px 100px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Snowflake data-eng-bench · 103 repository-level tasks
    </div>
    <h1 style={contentTitleStyle}>
      A data-native harness moves the frontier.
    </h1>
    <p style={{ margin: '17px 0 0', color: muted, fontSize: 32, fontWeight: 650, lineHeight: 1.25 }}>
      Same models, same tasks—higher quality at lower cost.
    </p>

    <div style={{ position: 'absolute', left: 90, top: 252, width: 1190, height: 737, overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)' }}>
      <img
        src={new URL('./assets/snowflake-data-eng-bench-cost-quality.png', import.meta.url).href}
        alt="Snowflake data-eng-bench chart comparing Pass at 1 with cost per trial for CoCo, Claude Code, and Codex"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>

    <div style={{ position: 'absolute', left: 1345, right: 90, top: 310 }}>
      <div style={{ borderTop: '6px solid #29A9E0', paddingTop: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 850, color: muted }}>OPUS 5</div>
        <div style={{ marginTop: 8, fontSize: 42, fontWeight: 880, lineHeight: 1.08 }}>+4 pp quality</div>
        <div style={{ marginTop: 5, fontSize: 31, fontWeight: 760, color: '#29A9E0' }}>3.9× lower cost</div>
      </div>
      <div style={{ marginTop: 54, borderTop: '2px solid #C9C1AA', paddingTop: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 850, color: muted }}>GPT-5.6 SOL</div>
        <div style={{ marginTop: 8, fontSize: 42, fontWeight: 880, lineHeight: 1.08 }}>+3.6 pp quality</div>
        <div style={{ marginTop: 5, fontSize: 31, fontWeight: 760, color: '#29A9E0' }}>1.5× lower cost</div>
      </div>
      <div style={{ marginTop: 54, borderTop: '2px solid #C9C1AA', paddingTop: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 850, color: muted }}>SONNET 5</div>
        <div style={{ marginTop: 8, fontSize: 42, fontWeight: 880, lineHeight: 1.08 }}>Same quality</div>
        <div style={{ marginTop: 5, fontSize: 31, fontWeight: 760, color: '#29A9E0' }}>2.3× lower cost</div>
      </div>
      <div style={{ marginTop: 54, color: muted, fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>Snowflake AI Research · Aug. 6, 2026<br />Vendor-authored benchmark</div>
    </div>
    <Footer />
  </div>
);

const Page022: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-022.png', import.meta.url).href}
    title="arXiv 2607.06906"
    sourceId="ru01_slide"
  />
);

const Page023: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-023.png', import.meta.url).href}
    title="arXiv 2608.08654"
    sourceId="ru02_slide"
  />
);

const Page024: Page = () => (
  <div
    data-source-slide-id="ru03_slide"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '54px 136px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      OpenBench · GPT-5.6 · 42 common task/trials
    </div>
    <h1 style={{ ...contentTitleStyle, whiteSpace: 'nowrap' }}>
      Same model. Seven harnesses. Seven profiles.
    </h1>
    <div style={{ marginTop: 13, color: muted, fontSize: 25, fontWeight: 700 }}>11.9-point solve-rate spread · 21× fresh-token spread</div>

    <div style={{ position: 'absolute', left: 92, right: 92, top: 250, bottom: 76, overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.14)' }}>
      <img
        src={new URL('./assets/openbench-gpt-5-6-complete.png', import.meta.url).href}
        alt="Official OpenBench GPT-5.6 comparison across seven coding-agent harnesses"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <Footer />
  </div>
);

const Page025: Page = () => (
  <div
    data-source-slide-id="ru04_slide"
    style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '54px 100px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      ARC-AGI-3 public set · same GPT-5.6 Sol model
    </div>
    <h1 style={contentTitleStyle}>
      Two harness settings raised the score from <span style={{ color: 'var(--osd-accent)' }}>13% to 38%.</span>
    </h1>
    <p style={{ margin: '17px 0 0', color: muted, fontSize: 29, fontWeight: 680, lineHeight: 1.25 }}>
      OpenAI kept GPT-5.6 Sol and the public ARC-AGI-3 tasks fixed.
    </p>

    <div style={{ position: 'absolute', left: 118, right: 118, top: 320, display: 'grid', gridTemplateColumns: '1fr 390px 1fr', alignItems: 'center', gap: 48 }}>
      <div>
        <div style={{ color: orange, fontSize: 24, fontWeight: 900, letterSpacing: '0.11em' }}>GENERIC HARNESS</div>
        <div style={{ marginTop: 18, fontSize: 150, fontWeight: 940, lineHeight: 0.88, letterSpacing: '-0.075em' }}>13.3%</div>
        <div style={{ marginTop: 26, color: muted, fontSize: 31, fontWeight: 740 }}>Forgets earlier reasoning</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ color: purple, fontSize: 21, fontWeight: 900, letterSpacing: '0.1em' }}>CHANGE THE HARNESS</div>
        <div style={{ marginTop: 2, color: purple, fontSize: 122, fontWeight: 700, lineHeight: 0.95 }}>→</div>
        <div style={{ marginTop: 16, borderTop: `4px solid ${purple}`, paddingTop: 19, fontSize: 28, fontWeight: 820, lineHeight: 1.45 }}>
          Keep private reasoning<br />Compact, don’t truncate
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ color: 'var(--osd-accent)', fontSize: 24, fontWeight: 900, letterSpacing: '0.11em' }}>CUSTOM HARNESS</div>
        <div style={{ marginTop: 18, color: 'var(--osd-accent)', fontSize: 150, fontWeight: 940, lineHeight: 0.88, letterSpacing: '-0.075em' }}>38.3%</div>
        <div style={{ marginTop: 26, color: 'var(--osd-text)', fontSize: 31, fontWeight: 820 }}>Keeps learning across turns</div>
      </div>
    </div>

    <div style={{ position: 'absolute', left: 118, right: 118, bottom: 105, borderTop: '3px solid #C9C1AA', paddingTop: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{ fontSize: 38, fontWeight: 850 }}>
        ≈3× the score
      </div>
      <div style={{ color: purple, fontSize: 38, fontWeight: 850 }}>
        ≈6× fewer output tokens
      </div>
      <div style={{ maxWidth: 470, color: muted, fontSize: 19, fontWeight: 650, lineHeight: 1.35 }}>Public interactive-game tasks · vendor-authored experiment</div>
    </div>
    <Footer />
  </div>
);

const Page026: Page = () => (
  <div
    data-source-slide-id="ru05_slide"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '54px 100px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: '#568900', fontSize: 22, fontWeight: 900, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      NVIDIA AVO · seven-day autonomous optimization run
    </div>
    <h1 style={{ ...contentTitleStyle, whiteSpace: 'nowrap' }}>
      NVIDIA's harness kept improving kernels for <span style={{ color: '#568900' }}>seven days.</span>
    </h1>
    <p style={{ margin: '17px 0 0', color: muted, fontSize: 29, fontWeight: 680, lineHeight: 1.25 }}>
      It explored more than 500 directions and beat FlashAttention-4 by up to 10.5%.
    </p>

    <div style={{ position: 'absolute', left: 86, top: 250, width: 1268, height: 656, overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D6D6D0', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.14)' }}>
      <img
        src={new URL('./assets/nvidia-avo-architecture.webp', import.meta.url).href}
        alt="NVIDIA diagram showing the AVO agentic variation loop, persistent memory, evaluation, repair, and supervisor intervention"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>

    <div style={{ position: 'absolute', left: 1415, right: 92, top: 254 }}>
      <div style={{ borderTop: '8px solid #76B900', paddingTop: 18 }}>
        <div style={{ color: '#568900', fontSize: 96, fontWeight: 940, lineHeight: 0.88, letterSpacing: '-0.065em' }}>7 days</div>
        <div style={{ marginTop: 13, fontSize: 26, fontWeight: 820, lineHeight: 1.2 }}>of continuous search</div>
      </div>

      <div style={{ marginTop: 44, borderTop: '2px solid #C9C1AA', paddingTop: 18, display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <div style={{ color: 'var(--osd-accent)', fontSize: 70, fontWeight: 930, lineHeight: 0.9, letterSpacing: '-0.055em' }}>500+</div>
        <div style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.12 }}>directions<br />explored</div>
      </div>

      <div style={{ marginTop: 52, borderTop: '2px solid #C9C1AA', paddingTop: 22 }}>
        <div style={{ color: orange, fontSize: 82, fontWeight: 930, lineHeight: 0.9, letterSpacing: '-0.055em' }}>+10.5%</div>
        <div style={{ marginTop: 9, fontSize: 23, fontWeight: 800, lineHeight: 1.18 }}>faster than FlashAttention-4<br /><span style={{ color: muted, fontSize: 19, fontWeight: 650 }}>at best evaluated configuration</span></div>
      </div>
    </div>

    <div style={{ position: 'absolute', left: 100, right: 100, bottom: 76, display: 'grid', gridTemplateColumns: '1fr 470px', gap: 46, alignItems: 'center', borderTop: '3px solid #C9C1AA', paddingTop: 17 }}>
      <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
        Persistent memory preserved the search. <span style={{ color: '#568900' }}>The supervisor redirected it when progress stalled.</span>
      </div>
      <div style={{ color: muted, fontSize: 18, fontWeight: 650, lineHeight: 1.35 }}>
        DGX B200 attention-kernel study · vendor-authored result<br />Reported improvement is “up to,” not an across-the-board average.
      </div>
    </div>
    <Footer />
  </div>
);

const Page027: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-027.png', import.meta.url).href}
    title="Uber Engineering, Aug. 27, 2026"
    sourceId="uber01_slide"
  />
);

const Page028: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-028.png', import.meta.url).href}
    title="What harness do you use?"
    sourceId="g3e65b4f6e49_0_0"
  />
);

const PageWorkshopHarnessComparison: Page = () => (
  <div
    data-source-slide-id="odsc_workshop_01_harness_comparison"
    style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 118px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
      Workshop 1 · Controlled comparison
    </div>
    <h1 style={contentTitleStyle}>
      Same model. Same task. <span style={{ color: 'var(--osd-accent)' }}>Different harness.</span>
    </h1>
    <p style={{ margin: '18px 0 0', color: muted, fontSize: 30, fontWeight: 680 }}>
      Predict the winner—then inspect the trace.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '355px 1fr', gap: 64, marginTop: 48 }}>
      <div style={{ borderTop: '5px solid var(--osd-accent)', paddingTop: 22 }}>
        <div style={{ color: 'var(--osd-accent)', fontSize: 20, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Hold constant</div>
        {['Model + settings', 'Repository state', 'Task + verifier', 'Runtime environment'].map((item) => (
          <div key={item} style={{ display: 'flex', gap: 16, alignItems: 'center', minHeight: 62, borderBottom: '1px solid #D5CEBB', fontSize: 25, fontWeight: 720 }}>
            <span style={{ color: 'var(--osd-accent)', fontWeight: 950 }}>✓</span>
            {item}
          </div>
        ))}
        <div style={{ marginTop: 30, color: muted, fontSize: 21, fontWeight: 700, lineHeight: 1.35 }}>
          Change one variable:<br />
          <span style={{ color: 'var(--osd-text)', fontSize: 31, fontWeight: 900 }}>the harness</span>
        </div>
      </div>

      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '210px 1.15fr 1fr 0.9fr 0.9fr 0.75fr', columnGap: 14, alignItems: 'end', minHeight: 56, borderBottom: '3px solid var(--osd-text)', color: muted, fontSize: 17, fontWeight: 900, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          <div>Harness</div>
          <div>Outcome</div>
          <div>Tool calls</div>
          <div>Tokens</div>
          <div>Time</div>
          <div>Cost</div>
        </div>
        {[
          ['OpenHands', purple],
          ['Pi', 'var(--osd-accent)'],
          ['OpenCode', orange],
        ].map(([name, color]) => (
          <div key={name} style={{ display: 'grid', gridTemplateColumns: '210px 1.15fr 1fr 0.9fr 0.9fr 0.75fr', columnGap: 14, alignItems: 'center', minHeight: 100, borderBottom: '2px solid #C9C1AA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 29, fontWeight: 880 }}>
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: color }} />
              {name}
            </div>
            {['measure', 'inspect', 'count', 'time', 'price'].map((label) => (
              <div key={label} style={{ color: muted, fontSize: 20, fontWeight: 720 }}>{label}</div>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div style={{ position: 'absolute', left: 118, right: 118, bottom: 72, borderTop: '2px solid #C9C1AA', paddingTop: 22, fontSize: 30, fontWeight: 800 }}>
      Which differences came from the model—and which came from the <span style={{ color: 'var(--osd-accent)', fontWeight: 950 }}>harness?</span>
    </div>
    <Footer />
  </div>
);

const PageWorkshopShortSuiteResults: Page = () => (
  <div
    data-source-slide-id="odsc_workshop_01_short_suite_results"
    style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '64px 118px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 21, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Workshop 1 · Result reveal</div>
    <h1 style={contentTitleStyle}>
      Correctness tied. <span style={{ color: 'var(--osd-accent)' }}>Compute did not.</span>
    </h1>
    <div style={{ marginTop: 15, color: muted, fontSize: 25, fontWeight: 680 }}>GLM-5.2 · eight short repository tasks · same environment and verifier · no repair rounds</div>

    <div style={{ marginTop: 42, borderBottom: '3px solid var(--osd-text)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 155px 180px 250px 230px 190px 170px', gap: 16, alignItems: 'end', minHeight: 58, borderBottom: '3px solid var(--osd-text)', color: muted, fontSize: 17, fontWeight: 900, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        <div>Harness</div><div>Passed</div><div>Model calls</div><div>Input context</div><div>Context / call</div><div>Elapsed</div><div>Cost</div>
      </div>
      {[
        ['Pi', '8 / 8', '85', '573K', '6.7K', '11.3 min', '$0.33', 'var(--osd-accent)'],
        ['OpenCode', '8 / 8', '100', '1.23M', '12.3K', '14.0 min', '$0.57', orange],
        ['OpenHands', '8 / 8', '113', '3.03M', '26.8K', '19.0 min', '$1.25', purple],
      ].map(([name, passed, calls, input, perCall, elapsed, cost, color]) => (
        <div key={name} style={{ display: 'grid', gridTemplateColumns: '260px 155px 180px 250px 230px 190px 170px', gap: 16, alignItems: 'center', minHeight: 116, borderBottom: '1px solid #C9C1AA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 900 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />{name}</div>
          <div style={{ fontSize: 29, fontWeight: 880 }}>{passed}</div>
          <div style={{ fontSize: 29, fontWeight: 760 }}>{calls}</div>
          <div style={{ fontSize: 34, fontWeight: 900 }}>{input}</div>
          <div style={{ fontSize: 29, fontWeight: 760 }}>{perCall}</div>
          <div style={{ fontSize: 29, fontWeight: 760 }}>{elapsed}</div>
          <div style={{ color, fontSize: 38, fontWeight: 950 }}>{cost}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'baseline', gap: 44, marginTop: 34 }}>
      <div style={{ color: purple, fontSize: 55, fontWeight: 950, letterSpacing: '-0.04em' }}>5.3× context</div>
      <div style={{ color: orange, fontSize: 55, fontWeight: 950, letterSpacing: '-0.04em' }}>3.7× cost</div>
      <div style={{ color: muted, fontSize: 23, fontWeight: 720 }}>OpenHands versus Pi</div>
    </div>
    <div style={{ position: 'absolute', left: 118, bottom: 58, color: muted, fontSize: 18 }}>Provider-returned usage · 298 complete model-call records · one trial per task/harness</div>
    <Footer />
  </div>
);

const PageWorkshopIncidentResults: Page = () => (
  <div
    data-source-slide-id="odsc_workshop_01_incident_results"
    style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '64px 118px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: orange, fontSize: 21, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Workshop 1 · The task changes the ranking</div>
    <h1 style={contentTitleStyle}>
      On the longer task, <span style={{ color: orange }}>OpenCode became the efficiency winner.</span>
    </h1>
    <div style={{ marginTop: 15, color: muted, fontSize: 25, fontWeight: 680 }}>GLM-5.2 · incident-operations project · same corrected contract · no repair feedback</div>

    <div style={{ marginTop: 43, borderBottom: '3px solid var(--osd-text)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 250px 185px 190px 250px 230px 170px', gap: 16, alignItems: 'end', minHeight: 58, borderBottom: '3px solid var(--osd-text)', color: muted, fontSize: 17, fontWeight: 900, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        <div>Harness</div><div>Verified behavior</div><div>Elapsed</div><div>Calls</div><div>Context / call</div><div>Input context</div><div>Cost</div>
      </div>
      {[
        ['OpenCode', '8 / 8', '17m 40s', '76', '36.1K', '2.75M', '$0.77', orange],
        ['Pi', '7 / 8', '20m 21s', '69', '45.9K', '3.16M', '$1.05', 'var(--osd-accent)'],
        ['OpenHands', 'passed*', '26m 42s', '95', '71.2K', '6.76M', '$2.61', purple],
      ].map(([name, quality, elapsed, calls, perCall, input, cost, color]) => (
        <div key={name} style={{ display: 'grid', gridTemplateColumns: '250px 250px 185px 190px 250px 230px 170px', gap: 16, alignItems: 'center', minHeight: 116, borderBottom: '1px solid #C9C1AA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 900 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />{name}</div>
          <div style={{ fontSize: 29, fontWeight: 880 }}>{quality}</div>
          <div style={{ fontSize: 28, fontWeight: 760 }}>{elapsed}</div>
          <div style={{ fontSize: 29, fontWeight: 760 }}>{calls}</div>
          <div style={{ fontSize: 31, fontWeight: 850 }}>{perCall}</div>
          <div style={{ fontSize: 34, fontWeight: 900 }}>{input}</div>
          <div style={{ color, fontSize: 38, fontWeight: 950 }}>{cost}</div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 34, fontSize: 31, fontWeight: 850 }}>
      Fewer calls did not win: <span style={{ color: orange }}>context per call reversed the result.</span>
    </div>
    <div style={{ marginTop: 11, color: muted, fontSize: 21, fontWeight: 680 }}>* OpenHands satisfied the specified behavior; the original verifier assumed an unstated return type. Pi’s remaining browser-marker failure was real.</div>
    <Footer />
  </div>
);

const Page029: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-029.png', import.meta.url).href}
    title="https://fieldjournal.ai/blog/codex-cli-vs-claude-code/?utm_source=chatgpt.com"
    sourceId="g3d905d80d69_0_21"
  />
);

const Page030: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-030.png', import.meta.url).href}
    title="Harnesses carry technical debt"
    sourceId="g3db4861fd98_1_0"
  />
);

const PageTechnicalDebtScale: Page = () => (
  <SourcePage
    src={new URL('./assets/production-coding-agents-pr-volume.png', import.meta.url).href}
    title="Production coding agents demand thousands of pull requests"
    sourceId="technical-debt-scale-slide"
  />
);

const Page031: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-031.png', import.meta.url).href}
    title="Harnesses are evolving with the models."
    sourceId="g3de63a76480_0_0"
  />
);

const Page032: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-032.png', import.meta.url).href}
    title="Source: Dan McAteer, Latent.Space, Aug. 22, 2026"
    sourceId="ai03_slide"
  />
);

const Page033: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-033.png', import.meta.url).href}
    title="As models improved, who has noticed the trend towards shorter system prompts?"
    sourceId="g397b4ac3620_0_36"
  />
);

const Page034: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-034.png', import.meta.url).href}
    title="https://github.com/rajshah4/harness-engineering"
    sourceId="g3d8a54bbd6a_2_8"
  />
);

const Page035: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-035.png', import.meta.url).href}
    title="Claude Code Harness / Architecture"
    sourceId="g3d8a54bbd6a_2_0"
  />
);

const Page036: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-036.png', import.meta.url).href}
    title="Harnesses have bugs"
    sourceId="g3d8f41c091e_0_0"
  />
);

const PageLangChainLeanHarness: Page = () => (
  <div data-source-slide-id="odsc_langchain_deep_agents_v07" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '70px 118px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>LangChain Deep Agents v0.7 · July 2026</div>
    <h1 style={contentTitleStyle}>A stronger model may need <span style={{ color: 'var(--osd-accent)' }}>less harness.</span></h1>
    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 92, alignItems: 'center', marginTop: 60 }}>
      <div>
        <div style={{ color: 'var(--osd-accent)', fontSize: 156, fontWeight: 950, lineHeight: 0.82, letterSpacing: '-0.07em' }}>65%</div>
        <div style={{ marginTop: 31, fontSize: 32, fontWeight: 850 }}>fewer base input tokens</div>
        <div style={{ marginTop: 13, color: muted, fontSize: 25, fontWeight: 700 }}>about 6K → 2K per default-agent turn</div>
        <div style={{ marginTop: 38, borderLeft: '5px solid var(--osd-accent)', paddingLeft: 25, color: muted, fontSize: 24, fontWeight: 680, lineHeight: 1.35 }}>Overall reward held steady across autonomous, conversational, and long-context evals.</div>
      </div>
      <div>
        {[
          ['Removed', 'the base system prompt'],
          ['Trimmed 43%', 'from built-in tool descriptions'],
          ['Made optional', 'the planning prompt + todo tool'],
        ].map(([action, detail], index) => (
          <div key={action} style={{ display: 'grid', gridTemplateColumns: '75px 220px 1fr', gap: 24, alignItems: 'center', minHeight: 116, borderTop: index === 0 ? '3px solid #BDB6A4' : '1px solid #D4CDB8' }}>
            <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 950 }}>0{index + 1}</div>
            <div style={{ fontSize: 30, fontWeight: 900 }}>{action}</div>
            <div style={{ color: muted, fontSize: 27, fontWeight: 680 }}>{detail}</div>
          </div>
        ))}
        <div style={{ marginTop: 30, borderTop: '3px solid var(--osd-accent)', paddingTop: 22, fontSize: 30, fontWeight: 850 }}>The harness is a hypothesis. <span style={{ color: 'var(--osd-accent)' }}>Re-evaluate it for every model generation.</span></div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 260, bottom: 55, color: muted, fontSize: 18 }}>LangChain · model-level results varied; reward confidence intervals included zero</div>
    <Footer />
  </div>
);

const Page037: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-037.png', import.meta.url).href}
    title="Erik Schluntz | Fireworks AI"
    sourceId="ru06_slide"
  />
);

const Page038: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-038.png', import.meta.url).href}
    title="Florian Brand and Prime Intellect, Aug. 25, 2026"
    sourceId="pi01_slide"
  />
);

const Page039: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-039.png', import.meta.url).href}
    title="Do you need an MCP—or was the terminal already enough?"
    sourceId="odsc_claim2_slide"
  />
);

const Page040: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-040.png', import.meta.url).href}
    title="The 5 Levers of Harness Engineering"
    sourceId="g3cfee166b75_1_38"
  />
);

const Page041: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-041.png', import.meta.url).href}
    title="Let's start with how agents find what they need."
    sourceId="g3cfee166b75_1_235"
  />
);

const Page042: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-042.png', import.meta.url).href}
    title="BM25"
    sourceId="g39be7a095fc_0_162"
  />
);

const Page043: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-043.png', import.meta.url).href}
    title="Keyword precision"
    sourceId="g3dcbc7569e8_0_0"
  />
);

const Page044: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-044.png', import.meta.url).href}
    title="State-of-the-Art Coding Agents rely on grep"
    sourceId="g3cfee166b75_1_120"
  />
);

const Page045: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-045.png', import.meta.url).href}
    title="You don't need a vector database to search code. "
    sourceId="g39be7a095fc_0_351"
  />
);

const Page046: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-046.png', import.meta.url).href}
    title="Provides a retrieval "
    sourceId="g39a4dbe6b55_1_0"
  />
);

const Page047: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-047.png', import.meta.url).href}
    title="Takeaway:"
    sourceId="g39be7a095fc_0_360"
  />
);

const Page048: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-048.png', import.meta.url).href}
    title="Embeddings solve for meaning."
    sourceId="g39be7a095fc_0_368"
  />
);

const Page049: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-049.png', import.meta.url).href}
    title="https://cursor.com/blog/semsearch"
    sourceId="g3cfee166b75_1_127"
  />
);

const Page050: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-050.png', import.meta.url).href}
    title="Who is using Agentic Search?"
    sourceId="g397b4ac3620_0_44"
  />
);

const Page051: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-051.png', import.meta.url).href}
    title="Agentic RAG"
    sourceId="g37c0af961f8_0_26"
  />
);

const Page052: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-052.png', import.meta.url).href}
    title="Agentic Search trades latency for massive accuracy."
    sourceId="g3cfee166b75_1_114"
  />
);

const Page053: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-053.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2603.20432"
    sourceId="g3cfee166b75_1_294"
  />
);

const Page054: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-054.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2603.12180"
    sourceId="g3d44b251a59_0_0"
  />
);

const Page055: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-055.png', import.meta.url).href}
    title="Brian Sam-Bodden | arXiv 2607.09691"
    sourceId="addy01_slide"
  />
);

const Page056: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-056.png', import.meta.url).href}
    title="Uber Engineering, Aug. 27, 2026"
    sourceId="uber02_slide"
  />
);

const Page057: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-057.png', import.meta.url).href}
    title="So when should you move to a database"
    sourceId="g3dd4ca5b693_0_0"
  />
);

const Page058: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-058.png', import.meta.url).href}
    title="Lexical for Small Set of Files: BM25 / grep is your baseline."
    sourceId="g3d1aca74b23_0_16"
  />
);

const Page059: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-059.png', import.meta.url).href}
    title="Anthropic large-codebase guidance"
    sourceId="ru07_slide"
  />
);

const Page060: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-060.png', import.meta.url).href}
    title="What should the agent remember?"
    sourceId="odsc_claim3_slide"
  />
);

const Page061: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-061.png', import.meta.url).href}
    title="Let's start with how agents find what they need."
    sourceId="g3e01059221c_0_0"
  />
);

const Page062: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-062.png', import.meta.url).href}
    title="Are you excited about 10M Context Windows?"
    sourceId="g397b4ac3620_0_51"
  />
);

const Page063: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-063.png', import.meta.url).href}
    title="Memory & State"
    sourceId="g3c599fa5093_0_4"
  />
);

const Page064: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-064.png', import.meta.url).href}
    title="1M Context Windows are never enough."
    sourceId="g39be7a095fc_0_99"
  />
);

const Page065: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-065.png', import.meta.url).href}
    title="https://claude.com/blog/1m-context-ga"
    sourceId="g3d9a801183a_4_2"
  />
);

const Page066: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-066.png', import.meta.url).href}
    title="https://www.linkedin.com/posts/sinan-ozdemir_agenticai-llm-rag-ugcPost-7428125462201102336-B7Br"
    sourceId="g3beb73bb0f4_0_0"
  />
);

const Page067: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-067.png', import.meta.url).href}
    title="https://arxiv.org/abs/2505.06120"
    sourceId="g3df292933d5_1_0"
  />
);

const Page068: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-068.png', import.meta.url).href}
    title="When 100s of lines of warning push the real goal out of the agent's context window."
    sourceId="g3c5632f9dff_0_149"
  />
);

const Page069: Page = () => (
  <div data-source-slide-id="odsc_context_placement_frame" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '70px 118px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Context placement—not “three kinds of memory”</div>
    <h1 style={contentTitleStyle}>Not everything you save is memory.</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 38, marginTop: 54 }}>
      {[
        ['01', 'Active context', 'What the model sees now', ['Prompt', 'Retrieved snippets', 'Current observations'], 'Every model call', 'var(--osd-accent)'],
        ['02', 'Working state', 'What lets the task resume', ['Plan + TODOs', 'Checkpoints', 'Evidence gathered'], 'Across turns + interruptions', orange],
        ['03', 'Durable knowledge', 'What should transfer', ['Skills', 'Project rules', 'Reusable procedures'], 'Across sessions', purple],
      ].map(([number, title, purpose, examples, lifetime, color]) => (
        <div key={title as string} style={{ minHeight: 470, borderTop: `8px solid ${color}`, padding: '27px 30px 24px', background: '#FFFFFF', boxShadow: '0 12px 30px rgba(35, 29, 17, 0.08)' }}>
          <div style={{ color: color as string, fontSize: 22, fontWeight: 950 }}>{number as string}</div>
          <div style={{ marginTop: 28, fontSize: 42, fontWeight: 920, lineHeight: 1.05 }}>{title as string}</div>
          <div style={{ marginTop: 17, color: muted, fontSize: 25, fontWeight: 720, lineHeight: 1.28 }}>{purpose as string}</div>
          <div style={{ marginTop: 28, borderTop: '1px solid #D5CEBB' }}>
            {(examples as string[]).map((example) => <div key={example} style={{ minHeight: 48, display: 'flex', alignItems: 'center', gap: 13, borderBottom: '1px solid #E2DCCB', fontSize: 22, fontWeight: 700 }}><span style={{ color: color as string }}>●</span>{example}</div>)}
          </div>
          <div style={{ marginTop: 25, color: color as string, fontSize: 20, fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{lifetime as string}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 38, borderTop: '3px solid var(--osd-text)', paddingTop: 23, fontSize: 34, fontWeight: 850 }}>If a requirement must never drift, <span style={{ color: 'var(--osd-accent)' }}>enforce it outside the model.</span></div>
    <Footer />
  </div>
);

const PageContextPlacementDecision: Page = () => (
  <div data-source-slide-id="odsc_context_placement_decision" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 118px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Workshop decision · place before you prompt</div>
    <h1 style={contentTitleStyle}>Give each fact the smallest durable home it needs.</h1>
    <div style={{ marginTop: 42, borderBottom: '3px solid var(--osd-text)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.25fr 1.25fr', gap: 34, minHeight: 55, alignItems: 'center', borderBottom: '3px solid var(--osd-text)', color: muted, fontSize: 18, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}><div>Information</div><div>Best home</div><div>Why</div></div>
      {[
        ['Stable project rule', 'Project policy / AGENTS.md', 'Load early; review like code'],
        ['Reusable procedure', 'Skill, loaded on demand', 'Do not pay every turn'],
        ['Current plan + evidence', 'Working-state checkpoint', 'Resume without the transcript'],
        ['Code fact found once', 'Retrieve it again', 'The repository can change'],
        ['Security / acceptance rule', 'Permission, test, or verifier', 'Instructions are not enforcement'],
        ['Stale warning or dead branch', 'Delete it', 'Saved context can make the agent worse'],
      ].map(([information, home, why], index) => (
        <div key={information} style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.25fr 1.25fr', gap: 34, minHeight: 93, alignItems: 'center', borderBottom: '1px solid #C9C1AA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, fontSize: 25, fontWeight: 820 }}><span style={{ color: index === 5 ? orange : 'var(--osd-accent)', fontSize: 18 }}>●</span>{information}</div>
          <div style={{ color: index === 5 ? orange : 'var(--osd-accent)', fontSize: 27, fontWeight: 900 }}>{home}</div>
          <div style={{ color: muted, fontSize: 24, fontWeight: 700 }}>{why}</div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

const Page070: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-070.png', import.meta.url).href}
    title="Layer 1: Fixing Active Context"
    sourceId="g3dcbc7569e8_0_30"
  />
);

const Page071: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-071.png', import.meta.url).href}
    title="Layer 1: Compacting from OpenHands"
    sourceId="g3d47ed0641e_0_13"
  />
);

const Page072: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-072.png', import.meta.url).href}
    title="Layer 1: How does Codex do it???"
    sourceId="g3e663996cbe_0_0"
  />
);

const Page073: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-073.png', import.meta.url).href}
    title="Codex discussion #12567 | Memory internals analysis"
    sourceId="ru08_slide"
  />
);

const Page074: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-074.png', import.meta.url).href}
    title="https://x.com/trq212/status/2044548257058328723"
    sourceId="g39755a537a6_0_0"
  />
);

const Page075: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-075.png', import.meta.url).href}
    title="Files make better memory than chat. "
    sourceId="g3cfee166b75_1_2"
  />
);

const Page076: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-076.png', import.meta.url).href}
    title="YC-Bench"
    sourceId="ru09_slide"
  />
);

const Page077: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-077.png', import.meta.url).href}
    title="Vending-Bench"
    sourceId="ru10_slide"
  />
);

const Page078: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-078.png', import.meta.url).href}
    title="LangChain’s Deep Agents"
    sourceId="g3d46df1fe5c_0_10"
  />
);

const Page079: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-079.png', import.meta.url).href}
    title="RLMs bypass token limits entirely by using a persistent Python REPL to manage their state and call sub-LLMs."
    sourceId="g3da299f8d9f_0_31"
  />
);

const Page080: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-080.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2512.24601v1"
    sourceId="g3d49731cfe2_0_0"
  />
);

const Page081: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-081.png', import.meta.url).href}
    title="Layer 3: Durable Memory"
    sourceId="g3c5632f9dff_0_156"
  />
);

const Page082: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-082.png', import.meta.url).href}
    title="Who uses an Agents.md file?"
    sourceId="g3e65b4f6e49_0_6"
  />
);

const Page083: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-083.png', import.meta.url).href}
    title="Durable Memory with Agents.md"
    sourceId="g38b6812626f_0_0"
  />
);

const Page084: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-084.png', import.meta.url).href}
    title="Auto-generated AGENTS.md files hurt performance"
    sourceId="g3de63a76480_0_55"
  />
);

const Page085: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-085.png', import.meta.url).href}
    title="Santos et al. | arXiv 2606.15828"
    sourceId="addy02_slide"
  />
);

const Page086: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-086.png', import.meta.url).href}
    title="Prakhar Khatri | arXiv 2607.27250"
    sourceId="addy03_slide"
  />
);

const Page087: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-087.png', import.meta.url).href}
    title="https://www.youtube.com/watch?v=PQU9o_5rHC4"
    sourceId="g3cfee166b75_1_185"
  />
);

const Page088: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-088.png', import.meta.url).href}
    title="Anthropic | New rules of context engineering"
    sourceId="addy04_slide"
  />
);

const Page089: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-089.png', import.meta.url).href}
    title="Skills are the new standard for Durable Memory."
    sourceId="g3dcbe6d87b1_0_0"
  />
);

const Page090: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-090.png', import.meta.url).href}
    title="Skills as Externalized Expertise"
    sourceId="g3de63a76480_0_42"
  />
);

const Page091: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-091.png', import.meta.url).href}
    title="Skills can replace Code"
    sourceId="g3d58a79d6b2_0_0"
  />
);

const Page092: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-092.png', import.meta.url).href}
    title="https://github.com/NousResearch/hermes-agent"
    sourceId="g3d327b97d30_1_2"
  />
);

const Page093: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-093.png', import.meta.url).href}
    title="Inner loop finishes the task. "
    sourceId="g3de63a76480_1_7"
  />
);

const Page094: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-094.png', import.meta.url).href}
    title="https://www.reddit.com/r/rajistics/comments/1r77v1h/skillsbench_showed_models_arent_good_at/"
    sourceId="g3cfee166b75_1_154"
  />
);

const Page095: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-095.png', import.meta.url).href}
    title="Huang, Du, Lan | arXiv 2608.10319"
    sourceId="addy05_slide"
  />
);

const Page096: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-096.png', import.meta.url).href}
    title="You must evaluate your skills."
    sourceId="g37e8cf7c57bc99ef_0"
  />
);

const Page097: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-097.png', import.meta.url).href}
    title="Layer 1 - Active Context: What is in the prompt right now."
    sourceId="g3e663996cbe_0_10"
  />
);

const Page098: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-098.png', import.meta.url).href}
    title="Slide 98"
    sourceId="g3d9a801183a_4_14"
  />
);

const Page099: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-099.png', import.meta.url).href}
    title="Memory & Claude"
    sourceId="g3e01059221c_0_6"
  />
);

const Page100: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-100.png', import.meta.url).href}
    title="https://www.langchain.com/blog/your-harness-your-memory"
    sourceId="g3dcbc7569e8_0_35"
  />
);

const PageFactoryCompletionResult: Page = () => (
  <div data-source-slide-id="odsc_factory_completion_result" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '72px 118px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Factory ProgramBench · GDAL clean-room reimplementation</div>
    <h1 style={contentTitleStyle}>The agent stopped because it thought it was done.</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 1fr', gap: 36, alignItems: 'center', marginTop: 82 }}>
      <div style={{ borderTop: '7px solid #A7A6A0', paddingTop: 26 }}><div style={{ color: muted, fontSize: 23, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Single agent</div><div style={{ marginTop: 10, fontSize: 116, fontWeight: 950, lineHeight: 0.9, letterSpacing: '-0.06em' }}>36%</div><div style={{ marginTop: 22, color: muted, fontSize: 29, fontWeight: 720 }}>17K lines · 15 hours</div></div>
      <div style={{ color: orange, textAlign: 'center', fontSize: 82, fontWeight: 900 }}>→</div>
      <div style={{ borderTop: `7px solid ${orange}`, paddingTop: 26 }}><div style={{ color: orange, fontSize: 23, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Independent completion loop</div><div style={{ marginTop: 10, fontSize: 116, fontWeight: 950, lineHeight: 0.9, letterSpacing: '-0.06em' }}>90%</div><div style={{ marginTop: 22, color: muted, fontSize: 29, fontWeight: 720 }}>115K lines · 197 hours</div></div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 90, marginTop: 82 }}>
      <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.28 }}>Same model. Same reasoning level. A different authority decided what counted as <span style={{ color: orange }}>complete.</span></div>
      <div style={{ borderLeft: `5px solid ${orange}`, paddingLeft: 30 }}><div style={{ color: orange, fontSize: 27, fontWeight: 900 }}>13× wall time · 14× credits</div><div style={{ marginTop: 10, color: muted, fontSize: 22, lineHeight: 1.35 }}>One campaign per condition; not compute-matched. The workflow changed the judgment of completion—and then spent the compute.</div></div>
    </div>
    <div style={{ position: 'absolute', left: 260, bottom: 56, color: muted, fontSize: 18 }}>Factory Research · Aug. 27, 2026 · official hidden-suite score</div>
    <Footer />
  </div>
);

const PageFactoryCompletionMechanism: Page = () => (
  <div data-source-slide-id="odsc_factory_completion_mechanism" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '72px 118px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: purple, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>The mechanism—not “more agents”</div>
    <h1 style={contentTitleStyle}>Separate the work from the standard of completion.</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 42, marginTop: 58 }}>
      {[
        ['1', 'Validator', 'Builds the instrument before implementation. Owns raw checks and evidence.', green],
        ['2', 'Implementer', 'Builds the candidate. Receives missing capabilities—not the hidden cases.', 'var(--osd-accent)'],
        ['3', 'Orchestrator', 'Adjudicates findings, directs the next round, and decides when to ship.', purple],
      ].map(([number, role, description, color]) => (
        <div key={role} style={{ minHeight: 430, borderTop: `8px solid ${color}`, padding: '30px 34px 0', background: '#FFFFFF', boxShadow: '0 12px 30px rgba(35, 29, 17, 0.08)' }}><div style={{ color, fontSize: 27, fontWeight: 950 }}>{number}</div><div style={{ marginTop: 44, fontSize: 52, fontWeight: 920 }}>{role}</div><div style={{ marginTop: 29, color: muted, fontSize: 29, fontWeight: 680, lineHeight: 1.36 }}>{description}</div></div>
      ))}
    </div>
    <div style={{ marginTop: 42, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '3px solid var(--osd-text)', paddingTop: 23 }}><div style={{ fontSize: 35, fontWeight: 850 }}>The instrument stays behind an information wall.</div><div style={{ color: purple, fontSize: 31, fontWeight: 900 }}>The stop decision moves outside the implementer.</div></div>
    <Footer />
  </div>
);

const Page101: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-101.png', import.meta.url).href}
    title="Who decides when the agent is done?"
    sourceId="odsc_claim5_slide"
  />
);

const Page102: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-102.png', import.meta.url).href}
    title="Let's start with how agents find what they need."
    sourceId="g3d905d80d69_0_0"
  />
);

const Page103: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-103.png', import.meta.url).href}
    title="Agentic Loops and Tool Use"
    sourceId="g3c599fa5093_0_8"
  />
);

const Page104: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-104.png', import.meta.url).href}
    title="Engineering the Loop"
    sourceId="g3e01059221c_0_24"
  />
);

const Page105: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-105.png', import.meta.url).href}
    title="We no longer rely on single-shot execution."
    sourceId="g3d46df1fe5c_0_23"
  />
);

const Page106: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-106.png', import.meta.url).href}
    title="We no longer rely on single-shot execution."
    sourceId="g397b4ac3620_0_59"
  />
);

const Page107: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-107.png', import.meta.url).href}
    title="OpenAI: Unrolling the Codex agent loop | How Codex is built"
    sourceId="ru11_slide"
  />
);

const Page108: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-108.png', import.meta.url).href}
    title="Addy Osmani: Long-running Agents"
    sourceId="ru12_slide"
  />
);

const Page109: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-109.png', import.meta.url).href}
    title="Ben Lorica, Gradient Flow, Aug. 25, 2026"
    sourceId="gf01_slide"
  />
);

const Page110: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-110.png', import.meta.url).href}
    title="Addy Osmani: Practical Loop Engineering"
    sourceId="ru13_slide"
  />
);

const Page111: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-111.png', import.meta.url).href}
    title="Hopit.ai, Aug. 26, 2026"
    sourceId="hopi01_slide"
  />
);

const Page112: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-112.png', import.meta.url).href}
    title="Uber Engineering, Aug. 27, 2026"
    sourceId="uber03_slide"
  />
);

const Page113: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-113.png', import.meta.url).href}
    title="Try command"
    sourceId="g3dcbe6d87b1_0_7"
  />
);

const Page114: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-114.png', import.meta.url).href}
    title="This brute force approach can work"
    sourceId="g3d46df1fe5c_0_30"
  />
);

const Page115: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-115.png', import.meta.url).href}
    title="Build a plan before you execute"
    sourceId="g3cfee166b75_1_9"
  />
);

const Page116: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-116.png', import.meta.url).href}
    title="Moving from Ralph Wiggum to AutoResearch"
    sourceId="g3e663996cbe_0_27"
  />
);

const Page117: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-117.png', import.meta.url).href}
    title="An Improved Loop for AutoResearch"
    sourceId="g3d905d80d69_0_6"
  />
);

const Page118: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-118.png', import.meta.url).href}
    title="Defensive Tool Returns."
    sourceId="g3e01059221c_0_15"
  />
);

const Page119: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-119.png', import.meta.url).href}
    title="Environmental Discipline: Testing Driven Development"
    sourceId="g3de63a76480_1_32"
  />
);

const Page120: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-120.png', import.meta.url).href}
    title="Zain Hasan: Sonnet 5 vs GLM-5.2"
    sourceId="ru14_slide"
  />
);

const Page121: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-121.png', import.meta.url).href}
    title="https://openai.com/index/harness-engineering/"
    sourceId="g3de63a76480_1_25"
  />
);

const Page122: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-122.png', import.meta.url).href}
    title="Don’t work on your laptop"
    sourceId="g3c5632f9dff_0_140"
  />
);

const Page123: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-123.png', import.meta.url).href}
    title="Don’t work on your laptop"
    sourceId="g3da7cf22319_29_0"
  />
);

const Page124: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-124.png', import.meta.url).href}
    title="https://www.anthropic.com/engineering/beyond-permission-prompts-making-claude-code-more-secure-and-autonomous"
    sourceId="g3d39460aeb8_1_9"
  />
);

const Page125: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-125.png', import.meta.url).href}
    title="Actions should be simple and easy to understand for agents."
    sourceId="g3cfee166b75_1_278"
  />
);

const Page126: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-126.png', import.meta.url).href}
    title="Uber Engineering, Aug. 27, 2026"
    sourceId="uber04_slide"
  />
);

const Page127: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-127.png', import.meta.url).href}
    title="Uber Engineering, Aug. 27, 2026"
    sourceId="uber05_slide"
  />
);

const PageDynamicWorkflowArchitecture: Page = () => (
  <div data-source-slide-id="odsc_dynamic_workflow_architecture" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '58px 100px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: 'var(--osd-accent)', fontSize: 21, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Anthropic dynamic workflows · May 2026</div>
    <h1 style={contentTitleStyle}>The harness can now <span style={{ color: 'var(--osd-accent)' }}>write the workflow.</span></h1>
    <p style={{ margin: '16px 0 0', color: muted, fontSize: 28, fontWeight: 680 }}>The plan, fan-out, review, and recovery structure are generated at runtime.</p>
    <a href="https://claude.com/blog/introducing-dynamic-workflows-in-claude-code" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 100, right: 100, top: 242, height: 545, display: 'block', overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.14)' }}>
      <img src={new URL('./assets/anthropic-dynamic-workflows.png', import.meta.url).href} alt="Anthropic dynamic workflow running a React to Solid migration across phases and parallel agents" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
    </a>
    <div style={{ position: 'absolute', left: 100, right: 100, bottom: 72, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26 }}>
      {[
        ['6 phases', 'A runtime-generated plan'],
        ['35 agents', 'Parallel work with ownership'],
        ['Per-agent telemetry', 'Tokens, tools, and elapsed time'],
        ['Saved progress', 'Resume outside one conversation'],
      ].map(([value, label]) => (
        <div key={value} style={{ borderTop: '5px solid var(--osd-accent)', paddingTop: 14 }}><div style={{ fontSize: 31, fontWeight: 920 }}>{value}</div><div style={{ marginTop: 6, color: muted, fontSize: 20, fontWeight: 680 }}>{label}</div></div>
      ))}
    </div>
    <Footer />
  </div>
);

const PageDynamicWorkflowBun: Page = () => (
  <div data-source-slide-id="odsc_dynamic_workflow_bun_case" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '82px 120px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Vendor-reported case · Bun Zig → Rust port</div>
    <h1 style={contentTitleStyle}>Hundreds of agents worked on the same codebase.</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 54, marginTop: 86 }}>
      {[
        ['≈750K', 'lines of Rust'],
        ['99.8%', 'of the existing tests passing'],
        ['11 days', 'first commit to merge'],
      ].map(([value, label], index) => (
        <div key={value} style={{ borderTop: `7px solid ${index === 1 ? orange : 'var(--osd-accent)'}`, paddingTop: 24 }}><div style={{ fontSize: 88, fontWeight: 950, lineHeight: 0.95, letterSpacing: '-0.055em' }}>{value}</div><div style={{ marginTop: 18, color: muted, fontSize: 30, fontWeight: 720 }}>{label}</div></div>
      ))}
    </div>
    <div style={{ marginTop: 82, display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 86, alignItems: 'start' }}>
      <div style={{ fontSize: 34, fontWeight: 780, lineHeight: 1.32 }}>Hundreds of agents worked in parallel, with <span style={{ color: 'var(--osd-accent)' }}>two reviewers per file</span>, followed by build-and-test fix loops.</div>
      <div style={{ borderLeft: `5px solid ${orange}`, paddingLeft: 30 }}><div style={{ color: orange, fontSize: 24, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Important caveat</div><div style={{ marginTop: 10, fontSize: 31, fontWeight: 820, lineHeight: 1.22 }}>Merged did not mean production.</div><div style={{ marginTop: 10, color: muted, fontSize: 22, lineHeight: 1.35 }}>Anthropic explicitly said the port was not yet in production.</div></div>
    </div>
    <div style={{ position: 'absolute', left: 260, bottom: 58, color: muted, fontSize: 18 }}>Source: Anthropic, “Introducing dynamic workflows in Claude Code,” May 28, 2026</div>
    <Footer />
  </div>
);

const PageDynamicWorkflowDecision: Page = () => (
  <div data-source-slide-id="odsc_dynamic_workflow_decision" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '70px 118px', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ color: orange, fontSize: 21, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>The multi-agent threshold</div>
    <h1 style={contentTitleStyle}>When does a task earn <span style={{ color: orange }}>35 agents?</span></h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 90, marginTop: 70 }}>
      <div><div style={{ color: green, fontSize: 23, fontWeight: 900, letterSpacing: '0.11em', textTransform: 'uppercase' }}>The work separates</div>{['Independent files or search directions', 'Value exceeds the token premium', 'A strong test, oracle, or reviewer exists', 'Failures can be isolated and retried'].map((item) => (<div key={item} style={{ display: 'flex', gap: 18, alignItems: 'center', minHeight: 82, borderBottom: '1px solid #C9C1AA', fontSize: 29, fontWeight: 760 }}><span style={{ color: green, fontSize: 31, fontWeight: 950 }}>✓</span>{item}</div>))}</div>
      <div><div style={{ color: purple, fontSize: 23, fontWeight: 900, letterSpacing: '0.11em', textTransform: 'uppercase' }}>The harness supplies control</div>{['Workspace and artifact ownership', 'Independent review topology', 'Budget, checkpoints, and approvals', 'A stop condition outside self-assessment'].map((item) => (<div key={item} style={{ display: 'flex', gap: 18, alignItems: 'center', minHeight: 82, borderBottom: '1px solid #C9C1AA', fontSize: 29, fontWeight: 760 }}><span style={{ color: purple, fontSize: 31, fontWeight: 950 }}>→</span>{item}</div>))}</div>
    </div>
    <div style={{ position: 'absolute', left: 118, right: 118, bottom: 76, borderTop: '3px solid var(--osd-text)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 60 }}><div style={{ fontSize: 32, fontWeight: 850 }}>Dynamic does not mean unconstrained.</div><div style={{ color: orange, fontSize: 27, fontWeight: 850 }}>More agents spend more tokens—and create more coordination state.</div></div>
    <Footer />
  </div>
);

const Page128: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-128.png', import.meta.url).href}
    title="Does this problem earn another agent?"
    sourceId="odsc_claim6_slide"
  />
);

const Page129: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-129.png', import.meta.url).href}
    title="Let's start with how agents find what they need."
    sourceId="g3e638e6a787_0_38"
  />
);

const Page130: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-130.png', import.meta.url).href}
    title="System Architecture:\u000bSingle versus Multi Agent"
    sourceId="g3c599fa5093_0_12"
  />
);

const Page131: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-131.png', import.meta.url).href}
    title="Who’s using a multi-agent for coding?"
    sourceId="g3e65b4f6e49_0_26"
  />
);

const Page132: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-132.png', import.meta.url).href}
    title="https://snorkel.ai/blog/multi-agents-in-the-context-of-enterprise-tool-use/"
    sourceId="g39be7a095fc_0_591"
  />
);

const Page133: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-133.png', import.meta.url).href}
    title="https://snorkel.ai/blog/multi-agents-in-the-context-of-enterprise-tool-use/"
    sourceId="g39be7a095fc_0_599"
  />
);

const Page134: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-134.png', import.meta.url).href}
    title="https://www.youtube.com/watch?v=2czYyrTzILg"
    sourceId="g395335726eb_1_0"
  />
);

const Page135: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-135.png', import.meta.url).href}
    title="Routing"
    sourceId="g3cfee166b75_1_170"
  />
);

const Page136: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-136.png', import.meta.url).href}
    title="Coordination Tax - Going from Parallel to Serial"
    sourceId="g3de63a76480_1_42"
  />
);

const Page137: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-137.png', import.meta.url).href}
    title="The Reality: More agents only help if coordination stays cheap."
    sourceId="g3cfee166b75_1_285"
  />
);

const Page138: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-138.png', import.meta.url).href}
    title="Anthropic multi-agent research"
    sourceId="ru15_slide"
  />
);

const Page139: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-139.png', import.meta.url).href}
    title="Multi-Agent critics using reflection"
    sourceId="g3cfee166b75_1_15"
  />
);

const Page140: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-140.png', import.meta.url).href}
    title="Harness engineering in another two years?"
    sourceId="g3e638e6a787_0_11"
  />
);

const Page141: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-141.png', import.meta.url).href}
    title="Five knobs that decide everything"
    sourceId="g3e638e6a787_0_44"
  />
);

const Page142: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-142.png', import.meta.url).href}
    title="Why Harnesses Matter"
    sourceId="g3e638e6a787_0_22"
  />
);

const Page143: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-143.png', import.meta.url).href}
    title="Engineering the Harness: "
    sourceId="g397b4ac3620_0_3"
  />
);

const Page144: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-144.png', import.meta.url).href}
    title="Engineering the Harness: "
    sourceId="g397b4ac3620_0_11"
  />
);

const Page145: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-145.png', import.meta.url).href}
    title="The harness as cognitive environment. The Foundation Model (Agent Core) sits at the center. "
    sourceId="g3de63a76480_1_50"
  />
);

const Page146: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-146.png', import.meta.url).href}
    title="Probabilistic lexical ranking function"
    sourceId="g39be7a095fc_0_340"
  />
);

const Page147: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-147.png', import.meta.url).href}
    title="Embeddings use the semantic meaning of words"
    sourceId="g39ecd365937_1_94"
  />
);

const Page148: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-148.png', import.meta.url).href}
    title="Adding a loop with agentic search"
    sourceId="g3cfee166b75_1_80"
  />
);

const Page149: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-149.png', import.meta.url).href}
    title="BRIGHT: https://arxiv.org/pdf/2407.12883"
    sourceId="g3cfee166b75_1_98"
  />
);

const Page150: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-150.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2602.05447"
    sourceId="g3cfee166b75_1_177"
  />
);

const Page151: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-151.png', import.meta.url).href}
    title="BRIGHT: https://arxiv.org/pdf/2407.12883"
    sourceId="g3cfee166b75_1_105"
  />
);

const Page152: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-152.png', import.meta.url).href}
    title="Pick:"
    sourceId="g3cfee166b75_1_91"
  />
);

const Page153: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-153.png', import.meta.url).href}
    title="Models can learn frm themselves"
    sourceId="g3cfee166b75_1_162"
  />
);

const Page154: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-154.png', import.meta.url).href}
    title="Harness-R1"
    sourceId="ru16_slide"
  />
);

const Page155: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-155.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2510.04618"
    sourceId="g39c727cc7a8_0_0"
  />
);

const Page156: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-156.png', import.meta.url).href}
    title="- 2,600 API endpoints as JSON schemas                                                                                                      "
    sourceId="g3d58a79d6b2_0_7"
  />
);

const Page157: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-157.png', import.meta.url).href}
    title="Externalize process"
    sourceId="g3de63a76480_1_16"
  />
);

const Page158: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-158.png', import.meta.url).href}
    title="It’s possible to build an independent standard"
    sourceId="g3d2d034e6c6_1_54"
  />
);

const Page159: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-159.png', import.meta.url).href}
    title="Tobias Lütke, Thariq Shakir, Claude Code docs"
    sourceId="port01_slide"
  />
);

const Page160: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-160.png', import.meta.url).href}
    title="Thariq Shakir | OpenAI model migration guidance"
    sourceId="port02_slide"
  />
);

const Page161: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-161.png', import.meta.url).href}
    title="Retrieval decides what enters context."
    sourceId="g3c5632f9dff_0_51"
  />
);

const Page162: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-162.png', import.meta.url).href}
    title="Should every task use the strongest model?"
    sourceId="odsc_claim4_slide"
  />
);

const Page163: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-163.png', import.meta.url).href}
    title="https://www.nvidia.com/en-us/on-demand/session/gtc25-s74439/"
    sourceId="g39be7a095fc_0_615"
  />
);

const Page164: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-164.png', import.meta.url).href}
    title="Models are rapidly getting better."
    sourceId="g3cfee166b75_1_208"
  />
);

const Page165: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-165.png', import.meta.url).href}
    title="Nic Dunz | Rahul"
    sourceId="ru17_slide"
  />
);

const Page166: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-166.png', import.meta.url).href}
    title="Yun Jin: The Same Weights Are Not the Same Model"
    sourceId="ru18_slide"
  />
);

const Page167: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-167.png', import.meta.url).href}
    title="Zain Hasan: Sonnet 5 vs GLM-5.2"
    sourceId="ru19_slide"
  />
);

const Page168: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-168.png', import.meta.url).href}
    title="FriendliAI Tech & Research, Aug. 24, 2026"
    sourceId="fr01_slide"
  />
);

const Page169: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-169.png', import.meta.url).href}
    title="Chroma: https://x.com/trychroma/status/1983625513244750304"
    sourceId="g3a4988925f4_0_1"
  />
);

const Page170: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-170.png', import.meta.url).href}
    title="Why this takes 12M tokens"
    sourceId="g3d327b97d30_1_62"
  />
);

const Page171: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-171.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2603.09004"
    sourceId="g3da299f8d9f_0_13"
  />
);

const Page172: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-172.png', import.meta.url).href}
    title="https://arxiv.org/pdf/2602.16666"
    sourceId="g3d1aca74b23_0_7"
  />
);

const Page173: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-173.png', import.meta.url).href}
    title="Many agent issues are tool-use problems."
    sourceId="g3de63a76480_0_34"
  />
);

const Page174: Page = () => (
  <SourcePage
    src={new URL('./assets/source-slides/slide-174.png', import.meta.url).href}
    title="OpenSpec\u000bhttps://www.youtube.com/watch?v=PQU9o_5rHC4"
    sourceId="g3d39460aeb8_1_16"
  />
);

const PageHarnessBenchSensitivity: Page = () => (
  <div
    data-source-slide-id="evidence_harness_bench_sensitivity"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Harness-Bench · Figure 3</div>
    <h1 style={contentTitleStyle}>
      Stronger models hide more of the harness.
    </h1>
    <div style={{ position: 'absolute', left: 100, top: 240, width: 1360, height: 650, background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)', padding: 22 }}>
      <img
        src={new URL('./assets/evidence/harness-bench-model-sensitivity.svg', import.meta.url).href}
        alt="Harness-Bench Figure 3 comparing model mean score with cross-harness variance"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <div style={{ position: 'absolute', left: 1510, right: 100, top: 300 }}>
      <div style={{ borderTop: '7px solid var(--osd-accent)', paddingTop: 22 }}>
        <div style={{ color: muted, fontSize: 22, fontWeight: 850, letterSpacing: '0.08em' }}>THE PATTERN</div>
        <div style={{ marginTop: 16, fontSize: 36, fontWeight: 830, lineHeight: 1.25 }}>Higher mean scores came with lower cross-harness variance.</div>
      </div>
      <div style={{ marginTop: 58, borderTop: '2px solid #C9C1AA', paddingTop: 22, color: muted, fontSize: 27, fontWeight: 680, lineHeight: 1.38 }}>
        Weaker backends were more sensitive to prompting, tools, state, and recovery behavior.
      </div>
    </div>
    <a href="https://arxiv.org/html/2605.27922v1#S4.F3" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Yao et al., Harness-Bench, Figure 3 (2026)
    </a>
    <Footer />
  </div>
);

const PageAnthropicToolSearch: Page = () => (
  <div
    data-source-slide-id="evidence_anthropic_tool_search"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Anthropic · advanced tool use</div>
    <h1 style={contentTitleStyle}>
      Anthropic cut tool context 85% and improved accuracy at the same time.
    </h1>
    <div style={{ position: 'absolute', left: 100, top: 252, width: 1260, height: 670, overflow: 'hidden', background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)' }}>
      <img
        src={new URL('./assets/evidence/anthropic-tool-search.png', import.meta.url).href}
        alt="Anthropic Tool Search Tool diagram comparing traditional and on-demand tool loading"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <div style={{ position: 'absolute', left: 1420, right: 100, top: 292 }}>
      <div style={{ borderTop: `7px solid ${orange}`, paddingTop: 18 }}>
        <div style={{ color: muted, fontSize: 21, fontWeight: 850, letterSpacing: '0.08em' }}>58 TOOLS</div>
        <div style={{ marginTop: 8, color: orange, fontSize: 72, fontWeight: 920, lineHeight: 0.95 }}>55K</div>
        <div style={{ marginTop: 10, fontSize: 25, fontWeight: 730 }}>tokens before work starts</div>
      </div>
      <div style={{ marginTop: 42, borderTop: '2px solid #C9C1AA', paddingTop: 18 }}>
        <div style={{ color: muted, fontSize: 21, fontWeight: 850, letterSpacing: '0.08em' }}>OPUS 4 MCP EVAL</div>
        <div style={{ marginTop: 8, color: 'var(--osd-accent)', fontSize: 55, fontWeight: 920, lineHeight: 1 }}>49% → 74%</div>
      </div>
      <div style={{ marginTop: 42, borderTop: '2px solid #C9C1AA', paddingTop: 18 }}>
        <div style={{ color: muted, fontSize: 21, fontWeight: 850, letterSpacing: '0.08em' }}>OPUS 4.5 MCP EVAL</div>
        <div style={{ marginTop: 8, color: 'var(--osd-accent)', fontSize: 48, fontWeight: 920, lineHeight: 1 }}>79.5% → 88.1%</div>
      </div>
    </div>
    <a href="https://www.anthropic.com/engineering/advanced-tool-use" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Anthropic, “Introducing advanced tool use” (2025)
    </a>
    <Footer />
  </div>
);

const PageSkillsBenchCurrent: Page = () => (
  <div
    data-source-slide-id="evidence_skillsbench_current"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: green, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>SkillsBench · 87 tasks · 18 model-harness configurations</div>
    <h1 style={contentTitleStyle}>
      Curated skills raised average pass rate from 33.9% to 50.5%.
    </h1>
    <div style={{ position: 'absolute', left: 100, top: 250, width: 1390, height: 650, background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)', padding: 20 }}>
      <img
        src={new URL('./assets/evidence/skillsbench-figure-1.svg', import.meta.url).href}
        alt="SkillsBench Figure 1 showing architecture layers and skill lift across model-harness configurations"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <div style={{ position: 'absolute', left: 1540, right: 100, top: 315 }}>
      <div style={{ borderTop: `7px solid ${green}`, paddingTop: 20 }}>
        <div style={{ color: green, fontSize: 88, fontWeight: 930, lineHeight: 0.95, letterSpacing: '-0.055em' }}>+16.6</div>
        <div style={{ marginTop: 12, fontSize: 29, fontWeight: 790 }}>percentage points on average</div>
      </div>
      <div style={{ marginTop: 58, borderTop: '2px solid #C9C1AA', paddingTop: 20, color: muted, fontSize: 27, fontWeight: 680, lineHeight: 1.38 }}>
        Every configuration improved, but the lift ranged from 4.1 to 25.7 points.
      </div>
    </div>
    <a href="https://arxiv.org/html/2602.12670" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Li et al., SkillsBench, Figure 1 (2026)
    </a>
    <Footer />
  </div>
);

const PageSkillsCanHarm: Page = () => (
  <div
    data-source-slide-id="evidence_skills_can_harm"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Agent Skills Can Be Harmful · paired execution study</div>
    <h1 style={contentTitleStyle}>
      The same skill can make a correct run fail or make it much more expensive.
    </h1>
    <div style={{ position: 'absolute', left: 100, top: 262, width: 1300, height: 610, background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)', padding: 24 }}>
      <img
        src={new URL('./assets/evidence/skill-harm-differential.svg', import.meta.url).href}
        alt="Differential evaluation comparing no-skill and skill-guided agent runs"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <div style={{ position: 'absolute', left: 1460, right: 100, top: 302 }}>
      <div style={{ borderTop: `7px solid ${orange}`, paddingTop: 19 }}>
        <div style={{ color: orange, fontSize: 92, fontWeight: 930, lineHeight: 0.94 }}>307</div>
        <div style={{ marginTop: 12, fontSize: 28, fontWeight: 790 }}>confirmed skill-induced failures</div>
      </div>
      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        <div><div style={{ fontSize: 50, fontWeight: 920 }}>125</div><div style={{ color: muted, fontSize: 22, fontWeight: 720, lineHeight: 1.25 }}>functional failures</div></div>
        <div><div style={{ fontSize: 50, fontWeight: 920 }}>182</div><div style={{ color: muted, fontSize: 22, fontWeight: 720, lineHeight: 1.25 }}>efficiency regressions</div></div>
      </div>
      <div style={{ marginTop: 48, borderTop: '2px solid #C9C1AA', paddingTop: 20, fontSize: 28, fontWeight: 760, lineHeight: 1.3 }}>
        Excess procedure caused <span style={{ color: orange, fontWeight: 900 }}>62.6%</span> of the efficiency regressions.
      </div>
    </div>
    <a href="https://arxiv.org/html/2608.11888" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      “Agent Skills Can Be Harmful,” Figure 2 (2026)
    </a>
    <Footer />
  </div>
);

const PageCodeRescue: Page = () => (
  <div
    data-source-slide-id="evidence_code_rescue"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '68px 118px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: purple, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>CodeRescue · five coding benchmarks</div>
    <h1 style={contentTitleStyle}>
      CodeRescue beat always-escalate using 35% of the recovery cost.
    </h1>
    <div style={{ position: 'absolute', left: 118, top: 300, right: 118, display: 'grid', gridTemplateColumns: '360px 100px 390px 100px 1fr', alignItems: 'center' }}>
      <div style={{ minHeight: 230, borderTop: `8px solid ${muted}`, background: '#FFFFFF', padding: '28px 30px', boxShadow: '0 12px 30px rgba(35, 29, 17, 0.08)' }}>
        <div style={{ color: muted, fontSize: 21, fontWeight: 850, letterSpacing: '0.09em' }}>CHEAP MODEL</div>
        <div style={{ marginTop: 32, fontSize: 42, fontWeight: 880, lineHeight: 1.15 }}>The first attempt fails.</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 66, fontWeight: 900, color: purple }}>→</div>
      <div style={{ minHeight: 230, borderTop: `8px solid ${purple}`, background: '#FFFFFF', padding: '28px 30px', boxShadow: '0 12px 30px rgba(35, 29, 17, 0.08)' }}>
        <div style={{ color: purple, fontSize: 21, fontWeight: 850, letterSpacing: '0.09em' }}>EXECUTION FEEDBACK</div>
        <div style={{ marginTop: 32, fontSize: 42, fontWeight: 880, lineHeight: 1.15 }}>The harness sees what failed.</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 66, fontWeight: 900, color: purple }}>→</div>
      <div style={{ minHeight: 230, borderTop: '8px solid var(--osd-accent)', background: '#FFFFFF', padding: '28px 30px', boxShadow: '0 12px 30px rgba(35, 29, 17, 0.08)' }}>
        <div style={{ color: 'var(--osd-accent)', fontSize: 21, fontWeight: 850, letterSpacing: '0.09em' }}>ROUTER</div>
        <div style={{ marginTop: 24, fontSize: 34, fontWeight: 830, lineHeight: 1.23 }}>Retry cheaply when the feedback is useful. Escalate when it is not.</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 118, right: 118, top: 690, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, borderTop: '3px solid var(--osd-text)', paddingTop: 28 }}>
      <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.28 }}>The router exceeded the solve rate of always using GPT-5.4 for recovery.</div>
      <div style={{ borderLeft: `6px solid ${purple}`, paddingLeft: 30 }}><div style={{ color: purple, fontSize: 74, fontWeight: 930, lineHeight: 0.95 }}>35%</div><div style={{ marginTop: 10, color: muted, fontSize: 27, fontWeight: 700 }}>of mean recovery cost</div></div>
    </div>
    <a href="https://arxiv.org/abs/2607.19338" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 118, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      He et al., CodeRescue (2026)
    </a>
    <Footer />
  </div>
);

const FactoryResultRow = ({ model, before, after, hours, color }: { model: string; before: number; after: number; hours: string; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 150px 230px', alignItems: 'center', gap: 28, minHeight: 150, borderTop: '2px solid #D4CDB8' }}>
    <div style={{ fontSize: 34, fontWeight: 850 }}>{model}</div>
    <div style={{ position: 'relative', height: 72 }}>
      <div style={{ position: 'absolute', left: 0, top: 10, width: `${before}%`, height: 22, background: '#C9C3B5' }} />
      <div style={{ position: 'absolute', left: 0, bottom: 8, width: `${after}%`, height: 28, background: color }} />
    </div>
    <div style={{ fontSize: 32, fontWeight: 900, color }}><span style={{ color: muted }}>{before.toFixed(1)}</span> → {after.toFixed(1)}</div>
    <div style={{ color: muted, fontSize: 23, fontWeight: 720 }}>{hours}</div>
  </div>
);

const PageFactoryAggregate: Page = () => (
  <div
    data-source-slide-id="evidence_factory_aggregate"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '68px 118px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Factory ProgramBench · 24 large software tasks per model</div>
    <h1 style={contentTitleStyle}>
      Factory raised the median score for all three models.
    </h1>
    <div style={{ position: 'absolute', left: 118, right: 118, top: 264 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 150px 230px', gap: 28, color: muted, fontSize: 19, fontWeight: 850, letterSpacing: '0.08em', paddingBottom: 14 }}>
        <div>MODEL</div><div>SINGLE AGENT / SYSTEM MEDIAN</div><div>SCORE</div><div>WALL-CLOCK BUDGET</div>
      </div>
      <FactoryResultRow model="Fable 5" before={56.7} after={89.3} hours="8.5h → 96h" color={orange} />
      <FactoryResultRow model="Kimi K3" before={45.1} after={75.4} hours="9h → 64h" color="#22C55E" />
      <FactoryResultRow model="GPT-5.6 Sol" before={48.6} after={66.2} hours="1.5h → 24h" color="#60A5FA" />
    </div>
    <div style={{ position: 'absolute', left: 118, right: 118, top: 805, display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 70, borderTop: '2px solid #D4CDB8', paddingTop: 24 }}>
      <div style={{ fontSize: 31, fontWeight: 780, lineHeight: 1.3 }}>The system added an independent validator and moved the stop decision outside the implementer.</div>
      <div style={{ color: muted, fontSize: 22, fontWeight: 680, lineHeight: 1.35 }}>The system runs were much longer and more expensive. This was not a compute-matched experiment.</div>
    </div>
    <a href="https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 260, bottom: 76, color: orange, fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Factory Research, “What it Takes for Coding Agents to Complete Large Software Tasks” (2026)
    </a>
    <Footer />
  </div>
);

const PageBenchAgent: Page = () => (
  <div
    data-source-slide-id="evidence_benchagent"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: purple, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>BenchAgent · ten benchmarks · shared model, tools, evaluator, and logger</div>
    <h1 style={contentTitleStyle}>
      Five of six multi-agent workflows lost accuracy in the controlled comparison.
    </h1>
    <div style={{ position: 'absolute', left: 100, top: 260, width: 1330, height: 620, background: '#FFFFFF', border: '1px solid #D7D7D7', boxShadow: '0 18px 48px rgba(25, 20, 10, 0.12)', padding: 18, overflow: 'hidden' }}>
      <img
        src={new URL('./assets/evidence/benchagent-cost-tradeoff.svg', import.meta.url).href}
        alt="BenchAgent accuracy and cost trade-off plot for single-agent and multi-agent workflows"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
    <div style={{ position: 'absolute', left: 1490, right: 100, top: 304 }}>
      <div style={{ borderTop: `7px solid ${purple}`, paddingTop: 20 }}>
        <div style={{ color: purple, fontSize: 74, fontWeight: 930, lineHeight: 0.95 }}>+1.44</div>
        <div style={{ marginTop: 10, fontSize: 27, fontWeight: 790, lineHeight: 1.25 }}>points for EvoAgent, within one-run uncertainty</div>
      </div>
      <div style={{ marginTop: 54, borderTop: '2px solid #C9C1AA', paddingTop: 20 }}>
        <div style={{ color: orange, fontSize: 51, fontWeight: 920, lineHeight: 1 }}>−2.56 to −11.29</div>
        <div style={{ marginTop: 11, color: muted, fontSize: 26, fontWeight: 700, lineHeight: 1.32 }}>points for the other five workflows</div>
      </div>
      <div style={{ marginTop: 54, color: muted, fontSize: 27, fontWeight: 700, lineHeight: 1.35 }}>Most also occupied a worse accuracy-cost trade-off.</div>
    </div>
    <a href="https://arxiv.org/html/2606.05670v1#S4.F2" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Fu et al., BenchAgent, Figure 2 (2026)
    </a>
    <Footer />
  </div>
);

const PageToolVisibilityFrontier: Page = () => (
  <div
    data-source-slide-id="new_tool_visibility_frontier"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <NewMaterialBadge detail="review" />
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>ToolChoiceConfusion · 2,448 controlled runs</div>
    <h1 style={{ ...contentTitleStyle, maxWidth: 1460 }}>
      Showing fewer tools raised success from 83% to 99%.
    </h1>
    <div style={{ position: 'absolute', left: 112, right: 112, top: 280, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 34 }}>
      {[
        { label: 'ALL TOOLS', tools: '100', success: '83%', tokens: '24,569', color: muted, note: 'The model had to search the menu while solving.' },
        { label: 'KEYWORD TOP-5', tools: '5', success: '61%', tokens: '4,407', color: orange, note: 'A smaller menu can still hide the tool the agent needs.' },
        { label: 'CAUSAL NEXT STEP', tools: '≈1', success: '99%', tokens: '2,405', color: green, note: 'The harness exposed only tools valid from the current state.' },
      ].map((item) => (
        <div key={item.label} style={{ minHeight: 510, borderTop: `9px solid ${item.color}`, background: '#FFFFFF', padding: '28px 32px', boxShadow: '0 14px 34px rgba(35, 29, 17, 0.09)' }}>
          <div style={{ color: item.color, fontSize: 20, fontWeight: 900, letterSpacing: '0.11em' }}>{item.label}</div>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div><div style={{ fontSize: 80, fontWeight: 930, lineHeight: 0.92 }}>{item.tools}</div><div style={{ marginTop: 12, color: muted, fontSize: 21, fontWeight: 760 }}>tools visible</div></div>
            <div><div style={{ color: item.color, fontSize: 80, fontWeight: 930, lineHeight: 0.92 }}>{item.success}</div><div style={{ marginTop: 12, color: muted, fontSize: 21, fontWeight: 760 }}>task success</div></div>
          </div>
          <div style={{ marginTop: 42, borderTop: '2px solid #D8D0B9', paddingTop: 24 }}>
            <div style={{ fontSize: 47, fontWeight: 900 }}>{item.tokens}</div>
            <div style={{ marginTop: 6, color: muted, fontSize: 21, fontWeight: 760 }}>tokens per task</div>
          </div>
          <div style={{ marginTop: 30, color: muted, fontSize: 24, fontWeight: 680, lineHeight: 1.35 }}>{item.note}</div>
        </div>
      ))}
    </div>
    <a href="https://arxiv.org/abs/2606.06284" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      ToolChoiceConfusion (2026) · synthetic tool-use benchmark
    </a>
    <Footer />
  </div>
);

const PageRoutingCanLose: Page = () => (
  <div
    data-source-slide-id="new_routing_can_lose"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <NewMaterialBadge detail="workshop pilot" />
    <div style={{ color: purple, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Our model-routing exercise · ten tasks · one run each</div>
    <h1 style={{ ...contentTitleStyle, maxWidth: 1450 }}>
      Our verify-and-escalate cascade cost more and finished later.
    </h1>
    <div style={{ position: 'absolute', left: 112, right: 112, top: 300 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '410px 220px 250px 280px 1fr', gap: 26, alignItems: 'center', color: muted, fontSize: 18, fontWeight: 900, letterSpacing: '0.1em', padding: '0 26px 15px' }}>
        <div>POLICY</div><div>SOLVED</div><div>COST</div><div>MEAN LATENCY</div><div>WHAT HAPPENED</div>
      </div>
      {[
        { name: 'Static routing', solved: '10 / 10', cost: '$1.049', latency: '54.8s', detail: 'A task rule chose one tier.', color: green },
        { name: 'Strongest for all', solved: '10 / 10', cost: '$1.595', latency: '71.2s', detail: 'No failed first attempt to repeat.', color: 'var(--osd-accent)' },
        { name: 'Verify, then escalate', solved: '10 / 10', cost: '$1.684', latency: '81.4s', detail: '12 escalations repeated work.', color: orange },
      ].map((row, index) => (
        <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '410px 220px 250px 280px 1fr', gap: 26, alignItems: 'center', minHeight: 142, borderTop: `5px solid ${row.color}`, background: index === 2 ? '#FFF4EA' : '#FFFFFF', padding: '24px 26px', marginBottom: 16, boxShadow: '0 8px 24px rgba(35, 29, 17, 0.07)' }}>
          <div style={{ fontSize: 34, fontWeight: 860 }}>{row.name}</div>
          <div style={{ color: row.color, fontSize: 43, fontWeight: 920 }}>{row.solved}</div>
          <div style={{ fontSize: 43, fontWeight: 920 }}>{row.cost}</div>
          <div style={{ fontSize: 43, fontWeight: 920 }}>{row.latency}</div>
          <div style={{ color: muted, fontSize: 24, fontWeight: 720, lineHeight: 1.3 }}>{row.detail}</div>
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', left: 112, bottom: 105, fontSize: 25, fontWeight: 780 }}>
      Routing pays when failure is detectable and the cheap attempt creates a reusable handoff.
    </div>
    <Footer />
  </div>
);

const PageCompletionAuthority: Page = () => (
  <div
    data-source-slide-id="new_completion_authority"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <NewMaterialBadge detail="very recent preprint" />
    <div style={{ color: green, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Evidence-Carrying Termination · matched planner, tools, and budgets</div>
    <h1 style={{ ...contentTitleStyle, maxWidth: 1430 }}>
      A controller should not be the only one that decides it is done.
    </h1>
    <div style={{ position: 'absolute', left: 112, right: 112, top: 290, display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: 44, alignItems: 'center' }}>
      <div style={{ minHeight: 480, borderTop: `9px solid ${orange}`, background: '#FFFFFF', padding: '34px 42px', boxShadow: '0 14px 34px rgba(35, 29, 17, 0.09)' }}>
        <div style={{ color: orange, fontSize: 21, fontWeight: 900, letterSpacing: '0.1em' }}>CONTROLLER CAN STOP ITSELF</div>
        <div style={{ marginTop: 62, color: orange, fontSize: 118, fontWeight: 940, lineHeight: 0.9, letterSpacing: '-0.06em' }}>40 / 66</div>
        <div style={{ marginTop: 22, fontSize: 32, fontWeight: 820, lineHeight: 1.25 }}>runs stopped without enough evidence</div>
        <div style={{ marginTop: 46, color: muted, fontSize: 25, fontWeight: 700, lineHeight: 1.35 }}>The same component generated the answer and judged whether its own trace was sufficient.</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: muted, fontSize: 21, fontWeight: 900, letterSpacing: '0.08em' }}>SAME</div>
        <div style={{ marginTop: 12, fontSize: 27, fontWeight: 800, lineHeight: 1.45 }}>planner<br />tools<br />checkpoints<br />budget</div>
        <div style={{ marginTop: 30, color: 'var(--osd-accent)', fontSize: 54, fontWeight: 900 }}>→</div>
      </div>
      <div style={{ minHeight: 480, borderTop: `9px solid ${green}`, background: '#FFFFFF', padding: '34px 42px', boxShadow: '0 14px 34px rgba(35, 29, 17, 0.09)' }}>
        <div style={{ color: green, fontSize: 21, fontWeight: 900, letterSpacing: '0.1em' }}>CONTRACT GATES COMPLETION</div>
        <div style={{ marginTop: 62, color: green, fontSize: 118, fontWeight: 940, lineHeight: 0.9, letterSpacing: '-0.06em' }}>0 / 66</div>
        <div style={{ marginTop: 22, fontSize: 32, fontWeight: 820, lineHeight: 1.25 }}>runs stopped without enough evidence</div>
        <div style={{ marginTop: 46, color: muted, fontSize: 25, fontWeight: 700, lineHeight: 1.35 }}>A separate contract checked the trace and returned incomplete work to the controller.</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 112, right: 112, bottom: 108, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{ fontSize: 25, fontWeight: 780 }}>17 of 18 recovered runs later completed with support.</div>
      <a href="https://arxiv.org/abs/2608.23623" target="_blank" rel="noreferrer" style={{ color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>Evidence-Carrying Termination (2026) · 22 synthetic task clusters</a>
    </div>
    <Footer />
  </div>
);

const PageMatchedComputeAgents: Page = () => (
  <div
    data-source-slide-id="new_equal_compute_agents"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '66px 112px', fontFamily: 'var(--osd-font-body)' }}
  >
    <NewMaterialBadge detail="review" />
    <div style={{ color: purple, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Equal thinking-token study · 500-token condition</div>
    <h1 style={{ ...contentTitleStyle, maxWidth: 1430 }}>
      A multi-agent system has to beat one agent with the same budget.
    </h1>
    <div style={{ position: 'absolute', left: 112, top: 300, width: 470, minHeight: 480, borderTop: `10px solid ${purple}`, background: '#FFFFFF', padding: '42px 44px', boxShadow: '0 14px 34px rgba(35, 29, 17, 0.09)' }}>
      <div style={{ color: purple, fontSize: 128, fontWeight: 940, lineHeight: 0.88, letterSpacing: '-0.07em' }}>6 / 8</div>
      <div style={{ marginTop: 28, fontSize: 34, fontWeight: 840, lineHeight: 1.25 }}>model and dataset cells favored one agent or ended in a statistical tie</div>
      <div style={{ marginTop: 46, color: muted, fontSize: 25, fontWeight: 700, lineHeight: 1.35 }}>The comparison requested the same global thinking budget for single-agent and sequential multi-agent systems.</div>
    </div>
    <div style={{ position: 'absolute', left: 650, right: 112, top: 300 }}>
      {[
        { task: 'DeepSeek-R1-70B · MuSiQue', single: 0.383, multi: 0.332, winner: 'single agent', color: green },
        { task: 'Qwen3-30B · FRAMES', single: 0.240, multi: 0.223, winner: 'single agent', color: green },
        { task: 'Gemini 2.5 Pro · FRAMES', single: 0.600, multi: 0.660, winner: 'multi-agent', color: purple },
      ].map((row) => {
        const max = 0.7;
        return (
          <div key={row.task} style={{ borderTop: '2px solid #CFC7B1', padding: '22px 0 24px', display: 'grid', gridTemplateColumns: '340px 1fr 150px', gap: 24, alignItems: 'center' }}>
            <div><div style={{ fontSize: 25, fontWeight: 820, lineHeight: 1.24 }}>{row.task}</div><div style={{ marginTop: 7, color: row.color, fontSize: 19, fontWeight: 850 }}>{row.winner}</div></div>
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, alignItems: 'center' }}><span style={{ color: muted, fontSize: 18, fontWeight: 780 }}>ONE AGENT</span><span style={{ display: 'block', width: `${(row.single / max) * 100}%`, height: 22, background: row.single >= row.multi ? green : '#AEB4BE' }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, alignItems: 'center' }}><span style={{ color: muted, fontSize: 18, fontWeight: 780 }}>SEQUENTIAL</span><span style={{ display: 'block', width: `${(row.multi / max) * 100}%`, height: 22, background: row.multi > row.single ? purple : '#AEB4BE' }} /></div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, textAlign: 'right' }}>{row.single.toFixed(3)} / {row.multi.toFixed(3)}</div>
          </div>
        );
      })}
      <div style={{ marginTop: 28, color: muted, fontSize: 24, fontWeight: 700, lineHeight: 1.35 }}>Requested token budgets were matched. Realized Gemini reasoning tokens were not always equal.</div>
    </div>
    <a href="https://arxiv.org/abs/2604.02460" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 112, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Equal-thinking-token comparison of single-agent and multi-agent systems (2026)
    </a>
    <Footer />
  </div>
);

const PageAnthropicMultiAgent: Page = () => (
  <div
    data-source-slide-id="evidence_anthropic_multi_agent"
    style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '68px 118px', fontFamily: 'var(--osd-font-body)' }}
  >
    <div style={{ color: orange, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>Anthropic Research · breadth-first research tasks</div>
    <h1 style={contentTitleStyle}>
      Anthropic gained 90.2% by spending about 15× chat tokens.
    </h1>
    <div style={{ position: 'absolute', left: 118, right: 118, top: 286, display: 'grid', gridTemplateColumns: '410px 1fr 410px', gap: 74, alignItems: 'center' }}>
      <div style={{ minHeight: 420, borderTop: `9px solid ${green}`, background: '#FFFFFF', padding: '38px 40px', boxShadow: '0 14px 34px rgba(35, 29, 17, 0.09)' }}>
        <div style={{ color: green, fontSize: 108, fontWeight: 940, lineHeight: 0.9, letterSpacing: '-0.06em' }}>+90.2%</div>
        <div style={{ marginTop: 32, fontSize: 31, fontWeight: 790, lineHeight: 1.28 }}>versus single-agent Opus 4 on Anthropic’s internal research evaluation</div>
      </div>
      <div style={{ position: 'relative', height: 430 }}>
        <div style={{ position: 'absolute', left: '50%', top: 4, width: 310, transform: 'translateX(-50%)', borderTop: `7px solid ${purple}`, background: '#FFFFFF', padding: '24px 28px', textAlign: 'center', boxShadow: '0 10px 24px rgba(35, 29, 17, 0.08)' }}>
          <div style={{ color: purple, fontSize: 20, fontWeight: 850, letterSpacing: '0.08em' }}>LEAD AGENT</div>
          <div style={{ marginTop: 8, fontSize: 30, fontWeight: 850 }}>Opus 4</div>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 154, width: 4, height: 92, background: '#C1B9A4' }} />
        <div style={{ position: 'absolute', left: '13%', right: '13%', top: 244, height: 4, background: '#C1B9A4' }} />
        <div style={{ position: 'absolute', left: '13%', top: 244, width: 4, height: 47, background: '#C1B9A4' }} />
        <div style={{ position: 'absolute', left: '50%', top: 244, width: 4, height: 47, background: '#C1B9A4' }} />
        <div style={{ position: 'absolute', right: '13%', top: 244, width: 4, height: 47, background: '#C1B9A4' }} />
        <div style={{ position: 'absolute', left: 0, top: 290, width: '31%', borderTop: '6px solid var(--osd-accent)', background: '#FFFFFF', padding: '22px 16px', textAlign: 'center' }}><div style={{ color: 'var(--osd-accent)', fontSize: 18, fontWeight: 850 }}>SUBAGENT</div><div style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>Search A</div></div>
        <div style={{ position: 'absolute', left: '34.5%', top: 290, width: '31%', borderTop: '6px solid var(--osd-accent)', background: '#FFFFFF', padding: '22px 16px', textAlign: 'center' }}><div style={{ color: 'var(--osd-accent)', fontSize: 18, fontWeight: 850 }}>SUBAGENT</div><div style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>Search B</div></div>
        <div style={{ position: 'absolute', right: 0, top: 290, width: '31%', borderTop: '6px solid var(--osd-accent)', background: '#FFFFFF', padding: '22px 16px', textAlign: 'center' }}><div style={{ color: 'var(--osd-accent)', fontSize: 18, fontWeight: 850 }}>SUBAGENT</div><div style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>Search C</div></div>
      </div>
      <div style={{ minHeight: 420, borderTop: `9px solid ${orange}`, background: '#FFFFFF', padding: '38px 40px', boxShadow: '0 14px 34px rgba(35, 29, 17, 0.09)' }}>
        <div style={{ color: orange, fontSize: 108, fontWeight: 940, lineHeight: 0.9, letterSpacing: '-0.06em' }}>15×</div>
        <div style={{ marginTop: 32, fontSize: 31, fontWeight: 790, lineHeight: 1.28 }}>the token use of ordinary chat interactions in Anthropic’s production data</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 118, right: 118, top: 806, borderTop: '3px solid var(--osd-text)', paddingTop: 25, fontSize: 31, fontWeight: 790, lineHeight: 1.3 }}>
      The task had many independent search directions. Anthropic says most coding work is less parallelizable.
    </div>
    <a href="https://www.anthropic.com/engineering/multi-agent-research-system" target="_blank" rel="noreferrer" style={{ position: 'absolute', left: 118, bottom: 76, color: 'var(--osd-accent)', fontSize: 19, fontWeight: 700, textDecoration: 'underline' }}>
      Anthropic, “How we built our multi-agent research system” (2025)
    </a>
    <Footer />
  </div>
);

// Parked from the active route on Aug. 30, 2026. Keep these together so the
// harness-justification sequence and speaker introduction can be restored.
export const parkedOpeningPages = [
  PageModelAgnostic,
  Page009,
  Page010,
  Page011,
  Page012,
  Page013,
] satisfies Page[];

export const parkedOpeningNotes = [
  "Speaker note: Model-agnostic does not mean every model behaves identically. It means the durable parts of your system—tools, memory, permissions, evaluation, and workflow—are not needlessly rebuilt when the best model changes. DeepSeek Harness makes this architectural claim explicit by implementing models and the other major capabilities as swappable plugins.\n\n[Sources]\n- https://www.deepseek.com/harness/en/\n- https://docs.openhands.dev/sdk/guides/llms\n[/Sources]",
  "Speaker note: The remaining work is organizational: make the agent understand your systems, workflows, completion criteria, and risk boundaries.\n\n[Sources]\n- https://openai.com/index/harness-engineering/\n- https://code.claude.com/docs/en/features-overview\n[/Sources]",
  "Speaker note: Fewer tokens are not automatically better. The goal is to improve the quality, cost, latency, reliability, and control frontier for the actual workload.\n\n[Sources]\n- https://developers.openai.com/blog/codex-as-a-platform\n- https://openai.com/index/harness-engineering/\n[/Sources]",
  "Speaker note: These are competing design hypotheses, not a leaderboard. Each project explores a different answer to what the harness should own.\n\n[Sources]\n- https://github.com/NousResearch/hermes-agent\n- https://github.com/badlogic/pi-mono\n- https://www.primeintellect.ai/blog/prime-agent\n- https://www.deepseek.com/harness/en/\n[/Sources]",
  "Speaker note: Transition into the workshop. Participants are learning portable levers they can apply inside Claude Code, Codex, OpenHands, or a custom harness.",
  "",
] satisfies (string | undefined)[];

const sourceNotes = [
  "https://odsc.ai/speakers-portfolio/engineering-the-harness-a-practical-workshop-on-context-engineering-for-generative-ai/",
  "https://odsc.ai/speakers-portfolio/engineering-the-harness-a-practical-workshop-on-context-engineering-for-generative-ai/",
  "",
  "",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "Speaker note: Claude Code is already the most widely adopted coding agent in this globally weighted professional-developer survey. Codex is not yet second, but it is the fastest mover: 3% to 16% workplace adoption from January to May–July 2026. The point is that mature default harnesses are real and increasingly dominant—not that their adoption percentages can be added together. Uvik's synthesis led us to these primary datasets.\n\n[Sources]\n- https://uvik.net/blog/claude-code-vs-cursor-vs-copilot-vs-codex-2026/\n- https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/\n- https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/\n- https://openai.com/index/scaling-codex-to-enterprises-worldwide/\n[/Sources]",
  "Speaker note: This is the larger market shift. Anthropic, OpenAI, and now DeepSeek are not only offering models; each is offering an opinionated system around the model. On August 30, the official repositories showed roughly 143,000 stars for Claude Code, 120,000 for Codex, and 205,000 for DeepSeek Harness. The '100,000 within days' velocity claim applies only to DeepSeek. Treat stars as evidence of extraordinary attention—not usage share or production readiness. DeepSeek explicitly labels the project a developer preview.\n\n[Sources]\n- https://github.com/anthropics/claude-code\n- https://github.com/openai/codex\n- https://www.deepseek.com/harness/en/\n- https://github.com/deepseek-ai/deepseek-harness\n- https://dshseek.com/news/upstream-100k/\n[/Sources]",
  "Speaker note: Let the audience raise the obvious objection before answering it.\n\n[Sources]\n- https://developers.openai.com/blog/codex-as-a-platform\n- https://code.claude.com/docs/en/features-overview\n[/Sources]",
  "Speaker note: This is not a product leaderboard. DeepSeek evaluated Claude Opus 4.6, GPT-5.4, and DeepSeek-V4-Pro in the same deliberately minimal agent framework: bash plus file editing, up to 500 interaction steps, and 512K context. All three resolve more than half of SWE-Bench Pro and score 65–75% on Terminal-Bench 2.0. That is enough to establish a strong general-software baseline. The branded harnesses add richer context, tools, permissions, and workflow. Also say the caveat out loud: OpenAI has documented serious quality problems in both SWE-bench Verified and SWE-bench Pro, so these are directional indicators—not proof of production quality.\n\n[Refresh before presenting]\n- Replace the Anthropic row with the latest model recommended for Claude Code (currently the Fable family).\n- Replace the OpenAI row with the latest GPT Sol model available in Codex.\n- Replace the DeepSeek row with the latest flagship model intended for DeepSeek Harness.\n- Prefer one source that evaluates all three on the same benchmark version, split, harness, tool set, reasoning effort, context limit, and step budget. If those conditions differ, label each setup and do not draw a shared ranking.\n- Record model release/date, benchmark version, score definition, evaluation harness, reasoning effort, context, maximum steps, and capture date.\n\n[Sources]\n- https://arxiv.org/abs/2606.19348\n- https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/\n- https://openai.com/index/separating-signal-from-noise-coding-evaluations/\n- https://code.claude.com/docs/en/features-overview\n- https://developers.openai.com/codex/models/\n- https://www.deepseek.com/harness/en/\n[/Sources]",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "Speaker note: Terminal-Bench makes the harness effect visible in three different ways. On 2.0, Claude Opus 4.6 spans 58.0% in Claude Code to 76.4% in Meta-Harness across the five selected agents—an 18.4-point range with the same model. The 2.0 public leaderboard does not report cost. On 2.1, the same-model comparisons include both score and cost: Fable 5 scores 83.82% in Claude Code at $552.67 total over 445 trials ($1.24 per task) versus 80.45% in Terminus 2 at $438.64 ($0.99 per task). GPT-5.5 scores 83.15% in Codex at $2,059.19 ($4.63 per task) versus 77.98% in Terminus 2 at $493.85 ($1.11 per task)—5.17 points for roughly 4.17× cost. On 3.0, all displayed rows have 370 trials. Claude Code with Fable 5 scores 34.05% at $17.52 per task; Claude Code with GLM 5.3 scores 32.43% at $4.79 per task—only 1.62 points apart at roughly 3.66× cost. The slide uses selected rows to explain the mechanism, not to reproduce or rank the full leaderboard.\n\nOpenHands Index is a complementary harness-comparison source. It reports SWE-Bench, SWE-Bench Multimodal, Commit0, SWT-Bench, and GAIA results with cost per instance, average runtime, agent/model versions, and per-instance outcomes. It also enables same-model comparisons across agents. As of the current snapshot, Claude Opus 4.6 scores 74.4 on SWE-Bench in Claude Code at $1.14 per instance versus 76.8 in OpenHands Sub-agents at $0.85. Keep OpenHands Index and Terminal-Bench as separate evidence streams because their task sets and evaluation methods differ.\n\n[Refresh before presenting]\n- Re-fetch the public 2.0, 2.1, and 3.0 leaderboards from Harbor Hub.\n- Preserve benchmark version, agent, model, reasoning effort, trial count, total cost, and leaderboard update timestamp.\n- Recalculate cost per task as total_cost_usd / n_trials; never compare total costs when trial counts differ.\n- Keep the 2.0 cost field labeled unavailable unless the official leaderboard adds it.\n- Recheck whether the selected same-model pairs still exist and remain displayed.\n- Check OpenHands Index alternative-agent results for newer same-model comparisons, preserving benchmark, agent version, model version, cost per instance, runtime, and submission time.\n- Never combine Terminal-Bench and OpenHands Index scores on one numeric axis without an explicit methodology bridge.\n\n[Sources]\n- https://www.tbench.ai/?version=2.0\n- https://www.tbench.ai/?version=2.1\n- https://www.tbench.ai/?version=3.0\n- https://github.com/harbor-framework/terminal-bench-website/blob/main/lib/leaderboard.ts\n- https://index.openhands.dev/alternative-agents\n- https://github.com/OpenHands/openhands-index-results/tree/main/alternative_agents\n[/Sources]",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "",
  "",
  "",
  "",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "The inflection point is query cost, not storage size. File-based retrieval is fine while scans are cheap\nCardinality matters more than raw GB. A few large files can stay manageable much longer than millions of small files or hundreds of thousands of chunks.\nMove when retrieval needs structure, not just text matching. As soon as you need metadata-aware filtering, ranking, recency, deduplication, or joins across entities. \nAgents amplify retrieval inefficiency. A human may tolerate a slow grep, but an agent making dozens of retrieval calls per task compounds latency.\nThe usual architecture is not files or database, but files plus database. Keep files as the source of truth, then build an indexed retrieval layer on top.",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "https://medium.com/@lmpo/llm-agent-skills-why-metadata-scripts-beat-plain-tool-calling-ffe17762b9fb",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "But group them mentally:\nExecution\nloop\ntool execution\nSystem\nenvironment\nstate\nfeedback\nControl\nlimits\ntask contract\nmodel abstraction \n\n\nControl\nExecution loop\nBehavior control\nInterface\nTools\nEnvironment\nIntelligence scaffolding\nPrompt orchestration\nFeedback ingestion\nState management\nStandardization\nTask contract\nModel abstraction",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "https://odsc.ai/speakers-portfolio/engineering-the-harness-a-practical-workshop-on-context-engineering-for-generative-ai/",
  "https://odsc.ai/speakers-portfolio/engineering-the-harness-a-practical-workshop-on-context-engineering-for-generative-ai/",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "",
  "",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "Visual: A bold quote: \"Code is Free. Architecture is Expensive.\" \n Diagram: Show the \"harness\" created by standard CI/CD tools—e.g., a \"lint error\" bouncing an agent back, or a \"max file length test\" boxing the agent in.\n Credit: Ryan Lopopolo / OpenAI.\n  \"Ryan Lopopolo from OpenAI emphasizes that while code is free to generate, bad architecture is expensive. Since agents can write code infinitely, your system's constraints must become your harness. Embed 'prompts' directly into the codebase environment—write specific lint error messages that act as instructions to the agent, or write tests that enforce file length limits. Use the environment's friction to keep the agent in check.\"",
  "",
  "",
  "from openhands.agent import Agent\nfrom openhands.runtime import DockerWorkspace\nfrom openhands.conversation import Conversation\n\n# 1. Create workspace (repo environment)\nworkspace = DockerWorkspace(\n    image=\"swebench:latest\",\n    working_dir=\"/workspace/repo\"\n)\n\n# 2. Initialize agent (the harness entrypoint)\nagent = Agent(\n    model=\"anthropic/claude-3\",\n    tools=[\"bash\", \"editor\", \"git\"],\n    system_prompt_kwargs={\"cli_mode\": True},\n)\n\n# 3. Wrap in a conversation loop (the core harness)\nconversation = Conversation(\n    agent=agent,\n    workspace=workspace,\n    max_iterations=50,\n)\n\n# 4. Construct the SWE task (benchmark prompt)\ntask_prompt = f\"\"\"\nYou are given a GitHub issue and a repository.\n\nIssue:\n{issue_text}\n\nYour goal:\n- Identify the bug\n- Modify the code (not tests)\n- Run tests to verify the fix\n- Produce a valid patch\n\nWork step by step using tools.\n\"\"\"\n\n# 5. Run the harness loop\nconversation.run(task_prompt)\n\n# 6. Extract result (the \"work product\")\npatch = workspace.get_git_diff()\nprint(patch)",
  "",
  "",
  "",
  "",
] satisfies (string | undefined)[];

// Keep speaker notes aligned with the active route below. Page021 (Snowflake)
// replaces Page017 (HF Smolagents) in the early evidence sequence. Page019
// (AutoHarness / Meta-Harness) now lives after Page038 in the later cluster on
// emerging approaches to building harnesses.
export const parkedEvidencePages = [Page017, Page022] satisfies Page[];
export const parkedEvidenceNotes = [sourceNotes[13], sourceNotes[18]] satisfies (string | undefined)[];

const terminalBenchSourceVisualNote = "Speaker note: This is the official Terminal-Bench 2.0 leaderboard filtered to one model—Claude Opus 4.6—and five harnesses. Meta-Harness resolves 76.4% of tasks, Terminus-KIRA 74.7%, Droid 69.9%, Mux 66.5%, and Claude Code 58.0%. The 18.4-point range is visible in the original leaderboard rather than reconstructed as a house chart. The rows also preserve rank, confidence interval, release date, and the live filter state. Terminal-Bench 2.0 does not report cost, so cost belongs on a separate 2.1 or 3.0 evidence slide rather than being compressed into this one.\n\n[Refresh before presenting]\n- Reopen the official 2.0 leaderboard and apply the Claude Opus 4.6 plus five-agent filters.\n- Re-capture the source view if scores, ranks, release dates, or the site design changes.\n- Preserve the filter chips and confidence intervals in the crop.\n- Recalculate the spread from the displayed maximum and minimum.\n\n[Sources]\n- https://www.tbench.ai/?version=2.0\n- https://github.com/harbor-framework/terminal-bench-website/blob/main/lib/leaderboard.ts\n[/Sources]";

const snowflakeSqlHarnessNote = "Speaker note: Frame Snowflake CoCo as a data-native harness, not as a universal coding-agent winner. Data-eng-bench contains 103 repository-level data-engineering tasks against a shared enterprise-scale warehouse. The chart holds the model and task set constant while changing the harness. Snowflake reports that CoCo with Opus 5 reaches 73.8% Pass@1 at $0.756 per trial versus Claude Code at 69.6% and $2.959; CoCo with GPT-5.6 Sol reaches 64.1% at $0.358 versus Codex at 60.5% and $0.538; and CoCo with Sonnet 5 matches Claude Code at 56.6% while costing $0.660 rather than $1.530. The plausible mechanism is domain fit: CoCo runs natively in Snowflake with direct schema and metadata access, uses fewer tool operations and agent steps, and avoids irrelevant cross-dialect validation. Say the caveat explicitly: Snowflake created both CoCo and the benchmark, although the benchmark, tasks, and verifier are open source.\n\n[Refresh before presenting]\n- Recheck the article and open benchmark repository for corrected results or additional harness submissions.\n- Preserve task count, harness/version, model, Pass@1 definition, cost per trial, and vendor-authored caveat.\n- Keep the original chart rather than redrawing the benchmark as a house graphic.\n\n[Sources]\n- https://www.snowflake.com/en/blog/engineering/data-eng-bench-data-engineering-agent-benchmark/\n- https://github.com/Snowflake-Labs/data-eng-bench\n[/Sources]";

const arcAgiHarnessNote = "Speaker note: This is the second custom-harness example, and it isolates an even smaller intervention than Snowflake. OpenAI kept GPT-5.6 Sol fixed and changed two state-management choices in the ARC-AGI-3 harness: retain private reasoning across turns, and replace rolling truncation with compaction. On the public task set, the score rose from 13.3% to 38.3% while output tokens fell by roughly 6×. The causal story is concrete: the generic harness discarded the reasoning behind earlier actions and eventually discarded older actions too, forcing the agent to relearn the game. The custom harness preserved what it had learned. The benchmark is unusual—interactive 2D puzzle games—and the experiment is vendor-authored, so use it as evidence about state handling rather than as a general model-quality claim.\n\n[Sources]\n- https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/\n- https://openai.com/index/builders-guide-to-gpt-5-6/\n[/Sources]";

const openBenchPriorityNote = "Speaker note: OpenBench is the cleanest compact demonstration that a harness changes the operating profile even when the model and task bundle are held fixed. In this result-sealed GPT-5.6 bundle, seven harnesses share 42 common task/trials. Solve rate ranges from 73.8% to 85.7% (11.9 points); median wall time ranges from 39.7 to 94.6 seconds; and reported fresh tokens per solve range from 5,519 to 117,107 (about 21.2×). This is not a universal product ranking. It is one matched bundle with disclosed caveats, and Devin does not report comparable token telemetry. The point is that harness choice changes accuracy, speed, and token use around the same model.\n\n[Refresh before presenting]\n- Reopen the official Harness Bench and use the newest result-sealed bundle with a useful same-model denominator.\n- Record model, release date, task-set SHA, results SHA, matched rows, common task/trials, disclosed caveats, and telemetry coverage.\n- Re-capture the recognizable source table if rows, metrics, or page design change.\n- Recalculate the solve-rate and token spreads from displayed comparable values.\n- Do not compare scores across bundles; OpenBench warns that task sets, trial counts, and timeout caps differ.\n\n[Refine later]\n- Decide whether the final presentation benefits from subtle row/column highlighting or a progressive reveal.\n- Revisit crop scale after the final page sequence and presentation viewport are locked.\n\n[Sources]\n- https://openbench.run/openbench/\n[/Sources]";

const harnessBenchPaperNote = "Speaker note: This slide replaces the earlier Latent Space treatment with the original Harness-Bench paper. The benchmark contains 106 sandboxed offline tasks across eight realistic workflow categories. Its main factorial evaluation covers six configurable harnesses and eight model backends; with the separate Codex reference, the paper analyzes 5,194 trajectories. Among configurable harnesses, aggregate score ranges from 52.4 for OpenClaw to 76.2 for NanoBot—a 23.8-point spread under the same task set and model-backend pool. The table also shows that completion, tool use, consistency, robustness, tokens, and turns vary with the execution stack. Codex scores 80.4 but is reported separately because it is a model-bound coding agent, not part of the configurable full-factorial comparison. The takeaway is the paper's own: capability should be reported at the model–harness configuration level, not attributed to the base model alone.\n\n[Refine later]\n- Harmonize the headline structure across Snowflake, Terminal-Bench, OpenBench, and Harness-Bench once the section's final story is locked.\n- Decide whether to add a second paper visual showing per-model harness dependence; avoid crowding this table slide.\n- Consider highlighting NanoBot, OpenClaw, and Codex directly on the source table after the final crop is locked.\n\n[Refresh before presenting]\n- Check for a newer arXiv revision, corrected table, or updated project results.\n- Preserve the distinction between the six configurable harnesses and the separately reported model-bound Codex result.\n\n[Sources]\n- https://arxiv.org/html/2605.27922v1\n- https://github.com/Qihoo360/harness-bench\n[/Sources]";

const openSourceEcosystemNote = "Speaker note: This is an ecosystem sketch, not a product ranking. Teams choosing something other than a provider-owned harness are not starting from zero: there are established open-source projects spanning minimal loops, terminal agents, autonomous development platforms, git-native assistants, and IDE-native agents. Pi, OpenCode, and OpenHands are the anchor examples; Aider and Cline broaden the interface spectrum. Official GitHub repositories showed approximately 99K, 203K, 86K, 49K, and 67K stars respectively on Aug. 30, 2026. Stars measure attention, not usage, quality, or production readiness.\n\n[Refine later]\n- Add one comparable usage or adoption signal; do not substitute downloads or stars without explaining what each measures.\n- Decide whether the final talk should emphasize only the three workshop-aligned harnesses.\n\n[Refresh before presenting]\n- Re-query every repository on one date and update the visible capture date.\n- Recheck project ownership, repository URLs, and one-line positioning against current documentation.\n\n[Sources]\n- https://github.com/earendil-works/pi\n- https://github.com/anomalyco/opencode\n- https://github.com/OpenHands/OpenHands\n- https://github.com/Aider-AI/aider\n- https://github.com/cline/cline\n[/Sources]";

const harnessDesignBetsNote = "Speaker note: This page makes the alternatives concrete before the first workshop. These are not four versions of the same product. Hermes centers a personal learning loop: memory, skills, and patterns can persist and improve across sessions. Pi deliberately keeps a small default coding loop with broad model support and an extension surface. Prime Agent treats context as variables inside a persistent Python environment, makes subagents callable, and exposes prompts, memories, skills, and subagent definitions as a continual harness that can be refined. DeepSeek Harness makes composability the architecture: its session log, prompt assembly, tools, agent interface, and concrete loop are packages connected through plugins, leaving the loop itself swappable. The short labels are teaching summaries, not claims that each project does only one thing. The official project-preview images are clickable in review mode.\n\n[Refine later]\n- Consider replacing the GitHub previews with direct product UI screenshots if each project publishes a stable, comparable hero image.\n- Decide whether the spoken sequence should move from smallest intervention to most adaptive architecture: Pi → DeepSeek → Hermes → Prime.\n- Harmonize the label language with the final course vocabulary for memory, tool architecture, orchestration, and self-improvement.\n\n[Refresh before presenting]\n- Recheck project ownership, repository URLs, taglines, and architectural claims.\n- Re-capture official previews together so embedded GitHub star and fork counts share one date. Current assets were captured Aug. 30, 2026.\n\n[Sources]\n- https://github.com/NousResearch/hermes-agent\n- https://github.com/earendil-works/pi\n- https://www.primeintellect.ai/blog/prime-agent\n- https://github.com/PrimeIntellect-ai/prime-agent\n- https://github.com/deepseek-ai/deepseek-harness\n- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/core.md\n[/Sources]";

const technicalDebtScaleNote = "Speaker note: The prior slide says harnesses carry technical debt; this slide puts a production-scale number on that claim. From July 8, 2025 through July 8, 2026, OpenHands merged 5,679 PRs across four public repositories, including 1,778 classified as fixes (31%). OpenCode merged 5,700 PRs, including 2,304 fixes (40%). Both codebases were roughly 1.05 million lines at capture time. The broader dataset in the article also includes Codex and Hermes, but this visual intentionally isolates two independently built open-source systems whose annual activity converged on almost the same volume. The conclusion is not that PR count is intrinsically good; it is that maintaining a production harness is ongoing platform work, not a one-time wrapper project.\n\n[Refine later]\n- Harmonize the headline with the preceding technical-debt slide once the section headings are finalized.\n- Decide whether to keep this static source visual or use the supplied 4:5 MP4 as a short build animation during presentation. The motion asset is stored at `assets/coding-agent-platforms-technical-debt-4x5.mp4`.\n- Consider a follow-on slide using the full four-product table if the long-form deck needs the broader comparison.\n\n[Refresh before presenting]\n- These numbers are a fixed July 8, 2025–July 8, 2026 snapshot; do not silently update only some values. Either preserve this dated cohort or rerun the complete GitHub collection.\n- Keep the caveats visible in the spoken explanation: OpenHands aggregates four repos; OpenCode uses its flagship repo; bug-fix classification is heuristic; product scope and labeling conventions differ.\n\n[Sources]\n- https://www.openhands.dev/blog/coding-agents-and-technical-debt\n- GitHub GraphQL and REST APIs, collected July 8, 2026\n[/Sources]";

const workshopHarnessComparisonNote = "Speaker note: This is the setup for the first hands-on comparison. Hold the model, model settings, task, repository state, runtime environment, and verifier constant; vary only the harness. Ask participants to predict the differences before revealing the short-suite and incident-project results on the next two pages. Compare task outcome and evidence, tool-call sequence and count, input/output/cache tokens, wall time, and estimated price. The two task shapes deliberately avoid turning the exercise into a universal harness ranking.\n\n[Refine later]\n- Add saved Agent Canvas trace excerpts showing how the action sequences diverged.\n- Add at least three trials for the most informative tasks and report median and range.\n- Decide whether the live workshop computes price or receives a prepared worksheet with the pricing method.\n\n[Refresh before presenting]\n- Re-run every task with current model and harness versions.\n- Record model, reasoning effort, harness commit/version, task commit, runtime image, token accounting, cache treatment, pricing date, and number of trials.\n\n[Sources]\n- ../../../../../../../harness-benchmark/results/short-suite.md\n- ../../../../../../../harness-benchmark/results/incident-project.md\n- ../../../../../../../harness-benchmark/METHODOLOGY.md\n[/Sources]";

const workshopShortSuiteResultsNote = "Speaker note: Reveal only after participants predict the outcome. Every harness used GLM-5.2, started from a clean copy, received the same eight tasks, and passed all eight on the first attempt. Pi made 85 model calls, sent 573,137 input tokens, finished in 678 seconds, and cost $0.3345. OpenCode made 100 calls, sent 1,233,824 input tokens, finished in 838.6 seconds, and cost $0.5711. OpenHands made 113 calls, sent 3,028,731 input tokens, finished in 1,140.8 seconds, and cost $1.2489. Relative to Pi, OpenHands sent 5.28× as much input context, cost 3.73× as much, and took 1.68× as long. The most consistent mechanism was context per model call: roughly 6.7K for Pi, 12.3K for OpenCode, and 26.8K for OpenHands. OpenHands described 22 tools, OpenCode 10 on main-agent calls, and Pi 4, but the measurement does not isolate the token contribution of tool schemas from system instructions, history, or tool results.\n\n[Refine later]\n- Add a follow-on trace anatomy page for the concurrent-cache task: OpenHands made 46 calls versus 17 for Pi and OpenCode.\n- Add a counterexample page for the rate-limiter task, where Pi used the fewest tokens but finished last.\n- Use saved Agent Canvas histories to reveal the action sequence after the aggregate table.\n\n[Refresh before presenting]\n- Repeat the most informative tasks at least three times per harness and report median, range, and first-pass success.\n- Preserve the Aug. 24, 2026 versions if this fixed snapshot remains: Agent Canvas 1.15.0, OpenHands Agent Server 1.42.1, Pi 0.80.6 with pi-acp 0.0.31, and OpenCode 1.18.21.\n- Use provider-returned usage as the cross-harness token and cost authority; missing telemetry is unknown, not zero.\n\n[Sources]\n- ../../../../../../../harness-benchmark/results/short-suite.md\n- ../../../../../../../harness-benchmark/METHODOLOGY.md\n[/Sources]";

const workshopIncidentResultsNote = "Speaker note: The longer incident-operations project changes the efficiency ranking. OpenCode satisfied the corrected 8/8 contract in 17m40s with 76 model calls, 36,139 input tokens per call, 2,746,582 input tokens, and $0.768 provider cost. Pi made fewer calls—69—but sent 45,858 input tokens per call, so it used 3,164,231 input tokens, cost $1.054, and retained one real browser-marker failure. OpenHands took 26m42s with 95 calls, 71,157 input tokens per call, 6,759,904 input tokens, and $2.614 cost. Its specified behavior passed; the original verifier crashed because it assumed an Incident return object although the task had not specified the return type. This is a useful workshop caution: verifier failures must be audited, but raw outputs should remain preserved. The operational lesson is that model-call count alone is not an efficiency measure; the amount of context carried by each call can reverse the ranking.\n\n[Refine later]\n- Add the blocked self-test trace as a bridge into bounded tools and long-running loop control.\n- Add a compact verifier-audit visual distinguishing raw score, corrected contract interpretation, and real residual failure.\n\n[Refresh before presenting]\n- Keep this as a dated Aug. 24, 2026 case study unless the full three-lane experiment is rerun.\n- Preserve provider failures and timing caveats; OpenHands recovered from one HTTP 502 during this run.\n\n[Sources]\n- ../../../../../../../harness-benchmark/results/incident-project.md\n- ../../../../../../../harness-benchmark/METHODOLOGY.md\n[/Sources]";

const dynamicWorkflowArchitectureNote = "Speaker note: Dynamic workflows move orchestration from a fixed, hand-authored graph into runtime behavior. Anthropic says Claude writes orchestration scripts, plans from the prompt, decomposes the work, fans it across tens to hundreds of parallel subagents, checks results before synthesis, and persists progress outside the conversation so interrupted work can resume. The source visual shows a React-to-Solid migration with six phases and 35 agents; each lane exposes model, token, tool, and elapsed-time telemetry. This is an architecture change in the harness, not merely a larger context window or a longer system prompt.\n\n[Refresh before presenting]\n- Recheck general availability, plan requirements, ultracode behavior, auto-mode guidance, and managed settings.\n- Re-capture the official workflow visual if Anthropic changes the product UI.\n\n[Sources]\n- https://claude.com/blog/introducing-dynamic-workflows-in-claude-code\n- https://code.claude.com/docs/en/dynamic-workflows\n[/Sources]";

const dynamicWorkflowBunNote = "Speaker note: Anthropic presents the Bun port as an example of dynamic workflows at scale: roughly 750,000 lines of Rust, 99.8% of the existing test suite passing, and eleven days from first commit to merge. The workflow first mapped Rust lifetimes, then generated behavior-identical ports with hundreds of agents and two reviewers on each file, then ran build-and-test fix loops, followed by an optimization pass. Keep the caveat visible: Anthropic explicitly said the port was not yet in production. This is a vendor-reported case, not a controlled benchmark, and dynamic workflows consume meaningfully more usage than a typical Claude Code session.\n\n[Sources]\n- https://claude.com/blog/introducing-dynamic-workflows-in-claude-code\n[/Sources]";

const dynamicWorkflowDecisionNote = "Speaker note: Use this as the decision gate before the multi-agent claim. Dynamic workflows are most plausible for high-value work with separable subproblems, information or artifacts that exceed one context, and a strong verification path. The harness must still define workspace ownership, artifact merge rules, independent review, budget, checkpoints, approvals, and a stop condition outside the agents' own confidence. Anthropic's earlier research system found a 90.2% improvement on an internal breadth-first research evaluation, but multi-agent systems used about 15× the tokens of chats and were a poor fit for domains with shared context and many interdependencies. The next section asks whether the task earns that cost.\n\n[Sources]\n- https://claude.com/blog/introducing-dynamic-workflows-in-claude-code\n- https://www.anthropic.com/engineering/multi-agent-research-system\n[/Sources]";

const factoryCompletionResultNote = "Speaker note: Factory's GDAL result is a completion-control case, not a generic multi-agent win. In the single-agent Fable 5 xhigh campaign, Droid wrote about 17,000 lines and reached 35.8% behavioral parity in 15 hours. It did not hit a budget cap; it stopped because it judged the work complete. In the system campaign, the same model and reasoning level operated as implementer, validator, and orchestrator. The candidate grew to about 115,000 lines and reached 90.3% in 196.9 hours. The system spent about 14× the credits and 13× the wall time. Each condition was one campaign, and the runs were not compute-matched. The causal claim is narrower: an independent standard changed the stop judgment; the additional compute followed.\n\n[Sources]\n- https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks\n- ../../../../../../../harness-benchmark/docs/factory-multi-agent-analysis.md\n[/Sources]";

const factoryCompletionMechanismNote = "Speaker note: The key intervention is separation of authority. Before implementation, the validator surveys the black-box reference and builds a weighted instrument. The implementer builds the candidate but never sees the instrument or its raw results. The validator clusters failures, the orchestrator rejects noise and turns real gaps into capability-level directives, and the orchestrator—not the implementer—decides when to ship. The wall prevents a sparse sample from becoming the target. This resembles independent verification and validation: the standard may evolve, but it cannot quietly collapse around whatever has already been built. Use this page to open the question: who should decide when the agent is done?\n\n[Sources]\n- https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks\n[/Sources]";

const nvidiaAvoNote = "Speaker note: NVIDIA's Agentic Variation Operators are a custom harness for sustained experimental search. In the reported attention-kernel run, AVO operated for seven days, explored more than 500 directions, and committed 40 kernel versions. The resulting kernels beat cuDNN by up to 3.5% and FlashAttention-4 by up to 10.5% on the evaluated DGX B200 configurations. The architecture combines a main agent with persistent memory and a supervisor that can redirect the search when progress stalls. NVIDIA also reports completing all 183 public ARC-AGI-3 levels, but says the model-baseline comparison is not a controlled ablation. Use the slide as evidence that persistent state and supervisory recovery can sustain productive iteration—not as a general leaderboard claim.\n\n[Refresh before presenting]\n- Check for a paper, released trace, or controlled ablation beyond the NVIDIA technical report.\n- Preserve hardware, benchmark, and vendor-authored caveats.\n\n[Sources]\n- https://developer.nvidia.com/blog/nvidia-avo-reaches-100-on-arc-agi-3-demonstrating-a-frontier-level-general-purpose-architecture-for-long-horizon-autonomous-agents/\n- https://developer-blogs.nvidia.com/wp-content/uploads/2026/08/nvidia-avo-architecture-long-horizon-autonomous-agent-work.webp\n[/Sources]";

const uberSoftwareFactoryNote = "Speaker note: This page changes scale from individual benchmark runs to a production fleet. Uber reports that weekly active users across its agentic offerings grew 7× and weekly agent requests 9.4× from February to August 2026, while total AI spend had relatively stabilized since April. More than 70% of pull requests were attributed to local or cloud agents, employees had built over 3,600 agent skills, and the platform executed more than 30,000 agent-skill runs per day. Do not read the unlabeled cost curve as a precise value. The useful lesson is operational: decompose spend into adoption, sessions, turns, requests, tokens, and price; then optimize cost per verified unit of work rather than suppressing adoption.\n\n[Refresh before presenting]\n- Recheck the article for corrected figures or a later measurement window.\n- Keep Uber's internal-scope and attribution-method caveats explicit.\n\n[Sources]\n- https://www.uber.com/ca/en/blog/efficient-software-factory/\n[/Sources]";

const mcpArchiveNote = "Speaker note: Archival page. This August 2026 paper compared MCP and CLI tool use over one fixed six-operation software task across seven agent scaffoldings and five models. Its headline result is that scaffolding dominated the interface: paired MCP-to-CLI cost ratios ranged from 0.43× to 29×, and one local 27B model varied 139× across scaffoldings while completing the task in every case. Agents also frequently ignored the assigned interface, so the authors verified actual repository state and released the harness and dataset. Keep this page in reserves until the MCP section has a precise question; it supports 'measure the whole model–harness–interface configuration,' not 'MCP is always expensive.'\n\n[Refresh before presenting]\n- Check for a revised paper and preserve the one-task limitation.\n\n[Sources]\n- https://arxiv.org/abs/2608.08654\n[/Sources]";

const contextPlacementFrameNote = "Speaker note: Do not describe these as three layers of memory. Active context is the model's current input; working state is an external task-resumption artifact; durable knowledge is information intended to transfer across sessions or tasks. The placement decision matters because every item placed in active context consumes attention and tokens, while every durable item creates a maintenance obligation. Requirements that must not drift belong in permissions, tests, verifiers, schemas, or other deterministic controls—not only in remembered prose.\n\n[Sources]\n- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents\n- https://openai.com/index/harness-engineering/\n- Local ODSC workshop design notes\n[/Sources]";

const contextPlacementDecisionNote = "Speaker note: Turn the distinction into a placement exercise. Ask where each item should live and how long it must survive. Stable project rules can live in reviewed project policy; reusable procedures should load as skills only when relevant; current plans and evidence need checkpoints; code facts should usually be retrieved again because repositories change; security and acceptance requirements need enforcement; stale information should be deleted. The smallest durable home reduces both context cost and the chance of outdated guidance dominating the task.\n\n[Refine later]\n- Add one trace showing the same task with a bloated always-on context versus selective retrieval.\n- Align terminology with the final workshop worksheet and repository examples.\n\n[Sources]\n- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents\n- https://openai.com/index/harness-engineering/\n- Local ODSC workshop design notes\n[/Sources]";

const langChainLeanHarnessNote = "Speaker note: LangChain's July 2026 Deep Agents v0.7 release is a clean example of deleting scaffolding as models improve. They removed the base system prompt, shortened built-in tool descriptions by 43%, and made TodoListMiddleware opt-in after their evaluation found the planning prompt and write_todos tool did not significantly improve performance. Together those changes reduced base input tokens from roughly 6,000 to 2,000 per default-agent turn—a 65% reduction. Across autonomous, conversational, and long-context categories, overall reward held steady. Keep the model-level nuance: reward confidence intervals included zero for every model; Luna and Opus had statistically clear token reductions, Luna had a statistically clear cost reduction, and Sonnet's cost increased on two difficult autonomous tasks. The lesson is not 'remove planning'; it is to retest inherited harness assumptions for each model and task shape.\n\n[Refresh before presenting]\n- Check for a newer Deep Agents release and corresponding evaluation report.\n- Preserve the distinction between base-input reduction and end-to-end token or cost reduction.\n- Keep model-level exceptions visible if the slide expands into a detailed chart.\n\n[Sources]\n- https://www.langchain.com/blog/deep-agents-v0-7\n- https://github.com/langchain-ai/deepagents/pull/5009\n- https://github.com/langchain-ai/deepagents/pull/4929\n[/Sources]";

const baseNotes = [
  ...sourceNotes.slice(0, 4),
  sourceNotes[28],
  ...sourceNotes.slice(4, 13),
  snowflakeSqlHarnessNote,
  terminalBenchSourceVisualNote,
  openBenchPriorityNote,
  harnessBenchPaperNote,
  arcAgiHarnessNote,
  nvidiaAvoNote,
  uberSoftwareFactoryNote,
  openSourceEcosystemNote,
  harnessDesignBetsNote,
  sourceNotes[24],
  workshopHarnessComparisonNote,
  workshopShortSuiteResultsNote,
  workshopIncidentResultsNote,
  ...sourceNotes.slice(25, 27),
  technicalDebtScaleNote,
  sourceNotes[15],
  ...sourceNotes.slice(35, 58),
  ...sourceNotes.slice(29, 33),
  langChainLeanHarnessNote,
  ...sourceNotes.slice(58, 65),
  contextPlacementFrameNote,
  contextPlacementDecisionNote,
  ...sourceNotes.slice(66, 97),
  factoryCompletionResultNote,
  factoryCompletionMechanismNote,
  ...sourceNotes.slice(97, 124),
  dynamicWorkflowArchitectureNote,
  dynamicWorkflowBunNote,
  dynamicWorkflowDecisionNote,
  ...sourceNotes.slice(124),
  mcpArchiveNote,
] satisfies (string | undefined)[];

export const meta: SlideMeta = {
  title: 'Engineering the Harness — ODSC 2026',
  theme: 'rajistics-editorial',
  createdAt: '2026-08-30T21:48:33.165Z',
};

const basePages = [
  Page001,
  Page002,
  Page003,
  Page004,
  Page032,
  Page005,
  Page006,
  PageMarketHarnesses,
  PageProviderHarnesses,
  Page007,
  Page008,
  Page014,
  Page015,
  Page016,
  Page021,
  Page018,
  Page024,
  Page020,
  Page025,
  Page026,
  Page027,
  PageOpenSourceEcosystem,
  PageHarnessDesignBets,
  Page028,
  PageWorkshopHarnessComparison,
  PageWorkshopShortSuiteResults,
  PageWorkshopIncidentResults,
  Page029,
  Page030,
  PageTechnicalDebtScale,
  Page019,
  Page039,
  Page040,
  Page041,
  Page042,
  Page043,
  Page044,
  Page045,
  Page046,
  Page047,
  Page048,
  Page049,
  Page050,
  Page051,
  Page052,
  Page053,
  Page054,
  Page055,
  Page056,
  Page057,
  Page058,
  Page059,
  Page060,
  Page061,
  Page033,
  Page034,
  Page035,
  Page036,
  PageLangChainLeanHarness,
  Page062,
  Page063,
  Page064,
  Page065,
  Page066,
  Page067,
  Page068,
  Page069,
  PageContextPlacementDecision,
  Page070,
  Page071,
  Page072,
  Page073,
  Page074,
  Page075,
  Page076,
  Page077,
  Page078,
  Page079,
  Page080,
  Page081,
  Page082,
  Page083,
  Page084,
  Page085,
  Page086,
  Page087,
  Page088,
  Page089,
  Page090,
  Page091,
  Page092,
  Page093,
  Page094,
  Page095,
  Page096,
  Page097,
  Page098,
  Page099,
  Page100,
  PageFactoryCompletionResult,
  PageFactoryCompletionMechanism,
  Page101,
  Page102,
  Page103,
  Page104,
  Page105,
  Page106,
  Page107,
  Page108,
  Page109,
  Page110,
  Page111,
  Page112,
  Page113,
  Page114,
  Page115,
  Page116,
  Page117,
  Page118,
  Page119,
  Page120,
  Page121,
  Page122,
  Page123,
  Page124,
  Page125,
  Page126,
  Page127,
  PageDynamicWorkflowArchitecture,
  PageDynamicWorkflowBun,
  PageDynamicWorkflowDecision,
  Page128,
  Page129,
  Page130,
  Page131,
  Page132,
  Page133,
  Page134,
  Page135,
  Page136,
  Page137,
  Page138,
  Page139,
  Page140,
  Page141,
  Page142,
  Page143,
  Page144,
  Page145,
  Page146,
  Page147,
  Page148,
  Page149,
  Page150,
  Page151,
  Page152,
  Page153,
  Page154,
  Page155,
  Page156,
  Page157,
  Page158,
  Page159,
  Page160,
  Page161,
  Page162,
  Page163,
  Page164,
  Page165,
  Page166,
  Page167,
  Page168,
  Page169,
  Page170,
  Page171,
  Page172,
  Page173,
  Page174,
  Page023,
] satisfies Page[];

const evidenceNotes = new Map<Page, string>([
  [PageHarnessBenchSensitivity, "Speaker note: This is the model-first evidence, and it is useful precisely because it does not say harnesses are irrelevant. Harness-Bench held the task suite fixed and measured each model backend across configurable harnesses. Stronger backends tended to have higher mean scores and lower cross-harness variance. Say this plainly: a strong model can absorb more harness variation, while weaker models need more careful scaffolding. The variance is across harness-level averages, not repeated-run stochastic variance.\n\n[Refresh before presenting]\n- Check for a revised Harness-Bench version and preserve the model versions, task count, and variance definition.\n- Keep Figure 3 paired with the aggregate harness table later in the section.\n\n[Sources]\n- https://arxiv.org/html/2605.27922v1#S4.F3\n[/Sources]"],
  [PageAnthropicToolSearch, "Speaker note: Anthropic's five-server example loaded 58 tool definitions and consumed about 55,000 tokens before the task began. Tool Search deferred most definitions and reduced initial context consumption from about 77,000 to 8,700 tokens, an 85% reduction. Anthropic also reports MCP-eval accuracy rising from 49% to 74% for Opus 4 and from 79.5% to 88.1% for Opus 4.5. The general lesson is not that more tools are free. The harness needs a discovery layer that keeps irrelevant tools out of active context. These are Anthropic internal evaluations, not an independent benchmark.\n\n[Refresh before presenting]\n- Recheck whether Tool Search has left beta and whether Anthropic has published updated evaluations.\n- Preserve the internal-evaluation caveat and model versions.\n\n[Sources]\n- https://www.anthropic.com/engineering/advanced-tool-use\n[/Sources]"],
  [PageSkillsBenchCurrent, "Speaker note: SkillsBench now contains 87 tasks across eight domains and evaluates 18 model-harness configurations under paired no-skill and curated-skill conditions. Curated skills raised average pass rate from 33.9% to 50.5%, a 16.6-point lift. Every tested configuration improved, but the gain ranged from 4.1 to 25.7 points. Focused skills with at most three modules outperformed larger bundles. This is the strongest evidence for why the claim sounds reasonable before we reverse it.\n\n[Refresh before presenting]\n- Use the latest SkillsBench version and record the inventory size, configuration count, and paired-condition definition.\n- If the benchmark adds configurations, replace the figure rather than redrawing it.\n\n[Sources]\n- https://arxiv.org/html/2602.12670\n[/Sources]"],
  [PageSkillsCanHarm, "Speaker note: This study uses paired runs to attribute failures or cost regressions to a loaded skill. The authors confirm 307 skill-induced cases across SkillsBench and SWE-Skills-Bench: 125 functional failures and 182 efficiency regressions. Excessive Procedure accounts for 114 of the 182 efficiency regressions, or 62.6%. The common problem was not prompt length alone. Skills turned optional exploration, implementation, debugging, and verification into mandatory work.\n\n[Refresh before presenting]\n- Check for a revised paper and preserve the paired-attribution methodology.\n- Replace the older Reddit-sourced SkillsBench warning in the live sequence; keep it only in reserves.\n\n[Sources]\n- https://arxiv.org/html/2608.11888\n[/Sources]"],
  [PageCodeRescue, "Speaker note: CodeRescue treats a failed coding attempt as new information. A supervised router chooses between additional cheap-model recovery and escalation to a stronger model. In the main GPT-5.4-nano and GPT-5.4 setting, one calibrated policy exceeded the solve rate of always escalating while using 35% of its mean recovery cost. This is clean evidence that the harness should route from execution feedback, not just from the original request.\n\n[Refresh before presenting]\n- Check the latest paper revision and preserve the model pair, five-benchmark scope, and recovery-cost definition.\n- Add the paper's frontier figure if the HTML version becomes available.\n\n[Sources]\n- https://arxiv.org/abs/2607.19338\n- https://github.com/Qijia-He/agent-budget-control\n[/Sources]"],
  [PageFactoryAggregate, "Speaker note: Factory ran the same 24 ProgramBench tasks twice for each model: once as a single agent and once with an independent validator and orchestrator controlling completion. Median hidden-suite scores rose from 56.7 to 89.3 for Fable 5, 45.1 to 75.4 for Kimi K3, and 48.6 to 66.2 for GPT-5.6 Sol. The system conditions also had far larger wall-clock budgets. Factory argues that the workflow changed the judgment of completion, which then caused the system to spend more compute. Say the caveat directly: this was not compute-matched, and Factory designed both the system and the study. The next slide uses GDAL to show the mechanism in one task.\n\n[Refresh before presenting]\n- Recheck the interactive article for corrected cells, reruns, and model-name changes.\n- Preserve the 24-task denominator and separate median score from per-task results.\n\n[Sources]\n- https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks\n[/Sources]"],
  [PageAnthropicMultiAgent, "Speaker note: This is the strongest fair positive case for multiple agents. Anthropic reports that an Opus 4 lead agent with Sonnet 4 subagents outperformed single-agent Opus 4 by 90.2% on an internal research evaluation built around breadth-first queries. Anthropic also reports that agents use about four times the tokens of chat interactions and multi-agent systems use about fifteen times the tokens of chat. The architecture works by giving independent search directions separate context windows, then compressing findings back to the lead. Say both boundaries out loud: this is an Anthropic internal evaluation, and Anthropic says most coding tasks have fewer genuinely parallel directions than research.\n\n[Refresh before presenting]\n- Recheck Anthropic's current Research architecture, model versions, and token multiplier.\n- Keep the 90.2% result and 15× bill on the same slide.\n\n[Sources]\n- https://www.anthropic.com/engineering/multi-agent-research-system\n[/Sources]"],
  [PageBenchAgent, "Speaker note: BenchAgent normalizes the benchmark loader, tool access, answer contract, usage accounting, and trajectory logging before comparing a single-agent anchor with six multi-agent workflows. With GPT-4.1 across ten reasoning, coding, and tool-use benchmarks, EvoAgent was the only workflow with a numerically positive average lift, 1.44 points, and that margin fell within one-run uncertainty guidance. The other five trailed by 2.56 to 11.29 points and generally occupied worse accuracy-cost trade-offs. This is the clean reversal after the dynamic-workflow examples: multiple agents help when the task and coordination protocol justify them, not by default.\n\n[Refresh before presenting]\n- Check for a revised BenchAgent version and preserve the shared-substrate conditions.\n- Keep the GPT-4.1 and one-run uncertainty caveats visible in the talk track.\n\n[Sources]\n- https://arxiv.org/html/2606.05670v1#S4.F2\n[/Sources]"],
  [PageToolVisibilityFrontier, "[NEW MATERIAL · REVIEW]\n\nSpeaker note: ToolChoiceConfusion holds the tasks, model set, tool outputs, agent protocol, and prompts constant while changing the tools visible at each step. Across 2,448 runs, exposing all 100 tools produced 83% success and 24,569 tokens per task. A keyword top-five menu reduced tokens but also reduced success to 61%. A causal next-step policy exposed roughly one valid tool, reached 99%, and used 2,405 tokens. The lesson is specific: tool reduction only helps when the harness understands state and preconditions. This is a synthetic benchmark with mocked APIs and manually specified contracts.\n\n[Refresh before presenting]\n- Check the latest paper revision and retain the 102-task, four-model, 2,448-run scope.\n- Confirm whether the reported tool count is a mean below one or approximately one after no-tool terminal states are included.\n\n[Sources]\n- https://arxiv.org/abs/2606.06284\n[/Sources]"],
  [PageRoutingCanLose, "[NEW MATERIAL · WORKSHOP PILOT]\n\nSpeaker note: This is our own ten-task routing exercise, one run per task. All three policies solved all ten tasks. Static routing cost $1.049 and averaged 54.8 seconds. Strongest-for-all cost $1.595 and averaged 71.2 seconds. The verify-and-escalate cascade cost $1.684, averaged 81.4 seconds, and escalated 12 times. The cascade repeated work and lost to the strongest model on both cost and latency. Use this as a discussion prompt, not a publishable comparison. The run artifact still needs resolved model IDs, SDK version, pricing timestamp, and repeated trials.\n\n[Refresh before presenting]\n- Rerun with three or more trials and record resolved model IDs, reasoning settings, SDK version, provider timestamp, and random settings.\n- Preserve the same ten tasks and hidden evaluators across all policies.\n\n[Sources]\n- /Users/rajiv.shah/Code/learn-openhands-harness/projects/p09-model-routing-benchmark/.openhands-runs/p09-full-live-llm.json\n[/Sources]"],
  [PageCompletionAuthority, "[NEW MATERIAL · VERY RECENT PREPRINT]\n\nSpeaker note: Evidence-Carrying Termination separates generating a solution from permission to declare completion. With the planner, tools, checkpoints, and nominal budgets matched, the baseline controller stopped without sufficient trace support in 40 of 66 cases. A certificate-gated controller did so in 0 of 66. The gate returned incomplete work to the controller; 18 cases recovered and 17 later completed with support. This is unusually direct evidence for external completion authority, but the paper is extremely recent, uses 22 synthetic task clusters, and tests one model stack. It certifies support under a contract, not external truth or safety.\n\n[Refresh before presenting]\n- Check for revisions, replications, or withdrawn claims immediately before the workshop.\n- Keep the synthetic-task and single-stack caveats on the slide.\n\n[Sources]\n- https://arxiv.org/abs/2608.23623\n[/Sources]"],
  [PageMatchedComputeAgents, "[NEW MATERIAL · REVIEW]\n\nSpeaker note: This study requests the same global thinking-token budget for single-agent and sequential multi-agent systems. At the 500-token condition, the single agent was best or statistically tied in six of eight model-and-dataset cells. Two concrete examples favor the single agent, while Gemini 2.5 Pro on FRAMES is an important exception. The point is not that teams never help. The correct baseline is one agent with the same budget, not one short call. Requested budgets were matched, but realized Gemini reasoning tokens were not always equal.\n\n[Refresh before presenting]\n- Check the final publication and preserve the exact 500-token condition.\n- Verify whether the authors publish a corrected realized-token comparison for Gemini.\n\n[Sources]\n- https://arxiv.org/abs/2604.02460\n[/Sources]"],
]);

const assembleWorkshopDeck = () => {
  const Workshop1Claim = workshopClaimPages[0]!;
  const Workshop1Activity = workshopClaimPages[1]!;
  const Workshop1Result = workshopClaimPages[2]!;
  const Workshop2Claim = workshopClaimPages[3]!;
  const Workshop2Activity = workshopClaimPages[4]!;
  const Workshop2Result = workshopClaimPages[5]!;
  const Workshop3Claim = workshopClaimPages[6]!;
  const Workshop3Activity = workshopClaimPages[7]!;
  const Workshop3Result = workshopClaimPages[8]!;
  const Workshop4Claim = workshopClaimPages[9]!;
  const Workshop4Activity = workshopClaimPages[10]!;
  const Workshop4Result = workshopClaimPages[11]!;
  const Workshop5Claim = workshopClaimPages[12]!;
  const Workshop5Activity = workshopClaimPages[13]!;
  const Workshop5Result = workshopClaimPages[14]!;
  const Workshop6Claim = workshopClaimPages[15]!;
  const Workshop6Activity = workshopClaimPages[16]!;
  const Workshop6Result = workshopClaimPages[17]!;

  // Each workshop follows the same teaching rhythm:
  // 1. establish why the claim sounds reasonable;
  // 2. state the claim explicitly;
  // 3. reverse it with evidence and add engineering depth;
  // 4. test it in the workshop and close on the measured result.
  const coursePages = [
    // Opening: coding models became useful, and provider-owned harnesses became the default.
    Page001,
    Page002,
    Page003,
    Page004,
    Page032,
    Page005,
    Page006,
    PageMarketHarnesses,
    PageProviderHarnesses,
    Page007,
    Page008,
    Page014,
    Page015,
    Page016,

    // Workshop 1 · Harnesses do not matter.
    // The opening has made the model-first case. The benchmark sequence now reverses it.
    PageHarnessBenchSensitivity,
    Workshop1Claim,
    Page021,
    Page018,
    Page024,
    Page020,
    Page025,
    Page026,
    Page027,
    PageOpenSourceEcosystem,
    PageHarnessDesignBets,
    Page028,
    Page029,
    Page030,
    PageTechnicalDebtScale,
    Workshop1Activity,
    Workshop1Result,

    // Workshop 2 · More tools create a super-agent.
    // Start with the appeal and adoption of richer search and tool surfaces.
    Page040,
    Page039,
    Page041,
    Page042,
    Page043,
    Page044,
    Page046,
    Page048,
    Page049,
    Page050,
    Page051,
    Workshop2Claim,
    // Then show the retrieval, prompt, runtime, and interface costs.
    PageAnthropicToolSearch,
    PageToolVisibilityFrontier,
    Page045,
    Page047,
    Page052,
    Page053,
    Page054,
    Page055,
    Page056,
    Page057,
    Page058,
    Page059,
    Page156,
    Page161,
    Page173,
    Workshop2Activity,
    Workshop2Result,

    // Workshop 3 · More instructions, skills, and memory make agents better.
    // First establish why persistent guidance and accumulated context are attractive.
    Page033,
    Page034,
    Page035,
    Page036,
    Page037,
    Page038,
    Page060,
    Page062,
    Page063,
    Page064,
    Page065,
    Page066,
    Page067,
    Page068,
    PageSkillsBenchCurrent,
    Workshop3Claim,
    // Then prune the assumption and decide what belongs in context at all.
    PageSkillsCanHarm,
    PageLangChainLeanHarness,
    Page069,
    PageContextPlacementDecision,
    Page070,
    Page071,
    Page072,
    Page073,
    Page074,
    Page075,
    Page076,
    Page077,
    Page078,
    Page079,
    Page080,
    Page081,
    Page082,
    Page083,
    Page084,
    Page085,
    Page086,
    Page087,
    Page088,
    Page089,
    Page090,
    Page091,
    Page092,
    Page093,
    Page095,
    Page096,
    Page097,
    Page098,
    Page099,
    Page100,
    Workshop3Activity,
    Workshop3Result,

    // Workshop 4 · Use the strongest model for every task.
    // Begin with improving frontier models and provider guidance.
    Page162,
    Page164,
    Page159,
    Page160,
    Page163,
    Page165,
    Workshop4Claim,
    // Reverse with configuration dependence, cost, verification, and routing evidence.
    PageCodeRescue,
    PageRoutingCanLose,
    Page166,
    Page167,
    Page168,
    Page169,
    Page170,
    Page171,
    Page172,
    Page120,
    Workshop4Activity,
    Workshop4Result,

    // Workshop 5 · Let the agent run until it figures it out.
    // First make the case for loops, persistence, and longer-running work.
    Page101,
    Page103,
    Page104,
    Page105,
    Page106,
    Page107,
    Page108,
    Page109,
    Page110,
    Page111,
    Page112,
    Workshop5Claim,
    // Then move authority outside the agent and make completion measurable.
    PageFactoryAggregate,
    PageFactoryCompletionResult,
    PageFactoryCompletionMechanism,
    PageCompletionAuthority,
    Page113,
    Page114,
    Page115,
    Page116,
    Page117,
    Page118,
    Page119,
    Page121,
    Page122,
    Page123,
    Page124,
    Page125,
    Page126,
    Page127,
    Workshop5Activity,
    Workshop5Result,

    // Workshop 6 · What you want is a multi-agent system.
    // Open with the architecture's appeal and the strongest dynamic-workflow example.
    Page128,
    Page130,
    Page131,
    Page132,
    Page133,
    Page134,
    Page135,
    PageDynamicWorkflowArchitecture,
    PageDynamicWorkflowBun,
    PageAnthropicMultiAgent,
    Workshop6Claim,
    // Then count coordination, duplicated context, handoffs, and validation.
    PageBenchAgent,
    PageMatchedComputeAgents,
    Page138,
    Page136,
    Page137,
    Page139,
    PageDynamicWorkflowDecision,
    Workshop6Activity,
    Workshop6Result,

    // Future directions and close.
    Page019,
    Page153,
    Page154,
    Page155,
    Page157,
    Page158,
    Page174,
    Page140,
    Page141,
    Page142,
    Page143,
    Page144,
  ] satisfies Page[];

  const retiredWorkshopPages = new Set<Page>([
    PageWorkshopHarnessComparison,
    PageWorkshopShortSuiteResults,
    PageWorkshopIncidentResults,
  ]);
  const usedPages = new Set<Page>(coursePages);
  const appendixPages = basePages.filter(
    (page) => !usedPages.has(page) && !retiredWorkshopPages.has(page),
  );
  const pages = [...coursePages, ...appendixPages] satisfies Page[];

  const noteByPage = new Map<Page, string | undefined>();
  basePages.forEach((page, index) => noteByPage.set(page, baseNotes[index]));
  const speakerNotes = pages.map((page) => evidenceNotes.get(page) ?? noteByPage.get(page));

  return { pages, speakerNotes };
};

const assembledWorkshopDeck = assembleWorkshopDeck();

export const notes = assembledWorkshopDeck.speakerNotes;
export default assembledWorkshopDeck.pages;
