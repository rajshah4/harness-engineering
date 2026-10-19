# Harness Engineering Workshop: cut-deck talk track

Synchronized October 19, 2026. 152 slides and narration entries match the live deck. Revised classroom selections are distinguished from earlier experiments; complete outcomes remain in the student package.

[Open the live deck](http://127.0.0.1:5173/s/odsc-cut-review?p=1)

<!-- Source SHA-256: d122fd9174bcb232f5b051e804069a5c0b45303a3ed022cd64c773f0a1764311 -->

## 1. The Design of Coding Agents:A Practical Workshop

[Cut slide 1](http://127.0.0.1:5173/s/odsc-cut-review?p=1)

[001] Opening

Today we’re going to look at how we build an agent around a model. We’ll start with an engine, then look at what changes when we put it to work in different environments.

By the end, I want you to have one harness decision you can test in your own system.

## 2. Toyota 2GR-FE engine reveal

[Cut slide 2](http://127.0.0.1:5173/s/odsc-cut-review?p=2)

[toyota-engine-reveal] Opening

This is a Toyota 3.5-litre V6 engine. What would you build around it?

Presenter reference: Image source: ProAuto, Toyota 2GR-FE engine product illustration: https://www.proautocorp.co.th/album/6697/oil-filter . Image URL: https://image.makewebeasy.net/makeweb/m_1920x0/WICr7yDy4/OEM/2GR_FE.png?v=202405291424 . Engine identity and vehicle applications are documented in the following comparison slide.

Build: show the engine first. Advance to reveal its name.

## 3. Toyota Camry → RAV4 → Lotus Emira

[Cut slide 3](http://127.0.0.1:5173/s/odsc-cut-review?p=3)

[toyota-lotus-intro] Opening

Versions of this Toyota engine family power a Camry, a RAV4, and a Lotus Emira. Lotus adds a supercharger, so these aren’t identical engine configurations. But the same engine family supports three very different vehicles.

Toyota knows the engine and builds complete cars. Lotus still has a reason to build a sports car around it for a different job.

That’s the argument for harness engineering. A model trained to work well with a provider’s harness gives you a reason to start there. You still have to check how well that setup fits your environment.

Presenter reference: Sources: Toyota 2GR-FE 3.5-litre V6 engine family. Camry North American V6: https://www.toyota-global.com/company/history_of_toyota/75years/vehicle_lineage/car/id60002185/index.html . RAV4 V6: https://assets.sia.toyota.com/publications/en/om-s/OM12V1QRG/pdf/2012%20RAV4.pdf and https://pressroom.toyota.com/2011-toyota-rav4-offers-new-extra-value-package/ . Lotus Emira V6 specification lists Toyota 2GR-FE and Edelbrock supercharger: https://media.lotuscars.com/en/models/emira.html . Shared engine family, not identical complete engine configurations. Photographs: Carvana 2011 Camry LE V6 listing https://www.carvana.com/vehicle/4097353 ; MotorTrend 2011 RAV4 Limited V6 road test https://www.motortrend.com/reviews/2011-toyota-rav4-limited-v6-first-test ; Lotus Cars official Emira launch.

Build: reveal Camry, then RAV4, then Lotus. Only vehicle images and names are visible. Toyota and Lotus specifications support the engine-family analogy; Lotus adds supercharging and its own integration.

## 4. Agent = model + harness

[Cut slide 4](http://127.0.0.1:5173/s/odsc-cut-review?p=4)

[agent-anatomy-whitenack] Opening

Here’s how we’ll use the robot. The head is the model. It reads the input and chooses the next action. The body is the harness, the software that connects those choices to the environment.

The harness supplies context and tools, executes the requested action, and returns the result to the model. That cycle continues until the work finishes or the run stops.

We’ll keep using this robot to show which part we’re changing.

Presenter reference: robot body/model/tools metaphor inspired by Daniel Whitenack.

Build: start with the LangChain anatomy diagram, then reveal our robot interpretation. Model and harness labels remain with the robot. Source: https://blog.langchain.com/the-anatomy-of-an-agent-harness/

## 5. Build the harness for the environment

[Cut slide 5](http://127.0.0.1:5173/s/odsc-cut-review?p=5)

[robot-environments-intro] Opening

Now put our robot in a coding workspace, your factory, the ocean, or on Mars. Each environment changes what it can observe, which tools it needs, and how it checks its work.

OpenAI and Anthropic give us useful starting points for coding agents. Your own environment brings specific systems, permissions, and requirements. Even inside a software company, those can differ from one project to the next.

We want to understand which parts of the agent need to adapt to that job.

## 6. A fine-tuned 4B model with search beats larger models

[Cut slide 6](http://127.0.0.1:5173/s/odsc-cut-review?p=6)

[small-model-search-evidence] Opening

Here is an interesting example of what the model can do with the right tool. On this evaluation, a fine-tuned Qwen3-4B with search scored 0.74 F1, ahead of GPT-6 Luna at 0.69 and Kimi K2.5 at 0.73. This combines task-specific training with tool access. We should credit both. The harness connects the trained model to the information it needs.

The chart also reports 0.39 after three fine-tuning epochs and 0.40 with RL. Eight epochs scored 0.53, and fine-tuning plus search scored 0.74. Those are different starting configurations, so the RL and search increments are not a controlled comparison of which intervention is universally better. GPT-6 Luna with two additional prompt sentences scored 0.81.

Source: chart supplied by Rajiv in this conversation, headed 'RL added 0.01. A search tool added 0.21.' F1 on 200 test patients. The original post, experiment details, and exact prompt sentences have not been independently verified. The supplied source candidates are https://x.com/adarshsolanki/status/2111554682418045340 and https://x.com/daniel_mac8/status/2111501909337210911 . Neither post has been mapped to this chart. Do not attribute it to either author without confirmation.

## 7. Harness engineering: what we will test

[Cut slide 7](http://127.0.0.1:5173/s/odsc-cut-review?p=7)

[why-alternatives] Opening

To take advantage of the model, we also need to consider what we give it to work with. Which tools can it use? What context does it receive? What should it remember? How do we choose the model, check the work, and decide when to stop? Would another agent help?

Those are the choices we’ll work through today. We’ll inspect what happened, change a specific part, and check whether the change helped.

Build: reveal Harness, Tools, Context / Skills / Memory, Model, Goals / Checks / Stop, and Multi-agent in that order.

## 8. What harnessare you using?

[Cut slide 8](http://127.0.0.1:5173/s/odsc-cut-review?p=8)

[audience-harness-poll] Opening

A quick show of hands: which harnesses are you using? You can choose more than one, including a custom harness or none yet.

Keep your own setup in mind as we go through the examples. Where do you already have a useful baseline, and where does your environment need something different?

## 9. Provider harnesses are a good starting point

[Cut slide 9](http://127.0.0.1:5173/s/odsc-cut-review?p=9)

[010] Opening

I’d start with a provider’s harness. The ability to optimize a model and harness together is a reason to take that baseline seriously.

This FrontierCode figure reports coding scores against output tokens at different reasoning efforts. Claude models ran in Claude Code, and GPT models ran in Codex CLI. Model, reasoning effort, and harness vary across the chart, so it doesn’t isolate the value of one harness or establish an overall winner. More output also didn’t consistently produce a higher score.

We’ll use a working baseline, identify a specific failure, and test a change against it.

Presenter reference: supplied Sonnet 5.5 system-card screenshot, Figure 8.4.A, FrontierCode v1.1 Main. The output-token axis is logarithmic.

## 10. Harness changes can bring bugs 😢

[Cut slide 10](http://127.0.0.1:5173/s/odsc-cut-review?p=10)

[058] Workshop 1: Harness choice

Anthropic’s April 23 postmortem traced Claude Code quality complaints to changes around the model: a lower default reasoning effort, a bug that repeatedly discarded earlier reasoning after an idle session, and a prompt change intended to reduce verbosity.

The company reported that the API and inference layer were unaffected, and that the three issues had been resolved by April 20. This is a concrete example of why a model can appear worse when the surrounding software changes.

Record harness versions and settings alongside model versions, and test realistic long sessions as well as short tasks. When the harness is closed, your ability to inspect or change that surrounding software depends on what the provider exposes. That adds another question to the portability issue on the next slide: how much control do we have when something goes wrong?

Source: Anthropic, An update on recent Claude Code quality reports, April 23, 2026. https://www.anthropic.com/engineering/april-23-postmortem

## 11. Consequences of a closed harness

[Cut slide 11](http://127.0.0.1:5173/s/odsc-cut-review?p=11)

[091] Opening

If we adapt an agent to our environment, we also need to consider whether we can take that work with us. Saved memory and workflows can become tied to the product that stores and loads them.

LangChain highlights this dependency. Workspace files are inspectable and versionable; provider-managed state depends on the available export and loading support. Before investing in that state, check whether another harness could actually load and use it.

## 12. Workshop roadmap: what we will test

[Cut slide 12](http://127.0.0.1:5173/s/odsc-cut-review?p=12)

[existing-harness-starting-point] Opening

We’ll take the same approach through the workshop: explain the choice, inspect it in a concrete task, then look at the results and relevant research.

First, we’ll ask three harnesses to repair the same bug. Then we’ll change the tools used to explain a pull request and the saved notes supplied when adding a feature.

After that, we’ll compare model choices, inspect how a goal command handles unfinished work, and compare one agent with a worker and validator. We’ll account for the result and the work it took.

Some examples are repeated comparisons. Others are individual runs or probes of command behavior. I’ll keep those distinctions explicit.

## 13. Open the saved workshop conversations

[Cut slide 13](http://127.0.0.1:5173/s/odsc-cut-review?p=13)

[workshop-setup] Opening

Start with the supplied canvas-examples README. The HTML transcripts need no model key. The dedicated launcher uses pinned Canvas 1.27.1 and SDK 1.53.0 in a separate read-only archive; do not import into an active conversation store or use the normal server startup. These are inspectable histories, not resumable agent workspaces. Local acceptance passed. AWS acceptance is tracked separately in the instructor test matrix. The workshop page has practice prompts; model setup is only needed for optional new runs. The student ZIP and directions are published at https://github.com/rajshah4/learn-openhands-harness/releases/tag/odsc-conversations-2026-10-18. Use the named ZIP asset, not the automatic repository source archive.

## 14. Harness choice

[Cut slide 14](http://127.0.0.1:5173/s/odsc-cut-review?p=14)

[section-1] Harness choice

We started with one engine family in different vehicles. Now we’ll keep the model and task fixed and change the harness around them.

Watch how each setup gathers information, takes action, and checks its work.

## 15. Workshop 1: Does the harness matter?

[Cut slide 15](http://127.0.0.1:5173/s/odsc-cut-review?p=15)

[workshop-1-section] Harness choice

A full page of results is losing its last item. We’ll ask three harnesses to repair that same small bug with the same model and user prompt.

The task is simple enough to inspect the whole process. We’ll look at how each run gathers information and what it checks before reporting completion.

## 16. Change the harness; keep the model/task fixed

[Cut slide 16](http://127.0.0.1:5173/s/odsc-cut-review?p=16)

[w1-setup] Workshop 1: Harness choice

For classroom practice, keep the same resolved model, starter code, user prompt, and acceptance checks across OpenHands, Pi, and OpenCode. The workshop profiles use DeepSeek Flash. The prompt asks for the repair without changing tests, followed by tests and a final diff.

Changing the harness changes its instructions and action interface together. The following saved conversations illustrate possible action sequences. Fresh runs can choose different reads and checks, so inspect the actual conversation before describing its behavior.

## 17. OpenHands: One request can contain several operations

[Cut slide 17](http://127.0.0.1:5173/s/odsc-cut-review?p=17)

Conversation 01A: One request can contain several operations

Show: Expand the first terminal call and the final verification call.

Say: Count work inside requests, not just the number of requests.

Limit: This take batches work; batching is not guaranteed by the harness.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 7565473ddf0346adb9d6ba32a5cee17c; zero-based stored event indices 4, 10. The screenshot is an actual Agent Canvas capture. Gold boxes and arrows are editable slide annotations. The batched command is horizontally scrolled to show the file reads. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded terminal command, horizontally scrolled to the two file reads.

## 18. OpenCode: Separate file reads make a different trace

[Cut slide 18](http://127.0.0.1:5173/s/odsc-cut-review?p=18)

Conversation 01C: Separate file reads make a different trace

Show: Show the source read and test read as two distinct tool calls.

Say: The same repair can use a different action interface and sequence.

Limit: Brief comparison with 01A; no speed or quality ranking. Pending/completed ACP events do not prove a result arrived between requests.

Delivery: Brief comparison; move on once the contrast is clear.

Evidence: 61c63e8a31c645cab3cb4264a3f090e1; zero-based stored event indices 8, 9. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Two separate collapsed read-tool rows. This does not establish completion order.

## 19. Pi: Extra checks contain executable expectations

[Cut slide 19](http://127.0.0.1:5173/s/odsc-cut-review?p=19)

Conversation 01B: Extra checks contain executable expectations

Show: Expand the command containing assert p.items and its returned success line.

Say: An assertion turns an unexpected edge case into a failing check.

Limit: These are checks added during this run, not a comprehensive test suite.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 9ab0fd3de20b47f0a664316612b40e2d; zero-based stored event indices 20, 21. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Final assistant summary of extra behavioral checks. The underlying assertion command remains in the linked full history.

## 20. Compare harnesses

[Cut slide 20](http://127.0.0.1:5173/s/odsc-cut-review?p=20)

The selected conversations have three OpenHands, five OpenCode, and nine Pi tool requests. OpenHands batches reads and final checks; OpenCode reads separately; Pi adds explicit edge assertions. All three pass the recorded checks. These selected examples illustrate different approaches, not a general ranking. Requests are not model calls or equal units of work. Original October 3 timestamps and the recorded DeepSeek v4.1 Flash model identity are preserved; historical harness runtime versions are unknown. No reruns or prompt changes were needed.

## 21. Same model. Same task.Different harnesses use tools differently.

[Cut slide 21](http://127.0.0.1:5173/s/odsc-cut-review?p=21)

[w1-result] Workshop 1: Harness choice

What worked: all three harnesses repaired the bug and passed the checks.

What we learned: their recorded reads, checking paths, and tool-request counts differed. One run each does not establish a general speed or quality ranking, and the token receipts are incomplete for two harnesses.

The harness lesson is to inspect the evidence produced before completion. Choose the checks your workload needs, then repeat the comparison to see whether the system produces them consistently.

## 22. The harness effect varied by model

[Cut slide 22](http://127.0.0.1:5173/s/odsc-cut-review?p=22)

[017] Workshop 1: Harness choice

Our saved conversations showed different paths to the same accepted repair. This broader comparison asks how often each model and harness pairing passes.

8090 Labs tested seven models in five harnesses on 113 DeepSWE v1.1 bug fixes and features, running each task twice per pairing. They kept each model and its reasoning setting fixed across harnesses and graded with Datacurve’s tests.

GLM 5.3 Flash passed 24 percent in Codex and 59 percent in the DeepSeek harness, a 35 percentage point spread. GPT-5.6 Sol varied by only six points. The harness effect depended on the model; this doesn’t establish one universal best harness.

The provider’s own harness also wasn’t automatically the best pairing. Their Claude Fable 5.1 result was 41 percent in Claude Code versus 61 percent in Codex. For the GPT models and DeepSeek, the gap from their own harness to the best was within the authors’ noise threshold.

This is a vendor-run benchmark with two runs per task. The authors treat overall gaps of nine percentage points or less as within noise. It doesn’t isolate which harness component caused a difference or establish performance in our environment.

Presenter reference: Arjun Goray, 8090 Labs, Same Model, Different Harness, 9 October 2026, Figure 1 and methods. https://www.8090.ai/blog/same-model-different-harness . Public trajectories: https://www.8090.ai/blog/same-model-different-harness/runs . Figure 2 supports the provider-harness comparison in these notes.

## 23. Harnesses varied on accuracy, turns, and token use

[Cut slide 23](http://127.0.0.1:5173/s/odsc-cut-review?p=23)

[019] Workshop 1: Harness choice

This comparison separates completion from process quality and resource use. No single measure captures every outcome we care about. A completed task can still involve unnecessary actions or expensive retries.

Choose the measure that represents the failure you want to fix, then inspect the trace behind it. The next examples move from general coding benchmarks to workflows built around a particular kind of work.

## 24. Snowflake's CoCo scored higher at lower cost

[Cut slide 24](http://127.0.0.1:5173/s/odsc-cut-review?p=24)

[016] Workshop 1: Harness choice

In the saved Data-Eng-Bench figure, Snowflake CoCo with Opus 5 has higher pass@1 and lower cost per trial than Claude Code with Opus 5.

The GPT-5.6 Sol comparison shows the same direction. The Sonnet 5 comparison is roughly tied on pass rate.

The result motivates testing a custom workflow for the task, rather than assuming every customization helps.

The large annotation makes the baseline explicit: the Claude models were run in Claude Code, while the same models also appear in Snowflake CoCo. Do not describe the provider models as running without a harness.

## 25. Harvey’s custom harness improved diligence scores

[Cut slide 25](http://127.0.0.1:5173/s/odsc-cut-review?p=25)

[harvey-harness-result] Workshop 1: Harness choice

Harvey and Baseten reported scores of 23.3% and 62.4% across two diligence-review setups. The comparison used LLM judging against expert rubrics, and the RLM setup included fixed Qwen3.6 subagents.

This is a vendor-reported comparison with unequal compute. It motivates inspecting how document review and synthesis were organized. We need that mechanism and its resource cost before deciding whether it suits another workflow.

## 26. Harvey used a Python REPL and bounded subagents

[Cut slide 26](http://127.0.0.1:5173/s/odsc-cut-review?p=26)

[harvey-harness-mechanism] Workshop 1: Harness choice

The root agent uses a Python REPL to delegate bounded document reviews. The subagents have no tools or REPL of their own. They return findings as variables, and the root selects what to print into its context before writing the memo.

For legal diligence, the checks include document coverage and supported findings. That is a different acceptance contract from a repository repair. Measure whether this division of work improves the memo enough to justify the extra compute.

Presenter reference: Harvey separately reported the Qwen root improving from 29.9% to 63.0% after training within the RLM setup. That is a different comparison from the preceding seven-model harness average.

## 27. Pi’s four-tool setup still went wrong

[Cut slide 27](http://127.0.0.1:5173/s/odsc-cut-review?p=27)

[pi-four-tools-model-fit] Workshop 1: Harness choice

Pi supplied read, write, edit, and bash. The GPT/Codex model running inside Pi was initially given the Codex CLI system prompt. That prompt referred to apply_patch, which Pi did not expose. The model received instructions for a different tool interface.

In the interview, Armin attributes the improvement to removing apply_patch from the system prompt. Mario explains that Pi could then use its own smaller prompt. This is a mismatch between the model’s supplied instructions and Pi’s actual tools; Codex CLI itself was not running inside Pi.

This is the failure story: a minimal harness still needs the model, instructions, and available tools to fit together.

The diagram illustrates their account, not a captured failed tool call. The interview does not provide an error trace, a quantified failure rate, or a controlled comparison of tool counts. Use it as a concrete practitioner example of a harness mismatch.

Source: Syntax 976, February 4, 2026, 48:56–49:49. https://www.youtube.com/watch?v=IPJ7Mp_ajuQ&t=2936s ; https://syntax.fm/show/976/pi-the-ai-harness-that-powers-openclaw-w-armin-ronacher-and-mario-zechner/transcript

Build: show the four-tool Pi setup, then reveal the model’s supplied prompt and apply_patch mismatch, then the reported worse behavior. This is an attributed experience, not a measured ablation.

## 28. Hugging Face is measuring harness consistency

[Cut slide 28](http://127.0.0.1:5173/s/odsc-cut-review?p=28)

[hf-harness-repeatability] Harness choice

This is a brief mention of Hugging Face's ongoing open experiments, led by Younes Belkada. Rather than showing only a pass rate, they reran tasks and inspected how often success flipped, how many turns the agent took, and how input token use varied. The original chart supplied by Rajiv summarizes repeat-pair disagreement and variation averaged across tasks. The gray lines are 90 percent ranges from resampling tasks; overlapping ranges do not establish a reliable difference.

The initial experiment used harness defaults. OpenHands used a zero-temperature default while other harnesses had different sampling settings. That confounds any claim that one harness architecture is inherently more consistent. The thread's follow-up compares sampling settings and repeats selected tasks more extensively. It also investigates nondeterministic tool-output artifacts, such as package download progress, and an experimental IPython-only harness. Treat these as exploratory findings, not a production leaderboard or a universal recommendation for a minimal harness.

My talk track: I like that Hugging Face is opening up the experiment and looking inside the runs. A single successful demo is not enough. Repeat the comparison, control the sampling and environment, and inspect the trajectories as well as the score. This connects directly to our own repeated-trial method.

Sources: https://x.com/yb2698/status/2111136348480708740 and https://github.com/huggingface/ipython-harness

## 29. Harness choice: debrief

[Cut slide 29](http://127.0.0.1:5173/s/odsc-cut-review?p=29)

[debrief-harness] Harness choice

Our saved conversations reached the same accepted repair through different reads and checks. The broader research showed that changing the harness could change pass rates, with effects that depended on the model and workload. That supports testing the pairing rather than choosing from model scores alone.

Start with a working baseline. Match its instructions to its real tools, inspect its defaults, and change one decision at a time. Compare repeated tasks with stable acceptance checks and count the full work, including verification and recovery. A short run or fewer tool requests alone does not establish better quality.

Next we focus on the tool interface itself.

## 30. Tools

[Cut slide 30](http://127.0.0.1:5173/s/odsc-cut-review?p=30)

[section-2] Tools

Now we change the tools the agent can use. The tool interface determines both the actions it can request and the evidence it gets back.

## 31. Tools and feedback in SWE-agent

[Cut slide 31](http://127.0.0.1:5173/s/odsc-cut-review?p=31)

[015] Workshop 1: Harness choice

SWE-agent describes tools and feedback designed for the model operating on a repository. A small interface leaves more of the sequence to the model. A structured tool can supply part of that procedure. In either case, its result needs to support the next action.

We’ve compared complete harnesses. Now we’ll change the tools available for explaining one pull request.

## 32. Workshop 2: Do more tools make a better agent?

[Cut slide 32](http://127.0.0.1:5173/s/odsc-cut-review?p=32)

[workshop-2-section] Workshop 2: Tool design

We want an explanation of a pull request: what changed, how it works, and which tests were reported, with links supporting the answer.

For the classroom conversations 02A–02D, we keep DeepSeek Flash and the PR-review task fixed while changing the tools. We’ll compare adding operations with packaging a repeated collection procedure into one tool.

For classroom practice, use the same configured Flash model across tool variants. The Sonnet medians later in this section remain results of the recorded experiment.

## 33. Change the tools using a fixed task

[Cut slide 33](http://127.0.0.1:5173/s/odsc-cut-review?p=33)

[w2-setup] Workshop 2: Tool design

The task is to explain PR 16860. The terminal setup leaves the agent to write GitHub API commands and process their responses.

The four GitHub tools are separate operations: get PR details, list changed files, list commits, and read a file at a revision. The agent chooses which to call and can call the same tool repeatedly.

The twelve GitHub tools include those same four plus repository details, issue details, issue comments, PR reviews, review comments, check runs, revision comparisons, and commit details. These are read-only MCP wrappers built for this experiment. Four and twelve count the GitHub tools available, not the number of calls made or the agent’s other baseline tools.

The custom PR tool runs a prepared collection procedure and returns details, selected patches, reported checks, and links. The model still checks whether the evidence is sufficient and writes the explanation. This separates adding more tools from changing the shape of the work a tool performs.

Classroom route: use the supplied read-only conversations. The earlier experiment results remain separate evidence; do not apply their timing, token totals, budgets, or model identities to the classroom histories.

## 34. The retrieval work moved from the agent into the tool

[Cut slide 34](http://127.0.0.1:5173/s/odsc-cut-review?p=34)

[w2-evidence] Workshop 2: Tool design

The model still writes the PR explanation in every setup. With terminal commands or individual GitHub tools, it also chooses how to gather the evidence. With the custom tool, we put a prepared collection procedure inside one operation.

That bundle contains selected patches, so it can miss an important file. Keep a way to fetch more evidence. The next four conversations show what each setup actually did.

## 35. The agent decides the retrieval procedure

[Cut slide 35](http://127.0.0.1:5173/s/odsc-cut-review?p=35)

Conversation 02A: The agent writes the retrieval procedure

Start with the terminal baseline. The agent writes curl commands and JSON filtering to assemble PR evidence. That procedure is work the model has to choose and carry out. The returned test descriptions are reports from the PR, not tests this agent executed.

Compare this with the custom evidence bundle on slide 38. The main question is where the collection procedure lives.

Evidence: 6afcee2755304d2c8b441ea8e8e7564e; zero-based stored event indices 8, 20. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded terminal command combines curl with agent-written JSON parsing; output lists changed files.

## 36. A small tool menu still has argument errors

[Cut slide 36](http://127.0.0.1:5173/s/odsc-cut-review?p=36)

Conversation 02B: A small tool menu still has argument errors

Brief side example: the four-operation menu still requires correct arguments. The missing repo field produces a validation error, followed by recovery in the full history. This illustrates interface usability; it does not establish an advantage or disadvantage from tool count. Move on after showing the recovery.

Evidence: ae2d836d512f43e385885048225bb7c0; zero-based stored event indices 22, 26. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded validation error identifies the missing repo field. The corrected calls follow in the full history.

## 37. Checking one constraint can violate another

[Cut slide 37](http://127.0.0.1:5173/s/odsc-cut-review?p=37)

Conversation 02C: Checking one constraint can violate another

Brief side example: none of the eight additional operations is used in this run. The larger menu therefore contributes no new operation to the observed retrieval path.

The screenshot shows a separate failure: the agent writes a temporary word-count file despite a no-file instruction. Do not attribute that failure to the larger menu. Return to the main comparison: agent-written collection versus a prepared evidence bundle.

Evidence: 9659953a3ba347088ce3d3c4f7bf218e; zero-based stored event indices 36, 48. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded file-write card creates /tmp/pr16860-body.txt for word counting. Later cleanup is visible in the full history.

## 38. Move repeated collection into a tool

[Cut slide 38](http://127.0.0.1:5173/s/odsc-cut-review?p=38)

Conversation 02D: Move repeated collection into a tool

Here the custom tool performs the repeated collection procedure and returns a bundle of PR evidence. Compare that with the commands and filtering in the terminal baseline. The agent still has to explain the evidence and decide whether something is missing.

There is also a separate word-count action. One retrieval call packages backend work; it does not eliminate that work or establish a one-call run. This is the core tool-design lesson: choose which repeated procedure to implement in the tool, and retain access to evidence it leaves out.

Evidence: 6df4719631bd4024957de2b197fb40d7; zero-based stored event indices 5, 8. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: The timeline shows a bundle retrieval and a separate word-count action.

## 39. Earlier experiment: a custom tool reduced the work

[Cut slide 39](http://127.0.0.1:5173/s/odsc-cut-review?p=39)

[workshop-2-result] Workshop 2: Tool design

The 4 GitHub tools already reached median coverage of six out of six. Adding eight more operations could not raise that coverage score further, and none of the eight additions was used.

The larger catalog sent more definition text: about 25.4 kilobytes instead of 19.9. Median fresh input across the whole run rose from 42.8 to 48.7 thousand tokens, with eleven versus twelve calls. That input total includes more than tool schemas, so we cannot attribute the whole difference to the definitions.

Strict passes were two out of three versus three out of three. The trials ran in separate same-day blocks, and billed cost was unavailable. We can report unused operations and added definition text. We cannot establish identical quality or a universal rule about tool count.

Changing the collection procedure gave a more useful comparison. The custom tool and 12 GitHub tools both reached median coverage of six out of six. The custom tool took 72 seconds and one call, compared with 123 seconds and twelve calls. Median fresh input was 18.7 thousand tokens versus 48.7 thousand.

The terminal reached median coverage of four, taking 101 seconds and six calls. Each setup had three trials. These are whole-run observations; one model-facing call can contain several backend requests, and the ledger did not include billed cost.

The custom tool was built for this task’s evidence requirements. The rubric checks coverage and citations rather than proving every claim correct. Keep lower-level access for missing evidence and evaluate again when the task changes.

The custom PR tool reports existing checks; it does not run tests. Independent verification requires checked-out code and an execution environment.

Classroom archive: For the classroom examples, trace an answer claim to the returned evidence and check the task constraints. The larger tool catalog leaves its added operations unused, but the final answer exceeds the word limit and the agent creates temporary files. Keep that constraint miss visible when discussing a useful answer.

## 40. What worked, what didn’t, and the lesson

[Cut slide 40](http://127.0.0.1:5173/s/odsc-cut-review?p=40)

[workshop-2-debrief] Workshop 2: Tool design

What worked: the custom PR tool gathered useful evidence with fewer calls and less input than the 12 GitHub tools.

What we learned: eight added operations went unused, and a read-only tool could report checks but could not execute them. The small trials do not establish equal quality between the 4-tool and 12-tool menus.

The harness lesson is to package work the agent repeatedly needs, specify the evidence returned, and preserve a way to obtain what the tool leaves out. Measure the useful answer and the work required to produce it.

A tool’s schema defines the action the model can request; its implementation determines the evidence returned for the next decision.

## 41. Tool definitions can fill your context

[Cut slide 41](http://127.0.0.1:5173/s/odsc-cut-review?p=41)

[tools-to-context] Workshop 2: Tool design

Tool definitions consume context before a tool runs. In Anthropic’s five-server example, 58 tools used about 55 thousand tokens. Tool search left common tools visible and deferred the rest, reducing the initial context to about 8.7 thousand tokens.

The agent still has to discover and use the right tool. Cloudflare provides another way to handle a large catalog.

Build: reveal the reported 55K initial context first, then the 8.7K tool-search condition. These are context tokens, not a direct dollar saving. The earlier source figure depicted a different 77.2K setup; use this native graphic for the 55K example discussed in the source text.

## 42. Cloudflare reduced 2,600 API endpoints to two model-facing tools

[Cut slide 42](http://127.0.0.1:5173/s/odsc-cut-review?p=42)

[038] Workshop 2: Tool design

Cloudflare exposes search and execute instead of a separate model-facing schema for each of 2,600 API endpoints. The model searches the catalog, writes a short JavaScript program to compose the required operations, and runs it in a sandboxed V8 isolate.

Intermediate API results can stay inside the program, with selected evidence returned to the model. This changes both discovery and where the collection procedure runs. The sandbox and allowed API access still need explicit boundaries.

## 43. DeepSeek Harness: “Everything is a plugin”

[Cut slide 43](http://127.0.0.1:5173/s/odsc-cut-review?p=43)

[deepseek-runtime-modes] Workshop 2: Tool design

DeepSeek calls this architecture “Everything is a plugin.” A tool is an action the model can call. A plugin is a replaceable component of the harness, which can include the tool registry, model adapter, session storage, or the agent loop itself.

This screen illustrates extension points. It does not establish a performance gain. The choice is which component needs to change for the workflow we’re trying to support.

Sources: https://www.deepseek.com/en/harness/ ; https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md . Official visual checked October 9, 2026.

Sources: https://www.deepseek.com/harness/images/feat-plugins-en.webp

## 44. Tools: Action, process, and outcome answer different questions

[Cut slide 44](http://127.0.0.1:5173/s/odsc-cut-review?p=44)

[tool-evaluation-levels] Workshop 2: Tool design

A valid tool call, an acceptable process, and a correct final result are different checks. Selection and arguments tell us whether the requested action is valid. The trace tells us what happened along the way. The task check tells us whether the final state meets the requirement.

For a coding repair, green tests alone would miss an unauthorized change to the tests themselves. The harness also needs a scope check before accepting completion.

Every tool result becomes information for another decision. Next we’ll examine what the model receives and what information survives beyond the current call.

## 45. Tools: debrief

[Cut slide 45](http://127.0.0.1:5173/s/odsc-cut-review?p=45)

[debrief-tools] Tools

In the Sonnet 4.6 PR trials, adding eight GitHub tools did not increase median answer coverage and those extra tools went unused. The custom PR tool returned useful evidence with fewer model-facing calls and less input than the larger menu. That result concerns three trials per setup and a tool designed for this evidence task, not a universal advantage for custom tools.

Package recurring collection work into a bounded operation, keep a route to evidence it leaves out, and inspect what the tool returns when it fails. Evaluate the answer and the whole retrieval process. Include input from tool definitions and backend work inside each call.

The tool’s result becomes input to the next model call. That brings us to context and memory.

## 46. Context and memory

[Cut slide 46](http://127.0.0.1:5173/s/odsc-cut-review?p=46)

[section-3] Context and memory

Next is the information available to the model. We will separate what enters the current call from what we save and reuse across tasks.

## 47. Context is what the model sees on this call

[Cut slide 47](http://127.0.0.1:5173/s/odsc-cut-review?p=47)

[044] Context and memory

Every tool result becomes information for another decision. Context is what the model receives on this call: the request, instructions, tool definitions, retrieved evidence, and recent history.

The window has a token limit, and the input must leave room for a response. A saved file outside that input is not automatically known to the model. The system has to select and load it. The proportions in this diagram are illustrative.

Sources: https://platform.claude.com/docs/en/build-with-claude/context-windows

## 48. A growing conversation repeats earlier context

[Cut slide 48](http://127.0.0.1:5173/s/odsc-cut-review?p=48)

[agentic-loop-transcript-growth] Context and memory

In this growing-conversation example, the next call includes the previous conversation and the new tool result. Later calls can therefore contain substantial input that the model has already seen.

Count input across the whole run. A production harness may trim, summarize, or rebuild the transcript rather than resend all history indefinitely. Both the context policy and provider caching affect how we interpret those totals.

## 49. Context choices change token use

[Cut slide 49](http://127.0.0.1:5173/s/odsc-cut-review?p=49)

[context-token-evidence] Context and memory

This is a practitioner experiment, offered as an interesting illustration rather than a general recipe. Kensei's chart reports 945 runs across several tips. Moving 16 KB of rules from CLAUDE.md into a skill used 31 percent fewer tokens. Loading 16 KB of unrelated rules into CLAUDE.md used 46 percent more than the default. These are separate comparisons, not stages of a single run.

The exact file and function condition is a useful counterexample to optimizing tokens alone. It used 13 percent more tokens, but correctness rose from eight of twenty to twenty of twenty. The harness has to help the agent complete the task. Token use is one measurement.

The source chart also reports clearing a thirty-turn chat at minus 79 percent and compacting it, including compaction cost, at minus 60 percent, each over three chains. Those small samples do not justify a universal saving. Several other interventions have confidence intervals crossing zero.

Source: Rajiv's supplied screenshot, titled '12 tips, 945 runs', attributed visibly to Kensei. Total tokens per task versus default setup, Sonnet 5.5 unless stated. The selected comparisons each have n=20. The original chart shows 95 percent confidence intervals. This slide shows selected mean changes only, with intervals omitted rather than estimated from pixels. Original publication link remains unverified. Do not assume this chart is one of the two X posts previously supplied.

## 50. A larger window does not guarantee useful recall

[Cut slide 50](http://127.0.0.1:5173/s/odsc-cut-review?p=50)

[051] Context and memory

Fitting information into the window is only the capacity check. The model still has to find and use the relevant detail.

This chart measures eight-needle retrieval in MRCR v2. Behavior differs by model. It does not show a universal decline and is not a coding evaluation. Keep the evidence needed for the next decision easy to find.

Now consider the work that repeats across different tasks. That gives us a reason to save something useful for the next run.

Sources: https://platform.claude.com/docs/en/build-with-claude/context-windows https://claude.com/resources/articles/1m-context-ga

## 51. Consider two related tasks

[Cut slide 51](http://127.0.0.1:5173/s/odsc-cut-review?p=51)

Build order: Task 1 → Task 2 → Representation → Induction → Lifecycle. Reveal each with the next arrow.

[shared-task-structure] Context and memory

These two requests end differently, but most of the search procedure is the same. To add headphones to a wish list or find a keyboard price range, the agent first opens the store, finds the search box, enters a query, and searches. The query changes. The reusable procedure stays the same.

That repetition motivates memory. We can preserve a useful procedure so a later task has less to rediscover. Then we have three design questions. How should we represent it: text, code, or both? How does the agent extract it from experience? And when should it retrieve, check, revise, or forget it? A successful run gives us a candidate procedure. We still need to test whether it helps on another task.

In a codebase, the equivalent might be finding the right module and running the relevant tests across several feature requests. The implementation changes, but some of the project knowledge carries over.

Source: Daniel Fried, CMU 11-768, Memory and Skills, p. 2. https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=2

## 52. Methods for updating the agent

[Cut slide 52](http://127.0.0.1:5173/s/odsc-cut-review?p=52)

[agent-update-methods] Context and memory

There are three places we can carry experience forward. We can keep messages and tool results in the context window. That preserves detail, but we pay to process it, and the model still has to find what is relevant.

We can save an external artifact, such as project notes, a skill, or a checkpoint. We can inspect and edit it, retrieve it for another task, and often use it with another model. But someone has to create it or extract it from experience, select it for the task, and keep it current. Saving a file alone does not make the next model call use it.

Or we can update model weights through training. That can make a learned behavior cheaper to execute and change behavior across many tasks. Updates are slower, harder to inspect, and tied to the trained model. Faster inference is a possible benefit, not a guarantee for every training method or workload.

For this workshop, we focus on external artifacts and how the harness loads them into context. The practical question is which part of an experience deserves to become a reusable artifact. The next slide maps those artifacts to the mechanisms you already see in coding agents.

Source: Daniel Fried, CMU 11-768, Memory and Skills, p. 3. https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=3

## 53. A map of instructions and memory

[Cut slide 53](http://127.0.0.1:5173/s/odsc-cut-review?p=53)

[memory-systems-map] Context and memory

Here are the concrete mechanisms a harness can use to supply information to the next call. Some contain saved experience. Others contain instructions written by people. The system prompt supplies standing behavior and tool rules. Repository guidance records project requirements. Skills package reusable procedures. Checkpoints preserve unfinished work, while a memory store can hold facts and lessons across tasks.

Each has to be discovered, selected, and loaded before it can inform a model call. Timing and precedence vary by harness. Saved material can become stale, so keep its source and scope.

Our next experiment isolates the content of supplied project notes.

Sources: https://agents.md/ https://developers.openai.com/api/docs/guides/tools-skills https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool

## 54. Workshop 3: Does the agent have the customer’s decision?

[Cut slide 54](http://127.0.0.1:5173/s/odsc-cut-review?p=54)

Northstar is a fictional customer. We ask the agent to update a CSV exporter to match an earlier customer agreement. That decision is not inferable from the code. Our question is whether the agent has enough evidence to act, not whether it can guess a missing requirement. We compare no supplied agreement, an older draft, and an accepted note. Asking for the agreement is a useful outcome. These are deliberately selected exploratory examples, not a general memory benchmark.

## 55. Code can show behavior, but not a missing agreement

[Cut slide 55](http://127.0.0.1:5173/s/odsc-cut-review?p=55)

The code tells us what the exporter currently does. It cannot tell us what a customer agreed in a prior session. The important missing decision is the marker for an absent or None region. String IDs and existing empty strings must also be handled according to the accepted contract. This is why the task makes prior agreement relevant rather than testing whether memory merely repeats source files.

## 56. The accepted policy distinguishes missing from empty

[Cut slide 56](http://127.0.0.1:5173/s/odsc-cut-review?p=56)

This is the instructor’s answer key. An absent region or None becomes NA, an existing empty string stays empty, and string IDs retain leading zeros. The accepted note supplies that decision. The no-note and draft conditions do not secretly receive this answer key. We evaluate clarification separately from implementation checks.

## 57. A draft is history, not an accepted requirement

[Cut slide 57](http://127.0.0.1:5173/s/odsc-cut-review?p=57)

The older note is explicitly a draft with an unresolved customer decision. The accepted note states what was agreed and why. That status is part of the useful memory. The older-note agent asks for the final decision rather than treating a draft as authorization. This is not evidence that stale notes harmed performance; it shows the value of preserving uncertainty.

## 58. Same request: no agreement, draft, or accepted note

[Cut slide 58](http://127.0.0.1:5173/s/odsc-cut-review?p=58)

All three conditions use the same exporter request and model. Across the pilot and two isolated repeats, missing or draft agreement notes led to clarification without product edits; accepted notes enabled a passing implementation. We show the trial-two trio. Clarification is a correct process outcome even though the untouched starter still fails implementation acceptance. Identical unrelated ambient context was injected by Canvas despite the requested memory setting, so do not call this memory-free or automatic retrieval. Preserve the complete fourteen-run exploration matrix separately.

## 59. No agreement: ask before implementing

[Cut slide 59](http://127.0.0.1:5173/s/odsc-cut-review?p=59)

The agent says it is “not guessing” and asks for the exact missing-value representation. The task says the prior agreement is absent from the repository and explicitly instructs clarification when needed. This is correct instruction-following, not a spontaneous discovery that memory is unsafe. No product edits were made. Ambient user memory and skill listings were present; only the task-specific supplied notes differ across the trio. The agent also asks some unnecessary ID questions, so clarification has a cost. Selected trial two; trial three had the same process outcome.

## 60. A draft is not the final decision

[Cut slide 60](http://127.0.0.1:5173/s/odsc-cut-review?p=60)

The agent says the draft is “not the settled agreement” and reports “no edits to any file.” This draft explicitly says the decision is pending. The prompt tells the agent to ask rather than invent a missing agreement. The useful distinction from 03D is the reason for stopping: a note exists, but it is not accepted. This does not demonstrate damage from stale memory or automatic retrieval. Keep this quick; accepted notes on the next slide supply the decision. Same unrelated ambient context across conditions.

## 61. An accepted agreement becomes executable checks

[Cut slide 61](http://127.0.0.1:5173/s/odsc-cut-review?p=61)

The test names cover missing keys, None, empty strings, and leading-zero IDs. The accepted note gives a concrete contract, so the agent can implement and check it. This screenshot shows agent-run tests, not the independent grader; the separate independent checks also passed. A header-only test would be weak evidence because it passes on the broken starter. We selected the complete trial-two trio and retain all fourteen exploratory outcomes. We do not claim token savings or that clarification is worse than implementation.

## 62. Earlier experiment: results on memory

[Cut slide 62](http://127.0.0.1:5173/s/odsc-cut-review?p=62)

[workshop-3-result] Context and memory

All three conditions passed in all three trials, including the independent contract and full-suite checks. There was no correctness advantage for supplied memory on this task.

The blue callout compares current memory with no memory. Current notes used about 205 thousand median total tokens, compared with 335 thousand without notes, a 39 percent reduction. Median time was 85.4 seconds instead of 100.6, about 15 percent less. These are descriptive medians from three trials with overlapping time ranges, rather than a reliable general speed estimate.

Most input was cached. Uncached input fell seven percent and output fell 26 percent, so the 39 percent total-token reduction does not establish a 39 percent cost saving. Cached input is already included in total input.

Older notes used even fewer median total tokens, about 176 thousand, but took longer at 135.6 seconds. Token totals, elapsed time, and correctness need separate interpretation.

Acceptance checks: We check the user-visible result before comparing resource use. Next-page browsing must work, page-number access must survive, and reports must still work.

An independent checker outside the agent workspace tests the accepted API, traversal, invalid inputs, and existing callers. We also inspect the diff and trace. All nine runs reused the shared protocol, preserved existing pagination definitions, and ran focused tests followed by the full suite. Agent-authored tests alone would not establish that compatibility.

Current classroom archive: 03D and 03E correctly ask for the missing accepted agreement without editing. 03F implements the accepted note and passes independent checks. Those exporter examples are separate from the October 9 pagination experiment shown here. Do not transfer these token or timing totals to the new trio.

## 63. Useful memory preserves what is decided—and what is not

[Cut slide 63](http://127.0.0.1:5173/s/odsc-cut-review?p=63)

The lesson is decision state. Missing information should trigger a targeted question. Draft history should retain its uncertainty. An accepted decision can support implementation, but the agent still needs to verify the result. We did not demonstrate automatic retrieval, token savings, or damage from stale memory in this trio. The earlier quantitative experiment remains separately labeled and uses different fixtures.

## 64. Save decisions with reasons and a source

[Cut slide 64](http://127.0.0.1:5173/s/odsc-cut-review?p=64)

[workshop-3-debrief] Context and memory

What worked: current notes reached the accepted result with fewer median total tokens and less median time than no notes in this small experiment.

What we learned: every condition passed, and older notes were successfully reconciled. They used fewer median tokens still, but took longer. The time ranges overlap, and the token totals do not establish billed savings.

The harness lesson is to save useful decisions with reasons and a current source, then measure whether loading them reduces work while preserving correctness. Before treating those token totals as cost savings, we need to account for caching.

## 65. Prefix caching reuses the shared transcript

[Cut slide 65](http://127.0.0.1:5173/s/odsc-cut-review?p=65)

[prefix-cache-prefill] Context and memory

Many model calls share a transcript prefix. A provider can reuse work for an eligible cached prefix, so repeated input and fresh input have different costs.

The memory results included cached input. To compare bills, we need the provider’s cache receipts and prices for fresh input, cached input, and output. This diagram uses equal-size turns to illustrate reuse; it is not a measurement of every harness.

## 66. Remember inference and caching effects

[Cut slide 66](http://127.0.0.1:5173/s/odsc-cut-review?p=66)

[pi-cache-intervention] Context and memory

Here is a separate, larger task run with Pi. Both runs made 89 model calls. With Anthropic cache control enabled, fresh input was 213 thousand tokens instead of 3.35 million.

The runs passed different numbers of checks: six of eight with caching and seven without. Two runs do not establish a quality effect. They illustrate why the provider configuration and cache receipts belong in the record when comparing resource use.

## 67. Better context means better performance (+19%)

[Cut slide 67](http://127.0.0.1:5173/s/odsc-cut-review?p=67)

[measured-persistent-context] Context and memory

Our memory comparison reached the accepted design in every condition. This study examines a different outcome: whether targeted context improves later queries.

Patel and colleagues developed context using twelve queries, froze it, and evaluated on 42 held-out queries in the same environments. Accuracy-focused context gained 19 percentage points. Schema-focused context reduced exploration but hurt accuracy.

Useful context depends on what the task requires. This evaluates reuse across queries in known environments, not transfer to unfamiliar databases.

## 68. Retrieval methods for improving context

[Cut slide 68](http://127.0.0.1:5173/s/odsc-cut-review?p=68)

[retrieval-methods] Context and memory

Separate the retrieval method from the workflow that uses it. On the left, keyword retrieval such as BM25 matches terms. Semantic retrieval uses embeddings to find related meaning. Graph retrieval follows entities and their relationships. A system can combine these methods.

On the right, a simple retrieve-then-generate workflow gathers relevant evidence and gives it to the model to produce an answer. RAG names the broader retrieval-augmented generation pattern; it is not a competing search algorithm alongside BM25 or embeddings. GraphRAG can combine graph-based retrieval and summarization with generation.

An agentic search loop chooses a search, inspects what comes back, and decides whether to search again or answer. For example, it might start with an exact error string, inspect the matching file, and then search for its callers. It can use keyword, semantic, or graph retrieval at different steps. Agentic search and RAG can overlap; these diagrams distinguish a simple pipeline from iterative control, not mutually exclusive products.

The harness exposes the retrieval tools and returns sources the agent can inspect. The next question is what standing instructions should share that context as models change.

Sources: https://arxiv.org/abs/2005.11401 ; https://www.microsoft.com/en-us/research/project/graphrag/

Build: Keyword, Semantic, Graph, Retrieve-then-generate, then Agentic search. Either workflow can use those retrieval methods.

## 69. Anthropic updates removed over 80% of Claude Code's system prompt

[Cut slide 69](http://127.0.0.1:5173/s/odsc-cut-review?p=69)

[079] Context and memory

Thariq Shihipar reported that Anthropic removed over 80 percent of Claude Code’s system prompt without a measurable loss on its coding evaluations for Opus 5 and Fable 5.

A workaround for one model may constrain its successor unnecessarily. Preserve the failure case that justified an instruction, then rerun it when the model changes. This result supports that maintenance process; it does not prescribe an 80 percent cut for every prompt.

## 70. Five ways to manage a full context window

[Cut slide 70](http://127.0.0.1:5173/s/odsc-cut-review?p=70)

[063] Context and memory

When context fills, the harness can continue with the history, rewind, start fresh, compact older turns, or move bounded work into a subagent’s separate context.

Each choice changes what remains available. Before discarding or summarizing material, identify the task state and constraints needed for the next decision. A fresh context is useful only if the necessary evidence reaches it.

## 71. Compaction creates a record for the next turn

[Cut slide 71](http://127.0.0.1:5173/s/odsc-cut-review?p=71)

[summarization] Context and memory

This slide shows summary-based compaction: older turns are replaced with a continuation summary. Later, CliffCompaction will show a different approach based on deletion and truncation. The next call still needs the exact requirements, completed work, current evidence, and next action.

Bulky output can leave active context while the original trace stays available. Because a summary can omit or distort information, specify what must survive before relying on it.

Build: start with the verbose history. Reveal the continuation record and the reminder that the raw trace is retained separately. The record is illustrative.

## 72. What to preserve during compaction

[Cut slide 72](http://127.0.0.1:5173/s/odsc-cut-review?p=72)

[compaction-preservation-policy] Context and memory

A useful summary preserves exact requirements, changed files, verification results, and the next action. “Tests passed” is insufficient if we need to know which tests ran against which version.

Keep bulky evidence retrievable after a restart. Preserve authorization constraints, and enforce them in the execution path too. Losing an instruction during compaction must not silently grant new authority. This is a preservation policy, rather than a measured workshop result.

## 73. ACON learns better instructions for compressing context

[Cut slide 73](http://127.0.0.1:5173/s/odsc-cut-review?p=73)

[acon-compression] Context and memory

ACON searches for a better compression strategy, represented as natural-language instructions for a compressor. It compresses both accumulated history and large observations.

During optimization, compare tasks where full context succeeds but compressed context fails. An LLM examines what useful information was lost, revises the preservation instructions, and evaluates the updated compressor. The optimization also considers redundancy so the policy does not merely keep everything. This is a development-time feedback loop; it does not need a full-context parallel run for every deployed task.

The core method changes the compression guidelines without retraining the agent. The paper separately explores distilling the compressor into a smaller model. Across AppWorld, OfficeBench, and multi-objective QA, it reports 26–54 percent lower peak tokens and improved success against existing compression baselines. Peak tokens are not the same as dollars saved.

Next is a contrasting rule-based approach that deletes or truncates content rather than producing a rewritten summary.

Source: Kang et al., ACON, arXiv:2510.00615v3, section 3.3. https://arxiv.org/html/2510.00615v3

## 74. CliffCompaction keeps excerpts, then drops the old block

[Cut slide 74](http://127.0.0.1:5173/s/odsc-cut-review?p=74)

[cliffcompaction] Context and memory

CliffCompaction lets context grow until a threshold, then removes large portions in one step. The blue line is a schematic, not measured data.

It keeps text verbatim rather than asking another model to rewrite a summary. The published rules drop tool results longer than 500 characters, shorten tool calls to signatures, and truncate older reasoning. System instructions, the initial task, and recent turns are preserved.

At the next compaction, discard the previous compacted block and process only newer original turns. That avoids repeatedly summarizing a summary. The tradeoff is loss of direct access to older history; rereading a file can recover current contents but not necessarily an old transient observation.

Unchanged prefixes can be cached between cliffs. Compaction itself still requires a prefill. The paper reports up to fifty percent lower cost in tested Terminal-Bench configurations while maintaining or improving performance; it is not a universal savings guarantee.

Source: Nguyen et al., CliffCompaction, arXiv:2609.26779v1, section 2. https://arxiv.org/html/2609.26779v1

## 75. Reuse the cached prefix to produce the summary.

[Cut slide 75](http://127.0.0.1:5173/s/odsc-cut-review?p=75)

[prompt-caching] Context and memory

There are two phases. First, the summarization request reuses the old prefix: the same system prompt, tools, and conversation history, with a summarization instruction appended. In Anthropic’s described implementation, that lets the request that produces the summary reuse cached input. A separate request can still hit the cache when its prefix matches.

Second, the agent resumes with compacted history. The diagram’s right-hand column contains the summary and reattached context in place of the original messages. That changes the conversation prefix; we are not preserving the entire old history’s cache for subsequent turns. Unchanged system and tool prefixes may still be reusable.

The harness needs to consider both what information survives and how much work each phase requires. Lower context use does not automatically mean lower cost.

Source: Anthropic, Lessons from building Claude Code: Prompt caching is everything, April 30, 2026. https://claude.dev/blog/lessons-from-building-claude-code-prompt-caching-is-everything/

## 76. Compaction methods make different tradeoffs

[Cut slide 76](http://127.0.0.1:5173/s/odsc-cut-review?p=76)

Let’s connect the methods. A summary rewrites history into a continuation record. ACON optimizes instructions for that compressor using failures caused by lost information. CliffCompaction uses deletion and truncation while keeping retained text verbatim. Caching is a separate compute optimization; it does not decide what the agent remembers or make its context shorter. All of these need an explicit preservation policy. The next slide changes who controls the live context: a context language model edits its own next input.

## 77. What if the model could edit its own next input?

[Cut slide 77](http://127.0.0.1:5173/s/odsc-cut-review?p=77)

[context-language-models] Context and memory

The Context Language Model paper lets the model edit a file that becomes its next live input. The runtime mirrors context into the file and synchronizes changes before the next call. Without an edit, the conversation appends normally.

The model can preserve an exact requirement, remove obsolete output, or update working state. The harness still provides access and synchronization. This changes who selects context rather than removing that surrounding software.

The September 2026 preprint evaluates the complete method. Its reported benchmark gains do not isolate unrestricted context editing as the sole cause.

## 78. Task memory: save state and resume work

[Cut slide 78](http://127.0.0.1:5173/s/odsc-cut-review?p=78)

[064] Context and memory

Read this from left to right. Before a session ends, save a checkpoint: the plan, completed work, evidence, blockers, and next action. This lives outside the conversation so a fresh session can find it.

The new session loads that record, then checks the actual workspace. Have the files changed? Do the relevant checks still pass? A previously passing result is not proof about a later version of the files. If the checkpoint is stale, correct it before choosing the next action.

Continue from the verified state and update the checkpoint as the work progresses. The return arrow is what makes this a maintained working record rather than a one-time summary.

Keep this evolving state with the task. The next slide covers standing repository guidance for future tasks.

## 79. AGENTS.md: repository guidance for future tasks

[Cut slide 79](http://127.0.0.1:5173/s/odsc-cut-review?p=79)

[073] Context and memory

A supporting harness loads AGENTS.md as repository guidance. Useful contents include verified test commands and requirements that are difficult to infer from the code.

Keep temporary progress in task records. Revisit guidance when the repository changes, and measure the cost of including it across calls. A larger file is worthwhile only when its content helps the work enough to justify that input. Here is one concrete instruction we can evaluate.

## 80. A test-cost warning reduced repeated full-suite runs

[Cut slide 80](http://127.0.0.1:5173/s/odsc-cut-review?p=80)

[078] Context and memory

One repository warned that its full suite takes more than twenty minutes. In this exploratory comparison, full-suite launches fell from 3.67 to 1.67 per experimental cell, and wall-clock time fell from 2,689 to 2,032 seconds. Correctness did not change.

The same study ran 288 trials on seventeen tasks in three Python repositories. Pass rates changed only modestly between no guidance, always-loaded guidance, and retrieval when needed. Claude's rates ranged from 53.3 to 55.6 percent and Codex's from 52.9 to 58.8 percent. Smaller effects remained possible.

The specific cost warning changed behavior; adding a guidance file did not establish a general correctness gain. Evaluate what you put in the file and when it is loaded. Next, skills let us make a more specific procedure available only when relevant.

Source: Khatri, Do Context Files Help Coding Agents?, arXiv:2607.27250v1, Tables 1–2. https://arxiv.org/abs/2607.27250v1

## 81. A skill is a reusable procedure for a task

[Cut slide 81](http://127.0.0.1:5173/s/odsc-cut-review?p=81)

[skill-definition] Context and memory

A skill packages a reusable procedure for a class of task. SKILL.md describes when it applies and gives the instructions. A skill can also include references, examples, or scripts. The directory shown is illustrative. It does not give the agent new model weights or permission to perform an action. The next slide shows how the harness can expose a short description first and load the detailed procedure only when relevant.

## 82. A skill loads detailed instructions only when the task needs them

[Cut slide 82](http://127.0.0.1:5173/s/odsc-cut-review?p=82)

[081] Context and memory

A skill makes a reusable procedure discoverable without putting all of its instructions into every call. The model typically sees a short catalog, then loads the relevant skill instructions and references when needed.

A script can run and return evidence without its entire source entering context. Loading details vary by harness. Evaluate whether the selected procedure improves the task and whether unnecessary material stays out of the input.

## 83. Curated skills raised average pass rate

[Cut slide 83](http://127.0.0.1:5173/s/odsc-cut-review?p=83)

[082] Context and memory

SkillsBench reported average pass rate rising from 33.9 to 50.5 percent with curated skills, a 16.6 percentage-point gain across 87 tasks and eighteen model-harness configurations. Individual configuration gains ranged from 4.1 to 25.7 points.

Those results concern the curated skills and tested tasks. A new skill still needs its own comparison, including failures and resource use.

## 84. Evaluate a skill on the work it should improve

[Cut slide 84](http://127.0.0.1:5173/s/odsc-cut-review?p=84)

[090] Context and memory

An average gain can hide a skill that hurts an individual task. Compare representative work with and without the skill, including correctness, time, and cost. Inspect the failures.

Keep the task and checks stable enough to see what the procedure changes. The same discipline applies when promoting a lesson from one run into future guidance.

## 85. Context and memory: debrief

[Cut slide 85](http://127.0.0.1:5173/s/odsc-cut-review?p=85)

[095] Context and memory

Useful context can reduce work without raising correctness. Save task state; keep verified, stable, reusable lessons. Correctness, uncached input, output, and elapsed time.

This rule applies to promoting information into reusable guidance. A lesson should have evidence, a clear scope, and a reason to remain useful beyond the current task.

Checkpoints and audit traces can also survive, including failed attempts and temporary state. They belong in task records rather than automatically becoming standing instructions.

We’ve examined what information reaches the next call. Now we’ll choose which model receives it, using concrete tasks and their required checks.

## 86. Model routing

[Cut slide 86](http://127.0.0.1:5173/s/odsc-cut-review?p=86)

[section-4] Model routing

We have looked at tools and information. Now we choose the model for the work, using success, cost, and time to judge the choice.

## 87. Workshop 4: Do all tasks need the strongest model?

[Cut slide 87](http://127.0.0.1:5173/s/odsc-cut-review?p=87)

The classroom comparison uses two tasks: an async counter repair and a controlled security repair. Flash and Pro both pass the counter checks through different changes. The second task exposes a contract detail that the selected Pro repair misses. We will inspect the checks and scope, then look at a separately labeled earlier four-task routing benchmark. Those historical bills do not describe these new runs.

## 88. Compare model choices against explicit checks

[Cut slide 88](http://127.0.0.1:5173/s/odsc-cut-review?p=88)

Keep the original counter pair as the cheaper-model-is-sufficient baseline. The new controlled security fixture has three planted vulnerability families and explicitly signposted safe functions. It is not a blind security benchmark. Both models can demonstrate and block attacks, but a repair can still miss the exact path contract. The selected second-attempt pair has Flash 10/10 behavioral groups and Pro 9/10. Neither is clean full-protocol acceptance because both used out-of-workspace helpers. Preserve the Flash timeout and all repeats in the matrix; do not present selected traces as success rates.

## 89. Flash: the cheaper model solves the repair

[Cut slide 89](http://127.0.0.1:5173/s/odsc-cut-review?p=89)

Conversation 04C: Flash: the cheaper model solves the repair

Flash is our cheaper model in this comparison. It fixes the race by locking the shared update while keeping the simulated slow work outside the lock. The repair passes the count and concurrency checks.

For this bounded task, we already have an accepted result before moving to Pro. The question is what the stronger model adds. The timing probe checks concurrency in this fixture; it does not measure model speed.

Evidence: e44aa44509154ccdbaf34951996cb5bf; zero-based stored event indices 23, 34. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Actual edit diff: simulated sleep precedes the short locked update. This counter result is tested on a single event loop; it does not establish thread safety.

## 90. Pro: a different repair, the same passing result

[Cut slide 90](http://127.0.0.1:5173/s/odsc-cut-review?p=90)

Conversation 04G: Pro: a different repair, the same passing result

Pro is the stronger-model option, and it takes a different route: it removes the yield inside the shared update. That works under this fixture's single-event-loop assumptions, and the repair passes too.

So the stronger model gives us a different implementation, but no correctness gain on this example. Flash was already sufficient. Pro also has a tool-argument error in its trace. Choose based on the result and the work required, rather than assuming the stronger model must be better.

Evidence: 5cc9324580344ba7b0e054513d27a983; zero-based stored event indices 17, 15. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Actual edit diff replaces the yielding read-modify-write with self.value += 1. Single-event-loop assumption applies. This counter result is tested on a single event loop; it does not establish thread safety.

## 91. Flash checks both the path and the contract

[Cut slide 91](http://127.0.0.1:5173/s/odsc-cut-review?p=91)

Flash checks name.is_absolute() before containment. The contract rejects every absolute name, even one pointing inside the allowed directory. Flash02 implements both that rule and resolved-path containment. The independent checker passes ten behavioral groups. This prepared fixture signposts safe functions and is not a blind audit. The run also used temporary helper files outside its boundary, so do not call it fully accepted. All attempts are in the next matrix; this is not a general cheaper-model-wins claim. The findings-count proxy was corrected after inspection of the output.

## 92. Pro checks containment, but misses one rule

[Cut slide 92](http://127.0.0.1:5173/s/odsc-cut-review?p=92)

Pro checks root != target and root not in target.parents. This checks resolved containment, but not whether the original name was absolute. An absolute path that stays inside the root therefore slips through the stated contract. This is Pro02, not Pro01; do not borrow the other attempt’s final-answer overclaim or reproduction transcript. The external checker supplies the missing-case evidence. Both selected runs used out-of-workspace helpers. Pro repeated this miss on one fixture under one prompt; that is not a general model ranking.

## 93. No security attempt met every acceptance criterion

[Cut slide 93](http://127.0.0.1:5173/s/odsc-cut-review?p=93)

Here is the whole security batch, including the timeout. Flash has two behavioral passes, but the selected run used out-of-workspace helpers and the later run wrote a memory file. Pro misses the same absolute-name rule in all three attempts on this fixture. These results do not establish a general model ranking. No attempt satisfies every protocol criterion. Our fixture marks safe functions and has a known answer key. We corrected a findings-count proxy after inspecting outputs. Choose models with representative acceptance checks; this exercise did not test an escalation policy.

## 94. Model labels do not replace acceptance checks

[Cut slide 94](http://127.0.0.1:5173/s/odsc-cut-review?p=94)

On the counter, both models satisfy the tested task through different changes. In the controlled security pair, Flash explicitly rejects absolute path names; Pro checks resolved containment but accepts an absolute name inside the allowed root. That misses the written contract. Both selected security attempts also have scope deviations. We should neither erase the useful repairs nor call the runs fully compliant. This does not establish that Flash is generally better or that Pro would rescue a failed Flash result. Choose using task-specific checks and verify any escalation.

## 95. Earlier experiment: model choice reduced this bill

[Cut slide 95](http://127.0.0.1:5173/s/odsc-cut-review?p=95)

[workshop-4-repeated-result] Workshop 4: Model routing

Under the original checks, Opus on every task passes twelve of twelve with a median four-task bill of about 88 cents and elapsed time of 116 seconds. Haiku for repairs and Opus for security also passes twelve, at about 52 cents and 206 seconds. The lower bill comes with a longer wait.

Haiku everywhere passes nine, missing the three security reviews. The smaller-first cascade passes eleven at about 63 cents. It uses an LLM judge between tiers and different attempt budgets, so it is a comparison of strategies rather than an isolated switching experiment.

The bill and time are medians for complete four-task sets. We designed the mixed rule around these tasks; its performance on new work remains untested.

The security component is rubric coverage. These historical totals do not establish that every security claim was correct, or predict the bill for the current Flash/Pro practice.

Current classroom archive: Flash and Pro both pass the async repair checks. The controlled reproduce-and-repair pair scores 10/10 versus 9/10 behavioral groups, with scope deviations in both. The complete security matrix includes all attempts. These examples do not run a routing policy or reproduce the historical Haiku and Opus bill above.

## 96. Specify the model choice and the escalation evidence

[Cut slide 96](http://127.0.0.1:5173/s/odsc-cut-review?p=96)

[workshop-4-debrief] Workshop 4: Model routing

The mixed rule preserved twelve passes under the original checks with a lower bill than Opus everywhere, while taking longer. Haiku handled the three repairs and Opus covered the security-review rubric. Validate the findings themselves before using this rule for real security reviews.

The cascade still missed a requirement. It used an LLM judge rather than an external verifier after each tier, with different attempt budgets. That leaves verify-then-escalate as a follow-up experiment.

Specify a starting model, an observed failure that triggers escalation, a final check, and a budget. Test the rule on new tasks. Also count what happens to the conversation’s cache when you switch models.

## 97. Cursor reports 30–50% savings from routing coding work

[Cut slide 97](http://127.0.0.1:5173/s/odsc-cut-review?p=97)

[cursor-routing-savings] Model routing

Cursor's July 22, 2026 report supplies a production coding example alongside our workshop. Three high-volume early-access enterprise accounts with thousands of users reported 30 to 50 percent savings on Auto-routed requests. The comparison is what they paid against the same traffic priced entirely at Opus 4.8 API rates. It is not a randomized comparison of those accounts completing identical tasks on Opus alone.

Cursor reports no quality decrease. Its quality measures are user satisfaction inferred from subsequent responses and the share of generated code retained in the codebase. These are production signals, not independently verified task correctness. The company says its reported savings include cache-miss costs. The chart here simply normalizes the reported savings range to a baseline of 100; it does not invent individual customer values.

This is vendor-reported evidence of routing savings in real coding traffic. Our own acceptance checks still determine whether a routing policy works for our tasks. The next slide explains why cache reuse belongs in that cost calculation.

Source: https://cursor.com/blog/router

## 98. Switching models can trade away cache reuse

[Cut slide 98](http://127.0.0.1:5173/s/odsc-cut-review?p=98)

[routing-cache] Workshop 4: Model routing

Anthropic’s prompt caches are model-specific. Switching models during a long conversation can require processing the history again.

A task boundary or bounded subtask can limit the context transferred to another model. Mid-task escalation can still be worthwhile, but include the cache tradeoff when measuring its benefit.

Build: start with same-model prefix reuse; reveal switching to another model and processing the history again. Cache keys and support vary by provider. The cited Anthropic example concerns model-specific prompt caches.

## 99. Try again before moving to a better model

[Cut slide 99](http://127.0.0.1:5173/s/odsc-cut-review?p=99)

[109] Workshop 4: Model routing

This reported comparison puts two GLM attempts at 57.8 percent and $7.90 against one Sonnet attempt at 52.7 percent and $25.84.

The extra attempt is another way to spend a budget. Best-of-two also needs a way to select the better result; the aggregate comparison does not give a production system an oracle. Include the selector or verifier when designing and costing the policy.

## 100. Choose the next model using observed results

[Cut slide 100](http://127.0.0.1:5173/s/odsc-cut-review?p=100)

Agent-as-a-Router chooses which model handles a coding task. Follow the loop: choose the model, execute its code in a sandbox, and record the verified score and cost with the task and model. On a later task, retrieve relevant past outcomes to inform the next choice. That is execution feedback changing the evidence available to the router, not necessarily retraining model weights.

This diagram redraws the paper’s method; it is not a claimed individual run or a guaranteed switch after one failure. The verifier must measure the requirements we actually care about.

Now move inside a task: can we delegate individual choices without asking the main LLM every time?

Source: Zhou et al., Agent-as-a-Router, section 3.3 and Figure 2. https://arxiv.org/html/2606.22902

## 101. Jev defers when uncertain—and acts when confident

[Cut slide 101](http://127.0.0.1:5173/s/odsc-cut-review?p=101)

Here is an actual recorded example from the Jev paper: a customer-service agent is asked to cancel an order. At step three, Jev is split between asking the customer and cancelling. Its confidence is below the fitted threshold, so the LLM takes over and asks the customer. At step four, Jev confidently chooses cancellation, then selects the order and reason. The tool runs without an LLM call for those decisions.

The distinction from the previous slide is the decision being delegated. Agent-as-a-Router selects a model for a task using execution history. Jev can select a tool or an argument within a task, with an LLM fallback. The threshold is fitted on separate trajectories; it is not a universal confidence cutoff.

This is a mechanism example, not proof that delegation always helps. The paper also documents confident mistakes and weaker transfer. In its tested Flash cascade, cost fell 14.2 percent with unchanged outcomes on 500 synthetic tasks; that is separate aggregate evidence, not the measured saving for this one example.

Source: Zhu et al., JevAgentHarness, section 2, Figure 6, section 7.2. https://arxiv.org/html/2610.21412v1

## 102. Model routing: debrief

[Cut slide 102](http://127.0.0.1:5173/s/odsc-cut-review?p=102)

[debrief-routing] Model routing

In our four-task comparison, using the smaller model for three repairs and the larger model for the security review preserved the verified outcomes with a lower bill than the larger model everywhere, while taking longer. That is evidence for the tested task rule, not a general difficulty classifier.

Define the requirement, starting model, and evidence that would trigger escalation. Include retries, the judge or verifier, and lost cache reuse in the full cost. Check whether the policy preserves the outcome we care about. The cascade missed one requirement, so the decision about when to escalate needs its own evaluation.

Next we ask what evidence allows the system to stop.

## 103. Goals and stopping

[Cut slide 103](http://127.0.0.1:5173/s/odsc-cut-review?p=103)

[section-5] Goals and stopping

A goal needs a way to check progress. This section looks at when another attempt helps and what evidence lets the agent finish.

## 104. GPT-6 Astra showed that a software factory can run without making progress

[Cut slide 104](http://127.0.0.1:5173/s/odsc-cut-review?p=104)

[armin-factory] Workshop 5: Goals, validation, and stopping

Armin Ronacher reported stopping a GPT-6 Astra software-factory run after 35 hours, about a billion tokens, roughly $1,200, 79 commits, and 75,000 net lines. His assessment was that it delivered “absolutely nothing of value.” These are figures and judgments from his account.

Commits and continued execution were insufficient evidence of useful progress. Behavior checks and review of the resulting code need to influence continuation. Set a hard budget, provide an interruption path, and preserve the state when there is no credible next repair.

This motivates a measurable goal and a continuation policy, not simply asking the agent to run longer. First, let’s look at why verification supplies such useful feedback and how to build it into the agent.

## 105. Verifiable outcomes give learning a signal

[Cut slide 105](http://127.0.0.1:5173/s/odsc-cut-review?p=105)

Build: reveal code and Test cases first; then math and Lean verifier. These are conceptual illustrations, not captured outputs or paper benchmark examples.

Verification is one important reason coding and mathematics have been productive domains for reinforcement learning. DeepSeek-R1 describes using predefined tests to score competition code and rule-based checks for mathematical answers. AlphaProof searches for formal proofs in Lean and uses verified proofs to reinforce its model. These give learning a concrete signal beyond whether an answer sounds convincing.

This is evidence for a mechanism, not a claim that verification alone explains all progress in software engineering or mathematics. Tests cover selected behaviors; a proof establishes a formal statement under its assumptions. Neither automatically proves that we specified the right real-world task.

There are two different loops. During training, rewards update the model. During deployment, an agent can run checks, inspect failures and repair its work without changing its weights. Our harness controls that second loop.

Sources: DeepSeek-R1, section 2.2, https://arxiv.org/html/2501.12948v2 ; Google DeepMind, AlphaProof, https://deepmind.google/blog/ai-solves-imo-problems-at-silver-medal-level/

## 106. Build verification into the agent’s control loop

[Cut slide 106](http://127.0.0.1:5173/s/odsc-cut-review?p=106)

A goal tells us what we want. Verification specifies what evidence would justify saying we achieved it. Define that evidence before the agent works. For a code repair, use tests, exact-output checks and invariants against the current files. Protect the acceptance criteria so changing the test does not silently redefine success.

For qualities such as clarity or completeness, use an explicit rubric and require evidence for each judgment. A rubric makes expectations inspectable; it does not make a model judge infallible. Keep human review where the consequence or ambiguity calls for it.

Then wire the result into the controller. If the checks pass, accept only the covered requirements. If a specific failure is repairable and budget remains, return it to the agent. If blocked or out of budget, stop and report incomplete. Also check scope and permitted actions: a correct artifact does not excuse an unauthorized action.

This is our design synthesis. In the upcoming native goal-mode example, the model judge reads the trace; it does not itself execute the independent checker. Keep that distinction visible. The later compiler and AutoResearch examples show how useful feedback can guide repeated work.

## 107. Workshop 5: Who sends the next instruction?

[Cut slide 107](http://127.0.0.1:5173/s/odsc-cut-review?p=107)

This replaces the weak repair comparison with a deliberately staged checkpoint. The daily report already works but its reconciliation sidecar is missing. We explicitly tell the agent to inspect and stop first, then repair on continuation. The first stop is required by the exercise, not an accidental premature completion. Both ordinary and native modes eventually pass all eight independent checks. We are studying who supplies continuation and how the evidence supports acceptance.

## 108. Goal mode checks for unfinished work

[Cut slide 108](http://127.0.0.1:5173/s/odsc-cut-review?p=108)

Goal mode keeps an objective active after the agent stops. A separate model judge reads the conversation. If it finds unfinished work, the controller returns that feedback and starts another run, up to the review limit. Here the limit is two reviews. The judge does not execute tests. Our independent checker runs the report builder afterward and checks both required artifacts. In the ordinary condition, our script sends the verifier feedback as a follow-up. Both conditions start with an instructed inspection-only stop.

## 109. A green smoke test can leave half the contract unmet

[Cut slide 109](http://127.0.0.1:5173/s/odsc-cut-review?p=109)

The existing smoke test covers the report and passes. Our external checker also requires reconciliation.json across mixed, empty, pending-duplicate and CLI cases. That prepared checkpoint passes four of eight checks because the sidecar is absent. This gives the reviewer a concrete unmet deliverable. The repaired ordinary and native products both pass eight of eight. The check is separate from the native model judge, which reads the conversation.

## 110. A verifier can resume an ordinary run

[Cut slide 110](http://127.0.0.1:5173/s/odsc-cut-review?p=110)

Conversation 05D: A verifier can resume an ordinary run

Show: The actual Canvas user-message crop supplies external verifier feedback after the initial inspection. This is the new ordinary checkpoint run, not the old slugify example.

Say: We prepared the unfinished daily report deliberately. The first pass was instructed to inspect without editing; its stop is not a natural model failure. The report-only smoke test was green, but reconciliation was missing. Our harness sent this continuation and the owner repaired it. The final independent checker executes mixed input, empty input, pending retransmission and CLI cases, checking both artifacts: eight of eight pass.

Limit: Ordinary resumption succeeds too. The lesson is who supplies continuation, not a correctness advantage. The owner later issued rm -rf against the newest /tmp/tmp* path without establishing ownership. The selected target is unrecorded; final workspace hashes cannot certify global scope. Preserve that qualification and do not repeat the cleanup. No timing or cost comparison.

Evidence: conversation 4a8512e2-3bf0-48ec-ad4e-f057ebe57e4c; inspection finish 04503031-9811-43a5-b195-50c753194484; harness continuation 22a384b1-a3f0-4472-ad6c-0b62bc34c067; unsafe cleanup action 7248b30c-19e9-402d-9140-fac2e5ecb257. Screenshot is an actual unmodified Canvas UI browser crop. Full sanitized conversation: teaching-history-05D.html. Original runs were not repeated for this slide.

## 111. Native review rejects, continues, then accepts

[Cut slide 111](http://127.0.0.1:5173/s/odsc-cut-review?p=111)

In the native trace, the first review explicitly rejects the inspection milestone as incomplete. Canvas then sends the continuation instruction, the agent implements the missing sidecar, and the second review accepts. The independent executable checker also passes eight of eight. These are distinct observations. The reviewer’s score is not an independent test score. Two reviews were permitted, and acceptance occurred on the second. This is a demonstration of bounded native continuation, not proof that goal mode improves correctness.

## 112. Native review supplies the next instruction

[Cut slide 112](http://127.0.0.1:5173/s/odsc-cut-review?p=112)

Conversation 05E: Native review supplies the next instruction

Show: The actual Canvas chat first says the checkpoint remains incomplete, then the owner acknowledges the continuation stage and begins repair.

Say: This first pass was deliberately instructed to inspect without edits. Native goal review judged that stop against the full acceptance contract, rejected completion, and sent a continuation requesting the missing sidecar and verification. This demonstrates productive continuation from a staged checkpoint, not rescue of a naturally observed failure.

Limit: Stock Canvas 1.27.1 hides active goal-state events and internal native follow-up messages from chat. The image therefore shows the inspection and owner acknowledgment, not a visible reviewer bubble. Use the linked full event history for the exact rejected verdict and native continuation. Do not substitute an event API screenshot and label it native chat. No harness repair follow-up was sent to this native conversation.

Evidence: conversation e0888cd3-5020-4ab9-b342-0c9868182789; inspection ed1013dc-02d5-4939-8142-8e1c1559c661; rejected verdict e5b4b731-52bf-400a-9148-081320e55bea, iteration 1, complete false, score 0; automatic continuation c8eb34ea-e333-405c-8069-1b02f8cced3d; acknowledgment/first repair 3ed56da8-ac98-4a3f-8eb5-4e599b58d2d7. Actual Canvas UI crop from native-ui-acceptance/01b-native-checkpoint-and-ack-crop.png; full sanitized evidence teaching-history-05E.html.

## 113. Goal accepted. Independent checks also pass.

[Cut slide 113](http://127.0.0.1:5173/s/odsc-cut-review?p=113)

Conversation 05E: Goal accepted. Independent checks also pass.

Show: The actual Canvas completion message and separate actual native status strip, Round 2/2 complete and score 100 percent. Editable text reports the separately executed checker result for both runs.

Say: Repair produced the missing reconciliation artifact and passed the owner tests. Native review accepted on the second and last allowed audit. Our independent checker separately executes the implementation and passes all eight checks. Both ordinary resumption and native goal mode recover; this demonstrates who issues the continuation, not superiority.

Limit: The judge reads transcript evidence; it does not execute our independent acceptance checks. Score 100 percent is the judge verdict, not an empirical success rate. Acceptance at audit two is not a capped stop. The initial checkpoint and no-edit inspection were deliberately staged. Final workspace checks do not prove global isolation: ordinary used an unsafe temporary-path cleanup; native proposed outside-workspace scripts that the terminal rejected before it used python -c. Ambient context was injected despite requested flags and redacted only from the portable archive. No timing or cost comparison.

Evidence: native finish ef732caa-bccd-492c-8059-05a3e7498985; complete goal-state 9eb59506-0255-4a97-b951-78640446b0fe, iteration 2, active false, complete true, score 1. Independent final checks are retained in runs/native/run.json and runs/ordinary/run.json under outputs/w5-checkpoint-20261018. Actual UI crops: 04-native-complete-verdict.png and 04b-native-complete-status-strip.png. The source screenshot is clipped to the completion paragraph without changing its text. Full sanitized conversation teaching-history-05E.html.

## 114. Both recover; the continuation mechanism differs

[Cut slide 114](http://127.0.0.1:5173/s/odsc-cut-review?p=114)

Both modes repair successfully. The difference is the source of the next instruction: external orchestration in ordinary mode, native goal review in the other. Retain the scope qualification: ordinary issued unsafe cleanup against a newest /tmp path whose ownership could not be verified, while native attempted temporary scripts that the terminal rejected. The saved final workspace does not certify global action compliance. Do not recommend that cleanup pattern. The original blocked slugify run stays reserve evidence for a capped stop, not part of this comparison.

## 115. A goal persists.A plan changes.Evidence decides when to stop.

[Cut slide 115](http://127.0.0.1:5173/s/odsc-cut-review?p=115)

The objective still requires both report.json and reconciliation.json. After inspecting the repository, the agent needs a plan for creating and checking those artifacts. Completing its first plan does not establish that the required result exists.

## 116. Goals define success. Plans choose the next steps.

[Cut slide 116](http://127.0.0.1:5173/s/odsc-cut-review?p=116)

The goal requires a valid report and reconciliation file. The plan might start with inspecting the input, implementing the report, then checking the totals. If the reconciliation file is still missing, the plan needs another step while the goal stays the same. That is what the incomplete checkpoint makes visible.

In the native run, a model judge read the transcript and requested continuation. The independent executable checker ran afterward. Those are different sources of evidence. On resumption, inspect the current workspace, carry forward the missing requirement, and keep the stop limit explicit.

## 117. The right result can still fail the task

[Cut slide 117](http://127.0.0.1:5173/s/odsc-cut-review?p=117)

CMU’s computer-use example asks for a blue mug under twenty dollars in the cart, without purchasing it. The agent selects an eighteen-dollar mug, adds it, then places the order. The item is right, but the purchase violates the request. A result checker can miss what happened along the way.

Our ordinary report run makes that issue concrete. Its final product passes eight checks, but it also attempted cleanup of the newest temporary directory without establishing ownership. Passing output checks cannot justify that action. A controller can block forbidden actions before execution; a later audit cannot undo them.

Source: JY Koh, CMU 11-768, Lecture 7, PDF pages 17 and 39. https://www.cmu-agents.com/slides/lecture-07-computer-use-agents.pdf#page=39

## 118. AutoResearch keeps a change only when the metric improves

[Cut slide 118](http://127.0.0.1:5173/s/odsc-cut-review?p=118)

[140] Workshop 5: Goals, validation, and stopping

On the left is the experiment loop. A human sets the research direction in program.md; the agent edits the training code, runs a five-minute training experiment, evaluates it, and keeps or discards the change. It records the result before trying again.

On the right is the original progress chart from Karpathy's AutoResearch repository: 83 experiments and 15 kept improvements. The vertical axis is validation bits per byte, where lower is better. The green staircase shows the running best; gray dots show discarded experiments. Progress accumulates because the loop retains the better result, not because every attempt improves.

This is one reported run, not a controlled estimate of how much autonomy helps. The chart includes changes to training configuration and even the random seed, so do not describe every gain as a new research discovery or guaranteed generalization.

Connect this back to the previous slide: we need a check that means something. Here the validation metric decides what survives. The five-minute budget bounds each training experiment, not the whole agent session. Our loop illustration includes an overall stopping criterion; the operator still needs to set session limits and decide when to review the accumulated changes.

Source: https://github.com/karpathy/autoresearch and https://github.com/karpathy/autoresearch/blob/master/progress.png. Original chart retrieved October 11, 2026.

## 119. A test oracle helped agents turn a large goal into fixes

[Cut slide 119](http://127.0.0.1:5173/s/odsc-cut-review?p=119)

[compiler-goal-evidence] Workshop 5: Goals, validation, and stopping

This clean-room reimplementation is a useful practitioner example of test-guided persistence. Carlini reported that the compiler team stalled on the Linux build because agents kept tackling the same failure. His revised harness compiled most files with GCC and selected files with the new compiler, isolating where a failure originated. That gave agents specific repairs to pursue.

The reported project produced a compiler that built Linux 6.9 after roughly two thousand sessions, sixteen agents, two weeks, and twenty thousand dollars. It still used external assembler and linker tools, required GCC for the x86 boot stage, and was not a production replacement.

The lesson is that a large objective becomes actionable when a trusted reference exposes a failing behavior. This case does not isolate the benefit of goals, tests, or multiple agents. It illustrates their use together. It is not an evaluation of our native goal command.

Source: Nicholas Carlini, Anthropic, February 5, 2026. https://www.anthropic.com/engineering/building-c-compiler

## 120. An external goal can restart an unfinished task

[Cut slide 120](http://127.0.0.1:5173/s/odsc-cut-review?p=120)

[verifier-next-action] Workshop 5: Goals, validation, and stopping

The saved goal sits outside the agent's immediate plan–act–observe loop. It remains available when the agent yields or thinks it has finished. The harness then compares the available evidence with that goal.

Trace the blue return arrow. If the work is unfinished, there is a credible next action, and budget remains, the harness asks the agent to continue. That is how an external goal can keep work moving beyond one apparent stopping point. It does not make the plan correct or create a path around a real blocker.

Use the report example: the target requires both report.json and reconciliation.json. If reconciliation is missing and repair is allowed, continue with that specific failure. If editing is forbidden or the review limit is reached, stop and report incomplete. If the required checks pass, finish and cite their results.

This is a conceptual harness design. In our native-goal workshop, the completion judge reviewed conversation evidence; it did not execute tests. The independent assertion was run afterward, so do not imply that assertion automatically triggered native-goal continuation. A production harness can wire executable checks into this review, but that is a separate implementation choice.

The goal supplies continuity. Evidence and limits determine whether another attempt is justified.

## 121. Before acting: choose the execution boundary

[Cut slide 121](http://127.0.0.1:5173/s/odsc-cut-review?p=121)

[146] Workshop 5: Goals, validation, and stopping

Keep this distinction short: before an action runs, decide what effects it is allowed to have. Reading files can use read-only access. Edits and tests belong in a resettable sandbox. Publishing, purchasing, or deploying needs the required authorization before execution.

A reset cannot reliably undo money spent, a message someone has read, or a production change. Keep external effects out of the retry loop until authorized, and maintain visible progress and an interruption path.

This is the permission boundary. The next slide is about a different boundary: what evidence lets the agent declare completion.

## 122. The harness can reject “done” when the evidence is missing

[Cut slide 122](http://127.0.0.1:5173/s/odsc-cut-review?p=122)

[135] Workshop 5: Goals, validation, and stopping

The harness engineering contribution here is enforcing the evidence requirement for a goal. The model can propose that it is done. The surrounding software decides whether to accept that completion claim. A reminder in a prompt is not the same as an executable check at this boundary.

Follow the diagram. The harness compares the supplied evidence with the required outcomes. If support is missing, it rejects COMPLETE and returns the unmet requirement. A useful repair can then proceed within the run limits; if blocked, the run reports incomplete.

The paper implements this with a trusted contract, evidence ledger, typed certificate, and deterministic verifier. In 66 incomplete checkpoints across 22 held-out task clusters, unsupported stops were forty for the comparison controller and zero for the gate. This checks support in the recorded trace under its assumptions, not external truth or overall code quality. Rejecting a false completion claim does not guarantee the task will be repaired.

For our report task, the analogous design would require evidence for both artifacts and the acceptance results before accepting success. That is an illustrative extension, not what the native-goal judge in our workshop executed. We finish the section by returning to what that workshop actually showed.

Source: https://arxiv.org/abs/2608.23623v1

## 123. Goals: require evidence and control continuation

[Cut slide 123](http://127.0.0.1:5173/s/odsc-cut-review?p=123)

The native review rejected our deliberately incomplete milestone, sent continuation, and accepted the repaired result. Ordinary resumption also succeeded. Define done in observable artifacts and checks. Decide who reviews a stop, which feedback makes another attempt useful, and when to stop incomplete. Keep independent executable acceptance separate from a model reading the transcript. Our examples demonstrate this control mechanism, not superiority or automatic recovery from an accidental failure.

## 124. Multiple agents

[Cut slide 124](http://127.0.0.1:5173/s/odsc-cut-review?p=124)

[section-6] Multiple agents

Now we compare one agent with a team. We will look at the work we can separate and the coordination required to bring it back together.

## 125. Multi-agent means dividing work across agent contexts

[Cut slide 125](http://127.0.0.1:5173/s/odsc-cut-review?p=125)

By multi-agent here, I mean separate agent contexts with their own assigned work, coordinated toward a shared goal. They can all use the same underlying model. We are changing the organization of the work, not necessarily buying a different model.

On the left, a lead agent decides what to delegate, gives workers bounded tasks, and integrates the returned evidence. Anthropic’s research system uses this lead-and-subagent structure. For coding, workers might investigate separate parts of the repository. The lead still owns integration.

On the right, a builder produces a candidate and a reviewer investigates it and returns evidence. The builder can revise. A reviewer can use a fresh context, but that does not guarantee independent judgment or correctness; its findings still need checking.

These diagrams adapt Anthropic’s orchestrator-workers and evaluator-optimizer patterns. Those patterns can also be implemented as fixed LLM workflows; our workshop uses agent roles with tools and separate contexts. Multiple agents need not run simultaneously. The harness decides what each receives, what it may do, how results return, and when to stop.

Now the workshop asks whether the second context contributes enough useful evidence to justify its cost.

Sources: https://www.anthropic.com/engineering/building-effective-agents ; https://www.anthropic.com/engineering/multi-agent-research-system

## 126. Workshop 6: What does a second context contribute?

[Cut slide 126](http://127.0.0.1:5173/s/odsc-cut-review?p=126)

We use a reservation fixture with seeded defects and an explicit contract. The single agent gets the full contract and succeeds. In the team condition the owner delegates before reading code, giving the reviewer the contract without defect hypotheses. That allows us to inspect independent discovery. It does not show the reviewer found something the single-agent baseline missed. Separate product correctness, useful evidence and protocol compliance.

## 127. Two architectures for the same repair

[Cut slide 127](http://127.0.0.1:5173/s/odsc-cut-review?p=127)

The single owner inspects, repairs, tests, and reports. In the reservation team run, the owner delegates before reading the implementation. The reviewer gets the contract and workspace, without the owner’s defect guesses. It probes the starter and returns evidence for the owner to integrate. Both final products pass our external checker. The next two histories let us inspect whether the separate context adds useful discovery and whether the owner reports that evidence accurately.

## 128. The single owner already meets the contract

[Cut slide 128](http://127.0.0.1:5173/s/odsc-cut-review?p=128)

This is a deliberately prepared inventory candidate, not a naturally observed prior failure. The single owner checks atomic reservation, idempotent request IDs, cancellation and detached snapshots. Its final native terminal output shows 30 tests and OK. The same outside contract checker also passes. Establish this capable baseline before crediting another context. The count of owner tests is not a reliability score or an independent metric to compare across agents. Only inventory.py and test_inventory.py changed.

## 129. Independent discovery still needs a baseline

[Cut slide 129](http://127.0.0.1:5173/s/odsc-cut-review?p=129)

The owner delegates before reading the implementation. The child receives only the workspace path and the instruction to independently test the contract, without defect hypotheses. The screenshots show that untipped query and two supported observed failures: input aliasing and partial deduction after a reservation fails. This is independent discovery from the contract, rather than reproduction of owner-supplied guesses. The single owner fixes the same defects, and both final implementations pass the outside checker, so no correctness gain is demonstrated. Keep the qualifications: the reviewer wrote temporary probe files despite the read-only restriction, its report claims an extra deduction that its own output disproves, and the owner invents additional defects. The selected crops show supported evidence. Full parent and child histories and the complete outcome matrix remain linked.

## 130. A handoff can change the requirements

[Cut slide 130](http://127.0.0.1:5173/s/odsc-cut-review?p=130)

This is the separate ledger pair, 06E single owner and 06F unfinished team. The contract requires cents to match the ASCII integer grammar. In the actual native handoff, the lead adds a rule to strip trailing line endings; the worker implements that rule. An encoded cents field containing one followed by a newline must be rejected. The completed single agent rejects it, while the unfinished team snapshot accepts it as one cent. Our original checker misses the case too. The newline check was added after seeing the handoff and applied to both versions, so this is explicitly post-hoc evidence, not a preregistered benchmark win. Both snapshots pass the original checker; the team times out before owner integration. Some of the stranding comes from our budget design: one agent had 30 allowed iterations, while the team split the same allowance 14 plus 8 plus 8. Both children hit their eight-iteration caps. The native screenshot is the preserved lead instruction, not reconstructed UI. Full outcomes, including the scheduling reserve and scope deviations, remain available. No general model or team superiority follows.

## 131. Independent discovery still needs evidence review

[Cut slide 131](http://127.0.0.1:5173/s/odsc-cut-review?p=131)

The reviewer executed useful probes for aliasing, partial mutation, quantity validation, replay and cancellation behavior. Its summary also claimed an extra deduction that its own output did not support. The owner repeated that and added other unsupported starter claims. Show the actual probe outputs rather than counting claimed defects. The reviewer also used temporary files outside its instructed boundary. Both final products pass the external checker, while the team used 24 model calls versus the single agent’s 12. Equal allowed budgets did not mean equal usage, and this one pair does not estimate a general team advantage.

## 132. Earlier experiment: validation added time and tokens

[Cut slide 132](http://127.0.0.1:5173/s/odsc-cut-review?p=132)

[w6-evidence] Workshop 6: Multi-agent systems

Both candidates pass the same external checker and scope audit. The single-agent run takes 34.52 seconds, eight model calls, and 91,255 provider tokens. The worker and validator take 62.65 seconds, fifteen calls, and 181,347 tokens.

The thirty-call ceiling is shared, but actual expenditure differs. Tokens include cached input, repeated context, output, and all child requests. Run times exclude external verification, which takes about 3.2 seconds for each.

The checker verifies the count, concurrency, and allowed scope. Three unrelated starter failures remain outside this repair. One saved run per arrangement establishes neither a reliability ranking nor a general estimate of the validator’s value.

Current classroom archive: reservation 06C and 06D both pass the external behavior checker. The reviewer independently discovers real defects, but its report and the owner synthesis also contain unsupported claims, and temporary probe files violate the requested boundary. The pair uses 12 versus 24 model calls. Those counts and outcomes belong to the reservation task, not the historical totals on this slide.

## 133. Give each agent a purpose, a boundary, and a budget

[Cut slide 133](http://127.0.0.1:5173/s/odsc-cut-review?p=133)

[w6-debrief] Workshop 6: Multi-agent systems

Both arrangements passed the same independent checker. One agent already solved this scoped repair. A second context supplied fresh inspection and a handoff, with more time and provider tokens and no observed correctness gain in this pair.

Give each child a bounded task, allowed files, a budget, and an evidence requirement. Keep one owner responsible for shared edits and the final result. Count every parent and child call.

A separate run also showed that permission instructions can be violated. Test forbidden actions with a controlled runner before claiming that a child’s execution boundary is enforced.

Presenter reference: In the separate October 3 run, a child created Python cache files and redirected diagnostic stderr despite instructions forbidding those actions. The parent violated wording and redirection rules too. This was not part of the matched October 2 comparison and does not prove a failed test was hidden. An isolated checking environment and controlled runner remain a proposed improvement.

## 134. Multi-agent research scored 90.2% higher in Anthropic’s eval

[Cut slide 134](http://127.0.0.1:5173/s/odsc-cut-review?p=134)

[research-teams-evidence] Workshop 6: Multi-agent systems

Anthropic reported a 90.2 percent improvement on its internal research evaluation for an Opus 4 lead with Sonnet 4 workers versus one Opus 4 agent. This concerns evaluated research performance, not elapsed time or a 90.2 percent accuracy rate. The post does not publish the raw scores or precise aggregation behind this number.

Its evaluation discussion describes judging factual and citation accuracy, completeness, source quality, and tool efficiency. A concrete query was to identify board members across S&P 500 information-technology companies: independent searches let workers cover different companies before the lead synthesized the findings.

Compute was unequal. The post separately reports up to ninety percent less research time for complex queries using parallel agents and parallel tools; that is a different finding. Its fifteen-times-token comparison is against ordinary chat, not this single-agent baseline.

This is a positive vendor-reported system result. Next we examine requested reasoning budgets held constant.

Source: https://www.anthropic.com/engineering/multi-agent-research-system

## 135. You don't need multi-agent!

[Cut slide 135](http://127.0.0.1:5173/s/odsc-cut-review?p=135)

[noam-brown-swarm-quote] Multiple agents

Noam Brown made this assessment in his September 17, 2026 interview with Dwarkesh Patel, discussing OpenAI's reported Navier–Stokes result using roughly 10,000 agents. He attributed the core capability to a very strong underlying model that could work over long horizons and think in parallel.

His estimate of less than ten percent credit is an interview judgment, not a measured contribution. Brown explicitly said they had not yet run the single-agent experiment for Navier–Stokes, so they did not know how long one agent would take. He also described multi-agent execution as a way to scale test-time compute in parallel and reduce latency, at an efficiency cost. Do not interpret this as evidence that multiple agents provided no benefit or would not help.

A successful team run establishes that the system could do the work. It does not by itself isolate the value of adding agents. Compare with a strong single-agent baseline and account for model capability, total compute, time, and coordination. The next slide examines research with a shared requested reasoning budget.

Source: https://www.dwarkesh.com/p/noam-brown

## 136. At the same requested budget, multi-agent did not always win

[Cut slide 136](http://127.0.0.1:5173/s/odsc-cut-review?p=136)

[equal-budget-evidence] Workshop 6: Multi-agent systems

Tran and Kiela provide a different comparison, using a shared requested reasoning budget. Blue is the better of two single-agent variants. Brick is the best of the five multi-agent variants. Every row uses the 500-token requested thinking budget; all eight model and task pairs from Table 1 are included.

Read across one row. On DeepSeek-R1 with MuSiQue, the best single-agent accuracy was 38.3 percent and the best team architecture reached 33.2 percent. On Gemini Pro with FRAMES, the result reversed: 60.0 percent for the best single variant and 66.0 percent for the best team.

Single-agent point estimates were higher in five of eight rows. This is a descriptive comparison of selected variants, not a significance test or an independent validation of the best architecture. The original table's confidence intervals overlap in some close comparisons; its bold grouping includes a single-agent variant in six of eight rows. Overlapping intervals do not prove equivalence.

Qwen3 is Qwen3-30B-A3B; DeepSeek is R1-Distill-Llama-70B; Gemini models are 2.5 Flash and Pro. The two single variants are SAS and SAS-L. The teams include sequential, subtask-parallel, parallel roles, debate, and ensemble. The authors note Gemini did not always follow the requested reasoning budget. These are multi-hop reasoning tasks, not a coding benchmark.

The practical question is whether a team beats a strong single-agent baseline at comparable resources on your task.

Source: https://arxiv.org/pdf/2604.02460v2, Table 1. Original table retained in assets/tran-table1-primary.png.

## 137. The same team architecture can help one task and hurt another

[Cut slide 137](http://127.0.0.1:5173/s/odsc-cut-review?p=137)

[task-structure-evidence] Workshop 6: Multi-agent systems

Kim and colleagues compared 260 configurations across six benchmarks. These two original Figure 2 panels show why the task matters. Finance Agent rewards decomposable analysis: every tested team architecture improved on the single-agent baseline. Centralized coordination gained 80.8 percent relatively, rounded to 81 in the figure.

On PlanCraft, every team architecture lost ground, with relative declines from about 39 to 70 percent. The sequential dependencies made coordination a poor fit. Read the same colors across both panels: a team design does not carry the same benefit from one task to another.

The percentages are relative changes, not percentage points. The broader study also found mixed browsing and terminal results and lower mean SWE-bench performance for the tested teams. Coding and terminal cells used only twenty tasks, so those estimates are imprecise.

Use task structure to choose a candidate architecture, then test it with your actual model and workload. Vals gives us a more recent coding example; Park then tests a different mechanism, sharing verified discoveries.

## 138. Agent teams cost more, with one significant score gain

[Cut slide 138](http://127.0.0.1:5173/s/odsc-cut-review?p=138)

[vals-agent-teams-2026-10-09] Workshop 6: Multi-agent systems

Vals compared single agents and teams on 50 web apps. Sol at medium effort gained 7.3 percentage points, while mean cost rose from $1.22 to $3.07 per app. The other three score differences were not statistically significant; that does not prove their effects are zero.

More reasoning was another option, with its own cost and time tradeoff. Each setup ran once per app, with unequal budgets and an added delegation instruction for teams. This does not isolate teamwork at equal compute. Choose the outcome you need, then compare the full cost of reaching it.

Presenter reference: Sol medium’s 95% interval was +2.3 to +12.4 points, p = 0.005. Sol max single-agent scored 89.0% at $4.82 and 38.4 median minutes, versus 84.9%, $3.07, and 11.9 minutes for the medium team. At max effort, Sol teams took 27.6 minutes versus 38.4 alone; Opus teams took 174.1 versus 74.7, at $122 versus $23.77 mean cost. Sol delegated early and tested integration; Opus usually established a shared contract and delegated in waves. Different harnesses prevent attributing cross-model differences solely to models. Uncertainty reflects variation across apps, not repeated runs. Sol cost assumes reported usage includes subagents and omits request-level long-context price adjustments Vals could not evaluate.

Source: https://www.vals.ai/blogs/multi-agent-vibe-code-bench
Linked post: https://x.com/ValsAI/status/2108608719420600709

## 139. Communicating teams helped sometimes

[Cut slide 139](http://127.0.0.1:5173/s/odsc-cut-review?p=139)

[test-time-communication] Workshop 6: Multi-agent systems

The answer is mixed, and the comparison is communication versus independent attempts—not simply five agents versus one attempt. Communicating teams shared verified discoveries through a log. The baseline ran agents independently and selected the best outcome afterward.

On ARC-AGI-3, five communicating Sonnet 4.6 agents solved eight percent of games; the best of five independent attempts solved 2.2 percent. Roughly thirty-three independent attempts were needed to match the team. Packing and MNIST compression also improved with sharing; the three original plots show these discovery tasks.

Terminal-Bench was different. Mean task success was 52.53 percent for one attempt, 62.36 percent for two independent attempts, and 60.67 percent for two communicating agents. So the team beat one attempt but not two independent attempts. This was a small descriptive comparison on 89 tasks, not a precise estimate of the difference.

The practical hypothesis is to share useful intermediate discoveries when other workers can verify and reuse them. The discovery tasks exposed that kind of feedback. Communication can also reduce diversity or create interference. Equal per-agent limits do not imply equal realized token cost, and independent best-of-k assumes a way to select a successful result.

Source: Park et al., arXiv:2609.21032v1, Figure 1 and Table 3. https://arxiv.org/pdf/2609.21032v1

## 140. Factory serializes code changes and parallelizes investigation.

[Cut slide 140](http://127.0.0.1:5173/s/odsc-cut-review?p=140)

[171] Workshop 6: Multi-agent systems

Factory’s policy separates changing shared code from independent investigation. It reports running one code-changing worker or validator at a time in Missions. Independent repository search, API research, and review can still run in parallel.

When workers change shared files, ownership and integration become part of the problem. Serializing writes trades potential throughput for fewer conflicting edits and incompatible decisions. It is one concrete policy to test. The question is which work separates cleanly and what evidence the owner needs to accept the combined result.

This is our practitioner example of an explicit coordination choice. Factory separates read-only investigation from changes to shared code. The policy addresses conflicting writes and integration risk; it is a design decision from a production coding system, not a controlled estimate of a performance gain.

## 141. Multiple agents: debrief

[Cut slide 141](http://127.0.0.1:5173/s/odsc-cut-review?p=141)

[154] Workshop 6: Multi-agent systems

More agents did not consistently produce better results. Separate independent work; define ownership and validation. Integrated quality, total cost, time, and coordination work.

A separate context can investigate an independent question while another agent works. The parent still has to assign the task, supply context, collect the result, and verify the combined outcome.

For parallel work, compare elapsed time saved with assignment and synthesis costs. For validation, measure whether the extra inspection catches relevant failures. The Vals study we just saw tested those tradeoffs across full web applications.

Across these studies, the decision is whether another context, independent search, or shared discovery improves the completed outcome enough to justify coordination. Compare against a strong single agent, include every parent and child call, and verify the integrated result.

## 142. Putting it together

[Cut slide 142](http://127.0.0.1:5173/s/odsc-cut-review?p=142)

[section-7] Putting it together

We have worked through six harness decisions. To close, we will connect them to the evidence, the execution boundary, and the next experiment you can run.

## 143. Six assumptions tested

[Cut slide 143](http://127.0.0.1:5173/s/odsc-cut-review?p=143)

[closing-six-decisions] Close

We tested six familiar assumptions. “Harnesses don’t matter. I’ll just use a coding agent.” We held the model and task constant and compared the repair, time, tool requests, and checks across harnesses. All three passed our small task; the incomplete token receipts did not support a billed-cost ranking.

“More tools make a better agent.” We saw a custom PR tool reduce collection work. Eight extra operations went unused and enlarged the tool definitions. Those trials did not establish a billed-cost or general confusion effect.

“More instructions, skills, and memory improve performance.” We looked at what helped to remember or retrieve, and what happened when guidance became stale or unnecessary.

“Use the strongest model for every task.” We compared whether cheaper models could pass the same checks and discussed what evidence justified escalation.

“Give the agent an objective and let it run.” We examined how to track progress and what evidence we needed before accepting that the work was complete.

“What you need is a multi-agent system.” We compared which tasks benefited and whether the gains justified the extra compute and coordination.

Those comparisons gave us a way to assess each assumption against evidence. I want to finish with three examples that reinforce why those comparisons matter. Each keeps the task model fixed, but they change different parts of the surrounding system.

Build: reveal one complete assumption and its corresponding question on each advance, for six advances total.

## 144. OpenAI reported ARC-AGI-3 rising from 13.3% to 38.3%

[Cut slide 144](http://127.0.0.1:5173/s/odsc-cut-review?p=144)

[020] Close

OpenAI reported holding GPT-5.6 Sol fixed while retaining private reasoning across actions and replacing rolling truncation with compaction. On the ARC-AGI-3 public task set, RHAE rose from 13.3 to 38.3 percent while output tokens fell sixfold.

Two settings changed together in this provider-authored comparison, so it does not isolate their separate contributions. The next example searches across configurations instead of manually selecting two settings.

## 145. Meta-Harness generates and improves harness code

[Cut slide 145](http://127.0.0.1:5173/s/odsc-cut-review?p=145)

[177] Close

This is the next step in harness engineering: an agent builds and improves the harness code itself. Meta-Harness searches over system prompts, tool definitions, completion checks, and context management while keeping the task model fixed.

Follow the loop. The proposing agent reads a filesystem of prior harness code, execution traces, and evaluation scores. It proposes a new harness, which is run on evaluation tasks with the frozen model. The code, traces, and scores are saved so the next proposal can diagnose failures and revise the harness. This is an iterative code-generation and evaluation process, rather than a one-time hand-written configuration. It does not mean the task agent rewrites its harness during every task.

How much did it help? With Claude Opus 4.6 on TerminalBench-2, Meta-Harness reported a 76.4 percent pass rate. The project compares that with 58.0 percent for Claude Code: an 18.4-percentage-point gap with the same task model. Against the stronger Terminus-KIRA baseline at 74.7 percent, the gain was 1.7 points. The size of the improvement depends on the baseline.

The benchmark has 89 tasks with five independent trials per task. The comparison systems’ scores come from the official leaderboard, so this is a reported same-model benchmark comparison, not our own controlled rerun. These pass rates also do not include the cost of searching for the harness.

The important result is that generated harness code can outperform hand-built harnesses on the evaluated tasks without changing the task model. The next example also uses execution feedback to improve the runtime.

Source: https://yoonholee.com/meta-harness/

## 146. Harness-R1 learns to repair the harness from failures

[Cut slide 146](http://127.0.0.1:5173/s/odsc-cut-review?p=146)

[179] Close

Meta-Harness showed an agent searching for better harness code. Harness-R1 trains the harness engineer itself to make better edits from failures.

Follow the diagram from left to right. A separate 9B engineer receives batches of failed target-agent runs and produces validated executable patches. These can change context and memory initialization, guidance before decisions, action validation, and recovery after feedback.

The target runs again with the patched harness. Task-success rewards train only the engineer, using reinforcement learning called GRPO after supervised initialization. The target model’s weights stay frozen during this process.

Across WebShop, ALFWorld, and DBBench, average success rose from 44.3 to 53.6 percent with Qwen3.5-9B: a 9.3-percentage-point improvement. In a separate condition, the researchers first fine-tuned the target. A target-specific engineer then improved its harness, raising success from 59.2 to 64.2 percent. Harness learning added value even after target training.

This August preprint shows a learned capability to edit the runtime around a model. The gains are specific to these evaluated environments. That brings us to the next question: what should we retest when the model changes?

Source: https://arxiv.org/abs/2608.02276v1

## 147. Model changes can make harness workarounds obsolete

[Cut slide 147](http://127.0.0.1:5173/s/odsc-cut-review?p=147)

[103] Close

This screenshot is a reminder of how the coding workflow has changed. In a chat-based workflow, the model returned code and we copied it into the project, ran it, and brought errors back. The person carried context and execution results between the chat and the development environment.

With a coding agent, the harness can connect the model to repository files, editing tools, execution, and checks. Meta-Harness and Harness-R1 show a further direction: generating and improving that surrounding software from execution feedback.

As models and workflows change, a workaround that once helped can become unnecessary or get in the way. Preserve stable repository facts, but retest model-specific prompts, tool interfaces, context policies, and routing.

Version the configuration and preserve failure cases so you can compare behavior over time. One boundary should remain explicit throughout those changes: what the agent’s commands can reach.

Visual: user-supplied screenshot of the ChatGPT 4 coding interface.

## 148. Mistakes can easily happen

[Cut slide 148](http://127.0.0.1:5173/s/odsc-cut-review?p=148)

[144] Close: Sandboxed execution

This screenshot reports deletion of a production setup, including a database and snapshots. It is an attributed incident report rather than an independently audited reconstruction.

The execution lesson is the available authority. Commands that can reach production can affect production. Separate the task workspace and runtime from that access unless the task requires it and the action is authorized.

## 149. Mistakes can easily happen

[Cut slide 149](http://127.0.0.1:5173/s/odsc-cut-review?p=149)

[145] Close: Sandboxed execution

Xingyao Wang points out that a local agent can inherit authority through environment variables, cloud CLIs, SSH configuration, and forgotten tokens.

A fresh runtime lets us choose what to supply deliberately. Moving execution to the cloud does not automatically remove risk; credentials granted there still carry authority. Inspect the actual credential injection and reachable services.

## 150. Whew! What we covered

[Cut slide 150](http://127.0.0.1:5173/s/odsc-cut-review?p=150)

[workshop-wrap-up] Close

We tested six themes: harness choice, tools, context and memory, model choice and routing, goals and validation, and multi-agent systems. We questioned the assumptions behind each one, inspected how the systems worked, and looked at results. Point to the six parts of the robot illustration: the body, tool, notebook and memory, head, goal and completion checklist, and teammate robots. These are design choices, not six sequential steps. The drawing is a visual shorthand for the workshop themes.

That gave us intuition about what changes agent behavior and evidence about where those changes helped, failed, or added cost. The results were specific to the tasks and setups we examined. They gave us a starting point for our own decisions.

We also practiced a method we can keep using. Establish a baseline with a saved task, starting state, and acceptance checks. Change one thing, verify the result, and compare quality, full cost, and time. Repeat the comparison as models, harnesses, and workloads change.

The reminder I want you to leave with is that harnesses matter. The software around the model shapes what it can do and how reliably it finishes the work. We now have a way to evaluate those choices rather than take the claims on faith.

The final step is to choose one experiment in your own workflow.

## 151. Your next experiment

[Cut slide 151](http://127.0.0.1:5173/s/odsc-cut-review?p=151)

[closing-next-change] Close

Pick one recurring failure in a workflow you use. Save the task, starting state, and acceptance checks so you can compare the same work. Then change one harness decision. For example, add a focused tool for a repeated retrieval step, or supply current project notes.

Check the result and count the full task, including repairs and verification. Measure time and price fresh input, cached input, and output separately. Check the files, credentials, and services the agent can reach.

Keep the change when the benefit justifies the tradeoff. An efficiency change should preserve verified quality. Better correctness or stronger isolation can justify additional cost. Rerun the comparison when the model or workload changes. The workshop repository has examples to start from.

## 152. Keep learning: CMU’s AI Agents course

[Cut slide 152](http://127.0.0.1:5173/s/odsc-cut-review?p=152)

If you want to go deeper after today, Graham Neubig and Daniel Fried teach CMU’s AI Agents course, 11-768. The course site links to the YouTube lectures, slides, readings, and assignments. Start with tool use, context management, skills and memory, or planning to revisit the decisions we explored today. Then follow the coding-agent and training material. Pick a lecture that connects to the experiment you want to try next.

Course: https://www.cmu-agents.com/
Lecture schedule: https://www.cmu-agents.com/#/schedule
YouTube: https://www.youtube.com/playlist?list=PLSN0qpDfUvTM

