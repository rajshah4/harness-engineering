# Open-Model Routing Boundary

Snapshot date: 2026-05-22.

This is the deeper readout behind `open-source-vs-frontier.md`. It uses OpenHands result archives to compare task-level outcomes for open-weight challengers against Claude Opus 4.7 and GPT-5.5, then translates the result into routing guidance.

Frontier baselines:

- Claude Opus 4.7
- GPT-5.5

Open-weight challengers in the overlap analysis:

- GLM-5.1
- Kimi-K2.6
- MiniMax-M2.7
- DeepSeek-V4-Pro, where benchmark coverage exists

## Routing Summary

Use open-weight first when the task looks like patch-style bug fixing with tests, terminal-heavy execution over known repositories, or budget-sensitive batch research. Escalate to Opus/GPT-5.5 when the task is greenfield app construction, high-recall research, hard multimodal UI work, or a failure from the first open-weight attempt.

The cleanest boundary is Commit0. Open models have no open-only wins there: every task solved by an open model is also solved by Opus or GPT-5.5, and Opus solves two additional packages (`marshmallow`, `minitorch`). That is the clearest "use closed first" category.

SWE-Bench and SWT-Bench are different. The open-model union and frontier union are very close, and the open models are much cheaper on several runs. These are good open-first categories, especially when a failed attempt can be retried or escalated.

## Benchmark Boundary

Counts below use a union within each model group. "Open solved" means at least one selected open-weight model solved the instance. "Frontier solved" means Opus 4.7 or GPT-5.5 solved it.

| Benchmark | Task shape | Open solved | Frontier solved | Both | Open-only | Frontier-only | Neither | Boundary |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| SWE-Bench | Patch-style bug fixing | 423/500 | 424/500 | 398 | 25 | 26 | 51 | Open-first is defensible. |
| Commit0 | Greenfield package implementation | 7/16 | 9/16 | 7 | 0 | 2 | 7 | Closed-first. |
| GAIA | Research/tool-use QA | 140/165 | 150/165 | 133 | 7 | 17 | 8 | Kimi-first for cost, GPT-5.5 for recall. |
| SWT-Bench | Terminal-heavy software tasks | 375/433 | 384/433 | 364 | 11 | 20 | 38 | Cheap open-first, escalate failures. |
| SWE-Bench Multimodal | Visual software issues | 32/102 | 37/102 | 27 | 5 | 10 | 60 | Opus-first for hard visual work; open ok for cheap triage. |

## Score And Cost

Costs are OpenHands `cost_per_instance`. The "score per dollar" column is a rough derived efficiency measure, not a leaderboard metric.

| Benchmark | Best open score | Best open cost | Best frontier score | Best frontier cost | Cost read |
| --- | ---: | ---: | ---: | ---: | --- |
| SWE-Bench | MiniMax-M2.7 75.6 | $0.18 | GPT-5.5 78.2 | $1.52 | MiniMax is near frontier at much lower cost. |
| Commit0 | GLM-5.1 37.5 | $5.31 | Opus 4.7 56.2 | $5.69 | Open is not cheaper enough to justify the accuracy loss. |
| GAIA | Kimi-K2.6 74.5 | $0.42 | GPT-5.5 86.1 | $0.74 | Kimi is a strong budget route; GPT buys recall. |
| SWT-Bench | Kimi-K2.6 70.4 | $0.33 | GPT-5.5 83.4 | $0.92 | Open-first is cost-effective if retries are allowed. |
| SWE-Bench Multimodal | Kimi-K2.6/GLM-5.1 41.2 | $0.64 / $6.92 | Opus 4.7 48.5 | $2.83 | Kimi is the economical open choice; Opus is the accuracy choice. |

DeepSeek-V4-Pro and MiniMax-M2.7 are especially cost-efficient on SWE-Bench/SWT-Bench, but they are not balanced general replacements. MiniMax collapses on GAIA and Commit0. DeepSeek-V4-Pro lacks GAIA and multimodal rows in this snapshot.

## Open-First Fallback Economics

This table treats the benchmark result as if a router could run an open model first, detect unsolved cases, then escalate those cases to the best frontier model for that benchmark. It is an oracle-style estimate, so use it as directional guidance rather than production math.

| Route | Open solved | Frontier rescue | Combined solved | Expected cost/instance | Closed-only cost | Read |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| MiniMax-M2.7 -> GPT-5.5 on SWE-Bench | 378/500 | 41 | 419/500 | $0.55 | $1.52 | Strong open-first route. |
| Kimi-K2.6 -> GPT-5.5 on GAIA | 123/165 | 24 | 147/165 | $0.61 | $0.74 | Saves cost, but GPT-first maximizes recall. |
| MiniMax-M2.7 -> GPT-5.5 on SWT-Bench | 299/433 | 74 | 373/433 | $0.41 | $0.92 | Strong cost route when retries are acceptable. |
| GLM-5.1 -> Opus 4.7 on Commit0 | 6/15 | 3 | 9/15 | $8.72 | $5.69 | Bad route; use Opus first. |
| Kimi-K2.6 -> Opus 4.7 on SWE-Bench Multimodal | 28/102 | 12 | 40/102 | $2.69 | $2.83 | Small savings; Opus-first is simpler for hard visual work. |

## What Open Models Do Well

Patch-style bug fixing is the strongest open-weight zone. On SWE-Bench, the selected open models solve 423 instances as a group, one fewer than the frontier group. MiniMax-M2.7 gets 75.6 at $0.18 per instance; DeepSeek-V4-Pro gets 73.2 at $0.16.

Terminal work is also plausible for open-first routing. On SWT-Bench, the open group solves 375/433 versus 384/433 for the frontier group. Single open models lag GPT-5.5 by roughly 13 points, but the costs are low enough that open-first plus fallback can still be attractive.

Kimi-K2.6 is the best open research route. It scores 74.5 on GAIA at $0.42 per instance. GPT-5.5 is stronger at 86.1, but at $0.74. Use Kimi when cost matters and perfect recall does not; use GPT-5.5 when missing a fact is expensive.

On SWE-Bench Multimodal, open models are not dominant overall, but they do have useful pockets. The open group solves 5 instances that neither Opus 4.7 nor GPT-5.5 solved, including three `react-pdf` issues. Kimi-K2.6 is the best economic option here because it matches GLM-5.1's score at much lower cost.

## Where Open Models Struggle

Commit0 is the hard boundary. The task is not "patch a known bug"; it is closer to implementing missing package behavior from scratch. The open group solves 7/16, Opus/GPT solve 9/16, and there are no open-only successes. Opus 4.7 is also far faster than GLM-5.1 on this benchmark: 636 seconds average runtime versus 2498 seconds.

High-recall research remains a frontier advantage. On GAIA, open models have 7 open-only wins, but frontier models have 17 frontier-only wins. GPT-5.5 is the right first choice when the answer needs to be correct on the first pass.

Hard multimodal software tasks are still mostly unsolved. The open group solves 32/102 and the frontier group solves 37/102, but 60/102 are not solved by either group. Opus improves the odds, especially on `marked` and `Chart.js`, but this category also needs harness and dataset work, not just a bigger model.

## Did Frontier Models Solve The Open Failures?

Often, but not always.

| Benchmark | Open misses rescued by frontier | Open-only wins | Shared misses | Interpretation |
| --- | ---: | ---: | ---: | --- |
| SWE-Bench | 26 | 25 | 51 | Frontier does not cleanly dominate; failures are instance-specific. |
| Commit0 | 2 | 0 | 7 | Frontier helps and open adds no unique wins. |
| GAIA | 17 | 7 | 8 | GPT/Opus rescue more, but open models still have unique successes. |
| SWT-Bench | 20 | 11 | 38 | Frontier helps, but many terminal tasks are fine for open-first. |
| SWE-Bench Multimodal | 10 | 5 | 60 | Opus helps, but many cases are hard for everyone. |

For Commit0, the exact pattern is useful:

- Both groups solve: `cachetools`, `deprecated`, `imapclient`, `portalocker`, `simpy`, `tinydb`, `voluptuous`
- Frontier-only: `marshmallow`, `minitorch`
- Neither group solves: `babel`, `chardet`, `cookiecutter`, `jinja`, `parsel`, `pyjwt`, `wcwidth`

That means an open-first strategy does not buy new coverage on Commit0; it mostly adds delay and cost before eventually needing Opus.

## Repo-Level Boundary

For SWE-Bench, the open group is effectively at parity on `sympy`, `sphinx`, `astropy`, and `pylint`, and is slightly better on `requests`, `pytest`, and `xarray`. Frontier is better on `matplotlib`, `scikit-learn`, and slightly better on `django`.

For SWT-Bench, open models are strong on `xarray`, and effectively tied on `matplotlib`, `astropy`, and `sympy`. Frontier is better on `sphinx`, `requests`, `pytest`, and slightly better on `django`.

For SWE-Bench Multimodal, open models are better on `react-pdf` in this slice, while frontier models are better on `marked`, `Chart.js`, and slightly better on `wp-calypso`. `wp-calypso` remains low for both groups.

## Practical Routing Policy

1. Default to a cheap open model for patch-style bug fixes with a test oracle.
   - Start with MiniMax-M2.7 or DeepSeek-V4-Pro for low-cost SWE-style repair.
   - Use Kimi-K2.6 when you want a more balanced open model across SWE/SWT/GAIA.

2. Use open-first plus closed fallback for terminal-heavy execution.
   - MiniMax-M2.7 and DeepSeek-V4-Pro are strong cost routes on SWT-Bench.
   - Escalate when the first attempt times out, produces a brittle patch, or fails tests after one repair cycle.

3. Use Kimi-K2.6 first for budget-sensitive research.
   - Escalate to GPT-5.5 for high-recall questions, ambiguous evidence, or any answer that will be published without human verification.

4. Use Opus 4.7 first for greenfield app/package implementation.
   - Commit0 has no open-only wins in this slice.
   - GLM-5.1 is nearly as expensive as Opus on Commit0 and much slower.

5. Use Opus 4.7 first for hard multimodal software issues.
   - Kimi-K2.6 is a good low-cost triage option.
   - Opus is still the best single model in the snapshot.

6. Do not treat closed fallback as magic.
   - Shared misses are material: 51 SWE-Bench, 7 Commit0, 8 GAIA, 38 SWT-Bench, and 60 SWE-Bench Multimodal instances are missed by both groups.
   - Some failures need harness changes, better retrieval, better environment setup, or human decomposition.

## Data Artifacts

- `openhands_snapshot.json` has benchmark-level scores, costs, runtimes, archive URLs, agent versions, and submission dates.
- `openhands_task_reports.json` has compact per-run report data extracted from OpenHands archives, including resolved/unresolved/incomplete instance IDs.
- `extract_openhands_reports.py` regenerates the compact report from `full_archive` URLs in the snapshot.

## Caveats

- The archive overlap analysis uses selected models, not every OpenHands result.
- Some model/benchmark rows have different OpenHands agent versions and submission dates.
- The union analysis answers "does any selected model in this group solve it?" That is useful for boundary mapping, but it is not the same as running one model once.
- The routing-cost examples assume you can identify failure and selectively escalate. In production, that requires a verifier, tests, or a human review gate.
- `cost_per_instance` is benchmark-run cost from OpenHands, not guaranteed production pricing.

## Sources

- OpenHands Index results repo: https://github.com/OpenHands/openhands-index-results
- GPT-5.5 OpenHands scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json
- Claude Opus 4.7 OpenHands scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json
- GLM-5.1 OpenHands scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json
- Kimi-K2.6 OpenHands scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json
- MiniMax-M2.7 OpenHands scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/MiniMax-M2.7/scores.json
- DeepSeek-V4-Pro OpenHands scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V4-Pro/scores.json
