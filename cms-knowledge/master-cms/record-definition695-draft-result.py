import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf8'))
def write(n,d):(root/n).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
l=read('mutation-ledger.json');assert len(l['entries'])==63
l['entries'].append({'operation':'Register byte-identical single ORDERED member control through normal UI','examDocumentId':695,'fileName':'QA-DIFI-20261110-06-ORDERED1.zip','submitEvidence':2679,'readbackEvidence':[2681,2682,2683,2684,2686],'documentState':'R','visibleStagingCardItemId':2089375,'visibleStagingCardDetailId':2089082,'selectedReviewFlag':'S','beforeApprovalDirectMasterDetailAndEdit':'Both redirect to item list','approvalNotSubmitted':True,'sourceDocument694State':'F','sourceMemberBytesUnchanged':True,'serviceDeployment':False});write('mutation-ledger.json',l)
i=read('definition-ordered1-control-intent-20261110.json');i.update(status='document695_draft_R_single_card_verified',createdDocumentId=695,actualCardCount=1,stagingCardItemId=2089375,stagingCardDetailId=2089082,submitEvidence=2679,readbackEvidence=[2681,2684,2686],confirmedMasterOperationsAfterRegistration=64,preapprovalMasterItemAvailable=False);write('definition-ordered1-control-intent-20261110.json',i)
print(json.dumps({'confirmedMasterOperations':64,'document695':'R','card':2089375}))
