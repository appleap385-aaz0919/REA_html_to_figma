"""Verify publishing and the browser file-bridge adapter without sending real jobs.

The browser uses an in-memory DirectoryHandle adapter: this does not claim to test
a fresh native permission prompt. The existing user-granted folder contract is unchanged.
"""
from pathlib import Path
from types import SimpleNamespace
from datetime import datetime,timezone,timedelta
import json,sys,tempfile,traceback,hashlib
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent;sys.path.insert(0,str(ROOT))
import publish_descriptions as publisher
import review_agent as agent
OUT=ROOT/'verification/descriptions';results=[];errors=[];network=[]
def check(name,fn):
 try:fn();results.append(dict(name=name,status='passed'));print('PASS',name,flush=True)
 except Exception as e:results.append(dict(name=name,status='failed',error=str(e),trace=traceback.format_exc()));print('FAIL',name,str(e),flush=True)

def published():
 data=publisher.build();assert len(data['screens'])==30 and len(data['modals'])==52
 js=(ROOT/'description-data.js').read_text(encoding='utf8');bundled=json.loads(js[js.index('=')+1:].strip().removesuffix(';'))
 disk=json.loads((ROOT.parent/'review-work/runtime-browser/descriptions.json').read_text(encoding='utf8'))
 assert data==bundled==disk
 assert sum(len(s['notes']) for s in data['screens'])==185
 assert next(s for s in data['screens'] if s['id']=='REV_ITM_01')['notes'].__len__()==12
check('Actual Figma snapshot, offline script and live folder JSON contain identical 30 screens / 185 descriptions / 52 popups',published)

with tempfile.TemporaryDirectory(prefix='description-sync-',dir=OUT) as fixture:
 fixture=Path(fixture);(fixture/'updates').mkdir();agent.WORK=fixture
 args=SimpleNamespace(command='synced',job=fixture/'job.json',figma_status='done',figma_evidence='Isolated test: actual saved Figma export',policy_status='na',policy_evidence='No policy change',description_export=publisher.SOURCE)
 job=dict(schema=agent.SCHEMA,id='isolated-description-sync',phase='sync',token='fixture',at='2020-01-01T00:00:00Z')
 def completion():
  agent.write(args.job,job);agent.result_command(args);updates=list((fixture/'updates').glob('*.json'));assert len(updates)==1
  assert publisher.build()['revision'] in agent.load(updates[0])['figma']['evidence']
 check('Figma sync completion publishes the same bundle and records its revision in the isolated receipt',completion)
 def stale():
  before=list((fixture/'updates').glob('*.json'));job['at']='2100-01-01T00:00:00Z';agent.write(args.job,job)
  try:agent.result_command(args)
  except ValueError as e:assert '최신 Figma' in str(e)
  else:raise AssertionError('Stale export was accepted')
  assert list((fixture/'updates').glob('*.json'))==before
 check('Stale Figma export cannot mark a newer request synced or write a completion receipt',stale)

bundle=publisher.build()
fixture_js=r"""(()=>{
 const PROJECT='master-cms-demo21-review',EPOCH='review-reset-20261119-1';
 sessionStorage.setItem('cms-review-client','description-fixture');
 window.descriptionFixture={bundle:__BUNDLE__,reads:0,failures:0,writes:[]};
 const files={
  'runtime-project.json':()=>({project:PROJECT,epoch:EPOCH}),
  'session.json':()=>({project:PROJECT,epoch:EPOCH,client:'description-fixture'}),
  'heartbeat.json':()=>({epoch:EPOCH,at:new Date().toISOString()}),
  'descriptions.json':()=>{descriptionFixture.reads++;if(descriptionFixture.failures-->0)throw new DOMException('Snapshot replaced','InvalidStateError');return descriptionFixture.bundle;}
 };
 const dir={async queryPermission(){return 'granted'},async getDirectoryHandle(){return dir},async getFileHandle(name){return {async getFile(){if(!files[name])throw new DOMException('Missing','NotFoundError');return {async text(){return JSON.stringify(files[name]())}}},async createWritable(){return {async write(value){descriptionFixture.writes.push({name,value:JSON.parse(value)})},async close(){},async abort(){}}}}}};
 Object.defineProperty(window,'showDirectoryPicker',{value:async()=>dir});
 Object.defineProperty(window,'indexedDB',{value:{open(){const request={};setTimeout(()=>{request.result={close(){},transaction(){const tx={objectStore(){return {put(){const r={};setTimeout(()=>{r.onsuccess?.();tx.oncomplete?.()},0);return r},get(){const r={};setTimeout(()=>{r.onsuccess?.();tx.oncomplete?.()},0);return r}}}};return tx}};request.onsuccess?.()},0);return request}}});
})();""".replace('__BUNDLE__',json.dumps(bundle,ensure_ascii=False))
with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True);ctx=browser.new_context(offline=True,viewport={'width':1760,'height':1100});ctx.add_init_script(fixture_js);p=ctx.new_page();p.set_default_timeout(7000)
 p.on('pageerror',lambda e:errors.append(str(e)));p.on('request',lambda r:network.append(r.url) if r.url.startswith(('http:','https:')) else None)
 p.goto((ROOT/'index.html').as_uri()+'#/items/2100001');p.wait_for_selector('main h1');p.locator('[data-rv=open]').click();p.locator('[data-rv=connect-files]').click();p.locator('[data-rv=descriptions]').click()
 def bridge():
  request=p.evaluate('CMSReview.exportData()');service=p.evaluate('JSON.stringify(CMS.db)');updated=json.loads(json.dumps(bundle));updated['capturedAt']=(datetime.now(timezone.utc)+timedelta(seconds=3)).isoformat();updated['revision']='e'*64
  updated['screens'][2]['notes'][7]['body']='폴더 연결을 통해 갱신된 실제 파일 교환 검증용 설명'
  p.evaluate('v=>{descriptionFixture.bundle=v;descriptionFixture.failures=1}',updated)
  expect(p.locator('[data-description-key=REV_ITM_STATUS_SAVE] p')).to_have_text(updated['screens'][2]['notes'][7]['body'],timeout=9000)
  assert p.evaluate('CMSReview.exportData()')==request and p.evaluate('JSON.stringify(CMS.db)')==service
  assert p.evaluate('descriptionFixture.reads')>=3
  assert p.evaluate('descriptionFixture.writes.some(x=>x.name==="outbox.json")')
  assert 'Description을 갱신하지 못했습니다' not in p.locator('.rv-status').inner_text()
 check('Unchanged browser bridge retries a replaced file snapshot and delivers new descriptions without page reload or user-data changes (DirectoryHandle adapter)',bridge)
 def read_only():
  assert p.evaluate('descriptionFixture.writes.every(x=>["session.json","outbox.json"].includes(x.name))')
  assert p.evaluate('descriptionFixture.writes.filter(x=>x.name==="outbox.json").every(x=>x.value.jobs.length===0)')
 check('Description synchronization never writes back description data or fabricates review jobs/approval',read_only)
 browser.close()
report=dict(passed=sum(r['status']=='passed' for r in results),failed=sum(r['status']=='failed' for r in results),results=results,errors=errors,http=network,nativePermissionPromptTested=False,transport='DirectoryHandle adapter; real bridge JS, no actual request transmission',files={n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['publish_descriptions.py','review_agent.py','review_file_bridge.js','description-data.js']})
(OUT/'sync-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({k:report[k] for k in ['passed','failed','errors','http']}),flush=True)
raise SystemExit(bool(report['failed'] or errors or network))
