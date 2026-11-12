import concurrent.futures,hashlib,json,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent
d=json.loads((root/'evidence/2967-copy-hml-selected-draft9093-actual-assets-read.json').read_text(encoding='utf8'))['action']['data']['result']
hml=next(s['url'] for s in d['slots'] if s['slot']=='passage');png=d['sharedImages'][0]
prefix='https://dev-items.douclass.com/itembank/passage/208/2089357/2005/'
assert hml==prefix+'hml/2089357_P.hml' and png==prefix+'image/2089357_P.png'
baseline=json.loads((root/'copied-set-hml-binary-baseline-20261110.json').read_text(encoding='utf8'))
originalText=next(a['text'] for a in baseline['assets'] if a['kind']=='hml')
marker='[QA-COPY-SHARED-HML-20261110]';expected=' '.join((marker+' '+originalText).split())
folder=root/'fixtures/copied-set-hml-isolation-20261110'
def get(pair):
 kind,url=pair
 with urllib.request.urlopen(url,timeout=20) as r:
  data=r.read(10000001);assert len(data)<=10000000
  dest=folder/('after-temp-copy.'+('hml' if kind=='hml' else 'png'))
  if dest.exists():assert dest.read_bytes()==data,'Do not replace a different stage file'
  else:dest.write_bytes(data)
  out={'kind':kind,'url':url,'status':r.status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'localFile':dest.relative_to(root).as_posix()}
  if kind=='hml':
   doc=ET.fromstring(data);text=' '.join(e.text for e in doc.iter() if e.tag.rsplit('}',1)[-1]=='CHAR' and e.text)
   out.update(text=text,copyMarkerCount=text.count(marker),equalsMarkerPlusOriginalWords=' '.join(text.split())==expected)
  return out
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as p:rows=list(p.map(get,[('hml',hml),('png',png)]))
assert rows[0]['copyMarkerCount']==1 and rows[0]['equalsMarkerPlusOriginalWords']
out={'stage':'after CMS Temp Save; draft9093, current copy remains9078','evidence':2967,'assets':rows}
(root/'copied-set-hml-temp-draft-binaries-20261110.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(out,ensure_ascii=False))
