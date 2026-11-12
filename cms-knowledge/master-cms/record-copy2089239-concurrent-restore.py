import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
baseline=ev(2446)['results'];after=ev(2485)['results']
assert next(v['value'] for v in after[0]['values'] if v['label']=='문항 ID')=='2089239 (2089019)'
assert after[0]['viewFlag']=='R' and after[1]['difficulty']=='3'
assert after[1]['saved']==baseline[1]['saved'] and after[1]['hml']==baseline[1]['hml']
assert after[0]['questionModels']==baseline[0]['questionModels']
assert [v for v in after[0]['values'] if v['label']!='문항 ID']==[v for v in baseline[0]['values'] if v['label']!='문항 ID']
assert ev(2486)['draft']['hasDraft'] is False
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==52,'Already recorded or changed chronology; no replay.'
ledger['entries'].append({'operation':'Restore own concurrent-edit test OMR5→4 through latest normal FullApply','itemId':2089239,'submitEvidence':2483,'readbackEvidence':[2484,2485,2486],'beforeDetailId':2089013,'afterDetailId':2089019,'difficultyUnchanged':'3','viewFlag':'R','beforeOmrAnswer':'⑤','afterOmrAnswer':'④','displayFieldsAndSavedModelsMatchPhase42ExceptVersion':True,'draftAvailableAfter':False,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'own-copy2089239-concurrent-edit-intent-20261110.json';d=read(p.name);d.update(status='stale_b_accepted_and_omr_restored_cleanup_pending',restoreSubmitEvidence=2483,restoreReadbackEvidence=[2485,2486],publishedDetailId=2089019,currentDifficulty='3',currentOmrAnswer='④',currentViewFlag='R',omrRestorationPending=False,originalRestorationPending=False,confirmedMasterOperations=53);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed OMR4 restored at2089019/R/3; fields/models match phase42 except version; Master53. No browser mutation in record script.')
