"""Exercise the simplified offline UI and real file bridge with an isolated transport.
Orca delivery is separately proven with the user's live request; this runner never sends QA prompts.
"""
from pathlib import Path
from types import SimpleNamespace
import importlib.util, json, time, traceback, hashlib
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification/review-v2';OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('review_agent',ROOT/'review_agent.py')
agent=importlib.util.module_from_spec(spec);spec.loader.exec_module(agent)
agent.WORK=OUT/'bridge-fixture'
results=[];errors=[];network=[]

with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,width=1800):
  ctx=browser.new_context(offline=True,viewport={'width':width,'height':1000},accept_downloads=True);page=ctx.new_page();local=[]
  page.on('pageerror',lambda e:local.append(str(e)))
  page.on('requestfailed',lambda r:local.append(r.url+' '+str(r.failure)) if r.failure!='net::ERR_ABORTED' else None)
  page.on('request',lambda r:network.append(r.url) if r.url.startswith(('https:','http:')) else None)
  page.on('dialog',lambda d:d.accept())
  started=time.monotonic()
  try:
   page.goto((ROOT/'index.html').as_uri()+'#/definition/7001');page.wait_for_selector('h1');fn(page,ctx);assert not local,local
   results.append({'name':name,'status':'passed','seconds':round(time.monotonic()-started,2)});print('PASS',name,flush=True)
  except Exception as e:
   results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()});page.screenshot(path=str(OUT/f'failure-{len(results)}.png'),animations='disabled');print('FAIL',name,str(e)[:600],flush=True)
  errors.extend(local);ctx.close()
 def click(p,a):
  if a=='open' and p.locator('.rv-panel').count():return
  p.locator(f'[data-rv="{a}"]').first.click()
 def data(p):return p.evaluate('CMSReview.exportData()')
 def new(p,kind='feature'):
  click(p,'open');click(p,'mark');r=p.locator('[data-judgment]').first.bounding_box();p.mouse.move(r['x']-3,r['y']-3);p.mouse.down();p.mouse.move(r['x']+r['width']+3,r['y']+r['height']+3,steps=5);p.mouse.up();p.wait_for_selector('[data-draft=request]');p.locator('[data-draft=request]').fill('등록 결과의 선택 기능을 수정하고 정책도 반영해 주세요.');[p.locator(f'[data-change-kind={k}]').set_checked(k==kind) for k in ['layout','feature','bug']]
  p.screenshot(path=str(OUT/'draft.png'),animations='disabled');click(p,'create');return p.evaluate('CMSReview.agentOutbox()[0]')
 def apply(p,job,state,**kw):return p.evaluate('(v)=>CMSReview.agentUpdate(v)',{'id':job['id'],'phase':job['phase'],'token':job['token'],'state':state,**kw})
 def ready(p,job):apply(p,job,'working');apply(p,job,'result',summary='선택 기능과 화면 배치를 수정했습니다.',evidence='QA fixture · actual backend not mutated')
 def shot(p,name):p.screenshot(path=str(OUT/name),animations='disabled')

 def ui(p,c):
  job=new(p);item=data(p)['items'][0];assert item['kind']=='feature' and item['sync']['policy']['status']=='pending'
  assert not p.locator('[data-result]:visible,[data-sync]:visible,[type=file]:visible').count()
  assert not p.locator('[data-note]:visible').count();assert not p.locator('[data-rv=packet]:visible').count()
  expect(p.locator('.rv-progress')).to_contain_text('작업 연결')
  assert p.locator('.rv-panel button:visible').count()<=9
  p.evaluate('CMSReview.agentHeartbeat()');expect(p.locator('.rv-connection')).to_have_text('작업 연결됨')
  shot(p,'desktop.png');assert item['request']==job['item']['request']
 run('Function-change classification, policy review and simplified default panel',ui)

 class Transport(agent.Bridge):
  def __init__(self,p,accepted=True):self.p=p;self.page='isolated-offline-page';self.target_tab='qa-tab';self.sent=[];self.accept=accepted
  def evaluate(self,expression):return self.p.evaluate(expression)
  def target(self):return 'qa-existing-conversation'
  def cli(self,*args):self.sent.append(args);return {'accepted':self.accept,'stage':'input_accepted' if self.accept else 'unknown'}

 def bridge(p,c):
  job=new(p);transport=Transport(p);ledger={};transport.tick(ledger)
  assert len(transport.sent)==1 and data(p)['items'][0]['status']=='queued'
  revision=data(p)['revision'];transport.tick(ledger);assert len(transport.sent)==1 and data(p)['revision']==revision
  path=Path(next(iter(ledger.values()))['job']);assert path.exists();saved=agent.load(path)
  agent.result_command(SimpleNamespace(command='begin',job=path));transport.tick(ledger);assert data(p)['items'][0]['status']=='working'
  agent.result_command(SimpleNamespace(command='result',job=path,summary='실제 코드를 수정한 뒤 기록하는 결과입니다. (QA 예시)',evidence='격리된 UI·파일 왕복 검수',after=None));transport.tick(ledger)
  assert data(p)['items'][0]['status']=='ready';assert not p.locator('[data-note]:visible').count()
  assert p.locator('.rv-main-actions button:visible').count()==2
  shot(p,'ready.png');click(p,'approve');assert data(p)['items'][0]['status']=='done'
  transport.tick(ledger);assert len(transport.sent)==2
  sync=next(v for v in ledger.values() if agent.load(v['job'])['phase']=='sync');syncpath=Path(sync['job'])
  agent.result_command(SimpleNamespace(command='synced',job=syncpath,figma_status='done',figma_evidence='QA fixture only · no actual Figma mutation',policy_status='done',policy_evidence='QA fixture only · no actual policy mutation'))
  transport.tick(ledger);item=data(p)['items'][0];assert all(s['status']=='done' for s in item['sync'].values())
  click(p,'completed');assert not p.locator('[data-sync]').count();expect(p.locator('.rv-sync-list')).to_contain_text('반영 완료');shot(p,'completed.png')
 run('UI to durable job file to result to user approval to independent document phase',bridge)

 def stale(p,c):
  job=new(p);ready(p,job);click(p,'show-rework');p.locator('[data-note]').fill('새 조건으로 다시 수정해 주세요.');p.locator('[data-note]').press('Enter');assert data(p)['items'][0]['messages'][-1]['kind']=='rework'
  newer=p.evaluate('CMSReview.agentOutbox()[0]');assert newer['token']!=job['token'] and data(p)['items'][0]['status']=='new'
  before=data(p)
  try:ready(p,job);raise AssertionError('stale update accepted')
  except Exception as e:assert '요청이 변경' in str(e)
  assert data(p)==before;ready(p,newer);assert data(p)['items'][0]['status']=='ready'
 run('Rework is automatically dispatched and old results cannot overwrite new requirements',stale)

 def supplemental(p,c):
  job=new(p);p.locator('.rv-supplement > summary').click();p.locator('[data-note]').fill('공통 카드 모두에 적용해 주세요.');p.locator('[data-note]').press('Enter')
  newjob=p.evaluate('CMSReview.agentOutbox()[0]');assert newjob['token']!=job['token'];assert newjob['item']['messages'][-1]['kind']=='comment'
  assert data(p)['items'][0]['status']=='new'
 run('Optional explanation posts into the same request and reaches the agent outbox',supplemental)

 def safety(p,c):
  job=new(p);transport=Transport(p,accepted=False);ledger={};transport.tick(ledger);transport.tick(ledger)
  assert len(transport.sent)==1;assert data(p)['items'][0]['status']=='new';assert data(p)['items'][0]['agent']['state']=='error'
  assert not agent.Bridge.accepted({'accepted':False});assert agent.Bridge.accepted({'receipt':{'stages':['input_accepted']}})
  assert all('--terminal' in sent for sent in transport.sent)
 run('Ambiguous submission is never labelled working and is never blindly resent',safety)

 def mask(p,c):
  click(p,'open');click(p,'mark');assert p.locator('main').evaluate('(e)=>e.inert');p.keyboard.press('Escape');assert not p.locator('main').evaluate('(e)=>e.inert')
  click(p,'mark');r=p.locator('[data-judgment]').first.bounding_box();p.mouse.move(r['x'],r['y']);p.mouse.down();p.mouse.move(r['x']+40,r['y']+25);p.mouse.up();p.wait_for_selector('[data-draft=request]');p.locator('[data-draft=request]').fill('새로고침 후에도 남는 요청')
  p.reload();p.wait_for_selector('h1');click(p,'open');expect(p.locator('[data-draft=request]')).to_have_value('새로고침 후에도 남는 요청');click(p,'create');expect(p.locator('.rv-mark')).to_have_count(1)
  click(p,'completed');p.locator('.rv-mark button').click();expect(p.locator('.rv-card')).to_have_count(1)
 run('Mask, Escape, draft reload and marker navigation remain intact',mask)

 def native(p,c):
  p.evaluate('CMS.go("/lab/omr",true)');p.locator('[data-gallery-type]').first.locator('summary').click();p.locator('[data-action=gallery-preview]').first.click();p.frame_locator('.native-omr-preview-frame').locator('.omr-table').wait_for();click(p,'open');click(p,'mark');assert p.locator('#modal-root').evaluate('(e)=>e.inert');p.keyboard.press('Escape');assert not p.locator('#modal-root').evaluate('(e)=>e.inert');shot(p,'native-popup.png')
 run('Native OMR popup and iframe input lock remain usable with the simpler panel',native)

 def mobile(p,c):
  p.evaluate('CMS.go("/home",true)');click(p,'open');click(p,'mark');assert p.locator('.rv-blocker').bounding_box()['width']==390
  p.mouse.move(30,200);p.mouse.down();p.mouse.move(230,240);p.mouse.up();p.wait_for_selector('[data-draft=request]');p.locator('[data-draft=request]').fill('작은 화면 요청');click(p,'create');shot(p,'mobile.png')
  assert p.locator('.rv-panel').bounding_box()['width']<=390;assert p.locator('[data-rv=create]:visible').count()==0
 run('390px panel with reduced choices and a usable marking tray',mobile,390)

 def portability(p,c):
  new(p);p.locator('.rv-supplement > summary').click();p.locator('[data-note]').fill('아직 보내지 않은 보충 설명');archive=data(p)
  p.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"same.json"))',archive);assert len(data(p)['items'])==1
  dest=browser.new_context(offline=True);other=dest.new_page();other.goto((ROOT/'index.html').as_uri());other.wait_for_selector('h1');other.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"archive.json"))',archive);click(other,'open');other.locator('.rv-card > summary').click();other.locator('.rv-supplement > summary').click();expect(other.locator('[data-note]')).to_have_value('아직 보내지 않은 보충 설명');assert data(other)['items'][0]['kind']=='feature';dest.close()
 run('New feature requests and unsubmitted explanations survive JSON migration',portability)
 def quota(p,c):
  job=new(p);p.evaluate('()=>{Storage.prototype.setItem=function(){throw new DOMException("full","QuotaExceededError")}}')
  outcome=apply(p,job,'result',summary='저장 실패 검수 결과',evidence='격리 저장 용량 오류 재현')
  assert outcome=={'applied':False,'status':'storage_error'}
  assert data(p)['items'][0]['status']=='ready'
  expect(p.locator('.rv-status')).to_contain_text('저장하지 못했습니다')
  assert p.evaluate('CMSReview.agentOutbox()')==[]
 run('Unpersisted agent result stays in memory and is not acknowledged as durably applied',quota)
 def monotonic(p,c):
  job=new(p);ready(p,job);revision=data(p)['revision'];apply(p,job,'working');assert data(p)['items'][0]['status']=='ready' and data(p)['revision']==revision
  click(p,'approve');sync=p.evaluate('CMSReview.agentOutbox()[0]');apply(p,sync,'sent');apply(p,sync,'error',error='연결 검수용 문서 반영 오류')
  click(p,'completed');expect(p.locator('.rv-error')).to_contain_text('연결 검수용 문서 반영 오류')
  revision=data(p)['revision'];apply(p,sync,'sent');assert data(p)['items'][0]['agent']['state']=='error' and data(p)['revision']==revision
  expect(p.locator('.rv-error')).to_contain_text('연결 검수용 문서 반영 오류');shot(p,'sync-error.png')
 run('Late begin cannot regress a result; document errors stay visible through receipt replay',monotonic)
 browser.close()

report={'date':'2026-11-19','passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'results':results,'runtimeOrAssetErrors':errors,'externalRequests':network,'transport':'Isolated transport fixture; real UI, Python job/result files and command argument construction. Live Orca receipt is recorded separately.','files':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['review.js','review.css','review_agent.py','index.html']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors),'http':len(network)}),flush=True)
raise SystemExit(1 if report['failed'] or errors or network else 0)
