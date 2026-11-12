"""Index retained investigation records and hash staged artifacts for handoff."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def index_history() -> None:
    records = []
    for path in (ROOT / "cms-knowledge/master-cms").glob("session-*.json"):
        data = json.loads(path.read_text(encoding="utf-8"))
        phase = re.search(r"phase(\d+)", path.name)
        records.append({
            "file": path.relative_to(ROOT).as_posix(),
            "date": data.get("date"),
            "phase": int(phase.group(1)) if phase else 1,
            "status": data.get("status"),
            "summary": data.get("summary", data.get("resumeNote")),
            "evidenceRange": data.get("evidenceRange"),
            "lastEvidence": data.get("lastEvidence"),
        })
    records.sort(key=lambda r: (r["date"] or "", r["phase"], r["file"]))
    ledger = json.loads((ROOT / "cms-knowledge/master-cms/mutation-ledger.json").read_text(encoding="utf-8"))
    write_json(DOCS / "investigation-history.json", {
        "schemaVersion": 1,
        "source": "Existing retained session records; not a verbatim chat export",
        "sessionRecordCount": len(records),
        "mutationLedgerEntryCount": len(ledger["entries"]),
        "records": records,
    })
    print(f"Indexed {len(records)} session records and {len(ledger['entries'])} mutation ledger entries.")


def manifest() -> None:
    paths = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).split(b"\0")
    records = []
    for raw in paths:
        if not raw:
            continue
        name = raw.decode("utf-8")
        if name == "docs/artifact-manifest.json":
            continue
        path = ROOT / name
        digest = hashlib.sha256()
        with path.open("rb") as stream:
            for block in iter(lambda: stream.read(1024 * 1024), b""):
                digest.update(block)
        records.append({"path": name, "bytes": path.stat().st_size, "sha256": digest.hexdigest()})
    write_json(DOCS / "artifact-manifest.json", {
        "schemaVersion": 1,
        "hashBasis": "Working-tree bytes at snapshot time; Git may normalize text line endings",
        "selfExcluded": True,
        "fileCount": len(records),
        "totalBytes": sum(r["bytes"] for r in records),
        "files": sorted(records, key=lambda r: r["path"]),
    })
    print(f"Manifested {len(records)} files ({sum(r['bytes'] for r in records)} bytes).")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", action="store_true", help="Hash staged paths; stage changes first")
    args = parser.parse_args()
    DOCS.mkdir(exist_ok=True)
    manifest() if args.manifest else index_history()
