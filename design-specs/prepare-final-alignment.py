import json
from pathlib import Path
root=Path(__file__).resolve().parent
load=lambda p:json.loads(Path(p).read_text(encoding='utf-8'))
d=load(root/'revision-comment-plan.json');by={s['id']:s for s in d['screens']}
home=by['REV_HOME_01'];general=next(n for n in home['notes']if n['key']=='04');home['commonPolicy']=general['body'];home['notes'][0]['sourceStates']+=general['sourceStates'];home['notes'].remove(general)
hml=by['MST_HML_C02'];a=next(n for n in hml['notes']if n['key']=='03');b=next(n for n in hml['notes']if n['key']=='07');a['label']='등록 시작';a['body']+='\n'+b['body'];a['sourceStates']+=b['sourceStates'];hml['notes'].remove(b)
src=by['REV_SRC_DETAIL'];a=next(n for n in src['notes']if n['key']=='SRC_D07');b=next(n for n in src['notes']if n['key']=='SRC_D08');a['body']+='\n'+b['body'];a['sourceStates']+=b['sourceStates'];src['notes'].remove(b)
lab=by['REV_LAB_02'];a=next(n for n in lab['notes']if n['key']=='04');b=next(n for n in lab['notes']if n['key']=='REV_LAB_MATH');c=next(n for n in lab['notes']if n['key']=='REV_LAB_MATRIX');a['body']+='\n'+b['body'];a['sourceStates']+=b['sourceStates']+c['sourceStates'];a['anchor']={'x':1394,'y':805,'w':40,'h':60};lab['notes'].remove(b);lab['notes'].remove(c)
omr=by['REV_ITM_06'];ns=omr['notes'];ns[1]['label']='문항 형태 선택';ns[1]['body']='객관식·주관식·서술형을 먼저 선택하고 답형과 세부 유형을 차례로 선택합니다. 상위 선택에 따라 하위 선택지와 OMR 편집 폼이 바뀝니다. 유형별 실제 입력 폼은 오른쪽 비교 패널에서 확인하며, 유형 전환 상태와 최종 저장을 구분합니다.';ns[1]['anchor']={'x':314,'y':386.140625,'w':138.765625,'h':40}
ns[2]['label']='유형별 응답·정답 편집';ns[2]['body']='객관식 OBSACN·OBSAOX·OBMACN·OBMAOX는 단답/다답과 N지/OX 구성을 구분합니다. 주관식 SBSANM·SBSADR·SBSAAS·SBMANM·SBMAAS·SBMALD·SBMADD는 일반형·그리기·영역 선택·선 연결·드래그 구성을 제공합니다. 서술형 ESBA00·ESSA00·ESMA00은 기본·단답·다답 구성을 제공합니다. 대소·공백·쉼표 구분과 순서 설정은 해당 정답 트리 수준에 적용하며, 수동 채점 MANUAL/COMMENT와 자동 정답 VALUE 블록을 구분합니다.';ns[2]['anchor']={'x':804.328125,'y':488.140625,'w':182.640625,'h':24}
ns[3]['label']='답란·선택지 추가와 삭제';ns[3]['body']='추가·삭제로 해당 유형의 답란이나 선택지 구성을 편집하고 정답을 지정합니다. OBSACN은 선택지 2~7개와 단답 정답 1개를 사용합니다. 미선택·중복·빈 값 오류로 미리보기가 차단되는 경우가 있으며, 다른 유형에 같은 개수와 검증 규칙을 일괄 적용하지 않습니다.';ns[3]['anchor']={'x':804.328125,'y':877.140625,'w':94.21875,'h':32}
ns[4]['label']='답안 값 형식';ns[4]['body']='셀에서 허용하는 값 형식 메뉴와 수식 입력을 사용합니다. 저장된 value_type에 따라 수식과 일반 텍스트 위젯을 구분하며, 유형 변경 시 이전 값의 보존을 가정하지 않습니다.'
fixes=[]
for name in ['item','registration','paper-source']:
 for f in load(root/f'revision-{name}-anchor-fixes.json'):
  if f['screen']=='REV_ITM_01' or f['key']=='REV_LAB_MATRIX' or (f['screen']=='MST_HML_C04'and f['key']=='02'):continue
  screen=by[f['screen']];note=next((n for n in screen['notes']if n['key']==f['key']),None)
  if note:
   note['anchor']=f['anchor'];f['imageWidth']=screen['image']['width'];fixes.append(f)
for s in d['screens']:
 for i,n in enumerate(s['notes']):n['number']=i+1
 # Correct only links whose actual controls have an unambiguous destination.
 capture={'REV_PAP_LIST':('paper-list','/paper/detail.donga?'),'REV_SRC_LIST':('source-list','/product/detail.donga?'),'MST_TWN_C01':('twin-list','/item/twin/detail.donga?'),'MST_TWN_C02':('twin-detail','/item/all/detail.donga?')}.get(s['id'])
 if capture:
  geo=load(root/'revision-captures'/(capture[0]+'.json'));links=[c for c in geo['controls']if c['tag']=='A'and capture[1]in(c.get('href')or'')]
  if links:
   for f in s['flows']:
    if f['target']in ['REV_PAP_DETAIL','REV_SRC_DETAIL','MST_TWN_C02','REV_ITM_02']:f['anchor']=links[0]['box']
 if s['id']=='REV_SRC_DETAIL':
  for f in s['flows']:
   if f['label']=='수정':f['anchor']=next(n['anchor']for n in s['notes']if n['key']=='SRC_D10')
 if s['id']=='REV_ITM_01':s['flows'][0]['anchor']={'x':720,'y':615,'w':20,'h':20}
d['alignmentPass']={'fixedAnchors':len(fixes),'extraDuplicateNotesRemoved':4,'genericPolicyRowsReclassified':1}
(root/'revision-aligned-plan.json').write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
original=load(root/'revision-comment-plan.json')
payload={'screens':[s for s in d['screens']if s['id']in ['REV_HOME_01','REV_ITM_06','REV_LAB_02','MST_HML_C02','REV_SRC_DETAIL']], 'anchors':fixes,'flows':[{'id':s['id'],'flows':s['flows'],'oldFlows':next(x['flows']for x in original['screens']if x['id']==s['id']),'preserve':s['preserve'],'image':s['image']}for s in d['screens']if s['id']in ['REV_ITM_01','REV_PAP_LIST','REV_SRC_LIST','MST_TWN_C01','MST_TWN_C02','REV_SRC_DETAIL']]}
template=(root/'revision-final-alignment.template.js').read_text(encoding='utf-8');helpers=(root/'revision-comment-final.js').read_text(encoding='utf-8');helpers=helpers[helpers.index('const rgb='):helpers.index('const ix=')]
(root/'revision-final-alignment.js').write_text(template.replace('ALIGNMENT_DATA',json.dumps(payload,ensure_ascii=False)).replace('HELPERS',helpers),encoding='utf-8')
print(json.dumps(d['alignmentPass']))
