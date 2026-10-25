# Harness Engineering

A practical companion to my talk *Engineering the Harness*. This repo collects the patterns, experiments, and reference implementations I use when thinking about coding-agent harnesses in concrete terms.


---

## Presentation Materials

- **Deep Dive on Harness Engineering** - [Youtube](https://www.youtube.com/watch?v=KijChx7q2nY), [Blog post - all the slides](https://rajivshah.com/blog/harness-engineering.html), [ODSC Podcast](https://opendatascience.com/what-is-an-agent-harness-the-architecture-behind-reliable-agentic-ai/)
- **ODSC Talk, April 28**. [ODSC East](https://odsc.ai/east/) · [Slides](./talks/ODSC_2026/ODSC_Shah_Apr2026.pdf) · [References](./talks/ODSC_2026/references.md)


---

<!-- HARNESS-VIDEO-GALLERY:START -->
## References and further reading

Browse the [reference library](https://rajshah4.github.io/learn-openhands-harness/references) for sources from the current talk and additional reading from backup slides. Filter by topic or search across papers, engineering posts, code, and lectures. Each source records where it appears in the slide collections.

## Video gallery

### Featured full talk

| Featured full talk |
| --- |
| <a href="https://www.youtube.com/watch?v=KijChx7q2nY"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/KijChx7q2nY.jpg" width="600" alt="Watch Harness Engineering Deep Dive"></a><br><strong>Harness Engineering Deep Dive</strong> (34:14, May 2026)<br>The full introduction to engineering coding agents: model choice, retrieval, memory, tool use, feedback loops, and system architecture.<br><a href="https://www.youtube.com/watch?v=KijChx7q2nY">Watch on YouTube</a> · <a href="https://github.com/rajshah4/harness-engineering#presentation-materials">Slides and references</a> |

### Short videos

Standalone shorts on the decisions around a coding agent. [Browse and search all 16 shorts](https://rajshah4.github.io/learn-openhands-harness/videos) on the Learn Harness Engineering site.

### Harness choice

| | |
| --- | --- |
| <a href="https://www.instagram.com/reel/DVcg9ddDYSN/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DVcg9ddDYSN.jpg" width="150" alt="Watch System prompts encode the workflow"></a><br><strong>System prompts encode the workflow</strong> (1:32)<br>System prompts carry workflow decisions: when to plan, retry a tool, edit code, and run tests.<br><a href="https://www.instagram.com/reel/DVcg9ddDYSN/">Instagram</a> · <a href="https://www.youtube.com/shorts/ReRk3pHy3t4">YouTube</a> |  |

### Tools

| | |
| --- | --- |
| <a href="https://www.instagram.com/reel/Dal_BzRtIM4/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/Dal_BzRtIM4.jpg" width="150" alt="Watch Tool schemas and harness overhead"></a><br><strong>Tool schemas and harness overhead</strong> (1:39)<br>Tool definitions consume context too. A simpler harness can change the cost of the same model.<br><a href="https://www.instagram.com/reel/Dal_BzRtIM4/">Instagram</a> · <a href="https://www.youtube.com/shorts/4qpKlx8cExI">YouTube</a> | <a href="https://www.instagram.com/reel/DY-Zy62s7_e/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DY-Zy62s7_e.jpg" width="150" alt="Watch Dynamic workflows"></a><br><strong>Dynamic workflows</strong> (1:28)<br>Give an agent a tool and let it write orchestration code, delegate work, and bring the results together.<br><a href="https://www.instagram.com/reel/DY-Zy62s7_e/">Instagram</a> · <a href="https://www.youtube.com/shorts/WM7ksAW1iMY">YouTube</a> |

### Context and memory

| | |
| --- | --- |
| <a href="https://www.instagram.com/reel/Ddz04RrMm7F/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/Ddz04RrMm7F.jpg" width="150" alt="Watch CupidBot: retrieval methods"></a><br><strong>CupidBot: retrieval methods</strong> (1:10)<br>CupidBot explains Find, BM25, embeddings, rerankers, GraphRAG, and agentic search through one urgent question.<br><a href="https://www.instagram.com/reel/Ddz04RrMm7F/">Instagram</a> · <a href="https://www.youtube.com/shorts/2hvxkTTLLS4">YouTube</a> | <a href="https://www.instagram.com/reel/Ddxd6qQt7P-/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/Ddxd6qQt7P-.jpg" width="150" alt="Watch CliffCompaction"></a><br><strong>CliffCompaction</strong> (1:28)<br>Why deliberately trimming old tool output can help an agent continue a long coding task.<br><a href="https://www.instagram.com/reel/Ddxd6qQt7P-/">Instagram</a> · <a href="https://www.youtube.com/shorts/_95LR00FVX8">YouTube</a> |
| <a href="https://www.instagram.com/reel/DYgD2EatBZL/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DYgD2EatBZL.jpg" width="150" alt="Watch Hermes: memory in layers"></a><br><strong>Hermes: memory in layers</strong> (1:05)<br>Build agent memory in layers, from repository rules and session history to reusable and self-written skills.<br><a href="https://www.instagram.com/reel/DYgD2EatBZL/">Instagram</a> · <a href="https://www.youtube.com/shorts/Tca4g4B6JxU">YouTube</a> | <a href="https://www.instagram.com/reel/De0ZgGkNXsf/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/De0ZgGkNXsf.jpg" width="150" alt="Watch FrontierMemory: lessons from work logs"></a><br><strong>FrontierMemory: lessons from work logs</strong> (1:20)<br>Turn past work logs into useful lessons, instructions, and skills for the next task.<br><a href="https://www.instagram.com/reel/De0ZgGkNXsf/">Instagram</a> · <a href="https://www.youtube.com/shorts/JCv5xFWe0Tw">YouTube</a> |
| <a href="https://www.instagram.com/reel/DTG3hK5DU6m/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DTG3hK5DU6m.jpg" width="150" alt="Watch Recursive Language Models"></a><br><strong>Recursive Language Models</strong> (1:28)<br>Let the model explore a large context with code instead of placing every detail in its prompt.<br><a href="https://www.instagram.com/reel/DTG3hK5DU6m/">Instagram</a> · <a href="https://www.youtube.com/shorts/z1UDT2ZZsSA">YouTube</a> |  |

### Model routing

| | |
| --- | --- |
| <a href="https://www.instagram.com/reel/DZL8rbhNSdn/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DZL8rbhNSdn.jpg" width="150" alt="Watch Four ways to route models"></a><br><strong>Four ways to route models</strong> (1:46)<br>Rules, classifiers, cost-aware selection, and cascades offer four ways to choose the next model.<br><a href="https://www.instagram.com/reel/DZL8rbhNSdn/">Instagram</a> · <a href="https://www.youtube.com/shorts/9HJil4jDBx8">YouTube</a> |  |

### Goals and stopping

| | |
| --- | --- |
| <a href="https://www.instagram.com/reel/DML_l3Fg18h/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DML_l3Fg18h.jpg" width="150" alt="Watch Verifiers’ Law"></a><br><strong>Verifiers’ Law</strong> (1:19)<br>Why checking an answer can be easier than finding it, and how that shapes progress in coding and math.<br><a href="https://www.instagram.com/reel/DML_l3Fg18h/">Instagram</a> · <a href="https://www.youtube.com/shorts/xz38mya1XEI">YouTube</a> | <a href="https://www.instagram.com/reel/Da_meCUNeb3/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/Da_meCUNeb3.jpg" width="150" alt="Watch Harness evolution or just more retries?"></a><br><strong>Harness evolution or just more retries?</strong> (1:54)<br>Test a self-improving harness against simple retries at the same budget and on held-out tasks.<br><a href="https://www.instagram.com/reel/Da_meCUNeb3/">Instagram</a> · <a href="https://www.youtube.com/shorts/-3koxEhdPAw">YouTube</a> |
| <a href="https://www.instagram.com/reel/DcCA1aqBTpS/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DcCA1aqBTpS.jpg" width="150" alt="Watch Long-running agents overfit validation"></a><br><strong>Long-running agents overfit validation</strong> (2:21)<br>A competition story about agents optimizing validation noise, with four ways to guard against it.<br><a href="https://www.instagram.com/reel/DcCA1aqBTpS/">Instagram</a> · <a href="https://www.youtube.com/shorts/M-BE58cUGbs">YouTube</a> |  |

### Multiple agents

| | |
| --- | --- |
| <a href="https://www.instagram.com/reel/DX8GH1-NXDd/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DX8GH1-NXDd.jpg" width="150" alt="Watch Multi-agent coding needs isolation"></a><br><strong>Multi-agent coding needs isolation</strong> (1:27)<br>Managers, dependency graphs, worktrees, merges, and tests make parallel coding work reviewable.<br><a href="https://www.instagram.com/reel/DX8GH1-NXDd/">Instagram</a> · <a href="https://www.youtube.com/shorts/YjW6WY6f1BQ">YouTube</a> | <a href="https://www.instagram.com/reel/DcWJEsDxSuX/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DcWJEsDxSuX.jpg" width="150" alt="Watch Office politics at machine speed"></a><br><strong>Office politics at machine speed</strong> (1:12)<br>An agent swarm finds more bugs, burns more tokens, and sometimes sabotages its own teammates.<br><a href="https://www.instagram.com/reel/DcWJEsDxSuX/">Instagram</a> |
| <a href="https://www.instagram.com/reel/DbOfwMTMApv/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DbOfwMTMApv.jpg" width="150" alt="Watch NeuroGolf: managing agent work"></a><br><strong>NeuroGolf: managing agent work</strong> (1:49)<br>What a coding competition teaches about task queues, memory, isolated workspaces, and approval gates.<br><a href="https://www.instagram.com/reel/DbOfwMTMApv/">Instagram</a> · <a href="https://www.youtube.com/shorts/rNoYej9c0u8">YouTube</a> | <a href="https://www.instagram.com/reel/DSQoPlpj5jB/"><img src="https://raw.githubusercontent.com/rajshah4/learn-openhands-harness/main/docs/public/video-library/covers/DSQoPlpj5jB.jpg" width="150" alt="Watch More agents is not a strategy"></a><br><strong>More agents is not a strategy</strong> (1:39)<br>Tool overload, coordination costs, and amplified errors explain why adding agents can hurt performance.<br><a href="https://www.instagram.com/reel/DSQoPlpj5jB/">Instagram</a> · <a href="https://www.youtube.com/shorts/kZjCp9KYO64">YouTube</a> |

<!-- HARNESS-VIDEO-GALLERY:END -->

---

## Vocabulary

These terms get used interchangeably in practice and tangled up in conversation. The talk leans on precise distinctions between them, so it's worth pinning them down.

- **Model**. The language model itself. The reasoning engine. What you swap when you move from Opus to GPT-5.
- **Harness**. Everything outside the model that shapes what it sees, what it can do, what it remembers, and how it repeats. Owns the context window, tool schemas, loop policy, memory, sandbox. Every decision you can make without retraining.
- **Agent**. Model + Harness. The thing that actually finishes work. "Coding agent," "research agent," "computer-use agent" describe agents differentiated by their harness, not their model.
- **SDK**. A code library for building harnesses. OpenHands SDK, Claude Agent SDK, LangChain. Hides the boilerplate (workspace setup, conversation loop, tool dispatch, sandboxing) so you can focus on harness decisions that matter.
- **Tool**. A function the model can call. Bash, file edit, web search. Tools turn the model's decisions into real actions.
- **Skill**. A reusable capability pack: trigger + reference manual + scripts. Loaded on demand. Externalizes *expertise* the way memory externalizes *state*.
- **Context window**. What's in the model's prompt right now. Has a hard token limit. Degrades well before that: middle-of-prompt facts disappear, verbose tool output crowds out instructions.
- **Loop**. The iterative cycle the agent runs inside: build prompt → choose action → execute → feed result back. Modern coding agents loop 50 to 200 times per task. The harness decides when the loop stops.
- **Subagent**. A scoped child agent the orchestrator spawns for a bounded task. The subagent runs in its own context window; the result returns as a summary. Useful when context is the bottleneck; expensive when coordination is.
- **MCP**. Model Context Protocol. Anthropic's open standard for exposing tools to agents. The harness loads MCP servers; the agent calls the tools.

## The five levers

A modern coding agent is a model inside a harness. Model quality matters, but harness decisions often determine whether the agent is usable in practice.

1. [Model](#model). Which weights, and how to evaluate them honestly
2. [Retrieval](#retrieval). How the agent finds information
3. [Memory & Context](#memory--context). What it remembers, what it forgets, and what it writes down
4. [Loops & Tool Use](#loops--tool-use). How it acts with discipline
5. [Architecture](#architecture). One agent or many

At the bottom: [reference implementations](#reference-implementations) worth reading end-to-end.

---

## Model

The same model can perform very differently depending on the harness wrapped around it. If you want to compare models honestly for agentic coding, you need benchmarks that make the harness visible.

- **[Cross-benchmark model specialization](./experiments/model-specialization/)**. reusable prompt + local visualization showing that leaderboard winners change across bug fixing, app building, information gathering, and terminal-heavy tasks.
- **[Multi-source leaderboard analysis guides](./experiments/model-specialization/references/normalization-schema.md)**. lightweight workflow for analyzing OpenHands Index and Artificial Analysis without turning the repo into a scraper collection.

- **[OpenHands Index](https://index.openhands.dev/home)**. leaderboard across coding benchmarks with harness configuration made explicit.
- **[SWE-bench Verified](https://www.swebench.com/)**. a canonical harness-sensitive benchmark for software engineering tasks.
- **[Terminal-Bench / Harbor](https://www.tbench.ai/)**. stresses environment control and long-horizon execution. Useful when the task is less "write a patch" and more "drive a shell for an hour."
- **[Harvey LAB / Legal Agent Benchmark](https://github.com/harveyai/harvey-labs)**. a legal-work analogue to coding-agent benchmarks: partner-style instructions, a closed matter file, reviewable legal work product, and expert-written pass/fail rubrics. Harvey's [launch post](https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark) describes 1,200+ tasks across 24 practice areas and more than 75,000 rubric criteria, and the repo ships both the dataset and the execution/evaluation harness. Michael Kennedy's [Trust Your Harness](https://www.linkedin.com/pulse/trust-your-harness-michael-kennedy-h1ehe/) write-up makes the memorable harness point: Haiku reportedly moving from 62 to 92 on a legal-agent evaluation after harness changes. Treat that as the legal-domain version of "same model, different harness, different outcome."

---

## Retrieval

Retrieval is about getting the right evidence quickly. For coding agents, lexical retrieval is usually the right baseline: `grep`, BM25, and whole-file access are often more effective than chunked semantic retrieval, especially when the model can iteratively refine its own queries. Add semantic search when traces show it finds better evidence, avoids misses, or shortens the path to the answer.

- *Planned:* **Lexical vs. semantic on symbol lookup** (`experiments/retrieval/`). Run a "find where `foo_bar` is defined" query through `grep`, BM25 (via [bm25s](https://github.com/xhluca/bm25s)), and dense embeddings on a real codebase. No API key needed.
- **[Retriever vs. Reranker](https://colab.research.google.com/drive/1lRr0J5fumRBP-RmTm5kD9lMd9nuOlhmI)** (Colab). Why hybrid search plus a reranker beats either retriever alone. Runs in a browser.
- **[Agentic RAG vs. Vanilla RAG](https://colab.research.google.com/drive/1hG3dPgd8wjrO9wSD0K0Feo7EY1iXqrEN)** (Colab). One-shot retrieval vs. an agent that rewrites its own queries. Accuracy climbs, latency climbs harder.
- **[BEIR benchmarks walkthrough](https://colab.research.google.com/drive/1HfutiEhHMJLXiWGT8pcipxT5L2TpYEdt)** (Colab). Stress-test retrievers across domains rather than one cherry-picked task.

*Further reading:* [Anthropic on effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

## Memory & Context

Longer context windows do not remove the need for memory design. In practice, agents benefit from deliberate compaction, file-backed working state, and restraint about what gets loaded into every prompt.

- **[Your LLM Forgets the Middle](https://profoz.substack.com/p/your-llm-forgets-the-middle-why-and)**. article + companion [positional bias notebook](https://github.com/sinanuozdemir/building-agentic-ai/blob/main/prompting/summary_positional_bias.ipynb). Runnable demonstration of "lost in the middle": put key instructions in the middle of a long prompt and watch accuracy collapse.
- **[Claude system prompt evolution, May 2025 to Jun 2026](./experiments/claude-prompt-evolution/)**. open `index.html` in a browser and compare versions over time. Useful as a concrete example of how tool, safety, and behavioral guidance evolve as a harness matures.
- *Planned:* **`plan.md` as externalized memory**. same agent, with and without a workspace plan file it reads and checks off. The pattern to mirror is LangChain's [deepagents](https://docs.langchain.com/oss/python/deepagents) `write_todos` tool, which dumps the plan to a file the agent reads on every iteration.
- **[rajshah4/evaluating-skills-tutorial](https://github.com/rajshah4/evaluating-skills-tutorial)**. A/B evaluation of agent skills as externalized memory and procedure.
- **[Anthropic cookbook: automatic context compaction](https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/automatic-context-compaction.ipynb)**. runnable Jupyter notebook. Customer service agent processes 50+ tickets in one session; you watch the token count go from 204K to 82K (58% reduction) when automatic compaction kicks in. `pip install anthropic`, an API key, and you're running in five minutes.
- **[Anthropic cookbook: three context-engineering strategies, side by side](https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/context_engineering/context_engineering_tools.ipynb)**. same workload, three different policies: `compact` (LLM summarization), `clear_tool_uses` (drop old tool results), and `memory` (persistent cross-session). Useful for comparing tradeoffs directly.

*More on compaction:*
- **[OpenHands context condensation](https://openhands.dev/blog/openhands-context-condensensation-for-more-efficient-ai-agents)**. measured 2× per-turn cost reduction with equal or better SWE task performance. Multiple condenser strategies behind one plugin interface.
- **[LangChain on autonomous context compression](https://www.langchain.com/blog/autonomous-context-compression)**. letting the agent decide *when* to compact rather than threshold-based triggering.
- **[Kilo Code: context condensing](https://kilo.ai/docs/customize/context/context-condensing)**. practical configuration knobs for a production agent (when to trigger, what to keep, how much to summarize).
- **Claude Code's three-layer recipe (from the leak):** MicroCompact (cheap, every turn) → Session Memory Compact (medium, no API call, disk-backed summary) → Legacy Compact (expensive, full LLM summarization). This is a useful example of compaction as a pipeline rather than a single operation.

*Further reading:* [Anthropic on effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

---

## Loops & Tool Use

Loop quality depends less on prompt phrasing than on execution discipline. Tool schemas, verification steps, bounded outputs, and environment constraints usually matter more than extra prompting.

- **[ralph-loop-quickstart](https://github.com/coleam00/ralph-loop-quickstart)**. a concrete example of an undisciplined autonomous loop.
- *Planned:* **Ralph Wiggum with and without protocol** (`experiments/loops/`). Same agent, same failing task, two tool schemas. One accepts `{command}`; the other requires `{hypothesis, verification_plan, command}`. The goal is to make the effect of protocol design visible independent of any particular SDK.

*Further reading:* [Anthropic on writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

## Architecture

Multi-agent systems are useful, but they are not a free performance gain. Coordination cost, context splitting, and error propagation all have to be managed explicitly.

- *Planned:* **Single agent vs. orchestrator+worker** (`experiments/architecture/`). Same task run two ways, measured on tokens, wall-clock, and accuracy. Include a case where delegation wins (bounded subtask with summary return) and a case where it loses (intermediate context matters for the orchestrator).
- **[Multi-agent basics](https://github.com/sinanuozdemir/building-agentic-ai/tree/main/multi_agent_basics)**. worked examples of orchestrator/worker patterns.
- **[Anthropic's multi-agent research system write-up](https://www.anthropic.com/engineering/multi-agent-research-system)**. a production example of when the coordination cost is worth paying.

---

## Hands-on tutorials

Walkthroughs that pair the conceptual levers above with a real, runnable harness you can read and modify.

- **[learn-openhands-harness](https://github.com/rajshah4/learn-openhands-harness)**. guided lab for OpenHands Agent Server and Agent Canvas. Seven projects turn the five levers into runnable artifacts: trace-reading checklist, model routing policy, retrieval decision rule, decomposition plan, memory policy, security profile, critic, and capstone `harness.py`. Project structure inspired by `walkinglabs/learn-harness-engineering` below.
- **[walkinglabs / learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering)**. project-based course built around the `AGENTS.md` + `feature_list.json` + `init.sh` + `progress.md` convention. Heavier on convention than on plumbing; complements the OpenHands tutorial well.
- **[nicolaygerold/howtobuildacodingagent](https://github.com/nicolaygerold/howtobuildacodingagent)**. workshop titled "Context Engineering: How We Got Here." Each topic pairs a short explainer doc with a runnable demo shipped as pi extensions and Amp plugins: the agent core loop (including Thorsten Ball's 400-line Go agent, runnable), harness engineering, naive vs. modern compaction, file-based compaction, plan mode, handoff, RLMs, and tool design (read vs. bash, edit vs. `apply_patch`). Strong on the historical arc of how context management moved from the user into the harness.

---

## Reference implementations

Projects worth reading end-to-end if you want to study harness design in code.

- **[SWE-agent](https://github.com/SWE-agent/SWE-agent)**. mature research coding agent. Harness, prompts, tools, and environment are all directly inspectable and well-documented.
- **[Harvey LAB](https://github.com/harveyai/harvey-labs)**. legal-agent benchmark and harness. The [`docs/architecture.md`](https://github.com/harveyai/harvey-labs/blob/main/docs/architecture.md) and [`sandbox/README.md`](https://github.com/harveyai/harvey-labs/blob/main/sandbox/README.md) are especially worth reading: the system splits task, agent, sandbox, and results into independent parts; runs are filesystem-first (`tasks/` in, `results/` out); tools are a closed set (`bash`, `read`, `write`, `edit`, `glob`, `grep`); and the Podman sandbox is part of the harness contract, not an afterthought. The evaluator grades output deliverables criterion by criterion using scoped, all-pass legal rubrics, which is the right operational framing for high-stakes work where missing one material issue can invalidate the result.
- **[deepagents](https://github.com/langchain-ai/deepagents)**. LangChain's open-source reference for longer-running agents with middleware and harness patterns.
- **[OpenHands SDK](https://docs.openhands.dev/sdk)**. the open-source agent SDK I work on at OpenHands. See the [companion tutorial](https://github.com/rajshah4/learn-openhands-harness) for a guided tour of agent-server + agent-canvas as a working harness.
- **[cobusgreyling/ai_harness_engineering](https://github.com/cobusgreyling/ai_harness_engineering)**. a playground harness covering the main harness components, with YAML-based configuration and side-by-side comparisons.
