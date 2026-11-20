"""Capture every storyboard entry against its preserved development CMS reference.
This is an evidence index and geometry regression, not a pixel-equivalence claim.
Run directly without any application server.
"""
from pathlib import Path
import hashlib, html, json, time
from playwright.sync_api import sync_playwright, expect
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
OUT = ROOT / 'verification' / 'fidelity'
OUT.mkdir(parents=True, exist_ok=True)
NAMES = ['home','item-list','item-detail','item-meta','item-hml','item-html',
         'item-omr',None,'lab-index','lab-math','lab-omr','lab-restore','lab-frame',
         'hml-list','hml-form','hml-review','hml-detail','difi-list','difi-form',
         'difi-review','difi-detail','twin-list','twin-detail','paper-list',
         'paper-detail','paper-edit','source-list','source-form','source-detail','source-edit']
coverage = json.loads((ROOT/'coverage.json').read_text(encoding='utf-8-sig'))
rows, errors, network, checks = [], [], [], []
started=time.monotonic()

with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    context=browser.new_context(offline=True)
    page=context.new_page()
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.on('requestfailed',lambda request: errors.append('Asset load failed: '+request.url+' '+str(request.failure)) if request.failure!='net::ERR_ABORTED' else None)
    page.on('request',lambda r: network.append(r.url) if r.url.startswith(('http:','https:')) else None)
    for screen,name in zip(coverage['screens'],NAMES):
        original = REPO/'design-specs'/'revision-captures'/(name+'.png') if name else REPO/'cms-knowledge/master-cms/evidence/3218-own-copy239-explanation-popup-initial-state-visual.png'
        geompath=original.with_suffix('.json')
        geometry=json.loads(geompath.read_text(encoding='utf-8-sig')) if name else {}
        width=geometry.get('width',1800)
        page.set_viewport_size({'width':width,'height':1100})
        page.goto((ROOT/'index.html').as_uri()+'#'+screen['route'])
        page.reload()  # fresh route and draft instance, same example data
        page.wait_for_selector('h1')
        page.wait_for_timeout(100)
        if not name:
            page.locator('[data-action=hml-open]').first.click()
        page.screenshot(path=str(OUT/(screen['id']+'.png')),full_page=True)
        snapshot=page.evaluate('''()=>({
          title:document.querySelector('main h1')?.textContent,
          overflow:document.documentElement.scrollWidth>innerWidth,
          controls:[...document.querySelectorAll('main button,main a,main input,main select,main textarea')].filter(e=>e.getClientRects().length).map(e=>({tag:e.tagName,name:e.name||'',action:e.dataset.action||'',label:e.getAttribute('aria-label')||e.textContent.trim().slice(0,90),disabled:e.disabled||false,box:{x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}})),
          headings:[...document.querySelectorAll('main h1,main h2,main h3')].map(e=>e.textContent.trim())
        })''')
        (OUT/(screen['id']+'.json')).write_text(json.dumps(snapshot,ensure_ascii=False,indent=2),encoding='utf-8')
        assert not snapshot['overflow'],(screen['id'],'document horizontal overflow')
        assert snapshot['title'],screen['id']
        rows.append({**screen,'reference':str(original.relative_to(REPO)).replace('\\','/'),'viewport':width,'snapshot':snapshot,'capture':'verification/fidelity/'+screen['id']+'.png'})
        print('CAPTURE',screen['id'],width,len(snapshot['controls']),flush=True)
    # The previously missed failure: toggle is outside the panel it hides.
    page.set_viewport_size({'width':1800,'height':1100})
    page.goto((ROOT/'index.html').as_uri()+'#/items');page.reload()
    expect(page.locator('.tree-panel')).to_be_visible()
    for _ in range(3):
        page.get_by_role('button',name='단원 트리 접기',exact=True).click()
        expect(page.locator('.tree-panel')).to_be_hidden()
        page.get_by_role('button',name='단원 트리 펼치기',exact=True).click()
        expect(page.locator('.tree-panel')).to_be_visible()
    checks.append('Unit tree collapse/reopen repeated 3 times')
    assert page.locator('thead th').count()==10
    checks.append('All-items table has the 10 source columns')
    positions=page.locator('.search-line>select,.search-line>input').evaluate_all('(els)=>els.map(e=>e.getBoundingClientRect().y)')
    assert max(positions)-min(positions)<1
    checks.append('All seven item-search controls share one row at source width')
    expect(page.locator('.date-range summary')).to_be_visible()
    page.locator('.date-range summary').click()
    page.get_by_label('등록 시작일',exact=True).fill('2026-11-01')
    page.get_by_label('등록 종료일',exact=True).fill('2026-11-03')
    page.get_by_role('button',name='선택 완료',exact=True).click()
    expect(page.locator('[data-date-summary]')).to_have_text('2026-11-01 ~ 2026-11-03')
    page.get_by_role('button',name='조회',exact=True).click()
    expected=page.evaluate("CMS.db.items.filter(i=>i.created>='2026-11-01'&&i.created<='2026-11-03').length")
    expect(page.locator('.result-summary')).to_contain_text(str(expected)+'건')
    checks.append('Date-range popover selection, close, filter and result count')
    page.get_by_role('button',name='초기화',exact=True).click()
    page.get_by_role('button',name='조회',exact=True).click()
    page.locator('[data-check-all=status]').uncheck()
    page.locator('[data-filter-check=status][value=Y]').check()
    page.get_by_role('button',name='조회',exact=True).click()
    expect(page.locator('tbody')).not_to_contain_text('승인(미사용)')
    checks.append('Status checkboxes: all/individual selection and actual filtering')
    page.get_by_role('button',name='단원 트리 접기',exact=True).click()
    expect(page.locator('[data-filter-check=status][value=Y]')).to_be_checked()
    page.get_by_role('button',name='단원 트리 펼치기',exact=True).click()
    page.locator('[data-tree-filter=school]').select_option('중학교')
    page.locator('[data-tree-filter=subjectGroup]').select_option('수학')
    expect(page.locator('.tree details')).not_to_have_count(0)
    page.locator('.tree .leaf').first.click()
    expect(page.locator('.tree .leaf.active')).to_have_count(1)
    checks.append('Tree taxonomy, branch expansion, leaf filtering and selected state')
    # Actual full-size geometry, source has x=272,y=149,width=365 for tree.
    page.goto((ROOT/'index.html').as_uri()+'#/items');page.reload();page.wait_for_selector('h1')
    box=page.locator('.tree-panel').bounding_box()
    assert abs(box['x']-272)<=1 and abs(box['y']-149.14)<=4,box
    assert abs(page.locator('.sidebar').bounding_box()['width']-256)<=1
    checks.append('Source shell/tree origin and sidebar width measured against stored DOM')
    # Toggling a panel must preserve draft filter values WITHOUT running the search.
    before=page.locator('.result-summary').inner_text()
    page.locator('[name=q]').fill('UNSUBMITTED_SEARCH')
    page.get_by_role('button',name='단원 트리 접기',exact=True).click()
    page.get_by_role('button',name='단원 트리 펼치기',exact=True).click()
    expect(page.locator('[name=q]')).to_have_value('UNSUBMITTED_SEARCH')
    assert page.locator('.result-summary').inner_text()==before
    checks.append('Tree toggle preserves unsubmitted filters and does not silently query')
    page.locator('#menu-toggle').click()
    assert page.locator('main').bounding_box()['x']<10
    page.locator('#menu-toggle').click()
    assert page.locator('.sidebar').is_visible()
    page.locator('[data-action=toggle-group]').click()
    expect(page.locator('#item-nav')).to_be_hidden()
    page.locator('[data-action=toggle-group]').click()
    expect(page.locator('#item-nav')).to_be_visible()
    checks.append('Global sidebar and item-menu close/reopen')
    page.goto((ROOT/'index.html').as_uri()+'#/items/2100001')
    expect(page.locator('.hml-source-preview .hml-preview-image')).to_have_count(2)
    expect(page.locator('.detail-html-panel [data-action=omr-preview]')).to_be_visible()
    expect(page.locator('.master-panel .detail-html-panel')).to_be_visible()
    expect(page.locator('.master-panel .detail-hml-panel')).to_be_visible()
    expect(page.locator('[data-status-bind=status]')).to_have_count(5)
    assert page.locator('[data-status-bind=status]').first.get_attribute('type')=='radio'
    checks.append('Detail MASTER contains sibling HTML/HML cards, simultaneous problem/solution, inline OMR and five status radios')
    page.goto((ROOT/'index.html').as_uri()+'#/items/2100001/edit/html')
    editors=page.locator('#native-html-editor [contenteditable=true]')
    expect(editors).to_have_count(5)
    values=['수정한 문제','수정한 정답','수정한 풀이','수정한 모범 답안','수정한 채점 기준']
    for n,value in enumerate(values):editors.nth(n).fill(value)
    page.locator('[data-action=item-temp]').first.click()
    page.locator('.modal-foot').get_by_role('button',name='임시 저장',exact=True).click()
    draft=page.evaluate('CMS.item(2100001).draft')
    for key,value in zip(['html','answerHtml','explanationHtml','modelAnswerHtml','scoringCriteriaHtml'],values):assert value in draft[key],(key,draft)
    checks.append('Native editor five content blocks persist independently through CMS temporary save')
    page.goto((ROOT/'index.html').as_uri()+'#/items/2100002/edit/omr');page.reload();page.wait_for_selector('.omr-obsacn-row')
    page.locator('.omr-obsacn-add').click()
    expect(page.locator('.omr-obsacn-row')).to_have_count(6)
    page.locator('.omr-obsacn-row .vt-input input').nth(5).fill('새 선택지')
    page.locator('.omr-obsacn-del').nth(1).click()
    expect(page.locator('.omr-obsacn-row')).to_have_count(5)
    expect(page.locator('.omr-obsacn-row .vt-input input').nth(4)).to_have_value('새 선택지')
    page.locator('[data-action=item-temp]').first.click()
    page.locator('.modal-foot').get_by_role('button',name='임시 저장',exact=True).click()
    assert page.evaluate('CMS.item(2100002).draft.omr.labels[4]')=='새 선택지'
    checks.append('Native OMR add/edit/remove and draft persistence')
    page.goto((ROOT/'index.html').as_uri()+'#/lab/omr');page.reload()
    page.locator('[data-action=gallery-open][data-group=OB]').click()
    expect(page.locator('[data-gallery-type^=OB][open]')).to_have_count(4)
    page.locator('[data-action=gallery-open][data-group=SB]').click()
    page.locator('[data-action=gallery-close][data-group=OB]').click()
    expect(page.locator('[data-gallery-type^=OB][open]')).to_have_count(0)
    expect(page.locator('[data-gallery-type^=SB][open]')).to_have_count(7)
    checks.append('Gallery group close leaves other groups open')
    # Revisit every route at reduced sizes: localized scrolling in wide tables is allowed.
    for width in [1280,760,390]:
        page.set_viewport_size({'width':width,'height':1000})
        for screen in coverage['screens']:
            page.goto((ROOT/'index.html').as_uri()+'#'+screen['route']);page.reload();page.wait_for_selector('h1');page.wait_for_timeout(50)
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(screen['id'],width)
        checks.append(f'All 30 entries have no document horizontal overflow at {width}px')
    context.close();browser.close()

assert not errors,errors
assert not network,network
report={'date':'2026-11-17','screenCount':len(rows),'checks':checks,'pageErrors':errors,'httpRequests':network,'seconds':round(time.monotonic()-started,2),'screens':[{k:v for k,v in r.items() if k!='snapshot'} for r in rows], 'build':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in sorted(str(p.relative_to(ROOT)).replace('\\','/') for p in ROOT.rglob('*') if p.is_file() and p.suffix in ['.js','.css'] or p==ROOT/'index.html')}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
options=''.join(f'<option value="{i}">{r["id"]} · {html.escape(r["title"])}</option>' for i,r in enumerate(rows))
payload=json.dumps([{k:v for k,v in r.items() if k!='snapshot'} for r in rows],ensure_ascii=False)
review='''<!doctype html><html lang="ko"><meta charset="utf-8"><title>개발계 CMS · 목업 전체 페이지 대조</title><style>body{margin:0;font:14px "Malgun Gothic",sans-serif;background:#f5f6f8;color:#26313b}header{position:sticky;top:0;background:white;padding:16px;border-bottom:1px solid #bbb}select{padding:8px;min-width:440px}p{margin:8px 0 0;font-size:12px}main{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px}section{background:white;min-width:0}h2{font-size:14px;padding:12px;margin:0}img{width:100%;display:block}a{color:#066fd1}#route{margin-left:16px}</style><header><b>전체 30개 진입점의 원본·수정 목업 대조</b><br><select id="pick">OPTIONS</select><a id="route" target="_blank">목업 열기</a><p>왼쪽은 보존된 개발계 캡처, 오른쪽은 같은 창 너비의 로컬 목업입니다. 예시 데이터·원본 미확보 외부 엔진은 차이가 있습니다. 이미지 클릭 시 원래 크기로 열립니다. 이 비교 자료 자체가 모든 픽셀과 동작의 일치를 보증하지는 않습니다.</p></header><main><section><h2>개발계 CMS 원본 <a id="origlink" target="_blank">원본 크기</a></h2><img id="orig"></section><section><h2>수정 목업 <a id="newlink" target="_blank">원본 크기</a></h2><img id="new"></section></main><script>const rows=PAYLOAD;function show(){let r=rows[+pick.value];orig.src='../'+r.reference;origlink.href=orig.src;document.getElementById('new').src=r.capture;newlink.href=r.capture;route.href='index.html#'+r.route}pick.onchange=show;show()</script></html>'''.replace('OPTIONS',options).replace('PAYLOAD',payload)
(ROOT/'화면_대조.html').write_text(review,encoding='utf-8')
# Paired thumbnail sheets make omissions visible across the entire screen set.
for start in range(0,len(rows),10):
    sheet=Image.new('RGB',(1600,5*360),'#e5e7eb');draw=ImageDraw.Draw(sheet)
    for j,r in enumerate(rows[start:start+10]):
        x=(j%2)*800;y=(j//2)*360
        draw.text((x+5,y+5),r['id'],fill='black')
        for offset,path in [(0,REPO/r['reference']),(400,ROOT/r['capture'])]:
            im=Image.open(path);im.thumbnail((390,330));sheet.paste(im,(x+offset,y+25))
    sheet.save(OUT/f'comparison-{start//10+1}.png')
print('PASS',len(rows),'entries;',len(checks),'geometry/interaction groups; 0 runtime errors; 0 HTTP requests',flush=True)
