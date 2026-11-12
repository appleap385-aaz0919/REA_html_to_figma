"""Prepare a structurally valid but content-empty ZIP for actual server parsing verification."""
import hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
target=root/'fixtures'/'QA-DIFI-20261109-03-EMPTY.zip'
intent_path=root/'definition-qa-empty-intent.json'
assert not target.exists() and not intent_path.exists(),'Already prepared; inspect instead of replaying.'
with zipfile.ZipFile(target,'w'):pass
intent={'scope':'dev Master only','authorization':'User explicitly authorizes development CMS changes and real manipulation.','status':'prepared_not_submitted','operation':'Submit a valid ZIP container with zero members once to observe server parsing failure; no existing record is edited.','file':str(target.relative_to(root)),'fileBytes':target.stat().st_size,'fileSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'archiveMembers':0,'plannedMetadata':{'productId':'69','unitCode':'22EMAT0NGS31','startPageNum':'1','endPageNum':'1','serviceUsage':'C'},'confirmedMasterOperationsBefore':28,'serviceDeployment':False}
intent_path.write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
plan=json.loads((root/'scenarios'/'definition-qa-import-prepare.json').read_text(encoding='utf-8'))
for no,step in enumerate(plan['steps'],1980):
    step['label']=str(no)+'-definition-qa-empty-'+step['label'].split('-',1)[1].replace('definition-qa-','')
    if step['command'][0]=='upload':step['command'][2]=target.as_posix()
(root/'scenarios'/'definition-qa-empty-prepare.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:intent[k] for k in ['status','file','fileBytes','fileSha256','archiveMembers']},ensure_ascii=False))
