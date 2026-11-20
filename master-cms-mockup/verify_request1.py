"""Request #1 status-card UX, clarification history and file-snapshot retry regressions."""
from pathlib import Path
import json,hashlib,traceback
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent;OUT=ROOT/'verification/request1';OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[];network=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,width=1800):
  ctx=browser.new_context(offline=True,viewport={'width':width,'height':1100});p=ctx.new_page();local=[]
  p.on('pageerror',lambda e:local.append(str(e)));p.on('dialog',lambda d:d.dismiss());p.on('request',lambda r:network.append(r.url) if r.url.startswith(('http:','https:')) else None)
  try:
   p.goto((ROOT/'index.html').as_uri()+'#/items/2100003');p.wait_for_selector('[data-action=status-save]');fn(p);assert not local,local
   results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
  except Exception as e:
   results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()});p.screenshot(path=str(OUT/f'failure-{len(results)}.png'),animations='disabled');print('FAIL',name,str(e)[:400],flush=True)
  errors.extend(local);ctx.close()
 def state(p):return p.locator('[data-action=status-save]').locator('xpath=ancestor::section[1]')
 def save(p):return p.locator('[data-action=status-save]')
 def modal(p):return p.locator('#modal-root [role=dialog]').last
 def choose(p,label):modal(p).locator('.modal-foot').get_by_role('button',name=label,exact=True).click()
 def shot(p,name):state(p).screenshot(path=str(OUT/name),animations='disabled')
 def default(p):
  assert not p.locator('[data-action=status-edit],[data-action=status-cancel]').count()
  for c in p.locator('select[data-status-bind],[data-status-bind=status]:not([value=F])').all():expect(c).to_be_enabled()
  expect(p.locator('[data-status-bind=status][value=F]')).to_be_disabled()
  expect(save(p)).to_be_disabled();assert save(p).evaluate('e=>getComputedStyle(e).backgroundColor')=='rgb(226, 229, 233)';shot(p,'initial.png')
 run('Initial state has editable fields, a gray disabled save and no edit/cancel controls',default)
 def dirty(p):
  for field,other,original in [('online','true','false'),('usage','T','C')]:
   p.locator(f'[data-status-bind={field}]').select_option(other);expect(save(p)).to_be_enabled();assert save(p).evaluate('e=>getComputedStyle(e).backgroundColor')!='rgb(226, 229, 233)'
   p.locator(f'[data-status-bind={field}]').select_option(original);expect(save(p)).to_be_disabled()
  p.locator('[data-status-bind=status][value=N]').check();expect(save(p)).to_be_enabled();p.locator('[data-status-bind=status][value=R]').check();expect(save(p)).to_be_disabled()
  p.locator('[data-status-bind=online]').select_option('true');p.locator('[data-status-bind=usage]').select_option('T');p.locator('[data-status-bind=online]').select_option('false');expect(save(p)).to_be_enabled();p.locator('[data-status-bind=usage]').select_option('C');expect(save(p)).to_be_disabled()
 run('Each field and combined reversions compare actual values with the saved baseline',dirty)
 def cancel_and_save(p):
  p.locator('[data-status-bind=online]').select_option('true');save(p).click();expect(modal(p)).to_contain_text('저장하시겠습니까?');choose(p,'취소');expect(save(p)).to_be_enabled();assert p.evaluate('CMS.item(2100003).online') is False
  p.locator('[data-status-bind=usage]').select_option('T');p.locator('[data-status-bind=status][value=N]').check();save(p).click()
  choose(p,'저장')
  p.wait_for_selector('[data-action=status-save]');expect(save(p)).to_be_disabled();expect(p.locator('[data-status-bind=online]')).to_have_value('true');expect(p.locator('[data-status-bind=usage]')).to_have_value('T');expect(p.locator('[data-status-bind=status][value=N]')).to_be_checked()
  assert p.evaluate('performance.getEntriesByType("navigation")[0].type')!='reload';shot(p,'saved.png')
  p.locator('[data-status-bind=online]').select_option('false');expect(save(p)).to_be_enabled();p.locator('[data-status-bind=online]').select_option('true');expect(save(p)).to_be_disabled()
 run('Cancel preserves input; confirmed save refreshes the service view and resets the baseline',cancel_and_save)
 def discard(p):
  p.locator('[data-status-bind=status][value=D]').check();save(p).click();expect(modal(p)).to_contain_text('쌍둥이');
  choose(p,'저장')
  p.wait_for_selector('[data-action=status-save]');expect(save(p)).to_be_disabled()
  for c in p.locator('[data-status-bind]').all():expect(c).to_be_disabled()
  before=p.evaluate('JSON.stringify(CMS.item(2100003))');p.evaluate('CMS.action("status-save",{dataset:{id:2100003}})');assert p.evaluate('JSON.stringify(CMS.item(2100003))')==before;shot(p,'discarded.png')
 run('Discarded items lock every status field and save, including direct handler calls',discard)
 def approval(p):
  p.evaluate('CMS.item(2100003).unitCodes=[]');p.locator('[data-status-bind=status][value=Y]').check();save(p).click();expect(modal(p)).to_contain_text('필수 메타정보');assert p.evaluate('CMS.item(2100003).status')=='R'
 run('Existing approval validation still runs before the save confirmation',approval)
 def group(p):
  target=p.evaluate('CMS.db.items.find(i=>i.passageId&&i.status!=="D").id');p.evaluate('id=>CMS.go("/items/"+id,true)',target);p.locator('[data-status-bind=status][value=N]').check();save(p).click();expect(modal(p)).to_contain_text('세트 문항 전체')
  choose(p,'저장')
  p.wait_for_selector('[data-action=status-save]');assert p.evaluate('id=>CMS.groupItems(CMS.item(id)).every(i=>i.status==="N")',target)
 run('Set-wide state propagation and warning are preserved after the new save flow',group)
 def navigation(p):
  p.locator('[data-status-bind=usage]').select_option('T');p.locator('.item-navigation a').first.click();expect(modal(p)).to_contain_text('저장하지 않은 변경');choose(p,'취소');p.locator('[data-status-bind=usage]').select_option('C');p.locator('.item-navigation a').first.click();expect(p.locator('h1')).to_have_text('전체 문항')
 run('Navigation warns only while values differ, and stops warning after a full reversion',navigation)
 def question(p):
  p.locator('[data-rv=open]').click();p.locator('[data-rv=page-request]').click();p.locator('[data-draft=request]').fill('검증용 요청');p.locator('[data-rv=create]').click();j=p.evaluate('CMSReview.agentOutbox()[0]')
  def update(state,**kw):return p.evaluate('v=>CMSReview.agentUpdate(v)',dict(id=j['id'],phase='html',token=j['token'],state=state,**kw))
  update('question',question='폐기 문항도 편집할까요?');assert not p.evaluate('CMSReview.agentOutbox()');expect(p.locator('.rv-question')).to_be_visible();update('working');assert p.evaluate('CMSReview.exportData().items[0].status')=='needs_input'
  update('question',question='폐기 문항도 편집할까요?');assert len(p.evaluate('CMSReview.exportData().items[0].messages'))==2
  try:update('result',summary='premature',evidence='fixture');raise AssertionError('Result accepted before answer')
  except Exception as e:assert '사용자 답변' in str(e)
  p.locator('[data-note]').fill('폐기 문항은 잠가 주세요.');p.reload();p.wait_for_selector('[data-action=status-save]');
  if p.locator('[data-rv=open]').count():p.locator('[data-rv=open]').click();
  if p.locator('.rv-card').get_attribute('open') is None:p.locator('.rv-card>summary').click()
  expect(p.locator('[data-note]')).to_have_value('폐기 문항은 잠가 주세요.');p.locator('[data-note]').press('Enter')
  latest=p.evaluate('CMSReview.agentOutbox()[0]');assert latest['id']==j['id'] and latest['token']!=j['token'];expect(p.locator('.rv-clarification-thread')).to_contain_text('폐기 문항도 편집할까요?');expect(p.locator('.rv-clarification-thread')).to_contain_text('폐기 문항은 잠가 주세요.');p.screenshot(path=str(OUT/'question-answer.png'),animations='disabled')
 run('Question pauses work; answer persists, resumes the same request and stays visible in the main card',question)
 def snapshot(p):
  source=(ROOT/'review_file_bridge.js').read_text(encoding='utf8').replace('return {connect};','return {connect,testTick:tick,testDirectory:d=>{directory=d;connected=true;}};')
  p.locator('[data-rv=open]').click();p.evaluate(source)
  evidence=p.evaluate('''async()=>{
   const notes=[],original=CMSReview.notify;CMSReview.notify=s=>notes.push(s);
   let failures=1,reads=0,writes=0;const client=sessionStorage.getItem('cms-review-client');
   const root={getFileHandle:async name=>({getFile:async()=>{reads++;if(name==='descriptions.json')throw new DOMException('optional file missing','NotFoundError');if(name==='heartbeat.json'&&failures-->0)throw new DOMException('stale snapshot','NotReadableError');return {text:async()=>JSON.stringify(name==='session.json'?{client,epoch:'review-reset-20261119-1'}:name==='heartbeat.json'?{at:new Date().toISOString(),epoch:'review-reset-20261119-1'}:{client,epoch:'review-reset-20261119-1',updates:[]})};},createWritable:async()=>({write:async()=>{writes++;},close:async()=>{},abort:async()=>{}})})};
   CMSReviewFiles.testDirectory(root);await CMSReviewFiles.testTick();const recovered={reads,writes,notes:[...notes]};
   failures=10;await CMSReviewFiles.testTick();const transientNotes=[...notes];
   failures=0;await CMSReviewFiles.testTick();CMSReview.notify=original;return {recovered,transientNotes,writes};
  }''')
  assert evidence['recovered']['writes']==1 and not evidence['recovered']['notes'];assert not evidence['transientNotes'];assert evidence['writes']==2
  (OUT/'snapshot-retry.json').write_text(json.dumps(evidence,indent=2),encoding='utf8')
 run('A replaced file snapshot retries with a fresh handle and recovers without flashing an English warning',snapshot)
 def reload_prompt(p):
  p.locator('[data-rv=open]').click();p.locator('[data-rv=page-request]').click();p.locator('[data-draft=request]').fill('새로고침 안내 검증');p.locator('[data-rv=create]').click();j=p.evaluate('CMSReview.agentOutbox()[0]')
  p.evaluate('v=>CMSReview.agentUpdate(v)',dict(id=j['id'],phase='html',token=j['token'],state='result',summary='실제 수정 결과 예시',evidence='격리 검증',policyChanges=''))
  expect(p.locator('.rv-reload-banner')).to_be_visible();assert p.evaluate('performance.getEntriesByType("navigation")[0].type')!='reload'
  p.locator('[data-rv=close]').click();expect(p.locator('.rv-reload-banner')).to_be_visible();p.screenshot(path=str(OUT/'reload-prompt.png'),animations='disabled')
  with p.expect_navigation(wait_until='load'):p.locator('[data-rv=reload-page]').click()
  p.wait_for_selector('[data-action=status-save]');assert not p.locator('.rv-reload-banner').count();assert p.evaluate('CMSReview.exportData().items[0].status')=='ready'
 run('A result prompts manual reload, stays visible when the panel closes, and preserves the result after reload',reload_prompt)
 def small(p):
  p.locator('[data-status-bind=usage]').select_option('T');expect(save(p)).to_be_enabled();shot(p,'mobile.png');assert state(p).bounding_box()['width']<=390
 run('Status controls and save remain usable at 390px',small,390)
 browser.close()
report={'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'results':results,'errors':errors,'externalRequests':network,'files':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['app.js','styles.css','review.js','review.css','review_file_bridge.js','review_agent.py']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors),'http':len(network)}),flush=True)
raise SystemExit(bool(report['failed'] or errors or network))
