const PLAN=PLAN_INPUT;
const R={family:'Inter',style:'Regular'},B={family:'Inter',style:'Bold'};await figma.loadFontAsync(R);await figma.loadFontAsync(B);
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function text(p,x,y,w,s,size=18,bold=false,color='#263548'){const n=figma.createText();p.appendChild(n);n.fontName=bold?B:R;n.fontSize=size;n.lineHeight={unit:'PERCENT',value:150};n.resize(w,1);n.textAutoResize='HEIGHT';n.characters=s;n.x=x;n.y=y;n.fills=[{type:'SOLID',color:rgb(color)}];return n}
function rect(p,x,y,w,h,c='#ffffff',border='#dbe0e6'){const n=figma.createRectangle();p.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=[{type:'SOLID',color:rgb(c)}];n.strokes=[{type:'SOLID',color:rgb(border)}];return n}
function cue(p,x,y,num){const n=figma.createEllipse();p.appendChild(n);n.x=x-17;n.y=y-17;n.resize(34,34);n.fills=[{type:'SOLID',color:rgb('#ed263a')}];n.strokes=[{type:'SOLID',color:rgb('#ffffff')}];n.strokeWeight=3;n.name='요소 번호 '+num;const t=text(p,x-17,y-13,34,String(num).padStart(2,'0'),16,true,'#ffffff');t.textAlignHorizontal='CENTER';t.name=n.name}
function freeze(n){if('constraints'in n)n.constraints={horizontal:'MIN',vertical:'MIN'};if('children'in n)for(const c of n.children)freeze(c)}
const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
for(const s of PLAN.screens){
 const f=figma.getNodeById(ix[s.id].frame);freeze(f);
 if(s.preserve){
  const imported=figma.createNodeFromSvg(APPROVED_SVG);freeze(imported);
  for(const n of [...f.children])n.remove();
  for(const n of [...imported.children]){const x=n.x,y=n.y;f.appendChild(n);n.x=x;n.y=y}imported.remove();
  // Imported SVG children previously had SCALE constraints; changing the frame
  // height stretched them vertically. Keep original coordinates and sizes.
  for(const n of [...f.children])if(n.x>=1580&&n.y>=150)n.remove();
  s.displayNotes=APPROVED_NOTES.map((a,i)=>({key:String(i+1),number:i+1,label:a[0],body:a[1]}));
  s.displayNotes[10].body+=' 조건에 맞는 결과가 없으면 빈 목록을 표시합니다. 고유 안내 문구와 빈 결과의 페이지 처리 규칙은 추가 확인이 필요합니다.';
  // The original vector UI and its twelve corresponding callouts stay intact.
 }else{
  for(const n of [...f.children])if((n.x>=1580&&n.y>=220)||n.name.startsWith('요소 번호 '))n.remove();
  s.displayNotes=s.notes;
  const scale=1490/s.image.width;const used={};
  for(const n of s.notes){let x=48+n.anchor.x*scale,y=220+n.anchor.y*scale;const key=Math.round(x/30)+'/'+Math.round(y/30),idx=used[key]||0;used[key]=idx+1;x+=idx*38;cue(f,Math.max(65,Math.min(1520,x)),Math.max(238,y),n.number)}
 }
 const x=1980,w=872;let y=220;rect(f,x,y,w,46,'#202832','#202832');text(f,x+18,y+8,w-35,'No.     Description · 요소 / 동작 / 정책',20,true,'#ffffff');y+=46;
 for(const n of s.displayNotes){const start=y;const bg=rect(f,x,y,w,100),no=rect(f,x,y,62,100,'#f5f6f8');text(f,x+16,y+18,42,String(n.number).padStart(2,'0'),18,true);const h=text(f,x+80,y+16,w-110,n.label,21,true);const b=text(f,x+80,h.y+h.height+8,w-110,n.body);y=b.y+b.height+22;bg.resize(w,y-start);no.resize(62,y-start);bg.setPluginData('cmsRevisionNote',n.key);h.setPluginData('cmsRevisionNote',n.key);b.setPluginData('cmsRevisionNoteBody',n.key)}
 const bottom=Math.max(...f.children.filter(n=>n.x<1580).map(n=>n.y+n.height),1300);f.resize(2900,Math.max(bottom+60,y+60));
 const bg=f.children[0];if(bg.type==='RECTANGLE')bg.resize(f.width,f.height);
 const banner=f.children.find(n=>n.type==='RECTANGLE'&&Math.abs(n.x-40)<2&&Math.abs(n.y-32)<2);if(banner)banner.resize(2820,banner.height);
 f.setPluginData('cmsRevisionNotes',JSON.stringify(s.displayNotes));f.setPluginData('cmsRevisionCommentPass','primary-complete');
 const sec=figma.getNodeById(ix[s.id].section);sec.resizeWithoutConstraints(Math.max(sec.width,4400),Math.max(sec.height,f.y+f.height+120));
}
figma.root.setPluginData('cmsRevisionCommentPlan',JSON.stringify(PLAN));
figma.notify('CMS_COMMENT_PRIMARY_DONE '+JSON.stringify({screens:30,notes:PLAN.screens.reduce((a,s)=>a+s.displayNotes.length,0),duplicateNotesRemoved:PLAN.commentRevision.duplicateNotesRemoved}),{timeout:60000});
