"""Temporarily emulate active rendering on only the pinned research target; never focus native windows."""
import json,os,time
from datetime import datetime,timezone
from pathlib import Path
from urllib.parse import urlsplit
import websocket
root=Path(__file__).resolve().parent
config=json.loads((root/'agent-browser-session.json').read_text(encoding='utf-8'))
state_file=root/'browser-render-override-state.json'
stop_file=root/'browser-render-override.stop'
if state_file.exists():
    previous=json.loads(state_file.read_text(encoding='utf-8'))
    assert previous.get('active') is not True,'An override may already be active; inspect before starting another.'
assert not stop_file.exists(),'Remove the local stop marker only after checking the previous helper has stopped.'
ws=websocket.create_connection(config['cdp'],timeout=45,suppress_origin=True)
ws.settimeout(5)
sequence=0;session=None;state={}
def rpc(method,params=None,attached=False):
    global sequence
    sequence+=1; current=sequence
    request={'id':current,'method':method,'params':params or {}}
    if attached:request['sessionId']=session
    ws.send(json.dumps(request))
    while True:
        reply=json.loads(ws.recv())
        if reply.get('id')!=current:continue
        if 'error' in reply:raise RuntimeError(reply['error'])
        return reply.get('result',{})
def observe():
    return rpc('Runtime.evaluate',{'expression':'JSON.stringify({url:location.href,visibility:document.visibilityState,focused:document.hasFocus()})','returnByValue':True},True)['result']['value']
def persist():state_file.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
try:
    target=rpc('Target.getTargetInfo',{'targetId':config['cmsTargetId']})['targetInfo']
    assert urlsplit(target['url']).hostname==config['scopeHost']
    session=rpc('Target.attachToTarget',{'targetId':config['cmsTargetId'],'flatten':True})['sessionId']
    before=json.loads(observe())
    result=rpc('Emulation.setFocusEmulationEnabled',{'enabled':True},True)
    after=json.loads(observe())
    state.update(active=True,pid=os.getpid(),targetId=config['cmsTargetId'],startedUtc=datetime.now(timezone.utc).isoformat(),before=before,after=after,protocolResult=result,maximumSeconds=1200,
     effect='Only selected CDP target emulates active/focused rendering. No native window focus, mouse action, server mutation or browser-wide setting.',
     authority='https://github.com/ChromeDevTools/devtools-protocol/blob/master/pdl/domains/Emulation.pdl',
     stopMarker=str(stop_file))
    persist();print(json.dumps(state,ensure_ascii=False),flush=True)
    end=time.monotonic()+1200
    while time.monotonic()<end and not stop_file.exists():time.sleep(1)
finally:
    if session:
        try:
            rpc('Emulation.setFocusEmulationEnabled',{'enabled':False},True)
            state.update(active=False,clearedUtc=datetime.now(timezone.utc).isoformat(),afterClear=json.loads(observe()))
            persist();print(json.dumps({'active':False,'targetId':config['cmsTargetId'],'cleared':True}),flush=True)
        finally:rpc('Target.detachFromTarget',{'sessionId':session})
    ws.close()
