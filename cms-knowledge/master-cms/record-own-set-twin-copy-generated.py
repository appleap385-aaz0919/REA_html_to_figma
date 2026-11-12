import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
assert ev(2544)[0]['histories']==[]
result=ev(2547);history=result[0]['histories'];assert len(history)==1 and history[0]['itemIds']==[2089358,2089359,2089360,2089361]
assert '2089357' in result[1]['text'] and result[1]['text'].lstrip().startswith('2')
assert ev(2549)==ev(2537)
before=ev(2538)['items'];after=ev(2548)['items']
for old,new in zip(before,after):
 assert old['itemId']==new['itemId'] and old['viewFlag']==new['viewFlag'] and old['values'][0]==new['values'][0] and old['models']==new['models']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==57,'Already recorded or chronology changed; no replay.'
ledger['entries'].append({'operation':'COPY entire own approved four-child set through one normal generation submission','selectedOriginalItemId':2089242,'originalSharedPassageId':2089241,'originalChildItemIds':[2089242,2089243,2089244,2089245],'submitEvidence':2545,'readbackEvidence':[2546,2547,2548,2549],'generatedSharedPassageIdFromGroup':2089357,'generatedChildItemIds':history[0]['itemIds'],'generationHistoryRowsOnSelectedOriginal':1,'twinGroupMemberSetCount':2,'originalModelsOmrHmlVersionsAndStatusesUnchanged':True,'cloneDetailVerificationPending':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'own-set2089242-review-and-twin-intent-20261110.json';d=read(p.name);d.update(status='set_copy_generated_clone_verification_pending',copySubmitEvidence=2545,copyReadbackEvidence=[2547,2548,2549],generatedSharedPassageId=2089357,generatedChildItemIds=history[0]['itemIds'],groupMemberSetCount=2,confirmedMasterOperations=58);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed set COPY: new set2089357 / children2089358~61, group2 sets, Master58. Clone verification pending.')
