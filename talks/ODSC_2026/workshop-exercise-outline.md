# Engineering the Harness: Exercise-Focused Workshop Pass

> Planning note: the current live route combines these topic drafts into five
> hands-on exercises. See [workshop-slide-map.md](workshop-slide-map.md) for the
> current timing and slide selection. Keep this file as the detailed source for
> examples and evidence requirements.

## Purpose of this pass

This version focuses on what participants will actually do. Every exercise starts with a visible problem, asks participants to choose among credible approaches, and reveals the tradeoff through a trace or measured result. Participants are designing the harness, not filling in implementation code.

The workshop should use two kinds of examples:

1. **A fast core task** that provides continuity and can be rerun live. The P09 `toy_repo` is the strongest current candidate because it has deterministic checks and tasks ranging from trivial edits to pagination, async, auth, and architecture work.
2. **Measured evidence vignettes** where a specialized example makes the concept clearer. Use the VS Code GitNexus experiment for retrieval, P05 for memory, P12 for long-running goals, and P11 for multi-agent economics.

This avoids forcing one toy repository to demonstrate every harness problem.

## Standard exercise format

Each decision round uses five artifacts:

- **Problem card:** the task, trace failure, and constraints.
- **Choice slide:** two or three plausible approaches without labeling one as correct.
- **Neighbor discussion:** 60 to 90 seconds to choose and prepare one reason.
- **Evidence reveal:** a live Agent Canvas run, saved trace, or measured comparison.
- **Harness update:** participants record the component they would add, the evidence that justified it, and the new cost or failure mode it creates.

The audience should answer three questions every time:

1. What problem are we solving?
2. What is the simplest technique likely to solve it?
3. What evidence would make us add more complexity?

## 0:00-0:13 | Exercise 0: Read a working harness

### Problem

Participants have seen coding agents, but many cannot yet distinguish the model from the system that repeatedly prepares context, offers tools, records observations, enforces boundaries, and decides whether the work can continue. Before making design choices, they need a shared way to read a run.

### Participant decision

Open a completed successful run in Agent Canvas. Give pairs six to eight visible events and ask: **Who or what made this happen?**

- User request
- Model plan or next-action decision
- Tool availability and structured input
- Tool execution and observation
- File change
- Test or verifier result
- Final answer
- Conversation history and resumable state

Participants label each event as model work, harness work, or shared responsibility. They then circle the evidence that makes the final claim trustworthy and identify one event they would need after an interruption.

### Techniques to show

- Reading history from request to final answer and backward from claim to evidence
- The repeated model, action, observation loop
- Context assembly, tool execution, event storage, permissions, and verification as harness responsibilities
- Planning and next-action selection as model behavior shaped by the harness
- A visible working baseline before ablation or failure analysis

### Recommended example

Use the P01 Agent Canvas task:

> Find every place `VITE_BACKEND_HOST` and `VITE_BACKEND_BASE_URL` are read or set, and explain how the dev script picks the backend.

It is narrow, repeatable, and naturally produces search, file-read, and final-answer events. Begin with one known-good completed OpenHands run. The audience should see the original request, history, planning or reasoning summary, searches, observations, and evidence-backed final answer without waiting for a live call.

After the trace-reading exercise, an optional two-minute ACP reveal can rerun the same task using the Pi profile in Agent Canvas. Hold the model, prompt, repository state, environment, and verifier constant. This turns Agent Canvas into a common microscope for comparing harness behavior rather than a product scoreboard.

The earlier controlled benchmark provides a strong reason to keep this optional comparison. OpenHands-native, Pi-ACP, and OpenCode-ACP used the same underlying model but showed different system-prompt overhead, tool-call patterns, total token use, and task-dependent winners. The lesson is not that one harness always wins. It is that the harness changes the computation even when the model is fixed.

### Evidence to reveal

- The complete path from user request to final evidence
- Which events came from the model and which came from the harness
- First useful search step and files inspected
- Whether the answer cites repository evidence
- Whether the trace proves the task was completed
- If ACP is shown, differences in tool sequence, hidden prompt overhead, tokens, latency, and outcome

### Participant artifact

An annotated mini-trace plus two sentences:

```text
I trust the result because __________.
The harness, rather than the model alone, supplied __________.
```

## 0:13-0:27 | Exercise 1: Retrieval for finding code versus understanding impact

### Problem

The repository is too large to load into context. The issue description does not share exact vocabulary with the implementation. Even after finding a plausible symbol, the agent does not know the structural blast radius of changing it.

### Participant decision

Use two related questions:

1. **Find a starting point:** Which technique should the agent try first?
2. **Estimate impact:** Which technique should it use after it has a symbol?

Choices:

- `grep`, file search, and whole-file reads
- Indexed, semantic, or code-graph retrieval
- Iterative agentic search that changes queries based on evidence

Participants may choose different techniques for the two questions. That is the intended learning moment.

### Techniques to show

- Exact lexical search and broader token search
- Whole-file reading versus chunk retrieval
- Semantic retrieval for vocabulary mismatch
- Code-graph neighborhood and impact queries
- MCP as the delivery mechanism for a specialized retrieval capability
- Agentic retrieval when one search is insufficient

### Recommended example

Use the existing VS Code and GitNexus experiment.

**Finding question:**

```text
extension activation command registration execute command
```

The no-MCP agent used targeted searches and found `ExtHostCommands`, a strong starting point. GitNexus returned another useful execution service and used far less context in the observed run. The honest result is that graph retrieval did not simply “beat grep.”

**Impact question:**

```text
What is the blast radius of changing localize in src/vs/nls.ts?
```

The graph reported that `localize` was structurally central, with thousands of impacted symbols. This is a clearer graph win because the question is relational rather than textual.

### Evidence to reveal

- Exact phrase search finds nothing
- Broad token search touches many files
- Strong model plus `grep` still finds a useful file
- GitNexus supplies a compact symbol neighborhood and impact path
- Observed cost and token difference, clearly labeled as one run rather than a formal benchmark

### Participant artifact

A two-line retrieval policy:

```text
To locate code, start with __________.
To understand relationships or blast radius, escalate to __________ when __________.
```

## 0:27-0:41 | Exercise 2: Decide what the agent should remember

### Problem

The agent finds the right code but later loses an important test constraint. A fresh session repeats repository orientation. Meanwhile, a verbose tool result and generic repository instructions consume context on every turn.

### Participant decision

Give participants eight to twelve information cards. For each card, choose:

- Keep in active context
- Write to external working state
- Put in a minimal `AGENTS.md`
- Package as an on-demand skill
- Retrieve again if needed
- Discard

Candidate cards:

- The current objective and success criterion
- The next two plan steps
- The repository's non-obvious test command
- A stable directory-layout fact
- A one-off stack trace
- Hundreds of package-install warnings
- A detailed release procedure used once a month
- The result of the most recent verifier run
- A generic instruction such as “write clean code”

### Techniques to show

- Active context versus external working state
- Compaction and audit of the synthetic summary
- Large tool output written to files instead of kept in the prompt
- Minimal hand-written `AGENTS.md`
- Auto-generated repository memory as a potentially harmful baseline
- Skills as progressive disclosure for procedural knowledge

### Recommended example

Use the P05 comparison against Agent Canvas:

- No durable repository memory
- Minimal hand-written `AGENTS.md`
- Optional auto-generated `AGENTS.md`

Reuse the P01 prompt so the traces show which orientation steps disappear. Pair it with one compaction trace and ask participants whether the summary preserved the objective, latest verifier result, and unresolved work.

### Evidence to reveal

- Turns and tokens spent on rediscovery
- Which facts are loaded on every turn
- What compaction kept and discarded
- Whether the skill or memory changed correctness or merely added tokens

### Participant artifact

A memory-placement table, not a prose memory policy.

## 0:41-0:56 | Exercise 3: Make a long-running goal honest and resumable

### Problem

A task runs across sessions. The agent says it is complete, but the evidence is ambiguous. The session is interrupted, the environment may have changed, and the original request contains a false premise.

### Participant decision

Build the smallest trustworthy goal scaffold by selecting what the harness must own:

- Objective only
- Explicit criteria
- System-owned verifier
- Evidence ledger
- Allowed actions and workspace envelope
- Token, cost, or iteration budget
- Terminal states such as complete, blocked, capped, and verifier-failed
- Resume state and environment identity

Then ask: **What should the resumed agent do first?**

- Trust the previous summary and continue editing
- Re-run the verifier and inspect repository state
- Start the investigation over

### Techniques to show

- Conversation continuation versus a goal loop
- Judge feedback versus mechanical verification
- Goal scaffold and criterion-by-criterion state
- Checkpoint and resume protocol
- Fresh evidence after the latest relevant edit
- Hard budgets and stop states
- Durable polling loop for work that outlives an orchestrator

### Recommended example

Use the P12 paired slugify repositories:

- `dot_missing`: dot preservation is genuinely broken
- `dot_present`: the behavior and regression test already exist

The prompt asks for a pre-fix failing test. In `dot_present`, that evidence cannot honestly exist. Participants decide whether the agent should manufacture a failure, make an unnecessary change, or report that the premise is false. This makes “done” and “evidence” concrete.

For resumability, show the same goal after restart with only transcript text versus a scaffold containing criteria, verifier events, changed files, budget, and next action.

### Evidence to reveal

- Whether completion is possible without a verifier event
- Whether the verifier ran after the last edit
- Whether the agent stayed inside the allowed paths and commands
- Why the run stopped
- Whether a fresh process can resume without reconstructing the task from chat

### Participant artifact

A selected goal scaffold plus one sentence defining what counts as proof of completion.

## 0:56-1:10 | Exercise 4: Repair the loop and bound the tools

### Problem

The agent edits the same function repeatedly while the same test fails. It has too many tools, receives a very large result, requests a new package, and wants network or database access.

### Participant decision

Show the trace immediately after the second repeated failure and ask: **What should the harness permit next?**

- Another edit with the same approach
- A forced hypothesis and targeted inspection before another edit
- A model escalation
- A human escalation

Then give several actions and ask participants to classify them as:

- Direct model tool call
- Bounded code or programmatic tool orchestration
- MCP or specialized tool loaded on demand
- Automatic inside the sandbox
- Requires human approval

### Techniques to show

- Observe, hypothesize, act, verify, checkpoint, stop
- Repetition detection from error strings, unchanged diffs, and repeated edits
- Structured tool inputs that require a hypothesis and verification plan
- Direct tool calls versus programmatic aggregation
- Defensive truncation and externalized large outputs
- Hooks and test gates
- Filesystem and network sandboxing
- Risk-based approval rather than approval for every command

### Recommended example

Use either P09 task 06, the pagination off-by-one bug, or task 08, the async race condition. Prepare a trace in which a cheaper model repeats the same failing test and edits the same file twice. The next decision can naturally lead into the model-routing section.

For the permission subexercise, use concrete commands:

- Read a source file
- Edit an in-scope module
- Run the target test
- Install a new dependency
- Call a read-only issue-tracker MCP
- Access an unapproved network domain
- Reset a test database
- Force-push a branch

### Evidence to reveal

- The first repeated failure signal
- Whether the next action gathers new information
- Whether verification is system-owned
- Which operations are technically prevented rather than discouraged in prompt text

### Participant artifact

A six-step loop and a small permission envelope.

## 1:10-1:18 | Break

Display the current harness and allow participants to compare decisions. Anyone attempting local execution switches to prepared traces if their environment is not ready.

## 1:18-1:34 | Exercise 5: Route models and reasoning using evidence

### Problem

The frontier model solves routine work but costs too much. A cheap model succeeds on simple tasks, struggles on a harder bug, and should never be trusted alone for a high-risk review.

### Participant decision

Give each participant four task cards:

1. Rename a variable in one file
2. Fix a pagination off-by-one error
3. Debug an async race condition
4. Review authentication middleware

For each card, choose:

- Initial model tier
- Reasoning effort
- Verifier
- Risk floor
- Escalation signal

Then reveal runtime evidence for the async task and ask whether to retry, increase reasoning, switch models, or stop.

### Techniques to show

- Frontier-only baseline
- Static route by task type and risk
- Cheap-first cascade
- Runtime switching through an observable tool event
- Reasoning effort as a routing dimension
- Risk floor for auth and security work
- Verifiability as the precondition for cheap-first execution
- Cost per solved task

### Recommended example

Use P09 tasks 01, 06, 08, and 09. Show task 08 or task 10 in Agent Canvas because the model-switch event and reason are visible. Keep the complete ten-task benchmark as the evidence table behind the four-card exercise.

### Evidence to reveal

- Pass rate by route
- Models and reasoning levels used
- Repeated failure or unchanged-diff signals
- Escalation reason
- Total cost and cost per solved task
- A low-verifiability example where no cheap automatic failure signal exists

### Participant artifact

A four-row routing matrix with explicit escalation criteria.

## 1:34-1:51 | Exercise 6: Decide whether a task earns more agents

### Problem

One agent must cover several audit dimensions or investigate several areas of a large repository. Parallel specialists sound attractive, but every child repeats setup, receives its own context, and creates a synthesis obligation.

### Participant decision

Give participants two task shapes and ask them to choose one agent, subagents, separate worker conversations, or a worker plus critic.

**Task A:** Audit a small URL shortener for documentation, error handling, secrets, dependencies, and tests.

**Task B:** Investigate five distinct areas of a very large repository and return an exact checklist of benchmark facts.

For any multi-agent choice, participants must also specify:

- Workspace isolation or shared working tree
- Child task boundary
- Handoff fields
- Synthesis owner
- Verifier
- Maximum child budget

### Techniques to show

- Single-context baseline
- Subagent as a bounded context boundary
- Separate conversation and sandbox
- Parallel independent branches
- Worker plus evaluator or critic
- Compact structured handoffs
- Child model routing
- Parent-child, polling, and event-driven orchestration as different time-horizon patterns
- Coordination cost, duplicated setup, synthesis loss, and merge conflicts

### Recommended example

Use the measured P11 contrast:

- On the small repo, five subagents plus synthesis cost 3.56 times as much and took longer without improving the five-of-five result.
- On the large “monster repo” investigation, subagents improved checklist coverage from 13/15 to 15/15, but cost 5.28 times as much and took 3.79 times longer.

The surprise is useful: the larger task earned a quality improvement, but not a default recommendation.

After the controlled result, show the software-factory patterns as an application:

- Parent-child when one live orchestrator can own the lifecycle
- Polling when work spans hours or days and durable state must outlive the process
- Event-driven handoff when GitHub or Jira already owns the workflow

Neuron Golf can be an additional high-energy example if it has a clean task split, objective score, compact child results, and measured single-agent comparison. Without those controls, keep it as inspiration rather than evidence.

### Evidence to reveal

- Quality score
- Per-child and synthesis cost
- Wall time
- Repeated repository-orientation cost
- Facts found by children but lost during synthesis
- The effect of a structured checklist handoff

### Participant artifact

A task-boundary diagram and the sentence: “This branch earns another agent because ___ exceeds ___.”

## 1:51-2:00 | Final challenge: Choose the next safe action

### Problem

The coding task is incomplete. The primary model is unavailable, the cloud environment is stale, one branch has an unverified change, and a second branch is waiting on external information. Most of the budget has been spent.

### Participant decision

Participants choose the next three harness actions in order. Options include:

- Restore the known-good environment
- Re-run the verifier
- Route to a fallback model
- Resume from the goal scaffold
- Spawn a bounded investigator
- Merge the existing branch
- Ask for human input
- Stop because the completion criteria cannot be proven

There is no universal winning sequence. The reasoning must respect evidence, risk, state, and budget.

### Techniques integrated

- Retrieval choice
- Memory placement
- Resume protocol
- Environment verification
- Safe tool envelope
- Model fallback
- Multi-agent boundary
- Human escalation
- Completion evidence

### Participant artifact

An annotated final harness and an ordered recovery plan.

## Example readiness and research backlog

### Ready or close to ready

| Topic | Existing example | Why it is strong | Work remaining |
|---|---|---|---|
| Working harness trace | P01 Agent Canvas backend-variable task | Narrow, successful, and visible from request through evidence | Capture one polished completed conversation and an annotated event map |
| Retrieval | VS Code plus GitNexus | Honest mixed result and strong blast-radius example | Package trace excerpts and label observed metrics clearly |
| Memory | P05 no-memory versus minimal `AGENTS.md` | Same task, trace comparison | Select eight to twelve information cards |
| Long-running goals | P12 paired slugify repos | False premise makes evidence concrete | Create a short resume-state visualization |
| Model routing | P09 benchmark | Deterministic tasks and checks | Pick four task cards and one Canvas-visible cascade |
| Multi-agent | P11 small and monster repos | Measured negative and qualified positive cases | Condense results into two reveal cards |

### Promising, but needs a controlled comparison

| Candidate | Potential role | What must be demonstrated first |
|---|---|---|
| Pi through ACP in Agent Canvas | Optional same-model harness comparison | Re-run P01 with the same prompt, repository state, environment, model, and verifier; compare event sequence, tool calls, latency, tokens, and outcome |
| Software factory | Long-running multi-agent application | A short visible lifecycle with durable state and explicit gates |
| Neuron Golf | Parallel search and evaluator loop | Clear decomposition, objective score, and single-agent baseline |
| GitNexus impact-aware editing | Retrieval plus risk routing | An edit where graph impact changes the agent's validation plan |

## Assets to prepare for every chosen example

For each exercise, create:

1. One choice slide with the problem and alternatives.
2. One participant card that can be understood without setup.
3. One known-good live command or Agent Canvas conversation.
4. One saved trace with the important events highlighted.
5. One result table with measured values and environment metadata.
6. One fallback screenshot or short recording.
7. One facilitator note explaining the expected debate and common misconception.

The exercise is ready only when the live path and the saved-trace path teach the same lesson.
