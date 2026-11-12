"""Record twin main-list/detail coverage; no browser control or CMS mutations."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

root=Path(__file__).resolve().parent
phase_name='session-20261109-phase17.json'
if (root/phase_name).exists(): raise SystemExit('Phase already recorded.')
def read(name): return json.loads((root/name).read_text(encoding='utf-8'))
def write(name,value): (root/name).write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf-8')
class Rows(HTMLParser):
    def __init__(self): super().__init__();self.rows=[];self.row=None;self.cell=None;self.link=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='tr':self.row=[];self.link=None
        elif tag=='td' and self.row is not None:self.cell=[]
        elif tag=='a' and self.cell is not None and 'twinGroupId=' in attrs.get('href',''):self.link=attrs['href']
    def handle_data(self,text):
        if self.cell is not None:self.cell.append(text)
    def handle_endtag(self,tag):
        if tag=='td' and self.cell is not None:self.row.append(' '.join(''.join(self.cell).split()));self.cell=None
        elif tag=='tr' and self.row is not None:
            if len(self.row)==6 and self.row[0].isdigit():self.rows.append(dict(zip(['groupId','type','representativeQuestion','countLabel','modifier','modifiedAt'],self.row),href=self.link))
            self.row=None;self.cell=None
parser=Rows();parser.feed((root/'sources/twin-list-20261109.html').read_text(encoding='utf-8'))
assert len(parser.rows)==43 and len({r['groupId'] for r in parser.rows})==43
distribution=dict(Counter(r['type'] for r in parser.rows))
write('twin-groups-20261109.json',{'sourceEvidence':1137,'observedCount':43,'typeCounts':distribution,'groups':parser.rows})
phase={'schemaVersion':1,'date':'2026-11-09','status':'evidence_recorded','evidenceRange':[1111,1143],
 'observations':[
  {'evidence':[1113,1116,1118,1119,1120,1137],
   'result':'Twin main list has43groups at this observation; fields Group ID, type(single/set), representative question, count, modifier, modified time. Only page-size10/30/50/100 and pagination are displayed; no search fields/create/edit/delete controls in this current-account page. Selecting50 exposes all43rows, stored in twin-groups-20261109.json. Top/middle/bottom pixels inspected; actual bottom1155+1015=2170.'},
  {'evidence':[1123,1124], 'result':'Single group2088665 shows8members with itemId/question/unitCode/type+difficulty/status, including source2038004 and testcopy2088985. Group ID is distinct from representative itemId. Detail has group type/count/modifier/modifiedAt and List link. Member item links declare target=_blank rel=noopener; actual new-tab opening not exercised here.'},
  {'evidence':[1129,1130,1131,1132,1133], 'result':'Set group2087985 count2sets, displayed as separate cards for setIds2087031 and2087983,6members each. First set approved, second draft in this sample. Item2087036 and2087989 show2unit mappings. True bottom383+1015=1398; top/bottom pixels inspected. No visible group mutation controls in sampled variants.'},
  {'evidence':[1135,1136,1138,1140,1141,1142,1143], 'result':'List return preserves50perpage. Changing to10 resets page1. Last navigation opens page5 with groups364,332,331 and41-43of43. No page scroll needed. At page5 Previous has parent disabled/tabindex-1 and hx-get page1; Next/Last disabled, First enabled. This suggests a page-block boundary but semantics remain unconfirmed; do not describe Previous as one-page-back or as a defect yet.'}
 ],'typeDistribution':distribution,'mutationsAdded':0,
 'sourceFiles':['sources/twin-list-20261109.html','sources/twin-single-detail-20261109.html','sources/twin-set-detail-20261109.html'],
 'remaining':['Empty/error and other-role variants; remaining30/100page-size variants; member-link new-tab behavior.',
              'Group connection mutations via item-detail UI and group lifetime/representative policies.',
              'Pagination block semantics on lists with more than5pages.',
              'Papers, sources, Lab; remaining HML/OMR branches and deployment/service propagation.']}
write(phase_name,phase)
note='Twin main list43rows/all-scroll, selected single/set details and last-page navigation recorded; whole-site coverage incomplete. Current research tab twin list,page5,size10; saved testcopy2088985/detail2088701 stays in its own tab.'
resume=read('resume-state.json');resume['sessionEvidence'].append(phase_name)
resume.update({'latestSessionEvidence':phase_name,'lastRetainedEvidence':'1143-twin-pagination-link-contract','resumeNote':note,'nextActions':phase['remaining']})
resume['liveBrowserLastKnownState'].update({'url':'https://dev-exambank.dongahub.com/item/twin/list.donga?pageNum=5&pageSize=10','tab':'Twin group main list page5','targetId':'C06F56F8973F594BE8196DCB15B2DEBC','lastEvidence':'1143-twin-pagination-link-contract'})
write('resume-state.json',resume)
status=read('inspection-status.json');status.update({'latestSessionEvidence':phase_name,'lastRetainedEvidence':'1143-twin-pagination-link-contract','resumeNote':note,'summary':note,'nextSteps':phase['remaining']});write('inspection-status.json',status)
knowledge=read('knowledge.json');knowledge['currentEvidenceIndex'].update({'asOfEvidence':1143,'sessionObservationCutoff':1143,'latestSession':phase_name,'twinInventory':'twin-groups-20261109.json'});knowledge['currentEvidenceIndex']['readingOrder'].insert(0,phase_name);write('knowledge.json',knowledge)
print(json.dumps({'phase':phase_name,'groups':43,'types':distribution,'mutationsAdded':0},ensure_ascii=False))
