# Harness Engineering on OpenHands: Agent Server + Agent Canvas

A hands-on tutorial that uses two open-source projects as a *real* harness you can read, run, and modify:

- **[Agent Server](https://docs.openhands.dev/sdk/arch/agent-server)** — the HTTP API server that owns the workspace, conversation state, tool dispatch, and event stream. Everything outside the model lives here.
- **[Agent Canvas](https://github.com/OpenHands/agent-canvas)** — a TypeScript/React UI that talks to one or more agent servers. It is the operator surface — you watch the harness work, change knobs, fork conversations, and replay events.

The point of this tutorial isn't to teach you how to install OpenHands. It's to use a working harness as a microscope. Each of the [five levers](../../README.md#the-five-levers) — model, retrieval, memory, loops, architecture — is a concrete file or HTTP endpoint in this stack. We'll find each one, prod it, and watch the agent's behavior change.

> If you want the conceptual frame first, read the top-level [README](../../README.md) and watch the [talk](https://www.youtube.com/watch?v=KijChx7q2nY). This experiment assumes you already buy the thesis: **the model reasons; the harness does everything else.**

---

## Why this stack

There are good harnesses you can't see (Claude Code, Codex CLI, Cursor) and good ones you can (SWE-agent, OpenHands, deepagents). For learning, only the open ones work — you need to read the code to understand what a harness *is*.

OpenHands is a useful study target for three specific reasons:

1. **Clean client/server split.** The agent server is a stateless-ish HTTP API; the canvas is a thin client. The harness boundary is literally an OpenAPI spec. You can replace either side without rewriting the other.
2. **The same server runs three deployment shapes** — local process, Docker sandbox, hosted API — by swapping a `Workspace` class. That makes the cost of *where work runs* visible.
3. **Canvas exposes the harness.** Conversation history, event stream, tool calls, compaction triggers, MCP servers, skills — all are first-class UI elements. You don't have to grep logs to see what the harness is doing.

The OpenHands [post-mortem on Claude Code's recent regression](https://www.anthropic.com/engineering/claude-code-default-reasoning-effort-update) is a good reminder of what closed harnesses cost you. When the model didn't change but quality did, users had no way to diagnose it. The whole point of running an open harness is that you *can*.

---

## What you'll do

| Step | File | What it covers |
|---|---|---|
| 1 | [`01-quickstart.md`](./01-quickstart.md) | Install, run agent server + canvas, send your first message, confirm the loop |
| 2 | [`02-harness-tour.md`](./02-harness-tour.md) | Map the five levers to concrete code paths and HTTP endpoints |
| 3 | [`03-experiments.md`](./03-experiments.md) | Five small experiments where you change one knob and measure the effect |

Each experiment is intentionally narrow. The goal isn't to ship a feature — it's to make a single harness decision visible.

---

## What you'll need

- macOS or Linux. Windows works but the canvas dev script assumes a POSIX shell.
- **Node.js 22.12+** and `npm` for the canvas frontend.
- **`uv`** ([install](https://docs.astral.sh/uv/getting-started/installation/)) — the canvas dev script uses `uvx` to spawn an agent-server subprocess on `127.0.0.1:18000`. You don't need to `pip install` anything yourself.
- **An LLM API key** — Anthropic, OpenAI, or anything else [LiteLLM](https://docs.litellm.ai/docs/providers) understands. Examples here use `anthropic/claude-sonnet-4-5-20250929`. Subscription login (`LLM.subscription_login()`) is supported if you'd rather not burn API credits.
- **Docker** is optional. You only need it if you want to run the agent server in `DockerWorkspace` mode (Step 3 of the harness tour) instead of as a local subprocess.

> Heads up: by default `npm run dev` runs the agent server *directly on your machine*. It can read and write your filesystem. The canvas authors warn about this in big bold letters in their README. The Docker walkthrough in the tour fixes this; do that before you point the agent at anything you care about.

---

## Reading list before you start

A short, opinionated bibliography. None of it is required, but each piece earns its place.

**Harness engineering, broadly:**

- [Engineering the Harness (talk + slides)](../../README.md#presentation-materials) — the framing this whole repo is built around.
- [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/) — Codex team's take. Worth reading just to see how a closed harness describes its own design.
- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — companion to the talk's compaction section.
- [walkinglabs / learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering) — project-based course built around `AGENTS.md`, `feature_list.json`, `init.sh`, `progress.md`. Heavier on convention than on plumbing; complements this tutorial well.

**Specific to OpenHands:**

- [Agent Server architecture](https://docs.openhands.dev/sdk/arch/agent-server) — design intent.
- [Agent Server: Local](https://docs.openhands.dev/sdk/guides/agent-server/local-server) and [Docker Sandbox](https://docs.openhands.dev/sdk/guides/agent-server/docker-sandbox) guides — runnable examples.
- [`OpenHands/agent-canvas`](https://github.com/OpenHands/agent-canvas) — the UI itself. The `DEVELOPMENT.md` is unusually honest about which knobs you actually have.
- [`OpenHands/software-agent-sdk`](https://github.com/OpenHands/software-agent-sdk) — the SDK the server is built on. The `examples/` directory is one of the better dumps of "this is how a real harness handles X" you'll find.

---

## How to read the rest of this tutorial

In order. Each step depends on the previous one being live.

1. **[Quickstart](./01-quickstart.md)** — get a green health check and a working canvas in front of you. Skip nothing here.
2. **[Harness tour](./02-harness-tour.md)** — with the system running, walk through where each of the five levers actually lives.
3. **[Experiments](./03-experiments.md)** — change one thing at a time. Write down what happens. Don't read the next experiment before finishing the current one.

There's a small `scripts/` directory with the helper bash scripts the experiments reference, and an `assets/` directory for screenshots and example trace dumps you can compare against your own.

---

## What I'd hope you take away

- **A harness is not abstract.** It is `POST /conversations`, `GET /conversations/{id}/stream`, `tools=[...]`, `cli_mode=False`, `OH_AGENT_SERVER_LOCAL_PATH=...`. Every lever in the talk has a corresponding string in a config file or a parameter in an SDK call.
- **Open harnesses are diagnostic instruments.** When something goes wrong, you can read the loop. When something goes right, you can copy the policy.
- **Canvas is doing more than rendering.** The UI is enforcing decisions about what the operator can see, what they can replay, what they can fork, and what they can change. That's harness work, not frontend work.

When you're done, you should be able to answer this question for any other agent product, open or closed: *what would I change about its harness if I owned the source?*
