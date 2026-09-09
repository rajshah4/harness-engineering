# Existing harnesses as the starting point

Source: [Kartik Sarangmath, The Harness Doesn't Matter](https://www.omnara.com/blog/the-harness-doesnt-matter), September 1, 2026. Read September 8.

The article separates the loop from configurable prompts, tools, and memory. Its practical recommendation is to reuse an existing harness. It also discusses prompt caching as a constraint on context changes and compaction as a point of differentiation.

## Editorial decision

Add one early slide after provider engineering choices, before the workshop roadmap. Explain the difference in definitions briefly, then focus on what participants can change and measure.

Our evidence supports targeted interventions. Workshop 2 changes the retrieval interface. Workshop 3 changes inherited guidance. Workshop 4 compares routing policies. None requires participants to write a new general-purpose runtime.

The broader claims about equivalence and all popular harnesses require more evidence than an opinion article. Do not promote them to established facts or import its leaderboard numbers without checking the original experiments.

For the compaction discussion, this is a useful counterargument to constant context rewriting. Our existing caching slide should explain the tradeoff using primary measurements before adding numerical claims.

## Talking point

I want you to understand what your agent is doing well enough to change the part that is getting in your way. Sometimes that is one tool or one stale instruction. Sometimes the existing harness already does the job.
