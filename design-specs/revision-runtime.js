const R={family:"Inter",style:"Regular"},B={family:"Inter",style:"Bold"};
await figma.loadFontAsync(R);await figma.loadFontAsync(B);
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function rect(p,x,y,w,h,c="#ffffff",border="#dbe0e6"){const n=figma.createRectangle();p.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=[{type:"SOLID",color:rgb(c)}];n.strokes=[{type:"SOLID",color:rgb(border)}];return n;}
function txt(p,x,y,w,s,size=18,bold=false,c="#263548"){const n=figma.createText();p.appendChild(n);n.fontName=bold?B:R;n.fontSize=size;n.lineHeight={unit:"PERCENT",value:150};n.resize(w,1);n.textAutoResize="HEIGHT";n.characters=String(s).replace(/\bREV_/g,"MST_");n.x=x;n.y=y;n.fills=[{type:"SOLID",color:rgb(c)}];return n;}
function cue(p,x,y,num){const d=34;const e=figma.createEllipse();p.appendChild(e);e.x=x-d/2;e.y=y-d/2;e.resize(d,d);e.fills=[{type:"SOLID",color:rgb("#ed263a")}];e.strokes=[{type:"SOLID",color:rgb("#ffffff")}];e.strokeWeight=3;const t=txt(p,x-d/2,y-13,d,String(num).padStart(2,"0"),16,true,"#ffffff");t.textAlignHorizontal="CENTER";e.name="요소 번호 "+num;t.name="요소 번호 "+num;}
function arrow(p,points,label,color="#ec9500",dashed=false){
 const minX=Math.min(...points.map(v=>v[0])),minY=Math.min(...points.map(v=>v[1]));
 const n=figma.createVector();p.appendChild(n);n.x=minX;n.y=minY;n.vectorPaths=[{windingRule:"NONE",data:points.map((v,i)=>(i?"L ":"M ")+(v[0]-minX)+" "+(v[1]-minY)).join(" ")}];n.fills=[];n.strokes=[{type:"SOLID",color:rgb(color)}];n.strokeWeight=2.5;if(dashed)n.dashPattern=[8,5];n.name="전환 화살표 · "+label;
 const a=points[points.length-2],b=points[points.length-1],angle=Math.atan2(b[1]-a[1],b[0]-a[0]);
 const head=figma.createVector();p.appendChild(head);head.vectorPaths=[{windingRule:"NONZERO",data:"M 0 0 L -13 -6 L -13 6 Z"}];head.x=b[0];head.y=b[1];head.rotation=-angle*180/Math.PI;head.fills=[{type:"SOLID",color:rgb(color)}];head.strokes=[];head.name="화살촉";
 const start=points[0];const dot=figma.createEllipse();p.appendChild(dot);dot.resize(10,10);dot.x=start[0]-5;dot.y=start[1]-5;dot.fills=[{type:"SOLID",color:rgb("#ffffff")}];dot.strokes=[{type:"SOLID",color:rgb(color)}];dot.strokeWeight=2;
 return n;
}
function decode(s){const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",out=[];let val=0,bits=0;for(const c of s){const v=chars.indexOf(c);if(v<0)continue;val=(val<<6)|v;bits+=6;if(bits>=8){bits-=8;out.push((val>>bits)&255);}}return new Uint8Array(out);}
const cache=JSON.parse(figma.root.getPluginData("cmsRevisionImages")||"{}");
const nodeIndex=JSON.parse(figma.root.getPluginData("cmsRevisionNodes")||"{}");
for(const s of INPUT){for(const [key,data]of Object.entries(s.assets)){if(!cache[key])cache[key]=figma.createImage(decode(data)).hash;}}
figma.root.setPluginData("cmsRevisionImages",JSON.stringify(cache));
function picture(p,x,y,w,image){const n=rect(p,x,y,w,w*image.height/image.width);n.fills=[{type:"IMAGE",imageHash:cache[image.key],scaleMode:"FIT"}];n.name="전체 화면 · 하단까지 포함";return n;}
function crop(p,x,y,w,image,bounds){
 const scale=w/bounds.w;const f=figma.createFrame();p.appendChild(f);f.name="실제 부분 화면";f.x=x;f.y=y;f.resize(w,bounds.h*scale);f.clipsContent=true;f.fills=[{type:"SOLID",color:rgb("#ffffff")}];
 picture(f,-bounds.x*scale,-bounds.y*scale,image.width*scale,image);return f;
}
let built=0;
for(const s of INPUT){
 let page=figma.root.children.find(p=>p.name===s.page);if(!page){page=figma.createPage();page.name=s.page;}
 let section=page.children.find(n=>n.type==="SECTION"&&n.getPluginData("cmsRevisionScreen")===s.id);
 if(section&&section.getPluginData("cmsRevisionDone")==="yes")continue;
 if(section&&!s.preserve)section.remove();
 if(s.preserve){
  section=page.children.find(n=>n.type==="SECTION"&&n.name==="MST_ITM_01 전체 문항 목록");
  if(!section)throw Error("Approved item list section not found");
 }else{section=figma.createSection();page.appendChild(section);section.name=s.title;section.x=6000;section.y=s.order*9000;section.resizeWithoutConstraints(3600,1800);}
 section.setPluginData("cmsRevisionScreen",s.id);section.setPluginData("cmsRevisionOrder",String(s.order));
 section.name=(s.id==="REV_ITM_01"?"MST_ITM_01":s.id.replace("REV_","MST_").replace("_C","_"))+" "+s.title;
 let main;
 if(s.preserve){
  main=section.children.find(n=>n.type==="FRAME");if(!main)throw Error("Approved frame missing");
  main.setPluginData("cmsRevisionMain",s.id);main.name="MST_ITM_01 전체 문항 목록";
  for(const n of main.findAll(n=>n.type==="TEXT"&&n.characters.includes("후속 화면설계서"))){n.fontName=R;n.characters="상세·수정·세트·쌍둥이 팝업은 연결 화살표와 관련 화면에서 확인합니다.";}
  const right=main.findAll(n=>n.type==="TEXT"&&n.absoluteTransform[0][2]-main.absoluteTransform[0][2]>1550);
  let y=Math.max(main.height-30,...right.map(n=>n.absoluteTransform[1][2]-main.absoluteTransform[1][2]+n.height))+60;
  txt(main,1580,y,672,"조회 결과·예외 정책 통합",24,true);y+=55;
  for(const n of s.notes){const h=txt(main,1580,y,672,n.label,20,true);y+=h.height+8;const b=txt(main,1580,y,672,n.body,18);y+=b.height+22;}
  main.resize(2300,Math.max(main.height,y+60));main.clipsContent=false;
 }else{
  main=figma.createFrame();section.appendChild(main);main.x=60;main.y=90;main.resize(2300,1600);main.clipsContent=false;main.name=s.title;main.setPluginData("cmsRevisionMain",s.id);
  rect(main,0,0,2300,1600);rect(main,40,32,2220,70,"#f2f3f5","#f2f3f5");
  txt(main,60,45,410,"화면 ID  "+s.id.replace("REV_","MST_"),17,true);txt(main,495,45,1180,s.title,20,true);txt(main,1840,45,350,"2026.11.11 / v0.3",17);
  txt(main,48,125,1470,s.title,30,true);txt(main,48,177,1490,s.captureLabel+" · 요소 번호와 Description을 함께 확인합니다.",16,false,"#6a798b");
  const pic=picture(main,48,220,1490,s.image);const scale=1490/s.image.width;
  let y=220;rect(main,1580,y,672,46,"#202832","#202832");txt(main,1598,y+8,630,"No.     Description · 요소 / 동작 / 정책",20,true,"#ffffff");y+=46;
  const cueCounts={};
  for(const [i,n]of s.notes.entries()){
   const start=y;const bg=rect(main,1580,y,672,100),no=rect(main,1580,y,62,100,"#f5f6f8");txt(main,1598,y+18,40,String(i+1).padStart(2,"0"),18,true);
   const head=txt(main,1660,y+16,565,n.label,21,true);const body=txt(main,1660,head.y+head.height+8,565,n.body,18);y=body.y+body.height+22;bg.resize(672,y-start);no.resize(62,y-start);
   let px=48+n.anchor.x*scale,py=220+n.anchor.y*scale;const key=Math.round(px/25)+"/"+Math.round(py/25),count=cueCounts[key]||0;cueCounts[key]=count+1;
   px=Math.max(65,Math.min(1520,px+count*38));py=Math.max(238,Math.min(220+pic.height-15,py));cue(main,px,py,i+1);
  }
  const imageBottom=pic.y+pic.height;const foot=txt(main,48,imageBottom+25,1490,"화면 전체 범위: 상단 정보부터 마지막 입력 영역·하단 버튼까지 포함합니다. 예시 데이터와 확인 시점은 정책 고정값이 아닙니다.",16,false,"#6a798b");
  const height=Math.max(1300,y+60,foot.y+foot.height+80);main.resize(2300,height);main.children[0].resize(2300,height);
 }
 main.setPluginData("cmsRevisionCapture",s.image?s.image.path:"approved-native-vector");main.setPluginData("cmsRevisionSources",JSON.stringify([...new Set([...s.notes,...s.modals].flatMap(n=>n.sourceStates||[]))]));
 main.setPluginData("cmsRevisionFlows",JSON.stringify(s.flows));
 const scale=s.preserve?1:1490/s.image.width;const origin=a=>s.preserve?[main.x+a.x,main.y+a.y]:[main.x+48+(a.x+a.w/2)*scale,main.y+220+(a.y+a.h/2)*scale];
 let my=110,modalCount=0;
 for(const m of s.modals){
  const frame=figma.createFrame();section.appendChild(frame);frame.name=m.title+" · 연결 모달";frame.setPluginData("cmsRevisionModal",m.id);frame.x=2600;frame.y=my;frame.resize(940,650);frame.fills=[{type:"SOLID",color:rgb("#ffffff")}];frame.clipsContent=false;
  txt(frame,20,15,900,m.title,26,true);txt(frame,20,65,900,m.actual?"실제 모달 캡처":"실제 제목·필드·버튼에 따른 재현",16,false,"#718092");
  let contentBottom;
  const buttonPositions=[];
  if(m.actual){
   const maxWidth=Math.min(880,m.actual.crop.w);const img=crop(frame,20,105,maxWidth,m.actual.image,m.actual.crop);contentBottom=105+img.height;
   const k=maxWidth/m.actual.crop.w;
   for(const c of m.actual.controls.filter(c=>c.tag==="BUTTON"&&c.box.x>=m.actual.crop.x&&c.box.y>=m.actual.crop.y&&c.box.x+c.box.w<=m.actual.crop.x+m.actual.crop.w+2&&c.box.y+c.box.h<=m.actual.crop.y+m.actual.crop.h+2))buttonPositions.push({label:c.text,x:20+(c.box.x+c.box.w/2-m.actual.crop.x)*k,y:105+(c.box.y+c.box.h/2-m.actual.crop.y)*k});
   cue(frame,24,115,1);txt(frame,20,contentBottom+18,900,"01  모달의 입력·결과 영역과 마지막 버튼까지 표시합니다.",17);
   contentBottom+=70;
  }else{
   const panel=rect(frame,20,105,900,400,"#eef1f5");const card=rect(frame,50,140,840,330);card.cornerRadius=6;
   rect(frame,50,140,840,58,"#f5f8fd");txt(frame,72,154,740,m.title,21,true);txt(frame,850,154,35,"×",22);
   let fy=225;
   if(m.message){const msg=txt(frame,80,fy,780,m.message,20);fy+=msg.height+28;}
   for(const [i,field]of m.fields.entries()){
    const label=typeof field==="string"?field:JSON.stringify(field);cue(frame,72,fy+14,i+1);const title=txt(frame,100,fy,750,label,18,true);fy+=title.height+8;rect(frame,100,fy,740,40);fy+=65;
   }
   const palette=m.id.includes("SYMBOL");
   let buttons=m.buttons.filter(b=>!b.startsWith("닫기"));
   if(palette){
    for(const [i,b]of buttons.entries()){const xx=85+(i%10)*75,yy=fy+Math.floor(i/10)*54;rect(frame,xx,yy,62,42);txt(frame,xx+12,yy+7,45,b,19);}
    fy+=Math.ceil(buttons.length/10)*54+25;
   }else{
    fy=Math.max(fy,310);rect(frame,50,fy,840,1,"#e4e8ed");fy+=20;
    const bw=Math.min(180,Math.max(80,...buttons.map(b=>b.length*14+25)));let bx=850-buttons.length*(bw+12);
    for(const [i,b]of buttons.entries()){const last=i===buttons.length-1;rect(frame,bx,fy,bw,42,last?"#0870cb":"#ffffff",last?"#0870cb":"#dbe0e6");txt(frame,bx+12,fy+7,bw-20,b,17,last,last?"#ffffff":"#263548");buttonPositions.push({label:b,x:bx+bw/2,y:fy+21});bx+=bw+12;}fy+=65;
   }
   card.resize(840,fy-140+12);panel.resize(900,fy-105+45);contentBottom=105+panel.height;
  }
  let dy=contentBottom+35;const body=txt(frame,20,dy,900,m.body,18);dy+=body.height+20;
  txt(frame,20,dy,900,"취소·닫기 → 변경 없이 원래 화면   /   확인·적용 → 설명에 명시한 결과",17,true,"#0870cb");dy+=65;
  frame.resize(940,dy+25);
  const p=origin(m.anchor),target=[frame.x,frame.y+160],bend=2440+(modalCount%4)*25;
  arrow(section,[p,[bend,p[1]],[bend,target[1]],target],m.title+" 열기");
  txt(section,bend-140,target[1]-43,250,"클릭 → "+m.title,15,true,"#c27a00");
  const backs=buttonPositions.filter(b=>/취소|닫기|확인|저장|승인|등록|추가|반영|폐기|이동/.test(b.label)).slice(-2);
  if(!backs.length)backs.push({label:"닫기",x:20,y:frame.height-45});
  backs.forEach((b,i)=>{const discard=/취소|닫기/.test(b.label),color=discard?"#0870cb":"#ec9500",end=[main.x+main.width-30,main.y+main.height-25-i*28];arrow(section,[[frame.x+b.x,frame.y+b.y],[frame.x-40-i*18,frame.y+b.y],[frame.x-40-i*18,frame.y+frame.height+20+i*25],[2370-i*20,frame.y+frame.height+20+i*25],[2370-i*20,end[1]],end],b.label+" → "+(discard?"원래 화면 유지":"설명에 따른 결과"),color,discard);});
  frame.setPluginData("cmsRevisionTrigger",JSON.stringify(m.anchor));my+=frame.height+100;modalCount++;
 }
 if(s.variants&&s.variants.length){
  const v=figma.createFrame();section.appendChild(v);v.x=3650;v.y=110;v.resize(1550,2000);v.name="문항 형태에 따른 OMR 입력 영역 비교";v.setPluginData("cmsRevisionVariant","OMR14");
  txt(v,30,30,1490,"문항 형태 선택 → OMR 입력 형태 변경",30,true);txt(v,30,90,1490,"동일 OMR 수정 화면의 부분 영역만 비교합니다. 유형 전환은 저장 전 로컬 상태이며 최종 반영과 구분합니다.",18);
  let vy=160;
  for(let i=0;i<s.variants.length;i+=2){let rowH=0;for(let j=0;j<2&&i+j<s.variants.length;j++){const item=s.variants[i+j],xx=30+j*770;const label=txt(v,xx,vy,730,item.title,19,true);const image=crop(v,xx,vy+label.height+15,730,item.image,item.crop);rowH=Math.max(rowH,label.height+15+image.height+55);}vy+=rowH;}
  v.resize(1550,vy+30);const p=origin(s.notes[1].anchor);arrow(section,[p,[3560,p[1]],[3560,200],[3650,200]],"형태 선택 → 입력 폼 변경");my=Math.max(my,v.height+110);
 }
 section.resizeWithoutConstraints(s.variants?5250:3600,Math.max(main.y+main.height+100,my+30));
 section.setPluginData("cmsRevisionDone","yes");nodeIndex[s.id]={page:page.id,section:section.id,frame:main.id,modals:modalCount};built++;
}
figma.root.setPluginData("cmsRevisionNodes",JSON.stringify(nodeIndex));
figma.notify("CMS 스토리보드 배치 "+BATCH+" 완료",{timeout:60000});
print({batch:BATCH,built});
