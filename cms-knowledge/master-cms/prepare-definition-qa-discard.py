"""Prepare separate QA data and a reviewed UI plan for the discard branch."""
import hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
target=root/'fixtures'/'QA-DIFI-20261109-02-DISCARD.zip'
intent_path=root/'definition-qa-discard-intent.json'
assert not target.exists() and not intent_path.exists(),'Already prepared; inspect current state instead of replaying.'
with zipfile.ZipFile(root/'fixtures'/'definition530-original-20261109.zip') as archive:value=json.loads(archive.read('750774.json'))
value['questionId']=2116110911;value['masterId']='2116110911'
value['questionGrading']['questionGradingId']=2116110912
value['questionGrading']['questionCorrects'][0]['questionCorrectId']=2116110913
value['questionContent']=value['questionContent'].replace('<d-question>','<d-question><p>[QA-DIFI-20261109-02-DISCARD]</p>',1)
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED) as archive:archive.writestr('2116110911.json',json.dumps(value,ensure_ascii=False,separators=(',',':')))
intent={'scope':'dev Master only','authorization':'User explicitly authorized development CMS data changes and actual manipulation.','status':'prepared_not_submitted','operation':'Register second isolated QA document, then submit its actual discard with a clear reason and inspect retained/deleted data.','file':str(target.relative_to(root)),'fileBytes':target.stat().st_size,'fileSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'marker':'[QA-DIFI-20261109-02-DISCARD]','plannedMetadata':{'productId':'69','unitCode':'22EMAT0NGS31','startPageNum':'2','endPageNum':'3','serviceUsage':'T'},'discardReason':'QA-DIFI-20261109-02-DISCARD: isolated development test of final document discard.','originalDocumentId':530,'originalOrExistingItemsToDiscard':False,'serviceDeployment':False,'confirmedOperationsBefore':26}
intent_path.write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
plan=json.loads((root/'scenarios'/'definition-qa-import-prepare.json').read_text(encoding='utf-8'))
for no,step in enumerate(plan['steps'],1955):
    step['label']=str(no)+'-definition-qa-discard-'+step['label'].split('-',1)[1].replace('definition-qa-','')
    if step['command'][0]=='upload':step['command'][2]=target.as_posix()
    if step['command'][:2]==['fill','input[name=startPageNum]']:step['command'][2]='2'
    if step['command'][:2]==['fill','input[name=endPageNum]']:step['command'][2]='3'
    if step['command'][:2]==['select','select[name=serviceUsage]']:step['command'][2]='T'
(root/'scenarios'/'definition-qa-discard-prepare.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:intent[k] for k in ['status','file','fileBytes','fileSha256','plannedMetadata']},ensure_ascii=False))
