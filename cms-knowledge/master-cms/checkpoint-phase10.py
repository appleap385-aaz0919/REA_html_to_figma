"""Reconcile the phase10 evidence cutoff. Historical checkpoint; do not rerun later."""
import json
from pathlib import Path

root = Path(__file__).resolve().parent
def read(name):
    return json.loads((root / name).read_text(encoding="utf-8"))
def write(name, value):
    (root / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

last = "711-line-preview-reversed-links-grade"
state = read("resume-state.json")
state.update(date="2026-11-09", lastRetainedEvidence=last,
             latestSessionEvidence="session-20261109-phase10.json",
             resumeNote="Active CDP session; fresh scoped snapshot before any action.")
state["liveBrowserLastKnownState"].update(tab="OMR SBMALD unsaved; preview modal open and graded correct",
    modal="OMR preview", lastEvidence=last, controller="agent-browser", cdpSession="cms-master-20261109")
state["unsavedState"] = {"type": "SBMALD", "left": ["math1", "math2"], "right": ["math3", "math4"],
    "connections": [["3", "4"], ["4"]], "previewStudent": [["4", "3"], ["4"]],
    "previewResult": "correct", "saved": False}
state["tooling"].update(connection="agent-browser explicit CDP; see agent-browser-session.json",
    captureHelper="agent_capture.py", monitor="CDP operates on CMS tab independently of desktop pointer. Native fallback needs visible unlocked desktop.",
    actions="Use fresh @refs, quoted in PowerShell. Every command explicitly passes CDP, own session, pin-tab and no-auto-dialog. Never trust implicit attachment.")
state["concurrentComputerUse"] = "User may work in other apps/tabs; preserve existing test-item2088985 edit tab. Coordinate any native-dialog fallback."
if "session-20261109-phase10.json" not in state["sessionEvidence"]:
    state["sessionEvidence"].append("session-20261109-phase10.json")
write("resume-state.json", state)

status = read("inspection-status.json")
status.update(recordedDate="2026-11-09", lastRetainedEvidence=last,
    latestSessionEvidence="session-20261109-phase10.json", resumeNote=state["resumeNote"],
    summary="CDP agent-browser connected to existing authenticated CMS. SBMALD form, multiple links and unordered within-left preview grading observed; not saved yet.")
status["runtimeContext"].update(connection="verified_working_via_agent_browser_explicit_cdp", blocker=None)
status["countsMeaning"] = "siteDataMutations counts confirmed server operations, not affected rows. Use mutation-ledger.json for exact operations. Inventory through354 is historical; subsequent runtime evidence is in session phase records."
write("inspection-status.json", status)

coverage = read("omr-runtime-coverage.json")
coverage["evidenceCutoff"] = 711
coverage["counts"]["leavesWithRuntimeFormEvidence"] = 10
leaf = next(row for row in coverage["leaves"] if row["code"] == "SBMALD")
leaf.update(runtimeStatus="form_and_selected_preview_policy_observed_not_saved",
    formEvidence=[669, 673, 685, 695, 697, 699, 701], previewEvidence=list(range(702, 712)),
    previewResult="Configured left1->[3,4],left2->[4]; student left1->[4,3],left2->[4] correct711. Preview uses dropdowns/Add answer.",
    remaining=["Full apply and hydration", "Wrong-answer cases", "Connection/row count boundaries", "Blank/duplicate values and duplicate targets", "Text/image variants"])
write("omr-runtime-coverage.json", coverage)

knowledge = read("knowledge.json")
knowledge["currentEvidenceIndex"].update(asOfEvidence=711, sessionObservationCutoff=711,
    latestSession="session-20261109-phase10.json", controller="agent-browser explicit CDP")
write("knowledge.json", knowledge)
print("Checkpoint reconciled through evidence711;11 confirmed server operations; SBMALD remains unsaved.")
