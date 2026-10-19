# Conversation teaching review

Reviewed all 19 packaged histories, including the selected Workshop 1 takes and the validator child evidence. Each has a useful role; five are brief comparisons rather than standalone highlights. No reruns or prompt changes are needed for the claims below. These examples do not demonstrate a working model router, goal mode rescuing this editable baseline, or a validator finding an additional defect. Those would require different experiments, not stronger narration.

Screenshots are focused browser captures of preserved transcript excerpts, labeled as such. They are not synthetic Canvas screenshots. Source event IDs are retained in the images and excerpt-provenance.json.

## 01A · One request can contain several operations

**Use:** Core walkthrough. [Slide 16](http://127.0.0.1:5173/s/odsc-cut-review?p=16).

**Point to:** Expand the first terminal call and the final verification call.

**Say:** Count work inside requests, not just the number of requests.

**Do not overclaim:** This take batches work; batching is not guaranteed by the harness.

## 01B · Extra checks contain executable expectations

**Use:** Core walkthrough. [Slide 18](http://127.0.0.1:5173/s/odsc-cut-review?p=18).

**Point to:** Expand the command containing assert p.items and its returned success line.

**Say:** An assertion turns an unexpected edge case into a failing check.

**Do not overclaim:** These are checks added during this run, not a comprehensive test suite.

## 01C · Separate file reads make a different trace

**Use:** Brief comparison. [Slide 17](http://127.0.0.1:5173/s/odsc-cut-review?p=17).

**Point to:** Show the source read and test read as two distinct tool calls.

**Say:** The same repair can use a different action interface and sequence.

**Do not overclaim:** Brief comparison with 01A; no speed or quality ranking. Pending/completed ACP events do not prove a result arrived between requests.

## 02A · The agent writes the retrieval procedure

**Use:** Brief comparison. [Slide 35](http://127.0.0.1:5173/s/odsc-cut-review?p=35).

**Point to:** Show curl plus JSON parsing and the empty diff-filter result.

**Say:** A terminal exposes flexibility but leaves collection and failure handling to the agent.

**Do not overclaim:** Brief baseline. Retrieved test descriptions are not executed tests.

## 02B · A small tool menu still has argument errors

**Use:** Core walkthrough. [Slide 36](http://127.0.0.1:5173/s/odsc-cut-review?p=36).

**Point to:** Point to repo Field required, then the corrected call with repo supplied.

**Say:** An available tool still needs a usable schema and recovery path.

**Do not overclaim:** A recovered call does not establish that the entire answer meets every constraint.

## 02C · Checking one constraint can violate another

**Use:** Core walkthrough. [Slide 37](http://127.0.0.1:5173/s/odsc-cut-review?p=37).

**Point to:** Show the temporary-file creation and the later cleanup.

**Say:** Deleting a temporary file does not undo violating a no-file instruction.

**Do not overclaim:** The eight extra operations were unused. Do not claim the larger catalog caused the failure from one run.

## 02D · Move repeated collection into a tool

**Use:** Core walkthrough. [Slide 38](http://127.0.0.1:5173/s/odsc-cut-review?p=38).

**Point to:** Show the evidence-bundle call and the separate word-count command.

**Say:** The tool packages collection decisions; one model-facing call is not one backend operation.

**Do not overclaim:** Two actions in this run. Bundle completeness still needs a separate check.

## 03A · Repository decisions can supply the context

**Use:** Core walkthrough. [Slide 60](http://127.0.0.1:5173/s/odsc-cut-review?p=60).

**Point to:** Show the read of accepted and superseded decisions before implementation.

**Say:** No supplied notes does not mean no context; the repository already contains the design.

**Do not overclaim:** Baseline, not evidence of a token-saving percentage.

## 03B · A good repair can still cross the scope boundary

**Use:** Core walkthrough. [Slide 61](http://127.0.0.1:5173/s/odsc-cut-review?p=61).

**Point to:** Show the status check, then the later successful creation of MEMORY.md.

**Say:** The final scope check must happen after the last write, including memory writes.

**Do not overclaim:** The current design was followed. Do not call this a failure to reconcile stale notes.

## 03C · Current notes do not replace source verification

**Use:** Brief comparison. [Slide 62](http://127.0.0.1:5173/s/odsc-cut-review?p=62).

**Point to:** Show the current decision read, then reuse of the shared token helpers.

**Say:** Use supplied context as a starting point and reconcile it with the implementation.

**Do not overclaim:** Brief comparison. This run still rereads the decisions; it does not demonstrate automatic memory retrieval or eliminated exploration.

## 04C · Keep slow work outside the lock

**Use:** Core walkthrough. [Slide 89](http://127.0.0.1:5173/s/odsc-cut-review?p=89).

**Point to:** Show the replacement increment implementation.

**Say:** Protect shared mutation without serializing the simulated async work.

**Do not overclaim:** The load-sensitive timing check is a fixture check, not model latency.

## 04D · A real probe does not justify every report claim

**Use:** Core walkthrough. [Slide 91](http://127.0.0.1:5173/s/odsc-cut-review?p=91).

**Point to:** Compare successful bypass output with the report calling fixture tokens live credentials.

**Say:** Separate directly observed behavior from deployment assumptions.

**Do not overclaim:** The bypass is visible; live deployment and practical timing attacks are not established by this fixture.

## 04G · Remove the yield inside the shared update

**Use:** Core walkthrough. [Slide 90](http://127.0.0.1:5173/s/odsc-cut-review?p=90).

**Point to:** Compare the small replacement with the lock-based repair in 04C.

**Say:** There can be more than one accepted repair; compare the assumptions each one needs.

**Do not overclaim:** Safe only for the stated single-event-loop task; no general thread-safety claim. The think-tool validation error remains in the trace.

## 04H · Turn a finding into a checkable claim

**Use:** Core walkthrough. [Slide 92](http://127.0.0.1:5173/s/odsc-cut-review?p=92).

**Point to:** Show no-auth 401 beside debug-impersonate 200, then the corresponding report finding.

**Say:** Assess a review by whether its claims map to evidence, not by the number of findings.

**Do not overclaim:** Pro is not uniformly correct: token severity and constant-time claims still need context. This is not proof that a larger model always reviews better.

## 05A · The ordinary baseline already catches the bug

**Use:** Core walkthrough. [Slide 107](http://127.0.0.1:5173/s/odsc-cut-review?p=107).

**Point to:** Show the new regression test failing, then passing output after the fix.

**Say:** Establish what the ordinary workflow already achieves before crediting an added reviewer.

**Do not overclaim:** A shell command can exit zero after echo even when pytest failed; inspect the captured test status.

## 05B · Completion review is a separate decision

**Use:** Brief comparison. [Slide 109](http://127.0.0.1:5173/s/odsc-cut-review?p=109).

**Point to:** Show the goal state: complete, iteration 1, and the exact-output assertion.

**Say:** The deterministic check and the completion reviewer answer different questions.

**Do not overclaim:** Brief comparison with 05A. This run does not show an extra audit rescuing a failed repair.

## 05C · Green tests can coexist with an unmet goal

**Use:** Core walkthrough. [Slide 110](http://127.0.0.1:5173/s/odsc-cut-review?p=110).

**Point to:** Show five tests passing, missing dot, and the audit continuation message.

**Say:** A bounded stop is not success; retries cannot overcome a no-edit constraint.

**Do not overclaim:** This is deliberately constrained, not an ordinary coding failure.

## 06A · One agent can already validate its own repair

**Use:** Brief comparison. [Slide 124](http://127.0.0.1:5173/s/odsc-cut-review?p=124).

**Point to:** Show the repeated tests and count/concurrency probe.

**Say:** Use this as the baseline when asking what a second agent contributes.

**Do not overclaim:** Brief baseline; the repair itself repeats Workshop 4. Focus on who performs verification.

## 06B · Validate the handoff and the final synthesis

**Use:** Core walkthrough. [Slide 125](http://127.0.0.1:5173/s/odsc-cut-review?p=125).

**Point to:** Show the read-only delegation and the final aggregate test-count claim.

**Say:** A validator can confirm the candidate without making the owner’s final summary accurate.

**Do not overclaim:** The child finds no new defect. Its eight runs of two tests are 16 passes; the owner incorrectly labels 16 as the total across all runs.



## Actual Canvas screenshot update — October 18

All 19 conversation evidence slides now use actual Canvas captures, with editable gold annotations. Headlines match the deck’s Arial 62px / 700 style; the pale-green “Workshop N · Hands-on” band exactly matches slide 15. The captures are cropped UI views, not reconstructed transcripts. See review-additions/canvas-capture-manifest.json for capture checksums, precise displayed evidence, and limitations. No conversations, outcomes, or prompts changed; no reruns. The full linked histories preserve the additional evidence discussed in the notes.
