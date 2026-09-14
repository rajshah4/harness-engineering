# Six Harness Engineering Claims to Put on Trial

The workshop should start from claims people make about modern coding agents,
not from a list of harness features. Each section puts one claim on trial.
Participants predict what will happen, inspect a controlled test, and decide
what the evidence supports.

The goal is not to catch vendors being wrong. OpenAI and Anthropic usually
qualify these claims in the original source. The interesting work is finding
which parts of the harness are still load-bearing as models improve.

## The claim-audit format

Use the same five questions every time:

1. What exactly is being claimed?
2. What must remain constant for a fair test?
3. What result would support the claim?
4. What result would weaken it?
5. What narrower rule survives the test?

## Claim 1: Harnesses do not matter. I will just use Codex or Claude Code

Codex and Claude Code are harnesses. Choosing one also chooses a system prompt,
context policy, tools, loop, permissions, memory behavior, and stopping rules.
OpenAI's strongest harness-engineering story goes further: it reports a
million-line internal product with no manually written code and estimates that
it was built in one-tenth the time.

Sources:

- [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/)
- Current deck, slides 10 through 21, 103, 140, and 145

### Test

Run one short task through OpenHands, Pi, and OpenCode with the same model,
prompt, repository revision, environment, budget, and external verifier. Then
compare the prepared long-project results. Add a second comparison that holds
the harness fixed and changes the model.

Measure correctness, model calls, tool calls, fresh and cached input, output,
wall time, and provider cost. Use the trace to explain the difference.

### What would weaken the claim?

If harness choice produces little difference while model choice consistently
dominates, the strong harness claim fails. If the winning harness changes with
the model, the useful conclusion is model-harness fit rather than a universal
harness ranking.

### Likely payoff

Our GLM and Sonnet runs already point toward the more interesting result.
OpenHands worked much more efficiently with Sonnet than with GLM, while other
harnesses showed different tradeoffs. Harnesses shape inference, but their
effect depends on the model they were designed around.

## Claim 2: Connecting more tools and MCP servers creates a super-agent

Anthropic says more tools do not always improve outcomes. Its examples show 58
tool definitions consuming about 55,000 tokens before the task begins, and it
reports seeing 134,000 tokens of tool definitions before optimization. More
tools also introduce overlapping names, parameter errors, authentication
paths, and a larger security boundary.

Sources:

- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Anthropic: Advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use)
- Current deck, slides 18, 91, 101, 107 through 108, and 136

### Test

Ask the same agent and model to inspect a GitHub pull request and cite evidence
under three configurations:

1. Several MCP servers with all tool definitions loaded
2. GitHub MCP alone with tools discovered or loaded on demand
3. A short GitHub skill plus `gh` or a minimal API interface

Preflight authentication so the experiment measures tool design rather than a
credential failure.

Measure definitions exposed, initial input, wrong-tool selections, parameter
errors, model and tool calls, latency, unsafe access attempts, and evidence
quality.

### What would weaken the claim?

If the broad surface performs as well as the smaller alternatives and provider
input remains small, tool pruning did not help this task. If the API path uses
extra model calls to invent orchestration, the typed MCP tools may earn their
context cost.

### Likely payoff

The useful decision is not API versus MCP in general. The harness should expose
the smallest clear set of actions that returns enough evidence without filling
the context with schemas and intermediate data.

## Claim 3: More instructions, skills, and memory make agents better

Every addition sounds useful by itself. A repository map prevents repeated
search, a skill packages a proven procedure, and memory carries lessons into
the next session. The combined package can also contain obvious facts, stale
state, guesses, and procedures that the agent follows when they do not apply.

The evidence cuts both ways. The AGENTS.md study found no significant success
gain from generated files and higher cost, while developer-written files did
better. SkillsBench found large average gains from curated skills, but focused
bundles beat larger ones. Its follow-up failure analysis found both wrong work
and wasted work caused by skills. Anthropic's April 2026 postmortem adds the
system-prompt version: one short instruction caused a 3% evaluation drop and
was reverted.

Sources:

- [Anthropic: Harness design for long-running applications](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/)
- [Your AGENTS.md File Doesn't Do Anything](https://arxiv.org/abs/2602.11988)
- [SkillsBench](https://arxiv.org/abs/2602.12670)
- [Agent Skills Can Be Harmful](https://arxiv.org/abs/2608.11888)
- [Agent instruction-file debt study](https://arxiv.org/abs/2606.15828)
- [Context-strategy comparison across Claude Code and Codex](https://arxiv.org/abs/2607.27250)
- [Generic versus personalized skills](https://arxiv.org/abs/2608.10319)
- [Anthropic: An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)
- Current deck, especially slides 73 through 95 and 159 through 160

### Test

Give a fresh agent a related follow-up task under three conditions:

1. No repository guidance or saved context. Let the agent inspect everything.
2. A large `AGENTS.md`, skill, and `MEMORY.md`, including one stale claim.
3. A curated package with five `AGENTS.md` lines, one short skill, three
   verified memories, and just-in-time retrieval.

Participants decide where each piece of information belongs: `AGENTS.md`, a
skill, `MEMORY.md`, a task checkpoint, retrieval, external enforcement, or
deletion.

Measure first useful action, repeated searches, initial input, total model
calls, unnecessary actions, stale assumptions followed, and verifier outcome.
Repeat with a stronger model if practical because model capability can change
which instructions earn their cost.

### What would weaken the claim?

If the bare agent repeatedly rediscovers stable facts or misses a local
convention, a small amount of saved context earned its cost. If the
save-everything agent follows stale information or performs unnecessary work,
more context made the harness worse. If the curated package does not change
behavior, remove more.

### Likely payoff

The result should identify which information the model can cheaply discover
and which information cannot be inferred from the repository. Stable local
facts, organizational procedures, user preferences, changing external facts,
and unfinished task state have different homes. Every stored instruction must
continue earning its place.

## Claim 4: Use the strongest model for every task

The simple policy is to send every task to the best available model at maximum
reasoning. It avoids routing mistakes and gives every problem the highest
chance of success. The cost is that routine, mechanically verifiable work may
pay for capability it does not use.

The opposite policy, cheap-first routing, also makes a large assumption. It
only works when the harness can detect failure and escalate before a bad result
ships.

Sources:

- Current deck, especially slides 120 and 165 through 168
- P09 model-routing benchmark and the current GLM and Sonnet harness results

### Test

Use several task types: a small edit, a pagination repair, an async bug, and an
authentication review. Compare:

1. Strongest model and high reasoning for every task
2. A fixed economical model for every task
3. A router that begins economically, verifies, and escalates on evidence

Use two cheap verified attempts as an optional reveal policy. Record the exact
provider endpoint and model version; a shared model name is not enough to prove
that two runs used the same inference stack.

Hold the task, environment, and verifier fixed. Record which tasks were routed
upward and why.

Measure verified success, latency, provider cost, total calls, unnecessary
escalations, missed escalations, and cost per verified result.

### What would weaken the claim?

If the strongest model materially improves verified outcomes on every task,
routing has added complexity without saving useful cost. If cheap-first ships a
bad answer because the verifier missed it, the routing policy is unsafe. If the
routed policy preserves quality while spending less, strongest-for-everything
is wasteful.

### Likely payoff

Model routing is an evaluation problem. The harness needs a risk floor, a
verifier, and a concrete escalation signal. High-risk or hard-to-verify work
may deserve the strongest model from the start.

## Claim 5: Give the agent the objective and let it run until it figures it out

Modern models can plan, use tools, recover from errors, and revise their own
work. A detailed workflow can constrain a better strategy the model would have
found on its own. This is the process version of Claim 3: remove the harness
logic and trust the model to manage the work.

Factory found a sharper failure. A single agent wrote 17,000 lines for a GDAL
recreation, reached 36% behavioral parity, and stopped because it believed it
was done. It had not exhausted its time or budget. A system using the same
model and an independent completion measure reached 90%, with far more time
and compute. The result does not show that the larger system is cheap. It shows
that more available compute cannot help an agent that has decided to stop.

Prime Agent separates the two harness concerns directly. A persistent goal
stores the objective, usage, and budget across turns. Autonomous mode decides
whether another continuation is justified by quality gates and turn, token,
or wall-clock limits.

Sources:

- [Anthropic: Harness design for long-running applications](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/)
- [Factory: What it Takes for Coding Agents to Complete Large Software Tasks](https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks)
- [Factory: How Missions Work](https://factory.ai/news/missions-architecture)
- [Prime Agent long-running documentation](https://github.com/PrimeIntellect-ai/prime-agent/blob/main/packages/coding-agent/docs/long-running-agents.md)
- Current deck, especially slides 107 through 111, 119, and 174

### Test

Use the incident-operations task to separate four controls:

1. A durable goal that survives turns and interruptions
2. A changing plan stored in the task checkpoint
3. An independent validation contract defined before implementation
4. An autonomy policy that uses gates, evidence, budgets, and terminal states

Participants choose the goal and commit to validation checks before seeing the
implementation. Then reveal the Sonnet OpenHands run that stopped with one
frontend defect. Compare more budget without new evidence against returning
the failed external gate and requiring a changed plan.

Measure additional calls, progress per call, workspace changes, repeated gate
runs, final verifier result, and why the run continued or stopped.

### What would weaken the claim?

If self-evaluation reaches the same external result, independent validation
did not earn its cost on that task. If more budget repairs the defect without
new evidence, the agent stopped prematurely but could recover through a simple
continuation. If the gate changes the plan and completion result, the harness
needed a standard the implementer did not control.

### Likely payoff

The goal preserves intent. The plan may change. The validation contract keeps
the definition of done from collapsing around the implementation. The autonomy
policy decides whether another turn has earned its cost.

## Claim 6: What you want is a multi-agent system

Anthropic reports that its multi-agent research system outperformed a
single-agent configuration by 90.2 percent on an internal evaluation. It also
reports that token usage explained 80 percent of performance variance and that
multi-agent systems used about 15 times as many tokens as ordinary chat.
Anthropic explicitly warns that coding tasks often have fewer independent
branches than research tasks.

Its C compiler experiment shows why. Sixteen agents initially encountered the
same failure and chased the same bug. Parallel work became useful only after a
GCC oracle isolated independent failing file sets. The difficult task did not
become parallel until the harness changed its structure and feedback.

Sources:

- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Anthropic: Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)
- [Factory: How Missions Work](https://factory.ai/news/missions-architecture)
- [OpenAI: Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/)
- Current deck, especially slides 131 through 139

### Test

Use two coding problems:

1. A tightly coupled repair where every step depends on shared repository state
2. A broad task with independent implementation, security review, and browser
   verification branches

Pairs allocate three agent cards and one shared compute budget. Compare one
generalist, a worker with an independent validator, and parallel specialists.
Run one comparison with harness defaults and another with matched total token
or model-call budgets. Require isolated workspaces, bounded child returns, and
one synthesis owner.

Measure task quality, wall time, all parent and child tokens, duplicated setup,
overlapping edits, merge or synthesis loss, and cost per verified result.

### What would weaken the claim?

If the advantage disappears under a matched budget, the gain came from more
compute rather than coordination. If one agent uses the same budget more
effectively, delegation added coordination cost without useful search breadth.

### Likely payoff

Another agent earns its cost when the work splits cleanly or needs independent
judgment that code cannot enforce more cheaply. Difficulty alone does not
create parallelism.

## Claims to show but not pretend we tested

OpenAI's zero-manually-written-code experiment and one-tenth-time estimate are
excellent opening provocations. A workshop cannot reproduce the
counterfactual engineering time, organizational investment, internal product
quality, or multi-month maintenance burden. Present those claims with the
article's own caveat that the result depends heavily on repository structure
and tooling.

## Workshop order

| Order | Audience claim | Main ideas exposed by the test |
|---:|---|---|
| 1 | Harnesses do not matter | Harness defaults, observability, model-harness fit |
| 2 | More tools create a super-agent | MCP, APIs, tool selection, context, safety |
| 3 | More instructions, skills, and memory make agents better | Context budgets, `AGENTS.md`, skills, memory, stale context |
| 4 | Use the strongest model for every task | Model and reasoning routing, verification, escalation |
| 5 | Let the agent run until it figures it out | Long context, goals, loops, checkpoints, budgets, safety |
| 6 | What you want is a multi-agent system | Delegation, critics, parallel work, coordination cost |

Each result slide should end with one of three labels: **supported in this
test**, **supported with a narrower condition**, or **not supported in this
test**. Avoid “proved” and “debunked” when the evidence is one task or one run.
