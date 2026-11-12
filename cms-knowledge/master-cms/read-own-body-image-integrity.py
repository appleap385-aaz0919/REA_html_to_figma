import hashlib,json,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parent
url='https://dev-items.douclass.com/itembank/item/208/2089378/2089085/asset/image-1.png'
out={'source':'Read-only GET of exact observed rendered own QA image; no cookies/authentication headers','url':url}
try:
 with urllib.request.urlopen(url,timeout=15) as response:
  data=response.read(100001)
  assert len(data)<=100000,'Unexpected image size'
  original=(root/'fixtures/definition-asset3-source-pixels-20261110/750396_body_resource10692.png').read_bytes()
  out.update(success=True,status=response.status,bytes=len(data),sha256=hashlib.sha256(data).hexdigest(),equalsOriginalSourceBytes=data==original)
except Exception as e:out.update(success=False,errorType=type(e).__name__)
(root/'definition698-image-integrity-20261110.json').write_text(json.dumps(out,indent=2),encoding='utf8')
print(json.dumps(out))
