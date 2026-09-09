# OpenSlide presentation inventory and migration plan

Inspected September 7, 2026 against installed `@open-slide/core` 1.19.1 in the ODSC project. This is an inventory of our local implementation, not a claim about the latest upstream release. The project uses a 1920 x 1080 canvas.

Current phase: continue developing talking points and structure in Markdown. Animation ideas are provisional annotations. No migration date or frozen content is implied by this plan.

Showcase to inspect: the OpenSlide homepage features Sam Lambert of PlanetScale at Cursor Compile 26. Review the actual presentation for ambitious motion examples before treating the built-in transition recipes as the creative limit. Record useful timestamps and the teaching purpose of each effect after viewing.

## What we can use

| Possibility | Support in our project | Good use in this talk |
| --- | --- | --- |
| Reveal text, images, or a result one click at a time | Built-in Steps and Step | Prediction first, evidence next, conclusion last |
| Undo a reveal with the back key | Built-in step navigation | Revisit the evidence during questions |
| Fade or gently move between pages | Built-in SlideTransition with configurable keyframes | A quiet dissolve between most pages |
| Carry the same object into the next page | Built-in MorphElement and morph transition | Expand the model call into its context, or move a memory item into a saved file |
| Highlight, dim, or zoom a source chart | Custom React/CSS or composed pages with morph | Focus on matched benchmark rows while preserving original source labels |
| Animate bars, paths, counters, or a scatter plot | Custom SVG/CSS/browser animation | Explain an observed result, using real values and fixed axes |
| Replay an agent trace | Custom sequence built from saved events | See tool calls, evidence arrival, verification, and stopping |
| Switch between two policies | Custom React state and controls | Compare routing or context policies with prepared outcomes |
| Live sliders and simulations | Custom implementation | Explore a conceptual budget tradeoff, clearly labeled illustrative |
| Video clips | Standard browser video elements | A short recorded Agent Canvas interaction with a still fallback |
| Presenter notes and next-build preview | Built-in presenter route and step synchronization | Know which reveal is coming while keeping cues off the projector |
| Fullscreen and keyboard navigation | Built-in | Arrow/Space through builds and pages; F fullscreen; Esc exits |
| Reduced motion | Built-in for steps and page transitions | Instant changes when reduced motion is requested; custom animations need their own handling |
| Static export | Built-in raster PPTX; print/export code paths | Final states or deliberately selected static story frames |

The six documented transition recipes are Rise, Dissolve, Settle, Bloom, Fall, and Breath. These are ready-to-use code recipes, not a verified animation-picker menu. Morphs can interpolate position, size, corner radius, and colors for matching objects. They do not automatically turn one arbitrary chart or image into another.

## A small vocabulary for this presentation

Use **builds** for changes within a slide, **transitions** for changes between slides, and **interactive** for controls that let the presenter choose a branch.

The default is a static slide and a cut. Use a short dissolve when it helps pacing. Reserve morphs for objects whose identity matters across the change. A source screenshot with two successive highlights can be more useful than a newly animated chart.

Make builds advance on a click. Most should take two to four clicks, with each step ending in a readable state. Longer trace explanations can use six steps. Once the visual reaches the point being discussed, it should stop moving.

Keep the normal headline visible. On a prediction slide, use a neutral question and delay the answer until the reveal. Do not show the answer in a headline while asking the room to predict it.

## Instructions inside the Markdown deck

Add one HTML comment after the stable slide marker. It stays out of ordinary rendered slide content and travels with the slide when we reorder it. Edit the plain-language values directly. This is an authoring convention we will implement during migration; OpenSlide does not automatically read it today.

```markdown
<!-- new-slide: workshop-2-result -->
<!-- presentation
status: proposed
key_point: A tool can compress a repeated evidence-gathering workflow.
initial: Show the three tool interfaces with outcomes hidden.
builds:
  1: Reveal evidence scores together.
  2: Reveal elapsed time and tool calls together.
  3: Highlight the task-shaped tool and reveal the conclusion.
animation: Fade each group in. Keep the three lanes fixed.
transition: cut
control: presenter clicks; back reverses one step
static: Show the full comparison and conclusion.
notes: Scores describe the rubric; tool calls can contain different amounts of work.
-->
```

Only `key_point` is needed to start. Add `initial`, `builds`, `animation`, and `transition` when an idea is ready. Use `status: proposed`, `approved`, `built`, or `rehearsed` to track progress. If there is no motion, write `animation: none`.

`notes` captures speaking cues and interpretation. Existing Source lines remain the evidence record. Keep the headline and body as ordinary Markdown. For complex visuals, reference the numbered item in `animation-visual-backlog.md` instead of pasting a long production brief into the slide.

## First migration sample

1. A static source-chart slide establishes the title, image, source, and editable content conventions.
2. Workshop 2's result uses three click-controlled reveals.
3. Workshop 3's stale-context example moves from instruction to code choice to green tests to external failure.
4. The agent-loop diagram keeps the components fixed while highlighting the current action.
5. The compaction example carries retained facts into a continuation record, with a static before/after export.

Review this sample in presenter mode before applying its patterns across the master deck. The first success criterion is whether the motion helps you speak at your pace.

## Migration and export rules

- Markdown remains the source for order, headings, body, citations, and these instructions. Preserve existing stable IDs.
- Generate page order and speaker notes from that same ordering. OpenSlide's notes array is indexed by page, so independently reordering it would repeat our earlier notes mismatch.
- A conceptual slide may become several OpenSlide pages for a morph. Maintain a mapping from the stable Markdown ID to generated pages and notes.
- Keep original images at full quality and retain editable text separately. Import assets into the OpenSlide project's asset directories during migration.
- Use built-in Steps for ordinary reveals. Custom simulations and replays need explicit reset, replay, navigation, and reduced-motion behavior.
- Entering a built-in stepped page forward starts its build. Jumping from the overview or arriving backward shows all steps. Rehearse both paths, especially for audience predictions.
- Thumbnails, presenter previews, and print renders need settled states. Custom entrance animations should run only on the active audience page.
- The installed PPTX exporter rasterizes each page. Editable PPTX should continue to be generated from content and assets separately; animation export is not a round-trip promise.
- A final-frame export is insufficient when the teaching point depends on before/after. Use the `static` field to specify two or more frozen frames when needed.

## Local references inspected

- `talks/ODSC_2026/open-slide-deck/.agents/skills/slide-authoring/SKILL.md`
- Its `references/steps.md`, `references/transitions.md`, and `references/morph.md`
- `node_modules/@open-slide/core/src/app/lib/sdk.ts`
- `node_modules/@open-slide/core/src/app/routes/presenter.tsx`
- `node_modules/@open-slide/core/src/app/lib/export-pptx.ts`

The existing animation backlog contains the longer concept inventory. This document defines the presentation controls and how those ideas attach to individual slides.
