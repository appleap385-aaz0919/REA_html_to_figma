import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
baseline=ev(2417)['results'];after=ev(2427)['results'];draft=ev(2429);check=ev(2428)['draft']
assert ev(2419)['draft']['hasDraft'] is False and check['hasDraft'] is True
assert after[0]['values']==baseline[0]['values'] and after[0]['viewFlag']==baseline[0]['viewFlag']=='R'
assert after[0]['questionModels']==baseline[0]['questionModels']
assert after[1]['difficulty']==baseline[1]['difficulty']=='2' and after[1]['loadDraft']=='false'
assert after[1]['saved']==baseline[1]['saved'] and after[1]['hml']==baseline[1]['hml']
assert draft['difficulty']=='' and draft['loadDraft']=='true' and 'itemDetailId=2089005' in draft['editorUrl']
assert draft['saved']==baseline[1]['saved'] and draft['hml']==baseline[1]['hml']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==48,'Chronology changed or already recorded; no replay.'
ledger['entries'].append({'operation':'CMS temporary save of own copy2089239 with required difficulty blank','itemId':2089239,'submitEvidence':2425,'readbackEvidence':[2426,2427,2428,2429],'currentPublishedDetailIdUnchanged':2088871,'publishedViewFlagUnchanged':'R','publishedDifficultyUnchanged':'2','draftDetailId':2089005,'draftDifficulty':'','draftSavedAt':check['savedAt'],'htmlHmlAndOmrUnchanged':True,'fullApplyBlankDifficultyRejectedEvidence':2421,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('own-copy2089239-temp-save-intent-20261110.json');intent.update(status='temporary_save_confirmed_reentry_pending',tempSubmitEvidence=2425,tempReadbackEvidence=[2427,2428,2429],draftDetailId=2089005,publishedDetailId=2088871,confirmedMasterOperations=49)
(root/'own-copy2089239-temp-save-intent-20261110.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed CMS Temp Save; published original preserved, draft2089005 missing difficulty; Master49. No browser mutation in record script.')
