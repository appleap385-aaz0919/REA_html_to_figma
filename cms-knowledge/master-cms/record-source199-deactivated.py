import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('source199-lifecycle-intent-20261110.json');assert intent['status']=='deactivate_n_attempt_started_do_not_replay'
state=read('evidence/2384-own-source199-unused-with-mapping-server-read.json')['action']['data']['result']['results'];item=read('evidence/2385-own-source199-unused-item-summary-read.json')['action']['data']['result']
assert next(f['value'] for f in state[0]['fields'] if f['name']=='useFlag')=='N'
assert state[1]['fields'][-1]['value']=='1' and len(state[2]['rows'])==2
assert item['sourceCount']=='2개' and item['values'][0]['value']=='2089216 (2088849)' and item['viewFlag']=='Y'
row=next(r for r in state[2]['rows'] if any('productId=199' in a['path'] for a in r['actions']));assert '미사용' in row['text'] and row['fields']==[{'name':'mapPageNum','value':'1'},{'name':'mapQuestionNum','value':'1'}]
before=read('evidence/2379-own-source199-registration-pickers-before-n.json')['action']['data']['result']['pickers'];after=read('evidence/2386-own-source199-registration-pickers-after-n.json')['action']['data']['result']['pickers']
assert all(len(p['ownSourceOptions'])==1 for p in before) and all(not p['ownSourceOptions'] for p in after)
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==45
ledger['entries'].append({'operation':'Deactivate own mapped QA source199 Y→N after impact acknowledgment','sourceId':199,'itemId':2089216,'submitEvidence':2382,'readbackEvidence':[2383,2384,2385,2386,2387],'beforeUseFlag':'Y','afterUseFlag':'N','sourceMappedItemCountAfter':1,'retainedItemSourceIds':[13,199],'retainedMapping':{'mapPageNum':'1','mapQuestionNum':'1'},'itemDetailIdUnchanged':2088849,'itemViewFlagUnchanged':'Y','newRegistrationSourcePickerEligible':{'HML':False,'Definition':False},'status':'Existing own mapping and Master identity/status/OMR retained; both new-registration pickers remove199 after savedN. Source remark updated to identify retained own QA mapping. Actual Service exposure not tested.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='unused_saved_mapping_retained_new_registration_excluded_final_modal_check_pending',deactivationSubmitEvidence=2382,deactivationReadback=[2384,2385,2386,2387],finalUseFlag='N',finalMappedItemCount=1,finalItemSources=[13,199],confirmedMasterOperations=46,serviceExposureVerified=False)
write('source199-lifecycle-intent-20261110.json',intent)
print(json.dumps({'confirmedMasterOperations':46,'sourceUseFlag':'N','mappingRetained':True,'registrationPickersExcluded':True}))
