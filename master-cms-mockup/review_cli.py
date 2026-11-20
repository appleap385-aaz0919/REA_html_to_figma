"""Offline handoff between the review UI and an agent editing this repository.
Read: python -X utf8 review_cli.py list work.json
Result: python -X utf8 review_cli.py result work.json --number 1 --summary "..." --evidence "..." --no-policy-change --out result.json
Does not edit code or approve a request. Import the result in the UI after actual work.
"""
from pathlib import Path
import argparse, json
from datetime import datetime, timezone

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('command', choices=['list', 'result'])
    p.add_argument('packet', type=Path)
    p.add_argument('--number', type=int)
    p.add_argument('--summary')
    p.add_argument('--evidence')
    p.add_argument('--out', type=Path)
    policy=p.add_mutually_exclusive_group()
    policy.add_argument('--policy-changes')
    policy.add_argument('--no-policy-change',action='store_true')
    a = p.parse_args()
    packet = json.loads(a.packet.read_text(encoding='utf-8-sig'))
    if packet.get('schema') != 'master-cms-review-work/1':
        p.error('Select an exported work packet, not a full review archive.')
    if a.command == 'list':
        for item in packet['items']:
            print(f"#{item['number']} [{item['status']}] {item['context']['route']} {item['request']}")
        return
    item = next((i for i in packet['items'] if i['number'] == a.number), None)
    if not item or not a.summary or not a.evidence or not a.out:
        p.error('--number, --summary, --evidence and --out are required.')
    if a.out.resolve() == a.packet.resolve() or a.out.exists():
        p.error('Output must be a new file; archives and existing results are never overwritten.')
    if a.policy_changes is None and not a.no_policy_change:p.error('정책 검토 후 --policy-changes 또는 --no-policy-change를 지정하세요.')
    result = {'schema': 'master-cms-review-result/1', 'created': datetime.now(timezone.utc).isoformat(),
              'results': [{'id': item['id'], 'baseUpdated': item['updated'], 'summary': a.summary,
                           'evidence': a.evidence,'policyChanges': a.policy_changes or ''}]}
    a.out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(a.out)

if __name__ == '__main__':
    main()
