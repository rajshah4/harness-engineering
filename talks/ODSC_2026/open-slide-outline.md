# ODSC Open Slide outline and header registry

This is the working structural outline for the code-native ODSC master deck. It is intentionally separate from the rendered slide source so that we can settle the narrative first, then synchronize section headers and slide titles across the final route.

The current deck is a three-hour source deck, not the final conference cut. Page numbers will continue to drift as material is added.

## Naming levels

Keep these three kinds of language separate:

1. **Section header** — the recurring chapter language used in navigation, dividers, and the final talk outline.
2. **Slide claim** — the specific sentence that advances the argument on one page.
3. **Evidence label** — a small descriptor for a chart, population, date, experiment, or source.

Do not promote a working slide claim or evidence label into a section header automatically. Section headers remain provisional until the final delivery route is selected.

## Opening sequence

| Current page | Working slide claim or content | Narrative job | Final section header |
|---:|---|---|---|
| 1–2 | Engineering the Harness | Alternate covers; QR and non-QR versions | TBD |
| 3 | Rise of Agents | Establish the move from completion to longer-running agents | TBD |
| 4 | Agents = Model + Harness | Name the two-part system | TBD |
| 5 | The Road to the Attention-Interface | Show the evolution from ReAct and AutoGPT through AI IDEs to the model–harness braid | TBD |
| 6–7 | A harness is everything outside the model | Define the harness boundary and its components | TBD |
| 7 | The market is converging on agent harnesses | Show Claude Code leadership and Codex growth | TBD — current title is a working claim, not the chapter header |
| 8 | Model providers now ship the harness, too | Show the product boundary moving from models to model-plus-harness systems | TBD |
| 9 | Why learn harness engineering if Claude Code and Codex already exist? | State the audience's natural objection | TBD |
| 10 | The default harnesses are already good enough to start | Establish strong general-software competence with a comparable model-plus-minimal-harness evaluation | TBD |
| 11 | ODSC Workshop · Six Claims on Trial | Enter the workshop route after establishing that provider defaults are capable | TBD |

## Parked opening slides

These pages were removed from the active route on Aug. 30, 2026, but their components and speaker notes remain together in `parkedOpeningPages` and `parkedOpeningNotes` for easy restoration.

| Former page | Working slide claim or content | Reason to retain |
|---:|---|---|
| 11 | The harness should outlive the model | Strong model-independence argument |
| 12 | But no default harness knows your organization | Strong organizational-last-mile argument |
| 13 | Understanding the harness gives you control | Useful synthesis of outcomes, economics, fit, boundaries, and model choice |
| 14 | The design space is still moving | Useful bridge to Hermes, Pi, Prime Agent, and DeepSeek Harness |
| 15 | We are not rebuilding Claude Code | Useful workshop-promise framing |
| 16 | Speaker introduction | Restore later when the final introduction placement is settled |

## Current opening argument

1. Coding work is shifting toward agents.
2. An agent is a model inside a harness.
3. The execution layer evolved from early agent loops and AI IDEs into a model–harness braid.
4. Claude Code and Codex are becoming major default harnesses.
5. DeepSeek confirms that model providers are now shipping the harness layer themselves.
6. Those defaults are useful and should often be used.
7. The active route now moves directly into the workshop claims; the model-independence, organizational-last-mile, control, design-space, and workshop-promise arguments remain parked for later selection.

## Header synchronization pass

Once the final presentation route is selected:

1. Choose the final chapter names and record them in the **Final section header** column above.
2. Apply the same language to divider slides, navigation, presenter notes, and the workshop map.
3. Keep chart descriptors such as populations and dates as evidence labels, not chapter names.
4. Re-check every slide claim against the surrounding sequence; shorten or rewrite claims that duplicate the final header.
5. Run one final page-number and speaker-note synchronization pass after slides are reordered or removed.

## Evidence visual rule

Use a source-first treatment for benchmark and leaderboard evidence. Preserve a recognizable crop of the original webpage, paper figure, or leaderboard—including its visual identity, labels, date/version, and enough surrounding context to make the evidence inspectable. Add restrained deck-native highlighting, a takeaway title, and at most one or two calculated callouts.

Use fully redrawn charts primarily for synthesis: combining multiple sources, exposing a relationship that the source view hides, or making a controlled comparison that cannot be read cleanly from the original. When a redrawn benchmark chart is necessary, pair it with a small source crop or explicit provenance marker so it does not look like an unsupported house graphic.

For the current benchmark sequence, prefer a hybrid composition:

1. Original source or leaderboard crop as the visual anchor.
2. Deck-native highlight around the relevant rows, columns, or model–harness pair.
3. One large conclusion stated in the deck's editorial style.
4. Full methodology and refresh details in speaker notes.

The Terminal-Bench 2.0 page now follows this rule: a large official leaderboard crop filtered to Claude Opus 4.6 and five harnesses, with only the highest and lowest rows outlined and the 18.4-point conclusion stated below. The 2.1 cost comparison and 3.0 frontier should become their own large source-first pages if they remain in the final route.

## Harness technical debt sequence

Immediately after the existing “Harnesses carry technical debt” slide, use Rajiv Shah's OpenHands analysis to quantify the maintenance burden: OpenHands and OpenCode each merged roughly 5,700 PRs in the July 8, 2025–July 8, 2026 window, with 31% and 40% classified as fixes. Preserve the supplied source visual as the initial treatment. The attached 4:5 MP4 is retained as an optional motion version; decide between static and motion during the final presentation pass.

The older Manus-based “Harnesses are evolving with the models” page is removed from the active route; its evidence is too dated for this sequence.

## Dynamic workflows theme

Anthropic's May 2026 dynamic-workflows release belongs near the end of the long-running execution material and should bridge into the multi-agent capstone. It is not primarily a system-prompt or opening-definition topic. The architectural change is that the harness can now generate part of itself at runtime: Claude writes orchestration scripts, decomposes the task, fans work across tens to hundreds of parallel subagents, uses independent reviewers or adversarial checks, persists progress outside the conversation, and iterates against verification before synthesizing one result.

Use a short source-first sequence in the three-hour deck:

1. **The harness can now write the workflow.** Introduce generated orchestration as a step beyond a fixed agent loop.
2. **Scale requires a shape that earns the cost.** Show appropriate work: codebase-wide discovery, migrations, audits, and high-value work with independent subtasks and a strong verifier.
3. **Dynamic does not mean unconstrained.** Make the audience choose decomposition boundaries, workspace ownership, review topology, token budget, checkpoints, approval envelope, and stop conditions.

The Bun rewrite is a vivid vendor-reported example—roughly 750,000 lines of Rust, 99.8% of the existing test suite passing, and eleven days from first commit to merge—but Anthropic explicitly says it was not yet in production. Retain that caveat and avoid treating the example as a controlled benchmark. Also state that dynamic workflows can consume substantially more tokens than a normal Claude Code session.

[Refresh before presenting]
- Recheck product availability, plan requirements, `ultracode` behavior, admin controls, and whether the implementation details remain accurate.
- Prefer a current workflow trace or architecture visual over a marketing-only screenshot if Anthropic publishes one.

[Sources]
- https://claude.com/blog/introducing-dynamic-workflows-in-claude-code
- https://www.anthropic.com/news/claude-opus-4-8
[/Sources]

## System prompts and the context-placement exercise

The four-page system-prompt cluster—shorter-prompts audience question, prompt-growth data, Claude Code harness architecture, and the April 2026 prompt/harness regression—has moved out of the opening harness introduction. It now follows the “What should the agent remember?” and context-and-memory lever transition, immediately before the long-context material.

Use this cluster to open the workshop claim **“More instructions, skills, and memory make agents better.”** The question is not whether prompts should be long or short. Ask which behavior can safely migrate into model training, which instruction belongs in active context, which procedure should load as a skill, and which requirement must be enforced by code, permissions, or an independent verifier. “Trust the model” is an evaluation result, not a default architecture rule.

The old “three layers of memory” page has been replaced by two native pages. The first distinguishes active context, working state, and durable knowledge by purpose and lifetime. The second turns that distinction into a placement decision: project policy, on-demand skill, working-state checkpoint, retrieve again, deterministic enforcement, or delete. This pair is the conceptual bridge from system-prompt evidence into the workshop's context-budget choices.

Between the system-prompt cluster and long-context evidence, use LangChain's Deep Agents v0.7 result as the data-backed payoff: removing the base prompt, trimming tool descriptions by 43%, and making todo middleware optional cut base input tokens about 65% (roughly 6K to 2K) while overall reward held steady. Preserve the model-level uncertainty and exceptions. The teaching point is that harness features are hypotheses to re-evaluate as models change—not that planning or prompts are universally useless.

[Sources]
- https://www.langchain.com/blog/deep-agents-v0-7
[/Sources]

## Deferred motion backlog

No opening chart animation is implemented yet.

- **Page 7, adoption chart:** preferred future build is presenter-controlled rather than autoplay: show the chart frame, reveal the four current-adoption bars, then reveal the January markers and the Codex `5.3×` callout.
- **Page 8, provider harnesses:** optionally reveal Anthropic, OpenAI, and DeepSeek in sequence; show the DeepSeek star milestone last.
- **Parked former page 11, model-independent harness:** if restored, optionally reveal the model row first and the durable harness layer second.

Open Slide supports both stepped reveals controlled by the arrow key and browser-native animation. Use motion only when it controls audience attention or clarifies a state change; keep the static overview readable when someone jumps directly to a page.

## Working refinement backlog

During interactive deck development, prefer fast content and sequencing decisions over extended polishing. Record unresolved work in speaker notes under `[Refine later]`; use `[Refresh before presenting]` for time-sensitive data checks. Batch layout cleanup, source recapture, animation, page-number synchronization, and full-deck visual verification into a later refinement pass.

The open-source ecosystem page closes the opening harness-evidence section. Keep it immediately before the first workshop prompt for running and comparing different harnesses; it should not appear beside the early provider-market slides.

Immediately after it, use the four-harness design-bets page to prevent “open-source alternatives” from sounding like a list of interchangeable products. Hermes foregrounds durable learning and personalization; Pi keeps the default loop minimal; Prime Agent makes context, subagents, and harness refinement programmatic; DeepSeek Harness makes the system plugin-first and the loop swappable. Use official project imagery and treat the labels as architectural emphasis, not exclusive feature claims.

## Workshop 1 — compare the harness, not the model

The audience-facing setup page follows “What harness do you use?” and closes the opening section. Hold the model and its settings, repository state, task and verifier, and runtime environment constant; change only the harness. The working comparison set is OpenHands, Pi, and OpenCode.

Capture task outcome and evidence, tool-call sequence and count, input/output/cache tokens, wall time, and estimated price. The deck now follows the setup with two result reveals from saved local runs: an eight-task short suite where all three harnesses tied on correctness but differed 5.3× in input context and 3.7× in cost, and a longer incident project where OpenCode became the efficiency winner. Both pages keep methodology and verifier caveats in their speaker notes. The remaining research need is replication and trace-level explanation, not a first result.

## Completion control: Factory's GDAL case

Before “Who decides when the agent is done?”, the deck now uses Factory's ProgramBench GDAL campaign to separate capability from completion control. The same model and reasoning level reached 35.8% in a single-agent campaign and 90.3% when an independent validator and orchestrator controlled the standard of completion. Keep the 13× wall-time and 14× credit multipliers visible: this was one campaign per condition and was not compute-matched. The next page isolates the mechanism—validator, implementer, orchestrator, an information wall, and stop authority outside the implementer—rather than reducing the lesson to “more agents win.”

[Sources]
- https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks
[/Sources]

## Live-data refresh registry

Check these figures quarterly while developing the master deck and again during the week before any presentation. Recheck immediately after a major model release, benchmark revision, or methodology warning.

| Page | Statistic to refresh | Preferred comparison | Required metadata |
|---:|---|---|---|
| 7 | Workplace adoption of Claude Code, Codex, Copilot, and Cursor | Latest comparable professional-developer survey wave | Survey dates, sample size, population, prior-period definition, multiple-selection rule |
| 8 | GitHub stars and launch velocity for provider harnesses | Live official repositories for Claude Code, Codex, and DeepSeek Harness | Capture date, launch date, current stars; keep DeepSeek's `100K within days` claim separate from the other totals |
| 10 | General software-engineering benchmark performance | Latest model recommended for Claude Code (currently Fable), latest GPT Sol model in Codex, and latest DeepSeek flagship for DeepSeek Harness | Model/version, release date, benchmark/version/split, score definition, evaluation harness, tools, reasoning effort, context limit, step budget, source, capture date |
| 15 | Two state-management settings on ARC-AGI-3 | Fixed GPT-5.6 Sol: official generic harness versus Responses API harness with retained reasoning and compaction | Public task set, RHAE definition, score, output-token ratio, model, reasoning setting, harness differences, vendor-authored caveat |
| 16 | Harness and cost comparison | Terminal-Bench: selected same-model comparisons from 2.0 and 2.1 plus the 3.0 frontier. OpenHands Index: complementary multi-benchmark alternative-agent comparisons; keep methodologies separate | Benchmark, version, model, agent/version, reasoning effort, score, trial count, total or per-instance cost, runtime, submission/update timestamp |
| 17 | Same-model harness operating profiles | Latest useful result-sealed OpenBench bundle; currently GPT-5.6 across seven harnesses | Release date, model, task-set SHA, results SHA, matched rows, common task/trials, caveats, solve rate and interval, median runtime, fresh tokens/solve, telemetry basis and coverage |

### Additional harness-comparison source: OpenHands Index

- Live view: `https://index.openhands.dev/alternative-agents`
- Raw results: `https://github.com/OpenHands/openhands-index-results/tree/main/alternative_agents`
- Useful dimensions: SWE-Bench, SWE-Bench Multimodal, Commit0, SWT-Bench, and GAIA; score, cost per instance, average runtime, agent/model version, submission time, and optional per-instance outcomes.
- Particularly useful for controlled same-model comparisons across Claude Code, Codex, OpenHands Sub-agents, and other alternative agents.
- Keep its scores separate from Terminal-Bench unless a future analysis explicitly reconciles task sets, scoring, versions, and run configuration.

### Page 10 comparison rule

The goal is a consistent comparison of the current provider stacks, not a collection of each vendor's best-looking number.

1. Prefer a single primary source that evaluates all three models in the same agent harness and on the same benchmark version and split.
2. Keep the model-to-product mapping explicit: **Fable → Claude Code**, **GPT Sol → Codex**, and **DeepSeek flagship → DeepSeek Harness**. Update the exact model names whenever the products change their recommended defaults.
3. Prefer a real-repository benchmark plus a terminal/agentic benchmark. Do not use SWE-bench Verified without its contamination warning, and retain methodology warnings for SWE-bench Pro.
4. If harness, tools, reasoning effort, context, step limits, or scoring differ, show the setups separately and do not place the scores on a common ranking axis.
5. Treat benchmark results as evidence of baseline competence, not proof of production quality or universal product superiority.

## Later harness-building approaches

The AutoHarness / Meta-Harness page was moved out of the opening evidence sequence on Aug. 30, 2026. Its intended home is in the later cluster about emerging ways to design and generate harnesses, immediately before the MCP transition. The older Fireworks social-report page and Prime Intellect “offline sandbox” page were removed because they did not add useful teaching points. Page numbers will continue to drift as the master deck changes.

## Early harness evidence sequence

The Snowflake CoCo example now replaces the HF Smolagents / CORE-Bench comparison in the active early sequence. Frame it specifically as a **data-native harness for SQL and data-engineering work**, not as a general coding-harness leaderboard. The slide uses Snowflake's original data-eng-bench cost-quality chart: across 103 repository-level tasks, CoCo places the same Opus 5, Sonnet 5, and GPT-5.6 Sol models on a better or equal quality frontier at lower cost than Claude Code or Codex. The vendor-authored benchmark caveat belongs visibly on the slide and in the spoken explanation. The HF Smolagents page remains in `parkedEvidencePages` for possible later use.

The evidence sequence is purely an ordering device: **Snowflake CoCo → Terminal-Bench → OpenBench → Harness-Bench → ARC-AGI-3 → NVIDIA AVO**. Snowflake opens with domain specialization; the three benchmark views establish that harness choice changes accuracy, efficiency, and execution quality; ARC-AGI-3 then shows how state retention alone can change task performance; NVIDIA AVO supplies another task-specific harness example. Do not redesign those pages merely to make them look like a formal chapter.

The commercial-company cost comparison from the former slide 19 is parked. The original OpenBench M3 page was mistakenly parked with it during an earlier numbering pass; that has been corrected.

OpenBench is now promoted immediately after the Terminal-Bench evidence. The current live GPT-5.6 result-sealed board replaces the older three-task M3 snapshot because it keeps a matched denominator across seven harnesses and exposes solve rate, runtime, token use, confidence intervals, telemetry coverage, and caveats in one inspectable source view. Treat it as evidence that the harness changes the system's operating profile, not as a universal product ranking; OpenBench explicitly warns that scores are not comparable across bundles.

The former Latent Space Harness-Bench page is replaced by a paper-sourced slide using Table 2 from Yao et al., arXiv:2605.27922v1. It follows OpenBench and makes the broader configuration-level case: 106 tasks, 5,194 trajectories, and a 23.8-point aggregate-score spread across the six configurable harnesses. Codex remains a separately reported model-bound reference. Headline consistency across the benchmark sequence is intentionally deferred to the final narrative pass.

The MCP page formerly appearing as slide 20 is parked at the very end of the deck for archival. Its eventual narrative position is unresolved; keep it out of the active sequence until the MCP transition has a clear purpose.
