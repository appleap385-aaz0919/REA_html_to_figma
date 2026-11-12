"""Historical checkpoint through734. Do not rerun after later research."""
import json
from pathlib import Path
root = Path(__file__).resolve().parent
def read(name): return json.loads((root / name).read_text(encoding="utf-8"))
def write(name, obj): (root / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
last = "734-line-container-bottom-observation"
ledger = read("mutation-ledger.json")
if not any(e.get("submitEvidence") == 718 for e in ledger["entries"]):
    ledger["entries"].append({"operation": "Full apply subjective multiple-answer line matching", "itemId": 2088985,
        "submitEvidence": 718, "readbackEvidence": [719, 724, 730, 731, 734], "detailId": 2088695,
        "submittedValues": {"leftMath": ["1", "2"], "rightMath": ["3", "4"], "connectionsByValue": [["3", "4"], ["4"]]},
        "status": "New Master detail and type confirmed719; reentry read-only MathLive values731/734 and dropdown links730 restore all values. Post-reentry screenshot732 timed out and provides no pixel evidence."})
write("mutation-ledger.json", ledger)
phase = read("session-20261109-phase10.json")
phase["evidenceRange"][1] = 734
phase["savedDetailId"] = 2088695
phase["observations"].append({"code": "SBMALD", "evidence": list(range(712, 720)),
    "result": "Student first-left[4,3],second-left[3] grades incorrect714. Full apply confirmation717 and Save718 navigate to Master detail2088695;719 confirms type and new detail."})
phase["observations"].append({"code": "SBMALD", "evidence": list(range(720, 735)),
    "result": "Observed edit-link href is detail URL with openModify=Y722. Initial pointer click did not produce verified edit entry; direct known modify route723 reenters persisted detail2088695. OMR pointer click725 did not activate tab; focus729 + Enter730 does. Fresh AX restores links1->[3,4],2->[4]. Read-only DOM731/734 restores MathLive1/2/3/4 and typeSBMALD. Scoped internal scroll733 reaches page-wrapper bottom734 (146+1015=1161)."})
phase["qualityNotes"].append({"evidence": [725, 726, 727, 731, 732, 733, 734],
    "rule": "Do not call726/727 OMR restoration pixel proof: screenshots show metadata because tab click had not activated.732 screenshot returns outcome_unknown and no PNG exists. Form values and connections are restored in DOM/AX730/731/734. Generic page scroll727 did not move the actual .page-wrapper; targeted scroll733 is verified734. Background tab visibility is hidden. Preserve this distinction."})
phase["remaining"][0] = "SBMALD duplicate-target and min/max boundaries, text/image variants, post-reentry pixel verification."
write("session-20261109-phase10.json", phase)
state = read("resume-state.json")
state.update(testCurrentDetailId=2088695, unsavedState=None, lastRetainedEvidence=last,
    resumeNote="Active agent-browser session, saved SBMALD, OMR tab at true internal-container bottom. DOM/AX verified; most recent attempted screenshot732 failed.")
state["liveBrowserLastKnownState"].update(tab="OMR SBMALD saved and hydrated; true .page-wrapper bottom", modal=None,
    lastEvidence=last, persistentSiteMutations=12)
write("resume-state.json", state)
status = read("inspection-status.json")
status.update(lastRetainedEvidence=last, resumeNote=state["resumeNote"],
    summary="agent-browser connected. SBMALD multiple links, reversed within-left order correct, wrong target incorrect, full apply and DOM/AX reentry restoration verified. Post-reentry pixel verification still pending.")
status["counts"]["siteDataMutations"] = 12
write("inspection-status.json", status)
coverage = read("omr-runtime-coverage.json")
coverage["evidenceCutoff"] = 734
coverage["counts"]["leavesWithNormalFlowFullApplyAndRestoration"] = 9
leaf = next(e for e in coverage["leaves"] if e["code"] == "SBMALD")
leaf.update(runtimeStatus="normal_flow_applied_and_dom_ax_restored_pixel_recheck_pending", fullApplyEvidence=718,
    restoreEvidence=[719, 724, 730, 731, 734], previewResult="Student[4,3]/[4] correct711;[4,3]/[3] incorrect714. Within-left multiple targets unordered; cross-left reuse accepted.")
leaf["previewEvidence"].extend([712, 713, 714])
leaf["remaining"] = ["Post-reentry rendered pixel verification", "Connection/row boundaries", "Blank/duplicate values and duplicate targets", "Text/image variants"]
write("omr-runtime-coverage.json", coverage)
knowledge = read("knowledge.json")
knowledge["currentEvidenceIndex"].update(asOfEvidence=734, sessionObservationCutoff=734,
    persistentTestDetail=2088695, confirmedServerOperations=12)
write("knowledge.json", knowledge)
print("Recorded12 confirmed server operations; SBMALD saved2088695 and DOM/AX restored; cutoff734.")
