"""Verify final copied A files and original source Q/A assets after normal FullApply."""
import concurrent.futures,hashlib,json,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent
before=json.loads((root/'explanation239-original216-binary-baseline-20261110.json').read_text(encoding='utf-8'))
vendor=json.loads((root/'explanation239-editor-temp-and-original-binaries-20261110.json').read_text(encoding='utf-8'))
current=json.loads((root/'evidence/3248-own-copy239-after-explanation-current-edit-refs.json').read_text(encoding='utf-8'))['action']['data']['result']
assert current['owner']['itemId']=='2089239' and current['owner']['itemDetailId']=='2089104'
slots={x['slot']:x['path'] for x in current['slots']};assert slots['question']=='/item/208/2089216/2088849/hml/2089216_Q.hml' and slots['explain']=='/item/208/2089239/2089104/hml/2089239_A.hml' and not slots['passage'] and not slots['translation']
images={x['alt']:x['src'] for x in current['images']};base='https://dev-items.douclass.com/itembank';assert images['해답']==base+'/item/208/2089239/2089104/image/2089239_A.png'
out=root/'explanation239-published-and-original-binaries-20261110.json';assert not out.exists();folder=root/'fixtures/explanation239-copy-isolation-20261110'
jobs=[{'role':'original.'+a['role'],'url':a['url'],'file':'after-fullapply-original216-'+a['role'],'expectedSha256':a['sha256']} for a in before['assets']]
vm={x['role']:x for x in vendor['assets']}
jobs.extend([{'role':'published.explain.hml','url':base+slots['explain'],'file':'after-fullapply-copy239-explain.hml','expectedSha256':vm['vendor.explain.hml']['sha256']},{'role':'published.explain.png','url':images['해답'],'file':'after-fullapply-copy239-explain.png','expectedSha256':vm['vendor.explain.png']['sha256']}])
for j in jobs:assert not (folder/j['file']).exists()
def get(j):
 with urllib.request.urlopen(j['url'],timeout=20) as r:data=r.read();status=r.status;ctype=r.headers.get_content_type()
 assert status==200
 f=folder/j['file'];f.write_bytes(data);sha=hashlib.sha256(data).hexdigest()
 return {'role':j['role'],'url':j['url'],'httpStatus':status,'contentType':ctype,'bytes':len(data),'sha256':sha,'expectedSha256':j['expectedSha256'],'bytesExactlyEqualExpected':sha==j['expectedSha256'],'file':str(f.relative_to(root)).replace('\\','/')}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(get,jobs))
checks={'allFourOriginalAssetsExactlyEqualBefore':all(x['bytesExactlyEqualExpected'] for x in rows if x['role'].startswith('original.')),'bothPublishedCopyExplanationAssetsExactlyEqualVendor':all(x['bytesExactlyEqualExpected'] for x in rows if x['role'].startswith('published.')),'otherThreeHmlSlotsExactlyPreserved':True}
out.write_text(json.dumps({'schemaVersion':1,'stage':'after_direct_cms_fullapply','sourceEvidence':3248,'assets':rows,'checks':checks,'method':'Credential-free GET of declared development CDN files; no browser credentials retained'},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'manifest':out.name,'checks':checks,'publishedAssets':[{k:x[k] for k in ['role','bytes','sha256']} for x in rows if x['role'].startswith('published.')]},ensure_ascii=False))
