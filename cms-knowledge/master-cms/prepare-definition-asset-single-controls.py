import copy,hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
cases=[('body1','QA-DIFI-20261110-09-BODY1.zip','2116111102.json'),('choice1','QA-DIFI-20261110-10-CHOICE1.zip','2116111122.json'),('short1','QA-DIFI-20261110-11-SHORT1.zip','2116111142.json')]
for slug,name,member in cases:
 dest=root/'fixtures'/name
 with zipfile.ZipFile(root/'fixtures/QA-DIFI-20261110-05-ASSET3.zip') as source:
  raw=source.read(member);q=json.loads(raw)
  images=[r['resource']['file']['filePath'] for r in q['questionResources']]
  members=[member,*images]
  assert len(members)==len(set(members)) and all(n in source.namelist() for n in members)
  originalBytes={n:source.read(n) for n in members}
  originalInfo={n:copy.copy(source.getinfo(n)) for n in members}
 if not dest.exists():
  with zipfile.ZipFile(dest,'w') as z:
   for n in members:z.writestr(originalInfo[n],originalBytes[n])
 with zipfile.ZipFile(dest) as z:
  assert z.testzip() is None and z.namelist()==members
  assert all(z.read(n)==originalBytes[n] for n in members),'Preserve unexpected existing archive for inspection; never overwrite'
 sha=hashlib.sha256(dest.read_bytes()).hexdigest();size=dest.stat().st_size
 i={'schemaVersion':1,'status':'prepared_not_uploaded','scopeHost':'dev-exambank.dongahub.com','operation':'Register one JSON and only its referenced image resources through normal UI','file':'fixtures/'+name,'fileBytes':size,'fileSha256':sha,'sourceFile':'fixtures/QA-DIFI-20261110-05-ASSET3.zip','members':members,'membersByteIdenticalToAsset3':True,'jsonMembers':1,'pngMembers':len(images),'inputType':q['questionType'],'expectedItemCountBeforeExecution':1,'actualItemCount':None,'plannedMetadata':{'productId':'13','unitCode':'22MMAT0KOK1001020000','startPageNum':'1','endPageNum':'3','serviceUsage':'C'},'metadataRationale':'Keep same normal registration metadata as three successful single-type controls; not a claim of correct academic unit assignment.','sourceAsset3EverUploaded':False,'approvalIncluded':False,'serviceDeployment':False,'submitRule':'Verify exact file SHA/form values; submit once. Reconcile filename/document before any retry.'}
 (root/f'definition-{slug}-control-intent-20261110.json').write_text(json.dumps(i,indent=2),encoding='utf8')
 for old,suffix in [('definition-multi3-submit-once.js','submit-once'),('definition-multi3-before-submit-verify.js','before-submit-verify')]:
  s=(root/'sources/runtime'/old).read_text(encoding='utf8').replace('QA-DIFI-20261110-04-MULTI3.zip',name).replace('2860',str(size)).replace('e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171',sha).replace('__qaDifiMulti3','__qaDifi'+slug.title())
  (root/f'sources/runtime/definition-{slug}-{suffix}.js').write_text(s,encoding='utf8')
 print(json.dumps({'file':name,'bytes':size,'sha256':sha,'json':1,'png':len(images),'memberBytesUnchanged':True}))
