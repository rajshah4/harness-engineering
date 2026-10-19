# Harness Engineering Workshop: cut-deck talk track

Synchronized October 18, 2026. Five video slides removed; 146 slide and narration entries follow the live deck. Classroom histories and earlier quantitative experiments are distinguished.

[Open the cut deck](http://127.0.0.1:5173/s/odsc-cut-review?p=1)

<!-- Source SHA-256: 044001b2c8f69c9f4309f0b9cb4809db92ac32560c52306e926aba4ddfbf99ed -->

## 1. The Design of Coding Agents: A Practical Workshop

[Cut slide 1](http://127.0.0.1:5173/s/odsc-cut-review?p=1) · [Original slide 1](http://127.0.0.1:5173/s/odsc-full-visual-review?p=1)

Today we’re going to look at how we build an agent around a model. We’ll start with an engine, then look at what changes when we put it to work in different environments.

By the end, I want you to have one harness decision you can test in your own system.

## 2. Toyota 2GR-FE engine reveal

[Cut slide 2](http://127.0.0.1:5173/s/odsc-cut-review?p=2)

This is a Toyota 3.5-litre V6 engine. What would you build around it?

Presenter reference: Image source: ProAuto, Toyota 2GR-FE engine product illustration: https://www.proautocorp.co.th/album/6697/oil-filter . Image URL: https://image.makewebeasy.net/makeweb/m_1920x0/WICr7yDy4/OEM/2GR_FE.png?v=202405291424 . Engine identity and vehicle applications are documented in the following comparison slide.

Build: show the engine first. Advance to reveal its name.

## 3. Toyota Camry → RAV4 → Lotus Emira

[Cut slide 3](http://127.0.0.1:5173/s/odsc-cut-review?p=3)

Versions of this Toyota engine family power a Camry, a RAV4, and a Lotus Emira. Lotus adds a supercharger, so these aren’t identical engine configurations. But the same engine family supports three very different vehicles.

Toyota knows the engine and builds complete cars. Lotus still has a reason to build a sports car around it for a different job.

That’s the argument for harness engineering. A model trained to work well with a provider’s harness gives you a reason to start there. You still have to check how well that setup fits your environment.

Presenter reference: Sources: Toyota 2GR-FE 3.5-litre V6 engine family. Camry North American V6: https://www.toyota-global.com/company/history_of_toyota/75years/vehicle_lineage/car/id60002185/index.html . RAV4 V6: https://assets.sia.toyota.com/publications/en/om-s/OM12V1QRG/pdf/2012%20RAV4.pdf and https://pressroom.toyota.com/2011-toyota-rav4-offers-new-extra-value-package/ . Lotus Emira V6 specification lists Toyota 2GR-FE and Edelbrock supercharger: https://media.lotuscars.com/en/models/emira.html . Shared engine family, not identical complete engine configurations. Photographs: Carvana 2011 Camry LE V6 listing https://www.carvana.com/vehicle/4097353 ; MotorTrend 2011 RAV4 Limited V6 road test https://www.motortrend.com/reviews/2011-toyota-rav4-limited-v6-first-test ; Lotus Cars official Emira launch.

Build: reveal Camry, then RAV4, then Lotus. Only vehicle images and names are visible. Toyota and Lotus specifications support the engine-family analogy; Lotus adds supercharging and its own integration.

## 4. Agent = model + harness

[Cut slide 4](http://127.0.0.1:5173/s/odsc-cut-review?p=4) · [Original slide 4](http://127.0.0.1:5173/s/odsc-full-visual-review?p=4)

Here’s how we’ll use the robot. The head is the model. It reads the input and chooses the next action. The body is the harness, the software that connects those choices to the environment.

The harness supplies context and tools, executes the requested action, and returns the result to the model. That cycle continues until the work finishes or the run stops.

We’ll keep using this robot to show which part we’re changing.

Presenter reference: robot body/model/tools metaphor inspired by Daniel Whitenack.

Build: start with the LangChain anatomy diagram, then reveal our robot interpretation. Model and harness labels remain with the robot. Source: https://blog.langchain.com/the-anatomy-of-an-agent-harness/

## 5. Build the harness for the environment

[Cut slide 5](http://127.0.0.1:5173/s/odsc-cut-review?p=5)

Now put our robot in a coding workspace, your factory, the ocean, or on Mars. Each environment changes what it can observe, which tools it needs, and how it checks its work.

OpenAI and Anthropic give us useful starting points for coding agents. Your own environment brings specific systems, permissions, and requirements. Even inside a software company, those can differ from one project to the next.

We want to understand which parts of the agent need to adapt to that job.

## 6. A fine-tuned 4B model with search beats larger models

[Cut slide 6](http://127.0.0.1:5173/s/odsc-cut-review?p=6)

Here is an interesting example of what the model can do with the right tool. On this evaluation, a fine-tuned Qwen3-4B with search scored 0.74 F1, ahead of GPT-6 Luna at 0.69 and Kimi K2.5 at 0.73. This combines task-specific training with tool access. We should credit both. The harness connects the trained model to the information it needs.

The chart also reports 0.39 after three fine-tuning epochs and 0.40 with RL. Eight epochs scored 0.53, and fine-tuning plus search scored 0.74. Those are different starting configurations, so the RL and search increments are not a controlled comparison of which intervention is universally better. GPT-6 Luna with two additional prompt sentences scored 0.81.

Source: chart supplied by Rajiv in this conversation, headed 'RL added 0.01. A search tool added 0.21.' F1 on 200 test patients. The original post, experiment details, and exact prompt sentences have not been independently verified. The supplied source candidates are https://x.com/adarshsolanki/status/2111554682418045340 and https://x.com/daniel_mac8/status/2111501909337210911 . Neither post has been mapped to this chart. Do not attribute it to either author without confirmation.

## 7. Harness engineering: what we will test

[Cut slide 7](http://127.0.0.1:5173/s/odsc-cut-review?p=7) · [Original slide 12](http://127.0.0.1:5173/s/odsc-full-visual-review?p=12)

To take advantage of the model, we also need to consider what we give it to work with. Which tools can it use? What context does it receive? What should it remember? How do we choose the model, check the work, and decide when to stop? Would another agent help?

Those are the choices we’ll work through today. We’ll inspect what happened, change a specific part, and check whether the change helped.

Build: reveal Harness, Tools, Context / Skills / Memory, Model, Goals / Checks / Stop, and Multi-agent in that order.

## 8. What harness are you using?

[Cut slide 8](http://127.0.0.1:5173/s/odsc-cut-review?p=8) · [Original slide 7](http://127.0.0.1:5173/s/odsc-full-visual-review?p=7)

A quick show of hands: which harnesses are you using? You can choose more than one, including a custom harness or none yet.

Keep your own setup in mind as we go through the examples. Where do you already have a useful baseline, and where does your environment need something different?

## 9. Provider harnesses are a good starting point

[Cut slide 9](http://127.0.0.1:5173/s/odsc-cut-review?p=9) · [Original slide 10](http://127.0.0.1:5173/s/odsc-full-visual-review?p=10)

I’d start with a provider’s harness. The ability to optimize a model and harness together is a reason to take that baseline seriously.

This FrontierCode figure reports coding scores against output tokens at different reasoning efforts. Claude models ran in Claude Code, and GPT models ran in Codex CLI. Model, reasoning effort, and harness vary across the chart, so it doesn’t isolate the value of one harness or establish an overall winner. More output also didn’t consistently produce a higher score.

We’ll use a working baseline, identify a specific failure, and test a change against it.

Presenter reference: supplied Sonnet 5.5 system-card screenshot, Figure 8.4.A, FrontierCode v1.1 Main. The output-token axis is logarithmic.

## 10. Consequences of a closed harness

[Cut slide 10](http://127.0.0.1:5173/s/odsc-cut-review?p=10) · [Original slide 11](http://127.0.0.1:5173/s/odsc-full-visual-review?p=11)

If we adapt an agent to our environment, we also need to consider whether we can take that work with us. Saved memory and workflows can become tied to the product that stores and loads them.

LangChain highlights this dependency. Workspace files are inspectable and versionable; provider-managed state depends on the available export and loading support. Before investing in that state, check whether another harness could actually load and use it.

## 11. Workshop roadmap: what we will test

[Cut slide 11](http://127.0.0.1:5173/s/odsc-cut-review?p=11) · [Original slide 13](http://127.0.0.1:5173/s/odsc-full-visual-review?p=13)

We’ll take the same approach through the workshop: explain the choice, inspect it in a concrete task, then look at the results and relevant research.

First, we’ll ask three harnesses to repair the same bug. Then we’ll change the tools used to explain a pull request and the saved notes supplied when adding a feature.

After that, we’ll compare model choices, inspect how a goal command handles unfinished work, and compare one agent with a worker and validator. We’ll account for the result and the work it took.

Some examples are repeated comparisons. Others are individual recordings or probes of command behavior. I’ll keep those distinctions explicit.

## 12. Open the saved workshop conversations

[Cut slide 12](http://127.0.0.1:5173/s/odsc-cut-review?p=12) · [Original slide 14](http://127.0.0.1:5173/s/odsc-full-visual-review?p=14)

Start with the supplied canvas-examples README. The HTML transcripts need no model key. The dedicated launcher uses pinned Canvas 1.27.1 and SDK 1.53.0 in a separate read-only archive; do not import into an active conversation store or use the normal server startup. These are inspectable histories, not resumable agent workspaces. Local acceptance passed. AWS acceptance is tracked separately in the instructor test matrix. The workshop page has practice prompts; model setup is only needed for optional new runs. The student ZIP and directions are published at https://github.com/rajshah4/learn-openhands-harness/releases/tag/odsc-conversations-2026-10-18. Use the named ZIP asset, not the automatic repository source archive.

## 13. Harness choice

[Cut slide 13](http://127.0.0.1:5173/s/odsc-cut-review?p=13)

We started with one engine family in different vehicles. Now we’ll keep the model and task fixed and change the harness around them.

Watch how each setup gathers information, takes action, and checks its work.

## 14. Workshop 1: Does the harness matter?

[Cut slide 14](http://127.0.0.1:5173/s/odsc-cut-review?p=14) · [Original slide 15](http://127.0.0.1:5173/s/odsc-full-visual-review?p=15)

A full page of results is losing its last item. We’ll ask three harnesses to repair that same small bug with the same model and user prompt.

The task is simple enough to inspect the whole process. We’ll look at how each run gathers information and what it checks before reporting completion.

## 15. Change the harness; keep the model/task fixed

[Cut slide 15](http://127.0.0.1:5173/s/odsc-cut-review?p=15) · [Original slide 16](http://127.0.0.1:5173/s/odsc-full-visual-review?p=16)

For classroom practice, keep the same resolved model, starter code, user prompt, and acceptance checks across OpenHands, Pi, and OpenCode. The workshop profiles use DeepSeek Flash. The prompt asks for the repair without changing tests, followed by tests and a final diff.

Changing the harness changes its instructions and action interface together. The following recorded takes illustrate possible action sequences. Fresh runs can choose different reads and checks, so inspect the actual conversation before describing its behavior.

## 16. One request can contain several operations

[Cut slide 16](http://127.0.0.1:5173/s/odsc-cut-review?p=16)

Conversation 01A: One request can contain several operations

Show: Expand the first terminal call and the final verification call.

Say: Count work inside requests, not just the number of requests.

Limit: This take batches work; batching is not guaranteed by the harness.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 7565473ddf0346adb9d6ba32a5cee17c; zero-based stored event indices 4, 10. The screenshot is an actual Agent Canvas capture with editable gold boxes and arrows added on the slide. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded terminal command, horizontally scrolled to the two file reads.

## 17. Separate file reads make a different trace

[Cut slide 17](http://127.0.0.1:5173/s/odsc-cut-review?p=17)

Conversation 01C: Separate file reads make a different trace

Show: Show the source read and test read as two distinct tool calls.

Say: The same repair can use a different action interface and sequence.

Limit: Brief comparison with 01A; no speed or quality ranking. Pending/completed ACP events do not prove a result arrived between requests.

Delivery: Brief comparison; move on once the contrast is clear.

Evidence: 61c63e8a31c645cab3cb4264a3f090e1; zero-based stored event indices 8, 9. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Two separate collapsed read-tool rows. This does not establish completion order.

## 18. Extra checks contain executable expectations

[Cut slide 18](http://127.0.0.1:5173/s/odsc-cut-review?p=18)

Conversation 01B: Extra checks contain executable expectations

Show: Expand the command containing assert p.items and its returned success line.

Say: An assertion turns an unexpected edge case into a failing check.

Limit: These are checks added during this run, not a comprehensive test suite.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 9ab0fd3de20b47f0a664316612b40e2d; zero-based stored event indices 20, 21. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Final assistant summary of extra behavioral checks. The underlying assertion command remains in the linked full history.

## 19. Compare harnesses

[Cut slide 19](http://127.0.0.1:5173/s/odsc-cut-review?p=19) · [Original slide 21](http://127.0.0.1:5173/s/odsc-full-visual-review?p=21)

The selected conversations have three OpenHands, five OpenCode, and nine Pi tool requests. OpenHands batches reads and final checks; OpenCode reads separately; Pi adds explicit edge assertions. All three pass the recorded checks. These selected examples illustrate different approaches, not a general ranking. Requests are not model calls or equal units of work. Original October 3 timestamps and the recorded DeepSeek v4.1 Flash model identity are preserved; historical harness runtime versions are unknown. No reruns or prompt changes were needed.

## 20. Same model. Same task. Different harnesses use tools differently.

[Cut slide 20](http://127.0.0.1:5173/s/odsc-cut-review?p=20) · [Original slide 22](http://127.0.0.1:5173/s/odsc-full-visual-review?p=22)

What worked: all three harnesses repaired the bug and passed the checks.

What we learned: their recorded reads, checking paths, and tool-request counts differed. One run each does not establish a general speed or quality ranking, and the token receipts are incomplete for two harnesses.

The harness lesson is to inspect the evidence produced before completion. Choose the checks your workload needs, then repeat the comparison to see whether the system produces them consistently.

## 21. The harness effect varied by model

[Cut slide 21](http://127.0.0.1:5173/s/odsc-cut-review?p=21) · [Original slide 23](http://127.0.0.1:5173/s/odsc-full-visual-review?p=23)

Our recordings showed different paths to the same accepted repair. This broader comparison asks how often each model and harness pairing passes.

8090 Labs tested seven models in five harnesses on 113 DeepSWE v1.1 bug fixes and features, running each task twice per pairing. They kept each model and its reasoning setting fixed across harnesses and graded with Datacurve’s tests.

GLM 5.3 Flash passed 24 percent in Codex and 59 percent in the DeepSeek harness, a 35 percentage point spread. GPT-5.6 Sol varied by only six points. The harness effect depended on the model; this doesn’t establish one universal best harness.

The provider’s own harness also wasn’t automatically the best pairing. Their Claude Fable 5.1 result was 41 percent in Claude Code versus 61 percent in Codex. For the GPT models and DeepSeek, the gap from their own harness to the best was within the authors’ noise threshold.

This is a vendor-run benchmark with two runs per task. The authors treat overall gaps of nine percentage points or less as within noise. It doesn’t isolate which harness component caused a difference or establish performance in our environment.

Presenter reference: Arjun Goray, 8090 Labs, Same Model, Different Harness, 9 October 2026, Figure 1 and methods. https://www.8090.ai/blog/same-model-different-harness . Public trajectories: https://www.8090.ai/blog/same-model-different-harness/runs . Figure 2 supports the provider-harness comparison in these notes.

## 22. Harnesses varied on accuracy, turns, and token use

[Cut slide 22](http://127.0.0.1:5173/s/odsc-cut-review?p=22) · [Original slide 24](http://127.0.0.1:5173/s/odsc-full-visual-review?p=24)

This comparison separates completion from process quality and resource use. No single measure captures every outcome we care about. A completed task can still involve unnecessary actions or expensive retries.

Choose the measure that represents the failure you want to fix, then inspect the trace behind it. The next examples move from general coding benchmarks to workflows built around a particular kind of work.

## 23. Snowflake's CoCo scored higher at lower cost

[Cut slide 23](http://127.0.0.1:5173/s/odsc-cut-review?p=23) · [Original slide 27](http://127.0.0.1:5173/s/odsc-full-visual-review?p=27)

In the saved Data-Eng-Bench figure, Snowflake CoCo with Opus 5 has higher pass@1 and lower cost per trial than Claude Code with Opus 5.

The GPT-5.6 Sol comparison shows the same direction. The Sonnet 5 comparison is roughly tied on pass rate.

The result motivates testing a custom workflow for the task, rather than assuming every customization helps.

The large annotation makes the baseline explicit: the Claude models were run in Claude Code, while the same models also appear in Snowflake CoCo. Do not describe the provider models as running without a harness.

## 24. Harvey’s custom harness improved diligence scores

[Cut slide 24](http://127.0.0.1:5173/s/odsc-cut-review?p=24) · [Original slide 28](http://127.0.0.1:5173/s/odsc-full-visual-review?p=28)

Harvey and Baseten reported scores of 23.3% and 62.4% across two diligence-review setups. The comparison used LLM judging against expert rubrics, and the RLM setup included fixed Qwen3.6 subagents.

This is a vendor-reported comparison with unequal compute. It motivates inspecting how document review and synthesis were organized. We need that mechanism and its resource cost before deciding whether it suits another workflow.

## 25. Harvey used a Python REPL and bounded subagents

[Cut slide 25](http://127.0.0.1:5173/s/odsc-cut-review?p=25) · [Original slide 29](http://127.0.0.1:5173/s/odsc-full-visual-review?p=29)

The root agent uses a Python REPL to delegate bounded document reviews. The subagents have no tools or REPL of their own. They return findings as variables, and the root selects what to print into its context before writing the memo.

For legal diligence, the checks include document coverage and supported findings. That is a different acceptance contract from a repository repair. Measure whether this division of work improves the memo enough to justify the extra compute.

Presenter reference: Harvey separately reported the Qwen root improving from 29.9% to 63.0% after training within the RLM setup. That is a different comparison from the preceding seven-model harness average.

## 26. Harness changes can bring bugs 😢

[Cut slide 26](http://127.0.0.1:5173/s/odsc-cut-review?p=26) · [Original slide 31](http://127.0.0.1:5173/s/odsc-full-visual-review?p=31)

Anthropic’s April 23 postmortem traced Claude Code quality complaints to changes around the model: a lower default reasoning effort, a bug that repeatedly discarded earlier reasoning after an idle session, and a prompt change intended to reduce verbosity.

The company reported that the API and inference layer were unaffected, and that the three issues had been resolved by April 20. This is a concrete example of why a model can appear worse when the surrounding software changes.

The engineering lesson is to record harness versions and settings alongside model versions, and test realistic long sessions as well as short tasks. Our next example shows a smaller mismatch between instructions and the tools actually available.

Source: Anthropic, An update on recent Claude Code quality reports, April 23, 2026. https://www.anthropic.com/engineering/april-23-postmortem

## 27. Pi’s four-tool setup still went wrong

[Cut slide 27](http://127.0.0.1:5173/s/odsc-cut-review?p=27) · [Original slide 33](http://127.0.0.1:5173/s/odsc-full-visual-review?p=33)

Pi is deliberately simple: read, write, edit, and bash. But having those four capabilities was not enough to make this particular setup work well. The model also received instructions carried over from Codex CLI, referring to apply_patch, a tool outside Pi’s four-tool interface.

Follow the mismatch in the diagram. The instructions expected one editing interface; the harness supplied another. In the interview, Mario recalls Armin complaining for several days that Codex behaved worse in Pi.

This is the failure story: a minimal harness still needs the model, instructions, and available tools to fit together.

The diagram illustrates their account, not a captured failed tool call. The interview does not provide an error trace, a quantified failure rate, or a controlled comparison of tool counts. Use it as a concrete practitioner example of a harness mismatch.

Source: Syntax 976, February 4, 2026, 48:56–49:49. https://www.youtube.com/watch?v=IPJ7Mp_ajuQ&t=2936s ; https://syntax.fm/show/976/pi-the-ai-harness-that-powers-openclaw-w-armin-ronacher-and-mario-zechner/transcript

Build: show the four-tool Pi setup, then reveal the inherited apply_patch mismatch, then the reported worse behavior. This is an attributed experience, not a measured ablation.

## 28. Hugging Face is measuring harness consistency

[Cut slide 28](http://127.0.0.1:5173/s/odsc-cut-review?p=28)

This is a brief mention of Hugging Face's ongoing open experiments, led by Younes Belkada. Rather than showing only a pass rate, they reran tasks and inspected how often success flipped, how many turns the agent took, and how input token use varied. The original chart supplied by Rajiv summarizes repeat-pair disagreement and variation averaged across tasks. The gray lines are 90 percent ranges from resampling tasks; overlapping ranges do not establish a reliable difference.

The initial experiment used harness defaults. OpenHands used a zero-temperature default while other harnesses had different sampling settings. That confounds any claim that one harness architecture is inherently more consistent. The thread's follow-up compares sampling settings and repeats selected tasks more extensively. It also investigates nondeterministic tool-output artifacts, such as package download progress, and an experimental IPython-only harness. Treat these as exploratory findings, not a production leaderboard or a universal recommendation for a minimal harness.

My talk track: I like that Hugging Face is opening up the experiment and looking inside the runs. A single successful demo is not enough. Repeat the comparison, control the sampling and environment, and inspect the trajectories as well as the score. This connects directly to our own repeated-trial method.

Sources: https://x.com/yb2698/status/2111136348480708740 and https://github.com/huggingface/ipython-harness

## 29. Harness choice: debrief

[Cut slide 29](http://127.0.0.1:5173/s/odsc-cut-review?p=29)

Our recordings reached the same accepted repair through different reads and checks. The broader research showed that changing the harness could change pass rates, with effects that depended on the model and workload. That supports testing the pairing rather than choosing from model scores alone.

Start with a working baseline. Match its instructions to its real tools, inspect its defaults, and change one decision at a time. Compare repeated tasks with stable acceptance checks and count the full work, including verification and recovery. A short run or fewer tool requests alone does not establish better quality.

Next we focus on the tool interface itself.

## 30. Tools

[Cut slide 30](http://127.0.0.1:5173/s/odsc-cut-review?p=30)

Now we change the tools the agent can use. The tool interface determines both the actions it can request and the evidence it gets back.

## 31. Tools and feedback in SWE-agent

[Cut slide 31](http://127.0.0.1:5173/s/odsc-cut-review?p=31) · [Original slide 35](http://127.0.0.1:5173/s/odsc-full-visual-review?p=35)

SWE-agent describes tools and feedback designed for the model operating on a repository. A small interface leaves more of the sequence to the model. A structured tool can supply part of that procedure. In either case, its result needs to support the next action.

We’ve compared complete harnesses. Now we’ll change the tools available for explaining one pull request.

## 32. Workshop 2: Do more tools make a better agent?

[Cut slide 32](http://127.0.0.1:5173/s/odsc-cut-review?p=32) · [Original slide 36](http://127.0.0.1:5173/s/odsc-full-visual-review?p=36)

We want an explanation of a pull request: what changed, how it works, and which tests were reported, with links supporting the answer.

We keep Sonnet 4.6 and that task fixed while changing the tools. We’ll compare adding operations with packaging a repeated collection procedure into one tool.

For classroom practice, use the same configured Flash model across tool variants. The Sonnet medians later in this section remain results of the recorded experiment.

## 33. Change the tools using a fixed task

[Cut slide 33](http://127.0.0.1:5173/s/odsc-cut-review?p=33) · [Original slide 37](http://127.0.0.1:5173/s/odsc-full-visual-review?p=37)

The task is to explain PR 16860. The terminal setup leaves the agent to write GitHub API commands and process their responses.

The four GitHub tools are separate operations: get PR details, list changed files, list commits, and read a file at a revision. The agent chooses which to call and can call the same tool repeatedly.

The twelve GitHub tools include those same four plus repository details, issue details, issue comments, PR reviews, review comments, check runs, revision comparisons, and commit details. These are read-only MCP wrappers built for this experiment. Four and twelve count the GitHub tools available, not the number of calls made or the agent’s other baseline tools.

The custom PR tool runs a prepared collection procedure and returns details, selected patches, reported checks, and links. The model still checks whether the evidence is sufficient and writes the explanation. This separates adding more tools from changing the shape of the work a tool performs.

Classroom route: use the supplied read-only conversations. The earlier experiment results remain separate evidence; do not apply their timing, token totals, budgets, or model identities to the classroom histories.

## 34. The retrieval work moved from the agent into the tool

[Cut slide 34](http://127.0.0.1:5173/s/odsc-cut-review?p=34) · [Original slide 39](http://127.0.0.1:5173/s/odsc-full-visual-review?p=39)

Every setup leaves the explanation to the model. What changes is who assembles the information-gathering sequence. The terminal leaves command composition and filtering to the agent. The 4 GitHub tools and 12 GitHub tools leave the sequence of operations and file choices to it. The custom tool runs a prepared collection procedure.

That is a harness-design choice: expose useful operations at a level suited to the workflow. It does not remove judgment. The custom tool selects three large production patches and two test patches, so a small important change can fall outside that selection. Keep the full file list and a way to request a missing file.

This slide explains observed retrieval behavior in the recording; the following slide reports the quantitative results. The custom tool packages collection work, while commands and individual tools leave more collection decisions to the model.

Conversation 02A: Terminal: the agent builds the retrieval procedure

With terminal access, the agent has to decide how to fetch the pull request and process the responses. That collection work is visible in the commands. Pick a test claim in the answer and follow it back to the returned GitHub evidence. The agent is reporting tests mentioned in the pull request; it has not checked out the code and run those tests. That distinction matters when we decide what this answer is good enough for.

Presenter reference: ODSC Demo 02A | Tools / Terminal | DeepSeek Flash. Archive file: 6afcee2755304d2c8b441ea8e8e7564e.html.

Conversation 02B: Four GitHub operations: recovery from tool errors

Here we expose four GitHub operations instead of asking the agent to write API commands. The agent still has to choose what to retrieve and how to use each operation. Keep the argument errors in view, then follow the recovery. A tool being available does not mean the model will call it correctly on the first attempt. We should evaluate whether it obtains the needed evidence and whether the final explanation stays within the task constraints.

Presenter reference: ODSC Demo 02B | Tools / Four GitHub operations | DeepSeek Flash. Archive file: ae2d836d512f43e385885048225bb7c0.html.

Conversation 02C: Twelve operations: unused tools and missed constraints

The larger catalog adds eight operations, but those additions go unused in this example. Look at what actually happens instead of counting the menu. The agent creates temporary word-count files even though the task forbids creating files, and the final answer is 303 whitespace-separated words despite claiming about 254. There is useful PR evidence here, but the answer misses constraints. Coverage, scope, and output length need separate checks.

Presenter reference: ODSC Demo 02C | Tools / Twelve GitHub operations | DeepSeek Flash. Archive file: 9659953a3ba347088ce3d3c4f7bf218e.html.

Conversation 02D: Custom PR tool: packaging repeated work

The custom tool collects selected PR evidence in one model-facing retrieval call. That removes several collection decisions from the agent, but the work still happens inside the tool. The conversation also includes a separate terminal word-count check, so do not describe the entire run as one call. Ask what the bundle leaves out. A prepared collection procedure can help on repeated work, while a missing small file can still matter to the explanation.

Presenter reference: ODSC Demo 02D | Tools / Custom PR tool | DeepSeek Flash. Archive file: 6df4719631bd4024957de2b197fb40d7.html.

## 35. The agent writes the retrieval procedure

[Cut slide 35](http://127.0.0.1:5173/s/odsc-cut-review?p=35)

Conversation 02A: The agent writes the retrieval procedure

Show: Show curl plus JSON parsing and the empty diff-filter result.

Say: A terminal exposes flexibility but leaves collection and failure handling to the agent.

Limit: Brief baseline. Retrieved test descriptions are not executed tests.

Delivery: Brief comparison; move on once the contrast is clear.

Evidence: 6afcee2755304d2c8b441ea8e8e7564e; zero-based stored event indices 8, 20. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded terminal command combines curl with agent-written JSON parsing; output lists changed files.

## 36. A small tool menu still has argument errors

[Cut slide 36](http://127.0.0.1:5173/s/odsc-cut-review?p=36)

Conversation 02B: A small tool menu still has argument errors

Show: Point to repo Field required, then the corrected call with repo supplied.

Say: An available tool still needs a usable schema and recovery path.

Limit: A recovered call does not establish that the entire answer meets every constraint.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: ae2d836d512f43e385885048225bb7c0; zero-based stored event indices 22, 26. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded validation error identifies the missing repo field. The corrected calls follow in the full history.

## 37. Checking one constraint can violate another

[Cut slide 37](http://127.0.0.1:5173/s/odsc-cut-review?p=37)

Conversation 02C: Checking one constraint can violate another

Show: Show the temporary-file creation and the later cleanup.

Say: Deleting a temporary file does not undo violating a no-file instruction.

Limit: The eight extra operations were unused. Do not claim the larger catalog caused the failure from one run.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 9659953a3ba347088ce3d3c4f7bf218e; zero-based stored event indices 36, 48. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded file-write card creates /tmp/pr16860-body.txt for word counting. Later cleanup is visible in the full history.

## 38. Move repeated collection into a tool

[Cut slide 38](http://127.0.0.1:5173/s/odsc-cut-review?p=38)

Conversation 02D: Move repeated collection into a tool

Show: Show the evidence-bundle call and the separate word-count command.

Say: The tool packages collection decisions; one model-facing call is not one backend operation.

Limit: Two actions in this run. Bundle completeness still needs a separate check.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 6df4719631bd4024957de2b197fb40d7; zero-based stored event indices 5, 8. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: The timeline shows a bundle retrieval and a separate word-count action.

## 39. Earlier experiment: a custom tool reduced the work

[Cut slide 39](http://127.0.0.1:5173/s/odsc-cut-review?p=39) · [Original slide 41](http://127.0.0.1:5173/s/odsc-full-visual-review?p=41)

The 4 GitHub tools already reached median coverage of six out of six. Adding eight more operations could not raise that coverage score further, and none of the eight additions was used.

The larger catalog sent more definition text: about 25.4 kilobytes instead of 19.9. Median fresh input across the whole run rose from 42.8 to 48.7 thousand tokens, with eleven versus twelve calls. That input total includes more than tool schemas, so we cannot attribute the whole difference to the definitions.

Strict passes were two out of three versus three out of three. The trials ran in separate same-day blocks, and billed cost was unavailable. We can report unused operations and added definition text. We cannot establish identical quality or a universal rule about tool count.

Changing the collection procedure gave a more useful comparison. The custom tool and 12 GitHub tools both reached median coverage of six out of six. The custom tool took 72 seconds and one call, compared with 123 seconds and twelve calls. Median fresh input was 18.7 thousand tokens versus 48.7 thousand.

The terminal reached median coverage of four, taking 101 seconds and six calls. Each setup had three trials. These are whole-run observations; one model-facing call can contain several backend requests, and the ledger did not include billed cost.

The custom tool was built for this task’s evidence requirements. The rubric checks coverage and citations rather than proving every claim correct. Keep lower-level access for missing evidence and evaluate again when the task changes.

The custom PR tool reports existing checks; it does not run tests. Independent verification requires checked-out code and an execution environment.

Classroom archive: For the classroom examples, trace an answer claim to the returned evidence and check the task constraints. The larger tool catalog leaves its added operations unused, but the final answer exceeds the word limit and the agent creates temporary files. Keep that constraint miss visible when discussing a useful answer.

## 40. What worked, what didn’t, and the lesson

[Cut slide 40](http://127.0.0.1:5173/s/odsc-cut-review?p=40) · [Original slide 44](http://127.0.0.1:5173/s/odsc-full-visual-review?p=44)

What worked: the custom PR tool gathered useful evidence with fewer calls and less input than the 12 GitHub tools.

What we learned: eight added operations went unused, and a read-only tool could report checks but could not execute them. The small trials do not establish equal quality between the 4-tool and 12-tool menus.

The harness lesson is to package work the agent repeatedly needs, specify the evidence returned, and preserve a way to obtain what the tool leaves out. Measure the useful answer and the work required to produce it.

A tool’s schema defines the action the model can request; its implementation determines the evidence returned for the next decision.

## 41. Tool definitions can fill your context

[Cut slide 41](http://127.0.0.1:5173/s/odsc-cut-review?p=41) · [Original slide 47](http://127.0.0.1:5173/s/odsc-full-visual-review?p=47)

Tool definitions consume context before a tool runs. In Anthropic’s five-server example, 58 tools used about 55 thousand tokens. Tool search left common tools visible and deferred the rest, reducing the initial context to about 8.7 thousand tokens.

The agent still has to discover and use the right tool. Cloudflare provides another way to handle a large catalog.

Build: reveal the reported 55K initial context first, then the 8.7K tool-search condition. These are context tokens, not a direct dollar saving. The earlier source figure depicted a different 77.2K setup; use this native graphic for the 55K example discussed in the source text.

## 42. Cloudflare reduced 2,600 API endpoints to two model-facing tools

[Cut slide 42](http://127.0.0.1:5173/s/odsc-cut-review?p=42) · [Original slide 49](http://127.0.0.1:5173/s/odsc-full-visual-review?p=49)

Cloudflare exposes search and execute instead of a separate model-facing schema for each of 2,600 API endpoints. The model searches the catalog, writes a short JavaScript program to compose the required operations, and runs it in a sandboxed V8 isolate.

Intermediate API results can stay inside the program, with selected evidence returned to the model. This changes both discovery and where the collection procedure runs. The sandbox and allowed API access still need explicit boundaries.

## 43. DeepSeek Harness: “Everything is a plugin”

[Cut slide 43](http://127.0.0.1:5173/s/odsc-cut-review?p=43) · [Original slide 50](http://127.0.0.1:5173/s/odsc-full-visual-review?p=50)

DeepSeek calls this architecture “Everything is a plugin.” A tool is an action the model can call. A plugin is a replaceable component of the harness, which can include the tool registry, model adapter, session storage, or the agent loop itself.

This screen illustrates extension points. It does not establish a performance gain. The choice is which component needs to change for the workflow we’re trying to support.

Sources: https://www.deepseek.com/en/harness/ ; https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md . Official visual checked October 9, 2026.

Sources: https://www.deepseek.com/harness/images/feat-plugins-en.webp

## 44. Three ways an agent can describe the same edit

[Cut slide 44](http://127.0.0.1:5173/s/odsc-cut-review?p=44) · [Original slide 51](http://127.0.0.1:5173/s/odsc-full-visual-review?p=51)

The same edit can be represented in different ways. A whole-file rewrite makes the model reproduce unchanged content. Search and replace requires an exact, unambiguous match. A patch describes a local change, but stale surrounding text can prevent it from applying.

These are illustrative failure modes, not a controlled ranking. Inspect failed edits and recovery attempts with your model and repository before choosing the interface.

## 45. Tools: Action, process, and outcome answer different questions

[Cut slide 45](http://127.0.0.1:5173/s/odsc-cut-review?p=45) · [Original slide 52](http://127.0.0.1:5173/s/odsc-full-visual-review?p=52)

A valid tool call, an acceptable process, and a correct final result are different checks. Selection and arguments tell us whether the requested action is valid. The trace tells us what happened along the way. The task check tells us whether the final state meets the requirement.

For a coding repair, green tests alone would miss an unauthorized change to the tests themselves. The harness also needs a scope check before accepting completion.

Every tool result becomes information for another decision. Next we’ll examine what the model receives and what information survives beyond the current call.

## 46. Tools: debrief

[Cut slide 46](http://127.0.0.1:5173/s/odsc-cut-review?p=46)

In the Sonnet 4.6 PR trials, adding eight GitHub tools did not increase median answer coverage and those extra tools went unused. The custom PR tool returned useful evidence with fewer model-facing calls and less input than the larger menu. That result concerns three trials per setup and a tool designed for this evidence task, not a universal advantage for custom tools.

Package recurring collection work into a bounded operation, keep a route to evidence it leaves out, and inspect what the tool returns when it fails. Evaluate the answer and the whole retrieval process. Include input from tool definitions and backend work inside each call.

The tool’s result becomes input to the next model call. That brings us to context and memory.

## 47. Context and memory

[Cut slide 47](http://127.0.0.1:5173/s/odsc-cut-review?p=47)

Next is the information available to the model. We will separate what enters the current call from what we save and reuse across tasks.

## 48. Context is what the model sees on this call

[Cut slide 48](http://127.0.0.1:5173/s/odsc-cut-review?p=48) · [Original slide 54](http://127.0.0.1:5173/s/odsc-full-visual-review?p=54)

Every tool result becomes information for another decision. Context is what the model receives on this call: the request, instructions, tool definitions, retrieved evidence, and recent history.

The window has a token limit, and the input must leave room for a response. A saved file outside that input is not automatically known to the model. The system has to select and load it. The proportions in this diagram are illustrative.

Sources: https://platform.claude.com/docs/en/build-with-claude/context-windows

## 49. A growing conversation repeats earlier context

[Cut slide 49](http://127.0.0.1:5173/s/odsc-cut-review?p=49) · [Original slide 56](http://127.0.0.1:5173/s/odsc-full-visual-review?p=56)

In this growing-conversation example, the next call includes the previous conversation and the new tool result. Later calls can therefore contain substantial input that the model has already seen.

Count input across the whole run. A production harness may trim, summarize, or rebuild the transcript rather than resend all history indefinitely. Both the context policy and provider caching affect how we interpret those totals.

## 50. Context choices change token use

[Cut slide 50](http://127.0.0.1:5173/s/odsc-cut-review?p=50)

This is a practitioner experiment, offered as an interesting illustration rather than a general recipe. Kensei's chart reports 945 runs across several tips. Moving 16 KB of rules from CLAUDE.md into a skill used 31 percent fewer tokens. Loading 16 KB of unrelated rules into CLAUDE.md used 46 percent more than the default. These are separate comparisons, not stages of a single run.

The exact file and function condition is a useful counterexample to optimizing tokens alone. It used 13 percent more tokens, but correctness rose from eight of twenty to twenty of twenty. The harness has to help the agent complete the task. Token use is one measurement.

The source chart also reports clearing a thirty-turn chat at minus 79 percent and compacting it, including compaction cost, at minus 60 percent, each over three chains. Those small samples do not justify a universal saving. Several other interventions have confidence intervals crossing zero.

Source: Rajiv's supplied screenshot, titled '12 tips, 945 runs', attributed visibly to Kensei. Total tokens per task versus default setup, Sonnet 5.5 unless stated. The selected comparisons each have n=20. The original chart shows 95 percent confidence intervals. This slide shows selected mean changes only, with intervals omitted rather than estimated from pixels. Original publication link remains unverified. Do not assume this chart is one of the two X posts previously supplied.

## 51. A larger window does not guarantee useful recall

[Cut slide 51](http://127.0.0.1:5173/s/odsc-cut-review?p=51) · [Original slide 57](http://127.0.0.1:5173/s/odsc-full-visual-review?p=57)

Fitting information into the window is only the capacity check. The model still has to find and use the relevant detail.

This chart measures eight-needle retrieval in MRCR v2. Behavior differs by model. It does not show a universal decline and is not a coding evaluation. Keep the evidence needed for the next decision easy to find.

Now consider the work that repeats across different tasks. That gives us a reason to save something useful for the next run.

Sources: https://platform.claude.com/docs/en/build-with-claude/context-windows https://claude.com/resources/articles/1m-context-ga

## 52. Consider two related tasks

[Cut slide 52](http://127.0.0.1:5173/s/odsc-cut-review?p=52)

These two requests end differently, but most of the search procedure is the same. To add headphones to a wish list or find a keyboard price range, the agent first opens the store, finds the search box, enters a query, and searches. The query changes. The reusable procedure stays the same.

That repetition motivates memory. We can preserve a useful procedure so a later task has less to rediscover. Then we have three design questions. How should we represent it: text, code, or both? How does the agent extract it from experience? And when should it retrieve, check, revise, or forget it? A successful run gives us a candidate procedure. We still need to test whether it helps on another task.

In a codebase, the equivalent might be finding the right module and running the relevant tests across several feature requests. The implementation changes, but some of the project knowledge carries over.

Source: Daniel Fried, CMU 11-768, Memory and Skills, p. 2. https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=2

## 53. Methods of updating the agent

[Cut slide 53](http://127.0.0.1:5173/s/odsc-cut-review?p=53)

There are three places we can carry experience forward. We can keep messages and tool results in the context window. That preserves detail, but we pay to process it, and the model still has to find what is relevant.

We can save an external artifact, such as project notes, a skill, or a checkpoint. We can inspect and edit it, retrieve it for another task, and often use it with another model. But someone has to create it or extract it from experience, select it for the task, and keep it current. Saving a file alone does not make the next model call use it.

Or we can update model weights through training. That can make a learned behavior cheaper to execute and change behavior across many tasks. Updates are slower, harder to inspect, and tied to the trained model. Faster inference is a possible benefit, not a guarantee for every training method or workload.

For this workshop, we focus on external artifacts and how the harness loads them into context. The practical question is which part of an experience deserves to become a reusable artifact. The next slide maps those artifacts to the mechanisms you already see in coding agents.

Source: Daniel Fried, CMU 11-768, Memory and Skills, p. 3. https://www.cmu-agents.com/slides/lecture-04-memory-and-skills.pdf#page=3

## 54. A map of instructions and memory

[Cut slide 54](http://127.0.0.1:5173/s/odsc-cut-review?p=54) · [Original slide 60](http://127.0.0.1:5173/s/odsc-full-visual-review?p=60)

Here are the concrete mechanisms a harness can use to supply information to the next call. Some contain saved experience. Others contain instructions written by people. The system prompt supplies standing behavior and tool rules. Repository guidance records project requirements. Skills package reusable procedures. Checkpoints preserve unfinished work, while a memory store can hold facts and lessons across tasks.

Each has to be discovered, selected, and loaded before it can inform a model call. Timing and precedence vary by harness. Saved material can become stale, so keep its source and scope.

Our next experiment isolates the content of supplied project notes.

Sources: https://agents.md/ https://developers.openai.com/api/docs/guides/tools-skills https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool

## 55. How can memory help when adding a new feature to a codebase?

[Cut slide 55](http://127.0.0.1:5173/s/odsc-cut-review?p=55) · [Original slide 61](http://127.0.0.1:5173/s/odsc-full-visual-review?p=61)

Users can already browse this catalog by page number. We want to add Next-page browsing while preserving what works, including existing reports.

The project has changed, and some saved notes describe an older design. We give the agent the same code and task with no saved notes, older notes, or current notes. Then we check the feature and compare the work required to implement it.

Classroom route: use the supplied read-only conversations. The earlier experiment results remain separate evidence; do not apply their timing, token totals, budgets, or model identities to the classroom histories.

## 56. Users already browse the catalog by page number

[Cut slide 56](http://127.0.0.1:5173/s/odsc-cut-review?p=56) · [Original slide 62](http://127.0.0.1:5173/s/odsc-full-visual-review?p=62)

The catalog already supports jumping directly to a page number. The project also produces reports from the same data. Both uses need to survive the new feature.

They share pagination code. The agent can inspect that implementation, but the user-facing requirement is simple: adding Next must preserve browsing and reports.

## 57. The new feature is Next-page browsing

[Cut slide 57](http://127.0.0.1:5173/s/odsc-cut-review?p=57) · [Original slide 63](http://127.0.0.1:5173/s/odsc-full-visual-review?p=63)

The requested feature lets a user select Next to move forward through the catalog. Direct page-number browsing and existing reports must still work.

The accepted API and a working export implementation are in the repository. Those give the agent concrete evidence about how to add the feature without inventing a competing interface.

## 58. Saved memory can fall behind the project

[Cut slide 58](http://127.0.0.1:5173/s/odsc-cut-review?p=58) · [Original slide 64](http://127.0.0.1:5173/s/odsc-full-visual-review?p=64)

Saved notes describe the project when they were written. Later code and accepted decisions can supersede them. This workshop uses a simulated project history, with notes from an earlier design and notes updated for the current design.

Every agent can read the same current code and decisions. The older notes explicitly point to their source and say to follow newer accepted records. We are testing how those supplied notes are used alongside accessible current evidence, rather than planting a rule that the agent must follow blindly.

## 59. Same feature request, three memory conditions

[Cut slide 59](http://127.0.0.1:5173/s/odsc-cut-review?p=59) · [Original slide 65](http://127.0.0.1:5173/s/odsc-full-visual-review?p=65)

The code, feature request, model, tools, and project documentation stay fixed. We change only the supplied notes: none, older, or current.

The older and current notes are almost the same length, 133 and 132 words. We supply them through the same harness mechanism, with automatic product memory and skills disabled. This tests memory content, not different products’ loading behavior. Each condition has three trials with DeepSeek V4.1 Flash at high reasoning.

Conversation 03A: No notes: discovering the current design

The agent starts without supplied memory notes. It can still read the code and current project decisions, and it finds the design needed for cursor pagination. The outside behavior checks pass. This gives us a baseline for the information already available in the repository. Before adding memory, check whether the needed decision is missing or whether the agent simply has to spend work finding it.

Presenter reference: ODSC Demo 03A | Context / No notes | DeepSeek Flash. Archive file: d1115314171343568c44d6bf664e4229.html.

Conversation 03B: Older notes: correct behavior with a scope miss

The older notes point toward an earlier design. The agent finds newer project decisions and follows those instead, so the feature's behavior checks pass. But it also writes a memory artifact beyond the requested scope and leaves that file out of the final list of changes. That is a useful failure. Reconciling old information worked; respecting the change boundary did not. A green behavior check would miss that second problem.

Presenter reference: ODSC Demo 03B | Context / Older notes | DeepSeek Flash. Archive file: 565f3a50c9a54ee8996f29e8093cdf03.html.

Conversation 03C: Current notes: supplying the accepted decision

The current notes give the agent the accepted decision and shared token protocol at the start. Follow how it uses those alongside the code. The result passes the behavior checks, as the other two conditions do. These notes were supplied in the prompt; this example does not test automatic memory retrieval. We can inspect how the information is used without assigning the older experiment's token savings to these conversations.

Presenter reference: ODSC Demo 03C | Context / Current notes | DeepSeek Flash. Archive file: e7a77731558d4dd591db5901b5ded92d.html.

## 60. Repository decisions can supply the context

[Cut slide 60](http://127.0.0.1:5173/s/odsc-cut-review?p=60)

Conversation 03A: Repository decisions can supply the context

Show: Show the read of accepted and superseded decisions before implementation.

Say: No supplied notes does not mean no context; the repository already contains the design.

Limit: Baseline, not evidence of a token-saving percentage.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: d1115314171343568c44d6bf664e4229; zero-based stored event indices 13, 21. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded design-document read shows accepted Decision 002 superseding 001. Decision 003 is also read in this operation.

## 61. A good repair can still cross the scope boundary

[Cut slide 61](http://127.0.0.1:5173/s/odsc-cut-review?p=61)

Conversation 03B: A good repair can still cross the scope boundary

Show: Show the status check, then the later successful creation of MEMORY.md.

Say: The final scope check must happen after the last write, including memory writes.

Limit: The current design was followed. Do not call this a failure to reconcile stale notes.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 565f3a50c9a54ee8996f29e8093cdf03; zero-based stored event indices 55, 67. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Successful MEMORY.md write card after the scope check. The preceding failed write is also preserved.

## 62. Current notes do not replace source verification

[Cut slide 62](http://127.0.0.1:5173/s/odsc-cut-review?p=62)

Conversation 03C: Current notes do not replace source verification

Show: Show the current decision read, then reuse of the shared token helpers.

Say: Use supplied context as a starting point and reconcile it with the implementation.

Limit: Brief comparison. This run still rereads the decisions; it does not demonstrate automatic memory retrieval or eliminated exploration.

Delivery: Brief comparison; move on once the contrast is clear.

Evidence: e7a77731558d4dd591db5901b5ded92d; zero-based stored event indices 15, 24. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Timeline shows decision-record, source, and test reads despite supplied current notes.

## 63. Earlier experiment: results on memory

[Cut slide 63](http://127.0.0.1:5173/s/odsc-cut-review?p=63) · [Original slide 67](http://127.0.0.1:5173/s/odsc-full-visual-review?p=67)

All three conditions passed in all three trials, including the independent contract and full-suite checks. There was no correctness advantage for supplied memory on this task.

The blue callout compares current memory with no memory. Current notes used about 205 thousand median total tokens, compared with 335 thousand without notes, a 39 percent reduction. Median time was 85.4 seconds instead of 100.6, about 15 percent less. These are descriptive medians from three trials with overlapping time ranges, rather than a reliable general speed estimate.

Most input was cached. Uncached input fell seven percent and output fell 26 percent, so the 39 percent total-token reduction does not establish a 39 percent cost saving. Cached input is already included in total input.

Older notes used even fewer median total tokens, about 176 thousand, but took longer at 135.6 seconds. Token totals, elapsed time, and correctness need separate interpretation.

Acceptance checks: We check the user-visible result before comparing resource use. Next-page browsing must work, page-number access must survive, and reports must still work.

An independent checker outside the agent workspace tests the accepted API, traversal, invalid inputs, and existing callers. We also inspect the diff and trace. All nine runs reused the shared protocol, preserved existing pagination definitions, and ran focused tests followed by the full suite. Agent-authored tests alone would not establish that compatibility.

Classroom archive: All three classroom candidates pass the behavior checks. The older-notes agent follows the route to the current decision, but also writes a memory file outside the requested change scope and omits it from the final file list. Inspect the diff as well as the answer. These single classroom takes do not establish the token savings above.

## 64. Old memory needs a route to current evidence

[Cut slide 64](http://127.0.0.1:5173/s/odsc-cut-review?p=64) · [Original slide 68](http://127.0.0.1:5173/s/odsc-full-visual-review?p=68)

All three agents with older notes identified the newer project decisions and implemented the current design. Their notes included a source and an explicit route to superseding records, and the harness let them read the current repository.

That is the observed reconciliation. We did not compare different precedence policies, so the result does not establish which policy is best. The design lesson is to make current evidence accessible and connect remembered decisions to a source that can show when they have changed.

## 65. Save decisions with reasons and a source

[Cut slide 65](http://127.0.0.1:5173/s/odsc-cut-review?p=65) · [Original slide 69](http://127.0.0.1:5173/s/odsc-full-visual-review?p=69)

What worked: current notes reached the accepted result with fewer median total tokens and less median time than no notes in this small experiment.

What we learned: every condition passed, and older notes were successfully reconciled. They used fewer median tokens still, but took longer. The time ranges overlap, and the token totals do not establish billed savings.

The harness lesson is to save useful decisions with reasons and a current source, then measure whether loading them reduces work while preserving correctness. Before treating those token totals as cost savings, we need to account for caching.

## 66. Prefix caching reuses the shared transcript

[Cut slide 66](http://127.0.0.1:5173/s/odsc-cut-review?p=66) · [Original slide 70](http://127.0.0.1:5173/s/odsc-full-visual-review?p=70)

Many model calls share a transcript prefix. A provider can reuse work for an eligible cached prefix, so repeated input and fresh input have different costs.

The memory results included cached input. To compare bills, we need the provider’s cache receipts and prices for fresh input, cached input, and output. This diagram uses equal-size turns to illustrate reuse; it is not a measurement of every harness.

## 67. Remember inference and caching effects

[Cut slide 67](http://127.0.0.1:5173/s/odsc-cut-review?p=67) · [Original slide 71](http://127.0.0.1:5173/s/odsc-full-visual-review?p=71)

Here is a separate, larger task run with Pi. Both runs made 89 model calls. With Anthropic cache control enabled, fresh input was 213 thousand tokens instead of 3.35 million.

The runs passed different numbers of checks: six of eight with caching and seven without. Two runs do not establish a quality effect. They illustrate why the provider configuration and cache receipts belong in the record when comparing resource use.

## 68. Better context means better performance (+19%)

[Cut slide 68](http://127.0.0.1:5173/s/odsc-cut-review?p=68) · [Original slide 72](http://127.0.0.1:5173/s/odsc-full-visual-review?p=72)

Our memory comparison reached the accepted design in every condition. This study examines a different outcome: whether targeted context improves later queries.

Patel and colleagues developed context using twelve queries, froze it, and evaluated on 42 held-out queries in the same environments. Accuracy-focused context gained 19 percentage points. Schema-focused context reduced exploration but hurt accuracy.

Useful context depends on what the task requires. This evaluates reuse across queries in known environments, not transfer to unfamiliar databases.

## 69. Retrieval methods for improving context

[Cut slide 69](http://127.0.0.1:5173/s/odsc-cut-review?p=69) · [Original slide 73](http://127.0.0.1:5173/s/odsc-full-visual-review?p=73)

Separate the retrieval method from the workflow that uses it. On the left, keyword retrieval such as BM25 matches terms. Semantic retrieval uses embeddings to find related meaning. Graph retrieval follows entities and their relationships. A system can combine these methods.

On the right, a simple retrieve-then-generate workflow gathers relevant evidence and gives it to the model to produce an answer. RAG names the broader retrieval-augmented generation pattern; it is not a competing search algorithm alongside BM25 or embeddings. GraphRAG can combine graph-based retrieval and summarization with generation.

An agentic search loop chooses a search, inspects what comes back, and decides whether to search again or answer. For example, it might start with an exact error string, inspect the matching file, and then search for its callers. It can use keyword, semantic, or graph retrieval at different steps. Agentic search and RAG can overlap; these diagrams distinguish a simple pipeline from iterative control, not mutually exclusive products.

The harness exposes the retrieval tools and returns sources the agent can inspect. The next question is what standing instructions should share that context as models change.

Sources: https://arxiv.org/abs/2005.11401 ; https://www.microsoft.com/en-us/research/project/graphrag/

Build: Keyword, Semantic, Graph, Retrieve-then-generate, then Agentic search. Either workflow can use those retrieval methods.

## 70. Anthropic updates removed over 80% of Claude Code's system prompt

[Cut slide 70](http://127.0.0.1:5173/s/odsc-cut-review?p=70) · [Original slide 76](http://127.0.0.1:5173/s/odsc-full-visual-review?p=76)

Thariq Shihipar reported that Anthropic removed over 80 percent of Claude Code’s system prompt without a measurable loss on its coding evaluations for Opus 5 and Fable 5.

A workaround for one model may constrain its successor unnecessarily. Preserve the failure case that justified an instruction, then rerun it when the model changes. This result supports that maintenance process; it does not prescribe an 80 percent cut for every prompt.

## 71. Five ways to manage a full context window

[Cut slide 71](http://127.0.0.1:5173/s/odsc-cut-review?p=71) · [Original slide 78](http://127.0.0.1:5173/s/odsc-full-visual-review?p=78)

When context fills, the harness can continue with the history, rewind, start fresh, compact older turns, or move bounded work into a subagent’s separate context.

Each choice changes what remains available. Before discarding or summarizing material, identify the task state and constraints needed for the next decision. A fresh context is useful only if the necessary evidence reaches it.

## 72. Compaction creates a record for the next turn

[Cut slide 72](http://127.0.0.1:5173/s/odsc-cut-review?p=72) · [Original slide 79](http://127.0.0.1:5173/s/odsc-full-visual-review?p=79)

This slide shows summary-based compaction: older turns are replaced with a continuation summary. Later, CliffCompaction will show a different approach based on deletion and truncation. The next call still needs the exact requirements, completed work, current evidence, and next action.

Bulky output can leave active context while the original trace stays available. Because a summary can omit or distort information, specify what must survive before relying on it.

Build: start with the verbose history. Reveal the continuation record and the reminder that the raw trace is retained separately. The record is illustrative.

## 73. What to preserve during compaction

[Cut slide 73](http://127.0.0.1:5173/s/odsc-cut-review?p=73) · [Original slide 80](http://127.0.0.1:5173/s/odsc-full-visual-review?p=80)

A useful summary preserves exact requirements, changed files, verification results, and the next action. “Tests passed” is insufficient if we need to know which tests ran against which version.

Keep bulky evidence retrievable after a restart. Preserve authorization constraints, and enforce them in the execution path too. Losing an instruction during compaction must not silently grant new authority. This is a preservation policy, rather than a measured workshop result.

## 74. What if the model could edit its own next input?

[Cut slide 74](http://127.0.0.1:5173/s/odsc-cut-review?p=74) · [Original slide 82](http://127.0.0.1:5173/s/odsc-full-visual-review?p=82)

The Context Language Model paper lets the model edit a file that becomes its next live input. The runtime mirrors context into the file and synchronizes changes before the next call. Without an edit, the conversation appends normally.

The model can preserve an exact requirement, remove obsolete output, or update working state. The harness still provides access and synchronization. This changes who selects context rather than removing that surrounding software.

The September 2026 preprint evaluates the complete method. Its reported benchmark gains do not isolate unrestricted context editing as the sole cause.

## 75. ACON learns better instructions for compressing context

[Cut slide 75](http://127.0.0.1:5173/s/odsc-cut-review?p=75) · [Original slide 84](http://127.0.0.1:5173/s/odsc-full-visual-review?p=84)

ACON searches for a better compression strategy, represented as natural-language instructions for a compressor. It compresses both accumulated history and large observations.

During optimization, compare tasks where full context succeeds but compressed context fails. An LLM examines what useful information was lost, revises the preservation instructions, and evaluates the updated compressor. The optimization also considers redundancy so the policy does not merely keep everything. This is a development-time feedback loop; it does not need a full-context parallel run for every deployed task.

The core method changes the compression guidelines without retraining the agent. The paper separately explores distilling the compressor into a smaller model. Across AppWorld, OfficeBench, and multi-objective QA, it reports 26–54 percent lower peak tokens and improved success against existing compression baselines. Peak tokens are not the same as dollars saved.

Next is a contrasting rule-based approach that deletes or truncates content rather than producing a rewritten summary.

Source: Kang et al., ACON, arXiv:2510.00615v3, section 3.3. https://arxiv.org/html/2510.00615v3

## 76. CliffCompaction keeps excerpts, then drops the old block

[Cut slide 76](http://127.0.0.1:5173/s/odsc-cut-review?p=76)

CliffCompaction lets context grow until a threshold, then removes large portions in one step. The blue line is a schematic, not measured data.

It keeps text verbatim rather than asking another model to rewrite a summary. The published rules drop tool results longer than 500 characters, shorten tool calls to signatures, and truncate older reasoning. System instructions, the initial task, and recent turns are preserved.

At the next compaction, discard the previous compacted block and process only newer original turns. That avoids repeatedly summarizing a summary. The tradeoff is loss of direct access to older history; rereading a file can recover current contents but not necessarily an old transient observation.

Unchanged prefixes can be cached between cliffs. Compaction itself still requires a prefill. The paper reports up to fifty percent lower cost in tested Terminal-Bench configurations while maintaining or improving performance; it is not a universal savings guarantee.

Source: Nguyen et al., CliffCompaction, arXiv:2609.26779v1, section 2. https://arxiv.org/html/2609.26779v1

## 77. Reuse the cached prefix to produce the summary.

[Cut slide 77](http://127.0.0.1:5173/s/odsc-cut-review?p=77) · [Original slide 85](http://127.0.0.1:5173/s/odsc-full-visual-review?p=85)

There are two phases. First, the summarization request reuses the old prefix: the same system prompt, tools, and conversation history, with a summarization instruction appended. In Anthropic’s described implementation, that lets the request that produces the summary reuse cached input. A separate request can still hit the cache when its prefix matches.

Second, the agent resumes with compacted history. The diagram’s right-hand column contains the summary and reattached context in place of the original messages. That changes the conversation prefix; we are not preserving the entire old history’s cache for subsequent turns. Unchanged system and tool prefixes may still be reusable.

The harness needs to consider both what information survives and how much work each phase requires. Lower context use does not automatically mean lower cost.

Source: Anthropic, Lessons from building Claude Code: Prompt caching is everything, April 30, 2026. https://claude.dev/blog/lessons-from-building-claude-code-prompt-caching-is-everything/

## 78. Task memory: save state and resume work

[Cut slide 78](http://127.0.0.1:5173/s/odsc-cut-review?p=78) · [Original slide 86](http://127.0.0.1:5173/s/odsc-full-visual-review?p=86)

Read this from left to right. Before a session ends, save a checkpoint: the plan, completed work, evidence, blockers, and next action. This lives outside the conversation so a fresh session can find it.

The new session loads that record, then checks the actual workspace. Have the files changed? Do the relevant checks still pass? A previously passing result is not proof about a later version of the files. If the checkpoint is stale, correct it before choosing the next action.

Continue from the verified state and update the checkpoint as the work progresses. The return arrow is what makes this a maintained working record rather than a one-time summary.

Keep this evolving state with the task. The next slide covers standing repository guidance for future tasks.

## 79. AGENTS.md: repository guidance for future tasks

[Cut slide 79](http://127.0.0.1:5173/s/odsc-cut-review?p=79) · [Original slide 92](http://127.0.0.1:5173/s/odsc-full-visual-review?p=92)

A supporting harness loads AGENTS.md as repository guidance. Useful contents include verified test commands and requirements that are difficult to infer from the code.

Keep temporary progress in task records. Revisit guidance when the repository changes, and measure the cost of including it across calls. A larger file is worthwhile only when its content helps the work enough to justify that input. Here is one concrete instruction we can evaluate.

## 80. A test-cost warning reduced repeated full-suite runs

[Cut slide 80](http://127.0.0.1:5173/s/odsc-cut-review?p=80) · [Original slide 93](http://127.0.0.1:5173/s/odsc-full-visual-review?p=93)

One repository warned that its full suite takes more than twenty minutes. In this exploratory comparison, full-suite launches fell from 3.67 to 1.67 per experimental cell, and wall-clock time fell from 2,689 to 2,032 seconds. Correctness did not change.

The same study ran 288 trials on seventeen tasks in three Python repositories. Pass rates changed only modestly between no guidance, always-loaded guidance, and retrieval when needed. Claude's rates ranged from 53.3 to 55.6 percent and Codex's from 52.9 to 58.8 percent. Smaller effects remained possible.

The specific cost warning changed behavior; adding a guidance file did not establish a general correctness gain. Evaluate what you put in the file and when it is loaded. Next, skills let us make a more specific procedure available only when relevant.

Source: Khatri, Do Context Files Help Coding Agents?, arXiv:2607.27250v1, Tables 1–2. https://arxiv.org/abs/2607.27250v1

## 81. A skill is a reusable procedure for a task

[Cut slide 81](http://127.0.0.1:5173/s/odsc-cut-review?p=81)

A skill packages a reusable procedure for a class of task. SKILL.md describes when it applies and gives the instructions. A skill can also include references, examples, or scripts. The directory shown is illustrative. It does not give the agent new model weights or permission to perform an action. The next slide shows how the harness can expose a short description first and load the detailed procedure only when relevant.

## 82. A skill loads detailed instructions only when the task needs them

[Cut slide 82](http://127.0.0.1:5173/s/odsc-cut-review?p=82) · [Original slide 98](http://127.0.0.1:5173/s/odsc-full-visual-review?p=98)

A skill makes a reusable procedure discoverable without putting all of its instructions into every call. The model typically sees a short catalog, then loads the relevant skill instructions and references when needed.

A script can run and return evidence without its entire source entering context. Loading details vary by harness. Evaluate whether the selected procedure improves the task and whether unnecessary material stays out of the input.

## 83. Curated skills raised average pass rate

[Cut slide 83](http://127.0.0.1:5173/s/odsc-cut-review?p=83) · [Original slide 99](http://127.0.0.1:5173/s/odsc-full-visual-review?p=99)

SkillsBench reported average pass rate rising from 33.9 to 50.5 percent with curated skills, a 16.6 percentage-point gain across 87 tasks and eighteen model-harness configurations. Individual configuration gains ranged from 4.1 to 25.7 points.

Those results concern the curated skills and tested tasks. A new skill still needs its own comparison, including failures and resource use.

## 84. Evaluate a skill on the work it should improve

[Cut slide 84](http://127.0.0.1:5173/s/odsc-cut-review?p=84) · [Original slide 101](http://127.0.0.1:5173/s/odsc-full-visual-review?p=101)

An average gain can hide a skill that hurts an individual task. Compare representative work with and without the skill, including correctness, time, and cost. Inspect the failures.

Keep the task and checks stable enough to see what the procedure changes. The same discipline applies when promoting a lesson from one run into future guidance.

## 85. Context and memory: debrief

[Cut slide 85](http://127.0.0.1:5173/s/odsc-cut-review?p=85) · [Original slide 102](http://127.0.0.1:5173/s/odsc-full-visual-review?p=102)

Useful context can reduce work without raising correctness. Save task state; keep verified, stable, reusable lessons. Correctness, uncached input, output, and elapsed time.

This rule applies to promoting information into reusable guidance. A lesson should have evidence, a clear scope, and a reason to remain useful beyond the current task.

Checkpoints and audit traces can also survive, including failed attempts and temporary state. They belong in task records rather than automatically becoming standing instructions.

We’ve examined what information reaches the next call. Now we’ll choose which model receives it, using concrete tasks and their required checks.

## 86. Model routing

[Cut slide 86](http://127.0.0.1:5173/s/odsc-cut-review?p=86)

We have looked at tools and information. Now we choose the model for the work, using success, cost, and time to judge the choice.

## 87. Workshop 4: Do all tasks need the strongest model?

[Cut slide 87](http://127.0.0.1:5173/s/odsc-cut-review?p=87) · [Original slide 103](http://127.0.0.1:5173/s/odsc-full-visual-review?p=103)

We have four concrete tasks: a rename, a pagination repair, a concurrent-counter repair, and a security review. We’ll compare saved runs from two models before discussing how to select between them.

The decision depends on which requirements each model satisfies and what the run costs. A generic difficulty label is not enough to determine that.

## 88. Test model choice on four concrete tasks

[Cut slide 88](http://127.0.0.1:5173/s/odsc-cut-review?p=88) · [Original slide 104](http://127.0.0.1:5173/s/odsc-full-visual-review?p=104)

Haiku 4.5 and Opus 4.8 each get three fresh attempts per task. The fixed-model conditions use the same starters, prompts, tools, independent checker, and iteration limit.

The rename must preserve behavior and scope. Pagination must return the missing item. The counter must produce the right total while keeping work concurrent. The original security review rubric requires coverage of six review topics.

That security rubric measures finding coverage, not a complete expert assessment of every proposed remediation. These tasks were selected for the workshop; they do not form a general model leaderboard.

For the classroom comparison, Flash and Pro are available options. Both may pass the repairs. Inspect the findings and proposed fixes in a security review; mentioning a rubric topic alone does not verify it.

Classroom route: use the supplied read-only conversations. The earlier experiment results remain separate evidence; do not apply their timing, token totals, budgets, or model identities to the classroom histories.

Conversation 04C: Flash counter repair: protect the shared update

Flash repairs the concurrent counter with a lock. The important detail is where the lock goes: the simulated work remains outside the critical section, and the shared update is protected. A counter that reaches the right total by serializing every job would miss part of the task. Read both the count check and the concurrency evidence before accepting the repair. The timing probe is a check for this fixture, not a model speed benchmark.

Presenter reference: ODSC Demo 04C | Models / Async | DeepSeek Flash. Archive file: e44aa44509154ccdbaf34951996cb5bf.html.

Conversation 04D: Flash security review: check the claims

The Flash review identifies concrete paths such as debug identity and prefix-based bypasses. Now pick one finding and inspect the code that supports it. Some claims are too broad: dictionary membership by itself does not demonstrate a practical timing attack. Covering a security-review topic is different from establishing a vulnerability. The fixture tokens also need deployment context before we assign a real-world severity.

Presenter reference: ODSC Demo 04D | Models / Security | DeepSeek Flash. Archive file: b50aad33dee24216a563fd633d5c031b.html.

Conversation 04G: Pro counter repair: a different accepted change

Pro removes the yield that interrupts the shared counter update while preserving concurrent simulated work. Compare that diff with Flash's lock-based repair. Both reach the accepted behavior through different changes. There is an agent error in this history too; keep it in the comparison instead of presenting a cleaned-up success story. These are fixed-model runs. Neither conversation actually switches models or executes an escalation policy.

Presenter reference: ODSC Demo 04G | Models / Async | DeepSeek Pro. Archive file: 5cc9324580344ba7b0e054513d27a983.html.

Conversation 04H: Pro security review: evidence before finding counts

Pro produces five source-specific findings and changes only the report. Compare one of those claims with the Flash report and with the code. More findings do not automatically mean a better review; ask whether each claim is supported, whether the proposed fix addresses it, and whether the severity fits the environment. These two reviews can help us design an escalation check, but they do not measure the cost or reliability of a working router.

Presenter reference: ODSC Demo 04H | Models / Security | DeepSeek Pro. Archive file: 9ec3ec18817b4632ba7ac050faa730fe.html.

## 89. Keep slow work outside the lock

[Cut slide 89](http://127.0.0.1:5173/s/odsc-cut-review?p=89)

Conversation 04C: Keep slow work outside the lock

Show: Show the replacement increment implementation.

Say: Protect shared mutation without serializing the simulated async work.

Limit: The load-sensitive timing check is a fixture check, not model latency.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: e44aa44509154ccdbaf34951996cb5bf; zero-based stored event indices 23, 34. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Actual edit diff: simulated sleep precedes the short locked update.

## 90. Remove the yield inside the shared update

[Cut slide 90](http://127.0.0.1:5173/s/odsc-cut-review?p=90)

Conversation 04G: Remove the yield inside the shared update

Show: Compare the small replacement with the lock-based repair in 04C.

Say: There can be more than one accepted repair; compare the assumptions each one needs.

Limit: Safe only for the stated single-event-loop task; no general thread-safety claim. The think-tool validation error remains in the trace.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 5cc9324580344ba7b0e054513d27a983; zero-based stored event indices 17, 15. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Actual edit diff replaces the yielding read-modify-write with self.value += 1. Single-event-loop assumption applies.

## 91. A real probe does not justify every report claim

[Cut slide 91](http://127.0.0.1:5173/s/odsc-cut-review?p=91)

Conversation 04D: A real probe does not justify every report claim

Show: Compare successful bypass output with the report calling fixture tokens live credentials.

Say: Separate directly observed behavior from deployment assumptions.

Limit: The bypass is visible; live deployment and practical timing attacks are not established by this fixture.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: b50aad33dee24216a563fd633d5c031b; zero-based stored event indices 35, 40. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Canvas file preview of SECURITY_REVIEW.md. The phrase ships live credentials is a report claim, not established deployment evidence.

## 92. Turn a finding into a checkable claim

[Cut slide 92](http://127.0.0.1:5173/s/odsc-cut-review?p=92)

Conversation 04H: Turn a finding into a checkable claim

Show: Show no-auth 401 beside debug-impersonate 200, then the corresponding report finding.

Say: Assess a review by whether its claims map to evidence, not by the number of findings.

Limit: Pro is not uniformly correct: token severity and constant-time claims still need context. This is not proof that a larger model always reviews better.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 9ec3ec18817b4632ba7ac050faa730fe; zero-based stored event indices 17, 19. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded terminal output shows no-auth 401 and debug impersonation 200. These are observed fixture results.

## 93. Earlier experiment: security review coverage differed

[Cut slide 93](http://127.0.0.1:5173/s/odsc-cut-review?p=93) · [Original slide 106](http://127.0.0.1:5173/s/odsc-full-visual-review?p=106)

Haiku passes the concurrent-counter repair in all three attempts. Its security review omits the timing-safe comparison topic required by the original rubric, while Opus covers that topic.

The middleware checks token membership in a dictionary. That alone does not establish an exploitable timing attack. This table measures the original review requirements, not expert validation of every security claim or remediation.

In the fresh Flash/Pro practice, both reports mention the topic. Compare which findings are supported by the source and which depend on deployment assumptions. A verified failure is useful escalation evidence; a task label or keyword count is insufficient.

## 94. Jev: decision models inside the harness

[Cut slide 94](http://127.0.0.1:5173/s/odsc-cut-review?p=94)

Jev is another tool for the harness: a specialized decision model that can choose among candidate actions. For example, which tool should the agent call next? This does not replace every kind of reasoning. The harness supplies the decision, reads the model's confidence, and lets the LLM decide when confidence is below a fitted threshold.

The interesting technology is the decision model. The harness engineering is where we use it, how we fit the gate, and when we fall back. In section 7.2, naive tool delegation with Gemini 3.5 Flash lost nineteen percentage points. The fitted cascade cut cost 14.2 percent with unchanged outcomes across 500 synthetic DecisionGym tasks. This is a near-ceiling synthetic evaluation. Tested transfer to tau-squared lost 8.1 points.

The paper's much larger 81 to 89 percent savings combine trained 4B decision models and serving changes on tasks similar to training. Do not describe that headline as a harness-only improvement or a demonstrated production saving. Keep the repository's exploratory coding experiments separate from these paper results.

Source: Zhu et al., JevAgentHarness: Benchmarking, Deploying and Training Decision Models That Share Control with LLMs, arXiv:2610.21412v1, October 15, 2026, sections 2, 4, 7.2 and transfer discussion. https://arxiv.org/html/2610.21412v1 . Companion summary: https://academy.dair.ai/papers/jevagentharness-benchmarking-deploying-and-training-decision-models-that-share-c-2610.21412

## 95. Earlier experiment: model choice reduced this bill

[Cut slide 95](http://127.0.0.1:5173/s/odsc-cut-review?p=95) · [Original slide 107](http://127.0.0.1:5173/s/odsc-full-visual-review?p=107)

Under the original checks, Opus on every task passes twelve of twelve with a median four-task bill of about 88 cents and elapsed time of 116 seconds. Haiku for repairs and Opus for security also passes twelve, at about 52 cents and 206 seconds. The lower bill comes with a longer wait.

Haiku everywhere passes nine, missing the three security reviews. The smaller-first cascade passes eleven at about 63 cents. It uses an LLM judge between tiers and different attempt budgets, so it is a comparison of strategies rather than an isolated switching experiment.

The bill and time are medians for complete four-task sets. We designed the mixed rule around these tasks; its performance on new work remains untested.

The security component is rubric coverage. These historical totals do not establish that every security claim was correct, or predict the bill for the current Flash/Pro practice.

Classroom archive: The classroom package compares Flash and Pro on the async repair and security review. Both repair candidates pass. Both security answers mention the rubric topics, but some claims need correction. Ask what evidence would justify escalation. These examples do not run a routing policy or reproduce the Haiku and Opus bill above.

## 96. Specify the model choice and the escalation evidence

[Cut slide 96](http://127.0.0.1:5173/s/odsc-cut-review?p=96) · [Original slide 109](http://127.0.0.1:5173/s/odsc-full-visual-review?p=109)

The mixed rule preserved twelve passes under the original checks with a lower bill than Opus everywhere, while taking longer. Haiku handled the three repairs and Opus covered the security-review rubric. Validate the findings themselves before using this rule for real security reviews.

The cascade still missed a requirement. It used an LLM judge rather than an external verifier after each tier, with different attempt budgets. That leaves verify-then-escalate as a follow-up experiment.

Specify a starting model, an observed failure that triggers escalation, a final check, and a budget. Test the rule on new tasks. Also count what happens to the conversation’s cache when you switch models.

## 97. Cursor reports 30–50% savings from routing coding work

[Cut slide 97](http://127.0.0.1:5173/s/odsc-cut-review?p=97)

Cursor's July 22, 2026 report supplies a production coding example alongside our workshop. Three high-volume early-access enterprise accounts with thousands of users reported 30 to 50 percent savings on Auto-routed requests. The comparison is what they paid against the same traffic priced entirely at Opus 4.8 API rates. It is not a randomized comparison of those accounts completing identical tasks on Opus alone.

Cursor reports no quality decrease. Its quality measures are user satisfaction inferred from subsequent responses and the share of generated code retained in the codebase. These are production signals, not independently verified task correctness. The company says its reported savings include cache-miss costs. The chart here simply normalizes the reported savings range to a baseline of 100; it does not invent individual customer values.

This is vendor-reported evidence of routing savings in real coding traffic. Our own acceptance checks still determine whether a routing policy works for our tasks. The next slide explains why cache reuse belongs in that cost calculation.

Source: https://cursor.com/blog/router

## 98. Switching models can trade away cache reuse

[Cut slide 98](http://127.0.0.1:5173/s/odsc-cut-review?p=98) · [Original slide 111](http://127.0.0.1:5173/s/odsc-full-visual-review?p=111)

Anthropic’s prompt caches are model-specific. Switching models during a long conversation can require processing the history again.

A task boundary or bounded subtask can limit the context transferred to another model. Mid-task escalation can still be worthwhile, but include the cache tradeoff when measuring its benefit.

Build: start with same-model prefix reuse; reveal switching to another model and processing the history again. Cache keys and support vary by provider. The cited Anthropic example concerns model-specific prompt caches.

## 99. Try again before moving to a better model

[Cut slide 99](http://127.0.0.1:5173/s/odsc-cut-review?p=99) · [Original slide 112](http://127.0.0.1:5173/s/odsc-full-visual-review?p=112)

This reported comparison puts two GLM attempts at 57.8 percent and $7.90 against one Sonnet attempt at 52.7 percent and $25.84.

The extra attempt is another way to spend a budget. Best-of-two also needs a way to select the better result; the aggregate comparison does not give a production system an oracle. Include the selector or verifier when designing and costing the policy.

## 100. Execution feedback can improve the next routing decision

[Cut slide 100](http://127.0.0.1:5173/s/odsc-cut-review?p=100) · [Original slide 114](http://127.0.0.1:5173/s/odsc-full-visual-review?p=114)

Agent-as-a-Router uses execution feedback: a verifier runs candidate code in a sandbox and stores the result for later routing decisions.

That supplies an observed outcome, provided the verifier checks the requirement we care about. It connects the model-selection decision to a different decision: whether the work is finished. The next workshop examines what happens after an agent says it has completed a repair.

## 101. Model routing: debrief

[Cut slide 101](http://127.0.0.1:5173/s/odsc-cut-review?p=101)

In our four-task comparison, using the smaller model for three repairs and the larger model for the security review preserved the verified outcomes with a lower bill than the larger model everywhere, while taking longer. That is evidence for the tested task rule, not a general difficulty classifier.

Define the requirement, starting model, and evidence that would trigger escalation. Include retries, the judge or verifier, and lost cache reuse in the full cost. Check whether the policy preserves the outcome we care about. The cascade missed one requirement, so the decision about when to escalate needs its own evaluation.

Next we ask what evidence allows the system to stop.

## 102. Goals and stopping

[Cut slide 102](http://127.0.0.1:5173/s/odsc-cut-review?p=102)

A goal needs a way to check progress. This section looks at when another attempt helps and what evidence lets the agent finish.

## 103. GPT-6 Astra showed that a software factory can run without making progress

[Cut slide 103](http://127.0.0.1:5173/s/odsc-cut-review?p=103) · [Original slide 129](http://127.0.0.1:5173/s/odsc-full-visual-review?p=129)

Armin Ronacher reported stopping a GPT-6 Astra software-factory run after 35 hours, about a billion tokens, roughly $1,200, 79 commits, and 75,000 net lines. His assessment was that it delivered “absolutely nothing of value.” These are figures and judgments from his account.

Commits and continued execution were insufficient evidence of useful progress. Behavior checks and review of the resulting code need to influence continuation. Set a hard budget, provide an interruption path, and preserve the state when there is no credible next repair.

This motivates a measurable goal and a continuation policy, not simply asking the agent to run longer. Next we will try a small goal-mode probe and distinguish continued activity from a verified outcome.

## 104. Workshop 5: The agent stopped. Is the work finished?

[Cut slide 104](http://127.0.0.1:5173/s/odsc-cut-review?p=104) · [Original slide 116](http://127.0.0.1:5173/s/odsc-full-visual-review?p=116)

The agent has returned a final answer. We still need to decide whether the requested outcome is complete. What evidence supports that decision? If work remains, is there a useful next action? When should the system stop trying?

This workshop examines the harness decision after the agent stops: accept completion, request another attempt, or end at a review limit. Continuing is useful only when the next action can make progress. A stopping policy also needs an explicit limit.

The following slides use a small name-formatter repair to make those decisions observable. These probes demonstrate completion review and continuation; they do not establish that goal mode improves repair success against a matched baseline.

Concrete check: slugify("api.v1 endpoint") currently returns "apiv1-endpoint". The required output is "api.v1-endpoint". The existing five tests pass before the repair, so check the requested output separately.

## 105. Goal mode checks for unfinished work

[Cut slide 105](http://127.0.0.1:5173/s/odsc-cut-review?p=105) · [Original slide 117](http://127.0.0.1:5173/s/odsc-full-visual-review?p=117)

Goal mode keeps an objective active after the agent stops. A separate model judge reads the conversation. If it finds unfinished work, the controller returns that feedback and starts another run, up to the review limit.

Here the limit is two reviews. The judge does not execute tests itself. We run a separate assertion afterward to check the actual formatter output; that independent check does not control the native continuation loop.

## 106. An ordinary run already repaired this bug

[Cut slide 106](http://127.0.0.1:5173/s/odsc-cut-review?p=106) · [Original slide 119](http://127.0.0.1:5173/s/odsc-full-visual-review?p=119)

An ordinary prompt already repaired this bug in an older run. The recording shows one failing test and five passing tests before the edit, then all six passing. The external output check also passes.

This establishes that the task can be solved without the goal command. The run has different conditions, so it is not a matched baseline for claiming that goal mode helps or hurts.

Conversation 05A: Ordinary repair: the baseline already succeeds

The ordinary run adds a regression test, observes the failure, repairs the source, and reaches six passing tests. The exact-output check also passes. This is the baseline we need before discussing goal mode: the agent already solved this task without an extra completion review. We should not credit goal mode for a benefit that this example does not demonstrate.

Presenter reference: ODSC Demo 05A | Completion / Ordinary repair | DeepSeek Flash. Archive file: fee0d0ee33e24b74bb0aaf31b876cebb.html.

## 107. The ordinary baseline already catches the bug

[Cut slide 107](http://127.0.0.1:5173/s/odsc-cut-review?p=107)

Conversation 05A: The ordinary baseline already catches the bug

Show: Show the new regression test failing, then passing output after the fix.

Say: Establish what the ordinary workflow already achieves before crediting an added reviewer.

Limit: A shell command can exit zero after echo even when pytest failed; inspect the captured test status.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: fee0d0ee33e24b74bb0aaf31b876cebb; zero-based stored event indices 17, 23. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Final assistant summary shows failing regression with pytest status 1, the one-character fix, and six passing tests with status 0.

## 108. Goal mode accepted the fix and capped the blocked run

[Cut slide 108](http://127.0.0.1:5173/s/odsc-cut-review?p=108) · [Original slide 120](http://127.0.0.1:5173/s/odsc-full-visual-review?p=120)

With edits allowed, goal mode accepts the repair after one review and the independent output check passes. With edits prohibited, it requests another attempt and then stops at the two-review limit. The dot is still missing.

The blocked condition is constructed to prevent a repair. It tests continuation and the cap, rather than natural repair difficulty or an improvement in model capability.

Classroom archive: In the classroom archive, ordinary repair already fixes the bug. The native goal accepts a repair after one audit. In the blocked example, five existing tests pass while the required dot-preserving output fails. Editing is prohibited, so the judge requests another attempt and stops at the second audit. The cap shows a limit on an unfinished task, not a successful repair.

Conversation 05B: Native goal mode: an accepted completion

In the editable goal-mode run, the agent repairs the bug and the goal reviewer accepts completion after one audit. Connect the reviewer's judgment to the actual output check. They are different kinds of evidence: the reviewer interprets the conversation, while the deterministic check tests the requested output. Here they agree that the dot is preserved. The extra review provides a completion decision, not proof that every ordinary run needed another attempt.

Presenter reference: ODSC Demo 05B | Completion / Native goal | DeepSeek Flash. Archive file: 5911cbfcb6474586bc7281e17f1b8400.html.

Conversation 05C: Blocked goal: a stopping limit is not success

This condition deliberately forbids edits. The five existing tests remain green, but the requested output is api.v1-endpoint and the program returns apiv1-endpoint. The goal review detects the missing work and asks for another attempt, then stops at the two-audit limit. The bug remains. That is why we need to distinguish successful completion from a bounded stop: a retry can only help when the agent has a way to make progress.

Presenter reference: ODSC Demo 05C | Completion / Blocked goal and audit cap | DeepSeek Flash. Archive file: 4eb6374135f04c4ba7fbc0329d8481d4.html.

## 109. Completion review is a separate decision

[Cut slide 109](http://127.0.0.1:5173/s/odsc-cut-review?p=109)

Conversation 05B: Completion review is a separate decision

Show: Show the goal state: complete, iteration 1, and the exact-output assertion.

Say: The deterministic check and the completion reviewer answer different questions.

Limit: Brief comparison with 05A. This run does not show an extra audit rescuing a failed repair.

Delivery: Brief comparison; move on once the contrast is clear.

Evidence: 5911cbfcb6474586bc7281e17f1b8400; zero-based stored event indices 28, 37. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Final assistant verification summary plus native Canvas goal status: Round 1/2, complete, score 100%. Reviewer score is not an independent success-rate measurement.

## 110. Green tests can coexist with an unmet goal

[Cut slide 110](http://127.0.0.1:5173/s/odsc-cut-review?p=110)

Conversation 05C: Green tests can coexist with an unmet goal

Show: Show five tests passing, missing dot, and the audit continuation message.

Say: A bounded stop is not success; retries cannot overcome a no-edit constraint.

Limit: This is deliberately constrained, not an ordinary coding failure.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 4eb6374135f04c4ba7fbc0329d8481d4; zero-based stored event indices 18, 29. The screenshot is an actual Agent Canvas capture with editable gold boxes and arrows added on the slide. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Final assistant summary contrasts five passing tests with the failed exact-output check. This run deliberately prohibits edits.

## 111. Another attempt needs a way to make progress

[Cut slide 111](http://127.0.0.1:5173/s/odsc-cut-review?p=111) · [Original slide 121](http://127.0.0.1:5173/s/odsc-full-visual-review?p=121)

The review identified missing work, but another attempt could not overcome the prohibition on edits. The cap prevented further attempts.

A continuation policy needs both evidence of what remains and a feasible next action. When the required action is unavailable, the system should surface that blocker instead of treating more turns as progress.

## 112. A goal persists. A plan changes. Evidence decides when to stop.

[Cut slide 112](http://127.0.0.1:5173/s/odsc-cut-review?p=112) · [Original slide 122](http://127.0.0.1:5173/s/odsc-full-visual-review?p=122)

A goal persists; a plan changes; evidence decides when to stop.

Keep this bridge brief. Next, use the formatter example to separate the outcome we want from the plan we can revise.

## 113. Goals define success. Plans choose the next steps.

[Cut slide 113](http://127.0.0.1:5173/s/odsc-cut-review?p=113) · [Original slide 123](http://127.0.0.1:5173/s/odsc-full-visual-review?p=123)

A goal tells the agent what must be true when it finishes. A plan is its current proposal for getting there. In our example, the goal is to preserve the dot in api.v1-endpoint without breaking existing behavior.

The first plan could be: reproduce the failure, inspect the formatter, and change the rule that removes the dot. The agent takes an action, then checks the result. If the dot is still missing or a regression appears, the evidence should change its next steps. The goal can stay the same while the plan changes. Checking off the planned steps does not by itself prove the goal was reached.

If the required checks pass, finish. If edits are prohibited, report the blocker. If the run reaches its budget, stop with the current state and remaining work. Repeating the same blocked action is not useful planning.

This drawing describes the design we want. In the native goal-mode demo, a model judge reviewed the conversation and requested continuation; it did not execute the tests. Our independent output assertion ran afterward. Goal mode kept the objective active, but did not itself guarantee a better plan or a verified repair.

For a durable implementation, save the objective, verified state, current plan and next action, evidence, limits, and stopping status. On resumption, check the workspace before continuing. The next slide explains how to define those acceptance checks before implementation.

## 114. The right result can still fail the task

[Cut slide 114](http://127.0.0.1:5173/s/odsc-cut-review?p=114) · [Original slide 124](http://127.0.0.1:5173/s/odsc-full-visual-review?p=124)

Here is a concrete acceptance check from CMU's computer-use lecture. The request is to put a blue mug costing less than twenty dollars in the cart, without purchasing it.

Walk through the three actions. The agent selects an eighteen-dollar mug, adds it to the cart, then places the order. Ask: did it succeed? Pause. The item is right, but the purchase violates the request. An outcome-only check can miss that. We need evidence of both the result and the actions taken.

This is a classroom illustration, not a measured failure rate. Our practical extension is to define the checks before execution and stop when the permitted outcome is reached. The harness can also block a forbidden purchase action before it happens; an audit afterward cannot undo it.

Back in our formatter task, define the starting failure, the repaired output, and the existing behavior that must survive. Save the commands and results. A blocked check or exhausted budget means report an incomplete outcome, not declare success.

Next, AutoResearch shows how a measurable acceptance rule can govern repeated attempts.

Source: JY Koh, CMU 11-768, Lecture 7, PDF pages 17 and 39. https://www.cmu-agents.com/slides/lecture-07-computer-use-agents.pdf#page=39

## 115. AutoResearch keeps a change only when the metric improves

[Cut slide 115](http://127.0.0.1:5173/s/odsc-cut-review?p=115) · [Original slide 126](http://127.0.0.1:5173/s/odsc-full-visual-review?p=126)

On the left is the experiment loop. A human sets the research direction in program.md; the agent edits the training code, runs a five-minute training experiment, evaluates it, and keeps or discards the change. It records the result before trying again.

On the right is the original progress chart from Karpathy's AutoResearch repository: 83 experiments and 15 kept improvements. The vertical axis is validation bits per byte, where lower is better. The green staircase shows the running best; gray dots show discarded experiments. Progress accumulates because the loop retains the better result, not because every attempt improves.

This is one reported run, not a controlled estimate of how much autonomy helps. The chart includes changes to training configuration and even the random seed, so do not describe every gain as a new research discovery or guaranteed generalization.

Connect this back to the previous slide: we need a check that means something. Here the validation metric decides what survives. The five-minute budget bounds each training experiment, not the whole agent session. Our loop illustration includes an overall stopping criterion; the operator still needs to set session limits and decide when to review the accumulated changes.

Source: https://github.com/karpathy/autoresearch and https://github.com/karpathy/autoresearch/blob/master/progress.png. Original chart retrieved October 11, 2026.

## 116. A test oracle helped agents turn a large goal into fixes

[Cut slide 116](http://127.0.0.1:5173/s/odsc-cut-review?p=116)

This clean-room reimplementation is a useful practitioner example of test-guided persistence. Carlini reported that the compiler team stalled on the Linux build because agents kept tackling the same failure. His revised harness compiled most files with GCC and selected files with the new compiler, isolating where a failure originated. That gave agents specific repairs to pursue.

The reported project produced a compiler that built Linux 6.9 after roughly two thousand sessions, sixteen agents, two weeks, and twenty thousand dollars. It still used external assembler and linker tools, required GCC for the x86 boot stage, and was not a production replacement.

The lesson is that a large objective becomes actionable when a trusted reference exposes a failing behavior. This case does not isolate the benefit of goals, tests, or multiple agents. It illustrates their use together. It is not an evaluation of our native goal command.

Source: Nicholas Carlini, Anthropic, February 5, 2026. https://www.anthropic.com/engineering/building-c-compiler

## 117. An external goal can restart an unfinished task

[Cut slide 117](http://127.0.0.1:5173/s/odsc-cut-review?p=117) · [Original slide 127](http://127.0.0.1:5173/s/odsc-full-visual-review?p=127)

The saved goal sits outside the agent's immediate plan–act–observe loop. It remains available when the agent yields or thinks it has finished. The harness then compares the available evidence with that goal.

Trace the blue return arrow. If the work is unfinished, there is a credible next action, and budget remains, the harness asks the agent to continue. That is how an external goal can keep work moving beyond one apparent stopping point. It does not make the plan correct or create a path around a real blocker.

Use the formatter example: the target is still to preserve the dot and keep existing behavior working. If the evidence shows the dot is missing and editing is allowed, resume with that specific failure. If editing is forbidden or the review limit is reached, stop and report incomplete. If the required checks pass, finish and cite their results.

This is a conceptual harness design. In our native-goal workshop, the completion judge reviewed conversation evidence; it did not execute tests. The independent assertion was run afterward, so do not imply that assertion automatically triggered native-goal continuation. A production harness can wire executable checks into this review, but that is a separate implementation choice.

The goal supplies continuity. Evidence and limits determine whether another attempt is justified.

## 118. Before acting: choose the execution boundary

[Cut slide 118](http://127.0.0.1:5173/s/odsc-cut-review?p=118) · [Original slide 131](http://127.0.0.1:5173/s/odsc-full-visual-review?p=131)

Keep this distinction short: before an action runs, decide what effects it is allowed to have. Reading files can use read-only access. Edits and tests belong in a resettable sandbox. Publishing, purchasing, or deploying needs the required authorization before execution.

A reset cannot reliably undo money spent, a message someone has read, or a production change. Keep external effects out of the retry loop until authorized, and maintain visible progress and an interruption path.

This is the permission boundary. The next slide is about a different boundary: what evidence lets the agent declare completion.

## 119. The harness can reject “done” when the evidence is missing

[Cut slide 119](http://127.0.0.1:5173/s/odsc-cut-review?p=119) · [Original slide 134](http://127.0.0.1:5173/s/odsc-full-visual-review?p=134)

The harness engineering contribution here is enforcing the evidence requirement for a goal. The model can propose that it is done. The surrounding software decides whether to accept that completion claim. A reminder in a prompt is not the same as an executable check at this boundary.

Follow the diagram. The harness compares the supplied evidence with the required outcomes. If support is missing, it rejects COMPLETE and returns the unmet requirement. A useful repair can then proceed within the run limits; if blocked, the run reports incomplete.

The paper implements this with a trusted contract, evidence ledger, typed certificate, and deterministic verifier. In 66 incomplete checkpoints across 22 held-out task clusters, unsupported stops were forty for the comparison controller and zero for the gate. This checks support in the recorded trace under its assumptions, not external truth or overall code quality. Rejecting a false completion claim does not guarantee the task will be repaired.

For our formatter, the analogous design would require the relevant output check and regression results before accepting success. That is an illustrative extension, not what the native-goal judge in our workshop executed. We finish the section by returning to what that workshop actually showed.

Source: https://arxiv.org/abs/2608.23623v1

## 120. Goals and stopping: debrief

[Cut slide 120](http://127.0.0.1:5173/s/odsc-cut-review?p=120) · [Original slide 135](http://127.0.0.1:5173/s/odsc-full-visual-review?p=135)

A completion review can continue a run or reach its cap. Require evidence, a feasible next action, and a stopping limit. Successful completion, unsupported stops, and total spend.

Close the goals section by returning to the evidence we actually saw. With edits allowed, the repair was accepted after one goal review and the independent output check passed. With edits prohibited, the reviewer requested another attempt, but the run reached its two-review cap and the dot was still missing.

That tells us what goal mode did: it reviewed completion, prompted continuation, and respected the cap. It does not establish that goal mode improved repair success. An older ordinary-prompt run already fixed this bug, and the runs were not a matched comparison. The blocked condition was deliberately constructed. Also remember that the independent output checks ran afterward; they were not executed by the native completion judge.

Here is what I want you to take away: give a goal a check that represents the outcome, a feasible next action when work is missing, and a limit that stops unproductive continuation. Progress means better evidence about the outcome, not simply more turns. If a real blocker prevents the required action, surface it.

To evaluate this in your own harness, compare the same task, model, starter state, independent checker, and total call budget with and without goal mode. Measure successful completion, cost, and unsupported completion claims. A review cap alone is not a total compute budget.

Next we change another part of the harness: the number of agents. Does adding a worker or validator improve the result enough to justify its coordination and cost?

## 121. Multiple agents

[Cut slide 121](http://127.0.0.1:5173/s/odsc-cut-review?p=121)

Now we compare one agent with a team. We will look at the work we can separate and the coordination required to bring it back together.

## 122. Workshop 6: Does a second agent earn its cost?

[Cut slide 122](http://127.0.0.1:5173/s/odsc-cut-review?p=122) · [Original slide 137](http://127.0.0.1:5173/s/odsc-full-visual-review?p=137)

Fifty concurrent jobs should produce a count of fifty, and the jobs must remain concurrent. We’ll repair a shared-counter race using one agent, then compare it with a worker that delegates validation.

We’ll inspect the two arrangements, apply the same independent checker to both, and account for all parent and child work.

This exercise tests the cost of a second agent context used for sequential validation. It is not a parallel-execution experiment. Both passed, so the question is whether the added inspection earned its calls, tokens, and time in this pair. The later research slides cover genuinely parallel work.

## 123. Two architectures for the same repair

[Cut slide 123](http://127.0.0.1:5173/s/odsc-cut-review?p=123) · [Original slide 138](http://127.0.0.1:5173/s/odsc-full-visual-review?p=138)

In the first arrangement, one agent inspects, repairs, checks, and reports. In the second, the worker repairs and checks before launching a validator through the native task tool. The validator has a separate context and returns evidence to the worker, which owns the final report.

In the supplied classroom pair, the validator returns a 208-word verdict and reports no additional defect. Inspect the child transcript and the owner’s final synthesis: the aggregate test count in the final answer overstates what the suite outputs establish. This is sequential checking with a separate context. The older recording’s 142-word verdict and resource totals belong to a different take.

Conversation 06A: Single owner: repair without delegation

The single owner repairs the counter, checks the result and concurrency, and inspects the diff. It reaches the accepted result without a child agent. Keep that baseline in mind when we add a validator. The question is what additional evidence the second context provides and whether that contribution is worth its work. This focused fixture has two tests; read the suite output rather than infer test counts from the final summary.

Presenter reference: ODSC Demo 06A | Agents / Single repair owner | DeepSeek Flash. Archive file: 5513d10a637e4146970c1e844f79a1e6.html.

Conversation 06B: Owner and validator: inspect the handoff and synthesis

The owner repairs first, then sends a bounded checking task to a separate validator. Open the child history and compare the request with the returned 208-word verdict. The validator reports no additional defect, and the final candidate passes. The owner's final answer still misstates the total across all runs. A second context did not prevent that reporting error. Check the handoff, the child evidence, and the owner's synthesis as separate parts of the system.

Presenter reference: ODSC Demo 06B | Agents / Owner and native validator | DeepSeek Flash. Archive file: 886eb75f5a3c4d2db7bd9abd8177dd3c.html.

## 124. One agent can already validate its own repair

[Cut slide 124](http://127.0.0.1:5173/s/odsc-cut-review?p=124)

Conversation 06A: One agent can already validate its own repair

Show: Show the repeated tests and count/concurrency probe.

Say: Use this as the baseline when asking what a second agent contributes.

Limit: Brief baseline; the repair itself repeats Workshop 4. Focus on who performs verification.

Delivery: Brief comparison; move on once the contrast is clear.

Evidence: 5513d10a637e4146970c1e844f79a1e6; zero-based stored event indices 28, 29. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun.

Canvas screenshot cue: Expanded terminal output shows five repetitions, each with two passing tests, performed by the single owner.

## 125. Validate the handoff and the final synthesis

[Cut slide 125](http://127.0.0.1:5173/s/odsc-cut-review?p=125)

Conversation 06B: Validate the handoff and the final synthesis

Show: Show the read-only delegation and the final aggregate test-count claim.

Say: A validator can confirm the candidate without making the owner’s final summary accurate.

Limit: The child finds no new defect. Its eight runs of two tests are 16 passes; the owner incorrectly labels 16 as the total across all runs.

Delivery: Core walkthrough; pause on the displayed evidence and ask the audience what it establishes.

Evidence: 886eb75f5a3c4d2db7bd9abd8177dd3c; zero-based stored event indices 28, 35. The screenshot is an actual Agent Canvas capture with editable gold annotations. Original conversation and outcome are unchanged. No rerun. The child’s 16 passes correctly describes eight repetitions of two tests. The owner’s total-across-all-runs claim is inconsistent with its own listed repetitions; do not call the child’s count wrong.

Canvas screenshot cue: Owner final summary reports validator PASS but an inconsistent total: its own listed 3 + 8 + 1 repetitions cannot total 16 test passes. The child’s 8 × 2 = 16 passes is correct.

## 126. Fix a counter used by concurrent jobs

[Cut slide 126](http://127.0.0.1:5173/s/odsc-cut-review?p=126) · [Original slide 139](http://127.0.0.1:5173/s/odsc-full-visual-review?p=139)

In this recorded comparison, both conditions receive byte-identical starter files, the same repair task and protected tests, and DeepSeek V4.1 Flash for every model call. Both have a thirty-call ceiling that includes child calls.

The changed instruction is whether the worker delegates validation. The external checker repeats the async tests five times and audits the edit scope separately. It checks the count and that the jobs remain concurrent, so serializing all work is not an acceptable shortcut.

Classroom practice uses the focused async fixture and the current Flash profile. The thirty-call shared ceiling and token totals belong to the recording. For a new run, record the actual parent and child work rather than treating tool rows as model calls.

Classroom route: use the supplied read-only conversations. The earlier experiment results remain separate evidence; do not apply their timing, token totals, budgets, or model identities to the classroom histories.

## 127. Earlier experiment: validation added time and tokens

[Cut slide 127](http://127.0.0.1:5173/s/odsc-cut-review?p=127) · [Original slide 141](http://127.0.0.1:5173/s/odsc-full-visual-review?p=141)

Both candidates pass the same external checker and scope audit. The single-agent run takes 34.52 seconds, eight model calls, and 91,255 provider tokens. The worker and validator take 62.65 seconds, fifteen calls, and 181,347 tokens.

The thirty-call ceiling is shared, but actual expenditure differs. Tokens include cached input, repeated context, output, and all child requests. Run times exclude external verification, which takes about 3.2 seconds for each.

The checker verifies the count, concurrency, and allowed scope. Three unrelated starter failures remain outside this repair. One saved run per arrangement establishes neither a reliability ranking nor a general estimate of the validator’s value.

Classroom archive: Use the classroom single-owner and owner-plus-validator pair. Both pass the outside checks, and the validator reports no additional defect. Its returned report is 208 words. The owner still overstates an aggregate test count in its final answer, so use the visible suite outputs. This fixture has two tests; the resource totals and unrelated failures above belong to the historical recording.

## 128. Give each agent a purpose, a boundary, and a budget

[Cut slide 128](http://127.0.0.1:5173/s/odsc-cut-review?p=128) · [Original slide 142](http://127.0.0.1:5173/s/odsc-full-visual-review?p=142)

Both arrangements passed the same independent checker. One agent already solved this scoped repair. A second context supplied fresh inspection and a handoff, with more time and provider tokens and no observed correctness gain in this pair.

Give each child a bounded task, allowed files, a budget, and an evidence requirement. Keep one owner responsible for shared edits and the final result. Count every parent and child call.

A separate recording also showed that permission instructions can be violated. Test forbidden actions with a controlled runner before claiming that a child’s execution boundary is enforced.

Presenter reference: In the separate October 3 recording, a child created Python cache files and redirected diagnostic stderr despite instructions forbidding those actions. The parent violated wording and redirection rules too. This was not part of the matched October 2 comparison and does not prove a failed test was hidden. An isolated checking environment and controlled runner remain a proposed improvement.

## 129. Multi-agent research scored 90.2% higher in Anthropic’s eval

[Cut slide 129](http://127.0.0.1:5173/s/odsc-cut-review?p=129) · [Original slide 145](http://127.0.0.1:5173/s/odsc-full-visual-review?p=145)

Anthropic reported a 90.2 percent improvement on its internal research evaluation for an Opus 4 lead with Sonnet 4 workers versus one Opus 4 agent. This concerns evaluated research performance, not elapsed time or a 90.2 percent accuracy rate. The post does not publish the raw scores or precise aggregation behind this number.

Its evaluation discussion describes judging factual and citation accuracy, completeness, source quality, and tool efficiency. A concrete query was to identify board members across S&P 500 information-technology companies: independent searches let workers cover different companies before the lead synthesized the findings.

Compute was unequal. The post separately reports up to ninety percent less research time for complex queries using parallel agents and parallel tools; that is a different finding. Its fifteen-times-token comparison is against ordinary chat, not this single-agent baseline.

This is a positive vendor-reported system result. Next we examine requested reasoning budgets held constant.

Source: https://www.anthropic.com/engineering/multi-agent-research-system

## 130. You don't need multi-agent!

[Cut slide 130](http://127.0.0.1:5173/s/odsc-cut-review?p=130)

Noam Brown made this assessment in his September 17, 2026 interview with Dwarkesh Patel, discussing OpenAI's reported Navier–Stokes result using roughly 10,000 agents. He attributed the core capability to a very strong underlying model that could work over long horizons and think in parallel.

His estimate of less than ten percent credit is an interview judgment, not a measured contribution. Brown explicitly said they had not yet run the single-agent experiment for Navier–Stokes, so they did not know how long one agent would take. He also described multi-agent execution as a way to scale test-time compute in parallel and reduce latency, at an efficiency cost. Do not interpret this as evidence that multiple agents provided no benefit or would not help.

A successful team run establishes that the system could do the work. It does not by itself isolate the value of adding agents. Compare with a strong single-agent baseline and account for model capability, total compute, time, and coordination. The next slide examines research with a shared requested reasoning budget.

Source: https://www.dwarkesh.com/p/noam-brown

## 131. At the same requested budget, multi-agent did not always win

[Cut slide 131](http://127.0.0.1:5173/s/odsc-cut-review?p=131) · [Original slide 148](http://127.0.0.1:5173/s/odsc-full-visual-review?p=148)

Tran and Kiela provide a different comparison, using a shared requested reasoning budget. Blue is the better of two single-agent variants. Brick is the best of the five multi-agent variants. Every row uses the 500-token requested thinking budget; all eight model and task pairs from Table 1 are included.

Read across one row. On DeepSeek-R1 with MuSiQue, the best single-agent accuracy was 38.3 percent and the best team architecture reached 33.2 percent. On Gemini Pro with FRAMES, the result reversed: 60.0 percent for the best single variant and 66.0 percent for the best team.

Single-agent point estimates were higher in five of eight rows. This is a descriptive comparison of selected variants, not a significance test or an independent validation of the best architecture. The original table's confidence intervals overlap in some close comparisons; its bold grouping includes a single-agent variant in six of eight rows. Overlapping intervals do not prove equivalence.

Qwen3 is Qwen3-30B-A3B; DeepSeek is R1-Distill-Llama-70B; Gemini models are 2.5 Flash and Pro. The two single variants are SAS and SAS-L. The teams include sequential, subtask-parallel, parallel roles, debate, and ensemble. The authors note Gemini did not always follow the requested reasoning budget. These are multi-hop reasoning tasks, not a coding benchmark.

The practical question is whether a team beats a strong single-agent baseline at comparable resources on your task.

Source: https://arxiv.org/pdf/2604.02460v2, Table 1. Original table retained in assets/tran-table1-primary.png.

## 132. The same team architecture can help one task and hurt another

[Cut slide 132](http://127.0.0.1:5173/s/odsc-cut-review?p=132) · [Original slide 150](http://127.0.0.1:5173/s/odsc-full-visual-review?p=150)

Kim and colleagues compared 260 configurations across six benchmarks. These two original Figure 2 panels show why the task matters. Finance Agent rewards decomposable analysis: every tested team architecture improved on the single-agent baseline. Centralized coordination gained 80.8 percent relatively, rounded to 81 in the figure.

On PlanCraft, every team architecture lost ground, with relative declines from about 39 to 70 percent. The sequential dependencies made coordination a poor fit. Read the same colors across both panels: a team design does not carry the same benefit from one task to another.

The percentages are relative changes, not percentage points. The broader study also found mixed browsing and terminal results and lower mean SWE-bench performance for the tested teams. Coding and terminal cells used only twenty tasks, so those estimates are imprecise.

Use task structure to choose a candidate architecture, then test it with your actual model and workload. Vals gives us a more recent coding example; Park then tests a different mechanism, sharing verified discoveries.

## 133. Agent teams cost more, with one significant score gain

[Cut slide 133](http://127.0.0.1:5173/s/odsc-cut-review?p=133) · [Original slide 147](http://127.0.0.1:5173/s/odsc-full-visual-review?p=147)

Vals compared single agents and teams on 50 web apps. Sol at medium effort gained 7.3 percentage points, while mean cost rose from $1.22 to $3.07 per app. The other three score differences were not statistically significant; that does not prove their effects are zero.

More reasoning was another option, with its own cost and time tradeoff. Each setup ran once per app, with unequal budgets and an added delegation instruction for teams. This does not isolate teamwork at equal compute. Choose the outcome you need, then compare the full cost of reaching it.

Presenter reference: Sol medium’s 95% interval was +2.3 to +12.4 points, p = 0.005. Sol max single-agent scored 89.0% at $4.82 and 38.4 median minutes, versus 84.9%, $3.07, and 11.9 minutes for the medium team. At max effort, Sol teams took 27.6 minutes versus 38.4 alone; Opus teams took 174.1 versus 74.7, at $122 versus $23.77 mean cost. Sol delegated early and tested integration; Opus usually established a shared contract and delegated in waves. Different harnesses prevent attributing cross-model differences solely to models. Uncertainty reflects variation across apps, not repeated runs. Sol cost assumes reported usage includes subagents and omits request-level long-context price adjustments Vals could not evaluate.

Source: https://www.vals.ai/blogs/multi-agent-vibe-code-bench
Linked post: https://x.com/ValsAI/status/2108608719420600709

## 134. Communicating teams helped sometimes

[Cut slide 134](http://127.0.0.1:5173/s/odsc-cut-review?p=134) · [Original slide 149](http://127.0.0.1:5173/s/odsc-full-visual-review?p=149)

The answer is mixed, and the comparison is communication versus independent attempts—not simply five agents versus one attempt. Communicating teams shared verified discoveries through a log. The baseline ran agents independently and selected the best outcome afterward.

On ARC-AGI-3, five communicating Sonnet 4.6 agents solved eight percent of games; the best of five independent attempts solved 2.2 percent. Roughly thirty-three independent attempts were needed to match the team. Packing and MNIST compression also improved with sharing; the three original plots show these discovery tasks.

Terminal-Bench was different. Mean task success was 52.53 percent for one attempt, 62.36 percent for two independent attempts, and 60.67 percent for two communicating agents. So the team beat one attempt but not two independent attempts. This was a small descriptive comparison on 89 tasks, not a precise estimate of the difference.

The practical hypothesis is to share useful intermediate discoveries when other workers can verify and reuse them. The discovery tasks exposed that kind of feedback. Communication can also reduce diversity or create interference. Equal per-agent limits do not imply equal realized token cost, and independent best-of-k assumes a way to select a successful result.

Source: Park et al., arXiv:2609.21032v1, Figure 1 and Table 3. https://arxiv.org/pdf/2609.21032v1

## 135. Factory serializes code changes and parallelizes investigation.

[Cut slide 135](http://127.0.0.1:5173/s/odsc-cut-review?p=135) · [Original slide 152](http://127.0.0.1:5173/s/odsc-full-visual-review?p=152)

Factory’s policy separates changing shared code from independent investigation. It reports running one code-changing worker or validator at a time in Missions. Independent repository search, API research, and review can still run in parallel.

When workers change shared files, ownership and integration become part of the problem. Serializing writes trades potential throughput for fewer conflicting edits and incompatible decisions. It is one concrete policy to test. The question is which work separates cleanly and what evidence the owner needs to accept the combined result.

This is our practitioner example of an explicit coordination choice. Factory separates read-only investigation from changes to shared code. The policy addresses conflicting writes and integration risk; it is a design decision from a production coding system, not a controlled estimate of a performance gain.

## 136. Multiple agents: debrief

[Cut slide 136](http://127.0.0.1:5173/s/odsc-cut-review?p=136) · [Original slide 143](http://127.0.0.1:5173/s/odsc-full-visual-review?p=143)

More agents did not consistently produce better results. Separate independent work; define ownership and validation. Integrated quality, total cost, time, and coordination work.

A separate context can investigate an independent question while another agent works. The parent still has to assign the task, supply context, collect the result, and verify the combined outcome.

For parallel work, compare elapsed time saved with assignment and synthesis costs. For validation, measure whether the extra inspection catches relevant failures. The Vals study we just saw tested those tradeoffs across full web applications.

Across these studies, the decision is whether another context, independent search, or shared discovery improves the completed outcome enough to justify coordination. Compare against a strong single agent, include every parent and child call, and verify the integrated result.

## 137. Putting it together

[Cut slide 137](http://127.0.0.1:5173/s/odsc-cut-review?p=137)

We have worked through six harness decisions. To close, we will connect them to the evidence, the execution boundary, and the next experiment you can run.

## 138. Six assumptions tested

[Cut slide 138](http://127.0.0.1:5173/s/odsc-cut-review?p=138) · [Original slide 155](http://127.0.0.1:5173/s/odsc-full-visual-review?p=155)

We tested six familiar assumptions. “Harnesses don’t matter. I’ll just use a coding agent.” We held the model and task constant and compared the repair, time, tool requests, and checks across harnesses. All three passed our small task; the incomplete token receipts did not support a billed-cost ranking.

“More tools make a better agent.” We saw a custom PR tool reduce collection work. Eight extra operations went unused and enlarged the tool definitions. Those trials did not establish a billed-cost or general confusion effect.

“More instructions, skills, and memory improve performance.” We looked at what helped to remember or retrieve, and what happened when guidance became stale or unnecessary.

“Use the strongest model for every task.” We compared whether cheaper models could pass the same checks and discussed what evidence justified escalation.

“Give the agent an objective and let it run.” We examined how to track progress and what evidence we needed before accepting that the work was complete.

“What you need is a multi-agent system.” We compared which tasks benefited and whether the gains justified the extra compute and coordination.

Those comparisons gave us a way to assess each assumption against evidence. I want to finish with three examples that reinforce why those comparisons matter. Each keeps the task model fixed, but they change different parts of the surrounding system.

Build: reveal one complete assumption and its corresponding question on each advance, for six advances total.

## 139. OpenAI reported ARC-AGI-3 rising from 13.3% to 38.3%

[Cut slide 139](http://127.0.0.1:5173/s/odsc-cut-review?p=139) · [Original slide 156](http://127.0.0.1:5173/s/odsc-full-visual-review?p=156)

OpenAI reported holding GPT-5.6 Sol fixed while retaining private reasoning across actions and replacing rolling truncation with compaction. On the ARC-AGI-3 public task set, RHAE rose from 13.3 to 38.3 percent while output tokens fell sixfold.

Two settings changed together in this provider-authored comparison, so it does not isolate their separate contributions. The next example searches across configurations instead of manually selecting two settings.

## 140. Meta-Harness generates and improves harness code

[Cut slide 140](http://127.0.0.1:5173/s/odsc-cut-review?p=140) · [Original slide 157](http://127.0.0.1:5173/s/odsc-full-visual-review?p=157)

This is the next step in harness engineering: an agent builds and improves the harness code itself. Meta-Harness searches over system prompts, tool definitions, completion checks, and context management while keeping the task model fixed.

Follow the loop. The proposing agent reads a filesystem of prior harness code, execution traces, and evaluation scores. It proposes a new harness, which is run on evaluation tasks with the frozen model. The code, traces, and scores are saved so the next proposal can diagnose failures and revise the harness. This is an iterative code-generation and evaluation process, rather than a one-time hand-written configuration. It does not mean the task agent rewrites its harness during every task.

How much did it help? With Claude Opus 4.6 on TerminalBench-2, Meta-Harness reported a 76.4 percent pass rate. The project compares that with 58.0 percent for Claude Code: an 18.4-percentage-point gap with the same task model. Against the stronger Terminus-KIRA baseline at 74.7 percent, the gain was 1.7 points. The size of the improvement depends on the baseline.

The benchmark has 89 tasks with five independent trials per task. The comparison systems’ scores come from the official leaderboard, so this is a reported same-model benchmark comparison, not our own controlled rerun. These pass rates also do not include the cost of searching for the harness.

The important result is that generated harness code can outperform hand-built harnesses on the evaluated tasks without changing the task model. The next example also uses execution feedback to improve the runtime.

Source: https://yoonholee.com/meta-harness/

## 141. Harness-R1 learns to repair the harness from failures

[Cut slide 141](http://127.0.0.1:5173/s/odsc-cut-review?p=141) · [Original slide 158](http://127.0.0.1:5173/s/odsc-full-visual-review?p=158)

Meta-Harness showed an agent searching for better harness code. Harness-R1 trains the harness engineer itself to make better edits from failures.

Follow the diagram from left to right. A separate 9B engineer receives batches of failed target-agent runs and produces validated executable patches. These can change context and memory initialization, guidance before decisions, action validation, and recovery after feedback.

The target runs again with the patched harness. Task-success rewards train only the engineer, using reinforcement learning called GRPO after supervised initialization. The target model’s weights stay frozen during this process.

Across WebShop, ALFWorld, and DBBench, average success rose from 44.3 to 53.6 percent with Qwen3.5-9B: a 9.3-percentage-point improvement. In a separate condition, the researchers first fine-tuned the target. A target-specific engineer then improved its harness, raising success from 59.2 to 64.2 percent. Harness learning added value even after target training.

This August preprint shows a learned capability to edit the runtime around a model. The gains are specific to these evaluated environments. That brings us to the next question: what should we retest when the model changes?

Source: https://arxiv.org/abs/2608.02276v1

## 142. Model changes can make harness workarounds obsolete

[Cut slide 142](http://127.0.0.1:5173/s/odsc-cut-review?p=142) · [Original slide 161](http://127.0.0.1:5173/s/odsc-full-visual-review?p=161)

This screenshot is a reminder of how the coding workflow has changed. In a chat-based workflow, the model returned code and we copied it into the project, ran it, and brought errors back. The person carried context and execution results between the chat and the development environment.

With a coding agent, the harness can connect the model to repository files, editing tools, execution, and checks. Meta-Harness and Harness-R1 show a further direction: generating and improving that surrounding software from execution feedback.

As models and workflows change, a workaround that once helped can become unnecessary or get in the way. Preserve stable repository facts, but retest model-specific prompts, tool interfaces, context policies, and routing.

Version the configuration and preserve failure cases so you can compare behavior over time. One boundary should remain explicit throughout those changes: what the agent’s commands can reach.

Visual: user-supplied screenshot of the ChatGPT 4 coding interface.

## 143. Mistakes can easily happen

[Cut slide 143](http://127.0.0.1:5173/s/odsc-cut-review?p=143) · [Original slide 162](http://127.0.0.1:5173/s/odsc-full-visual-review?p=162)

This screenshot reports deletion of a production setup, including a database and snapshots. It is an attributed incident report rather than an independently audited reconstruction.

The execution lesson is the available authority. Commands that can reach production can affect production. Separate the task workspace and runtime from that access unless the task requires it and the action is authorized.

## 144. Mistakes can easily happen

[Cut slide 144](http://127.0.0.1:5173/s/odsc-cut-review?p=144) · [Original slide 163](http://127.0.0.1:5173/s/odsc-full-visual-review?p=163)

Xingyao Wang points out that a local agent can inherit authority through environment variables, cloud CLIs, SSH configuration, and forgotten tokens.

A fresh runtime lets us choose what to supply deliberately. Moving execution to the cloud does not automatically remove risk; credentials granted there still carry authority. Inspect the actual credential injection and reachable services.

## 145. Whew! What we covered

[Cut slide 145](http://127.0.0.1:5173/s/odsc-cut-review?p=145)

We tested six themes: harness choice, tools, context and memory, model choice and routing, goals and validation, and multi-agent systems. We questioned the assumptions behind each one, inspected how the systems worked, and looked at results. Point to the six parts of the robot illustration: the body, tool, notebook and memory, head, goal and completion checklist, and teammate robots. These are design choices, not six sequential steps. The drawing is a visual shorthand for the workshop themes.

That gave us intuition about what changes agent behavior and evidence about where those changes helped, failed, or added cost. The results were specific to the tasks and setups we examined. They gave us a starting point for our own decisions.

We also practiced a method we can keep using. Establish a baseline with a saved task, starting state, and acceptance checks. Change one thing, verify the result, and compare quality, full cost, and time. Repeat the comparison as models, harnesses, and workloads change.

The reminder I want you to leave with is that harnesses matter. The software around the model shapes what it can do and how reliably it finishes the work. We now have a way to evaluate those choices rather than take the claims on faith.

The final step is to choose one experiment in your own workflow.

## 146. Your next experiment

[Cut slide 146](http://127.0.0.1:5173/s/odsc-cut-review?p=146) · [Original slide 165](http://127.0.0.1:5173/s/odsc-full-visual-review?p=165)

Pick one recurring failure in a workflow you use. Save the task, starting state, and acceptance checks so you can compare the same work. Then change one harness decision. For example, add a focused tool for a repeated retrieval step, or supply current project notes.

Check the result and count the full task, including repairs and verification. Measure time and price fresh input, cached input, and output separately. Check the files, credentials, and services the agent can reach.

Keep the change when the benefit justifies the tradeoff. An efficiency change should preserve verified quality. Better correctness or stronger isolation can justify additional cost. Rerun the comparison when the model or workload changes. The workshop repository has examples to start from.
