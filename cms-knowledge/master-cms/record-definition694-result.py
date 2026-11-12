import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf8'))
def write(n,d):(root/n).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
ledger=read('mutation-ledger.json')
assert len(ledger['entries'])==62
ledger['entries'].append({'operation':'Register isolated MULTI3 Definition ZIP through normal UI; document created but parsing failed','examDocumentId':694,'fileName':'QA-DIFI-20261110-04-MULTI3.zip','submitEvidence':2661,'readbackEvidence':[2663,2664,2665,2666,2667,2668],'documentState':'F','createdVisibleItemCount':0,'downloadMatchesSubmittedSha256':True,'inputJsonMembers':3,'approvalNotSubmitted':True,'failureCause':'Not exposed; archive structure/content cause unresolved','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent=read('definition-multi3-import-intent-20261110.json')
intent.update(status='registered_document694_parsing_failed_no_review_available',submitEvidence=2661,createdDocumentId=694,currentDocumentState='F',actualVisibleItemCount=0,createdVisibleItemIds=[],confirmedMasterOperationsAfterRegistration=63,readbackEvidence=[2663,2664,2667,2668],downloadEqualsSubmittedFixture=True,approvalSubmitted=False,failureCause='Unconfirmed; generic ZIP failure message only')
write('definition-multi3-import-intent-20261110.json',intent)
print(json.dumps({'confirmedMasterOperations':len(ledger['entries']),'document':694,'state':'F','visibleItems':0}))
