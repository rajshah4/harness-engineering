# Claude System Prompt Evolution (May 2025 – Jun 2026)

A visual study of how Anthropic's Claude system prompts changed from Opus 4 through Opus 4.8 and Fable 5, with a separate Claude Code prompt-surface summary.

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
- **Stacked bar chart** — word volume by category across Opus/Fable snapshots
- **Claude Code surface card** — token counts across Piebald's tracked Claude Code prompt fragments
- **Key findings** — six insight cards summarizing the main conclusions

## Versions Covered

| Version | Date | Notes |
|---------|------|-------|
| Claude Opus 4 / Sonnet 4 | May 22 2025 | First Claude 4 family |
| Claude 4.5 | Nov 2025 | Soul document moved into training |
| Claude 4.6 | Feb 2026 | Extended thinking, 1M context |
| Claude Opus 4.7 | Apr 16 2026 | New tokenizer, tool_search, XML safety blocks |
| Claude Opus 4.8 | May 28 2026 | Latest Opus row; extracted from Anthropic's published prompt page |
| Claude Fable 5 | Jun 9 2026 | New Claude 5 / Mythos-class row; extracted from Anthropic's published prompt page |
| Claude Code v2.1.198 | Jul 1 2026 | Separate token-counted prompt surface from Piebald, not included in the word chart |

## Main Findings

1. **Prompts do not shrink monotonically.** The Opus series grows from 1,714 words in May 2025 to 3,686 words by April 2026, then the latest official-page Opus/Fable bodies fall back to roughly 2.9k words.

2. **Behavioral patches get retired into training.** Explicit workarounds for letter-counting, puzzle constraints, and verbose reassurances were removed as training absorbed those behaviors. This supports the theory for that category.

3. **Safety remains structurally dominant.** Fable 5's extracted body puts the largest share of words into refusal, child safety, user wellbeing, legal/financial scoping, and Anthropic reminder language.

4. **The soul document moved to training.** Claude 4.5's 14,000-token "soul overview" values document was incorporated into the training run, not the system prompt — a deliberate choice to bake values in rather than specify them at runtime.

5. **Claude Code is not one prompt.** Piebald's Claude Code v2.1.198 snapshot tracks 540 fragments totaling 581k tokens; the system/reminder bucket alone is 46k tokens before agent prompts, tool descriptions, skills, or reference data.

6. **Tool discovery became explicit.** Opus 4.8 adds dedicated guidance for deferred tool lookup and SKILL.md discovery before claiming a capability or personal context is unavailable.

## Sources

- Simon Willison's blog: [May 2025](https://simonwillison.net/2025/May/25/claude-4-system-prompt/) · [Apr 2026](https://simonwillison.net/2026/Apr/18/opus-system-prompt/) · [git timeline](https://simonwillison.net/2026/Apr/18/extract-system-prompts/)
- Anthropic: [Published system prompts](https://platform.claude.com/docs/en/release-notes/system-prompts) · [model overview](https://platform.claude.com/docs/en/about-claude/models/overview) · [Opus 4.8](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-8)
- GitHub: [simonw/research](https://github.com/simonw/research) · [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts)

## Extending This

To go deeper:
- Clone `simonw/research` and `git diff` between prompt snapshots for raw token counts
- Use [Simon's token counter tool](https://tools.simonwillison.net/claude-token-counter) to compare prompts directly
- Anthropic's system prompt page now renders prompt bodies from a Next.js payload; extract those payload records before counting new snapshots
- The Piebald-AI repo tracks Claude Code's prompt fragments across 224 versions with a full changelog
