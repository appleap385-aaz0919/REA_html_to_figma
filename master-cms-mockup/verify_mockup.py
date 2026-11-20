"""Drive the actual file:// UI in an isolated, offline Chrome profile.
Run: python -X utf8 -u master-cms-mockup/verify_mockup.py
Requires the locally installed Python Playwright package and Chrome.
"""
from pathlib import Path
import json, time, traceback, re
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'verification'
OUT.mkdir(exist_ok=True)
results, errors, network = [], [], []

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context(viewport={'width': 1600, 'height': 1000}, offline=True)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('requestfailed',lambda request: errors.append('Asset load failed: '+request.url+' '+str(request.failure)) if request.failure!='net::ERR_ABORTED' else None)
    page.on('request', lambda request: network.append(request.url) if request.url.startswith(('http:', 'https:')) else None)
    page.on('dialog', lambda dialog: dialog.dismiss())
    page.goto((ROOT / 'index.html').as_uri())
    page.wait_for_selector('h1')

    def reset():
        page.evaluate('()=>{CMS.edit=null;localStorage.clear();history.replaceState(null,"","#/home")}')
        page.reload()
        expect(page.locator('h1')).to_have_text('문제은행 마스터 CMS에 접속하셨습니다.')

    def route(path):
        page.evaluate('(path)=>CMS.go(path,true)', path)
        page.wait_for_timeout(55)

    def click(action, scope=None):
        target=(scope or page).locator(f'[data-action="{action}"]').first
        if action=='sample-file':
            details=target.locator('xpath=ancestor::details')
            if details.count() and not details.get_attribute('open'): details.locator('summary').click()
        target.click()

    def top_modal():
        return page.locator('.modal-overlay').last

    def accept(label):
        top_modal().locator('.modal-foot').get_by_role('button', name=label, exact=True).click()

    def record(name, fn):
        before = len(errors)
        started = time.monotonic()
        try:
            reset()
            fn()
            assert len(errors) == before, errors[before:]
            results.append({'name': name, 'status': 'passed', 'seconds': round(time.monotonic()-started, 2)})
            print('PASS', name, flush=True)
        except Exception as e:
            results.append({'name': name, 'status': 'failed', 'error': str(e), 'trace': traceback.format_exc()})
            page.screenshot(path=str(OUT / f'failure-{len(results):02}.png'), full_page=True)
            print('FAIL', name, str(e)[:450], flush=True)
        finally:
            while page.locator('.modal-overlay').count():
                page.locator('.modal-overlay').last.locator('.modal-close').click()

    def all_routes():
        screens = page.evaluate('MockCatalog.screens.map(s=>({id:s.id,url:CMS.routes[s.id]}))')
        assert len(screens) == 30
        for screen in screens:
            route(screen['url'])
            assert page.locator('h1').count() == 1, screen
            assert '해당 예시 데이터를 찾을 수 없습니다.' not in page.locator('main').inner_text(), screen
        route('/items')
        page.screenshot(path=str(OUT / 'items-desktop.png'), full_page=True)
        route('/items/2100001/edit/meta')
        page.screenshot(path=str(OUT / 'item-meta-desktop.png'), full_page=True)
    record('30 storyboard screen entries render without runtime errors', all_routes)

    def search_and_pagination():
        route('/items')
        form = page.locator('[data-form=filter]')
        form.locator('[name=q]').fill('NO_SUCH_ITEM')
        form.get_by_role('button', name='조회', exact=True).click()
        expect(page.locator('tbody')).to_contain_text('검색 결과가 없습니다.')
        click('filter-reset')
        expect(page.locator('tbody')).to_contain_text('검색 결과가 없습니다.')
        page.locator('[data-form=filter]').get_by_role('button', name='조회', exact=True).click()
        expect(page.locator('.table-toolbar')).to_contain_text('32')
        page.locator('.pagination button').filter(has_text='›').click()
        expect(page.locator('tbody')).to_contain_text('2100011')
        page.locator('main a[href="#/items/2100011"]').click()
        page.locator('.item-navigation a[href="#/items"]').first.click()
        expect(page.locator('tbody')).to_contain_text('2100011')
    record('Search, empty result, reset-before-query and preserved page context', search_and_pagination)

    def source_create():
        route('/sources/new')
        for key, value in [('curriculum','22'),('school','중학교'),('subjectGroup','수학'),('subject','수학 1'),('grade','중2'),('semester','1학기'),('book','단원 평가'),('volume','유형북'),('year','2030'),('usage','C')]:
            page.locator(f'[data-bind="{key}"]').select_option(value)
        page.locator('[data-bind=display]').fill('로컬 신규 출처')
        page.get_by_role('button', name='저장', exact=True).click()
        expect(page.locator('h1')).to_have_text('출처 상세')
        expect(page.locator('[name=code]')).not_to_have_value('자동생성')
        expect(page.locator('[name=display]')).to_have_value('로컬 신규 출처')
        page.reload()
        expect(page.locator('[name=display]')).to_have_value('로컬 신규 출처')
    record('Source creation generates code and persists after reload', source_create)

    def source_impact():
        route('/sources/8001/edit')
        page.locator('[data-bind=status]').select_option('N')
        expect(top_modal()).to_contain_text('기존 매핑 문항 정보는 유지')
        accept('취소')
        expect(page.locator('[data-bind=status]')).to_have_value('Y')
        page.locator('[data-bind=status]').select_option('N')
        accept('미사용(N)으로 변경')
        page.get_by_role('button', name='저장', exact=True).click()
        expect(page.locator('h1')).to_have_text('출처 상세')
        assert page.evaluate('CMS.db.items.filter(i=>i.sourceRefs.some(s=>s.id===8001)).length') > 0
        assert page.evaluate('CMS.source(8001).status') == 'N'
    record('Source inactive confirmation cancel, accept and existing relation preservation', source_impact)

    def source_relation():
        route('/items/2100001')
        click('item-sources')
        expect(top_modal().locator('[data-action=relation-remove]')).to_be_disabled()
        top_modal().get_by_role('button',name='출처 추가',exact=True).click()
        expect(top_modal().locator('[data-action=relation-add][data-source="8006"]')).to_be_disabled()
        top_modal().locator('[data-action=relation-add][data-source="8002"]').click()
        assert page.evaluate('CMS.item(2100001).sourceRefs.length') == 2
        top_modal().locator('[data-action=relation-remove][data-source="8002"]').click()
        accept('해제')
        assert page.evaluate('CMS.item(2100001).sourceRefs.length') == 1
    record('Current/add source tabs, inactive candidate, add/remove and minimum one source', source_relation)

    def draft_and_apply():
        route('/items/2100002')
        click('item-edit')
        accept('임시저장 수정하기')
        expect(page.locator('[data-bind=difficulty]')).to_have_value('상')
        page.locator('[data-bind=difficulty]').select_option('하')
        click('item-temp')
        accept('임시 저장')
        assert page.evaluate('CMS.item(2100002).difficulty') == '중'
        assert page.evaluate('CMS.item(2100002).draft.difficulty') == '하'
        click('item-apply')
        accept('저장')
        expect(page.locator('h1')).to_have_text('문항 상세')
        assert page.evaluate('CMS.item(2100002).difficulty') == '하'
        assert page.evaluate('!!CMS.item(2100002).draft') is False
    record('Draft chooser, temporary save keeps current version, apply updates and clears draft', draft_and_apply)

    def leave_guard():
        route('/items/2100001/edit/meta')
        page.locator('[data-bind=difficulty]').select_option('최상')
        page.locator('.sidebar a[href="#/papers"]').click()
        expect(top_modal()).to_contain_text('저장하지 않은 변경')
        accept('취소')
        expect(page.locator('[data-bind=difficulty]')).to_have_value('최상')
        page.locator('.sidebar a[href="#/papers"]').click()
        accept('저장 하지 않고 이동')
        expect(page.locator('h1')).to_have_text('평가지 관리')
        assert page.evaluate('CMS.item(2100001).difficulty') == '하'
    record('Unsaved navigation cancel preserves input, leave discards local edit', leave_guard)

    def hml_policy():
        route('/hml/6002')
        expect(page.locator('[name=paperReg][value=N]')).to_be_checked()
        expect(page.locator('[name=paperReg][value=Y]')).to_be_disabled()
        expect(page.locator('main')).to_contain_text('* 50문항이 넘는 HML은 평가지로 등록할 수 없습니다.')
        before = page.evaluate('CMS.db.papers.length')
        click('doc-approve')
        accept('승인')
        page.wait_for_timeout(800)
        assert page.evaluate('CMS.doc(6002).status') == 'Y'
        assert page.evaluate('CMS.db.papers.length') == before
        assert page.evaluate('CMS.doc(6002).itemIds.every(id=>!!CMS.item(id))')
        page.screenshot(path=str(OUT/'hml-51-policy.png'),full_page=True)
    record('51-item HML N disabled, warning, approval allowed and no paper created', hml_policy)

    def hml_all_d():
        route('/hml/6001')
        for e in page.locator('[data-judgment]').all():
            e.select_option('D')
        click('doc-approve')
        expect(top_modal()).to_contain_text('모든 문항이 삭제 상태')
        accept('확인')
        click('doc-discard')
        expect(top_modal()).to_contain_text('비고에 폐기 사유')
    record('Review all-D approval blocked and discard requires reason', hml_all_d)

    def definition_approve():
        route('/definition/7001')
        assert page.locator('[name=paperReg]').count() == 0
        click('doc-approve')
        accept('승인')
        page.wait_for_timeout(800)
        assert page.evaluate('CMS.doc(7001).status') == 'Y'
        assert page.evaluate('CMS.item(2100021).status') == 'R'
    record('Definition has no paper radio and document approval differs from Master status', definition_approve)

    def upload_and_guards():
        route('/hml/new')
        click('sample-file')
        click('registration-source')
        top_modal().locator('[name=pick-source][value="8001"]').check()
        accept('선택')
        expect(page.locator('[data-bind=usage]')).to_have_value('')
        page.locator('[data-bind=unitCode]').fill('22MMATOK1001010000')
        page.locator('[data-bind=usage]').select_option('C')
        page.locator('[data-bind=questionCount]').fill('50')
        page.get_by_role('button',name='등록 시작',exact=True).click()
        expect(page.locator('h1')).to_have_text('HML 상세')
        expect(page.locator('[name=paperReg][value=Y]')).to_be_enabled()
        click('doc-approve')
        expect(top_modal()).to_contain_text('미검수 문항')
    record('Registration source does not set usage, 50 boundary and unjudged approval guard', upload_and_guards)

    def paper_set():
        route('/papers/5001/edit')
        before = page.evaluate('JSON.stringify(CMS.paper(5001).groups)')
        page.locator('[data-action=paper-move][data-index="1"][data-delta="-1"]').click()
        click('paper-save')
        assert page.evaluate('CMS.paper(5001).groups[0].length') == 4
        route('/papers/5001/edit')
        page.locator('[data-action=paper-remove][data-index="0"]').click()
        accept('제외')
        expect(page.locator('[data-action=paper-remove]')).to_be_disabled()
        click('cancel-edit')
        accept('저장 하지 않고 이동')
        assert page.evaluate('CMS.paper(5001).groups.length') == 2
    record('Paper set moves as one group, save, last-group guard and cancel exclude', paper_set)

    def paper_add():
        route('/papers/5001/edit')
        click('paper-add')
        expect(top_modal().locator('[name=addItem][value="2100007"]')).to_be_disabled()
        expect(top_modal().locator('.modal-foot .primary')).to_be_disabled()
        top_modal().locator('[name=addItem][value="2100002"]').check()
        accept('추가')
        assert page.evaluate('CMS.edit.data.groups.length') == 3
        assert page.evaluate('CMS.paper(5001).groups.length') == 2
    record('Paper candidate duplicate guard and local-only add before save', paper_add)

    def cleanup():
        route('/papers')
        before = page.evaluate('({items:CMS.db.items.length,docs:CMS.db.docs.length})')
        click('legacy-cleanup')
        accept('예시 평가지 정보만 정리')
        assert page.evaluate('CMS.paper(5004).status') == 'D'
        assert before == page.evaluate('({items:CMS.db.items.length,docs:CMS.db.docs.length})')
    record('Legacy paper cleanup preserves HML documents and Master items', cleanup)

    def twin_generation():
        route('/items/2100001')
        click('twin-generate')
        accept('생성 시작')
        page.wait_for_timeout(1000)
        assert page.evaluate('CMS.item(2100001).generationHistory.length') == 1
        generated = page.evaluate('CMS.item(2100001).generationHistory[0].ids[0]')
        assert page.evaluate('(id)=>CMS.item(id).status',generated) == 'R'
        click('item-twins')
        top_modal().locator(f'[data-action=twins-remove][data-member="{generated}"]').click()
        assert page.evaluate('CMS.item(2100001).generationHistory.length') == 1
        assert page.evaluate('(id)=>!!CMS.item(id)',generated)
    record('COPY creates draft and history; relation removal preserves item and generation history', twin_generation)

    def hml_vendor_save():
        route('/items/2100001/edit/hml')
        click('hml-open')
        top_modal().locator('#hml-local').fill('새 예시 한글 문제')
        accept('저장')
        expect(top_modal()).to_contain_text('CMS에서')
        assert page.evaluate('CMS.item(2100001).hml.question') != '새 예시 한글 문제'
        accept('확인')
        click('item-temp')
        accept('임시 저장')
        assert page.evaluate('CMS.item(2100001).draft.hml.question') == '새 예시 한글 문제'
    record('Vendor HML save is pending until CMS temporary save', hml_vendor_save)

    def html_edit():
        route('/items/2100001/edit/html')
        editor=page.locator('#native-html-editor [contenteditable=true]').first
        editor.locator('p').first.click()
        page.get_by_role('button',name='⊞ 표',exact=True).click()
        assert editor.locator('table').count()==1
        editor.locator('p').first.click()
        page.get_by_role('button',name='특수문자',exact=True).click()
        page.get_by_role('button',name='①',exact=True).click()
        expect(editor).to_contain_text('①')
        page.keyboard.press('Escape')
        editor.locator('p').first.click()
        page.get_by_role('button',name='글상자',exact=True).click()
        assert editor.locator('d-textbox, [data-type="textbox"], .qe-textbox').count()>0 or 'textbox' in page.evaluate('JSON.stringify(SourceHtml.api.getDocument())')
        click('item-temp');accept('임시 저장')
        assert '<table' in page.evaluate('CMS.item(2100001).draft.html')
    record('HTML table, symbol and textbox insertion with temporary save', html_edit)

    def omr_preview():
        route('/items/2100001/edit/omr')
        page.locator('.omr-obsacn-row input[type=radio]').nth(1).check()
        click('omr-preview')
        preview=page.frame_locator('.native-omr-preview-frame')
        preview.get_by_role('button',name='2',exact=True).click()
        preview.get_by_role('button',name='채점하기',exact=True).click()
        expect(preview.locator('.omr-preview__result')).to_contain_text('정답입니다.')
        accept('닫기')
        page.locator('[data-type-level="2"]').select_option('다답형')
        page.locator('.omr-obmacn-row input[type=checkbox]:checked').uncheck()
        click('omr-preview')
        expect(top_modal()).to_contain_text('정답')
    record('OMR correct-answer editing, preview response and empty answer validation', omr_preview)

    def all_omr_and_restore():
        route('/lab/restore')
        types=page.evaluate('Object.keys(CMS.OMR.types)')
        assert len(types)==14
        for t in types:
            page.locator('[data-restore-type]').select_option(t)
            expect(page.locator('[data-source-context=restore] [data-omr-code="'+t+'"]')).to_be_visible()
        page.locator('[data-restore-type]').select_option('OBSACN')
        page.locator('#restore-json').fill('{bad JSON')
        click('restore-json')
        expect(page.locator('[data-restore-error]')).to_contain_text('이전 정상 화면')
        expect(page.locator('[data-source-context=restore] [data-omr-code=OBSACN]')).to_be_visible()
    record('All 14 OMR forms restore and invalid JSON preserves previous valid form', all_omr_and_restore)

    def math_cancel_apply():
        route('/lab/math')
        page.locator('[data-action=lab-math-open][data-target=answer]').click()
        top_modal().locator('#math-input').fill('x^2')
        accept('취소')
        expect(page.locator('#lab-math-answer')).to_have_value('\\frac{1}{2}')
        page.locator('[data-action=lab-math-open][data-target=answer]').click()
        top_modal().locator('#math-input').fill('x^2')
        accept('적용')
        expect(page.locator('#lab-math-answer')).to_have_value('x^2')
        page.locator('[data-action=lab-math-open][data-target=answer]').click()
        top_modal().locator('[data-tab=handwriting]').click()
        expect(top_modal().locator('[data-action=handwriting-recognize]')).to_be_disabled()
        page.screenshot(path=str(OUT/'math-handwriting.png'),full_page=True)
    record('Math cancel/apply, MathML preview and empty-handwriting disabled state', math_cancel_apply)

    def iframe_isolation():
        route('/lab/isolation')
        click('isolation-load')
        page.locator('[data-action=isolation-tab][data-tab=iframe]').click()
        frame=page.frame_locator('#isolation-frame')
        frame.locator('[contenteditable=true]').first.fill('iframe에서 변경한 문항')
        page.wait_for_timeout(120)
        click('isolation-compare')
        expect(page.locator('#isolation-api-output')).to_contain_text('두 문서가 다릅니다.')
        page.locator('[data-action=isolation-tab][data-tab=original]').click()
        expect(page.locator('#isolation-original')).not_to_contain_text('iframe에서 변경한 문항')
        click('isolation-destroy')
        expect(page.locator('#isolation-surface')).to_contain_text('편집기가 없습니다.')
    record('iframe editing remains isolated, compare and destroy behavior', iframe_isolation)

    def metadata_pick_and_limits():
        route('/items/2100001/edit/meta')
        page.locator('[data-action=mapping-add][data-key=achievement]').click()
        top_modal().get_by_role('button', name='조회', exact=True).click()
        top_modal().locator('[name=mapCandidate]:not(:disabled)').first.check()
        accept('성취기준 추가')
        assert page.evaluate('CMS.edit.data.achievement.length') == 2
        page.locator('[data-action=mapping-add][data-key=competency]').click()
        top_modal().get_by_role('button', name='조회', exact=True).click()
        choices=top_modal().locator('[name=mapCandidate]:not(:disabled)')
        for choice in choices.all()[:3]:choice.check()
        accept('교과역량 추가')
        expect(top_modal()).to_contain_text('최대 3개')
        accept('취소')
        assert page.evaluate('CMS.edit.data.competency.length') == 1
        page.locator('[data-action=mapping-add][data-key=behavior]').click()
        top_modal().get_by_role('button', name='조회', exact=True).click()
        top_modal().locator('[name=mapCandidate][value="계산"]').check()
        accept('행동영역 추가')
        assert page.evaluate('CMS.edit.data.behavior') == '계산'
    record('Metadata search pickers, deduplication, competency maximum and behavior single choice', metadata_pick_and_limits)

    def duplicate_source():
        route('/sources/new')
        for key,value in [('curriculum','22'),('school','중학교'),('subjectGroup','수학'),('subject','수학 1'),('grade','중1'),('semester','1학기'),('book','수매씽 유형'),('volume','유형북'),('year','2022'),('usage','C')]:
            page.locator(f'[data-bind="{key}"]').select_option(value)
        page.get_by_role('button',name='저장',exact=True).click()
        expect(top_modal()).to_contain_text('이미 등록된 출처입니다.')
        assert page.evaluate('CMS.db.sources.length') == 16
    record('Duplicate source classification is blocked even when usage differs', duplicate_source)

    def definition_discard():
        route('/definition/7001')
        page.locator('[data-bind=remark]').fill('중복 등록 예시')
        click('doc-discard')
        accept('폐기')
        assert page.evaluate('CMS.doc(7001).status') == 'D'
        assert page.evaluate('CMS.item(2100021).status') == 'D'
        assert page.locator('[data-action=doc-approve]').count() == 0
        page.reload()
        expect(page.locator('main')).to_contain_text('폐기된 시험지')
    record('Definition discard persists and removes approval controls', definition_discard)

    def paper_failed_status():
        route('/papers/5001/edit')
        click('paper-add')
        top_modal().locator('[name=addItem][value="2100004"]').check()
        accept('추가')
        page.locator('[data-bind=status]').select_option('Y')
        click('paper-save')
        expect(top_modal()).to_contain_text('모든 문항이 승인(사용) 상태여야 합니다.')
        accept('확인')
        page.locator('[data-bind=status]').select_option('D')
        click('paper-save')
        expect(top_modal()).to_contain_text('다시 수정할 수 없습니다.')
        accept('저장')
        assert page.evaluate('CMS.paper(5001).status') == 'D'
        expect(page.locator('main [aria-disabled=true]')).to_have_text('수정')
    record('Paper use transition validates members and discard locks modification', paper_failed_status)

    def deploy_simulation():
        route('/items/2100001')
        click('item-deploy')
        expect(top_modal().locator('.modal-foot .primary')).to_be_disabled()
        top_modal().locator('[name=deployTarget][value="개발 서비스"]').check()
        expect(top_modal()).to_contain_text('같은 예시 버전을 다시 배포')
        top_modal().locator('[name=deployTarget][value="AI출제마법사 CMS"]').check()
        accept('배포')
        assert page.evaluate('CMS.item(2100001).deployed.includes("AI출제마법사 CMS")')
    record('Deployment selection, redeploy notice and local-only completion', deploy_simulation)

    def lab_admin_and_matrix():
        route('/lab')
        click('lab-cache')
        expect(top_modal().locator('.modal-foot .primary')).to_be_disabled()
        top_modal().locator('[name=adminTarget][value="단원"]').check()
        accept('reload')
        click('lab-session')
        expect(top_modal().locator('.modal-foot .primary')).to_be_disabled()
        top_modal().locator('[name=adminTarget][value="전체"]').check()
        accept('로그아웃')
        route('/lab/math')
        page.locator('[data-action=lab-math-open][data-target=answer]').click()
        click('math-matrix',top_modal())
        top_modal().locator('[name=rows]').select_option('2')
        top_modal().locator('[name=cols]').select_option('3')
        accept('추가')
        expect(top_modal().locator('#math-input')).to_have_value(re.compile('pmatrix'))
        assert top_modal().locator('math mtable mtr').count() == 2
        accept('적용')
    record('Lab admin selection guards and nested 2 by 3 matrix insertion', lab_admin_and_matrix)

    def full_popup_pagination():
        route('/hml/new')
        click('registration-source')
        assert top_modal().locator('tbody tr').count()==10
        top_modal().locator('.pagination button').filter(has_text='2').click()
        top_modal().locator('[name=pick-source][value="8011"]').check()
        accept('선택')
        assert page.evaluate('CMS.edit.data.sourceId')==8011
        route('/items/2100001')
        click('item-twins')
        top_modal().get_by_role('button',name='쌍둥이 추가',exact=True).click()
        assert top_modal().locator('tbody tr').count()==10
        top_modal().locator('.pagination button').filter(has_text='2').click()
        assert top_modal().locator('tbody tr').count()>0
        expect(top_modal().locator('.table-toolbar')).to_contain_text('11')
        accept('닫기')
        route('/papers/5001/edit')
        click('paper-add')
        assert top_modal().locator('tbody tr').count()==10
        top_modal().locator('.pagination button').filter(has_text='2').click()
        assert top_modal().locator('tbody tr').count()>0
    record('Source, twin candidate and paper candidate popup pagination', full_popup_pagination)

    def paragraph_and_overlap():
        route('/items/2100001/edit/html')
        editor=page.locator('#native-html-editor [contenteditable=true]').first
        editor.locator('p').first.click();page.get_by_role('button',name='문단',exact=True).click()
        pop=page.locator('.qe-paragraph-format:visible')
        pop.locator('input[type=number]').first.fill('12')
        pop.get_by_role('button',name='적용',exact=True).click()
        assert 'margin-left' in page.evaluate('SourceHtml.api.getDocument().content.questionHtml')
        editor.click();page.get_by_role('button',name='글자 겹치기',exact=True).click()
        pop=page.locator('.qe-composepop:visible')
        pop.locator('.qe-composepop__text').fill('가')
        pop.locator('select').select_option(label='삼각형')
        pop.get_by_role('button',name='확인',exact=True).click()
        assert '가' in page.evaluate('SourceHtml.api.getDocument().content.questionHtml')
        assert 'triangle' in page.evaluate('SourceHtml.api.getDocument().content.questionHtml')
        page.screenshot(path=str(OUT/'html-paragraph-overlap.png'),full_page=True)
    record('Paragraph settings modify actual content and overlap shape uses triangle geometry', paragraph_and_overlap)

    def second_file_guard():
        route('/definition/new')
        click('sample-file')
        page.locator('#document-file').set_input_files({'name':'second.zip','mimeType':'application/zip','buffer':b'example'})
        expect(top_modal()).to_contain_text('최대 1개 파일')
        assert page.evaluate('CMS.edit.data.file')=='목업_예시.zip'
        accept('확인')
        expect(page.locator('[data-bind=questionCount]')).to_be_disabled()
        assert page.locator('[data-bind=withSet]').count()==0
    record('Second ZIP is rejected without losing the first and Definition remains single-item', second_file_guard)

    def geometry_all_screens():
        paths=page.evaluate('[...new Set(Object.values(CMS.routes))]')
        for width in [1600,1280,760]:
            page.set_viewport_size({'width':width,'height':1000})
            for path in paths:
                route(path)
                measured=page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})')
                assert measured['scroll']<=width+1,(path,measured)
        page.set_viewport_size({'width':1600,'height':1000})
    record('Every base screen stays within root width at 1600, 1280 and 760 pixels', geometry_all_screens)

    def responsive():
        route('/items')
        page.set_viewport_size({'width':1280,'height':800})
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
        page.set_viewport_size({'width':760,'height':1000})
        page.locator('#menu-toggle').click()
        expect(page.locator('.sidebar')).to_have_class('sidebar mobile-open')
        page.locator('.sidebar a[href="#/papers"]').click()
        expect(page.locator('h1')).to_have_text('평가지 관리')
        page.screenshot(path=str(OUT/'tablet-papers.png'),full_page=True)
        page.set_viewport_size({'width':1600,'height':1000})
    record('1280 layout and tablet navigation', responsive)

    report={'runAt':time.strftime('%Y-%m-%d %H:%M:%S'), 'launch':'Chrome headless / isolated profile / offline=True / file://index.html', 'cases':results,'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'runtimeErrors':errors,'httpRequests':network,'notCovered':['실제 CMS 서버, 실제 HML/ZIP 해석, AI, 배포 수신, 필기 인식, 실제 서비스 채점','전체 71개 UI 변형의 픽셀 일치','모든 입력 조합과 브라우저별 파일 저장 정책']}
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'passed':report['passed'],'failed':report['failed'],'runtimeErrors':errors,'httpRequests':network},ensure_ascii=False),flush=True)
    browser.close()
    if report['failed'] or errors or network:raise SystemExit(1)
