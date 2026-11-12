"""Download only four declared public development assets; do not read browser credentials."""
import concurrent.futures,hashlib,json,urllib.request
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parent
e=json.loads((root/'evidence/3202-own-copy239-explanation-file-slot-baseline.json').read_text(encoding='utf-8'))['action']['data']['result']
assert e['owner']['itemId']=='2089239' and e['owner']['itemDetailId']=='2089019'
images={i['alt']:i['src'] for i in e['images']};slots={i['slot']:i['path'] for i in e['slots']}
base=images['해답'].split('/item/')[0];assert base=='https://dev-items.douclass.com/itembank'
jobs=[('question.hml',base+slots['question']),('question.png',images['문제']),('explain.hml',base+slots['explain']),('explain.png',images['해답'])]
folder=root/'fixtures/explanation239-copy-isolation-20261110';folder.mkdir(exist_ok=True)
manifest=root/'explanation239-original216-binary-baseline-20261110.json'
assert not manifest.exists()
for role,url in jobs:
 u=urlsplit(url);assert u.scheme=='https' and u.hostname=='dev-items.douclass.com' and u.path.startswith('/itembank/item/208/2089216/2088849/') and not u.query
 assert not (folder/('before-original216-'+role)).exists()
def get(job):
 role,url=job
 with urllib.request.urlopen(url,timeout=20) as r:
  data=r.read();status=r.status;ctype=r.headers.get_content_type()
 assert status==200
 target=folder/('before-original216-'+role);target.write_bytes(data)
 row={'role':role,'url':url,'httpStatus':status,'contentType':ctype,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'file':str(target.relative_to(root)).replace('\\','/')}
 if role.endswith('.hml'):
  doc=ET.fromstring(data);row['charTexts']=[''.join(n.itertext()) for n in doc.iter() if n.tag.split('}')[-1]=='CHAR']
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(get,jobs))
manifest.write_text(json.dumps({'schemaVersion':1,'sourceEvidence':3202,'method':'Credential-free GET of declared development CDN assets; no cookies or response authentication headers retained','assets':rows},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'manifest':manifest.name,'assets':[{k:r[k] for k in ['role','bytes','sha256']} for r in rows]},ensure_ascii=False))
