// Editable SVG and Excalidraw teaching diagrams. PNGs are presentation previews.
const fs = require('fs');
const path = require('path');
const sharp = require('/Users/rajiv.shah/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const out = path.join(__dirname, 'teaching-visuals');
fs.mkdirSync(out, {recursive:true});
const C = {bg:'#FAF2DB', ink:'#202523', muted:'#626764', teal:'#147F7B', orange:'#C67535', pale:'#DDECE7', line:'#CAC7BC'};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let shapes=[], seq=0;
function text(x,y,s,size=32,color=C.ink,weight=400){ shapes.push({kind:'text',x,y,s,size,color,weight}); }
function rect(x,y,w,h,color){shapes.push({kind:'rect',x,y,w,h,color});}
function line(x,y,x2,y2,color=C.line,width=2){shapes.push({kind:'line',x,y,x2,y2,color,width});}
function base(title,subtitle){shapes=[];seq=0;text(100,130,title,56,C.ink,700);text(102,185,subtitle,27,C.muted);line(100,225,1820,225);}
function arrow(x,y,x2,y2){line(x,y,x2,y2,C.teal,5);line(x2-16,y2-12,x2,y2,C.teal,5);line(x2-16,y2+12,x2,y2,C.teal,5);}
function exBase(type,x,y,w,h,color){return {id:`shape-${seq++}`,type,x,y,width:w,height:h,angle:0,strokeColor:color,backgroundColor:'transparent',fillStyle:'solid',strokeWidth:2,strokeStyle:'solid',roughness:0,opacity:100,groupIds:[],frameId:null,index:null,roundness:null,seed:seq+10,version:1,versionNonce:seq+50,isDeleted:false,boundElements:null,updated:0,link:null,locked:false};}
async function save(name){
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="${C.bg}"/>`+shapes.map(o=>o.kind==='text'?`<text x="${o.x}" y="${o.y}" font-family="Arial, sans-serif" font-size="${o.size}" fill="${o.color}" font-weight="${o.weight}">${esc(o.s)}</text>`:o.kind==='rect'?`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="${o.color}"/>`:`<line x1="${o.x}" y1="${o.y}" x2="${o.x2}" y2="${o.y2}" stroke="${o.color}" stroke-width="${o.width}"/>`).join('')+'</svg>';
 const elements=shapes.map(o=>{if(o.kind==='text'){let e=exBase('text',o.x,o.y-o.size,o.s.length*o.size*0.56,o.size*1.3,o.color);return {...e,text:o.s,originalText:o.s,fontSize:o.size,fontFamily:2,textAlign:'left',verticalAlign:'top',containerId:null,autoResize:true,lineHeight:1.25};}if(o.kind==='rect'){let e=exBase('rectangle',o.x,o.y,o.w,o.h,o.color);return {...e,backgroundColor:o.color,strokeWidth:0};}let e=exBase('line',o.x,o.y,Math.abs(o.x2-o.x),Math.abs(o.y2-o.y),o.color);return {...e,points:[[0,0],[o.x2-o.x,o.y2-o.y]],strokeWidth:o.width,startArrowhead:null,endArrowhead:null};});
 fs.writeFileSync(path.join(out,name+'.svg'),svg);
 fs.writeFileSync(path.join(out,name+'.excalidraw'),JSON.stringify({type:'excalidraw',version:2,source:'ODSC teaching diagrams',elements,appState:{viewBackgroundColor:C.bg},files:{}},null,2));
 await sharp(Buffer.from(svg)).png().toFile(path.join(out,name+'.png'));
 await sharp(Buffer.from(svg),{density:144}).png().toFile(path.join(out,name+'-2x.png'));
}
async function main(){
 base('The model chooses actions inside a harness','Selected events from a real Agent Canvas run · Incident Operations Center · GLM-5.2');
 const rows=[
 ['HARNESS','Supplies system instructions and available tools','00000'],
 ['USER','Requests a durable incident-operations system','00001'],
 ['MODEL','Requests a terminal call: list repository files','00004'],
 ['HARNESS / TOOL','Executes the command and returns file names','00005'],
 ['MODEL','Requests a full test run','00121'],
 ['HARNESS / TOOL','Returns the test result: 41 passed in 11.14s','00122'],
 ['MODEL','Proposes completion through the finish tool','00286']];
 rows.forEach(([actor,body,event],i)=>{let y=305+i*87;let col=actor==='MODEL'?C.teal:actor==='USER'?C.muted:C.orange;text(112,y,actor,25,col,700);text(405,y,body,33);text(1700,y,event,24,C.muted);line(100,y+27,1820,y+27);});
 text(100,1007,'Editing and intermediate events omitted. Passing tests establish only the behavior those tests cover.',27,C.muted);
 await save('agent-canvas-trace');

 base('A harness change needs a repeatable comparison','Use Agent Canvas to locate the failure, then check the effect of one change.');
 const steps=[['Inspect the trace','Find the wasted work','or missing evidence.'],['Change one setting','Write down what you','expect it to change.'],['Rerun and verify','Repeat the same task','and check the result.'],['Check transfer','Try another task before','keeping the change.']];
 steps.forEach((s,i)=>{let x=100+i*450;text(x,350,String(i+1).padStart(2,'0'),48,C.teal,700);line(x,382,x+340,382,C.teal,4);text(x,445,s[0],34,C.ink,700);text(x,510,s[1],30);text(x,555,s[2],30);if(i<3)arrow(x+350,460,x+414,460);});
 text(100,745,'HOLD FIXED',25,C.teal,700);text(370,745,'Task, model, starting files, environment, verifier',33);
 text(100,830,'MEASURE',25,C.teal,700);text(370,830,'Verified outcome, total cost, time, retries, human intervention',33);
 text(100,1007,'Use repeated trials to distinguish the intended effect from a different model trajectory.',27,C.muted);
 await save('harness-improvement-method');

 base('Cache markers reduced fresh input in the Pi rerun','Same model and task: Sonnet 4.5 · Incident Operations Center · one trial per configuration');
 text(450,296,'Fresh input tokens',29,C.muted);
 const plotX=450, plotW=1180, max=3500000;
 const bars=[['Default',3351630,C.orange,'3,351,630'],['Cache enabled',213000,C.teal,'213,000']];
 bars.forEach(([name,n,color,label],i)=>{const y=370+i*185;text(100,y+64,name,33,C.ink,700);rect(plotX,y,plotW*n/max,100,color);text(plotX+plotW*n/max+22,y+64,label,34,color,700);});
 line(plotX,690,plotX+plotW,690,C.muted,2);
 for(let n=0;n<=3000000;n+=1000000){const x=plotX+plotW*n/max;line(x,690,x,704,C.muted);text(x-8,745,n===0?'0':`${n/1000000}M`,25,C.muted);}
 text(100,850,'THE CHANGE',25,C.teal,700);text(390,850,'cacheControlFormat: "anthropic"',35,C.ink,700);
 text(100,920,'Both runs: 89 model calls. External checks: 7/8 before, 6/8 after.',30);
 text(100,982,'The caching fix did not establish a correctness gain. Dollar cost was unavailable.',27,C.muted);
 await save('pi-cache-intervention');

 base('Average context per call varied across harnesses','GLM-5.2 · eight tasks per harness · Aug 24, 2026 · all three harnesses passed 8/8');
 const vals=[['Pi',6.7,C.teal],['OpenCode',12.3,C.orange],['OpenHands',26.8,C.muted]];
 vals.forEach(([name,n,color],i)=>{let y=325+i*180;text(100,y+65,name,36,C.ink,700);rect(430,y,1200*n/30,100,color);text(450+1200*n/30,y+65,n.toFixed(1)+'K',38,color,700);});
 line(430,850,1630,850,C.muted);[0,10,20,30].forEach(n=>text(420+1200*n/30,900,n+'K',26,C.muted));
 text(100,1007,'Input footprint is not dollar cost. Cache reads and output tokens need separate accounting.',28,C.muted);
 await save('context-per-call');
}
main().catch(e=>{console.error(e);process.exit(1);});
