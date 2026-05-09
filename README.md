# Harness Engineering

A practical companion to my talk *Engineering the Harness*. This repo collects the patterns, experiments, and reference implementations I use when thinking about coding-agent harnesses in concrete terms.


---

## Presentation Materials

- **Deep Dive on Harness Engineering** - [Youtube](https://www.youtube.com/watch?v=KijChx7q2nY)
- **ODSC Talk, April 28** — [ODSC East](https://odsc.ai/east/) · [Slides](./talks/ODSC_2026/ODSC_Shah_Apr2026.pdf) · [References](./talks/ODSC_2026/references.md)


---

## Vocabulary

These terms get used interchangeably in practice and tangled up in conversation. The talk leans on precise distinctions between them, so it's worth pinning them down.

- **Model** — The language model itself. The reasoning engine. What you swap when you move from Opus to GPT-5.
- **Harness** — Everything outside the model that shapes what it sees, what it can do, what it remembers, and how it repeats. Owns the context window, tool schemas, loop policy, memory, sandbox — every decision you can make without retraining.
- **Agent** — Model + Harness. The thing that actually finishes work. "Coding agent," "research agent," "computer-use agent" describe agents differentiated by their harness, not their model.
- **SDK** — A code library for building harnesses. OpenHands SDK, Claude Agent SDK, LangChain. Hides the boilerplate (workspace setup, conversation loop, tool dispatch, sandboxing) so you can focus on harness decisions that matter.
- **Tool** — A function the model can call. Bash, file edit, web search. Tools turn the model's decisions into real actions.
- **Skill** — A reusable capability pack: trigger + reference manual + scripts. Loaded on demand. Externalizes *expertise* the way memory externalizes *state*.
- **Context window** — What's in the model's prompt right now. Has a hard token limit, but degrades well before that — middle-of-prompt facts disappear, verbose tool output crowds out instructions.
- **Loop** — The iterative cycle the agent runs inside: build prompt → choose action → execute → feed result back. Modern coding agents loop 50–200 times per task. The harness decides when the loop stops.
- **Subagent** — A scoped child agent the orchestrator spawns for a bounded task. The subagent runs in its own context window; the result returns as a summary. Useful when context is the bottleneck; expensive when coordination is.
- **MCP** — Model Context Protocol. Anthropic's open standard for exposing tools to agents. The harness loads MCP servers; the agent calls the tools.

## The five levers

A modern coding agent is a model inside a harness. Model quality matters, but harness decisions often determine whether the agent is usable in practice.

1. [Model](#model) — which weights, and how to evaluate them honestly
2. [Retrieval](#retrieval) — how the agent finds information
3. [Memory & Context](#memory--context) — what it remembers, what it forgets, and what it writes down
4. [Loops & Tool Use](#loops--tool-use) — how it acts with discipline
5. [Architecture](#architecture) — one agent or many

At the bottom: [reference implementations](#reference-implementations) worth reading end-to-end.

---

## Model

The same model can perform very differently depending on the harness wrapped around it. If you want to compare models honestly for agentic coding, you need benchmarks that make the harness visible.

- **[Cross-benchmark model specialization](./experiments/model-specialization/)** — reusable prompt + local visualization showing that leaderboard winners change across bug fixing, app building, information gathering, and terminal-heavy tasks.
- **[Multi-source leaderboard analysis guides](./experiments/model-specialization/references/normalization-schema.md)** — lightweight workflow for analyzing OpenHands Index and Artificial Analysis without turning the repo into a scraper collection.

- **[OpenHands Index](https://index.openhands.dev/home)** — leaderboard across coding benchmarks with harness configuration made explicit.
- **[SWE-bench Verified](https://www.swebench.com/)** — a canonical harness-sensitive benchmark for software engineering tasks.
- **[Terminal-Bench / Harbor](https://www.tbench.ai/)** — stresses environment control and long-horizon execution. Useful when the task is less "write a patch" and more "drive a shell for an hour."

---

## Retrieval

For coding agents, lexical retrieval is usually the right baseline. `grep`, BM25, and whole-file access are often more effective than chunked semantic retrieval, especially when the model can iteratively refine its own queries.

- *Planned:* **Lexical vs. semantic on symbol lookup** (`experiments/retrieval/`) — run a "find where `foo_bar` is defined" query through `grep`, BM25 (via [bm25s](https://github.com/xhluca/bm25s)), and dense embeddings on a real codebase. No API key needed.
- **[Retriever vs. Reranker](https://colab.research.google.com/drive/1lRr0J5fumRBP-RmTm5kD9lMd9nuOlhmI)** (Colab) — why hybrid search plus a reranker beats either retriever alone. Runs in a browser.
- **[Agentic RAG vs. Vanilla RAG](https://colab.research.google.com/drive/1hG3dPgd8wjrO9wSD0K0Feo7EY1iXqrEN)** (Colab) — one-shot retrieval vs. an agent that rewrites its own queries. Accuracy climbs, latency climbs harder.
- **[BEIR benchmarks walkthrough](https://colab.research.google.com/drive/1HfutiEhHMJLXiWGT8pcipxT5L2TpYEdt)** (Colab) — stress-test retrievers across domains rather than one cherry-picked task.

*Further reading:* [Anthropic on effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

## Memory & Context

Longer context windows do not remove the need for memory design. In practice, agents benefit from deliberate compaction, file-backed working state, and restraint about what gets loaded into every prompt.

- **[Your LLM Forgets the Middle](https://profoz.substack.com/p/your-llm-forgets-the-middle-why-and)** — article + companion [positional bias notebook](https://github.com/sinanuozdemir/building-agentic-ai/blob/main/prompting/summary_positional_bias.ipynb). Runnable demonstration of "lost in the middle": put key instructions in the middle of a long prompt and watch accuracy collapse.
- **[Claude system prompt evolution, Apr 2025 – Apr 2026](./experiments/claude-prompt-evolution/)** — open `index.html` in a browser and compare versions over time. Useful as a concrete example of how tool, safety, and behavioral guidance evolve as a harness matures.
- *Planned:* **`plan.md` as externalized memory** — same agent, with and without a workspace plan file it reads and checks off. The pattern to mirror is LangChain's [deepagents](https://docs.langchain.com/oss/python/deepagents) `write_todos` tool, which dumps the plan to a file the agent reads on every iteration.
- **[rajshah4/evaluating-skills-tutorial](https://github.com/rajshah4/evaluating-skills-tutorial)** — A/B evaluation of agent skills as externalized memory and procedure.
- **[Anthropic cookbook: automatic context compaction](https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/automatic-context-compaction.ipynb)** — runnable Jupyter notebook. Customer service agent processes 50+ tickets in one session; you watch the token count go from 204K → 82K (58% reduction) when automatic compaction kicks in. `pip install anthropic`, an API key, and you're running in five minutes.
- **[Anthropic cookbook: three context-engineering strategies, side by side](https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/context_engineering/context_engineering_tools.ipynb)** — same workload, three different policies: `compact` (LLM summarization), `clear_tool_uses` (drop old tool results), and `memory` (persistent cross-session). Useful for comparing tradeoffs directly.

*More on compaction:*
- **[OpenHands context condensation](https://openhands.dev/blog/openhands-context-condensensation-for-more-efficient-ai-agents)** — measured 2× per-turn cost reduction with equal or better SWE task performance. Multiple condenser strategies behind one plugin interface.
- **[LangChain on autonomous context compression](https://www.langchain.com/blog/autonomous-context-compression)** — letting the agent decide *when* to compact rather than threshold-based triggering.
- **[Kilo Code: context condensing](https://kilo.ai/docs/customize/context/context-condensing)** — practical configuration knobs for a production agent (when to trigger, what to keep, how much to summarize).
- **Claude Code's three-layer recipe (from the leak):** MicroCompact (cheap, every turn) → Session Memory Compact (medium, no API call, disk-backed summary) → Legacy Compact (expensive, full LLM summarization). This is a useful example of compaction as a pipeline rather than a single operation.

*Further reading:* [Anthropic on effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

---

## Loops & Tool Use

Loop quality depends less on prompt phrasing than on execution discipline. Tool schemas, verification steps, bounded outputs, and environment constraints usually matter more than extra prompting.

- **[ralph-loop-quickstart](https://github.com/coleam00/ralph-loop-quickstart)** — a concrete example of an undisciplined autonomous loop.
- *Planned:* **Ralph Wiggum with and without protocol** (`experiments/loops/`) — same agent, same failing task, two tool schemas. One accepts `{command}`; the other requires `{hypothesis, verification_plan, command}`. The goal is to make the effect of protocol design visible independent of any particular SDK.

*Further reading:* [Anthropic on writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

## Architecture

Multi-agent systems are useful, but they are not a free performance gain. Coordination cost, context splitting, and error propagation all have to be managed explicitly.

- *Planned:* **Single agent vs. orchestrator+worker** (`experiments/architecture/`) — same task run two ways, measured on tokens, wall-clock, and accuracy. Include a case where delegation wins (bounded subtask with summary return) and a case where it loses (intermediate context matters for the orchestrator).
- **[Multi-agent basics](https://github.com/sinanuozdemir/building-agentic-ai/tree/main/multi_agent_basics)** — worked examples of orchestrator/worker patterns.
- **[Anthropic's multi-agent research system write-up](https://www.anthropic.com/engineering/multi-agent-research-system)** — a production example of when the coordination cost is worth paying.

---

## Reference implementations

Projects worth reading end-to-end if you want to study harness design in code.

- **[SWE-agent](https://github.com/SWE-agent/SWE-agent)** — mature research coding agent. Harness, prompts, tools, and environment are all directly inspectable and well-documented.
- **[deepagents](https://github.com/langchain-ai/deepagents)** — LangChain's open-source reference for longer-running agents with middleware and harness patterns.
- **[OpenHands SDK](https://docs.openhands.dev/sdk)** — the open-source agent SDK I work on at OpenHands.
- **[cobusgreyling/ai_harness_engineering](https://github.com/cobusgreyling/ai_harness_engineering)** — a playground harness covering the main harness components, with YAML-based configuration and side-by-side comparisons.
