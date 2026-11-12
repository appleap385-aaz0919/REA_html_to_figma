import json,subprocess,time,re
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent;cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'));base=[cfg['executable'],'--session',cfg['session'],'--cdp',cfg['cdp'],'--pin-tab','--no-auto-dialog','--json']
def call(a,script=None):
 r=json.loads(subprocess.run(base+a,input=script,capture_output=True,encoding='utf-8',timeout=60).stdout)
 if not r.get('success'):raise RuntimeError(r)
 return r['data']
call(['open','https://dev-exambank.dongahub.com/lab/view/omr.donga'])
time.sleep(1)
catalog=json.loads((root/'item-storyboard-states.json').read_text(encoding='utf-8'));types=next(g for g in catalog['screens']if g['id']=='MST_ITM_07')['states'];records=[]
for state in types:
 code=state['title'].split(' · ')[-1];tabs=call(['tab','list'])['tabs'];tab=next(t for t in tabs if t['url'].startswith('https://dev-exambank.dongahub.com/lab/view/omr.donga'));call(['tab',tab['tabId']]);call(['frame','main'])
 call(['eval','--stdin'],"(()=>{const e=document.querySelector('#omr-"+code+"');e.classList.add('show');e.style.height='auto';e.style.display='block';return e.getBoundingClientRect().height})()");time.sleep(.25)
 name='gallery-'+code;path=root/'revision-captures'/(name+'.png');selector='#omr-'+code+' .omr-live > .card'
 call(['scrollintoview',selector]);time.sleep(.3)
 call(['screenshot',selector,str(path)]);w,h=Image.open(path).size
 records.append({'code':code,'title':state['title'],'capture':name,'crop':{'x':0,'y':0,'w':w,'h':h}})
 (root/'revision-omr-variants.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
 print(code,w,h,flush=True)
(root/'revision-omr-variants.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
call(['open','https://dev-exambank.dongahub.com/main.donga']);print('Gallery input structures captured; no CMS data was saved.',flush=True)
