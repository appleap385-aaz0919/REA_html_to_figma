"""Historical checkpoint840; do not rerun after later work."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n): return json.loads((root/n).read_text(encoding="utf-8"))
def write(n,v): (root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
last="840-single-essay-restored-visual"
ledger=read("mutation-ledger.json")
if not any(e.get("submitEvidence")==833 for e in ledger["entries"]):
    ledger["entries"].append({"operation":"Full apply single-answer essay with swapped blocks","itemId":2088985,"submitEvidence":833,
        "readbackEvidence":[834,836,839,840],"detailId":2088698,"submittedValues":{"answerMath":"1","blockOrder":["answer","process"],"titles":["QA-answer","QA-process"]},
        "status":"Master type/detail and all values/order restored; preview1 correct,2 incorrect with process blank in this case."})
write("mutation-ledger.json",ledger)
state=read("resume-state.json")
state.update(testCurrentDetailId=2088698,unsavedState=None,lastRetainedEvidence=last,latestSessionEvidence="session-20261109-phase13.json",
    resumeNote="Active current Chrome via agent-browser. Saved ESSA00 answer-first/process-second restored; preview closed.")
state["liveBrowserLastKnownState"].update(tab="OMR ESSA00 saved/restored",modal=None,lastEvidence=last,persistentSiteMutations=15)
if "session-20261109-phase13.json" not in state["sessionEvidence"]: state["sessionEvidence"].append("session-20261109-phase13.json")
state["nextActions"]=["ESMA00 and edited OBSACN save; OMR boundaries.","HML four slots and remaining Master menus."]
write("resume-state.json",state)
status=read("inspection-status.json")
status.update(lastRetainedEvidence=last,latestSessionEvidence="session-20261109-phase13.json",resumeNote=state["resumeNote"],
    summary="ESSA00 swapped block order, correct/wrong preview, MANUAL note and normal save/restoration verified. One leaf still lacks runtime form evidence; broader Master coverage remains incomplete.")
status["counts"]["siteDataMutations"]=15
write("inspection-status.json",status)
coverage=read("omr-runtime-coverage.json")
coverage["evidenceCutoff"]=840
coverage["counts"].update(leavesWithRuntimeFormEvidence=13,leavesWithNormalFlowFullApplyAndRestoration=12)
leaf=next(e for e in coverage["leaves"] if e["code"]=="ESSA00")
leaf.update(runtimeStatus="normal_flow_applied_restored_rendered",formEvidence=[803,804,808,810,811,813],previewEvidence=list(range(814,829)),
    previewResult="Swapped answer/process blocks. Ordinary student1 correct822,2 incorrect826 while manual process blank; answer view gives MANUAL note828.",
    fullApplyEvidence=833,restoreEvidence=[834,836,839,840],remaining=["Legend mode", "Similar/affix/case-space branches", "Empty validation", "Other grading/mode combinations"])
write("omr-runtime-coverage.json",coverage)
knowledge=read("knowledge.json")
knowledge["currentEvidenceIndex"].update(asOfEvidence=840,sessionObservationCutoff=840,persistentTestDetail=2088698,confirmedServerOperations=15,latestSession="session-20261109-phase13.json")
write("knowledge.json",knowledge)
print("Checkpoint840:15 confirmed server operations;13 forms observed;12 normal applies/restorations.")
