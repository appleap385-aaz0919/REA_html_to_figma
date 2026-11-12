import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
before=ev(2446)['results'];after=ev(2466)['results']
assert next(v['value'] for v in after[0]['values'] if v['label']=='문항 ID')=='2089239 (2089011)'
assert after[0]['viewFlag']=='R' and after[1]['difficulty']=='4'
assert after[1]['saved']==before[1]['saved'] and after[1]['hml']==before[1]['hml']
assert ev(2457)['difficulty']['value']==ev(2459)['difficulty']['value']=='3'
assert ev(2460)['editorUrl'].endswith('itemDetailId=2089006') and ev(2462)['loadedEditorUrl'].endswith('itemDetailId=2089006')
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==50,'Already recorded or chronology changed; no replay.'
ledger['entries'].append({'operation':'Concurrent edit A: own copy2089239 difficulty3→4 with B left open at2089006','itemId':2089239,'submitEvidence':2464,'readbackEvidence':[2465,2466,2467],'beforeDetailId':2089006,'afterDetailId':2089011,'beforeDifficulty':'3','afterDifficulty':'4','viewFlag':'R','savedHtmlHmlOmrUnchanged':True,'staleFormBLoadedDetailId':2089006,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'own-copy2089239-concurrent-edit-intent-20261110.json';d=read(p.name);d.update(status='a_saved_b_stale_not_submitted',newTabTargetId='7DEE6B23E1A8F95D11D455F48D9F5F97',newTabId='t60',aSubmitEvidence=2464,aReadbackEvidence=2466,aPublishedDetailId=2089011,aPublishedDifficulty='4',confirmedMasterOperations=51);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed A detail2089011/difficulty4, B remains original2089006; Master51. No browser mutation in record script.')
