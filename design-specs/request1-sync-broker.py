"""A single retained browser connection. Only public DOM and root-page input."""
import base64,json,re,sys,time
from pathlib import Path
import websocket
root=Path(__file__).resolve().parent;cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'))
print('Awaiting Chrome approval; this process will retain the approved socket.',flush=True)
ws=websocket.create_connection(cfg['cdp'],timeout=180,suppress_origin=True)
seq=0;main=None;events=[]
print('CONNECTED. The connection stays open even if a command fails.',flush=True)
def protocol(method,params=None,session=None,timeout=12):
 global seq
 seq+=1;ident=seq;msg={'id':ident,'method':method,'params':params or {}}
 if session:msg['sessionId']=session
 ws.send(json.dumps(msg,ensure_ascii=False));end=time.monotonic()+timeout
 while time.monotonic()<end:
  ws.settimeout(max(.1,end-time.monotonic()));response=json.loads(ws.recv())
  if 'method' in response:events.append(response)
  if response.get('id')==ident:
   if 'error'in response:raise RuntimeError(response['error'])
   return response.get('result',{})
 raise TimeoutError(method)
def ensure_main():
 global main
 if main:return main
 targets=protocol('Target.getTargets')['targetInfos'];target=next(t for t in targets if t['type']=='page'and 'figma.com/design/xCjdhdFkSbToMiRVlXVN2V/'in t['url'])
 main=protocol('Target.attachToTarget',{'targetId':target['targetId'],'flatten':True})['sessionId']
 return main
def dom(js):
 r=protocol('Runtime.evaluate',{'expression':js,'returnByValue':True,'awaitPromise':True},ensure_main())
 if r.get('exceptionDetails'):raise RuntimeError(str(r['exceptionDetails'])[:500])
 return r.get('result',{}).get('value')
def key(k,code,vk,mods=0):
 for typ in ['keyDown','keyUp']:protocol('Input.dispatchKeyEvent',{'type':typ,'key':k,'code':code,'windowsVirtualKeyCode':vk,'modifiers':mods},ensure_main())
def click(x,y):
 for typ in ['mousePressed','mouseReleased']:protocol('Input.dispatchMouseEvent',{'type':typ,'x':x,'y':y,'button':'left','clickCount':1},ensure_main())
def open_plugin():
 if dom("!![...document.querySelectorAll('iframe')].find(e=>e.getBoundingClientRect().width>200&&e.getBoundingClientRect().height>200)"):return
 key('/','Slash',191,2);time.sleep(.25)
 clicked=dom("(()=>{const b=[...document.querySelectorAll('button,[role=button]')].find(e=>e.textContent.trim()==='Scripter'&&e.getBoundingClientRect().width>0);if(!b)return false;b.click();return true})()")
 if not clicked:raise RuntimeError('Scripter recent entry not visible; connection retained.')
 time.sleep(.7)
def run_file(path,batch_override=None):
 code=Path(path).read_text(encoding='utf-8');match=re.search(r'const BATCH=(\d+);',code)
 if batch_override is not None:code=code[:match.start()]+f'const BATCH={batch_override};'+code[match.end():]
 batch=re.search(r'const BATCH=(\d+);',code).group(1)
 protocol('Emulation.setFocusEmulationEnabled',{'enabled':True},ensure_main())
 open_plugin()
 box=dom("(()=>{const e=[...document.querySelectorAll('iframe')].filter(e=>e.getBoundingClientRect().width>200&&e.getBoundingClientRect().height>200).sort((a,b)=>b.getBoundingClientRect().width*b.getBoundingClientRect().height-a.getBoundingClientRect().width*a.getBoundingClientRect().height)[0];if(!e)return null;const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}})()")
 if not box:raise RuntimeError('Visible Scripter iframe not found; connection retained.')
 click(box['x']+min(180,box['w']/2),box['y']+110)
 key('Home','Home',36,2);key('a','KeyA',65,2);key('Backspace','Backspace',8)
 protocol('Input.insertText',{'text':code},ensure_main(),30);time.sleep(.5)
 key('Home','Home',36,2);key('Enter','Enter',13,2)
 marker='CMS 스토리보드 배치 '+batch+' 완료'
 for _ in range(60):
  if dom('document.body.innerText.includes('+json.dumps(marker)+')'):break
  time.sleep(.5)
 else:raise RuntimeError('Completion not observed for '+batch+'; connection retained. Inspect before rerunning.')
 print(marker,flush=True)
print('READY_FOR_COMMANDS',flush=True)
for line in sys.stdin:
 try:
  msg=json.loads(line);op=msg.get('op')
  if op=='run':run_file(msg['path'],msg.get('batch'))
  elif op=='files':
   for i,path in enumerate(msg['paths']):run_file(path,msg.get('batchStart',1200)+i)
  elif op=='dom':print(json.dumps(dom(msg['expression']),ensure_ascii=False),flush=True)
  elif op=='protocol':print(json.dumps(protocol(msg['method'],msg.get('params'),None if msg.get('browser') else ensure_main()),ensure_ascii=False),flush=True)
  elif op=='open':open_plugin();print('PLUGIN_OPEN',flush=True)
  elif op=='contexts':
   protocol('Runtime.enable',{},ensure_main())
   print(json.dumps([e['params']['context'] for e in events if e.get('method')=='Runtime.executionContextCreated'],ensure_ascii=False),flush=True)
  elif op=='context':
   result=protocol('Runtime.evaluate',{'expression':msg['expression'],'contextId':msg['context'],'returnByValue':True,'awaitPromise':True},ensure_main(),30)
   value=result.get('result',{}).get('value')
   if msg.get('save'):Path(msg['save']).write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf-8')
   print(json.dumps(result if not msg.get('save') else {'saved':msg['save']},ensure_ascii=False),flush=True)
  elif op=='script':
   source='(/*SCRIPTER*/async function __scripter_script_main(){\n'+Path(msg['path']).read_text(encoding='utf-8')+'\n})()/*SCRIPTER*/'
   expr='(()=>{const m=monaco.editor.getModels().find(m=>String(m.uri).startsWith(\'file:///scripter.\'));if(!m)throw Error(\'No Scripter model\');m.setValue('+json.dumps(source)+');return {chars:m.getValue().length,buttons:[...document.querySelectorAll(\'button\')].map(e=>({text:e.textContent,title:e.title,aria:e.getAttribute(\'aria-label\')}))};})()'
   print(json.dumps(protocol('Runtime.evaluate',{'expression':expr,'contextId':msg['context'],'returnByValue':True},ensure_main()),ensure_ascii=False),flush=True)
  elif op=='dom-save':
   value=dom(msg['expression']);Path(msg['path']).write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf-8');print('SAVED '+msg['path'],flush=True)
  elif op=='screenshot':
   data=protocol('Page.captureScreenshot',{'format':'png','captureBeyondViewport':True},ensure_main());Path(msg['path']).write_bytes(base64.b64decode(data['data']));print('SCREENSHOT '+msg['path'],flush=True)
  elif op=='close':break
  print('COMMAND_DONE',flush=True)
 except Exception as e:print('COMMAND_ERROR '+str(e)[:1200],flush=True)
try:
 if main:protocol('Emulation.setFocusEmulationEnabled',{'enabled':False},main);protocol('Target.detachFromTarget',{'sessionId':main})
except Exception:pass
ws.close()
