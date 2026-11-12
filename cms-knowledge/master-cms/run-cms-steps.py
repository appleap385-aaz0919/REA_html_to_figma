"""Run a bounded, reviewed sequence; resolve each control from fresh captured state."""
import json
import re
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parent
plan = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
state = ""
for step in plan["steps"]:
    command = list(step["command"])
    if "refPattern" in step:
        scope = state
        if "scopeAfter" in step:
            marker = step["scopeAfter"]
            if marker not in scope:
                raise SystemExit("Required scope missing: " + marker)
            scope = scope[scope.rindex(marker):]
        matches = list(re.finditer(step["refPattern"], scope))
        expected = step.get("expectMatches", 1)
        if len(matches) != expected:
            raise SystemExit(f"Stopped before {step['label']}: expected {expected} fresh refs, found {len(matches)}")
        ref = "@" + matches[step.get("matchIndex", 0)].group(1)
        command = [ref if value == "{ref}" else value for value in command]
    arguments = [sys.executable, str(root / "agent_capture.py")]
    if not step.get("screenshot", False):
        arguments.append("--no-screenshot")
    elif step.get("jpeg", False):
        arguments.append("--jpeg")
    arguments.extend([step["label"], "--", *command])
    run = subprocess.run(arguments, capture_output=True, encoding="utf-8", errors="replace")
    state = run.stdout
    if run.returncode:
        print(state)
        print(run.stderr)
        raise SystemExit(run.returncode)
    meta = json.loads(state.splitlines()[0])
    summary = {key: meta.get(key) for key in ("evidence", "actionSeconds", "screenshot", "screenshotError")}
    action_result = meta.get("actionResult") or {}
    if "result" in action_result:
        observation = action_result["result"]
        if isinstance(observation, dict):
            observation = {key: ({"charactersRetainedInEvidence":len(value)} if key in {"html", "source"} and isinstance(value,str)
                                 else value) for key,value in observation.items()}
            if len(json.dumps(observation, ensure_ascii=False)) > 1200:
                observation = {"retainedEvidence":step["label"]+".json", "keys":list(observation),
                               "arrayCounts":{key:len(value) for key,value in observation.items() if isinstance(value,list)}}
        summary["observation"] = observation
    print(json.dumps(summary, ensure_ascii=False), flush=True)
    if meta.get("screenshotError") and plan.get("stopOnScreenshotFailure", True):
        raise SystemExit("Stopped after screenshot failure; captured DOM/action evidence is retained. Re-observe before another pixel attempt.")
    for text in step.get("assertText", []):
        if text not in state:
            raise SystemExit("Post-state assertion missing: " + text)
print(state[-plan.get("tailChars", 8000):])
