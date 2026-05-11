#!/usr/bin/env bash
# Tiny helper: hit the agent-server health endpoint and pretty-print.
# Defaults assume `npm run dev:dangerously-dockerless` from agent-canvas.
# Override with: AGENT_SERVER=http://127.0.0.1:8000 ./health.sh

set -euo pipefail

AGENT_SERVER="${AGENT_SERVER:-http://127.0.0.1:18000}"

if ! command -v jq >/dev/null 2>&1; then
  echo "jq not installed; falling back to raw curl"
  curl -fsS "${AGENT_SERVER}/health"
  echo
  exit 0
fi

curl -fsS "${AGENT_SERVER}/health" | jq .
