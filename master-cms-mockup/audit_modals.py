"""Open each of the 52 cataloged dialog entries through the real local UI.
Captures the rendered result, buttons, fields, source reference and close behavior.
Does not claim every cataloged variant or external vendor engine is reproduced.
"""
from pathlib import Path
import hashlib, json, traceback
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification'/'modal-audit'
OUT.mkdir(parents=True,exist_ok=True)
catalog=json.loads((ROOT/'coverage.json').read_text(encoding='utf-8-sig'))['modals']
results=[]
direct={'REV_HOME_LOGOUT':'logout','REV_ITM_DETAIL_OMR':'omr-preview',
 'REV_ITM_PRODUCT':'item-sources','REV_ITM_PAPERS':'item-papers','REV_ITM_DEPLOY':'item-deploy',
 'TWN_C03_CURRENT_ADD':'item-twins','TWN_C03_GENERATE':'twin-generate','TWN_C03_HISTORY':'twin-history',
 'REV_ITM_TEMP':'item-temp','REV_ITM_APPLY':'item-apply','REV_ITM_CANCEL':'cancel-edit',
 'REV_ITM_OMR_PREVIEW':'omr-preview','REV_LAB_BUNDLE':'lab-bundle','REV_LAB_CACHE':'lab-cache',
 'REV_LAB_SESSION':'lab-session','HML_C02_SOURCE':'registration-source','HML_C02_UNIT':'registration-unit',
 'HML_C02_CANCEL':'cancel-edit','HML_C03_UNJUDGED':'doc-approve','HML_C03_REASON':'doc-discard',
 'DIFI_C02_SOURCE':'registration-source','DIFI_C02_UNIT':'registration-unit','DIFI_C02_CANCEL':'cancel-edit',
 'DIFI_C03_REASON':'doc-discard','REV_PAP_ADD':'paper-add','REV_PAP_REMOVE':'paper-remove',
 'REV_PAP_CANCEL':'cancel-edit','REV_SRC_CREATE_CANCEL':'cancel-edit','REV_SRC_EDIT_CANCEL':'cancel-edit'}

with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    for entry in catalog:
        ctx=browser.new_context(viewport={'width':1800,'height':1100},offline=True)
        page=ctx.new_page();errors=[];http=[];native=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.on('requestfailed',lambda request:errors.append('Asset load failed: '+request.url+' '+str(request.failure)) if request.failure!='net::ERR_ABORTED' else None)
        page.on('request',lambda r:http.append(r.url) if r.url.startswith(('http:','https:')) else None)
        def native_dialog(d):
            native.append({'type':d.type,'message':d.message,'default':d.default_value})
            d.dismiss()
        page.on('dialog',native_dialog)
        def click(action,scope=None):
            (scope or page).locator('[data-action="'+action+'"]').first.click()
        def dialog(): return page.locator('.modal-overlay').last
        def accept(label): dialog().locator('.modal-foot').get_by_role('button',name=label,exact=True).click()
        def visit(route):
            page.goto((ROOT/'index.html').as_uri()+'#'+route)
            page.wait_for_selector('h1')
        def make_draft(item_id):
            visit('/items/'+str(item_id)+'/edit/meta')
            page.locator('[data-bind=difficulty]').select_option('상')
            click('item-temp');accept('임시 저장')
            expect(page.locator('.toast').last).to_contain_text('임시 저장')
        key=entry['id']
        try:
            visit(entry['route'])
            if key in direct:
                if key.endswith('_REASON'): page.locator('[data-bind=remark]').fill('')
                click(direct[key])
            elif key=='REV_ITM_STATUS_SAVE':
                page.locator('[data-status-bind=status][value=N]').check();click('status-save')
            elif key=='REV_ITM_STATUS_LEAVE':
                page.locator('[data-status-bind=status][value=N]').check()
                page.locator('#sidebar a[href="#/home"]').click()
            elif key in ['REV_ITM_DRAFT','HML_C04_DRAFT','DIFI_C04_DRAFT']:
                item_id=2100001 if key=='REV_ITM_DRAFT' else page.evaluate('CMS.doc('+('6003' if key=='HML_C04_DRAFT' else '7002')+').itemIds[0]')
                make_draft(item_id)
                visit('/items/'+str(item_id));click('item-edit')
            elif key.startswith('REV_ITM_') and key.split('REV_ITM_')[1] in ['UNIT','ACHIEVEMENT','DOMAIN','COMPETENCY','BEHAVIOR']:
                field={'UNIT':'unitCodes','ACHIEVEMENT':'achievement','DOMAIN':'domain','COMPETENCY':'competency','BEHAVIOR':'behavior'}[key.split('REV_ITM_')[1]]
                page.locator('[data-action=mapping-add][data-key="'+field+'"]').click()
            elif key.startswith('REV_ITM_HTML_'):
                tool={'PARAGRAPH':'paragraph','MATH':'math','IMAGE_URL':'image','SYMBOL':'symbol','OVERLAP':'overlap','TEXTBOX':'textbox'}[key.split('REV_ITM_HTML_')[1]]
                page.locator('#native-html-editor [contenteditable=true]').first.locator('p').first.click()
                names={'paragraph':'문단','math':'+ 수식','image':'🖼 이미지','symbol':'특수문자','overlap':'글자 겹치기','textbox':'글상자'}
                page.get_by_role('button',name=names[tool],exact=True).click()
                if tool=='textbox':page.locator('.hml-textbox').first.dblclick()
                if tool!='image':
                    selectors={'paragraph':'.qe-paragraph-format','math':'.qe-mathpanel','symbol':'.qe-symbolpalette','overlap':'.qe-composepop','textbox':'.qe-shapepop'}
                    surface=page.locator(selectors[tool]+':visible')
                    expect(surface).to_be_visible()
                    observed=surface.evaluate('(e)=>({text:e.innerText,fields:[...e.querySelectorAll("input,textarea,select")].map(x=>({type:x.type,label:x.getAttribute("aria-label")})),buttons:[...e.querySelectorAll("button")].map(x=>x.textContent)})')
                    assert not errors,errors
                    assert not http,http
                    page.screenshot(path=str(OUT/(key+'.png')),full_page=True)
                    if tool=='symbol':page.get_by_role('button',name='특수문자',exact=True).click()
                    else:
                        cancel=surface.get_by_role('button',name='취소',exact=True)
                        if cancel.count():cancel.click()
                        else:page.keyboard.press('Escape')
                    expect(surface).to_be_hidden()
                    results.append({'id':key,'status':'passed','kind':'preserved-native-editor-surface','observed':observed,'capture':key+'.png'})
                    print('PASS',key,'native editor surface',flush=True)
                    continue
            elif key=='REV_HML_SAVED':
                click('hml-open');dialog().locator('#hml-local').fill('검수용 한글 예시 문서');accept('저장')
            elif key in ['REV_LAB_MATH','REV_LAB_MATRIX']:
                page.locator('[data-action=lab-math-open][data-target=answer]').click()
                if key=='REV_LAB_MATRIX': click('math-matrix',dialog())
            elif key=='DIFI_C03_ALL_D':
                for selector in page.locator('[data-judgment]').all(): selector.select_option('D')
                click('doc-approve')
            elif key=='REV_PAP_DEPLOY':
                visit('/papers/5001/edit');page.locator('[data-bind=status]').select_option('Y');click('paper-save')
                expect(page.locator('h1')).to_have_text('평가지 상세');click('paper-deploy')
            elif key=='REV_PAP_DISCARD':
                page.locator('[data-bind=status]').select_option('D');click('paper-save')
            elif key=='REV_SRC_USE_IMPACT':
                page.locator('[data-bind=status]').select_option('N')
            else: raise AssertionError('Unmapped dialog '+key)
            if key=='REV_ITM_HTML_IMAGE_URL':
                assert native and native[-1]['type']=='prompt' and native[-1]['default']=='https://',native
                assert 'http://' in native[-1]['message'] and 'https://' in native[-1]['message']
                results.append({'id':key,'status':'passed','route':entry['route'],'kind':'native-browser-prompt','observed':native[-1],'cancel':'dismissed; no image inserted','note':'Headless screenshot does not include browser chrome; actual prompt event recorded.'})
                print('PASS',key,'native browser prompt',flush=True)
                continue
            expect(dialog()).to_be_visible()
            if key in ['REV_ITM_DETAIL_OMR','REV_ITM_OMR_PREVIEW']:
                preview=page.frame_locator('.native-omr-preview-frame')
                expect(preview.locator('.omr-table')).to_be_visible()
                expect(preview.get_by_role('switch')).to_be_visible()
                expect(preview.get_by_role('button',name='채점하기',exact=True)).to_be_visible()
            snapshot=dialog().evaluate('''e=>({title:e.querySelector('.modal-head h2').textContent,
              fields:[...e.querySelectorAll('input,textarea,select')].filter(x=>x.getClientRects().length).map(x=>({name:x.name,type:x.type,label:x.getAttribute('aria-label')||'',disabled:x.disabled})),
              buttons:[...e.querySelectorAll('button')].filter(x=>x.getClientRects().length).map(x=>({text:x.textContent.trim(),label:x.getAttribute('aria-label'),disabled:x.disabled})),
              text:e.textContent.trim(),width:e.querySelector('.modal').getBoundingClientRect().width,
              fits: e.querySelector('.modal').getBoundingClientRect().right<=innerWidth
            })''')
            assert snapshot['fits'],snapshot
            expected_width={'REV_HOME_LOGOUT':380,'REV_LAB_BUNDLE':380,'REV_LAB_CACHE':380,'REV_LAB_SESSION':380,'REV_LAB_MATRIX':460,'REV_ITM_DETAIL_OMR':522,'REV_ITM_OMR_PREVIEW':522}.get(key)
            if expected_width:assert abs(snapshot['width']-expected_width)<1,(key,snapshot['width'],expected_width)
            dialog().locator('.modal').screenshot(path=str(OUT/(key+'-dialog.png')))
            assert not errors,errors
            assert not http,http
            page.screenshot(path=str(OUT/(key+'.png')),full_page=True)
            # Escape must close exactly the topmost dialog, including nested dialogs.
            count=page.locator('.modal-overlay').count()
            page.keyboard.press('Escape')
            expect(page.locator('.modal-overlay')).to_have_count(count-1)
            results.append({'id':key,'status':'passed','route':entry['route'],'sourceFields':entry['fields'],'sourceButtons':entry['buttons'],'observed':snapshot,'capture':key+'.png'})
            print('PASS',key,flush=True)
        except Exception as exc:
            page.screenshot(path=str(OUT/(key+'-failure.png')),full_page=True)
            results.append({'id':key,'status':'failed','error':str(exc),'trace':traceback.format_exc()})
            print('FAIL',key,str(exc)[:200],flush=True)
        finally: ctx.close()
    browser.close()
report={'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'scope':'52 catalog entries; one representative UI state each; source field/button inventories retained for review; not every variant or pixel equivalence','results':results,'build':{n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in sorted(str(p.relative_to(ROOT)).replace('\\','/') for p in ROOT.rglob('*') if p.is_file() and p.suffix in ['.js','.css'] or p==ROOT/'index.html')}}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:report[k] for k in ['passed','failed','scope']},ensure_ascii=False),flush=True)
raise SystemExit(1 if report['failed'] else 0)
