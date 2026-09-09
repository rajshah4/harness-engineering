# ODSC deck — September 9 visual-review snapshot

Start with [deck.md](deck.md), [headline-spine.md](headline-spine.md), and the
[visual-pass inventory](review-additions/visual-pass.md).

This is a versioned snapshot of the working Markdown, not a second live authoring
copy. The existing working copy remains in `harness-engineering-deck/latest_sept4-markdown`.
Refresh this snapshot deliberately when saving subsequent work.

The complete 220-page visual draft is in
[`../open-slide-deck/slides/odsc-full-visual-review`](../open-slide-deck/slides/odsc-full-visual-review).
It includes reserves, editable diagrams, source figures, and speaker notes.
Source verification and remaining layout decisions are recorded in the inventory;
this is not a final source-verified presentation.

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
