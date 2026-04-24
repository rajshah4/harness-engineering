# Harness Engineering

A companion to my talk *Engineering the Harness*. It's a short, opinionated tour of the ideas that changed how I build agents, with runnable experiments and demonstrable artifacts for each one.

The rule for what goes in: if you can't run it, watch it, or poke at it in ten minutes, it doesn't belong in the main sections. Articles and papers live at the bottom of each section under *Further reading*, capped to two or three.

## The five levers

A modern coding agent is a model inside a harness. The model gets most of the attention, but the harness owns four other levers that decide whether the agent actually works.

1. [Model](#model) — which weights, and how to evaluate them honestly
2. [Retrieval](#retrieval) — how the agent finds information
3. [Memory & Context](#memory--context) — what it remembers, what it forgets, and what it writes down
4. [Loops & Tool Use](#loops--tool-use) — how it acts with discipline
5. [Architecture](#architecture) — one agent or many

At the bottom: [reference implementations](#reference-implementations) worth reading end-to-end.

---

## Model

**The surprising thing:** the same model in different harnesses can swing from 42% to 95% on the same benchmark. Leaderboards that hold the harness constant are how you see this; leaderboards that don't are how you get fooled.

- **[OpenHands Index](https://index.openhands.dev/home)** — leaderboard across coding benchmarks with harness configuration made explicit. The right default lens for "which model should I use for agentic coding."
- **[SWE-bench Verified](https://www.swebench.com/)** — the canonical harness-sensitive benchmark. Compare submissions for the same underlying model and you can literally watch harness engineering move the score.
- **[Terminal-Bench / Harbor](https://www.tbench.ai/)** — stresses environment control and long-horizon execution. Useful when the task is less "write a patch" and more "drive a shell for an hour."

---

## Retrieval

**The surprising thing:** for coding agents, `grep` beats embeddings. Whole files beat chunks. And when an LLM drives iterative lexical search, it can beat dense semantic retrieval on reasoning benchmarks. The industry default (vector DB + chunks + top-k) is often the wrong starting point.

- *Planned:* **Lexical vs. semantic on symbol lookup** (`experiments/retrieval/`) — run a "find where `foo_bar` is defined" query through `grep`, BM25 (via [bm25s](https://github.com/xhluca/bm25s)), and dense embeddings on a real codebase. No API key needed.
- **[Retriever vs. Reranker](https://colab.research.google.com/drive/1lRr0J5fumRBP-RmTm5kD9lMd9nuOlhmI)** (Colab) — why hybrid search plus a reranker beats either retriever alone. Runs in a browser.
- **[Agentic RAG vs. Vanilla RAG](https://colab.research.google.com/drive/1hG3dPgd8wjrO9wSD0K0Feo7EY1iXqrEN)** (Colab) — one-shot retrieval vs. an agent that rewrites its own queries. Accuracy climbs, latency climbs harder.
- **[BEIR benchmarks walkthrough](https://colab.research.google.com/drive/1HfutiEhHMJLXiWGT8pcipxT5L2TpYEdt)** (Colab) — stress-test retrievers across domains rather than one cherry-picked task.

*Further reading:* [Anthropic on effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

## Memory & Context

**The surprising thing:** bigger context isn't the answer. Giant `AGENTS.md` files measurably *reduce* task success rates and inflate cost. Files beat chat as working memory. And a measurable fraction of skills actively *hurt* performance because they confuse tool routing.

- **[Your LLM Forgets the Middle](https://profoz.substack.com/p/your-llm-forgets-the-middle-why-and)** — article + companion [positional bias notebook](https://github.com/sinanuozdemir/building-agentic-ai/blob/main/prompting/summary_positional_bias.ipynb). Runnable demonstration of "lost in the middle": put key instructions in the middle of a long prompt and watch accuracy collapse.
- **[Claude system prompt evolution, Apr 2025 – Apr 2026](./experiments/claude-prompt-evolution/)** — open `index.html` in a browser, click through versions. Surprising finding: as Claude improved, its system prompt *grew* (~16,700 words by Claude 4). Behavioral patches retired into training, but structural scaffolding (tools, safety) kept expanding. A useful counterweight to "harnesses get simpler over time."
- *Planned:* **The long-context trap in a coding loop** (`experiments/memory/`) — extend the positional-bias result to a coding-agent setting. Same task, two prompts: one clean, one polluted with fake `npm install` warnings and verbose logs. Accuracy drops, tokens balloon, middle-of-prompt instructions disappear. Candidate benchmarks: needle-in-a-haystack, RULER, LongBench.
- *Planned:* **`plan.md` as externalized memory** — same agent, with and without a workspace plan file it reads and checks off. Completion rate moves, context stays cleaner.
- **[rajshah4/evaluating-skills-tutorial](https://github.com/rajshah4/evaluating-skills-tutorial)** — A/B evaluation of agent skills. Sometimes a skill helps, sometimes it's marginal, sometimes it hurts. The right shape for reasoning about any externalized-memory artifact, not just skills.

*Further reading:* [Anthropic on effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

---

## Loops & Tool Use

**The surprising thing:** protocols beat prompts. A JSON schema that *requires* a `hypothesis` field does more for your agent's reasoning than any amount of "think step-by-step" in the system prompt. And sometimes the right loop is no loop at all — have the model generate a program once and execute it cleanly.

- *Planned:* **Ralph Wiggum with and without protocol** (`experiments/loops/`) — same agent, same failing task, two tool schemas. One accepts `{command}`; the other requires `{hypothesis, verification_plan, command}`. Watch duplicate failed commands disappear and token use drop. Format: a neutral framework-agnostic notebook so the effect is visible independent of any particular SDK.

*Further reading:* [Anthropic on writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

---

## Architecture

**The surprising thing:** most multi-agent systems perform *worse* than a single agent on the same task. Independent agents amplify errors. Parallelism is not the same thing as better architecture. Subagents are something you *earn*, not the default you reach for.

- *Planned:* **Single agent vs. orchestrator+worker** (`experiments/architecture/`) — same task run two ways, measured on tokens, wall-clock, and accuracy. Include a case where delegation wins (bounded subtask with summary return) and a case where it loses (intermediate context matters for the orchestrator).
- **[Multi-agent basics](https://github.com/sinanuozdemir/building-agentic-ai/tree/main/multi_agent_basics)** — worked examples of orchestrator/worker patterns. Good reference for what coordination looks like in code before you decide whether it's worth the tax.
- **[Anthropic's multi-agent research system write-up](https://www.anthropic.com/engineering/multi-agent-research-system)** — a production-grade example of when the coordination tax *is* worth paying.

---

## Reference implementations

Harnesses worth reading and cloning end-to-end.

- **[SWE-agent](https://github.com/SWE-agent/SWE-agent)** — mature research coding agent. Harness, prompts, tools, and environment are all directly inspectable and well-documented.
- **[deepagents](https://github.com/langchain-ai/deepagents)** — LangChain's open-source reference for longer-running agents with middleware and harness patterns.
- **[OpenHands SDK](https://docs.openhands.dev/sdk)** — the open-source agent SDK I work on at OpenHands. Saves you from writing the harness boilerplate (tools, sandboxing, memory, orchestration) when you want to jump straight to building the agent.
- **[cobusgreyling/ai_harness_engineering](https://github.com/cobusgreyling/ai_harness_engineering)** — a working playground harness covering the six harness components. Toggle any of them via YAML, run the same task across configs, and read the side-by-side comparison table. Good for poking at all the levers in one place.

---

## About

Companion to *Engineering the Harness* (talk, 2026). Experiments in [`experiments/`](./experiments) are added over time; each one is self-contained and runnable on its own.
