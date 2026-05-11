"""
Send the canonical 'three facts' task through the agent server that
agent-canvas spun up via `npm run dev:dangerously-dockerless`.
Mirrors 01-quickstart.md §1.5.

Run with:

    uv run --with openhands-sdk --with openhands-tools \
        python quickstart.py

Required environment variables:
    LLM_API_KEY  Your provider key (Anthropic, OpenAI, etc.)

Optional:
    LLM_MODEL            LiteLLM-style provider/model string
    AGENT_SERVER          Default http://127.0.0.1:18000
    AGENT_SERVER_API_KEY  Session key for authenticated dev servers
"""

import os
import sys
import tempfile
from pathlib import Path

DEFAULT_MODEL = "anthropic/claude-sonnet-4-5-20250929"


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if value:
        return value

    print(
        f"Missing required environment variable: {name}\n\n"
        "Before running this script, set your model provider key, for example:\n"
        "  export LLM_API_KEY='sk-...'\n"
        f"  export LLM_MODEL='{DEFAULT_MODEL}'\n",
        file=sys.stderr,
    )
    raise SystemExit(2)


def main() -> None:
    api_key = require_env("LLM_API_KEY")
    model = os.environ.get("LLM_MODEL", DEFAULT_MODEL)
    server = os.environ.get("AGENT_SERVER", "http://127.0.0.1:18000")
    session_key_path = Path.home() / ".openhands" / "agent-canvas" / "session-api-key.txt"
    agent_server_api_key = os.environ.get("AGENT_SERVER_API_KEY")
    if agent_server_api_key is None and session_key_path.exists():
        agent_server_api_key = session_key_path.read_text().strip()

    from pydantic import SecretStr
    from openhands.sdk import LLM, Conversation, RemoteConversation, Workspace
    from openhands.tools.preset.default import get_default_agent

    llm = LLM(usage_id="agent", model=model, api_key=SecretStr(api_key))
    agent = get_default_agent(llm=llm, cli_mode=True)

    workspace = Workspace(
        host=server,
        api_key=agent_server_api_key,
        working_dir=tempfile.mkdtemp(prefix="harness_quickstart_"),
    )

    conversation = Conversation(agent=agent, workspace=workspace, visualize=True)
    assert isinstance(conversation, RemoteConversation)

    try:
        conversation.send_message(
            "Read the current repo and write 3 facts about it into FACTS.txt."
        )
        conversation.run()

        events = len(conversation.state.events)
        cost = conversation.conversation_stats.get_combined_metrics().accumulated_cost
        print(f"events: {events}")
        print(f"cost  : {cost}")
    finally:
        conversation.close()


if __name__ == "__main__":
    main()
