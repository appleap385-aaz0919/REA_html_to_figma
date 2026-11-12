"""Print only authorized CMS tab metadata from the existing browser session."""
import json
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlsplit

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parent
config = json.loads((root / "agent-browser-session.json").read_text(encoding="utf-8"))
args = [config["executable"], "--session", config["session"], "--cdp", config["cdp"],
        "--pin-tab", "--no-auto-dialog", "tab", "list", "--json"]
result = json.loads(subprocess.run(args, capture_output=True, encoding="utf-8", timeout=30).stdout)
if not result.get("success"):
    raise SystemExit(result.get("error"))
print(json.dumps([t for t in result["data"]["tabs"]
                  if urlsplit(t.get("url", "")).hostname == config["scopeHost"]], ensure_ascii=False))
