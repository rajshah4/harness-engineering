# ODSC Harness Engineering — asset library

The presentation files are delivery formats. The durable visual source lives in
`open-slide-deck/slides/odsc-harness-engineering/assets/` so that a slide can be
rebuilt for Keynote/PPTX, Open Slide, or another editor without extracting
images from an exported deck.

## Working conventions

- Keep the original downloaded or captured visual where possible; do not
  replace it with a screenshot of a slide.
- Use descriptive filenames. The filename should identify the source and the
  claim it supports.
- A PPTX should embed its images for portability, but it should always use an
  image from this library.
- Preserve source URLs, capture dates, benchmark version, and relevant caveats
  in the PPTX speaker notes.
- Keep editable source data or chart code next to an asset when we make a chart
  ourselves. Source screenshots remain screenshots on purpose.

## Curated evidence assets

| Asset | What it supports | Primary source |
| --- | --- | --- |
| `snowflake-data-eng-bench-cost-quality.png` | A data-native harness can improve quality and cost on a domain-specific task set. | Snowflake, [Data-Eng-Bench](https://www.snowflake.com/en/blog/engineering/data-eng-bench-data-engineering-agent-benchmark/) |
| `terminal-bench-2-claude-opus-4-6.png` | The same model has a large performance range across harnesses. | [Terminal-Bench 2.0](https://www.tbench.ai/?version=2.0) |
| `openbench-gpt-5-6-complete.png` | The same model has different solve rates, latency, and token use across seven harnesses. | [OpenBench](https://openbench.run/openbench/) |
| `harness-bench-paper-table.png` | Configurable harnesses vary in completion, process quality, token use, and turns. | [Harness-Bench paper](https://arxiv.org/html/2605.27922v1) |
| `nvidia-avo-architecture.webp` | A custom harness can sustain long-horizon experimental work. | [NVIDIA AVO](https://developer.nvidia.com/blog/nvidia-avo-reaches-100-on-arc-agi-3-demonstrating-a-frontier-level-general-purpose-architecture-for-long-horizon-autonomous-agents/) |
| `production-coding-agents-pr-volume.png` | Production agent platforms carry ongoing maintenance and technical-debt work. | [OpenHands analysis](https://www.openhands.dev/blog/coding-agents-and-technical-debt) |
| `anthropic-dynamic-workflows.png` | Dynamic workflows change the orchestration layer, not just the model. | [Anthropic dynamic workflows](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) |
| `harness-focus-*.png` | Four different design bets: memory, minimal loop, programmability, composability. | Project links recorded in the Open Slide page and speaker notes. |

## Original Google Slides bridge

The original Google deck remains the source for legacy layouts and original
slide graphics that are already right. When a slide is carried into the PPTX
working deck, retain or recapture the source visual into this library rather
than relying on a flattened slide export.

Google source: <https://docs.google.com/presentation/d/1-_pGXiN2F7dFShvSAJm6Re33tgCljlgGhf63DJcm1II/edit>
