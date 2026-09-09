# Coding-Agent Trends Relevant to the ODSC Workshop

Research checked September 7, 2026. This note prioritizes official engineering posts, product releases, and primary research.

## Findings

### 1. Coding agents are moving from local chat sessions to managed, asynchronous work

Current products increasingly run agents in isolated cloud environments, support background work, and hand sessions between local and remote execution. Cursor's 2026 releases emphasize cloud subagents, reusable environment snapshots, PR babysitting, and local-to-cloud handoff. Anthropic's managed-agent architecture separates the session log, harness, and sandbox so each can evolve independently.

**Workshop implication:** Long-running agents should be a central section, not a memory footnote. Include resumability, environment identity, checkpoints, background execution, and human steering.

Sources: [Cursor cloud agents and handoff](https://cursor.com/changelog/page/1), [Cursor environment builds](https://cursor.com/changelog), [Anthropic managed agents](https://www.anthropic.com/engineering/managed-agents).

### 2. Execution state is becoming more important than preserving raw interaction history

Compaction remains important, but the stronger pattern is explicit state: plans, completed work, evidence, repository status, budgets, and next actions. GitHub now preserves plans through compaction and writes large tool output to disk. Recent research reports gains from converting raw interaction history into structured execution state instead of forcing the model to reconstruct status on every turn.

**Workshop implication:** Expand the long-running exercise from "summary versus full history" to "transcript versus goal scaffold and execution ledger."

Sources: [GitHub Copilot VS Code February 2026 release](https://github.blog/changelog/2026-03-06-github-copilot-in-visual-studio-code-v1-110-february-release/), [Turning Interaction History into Execution State](https://arxiv.org/abs/2608.00808).

### 3. Skills, plugins, MCP, hooks, and tool discovery are converging into one extension layer

Cursor plugins package skills, subagents, MCP servers, hooks, and rules. GitHub has made skills and MCP context generally available for code review, with attribution and read-only restrictions. The trend is away from placing every instruction and tool in every prompt. Capabilities are packaged, discovered, governed, and loaded when relevant.

**Workshop implication:** Keep `AGENTS.md`, skills, and MCP, but teach them as different loading scopes: always-on repository facts, on-demand procedures, and external capabilities. Do not present MCP as a standalone architecture.

Sources: [Cursor plugins and async subagents](https://cursor.com/changelog/2-5), [Cursor skills and on-demand MCP](https://cursor.com/changelog/2-4), [GitHub skills and MCP for code review](https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/).

### 4. Model routing now includes reasoning effort and execution mode

Routing is no longer only "small model versus large model." Current OpenAI guidance exposes model tiers, several reasoning-effort levels, a quality-first pro mode, persisted reasoning, programmatic tool calling, and beta multi-agent execution. The practical router chooses capability, reasoning budget, role, and escalation policy.

**Workshop implication:** Keep model routing as a marquee exercise, but broaden the matrix to include reasoning effort and verifiability. Compare cost per solved task, not cost per call.

Source: [official OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model).

### 5. Programmatic tool orchestration is reducing unnecessary model turns

For bounded stages such as filtering, ranking, aggregation, and validation, current platforms increasingly let the model write a small program that calls tools and reduces intermediate results. This is distinct from an open-ended agent loop, where each observation may change the next decision.

**Workshop implication:** Add a choice between direct tool calls, MCP/tool discovery, and code-driven orchestration. Teach that predictable processing belongs in code while semantic decisions stay with the model.

Source: [official OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model).

### 6. Multi-agent execution is becoming native, asynchronous, and nested, but remains expensive

OpenAI, Cursor, GitHub, and Anthropic now expose parallel or specialized agents. Anthropic's compiler experiment shows the scale possible with strong tests and extensive compute. Its long-running application work uses planner, generator, and evaluator roles with structured artifacts. These are evidence that multi-agent work is real, not evidence that it should be the default.

**Workshop implication:** Keep multi-agent as the capstone. Compare a single agent, independent parallel branches, and a worker-evaluator pattern. Use measured crossover points and structured handoffs rather than a generic swarm demo.

Sources: [Anthropic's parallel compiler project](https://www.anthropic.com/engineering/building-c-compiler), [Anthropic's long-running application harness](https://www.anthropic.com/engineering/harness-design-long-running-apps), [Cursor async subagents](https://cursor.com/changelog/2-5).

### 7. Reproducible environments are now part of the harness

Cloud-agent products are investing in warm environments, setup manifests, snapshots, isolation, and visible setup logs. Research also shows that RAM, time limits, cluster health, and other infrastructure choices can materially move agent benchmark scores.

**Workshop implication:** Add environment configuration to the long-running and evaluation sections. Record environment identity alongside model, prompt, and tools. For ODSC, prefer a prebuilt cloud environment over attendee installation.

Sources: [Cursor environment builds](https://cursor.com/changelog), [GitHub agent session visibility](https://github.blog/changelog/2026-03-19-more-visibility-into-copilot-coding-agent-sessions/), [Anthropic on infrastructure noise](https://www.anthropic.com/engineering/infrastructure-noise).

### 8. Verification is expanding beyond a passing test suite

Agentic evals increasingly measure full trajectories, required evidence, environment state, and behavior under repeated changes. SlopCodeBench specifically studies structural degradation across iterative development. Recent work on the scaffold effect shows that the harness itself is a hidden experimental variable, while Anthropic argues that agent evals must include the tools, task, environment, loop, and outcome.

**Workshop implication:** Thread evaluation through every choice. Include current-task correctness, required evidence, cost, latency, and the quality of the next change. A test pass is a gate, not the complete score.

Sources: [Anthropic on agent evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), [SlopCodeBench](https://arxiv.org/abs/2603.24755), [The Scaffold Effect in Coding Agents](https://arxiv.org/abs/2607.22585).

### 9. Safer autonomy is shifting from repeated approvals to hard containment

Permission prompts create approval fatigue. Current agent systems increasingly combine filesystem isolation, network controls, scoped credentials, and risk-based approvals so the agent can act freely inside a constrained envelope.

**Workshop implication:** Keep safety inside the tools-and-loop exercise. Ask participants to define the sandbox envelope and escalation boundary, not approve a long list of individual commands.

Sources: [Anthropic containment engineering](https://www.anthropic.com/engineering/how-we-contain-claude), [Claude Code sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing).

## September 7 addendum: YC Harness Night video review

Reviewed: [Self-Improving Harnesses, Local Personal AI And YC's Agent For Work](https://www.youtube.com/watch?v=n9xKblqyQ28), published by Y Combinator on September 7, 2026. The session combines an overview of harness history with presentations on Prime Agent, OpenJarvis, and YC's QM.

### Highest-value additions to the talk

#### 10. The next harness layer is mutable, so improvement needs its own control plane

The clearest new idea is not merely that an agent can remember. Prime Agent exposes supplemental prompts, memories, skills, and reusable subagent specifications as state that the agent can refine across trajectories. The adjacent Harness Continual Learning work identifies the corresponding failure mode: a harness can improve on the current task while forgetting behavior that used to work. Its proposed pattern separates candidate generation from commitment and checks current improvement, historical retention, and validity before accepting an update.

**Talk implication:** Extend the existing inner-loop/outer-loop story by one step: **run → harvest evidence → propose a small harness change → regression-test it → commit or roll back**. Treat the mutable harness as a versioned control plane, not an unreviewed memory blob. This is a stronger and more defensible framing than “the agent rewrites itself.”

**Possible slide claim:** *A self-improving harness needs regression tests for its own behavior.*

Sources: [Prime Agent paper](https://arxiv.org/abs/2608.23552), [Prime Agent refinement implementation](https://github.com/PrimeIntellect-ai/prime-agent/blob/main/packages/coding-agent/src/core/refinement/refinement.ts), [Harness Continual Learning](https://arxiv.org/abs/2608.19013), video at 13:56–17:10 and 26:57–28:00.

#### 11. “Context as a cache hierarchy” is a better visual for material already in the deck

Prime Agent describes agent state as a hierarchy: model weights; active context; a persistent programmable working layer such as a REPL; and durable files, memories, skills, and retained subagent state. The useful move is separating *access speed and mutability* from the vague umbrella term “memory.” The REPL can hold variables and process large results without serializing every intermediate token back into the prompt, while durable state survives context turnover.

**Talk implication:** Do not add another memory taxonomy section. Re-label the current active-context / working-state / durable-knowledge visual as a cache hierarchy and add two questions: “How expensive is this state to retrieve?” and “Who may update or delete it?” The agentic-garbage-collection point is also useful: every tier needs eviction, compaction, or refinement rather than indefinite accumulation.

**Possible slide claim:** *Context engineering is memory-hierarchy engineering.*

Sources: [Prime Agent paper](https://arxiv.org/abs/2608.23552), video at 21:17–25:56.

#### 12. Completion control now has a memorable production pattern: budget the goal, not just the call

The video calls this QM's “grind tool”: agents often stop early even when tools and compute remain available, so a harness can require continued work until a wall-clock or token-spend budget is honestly exhausted. Prime Agent provides a more inspectable version: a durable goal records usage and remains active across turns, while autonomous mode decides whether to continue from quality gates and turn, token, or wall-clock limits.

**Talk implication:** Strengthen Claim 5 rather than create a new section. Put four controls on the completion slide: durable objective, independent quality gate, continuation policy, and bounded budget. Make explicit that a budget is permission to continue, not evidence of success and not a command to burn the entire allowance.

Sources: [Prime Agent long-running documentation](https://github.com/PrimeIntellect-ai/prime-agent/blob/main/packages/coding-agent/docs/long-running-agents.md), video at 57:16–58:18. QM's reported quality improvement is an operator observation in the talk, not a controlled result.

#### 13. Organizational memory is bounded by permission and social scope

QM gives each person and each shared room separately scoped memory, files, keychain view, permissions, schedules, web apps, and a durable sandbox. The speakers' sharpest enterprise lesson is that models do not reliably infer human social boundaries: information appropriate in a private conversation may be inappropriate in a channel or another person's task. More connected memory therefore increases the need for identity-aware retrieval and authorization.

**Talk implication:** Add a social-scope dimension to the context-placement exercise. For every piece of durable knowledge ask: **whose is it, where may it appear, and which identity is acting?** This moves permissioning earlier in the architecture story: the useful size of the “company brain” is limited by the quality of its access-control model.

**Possible slide claim:** *Your agent can only know as much as your permission model can safely express.*

Sources: [QM repository and architecture](https://github.com/yc-software/qm), video at 46:01–47:04 and 58:18–59:54.

#### 14. Separate durable agent identity from disposable compute

QM centralizes conversation and durable state, then treats sandboxes as resources that an agent can acquire rather than as the permanent home of the agent. That makes it possible to choose a different machine size or sandbox provider for a task without losing the agent's identity and history. This complements the existing reproducible-environments section with a useful architectural distinction: **state plane versus execution plane**.

**Talk implication:** Add this distinction to the cloud/background execution material. The router may select not only a model and reasoning effort, but also an execution substrate. Keep policy outside that choice: the agent may choose among pre-authorized environments, not invent a new trust boundary.

Sources: [QM repository and architecture](https://github.com/yc-software/qm), video at 51:04–56:45.

### Strong evidence, but use with caveats

- **Prime Agent's ARC-AGI-3 result is a strong harness-effect visual.** Its paper reports RHAE Best@1 rising from 30% to 95.5%. Use a source-first crop and label the metric, model, task set, budget, and author-reported nature of the comparison. Do not generalize it into “all tasks improve 65 points” or present it as a coding benchmark. The more durable lesson is that the harness is part of the measured system.
- **Prime Agent's long-horizon demonstrations make persistence concrete.** A seven-day Factorio run used 633 agents and 23 million output tokens; week-long nanoGPT research runs used 8×H200 nodes. These are vivid scale examples, but not evidence that a swarm is cost-effective by default. Pair them with the talk's existing coordination-cost warning.
- **OpenJarvis supplies a useful optimization example.** Its five-part spec—intelligence, inference engine, agent logic, tools and memory, and learning—lets a cloud model optimize a local deployment, after which inference stays on device. The paper reports local specs within 3.2 percentage points of the best cloud baseline on average across its suite, with roughly 800× lower marginal API cost and 4× lower latency. Keep the benchmark mix, hardware, marginal-cost definition, and author-reported caveat visible.

Sources: [Prime Agent paper](https://arxiv.org/abs/2608.23552), [OpenJarvis paper](https://arxiv.org/abs/2605.17172), [OpenJarvis repository](https://github.com/open-jarvis/OpenJarvis), video at 30:04–36:42 and 37:30–45:28.

### Material that should not become new sections

- The five-minute history from few-shot prompting through tools, memory, skills, reflection, and subagents largely repeats the deck's existing attention-interface timeline.
- “Make the harness maximally expressive” is provocative but too broad as a standalone prescription. Expressiveness should remain paired with evaluation, cost, containment, and stop authority.
- Local-first personal AI is interesting but peripheral to the current coding-agent workshop. Keep OpenJarvis as a compact routing/optimization example unless the audience or event specifically values edge deployment.
- The video reports that human-reviewed database plans began to be rubber-stamped. Use this as an approval-fatigue anecdote, not as evidence that review should be removed; it strengthens the case for hard containment, risk-tiered gates, and audit logs.

## Coverage verdict

The original workshop topics were fundamentally sound. The 2026 relevance update is primarily a change in emphasis:

- **Keep and strengthen:** long-running agents, model routing, multi-agent architecture, context management, skills, safety, and evaluation.
- **Reframe:** retrieval as context control; MCP as part of the modular tool layer; memory as explicit execution state rather than stored conversation alone.
- **Add across sections:** cloud/background execution, reproducible environments, programmatic tool orchestration, guarded harness evolution, social-scope permissions, and maintainability across repeated changes.
- **Avoid overemphasizing:** product-versus-product comparisons, vector search as the default retrieval story, or multi-agent swarms without measured coordination costs.
