import hashlib,json
from pathlib import Path
from urllib.parse import parse_qs,urlsplit
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
def digest(x):return hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode('utf-8')).hexdigest()
originals=ev(2549)['items'];clones=ev(2551)['items'];details=ev(2550)['items'];memberships=ev(2552)['results'];pairs=[]
for old,new,detail in zip(originals[:4],clones[:4],details[:4]):
 assert old['editorData']==new['editorData'] and old['savedOMR']==new['savedOMR'] and old['slots']==new['slots']
 assert detail['viewFlag']=='R' and '2089357' in detail['values'][7]['value']
 assert str(old['itemId']) in detail['values'][1]['value']
 assert detail['values'][2]['value']=='-' and detail['values'][9]['value'].startswith('0') and detail['values'][10]['value']=='-'
 pairs.append({'originalItemId':old['itemId'],'newItemId':new['itemId'],'newDetailId':int(parse_qs(urlsplit(new['editorUrl']).query)['itemDetailId'][0]),'viewFlag':'R','editorModelsEqual':True,'editorModelsCanonicalSha256':digest(new['editorData']),'savedOmrAndAnswerEqual':True,'hmlSlotsAndUrlsEqual':True,'originalFileLinkEmpty':True,'sourceLinkEmpty':True,'paperCount':0})
assert originals[-1]==clones[-1] and ev(2537)==ev(2549)
for item in memberships:
 assert item['countNodes']==[{'id':'twinCountBadge','text':'2'},{'id':'twinCountText','text':'2개'}]
 assert len(item['tables'])==2 and all(len(t['rows'])==4 for t in item['tables'])
 rows={int(row['cells'][0]) for table in item['tables'] for row in table['rows']};assert rows=={2089242,2089243,2089244,2089245,2089358,2089359,2089360,2089361}
 assert len(item['histories'])==(1 if item['itemId']<2089358 else 0)
images=ev(2556)['images'];assert len(images)==9 and all(x['complete'] and x['naturalWidth']>0 and x['naturalHeight']>0 for x in images)
comparison={'schemaVersion':1,'evidenceCutoff':2563,'sourceEvidence':[2537,2547,2548,2549,2550,2551,2552,2555,2556,2562,2563],'originalPassageId':2089241,'newPassageId':2089357,'pairs':pairs,'controlSingleUnchanged':2089246,'originalReferencesUnchanged':True,'groupMemberSetCount':2,'groupVisibleChildRowCount':8,'originalHistoryCountPerChild':1,'cloneHistoryCountPerChild':0,'loadedPreviewImages':9,'cloneGenerationAndHistoryHeaderActionsObserved':{'generation':ev(2562)['generationAction'],'history':ev(2562)['historyActionExists']},'limits':['Identical HML URLs are observed references; physical storage copy/allocation is not inspected.','Missing generation/history header actions are observed on the new R copies; the full rendering condition is not established.','No Service deployment or recursive generation was submitted.']}
(root/'set-twin-copy-comparison-20261110.json').write_text(json.dumps(comparison,ensure_ascii=False,indent=2),encoding='utf-8')
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==58 and ledger['entries'][-1]['submitEvidence']==2545
ledger['entries'][-1].update(cloneDetailVerificationPending=False,cloneVerificationEvidence=[2550,2551,2552,2556],newChildDetailIds=[x['newDetailId'] for x in pairs],newChildViewFlags='all R',originalAndCloneModelsOmrHmlEqual=True,groupMemberSetCount=2,groupVisibleChildRowCount=8,comparisonArtifact='set-twin-copy-comparison-20261110.json')
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'own-set2089242-review-and-twin-intent-20261110.json';d=read(p.name);d.update(status='set_copy_and_comparison_confirmed',cloneVerificationEvidence=[2550,2551,2552,2556],generatedChildDetailIds=[x['newDetailId'] for x in pairs],generatedChildViewFlags='all R',comparisonArtifact='set-twin-copy-comparison-20261110.json',originalRestorationPending=False);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'newPassageId':2089357,'newChildDetailIds':[x['newDetailId'] for x in pairs],'modelsOmrHmlEqual':True,'groupSets':2,'childRows':8,'confirmedMasterOperations':58}))
