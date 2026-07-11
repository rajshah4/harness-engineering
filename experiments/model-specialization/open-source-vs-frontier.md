# Open-Weight Challengers vs Opus and GPT-5.5

Snapshot date: 2026-05-22.

This analysis uses the OpenHands Index results repo as the task-grounded source of truth for agentic software work. The comparison treats GPT-5.5 and Claude Opus 4.7 as frontier baselines, then compares the strongest open-weight challengers visible in the current OpenHands results.

For the deeper routing analysis with cost and per-instance overlap, see `open-model-routing-boundary.md`.

## Headline

GLM-5.1 and Kimi-K2.6 are the strongest open-weight challengers in this slice, but they do not erase the frontier gap across the full task mix. On the five OpenHands benchmarks with full coverage, Claude Opus 4.7 averages 68.2 and GPT-5.5 averages 65.9. GLM-5.1 averages 58.2 and Kimi-K2.6 averages 57.1.

The open-weight story is task-specific. MiniMax-M2.7 and GLM-5.1 are competitive on SWE-Bench bug fixing, and GLM-5.1/Kimi-K2.6 beat GPT-5.5 on SWE-Bench Multimodal. The largest gaps remain app building, research, and terminal-heavy work, where the frontier baselines are still materially ahead.

## Comparison Table

Scores are OpenHands percentages. A dash means the model has no checked-in result for that benchmark.

| Model | Type | SWE-Bench | Commit0 | GAIA | SWT-Bench | SWE-Bench Multimodal | Mean | Coverage |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Claude Opus 4.7 | Frontier baseline | 74.2 | 56.2 | 81.2 | 80.8 | 48.5 | 68.2 | 5/5 |
| GPT-5.5 | Frontier baseline | 78.2 | 43.8 | 86.1 | 83.4 | 38.2 | 65.9 | 5/5 |
| GLM-5.1 | Open-weight | 75.0 | 37.5 | 67.3 | 70.2 | 41.2 | 58.2 | 5/5 |
| Kimi-K2.6 | Open-weight | 74.6 | 25.0 | 74.5 | 70.4 | 41.2 | 57.1 | 5/5 |
| DeepSeek-V4-Pro | Open-weight, partial | 73.2 | 12.5 | - | 68.1 | - | 51.3 | 3/5 |
| DeepSeek-V3.2-Reasoner | Open-weight | 71.6 | 25.0 | 50.3 | 53.6 | 27.9 | 45.7 | 5/5 |
| Qwen3-Coder-Next | Open-weight, partial | 66.6 | 25.0 | 50.9 | - | 30.9 | 43.4 | 4/5 |
| MiniMax-M2.7 | Open-weight/license caveat | 75.6 | 18.8 | 25.5 | 69.1 | 27.9 | 43.4 | 5/5 |
| Nemotron-3-Super | Open-weight | 62.0 | 12.5 | 40.0 | 45.7 | 20.6 | 36.2 | 5/5 |
| Qwen3-Coder-480B | Open-weight | 62.4 | 0.0 | 33.9 | 34.9 | 23.5 | 30.9 | 5/5 |

## Task Takeaways

- Bug fixing: GPT-5.5 leads at 78.2. The best open-weight result is MiniMax-M2.7 at 75.6, followed by GLM-5.1 at 75.0 and Kimi-K2.6 at 74.6. This is the narrowest open-vs-frontier gap.
- App building: Opus 4.7 leads at 56.2, while GPT-5.5 is 43.8. GLM-5.1 is the best open-weight challenger at 37.5. Commit0 is the biggest practical gap for open models in this set.
- Research: GPT-5.5 leads at 86.1 and Opus 4.7 scores 81.2. Kimi-K2.6 is the best open-weight challenger at 74.5.
- Terminal work: GPT-5.5 leads at 83.4 and Opus 4.7 scores 80.8. Kimi-K2.6 and GLM-5.1 cluster near 70, which is good but not yet frontier-equivalent.
- Multimodal software work: Opus 4.7 leads at 48.5. GLM-5.1 and Kimi-K2.6 score 41.2, ahead of GPT-5.5's 38.2.

## Practical Read

If the constraint is open weights, GLM-5.1 is the best default starting point in this OpenHands slice because it has full coverage and the strongest open-weight mean. Kimi-K2.6 is close behind and looks stronger on GAIA and SWT-Bench than GLM-5.1. MiniMax-M2.7 is a narrow SWE-Bench specialist, not a balanced agentic-coding choice. DeepSeek-V4-Pro is promising on SWE-Bench and SWT-Bench, but the missing GAIA and multimodal rows make it hard to treat as a full replacement.

For a harness talk or paper, the cleaner claim is not "open source has caught Opus/GPT-5.5." It is: open-weight models are now close on patch-style bug fixing and sometimes competitive on multimodal software tasks, but the closed frontier baselines still lead the broader agent workload mix.

## Caveats

- OpenHands runs are harness-sensitive. They measure model plus OpenHands agent behavior, not a context-free property of the raw model.
- Submission dates span January 2026 through May 2026, and agent versions differ by row.
- The term open source is messy for model releases. This note uses open-weight where weights are public, and flags MiniMax-M2.7 because license terms may be more restrictive than conventional open source.
- Missing benchmark rows are left blank and are not treated as zero.
- The mean column is a simple arithmetic mean across available OpenHands scores, not a statistically validated aggregate.

## Sources

- OpenHands Index results repo: https://github.com/OpenHands/openhands-index-results
- GPT-5.5 scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json
- Claude Opus 4.7 scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json
- GLM-5.1 scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json
- Kimi-K2.6 scores: https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json
- GLM-5.1 release/license context: https://www.computerworld.com/article/4155606/z-ai-unveils-glm-5-1-enabling-ai-coding-agents-to-run-autonomously-for-hours.html
- DeepSeek V3.2 model-card license note: https://fe-static.deepseek.com/chat/transparency/deepseek-v3.2-model-card-0414-EN.pdf
- DeepSeek V4-Pro model card: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
- Kimi K2.6 model page: https://www.kimi.com/ai-models/kimi-k2-6
- MiniMax M2.7 model card: https://huggingface.co/MiniMaxAI/MiniMax-M2.7
- Qwen3-Coder-Next technical report: https://arxiv.org/abs/2603.00729
- NVIDIA Nemotron 3 Super page: https://research.nvidia.com/labs/nemotron/Nemotron-3-Super/
