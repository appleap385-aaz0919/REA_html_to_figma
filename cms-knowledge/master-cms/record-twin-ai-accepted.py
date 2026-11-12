import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('twin-qa-ai-intent.json');assert intent['status']=='ai_submit_attempt_started_do_not_replay'
result=read('evidence/2204-own-qa-ai-generation-server-state.json')['action']['data']['result']
assert result['button']['attributes']['working']=='true' and result['button']['attributes']['sourceTypeName']=='AI생성'
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==37
ledger['entries'].append({'operation':'Request one AI twin generation on own approved QA anchor through actual generation-start','anchorItemId':2089216,'sourceType':'AI','submitEvidence':2203,'readbackEvidence':[2204,2205],'submittedValues':{'itemId':'2089216','sourceType':'AI'},'requestAccepted':True,'afterWorking':True,'requestDate':result['button']['attributes']['requestDate'],'status':'Server-rendered independent GET shows working=true, AI source/requester/date; UI confirms generation requested. Completion and created IDs are not established yet.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'ai_request_accepted_processing_not_final','acceptedEvidence':2204,'initialHistoryEvidence':2205,'working':True,'requestDate':result['button']['attributes']['requestDate'],'confirmedMasterOperations':38,'completionObserved':False})
write('twin-qa-ai-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':38,'aiRequestAccepted':True,'completionObserved':False}))
