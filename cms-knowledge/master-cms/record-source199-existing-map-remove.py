import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
    d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'))
    assert d['action']['success']
    return d['action']['data']['result']
data=ev(2403)['results'];item=ev(2404);before=ev(2401)
assert len(data[2]['rows'])==1
row=data[2]['rows'][0]
assert all(a['path'].endswith('productId=13') for a in row['actions'])
assert {f['name']:f['value'] for f in row['fields']}=={'mapPageNum':'2','mapQuestionNum':''}
assert next(f['value'] for f in data[0]['fields'] if f['name']=='useFlag')=='N'
assert data[1]['fields'][-1]['value']=='0'
assert item['viewFlag']=='Y' and item['sourceCount']=='1개' and next(v['value'] for v in item['values'] if v['label']=='문항 ID')=='2089216 (2088849)'
assert item['answer']==before['answer'] and item['omr']==before['omr']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==47,'Already recorded or changed chronology; no replay.'
ledger['entries'].append({'operation':'Remove only own source199 relation while sourceN; original13 preserved','sourceId':199,'itemId':2089216,'submitEvidence':2402,'readbackEvidence':[2403,2404],'sourceUseFlag':'N','beforeItemSourceIds':[13,199],'afterItemSourceIds':[13],'sourceMappedItemCountAfter':0,'originalSource13Unchanged':True,'itemDetailIdUnchanged':2088849,'itemViewFlagUnchanged':'Y','savedOmrAndAnswerUnchanged':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('source199-existing-mapping-edit-intent-20261110.json');intent.update(status='update_and_remove_confirmed_boundary_probe_pending',removeSubmitEvidence=2402,removeReadbackEvidence=[2403,2404],confirmedMasterOperations=48,currentItemSourceIds=[13],sourceMappedItemCount=0,currentQaMapping=None)
(root/'source199-existing-mapping-edit-intent-20261110.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed own199 relation removed, original13 preserved; Master operations48. No browser mutation executed by record script.')
