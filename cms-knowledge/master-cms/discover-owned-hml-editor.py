import json
import subprocess
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
root=Path(__file__).resolve().parent
config=json.loads((root/'agent-browser-session.json').read_text(encoding='utf-8'))
args=[config['executable'],'--session',config['session'],'--cdp',config['cdp'],'--pin-tab','--no-auto-dialog','tab','list','--json']
result=json.loads(subprocess.run(args,capture_output=True,encoding='utf-8',errors='replace',timeout=50).stdout)
assert result.get('success'),result.get('error')
def match(tab):
    u=urlsplit(tab.get('url',''));q=parse_qs(u.query)
    return u.hostname==config['scopeHost'] and u.path=='/item/webhwp/editor.donga' and q.get('itemId')==['2089242'] and q.get('itemDetailId')==['2088906']
tabs=[t for t in result['data']['tabs'] if match(t)]
record={'label':'2304-own-hml-editor-target-discovery','method':'Filter browser tab inventory to exact observed own editor URL; unrelated tab metadata not retained','matches':tabs}
(root/'evidence'/'2304-own-hml-editor-target-discovery.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
assert len(tabs)==1,'Expected one exact owned editor target'
target=tabs[0]['targetId']
plan={'steps':[
 {'label':'2305-own-hml-editor-target-select','command':['tab',target]},
 {'label':'2306-own-hml-editor-frame-observation','command':['eval','--file','sources/runtime/hml-frame-observation.js']},
 {'label':'2307-own-hml-editor-opener-and-slots','command':['eval','--file','sources/runtime/hml-parent-slots.js']},
 {'label':'2308-own-hml-editor-root-source','command':['eval','--file','sources/runtime/sanitized-page-source.js']}
],'tailChars':180}
(root/'scenarios'/'own-hml-editor-observe-after-open.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(record,ensure_ascii=False))
