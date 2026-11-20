"""Restore the pre-review workspace, preserving displaced files. No git reset or delete.
Run with --check to verify; --apply to restore. Close the mockup first.
"""
from pathlib import Path
import argparse, hashlib, json, shutil, zipfile
from datetime import datetime

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent.resolve()
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--apply', action='store_true')
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
manifest = json.loads((HERE/'manifest.json').read_text(encoding='utf-8'))
with zipfile.ZipFile(HERE/'baseline.zip') as z:
    for entry in manifest:
        target = (ROOT/entry['path']).resolve()
        if ROOT not in target.parents:
            raise SystemExit('Unsafe target: '+str(target))
        assert hashlib.sha256(z.read(entry['path'])).hexdigest() == entry['sha256'], entry['path']
    print('Verified baseline:', len(manifest), 'files')
    if not args.apply:
        print('No changes. Use --apply to restore; current files will be preserved.')
        raise SystemExit(0)
    safety = HERE/('displaced-'+datetime.now().strftime('%Y%m%d-%H%M%S-%f'))
    safety.mkdir()
    mock = (ROOT/'master-cms-mockup').resolve()
    if mock.parent != ROOT:
        raise SystemExit('Unsafe mockup path')
    if mock.exists():
        shutil.move(str(mock), str(safety/'master-cms-mockup'))
    for entry in manifest:
        path = ROOT/entry['path']
        if path.exists():
            copy = safety/entry['path']
            copy.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, copy)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(z.read(entry['path']))
    for entry in manifest:
        assert hashlib.sha256((ROOT/entry['path']).read_bytes()).hexdigest() == entry['sha256']
print('Restored. Displaced files:', safety)
print('Browser review data is separate. Export it before clearing its localStorage key.')
