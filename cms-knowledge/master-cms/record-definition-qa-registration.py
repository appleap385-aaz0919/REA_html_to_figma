"""Record the one confirmed registration immediately; never submit browser actions."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(name):return json.loads((root/name).read_text(encoding='utf-8'))
def write(name,value):(root/name).write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('definition-qa-import-intent.json'); ledger=read('mutation-ledger.json')
assert intent['status']=='submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==24
result=read('evidence/1906-definition-qa-registration-fresh-state.json')['action']['data']['result']
rows=result['tables'][0]['rows']; row=next(r for r in rows if r['cells'][1]=='QA-DIFI-20261109-01.zip')
assert len(rows)==16 and row['cells'][0]=='661' and row['cells'][6]=='등록중'
ledger['entries'].append({'operation':'Register isolated marked Definition QA ZIP through actual registration button','examDocumentId':661,'documentType':'Definition ZIP','submitEvidence':1904,'readbackEvidence':[1906],'submittedValues':intent['plannedMetadata'],'file':intent['file'],'fileSha256':intent['fileSha256'],'marker':intent['marker'],'observedEffects':['Curriculum22 Definition list15→16 records','New document661 listed as processing(P); item creation/approval not yet confirmed'],'status':'Registration confirmed from redirected GET list; parsing outcome pending.','originalDocumentId':530,'originalDocumentModified':False,'serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='registration_confirmed_parsing_pending',createdDocumentId=661,registrationReadbackEvidence=[1906],currentObservedState='P',confirmedMasterOperationsAfterRegistration=25)
write('definition-qa-import-intent.json',intent)
print(json.dumps({'recordedDocument':661,'confirmedMasterOperations':25,'state':'P'}))
