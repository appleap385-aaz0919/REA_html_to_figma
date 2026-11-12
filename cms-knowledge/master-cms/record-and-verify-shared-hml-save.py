import concurrent.futures
import hashlib
import json
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
from PIL import Image
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('shared-passage-edit-intent-20261110.json');assert intent['hmlPlan']['status']=='cms_final_apply_attempt_started_do_not_replay'
before=read('evidence/2330-own-hml-shared-all5-precommit-reference.json')['action']['data']['result']['items']
after=read('evidence/2336-own-shared-hml-all5-edit-reference-after.json')['action']['data']['result']['items']
details=read('evidence/2335-own-shared-hml-all5-server-after.json')['action']['data']['result']['items']
rows=[]
def model(item,id):return next((x['model'] for x in item['editorData'] if x['id']==id),None)
for b,a,d in zip(before,after,details):
    assert b['itemId']==a['itemId']==d['itemId']
    rows.append({'itemId':a['itemId'],'beforeDetailId':int(parse_qs(urlsplit(b['editorUrl']).query)['itemDetailId'][0]),'afterDetailId':int(parse_qs(urlsplit(a['editorUrl']).query)['itemDetailId'][0]),'viewFlag':d['viewFlag'],'passageHtmlModelUnchanged':model(b,'passageEditorData')==model(a,'passageEditorData'),'questionHtmlModelUnchanged':model(b,'questionEditorData')==model(a,'questionEditorData'),'savedOmrUnchanged':b['savedOMR']==a['savedOMR'],'beforeSlots':b['slots'],'afterSlots':a['slots']})
assert all(x['beforeDetailId']!=x['afterDetailId'] and x['viewFlag']=='R' for x in rows[:4])
assert rows[4]['beforeDetailId']==rows[4]['afterDetailId']==2088877
assert all(x['passageHtmlModelUnchanged'] and x['questionHtmlModelUnchanged'] and x['savedOmrUnchanged'] for x in rows)
new_urls={next(s['url'] for s in x['slots'] if s['slot']=='passage') for x in after[:4]};assert len(new_urls)==1
new_hml_url=next(iter(new_urls));assert '/2089241/1966/hml/2089241_P.hml' in new_hml_url
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==42
ledger['entries'].append({'operation':'Full Apply own shared passage HML and PNG received from actual HML editor','itemId':2089242,'passageId':2089241,'vendorTempSaveEvidence':[2320,2324,2325],'submitEvidence':2333,'readbackEvidence':[2334,2335,2336,2337],'beforeDetailIds':[r['beforeDetailId'] for r in rows[:4]],'afterDetailIds':[r['afterDetailId'] for r in rows[:4]],'newSharedHmlPath':'/passage/208/2089241/1966/hml/2089241_P.hml','status':'Independent own five-item GETs confirm all4set child revisions and one common new HML path. HTML passage/question models and all saved OMR are unchanged. Control single unchanged. Published asset verification follows separately.','serviceDeployment':False})
write('mutation-ledger.json',ledger)
intent['hmlPlan'].update(status='cms_commit_confirmed_assets_verification_pending',cmsSubmitEvidence=2333,cmsReadbackEvidence=[2335,2336,2337],setChildDetailIdsAfter=[r['afterDetailId'] for r in rows[:4]],sharedHmlPathVersion=1966,sharedHmlFilename='2089241_P.hml')
intent.update(status='html_and_hml_shared_commits_confirmed_assets_verification_pending',confirmedMasterOperations=43);write('shared-passage-edit-intent-20261110.json',intent)
comparison={'beforeEvidence':2330,'afterEvidence':[2335,2336],'submitEvidence':2333,'rows':rows,'limits':['Slot passage uses J in this imported original, but published modified filename is P in this observed save. Do not generalize all naming rules.','HTML and HML are separate observed representations; unchanged HTML does not prove all conversion workflows behave alike.']}
write('shared-hml-save-comparison-20261110.json',comparison)
baseline=read('hml666-pre-shared-edit-baseline-20261110.json');old={a['url']:a for a in baseline['assets']}
temp={r['kind']:r for r in read('shared-passage-hml-temp-results-20261110.json')['results']}
urls={s['url'] for item in after for s in item['slots'] if s.get('url')}|{s['src'] for item in details for s in item['images'] if s.get('src')}
assert len(urls)==22
folder=root/'fixtures'/'shared-passage-hml-persisted-20261110';folder.mkdir(exist_ok=True)
def fetch_asset(url):
    u=urlsplit(url);assert u.scheme=='https' and u.hostname=='dev-items.douclass.com' and u.path.startswith('/itembank/') and not u.query
    row={'url':url,'existedBeforeHmlEdit':url in old}
    try:
        with urllib.request.urlopen(url,timeout=20) as response:data=response.read(3_000_001);row.update(httpStatus=response.status,contentType=response.headers.get('Content-Type'))
        assert len(data)<=3_000_000
        row.update(bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
        if url in old:row['hashUnchanged']=row['sha256']==old[url]['sha256']
        else:
            assert '/passage/208/2089241/1966/' in u.path
            path=folder/u.path.split('/')[-1];path.write_bytes(data);row['path']=str(path.relative_to(root))
            kind='image' if path.suffix=='.png' else 'hml';row['equalsVendorTempHash']=row['sha256']==temp[kind]['sha256']
            if kind=='image':row['dimensions']=Image.open(path).size
            else:
                assert b'<!DOCTYPE' not in data.upper() and b'<!ENTITY' not in data.upper()
                text=''.join(ET.fromstring(data).itertext());row['hmlMarkerPresent']='[QA-SHARED-HML-20261110]' in text;row['htmlMarkerPresent']='[QA-SHARED-HTML-20261110]' in text
    except Exception as error:row['error']=str(error)
    return row
old_j_urls=[u for u in old if '/passage/208/2089241/1933/' in u]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:assets=list(pool.map(fetch_asset,sorted(urls)));retained_old=list(pool.map(fetch_asset,old_j_urls))
comparison.update(currentPublishedAssets=assets,retainedOldPassageAssets=retained_old)
write('shared-hml-save-comparison-20261110.json',comparison)
assert all(not a.get('error') for a in assets+retained_old)
assert all(a.get('hashUnchanged') for a in assets if a['existedBeforeHmlEdit'])
new_assets=[a for a in assets if not a['existedBeforeHmlEdit']];assert len(new_assets)==2 and all(a['equalsVendorTempHash'] for a in new_assets)
assert next(a for a in new_assets if a['url'].endswith('.hml'))['hmlMarkerPresent']
intent['hmlPlan']['status']='published_assets_confirmed_all_children_verified'
intent.update(status='html_and_hml_shared_save_scenarios_confirmed',hmlComparison='shared-hml-save-comparison-20261110.json');write('shared-passage-edit-intent-20261110.json',intent)
fixture=read('hml-qa-active-set-intent.json');fixture.update(sharedPassageEditStarted=True,latestCurrentChildDetailIds=[r['afterDetailId'] for r in rows[:4]],latestSharedHmlPathVersion=1966,sharedEditIntent='shared-passage-edit-intent-20261110.json');write('hml-qa-active-set-intent.json',fixture)
print(json.dumps({'confirmedMasterOperations':43,'childDetailIdsAfter':[r['afterDetailId'] for r in rows[:4]],'unchangedExistingCurrentAssets':sum(a['existedBeforeHmlEdit'] for a in assets),'newAssets':new_assets,'oldJAssetsStillUnchanged':all(a.get('hashUnchanged') for a in retained_old)},ensure_ascii=False))
