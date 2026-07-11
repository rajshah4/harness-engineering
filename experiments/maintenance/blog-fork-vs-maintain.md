# You Are Free to Fork, but Forking Isn't Free

Every customer lately tells me how an amazing group of developers within their organization has built an in-house coding agent. Let me explain why this is harder than it looks. (Flashback to when companies were going to train their own GPTs.)

Remember, software is easy to build (especially with coding agents), but maintenance and technical debt always come due. So while that amazing group of developers is having fun building the agent, how are they going to feel in six months when there's a stack of bug reports from grumpy developers? Or when they see a new team build an even better product, because they forked another project, and now everyone in your organization is figuring out which tools to support?

Lucky for us, many of us build in the open, so we can bring some data into this. I pulled twelve months of public activity from four coding agent products: [OpenHands](https://github.com/OpenHands/OpenHands) (where I work), [OpenAI Codex](https://github.com/openai/codex), [OpenCode](https://github.com/anomalyco/opencode), and [Hermes](https://github.com/NousResearch/hermes-agent). I looked at merged PRs, bug-fix share, lines changed, and current code size. The goal here is to understand what exactly it takes to keep a coding agent working after the demo.

## The headline numbers

Let's start with some summarized numbers. One thing up front: OpenHands ships as four public repos (the app, the Agent Canvas UI, the SDK, and the CLI), while the comparison products concentrate in a single flagship repo, so I sum the OpenHands repos and count the others by their main repo. Feel free to quibble or just do this analysis yourself; I am confident the point will still be the same.

| Product | Merged PRs (12mo) | Bug-fix PRs | Changed lines | Current code size |
|---|---:|---:|---:|---:|
| OpenHands (4 repos) | 5,679 | 1,778 (31%) | ~2.4M | ~1.05M lines |
| OpenAI Codex | 7,688 | 1,202 (16%) | ~3.8M | ~1.32M lines |
| OpenCode | 5,700 | 2,304 (40%) | ~2.9M | ~1.05M lines |
| Hermes | 7,736 | 5,288 (68%) | ~3.0M | ~1.75M lines |

Every product here merges thousands of PRs a year and carries a codebase over a million lines. And a large fraction of that merged work is not features. It's bug fixes, which run from 16% at Codex to 40% at OpenCode, with OpenHands at 31%. (Hermes reads higher still, but this could just be labeling conventions, so don't read too much into it.)

It's interesting that OpenHands and OpenCode were built by different teams, in different languages (Python-first vs TypeScript-first), with different architectures, and they landed within a rounding error of each other: 5,679 vs 5,700 merged PRs, 1.05M vs 1.05M lines. It's a strong indicator of what it takes to build and maintain a production coding agent.

## A coding agent is never just one codebase

"A coding agent" sounds like one program. In practice it's a product family made of several different components. Take a look at how OpenHands is laid out publicly:

| Piece | What it is | Code size | Merged PRs (12mo) |
|---|---|---:|---:|
| [OpenHands app](https://github.com/OpenHands/OpenHands) | The agent application and server | 404K lines | 2,600 |
| [Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | The agent runtime underneath everything | 333K lines | 2,036 |
| [Agent Canvas](https://github.com/OpenHands/agent-canvas) | The UI for working with agents | 246K lines | 719 |
| [OpenHands CLI](https://github.com/OpenHands/OpenHands-CLI) | The terminal interface | 67K lines | 324 |

Other coding agents have similar divisions. Codex's repo holds the CLI, dozens of core runtime crates, an app server, MCP support, and Python and TypeScript SDKs. OpenCode's `packages/` directory includes `core`, `server`, `cli`, `desktop`, `tui`, `web`, two SDKs, and a plugin system.

On top of this, growth is accelerating. Codex grew from about 124 merged PRs a month in mid-2025 to around 1,000 a month a year later. Hermes went from a near-empty repo to roughly 2,000 merged PRs a month within months of getting serious.

## What a fork actually costs

Forking gives you the advantage of not starting from zero. But when you fork, you don't just take the code. You take on the delta between your fork and everything upstream does next.

Say you forked the OpenHands app twelve months ago and never merged from upstream. You'd now be **2,600 merged PRs behind**, including **866 bug fixes** you don't have: crashes, regressions, security patches, and model-compatibility repairs that 179 contributors found and fixed while your team was busy with your custom features. And that's just the app. The SDK underneath it moved another 2,036 PRs in the same window, so the real gap between your fork and current upstream is over **4,600 PRs**, about thirteen a day, every day, for a year.

Your options at that point are all bad:

1. **Rebase onto upstream.** Now you're re-resolving conflicts against a year of changes to the same core files your customizations touch. This is weeks of work, and it recurs.
2. **Cherry-pick the fixes you need.** Now someone on your team is reading upstream's merge queue, a dozen-plus PRs a day, deciding what applies. That's a standing job, not a task.
3. **Go it alone.** Now you're maintaining a coding agent, and the first table says what that costs: 5,000 to 8,000 merged PRs a year, a third of them fixes, across a million-plus lines of code.

None of this means forking is wrong. Sometimes a forked product with some customization is all you need. But with coding agents, I am warning folks: this is a very unfinished area.

## What to do instead

The good news is that the projects moving this fast also invest in extension points, precisely because they don't want a thousand divergent forks. Before you fork, make sure you take advantage of these:

- **Configuration and system prompts.** A surprising amount of "we need our own agent" is really "we need our own prompt, tools, and defaults." Most agents let you change all three without touching core.
- **MCP servers.** If your customization is "the agent needs to talk to our internal systems," that's a tool server, not a fork. It survives every upstream release untouched.
- **Skills and plugins.** Packaged expertise the agent loads on demand. Again, zero merge conflicts, ever.
- **Build on the SDK, not a fork of the app.** If you genuinely need a different agent, this is what the SDK layer is for (OpenHands SDK, Claude Agent SDK). It's a supported interface with compatibility guarantees, and those 2,036 PRs a year of runtime maintenance keep happening on upstream's payroll instead of yours.

Remember: if you are going to maintain your own coding agent, plan to set aside time for several engineers who will own tracking upstream as part of their actual job. There is no free lunch with forking.

## Method notes and caveats

- Data pulled 2026-07-08 via the GitHub GraphQL and REST APIs. Merged PRs are the unit of contribution; contributor counts exclude bots. Contributor counts are per-repo and can't be summed across repos without double counting, so I quote them per-repo only.
- Products are compared at the product level: OpenHands is the sum of four public repos; Codex, OpenCode, and Hermes are measured by their flagship repo. Their totals are therefore understated to the extent their products span private or additional repos.
- Bug-fix classification is heuristic: bug/regression/defect-style labels or `fix:`/`hotfix:`-style titles. It misses unlabeled fixes and catches some false positives, and label hygiene varies by project, so compare shares directionally rather than precisely.
- Code size counts tracked code, config, and test lines from shallow clones, excluding lockfiles, generated code, vendored dependencies, and binary assets.
- These products differ in scope, age, and how much work happens privately, so this is a sanity check, not a ranking. The point isn't which agent has more PRs. It's that all of them run at a pace no fork can casually track.

## Sources

- OpenHands app: https://github.com/OpenHands/OpenHands
- OpenHands Software Agent SDK: https://github.com/OpenHands/software-agent-sdk
- OpenHands Agent Canvas: https://github.com/OpenHands/agent-canvas
- OpenHands CLI: https://github.com/OpenHands/OpenHands-CLI
- OpenAI Codex: https://github.com/openai/codex
- OpenCode: https://github.com/anomalyco/opencode
- Hermes: https://github.com/NousResearch/hermes-agent
- Underlying data: `repo_activity_summary.csv`, `repo_monthly_activity.csv`, and `repo_loc_summary.csv` in this directory
