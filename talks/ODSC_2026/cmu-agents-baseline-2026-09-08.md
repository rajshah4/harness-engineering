# CMU 11-768 AI Agents: baseline workshop review

Review date: September 8, 2026  
Course: [CMU 11-768: AI Agents](https://www.cmu-agents.com/)  
Material reviewed: Lectures 1-5, through "Planning and Task Decomposition"

## Processing status: reviewed and carried into deck planning

Processed September 8, 2026 in the ODSC deck task. This file is the source review and disposition record; it does not need another initial review or a duplicate notes file.

Working deck: [deck.md](/Users/rajiv.shah/Code/codex/harness-engineering-deck/latest_sept4-markdown/deck.md).

The following selections have been carried into deck planning. **The tool-evaluation table, compaction preservation diagram, and drift example now have visual prototypes linked in the Markdown deck.** Remaining slide edits and numerical research claims still require follow-up.

| Selected material | Destination | Pending action |
| --- | --- | --- |
| Four-level tool evaluation | Workshop 2, before debrief | Built: `tool-evaluation-levels`, original page 54 table with row reveals. |
| Schemas constrain structure, not correctness | Workshop 2 | Add a counterexample or sharpen existing explanation. |
| Compaction preservation policy | Workshop 3, after summarization | Built: `compaction-preservation-policy`, page 48 diagram. Companion policy slide; existing concrete continuation example retained. |
| Repeated-summary constraint drift | Workshop 3 | Built: `repeated-compaction-drift`, page 50 example with progressive reveals, labeled illustrative. |
| Observation that triggers replanning | Workshop 5/6 bridge | Connect feedback to plan changes and delegation. |
| MACU positive multi-agent case | Workshop 6 | Verify original comparison and budgets before adding evidence. |
| ReasoningBank over-retrieval | Workshop 3, memory | Verify a distinct counterexample to saving or retrieving more; distinguish it from our planted stale-context experiment. |

Keep plans as security boundaries and executable skills as optional depth. Use the evaluation criteria to scrutinize our own workshop results as well as outside benchmarks.

Update this status in place as items land in the deck. Keep the detailed review below as reference, not a second active task list.

Visual review: [Tools and context, pages 3–5](http://127.0.0.1:5173/s/tools-context-visual-review?p=3). Source excerpts rendered from the original PDFs at 3840-pixel page width, with headings and citations separately editable in OpenSlide. Source images and build links are embedded in the working Markdown.

## Executive judgment

The CMU course strongly validates the workshop's current architecture. The workshop already covers the main practical territory in the first five lectures: the agent loop, harness choices, tool design, context and compaction, skills and memory, planning, loop control, and multi-agent boundaries.

The highest-value additions are not new modules. They are four sharper decision frameworks and two unusually clear research cases:

1. Evaluate tool use at four levels: selection, arguments, trajectory, and end-to-end task outcome.
2. Teach compaction as a preservation policy: exact anchors, encoded checkpoint, exact recent tail, external evidence, and explicit discard.
3. Ask which observations should cause replanning before adding adaptive planning or delegation.
4. Treat plans and programs as possible security boundaries, not just productivity aids.
5. Use over-retrieval as the memorable counterexample to "more memory is better."
6. Use MACU as a bounded positive case for multi-agent systems: separate work, stronger management, parallel speedup, and budgeted graph revision.

These should mostly replace or sharpen existing slides. They should not lengthen the workshop into a survey course.

## 1. Fundamentals worth adding or sharpening

### Adopt: a four-level tool-evaluation ladder

CMU separates tool evaluation into:

- selection: did the model choose the right tool?
- arguments: did it supply the right values?
- trajectory: did calls occur in a valid order?
- task: did the environment show that the goal was achieved?

This is a better organizing device than treating tool accuracy as one number. It fits Workshop 2 and connects directly to the workshop's emphasis on evidence and operational failures.

Source: [Lecture 2, pp. 53-56](https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=53)

Recommendation: adapt into one workshop table, then have participants classify one observed failure before revealing the answer.

### Adopt: constraints guarantee form, not correctness

CMU's cleanest tool-use line is that JSON Schema and grammar constraints guarantee form, not truth, permissions, tool choice, or task success. This corrects an overstatement in the older talk track that schema can "physically force the model to think." A schema can force the presence and shape of a `hypothesis` field; it cannot guarantee that the hypothesis is thoughtful or correct.

Source: [Lecture 2, pp. 27-35](https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=27)

Recommendation: change the workshop phrasing from "schema-enforced thinking" to "schema-enforced protocol," followed by external verification.

### Adopt: compaction as preservation policy

CMU gives a concrete answer to "what survives compaction?":

- keep exact: goal and constraints;
- encode: decisions, progress, and identifiers as a checkpoint;
- keep exact: the active attempt and fresh result;
- externalize: large evidence with a compact summary and pointer;
- discard: duplicates and superseded attempts.

The repeated-compaction example also shows a constraint degrading from `CUDA 12.4` to `CUDA 12.x` to `recent CUDA` to missing. This makes drift visible in a way that generic before/after summaries do not.

Source: [Lecture 3, pp. 46-51](https://www.cmu-agents.com/slides/lecture-03-long-context.pdf#page=46)

Recommendation: adapt the survival diagram and turn the drift chain into a 60-second audience exercise: "What must remain exact?"

### Adopt: planning should be conditional on feedback value

CMU contrasts a developer-defined workflow, a plan-then-execute agent, and an adaptive agent. Its practical rule is strong: committing up front is faster, cheaper, and more predictable; replanning is justified when execution produces information worth its extra cost and complexity.

Source: [Lecture 5, pp. 14-18](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=14)

Recommendation: use this as a bridge from Workshop 5 to Workshop 6. Ask participants to name the specific observation that is allowed to rewrite the plan.

## 2. Visualizations worth adapting

Highest priority:

1. **Tool evaluation table** - selection, arguments, trajectory, and task, with a metric and typical failure for each. Practical and immediately reusable. [Lecture 2, p. 54](https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=54)
2. **What survives compaction** - exact anchors, encoded checkpoint, exact recent tail, external evidence, and discard. It matches the workshop's context-placement story almost perfectly. [Lecture 3, p. 48](https://www.cmu-agents.com/slides/lecture-03-long-context.pdf#page=48)
3. **Structure in a long task** - parallel vendor searches, later compatibility check, replanning edge, and an irreversible requisition. It shows parallelism, dependency, adaptation, and approval in one graph. [Lecture 5, p. 3](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=3)
4. **Why replan while acting?** - a three-column continuum from fixed workflow to plan-then-execute to adaptive agent. [Lecture 5, p. 16](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=16)
5. **Plans as security boundaries** - reactive web content can influence the next action, while a program can accept page values without accepting new actions. [Lecture 5, p. 32](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=32)
6. **Skill lifecycle** - learn, use, and maintain as separate loops with admission, repair, and retirement. [Lecture 4, p. 25](https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=25)

Useful but lower priority:

- "An agent is a model in a loop" is exceptionally clean, but the workshop already has its own richer harness diagram. [Lecture 1, p. 14](https://www.cmu-agents.com/slides/lecture-01-agents.pdf#page=14)
- "Agents are systems, not just models" is a compact systems map, but the workshop's six-choice framing is more distinctive. [Lecture 1, p. 26](https://www.cmu-agents.com/slides/lecture-01-agents.pdf#page=26)
- "Text skills versus code skills" is a useful side-by-side when explaining flexibility versus testability and efficiency. [Lecture 4, p. 29](https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=29)
- The final planning checklist is an excellent debrief slide, but its four questions may work even better as a participant worksheet. [Lecture 5, p. 46](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=46)

Do not copy CMU's visual style wholesale. The useful pattern is the information architecture: one decision per slide, stable navigation cues, direct comparisons, source labels, and a plain-language takeaway beneath original research figures.

## 3. Data points worth using

### Strong and directly relevant

- Across 1,500 OpenHands sessions, the mean session contained 77,922 tokens. Tool results were 37% of the prompt, system plus tools 23%, and tool calls 20%. This makes the context problem concrete and points to observations—not just system prompts—as the largest target. [Lecture 3, p. 4](https://www.cmu-agents.com/slides/lecture-03-long-context.pdf#page=4)
- In SkillsBench, curated skills raised average pass rate from 33.9% to 50.5% across 18 model-harness configurations and 87 tasks, but hurt performance on 13 of 87 tasks. The current workshop already includes this result; CMU's focused-bundle explanation is a useful talk-track refinement. [Lecture 4, pp. 12-13](https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=12)
- In the ASI comparison over five WebArena sites, checkpoints reached rose from 41.3 with no memory to 59.5 with text skills and 80.2 with code skills, while steps per task fell from 24.5 to 20.6 to 15.0. This is strong evidence for executable skills when tasks repeat, but should remain optional because it is a web-task setting. [Lecture 4, pp. 32-33](https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=32)
- In MACU, multi-agent success increased from 8.5% to 34.0% on Odysseys, from 20.8% to 29.5% on WebTailBench, from 43.8% to 48.5% on OSWorld, and from 52.2% to 55.6% on Online-M2W. The large Odysseys lift is the interesting boundary case; the other gains are modest. [Lecture 5, p. 40](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=40)
- On an Odysseys easy subset, four workers reduced wall time from 25.4 minutes to 7.9 minutes, a 3.2x speedup rather than a 4x speedup. This is a clean practical parallelism result. [Lecture 5, p. 43](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=43)

### Use with caveats

- CMU's serial-versus-parallel tool example reduces a hypothetical three-tool workflow from about 6.4 seconds to 2.8 seconds. It is an explanatory calculation, not benchmark evidence. [Lecture 2, pp. 48-50](https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=48)
- CodeAct is shown with code achieving the best success rate for all eight displayed models and the fewest turns for seven of eight; across all 17 models, both counts are 12 of 17. Use only if the workshop needs a positive case for code as a meta-tool. [Lecture 2, pp. 14-17](https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=14)
- CMU displays provider tool-call error rates from OpenRouter. Treat these as a dated operational snapshot, not a stable model ranking. [Lecture 2, p. 57](https://www.cmu-agents.com/slides/lecture-02-tool-use.pdf#page=57)

## 4. Advanced research examples to point to

Keep these in an optional "go deeper" path rather than the core workshop:

- **ReasoningBank** - failures help when they are converted into strategies, but can hurt when stored as raw trajectories or workflows. It also supplies the memorable over-retrieval result: adding more experiences can reduce success. [Lecture 4, pp. 38-41](https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=38)
- **SAGE and AgeMem** - train the value of creating a skill using whether a later related task successfully reuses it, not merely whether the current task succeeded. [Lecture 4, p. 43](https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=43)
- **Calibrate-then-Act** - teach the agent when uncertainty should cause inspection or testing instead of more private reasoning. [Lecture 5, pp. 26-27](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=26)
- **Vending-Bench** - one temporary interpretation error compounds across as many as 2,000 messages and about 25 million tokens. This is a strong long-horizon failure story. [Lecture 5, p. 28](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=28)
- **RAO** - delegation is treated as an action that can be trained; an agent trained on medium tasks learns to recurse more deeply on hard tasks. [Lecture 5, p. 31](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=31)
- **Piet et al.** - typed programs and plans can restrict untrusted observations to data inputs rather than letting them introduce new actions. [Lecture 5, p. 32](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=32)
- **MACU** - a concrete positive multi-agent case that exposes manager quality, worker quality, parallelism, and graph-revision budget separately. [Lecture 5, pp. 35-44](https://www.cmu-agents.com/slides/lecture-05-planning.pdf#page=35)

## 5. Explanations and talk-track ideas

These are worth paraphrasing in Rajiv's voice:

- A tool call is another token sequence the model can predict. The harness parses, validates, executes, and returns the observation.
- The model proposes; external software decides whether and how to execute.
- Call a tool only when its benefit exceeds latency, cost, failure, and risk.
- A correct agent can still be unusably slow, expensive, unreliable, or unsafe.
- A plan is a proposal, not a guarantee. Interaction with the environment can invalidate it.
- With LLM agents, writing a plausible plan is easier than knowing whether the internal model of the world is correct. Check the world, verify, and recover.
- Acting changes the state the agent will encounter next. That makes feasibility, consequences, information gain, reversibility, and recovery part of planning.
- A skill is reusable knowledge about how to act; memory is saved from the agent's own interaction. An induced skill can be both.
- The question is not whether to remember more. It is what deserves to persist, in what representation, and under what maintenance rule.

## 6. Additional criteria the weekly review should track

The original five criteria are necessary but not sufficient. Future reviews should also check:

1. **Workshop mechanics** - predictions, classification exercises, decision tables, trace-reading prompts, and debrief checklists.
2. **Evaluation design** - what is held constant, what is measured, whether the result is task success or only proxy accuracy, and whether failures are operational or model-caused.
3. **Failure cases and reversals** - memorable cases where the intuitive intervention makes the agent worse.
4. **Safety and authority** - permissions, credentials, untrusted observations, irreversible actions, and who controls completion.
5. **Sequencing** - whether CMU introduces a concept earlier or through a better prerequisite chain than the workshop.
6. **Reusable implementation artifacts** - small code examples, schemas, checklists, and assignments participants can take home.
7. **Evidence quality and freshness** - sample size, held-constant variables, source type, publication status, and date sensitivity.
8. **Video production** - pacing, edits, screen demonstrations, diagrams, overlays, captions, chaptering, slide reuse, and any techniques plausibly attributable to Astra.

## Video and Astra status

As of September 8, the public schedule exposes five slide decks but no public lecture-recording links. The PDFs contain embedded or linked demonstration clips, but those are not the full course videos or talk tracks. There is therefore not enough public evidence yet to evaluate Astra's editing contribution.

When recordings appear, review them separately from slide content and report:

- what appears to be a deliberate editorial intervention;
- why it improves comprehension or retention;
- whether it transfers to a practical workshop recording;
- a concrete edit to try in Rajiv's videos;
- confidence that the technique is Astra-specific rather than normal lecture production.

## Recommended changes to the workshop

### Do now

1. Correct "schema-enforced thinking" to "schema-enforced protocol."
2. Add or adapt the four-level tool-evaluation ladder.
3. Use the compaction survival policy and drift example to sharpen Workshop 3.
4. Add the question "What observation is allowed to change the plan?" to Workshop 5.
5. Add plans-as-security-boundaries as an advanced bridge between untrusted tool results and loop control.
6. Use CMU's four-question planning checklist as the Workshop 5/6 debrief or worksheet.

### Hold for optional depth

1. ASI code-skill gains.
2. ReasoningBank failure-derived strategies and over-retrieval.
3. SAGE/AgeMem skill-reuse reward.
4. Calibrate-then-Act.
5. RAO and MACU details.

### Skip for the live workshop

1. Detailed attention architectures, position encodings, and long-context training curricula.
2. Pushdown automata and byte-level grammar-decoding implementation details.
3. Classical planning formalisms beyond the one-line idea of preconditions and effects.
4. Agent history and literature chronology.
