# Workshop decision replacements

These are minimal copy patches for the six workshop hinges in `deck.md`. They treat Agent Canvas as the microscope for the run. Participants are choosing harness behavior, not choosing a product.

Use the same recurring task where the evidence permits: investigate and repair the pagination boundary bug in the workshop repository. The task begins as an unfamiliar-code investigation, then acquires constraints as the workshop moves through tools, context, routing, loop control, and delegation. Workshop 1 keeps its existing controlled harness suite because that result is already measured. Workshop 6 may use the measured large-repository investigation as the reveal because the small pagination repair does not separate cleanly enough to justify parallel workers.

## Workshop 1: Harness choice

### Replace `source-slide: 013` claim

```markdown
<!-- source-slide: 013 -->
## What changed when the model stayed fixed?

Same model. Same repository task. Same verifier.

OpenHands, Pi, and OpenCode still assembled different context, exposed different actions, and stopped on different evidence.

Use Agent Canvas to inspect the run, not to pick a winner.
```

### Replace `source-slide: 014` prediction

```markdown
<!-- source-slide: 014 -->
## Where will the runs diverge first?

Choose one:

The first useful repository evidence

The number of model calls and context per call

The final verifier outcome

Constraint: model, task, repository revision, workspace, and verifier stay fixed.
```

### Replace `source-slide: 025` activity

```markdown
<!-- source-slide: 025 -->
## Trace one decision back to the harness

Open the three runs in Agent Canvas.

Find the first useful evidence, the tool that produced it, and the event that justified stopping.

Record one difference caused by context assembly, tool design, or completion control.
```

### Append after `source-slide: 026` result

```markdown
<!-- new-slide: workshop-1-debrief -->
## Decide what you would hold fixed next time

The harness changed the path and cost more than the outcome in this run.

Decision: compare harness changes with a fixed task, environment, model, and external verifier.

Revisit the result when the model or task shape changes. This is a local comparison, not a product ranking.
```

## Workshop 2: Tool design

### Replace `source-slide: 034` claim

```markdown
<!-- source-slide: 034 -->
## Which tool surface earns its place?

The pagination bug sits in an unfamiliar repository. The agent needs to find the boundary logic, inspect callers, edit one module, and run the verifier.

Compare a broad catalog, a focused repository tool, and terminal search plus tests.

Hold the model, task, workspace, and verifier fixed.
```

### Replace `new-slide: workshop-2-prediction` prediction

```markdown
<!-- new-slide: workshop-2-prediction -->
## What should the harness expose first?

Choose one:

Broad catalog: fast discovery if the right tool is easy to find

Focused repository tool: typed actions with less choice

Terminal search and tests: one compact interface with a wide action space

Predict first useful evidence, failed calls, context cost, and completion evidence.
```

### Replace `source-slide: 035` activity and pending result

```markdown
<!-- source-slide: 035 -->
## Inspect the tool path before judging it

In Agent Canvas, mark the first useful evidence, every failed call, and the verifier event.

Then choose the smallest action surface that could have completed the task.

PENDING CONTROLLED REHEARSAL

Do not treat an authentication failure as a tool-design result.
```

### Append after `source-slide: 035`

```markdown
<!-- new-slide: workshop-2-debrief -->
## Add a tool when it removes a measured constraint

Decision: keep the surface small until typed discovery, authentication, policy, or reliable structured output earns another tool.

No winner yet. The MCP versus terminal comparison remains pending until both paths pass the same preflight and verifier.
```

## Workshop 3: Context and memory

### Replace `source-slide: 040` claim

```markdown
<!-- source-slide: 040 -->
## Where should each fact live?

The pagination task has three different time horizons.

Next model call: the failing boundary case and the file under inspection

This task: the objective, current hypothesis, latest verifier result, and next action

Future tasks: a reviewed repository test command or stable convention

Compare no saved guidance, save everything, and curated placement.
```

### Replace `source-slide: 041` prediction

```markdown
<!-- source-slide: 041 -->
## Place the test command before the next call

Choose one:

Active context, because the next action needs it

Working state, because this task must survive interruption

Durable repository guidance, because future tasks will need it too

Constraint: it is repository-specific, verified, and easy to rediscover in under a minute.
```

### Replace `source-slide: 094` activity

```markdown
<!-- source-slide: 094 -->
## Spend a fixed context budget

Place each fact in one destination:

Next call, current-task state, future-task guidance, retrieve later, enforce in code, or delete.

Then remove one saved item. Explain what evidence would make you add it back.
```

### Append after `source-slide: 095` result

```markdown
<!-- new-slide: workshop-3-debrief -->
## Save by lifetime, then test the policy

Decision: keep immediate evidence in the next call, resumable progress in task state, and only reviewed recurring facts in future-task guidance.

The deck has context-per-call observations, but the no-guidance versus save-all versus curated comparison is still pending.
```

## Workshop 4: Model routing

### Replace `source-slide: 097` claim

```markdown
<!-- source-slide: 097 -->
## When has the cheaper route earned another attempt?

The pagination repair has a deterministic verifier. An authentication review does not.

Choose model tier, reasoning effort, verifier, risk floor, and escalation signal before either run starts.

Compare verified completion, time, cost, and defects the harness could not detect.
```

### Replace `source-slide: 098` prediction

```markdown
<!-- source-slide: 098 -->
## Route these two tasks

Pagination repair: cheap first, strongest first, or escalate after a failed verifier?

Authentication review: strongest first, two independent reviews, or cheap first with human review?

Constraint: you may escalate once. Name the evidence that triggers it.
```

### Replace `source-slide: 112` activity

```markdown
<!-- source-slide: 112 -->
## Write the route before seeing the trace

For each task, choose the starting model and effort, the verifier, the risk floor, and one escalation trigger.

In Agent Canvas, find the event that would keep the current route or change it.

Count repeated work after escalation.
```

### Append after `source-slide: 113` result

```markdown
<!-- new-slide: workshop-4-debrief -->
## Route from detectable failure and task risk

Decision: cheap-first is plausible when the harness can detect failure. Low-verifiability or high-risk work can justify stronger capability at the start.

The observed 7/8 to 8/8 result changed time and input sharply. It is an interaction signal, not a clean routing benchmark.
```

## Workshop 5: Agent loops

### Replace `source-slide: 115` claim

```markdown
<!-- source-slide: 115 -->
## What should the harness do after the same failure twice?

The pagination test still fails after two edits to the same function. The run has budget left.

Compare another attempt, a forced new hypothesis, model escalation, and a blocked stop.

The harness must preserve the goal, latest evidence, remaining budget, and terminal state.
```

### Replace `source-slide: 116` prediction

```markdown
<!-- source-slide: 116 -->
## Choose the next allowed action

Another edit to the same function

Inspect callers and state a new hypothesis before editing

Escalate the model with the failed test and diff

Stop as blocked and preserve a resumable checkpoint

Constraint: one repair round remains. Completion requires a fresh external verifier pass.
```

### Replace `source-slide: 152` activity

```markdown
<!-- source-slide: 152 -->
## Write the continuation contract

Define the objective, verifier, allowed paths, remaining budget, and terminal states.

Interrupt the run. A fresh session must choose continue, replan, escalate, or stop from the checkpoint alone.

Reject any completion claim without a verifier event after the last edit.
```

### Append after `source-slide: 153` result

```markdown
<!-- new-slide: workshop-5-debrief -->
## Another turn must produce new evidence

Decision: continue only when the next action changes the hypothesis, evidence, or route. Preserve state before interruption and let an external gate decide completion.

Independent validation improved one prepared task and not the other. More time alone did not explain the difference.
```

## Workshop 6: Multi-agent systems

### Replace `source-slide: 155` claim

```markdown
<!-- source-slide: 155 -->
## Does this work separate cleanly enough for another agent?

Compare two task shapes:

One pagination repair with shared implementation state

Five repository investigations with independent evidence fields

Choose one generalist, worker plus validator, or parallel investigators. Count setup, handoffs, synthesis, and verification.
```

### Replace `source-slide: 156` prediction

```markdown
<!-- source-slide: 156 -->
## Spend three agent cards

Choose one architecture for each task:

One agent with the full budget

One worker and an independent validator

Parallel investigators with isolated scopes

Constraint: every child needs a bounded question, evidence fields, a budget, and a synthesis owner.
```

### Replace `source-slide: 175` activity

```markdown
<!-- source-slide: 175 -->
## Define the handoff before adding the agent

Write the child question, allowed files, evidence to return, uncertainty, budget, and stop rule.

Name the synthesis owner and verifier.

If two workers need the same changing file, keep the work with one agent.
```

### Append after `source-slide: 176` result

```markdown
<!-- new-slide: workshop-6-debrief -->
## Add agents for separation or independent judgment

Decision: another agent earns its cost when work has independent boundaries or needs a fresh validator that a mechanical check cannot replace.

In the prepared evidence, the small repository stayed at 5/5 while costing more with subagents. The large investigation improved from 13/15 to 15/15, with much higher cost and time. Difficulty alone did not predict the win.
```

## Contradictions to resolve before applying

1. `workshop-exercise-outline.md` says the live route has five exercises, but the current deck and `deck-workshop-alignment.md` use six workshops. These patches follow the current six-workshop deck.
2. The detailed exercise outline numbers the model-routing exercise as Exercise 5 and long-running control as Exercises 3 and 4. The deck places model routing at Workshop 4 and combines goal state, loop control, validation, and safety in Workshop 5. These patches follow the deck.
3. Workshop 2 asks for a controlled MCP versus terminal result, but the deck says authentication preflight is incomplete. Keep the debrief procedural and the result labeled pending.
4. Workshop 3 has observed context-per-call differences across harnesses, not the promised no-guidance versus save-all versus curated trial. Do not use those observations as proof of a memory policy.
5. Workshop 4 reports one routing pilot where all policies solved all ten tasks and a separate 7/8 to 8/8 model comparison. Neither establishes a general router. Keep the decision conditional on verifiability and risk.
6. Workshop 5 combines evidence from different prepared tasks. The incident task did not improve in score, while the freight task did. State which task a number belongs to.
7. Workshop 6's current result slide reports a 4/9 to 6/9 repair sequence and 21 to 22 million provider tokens. The workshop plan also contains the cleaner P11 small-repo and large-repo comparison. Prefer P11 for the decision debrief if its trace and measurement card are available; otherwise keep `source-slide: 176` and do not imply the same experiment produced both sets of numbers.
8. The recurring pagination bug supports tool, context, routing, and loop decisions. It is a poor parallel-worker example because implementation state is tightly shared. Use that mismatch deliberately in Workshop 6, then contrast it with the measured independent repository investigation.
