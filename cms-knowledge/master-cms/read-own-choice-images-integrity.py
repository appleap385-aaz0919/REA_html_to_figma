import concurrent.futures,hashlib,json,re,urllib.request,zipfile
from html.parser import HTMLParser
from pathlib import Path
root=Path(__file__).resolve().parent
class Images(HTMLParser):
 def __init__(self):super().__init__();self.ids=[]
 def handle_starttag(self,tag,attrs):
  if tag=='img':self.ids.append(dict(attrs).get('id'))
with zipfile.ZipFile(root/'fixtures/QA-DIFI-20261110-10-CHOICE1.zip') as z:
 q=json.loads(z.read('2116111122.json'))
 original={str(r['resourceId']):z.read(r['resource']['file']['filePath']) for r in q['questionResources']}
parser=Images();parser.feed(q['questionContent'])
observed=json.loads((root/'evidence/2803-definition699-choice-image-load-observation.json').read_text(encoding='utf8'))['action']['data']['result']['images']
assert len(observed)==5 and len(original)==5
def read(img):
 url=img['srcWithoutQuery'];identity=img['id']
 assert re.fullmatch(r'https://dev-items\.douclass\.com/itembank/item/208/2089379/2089086/asset/image-[1-5]\.png',url)
 out={'htmlImageId':identity,'url':url,'displayLoaded':img['complete'] and img['naturalWidth']>0}
 try:
  with urllib.request.urlopen(url,timeout=15) as r:
   data=r.read(100001);assert len(data)<=100000
   out.update(success=True,status=r.status,bytes=len(data),sha256=hashlib.sha256(data).hexdigest(),equalsMatchingSourceResource=data==original[identity])
 except Exception as e:out.update(success=False,errorType=type(e).__name__)
 return out
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(read,observed))
out={'source':'Read-only GETs of exact observed own QA CDN assets; no cookies/authentication headers','browserEvidence':2803,'phase':'draft before approval','inputResourceArrayIds':[str(r['resourceId']) for r in q['questionResources']],'inputHtmlImageIds':parser.ids,'observedHtmlImageIds':[i['id'] for i in observed],'htmlImageOrderPreserved':parser.ids==[i['id'] for i in observed],'allFivePngBytesEqualMatchingSource':all(r.get('equalsMatchingSourceResource',False) for r in rows),'rows':rows}
(root/'definition699-choice-image-integrity-20261110.json').write_text(json.dumps(out,indent=2),encoding='utf8')
print(json.dumps(out))
