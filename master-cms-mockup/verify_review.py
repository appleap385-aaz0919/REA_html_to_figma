"""Actual file:// review workflow in isolated offline Chrome.
python -X utf8 -u master-cms-mockup/verify_review.py
"""
from pathlib import Path
import json, time, traceback, hashlib, subprocess, sys
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent
OUT = ROOT/'verification'/'review'
OUT.mkdir(parents=True, exist_ok=True)
results, errors, requests = [], [], []

with sync_playwright() as pw:
    browser = pw.chromium.launch(channel='chrome', headless=True)

    def record(name, fn, width=1800):
        context = browser.new_context(viewport={'width': width, 'height': 1000}, offline=True, accept_downloads=True)
        page = context.new_page()
        local_errors = []
        page.on('pageerror', lambda e: local_errors.append(str(e)))
        page.on('request', lambda r: requests.append(r.url) if r.url.startswith(('http:', 'https:')) else None)
        page.on('requestfailed', lambda r: local_errors.append(r.url+' '+str(r.failure)) if r.failure != 'net::ERR_ABORTED' else None)
        page.on('dialog', lambda d: d.accept())
        start = time.monotonic()
        try:
            page.goto((ROOT/'index.html').as_uri()+'#/definition/7001')
            page.wait_for_selector('h1')
            fn(page, context)
            assert not local_errors, local_errors
            results.append({'name': name, 'status': 'passed', 'seconds': round(time.monotonic()-start, 2)})
            print('PASS', name, flush=True)
        except Exception as e:
            results.append({'name': name, 'status': 'failed', 'error': str(e), 'trace': traceback.format_exc()})
            page.screenshot(animations='disabled',path=str(OUT/f'failure-{len(results)}.png'))
            print('FAIL', name, str(e)[:700], flush=True)
        errors.extend(local_errors)
        context.close()

    def click(page, action):
        page.locator(f'[data-rv="{action}"]').first.click()

    def open_ui(page):
        click(page, 'open')

    def draw(page, locator):
        click(page, 'mark')
        r = locator.bounding_box()
        x, y = r['x'], r['y']
        page.mouse.move(x-3, y-3)
        page.mouse.down()
        page.mouse.move(x+r['width']+3, y+r['height']+3, steps=6)
        page.mouse.up()
        page.wait_for_selector('[data-draft=request]', timeout=30000)

    def create(page, text='등록성공 선택을 문항 ID 바로 오른쪽으로 옮겨 주세요.'):
        if not page.locator('.rv-panel').count():
            open_ui(page)
        draw(page, page.locator('[data-judgment]').first)
        page.locator('[data-draft=request]').fill(text)
        click(page, 'create')
        return page.evaluate('CMSReview.exportData().items[0]')

    def data(page):
        return page.evaluate('CMSReview.exportData()')

    def result(page):
        page.locator('.rv-result > summary').click()
        page.locator('[data-result]').fill('UI를 수정했습니다. (검수 도구 테스트용 결과 기록)')
        page.locator('[data-result-proof]').fill('테스트 예시 근거: review.js; 동작 검수용 가상 결과')
        click(page, 'result')
        assert data(page)['items'][0]['status'] == 'ready'

    def clean_and_anchor(page, _):
        before = page.locator('main').bounding_box()
        item = create(page)
        assert 'data-judgment' in item['anchor']['selector'], item['anchor']
        assert item['before']['image'].startswith('data:image/jpeg;')
        assert item['context']['route'] == '/definition/7001'
        expect(page.locator('.rv-mark')).to_have_count(1)
        page.screenshot(animations='disabled',path=str(OUT/'desktop.png'))
        click(page, 'completed')
        expect(page.locator('.rv-card')).to_have_count(0)
        page.locator('.rv-mark button').click()
        expect(page.locator('.rv-card')).to_have_count(1)
        target, mark = page.locator('[data-judgment]').first.bounding_box(), page.locator('.rv-mark').bounding_box()
        assert abs(mark['x']-(target['x']-3)) < 2
        page.evaluate('scrollBy(0,160)')
        page.wait_for_timeout(150)
        target, mark = page.locator('[data-judgment]').first.bounding_box(), page.locator('.rv-mark').bounding_box()
        assert abs(mark['y']-(target['y']-3)) < 2
        click(page, 'close')
        assert page.locator('main').bounding_box()['width'] == before['width']
        assert not page.locator('main').evaluate('(e)=>e.inert')
    record('Element-linked rectangle, scrolling and unchanged closed layout', clean_and_anchor)

    def masking(page, _):
        open_ui(page)
        select = page.locator('[data-judgment]').first
        old = select.input_value()
        click(page, 'mark')
        assert page.locator('main').evaluate('(e)=>e.inert')
        page.keyboard.press('Tab')
        assert page.evaluate('!document.querySelector("main").contains(document.activeElement)')
        page.keyboard.press('Escape')
        assert not page.locator('.rv-blocker').count()
        assert not page.locator('main').evaluate('(e)=>e.inert')
        select.select_option('F')
        assert select.input_value() == 'F' and old != 'F'
        click(page, 'mark')
        page.mouse.move(400, 400); page.mouse.down(); page.mouse.move(403, 403); page.mouse.up()
        assert not page.locator('[data-draft=request]').count()
        expect(page.locator('.rv-status')).to_contain_text('8px')
    record('CMS input lock, Escape unlock, small drag rejection', masking)

    def draft_and_comment(page, _):
        open_ui(page); draw(page, page.locator('[data-judgment]').first)
        page.locator('[data-draft=request]').fill('저장 전 초안')
        page.reload(); page.wait_for_selector('h1'); open_ui(page)
        expect(page.locator('[data-draft=request]')).to_have_value('저장 전 초안')
        click(page, 'create')
        page.locator('[data-note]').fill('아직 등록하지 않은 의견')
        click(page, 'hide'); click(page, 'hide')
        expect(page.locator('[data-note]')).to_have_value('아직 등록하지 않은 의견')
        page.locator('[data-note]').press('Shift+Enter')
        assert len(data(page)['items'][0]['messages']) == 1
        page.locator('[data-note]').fill('Enter로 등록')
        page.locator('[data-note]').press('Enter')
        assert data(page)['items'][0]['messages'][-1]['text'] == 'Enter로 등록'
        assert data(page)['items'][0]['messages'][-1]['kind'] == 'comment'
    record('Draft reload, composer retention, Enter and Shift+Enter', draft_and_comment)

    def lifecycle(page, _):
        create(page); click(page, 'start')
        assert data(page)['items'][0]['status'] == 'working'
        result(page); click(page, 'approve')
        assert data(page)['items'][0]['status'] == 'ready'
        expect(page.locator('.rv-status')).to_contain_text('캡처')
        click(page, 'capture-after')
        page.wait_for_function('CMSReview.exportData().items[0].after?.image.length>0')
        page.locator('.rv-evidence > summary').click()
        page.screenshot(animations='disabled',path=str(OUT/'comparison.png'))
        click(page, 'approve')
        assert data(page)['items'][0]['status'] == 'done'
        expect(page.locator('.rv-mark')).to_have_count(0)
        page.locator('[data-filter]').select_option('done')
        expect(page.locator('.rv-card')).to_have_count(1)
        page.locator('[data-sync=figma]').select_option('done')
        page.locator('[data-kind=figma][data-rv=sync]').click()
        assert data(page)['items'][0]['sync']['figma']['status'] == 'pending'
        page.locator('[data-sync-proof=figma]').fill('검수 테스트용 근거 · 실제 Figma 변경 없음')
        page.locator('[data-kind=figma][data-rv=sync]').click()
        assert data(page)['items'][0]['sync']['figma']['status'] == 'done'
        page.screenshot(animations='disabled',path=str(OUT/'completed.png'))
        click(page, 'reopen')
        i = data(page)['items'][0]
        assert i['status'] == 'new' and i['sync']['figma']['status'] == 'pending'
        assert i['captures'] and i['messages'][-1]['kind'] == 'system'
    record('Result versus approval, before-after, independent sync and reopening', lifecycle)

    def rework_and_region(page, _):
        create(page); result(page); click(page, 'capture-after')
        page.wait_for_function('CMSReview.exportData().items[0].after?.image.length>0')
        click(page, 'rework')
        assert data(page)['items'][0]['status'] == 'ready'
        page.locator('[data-note]').fill('위치가 아직 다릅니다. 다시 확인해 주세요.')
        click(page, 'rework')
        i = data(page)['items'][0]
        assert i['status'] == 'working' and i['after'] is None and i['captures']
        click(page, 'detach')
        assert data(page)['items'][0]['anchor'] is None
        click(page, 'reanchor')
        r = page.locator('main h1').bounding_box()
        page.mouse.move(r['x'], r['y']); page.mouse.down(); page.mouse.move(r['x']+100, r['y']+25); page.mouse.up()
        assert data(page)['items'][0]['anchor']
        assert len(data(page)['items']) == 1
        click(page, 'cancel')
        assert data(page)['items'][0]['status'] == 'cancelled'
    record('Rework reason, historical captures, detach versus cancel, reanchor', rework_and_region)

    def popup(page, _):
        page.evaluate('CMS.go("/items/2100001",true)')
        page.evaluate('CMS.modal("검수 팝업 예시","<button id=review-popup-target>팝업 대상</button>")')
        open_ui(page); draw(page, page.locator('#review-popup-target'))
        page.locator('[data-draft=request]').fill('팝업 내부 버튼 검토'); click(page, 'create')
        assert data(page)['items'][0]['context']['modals'] == ['검수 팝업 예시']
        expect(page.locator('.rv-mark')).to_have_count(1)
        page.locator('[data-note]').fill('검수 패널 입력 중 Escape가 CMS 팝업을 닫으면 안 됩니다.')
        page.locator('[data-note]').press('Escape')
        expect(page.locator('.modal-overlay')).to_have_count(1)
        page.screenshot(animations='disabled',path=str(OUT/'popup.png'))
        page.evaluate('CMS.closeModal()'); page.wait_for_timeout(100)
        expect(page.locator('.rv-mark')).to_have_count(0)
    record('Popup-specific anchor and panel keyboard isolation', popup)

    def native_popup(page, _):
        page.evaluate('CMS.go("/lab/omr",true)')
        page.locator('[data-gallery-type]').nth(0).locator('summary').click()
        page.locator('[data-action=gallery-preview]').first.click()
        page.frame_locator('.native-omr-preview-frame').locator('.omr-table').wait_for()
        open_ui(page); draw(page, page.locator('.modal-head h2').last)
        page.locator('[data-draft=request]').fill('원본 OMR 팝업의 제목 영역 검수'); click(page,'create')
        assert 'gallery-preview' in data(page)['items'][0]['context']['origin']
        expect(page.locator('.rv-mark')).to_have_count(1)
        page.screenshot(animations='disabled',path=str(OUT/'native-popup.png'))
        click(page,'close');page.locator('.modal-close').last.click()
        page.locator('[data-gallery-type]').nth(1).locator('summary').click()
        page.locator('[data-action=gallery-preview]').nth(1).click()
        page.frame_locator('.native-omr-preview-frame').locator('.omr-table').wait_for()
        open_ui(page)
        expect(page.locator('.rv-mark')).to_have_count(0)
        click(page,'mark')
        assert page.locator('#modal-root').evaluate('(e)=>e.inert')
        page.keyboard.press('Escape')
        assert not page.locator('#modal-root').evaluate('(e)=>e.inert')
    record('Real native OMR iframe, type-specific popup origin and frame input lock', native_popup)

    def attachments(page, _):
        create(page)
        page.locator('[data-attach][data-slot=before]').set_input_files(OUT/'desktop.png')
        page.wait_for_function('CMSReview.exportData().items[0].before?.note.includes("사용자")')
        page.locator('[data-attach][data-slot=after]').set_input_files(OUT/'desktop.png')
        page.wait_for_function('CMSReview.exportData().items[0].after?.note.includes("사용자")')
        expect(page.locator('.rv-evidence-grid img')).to_have_count(2)
        item = data(page)['items'][0]
        assert item['before']['image'].startswith('data:image/jpeg;') and item['after']['image']
        page.locator('[data-attach][data-slot=after]').set_input_files({'name':'unsafe.svg','mimeType':'image/svg+xml','buffer':b'<svg xmlns="http://www.w3.org/2000/svg"/>'})
        assert data(page)['items'][0]['after'] == item['after']
        expect(page.locator('.rv-status')).to_contain_text('PNG')
        result(page)
        page.locator('[data-attach][data-slot=after]').set_input_files(OUT/'desktop.png')
        page.wait_for_function('CMSReview.exportData().items[0].after?.image.length>0')
        click(page,'approve');page.locator('[data-filter]').select_option('done')
        expect(page.locator('[data-attach][data-slot=before]')).to_be_disabled()
    record('Actual before-after image attachment, format rejection and completed evidence lock', attachments)

    def anchor_removed(page, _):
        create(page)
        page.locator('[data-judgment]').first.evaluate('(e)=>e.remove()')
        page.wait_for_timeout(100)
        expect(page.locator('.rv-mark')).to_have_count(0)
        click(page, 'locate')
        expect(page.locator('.rv-status')).to_contain_text('찾지 못했습니다')
    record('Removed target never silently attaches to another element', anchor_removed)

    def import_export(page, _):
        create(page, '<script>window.REVIEW_XSS=1</script> 레이아웃 의견')
        page.locator('[data-note]').fill('이관해야 할 미등록 의견')
        assert page.evaluate('window.REVIEW_XSS') is None
        with page.expect_download() as download:
            click(page, 'export')
        archive = OUT/'archive.json'; download.value.save_as(archive)
        saved = json.loads(archive.read_text(encoding='utf-8'))
        destination = browser.new_context(offline=True)
        migrated = destination.new_page()
        migrated.goto((ROOT/'index.html').as_uri());migrated.wait_for_selector('h1')
        migrated.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"archive.json"))',saved)
        open_ui(migrated);migrated.locator('[data-filter]').select_option('active')
        migrated.locator('.rv-card > summary').click()
        expect(migrated.locator('[data-note]')).to_have_value('이관해야 할 미등록 의견')
        destination.close()
        click(page, 'packet')
        # Reimport identical archive is idempotent.
        page.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"archive.json",{type:"application/json"}))', saved)
        assert len(data(page)['items']) == 1
        bad = dict(saved); bad['schema'] = 'wrong'
        page.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"bad.json"))', bad)
        assert len(data(page)['items']) == 1
        expect(page.locator('.rv-status')).to_contain_text('가져오기 실패')
        saved['items'][0]['request'] = '충돌하는 자료'
        page.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"conflict.json"))', saved)
        assert data(page)['items'][0]['request'].startswith('<script>')
    record('JSON export/import, idempotence, conflict rejection and escaped text', import_export)

    def bridge(page, _):
        create(page)
        with page.expect_download() as download:
            click(page, 'packet')
        packet = OUT/'work.json'; download.value.save_as(packet)
        output = OUT/'worker-result.json'
        if output.exists(): output.unlink()
        cmd = [sys.executable, '-X', 'utf8', str(ROOT/'review_cli.py'), 'result', str(packet), '--number', '1', '--summary', '검수 도구 테스트: 가상 작업 결과', '--evidence', 'QA fixture only; no business UI mutation', '--out', str(output)]
        run = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        assert run.returncode == 0, run.stderr
        v = json.loads(output.read_text(encoding='utf-8'))
        page.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"result.json"))', v)
        assert data(page)['items'][0]['status'] == 'ready'
        count = len(data(page)['items'][0]['messages'])
        page.evaluate('async x=>CMSReview.importFile(new File([JSON.stringify(x)],"result.json"))', v)
        assert len(data(page)['items'][0]['messages']) == count
        expect(page.locator('.rv-status')).to_contain_text('가져오기 실패')
        (OUT/'bridge-command.json').write_text(json.dumps({'command':cmd,'exitCode':run.returncode,'stdout':run.stdout},ensure_ascii=False,indent=2),encoding='utf-8')
    record('Real exported work packet to CLI result import; stale result rejection', bridge)

    def tabs(page, context):
        create(page)
        other = context.new_page()
        other.goto((ROOT/'index.html').as_uri()+'#/definition/7001'); other.wait_for_selector('h1'); open_ui(other)
        other.locator('.rv-card > summary').click()
        other.locator('[data-note]').fill('두 번째 탭 변경')
        other.locator('[data-note]').press('Enter')
        page.wait_for_selector('[data-rv=reload]')
        expect(page.locator('[data-rv=page-request]')).to_be_disabled()
        click(page, 'reload')
        assert data(page)['items'][0]['messages'][-1]['text'] == '두 번째 탭 변경'
        other.close()
    record('Concurrent tab writes are blocked with export/reload recovery', tabs)

    def no_storage(page, _):
        page.evaluate('()=>{Storage.prototype.setItem=function(){throw new DOMException("Quota exceeded","QuotaExceededError")}}')
        open_ui(page); click(page, 'page-request')
        page.wait_for_selector('[data-draft=request]')
        page.locator('[data-draft=request]').fill('용량 부족 상황에서도 내용을 보존합니다.')
        click(page, 'create')
        assert len(data(page)['items']) == 1
        expect(page.locator('.rv-status')).to_contain_text('JSON')
        with page.expect_download() as d:
            click(page, 'export')
        assert d.value.suggested_filename.endswith('.json')
    record('Quota failure preserves in-memory work and offers JSON export', no_storage)

    def all_pages(page, _):
        for route in page.evaluate('Object.values(CMS.routes)'):
            page.evaluate('(r)=>CMS.go(r,true)', route)
            expect(page.locator('main h1')).to_have_count(1)
        assert not page.locator('main').evaluate('(e)=>e.inert')
    record('All 30 existing routes with tool closed remain available', all_pages)

    def mobile(page, _):
        page.evaluate('CMS.go("/home",true)'); open_ui(page); click(page,'mark')
        blocker = page.locator('.rv-blocker').bounding_box()
        assert blocker['width'] == 390
        page.mouse.move(25,200);page.mouse.down();page.mouse.move(240,260,steps=5);page.mouse.up()
        page.wait_for_selector('[data-draft=request]')
        page.locator('[data-draft=request]').fill('작은 화면 검수'); click(page, 'create')
        assert page.locator('.rv-panel').bounding_box()['width'] <= 390
        page.screenshot(animations='disabled',path=str(OUT/'mobile.png'))
        click(page, 'close')
        assert not page.locator('main').evaluate('(e)=>e.inert')
    record('390px panel, full-width marking tray and restored CMS interaction', mobile, 390)

    browser.close()

report = {'date':'2026-11-19','entry':'file://index.html','results':results,'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'runtimeOrAssetErrors':errors,'externalRequests':requests,'files':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['index.html','review.js','review.css','review_cli.py']}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'errors':len(errors),'http':len(requests)}),flush=True)
raise SystemExit(1 if report['failed'] or errors or requests else 0)
