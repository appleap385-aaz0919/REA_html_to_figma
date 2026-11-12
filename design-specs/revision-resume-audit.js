const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
const report={date:'2026-11-12',screens:0,preciseModals:0,textOutside:[],textOverlaps:[],imageRatios:[],notes:0};
function plain(t){return {id:t.id,x:t.x,y:t.y,w:t.width,h:t.height,text:t.characters,name:t.name};}
for(const [key,r] of Object.entries(ix)){
 const section=figma.getNodeById(r.section),main=figma.getNodeById(r.frame);
 report.screens++;report.notes+=JSON.parse(main.getPluginData('cmsRevisionNotes')||'[]').length;
 const frames=section.findAll(n=>n.type==='FRAME');
 for(const f of frames){
  if(f.getPluginData('cmsRevisionPreciseControls')==='yes')report.preciseModals++;
  const ts=f.children.filter(n=>n.type==='TEXT').map(plain);
  for(const t of ts)if(t.x<-.5||t.y<-.5||t.x+t.w>f.width+2||t.y+t.h>f.height+2)report.textOutside.push({screen:key,frame:f.id,...t});
  const visible=ts.filter(t=>!/^\d{1,2}$/.test(t.text)&&!/요소 번호|팝업 요소/.test(t.name)&&(f.id!==main.id||t.x>=1980));
  for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){
   const a=visible[i],b=visible[j];
   if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>3&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>3)report.textOverlaps.push({screen:key,frame:f.id,a:a.id,b:b.id,at:a.text.slice(0,45),bt:b.text.slice(0,45)});
  }
 }
}
const audit=JSON.parse(figma.root.getPluginData('cmsRevisionAudit'));
report.previousAudit=audit;
figma.root.setPluginData('cmsRevisionFinalVerification',JSON.stringify(report));
figma.notify('CMS_VERIFY '+JSON.stringify({screens:report.screens,preciseModals:report.preciseModals,notes:report.notes,textOutside:report.textOutside.length,textOverlaps:report.textOverlaps.length,examples:report.textOverlaps.slice(0,3)}),{timeout:60000});
