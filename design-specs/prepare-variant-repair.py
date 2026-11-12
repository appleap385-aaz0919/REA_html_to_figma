import json,base64,hashlib
from pathlib import Path
root=Path(__file__).resolve().parent;d=json.loads((root/'revision-consolidated-plan.json').read_text(encoding='utf-8'));s=next(s for s in d['screens']if s['id']=='REV_ITM_06');assets={v['image']['key']:base64.b64encode((root.parent/v['image']['path']).read_bytes()).decode()for v in s['variants']}
prefix=(root/'revision-runtime.js').read_text(encoding='utf-8').split('let built=0;')[0]
code='const BATCH=906;\nconst INPUT='+json.dumps([{'assets':assets}])+';\nconst variants='+json.dumps(s['variants'],ensure_ascii=False)+';\n'+prefix+r'''
const section=figma.getNodeById(nodeIndex.REV_ITM_06.section);
const old=section.children.find(n=>n.getPluginData("cmsRevisionVariant")==="OMR14");if(old)old.remove();
const v=figma.createFrame();section.appendChild(v);v.x=3650;v.y=110;v.resize(1550,2000);v.name="문항 형태에 따른 OMR 입력 영역 비교";v.setPluginData("cmsRevisionVariant","OMR14");
txt(v,30,30,1490,"문항 형태 선택 → OMR 입력 형태 변경",30,true);txt(v,30,90,1490,"같은 공통 OMR 폼의 랩 표본을 부분 캡처했습니다. 선택 유형에 따른 입력 구조를 비교하며 저장 전 로컬 상태와 최종 반영을 구분합니다.",18);
let y=175;
for(let i=0;i<variants.length;i+=2){let rowH=0;for(let j=0;j<2&&i+j<variants.length;j++){const item=variants[i+j],x=30+j*770;const label=txt(v,x,y,730,item.title,19,true);const image=crop(v,x,y+label.height+15,730,item.image,item.crop);rowH=Math.max(rowH,label.height+15+image.height+55);}y+=rowH;}
v.resize(1550,y+30);section.resizeWithoutConstraints(Math.max(section.width,5250),Math.max(section.height,v.y+v.height+100));
figma.notify("CMS 스토리보드 배치 906 완료",{timeout:60000});
'''
(root/'revision-variant-repair.js').write_text(code,encoding='utf-8');print('Variant capture refresh ready')
