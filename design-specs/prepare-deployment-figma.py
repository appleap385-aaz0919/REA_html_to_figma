"""Embed local capture bytes and the confirmed delta in a public-plugin script."""
from pathlib import Path
import base64,json
ROOT=Path(__file__).resolve().parent.parent
delta=json.loads((ROOT/'design-specs/deployment-policy-delta.json').read_text(encoding='utf-8'))
assets=json.loads((ROOT/'design-specs/policy-evidence/deployment-visuals/manifest.json').read_text(encoding='utf-8'))
for a in assets.values():a['base64']=base64.b64encode((ROOT/a['path']).read_bytes()).decode('ascii')
source=(ROOT/'design-specs/deployment-policy-apply.template.js').read_text(encoding='utf-8')
source=source.replace('__DELTA__',json.dumps(delta,ensure_ascii=False)).replace('__ASSETS__',json.dumps(assets,ensure_ascii=False))
(ROOT/'design-specs/deployment-policy-apply.js').write_text(source,encoding='utf-8')
print('Prepared public-plugin delta:',len(source),'characters;',len(assets),'HTML captures.')
