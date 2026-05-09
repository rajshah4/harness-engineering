# 2 — Harness Tour: Where the Five Levers Actually Live

The thesis from the talk: a coding agent is `Model + Harness`, and the harness is the part you tune. The five levers are model, retrieval, memory, loops, and architecture. They're abstract until you can point at the line of code that implements each one.

This tour does that, using the running OpenHands stack from the [quickstart](./01-quickstart.md). For each lever, we'll find the file, the API surface, and the canvas affordance — and call out what's tunable vs. what's baked in.

> Open three terminals before you start: one tailing the agent-server logs from `npm run dev`, one for `curl`/`uv run` against the API, and one to keep this file open.

---

## 2.1 Lever 1 — Model: who's reasoning, and how do you tell?

The "model" lever isn't only "which LLM." It's:

- Which provider/model name (LiteLLM string).
- Which auth path (`api_key`, `subscription_login`, `base_url`).
- Which `usage_id` — multiple LLMs can coexist in one conversation (e.g. a `title-gen-llm` for cheap title generation, separate from the main agent LLM).
- Which "preset" wraps it — the SDK ships `get_default_agent()` which bundles a tool selection, system prompt, and skill set per model family.

### Where it lives

- **SDK side:** `openhands.sdk.LLM` and `openhands.tools.preset.default.get_default_agent`. See [`software-agent-sdk/examples/01_standalone_sdk/01_hello_world.py`](https://github.com/OpenHands/software-agent-sdk/blob/main/examples/01_standalone_sdk/01_hello_world.py) for the canonical wiring.
- **Server side:** `POST /conversations` accepts the agent definition. The server stores it; subsequent messages route through the same agent.
- **Canvas side:** the model picker in the new-conversation modal. Under the hood it builds the same agent definition and posts it.

### What you can change

The basic case — one model, swap the string:

```python
llm = LLM(
    usage_id="agent",                         # logical name
    model="anthropic/claude-sonnet-4-5-20250929",
    base_url=os.getenv("LLM_BASE_URL"),       # for self-hosted / proxy
    api_key=SecretStr(os.environ["LLM_API_KEY"]),
)
```

LiteLLM resolves the `provider/model` string. You can swap `openai/gpt-5-mini-2025-08-07`, a Bedrock route, or a local Ollama via `base_url`. The harness doesn't care.

### The model lever has a second knob: routing

A real harness rarely uses one model for everything. Cheap calls go to a small model; hard calls go to a flagship; vision calls go to a multimodal one. OpenHands exposes this two ways:

- **[`LLMRegistry`](https://docs.openhands.dev/sdk/guides/llm-registry)** — a name-keyed bag of `LLM` instances. You build them once at startup, look them up by `usage_id`. The SDK already uses it internally — note the `title-gen-llm` distinct from `agent` in the [local-server example](https://docs.openhands.dev/sdk/guides/agent-server/local-server). Title generation goes to a cheap model; the main loop goes to your flagship. That's a real cost lever, not a curiosity.
- **[Model Routing](https://docs.openhands.dev/sdk/guides/llm-routing)** — `Router` subclasses (e.g. `MultimodalRouter`) that act *as* an `LLM`. Pass one to `Agent(llm=router, ...)` and the router decides per-message which underlying model to call. The shipped `MultimodalRouter` switches between a primary and a secondary based on whether the message contains images:

  ```python
  from openhands.sdk.llm.router import MultimodalRouter

  multimodal = MultimodalRouter(
      usage_id="multimodal-router",
      llms_for_routing={"primary": flagship_llm, "secondary": cheap_llm},
  )
  agent = Agent(llm=multimodal, tools=tools)
  ```

  Subclass `Router` for your own policy — keyword-based, complexity-based, latency-based. This is the same pattern the talk's slide-22 framing implies but most operators never wire up.

### What you can measure

`conversation.conversation_stats.get_combined_metrics()` returns tokens, cost, and latency per `usage_id`. That's the right granularity — you want to compare the *same* harness across two LLMs, not "the cost of running OpenHands." With a router in place, each leg shows up under its own `usage_id` so you can see exactly which calls went where.

> **Pointer to the talk:** slide 11 ("Same model, 2× performance gap") — model picks matter less than harness picks. The way you check that for *your* task is by changing only the `model` argument and rerunning the same conversation, *or* by changing only the routing policy and watching where the cost lands. Everything else in this tour stays constant.

---

## 2.2 Lever 2 — Retrieval: how the agent finds code

Most "RAG" assumptions don't apply to coding agents. The default OpenHands tools are lexical and file-based, in line with the talk's [retrieval rules](../../README.md#retrieval): grep first, semantics only when vocabulary mismatch hurts you.

### Where it lives

The default agent tool set (`get_default_agent`) ships with these retrieval-shaped tools:

- **`bash`** — for `grep -rn`, `rg`, `find`, `git log`. The lexical baseline.
- **`view` / file editor** — read whole files when they fit in context. This is the "files instead of chunking" rule from slide 36.
- **`task_tracker`** — a small tool, not retrieval per se, but it stops the agent from re-querying for context it already has by writing it down.

There is no built-in vector store. You can wire one in via [MCP](https://docs.openhands.dev/sdk/guides/mcp) — point the agent at a server that exposes a `search_code` tool — but that is an explicit choice, not a default.

### What you can change

In the SDK:

```python
from openhands.sdk import Tool
from openhands.tools.terminal import TerminalTool
from openhands.tools.file_editor import FileEditorTool

agent = Agent(
    llm=llm,
    tools=[
        Tool(name=TerminalTool.name),     # bash → grep, rg, find
        Tool(name=FileEditorTool.name),   # view, str_replace, create
        # add an MCP-backed tool here only when grep fails for vocabulary reasons
    ],
)
```

In the canvas: the new-conversation modal exposes a tool toggle list. Browser tools (`BrowserToolSet`) are off by default in CLI/dev mode (`VITE_ENABLE_BROWSER_TOOLS=false` flips it).

### What to actually inspect

Open a finished conversation in the canvas. Filter the event stream to tool calls. Count: how many `bash`/`grep` invocations did the model make before writing code? On a 100-file repo, three or four is healthy; thirty is a sign of a missing index.

> **Tour exercise:** run the same `find where the canvas reads VITE_BACKEND_HOST` query against a clone of `agent-canvas`, once with only `bash`+`view` and once with an MCP semantic-search server attached. Compare turn count, total tokens, and whether either agent hallucinated a path. (We do this for real in [Experiment 3](./03-experiments.md#experiment-3--retrieval-grep-vs-mcp-semantic-search).)

---

## 2.3 Lever 3 — Memory: what survives, and where it sits

The talk's three layers — active context, working state, durable memory — all map to concrete OpenHands surfaces.

### Active context: condensers

The system prompt + recent events is the active context. OpenHands abstracts compaction behind the [`Condenser`](https://docs.openhands.dev/sdk/arch/condenser) interface. Different policies can live behind one plugin point — `LLMSummarizingCondenser`, `BrowserOutputCondenser`, etc.

- **Server-side:** the condenser runs inside the loop; you don't see it as a separate API call but you see the *result* — older events get replaced by a synthetic summary event in the stream.
- **Canvas-side:** when compaction fires, the canvas renders a "compacted" placeholder so you can tell what was thrown away.

This is the openness the talk's slide 49 ("How does Codex do it???") is missing in closed harnesses. You can see *exactly* when compaction triggers and what it kept.

> Reference: [OpenHands context condensation](https://openhands.dev/blog/openhands-context-condensensation-for-more-efficient-ai-agents) reports 2× per-turn cost reduction with equal-or-better SWE task quality.

### Working state: the workspace

The `Workspace` is the agent's filesystem. Plans, scratchpads, partial outputs all live as files in `working_dir`. This is the "files beat chat history" rule from slide 51 made concrete.

- The canvas shows the workspace as a tree on the left, with a file viewer.
- Conventions like `plan.md`, `progress.md`, `feature_list.json` (see the [walkinglabs course](https://github.com/walkinglabs/learn-harness-engineering)) work here without any framework support — they're just files.
- The agent re-reads them on every turn that needs them. They're not in active context; they're discoverable through `view` and `bash`.

### Durable memory: skills and `AGENTS.md`

Across sessions, two things persist:

1. **`AGENTS.md`** at the repo root — read at conversation start, injected into the system prompt. Same format as Codex / Cursor / VS Code support. The talk's caveat (slide 58) holds: auto-generated ones hurt; minimal hand-written ones help.
2. **[Skills](https://docs.openhands.dev/sdk/guides/skill)** — trigger + reference manual + scripts, loaded on demand. Set `VITE_LOAD_PUBLIC_SKILLS=true` in the canvas `.env` to pull from [`OpenHands/extensions`](https://github.com/OpenHands/extensions).

You evaluate skills the way you evaluate retrieval: with-skill vs. without-skill on the same prompts. There's a worked example at [`rajshah4/evaluating-skills-tutorial`](https://github.com/rajshah4/evaluating-skills-tutorial) — use that pattern.

### What OpenHands doesn't ship (yet)

Honesty check, because the talk's slide 64 talks about an *outer loop* — the agent updating its own skills across sessions based on what worked. OpenHands has the inputs for this (skills, metrics, experience persistence in conversation state) but doesn't ship the consolidator that turns "task X failed three times the same way" into a new or revised skill file. Other harnesses are starting to wire this up (the Hermes pattern, dream-consolidation designs in some forthcoming systems). If you're studying how harnesses evolve, this is the seam to watch — and a reasonable place to build something yourself, since the building blocks are already exposed.

---

## 2.4 Lever 4 — Loops & tools: making the cycle disciplined

The agent loop is the part most outsiders mean when they say "the agent." In OpenHands it's an explicit object with iteration limits, retries, security gates, and a hookable lifecycle.

### Where it lives

- **`Conversation.run()`** drives the loop. Each iteration: build prompt → call LLM → parse tool calls → dispatch tools → ingest results → repeat or stop.
- **Hooks** ([guide](https://docs.openhands.dev/sdk/guides/hooks)) let you observe or veto each step. This is where "force hypothesis before action" (slide 78) becomes implementable: a pre-action hook can reject tool calls missing a `hypothesis` field.
- **Stuck Detector** ([guide](https://docs.openhands.dev/sdk/guides/agent-stuck-detector)) is the harness's defense against Ralph Wiggum loops — it watches for repeated identical actions and kills them.
- **Confirmation policy + Security analyzer** ([guide](https://docs.openhands.dev/sdk/guides/security)) implement the friction tiers from slide 86 — but it's worth seeing the actual API rather than waving at "the security guide."

### Friction tiers, named explicitly

The talk's slide 86 prescribes four tiers; OpenHands gives you two composable pieces that, together, cover them. From `openhands.sdk.security.confirmation_policy`:

| Slide-86 tier | OpenHands policy | What happens |
|---|---|---|
| Auto-allow safe (read, grep, ls) | `NeverConfirm()` *or* `ConfirmRisky()` with analyzer scoring `LOW` | Action runs, no prompt |
| Auto-allow reversible (edit, commit) | `ConfirmRisky()` with analyzer scoring `LOW`/`MEDIUM` | Action runs, no prompt — sandboxed by your `Workspace` choice |
| Prompt for network / unfamiliar | `ConfirmRisky()` with analyzer scoring `HIGH` | Conversation enters `WAITING_FOR_CONFIRMATION`; canvas surfaces the action for you to approve or reject |
| Require explicit approval for destructive | `AlwaysConfirm()` | Every action requires explicit yes; rejection feeds a string back to the agent so it can try a different approach |

`ConfirmRisky()` only does anything if you also attach an analyzer. The shipped `LLMSecurityAnalyzer` runs a separate cheap LLM (its own `usage_id="security-analyzer"`, which is exactly why the registry pattern from §2.1 matters) to score each action `LOW` / `MEDIUM` / `HIGH` / `UNKNOWN`. You can swap in a rule-based or hybrid analyzer (the [defense-in-depth](https://docs.openhands.dev/sdk/guides/security#defense-in-depth-security-analyzer) pattern) without changing the policy.

Wired up:

```python
from openhands.sdk.security.confirmation_policy import ConfirmRisky
from openhands.sdk.security.llm_analyzer import LLMSecurityAnalyzer

conversation.set_security_analyzer(LLMSecurityAnalyzer(llm=cheap_llm))
conversation.set_confirmation_policy(ConfirmRisky())
```

When the agent emits an action, the loop pauses with `execution_status == WAITING_FOR_CONFIRMATION`. You drain `ConversationState.get_unmatched_actions(...)`, decide, and either let `conversation.run()` proceed or call `conversation.reject_pending_actions("reason here")`. The rejection string goes back into the loop as feedback, which is how the agent learns to try a different approach instead of retrying the same blocked thing.

That's the whole stack from slide 86. The policy enum is small on purpose; the variability lives in the analyzer.

### What's enforced by tool *schema*, not prompt

The default file editor's `str_replace` tool requires both `old_str` and `new_str`, with the constraint that `old_str` must match exactly one location. That single schema choice prevents most "AI replaced the wrong thing" failures. It is *not* enforced by the system prompt; it's enforced by the tool input validator. Read the tool definitions before you write your own.

### Canvas affordances

- The event stream is the loop. Each row is one iteration's output.
- "Pause" pauses the loop between iterations (see [Pause and Resume](https://docs.openhands.dev/sdk/guides/convo-pause-and-resume)).
- "Send while running" injects a new user message mid-loop without restarting.
- "Fork" creates a new conversation from any point in the event history (see [Fork a Conversation](https://docs.openhands.dev/sdk/guides/convo-fork)). This is your `git reset` for agent runs — mid-run if you see things going off the rails, fork from the last good state instead of fighting forward.

The fork primitive is interesting because it's what lets you run *cheap* loop ablations: same starting state, different downstream policy.

---

## 2.5 Lever 5 — Architecture: single agent, sub-agents, and the canvas

The final lever is whether you're running one agent or many. The talk's stance (slides 95–96) is to default to single — multi-agent is a coordination tax that has to earn itself.

OpenHands gives you three relevant primitives:

1. **One agent, many tools** — the default. Add tools, don't add agents.
2. **[Sub-Agent Delegation](https://docs.openhands.dev/sdk/guides/agent-delegation)** — the parent spawns a child for a bounded subtask, child's events come back as a summary. Use when context is the bottleneck (e.g. a file the parent doesn't want polluting its window).
3. **[Task Tool Set](https://docs.openhands.dev/sdk/guides/task-tool-set)** — synchronous delegation through a tool call. Cleaner mental model than free-form spawning.
4. **Critic loops** — a separate LLM reviews the main agent's trace. The talk highlights this as the one multi-agent pattern that consistently *works* (slide 97). The SDK ships an experimental [`Critic`](https://docs.openhands.dev/sdk/guides/critic) for this.

### Architecture as deployment shape

There's a second "architecture" axis: where the agent server runs. Three shapes ship out of the box:

| Shape | Workspace class | When to use |
|---|---|---|
| Local subprocess | `Workspace(host="http://127.0.0.1:18000")` | Dev loops on a trusted laptop. What `npm run dev` gives you. |
| [Docker sandbox](https://docs.openhands.dev/sdk/guides/agent-server/docker-sandbox) | `DockerWorkspace(server_image=...)` | Anything you don't fully trust. Isolated FS, isolated network, kill-the-container cleanup. |
| [API sandbox](https://docs.openhands.dev/sdk/guides/agent-server/api-sandbox) / [Cloud workspace](https://docs.openhands.dev/sdk/guides/agent-server/cloud-workspace) | `APIRemoteWorkspace(...)` | Hosted runtime; no local Docker. Pays for managed isolation. |

Switching from local to Docker is a single class change in the client; the agent code, tools, prompts, and event stream stay identical. That's the harness boundary doing its job — *where* the work runs is decoupled from *how* it runs.

The canvas can flip between agent servers at runtime — you can have a "dev" server on `localhost:18000` and a "production-ish" Dockerized one on `localhost:8010`, and just switch the active connection in the UI sidebar. This is more useful than it sounds the first time you accidentally run a destructive task on the wrong server.

---

## 2.6 What's *not* tunable (yet)

Worth knowing before you go looking:

- **The system prompt is mostly assembled, not user-edited.** You can replace the agent definition wholesale, but there isn't a `--system-prompt` flag. Read the assembled prompt by inspecting the first event in a conversation; if you don't like it, build a custom agent ([guide](https://docs.openhands.dev/sdk/guides/agent-custom)) instead of trying to patch it.
- **The canvas doesn't expose every server feature.** Hooks, security analyzer config, condenser policy — these are SDK-level. You'll edit Python and restart the dev script, not click a button.
- **MCP tool *selection* is per conversation, not per turn.** You decide on tools when the conversation starts. Mid-run swaps require forking.

These are real harness decisions someone made, and you'd benefit from auditing whether they fit your task before you build on top.

---

## 2.7 What you should be able to do now

After this tour, you should be able to point at, in either the canvas or the codebase:

1. The exact place a model swap happens.
2. Where to read the agent's tool list for a given conversation.
3. The compaction event (or its absence) in the event stream.
4. The session lifecycle hooks where you'd inject a "block destructive commands" check.
5. The line of code that decides whether the agent runs locally, in Docker, or in the cloud.

If any of those is fuzzy, re-read the relevant section before moving on.

The next file ([`03-experiments.md`](./03-experiments.md)) drops you into five small experiments. Each one changes one of the levers above and asks you to write down what you observed. That's the part that turns a tour into engineering.
