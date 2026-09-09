# ODSC Workshop Slide and Exercise Map

Claim-driven narrative: [Six Harness Engineering Claims to Put on Trial](harness-claims-to-test.md)

The existing deck is the complete deep-dive source deck. It should support a
three-hour technical workshop, with the six claims providing the narrative
spine across the detailed chapters. Shorter deliveries can later select a route
through this material without shrinking the source deck.

The detailed August 30 walkthrough, using current slide numbers and stable
Google Slides object IDs, is in
[deck-workshop-alignment.md](deck-workshop-alignment.md). This older compact map
remains useful as the high-level narrative summary.

Live source deck: [Harness Engineering August 2026, Research Update Working Copy](https://docs.google.com/presentation/d/1-_pGXiN2F7dFShvSAJm6Re33tgCljlgGhf63DJcm1II/edit)

Local snapshot: [ODSC_Shah_Apr2026.pdf](ODSC_Shah_Apr2026.pdf)

The participant exercises and facilitator notes live in the
[`learn-openhands-harness` workshop package](https://github.com/rajshah4/learn-openhands-harness/tree/main/docs/workshops/odsc-2026).

The workshop is the decision path through that tutorial, not a parallel set of
lessons. Result slides should name one primary tutorial project as the place to
implement the decision. The workshop supplies the prediction and evidence
reveal; the tutorial supplies the starter, solution, measurements, and reusable
artifact.

The claims document is now the narrative spine. This map still records where
the current slides and hands-on exercises fit, but sections should open with a
claim and a falsifiable test rather than a harness feature.

## Current claim order

Set exact timing after the six experiments have been designed and dry-run.

| Order | Claim on trial | Participant artifact | Continue in tutorial |
|---:|---|---|---|
| 1 | Harnesses do not matter | A measurement rule and the evidence needed to trust a comparison | P01 |
| 2 | More tools create a super-agent | A rule for when an integration earns its context and security cost | P03, then P06 and P10 |
| 3 | More instructions, skills, and memory make agents better | A context budget and a review-and-prune policy | P05, then P10 |
| 4 | Use the strongest model for every task | A routing policy with verifier and escalation triggers | P02, then P09 |
| 5 | Let the agent run until it figures it out | A goal, independent validation contract, and bounded autonomy policy | P12, supported by P06 and P07 |
| 6 | What you want is a multi-agent system | A delegation policy that accounts for task independence and compute | P11, then P04, P07, and P08 |

## Why the topics are combined this way

Retrieval, persistent memory, `AGENTS.md`, skills, checkpoints, and active
context are different mechanisms. They belong under Claim 3 because each one
controls what reaches a future model call. The exercise asks participants to
keep, move, enforce, retrieve, or delete each piece of information.

Long-running execution, verification, loop control, and safety also belong
together. A resumed agent needs a trustworthy checkpoint, but it also needs to
know what evidence is stale, what it may do, how much budget remains, and when
to stop.

Model routing comes before long-running control and multi-agent design. This
lets participants test the cheapest capability escalation before adding more
workflow or more agents.

## Slides to add or revise

The current deck has strong retrieval, context, skills, tools, routing,
long-running agents, and multi-agent sections. It needs a small workshop layer
rather than a wholesale rewrite.

1. Add a workshop roadmap showing the six decisions. **Still open.**
2. Add a simple benchmark result slide for Exercise 1. **Done:** the short-suite
   and longer incident-project reveals follow the controlled-comparison setup.
3. Replace the label "Three layers of Memory" with a broader context-placement
   frame. **Done:** active context, working state, and durable knowledge are
   distinguished by purpose and lifetime.
4. Add one context-budget slide covering project policy, on-demand skills,
   checkpoints, retrieval, deterministic enforcement, and deletion. **Done:**
   the placement-decision page follows the context frame; later AGENTS.md pages
   provide evidence that saved context can help or hurt.
5. Add Anthropic's April 2026 prompt regression as the system-prompt case. One
   short verbosity instruction caused a 3% evaluation drop, which led to
   per-model evaluation and line-level ablation for prompt changes.
6. Use slides 165 through 168 as the model-routing evidence burst. Compare the
   strongest, economical, risk-aware static, and adaptive policies on the same
   tasks. Then open the design space: teams can choose before the task from risk
   or metadata, during the task from runtime signals, after an attempt from a
   verifier, or from historical results. The exercise should ask participants
   to defend their signal and fallback, not copy one winning router.
7. Add a result-reveal slide after each exercise. **Workshop 1 is done at the
   aggregate level; trace excerpts and later-exercise reveals remain open.**
8. Add Factory's 36% to 90% GDAL result before the long-running exercise, then
   show the separation between implementation and completion authority. **Done:**
   the result and validator, implementer, and orchestrator mechanism are now a pair.
9. Add Anthropic's multi-agent research result beside its token multiplier and
   coding caveat. Follow it with the C compiler example where a GCC oracle
   turned one shared failure into independent work.
10. Add Anthropic dynamic workflows as the bridge from long-running execution
    into the multi-agent capstone. Frame it as runtime-generated orchestration:
    tens to hundreds of parallel subagents, external progress state, independent
    review, and verification before synthesis. The exercise should ask when a
    task earns that token and coordination cost, not simply celebrate scale.
    **Done:** architecture, Bun case, and decision-gate pages form the bridge.

### Workshop 1: controlled harness comparison

The opening section now ends with an audience-facing setup page: same model,
same task, different harness. Participants compare OpenHands, Pi, and OpenCode
while holding model settings, repository state, runtime environment, and
verifier constant. Inspect outcome evidence, tool calls, tokens, wall time, and
estimated price. Two result pages now use the saved short-suite and incident
project runs. Repeat the most informative tasks before presenting; do not imply
that one trial establishes a universal harness ranking.

## Lecture rule

Do not teach a full chapter before the hands-on work. Each lecture burst should
answer three questions: what failed, what harness choices are available, and
what evidence would justify adding complexity. The exercise supplies the
comparison. The reveal supplies the conclusion.
