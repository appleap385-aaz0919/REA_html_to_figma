import json,base64,hashlib,copy
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent;workspace=root.parent
load=lambda p:json.loads(Path(p).read_text(encoding='utf-8'))
plan=load(root/'revision-comment-plan.json');assets={};mapped={}
def normalize(path,crop=None,label='',provenance='actual-ui-capture',controls=None):
 p=Path(path);p=p if p.is_absolute()else workspace/p
 w,h=Image.open(p).size;raw=p.read_bytes();key=hashlib.sha256(raw).hexdigest();assets[key]=base64.b64encode(raw).decode()
 c=crop or {'x':0,'y':0,'width':w,'height':h};c={'x':c['x'],'y':c['y'],'w':c.get('w',c.get('width')),'h':c.get('h',c.get('height'))}
 if c['x']<0 or c['y']<0 or c['x']+c['w']>w+2 or c['y']+c['h']>h+2:raise ValueError((str(p),c,w,h))
 return {'image':{'key':key,'width':w,'height':h,'path':str(p)},'crop':c,'label':label,'provenance':provenance,'controls':controls or []}
items=load(root/'revision-item-modal-assets.json')
for a in items['modalAssets']:
 vs=[]
 entries=[{'primary':a['primary'],'state':a['primary'].get('state')}]+a.get('variants',[])
 for e in entries:
  p=e.get('primary',e)
  if not p.get('complete',False):continue
  vs.append(normalize(p['imagePath'],p['crop'],e.get('state')or p.get('state')or '기본 상태',p.get('provenance','actual-ui-capture'),p.get('controls')))
 if not vs:raise ValueError('No complete asset '+a['modalId'])
 mapped[a['modalId']]={'kind':a['componentKind'],'variants':vs}
reg=load(root/'revision-registration-modal-assets.json');rendered={r['id']:r for r in reg['renderedCaptures']}
for m in reg['modals']:
 vs=[]
 for v in m['variants']:
  captures=[reg['captures'][n]for n in v['captures']if reg['captures'][n].get('fullDialogVisible')]
  if v['id']=='empty-history':continue
  label=v.get('tabLabel')or v['id']
  labels={'single-save':'단건 저장','set-save':'세트 상태 저장','single-discard':'단건 폐기','set-discard':'세트 전체 폐기','source-lookup':'출처 조회','unit-lookup':'단원 조회','cancel-registration':'등록 취소','unjudged-block':'미검수 문항 안내','paper-required-block':'평가지 정보 누락','approve-confirm':'승인 확인','reason-required':'폐기 사유 누락','discard-confirm':'폐기 확인','draft-choice':'임시저장본 선택','all-delete-block':'전체 폐기 상태 안내'}
  labels.update({'unjudged':'미검수 문항 안내','paper-required':'평가지 정보 누락','copy-single':'단건 · 복제 선택','ai-single':'단건 · AI 생성 선택','copy-set':'세트 · 복제 선택','single-history':'단건 생성 이력','set-history':'세트 생성 이력'})
  label=labels.get(label,label)
  if v['id']=='current-single':label='단건 · 현재 쌍둥이'
  if v['id']=='current-set':label='세트 · 현재 쌍둥이'
  if captures:
   a=captures[0];vs.append(normalize(a['path'],a['crop'],label,'actual-ui-capture'))
  elif v.get('renderCapture'):
   a=rendered[v['renderCapture']];geo=load(workspace/a['bboxJson']);vs.append(normalize(a['capture'],a['bbox'],label,'preserved-dom-readonly',geo['elements']))
 if vs:mapped[m['modalId']]={'kind':'bootstrap-modal','variants':vs}
# The supplied user example preserves the populated current-source row and its
# editable page/item-number inputs, modify and detach actions.
user=Path('C:/Users/JAEHYU~1.MYU/AppData/Local/Temp/orca-paste-1794383680873-364a9673-eb38-4913-989e-35cdc78213fd.png')
if user.exists():
 existing=mapped['REV_ITM_PRODUCT']['variants'];add=next(v for v in existing if '추가'in v['label'])
 mapped['REV_ITM_PRODUCT']['variants']=[normalize(user,{'x':8,'y':8,'width':1139,'height':361},'현재 출처','user-supplied-actual-ui'),add]
paper=load(root/'revision-paper-source-modal-assets.json')
for a in paper['modalAssets']:
 if a.get('screenshot'):
  c=a['crop'];v=normalize(a['screenshot'],c,'기본 상태','actual-ui-capture')
 else:
  geo=load(workspace/a['preservedDomRenderJson']);c=geo['crop'].get('box',geo['crop']);v=normalize(geo['screenshot'],c,'기본 상태','preserved-dom-readonly',geo.get('visibleElements')or geo.get('controls',[]))
 mapped[a['modalId']]={'kind':'bootstrap-modal','variants':[v]}
# A duplicated screenshot for the same tab/state does not create a new panel.
for data in mapped.values():
 seen=set();out=[]
 for v in data['variants']:
  k=(v['image']['key'],tuple(v['crop'].values()))
  if k not in seen:seen.add(k);out.append(v)
 data['variants']=out
missing=[]
for s in plan['screens']:
 for m in s['modals']:
  if m['id']not in mapped:missing.append(m['id']);continue
  m['ui']=mapped[m['id']]
if missing:raise ValueError(missing)
manifest={'screens':plan['screens'],'assets':assets,'comments':plan['commentRevision']}
(root/'revision-modal-plan.json').write_text(json.dumps({**manifest,'assets':{k:len(v)for k,v in assets.items()}},ensure_ascii=False,indent=2),encoding='utf-8')
template=(root/'revision-comment-modal.template.js').read_text(encoding='utf-8')
(root/'revision-comment-modal.js').write_text(template.replace('INPUT_DATA',json.dumps(manifest,ensure_ascii=False)),encoding='utf-8')
print(json.dumps({'modals':sum(len(s['modals'])for s in plan['screens']),'variants':sum(len(m['ui']['variants'])for s in plan['screens']for m in s['modals']),'images':len(assets),'base64Bytes':sum(len(s)for s in assets.values())}))
