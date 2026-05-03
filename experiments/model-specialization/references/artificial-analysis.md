# Source Guide: Artificial Analysis

Use this source when you want a broader cross-vendor view of model capability, pricing, speed, and release timing.

## Access Requirement

Artificial Analysis API-based collection requires an API key. If you do not have a key, use a manual export or webpage transcription workflow instead.

## What It Is Good For

- Tracking leadership changes over time
- Comparing broad capability metrics such as coding, reasoning, and overall intelligence
- Adding price and speed context to performance analysis

## Suggested Functional Mapping

These are not direct software-task benchmarks, so the mapping is more interpretive than OpenHands:

- `Artificial Analysis Coding Index` → `coding`
- `Artificial Analysis Math Index` → `reasoning`
- `Artificial Analysis Intelligence Index` → `general capability`
- `Median output tokens per second` → `speed`
- `Price per 1M tokens` or blended price → `cost efficiency`

Do not present these as the same kind of evidence as task-grounded agent benchmarks.

## Recommended Workflow

1. Fetch or export the model table.
2. Keep the source-native metric names.
3. Normalize rows into the shared schema.
4. Separate capability, speed, and price rather than blending them by default.
5. If you compute derived measures such as `intelligence per dollar`, label them clearly as derived.

## Minimum Caveats To Include

- The source requires an API key for API-based collection.
- These metrics are not the same as benchmark-specific software task completion rates.
- Derived rankings can change depending on which metric you choose.
- Release date and leaderboard position should not be confused with current deployment quality in a specific harness.

## Reusable Prompt

```text
Analyze this Artificial Analysis data as a multi-metric model comparison, not a single "best model" ranking.

Build a normalized table with:
- model
- metric
- functional task type
- score
- rank
- date
- vendor
- notes

Then answer:
1. Which models lead on coding, reasoning, general capability, speed, and value?
2. Does one model lead across all of those categories?
3. Which rankings are stable, and which change a lot when the metric changes?
4. What caveats matter most for interpreting these results?

Rules:
- Keep source-native metric names.
- Separate raw metrics from derived metrics.
- State clearly that API access requires a key.
- Write one short paragraph suitable for a blog post or slide.
```

## Sources

- Main site: <https://artificialanalysis.ai/>
- API docs or API responses if available in your environment
