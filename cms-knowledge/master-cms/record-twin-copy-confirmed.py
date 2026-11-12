import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(name):return json.loads((root/name).read_text(encoding='utf-8'))
def write(name,obj):(root/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('twin-qa-copy-intent.json')
assert intent['status']=='execution_attempt_started_do_not_replay'
result=read('evidence/2172-own-qa-twin-copy-independent-readback.json')['action']['data']['result']
assert result[0]['histories'][0]['itemIds']==[2089239]
assert len(result[0]['histories'])==1
assert '2089216' in result[1]['text'] and '2089239' in result[1]['text']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==34
ledger['entries'].append({'operation':'Generate one COPY twin from own approved QA item2089216 through actual generation-start button','anchorItemId':2089216,'sourceType':'COPY','submitEvidence':2170,'readbackEvidence':[2171,2172],'submittedValues':{'itemId':'2089216','sourceType':'COPY'},'createdItemIds':[2089239],'beforeTwinGroupExists':False,'afterObservedGroupMemberIds':[2089216,2089239],'afterDisplayedTwinCount':2,'createdItemState':'R','anchorItemState':'Y','status':'Independent history returns exactly one COPY event with created2089239. Current group contains approved anchor and draft clone; displayed2 includes anchor.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'copy_confirmed','createdItemIds':[2089239],'historyEvidence':2172,'afterDisplayedTwinCount':2,'displayedCountIncludesAnchor':True,'anchorState':'Y','createdState':'R','confirmedMasterOperations':35})
write('twin-qa-copy-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':35,'createdItemId':2089239}))
