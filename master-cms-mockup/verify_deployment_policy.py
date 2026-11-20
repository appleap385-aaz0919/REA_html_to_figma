"""Exercise the 2026-11-20 deployment/state rules through offline file:// UI."""
from pathlib import Path
import hashlib,json,traceback
from playwright.sync_api import sync_playwright,expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification/deployment-policy';OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[];network=[]
TARGET='개발 서비스';OTHER='AI출제마법사 CMS'
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn):
  ctx=browser.new_context(offline=True,viewport={'width':1800,'height':1100});p=ctx.new_page();local=[]
  p.on('pageerror',lambda e:local.append(str(e)))
  p.on('request',lambda r:network.append(r.url) if r.url.startswith(('http:','https:')) else None)
  try:
   p.goto((ROOT/'index.html').as_uri()+'#/items/2100001');p.wait_for_selector('[data-action=status-save]')
   fn(p);assert not local,local
   results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
  except Exception as e:
   results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()})
   p.screenshot(path=str(OUT/f'failure-{len(results)}.png'),animations='disabled');print('FAIL',name,str(e)[:350],flush=True)
  errors.extend(local);ctx.close()
 def go(p,path):p.evaluate('v=>CMS.go(v,true)',path)
 def click(p,action):p.locator(f'[data-action="{action}"]').click()
 def modal(p):return p.locator('#modal-root [role=dialog]').last
 def choose(p,label):modal(p).locator('.modal-foot').get_by_role('button',name=label,exact=True).click()
 def shot(p,name):p.screenshot(path=str(OUT/name),animations='disabled',full_page=True)
 def fixture(p,statuses,paper_status='Y',deployed=True):
  return p.evaluate('''v=>{
   const ids=[2100001,2100002,2100003,2100004].slice(0,v.statuses.length);
   ids.forEach((id,n)=>{const i=CMS.item(id);i.status=v.statuses[n];i.deployed=v.deployed?['개발 서비스']:[];delete i.deploymentRecords;});
   const r=CMS.paper(5001);r.status=v.paper_status;r.groups=ids.map(id=>[id]);r.deployed=[];r.history=[];delete r.automaticStatus;delete r.deploymentRecords;CMS.edit=null;return ids;
  }''',dict(statuses=statuses,paper_status=paper_status,deployed=deployed))
 def deploy(p,action,target=TARGET):
  click(p,action);modal(p).locator(f'input[name=deployTarget][value="{target}"]').check();choose(p,'배포')
 def save_item(p,id,state):
  go(p,'/items/'+str(id));p.locator(f'[data-status-bind=status][value={state}]').check();click(p,'status-save');choose(p,'저장')
 def save_paper(p,state):
  go(p,'/papers/5001/edit');p.locator('[data-bind=status]').select_option(state);click(p,'paper-save')

 def item_states(p):
  for state in ['R','F','N','D']:
   p.evaluate('s=>{CMS.item(2100001).status=s;CMS.render();}',state)
   expect(p.locator('[data-action=item-deploy]')).to_be_disabled()
   p.evaluate('CMS.action("item-deploy",{dataset:{id:2100001}})')
   expect(modal(p)).to_contain_text('사용(Y) 상태의 문항만');choose(p,'확인')
  p.evaluate('CMS.item(2100001).status="Y";CMS.render()')
  expect(p.locator('[data-action=item-deploy]')).to_be_enabled();shot(p,'item-usable.png')
 run('Only Y can deploy; R/F/N/D disabled and direct handler calls denied',item_states)
 def item_selection(p):
  click(p,'item-deploy');expect(modal(p).get_by_role('button',name='배포',exact=True)).to_be_disabled()
  modal(p).locator('input[name=deployTarget]').first.check();choose(p,'취소')
  assert OTHER not in p.evaluate('CMS.item(2100001).deployed')
  deploy(p,'item-deploy',OTHER);assert OTHER in p.evaluate('CMS.item(2100001).deployed')
  assert p.evaluate('CMS.item(2100001).deploymentRecords["AI출제마법사 CMS"].version')==3100001
  click(p,'item-deploy');modal(p).locator('input[value="AI출제마법사 CMS"]').check();expect(modal(p).locator('[data-redeploy]')).to_contain_text('다시 배포');shot(p,'item-redeploy.png');choose(p,'취소')
 run('Target required; cancel preserves data; usable item deploy and redeploy work',item_selection)
 def item_stale(p):
  click(p,'item-deploy');modal(p).locator('input[value="AI출제마법사 CMS"]').check()
  p.evaluate('CMS.item(2100001).status="N"');choose(p,'배포');expect(modal(p)).to_contain_text('사용(Y) 상태의 문항만')
  assert OTHER not in p.evaluate('CMS.item(2100001).deployed')
 run('Commit rechecks item status after modal opened',item_stale)
 def exclusions(p):
  fixture(p,['Y','D']);go(p,'/papers/5001')
  expect(p.locator('.paper-page')).to_contain_text('0건 미배포')
  p.locator('[data-action=paper-undeployed]').first.click();expect(modal(p)).not_to_contain_text('2100002');choose(p,'닫기')
  click(p,'paper-deploy');expect(modal(p).locator(f'input[value="{TARGET}"]')).to_be_enabled()
  expect(modal(p).locator(f'input[value="{OTHER}"]')).to_be_disabled();expect(modal(p)).to_contain_text('1건의 문항')
  shot(p,'paper-target-preflight.png');modal(p).locator(f'input[value="{TARGET}"]').check();choose(p,'배포')
  assert p.evaluate('CMS.paper(5001).deploymentRecords["개발 서비스"].itemIds')==[2100001]
  assert p.evaluate('CMS.item(2100002).deployed')==['개발 서비스']
  assert OTHER not in p.evaluate('CMS.item(2100001).deployed')
  expect(p.locator('.paper-page')).to_contain_text('미확인(모의)')
 run('Discarded item excluded from payload, preflight and missing-item list; targets independent',exclusions)
 def never_deployed_discard(p):
  fixture(p,['Y','D']);p.evaluate('CMS.item(2100002).deployed=[]');go(p,'/papers/5001')
  deploy(p,'paper-deploy');assert p.evaluate('CMS.item(2100002).deployed')==[]
  assert p.evaluate('CMS.paper(5001).deploymentRecords["개발 서비스"].itemIds')==[2100001]
  shot(p,'paper-discard-excluded.png')
 run('Never-deployed D does not require a Service record and is not deployed implicitly',never_deployed_discard)
 def prior_required(p):
  fixture(p,['Y','Y'],deployed=False);go(p,'/papers/5001');click(p,'paper-deploy')
  for c in modal(p).locator('input[name=deployTarget]').all():expect(c).to_be_disabled()
  expect(modal(p)).to_contain_text('먼저 배포')
  choose(p,'취소');assert p.evaluate('CMS.item(2100001).deployed')==[]
  for id in [2100001,2100002]:go(p,'/items/'+str(id));deploy(p,'item-deploy')
  go(p,'/papers/5001');deploy(p,'paper-deploy');assert TARGET in p.evaluate('CMS.paper(5001).deployed')
 run('Paper requires prior individual deployment; paper deployment never deploys missing items',prior_required)
 def block_non_use(p):
  for state in ['R','F','N']:
   fixture(p,['Y',state]);go(p,'/papers/5001');click(p,'paper-deploy')
   expect(modal(p).locator(f'input[value="{TARGET}"]')).to_be_disabled();expect(modal(p)).to_contain_text('배포할 수 없습니다');choose(p,'취소')
 run('Included R/F/N block paper deployment even when previously deployed',block_non_use)
 def paper_states(p):
  for state in ['R','N','D']:
   fixture(p,['Y'],state);go(p,'/papers/5001');expect(p.locator('[data-action=paper-deploy]')).to_be_disabled()
   p.evaluate('CMS.action("paper-deploy",{dataset:{id:5001}})');expect(modal(p)).to_contain_text('사용 평가지만');choose(p,'확인')
 run('Only usable paper may open deployment, including direct handler validation',paper_states)
 def paper_stale(p):
  fixture(p,['Y','Y']);go(p,'/papers/5001');click(p,'paper-deploy');modal(p).locator(f'input[value="{TARGET}"]').check()
  p.evaluate('CMS.item(2100002).deployed=[]');choose(p,'배포');expect(modal(p)).to_contain_text('먼저 배포')
  assert p.evaluate('CMS.paper(5001).deployed')==[]
 run('Paper commit rechecks all prerequisites with no partial deployment',paper_stale)
 def draft_use(p):
  for state in ['D','N','R','F']:
   fixture(p,['Y',state],'R');save_paper(p,'Y');expect(modal(p)).to_contain_text('모든 문항');choose(p,'확인')
   assert p.evaluate('CMS.paper(5001).status')=='R'
  fixture(p,['Y','Y'],'R');save_paper(p,'Y');assert p.evaluate('CMS.paper(5001).status')=='Y'
 run('Draft-to-use requires all items Y including discarded-item check',draft_use)
 def auto_stop(p):
  fixture(p,['Y','D']);go(p,'/items/2100001');click(p,'item-papers');expect(modal(p)).to_contain_text('5001');choose(p,'닫기')
  save_item(p,2100001,'N');assert p.evaluate('CMS.paper(5001).status')=='N'
  go(p,'/papers/5001');expect(p.locator('.notice')).to_contain_text('자동으로 미사용');shot(p,'paper-auto-stop.png')
  save_item(p,2100001,'Y');assert p.evaluate('CMS.paper(5001).status')=='N'
  save_paper(p,'Y');assert p.evaluate('CMS.paper(5001).status')=='Y'
  assert not p.evaluate('CMS.paper(5001).automaticStatus')
 run('Last Y stopped => paper N; item recovery does not resume paper; admin can resume',auto_stop)
 def auto_discard(p):
  fixture(p,['Y','D']);save_item(p,2100001,'D');assert p.evaluate('CMS.paper(5001).status')=='D'
  go(p,'/papers/5001');expect(p.locator('[data-action=paper-deploy]')).to_be_disabled();expect(p.locator('.notice')).to_contain_text('자동 폐기')
  go(p,'/papers/5001/edit');expect(p.locator('main')).to_contain_text('폐기 평가지의 수정은 잠겨');shot(p,'paper-auto-discard.png')
 run('All D => automatic paper D, edit locked and no resurrection',auto_discard)
 def mixed_stop(p):
  fixture(p,['Y','R','N']);save_item(p,2100001,'D');assert p.evaluate('CMS.paper(5001).status')=='N'
 run('No Y plus at least one N stops paper even with other non-use states',mixed_stop)
 def remaining_use(p):
  fixture(p,['Y','Y']);save_item(p,2100001,'N');assert p.evaluate('CMS.paper(5001).status')=='Y'
 run('One remaining Y prevents automatic stop',remaining_use)
 def resume(p):
  fixture(p,['N','D'],'N');save_paper(p,'Y');expect(modal(p)).to_contain_text('1개 이상');choose(p,'확인')
  fixture(p,['Y','D','N'],'N');save_paper(p,'Y');assert p.evaluate('CMS.paper(5001).status')=='Y'
  click(p,'paper-deploy');expect(modal(p).locator(f'input[value="{TARGET}"]')).to_be_disabled();shot(p,'paper-resumed-deploy-blocked.png')
 run('Manual N-to-Y needs at least one usable item; deployment checks remain independent',resume)
 def preserve(p):
  fixture(p,['Y','D']);save_paper(p,'Y');assert p.evaluate('CMS.paper(5001).status')=='Y'
  assert p.evaluate('CMS.paper(5001).groups.flat()')==[2100001,2100002]
  assert p.evaluate('CMS.item(2100002).status')=='D'
 run('Editing an already-used paper preserves discarded composition and source items',preserve)
 def persisted(p):
  fixture(p,['Y','D']);save_item(p,2100001,'N');p.reload();p.wait_for_selector('[data-action=status-save]')
  assert p.evaluate('CMS.paper(5001).status')=='N'
  assert p.evaluate('CMS.db.events.some(e=>e.message.includes("5001 자동 미사용"))')
 run('Automatic state and audit event persist after file reload',persisted)
 browser.close()
report={'date':'2026-11-20','passed':sum(x['status']=='passed' for x in results),'failed':sum(x['status']=='failed' for x in results),'results':results,'errors':errors,'externalRequests':network,'files':{'app.js':hashlib.sha256((ROOT/'app.js').read_bytes()).hexdigest()},'scope':'Offline Master mockup UI. Service runtime and actual CMS writes not exercised.'}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors),'externalRequests':len(network)}),flush=True)
raise SystemExit(bool(report['failed'] or errors or network))
