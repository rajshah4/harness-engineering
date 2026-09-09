# Trace evidence for two teaching visuals

## Recommendation at a glance

- Use the real Agent Canvas event export below for the annotated-run visual. It has an explicit system prompt, user request, agent actions, environment observations, state updates, test evidence, and finish event.
- Do not present the proposed before/after compaction card as a captured workshop event. I found no literal compaction or condensation event in the saved Canvas exports. Label that visual **illustrative**, grounded in the P05 audit criteria.
- Use the Pi cache-control experiment as the measured harness-change example. It is a controlled same-model, same-task configuration intervention with provider-boundary measurements.

## Visual 1: annotated agent run

**Provenance:** actual Agent Canvas trace export.

**Source ID:** Canvas state `12a8c60aff3649e38189974722494a24`, run `20260824-aws-incident-v2-openhands`, task `incident-operations-center`, model `openhands/glm-5.2`.

**Source directory:** `/Users/rajiv.shah/Code/learn-openhands-harness/workshops/odsc-2026/evidence/harness-suite/canvas-state/20260824-aws/12a8c60aff3649e38189974722494a24/`

Suggested 7-beat condensed trace:

| Beat | Actor shown | Real event and usable excerpt | Teaching annotation |
|---|---|---|---|
| 1 | Harness | `event-00000-8f00fd21-f5da-42e6-b83c-400c02c6a1e6.json`, `SystemPromptEvent`, source `agent` | The harness assembles instructions, available tools, and policies before the model acts. Do not quote the full system prompt on the slide. |
| 2 | User | `event-00001-9cfdad13-4fe8-4594-863b-04d08b8fda27.json`, `MessageEvent`, source `user`: "Turn [the in-memory app] into a durable incident-operations system... Preserve the existing in-memory API and regression tests. Do not add third-party runtime dependencies." | The user supplies the goal and constraints. This is the task, not an implementation plan. |
| 3 | Harness | `event-00003-ce55a628-00c8-4643-8085-f02d42f62f10.json`, `ConversationStateUpdateEvent`, source `environment`, key `execution_status` | The harness owns run state and lifecycle. |
| 4 | Model | `event-00004-ba656981-336e-4c2a-89aa-c92cf5371948.json`, `ActionEvent`, source `agent`, tool `terminal`, summary `List repository files` | The model chooses the next action and supplies tool arguments. |
| 5 | Harness/tool | `event-00005-d329cce2-e628-4292-ac44-d9564add2fc9.json`, `ObservationEvent`, source `environment`, tool `terminal`, exit code `0`: returns `incident_ops/web.py`, `cli.py`, `memory_store.py`, `models.py`, `service.py`, static assets, tests, and `pyproject.toml`. | The harness executes the tool and returns bounded evidence. The model does not directly read the filesystem. |
| 6 | Model then harness/tool | `event-00121-04b6afb2-f16b-4676-a176-8251ed64ab38.json`, `ActionEvent`, source `agent`, summary `Re-run full test suite`; followed by `event-00122-a44f4b92-0d14-492f-895c-6120affa0a27.json`, `ObservationEvent`, source `environment`: `41 passed in 11.14s`. | The model requests verification. The harness executes it and supplies the measured result. |
| 7 | Model and harness | `event-00286-1844914d-9171-40bc-85b9-b7ee08eaa38e.json`, agent `FinishAction`, summary `Durable incident-ops system complete; all 41 tests + CLI/concurrency/browser checks pass`; then `event-00287-bce61195-862d-40ae-b943-df64b95626b6.json`, environment `FinishObservation`. | The model proposes completion; the harness records the terminal action/result. The user remains the final judge of whether the outcome is acceptable. |

This may be captioned **"Condensed from a real Agent Canvas trace"**. It should not be captioned as a screenshot because it is a designed reduction of JSON events.

The adjacent course text supports the responsibility split: `/Users/rajiv.shah/Code/learn-openhands-harness/README.md` calls the trace a chronological record of messages, tool calls, results, compaction, and confirmations; `/Users/rajiv.shah/Code/learn-openhands-harness/02-harness-tour.md` describes the model deciding to call a tool and the trace showing the resulting action and observation. These are course explanations, not separate run evidence.

## Visual 2: before and after compaction

**Provenance:** illustrative teaching visual, not an observed compaction from the saved workshop runs.

I inventoried the saved Canvas event kinds under `workshops/odsc-2026/evidence/harness-suite/canvas-state/20260824-aws`. They include system prompts, messages, actions, observations, state updates, errors, interrupts, and finish events. No event kind identified a literal compaction or condensation artifact. Several stats events contain a `condenser` metrics bucket, but that bucket is not a compaction summary and must not be presented as one.

The correct grounding is P05:

- `/Users/rajiv.shah/Code/learn-openhands-harness/projects/p05-memory/README.md`: "If compaction fires, open the synthetic summary event and check what it kept versus discarded."
- `/Users/rajiv.shah/Code/learn-openhands-harness/projects/p05-memory/solution/README.md`: audit whether compaction preserved the right facts; compare against the raw trace.
- `/Users/rajiv.shah/Code/learn-openhands-harness/projects/p05-memory/solution/condenser_notes.md`: the observation fields are intentionally blank (`[what?]`), confirming this is an exercise template, not measured evidence.

Safe visual copy:

> BEFORE: full request + discoveries + failed paths + tool output + current work
>
> AFTER: goal + constraints + verified evidence + current state + next action

Label it **"Illustrative compaction contract"**. Do not attach numeric token counts, compression percentages, or claims that the workshop captured this exact summary.

## Measured harness change: Pi cache control

**Provenance:** controlled experiment summary backed by provider-boundary ledgers and raw run records.

**Primary source:** `../../../../harness-benchmark/results/incident-sonnet-harness-comparison.md`

**Raw sources:** 

- `../../../../harness-benchmark/results/raw/reruns/20260824-aws-incident-sonnet-v1-pi.json`
- `../../../../harness-benchmark/results/raw/reruns/20260824-aws-incident-sonnet-v2-pi-cache-enabled.json`
- `../../../../harness-benchmark/results/provider-ledgers/20260824-aws-incident-sonnet-pi-cache-comparison-ledger.jsonl`

Intervention and outcome:

| | Pi default | Pi with `cacheControlFormat: "anthropic"` |
|---|---:|---:|
| Same model and task | Claude Sonnet 4.5, Incident Operations Center | Claude Sonnet 4.5, Incident Operations Center |
| Model calls | 89 | 89 |
| Tool actions | 88 | 88 |
| Provider input | 3,351,630 | 3,841,953 |
| Cache reads | 0 | 3,628,953 |
| Fresh input | 3,351,630 | 213,000 |
| Cache rate | 0.0% | 94.5% |
| External checks | 7/8 | 6/8 |

The calibration also changed from no cache markers and zero returned cache reads to positive reads on turns two and three. This is a clean harness-interface lesson: the configuration change fixed the provider caching contract and reduced fresh input by about 94%, but it did not shorten the loop or improve correctness. Do not claim caching caused the 6/8 quality result or the longer elapsed time; the source explicitly treats those as independent trajectory variation.

Suggested failure/change/rerun phrasing:

1. **Failure:** Pi + Sonnet sent no `cache_control` markers; every successful provider response reported `cached_tokens: 0`.
2. **Harness change:** add Pi's documented `cacheControlFormat: "anthropic"` compatibility option.
3. **Rerun:** same long task, same model, and the same 89 calls. Cache reads reached 3,628,953 tokens (94.5%); fresh input fell to 213,000. Quality did not improve.

## Secondary measured interface example

`/Users/rajiv.shah/Code/learn-openhands-harness/workshops/odsc-2026/evidence/harness-suite/20260709-api-vs-mcp-experiment.md` is an observed study summary, not a single clean intervention pair. It records an API path that initially failed because delegated secrets were sent as plain strings. Changing the low-level payload to tagged `StaticSecret` objects produced HTTP 201, exposed the keys in the delegated terminal environment, and enabled a successful Linear query. This is useful for a typed-interface or error-recovery slide, but the Pi cache-control experiment is the cleaner before/after measurement.

## P01 warmup status

The exact warmup prompt exists in `/Users/rajiv.shah/Code/learn-openhands-harness/02-harness-tour.md`: find every place `VITE_BACKEND_HOST` and `VITE_BACKEND_BASE_URL` are read or set, explain the difference, and report which is correct for local development. I did not find a saved event-by-event Canvas export for that run. Treat the prompt as a workshop exercise, not as an actual captured trace. The incident trace above is the strongest local real-run substitute.
