# Engineering the Harness: Two-Hour ODSC Workshop Outline

Exercise-focused companion: [workshop-exercise-outline.md](workshop-exercise-outline.md)

Current five-exercise lecture map: [workshop-slide-map.md](workshop-slide-map.md)

The slide map is the current timing and combination decision. The detailed
outline below remains a source of examples and teaching points, but its older
seven-decision timing is no longer the proposed live route.

## Workshop promise

Participants will learn how the system around a model determines whether a coding agent is reliable, efficient, safe, and able to finish long-running work. The workshop starts inside a successful coding-agent run so participants can see the history, trace, and action-observation loop before they begin changing the harness. It then adds or removes capabilities only when a concrete need justifies them.

The hands-on work is decision-making rather than substantial coding. Participants confer with a neighbor, choose among plausible harness designs, predict the consequences, and inspect the resulting trace or measured result. Agent Canvas makes the loop, context, tools, and state visible. Prepared scripts and saved traces keep the experience useful even when an attendee cannot run an agent locally.

Participants leave with an annotated harness design and a record of the tradeoffs they chose across retrieval, context, memory, tools, long-running state, model routing, safety, evaluation, and multi-agent architecture.

This workshop is the decision path through the companion tutorial, not a
second curriculum. In the room, participants predict, inspect, and choose. In
the tutorial, they implement the same decisions, run controlled comparisons,
and keep the resulting harness artifacts. Each workshop decision therefore
ends with one primary tutorial project for participants who want to build the
mechanism themselves:

| Workshop decision | Continue in the tutorial |
|---|---|
| Read and compare harness behavior | P01: Canvas + Agent Trace |
| Design the tool and retrieval surface | P03: Retrieval, with P06 and P10 as deeper extensions |
| Place context, working state, and memory | P05: Memory + Compaction |
| Route models and reasoning | P09: Model Routing Benchmark |
| Control completion and long-running work | P12: Goal Scaffolding |
| Decide whether work earns another agent | P11: Subagents and Context Isolation |

The other tutorial projects are supporting architecture, not missing workshop
sections. P04 covers decomposition, P06 safety, P07 verification, P08 dynamic
workflows, and P10 history indexing.

## Shared scenario and exercise pattern

The workshop follows one evolving coding task. An agent must investigate a bug in an unfamiliar repository, implement a repair, pass the tests, and produce evidence that the fix is correct. The repository is too large to place entirely in context. The work later spans multiple sessions, models, and potential subagents.

Each exercise uses the same rhythm:

1. Show a working baseline, then introduce a failure or changed constraint.
2. Present two or three credible harness responses.
3. Give neighbors 60 to 90 seconds to choose and prepare one reason.
4. Poll the room and hear one or two rationales.
5. Run the selected configuration in Agent Canvas or inspect a prepared trace.
6. Compare the alternatives using quality, cost, wall time, complexity, and risk.
7. Record what the decision added to the harness and what new failure it introduced.

The instructor-operated environment is the shared path. Individual execution is optional. The workshop should not depend on installation, personal API keys, or every live model call finishing on time.

## Detailed run of show

### 0:00-0:13 | See a working harness from the inside

Open in Agent Canvas with a completed, successful repository task. Walk backward from the final answer through the test result, edit, file reads, searches, observations, planning, and original request. Point out the persistent conversation history and the repeated action-observation loop. The audience should first understand what a coding harness does before being asked to improve one.

Use the trace to separate three layers: what the user asked, what the model decided, and what the harness supplied or enforced. The harness owns the environment, tool surface, event history, context assembly, permissions, stopping rules, and verification path. The model proposes the next action inside that system.

**Hands-on:** In pairs, participants label six to eight trace events as model work, harness work, or shared responsibility. Then they identify the minimum evidence that makes the final answer trustworthy. Reveal the full harness map only after the classification.

**Optional ACP reveal:** Run the same task from another Agent Canvas profile, such as Pi through ACP, while holding the model, task, repository, and verifier constant. Ask what changed even though the model did not. Agent Canvas is the common inspection surface, while ACP lets a different coding harness occupy the agent slot. Keep this to a short reveal rather than a product competition.

**Teaching point:** A coding agent is observable history wrapped around a repeated model-tool loop. The model matters, but the harness determines what the model can see, do, remember, verify, and resume. A bare loop remains a useful conceptual baseline after participants have seen the working system.

**Continue in the tutorial:** P01, Canvas + Agent Trace.

### 0:13-0:26 | Decision 1: Retrieval and codebase understanding

The repository is too large to load into context, and the issue description uses different vocabulary from the implementation.

**Choices:** (A) lexical search with `grep` and whole-file reads, (B) an indexed, semantic, or code-graph search layer, or (C) iterative agentic search that reformulates queries and follows evidence.

**Hands-on:** Participants predict the winner for an exact-symbol query and a conceptual query. Inspect the traces and compare evidence found, tool calls, latency, and context added. A GitNexus-style code graph can appear as an example of when relationships across a large repository justify more structure than plain text search.

**Teaching point:** Retrieval is a context-control decision. Start with lexical search. Add an index, semantics, or graph structure for measured gaps. Add an agentic loop when completeness justifies extra turns.

**Continue in the tutorial:** P03, Retrieval. Use P10 for the case where the
corpus becomes unbounded and must be indexed.

### 0:26-0:40 | Decision 2: Context, compaction, memory, and skills

The agent finds the relevant files but later loses a testing constraint. It also rediscovers the same repository conventions in multiple sessions.

**Choices:** (A) keep the full conversation and tool output in context, (B) compact the conversation, or (C) externalize working state and load durable knowledge only when relevant.

**Hands-on:** Give participants candidate items from the trace. They classify each as active context, external working state, repository instruction, on-demand skill, or discardable output. Then reveal a compacted trace, a small plan file, a minimal `AGENTS.md`, and a targeted skill. Discuss why large tool results should be stored outside the prompt and referenced when needed.

**Teaching point:** Context, working state, and durable knowledge are separate layers. Skills and plugins are becoming the packaging layer for reusable procedures, while selective loading keeps the active context focused.

**Continue in the tutorial:** P05, Memory + Compaction.

### 0:40-0:55 | Decision 3: Long-running agents and execution state

After 40 minutes, the session is interrupted. Several experiments failed, one change remains unverified, and a new session or background worker must resume safely in a reproducible environment.

**Choices:** (A) keep one conversation alive, (B) resume from a compacted transcript, or (C) resume from explicit execution state: objective, success criteria, plan, completed work, evidence, failed approaches, repository state, environment identity, remaining budget, and next safe action.

**Hands-on:** Participants decide what must persist and what must be reverified after resumption. Then reveal that the dependency environment has changed and 70 percent of the budget is gone. Participants decide whether the harness should restore a known-good environment, continue, revert, revise the plan, escalate, or stop. Compare the first actions taken by a transcript-only continuation and a goal-scaffolded fresh session.

**Teaching point:** A long-running agent is more than a long conversation. It needs durable execution state, checkpoints, a reproducible environment, explicit budgets, and a goal loop whose definition of done is backed by evidence.

**Continue in the tutorial:** P12, Goal Scaffolding, with P07 for independent
verification.

### 0:55-1:09 | Decision 4: Tools, MCP, verification, and safe autonomy

The agent repeatedly edits the same function without diagnosing the failure. It has accumulated many tools, wants to call an external MCP server, and requests network and database access.

**Choices:** (A) expose every tool and increase the iteration limit, (B) use a small task-specific tool surface with direct model decisions, or (C) use bounded programmatic orchestration for predictable tool-heavy work while reserving model judgment for interpretation and approval.

**Hands-on:** Participants choose which tools should be loaded, discovered on demand, or excluded. They add a hypothesis, action, verifier, checkpoint, and stop condition to the loop. They also assign filesystem, network, and destructive actions to auto-allow, sandbox, or human-approval zones. Show how hooks, tests, browser checks, or a critic can enforce the result rather than trusting the agent's narration.

**Teaching point:** The modern tool layer includes shell, browser, MCP, skills, hooks, and code-driven tool orchestration. Reliability comes from a small relevant tool surface, structured outputs, cheap verification, and hard sandbox boundaries.

**Continue in the tutorial:** P03, Retrieval, then P06 for tool permissions and
sandbox boundaries.

### 1:09-1:17 | Break and catch-up

Display the evolving harness and links to the completed traces. Participants who encounter setup trouble switch to the shared path rather than debugging through the break.

### 1:17-1:33 | Decision 5: Model routing and test-time compute

The strongest configuration passed all 12 task runs, but it was expensive. The
cheap configuration also solved the hard async repair 3/3. It failed the
security review 3/3 because it omitted one required issue. Some tasks are easy
to verify after an attempt. Others carry more risk or have omissions that are
hard to detect.

**Choices:** Participants can route before the task using type, risk, or service
level; during the task using tool failures, stalled progress, scope, or budget;
after an attempt using an external verifier; or from historical results for a
repeated task class. They can also give a person the final choice for unusual
or high-consequence work.

**Hands-on:** Participants complete a routing matrix for a symbol rename, an
async bug, and a security review. For each task they choose the initial model
tier, reasoning level, verifier, risk floor, escalation signal, and fallback.
Groups compare task success, latency, total cost, and cost per solved task. Two
groups may choose different routers because they have different constraints.

**Teaching point:** A router is a policy the team has to design and test. It can
choose model family, reasoning effort, role, or escalation path. Cheap-first
works when the harness can detect failure. High-risk or low-verifiability work
may deserve stronger capability from the start. A generic difficulty label is
not enough.

**Continue in the tutorial:** P02 for the first routing policy, then P09 for the
measured benchmark and evidence-based escalation.

### 1:33-1:50 | Decision 6: Multi-agent and background architecture

The task now mixes repository exploration, implementation, security analysis, UI verification, and test output. Some branches can run independently in isolated cloud workspaces; others depend on shared state.

**Choices:** (A) retain one generalist, (B) launch parallel specialists, or (C) use a primary worker with a focused evaluator or critic.

**Hands-on:** Participants identify independent branches, shared evidence, workspace ownership, and the required handoff contract. Compare a single-context run, a parallel subagent run, and a worker-evaluator pattern. Show duplicated setup, child cost, wall time, synthesis loss, merge conflicts, and final quality. Use the course's measured P11 results as the controlled comparison; a software-factory or Neuron Golf example can illustrate the larger pattern after the tradeoff is clear.

**Teaching point:** Native and asynchronous subagents are becoming common, but orchestration is not an intelligence upgrade. A new agent must earn its context, environment, and coordination cost. Structured handoffs and verification are part of the architecture.

**Continue in the tutorial:** P11, Subagents and Context Isolation. Use P04,
P07, and P08 for decomposition, critics, and dynamic workflows.

### 1:50-2:00 | Final incident and synthesis

Introduce a combined incident: the agent is interrupted during a repository migration, the primary model is unavailable, a cloud environment is stale, two workstreams remain, and one earlier change lacks verification.

**Hands-on:** Participants revise their harness and choose the next safe action. Ask several participants to explain their most important decision, one component they intentionally excluded, and the evidence they would use to evaluate the design.

Close with six principles:

1. Start from a visible working baseline and add only measured improvements.
2. Treat retrieval as control over what enters context.
3. Externalize execution state for long-running work.
4. Make verification, environments, and safety boundaries part of the harness.
5. Route models and reasoning using risk and evidence.
6. Add agents only when isolation or parallelism beats coordination cost.

## Evaluation and delivery requirements

Evaluation runs through every exercise rather than appearing as a final topic. Result cards should report task success, required evidence, model and tool usage, wall time, cost, environment configuration, and the quality of the next change. Passing the current tests is necessary but does not establish maintainability or trustworthy long-horizon behavior.

Use four demonstration fallbacks:

1. Run the selected configuration live in Agent Canvas.
2. Open a completed Agent Canvas conversation and inspect its trace.
3. Show a saved trace excerpt and measured result table.
4. Continue the decision exercise with a prepared result card.

Before promising participant cloud access, validate the exact Agent Canvas and Agent Server versions, repository cloning, environment startup, model credentials, isolation, concurrency, and saved-trace access. The minimum reliable delivery is one instructor-operated cloud environment plus browser-accessible workshop materials and prepared traces.
