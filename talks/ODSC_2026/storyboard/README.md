# ODSC deck — canonical working source

Start with [deck.md](deck.md), [headline-spine.md](headline-spine.md), and the
[visual-pass inventory](review-additions/visual-pass.md).

Speaker notes are in [talk-track.md](talk-track.md), grouped by stable slide ID.
Keep speaking detail there so the deck stays easy to scroll.

This is the single working Markdown source after the September 14 cleanup.
The former `harness-engineering-deck/latest_sept4-markdown` path is a symbolic
link to this directory. Edit here; no second copy needs refreshing.
See [the talk entry page](../README.md) for current review and archive links.

The current 245-page workshop draft is in
[`../open-slide-deck/slides/odsc-full-visual-review`](../open-slide-deck/slides/odsc-full-visual-review).
Pages 1–146 follow the current headline story. Pages 147–245 contain reserves. See [the headline plan](headline-story-plan.md) for the narrative structure.
Source verification and remaining layout decisions are recorded in the inventory;
this is not a final source-verified presentation.

See the [reusable visual-authoring guide](../VISUAL_AUTHORING_GUIDE.md) for the
approved design, editable layers, figure extraction and build workflow.

## Open the preview

From `talks/ODSC_2026/open-slide-deck`, run `npm ci` and `npm run dev`, then open
`http://localhost:5173/s/odsc-full-visual-review?p=1`.
The generated slide files and assets are committed, so regeneration is not
required to present or review them.

## Regeneration

`node talks/ODSC_2026/build_full_visual_review.cjs` reads this snapshot by default.
Pass a different Markdown directory as its first argument to use another copy.
The generator requires `sharp` in your tooling environment; alternatively set
`SHARP_MODULE` to its installed module path. It overwrites the generated visual
deck, so preserve any manual JSX changes before regenerating.

Primary images are kept as separate assets, not flattened full-slide screenshots.
Some source-note links point to research and local experiment files outside this
snapshot; they are provenance references, not dependencies for the slide preview.
