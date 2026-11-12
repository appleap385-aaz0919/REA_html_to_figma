"""Historical checkpoint941; do not rerun after later work."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n): return json.loads((root/n).read_text(encoding="utf-8"))
def write(n,v): (root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
last="941-multi-essay-restored-bottom-model"
ledger=read("mutation-ledger.json")
if not any(e.get("submitEvidence")==927 for e in ledger["entries"]):
    ledger["entries"].append({"operation":"Full apply multiple-answer essay2x2 with swapped blocks","itemId":2088985,"submitEvidence":927,
        "readbackEvidence":[928,930,933,934,936,938,940,941],"detailId":2088699,
        "submittedValues":{"mathAnswers":[[1,2],[3,4]],"outerOrderFixed":False,"innerOrderFixed":[False,True],"blockOrder":["answer","process"],"titles":["QA-multi-answer","QA-multi-process"]},
        "status":"Master type/detail; all math, grouping, flags, block order and titles restored. Full internal scroll inspected."})
write("mutation-ledger.json",ledger)
state=read("resume-state.json")
state.update(testCurrentDetailId=2088699,unsavedState=None,lastRetainedEvidence=last,latestSessionEvidence="session-20261109-phase14.json",
    resumeNote="Active current Chrome, saved ESMA00 restored; OMR2x2 answer-first/process-second at true .page-wrapper bottom. No modal.")
state["liveBrowserLastKnownState"].update(tab="OMR ESMA00 saved/restored at container bottom",modal=None,lastEvidence=last,persistentSiteMutations=16)
if "session-20261109-phase14.json" not in state["sessionEvidence"]: state["sessionEvidence"].append("session-20261109-phase14.json")
state["nextActions"]=["OBSACN actual edited-form save and option boundaries; all leaf branches remain incomplete.","HML four editor slots and remaining Master modules."]
write("resume-state.json",state)
status=read("inspection-status.json")
status.update(lastRetainedEvidence=last,latestSessionEvidence="session-20261109-phase14.json",resumeNote=state["resumeNote"],
    summary="All14 known OMR leaf forms observed.13 leaves have normal apply/restoration; OBSACN edited-form save remains. No leaf has every branch verified; broad Master modules remain incomplete.")
status["counts"]["siteDataMutations"]=16
write("inspection-status.json",status)
coverage=read("omr-runtime-coverage.json")
coverage["evidenceCutoff"]=941
coverage["counts"].update(leavesWithRuntimeFormEvidence=14,leavesWithNormalFlowFullApplyAndRestoration=13)
leaf=next(e for e in coverage["leaves"] if e["code"]=="ESMA00")
leaf.update(runtimeStatus="normal_flow_applied_restored_rendered",formEvidence=[841,842,869,871,873,875,876],previewEvidence=[879,890,895,901,904,916,921,923],
    previewResult="2x2 cases:2,1/3,4 correct;2,1/4,3 wrong;outer-reversed3,4/2,1 wrong when fixed and correct when unfixed;crossmixed3,2/4,1 wrong. Process blank in all cases.",
    fullApplyEvidence=927,restoreEvidence=[928,930,933,934,936,938,940,941],remaining=["Other order combinations", "Legend/affix/similar/case-space/comma branches", "Min/max/delete/validation boundaries"])
write("omr-runtime-coverage.json",coverage)
knowledge=read("knowledge.json")
knowledge["currentEvidenceIndex"].update(asOfEvidence=941,sessionObservationCutoff=941,persistentTestDetail=2088699,confirmedServerOperations=16,latestSession="session-20261109-phase14.json")
write("knowledge.json",knowledge)
print("Checkpoint941:16 confirmed server operations;14 forms observed;13 normal applies/restorations. No all-branch completion claim.")
