import json,base64,hashlib,copy,re
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent;workspace=root.parent
plans=['revision-item-home-lab-plan.json','revision-registration-twin-plan.json','revision-paper-source-plan.json']
screens=[s for fn in plans for s in json.loads((root/fn).read_text(encoding='utf-8'))['screens']]
byid={s['id']:s for s in screens}
aliases={}
for fn in ['item','hml','definition','twin','home','paper','source','lab']:
 for g in json.loads((root/f'{fn}-storyboard-states.json').read_text(encoding='utf-8'))['screens']:
  for i,state in enumerate(g['states']):
   if state.get('id'):aliases[state['id']]=g['id']+'_'+str(i+1).zfill(2)
for s in screens:
 for n in s['notes']+s['modals']:n['sourceStates']=[aliases.get(x,x)for x in n.get('sourceStates',[])]
# A related-item view is the same item detail, not a new screen in the twin menu.
related=byid.pop('MST_TWN_C03');detail=byid['REV_ITM_02']
for n in related['notes']:
 n['key']='T'+n['key'];detail['notes'].append(n)
for m in related['modals']:
 m['triggerKey']='T'+m['triggerKey'];detail['modals'].append(m)
detail['mergedScreens']+=related['mergedScreens'];screens.remove(related)
capture={
'REV_HOME_01':'home','REV_ITM_02':'item-detail','REV_ITM_03':'item-meta','REV_ITM_04':'item-hml','REV_ITM_05':'item-html','REV_ITM_06':'item-omr',
'REV_LAB_01':'lab-index','REV_LAB_02':'lab-math','REV_LAB_03':'lab-omr','REV_LAB_04':'lab-restore','REV_LAB_05':'lab-frame',
'MST_HML_C01':'hml-list','MST_HML_C02':'hml-form','MST_HML_C03':'hml-review','MST_HML_C04':'hml-detail',
'MST_DIFI_C01':'difi-list','MST_DIFI_C02':'difi-form','MST_DIFI_C03':'difi-review','MST_DIFI_C04':'difi-detail',
'MST_TWN_C01':'twin-list','MST_TWN_C02':'twin-detail',
'REV_PAP_LIST':'paper-list','REV_PAP_DETAIL':'paper-detail','REV_PAP_EDIT':'paper-edit',
'REV_SRC_LIST':'source-list','REV_SRC_FORM':'source-form','REV_SRC_DETAIL':'source-detail','REV_SRC_EDIT':'source-edit'}
pages={'홈·공통 메뉴':'00 홈 · 공통 기능','문항 관리 · 전체 문항':'01 문항 관리 · 전체 문항','HML 문항 등록':'02 문항 관리 · HML 문항 등록','디피니션 문항 등록':'03 문항 관리 · 디피니션 문항 등록','쌍둥이 그룹 관리':'04 문항 관리 · 쌍둥이 그룹','평가지 관리':'05 평가지 관리','문항 출처 관리':'06 문항 출처 관리','랩':'07 랩'}
def page_for(s):
 for k,v in pages.items():
  if k in s['menu']:return v
 if '홈' in s['menu']:return pages['홈·공통 메뉴']
 raise ValueError(s['menu'])
geos={k:json.loads((root/'revision-captures'/f'{v}.json').read_text(encoding='utf-8')) for k,v in capture.items()}
def point(x,y,w=20,h=20):return {'x':x,'y':y,'w':w,'h':h}
def find(sid,text=None,id=None,tag=None,index=0,fallback=None):
 cs=geos.get(sid,{}).get('controls',[])
 if id:cs=[c for c in cs if c['id']==id or c['name']==id]
 if tag:cs=[c for c in cs if c['tag']==tag]
 if text:
  exact=[c for c in cs if c['text']==text]
  cs=exact or [c for c in cs if text in c['text']]
 if len(cs)>index:return cs[index]['box']
 return fallback or point(320,160)
def text_anchor(sid,text,tag=None,index=0):return find(sid,text=text,tag=tag,index=index)
def id_anchor(sid,id):return find(sid,id=id)
anchors={
'REV_HOME_01':[point(900,220),point(110,180),point(1720,28),point(800,400)],
'REV_ITM_02':[point(295,250),point(1050,336),text_anchor('REV_ITM_02','OMR 미리보기'),text_anchor('REV_ITM_02','수정','BUTTON'),point(1187,1768),text_anchor('REV_ITM_02','문항 수정'),point(1187,1848),text_anchor('REV_ITM_02','쌍둥이 문항 생성'),text_anchor('REV_ITM_02','쌍둥이 문항 생성'),text_anchor('REV_ITM_02','쌍둥이 문항 생성'),text_anchor('REV_ITM_02','쌍둥이 생성 이력'),point(1370,1565)],
'REV_ITM_03':[text_anchor('REV_ITM_03','메타정보 수정','A'),text_anchor('REV_ITM_03','기본 메타 정보','H3'),text_anchor('REV_ITM_03','학습 · 매핑 정보','H3'),text_anchor('REV_ITM_03','임시 저장','BUTTON')],
'REV_ITM_04':[text_anchor('REV_ITM_04','한글 편집기 열기'),point(1049,465)],
'REV_ITM_05':[text_anchor('REV_ITM_05','문항 형태'),text_anchor('REV_ITM_05','문항 편집','H3'),text_anchor('REV_ITM_05','+ 수식')],
'REV_ITM_06':[text_anchor('REV_ITM_06','OMR 수정','A'),text_anchor('REV_ITM_06','문항 형태'),point(805,585),point(805,725),point(1630,585),text_anchor('REV_ITM_06','OMR 미리보기')],
'REV_ITM_07':[point(195,20),point(45,20),point(378,20)],
'MST_HML_C01':[point(293,170),point(293,425),text_anchor('MST_HML_C01','HML 등록')],
'MST_DIFI_C01':[point(293,170),point(293,425),text_anchor('MST_DIFI_C01','ZIP 등록')],
'MST_HML_C02':[text_anchor('MST_HML_C02','HML 파일 업로드'),point(295,600),text_anchor('MST_HML_C02','등록 시작'),find('MST_HML_C02',text='조회',index=0),find('MST_HML_C02',text='조회',index=1),text_anchor('MST_HML_C02','취소'),text_anchor('MST_HML_C02','등록 시작')],
'MST_DIFI_C02':[point(293,170),point(293,300),point(295,600),find('MST_DIFI_C02',text='조회',index=0),find('MST_DIFI_C02',text='조회',index=1),text_anchor('MST_DIFI_C02','취소'),text_anchor('MST_DIFI_C02','등록 시작')],
'MST_HML_C03':[point(293,621),point(1036,235),text_anchor('MST_HML_C03','승인'),text_anchor('MST_HML_C03','폐기')],
'MST_DIFI_C03':[point(293,621),text_anchor('MST_DIFI_C03','승인'),point(293,707),text_anchor('MST_DIFI_C03','폐기')],
'MST_HML_C04':[point(293,170),point(1036,235),text_anchor('MST_HML_C04','문항 상세'),point(293,115)],
'MST_DIFI_C04':[point(293,170),point(293,621),point(293,750),text_anchor('MST_DIFI_C04','문항 상세'),point(293,275)],
'MST_TWN_C01':[point(290,170),point(800,1000)],
'MST_TWN_C02':[point(293,170),point(400,425)],
'REV_PAP_LIST':[point(293,170),point(800,170),point(293,280),text_anchor('REV_PAP_LIST','조회'),point(293,375),point(293,430),point(600,480),point(1250,1070)],
'REV_PAP_DETAIL':[point(414,240),point(414,283),point(414,325),point(1150,235),point(1150,275),point(293,600),text_anchor('REV_PAP_DETAIL','배포하기'),point(293,790),text_anchor('REV_PAP_DETAIL','목록'),text_anchor('REV_PAP_DETAIL','수정')],
'REV_PAP_EDIT':[id_anchor('REV_PAP_EDIT','paperName'),id_anchor('REV_PAP_EDIT','viewFlag'),id_anchor('REV_PAP_EDIT','startPageNum'),id_anchor('REV_PAP_EDIT','serviceUsage'),point(414,430),point(293,600),point(305,645),text_anchor('REV_PAP_EDIT','문항 추가'),text_anchor('REV_PAP_EDIT','제외'),text_anchor('REV_PAP_EDIT','취소'),text_anchor('REV_PAP_EDIT','저장')],
'REV_SRC_LIST':[point(293,170),point(800,170),point(293,280),text_anchor('REV_SRC_LIST','조회'),point(293,385),point(300,440),point(1250,1080),text_anchor('REV_SRC_LIST','등록')],
'REV_SRC_FORM':[id_anchor('REV_SRC_FORM','curriculumSelect'),id_anchor('REV_SRC_FORM','classTypeSelect'),id_anchor('REV_SRC_FORM','subjectCategorySelect'),id_anchor('REV_SRC_FORM','productCategorySelect'),id_anchor('REV_SRC_FORM','publishYear'),point(293,347),id_anchor('REV_SRC_FORM','viewName'),id_anchor('REV_SRC_FORM','serviceUsage'),id_anchor('REV_SRC_FORM','useFlag'),point(293,585),text_anchor('REV_SRC_FORM','저장'),text_anchor('REV_SRC_FORM','취소')],
'REV_SRC_DETAIL':[point(293,235),point(293,347),point(293,431),point(1390,431),point(293,585),point(293,825),point(1268,825),point(1268,825),text_anchor('REV_SRC_DETAIL','목록'),text_anchor('REV_SRC_DETAIL','수정')],
'REV_SRC_EDIT':[point(293,263),point(293,347),id_anchor('REV_SRC_EDIT','viewName'),id_anchor('REV_SRC_EDIT','serviceUsage'),id_anchor('REV_SRC_EDIT','useFlagSelect'),point(293,585),point(1268,825),text_anchor('REV_SRC_EDIT','저장'),text_anchor('REV_SRC_EDIT','취소')],
'REV_LAB_01':[point(293,173),point(293,590),point(293,288)],
'REV_LAB_02':[point(606,200),point(606,720),id_anchor('REV_LAB_02','loadBtn'),point(800,820)],
'REV_LAB_03':[point(293,160),point(1600,160),point(760,300),point(293,2400),point(293,2800)],
'REV_LAB_04':[id_anchor('REV_LAB_04','omrTypeSel'),id_anchor('REV_LAB_04','omrRestoreBtn'),point(776,487),id_anchor('REV_LAB_04','omrClearFormBtn')],
'REV_LAB_05':[point(293,245),text_anchor('REV_LAB_05','save()'),point(293,1296)]}
assets={}
def asset(path):
 p=Path(path);p=p if p.is_absolute() else workspace/p
 raw=p.read_bytes();key=hashlib.sha256(raw).hexdigest();assets[key]=base64.b64encode(raw).decode();w,h=Image.open(p).size
 return {'key':key,'width':w,'height':h,'path':str(p.relative_to(workspace)).replace('\\','/')}
def modal_origin(s,m,default):
 sid=s['id'];mid=m['id'];title=m['title']
 if sid=='REV_ITM_03':
  for token,i in [('UNIT',0),('ACHIEVEMENT',1),('DOMAIN',2),('COMPETENCY',3),('BEHAVIOR',4)]:
   if token in mid:return find(sid,text='추가',tag='BUTTON',index=i)
  if 'TEMP' in mid:return find(sid,text='임시 저장',tag='BUTTON')
  if 'APPLY' in mid:return find(sid,text='전체 반영',tag='BUTTON')
  if 'CANCEL' in mid:return find(sid,text='취소',tag='A')
 if sid=='REV_ITM_05':
  for token,label in [('PARAGRAPH','문단'),('MATH','+ 수식'),('IMAGE_URL','🖼 이미지'),('SYMBOL','특수문자'),('OVERLAP','글자 겹치기'),('TEXTBOX','글상자')]:
   if token in mid:return find(sid,text=label,tag='BUTTON')
 if sid=='REV_ITM_02':
  if 'OMR' in mid:return find(sid,text='OMR 미리보기')
  if 'GENERATE' in mid:return find(sid,text='쌍둥이 문항 생성')
  if 'HISTORY' in mid:return find(sid,text='쌍둥이 생성 이력')
  if 'CURRENT_ADD' in mid:return find(sid,text='목록 조회',index=2)
  if 'PRODUCT' in mid:return find(sid,text='목록 조회',index=0)
  if 'PAPERS' in mid:return find(sid,text='목록 조회',index=1)
  if 'DEPLOY' in mid:return find(sid,text='배포하기')
  if 'DRAFT' in mid:return find(sid,text='문항 수정')
  return find(sid,text='수정',tag='BUTTON')
 if sid=='REV_LAB_01':
  for token,label in [('BUNDLE','외부 번들 버전'),('CACHE','캐시 reload'),('SESSION','역할별 로그아웃')]:
   if token in mid:return find(sid,text=label,tag='BUTTON')
 if 'CANCEL' in mid:return find(sid,text='취소',tag='A')
 return default
for order,s in enumerate(screens):
 s['page']=page_for(s);s['order']=order;s['preserve']=s['id']=='REV_ITM_01'
 if s['id'] in capture:
  name=capture[s['id']];s['image']=asset(root/'revision-captures'/f'{name}.png');s['geometry']=f'revision-captures/{name}.json';s['captureLabel']='保' if geos[s['id']].get('provenance') else '実'
 elif s['id']=='REV_ITM_07':s['image']=asset(s['screenshot']);s['captureLabel']='既'
 else:s['image']=None
 coords=anchors.get(s['id'],[])
 for i,n in enumerate(s['notes']):n['anchor']=coords[i] if i<len(coords) else point(300,170+i*40)
 # Same dialog with validation/confirmation variants remains one dialog.
 merged=[]
 for m in s.get('modals',[]):
  match=next((x for x in merged if x['title']==m['title']),None)
  if match:
   match['body']+='\n'+m['body'];match['sourceStates']+=m.get('sourceStates',[])
   for field in ['fields','buttons']:match[field]=list(dict.fromkeys(match[field]+m.get(field,[])))
  else:merged.append(copy.deepcopy(m))
 s['modals']=merged
 for m in merged:
  note=next(n for n in s['notes'] if n['key']==m['triggerKey']);m['anchor']=modal_origin(s,m,note['anchor'])
  m['noteNumber']=len(s['notes'])+1
  s['notes'].append({'key':m['id'],'label':m['title']+' 열기','body':'해당 버튼으로 오른쪽의 '+m['title']+' 창을 엽니다. '+m['body'],'sourceStates':[],'anchor':m['anchor']})
  quotes=re.findall('[‘“]([^’”]{6,180})[’”]',m['body'])
  m['message']=next((q for q in quotes if '하시겠습니까' in q),quotes[0]if quotes else '')
  if m['title'] in ['시험지 승인','시험지 폐기']:
   action='승인'if '승인'in m['title']else'폐기'
   m['fields']=[];m['buttons']=['닫기','취소',action]
  actual=None
  if 'OMR' in m['id'] and 'PREVIEW' in m['id']:actual='modal-omr-preview'
  if m['id']=='REV_ITM_DETAIL_OMR':actual='modal-omr-preview'
  if m['id']=='REV_PAP_ADD':actual='modal-paper-add'
  if m['id']=='REV_ITM_HTML_MATH':actual='modal-math'
  if actual:
   geo=json.loads((root/'revision-captures'/f'{actual}.json').read_text(encoding='utf-8'));dialogs=[d for d in geo['modals'] if 100<d['box']['w']<1600]
   if dialogs:m['actual']={'image':asset(root/'revision-captures'/f'{actual}.png'),'crop':min(dialogs,key=lambda d:d['box']['w'])['box'],'controls':geo['controls']}
 # Korean provenance labels.
 s['captureLabel']={'保':'보존 DOM을 읽기 전용으로 재현','実':'전체 페이지 재캡처','既':'기존 편집기 전체 창 캡처'}.get(s.get('captureLabel'),'승인된 원형 유지')
 s['flows']=[]
variants=root/'revision-omr-variants.json'
if variants.exists():
 byid['REV_ITM_06']['variants']=[]
 for v in json.loads(variants.read_text(encoding='utf-8')):
  v['image']=asset(root/'revision-captures'/(v['capture']+'.png'));byid['REV_ITM_06']['variants'].append(v)
def flow(src,label,dst,origin=None,detail='클릭'):
 byid[src]['flows'].append({'label':label,'target':dst,'anchor':origin or find(src,text=label),'action':detail})
flow('REV_ITM_01','문제 링크','REV_ITM_02',point(850,570),'문제 클릭 → 문항 상세')
flow('REV_ITM_02','문항 수정','REV_ITM_03')
for src in ['REV_ITM_03','REV_ITM_04','REV_ITM_05','REV_ITM_06']:
 for label,target in [('메타정보 수정','REV_ITM_03'),('한글(HML) 수정','REV_ITM_04'),('HTML 수정','REV_ITM_05'),('OMR 수정','REV_ITM_06')]:
  if src!=target:flow(src,label,target,find(src,text=label,tag='A'))
flow('REV_ITM_04','한글 편집기 열기','REV_ITM_07')
flow('REV_ITM_07','저장','REV_ITM_04',point(378,20),'편집기 저장 후 부모 HML 탭에서 반영')
for pre in ['MST_HML','MST_DIFI']:
 flow(pre+'_C01','HML 등록' if pre=='MST_HML' else 'ZIP 등록',pre+'_C02')
 candidates=[x for x in geos[pre+'_C01']['controls'] if x['tag']=='A' and '/detail.donga?' in (x['href']or'')]
 flow(pre+'_C01','파일명',pre+'_C04',candidates[0]['box'],'파일명 클릭 → 해당 상태의 상세')
 flow(pre+'_C02','등록 시작',pre+'_C03',detail='파일·필수값 정상 등록 → 처리 후 초안 검수')
 flow(pre+'_C03','승인',pre+'_C04',detail='검사 통과 → 승인 확인 → 처리 결과')
 flow(pre+'_C04','문항 상세','REV_ITM_02')
flow('MST_TWN_C01','문제 링크','MST_TWN_C02',point(850,310))
flow('MST_TWN_C02','문제 링크','REV_ITM_02',point(850,425))
flow('REV_PAP_LIST','평가지명','REV_PAP_DETAIL',point(650,480))
flow('REV_PAP_DETAIL','수정','REV_PAP_EDIT')
flow('REV_PAP_EDIT','저장','REV_PAP_DETAIL',detail='정상 저장 → 상세 재조회')
flow('REV_SRC_LIST','등록','REV_SRC_FORM')
flow('REV_SRC_LIST','출처코드·출처명','REV_SRC_DETAIL',point(650,480))
flow('REV_SRC_FORM','저장','REV_SRC_DETAIL',detail='필수값·중복 검사 통과 → 상세')
flow('REV_SRC_DETAIL','수정','REV_SRC_EDIT')
flow('REV_SRC_EDIT','저장','REV_SRC_DETAIL',detail='영향 확인이 있으면 확인 후 저장 → 상세')
for label,target in [('수식 입력기 데모','REV_LAB_02'),('OMR 전체 유형','REV_LAB_03'),('OMR 복원 테스트','REV_LAB_04'),('편집기 격리 테스트','REV_LAB_05')]:flow('REV_LAB_01',label,target)
for label,target in [('전체 문항','REV_ITM_01'),('평가지 관리','REV_PAP_LIST'),('문항 출처 관리','REV_SRC_LIST'),('랩','REV_LAB_01')]:flow('REV_HOME_01',label,target,point(100,180+list(['전체 문항','평가지 관리','문항 출처 관리','랩']).index(label)*50))
# Persist one complete migration/coverage plan independently of the design file.
expected=[]
for fn in ['item','hml','definition','twin','home','paper','source','lab']:
 for g in json.loads((root/f'{fn}-storyboard-states.json').read_text(encoding='utf-8'))['screens']:
  expected += [g['id']+'_'+str(i+1).zfill(2) for i in range(len(g['states']))]
mapped=[i for s in screens for group in [s['notes'],s['modals']] for n in group for i in n.get('sourceStates',[])]
missing=set(expected)-set(mapped)
if missing:raise ValueError('Unmapped states '+str(missing))
manifest={'screenCount':len(screens),'modalCount':sum(len(s['modals']) for s in screens),'oldStateCount':len(expected),'oldStatesMapped':len(set(mapped)&set(expected)),'pages':sorted(set(s['page']for s in screens)),'screens':screens}
(root/'revision-consolidated-plan.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
runtime=(root/'revision-runtime.js').read_text(encoding='utf-8')
chunks=[];chunk=[];size=0;sent=set()
for s in screens:
 keys=[s['image']['key']]if s['image']else[]
 keys += [m['actual']['image']['key']for m in s['modals']if m.get('actual')]
 keys += [v['image']['key']for v in s.get('variants',[])]
 fresh=[k for k in keys if k not in sent];est=sum(len(assets[k])for k in fresh)
 if chunk and size+est>2800000:chunks.append(chunk);chunk=[];size=0
 item=copy.deepcopy(s);item['assets']={k:assets[k]for k in fresh};sent.update(fresh);size+=est;chunk.append(item)
if chunk:chunks.append(chunk)
out=root/'revision-batches';out.mkdir(exist_ok=True)
for i,chunk in enumerate(chunks):
 code='const BATCH='+str(900+i)+';\nconst INPUT='+json.dumps(chunk,ensure_ascii=False)+';\n'+runtime
 (out/f'batch-{900+i}.js').write_text(code,encoding='utf-8')
print(json.dumps({'screens':len(screens),'dialogs':manifest['modalCount'],'oldStatesMapped':len(set(mapped)&set(expected)),'batches':len(chunks),'notes':sum(len(s['notes'])for s in screens)}))
