# Same model, different coding harnesses

Date: 2026-08-24
Run prefix: `20260824-aws-provider-v1`
Status: complete, all 24 runs passed on the first attempt

## What we learned

Pi used the fewest tokens, cost the least, and finished fastest across the eight tasks. OpenCode came next. OpenHands used the most tokens and took the most time. All three still produced correct results on every task.

Why did OpenHands use more tokens? There are two possible reasons. An agent can call the model more often, or it can send more context with each call. Context includes the system instructions, tool definitions, the task, conversation history, and results from earlier tool calls.

The second reason showed up on almost every task. Pi sent about 6,700 input tokens per model call. OpenCode sent about 12,300. OpenHands sent about 26,800. So OpenHands usually gave the model about four times as much context as Pi at every step.

OpenHands did not always take more steps. If I remove the hardest caching task, OpenHands made 67 model calls and Pi made 68. Their step counts were basically identical, but OpenHands still used 3.81 times as many input tokens.

The hardest caching task was different. OpenHands made 46 model calls while Pi and OpenCode each made 17. OpenHands also sent almost three times as much context on every call. Those two differences compounded, which is why OpenHands used 1.63 million input tokens while Pi used 206,000.

This gives us a much simpler explanation:

> OpenHands usually uses more tokens because it sends the model more information on every step. On some difficult tasks, it also takes more steps.

The harness rankings also changed by task. Pi was slowest on the rate-limiter task even though it used the fewest tokens. OpenHands was fastest on the CLI task. There is no single harness that wins every type of work.

## The overall results

Every harness used GLM-5.2 and started from a clean copy of the same task. Each harness passed all eight tasks on its first attempt. The table shows the totals across those eight tasks.

| Harness | Tasks passed | Model calls | Context tokens sent | New input tokens | Context per call | Total time | Cost reported by provider |
|---|---:|---:|---:|---:|---:|---:|---:|
| Pi | 8/8 | 85 | 573,137 | 97,233 | 6,743 | 678.0 s | $0.3345 |
| OpenCode | 8/8 | 100 | 1,233,824 | 144,352 | 12,338 | 838.6 s | $0.5711 |
| OpenHands | 8/8 | 113 | 3,028,731 | 253,627 | 26,803 | 1,140.8 s | $1.2489 |

Compared with Pi, OpenHands used 5.28 times as many input tokens and cost 3.73 times as much. It took 1.68 times as long. OpenCode used 2.15 times as many input tokens as Pi, cost 1.71 times as much, and took 1.24 times as long.

The token totals come from the provider responses, not estimates from the agent interfaces. The measurement system captured all 298 model calls without missing usage records or provider errors.

## Task-by-task model calls and elapsed time

| Task | OpenHands calls | Pi calls | OpenCode calls | OpenHands time | Pi time | OpenCode time |
|---|---:|---:|---:|---:|---:|---:|
| Tiny rename | 8 | 13 | 9 | 47.1 s | 55.0 s | 39.2 s |
| CLI feature | 9 | 6 | 10 | 28.5 s | 35.1 s | 55.6 s |
| Pagination repair | 6 | 6 | 8 | 23.2 s | 16.1 s | 30.2 s |
| Report refactor | 12 | 12 | 18 | 151.3 s | 54.9 s | 226.3 s |
| Async race | 8 | 10 | 10 | 78.7 s | 87.4 s | 51.3 s |
| Security review | 14 | 10 | 14 | 204.7 s | 131.1 s | 194.8 s |
| Concurrent cache | 46 | 17 | 17 | 554.4 s | 192.9 s | 194.6 s |
| Rate limiter | 10 | 11 | 14 | 53.0 s | 105.6 s | 46.6 s |

## Context sent for each task

| Task | OpenHands | Pi | OpenCode | OpenHands / Pi |
|---|---:|---:|---:|---:|
| Tiny rename | 141,713 | 75,657 | 74,236 | 1.87x |
| CLI feature | 162,132 | 20,828 | 78,490 | 7.78x |
| Pagination repair | 109,106 | 18,242 | 65,749 | 5.98x |
| Report refactor | 329,811 | 78,310 | 352,536 | 4.21x |
| Async race | 150,789 | 57,756 | 83,571 | 2.61x |
| Security review | 303,222 | 58,307 | 179,719 | 5.20x |
| Concurrent cache | 1,629,342 | 205,797 | 277,059 | 7.92x |
| Rate limiter | 202,616 | 58,240 | 122,464 | 3.48x |

## Why OpenHands used more tokens

### More context on every call

OpenHands averaged 3.98 times Pi's input tokens per call. This was the most consistent difference in the experiment. Even without the caching task, OpenHands and Pi made almost the same number of calls, but OpenHands still sent 3.87 times as much context on each call.

We cannot say exactly which part accounts for those extra tokens. The measurement system records how much context was sent, but it does not save the prompt contents. The difference could come from longer system instructions, more tool definitions, more conversation history, larger tool results, or some combination of them.

We do know how many tools each harness described to the model. OpenHands sent 22 tool definitions on each call, OpenCode sent 10 on its main agent calls, and Pi sent 4. This probably explains some of the difference, but this experiment does not tell us how many tokens came from the tools alone.

### More calls on some hard tasks

OpenHands made 46 model calls on the concurrent-cache task. Pi made 17. OpenHands also sent 2.93 times as much context with each call. Together, those differences produced 7.92 times as many input tokens.

The rate-limiter task went the other way. OpenHands made 10 calls and Pi made 11, but OpenHands still used 3.48 times as many input tokens. More calls cannot explain that result. The amount of context sent with each call can.

So the number of calls explains the big spike on the caching task. The amount of context per call explains the difference across the full suite.

### A model call is not a tool action

The provider recorded every time a harness called GLM-5.2. Agent Canvas separately recorded actions such as reading a file, editing code, or running a test. One model response can request several actions, and a harness can call the model without using a tool. That is why OpenCode made 100 model calls but performed 112 tool actions. We should show these as two different measurements.

### Caching made the repeated context cheaper

The provider reused a large share of the context instead of processing every token from scratch:

- OpenHands: 2,775,104 cached input tokens, 91.6 percent
- OpenCode: 1,089,472 cached input tokens, 88.3 percent
- Pi: 475,904 cached input tokens, 83.0 percent

OpenHands had the highest cache percentage, but it also sent far more context. Caching reduced the bill, but it did not erase the difference. OpenHands still sent 2.61 times as many new input tokens as Pi.

This also resolves the earlier OpenHands result that showed zero cache reads. The provider measured a 91.6 percent cache-read rate for OpenHands in this clean run. The zero came from missing OpenHands reporting, not from a lack of provider caching.

## How I would use this in the workshop

This makes a good opening exercise because all three harnesses use the same model and all three get the right answer. They still take different paths and incur different costs.

I would ask participants to predict the winner on correctness, time, model calls, token use, and cost. Then I would reveal the traces and focus the discussion on three questions:

1. How many times did each harness call the model?
2. How much context did it send on each call?
3. Did using fewer tokens make it faster or more accurate on this task?

I would show the concurrent-cache task first because the differences are obvious. Then I would show the rate-limiter task, where Pi used the fewest tokens but finished last. Those two examples make it hard to leave with an overly simple ranking.

## How we ran the test

We ran the suite on a temporary, clean AWS instance with no inherited MCP tools or earlier conversations. Every harness used GLM-5.2, received the same task, and worked in its own copy of the repository. We rotated the harness order across tasks so one harness did not always run first.

The environment used Agent Canvas 1.15.0, OpenHands Agent Server 1.42.1, Pi 0.80.6 with `pi-acp` 0.0.31, and OpenCode 1.18.21. We allowed no repair rounds. The provider ledger saved response IDs, token usage, cache reads, cost, request metadata, task hashes, and verifier hashes.

Codex was not run on this instance. Codex requires separate authentication and uses a different model, so it should appear as a separate control rather than as another row in this same-model comparison.

## What this test does not tell us

We ran each task once per harness. That is enough to find large differences, but not enough to measure normal variation between runs. Passing a verifier also tells us that the required behavior worked. It does not prove that all three implementations were equally maintainable.

Before publishing a final leaderboard, I would repeat the concurrent-cache, rate-limiter, report-refactor, and async-race tasks at least three times. Codex can then be added as a separate control after explicit authentication.

## Evidence and reproduction

- Raw provider ledger: `ledgers/20260824-aws-provider-ledger.jsonl`
- Per-cell run records: `runs/20260824-aws-provider-v1-*.json`
- Reproducible analyzer: `../../experiments/harness-suite/analyze_aws_provider_suite.py`
- Suite definition: `../../experiments/harness-suite/suite.json`
- Measurement protocol: `../../experiments/harness-suite/MEASUREMENT-PROTOCOL.md`

The copied ledger SHA-256 is `1787aa0dc55a4342503b34a940f0e175b9adff7a03f63086df18313965a1945e`, matching the source file on the temporary AWS instance.
