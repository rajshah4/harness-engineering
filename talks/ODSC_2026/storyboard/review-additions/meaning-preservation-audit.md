# Meaning-preservation audit

Compared all 224 original slide titles with the annotated pre-cut snapshot, then reviewed the bodies and comments where the rewrite changed the claim, mechanism, or role in the workshop. Corrected 43 slides, including restored numerical result headlines. All 227 current slide IDs and their order remain unchanged. This is an editorial audit, not a new verification of every external source.

## Findings

- 010: Replaced the intended “existing harnesses are useful for everyday work” motivation with a lesson about evaluation methodology. Restored the motivation and replaced the mismatched model table with cited engineering-use evidence. The old table remains archived.
- 003 and 057: Weakened the introduction’s progression from code suggestions to task execution, and the complexity of the surrounding software. Restored both points.
- 091: Shifted from memory portability when switching harnesses to a broad memory definition. Restored portability and kept the LangChain attribution.
- 056: Replaced the historical growth of system prompts with a definition. Restored the growth/maintenance question without making it a universal trend claim.
- workshop-2-mechanism: Turned an explanation of the measured retrieval sequence into general tool-design advice. Restored the repeated API operations and the bundled tool’s role.
- 109 and 158: Weakened the multiple-attempt finding and the added-context/coordination tradeoff. Restored those links to multi-agent work.
- harness-update-regression: Replaced regression testing for mutable harness components with a generic closing exercise and dropped the sources. Restored the original lesson and citations.
- Result headlines: Replaced several empirical findings with vague topic labels. Restored the observed direction, magnitude, or comparison while retaining scope and caveats in the body.

Retained factual qualifications: the 139-fold cost spread does not identify a single cause; Anthropic’s research-quality gain and 15× token statement use different baselines; equal requested thinking budgets do not guarantee equal realized tokens; best-of-two requires a selection mechanism; repeated trials and small task sets limit generalization. These qualifications should support the lesson rather than replace it.

## Replacement evidence for slide 010

[OpenAI’s September 2025 Codex release](https://openai.com/index/introducing-upgrades-to-codex/) describes feature work, refactoring, debugging, tests, and code review. [Anthropic’s internal engineering study](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) reports 67% more merged pull requests per engineer per day after adopting Claude Code, alongside ongoing human review. The observation supports real engineering use; it is neither a controlled productivity estimate nor a task-success rate. Both primary pages were checked for this correction.

## Corrections

| Page | ID | Previous wording | Corrected wording |
| --- | --- | --- | --- |
| [2](http://localhost:5173/s/odsc-full-visual-review?p=2) | 003 | Coding agents can carry out a task across multiple steps | Coding agents carry out tasks beyond code suggestions |
| [6](http://localhost:5173/s/odsc-full-visual-review?p=6) | 057 | Claude Code architecture | Modern coding harnesses have many interacting components |
| [9](http://localhost:5173/s/odsc-full-visual-review?p=9) | 010 | Model benchmark results in a shared evaluation harness | Existing harnesses are a good starting point for everyday software tasks |
| [10](http://localhost:5173/s/odsc-full-visual-review?p=10) | 011 | Why study harness engineering? | Why look beyond a provider’s default harness? |
| [12](http://localhost:5173/s/odsc-full-visual-review?p=12) | 091 | LangChain: memory depends on how the harness uses it | LangChain: memory storage affects switching between harnesses |
| [19](http://localhost:5173/s/odsc-full-visual-review?p=19) | 017 | Same model, different harness results | An 18-point spread across harnesses using the same model |
| [21](http://localhost:5173/s/odsc-full-visual-review?p=21) | 018 | Accuracy, time, and tokens across harnesses | No harness led on accuracy, time, and token use |
| [23](http://localhost:5173/s/odsc-full-visual-review?p=23) | 016 | Accuracy and cost in a custom data workflow | With Opus 5, CoCo scored higher at lower cost |
| [24](http://localhost:5173/s/odsc-full-visual-review?p=24) | harvey-harness-result | Harvey: rubric pass rates for two review approaches | Harvey: rubric pass rate rose from 23.3% to 62.4% |
| [36](http://localhost:5173/s/odsc-full-visual-review?p=36) | pi-cache-intervention | Configure caching for the inference provider | Pi rerun: fresh input fell from 3.35M to 213K tokens |
| [41](http://localhost:5173/s/odsc-full-visual-review?p=41) | workshop-2-result | PR review: tool calls, elapsed time, and evidence | The bundled PR tool returned full evidence in less time |
| [42](http://localhost:5173/s/odsc-full-visual-review?p=42) | workshop-2-mechanism | What belongs inside a reusable tool | One bundled tool handles the repeated retrieval steps |
| [49](http://localhost:5173/s/odsc-full-visual-review?p=49) | 150 | Load tool definitions when they are needed | Uber loaded tool definitions when needed |
| [52](http://localhost:5173/s/odsc-full-visual-review?p=52) | 151 | Run repetitive tool operations outside the model loop | Uber moved repetitive polling out of the model loop |
| [53](http://localhost:5173/s/odsc-full-visual-review?p=53) | 205 | MCP and CLI costs depended on the tested configuration | Costs differed by 139 times for one model across harnesses |
| [57](http://localhost:5173/s/odsc-full-visual-review?p=57) | tool-evaluation-levels | Check the result of a tool call | A valid tool call can still leave the task unfinished |
| [61](http://localhost:5173/s/odsc-full-visual-review?p=61) | workshop-3-result | Pagination results with three kinds of saved guidance | The stale-guidance condition failed all three trials |
| [64](http://localhost:5173/s/odsc-full-visual-review?p=64) | measured-persistent-context | Different saved guidance produced different results | Accuracy-focused context gained 19 points |
| [75](http://localhost:5173/s/odsc-full-visual-review?p=75) | 056 | System prompts define the agent’s operating instructions | System prompts kept getting longer |
| [86](http://localhost:5173/s/odsc-full-visual-review?p=86) | prompt-caching | Compaction and cache reuse | Compaction can save tokens while reducing cache reuse |
| [95](http://localhost:5173/s/odsc-full-visual-review?p=95) | 075 | Evaluate what you put in AGENTS.md | Generated AGENTS.md files lowered success and raised cost |
| [99](http://localhost:5173/s/odsc-full-visual-review?p=99) | 079 | Anthropic shortened Claude Code’s system prompt | Anthropic reported removing 80% of its system prompt |
| [103](http://localhost:5173/s/odsc-full-visual-review?p=103) | 082 | SkillsBench: results with and without curated skills | SkillsBench: curated skills added 16.6 percentage points |
| [114](http://localhost:5173/s/odsc-full-visual-review?p=114) | workshop-4-repeated-result | Routing results across four tasks | Static routing passed 12/12 at 41.5% lower cost |
| [115](http://localhost:5173/s/odsc-full-visual-review?p=115) | workshop-4-task-risk | Which tasks needed the stronger model? | The cheaper model passed the race task but missed security |
| [120](http://localhost:5173/s/odsc-full-visual-review?p=120) | 109 | Multiple attempts are another use of the model budget | Two cheaper attempts outperformed one expensive attempt |
| [123](http://localhost:5173/s/odsc-full-visual-review?p=123) | 107 | Why this escalation policy missed a requirement | This cascade escalated four times and passed 11/12 |
| [132](http://localhost:5173/s/odsc-full-visual-review?p=132) | workshop-5-ceiling | Incident app: both approaches passed 8/8 checks | Both passed 8/8; independent validation used more resources |
| [133](http://localhost:5173/s/odsc-full-visual-review?p=133) | workshop-5-repair-cost | Freight app: two repair rounds, with requirements still unmet | Pi repairs reached 6/9 with 11.4 times the tokens |
| [142](http://localhost:5173/s/odsc-full-visual-review?p=142) | 135 | Unsupported completion claims with evidence gates | Unsupported stops fell from 40/66 to 0/66 with evidence gates |
| [146](http://localhost:5173/s/odsc-full-visual-review?p=146) | 137 | Building a C compiler through repeated attempts | Repeated attempts still produced a working C compiler |
| [156](http://localhost:5173/s/odsc-full-visual-review?p=156) | 154 | What changes when you add another agent? | Another agent adds a context window and coordination work |
| [160](http://localhost:5173/s/odsc-full-visual-review?p=160) | 158 | An orchestrator assigns work and combines results | Parallel agents add context and coordination at the same time |
| [163](http://localhost:5173/s/odsc-full-visual-review?p=163) | 169 | Compare against one agent with the same budget | One agent was best or tied in six of eight comparisons |
| [169](http://localhost:5173/s/odsc-full-visual-review?p=169) | 176 | Freight app: extra coordination did not complete the task | Pi recovered omissions, then tied the best single-agent score |
| [171](http://localhost:5173/s/odsc-full-visual-review?p=171) | harness-update-regression | Apply one change to your own harness | Harness updates need to preserve behavior that already worked |
| [192](http://localhost:5173/s/odsc-full-visual-review?p=192) | 086 | Procedures expressed as skills | Skills can express procedures otherwise written as code |
| [195](http://localhost:5173/s/odsc-full-visual-review?p=195) | 089 | Generic and personalized skills in a simulated study | The generic skill performed best in the simulated study |
| [224](http://localhost:5173/s/odsc-full-visual-review?p=224) | 179 | Harness-R1: runtime patches with a frozen task model | Harness-R1 improved success while the task model stayed frozen |
| [84](http://localhost:5173/s/odsc-full-visual-review?p=84) | 061 | Compaction in long OpenHands sessions | OpenHands reported up to 2× lower per-turn API cost |
| [121](http://localhost:5173/s/odsc-full-visual-review?p=121) | 111 | Verification effort in two model runs | Sonnet wrote tests more often, with higher rollout cost |
| [138](http://localhost:5173/s/odsc-full-visual-review?p=138) | 066 | Scratchpad use and outcomes in YC-Bench | Scratchpad use was the strongest predictor in YC-Bench |
| [172](http://localhost:5173/s/odsc-full-visual-review?p=172) | 177 | Model size and harness optimization | Gemini Flash with a custom harness outscored Gemini Pro |

## Missed in the first audit: custom workflow counterexample

Rajiv identified that model-improvement-retest still replaced the intended counterexample with generic retesting advice. Corrected the title to the GPT-5.6 Sol accuracy comparison and reduced supplementary text to one sentence. Retained the TAG-Bench reconstruction qualification beside the source. His shortened Harvey result slide remains unchanged. The earlier audit was incomplete; it did not establish that every rewritten slide preserved the intended story.

## Full-deck concise review

Reviewed the current 226 slides and their rendered figures. Retained the latest Harvey edit, roadmap, custom-harness counterexample, and closed-harness title. Replaced long supplementary prose with short findings or mechanisms, preserving longer context in speaker notes. No slide IDs or ordering changed. Removed redundant embedded backups from Markdown; the complete pre-pass source is archived.

The visual pass also corrected figure/headline mismatches: the handoff diagram concerns avoiding conflicting shared-file edits; the multi-agent bar chart shows model-dependent gains; the Ralph Wiggum image documents a large port rather than establishing a C-compiler claim; the iterative-critic chart shows 57.9% versus 73.8%. Existing unresolved source checks remain marked. This was a wording and figure-alignment review, not a new literature-verification pass.
