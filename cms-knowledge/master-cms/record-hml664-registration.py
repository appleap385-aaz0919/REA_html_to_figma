import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-import-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='registration_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==29
state=read('evidence/2014-hml-qa-register-fresh.json')['action']['data']['result']
row=next(r for r in state['tables'][0]['rows'] if r['cells'][1]=='QA-HML-20261109-01-SET.hml')
assert row['cells'][0]=='664' and row['cells'][7]=='등록중' and '총 117건' in state['tail']
ledger['entries'].append({'operation':'Register isolated QA copy of HML101 through actual registration form','examDocumentId':664,'documentType':'HML','submitEvidence':2012,'readbackEvidence':[2014],'file':intent['file'],'fileSha256':intent['fileSha256'],'submittedValues':intent['plannedMetadata'],'observedState':'P','observedHmlCurriculum22Count':117,'status':'Registration confirmed as processing(P); actual current parse output pending.','originalDocumentId':101,'serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='registration_confirmed_parsing_pending',createdDocumentId=664,currentObservedState='P',registrationReadbackEvidence=[2014],confirmedMasterOperationsAfterRegistration=30)
write('hml-qa-import-intent.json',intent)
print(json.dumps({'documentId':664,'state':'P','confirmedMasterOperations':30}))
