from pathlib import Path
import json,hashlib,traceback
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent;OUT=ROOT/'verification/completed-marks';OUT.mkdir(parents=True,exist_ok=True)
job=json.loads((ROOT.parent/'review-work/jobs/52b9bf88be92d1261ee63c2b.json').read_text(encoding='utf-8-sig'))
results=[];errors=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,width=1800):
  c=browser.new_context(offline=True,viewport={'width':width,'height':1100});p=c.new_page();local=[];p.on('pageerror',lambda e:local.append(str(e)))
  p.goto((ROOT/'index.html').as_uri()+'#/items/2100003');p.wait_for_selector('[data-action=status-save]')
  fixture={'schema':'master-cms-review/1','revision':1,'items':[job['item']],'draft':None,'composers':{}}
  p.evaluate("d=>localStorage.setItem('master-cms-visual-review-v2',JSON.stringify(d))",fixture);p.reload();p.wait_for_selector('[data-action=status-save]');p.evaluate('CMSReview.open()');p.locator('[data-rv=completed]').click()
  try:fn(p);assert not local,local;results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
  except Exception as e:results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()});p.screenshot(path=str(OUT/('failure-'+str(len(results))+'.png')));print('FAIL',name,str(e)[:250],flush=True)
  errors.extend(local);c.close()
 def anchored(p):
  p.evaluate(r"""()=>{const d=CMSReview.exportData(),i=d.items[0],el=document.querySelector('.status-fields'),r=el.getBoundingClientRect();i.anchor={selector:'.status-fields',tag:'DIV',text:el.textContent.trim().replace(/\s+/g,' ').slice(0,300),rel:{x:0,y:0,w:1,h:1},rect:{x:r.x,y:r.y,w:r.width,h:r.height}};i.context.modals=[];i.context.tabs='';i.context.origin='';localStorage.setItem('master-cms-visual-review-v2',JSON.stringify(d))}""")
  p.reload();p.wait_for_selector('.rv-panel')
 def original(p):
  if not p.locator('.rv-card[open]').count():p.locator('.rv-card>summary').click()
  p.locator('[data-rv=show-mark]').click()
  assert p.locator('.rv-completed-mark').count() or p.locator('.rv-history-mark').count()
  p.screenshot(path=str(OUT/'actual-request.png'),animations='disabled')
 run('Actual approved request can show its current or recorded area',original)
 def live(p):
  anchored(p);expect(p.locator('.rv-completed-mark')).to_have_count(1)
  p.locator('[data-rv=hide]').click();expect(p.locator('.rv-completed-mark')).to_have_count(0)
  p.locator('[data-rv=hide]').click();expect(p.locator('.rv-completed-mark')).to_have_count(1)
  p.locator('.rv-completed-mark [data-rv=focus]').click();expect(p.locator('.rv-card')).to_have_attribute('open','')
  p.screenshot(path=str(OUT/'completed-live.png'),animations='disabled')
 run('Completed tab, global show/hide and numbered marker keep completed requests accessible',live)
 def removed(p):
  anchored(p);before=p.evaluate('CMSReview.exportData().items[0]');p.locator('.status-fields').evaluate('e=>e.remove()')
  if not p.locator('.rv-card[open]').count():p.locator('.rv-card>summary').click()
  p.locator('[data-rv=show-mark]').click();expect(p.locator('dialog')).to_be_visible();expect(p.locator('.rv-history-mark')).to_have_count(1);expect(p.locator('.rv-history-mark .rv-num')).to_have_text('1')
  assert p.evaluate('CMSReview.exportData().items[0]')==before
  p.locator('.rv-image-stage img').evaluate('e=>e.decode()');assert p.locator('.rv-history-mark').bounding_box()['height']>5
  p.screenshot(path=str(OUT/'removed-before-area.png'),animations='disabled');p.keyboard.press('Escape');expect(p.locator('.rv-panel')).to_be_visible()
 run('Removed target falls back to the original screenshot and numbered area without changing approval/history',removed)
 def changed(p):
  anchored(p);p.locator('.status-fields').evaluate("e=>e.append(' changed')")
  p.locator('[data-rv=hide]').click();p.locator('[data-rv=hide]').click();expect(p.locator('.rv-history-mark')).to_have_count(1)
  p.locator('[data-rv=close-image]').click();p.reload();p.wait_for_selector('.rv-panel');expect(p.locator('.rv-completed-mark')).to_have_count(1)
 run('Global show opens historical area when target text changes; reload retains completed tab',changed)
 def always(p):
  if not p.locator('.rv-card[open]').count():p.locator('.rv-card>summary').click()
  p.locator('[data-rv=before-mark]').click();expect(p.locator('.rv-history-mark')).to_have_count(1)
  style=p.locator('.rv-history-mark').get_attribute('style');assert '16.047' in style,style
  p.locator('.rv-image-stage img').evaluate('e=>e.decode()')
  p.screenshot(path=str(OUT/'historical-mobile.png'),animations='disabled')
 run('Original area remains explicitly available and scales with the screenshot at 390px',always,390)
 def missing(p):
  p.evaluate("()=>{const d=CMSReview.exportData();d.items[0].anchor=null;d.items[0].before=null;localStorage.setItem('master-cms-visual-review-v2',JSON.stringify(d))}");p.reload();p.wait_for_selector('.rv-panel')
  if not p.locator('.rv-card[open]').count():p.locator('.rv-card>summary').click()
  p.locator('[data-rv=show-mark]').click();expect(p.locator('.rv-status')).to_contain_text('캡처가 없습니다')
 run('Legacy item without an anchor or screenshot gives a clear explanation',missing)
 def page_request(p):
  p.evaluate("()=>{const d=CMSReview.exportData();d.items[0].anchor=null;localStorage.setItem('master-cms-visual-review-v2',JSON.stringify(d))}");p.reload();p.wait_for_selector('.rv-panel')
  if not p.locator('.rv-card[open]').count():p.locator('.rv-card>summary').click()
  p.locator('[data-rv=show-mark]').click();expect(p.locator('.rv-history-help')).to_contain_text('화면 전체 요청');expect(p.locator('.rv-history-mark')).to_have_count(0)
 run('Whole-screen request shows the saved image without inventing an area',page_request)

 browser.close()
report={'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'results':results,'errors':errors,'files':{f:hashlib.sha256((ROOT/f).read_bytes()).hexdigest() for f in ['review.js','review.css']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({k:report[k] for k in ['passed','failed']}));raise SystemExit(bool(report['failed'] or errors))
