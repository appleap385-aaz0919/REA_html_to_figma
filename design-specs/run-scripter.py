import json, re, subprocess, sys, time
from pathlib import Path
root=Path(__file__).resolve().parent
cfg=json.loads((root.parent/"cms-knowledge/master-cms/agent-browser-session.json").read_text(encoding="utf-8"))
base=[cfg["executable"],"--session","figma-storyboard","--cdp",cfg["cdp"],"--pin-tab","--no-auto-dialog","--json"]
def call(args, stdin=None):
    p=subprocess.run(base+args,input=stdin,capture_output=True,encoding="utf-8",timeout=60)
    r=json.loads(p.stdout)
    if isinstance(r,list):
        if any(not x.get('success') for x in r):raise RuntimeError(str([x.get('error')for x in r if not x.get('success')]))
        return {'batch':r}
    if not r.get("success"): raise RuntimeError(str(r.get('error')))
    return r.get("data",{})
code=Path(sys.argv[1]).read_text(encoding="utf-8")
call(["frame","main"])
for _ in range(7):
    snap=call(["snapshot"])["snapshot"]
    if 'textbox "Editor content' in snap:
        break
    iframe=re.search(r'Iframe[^\n]*\[ref=(e\d+)\]',snap)
    if not iframe:
        raise RuntimeError(snap[:1000])
    call(["frame",'@'+iframe.group(1)])
ref=re.search(r'textbox "Editor content[^\n]+\[ref=(e\d+)\]',snap).group(1)
call(["focus","@"+ref])
call(["press","Control+Home"])
call(["press","Control+a"])
call(["press","Backspace"])
call(['batch','--bail','--omit-command'],json.dumps([['keyboard','inserttext',code]],ensure_ascii=False))
time.sleep(8 if len(code)>1000000 else 1)
batch=re.search(r'const BATCH=(\d+);',code)
if batch:
    call(['press','Control+Home'])
    observed=call(['snapshot'])['snapshot']
    if ('const BATCH='+batch.group(1)+';') not in observed[:2000]:
        raise RuntimeError('New script not observed in editor: '+observed[:350])
call(["press","Control+Enter"])
call(["frame","main"])
print("Script submitted through Scripter UI:",Path(sys.argv[1]).name)
batch=re.search(r'const BATCH=(\d+);',code)
if batch:
    marker='CMS 스토리보드 배치 '+batch.group(1)+' 완료'
    for attempt in range(30):
        snapshot=call(['snapshot'])['snapshot']
        if marker in snapshot:
            print(marker)
            break
        time.sleep(1)
    else:
        call(['screenshot',str(root/('failure-'+Path(sys.argv[1]).stem+'.png'))])
        raise RuntimeError('Batch completion was not observed. Inspect the plugin output before rerunning.')

