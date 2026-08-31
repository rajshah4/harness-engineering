# Open Slide workflow for the ODSC deck

We are using [Open Slide](https://github.com/1weiho/open-slide) as the working format for the ODSC harness-engineering deck. The original Google Slides deck remains a useful source and visual reference, but future design and content work should happen in the code-native deck:

`talks/ODSC_2026/open-slide-deck/slides/odsc-harness-engineering/index.tsx`

## Why Open Slide

- **Highly visual slides are easier to build precisely.** Each page is a 1920×1080 React canvas, so charts, diagrams, dense evidence, animation, and unconventional layouts are not constrained by a slide editor.
- **It is much easier to collaborate with coding agents.** Slides are source code: changes are inspectable, repeatable, and version-controlled instead of depending on fragile UI manipulation.
- **Data and visuals can be generated from the same source.** We can build charts and diagrams directly, reuse components, and update the underlying evidence without manually redrawing a slide.
- **The deck can be interactive.** Open Slide supports browser-native animation, progressive reveals, video, and presenter/fullscreen modes while still allowing a static build for sharing.
- **It works without PowerPoint.** Authoring, review, and presenting all happen in a browser.
- **We can maintain a large master deck.** The three-hour deep-dive deck can hold all of the research and workshop material; shorter talks can later select the strongest sequence without losing the source material.

## Current migration state

- The complete 174-slide Google deck has been imported, including available speaker notes.
- The Open Slide master deck currently contains 177 pages: the 174 imported source pages plus three new native pages.
- Pages 7–15 are native React pages; pages 7, 8, and 11 were added directly in Open Slide, while the original six-page harness argument now occupies pages 9–10 and 12–15.
- The other pages are high-fidelity 1920×1080 reference images. They are immediately presentable, but their individual elements are not yet editable.
- The intended workflow is progressive conversion: rebuild a section natively when we revise it, rather than blocking on a full conversion of all 174 pages.
- The deck-specific visual system is documented in `open-slide-deck/themes/rajistics-editorial.md`.
- The current narrative sequence and provisional header registry are documented in [`open-slide-outline.md`](./open-slide-outline.md).

## Run the deck locally

From the repository root:

```bash
cd talks/ODSC_2026/open-slide-deck
npm install
npm run dev
```

Open the local URL printed by the development server, then choose **ODSC Harness Engineering**. Changes to the slide source appear with hot reload.

Useful commands:

```bash
npm run dev       # author and present locally
npm run build     # verify and create the static production bundle
npm run preview   # preview the production build
```

## Where to get more information

- [Open Slide repository and documentation](https://github.com/1weiho/open-slide)
- [`open-slide-deck/README.md`](./open-slide-deck/README.md) for workspace basics and navigation
- [`open-slide-deck/AGENTS.md`](./open-slide-deck/AGENTS.md) for the rules coding agents should follow
- [`open-slide-deck/themes/rajistics-editorial.md`](./open-slide-deck/themes/rajistics-editorial.md) for this deck's design language
- [`open-slide-outline.md`](./open-slide-outline.md) for the current sequence, provisional headers, and deferred motion ideas

When asking an agent to revise the deck, identify the page or section and ask for a **native Open Slide rebuild**. Preserve the source image only as a reference; do not claim a page is editable until its React elements have actually been reconstructed.
