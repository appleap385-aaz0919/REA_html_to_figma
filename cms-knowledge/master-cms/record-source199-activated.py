import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('source199-lifecycle-intent-20261110.json');assert intent['status']=='activate_y_attempt_started_do_not_replay'
state=read('evidence/2357-own-source199-active-server-readback.json')['action']['data']['result']['results']
assert next(f['value'] for f in state[0]['fields'] if f['name']=='useFlag')=='Y'
assert any(f['value']==intent['sourceCode'] for f in state[1]['fields'])
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==43
ledger['entries'].append({'operation':'Activate own QA source199 from unusedN to useY','sourceId':199,'submitEvidence':2355,'readbackEvidence':[2356,2357,2358],'beforeUseFlag':'N','afterUseFlag':'Y','sourceCode':intent['sourceCode'],'status':'Independent own source modify GET confirms savedY and detail code retained; own item relation still has only original source13.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update(status='source_y_confirmed_mapping_preparing',activationSubmitEvidence=2355,activationReadback=[2357,2358],confirmedMasterOperations=44)
write('source199-lifecycle-intent-20261110.json',intent)
print(json.dumps({'confirmedMasterOperations':44,'sourceId':199,'useFlag':'Y'}))
