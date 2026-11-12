import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('twin-qa-membership-intent.json');assert intent['status']=='remove_attempt_started_do_not_replay'
result=read('evidence/2186-own-qa-clone-remove-independent-readback.json')['action']['data']['result']
assert result[0]['histories'][0]['itemIds']==[2089239] and len(result[0]['histories'])==1
assert '그룹이 없습니다' in result[1]['text'] and not result[1]['links']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==35
ledger['entries'].append({'operation':'Remove own clone2089239 from own two-member twin group through actual UI button','anchorItemId':2089216,'removedItemId':2089239,'submitEvidence':2185,'readbackEvidence':[2186,2187],'beforeMemberIds':[2089216,2089239],'afterAnchorDisplayedCount':0,'afterAnchorGroupExists':False,'generationHistoryRetained':True,'status':'UI click executed once; response-event observation timed out, but independent GET and current UI both confirm no anchor group. No mutation retry. Physical group-row deletion is not established.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'remove_confirmed_add_pending','removeEvidence':2185,'removeReadback':[2186,2187],'afterAnchorDisplayedCount':0,'generationHistoryRetained':True,'responseEventObservation':'timed out; independently reconciled without replay','confirmedMasterOperations':36})
write('twin-qa-membership-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':36,'anchorDisplayedTwinCount':0,'historyRetained':True}))
