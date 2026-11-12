import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf8'))
def write(n,d):(root/n).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
l=read('mutation-ledger.json');assert len(l['entries'])==64
l['entries'].append({'operation':'Final approve Definition695 with its only successfully parsed card explicitly judged F','examDocumentId':695,'itemId':2089375,'detailId':2089082,'submitEvidence':2696,'readbackEvidence':[2697,2698,2699,2701,2704,2705],'submittedItemIds':['2089375'],'submittedLoadFlags':['F'],'finalDocumentState':'Y','observedIntermediateDocumentState':'M','finalMasterItemViewFlag':'F','masterTypeLabel':'SBMANM / subjective multi-answer general','omrData':None,'difficultyAndUnitMetadataRemainEmpty':True,'sourceMappingCount':1,'paperCount':0,'normalDetailAndEditLinksAfterApproval':True,'serviceDeployment':False});write('mutation-ledger.json',l)
i=read('definition695-f-only-approval-intent-20261110.json');i.update(status='final_approval_accepted_documentY_itemF',submitEvidence=2696,readbackEvidence=[2697,2698,2699,2701,2704,2705],finalDocumentState='Y',finalMasterViewFlag='F',confirmedMasterOperationsAfter=65,approvalReplayRequired=False);write('definition695-f-only-approval-intent-20261110.json',i)
print(json.dumps({'confirmedMasterOperations':65,'document695':'Y','item2089375':'F'}))
