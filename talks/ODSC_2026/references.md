# Engineering the Harness: Slide Companion References

This companion is organized to match `ODSC_Shah_Apr2026.pdf` and the current `script.md`.

The goal is practical coverage, not exhaustiveness: public docs, benchmark sites, engineering posts, and papers that map cleanly to the main claims in the deck.

## 1. Harnesses, Ownership, and Why the Harness Matters

- **OpenHands SDK docs** (Slide 10) - Open-source SDK example for wiring an agent, tools, workspace, and loop. URL: https://docs.openhands.dev/sdk
- **Claude Code overview** (Slides 10, 14, 18) - Official product overview for Anthropic's coding harness. URL: https://docs.anthropic.com/en/docs/claude-code/overview
- **Model Context Protocol (MCP)** (Slides 5, 6, 8) - Open standard for exposing tools and context to agents. URL: https://modelcontextprotocol.io/introduction
- **CORE-Bench Hard leaderboard** (Slide 11) - Harness-sensitive coding benchmark. URL: https://hal.cs.princeton.edu/corebench_hard
- **Terminal-Bench / Harbor leaderboard** (Slide 12) - Public leaderboard centered on terminal-based agent performance. URL: https://www.tbench.ai/
- **AutoHarness paper** (Slide 13) - Evidence for "smaller model + better harness" outperforming stronger raw models in some settings. URL: https://arxiv.org/abs/2603.03329
- **Anthropic postmortem on Claude Code quality regressions** (Slide 19) - Concrete example of harness-layer changes materially affecting quality. URL: https://www.anthropic.com/engineering/april-23-postmortem
- **Effective harnesses for long-running agents** (Slides 7, 8, 20) - Anthropic's strongest public write-up on long-running coding harness design. URL: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- **Claude Code sandboxing** (Slides 14, 18, 85) - Anthropic's write-up on sandboxing, permissions, and blast-radius reduction. URL: https://www.anthropic.com/engineering/claude-code-sandboxing
- **Claude prompt evolution project in this repo** (Slide 17) - Local visualization used for the "prompts are getting longer" section. Path: `experiments/claude-prompt-evolution/`
- **Anthropic system prompt release notes** (Slide 17) - Official prompt snapshots and changelog context. URL: https://platform.claude.com/docs/en/release-notes/system-prompts
- **Simon Willison on Claude 4 system prompts** (Slide 17) - Useful independent source for prompt extraction and comparison. URL: https://simonwillison.net/2025/May/25/claude-4-system-prompt/
- **Simon Willison on the April 2026 Opus system prompt** (Slide 17) - Later prompt snapshot used in many prompt-evolution comparisons. URL: https://simonwillison.net/2026/Apr/18/opus-system-prompt/

## 2. Retrieval

- **Effective context engineering for AI agents** (Slides 22, 29, 38) - Strong source for just-in-time retrieval, hybrid retrieval, and context curation. URL: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **bm25s** (Slides 23, 24, 38) - Lightweight BM25 implementation; practical anchor for the lexical-first argument. URL: https://github.com/xhluca/bm25s
- **Claude Code settings / tools available** (Slide 25) - Public documentation showing `Glob` and `Grep` in Claude Code's toolset. URL: https://docs.anthropic.com/en/docs/claude-code/settings
- **BEIR benchmark** (Slides 26, 29) - Standard benchmark suite for comparing retrieval methods across domains. URL: https://github.com/beir-cellar/beir
- **Retriever vs. Reranker notebook** (Slide 29) - Background on hybrid retrieval plus reranking. URL: https://colab.research.google.com/drive/1lRr0J5fumRBP-RmTm5kD9lMd9nuOlhmI
- **Agentic RAG vs. Vanilla RAG notebook** (Slides 30-33) - Demonstrates the latency/accuracy tradeoff of iterative retrieval. URL: https://colab.research.google.com/drive/1hG3dPgd8wjrO9wSD0K0Feo7EY1iXqrEN
- **BEIR walkthrough notebook** (Slides 26-33) - Useful backgrounder for attendees who want to reproduce retrieval comparisons. URL: https://colab.research.google.com/drive/1HfutiEhHMJLXiWGT8pcipxT5L2TpYEdt
- **Retrieval Meets Long Context Language Models** (Slides 34, 36, 37) - Relevant background for the "whole files vs chunked retrieval" discussion. URL: https://arxiv.org/abs/2402.16873

## 3. Memory, Context, and Skills

- **Effective context engineering for AI agents** (Slides 40-49) - Covers compaction, structured notes, and context as a finite resource. URL: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Large Language Models Can Be Easily Distracted by Irrelevant Context** (Slides 41, 43, 44) - Support for the idea that noisy context degrades reasoning quality. URL: https://openreview.net/forum?id=JSZmoN03Op
- **Anthropic cookbook: automatic context compaction** (Slides 46, 47) - Runnable example of long-session compaction. URL: https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/automatic-context-compaction.ipynb
- **Anthropic cookbook: context engineering tools** (Slides 42, 46-48) - Side-by-side examples of context-management strategies. URL: https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/context_engineering/context_engineering_tools.ipynb
- **OpenHands context condensation blog** (Slide 47) - Source for the "up to 2x per-turn API cost reduction" claim. URL: https://openhands.dev/blog/openhands-context-condensensation-for-more-efficient-ai-agents
- **OpenHands Context Condenser docs** (Slide 47) - Productized explanation of the condenser design and usage. URL: https://docs.openhands.dev/sdk/guides/context-condenser
- **ACON paper** (Slide 47) - Research backing for optimized context compression in long-horizon agents. URL: https://arxiv.org/abs/2510.00615
- **LangChain Deep Agents docs** (Slide 50) - Public example of file-backed plans and externalized working state. URL: https://docs.langchain.com/oss/python/deepagents
- **Recursive Language Models** (Slides 52, 53) - Landing page with links to paper, code, and examples. URL: https://rlm.md/
- **Recursive Language Models paper** (Slides 52, 53) - Primary paper reference for the RLM framing. URL: https://arxiv.org/abs/2512.24601
- **AGENTS.md** (Slides 55.5, 56, 67) - Official open-format home page. URL: https://agents.md/
- **Evaluating AGENTS.md** (Slide 57) - ETH Zurich study on whether repository-level context files help coding agents. URL: https://arxiv.org/abs/2602.11988
- **Anthropic Agent Skills engineering post** (Slides 58, 59) - Strong public write-up on skills as progressive-disclosure context. URL: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- **SkillsBench site** (Slides 63, 64) - Benchmark hub for evaluating how well skills help. URL: https://www.skillsbench.ai/
- **SkillsBench paper** (Slide 63) - Primary paper behind the "some skills hurt performance" claim. URL: https://arxiv.org/abs/2602.12670
- **Skill evaluation tutorial in this repo's ecosystem** (Slide 64) - Practical A/B evaluation walkthrough for skills. URL: https://github.com/rajshah4/evaluating-skills-tutorial

## 4. Loops, Tool Use, and Guardrails

- **Building effective agents** (Slides 70-78) - Anthropic's general framing on workflows, agents, and tool loops. URL: https://www.anthropic.com/engineering/building-effective-agents
- **Ralph loop quickstart** (Slides 72.5-74) - Concrete illustration of the undisciplined autonomous loop pattern. URL: https://github.com/coleam00/ralph-loop-quickstart
- **Karpathy autoresearch** (Slide 75) - Public repo for the continual-improvement experiment loop. URL: https://github.com/karpathy/autoresearch
- **Karpathy autoresearch program loop** (Slide 75) - The `keep or discard` experiment loop described in `program.md`. URL: https://github.com/karpathy/autoresearch/blob/master/program.md
- **Writing effective tools for agents** (Slides 76-78, 86) - Anthropic's clearest public write-up on tool design and tool quality. URL: https://www.anthropic.com/engineering/writing-tools-for-agents
- **SWE-bench** (Slides 80, 82, 95) - Canonical software engineering benchmark relevant to loop design and verification. URL: https://www.swebench.com/
- **Code Mode: give agents an entire API in 1,000 tokens** (Slide 83) - Strong source for "write code once, execute safely" instead of exposing thousands of raw tools. URL: https://blog.cloudflare.com/code-mode-mcp
- **Sandboxing AI agents, 100x faster** (Slides 83-85) - Cloudflare's isolate-based sandboxing write-up. URL: https://blog.cloudflare.com/dynamic-workers/
- **Claude Code sandboxing** (Slides 84, 85) - Anthropic's permission and sandboxing model. URL: https://www.anthropic.com/engineering/claude-code-sandboxing

## 5. Multi-Agent Architecture

- **How we built our multi-agent research system** (Slides 91, 97) - Strong case study for orchestrator/worker and citation-agent design. URL: https://www.anthropic.com/engineering/built-multi-agent-research-system
- **Multi-agent basics** (Slides 89-91) - Worked examples of orchestrator/worker patterns. URL: https://github.com/sinanuozdemir/building-agentic-ai/tree/main/multi_agent_basics
- **Capital One MACAW talk abstract** (Slide 92) - Public summary of the Understanding -> Planner -> Evaluator -> Explainer role split. URL: https://sigfintech.github.io/speaker/2025_CapitalOne.html
- **Reflexion paper** (Slide 95) - Canonical source for critic/reflection loops improving agent performance. URL: https://arxiv.org/abs/2303.11366

## 6. Repo-Local Companion Material

- **Main repo overview** - Written companion to the talk. URL: https://github.com/rajshah4/harness-engineering
- **Current slide deck PDF** - Local exported deck. Path: `talks/ODSC_2026/ODSC_Shah_Apr2026.pdf`
