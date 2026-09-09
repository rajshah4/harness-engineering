# Harvey diligence case: incorporated into working Markdown

Source: https://www.harvey.ai/blog/post-training-rlm-agents-for-m-and-a-diligence

Status: two visual prototypes after Snowflake in Workshop 1, following Rajiv's @@ review. The problem is now on the results slide. Context and multi-agent talk-track callbacks remain. No separate training slide.

Stable IDs: `harvey-harness-result`, `harvey-harness-mechanism`. Former `harvey-task-mismatch` merged into the results slide.

Working deck: [deck.md](/Users/rajiv.shah/Code/codex/harness-engineering-deck/latest_sept4-markdown/deck.md).

Original vector Figures 6 and 5 obtained and inspected. Figure 6 is the direct harness comparison; it replaces the proposed Figure 1 that mixes in training results. Both are linked inline from the Markdown deck. The live 1920x1080 layout is [Harvey visual review](http://127.0.0.1:5173/s/harvey-visual-review?p=1).

Assets and editable layout live under `open-slide-deck/slides/harvey-visual-review/`. The original SVGs remain unchanged. The architecture uses independently revealed source regions, not a flattened slide image. Its embedded source labels are not native editable text; the headline, commentary, citation, and reveal wrappers are editable React elements. Keep new explanatory diagrams as native components when individual node movement is required.

Source resource qualification added: generation cost rises for six of seven models. The root-model identities are held across the figure's comparison, with fixed Qwen3.6-35B-A3B subagents in the RLM condition. Do not call it equal compute.

Pending: Rajiv's style review before extending this visual pattern across the deck. Other @@ comments remain in place for the next pass.

The harness comparison is a seven-model average, 23.3% versus 62.4% rubric criteria passed on 50 synthetic holdouts. The Qwen training comparison, 29.9% versus 63.0%, is separate. Neither measures the fraction of completely successful diligence tasks. The GLM SFT comparison uses a different holdout and is omitted from the main sequence.

This file is the disposition record. Update pending items here rather than creating another review file.
