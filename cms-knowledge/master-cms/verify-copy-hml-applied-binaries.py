import concurrent.futures,hashlib,json,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent
def obs(n):return json.loads((root/'evidence'/n).read_text(encoding='utf8'))['action']['data']['result']
refs=obs('2987-copy-hml-fullapply-copy-file-refs-after.json')['items'][0]
detail=obs('2986-copy-hml-fullapply-copies-after.json')['items'][0]
hml=next(s['url'] for s in refs['slots'] if s['slot']=='passage');png=next(i['src'] for i in detail['images'] if '/passage/208/2089357/' in i['src'])
prefix='https://dev-items.douclass.com/itembank/passage/208/2089357/'
assert hml.startswith(prefix) and png.startswith(prefix)
temp=json.loads((root/'copied-set-hml-temp-draft-binaries-20261110.json').read_text(encoding='utf8'))
old={i['kind']:i for i in temp['assets']}
def get(pair):
 kind,url=pair
 with urllib.request.urlopen(url,timeout=20) as r:
  data=r.read(10000001);assert len(data)<=10000000
  prior=(root/old[kind]['localFile']).read_bytes()
  out={'kind':kind,'url':url,'status':r.status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'sameUrlAsTempDraft':url==old[kind]['url'],'sameBytesAsTempDraft':data==prior}
  if kind=='hml':
   doc=ET.fromstring(data);text=' '.join(e.text for e in doc.iter() if e.tag.rsplit('}',1)[-1]=='CHAR' and e.text);out.update(text=text,copyMarkerCount=text.count('[QA-COPY-SHARED-HML-20261110]'));assert out['copyMarkerCount']==1
  return out
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as p:rows=list(p.map(get,[('hml',hml),('png',png)]))
out={'stage':'after saved-draft FullApply to four copy children','evidence':[2986,2987],'allBytesEqualTempDraft':all(r['sameBytesAsTempDraft'] for r in rows),'assets':rows}
dest=root/'copied-set-hml-applied-binaries-20261110.json';assert not dest.exists();dest.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(out,ensure_ascii=False))
