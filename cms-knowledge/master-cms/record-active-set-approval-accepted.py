import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-active-set-intent.json');assert intent['status']=='approval_attempt_started_do_not_replay'
submitted=read('evidence/2232-hml666-retain-active-set-submit-once.json')['action']['data']['result']
state=read('evidence/2233-hml666-after-approval-visible.json')['action']['data']['result'];assert state['state']=='M'
assert submitted['actualGeneratedFormPairs']==[{'itemId':str(n),'loadFlag':'S'} for n in [2089242,2089243,2089244,2089245,2089246]]
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==39
ledger['entries'].append({'operation':'Approve own active-set HML666 with all five child questions S and no paper','examDocumentId':666,'submitEvidence':2232,'readbackEvidence':[2233,2234],'actualGeneratedFormPairs':submitted['actualGeneratedFormPairs'],'paperRegYn':'N','beforeState':'R','afterObservedState':'M','status':'Approval accepted; AI metadata recommendation pending. Shared passage2089241 and four set children retained, plus single2089246. Final Y not yet observed.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'approval_accepted_metadata_pending','approvalSubmitEvidence':2232,'approvalReadbackEvidence':[2233,2234],'currentObservedState':'M','paperRegYn':'N','confirmedMasterOperationsAfterApproval':40})
write('hml-qa-active-set-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':40,'examDocumentId':666,'state':'M'}))
