import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
baseline=ev(2417)['results'];after=ev(2446)['results'];fallback=ev(2448)
assert ev(2447)['draft']['hasDraft'] is False
assert after[0]['viewFlag']=='R' and next(v['value'] for v in after[0]['values'] if v['label']=='문항 ID')=='2089239 (2089006)'
assert next(v['value'] for v in after[0]['values'] if v['label']=='난이도')=='중'
assert after[1]['difficulty']=='3' and after[1]['loadDraft']=='false'
assert after[0]['questionModels']==baseline[0]['questionModels'] and after[1]['saved']==baseline[1]['saved'] and after[1]['hml']==baseline[1]['hml']
assert fallback['loadDraft']=='false' and fallback['difficulty']=='3' and 'itemDetailId=2089006' in fallback['editorUrl']
assert ev(2433)['difficulty']['value']=='2' and 'draft=N' in ev(2433)['url']
assert ev(2439)['difficulty']['value']=='' and 'draft=Y' in ev(2439)['url']
assert ev(2436)['draft']==ev(2428)['draft']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==49,'Already recorded or changed chronology; no replay.'
ledger['entries'].append({'operation':'Complete own copy2089239 saved draft difficulty3/중 and FullApply','itemId':2089239,'submitEvidence':2444,'readbackEvidence':[2445,2446,2447,2448],'beforePublishedDetailId':2088871,'beforeDraftDetailId':2089005,'afterPublishedDetailId':2089006,'beforeDifficulty':'2','afterDifficulty':'3','viewFlagUnchanged':'R','draftAvailableAfter':False,'explicitDraftYFallbackToCurrent':True,'htmlHmlAndOmrUnchanged':True,'sourceCountRemainsZero':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('own-copy2089239-temp-save-intent-20261110.json');intent.update(status='temp_save_reentry_and_fullapply_confirmed',applySubmitEvidence=2444,applyReadbackEvidence=[2446,2447,2448],publishedDetailId=2089006,currentViewFlag='R',currentDifficulty='3',draftAvailable=False,confirmedMasterOperations=50,originalRestorationPending=False)
(root/'own-copy2089239-temp-save-intent-20261110.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed own draft FullApply to detail2089006/중/R, draft cleared; Master50. No browser mutation in record script.')
