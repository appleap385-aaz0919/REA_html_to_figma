const expected=PLAN;
if(expected.oldStatesMapped!==373)throw Error("Coverage mapping incomplete");
const records=expected.screens.map(s=>({s,n:nodeIndex[s.id]}));
if(records.some(r=>!r.n))throw Error("Missing compact screens");
const screens=records.map(r=>({s:r.s,section:figma.getNodeById(r.n.section),main:figma.getNodeById(r.n.frame)}));
if(screens.some(r=>!r.section||r.section.getPluginData("cmsRevisionDone")!=="yes"))throw Error("Incomplete compact build");
const migrations=[];
for(const page of figma.root.children){
 for(const n of [...page.children]){
  if(n.getPluginData("cmsStoryboardScreen")||n.getPluginData("cmsStoryboardIndex")==="yes"||n.getPluginData("cmsStoryboardContact")==="yes"||n.getPluginData("cmsMasterIndex")==="yes"){
   if(n.getPluginData("cmsRevisionScreen"))continue;
   migrations.push({id:n.id,name:n.name});n.remove();
  }
 }
}
figma.root.setPluginData("cmsRevisionRemoved",JSON.stringify(migrations));
const pageNames=expected.pages;
const indexes=[];let arrowCount=0;
for(const pageName of pageNames){
 const page=figma.root.children.find(p=>p.name===pageName);const rs=screens.filter(r=>r.s.page===pageName);
 let y=0;
 for(const r of rs){r.section.x=0;r.section.y=y;r.main.x=60;r.main.y=90;y+=r.section.height+400;}
 const old=page.children.find(n=>n.getPluginData("cmsRevisionIndex")==="yes");if(old)old.remove();
 const index=figma.createFrame();page.appendChild(index);index.x=-2900;index.y=0;index.resize(2300,1500);index.name="00 화면 목차 · "+pageName;index.setPluginData("cmsRevisionIndex","yes");
 txt(index,65,55,2170,pageName,42,true);txt(index,65,145,2170,"기본 화면 → 요소별 Description → 연결 모달·화면",26,true,"#0870cb");
 let iy=250;
 for(const r of rs){
  rect(index,65,iy,2170,90,"#edf5ff");const t=txt(index,95,iy+20,2100,r.section.name,25,true,"#0870cb");t.hyperlink={type:"URL",value:"https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id="+r.section.id.replace(":","-")};iy+=110;
 }
 const read=txt(index,65,iy+35,2170,"빨간 번호는 해당 요소의 Description에 대응합니다. 주황 실선은 열기·확인·이동, 파란 점선은 닫기·취소·복귀를 나타냅니다. 다른 메뉴로 이동하는 화살표 끝의 카드를 클릭하면 실제 화면으로 이동합니다.",23);iy=read.y+read.height+35;
 const memo=txt(index,65,iy,2170,"캡처는 화면 끝까지 포함하며, 모달·유형 변형은 필요한 부분만 별도로 보여줍니다. 단순 조회 결과·조건·검증 결과는 기본 화면의 설명에 통합했습니다. 실제 해석 HML·정상 디피니션 세트 ZIP·다른 역할·서비스 수신과 채점의 미검증 범위는 유지합니다.",21);iy=memo.y+memo.height+60;
 index.resize(2300,Math.max(1500,iy));indexes.push({page:pageName,id:index.id,sectionCount:rs.length});
}
// Actual trigger coordinates connect to canonical screens; do not duplicate whole states.
for(const r of screens){
 const section=r.section,main=r.main,s=r.s;let jump=0,local=0;
 for(const f of s.flows){
  const target=screens.find(x=>x.s.id===f.target);if(!target)throw Error("Flow target missing "+f.target);
  const k=s.preserve?1:1490/s.image.width;
  const origin=s.preserve?[main.x+f.anchor.x,main.y+f.anchor.y]:[main.x+48+(f.anchor.x+f.anchor.w/2)*k,main.y+220+(f.anchor.y+f.anchor.h/2)*k];
  if(target.s.page!==s.page){
   const x=3650,y=110+jump*180;const card=rect(section,x,y,570,140,"#edf5ff","#b9d8fa");const label=txt(section,x+20,y+16,530,target.s.title,22,true,"#0870cb");label.hyperlink={type:"URL",value:"https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id="+target.main.id.replace(":","-")};txt(section,x+20,y+65,530,f.action+" · 다른 메뉴의 실제 화면으로 이동",16);
   const lane=3570-jump*15;arrow(section,[origin,[2470,origin[1]],[2470,55],[lane,55],[lane,y+70],[x,y+70]],f.label+" → "+target.s.title);jump++;
  }else{
   const page=section.parent;const sx=section.x+origin[0],sy=section.y+origin[1],tx=target.section.x+target.main.x+25,ty=target.section.y+target.main.y+145;
   const gutter=-80-local*24;const v=arrow(page,[[sx,sy],[gutter,sy],[gutter,ty],[tx,ty]],f.label+" → "+target.s.title);v.setPluginData("cmsRevisionNavigation","yes");
   const lab=txt(page,Math.max(0,sx-500),sy-42,650,f.label+" → "+target.s.title,17,true,"#b57000");lab.setPluginData("cmsRevisionNavigation","yes");local++;
  }
  arrowCount++;
 }
 if(jump)section.resizeWithoutConstraints(Math.max(section.width,4270),Math.max(section.height,150+jump*180));
}
let textOutside=0;
for(const r of screens){
 for(const f of r.section.children.filter(n=>n.type==="FRAME")){
  for(const n of f.children.filter(n=>n.type==="TEXT")){if(n.x<0||n.y<0||n.x+n.width>f.width+2||n.y+n.height>f.height+2)textOutside++;}
 }
}
if(textOutside)throw Error("Text outside design frames "+textOutside);
const home=figma.root.children.find(p=>p.name.startsWith("00"));
const master=figma.createFrame();home.appendChild(master);master.x=-5600;master.y=0;master.resize(2300,1650);master.name="Master CMS · 전체 메뉴 목차 v0.3";master.setPluginData("cmsRevisionMaster","yes");
txt(master,65,55,2170,"Master CMS 화면설계서",48,true);txt(master,65,155,2170,"요소별 설명과 화면 전환을 중심으로 재구성했습니다.",27,false,"#0870cb");
let y=265;
for(const i of indexes){rect(master,65,y,2170,100,"#edf5ff");const t=txt(master,95,y+22,1800,i.page,29,true,"#0870cb");t.hyperlink={type:"URL",value:"https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id="+i.id.replace(":","-")};txt(master,1930,y+25,260,i.sectionCount+"개 기본 화면",21,true);y+=120;}
txt(master,65,y+25,2170,"화면은 하단까지 · 번호는 요소별로 · 모달은 옆에 · 전환은 버튼에서 화살표로",24,true);
txt(master,65,y+100,2170,"상태별로 반복하던 전체 화면은 통합했습니다. 기존 373개 상태의 정책·예외를 새 Description 또는 관련 모달에 연결했습니다. 실제 확인·보존 DOM 재현·미검증 범위를 각 화면에 기재했습니다.",22);
const review=figma.createFrame();home.appendChild(review);review.x=-5600;review.y=1900;review.resize(3800,2500);review.name="검토 · 요소 번호와 모달 연결";review.setPluginData("cmsRevisionReview","yes");
txt(review,45,30,3700,"문항 수정 · 화면 끝 · 요소 번호 · 버튼과 모달의 연결",35,true);
const samples=screens.filter(r=>["REV_ITM_03","REV_ITM_05","REV_ITM_06"].includes(r.s.id));
let rx=45;
for(const r of samples){const bytes=await r.section.exportAsync({format:"PNG",constraint:{type:"WIDTH",value:1150}});const img=figma.createImage(bytes);const size=await img.getSizeAsync();const n=rect(review,rx,120,1150,Math.min(2280,1150*size.height/size.width));n.fills=[{type:"IMAGE",imageHash:img.hash,scaleMode:"FIT"}];rx+=1250;}
const audit={version:"0.3",pages:indexes,baseScreens:screens.length,dialogs:screens.reduce((sum,r)=>sum+nodeIndex[r.s.id].modals,0),sourceStatesMapped:expected.oldStatesMapped,sourceStatesTotal:expected.oldStateCount,explicitScreenTransitions:arrowCount,outsideFrameText:textOutside,removedLegacySections:migrations.filter(n=>n.name.includes("STATES")||n.name.includes("MST_")||n.name.startsWith("HML-")||n.name.startsWith("DIFI-")).length,master:master.id,review:review.id};
figma.root.setPluginData("cmsRevisionAudit",JSON.stringify(audit));
await figma.setCurrentPageAsync(home);figma.currentPage.selection=[review];figma.viewport.scrollAndZoomIntoView([review]);
figma.notify("CMS 스토리보드 배치 990 완료",{timeout:60000});
print(audit);
