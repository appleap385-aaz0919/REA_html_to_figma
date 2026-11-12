import json,time
from pathlib import Path
import websocket
root=Path(__file__).resolve().parent;cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'))
ws=websocket.create_connection(cfg['cdp'],timeout=5,suppress_origin=True);seq=0
def call(method,params=None,session=None,timeout=5):
 global seq
 seq+=1;message={'id':seq,'method':method,'params':params or {}}
 if session:message['sessionId']=session
 ws.send(json.dumps(message));end=time.monotonic()+timeout
 while time.monotonic()<end:
  ws.settimeout(max(.1,end-time.monotonic()));r=json.loads(ws.recv())
  if r.get('id')==seq:
   if 'error'in r:raise RuntimeError(r['error'])
   return r.get('result',{})
 raise TimeoutError(method)
targets=call('Target.getTargets')['targetInfos'];target=next(t for t in targets if t['type']=='page'and 'figma.com/design/xCjdhdFkSbToMiRVlXVN2V/'in t['url'])
session=call('Target.attachToTarget',{'targetId':target['targetId'],'flatten':True})['sessionId']
try:
 result=call('Runtime.evaluate',{'expression':'({ready:document.readyState,focus:document.hasFocus(),online:navigator.onLine,title:document.title})','returnByValue':True},session,3)
 print('Main document',result.get('result',{}).get('value'),flush=True)
except (TimeoutError,websocket.WebSocketTimeoutException):
 print('Interrupting the unresponsive input execution in the Figma page.',flush=True)
 print(call('Runtime.terminateExecution',{},session,8),flush=True)
call('Target.detachFromTarget',{'sessionId':session});ws.close()
