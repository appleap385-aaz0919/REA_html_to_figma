import json
from pathlib import Path
def read(name):
    return json.loads(Path(name).read_text(encoding="utf-8"))
def write(name, value):
    Path(name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
def evidence(number):
    path = next(Path("evidence").glob(f"{number}-*.json"))
    return read(path)["action"]["data"]["result"]
assert evidence(3367) == evidence(3378)
assert evidence(3368) == evidence(3380)
assert evidence(3370) == evidence(3379)
assert all(not x["draft"]["hasDraft"] for x in evidence(3381)["results"])
ledger = read("mutation-ledger.json")
assert len(ledger["entries"]) == 92
ledger["entries"].append(dict(operation="Restore owned COPY239 from Y to baseline N after status-control comparison", itemId=2089239, detailId=2089104, beforeStatus="Y", afterStatus="N", submitEvidence=3377, readbackEvidence=[3378,3379,3380,3381], familyDetailsAndMembershipsExactlyRestored=True, serviceDeployment=False))
write("mutation-ledger.json", ledger)
intent_name = "copy239-generation-status-intent-20261111.json"
intent = read(intent_name)
intent.update(status="completed", finalStatus="N", confirmEvidence=[3372,3377], finalEvidence=3381, pendingCleanup=None)
write(intent_name, intent)
for name in ("resume-state.json", "knowledge.json"):
    document = read(name)
    if name == "resume-state.json":
        document.update(status="active", date="2026-11-11", lastResumeDate="2026-11-11", pauseReason=None, latestUserSteering="User requested resume.", latestUserSteeringDate="2026-11-11")
    else:
        document["currentEvidenceIndex"]["status"] = "active"
    write(name, document)
print("Status experiment verified and restored; ledger93.")
