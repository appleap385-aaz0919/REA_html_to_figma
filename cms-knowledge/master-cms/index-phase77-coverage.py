import json
from pathlib import Path

def read(name):
    return json.loads(Path(name).read_text(encoding="utf-8"))
def write(name, value):
    Path(name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

name = "coverage-supplement-20261111-phase77.json"
coverage = read(name)
cursor = read("live-capture-cursor.json")
assert cursor["evidence"] == coverage["finalFixtureState"]["latestBrowserEvidence"]
assert len(read("mutation-ledger.json")["entries"]) == coverage["confirmedMasterOperations"] == 95
assert len(coverage["verified"]) == 8
assert Path(coverage["inherits"]["file"]).is_file()
for result in coverage["verified"]:
    assert Path(result["phase"]).is_file()
    assert all(list(Path("evidence").glob(f"{n}-*.json")) for n in result["evidence"])
    if "comparison" in result:
        assert Path(result["comparison"]).is_file(), result["comparison"]
knowledge = read("knowledge.json")
index = knowledge["currentEvidenceIndex"]
index.update(latestCoverageMap=name, latestCoverageCutoff=3473, handoff=name, latestCoverageDeltas=[])
index["readingOrder"].insert(0, name)
index["latestActionableQueue"] = coverage["completeness"]["resumeDayQueue"]
index["currentOwnPaper1094"] = coverage["finalFixtureState"]["paper1094"]
write("knowledge.json", knowledge)
resume = read("resume-state.json")
resume.update(handoffFile=name, latestCoverageMap=name, pendingVerificationQueue=[])
browser = resume["liveBrowserLastKnownState"]
browser.update(parentTab=browser["tab"], parentUrl=browser["url"], pendingVerification=None, pendingServerOperation=None)
resume["nextActions"] = [
    "Use the latest coverage map and source evidence for future monitoring, QA and storyboards.",
    "Verify the outstanding sample-specific cases when a real translation HML or normal Definition set ZIP/parser specification becomes available.",
    "Start Service CMS research when the user supplies that environment."
]
write("resume-state.json", resume)
status = read("inspection-status.json")
status.update(latestCoverageMap=name, actionableQueue=coverage["completeness"]["resumeDayQueue"], nextSteps=resume["nextActions"])
write("inspection-status.json", status)
print("Verified all eight delta records and evidence references, updated the index and resume checkpoint, Master95.")
