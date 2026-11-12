"""Historical one-shot phase5 checkpoint. Do not rerun for the current session."""
import json
from pathlib import Path

root = Path(__file__).resolve().parent

def read(name):
    return json.loads((root / name).read_text(encoding="utf-8"))

def write(name, value):
    (root / name).write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")

phase = read("session-20261106-phase5.json")
phase.update(status="paused_at_user_request", evidenceRange=[371,447])
phase["observations"].extend([
    {
        "type":"SBSANM", "evidence":[395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421],
        "result":"Category change selects subjective/single/general. Default value cells are math editors; each cell offers general text, math editor and image URL, with allowed kinds dependent on field. Main answer and similar answer have independent case/space flags. Prefix and suffix are optional. Actual text-mode inputs and preview display verified.",
        "inputs":{"prefix":"답:","suffix":"cm","answer":"Ab c","similarAnswer":"XYZ"},
        "limit":"Math-mode UIA set-value readbacks399-405 did not prove actual MathLive model input. Pixels still showed placeholders and preview did not open. Normal text selected explicitly before successful tests. No CMS defect inferred."
    },
    {
        "type":"SBSANM", "evidence":[422,423,424,425,426,427,428,430,431,432,433,434,435,436,437,438,439,440,441,442],
        "result":"Main Ab c with case=false/space=false accepts abc. Similar XYZ with case=false/space=false accepts xyz. Main case=true/space=false rejects abc and accepts Abc. Main case=true/space=true rejects Abc and accepts Ab c. Preview has math/general input toggle. Each preview opens a fresh student input state.",
        "notYetVerified":["Similar-answer flag toggles", "Legend mode", "MathLive actual keyboard editing", "Empty-field error wording"]
    },
    {
        "type":"SBSANM", "evidence":[443,444,445,446,447],
        "result":"Full apply submitted. Settled detail446 confirms subjective/single/general and new detail2088547. Edit-entry click447 issued; paused before settled edit and OMR hydration verification.",
        "savedDetailId":2088547,
        "valuesRestoredAfterReentry":None
    }
])
phase["evidenceQuality"].extend([
    {"evidence":[399,401,402,403,404,405],"rule":"UIA readback alone on MathLive internal editable is insufficient. Actual rendered values/model not proven. Exclude as valid input or validation failure proof."},
    {"evidence":406,"rule":"Synthetic index-click did not open value-kind dropdown. Coordinate407 opened it; text choice408 and subsequent actual normal inputs are valid."},
    {"evidence":429,"rule":"Unused label; no capture was required because preview was already loaded in428."}
])
write("session-20261106-phase5.json",phase)

ledger=read("mutation-ledger.json")
if not any(e.get("submitEvidence")==445 for e in ledger["entries"]):
    ledger["entries"].append({
        "operation":"Full apply subjective single-answer general", "itemId":2088985,
        "submitEvidence":445,"readbackEvidence":[446],"detailId":2088547,
        "submittedValues":{"answer":"Ab c","mainCaseSensitive":True,"mainSpaceSensitive":True,"similarAnswer":"XYZ","similarCaseSensitive":False,"similarSpaceSensitive":False,"prefix":"답:","suffix":"cm"},
        "status":"Save confirmed by settled master type and new detail ID. Edit OMR values/flags restoration still unverified due user pause."
    })
write("mutation-ledger.json",ledger)

state=read("resume-state.json")
state.update(status="paused_at_user_request",pauseReason="User explicitly requested pause; wait for explicit resume.",testCurrentDetailId=2088547,lastRetainedEvidence="447-omr-text-edit-reentry",unsavedState=None)
state["liveBrowserLastKnownState"].update(url="https://dev-exambank.dongahub.com/item/all/detail.donga?itemId=2088985&pageNum=1&pageSize=10&openModify=Y",tab="Edit entry requested after SBSANM full apply; transitional snapshot447",modal=None,lastEvidence="447-omr-text-edit-reentry",freshObservationRequired=True,persistentSiteMutations=6)
state["nextActions"]=["Wait for explicit resume.","Obtain fresh browser state; never reuse indexes. Edit entry447 may have navigated to modify after the snapshot.","Open OMR tab and verify SBSANM answer Ab c, similar XYZ, prefix/suffix and independent flags hydrate after full apply445.","Continue general-form legend mode and remaining subjective/essay OMR runtime types, then HML four editor slots and remaining Master menus."]
state["sessionEvidence"].append("session-20261106-phase5.json") if "session-20261106-phase5.json" not in state["sessionEvidence"] else None
state["resumeNote"]="Paused immediately after edit entry447. No further GUI calls."
write("resume-state.json",state)

status=read("inspection-status.json")
status.update(status="paused_at_user_request",pauseReason="User explicitly requested pause; wait for explicit resume.",summary="Paused. OBMAOX full save and hydration confirmed. SBSANM case/space/similar-answer preview comparisons and full save confirmed; post-save OMR hydration remains pending.",lastRetainedEvidence="447-omr-text-edit-reentry",latestSessionEvidence="session-20261106-phase5.json")
status["counts"]["siteDataMutations"]=6
status["coverageSnapshot"].update(cutoffEvidence=354,inventoryRecords=128,featureGroups=232,completionPercent=None)
status["countsMeaning"]="siteDataMutations counts confirmed server operations, not row changes: COPY, one temporary save, four full applies. Inventory through354 excludes later runtime tests; use phase4/phase5 and mutation ledger for later evidence."
write("inspection-status.json",status)
print("Paused checkpoint written; six confirmed server operations, final evidence447.")
