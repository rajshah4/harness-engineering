# 3 — Six Projects (Learning Path)

Six small projects, in order, each changing one harness lever and producing a config artifact that carries forward. By P06 you'll have a runnable `harness.py` that wires together everything you kept — your model routing, your tool selection, your `AGENTS.md`, your critic, your sandbox.

> **Inspired by [walkinglabs/learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering)**, which organizes harness learning as a sequence of cumulative projects on the same Electron app rather than disconnected one-off ablations. That's a better shape for learning than the standard "here are some experiments" format, and it adapts naturally to OpenHands. The phase names, the two-column "What You Do / Harness Mechanism" preamble, and the "each project's solution becomes the next project's starter" property are all borrowed from there. Credit where it's due.

> **Common task across all projects.** Pick one repo and one prompt, and freeze them. A good default: clone [`OpenHands/agent-canvas`](https://github.com/OpenHands/agent-canvas) and use the prompt `"Find every place VITE_BACKEND_HOST is read or set, and write a short note explaining how the dev script picks the backend."` — narrow, repeatable, doesn't write code, and forces real retrieval.

---

## Project evolution

```text
PROJECT EVOLUTION (OpenHands harness)
=====================================

  P01  Baseline + routing            → SEE THE GAP & RIGHT-SIZE
       |                               keep: a Router / LLMRegistry config
       v
  P02  Tool surface                  → CONSTRAIN THE LOOP
       |                               keep: an Agent tool list with
       |                                     schema-enforced edits
       v
  P03  Retrieval                     → STOP HALLUCINATED PATHS
       |                               keep: a one-line decision rule
       |                                     for when MCP earns its slot
       v
  P04  Memory                        → REDUCE RE-DISCOVERY
       |                               keep: a hand-written AGENTS.md
       |                                     + one evaluated skill
       v
  P05  Sandbox + verification        → BOUND BLAST RADIUS,
       |                               STOP "LOOKS FINE"
       |                               keep: DockerWorkspace runner
       |                                     + Critic + rubric
       v
  P06  Capstone                      → SHIP A HARNESS YOU TRUST
                                       wire P01-P05 into harness.py

  Each project produces a concrete artifact.
  P06 is where they merge into one runnable harness.
```

Each project follows the same shape:

- A two-row preamble: **What You Do** / **Harness Mechanism**.
- Setup, procedure, and what to record.
- A **What you keep** callout at the end — the artifact that carries forward.

Use a fresh conversation per run. Save event traces. Keep `results.md` next to your fork so the cumulative measurements line up.

---

## P01 — Baseline + Model Routing

| | |
|---|---|
| **What You Do** | Run the same prompt three ways: flagship LLM, small LLM, and a router that mixes them. Compare turns, tokens, cost, and where the cost lands. |
| **Harness Mechanism** | [`LLMRegistry`](https://docs.openhands.dev/sdk/guides/llm-registry) + [`Router`](https://docs.openhands.dev/sdk/guides/llm-routing) (e.g. `MultimodalRouter`) |

**Phase: SEE THE GAP & RIGHT-SIZE.** Most operators leave the model lever untouched. This project changes that.

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

> Connection to the talk: slide 11 (same model, 2× gap from harness) and slide 22's framing of the model as *one of five levers, not the dominant one*. This is a personal-scale version of the [OpenHands Index](https://index.openhands.dev/home) experiment in [`experiments/model-specialization/`](../model-specialization/).

> **What you keep:** a `Router` or `LLMRegistry` configuration that lands within 10% of flagship correctness at 30–50% of flagship cost. Save the Python snippet (5–20 lines) verbatim. You'll paste it into `harness.py` in P06.

---

## P02 — Tool Surface

| | |
|---|---|
| **What You Do** | Run the same task with a minimal `bash`-only agent, then with the full default tool set. Compare turn count and how the agent edits files. |
| **Harness Mechanism** | `Agent(tools=[...])` selection. The default file editor's `str_replace` schema enforces uniqueness; `bash` doesn't. |

**Phase: CONSTRAIN THE LOOP.** "More tools" isn't the win. "Tools whose *schema* makes the wrong move impossible" is.

**Setup:**
- Pick one model from P01. Hold it constant.
- Two configurations:
  - **A — minimal:** `tools=[Tool(TerminalTool.name)]`. No file editor, no task tracker. Force the agent to do everything through bash.
  - **B — default:** `get_default_agent(llm=llm, cli_mode=True)`. Bash, file editor, task tracker.

**Procedure:**
1. Build agent A in the SDK. Send the prompt against the running agent server. Record turns, tokens, cost, correctness.
2. Build agent B. Same prompt, same server, fresh conversation.

**What to look for:** the file editor's `str_replace` tool *constrains the agent's actions* in a way bash doesn't. Agents using only bash tend to over-write files (`echo > file`) and lose context. The harness change isn't "more tools"; it's "more constrained tools."

This is the slide-78 lesson — schema-enforced thinking — at human scale. Write down at least one specific failure mode you saw in agent A that agent B avoided. That observation is more valuable than the metrics.

> **What you keep:** an explicit `tools=[...]` list (4–8 lines) you've decided is right for your task. Default is fine — but having *decided* it's fine, after seeing the alternative, is the point.

---

## P03 — Retrieval

| | |
|---|---|
| **What You Do** | Run the prompt with `bash + view` only, then with an MCP semantic-search server attached. Measure when semantic earns its slot vs when it just adds turns. |
| **Harness Mechanism** | Lexical baseline (grep / view / find) vs. lexical + [MCP](https://docs.openhands.dev/sdk/guides/mcp) semantic |

**Phase: STOP HALLUCINATED PATHS.** Coding agents default to `grep`. The talk's stance (slides 25–31): semantic only earns its slot when you have a vocabulary mismatch.

**Setup:**
- Same model (from P01), same tool list (from P02). Hold them constant.
- Two configurations:
  - **A — lexical only:** `bash` + file editor.
  - **B — lexical + semantic:** add an MCP server that exposes a `search_code` tool against the same repo. A small, real one is [`OpenHands/extensions`](https://github.com/OpenHands/extensions) — pick one or build a stub that wraps `bm25s` over the repo files.

**Procedure:**
1. Run the prompt against config A. Note: how many `grep`/`bash` calls, how many file reads, did it find the answer?
2. Run against config B. Note the same plus how many `search_code` calls, and whether the agent actually *uses* the new tool or sticks with `grep`.

**What to look for:**
- For a repo where the query and source share vocabulary (`VITE_BACKEND_HOST` is mentioned by exact name), `grep` wins on latency and accuracy. Semantic adds turns without adding answers.
- Switch the prompt to something with a synonym gap (`"how does the canvas pick which backend to talk to"`) and the math can flip. Run that version too if you have budget; the contrast is the point.

> Connection to the talk: slide 27 (BM25 makes grep instant) and slides 29–31 (when embeddings earn their keep). Don't take this on faith — measure on *your* repo.

> **What you keep:** a one-line decision rule. Something like *"Enable MCP semantic search only when at least 30% of recent prompts contain query terms that don't appear in source."* Or: *"Lexical only for this repo — synonym gap is rare."* Either is a useful artifact.

---

## P04 — Memory

| | |
|---|---|
| **What You Do** | Run the prompt with no `AGENTS.md`, with a hand-written `AGENTS.md`, and (optionally) with an auto-generated `AGENTS.md`. Then evaluate one skill the same way. |
| **Harness Mechanism** | `AGENTS.md` injection at conversation start + [Skills](https://docs.openhands.dev/sdk/guides/skill) loaded on demand |

**Phase: REDUCE RE-DISCOVERY.** Memory done well saves turns. Memory done badly adds tokens to every prompt for no benefit.

**Setup:**
- Same model + tools + retrieval policy from P01–P03.
- Two configurations (and one optional):
  - **A — no `AGENTS.md`:** `git rm AGENTS.md` in your test repo (or use a fresh checkout that doesn't have one).
  - **B — minimal `AGENTS.md`:** three to five lines, hand-written, describing the directory layout and any non-obvious conventions. Don't auto-generate it.
  - **C (optional) — auto-generated `AGENTS.md`:** let the agent write it itself in a previous conversation. Feed that one in.

**Procedure:**
1. Run the prompt against A. Record turns, tokens, correctness, and *what the agent re-discovered* — directory layout, where to look first, etc.
2. Add `AGENTS.md`, fresh conversation, same prompt. Compare.
3. (Optional) Run C. If the [ETH Zurich result](https://arxiv.org/abs/2510.02669) holds, C will be measurably worse than B.

**What to look for:**
- Useful `AGENTS.md` reduces re-discovery turns. Useless `AGENTS.md` (verbose, generic) just adds tokens to every prompt.
- This is the talk's slide-58/59 result, replicated on your repo. Worth doing yourself once.

**Skills extension.** Once `AGENTS.md` is dialed in, evaluate one skill the same way. Pick a skill from [`OpenHands/extensions`](https://github.com/OpenHands/extensions), enable it via `VITE_LOAD_PUBLIC_SKILLS=true`, and run with-skill vs. without-skill on a prompt where the skill should fire. The pattern is the same as [`rajshah4/evaluating-skills-tutorial`](https://github.com/rajshah4/evaluating-skills-tutorial); SkillsBench reports 16% of skills *reduce* performance, so don't trust them by default.

> **What you keep:** your hand-written `AGENTS.md` (5–20 lines) and *at most one* skill that demonstrably moved the needle. If no skill helped, keep none.

---

## P05 — Sandbox + Verification

| | |
|---|---|
| **What You Do** | Move from local subprocess to `DockerWorkspace`. Then add a critic with iterative refinement and a rubric. Run n=5 on each config. |
| **Harness Mechanism** | [`DockerWorkspace`](https://docs.openhands.dev/sdk/guides/agent-server/docker-sandbox) + [`Critic`](https://docs.openhands.dev/sdk/guides/critic) + [`IterativeRefinementConfig`](https://docs.openhands.dev/sdk/guides/iterative-refinement) |

**Phase: BOUND BLAST RADIUS, STOP "LOOKS FINE".** Two harness mechanisms, one project, because they share the same goal: *the loop should not be allowed to do bad things or to call done early.*

### P05a — Sandbox

**Setup:** same as before, plus Docker installed.

```python
# docker_run.py
from openhands.sdk import LLM, Conversation, RemoteConversation
from openhands.tools.preset.default import get_default_agent
from openhands.workspace import DockerWorkspace
from pydantic import SecretStr
import os, time

llm = LLM(usage_id="agent",
          model=os.environ["LLM_MODEL"],
          api_key=SecretStr(os.environ["LLM_API_KEY"]))

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
    print("wall:", time.time() - t0)
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

### P05b — Critic with iterative refinement

The talk is unambiguous on slide 97: a critic is the multi-agent pattern that earns its keep. Reflexion-style critic loops on SWE-bench: 57.9% (random sampling) → 63.6% (success-only) → **73.8%** (iterative critic with rubrics). Boris Cherny's practitioner number is 2–3× quality.

**Setup:**
- Pick a task with a *checkable* output. The COBOL→Java sample task in the [iterative-refinement guide](https://docs.openhands.dev/sdk/guides/iterative-refinement) works well; so does "write a small Python module with tests" against a public spec.
- Same model, same tools, same prompt across both runs.
- Two configurations:
  - **A — no critic:** `get_default_agent(llm=llm)` and `conversation.run()` once. Whatever it produces is the answer.
  - **B — critic with iterative refinement:** add `critic=...` to the `Agent` and an `IterativeRefinementConfig` with a `success_threshold` and `max_iterations`. `conversation.run()` will loop internally until the critic clears the threshold or you hit the cap.

**Procedure B** (uses the API from [`34_critic_example.py`](https://github.com/OpenHands/software-agent-sdk/blob/main/examples/01_standalone_sdk/34_critic_example.py)):

```python
from openhands.sdk import LLM, Agent, Conversation
from openhands.sdk.tool import Tool
from openhands.tools.terminal import TerminalTool
from openhands.tools.file_editor import FileEditorTool
from openhands.tools.task_tracker import TaskTrackerTool
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
    tools=[Tool(name=TerminalTool.name),
           Tool(name=FileEditorTool.name),
           Tool(name=TaskTrackerTool.name)],
    critic=critic,
)
convo = Conversation(agent=agent, workspace=str(workspace))
convo.send_message(TASK_PROMPT)
convo.run()  # Loops automatically. Score the final output.
```

(If you don't have a critic LLM proxy, the [iterative-refinement guide](https://docs.openhands.dev/sdk/guides/iterative-refinement) shows a simpler two-conversation pattern that gets you the same shape.)

**Run each config five times.** This is the project where one-off measurements lie hardest. Score each run pass/fail against the same rubric. Track:

| Config | Pass rate (n=5) | Median iterations | Median cost | Wall-clock |
|---|---|---|---|---|
| A no critic | _e.g._ 2/5 | 1 | $0.04 | 30s |
| B critic, threshold 0.7, max 3 | _e.g._ 4/5 | 2 | $0.11 | 90s |

**What to look for:**
- Pass-rate lift is the headline number. If it doesn't move at least 10–15 percentage points on a non-trivial task, either your rubric is too lenient or the critic isn't actually scoring the right thing — read the critic's output before you blame the pattern.
- Cost-per-pass (cost ÷ pass rate) is often *flat or better* with the critic, because the critic shortens the long tail of "ran for 30 turns, still wrong." Compute this.
- Specific rubrics drive most of the lift. Vague critics ("looks fine") barely help.

> **What you keep:** (a) a `DockerWorkspace` runner script (~20 lines, paste-ready), (b) the `Critic` + `IterativeRefinementConfig` block (~10 lines), and (c) the rubric prompt itself. The rubric is the part most people forget to save and the part that does most of the work.

---

## P06 — Capstone: Ship a Harness You Trust

| | |
|---|---|
| **What You Do** | Wire the keepers from P01–P05 into a single `harness.py` that boots a Docker-sandboxed agent with your routing, your tools, your `AGENTS.md`, and your critic. Run it against a fresh repo. |
| **Harness Mechanism** | All of the above. This project doesn't introduce a new lever — it's where the levers stop being hypothetical. |

**Phase: SHIP A HARNESS YOU TRUST.** P01–P05 each produced one artifact. P06 is where you assemble them and find out whether your decisions compose.

### Skeleton

Here's the shape. Paste in your kept artifacts from P01–P05 in the marked places.

```python
"""harness.py — your custom OpenHands harness.

Run with:
    uv run --with openhands-sdk --with openhands-tools --with openhands-workspace \
        python harness.py
"""
import os
import time
from pathlib import Path

from pydantic import SecretStr

from openhands.sdk import LLM, Agent, Conversation, RemoteConversation
from openhands.sdk.tool import Tool
from openhands.sdk.security.confirmation_policy import ConfirmRisky
from openhands.sdk.security.llm_analyzer import LLMSecurityAnalyzer
from openhands.tools.terminal import TerminalTool
from openhands.tools.file_editor import FileEditorTool
from openhands.tools.task_tracker import TaskTrackerTool
from openhands.workspace import DockerWorkspace

# --- P01: model + routing ---------------------------------------------------
# Paste your Router or LLMRegistry config here.
flagship_llm = LLM(
    usage_id="agent",
    model=os.environ["LLM_MODEL_FLAGSHIP"],
    api_key=SecretStr(os.environ["LLM_API_KEY"]),
)
small_llm = LLM(
    usage_id="agent-small",
    model=os.environ.get("LLM_MODEL_SMALL", "anthropic/claude-haiku-4-5-20251001"),
    api_key=SecretStr(os.environ["LLM_API_KEY"]),
)
security_llm = LLM(
    usage_id="security-analyzer",
    model=os.environ.get("LLM_MODEL_SECURITY", "anthropic/claude-haiku-4-5-20251001"),
    api_key=SecretStr(os.environ["LLM_API_KEY"]),
)
# Replace with your actual Router subclass. MultimodalRouter is the shipped
# example; your P01 keeper might be a keyword router instead.
from openhands.sdk.llm.router import MultimodalRouter
agent_llm = MultimodalRouter(
    usage_id="agent-router",
    llms_for_routing={"primary": flagship_llm, "secondary": small_llm},
)

# --- P02: tool surface ------------------------------------------------------
# Paste your tool list. The default below is fine if that's what you decided
# in P02 — but the point is that you decided.
tools = [
    Tool(name=TerminalTool.name),
    Tool(name=FileEditorTool.name),
    Tool(name=TaskTrackerTool.name),
]

# --- P03: retrieval ---------------------------------------------------------
# Paste your "MCP on / MCP off" decision rule as a literal comment. If MCP
# is on, configure it here via the MCP guide (https://docs.openhands.dev/sdk/guides/mcp).
# Default for most repos: lexical only.

# --- P05: critic + iterative refinement -------------------------------------
# Paste your Critic + IterativeRefinementConfig block here. Skipped in the
# skeleton because the API path varies by environment; see P05b for the
# concrete code, or remove this section if you decided in P05 that the
# critic didn't earn its slot for your task type.

# --- agent -------------------------------------------------------------------
agent = Agent(llm=agent_llm, tools=tools)  # add critic=critic here if you kept one

# --- P05: sandbox -----------------------------------------------------------
def main(task: str) -> None:
    with DockerWorkspace(
        server_image="ghcr.io/openhands/agent-server:latest-python",
        host_port=int(os.environ.get("HARNESS_PORT", "8010")),
    ) as workspace:
        # P04: AGENTS.md is read by the agent automatically if it sits at the
        # root of the working directory mounted into the workspace. Make sure
        # your kept AGENTS.md is committed to the repo you point this at.

        convo = Conversation(agent=agent, workspace=workspace)
        assert isinstance(convo, RemoteConversation)

        # Confirmation + security analyzer (from §2.4 of the harness tour).
        # ConfirmRisky() with LLMSecurityAnalyzer is the production default.
        # Use AlwaysConfirm() instead if the task is high-stakes.
        convo.set_security_analyzer(LLMSecurityAnalyzer(llm=security_llm))
        convo.set_confirmation_policy(ConfirmRisky())

        t0 = time.time()
        convo.send_message(task)
        convo.run()
        wall = time.time() - t0

        cost = convo.conversation_stats.get_combined_metrics().accumulated_cost
        print(f"wall: {wall:.1f}s  cost: ${cost:.4f}")
        convo.close()


if __name__ == "__main__":
    import sys
    main(sys.argv[1] if len(sys.argv) > 1 else "What does this repo do?")
```

### Procedure

1. Fill in the `# Paste...` blocks with the artifacts you kept from P01–P05.
2. Pick a fresh repo you haven't run the agent against — a public open-source library you actually use is best.
3. Run `python harness.py "your real task"`.
4. Watch the event stream. Confirm:
   - The router actually splits work between flagship and small (read per-`usage_id` metrics).
   - Your tool list is the active one.
   - Your `AGENTS.md` was loaded (the first event in the conversation should reflect it).
   - The critic, if you kept one, fires and produces a verdict you can read.
   - The Docker container started clean and tore down clean.

### What "shipped" means

Run the harness on three different tasks across two different repos. If the same `harness.py` produces results you'd be willing to put in a PR, it shipped. If you find yourself tweaking knobs in `harness.py` for each task, you have a *prototype* — go back to the project that owns the tweak and decide whether the knob belongs in `harness.py` (constant) or in a per-task config (variable).

The line between "constant" and "variable" is the most underrated harness decision. Make it on purpose.

> **What you keep:** `harness.py` itself. This is the artifact the whole tutorial builds toward. Commit it. Use it. Iterate on it the way you'd iterate on any production tool — not by rewriting from scratch each time, but by changing one knob at a time and measuring.

---

## Tabulating your results

Keep a `results.md` next to your fork of this directory:

```markdown
# Harness projects — <date>

Repo: agent-canvas @ <SHA>
Model: anthropic/claude-sonnet-4-5-20250929 (unless noted)
Prompt: "Find every place VITE_BACKEND_HOST is read or set..."

## P01: Baseline + routing
| Config | Turns | Tokens (in/out) | Cost | Correct |
|---|---|---|---|---|
| Sonnet 4.5 | 6 | 18,200 / 1,150 | $0.061 | ✓ |
| GPT-5-mini | 5 | 16,400 / 980 | $0.014 | ✓ |
| Routed (kw) | 6 | 17,100 / 1,020 | $0.022 | ✓ |

Kept: keyword router (sonnet for "refactor"|"design"|"debug", haiku otherwise).

## P02: Tool surface
...
```

Three runs is barely a signal; ten is convincing; thirty is real. Pick a budget and stick to it.

---

## Where to go from here

`harness.py` exists. The next questions are about how it evolves:

- **Add a hook** that requires every `bash` call to include a `hypothesis` field. Compare turn counts before/after on a long task. ([Hooks guide](https://docs.openhands.dev/sdk/guides/hooks).)
- **Write a custom condenser** that drops noisy `npm install` output but keeps test-failure traces. Measure cost over a 50-turn session.
- **Build a custom tool** that reads a `feature_list.json` (the [walkinglabs](https://github.com/walkinglabs/learn-harness-engineering) convention) and forces the agent to mark a feature as in-progress before editing files in its scope.
- **Fork an MCP server** for your own data. Plug it into your harness. Re-run P03 with your real data.

That's where harness engineering stops being a tour and starts being engineering. Open the [SDK custom-tools guide](https://docs.openhands.dev/sdk/guides/custom-tools), pick the smallest of the bullets above, and ship it as the next version of `harness.py`.
