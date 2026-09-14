# September 11 workshop revision

The main sequence is now 78 slides, compared with 169 main slides and 55 reserves in the reviewed 224-page preview. Two slides are new: workshop setup and routing/cache reuse. Seventy-six old stable IDs remain in the main sequence; 148 original blocks are preserved outside it. The earlier progress estimate of 172 main / 52 reserves was corrected by counting the actual section boundary.

## Editorial decisions

- Introduce a harness component, explain its behavior, then show the task and evidence. Keep workshop instructions with the task they apply to.
- Use plain topic titles for explanations. Report results without giving a scaffold or configuration causal agency.
- Combine repeated framing, prediction, mechanism, reversal, and debrief pages. Preserve caveats with the relevant result.
- Put complete explanations in visible slide text. The renderer no longer substitutes historical text overrides or silently drops a body when a slide has an image. It rejects overflowing text instead of truncating it.
- Keep sources and diagrams. The existing full visual source was archived before regeneration, including manual changes. Earlier standalone example decks remain intact.

## Your comments and their disposition

| Comment group | Change |
| --- | --- |
| Provider choices should be a simple list | Replaced the abstract visual with tools, context, models, and control choices. Combined the redundant alternatives and roadmap pages. |
| Show that provider harnesses solve most SWE-bench tasks | Removed the old mislabeled comparison from the main sequence. Its numbers used different models in a minimal evaluation harness, so they do not establish the requested branded-harness claim. A valid same-model comparison would be needed. |
| Logistics before the workshop | Added the existing quickstart and warmup links, onboarding checks, and saved-trace fallback. No event-specific deployment URL was invented. |
| Prediction questions assume too much background | Removed the standalone prediction pages. Exercises now explain the task and component before asking participants to choose a design. |
| Harvey mechanism disappeared in the visual deck | Kept the original architecture figure and made the REPL/subagent explanation visible alongside it. |
| Applied Compute needs a visual | Added the original tool-use chart from the primary case study, with training and indexed-search context. |
| Repeated harness-comparison/debrief/method slides | Kept a recorded walkthrough, the result, caching intervention, and two external comparisons. Archived the generic repeat-the-test advice and weaker examples. |
| Tool-catalog story spans too many slides | Consolidated into definitions, the PR exercise, actual trace excerpts, results, tool discovery, batching, and editing interfaces. |
| The scaffold/cost claim is confusing | Rewrote as the observed comparison across complete configurations. The source does not isolate one setting responsible for the 139-fold spread. |
| Tool trace is incomplete | Added the actual trial-1 action sequence: 15 broad-catalog calls versus one bundled call. Included raw trace paths and event IDs; distinguished these runs from the three-trial medians. |
| Remove tool-security and shared-memory-scope detours | Removed those slides and memory-poisoning material from the main sequence. Retained originals in the archive. |
| Context exercise lacks its task | Put cursor-pagination behavior, repository compatibility, and the three guidance conditions on the setup slide. |
| Context / state / memory distinctions are not intuitive | Used one concrete example for each. Explained that stored material must be loaded before the model can use it. |
| Prime Agent should be a design example | Framed it as one approach to active input, programmable working state, and durable storage. |
| Introduce long-context limitations before retrieval | Reordered and explained retrieval as selecting files/results for the next action. Removed low-information context-window pages. |
| Keep system prompts separate from AGENTS.md | Grouped the prompt-growth and prompt-shortening examples. Introduced AGENTS.md before its study results and used consistent terminology. |
| Routing and cache loss | Added a dedicated explanation using Anthropic's primary documentation. Task-boundary routing is an option to evaluate, not a universal rule. |
| Provider and quantization are controllable factors | Reframed inference-provider settings as inputs to the comparison, separate from harness execution. |
| Multiple attempts should lead into multi-agent work | Moved the best-of-two example into the multi-agent introduction, retaining the need to select a successful output. |
| Harnesses need to evolve with models | Moved model-specific prompting and retesting into the close. |

## Remaining limits

This is a structural and explanatory revision, not a complete re-verification of every inherited external benchmark. Dated adoption figures and inherited source caveats remain in the source notes. The original Sarah Wooders post was identified through LangChain's link, but X returned 403; the attribution is to the accessible LangChain article, not a claimed direct reading of the post.

The live slugify exercise is still marked as planned in the notes. The long incident/freight results are prepared-run evidence, not a claim that participants can reproduce those campaigns during the workshop.

## Preserved material

- [Your annotated original](../../archive/2026-09-11-editorial-pass/deck-with-rajiv-comments.md).
- [Cut and reserve slides with source links](../../archive/2026-09-11-editorial-pass/cut-and-reserve-slides.md).
- [Stable-ID revision map](../../archive/2026-09-11-editorial-pass/revision-map.json).
- [PR trace excerpts](september-11-pr-traces.md).

## Follow-up: preserve empirical findings from other papers

The current deck is 82 slides. Restored the SkillsBench result (version 4: 87 tasks,
18 configurations, 33.9% to 50.5%), the 288-run repository-context ablation, and
Anthropic’s parallel-research result. Added the ACON paper’s compression measurements
in place of the earlier mixed OpenHands/ACON claim. ACON version 3 reports 26–54%
lower peak token usage; that metric must not be labeled as API cost savings.

Primary pages were checked for these additions. SkillsBench search summaries still
surface older task counts and gains; the slide uses the version-4 abstract. Anthropic’s
quality and token-use claims have different baselines, stated on the slide.

The original cut/reserve archive remains an immutable record of the earlier edit;
three IDs in it are now restored in revised form. The current headline spine is the
source of truth for page order.

## Superseding direction: restore the pre-cut sequence

Rajiv requested the version immediately before the consolidation, with wording edits allowed and deletions marked for his decision. The original 224-slide sequence is restored, including 55 reserves, with three newer additions retained. The earlier 82-slide state is archived. The current review list is [original-sequence-review.md](original-sequence-review.md). No proposed cuts are applied.
