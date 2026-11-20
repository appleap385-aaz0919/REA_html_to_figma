const f=figma.getNodeById('8:16538'),section=f.parent;
const badges=f.children.filter(n=>n.name==='요소 번호 8'||n.name==='요소 번호 13');
const before=badges.map(n=>({id:n.id,name:n.name,x:n.x,y:n.y}));
for(const n of badges){const save=n.name==='요소 번호 8';n.x=save?1430:245;n.y=(save?1436:1490)+(n.type==='TEXT'?4:0);}
for(const n of badges)f.appendChild(n);
const POLICY='ITEM-STATUS-EDIT-20261119',modal=figma.getNodeById('8:16724');
for(const n of [...section.children])if(n.getPluginData('request1SaveFlow')===POLICY)n.remove();
const color={r:25/255,g:118/255,b:210/255},start={x:f.x+1464,y:f.y+1453},end={x:modal.x,y:modal.y+45};
const pts=[start,{x:f.x+1600,y:start.y},{x:f.x+1600,y:433},{x:end.x-65,y:433},{x:end.x-65,y:end.y},end];
const path=figma.createVector();section.appendChild(path);path.name='전환 · 본 화면 08 저장 → 기존 저장 확인';path.vectorPaths=[{windingRule:'NONE',data:pts.map((p,i)=>(i?'L':'M')+' '+p.x+' '+p.y).join(' ')}];path.strokes=[{type:'SOLID',color}];path.strokeWeight=2;path.fills=[];path.setPluginData('request1SaveFlow',POLICY);
const arrow=figma.createVector();section.appendChild(arrow);arrow.name='화살촉 · 저장 확인';arrow.vectorPaths=[{windingRule:'NONZERO',data:'M '+end.x+' '+end.y+' L '+(end.x-12)+' '+(end.y-6)+' L '+(end.x-12)+' '+(end.y+6)+' Z'}];arrow.fills=[{type:'SOLID',color}];arrow.setPluginData('request1SaveFlow',POLICY);
const result={date:'2026-11-19',frame:f.id,before,after:badges.map(n=>({id:n.id,name:n.name,x:n.x,y:n.y})),description08:JSON.parse(f.getPluginData('cmsRevisionNotes')).find(n=>n.number===8),duplicate08:f.children.filter(n=>n.name==='요소 번호 8'&&n.type==='ELLIPSE').length};
figma.root.setPluginData('cmsStatus08LabelCorrection',JSON.stringify(result));print('LABEL08_FIXED '+JSON.stringify(result));
const b=f.absoluteBoundingBox;figma.viewport.zoom=1;figma.viewport.center={x:b.x+1200,y:b.y+1485};
