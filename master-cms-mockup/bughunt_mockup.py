"""Seeded UI stress on the exact offline files; never uses the user's profile."""
from pathlib import Path
from random import Random
from tempfile import TemporaryDirectory
import hashlib, json, re, sys, time, traceback
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification'/'bughunt'
OUT.mkdir(parents=True,exist_ok=True)
SEEDS=[1103,2207,3301,4409]
POLICIES=['new-user','masher','draft-resume','interruptions','resize','slow-user','monkey','localization','reduced-motion','two-sessions']
ORACLES=['O-1','O-2','O-3','O-4','O-5','O-6','O-7','O-8','O-10']

def require(value,oracle,expected,actual=None):
    if not value:raise AssertionError(json.dumps({'oracle':oracle,'expected':expected,'actual':actual},ensure_ascii=False))

if '--oracle-self-test' in sys.argv:
    evidence=[]
    for oracle in ORACLES:
        try:require(False,oracle,'controlled good observation','injected failing observation')
        except AssertionError as error:evidence.append({'oracle':oracle,'caught':True,'evidence':str(error)})
    (OUT/'oracle-self-test.json').write_text(json.dumps({'expectedExitCode':1,'injections':evidence},ensure_ascii=False,indent=2),encoding='utf-8')
    print('Expected failing self-check:',len(evidence),'oracles reported with evidence')
    raise SystemExit(1)

def canonical(value):
    if isinstance(value,list):return [canonical(v) for v in value]
    if isinstance(value,dict):return {k:canonical(v) for k,v in value.items() if k not in ['at','draftAt','updated','created','version','previousVersion']}
    return value

def digest(value):return hashlib.sha256(json.dumps(canonical(value),ensure_ascii=False,sort_keys=True).encode()).hexdigest()

build={str(p.relative_to(ROOT)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in ROOT.rglob('*') if p.is_file() and (p.suffix in ['.js','.css'] or p.name in ['index.html','isolation-frame.html'])}
manifest={'seeds':SEEDS,'policies':POLICIES,'passes':2,'profile':'crud-app','rng':'Python Random MT19937, one stream per seed/case','build':build,'input':'file:// + isolated Chrome + offline=True','probe':'CMS.db read-only; no mutations via evaluate','sampling':'before/after each logged user action; settled-frame geometry','oracles':ORACLES,'oracleLimits':{'O-3':'visible screen readiness; no production async backend','O-4':'clicked target geometry and root horizontal overflow; not per-frame or native soft keyboard','O-6':'normalized logical end-state; excludes timestamps and version counters','O-9':'not applicable: no real account or authentication model'},'command':'python -X utf8 -u master-cms-mockup/bughunt_mockup.py'}
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
results=[];hashes={};start=time.monotonic()

with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    manifest['browserVersion']=browser.version
    for iteration in [1,2]:
        for policy in POLICIES:
            for seed in SEEDS:
                rng=Random(seed);name=f'pass-{iteration}-{policy}-{seed}';case_dir=OUT/name
                log=[];runtime=[];http=[];ctx=None;profile=None;page=None;case_start=time.monotonic()
                try:
                    if policy=='draft-resume':
                        profile=TemporaryDirectory(prefix='master-cms-mock-qa-')
                        ctx=p.chromium.launch_persistent_context(profile.name,channel='chrome',headless=True,viewport={'width':1440,'height':900},offline=True)
                    else:
                        ctx=browser.new_context(viewport={'width':1440,'height':900},offline=True,reduced_motion='reduce' if policy=='reduced-motion' else 'no-preference',locale='ko-KR')
                    ctx.tracing.start(screenshots=True,snapshots=True,sources=True)
                    page=ctx.new_page();page.set_default_timeout(15000)

                    def observe_page(pg):
                        pg.on('pageerror',lambda e:runtime.append(str(e)))
                        pg.on('request',lambda req:http.append(req.url) if req.url.startswith(('http:','https:')) else None)
                        pg.on('dialog',lambda dialog:dialog.dismiss())
                    observe_page(page)
                    page.goto((ROOT/'index.html').as_uri())

                    def obs(label):
                        require(not runtime,'O-1','no runtime errors',runtime)
                        require(not http,'O-1','zero external HTTP requests',http)
                        data=page.evaluate('CMS.db')
                        for collection in ['items','sources','docs','papers','twins']:
                            ids=[r['id'] for r in data[collection]]
                            require(len(ids)==len(set(ids)),'O-5','unique '+collection+' IDs',ids)
                        ids={r['id'] for r in data['items']};srcs={r['id'] for r in data['sources']}
                        require(all(i['sourceRefs'] and all(s['id'] in srcs for s in i['sourceRefs']) for i in data['items']),'O-5','every item has valid source relations')
                        require(all(r['groups'] and all(g and all(i in ids for i in g) for g in r['groups']) for r in data['papers']),'O-5','paper groups remain nonempty and reference existing items')
                        require(page.locator('h1').count()==1,'O-3','one ready screen title')
                        require(page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'O-4','no root horizontal overflow after each action')
                        require(time.monotonic()-case_start<180,'O-7','case progress within 180 seconds')
                        log.append({'action':label,'at':time.monotonic(),'url':page.url,'stateHash':digest(data),'modals':page.locator('.modal-overlay').count()})
                        return data

                    def click(locator,label='',double=False):
                        locator=locator.first
                        require(locator.is_visible() and locator.is_enabled(),'O-2','visible enabled command',label)
                        locator.scroll_into_view_if_needed()
                        bounds=locator.bounding_box();view=page.viewport_size
                        require(bounds and bounds['x']+bounds['width']/2>=0 and bounds['x']+bounds['width']/2<=view['width'] and bounds['y']+bounds['height']/2>=0 and bounds['y']+bounds['height']/2<=view['height'],'O-4','click center in viewport',bounds)
                        hit=locator.evaluate('(el)=>{const r=el.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return el===hit||el.contains(hit)}')
                        require(hit,'O-4','visible command owns its hit point',label)
                        if double:locator.dblclick(delay=rng.randint(0,60))
                        else:locator.click()
                        page.wait_for_timeout(30)
                        obs(label or locator.get_attribute('data-action'))

                    def action(name):return page.locator(f'[data-action="{name}"]')
                    def modal():return page.locator('.modal-overlay').last
                    def accept(label):click(modal().locator('.modal-foot').get_by_role('button',name=label,exact=True),'confirm '+label)
                    def navigate(path):
                        page.goto((ROOT/'index.html').as_uri()+'#'+path)
                        obs('deep-link '+path)
                    def select(locator,value):
                        locator.select_option(value);obs('select '+value)
                    def fill(locator,value):
                        locator.fill(value);obs('fill '+value[:45])

                    obs('fresh launch')
                    if policy=='new-user':
                        click(page.locator('.sidebar a[href="#/sources"]'),'open source list')
                        click(page.get_by_role('link',name='등록',exact=True),'source new')
                        values=[('curriculum','22'),('school','중학교'),('subjectGroup','수학'),('subject','수학 1'),('grade','중2'),('semester','2학기'),('book','단원 평가'),('volume','워크북'),('year',str(2030+seed%10)),('usage','C')]
                        for key,value in values:select(page.locator(f'[data-bind="{key}"]'),value)
                        fill(page.locator('[data-bind=display]'),'신규 예시 '+str(seed))
                        click(page.get_by_role('button',name='저장',exact=True),'source save')
                        require(len(page.evaluate('CMS.db.sources'))==17,'O-2','exactly one source created')
                        click(page.get_by_role('link',name='수정',exact=True),'edit created source')
                        fill(page.locator('[data-bind=remark]'),'첫 저장 이후 수정')
                        click(page.get_by_role('button',name='저장',exact=True),'save edited source')
                    elif policy=='masher':
                        navigate('/papers/5001/edit')
                        fill(page.locator('[data-bind=name]'),'연속 저장 '+str(seed))
                        click(action('paper-save'),'double paper save',double=True)
                        saved=page.evaluate('CMS.paper(5001)')
                        require(saved['name']=='연속 저장 '+str(seed) and len(saved['history'])==1,'O-2','one mutation for a rapid double save',saved['history'])
                        if not page.locator('.sidebar a[href="#/items"]').is_visible():
                            click(action('toggle-group'),'expand item management menu')
                        click(page.locator('.sidebar a[href="#/items"]'),'navigate after rapid save')
                        click(page.locator('a[href="#/items/2100001"]'),'item detail')
                        click(action('item-twins'),'open relation modal',double=True)
                        require(page.locator('.modal-overlay').count()==1,'O-4','no duplicated modal or leaked second click')
                        accept('닫기')
                    elif policy=='draft-resume':
                        navigate('/items/2100001/edit/meta')
                        level=rng.choice(['상','중','최상']);select(page.locator('[data-bind=difficulty]'),level)
                        click(action('item-temp'),'save draft before cold restart');accept('임시 저장')
                        before=page.evaluate('CMS.item(2100001).draft')
                        ctx.tracing.stop();ctx.close()
                        ctx=p.chromium.launch_persistent_context(profile.name,channel='chrome',headless=True,viewport={'width':1440,'height':900},offline=True)
                        ctx.tracing.start(screenshots=True,snapshots=True,sources=True)
                        page=ctx.new_page();page.set_default_timeout(15000);observe_page(page)
                        page.goto((ROOT/'index.html').as_uri()+'#/items/2100001')
                        require(digest(before)==digest(page.evaluate('CMS.item(2100001).draft')),'O-8','same saved draft after closing and relaunching Chrome')
                        click(action('item-edit'),'first edit command after cold launch');accept('임시저장 수정하기')
                        expect(page.locator('[data-bind=difficulty]')).to_have_value(level)
                        click(action('item-apply'),'apply after cold launch');accept('저장')
                        require(page.evaluate('CMS.item(2100001).difficulty')==level,'O-8','resumed value applied')
                    elif policy=='interruptions':
                        navigate('/items/2100001')
                        click(action('item-edit'),'start edit')
                        select(page.locator('[data-bind=difficulty]'),'최하')
                        other=ctx.new_page();observe_page(other);other.goto((ROOT/'index.html').as_uri());other.bring_to_front();page.wait_for_timeout(100);page.bring_to_front();other.close()
                        obs('real page focus loss and regain')
                        page.go_back();page.wait_for_timeout(80)
                        require(page.locator('.modal-overlay').count()>0,'O-10','back navigation prompts with unsaved input')
                        accept('취소');expect(page.locator('[data-bind=difficulty]')).to_have_value('최하')
                        click(action('item-temp'),'save after focus and back interruption');accept('임시 저장')
                    elif policy=='resize':
                        navigate('/hml/6002')
                        for width in rng.sample([320,390,760,1280,1600],5):
                            page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(60)
                            require(page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'O-4','no root horizontal overflow',width)
                            click(action('doc-approve'),'approval modal at '+str(width));accept('취소')
                        page.screenshot(path=str(OUT/f'resize-{iteration}-{seed}.png'),full_page=True)
                    elif policy=='slow-user':
                        navigate('/items/2100001')
                        click(action('twin-generate'),'open generation before idle')
                        page.wait_for_timeout(200+rng.randint(0,200));accept('생성 시작')
                        page.wait_for_timeout(1300)
                        data=obs('generation completed after idle')
                        require(not page.evaluate('CMS.item(2100001).working'),'O-7','generation finishes')
                        require(len(page.evaluate('CMS.item(2100001).generationHistory'))==1,'O-2','one completed request')
                        click(action('twin-history'),'first command after completion');accept('닫기')
                    elif policy=='monkey':
                        paths=['/items','/hml','/definition','/papers','/sources','/twins','/lab','/lab/math','/lab/omr','/lab/restore']
                        for path in rng.sample(paths,8):
                            navigate(path)
                            if page.locator('[data-form=filter]').count():
                                f=page.locator('[data-form=filter]');q=f.locator('[name=q]')
                                if q.count():fill(q,rng.choice(['존재하지않음','210','예시','']))
                                click(f.get_by_role('button',name='조회',exact=True),'query '+path)
                        navigate('/items/2100001')
                        click(action('item-twins'),'open twins during exploration')
                        page.keyboard.press('Escape');obs('Escape modal dismissal')
                        require(page.locator('.modal-overlay').count()==0,'O-4','Escape consumes modal only')
                    elif policy=='localization':
                        navigate('/papers/5001/edit')
                        text=('긴 한국어 평가지 이름과 괄호 (검수용) · '+str(seed)+' ')*20
                        fill(page.locator('[data-bind=name]'),text)
                        visible=page.locator('[data-bind=name]').input_value()
                        require(len(visible)<=255,'O-10','255-character name limit')
                        click(action('paper-save'),'save long Korean title')
                        require(page.evaluate('CMS.paper(5001).name')==visible,'O-8','displayed Korean value persisted exactly')
                        navigate('/sources/8001/edit')
                        fill(page.locator('[data-bind=display]'),'한글 표시명 '+str(seed)+' 수학')
                        click(page.get_by_role('button',name='저장',exact=True),'save Korean display name')
                    elif policy=='reduced-motion':
                        navigate('/items/2100001/edit/omr')
                        click(action('omr-preview'),'preview without animation')
                        preview=page.frame_locator('.native-omr-preview-frame')
                        preview.get_by_role('button',name='3',exact=True).wait_for()
                        click(preview.get_by_role('button',name='3',exact=True),'student answer under reduced motion')
                        click(preview.get_by_role('button',name='채점하기',exact=True),'grade native preview')
                        expect(preview.locator('.omr-preview__result')).to_contain_text('정답입니다.')
                        accept('닫기')
                        select(page.locator('[data-type-level="1"]'),'주관식')
                        click(action('omr-preview'),'empty text preview validation')
                        require(page.locator('.modal-overlay').count()==1,'O-3','ready modal without motion')
                        accept('닫기')
                    elif policy=='two-sessions':
                        navigate('/sources/8001/edit')
                        fill(page.locator('[data-bind=remark]'),'첫 번째 탭 미저장 입력 '+str(seed))
                        second=ctx.new_page();observe_page(second);second.goto((ROOT/'index.html').as_uri()+'#/sources/8001/edit')
                        second.locator('[data-bind=display]').fill('두 번째 탭 저장 '+str(seed))
                        second.get_by_role('button',name='저장',exact=True).click();expect(second.locator('h1')).to_have_text('출처 상세')
                        page.bring_to_front();page.wait_for_timeout(100)
                        click(page.get_by_role('button',name='저장',exact=True),'attempt stale first-tab save')
                        expect(modal()).to_contain_text('다른 탭의 변경 확인')
                        accept('계속 확인')
                        expect(page.locator('[data-bind=remark]')).to_have_value('첫 번째 탭 미저장 입력 '+str(seed))
                        stored=page.evaluate('JSON.parse(localStorage.getItem("master-cms-offline-mock-v1"))')
                        require(next(s for s in stored['sources'] if s['id']==8001)['display']=='두 번째 탭 저장 '+str(seed),'O-10','stale save did not overwrite second tab')
                        click(page.get_by_role('button',name='저장',exact=True),'reopen conflict recovery');accept('최신 데이터 불러오기')
                        expect(page.locator('[data-bind=display]')).to_have_value('두 번째 탭 저장 '+str(seed))
                        second.close()

                    state=obs('terminal observation');logical=digest(state);key=f'{policy}-{seed}'
                    if iteration==1:hashes[key]=logical
                    else:require(hashes[key]==logical,'O-6','same normalized logical outcome on replay',{'first':hashes[key],'second':logical})
                    results.append({'pass':iteration,'policy':policy,'seed':seed,'status':'passed','steps':len(log),'seconds':round(time.monotonic()-case_start,2),'hash':logical})
                    ctx.tracing.stop()
                    (OUT/(name+'.jsonl')).write_text('\n'.join(json.dumps(r,ensure_ascii=False) for r in log)+'\n',encoding='utf-8')
                    print('PASS',name,len(log),'steps',flush=True)
                except Exception as error:
                    case_dir.mkdir(exist_ok=True)
                    if page:
                        try:
                            page.screenshot(path=str(case_dir/'failure.png'),full_page=True)
                            (case_dir/'state.json').write_text(json.dumps({'db':page.evaluate('CMS.db'),'edit':page.evaluate('CMS.edit'),'storage':page.evaluate('({...localStorage})')},ensure_ascii=False,indent=2),encoding='utf-8')
                        except Exception:pass
                    try:ctx.tracing.stop(path=str(case_dir/'trace.zip'))
                    except Exception:pass
                    bundle={'pass':iteration,'policy':policy,'seed':seed,'status':'failed','error':str(error),'trace':traceback.format_exc(),'actions':log,'runtimeErrors':runtime,'httpRequests':http}
                    (case_dir/'failure.json').write_text(json.dumps(bundle,ensure_ascii=False,indent=2),encoding='utf-8');results.append(bundle)
                    print('FAIL',name,str(error)[:350],flush=True)
                finally:
                    if ctx:
                        try:ctx.close()
                        except Exception:pass
                    if profile:
                        try:profile.cleanup()
                        except Exception:pass
                if time.monotonic()-start>1200:break
            if time.monotonic()-start>1200:break
        if time.monotonic()-start>1200:break
    browser.close()

report={**manifest,'runAt':time.strftime('%Y-%m-%d %H:%M:%S'),'cases':results,'passed':sum(r['status']=='passed' for r in results),'failed':sum(r['status']=='failed' for r in results),'expectedCases':len(SEEDS)*len(POLICIES)*2,'steps':sum(r.get('steps',0) for r in results),'seconds':round(time.monotonic()-start,2),'remainingLimits':['실제 CMS·HML/ZIP 파서·AI·서비스 채점·필기 인식은 모의 처리 범위입니다.','전 프레임, 실제 OS IME·소프트 키보드·실기기 검증은 수행하지 않았습니다.','71개 변형 전부의 픽셀 비교와 모든 입력 조합을 검증하지 않았습니다.']}
(OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:report[k] for k in ['passed','failed','expectedCases','steps','seconds']},ensure_ascii=False),flush=True)
if report['failed'] or len(results)!=report['expectedCases']:raise SystemExit(1)
