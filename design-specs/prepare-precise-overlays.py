import json,re
from pathlib import Path
root=Path(__file__).resolve().parent
load=lambda p:json.loads(Path(p).read_text(encoding='utf-8'))
plan=load(root/'revision-modal-plan.json');profiles={}
for name in ['item','registration','paper-source']:
 data=load(root/f'revision-{name}-precise-controls.json')
 if isinstance(data,dict):data=data.get('modals',data.get('modalAssets',data.get('items',[])))
 for m in data:profiles[m['modalId']]=m
out=[]
labels={'보존 DOM 상태':'기본 상태','보존 HTML 속성 기준 초기 선택 상태':'초기 선택 상태','vendor-saved':'편집기 저장 완료 안내','취소 / 임시저장 수정하기 / 검수완료 수정하기 / X 모두 온전함':'임시저장본 선택','정답 보기 꺼짐; 1~5 답란과 채점하기·닫기·X':'객관식 응답 · 정답 보기 꺼짐','임시 저장하시겠습니까?; 취소/임시 저장/X':'임시 저장 확인','저장하시겠습니까?; 취소/저장/X':'전체 반영 확인','저장하지 않고 이동하시겠습니까?; 취소/저장 하지 않고 이동/X':'미저장 변경 취소 확인','문단 설정 (pt); 모든 입력과 적용/취소':'문단 설정','겹칠 글자/모양/한 자리에 포개기/미리보기/취소/확인':'글자·모양 겹치기 설정','글상자 편집; 줄 정렬/내용/너비/높이/최소 높이/취소/적용':'글상자 본문·크기 편집','검색 결과와 취소/내용영역 추가':'내용영역 조회 결과','검색 결과와 취소/교과역량 추가':'교과역량 조회 결과','이해 선택; 검색 결과와 취소/행동영역 추가':'행동영역 조회·선택','https:// 기본값; 확인/취소':'이미지 URL 입력','키보드; 9 입력':'키보드 모드'}
for s in plan['screens']:
 for m in s['modals']:
  p=profiles.get(m['id']);vs=[]
  if not p:raise ValueError('Missing precise controls '+m['id'])
  if m['id']=='REV_LAB_MATH':p={**p,'variants':p['variants'][:2]}
  if len(p['variants'])!=len(m['ui']['variants']):raise ValueError((m['id'],len(p['variants']),len(m['ui']['variants'])))
  for v,pv in zip(m['ui']['variants'],p['variants']):
   cs=[]
   for c in pv['controls']:
    b=c.get('box',c.get('bbox'));b={'x':b['x'],'y':b['y'],'w':b.get('w',b.get('width')),'h':b.get('h',b.get('height'))}
    label=re.sub('[\ue000-\uf8ff]','',c['label']).strip();cs.append({'label':label,'kind':c['kind'],'box':b,'body':c.get('body')or c.get('description')or ''})
   vs.append({'label':labels.get(v['label'],v['label']),'provenance':v['provenance'],'width':v['crop']['w'],'height':v['crop']['h'],'controls':cs})
  if m['id']=='REV_ITM_PRODUCT':
   vs[0]['controls']=[{'label':a,'kind':k,'body':body,'box':{'x':x,'y':y,'w':w,'h':h}}for a,k,body,x,y,w,h in [
    ('현재 출처 / 출처 추가','tab','현재 연결 목록과 추가 후보 검색 화면을 전환합니다.',25,80,244,40),
    ('페이지','fields','현재 연결의 페이지를 입력합니다. 행의 수정 버튼으로 값을 저장합니다.',687,190,90,32),
    ('문항 번호','fields','연결된 출처 안의 문항 번호를 입력합니다.',802,190,111,32),
    ('수정','button','해당 행의 페이지·문항 번호를 수정합니다.',946,190,49,32),
    ('해제','button','해당 연결을 해제합니다. 마지막 출처 연결의 해제는 차단됩니다.',1001,190,65,32),
    ('닫기','button','현재 창을 닫습니다. 상단 X도 닫기 기능입니다.',1053,302,61,40)]]
  out.append({'screen':s['id'],'modalId':m['id'],'title':m['title'],'body':m['body'],'variants':vs})
source=(root/'revision-precise-overlays.template.js').read_text(encoding='utf-8');h=(root/'revision-comment-final.js').read_text(encoding='utf-8');h=h[h.index('const rgb='):h.index('const ix=')]
(root/'revision-precise-overlay-plan.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'revision-precise-overlays.js').write_text(source.replace('PRECISE_DATA',json.dumps(out,ensure_ascii=False)).replace('HELPERS',h),encoding='utf-8')
print(json.dumps({'components':len(out),'variants':sum(len(r['variants'])for r in out),'controls':sum(len(v['controls'])for r in out for v in r['variants'])}))
