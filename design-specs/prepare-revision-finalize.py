import json
from pathlib import Path
root=Path(__file__).resolve().parent
d=json.loads((root/'revision-consolidated-plan.json').read_text(encoding='utf-8'))
for s in d['screens']:
 s.pop('assets',None)
 for n in s['notes']:n.pop('body',None)
 s.pop('modals',None);s.pop('variants',None)
prefix=(root/'revision-runtime.js').read_text(encoding='utf-8').split('let built=0;')[0]
template=(root/'revision-finalize.template.js').read_text(encoding='utf-8').replace('PLAN',json.dumps(d,ensure_ascii=False))
(root/'revision-finalize.js').write_text('const BATCH=990;\nconst INPUT=[];\n'+prefix+template,encoding='utf-8')
print('Finalizer ready')
