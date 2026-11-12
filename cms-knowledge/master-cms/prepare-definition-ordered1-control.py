"""Preserve one failed MULTI3 member byte-for-byte in an isolated single-member ZIP."""
import hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
name='QA-DIFI-20261110-06-ORDERED1.zip'
member='2116111032.json'
dest=root/'fixtures'/name
assert not dest.exists(),'Never replace an already prepared QA archive'
with zipfile.ZipFile(root/'fixtures/QA-DIFI-20261110-04-MULTI3.zip') as z:
 info=z.getinfo(member);payload=z.read(member)
with zipfile.ZipFile(dest,'w') as z:z.writestr(info,payload)
with zipfile.ZipFile(dest) as z:assert z.namelist()==[member] and z.read(member)==payload and z.testzip() is None
sha=hashlib.sha256(dest.read_bytes()).hexdigest();size=dest.stat().st_size
d={'schemaVersion':1,'status':'prepared_not_uploaded','operation':'Register byte-identical single ORDERED member as a narrow control for failed multi-member Definition694','scopeHost':'dev-exambank.dongahub.com','file':'fixtures/'+name,'fileBytes':size,'fileSha256':sha,'sourceFile':'fixtures/QA-DIFI-20261110-04-MULTI3.zip','member':member,'memberSha256':hashlib.sha256(payload).hexdigest(),'memberByteIdentical':True,'plannedMetadata':{'productId':'13','unitCode':'22MMAT0KOK1001020000','startPageNum':'1','endPageNum':'3','serviceUsage':'C'},'confirmedMasterOperationsBefore':63,'externalIdsReusedFromFailed694':[2116111031,2116111032,2116111033,2116111034],'limits':['Document694 shows no visible items; this does not prove those external IDs were never reserved internally.','If successful, the retained JSON and current metadata are accepted in this single-member context; exact multi-member failure cause remains unresolved.','If failed, reuse/content/current parser differences remain unresolved.'],'submitRule':'Submit once after exact hash/form verification; reconcile issued document and filename before any retry.','approvalIncluded':False,'serviceDeployment':False}
(root/'definition-ordered1-control-intent-20261110.json').write_text(json.dumps(d,indent=2),encoding='utf8')
old=(root/'sources/runtime/definition-multi3-submit-once.js').read_text(encoding='utf8')
new=old.replace('QA-DIFI-20261110-04-MULTI3.zip',name).replace('2860',str(size)).replace('e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171',sha).replace('__qaDifiMulti3','__qaDifiOrdered1')
(root/'sources/runtime/definition-ordered1-submit-once.js').write_text(new,encoding='utf8')
verify=(root/'sources/runtime/definition-multi3-before-submit-verify.js').read_text(encoding='utf8').replace('QA-DIFI-20261110-04-MULTI3.zip',name).replace('2860',str(size)).replace('e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171',sha)
(root/'sources/runtime/definition-ordered1-before-submit-verify.js').write_text(verify,encoding='utf8')
print(json.dumps({'file':name,'bytes':size,'sha256':sha,'memberBytesUnchanged':True}))
