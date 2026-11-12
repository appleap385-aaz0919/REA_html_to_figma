import hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
cases=[('essay1','QA-DIFI-20261110-07-ESSAY1.zip','2116111012.json','ESSAY',2706),('five1','QA-DIFI-20261110-08-FIVE1.zip','2116111022.json','FIVE_CHOICE',2720)]
for slug,name,member,typ,start in cases:
 dest=root/'fixtures'/name
 assert not dest.exists(),'Prepared archive must never be replaced'
 with zipfile.ZipFile(root/'fixtures/QA-DIFI-20261110-04-MULTI3.zip') as z:info=z.getinfo(member);payload=z.read(member)
 with zipfile.ZipFile(dest,'w') as z:z.writestr(info,payload)
 with zipfile.ZipFile(dest) as z:assert z.namelist()==[member] and z.read(member)==payload and z.testzip() is None
 sha=hashlib.sha256(dest.read_bytes()).hexdigest();size=dest.stat().st_size
 intent={'schemaVersion':1,'status':'prepared_not_uploaded','scopeHost':'dev-exambank.dongahub.com','file':'fixtures/'+name,'fileBytes':size,'fileSha256':sha,'sourceFile':'fixtures/QA-DIFI-20261110-04-MULTI3.zip','member':member,'memberSha256':hashlib.sha256(payload).hexdigest(),'memberByteIdentical':True,'inputType':typ,'expectedItemCountBeforeExecution':1,'actualItemCount':None,'plannedMetadata':{'productId':'13','unitCode':'22MMAT0KOK1001020000','startPageNum':'1','endPageNum':'3','serviceUsage':'C'},'plannedSubmitEvidence':None,'approvalIncluded':False,'externalIdsReusedFromFailed694':True,'limits':['694 visible card count0 does not prove no internal ID reservation.','Single-member outcome does not determine full multi-member support or failure cause.'],'serviceDeployment':False}
 (root/f'definition-{slug}-control-intent-20261110.json').write_text(json.dumps(intent,indent=2),encoding='utf8')
 for original,suffix in [('definition-multi3-submit-once.js','submit-once'),('definition-multi3-before-submit-verify.js','before-submit-verify')]:
  s=(root/'sources/runtime'/original).read_text(encoding='utf8').replace('QA-DIFI-20261110-04-MULTI3.zip',name).replace('2860',str(size)).replace('e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171',sha).replace('__qaDifiMulti3','__qaDifi'+slug.title())
  (root/f'sources/runtime/definition-{slug}-{suffix}.js').write_text(s,encoding='utf8')
 commands=[['open','https://dev-exambank.dongahub.com/item/difi/form.donga?curriculum=22&pageNum=1&pageSize=100'],['upload','input.dz-hidden-input',dest.as_posix()],['select','select[name=productId]','13'],['fill','#unitCodeInput','22MMAT0KOK1001020000'],['fill','input[name=startPageNum]','1'],['fill','input[name=endPageNum]','3'],['select','select[name=serviceUsage]','C'],['eval','--file',f'sources/runtime/definition-{slug}-before-submit-verify.js']]
 stages=['form-open','zip-select','source13-select','unit20-fill','start-page-fill','end-page-fill','common-purpose-select','before-submit-verified']
 plan={'steps':[{'label':f'{start+i}-definition-{slug}-{stage}','command':cmd} for i,(cmd,stage) in enumerate(zip(commands,stages))],'tailChars':80}
 (root/f'scenarios/definition-{slug}-register-prepare.json').write_text(json.dumps(plan,indent=2),encoding='utf8')
 print(json.dumps({'file':name,'bytes':size,'sha256':sha,'memberByteIdentical':True}))
