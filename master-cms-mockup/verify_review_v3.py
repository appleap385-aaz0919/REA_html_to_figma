"""Reported regression paths in a real, offline, ordinary Chrome file:// page."""
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import json,time,hashlib,traceback
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification/review-v3';OUT.mkdir(exist_ok=True,parents=True)
results=[];errors=[];network=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,width=1800):
  ctx=browser.new_context(offline=True,viewport={'width':width,'height':1000});p=ctx.new_page();local=[]
  p.on('pageerror',lambda e:local.append(str(e)))
  p.on('request',lambda r:network.append(r.url) if r.url.startswith(('https:','http:')) else None)
  p.on('dialog',lambda d:d.accept())
  try:
   p.goto((ROOT/'index.html').as_uri()+'#/definition/7001');p.wait_for_selector('h1');fn(p);assert not local,local
   results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
  except Exception as e:
   results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()});p.screenshot(path=str(OUT/f'failure-{len(results)}.png'));print('FAIL',name,str(e)[:400],flush=True)
  errors.extend(local);ctx.close()
 def click(p,act):
  if act=='open' and p.locator('.rv-panel').count():return
  p.locator(f'[data-rv={act}]').first.click()
 def data(p):return p.evaluate('CMSReview.exportData()')
 def draw(p,x=400,y=350):
  p.mouse.move(x,y);p.mouse.down();p.mouse.move(x+150,y+65,steps=8);p.mouse.up()
 def new(p):
  click(p,'open');click(p,'mark');draw(p,30 if p.viewport_size['width']<600 else 400,280 if p.viewport_size['width']<600 else 350);p.wait_for_selector('[data-draft=request]');p.locator('[data-draft=request]').fill('영역을 다시 지정해도 같은 요청을 유지합니다.');click(p,'create');return data(p)['items'][0]
 def deleted(p):
  p.evaluate('localStorage.setItem("master-cms-visual-review-v1",JSON.stringify({old:true}));localStorage.setItem("cms-unrelated-example","keep")');p.reload();p.wait_for_selector('h1')
  assert p.evaluate('localStorage.getItem("master-cms-visual-review-v1")') is None
  assert data(p)['items']==[] and data(p)['draft'] is None
  assert p.evaluate('localStorage.getItem("cms-unrelated-example")')=='keep'
  click(p,'open');expect(p.locator('.rv-list-tabs')).to_contain_text('진행 중 0');p.screenshot(path=str(OUT/'empty.png'))
 run('Requested deletion removes the old review key only; new requests start empty',deleted)
 def image(p):
  item=new(p);assert item['before']['image'];p.locator('.rv-more>summary').click();p.locator('.rv-evidence>summary').click();click(p,'image')
  expect(p.locator('dialog.rv-image-viewer')).to_be_visible();assert p.locator('dialog img').evaluate('e=>e.complete&&e.naturalWidth>0');assert len(p.context.pages)==1
  p.screenshot(path=str(OUT/'image-viewer.png'));p.keyboard.press('Escape');expect(p.locator('dialog.rv-image-viewer')).to_have_count(0)
  click(p,'image');click(p,'close-image');expect(p.locator('dialog.rv-image-viewer')).to_have_count(0)
  assert not p.locator('.rv-attachments,[data-attach],[data-rv=capture-after]').count();assert not p.locator('.rv-no-image').count()
 run('Capture opens in the page, closes by Escape/button; no unnecessary upload or empty comparison',image)
 def redraw(p):
  item=new(p);p.locator('.rv-more>summary').click();click(p,'detach');assert data(p)['items'][0]['anchor'] is None
  assert p.locator('main').evaluate('e=>e.inert');draw(p,600,420);p.wait_for_function('CMSReview.exportData().items[0].anchor!==null')
  updated=data(p);assert len(updated['items'])==1 and updated['draft'] is None and updated['items'][0]['id']==item['id'] and updated['items'][0]['before']==item['before'];expect(p.locator('.rv-mark')).to_have_count(1)
  assert not p.locator('main').evaluate('e=>e.inert');p.screenshot(path=str(OUT/'redrawn.png'))
  p.locator('.rv-more>summary').click();click(p,'detach');p.keyboard.press('Escape');assert data(p)['items'][0]['anchor'] is None
  click(p,'mark');draw(p,450,470);p.wait_for_selector('[data-draft=request]');assert len(data(p)['items'])==1
 run('Erase arms redraw on the same request; Escape safely unlocks; a new drag still works',redraw)
 def stale(p):
  new(p);job=p.evaluate('CMSReview.agentOutbox()[0]');v={'id':job['id'],'phase':job['phase'],'token':job['token'],'state':'result','summary':'수정했습니다.','evidence':'격리 검증 예시'}
  p.evaluate('v=>CMSReview.agentUpdate(v)',v);click(p,'approve');assert all(r['phase']=='sync' for r in p.evaluate('CMSReview.agentReferences()'))
 run('Completed request no longer accepts pending HTML queue references',stale)
 def mobile(p):
  new(p);p.locator('.rv-more>summary').click();p.locator('.rv-evidence>summary').click();click(p,'image');expect(p.locator('dialog')).to_be_visible();assert p.locator('dialog').bounding_box()['width']<=390;p.screenshot(path=str(OUT/'mobile-viewer.png'))
 run('390px capture viewer is readable and constrained to the viewport',mobile,390)
 browser.close()
report={'date':'2026-11-19','passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'results':results,'errors':errors,'http':network,'files':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['index.html','review.js','review.css','review_file_bridge.js','review_agent.py']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors),'http':len(network)}),flush=True)
raise SystemExit(bool(report['failed'] or errors or network))
