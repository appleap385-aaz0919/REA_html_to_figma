"""Show a manual reload notice in the existing user HTML tab; preserve review data."""
from pathlib import Path
import json,time
import websocket
ROOT=Path(__file__).resolve().parent.parent
port,endpoint=(Path.home()/'AppData/Local/Google/Chrome/User Data/DevToolsActivePort').read_text().splitlines()[:2]
ws=websocket.create_connection(f'ws://127.0.0.1:{port}{endpoint}',timeout=30,suppress_origin=True);seq=0
def call(method,params=None,session=None):
 global seq
 seq+=1;ident=seq;msg={'id':ident,'method':method,'params':params or {}}
 if session:msg['sessionId']=session
 ws.send(json.dumps(msg));end=time.monotonic()+30
 while time.monotonic()<end:
  r=json.loads(ws.recv())
  if r.get('id')==ident:
   if 'error'in r:raise RuntimeError(r['error'])
   return r.get('result',{})
 raise TimeoutError(method)
try:
 targets=call('Target.getTargets')['targetInfos']
 target=next(t for t in targets if t['type']=='page' and t['url'].startswith('file:') and '/Demo_21_' in t['url'] and '/master-cms-mockup/index.html' in t['url'])
 sid=call('Target.attachToTarget',{'targetId':target['targetId'],'flatten':True})['sessionId']
 expression='''(()=>{
  if(!window.CMS||!window.CMSReview)throw Error('Existing CMS/review UI not ready');
  const original=JSON.stringify(CMSReview.exportData()),route=CMS.current;
  document.getElementById('deployment-policy-reload')?.remove();document.getElementById('description-tab-reload')?.remove();
  let banner=document.getElementById('description-label-color-reload');
  if(!banner){banner=document.createElement('div');banner.id='description-label-color-reload';banner.className='rv-reload-banner';banner.setAttribute('role','alert');
   banner.innerHTML='<div><strong>Description 번호를 보라색으로 변경했습니다</strong><span>새로고침하면 화면과 설명의 번호가 보라색으로 표시됩니다. 열린 패널과 작성 중인 요청은 복원됩니다.</span></div><button type="button" class="rv-primary">새로고침</button>';
   banner.querySelector('button').addEventListener('click',()=>location.reload());document.body.appendChild(banner);
  }
  CMSReview.notify('Description 번호와 선택 영역의 색상을 보라색으로 변경했습니다. 상단 새로고침 버튼으로 새 HTML을 불러오세요.');
  return {bannerVisible:banner.getBoundingClientRect().width>0,reviewUnchanged:original===JSON.stringify(CMSReview.exportData()),routeUnchanged:route===CMS.current,automaticReload:false,requestApprovalChanged:false};
 })()'''
 result=call('Runtime.evaluate',{'expression':expression,'returnByValue':True},sid)
 if result.get('exceptionDetails'):raise RuntimeError(result['exceptionDetails'])
 evidence=result['result']['value'];assert evidence['bannerVisible'] and evidence['reviewUnchanged'] and evidence['routeUnchanged']
 (ROOT/'master-cms-mockup/verification/description-label-color/live-reload-notice.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(json.dumps(evidence,ensure_ascii=False))
 call('Target.detachFromTarget',{'sessionId':sid})
finally:ws.close()
