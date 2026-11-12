import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-set-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='set_approval_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==32
payload=read('evidence/2081-hml665-final-set-approval-submit.json')['action']['data']['result']
expected=[{'itemId':str(i),'loadFlag':'D'} for i in range(2089234,2089238)]+[{'itemId':'2089238','loadFlag':'S'}]
assert payload['actualGeneratedFormPairs']==expected and not payload['passageIdFieldSubmitted']
state=read('evidence/2082-hml665-after-set-approval-visible.json')['action']['data']['result'];assert state['state']=='M'
ledger['entries'].append({'operation':'Approve own HML665 with whole four-child set D and single S, paper registrationY','examDocumentId':665,'submitEvidence':2081,'readbackEvidence':[2082,2083,2085],'submittedValues':intent['plannedReview'],'actualGeneratedFormPairs':expected,'passageIdFieldSubmitted':False,'beforeState':'R','afterObservedState':'M','status':'Final request confirmed by M; one set control expanded to4Dchild pairs. Final Y, paper members and deleted-item route results pending.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='set_approval_confirmed_metadata_pending',currentObservedState='M',approvalReadbackEvidence=[2081,2082,2083,2084,2085],confirmedMasterOperationsAfterApproval=33)
write('hml-qa-set-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':33,'documentId':665,'state':'M','expandedChildPairs':expected}))
