"""Exercise the Description tab in real offline Chrome; never touch the user's profile."""
from pathlib import Path
from datetime import datetime, timezone, timedelta
import hashlib, json, traceback
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification/descriptions'
OUT.mkdir(parents=True,exist_ok=True)
SOURCE=json.loads((ROOT.parent/'design-specs/figma-review-descriptions-export.json').read_text(encoding='utf8'))
results=[];errors=[];network=[];audit=[]

def rv(p,act):p.locator(f'[data-rv="{act}"]').first.click()
def description(p):rv(p,'open');rv(p,'descriptions')
def context(p):return p.locator('.rv-description-view').get_attribute('data-description-context')
def absent(p):return p.locator('.rv-description-list>li').evaluate_all("es=>es.filter(e=>e.querySelector('small').textContent).map(e=>e.querySelector('h4 span').textContent)")
def navigate(p,route):p.evaluate('r=>CMS.go(r,true)',route);p.wait_for_timeout(180)

with sync_playwright() as pw:
 browser=pw.chromium.launch(channel='chrome',headless=True)
 def run(name,fn,route='/items/2100001',width=1760):
  c=browser.new_context(offline=True,viewport={'width':width,'height':1100});p=c.new_page();p.set_default_timeout(10000);local=[]
  p.on('pageerror',lambda e:local.append(str(e)))
  p.on('request',lambda r:network.append(r.url) if r.url.startswith(('http:','https:')) else None)
  p.on('dialog',lambda d:d.accept())
  try:
   p.goto((ROOT/'index.html').as_uri()+'#'+route);p.wait_for_selector('main h1');fn(p)
   assert not local,local
   results.append(dict(name=name,status='passed'));print('PASS',name,flush=True)
  except Exception as e:
   results.append(dict(name=name,status='failed',error=str(e),trace=traceback.format_exc()))
   p.screenshot(path=str(OUT/f'failure-{len(results)}.png'));print('FAIL',name,str(e)[:400],flush=True)
  finally:errors.extend(local);c.close()

 routes={
 'REV_HOME_01':'/home','REV_ITM_01':'/items','REV_ITM_02':'/items/2100001',
 'REV_ITM_03':'/items/2100001/edit/meta','REV_ITM_04':'/items/2100001/edit/hml','REV_ITM_05':'/items/2100001/edit/html','REV_ITM_06':'/items/2100001/edit/omr',
 'REV_LAB_01':'/lab','REV_LAB_02':'/lab/math','REV_LAB_03':'/lab/omr','REV_LAB_04':'/lab/restore','REV_LAB_05':'/lab/isolation',
 'MST_HML_C01':'/hml','MST_HML_C02':'/hml/new','MST_HML_C03':'/hml/6001','MST_HML_C04':'/hml/6003',
 'MST_DIFI_C01':'/definition','MST_DIFI_C02':'/definition/new','MST_DIFI_C03':'/definition/7001','MST_DIFI_C04':'/definition/7002',
 'MST_TWN_C01':'/twins','MST_TWN_C02':'/twins/3001','REV_PAP_LIST':'/papers','REV_PAP_DETAIL':'/papers/5001','REV_PAP_EDIT':'/papers/5001/edit',
 'REV_SRC_LIST':'/sources','REV_SRC_FORM':'/sources/new','REV_SRC_DETAIL':'/sources/8001','REV_SRC_EDIT':'/sources/8001/edit'}
 for key,route in routes.items():
  def screen(p,key=key):
   description(p);assert context(p)==key
   expected=next(x for x in SOURCE['screens'] if x['key']==key)
   actual=p.locator('.rv-description-list>li').evaluate_all("es=>es.map(e=>({number:+e.querySelector('h4 span').textContent,body:e.querySelector('p').textContent}))")
   assert actual==[dict(number=n['number'],body=n['body']) for n in expected['notes']],key
   missing=absent(p);allowed=['04','05'] if key=='REV_ITM_06' else []
   assert all(x in allowed for x in missing),(key,missing)
   assert p.locator('.rv-description-marker').count()>0
   audit.append(dict(screen=key,notes=len(actual),conditional=missing))
  run('Current screen matches actual Figma notes and anchors: '+key,screen,route)

 def hml(p):
  description(p);p.locator('[data-action=hml-open]').first.click();p.wait_for_timeout(150)
  assert context(p)=='REV_ITM_07';assert p.locator('.rv-description-list>li').count()==3
  assert absent(p)==['02'] # No shared passage in this single-item fixture.
  p.screenshot(path=str(OUT/'hml-editor.png'))
 run('Separate HML editor uses its own existing Figma description and conditional passage anchor',hml,'/items/2100001/edit/hml')

 def status08(p):
  description(p);p.locator('[data-description="REV_ITM_STATUS_SAVE"]').first.click();p.wait_for_timeout(100)
  marker=p.locator('.rv-description-marker[data-description=REV_ITM_STATUS_SAVE]');expect(marker).to_have_text('08')
  assert not any(x in ['13','14'] for x in p.locator('.rv-description-list h4 span').all_text_contents())
  assert p.locator('[data-action=status-save]').is_disabled();assert p.locator('.rv-description-outline').count()==1
  p.screenshot(path=str(OUT/'item-status08.png'))
  marker.click();expect(p.locator('.rv-description-selected')).to_contain_text('상태 정보 저장')
  rv(p,'hide');assert not p.locator('.rv-description-marker').count();rv(p,'hide');expect(marker).to_be_visible()
  p.locator('[data-status-bind=usage]').select_option('T');expect(p.locator('[data-action=status-save]')).to_be_enabled()
  rv(p,'active');assert not p.locator('.rv-description-marker').count();expect(p.locator('[data-rv=mark]')).to_be_visible()
 run('08 stays consolidated; bidirectional labels, hide/show, service editing and active-tab return',status08)

 def persistence(p):
  description(p);p.locator('.rv-scroll').evaluate('e=>e.scrollTop=440');p.wait_for_timeout(100)
  before=p.locator('.rv-scroll').evaluate('e=>e.scrollTop');p.reload();p.wait_for_selector('.rv-description-view')
  assert abs(p.locator('.rv-scroll').evaluate('e=>e.scrollTop')-before)<4
  navigate(p,'/sources/8001');assert context(p)=='REV_SRC_DETAIL';expect(p.locator('[data-rv=descriptions]')).to_have_attribute('aria-pressed','true')
  p.screenshot(path=str(OUT/'source-detail.png'));rv(p,'close');p.reload();p.wait_for_selector('main h1');assert not p.locator('.rv-panel').count()
 run('Description tab, panel visibility and scroll persist across reload and screen navigation',persistence)

 def requests(p):
  rv(p,'open');rv(p,'page-request');p.locator('[data-draft=request]').fill('아직 등록하지 않은 요청입니다.');p.locator('[data-draft=request]').evaluate('e=>e.blur()');before=p.evaluate('CMSReview.exportData()')
  rv(p,'descriptions');assert not p.locator('[data-draft=request]').count();rv(p,'active');expect(p.locator('[data-draft=request]')).to_have_value('아직 등록하지 않은 요청입니다.')
  assert p.evaluate('CMSReview.exportData()')==before
  rv(p,'create');p.locator('.rv-supplement>summary').click();p.locator('[data-note]').fill('전달 전 보충 설명')
  rv(p,'descriptions');rv(p,'completed');rv(p,'active');expect(p.locator('[data-note]')).to_have_value('전달 전 보충 설명')
  assert len(p.evaluate('CMSReview.exportData().items'))==1
 run('Switching tabs preserves draft text, saved requests, expanded details and unsent supplemental input',requests)

 def pen(p):
  rv(p,'open');rv(p,'mark');expect(p.locator('.rv-blocker')).to_be_visible();rv(p,'descriptions')
  assert not p.locator('.rv-blocker').count();assert not p.locator('main').evaluate('e=>e.inert')
  rv(p,'active');rv(p,'mark');expect(p.locator('.rv-blocker')).to_be_visible()
 run('Entering Description ends pen masking and returning permits drawing again',pen)

 def omr(p):
  description(p);p.locator('[data-action=omr-preview]').click();p.wait_for_timeout(1100)
  assert context(p).startswith('REV_ITM_02|REV_ITM_DETAIL_OMR|');assert not absent(p),absent(p)
  assert sorted(p.locator('.rv-description-marker').all_text_contents())==['01','02','03','04']
  p.screenshot(path=str(OUT/'omr-popup.png'))
  frame=p.frame_locator('.native-omr-preview-frame');frame.locator('.answer-choice__cell').first.click()
  frame.locator('.omr-preview__btn').click();frame.locator('.omr-preview__switch-field').click()
  assert context(p).startswith('REV_ITM_02|REV_ITM_DETAIL_OMR|')
  p.locator('#modal-root .modal-foot button').click();p.wait_for_timeout(150);assert context(p)=='REV_ITM_02'
 run('Real OMR iframe has all four Figma labels while answer, grade, toggle and close still work',omr)

 def rich_popup(p):
  description(p);p.locator('#native-html-editor button').filter(has_text='수식').first.click();p.wait_for_timeout(300)
  assert '|REV_ITM_HTML_MATH|' in context(p),context(p);assert not absent(p),absent(p)
  p.locator('.qe-popover .qe-tab--source').click();p.wait_for_timeout(120)
  assert context(p).endswith('|1'),context(p)
  p.locator('[data-description="5"]').first.click();expect(p.locator('.qe-popover')).to_be_visible()
  p.screenshot(path=str(OUT/'html-math-popup.png'))
  p.locator('.qe-popover button').filter(has_text='취소').click();p.wait_for_timeout(120);assert context(p)=='REV_ITM_05'
 run('Vendor HTML popover shows all math notes, tracks its tab and stays open while reading the panel',rich_popup,'/items/2100001/edit/html')

 def variants(p):
  description(p);p.locator('[data-action=item-sources]').click();p.wait_for_timeout(100)
  p.locator('[data-action=source-tab][data-tab=add]').click();p.wait_for_timeout(150)
  assert context(p).endswith('|1'),context(p)
  p.locator('#modal-root .modal-foot button').click();p.locator('[data-action=twin-generate]').click();p.wait_for_timeout(100)
  p.locator('[name=generate][value=AI]').check();p.wait_for_timeout(100);assert context(p).endswith('|1'),context(p)
  p.screenshot(path=str(OUT/'generation-popup.png'))
 run('Source popup tabs replace description variants while preserving the open review panel',variants)

 modal_cases=[('/items/2100001','item-deploy','REV_ITM_DEPLOY'),('/items/2100001','item-sources','REV_ITM_PRODUCT'),('/items/2100001','item-papers','REV_ITM_PAPERS'),('/items/2100001','item-twins','TWN_C03_CURRENT_ADD'),('/items/2100001','twin-generate','TWN_C03_GENERATE'),('/items/2100001','twin-history','TWN_C03_HISTORY'),('/hml/new','registration-source','HML_C02_SOURCE'),('/definition/new','registration-unit','DIFI_C02_UNIT'),('/papers/5002','paper-deploy','REV_PAP_DEPLOY'),('/lab','lab-cache','REV_LAB_CACHE')]
 for route,action,mid in modal_cases:
  def popup(p,action=action,mid=mid):
   description(p);p.locator(f'[data-action="{action}"]').first.click();p.wait_for_timeout(180)
   assert '|'+mid+'|' in context(p),context(p)
   assert p.locator('.rv-description-list>li').count()>0
   assert p.locator('.rv-description-marker').count()>0
   audit.append(dict(modal=mid,conditional=absent(p)))
   if mid=='REV_PAP_DEPLOY':p.screenshot(path=str(OUT/'paper-deploy-popup.png'))
  run('Actual popup switches to its own Figma description: '+mid,popup,route)

 def unknown(p):
  description(p);p.evaluate('CMS.modal("새로운 검증 팝업","<p>미등록 화면</p>")');p.wait_for_timeout(120)
  expect(p.locator('.rv-description-view')).to_contain_text('등록된 Figma 설명이 없습니다.');assert not p.locator('.rv-description-marker').count()
  p.evaluate('CMS.closeModal()');p.wait_for_timeout(120);assert context(p)=='REV_ITM_02'
 run('Unregistered popup shows an honest empty state and restores base notes when closed',unknown)

 def live(p):
  description(p);p.locator('[data-description=REV_ITM_STATUS_SAVE]').first.click();p.locator('.rv-scroll').evaluate('e=>e.scrollTop=530')
  p.wait_for_timeout(80);before=p.locator('.rv-scroll').evaluate('e=>e.scrollTop');request=p.evaluate('CMSReview.exportData()');service=p.evaluate('JSON.stringify(CMS.db)')
  bundle=p.evaluate('JSON.parse(JSON.stringify(CMSDescriptionData))');bundle['capturedAt']=(datetime.now(timezone.utc)+timedelta(seconds=2)).isoformat();bundle['revision']='f'*64
  note=next(n for s in bundle['screens'] if s['id']=='REV_ITM_02' for n in s['notes'] if n['key']=='REV_ITM_STATUS_SAVE');note['body']='동기화 검증용 설명입니다. 사용자 데이터는 변경하지 않습니다.'
  assert p.evaluate('v=>CMSDescriptions.receive(v)',bundle);p.wait_for_timeout(100)
  expect(p.locator('[data-description-key=REV_ITM_STATUS_SAVE] p')).to_have_text(note['body']);assert abs(p.locator('.rv-scroll').evaluate('e=>e.scrollTop')-before)<4
  assert p.evaluate('CMSReview.exportData()')==request;assert p.evaluate('JSON.stringify(CMS.db)')==service
  assert not p.evaluate('v=>CMSDescriptions.receive(v)',p.evaluate('CMSDescriptionData'))
  p.reload();p.wait_for_selector('.rv-description-view');expect(p.locator('[data-description-key=REV_ITM_STATUS_SAVE] p')).to_have_text(note['body'])
  bad=json.loads(json.dumps(bundle));bad['screens'][0]['notes'][0]['number']=0
  assert p.evaluate('v=>{try{CMSDescriptions.receive(v);return false}catch(e){return true}}',bad)
  expect(p.locator('[data-description-key=REV_ITM_STATUS_SAVE] p')).to_have_text(note['body'])
 run('Live description updates preserve scroll and all user data; newer cache survives reload; stale/malformed updates are rejected',live)

 def responsive(p):
  description(p);assert p.locator('.rv-panel').evaluate('e=>e.scrollWidth<=e.clientWidth+1')
  p.locator('.rv-description-list h4 button').first.focus();p.keyboard.press('Enter');expect(p.locator('.rv-description-selected')).to_be_visible()
  p.screenshot(path=str(OUT/'narrow-panel.png'))
 run('Narrow review panel wraps descriptions and supports keyboard focus without horizontal overflow',responsive,width=900)

 def figma_links(p):
  description(p);link=p.locator('.rv-description-heading a');assert link.get_attribute('href').endswith('node-id=8-16538');assert link.get_attribute('rel')=='noopener noreferrer'
  navigate(p,'/items');assert p.locator('.rv-description-list>li').count()==12;p.screenshot(path=str(OUT/'all-items.png'))
  navigate(p,'/guide');expect(p.locator('.rv-description-view')).to_contain_text('등록된 Figma 설명이 없습니다.')
 run('Figma links use the exact frame; original list has all 12 descriptions; unregistered guide stays empty',figma_links)
 browser.close()

report=dict(passed=sum(r['status']=='passed' for r in results),failed=sum(r['status']=='failed' for r in results),results=results,errors=errors,http=network,screenAudit=audit,
 files={n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['index.html','review.js','review.css','review-descriptions.js','description-data.js','review_file_bridge.js','omr-preview.html','description-frame.js']},sourceCapturedAt=SOURCE['capturedAt'])
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({k:report[k] for k in ['passed','failed','errors','http']}),flush=True)
raise SystemExit(bool(report['failed'] or errors or network))
