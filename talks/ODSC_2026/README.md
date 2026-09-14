# Harness engineering talk — start here

**Review the latest working deck: [storyboard/deck.md](storyboard/deck.md).**

This is the single working source as of September 14, 2026. The saved checkpoint is tagged `odsc-deck-2026-09-14` in Git.

## Current working files

- [Deck](storyboard/deck.md): canonical slide order and visible content.
- [Talk track](storyboard/talk-track.md): speaker notes keyed by stable slide ID.
- [Headline spine](storyboard/headline-spine.md): compact narrative outline.
- [OpenSlides preview](http://127.0.0.1:5173/s/odsc-full-visual-review?p=1): generated from the canonical deck.
- `build_full_visual_review.cjs`: regenerates the OpenSlides version.

The current preview contains 245 pages. Pages 1–146 form the talk and workshop. Pages 147–245 are reserves.

## Review options

- [Complete Markdown deck](storyboard/deck.md) and [speaker notes](storyboard/talk-track.md).
- [Headline sequence](storyboard/headline-spine.md) for a quicker narrative review.
- [Full OpenSlide visual draft](http://127.0.0.1:5173/s/odsc-full-visual-review?p=1), when the local preview is running.
- [Visual review notes](storyboard/review-additions/visual-pass.md).

To start the existing visual preview:

```bash
cd /Users/rajiv.shah/Code/harness-engineering/talks/ODSC_2026/open-slide-deck
npm run dev
```

## Supporting material

- `storyboard/review-additions/`: research, accepted/rejected ideas, review notes, and visual sources. The September 11 TWIML note is supporting research, not an assumed deck revision.
- [Visual authoring guide](VISUAL_AUTHORING_GUIDE.md) and [asset library](ASSET_LIBRARY.md).
- Research, workshop outlines, script, and practice feedback remain alongside this page as supporting material. They are not alternative current decks.
- `open-slide-deck/`: the preview application. The current generated deck is `slides/odsc-full-visual-review`; the smaller review decks supply source figures still referenced by `deck.md`.
- [Archived drafts and experiments](archive/2026-09-11-cleanup/README.md): all older PowerPoint/Keynote exports, inspection files, backups, and layout experiments, consolidated from both folders.

The historical archive stays local and outside the Git checkpoint because it contains 1.3 GB of superseded exports and working renders. The September 4 PowerPoint and April PDF remain source material, not the current presentation.
