# ODSC harness engineering: animation and visual backlog

These concepts extend the current Markdown deck. Agent Canvas is the demonstration environment. Animations should make a mechanism or comparison easier to understand during live teaching. Each sequence should also have useful static frames for PPTX and PDF.

Source IDs below refer to the original slides, not their changing presentation positions. Named new slides use their stable Markdown marker.

## First build candidates

1. Replay the agent loop with separate model and harness responsibilities.
2. Assemble the context for successive model calls.
3. Compact a conversation and inspect the continuation record.
4. Replay the Pi cache-control experiment.
5. Interrupt a run and resume from its checkpoint.
6. Show a multi-agent fork and join, including the final synthesis.

The first four can reuse the diagrams and evidence added in the Agent Canvas teaching pass. Checkpoint and delegation sequences can share the opening trace vocabulary.

## Opening and Workshop 1: understand the harness

### 01. Follow a request through the agent loop

**Motion:** Start with the user request. On each click, illuminate the next responsible component: context assembly, model, tool execution, returned observation, and the next model call. Keep the model and harness in fixed positions. Append the corresponding event to a short visible Agent Canvas trace. Stop on a test result, then distinguish the model's completion request from the recorded finish event.

**Teaching purpose:** Make it clear who chooses an action, who executes it, and how evidence returns to the model.

**Fits:** Opening, `agent-canvas-run`, source 015, source 123.

**Assets:** Recorded incident-task event excerpts already available. Use selected events and mark omitted work. This is a designed replay, not a live run or a literal Canvas screenshot.

**Control:** About six presenter-controlled steps. A repeat control can run the model/tool portion once more.

### 02. Watch the same task take different paths

**Motion:** Put three trace timelines side by side. Start the same task in OpenHands, Pi, and OpenCode. Reveal searches, reads, edits, tests, and retries. Pause at a useful divergence, then reveal final outcome, elapsed time, and usage.

**Teaching purpose:** Show what changed inside the execution, beyond the final score.

**Fits:** Workshop 1, sources 025 and 026.

**Assets:** Prepared comparable runs. Provide two explicitly labeled views: event order for comparing behavior, and elapsed time for comparing speed. Do not imply equal durations by spacing all events evenly on a time axis.

### 03. Zoom from an original benchmark to its evidence

**Motion:** Begin with the original Terminal-Bench, OpenBench, or Snowflake visual. Dim unrelated rows or points. Highlight the matched model and relevant harnesses, then enlarge the comparison while retaining the source title and key column labels. Reveal the headline after the audience has seen the numbers.

**Teaching purpose:** Preserve the authority of the source while directing attention to one finding.

**Fits:** Sources 017, 018, 019, and 016.

**Assets:** Existing original images. Keep the full figure as the first or final frame. Use original proportions; a magnified crop must retain units and comparison labels.

### 04. Trace a harness change from diagnosis to rerun

**Motion:** Freeze a trace at the failure. Identify one setting to change. Show the small configuration diff, then open the rerun beside the baseline. Reveal the intended metric first, followed by correctness and other consequences.

**Teaching purpose:** Teach the process of engineering a harness.

**Fits:** `harness-improvement-method` and `pi-cache-intervention`.

**Assets:** Pi's missing cache markers, the compatibility setting, calibration, and rerun measurements are already available. If showing another task, identify it separately rather than implying an unmeasured transfer result.

## Workshop 2: tools and interfaces

### 04a. Reveal the tool-shape result in three lanes

**Motion:** Start with the three interfaces and hide the outcomes. Reveal evidence quality first: 6/6, 4/6, and 6/6. Then reveal elapsed time and tool calls. Finish by expanding the traces so the audience sees the repeated retrieval loop that the task-shaped tool removed.

**Teaching purpose:** Make the result about interface design rather than MCP versus terminal or raw tool count.

**Fits:** `workshop-2-result` and `workshop-2-mechanism`.

**Assets:** Use medians from the three fresh trials. Keep the broad, terminal, and task-shaped labels consistent. The four-primitive-tool condition belongs in the detailed trace or speaker notes.

### 05. Make the tool catalog enter the prompt

**Motion:** Show a catalog outside the model context. In the eager-loading version, tool definitions enter the next-call payload. Reset. In the discovery version, a compact search interface enters first; selected definitions load after discovery.

**Teaching purpose:** Explain the difference between tools being available somewhere and tool definitions occupying the model's current context.

**Fits:** Sources 031, 032, and 196.

**Assets:** Real schema text or short representative excerpts. A schematic can explain the mechanism without numerical areas. Proportional token areas require measured token counts.

### 06. Perform the same action through different interfaces

**Motion:** Keep the task fixed, such as finding an issue or running a focused test. Switch between a structured tool call, an MCP-exposed tool, and terminal/API execution. Reveal the arguments the model must supply, the returned evidence, and the next action.

**Teaching purpose:** Show how interface design changes what the model must understand and generate.

**Fits:** Source 033 and `edit-format`.

**Assets:** Equivalent recorded operations, or a clearly labeled worked example. MCP can expose a structured tool backed by the same API; these are not necessarily separate capabilities.

### 07. Compare sequential calls with bounded program execution

**Motion:** On a timeline, execute several independent retrieval calls one after another. Replay as a bounded batch or program, then show the single aggregated result returned to the model. Keep the interpretation step visible in both versions.

**Teaching purpose:** Explain where round trips come from and which work can happen without another model decision.

**Fits:** Source 038.

**Assets:** Use measured timing when available. Otherwise label the timeline schematic and omit numerical time savings. Preserve dependencies; dependent calls should not appear to run in parallel.

## Workshop 3: context, working state, and memory

### 07a. Let the green tests lead to the wrong answer

**Motion:** Reveal the stale architecture instruction, then the agent's new `toyapp/cursor.py` file and its growing test suite. Show the green internal tests before revealing the external verifier failure. Only after correctness is visible should the 39% time and 46% processed-token penalties appear.

**Teaching purpose:** Show how stale context can shape implementation and create tests that ratify the same wrong interpretation.

**Fits:** `workshop-3-result` and `workshop-3-mechanism`.

**Assets:** Use one saved save-everything trace and the independent verifier output. Label the 23 to 30 test range across trials rather than implying one run wrote every count.

### 08. Assemble the next model call in front of the audience

**Motion:** Build one context payload from instructions, tool definitions, loaded guidance, retrieved files, and recent observations. Advance one turn: some material repeats, a tool result arrives, and older history remains. Let the audience select a segment to see the actual text it contains.

**Teaching purpose:** Make the contents of context tangible and explain repeated input across calls.

**Fits:** Source 044, `tools-to-context`, and `context-budget-stack`.

**Assets:** The total-context chart already exists. A proportional breakdown across successive calls still needs component measurements. Until then, use a labeled schematic with no implied quantitative widths.

### 09. Move one fact between storage and active context

**Motion:** Use the pagination example. Place the current failure in active context, the checkpoint in a task file, and the reusable test command in guidance. Start a new call and visibly load the needed stored information back into active context. Start a future task and show which information remains relevant.

**Teaching purpose:** Explain information lifetime without suggesting the categories are mutually exclusive storage locations.

**Fits:** Sources 042, 046, 064, and 071.

**Assets:** Existing context-lifetimes diagram. A presenter can reveal placements after the audience votes. A drag-and-drop version is optional.

### 10. Compact a conversation, then test what survived

**Motion:** Show a history with repeated output, a failed approach, a constraint, and unresolved work. Collapse it into a readable continuation record while retaining a link to the raw history. Reveal a new-session question: can the agent identify the next action? Toggle between a complete record and one missing a critical fact.

**Teaching purpose:** Turn compaction into a checkable information-preservation problem.

**Fits:** `summarization`, sources 060 and 064.

**Assets:** Existing illustrative pagination artifact. Keep it labeled illustrative until replaced with a recorded compaction event. Do not depict omitted facts as recoverable from the summary alone.

### 11. Show cache reuse separately from context length

**Motion:** Display successive requests with repeated prefix blocks. Mark the portion actually returned as cache reads and the portion counted as fresh input. Replay the Pi configuration change. End with the measured fresh-input bars and the unchanged 89-call count.

**Teaching purpose:** Explain why a large input footprint and an expensive input bill are not the same measurement.

**Fits:** `pi-cache-intervention`, `prompt-caching`, source 061.

**Assets:** Pi baseline and rerun totals plus calibration records. An exact per-turn replay needs ledger extraction. Do not label fresh-input reduction as measured dollar savings when cost fields are unavailable.

### 12. Retrieve evidence instead of loading the repository

**Motion:** Begin with a repository tree outside the context window. Highlight a search result, bring in the relevant code, follow a caller, then load the test. Leave the unneeded files outside. Reveal how the observed failure changes the next query.

**Teaching purpose:** Show retrieval as an iterative decision about what enters context.

**Fits:** Source 046 and the retrieval reserve material.

**Assets:** A recorded repository investigation is preferable. Use the illustrative pagination example for an initial version.

### 12a. Show when code search outgrows filesystem tools

**Motion:** Hold the search task constant while the corpus expands. Let ripgrep latency rise steeply and indexed-search latency rise modestly. Then change the workload label from one repository to repeated searches across a large corpus and reveal the trained specialist model.

**Teaching purpose:** Show that search-harness design depends on workload scale, and that the model can be trained around the retrieval environment it will use.

**Fits:** `model-harness-coadaptation`, `trained-code-search-at-scale`, and the retrieval reserve material.

**Assets:** Preserve the original latency-versus-corpus figure from the Applied Compute and turbopuffer case study. Attribute all measurements on-screen and label them vendor-reported. Do not animate interpolated values that the source does not report.

## Workshop 4: routing

### 13. Route at the moment new evidence arrives

**Motion:** Start a task on the chosen model. Pause at a failed verifier. Let the audience choose retry, more reasoning, another model, or human review. Reveal the prepared continuation, including the context passed to the new model and repeated work.

**Teaching purpose:** Make the escalation signal and its consequences visible.

**Fits:** Sources 098, 106, 107, and 112.

**Assets:** Recorded branches where available. Label hypothetical branches rather than inventing counterfactual outcomes. Counters should include previous attempts, verification, and handoff costs.

### 14. Reveal the total cost of getting a verified result

**Motion:** Build a horizontal cost bar in stages: first attempt, verification, retry, escalation, final check. Do the same for the comparison policy. Reveal the verified outcome before declaring one policy preferable.

**Teaching purpose:** Explain why the cheaper model call can lead to the more expensive completed task.

**Fits:** Sources 107, 109, and 113.

**Assets:** Use costs from one consistent experiment. If only time or token data exists, use that unit and label it directly. Do not mix results from separate studies into a single trajectory.

## Workshop 5: loops and recovery

### 15. Interrupt the run and reconstruct its working state

**Motion:** Pause a trace after an edit but before verification. End the session. Keep the saved files and checkpoint visible, then launch a fresh session. Reveal what it reads and which evidence it rechecks before continuing.

**Teaching purpose:** Distinguish saved conversation, durable task state, and evidence that remains valid after a restart.

**Fits:** Sources 118, 127, and 152.

**Assets:** Recorded resume sequence if available; otherwise a worked example. Show that a saved test result can become stale after an edit or environment change.

### 16. Stop a retry loop at the decision that changes it

**Motion:** Show the same failing test after repeated edits. Freeze the loop. Insert a targeted inspection, new hypothesis, or external gate. Continue to either a verified result or an explicit stopped state.

**Teaching purpose:** Make recovery policy visible instead of equating another turn with progress.

**Fits:** Sources 115, 116, 136, and 152.

**Assets:** An actual repetitive trace is ideal. The animation should show the evidence that changed, not just replace a red failure with a green success.

### 17. Follow an action through a hook and an approval boundary

**Motion:** Let the model request an action. Pause before execution. Show the relevant check: allowed path, required test, remaining budget, or human approval. Continue, block, or return useful feedback to the model.

**Teaching purpose:** Explain where controls execute in the loop and how they differ from instructions in the prompt.

**Fits:** `hooks`, sources 143 and 146.

**Assets:** A small concrete operation in Agent Canvas. Keep the initial version to one action and one check; additional policy branches can be separate reveals.

## Workshop 6: delegation and coordination

### 18. Show the whole fork-and-join timeline

**Motion:** Split a task into bounded investigations. Show setup and context loading for each worker, then independent work. As workers finish, keep the parent waiting where dependencies require it. Finally show synthesis and verification before the system can finish.

**Teaching purpose:** Make parallel work, duplicated setup, and the final serial work visible on the same timeline.

**Fits:** Sources 158, 169, 171, and 175.

**Assets:** Matched single-agent and multi-agent runs. Use real timestamps for a time-scaled version and account for all workers. A clean schematic can come first.

### 19. Follow evidence through the handoff

**Motion:** Give each worker a small set of findings. Move their returned artifacts to the parent. Track which findings appear in the final answer and which are omitted. Replay with explicit evidence fields and a checklist for synthesis.

**Teaching purpose:** Explain that successful child work can still disappear during synthesis.

**Fits:** Sources 170, 175, and 176.

**Assets:** A saved example where a finding is present in a child response but absent from the parent's output. A proposed checklist improvement should remain illustrative until rerun.

### 20. Reveal a workflow as the task becomes understood

**Motion:** Begin with one unresolved objective. After a discovery, add a justified branch. Merge or cancel a branch when evidence changes its relevance. Keep the budget and dependencies visible as the workflow evolves.

**Teaching purpose:** Show what makes a workflow dynamic: its structure changes in response to evidence.

**Fits:** Source 174 and the dynamic-workflow reserve slides.

**Assets:** Start with a worked example. Use only a few branches so the audience can follow why each one exists.

## Reusable presentation behavior

- Use presenter-controlled steps for explanations. Every sequence must pause on a readable state.
- Keep object positions and role colors consistent. Use the same model, harness, tool, and evidence vocabulary across workshops.
- Give measured replays an experiment label and source. Give schematic sequences a clear illustrative label.
- Use real scales when animating data. Avoid adding intermediate values or a causal interpretation that the observations do not support.
- Keep labels static while the relevant object moves. Preserve the original figure as a reference state for benchmark zooms.
- Offer replay and a useful final frame. The static deck should retain the essential comparison through a few key frames or one annotated summary.
- Keep source text, vector diagrams, raw images, and measurements separate from the animation so later edits and exports remain practical.

## Suggested implementation batches

**Batch A: shared teaching language.** Build 01, 08, and 09 first. These establish the agent loop, context assembly, and information lifetimes used across the course.

**Batch B: worked mechanisms.** Build 10 and 11 using the existing compaction example and Pi experiment. Add 04 as the recurring engineering method.

**Batch C: live decision moments.** Build 13, 15, and 18. These create audience choices around routing, resuming, and delegation.

**Batch D: source-focused evidence.** Build 03 for the strongest benchmark figures, then add tool batching or handoff-loss examples where the underlying traces support them.
