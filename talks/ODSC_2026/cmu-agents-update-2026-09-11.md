# CMU 11-768 AI Agents: weekly delta

Review date: September 11, 2026
Compared with: [September 8 baseline](./cmu-agents-baseline-2026-09-08.md)
Course: [CMU 11-768: AI Agents](https://www.cmu-agents.com/)

## What changed

The course published three material additions:

- [Lecture 6: Agents for Coding and Software Development](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf), 82 slides.
- [Assignment 1](https://github.com/cmu-agents/assignment-1), covering a reusable ReAct loop, coding and chess tools, skills, compaction, programmatic tool use, and replayable evidence.
- Recordings for [Lecture 1](https://www.youtube.com/watch?v=UwfjzyLnvMg), [Lecture 2](https://www.youtube.com/watch?v=jXChFB4JSyw), [Lecture 3](https://www.youtube.com/watch?v=AiwCCvFW1uE), and [Lecture 4](https://www.youtube.com/watch?v=6zigF2a-2Pw). Lecture 5 and 6 recordings are not public yet.

This is a meaningful update. Lecture 6 mostly reinforces the workshop's direction, but it contributes a particularly clear coding-agent loop, useful evaluation language, and several assignment mechanics worth adapting.

## Highest-value workshop additions

### 1. Make the coding loop explicit: localize, edit, verify

Lecture 6's strongest practical visual is a three-stage loop:

1. Localize the relevant code and form a hypothesis.
2. Edit the repository.
3. Verify with executable evidence.

Failure returns to localization with the instruction to revise the hypothesis. This is better than depicting an agent as generic repeated tool use because it names the work that must improve after a failed check.

Source: [Lecture 6, p. 33](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=33)

Recommendation: adapt this into the workshop's main coding-agent loop. Keep the visual spare and reveal one stage at a time. Use “Failure means revise the hypothesis” as the talk-track line.

### 2. Define a runnable task, not merely a prompt

CMU defines a software task with three operational parts:

- starting state: files, dependencies, and a test command;
- issue: requested behavior plus a reproduction;
- checks: the bug fails before the repair, the repair restores it, and existing behavior remains intact.

This is a crisp bridge from prompting to harness design. It also prevents collecting trajectories or judging agents in a broken environment.

Source: [Lecture 6, pp. 47–48](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=47)

Recommendation: use this as a participant checklist before any coding-agent exercise. Add “validate the environment before blaming or training the agent.”

### 3. Separate requested repair from preserved behavior

The SWE-bench explanation distinguishes:

- FAIL_TO_PASS: did the requested repair begin working?
- PASS_TO_PASS: did previously working behavior remain working?

This gives the workshop better language for explaining why a green reproduction test is not enough.

Source: [Lecture 6, p. 47](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=47)

### 4. Treat stateful tools as a concurrency problem

Assignment 1 makes an unusually valuable point: when every tool call changes a live state, parallel calls cannot all be executed safely. Its chess harness executes at most one move among concurrent move requests and turns the remainder into recoverable observations. It also rereads the live board after model-written code invokes a move, avoiding a duplicate action against stale state.

Source: [Assignment 1 specification](https://github.com/cmu-agents/assignment-1/blob/main/ASSIGNMENT.md)

Recommendation: add this as the counterexample to “parallelize independent tool calls.” The rule is not “parallel is faster”; it is “parallelize only calls that are independent in the environment.”

### 5. Make malformed actions recoverable observations

The assignment requires malformed JSON and unknown tools to become observations returned to the model, rather than exceptions that crash the loop. This is a small implementation detail with a large reliability payoff.

Recommendation: include one before/after trace in Workshop 2: crash-on-parse versus observe-correct-retry.

### 6. Evaluate the harness with replayable artifacts

The assignment saves the patch and trajectory, then grades by replaying them in a fresh testbed without another model call. This separates task evidence from model availability and stochastic reruns.

Recommendation: have workshop exercises emit a compact evidence bundle: starting revision, patch, tool trajectory, verification command, and result. This is more transferable than a screenshot of a successful run.

## Excellent visualizations to adapt

Highest priority:

1. **Localize → edit → verify**, with failure returning to a revised hypothesis. [Lecture 6, p. 33](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=33)
2. **Single-step coding versus agentic coding**: one-shot code generation compared with repository search, editing, testing, and evidence. [Lecture 6, p. 32](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=32)
3. **Shell as a composable interface**: one tool surface for reading, searching, editing, and checking, with output, exit status, and timeout returned to the model. [Lecture 6, p. 39](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=39)
4. **Browser agent versus Playwright script**: adaptive exploration compared with a programmed sequence and assertions. [Lecture 6, p. 57](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=57)
5. **Full development lifecycle**: requirements, implementation, review, deployment and monitoring, and maintenance. The takeaway is that passing a test is one step, not the release decision. [Lecture 6, p. 61](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=61)

Do not copy the slide styling. Reuse the information structure and rebuild it in the workshop's visual system.

## Data points worth using

### Strong framing data

- In 5,928 self-reported Microsoft workdays, reading and writing code and tests occupied only 15% of the reported workday; 85% was debugging, meetings and email, review, requirements and documentation, helping others, learning, administration, and breaks. This supports expanding the goal from “generate code” to “support the development lifecycle.” The source is Meyer et al. (2019), as summarized in Lecture 6. [Lecture 6, p. 62](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=62)

### Useful, but contextual rather than universal

- On Aider's 89-task Python refactoring benchmark with GPT-4 Turbo, search/replace achieved 20% while a simplified unified-diff format achieved 61%. Use this as evidence that edit interfaces matter, not as a current model ranking. [Lecture 6, p. 43](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=43)
- A 32B Hybrid-Gym model improved over its base model from 7.0 to 32.4 on SWE-bench Verified, 9.01 to 16.86 on SWT-Bench, and 8.34 to 13.45 on Commit0 Lite. This is an optional research example for training across multiple harnesses, not a core workshop claim. [Lecture 6, p. 72](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=72)

## Advanced research examples

Keep these in a “go deeper” path:

- **Multi-harness training:** the same model weights are trained from trajectories collected in OpenHands, OpenCode, and Codex-style harnesses. This is useful evidence for model–harness co-adaptation and for evaluating whether capabilities transfer across interfaces. [Lecture 6, p. 54](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=54)
- **Learned code world models:** predict program behavior before paying for execution, but fall back to running both candidates when uncertainty is high. The research questions are practical: measure prediction error and task success, latency, tokens, environment calls, and failures versus savings at different fallback thresholds. [Lecture 6, pp. 74–79](https://www.cmu-agents.com/slides/lecture-06-coding-agents.pdf#page=74)
- **Programmatic tool calling:** Assignment 1 lets model-written code compose `simulate_move` and `play_move` in a sandbox. This is a concrete progression from fixed calls to code as a meta-tool. [Assignment 1 specification](https://github.com/cmu-agents/assignment-1/blob/main/ASSIGNMENT.md)

## Strong explanations and talk track

Worth paraphrasing:

- A coding agent is not a code generator. It operates on a repository, gathers evidence, changes state, and verifies consequences.
- Execution proves behavior only against the tests you ran. Finite tests can still accept the wrong implementation.
- Verification requires trusted tests, dependencies, an isolated environment, and a stable runtime—not merely a test command.
- A screenshot or image in an issue is evidence about the request; it does not automatically make image similarity the acceptance criterion.
- A browser agent adapts while exploring. A browser script follows a sequence you already know and asserts the expected result.
- In the Lecture 1 talk track, CMU frames capability as movable between model training and harness engineering: a frequently repeated harness solution can later become a training target. The useful question is therefore not “model or harness forever?” but “where should this capability live now?” [Lecture 1 recording](https://www.youtube.com/watch?v=UwfjzyLnvMg)

## Workshop mechanics to borrow

Assignment 1 provides better mechanics than another lecture slide:

1. **One loop, two domains:** reuse the same ReAct loop for code repair and chess. This makes the boundary between a general harness and domain-specific tools tangible.
2. **Progressive disclosure for skills:** put skill metadata in the prompt and load full instructions only when invoked.
3. **Measured compaction:** compact only the old prefix, preserve the system/task and latest complete action-observation unit, then compare success and active-context tokens against a no-compaction run.
4. **A/B tool-output experiment:** compare a board-only observation with board plus legal moves across models and repeated runs; measure illegal-call rate and tool calls rather than rewarding a chess win.
5. **Evidence over luck:** grade the experimental design and artifacts, not whether one stochastic run happens to use fewer steps.

The tool-output A/B experiment is especially suitable for the practical workshop: it turns “better context” into a falsifiable intervention with a cost metric and a failure metric.

## Astra and video-editing observations

The four public recordings use a restrained, repeatable edit:

- a clean digital slide feed occupies roughly two-thirds of the frame;
- a medium presenter crop remains visible in the right third;
- the crop follows the current presenter while protecting slide legibility;
- runtime is shorter than the scheduled class block, consistent with removing setup or dead time;
- sampled sections show no heavy motion graphics, B-roll, burned-in captions, or conspicuous branded transitions.

The useful lesson is the stable instructional composition, not flashy post-production. For workshop videos:

1. Keep slides, terminal, or browser at 65–75% of the frame and the presenter at 25–35%.
2. Cut to full-screen source when code or terminal detail would otherwise become unreadable.
3. Use presenter-only shots for openings, section transitions, and audience interaction.
4. Add chapter markers or brief chapter cards; the CMU recordings run 57–75 minutes and would benefit from stronger navigation.
5. Prefer clean source capture, restrained crop changes, and removal of dead time before adding decorative motion.

These are observed results in Astra-edited videos, but the public material does not prove which choices were made by Astra versus the course production team. Confidence is high in the layout and trimming observations, low in attributing them specifically to Astra.

## Disposition

### Add or adapt now

1. The localize–edit–verify loop with hypothesis revision on failure.
2. The runnable-task checklist and FAIL_TO_PASS versus PASS_TO_PASS explanation.
3. The stateful-tool concurrency counterexample.
4. Recoverable malformed-action handling.
5. Replayable evidence bundles for exercises.
6. Assignment 1's observation-shape A/B experiment as a workshop mechanic.

### Use if space permits

1. The 15% code-and-tests workday statistic to motivate lifecycle scope.
2. The shell-as-interface and browser-agent-versus-script visuals.
3. Multi-harness training as the research bridge.

### Keep out of the core workshop

1. Detailed taxonomy or history of coding agents.
2. World-model training details beyond the execute-versus-predict decision.
3. Benchmark leaderboards without a direct harness-design lesson.

## Broader weekly-review criteria

Beyond the original five criteria, continue tracking:

- workshop mechanics and exercises;
- evaluation design and evidence artifacts;
- failure recovery and state synchronization;
- concurrency, permissions, and irreversible actions;
- what belongs in model training versus the harness;
- production patterns that improve comprehension, navigation, and editability;
- explicit items to skip so the workshop remains practical.
