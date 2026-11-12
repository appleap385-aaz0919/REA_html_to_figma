import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
before=ev(2552)['results'];after=ev(2571)['results']
for old,new in zip(before,after):
 assert old['itemId']==new['itemId'] and old['histories']==new['histories']
 assert new['countNodes']==[{'id':'twinCountBadge','text':'0'},{'id':'twinCountText','text':'0개'}] and new['tables']==[]
assert ev(2572)==ev(2549) and ev(2573)==ev(2551)
assert [(x['itemId'],x['viewFlag']) for x in ev(2574)['items']]==[(2089242,'Y'),(2089243,'Y'),(2089244,'Y'),(2089245,'Y'),(2089246,'R')]
assert all(x['viewFlag']=='R' for x in ev(2575)['items'])
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==58,'Already recorded or changed chronology; no replay.'
ledger['entries'].append({'operation':'Remove own cloned PASSAGE2089357 from two-set twin group through normal UI','anchorItemId':2089358,'removedDataType':'PASSAGE','removedDataId':2089357,'submitEvidence':2569,'readbackEvidence':[2571,2572,2573,2574,2575],'beforeMemberSetCount':2,'afterMemberSetCountOnAllEightChildren':0,'originalAndCopyVersionsModelsOmrHmlAndStatusesUnchanged':True,'originalGenerationHistoriesRetained':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'set-twin-membership-intent-20261110.json';d=read(p.name);d.update(status='unlink_confirmed_readd_pending',unlinkSubmitEvidence=2569,unlinkReadbackEvidence=[2571,2572,2573,2574,2575],currentMemberSetCount=0,logicalMembershipRestorationPending=True,confirmedMasterOperations=59);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed PASSAGE unlink: all8 now group0, histories/content/versions/states retained; Master59; re-add pending.')
