import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
assert all(not x['draft']['hasDraft'] for x in ev(2603)['results'])
checks=ev(2617)['results'];assert [x['itemId'] for x in checks if x['draft']['hasDraft']]==[2089358]
assert ev(2619)==ev(2593) and ev(2620)==ev(2594)
assert ev(2621)==ev(2595) and ev(2622)==ev(2596)
baseline={x['itemId']:x for x in ev(2604)['items']};drafts={x['itemId']:x for x in ev(2618)['items']};marker='[QA-COPY-SHARED-DRAFT-20261110]'
for iid,after in drafts.items():
 before=baseline[iid]
 assert after['savedOMR']==before['savedOMR'] and after['slots']==before['slots']
 if iid!=2089358:assert after==before
 else:
  assert after['loadDraft']=='true' and after['editorUrl'].endswith('itemDetailId=2089077')
  old={x['id']:x['model'] for x in before['editorData']};new={x['id']:x['model'] for x in after['editorData']}
  assert old['questionEditorData']==new['questionEditorData']
  assert marker not in old['passageEditorData']['content']['promptText'] and marker in new['passageEditorData']['content']['promptText']
  assert new['passageEditorData']['passageKey']=='passage:2089241'
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==60,'Already recorded or chronology changed; no replay.'
ledger['entries'].append({'operation':'CMS Temp Save copied shared HTML passage marker on selected child2089358','itemId':2089358,'logicalCopyPassageId':2089357,'embeddedDocumentPassageKey':'passage:2089241','submitEvidence':2615,'readbackEvidence':[2617,2618,2619,2620,2621,2622],'newDraftItemIds':[2089358],'draftDetailId':2089077,'publishedOriginalAndCopyItemsUnchanged':True,'otherCopySiblingsHaveNoDraft':True,'originalSetAndControlHaveNoDraft':True,'questionOmrHmlUnchanged':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'copied-set-shared-temp-isolation-intent-20261110.json';d=read(p.name);d.update(status='selected_child_shared_temp_confirmed_publish_pending',tempSubmitEvidence=2615,tempReadbackEvidence=[2617,2618,2619,2620,2621,2622],draftItemIds=[2089358],draftDetailId=2089077,publishedCopyDetailIdsUnchanged=[2089059,2089060,2089061,2089062],embeddedDocumentPassageKey='passage:2089241',confirmedMasterOperations=61);p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed shared-passage CMS Temp Save creates only selected child draft2089077; all published items retained; Master61.')
