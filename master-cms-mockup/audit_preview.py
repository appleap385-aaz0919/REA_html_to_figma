"""Compare all 14 popups with the live development service's renderer.
The original receives example JSON through its documented preview message;
no CMS document is saved. All mock interactions run offline via file://.
"""
from pathlib import Path
import json,time,traceback,hashlib
from playwright.sync_api import sync_playwright,expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification/preview-v2';OUT.mkdir(parents=True,exist_ok=True)
results=[];errors=[];http=[];failed=[]
snapshot='''()=>({text:document.querySelector('.omr-preview').innerText,
 tableRows:document.querySelectorAll('.omr-table__row').length,
 buttons:[...document.querySelectorAll('.omr-preview button')].filter(x=>x.getClientRects().length).map(x=>({text:x.innerText,role:x.getAttribute('role'),label:x.getAttribute('aria-label'),disabled:x.disabled})),
 controls:[...document.querySelectorAll('.omr-preview input,.omr-preview textarea,.omr-preview select')].filter(x=>x.getClientRects().length).map(x=>({tag:x.tagName,type:x.type,placeholder:x.placeholder})),
 table:{w:document.querySelector('.omr-table').getBoundingClientRect().width,h:document.querySelector('.omr-table').getBoundingClientRect().height}})'''
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    ctx=browser.new_context(offline=True,viewport={'width':1800,'height':1100})
    page=ctx.new_page();page.set_default_timeout(8000)
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('request',lambda r:http.append(r.url) if r.url.startswith(('http:','https:')) else None)
    page.on('requestfailed',lambda r:failed.append({'url':r.url,'error':r.failure}) if r.failure!='net::ERR_ABORTED' else None)
    original_ctx=browser.new_context(viewport={'width':522,'height':900})
    original=original_ctx.new_page();original.set_default_timeout(15000)
    def visit(route):
        page.goto((ROOT/'index.html').as_uri()+'#'+route);page.wait_for_selector('h1')
    def close():page.locator('.modal-foot').get_by_role('button',name='닫기',exact=True).click()
    def frame():return page.frame_locator('.native-omr-preview-frame')
    def run(name,fn):
        try:fn();results.append({'name':name,'status':'passed'});print('PASS',name,flush=True)
        except Exception as e:
            results.append({'name':name,'status':'failed','error':str(e),'trace':traceback.format_exc()})
            page.screenshot(path=str(OUT/f'failure-{len(results)}.png'))
            print('FAIL',name,str(e)[:400],flush=True)
        finally:
            while page.locator('.modal-overlay').count():page.locator('.modal-close').last.click()
    visit('/lab/omr')
    codes=page.evaluate('Object.keys(CMS.OMR.types)')
    for code in codes:
        def compare(code=code):
            visit('/lab/omr')
            section=page.locator('[data-gallery-type="'+code+'"]')
            section.locator('summary').click()
            data=page.evaluate('(t)=>CMS.omrContexts["gallery-"+t].sourceData',code)
            section.locator('.omr-preview-btn').click()
            local=frame();local.locator('.omr-table').wait_for()
            local.locator('.omr-preview').evaluate('()=>document.fonts.ready')
            original.goto('https://dev-exambank.douclass.com/omr-preview',wait_until='networkidle')
            original.evaluate('(data)=>window.postMessage({source:"donga-omr-preview",type:"render",...data},location.origin)',data)
            original.locator('.omr-table').wait_for();original.evaluate('()=>document.fonts.ready')
            local_data=page.frames[1].evaluate(snapshot);original_data=original.evaluate(snapshot)
            assert local_data['text']==original_data['text'],(code,original_data,local_data)
            assert local_data['buttons']==original_data['buttons'],(code,'button inventory')
            assert local_data['controls']==original_data['controls'],(code,'control inventory')
            assert abs(local_data['table']['w']-original_data['table']['w'])<1,(code,'table width')
            assert abs(local_data['table']['h']-original_data['table']['h'])<2,(code,'table height',local_data['table'],original_data['table'])
            local.locator('.omr-preview').screenshot(path=str(OUT/(code+'-mock.png')))
            original.locator('.omr-preview').screenshot(path=str(OUT/(code+'-original.png')))
            page.locator('.modal').screenshot(path=str(OUT/(code+'-popup.png')))
            local.get_by_role('switch').click();original.get_by_role('switch').click()
            expect(local.get_by_role('switch')).to_have_attribute('aria-checked','true')
            expect(local.get_by_role('button',name='채점하기',exact=True)).to_have_count(0)
            assert page.frames[1].evaluate(snapshot)['text']==original.evaluate(snapshot)['text'],(code,'answer view')
            local.locator('.omr-preview').screenshot(path=str(OUT/(code+'-answers-mock.png')))
            original.locator('.omr-preview').screenshot(path=str(OUT/(code+'-answers-original.png')))
            results.append({'type':code,'originalUrl':original.url,'snapshot':data,'original':original_data,'mock':local_data,'answerView':True})
        run('Reference popup + answer view: '+code,compare)

    def choice_states():
        visit('/items/2100001');page.locator('[data-action=omr-preview]').click();f=frame()
        f.get_by_role('button',name='채점하기',exact=True).click()
        expect(f.locator('.omr-preview__result')).to_contain_text('오답입니다.')
        f.get_by_role('button',name='3',exact=True).click();f.get_by_role('button',name='채점하기',exact=True).click()
        expect(f.locator('.omr-preview__result')).to_contain_text('정답입니다.')
        f.get_by_role('button',name='2',exact=True).click();expect(f.locator('.omr-preview__result')).to_have_count(0)
        f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('오답입니다.')
        close();assert page.locator('.native-omr-preview-frame').count()==0
        page.locator('[data-action=omr-preview]').click();f=frame()
        expect(f.locator('.omr-preview__result')).to_have_count(0)
        expect(f.get_by_role('switch')).to_have_attribute('aria-checked','false')
        assert f.locator('.answer-choice__cell.is-active,.answer-choice__cell.is-picked').count()==0
    run('Saved detail: empty/correct/wrong, input clears result, close/reopen reset',choice_states)

    def keyboard():
        visit('/lab/omr');s=page.locator('[data-gallery-type=SBSANM]');s.locator('summary').click();s.locator('.omr-preview-btn').click();f=frame()
        f.locator('.math-answer-field').click();expect(f.get_by_role('tab',name='숫자',exact=True)).to_be_visible()
        f.get_by_role('button',name='7',exact=True).click();f.get_by_role('button',name='적용',exact=True).click()
        expect(f.locator('.math-answer-field')).to_contain_text('7')
        f.locator('.math-answer-field').click()
        f.get_by_role('button',name='8',exact=True).click();f.get_by_role('button',name='취소',exact=True).click()
        expect(f.locator('.math-answer-field')).not_to_contain_text('8')
        for category in ['숫자','연산','기호','대수·미적분','알파벳·그리스 문자']:
            f.locator('.math-answer-field').click();f.get_by_role('tab',name=category,exact=True).click()
            f.locator('img').evaluate_all('(xs)=>Promise.all(xs.map(x=>x.decode().catch(()=>{})))')
            assert f.locator('img').evaluate_all('(xs)=>xs.filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src)')==[]
            f.get_by_role('button',name='취소',exact=True).click()
    run('Native math keypad apply/cancel/categories and local SVG assets',keyboard)

    def multi():
        visit('/lab/omr');s=page.locator('[data-gallery-type=OBMACN]');s.locator('summary').click();s.locator('.omr-preview-btn').click();f=frame()
        f.get_by_role('button',name='1',exact=True).click();f.get_by_role('button',name='2',exact=True).click()
        f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('오답입니다.')
        f.get_by_role('button',name='2',exact=True).click();f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('정답입니다.')
    run('Multiple response add/toggle-off and complete-set grading',multi)
    def ox_sets():
        visit('/lab/omr');s=page.locator('[data-gallery-type=OBMAOX]');s.locator('summary').click();s.locator('.omr-preview-btn').click();f=frame()
        f.get_by_role('button',name='정답',exact=True).first.wait_for()
        for button in f.get_by_role('button',name='정답',exact=True).all():button.click()
        f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('정답입니다.')
        f.get_by_role('button',name='오답',exact=True).last.click();f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('오답입니다.')
    run('OX sets retain separate responses and grade the complete set',ox_sets)
    def select_and_links():
        for code in ['SBSAAS','SBMAAS','SBMALD','SBMADD']:
            visit('/lab/omr');s=page.locator('[data-gallery-type="'+code+'"]');s.locator('summary').click();s.locator('.omr-preview-btn').click();f=frame()
            f.locator('.select__trigger').first.wait_for()
            for k in range(f.locator('.select__trigger').count()):
                f.locator('.select__trigger').nth(k).click();f.get_by_role('option').nth(k if code in ['SBMALD','SBMADD'] else 0).click()
            f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('정답입니다.')
            if code=='SBMALD':
                f.get_by_role('button',name='답 추가',exact=True).first.click();expect(f.locator('.select__trigger')).to_have_count(3)
            if code=='SBMADD':expect(f.get_by_role('button',name='답 추가',exact=True)).to_have_count(0)
            close()
    run('Select and link answers use native dropdowns; repeat flags differ by type',select_and_links)
    def manual():
        visit('/lab/omr');s=page.locator('[data-gallery-type=ESBA00]');s.locator('summary').click();s.locator('.omr-preview-btn').click();f=frame()
        expect(f.get_by_role('button',name='답안 작성',exact=True)).to_be_visible()
        expect(f.get_by_role('button',name='파일 선택',exact=True)).to_be_visible()
        f.get_by_role('button',name='채점하기',exact=True).click();expect(f.locator('.omr-preview__result')).to_contain_text('수동 채점')
    run('Manual answer surface and local pending-grade result',manual)
    original_ctx.close();ctx.close();browser.close()

report={'date':'2026-11-17','original':'Live development /omr-preview, example JSON only; no CMS saves or original grade requests','passed':sum(r.get('status')=='passed' for r in results),'failed':sum(r.get('status')=='failed' for r in results),'results':results,'runtimeErrors':errors,'httpRequests':http,'fileLoadFailures':failed,
'build':{str(p.relative_to(ROOT)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in ROOT.rglob('*') if p.is_file() and (p.suffix in ['.js','.css','.woff2','.svg'] or p.name in ['index.html','omr-preview.html','isolation-frame.html'])}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('RESULT',report['passed'],report['failed'],'errors',errors,'HTTP',http,'load failures',failed[:8],flush=True)
raise SystemExit(bool(report['failed'] or errors or http or failed))
