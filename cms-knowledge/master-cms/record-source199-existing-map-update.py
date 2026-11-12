import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
    d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'))
    assert d['action']['success']
    return d['action']['data']['result']
data=ev(2400)['results'];rows=data[2]['rows'];item=ev(2401);before=ev(2395)
assert len(rows)==2
qa=next(row for row in rows if any(a['path'].endswith('productId=199') for a in row['actions']))
old=next(row for row in rows if any(a['path'].endswith('productId=13') for a in row['actions']))
assert {f['name']:f['value'] for f in qa['fields']}=={'mapPageNum':'2','mapQuestionNum':'2'}
assert {f['name']:f['value'] for f in old['fields']}=={'mapPageNum':'2','mapQuestionNum':''}
assert next(f['value'] for f in data[0]['fields'] if f['name']=='useFlag')=='N'
assert item['viewFlag']=='Y' and item['sourceCount']=='2개' and next(v['value'] for v in item['values'] if v['label']=='문항 ID')=='2089216 (2088849)'
assert item['answer']==before['answer'] and item['omr']==before['omr']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==46,'Already recorded or changed chronology; no replay.'
ledger['entries'].append({'operation':'Update existing own source199 relation while sourceN: page/question1/1→2/2','sourceId':199,'itemId':2089216,'submitEvidence':2399,'readbackEvidence':[2400,2401],'sourceUseFlag':'N','retainedItemSourceIds':[13,199],'beforeMapping':{'mapPageNum':'1','mapQuestionNum':'1'},'afterMapping':{'mapPageNum':'2','mapQuestionNum':'2'},'originalSource13Unchanged':True,'itemDetailIdUnchanged':2088849,'itemViewFlagUnchanged':'Y','savedOmrAndAnswerUnchanged':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('source199-existing-mapping-edit-intent-20261110.json');intent.update(status='update_confirmed_remove_pending',updateSubmitEvidence=2399,updateReadbackEvidence=[2400,2401],confirmedMasterOperations=47,currentQaPage='2',currentQaQuestionNum='2')
(root/'source199-existing-mapping-edit-intent-20261110.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed unused-source relation update; Master operations47. No browser mutation was executed by this record script.')
