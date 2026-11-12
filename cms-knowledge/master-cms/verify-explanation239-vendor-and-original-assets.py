"""Read declared CDN/vendor files after editor Save, before any CMS commit."""
import concurrent.futures,hashlib,json,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
root=Path(__file__).resolve().parent
baseline=json.loads((root/'explanation239-original216-binary-baseline-20261110.json').read_text(encoding='utf-8'))
scope=json.loads((root/'evidence/3236-own-copy239-explanation-vendor-url-scope-read.json').read_text(encoding='utf-8'))['action']['data']['result']
assert not scope['editorModified'] and {v['slot'] for v in scope['pending']}=={'explain.hml','explain.image'}
out=root/'explanation239-editor-temp-and-original-binaries-20261110.json';assert not out.exists()
folder=root/'fixtures/explanation239-copy-isolation-20261110';jobs=[]
for a in baseline['assets']:jobs.append({'role':'original.'+a['role'],'url':a['url'],'file':'after-editor-save-original216-'+a['role'],'baselineSha256':a['sha256']})
for a in scope['pending']:
 assert not a['hasQuery'] and a['origin']=='https://dev-webhwp.dongahub.com' and a['path'].startswith('/webhwpctrl/get/')
 role='explain.hml' if a['slot']=='explain.hml' else 'explain.png'
 jobs.append({'role':'vendor.'+role,'url':a['valueWithoutQuery'],'file':'vendor-temp-'+role})
for j in jobs:assert not (folder/j['file']).exists()
def get(j):
 with urllib.request.urlopen(j['url'],timeout=20) as r:data=r.read();status=r.status;ctype=r.headers.get_content_type()
 assert status==200
 target=folder/j['file'];target.write_bytes(data)
 row={'role':j['role'],'url':j['url'],'httpStatus':status,'contentType':ctype,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'file':str(target.relative_to(root)).replace('\\','/')}
 if 'baselineSha256' in j:row['bytesExactlyEqualBaseline']=row['sha256']==j['baselineSha256']
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(get,jobs))
def xml_parts(path):
 d=ET.fromstring(path.read_bytes())
 return {tag:[''.join(n.itertext()) for n in d.iter() if n.tag.split('}')[-1]==tag] for tag in ['CHAR','SCRIPT']}
old=xml_parts(folder/'before-original216-explain.hml');new=xml_parts(folder/'vendor-temp-explain.hml');marker='[QA-EXPLANATION-HML-20261110] '
checks={'allFourOriginalAssetsExactlyUnchanged':all(r['bytesExactlyEqualBaseline'] for r in rows if r['role'].startswith('original.')),'explanationEquationScriptsExactlyEqual':old['SCRIPT']==new['SCRIPT'],'equationScriptCountBefore':len(old['SCRIPT']),'equationScriptCountAfter':len(new['SCRIPT']),'charTextOnlyAddedOnePrefix':''.join(new['CHAR'])==marker+''.join(old['CHAR']),'newMarkerCountInCharText':''.join(new['CHAR']).count(marker)}
out.write_text(json.dumps({'schemaVersion':1,'stage':'editor_vendor_save_before_cms_commit','assets':rows,'checks':checks,'method':'Credential-free GET of declared development CDN/vendor files. No browser credentials or authentication response headers retained.'},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'manifest':out.name,'checks':checks,'assets':[{k:r[k] for k in ['role','bytes','sha256']} for r in rows]},ensure_ascii=False))
