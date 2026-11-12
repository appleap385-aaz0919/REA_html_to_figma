"""Use public CDP input and DOM only; no system clipboard or application internals."""
import json,re,sys,time
from pathlib import Path
from urllib.parse import urlsplit
import websocket
root=Path(__file__).resolve().parent;cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'))
print('Waiting for Chrome approval on one persistent connection (up to 180 seconds).',flush=True)
ws=websocket.create_connection(cfg['cdp'],timeout=180,suppress_origin=True);seq=0
print('Chrome connection approved; retaining this socket.',flush=True)
def call(method,params=None,session=None,timeout=15):
 global seq
 seq+=1;message={'id':seq,'method':method,'params':params or {}}
 if session:message['sessionId']=session
 ws.send(json.dumps(message,ensure_ascii=False));end=time.monotonic()+timeout
 while time.monotonic()<end:
  ws.settimeout(max(.1,end-time.monotonic()));r=json.loads(ws.recv())
  if r.get('id')==seq:
   if 'error'in r:raise RuntimeError(r['error'])
   return r.get('result',{})
 raise TimeoutError(method)
targets=call('Target.getTargets')['targetInfos'];target=next(t for t in targets if t['type']=='page'and 'figma.com/design/xCjdhdFkSbToMiRVlXVN2V/'in t['url'])
main=call('Target.attachToTarget',{'targetId':target['targetId'],'flatten':True})['sessionId'];attached={target['targetId']:main}
def evaluate(code,session=main,context=None):
 p={'expression':code,'returnByValue':True,'awaitPromise':True}
 if context:p['contextId']=context
 r=call('Runtime.evaluate',p,session)
 if r.get('exceptionDetails'):raise RuntimeError(str(r['exceptionDetails'])[:700])
 return r.get('result',{}).get('value')
def frames(tree):
 yield tree['frame']
 for child in tree.get('childFrames',[]):yield from frames(child)
tree=call('Page.getFrameTree',session=main)['frameTree'];frame_list=list(frames(tree));contexts=[]
for f in frame_list:
 session=main
 try:world=call('Page.createIsolatedWorld',{'frameId':f['id'],'worldName':'cms-storyboard-ui'},session)
 except RuntimeError:
  ti=next((t for t in targets if t['targetId']==f['id']),None)
  if not ti:continue
  session=call('Target.attachToTarget',{'targetId':f['id'],'flatten':True})['sessionId'];attached[f['id']]=session
  world=call('Page.createIsolatedWorld',{'frameId':f['id'],'worldName':'cms-storyboard-ui'},session)
 context=world['executionContextId']
 state=evaluate("({actual:location.protocol+'//'+location.host+location.pathname.slice(0,80),shadows:[...document.querySelectorAll('*')].filter(e=>e.shadowRoot).map(e=>({tag:e.tagName,id:e.id,editor:!!e.shadowRoot.querySelector('.monaco-editor'),frames:[...e.shadowRoot.querySelectorAll('iframe')].map(f=>({src:f.getAttribute('src')?.slice(0,100),name:f.name})),text:e.shadowRoot.textContent.slice(0,100)})),frames:[...document.querySelectorAll('iframe')].map(f=>({src:f.getAttribute('src')?.slice(0,100),name:f.name})),areas:[...document.querySelectorAll('textarea')].map(e=>({label:e.getAttribute('aria-label'),visible:e.getBoundingClientRect().width>0})),editor:!!document.querySelector('.monaco-editor')})",session,context)
 contexts.append({'frame':f['id'],'session':session,'context':context,'state':state})
 if '--inspect'in sys.argv:
  url=urlsplit(f.get('url',''));print({'host':url.netloc,'path':url.path[:140],'state':state},flush=True)
if not any(c['state']['editor']for c in contexts):
 for ti in targets:
  if ti['type']=='iframe'and urlsplit(ti['url']).hostname=='scripter.rsms.me':
   session=call('Target.attachToTarget',{'targetId':ti['targetId'],'flatten':True})['sessionId'];attached[ti['targetId']]=session
   for f in frames(call('Page.getFrameTree',session=session)['frameTree']):
    world=call('Page.createIsolatedWorld',{'frameId':f['id'],'worldName':'cms-storyboard-ui'},session);context=world['executionContextId']
    state=evaluate("({areas:[...document.querySelectorAll('textarea')].map(e=>({label:e.getAttribute('aria-label'),visible:e.getBoundingClientRect().width>0})),editor:!!document.querySelector('.monaco-editor')})",session,context)
    contexts.append({'frame':f['id'],'session':session,'context':context,'state':state})
editor=next((c for c in contexts if c['state']['editor']and any(a['visible']for a in c['state']['areas'])),None)
if not editor and '--service'not in sys.argv:raise RuntimeError('Scripter editor not found in the public frame DOM')
def key(k,code,vk,mod=0):
 for typ in ['keyDown','keyUp']:call('Input.dispatchKeyEvent',{'type':typ,'key':k,'code':code,'windowsVirtualKeyCode':vk,'modifiers':mod},editor['session'])
def run_file(filename):
 if not editor:raise RuntimeError('Editor pending; root connection is retained.')
 code=Path(filename).read_text(encoding='utf-8');batch=re.search(r'const BATCH=(\d+);',code).group(1)
 evaluate("document.querySelector('.monaco-editor textarea').focus();true",editor['session'],editor['context'])
 key('Home','Home',36,2);key('a','KeyA',65,2);key('Backspace','Backspace',8)
 call('Input.insertText',{'text':code},editor['session'],30);time.sleep(.4)
 key('Home','Home',36,2)
 visible=evaluate("document.querySelector('.monaco-editor .view-lines')?.innerText||document.querySelector('.monaco-editor textarea').value",editor['session'],editor['context'])
 if 'const BATCH='+batch+';'not in visible:raise RuntimeError('Script header not visible after direct input: '+str(visible)[:120])
 key('Enter','Enter',13,2)
 marker='CMS 스토리보드 배치 '+batch+' 완료'
 for _ in range(60):
  if evaluate('document.body.innerText.includes('+json.dumps(marker)+')'):break
  time.sleep(.5)
 else:raise RuntimeError('Completion not visible for '+batch)
 print(marker,flush=True)
if '--inspect'not in sys.argv:
 call('Emulation.setFocusEmulationEnabled',{'enabled':True},main)
 if editor:call('Emulation.setFocusEmulationEnabled',{'enabled':True},editor['session'])
 if '--service'in sys.argv:
  print('READY: one persistent approved CDP connection; editorFound='+str(bool(editor)),flush=True)
  for line in sys.stdin:
   try:
    message=json.loads(line)
    if message.get('op')=='run':run_file(message['path'])
    elif message.get('op')=='files':
     for filename in message['paths']:run_file(filename)
    elif message.get('op')=='dom':print(json.dumps(evaluate(message['expression']),ensure_ascii=False),flush=True)
    elif message.get('op')=='protocol':print(json.dumps(call(message['method'],message.get('params'),message.get('session',main)),ensure_ascii=False),flush=True)
    elif message.get('op')=='editor-dom':print(json.dumps(evaluate(message['expression'],editor['session'],editor['context']),ensure_ascii=False),flush=True)
    elif message.get('op')=='screenshot':
     result=call('Page.captureScreenshot',{'format':'png','captureBeyondViewport':True},main);import base64;Path(message['path']).write_bytes(base64.b64decode(result['data']));print('SCREENSHOT '+message['path'],flush=True)
    elif message.get('op')=='close':break
    print('COMMAND_DONE',flush=True)
   except Exception as e:print('COMMAND_ERROR '+str(e)[:1000],flush=True)
 else:
  for filename in sys.argv[1:]:run_file(filename)
 if editor:call('Emulation.setFocusEmulationEnabled',{'enabled':False},editor['session'])
 call('Emulation.setFocusEmulationEnabled',{'enabled':False},main)
for session in reversed(list(attached.values())):
 try:call('Target.detachFromTarget',{'sessionId':session})
 except Exception:pass
ws.close()
