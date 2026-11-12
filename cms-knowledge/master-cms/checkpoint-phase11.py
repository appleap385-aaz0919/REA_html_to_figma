"""Historical checkpoint through777; do not rerun after later research."""
import json
from pathlib import Path
root = Path(__file__).resolve().parent
def read(n): return json.loads((root / n).read_text(encoding="utf-8"))
def write(n, v): (root / n).write_text(json.dumps(v, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
last = "777-drag-restored-bottom-visual"
ledger = read("mutation-ledger.json")
if not any(e.get("submitEvidence") == 769 for e in ledger["entries"]):
    ledger["entries"].append({"operation": "Full apply subjective multiple-answer drag/drop", "itemId": 2088985,
        "submitEvidence": 769, "readbackEvidence": [770, 772, 774, 776, 777], "detailId": 2088696,
        "submittedValues": {"leftMath": ["1234", "2"], "rightMath": ["3", "4"], "targets": ["3", "4"], "commas": [True, False]},
        "status": "Master type and new detail confirmed770; all math values, targets and comma flags restored and rendered777."})
write("mutation-ledger.json", ledger)
state = read("resume-state.json")
state.update(testCurrentDetailId=2088696, unsavedState=None, lastRetainedEvidence=last,
    latestSessionEvidence="session-20261109-phase11.json", resumeNote="Active agent-browser; saved SBMADD restored and rendered, OMR at actual internal-container bottom.")
state["liveBrowserLastKnownState"].update(tab="OMR SBMADD saved and restored at .page-wrapper bottom", modal=None,
    lastEvidence=last, persistentSiteMutations=13)
if "session-20261109-phase11.json" not in state["sessionEvidence"]: state["sessionEvidence"].append("session-20261109-phase11.json")
state["nextActions"] = ["Three essay leaves; edited OBSACN save and OMR boundaries.", "HML four editor slots and remaining Master modules."]
state["tooling"]["cursor"] = "live-capture-cursor.json tracks every latest agent action independently of phase checkpoints."
write("resume-state.json", state)
status = read("inspection-status.json")
status.update(lastRetainedEvidence=last, latestSessionEvidence="session-20261109-phase11.json", resumeNote=state["resumeNote"],
    summary="SBMALD and SBMADD normal apply/restoration verified; drag/drop correct/reversed grading and comma rendering verified. All14 leaf branches are not complete.")
status["counts"]["siteDataMutations"] = 13
write("inspection-status.json", status)
coverage = read("omr-runtime-coverage.json")
coverage["evidenceCutoff"] = 777
coverage["counts"].update(leavesWithRuntimeFormEvidence=11, leavesWithNormalFlowFullApplyAndRestoration=10)
leaf = next(e for e in coverage["leaves"] if e["code"] == "SBMADD")
leaf.update(runtimeStatus="normal_flow_applied_restored_rendered", formEvidence=[735, 750, 751, 753, 777],
    previewEvidence=list(range(754, 766)), previewResult="Student3/4 correct760; reversed4/3 incorrect765. Current preview uses dropdowns. First comma rendered.",
    fullApplyEvidence=769, restoreEvidence=[770, 772, 774, 776, 777],
    remaining=["Row/choice boundaries", "Blank/duplicates/repeated targets/unequal columns", "Text/image variants"])
write("omr-runtime-coverage.json", coverage)
knowledge = read("knowledge.json")
knowledge["currentEvidenceIndex"].update(asOfEvidence=777, sessionObservationCutoff=777,
    persistentTestDetail=2088696, confirmedServerOperations=13, latestSession="session-20261109-phase11.json")
write("knowledge.json", knowledge)
print("Recorded13 confirmed server operations;11 observed leaf forms;10 normal apply/restoration leaves; cutoff777.")
