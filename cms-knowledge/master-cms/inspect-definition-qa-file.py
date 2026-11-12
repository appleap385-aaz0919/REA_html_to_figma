"""Decode the scoped read-only proxy response and inventory ZIP members without extraction."""
import base64,hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
evidence='1895-definition530-proxy-file-read'
result=json.loads((root/'evidence'/f'{evidence}.json').read_text(encoding='utf-8'))['action']['data']['result']
assert result['status']==200 and result['magic'][:2]==[80,75]
body=base64.b64decode(result['fileBase64'],validate=True)
assert len(body)==result['size'] and hashlib.sha256(body).hexdigest()==result['sha256']
target=root/'fixtures'/'definition530-original-20261109.zip'
assert not target.exists(),'Do not overwrite an existing download'
target.write_bytes(body)
with zipfile.ZipFile(target) as archive:
    members=[{'name':i.filename,'bytes':i.file_size,'compressed':i.compress_size,'directory':i.is_dir()} for i in archive.infolist()]
    data=[]
    for item in archive.infolist():
        if item.filename.lower().endswith('.json') and item.file_size<2*1024*1024:
            value=json.loads(archive.read(item))
            data.append({'member':item.filename,'type':type(value).__name__,'keys':list(value) if isinstance(value,dict) else None,'length':len(value) if isinstance(value,(dict,list)) else None})
report={'evidence':evidence,'http':{k:result[k] for k in ['status','type','redirected','size','sha256']},'file':str(target.relative_to(root)),'members':members,'jsonStructures':data,'safety':'Member bytes read in memory; no archive paths extracted or code executed.'}
(root/'definition530-zip-inventory-20261109.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
