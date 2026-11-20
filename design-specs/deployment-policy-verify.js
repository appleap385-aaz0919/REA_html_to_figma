const report=v=>print('DEPLOYMENT_VERIFIED '+JSON.stringify(v));
const D={
  "id": "PAPER-ITEM-DEPLOYMENT-20261120",
  "date": "2026-11-20",
  "authorization": "이번 작업에 한해 중간 사용자 승인 없이 HTML·Figma·Description 반영. 이후 요청의 승인 절차는 유지.",
  "existingNotesOnly": true,
  "newNumberedDescriptions": 0,
  "updates": {
    "REV_ITM_02": {
      "REV_ITM_DEPLOY": "[확정 정책 · 2026.11.20] 문항은 사용(Y) 상태만 배포할 수 있습니다. 초안(R)·실패(F)·사용 중지/미사용(N)·폐기(D)는 버튼을 비활성화하며 실행 시에도 자격을 다시 검사합니다. AI출제마법사 CMS 또는 개발 서비스 중 대상을 선택해야 최종 배포가 활성화됩니다. 재배포 대상이면 안내를 표시하고 취소는 배포 정보를 바꾸지 않습니다. 목업은 로컬 배포 이력만 저장하며 실제 CMS 배포·Service 수신은 이번 작업에서 검증하지 않았습니다.",
      "REV_ITM_STATUS_SAVE": "[사용자 승인 · 2026.11.19] 폐기(D)가 아닌 문항은 진입 즉시 온오프·용도·허용 상태값을 편집합니다. 수정·취소 버튼은 없고 저장만 표시합니다. 기본 저장은 회색 비활성이며, 저장값과 하나라도 달라지면 파란색으로 활성화하고 모두 원복하면 다시 비활성화합니다.\n허용 전환: 초안(R)·실패(F) → 승인(사용 Y)·승인(미사용 N)·폐기(D). 승인(사용 Y) → 승인(미사용 N)·폐기(D). 승인(미사용 N) → 승인(사용 Y)·폐기(D). 저장된 현재 상태는 원복용으로 선택할 수 있습니다. 폐기(D)는 모든 입력과 저장을 잠그며 편집·복구할 수 없습니다.\n기존 승인 필수값·OMR 검사를 유지하고 통과 후 “저장하시겠습니까?” 확인창을 엽니다. 확인창 취소는 입력을 유지하며 제출하지 않습니다. 최종 저장 뒤 서비스 영역만 갱신하고 검수 패널과 미전송 입력은 유지합니다.\n상태값을 바꿀 때만 같은 논리 세트에 상태를 전파합니다. 온오프·용도는 현재 문항에만 적용합니다. 대상 상태로 전환할 수 없는 구성원이 있거나 폐기 문항을 복구하게 되면 저장을 차단합니다.\n기존 단건·세트 폐기 안내와 현재 쌍둥이 제외는 유지합니다. 다른 쌍둥이 세트 전체를 폐기하는 동작과 구분하며 내용·버전·생성 이력과 현재 관계는 별개입니다.\n아래 기본·변경·폐기 예시는 승인된 로컬 HTML 캡처입니다. 실제 CMS 반영 전이며 과거 CMS 조사 근거는 보존합니다.\n[확정 정책 · 2026.11.20] 사용 중지와 승인(미사용 N)은 같은 상태입니다. 문항 상태 저장 후 포함 평가지의 자동 폐기·미사용 조건도 검사하며 사용 복귀만으로 평가지가 자동 복귀하지 않습니다. 평가지의 상태 설명에 상세 규칙을 통합합니다."
    },
    "REV_PAP_LIST": {
      "PAP_L03": "등록기간은 직접 입력하거나 7일·30일·90일·전체를 선택합니다. 상태는 전체·초안(R)·사용(Y)·미사용(N)·폐기(D)입니다. [확정 정책 · 2026.11.20] 사용 중지는 기존 미사용(N)과 같은 상태이며 새 상태를 추가하지 않습니다. 평가지 상태와 포함 문항 상태는 구분합니다. Master의 문항 변경으로 자동 폐기·미사용 처리된 결과도 이 목록에 반영합니다."
    },
    "REV_PAP_DETAIL": {
      "PAP_D02": "[확정 정책 · 2026.11.20 / Master CMS] 사용 중지는 미사용(N)과 같은 상태입니다. 사용 문항이 없고 모든 문항이 폐기(D)이면 평가지를 자동 폐기합니다. 사용 문항이 없고 미사용(N) 문항이 하나라도 있으면 평가지를 자동 미사용 처리합니다. 이후 문항이 사용으로 돌아와도 평가지가 자동 복귀하지 않고 관리자가 수동 변경해야 합니다. 미사용 평가지의 승인 복귀에는 승인(사용) 문항이 1개 이상 필요합니다. 자동 처리 사유를 상세에 안내합니다. 사용(Y) 평가지만 배포할 수 있고 폐기 평가지의 수정·배포는 잠급니다. 이 자동 상태 규칙을 Service CMS로 확대하지 않습니다.",
      "PAP_D06": "서비스별 배포 버전·승인 여부·서비스 상태·최근 배포와 미배포 문항 수를 표시합니다. [확정 정책 · 2026.11.20] 폐기 문항은 대상별 미배포 집계·조회와 Service DB 존재 검사에서 제외합니다. 한 번도 배포되지 않은 폐기 문항에도 Service 레코드 존재를 요구하지 않습니다. 목업은 실제 전송 당시 버전·시각과 포함 문항 ID만 로컬 기록하고 Service 승인 여부는 미확인(모의)으로 표시합니다. 배포 성공을 문항 승인이나 시험지 승인으로 간주하지 않습니다.",
      "PAP_D07": "[확정 정책 · 2026.11.20] 사용(Y) 평가지에서 배포 모달을 엽니다. 폐기(D)는 배포 대상·선행 문항 배포·Service DB 존재 검사에서 모두 제외합니다. 나머지 문항이 모두 사용(Y)이고 선택한 대상에 먼저 배포되어 있어야 합니다. 미배포 문항이 있거나 미사용(N)·초안·실패 문항이 있으면 대상 선택과 최종 배포를 차단하고 사유를 표시합니다. 평가지 배포가 포함 문항을 함께 배포하지 않습니다. 사용 9개와 폐기 1개라면 9개만 배포하며 원본 문항·편성은 삭제하지 않습니다.\nService에서 시험지를 승인할 때 수정된 버전·미배포 문항이 있으면 승인할 수 없고 문항 승인이 선행돼야 합니다. 대기중→초안은 폐기를 제외한 대상 문항이 승인 수락 상태로 Service DB에 존재해야 하며 반려 문항이 있으면 차단합니다. Master 사용 상태·Service 배포·문항 승인·시험지 승인은 별개입니다. Service 실제 승인·버전 비교는 미검증입니다."
    },
    "REV_PAP_EDIT": {
      "PAP_E02": "초안(R)·사용(Y)·미사용(N)·폐기(D)를 선택합니다. [확정 정책 · 2026.11.20] 사용 중지는 미사용(N)과 같은 상태입니다. 초안→사용은 포함 문항이 모두 승인(사용 Y)이어야 하며, 초안·실패·미사용·폐기 문항이 하나라도 있으면 저장을 차단합니다. 폐기 문항의 배포 검사 제외를 이 전환 검사에 적용하지 않습니다. 미사용(N)→승인(사용) 수동 복귀는 승인(사용) 문항이 1개 이상일 때 허용하며 전원 사용 조건과 구분합니다. 문항이 복귀해도 평가지 상태는 자동 복귀하지 않습니다. 폐기 평가지의 편집·복구는 허용하지 않습니다.",
      "PAP_E11": "일반 저장은 별도 확인창 없이 제출하고 새 상세 버전 이력을 남깁니다. 폐기(D)는 페이지 필수 조건을 해제하고 나머지 폼 유효성 통과 후 “폐기한 평가지는 다시 수정할 수 없습니다.” 확인창을 엽니다. [확정 정책 · 2026.11.20] 초안→사용과 미사용→승인 복귀는 현재 저장 상태에 맞는 조건을 각각 검사합니다. 이미 사용 중인 평가지의 정보를 저장할 때 폐기 문항을 편성에서 강제로 삭제하지 않습니다. 최종 저장에서 상태와 포함 문항을 다시 검사하며 실제 CMS 서버 적용과 목업 저장은 구분합니다."
    }
  }
}
,ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes')),raw=figma.root.getPluginData('cmsDeploymentPolicyApplied');
if(!raw)throw Error('Policy application marker missing');const applied=JSON.parse(raw);
const result={date:'2026-11-20',backup:applied.backup,changes:applied.changes.length,newNumberedDescriptions:0,frames:[],modals:[],outside:[],overlaps:[],sectionOverlaps:[],policyMatches:true,priorStatusLabelsPreserved:true};
for(const key of Object.keys(D.updates)){
 const f=figma.getNodeById(ix[key].frame),notes=JSON.parse(f.getPluginData('cmsRevisionNotes'));
 const expected=applied.frames.find(x=>x.key===key).notes;
 if(JSON.stringify(notes.map(n=>({key:n.key,number:n.number})))!==JSON.stringify(expected))throw Error('Note numbers changed '+key);
 const unique=new Set(notes.map(n=>n.key));if(unique.size!==notes.length)throw Error('Duplicate notes '+key);
 const matches=Object.entries(D.updates[key]).map(([id,body])=>{const note=notes.find(n=>n.key===id),title=f.children.find(n=>n.type==='TEXT'&&n.x>1900&&n.characters===note.label),rendered=f.children.filter(n=>n.type==='TEXT'&&n.x===title.x&&n.y>title.y).sort((a,b)=>a.y-b.y)[0];return{key:id,matches:note.body===body&&rendered.characters===body};});if(matches.some(x=>!x.matches))result.policyMatches=false;
 const ts=f.children.filter(n=>n.type==='TEXT'&&n.x>=1980);
 for(const t of f.findAll(n=>n.type==='TEXT')){if(!t.visible)continue;const b=t.absoluteBoundingBox,a=t.parent.absoluteBoundingBox;if(b.x<a.x-2||b.y<a.y-2||b.x+b.width>a.x+a.width+2||b.y+b.height>a.y+a.height+2)result.outside.push({frame:key,node:t.id,text:t.characters.slice(0,60)});}
 for(let a=0;a<ts.length;a++)for(let b=a+1;b<ts.length;b++){const p=ts[a],q=ts[b];if(Math.min(p.x+p.width,q.x+q.width)-Math.max(p.x,q.x)>3&&Math.min(p.y+p.height,q.y+q.height)-Math.max(p.y,q.y)>3)result.overlaps.push({frame:key,nodes:[p.id,q.id]});}
 const images=f.findAll(n=>n.getPluginData('deploymentPolicyImage')).map(n=>({id:n.id,key:n.getPluginData('deploymentPolicyImage'),w:n.width,h:n.height,image:!!n.fills.find(f=>f.type==='IMAGE'&&f.imageHash)}));
 result.frames.push({key,id:f.id,width:f.width,height:f.height,noteCount:notes.length,numbers:notes.map(n=>n.number),matches,images});
 if(key==='REV_ITM_02'){result.priorStatusLabelsPreserved=f.children.filter(n=>n.name==='요소 번호 8').length===2&&!f.children.some(n=>['요소 번호 13','요소 번호 14'].includes(n.name));}
}
for(const id of applied.modalFrames){const f=figma.getNodeById(id),ts=f.children.filter(n=>n.type==='TEXT'&&n.x>=700);for(const t of ts)if(t.y+t.height>f.height+2||t.x+t.width>f.width+2)result.outside.push({frame:id,node:t.id});for(let a=0;a<ts.length;a++)for(let b=a+1;b<ts.length;b++){const p=ts[a],q=ts[b];if(Math.min(p.x+p.width,q.x+q.width)-Math.max(p.x,q.x)>3&&Math.min(p.y+p.height,q.y+q.height)-Math.max(p.y,q.y)>3)result.overlaps.push({frame:id,nodes:[p.id,q.id]});}result.modals.push({id,width:f.width,height:f.height,controlNumbers:f.children.filter(n=>n.type==='TEXT'&&n.name.startsWith('요소 번호 ')).map(n=>n.characters),images:f.findAll(n=>n.getPluginData('deploymentPolicyImage')).map(n=>n.getPluginData('deploymentPolicyImage'))});}
for(const pid of ['0:1','7:9756']){const sections=figma.getNodeById(pid).children.filter(n=>n.type==='SECTION').sort((a,b)=>a.y-b.y);for(let i=1;i<sections.length;i++)if(sections[i].y<sections[i-1].y+sections[i-1].height)result.sectionOverlaps.push([sections[i-1].id,sections[i].id]);}
result.disabledButtonMask=JSON.parse(figma.getNodeById('8:16538').getPluginData('cmsDeploymentButtonMask')||'null');
result.verified=result.policyMatches&&result.priorStatusLabelsPreserved&&!result.outside.length&&!result.overlaps.length&&!result.sectionOverlaps.length;
figma.root.setPluginData('cmsDeploymentPolicyVerification',JSON.stringify(result));report(result);
