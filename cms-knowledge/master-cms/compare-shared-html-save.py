import concurrent.futures
import hashlib
import json
import urllib.request
from pathlib import Path

root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
baseline=read('hml666-pre-shared-edit-baseline-20261110.json')
after=read('evidence/2272-own-shared-html-all5-server-after.json')['action']['data']['result']['items']
refs=read('evidence/2273-own-shared-html-all5-edit-references-after.json')['action']['data']['result']['items']
marker='[QA-SHARED-HTML-20261110]'
rows=[]
for before,now,editBefore,editNow in zip(baseline['items'],after,baseline['editReferences'],refs):
    assert before['itemId']==now['itemId']==editNow['itemId']
    passage=next((x['model'] for x in editNow['editorData'] if x['id']=='passageEditorData'),None)
    qbefore=next(x['model'] for x in editBefore['editorData'] if x['id']=='questionEditorData')
    qafter=next(x['model'] for x in editNow['editorData'] if x['id']=='questionEditorData')
    rows.append({'itemId':now['itemId'],'beforeIdentity':before['values'][0]['value'],'afterIdentity':now['values'][0]['value'],'beforeViewFlag':before['viewFlag'],'afterViewFlag':now['viewFlag'],'sharedHtmlMarkerPresent':marker in json.dumps(passage,ensure_ascii=False),'passageDocAfter':passage,'questionEditorModelUnchanged':qbefore==qafter,'hmlSlotsUnchanged':editBefore['slots']==editNow['slots'],'allDisplayModelsUnchanged':before['models']==now['models']})
assert all(x['sharedHtmlMarkerPresent'] for x in rows[:4]) and not rows[4]['sharedHtmlMarkerPresent']
assert all(x['beforeIdentity']!=x['afterIdentity'] for x in rows[:4]) and rows[4]['beforeIdentity']==rows[4]['afterIdentity']
assert all(x['hmlSlotsUnchanged'] for x in rows)
def compare_asset(asset):
    record={'url':asset['url'],'beforeSha256':asset['sha256']}
    try:
        with urllib.request.urlopen(asset['url'],timeout=20) as response:
            data=response.read(3_000_001);assert len(data)<=3_000_000
            record.update(httpStatus=response.status,bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
        record['hashUnchanged']=record['sha256']==asset['sha256']
    except Exception as error:record['error']=str(error)
    return record
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:assets=list(pool.map(compare_asset,baseline['assets']))
write('shared-html-save-comparison-20261110.json',{'baselineEvidence':[2243,2252],'afterEvidence':[2272,2273],'submitEvidence':2270,'rows':rows,'assets':assets,'limits':['Four child detail IDs changed together in this own draft set; all future statuses/sets are not implied.','Current shared-passage DB detail ID is not established by retained old HML file paths.','Saved selected OMR is separately confirmed from detail preview attributes; other child answer behavior requires card identity mapping.']})
assert all(a.get('hashUnchanged') for a in assets)
ledger=read('mutation-ledger.json');intent=read('shared-passage-edit-intent-20261110.json')
assert len(ledger['entries'])==40 and intent['status']=='html_full_apply_attempt_started_do_not_replay'
ledger['entries'].append({'operation':'Full Apply own shared HTML passage marker and first-child SBSANM OMR answer','itemId':2089242,'passageId':2089241,'submitEvidence':2270,'readbackEvidence':[2271,2272,2273,2274],'beforeDetailIds':[2088873,2088874,2088875,2088876],'afterObservedDetailIds':[2088906,2088907,2088908,2088909],'controlSingleItemId':2089246,'controlDetailIdUnchanged':2088877,'submittedChanges':{'passageHtmlMarker':marker,'selectedOmrAnswer':'2\\times1\\text{행렬}','hmlPending':'All empty'},'status':'All four own set children now share modified HTML passage and new detail versions; draftR preserved. All22 observed HML/PNG assets and four-slot paths unchanged. Own control single unchanged.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent.update({'status':'html_shared_save_confirmed_hml_not_started','htmlSubmitEvidence':2270,'htmlAfterEvidence':[2272,2273,2274],'setChildDetailIdsAfterHtml':[2088906,2088907,2088908,2088909],'confirmedMasterOperations':41,'htmlComparison':'shared-html-save-comparison-20261110.json'})
write('shared-passage-edit-intent-20261110.json',intent)
print(json.dumps({'confirmedMasterOperations':41,'childVersionRows':[{k:v for k,v in r.items() if k!='passageDocAfter'} for r in rows],'assetHashesUnchanged':len(assets)},ensure_ascii=False))
