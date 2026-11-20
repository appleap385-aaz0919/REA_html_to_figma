from pathlib import Path
import json
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'design-specs/policy-evidence/request1-status';OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(channel='chrome',headless=True)
 c=b.new_context(offline=True,viewport={'width':1785,'height':1352});p=c.new_page();errors=[]
 p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto((ROOT/'master-cms-mockup/index.html').as_uri()+'#/items/2100003');p.wait_for_selector('[data-action=status-save]')
 card=p.locator('.panel').filter(has=p.locator('[data-action=status-save]'))
 captures={}
 for key,state in [('initial','R'),('changed','R'),('discarded','D')]:
  p.evaluate("s=>{CMS.item(2100003).status=s;CMS.item(2100003).online=false;CMS.item(2100003).usage='C';CMS.go('/items/2100001',true);CMS.go('/items/2100003',true)}",state)
  if key=='changed':p.locator('[data-status-bind=usage]').select_option('T')
  card.screenshot(path=str(OUT/(key+'.png')),animations='disabled')
  captures[key]={'box':card.bounding_box(),'saveDisabled':p.locator('[data-action=status-save]').is_disabled(),'radios':p.locator('[name=itemStatus]').evaluate_all('(xs)=>xs.map(x=>({value:x.value,checked:x.checked,disabled:x.disabled}))')}
 assert not errors,errors
 (OUT/'capture.json').write_text(json.dumps({'captures':captures,'runtimeErrors':errors},ensure_ascii=False,indent=2),encoding='utf-8')
 b.close();print(json.dumps(captures,ensure_ascii=False))
