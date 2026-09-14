# The browser tool and token usage

This note explains a large share of the token, time, and correctness differences
across the harness comparisons in this repository. It is the deeper companion
to the front-page summary in [`README.md`](../README.md#the-browser-tool-and-token-usage).

## Why this matters

The central experiment holds the model, task, starting files, machine, and
verifier constant and varies the harness. On the full-stack Incident Operations
Center project, OpenHands used roughly **2.5x to 4x** as many input tokens as
OpenCode on the same model (GLM-5.2) and the same task. A common hypothesis is
that harnesses differ because the model is being "used better" or "used worse."
The traces show a more concrete and more boring reason: one harness shipped a
14-function browser toolset in every prompt and the other did not, and the
browser itself was unreliable once launched.

## The four conditions, side by side

All rows are the Incident Operations Center project. Token figures come from
the provider ledger; the trace figures come from the sanitized Agent Canvas
event streams in [`results/traces/`](traces/).

| Condition | Model | Declared tools | Browser tools | Browser actions | Input tokens | Time |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| OpenHands, original | GLM-5.2 | 22 | 15 | 17 (mostly failing) | 6.76M | ~26.7 min |
| OpenHands, rerun | GLM-5.2 | 23 | 15 | 16 (mostly failing) | 10.20M | ~17.4 min |
| OpenHands | Sonnet 4.5 | 21 | 14 | 0 (never invoked) | 4.26M | ~12.4 min |
| OpenCode | GLM-5.2 | ~5 | 0 | 0 | 2.75M | ~17.7 min |
| OpenHands, current-main | GLM-5.2 | 9 | 0 | 0 (tool removed) | see ledger | ~8.6 min |

Two things to read out of this table:

1. **The browser toolset is declared in every OpenHands turn whether or not it
   is used.** Under Sonnet the browser was never invoked, yet all 14 browser
   tool schemas sat in every one of the 66 model calls. The prompt overhead is
   paid even when the capability is not exercised.
2. **OpenCode never declared a browser at all.** Its toolset is `bash`, `edit`,
   `read`, `write`, and `todowrite`. The 14-tool browser schema overhead that
   sits in every OpenHands turn is simply absent from every OpenCode turn. That
   structural difference, more than any model-quality difference, is where a
   large part of the 2.75M vs 6.76M input-token gap on the same model comes
   from.

## GLM-5.2, originally: the browser is declared and then fights the agent

The original OpenHands + GLM-5.2 run
([`20260824-aws-incident-v2-openhands.jsonl`](traces/20260824-aws-incident-v2-openhands.jsonl))
is the clearest case of the browser being a net cost.

- The task requires "a useful browser interface" and hidden frontend checks, so
  the agent reaches for the browser near the end of the run (~19 minutes in,
  after the SQLite store, API, workers, and audit layer were already built).
- The first `BrowserNavigateAction` timed out: the event stream shows
  `Event handler ... on_BrowserStartEvent ... timed out after 30.0s`. The
  cold start of headless Chromium exceeded the watchdog.
- Subsequent navigations loaded the page, but `browser_get_state` and
  `browser_get_content` failed with
  `Expected at least one handler to return a non-None result, but none did!`
  and `Could not extract clean markdown: AssertionError`.
- The agent's own thoughts document the struggle: *"The browser is having
  issues. Let me try a fresh navigation,"* *"The browser tool is consistently
  failing. Let me try with a page reset,"* and eventually a fallback to
  `node + jsdom`.

Across the run, the browser consumed 17 actions and roughly 335 seconds
(~21 percent of wall-clock), most of it failing against the tool rather than
against the application. The run still passed specified behavior, but at
6.76M input tokens and ~26.7 minutes it was the most expensive cell in the
comparison.

## Sonnet 4.5: the browser is declared but never used, and a frontend defect slips through

Holding the harness fixed and switching the model to Sonnet
([`20260824-aws-incident-rerun-v1-openhands-sonnet.jsonl`](traces/20260824-aws-incident-rerun-v1-openhands-sonnet.jsonl))
isolates the model from the harness. The result is sharp.

- **Zero browser actions.** All 14 browser tool schemas were still declared on
  every turn (identical prompt overhead to the GLM runs), but Sonnet never
  called into them.
- Sonnet verified the frontend with `curl | grep -o 'data-testid="[^"]*"' |
  sort -u` against the running server: a **presence** check ("are there any
  testids?") rather than a **completeness** check.
- The run finished in 66 calls and ~12.4 minutes with 4.26M input tokens,
  roughly half the GLM run's calls and tokens.
- It missed one hidden check: the generated JavaScript declared
  `acknowledgeBtn` and `resolveBtn` twice with `const` inside the same
  function. The syntax error stopped the page script, so the summary never
  rendered. A real browser load would have surfaced this immediately; a
  presence check against `data-testid` cannot, because the markers exist in
  the static HTML regardless of whether the script throws.

The trade-off is visible in the trace: Sonnet paid the browser's prompt
overhead on all 66 turns and got none of its capability, then lost the one
check the browser would have caught.

## OpenCode: no browser, per-marker completeness checks, 8/8

OpenCode
([`20260824-aws-incident-v2-opencode.jsonl`](traces/20260824-aws-incident-v2-opencode.jsonl))
is the reference for "do the same verification without a browser, and do it
more rigorously."

- OpenCode is an ACP harness whose toolset is `bash`, `edit`, `read`, `write`,
  and `todowrite`. No browser tool is ever declared. Every one of its model
  calls carries roughly five tool schemas, not twenty-two.
- Its frontend verification is a single inline `python -c` block that spins
  up the application's own `create_server` on an ephemeral port, fetches `/`,
  `/app.js`, and `/styles.css` with `urllib`, and then runs a **per-marker
  membership test** against an explicit list of required markers:

  ```python
  for marker in ['incident-app','summary','incident-list','incident-row',
                 'incident-detail','timeline','status-filter','severity-filter',
                 'owner-input','acknowledge-action','resolve-action','feedback']:
      print(marker, marker in html or f'data-testid="{marker}"' in html
            or f'"{marker}"' in html)
  ```

- The output of that check printed `False` for four markers
  (`incident-row`, `owner-input`, `acknowledge-action`, `resolve-action`).
  OpenCode then rewrote `app.js`, re-ran the same check, and re-ran the full
  `pytest` suite. Three tool calls, same model session, no retry storm.
- It finished 8/8 on the hidden verifier at 2.75M input tokens and ~17.7
  minutes.

The per-marker completeness check is structurally stronger than the
presence check Sonnet used. It is what let OpenCode catch a gap that Sonnet's
run missed, without ever launching a browser.

### A note on the test-file edits

OpenCode's trace shows several edits to files under `tests/`. The starter
repository ships only `tests/test_memory_service.py`. OpenCode wrote new
test suites (`tests/test_sqlite_store.py`, `tests/test_http_api.py`,
`tests/test_cli.py`) for the new code it had built, and corrected three
assertions in its own first drafts of `test_sqlite_store.py`. The hidden
verifier
([`benchmark/incident-operations-center/verify_incident_ops.py`](../benchmark/incident-operations-center/verify_incident_ops.py))
independently asserts the same idempotency semantics OpenCode converged on
(`replay_created is True`), so these were corrections toward the right
behavior, not weakening of tests to make a failing implementation pass. The
preserved starter test was not modified.

This is worth stating plainly because "the agent edited tests" is the kind
of claim that sounds like cheating and needs the diffs attached. The diffs
are shown in the trace at lines 110, 112, and 114 of
`20260824-aws-incident-v2-opencode.jsonl`.

## Current-main: the browser tool is removed

A later OpenHands + GLM-5.2 run
([`current-main-long-glm-openhands-20260824-v2.jsonl`](traces/current-main-long-glm-openhands-20260824-v2.jsonl))
shows what happens when the browser tool is removed from the harness entirely.

- The declared toolset drops from 22 tools (15 browser) to **9 tools, zero
  browser**. The system prompt has no `BROWSER_TOOLS` block and no
  `browser_*` schemas.
- The agent noticed and said so in its thoughts: *"No browser available.
  Let me do a static validation of the HTML/CSS/JS and verify the JS is
  syntactically valid with node."* It ran `node --check incident_ops/static/app.js`,
  grepped the served HTML and `app.js` for the required markers, and inspected
  the CSS statically for the mobile viewport constraint.
- It finished in 151 events and ~8.6 minutes, roughly a third of the
  original GLM run's time and events, with zero browser actions and zero
  browser-related retry loops.

The verification pattern is the same as OpenCode's: in-process `urllib`
server, `grep` for required markers, `node --check` for syntax. Once the
browser was off the table, OpenHands + GLM converged on the no-browser
strategy OpenCode had already been using.

### The caveat that still applies

Removing the browser removes the prompt overhead and the runtime
unreliability, but it also removes the one capability that would catch a
runtime JS throw. `node --check` validates syntax; it does not execute the
script. The `const` redeclaration defect that sank the Sonnet run would pass
`node --check` (it is syntactically valid) and fail at load time. The
current-main calibration note
([`results/current-main-calibration.md`](current-main-calibration.md)) covers
only the short calibration task, not the long incident run, so the
hidden-verifier outcome for this long run is not recorded in the published
results. The trace shows the run stopped cleanly; it does not prove 8/8.

## What this explains about token usage

Putting the four conditions together, the token differences on the same
task and model decompose roughly as follows.

1. **Per-call prompt overhead.** OpenHands original declares 22 tools per
   call; OpenCode declares roughly five. The 14-function browser toolset is
   the bulk of that delta, and it is amortized across every model call.
   This is the largest structural reason OpenCode used 2.75M input tokens
   on the same task and model where OpenHands used 6.76M.
2. **Behavioral cost of an unreliable tool.** Under GLM-5.2, the browser
   did not work: cold-start timeouts and extraction failures pushed the
   agent into retry loops and fallback strategies. Each retry is another
   model call with the full prompt (including the browser schemas) sent
   again. This inflates call count and context beyond the static per-call
   overhead.
3. **Model-dependent invocation.** Under Sonnet, the browser was declared
   but never invoked, so the behavioral cost was zero but the prompt cost
   was still paid on all 66 turns. Sonnet then substituted a weaker
   verification strategy and lost a check.
4. **Removing the tool removes both costs.** The current-main run declared
   no browser, invoked no browser, and ran in a third of the time. The
   agent adopted the OpenCode-style no-browser verification pattern on
   its own once the tool was absent.

The broader point for harness comparison is that a tool is not just a
capability the agent may use. It is also a fixed prompt cost paid on every
turn, and if the tool is unreliable at runtime, a behavioral cost paid in
retries. On this task, for OpenHands, the browser was a net cost on both
axes, not a net capability.

## Trace references

- OpenHands + GLM-5.2, original:
  [`results/traces/20260824-aws-incident-v2-openhands.jsonl`](traces/20260824-aws-incident-v2-openhands.jsonl)
- OpenHands + GLM-5.2, rerun:
  [`results/traces/20260824-aws-incident-rerun-v2-openhands.jsonl`](traces/20260824-aws-incident-rerun-v2-openhands.jsonl)
- OpenHands + Sonnet 4.5:
  [`results/traces/20260824-aws-incident-rerun-v1-openhands-sonnet.jsonl`](traces/20260824-aws-incident-rerun-v1-openhands-sonnet.jsonl)
- OpenCode + GLM-5.2:
  [`results/traces/20260824-aws-incident-v2-opencode.jsonl`](traces/20260824-aws-incident-v2-opencode.jsonl)
- OpenHands + GLM-5.2, current-main (browser removed):
  [`results/traces/current-main-long-glm-openhands-20260824-v2.jsonl`](traces/current-main-long-glm-openhands-20260824-v2.jsonl)
