"""Regression of preserved CMS leaves through the offline UI, including storage.
No production requests, DOM mutations through evaluate, or hidden test controls.
"""
from pathlib import Path
import json, hashlib, time, traceback
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification'/'native-editors'
OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[];http=[]

with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    ctx=browser.new_context(offline=True,viewport={'width':1800,'height':1100})
    page=ctx.new_page()
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('requestfailed',lambda request: errors.append('Asset load failed: '+request.url+' '+str(request.failure)) if request.failure!='net::ERR_ABORTED' else None)
    page.on('request',lambda r:http.append(r.url) if r.url.startswith(('http:','https:')) else None)
    def visit(route):
        page.goto((ROOT/'index.html').as_uri()+'#'+route)
        page.reload();page.wait_for_selector('h1');page.wait_for_timeout(100)
    def run(name,fn):
        try:
            fn();results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
        except Exception as e:
            results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()})
            page.screenshot(path=str(OUT/f'failure-{len(results)}.png'),full_page=True)
            print('FAIL',name,str(e)[:300],flush=True)
    def data(context):return page.evaluate('(c)=>CMS.omrContexts[c].sourceData',context)
    visit('/lab/omr')
    types=page.evaluate('Object.keys(CMS.OMR.types)')
    for code in types:
        def test(code=code):
            visit('/lab/omr')
            page.locator('[data-action=gallery-open][data-group=all]').click()
            section=page.locator('[data-gallery-type="'+code+'"]')
            root=section.locator('[data-omr-code]')
            context='gallery-'+code
            assert page.evaluate('(c)=>CMS.OMR.validate(CMS.omrContexts[c])',context) is None
            original=data(context)
            section.locator('.omr-preview-btn').click()
            preview=page.frame_locator('.native-omr-preview-frame')
            expect(preview.locator('.omr-table')).to_be_visible()
            expect(preview.get_by_role('switch')).to_have_attribute('aria-checked','false')
            page.locator('.modal-foot').get_by_role('button',name='닫기',exact=True).click()
            # Each unique native add action is followed by its corresponding delete.
            classes=root.locator('button').evaluate_all('(xs)=>[...new Set(xs.flatMap(x=>[...x.classList].filter(c=>/^omr-.*-add$/.test(c)&&x.getClientRects().length)))]')
            actions=[]
            for cls in classes:
                before=root.locator('input,math-field,textarea,select,.vtd-cell').count()
                root.locator('.'+cls).first.click()
                page.wait_for_timeout(35)
                after=root.locator('input,math-field,textarea,select,.vtd-cell').count()
                assert after>before,(code,cls,before,after)
                delete=cls[:-4]+'-del'
                targets=root.locator('.'+delete+':enabled')
                if targets.count():
                    targets.last.click();page.wait_for_timeout(35)
                    assert root.locator('input,math-field,textarea,select,.vtd-cell').count()==before,(code,cls)
                else:raise AssertionError('No enabled native deletion for '+cls)
                # Canonical store must match DOM after deletion, including detached buttons.
                current=root.evaluate('(r)=>omrSerializers[r.dataset.omrCode].serialize(r)')
                assert current==data(context),(code,cls,'stale store after deletion')
                actions.append(cls)
            # Full source JSON hydrate is exercised through the visible restore page.
            current=data(context)
            visit('/lab/restore')
            page.locator('[data-restore-type]').select_option(code)
            page.locator('#restore-json').fill(json.dumps(current['omr'],ensure_ascii=False))
            page.locator('#restore-answer').fill(json.dumps(current['answer'],ensure_ascii=False))
            page.locator('[data-action=restore-json]').click();page.wait_for_timeout(60)
            assert not page.locator('[data-restore-error]').inner_text()
            assert data('restore')==current,(code,'restore roundtrip')
            before=data('restore')
            page.locator('#restore-json').fill('{}');page.locator('[data-action=restore-json]').click()
            expect(page.locator('[data-restore-error]')).to_contain_text('이전 정상 화면')
            assert data('restore')==before
            results.append({'type':code,'nativeAddDeleteActions':actions,'roundtrip':True,'invalidPreserves':True})
        run('Native '+code+' add/delete, store sync and JSON restore',test)

    def limits():
        visit('/lab/omr');page.locator('[data-action=gallery-open][data-group=all]').click()
        for code in ['OBSACN','OBMACN']:
            root=page.locator('[data-gallery-type="'+code+'"] [data-omr-code]')
            stem='.omr-'+code.lower()
            while root.locator(stem+'-add:enabled').count():root.locator(stem+'-add').click()
            assert root.locator(stem+'-row').count()==7
            while root.locator(stem+'-del:enabled').count():root.locator(stem+'-del:enabled').last.click()
            assert root.locator(stem+'-row').count()==2
        page.locator('[data-gallery-locked]').check()
        page.locator('[data-action=gallery-open][data-group=all]').click()
        main=page.locator('[data-source-context=gallery-OBSACN]')
        locked=page.locator('[data-source-context=gallery-OBSACN-locked]')
        assert locked.locator('input:not(:disabled),button:not(:disabled),math-field:not(:disabled)').count()==0
        main.locator('input[type=radio]').last.check()
        assert main.locator('input[type=radio]:checked').count()==1
        assert main.locator('input[type=radio]').first.get_attribute('name')!=locked.locator('input[type=radio]').first.get_attribute('name')
    run('Choice min/max and locked comparison radio isolation',limits)

    def persistence():
        visit('/items/2100001/edit/omr')
        assert page.evaluate('CMS.edit.dirty') is False
        rows=page.locator('.omr-obsacn-row')
        rows.nth(2).locator('.vt-input input').fill('보존할 선택지')
        rows.nth(2).locator('input[type=radio]').check()
        rows.nth(0).locator('.omr-obsacn-del').click()
        page.locator('[data-action=item-temp]').first.click()
        page.locator('.modal-foot').get_by_role('button',name='임시 저장',exact=True).click()
        saved=page.evaluate('CMS.item(2100001).draft.omr.sourceData')
        assert saved['omr'][0]['options'][1]['value']=='보존할 선택지'
        visit('/items/2100001')
        page.locator('[data-action=item-edit]').click()
        page.locator('.modal-foot').get_by_role('button',name='임시저장 수정하기',exact=True).click()
        page.locator('[data-action=editor-tab][data-tab=omr]').click()
        expect(page.locator('.omr-obsacn-row .vt-input input').nth(1)).to_have_value('보존할 선택지')
        assert page.evaluate('CMS.edit.data.omr.sourceData')==saved
    run('OMR edit/delete/temp save/reload preserves exact native JSON',persistence)
    def value_demo():
        visit('/lab/omr')
        root=page.locator('#source-value-demos')
        first=root.locator('#vtInputCard .vt-cell').first
        first.locator('[data-bs-toggle=dropdown]').click()
        assert first.locator('[data-type=image]').is_disabled()
        first.locator('[data-type=math]').click()
        expect(first.locator('math-field')).to_be_visible()
        root.locator('#vtdRowAdd').click()
        expect(root.locator('.vtd-src-row')).to_have_count(3)
        root.locator('.vtd-src-row .vt-input input').first.fill('참조 값')
        dd=root.locator('.vtd-cell').first
        dd.locator('button').first.click()
        dd.locator('.dropdown-menu').get_by_role('button',name='참조 값',exact=True).click()
        expect(dd).to_contain_text('참조 값')
        root.locator('.vtd-src-row .vt-input input').first.fill('수정한 참조 값')
        expect(dd).to_contain_text('수정한 참조 값')
        root.locator('.vtd-src-row .vtd-src-del').first.click()
        expect(dd).not_to_contain_text('수정한 참조 값')
    run('Preserved value-type switching, disallowed image, dropdown source mirror and deletion',value_demo)
    browser.close()

report={'date':'2026-11-17','passed':sum(x.get('status')=='passed' for x in results),'failed':sum(x.get('status')=='failed' for x in results),'results':results,'runtimeErrors':errors,'httpRequests':http,'build':{str(p.relative_to(ROOT)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in ROOT.rglob('*') if p.is_file() and (p.suffix in ['.js','.css'] or p==ROOT/'index.html')}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('RESULT',report['passed'],report['failed'],'errors',errors,'http',http,flush=True)
raise SystemExit(bool(report['failed'] or errors or http))
