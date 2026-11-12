"""Record already-confirmed source199 update; does not contact the CMS."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(name):return json.loads((root/name).read_text(encoding='utf-8'))
def write(name,obj):(root/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
ledger=read('mutation-ledger.json')
assert len(ledger['entries'])==19
after=read('evidence/1323-source-test-updated-inventory.json')['action']['data']['result']
row=next(r for r in after['rows'] if r['cells'][0]=='199')
assert after['count']==60 and row['cells'][1]=='22-M-MA-T0-1-1-SMT-TP-2048'
assert row['cells'][6]=='교사용' and row['cells'][10:12]==['미사용','0']
values=read('evidence/1320-source-test-update-submit.json')['action']['data']['result']['expected']
ledger['entries'].append({'operation':'Update isolated unused unmapped source199','sourceId':199,
 'submitEvidence':1320,'readbackEvidence':[1321,1322,1323],'submittedValues':values,
 'observedCode':row['cells'][1],'observedEffects':['Same source199; code/name regenerated from changed publishYear2048','Source count remains60; mapped count0; statusUnused'],
 'status':'Confirmed by success message, detail values and independent list readback.'})
write('mutation-ledger.json',ledger)
write('sources-inventory-after-test-update-20261109.json',after)
intent=read('source-test-intent.json');intent.update({'status':'updated_confirmed','updatedValues':values,'updateSubmitEvidence':1320,'updateReadbackEvidence':[1321,1322,1323]});write('source-test-intent.json',intent)
for name in ['resume-state.json','inspection-status.json']:
 d=read(name);d['lastRetainedEvidence']='1323-source-test-updated-inventory'
 if name.startswith('resume'):
  d['liveBrowserLastKnownState'].update({'url':'https://dev-exambank.dongahub.com/product/detail.donga?curriculum=22&pageNum=1&pageSize=10&id=199','persistentSiteMutations':20,'lastEvidence':d['lastRetainedEvidence']})
 else:d['counts']['siteDataMutations']=20
 write(name,d)
k=read('knowledge.json');k['currentEvidenceIndex'].update({'confirmedServerOperations':20,'unconsolidatedEvidenceThrough':1323});write('knowledge.json',k)
print(json.dumps({'sourceId':199,'confirmedMasterOperations':20,'sourceCount22':60}))
