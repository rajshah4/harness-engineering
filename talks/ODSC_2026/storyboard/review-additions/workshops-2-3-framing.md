# Workshop 2 and Workshop 3 framing

These sections should reveal the experiment early. The later slides explain the result, challenge an overly broad interpretation, and turn the finding into an engineering rule.

## Workshop 2: Tool design

### Question

Which tool surface helps the same model collect reliable evidence with the least work?

### Prediction

Participants choose terminal plus API, a broad GitHub catalog, or one task-shaped GitHub tool. They predict elapsed time, tool calls, and evidence quality.

### Result

The task-shaped tool matched the broad catalog's 6/6 evidence score. It finished in 72 seconds with one tool call. The broad catalog needed 123 seconds and 12 calls. Terminal plus API finished in 101 seconds but reached only 4/6 on the evidence rubric.

### Mechanism

The higher-level tool removed a repeated retrieval loop. It returned pull request metadata, selected patches, commit summaries, validation evidence, and citable links in one bounded result.

### Reversal

This does not make primitives obsolete. Task-shaped tools work when the evidence workflow repeats and the result can remain bounded. Exploration still needs a terminal or lower-level tools.

### Engineering rule

Add a higher-level tool when it compresses a recurring evidence workflow into one bounded, reliable action. Keep primitives for exceptions.

## Workshop 3: Context, working state, and memory

### Question

How much context should the harness save for future work?

### Prediction

Participants choose no saved guidance, 620 words that save everything, or 100 words of curated context. They predict verifier success before looking at speed or tokens.

### Result

No guidance and curated context both passed the external verifier in all three trials. Save everything failed all three. It also took 39% longer and used 46% more processed tokens than no guidance.

### Mechanism

The saved context contained one stale architecture rule. The agent followed it, created the wrong module, wrote many tests around that interpretation, and reported a green suite. The independent verifier caught the contract error.

### Reversal

Curated context did not improve correctness over no guidance. It mainly improved adherence to the requested verification process.

### Engineering rule

Start with no saved context. Add a line when it is verified, stable, and more valuable than rediscovery. Keep task state out of durable guidance, and verify important contracts outside the agent's own tests.

## Delivery rhythm

For each workshop, keep the live sequence short:

1. Ask the question.
2. Collect the prediction.
3. Show one saved trace or run the most stable condition.
4. Reveal correctness before efficiency.
5. Explain the mechanism.
6. End with the reversal and the narrower rule that survived.

Both experiments have three same-day trials. Present them as teaching demonstrations. Do not turn their latency differences into population claims.
