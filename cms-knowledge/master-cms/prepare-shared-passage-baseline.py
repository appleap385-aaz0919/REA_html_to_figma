"""Read only already-observed fixture asset URLs and preserve pre-edit evidence."""
import concurrent.futures
import hashlib
import json
import urllib.request
from pathlib import Path
from urllib.parse import urlsplit
from bs4 import BeautifulSoup

root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
details=read('evidence/2243-own-active-set-all5-server-baseline.json')['action']['data']['result']
edits=read('evidence/2252-own-active-set-all5-edit-reference-baseline.json')['action']['data']['result']
assert [x['itemId'] for x in details['items']]==[2089242,2089243,2089244,2089245,2089246]
assert all(x['viewFlag']=='R' for x in details['items'])
urls={s['url'] for x in edits['items'] for s in x['slots'] if s.get('url')}
urls|={s['src'] for x in details['items'] for s in x['images'] if s.get('src')}
allowed={'2089241','2089242','2089243','2089244','2089245','2089246'}
folder=root/'fixtures'/'shared-passage-baseline-20261110';folder.mkdir(exist_ok=True)
def fetch_asset(url):
    u=urlsplit(url);parts=u.path.split('/')
    assert u.scheme=='https' and u.hostname=='dev-items.douclass.com' and u.path.startswith('/itembank/') and not u.query
    assert any(part in allowed for part in parts)
    name=parts[-1];path=folder/name
    record={'url':url,'path':str(path.relative_to(root))}
    try:
        with urllib.request.urlopen(url,timeout=20) as response:
            data=response.read(3_000_001)
            assert len(data)<=3_000_000
            record.update(httpStatus=response.status,contentType=response.headers.get('Content-Type'))
        if name.endswith('.png'):assert data.startswith(b'\x89PNG\r\n\x1a\n')
        path.write_bytes(data)
        record.update(bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
    except Exception as error:record['error']=str(error)
    return record
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    assets=list(pool.map(fetch_asset,sorted(urls)))
manifest={'date':'2026-11-10','fixtureDocumentId':666,'sharedPassageId':2089241,'sharedPassageDetailId':1933,'sourceEvidence':[2243,2252],
          'items':details['items'],'editReferences':edits['items'],'assets':assets,'scope':'Own QA fixture assets read without browser activation; no CMS save or document mutation.'}
write('hml666-pre-shared-edit-baseline-20261110.json',manifest)
assert all(not x.get('error') for x in assets if x['url'].endswith('2089241_J.hml'))
page=BeautifulSoup((root/'sources'/'own-set2089242-modify-baseline-20261110.html').read_text(encoding='utf-8'),'html.parser')
blocks=[s.get_text() for s in page.select('script:not([src])') if s.get('type')!='application/json' and any(k in s.get_text() for k in ['openWebhwpEditor','전체 반영','webhwpSavedHml','buildPayload'])]
source='\n\n/* NEXT INLINE BLOCK */\n\n'.join(blocks)
(root/'sources'/'own-set2089242-modify-save-inline-20261110.js').write_text(source,encoding='utf-8')
glue=read('evidence/2253-current-hml-editor-glue-readonly.json')['action']['data']['result']
assert glue['assetStatus']==200
(root/'sources'/'assets'/'webhwp-e082-current-20261110.js').write_text(glue['source'],encoding='utf-8')
write('sources/assets/webhwp-e082-current-20261110.schema.json',{'evidence':2253,'url':glue['assetUrl'],'sha256':hashlib.sha256(glue['source'].encode()).hexdigest(),'bytes':len(glue['source'].encode())})
print(json.dumps({'items':len(details['items']),'assetCount':len(assets),'downloadSuccess':sum('sha256' in a for a in assets),'downloadErrors':[a for a in assets if a.get('error')],'inlineSourceBytes':len(source.encode())},ensure_ascii=False))
