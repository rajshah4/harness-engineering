// Generate review layouts from the current Markdown without changing the original PPTX.
// Text and diagram primitives become explicit JSX nodes, not flattened slide images.
const fs = require('fs'), path = require('path');
// Install sharp in your tooling environment, or point SHARP_MODULE at its module path.
const sharp = require(process.env.SHARP_MODULE || 'sharp');
// Read the canonical Markdown. Explicit layout metadata keeps every visible paragraph on the slide.
const root=path.resolve(process.argv[2] || path.join(__dirname,'storyboard'));
const dest=path.join(__dirname,'open-slide-deck/slides/odsc-full-visual-review');
const assets=path.join(dest,'assets');
const qa='/tmp/odsc-full-visual-review';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const plain=s=>s.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*`]/g,'').trim();
const C={ink:'#20201E',blue:'#2E70FF',muted:'#676358',bg:'#F9F1D9',red:'#AF3E36',green:'#187263',line:'#CCC6B6'};
const specs={};
function table(id,heads,rows,caption,widths){specs[id]={kind:'table',heads,rows,caption,widths};}
function flow(id,steps,caption){specs[id]={kind:'flow',steps,caption};}
function compare(id,left,right,caption){specs[id]={kind:'compare',left,right,caption};}
function stack(id,segments,caption){specs[id]={kind:'stack',segments,caption};}
table('deepseek-harness-configurations',['Harness configuration','DeepSWE v1.1 · resolved %','Terminal-Bench 2.1 · pass@1 %'],[
 ['Claude Code','69.8','88.0'],['Codex','65.6','84.1'],['OpenCode','65.5','85.0'],['Pi','66.2','86.1'],['mini-SWE','74.2','90.3'],['DSH Minimal','72.6','90.6'],['DSH Standard','70.5','85.8'],['DSH PTC','67.6','85.8']],
 'Reported V4.1 Flash results, transcribed from the supplied screenshot. Primary report and settings pending verification.',[530,510,540]);
specs['deepseek-harness-configurations'].rowHeight=52;
specs['deepseek-harness-configurations'].dividerOffset=10;
table('deepseek-runtime-modes',['DeepSeek Harness mode','What the model can use'],[
 ['Minimal','Shell and file editor'],['Standard','Broader built-in workflow tools'],['Code','Tools through a TypeScript SDK'],['Creator','Runtime and plugin development']],
 'An extensible platform can expose a small tool surface. Official developer-preview descriptions, September 10, 2026.',[490,1090]);
table('workshop-2-result',['Tool surface','Evidence / 6','Time','Tool calls'],[
 ['Broad GitHub catalog','6 / 6','123 s','12'],['Terminal + API','4 / 6','101 s','6'],['Task-shaped tool','6 / 6','72 s','1']],
 'Medians of 3 trials per condition. Tool calls can contain different amounts of work.',[600,370,310,300]);
table('common-agent-tools',['Tool area','Common operations'],[
 ['Files','Find paths, search text, read files'],['Editing','Write files, replace text, apply patches'],['Execution','Run shell commands, tests, builds, and background jobs'],['Git and reviews','Inspect commits, issues, pull requests, and review evidence'],['Web and interfaces','Search, fetch, browse, click, and inspect images'],['Services and data','Call APIs, databases, cloud services, and observability systems'],['Agent support','Search tools, load skills, delegate, and ask the user']],
 'A harness exposes the subset needed for its environment and permission policy.',[470,1110]);
specs['common-agent-tools'].rowHeight=61;
specs['common-agent-tools'].dividerOffset=38;
specs['common-agent-tools'].cellFont=28;
specs['common-agent-tools'].firstCellFont=27;
table('workshop-3-result',['Saved guidance','Verifier passes','Time','Processed tokens'],[
 ['None','3 / 3','141 s','283K'],['Save everything','0 / 3','196 s','414K'],['Curated','3 / 3','126 s','291K']],
 '3 trials per condition. Stale guidance deliberately planted. Time and token figures are medians.',[510,380,290,400]);
table('workshop-3-reversal',['Condition','External passes','Median time','Processed tokens','Full suite'],[
 ['No guidance','3 / 3','141 s','283K','0 / 3'],['Curated context','3 / 3','126 s','291K','3 / 3']],
 'Elapsed-time ranges overlapped. Curated context used 3% more processed tokens and followed the requested full-suite check.',[390,300,260,340,290]);
table('workshop-4-repeated-result',['Routing policy','Verifier passes','Cost / trial','Time / trial'],[
 ['Strongest everywhere','12 / 12','$0.883','116 s'],['Economical everywhere','9 / 12','$0.247','252 s'],['Risk-aware static','12 / 12','$0.517','206 s']],
 '4 tasks × 3 trials. Passes cover all 12 runs; cost and time are medians for one 4-task trial.',[560,350,350,320]);
table('workshop-4-task-risk',['Economical model','Rename','Pagination','Async race','Security'],[
 ['Verifier passes','3 / 3','3 / 3','3 / 3','0 / 3']],
 'All 3 security reviews missed the timing-safe comparison requirement. Selected toy tasks.',[480,250,290,270,290]);
table('107',['Routing policy','Verifier passes','Cost / trial','Escalations'],[
 ['Risk-aware static','12 / 12','$0.517','0'],['Adaptive cascade','11 / 12','$0.628','4']],
 'This cascade did not use an external verifier after every tier. It does not test all cascade designs.',[560,350,350,320]);
table('workshop-5-ceiling',['Incident task','Checks','Wall time','Provider tokens'],[
 ['OpenHands single','8 / 8','20m 21s','4.10M'],['Completion system','8 / 8','24m 41s','6.84M']],
 'One campaign per condition. Provider tokens include cached input. Not a matched-budget trial.',[550,290,350,390]);
table('workshop-5-repair-cost',['Freight task','Checks','Wall time','Provider tokens'],[
 ['Pi single','4 / 9','25m 36s','1.96M'],['Pi completion system','6 / 9','99m 10s','22.44M']],
 'Separate trajectories. Corrected external scoring. Two repair rounds still left 3 requirements unmet.',[550,290,350,390]);
table('154',['What another agent adds','What the parent still pays for'],[
 ['A separate context window','Selecting and describing the assignment'],
 ['Parallel tool use','Passing the relevant context'],
 ['An independent investigation','Combining returned results'],
 ['A second attempt or perspective','Verifying the complete outcome']],
 'Parallel work helps only when the independent work exceeds the coordination cost.',[760,820]);
specs['154'].rowHeight=102;
table('closing-six-decisions',['Workshop','Harness decision'],[
 ['Harness choice','Which behavior and defaults do we inherit?'],
 ['Tools','Which actions and evidence can the model request?'],
 ['Context','What enters the next model call, and what persists?'],
 ['Model choice','Which model or attempt gets the remaining budget?'],
 ['Goals and validation','Which evidence permits another attempt or completion?'],
 ['Multiple agents','Which work separates cleanly, and who owns synthesis?']],
 'Measure each change against the same task, environment, and acceptance checks.',[520,1060]);
specs['closing-six-decisions'].rowHeight=69;
specs['closing-six-decisions'].cellFont=30;
specs['closing-six-decisions'].firstCellFont=29;
table('177',['TerminalBench 2.0 harness','Pass rate'],[
 ['Claude Code','58.0%'],
 ['Terminus-KIRA','74.7%'],
 ['Meta-Harness','76.4%']],
 'Claude Opus 4.6 · 89 tasks · five independent trials per task. Source: Meta-Harness project page.',[1110,470]);
specs['177'].rowHeight=112;
specs['177'].cellFont=34;
specs['177'].firstCellFont=34;
table('179',['Frozen Qwen3.5-9B condition','Success'],[
 ['Vanilla task harness','44.3%'],
 ['Harness-R1 runtime patches','53.6%']],
 'Aggregate result across WebShop, ALFWorld, and DBBench · +9.3 percentage points. Source: Harness-R1 preprint.',[1110,470]);
specs['179'].rowHeight=132;
specs['179'].cellFont=34;
specs['179'].firstCellFont=34;
table('armin-factory',['Reported run measure','Result'],[
 ['Wall-clock time','35 hours'],['Token use','About 1 billion'],['Raw API cost','About $1,200'],['Repository activity','79 commits, 75K net lines'],['Armin\'s assessment','“Absolutely nothing of value”']],
 'Armin stopped the unattended run himself. The figures and assessment come from his September 7 account.',[850,730]);
specs['armin-factory'].rowHeight=88;
table('176',['Freight condition','Final checks','Provider tokens'],[
 ['OpenHands single','6 / 9','3.31M'],['OpenHands system','6 / 9','≥21.48M'],['Pi system','6 / 9','22.44M']],
 'Exploratory campaigns. OpenHands system token count is a lower bound due to one incomplete receipt.',[720,400,460]);
table('153',['Campaign','Single','Completion system'],[
 ['Incident / OpenHands','8 / 8','8 / 8'],['Freight / Pi','4 / 9','6 / 9']],
 'Different tasks and trajectories. Incident used 1.67× tokens; Freight Pi used 11.4× tokens.',[720,430,430]);
table('022',['Harness','Focus'],[
 ['Pi','Minimal, extensible agent loop'],['OpenCode','Terminal-first coding with provider choice'],['OpenHands','Autonomous repository work'],['Aider','Git-native pair programming'],['Cline','Editor-based tools and control']],
 'Examples, not a ranking. Refresh adoption figures before presenting.',[470,1110]);
table('009',['Model provider','Harness'],[['Anthropic','Claude Code'],['OpenAI','Codex'],['DeepSeek','DeepSeek Harness']],
 'Provider-owned harnesses. GitHub counts in the working notes need a dated refresh.',[680,900]);
table('008',['Tool','Earlier survey','Later survey'],[['Claude Code','18%','39%'],['Codex','3%','16%'],['Copilot','29%','21%'],['Cursor','18%','12%']],
 'Working-deck survey figures, pending source recheck. Multiple tools allowed; shares are not additive.',[660,460,460]);
flow('agent-canvas-run',[
 ['Harness','Builds context and lists tools'],['Model','Requests a tool action'],['Harness + tool','Executes it and returns evidence']],
 'The returned observation becomes context for the next model call. Illustrative loop, not a new trace.');
flow('workshop-2-mechanism',[
 ['Request evidence','PR metadata, files and patches'],['Bounded tool','Applies one evidence recipe'],['Answer','Cites the returned sources']],
 'The bundle replaces repeated retrieval decisions. It does not remove the underlying API work.');
compare('workshop-2-reversal', ['Repeated workflow','Known evidence recipe','Bounded output','Task-shaped tool'], ['Unfamiliar investigation','Unknown next question','Exploration and exceptions','Primitives or terminal'], 'The experiment tests a recurring PR-inspection task, not every kind of repository work.');
flow('029',[
 ['Model sees schema','Name, description, and arguments'],['Model requests action','Structured arguments'],['Harness executes','API, CLI, or MCP-backed operation'],['Result enters context','Evidence for the next decision']],
 'A tool interface controls both the request the model can make and the evidence it receives.');
flow('tool-search-method',[
 ['Keep common tools visible','Expose the small set used on most turns'],['Defer the long tail','Store names, descriptions, and full schemas outside the prompt'],['Search the catalog','Match the needed capability with BM25 or regex'],['Expand, then call','Load the matching definition and return its result']],
 'Search changes when a definition enters context. It does not remove authorization, validation, or result handling.');
flow('038',[
 ['API catalog','2,600 endpoint definitions'],['Search','Find the needed operations'],['Generated program','Compose calls and filter results'],['Sandboxed execution','Return the selected result']],
 'Cloudflare exposes search() and execute() instead of one model-facing schema per endpoint.');
flow('036',[
 ['Prompt cost','14 browser schemas on every call'],['Launch','30-second cold-start timeout'],['Retries','State and content extraction failed'],['Fallback','Use node and jsdom']],
 '17 browser actions consumed about 335 seconds, roughly 21% of wall time, in one saved OpenHands run.');
compare('workshop-2-debrief',['Bundle a task-shaped tool','The trace repeats','The output can be bounded','A verifier can check it'],['Keep primitive tools','The next question is unknown','Exploration matters','Exceptions are common'], 'Start with primitives. Bundle the path only after the repeated work is visible.');
flow('workshop-3-mechanism',[
 ['Stale guidance','620 words pointed to toyapp/cursor.py'],['Agent implementation','3 / 3 runs created that module'],['Agent-written tests','25 to 32 tests passed'],['External verifier','0 / 3 passed the public contract']],
 'Median cost versus no guidance: 39% more time and 46% more processed tokens.');
stack('044',[
 ['System instructions',170,'#20201E'],['Project guidance',140,'#676358'],['Current request',160,'#AF3E36'],['Tool definitions',270,'#2E70FF'],['Retrieved files',250,'#187263'],['Recent messages',210,'#7A5AF8'],['Tool results',210,'#E78D2D'],['Space left',170,'#E9E1CA']],
 'Illustrative proportions. Only loaded information occupies this model call.');
compare('tools-to-context',['Available outside context','Repository and documents','Tool catalog','Stored execution history'],['Loaded into this call','Selected file excerpts','Relevant tool definitions','Recent results and instructions'], 'Availability and inclusion in the prompt are separate decisions.');
flow('046',[['Failing test','Locate the boundary case'],['Implementation','Read the boundary calculation'],['Caller','Check the expected interface'],['Next action','Edit or retrieve more evidence']], 'Illustrative pagination walkthrough. Each result guides the next retrieval.');
flow('064',[['Before interruption','Save objective and progress'],['Checkpoint','Files, result, next action'],['Fresh session','Check current workspace'],['Resume','Reverify and continue']], 'A checkpoint records evidence; it does not guarantee that the evidence is still current.');
compare('071',['Current task state','One-off stack trace','Latest verifier result','Unfinished next action'],['Future guidance','Reviewed test command','Stable repository convention','Task-relevant procedure'], 'Load durable guidance when relevant. Recheck it when the repository changes.');
compare('091',['Provider-managed state','Inspect export support','Check portability of summaries','Check what survives switching'],['Workspace-managed state','Keep files and references','Version the policy','Reuse state with another harness'], 'Portability depends on the implementation. Open source alone does not guarantee portable memory.');
compare('033',['Interface to the capability','API: request and response','MCP: exposed tools and resources','CLI: commands and output'],['Harness design choices','What the model sees','How much work a call performs','How results enter context'], 'These are overlapping layers. A CLI or MCP tool can call the same underlying API.');
flow('prompt-caching',[['Earlier call','Stable cached prefix'],['Compaction','Rewrites part of the input'],['Later call','Some prefix may need reprocessing']], 'Illustrative mechanism. Net cost depends on provider cache rules and the tokens saved.');
flow('memory-writers',[['Tool return','Untrusted external content'],['Review boundary','Validate provenance and scope'],['Durable guidance','Approved instructions only']], 'Illustrative design. A retrieved instruction should not become trusted memory automatically.');
flow('untrusted-tool-results',[['External content','Page or tool response'],['Model context','Evidence, not authority'],['Action boundary','Validate before execution']], 'Illustrative trust boundary. A real prompt-injection example remains a research follow-up.');
flow('routing-policy-design-space',[['Before work','Risk and task requirements'],['During work','Errors and remaining budget'],['After an attempt','External verification']], 'Define the starting model, escalation signal, fallback and final verifier.');
flow('096',[['Model A','First attempt'],['Evidence','Tool result or failed check'],['Routing policy','Keep or change the model'],['Model A or B','Next attempt']], 'A model switch is a harness decision. Include repeated work in the total cost.');
table('goal-validation-loop',['Part','What the harness records'],[
 ['Outcome','The observable result that must be true'],
 ['Current state','Verified facts and unfinished work'],
 ['Next action','One bounded attempt'],
 ['Check','How the harness measures progress and records evidence'],
 ['Limits','Maximum time, spend, attempts, and permissions'],
 ['Terminal states','Complete, blocked, needs help, or out of budget']],
 'The outcome stays stable. State and evidence change after each bounded attempt.',[470,1110]);
specs['goal-validation-loop'].rowHeight=76;
compare('115',['Repository A','The requested behavior already works','Checks pass before any edit','Correct action: explain and stop'],['Repository B','A boundary case fails','Make the smallest repair','Rerun the same checks'], 'The request is identical. The current evidence determines whether the next action is edit or stop.');
flow('acceptance-check-contract',[['Outcome','What must be true'],['Check','How the harness measures it'],['Evidence','What result and time to record'],['Terminal states','Complete, satisfied, blocked or out of budget']], 'Define the contract before the agent starts editing.');
flow('verifier-next-action',[['Pass','Stop and cite the fresh evidence'],['Fail + diagnosis','Repair, then rerun the check'],['Fail + no path','Escalate or ask for help'],['Budget ends','Stop incomplete and preserve the failure']], 'A failed check is useful only when it changes the next action.');
flow('123',[['Model call','Choose the next action'],['Tool call','Change or inspect the environment'],['Observation','Return evidence'],['Progress decision','Continue, repair or stop']], 'A single user request can contain hundreds of these work-check decisions.');
compare('067',['Simple work','Order stock','Set prices','Pay fees'],['Long-run outcome','Activity declined over time','Agents stagnated on average','Every model eventually stopped selling'], 'Vending-Bench exposes failures that do not appear in one short task.');
compare('066',['Weak run state','Relies on conversation history','Loses decisions across turns','Repeats old mistakes'],['Durable scratchpad','Records facts and decisions','Carries plans across turns','Correlated with higher success'], 'YC-Bench found scratchpad use was the strongest predictor of success. This is correlation, not proof of causation.');
compare('goal-quality-kill-switch',['Activity that can hide drift','Hours elapsed','Tokens consumed','Commits and lines added'],['Controls that measure progress','Behavior and quality checks','Readable diff review','Budget cap and kill switch'], 'The harness should continue only when current evidence supports another bounded attempt.');
flow('118',[['Persist','Goal, progress, last evidence and next action'],['Interrupt','Crash, timeout, context reset or human pause'],['Restore','Load the checkpoint into a fresh session'],['Recheck','Confirm the workspace, then continue']], 'A checkpoint restores the decision state. Fresh evidence still must follow the restart.');
flow('fresh-evidence',[['Latest edit','Makes older evidence stale'],['Enforced check','A hook runs the required validator'],['Recorded evidence','Save the result against the current state'],['Stop decision','Accept completion or return to repair']], 'The harness accepts completion only from evidence produced after the latest relevant edit.');
flow('validation-ladder',[['Behavior checks','Requested outcome and known edge cases'],['Repository checks','Lint, APIs and architecture rules'],['Review gate','Readable, maintainable and accepted diff']], 'A passing agent-written test is only the first gate.');
compare('157',['Independent investigations','Separate repository questions','Read-only evidence gathering','Root combines the findings'],['Shared implementation','Same changing files','Edits depend on each other','Keep one implementation owner'], 'Compare setup, handoffs and synthesis with one agent using the same total budget.');
flow('175',[['Assign','Question and allowed files'],['Worker','Bounded work and budget'],['Return','Evidence and uncertainty'],['Owner','Synthesize and verify']], 'Every child needs a stopping rule. The parent remains accountable for the combined result.');
flow('why-alternatives',[['Choose a harness','Inherit its defaults'],['Inspect a run','Find a task-specific failure'],['Change one choice','Tool, context or completion'],['Compare again','Outcome and total cost']], 'The workshop starts with existing harnesses. Build only the behavior the task needs.');
table('076',['Instruction-file issue','Repositories affected'],[['Duplicated lint rules','62%'],['Context bloat','42%'],['Skill leakage','35%']], 'Reported audit of 100 repositories. Categories can overlap; recheck the paper before presenting.',[900,680]);
table('082',['Skills condition','Average pass rate'],[['Without curated skills','33.9%'],['With curated skills','50.5%']], 'SkillsBench v4: +16.6 percentage points on average. Matched conditions; gains vary by configuration.',[1000,580]);
table('109',['Attempt policy','Reported success','Reported cost'],[['Two GLM-5.2 attempts','57.8% best-of-two','$7.90'],['One Sonnet 5 attempt','52.7%','$25.84']], 'Source reports unequal attempt counts. Best-of-two requires a way to identify the successful output.',[700,540,340]);
table('111',['Reported measure','Sonnet 5','GLM-5.2'],[['First-shot success','52.7%','41.2%'],['Runs writing tests','92%','82%'],['Lines changed','1,650','1,081']], '452 rollouts per model in the cited comparison. More tests do not by themselves establish correctness.',[760,410,410]);
table('135',['Completion policy','Unsupported stops'],[['Matched baseline','40 / 66'],['Certificate-gated control','0 / 66']], 'Reported evidence-contract result. A certificate is not proof of external truth or safety.',[1000,580]);
flow('134',[['Implementer','Produces a candidate change'],['Independent validator','Finds the failed requirement'],['Failure evidence','Supports a new hypothesis'],['Changed action','Repair differently, escalate or stop']], 'A failed check earns another attempt only when it changes what happens next.');
compare('workshop-5-debrief',
 ['Continue with a changed plan','Name the failed requirement','Form a new, testable hypothesis','Use the remaining budget to repair, retrieve, or change model'],
 ['Escalate or stop incomplete','No credible next hypothesis','The same failure keeps repeating','Budget or authority has ended'],
 'Ask the room: which current evidence makes another attempt worth its cost?');
flow('178',[['Candidate change','Prompt, tool or context policy'],['Evaluation','New tasks and old tasks'],['Accept or reject','Check gains and regressions'],['Versioned harness','Keep a rollback path']], 'Illustrative self-improvement loop. A proposal is not an accepted harness update.');
table('149',['Interface principle','What to inspect'],[['Simple actions','Can the model choose the right operation?'],['Compact actions','How much recurring work does one call handle?'],['Informative feedback','Does the result support the next decision?'],['Guardrails','Which failures can the harness contain?']], 'Check the action interface, feedback and error handling separately.',[610,970]);
table('073',['AGENTS.md example','Reason to keep it'],[['Test command','Reproducible repository verification'],['Architecture constraint','A stable requirement to check'],['Local convention','Guidance that changes the work']], 'Illustrative contents. Keep task-specific logs and stale instructions out of shared guidance.',[650,930]);
table('edit-format',['Representation','What the model returns','Typical recovery'],[
 ['Whole file','The complete file','Rewrite and inspect the diff'],['Search and replace','Exact old text and new text','Re-read the match, then retry'],['Patch','Changed lines with surrounding context','Refresh context and reapply']],
 'Same edit, different failure surface. Illustrative comparison.',[390,650,540]);
specs['edit-format'].rowHeight=145;
specs['edit-format'].dividerOffset=110;
function wrap(s,max){const out=[];for(const paragraph of String(s).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){if((line+' '+word).trim().length>max&&line){out.push(line);line=word;}else line=(line+' '+word).trim();}if(line)out.push(line);}return out;}
function txt(x,y,s,size=34,color=C.ink,weight=400,width=1580){return wrap(s,Math.floor(width/(size*.53))).map((t,i)=>({type:'text',x,y:y+i*size*1.3,text:t,size,color,weight}));}
const rect=(x,y,w,h,fill)=>({type:'rect',x,y,w,h,fill});
const line=(x,y,x2,y2,color=C.line)=>({type:'line',x,y,x2,y2,color});
function primitives(s){let e=[];if(s.kind==='table'){
 const widths=s.widths||s.heads.map(()=>1580/s.heads.length);let x=40;
 s.heads.forEach((h,i)=>{e.push(...txt(x,60,h,28,C.muted,700,widths[i]-20));x+=widths[i];});e.push(line(40,90,1620,90));
 const rh=s.rowHeight||(s.rows.length>4?87:125);
 s.rows.forEach((row,r)=>{let x=40;row.forEach((v,i)=>{const font=i===0?(s.firstCellFont||32):(s.cellFont||38);e.push(...txt(x,150+r*rh,v,font,(String(v).startsWith('0 /')?C.red:i===1?C.blue:C.ink),i===1?700:400,widths[i]-20));x+=widths[i];});const divider=150+(s.dividerOffset??33)+r*rh;e.push(line(40,divider,1620,divider));});
 }else if(s.kind==='flow'){
 const width=1580/s.steps.length;
 s.steps.forEach(([head,body],i)=>{const x=40+i*width;e.push(...txt(x,110,String(i+1).padStart(2,'0'),40,C.blue,700,width-55),line(x,140,x+width-60,140,C.blue),...txt(x,213,head,36,C.ink,700,width-70),...txt(x,325,body,32,C.ink,400,width-70));if(i<s.steps.length-1){const a=x+width-50;e.push(line(a,237,a+30,237,C.blue),line(a+20,229,a+30,237,C.blue),line(a+20,245,a+30,237,C.blue));}});
 }else if(s.kind==='stack'){
  e.push(...txt(40,95,'One context window',34,C.ink,700,1580));let x=40;
  s.segments.forEach(([label,width,color],i)=>{e.push(rect(x,145,width,150,color));const lx=40+(i%4)*395,ly=365+Math.floor(i/4)*90;e.push(rect(lx,ly,24,24,color),...txt(lx+40,ly+22,label,28,C.ink,400,330));x+=width;});
 }else{[s.left,s.right].forEach((items,i)=>{const x=40+i*840;e.push(...txt(x,90,items[0],38,C.ink,700,740),line(x,125,x+740,125,C.blue));items.slice(1).forEach((t,j)=>e.push(...txt(x,210+j*95,t,34,C.ink,400,740)));});}
 e.push(...txt(40,590,s.caption,27,C.muted,400,1580));return e;}
function svg(e,width=1660,height=680){return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Arial, sans-serif">`+e.map((o,i)=>`<g id="part-${i}">`+(o.type==='text'?`<text x="${o.x}" y="${o.y}" font-size="${o.size}" fill="${o.color}" font-weight="${o.weight}">${esc(o.text)}</text>`:o.type==='rect'?`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="${o.fill}"/>`:`<path d="M${o.x},${o.y} L${o.x2},${o.y2}" stroke="${o.color}" stroke-width="3" fill="none"/>`)+'</g>').join('')+'</svg>';}
function parse(md) {
 let section='Opening'; const out=[];
 for (const block of md.split(/\n---\s*\n/)) {
  const visible=block.replace(/<!--[\s\S]*?-->/g,'');
  const heading=visible.match(/^# (.+)$/m); if(heading)section=heading[1];
  const id=block.match(/<!-- (source-slide|new-slide): ([^ ]+) -->/);
  if(!id)continue;
  const title=visible.match(/^## (.+)$/m); if(!title)throw Error('Missing heading: '+id[2]);
  const layout=block.match(/<!-- review-layout: ([^ ]+) -->/)?.[1];
  if(!layout)throw Error('Explicit review-layout required: '+id[2]);
  out.push({id:id[2],kind:id[1],title:title[1],section,content:block,layout});
 }
 return out;
}
function bodyParagraphs(content) {
 return content.replace(/<!--[\s\S]*?-->/g,'').replace(/^#{1,2} .+$/gm,'')
  .replace(/!\[[^\]]*\]\([^)]+\)/g,'').replace(/^Source:.*$/gm,'').trim()
  .split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
}
function rich(s, resolveLink = target => JSON.stringify(target)) {
 return s.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g).map(t=>{
  const m=t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(m)return `<a href=${resolveLink(m[2])} target="_blank" rel="noreferrer" style={{color:'inherit',textDecoration:'underline'}}>${esc(m[1])}</a>`;
  if(t.startsWith('`'))return `<code style={{fontSize:'0.92em'}}>${esc(t.slice(1,-1))}</code>`;
  if(t.startsWith('**'))return `<strong>${esc(t.slice(2,-2))}</strong>`;
  return esc(t);
 }).join('');
}
async function main() {
 fs.mkdirSync(assets,{recursive:true});fs.mkdirSync(qa,{recursive:true});
 const slides=parse(fs.readFileSync(path.join(root,'deck.md'),'utf8'));
 const imports=["import type { Page, DesignSystem, SlideMeta } from '@open-slide/core';"];
 const components=[],notes=[],audit=[];let imageIndex=0;
 for(let n=0;n<slides.length;n++){
  const s=slides[n],paragraphs=bodyParagraphs(s.content),items=[],es=[];
  const visible=s.content.replace(/<!--[\s\S]*?-->/g,'');
  const review=s.content.match(/<!-- review-note: ([\s\S]*?) -->/)?.[1]||'';
  const headerLines=wrap(s.title,55); if(headerLines.length>2)throw Error('Heading exceeds two lines: '+s.id);
  const top=headerLines.length===2?258:214;
  const heading=`<h1 style={{position:'absolute',left:100,top:65,width:1720,fontSize:62,fontWeight:700,lineHeight:1.13,margin:0}}>${esc(s.title)}</h1>`;
  es.push(rect(0,0,1920,1080,C.bg),...txt(100,116,s.title,62,C.ink,700,1720));
  function prose(x,y,width,font,paras,maxY=948){
   let cursor=y;
   for(const p of paras){
    // Conservative line count used by both the QA output and the browser layout.
    const lines=wrap(plain(p),Math.floor(width/(font*.56)));
    const height=lines.length*font*1.42;
    if(cursor+height>maxY)throw Error(`Body overflow ${s.id}: ${cursor+height} > ${maxY}; shorten copy or change layout`);
    items.push(`<p data-slide-body style={{position:'absolute',left:${x},top:${cursor},width:${width},fontSize:${font},lineHeight:1.42,margin:0}}>${rich(p)}</p>`);
    lines.forEach((t,k)=>es.push(...txt(x,cursor+font+k*font*1.42,t,font,C.ink,400,width)));
    cursor+=height+24;
   }
  }
  async function figure(box){
   const match=[...visible.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)][0];
   if(!match)throw Error('Missing figure reference: '+s.id);
   const file=path.resolve(root,match[2]); if(!fs.existsSync(file))throw Error('Missing figure file: '+file);
   const meta=await sharp(file).metadata();const scale=Math.min(box.w/meta.width,box.h/meta.height);
   const w=meta.width*scale,h=meta.height*scale,x=box.x+(box.w-w)/2,y=box.y+(box.h-h)/2;
   const name='evidence-'+s.id+path.extname(file),target=path.join(assets,name);
   if(file!==target)fs.copyFileSync(file,target);
   const binding='figure'+imageIndex++;imports.push(`import ${binding} from './assets/${name}';`);
   if(specs[s.id] && path.basename(file)===s.id+'.svg') {
    const nodes=primitives(specs[s.id]).map(o=>o.type==='text'?`<text x={${o.x}} y={${o.y}} fontSize={${o.size}} fill=${JSON.stringify(o.color)} fontWeight={${o.weight}}>${esc(o.text)}</text>`:o.type==='line'?`<path d="M${o.x},${o.y} L${o.x2},${o.y2}" stroke=${JSON.stringify(o.color)} strokeWidth={3} fill="none"/>`:o.type==='rect'?`<rect x={${o.x}} y={${o.y}} width={${o.w}} height={${o.h}} fill=${JSON.stringify(o.fill)}/>`:'');
    items.push(`<svg data-slide-figure aria-label={${JSON.stringify(match[1])}} viewBox="0 0 1660 680" style={{position:'absolute',left:${x},top:${y},width:${w},height:${h},fontFamily:'Arial, sans-serif'}}>${nodes.join('')}</svg>`);
   } else items.push(`<img data-slide-figure src={${binding}} alt={${JSON.stringify(match[1])}} style={{position:'absolute',left:${x},top:${y},width:${w},height:${h},objectFit:'contain'}}/>`);
   const png=await sharp(file).resize({width:1720,height:1000,fit:'inside'}).png().toBuffer();
   es.push({type:'image',x,y,w,h,href:'data:image/png;base64,'+png.toString('base64')});
  }
  if(s.layout==='section'){
   const workshopNumber=s.id.match(/workshop-(\d)-section/)?.[1]||'';
   items.push(`<div style={{position:'absolute',left:100,top:285,fontSize:250,lineHeight:1,fontWeight:700,color:'#2E70FF'}}>${workshopNumber.padStart(2,'0')}</div>`);
   items.push(`<div style={{position:'absolute',left:520,top:390,width:1200,height:4,background:'#2E70FF'}}/>`);
   es.push(...txt(100,500,workshopNumber.padStart(2,'0'),250,C.blue,700,360),line(520,425,1720,425,C.blue));
   prose(520,475,1190,46,paragraphs,820);
  }
  else if(s.layout==='text')prose(100,top+42,1670,38,paragraphs);
  else if(s.layout==='figure-full'){
   await figure({x:100,y:top+10,w:1720,h:710-(top-214)});
  }else if(s.layout==='figure'){
   await figure({x:100,y:top+20,w:990,h:710-(top-214)});
   prose(1150,top+24,650,32,paragraphs);
  }else if(s.layout==='figure-caption'){
   await figure({x:100,y:top+10,w:1720,h:465});
   prose(100,top+510,1720,32,paragraphs);
  }else if(s.layout==='table'){
   const spec=specs[s.id];if(!spec||spec.kind!=='table')throw Error('No table for '+s.id);
   prose(100,top+2,1720,30,paragraphs,top+136);
   const e=primitives(spec);const offset=top+150;
   const elements=e.map(o=>o.type==='text'?`<text x={${o.x}} y={${o.y}} fontSize={${o.size}} fill=${JSON.stringify(o.color)} fontWeight={${o.weight}}>${esc(o.text)}</text>`:o.type==='line'?`<path d="M${o.x},${o.y} L${o.x2},${o.y2}" stroke=${JSON.stringify(o.color)} strokeWidth={3} fill="none"/>`:'');
   items.push(`<svg data-slide-table viewBox="0 0 1660 680" style={{position:'absolute',left:100,top:${offset},width:1660,height:570,fontFamily:'Arial, sans-serif'}}>${elements.join('')}</svg>`);
   const factor=570/680;
   es.push(...e.map(o=>({...o,x:100+o.x,y:offset+o.y*factor,...(o.type==='text'?{size:o.size*factor}:{}),...(o.type==='line'?{x2:100+o.x2,y2:offset+o.y2*factor}:{})})));
  }else throw Error('Unknown layout '+s.layout);
  const source=visible.match(/^Source:\s*(.*)$/m)?.[1]||'';
  const sourceHTML=rich(source,target=>{
   if(/^https?:|^#/.test(target))return JSON.stringify(target);
   const file=path.resolve(root,target);if(!fs.existsSync(file))throw Error('Missing local source: '+file);
   const name='source-'+s.id+'-'+imports.length+path.extname(file);fs.copyFileSync(file,path.join(assets,name));
   const binding='source'+imports.length;imports.push(`import ${binding} from './assets/${name}?url';`);return '{'+binding+'}';
  });
  if(source)items.push(`<p data-slide-source style={{position:'absolute',left:100,top:982,width:1450,fontSize:21,lineHeight:1.3,margin:0,color:'#676358'}}>${sourceHTML}</p>`);
  items.push(`<div style={{position:'absolute',right:100,bottom:30,fontSize:25,color:'#999386'}}>@rajistics</div>`);
  es.push(...txt(100,1040,plain(source).slice(0,115),20,C.muted),...txt(1680,1040,'@rajistics',25,'#999386'));
  if(review){
   items.push(`<p data-review-note style={{position:'absolute',left:100,top:948,width:1720,fontSize:22,lineHeight:1.2,margin:0,color:'#AF3E36',fontWeight:600}}>${esc(review)}</p>`);
   es.push(...txt(100,967,review,22,C.red,600,1720));
  }
  components.push(`const Slide${n}: Page = () => <div data-workshop-slide=${JSON.stringify(s.id)} style={{position:'relative',width:'100%',height:'100%',background:'var(--osd-bg)',color:'var(--osd-text)',fontFamily:'var(--osd-font-body)'}}>${heading}${items.join('\n')}</div>;`);
  notes.push(`[${s.id}] ${s.section}\n\n${s.content}`);
  audit.push({id:s.id,page:n+1,title:s.title,section:s.section,layout:s.layout,bodyParagraphs:paragraphs.length});
  const render=svg(es.filter(o=>o.type!=='image'),1920,1080).replace('</svg>',es.filter(o=>o.type==='image').map(o=>`<image x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" href="${o.href}"/>`).join('')+'</svg>');
  await sharp(Buffer.from(render)).resize(960,540).png().toFile(path.join(qa,`${String(n+1).padStart(3,'0')}.png`));
 }
 const code=imports.join('\n')+`\nexport const design: DesignSystem={palette:{bg:'#F9F1D9',text:'#20201E',accent:'#2E70FF'},fonts:{display:'Arial, sans-serif',body:'Arial, sans-serif'},typeScale:{hero:62,body:36},radius:0};\n`+components.join('\n\n')+`\nexport const notes=${JSON.stringify(notes)};\nexport const meta: SlideMeta={title:'Harness engineering workshop',createdAt:'2026-09-10T12:24:25.286Z'};\nexport default [${slides.map((_,i)=>'Slide'+i).join(',')}] satisfies Page[];\n`;
 fs.writeFileSync(path.join(dest,'index.tsx'),code);fs.writeFileSync(path.join(qa,'audit.json'),JSON.stringify(audit,null,2));
 for(let start=0;start<slides.length;start+=20){const inputs=[];for(let i=start;i<Math.min(start+20,slides.length);i++){inputs.push({input:await sharp(path.join(qa,`${String(i+1).padStart(3,'0')}.png`)).resize(480,270).toBuffer(),left:((i-start)%4)*480,top:Math.floor((i-start)/4)*300});inputs.push({input:Buffer.from(`<svg width="480" height="30"><text x="10" y="22" font-family="Arial" font-size="18">${i+1} [${esc(slides[i].id)}]</text></svg>`),left:((i-start)%4)*480,top:Math.floor((i-start)/4)*300+270});}await sharp({create:{width:1920,height:1500,channels:4,background:'#ddd'}}).composite(inputs).png().toFile(path.join(qa,`sheet-${start+1}.png`));}
 console.log(JSON.stringify({slides:slides.length,sourceFigures:imageIndex,review:qa}));
}
main().catch(e=>{console.error(e);process.exit(1)});
