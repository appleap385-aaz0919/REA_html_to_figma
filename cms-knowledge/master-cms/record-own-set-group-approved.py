import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
before=ev(2531);after=ev(2537);assert after==before
details=ev(2538)['items'];ids=[2089242,2089243,2089244,2089245]
assert [(x['itemId'],x['viewFlag']) for x in details]==[(i,'Y') for i in ids]+[(2089246,'R')]
assert details[-1]['values'][0]['value']=='2089246 (2088877)'
intent=read('own-set2089242-review-and-twin-intent-20261110.json');assert intent['completedSiblingOmrItemIds']==[2089243,2089244,2089245]
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==56,'Chronology changed or already recorded; no replay.'
ledger['entries'].append({'operation':'Approve whole own four-child set R→Y through one normal status Save','selectedItemId':2089245,'affectedSetChildItemIds':ids,'submitEvidence':2535,'readbackEvidence':[2536,2537,2538],'childDetailIdsUnchanged':intent['currentChildDetailIds'],'allChildViewFlagsAfter':'Y','omrModelsAndHmlUnchanged':True,'controlSingleItemId':2089246,'controlSingleViewFlag':'R','serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
intent.update(status='all_sibling_omr_completed_and_set_y_confirmed_copy_not_submitted',groupApprovalSubmitEvidence=2535,groupApprovalReadbackEvidence=[2537,2538],currentChildViewFlags='all Y',confirmedMasterOperations=57,lastReferenceEvidence=2537,lastDetailEvidence=2538)
(root/'own-set2089242-review-and-twin-intent-20261110.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed one status Save sets all four childrenY, versions/OMR/HML unchanged; singleR; Master57.')
