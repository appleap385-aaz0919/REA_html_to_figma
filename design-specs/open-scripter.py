import json,re,subprocess
from pathlib import Path
root=Path(__file__).resolve().parent;cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'));base=[cfg['executable'],'--session','figma-storyboard','--cdp',cfg['cdp'],'--pin-tab','--no-auto-dialog','--json']
def call(a):
 r=json.loads(subprocess.run(base+a,capture_output=True,encoding='utf-8',timeout=60).stdout)
 if not r.get('success'):raise RuntimeError(r)
 return r['data']
tabs=call(['tab','list'])['tabs'];tab=next(t for t in tabs if 'figma.com/design/xCjdhdFkSbToMiRVlXVN2V/' in t['url']);call(['tab',tab['tabId']]);call(['frame','main']);s=call(['snapshot'])['snapshot']
if 'dialog "Scripter"'not in s:
 call(['press','Control+/']);s=call(['snapshot'])['snapshot'];m=re.search(r'button "Scripter" \[ref=(e\d+)\]',s)
 if not m:raise RuntimeError(s[-3000:])
 call(['click','@'+m.group(1)])
print('Scripter ready in the requested Figma file')
