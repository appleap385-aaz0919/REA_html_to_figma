"""Record an already-confirmed restore. No network/browser operations."""
import json,re
from pathlib import Path
r=Path(__file__).resolve().parent
def read(n):return json.loads((r/n).read_text(encoding='utf-8'))
def write(n,o):(r/n).write_text(json.dumps(o,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('paper341-save-intent.json');d=read('evidence/1732-paper341-restored-detail-values.json')['action']['data']['result'];values={x['label']:x['value'] for x in d['values']}
assert values['평가지 ID']=='341 (1096)' and values['평가지명']==intent['restoreValues']['paperName'] and values['페이지']=='2 ~ 22' and values['문항 수']=='4문항'
assert [re.search(r'\d+',t['cells'][1]).group() for t in d['tables'][1]['rows']]==intent['restoreItemIds']
assert values['상태']=='초안' and values['용도']=='교사용'
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==21
ledger['entries'].append({'operation':'Restore original metadata on MOCK paper341 after reversible save probe','paperId':341,'beforeDetailId':1095,'afterDetailId':1096,'submitEvidence':1730,'readbackEvidence':[1731,1732,1733],'submittedValues':intent['restoreValues'],'itemIds':intent['restoreItemIds'],'status':'Name, pages2-22, draft, Teacher and original4member order confirmed restored. Saved detail history remains1095/1096.'});ledger['entries'][-2]['status']='Temporary save confirmed; original metadata subsequently restored at operation22/detail1096.';write('mutation-ledger.json',ledger)
intent.update({'status':'restored_confirmed','restoredDetailId':1096,'restoreSubmitEvidence':1730,'restoreReadbackEvidence':[1731,1732,1733],'restorationRequired':False,'historyNote':'Field values restored; two newly saved detail versions1095/1096 remain in server history.'});write('paper341-save-intent.json',intent)
phase={'schemaVersion':1,'date':'2026-11-09','status':'evidence_recorded_with_remaining_branches','evidenceRange':[1713,1733],'lastEvidence':'1733-paper341-restored-detail-source',
 'summary':'MOCK 복제 평가지341에서 이름·시작 페이지를 실제로 저장하고 재진입으로 확인한 뒤 원래 값으로 복원했다. 두 저장 모두 문항4개·순서·초안·교사용을 유지했고 상세ID가374→1095→1096으로 바뀌었다. 확정 Master 저장 작업은22회다.',
 'observations':[
  {'evidence':[1713,1714,1715,1716,1717],'result':'변경 직전 평가지341/detail374는 원래 MOCK 복제10 이름, 초안R, 페이지2~22, 교사용T, HML문서431, 문항2087755/2087758/2087759/2087760 순서였다. 마지막3개는 지문2087757의세트다. 원상 복원 기준과 시험 범위는 paper341-save-intent.json에 저장했다.'},
  {'evidence':[1717],'evidenceType':'static_source','result':'일반 저장 버튼은 form.requestSubmit으로 바로 POST /paper/update.donga를 제출한다. 폐기D이고 폼이 유효할 때만 별도 폐기 확인 모달을 연다. 이번 시험에서는R을 유지해 폐기를 실행하지 않았다.'},
  {'evidence':[1718,1719,1720,1721,1722,1723,1724,1725,1726],'result':'이름에 QA-PAPER-20261109 표시를 붙이고 시작 페이지를2→3으로 바꿔 실제 저장했다. 평가지가 수정되었습니다 성공 안내, 상세341(1095), 바뀐 이름과3~22 페이지를 확인했다. 수정 페이지 재진입에서도 값이 유지됐다. 네 문항과 순서, 초안, 교사용은 유지됐다. 확정 저장 작업21번이다.'},
  {'evidence':[1727,1728,1729,1730,1731,1732,1733],'result':'원래 이름과 시작 페이지2로 되돌려 다시 저장했다. 상세341(1096), 원래 이름,2~22 페이지, 초안, 교사용, 문항4개와 원래 순서를 확인했다. 확정 저장 작업22번이며 임시 필드 변경은 복원됐다. 새로운 저장 이력1095/1096이 남으므로 시스템 이력까지 되돌린 것은 아니다.'},
  {'evidence':[1723,1732],'result':'같은 평가지ID341에 새 상세ID가 부여되는 저장 동작을 실제 확인했다. 어떤 수정이 버전을 만들지, 이전 상세 버전을 어떻게 조회·복원하는지, 서비스 배포 버전과의 관계는 추가 검증이 필요하다. 전역 상세ID가 항상 연속이라는 일반 규칙으로 확대하지 않는다.'}
 ],'persistentChanges':{'confirmedMasterOperations':22,'newMasterChangesInThisPhase':2,'paperId':341,'currentDetailId':1096,'fieldRestorationConfirmed':True,'memberOrderUnchanged':True,'newDetailHistory':[1095,1096]},
 'remaining':['평가지 순서 변경과 세트 단위 추가의 실제 저장·복원, 페이지 순서 검증·사용 상태 및 배포가능 대상/이력을 추가 확인한다.','출처 필터/수정 충돌/상태 영향, HML·Definition·쌍둥이 및 랩의 앞선 미검증 분기를 이어간다.','출처와120문항 평가지 중간 영역의 픽셀 누락은 여전히 남아 있다.'],
 'resume':{'url':d['url'],'tab':'t21 research paper341 restored detail1096','targetId':'C06F56F8973F594BE8196DCB15B2DEBC','modal':None,'unsavedState':None},'evidenceLimits':['개발 Master CMS에서 허가된 조사 범위의 작업이다. 서비스 배포를 제출하지 않았다.','전체 기능 또는100%완료를 주장하지 않는다.']}
write('session-20261109-phase25.json',phase)
print(json.dumps({'paperId':341,'currentDetailId':1096,'confirmedMasterOperations':22,'restored':True,'phase':'session-20261109-phase25.json'}))
