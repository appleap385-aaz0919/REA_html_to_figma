import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-active-set-intent.json');assert intent['status']=='registration_attempt_started_do_not_replay'
result=read('evidence/2220-hml-active-set-registered-row.json')['action']['data']['result'];assert result['cells'][0]=='666' and result['cells'][1]=='QA-HML-20261109-03-ACTIVE-SET4-SINGLE1.hml'
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==38
ledger['entries'].append({'operation':'Register isolated active four-child set plus single HML fixture','examDocumentId':666,'submitEvidence':2218,'readbackEvidence':[2220],'file':intent['file'],'fileBytes':35911,'fileSha256':intent['fileSha256'],'submittedValues':intent['plannedMetadata'],'afterObservedStatus':'등록중','status':'Exact unique filename accepted and linked as document666; conversion result not yet observed.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'registration_confirmed_conversion_pending','createdDocumentId':666,'registrationSubmitEvidence':2218,'registrationReadbackEvidence':2220,'confirmedMasterOperationsAfterRegistration':39})
write('hml-qa-active-set-intent.json',intent)
print(json.dumps({'documentId':666,'confirmedMasterOperations':39}))
