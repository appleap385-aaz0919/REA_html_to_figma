import copy,json
from pathlib import Path
from urllib.parse import parse_qs,urlsplit
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
assert ev(2633)==ev(2593) and ev(2635)==ev(2595)
assert ev(2637)==ev(2592) and all(not x['draft']['hasDraft'] for x in ev(2631)['results'])
assert all(x['loadDraft']=='false' for x in ev(2632)['items'])
before=ev(2594)['items'];after=ev(2634)['items'];marker=' [QA-COPY-SHARED-DRAFT-20261110]';new_ids=[]
for old,new in zip(before,after):
 assert old['itemId']==new['itemId'] and old['savedOMR']==new['savedOMR'] and old['slots']==new['slots']
 if old['itemId']==2089246:assert old==new;continue
 old_models={x['id']:x['model'] for x in old['editorData']};new_models={x['id']:x['model'] for x in new['editorData']}
 assert old_models['questionEditorData']==new_models['questionEditorData']
 old_passage=old_models['passageEditorData'];new_passage=new_models['passageEditorData']
 assert new_passage['content']['promptText']==old_passage['content']['promptText']+marker
 expected=copy.deepcopy(old_passage);expected['content']['promptText']=new_passage['content']['promptText'];expected['content']['passageHtml']=new_passage['content']['passageHtml'];assert expected==new_passage
 assert new_passage['passageKey']=='passage:2089241'
 new_ids.append(int(parse_qs(urlsplit(new['editorUrl']).query)['itemDetailId'][0]))
assert new_ids==[2089078,2089079,2089080,2089081]
old_details=ev(2596)['items'];new_details=ev(2636)['items']
for old,new in zip(old_details,new_details):assert old['viewFlag']==new['viewFlag']=='R' and old['models']==new['models']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==61,'Already recorded or chronology changed; no replay.'
ledger['entries'].append({'operation':'FullApply saved copied shared HTML draft; publish only copied set and preserve original','selectedItemId':2089358,'logicalCopyPassageId':2089357,'embeddedDocumentPassageKey':'passage:2089241','submitEvidence':2629,'readbackEvidence':[2631,2632,2633,2634,2635,2636,2637],'beforeCopyChildDetailIds':[2089059,2089060,2089061,2089062],'loadedDraftDetailId':2089077,'afterCopyChildDetailIds':new_ids,'sharedHtmlMarkerOnAllCopyChildren':True,'originalSetCurrentReferencesAndDetailsUnchanged':True,'questionOmrAndHmlUnchanged':True,'copyViewFlags':'all R','originalViewFlags':'all Y','allKnownDraftChecksFalseAfter':True,'twinMembershipAndHistoryUnchanged':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
comparison={'schemaVersion':1,'cutoffEvidence':2637,'selectedItemId':2089358,'logicalCopyPassageId':2089357,'embeddedPassageKeyBeforeAndAfter':'passage:2089241','marker':marker.strip(),'baselineDraftEvidence':[2603,2604],'tempEvidence':[2615,2617,2618,2619,2620,2621,2622],'temporaryDraftItemIds':[2089358],'temporaryDetailId':2089077,'fullApplyEvidence':[2629,2631,2632,2633,2634,2635,2636,2637],'beforeCopyDetailIds':[2089059,2089060,2089061,2089062],'afterCopyDetailIds':new_ids,'changedPassageModelPaths':['content.promptText','content.passageHtml'],'otherQuestionPassageFieldsUnchanged':True,'questionModelsUnchanged':True,'omrAndAnswerUnchanged':True,'hmlPathsAndUrlsUnchanged':True,'originalCurrentReferencesAndDetailsUnchanged':True,'controlSingleUnchanged':2089246,'all9DraftChecksFalseAfter':True,'membershipsAndHistoriesEqualToBefore':True,'limits':['Shared HTML isolation was exercised; HML editing of the copy was not exercised.','No DB physical deletion/allocation or role/Service behavior was inspected.']}
(root/'copied-set-shared-temp-isolation-comparison-20261110.json').write_text(json.dumps(comparison,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'copied-set-shared-temp-isolation-intent-20261110.json';d=read(p.name);d.update(status='shared_temp_and_fullapply_copy_isolation_confirmed',applySubmitEvidence=2629,applyReadbackEvidence=[2631,2632,2633,2634,2635,2636,2637],currentCopyDetailIds=new_ids,currentCopyViewFlags='all R',currentOriginalViewFlags='all Y',draftAvailableAfter=False,comparisonArtifact='copied-set-shared-temp-isolation-comparison-20261110.json',confirmedMasterOperations=62,originalRestorationPending=False);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed selected draft FullApply updates copy4 only, original retained, all drafts cleared, group/history unchanged; Master62.')
