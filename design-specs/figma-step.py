import base64, json, subprocess, sys
from pathlib import Path
root = Path(__file__).resolve().parent
cfg = json.loads((root.parent / "cms-knowledge/master-cms/agent-browser-session.json").read_text(encoding="utf-8"))
args = sys.argv[1:]
stdin_text = None
if args[:2] == ['label', 'section']:
    args = ['fill', '@e526', 'MST_ITM_01 전체 문항 목록']
if args[:2] == ['label', 'frame']:
    args = ['keyboard', 'type', 'MST_ITM_01 전체 문항 목록 · 화면설계서']
if args[:2] == ['page', 'rename']:
    args = ['fill', '@e85', '01 문항 관리']
if args[:2] == ["clipboard", "file"]:
    stdin_text = 'navigator.clipboard.writeText(' + json.dumps(Path(args[2]).read_text(encoding='utf-8')) + ').then(()=>({written:true}))'
    args = ['eval', '--stdin']
if args[:2] == ["eval", "--file"]:
    args = ["eval", "-b", base64.b64encode(Path(args[2]).read_bytes()).decode()]
command = [cfg["executable"], "--session", "figma-storyboard", "--cdp", cfg["cdp"], "--pin-tab", "--no-auto-dialog", "--json"]
r = subprocess.run(command + args, input=stdin_text, capture_output=True, encoding="utf-8", timeout=50)
try:
    result = json.loads(r.stdout)
    print(result['data']['snapshot'] if args == ['snapshot'] and result.get('success') else r.stdout)
except (ValueError, KeyError, TypeError):
    print(r.stdout)
if r.returncode: print(r.stderr)
sys.exit(r.returncode)

