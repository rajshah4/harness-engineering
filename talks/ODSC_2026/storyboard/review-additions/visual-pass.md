# Full-deck visual pass

Working source: [deck.md](../deck.md). [Open the full review](http://127.0.0.1:5173/s/odsc-full-visual-review?p=1).

This is a visual-layout draft, not a fully source-verified final presentation. All 220 stable slide IDs remain, including reserves. The existing PPTX and the earlier main OpenSlide deck were not overwritten.

## What is implemented

47 new vector visuals have explicit native SVG text, lines and shapes in OpenSlide. Their standalone SVGs appear inline in Markdown. 97 existing figure assets are preserved in the preview. Remaining slides use native text layouts, including audience questions and transitions. Previously approved Harvey and tools/context pages reuse their original components and builds.

Workshop 2, 3, 4 and the two main Workshop 5 result tables reveal time/cost after correctness. Full source text remains in speaker notes; some text-heavy draft slides show a shorter selection. See follow-ups below before finalizing any shortened slide.

The original Not Diamond SWE-Interact figure was retrieved from the primary article. Two mismatched reserve images were replaced: 149 (repository pie chart) and 178 (AI safety levels). Original files remain on disk. Memory portability moved into the opening alternatives discussion. The Agent Canvas introduction now explicitly identifies who supplies context and executes actions.

## Editing and regeneration

Continue editing the Markdown. This preview is a snapshot, not live Markdown synchronization. Rebuild with `node talks/ODSC_2026/build_full_visual_review.cjs` from the harness-engineering repository. The generator owns only the full-review folder; inspector edits there must be copied back to the generator or Markdown before regeneration. Approved sample decks remain separate and are imported unchanged.

Each Markdown slide now carries a hidden visual-pass block with a review URL and motion guidance. Keep stable IDs when moving slides. Refresh page URLs after reordering. Layout/source research follow-ups are below. Do not interpret a completed layout as completed evidence verification.

## Remaining decisions and source work

- Slide 012: your comment asks whether the roadmap belongs in the live talk. Kept for now with the correct six workshop names.
- Slide 197: your question about its value remains open. Kept; it can serve as a benchmark-noise caveat.
- Audience questions 054 and 160 remain in reserves as requested, with your discussion comments preserved.
- Slide 010: saved benchmark data does not directly compare the branded provider products. Keep the cautionary draft until model/scaffold and benchmark labels are resolved.
- Slide 167: the research lift and chat-token multiplier have different comparison baselines. Avoid implying one matched quality/cost experiment.
- Adoption and star counts need dated refreshes. No new counts were invented.
- Sources with extracted or malformed URLs need checking before publishing, especially 061, 062, 137, 173 and 177.
- Existing dense source screenshots need per-slide crops or staged highlights before live delivery. Preserve axes, legends and caveats.
- The generated SVG renders were reviewed as contact sheets. Browser samples check actual React layout; this is not yet a frame-by-frame animation review of every slide.

## Slide inventory

| Page | Stable ID | Layout | Follow-up |
|---:|---|---|---|
| [1](http://127.0.0.1:5173/s/odsc-full-visual-review?p=1) | 001 | source-figure | Review talking points and figure emphasis |
| [2](http://127.0.0.1:5173/s/odsc-full-visual-review?p=2) | 003 | source-figure | Review talking points and figure emphasis |
| [3](http://127.0.0.1:5173/s/odsc-full-visual-review?p=3) | 004 | source-figure | Review talking points and figure emphasis |
| [4](http://127.0.0.1:5173/s/odsc-full-visual-review?p=4) | agent-canvas-run | flow | Review talking points and figure emphasis |
| [5](http://127.0.0.1:5173/s/odsc-full-visual-review?p=5) | 006 | source-figure | Review talking points and figure emphasis |
| [6](http://127.0.0.1:5173/s/odsc-full-visual-review?p=6) | 057 | source-figure | Review talking points and figure emphasis |
| [7](http://127.0.0.1:5173/s/odsc-full-visual-review?p=7) | 008 | table | Refresh dated adoption or repository statistics |
| [8](http://127.0.0.1:5173/s/odsc-full-visual-review?p=8) | 009 | table | Refresh dated adoption or repository statistics |
| [9](http://127.0.0.1:5173/s/odsc-full-visual-review?p=9) | 010 | text | Benchmark models/scaffolds do not establish branded-product performance; do not use as a ranking |
| [10](http://127.0.0.1:5173/s/odsc-full-visual-review?p=10) | 011 | text | Review talking points and figure emphasis |
| [11](http://127.0.0.1:5173/s/odsc-full-visual-review?p=11) | why-alternatives | flow | Review talking points and figure emphasis |
| [12](http://127.0.0.1:5173/s/odsc-full-visual-review?p=12) | 091 | compare | Review talking points and figure emphasis |
| [13](http://127.0.0.1:5173/s/odsc-full-visual-review?p=13) | existing-harness-starting-point | text | Review talking points and figure emphasis |
| [14](http://127.0.0.1:5173/s/odsc-full-visual-review?p=14) | 012 | text | Author comment needs a decision |
| [15](http://127.0.0.1:5173/s/odsc-full-visual-review?p=15) | 013 | text | Review talking points and figure emphasis |
| [16](http://127.0.0.1:5173/s/odsc-full-visual-review?p=16) | 014 | text | Review talking points and figure emphasis |
| [17](http://127.0.0.1:5173/s/odsc-full-visual-review?p=17) | 015 | source-figure | Review talking points and figure emphasis |
| [18](http://127.0.0.1:5173/s/odsc-full-visual-review?p=18) | 017 | source-figure | Review talking points and figure emphasis |
| [19](http://127.0.0.1:5173/s/odsc-full-visual-review?p=19) | 019 | source-figure | Review talking points and figure emphasis |
| [20](http://127.0.0.1:5173/s/odsc-full-visual-review?p=20) | 018 | source-figure | Review talking points and figure emphasis |
| [21](http://127.0.0.1:5173/s/odsc-full-visual-review?p=21) | 016 | source-figure | Review talking points and figure emphasis |
| [22](http://127.0.0.1:5173/s/odsc-full-visual-review?p=22) | harvey-harness-result | source-figure | Review talking points and figure emphasis |
| [23](http://127.0.0.1:5173/s/odsc-full-visual-review?p=23) | harvey-harness-mechanism | source-figure | Review talking points and figure emphasis |
| [24](http://127.0.0.1:5173/s/odsc-full-visual-review?p=24) | model-harness-coadaptation | text | Review talking points and figure emphasis |
| [25](http://127.0.0.1:5173/s/odsc-full-visual-review?p=25) | 058 | source-figure | Review talking points and figure emphasis |
| [26](http://127.0.0.1:5173/s/odsc-full-visual-review?p=26) | 197 | text | Author comment needs a decision |
| [27](http://127.0.0.1:5173/s/odsc-full-visual-review?p=27) | 022 | table | Refresh dated adoption or repository statistics |
| [28](http://127.0.0.1:5173/s/odsc-full-visual-review?p=28) | 024 | source-figure | Review talking points and figure emphasis |
| [29](http://127.0.0.1:5173/s/odsc-full-visual-review?p=29) | 025 | text | Review talking points and figure emphasis |
| [30](http://127.0.0.1:5173/s/odsc-full-visual-review?p=30) | 026 | source-figure | Source / content follow-up remains in Markdown |
| [31](http://127.0.0.1:5173/s/odsc-full-visual-review?p=31) | workshop-1-debrief | text | Review talking points and figure emphasis |
| [32](http://127.0.0.1:5173/s/odsc-full-visual-review?p=32) | harness-improvement-method | source-figure | Review talking points and figure emphasis |
| [33](http://127.0.0.1:5173/s/odsc-full-visual-review?p=33) | pi-cache-intervention | source-figure | Review talking points and figure emphasis |
| [34](http://127.0.0.1:5173/s/odsc-full-visual-review?p=34) | 029 | text | Review talking points and figure emphasis |
| [35](http://127.0.0.1:5173/s/odsc-full-visual-review?p=35) | 030 | source-figure | Review talking points and figure emphasis |
| [36](http://127.0.0.1:5173/s/odsc-full-visual-review?p=36) | 034 | text | Review talking points and figure emphasis |
| [37](http://127.0.0.1:5173/s/odsc-full-visual-review?p=37) | workshop-2-prediction | text | Review talking points and figure emphasis |
| [38](http://127.0.0.1:5173/s/odsc-full-visual-review?p=38) | workshop-2-result | table | Review talking points and figure emphasis |
| [39](http://127.0.0.1:5173/s/odsc-full-visual-review?p=39) | workshop-2-mechanism | flow | Review talking points and figure emphasis |
| [40](http://127.0.0.1:5173/s/odsc-full-visual-review?p=40) | workshop-2-reversal | compare | Review talking points and figure emphasis |
| [41](http://127.0.0.1:5173/s/odsc-full-visual-review?p=41) | 031 | text | Review talking points and figure emphasis |
| [42](http://127.0.0.1:5173/s/odsc-full-visual-review?p=42) | 033 | compare | Review talking points and figure emphasis |
| [43](http://127.0.0.1:5173/s/odsc-full-visual-review?p=43) | edit-format | compare | Source / content follow-up remains in Markdown |
| [44](http://127.0.0.1:5173/s/odsc-full-visual-review?p=44) | 032 | source-figure | Review talking points and figure emphasis |
| [45](http://127.0.0.1:5173/s/odsc-full-visual-review?p=45) | 150 | source-figure | Review talking points and figure emphasis |
| [46](http://127.0.0.1:5173/s/odsc-full-visual-review?p=46) | 196 | text | Source / content follow-up remains in Markdown |
| [47](http://127.0.0.1:5173/s/odsc-full-visual-review?p=47) | 038 | source-figure | Review talking points and figure emphasis |
| [48](http://127.0.0.1:5173/s/odsc-full-visual-review?p=48) | 151 | source-figure | Review talking points and figure emphasis |
| [49](http://127.0.0.1:5173/s/odsc-full-visual-review?p=49) | 205 | text | Review talking points and figure emphasis |
| [50](http://127.0.0.1:5173/s/odsc-full-visual-review?p=50) | untrusted-tool-results | flow | Source / content follow-up remains in Markdown |
| [51](http://127.0.0.1:5173/s/odsc-full-visual-review?p=51) | 035 | text | Review talking points and figure emphasis |
| [52](http://127.0.0.1:5173/s/odsc-full-visual-review?p=52) | 036 | text | Source / content follow-up remains in Markdown |
| [53](http://127.0.0.1:5173/s/odsc-full-visual-review?p=53) | tool-evaluation-levels | source-figure | Review talking points and figure emphasis |
| [54](http://127.0.0.1:5173/s/odsc-full-visual-review?p=54) | workshop-2-debrief | text | Review talking points and figure emphasis |
| [55](http://127.0.0.1:5173/s/odsc-full-visual-review?p=55) | 040 | text | Review talking points and figure emphasis |
| [56](http://127.0.0.1:5173/s/odsc-full-visual-review?p=56) | workshop-3-prediction | text | Review talking points and figure emphasis |
| [57](http://127.0.0.1:5173/s/odsc-full-visual-review?p=57) | workshop-3-result | table | Review talking points and figure emphasis |
| [58](http://127.0.0.1:5173/s/odsc-full-visual-review?p=58) | workshop-3-mechanism | flow | Review talking points and figure emphasis |
| [59](http://127.0.0.1:5173/s/odsc-full-visual-review?p=59) | workshop-3-reversal | compare | Review talking points and figure emphasis |
| [60](http://127.0.0.1:5173/s/odsc-full-visual-review?p=60) | 041 | text | Review talking points and figure emphasis |
| [61](http://127.0.0.1:5173/s/odsc-full-visual-review?p=61) | 042 | source-figure | Review talking points and figure emphasis |
| [62](http://127.0.0.1:5173/s/odsc-full-visual-review?p=62) | context-state-hierarchy | source-figure | Review talking points and figure emphasis |
| [63](http://127.0.0.1:5173/s/odsc-full-visual-review?p=63) | 044 | flow | Review talking points and figure emphasis |
| [64](http://127.0.0.1:5173/s/odsc-full-visual-review?p=64) | tools-to-context | compare | Review talking points and figure emphasis |
| [65](http://127.0.0.1:5173/s/odsc-full-visual-review?p=65) | 046 | flow | Review talking points and figure emphasis |
| [66](http://127.0.0.1:5173/s/odsc-full-visual-review?p=66) | 050 | text | Review talking points and figure emphasis |
| [67](http://127.0.0.1:5173/s/odsc-full-visual-review?p=67) | 051 | source-figure | Review talking points and figure emphasis |
| [68](http://127.0.0.1:5173/s/odsc-full-visual-review?p=68) | 053 | source-figure | Review talking points and figure emphasis |
| [69](http://127.0.0.1:5173/s/odsc-full-visual-review?p=69) | 055 | text | Review talking points and figure emphasis |
| [70](http://127.0.0.1:5173/s/odsc-full-visual-review?p=70) | 056 | source-figure | Review talking points and figure emphasis |
| [71](http://127.0.0.1:5173/s/odsc-full-visual-review?p=71) | context-budget-stack | source-figure | Review talking points and figure emphasis |
| [72](http://127.0.0.1:5173/s/odsc-full-visual-review?p=72) | 047 | text | Source / content follow-up remains in Markdown |
| [73](http://127.0.0.1:5173/s/odsc-full-visual-review?p=73) | 064 | flow | Review talking points and figure emphasis |
| [74](http://127.0.0.1:5173/s/odsc-full-visual-review?p=74) | 043 | source-figure | Review talking points and figure emphasis |
| [75](http://127.0.0.1:5173/s/odsc-full-visual-review?p=75) | summarization | source-figure | Review talking points and figure emphasis |
| [76](http://127.0.0.1:5173/s/odsc-full-visual-review?p=76) | compaction-preservation-policy | source-figure | Review talking points and figure emphasis |
| [77](http://127.0.0.1:5173/s/odsc-full-visual-review?p=77) | repeated-compaction-drift | source-figure | Review talking points and figure emphasis |
| [78](http://127.0.0.1:5173/s/odsc-full-visual-review?p=78) | 060 | source-figure | Review talking points and figure emphasis |
| [79](http://127.0.0.1:5173/s/odsc-full-visual-review?p=79) | 061 | source-figure | Review talking points and figure emphasis |
| [80](http://127.0.0.1:5173/s/odsc-full-visual-review?p=80) | prompt-caching | flow | Source / content follow-up remains in Markdown |
| [81](http://127.0.0.1:5173/s/odsc-full-visual-review?p=81) | 063 | source-figure | Review talking points and figure emphasis |
| [82](http://127.0.0.1:5173/s/odsc-full-visual-review?p=82) | 065 | source-figure | Review talking points and figure emphasis |
| [83](http://127.0.0.1:5173/s/odsc-full-visual-review?p=83) | 068 | source-figure | Review talking points and figure emphasis |
| [84](http://127.0.0.1:5173/s/odsc-full-visual-review?p=84) | 071 | compare | Review talking points and figure emphasis |
| [85](http://127.0.0.1:5173/s/odsc-full-visual-review?p=85) | 073 | table | Review talking points and figure emphasis |
| [86](http://127.0.0.1:5173/s/odsc-full-visual-review?p=86) | 074 | source-figure | Review talking points and figure emphasis |
| [87](http://127.0.0.1:5173/s/odsc-full-visual-review?p=87) | 102 | text | Review talking points and figure emphasis |
| [88](http://127.0.0.1:5173/s/odsc-full-visual-review?p=88) | 103 | text | Review talking points and figure emphasis |
| [89](http://127.0.0.1:5173/s/odsc-full-visual-review?p=89) | 075 | source-figure | Review talking points and figure emphasis |
| [90](http://127.0.0.1:5173/s/odsc-full-visual-review?p=90) | 076 | table | Review talking points and figure emphasis |
| [91](http://127.0.0.1:5173/s/odsc-full-visual-review?p=91) | 077 | text | Review talking points and figure emphasis |
| [92](http://127.0.0.1:5173/s/odsc-full-visual-review?p=92) | 078 | source-figure | Review talking points and figure emphasis |
| [93](http://127.0.0.1:5173/s/odsc-full-visual-review?p=93) | 079 | text | Review talking points and figure emphasis |
| [94](http://127.0.0.1:5173/s/odsc-full-visual-review?p=94) | 059 | text | Source / content follow-up remains in Markdown |
| [95](http://127.0.0.1:5173/s/odsc-full-visual-review?p=95) | 080 | text | Review talking points and figure emphasis |
| [96](http://127.0.0.1:5173/s/odsc-full-visual-review?p=96) | 081 | source-figure | Source image only 800px wide; obtain higher resolution |
| [97](http://127.0.0.1:5173/s/odsc-full-visual-review?p=97) | 082 | table | Source / content follow-up remains in Markdown |
| [98](http://127.0.0.1:5173/s/odsc-full-visual-review?p=98) | 084 | source-figure | Review talking points and figure emphasis |
| [99](http://127.0.0.1:5173/s/odsc-full-visual-review?p=99) | memory-social-scope | source-figure | Review talking points and figure emphasis |
| [100](http://127.0.0.1:5173/s/odsc-full-visual-review?p=100) | memory-writers | flow | Source / content follow-up remains in Markdown |
| [101](http://127.0.0.1:5173/s/odsc-full-visual-review?p=101) | 090 | source-figure | Review talking points and figure emphasis |
| [102](http://127.0.0.1:5173/s/odsc-full-visual-review?p=102) | 094 | text | Review talking points and figure emphasis |
| [103](http://127.0.0.1:5173/s/odsc-full-visual-review?p=103) | 095 | text | Review talking points and figure emphasis |
| [104](http://127.0.0.1:5173/s/odsc-full-visual-review?p=104) | workshop-3-debrief | text | Review talking points and figure emphasis |
| [105](http://127.0.0.1:5173/s/odsc-full-visual-review?p=105) | 096 | flow | Review talking points and figure emphasis |
| [106](http://127.0.0.1:5173/s/odsc-full-visual-review?p=106) | 097 | text | Review talking points and figure emphasis |
| [107](http://127.0.0.1:5173/s/odsc-full-visual-review?p=107) | 098 | text | Review talking points and figure emphasis |
| [108](http://127.0.0.1:5173/s/odsc-full-visual-review?p=108) | workshop-4-repeated-result | table | Review talking points and figure emphasis |
| [109](http://127.0.0.1:5173/s/odsc-full-visual-review?p=109) | workshop-4-task-risk | table | Review talking points and figure emphasis |
| [110](http://127.0.0.1:5173/s/odsc-full-visual-review?p=110) | routing-policy-design-space | flow | Review talking points and figure emphasis |
| [111](http://127.0.0.1:5173/s/odsc-full-visual-review?p=111) | 099 | source-figure | Review talking points and figure emphasis |
| [112](http://127.0.0.1:5173/s/odsc-full-visual-review?p=112) | 100 | source-figure | Review talking points and figure emphasis |
| [113](http://127.0.0.1:5173/s/odsc-full-visual-review?p=113) | 108 | text | Review talking points and figure emphasis |
| [114](http://127.0.0.1:5173/s/odsc-full-visual-review?p=114) | 109 | table | Review talking points and figure emphasis |
| [115](http://127.0.0.1:5173/s/odsc-full-visual-review?p=115) | 111 | table | Review talking points and figure emphasis |
| [116](http://127.0.0.1:5173/s/odsc-full-visual-review?p=116) | 106 | text | Source / content follow-up remains in Markdown |
| [117](http://127.0.0.1:5173/s/odsc-full-visual-review?p=117) | 107 | table | Review talking points and figure emphasis |
| [118](http://127.0.0.1:5173/s/odsc-full-visual-review?p=118) | 112 | text | Review talking points and figure emphasis |
| [119](http://127.0.0.1:5173/s/odsc-full-visual-review?p=119) | 113 | text | Source / content follow-up remains in Markdown |
| [120](http://127.0.0.1:5173/s/odsc-full-visual-review?p=120) | workshop-4-debrief | text | Review talking points and figure emphasis |
| [121](http://127.0.0.1:5173/s/odsc-full-visual-review?p=121) | 114 | text | Review talking points and figure emphasis |
| [122](http://127.0.0.1:5173/s/odsc-full-visual-review?p=122) | 115 | text | Review talking points and figure emphasis |
| [123](http://127.0.0.1:5173/s/odsc-full-visual-review?p=123) | efficiency-needs-completion-evidence | text | Source / content follow-up remains in Markdown |
| [124](http://127.0.0.1:5173/s/odsc-full-visual-review?p=124) | 116 | flow | Review talking points and figure emphasis |
| [125](http://127.0.0.1:5173/s/odsc-full-visual-review?p=125) | workshop-5-ceiling | table | Source / content follow-up remains in Markdown |
| [126](http://127.0.0.1:5173/s/odsc-full-visual-review?p=126) | workshop-5-repair-cost | table | Review talking points and figure emphasis |
| [127](http://127.0.0.1:5173/s/odsc-full-visual-review?p=127) | durable-goal-budget | text | Source / content follow-up remains in Markdown |
| [128](http://127.0.0.1:5173/s/odsc-full-visual-review?p=128) | 117 | flow | Source / content follow-up remains in Markdown |
| [129](http://127.0.0.1:5173/s/odsc-full-visual-review?p=129) | 118 | flow | Review talking points and figure emphasis |
| [130](http://127.0.0.1:5173/s/odsc-full-visual-review?p=130) | 123 | text | Review talking points and figure emphasis |
| [131](http://127.0.0.1:5173/s/odsc-full-visual-review?p=131) | 066 | text | Review talking points and figure emphasis |
| [132](http://127.0.0.1:5173/s/odsc-full-visual-review?p=132) | 067 | text | Review talking points and figure emphasis |
| [133](http://127.0.0.1:5173/s/odsc-full-visual-review?p=133) | 127 | text | Review talking points and figure emphasis |
| [134](http://127.0.0.1:5173/s/odsc-full-visual-review?p=134) | 129 | text | Review talking points and figure emphasis |
| [135](http://127.0.0.1:5173/s/odsc-full-visual-review?p=135) | 135 | table | Source / content follow-up remains in Markdown |
| [136](http://127.0.0.1:5173/s/odsc-full-visual-review?p=136) | 133 | text | Source / content follow-up remains in Markdown |
| [137](http://127.0.0.1:5173/s/odsc-full-visual-review?p=137) | 134 | flow | Source / content follow-up remains in Markdown |
| [138](http://127.0.0.1:5173/s/odsc-full-visual-review?p=138) | 136 | source-figure | Source image only 220px wide; obtain higher resolution |
| [139](http://127.0.0.1:5173/s/odsc-full-visual-review?p=139) | 137 | source-figure | Review talking points and figure emphasis |
| [140](http://127.0.0.1:5173/s/odsc-full-visual-review?p=140) | 125 | source-figure | Source image only 936px wide; obtain higher resolution |
| [141](http://127.0.0.1:5173/s/odsc-full-visual-review?p=141) | hooks | flow | Source / content follow-up remains in Markdown |
| [142](http://127.0.0.1:5173/s/odsc-full-visual-review?p=142) | 142 | source-figure | Review talking points and figure emphasis |
| [143](http://127.0.0.1:5173/s/odsc-full-visual-review?p=143) | 143 | flow | Review talking points and figure emphasis |
| [144](http://127.0.0.1:5173/s/odsc-full-visual-review?p=144) | 146 | source-figure | Review talking points and figure emphasis |
| [145](http://127.0.0.1:5173/s/odsc-full-visual-review?p=145) | 147 | text | Review talking points and figure emphasis |
| [146](http://127.0.0.1:5173/s/odsc-full-visual-review?p=146) | 152 | text | Review talking points and figure emphasis |
| [147](http://127.0.0.1:5173/s/odsc-full-visual-review?p=147) | 153 | table | Source / content follow-up remains in Markdown |
| [148](http://127.0.0.1:5173/s/odsc-full-visual-review?p=148) | workshop-5-debrief | text | Review talking points and figure emphasis |
| [149](http://127.0.0.1:5173/s/odsc-full-visual-review?p=149) | 154 | text | Review talking points and figure emphasis |
| [150](http://127.0.0.1:5173/s/odsc-full-visual-review?p=150) | 155 | text | Review talking points and figure emphasis |
| [151](http://127.0.0.1:5173/s/odsc-full-visual-review?p=151) | 156 | text | Review talking points and figure emphasis |
| [152](http://127.0.0.1:5173/s/odsc-full-visual-review?p=152) | 157 | compare | Source / content follow-up remains in Markdown |
| [153](http://127.0.0.1:5173/s/odsc-full-visual-review?p=153) | 158 | source-figure | Review talking points and figure emphasis |
| [154](http://127.0.0.1:5173/s/odsc-full-visual-review?p=154) | 162 | source-figure | Review talking points and figure emphasis |
| [155](http://127.0.0.1:5173/s/odsc-full-visual-review?p=155) | 167 | text | Source / content follow-up remains in Markdown; Quality and token multipliers use different baselines |
| [156](http://127.0.0.1:5173/s/odsc-full-visual-review?p=156) | 169 | text | Source / content follow-up remains in Markdown |
| [157](http://127.0.0.1:5173/s/odsc-full-visual-review?p=157) | 172 | source-figure | Review talking points and figure emphasis |
| [158](http://127.0.0.1:5173/s/odsc-full-visual-review?p=158) | 170 | text | Review talking points and figure emphasis |
| [159](http://127.0.0.1:5173/s/odsc-full-visual-review?p=159) | 171 | source-figure | Review talking points and figure emphasis |
| [160](http://127.0.0.1:5173/s/odsc-full-visual-review?p=160) | 174 | text | Source / content follow-up remains in Markdown |
| [161](http://127.0.0.1:5173/s/odsc-full-visual-review?p=161) | 175 | flow | Review talking points and figure emphasis |
| [162](http://127.0.0.1:5173/s/odsc-full-visual-review?p=162) | 176 | table | Source / content follow-up remains in Markdown |
| [163](http://127.0.0.1:5173/s/odsc-full-visual-review?p=163) | workshop-6-debrief | text | Review talking points and figure emphasis |
| [164](http://127.0.0.1:5173/s/odsc-full-visual-review?p=164) | harness-update-regression | source-figure | Review talking points and figure emphasis |
| [165](http://127.0.0.1:5173/s/odsc-full-visual-review?p=165) | 177 | source-figure | Review talking points and figure emphasis |
| [166](http://127.0.0.1:5173/s/odsc-full-visual-review?p=166) | state-independent-compute | source-figure | Review talking points and figure emphasis |
| [167](http://127.0.0.1:5173/s/odsc-full-visual-review?p=167) | openjarvis-system-search | source-figure | Review talking points and figure emphasis |
| [168](http://127.0.0.1:5173/s/odsc-full-visual-review?p=168) | 072 | source-figure | Source image only 945px wide; obtain higher resolution |
| [169](http://127.0.0.1:5173/s/odsc-full-visual-review?p=169) | 002 | source-figure | Review talking points and figure emphasis |
| [170](http://127.0.0.1:5173/s/odsc-full-visual-review?p=170) | 007 | source-figure | Review talking points and figure emphasis |
| [171](http://127.0.0.1:5173/s/odsc-full-visual-review?p=171) | 020 | source-figure | Review talking points and figure emphasis |
| [172](http://127.0.0.1:5173/s/odsc-full-visual-review?p=172) | 021 | source-figure | Review talking points and figure emphasis |
| [173](http://127.0.0.1:5173/s/odsc-full-visual-review?p=173) | 027 | source-figure | Review talking points and figure emphasis |
| [174](http://127.0.0.1:5173/s/odsc-full-visual-review?p=174) | 028 | source-figure | Review talking points and figure emphasis |
| [175](http://127.0.0.1:5173/s/odsc-full-visual-review?p=175) | 037 | source-figure | Review talking points and figure emphasis |
| [176](http://127.0.0.1:5173/s/odsc-full-visual-review?p=176) | 045 | text | Source / content follow-up remains in Markdown |
| [177](http://127.0.0.1:5173/s/odsc-full-visual-review?p=177) | 049 | source-figure | Source image only 582px wide; obtain higher resolution |
| [178](http://127.0.0.1:5173/s/odsc-full-visual-review?p=178) | 052 | source-figure | Review talking points and figure emphasis |
| [179](http://127.0.0.1:5173/s/odsc-full-visual-review?p=179) | 054 | text | Author comment needs a decision |
| [180](http://127.0.0.1:5173/s/odsc-full-visual-review?p=180) | 062 | source-figure | Review talking points and figure emphasis |
| [181](http://127.0.0.1:5173/s/odsc-full-visual-review?p=181) | 069 | source-figure | Review talking points and figure emphasis |
| [182](http://127.0.0.1:5173/s/odsc-full-visual-review?p=182) | 070 | source-figure | Review talking points and figure emphasis |
| [183](http://127.0.0.1:5173/s/odsc-full-visual-review?p=183) | 083 | text | Source / content follow-up remains in Markdown |
| [184](http://127.0.0.1:5173/s/odsc-full-visual-review?p=184) | 085 | source-figure | Review talking points and figure emphasis |
| [185](http://127.0.0.1:5173/s/odsc-full-visual-review?p=185) | 086 | source-figure | Review talking points and figure emphasis |
| [186](http://127.0.0.1:5173/s/odsc-full-visual-review?p=186) | 087 | source-figure | Review talking points and figure emphasis |
| [187](http://127.0.0.1:5173/s/odsc-full-visual-review?p=187) | 088 | source-figure | Review talking points and figure emphasis |
| [188](http://127.0.0.1:5173/s/odsc-full-visual-review?p=188) | 089 | text | Review talking points and figure emphasis |
| [189](http://127.0.0.1:5173/s/odsc-full-visual-review?p=189) | 092 | text | Review talking points and figure emphasis |
| [190](http://127.0.0.1:5173/s/odsc-full-visual-review?p=190) | 093 | source-figure | Review talking points and figure emphasis |
| [191](http://127.0.0.1:5173/s/odsc-full-visual-review?p=191) | 104 | source-figure | Review talking points and figure emphasis |
| [192](http://127.0.0.1:5173/s/odsc-full-visual-review?p=192) | 110 | source-figure | Review talking points and figure emphasis |
| [193](http://127.0.0.1:5173/s/odsc-full-visual-review?p=193) | 120 | text | Review talking points and figure emphasis |
| [194](http://127.0.0.1:5173/s/odsc-full-visual-review?p=194) | 121 | source-figure | Review talking points and figure emphasis |
| [195](http://127.0.0.1:5173/s/odsc-full-visual-review?p=195) | 122 | text | Review talking points and figure emphasis |
| [196](http://127.0.0.1:5173/s/odsc-full-visual-review?p=196) | 126 | source-figure | Review talking points and figure emphasis |
| [197](http://127.0.0.1:5173/s/odsc-full-visual-review?p=197) | 128 | text | Review talking points and figure emphasis |
| [198](http://127.0.0.1:5173/s/odsc-full-visual-review?p=198) | 130 | source-figure | Review talking points and figure emphasis |
| [199](http://127.0.0.1:5173/s/odsc-full-visual-review?p=199) | 131 | source-figure | Review talking points and figure emphasis |
| [200](http://127.0.0.1:5173/s/odsc-full-visual-review?p=200) | 132 | text | Source / content follow-up remains in Markdown |
| [201](http://127.0.0.1:5173/s/odsc-full-visual-review?p=201) | 138 | source-figure | Review talking points and figure emphasis |
| [202](http://127.0.0.1:5173/s/odsc-full-visual-review?p=202) | 139 | source-figure | Review talking points and figure emphasis |
| [203](http://127.0.0.1:5173/s/odsc-full-visual-review?p=203) | 140 | source-figure | Review talking points and figure emphasis |
| [204](http://127.0.0.1:5173/s/odsc-full-visual-review?p=204) | 144 | source-figure | Review talking points and figure emphasis |
| [205](http://127.0.0.1:5173/s/odsc-full-visual-review?p=205) | 145 | source-figure | Review talking points and figure emphasis |
| [206](http://127.0.0.1:5173/s/odsc-full-visual-review?p=206) | 148 | source-figure | Review talking points and figure emphasis |
| [207](http://127.0.0.1:5173/s/odsc-full-visual-review?p=207) | 149 | table | Review talking points and figure emphasis |
| [208](http://127.0.0.1:5173/s/odsc-full-visual-review?p=208) | 160 | text | Author comment needs a decision |
| [209](http://127.0.0.1:5173/s/odsc-full-visual-review?p=209) | 161 | source-figure | Review talking points and figure emphasis |
| [210](http://127.0.0.1:5173/s/odsc-full-visual-review?p=210) | 163 | source-figure | Review talking points and figure emphasis |
| [211](http://127.0.0.1:5173/s/odsc-full-visual-review?p=211) | 164 | source-figure | Review talking points and figure emphasis |
| [212](http://127.0.0.1:5173/s/odsc-full-visual-review?p=212) | 165 | text | Source / content follow-up remains in Markdown |
| [213](http://127.0.0.1:5173/s/odsc-full-visual-review?p=213) | 166 | text | Source / content follow-up remains in Markdown |
| [214](http://127.0.0.1:5173/s/odsc-full-visual-review?p=214) | 168 | text | Source / content follow-up remains in Markdown |
| [215](http://127.0.0.1:5173/s/odsc-full-visual-review?p=215) | 173 | source-figure | Review talking points and figure emphasis |
| [216](http://127.0.0.1:5173/s/odsc-full-visual-review?p=216) | 178 | flow | Review talking points and figure emphasis |
| [217](http://127.0.0.1:5173/s/odsc-full-visual-review?p=217) | 179 | text | Review talking points and figure emphasis |
| [218](http://127.0.0.1:5173/s/odsc-full-visual-review?p=218) | 180 | source-figure | Review talking points and figure emphasis |
| [219](http://127.0.0.1:5173/s/odsc-full-visual-review?p=219) | 181 | source-figure | Review talking points and figure emphasis |
| [220](http://127.0.0.1:5173/s/odsc-full-visual-review?p=220) | 183 | source-figure | Review talking points and figure emphasis |

