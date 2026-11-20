"""Capture current file:// controls for bounded Figma state examples."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'design-specs/policy-evidence/deployment-visuals';OUT.mkdir(parents=True,exist_ok=True)
assets={}
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 ctx=browser.new_context(offline=True,viewport={'width':1800,'height':1100});p=ctx.new_page()
 p.goto((ROOT/'master-cms-mockup/index.html').as_uri()+'#/items/2100001');p.wait_for_selector('[data-action=status-save]')
 def go(path):p.evaluate('v=>CMS.go(v,true)',path)
 def capture(key,locator,controls=None):
  p.wait_for_timeout(120);locator.scroll_into_view_if_needed();box=locator.bounding_box()
  geometry={}
  for label,selector in (controls or {}).items():
   r=locator.locator(selector).bounding_box();geometry[label]={'x':r['x']-box['x'],'y':r['y']-box['y'],'w':r['width'],'h':r['height']}
  path=OUT/(key+'.png');locator.screenshot(path=str(path),animations='disabled')
  assets[key]={'path':str(path.relative_to(ROOT)).replace('\\','/'),'width':box['width'],'height':box['height'],'controls':geometry}
 def choose(label):p.locator('#modal-root .modal').last.locator('.modal-foot').get_by_role('button',name=label,exact=True).click()
 def item_state(state):
  go('/items/2100001');p.locator(f'[data-status-bind=status][value={state}]').check();p.locator('[data-action=status-save]').click();choose('저장')
 def paper_setup(states):
  p.evaluate('''states=>{const r=CMS.paper(5001);r.status='Y';r.groups=states.map((s,n)=>{const i=CMS.item(2100001+n);i.status=s;i.deployed=s==='Y'?['개발 서비스']:[];return[i.id]});delete r.automaticStatus;CMS.edit=null;}''',states)
 capture('item-deploy-Y',p.locator('.detail-html-panel footer'));capture('item-button-Y',p.locator('[data-action=item-deploy]'))
 p.locator('[data-action=item-deploy]').click();p.locator('input[name=deployTarget]').first.check()
 capture('item-modal',p.locator('#modal-root .modal'),{'1':'input[name=deployTarget] >> nth=0','2':'.modal-foot button >> nth=0','3':'.modal-foot button >> nth=1'});choose('취소')
 p.evaluate('CMS.item(2100001).status="N";CMS.render()');capture('item-deploy-N',p.locator('.detail-html-panel footer'));capture('item-button-N',p.locator('[data-action=item-deploy]'))
 paper_setup(['Y','D']);go('/papers/5001');p.locator('[data-action=paper-deploy]').click();p.locator('input[name=deployTarget][value="개발 서비스"]').check()
 capture('paper-modal',p.locator('#modal-root .modal'),{'1':'.modal-body p >> nth=0','2':'input[name=deployTarget] >> nth=0','3':'input[name=deployTarget] >> nth=1','4':'.modal-foot button >> nth=0','5':'.modal-foot button >> nth=1'});choose('취소')
 item_state('N');go('/papers/5001')
 capture('paper-auto-N',p.locator('.paper-facts-column').first)
 item_state('Y');go('/papers/5001');capture('paper-remains-N',p.locator('.paper-facts-column').first)
 go('/papers/5001/edit');p.locator('[data-bind=status]').select_option('Y');p.locator('[data-action=paper-save]').click();capture('paper-manual-Y',p.locator('.paper-facts-column').first)
 paper_setup(['Y','D']);item_state('D');go('/papers/5001');capture('paper-auto-D',p.locator('.paper-facts-column').first)
 paper_setup(['N','D']);p.evaluate('CMS.paper(5001).status="N"');go('/papers/5001/edit');p.locator('[data-bind=status]').select_option('Y');p.locator('[data-action=paper-save]').click();capture('paper-resume-blocked',p.locator('#modal-root .modal'));choose('확인')
 browser.close()
(OUT/'manifest.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Captured',len(assets),'current offline HTML states.')
