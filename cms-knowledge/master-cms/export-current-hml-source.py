"""Export only the source already observed in evidence1110; no browser control."""
import difflib
import hashlib
import json
import sys
from pathlib import Path
from urllib.parse import urlsplit

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parent
evidence = json.loads((root / 'evidence/1110-hml-current-glue-source.json').read_text(encoding='utf-8'))
result = evidence['action']['data']['result']
assert result['assetStatus'] == 200 and 'javascript' in result['contentType']
source = result.pop('source')
name = urlsplit(result['assetUrl']).path.rsplit('/', 1)[1]
destination = root / 'sources/assets' / name
destination.write_text(source, encoding='utf-8')
previous = root / 'sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js'
result.update({'bytes': len(source.encode('utf-8')), 'sha256': hashlib.sha256(source.encode('utf-8')).hexdigest(),
               'path': str(destination.relative_to(root)), 'evidence':1110,
               'previousPath':str(previous.relative_to(root)),
               'previousHashedAssetHttpStatusOn20261109':404})
(root / 'sources/hml-glue-20261109.manifest.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
changes = ''.join(difflib.unified_diff(previous.read_text(encoding='utf-8').splitlines(True), source.splitlines(True),
                                      fromfile=previous.name, tofile=name))
(root / 'sources/hml-glue-20261109.diff').write_text(changes, encoding='utf-8')
print(json.dumps(result, ensure_ascii=False))
print(changes[:13000])
