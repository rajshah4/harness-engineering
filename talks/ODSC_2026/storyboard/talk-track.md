# Workshop talk track

[Slide deck](deck.md)

Notes are grouped by stable slide ID, in deck order.

## 001 — Engineering the Harness: A Practical Workshop

Supporting detail retained from the prior draft:
Rajiv Shah · OpenHands

Tools, context, model routing, completion, and coordination.

We will inspect real runs and change the parts that control how an agent works.

## 003 — Coding agents carry out tasks beyond code suggestions

Supporting detail retained from the prior draft:
Autocomplete proposes code for a developer to accept. A coding agent can work through a request by reading files, editing code, running tools, and checking results.

Cursor’s chart shows agent requests overtaking accepted autocomplete suggestions in its product.

## 004 — The model and the harness

Supporting detail retained from the prior draft:
The model reads the current input and requests an action.

The harness assembles that input, exposes tools, runs the requested action, and returns its result.

That cycle continues until the work is complete or the run stops.

## agent-canvas-run — One turn through the agent loop

Supporting detail retained from the prior draft:
The harness sends the request, instructions, and available tools.

The model requests a tool call. The harness executes it and adds the result to the next input.

A trace records those requests and results so we can inspect what happened.

## 006 — What belongs in a harness

Supporting detail retained from the prior draft:
The surrounding software supplies instructions and tools, manages context, and controls execution. These are the components we will inspect and modify.

## 057 — Modern coding harnesses have many interacting components

Supporting detail retained from the prior draft:
Claude Code’s architecture includes tool execution, context management, and controls around the model calls.

This is the surrounding software we are studying. The model is one component of the complete system.

## 008 — Rise of Claude Code and Codex

Retained Rajiv’s edited title. The dated survey figures still need a primary-source recheck before delivery.

Supporting detail retained from the prior draft:
Adoption in the saved JetBrains survey comparison. Respondents could select multiple tools; percentages are not additive.

## 009 — Harnesses from model providers

Supporting detail retained from the prior draft:
Anthropic provides Claude Code, OpenAI provides Codex, and DeepSeek provides DeepSeek Harness. Each product includes choices about tools, context, and execution.

## 010 — Existing harnesses are a good starting point for everyday software tasks

Purpose: existing provider harnesses are already useful for everyday software tasks. Start with them and examine task-specific improvements. The old DeepSeek numbers compare different models inside a shared evaluation harness and cannot rank branded products. They remain in the archived original record. The replacement evidence is an internal observational result, not a controlled productivity estimate or task-success rate.

Supporting detail retained from the prior draft:
Claude Code and Codex already support feature implementation, bug fixes, refactoring, and tests in existing repositories.

Anthropic reported 67% more merged pull requests per engineer per day after adopting Claude Code. This was an internal observation, with engineers still reviewing and validating the work.

You can start with these existing tools. In this workshop, we will examine when changing their tools, context, routing, or completion checks helps with your particular task.

## 011 — Why look beyond a provider’s default harness?

Supporting detail retained from the prior draft:
Claude Code or Codex can be your starting point. You still need to understand what happens when a run misses a requirement, repeats work, or uses more tokens than expected.

Harness engineering means inspecting those runs and changing specific choices, such as the information a tool returns, when context is compressed, or how completion is checked.

## why-alternatives — What you can change in a harness

Consolidates the definition, provider choices, alternatives question, and six-part roadmap. Provider harnesses supply defaults for all these decisions; the workshop examines them directly.

Supporting detail retained from the prior draft:
Tools: available operations, arguments, and returned information.

Context: instructions, retrieved files, memory, and compaction.

Models: provider, model selection, and reasoning settings.

Control: verification, retries, stopping, and delegation.

## 091 — Consequences of a closed harness

The original Sarah Wooders post is linked by the LangChain article. Attribute the argument rather than treating open source as a guarantee of portability.

Supporting detail retained from the prior draft:
[This is really about closed versus open harnesses and being locked in - the purpose of this slide is for people early on to be wary of an harness that locks you in.]

LangChain highlights a practical dependency: the way a harness stores and loads memory affects what you can reuse when you switch tools.

Workspace files can be inspected and versioned. Provider-managed state depends on the available export and loading behavior.

Check whether your instructions, summaries, and task state can move with you before building a workflow around them.

## workshop-setup — Open the workshop environment

The existing quickstart is the installation authority. Do not invent an event-specific hosted Canvas URL or claim the warmup has a saved trace. The fallback is the actual incident trace in the next section.

Supporting detail retained from the prior draft:
Open the workshop quickstart and complete Agent Canvas onboarding.

Check the workspace, model, and provider before starting a conversation.

Run the repository-search warmup. Inspect the first tool request and its returned result.

If setup is incomplete, use the saved trace for the walkthrough.

## 013 — Compare the same task across harnesses

Prepared-run walkthrough, not a promise that the long campaign runs live in the room. The saved campaigns include differing calibrations; name the selected campaign and configuration when presenting.

Supporting detail retained from the prior draft:
Task: build an Incident Operations Center application and check the result against the same eight requirements.

Open the saved OpenHands, Pi, and OpenCode runs. Compare their tools, model inputs, and stopping events.

Use the saved configuration records to distinguish a harness difference from a model or environment difference.

## 014 — What to inspect in the saved runs

Supporting detail retained from the prior draft:
Inspect the first useful repository evidence and the tool call that returned it.

Compare model calls, context per call, and the final verifier result.

Check the saved configurations before attributing differences to the harness.

## 015 — Tools and feedback in SWE-agent

Supporting detail retained from the prior draft:
SWE-agent describes an interface designed for the model, with tools for acting on the repository and feedback for the next step.

## 017 — Same model, but varying performance depending on the harness

Supporting detail retained from the prior draft:
The saved Terminal-Bench comparison reports an 18-point spread across five harnesses using the same model.

Use it to examine the surrounding tools and execution policies. A benchmark score alone does not identify which change explains the difference.

## 019 — Same model and varying completion, process quality, and cost across harnesses

Supporting detail retained from the prior draft:
The saved comparison reports completion alongside process quality and cost. Inspect each measure separately before deciding which run better meets the task requirements.

## 018 — Same model across seven different harnesses

Supporting detail retained from the prior draft:
OpenBench ran the same model across seven harnesses. No configuration led on every measure.

Choose the outcome you need, then inspect the cost of reaching it. Keep task completion separate from the number of tokens processed.

## deepseek-harness-configurations — Simpler harnesses are better for DeepSeek V4

Supporting detail retained from the prior draft:
The reported scores vary by 8.7 percentage points on DeepSWE and 6.5 on Terminal-Bench. The same DeepSeek model runs inside each harness; this is not a comparison of their default models.

## 016 — Snowflake's CoCo scores higher and is cheaper

Supporting detail retained from the prior draft:
In the saved Data-Eng-Bench figure, Snowflake CoCo with Opus 5 has higher pass@1 and lower cost per trial than Claude Code with Opus 5.

The GPT-5.6 Sol comparison shows the same direction. The Sonnet 5 comparison is roughly tied on pass rate.

The result motivates testing a custom workflow for the task, rather than assuming every customization helps.

## harvey-harness-result — Harvey's Harness: Performance rose from 23.3% to 62.4%

Vendor-reported, LLM-judged result with fixed Qwen3.6 subagents; not an equal-compute comparison.

## harvey-harness-mechanism — Harvey Harness secrets

The workshop question is what failure justified this design, and what evidence would show that the change helped. Inspect coverage and the final memo together, then check the resource cost. These subagents have no tools or REPL. Training is separate: the Qwen root improved from 29.9% to 63.0% within the RLM harness, not as a step after the seven-model average. Keep training in optional discussion.


Use the original Figure 5 with these explanations visible, rather than substituting the earlier imported page that omitted them.

Supporting detail retained from the prior draft:
A root agent delegates document reviews through a Python REPL.

Subagents return findings as variables. The root prints selected findings into its context and combines them into a diligence memo.

This separates the document-reading work from the final synthesis.

## model-improvement-retest — Hand crafted harnesses can lose

Purpose in the story: counterpoint to the preceding custom-harness examples. A human-designed workflow can underperform a general coding harness with a stronger model. With GPT-5.6 Sol, Codex has higher accuracy than the human-designed agent on both TAG-Bench and DAB. Do not claim that every model comparison favors Codex: o3 on TAG-Bench does not. Do not claim lower token use on both benchmarks. TAG-Bench uses a partial Agentar reconstruction, so retain that qualification with the source. Codex itself is a harness. This is a comparison of workflows, not a model without a harness versus a harness. The point is the observed disadvantage of the custom workflow here, not generic advice to retest updates.

## 058 — Harnesses can have issues

Supporting detail retained from the prior draft:
Anthropic’s postmortem describes a lower default reasoning setting, unintended removal of thinking blocks, and a prompt edit aimed at shorter responses. Preserve the distinction between the three changes when explaining the reported quality regressions.

## 197 — Open-source harness options

Supporting detail retained from the prior draft:
These projects provide different starting points for coding workflows. Compare the tool interface and execution model with the work you need to support.

## 025 — Let's trace one decision to the harness

Actual selected events from the August 24 incident run; intermediate edits are omitted. The selection is a trace walkthrough, not a complete execution diagram.

Supporting detail retained from the prior draft:
Follow a recorded request, tool action, observation, and completion event.

For each event, identify what the model requested and what the harness executed.

Then locate a configuration choice you could change: the tool interface, input context, or stop rule.

## 026 — Compare harness cost and quality

Retains the original result figure and its units. Provider tokens include cached input; do not relabel them as a dollar bill.

Supporting detail retained from the prior draft:
Incident Operations Center: inspect verified requirements alongside model calls and token use. Similar final scores can involve different amounts of work.

## workshop-1-debrief — Choosing a configuration change to test

Supporting detail retained from the prior draft:
Hold the task, model, environment, and verifier fixed. Inspect where the traces diverge, then choose one harness setting to test.

The measured runs show different paths and costs. Recheck the result on another task.

## harness-improvement-method — Comparing a harness change with the baseline

Supporting detail retained from the prior draft:
Inspect a failure in Agent Canvas, change one configuration choice, and repeat the task. Record verified outcomes, wall time, retries, and provider cost when available. Separate fresh input from cached input.

## pi-cache-intervention — Pi rerun: fresh input fell from 3.35M to 213K tokens

Supporting detail retained from the prior draft:
Pi sent no cache markers. In the rerun, `cacheControlFormat: "anthropic"` enabled provider cache reads.

Both runs made 89 model calls. Fresh input fell from 3.35M to 213K tokens; 94.5% of rerun input came from cache.

The checks differed, 7/8 versus 6/8. These separate trajectories do not establish a quality effect from caching.

## 029 — Tool design

Supporting detail retained from the prior draft:
A tool defines what the model can request and what information comes back. We will compare three ways to expose the same PR-review work.

## 030 — What a tool exposes to the model

Supporting detail retained from the prior draft:
A tool definition describes an operation and its arguments. The implementation performs that operation and returns information the model can use.

For a pull-request review, a tool might return one file, a patch, or the evidence for the whole review.

Those choices determine how much retrieval and coordination the model must do.

## 034 — Let's explore tool usage

Supporting detail retained from the prior draft:
Task: inspect OpenHands PR #16860, explain the changes and validation, and cite the GitHub evidence.

Compare terminal/API access, a catalog of 12 GitHub operations, and one tool that gathers the review evidence.

The model, task, and scoring rubric stay fixed. Inspect the saved runs before trying the bundled tool.

## workshop-2-prediction — Three interfaces for the PR-review task

Supporting detail retained from the prior draft:
Broad catalog: choose among individual GitHub operations.

Terminal plus API: construct commands and requests to retrieve evidence.

Task-shaped tool: request the recurring evidence bundle in one call.

Compare elapsed time, tool calls, and evidence quality after inspecting the runs.

## workshop-2-result — The bundled PR tool returned full evidence in less time

Keep the four primitive MCP tool condition in the source notes. The runs were grouped by condition rather than fully interleaved; this is a workshop demonstration.

Supporting detail retained from the prior draft:
Same PR-inspection task and Claude Sonnet 4.6. Medians across three fresh trials per condition.

## workshop-2-mechanism — One bundled tool handles the repeated retrieval steps

Supporting detail retained from the prior draft:
The broad catalog required separate retrieval of PR metadata, files, patches, and validation evidence.

The bundled tool performs that recurring procedure and returns a bounded result with citations. The model no longer chooses each individual retrieval request.

In the measured run, the agent finished with two model calls and one tool call. The underlying API work still happened inside the tool.

## workshop-2-reversal — Reusable tools for recurring investigations

Supporting detail retained from the prior draft:
A reusable tool fits a recurring investigation with a predictable evidence bundle. Keep access to individual operations or a terminal for unfamiliar investigations and exceptions.

## 031 — Tool definitions, catalogs, and discovery

Supporting detail retained from the prior draft:
Structured definitions describe the tool name, arguments, and result.

MCP servers and connectors make tools reusable across applications.

As catalogs grow, search and deferred loading let the agent request relevant definitions when needed.

## 033 — API, MCP, and CLI access

Supporting detail retained from the prior draft:
An API defines the service request and response.

An MCP server exposes callable tools through a shared protocol. A CLI exposes commands through the terminal.

Both an MCP tool and a CLI can call the same API. Compare the actual operations and results, not just the interface label.

## edit-format — Editing tools: three representations

Illustrative failure modes, not a claimed controlled ranking of edit formats.

Supporting detail retained from the prior draft:
Whole-file rewrite: simple output format, but unchanged content must be reproduced.

Search and replace: return the old and new text; missing or ambiguous matches need recovery.

Patch: describe local changes; a stale context can prevent application.

Inspect failed edits and retries when choosing the interface.

## deepseek-runtime-modes — A capable harness does not need to expose every capability on every run

Supporting detail retained from the prior draft:
DeepSeek offers both a two-tool Minimal mode and modes for broader workflows or creating new plugins.

## 150 — Uber loaded tool definitions when needed

Supporting detail retained from the prior draft:
A large tool catalog consumes input tokens before any tool runs.

Uber used tool search to find relevant tools without loading every full schema into the initial prompt.

This reduces initial schema overhead; the agent still has to discover and use the right tool.

## 196 — Initial context use with deferred tool loading

Supporting detail retained from the prior draft:
In the saved five-server example, Tool Search deferred most definitions. The notes report initial tool context falling from about 77K to 8.7K tokens.

Relevant tools still need to be discoverable. Definition size alone does not measure the complete cost of using a tool.

The original 85% callout and the rounded token endpoints disagree. Confirm the source before quoting a percentage.

## 038 — Cloudflare: calling APIs through a program

Supporting detail retained from the prior draft:
Cloudflare’s saved example contrasts 2,600 endpoint schemas, about 1.2M tokens per request, with supplying documentation and executing a generated JavaScript program in V8 isolates. The program performs intermediate operations without a model call for each one.

## 151 — Uber moved repetitive polling out of the model loop

Supporting detail retained from the prior draft:
A program can make repeated requests, poll a job, or filter results without asking the model to choose each step.

Uber moved repeated polling into code. The model received the useful result rather than every intermediate poll.

Tool discovery reduces definitions in context. Batching reduces model turns. They solve different problems.

## 205 — Costs differed by 139 times for one model across harnesses

The strictly paired MCP/CLI ratios span 0.43 to 29. Keep the large spread as an observation about whole configurations; do not invent a causal mechanism.

Supporting detail retained from the prior draft:
Researchers ran six Git operations across seven harnesses and five models. Even CLI-only runs differed substantially in cost.

For one local 27B model, cost differed by a factor of 139 across harnesses, although every configuration completed the task.

The comparison does not isolate one setting responsible for that spread. It is not evidence that MCP always costs more.

## untrusted-tool-results — Handling instructions inside tool results

Supporting detail retained from the prior draft:
A page or tool response can contain instructions written by someone outside the task. Treat that content as evidence and validate requested actions against the user’s instructions and allowed operations.

## 035 — PR review: the tool calls in two saved runs

Supporting detail retained from the prior draft:
Broad catalog, trial 1: `get_pull_request`, `list_pull_request_files`, `list_pull_request_commits`, then 12 calls to `get_file_at_revision`.

Bundled tool, trial 1: one `get_pull_request_evidence_bundle` call returned the review evidence and citation URLs.

These are actual call sequences: 15 calls versus 1. The result table on the next slide reports medians across three trials, not just these runs.

## 036 — Failed browser actions consumed 21% of the saved run

Supporting detail retained from the prior draft:
The saved run included 14 browser schemas on every model call. It attempted 17 browser actions, most of which failed.

The working notes attribute about 335 seconds, or 21% of wall time, to browser work.

The task and failure trace need to accompany these numbers before drawing a lesson about tool selection.

## tool-evaluation-levels — A valid tool call can still leave the task unfinished

Supporting detail retained from the prior draft:
Did the model choose the right operation and supply valid arguments?

Did the returned information support its next action?

For the PR task, did the final explanation actually cite evidence for the change and validation? A successful API response does not answer that question.

## workshop-2-debrief — When to build a higher-level tool

Supporting detail retained from the prior draft:
Add a higher-level tool when it compresses a recurring evidence workflow into one bounded, reliable action. Keep primitives for exploration and exceptions.

The three-trial result is a teaching demonstration. A publishable comparison should interleave the conditions and test more tasks.

## 040 — Context exercise: add cursor pagination

Supporting detail retained from the prior draft:
The repository already supports page-number pagination. Add cursor pagination while preserving the old API.

Compare no saved guidance, 620 words containing a stale architecture rule, and 100 words of current guidance.

Use the same starter repository, Sonnet 4.6, and external checks. Inspect what each run implemented.

## workshop-3-prediction — Comparing the three context conditions

Supporting detail retained from the prior draft:
Compare no saved guidance, save-everything guidance, and curated guidance on the pagination task.

Inspect what each condition tells the agent about the repository. Then compare external correctness checks, elapsed time, processed tokens, and code changes.

## workshop-3-result — The stale-guidance condition failed all three trials

Supporting detail retained from the prior draft:
Same pagination task, starter repository, model, and external verifier. Three fresh trials per condition.

## workshop-3-mechanism — The agent followed the stale architecture rule

Supporting detail retained from the prior draft:
The current design required `CursorPage` in `toyapp.pagination`. The old guidance said to create `toyapp/cursor.py`.

All three runs with the stale guidance used the wrong module. Their own tests passed; the external contract failed.

No guidance and current guidance both passed 3/3. Current guidance also produced the requested focused-then-full test sequence.

## workshop-3-reversal — Curated context improved the process, not the outcome

Supporting detail retained from the prior draft:
Curated guidance and no guidance both passed 3/3 external checks, with overlapping token and time ranges. The curated runs followed the focused-then-full verification sequence. The no-guidance runs skipped the full suite.

## measured-persistent-context — Providing better context gained 19 points

Our stale-context experiment gives us a reason to be selective. Here, targeted instructions helped on later queries. The authors used 12 development queries and 42 held-out queries in the same environments, freezing the context before evaluation. That tests reuse across queries, not transfer to unfamiliar databases.

Supporting detail retained from the prior draft:
In this study, accuracy-focused context gained 19 percentage points. Schema-focused context reduced exploration but hurt accuracy.

The context was frozen before evaluation on held-out queries in the same environments. This tests reuse across queries, not unfamiliar databases.

## 041 — Where to save a repository test command

Supporting detail retained from the prior draft:
Suppose you have verified the repository’s test command.

For this run, include it in the current input. To resume unfinished work, record it in the task checkpoint. If future tasks need the same command, place it in repository guidance.

Saving the command and loading it into a later model call are separate steps.

## 042 — Context, task state, and reusable memory

Supporting detail retained from the prior draft:
Active context: the input the model can read now. Example: a failing pagination test.

Task state: saved progress needed to resume this job. Example: what was changed and what remains to test.

Reusable memory: guidance for later jobs. Example: the repository’s current test command.

Saved information helps only after it is loaded into a model call.

## context-state-hierarchy — Prime Agent’s approach to storing context and state

Supporting detail retained from the prior draft:
Prime Agent separates active model input from a programmable working layer and durable files or skills.

An agent can work with stored information without placing all of it in every model call. It selects what to read or print next.

This is one harness design for managing access and persistence, not a required architecture.

## 044 — What enters the next model call

Supporting detail retained from the prior draft:
The model sees the input assembled for this call: instructions, selected files, tool definitions and results, and conversation history.

Files and past events outside that input are not automatically visible. The harness must retrieve or load them when needed.

## tools-to-context — Tool calls compete for space in the context window

Supporting detail retained from the prior draft:
Tool definitions and results share the input budget with files, instructions, and conversation history. Keep unused definitions outside the current call and load relevant ones when needed.

## 050 — What can fill a long context window

Supporting detail retained from the prior draft:
A 500-page PDF, a 20,000-row dataset, or a repository with 100,000 lines can produce a large input.

Token use depends on the content and its representation. Decide what the next action needs before loading the entire artifact.

## 051 — A long context window does not guarantee useful recall

Supporting detail retained from the prior draft:
The context limit tells you how much input fits. It does not guarantee that the model will use every relevant detail accurately.

In long tasks, inspect which files and results are loaded, where the needed information appears, and whether old material can be retrieved later.

## 053: Long conversations can make relevant facts harder to use

Laban and colleagues tested the same work in two forms: one fully specified request and a multi-turn conversation that revealed the requirements gradually.

Across 15 models, the multi-turn condition performed worse on average. The important failure pattern was not simply forgetting. Models committed to early assumptions, produced premature answers, and struggled to recover when later turns changed the picture.

That is why a larger window is not enough. The harness still has to decide what evidence matters now.

## 046 — Retrieve the information needed for the next action

Supporting detail retained from the prior draft:
For a pagination bug, read the failing test, the implementation, and the caller that depends on it.

Search selects relevant material from a larger repository. The returned excerpts become part of the next input.

This avoids loading every file and gives the model a concrete basis for the edit.

## retrieval-methods: Five ways to retrieve context

BM25 is text search. It is strong when the query contains exact symbols, error messages, or unusually specific terms.

Embeddings are semantic search. They can find a relevant passage even when it uses different words from the query.

RAG is the system around retrieval. It chunks documents, searches an index, ranks the results, and loads selected evidence before generation.

GraphRAG adds relationships. It can follow calls, imports, entities, and dependencies that are hard to recover from text similarity alone.

Agentic search turns retrieval into a loop: plan a search, inspect the results, revise the query, and search again. It can use BM25, embeddings, RAG, and graph traversal as tools rather than treating them as competing choices.

## 055: A system prompt gives the agent standing instructions

A system prompt tells the model what product it is operating inside and how to behave across the conversation. In Claude Code, that includes tool guidance, safety rules, and information about the working environment.

The chart shows the kinds of standing instructions that can accumulate: safety, behavior, identity, style, factual context, and tool guidance. A user prompt supplies the current task. CLAUDE.md adds project guidance alongside the system prompt.

## 056: New models can replace old rules with judgment

This example comes from Thariq Shihipar at Anthropic. Older Claude Code models needed a blunt instruction to avoid writing comments. Claude 5 can instead read the surrounding code and match its style.

So yes, the rule can disappear as the model improves. I would describe that as the new model having better judgment, rather than claiming that the exact prompt has been incorporated into the weights.

## 079: Anthropic removed over 80% of Claude Code's system prompt

This claim comes from Thariq Shihipar at Anthropic, not Boris Cherny. Anthropic reported removing over 80% of the Claude Code system prompt for Opus 5 and Fable 5 with no measurable loss on its internal coding evaluations.

The article gives a concrete example. Older models needed strict rules about comments. The newer prompt tells Claude to match the surrounding code and use judgment.

## 059: LangChain cut the base input from 6K to 2K tokens

LangChain tested the same idea in Deep Agents v0.7. The team removed its general base prompt, shortened built-in tool descriptions by 43%, and made todo planning optional after evals.

Those are three different parts of context: standing instructions, tool definitions, and planning middleware. Together they cut default base input from about 6K to 2K tokens. That number does not include conversation history. Overall reward held steady across the four models they tested, although the token and cost results differed by model.

## context-budget-stack: Workshop result, the same model saw a 4× range in context per call

Now we return to our workshop runs. We held the model constant at GLM-5.2 and all three harnesses passed eight of eight tasks. Pi averaged 6.7K input tokens per call, OpenCode 12.3K, and OpenHands 26.8K.

That does not make the smallest input universally best. It shows how much context assembly differs even when the model and pass result match.

## 063: Five ways to manage a full context window

This is the decision slide. Continue when the current history is still useful. Rewind when the work took a bad turn. Clear when the old task is no longer relevant. Compact when the task continues but the transcript is crowded. Use a subagent when a bounded piece of work can happen in a separate context.

These controls do different things. They are not five names for summarization.

## summarization: Compaction replaces old turns with a continuation summary

In this illustrative pagination example, the raw tool calls and discussion are replaced in the active input by a continuation record. It keeps the task, what has been completed, current evidence, and the next action.

The original trace can remain available for inspection. Compaction changes what enters the next model call; it does not have to delete the audit history.

## compaction-preservation-policy — What to preserve during compaction

Supporting detail retained from the prior draft:
Keep the goal, exact constraints, changed files, test results, and next action.

Store bulky output where it can be retrieved. A file reference is useful only if the next session can access it.

Discard repeated logs from the active input, while retaining the original trace for inspection.

## repeated-compaction-drift: Repeated compaction can weaken an exact requirement

Supporting detail retained from the prior draft:
The CMU example starts with an exact CUDA 12.4 requirement. Later summaries weaken that detail.

Compare each summary with the original request. Keep version numbers and other exact constraints in a stable record.

This is an illustrative example, not a measured failure rate.

## 061: OpenHands reported up to 2× lower per-turn API cost

Now we move from the mechanism to a measured benefit. On the tested SWE-bench Verified subset, the baseline cost per turn kept rising and crossed four cents. With the context condenser, cost stayed around two cents per turn.

The solve rate was similar: 54% with condensation and 53% without it. This is a per-turn API cost result, not a claim that every task costs half as much.

## acon-compression: ACON used failed runs to improve context compression

ACON is a separate result with a different metric. The researchers compared runs that failed with compression against runs that succeeded without it. They used the differences to refine the compressor instructions about what information to preserve.

Across AppWorld, OfficeBench, and Multi-objective QA, the authors reported 26–54% lower peak token use and better task success than other compression baselines.

Peak token use is the largest context held at one time. It is not the total number of tokens processed and it is not the API bill. Keep those measurements separate.

## prompt-caching: Claude Code compacts without abandoning the cached prefix

There is a subtle cost trap. If the harness sends a separate request with a new system prompt and new tools just to ask for a summary, the provider cannot reuse the original cached prefix.

Claude Code uses what Anthropic calls a cache-safe fork. It keeps the parent request's system prompt, context, tool definitions, and history, then appends the compaction instruction. The long shared prefix remains reusable; only the new instruction must be processed fresh.

## 064: Resuming a task from saved working state

Supporting detail retained from the prior draft:
Save the objective, changed files, latest verifier result, unresolved work, and next action. On resume, check whether the saved evidence still matches the workspace.

## 065 — Saving working state in files

Supporting detail retained from the prior draft:
Store the plan and current progress in a workspace file. A later session can read and update that state without reconstructing the entire conversation.

## 068 — Using planning to guide ongoing work

Supporting detail retained from the prior draft:
LangChain’s Deep Agents uses a `write_todos` tool to record a task plan.

A saved plan makes unfinished work available across turns. The agent must update it as it learns and check that completed items have evidence.

Keep the current plan with task state, separate from guidance meant for future jobs.

## 066 — A durable scratchpad predicted success in YC-Bench

Only three of twelve models grew their starting capital, and scratchpad use was the strongest predictor of success.

This is correlation. The practical lesson is narrower: long work benefits from a durable place to record facts, decisions, and plans outside a fragile conversational thread.

## 043: Saved information must be loaded before the model can use it

Memory is outside the active model input. A retrieval or loading step selects which saved information enters a later call.

That is why saving everything is not enough. The harness still needs a rule for when to load a task note, repository instruction, or prior result.

## 071: A verified task lesson can become future guidance

A task can produce something useful beyond its final code. A verified test command or stable repository convention can help the next agent avoid rediscovering the same fact.

Keep the evidence, latest result, and unfinished work with the current task. Move the reusable lesson into repository guidance only after the run verifies it. The next slide shows `AGENTS.md` as one place to store it.

## 073 — AGENTS.md: repository guidance for future tasks

Supporting detail retained from the prior draft:
`AGENTS.md` stores project guidance that a supporting harness loads into context.

Include verified test commands, repository conventions, and architecture requirements that are hard to infer from the code.

Keep temporary progress and one-off failures in task notes. Review saved guidance when the repository changes.

## 078: One test-cost warning reduced wasted full-suite runs

Here is the value case. The opshin repository's guidance included one concrete fact: the full test suite takes more than 20 minutes.

Without repository guidance, Claude launched the whole suite 3.67 times per experimental cell. With the warning always loaded, that fell to 2.44. With selective guidance, it fell to 1.67. Wall-clock time moved in the same direction, from 2,689 seconds to 2,032 seconds.

This did not make the code more correct. It changed the process by steering the agent toward targeted tests. The authors report it as exploratory because it appeared for Claude on one repository and came from a post-hoc analysis.

That gives us a practical rule: repository guidance is most defensible when it captures a specific, verified fact that changes a recurring decision. Now we can look at what happens when the guidance becomes broad, stale, or expensive.

## 074 — The token cost of repository instructions

Supporting detail retained from the prior draft:
Repository instructions consume tokens whenever they are included in a model call. Keep the file focused on guidance that affects the work.

## 103 — Update the harness when models and tasks change

Supporting detail retained from the prior draft:
Revisit system prompts, tools, context rules, and routing when switching models or changing the workload.

Keep stable repository facts, but retest model-specific instructions and workarounds.

Version the configuration so a regression can be compared with the previous behavior.

## 075 — Generated AGENTS.md files lowered success and raised cost

Supporting detail retained from the prior draft:
The cited study reports lower task success and over 20% higher inference cost with automatically generated repository guidance.

Start with useful, verified project facts. Compare the agent’s behavior with and without the added guidance.

Avoid copying the repository into prose the agent must reread.

## 076: 91 of 100 files had duplicated, oversized, misplaced, stale, or unclear instructions

The paper calls these configuration smells. That means warning signs in AGENTS.md or CLAUDE.md, not failures the researchers proved were caused by the files.

The researchers analyzed 39 AGENTS.md files and 61 CLAUDE.md files from popular open-source repositories. Sixty-two repeated rules already enforced by a linter or formatter. Forty-two exceeded 200 lines. Thirty-five loaded specialized procedures even when a task did not need them. The other categories covered unexplained references, files that were generated once and never updated, and conflicting instructions.

## 077: Pass rates barely changed after adding repository guidance in 288 runs

The study compared no repository context, always-on AGENTS.md guidance, and selective retrieval across Claude Code and Codex. It evaluated 288 runs covering 17 tasks from three Python repositories.

Claude pass rates ranged from 53.3% to 55.6%. Codex ranged from 52.9% to 58.8%. The study did not find a measurable correctness improvement from either way of providing guidance.

The experiment covered only 17 tasks from three Python repositories. It could not rule out smaller effects or tell us what would happen with task-specific guidance designed around a known failure.

## 081: A skill loads detailed instructions only when the task needs them

A skill packages instructions, scripts, and reference material for a particular kind of work. The harness initially exposes only a short name and description. When the task matches, the agent loads the detailed `SKILL.md` and reaches for references or scripts as needed.

Use repository guidance for shared project facts and skills for procedures needed only on some tasks.

## 082: Curated skills raised average pass rate from 33.9% to 50.5%

SkillsBench compared the same tasks with and without curated skills. Across 87 tasks, eight domains, and 18 model-harness configurations, average pass rate rose from 33.9% to 50.5%. Every configuration improved, but the size of the gain ranged from 4.1 to 25.7 percentage points.

## memory-social-scope — Who can access shared memory

Supporting detail retained from the prior draft:
QM separates memory for individuals and shared rooms. Before retrieving a saved fact, determine whose information it is and where it may be used.

## 090 — Evaluate a skill on the work it should improve

Supporting detail retained from the prior draft:
Run representative tasks with and without the skill. Inspect completed work, tool behavior, time, and cost.

A useful skill prevents a recurring failure or supplies a procedure the agent needs. More instructions are not automatically better.

## workshop-3-debrief: Where should each lesson go?

Ask for volunteers before revealing the destinations.

A is a verified repository fact, so it belongs in `AGENTS.md`. B is a reusable procedure needed only for pagination work, so it can become a scoped skill. C is temporary progress and belongs in the current task note. Nothing should be saved merely because the agent encountered it.

## 095: Only verified, stable, reusable information should survive the task

The destination depends on scope, but the admission rule is shared. First, verified: what current evidence says this is true? Second, stable: will it survive the next code change? Third, reusable: will it improve a decision on a future task?

If an item fails any check, keep it with the current task or discard it. This is the conclusion of the context and memory section: do not preserve information merely because the agent encountered it.

## 096: A harness can choose a different model for each task or attempt

Model choice is part of the harness policy. For the pagination repair, start economical because a focused verifier can detect failure cheaply. For the security review, start stronger because missing a requirement is harder to detect after the fact.

Ask participants to choose the starting model, verification method, and one signal that may change each route. The choice can happen before work or after new evidence arrives.

## routing-benefits: Routing lets the harness spend capability where it matters

Routing creates three possible benefits. Spend less on bounded work with cheap verification. Reserve stronger capability for tasks where omissions have asymmetric consequences. Use verified outcomes to improve later routing decisions.

Each benefit depends on a trustworthy signal. The next slides test those claims with workshop and published evidence.

## workshop-4-repeated-result — Static routing passed 12/12 at 41.5% lower cost

Supporting detail retained from the prior draft:
Four tasks, three trials per policy. Passes cover 12 runs; costs are median bills for one four-task trial.

The economical model passed rename, pagination, and the async race, but missed the required timing-safe comparison in all three security reviews. Static routing reserved the strongest model for that review. These selected tasks demonstrate a policy, not a universal task classifier.

## 099: A router found a better quality-cost point than one fixed model

Supporting detail retained from the prior draft:
The cited vendor reports 50.7% at $4.28 per attempt for a router choosing Anthropic models and reasoning levels inside Claude Code. Its benchmark uses simulated users. It does not compare harness brands.

## 109: Routing can choose another attempt instead of a stronger model

Supporting detail retained from the prior draft:
The cited comparison reports 57.8% best-of-two success for GLM-5.2 at $7.90, versus 52.7% for one Sonnet 5 attempt at $25.84.

That makes multiple attempts worth considering alongside a more expensive model. A deployed system needs a way to identify which result to accept.

This leads to the coordination question: how should you run, compare, and verify multiple attempts?

## 111: Different models spend the harness budget differently

Supporting detail retained from the prior draft:
Across 452 rollouts per model, Sonnet 5 wrote tests in 92% of runs versus 82% for GLM-5.2. First-shot success was 52.7% versus 41.2%, at 6.5 times the rollout cost. Sonnet also changed more lines and files.

## 106: Execution feedback can improve the next routing decision

Agent-as-a-Router makes the feedback loop concrete. Its verifier runs candidate code in a sandbox, records performance and cost, and puts that evidence into memory for later routing decisions.

The paper reports 62.5% average performance on its out-of-distribution agentic programming test, compared with 57.1% for always choosing Opus 4.6. This is a streaming result across later tasks, not proof that every failed attempt should switch models immediately.

## 107: Escalation is useful only when the signal is trustworthy

Supporting detail retained from the prior draft:
In the Agent-as-a-Router ablation, adding prior model-performance statistics raised the router score from 41.41 to 47.74. Adding only the task-dimension description scored 41.18. The signal needed evidence about how models had actually performed.

The cascade passed 11/12 runs at a median four-task cost of $0.628. Static routing passed 12/12 at $0.517.

The cascade escalated the async task three times and pagination once. Its judge and short initial budget determined those switches.

It did not run an external verifier after each tier. We have not tested that alternative here.

## 112 — Write the routing policy for one task

Supporting detail retained from the prior draft:
Choose the starting model and the evidence that would justify a different one.

Include verification and repeated input in the budget. Check whether a switch would lose cached history.

Inspect a saved run and identify the exact event where your policy would continue, escalate, or stop.

## 113 — Completion and elapsed time in two model runs

Supporting detail retained from the prior draft:
The saved Sonnet and GLM runs scored 7/8 and 8/8 on the verifier.

Wall time was 12.4 versus 26.7 minutes, with 4.26M versus 6.76M provider input tokens.

These are separate runs. They show a completion and resource tradeoff, not an isolated effect of a routing policy.

## routing-cache — Routing between models can lose cache reuse

Supporting detail retained from the prior draft:
Anthropic’s prompt caches are specific to a model. Switching models partway through a long conversation can require processing the history again.

Choose at a task boundary when practical, or hand a bounded subtask to another model with only the context it needs.

This is a design choice to measure against the benefit of switching, not a ban on mid-task escalation.

## workshop-4-debrief: Which evidence would make you change the model?

Supporting detail retained from the prior draft:
Specify what evidence triggers another attempt, more reasoning, a different model, or human review.

Count verification and repeated work when comparing total cost. Static routing won on cost among fully passing policies in our selected task set. The strongest model won on time. Participants should design a policy for their own constraints.

## workshop-5-section — Goals, validation, and stopping

I initially missed why Claude Code's `/loop` feature was interesting. Codex Goals made the pattern click for me.

They serve the same role in this story, but the mechanisms differ. Claude Code's `/loop` runs a prompt repeatedly while the session stays open. Codex `/goal` keeps a durable objective across turns until a verifiable stopping condition. In both cases, the harness needs a check to decide whether another pass means progress or repetition.

Sources: [Claude Code scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks) and [OpenAI, Follow a goal](https://learn.chatgpt.com/use-cases/follow-goals).

## goal-validation-loop — A useful goal loop records six things

Use this as a checklist, not a prompt template. The record needs an observable outcome, the current verified state, and one bounded next action. It also needs the check, the limits on the run, and the allowed ways to stop.

The outcome stays stable while the state and evidence change. That gives every new turn enough information to decide whether another attempt is justified.

Ask the room: which field is missing in most agent prompts they have written?

## 115 — Does this request need a code change?

Two repository variants receive the same request to fix `slugify`. One already meets the behavior and one fails a boundary case.

The goal and checks are the same. Evidence produces a different next action. In the first repository, editing would be wasted work. In the second, stopping would be wrong.

Ask for a volunteer to name the minimum evidence needed before editing either repository.

## acceptance-check-contract — Define done before the agent starts editing

Write four things before the work begins: the observable outcome, the check, the evidence to record, and the allowed terminal states.

This keeps the harness from moving the finish line after seeing the result. It also makes already-satisfied and budget-exhausted outcomes explicit instead of forcing every run into “changed code” or “success.”

## workshop-5-ceiling — Validation added cost when the first result already passed

Here is the first reversal. Independent validation is not free and it did not improve this task. The single agent already passed all eight checks. The completion system ran more work and reached the same score.

This is one campaign, not a causal benchmark. Use it to ask when the consequence of a false pass justifies the extra verifier.

## workshop-5-repair-cost — Validation found repairs but did not guarantee completion

Now the opposite result. The validator found repairable misses and Pi recovered two requirements. It still ended with three unmet requirements after spending much more.

Validation can create progress without creating success. When the budget ends, the correct result is “6 of 9, incomplete,” not a confident completion claim.

## verifier-next-action — Validation decides whether to finish, repair, escalate, or stop

Make the decision table explicit. Pass means stop with evidence. A diagnosed failure means repair and recheck. A failure with no credible path means escalate. An exhausted budget means preserve the failure and stop incomplete.

If a failed check produces exactly the same next action, the harness has not learned from the check.

## 123 — One request can contain hundreds of progress decisions

Zoom out from the workshop task. A user sees one request. The harness may run hundreds of model calls, tool actions, and observations inside it.

The goal and check are not only final-step concerns. They orient every decision in the loop and tell the harness when another turn is justified.

## armin-factory — GPT-6 Astra showed that a software factory can run without making progress

This is the failure mode the whole section needs to answer. Armin Ronacher let a GPT-6 Astra software factory manage its own workflow around one large goal. After 35 hours, about a billion tokens, roughly $1,200, 79 commits, and 75,000 net lines, he stopped it himself. He said it delivered “absolutely nothing of value.”

The run had persistence and records. It lacked a check that asked whether the code remained readable, fit CPython's conventions, or still deserved another hour. Commits and tokens showed activity while the work drifted.

Jerzy Filatow's response names the operational controls: meter the run, cap the budget, reject unreadable diffs, and require review gates. Those controls are the rest of this section.

Source: [Armin Ronacher, Astra for Coding: Why Are We Doing This Again?](https://lucumr.pocoo.org/2026/9/7/astra-why/). The run figures and assessment come from Armin. The control recommendations are our interpretation of the failure and Jerzy's response.

## goal-quality-kill-switch — A goal needs quality checks and a kill switch

Armin's run makes the distinction concrete. Hours, tokens, commits, and lines tell you that the agent is active. They do not tell you that the repository is getting better.

The continuation rule needs current evidence about behavior and code quality, plus a hard limit. When that evidence stops improving, pause the run before it spends the rest of the budget manufacturing more code to review.

## 118 — Durable goal workflows survive interruptions and restore state

Long sessions will be interrupted. Context fills, runtimes stop, and people pause the work. A durable workflow treats those interruptions as expected events.

Before the interruption, persist the goal, current progress, latest evidence, and next action. After the restart, restore that checkpoint into a fresh session and recheck the workspace before continuing. The checkpoint preserves the decision state. It does not make old evidence current.

## 135 — An evidence gate blocks completion until the required proof passes

Define the term before showing the result. An evidence gate is executable logic at the stop boundary. The agent may propose completion, but the harness accepts it only when every required outcome is backed by current, in-scope evidence.

The Evidence-Carrying Termination paper makes this concrete with a trusted contract, an evidence ledger, a proposed certificate, and a deterministic verifier. On 66 incomplete checkpoints, unsupported stops fell from 40 for the comparison controller to zero for ECT. The paper is careful about the boundary: the gate certifies trace support under its declared contract. It does not establish external truth, safety, or overall code quality.

## 142 — Define the validation contract before the agent writes code

This is the order-of-operations slide. Luke Alvoeiro argues that tests written after implementation can simply confirm the implementation's own decisions. Factory's response is to write a validation contract during planning, before coding starts, and to define correctness independently of the implementation.

The screenshot is from his Factory Missions talk. The scrutiny validator runs tests, type checks, lint, and code review. A separate user-testing validator exercises the application end to end. Neither validator is invested in the implementation.

## Reserve 136 — A retry needs a new hypothesis or a different action

A failed check should produce a diagnosis. The next attempt changes something: the edit, the evidence gathered, the model, or the escalation path.

Ask the room to distinguish a retry from a loop. If the state, hypothesis, and action are all unchanged, it is a loop.

## fresh-evidence — Fresh evidence gates completion

Put a timestamp on the logic. A passing test from before the latest relevant edit cannot support completion after that edit. A hook can enforce the rule outside the prompt by running the required check before accepting a stop.

The harness records the command, result, and state it checked. Current evidence allows completion. Missing or failed evidence sends the task back to repair.

This is a harness design synthesis, not a reported paper result. It adds recency to the earlier contract: the right test is not enough if it ran before the latest relevant edit.

## Reserve hooks — Hooks can enforce checks outside the prompt

A hook is code called at a defined event. Before accepting a stop, the harness can require a passing check produced after the latest edit.

This is stronger than another sentence in the system prompt because the rule still runs when the model forgets it.

## 134 — A failed check should change the next attempt

The implementer produces a candidate change. An independent validator checks it against requirements the implementer does not control. The harness then turns the failure evidence into the next decision.

Another attempt needs a changed hypothesis or a different action. If the state, hypothesis, and action remain unchanged, the agent is repeating itself rather than learning from the check. This is different from the prior slide: the prior slide protects the definition of done before coding; this slide governs what happens after a check fails.

## Reserve 143 — Make stable repository requirements executable

OpenAI describes a repository where architecture constraints are enforced with custom linters and structural tests. A failure message tells the agent what rule it broke and how to repair it.

The pattern is larger than coding style. Turn a stable requirement into a check the harness can run and a failure the agent can act on.

## validation-ladder — A passing test is not enough to ship code

The agent can satisfy its own tests and still leave code nobody wants to maintain. Armin found compressed tests, hardcoded constants, and code that ignored the repository's style.

For real code, the completion contract has three gates. Behavior checks cover the requested outcome. Executable repository checks cover lint, APIs, and architecture rules. Human review protects readability and maintainability when those qualities are difficult to encode.

## 067 — Long runs can lose the goal even when each step is simple

Vending-Bench makes the long-session failure concrete. Agents had simple actions such as ordering stock, setting prices, and paying fees. Over long runs, activity declined, the systems stagnated on average, and every tested model eventually stopped selling.

Do not use the prior 20-million-token claim. The paper supports the long-horizon failure pattern, not that number.

## 147 — Evaluation leakage and changes in refusal behavior

Supporting detail retained from the prior draft:
Eval leakage. Tool-mediated contamination. Harness-dependent refusals.

An Opus 4.6 report says the model recognized an eval, searched for it, found the answer key, and decrypted it.
Fireworks reports K3 refusals and defensive behavior changing with the CyberGym harness.
These are social reports, not formal studies.

Erik Schluntz | Fireworks AI

## Reserve 153 — Validation helped one workshop task and not the other

Bring the two results back together. Independent validation added work and no score on Incident. It found two repairs on Freight but still did not reach full completion.

The lesson is not “always add a validator.” It is “make completion evidence explicit, and buy more validation when the cost of a false pass warrants it.”

## workshop-5-debrief — The evidence and remaining budget determine the next move

This is a workshop synthesis, not a claim from one paper. Ask participants to choose between the two branches using the evidence in their own run.

Continue only when they can name the failed requirement, form a different and testable hypothesis, and afford the attempt. Otherwise escalate or stop incomplete. Close by asking one volunteer to state which evidence justifies another attempt and which evidence justifies stopping.

## workshop-6-section — Workshop 6: Multi-agent systems

The question for this workshop is not whether more agents sound powerful. It is whether another agent should own part of this specific task.

We will make that choice before looking at the evidence, then test our intuition against several results.

## 154 — Another agent adds capacity and a coordination bill

Every worker brings a fresh context window, another stream of tool calls, and the ability to investigate independently.

The parent still has to decide what to delegate, describe it clearly, pass the right context, collect the result, and verify the combined outcome. Those costs belong in the comparison.

Parallel execution helps only when the independent work is larger than the assignment and synthesis work it creates.

## 160 — Where have multiple agents helped or hurt your coding work?

Ask for one example where multiple agents made the work faster or more thorough. Then ask for one example where they duplicated work, conflicted, or made the result harder to trust.

Listen for task structure. Did the workers have separate scopes, or did they share files and depend on one another's unfinished work?

## 155 — Which task would you delegate?

Task A asks several workers to repair one pagination implementation. Their edits touch the same code and their decisions depend on one another.

Task B asks workers to investigate five repositories using the same evidence fields. Each investigation can finish and be checked without waiting for the others.

Ask the room to choose one agent, a worker plus validator, or parallel investigators. Keep the total budget fixed and ask who owns the final answer.

## 157 — Parallelize independent investigations; keep shared edits with one owner

Reveal the rule after the vote. The five repository investigations split cleanly because each worker can return an independently checkable artifact.

Pagination repair does not split cleanly. Multiple agents would read and change the same state, so conflict resolution and revalidation can erase the expected speedup.

This is the common ground across three practitioner accounts. Anthropic parallelizes separate research directions, LangChain recommends parallel reads but cautions against parallel writes, and Cognition argues that concurrent code changes carry implicit decisions that collide during integration.

## 167 — Parallel research improved 90.2% when the searches were independent

Anthropic reports that an Opus 4 lead with Sonnet 4 subagents outperformed a single Opus 4 agent by 90.2% on its internal research evaluation.

The diagram shows why the task fit the architecture. The lead sends different search directions into separate contexts, then combines compressed findings. One missed search does not corrupt another search.

This is a company-reported evaluation with unequal compute. Anthropic's separate 15 times token figure compares multi-agent research with ordinary chat, not with the single-agent research baseline.

## 162 — Splitting a large tool catalog helped smaller models but hurt GPT-5

Snorkel divided a large tool catalog across a planner and specialized executors. In its All Tools condition, the split improved GPT-5 Nano by 3.8 percentage points and GPT-5 Mini by 20.3 points.

The same architecture reduced GPT-5 accuracy by 7.6 points. A stronger model could already navigate the full catalog, so another routing decision created a new failure surface.

Treat this as a useful industry experiment, not a universal benchmark. The sample was limited and the analysis retained runs without API errors.

## 169 — With an equal reasoning budget, one agent usually matched or beat the group

This paper asks a cleaner question: what happens when the single-agent and multi-agent systems receive the same global thinking-token budget?

At the requested 500-token budget, a single-agent variant was best or statistically tied in six of eight model and dataset comparisons. Dividing the same budget across planners, workers, and aggregation did not create free reasoning.

The Gemini API did not always realize the requested token budget exactly. The authors disclose that artifact and also report actual usage.

## 172 — Every tested multi-agent architecture made SWE-bench results worse

This peer-reviewed study tested 260 configurations across six benchmarks. Focus this slide on the software result: across eight models, every multi-agent architecture underperformed the single-agent baseline on SWE-bench Verified.

The mean gaps were hybrid minus 1.3%, centralized minus 2.6%, decentralized minus 6.4%, and independent minus 12.8%. Independent agents also amplified trace-level errors 17.2 times in the broader experiment because no central verifier corrected them.

Keep the caveat visible: SWE-bench and Terminal-Bench used 20 tasks per model-and-architecture cell, so individual estimates have wide uncertainty. The aggregate direction is the result to remember, not false precision in one cell.

## 170 — Shared code became harder to merge as more agents joined

Anthropic placed agent swarms in a shared repository for 12 hours. Earlier models opened many pull requests but merged a smaller fraction as the group grew. Their changes frequently conflicted and were abandoned.

Newer models often reduced conflict by keeping stronger ownership of separate files. That behavior resembles our workshop rule: independent scopes are easier to combine than overlapping edits.

This experiment is more relevant to software work than the breadth-first research result because every action changes the state seen by later agents.

## 171 — Factory serializes code changes and parallelizes read-only work

Luke Alvoeiro describes Factory's practical response to shared-state conflicts. Missions runs one code-changing worker or validator at a time.

Read-only work can still run in parallel: repository search, API research, and independent review do not compete to modify the same files.

Serial execution sacrifices simple throughput, but it reduces conflicting edits, duplicated implementation, and incompatible architectural decisions.

## 175 — Design the handoff around three failure surfaces

MAST analyzed 1,642 traces from seven multi-agent systems across coding, math, and general-agent tasks. Task-failure rates ranged from 41% to 86.7% across those systems. The useful result is the taxonomy: 14 observed modes grouped into system design, inter-agent misalignment, and task verification.

Turn those categories into a delegation contract. System design means a bounded question, allowed files, budget, and stopping rule. Alignment means naming the shared state and required return format. Verification means requiring evidence and keeping one parent responsible for synthesis and the final gate.

Close by asking the room to revisit its original choice: does the expected parallel work exceed the cost of assignment, handoff, synthesis, and verification—and did we design against all three failure surfaces?

## closing-six-decisions — Six decisions shape how the agent works

Return to the roadmap from the opening. We held the model inside a system and changed six decisions around it.

The harness determines which defaults we inherit, which actions the model can request, and what information reaches the next call. It also decides how to spend the remaining model budget, what evidence counts as progress, and when another agent receives part of the work.

These decisions interact, but the engineering method remains controlled comparison: hold the task and acceptance checks fixed, change one decision, then inspect the trace and result.

## 177 — A learned harness raised Opus 4.6 from 74.7% to 76.4%

This result brings us back to the opening claim. On TerminalBench 2.0, Meta-Harness generated and selected agent configurations instead of relying on one fixed setup. With the same Claude Opus 4.6 model, it reported 76.4%, compared with 74.7% for Terminus-KIRA and 58.0% for Claude Code.

Keep the comparison narrow: 89 tasks, five independent trials per task, and one model. The result says the harness can move the benchmark without changing the underlying model.

## closing-next-change — One harness change, measured against the baseline

End with a specific action. Ask everyone to name one observed failure in a real agent run and identify the harness decision behind it.

Change one thing. Repeat the same task with the same acceptance checks. Keep the change only if the result improves and earlier behavior still works.

The workshop repository contains the exercises and examples for repeating this process.

## 176 — Pi recovered omissions, then tied the best single-agent score

Supporting detail retained from the prior draft:
OpenHands single-agent and the completion systems reached 6/9 on the corrected external score. Pi single-agent reached 4/9.

The completion systems used roughly 21–22M provider tokens and still left requirements unresolved.

Inspect which failures were repaired and which remained. More agents did not remove the need for a stopping rule.

## safety-section: Safety, control what can change the harness

The harness receives suggestions from tools, retrieved documents, and other agents. Those inputs are not automatically trusted. Safety policy determines which actions may execute and which instructions may persist into later tasks.

## memory-writers: Retrieved content should not rewrite future instructions

A web page, issue comment, tool result, or delegated agent can contain useful information, but it should not be allowed to rewrite `AGENTS.md` or a skill automatically.

Before saving an instruction, verify its source, decide its scope, and require review by someone authorized to change future agent behavior.

## harness-update-regression — Harness updates need to preserve behavior that already worked

Supporting detail retained from the prior draft:
Prime Agent can revise supplemental prompts, memories, skills, and subagent specifications. Each accepted update affects future runs.

Harness Continual Learning motivates checking gains on new tasks alongside performance on earlier tasks. Keep candidate updates separate from the accepted configuration.

Retest behavior that already worked and keep a version you can restore if an update causes regressions.

## state-independent-compute — Durable state and replaceable execution environments

Supporting detail retained from the prior draft:
QM separates conversation and durable state from the execution sandbox. A task can use a different machine while retaining its saved state.

## openjarvis-system-search — System components in OpenJarvis

Supporting detail retained from the prior draft:
OpenJarvis exposes the model, inference engine, agent logic, tools, memory, and learning as configurable components. Its evaluation must account for the benchmark mix, hardware, and cost definition.

## 020 — Two harness settings raised ARC-AGI-3 from 13.3% to 38.3%

This is the cleanest return to the talk's thesis. OpenAI held GPT-5.6 Sol fixed and changed two harness settings: it retained private reasoning across actions and replaced rolling truncation with compaction.

On the ARC-AGI-3 public task set, the reported RHAE score rose from 13.3% to 38.3% while output tokens fell by a factor of six. Keep the scope precise: this is one model, one public benchmark, and a provider-authored comparison.

## 021 — NVIDIA AVO: a kernel-optimization workflow

Supporting detail retained from the prior draft:
NVIDIA’s AVO workflow supplies CUDA information, persistent experiment history, code and shell tools, and correctness and throughput checks. A supervisor intervenes when the search stalls.

## 027 — The harness and runtime accumulate technical debt around the model

Han Lee redraws the classic machine-learning technical-debt diagram for agents. The model call is one small component. Configuration, traces, tools, serving, memory, evaluation, and monitoring surround it.

This is the cost behind the gains we just showed. Every useful harness decision creates a component that must evolve with models, workloads, and providers.

## 028 — OpenHands and OpenCode each merged about 5,700 PRs in one year

The repository analysis covers July 8, 2025 through July 8, 2026. It records 5,679 merged pull requests across the OpenHands ecosystem and 5,700 for OpenCode.

Pull-request volume does not measure technical debt directly. It does show that production harnesses remain active engineering systems after their first release.

## 037 — Retrieval tools

Supporting detail retained from the prior draft:
Embedding search retrieves by semantic similarity. BM25 retrieves by keyword matches. Agentic search uses model decisions to choose and refine retrieval steps.

## 045 — Context, working state, and durable knowledge

Supporting detail retained from the prior draft:
Active context is the information in the current model input.

Working state records progress so the task can resume.

Durable knowledge is reviewed guidance intended for future sessions.

## 049 — Long inputs in coding tasks

Supporting detail retained from the prior draft:
Repeated warnings and other large outputs can consume the space available for the task and relevant code. Inspect what the model receives after truncation or compaction.

## 054 — What would you use a 10M-token context window for?

Supporting detail retained from the prior draft:
What work would you put into a 10M-token context window?

How would you check that the model found the relevant information and used it correctly?

## 069 — Recursive Language Models and a Python REPL

Supporting detail retained from the prior draft:
An RLM uses a Python REPL to inspect a large input and call sub-models on selected parts. The full input can remain outside the root model’s context.

Each model call still has a context limit. The approach changes how the input is accessed.

## 070 — RLM results on a million-token input task

Supporting detail retained from the prior draft:
The saved RLM comparison reports 91% accuracy for RLM-GPT-5 on a million-token task where the standard GPT-5 baseline failed. Confirm the task and metric before generalizing to long-context work.

## 083 — Skill-related failures and efficiency regressions

Supporting detail retained from the prior draft:
The saved analysis counts 125 functional failures and 182 efficiency regressions associated with skills. Excessive procedure accounted for 62.6% of efficiency regressions.

Inspect whether the skill makes unnecessary steps mandatory, and test its effect on correctness and work performed.

## 086 — Skills can express procedures otherwise written as code

Supporting detail retained from the prior draft:
Some workflows can be described as a reusable skill for the agent to follow, rather than implemented as dedicated application code.

This changes where the procedure lives. Tool execution and verification still require supporting software.

## 087 — Revising a skill after a task attempt

Supporting detail retained from the prior draft:
After a task attempt, inspect what went wrong and record a reusable procedure as a skill. Test revisions on subsequent tasks before treating them as improvements.

## 088 — Task execution and updates to reusable guidance

Supporting detail retained from the prior draft:
The inner loop performs the current task. An outer update process revises prompts, skills, or memory using evidence from earlier attempts.

Evaluate those updates before applying them to future work.

## 089 — The generic skill performed best in the simulated study

Supporting detail retained from the prior draft:
206 sessions from 13 developers.

Personalized skills produced small, inconsistent gains over no skill.
A generic skill pooled across developers performed best. Personalization helped when the same preference recurred across similar tasks.
The study used an LLM developer simulator, so treat the result as promising, not final.

Huang, Du, Lan | arXiv 2608.10319

## 092 — Three places to keep information

Supporting detail retained from the prior draft:
Active context: information included in the current model call.

Working state: plans, progress, and unfinished actions.

Durable memory: guidance intended to transfer to future tasks.

## 093 — Context and memory in Claude workflows

Supporting detail retained from the prior draft:
Claude workflows include conversation compaction, project instructions, saved memory, and deferred tool loading. Each mechanism determines which information reaches a model call.

## 110 — Oracle routing: 94.2% to 97.4% in a reported comparison

Supporting detail retained from the prior draft:
FriendliAI selected the successful, cheaper trajectory after each task across GLM-5.3 and Kimi K3. This retrospective selection defines an oracle ceiling. A deployed router must choose without knowing the outcome.

## 120 — Instructions, verification, and execution controls

Supporting detail retained from the prior draft:
The execution loop combines instructions, model calls, tool results, and verification.

Plans and structured outputs guide the work. Environment checks and permissions constrain execution.

A retry policy specifies what evidence to carry into the next attempt.

## 122 — Tools in the published Opus system prompt

Supporting detail retained from the prior draft:
The published Opus system prompt lists tools for shell execution, file creation, search, and external services.

The available tool list defines possible requests. The harness still controls execution and returns results to subsequent model calls.

## 126 — Capability and reliability in agent tasks

Supporting detail retained from the prior draft:
Code-generation capability and reliable task completion are different measurements. Examine failures across the full workflow, including tool execution and verification.

## 128 — Ten independent steps with 95% success each

Supporting detail retained from the prior draft:
If ten steps each succeed with probability 0.95 and their outcomes are independent, the chance that all succeed is 0.95¹⁰, or about 59.9%.

This is an illustrative calculation, not a measured failure rate for agent workflows. Real steps can have correlated failures and recovery mechanisms.

## 130 — Defining the evaluation before model training

Supporting detail retained from the prior draft:
Fix the evaluation examples, labels, splits, scoring, and seed before comparing model changes. Check results on each required benchmark track.

## 132 — Factory: ProgramBench results

Supporting detail retained from the prior draft:
Factory’s ProgramBench comparison included single-agent work and a system with a validator and orchestrator.

The saved Fable 5 system result is a median hidden-suite score of 89.3. System conditions had much larger wall-clock budgets.

Use the comparison to examine the workflow while keeping the budget difference explicit.

## 138 — Plans and structured outputs

Supporting detail retained from the prior draft:
A plan records the intended work. A structured output schema defines the format the next step expects. Verify the work independently of whether its format is valid.

## 140 — AutoResearch keeps a change only when the metric improves

AutoResearch provides a compact positive example of a goal loop. A person writes the objective in `program.md`. The agent reads the objective and prior results, makes one change, and runs a five-minute experiment.

The metric controls what happens next. Improvement keeps the commit. Failure resets it. The harness logs either outcome and repeats until the stopping criterion is met. Progress means measured improvement, not continued activity.

## 144 — Sandboxed execution

Supporting detail retained from the prior draft:
Run agent commands in an isolated environment with access appropriate to the task. Inspect which files, credentials, and network services remain available.

## 145 — Sandboxed execution

Supporting detail retained from the prior draft:
Run agent commands in an isolated environment with access appropriate to the task. Inspect which files, credentials, and network services remain available.

## 148 — Remote access through an allowed API in a sandbox test

Supporting detail retained from the prior draft:
Prime Intellect reports one successful attempt to use an allowed Responses API to fetch remote files and recover a hidden flag. The allowed API provided a path beyond the intended offline boundary.

## 149 — Tool interfaces, feedback, and error handling

Supporting detail retained from the prior draft:
Expose understandable operations and return concise, informative feedback. Validate actions and results at the boundaries where a failure could propagate.

## 164 — Multi-agent orchestration patterns

Supporting detail retained from the prior draft:
Routing chooses a worker or model. Parallel execution handles independent work at the same time. An orchestrator assigns tasks and combines returned results.

## 165 — Orchestration written during execution

Supporting detail retained from the prior draft:
In a dynamic workflow, a model writes orchestration code and decomposes work during execution.

Workers return results at checkpoints. Define ownership, merge rules, budgets, and verification before allowing shared changes.

## 166 — Anthropic’s reported Bun port

Supporting detail retained from the prior draft:
Anthropic reports porting about 750,000 lines of Rust in its Bun example, using hundreds of agents with review and build-test repair loops.

The company said the port was not yet in production. It also reported substantially more resource use than a typical coding-agent session.

## 168 — Most tested multi-agent workflows trailed the single agent

Supporting detail retained from the prior draft:
In the saved BenchAgent comparison, one multi-agent workflow achieved a best average lift of 1.44 points. Five other tested workflows trailed the single-agent baseline on average.

Include coordination and context costs when comparing a workflow with one agent.

## 178 — Updating a harness from previous runs

Supporting detail retained from the prior draft:
Previous runs can supply evidence for changing prompts, tool interfaces, or execution policies. Compare proposed updates with the current version before accepting them.

## 179 — Harness-R1 gained 9.3 points while the task model stayed frozen

Supporting detail retained from the prior draft:
Harness-R1 reports task success increasing from 44.3% to 53.6% across WebShop, ALFWorld, and DBBench.

A separate 9B model uses failure batches to propose and validate runtime patches while the task model stays frozen. The patches target context construction, tool mediation, validation, and recovery.

This is an August 2026 preprint result.

## 180 — Optimizing prompts and memory

Supporting detail retained from the prior draft:
Prompt and memory optimization revises the input used in later tasks. Evaluate whether an update improves new work while preserving behavior that already worked.

## 181 — Reusable interaction protocols

Supporting detail retained from the prior draft:
A reusable protocol specifies how participants exchange information and what each response must contain. It makes the procedure available outside a single conversation.

## 183 — Goals, constraints, and acceptance checks

Supporting detail retained from the prior draft:
Goals describe the requested outcome. Constraints limit the allowed implementation. Acceptance checks supply evidence of completion. Save the specification so it remains available across sessions.

## Reserve 102: Shared repository instructions across tools

Keep shared build commands, test procedures, and repository conventions in one maintained file.

Use a tool-specific wrapper or supported import where loading rules differ. Check that the installed tool actually loads the shared guidance.
