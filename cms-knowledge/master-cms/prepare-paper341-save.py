"""Prepare an explicitly scoped reversible paper save; does not contact the CMS."""
import json
from pathlib import Path
r=Path(__file__).resolve().parent
before=json.loads((r/'evidence/1716-paper341-save-before-fields.json').read_text(encoding='utf-8'))['action']['data']['result']
fields=before['fields'];byname=lambda n:next(f['value'] for f in fields if f['name']==n and (f['type']!='radio' or f['checked']))
assert byname('paperId')=='341' and byname('startPageNum')=='2' and byname('endPageNum')=='22' and byname('viewFlag')=='R' and byname('serviceUsage')=='T'
ids=[f['value'] for f in fields if f['name']=='itemIds'];assert ids==['2087755','2087758','2087759','2087760']
assert len(json.loads((r/'mutation-ledger.json').read_text(encoding='utf-8'))['entries'])==20
expected={'paperId':'341','paperName':byname('paperName')+' [QA-PAPER-20261109]','startPageNum':'3','endPageNum':'22','viewFlag':'R','serviceUsage':'T'}
intent={'status':'planned_not_submitted','authorization':'User explicitly permits development CMS edits to investigate all policies.','paperId':341,'beforeDetailId':374,'beforeEvidence':[1714,1716,1717],'before':before,'planned':expected,'itemIds':ids,'restorationRequired':True,'restoreValues':{n:byname(n) for n in expected},'restoreItemIds':ids}
(r/'paper341-save-intent.json').write_text(json.dumps(intent,ensure_ascii=False,indent=2),encoding='utf-8')
script='''(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/modify.donga')throw Error('Scope mismatch');
 const f=document.querySelector('#paperModifyForm');if(!f||new URL(f.action).pathname!=='/paper/update.donga')throw Error('Unexpected paper form');
 const expected=EXPECTED;
 for(const [name,value] of Object.entries(expected)){const e=f.querySelector('input[name="'+name+'"]'+(['viewFlag','serviceUsage'].includes(name)?':checked':''));if(!e||e.value!==value)throw Error('Unexpected '+name);}
 const ids=[...f.querySelectorAll('input[name=itemIds]')].map(e=>e.value);if(JSON.stringify(ids)!==JSON.stringify(IDS))throw Error('Member list changed');
 if(!f.checkValidity())throw Error('Invalid paper form');const b=f.querySelector('[data-paper-save]');if(!b||b.disabled)throw Error('Save unavailable');b.click();return {action:'Actual Save through observed paper Save control',expected,itemIds:ids};
})()'''.replace('EXPECTED',json.dumps(expected,ensure_ascii=True)).replace('IDS',json.dumps(ids))
(r/'sources/runtime/paper341-submit-isolated-test.js').write_text(script,encoding='utf-8')
steps=[('1718-paper341-test-name-input',['fill','input[name=paperName]',expected['paperName']]),('1719-paper341-test-start-page3',['fill','input[name=startPageNum]','3']),('1720-paper341-test-values',['eval','--file','sources/runtime/paper-form-observation.js']),('1721-paper341-test-save-submit',['eval','--file','sources/runtime/paper341-submit-isolated-test.js']),('1722-paper341-test-save-readback',['snapshot']),('1723-paper341-test-save-detail-values',['eval','--file','sources/runtime/paper-detail-observation.js']),('1724-paper341-test-save-detail-source',['eval','--file','sources/runtime/sanitized-page-source.js'])]
(r/'scenarios/paper341-save-submit.json').write_text(json.dumps({'steps':[{'label':a,'command':b} for a,b in steps],'tailChars':700},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'paperId':341,'beforeDetailId':374,'operation':'Save temporary name marker and startPage3; restore afterwards','memberCount':len(ids)}))
