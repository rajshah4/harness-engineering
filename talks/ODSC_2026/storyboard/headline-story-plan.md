# Harness engineering deck: headline story plan

This is the working narrative outline for `deck.md`. It focuses on the sequence of ideas and the headings that carry them. Research slides, visuals, and talk tracks can change after the story reads cleanly.

## The story

Coding agents now carry out substantial software tasks. The model chooses actions, but the harness determines what the model sees, what it can do, what persists, and what counts as finished. Provider harnesses already handle a large amount of everyday work. The interesting questions begin when we test the advice people repeat about tools, context, routing, autonomy, and multiple agents.

Some claims survive the comparison. Some reverse. Most become narrower engineering rules.

## How the talk stays interesting

The six workshops organize the material, but they do not all use the same beat. A chapter can begin with an outside claim, an audience question, a failure, a trace, or a surprising result. After a surprise, explain the mechanism while the audience wants the detail. Keep a counterexample nearby so one benchmark does not become a universal rule.

Audience participation should vary too. Ask for predictions, invite people to volunteer what they use, let pairs inspect a trace, and occasionally let the audience be right.

People will read each slide in a few seconds. Use concrete nouns, actions, and numbers in the headline. Translate research labels into plain language on the slide, and keep the paper's terminology in the source or talk track when it helps with accuracy.

## Realignment after the latest feedback

- The opening keeps its current progression. The reason to look beyond defaults is now folded into **What you can change in a harness**.

- Workshop 1 reaches the result in four slides. The measured Pi intervention now comes immediately after the workshop result. Two mechanism slides explain the cache, then the 18-point Terminal-Bench spread opens the broader benchmark evidence.

- Workshop 2 begins with one visual definition of tool design. The tool research now moves from prompt cost to an exact tool-search method, then to code-mediated orchestration and concrete failure modes.

- Workshop 3 now follows the requested ladder: context, long-context failure, retrieval, compaction, working state, and memory. Retrieval has a high-level sequence for BM25, embeddings, RAG, graph retrieval, and an empirical reversal.

- Workshop 4 makes one routing choice before the reveal, then moves from available signals to repeated attempts, escalation, and the hidden cache cost of switching models.

- Workshop 5 now has one visible control loop: define the goal, turn validation evidence into the next action, preserve that state across long work, and enforce the check outside the prompt.

- Workshop 6 reaches the debate in four slides. A volunteer question and delegation choice come before evidence that both supports and reverses the case for multiple agents.

- The close now uses two results to defend the thesis, then acknowledges that model changes can make harness workarounds obsolete. The final slide asks for one measured change.

## Opening

### Story job

Keep the current opening. Establish that provider harnesses are capable, use the YC observation to show where the market is moving, then show the decisions that remain available to inspect and change.

### Headline path

1. **Engineering the Harness: A Practical Workshop** (`001`)
2. **We have moved beyond tab completion** (`003`)
3. **Agent = model + harness** (`004`)
4. **What an agent does** (`agent-canvas-run`)
5. **What is in a harness** (`006`)
6. **Harnesses get complicated quickly** (`057`)
7. **Rise of Claude Code and Codex** (`008`)
8. **Harnesses from model providers** (`009`)
9. **Provider harnesses are a good starting point** (`010`)
10. **What you can change in a harness** (`why-alternatives`)
11. **Consequences of a closed harness** (`091`)
12. **Workshop roadmap: inside the harness** (`existing-harness-starting-point`)
### Turn in the argument

The objection is real: Claude Code and Codex already work. The workshop begins where their defaults stop matching a task, team, or requirement.

## Workshop 1: Harness choice

### Story job

Give people a reason to care about the harness. Start with one concrete comparison, then widen into evidence that the same model can behave very differently across configurations.

### Headline path

#### Workshop comparison

1. **Workshop 1: Harness choice** (`workshop-1-section`)
2. **Workshop environment and fallback path** (`workshop-setup`)
3. **Harness comparison: the same task across three systems** (`013`)
4. **Trace one decision to the harness** (`025`)
5. **Completion scores hid large differences in work** (`026`)

#### Cache side story

6. **Provider caching cut Pi's fresh input from 3.35M to 213K tokens** (`pi-cache-intervention`)
7. **Every agent turn resends the transcript so far** (`agentic-loop-transcript-growth`)
8. **Prefix caching reuses the shared transcript** (`prefix-cache-prefill`)

#### Performance and research evidence

9. **An 18-point spread with the same model** (`017`)
10. **Harnesses varied on accuracy, time, and token use** (`019`)
11. **No harness led on every measure** (`018`)
12. **DeepSeek favored a simpler harness in this comparison** (`deepseek-harness-configurations`)
13. **Snowflake's CoCo scored higher at lower cost** (`016`)
14. **Harvey reported 23.3% to 62.4% across two review setups** (`harvey-harness-result`)
15. **Harvey used a Python REPL and bounded subagents** (`harvey-harness-mechanism`)
16. **“Everyone is building a domain-specific harness”** (`domain-specific-harnesses`)
17. **A stronger model erased the hand-built agent's advantage** (`model-improvement-retest`)

#### Other harness choices

18. **Harness changes can reduce quality** (`058`)
19. **Open-source harnesses offer different starting points** (`022`)
20. **Different harnesses make different engineering choices** (`024`)
21. **Tools and feedback in SWE-agent** (`015`)
### Turn in the argument

Harnesses matter, but no harness wins every measure. Changes can help cost and process while hurting quality, and a stronger model can erase yesterday’s customization.

## Workshop 2: Tool design

### Story job

Introduce tools, put API, MCP, and CLI inside the workshop comparison, reveal the consolidated result, then explain how tool surfaces affect context, orchestration, and completion.

### Headline path

#### Workshop: three interfaces

1. **Workshop 2: Tool design** (`workshop-2-section`)
2. **A tool controls the action and the evidence** (`029`)
3. **Workshop 2: Which tool interface would you give the agent?** (`workshop-2-intro`)
4. **API, MCP, and CLI access** (`033`)
5. **PR review across three tool interfaces** (`034`)
6. **One task-shaped tool beat the terminal and a broad catalog** (`workshop-2-result`)
7. **Common tools in a coding harness** (`common-agent-tools`)

#### Tool definitions also consume context

8. **Tool definitions can fill your context** (`tools-to-context`)
9. **How to use tool search** (`tool-search-method`)
10. **Uber kept 1,000+ MCP tools behind search and the CLI** (`150`)
11. **Harness modes in DeepSeek for tools** (`deepseek-runtime-modes`)

#### Move repeated operations out of the model loop

12. **Cloudflare reduced 2,600 API endpoints to two model-facing tools** (`038`)
13. **Uber put SQL polling inside a Python loop** (`151`)

#### Interface failures and evaluation

14. **Three ways an agent can describe the same edit** (`edit-format`)
15. **An unreliable browser created two costs in one run** (`036`)
16. **A valid tool call can still leave the task unfinished** (`tool-evaluation-levels`)
17. **The tool surface should match the repeated work** (`workshop-2-debrief`)
### Turn in the argument

More tools can add capability while consuming context and creating more decisions. Task-shaped tools work when the evidence workflow is repeated and bounded. Lower-level tools remain valuable for exploration.

## Workshop 3: Context, working state, and memory

### Story job

Build a ladder: define context, show why more is not always better, retrieve selected evidence, compact old work, save resumable state, and only then discuss durable guidance and skills.

### Headline path

0. **Workshop 3: Context, working state, and memory** (`workshop-3-section`)

#### What context is

1. **What fills the next model call** (`044`)
2. **Context, task state, and reusable guidance serve different timescales** (`042`)
3. **Apply the distinction: where should the test command live?** (`041`)

#### Workshop comparison

4. **Workshop 3: Add cursor pagination** (`040`)
5. **Comparing the three context conditions** (`workshop-3-prediction`)
6. **The stale-guidance condition failed all three trials** (`workshop-3-result`)
7. **All three stale-guidance runs built the wrong module** (`workshop-3-mechanism`)
8. **Curated context changed the process, not the pass rate** (`workshop-3-reversal`)
9. **Providing better context gained 19 points** (`measured-persistent-context`)

#### Why a larger window is not enough

10. **What can fill a long context window** (`050`)
11. **A long context window does not guarantee useful recall** (`051`)
12. **Long conversations can make relevant facts harder to use** (`053`)

#### Retrieval selects the next evidence

13. **Retrieval for the next action** (`046`)
14. **Five ways to retrieve context** (`retrieval-methods`)

#### System prompts use the same budget

15. **A system prompt gives the agent standing instructions** (`055`)
16. **New models can replace old rules with judgment** (`056`)
17. **Anthropic removed over 80% of Claude Code's system prompt** (`079`)
18. **LangChain cut the base input from 6K to 2K tokens** (`059`)
19. **Workshop result: the same model saw a 4× range in context per call** (`context-budget-stack`)

#### Compaction and resumable state

20. **Five ways to manage a full context window** (`063`)
21. **Compaction replaces old turns with a continuation summary** (`summarization`)
22. **What to preserve during compaction** (`compaction-preservation-policy`)
23. **Repeated compaction can weaken an exact requirement** (`repeated-compaction-drift`)
24. **OpenHands reported up to 2× lower per-turn API cost** (`061`)
25. **ACON used failed runs to improve context compression** (`acon-compression`)
26. **Claude Code compacts without abandoning the cached prefix** (`prompt-caching`)
27. **Resuming a task from saved working state** (`064`)
28. **Saving working state in files** (`065`)
29. **Using planning to guide ongoing work** (`068`)
30. **A durable scratchpad predicted success in YC-Bench** (`066`)

#### Durable guidance and skills

31. **Saved information must be loaded before the model can use it** (`043`)
32. **A verified task lesson can become future guidance** (`071`)
33. **AGENTS.md: repository guidance for future tasks** (`073`)
34. **One test-cost warning reduced wasted full-suite runs** (`078`)
35. **The token cost of repository instructions** (`074`)
36. **Generated AGENTS.md files lowered success and raised cost** (`075`)
37. **91 of 100 files had duplicated, oversized, misplaced, stale, or unclear instructions** (`076`)
38. **Pass rates barely changed after adding repository guidance in 288 runs** (`077`)
39. **A skill loads detailed instructions only when the task needs them** (`081`)
40. **Curated skills raised average pass rate from 33.9% to 50.5%** (`082`)
41. **Some skills still reduced performance** (`084`)
42. **Evaluate a skill on the work it should improve** (`090`)
43. **Where should each lesson go?** (`workshop-3-debrief`)
44. **Only verified, stable, reusable information should survive the task** (`095`)
### Turn in the argument

More context can hurt. Retrieval, compaction, and memory solve different problems. Saved guidance earns its place only when it is verified, scoped, and useful on later tasks.

## Workshop 4: Model routing

### Story job

Introduce when routing can happen, make the audience choose, reveal the result, then narrow the rule with task risk, provider differences, escalation, and cache cost.

### Headline path

0. **Workshop 4: Flexible model choice** (`workshop-4-section`)

#### Workshop comparison

1. **A harness can choose a different model for each task or attempt** (`096`)
2. **Routing lets the harness spend capability where it matters** (`routing-benefits`)
3. **Static routing passed 12/12 at 41.5% lower cost** (`workshop-4-repeated-result`)

#### Signals and configuration

4. **A router found a better quality-cost point than one fixed model** (`099`)

#### Attempts and escalation

5. **Routing can choose another attempt instead of a stronger model** (`109`)
6. **Different models spend the harness budget differently** (`111`)
7. **Execution feedback can improve the next routing decision** (`106`)
8. **Escalation is useful only when the signal is trustworthy** (`107`)

#### Hidden cost and decision

9. **Switching models can trade away cache reuse** (`routing-cache`)
10. **Which evidence would make you change the model?** (`workshop-4-debrief`)
### Turn in the argument

Cheap-first works only when the harness can detect important failures. Route by risk and evidence, not a generic difficulty label.

## Workshop 5: Goals, validation, and stopping

### Story job

Make the central loop explicit: a goal defines the outcome, a check turns evidence into a progress signal, and the harness uses that signal to stop, repair, escalate, or report incomplete. Then show what must persist when this loop spans many calls or sessions.

Open with Rajiv's discovery: Claude Code's `/loop` did not click until Codex Goals exposed the same long-running-work pattern. State the implementation difference, then use it to motivate the need for a validation signal.

### Headline path

0. **Workshop 5: Goals, validation, and stopping** (`workshop-5-section`)

#### The progress loop

1. **A useful goal loop records six things** (`goal-validation-loop`)
2. **AutoResearch keeps a change only when the metric improves** (`140`)
3. **Does this request need a code change?** (`115`)
4. **Define done before the agent starts editing** (`acceptance-check-contract`)
5. **Validation added cost when the first result already passed 8/8** (`workshop-5-ceiling`)
6. **Validation found two repairs, but Pi still stopped at 6/9** (`workshop-5-repair-cost`)
7. **Validation decides whether to finish, repair, escalate, or stop** (`verifier-next-action`)

#### When persistence becomes drift

8. **One request can contain hundreds of progress decisions** (`123`)
9. **GPT-6 Astra showed that a software factory can run without making progress** (`armin-factory`)
10. **A goal needs quality checks and a kill switch** (`goal-quality-kill-switch`)
11. **Long runs can lose the goal even when each step is simple** (`067`)
12. **Durable goal workflows survive interruptions and restore state** (`118`)

#### Make evidence control the run

13. **An evidence gate blocks completion until the required proof passes** (`135`)
14. **Define the validation contract before the agent writes code** (`142`)
15. **Fresh evidence gates completion** (`fresh-evidence`)
16. **A failed check should change the next attempt** (`134`)
17. **A passing test is not enough to ship code** (`validation-ladder`)

#### Result and debrief

18. **The evidence and remaining budget determine the next move** (`workshop-5-debrief`)
### Turn in the argument

A durable goal can keep an agent moving after the work stops improving. The harness must measure behavior and code quality, cap the run, and preserve enough evidence for a person to review the result.

## Workshop 6: Multi-agent systems

### Story job

Begin with the coordination decision, compare delegation patterns, then use evidence to show when parallel work earns its communication and synthesis cost.

### Headline path

0. **Workshop 6: Multi-agent systems** (`workshop-6-section`)

#### Workshop decision

1. **Another agent adds capacity and a coordination bill** (`154`)
2. **Where have multiple agents helped or hurt your coding work?** (`160`)
3. **Which task would you delegate?** (`155`)
4. **Parallelize independent investigations; keep shared edits with one owner** (`157`)

#### Evidence for and against

5. **Parallel research improved 90.2% when the searches were independent** (`167`)
6. **Splitting a large tool catalog helped smaller models but hurt GPT-5** (`162`)
7. **With an equal reasoning budget, one agent usually matched or beat the group** (`169`)
8. **Multi-agent results ranged from an 81% gain to a 70% loss** (`172`)

#### Coordination mechanism

9. **Shared code became harder to merge as more agents joined** (`170`)
10. **Factory serializes code changes and parallelizes read-only work** (`171`)
11. **Another agent earns its cost when the handoff is explicit** (`175`)
### Turn in the argument

Parallelism helps separable work. Shared state, synthesis, and verification can erase the gain.

## Close

### Story job

End with evidence that harnesses can change outcomes, then turn the argument into one measured change the audience can make next.

### Headline path

#### Evidence for the thesis

1. **Six decisions shape how the agent works** (`closing-six-decisions`)
2. **Two harness settings raised ARC-AGI-3 from 13.3% to 38.3%** (`020`)
3. **A learned harness raised Opus 4.6 from 74.7% to 76.4%** (`177`)
4. **Harness-R1 gained 9.3 points while the task model stayed frozen** (`179`)

#### The reversal and next action

5. **The harness and runtime accumulate technical debt around the model** (`027`)
6. **OpenHands and OpenCode each merged about 5,700 PRs in one year** (`028`)
7. **Model changes can make harness workarounds obsolete** (`103`)
8. **One harness change, measured against the baseline** (`closing-next-change`)
### Turn in the argument

Harness engineering is an experimental discipline with a maintenance cost. Observe a failure, change one decision, and keep the change only when the evidence transfers. Recheck it when the model or workload changes.

The Safety slides follow in the reserves. They remain available for questions without interrupting the close.
