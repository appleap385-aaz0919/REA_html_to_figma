"""Export a sanitized DOM already captured in an evidence record."""
import hashlib
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
root=Path(__file__).resolve().parent
for pair in sys.argv[1:]:
    label,name=pair.split('=',1)
    result=json.loads((root/'evidence'/f'{label}.json').read_text(encoding='utf-8'))['action']['data']['result']
    html=result['html']
    target=root/'sources'/f'{name}.html'
    target.write_text(html,encoding='utf-8')
    manifest={k:v for k,v in result.items() if k!='html'}
    manifest.update({'evidence':label,'bytes':len(html.encode('utf-8')),'sha256':hashlib.sha256(html.encode('utf-8')).hexdigest()})
    (root/'sources'/f'{name}.schema.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'path':str(target.relative_to(root)),**manifest},ensure_ascii=False))
