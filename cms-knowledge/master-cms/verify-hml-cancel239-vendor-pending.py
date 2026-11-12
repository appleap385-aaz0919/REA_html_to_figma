import hashlib
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import urlopen

def read(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))

def evidence(number):
    return read(next(Path("evidence").glob(f"{number}-*.json")))["action"]["data"]["result"]

assert evidence(3424) == evidence(3456)
assert evidence(3425) == evidence(3453)
assert evidence(3446) == evidence(3449)
assert evidence(3367) == evidence(3452)
assert evidence(3380) == evidence(3457)
assert evidence(3442)["outcome"] == "vendor_explanation_temp_files_saved_parent_cms_commit_pending"

def check(asset):
    url = asset["url"]
    assert urlsplit(url).hostname == "dev-items.douclass.com"
    with urlopen(url, timeout=15) as response:
        data = response.read()
        status = response.status
    sha256 = hashlib.sha256(data).hexdigest()
    return dict(role=asset["role"], url=url, status=status, bytes=len(data),
                sha256=sha256, beforeSha256=asset["sha256"],
                exactlyEqual=sha256 == asset["sha256"] and status == 200)

baseline = read("explanation239-published-and-original-binaries-20261110.json")
with ThreadPoolExecutor(max_workers=4) as pool:
    assets = list(pool.map(check, baseline["assets"]))
assert len(assets) == 6 and all(x["exactlyEqual"] for x in assets)
assert len(read("mutation-ledger.json")["entries"]) == 93
result = {
    "status": "verified",
    "itemId": 2089239,
    "detailId": 2089104,
    "viewFlag": "N",
    "editorTemporarySaveEvidence": 3441,
    "stayEvidence": [3448, 3449],
    "leaveWithoutSaveEvidence": 3451,
    "reopenNoPendingEvidence": 3455,
    "dataComparisons": [[3424, 3456], [3425, 3453], [3446, 3449], [3367, 3452], [3380, 3457]],
    "assets": assets,
    "cmsSave": False,
    "vendorTemporaryFilePhysicalDeletionVerified": False
}
Path("hml-cancel239-vendor-pending-comparison-20261111.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
name = "hml-cancel239-vendor-pending-intent-20261111.json"
intent = read(name)
intent.update(status="completed", pendingCleanup=None, closedPopupEvidence=3445, finalEvidence=3458)
Path(name).write_text(json.dumps(intent, indent=2) + "\n", encoding="utf-8")
print("Verified exact detail, parent model, drafts, groups and all six published asset hashes.")
