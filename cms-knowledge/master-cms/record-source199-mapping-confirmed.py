import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('source199-lifecycle-intent-20261110.json');assert intent['status']=='valid_mapping_add_attempt_started_do_not_replay'
state=read('evidence/2370-own-source199-mapping-independent-server-read.json')['action']['data']['result']['results'];item=read('evidence/2371-own-source199-mapping-item-summary-read.json')['action']['data']['result']
assert len(state[2]['rows'])==2 and state[1]['fields'][-1]['value']=='1'
assert item['sourceCount']=='2개' and item['values'][0]['value']=='2089216 (2088849)' and item['viewFlag']=='Y'
row=next(r for r in state[2]['rows'] if any('productId=199' in a['path'] for a in r['actions']));assert row['fields']==[{'name':'mapPageNum','value':'1'},{'name':'mapQuestionNum','value':'1'}]
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==44
ledger['entries'].append({'operation':'Add own active source199 to own approved item2089216 through product-add UI','sourceId':199,'itemId':2089216,'submitEvidence':2369,'readbackEvidence':[2370,2371,2372],'submittedValues':{'anchorItemId':'2089216','mapPageNum':'1','mapQuestionNum':'1'},'itemDetailIdUnchanged':2088849,'itemViewFlagUnchanged':'Y','beforeSourceIds':[13],'afterSourceIds':[13,199],'sourceMappedItemCountAfter':1,'status':'Independent source/current relation/item GETs confirm source13 retained, own199 added with1/1, item detail/version/status unchanged.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='mapping_confirmed_deactivate_preparing',mappingSubmitEvidence=2369,mappingReadback=[2370,2371,2372],currentSourceIds=[13,199],sourceMappedItemCount=1,confirmedMasterOperations=45)
write('source199-lifecycle-intent-20261110.json',intent)
print(json.dumps({'confirmedMasterOperations':45,'sourceIds':[13,199],'itemDetailId':2088849}))
