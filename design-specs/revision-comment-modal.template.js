const INPUT=INPUT_DATA;
const R={family:'Inter',style:'Regular'},B={family:'Inter',style:'Bold'};await figma.loadFontAsync(R);await figma.loadFontAsync(B);
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function txt(p,x,y,w,s,size=18,bold=false,c='#263548'){const n=figma.createText();p.appendChild(n);n.fontName=bold?B:R;n.fontSize=size;n.lineHeight={unit:'PERCENT',value:150};n.resize(w,1);n.textAutoResize='HEIGHT';n.characters=s;n.x=x;n.y=y;n.fills=[{type:'SOLID',color:rgb(c)}];return n}
function rect(p,x,y,w,h,c='#ffffff',border='#dbe0e6'){const n=figma.createRectangle();p.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=[{type:'SOLID',color:rgb(c)}];n.strokes=[{type:'SOLID',color:rgb(border)}];return n}
function cue(p,x,y,num){const n=figma.createEllipse();p.appendChild(n);n.x=x-14;n.y=y-14;n.resize(28,28);n.fills=[{type:'SOLID',color:rgb('#ed263a')}];n.strokes=[{type:'SOLID',color:rgb('#ffffff')}];n.strokeWeight=2;const t=txt(p,x-14,y-11,28,String(num).padStart(2,'0'),13,true,'#ffffff');t.textAlignHorizontal='CENTER';n.name=t.name='팝업 요소 '+num}
function arrow(p,points,label,color='#da8b00',dash=false){const minX=Math.min(...points.map(v=>v[0])),minY=Math.min(...points.map(v=>v[1]));const n=figma.createVector();p.appendChild(n);n.x=minX;n.y=minY;n.vectorPaths=[{windingRule:'NONE',data:points.map((v,i)=>(i?'L ':'M ')+(v[0]-minX)+' '+(v[1]-minY)).join(' ')}];n.fills=[];n.strokes=[{type:'SOLID',color:rgb(color)}];n.strokeWeight=2;if(dash)n.dashPattern=[8,5];n.name='전환 · '+label;n.setPluginData('cmsRevisionRoute','yes');
 const a=points[points.length-2],b=points[points.length-1],angle=Math.atan2(b[1]-a[1],b[0]-a[0]);const h=figma.createVector();p.appendChild(h);h.vectorPaths=[{windingRule:'NONZERO',data:'M 0 0 L -12 -5 L -12 5 Z'}];h.x=b[0];h.y=b[1];h.rotation=-angle*180/Math.PI;h.fills=[{type:'SOLID',color:rgb(color)}];h.strokes=[];h.name='화살촉';h.setPluginData('cmsRevisionRoute','yes');const d=figma.createEllipse();p.appendChild(d);d.resize(8,8);d.x=points[0][0]-4;d.y=points[0][1]-4;d.fills=[{type:'SOLID',color:rgb('#ffffff')}];d.strokes=[{type:'SOLID',color:rgb(color)}];d.setPluginData('cmsRevisionRoute','yes');return n}
function decode(s){const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',out=[];let val=0,bits=0;for(const c of s){const v=chars.indexOf(c);if(v<0)continue;val=(val<<6)|v;bits+=6;if(bits>=8){bits-=8;out.push((val>>bits)&255)}}return new Uint8Array(out)}
const cache=JSON.parse(figma.root.getPluginData('cmsRevisionImages')||'{}');for(const[k,v]of Object.entries(INPUT.assets))if(!cache[k])cache[k]=figma.createImage(decode(v)).hash;
// Image hashes are split into several small pluginData entries to respect Figma's
// per-entry limit. Existing base screenshot cache remains unchanged.
const allEntries=Object.entries(cache);for(let i=0;i<allEntries.length;i+=150)figma.root.setPluginData('cmsRevisionImagesV4_'+Math.floor(i/150),JSON.stringify(Object.fromEntries(allEntries.slice(i,i+150))));
function picture(p,x,y,w,v){const b=v.crop,k=w/b.w;const f=figma.createFrame();p.appendChild(f);f.x=x;f.y=y;f.resize(w,b.h*k);f.clipsContent=true;f.fills=[{type:'SOLID',color:rgb('#ffffff')}];f.name=v.label+' · 실제 UI';const image=rect(f,-b.x*k,-b.y*k,v.image.width*k,v.image.height*k);image.fills=[{type:'IMAGE',imageHash:cache[v.image.key],scaleMode:'FIT'}];image.setPluginData('cmsRevisionImageAspect',JSON.stringify({source:v.image.width/v.image.height,rendered:image.width/image.height}));return f}
function groups(v,m){const cs=v.controls||[],out=[];const box=c=>c.bbox||c.boundingClientRect||c.box;const add=(label,body,b)=>{if(!b)return;out.push({label,body,x:Math.max(12,b.x-v.crop.x),y:Math.max(15,b.y-v.crop.y+10)})};
 const valid=cs.filter(c=>box(c)&&!/h[1-6]/i.test(c.tag||'')&&box(c).width!==0);
 const inputs=valid.filter(c=>/^(INPUT|SELECT|TEXTAREA)$/i.test(c.tag||''));if(inputs.length){const names=[...new Set(inputs.map(c=>c.label||c.name||c.id||'입력'))].slice(0,12);add('입력·선택 항목',names.join(' · ')+'. 활성·필수·검증 조건은 아래 동작·정책을 따릅니다.',box(inputs[0]))}
 const tables=valid.filter(c=>/^TABLE$/i.test(c.tag||''));if(tables.length)add('조회·연결 결과', '검색 결과와 연결 상태를 표로 표시합니다. 행의 입력·선택·액션은 현재 탭과 상태에 따라 달라집니다.',box(tables[0]));
 const seen=new Set();for(const c of valid.filter(c=>/^(BUTTON|A)$/i.test(c.tag||'')||c.role==='tab')){let label=(c.label||c.text||'').trim();if(!label||label.length>45||seen.has(label))continue;seen.add(label);let body=/취소|닫기|Close/.test(label)?'입력을 최종 제출하지 않고 창을 닫거나 현재 화면에 머뭅니다. 예외는 아래 동작·정책을 따릅니다.':/조회|검색/.test(label)?'현재 검색 조건으로 후보 목록을 조회합니다.':/초기화/.test(label)?'검색 조건을 초기화합니다.':/현재|추가.*탭/.test(label)?'선택한 탭에 해당하는 입력과 목록으로 전환합니다.':'선택한 항목과 현재 상태에 따라 아래 동작·정책의 처리를 수행합니다.';if(c.disabled)body+=' 이 예시 상태에서는 비활성화돼 있습니다.';add(label,body,box(c))}
 if(!out.length){
  const w=v.crop.w,h=v.crop.h;
  if(m.id==='REV_ITM_PRODUCT'){
   if(v.label==='현재 출처'){return[{label:'현재 출처 / 출처 추가',body:'현재 탭은 연결 목록과 건수를 표시하며 출처 추가 탭은 검색·연결 화면으로 전환합니다.',x:24,y:84},{label:'페이지',body:'연결된 출처의 페이지를 입력합니다. 수정 버튼으로 해당 연결의 값을 저장합니다.',x:690,y:190},{label:'문항 번호',body:'연결된 출처 내의 문항 번호를 입력합니다.',x:804,y:190},{label:'수정',body:'해당 행의 페이지·문항 번호를 수정합니다.',x:950,y:190},{label:'해제',body:'해당 연결을 해제합니다. 마지막 출처 연결의 해제는 차단됩니다.',x:1007,y:190},{label:'닫기',body:'현재 창을 닫습니다.',x:w-84,y:h-45}]}
   return[{label:'현재 출처 / 출처 추가',body:'선택한 탭의 조회·연결 화면으로 전환합니다.',x:24,y:90},{label:'출처 검색 조건',body:'출처코드·출처명과 교과 분류 등 현재 조건으로 조회하거나 초기화합니다.',x:40,y:160},{label:'결과·페이지·문항 번호·추가',body:'후보를 확인하고 연결에 필요한 값을 입력합니다. 행별 추가로 문항과 출처를 연결합니다.',x:40,y:Math.min(420,h-130)},{label:'닫기',body:'창을 닫습니다.',x:w-85,y:h-45}]
  }
  const isPicker=/SOURCE|UNIT|ACHIEVEMENT|DOMAIN|COMPETENCY|BEHAVIOR|CURRENT_ADD|PAP_ADD/.test(m.id);
  if(isPicker){out.push({label:/CURRENT_ADD/.test(m.id)?'현재 목록 / 검색·추가 탭':'검색 조건과 조회',body:/CURRENT_ADD/.test(m.id)?'탭에 따라 현재 연결 목록과 추가 후보 검색 화면을 구분합니다.':'현재 화면에 제공된 검색 기준·교과 분류·검색어로 조회하고 초기화합니다.',x:25,y:95});out.push({label:'결과와 행별 선택·액션',body:'표의 후보와 상태를 확인합니다. 선택·추가·수정·해제 가능 여부는 아래 정책을 따릅니다.',x:25,y:Math.min(h*.48,400)});}
  if(/MATH/.test(m.id)){out.push({label:'편집 탭',body:'비주얼 편집과 LaTeX 소스 탭에 따라 입력 UI가 바뀝니다.',x:25,y:68});out.push({label:'수식 입력·패턴·미리보기',body:'수식을 입력하고 지원하는 패턴 및 미리보기로 확인합니다.',x:25,y:Math.min(h*.38,210)});}
  if(/DRAFT/.test(m.id)){out.push({label:'임시저장 수정하기',body:'임시저장본을 편집 대상으로 선택합니다. 임시저장본이 존재할 때 이 선택창을 표시합니다.',x:w-286,y:h-48});out.push({label:'검수완료 수정하기',body:'검수완료본을 편집 대상으로 선택합니다.',x:w-144,y:h-48});out.push({label:'취소·닫기',body:'수정 버전을 선택하지 않고 창을 닫습니다.',x:w-373,y:h-48});}
  else if(/HTML_SYMBOL/.test(m.id)){out.push({label:'문자 버튼',body:'문자를 선택하면 즉시 삽입합니다. 별도의 적용·취소 버튼이 없는 팔레트입니다.',x:20,y:65});}
  else{const buttons=(m.buttons||[]).filter(b=>!b.startsWith('닫기'));for(let i=0;i<buttons.length;i++)out.push({label:buttons[i],body:/취소/.test(buttons[i])?'최종 처리를 제출하지 않고 원래 화면에 머뭅니다.':'아래 동작·정책에서 명시한 결과를 적용합니다.',x:Math.max(30,w-(buttons.length-i)*Math.min(150,(w-50)/Math.max(1,buttons.length))),y:h-42});}
 }
 return out.slice(0,12)
}
const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));const records=[];let popupCount=0,variantCount=0;
for(const s of INPUT.screens){const section=figma.getNodeById(ix[s.id].section),main=figma.getNodeById(ix[s.id].frame);
 for(const n of [...section.children])if(n.type!=='FRAME')n.remove();
 const band=160+Math.max(s.modals.length,s.flows.length)*35;main.x=60;main.y=band;
 let my=band;const popupRows=[];
 for(let mi=0;mi<s.modals.length;mi++){const m=s.modals[mi];let f=section.children.find(n=>n.type==='FRAME'&&n.getPluginData('cmsRevisionModal')===m.id);if(!f){f=figma.createFrame();section.appendChild(f)}for(const n of [...f.children])n.remove();f.fills=[{type:'SOLID',color:rgb('#ffffff')}];f.clipsContent=false;f.x=3700;f.y=my;f.setPluginData('cmsRevisionModal',m.id);f.setPluginData('cmsRevisionFidelity','actual-or-preserved-dom');f.name=m.title+' · '+(m.ui.kind.includes('popover')?'편집기 펼침 패널':'모달/팝업');
  txt(f,35,22,3000,m.title,30,true);txt(f,35,73,3000,'기본 화면의 '+String(m.noteNumber).padStart(2,'0')+'번 버튼에서 열립니다. 탭과 조건에 따른 UI를 각각 표시합니다.',17,false,'#6a798b');
  const vs=m.ui.variants,cols=Math.min(vs.length,2),cellW=Math.max(...vs.map(v=>Math.min(v.crop.w,1140)))+80,descX=35+cols*cellW+50;let rowY=135,maxBottom=135;const panels=[];
  for(let vi=0;vi<vs.length;vi+=cols){let rowH=0;for(let j=0;j<cols&&vi+j<vs.length;j++){const v=vs[vi+j],x=35+j*cellW,w=Math.min(v.crop.w,1140);txt(f,x,rowY,cellW-30,v.label,22,true,'#0870cb');const cap=txt(f,x,rowY+40,cellW-30,v.provenance==='preserved-dom-readonly'?'보존한 실제 DOM·스타일로 재현':v.provenance==='user-supplied-actual-ui'?'사용자 제공 실제 화면':'실제 CMS 화면 캡처',15,false,'#718092');const photoY=cap.y+cap.height+65;const image=picture(f,x,photoY,w,v);const k=w/v.crop.w;const gs=groups(v,m);for(let gi=0;gi<gs.length;gi++)cue(f,x+gs[gi].x*k,photoY+gs[gi].y*k,gi+1);panels.push({v,x,y:photoY,w,h:image.height,groups:gs,image});rowH=Math.max(rowH,image.y+image.height-rowY+380);variantCount++;}rowY+=rowH;maxBottom=rowY;}
  let dy=135;const policy=txt(f,descX,dy,690,'동작·정책·예외',24,true);dy+=policy.height+15;const body=txt(f,descX,dy,690,m.body);dy+=body.height+35;
  for(const p of panels){const h=txt(f,descX,dy,690,p.v.label+' · 요소 설명',21,true,'#0870cb');dy=h.y+h.height+15;for(let gi=0;gi<p.groups.length;gi++){const g=p.groups[gi];const hh=txt(f,descX,dy,690,String(gi+1).padStart(2,'0')+'  '+g.label,18,true);const b=txt(f,descX,hh.y+hh.height+5,690,g.body,17);dy=b.y+b.height+17;}dy+=25;}
  for(const p of panels){const acts=p.groups.filter(g=>/취소|닫기|Close|확인|저장|적용|추가|수정|해제|배포|승인|폐기|이동|생성 시작|생성시작|reload/.test(g.label)&&!/입력|탭|결과|미리보기|현재 목록/.test(g.label)).slice(-6);for(let ai=0;ai<acts.length;ai++){const g=acts[ai],cancel=/취소|닫기|Close/.test(g.label),cw=(p.w-18)/2,xx=p.x+(ai%2)*(cw+18),yy=p.y+p.h+90+Math.floor(ai/2)*85;let target=main.id,result=cancel?'원래 화면으로 복귀':'성공 시 결과 반영';
    if(/DRAFT/.test(m.id)&&/수정하기/.test(g.label)){target=ix.REV_ITM_03.frame;result=/임시저장/.test(g.label)?'임시본으로 문항 수정':'검수완료본으로 문항 수정'}
    else if(/하지 않고|않고 이동/.test(g.label)){let id=s.id.startsWith('REV_SRC')?(s.id==='REV_SRC_FORM'?'REV_SRC_LIST':'REV_SRC_DETAIL'):s.id==='REV_PAP_EDIT'?'REV_PAP_DETAIL':s.id==='REV_ITM_03'?'REV_ITM_02':s.id==='MST_HML_C02'?'MST_HML_C01':s.id==='MST_DIFI_C02'?'MST_DIFI_C01':s.id;target=ix[id].frame;result='미저장 변경을 버리고 이동'}
    else if(m.id==='REV_HML_SAVED'&&!cancel){target=ix.REV_ITM_04.frame;result='CMS에서 임시 저장 / 전체 반영'}
    else if(/PRODUCT|CURRENT_ADD/.test(m.id)&&!cancel){target=f.id;result='현재 연결 목록 갱신'}
    else if(/C03/.test(s.id)&&/승인|폐기/.test(g.label)){const id=s.id.replace('C03','C04');target=ix[id].frame;result='처리 성공 후 상태별 상세'}
    const card=rect(f,xx,yy,cw,64,cancel?'#edf5ff':'#fff8e7',cancel?'#b9d8fa':'#edcf85');const label=txt(f,xx+10,yy+8,cw-20,g.label+' → '+result,14,true,cancel?'#0870cb':'#9a6700');label.hyperlink={type:'URL',value:'https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id='+target.replace(':','-')};const k=p.w/p.v.crop.w,sx=p.x+g.x*k,sy=p.y+g.y*k,ex=p.x+p.w+8+ai*5,turn=yy-18-ai*5;arrow(f,[[sx,sy],[sx+5+ai*2,sy+8+ai*5],[ex,sy+8+ai*5],[ex,turn],[xx+cw/2,turn],[xx+cw/2,yy]],g.label+' 결과',cancel?'#0870cb':'#da8b00',cancel);}}
  const width=descX+730,height=Math.max(maxBottom,dy)+35;f.resize(width,height);
  // Tab transitions stay inside their modal area. Different content states are
  // not stretched into one invented generic form.
  for(let pi=1;pi<panels.length;pi++){const a=panels[pi-1],b=panels[pi];if(Math.abs(a.y-b.y)>5)continue;const y=a.y-20;arrow(f,[[a.x+a.w-5,y],[b.x+8,y]],'탭/조건 전환');txt(f,b.x-90,y-27,400,(/현재|추가|비주얼|LaTeX|손글씨|키보드/.test(b.v.label)?'탭·모드 선택 → ':'조건 변경 → ')+b.v.label,14,true,'#b57000');}
  const k=s.preserve?1:1490/s.image.width;const a=m.anchor;const p=s.preserve?[main.x+a.x,main.y+a.y]:[main.x+48+(a.x+a.w/2)*k,main.y+220+(a.y+a.h/2)*k];const top=band-45-mi*32,exitX=main.x+1560+mi*23,rightX=main.x+main.width+80+mi*30,targetY=f.y+45;
  const py=p[1]+18+mi*11;arrow(section,[p,[p[0]+10+mi*3,py],[exitX,py],[exitX,top],[rightX,top],[rightX,targetY],[f.x,targetY]],m.title+' 열기');const caption=txt(section,rightX+8,targetY-32,Math.max(180,f.x-rightX-20),'#'+String(m.noteNumber).padStart(2,'0')+' → '+m.title,16,true,'#b57000');caption.name='버튼에서 팝업으로';popupRows.push({frame:f,panels,m});my+=f.height+200;popupCount++;
 }
 const variant=section.children.find(n=>n.type==='FRAME'&&n.getPluginData('cmsRevisionVariant'));if(variant){variant.x=3700;variant.y=my;my+=variant.height+100;}
 section.resizeWithoutConstraints(Math.max(4500,...section.children.filter(n=>n.type==='FRAME').map(n=>n.x+n.width+80)),Math.max(main.y+main.height+130,my+50));records.push({s,section,main,popupRows});
}
// Replace prior repeated routes; each page now gives every transition its own
// lane. No shared long segments or stacked captions remain.
let screenTransitions=0;
for(const page of figma.root.children){
 if(!INPUT.screens.some(s=>s.page===page.name))continue;
 for(const n of [...page.children])if(n.type==='VECTOR'||n.type==='ELLIPSE'||n.getPluginData('cmsRevisionNavigation')==='yes'||n.getPluginData('cmsRevisionRoute')==='yes')n.remove();
 const rs=records.filter(r=>r.s.page===page.name);const index=page.children.find(n=>n.getPluginData('cmsRevisionIndex')==='yes');if(index)index.x=-6000;let yy=0;for(const r of rs){r.section.x=0;r.section.y=yy;yy+=r.section.height+600;}
 let lane=0;
 for(const r of rs){let local=0,jumpY=60;
  for(const flow of r.s.flows){const target=records.find(x=>x.s.id===flow.target),a=flow.anchor,k=r.s.preserve?1:1490/r.s.image.width;const origin=r.s.preserve?[r.main.x+a.x,r.main.y+a.y]:[r.main.x+48+(a.x+a.w/2)*k,r.main.y+220+(a.y+a.h/2)*k];const sx=r.section.x+origin[0],sy=r.section.y+origin[1],top=r.section.y+55+local*30;const gutter=-150-lane*65;
   const label=txt(page,gutter-520,top-12,485,flow.label+' → '+target.s.title,17,true,'#b57000');label.setPluginData('cmsRevisionNavigation','yes');
   if(target.s.page===r.s.page){target.incoming=(target.incoming||0)+1;const tx=target.section.x+target.main.x+15,ty=target.section.y+target.main.y+105+target.incoming*16,vx=sx+18+local*11;arrow(page,[[sx,sy],[vx,sy-12-local*7],[vx,top],[gutter,top],[gutter,ty],[tx,ty]],flow.label+' → '+target.s.title);}
   else{const cardX=gutter-520,cardY=top+50;const card=rect(page,cardX,cardY,485,100,'#edf5ff','#b9d8fa');card.setPluginData('cmsRevisionRoute','yes');const t=txt(page,cardX+18,cardY+15,450,target.s.title,22,true,'#0870cb');t.hyperlink={type:'URL',value:'https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id='+target.main.id.replace(':','-')};t.setPluginData('cmsRevisionRoute','yes');const vx=sx+18+local*11;arrow(page,[[sx,sy],[vx,sy-12-local*7],[vx,top],[gutter,top],[gutter,cardY+50],[cardX+485,cardY+50]],flow.label+' → '+target.s.title);}
   lane++;local++;screenTransitions++;
  }
 }
}
let outside=0,aspectErrors=0;
for(const r of records){for(const f of r.section.children.filter(n=>n.type==='FRAME')){for(const n of f.children.filter(n=>n.type==='TEXT'))if(n.x<0||n.y<0||n.x+n.width>f.width+2||n.y+n.height>f.height+2)outside++;for(const n of f.findAll(n=>n.getPluginData('cmsRevisionImageAspect'))){const a=JSON.parse(n.getPluginData('cmsRevisionImageAspect'));if(Math.abs(a.source-a.rendered)>.001)aspectErrors++;}}}
const audit=JSON.parse(figma.root.getPluginData('cmsRevisionAudit')||'{}');Object.assign(audit,{version:'0.4',commentsRead:7,baseScreens:30,popupComponents:popupCount,popupUiVariants:variantCount,duplicateNotesRemoved:INPUT.comments.duplicateNotesRemoved,explicitScreenTransitions:screenTransitions,outsideFrameText:outside,imageAspectErrors:aspectErrors,copyPolished:true,modalUiSource:'actual captures and preserved original DOM/CSS',genericInputMockups:0});figma.root.setPluginData('cmsRevisionAudit',JSON.stringify(audit));
const focus=records.find(r=>r.s.id==='REV_ITM_02');await figma.setCurrentPageAsync(focus.section.parent);figma.currentPage.selection=[focus.popupRows.find(x=>x.m.id==='REV_ITM_PRODUCT').frame];figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
figma.notify('CMS_COMMENT_MODAL_DONE '+JSON.stringify(audit),{timeout:60000});
