"""Publish the actual Figma Description export to offline HTML and the granted folder.

First run design-specs/export-review-descriptions.js through Figma's public plugin API,
save its DESCRIPTION_EXPORT JSON as design-specs/figma-review-descriptions-export.json,
then run this command. No Figma content, user requests or CMS data are modified.
"""
import argparse, hashlib, json, os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'design-specs/figma-review-descriptions-export.json'


def build(source=SOURCE):
    import re
    raw = json.loads(Path(source).read_text(encoding='utf-8'))
    if raw.get('schema') != 'master-cms-figma-description-export/1':
        raise ValueError('실제 Figma Description 내보내기 파일이 필요합니다.')
    if len(raw['screens']) != 30:
        raise ValueError('기본 화면 30개를 모두 내보내세요.')
    titles = {s['id']: s['title'] for s in json.loads((ROOT / 'design-specs/revision-aligned-plan.json').read_text(encoding='utf-8'))['screens']}
    screens, modals = [], []
    for screen in raw['screens']:
        notes = [{k: n[k] for k in ('key', 'number', 'label', 'body')} for n in screen['notes']]
        if any(not n.get('rendered') for n in screen['notes']):
            raise ValueError('화면에 표시된 실제 설명을 읽지 못했습니다: ' + screen['key'])
        screens.append(dict(id=screen['key'], frame=screen['frame'], title=titles[screen['key']], notes=notes))
        for modal in screen['modals']:
            texts = modal['texts']
            policy = next(t for t in texts if t['text'] == '동작·정책·예외')
            right = [t for t in texts if t['x'] >= policy['x']]
            body = next(t['text'] for t in right if t['x'] == policy['x'] and t['y'] > policy['y'])
            variants, current = [], None
            for i, t in enumerate(right):
                if t['text'].endswith('· 요소 설명') or t['text'] == '기존 요소 설명 · 번호 유지':
                    current = dict(label=t['text'].removesuffix(' · 요소 설명'), notes=[])
                    variants.append(current)
                    continue
                match = re.match(r'^(\d{2})\s+(.+)$', t['text'])
                if not match:
                    continue
                if current is None:
                    raise ValueError('팝업 요소 설명 구분 누락: ' + modal['modalId'])
                following = [n for n in right[i+1:] if n['x'] == t['x'] and n['y'] > t['y']]
                detail = following[0]['text'] if following else ''
                number = int(match[1])
                current['notes'].append(dict(key=str(number), number=number, label=match[2].strip(), body=detail))
            modals.append(dict(id=modal['modalId'], screen=screen['key'], frame=modal['id'],
                               title=texts[0]['text'], body=body, variants=variants))
    for view in screens + [v for m in modals for v in m['variants']]:
        nums = [n['number'] for n in view['notes']]
        keys = [n['key'] for n in view['notes']]
        if not nums or len(nums) != len(set(nums)) or len(keys) != len(set(keys)):
            raise ValueError('설명 번호 누락 또는 중복')
    if len(modals) != 52:
        raise ValueError('팝업 52개를 모두 내보내세요.')
    value = dict(schema='master-cms-descriptions/1', capturedAt=raw['capturedAt'],
                 fileKey=raw['file'], screens=screens, modals=modals)
    content = json.dumps(value, ensure_ascii=False, sort_keys=True)
    value['revision'] = hashlib.sha256(content.encode()).hexdigest()
    return value


def publish(source=SOURCE):
    value = build(source)
    encoded = json.dumps(value, ensure_ascii=False, separators=(',', ':'))
    targets = {
        ROOT / 'master-cms-mockup/description-data.js': '/* Generated from actual Figma descriptions. Run publish_descriptions.py; do not edit by hand. */\nwindow.CMSDescriptionData=' + encoded + ';\n',
        ROOT / 'review-work/runtime-browser/descriptions.json': encoded,
    }
    for path, text in targets.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        if path.exists() and path.read_text(encoding='utf-8') == text:
            continue
        temporary = path.with_suffix(path.suffix + '.tmp')
        temporary.write_text(text, encoding='utf-8')
        os.replace(temporary, path)
    return dict(revision=value['revision'], capturedAt=value['capturedAt'], screens=len(value['screens']),
                notes=sum(len(s['notes']) for s in value['screens']), modals=len(value['modals']))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=SOURCE)
    args = parser.parse_args()
    print(json.dumps(publish(args.source), ensure_ascii=False))
