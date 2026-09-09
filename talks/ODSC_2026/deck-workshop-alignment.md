# ODSC 2026 Deck-to-Workshop Alignment

Current deck: [Harness Engineering August 2026 — Research Update Working Copy](https://docs.google.com/presentation/d/1-_pGXiN2F7dFShvSAJm6Re33tgCljlgGhf63DJcm1II/edit)

Snapshot reviewed: August 30, 2026, revision `dG2f3pVhGboFTQ`, 164 slides.

Workshop-spine pass added August 30: revision `AyB1SBAyCnb5wA`, 171 slides.
The new roadmap and six claim slides are now native slides in the working deck.

This document maps the current slide library to the six workshop exercises. Slide
numbers describe the reviewed revision and will drift as the deck changes. The
Google Slides object IDs are the stable references.

## Recommended structure

Build this as a complete **three-hour harness-engineering deep dive**, not as a
short talk with a research appendix. The six workshop claims should become the
narrative spine, while the existing retrieval, context, memory, skills, loops,
safety, routing, and multi-agent research remains available in the main deck.

The goal is breadth with a teaching rhythm. Each section can go deep, branch
into case studies, and return to a participant decision. We can later derive a
short conference route from this larger deck; we should not design the source
deck around the shorter route now.

Each workshop section should use the same rhythm:

1. Put one claim on trial.
2. Name what stays constant in the comparison.
3. Let pairs predict the result.
4. Run or inspect the Agent Canvas trace.
5. Reveal one compact result card.
6. State the narrower rule that survived.
7. Send participants to one worksheet decision.

The current deck already supplies much of the lecture material. The largest gap
is the workshop layer: roadmap, experiment setup, prediction, result reveal,
decision slides, and transitions that return from a deep technical branch to
the claim being tested.

## Daniel Han / Unsloth teaching pattern

The target is not merely an interactive deck. Each topic should feel like a
small investigation:

1. Start with a claim that a competent practitioner might believe.
2. Show a concrete failure, anomaly, or surprising number.
3. Explain just enough mechanism to let the room make a prediction.
4. Give two or three credible choices rather than an obvious right answer.
5. Change the system live or inspect the exact trace where behavior diverged.
6. Reveal the result before explaining it away.
7. Go one level deeper into the technical mechanism.
8. End with a rule participants can use, plus the case where the rule breaks.

This permits substantial technical depth. The interactive moments are the
hinges between deep sections, not a reason to remove material.

## Opening: from model choice to harness experiments

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 1 | `g39b5ec0d82b_1_188` | Workshop title |
| 3 | `g3d327b97d30_1_11` | Establish that tasks became long and environmental |
| 4 | `g3d2d034e6c6_1_17` | Show that the system, not one generation, performs the work |
| 5 | `g39ed7a36e69_0_0` | Speaker introduction |
| 10 | `ai01_slide` | Define the harness as the model's body |

### Add

1. **Today's lab bench:** Agent Canvas is the common trace and comparison
   surface; OpenHands, Pi, and OpenCode are the compared harnesses.
2. **Six claims on trial:** one roadmap slide with the six exercises and the
   repeated predict → trace → reveal → decide rhythm.
3. **How to read every result:** outcome, calls, context per call, wall time,
   provider cost, and completion evidence. State that one run is evidence, not
   proof.

Slides 2 and 134–135 duplicate the title and can support alternate openings,
chapter resets, or a reprise near the close. Slides 6–9 and the former slide 11
provide additional definition depth around the new workshop spine.

## Exercise 1: Same model, different harnesses

**Claim on trial:** Harnesses do not matter; the model is what matters.

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 12 | `g3cfee166b75_1_241` | Provocation: same model, large performance gap |
| 15 | `ai02_slide` | Controlled harness spread |
| 17 | `ru01_slide` | Harness effect on cost and latency with quality near parity |
| 19 | `ru03_slide` | Small-harness counterexample and cost pressure |
| 20 | `ru04_slide` | State handling as a concrete harness ablation |

Use two or three of slides 15, 17, 19, and 20 in the spoken route; keep the
others as evidence on demand. Slide 16 is another strong same-model result, but
the opening becomes a literature review if every result is presented.

### Bridge to the exercise

Add a prediction slide for the pagination repair:

- Which harness makes the fewest model calls?
- Which sends the least context per call?
- Which finishes first?
- Which provides the strongest completion evidence?

The next slide should lock the controlled variables: model, prompt, repository
revision, isolated workspace, permissions, budget, and external verifier.

### Result reveal to add

Add two distinct result cards:

1. **Live short task:** pass/fail, model calls, input per call, wall time, first
   action, and completion evidence for OpenHands, Pi, and OpenCode.
2. **Prepared incident project:** the existing measured table—OpenCode 76 calls,
   2.75M input tokens, 17m40s, $0.77, 8/8; Pi 69 calls, 3.16M, 20m21s,
   $1.05, 7/8; OpenHands 95 calls, 6.76M, 26m42s, $2.61, 8/8.

End with: **Supported with a narrower condition: harnesses shape inference,
but the effect depends on model–harness fit and the task.**

## Exercise 2: Do you need an MCP?

**Claim on trial:** Connecting more tools and MCP servers creates a
super-agent.

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 18 | `ru02_slide` | Scaffolding and MCP/CLI cost can vary dramatically |
| 117 | `g3cfee166b75_1_278` | Compact, clear actions and defensive returns |
| 118 | `uber04_slide` | Tool-definition context tax at fleet scale |
| 119 | `uber05_slide` | Keep polling and raw intermediate results outside the model |
| 147 | `g3d58a79d6b2_0_7` | Many JSON schemas versus one program in a code-execution tool |
| 163 | `g3de63a76480_0_34` | Tool-use failures as a debugging frame |

These slides currently live in three different regions. The tools-and-retrieval
chapter should connect them explicitly, while preserving the deeper branches.

### Bridge to the exercise

Add a slide showing the exact GitHub task and the two lanes:

1. GitHub MCP with named, typed operations.
2. Terminal plus authenticated `gh`/API access.

The prediction prompt should ask about tool definitions, first useful evidence,
selection or parameter errors, failed calls, and citation quality. Explicitly
say that the terminal is one visible schema but a large implicit action space.

### Result reveal to add

The controlled GitHub MCP-versus-terminal experiment is not yet complete. Add
the result slide only after both authentication paths pass preflight. Until
then, label the comparison **experiment in preparation** rather than filling it
with literature numbers.

End with the decision rule: **Expose the smallest clear action surface that
returns enough evidence; pay the MCP cost when typed discovery, authentication,
reliability, or policy boundaries earn it.**

## Exercise 3: What should the agent remember?

**Claim on trial:** More instructions, skills, and memory make agents better.

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 55 | `g397b4ac3620_0_51` | Audience provocation about very large context windows |
| 56 | `g3c599fa5093_0_4` | Context failure is forgetting what matters |
| 61 | `g3c5632f9dff_0_149` | Warnings can displace the real goal |
| 62 | `g3dcbc7569e8_0_7` | Active context, working state, and durable knowledge |
| 68 | `g3cfee166b75_1_2` | Working state belongs in files, not only chat |
| 76 | `g38b6812626f_0_0` | AGENTS.md is paid for in every prompt |
| 77 | `g3de63a76480_0_55` | Generated AGENTS.md can hurt success and cost |
| 81 | `addy04_slide` | Prompt rules can become obsolete as models improve |
| 82 | `g3dcbe6d87b1_0_0` | Skills package instructions, code, and references |
| 87 | `g3cfee166b75_1_154` | Skills can reduce performance |
| 89 | `g37e8cf7c57bc99ef_0` | Evaluate skills rather than accumulating them |

Slides 55, 56, 62, 68, 77, 81, 82, and 89 form the main argumentative chain.
Slides 57–60, 63–67, 69–75, 78–80, 83–88, and 90–93 supply the deeper context,
compaction, memory, and skills branches around it.

### Revise

Rename slide 62 from **Three layers of Memory** to **Three places context can
live**. Active prompt content and working state are not both durable memory.

Add a context-placement matrix immediately after it:

| Destination | Use for |
|---|---|
| `AGENTS.md` | Short verified facts needed on most repository tasks |
| Skill | A scoped procedure loaded for matching work |
| Persistent memory | Stable, verified, hard-to-derive facts likely to matter again |
| Task checkpoint | Current objective, evidence, remaining work, and next action |
| Retrieve later | Changing facts and cheap-to-fetch detail |
| Enforce outside model | Tests, hooks, permissions, CI, and non-negotiable rules |
| Delete | Secrets, guesses, stale state, duplicated output, and clutter |

### Measured result reveal

The three-trial AWS comparison is complete. No saved guidance passed 3/3,
save everything failed 0/3, and curated context passed 3/3. The overfilled lane
followed a stale module-placement instruction, wrote 23 to 30 added tests that
passed, and still failed the independent public contract. At the median it was
39% slower and used 46% more processed tokens than no guidance. Use
`harness-benchmark/results/workshop3-context-placement-preliminary.md` for the
result card and trace sequence.

End with: **Supported with a narrower condition: context helps when it is
verified, scoped, and cheaper than rediscovery. Every saved line must keep
earning its place.**

## Exercise 4: Use the strongest model for everything?

**Claim on trial:** The strongest model at high reasoning is the safest default
for every task.

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 154 | `g3cfee166b75_1_208` | Capability, speed, and cost trade-off |
| 155 | `ru17_slide` | Model prices change faster than harness policy |
| 156 | `ru18_slide` | Log the endpoint and settings, not only the model name |
| 157 | `ru19_slide` | Cheap retries can beat one expensive attempt |
| 158 | `fr01_slide` | Oracle routing as a ceiling, not a deployable router |

This material is currently after the closing summary. Move it into the spoken
route between context and long-running control. Keep slide 158's caveat visible:
it selects after observing outcomes.

### Bridge to the exercise

Add the four-task routing matrix: symbol rename, pagination boundary, async
race, and authentication review. Participants choose initial model, reasoning,
verifier, and escalation signal before seeing outcomes.

### Result reveal to add

The three-policy comparison—strongest for all, economical for all, and
verify-then-escalate—still needs measured workshop results. The result card
must include verified tasks, escalations, missed failures, wall time, provider
cost, and cost per verified result.

End with: **Routing is an evaluation problem. Start cheap only where failure is
detectable; high-risk or hard-to-verify work may deserve the strongest model
immediately.**

## Exercise 5: Let it run until it figures it out?

**Claim on trial:** A capable agent can manage the process and decide when it is
done if the harness gives it enough time.

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 95 | `g3c599fa5093_0_8` | Introduce loops as a harness concern |
| 99 | `ru11_slide` | Show the agent as repeated inference and tool feedback |
| 100 | `ru12_slide` | Persistence, recovery, and external verification |
| 101 | `gf01_slide` | Reliability compounds across steps |
| 102 | `ru13_slide` | A loop needs a measurable finish line |
| 105 | `g3dcbe6d87b1_0_7` | The undiagnosed retry loop |
| 109 | `g3d905d80d69_0_6` | Hypothesis plus verification improves the loop |
| 111 | `g3de63a76480_1_32` | Define tests independently of implementation |
| 113 | `g3de63a76480_1_25` | Put non-negotiable constraints in software |
| 116 | `g3d39460aeb8_1_9` | Match approval friction to blast radius |
| 164 | `g3d39460aeb8_1_16` | Goals, constraints, and acceptance outlive a session |

### Add

1. **Factory's stopping failure:** 17,000 lines, 36% behavioral parity, and the
   agent stopped while budget remained; the same model with an independent
   completion measure reached 90%. Label the one-run and compute caveats.
2. **Four controls:** durable goal, changing plan, independent validation
   contract, and bounded autonomy policy.
3. **Define done before implementation:** the participant checklist from the
   incident-operations exercise.
4. **The agent says done; the verifier says 7/8:** ask whether to accept, add
   turns, return the failed gate and replan, or escalate.
5. **Continuation policy:** continue, replan, escalate, or stop based on new
   evidence, workspace change, repeated gate failure, budget, and scope.

### Result reveal to add

Use the prepared Incident Operations Center trace. Show the failed browser gate,
what the agent's own tests missed, and why returning the failed external gate
is more useful than adding blind turns.

End with: **A bigger loop is not a completion standard. Preserve the goal,
define done independently, and continue only when another turn has earned its
cost.**

## Exercise 6: What you want is a multi-agent system?

**Claim on trial:** Difficult problems should be solved by parallel workers and
specialized critics.

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 121 | `g3c599fa5093_0_12` | Section opening |
| 125 | `g395335726eb_1_0` | Multi-agent work behaves like a distributed system |
| 126 | `g3cfee166b75_1_170` | Routing, parallelization, and orchestration choices |
| 127 | `g3de63a76480_1_42` | Coordination tax |
| 128 | `g3cfee166b75_1_285` | More agents can amplify errors |
| 129 | `ru15_slide` | Bounded agents with clear hierarchy behave like tools |
| 130 | `g3cfee166b75_1_15` | Independent critic pattern |

### Add

1. **The attractive headline and its bill:** Anthropic's research system was
   90.2% better than its single-agent configuration; token usage explained 80%
   of performance variance and the system used roughly 15× the tokens of
   ordinary chat. Research has unusually separable search branches.
2. **Sixteen agents, one bug:** the C compiler workers initially chased the same
   failure. GCC as a known-good oracle created distinct failing file sets and
   made the work parallel.
3. **Spend three agent cards:** allocate one generalist, worker-plus-validator,
   or parallel specialists across a coupled repair and an independent incident
   investigation.
4. **Matched-compute result:** total parent and child calls/tokens, verified
   result, wall time, duplicated setup, conflicts, and synthesis cost.
5. **A useful handoff:** what was checked, evidence, changed files, uncertainty,
   and next action—contrasted with a transcript dump.

End with: **Another agent earns its cost when work separates cleanly or needs
fresh independent judgment that code cannot enforce more cheaply. Difficulty
alone does not create parallelism.**

## Closing

### Use live

| Current slide | Object ID | Role |
|---:|---|---|
| 132 | `g3e638e6a787_0_44` | Five practical knobs |
| 133 | `g3e638e6a787_0_22` | Why harnesses matter |

Add a final **six decisions you now own** slide that mirrors the roadmap and
points to the completed worksheet:

1. What evidence makes a harness result trustworthy?
2. When does a tool or MCP integration earn its cost?
3. Where should each kind of context live?
4. When should the harness route or escalate?
5. What persists, proves completion, and bounds autonomy?
6. When does another agent earn its coordination cost?

## Highest-priority gaps

| Priority | Gap | Why it matters |
|---:|---|---|
| P0 | Six-claim roadmap and repeated section rhythm | Connects the full deep-dive chapters into a workshop narrative |
| P0 | Exercise 1 short-task and incident-project result cards | The opening exercise needs local evidence, not only literature |
| P0 | Context-placement rewrite of slide 62 plus matrix | Prevents active context and task state from being mislabeled as memory |
| P0 | Factory 36%→90% and four-control long-running sequence | Supplies the central failure and decision for Exercise 5 |
| P0 | Anthropic 90.2%/15× and C-compiler oracle sequence | Gives Exercise 6 a fair pro/con setup rather than generic multi-agent advice |
| P1 | GitHub MCP-versus-terminal controlled result | Exercise 2 currently has a design but no valid measured reveal |
| P1 | No-guidance/save-all/curated-context result | Exercise 3 needs local behavior and verifier evidence |
| P1 | Strongest/economical/verify-and-route result | Exercise 4 currently has supporting economics but no workshop test |
| P1 | One prediction slide and one worksheet handoff per exercise | Keeps the talk participatory and connects speech to participant action |
| P2 | Chapter navigation and return-to-claim slides | Lets deep technical branches return cleanly to the participant decision |

## Workshop spine now in the deck

| Current slide | Stable ID | Purpose |
|---:|---|---|
| 11 | `odsc_route_slide` | Six-claim roadmap and repeated learning rhythm |
| 12 | `odsc_claim1_slide` | Same-model/different-harness provocation |
| 36 | `odsc_claim2_slide` | MCP-versus-terminal provocation |
| 57 | `odsc_claim3_slide` | Context and memory decision |
| 98 | `odsc_claim5_slide` | Independent completion decision |
| 125 | `odsc_claim6_slide` | Delegation threshold decision |
| 159 | `odsc_claim4_slide` | Model-routing decision |

The model-routing claim remains near the current routing chapter at the end of
the deck. A later structural pass can move the whole routing chapter earlier;
the source material remains intact in this pass.

## Three-hour deep-dive architecture

The full deck should comfortably support a 150-to-180-minute technical session
with optional branches inside every section:

| Segment | Deep-dive time | Material to support |
|---|---:|---|
| Opening, anatomy, and experimental method | 20 min | Definitions, model-versus-system framing, measurement |
| Same model, different harnesses | 25 min | Local benchmarks, literature, trace anatomy, model-harness fit |
| Tools and retrieval | 25 min | Bash, APIs, MCP, progressive disclosure, lexical/semantic/agentic retrieval |
| Instructions, skills, and memory | 30 min | Context placement, compaction, checkpoints, AGENTS.md, skills, persistent memory |
| Model and reasoning routing | 20 min | Task risk, verifiers, escalation, endpoint variation, cost curves |
| Long-running control | 30 min | Goals, plans, validation contracts, loops, recovery, budgets, safety |
| Multi-agent systems | 25 min | Separability, critics, parallelism, handoffs, synthesis, matched compute |
| Closing synthesis and questions | 10 min | Six decision rules and failure cases |

The deck may contain more material than any single delivery uses. Later run
sheets should select paths through it without redefining the source deck as a
short presentation.
