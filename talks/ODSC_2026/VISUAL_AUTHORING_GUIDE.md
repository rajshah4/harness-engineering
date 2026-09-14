# Reusable visual authoring guidance

## Start from the working Markdown

The single working copy is [`storyboard/deck.md`](storyboard/deck.md).
The former Codex working path is a symbolic link here after the September 11
cleanup. Keep stable slide IDs; do not create a second authoring copy.

Use the existing `visual-pass` comment for preview URL, layout, motion and review
status. Put speaking detail in [`storyboard/talk-track.md`](storyboard/talk-track.md), grouped by stable slide ID. Keep citations next to the
image and include version, figure number and material comparison caveats.

## Design that Rajiv approved

- 1920 x 1080 canvas, cream `#F9F1D9`, dark text `#20201E`, blue `#2E70FF`.
- Arial heading: 62px, weight 700, line-height 1.13, x=100, y=65, width=1720.
- Teach a coherent concept per slide. Use plain topic titles for definitions and setup; use factual result titles only when the evidence supports them. Combine related explanations instead of splitting a concept into hook, prediction, reveal, and takeaway slides.
- Body about 36px. Leave generous gaps. Cut copy before reducing type.
- Keep `@rajistics` as text, 25px, muted `#999386`, right=100, bottom=30.
- Large primary-source figures take priority over redrawn benchmark charts.
- Preserve chart axes, legend, units and conditions. Do not turn token counts
  into dollar costs or imply comparisons that the experiment did not make.
- No decorative panel grids. Relationships and connectors must be unambiguous.

## Keep the slide decomposable

Headlines, captions, citations and emphasis stay editable React text. Store each
source figure separately. Never flatten the whole slide into one image. Native
diagrams and tables use separate inspectable elements. Keep source SVGs where
available; otherwise retain the original PDF and high-resolution figure crops.

`build_full_visual_review.cjs` contains the reusable flow, comparison and table
layouts used for the earlier 47 native visuals. It emits standalone SVG assets
and editable JSX. The earlier approved Harvey and tools/context examples remain separate components.
The current full deck uses their source figures alongside the revised Markdown explanations.
Preserve standalone examples when regenerating the main sequence.

For OpenSlide API details, read
`open-slide-deck/.agents/skills/slide-authoring/SKILL.md` and the relevant primitive
reference before changing code. Do not duplicate framework instructions here.

## Builds and review

Use a presenter-controlled reveal when it changes the order of reasoning. Keep
the original evidence visible and reveal a separate takeaway or highlight.
Avoid automatic motion. A fully revealed slide must make sense in the overview.

Check the actual browser rendering, including initial and revealed states.
Inspect image readability, heading wrapping and every caption-to-figure gap.
`npm run build` is a code check, not a visual check.

Regeneration reads `storyboard` by default, or takes the working Markdown folder
as its first argument. It requires `sharp` or `SHARP_MODULE`. Reconcile the
headline spine and preview page numbers after adding or moving stable IDs.

## September 9 example: Model Eats the Stack

`slides/model-eats-stack-review` contains two source-first slides, imported into
the main visual review. Assets include the original arXiv PDF and figure crops.
From the PDF, render pages 2 and 4 with Poppler at a 4200px maximum dimension.
Crop x=270, y=435, width=2720, height=865 from each rendered page. These crops keep
the chart legends, axes and panel labels while excluding the surrounding prose.
Do not stretch the resulting 2720 x 865 images. Each slide has separate editable
text and one click-to-reveal takeaway. The TAG baseline limitation and held-out
sample definition remain visible on their respective slides.

## September 11 editing contract

`deck.md` is authoritative for titles and visible body text. Each slide declares
`review-layout` as `text`, `figure`, `figure-caption`, or `table`. Put extra
speaking detail in `storyboard/talk-track.md`, grouped by stable slide ID. The generator must display every visible
paragraph, and must fail on overflow rather than silently selecting the first few.
Do not restore hard-coded body overrides or discard text on an image slide.

Introduce the component and its operation before its result. Use the actual task,
configuration change, and observed behavior. Avoid advertising language and abstract
subjects that supposedly cause performance changes. Keep system prompts distinct
from repository memory, and define terms using concrete examples.

## Preserve external empirical evidence

Keep strong results from other papers in the main workshop, alongside local experiments.
Shorten repeated framing before cutting distinct empirical findings. For each technique,
retain useful evidence about the tested task, intervention, baseline, metric, outcome,
and limitations. Include null or negative findings when they define the limits of a claim.
Distinguish peer-reviewed papers, preprints, vendor evaluations, and workshop demonstrations.
Pin paper versions when results differ across versions. Do not optimize for slide count
at the expense of the data participants need to assess a technique.

## Editing and deletion decisions

Use the annotated pre-consolidation version as the baseline. Reword titles and explanations for clarity, preserve distinct empirical results, and keep the introductory motivation and roadmap. Mark proposed cuts with a reason. Do not delete, combine, or reorder slides without Rajiv selecting those changes. A wording pass is not authorization for a structural cut. The review includes the original reserves at the end.

## Preserve the intended point during a wording pass

Before rewriting a slide, identify what Rajiv is using it to explain or motivate. Preserve that point and its role in the sequence. Plain language does not mean replacing a supported finding with a generic topic label. Retain useful result magnitudes, comparisons, tradeoffs, and mechanisms. If evidence does not support the intended point, repair or replace the evidence and explain the limitation without turning the slide into a different lesson. Keep source-verification bookkeeping in review notes, not as the main slide message.

## September 11 correction: minimal supporting text

Rajiv’s edited Harvey result slide is the density reference: the figure carries the evidence, the headline states the intended finding, and the supplementary copy is one short, specific sentence. Default to 10–20 supporting words on evidence slides, and omit the sentence if it only repeats the headline. Add more only when the slide needs it to explain the mechanism. Put teaching commentary and extended methodology in talk-track notes. Keep material qualifications concise beside the source.

Preserve the argument, including counterexamples. The Model Eats the Stack figure is evidence that the human-designed custom workflow underperformed Codex with GPT-5.6 Sol. Do not replace that finding with generic advice about model upgrades or retesting. Check every proposed title against the actual comparison and its place in Rajiv’s story. Preserve his latest edits and avoid another blanket rewriting pass when correcting a specific slide.

## Full-deck concise pass

The working sequence now incorporates Rajiv’s own roadmap edit and the “Consequences of a closed harness” title. That slide warns about lock-in: preserve its early motivational role. Do not replace it with a memory-definition slide. Existing backup text belongs in the archive, not repeated image blocks in deck.md. Retain workshop instructions needed to perform the task, but keep chart commentary brief. Preserve material comparison limits on the slide or beside its source, and keep extended explanation in speaker notes. Do not remove or reorder slides during a wording pass.
