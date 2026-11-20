// Filled with the confirmed delta and captures by prepare-deployment-figma.py.
const D=__DELTA__,A=__ASSETS__;
const POLICY=D.id,ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
if(figma.root.getPluginData('cmsDeploymentPolicyApplied'))throw Error('Already applied: inspect before repeating');
const keys=Object.keys(D.updates),base=keys.map(k=>figma.getNodeById(ix[k].frame));
const modals=['8:16887','9:19634'].map(id=>figma.getNodeById(id));
for(const n of [...base,...modals])if(!n)throw Error('Missing existing frame');
const fonts=new Map();for(const f of [...base,...modals])for(const t of f.findAll(n=>n.type==='TEXT'))if(t.fontName!==figma.mixed)fonts.set(JSON.stringify(t.fontName),t.fontName);
for(const font of fonts.values())await figma.loadFontAsync(font);
const font=base[0].children.find(n=>n.type==='TEXT'&&n.x>1900).fontName;
const rgb=h=>({r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255});
const sectionBefore=[...new Set(base.map(f=>f.parent))].map(s=>({id:s.id,x:s.x,y:s.y,w:s.width,h:s.height}));
const oldPageRoutes=figma.getNodeById('7:9756').children.filter(n=>n.getPluginData('cmsRevisionRoute')==='yes');
const backup=figma.createFrame();figma.getNodeById('0:1').appendChild(backup);backup.name='ROLLBACK · 2026.11.20 배포·평가지 상태 정책';backup.visible=false;backup.resize(1,1);backup.x=9500;backup.y=0;
const copies=[];for(const original of [...base,...modals,...oldPageRoutes]){const copy=original.clone();backup.appendChild(copy);copies.push({original:original.id,backup:copy.id,parent:original.parent.id,x:original.x,y:original.y,w:original.width,h:original.height});}
backup.setPluginData('cmsDeploymentPolicyRollback',JSON.stringify({copies,sectionBefore}));
function text(parent,value,x,y,w,size=20){const t=figma.createText();parent.appendChild(t);t.fontName=font;t.fontSize=size;t.characters=value;t.resize(w,10);t.textAutoResize='HEIGHT';t.x=x;t.y=y;t.fills=[{type:'SOLID',color:rgb('24384f')}];return t;}
function image(parent,key,x,y,width,name){const a=A[key],im=figma.createImage(figma.base64Decode(a.base64)),r=figma.createRectangle();parent.appendChild(r);r.x=x;r.y=y;r.resize(width,width*a.height/a.width);r.fills=[{type:'IMAGE',imageHash:im.hash,scaleMode:'FIT'}];r.name=name||('HTML 상태 · '+key);r.setPluginData('deploymentPolicyImage',key);return r;}
const changes=[];
for(const key of keys){
 const f=figma.getNodeById(ix[key].frame),notes=JSON.parse(f.getPluginData('cmsRevisionNotes'));
 const rows=notes.map(n=>{const title=f.children.find(t=>t.type==='TEXT'&&t.characters===n.label&&t.x>1900);if(!title)throw Error('No title '+key+'/'+n.key);const body=f.children.filter(t=>t.type==='TEXT'&&t.x===title.x&&t.y>title.y).sort((a,b)=>a.y-b.y)[0];const top=title.y-16;return{n,title,body,rects:f.children.filter(t=>t.type==='RECTANGLE'&&Math.abs(t.y-top)<1&&t.x>=1900),number:f.children.find(t=>t.type==='TEXT'&&t.x>1900&&t.x<title.x&&Math.abs(t.y-(top+18))<2)};});
 let y=rows[0].title.y-16;
 for(const r of rows){if(D.updates[key][r.n.key]){changes.push({screen:key,key:r.n.key,number:r.n.number,label:r.n.label,before:r.n.body,after:D.updates[key][r.n.key]});r.n.body=D.updates[key][r.n.key];}
  r.body.characters=r.n.body;r.body.resize(r.body.width,10);r.body.textAutoResize='HEIGHT';r.title.y=y+16;r.body.y=y+56;if(r.number)r.number.y=y+18;const h=Math.max(100,Math.ceil(r.body.height)+78);for(const rect of r.rects){rect.y=y;rect.resize(rect.width,h);}y+=h;
 }
 f.setPluginData('cmsRevisionNotes',JSON.stringify(rows.map(r=>r.n)));
 f.setPluginData('cmsDeploymentPolicy',POLICY);
 const h=Math.max(f.height,y+60);for(const child of f.children)if('constraints'in child)child.constraints={horizontal:'MIN',vertical:'MIN'};f.resize(f.width,h);const bg=f.children.find(n=>n.type==='RECTANGLE'&&n.x===0&&n.y===0);if(bg)bg.resize(f.width,h);
}
const itemFrame=base[0],paperFrame=figma.getNodeById(ix.REV_PAP_DETAIL.frame),editFrame=figma.getNodeById(ix.REV_PAP_EDIT.frame);
// The main item example is a non-use item; cover only its existing deployment button.
const cover=figma.createRectangle();itemFrame.appendChild(cover);cover.name='문항 배포 · 비사용 상태 비활성 배경';cover.x=48+862.5*1490/1800-2;cover.y=220+1182.65625*1490/1800-2;cover.resize(108,46);cover.fills=[{type:'SOLID',color:rgb('f5f5f5')}];
const disabled=image(itemFrame,'item-button-N',cover.x,cover.y,cover.width,'문항 배포 · 비사용 상태 비활성');disabled.resize(cover.width,cover.height);
for(const n of itemFrame.children.filter(n=>n.name==='요소 번호 12'))itemFrame.appendChild(n);
function stateBlock(parent,x,y,title,cards,width=1490){
 const box=figma.createFrame();parent.appendChild(box);box.name=title;box.x=x;box.y=y;box.fills=[{type:'SOLID',color:rgb('f7f9fc')}];box.clipsContent=false;box.setPluginData('deploymentPolicyStates',POLICY);text(box,title,20,18,width-40,24);text(box,'2026.11.20 확정 정책 · 검수한 로컬 HTML 예시 · 실제 CMS 적용 전',20,56,width-40,18);
 const col=(width-60)/2;let bottom=90;const rowHeight=Math.max(...cards.map(([key])=>40+col*A[key].height/A[key].width+35));
 for(let i=0;i<cards.length;i++){const [key,label]=cards[i],row=Math.floor(i/2),cx=20+(i%2)*(col+20),cy=100+row*rowHeight;text(box,label,cx,cy,col,20);const r=image(box,key,cx,cy+40,col);bottom=Math.max(bottom,r.y+r.height+25);}
 box.resize(width,bottom);return box;
}
stateBlock(itemFrame,48,3260,'문항 배포 버튼 · 상태별 동작', [['item-deploy-Y','사용(Y) · 배포 가능'],['item-deploy-N','사용 중지·미사용(N) · 배포 불가']]);
const states=stateBlock(paperFrame,48,1220,'평가지 상태 · 자동 처리와 관리자 수동 복귀', [['paper-auto-N','사용 0개 + 미사용 존재 → 자동 N'],['paper-remains-N','문항이 사용으로 복귀해도 평가지 N 유지'],['paper-manual-Y','관리자가 수동 복귀 → 사용(Y)'],['paper-auto-D','포함 문항 전부 폐기 → 자동 D']]);
const blocked=stateBlock(editFrame,48,1220,'미사용 평가지의 승인 복귀 검사', [['paper-resume-blocked','승인(사용) 문항 0개 → 저장 차단']]);
// Replace existing modal UI, existing control explanations and their callout positions.
const modalUpdates=[
 {f:modals[0],asset:'item-modal',ui:'9:22779',policy:'9:28014',variant:'9:28015',source:'9:28016',header:'9:28017',notes:[['9:28020','9:28021','사용(Y) 문항에서 배포 대상을 선택합니다. 선택이 없으면 배포는 비활성이고 재배포 대상이면 안내합니다.'],['9:28024','9:28025','배포하지 않고 창을 닫습니다. 로컬 배포 정보는 유지합니다.'],['9:28028','9:28029','선택한 모든 대상과 현재 문항 상태를 다시 검사한 뒤 배포 이력을 저장합니다. 실제 서비스 전송·승인은 별도입니다.']],cancel:'9:28032',cancelDot:'9:28034',deploy:'9:28037',deployDot:'9:28039',endpoints:[[167,728],[449,728]]},
 {f:modals[1],asset:'paper-modal',ui:'9:24609',policy:'9:29592',variant:'9:29593',source:'9:29594',header:'9:29595',notes:[['9:29598','9:29599','폐기 문항은 배포·선행 배포·Service 존재 검사에서 제외합니다. 포함 문항을 함께 배포하지 않습니다.'],['9:29602','9:29603','폐기를 제외한 문항이 모두 사용 상태이며 이 대상에 선행 배포되어야 선택할 수 있습니다. 예시는 1건 미배포로 차단합니다.'],['9:29606','9:29607','같은 검사를 대상별로 수행합니다. 예시는 사용 문항이 선행 배포됐고 폐기 문항은 제외돼 선택 가능합니다.'],['9:29610','9:29611','배포하지 않고 창을 닫습니다. 원본 문항과 평가지 편성을 변경하지 않습니다.'],['9:29614','9:29615','현재 평가지 상태·문항 상태·대상별 선행 배포를 다시 검사하고 폐기를 제외한 문항 ID와 버전을 로컬 기록합니다.']],cancel:'9:29618',cancelDot:'9:29620',deploy:'9:29623',deployDot:'9:29625',endpoints:[[165.5,832],[444.5,832]]}
];
function path(node,points){const x=Math.min(...points.map(p=>p[0])),y=Math.min(...points.map(p=>p[1]));node.vectorPaths=[{windingRule:'NONE',data:points.map((p,i)=>(i?'L ':'M ')+(p[0]-x)+' '+(p[1]-y)).join(' ')}];node.x=x;node.y=y;}
for(const m of modalUpdates){
 const a=A[m.asset],ui=figma.getNodeById(m.ui),oldW=ui.width;for(const n of [...ui.children])n.remove();ui.resize(oldW,oldW*a.height/a.width);image(ui,m.asset,0,0,oldW,'확정 정책 HTML · '+m.asset);
 const policy=figma.getNodeById(m.policy);policy.characters=m.asset==='item-modal'?D.updates.REV_ITM_02.REV_ITM_DEPLOY:D.updates.REV_PAP_DETAIL.PAP_D07;policy.resize(policy.width,10);policy.textAutoResize='HEIGHT';
 figma.getNodeById(m.variant).characters='확정 정책 · 대상별 배포 자격';figma.getNodeById(m.source).characters='검수한 로컬 HTML · 실제 CMS 적용 전';const head=figma.getNodeById(m.header);head.characters='기존 요소 설명 · 번호 유지';head.y=policy.y+policy.height+28;
 let y=head.y+head.height+22;
 for(const [titleId,bodyId,value] of m.notes){const title=figma.getNodeById(titleId),body=figma.getNodeById(bodyId);title.y=y;body.characters=value;body.resize(body.width,10);body.textAutoResize='HEIGHT';body.y=y+33;y=body.y+body.height+22;}
 for(const [number,control] of Object.entries(a.controls)){const n=+number,point={x:ui.x+control.x*oldW/a.width-8,y:ui.y+control.y*oldW/a.width-8};for(const badge of m.f.children.filter(node=>node.name==='요소 번호 '+n)){badge.x=point.x;badge.y=point.y+(badge.type==='TEXT'?4:0);m.f.appendChild(badge);}}
 for(const [i,k] of ['cancel','deploy'].entries()){const c=a.controls[String(m.notes.length-1+i)],sx=ui.x+(c.x+c.w/2)*oldW/a.width,sy=ui.y+(c.y+c.h)*oldW/a.width,[ex,ey]=m.endpoints[i],lane=ey-45+i*20;path(figma.getNodeById(m[k]),[[sx,sy],[sx,lane],[ex,lane],[ex,ey]]);const dot=figma.getNodeById(m[k+'Dot']);dot.x=sx-4;dot.y=sy-4;}
 m.f.resize(m.f.width,Math.max(m.f.height,y+65));m.f.setPluginData('cmsDeploymentPolicy',POLICY);
}
for(const f of [itemFrame,paperFrame,editFrame]){const h=Math.max(f.height,...f.children.filter(n=>n.visible).map(n=>n.y+n.height+45));f.resize(f.width,h);const bg=f.children.find(n=>n.type==='RECTANGLE'&&n.x===0&&n.y===0);if(bg)bg.resize(f.width,h);}
// Expand sections only as needed; retain section IDs and avoid page-level overlap.
const pages=[figma.getNodeById('0:1'),figma.getNodeById('7:9756')];
for(const page of pages){const sections=page.children.filter(n=>n.type==='SECTION').sort((a,b)=>a.y-b.y);for(const section of sections){if(sectionBefore.some(s=>s.id===section.id)){const bottom=Math.max(...section.children.filter(n=>n.visible&&n.type==='FRAME').map(n=>n.y+n.height+100));section.resizeWithoutConstraints(section.width,Math.max(section.height,bottom));}}
 for(let i=1;i<sections.length;i++)if(sections[i].y<sections[i-1].y+sections[i-1].height+120)sections[i].y=sections[i-1].y+sections[i-1].height+120;
}
const result={date:'2026-11-20',policy:POLICY,authorization:D.authorization,backup:backup.id,backupCopies:copies,sectionBefore,changes,newNumberedDescriptions:0,frames:keys.map(k=>({key:k,id:ix[k].frame,notes:JSON.parse(figma.getNodeById(ix[k].frame).getPluginData('cmsRevisionNotes')).map(n=>({key:n.key,number:n.number}))})),modalFrames:modals.map(n=>n.id),stateFrames:[states.id,blocked.id]};
figma.root.setPluginData('cmsDeploymentPolicyApplied',JSON.stringify(result));print('DEPLOYMENT_APPLIED '+JSON.stringify(result));figma.currentPage=paperFrame.parent.parent;figma.viewport.scrollAndZoomIntoView([paperFrame]);
