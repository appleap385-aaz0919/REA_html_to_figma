"""Keep the first actual four-child HML set and following single, preserving styles and resources."""
import hashlib,json,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent
original=root/'fixtures/hml596-original-20261109.hml';target=root/'fixtures/QA-HML-20261109-02-SET4-SINGLE1.hml';intent_path=root/'hml-qa-set-intent.json'
assert original.exists() and not target.exists() and not intent_path.exists(),'Prepared data already exists; inspect before any replay.'
raw=original.read_bytes();assert len(raw)==121524 and hashlib.sha256(raw).hexdigest()=='1fa517fcce8f13faf5f5b7f738884ddc05f0f77c49712dd8c3598b097fdb1c6b' and b'<!DOCTYPE' not in raw and b'<!ENTITY' not in raw
xml=ET.fromstring(raw);body=xml.find('BODY');assert len(body)==1
section=body[0];paragraphs=list(section)
starts=[i for i,p in enumerate(paragraphs) if '(세트 문항 시작)' in ''.join(e.text or '' for e in p.iter('CHAR'))]
assert starts[:2]==[0,45]
for p in paragraphs[starts[1]:]:section.remove(p)
text=' '.join(e.text or '' for e in xml.iter('CHAR'))
expected={'(세트 문항 시작)':1,'(세트 문항 끝)':1,'(지문)':1,'(문제)':5,'(정답)':5}
assert all(text.count(marker)==count for marker,count in expected.items())
out=b'\xef\xbb\xbf<?xml version="1.0" encoding="UTF-8"?>\n'+ET.tostring(xml,encoding='utf-8',xml_declaration=False)
ET.fromstring(out);target.write_bytes(out)
intent={'scope':'dev-exambank.dongahub.com only','authorization':'User explicitly permits development CMS changes and real manipulation.','status':'prepared_not_submitted','operation':'Register a bounded real set fixture, then select the entire own four-child set D while keeping its own single S and inspect approval/paper/shared-passage effects.','originalDocumentId':596,'originalReadEvidence':[2054,2055,2057],'originalFileSha256':hashlib.sha256(raw).hexdigest(),'file':str(target.relative_to(root)),'fileBytes':len(out),'fileSha256':hashlib.sha256(out).hexdigest(),'contentChanges':['Preserved HEAD styles, section0 initial page definition and TAIL resources.','Retained direct SECTION children0..44; removed children45..304 starting at the second set marker.','Re-serialized XML with UTF-8 BOM; no text/math content within retained paragraphs changed.','No DTD/entity resolution, external fetch or document code execution.'],'validatedLocalMarkers':expected,'expectedCurrentStructure':'One shared-passage set with4children plus one single; verify actual newly created IDs before review.','plannedMetadata':{'productId':'133','sourceCode':'22-H-MA-C1-1-0-DCL-KI-2025','unitCode':'22HMAC1GHG1006010000','startPageNum':'1','endPageNum':'1','serviceUsage':'C'},'metadataRationale':'Observed actual original unit is commonMath1/high1/matrix meaning. Use active source133 for matching commonMath1/high1 rather than original sourceA0.','laterReview':'Own set D and own single S, paperRegY; final approval only after fresh actual ID mapping and intent update.','confirmedMasterOperationsBefore':31,'serviceDeployment':False}
intent_path.write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
report={'originalDocument':596,'originalBytes':len(raw),'originalQuestionMarkers':35,'originalSetPairs':10,'retainedSectionParagraphs':len(section),'newBytes':len(out),'newHash':intent['fileSha256'],'markers':expected,'firstText':text[:1400]}
(root/'hml596-small-set-fixture-20261109.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:intent[k] for k in ['status','file','fileBytes','fileSha256','validatedLocalMarkers','plannedMetadata']},ensure_ascii=False))
