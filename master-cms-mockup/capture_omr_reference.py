"""Capture each native card at exactly the width of its preserved reference crop."""
from pathlib import Path
import json,html
from PIL import Image
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'verification'/'omr-reference';OUT.mkdir(parents=True,exist_ok=True)
rows=[]
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    ctx=browser.new_context(offline=True,viewport={'width':1800,'height':1100})
    page=ctx.new_page();errors=[];http=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('request',lambda r:http.append(r.url) if r.url.startswith(('http:','https:')) else None)
    page.goto((ROOT/'index.html').as_uri()+'#/lab/omr');page.wait_for_selector('h1')
    page.locator('[data-gallery-width]').select_option('wide')
    page.locator('[data-action=gallery-open][data-group=all]').click()
    for code in page.evaluate('Object.keys(CMS.OMR.types)'):
        ref=ROOT.parent/'design-specs/revision-captures'/('gallery-'+code+'.png')
        width,height=Image.open(ref).size
        card=page.locator('[data-gallery-type="'+code+'"] .source-omr>.card').first
        delta=page.viewport_size['width']-card.bounding_box()['width']
        page.set_viewport_size({'width':round(width+delta),'height':1100})
        page.wait_for_timeout(60)
        box=card.bounding_box();assert abs(box['width']-width)<2,(code,box,width)
        card.screenshot(path=str(OUT/(code+'.png')))
        rows.append({'type':code,'reference':'../design-specs/revision-captures/gallery-'+code+'.png','capture':'verification/omr-reference/'+code+'.png','referenceSize':[width,height],'mockSize':[round(box['width']),round(box['height'])],
          'controls':card.locator('input,select,button,textarea,math-field').evaluate_all('(xs)=>xs.filter(x=>x.getClientRects().length).map(x=>({tag:x.tagName,type:x.type||"",text:x.textContent.slice(0,50),placeholder:x.getAttribute("placeholder")||x.getAttribute("data-placeholder")||"",disabled:x.disabled||false}))')})
        print('CAPTURE',code,rows[-1]['referenceSize'],rows[-1]['mockSize'],flush=True)
    assert not errors,errors
    assert not http,http
    browser.close()
(OUT/'report.json').write_text(json.dumps({'cards':rows,'runtimeErrors':errors,'httpRequests':http},ensure_ascii=False,indent=2),encoding='utf8')
options=''.join('<option value="'+str(k)+'">'+r['type']+'</option>' for k,r in enumerate(rows))
doc='''<!doctype html><meta charset="utf-8"><title>OMR 14개 유형 원본 대조</title><style>body{margin:0;background:#f6f7f9;font:14px "Malgun Gothic",sans-serif}header{position:sticky;top:0;background:white;padding:16px}main{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px}img{width:100%;display:block}h2{font-size:14px}p{margin:8px 0}select{padding:8px}</style><header><b>OMR 14개 유형 · 같은 카드 너비로 대조</b> <select id="pick">OPTIONS</select><p>왼쪽은 개발계 원본, 오른쪽은 목업입니다. 값은 예시 데이터입니다. 이미지 클릭 시 실제 크기로 열립니다.</p></header><main><section><h2>원본</h2><a id="ra" target="_blank"><img id="reference"></a></section><section><h2>목업</h2><a id="ma" target="_blank"><img id="mock"></a></section></main><script>const rows=ROWS;function show(){const r=rows[+pick.value];reference.src=r.reference;ra.href=r.reference;mock.src=r.capture;ma.href=r.capture}pick.onchange=show;show()</script>'''.replace('OPTIONS',options).replace('ROWS',json.dumps(rows,ensure_ascii=False))
(ROOT/'OMR_유형_대조.html').write_text(doc,encoding='utf8')
