# Current slide-review suggestions

The preview follows Rajiv’s current 226-slide sequence, including reserves. No deletion or reordering was applied during the concise wording pass. The original pre-cut snapshot is preserved in `archive/2026-09-11-editorial-pass/`; the complete state before this wording pass is in `archive/2026-09-11-before-concise-pass/`. Embedded backup copies have been removed from the editable Markdown.

Red review notes propose cuts or flag source questions. They do not enact deletions. Speaker notes retain fuller explanations and numerical context. Rajiv’s edited Harvey result and custom-harness counterexample are preserved. The closed-harness slide now emphasizes lock-in, as requested in his latest comment. The old cut suggestion on the block he replaced with the roadmap has been removed because it no longer applies.

| Page | ID | Slide | Suggestion |
| --- | --- | --- | --- |
| [7](http://localhost:5173/s/odsc-full-visual-review?p=7) | 008 | Rise of Claude Code and Codex | Review source: verify the dated survey figures before presenting. |
| [8](http://localhost:5173/s/odsc-full-visual-review?p=8) | 009 | Harnesses from model providers | Review source: archived GitHub star counts need a dated check. |
| [16](http://localhost:5173/s/odsc-full-visual-review?p=16) | 014 | What to inspect in the saved runs | Suggested cut: The preceding exercise already establishes what to inspect; no need for a separate prompt. |
| [28](http://localhost:5173/s/odsc-full-visual-review?p=28) | 197 | Run variation and code representation in a coding study | Review relevance: retain the data if you want to discuss variation in measured results. |
| [33](http://localhost:5173/s/odsc-full-visual-review?p=33) | workshop-1-debrief | Choosing a configuration change to test | Suggested cut: Repeats the comparison instructions and trace walkthrough. |
| [34](http://localhost:5173/s/odsc-full-visual-review?p=34) | harness-improvement-method | Comparing a harness change with the baseline | Suggested cut: Overlaps with the exercise and debrief; the cache intervention gives a concrete example. |
| [36](http://localhost:5173/s/odsc-full-visual-review?p=36) | 029 | Tool design | Suggested cut: Section title overlaps with the following explanation of tools. |
| [39](http://localhost:5173/s/odsc-full-visual-review?p=39) | workshop-2-prediction | Three interfaces for the PR-review task | Suggested cut: The three conditions already appear in the exercise setup. |
| [43](http://localhost:5173/s/odsc-full-visual-review?p=43) | 031 | Tool definitions, catalogs, and discovery | Suggested cut: Overlaps with tool search and deferred-loading examples. |
| [49](http://localhost:5173/s/odsc-full-visual-review?p=49) | 196 | Initial context use with deferred tool loading | Review source: 85% conflicts with the saved 77K and 8.7K endpoints. |
| [53](http://localhost:5173/s/odsc-full-visual-review?p=53) | untrusted-tool-results | Handling instructions inside tool results | Suggested cut: your existing comment requests removing this topic; retained for your decision. |
| [55](http://localhost:5173/s/odsc-full-visual-review?p=55) | 036 | Failed browser actions consumed 21% of the saved run | Review context: identify the saved task and trace behind the browser failures. |
| [57](http://localhost:5173/s/odsc-full-visual-review?p=57) | workshop-2-debrief | When to build a higher-level tool | Suggested cut: The tool-mechanism and limits slides cover this point. |
| [59](http://localhost:5173/s/odsc-full-visual-review?p=59) | workshop-3-prediction | Comparing the three context conditions | Suggested cut: The exercise setup already describes these conditions. |
| [73](http://localhost:5173/s/odsc-full-visual-review?p=73) | 055 | System-prompt length and model capability | Suggested cut: A general premise without a result; the prompt-reduction examples are more concrete. |
| [76](http://localhost:5173/s/odsc-full-visual-review?p=76) | 047 | Choosing what belongs in the next model input | Suggested cut: Overlaps with the active-context explanation and still needs a worked example. |
| [83](http://localhost:5173/s/odsc-full-visual-review?p=83) | 061 | OpenHands reported up to 2× lower per-turn API cost | Review source: separate OpenHands and ACON results and preserve their metric definitions. |
| [103](http://localhost:5173/s/odsc-full-visual-review?p=103) | 084 | Performance regressions with skills | Review source: confirm which tested skills and baseline support this fraction. |
| [104](http://localhost:5173/s/odsc-full-visual-review?p=104) | memory-social-scope | Who can access shared memory | Suggested cut: your existing comment requests removing this topic; retained for your decision. |
| [108](http://localhost:5173/s/odsc-full-visual-review?p=108) | 095 | Reviewing guidance before saving it | Suggested cut: The saved-guidance result and revision exercise cover the same advice. |
| [109](http://localhost:5173/s/odsc-full-visual-review?p=109) | workshop-3-debrief | Deciding what to retain after the task | Suggested cut: Repeats the context distinctions and guidance exercise. |
| [112](http://localhost:5173/s/odsc-full-visual-review?p=112) | 098 | Routing choices for two tasks | Suggested cut: Overlaps with the routing exercise; could become a spoken follow-up. |
| [126](http://localhost:5173/s/odsc-full-visual-review?p=126) | workshop-4-debrief | Evidence for escalating to another model | Suggested cut: Repeats the routing-policy and verification discussion. |
| [127](http://localhost:5173/s/odsc-full-visual-review?p=127) | 114 | Verification within the agent loop | Suggested cut: A transition that can be spoken before the completion section. |
| [136](http://localhost:5173/s/odsc-full-visual-review?p=136) | 123 | Repeated model and tool calls within one request | Suggested cut: Repeats the agent-loop explanation in the introduction. |
| [139](http://localhost:5173/s/odsc-full-visual-review?p=139) | 127 | Saving progress during long tasks | Suggested cut: Overlaps with checkpointing and long-running-agent examples. |
| [140](http://localhost:5173/s/odsc-full-visual-review?p=140) | 129 | Completion criteria and external checks | Suggested cut: Repeats the completion-criteria and external-verification explanation. |
| [142](http://localhost:5173/s/odsc-full-visual-review?p=142) | 133 | Factory: independent validation and completion control | Review source: confirm the reported 90.3% result and evaluation setting. |
| [151](http://localhost:5173/s/odsc-full-visual-review?p=151) | 147 | Evaluation leakage and changes in refusal behavior | Review source: these examples come from social reports, not controlled studies. |
| [154](http://localhost:5173/s/odsc-full-visual-review?p=154) | workshop-5-debrief | Preparing the next attempt | Suggested cut: Repeats the retry policy and completion exercise. |
| [157](http://localhost:5173/s/odsc-full-visual-review?p=157) | 156 | Single agent, validator, or parallel workers | Suggested cut: Repeats the architecture choices in the exercise setup. |
| [166](http://localhost:5173/s/odsc-full-visual-review?p=166) | 174 | Conditions for dynamic workflows | Suggested cut: Overlaps with the work-boundary and handoff slides. |
| [169](http://localhost:5173/s/odsc-full-visual-review?p=169) | workshop-6-debrief | Defining the delegated task and its owner | Suggested cut: Repeats the handoff specification. |
| [171](http://localhost:5173/s/odsc-full-visual-review?p=171) | 177 | Gemini Flash with a custom harness outscored Gemini Pro | Review source: compare the task, model sizes, and budgets before making a size claim. |
| [175](http://localhost:5173/s/odsc-full-visual-review?p=175) | 002 | Engineering the Harness: A Practical Workshop | Suggested cut: Duplicate title slide, already in reserves. |
| [176](http://localhost:5173/s/odsc-full-visual-review?p=176) | 007 | Components outside the model | Suggested cut: Duplicate harness definition, already in reserves. |
| [182](http://localhost:5173/s/odsc-full-visual-review?p=182) | 045 | Context, working state, and durable knowledge | Suggested cut: Duplicates the three context categories in the main sequence. |
| [188](http://localhost:5173/s/odsc-full-visual-review?p=188) | 070 | RLM results on a million-token input task | Review source: confirm the task and baseline behind the saved 91% result. |
| [189](http://localhost:5173/s/odsc-full-visual-review?p=189) | 083 | Skill-related failures and efficiency regressions | Review source: confirm the study and denominator for the failure counts. |
| [195](http://localhost:5173/s/odsc-full-visual-review?p=195) | 092 | Three places to keep information | Suggested cut: Duplicates the context, working-state, and memory explanation. |
| [200](http://localhost:5173/s/odsc-full-visual-review?p=200) | 121 | Repeated reasoning and tool use | Suggested cut: Repeats the agent-loop introduction. |
| [206](http://localhost:5173/s/odsc-full-visual-review?p=206) | 132 | Factory: ProgramBench results | Review source: confirm the ProgramBench score and unequal budgets. |
| [211](http://localhost:5173/s/odsc-full-visual-review?p=211) | 145 | Sandboxed execution | Suggested cut: Duplicate sandbox slide. |
| [220](http://localhost:5173/s/odsc-full-visual-review?p=220) | 168 | Most tested multi-agent workflows trailed the single agent | Review source: confirm the benchmark cells and the 1.44-point metric. |
