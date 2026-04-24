# Claude System Prompt Evolution (Apr 2025 – Apr 2026)

A visual study of how Anthropic's Claude system prompts changed over a 12-month period, and what those changes reveal about the relationship between model capability and prompt complexity.

## The Question

> As language models improve, do their system prompts get simpler?

One intuition says yes — better models need less hand-holding. The data tells a more nuanced story.

## How to Run

Just open `index.html` in any browser. No server, no dependencies, no install needed.

```bash
open index.html
# or
python3 -m http.server 8080  # then visit http://localhost:8080
```

## What's Inside

- **Interactive timeline** — click any version to explore what changed
- **Stacked bar chart** — change volume by category across versions
- **Categorized change log** — each change tagged as Safety, Tools, Behavioral, Removed, Style, or Knowledge
- **Key findings** — six insight cards summarizing the main conclusions

## Versions Covered

| Version | Date | Notes |
|---------|------|-------|
| Claude 3.7 | Early 2025 | Baseline |
| Claude Opus 4 / Sonnet 4 | May 22 2025 | First Claude 4 family |
| Claude 4.5 | Nov 2025 | Soul document moved into training |
| Claude 4.6 | Feb 2026 | Extended thinking, 1M context |
| Claude Opus 4.7 | Apr 16 2026 | New tokenizer, tool_search, XML safety blocks |

## Main Findings

1. **Prompts grew, not shrank.** Claude 4's prompt is ~16,700 words (~13× longer than OpenAI's comparable prompt). By Opus 4.7, the same content uses 1.46× more tokens due to tokenizer changes.

2. **Behavioral patches get retired into training.** Explicit workarounds for letter-counting, puzzle constraints, and verbose reassurances were removed as training absorbed those behaviors. This supports the theory — for this category.

3. **Structural scaffolding expands.** Tool descriptions, safety XML blocks, and capability configuration keep growing regardless of model improvement.

4. **The soul document moved to training.** Claude 4.5's 14,000-token "soul overview" values document was incorporated into the training run, not the system prompt — a deliberate choice to bake values in rather than specify them at runtime.

5. **Tone calibration moved to training.** Opus 4.7 dropped "genuinely," "honestly," and pushy follow-up language from the prompt. The model's warmth/directness is now trained in.

## Sources

- Simon Willison's blog: [May 2025](https://simonwillison.net/2025/May/25/claude-4-system-prompt/) · [Apr 2026](https://simonwillison.net/2026/Apr/18/opus-system-prompt/) · [git timeline](https://simonwillison.net/2026/Apr/18/extract-system-prompts/)
- Anthropic: [Published system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts) · [System cards](https://www.anthropic.com/system-cards)
- GitHub: [simonw/research](https://github.com/simonw/research) · [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts)

## Extending This

To go deeper:
- Clone `simonw/research` and `git diff` between prompt snapshots for raw token counts
- Use [Simon's token counter tool](https://tools.simonwillison.net/claude-token-counter) to compare prompts directly
- The Piebald-AI repo tracks Claude Code's prompt across 159+ versions with a full changelog
