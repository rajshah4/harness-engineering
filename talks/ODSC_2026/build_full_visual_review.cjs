// Generate review layouts from the current Markdown without changing the original PPTX.
// Text and diagram primitives become explicit JSX nodes, not flattened slide images.
const fs = require('fs'), path = require('path');
// Install sharp in your tooling environment, or point SHARP_MODULE at its module path.
const sharp = require(process.env.SHARP_MODULE || 'sharp');
// The checked-in snapshot is the portable default; an explicit argument can use a working copy.
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
table('workshop-2-result',['Tool surface','Evidence / 6','Time','Tool calls'],[
 ['Broad GitHub catalog','6 / 6','123 s','12'],['Terminal + API','4 / 6','101 s','6'],['Task-shaped tool','6 / 6','72 s','1']],
 'Medians of 3 trials per condition. Tool calls can contain different amounts of work.',[600,370,310,300]);
table('workshop-3-result',['Saved guidance','Verifier passes','Time','Processed tokens'],[
 ['None','3 / 3','141 s','283K'],['Save everything','0 / 3','196 s','414K'],['Curated','3 / 3','126 s','291K']],
 '3 trials per condition. Stale guidance deliberately planted. Time and token figures are medians.',[510,380,290,400]);
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
flow('workshop-3-mechanism',[
 ['Stale guidance','Use toyapp/cursor.py'],['Agent implementation','Creates that module'],['Agent-written tests','Green suite'],['External verifier','Wrong public module']],
 'The current contract required CursorPage in toyapp.pagination. All 3 save-everything trials failed.');
compare('workshop-3-reversal',['No guidance','3 / 3 external passes','Rediscovered repository design','Skipped the full suite'],['Curated guidance','3 / 3 external passes','Followed current design','Focused tests, then full suite'], 'Correctness tied. Time ranges overlapped. The observed advantage was verification process.');
flow('044', [['Instructions','Goal and constraints'],['Selected evidence','Files and tool results'],['Recent history','Current actions and observations'],['Next model call','One assembled input']], 'The harness controls which information enters this call. This is a schematic, not a token breakdown.');
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
flow('116',[['Check the request','Already satisfied?'],['Run and verify','Fresh evidence after edits'],['Evaluate state','Passed, blocked or budget used'],['Record outcome','Honest terminal status']], 'No code change can be the correct outcome when the requested behavior already exists.');
flow('117',[['Attempt','Work within the budget'],['External check','Compare with requirements'],['Decision','Continue, escalate or stop'],['Checkpoint','Failure evidence and next step']], 'Continue only with a reason and remaining budget. An exhausted budget is not success.');
flow('118',[['Initialize','Feature list and setup'],['Work','One feature this session'],['Verify + save','Test, progress file, commit'],['Resume','Load state into fresh context']], 'Adapted from the long-running-agent pattern described in the working deck.');
flow('hooks',[['Before a tool','Check permitted action'],['After a tool','Inspect execution result'],['Before stopping','Require fresh evidence']], 'Illustrative hook locations. Hook names and guarantees differ across harnesses.');
compare('157',['Independent investigations','Separate repository questions','Read-only evidence gathering','Root combines the findings'],['Shared implementation','Same changing files','Edits depend on each other','Keep one implementation owner'], 'Compare setup, handoffs and synthesis with one agent using the same total budget.');
flow('175',[['Assign','Question and allowed files'],['Worker','Bounded work and budget'],['Return','Evidence and uncertainty'],['Owner','Synthesize and verify']], 'Every child needs a stopping rule. The parent remains accountable for the combined result.');
flow('143',[['Architecture rule','Explicit allowed structure'],['Executable check','Lint or CI validation'],['Failure evidence','Actionable error message'],['Agent repair','Edit and rerun the check']], 'Illustrative enforcement pattern. Checks cover specified rules, not all software quality.');
flow('why-alternatives',[['Choose a harness','Inherit its defaults'],['Inspect a run','Find a task-specific failure'],['Change one choice','Tool, context or completion'],['Compare again','Outcome and total cost']], 'The workshop starts with existing harnesses. Build only the behavior the task needs.');
table('076',['Instruction-file issue','Repositories affected'],[['Duplicated lint rules','62%'],['Context bloat','42%'],['Skill leakage','35%']], 'Reported audit of 100 repositories. Categories can overlap; recheck the paper before presenting.',[900,680]);
table('082',['Skills condition','Average pass rate'],[['Without curated skills','33.9%'],['With curated skills','50.5%']], 'Working-deck figures: +16.6 percentage points across tested configurations. Source recheck pending.',[1000,580]);
table('109',['Attempt policy','Reported success','Reported cost'],[['Two GLM-5.2 attempts','57.8% best-of-two','$7.90'],['One Sonnet 5 attempt','52.7%','$25.84']], 'Source reports unequal attempt counts. Best-of-two requires a way to identify the successful output.',[700,540,340]);
table('111',['Reported measure','Sonnet 5','GLM-5.2'],[['First-shot success','52.7%','41.2%'],['Runs writing tests','92%','82%'],['Lines changed','1,650','1,081']], '452 rollouts per model in the cited comparison. More tests do not by themselves establish correctness.',[760,410,410]);
table('135',['Completion policy','Unsupported stops'],[['Matched baseline','40 / 66'],['Certificate-gated control','0 / 66']], 'Reported evidence-contract result. A certificate is not proof of external truth or safety.',[1000,580]);
flow('134',[['Validator','Owns the hidden checks'],['Orchestrator','Translates findings into directives'],['Implementer','Repairs without seeing the checks']], 'Role separation from the working Factory example. Keep the hidden instrument outside implementer context.');
flow('178',[['Candidate change','Prompt, tool or context policy'],['Evaluation','New tasks and old tasks'],['Accept or reject','Check gains and regressions'],['Versioned harness','Keep a rollback path']], 'Illustrative self-improvement loop. A proposal is not an accepted harness update.');
table('149',['Interface principle','What to inspect'],[['Simple actions','Can the model choose the right operation?'],['Compact actions','How much recurring work does one call handle?'],['Informative feedback','Does the result support the next decision?'],['Guardrails','Which failures can the harness contain?']], 'Check the action interface, feedback and error handling separately.',[610,970]);
table('073',['AGENTS.md example','Reason to keep it'],[['Test command','Reproducible repository verification'],['Architecture constraint','A stable requirement to check'],['Local convention','Guidance that changes the work']], 'Illustrative contents. Keep task-specific logs and stale instructions out of shared guidance.',[650,930]);
compare('edit-format',['Edit representations','Whole-file rewrite','Search and replace','Structured patch'],['Failure to inspect','Unintended unrelated changes','Missing or ambiguous match','Patch no longer applies'], 'Illustrative failure modes. A controlled same-model benchmark remains a source follow-up.');
const overrides={
 '012':['1. Harness choice','2. Tool design','3. Context, working state and memory','4. Model routing','5. Completion, recovery and stopping','6. Multi-agent systems'],
 '040':['No saved guidance: rediscover the repository design.','Save everything: 620 words, including a plausible stale rule.','Curated context: 100 words of current guidance.','Same pagination task, model, starter repository and external verifier. Three trials per condition.'],
 '014':['Where does the first useful repository evidence appear?','How do model calls and context per call differ?','Which requirements pass the final verifier?','Hold the task, model, repository, environment and verifier fixed.'],
 '010': ['Compare the model and harness together.','The saved figures use a minimal evaluation harness, not a direct test of the branded products.','The benchmark labels and model versions need rechecking before this becomes a product comparison.'],
 '031': ['Instructions can describe how to use a tool.','Structured definitions make the callable interface explicit.','MCP makes integrations reusable. Tool search defers which definitions enter the prompt.'],
 '050': ['Long documents, data tables and repositories can fill even a large context window.','Window capacity and useful retrieval are different constraints.'],
 '196': ['In the reported five-server example, initial tool context fell from about 77K to 8.7K tokens.','The useful test is whether the agent can still find and use the relevant tool.'],
 '059': ['Base input fell from about 6K to 2K tokens per default-agent turn.','Planning and the todo tool became optional after testing.'],
 '082': ['Average pass rate rose from 33.9% to 50.5% across tested configurations.','The improvement varied by configuration and skill.'],
 '106': ['CodeRescue used execution feedback to choose recovery or escalation.','The reported policy used 35% of always-escalate recovery cost.'],
 '113': ['Verifier result: 7/8 versus 8/8.','Wall time: 12.4 versus 26.7 minutes.','These runs do not isolate a routing policy.'],
 '135': ['Baseline: 40 of 66 stops lacked sufficient trace support.','Certificate-gated control: 0 of 66.','The certificate checks an evidence contract, not external truth or safety.'],
 '133': ['Factory assigned completion control to a validator and orchestrator.','The reported system reached 90.3% behavioral parity.','The conditions were not compute-matched.'],
 '134': ['The validator owns the grading instrument.','The orchestrator turns findings into directives.','The implementer repairs the system without seeing the hidden instrument.'],
 '167': ['Anthropic reported a 90.2% lift on its internal research evaluation.','It also reported about 15× the tokens of chat interactions.','These are different comparison baselines. This is not a measured 90.2%-for-15× exchange.'],
 '169': ['One agent was best or tied in 6 of 8 model–dataset cells.','The comparison held the global thinking-token budget fixed.'],
 '174': ['The work separates into independently checkable tasks.','Ownership and merge rules stay explicit.','Budgets, checkpoints and verification remain outside individual agents.'],
 '036': ['14 browser schemas appeared on every call.','17 mostly failing browser actions consumed 335 seconds, about 21% of wall time.'],
 '045': ['Active context: what the model sees now.','Working state: what lets this task resume.','Durable guidance: what should help a future task.'],
 '132': ['Factory compared a single agent with a validator and orchestrator.','The Fable 5 system condition reached a median hidden-suite score of 89.3.','The system had a much larger wall-clock budget.'],
 '165': ['The model writes orchestration scripts and decomposes work at runtime.','Parallel workers report to checkpoints outside the conversation.','Ownership, merge rules and stop conditions still need explicit design.'],
 '166': ['Anthropic reported porting 750K lines of Rust with agents and repair loops.','The port was not yet in production in the cited report.'],
 '168': ['The best reported workflow improved the average by 1.44 points.','Five other workflows trailed the single-agent baseline.'],
 '122': ['A single user request can trigger many model calls.','Each call can request a tool, receive feedback and choose what to do next.'],
 '197': ['Even temperature-0 runs flipped about 9% of instance outcomes.','Repeat small benchmark gains before treating them as improvements.'],
};
function wrap(s,max){const out=[];for(const paragraph of String(s).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){if((line+' '+word).trim().length>max&&line){out.push(line);line=word;}else line=(line+' '+word).trim();}if(line)out.push(line);}return out;}
function txt(x,y,s,size=34,color=C.ink,weight=400,width=1580){return wrap(s,Math.floor(width/(size*.53))).map((t,i)=>({type:'text',x,y:y+i*size*1.3,text:t,size,color,weight}));}
const rect=(x,y,w,h,fill)=>({type:'rect',x,y,w,h,fill});
const line=(x,y,x2,y2,color=C.line)=>({type:'line',x,y,x2,y2,color});
function primitives(s){let e=[];if(s.kind==='table'){
 const widths=s.widths||s.heads.map(()=>1580/s.heads.length);let x=40;
 s.heads.forEach((h,i)=>{e.push(...txt(x,60,h,28,C.muted,700,widths[i]-20));x+=widths[i];});e.push(line(40,90,1620,90));
 const rh=s.rows.length>4?87:125;
 s.rows.forEach((row,r)=>{let x=40;row.forEach((v,i)=>{e.push(...txt(x,150+r*rh,v,i===0?32:38,(String(v).startsWith('0 /')?C.red:i===1?C.blue:C.ink),i===1?700:400,widths[i]-20));x+=widths[i];});e.push(line(40,183+r*rh,1620,183+r*rh));});
 }else if(s.kind==='flow'){
 const width=1580/s.steps.length;
 s.steps.forEach(([head,body],i)=>{const x=40+i*width;e.push(...txt(x,110,String(i+1).padStart(2,'0'),40,C.blue,700,width-55),line(x,140,x+width-60,140,C.blue),...txt(x,213,head,36,C.ink,700,width-70),...txt(x,325,body,32,C.ink,400,width-70));if(i<s.steps.length-1){const a=x+width-50;e.push(line(a,237,a+30,237,C.blue),line(a+20,229,a+30,237,C.blue),line(a+20,245,a+30,237,C.blue));}});
 }else{[s.left,s.right].forEach((items,i)=>{const x=40+i*840;e.push(...txt(x,90,items[0],38,C.ink,700,740),line(x,125,x+740,125,C.blue));items.slice(1).forEach((t,j)=>e.push(...txt(x,210+j*95,t,34,C.ink,400,740)));});}
 e.push(...txt(40,590,s.caption,27,C.muted,400,1580));return e;}
function svg(e,width=1660,height=680){return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Arial, sans-serif">`+e.map((o,i)=>`<g id="part-${i}">`+(o.type==='text'?`<text x="${o.x}" y="${o.y}" font-size="${o.size}" fill="${o.color}" font-weight="${o.weight}">${esc(o.text)}</text>`:o.type==='rect'?`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="${o.fill}"/>`:`<path d="M${o.x},${o.y} L${o.x2},${o.y2}" stroke="${o.color}" stroke-width="3" fill="none"/>`)+'</g>').join('')+'</svg>';}
function parse(md){let section='Opening';const chunks=md.split(/(?=<!-- (?:source-slide|new-slide):)/);const out=[];for(const chunk of chunks.slice(1)){const id=chunk.match(/<!-- (source-slide|new-slide): ([^ ]+) -->/);const title=chunk.match(/^## (.+)/m);if(!title)continue;const nextsection=chunk.match(/^# ([^\n]+)/m);let content=chunk.split(/^# /m)[0];out.push({id:id[2],kind:id[1],title:title[1],section,content});if(nextsection)section=nextsection[1];}return out;}
function cleanBody(s){return s.replace(/<!--[\s\S]*?-->/g,'').replace(/^## .+\n/m,'').replace(/!\[[^\]]*\]\([^)]+\)/g,'').split('\n').map(x=>x.trim()).filter(x=>x&&!/^(@@|Source:|Candidate teaching|TO |Add one|Add a trace|Insert the |Editable reconstruction|N\d+$|---|\[Open |\d+\.5$)/.test(x)).map(plain).filter(x=>!/^https?:/.test(x));}
async function main(){fs.mkdirSync(assets,{recursive:true});fs.mkdirSync(qa,{recursive:true});const md=fs.readFileSync(path.join(root,'deck.md'),'utf8'),slides=parse(md);const imports=[],pages=[],notes=[],audit=[];let assetCount=0;
 const j=JSON.stringify;
 let code=`import approvedHarvey from '../harvey-visual-review';\nimport approvedTools from '../tools-context-visual-review';\nimport { Steps, Step, type Page, type DesignSystem, type SlideMeta } from '@open-slide/core';\nexport const design: DesignSystem = {palette:{bg:'#F9F1D9',text:'#20201E',accent:'#2E70FF'},fonts:{display:'Arial, sans-serif',body:'Arial, sans-serif'},typeScale:{hero:62,body:36},radius:0};\n`;
 const patch=[];
 for(let n=0;n<slides.length;n++){
 const s=slides[n],spec=specs[s.id];let es=[],imgs=[];
 for(const m of s.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)){const file=path.resolve(root,m[2]);if(fs.existsSync(file)){imgs.push({file,alt:m[1]});}else audit.push({id:s.id,issue:'Missing image: '+file});}
 let mode=spec?spec.kind:imgs.length?'source-figure':'text';let body=overrides[s.id]||cleanBody(s.content);const issues=[];
 if(/TO FILL|TO VERIFY|recheck the underlying source|pending/i.test(s.content))issues.push('Source / content follow-up remains in Markdown');
 if(/^@@/m.test(s.content))issues.push('Author comment needs a decision');
 if(s.id==='010')issues.push('Benchmark models/scaffolds do not establish branded-product performance; do not use as a ranking');
 if(['008','009','022'].includes(s.id))issues.push('Refresh dated adoption or repository statistics');
 if(s.id==='167')issues.push('Quality and token multipliers use different baselines');
 if(!imgs.length&&!spec&&body.join(' ').length>550)issues.push('Dense prose condensed for preview; full text retained in notes and Markdown');
 let header=txt(100,116,s.title,62,C.ink,700,1720);if(header.length>3)throw Error('Heading too long '+s.id);
 es.push(rect(0,0,1920,1080,C.bg),...header);
 const jsx=[];
 if(spec){const e=primitives(spec);es.push(...e.map(o=>({...o,x:o.x+100,y:o.y+240,...(o.type==='line'?{x2:o.x2+100,y2:o.y2+240}:{})})));fs.writeFileSync(path.join(assets,s.id+'.svg'),svg(e));
 for(const o of e){if(o.type==='text')jsx.push(`<text x={${o.x}} y={${o.y}} fontSize={${o.size}} fill=${j(o.color)} fontWeight={${o.weight}}>${esc(o.text)}</text>`);else if(o.type==='line')jsx.push(`<path d="M${o.x},${o.y} L${o.x2},${o.y2}" stroke=${j(o.color)} strokeWidth={3} fill="none"/>`);}
 const old=s.content;let updated=old;
 if(!updated.includes(`/assets/${s.id}.svg`))updated=updated.replace(/(^## .+\n)/m,`$1\n![${s.title.replaceAll(']','')}](${path.join(assets,s.id+'.svg')})\n`);
 updated=updated.replace(/^TO BUILD:.*\n/gm,'');
 if(updated!==old)patch.push({old,new:updated});
 }else if(imgs.length){const im=imgs[0],ext=path.extname(im.file),name=`evidence-${s.id}${ext}`,target=path.join(assets,name);if(im.file!==target)fs.copyFileSync(im.file,target);const v='image'+assetCount++;imports.push(`import ${v} from './assets/${name}';`);const meta=await sharp(im.file).metadata();const scale=Math.min(1720/meta.width,680/meta.height);let w=meta.width*scale,h=meta.height*scale,x=100+(1720-w)/2,y=260+(680-h)/2;
 jsx.push(`<img src={${v}} alt={${j(im.alt)}} style={{position:'absolute',left:${x},top:${y},width:${w},height:${h},objectFit:'contain'}}/>`);
 const mime=ext==='.svg'?'image/svg+xml':ext==='.jpg'||ext==='.jpeg'?'image/jpeg':'image/png';es.push({type:'image',x,y,w,h,href:`data:${mime};base64,${fs.readFileSync(im.file).toString('base64')}`});
 if(meta.width<1000)issues.push(`Source image only ${meta.width}px wide; obtain higher resolution`);
 if(imgs.length>1)issues.push('Additional images retained in Markdown; preview uses the first');
 }else{body=body.filter(t=>t!==s.title);let lines=[];const selected=body.slice(0,6);for(const t of selected){lines.push(...wrap(t,83), '');}while(lines.at(-1)==='')lines.pop();if(lines.length>13){lines=[];for(const t of selected.slice(0,2))lines.push(...wrap(t,83),'');issues.push('Additional prose remains in speaker notes');}const y=lines.length<5?370:280;lines.forEach((t,i)=>{if(t){const e=txt(100,y+i*47,t,36,C.ink,400,1720)[0];es.push(e);jsx.push(`<div style={{position:'absolute',left:100,top:${e.y-36},width:1720,fontSize:36,lineHeight:1.3}}>${esc(t)}</div>`);}});}
 const sourceline=s.content.match(/^(?:Source:|Candidate teaching example:)(.+)$/m)?.[1]||'';
 const links=[...sourceline.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];const sourceURL=links.find(m=>/^https?:/.test(m[2]))?.[2];
 const label=sourceURL?new URL(sourceURL).hostname.replace(/^www\./,''):(sourceline?'Workshop evidence in speaker notes':'');
 const caveat=issues.some(i=>/source|statistics|benchmark|baselines/i.test(i))?'Source check pending':s.section==='Reserves'?'Reserve slide':'';
 if(caveat)es.push(...txt(100,992,caveat,22,C.muted,400,1650));es.push(...txt(100,1040,label,23,C.muted),...txt(1680,1040,'@rajistics',25,'#999386'));
 const base=`<div style={{position:'relative',width:'100%',height:'100%',background:'var(--osd-bg)',color:'var(--osd-text)',fontFamily:'var(--osd-font-body)'}}><h1 style={{position:'absolute',left:100,top:65,width:1720,fontSize:62,fontWeight:700,lineHeight:1.13,margin:0}}>${esc(s.title)}</h1>`;
const svgLayer=(parts)=>`<svg viewBox="0 0 1660 680" style={{position:'absolute',left:100,top:240,width:1660,height:680,fontFamily:'Arial, sans-serif'}}>${parts.join('\n')}</svg>`;
let content=spec?svgLayer(jsx):jsx.join('\n');
if(spec?.kind==='table'&&['workshop-2-result','workshop-3-result','workshop-4-repeated-result','workshop-5-ceiling','workshop-5-repair-cost'].includes(s.id)){
const split=40+spec.widths[0]+spec.widths[1];const later=jsx.filter(t=>Number(t.match(/<text x=\{(\d+)/)?.[1]||0)>=split);const initial=jsx.filter(t=>!later.includes(t));
content=svgLayer(initial)+`<Steps><Step>${svgLayer(later)}</Step></Steps>`;
}
 pages.push(`const Slide${n}: Page = () => ${base}${content}${caveat?`<div style={{position:'absolute',left:100,top:966,width:1650,fontSize:22,color:'#676358'}}>${esc(caveat)}</div>`:''}${sourceURL?`<a href=${j(sourceURL)} target="_blank" rel="noreferrer" style={{position:'absolute',left:100,bottom:30,fontSize:23,color:'#676358'}}>${esc(label)}</a>`:''}<div style={{position:'absolute',right:100,bottom:30,fontSize:25,color:'#999386'}}>@rajistics</div></div>;`);
 const approved={'harvey-harness-result':'approvedHarvey[0]','harvey-harness-mechanism':'approvedHarvey[1]','150':'approvedTools[0]','151':'approvedTools[1]','tool-evaluation-levels':'approvedTools[2]','compaction-preservation-policy':'approvedTools[3]','repeated-compaction-drift':'approvedTools[4]'}[s.id]; if(approved)pages[pages.length-1]=`const Slide${n}: Page = ${approved};`;
 notes.push(`[${s.id}] ${s.section}\n\n${s.content}\n\nVISUAL REVIEW: ${issues.join('; ')||'Layout draft; source figure preserved where present.'}`);
 audit.push({id:s.id,page:n+1,title:s.title,section:s.section,layout:mode,issues});
 const render=svg(es.filter(o=>o.type!=='image'),1920,1080).replace('</svg>',es.filter(o=>o.type==='image').map(o=>`<image x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" href="${o.href}"/>`).join('')+'</svg>');
 await sharp(Buffer.from(render)).resize(960,540).png().toFile(path.join(qa,`${String(n+1).padStart(3,'0')}.png`));
 }
 code=imports.join('\n')+'\n'+code+pages.join('\n\n')+`\nexport const notes = ${j(notes)};\nexport const meta: SlideMeta = {title:'ODSC full-deck visual review',createdAt:${j(new Date().toISOString())}};\nexport default [${slides.map((_,i)=>'Slide'+i).join(',')}] satisfies Page[];\n`;
 fs.writeFileSync(path.join(dest,'index.tsx'),code);
 fs.writeFileSync(path.join(qa,'audit.json'),JSON.stringify(audit,null,2));fs.writeFileSync(path.join(qa,'markdown-edits.json'),JSON.stringify(patch));
 for(let start=0;start<slides.length;start+=20){let inputs=[];for(let i=start;i<Math.min(start+20,slides.length);i++){const png=await sharp(path.join(qa,`${String(i+1).padStart(3,'0')}.png`)).resize(480,270).toBuffer();inputs.push({input:png,left:((i-start)%4)*480,top:Math.floor((i-start)/4)*300});const label=Buffer.from(`<svg width="480" height="30"><text x="10" y="22" font-family="Arial" font-size="18">${i+1} [${esc(slides[i].id)}]</text></svg>`);inputs.push({input:label,left:((i-start)%4)*480,top:Math.floor((i-start)/4)*300+270});}await sharp({create:{width:1920,height:1500,channels:4,background:'#ddd'}}).composite(inputs).png().toFile(path.join(qa,`sheet-${start+1}.png`));}
 console.log(JSON.stringify({slides:slides.length,newVisuals:Object.keys(specs).length,sourceFigures:assetCount,review:qa}));
}
main().catch(e=>{console.error(e);process.exit(1)});
