const R={family:"Inter",style:"Regular"},B={family:"Inter",style:"Bold"};
await figma.loadFontAsync(R);await figma.loadFontAsync(B);
const color=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function t(p,x,y,w,s,size=20,bold=false,hex="#253348"){const n=figma.createText();p.appendChild(n);n.fontName=bold?B:R;n.fontSize=size;n.lineHeight={value:150,unit:"PERCENT"};n.resize(w,1);n.textAutoResize="HEIGHT";n.characters=s;n.x=x;n.y=y;n.fills=[{type:"SOLID",color:color(hex)}];return n;}
function r(p,x,y,w,h,hex){const n=figma.createRectangle();p.appendChild(n);n.resize(w,h);n.x=x;n.y=y;n.fills=[{type:"SOLID",color:color(hex)}];return n;}
const expected=EXPECTED;
const provenance=PROVENANCE;
const all=figma.root.children.flatMap(p=>p.children.filter(n=>n.type==="SECTION").flatMap(s=>s.children.filter(n=>n.getPluginData("cmsStoryboardState"))));
const actual=all.map(n=>n.getPluginData("cmsStoryboardState"));
if(actual.length!==expected.length||new Set(actual).size!==expected.length||expected.some(id=>!actual.includes(id)))throw Error("State audit mismatch "+actual.length+"/"+expected.length);
for(const f of all){
 const footer=f.children.find(n=>n.type==="TEXT"&&n.characters.startsWith(f.getPluginData("cmsStoryboardState")+"   ·"));
 const source=f.children.find(n=>n.type==="TEXT"&&n.characters.startsWith("근거  "));
 const proof=provenance[f.getPluginData('cmsStoryboardState')]||[];
 if(source){source.characters='근거  '+proof.slice(0,3).map(p=>p.split('/').pop()).join(' · ');f.setPluginData('cmsStoryboardEvidence',JSON.stringify(proof));}
 if(source&&source.y+source.height+90>f.height){f.resize(f.width,source.y+source.height+90);footer.y=f.height-47;}
 const flow=f.children.find(n=>n.type==="TEXT"&&n.characters==="상태 전환");
 if(flow){const bg=f.children.find(n=>n.type==="RECTANGLE"&&n.x===48&&n.y===flow.y-18);const body=f.children.find(n=>n.type==="TEXT"&&n.y===flow.y+40);if(bg&&body)bg.resize(1460,Math.max(150,body.height+80));}
 for(const n of f.children.filter(n=>n.type==="TEXT")){if(n.x<0||n.x+n.width>f.width+1||n.y+n.height>f.height+1)throw Error("Text outside frame "+f.name+" "+n.characters.slice(0,50));}
}
const pages=figma.root.children.filter(p=>p.name.includes("문항 관리"));
const audit={pages:[],sections:0,states:actual.length,screenshots:all.filter(f=>f.children.some(n=>n.type==="RECTANGLE"&&Array.isArray(n.fills)&&n.fills.some(x=>x.type==="IMAGE"))).length};
const sampleFrames=[];
let firstIndex=null;
for(const page of pages){
 const sections=page.children.filter(n=>n.type==="SECTION"&&n.getPluginData("cmsStoryboardScreen")).sort((a,b)=>Number(a.getPluginData("cmsStoryboardScreenOrder"))-Number(b.getPluginData("cmsStoryboardScreenOrder")));
 const other=page.children.filter(n=>n.type==="SECTION"&&!n.getPluginData("cmsStoryboardScreen"));
 let sy=other.length?Math.max(...other.map(n=>n.y+n.height))+320:0;
 for(const section of sections){
  const frames=section.children.filter(n=>n.getPluginData("cmsStoryboardState")).sort((a,b)=>Number(a.getPluginData("cmsStoryboardStateOrder"))-Number(b.getPluginData("cmsStoryboardStateOrder")));
  let ry=110;for(let i=0;i<frames.length;i+=3){const row=frames.slice(i,i+3);row.forEach((f,j)=>{f.x=j*2450+70;f.y=ry;});ry+=Math.max(...row.map(n=>n.height))+180;}
  section.resizeWithoutConstraints(7500,ry);section.x=0;section.y=sy;sy+=ry+320;
 }
 const old=page.children.find(n=>n.getPluginData("cmsStoryboardIndex")==="yes");if(old)old.remove();
 const index=figma.createFrame();page.appendChild(index);index.name="00 화면 목차 · "+page.name;index.setPluginData("cmsStoryboardIndex","yes");index.resize(2300,1800);index.x=-2600;index.y=0;
 r(index,0,0,2300,1800,"#ffffff");t(index,65,50,2170,page.name,44,true);
 const flow=page.name.startsWith("01")?"목록 → 상세 → 상태·관계 → 수정 탭 → 미리보기 → 임시저장·전체반영":page.name.startsWith("02")?"등록 목록 → 파일·메타정보 입력 → 전송·처리 → 단건·세트 검수 → 승인·폐기":page.name.startsWith("03")?"등록 목록 → ZIP·메타정보 입력 → 전송·파싱 → 검수 → 승인·생성 문항": "그룹 목록 → 그룹 상세 → 문항 상세의 현재 관계·추가 → COPY·AI 생성 → 생성 이력";
 t(index,65,135,2170,flow,24,false,"#0870cb");
 t(index,65,205,2170,"각 화면 섹션 안에서 상태 번호를 따라 읽습니다. 화면 제목을 클릭하면 해당 섹션으로 이동합니다.",22);
 let y=285;
 for(const [i,section] of sections.entries()){
  const stateFrames=section.children.filter(n=>n.getPluginData("cmsStoryboardState"));
  r(index,65,y,2170,80,i%2?"#f5f7fa":"#edf5ff");
  const link=t(index,90,y+18,1840,section.name,24,true,"#0870cb");link.hyperlink={type:"URL",value:"https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id="+section.id.replace(":","-")};
  t(index,1990,y+18,180,String(stateFrames.length)+"개 상태",22,true);
  y+=95;audit.sections++;
 }
 t(index,65,y+25,2170,"표기 기준",27,true);y+=78;
 for(const line of ["실제 실행 캡처를 우선 사용하며, 캡처가 없는 상태는 관측·소스에 따른 변화 설명도로 표현했습니다.","실제 검증·정적 선언·미확인 표기를 따라 확인 범위를 구분합니다. 시점별 예시 ID와 건수는 고정 정책이 아닙니다.","실제 해석 HML, 정상 디피니션 세트 ZIP, 다른 역할 및 서비스 수신·채점의 미검증 범위를 유지합니다."]){const n=t(index,65,y,2170,"• "+line,21);y+=n.height+18;}
 index.resize(2300,Math.max(1800,y+80));index.children[0].resize(2300,index.height);
 if(!firstIndex)firstIndex=index;
 const sample=sections.flatMap(s=>s.children).find(f=>f.getPluginData("cmsStoryboardState")&&f.children.some(n=>n.type==="RECTANGLE"&&Array.isArray(n.fills)&&n.fills.some(x=>x.type==="IMAGE"))));
 if(sample)sampleFrames.push(sample);
 audit.pages.push({name:page.name,id:page.id,index:index.id,sections:sections.length,states:sections.reduce((sum,s)=>sum+s.children.filter(n=>n.getPluginData("cmsStoryboardState")).length,0)});
}
figma.root.setPluginData("cmsStoryboardAudit",JSON.stringify(audit));
const contact=figma.createFrame();firstIndex.parent.appendChild(contact);contact.name="검토용 화면 모음 · 4개 메뉴";contact.setPluginData("cmsStoryboardContact","yes");contact.resize(2300,2050);contact.x=-2600;contact.y=firstIndex.y+firstIndex.height+220;
r(contact,0,0,2300,2050,"#ffffff");t(contact,50,40,2200,"문항 관리 · 상태별 화면 구성 검토",36,true);
for(let i=0;i<sampleFrames.length;i++){const bytes=await sampleFrames[i].exportAsync({format:"PNG",constraint:{type:"WIDTH",value:1050}});const image=figma.createImage(bytes),sz=await image.getSizeAsync();const pic=r(contact,50+(i%2)*1120,145+Math.floor(i/2)*930,1050,Math.min(830,1050*sz.height/sz.width),"#f8f9fb");pic.fills=[{type:"IMAGE",imageHash:image.hash,scaleMode:"FIT"}];t(contact,pic.x,pic.y+pic.height+15,1050,sampleFrames[i].name,18,true);}
await figma.setCurrentPageAsync(firstIndex.parent);
figma.currentPage.selection=[contact];figma.viewport.scrollAndZoomIntoView([contact]);
figma.notify("CMS 문항 관리 검증 완료 · "+audit.pages.length+"페이지 · "+audit.sections+"섹션 · "+audit.states+"상태",{timeout:60000});
print(audit);

