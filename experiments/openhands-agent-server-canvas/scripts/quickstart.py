"""
Send the canonical 'three facts' task through the agent server that
agent-canvas spun up via `npm run dev`. Mirrors 01-quickstart.md §1.5.

Run with:

    uv run --with openhands-sdk --with openhands-tools \
        python quickstart.py

Required environment variables:
    LLM_API_KEY  Your provider key (Anthropic, OpenAI, etc.)
    LLM_MODEL    LiteLLM-style provider/model string

Optional:
    AGENT_SERVER  Default http://127.0.0.1:18000 (matches `npm run dev`)
"""

import os
import tempfile

from pydantic import SecretStr

from openhands.sdk import LLM, Conversation, RemoteConversation, Workspace
from openhands.tools.preset.default import get_default_agent


def main() -> None:
    api_key = os.environ["LLM_API_KEY"]
    model = os.environ.get("LLM_MODEL", "anthropic/claude-sonnet-4-5-20250929")
    server = os.environ.get("AGENT_SERVER", "http://127.0.0.1:18000")

    llm = LLM(usage_id="agent", model=model, api_key=SecretStr(api_key))
    agent = get_default_agent(llm=llm, cli_mode=True)

    workspace = Workspace(
        host=server,
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
