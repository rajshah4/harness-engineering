# Workshop 1: recorded results and usage

October 3, 2026. Same DeepSeek V4.1 Flash model and classroom prompt. One run per harness. No new runs.

| Harness | Focused tests | External check | Time | Tool requests | Full run tokens |
| --- | --- | --- | --- | --- | --- |
| OpenHands | 3 / 3 | PASS | 18.1 s | 3 | 38,016 |
| Pi | 3 / 3 | PASS | 22.0 s | 9 | Not captured |
| OpenCode | 3 / 3 | PASS | 16.1 s | 5 | Partial receipt only |

All three changed only toyapp/pagination.py and preserved the tests. Time is send-click to the last recorded conversation event. It excludes the separate external verification. A single run cannot establish a speed ranking.

Tool requests count distinct recorded actions. Pi and OpenCode pending/completed ACP updates are counted once by tool_call_id. OpenHands has three ActionEvents. Commands bundled in one request can perform several operations, so these counts do not measure equal work.

## Token accounting

OpenHands has four cumulative usage updates. The final receipt reports 37,158 prompt tokens and 858 completion tokens, for 38,016 total. It separately reports 30,720 cache-read tokens within the prompt total. Do not add cached input again. Fresh input is 6,438 tokens. Reasoning tokens are not added separately to the total.

Pi's final recorded usage fields are all zero despite nine tool actions. Treat usage as unavailable, not as a zero-token run.

OpenCode's single receipt reports 291 prompt tokens, 93 completion tokens, and 9,088 cache-read tokens. The available events do not establish a complete cumulative run total or a common accounting convention with OpenHands. The slide therefore labels it as a partial receipt instead of comparing a guessed total.

All three report accumulated cost as zero. That is not usable evidence of a free run or a cost winner. A comparable cost chart needs complete provider receipts for all three runs.

The [extracted fields and event IDs](workshop1-recorded-metrics.json) identify the local event files. [Recording provenance](workshop-screenshot-provenance.json) contains the exact prompt, timing, and verifier result. [Recorded actions](workshop-inspection-evidence.html) show the differences in inspection.

## Next rerun: capture full-run token usage

Capture run tokens for OpenHands, Pi, and OpenCode. Usage should be available in the traces; locate the usage events and confirm whether each receipt describes one model call or the whole run. Save the complete trace and the final usage receipt before preparing the results table.

Record total input, output, cache-read, and cache-write tokens, along with the conversation ID and receipt event IDs. Confirm whether cached input is included in the input total before calculating run tokens. Sum per-call receipts only when they are not cumulative, and count each model call once.

Replace the missing Pi and incomplete OpenCode totals with verified full-run totals after the rerun.
