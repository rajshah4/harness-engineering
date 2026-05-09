# 3 — Five Experiments

Each experiment changes exactly one harness knob, runs the same task, and asks you to record what changed. The experiments are deliberately small — the point is to make a single decision visible, not to ship a benchmark.

Use a fresh conversation per run. Save event traces. Tabulate results in a single `results.md` you keep in your fork of this directory.

> **Common task across all experiments.** Pick one repo and one prompt, and freeze them. A good default: clone [`OpenHands/agent-canvas`](https://github.com/OpenHands/agent-canvas) and use the prompt `"Find every place VITE_BACKEND_HOST is read or set, and write a short note explaining how the dev script picks the backend."` — narrow, repeatable, doesn't write code, and forces real retrieval.

---

## Experiment 1 — Model swap, harness held constant (and the routing variant)

**Lever:** Model.

**Question:** How much of the variance you see between two LLMs comes from the model vs. the harness — and does a router buy you anything for free?

**Setup:**
- Same agent server, same canvas, same workspace.
- Same prompt, same tool set (`bash` + file editor only).
- Three configs:
  - **A — flagship:** e.g. `anthropic/claude-sonnet-4-5-20250929`.
  - **B — small:** e.g. `openai/gpt-5-mini-2025-08-07` or `anthropic/claude-haiku-4-5-20251001`.
  - **C — routed:** a `Router` (start with the shipped `MultimodalRouter`, or write a 20-line keyword router that sends `"refactor"` / `"design"` / `"debug complex"` to the flagship and everything else to the small model).

**Procedure:**
1. Start a conversation with config A. Run to completion. Record: turn count, in/out tokens *per `usage_id`*, accumulated cost, correctness.
2. Fork from start (or re-create) and run config B. Same metrics.
3. Run config C. Same metrics — but now `get_combined_metrics()` will break the cost down by leg of the router. Note which calls actually went to which model.

**What to write down:**

| Config | Turns | In tokens | Out tokens | Cost | Correct? | Where the cost landed |
|---|---|---|---|---|---|---|
| A flagship | | | | | | 100% flagship |
| B small | | | | | | 100% small |
| C routed | | | | | | _e.g. 20% flagship / 80% small_ |

**What to look for:**
- Turn-count differences across A and B are usually about *retrieval discipline* (does the model grep enough before guessing?), not raw intelligence. If the cheaper model uses fewer turns and gets the same answer, it's not because it's smarter — it's because the task didn't need the extra capability.
- Config C is the interesting one. If it lands within 10% of A's correctness at 30% of A's cost, you have evidence that *most of your task doesn't need the flagship*. If C drops sharply on correctness, your routing policy is sending the wrong things to the small model — fix the policy, not the models.

> Connection to the talk: slide 11 (same model, 2× gap from harness) and slide 22's framing of the model as *one of five levers, not the dominant one*. This is a personal-scale version of the [OpenHands Index](https://index.openhands.dev/home) experiment in [`experiments/model-specialization/`](../model-specialization/). One task is too few; one task is enough to convince yourself the harness matters.

---

## Experiment 2 — Same model, two harnesses

**Lever:** *Everything except* the model.

**Question:** What's the cheapest harness change that moves your task from "fails sometimes" to "works"?

**Setup:**
- Pick one model. Hold it constant.
- Two configurations:
  - **A — minimal:** `tools=[Tool(TerminalTool.name)]`. No file editor, no task tracker. Force the agent to do everything through bash.
  - **B — default:** `get_default_agent(llm=llm, cli_mode=True)`. Bash, file editor, task tracker.

**Procedure:**
1. Build agent A in the SDK. Send the prompt against the running agent server. Record turns, tokens, cost, correctness.
2. Build agent B. Same prompt, same server, fresh conversation.

**What to look for:** the file editor's `str_replace` tool *constrains the agent's actions* in a way bash doesn't. Agents using only bash tend to over-write files (`echo > file`) and lose context. The harness change isn't "more tools"; it's "more constrained tools."

This is the slide-78 lesson — schema-enforced thinking — at human scale.

---

## Experiment 3 — Retrieval: grep vs. MCP semantic search

**Lever:** Retrieval.

**Question:** When does adding a semantic search MCP server actually help?

**Setup:**
- Same model, same prompt as the others.
- Two configurations:
  - **A — lexical only:** `bash` + file editor. The default.
  - **B — lexical + semantic:** add an MCP server that exposes a `search_code` tool against the same repo. A small, real one is [`OpenHands/extensions`](https://github.com/OpenHands/extensions) — pick one or build a stub that wraps `bm25s` over the repo files.

**Procedure:**
1. Run prompt against config A. Note: how many `grep`/`bash` calls, how many file reads, did it find the answer?
2. Run against config B. Note the same plus how many `search_code` calls, and whether the agent actually *uses* the new tool or sticks with `grep`.

**What to look for:**
- For a repo where the query and source share vocabulary (`VITE_BACKEND_HOST` is mentioned by exact name), `grep` wins on latency and accuracy. Semantic adds turns without adding answers.
- Switch the prompt to something with a synonym gap (`"how does the canvas pick which backend to talk to"`) and the math can flip. Run that version too if you have budget; the contrast is the point.

> Connection to the talk: slide 27 (BM25 makes grep instant) and slides 29–31 (when embeddings earn their keep). Don't take this on faith — measure on *your* repo.

---

## Experiment 4 — Memory: with and without `AGENTS.md`

**Lever:** Durable memory.

**Question:** Does writing an `AGENTS.md` for your repo help the agent, hurt it, or do nothing?

**Setup:**
- Same model, same prompt.
- Two configurations:
  - **A — no `AGENTS.md`:** `git rm AGENTS.md` in your test repo (or use a fresh checkout that doesn't have one).
  - **B — minimal `AGENTS.md`:** three to five lines, hand-written, describing the directory layout and any non-obvious conventions. Don't auto-generate it.

**Procedure:**
1. Run the prompt against A. Record turns, tokens, correctness, and *what the agent re-discovered* — directory layout, where to look first, etc.
2. Add `AGENTS.md`, fresh conversation, same prompt. Compare.

**What to look for:**
- Useful `AGENTS.md` reduces re-discovery turns. Useless `AGENTS.md` (verbose, generic) just adds tokens to every prompt.
- Try **C — auto-generated `AGENTS.md`** (let the agent write it itself in a previous conversation). Feed that one in and rerun. If the talk's [ETH Zurich result](https://arxiv.org/abs/2510.02669) holds, C will be measurably worse than B.

This is the talk's slide-58/59 result, replicated on your repo. Worth doing yourself once.

---

## Experiment 5 — Architecture: local subprocess vs. Docker sandbox

**Lever:** Architecture (deployment shape).

**Question:** What does the harness boundary cost you, and what does it buy you?

**Setup:**
- Same model, same prompt, same tools.
- Two configurations:
  - **A — local subprocess:** the default `npm run dev` setup; agent has direct access to your filesystem.
  - **B — Docker sandbox:** Use the SDK directly with `DockerWorkspace`. See the [Docker Sandbox guide](https://docs.openhands.dev/sdk/guides/agent-server/docker-sandbox).

**Procedure A:**

```bash
# Agent canvas already running on :8000 + agent-server on :18000
# Just send the prompt through the canvas. Note wall-clock time and cost.
```

**Procedure B:**

```python
# docker_run.py
import os, time
from pydantic import SecretStr
from openhands.sdk import LLM, Conversation, RemoteConversation
from openhands.tools.preset.default import get_default_agent
from openhands.workspace import DockerWorkspace

llm = LLM(
    usage_id="agent",
    model=os.environ["LLM_MODEL"],
    api_key=SecretStr(os.environ["LLM_API_KEY"]),
)

with DockerWorkspace(
    server_image="ghcr.io/openhands/agent-server:latest-python",
    host_port=8010,
) as workspace:
    agent = get_default_agent(llm=llm, cli_mode=True)
    convo = Conversation(agent=agent, workspace=workspace)
    assert isinstance(convo, RemoteConversation)

    t0 = time.time()
    convo.send_message("...your same prompt...")
    convo.run()
    t1 = time.time()

    print("wall:", t1 - t0)
    print("cost:", convo.conversation_stats.get_combined_metrics().accumulated_cost)
    convo.close()
```

```bash
uv run --with openhands-sdk --with openhands-tools --with openhands-workspace python docker_run.py
```

**What to look for:**
- Docker startup adds tens of seconds of cold-start; the agent's actual loop time is unchanged.
- The agent in Docker can't see your home dir. If your prompt accidentally relied on that (it shouldn't, but it happens), now you'll find out.
- The event stream is byte-for-byte similar — same tools, same observations, same final message. That equivalence is the point of having a harness boundary.

> If you're going to run agents on tasks with any real blast radius (slide 84: the database-deletion incident), this experiment is where you internalize that the cost of switching to Docker is "30 extra seconds and one Python script."

---

## Experiment 6 — Critic on / Critic off

**Lever:** Architecture (the one multi-agent pattern that consistently wins).

**Question:** What does an iterative critic actually buy you on a task you'd normally call "done" after one shot?

**Why this experiment exists.** The talk is unambiguous on slide 97 — the critic is the multi-agent pattern that earns its keep. Reflexion-style critic loops on SWE-bench: 57.9% (random sampling) → 63.6% (success-only) → **73.8%** (iterative critic with rubrics). Boris Cherny's practitioner number is 2–3× quality. That's a big effect to take on faith. Run it on your task.

**Setup:**
- Pick a task with a *checkable* output. The COBOL→Java sample task in the [iterative-refinement guide](https://docs.openhands.dev/sdk/guides/iterative-refinement) works well; so does "write a small Python module with tests" against a public spec.
- Same model, same tools, same prompt across both runs.
- Two configurations:
  - **A — no critic:** `get_default_agent(llm=llm)` and `conversation.run()` once. Whatever it produces is the answer.
  - **B — critic with iterative refinement:** add `critic=...` to the `Agent` and an `IterativeRefinementConfig` with a `success_threshold` and `max_iterations`. `conversation.run()` will loop internally until the critic clears the threshold or you hit the cap.

**Procedure A:**

```python
agent = get_default_agent(llm=llm, cli_mode=True)
convo = Conversation(agent=agent, workspace=str(workspace))
convo.send_message(TASK_PROMPT)
convo.run()
# Score the output against your rubric *manually*. Record pass/fail.
```

**Procedure B** (uses the API from [`34_critic_example.py`](https://github.com/OpenHands/software-agent-sdk/blob/main/examples/01_standalone_sdk/34_critic_example.py)):

```python
from openhands.sdk import LLM, Agent, Conversation
from openhands.sdk.tool import Tool
from openhands.tools.terminal import TerminalTool
from openhands.tools.file_editor import FileEditorTool
from openhands.tools.task_tracker import TaskTrackerTool
# Critic API surface — see the iterative-refinement guide for current import paths
from openhands.sdk.critic import APIBasedCritic, IterativeRefinementConfig, get_default_critic

iterative = IterativeRefinementConfig(success_threshold=0.7, max_iterations=3)
critic = get_default_critic(llm) or APIBasedCritic(
    server_url=os.environ["CRITIC_SERVER_URL"],
    api_key=os.environ["CRITIC_API_KEY"],
    model_name=os.environ["CRITIC_MODEL_NAME"],
    iterative_refinement=iterative,
)
critic = critic.model_copy(update={"iterative_refinement": iterative})

agent = Agent(
    llm=llm,
    tools=[Tool(name=TerminalTool.name), Tool(name=FileEditorTool.name), Tool(name=TaskTrackerTool.name)],
    critic=critic,
)
convo = Conversation(agent=agent, workspace=str(workspace))
convo.send_message(TASK_PROMPT)
convo.run()  # Loops automatically. Score the final output.
```

(If you don't have access to a critic LLM proxy, the [iterative-refinement guide](https://docs.openhands.dev/sdk/guides/iterative-refinement) shows a simpler two-conversation pattern — refactor agent then critique agent in a Python loop — that gets you the same shape without the hosted critic.)

**Run each config five times.** This is the experiment where one-off measurements lie hardest. Score each run pass/fail against the same rubric. Track:

| Config | Pass rate (n=5) | Median iterations | Median cost | Wall-clock |
|---|---|---|---|---|
| A no critic | _e.g._ 2/5 | 1 | $0.04 | 30s |
| B critic, threshold 0.7, max 3 | _e.g._ 4/5 | 2 | $0.11 | 90s |

**What to look for:**
- Pass-rate lift is the headline number. If it doesn't move at least 10–15 percentage points on a non-trivial task, either your rubric is too lenient or the critic isn't actually scoring the right thing — read the critic's output before you blame the pattern.
- Cost-per-pass (cost ÷ pass rate) is often *flat or better* with the critic, because the critic shortens the long tail of "ran for 30 turns, still wrong." Compute this and write it down.
- Read the critic's verdicts in the event stream. The talk's slide-97 framing is "iterative critic *with rubrics*" — vague critics ("looks fine") barely help. Specific rubrics (`correctness 0–25`, `completeness 0–25`, `best practices 0–25`) drive most of the lift.

> This experiment is the one most people skip because it sounds like extra work. It's also the one with the largest effect size in the talk. Don't skip it. If 10-percentage-points-of-pass-rate looks small written down, run it on a real task and see how it feels.

---

## Tabulating your results

Keep a `results.md` next to your fork of this directory:

```markdown
# Harness experiments — <date>

Repo: agent-canvas @ <SHA>
Model: anthropic/claude-sonnet-4-5-20250929 (unless noted)
Prompt: "Find every place VITE_BACKEND_HOST is read or set..."

## E1: Model swap
| Model | Turns | Tokens (in/out) | Cost | Correct |
|---|---|---|---|---|
| Sonnet 4.5 | 6 | 18,200 / 1,150 | $0.061 | ✓ |
| GPT-5-mini | 5 | 16,400 / 980 | $0.014 | ✓ |

Notes: ...

## E2: Tool surface
...
```

Three runs is barely a signal; ten is convincing; thirty is real. Pick a budget and stick to it.

---

## Where to go from here

Everything in this tutorial uses the harness as-is. The next step is to *change* the harness:

- **Add a hook** that requires every `bash` call to include a `hypothesis` field. Compare turn counts before/after on a long task. ([Hooks guide](https://docs.openhands.dev/sdk/guides/hooks).)
- **Write a custom condenser** that drops noisy `npm install` output but keeps test-failure traces. Measure cost over a 50-turn session.
- **Build a custom tool** that reads a `feature_list.json` (the [walkinglabs](https://github.com/walkinglabs/learn-harness-engineering) convention) and forces the agent to mark a feature as in-progress before editing files in its scope.
- **Fork an MCP server** for your own data. Plug it into the canvas via a `.env` setting. Run [Experiment 3](#experiment-3--retrieval-grep-vs-mcp-semantic-search) again with your real data.

That's where harness engineering stops being a tour and starts being engineering. Open the [SDK custom-tools guide](https://docs.openhands.dev/sdk/guides/custom-tools), pick the smallest of the bullets above, and ship one.
