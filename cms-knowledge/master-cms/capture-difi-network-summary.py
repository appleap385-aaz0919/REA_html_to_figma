"""Keep request identifiers/statuses only; never retain request headers or bodies."""
import json, subprocess
from pathlib import Path
from urllib.parse import urlsplit
root=Path(__file__).resolve().parent
c=json.loads((root/'agent-browser-session.json').read_text(encoding='utf8'))
args=[c['executable'],'--session',c['session'],'--cdp',c['cdp'],'--pin-tab','--no-auto-dialog','--json','network','requests','--filter','/item/difi/']
p=subprocess.run(args,capture_output=True,encoding='utf8',errors='replace',timeout=50)
r=json.loads(p.stdout)
if not r.get('success'): raise SystemExit('Network listing failed; no raw result retained')
data=r.get('data') or {}
rows=data.get('requests',[]) if isinstance(data,dict) else data
if not isinstance(rows,list): raise SystemExit('Unexpected network data shape')
baseline=json.loads((root/'definition-multi3-network-baseline-20261110.json').read_text(encoding='utf8'))
old={x['requestId'] for x in baseline['requests']}
result=[]
for x in rows:
 u=urlsplit(x.get('url',''))
 if x.get('requestId') not in old and u.hostname=='dev-exambank.dongahub.com' and u.path.startswith('/item/difi/'):
  result.append({k:x.get(k) for k in ('requestId','method','resourceType','status','timestamp')}|{'urlWithoutQuery':u.scheme+'://'+u.netloc+u.path})
integrity=json.loads((root/'evidence/2668-definition694-upload-integrity-read.json').read_text(encoding='utf8'))['action']['data']['result']
key=integrity['fileUrlWithoutQuery']
assert key.startswith('/exam/694/') and key.endswith('.zip')
p2=subprocess.run(args[:-1]+[key],capture_output=True,encoding='utf8',errors='replace',timeout=50)
r2=json.loads(p2.stdout)
if not r2.get('success'): raise SystemExit('Own file network listing failed; no raw result retained')
data2=r2.get('data') or {}
rows2=data2.get('requests',[]) if isinstance(data2,dict) else data2
put=[]
for x in rows2:
 u=urlsplit(x.get('url',''))
 if x.get('method')=='PUT' and u.path==key:
  put.append({k:x.get(k) for k in ('requestId','method','resourceType','status','timestamp')}|{'filePath':u.path})
out={'source':'Passive agent-browser network listing; headers/bodies/query values discarded','baseline':'definition-multi3-network-baseline-20261110.json','requests':result,'ownFilePutRequests':put}
(root/'definition-multi3-network-result-20261110.json').write_text(json.dumps(out,indent=2),encoding='utf8')
print(json.dumps(out))
