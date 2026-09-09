"""Apply the approved Agent Canvas teaching pass to the editable storyboard."""
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, '/Users/rajiv.shah/Code/harness-engineering/talks/ODSC_2026')
from apply_headline_spine import parse_blocks

deck_path = ROOT / 'deck.md'
text = deck_path.read_text()
if '<!-- new-slide: agent-canvas-run -->' in text:
    raise SystemExit('Teaching pass already applied. Edit the working deck directly.')
backup = ROOT / 'deck.before-teaching-pass.md'
if backup.exists():
    raise SystemExit('Backup already exists; refusing to overwrite it.')
shutil.copy2(deck_path, backup)
shutil.copy2(ROOT / 'headline-spine.md', ROOT / 'headline-spine.before-teaching-pass.md')
preamble, blocks, original_order = parse_blocks(text)
original_keys = set(blocks)
section_matches = list(re.finditer(r'^# (Opening|Workshop [1-6]: .+|Close|Reserves)$', text, re.M))
sections = []
for i,m in enumerate(section_matches):
    end = section_matches[i+1].start() if i+1 < len(section_matches) else len(text)
    keys = [f'{a}:{b}' for a,b in re.findall(r'<!-- (source-slide|new-slide): ([^ ]+) -->', text[m.end():end])]
    sections.append([m.group(1), keys])

def s(n): return f'source-slide:{n:03d}'
def n(slug): return f'new-slide:{slug}'
def block(key, title, body):
    kind,slug = key.split(':',1)
    return f'<!-- {kind}: {slug} -->\n## {title}\n\n{body.strip()}\n\n---'
def put(key,title,body): blocks[key] = block(key,title,body)
def after(anchor,new):
    for _name,keys in sections:
        if anchor in keys:
            keys.insert(keys.index(anchor)+1,new)
            return
    raise ValueError(anchor)

# Agent drafts are proposals. Apply the activity hinges, with the editorial
# corrections below keeping new exercises distinct from older measured runs.
draft = (ROOT / 'review-additions/workshop-decisions.md').read_text()
for raw in re.findall(r'```markdown\n(.*?)\n```',draft,re.S):
    m=re.search(r'<!-- (source-slide|new-slide): ([^ ]+) -->',raw)
    key=f'{m.group(1)}:{m.group(2)}'
    blocks[key]=raw.strip()+'\n\n---'

put(s(13),'What changes when the model stays fixed?',
    'Run the same repository task with OpenHands, Pi, and OpenCode. Hold the model, starting files, environment, and verifier fixed.\n\nUse Agent Canvas to compare the evidence gathered, actions taken, context sent, and stopping event.')
put(s(25),'Trace one decision back to the harness',
    'Open the three prepared runs in Agent Canvas.\n\nFind the first useful evidence, the tool that produced it, and the event that justified stopping.\n\nChoose one difference in context, tools, or completion control to test next.')
put(s(35),'Inspect the tool path in Agent Canvas',
    'Mark the first useful evidence, each failed call, and the verifier event.\n\nExplain which failure came from the interface, the environment, or the model decision.\n\nChoose one tool change to test on the same task.')
put(s(41),'Place the test command before the next call',
    'The command is verified, specific to this repository, and needed now.\n\nChoose where to store it: only in this conversation, in a task checkpoint, or in repository guidance.\n\nThen decide when to load it. A saved fact can also appear in active context.')
put(s(94),'Give each fact a home and a loading rule',
    'Choose where each item lives: task state, reusable guidance, original source, or nowhere.\n\nChoose when it enters the next model call.\n\nRemove one item from the proposed summary. Can a fresh session still choose the next action?')
put(s(97),'When has the cheaper route earned another attempt?',
    'The pagination repair has a focused verifier. The authentication review has incomplete test coverage.\n\nChoose the starting model, reasoning effort, and escalation signal for each.\n\nCompare verified completion, time, cost, and defects the checks could miss.')
put(s(156),'Choose an architecture for each task',
    'One agent with the full budget.\n\nOne worker and an independent validator.\n\nParallel investigators with separate scopes.\n\nAccount for every child and the final synthesis inside the same total budget.')

debriefs = {
 1: ('A useful comparison isolates the harness decision', 'Hold the task, model, environment, and verifier fixed. Inspect where the traces diverge, then choose one harness setting to test.\n\nThe measured runs show different paths and costs. Recheck the result on another task.'),
 2: ('A tool earns its place by making a needed action reliable', 'Keep the actions the task requires. Compare discovery, input errors, returned evidence, and runtime failures before expanding the catalog.\n\nThe prepared browser trace motivates the next test; the pagination scenario is a separate exercise.'),
 3: ('Useful memory has a home and a loading rule', 'Keep current evidence available now, save progress for resuming this task, and retain recurring guidance for later work.\n\nThe controlled guidance trial remains pending. Debrief the placement choices and the completeness of the continuation record.'),
 4: ('A routing policy needs a failure signal it can trust', 'Specify what evidence triggers another attempt, more reasoning, a different model, or human review.\n\nCount verification and repeated work when comparing total cost. The prepared results cover different tasks; they do not establish one winning route.'),
 5: ('The next attempt needs evidence and a stopping rule', 'Record the failed check, the next hypothesis, remaining budget, and terminal states. A fresh session must know what to reverify.\n\nUse a verifier result after the latest relevant edit before accepting completion.'),
 6: ('Delegation needs a boundary and an owner for the result', 'Specify the child task, evidence to return, workspace ownership, and synthesis owner. Compare the complete system with one agent at the same budget.\n\nFor a shared pagination repair, explain what a second worker could do without conflicting edits.')
}
results={1:26,2:36,3:95,4:113,5:153,6:176}
for i,(title,body) in debriefs.items():
    key=n(f'workshop-{i}-debrief');put(key,title,body);after(s(results[i]),key)

visual='review-additions/teaching-visuals'
context='review-additions/context-visuals'
put(n('agent-canvas-run'),'The model chooses actions inside a harness',
    'Read the selected events from a real Agent Canvas run. Identify who supplied the instructions, chose the action, executed it, and returned evidence.\n\nWhat does the passing test establish, and what remains unchecked?\n\n'
    f'![Annotated Agent Canvas run]({visual}/agent-canvas-trace.png)\n\n'
    'Source: [Saved event IDs and excerpts](review-additions/trace-evidence.md). Selected events from the Aug. 24 Incident Operations Center run; intermediate edits are omitted.')
after(s(4),n('agent-canvas-run'))
put(n('harness-improvement-method'),'A harness change needs a repeatable comparison',
    'Inspect the failure in Agent Canvas. Predict the effect of one configuration change, repeat the task, and check whether the improvement transfers.\n\n'
    f'![Method for testing a harness change]({visual}/harness-improvement-method.png)\n\n'
    'Record verified outcome, provider cost when available, wall time, retries, and human intervention. Track fresh and cached input separately.')
after(n('workshop-1-debrief'),n('harness-improvement-method'))
put(n('pi-cache-intervention'),'Cache markers reduced fresh input in the Pi rerun',
    'Pi sent no cache markers, and the provider reported zero cache reads. Adding the compatibility setting enabled caching in calibration and the full rerun.\n\n'
    f'![Pi cache-control intervention]({visual}/pi-cache-intervention.png)\n\n'
    'Both runs made 89 model calls. The 7/8 and 6/8 check results come from separate trajectories and do not establish an effect of caching on quality. Comparable dollar cost was unavailable.\n\n'
    'Source: [Pi cache-control experiment](/Users/rajiv.shah/Code/harness-engineering/harness-benchmark/results/incident-sonnet-harness-comparison.md).')
after(n('harness-improvement-method'),n('pi-cache-intervention'))

put(s(42),'The same task needs information at different lifetimes',
    'Follow one pagination repair through the next model call, a session restart, and a future task. Storage and loading are separate choices.\n\n'
    f'![Information lifetimes in a pagination task]({context}/context-lifetimes.png)\n\n'
    'Illustrative worked example. The file and command names describe the teaching scenario.')
put(s(44),'The harness assembles the next model call',
    'Part 1: what the model can use now.\n\nThe next call combines instructions, available tools, selected evidence, and recent observations. Retrieval chooses what enters this working context.')
put(s(46),'Retrieval brings the next useful evidence into context',
    'For the pagination example, locate the boundary calculation, read its caller, and inspect the failing test.\n\nUse each result to choose what to retrieve next. The rest of the repository can remain outside the current call.\n\nIllustrative task walkthrough.')
put(n('context-budget-stack'),'Average context per call varied across harnesses',
    'Across eight tasks with GLM-5.2, all three harnesses passed 8/8. Their average input per model call differed.\n\n'
    f'![Average context per model call]({visual}/context-per-call.png)\n\n'
    'Source: [Aug. 24 short-suite results](/Users/rajiv.shah/Code/harness-engineering/harness-benchmark/results/short-suite.md). Values are rounded means across calls, including repeated context. Component-level breakdowns remain a follow-up.')
put(s(64),'Working state lets a fresh session resume the task',
    'Part 2: what survives the current task.\n\nSave the objective, changed files, latest verifier result, unresolved work, and next action. On resume, check whether the saved evidence still matches the workspace.')
put(n('summarization'),'A useful summary preserves the information needed to continue',
    'Read the before-and-after pagination example. Decide whether a fresh session could choose the next action without replaying the whole conversation.\n\n'
    f'![Illustrative continuation record after compaction]({context}/compaction-continuation.png)\n\n'
    'Illustrative compaction artifact, not an observed event from the saved runs. Keep raw evidence available separately for inspection.')
put(s(71),'Durable memory carries useful guidance into future tasks',
    'Part 3: what should help on later work.\n\nA recurring repository test command can become reviewed guidance. A one-off stack trace belongs with the current task. Load saved guidance when it is relevant, and revisit it when the repository changes.')
put(s(95),'The controlled guidance comparison is still pending',
    'The context-per-call measurements compare different harnesses. The proposed no-guidance, save-everything, and curated-guidance trial is separate.\n\nFor this exercise, compare the placement policies and test whether the continuation record preserves the information needed for the next action.')

# Restore the tool activity from reserves, then group Workshop 3 into three
# explicit time horizons while preserving every source slide and asset.
for name,keys in sections:
    if name=='Reserves': keys.remove(s(35))
after(n('untrusted-tool-results'),s(35))
w3=[s(i) for i in [40,41,42,44]]+[n('tools-to-context')]+[s(i) for i in [46,50,51,53,55,56]]+[n('context-budget-stack'),s(47),s(64),s(43),n('summarization')]+[s(i) for i in [60,61]]+[n('prompt-caching')]+[s(i) for i in [63,65,68,71,73,74,102,103,75,76,77,78,79,59,80,81,82,84]]+[n('memory-writers')]+[s(i) for i in [90,94,95]]+[n('workshop-3-debrief')]
for sec in sections:
    if sec[0]=='Workshop 3: Context and memory': sec[1]=w3

keys=[key for name,items in sections for key in items]
assert len(keys)==len(set(keys)), 'Duplicate slide'
assert original_keys.issubset(keys), 'Original slide lost'
assert set(keys)==set(blocks), 'Unplaced block'
parts=[preamble]
for name,items in sections:
    parts.append('# '+name)
    if name=='Reserves': parts.append('Slides below remain available for the three-hour master deck, but they are outside the current main line.')
    parts.extend(blocks[key] for key in items)
output='\n\n'.join(parts).rstrip()+'\n'
deck_path.write_text(output)

# Regenerate the reading outline from actual headings so it cannot drift from
# the working storyboard after the approved reorder.
spine=['# ODSC Harness Engineering: current headline story\n\nSynced from the working Markdown deck after the Agent Canvas teaching pass. IDs refer to original source slides or stable new-slide names.']
index=0
for name,items in sections:
    if name=='Reserves': break
    spine.append('## '+name)
    for key in items:
        index+=1
        title=re.search(r'^## (.+)$',blocks[key],re.M).group(1)
        tag=key.split(':',1)[1] if key.startswith('source-slide:') else 'NEW: '+key.split(':',1)[1]
        spine.append(f'{index}. `[{tag}]` **{title}**')
spine_text='\n\n'.join(spine)+'\n'
(ROOT/'headline-spine.md').write_text(spine_text)
Path('/Users/rajiv.shah/Code/harness-engineering/talks/ODSC_2026/headline-spine-sept4.md').write_text(spine_text)
print(f'Updated {index} main-line slides; {len(keys)-index} reserve slides. Preserved {len(original_keys)} existing slide IDs.')
