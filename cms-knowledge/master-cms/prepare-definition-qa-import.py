"""Prepare an isolated, marked import fixture and intent before any CMS submission."""
import hashlib,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parent
target=root/'fixtures'/'QA-DIFI-20261109-01.zip'
intent=root/'definition-qa-import-intent.json'
assert not target.exists() and not intent.exists(),'Preparation already exists; inspect rather than replay.'
with zipfile.ZipFile(root/'fixtures'/'definition530-original-20261109.zip') as archive:
    value=json.loads(archive.read('750774.json'))
value['questionId']=2116110901
value['masterId']='2116110901'
value['questionGrading']['questionGradingId']=2116110902
value['questionGrading']['questionCorrects'][0]['questionCorrectId']=2116110903
marker='[QA-DIFI-20261109-01]'
assert '<d-question>' in value['questionContent'] and not value['questionResources']
value['questionContent']=value['questionContent'].replace('<d-question>','<d-question><p>'+marker+'</p>',1)
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED) as archive:
    archive.writestr('2116110901.json',json.dumps(value,ensure_ascii=False,separators=(',',':')).encode('utf-8'))
record={
 'scope':'dev-exambank.dongahub.com only',
 'authorization':'User explicitly authorized development CMS data changes and actual manipulation.',
 'operation':'Register a clearly marked isolated Definition ZIP through the existing CMS form, then observe parsing and review states.',
 'status':'prepared_not_submitted',
 'beforeDefinitionCurriculum22Count':15,
 'originalDownloadEvidence':1895,
 'originalDocumentUnchanged':530,
 'file':str(target.relative_to(root)),
 'fileBytes':target.stat().st_size,
 'fileSha256':hashlib.sha256(target.read_bytes()).hexdigest(),
 'changesFromOriginal':['External question/master/grading/correct IDs replaced with distinct positive int32-range QA IDs2116110901/02/03.','Inserted visible QA marker into questionContent; question/answer/explanation schema and remaining original content retained.','No resources, scripts or executable archive members.'],
 'marker':marker,
 'plannedMetadata':{'productId':'69','observedSourceCode':'22-E-MA-T0-3-2-DCL-FB-2025','unitCode':'22EMAT0NGS31','startPageNum':'1','endPageNum':'1','serviceUsage':'C'},
 'metadataRationale':'Copies metadata observed in original document530; source third-grade second-semester and unit third-grade first-semester differ in that existing record. Their consistency is not presumed to be enforced.',
 'submitRule':'Use actual registration button once after fresh verification. On timeout/unclear outcome, inspect file-specific list/state before any retry.',
 'laterApprovalDiscard':'No approval/discard included in this initial submission. Record created document/item identifiers and intent before later review actions.',
 'confirmedMasterOperationsBefore':24,
 'serviceDeploymentPlanned':False
}
intent.write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:record[k] for k in ['status','file','fileBytes','fileSha256','marker','plannedMetadata']},ensure_ascii=False))
