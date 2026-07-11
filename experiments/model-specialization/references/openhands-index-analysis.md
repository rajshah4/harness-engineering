# Source Guide: OpenHands Index

Use this source when you want harness-sensitive comparisons across agentic coding tasks.

## What It Is Good For

- Comparing models on concrete software-agent workloads
- Showing that rank changes across task types
- Distinguishing bug fixing from app building, research, and terminal-heavy work

## Suggested Functional Mapping

- `SWE-Bench` → `bug fixing`
- `Commit0` → `app building`
- `GAIA` → `research`
- `SWT-Bench` → `terminal work`
- `SWE-Bench Multimodal` → `multimodal software work`

## Recommended Workflow

1. Collect one `scores.json` file per model from the OpenHands results repo.
2. Normalize the rows into the shared leaderboard schema.
3. Compare models across at least three task types, not one.
4. Use tie-aware rankings.
5. Write caveats about submission date and `agent_version`.

## Minimum Caveats To Include

- Runs may come from different dates.
- Scores may come from different OpenHands agent versions.
- This is more harness-sensitive than generic model leaderboards.
- Strong performance on one benchmark does not imply strength on the others.

## Reusable Prompt

```text
Analyze these OpenHands Index results as a task-specialization study, not a single leaderboard.

Build a table with:
- model
- benchmark
- functional task type
- score
- rank
- submission date
- agent version

Then answer:
1. Which models lead on bug fixing, app building, research, and terminal work?
2. Does any model finish first across every task type?
3. Which model is most balanced?
4. Which model shows the biggest swing across task types?
5. If comparing open-weight models to closed frontier baselines, which gaps remain after grouping by task type?

Rules:
- Preserve ties.
- Use exact benchmark names and exact scores.
- Call out date and agent-version caveats.
- Write one short paragraph suitable for a slide.
```

## Sources

- Index UI: <https://index.openhands.dev/home>
- Results repo: <https://github.com/OpenHands/openhands-index-results>
