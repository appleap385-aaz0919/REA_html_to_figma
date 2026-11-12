"""Prepare reversible Sortable API + actual Save probe, without HTTP calls."""
import json
from pathlib import Path
r=Path(__file__).resolve().parent
def read(n):return json.loads((r/n).read_text(encoding='utf-8'))
def write(n,o):(r/n).write_text(json.dumps(o,ensure_ascii=False,indent=2),encoding='utf-8')
assert len(read('mutation-ledger.json')['entries'])==22
old=['2087755','2087758','2087759','2087760'];new=['2087758','2087759','2087760','2087755']
metadata=read('paper341-save-intent.json')['restoreValues']
write('paper341-sort-intent.json',{'status':'planned_not_submitted','paperId':341,'beforeDetailId':1096,'beforeEvidence':[1735,1739,1740,1741],'inputMethod':'Observed Sortable public sort API and registered onEnd callback, followed by actual Save button. Direct drag timed out and remains unverified.','beforeOrder':old,'plannedOrder':new,'metadata':metadata,'restoreOrder':old,'restorationRequired':True})
script='''(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/modify.donga'||new URL(location.href).searchParams.get('paperId')!=='341')throw Error('Paper341 edit required');
 const t=document.querySelector('#paperItemTable'),before=[...t.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId);
 if(JSON.stringify(before)!==JSON.stringify(BEFORE))throw Error('Unexpected initial member order');
 const s=window.Sortable?.get?.(t);if(!s||typeof s.sort!=='function'||typeof s.option('onEnd')!=='function')throw Error('Observed sorting API unavailable');
 s.sort(s.toArray().slice().reverse(),false);s.option('onEnd').call(s,{from:t,to:t});
 const after=[...t.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId);if(JSON.stringify(after)!==JSON.stringify(AFTER))throw Error('Unexpected reordered members');
 return {inputMethod:'Observed Sortable.sort API and registered onEnd callback; pointer drag remains unverified',before,after,sequences:[...t.querySelectorAll('[data-seq]')].map(e=>e.innerText)};
})()'''.replace('BEFORE',json.dumps(old)).replace('AFTER',json.dumps(new))
(r/'sources/runtime/paper341-sort-api-reverse.js').write_text(script,encoding='utf-8')
submit=(r/'sources/runtime/paper341-restore-original.js').read_text(encoding='utf-8')
old_guard='JSON.stringify('+json.dumps(old)+')';assert old_guard in submit
submit=submit.replace(old_guard,'JSON.stringify('+json.dumps(new)+')').replace('Restore original paper341 metadata through observed Save control','Save reordered paper341 members through observed Save control')
(r/'sources/runtime/paper341-sort-save.js').write_text(submit,encoding='utf-8')
write('scenarios/paper341-sort-save.json',{'steps':[
 {'label':'1742-paper341-sort-public-api-reorder','command':['eval','--file','sources/runtime/paper341-sort-api-reverse.js']},
 {'label':'1743-paper341-sort-reordered-fields','command':['eval','--file','sources/runtime/paper-form-observation.js']},
 {'label':'1744-paper341-sort-save-submit','command':['eval','--file','sources/runtime/paper341-sort-save.js']},
 {'label':'1745-paper341-sort-save-readback','command':['snapshot']},
 {'label':'1746-paper341-sort-save-detail-values','command':['eval','--file','sources/runtime/paper-detail-observation.js']},
 {'label':'1747-paper341-sort-save-detail-source','command':['eval','--file','sources/runtime/sanitized-page-source.js']}],'tailChars':500})
print('Prepared reversible2group reorder/save probe')
