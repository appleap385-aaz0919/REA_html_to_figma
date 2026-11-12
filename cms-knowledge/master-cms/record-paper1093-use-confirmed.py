import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('paper1093-use-state-intent-20261110.json');assert intent['status']=='approved_only_use_attempt_started_do_not_replay'
server=read('evidence/2293-own-paper1093-approved-only-use-server-readback.json')['action']['data']['result']['results']
detail=read('evidence/2294-own-paper1093-approved-only-use-detail.json')['action']['data']['result']
assert server[1]['savedViewFlag']=='Y'
assert [e['value'] for e in server[1]['fields'] if e['name']=='itemIds']==['2089216']
assert detail['values'][0]['value']=='1093 (1124)' and detail['values'][2]['value']=='사용'
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==41
ledger['entries'].append({'operation':'Remove own failed member2089215 and save own paper1093 as useY with approved2089216 only','paperId':1093,'beforeDetailId':1101,'afterDetailId':1124,'submitEvidence':2291,'readbackEvidence':[2292,2293,2294,2295],'rejectedPriorAttempt':{'submitEvidence':2284,'reason':'승인할 수 없습니다; 실패 : 2089215','savedPaperRemained':'R/detail1101'},'beforeMemberItemIds':[2089215,2089216],'afterMemberItemIds':[2089216],'beforeViewFlag':'R','afterViewFlag':'Y','status':'Own paper is now useY/detail1124, one approved member. Failed item remains as Master data but is excluded from this paper. Paper deploy entry enabled; both services blocked by one undeployed member.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'approved_only_use_confirmed','submitEvidence':2291,'readbackEvidence':[2293,2294,2295],'currentDetailId':1124,'currentViewFlag':'Y','currentMemberItemIds':[2089216],'confirmedMasterOperations':42,'originalRestorationPending':False})
write('paper1093-use-state-intent-20261110.json',intent)
print(json.dumps({'confirmedMasterOperations':42,'paperId':1093,'detailId':1124,'viewFlag':'Y'}))
