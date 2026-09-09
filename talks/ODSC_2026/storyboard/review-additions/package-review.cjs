const fs=require('fs');
const path=require('path');
const sharp=require('/Users/rajiv.shah/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=__dirname;
const items=[
 ['teaching-visuals/agent-canvas-trace','Read a real Agent Canvas run','Opening, immediately after source 004. Selected recorded events show model decisions and harness execution.'],
 ['teaching-visuals/harness-improvement-method','Test one harness change','End of Workshop 1. Reuse this method and measurement vocabulary throughout the course.'],
 ['teaching-visuals/pi-cache-intervention','Pi cache-control experiment','End of Workshop 1. A measured before/after configuration change; the quality results are separate trajectories.'],
 ['context-visuals/context-lifetimes','Place information by lifetime','Source 042. An illustrative pagination task spans active context, working state, and reusable guidance.'],
 ['teaching-visuals/context-per-call','Compare the observed context footprint','Replaces the context-budget placeholder with measured totals. A component breakdown is still pending.'],
 ['context-visuals/compaction-continuation','Inspect a continuation record','Replaces the summarization placeholder with a worked example. Clearly marked illustrative.']
];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
async function main(){
 const elements=[];
 const review=['# Agent Canvas teaching pass\n\nThe working deck now has an annotated opening run, a repeatable harness-improvement method, a measured Pi intervention, three context chapters, and decision debriefs for all six workshops. New diagrams use 1920 × 1080 PNG previews with SVG and Excalidraw sources.\n\n[Updated deck](../deck.md) · [Current headline outline](../headline-spine.md) · [Combined editable visual canvas](teaching-visuals-combined.excalidraw)\n\nThe exercises use a recurring illustrative pagination problem. Prepared results retain their original tasks and provenance. The incident trace and Pi intervention are real recorded evidence; the compaction example is illustrative.'];
 const html=['<!doctype html><html><head><meta charset="utf-8"><title>ODSC teaching visuals</title><style>body{margin:0;background:#eee9de;font:18px Arial;color:#202523}main{max-width:1440px;margin:auto;padding:30px}h1{font-size:32px}section{margin:45px 0 70px}img{width:100%;height:auto;display:block}p{line-height:1.5}a{color:#147F7B}small{color:#666}</style></head><body><main><h1>ODSC: Agent Canvas teaching visuals</h1><p>Six new visuals for review. Each image has an editable SVG and Excalidraw source.</p>'];
 for(let i=0;i<items.length;i++){
  const [base,title,note]=items[i];
  const svg=fs.readFileSync(path.join(root,base+'.svg'));
  const ex=JSON.parse(fs.readFileSync(path.join(root,base+'.excalidraw')));
  const dx=(i%3)*2120,dy=Math.floor(i/3)*1280;
  for(let j=0;j<ex.elements.length;j++){
   const e=ex.elements[j], copy={...e,id:`v${i}-${e.id}`,x:e.x+dx,y:e.y+dy,groupIds:[`visual-${i}`],index:null};
   if(copy.boundElements)copy.boundElements=copy.boundElements.map(b=>({...b,id:`v${i}-${b.id}`}));
   if(copy.startBinding)copy.startBinding={...copy.startBinding,elementId:`v${i}-${copy.startBinding.elementId}`};
   if(copy.endBinding)copy.endBinding={...copy.endBinding,elementId:`v${i}-${copy.endBinding.elementId}`};
   if(copy.containerId)copy.containerId=`v${i}-${copy.containerId}`;
   elements.push(copy);
  }
  await sharp(svg,{density:144}).png().toFile(path.join(root,base+'-2x.png'));
  review.push(`## ${i+1}. ${title}\n\n${note}\n\n![${title}](${base}.png)\n\n[Editable SVG](${base}.svg) · [Excalidraw](${base}.excalidraw) · [3840 × 2160 PNG](${base}-2x.png)`);
  html.push(`<section><h2>${i+1}. ${esc(title)}</h2><p>${esc(note)}</p><img src="${base}.png" alt="${esc(title)}"><p><a href="${base}.svg">Editable SVG</a> · <a href="${base}.excalidraw">Excalidraw</a> · <a href="${base}-2x.png">High-resolution PNG</a></p></section>`);
 }
 fs.writeFileSync(path.join(root,'teaching-visuals-combined.excalidraw'),JSON.stringify({type:'excalidraw',version:2,source:'ODSC teaching pass',elements,appState:{viewBackgroundColor:'#FAF2DB'},files:{}},null,2));
 const thumbs=await Promise.all(items.map(async ([base],i)=>({input:await sharp(path.join(root,base+'.png')).resize(640,360).png().toBuffer(),left:(i%3)*680,top:Math.floor(i/3)*400})));
 await sharp({create:{width:2000,height:760,channels:3,background:'#eee9de'}}).composite(thumbs).png().toFile(path.join(root,'visuals-contact-sheet.png'));
 review.push('## Follow-up work\n\n- Replace the illustrative compaction record with a real Agent Canvas event when one is captured.\n- Add a measured breakdown of instructions, tools, retrieved evidence, and history across turns. Existing totals do not support inventing those segments.\n- Rehearse the pagination scenarios in Canvas and link the exact prepared runs for each activity. Existing result slides refer to their original experiments.\n- Capture the real trace in the current Canvas UI for a later screenshot-led layout.\n- Apply the same focused evidence treatment to selected benchmark screenshots in a subsequent visual pass. Original benchmark images remain available.\n\n## Source and review notes\n\n[Trace and intervention provenance](trace-evidence.md). The headline outline is synced with the working deck. Prior deck and headline versions are retained next to the working files. PPTX and Open Slides synchronization remains a separate export step.');
 fs.writeFileSync(path.join(root,'teaching-pass-review.md'),review.join('\n\n')+'\n');
 fs.writeFileSync(path.join(root,'visual-gallery.html'),html.join('\n')+'</main></body></html>');
}
main().catch(e=>{console.error(e);process.exit(1);});
