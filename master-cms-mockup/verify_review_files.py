"""Headed Chrome + genuine native directory permission + real disk exchange.
Only Orca's terminal send is replaced; no QA request is sent to the user's conversation.
Run, then select the printed fixture directory in the native picker.
"""
from pathlib import Path
from types import SimpleNamespace
import importlib.util,json,time,tempfile,shutil,hashlib,traceback,ctypes
from ctypes import wintypes
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent;OUT=ROOT/'verification/review-v3';OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('agent',ROOT/'review_agent.py');agent=importlib.util.module_from_spec(spec);spec.loader.exec_module(agent)
fixture=Path(tempfile.mkdtemp(prefix='native-fixture-',dir=OUT));agent.WORK=fixture
agent.write(fixture/'runtime-project.json',{'project':agent.PROJECT,'epoch':agent.EPOCH})
class Transport(agent.FileBridge):
 def __init__(self):super().__init__();self.sent=[]
 def target(self):return 'isolated-test-conversation'
 def cli(self,*args):self.sent.append(args);return {'accepted':True}
transport=Transport();ledger={};transport.tick(ledger);errors=[];network=[];checks=[]
def check(text):checks.append(text);print('PASS',text,flush=True)
def tick_until(p,predicate,limit=25):
 end=time.monotonic()+limit
 while time.monotonic()<end:
  transport.tick(ledger);p.wait_for_timeout(400)
  if predicate():return
 raise AssertionError('File exchange timed out')
def select_test_directory(path):
 # Invoke standard controls in the native chooser owned by this test Chrome window only.
 user=ctypes.windll.user32
 user.GetWindow.restype=wintypes.HWND
 user.GetWindow.argtypes=[wintypes.HWND,wintypes.UINT]
 user.GetDlgItem.restype=wintypes.HWND
 user.GetDlgItem.argtypes=[wintypes.HWND,ctypes.c_int]
 user.SendMessageW.argtypes=[wintypes.HWND,wintypes.UINT,wintypes.WPARAM,wintypes.LPARAM]
 user.SendMessageW.restype=wintypes.LPARAM
 callback=ctypes.WINFUNCTYPE(wintypes.BOOL,wintypes.HWND,wintypes.LPARAM)
 def title(hwnd):
  b=ctypes.create_unicode_buffer(1024);user.GetWindowTextW(hwnd,b,1024);return b.value
 windows=[]
 user.EnumWindows(callback(lambda h,l: windows.append(h) or True),0)
 main=next(h for h in windows if title(h)=='검수 파일 연결 검증 전용 - Chrome')
 owned_children=[];user.EnumChildWindows(main,callback(lambda h,l: owned_children.append(h) or True),0)
 windows+=owned_children
 main_pid=wintypes.DWORD();user.GetWindowThreadProcessId(main,ctypes.byref(main_pid))
 def owned(h):
  value=wintypes.DWORD();user.GetWindowThreadProcessId(h,ctypes.byref(value));return value.value==main_pid.value
 candidates=[h for h in windows if '위치 선택' in title(h)]
 if len(candidates)>1:raise RuntimeError('Ambiguous native picker; leaving untouched')
 if not candidates:raise RuntimeError('Native picker not found: '+repr([(h,title(h)) for h in windows if owned(h)]))
 dialog=candidates[0]
 children=[];user.EnumChildWindows(dialog,callback(lambda h,l: children.append(h) or True),0)
 edits=[]
 for h in children:
  b=ctypes.create_unicode_buffer(100);user.GetClassNameW(h,b,100)
  if b.value=='Edit':
   r=wintypes.RECT();user.GetWindowRect(h,ctypes.byref(r));edits.append((r.top,h))
 edit=max(edits)[1];value=ctypes.create_unicode_buffer(str(path))
 user.SendMessageW(edit,12,0,ctypes.cast(value,ctypes.c_void_p).value)
 readback=ctypes.create_unicode_buffer(2000);user.SendMessageW(edit,13,2000,ctypes.cast(readback,ctypes.c_void_p).value)
 assert readback.value==str(path),'Native directory value did not match: '+repr(readback.value)
 ok=user.GetDlgItem(dialog,1);assert ok
 user.SendMessageW(ok,245,0,0)
report={'passed':False,'nativePermission':False,'transport':'Real native folder picker and disk I/O; terminal-send replaced (no actual conversation delivery).'}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(channel='chrome',headless=False,args=['--window-size=1500,1000'])
  ctx=browser.new_context(offline=True,viewport={'width':1480,'height':900});p=ctx.new_page();p.on('pageerror',lambda e:errors.append(str(e)));p.on('dialog',lambda d:d.accept());p.on('request',lambda r:network.append(r.url) if r.url.startswith(('https:','http:')) else None)
  p.goto((ROOT/'index.html').as_uri()+'#/definition/7001');p.wait_for_selector('h1');p.evaluate('document.title="검수 파일 연결 검증 전용"')
  p.locator('[data-rv=open]').click();p.locator('[data-rv=connect-files]').click()
  print('SELECT DIRECTORY:',fixture,flush=True)
  p.wait_for_timeout(1500)
  select_test_directory(fixture)
  p.wait_for_function('document.querySelector(".rv-connection")?.textContent==="작업 연결됨"',timeout=240000)
  report['nativePermission']=True;check('Ordinary file:// Chrome grants the real native folder handle and connects without a server')
  p.locator('[data-rv=page-request]').click();p.locator('[data-draft=request]').fill('격리 검증 예시입니다. 실제 대화에는 전달하지 않습니다.');p.locator('[data-rv=create]').click()
  tick_until(p,lambda:p.evaluate('CMSReview.exportData().items[0]?.status==="queued"'))
  assert len(transport.sent)==1;check('Browser request reaches a durable job and accepted receipt returns to that browser')
  path=Path(next(iter(ledger.values()))['job']);agent.result_command(SimpleNamespace(command='begin',job=path));tick_until(p,lambda:p.evaluate('CMSReview.exportData().items[0]?.status==="working"'))
  p.screenshot(path=str(OUT/'file-working.png'))
  after=OUT/'file-after.jpg';p.screenshot(path=str(after),type='jpeg',quality=65)
  agent.result_command(SimpleNamespace(command='result',job=path,summary='격리 파일 연결 검증용 결과입니다.',evidence='실제 폴더 권한 및 JSON 파일 왕복',after=after))
  tick_until(p,lambda:p.evaluate('CMSReview.exportData().items[0]?.status==="ready"'));assert p.locator('.rv-status').text_content()=='';check('Real begin/result files and after capture reach the original external browser')
  tick_until(p,lambda:not list((fixture/'updates').glob('*.json')));assert list((fixture/'updates').glob('*.applied'));check('Result file is acknowledged only after browser application')
  p.screenshot(path=str(OUT/'file-ready.png'))
  p.reload();p.wait_for_selector('h1');
  if p.locator('[data-rv=open]').count():p.locator('[data-rv=open]').click()
  tick_until(p,lambda:p.locator('.rv-connection').text_content()=='작업 연결됨')
  assert p.evaluate('CMSReview.exportData().items[0].status')=='ready';check('Native directory handle and request/result survive a page reload')
  p.locator('.rv-card>summary').click();p.locator('[data-rv=approve]').click();tick_until(p,lambda:len(transport.sent)==2)
  assert any(agent.load(Path(entry['job']))['phase']=='sync' for entry in ledger.values());check('Only a user approval emits the separate document synchronization job')
  assert not errors and not network,(errors,network);report['passed']=True;browser.close()
except Exception as e:
 report['error']=str(e);report['trace']=traceback.format_exc();print('FAIL',str(e),flush=True)
finally:
 report.update(checks=checks,errors=errors,externalRequests=network,files={n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['review.js','review_file_bridge.js','review_agent.py']})
 (OUT/'file-bridge-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
 shutil.rmtree(fixture)
raise SystemExit(not report['passed'])
