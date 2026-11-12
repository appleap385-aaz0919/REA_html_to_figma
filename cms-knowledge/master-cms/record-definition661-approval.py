"""Record confirmed approval request R→M; AI completion remains unconfirmed."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('definition-qa-import-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='approval_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==25
state=read('evidence/1937-definition661-approval-fresh-state.json')['action']['data']['result']
assert 'メタ' not in state['text'] and '메타추천중' in state['text'] and '661' in state['text'] and '2089175' in state['text'] and not state['requests']
ledger['entries'].append({'operation':'Approve isolated Definition QA document661 through final approval modal','examDocumentId':661,'documentType':'Definition ZIP','itemIds':[2089175],'loadFlags':['S'],'submitEvidence':1935,'readbackEvidence':[1937,1938],'submittedValues':{'remark':intent['approval']['remark']},'beforeState':'R','afterObservedState':'M','status':'Approval request confirmed by persisted metadata-recommendation state. Automatic final approval and item metadata still pending.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='approval_confirmed_metadata_pending',currentObservedState='M',approvalReadbackEvidence=[1937,1938],confirmedMasterOperationsAfterApproval=26)
write('definition-qa-import-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':26,'document':661,'state':'M','automaticApprovalComplete':False}))
