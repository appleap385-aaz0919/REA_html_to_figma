import json,re
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def write(n,v):(root/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
intent=read('hml-qa-set-intent.json');assert intent['status']=='registration_confirmed_parsing_pending'
state=read('evidence/2072-hml665-small-set-draft-controls.json')['action']['data']['result']
assert len(state['judges'])==2 and state['judges'][0]['itemIds']=='2089234,2089235,2089236,2089237' and state['judges'][1]['itemIds']=='2089238' and all(s['value']=='S' for s in state['judges'])
text=read('evidence/2069-hml665-small-set-initial-state.json')['action']['data']['result']['tail'];assert '지문ID 2089233 (1932)' in text and '초안' in text
intent.update(status='draft_confirmed_set_delete_prepared',currentObservedState='R',draftReadbackEvidence=[2069,2070,2071,2072],actualBlockCount=2,actualQuestionCount=5,createdPassageId=2089233,createdPassageDetailId=1932,createdSetChildItemIds=[2089234,2089235,2089236,2089237],createdSingleItemId=2089238,createdItemDetailIds=[2088866,2088867,2088868,2088869,2088870],draftPixelEvidence=[2073,2074],
 plannedReview={'setBlock':'1','setLoadFlag':'D','singleBlock':'2','singleLoadFlag':'S','deleteItemIds':[2089234,2089235,2089236,2089237],'successItemIds':[2089238],'paperRegYn':'Y','remark':'QA-HML-20261109-02: delete own four-child set; keep own single; create paper.'})
write('hml-qa-set-intent.json',intent)
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==32 and ledger['entries'][-1]['examDocumentId']==665
ledger['entries'][-1].update(readbackEvidence=[2067,2069,2070,2072],createdPassageId=2089233,createdItemIds=[2089234,2089235,2089236,2089237,2089238],observedState='R',status='Actual expected4-child set plus1single and new passage confirmed; no final review submitted yet.')
write('mutation-ledger.json',ledger)
print(json.dumps({'documentId':665,'passage':2089233,'setChildren':intent['createdSetChildItemIds'],'single':2089238,'review':intent['plannedReview']}))
