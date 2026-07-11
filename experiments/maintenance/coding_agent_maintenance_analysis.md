# Coding Agent Maintenance Workload

As of 2026-07-08, this first-pass analysis treats merged PRs as the main contribution unit, bug-fix PRs as PRs with bug/regression-style labels or `fix:`/`hotfix:`-style titles, and active contributors as unique non-bot merged-PR authors.

## Headline

Across the OpenHands public ecosystem repos in this analysis, the last 12 months show **5,679 merged PRs**, **1,778 bug-fix PRs**, and roughly **2,388,178 changed lines** flowing through review. These repos currently contain about **1,050,773 tracked code/config/test lines** across **5,846 files** after excluding common generated, lock, binary, and vendor paths.

The near-term pace is not small either: the last 3 months alone account for **2,007 merged PRs** across the OpenHands repos in this set.

## OpenHands Repos

| Repo | Window | Merged PRs | Bug-fix PRs | Human PR contributors | Commits | Additions | Deletions | Current code LOC |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| [OpenHands main](https://github.com/OpenHands/OpenHands) | 3mo | 593 | 227 (38%) | 46 | 578 | 168,416 | 201,604 | 404,261 |
| [OpenHands main](https://github.com/OpenHands/OpenHands) | 6mo | 1,256 | 477 (38%) | 79 | 1,199 | 367,283 | 327,636 | 404,261 |
| [OpenHands main](https://github.com/OpenHands/OpenHands) | 12mo | 2,600 | 866 (33%) | 179 | 2,341 | 756,190 | 494,094 | 404,261 |
| [Agent Canvas](https://github.com/OpenHands/agent-canvas) | 3mo | 719 | 270 (38%) | 31 | 733 | 253,617 | 191,083 | 246,466 |
| [Agent Canvas](https://github.com/OpenHands/agent-canvas) | 6mo | 719 | 270 (38%) | 31 | 733 | 253,617 | 191,083 | 246,466 |
| [Agent Canvas](https://github.com/OpenHands/agent-canvas) | 12mo | 719 | 270 (38%) | 31 | 733 | 253,617 | 191,083 | 246,466 |
| [Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 3mo | 643 | 213 (33%) | 47 | 632 | 153,113 | 32,574 | 333,281 |
| [Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 6mo | 1,209 | 385 (32%) | 67 | 1,188 | 252,810 | 50,479 | 333,281 |
| [Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 12mo | 2,036 | 573 (28%) | 90 | 2,026 | 461,753 | 106,872 | 333,281 |
| [OpenHands CLI](https://github.com/OpenHands/OpenHands-CLI) | 3mo | 52 | 13 (25%) | 15 | 52 | 4,862 | 1,221 | 66,765 |
| [OpenHands CLI](https://github.com/OpenHands/OpenHands-CLI) | 6mo | 196 | 46 (23%) | 25 | 195 | 50,057 | 11,553 | 66,765 |
| [OpenHands CLI](https://github.com/OpenHands/OpenHands-CLI) | 12mo | 324 | 69 (21%) | 31 | 353 | 99,442 | 25,127 | 66,765 |

## Comparison Repos

These are not perfect apples-to-apples comparisons: product scope, repo splits, release age, private/internal work, and label hygiene differ. They are useful as peer harness spot checks that serious coding agents accumulate a large operational footprint.

| Repo | Window | Merged PRs | Bug-fix PRs | Human PR contributors | Commits | Additions | Deletions | Current code LOC |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| [OpenAI Codex](https://github.com/openai/codex) | 3mo | 2,949 | 283 (10%) | 163 | 2,880 | 1,000,804 | 400,386 | 1,324,542 |
| [OpenAI Codex](https://github.com/openai/codex) | 6mo | 5,441 | 736 (14%) | 243 | 5,354 | 2,093,841 | 1,013,598 | 1,324,542 |
| [OpenAI Codex](https://github.com/openai/codex) | 12mo | 7,688 | 1,202 (16%) | 398 | 7,579 | 2,582,509 | 1,226,299 | 1,324,542 |
| [OpenCode](https://github.com/anomalyco/opencode) | 3mo | 2,648 | 999 (38%) | 158 | 3,920 | 1,048,468 | 740,265 | 1,047,601 |
| [OpenCode](https://github.com/anomalyco/opencode) | 6mo | 4,340 | 1,775 (41%) | 495 | 7,976 | 1,627,386 | 980,989 | 1,047,601 |
| [OpenCode](https://github.com/anomalyco/opencode) | 12mo | 5,700 | 2,304 (40%) | 892 | 13,631 | 1,820,270 | 1,039,068 | 1,047,601 |
| [Hermes](https://github.com/NousResearch/hermes-agent) | 3mo | 6,309 | 4,381 (69%) | 221 | 11,470 | 2,129,953 | 406,723 | 1,746,187 |
| [Hermes](https://github.com/NousResearch/hermes-agent) | 6mo | 7,729 | 5,286 (68%) | 314 | 14,876 | 2,535,314 | 455,725 | 1,746,187 |
| [Hermes](https://github.com/NousResearch/hermes-agent) | 12mo | 7,736 | 5,288 (68%) | 314 | 14,936 | 2,537,400 | 455,992 | 1,746,187 |

## Current Code Surface

| Repo | Code LOC | Nonblank code LOC | Code files | Tracked text lines | Top languages by lines |
|---|---:|---:|---:|---:|---|
| [OpenHands main](https://github.com/OpenHands/OpenHands) | 404,261 | 350,708 | 2,425 | 413,156 | Python 226,695, TypeScript 136,308, JSON 29,171, YAML 3,703, TMPL 2,829 |
| [Agent Canvas](https://github.com/OpenHands/agent-canvas) | 246,466 | 222,918 | 1,738 | 249,778 | TypeScript 196,659, JSON 34,529, MJS 7,744, YAML 2,916, Python 824 |
| [Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 333,281 | 274,384 | 1,281 | 346,051 | Python 319,709, YAML 7,364, JavaScript 1,558, JSON 1,078, CSS 739 |
| [OpenHands CLI](https://github.com/OpenHands/OpenHands-CLI) | 66,765 | 56,014 | 402 | 68,503 | Python 51,041, SVG 12,762, YAML 1,662, TCSS 441, Other 218 |
| [OpenAI Codex](https://github.com/openai/codex) | 1,324,542 | 1,219,349 | 4,696 | 1,358,160 | Rust 1,119,613, JSON 120,315, Python 35,405, TypeScript 9,174, SNAP 8,723 |
| [OpenCode](https://github.com/anomalyco/opencode) | 1,047,601 | 989,604 | 5,022 | 1,284,379 | TypeScript 584,661, JSON 393,810, CSS 40,284, SVG 16,403, YAML 2,891 |
| [Hermes](https://github.com/NousResearch/hermes-agent) | 1,746,187 | 1,485,429 | 4,659 | 2,190,088 | Python 1,370,357, TypeScript 283,683, XSD 19,730, YAML 11,055, BST 7,756 |

## Suggested Story

1. It is straightforward to demo a coding agent, but maintaining one quickly becomes platform engineering: sandboxing, auth, model/provider plumbing, browser and terminal control, UI, telemetry, evaluation, security, release automation, and integrations.
2. Bug fixes are not a rounding error. In mature agent repos, a material share of merged work is fixes, regressions, compatibility repairs, and reliability work.
3. The codebase size matters because every new feature touches many maintenance surfaces: tests, docs, packaging, CI, deployment, runtime isolation, and user support.
4. Contributor count matters because this is not a solo weekend project once users depend on it. The review, triage, and release load spreads across a real community.

## Method Notes

- GitHub GraphQL search was used for merged PRs, PR authors, labels, additions, deletions, and changed files.
- GitHub REST commit listing was used for commit counts and commit-author counts.
- LOC was counted from shallow clones with `git ls-files`, excluding common lockfiles, generated/vendor directories, binary assets, and docs from the `code LOC` number. `tracked text lines` keeps docs/config-like text after the same generated/vendor exclusions.
- Bug-fix PR classification is heuristic: labels containing bug/regression/defect/crash, or titles beginning with `fix`, `bugfix`, `hotfix`, or `repair`. It will miss unlabeled fixes and may include a few false positives.
- `OpenCode` resolves through GitHub to `anomalyco/opencode`; `Hermes` is `NousResearch/hermes-agent`.
