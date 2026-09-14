# Google Slides Resource Monitor

Deck: [Harness Engineering August 2026, Research Update Working Copy](https://docs.google.com/presentation/d/1-_pGXiN2F7dFShvSAJm6Re33tgCljlgGhf63DJcm1II/edit)

## Last review

- Reviewed: September 7, 2026
- Google Drive revision: 483
- Slides API revision: `dsYEU70Un5HObg`
- Slide count: 174
- Comments: none

## Changes that affect the workshop

### Claim 1: Harnesses do not matter

The new Snowflake, OpenBench M3, ARC-AGI-3, and Harness-R1 pages add controlled
or partially controlled comparisons. They reinforce the opening exercise and
its existing caveat: harness effects depend on the model, endpoint, and task.
No exercise change is needed.

### Claim 2: More tools create a super-agent

The new fixed-task scaffolding comparison reports a 139-times cost range and
often much cheaper CLI-only setups than MCP-capable setups. The source-code
retrieval result also shows that useful context can be much smaller than a
whole repository. These reinforce the MCP-first, then minimal API or terminal
comparison; they do not change its design.

### Claim 3: Modern agents can find what they need

Slides 85, 86, 88, 95, 159, and 160 materially sharpen this exercise. New
evidence shows instruction files accumulating lint, context, and skill debt;
no measurable correctness gain from several context strategies in one study;
more than 80 percent of a Claude Code system prompt removed without measurable
loss on an internal evaluation; and generic skills outperforming personalized
ones. The useful test is now explicitly a context-budget and maintenance test:
bare discovery, minimal stable guidance, targeted skills, and overloaded or
stale context. The participant exercise already reflects this structure.

### Claim 4: Use the strongest model for every task

Slides 120 and 165 through 168 add three material routing cautions: the same
named model may differ by endpoint, two cheap verified attempts can beat one
expensive attempt, and oracle routing is only a ceiling until a deployable
router can predict the winner. Keep verification and escalation in the live
router. Add endpoint identity to the evidence table and treat best-of-k as an
optional policy in the result reveal rather than another live lane.

### Claim 5: Let the agent run until it figures it out

Slides 107 through 111, 119, and 174 reinforce the exercise's separation of a
durable goal, changing plan, precommitted validation, and bounded continuation.
The additions also make the falsifier clearer: more time is not useful when the
agent controls its own definition of done or repeats a failing plan. The
exercise already uses this structure, so only the evidence map changes.

### Claim 6: What you want is a multi-agent system

Slides 137 through 139 materially strengthen the falsifier. One study reports
an average multi-agent regression and error amplification when agents are not
independent; Anthropic's examples favor bounded child contracts, a clear
hierarchy, and parallel branches with little shared state. Keep the matched
compute comparison and separable-versus-coupled tasks already in the exercise.

## August 31 review summary

The deck grew by 21 slides since the prior checkpoint. The additions change
the evidence and result-reveal cautions for Claims 3 through 6, but they do not
require a seventh exercise or a redesign of the six-exercise sequence. No new
comments were present. Google Drive did not expose a reliable historical text
export for revision 43, so this review used the saved checkpoint, current slide
objects, current links, and the Drive revision history rather than claiming an
exact text diff.

## Monitoring rule

When the deck revision changes, review new slide text, links, and comments.
Update the claim map only when a resource changes an exercise, its falsifier,
or the evidence shown in the reveal. Do not churn the plan for another example
that supports a point already covered.
