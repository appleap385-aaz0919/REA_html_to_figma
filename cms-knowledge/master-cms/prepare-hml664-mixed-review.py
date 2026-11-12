import json,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-import-intent.json');assert intent['status']=='registration_confirmed_parsing_pending'
state=read('evidence/2020-hml664-draft-block-inventory.json')['action']['data']['result']
assert state['blockCount']==18 and state['questionCount']==18 and all(b['judge']=='S' and len(b['itemIds'])==1 for b in state['blocks'])
ids=[b['itemIds'][0] for b in state['blocks']]
assert ids==[str(i) for i in range(2089215,2089233)]
raw=(root/'fixtures/hml101-original-20261109.hml').read_bytes();assert b'<!DOCTYPE' not in raw and b'<!ENTITY' not in raw
xml=ET.fromstring(raw);chars=[e.text or '' for e in xml.iter('CHAR')]
file_report={'evidence':2000,'bytes':len(raw),'xmlRoot':xml.tag,'xmlAttributes':xml.attrib,'charNodes':len(chars),'firstBodyText':' '.join(chars)[:1200],'behavior':'Read local XML only; no external references resolved and no document code executed.','existingDisplayed101Questions':5,'newlyParsed664Blocks':18,'newlyParsed664Questions':18,'newlyParsedSetBlocks':0,'differenceCause':'Unknown. Existing displayed seed/history data, original-file association and parser version effects not distinguished.'}
write('hml101-file-and-reparse-comparison-20261109.json',file_report)
write('hml664-draft-inventory-20261109.json',state)
intent.update(status='draft_confirmed_mixed_review_prepared',currentObservedState='R',draftReadbackEvidence=[2016,2017,2018,2019,2020],actualBlockCount=18,actualQuestionCount=18,actualSetBlocks=0,createdItemIds=[int(x) for x in ids],sourceVsReparseDifference='Original101 displayed5questions including a set; downloaded same-byte file reparsed as18single questions. Do not assume the displayed original structure describes the file or current parser output.',futureSetInvestigationRequired=True,
 plannedReview={'successItemIds':[2089216],'failedItemIds':[2089215],'deleteItemIds':[int(x) for x in ids[2:]],'paperRegYn':'Y','remark':'QA-HML-20261109-01: isolated mixed review; S=block2, F=block1, D=blocks3-18; create paper.','rationale':'Actual output has18singles; block2 inverse-proportion question selected as sole success for middle1 range. Set deletion must be tested on another real set file.'})
write('hml-qa-import-intent.json',intent)
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==30 and ledger['entries'][-1]['examDocumentId']==664
ledger['entries'][-1].update(readbackEvidence=[2014,2016,2017,2020],createdItemIds=[int(x) for x in ids],observedState='R',status='Registration P→R and18single parsed items confirmed; old displayed101 structure differs from reparse. Final mixed review not submitted yet.')
write('mutation-ledger.json',ledger)
print(json.dumps({'actualBlocks':18,'actualQuestions':18,'sets':0,'plannedReview':intent['plannedReview'],'xmlFirstText':file_report['firstBodyText'][:350]},ensure_ascii=False))
