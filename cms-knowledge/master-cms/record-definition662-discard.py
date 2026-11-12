import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('definition-qa-discard-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='discard_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==27
state=read('evidence/1974-definition662-discard-post-state.json')['action']['data']['result']
assert '폐기된 시험지입니다.' in state['text'] and '조회만 가능하며 복원할 수 없습니다.' in state['text'] and '폐기 되었습니다.' in state['alerts']
ledger['entries'].append({'operation':'Discard only isolated QA Definition document662 through its final confirmation modal','examDocumentId':662,'ownCreatedItemIds':intent['createdItemIds'],'submitEvidence':1973,'readbackEvidence':[1974],'submittedValues':{'remark':intent['discardReason']},'beforeState':'R','afterObservedState':'D','status':'Actual discard confirmed with success toast and discarded detail. Question content retained with delete badge and hidden item ID; physical DB deletion is not inferred.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='discard_confirmed',currentObservedState='D',discardReadbackEvidence=[1974],confirmedMasterOperationsAfterDiscard=28,restorationRequired=False,restoreUiAvailable=False)
write('definition-qa-discard-intent.json',intent)
print(json.dumps({'documentId':662,'state':'D','confirmedMasterOperations':28}))
