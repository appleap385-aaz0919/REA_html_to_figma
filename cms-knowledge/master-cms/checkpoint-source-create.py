"""Record confirmed creation199 from readback; no browser or server mutation."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(name):return json.loads((root/name).read_text(encoding='utf-8'))
def write(name,obj):(root/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==18
before=read('sources-inventory-20261109.json')
after=read('evidence/1309-source-create-test-inventory.json')['action']['data']['result']
assert before['count']==59 and after['count']==60
created=next(r for r in after['rows'] if r['cells'][0]=='199')
assert created['cells'][1]=='22-M-MA-T0-1-1-SMT-TP-2049' and created['cells'][10:12]==['미사용','0']
intent=read('source-test-intent.json');intent.update({'status':'created_confirmed','createdSourceId':199,'submitEvidence':1305,'readbackEvidence':[1306,1307,1309]});write('source-test-intent.json',intent)
ledger['entries'].append({'operation':'Create unused unmapped research question source','sourceId':199,
 'submitEvidence':1305,'readbackEvidence':[1306,1307,1309], 'submittedValues':intent['plannedValues'],
 'observedCode':created['cells'][1],'observedEffects':['22curriculumsourcecount59->60','Unusedsource199with0mappedquestions'],
 'status':'Creationconfirmedbydetail,successmessageandindependentlistreadback;testsourceisolatedandunused.'})
write('mutation-ledger.json',ledger);write('sources-inventory-after-test-create-20261109.json',after)
resume=read('resume-state.json');resume.update({'testSourceId':199,'lastRetainedEvidence':'1309-source-create-test-inventory',
 'resumeNote':'Source199created,unused,0mapped;code22-M-MA-T0-1-1-SMT-TP-2049. Sourcephase20notyetconsolidated;continueedit/duplicatepolicies.'})
resume['liveBrowserLastKnownState'].update({'url':'https://dev-exambank.dongahub.com/product/detail.donga?curriculum=22&pageNum=1&pageSize=10&id=199',
 'tab':'Createdtestsource199detail','lastEvidence':'1309-source-create-test-inventory','persistentSiteMutations':19,'modal':None})
write('resume-state.json',resume)
status=read('inspection-status.json');status['counts']['siteDataMutations']=19;status['lastRetainedEvidence']='1309-source-create-test-inventory';write('inspection-status.json',status)
knowledge=read('knowledge.json');knowledge['currentEvidenceIndex'].update({'confirmedServerOperations':19,'testSourceId':199,'unconsolidatedEvidenceThrough':1309});write('knowledge.json',knowledge)
print(json.dumps({'sourceId':199,'confirmedMasterOperations':19,'sourceCount22':60}))
