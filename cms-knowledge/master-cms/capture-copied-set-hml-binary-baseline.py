import concurrent.futures,hashlib,json,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent
def obs(n):return json.loads((root/'evidence'/n).read_text(encoding='utf8'))['action']['data']['result']
original=obs('2924-copy-hml-isolation-originals-before.json')['items'][0]
copy=obs('2926-copy-hml-isolation-copy-file-refs-before.json')['items'][0]
image=next(i['src'] for i in original['images'] if '/passage/208/2089241/1966/' in i['src'])
hml=next(i['url'] for i in copy['slots'] if i['slot']=='passage')
expectedPrefix='https://dev-items.douclass.com/itembank/passage/208/2089241/1966/'
assert hml==expectedPrefix+'hml/2089241_P.hml' and image==expectedPrefix+'image/2089241_P.png'
folder=root/'fixtures/copied-set-hml-isolation-20261110';folder.mkdir(exist_ok=True)
def get(pair):
 kind,url=pair
 with urllib.request.urlopen(url,timeout=20) as r:
  data=r.read(10000001);assert len(data)<=10000000
  sha=hashlib.sha256(data).hexdigest();p=folder/('before-original-shared.'+('hml' if kind=='hml' else 'png'))
  if p.exists():assert p.read_bytes()==data,'Never replace a different baseline file'
  else:p.write_bytes(data)
  out={'kind':kind,'url':url,'status':r.status,'bytes':len(data),'sha256':sha,'localFile':p.relative_to(root).as_posix()}
  if kind=='hml':
   doc=ET.fromstring(data);text=' '.join(e.text for e in doc.iter() if e.tag.rsplit('}',1)[-1]=='CHAR' and e.text)
   out.update(text=text,containsOriginalHmlMarker='[QA-SHARED-HML-20261110]' in text,containsCopyHmlMarker='[QA-COPY-SHARED-HML-20261110]' in text)
  return out
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as p:rows=list(p.map(get,[('hml',hml),('png',image)]))
out={'source':'Read-only GETs of exact observed own original/copy-aliased development assets; no cookies/authentication headers','beforeEvidence':[2924,2926],'assets':rows}
(root/'copied-set-hml-binary-baseline-20261110.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(out,ensure_ascii=False))
