# Workshop and Tutorial Curriculum Map

## Decision

The proposed workshops should not become six more tutorial lessons. They are a
different delivery route through the same body of knowledge:

- The tutorial is the build path. Students implement, run, measure, and keep a
  reusable artifact.
- The workshop is the decision path. Participants predict, inspect a trace,
  see a result, and write a narrower design rule.
- The deck is the evidence path. It supplies research, mechanisms, and cases
  that explain why the result occurred.

The workshop earns a separate identity through format and synthesis, not by
inventing a parallel curriculum.

## Concept mapping

| Proposed workshop | Closest tutorial material | Relationship | Curriculum decision |
|---|---|---|---|
| 1. Harness choice | P01 Agent Trace, plus the shared comparison method used throughout | P01 teaches how to read one harness. The workshop compares multiple harnesses with the model fixed. | Keep as a workshop-only synthesis and use P01 as the prerequisite or follow-up lab. |
| 2. Tool design | P03 Retrieval, P06 Safety, P10 History Index | P03 already asks whether an MCP search tool earns its slot. The workshop generalizes this from retrieval to tool granularity, result shape, schema cost, provenance, and trust boundaries. | Keep the new controlled comparison. Do not create another generic MCP lesson. Feed its task-shaped-tool result back into an eventual revision or extension of P03. |
| 3. Context and memory | P05 Memory and Compaction, P10 History Index | This is substantially the same concept, broadened into a placement decision across active context, working state, durable instructions, skills, retrieval, and deletion. | Use P05 and P10 evidence. Do not add a new project unless there is a missing runnable context-placement experiment. |
| 4. Model routing | P02 Model Routing and P09 Model Routing Benchmark | This is almost exactly the tutorial's two-stage routing arc, expressed as an audience decision. | Reuse P02 and P09 results. Do not create a third routing lesson. |
| 5. Agent loops | P07 Verification and Capstone, P12 Goal Scaffolding, parts of P06 Safety | The workshop combines verification, stopping, persistence, budget, recovery, and safe autonomy. P12 is the deep implementation lesson. | Use P12 as the main lab and P07/P06 as supporting material. Do not create a separate general loop project. |
| 6. Multi-agent systems | P04 Decomposition, P07 Critic, P08 Dynamic Workflows, P11 Subagents | The workshop is a synthesis of when work separates, when another context earns its cost, and who owns synthesis. | Use P11 as the measured core, with P04, P07, and P08 as the architecture ladder. Do not add another multi-agent lesson. |

## What is genuinely new

Two workshop comparisons add material that is not already a direct tutorial
project:

1. Same model and task across different harnesses. This turns P01's trace
   literacy into a harness-ablation exercise.
2. Primitive, broad-catalog, terminal, and task-shaped tool surfaces on the
   same evidence task. This goes beyond P03's lexical-search comparison and
   isolates tool abstraction and result design.

Everything else is primarily curation, compression, and connection across
existing projects.

## Recommended product architecture

Maintain one concept system with three views:

```text
Concept             Workshop experience       Tutorial implementation
Harness observability -> Workshop 1           -> P01
Tool and retrieval design -> Workshop 2       -> P03, P06, P10
Context placement    -> Workshop 3             -> P05, P10
Routing              -> Workshop 4             -> P02, P09
Control and completion -> Workshop 5           -> P06, P07, P12
Delegation           -> Workshop 6             -> P04, P07, P08, P11
```

Each workshop section should link to one primary follow-up project, not to a
new workshop-specific lesson:

| Workshop | Primary follow-up |
|---|---|
| 1 | P01 Agent Trace |
| 2 | P03 Retrieval, extended with the task-shaped-tool case |
| 3 | P05 Memory and Compaction |
| 4 | P09 Model Routing Benchmark |
| 5 | P12 Goal Scaffolding |
| 6 | P11 Subagents and Context Isolation |

The remaining projects form an advanced architecture path rather than another
linear sequence: P04 decomposition, P06 safety, P07 verification, P08 dynamic
workflows, and P10 history indexing.

## Guardrail against lesson accumulation

Before adding another lesson, require all three conditions:

1. It introduces a harness decision that no existing project isolates.
2. It produces a reusable artifact that no existing project already produces.
3. It needs a new runnable comparison, not merely a new explanation or example.

If one of these is missing, update an existing project, add an advanced
extension, or use the material as a workshop case instead.

The practical direction is to stop extending the numbered sequence after P12
for now. Improve the cross-links and define curated routes through the existing
projects: foundations, production control, and advanced orchestration.
