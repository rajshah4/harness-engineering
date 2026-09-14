# Sonnet 4.6 Completion-Loop App Experiment

## Result

On one full-stack Incident Operations Center campaign per condition, native OpenHands and the OpenHands completion system both passed all eight instructor checks. Pi stopped sooner and used far fewer tokens, but missed process-safe alert deduplication and a visible browser feedback state.

The completion system did not improve measured quality over native OpenHands in this trial because the native single agent already saturated the verifier. It added independent validation confidence at 1.21x the wall time and 1.67x the provider tokens.

| Condition | Quality | Wall time | Provider requests | Successful usage receipts | Provider tokens | Fresh input | Output |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| OpenHands single | 8/8 | 20m 21s | 48 | 48 | 4,104,915 | 144,619 | 122,692 |
| Pi single | 6/8 | 13m 24s | 40 | 40 | 1,605,440 | 156,555 | 54,047 |
| OpenHands system | 8/8 | 24m 41s | 90 | 88 | 6,840,109 | 201,002 | 82,132 |

`Provider tokens` is the sum of provider-reported input and output tokens. Cached input remains part of provider input; fresh input is shown separately. The two unsuccessful system requests were HTTP 503 responses with no output or usage and are not represented as zero-token successful calls.

## Controlled setup

- AWS EC2 instance `i-06fff4bb07797d5e0`, `t3.xlarge`
- Agent Canvas 1.15.0
- OpenHands Agent Server and SDK 1.42.1
- OpenHands hosted LLM provider
- model request: `claude-sonnet-4-6`
- request parameters: `max_completion_tokens: 64000`, `reasoning_effort: high`
- OpenHands sub-agents disabled in every single role
- Vasco's explicit 11-skill default allow-list, sourced from OpenHands PR #16860
- identical committed starter tree and instructor verifier
- one campaign per cell; cells run sequentially to avoid host contention

The final calibration made three calls from each harness and failed closed unless every request had the expected model, identical request parameters, a unique provider response ID, raw usage, no provider error, and exactly the same 11 serialized skills.

## Condition details

### OpenHands single

Native OpenHands passed 8/8 on its first attempt in 1,220.964 seconds. It made 48 model calls and 54 tool calls, changing 14 files with 2,950 additions and 85 deletions relative to the controller's root baseline commit.

The candidate covered durable storage, concurrency, escalation, CLI, HTTP, frontend behavior, and added focused tests. It committed its work; result finalization therefore compares against the root baseline commit rather than the moving `HEAD`.

### Pi single

Pi stopped after 804.097 seconds and 40 model calls. It passed 6/8 checks while using 39% of native OpenHands' provider tokens and 66% of its wall time.

The two failures were material completion gaps:

- Concurrent ingestion produced eight incidents instead of one, so deduplication was not process-safe.
- The browser contract's `feedback` element remained hidden; Playwright timed out waiting for it to become visible.

This is a clean example of the tradeoff the workshop is meant to expose: Pi's smaller tool/context loop was much cheaper, but it stopped with a concurrency defect and an unexercised UI state.

### OpenHands system

The system's implementer passed 8/8 before receiving any validator feedback. The validator independently inspected a snapshot, reported zero blocking findings, and recommended `STOP`. The orchestrator also chose `STOP`, so the system used one validation round and no implementation repair round.

| Role | Requests | Successful receipts | Provider tokens | Elapsed |
| --- | ---: | ---: | ---: | ---: |
| Implementer | 66 | 64 | 6,032,210 | 19m 57s |
| Validator | 19 | 19 | 734,798 | 3m 42s |
| Orchestrator | 5 | 5 | 73,101 | 42s |

Validator and orchestrator work accounted for 807,899 tokens, or 11.8% of total system tokens. The system implementer's own run was also larger than the native single run, which shows why one campaign per cell cannot separate orchestration cost from ordinary run-to-run variance.

The implementer encountered two HTTP 503 responses. Both are retained as reliability incidents. All 88 successful responses have provider usage receipts, so the accounting result is publishable.

## Interpretation

The Factory result is best understood as a completion-standard intervention, not a generic claim that additional agents improve software. Their validator constructs an independent instrument, the implementer cannot target its raw cases, and an orchestrator—not deterministic lifecycle code—decides when to ship.

This experiment reproduced those role boundaries at product-app scale, but the first task was saturated by native OpenHands. The system therefore demonstrated independent confirmation rather than a quality lift. That is still useful workshop learning:

1. Harness differences were large under an identical model and provider request.
2. Faster stopping was cheaper but missed two end-to-end requirements.
3. Multi-role validation has a measurable cost even when it requests no repair.
4. A completion system needs unsaturated tasks to demonstrate improvement.
5. One run cannot distinguish a role effect from implementer-run variance.

## Measurement lessons caught before the accepted run

The preflight invalidated setup attempts rather than quietly publishing them:

- a native profile inherited enabled sub-agents, invalidating a single-agent label;
- native OpenHands sent `reasoning_effort: high` while Pi initially omitted it;
- the first ledger proxy buffered SSE responses, changing downstream timeout behavior;
- an incomplete provider stream lacked trustworthy usage;
- committed candidate changes appeared as a zero diff when compared only with `HEAD`.

The live provider ledger now relays SSE chunks immediately, retains only content-free metadata, preserves raw usage, compares provider request parameters across harnesses, and computes candidate diffs from the controller-created root commit.

## Workshop recommendation

This is a good workshop exercise if presented as an investigation rather than a leaderboard. The strongest teaching sequence is:

1. Ask participants to predict which condition will finish first and which will be most complete.
2. Show the provider calibration gate before showing outcomes.
3. Compare Pi's 6/8 result with native OpenHands' 8/8 and inspect the two missed product behaviors.
4. Reveal that the system also scored 8/8, then discuss why more agents did not improve a saturated cell.
5. Inspect the validator and orchestrator receipts to make the cost of confidence concrete.
6. End by designing a repeated, unsaturated follow-up rather than declaring a winner.

The next experiment should use at least three attempts per cell with randomized order and either a harder app or a weaker public completion signal. Add a compute-matched native OpenHands control to distinguish “independent stopping discipline” from “more total work.”

## Evidence

- Final sanitized result: [`raw/generated/completion-sonnet46-20260828-e.json`](raw/generated/completion-sonnet46-20260828-e.json)
- Provider-boundary ledger: [`provider-ledgers/20260828-completion-sonnet46-v3-ledger.jsonl`](provider-ledgers/20260828-completion-sonnet46-v3-ledger.jsonl)
- Final calibration: [`calibration/completion-sonnet46-calibration6-20260828.json`](calibration/completion-sonnet46-calibration6-20260828.json)
- Candidate artifacts: [`artifacts/completion-sonnet46-20260828-e/`](artifacts/completion-sonnet46-20260828-e/)
- Experiment design: [`../FACTORY_COMPLETION_EXPERIMENT.md`](../FACTORY_COMPLETION_EXPERIMENT.md)
- Factory article: <https://factory.ai/news/what-it-takes-for-coding-agents-to-complete-large-software-tasks>
