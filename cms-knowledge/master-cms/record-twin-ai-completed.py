import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('twin-qa-ai-intent.json');assert intent['status']=='ai_request_accepted_processing_not_final'
state=read('evidence/2225-own-qa-ai-background-server-progress.json')['action']['data']['result'];result=read('evidence/2226-own-qa-ai-background-histories.json')['action']['data']['result']
assert state['button']['attributes']['working']=='false' and state['count']=='3개'
assert len(result[0]['histories'])==2 and result[0]['histories'][0]['itemIds']==[2089240] and result[0]['histories'][0]['sourceTypeName']=='AI생성'
ledger=read('mutation-ledger.json');entry=next(e for e in ledger['entries'] if e.get('submitEvidence')==2203)
entry.update({'readbackEvidence':[2204,2205,2208,2209,2225,2226],'afterWorking':False,'createdItemIds':[2089240],'createdItemState':'R','groupMemberItemIdsAfter':[2089216,2089239,2089240],'generationHistoryCountAfter':2,'completionObserved':True,'status':'Server working=false; history now has exactly one AI-generated2089240 event in addition to COPY2089239. Group has anchorY plus two drafts. Completion is async effect of same accepted request, not a second submitted business operation.'})
write('mutation-ledger.json',ledger)
intent.update({'status':'ai_generation_completed_result_detail_pending','working':False,'completionObserved':True,'createdItemIds':[2089240],'completionEvidence':[2225,2226],'groupMemberItemIdsAfter':[2089216,2089239,2089240],'generationHistoryCountAfter':2,'historyRegistDate':'2026-11-09 19:56','timingLimit':'History timestamp is not independently established as exact task completion time; only read intervals are known.'})
write('twin-qa-ai-intent.json',intent)
print(json.dumps({'aiCreatedItemId':2089240,'confirmedMasterOperations':len(ledger['entries']),'working':False}))
