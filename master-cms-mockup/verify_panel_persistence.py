"""Persist the review workspace while service views change; enforce requested status transitions."""
from pathlib import Path
import json,traceback,hashlib
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent;OUT=ROOT/'verification/panel-persistence';OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[];network=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,width=1800):
  ctx=browser.new_context(offline=True,viewport={'width':width,'height':1100});p=ctx.new_page();local=[]
  p.on('pageerror',lambda e:local.append(str(e)));p.on('dialog',lambda d:d.accept());p.on('request',lambda r:network.append(r.url) if r.url.startswith(('https:','http:')) else None)
  try:
   p.goto((ROOT/'index.html').as_uri()+'#/items/2100003');p.wait_for_selector('[data-action=status-save]');fn(p);assert not local,local
   results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
  except Exception as e:
   results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()});p.screenshot(path=str(OUT/f'failure-{len(results)}.png'),animations='disabled');print('FAIL',name,str(e)[:400],flush=True)
  errors.extend(local);ctx.close()
 def click(p,a):p.locator(f'[data-rv={a}]').first.click()
 def data(p):return p.evaluate('CMSReview.exportData()')
 def new(p,text='상태 정보와 화면 배치를 수정해 주세요.'):
  click(p,'open');click(p,'page-request');p.locator('[data-draft=request]').fill(text);click(p,'create');return p.evaluate('CMSReview.agentOutbox()[0]')
 def ready(p,j):p.evaluate('v=>CMSReview.agentUpdate(v)',dict(id=j['id'],phase='html',token=j['token'],state='result',summary='수정했습니다.',evidence='격리 검증',policyChanges=''))
 def stable_save(p):
  new(p);p.evaluate('window.panelBefore=document.querySelector(".rv-panel");window.documentBefore=document')
  p.locator('.rv-supplement>summary').click();p.locator('[data-note]').fill('아직 보내지 않은 설명')
  p.locator('[data-status-bind=usage]').select_option('T');p.locator('[data-action=status-save]').click();p.locator('#modal-root .modal-foot').get_by_role('button',name='저장',exact=True).click()
  expect(p.locator('[data-action=status-save]')).to_be_disabled();expect(p.locator('[data-note]')).to_have_value('아직 보내지 않은 설명')
  assert p.evaluate('document===documentBefore&&document.querySelector(".rv-panel")===panelBefore');assert p.evaluate('CMS.item(2100003).usage')=='T';p.screenshot(path=str(OUT/'service-saved.png'),animations='disabled')
 run('Status save replaces only service UI and preserves the exact panel DOM, request and unsent input',stable_save)
 def refresh(p):
  j=new(p,'화면 설명이 길어도 새로고침 후 펼침 상태와 스크롤 위치가 유지되어야 합니다. '*12);p.locator('.rv-more>summary').click();p.locator('.rv-supplement>summary').click();p.locator('[data-note]').fill('새로고침해도 유지할 입력')
  p.locator('.rv-scroll').evaluate('e=>e.scrollTop=170');p.wait_for_timeout(100);before=p.locator('.rv-scroll').evaluate('e=>e.scrollTop');assert before>0
  p.reload();p.wait_for_selector('[data-action=status-save]');expect(p.locator('.rv-panel')).to_be_visible();assert p.locator('.rv-card').get_attribute('open') is not None;assert p.locator('.rv-more').get_attribute('open') is not None;expect(p.locator('[data-note]')).to_have_value('새로고침해도 유지할 입력');assert abs(p.locator('.rv-scroll').evaluate('e=>e.scrollTop')-before)<3
  p.screenshot(path=str(OUT/'restored.png'),animations='disabled')
 run('Full code reload restores open panel, expanded request/details, panel scroll and unsent input',refresh)
 def navigate(p):
  new(p);p.locator('.rv-more>summary').click();p.evaluate('CMS.go("/sources",true)');expect(p.locator('h1')).to_have_text('문항 출처 관리');expect(p.locator('.rv-panel')).to_be_visible();assert p.locator('.rv-card').get_attribute('open') is not None
  p.evaluate('CMS.go("/items/2100001",true)');p.wait_for_selector('[data-action=status-save]');expect(p.locator('.rv-panel')).to_be_visible();assert p.locator('.rv-more').get_attribute('open') is not None
  click(p,'close');p.reload();p.wait_for_selector('[data-action=status-save]');assert not p.locator('.rv-panel').count();expect(p.locator('[data-rv=open]')).to_be_visible()
 run('Route changes keep the panel open; an explicit close remains closed after reload',navigate)
 def posted(p):
  j=new(p);ready(p,j);click(p,'show-rework');p.locator('[data-note]').fill('승인 상태에서는 초안으로 돌아갈 수 없습니다.');click(p,'rework');expect(p.locator('.rv-clarification-thread [data-kind=rework]')).to_contain_text('초안으로 돌아갈 수 없습니다.')
  p.locator('.rv-supplement>summary').click();expect(p.locator('[data-note]')).to_have_value('');p.locator('[data-note]').fill('온오프 변경도 확인해 주세요.');click(p,'comment');expect(p.locator('[data-note]')).to_have_value('');expect(p.locator('.rv-clarification-thread [data-kind=comment]')).to_contain_text('온오프 변경도 확인해 주세요.')
  assert len(data(p)['items'])==1;p.screenshot(path=str(OUT/'posted.png'),animations='disabled')
 run('Sent rework and supplemental requests stay visible in the body while the composer clears',posted)
 def migration(p):
  j=new(p);ready(p,j);click(p,'show-rework');text='이전 버전에서 전송 후 남은 내용';p.locator('[data-note]').fill(text);click(p,'rework');v=data(p);v['composers'][j['id']]['note']=text
  p.evaluate('v=>localStorage.setItem("master-cms-visual-review-v2",JSON.stringify(v))',v);p.reload();p.wait_for_selector('[data-action=status-save]');expect(p.locator('.rv-panel')).to_be_visible();p.locator('.rv-supplement>summary').click();expect(p.locator('[data-note]')).to_have_value('');expect(p.locator('.rv-clarification-thread')).to_contain_text(text)
  p.evaluate('sessionStorage.removeItem("master-cms-review-view-v1")');p.reload();p.wait_for_selector('[data-action=status-save]');expect(p.locator('.rv-panel')).to_be_visible();assert p.locator('.rv-card').get_attribute('open') is not None
 run('Already sent text left by the prior version migrates into visible history and out of the editor',migration)
 def matrix(p):
  allowed={'R':['R','Y','N','D'],'F':['F','Y','N','D'],'Y':['Y','N','D'],'N':['N','Y','D'],'D':[]}
  for status,enabled in allowed.items():
   p.evaluate('s=>{CMS.item(2100003).status=s;CMS.go("/items/2100003",true)}',status)
   for value in ['R','F','Y','N','D']:
    el=p.locator(f'[data-status-bind=status][value={value}]');assert el.is_enabled()==(value in enabled),(status,value)
   if status!='D':
    value=next(v for v in enabled if v!=status);p.locator(f'[data-status-bind=status][value={value}]').check();expect(p.locator('[data-action=status-save]')).to_be_enabled();p.locator(f'[data-status-bind=status][value={status}]').check();expect(p.locator('[data-action=status-save]')).to_be_disabled()
  p.evaluate('()=>{CMS.item(2100003).status="Y";CMS.go("/items/2100003",true)}');p.locator('[data-status-bind=status][value=R]').evaluate('e=>{e.disabled=false;e.checked=true;e.dispatchEvent(new Event("change",{bubbles:true}))}');expect(p.locator('[data-status-bind=status][value=Y]')).to_be_checked();expect(p.locator('[data-action=status-save]')).to_be_disabled()
  p.evaluate('CMS.render()');p.screenshot(path=str(OUT/'transitions.png'),animations='disabled')
 run('All 25 state combinations obey the transition matrix; reverting and prohibited synthetic changes are safe',matrix)
 def group_guard(p):
  ids=p.evaluate('()=>{const i=CMS.db.items.find(i=>i.passageId);const members=CMS.groupItems(i);members[0].status="R";members[1].status="D";return members.map(i=>i.id)}');p.evaluate('id=>CMS.go("/items/"+id,true)',ids[0])
  p.locator('[data-status-bind=status][value=Y]').check();p.locator('[data-action=status-save]').click();expect(p.locator('#modal-root [role=dialog]')).to_contain_text('폐기 문항은 복구할 수 없습니다.');assert p.evaluate('id=>CMS.item(id).status',ids[1])=='D'
 run('A set-wide update cannot restore a discarded member',group_guard)
 def result_reload(p):
  j=new(p);ready(p,j);expect(p.locator('.rv-reload-banner')).to_be_visible()
  with p.expect_navigation(wait_until='load'):click(p,'reload-page')
  p.wait_for_selector('[data-action=status-save]');expect(p.locator('.rv-panel')).to_be_visible();expect(p.locator('.rv-result-copy')).to_contain_text('수정했습니다.');assert not p.locator('.rv-reload-banner').count()
 run('The update banner loads changed code and automatically restores the still-open result panel',result_reload)
 browser.close()
report={'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'results':results,'errors':errors,'http':network,'files':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['app.js','review.js']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors),'http':len(network)}),flush=True)
raise SystemExit(bool(report['failed'] or errors or network))
