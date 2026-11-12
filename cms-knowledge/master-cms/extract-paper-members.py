"""Index member rows in an already captured paper detail DOM."""
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

root=Path(__file__).resolve().parent
class Rows(HTMLParser):
    def __init__(self):super().__init__();self.rows=[];self.row=None;self.cell=None;self.href=None
    def handle_starttag(self,tag,attrs):
        if tag=='tr':self.row=[];self.href=None
        elif tag=='td' and self.row is not None:self.cell=[]
        elif tag=='a' and self.cell is not None:
            href=dict(attrs).get('href','')
            if '/item/all/detail.donga?' in href:self.href=href
    def handle_data(self,text):
        if self.cell is not None:self.cell.append(text)
    def handle_endtag(self,tag):
        if tag=='td' and self.cell is not None:self.row.append(' '.join(' '.join(self.cell).split()));self.cell=None
        elif tag=='tr' and self.row is not None:
            if len(self.row)==7 and self.row[0].isdigit() and self.href:
                record=dict(zip(['sequence','itemLabel','question','type','difficulty','unitLabel','status'],self.row))
                record['href']=self.href
                record['itemId']=re.search(r'itemId=(\d+)',self.href).group(1)
                passage=re.search(r'지문\s*ID\s*(\d+)',record['itemLabel'])
                record['passageId']=passage.group(1) if passage else None
                record['sequence']=int(record['sequence']);self.rows.append(record)
            self.row=None;self.cell=None
parser=Rows();parser.feed((root/'sources/paper-large-detail-20261109.html').read_text(encoding='utf-8'))
assert len(parser.rows)==120 and [r['sequence'] for r in parser.rows]==list(range(1,121))
result={'paperId':531,'paperDetailId':564,'sourceEvidence':1256,'observedMembers':120,
 'typeCounts':dict(Counter(r['type'] for r in parser.rows)),
 'statusCounts':dict(Counter(r['status'] for r in parser.rows)),
 'passageGroups':dict(Counter(r['passageId'] for r in parser.rows if r['passageId'])), 'members':parser.rows}
(root/'paper531-members-20261109.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
sys.stdout.reconfigure(encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k!='members'},ensure_ascii=False))
