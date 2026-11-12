import json,subprocess,sys,time,re
from pathlib import Path
root=Path(__file__).resolve().parent
cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'))
base=[cfg['executable'],'--session',cfg['session'],'--cdp',cfg['cdp'],'--pin-tab','--no-auto-dialog','--json']
def call(args,script=None):
 p=subprocess.run(base+args,input=script,capture_output=True,encoding='utf-8',timeout=65)
 r=json.loads(p.stdout)
 if not r.get('success'):raise RuntimeError(r)
 return r['data']
def evaluate(script):return call(['eval','--stdin'],script)['result']
out=root/'revision-captures';out.mkdir(exist_ok=True)
action=sys.argv[1]
if action=='dismiss':
 print(call(['dialog','dismiss']));sys.exit()
if action=='inspect':
 print(json.dumps(evaluate('''({url:location.href,width:innerWidth,height:innerHeight,scrolls:[...document.querySelectorAll('body *')].filter(e=>e.clientHeight>50&&e.scrollHeight>e.clientHeight+15&&/(auto|scroll|hidden)/.test(getComputedStyle(e).overflowY)).map(e=>({tag:e.tagName,id:e.id,cl:e.className,h:e.clientHeight,sh:e.scrollHeight})).slice(0,30)})'''),ensure_ascii=False));sys.exit()
if action=='eval':
 print(json.dumps(evaluate(Path(sys.argv[2]).read_text(encoding='utf-8')),ensure_ascii=False));sys.exit()
if action=='open':
 url=sys.argv[2]
 if not url.startswith('https://dev-exambank.dongahub.com/'):raise RuntimeError('Scope')
 call(['open',url]);print(call(['get','url'])['url']);sys.exit()
if action=='click':
 label=sys.argv[2]
 snapshot=call(['snapshot'])['snapshot']
 (out/'last-snapshot.txt').write_text(snapshot,encoding='utf-8')
 matches=[m for m in re.finditer(r'(?:button|link|tab) "([^"\n]*)"[^\n]*\[ref=(e\d+)\]',snapshot) if m.group(1)==label or m.group(1).strip().endswith(label)]
 if not matches:raise RuntimeError('No control: '+label)
 call(['click','@'+matches[0].group(2)]);print('clicked',label);sys.exit()
if action=='snapshot':
 s=call(['snapshot'])['snapshot'];(out/'last-snapshot.txt').write_text(s,encoding='utf-8');print(s[:14000]);sys.exit()
if action!='capture':raise RuntimeError(action)
name=sys.argv[2]
url=call(['get','url'])['url']
if not url.startswith('https://dev-exambank.dongahub.com/'):raise RuntimeError('Scope '+url)
tabs=call(['tab','list'])['tabs'];target=next(t for t in tabs if t['url']==url)
call(['tab',target['tabId']])
evaluate('''(()=>{for(const [e,s]of(window.__sbStyles||[])){if(s==null)e.removeAttribute('style');else e.setAttribute('style',s)}delete window.__sbStyles;return true})()''')
call(['set','viewport','2200' if name.endswith('-list') else '1800','1100'])
time.sleep(.6)
if name.startswith('variant-'):
 for _ in range(5):
  snap=call(['snapshot'])['snapshot'];match=re.search(r'tab "OMR 수정"[^\n]*\[ref=(e\d+)\]',snap)
  if not match:time.sleep(.4);continue
  call(['click','@'+match.group(1)]);time.sleep(.5)
  if evaluate("(()=>{const e=document.querySelector('#tabOmr');return e&&e.getBoundingClientRect().height>0})()"):break
 else:raise RuntimeError('OMR tab did not become visible')
evaluate('''(()=>{window.__sbStyles=[];const save=e=>{__sbStyles.push([e,e.getAttribute('style')]);};for(const e of [document.documentElement,document.body]){save(e);e.style.height='auto';e.style.minHeight='100vh';e.style.overflow='visible';}for(const e of [...document.querySelectorAll('body *')]){const c=getComputedStyle(e);if(e.clientHeight>60&&e.scrollHeight>e.clientHeight+15&&/(auto|scroll|hidden)/.test(c.overflowY)&&!['TEXTAREA','SELECT','INPUT','IFRAME'].includes(e.tagName)){save(e);e.style.height='auto';e.style.maxHeight='none';e.style.overflow='visible';}}window.scrollTo(0,0);return __sbStyles.length})()''')
if name.endswith('-list'):
 evaluate('''(()=>{for(const e of document.querySelectorAll('.table-responsive')){if(e.scrollWidth>e.clientWidth+5){__sbStyles.push([e,e.getAttribute('style')]);e.style.width='max-content';e.style.minWidth='100%';e.style.maxWidth='none';e.style.overflow='visible';}}return true})()''')
time.sleep(.4)
data=evaluate('''(()=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height}};return {url:location.href,title:document.title,width:innerWidth,height:Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),text:document.body.innerText,modals:[...document.querySelectorAll('.modal.show .modal-dialog,[role="dialog"]')].filter(e=>e.getBoundingClientRect().width>0).map(e=>({box:rect(e),text:e.innerText})),controls:[...document.querySelectorAll('a,button,input,select,textarea,label,[role="tab"],[role="button"],h1,h2,h3,h4,h5,.card-header')].filter(e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0).map(e=>({tag:e.tagName,id:e.id,name:e.getAttribute('name'),text:(e.innerText||e.getAttribute('aria-label')||e.getAttribute('placeholder')||e.value||'').trim().slice(0,250),href:e.getAttribute('href'),type:e.type,box:rect(e)})),images:[...document.images].filter(e=>e.getBoundingClientRect().width>0).map(e=>({src:e.src,alt:e.alt,box:rect(e)}))}})()''')
(out/(name+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
call(['screenshot',str(out/(name+'.png')),'--full'])
evaluate('''(()=>{for(const [e,s]of(window.__sbStyles||[])){if(s==null)e.removeAttribute('style');else e.setAttribute('style',s)}delete window.__sbStyles;return true})()''')
print(json.dumps({'name':name,'width':data['width'],'height':data['height'],'controls':len(data['controls'])},ensure_ascii=False))
