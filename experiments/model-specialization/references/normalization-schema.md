# Normalized Leaderboard Schema

Use this shared schema when comparing model performance from multiple public leaderboard sources.

## Required Fields

- `model` — model name as shown by the source
- `source` — source name, for example `OpenHands Index` or `Artificial Analysis`
- `benchmark` — benchmark or metric name as reported by the source
- `functional_task_type` — your translated workload category, for example `bug fixing`, `app building`, `research`, `terminal work`, `frontend`
- `score` — numeric score from the source
- `rank` — rank within that source and benchmark or metric
- `date` — publication or submission date, normalized to `YYYY-MM-DD` where possible

## Recommended Fields

- `agent_version` — useful for harness-sensitive leaderboards such as OpenHands
- `metric_unit` — for example `%`, `index`, `tokens/sec`, `$ / 1M tokens`
- `vendor` — model creator
- `notes` — missing-data caveats, source quirks, or tie notes
- `source_url` — direct URL to the source page or API payload

## Example Rows

```csv
model,source,benchmark,functional_task_type,score,rank,date,agent_version,metric_unit,vendor,notes,source_url
GPT-5.4,OpenHands Index,SWE-Bench,bug fixing,75.6,2,2026-04-24,v1.18.1,%,OpenAI,,https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.4/scores.json
GPT-5.4,OpenHands Index,GAIA,research,82.4,1,2026-04-22,v1.18.0,%,OpenAI,,https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.4/scores.json
Claude Opus 4.7,Artificial Analysis,Coding Index,coding,64.2,1,2026-05-01,,index,Anthropic,Requires API key or manual export,https://artificialanalysis.ai/
```

## Rules

- Do not collapse unlike metrics into one synthetic score unless you explain the transformation.
- Keep source-native benchmark names even when you add your own `functional_task_type`.
- Preserve ties.
- If dates differ materially across rows, say so in the analysis.
- If a source has missing rows for a model, keep the row blank rather than inventing a zero.
