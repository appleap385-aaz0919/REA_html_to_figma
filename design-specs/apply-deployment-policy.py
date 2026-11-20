"""Apply the bounded 2026-11-20 offline deployment-policy delta once."""
from pathlib import Path

p=Path(__file__).resolve().parent.parent/'master-cms-mockup/app.js'
s=p.read_text(encoding='utf-8')
def replace(a,b):
 global s
 assert s.count(a)==1,(s.count(a),a[:100])
 s=s.replace(a,b)
replace('function save(message){if(message)', 'function save(message){syncPaperStates();if(message)')
start=s.index(' function deploy(id,isPaper=false)');end=s.index(' function download(name,text,type=',start)
s=s[:start]+''' function paperItems(p){return [...new Set(p.groups.flat())].map(item);}
 function paperDeployCheck(p,target){
  const all=paperItems(p),included=all.filter(i=>i?.status!=='D');
  if(p.status!=='Y')return {allowed:false,reason:'사용 평가지만 배포할 수 있습니다.'};
  if(!all.length||all.some(i=>!i))return {allowed:false,reason:'포함 문항 정보를 확인할 수 없습니다.'};
  if(!included.length)return {allowed:false,reason:'폐기 문항을 제외하면 배포할 문항이 없습니다.'};
  if(included.some(i=>i.status!=='Y'))return {allowed:false,reason:'사용 중지(미사용 N)·초안·실패 문항이 포함되어 배포할 수 없습니다.'};
  const missing=included.filter(i=>!i.deployed.includes(target));
  if(missing.length)return {allowed:false,reason:`${missing.length}건의 문항을 이 대상에 먼저 배포해 주세요.`};
  return {allowed:true,items:included};
 }
 function syncPaperStates(){
  for(const p of db.papers){
   if(p.status==='D')continue;
   const included=paperItems(p);if(!included.length||included.some(i=>!i)||included.some(i=>i.status==='Y'))continue;
   const next=included.every(i=>i.status==='D')?'D':included.some(i=>i.status==='N')?'N':null;
   if(!next||next===p.status)continue;
   p.history.push({version:p.version,at:now(),name:p.name,status:p.status});p.version=Date.now();p.status=next;
   p.automaticStatus={status:next,at:now(),reason:next==='D'?'포함 문항이 모두 폐기되어 자동 폐기되었습니다.':'사용 문항이 없고 사용 중지(미사용 N) 문항이 있어 자동으로 미사용 처리되었습니다. 문항이 사용으로 돌아와도 관리자 수동 변경이 필요합니다.'};
   db.events.unshift({at:now(),message:`평가지 ${p.id} 자동 ${next==='D'?'폐기':'미사용(사용 중지)'} 처리`});
  }
 }
 function paperUseError(original,p){
  if(p.status!=='Y')return '';
  const included=paperItems(p);
  if(!included.length||included.some(i=>!i))return '포함 문항 정보를 확인해 주세요.';
  if(original.status==='R'&&included.some(i=>i.status!=='Y'))return '초안에서 사용으로 변경하려면 모든 문항이 승인(사용) 상태여야 합니다. 폐기 문항도 예외로 제외하지 않습니다.';
  if(original.status==='N'&&!included.some(i=>i.status==='Y'))return '사용 중지(미사용 N) 평가지의 승인 복귀에는 승인(사용) 문항이 1개 이상 필요합니다.';
  return '';
 }
 function deploy(id,isPaper=false){
  const r=isPaper?paper(id):item(id),targets=['AI출제마법사 CMS','개발 서비스'];if(!r)return;
  if(!isPaper&&r.status!=='Y')return alertBox('문항 배포','사용(Y) 상태의 문항만 배포할 수 있습니다.');
  if(isPaper&&r.status!=='Y')return alertBox('평가지 배포','사용 평가지만 배포할 수 있습니다.');
  const check=t=>isPaper?paperDeployCheck(paper(id),t):{allowed:item(id)?.status==='Y',reason:'사용(Y) 상태의 문항만 배포할 수 있습니다.'};
  const m=modal(isPaper?'평가지 배포':'문항 배포',notice('목업의 배포 상태만 변경합니다. 실제 서비스로 전송하지 않습니다.')+(isPaper?'<p>폐기 문항은 배포 대상과 선행 배포·존재 검사에서 제외합니다. 나머지 문항을 선택한 대상에 먼저 배포해야 합니다. 포함 문항을 함께 배포하지 않습니다.</p>':'<p>사용(Y) 상태의 문항만 배포할 수 있습니다.</p>')+targets.map(t=>{const eligibility=check(t);return `<p><label><input type="checkbox" name="deployTarget" value="${t}" ${!eligibility.allowed?'disabled':''}>${t}</label> ${!eligibility.allowed?`<span class="error-text">${esc(eligibility.reason)}</span>`:r.deployed.includes(t)?'<span class="muted">이미 배포됨 · 재배포</span>':''}</p>`;}).join('')+'<p data-redeploy class="muted"></p>',[{label:'취소',fn:(_,m)=>closeModal(m)},{label:'배포',kind:'primary',disabled:true,fn:(_,m)=>{
   const selected=$$('input[name=deployTarget]:checked',m).map(x=>x.value);if(!selected.length)return;
   for(const t of selected){if(!targets.includes(t))return errorIn(m,'유효한 배포 대상을 선택해 주세요.');const eligibility=check(t);if(!eligibility.allowed)return errorIn(m,eligibility.reason);}
   selected.forEach(t=>{if(!r.deployed.includes(t))r.deployed.push(t);r.deploymentRecords=r.deploymentRecords||{};r.deploymentRecords[t]={version:r.version,at:now(),...(isPaper?{itemIds:check(t).items.map(i=>i.id)}:{})};});
   save('모의 배포: '+id);closeModal(m);render();toast('로컬 예시 배포 상태를 변경했습니다.');
  }}]);
  m.addEventListener('change',()=>{const selected=$$('input[name=deployTarget]:checked',m);$('.modal-foot .primary',m).disabled=!selected.length||selected.some(x=>!check(x.value).allowed);$('[data-redeploy]',m).textContent=selected.some(x=>r.deployed.includes(x.value))?'이미 배포한 대상에 같은 예시 버전을 다시 배포합니다.':'';});
 }
''' +s[end:]
replace("btn('배포하기','item-deploy',`data-id=\"${i.id}\" ${i.status==='D'?'disabled':''}`", "btn('배포하기','item-deploy',`data-id=\"${i.id}\" ${i.status!=='Y'?'disabled title=\"사용(Y) 상태의 문항만 배포할 수 있습니다.\"':''}`")
replace("p.groups.flat().filter(id=>!item(id)?.deployed.includes(t)).length", "paperItems(p).filter(i=>i?.status!=='D'&&!i?.deployed.includes(t)).length")
replace("p.deployed.includes(t)?p.version:'−',p.deployed.includes(t)?'승인':'−',p.deployed.includes(t)?'배포됨':'−','−'", "p.deploymentRecords?.[t]?.version||(p.deployed.includes(t)?'기록 없음':'−'),p.deployed.includes(t)?'미확인(모의)':'−',p.deployed.includes(t)?'배포됨':'−',esc(p.deploymentRecords?.[t]?.at||'−')")
replace("+`<div class=\"paper-page\">`+panel('기본 정보'", "+`<div class=\"paper-page\">`+(!editing&&p.automaticStatus?.status===p.status?notice(esc(p.automaticStatus.reason),'warning'):'')+panel('기본 정보'")
replace("ids=p.groups.flat().filter(id=>!item(id)?.deployed.includes(b.dataset.target))", "ids=p.groups.flat().filter(id=>item(id)?.status!=='D'&&!item(id)?.deployed.includes(b.dataset.target))")
old="if(p.status==='Y'&&p.groups.flat().map(item).some(i=>i.status!=='Y'))return alertBox('평가지 저장','실패·초안·미사용 문항이 포함되어 사용 상태로 저장할 수 없습니다. 승인(사용) 문항만 남겨 주세요.');"
new="const original=paper(p.id);if(!original||original.status==='D')return alertBox('평가지 저장','폐기 평가지의 수정은 잠겨 있습니다.');if(!['R','Y','N','D'].includes(p.status))return alertBox('평가지 저장','유효한 상태를 선택해 주세요.');const useError=paperUseError(original,p);if(useError)return alertBox('평가지 저장',useError);"
replace(old,new)
replace("const original=paper(p.id);p.history.push({version:original.version,at:now(),name:original.name});", "const original=paper(p.id);if(original.status==='D')return alertBox('평가지 저장','폐기 평가지의 수정은 잠겨 있습니다.');const useError=paperUseError(original,p);if(useError)return alertBox('평가지 저장',useError);p.history.push({version:original.version,at:now(),name:original.name});if(p.status!==original.status)delete p.automaticStatus;")
p.write_text(s,encoding='utf-8')
print('Applied offline deployment and paper-state policy delta.')
