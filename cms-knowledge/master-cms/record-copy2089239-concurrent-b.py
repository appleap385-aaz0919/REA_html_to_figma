import copy,json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
before=ev(2466)['results'];after=ev(2476)['results'];stale=ev(2469)
assert stale['difficulty']['value']=='3' and ev(2470)['results'][1]['difficulty']=='4'
assert ev(2471)['uneditedDifficulty']=='3' and ev(2471)['omrOptionsUnchanged']
assert before[1]['difficulty']=='4' and after[1]['difficulty']=='3' and after[0]['viewFlag']=='R'
assert next(v['value'] for v in after[0]['values'] if v['label']=='문항 ID')=='2089239 (2089013)'
expected=copy.deepcopy(before[1]['saved']);expected['savedAnswerData']['allowed_answer'][0]['value']='⑤'
assert after[1]['saved']==expected and after[1]['hml']==before[1]['hml']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==51,'Already recorded or chronology changed; no replay.'
ledger['entries'].append({'operation':'Concurrent stale B FullApply changes only OMR4→5 and overwrites unedited difficulty4→old3','itemId':2089239,'submitEvidence':2474,'readbackEvidence':[2475,2476,2477],'staleFormLoadedDetailId':2089006,'beforeCurrentDetailId':2089011,'afterCurrentDetailId':2089013,'beforeCurrentDifficulty':'4','staleUneditedDifficulty':'3','afterDifficulty':'3','beforeOmrAnswer':'④','afterOmrAnswer':'⑤','viewFlag':'R','htmlHmlAndOmrOptionsUnchanged':True,'observedConflictWarning':False,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'own-copy2089239-concurrent-edit-intent-20261110.json';d=read(p.name);d.update(status='stale_b_accepted_lost_update_confirmed_omr_restore_pending',bSubmitEvidence=2474,bReadbackEvidence=2476,bPublishedDetailId=2089013,bPublishedDifficulty='3',bPublishedOmrAnswer='⑤',conflictWarningObserved=False,confirmedMasterOperations=52,omrRestorationPending=True);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed stale B accepted: difficulty4→old3 and OMR5; Master52. OMR restore pending. No browser mutation in record script.')
