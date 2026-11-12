import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('definition-qa-empty-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='registration_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==28
state=read('evidence/1990-definition-qa-empty-register-fresh.json')['action']['data']['result']
rows=state['tables'][0]['rows'];row=next(r for r in rows if r['cells'][1]=='QA-DIFI-20261109-03-EMPTY.zip')
assert row['cells'][0]=='663' and row['cells'][6]=='실패'
ledger['entries'].append({'operation':'Register an isolated valid empty Definition ZIP to observe server parsing failure','examDocumentId':663,'submitEvidence':1988,'readbackEvidence':[1990],'file':intent['file'],'fileSha256':intent['fileSha256'],'submittedValues':intent['plannedMetadata'],'observedState':'F','observedDefinitionRows':len(rows),'status':'New QA document663 confirmed in list as failed. Do not infer an observed P intermediate state or item creation.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='registration_confirmed_failed',createdDocumentId=663,currentObservedState='F',registrationReadbackEvidence=[1990],confirmedMasterOperationsAfterRegistration=29)
write('definition-qa-empty-intent.json',intent)
print(json.dumps({'documentId':663,'state':'F','confirmedMasterOperations':29}))
