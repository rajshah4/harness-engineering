# Workshop 3 preliminary result: stale context was worse than forgetting

## Slide-ready result

The no-guidance and curated-context agents both passed the external contract in
all three trials. The save-everything agent failed all three trials even though
it wrote many more tests and reported a green test suite.

| Median across 3 fresh trials | No saved guidance | Save everything | Curated context |
|---|---:|---:|---:|
| External verifier passes | **3/3** | **0/3** | **3/3** |
| Always-loaded context | 0 words | 620 words | 100 words |
| Initial provider input | 8,561 | 9,492 | 8,727 |
| Wall time | 141.0s | 195.8s | **126.0s** |
| Model calls | 17 | 19 | 17 |
| Non-tracker tool actions | **14** | 18 | 15 |
| Time to first useful action | **8.76s** | 12.94s | 10.39s |
| Fresh input across run | 26,905 | 29,388 | **25,033** |
| Cached input across run | 247,723 | 373,316 | 259,193 |
| Processed tokens | **283,362** | 413,895 | 291,380 |
| Output tokens | 8,296 | 11,191 | **7,154** |
| Full-suite runs in the trace | 0 | 4 | **1** |
| Test functions in final workspace | 15 | 25 | 14 |
| Changed production/test files | 2 | 3 | 2 |
| Changed diff size | 6,827 B | 13,545 B | **6,514 B** |

Ranges were:

- No guidance: 130.6 to 155.7 seconds, 16 to 18 model calls, 14 to
  15 non-tracker tool actions.
- Save everything: 164.2 to 236.4 seconds, 19 to 21 model calls, 18 to
  20 non-tracker tool actions.
- Curated context: 122.4 to 171.3 seconds, 15 to 17 model calls, 13 to
  15 non-tracker tool actions.

Compared with no guidance, save everything was 39% slower at the median, used
46% more processed tokens, took 27% longer to reach the first useful action,
and changed roughly twice as much code and test text. It still failed every
external verification.

Curated context did not create a clear token-efficiency win over no guidance.
Its processed-token median was 3% higher and the elapsed-time ranges overlap.
Its observable process advantage was narrower: all three curated runs obeyed
the requested focused-then-full verification sequence, while none of the bare
runs ran the full suite. Both conditions passed the external contract 3/3.

## What changed the outcome

The repository's accepted design record required `CursorPage` and
`paginate_cursor` to live in `toyapp.pagination`. The inherited context instead
claimed that cursor pagination belonged in `toyapp/cursor.py` and that all
public objects must be re-exported from `toyapp/__init__.py`.

Every save-everything run combined those stale placement instructions with the
current document's correct `v2:<offset>` token format. The agents created:

- `toyapp/cursor.py`;
- edits to `toyapp/__init__.py`;
- a new cursor test module containing 23 to 30 added tests.

Those self-authored suites passed. The independent verifier then failed every
run at the same gate: `CursorPage` was missing from `toyapp.pagination`.

This is stronger than a prompt-overhead example. The saved instruction changed
the architecture, the agent wrote tests that ratified its interpretation, and
green tests did not reveal the contract error.

## Recommended workshop reveal

Show three trace openings, then reveal correctness before cost:

1. **No guidance:** inspected the repository, found the current design, changed
   the two expected files, and passed 3/3. It skipped the requested full suite.
2. **Save everything:** searched for a nonexistent archived design, ran the
   suite repeatedly, created an extra module and package exports, wrote far
   more tests, and failed 0/3.
3. **Curated context:** followed the current design and proportional test
   sequence, changed the two expected files, and passed 3/3.

Suggested headline:

> Stale context was worse than forgetting.

Suggested debrief:

> Start with no saved context. Add a line only when it is verified, stable, and
> more valuable than rediscovery. Keep task state out of durable guidance, and
> verify important contracts outside the agent's own tests.

The result does not support “curated context always beats no context.” In this
task, the bare agent found the relevant evidence quickly and produced the same
verified outcome. Curated context mainly improved adherence to the intended
verification process. That narrower result is the useful policy.

## One-shot delivery decision

Use the save-everything trace as the live inspection because its failure
repeated identically in all three trials. Do not run a three-way stochastic
race in the room. Show saved result cards for the no-guidance and curated lanes.

Reveal the save-everything trace in this order:

1. the plausible inherited instructions;
2. the search for the missing archive;
3. the decision to create `toyapp/cursor.py`;
4. 25 to 32 total green tests;
5. the independent verifier failure;
6. the 46% processed-token and 39% elapsed-time penalties.

Ask participants which individual lines should be kept, moved to a scoped
skill, retrieved, enforced outside the model, or deleted. The lesson is context
placement and maintenance, not prompt shortening by itself.

## Method and caveats

- Task: add cursor pagination while preserving the existing page-number API
  and following the repository's current pagination design.
- Fixed: Claude Sonnet 4.6 at high reasoning, OpenHands Agent Server 1.42.1,
  identical prompt, starter tree, tools, permissions, timeout, and verifier.
- Changed variable: an always-loaded system-message suffix containing zero,
  620, or 100 words. Public, user, and project skills plus product memory were
  disabled in every lane.
- The headings identify the inherited text as `AGENTS.md`, skill, and memory
  content, but this experiment does not compare their product-specific loading
  mechanisms. It tests the effect of always supplying those contents.
- The stale context was deliberately planted and plausible. This makes a good
  causal teaching example, not an estimate of how often real context files are
  stale.
- Three same-day trials are preliminary evidence. They support the repeated
  failure mechanism, not population-level latency or accuracy claims.
- The verifier was outside the agent workspace. It checked the old API, the new
  public location and shape, cursor traversal, malformed tokens, versioning,
  bounds, and validation.
- Provider cost was absent from the common ledger and is not estimated.

## Evidence

- Raw result: `results/raw/generated/workshop3-context-20260905-context-placement.json`
- Provider ledger: `results/provider-ledgers/20260905-workshop3-context-ledger.jsonl`
- Complete traces: `results/traces/context-placement/workshop3-context-20260905-*.jsonl`
- Reproducible runner, contexts, starter, verifier, and calibrated reference:
  `experiments/context-placement/`
