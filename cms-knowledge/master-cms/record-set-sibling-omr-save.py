import json,sys
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
item_id,submit_e,reference_e,detail_e=map(int,sys.argv[1:]);intent=read('own-set2089242-review-and-twin-intent-20261110.json');done=intent['completedSiblingOmrItemIds'];assert item_id not in done
planned=next(x for x in intent['plannedSiblingOmr'] if x['itemId']==item_id);before_e=intent.get('lastReferenceEvidence',intent['baselineReferenceEvidence'])
before={x['itemId']:x for x in ev(before_e)['items']};after={x['itemId']:x for x in ev(reference_e)['items']};details=ev(detail_e)['items'];assert set(before)==set(after)
for iid,x in after.items():
 assert x['editorData']==before[iid]['editorData'] and x['slots']==before[iid]['slots']
 if iid==item_id:
  saved=x['savedOMR'];assert saved['savedOmrData']==[{'type':'TEXT'}]
  answer=saved['savedAnswerData'];assert answer['rule_type']=='ORDERED' and answer['nodes'][0]['allowed_answer'][0]['value']==planned['answerTex']
  assert answer['nodes'][0]['allowed_answer'][0]['value_type']=='math'
 else:assert x['savedOMR']==before[iid]['savedOMR']
assert all(x['viewFlag']=='R' for x in details)
def version(x):return int(parse_qs(urlsplit(x['editorUrl']).query)['itemDetailId'][0])
assert version(before[2089246])==version(after[2089246])==2088877
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==53+len(done),'Chronology changed or already recorded; no replay.'
before_ids={str(iid):version(before[iid]) for iid in intent['setChildItemIds']};after_ids={str(iid):version(after[iid]) for iid in intent['setChildItemIds']}
ledger['entries'].append({'operation':'Complete missing OMR only on own set child via FullApply','itemId':item_id,'submitEvidence':submit_e,'readbackEvidence':[reference_e,detail_e],'answerTex':planned['answerTex'],'beforeChildDetailIds':before_ids,'afterChildDetailIds':after_ids,'questionAndPassageModelsUnchanged':True,'hmlPathsUnchanged':True,'otherChildOmrUnchanged':True,'controlSingleUnchanged':2089246,'allChildViewFlags':'R','serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
done.append(item_id);intent.update(status='remaining_sibling_omr_progress',completedSiblingOmrItemIds=done,lastReferenceEvidence=reference_e,lastDetailEvidence=detail_e,currentChildDetailIds=after_ids,confirmedMasterOperations=len(ledger['entries']))
(root/'own-set2089242-review-and-twin-intent-20261110.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'confirmedMasterOperations':len(ledger['entries']),'completedChild':item_id,'remainingSiblingCount':3-len(done),'beforeDetailIds':before_ids,'afterDetailIds':after_ids}))
