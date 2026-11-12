import copy
import json
from pathlib import Path
from urllib.parse import parse_qsl, urlsplit

def read(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))

def write(path, value):
    Path(path).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def ev(number):
    return read(next(Path("evidence").glob(f"{number}-*.json")))["action"]["data"]["result"]

baseline = ev(3460)
reversed_range = ev(3467)
restored = ev(3472)
def identity(result):
    return result["values"][0]["value"]
def normalize(result):
    result = copy.deepcopy(result)
    result["values"][0]["value"] = "1094"
    result.pop("alerts")
    url = urlsplit(result["url"])
    result["url"] = (url.scheme, url.netloc, url.path, sorted(parse_qsl(url.query)))
    return result
assert [identity(x) for x in (baseline, reversed_range, restored)] == ["1094 (1177)", "1094 (1190)", "1094 (1191)"]
assert any(x["value"] == "2 ~ 1" for x in reversed_range["values"])
assert normalize(baseline) == normalize(restored)
assert any(c == "2089238" for t in restored["tables"] for row in t["rows"] for c in row["cells"])
assert ev(3473)["httpStatus"] == 200 and ev(3473)["modal"] is None
assert any(x["value"] == "1 ~ 1" for x in ev(3473)["persistedFields"])
ledger = read("mutation-ledger.json")
assert len(ledger["entries"]) == 94
ledger["entries"].append(dict(operation="Restore QA paper1094 page range to 1–1", paperId=1094, beforeDetailId=1190, afterDetailId=1191, beforePages=[2,1], afterPages=[1,1], status="R", memberIds=[2089238], submitEvidence=3471, readbackEvidence=[3472,3473], serviceDeployment=False))
write("mutation-ledger.json", ledger)
name = "paper1094-reversed-page-range-intent-20261111.json"
intent = read(name)
intent.update(status="completed", reversedPersistedDetailId=1190, finalDetailId=1191, finalPages=[1,1], pendingCleanup=None, comparison="paper1094-reversed-page-range-comparison-20261111.json")
write(name, intent)
write("paper1094-reversed-page-range-comparison-20261111.json", dict(paperId=1094, baselineDetailId=1177, reversedDetailId=1190, restoredDetailId=1191, persistedReversedPages=[2,1], restoredPages=[1,1], memberIds=[2089238], status="R", usage="C", baseAndRestoredEqualExceptVersionAndTransientAlerts=True, baselineEvidence=3460, testEvidence=[3464,3465,3466,3467], restorationEvidence=[3468,3470,3471,3472,3473], deployment=False))
print("Reverse range persisted; original business values and tables restored; ledger95.")
