import concurrent.futures
import hashlib
import json
import urllib.request
from pathlib import Path
from urllib.parse import urlsplit
from PIL import Image
root=Path(__file__).resolve().parent
intent=json.loads((root/'shared-passage-edit-intent-20261110.json').read_text(encoding='utf-8'))
assert intent['hmlPlan']['status']=='vendor_temp_save_confirmed_cms_commit_pending'
folder=root/'fixtures'/'shared-passage-hml-temp-20261110';folder.mkdir(exist_ok=True)
jobs=[('hml',intent['hmlPlan']['tempHmlUrl'],'2089241_J.hml'),('image',intent['hmlPlan']['tempImageUrl'],'2089241_J.png')]
def fetch(job):
    kind,url,name=job;u=urlsplit(url)
    assert u.scheme=='https' and u.hostname=='dev-webhwp.dongahub.com' and u.path.startswith('/webhwpctrl/get/') and not u.query
    with urllib.request.urlopen(url,timeout=20) as response:data=response.read(3_000_001);status=response.status;ctype=response.headers.get('Content-Type')
    assert len(data)<3_000_000
    path=folder/name;path.write_bytes(data)
    row={'kind':kind,'url':url,'path':str(path.relative_to(root)),'httpStatus':status,'contentType':ctype,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
    if kind=='image':row['dimensions']=Image.open(path).size
    else:
        import xml.etree.ElementTree as ET
        assert b'<!DOCTYPE' not in data.upper() and b'<!ENTITY' not in data.upper()
        tree=ET.fromstring(data);text=''.join(tree.itertext());row['markerPresent']='[QA-SHARED-HML-20261110]' in text;row['originalTextPresent']='다음 행렬의 꼴을 말하시오.' in text
        assert row['markerPresent'] and row['originalTextPresent']
    return row
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:rows=list(pool.map(fetch,jobs))
(root/'shared-passage-hml-temp-results-20261110.json').write_text(json.dumps({'evidence':[2320,2324,2325,2328],'results':rows,'masterCommitPending':True},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(rows,ensure_ascii=False))
