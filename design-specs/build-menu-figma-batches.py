import json, base64, hashlib, sys
from pathlib import Path
root=Path(__file__).resolve().parent
workspace=root.parent
groups=[]
config=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8')) if len(sys.argv)>1 else {}
sources=config.get('sources',[("item-storyboard-states.json","01 문항 관리 · 전체 문항"),("hml-storyboard-states.json","02 문항 관리 · HML 문항 등록"),("definition-storyboard-states.json","03 문항 관리 · 디피니션 문항 등록"),("twin-storyboard-states.json","04 문항 관리 · 쌍둥이 그룹")])
for filename,page in sources:
    data=json.loads((root/filename).read_text(encoding="utf-8"))
    for screen in data["screens"]:
        screen["pageName"]=page
        groups.append(screen)
manifest={"pages":sorted(set(g["pageName"] for g in groups)),"sections":[],"states":0,"screenshots":0,"sourceFiles":[]}
assets={}
chunks=[]
chunk=[]
size=0
for gi,g in enumerate(groups):
    for si,state in enumerate(g["states"]):
        state=dict(state)
        state["screenId"]=g["id"]
        state["screenTitle"]=g["title"]
        state["pageName"]=g["pageName"]
        state["menuLabel"]=config.get('menuLabels',{}).get(g['pageName'],'문항 관리')
        state["sectionIndex"]=gi
        state["stateIndex"]=si
        state["id"]=g["id"]+"_"+str(si+1).zfill(2)
        shot=state.get("screenshot")
        if isinstance(shot,list): shot=next((x for x in shot if x),None)
        if isinstance(shot,dict): shot=shot.get("path")
        state["image"]=None
        if shot:
            p=Path(shot)
            if not p.is_absolute():p=workspace/p
            if not p.exists():raise FileNotFoundError(p)
            raw=p.read_bytes()
            key=hashlib.sha256(raw).hexdigest()
            state["image"]=key
            if key not in assets:
                encoded=base64.b64encode(raw).decode()
                if size+len(encoded)>3500000 and chunk:
                    chunks.append(chunk);chunk=[];size=0
                assets[key]=encoded
                state["newAsset"]=encoded
                size+=len(encoded)
            manifest["screenshots"]+=1
        chunk.append(state)
        manifest["states"]+=1
    manifest["sections"].append({"id":g["id"],"title":g["title"],"page":g["pageName"],"states":len(g["states"])})
if chunk:chunks.append(chunk)
(root/config.get('manifest','menu-storyboard-manifest.json')).write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
# Native Figma API code, executed in the visible Scripter plugin.
runtime = r"""
const regular={family:"Inter",style:"Regular"}, bold={family:"Inter",style:"Bold"};
await figma.loadFontAsync(regular);
await figma.loadFontAsync(bold);
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const fill=h=>[{type:"SOLID",color:rgb(h)}];
function box(parent,x,y,w,h,color="#ffffff",stroke="#dbe0e6"){
 const n=figma.createRectangle();parent.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=fill(color);n.strokes=fill(stroke);return n;
}
function text(parent,x,y,w,content,size=20,isBold=false,color="#253348"){
 const n=figma.createText();parent.appendChild(n);n.fontName=isBold?bold:regular;n.fontSize=size;n.lineHeight={value:150,unit:"PERCENT"};n.resize(w,1);n.textAutoResize="HEIGHT";n.characters=String(content);n.fills=fill(color);n.x=x;n.y=y;return n;
}
function cue(parent,x,y,n){
 const e=figma.createEllipse();parent.appendChild(e);e.resize(34,34);e.x=x;e.y=y;e.fills=fill("#ed263a");e.strokes=fill("#ffffff");e.strokeWeight=3;
 const t=text(parent,x,y+3,34,("0"+n).slice(-2),17,true,"#ffffff");t.textAlignHorizontal="CENTER";
}
function readable(x){if(typeof x==="string")return x;if(x&&typeof x.text==="string"){const basis={runtime:"실행 확인",source:"소스 확인",ui_guidance:"화면 안내"}[x.basis]||x.basis;return (basis?"["+basis+"] ":"")+x.text;}return JSON.stringify(x);}
function array(v){if(v==null)return[];return Array.isArray(v)?v.map(readable):[readable(v)];}
function b64(s){const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",out=[];let value=0,bits=0;for(const c of s){const v=chars.indexOf(c);if(v<0)continue;value=(value<<6)|v;bits+=6;if(bits>=8){bits-=8;out.push((value>>bits)&255);}}return new Uint8Array(out);}
function list(parent,x,y,w,items,size=20,color="#253348"){
 for(const s of array(items)){const t=text(parent,x,y,w,"• "+s,size,false,color);y+=t.height+12;}return y;
}
const assetCache=JSON.parse(figma.root.getPluginData("cmsStoryboardImages")||"{}");
const targetPages=new Set(INPUT.map(s=>s.pageName));
for(const page of figma.root.children){if(!targetPages.has(page.name))continue;for(const section of page.children.filter(n=>n.type==='SECTION')){for(const frame of [...section.children]){
 const id=frame.getPluginData('cmsStoryboardState');if(!id)continue;
 const footer=frame.children.find(n=>n.type==='TEXT'&&n.characters.startsWith(id+'   ·'));
 if(!footer){frame.remove();continue;}
 const key=STATE_IMAGES[id];const image=frame.children.find(n=>n.type==='RECTANGLE'&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE'));
 if(key&&image)assetCache[key]=image.fills.find(f=>f.type==='IMAGE').imageHash;
}}}
let done=0;
for(const s of INPUT){
 let page=figma.root.children.find(n=>n.type==="PAGE"&&n.name===s.pageName);
 if(!page&&s.pageName.startsWith("01 ")){page=figma.root.children.find(n=>n.type==="PAGE"&&n.name==="01 문항 관리");if(page)page.name=s.pageName;}
 if(!page){page=figma.createPage();page.name=s.pageName;}
 let section=page.children.find(n=>n.type==="SECTION"&&n.getPluginData("cmsStoryboardScreen")===s.screenId);
 if(!section){
  section=figma.createSection();page.appendChild(section);section.name=s.screenId+" "+s.screenTitle;section.setPluginData("cmsStoryboardScreen",s.screenId);
  const peers=page.children.filter(n=>n.type==="SECTION"&&n!==section);
  section.x=0;section.y=peers.length?Math.max(...peers.map(n=>n.y+n.height))+320:0;
  section.resizeWithoutConstraints(7500,1800);
 }
 if(section.children.some(n=>n.getPluginData("cmsStoryboardState")===s.id)){continue;}
 const frame=figma.createFrame();section.appendChild(frame);frame.name=s.id+" "+s.title;frame.setPluginData("cmsStoryboardState",s.id);frame.clipsContent=false;frame.fills=fill("#ffffff");
 frame.setPluginData('cmsStoryboardStateOrder',String(s.stateIndex));section.setPluginData('cmsStoryboardScreenOrder',String(s.sectionIndex));
 frame.resize(2300,1700);frame.x=(s.stateIndex%3)*2450+70;frame.y=Math.floor(s.stateIndex/3)*2150+110;
 box(frame,40,32,2220,70,"#f2f3f5","#f2f3f5");
 text(frame,60,44,350,"화면 ID  "+s.id,17,true);text(frame,420,44,1140,s.screenTitle,20,true);
 text(frame,1730,44,470,"2026.11.11   /   v0.2",17);
 const title=text(frame,48,125,2170,s.title,30,true);
 const trigger=text(frame,48,188,2150,"사용자 동작  "+s.trigger,22,false,"#0870cb");
 const imageY=trigger.y+trigger.height+25;
 text(frame,48,imageY,1460,s.image?"01   변경 후 화면 · 실제 실행 캡처":"01   화면 변화 · 관측 및 소스 기반 설명",20,true);
 let leftBottom=imageY+50;
 if(s.image){
  if(s.newAsset&&!assetCache[s.image])assetCache[s.image]=figma.createImage(b64(s.newAsset)).hash;
  const image=figma.getImageByHash(assetCache[s.image]);const sz=await image.getSizeAsync();
  const h=Math.min(1020,1460*sz.height/sz.width),w=Math.min(1460,1020*sz.width/sz.height);
  box(frame,48,imageY+45,1460,h,"#f5f7fa");
  const pic=box(frame,48+(1460-w)/2,imageY+45,w,h,"#ffffff");
  pic.name="실제 화면 캡처";pic.fills=[{type:"IMAGE",imageHash:assetCache[s.image],scaleMode:"FIT"}];
  cue(frame,34,imageY+35,1);
  leftBottom=imageY+45+h+24;
 }else{
  box(frame,48,imageY+45,1460,620,"#f8f9fb");
  box(frame,48,imageY+45,210,620,"#0870cb","#0870cb");
  text(frame,65,imageY+70,180,"마스터 CMS",20,true,"#ffffff");
  text(frame,65,imageY+130,180,s.menuLabel||"문항 관리",20,true,"#ffffff");
  text(frame,290,imageY+80,1180,s.screenTitle,25,true);
  text(frame,290,imageY+125,1160,"화면에 나타나는 변화",20,true,"#0870cb");
  list(frame,290,imageY+175,1120,s.visibleChanges,22);
  text(frame,290,imageY+555,1120,"캡처가 없는 상태의 동작 설명도입니다. 구체적인 실행 범위는 우측 정책을 확인합니다.",18,false,"#6e7c8d");
  cue(frame,34,imageY+35,1);
  leftBottom=imageY+690;
 }
 let sy=leftBottom+12;
 box(frame,48,sy,1460,150,"#edf5ff","#c2dafa");cue(frame,34,sy-12,2);
 text(frame,78,sy+18,1390,"상태 전환",22,true,"#0870cb");
 const flow=text(frame,78,sy+58,1390,s.trigger+"  →  "+s.title,21);
 const flowHeight=Math.max(150,flow.height+80);
 const evidence=array(s.evidence);
 text(frame,48,sy+flowHeight+25,1460,"근거  "+evidence.slice(0,3).map(p=>p.split("/").pop()).join(" · "),15,false,"#6e7c8d");
 let y=imageY;
 box(frame,1580,y,672,46,"#202832","#202832");
 text(frame,1600,y+8,620,"No.     Description · 동작 / 정책 / 예외",20,true,"#ffffff");y+=46;
 for(const [num,label,items] of [[1,"화면 변화",s.visibleChanges],[2,"동작과 정책",s.policy],[3,"예외·확인 범위",array(s.exceptions).length?s.exceptions:["화면에 기재한 표본·실행·소스 범위를 기준으로 해석합니다."]]]){
  const start=y;
  const bg=box(frame,1580,y,672,200);const no=box(frame,1580,y,62,200,"#f5f6f8");
  text(frame,1598,y+20,40,("0"+num).slice(-2),20,true);
  const head=text(frame,1660,y+18,570,label,23,true);
  y=head.y+head.height+12;y=list(frame,1660,y,565,items,20);y+=18;
  bg.resize(672,y-start);no.resize(62,y-start);
 }
 const height=Math.max(1450,y+55,sy+flowHeight+110);
 frame.resize(2300,height);
 text(frame,48,height-47,1450,s.id+"   ·   "+s.pageName+"   ·   동일 섹션의 상태 번호 순서로 확인",16,false,"#6e7c8d");
 section.resizeWithoutConstraints(Math.max(section.width,frame.x+frame.width+70),Math.max(section.height,frame.y+frame.height+100));
 frame.setPluginData("cmsStoryboardEvidence",JSON.stringify(evidence));done++;
}
figma.root.setPluginData("cmsStoryboardImages",JSON.stringify(assetCache));
for(const page of figma.root.children){
 if(!targetPages.has(page.name))continue;
 const sections=page.children.filter(n=>n.type==='SECTION'&&n.getPluginData('cmsStoryboardScreen')).sort((a,b)=>Number(a.getPluginData('cmsStoryboardScreenOrder'))-Number(b.getPluginData('cmsStoryboardScreenOrder')));
 const existing=page.children.filter(n=>n.type==='SECTION'&&!n.getPluginData('cmsStoryboardScreen'));
 let sectionY=existing.length?Math.max(...existing.map(n=>n.y+n.height))+320:0;
 for(const section of sections){
  const frames=section.children.filter(n=>n.getPluginData('cmsStoryboardState')).sort((a,b)=>Number(a.getPluginData('cmsStoryboardStateOrder'))-Number(b.getPluginData('cmsStoryboardStateOrder')));
  let rowY=110;
  for(let i=0;i<frames.length;i+=3){const row=frames.slice(i,i+3);for(let j=0;j<row.length;j++){row[j].x=j*2450+70;row[j].y=rowY;}rowY+=Math.max(...row.map(n=>n.height))+180;}
  section.resizeWithoutConstraints(7500,rowY);section.x=0;section.y=sectionY;sectionY+=section.height+320;
 }
}
const total=Number(figma.root.getPluginData("cmsStoryboardCount")||0)+done;figma.root.setPluginData("cmsStoryboardCount",String(total));
figma.notify("CMS 스토리보드 배치 "+BATCH+" 완료",{timeout:60000});
print({batch:BATCH,created:done,total,sections:figma.root.children.map(p=>({page:p.name,sections:p.children.filter(n=>n.type==="SECTION").map(n=>({id:n.id,name:n.name,states:n.children.length}))}))});
"""
out=root/config.get('outputDir','figma-batches');out.mkdir(exist_ok=True)
for i,c in enumerate(chunks):
    state_images={s['id']:s['image'] for batch in chunks for s in batch if s['image']}
    number=i+config.get('batchStart',1)
    js="const BATCH="+str(number)+";\nconst STATE_IMAGES="+json.dumps(state_images)+";\nconst INPUT="+json.dumps(c,ensure_ascii=False)+";\n"+runtime
    (out/f"batch-{number:02}.js").write_text(js,encoding="utf-8")
print(json.dumps({"sections":len(groups),"states":manifest["states"],"imageStates":manifest["screenshots"],"uniqueImages":len(assets),"batches":len(chunks),"largestBytes":max(p.stat().st_size for p in out.glob('batch-*.js'))}))

