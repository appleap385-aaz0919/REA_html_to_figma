"""Multiple change types and agent-judged policy results in ordinary offline Chrome."""
from pathlib import Path
import json,hashlib,traceback,subprocess,tempfile
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent;OUT=ROOT/'verification/review-kinds';OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,width=1600):
  ctx=browser.new_context(offline=True,viewport={'width':width,'height':1000});p=ctx.new_page();local=[]
  p.on('pageerror',lambda e:local.append(str(e)));p.on('dialog',lambda d:d.accept())
  try:
   p.goto((ROOT/'index.html').as_uri());p.wait_for_selector('h1');p.locator('[data-rv=open]').click();fn(p);assert not local,local
   results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
  except Exception as e:
   results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()});p.screenshot(path=str(OUT/f'failure-{len(results)}.png'),animations='disabled');print('FAIL',name,str(e)[:350],flush=True)
  errors.extend(local);ctx.close()
 def click(p,a):
  if a=='open' and p.locator('.rv-panel').count():return
  p.locator(f'[data-rv={a}]').first.click()
 def data(p):return p.evaluate('CMSReview.exportData()')
 def draft(p):click(p,'page-request');p.locator('[data-draft=request]').fill('등록 결과를 옆으로 옮기고 선택 조건도 바꿔 주세요.')
 def job(p):click(p,'create');return p.evaluate('CMSReview.agentOutbox()[0]')
 def result(p,j,changes):return p.evaluate('v=>CMSReview.agentUpdate(v)',dict(id=j['id'],phase='html',token=j['token'],state='result',summary='배치와 선택 조건을 수정했습니다.',evidence='격리 검증 예시',policyChanges=changes))
 def multiple(p):
  draft(p);p.locator('[data-change-kind=feature]').check();p.locator('[data-change-kind=bug]').check();assert not p.locator('[data-change-kind=policy]').count()
  p.reload();p.wait_for_selector('h1');click(p,'open');expect(p.locator('[data-change-kind]:checked')).to_have_count(3)
  p.screenshot(path=str(OUT/'multiple.png'),animations='disabled');j=job(p);assert j['item']['changeKinds']==['layout','feature','bug']
  expect(p.locator('.rv-summary small')).to_contain_text('화면·배치 수정 · 기능 수정 · 오류 수정')
  archive=data(p);p.evaluate('async v=>CMSReview.importFile(new File([JSON.stringify(v)],"same.json"))',archive);assert data(p)['items'][0]['changeKinds']==['layout','feature','bug']
 run('Three selections survive reload, registration, job delivery and archive validation',multiple)
 def empty(p):
  draft(p);p.locator('[data-change-kind=layout]').uncheck();click(p,'create');assert not data(p)['items'];expect(p.locator('.rv-status')).to_contain_text('하나 이상');assert data(p)['draft']['request']
 run('Empty selection blocks registration and preserves the written request',empty)
 def changed(p):
  draft(p);p.locator('[data-change-kind=feature]').check();j=job(p)
  changes='이전: 등록 결과를 읽기만 할 수 있었습니다.\n변경: 초안 상태에서 등록 결과를 선택할 수 있습니다. 승인 후에는 변경할 수 없습니다.'
  result(p,j,changes);expect(p.locator('.rv-policy-changes')).to_contain_text(changes);assert data(p)['items'][0]['sync']['policy']['status']=='pending'
  p.screenshot(path=str(OUT/'changed-policy.png'),animations='disabled');click(p,'approve');click(p,'completed');expect(p.locator('.rv-policy-changes')).to_contain_text(changes)
  sync=p.evaluate('CMSReview.agentOutbox()[0]');assert sync['phase']=='sync' and sync['item']['policyChanges']==changes
 run('Changed policy appears with the result, survives approval and reaches the document job',changed)
 def unchanged(p):
  draft(p);p.locator('[data-change-kind=feature]').check();j=job(p);result(p,j,'');assert not p.locator('.rv-policy-changes').count();assert data(p)['items'][0]['sync']['policy']['status']=='na'
  click(p,'approve');click(p,'completed');assert not p.locator('.rv-policy-changes').count();assert '정책' not in p.locator('.rv-sync-list').inner_text();p.screenshot(path=str(OUT/'unchanged-policy.png'),animations='disabled')
 run('Agent judgment can mark a feature change as policy-unchanged; no policy section is shown',unchanged)
 def layout_policy(p):
  draft(p);j=job(p);result(p,j,'이전에는 승인 상태에서도 버튼이 표시됐지만, 이제 초안 상태에서만 표시합니다.');assert p.locator('.rv-policy-changes').is_visible()
  click(p,'show-rework');p.locator('[data-note]').fill('조건을 다시 검토해 주세요.');click(p,'rework');assert data(p)['items'][0]['policyChanges'] is None;assert not p.locator('.rv-policy-changes').count()
 run('Policy impact follows actual content even for layout-only requests; rework hides the old policy result',layout_policy)
 def legacy(p):
  draft(p);job(p);v=data(p);i=v['items'][0];i.pop('changeKinds');i.pop('policyChanges');i['kind']='policy'
  p.evaluate('v=>localStorage.setItem("master-cms-visual-review-v2",JSON.stringify(v))',v);p.reload();p.wait_for_selector('h1');click(p,'open')
  assert data(p)['items'][0]['changeKinds']==['feature'];assert data(p)['items'][0]['request']==i['request'];expect(p.locator('.rv-summary small')).to_contain_text('기능 수정')
 run('Legacy single-choice policy records migrate without deleting their request content',legacy)
 def mobile(p):
  draft(p);p.locator('[data-change-kind=feature]').check();p.locator('[data-change-kind=bug]').check();p.screenshot(path=str(OUT/'mobile.png'),animations='disabled');assert p.locator('.rv-kind-options').bounding_box()['width']<390
 run('390px checkbox group remains readable and usable',mobile,390)
 browser.close()
report={'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'results':results,'errors':errors,'files':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['review.js','review.css','review_agent.py','review_cli.py']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors)}),flush=True)
raise SystemExit(bool(report['failed'] or errors))
