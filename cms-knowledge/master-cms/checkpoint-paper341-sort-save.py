"""Record already-confirmed order save, prepare scoped restoration."""
import json,re
from pathlib import Path
r=Path(__file__).resolve().parent
def read(n):return json.loads((r/n).read_text(encoding='utf-8'))
def write(n,o):(r/n).write_text(json.dumps(o,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('paper341-sort-intent.json');d=read('evidence/1746-paper341-sort-save-detail-values.json')['action']['data']['result']
order=[re.search(r'\d+',t['cells'][1]).group() for t in d['tables'][1]['rows']]
assert order==intent['plannedOrder'] and d['values'][0]['value']=='341 (1097)'
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==22
ledger['entries'].append({'operation':'Save reversed paper341 groups through observed Sortable API plus Save control','paperId':341,'beforeDetailId':1096,'afterDetailId':1097,'submitEvidence':1744,'readbackEvidence':[1745,1746,1747],'beforeOrder':intent['beforeOrder'],'afterOrder':order,'metadataUnchanged':True,'status':'Persisted group order confirmed. Pointer drag unverified; restoring original order next.'});write('mutation-ledger.json',ledger)
intent.update({'status':'sort_saved_restore_pending','temporaryDetailId':1097,'saveSubmitEvidence':1744,'saveReadbackEvidence':[1745,1746,1747]});write('paper341-sort-intent.json',intent)
script=(r/'sources/runtime/paper341-sort-api-reverse.js').read_text(encoding='utf-8');script=script.replace(json.dumps(intent['beforeOrder']),'__ORIGINAL_ORDER__').replace(json.dumps(intent['plannedOrder']),json.dumps(intent['beforeOrder'])).replace('__ORIGINAL_ORDER__',json.dumps(intent['plannedOrder']))
(r/'sources/runtime/paper341-sort-api-restore.js').write_text(script,encoding='utf-8')
steps=[('1748-paper341-sort-reentry-modify',['open','https://dev-exambank.dongahub.com/paper/modify.donga?paperId=341&curriculum=22&pageNum=1&pageSize=30']),('1749-paper341-sort-persisted-form',['eval','--file','sources/runtime/paper-form-observation.js']),('1750-paper341-sort-restore-public-api',['eval','--file','sources/runtime/paper341-sort-api-restore.js']),('1751-paper341-sort-restored-form',['eval','--file','sources/runtime/paper-form-observation.js']),('1752-paper341-sort-restore-save-submit',['eval','--file','sources/runtime/paper341-restore-original.js']),('1753-paper341-sort-restore-readback',['snapshot']),('1754-paper341-sort-restored-detail-values',['eval','--file','sources/runtime/paper-detail-observation.js']),('1755-paper341-sort-restored-detail-source',['eval','--file','sources/runtime/sanitized-page-source.js'])]
write('scenarios/paper341-sort-restore.json',{'steps':[{'label':a,'command':b} for a,b in steps],'tailChars':500})
resume=read('resume-state.json');resume['lastRetainedEvidence']='1747-paper341-sort-save-detail-source';resume['unsavedState']='Paper341 order temporarily saved as detail1097. Restore original order immediately from paper341-sort-intent.json.';resume['liveBrowserLastKnownState'].update({'url':d['url'],'persistentSiteMutations':23,'lastEvidence':resume['lastRetainedEvidence'],'modal':None});write('resume-state.json',resume)
status=read('inspection-status.json');status['counts']['siteDataMutations']=23;status['lastRetainedEvidence']=resume['lastRetainedEvidence'];write('inspection-status.json',status)
k=read('knowledge.json');k['currentEvidenceIndex'].update({'confirmedServerOperations':23,'unconsolidatedEvidenceThrough':1747});write('knowledge.json',k)
print(json.dumps({'paperId':341,'confirmedMasterOperations':23,'currentDetailId':1097,'restoreOrder':intent['beforeOrder']}))
