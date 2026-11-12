"""Capture one explicit Orca Chrome action and preserve its returned evidence."""
import argparse
import json
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

parser = argparse.ArgumentParser()
parser.add_argument("label")
parser.add_argument("action", choices=["get-app-state", "click", "scroll", "set-value", "press-key", "hotkey", "paste-text", "perform-secondary-action"])
parser.add_argument("args", nargs=argparse.REMAINDER)
options = parser.parse_args()
if not re.fullmatch(r"\d{3,5}-[a-z0-9-]+", options.label):
    parser.error("Use an evidence label such as 002-item-navigation")

root = Path(__file__).resolve().parent
evidence = root / "evidence"
evidence.mkdir(exist_ok=True)
cli = Path(r"C:\Users\jaehyuk.myung\AppData\Local\Programs\orca\resources\bin\orca.exe")
extra = options.args[1:] if options.args[:1] == ["--"] else options.args
window = [] if "--window-id" in extra else ["--window-id", "6755210"]
command = [str(cli), "computer", options.action, "--session", "master-cms-learning-20261105", "--app", "chrome", *window, *extra, "--json"]
capture_started_utc = datetime.now(timezone.utc).isoformat()
capture_started = time.perf_counter()
run = subprocess.run(command, capture_output=True, encoding="utf-8", errors="replace")
cli_elapsed = time.perf_counter() - capture_started
raw_path = evidence / f"{options.label}.json"
raw_path.write_text(run.stdout, encoding="utf-8")
if run.stderr:
    (evidence / f"{options.label}.stderr.txt").write_text(run.stderr, encoding="utf-8")
try:
    response = json.loads(run.stdout)
except json.JSONDecodeError:
    print(run.stdout)
    raise SystemExit(run.returncode or 1)
if not response.get("ok"):
    print(json.dumps(response, ensure_ascii=False, indent=2))
    raise SystemExit(run.returncode or 1)
result = response.get("result", {})
snapshot = result.get("snapshot", {})
tree = snapshot.get("treeText", "")
source_view = "view-source:" in snapshot.get("window", {}).get("title", "")
if source_view:
    tree = "\n".join("[credential-bearing source line omitted]" if re.search(r"csrf|authenticity.token|nonce|bearer", line, re.I) else line for line in tree.splitlines())
    snapshot["treeText"] = tree
(evidence / f"{options.label}.txt").write_text(tree, encoding="utf-8")
screenshot = result.get("screenshot") or {}
if screenshot.get("path"):
    destination = evidence / f"{options.label}.png"
    shutil.copy2(screenshot["path"], destination)
    screenshot["retainedPath"] = str(destination)
timing = {"startedUtc": capture_started_utc, "cliSeconds": round(cli_elapsed, 3),
          "localEvidenceSaveSeconds": round(time.perf_counter() - capture_started - cli_elapsed, 3),
          "noScreenshot": "--no-screenshot" in extra}
response["captureTiming"] = timing
raw_path.write_text(json.dumps(response, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"evidence": options.label, "window": snapshot.get("window"),
                  "timing": timing,
                  "focusedElementId": snapshot.get("focusedElementId"),
                  "truncation": snapshot.get("truncation"),
                  "screenshot": screenshot.get("retainedPath"),
                  "verification": result.get("action", {}).get("verification")}, ensure_ascii=False))
if source_view:
    print("Source-view accessibility text is retained locally; omitted from console output.")
    raise SystemExit(0)
math_depth = None
for line in tree.splitlines():
    depth = len(line) - len(line.lstrip("\t"))
    if math_depth is not None and depth > math_depth:
        continue
    math_depth = None
    if re.match(r"\s*\d+ math\s*$", line):
        math_depth = depth
        print(line + " [full subtree retained in evidence]")
    else:
        print(line)
