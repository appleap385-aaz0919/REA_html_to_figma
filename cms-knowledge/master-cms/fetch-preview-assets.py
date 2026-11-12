"""Read only explicitly referenced public JS resources from the observed OMR entry."""
import hashlib
import json
import re
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen

root = Path(__file__).resolve().parent
html = (root / "sources/omr-preview-entry.html").read_text(encoding="utf-8")
paths = sorted(set(re.findall(r"/_nuxt/[A-Za-z0-9._/-]+\.js", html)))
out = root / "sources/omr-preview-assets"
out.mkdir(exist_ok=True)
def fetch(path):
    url = "https://dev-exambank.douclass.com" + path
    result = {"url": url}
    try:
        with urlopen(url, timeout=20) as response:
            data = response.read(8 * 1024 * 1024 + 1)
            if len(data) > 8 * 1024 * 1024:
                raise ValueError("resource exceeds8MiB budget")
            result.update(status=response.status, bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
        destination = out / Path(path).name
        destination.write_bytes(data)
        result["path"] = str(destination.relative_to(root))
    except Exception as error:
        result["error"] = str(error)
    return result
with ThreadPoolExecutor(max_workers=4) as pool:
    resources = list(pool.map(fetch, paths))
manifest = {"entryUrl": "https://dev-exambank.douclass.com/omr-preview", "observedUtc": datetime.now(timezone.utc).isoformat(),
            "rule": "Only literal JS paths already present in the public entry HTML. No credentials or browser profile access.", "resources": resources}
(root / "sources/omr-preview-assets.manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"references": len(paths), "downloaded": sum("path" in r for r in resources), "errors": [r for r in resources if "error" in r]}, ensure_ascii=False))
