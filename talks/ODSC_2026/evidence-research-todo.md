# ODSC Harness Engineering Evidence Research To-Do

Research snapshot: September 3, 2026

The deck should give each workshop claim a fair opening before it reverses the
claim. The priority is not to accumulate examples. It is to add evidence that
holds the task, model, harness, budget, or evaluation method constant long
enough to explain what changed.

## Evidence balance

| Workshop claim | Evidence that makes the claim plausible | Evidence that reverses it | Main gap |
|---|---|---|---|
| 1. Harnesses do not matter | Medium | Strong | Show that stronger models are less harness-sensitive before showing the harness spread |
| 2. More tools create a super-agent | Medium | Medium | Controlled broad-tools versus discovered-tools versus narrow-interface result |
| 3. More instructions, skills, and memory make agents better | Strong for skills; weak for memory | Strong | Separate skills, standing instructions, task state, and durable memory; run the local context-policy test |
| 4. Use the strongest model for every task | Medium | Strong in recent research, weak in the current deck | Add current coding-specific routing results and run the workshop policy comparison |
| 5. Let the agent run until it figures it out | Strong | Strong | Move from one memorable Factory case to its 24-task result; isolate continuation from independent validation |
| 6. What you want is a multi-agent system | Strong | Medium in the current deck | Add normalized and matched-budget evidence; run a coding comparison with all child compute counted |

## P0: research and experiments that materially change the argument

### Claim 1: Harnesses do not matter

- [ ] **Add FrontierHarness as a current matched-model comparison.** Runta's
  FrontierHarness v1.0 holds the model, task set, runtime, and gateway fixed
  while comparing 9 harnesses in 12 configurations across 30 tasks (360
  one-attempt cells). Pass rates cluster from 50.0% to 66.7%, while median cost
  per completed task ranges from $1.05 to $18.34. Claude Code and DSH Creator
  both pass 63.3%, but Claude Code costs 5.6x more per pass in this setup.
  - Narrative job: make the harness effect legible as an efficiency and
    trajectory story, not only an accuracy story.
  - Best visual: the article's pass-rate-versus-cost chart, large on the slide.
    A possible follow-up is the single `python-statemachine` task, where seven
    configurations pass but Pi and Claude Code differ by 26x in price and by
    90 versus 381 turns.
  - Placement: Workshop 1 reversal, alongside OpenBench and Harness-Bench; it
    may replace a weaker benchmark slide in the live cut rather than lengthen
    the sequence.
  - Caveats to keep visible: vendor-authored v1.0 benchmark; one model (Kimi
    K3); one attempt per cell; 30 software/terminal tasks; gateway and caching
    behavior mean the results describe harness-model configurations, not each
    harness in isolation.
  - Refresh before presenting: check v1.1 and whether the planned harness ×
    model matrix has been released.
  - Source: https://runta.com/blog/introducing-frontierharness-eval/

- [x] **Add the strongest fair setup for the model-first argument.** Use
  Harness-Bench Figure 3 before the claim slide. The paper finds that stronger
  model backends have higher mean scores and lower cross-harness variance. This
  is the best evidence that a competent practitioner could use to argue that
  the model increasingly absorbs harness differences.
  - Deliverable: one large source figure with a spoken takeaway, not another
    benchmark table.
  - Source: https://arxiv.org/html/2605.27922v1

- [ ] **Keep the reversal compact.** The Snowflake, Terminal-Bench, OpenBench,
  Harness-Bench, ARC-AGI-3, and NVIDIA sequence already establishes that the
  harness can change accuracy, cost, latency, state retention, and long-running
  behavior. Do not add another example unless it isolates a mechanism better
  than the existing set.
  - Deliverable: choose the three or four live examples; leave the rest in the
    three-hour branch.

- [ ] **Upgrade the local harness comparison from one run to repeated evidence.**
  Repeat the most informative short-suite tasks at least three times for Pi,
  OpenCode, and OpenHands with the same model and verifier.
  - Record: pass rate, first-pass success, model calls, context per call, cache
    reads, wall time, provider cost, and confidence/range.
  - Deliverable: one task-level trace slide plus one aggregate result slide.

### Claim 2: More tools create a super-agent

- [x] **Add a fair positive case for a large tool library.** Anthropic reports
  that on-demand Tool Search preserved access to a large library while cutting
  context use by 85%; MCP-eval accuracy rose from 49% to 74% for Opus 4 and
  from 79.5% to 88.1% for Opus 4.5.
  - Narrative job: the useful capability is not loading every tool; it is
    making many tools discoverable without paying for all of them on every
    turn.
  - Deliverable: use the original Tool Search visual and numbers before the
    claim slide.
  - Source: https://www.anthropic.com/engineering/advanced-tool-use

- [x] **Use the same source to reverse the naive version of the claim.** The
  article shows 58 tool definitions consuming about 55K tokens and reports a
  134K-token tool-definition case before optimization, with wrong selection
  and wrong parameters as common failures.
  - Deliverable: one source screenshot after the claim, paired with the
    on-demand result rather than separated into unrelated slides.

- [x] **Add a controlled tool-visibility result.** ToolChoiceConfusion holds
  the tasks, model set, tool outputs, agent protocol, and prompts constant
  while changing the visible tool policy. All-tools reached 83% success with
  24,569 tokens per task; keyword top-five fell to 61%; causal next-step
  visibility reached 99% with 2,405 tokens.
  - Deliverable: drafted as NEW MATERIAL immediately after Anthropic Tool
    Search. Keep the synthetic-task and manually specified contract caveats.
  - Source: https://arxiv.org/abs/2606.06284

- [ ] **Run the missing controlled workshop experiment.** Compare the same
  GitHub evidence task under three configurations:
  1. broad MCP surface with all definitions loaded;
  2. deferred/on-demand GitHub tools;
  3. a short skill plus authenticated `gh` or minimal API calls.
  - Preflight authentication before timing.
  - Run at least three trials per condition.
  - Measure: declared-schema tokens, tools actually loaded, wrong-tool and
    parameter errors, evidence quality, citations, unsafe access attempts,
    model/tool calls, wall time, and cost.
  - Deliverable: this becomes the result slide; until then, label the existing
    result as a trace study rather than a controlled comparison.

### Claim 3: More instructions, skills, and memory make agents better

- [x] **Update the positive skills evidence to the current SkillsBench result.**
  Across 87 tasks and 18 model-harness configurations, curated skills raise
  average pass rate from 33.9% to 50.5%. Focused bundles of at most three
  modules outperform larger bundles.
  - Deliverable: one large paired-results figure before the claim.
  - Source: https://arxiv.org/html/2602.12670

- [x] **Add the August failure analysis after the claim.** The new contrastive
  study identifies 307 confirmed skill-induced failures: 125 functional
  failures and 182 efficiency regressions. Excessive procedure accounts for
  62.6% of the efficiency regressions.
  - Deliverable: one visual built from the paper's original taxonomy/results,
    with a concrete trace example if space permits.
  - Source: https://arxiv.org/html/2608.11888

- [ ] **Keep the AGENTS.md result as a distinct mechanism.** Generated or
  developer context files generally increased inference cost by more than 20%
  and tended to lower task success in the evaluated settings, even though
  agents followed the instructions and explored more broadly.
  - Do not present this as a skills result or a durable-memory result.
  - Source: https://arxiv.org/abs/2602.11988

- [x] **Run the context-policy comparison.** The three-trial AWS result used the same follow-up
  repository task under:
  1. no saved guidance;
  2. a large AGENTS.md, skill, and memory package containing one stale claim;
  3. a curated policy with minimal standing guidance, one scoped skill,
     verified task state, and just-in-time retrieval.
  - Result: no guidance passed 3/3, save everything failed 0/3, and curated
    context passed 3/3. The overfilled lane followed the same stale module and
    export guidance in every run despite green self-authored tests.
  - Saved evidence: `harness-benchmark/results/workshop3-context-placement-preliminary.md`.
  - Deliverable: the three-lane trace and result slide are ready.

- [ ] **Do not claim that persistent memory is proven by the skills evidence.**
  The deck still lacks a clean performance study for durable coding-agent
  memory. Either run a paired repeat-task experiment or frame memory as an open
  design question. Security-oriented memory benchmarks can support the stale
  or poisoned-memory risk, but not the productivity claim.

### Claim 4: Use the strongest model for every task

- [ ] **Add a fixed-harness model comparison before the claim.** Use the
  OpenHands Index to show that, under one agent SDK, frontier models lead many
  aggregate tasks while cost and latency vary substantially.
  - Deliverable: a recognizable current leaderboard or cost-quality visual,
    refreshed immediately before presenting.
  - Sources:
    - https://index.openhands.dev/
    - https://www.openhands.dev/blog/openhands-index

- [x] **Add CodeRescue as the cleanest reversal.** Across held-out failures from
  five coding benchmarks, cheap recovery and escalation solve different
  failures. In its GPT-5.4-nano/GPT-5.4 setting, one calibrated policy exceeds
  always-escalate solve rate at 35% of its mean recovery cost.
  - Deliverable: one frontier plot from the paper after the claim.
  - Source: https://arxiv.org/abs/2607.19338

- [ ] **Use SuperScout as a second routing mechanism only if needed.** On 266
  SWE-bench Pro Python tasks, it matches the best single model's solve count
  (159 versus 158) at about one-fifth the cost per solve. The paper's own
  ablation says the verified repository handoff, not the router alone, carries
  much of the gain.
  - Deliverable: a routing-plus-handoff mechanism slide, not a generic claim
    that routers always work.
  - Source: https://arxiv.org/abs/2608.04804

- [x] **Run the workshop routing policies.** Compare strongest-for-all,
  economical-for-all, and verify-then-escalate on a small edit, mechanical bug,
  multi-step failure, and risky review.
  - Measure: verified success, missed and wasted escalation, wall time, total
    provider cost, and cost per verified result.
  - Deliverable: a task-by-policy matrix is drafted as NEW MATERIAL. The
    current result is a ten-task, one-run pilot and still needs provenance plus
    repeated trials before it becomes presentation evidence.

### Claim 5: Let the agent run until it figures it out

- [x] **Replace the single Factory anecdote with the 24-task result before
  returning to GDAL.** Factory reports the same experimental structure across
  24 difficult ProgramBench tasks and three models. Median system gains were
  56.7→89.3 for Fable, 45.1→75.4 for Kimi, and 48.6→66.2 for GPT-5.6 Sol, with
  much more time and compute.
  - Deliverable: use Factory's original aggregate graphic, then GDAL as the
    mechanism case.
  - Source:
    https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks

- [x] **Make the counterfactual explicit.** Factory changes completion
  authority and also spends far more compute. The clean workshop question is
  not “does more time help?” It is whether blind continuation, an external
  failed gate, or independent validation changes the next useful action.
  - Deliverable: a NEW MATERIAL slide uses Evidence-Carrying Termination to
    isolate completion authority with the planner, tools, checkpoints, and
    nominal budgets matched. Treat it as a very recent synthetic preprint.
  - Source: https://arxiv.org/abs/2608.23623

- [ ] **Run a three-condition completion test.** From the same incomplete
  checkpoint, compare:
  1. more turns with no new evidence;
  2. the failed external verifier returned with a replan requirement;
  3. an independent validator with a fixed completion contract.
  - Measure: progress per call, repeated work, changed hypothesis, gate result,
    tokens, wall time, and terminal reason.
  - Deliverable: one continuation decision slide plus the measured result.

### Claim 6: What you want is a multi-agent system

- [x] **Keep Anthropic's strongest positive result and its bill together.** The
  research system outperformed single-agent Opus by 90.2% on an internal
  breadth-first research evaluation; Anthropic also reports that the system
  used roughly 15 times the tokens of chat and warns that most coding tasks are
  less parallelizable.
  - Deliverable: one source visual before the claim with both numbers visible.
  - Source:
    https://www.anthropic.com/engineering/multi-agent-research-system

- [x] **Add normalized counterevidence after the claim.** BenchAgent compares
  single-agent and six multi-agent workflows under shared tools, answer
  contracts, usage accounting, and logging. At most one multi-agent workflow
  exceeded the matched single-agent anchor, and that +1.44-point result was
  within one-run uncertainty; the other five trailed by 2.56–11.29 points and
  were more expensive.
  - Deliverable: use the paper's main normalized comparison figure.
  - Source: https://arxiv.org/abs/2606.05670

- [x] **Add a matched-budget boundary.** At the 500-token condition in an
  equal-thinking-token study, the single agent was best or statistically tied
  in six of eight model-and-dataset cells. Gemini 2.5 Pro on FRAMES is the
  important exception.
  - Deliverable: drafted as NEW MATERIAL after BenchAgent. Keep the caveat
    that requested budgets were matched while realized Gemini reasoning tokens
    were not always equal.
  - Source: https://arxiv.org/abs/2604.02460

- [ ] **Use the C compiler as the mechanism story, not proof of general uplift.**
  Sixteen agents initially chased the same bug and overwrote each other. A GCC
  oracle split the shared failure into separable file sets. The useful lesson
  is that the harness created parallel work; adding agents did not.
  - Source: https://www.anthropic.com/engineering/building-c-compiler

- [ ] **Run the matched-compute coding comparison.** Compare one generalist,
  worker-plus-validator, and parallel specialists on one coupled repair and one
  separable task.
  - Hold total model-call or token budget constant in one run, then allow the
    multi-agent system its natural larger budget in a second run.
  - Count parent and child tokens, duplicated setup, conflicting edits, merge
    loss, wall time, and verified result.
  - Deliverable: one matched-budget result and one unconstrained operating-cost
    result.

## P1: strengthen interpretation and presentation

- [ ] **Reserve a short self-evolving-harness sequence around HarnessDev.**
  ByteDance Seed's HarnessDev changes the unit of evaluation from the task an
  agent completes to the runnable harness it creates. In Creation, six creator
  LLMs expand a weak seed into an execution system using a small development
  set. In Evolution, the model revises that harness from downstream feedback.
  Frozen harnesses are then evaluated on held-out capability and execution-token
  cost across four domains, five benchmarks, and 2,207 unique instances.
  - Best opening slide: the paper's Creation → frozen harness → executor →
    held-out evaluation diagram. The conceptual turn is more important than a
    leaderboard: the artifact being judged is the harness.
  - Best result slide: the domain split. Generated harnesses remain behind
    mature human-engineered references for code and search/research, but match
    or beat the selected references for writing and machine-learning
    experimentation.
  - Reversal: evolution helps in some settings, but the gains are unstable,
    only partly transfer to held-out tasks, and depend strongly on the model
    that later executes the harness.
  - Placement: the later "new ways to build harnesses" or meta-harness section,
    near Self-Harness and other harness-evolution work—not the introductory
    definition or Workshop 1 benchmark run.
  - Caveats: very recent preprint; distinguish creator model from executor
    model; retain the held-out evaluation boundary; do not summarize this as
    "agents can now replace human harness engineers."
  - Refresh before presenting: check for a revised paper, released code/data,
    and any replication or expanded creator × executor matrix.
  - Paper: https://arxiv.org/abs/2609.01437
  - Project: https://self-developing-agents.github.io/

- [ ] **Add an evidence label to every workshop result:** controlled local
  experiment, repeated benchmark, vendor-authored case, independent paper, or
  provisional trace.

- [ ] **For each benchmark slide, state what is held constant.** Put task,
  model, harness, budget, environment, and verifier in the notes; show only the
  two or three controls the audience needs on the slide.

- [ ] **Prefer original source visuals for benchmark claims.** Crop the official
  figure or table large enough to recognize, then add one spoken takeaway.
  Avoid rebuilding authoritative data as a generic house chart unless the
  source visual is genuinely unreadable.

- [ ] **Add a repeated-trial rule to the deck notes.** One run can illustrate a
  mechanism. A comparative result should usually have at least three trials,
  a range or confidence interval, and preserved traces.

- [ ] **Separate model, harness, and model-harness interaction.** Do not turn a
  winning configuration into a statement about the model alone or the harness
  alone.

## P2: refresh and monitoring

- [ ] Refresh OpenBench, Terminal-Bench, OpenHands Index, model prices, and
  GitHub adoption numbers on one shared date before every public delivery.

- [ ] Watch AgentRoom and other August 2026 multi-agent coding papers for
  stronger matched-compute replications. Do not promote a single LLM-judge
  contrast to a live slide yet.

- [ ] Track durable-memory benchmarks separately from skills and context-file
  studies. Add a memory result only when it measures later behavior, stale
  recall, deletion, and verifier-facing consequences.

- [ ] Preserve benchmark version, task-set hash or revision, model endpoint,
  reasoning effort, harness version, runtime image, trial count, pricing date,
  and telemetry coverage in speaker notes.

## Recommended next execution order

1. Run the Claim 2 tool-surface experiment.
2. Run the Claim 3 context-policy experiment.
3. Add the current Claim 4 routing papers, then run the local routing matrix.
4. Run Claim 6 under matched and unconstrained compute.
5. Repeat the most informative Claim 1 harness tasks.
6. Run the Claim 5 continuation-versus-external-gate test.
7. Harvest and place the source visuals after the experiments lock the story.
