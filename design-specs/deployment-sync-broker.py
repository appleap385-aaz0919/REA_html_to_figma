"""Retain Chrome connection; use public DOM, Scripter UI and Figma plugin API."""
import base64,json,sys,time
from pathlib import Path
import websocket

ROOT=Path(__file__).resolve().parent
port,endpoint=(Path.home()/'AppData/Local/Google/Chrome/User Data/DevToolsActivePort').read_text().splitlines()[:2]
ws=websocket.create_connection(f'ws://127.0.0.1:{port}{endpoint}',timeout=180,suppress_origin=True)
seq=0;main=None;plugin=None;responses={}
def protocol(method,params=None,session=None,timeout=30):
 global seq
 seq+=1;ident=seq;msg={'id':ident,'method':method,'params':params or {}}
 if session:msg['sessionId']=session
 ws.send(json.dumps(msg));end=time.monotonic()+timeout
 while time.monotonic()<end:
  ws.settimeout(max(.1,end-time.monotonic()));r=json.loads(ws.recv())
  if r.get('method')=='Target.receivedMessageFromTarget':
   nested=json.loads(r['params']['message'])
   if 'id' in nested:responses[nested['id']]=nested
  if r.get('id')==ident:
   if 'error' in r:raise RuntimeError(r['error'])
   return r.get('result',{})
 raise TimeoutError(method)
def targets():return protocol('Target.getTargets')['targetInfos']
def ensure_main():
 global main
 if main:return main
 t=next(t for t in targets() if t['type']=='page' and 'figma.com/design/xCjdhdFkSbToMiRVlXVN2V/' in t['url'])
 protocol('Target.activateTarget',{'targetId':t['targetId']})
 main=protocol('Target.attachToTarget',{'targetId':t['targetId'],'flatten':True})['sessionId']
 protocol('Emulation.setFocusEmulationEnabled',{'enabled':True},main)
 return main
def dom(expr):
 r=protocol('Runtime.evaluate',{'expression':expr,'returnByValue':True,'awaitPromise':True},ensure_main())
 if 'exceptionDetails' in r:raise RuntimeError(str(r['exceptionDetails'])[:600])
 return r.get('result',{}).get('value')
def ensure_plugin():
 global plugin
 if plugin:return plugin
 t=next(t for t in targets() if t['type']=='iframe' and t['url'].startswith('https://scripter.rsms.me/'))
 plugin=protocol('Target.attachToTarget',{'targetId':t['targetId'],'flatten':False},ensure_main())['sessionId']
 dom("(()=>{window.__deploymentBridge=[];window.addEventListener('message',e=>{if(e.data?.deploymentBridge)window.__deploymentBridge.push(e.data);});return true;})()")
 return plugin
def ui(expr):
 global seq
 sid=ensure_plugin();seq+=1;nested_id=100000+seq
 protocol('Target.sendMessageToTarget',{'sessionId':sid,'message':json.dumps({'id':nested_id,'method':'Runtime.evaluate','params':{'expression':expr,'returnByValue':True,'awaitPromise':True}})},ensure_main())
 for _ in range(100):
  if nested_id in responses:
   r=responses.pop(nested_id)
   if 'error' in r or 'exceptionDetails' in r.get('result',{}):raise RuntimeError(str(r)[:800])
   return r.get('result',{}).get('result',{}).get('value')
  protocol('Runtime.evaluate',{'expression':'0'},ensure_main());time.sleep(.04)
 raise TimeoutError('Scripter DOM response')
print('CONNECTED_READY',flush=True)
for line in sys.stdin:
 try:
  msg=json.loads(line);op=msg['op']
  if op=='observe':
   print(json.dumps({'figma':dom('({title:document.title,href:location.href})'),'scripter':ui('({models:monaco.editor.getModels().map(m=>String(m.uri)),run:!!document.querySelector(".button.run")})')},ensure_ascii=False),flush=True)
  elif op=='ui':print(json.dumps(ui(msg['expression']),ensure_ascii=False),flush=True)
  elif op=='focus':print(protocol('Emulation.setFocusEmulationEnabled',{'enabled':True},ensure_main()),flush=True)
  elif op=='targets':print(json.dumps([{'id':t['targetId'],'type':t['type'],'url':t['url']} for t in targets() if t['type']=='iframe' and 'scripter.rsms.me' in t['url']]),flush=True)
  elif op=='source':
   source='(/*SCRIPTER*/async function __scripter_script_main(){\n'+Path(msg['path']).read_text(encoding='utf-8')+'\n})()/*SCRIPTER*/'
   print(ui(r"(()=>{const m=monaco.editor.getModels().find(m=>/^file:\/\/\/scripter\.[^/]+\.tsx$/.test(String(m.uri)));if(!m)throw Error('No main model');m.setValue("+json.dumps(source)+");return m.getValue().length})()"),flush=True)
  elif op=='run':print(ui("(()=>{document.querySelector('.button.run').click();return 'RUN_CLICKED'})()"),flush=True)
  elif op=='output':
   value=ui('document.body.innerText');Path(msg['path']).write_text(value,encoding='utf-8');print('SAVED_OUTPUT '+str(len(value)),flush=True)
  elif op=='dom':print(json.dumps(dom(msg['expression']),ensure_ascii=False),flush=True)
  elif op=='screenshot':
   r=protocol('Page.captureScreenshot',{'format':'png','captureBeyondViewport':True},ensure_main());Path(msg['path']).write_bytes(base64.b64decode(r['data']));print('SAVED_SCREENSHOT',flush=True)
  elif op=='close':break
  print('COMMAND_DONE',flush=True)
 except Exception as e:print('COMMAND_ERROR '+str(e)[:900],flush=True)
try:
 if main:protocol('Emulation.setFocusEmulationEnabled',{'enabled':False},main)
except Exception:pass
ws.close()
