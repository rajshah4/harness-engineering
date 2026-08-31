import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useSlidePageNumber,
} from '@open-slide/core';
import { RajisticsWordmark } from '../shared/rajistics-wordmark';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#03030C', accent: '#2E70FF' },
  fonts: {
    display: '"Open Sans", Arial, sans-serif',
    body: '"Open Sans", Arial, sans-serif',
  },
  typeScale: { hero: 142, body: 38 },
  radius: 8,
};

const muted = '#767880';
const orange = '#F05A24';
const green = '#4F8F45';
const purple = '#795CA5';
const brown = '#8A6A43';

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

const PlaceholderHeader = ({ number, phase, color }: { number: string; phase: string; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
    <span style={{ color }}>Workshop {number} · {phase}</span>
  </div>
);

const PhaseSegment = ({ label, active, color }: { label: string; active: boolean; color: string }) => (
  <div style={{ borderTop: `${active ? 8 : 2}px solid ${active ? color : '#C9C1AA'}`, paddingTop: 10, color: active ? color : muted, fontSize: 19, fontWeight: 850, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
    {label}
  </div>
);

const PhaseNav = ({ phase, color }: { phase: 'claim' | 'work' | 'result'; color: string }) => (
  <div style={{ position: 'absolute', left: 110, right: 110, bottom: 82, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
    <PhaseSegment label="01 · Claim" active={phase === 'claim'} color={color} />
    <PhaseSegment label="02 · Workshop" active={phase === 'work'} color={color} />
    <PhaseSegment label="03 · Result" active={phase === 'result'} color={color} />
  </div>
);

const ClaimSlide = ({ number, claim, test, color }: { number: string; claim: string; test: string; color: string }) => (
  <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '76px 136px', fontFamily: 'var(--osd-font-body)' }}>
    <PlaceholderHeader number={number} phase="claim on trial" color={color} />
    <div aria-hidden="true" style={{ position: 'absolute', right: 96, top: 12, color, opacity: 0.08, fontSize: 390, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.08em' }}>{number}</div>
    <div style={{ marginTop: 118, maxWidth: 1550 }}>
      <div style={{ color: muted, fontSize: 24, fontWeight: 850, letterSpacing: '0.12em', textTransform: 'uppercase' }}>The claim</div>
      <h1 style={{ margin: '22px 0 0', fontFamily: 'var(--osd-font-display)', fontSize: 92, fontWeight: 880, lineHeight: 1.05, letterSpacing: '-0.042em' }}>“{claim}”</h1>
      <div style={{ marginTop: 52, width: 1180, borderLeft: `8px solid ${color}`, paddingLeft: 30, fontSize: 36, fontWeight: 720, lineHeight: 1.35 }}>
        {test}
      </div>
    </div>
    <PhaseNav phase="claim" color={color} />
    <Footer />
  </div>
);

const ActivityStep = ({ number, title, detail, color }: { number: string; title: string; detail: string; color: string }) => (
  <div style={{ borderTop: `7px solid ${color}`, paddingTop: 20 }}>
    <div style={{ color, fontSize: 22, fontWeight: 900, letterSpacing: '0.1em' }}>{number}</div>
    <div style={{ marginTop: 13, fontSize: 34, fontWeight: 850, lineHeight: 1.18 }}>{title}</div>
    <div style={{ marginTop: 14, color: muted, fontSize: 25, fontWeight: 650, lineHeight: 1.36 }}>{detail}</div>
  </div>
);

const ActivitySlide = ({
  number,
  title,
  step1Title,
  step1Detail,
  step2Title,
  step2Detail,
  step3Title,
  step3Detail,
  artifact,
  color,
}: {
  number: string;
  title: string;
  step1Title: string;
  step1Detail: string;
  step2Title: string;
  step2Detail: string;
  step3Title: string;
  step3Detail: string;
  artifact: string;
  color: string;
}) => (
  <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '62px 110px', fontFamily: 'var(--osd-font-body)' }}>
    <PlaceholderHeader number={number} phase="what we will do" color={color} />
    <h1 style={contentTitleStyle}>{title}</h1>
    <div style={{ marginTop: 46, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
      <ActivityStep number="01" title={step1Title} detail={step1Detail} color={color} />
      <ActivityStep number="02" title={step2Title} detail={step2Detail} color={color} />
      <ActivityStep number="03" title={step3Title} detail={step3Detail} color={color} />
    </div>
    <div style={{ position: 'absolute', left: 110, right: 110, bottom: 160, display: 'flex', alignItems: 'baseline', gap: 20 }}>
      <span style={{ color, fontSize: 20, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Participant artifact</span>
      <span style={{ fontSize: 29, fontWeight: 780 }}>{artifact}</span>
    </div>
    <PhaseNav phase="work" color={color} />
    <Footer />
  </div>
);

const ResultMetric = ({ value, label, color }: { value: string; label: string; color: string }) => (
  <div style={{ borderTop: `5px solid ${color}`, paddingTop: 16 }}>
    <div style={{ color, fontSize: 54, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.045em' }}>{value}</div>
    <div style={{ marginTop: 12, color: muted, fontSize: 21, fontWeight: 720, lineHeight: 1.25 }}>{label}</div>
  </div>
);

const ResultSlide = ({
  number,
  claim,
  evidenceStatus,
  finding,
  metric1,
  metric1Label,
  metric2,
  metric2Label,
  metric3,
  metric3Label,
  expected,
  caveat,
  source,
  color,
}: {
  number: string;
  claim: string;
  evidenceStatus: string;
  finding: string;
  metric1: string;
  metric1Label: string;
  metric2: string;
  metric2Label: string;
  metric3: string;
  metric3Label: string;
  expected: string;
  caveat: string;
  source: string;
  color: string;
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      padding: '58px 110px',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 92,
        top: 0,
        color,
        opacity: 0.08,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 300,
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-0.08em',
      }}
    >
      {number}
    </div>

    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 22, fontWeight: 850, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
        <PlaceholderHeader number={number} phase={`result · ${evidenceStatus}`} color={color} />
      </div>
      <h1
        style={{
          margin: '14px 0 0',
          maxWidth: 1540,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 58,
          fontWeight: 850,
          lineHeight: 1.06,
          letterSpacing: '-0.035em',
        }}
      >
        “{claim}”
      </h1>

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: 76 }}>
        <div>
          <div style={{ color: muted, fontSize: 20, fontWeight: 850, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Observed so far
          </div>
          <div style={{ marginTop: 12, maxWidth: 1020, fontSize: 37, fontWeight: 760, lineHeight: 1.25 }}>
            {finding}
          </div>
          <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 34 }}>
            <ResultMetric value={metric1} label={metric1Label} color={color} />
            <ResultMetric value={metric2} label={metric2Label} color={color} />
            <ResultMetric value={metric3} label={metric3Label} color={color} />
          </div>
        </div>

        <div style={{ borderLeft: `8px solid ${color}`, padding: '8px 0 0 34px' }}>
          <div style={{ color, fontSize: 20, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Expected workshop outcome
          </div>
          <div style={{ marginTop: 20, fontSize: 34, fontWeight: 760, lineHeight: 1.34 }}>
            {expected}
          </div>
        </div>
      </div>
    </div>

    <div style={{ position: 'absolute', left: 110, right: 110, bottom: 128, borderTop: '2px solid #C9C1AA', paddingTop: 12 }}>
      <div style={{ color: muted, fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>
        <strong style={{ color: 'var(--osd-text)' }}>Caveat:</strong> {caveat}
      </div>
      <div style={{ marginTop: 7, color: '#98978F', fontSize: 17, fontWeight: 650 }}>{source}</div>
    </div>
    <PhaseNav phase="result" color={color} />
    <Footer />
  </div>
);

const Workshop1Claim: Page = () => (
  <ClaimSlide number="1" claim="Harnesses do not matter" test="Can the harness change cost, trajectory, or evidence when the model and task stay fixed?" color="var(--osd-accent)" />
);

const Workshop1Activity: Page = () => (
  <ActivitySlide
    number="1"
    title="Hold the model and task fixed, then compare the harnesses."
    step1Title="Lock the controls"
    step1Detail="Same model, task, repository state, environment, permissions, and verifier."
    step2Title="Run three harnesses"
    step2Detail="OpenHands, Pi, and OpenCode work in isolated copies of the same repository."
    step3Title="Inspect the evidence"
    step3Detail="Compare outcome, calls, context per call, wall time, cost, and stopping evidence."
    artifact="A measurement rule for a trustworthy harness comparison"
    color="var(--osd-accent)"
  />
);

const Workshop1Result: Page = () => (
  <ResultSlide
    number="1"
    claim="Harnesses do not matter"
    evidenceStatus="measured preliminary result"
    finding="The same model passed all eight tasks in three harnesses. The paths and costs still diverged sharply."
    metric1="8 / 8"
    metric1Label="tasks passed by every harness"
    metric2="5.28×"
    metric2Label="OpenHands vs Pi input tokens"
    metric3="3.73×"
    metric3Label="OpenHands vs Pi provider cost"
    expected="Compare the outcome, calls, context per call, time, cost, and evidence. The model name does not explain the run."
    caveat="One clean AWS run per cell; large differences are real observations, not estimates of normal variance."
    source="Local evidence · harness-benchmark/results/short-suite.md · Aug. 24, 2026"
    color="var(--osd-accent)"
  />
);

const Workshop2Claim: Page = () => (
  <ClaimSlide number="2" claim="More tools create a super-agent" test="Does a broader tool surface improve the answer enough to repay its prompt, runtime, and security cost?" color={orange} />
);

const Workshop2Activity: Page = () => (
  <ActivitySlide
    number="2"
    title="Measure what each tool adds and what it costs."
    step1Title="Choose the surface"
    step1Detail="Compare broad MCP, task-specific MCP, and a small direct API path."
    step2Title="Predict the cost"
    step2Detail="Estimate schema overhead, calls, failures, citations, and security boundary."
    step3Title="Check the answer"
    step3Detail="Run the same task and verify both correctness and source quality outside the agent."
    artifact="A bounded tool policy with an evidence threshold"
    color={orange}
  />
);

const Workshop2Result: Page = () => (
  <ResultSlide
    number="2"
    claim="More tools create a super-agent"
    evidenceStatus="trace-based preliminary result"
    finding="An always-declared browser added fixed prompt cost, then consumed time fighting the tool when invoked."
    metric1="14"
    metric1Label="browser schemas on every call"
    metric2="17"
    metric2Label="browser actions, mostly failing"
    metric3="335s"
    metric3Label="about 21% of wall time"
    expected="A capability must earn its schema, runtime, and security cost. Relevant tools can help; a broad surface can make the agent worse."
    caveat="This is a trace study. The clean broad-MCP vs narrow-tool vs API comparison is still pending."
    source="Local evidence · harness-benchmark/results/browser-tool-impact.md"
    color={orange}
  />
);

const Workshop3Claim: Page = () => (
  <ClaimSlide number="3" claim="More instructions, skills, and memory make agents better" test="Which information changes the next useful action, and which only consumes attention or preserves stale beliefs?" color={purple} />
);

const Workshop3Activity: Page = () => (
  <ActivitySlide
    number="3"
    title="Spend a fixed context budget."
    step1Title="Place the information"
    step1Detail="Choose active context, task state, AGENTS.md, skill, retrieval, enforcement, or deletion."
    step2Title="Run three policies"
    step2Detail="Compare no saved guidance, everything saved, and a deliberately curated context."
    step3Title="Trace the consequence"
    step3Detail="Measure first useful action, rediscovery, tokens, stale influence, and verifier outcome."
    artifact="A context budget plus a review-and-prune policy"
    color={purple}
  />
);

const Workshop3Result: Page = () => (
  <ResultSlide
    number="3"
    claim="More instructions, skills, and memory make agents better"
    evidenceStatus="signal; controlled test pending"
    finding="All three harnesses passed the short suite while average context per call varied by almost fourfold."
    metric1="6.7K"
    metric1Label="Pi context tokens per call"
    metric2="12.3K"
    metric2Label="OpenCode context per call"
    metric3="26.8K"
    metric3Label="OpenHands context per call"
    expected="Keep stable facts small, load procedures when needed, store task state outside the prompt, and delete stale material."
    caveat="Harness differences confound this signal. The no-guidance vs bloated vs curated-context trial has not run yet."
    source="Local signal · harness-benchmark/results/short-suite.md · proposed isolation in facilitator-notes/02-place-context.md"
    color={purple}
  />
);

const Workshop4Claim: Page = () => (
  <ClaimSlide number="4" claim="Use the strongest model for every task" test="When is a stronger model cheaper overall, and when can verification support a cheaper start?" color={brown} />
);

const Workshop4Activity: Page = () => (
  <ActivitySlide
    number="4"
    title="Use evidence to decide when the stronger model is worth the cost."
    step1Title="Build the matrix"
    step1Detail="Choose model tier, reasoning effort, verifier, risk floor, and escalation signal."
    step2Title="Test easy and hard work"
    step2Detail="Use a simple change, a mechanical bug, a multi-step failure, and a risky review."
    step3Title="Reveal the route"
    step3Detail="Compare verified success, latency, total cost, missed defects, and wasted escalation."
    artifact="A routing policy with explicit verifier and escalation triggers"
    color={brown}
  />
);

const Workshop4Result: Page = () => (
  <ResultSlide
    number="4"
    claim="Use the strongest model for every task"
    evidenceStatus="interaction signal; routing test pending"
    finding="Inside OpenHands, changing the model changed both efficiency and the failure surface on the same project."
    metric1="7/8 vs 8/8"
    metric1Label="Sonnet vs GLM verifier result"
    metric2="12.4m vs 26.7m"
    metric2Label="observed wall time"
    metric3="4.26M vs 6.76M"
    metric3Label="provider input tokens"
    expected="Route by risk and verifiability. Start cheaper when failure is visible, then escalate when the evidence shows the model is the constraint."
    caveat="This is a model and harness interaction signal, not a clean strongest-for-all versus verify-then-escalate comparison."
    source="Local evidence · harness-benchmark/results/browser-tool-impact.md · routing design in facilitator-notes/03-model-routing.md"
    color={brown}
  />
);

const Workshop5Claim: Page = () => (
  <ClaimSlide number="5" claim="Let the agent run until it figures it out" test="Can the agent prove completion, resume honestly, and stop safely without an independent contract?" color={green} />
);

const Workshop5Activity: Page = () => (
  <ActivitySlide
    number="5"
    title="Define done before the agent starts."
    step1Title="Write the contract"
    step1Detail="Lock objective, constraints, verifier, evidence freshness, budget, and terminal states."
    step2Title="Interrupt the run"
    step2Detail="Resume from transcript-only state versus an explicit checkpoint and environment identity."
    step3Title="Return failed gates"
    step3Detail="Require a changed hypothesis before another edit, repair round, or continuation."
    artifact="A durable goal, validation contract, and bounded autonomy policy"
    color={green}
  />
);

const Workshop5Result: Page = () => (
  <ResultSlide
    number="5"
    claim="Let the agent run until it figures it out"
    evidenceStatus="measured preliminary result"
    finding="Independent validation raised quality only when the task left room to improve; otherwise it bought confidence, not score."
    metric1="8/8 = 8/8"
    metric1Label="incident: system vs single"
    metric2="1.67×"
    metric2Label="incident system token cost"
    metric3="4/9 → 6/9"
    metric3Label="freight: Pi after two repairs"
    expected="A durable goal needs an external completion gate, fresh evidence, budgets, and explicit stop states. More time alone is not a completion strategy."
    caveat="One campaign per cell. The harder freight task improved at 11.4× Pi single-agent tokens and 3.9× wall time."
    source="Local evidence · harness-benchmark/results/completion-loop-sonnet46.md · freight-control-tower-sonnet46.md"
    color={green}
  />
);

const Workshop6Claim: Page = () => (
  <ClaimSlide number="6" claim="What you want is a multi-agent system" test="When does separable work or independent judgment outweigh duplicated setup, handoff loss, and synthesis cost?" color={purple} />
);

const Workshop6Activity: Page = () => (
  <ActivitySlide
    number="6"
    title="Add another agent only when the work can be separated cleanly."
    step1Title="Choose the architecture"
    step1Detail="One generalist, worker plus validator, or parallel specialists with isolated ownership."
    step2Title="Define the handoff"
    step2Detail="Specify task boundary, workspace, evidence fields, child budget, and synthesis owner."
    step3Title="Count the whole system"
    step3Detail="Compare quality, every child token, wall time, repeated setup, conflicts, and lost evidence."
    artifact="A delegation policy with explicit task and ownership boundaries"
    color={purple}
  />
);

const Workshop6Result: Page = () => (
  <ResultSlide
    number="6"
    claim="What you want is a multi-agent system"
    evidenceStatus="measured preliminary result"
    finding="Multi-agent completion recovered Pi’s omissions, then plateaued at the best single-agent score."
    metric1="6 / 9"
    metric1Label="OpenHands single-agent score"
    metric2="4 → 6 / 9"
    metric2Label="Pi system after two repairs"
    metric3="21 to 22M"
    metric3Label="system provider tokens"
    expected="Another agent earns its cost only when work or judgment is genuinely separable. Count every child, handoff, synthesis step, and merge risk."
    caveat="Systems took 87 to 99 minutes versus 21 to 26 minutes for singles; exploratory result, not a repeated uplift estimate."
    source="Local evidence · harness-benchmark/BENCHMARK_RESULTS.md · results/freight-control-tower-sonnet46.md"
    color={purple}
  />
);

export const meta: SlideMeta = {
  title: 'ODSC 2026 · Workshop Claim Placeholders',
  theme: 'rajistics-editorial',
  createdAt: '2026-08-31T01:05:40.284Z',
};

export const workshopClaimPages = [
  Workshop1Claim,
  Workshop1Activity,
  Workshop1Result,
  Workshop2Claim,
  Workshop2Activity,
  Workshop2Result,
  Workshop3Claim,
  Workshop3Activity,
  Workshop3Result,
  Workshop4Claim,
  Workshop4Activity,
  Workshop4Result,
  Workshop5Claim,
  Workshop5Activity,
  Workshop5Result,
  Workshop6Claim,
  Workshop6Activity,
  Workshop6Result,
] satisfies Page[];

export default workshopClaimPages;
