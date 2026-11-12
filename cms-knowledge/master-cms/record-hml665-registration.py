import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-set-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='registration_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==31
state=read('evidence/2067-hml-qa-small-set-register-post.json')['action']['data']['result']
rows=[r for r in state['tables'][0]['rows'] if r['cells'][1]=='QA-HML-20261109-02-SET4-SINGLE1.hml']
assert len(rows)==1 and rows[0]['cells'][0]=='665' and rows[0]['cells'][7]=='등록중' and '총 118건' in state['tail']
ledger['entries'].append({'operation':'Register bounded real HML set fixture with4set children and1single expected','examDocumentId':665,'documentType':'HML','submitEvidence':2066,'readbackEvidence':[2067],'file':intent['file'],'fileSha256':intent['fileSha256'],'submittedValues':intent['plannedMetadata'],'observedState':'P','observedHmlCurriculum22Count':118,'status':'Actual registration confirmed; current parser structure and item IDs pending verification.','originalDocumentId':596,'serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='registration_confirmed_parsing_pending',createdDocumentId=665,currentObservedState='P',registrationReadbackEvidence=[2067],confirmedMasterOperationsAfterRegistration=32)
write('hml-qa-set-intent.json',intent)
print(json.dumps({'documentId':665,'state':'P','confirmedMasterOperations':32}))
