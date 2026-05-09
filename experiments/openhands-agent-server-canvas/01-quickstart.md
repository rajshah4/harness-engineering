# 1 — Quickstart

The fastest path from zero to "I can see the harness running." We'll start the agent server and the canvas with a single `npm run dev`, send a message, and prove the loop is alive.

If anything in this section fails, fix it before continuing. The rest of the tutorial assumes you have a working setup.

---

## 1.1 Install prerequisites

```bash
# Node 22.12+
node --version   # → v22.12.x or higher

# uv (used by the canvas to run uvx-spawned agent-server)
curl -LsSf https://astral.sh/uv/install.sh | sh
uv --version

# An LLM API key. Replace the model and key for your provider.
export LLM_API_KEY="sk-..."
export LLM_MODEL="anthropic/claude-sonnet-4-5-20250929"
```

The canvas dev script will install Python dependencies into a uvx-managed env on first run. You don't manage that env yourself.

---

## 1.2 Clone and start the canvas

```bash
git clone https://github.com/OpenHands/agent-canvas.git
cd agent-canvas
npm install
npm run dev
```

What this actually does, from `DEVELOPMENT.md`:

- Spawns an agent-server subprocess via `uvx` on `127.0.0.1:18000`.
- Starts a Vite dev server on `http://localhost:8000` (the ingress port).
- Writes isolated state under `.openhands-dev/` (tmux sockets, conversation persistence, bash event log, VS Code port). This means it won't fight any other OpenHands install you have running.

You should see logs from both processes interleaved. Wait until the agent server prints something like `API server is ready at http://127.0.0.1:18000` — that's the [readiness probe](https://docs.openhands.dev/sdk/guides/agent-server/local-server) firing. Then open `http://localhost:8000` in a browser.

> **Filesystem warning, repeated.** This setup runs the agent server directly on your machine. The agent has full bash, file-edit, and (optionally) browser tools against your real filesystem. Don't run risky tasks until you switch to a Docker sandbox in the tour.

---

## 1.3 Confirm the harness is alive (without the UI)

Before you trust the canvas, hit the agent server's HTTP API directly. This is the same surface the canvas uses; if it works here, the canvas can't be lying to you.

```bash
# Health check — no auth needed by default
curl -s http://127.0.0.1:18000/health | jq .

# Expected response (shape may evolve):
# {
#   "status": "healthy",
#   "docker": "connected",   # or "disconnected" for local process mode
#   "workspaces": 0,
#   "uptime": 12
# }
```

If you get a connection refused, the server isn't up yet — wait, then try again. If you get a 401, you're running with `SESSION_API_KEY` set; export `VITE_SESSION_API_KEY` to the same value (see [DEVELOPMENT.md](https://github.com/OpenHands/agent-canvas/blob/main/DEVELOPMENT.md#environment-variables)) and restart.

The interesting endpoints, all documented in the [agent-server architecture page](https://docs.openhands.dev/sdk/arch/agent-server):

```text
POST   /workspaces                       Create a new workspace
DELETE /workspaces/{id}                  Tear it down
POST   /conversations                    Create a conversation
POST   /conversations/{id}/messages      Send a user message
GET    /conversations/{id}/stream        WebSocket for events
GET    /metrics                          Prometheus metrics
```

This is your harness. It's a REST/WS API and a workspace abstraction. The model has not entered the picture yet.

---

## 1.4 Send your first message through the canvas

In the browser:

1. Open `http://localhost:8000`.
2. Create a new conversation. Pick the LLM and model you exported above.
3. Type something narrow and verifiable. A good first prompt is:

   > Read the current repo and write three facts about it into `FACTS.txt`.

4. Watch the event stream as it runs.

You'll see the canvas render a sequence of typed events: tool calls (`bash`, `view`, `str_replace`, `create`), tool returns, model deltas, and a final message. Each row is one event from the [`Event`](https://docs.openhands.dev/sdk/arch/events) framework. Save this trace; we'll come back to it in the harness tour.

If `FACTS.txt` shows up in your `.openhands-dev/` workspace dir, you have a working harness end-to-end.

---

## 1.5 Send the same message via SDK (optional but recommended)

The canvas is one client. The Python SDK is another. Running the same task through both, against the same server, makes it obvious that the *harness* is the server, not either client.

Save this as `quickstart.py`:

```python
import os, tempfile
from pydantic import SecretStr
from openhands.sdk import LLM, Conversation, RemoteConversation, Workspace
from openhands.tools.preset.default import get_default_agent

llm = LLM(
    usage_id="agent",
    model=os.environ["LLM_MODEL"],
    api_key=SecretStr(os.environ["LLM_API_KEY"]),
)
agent = get_default_agent(llm=llm, cli_mode=True)

# The canvas already started this server on :18000.
workspace = Workspace(
    host="http://127.0.0.1:18000",
    working_dir=tempfile.mkdtemp(prefix="harness_quickstart_"),
)
conversation = Conversation(agent=agent, workspace=workspace, visualize=True)
assert isinstance(conversation, RemoteConversation)

conversation.send_message("Write 3 facts about this project into FACTS.txt.")
conversation.run()

print("events:", len(conversation.state.events))
print("cost  :", conversation.conversation_stats.get_combined_metrics().accumulated_cost)
conversation.close()
```

Run it:

```bash
uv run --with openhands-sdk --with openhands-tools python quickstart.py
```

You should now have *two* conversations on the same agent server — one started from the canvas, one from Python. They share workspace state (subject to `working_dir`) and event persistence. Open the canvas; you can see the SDK-created conversation in the sidebar. That's not a coincidence — both clients write through the same `/conversations` endpoint.

---

## 1.6 Sanity checklist

Before moving on, confirm all of these are true:

- [ ] `curl http://127.0.0.1:18000/health` returns `"status": "healthy"`.
- [ ] The canvas at `http://localhost:8000` shows your test conversation.
- [ ] `FACTS.txt` exists in the working directory the canvas chose.
- [ ] You've eyeballed the event stream and recognize at least: a user message, a `bash` or `view` tool call, the matching observation, and an agent message.
- [ ] You ran the SDK script *and* the canvas conversation against the same server, and both show up.

If any of the above is false, fix it now. Common failures and fixes:

| Symptom | Likely cause | Fix |
|---|---|---|
| `node: command not found` | Wrong Node version | `nvm install 22.12 && nvm use 22.12` |
| `uvx: command not found` | `uv` not on `PATH` | Re-source your shell, or `~/.local/bin/uvx --version` |
| Server exits immediately, no health endpoint | Wrong/missing `LLM_API_KEY` | `export LLM_API_KEY=...` and restart `npm run dev` |
| `401 Unauthorized` from `/health` | Backend started with session auth on | Either unset `SESSION_API_KEY` / `OH_SESSION_API_KEYS_0`, or set `VITE_SESSION_API_KEY` to the same value |
| Canvas blank, console errors about CORS | Frontend pointing at wrong backend | Check `VITE_BACKEND_HOST` matches the agent-server port (default `127.0.0.1:18000` in dev mode) |
| Canvas can't connect, port 8000 in use | Some other dev server | Set `PORT=8123 npm run dev` |

Once the checklist passes, move on to [`02-harness-tour.md`](./02-harness-tour.md).
