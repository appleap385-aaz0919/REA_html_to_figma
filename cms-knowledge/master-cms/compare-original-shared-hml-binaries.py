import concurrent.futures,hashlib,json,re,sys,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parent
stage=sys.argv[1];assert re.fullmatch('[a-z0-9-]+',stage)
baseline=json.loads((root/'copied-set-hml-binary-baseline-20261110.json').read_text(encoding='utf8'))
def get(item):
 assert item['url'].startswith('https://dev-items.douclass.com/itembank/passage/208/2089241/1966/')
 with urllib.request.urlopen(item['url'],timeout=20) as r:
  data=r.read(10000001);assert len(data)<=10000000
  old=(root/item['localFile']).read_bytes()
  return {'kind':item['kind'],'url':item['url'],'status':r.status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'equalsBeforeBytes':data==old,'baselineSha256':item['sha256']}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as p:rows=list(p.map(get,baseline['assets']))
out={'stage':stage,'scope':'Read-only exact original shared HML/PNG URLs captured before copied-file editing','allOriginalBytesUnchanged':all(r['equalsBeforeBytes'] for r in rows),'assets':rows}
dest=root/f'copied-set-hml-original-binaries-{stage}-20261110.json'
assert not dest.exists(),'Never replace an earlier stage comparison'
dest.write_text(json.dumps(out,indent=2),encoding='utf8');print(json.dumps(out))
