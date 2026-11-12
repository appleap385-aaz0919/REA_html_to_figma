import json
from pathlib import Path
root=Path(__file__).resolve().parent
config=json.loads((root/"remaining-menu-config.json").read_text(encoding="utf-8"))
ids=[];provenance={}
for filename,page in config["sources"]:
    for g in json.loads((root/filename).read_text(encoding="utf-8"))["screens"]:
        for i,s in enumerate(g["states"]):
            state=g["id"]+"_"+str(i+1).zfill(2)
            ids.append(state);provenance[state]=s["evidence"]
template=(root/"finalize-menu-storyboard.template.js").read_text(encoding="utf-8")
template=template.replace("const expected=EXPECTED;","const BATCH=800;\nconst requestedPages="+json.dumps([p for _,p in config["sources"]],ensure_ascii=False)+";\nconst expected=EXPECTED;")
template=template.replace('const all=figma.root.children.flatMap','const all=figma.root.children.filter(p=>requestedPages.includes(p.name)).flatMap')
template=template.replace('for(const f of all){',r'''for(const f of all){
 for(const n of f.children.filter(n=>n.type==="TEXT"&&n.characters.startsWith("• {"))){
  try{const x=JSON.parse(n.characters.slice(2));if(typeof x.text==="string"){const basis={runtime:"실행 확인",source:"소스 확인",ui_guidance:"화면 안내"}[x.basis]||x.basis;n.characters="• "+(basis?"["+basis+"] ":"")+x.text;}}catch(e){}
 }
''')
template=template.replace('const pages=figma.root.children.filter(p=>p.name.includes("문항 관리"));','const pages=figma.root.children.filter(p=>requestedPages.includes(p.name)).sort((a,b)=>a.name.localeCompare(b.name));')
flow='const flow='+json.dumps({"00 홈 · 공통 기능":"홈 → 업무 메뉴 펼침 → 업무 화면 이동 · 공통 로그아웃 확인","05 평가지 관리":"목록 → 상세 → 편성 수정 → 문항·세트 추가·제거 → 정렬 → 저장·취소","06 문항 출처 관리":"목록 → 등록·수정 → 출처코드·필수값 확인 → 상세 → 문항 연결·해제","07 랩":"진입 → 관리자 선택창 / 데모 이동 → 입력·선택·복원 → 확인·초기화"},ensure_ascii=False)+'[page.name];'
template="\n".join(flow if line.strip().startswith("const flow=page.name") else line for line in template.splitlines())
template=template.replace('figma.root.setPluginData("cmsStoryboardAudit",JSON.stringify(audit));','figma.root.setPluginData("cmsRemainingAudit",JSON.stringify(audit));')
template=template.replace('contact.name="검토용 화면 모음 · 4개 메뉴"','contact.name="나머지 메뉴 · 검토용 화면 모음"')
template=template.replace('"문항 관리 · 상태별 화면 구성 검토"','"홈 · 평가지 · 출처 · 랩 상태별 화면 검토"')
template=template.replace('print(audit);','')
cut=template.index('await figma.setCurrentPageAsync(firstIndex.parent);')
template=template[:cut]+r'''
const baseline=JSON.parse(figma.root.getPluginData("cmsRemainingBefore")||"null");
if(!baseline)throw Error("Prior work baseline missing");
const preserved=baseline.states.every(before=>{
 const node=figma.getNodeById(before.id);
 return node&&node.getPluginData("cmsStoryboardState")===before.state&&node.x===before.x&&node.y===before.y&&node.width===before.w&&node.height===before.h;
});
if(!preserved)throw Error("Existing storyboard state layout changed");
audit.preexistingStatesPreserved=baseline.states.length;
const allPages=figma.root.children.filter(p=>p.children.some(n=>n.getPluginData("cmsStoryboardIndex")==="yes")).sort((a,b)=>a.name.localeCompare(b.name));
const home=pages.find(p=>p.name.startsWith("00"));
const oldMaster=home.children.find(n=>n.getPluginData("cmsMasterIndex")==="yes");if(oldMaster)oldMaster.remove();
const master=figma.createFrame();home.appendChild(master);master.name="Master CMS · 전체 메뉴 목차";master.setPluginData("cmsMasterIndex","yes");master.x=-5200;master.y=0;master.resize(2300,1800);
r(master,0,0,2300,1800,"#ffffff");
t(master,65,55,2150,"Master CMS 화면설계서",48,true);
t(master,65,155,2150,"메뉴 → 화면 섹션 → 사용자 동작별 상태",28,false,"#0870cb");
t(master,65,230,2150,"왼쪽은 화면과 상태 전환, 오른쪽은 동작·정책·예외 설명입니다.",23);
let gy=330;
for(const page of allPages){
 const index=page.children.find(n=>n.getPluginData("cmsStoryboardIndex")==="yes");
 const sections=page.children.filter(n=>n.type==="SECTION"&&n.getPluginData("cmsStoryboardScreen"));
 const states=sections.reduce((sum,s)=>sum+s.children.filter(n=>n.getPluginData("cmsStoryboardState")).length,0);
 r(master,65,gy,2170,100,gy%2?"#f5f7fa":"#edf5ff");
 const label=t(master,100,gy+23,1600,page.name,30,true,"#0870cb");
 label.hyperlink={type:"URL",value:"https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id="+index.id.replace(":","-")};
 t(master,1780,gy+26,400,sections.length+"개 화면 · "+states+"개 상태",23,true);
 gy+=120;
}
t(master,65,gy+45,2150,"읽는 방법",28,true);gy+=100;
for(const s of [
 "메뉴 이름의 링크를 열면 해당 메뉴의 화면 목차로 이동합니다. 화면 목차의 링크로 섹션을 엽니다.",
 "실제 캡처가 없는 상태는 화면 변화 설명도로 표시했습니다. 실제 실행·소스 확인·미검증 범위를 설명표에 기재했습니다.",
 "실제 해석 HML, 정상 디피니션 세트 ZIP, 다른 역할 및 서비스의 배포 수신·채점은 별도 미검증 메모를 따릅니다."
]){const node=t(master,65,gy,2170,"• "+s,22);gy+=node.height+22;}
master.resize(2300,Math.max(1800,gy+80));master.children[0].resize(2300,master.height);
audit.masterIndex=master.id;
figma.root.setPluginData("cmsRemainingAudit",JSON.stringify(audit));
if(typeof figma.root.insertChild==="function"){allPages.forEach((p,i)=>figma.root.insertChild(i,p));}
await figma.setCurrentPageAsync(home);
figma.currentPage.selection=[contact];figma.viewport.scrollAndZoomIntoView([contact]);
figma.notify("CMS 스토리보드 배치 800 완료",{timeout:60000});
print(audit);
'''
template=template.replace("EXPECTED",json.dumps(ids)).replace("PROVENANCE",json.dumps(provenance,ensure_ascii=False))
template="const BATCH=800;\n"+template.replace("const BATCH=800;\n","")
(root/"finalize-remaining-menu.js").write_text(template,encoding="utf-8")
print("Expected new states",len(ids))

