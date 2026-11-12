"""Confirm retained save evidence, then prepare restoration; no CMS calls."""
import json,re
from pathlib import Path
r=Path(__file__).resolve().parent
def read(n):return json.loads((r/n).read_text(encoding='utf-8'))
def write(n,o):(r/n).write_text(json.dumps(o,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('paper341-save-intent.json');d=read('evidence/1723-paper341-test-save-detail-values.json')['action']['data']['result'];values={x['label']:x['value'] for x in d['values']}
assert values['평가지명']==intent['planned']['paperName'] and values['페이지']=='3 ~ 22'
assert values['평가지 ID']=='341 (1095)' and values['문항 수']=='4문항'
members=d['tables'][1]['rows'];assert [re.search(r'\d+',t['cells'][1]).group() for t in members]==intent['itemIds']
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==20
ledger['entries'].append({'operation':'Save reversible metadata changes on MOCK paper341','paperId':341,'beforeDetailId':374,'afterDetailId':1095,'submitEvidence':1721,'readbackEvidence':[1722,1723,1724],'submittedValues':intent['planned'],'itemIds':intent['itemIds'],'status':'Confirmed by success message, detail fields and member readback. Restoration pending.'});write('mutation-ledger.json',ledger)
intent.update({'status':'temporary_save_confirmed_restore_pending','temporaryDetailId':1095,'submitEvidence':1721,'readbackEvidence':[1722,1723,1724]});write('paper341-save-intent.json',intent)
expected=intent['restoreValues'];ids=intent['restoreItemIds']
script=(r/'sources/runtime/paper341-submit-isolated-test.js').read_text(encoding='utf-8')
start=script.index('const expected=');end=script.index(';',start)
script=script[:start]+'const expected='+json.dumps(expected,ensure_ascii=True)+script[end:]
script=script.replace('Actual Save through observed paper Save control','Restore original paper341 metadata through observed Save control')
(r/'sources/runtime/paper341-restore-original.js').write_text(script,encoding='utf-8')
steps=[('1725-paper341-test-reentry-modify',['open','https://dev-exambank.dongahub.com/paper/modify.donga?paperId=341&curriculum=22&pageNum=1&pageSize=30']),('1726-paper341-test-reentry-values',['eval','--file','sources/runtime/paper-form-observation.js']),('1727-paper341-restore-original-name',['fill','input[name=paperName]',expected['paperName']]),('1728-paper341-restore-original-page',['fill','input[name=startPageNum]',expected['startPageNum']]),('1729-paper341-restore-before-values',['eval','--file','sources/runtime/paper-form-observation.js']),('1730-paper341-restore-save-submit',['eval','--file','sources/runtime/paper341-restore-original.js']),('1731-paper341-restore-save-readback',['snapshot']),('1732-paper341-restored-detail-values',['eval','--file','sources/runtime/paper-detail-observation.js']),('1733-paper341-restored-detail-source',['eval','--file','sources/runtime/sanitized-page-source.js'])]
write('scenarios/paper341-restore-original.json',{'steps':[{'label':a,'command':b} for a,b in steps],'tailChars':600})
resume=read('resume-state.json');resume['lastRetainedEvidence']='1724-paper341-test-save-detail-source';resume['unsavedState']='Paper341 temporary metadata saved as detail1095; restore immediately from paper341-save-intent.json.';resume['liveBrowserLastKnownState'].update({'url':d['url'],'persistentSiteMutations':21,'lastEvidence':resume['lastRetainedEvidence'],'modal':None});write('resume-state.json',resume)
status=read('inspection-status.json');status['counts']['siteDataMutations']=21;status['lastRetainedEvidence']=resume['lastRetainedEvidence'];write('inspection-status.json',status)
k=read('knowledge.json');k['currentEvidenceIndex'].update({'confirmedServerOperations':21,'unconsolidatedEvidenceThrough':1724});write('knowledge.json',k)
print(json.dumps({'paperId':341,'confirmedMasterOperations':21,'currentDetailId':1095,'next':'Restore original metadata; scenario prepared.'}))
