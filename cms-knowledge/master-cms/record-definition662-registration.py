import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('definition-qa-discard-intent.json');ledger=read('mutation-ledger.json')
assert intent['status']=='registration_submit_requested_outcome_not_yet_observed' and len(ledger['entries'])==26
state=read('evidence/1965-definition-qa-discard-register-fresh.json')['action']['data']['result']
rows=state['tables'][0]['rows'];row=next(r for r in rows if r['cells'][1]=='QA-DIFI-20261109-02-DISCARD.zip')
assert row['cells'][0]=='662' and row['cells'][6]=='등록중'
ledger['entries'].append({'operation':'Register second isolated Definition QA ZIP for actual discard verification','examDocumentId':662,'submitEvidence':1963,'readbackEvidence':[1965],'file':intent['file'],'fileSha256':intent['fileSha256'],'submittedValues':intent['plannedMetadata'],'observedState':'P','observedDefinitionRows':len(rows),'status':'New QA document662 confirmed in list; parsing and discard pending.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='registration_confirmed_parsing_pending',createdDocumentId=662,currentObservedState='P',registrationReadbackEvidence=[1965],confirmedMasterOperationsAfterRegistration=27)
write('definition-qa-discard-intent.json',intent)
print(json.dumps({'documentId':662,'confirmedMasterOperations':27,'state':'P'}))
