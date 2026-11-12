"""Index an already-recorded phase whose end matches the live evidence cursor."""
import json
import sys
from pathlib import Path

root=Path(__file__).resolve().parent
def read(name):return json.loads((root/name).read_text(encoding='utf-8'))
def write(name,obj):(root/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
phase_name=sys.argv[1];phase=read(phase_name)
assert read('live-capture-cursor.json')['evidence']==phase['lastEvidence'],'Capture cursor advanced; record correct live state first.'
resume=read('resume-state.json')
if phase_name in resume['sessionEvidence']:raise SystemExit('Already indexed; no replay needed.')
count=len(read('mutation-ledger.json')['entries'])
resume['sessionEvidence'].append(phase_name)
resume.update({'latestSessionEvidence':phase_name,'lastRetainedEvidence':phase['lastEvidence'],
 'resumeNote':phase['summary'],'nextActions':phase['remaining'],'unsavedState':phase['resume']['unsavedState']})
resume['liveBrowserLastKnownState'].update({**{k:v for k,v in phase['resume'].items() if k!='unsavedState'},
 'lastEvidence':phase['lastEvidence'],'persistentSiteMutations':count,'freshObservationRequired':True})
write('resume-state.json',resume)
status=read('inspection-status.json');status.update({'latestSessionEvidence':phase_name,'lastRetainedEvidence':phase['lastEvidence'],
 'resumeNote':phase['summary'],'summary':phase['summary'],'nextSteps':phase['remaining']});status['counts']['siteDataMutations']=count;write('inspection-status.json',status)
knowledge=read('knowledge.json');knowledge['currentEvidenceIndex'].update({'asOfEvidence':phase['evidenceRange'][1],
 'sessionObservationCutoff':phase['evidenceRange'][1],'latestSession':phase_name,'confirmedServerOperations':count})
knowledge['currentEvidenceIndex']['readingOrder'].insert(0,phase_name);write('knowledge.json',knowledge)
print(json.dumps({'phase':phase_name,'lastEvidence':phase['lastEvidence'],'confirmedMasterOperations':count}))
