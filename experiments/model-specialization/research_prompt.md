# Research Prompt: Cross-Benchmark Model Specialization

Use this prompt when you want an LLM to analyze whether models specialize across task types rather than assuming one universal ranking.

## Prompt

```text
You are comparing models across multiple benchmarks that represent different task types.

Goal:
Determine whether model rankings are stable across benchmarks or whether different models specialize in different kinds of work.

Inputs:
- A leaderboard URL, repo, paper, or table
- The benchmark names
- A one-line description of what each benchmark measures
- Any dates, agent versions, or harness details available

Tasks:
1. Extract the top-performing or representative models for each benchmark.
2. Build a normalized comparison table with one row per model and one column per benchmark.
3. Identify cross-benchmark rank shifts:
   - Which model leads on benchmark A but drops on B?
   - Which model looks balanced across benchmarks?
   - Which model is the strongest example of specialization?
4. Write 2-3 concise takeaways explaining what the evidence says.
5. Include caveats:
   - benchmark dates
   - harness or agent-version differences
   - missing data
   - whether scores are directly comparable

Output format:
- Short setup paragraph
- Comparison table
- Findings
- Caveats
- Suggested one-paragraph writeup for a paper, slide, or blog post

Rules:
- Do not just restate the leaderboard summary.
- Use exact benchmark names and concrete numbers.
- If relative dates are present, rewrite them as absolute dates.
- If one model appears "best overall," still check whether it materially drops on another benchmark.
- Distinguish between inference and directly supported claims.
```

## Notes

- Prefer benchmarks that differ in workload shape, not just difficulty.
- Good pairs or sets include bug fixing vs. app building vs. information gathering.
- If the source has many models, compare either:
  - the union of top-3 finishers on each benchmark, or
  - a curated set of well-known frontier models plus the benchmark leaders.
