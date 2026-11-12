import json,subprocess,time,re
from pathlib import Path
root=Path(__file__).resolve().parent
cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'));base=[cfg['executable'],'--session',cfg['session'],'--cdp',cfg['cdp'],'--pin-tab','--no-auto-dialog','--json']
def call(a,script=None):
 r=json.loads(subprocess.run(base+a,input=script,capture_output=True,encoding='utf-8',timeout=60).stdout)
 if not r.get('success'):raise RuntimeError(r)
 return r['data']
call(['open','https://dev-exambank.dongahub.com/item/all/modify.donga?itemId=2089239']);call(['click','a[href="#tabOmr"]'])
time.sleep(2)
catalog=json.loads((root/'item-storyboard-states.json').read_text(encoding='utf-8'))
types=next(g for g in catalog['screens']if g['id']=='MST_ITM_07')['states'];records=[]
for state in types:
 code=state['title'].split(' · ')[-1]
 call(['select','#qtCategory',code[:2]]);call(['select','#qtAnswer',code[:4]]);call(['select','#qtType',code]);time.sleep(.15)
 time.sleep(.4)
 p=subprocess.run(['python','-X','utf8',str(root/'revision-capture.py'),'capture','variant-'+code],capture_output=True,encoding='utf-8',timeout=60)
 if p.returncode:raise RuntimeError(p.stdout+p.stderr)
 # Match the OMR editor card in the public DOM; the entire card is retained.
 data=call(['eval','--stdin'],'''(()=>{const h=[...document.querySelectorAll('h3')].find(e=>e.textContent.includes('OMR 편집'));const e=h.closest('.card');const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:Math.max(r.height,e.scrollHeight)}})()''')['result']
 # Coordinates come from the expanded capture geometry, not the restored viewport.
 geo=json.loads((root/'revision-captures'/('variant-'+code+'.json')).read_text(encoding='utf-8'))
 h=next(x['box']for x in geo['controls']if x['tag']=='H3'and 'OMR 편집'in x['text']);last=max(x['box']['y']+x['box']['h']for x in geo['controls']if x['box']['x']>=h['x'] and x['box']['y']>h['y'] and x['text']not in ['임시 저장','전체 반영','로그아웃'])
 crop={'x':h['x']-21,'y':h['y']-21,'w':data['w'],'h':max(data['h'],last-h['y']+60)}
 records.append({'code':code,'title':state['title'],'capture':'variant-'+code,'crop':crop});print(code,flush=True)
call(['open','https://dev-exambank.dongahub.com/item/all/detail.donga?itemId=2089239'])
(root/'revision-omr-variants.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print('All local type changes left without saving.',flush=True)
