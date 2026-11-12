"""Capture only the already authorized CMS target over its existing CDP connection."""
import argparse,base64,json,re,time
from datetime import datetime,timezone
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
import websocket

p=argparse.ArgumentParser();p.add_argument('label');p.add_argument('--item-id',required=True);a=p.parse_args()
if not re.fullmatch(r'\d{3,5}-[a-z0-9-]+',a.label):raise SystemExit('Invalid evidence label')
root=Path(__file__).resolve().parent;config=json.loads((root/'agent-browser-session.json').read_text(encoding='utf-8'));out=root/'evidence'/a.label
if out.with_suffix('.json').exists() or out.with_suffix('.png').exists():raise SystemExit('Evidence already exists; no CDP call sent')
record={'schemaVersion':1,'controller':'scoped-direct-CDP-screenshot','label':a.label,'targetId':config['cmsTargetId'],'startedUtc':datetime.now(timezone.utc).isoformat(),'nativeInputUsed':False,'activatedTab':False}
ws=None;seq=0
def call(method,params=None,session=None):
 global seq
 seq+=1;mid=seq;msg={'id':mid,'method':method,'params':params or {}}
 if session:msg['sessionId']=session
 ws.send(json.dumps(msg))
 deadline=time.monotonic()+20
 while time.monotonic()<deadline:
  value=json.loads(ws.recv())
  if value.get('id')==mid:
   if 'error' in value:raise RuntimeError(str(value['error']))
   return value.get('result',{})
 raise TimeoutError(method+' response timeout')
try:
 ws=websocket.create_connection(config['cdp'],timeout=45,suppress_origin=True)
 info=call('Target.getTargetInfo',{'targetId':config['cmsTargetId']})['targetInfo'];u=urlsplit(info['url'])
 if u.hostname!=config['scopeHost'] or u.path!='/item/all/detail.donga' or parse_qs(u.query).get('itemId')!=[a.item_id]:raise RuntimeError('Unexpected scoped target URL')
 session=call('Target.attachToTarget',{'targetId':config['cmsTargetId'],'flatten':True})['sessionId']
 state=call('Runtime.evaluate',{'expression':'(()=>{const p=document.querySelector(".page-wrapper");return {url:location.href,visibility:document.visibilityState,title:document.title,scroller:{top:p.scrollTop,height:p.clientHeight,total:p.scrollHeight},images:[...p.querySelectorAll("img")].map(e=>({loaded:e.complete&&e.naturalWidth>0,width:e.naturalWidth,height:e.naturalHeight})),visibleModals:[...document.querySelectorAll(".modal.show")].map(e=>e.id)};})()','returnByValue':True},session)
 if state.get('exceptionDetails'):raise RuntimeError('Scoped page state evaluation failed')
 record['state']=state['result']['value'];capture=call('Page.captureScreenshot',{'format':'png','fromSurface':True,'captureBeyondViewport':False},session)
 data=base64.b64decode(capture['data']);out.with_suffix('.png').write_bytes(data);record.update(status='captured',imageFile=out.with_suffix('.png').name,imageBytes=len(data))
except Exception as err:
 record.update(status='capture_failed',error=str(err))
finally:
 if ws:ws.close()
 out.with_suffix('.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in record.items() if k not in {'state'}},ensure_ascii=False))
if record['status']!='captured':raise SystemExit(1)
