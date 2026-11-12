"""Preserve explicitly scoped agent-browser actions and their observed post-state."""
import argparse
import base64
import json
import re
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

sys.stdout.reconfigure(encoding="utf-8")
parser = argparse.ArgumentParser()
parser.add_argument("label")
parser.add_argument("--no-screenshot", action="store_true")
parser.add_argument("--full-page", action="store_true")
parser.add_argument("--jpeg", action="store_true")
parser.add_argument("command", nargs=argparse.REMAINDER)
options = parser.parse_args()
if not re.fullmatch(r"\d{3,5}-[a-z0-9-]+", options.label):
    parser.error("Use a numbered evidence label.")
command = options.command[1:] if options.command[:1] == ["--"] else options.command
if not command:
    parser.error("Provide one agent-browser command.")
root = Path(__file__).resolve().parent
config = json.loads((root / "agent-browser-session.json").read_text(encoding="utf-8"))
base = [config["executable"], "--session", config["session"], "--cdp", config["cdp"],
        "--pin-tab", "--no-auto-dialog", "--json"]
record = {"schemaVersion": 1, "controller": "agent-browser", "label": options.label,
          "startedUtc": datetime.now(timezone.utc).isoformat(), "command": command,
          "session": config["session"], "targetId": config["cmsTargetId"]}
evidence = root / "evidence"
evidence.mkdir(exist_ok=True)
if (evidence / (options.label + ".json")).exists():
    raise SystemExit("Label already recorded; choose a new evidence label. No browser command was sent.")

def run(arguments):
    started = time.perf_counter()
    process = subprocess.run(base + arguments, capture_output=True, encoding="utf-8",
                             errors="replace", timeout=50)
    response = json.loads(process.stdout)
    if isinstance(response, list):
        response = {"success": all(r.get("success", False) for r in response), "data": {"batch": response}}
    response["localSeconds"] = round(time.perf_counter() - started, 3)
    return response

def save():
    (evidence / (options.label + ".json")).write_text(
        json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
    cursor = {"evidence": options.label, "controller": "agent-browser", "session": config["session"],
              "targetId": config["cmsTargetId"], "command": command, "stage": record.get("stage"),
              "startedUtc": record["startedUtc"], "freshObservationRequired": True}
    (root / "live-capture-cursor.json").write_text(json.dumps(cursor, ensure_ascii=False, indent=2), encoding="utf-8")

record["before"] = run(["get", "url"])
before_url = (record["before"].get("data") or {}).get("url", "")
if not record["before"].get("success") or urlsplit(before_url).hostname != config["scopeHost"]:
    save()
    raise SystemExit("Stopped: active tab is not the authorized development CMS.")
inventory = run(["tab", "list"])
selected = next((t for t in (inventory.get("data") or {}).get("tabs", []) if t.get("active")), None)
if not selected or selected.get("url") != before_url:
    save()
    raise SystemExit("Stopped: selected tab changed during scope verification; take a fresh snapshot.")
record["targetIdBefore"] = selected["targetId"]
record["targetId"] = selected["targetId"]
run_command = command
if command[:2] == ["eval", "--file"] and len(command) == 3:
    script_path = (root / command[2]).resolve()
    script = script_path.read_text(encoding="utf-8")
    run_command = ["eval", "-b", base64.b64encode(script.encode("utf-8")).decode("ascii")]
record["stage"] = "action_requested_outcome_not_yet_observed"
save()
record["action"] = run(run_command)
if command[0] == "tab" and len(command) > 1 and command[1] not in {"list", "close"}:
    destination = (record["action"].get("data") or {}).get("targetId")
    if destination:
        record["targetIdAfter"] = destination
        record["targetId"] = destination
record["stage"] = "action_returned"
if not record["action"].get("success"):
    save()
    print(json.dumps(record["action"], ensure_ascii=False))
    raise SystemExit(1)
record["snapshot"] = record["action"] if command[0] == "snapshot" else run(["snapshot"])
record["stage"] = "post_snapshot_returned"
data = record["snapshot"].get("data") or {}
tree = data.get("snapshot", "")
(evidence / (options.label + ".txt")).write_text(tree, encoding="utf-8")
if not options.no_screenshot:
    image_path = evidence / (options.label + (".jpg" if options.jpeg else ".png"))
    screenshot_args = ["screenshot", str(image_path)]
    if options.jpeg:
        screenshot_args.extend(["--screenshot-format", "jpeg", "--screenshot-quality", "85"])
    if options.full_page:
        screenshot_args.append("--full")
    record["screenshot"] = run(screenshot_args)
save()
retained_image = evidence / (options.label + (".jpg" if options.jpeg else ".png"))
print(json.dumps({"evidence": options.label, "controller": "agent-browser",
                  "url": data.get("origin"), "actionSeconds": record["action"]["localSeconds"],
                  "snapshotSeconds": record["snapshot"]["localSeconds"],
                  "actionResult": record["action"].get("data") if command[0] not in {"snapshot"} else None,
                  "screenshot": str(retained_image) if not options.no_screenshot and retained_image.exists() else None,
                  "screenshotError": record.get("screenshot", {}).get("error")},
                 ensure_ascii=False))
print(tree)
