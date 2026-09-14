# Workshop 4 preliminary result: route risk, then verify the work

## Slide-ready result

Workshop 4 is the model-routing workshop. Its decision is not simply which
model is best. It asks where to spend stronger-model capacity, when escalation
helps, and what evidence must sit outside the model.

Across three fresh trials, risk-aware static routing passed all 12 task runs
while cutting the median four-task bill from $0.883 to $0.517, a 41.5% savings
versus using the strongest model everywhere.

| Median across 3 fresh trials | Strongest everywhere | Economical everywhere | Risk-aware static | Adaptive cascade |
|---|---:|---:|---:|---:|
| External verifier passes, all 12 runs | **12/12** | 9/12 | **12/12** | 11/12 |
| Median tasks passed per trial | **4/4** | 3/4 | **4/4** | **4/4** |
| Median billed provider cost per trial | $0.883 | **$0.247** | $0.517 | $0.628 |
| Savings versus strongest | baseline | 72.0% | **41.5%** | 28.9% |
| Median wall time per trial | **116.2s** | 251.9s | 205.7s | 210.9s |
| Escalations across all trials | 0 | 0 | 0 | 4 |

The strongest model won on speed because it usually finished in fewer calls.
The cheap-only policy won on cost, but failed the security-review rubric in all
three trials. Risk-aware static routing was the best operating point for this
task set: full verified reliability at substantially lower cost. That result
does not make risk-aware static routing the default answer for every system.

The adaptive cascade was not the winner. It spent more than risk-aware static,
escalated the async task in all three trials, escalated an already simple
pagination fix once, and still missed one security-review requirement. Its
11/12 result is a warning about escalation signals, not evidence that cascades
are inherently worse.

## Task-level result

| Policy and model path | Rename | Pagination bug | Async race | Security review |
|---|---:|---:|---:|---:|
| Strongest, frontier on all tasks | 3/3 | 3/3 | 3/3 | 3/3 |
| Economical, cheap on all tasks | 3/3 | 3/3 | 3/3 | **0/3** |
| Risk-aware static, cheap/cheap/cheap/frontier | 3/3 | 3/3 | 3/3 | 3/3 |
| Adaptive cascade | 3/3 | 3/3 | 3/3 | 2/3 |

Median billed cost by task shows why the static route worked:

| Task | Strongest | Economical | Risk-aware static | Adaptive cascade |
|---|---:|---:|---:|---:|
| Rename | $0.177 | $0.038 | $0.035 | $0.040 |
| Pagination bug | $0.134 | $0.045 | $0.045 | $0.040 |
| Async race | $0.245 | $0.078 | $0.076 | $0.169 |
| Security review | $0.339 | $0.094, failed | $0.359 | $0.354 |

The cheap model solved the hard-labeled async race 3/3 when it received a fair
attempt budget. The task's label did not justify escalation by itself. The
security review did justify stronger pre-routing because its output had to
cover six independent security requirements, and the cheap model omitted the
timing-safe comparison requirement in every trial.

## Recommended workshop reveal

Use three lanes on the main slide:

1. **Strongest everywhere:** 12/12, $0.883 median.
2. **Cheapest everywhere:** 9/12, $0.247 median.
3. **Route by consequence:** 12/12, $0.517 median.

Keep the adaptive lane for the debrief. Reveal that it cost $0.628, triggered
four escalations, and passed 11/12. This creates the question the workshop
should answer: what signal earns an escalation?

Suggested headline:

> Routing is a policy you design, not a model ranking.

Suggested debrief:

> Start economical on bounded, externally verifiable work. Pre-route work with
> asymmetric failure costs. Escalate only on a trustworthy signal, and always
> finish with a verifier the model cannot grade itself against.

The most important reveal comes after the policy comparison. One frontier
security-review run also omitted a required finding. A strong model improves
the odds, but model prestige is not a correctness check.

## Give participants a routing design space

I would not hand participants one routing algorithm and call the problem
solved. Teams have different costs, latency limits, failure modes, and evidence.
The useful exercise is choosing a routing method they can explain and test.

Some teams can route before work begins. They may use task type, affected
systems, data sensitivity, or the cost of a bad answer. That is what the
risk-aware static lane does. It is simple, auditable, and often good enough.

Other teams should route while the agent works. Repeated tool errors, a widening
diff, a stalled plan, or an exhausted budget can trigger a stronger model. These
signals are useful only when they correlate with failure. Our cascade escalated
a simple pagination fix once, which is a nice example of a plausible signal
that was wrong.

Verification gives teams a third option. Let the economical model attempt the
task, run an external check, then escalate only the failed work. This works when
the task has a cheap, trustworthy verifier. Security reviews and open-ended
analysis may need stronger pre-routing because their omissions are harder to
detect after the fact.

Teams with enough history can learn a router from their own runs. They can use
past outcomes by task class, model, cost, and latency instead of relying on a
generic difficulty label. The policy still needs a manual override for work
whose consequences are not captured in the training data.

The methods fit into three moments:

| When the choice happens | Useful signals | Good fit |
|---|---|---|
| Before the task | Risk, task type, data sensitivity, service level | Known high-consequence work |
| During the task | Tool failures, stalled progress, budget, growing scope | Long agent runs with observable state |
| After an attempt | Tests, policy checks, external graders | Work with cheap and trustworthy verification |
| From prior runs | Historical pass rate, cost, latency by task class | Repeated workflows with enough evidence |

For the participant exercise, ask each group to name its starting model, the
signals that can change that choice, the fallback path, and the final verifier.
Two groups can leave with different routers and both be right. What they should
not leave with is “hard task equals biggest model.”

## One-shot delivery decision

Do not run the complete four-policy benchmark live. It took roughly 9 to 14
minutes per trial and provider retries made wall time visibly noisy.

Instead:

1. Run the cheap model live on the pagination bug or async race.
2. Show saved result cards for strongest, economical, and risk-aware static.
3. Ask the room whether the hard label alone should have forced the async task
   to a stronger model.
4. Reveal that cheap passed async 3/3, but failed security review 0/3.
5. End on the external-verifier miss from a frontier run.

That sequence makes routing a system-design exercise. After the reveal, have
participants redesign the policy for their own constraints instead of copying
the winning lane.

## Method and caveats

- Tasks: scoped rename, pagination bug, async race, and security review from the
  P09 toy repository.
- Fixed across conditions: task prompts, calibrated starter files, tools,
  permissions, 24 maximum iterations for fixed policies, external checker, and
  OpenHands SDK 1.45.0.
- Models: Claude Haiku 4.5 as cheap, Claude Sonnet 4.6 as mid, and Claude Opus
  4.8 as frontier. Haiku 4.5 also served as the adaptive policy's LLM judge.
- Strongest used frontier for all tasks. Economical used cheap for all tasks.
  Risk-aware static used frontier only for the high-risk security review.
  Adaptive used the tutorial's rules, turn budgets, and runtime judge.
- Each task ran in a fresh copy where unrelated seeded failures were repaired.
  This corrects a flaw in the earlier P09 pilot, where one task could encounter
  and repair another task's defect.
- The success command was omitted from the prompt. The checker ran outside the
  agent conversation and rejected out-of-scope file edits.
- The security rubric is a deterministic coverage check, not an expert
  assessment of whether every proposed remediation is sound.
- The four tasks were deliberately selected to create a routing discussion.
  This is workshop evidence, not a general benchmark of model quality.
- Three same-day trials support a stable demonstration and causal inspection,
  not population-level accuracy claims.
- Billed provider cost is reported from SDK metrics. Total billed model cost for
  all 48 runs was $6.8509. Wall time includes provider latency and two transient
  disconnects that the SDK retried in trial 2, so cost and verification should
  carry more weight than the latency comparison.
- Adaptive escalation was driven by an LLM judge and a one-call cheap budget on
  the hard async task. It did not rerun an external verifier after each tier.
  A verify-then-escalate policy remains a valuable next experiment.

## Evidence

- Raw trials: `results/raw/generated/workshop4-routing-isolated-v2-20260907/trial-1.json`,
  `trial-2.json`, and `trial-3.json`.
- Retained task workspaces: `results/raw/generated/workshop4-routing-isolated-v2-20260907/trial-{1,2,3}/`.
- Reproducible wrapper and isolation logic: `experiments/model-routing/run_workshop4.py`.
- Tutorial routing implementation: `learn-openhands-harness/projects/p09-model-routing-benchmark/solution/routing_core.py`.
- All three JSON files record the same runner, task, and checker hashes plus the
  exact tutorial commit and model identifiers.
