import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('twin-qa-membership-intent.json');assert intent['status']=='add_attempt_started_do_not_replay'
result=read('evidence/2196-own-qa-clone-add-independent-readback.json')['action']['data']['result']
pair=read('evidence/2198-own-qa-pair-detail-server-readback.json')['action']['data']['result']
assert len(result[0]['histories'])==1 and result[0]['histories'][0]['itemIds']==[2089239]
assert '2089239' in result[1]['text'] and '2089216' in result[1]['text']
assert [p['viewFlag'] for p in pair]==['Y','R'] and all(p['displayedTwinCount']=='2개' for p in pair)
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==36
ledger['entries'].append({'operation':'Manually add own clone2089239 back to own anchor2089216 through exact-ID search result add button','anchorItemId':2089216,'targetItemId':2089239,'submitEvidence':2195,'readbackEvidence':[2196,2197,2198],'afterMemberItemIds':[2089216,2089239],'afterDisplayedCount':2,'generationHistoryCountAfter':1,'statesAfter':{'2089216':'Y','2089239':'R'},'status':'Independent membership and both detail GETs confirm group2. Candidate becomes registered with disabled add. Generation history stays one COPY record.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'remove_and_manual_readd_confirmed','addSubmitEvidence':2195,'finalReadbackEvidence':[2196,2197,2198],'finalMemberItemIds':[2089216,2089239],'finalDisplayedCount':2,'finalGenerationHistoryCount':1,'confirmedMasterOperations':37,'originalRestorationPending':False,'groupDatabaseIdentityRestorationClaimed':False})
write('twin-qa-membership-intent.json',intent)
print(json.dumps({'confirmedMasterOperations':37,'memberIds':[2089216,2089239]}))
