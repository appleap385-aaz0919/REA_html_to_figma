import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-import-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='mixed_approval_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==30
state=read('evidence/2029-hml664-after-mixed-approval.json')['action']['data']['result']
assert '메타추천중' in state['text'] and '승인 되었습니다.' in state['alerts'] and not state['requests']
review=intent['plannedReview']
ledger['entries'].append({'operation':'Approve own HML664 with mixed review flags and automatic paper registration','examDocumentId':664,'submitEvidence':2028,'readbackEvidence':[2029],'submittedValues':review,'beforeState':'R','afterObservedState':'M','status':'Final approval request confirmed by success toast and M metadata-processing state. Actual S/F/D persistence, paper creation and final Y remain to inspect.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='mixed_approval_confirmed_metadata_pending',currentObservedState='M',approvalReadbackEvidence=[2029],confirmedMasterOperationsAfterApproval=31)
write('hml-qa-import-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':31,'documentId':664,'state':'M','review':review}))
