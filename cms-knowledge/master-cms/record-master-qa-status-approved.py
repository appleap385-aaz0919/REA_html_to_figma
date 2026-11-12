import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('master-qa-status-approval-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==33
state=read('evidence/2123-master-qa-approved-server-readback.json')['action']['data']['result']
assert state['savedViewFlag']=='Y' and state['fieldsLocked'] and state['savedValues']=={'onlineFlag':'N','serviceUsage':'T'} and state['itemIdentity']==['2089216 (2088849)']
ledger['entries'].append({'operation':'Approve own QA objective item2089216 through actual Master status-save confirmation','itemId':2089216,'beforeDetailId':2088849,'afterObservedDetailId':2088849,'submitEvidence':2121,'readbackEvidence':[2122,2123,2124],'submittedValues':intent['plannedSubmittedValues'],'beforeViewFlag':'R','afterViewFlag':'Y','status':'Independent server GET confirms approved-useY, same content detail2088849, onlineN/TeacherT preserved. Twin-generation and deployment entry buttons enabled. No Service deployment occurred.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='approval_confirmed',currentViewFlag='Y',currentDetailId=2088849,readbackEvidence=[2122,2123,2124],confirmedMasterOperationsAfter=34,renderedTransitionPolicy=state['radioPolicy'],originalRestorationPending=False)
write('master-qa-status-approval-intent.json',intent)
print(json.dumps({'itemId':2089216,'state':'Y','confirmedMasterOperations':34,'contentDetailId':2088849}))
