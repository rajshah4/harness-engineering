# Cross-Benchmark Model Specialization

A reusable experiment for showing that "best model" depends on the task mix.

This experiment packages the pattern in three parts:

- `research_prompt.md` — a reusable prompt for comparing leaderboard results across task types
- `build_openhands_snapshot.py` — a small script that normalizes OpenHands `scores.json` files into one snapshot
- `index.html` — a local visualization of the normalized results

It also includes source-specific analysis guides under `references/`:

- `openhands-index-analysis.md` — public, harness-sensitive software-agent benchmarking
- `artificial-analysis.md` — broader model leaderboard analysis; API-based collection requires a key
- `normalization-schema.md` — shared schema for combining multiple sources

## The Question

> Do leaderboard winners stay winners when the task changes?

For agentic coding, the answer is often no. Models that lead on bug fixing can fall back on greenfield building, research, or terminal-heavy work. This experiment makes that specialization visible.

## How To Run

Regenerate the dataset from the current OpenHands results:

```bash
python3 build_openhands_snapshot.py
```

Open the visualization:

```bash
open index.html
```

## What This Shows

- **Score matrix** — one row per model, one column per benchmark
- **Task-type leaderboard** — sort models by functional task type and compare gaps directly
- **Podium board** — first, second, and third place for each task type, including ties
- **Per-model profile** — inspect how one model's performance shifts across task types
- **Specialization metrics** — identify the most balanced models and the biggest cross-benchmark swings

## Functional Task Types

- **Bug fixing** — measured with `swe-bench`
- **App building** — measured with `commit0`
- **Research** — measured with `gaia`
- **Terminal work** — measured with `swt-bench`

This framing is deliberate. The OpenHands Index supplies the scores; this experiment translates benchmark names into more intuitive workload categories.

## Reusing The Pattern

The general workflow is:

1. Choose benchmarks that represent meaningfully different task types.
2. Normalize them into one table with one row per model.
3. Compare both absolute scores and how ranks shift by benchmark.
4. State caveats about run date, agent version, and harness differences.

Use `research_prompt.md` when the source is a different leaderboard or a paper rather than OpenHands.

## Source Workflows

Use OpenHands when you want task-grounded agent performance and functional categories like bug fixing or app building.

Use Artificial Analysis when you want cross-vendor comparisons on broader capability, speed, price, and release timing. Treat it as a different kind of evidence from task-grounded software benchmarks, and note that API-based collection requires an API key.

## Sources

- OpenHands Index: <https://index.openhands.dev/home>
- Results repo: <https://github.com/OpenHands/openhands-index-results>
