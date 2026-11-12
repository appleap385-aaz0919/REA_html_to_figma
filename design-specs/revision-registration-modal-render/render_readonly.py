"""Render inert, preserved modal DOMs without connecting to a user browser."""
from __future__ import annotations

import copy
import hashlib
import json
import math
import re
from pathlib import Path

from bs4 import BeautifulSoup
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
MAPPING = ROOT / "design-specs/revision-registration-modal-assets.json"
CACHE = ROOT / "design-specs/revision-item-modal-render/css"


def rel(p):
    return Path(p).resolve().relative_to(ROOT).as_posix()


def digest(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def source(name):
    return "cms-knowledge/master-cms/sources/" + name


def load_json(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))


def css_file(url):
    name = url.rsplit("/", 1)[-1]
    matches = list(CACHE.glob("*-" + name))
    if matches:
        return matches[0]
    for item in load_json(OUT / "css/static-css-provenance.json"):
        if item["originalUrl"] == url and item.get("file"):
            return ROOT / item["file"]
    raise FileNotFoundError(url)


def make_document(src, selector, variant_id):
    srcpath = ROOT / src
    soup = BeautifulSoup(srcpath.read_text(encoding="utf-8"), "html.parser")
    original = soup.select_one(selector)
    if original is None:
        raise ValueError((src, selector))
    modal = copy.deepcopy(original)
    removed = {"scripts": 0, "eventAttributes": 0, "activeRequestAttributes": 0}
    for x in modal.select("script,iframe,object,embed"):
        removed["scripts"] += 1
        x.decompose()
    for x in [modal, *modal.select("*")]:
        for a in list(x.attrs):
            if a.lower().startswith("on"):
                del x[a]
                removed["eventAttributes"] += 1
            elif a.lower().startswith(("hx-", "data-hx-")) or a.lower() in ("action", "formaction"):
                del x[a]
                removed["activeRequestAttributes"] += 1
        for a in ("href", "src"):
            v = str(x.get(a, ""))
            if v.lower().startswith("javascript:"):
                del x[a]
        if x.name == "form":
            x["action"] = "#"
        if x.name == "img" and x.get("src", "").startswith(("http:", "https:", "/")):
            x["data-preserved-src"] = x["src"]
            del x["src"]
    # The changes below select preserved UI states only; no original listener runs.
    modal["class"] = [x for x in modal.get("class", []) if x != "fade"]
    if "show" not in modal["class"]:
        modal["class"].append("show")
    modal["style"] = "display:block;"
    modal["aria-hidden"] = "false"
    modal["aria-modal"] = "true"
    if variant_id == "add-search":
        for tab in modal.select('[role="tab"]'):
            active = tab.get("data-bs-target") == "#twinAddPane"
            tab["class"] = [c for c in tab.get("class", []) if c != "active"] + (["active"] if active else [])
            tab["aria-selected"] = str(active).lower()
        for pane in modal.select('.tab-pane'):
            active = pane.get("id") == "twinAddPane"
            pane["class"] = [c for c in pane.get("class", []) if c not in ("active", "show")] + (["active", "show"] if active else [])
    if variant_id in ("copy-single", "copy-set", "ai-single"):
        wanted = "AI" if variant_id == "ai-single" else "COPY"
        for radio in modal.select('input[type="radio"]'):
            if str(radio.get("value", "")).upper() == wanted:
                radio["checked"] = "checked"
            elif "checked" in radio.attrs:
                del radio["checked"]
    css_sources = []
    styles = []
    for link in soup.select('link[rel="stylesheet"]'):
        url = link.get("href", "")
        if not url:
            continue
        path = css_file(url)
        css_sources.append({"declaredUrl": url, "localPath": rel(path), "sha256": digest(path)})
        styles.append(path.read_text(encoding="utf-8"))
    for style in soup.select("style"):
        styles.append(style.get_text())
    # Inert document: local fonts are permitted; any remote request is aborted.
    # This override only removes animation and makes the already selected root visible.
    styles.append("html,body{margin:0;min-height:100%;}body{background:#f6f8fb;}"
                  ".modal{display:block!important;} .modal-backdrop{opacity:.5;}"
                  "*,*::before,*::after{animation:none!important;transition:none!important;}")
    markup = '<!doctype html><html lang="ko"><head><meta charset="utf-8">'
    markup += '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\' file:; font-src data: file:; img-src data: file:; script-src \'none\'; connect-src \'none\'; form-action \'none\'">'
    markup += "<style>" + "\n".join(styles) + "</style></head><body class=\"modal-open\">"
    markup += '<div class="modal-backdrop show"></div>' + str(modal) + "</body></html>"
    assert not BeautifulSoup(markup, "html.parser").select("script")
    return markup, css_sources, removed, {
        "sourceHtml": src, "sourceHtmlSha256": digest(srcpath), "selector": selector,
        "title": modal.select_one(".modal-title").get_text(" ", strip=True) if modal.select_one(".modal-title") else None,
        "dialogClass": " ".join(modal.select_one(".modal-dialog").get("class", [])),
        "stateSelection": "preserved DOM classes/checked attributes only; original handlers were removed",
    }


ELEMENTS_JS = r"""root => {
  const r2 = r => ({x:+r.x.toFixed(2),y:+r.y.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2)});
  const intersect = (a,b) => {const x=Math.max(a.x,b.x),y=Math.max(a.y,b.y);return {x,y,width:Math.max(0,Math.min(a.x+a.width,b.x+b.width)-x),height:Math.max(0,Math.min(a.y+a.height,b.y+b.height)-y)}};
  const rootRect=root.getBoundingClientRect(), viewport={x:0,y:0,width:innerWidth,height:innerHeight};
  const els=[...root.querySelectorAll('button,input,select,textarea,[role="tab"],table')];
  return els.flatMap((e,i) => {
    const cs=getComputedStyle(e);let rect=e.getBoundingClientRect(),proxy=false;
    if(e.matches('input[type="radio"],input[type="checkbox"]')&&(+cs.opacity===0||rect.width<2||rect.height<2)){
      const wrap=e.closest('label');const visual=wrap?.querySelector('.form-selectgroup-label')||wrap;
      if(visual){rect=visual.getBoundingClientRect();proxy=true;}
    }
    if(cs.display==='none'||cs.visibility==='hidden'||(+cs.opacity===0&&!proxy)||!rect.width||!rect.height||e.type==='hidden')return [];
    let vis=intersect(intersect(rect,rootRect),viewport);
    for(let p=e.parentElement;p&&p!==document.body;p=p.parentElement){
      const s=getComputedStyle(p),r=p.getBoundingClientRect();
      if(/auto|hidden|scroll|clip/.test(s.overflowX))vis=intersect(vis,{x:r.x+p.clientLeft,y:vis.y,width:p.clientWidth,height:vis.height});
      if(/auto|hidden|scroll|clip/.test(s.overflowY))vis=intersect(vis,{x:vis.x,y:r.y+p.clientTop,width:vis.width,height:p.clientHeight});
    }
    if(vis.width<1||vis.height<1)return [];
    const labelFor=e.id?root.querySelector('label[for="'+CSS.escape(e.id)+'"]'):null;
    let label=e.getAttribute('aria-label')||labelFor?.innerText||(proxy?e.closest('label')?.innerText:null)||e.getAttribute('title')||e.getAttribute('placeholder');
    if(!label&&e.tagName==='TABLE')label=[...e.querySelectorAll('thead th')].map(x=>x.innerText.trim()).join(' | ');
    if(!label)label=(e.innerText||e.value||e.name||e.id||'').trim();
    return [{index:i,tag:e.tagName.toLowerCase(),id:e.id||null,name:e.name||null,role:e.getAttribute('role'),label:label.replace(/\s+/g,' ').trim().slice(0,700),bbox:r2(vis),unclippedBBox:r2(rect),modalLocalBBox:r2({x:vis.x-rootRect.x,y:vis.y-rootRect.y,width:vis.width,height:vis.height}),partlyClipped:Math.abs(vis.width-rect.width)>1||Math.abs(vis.height-rect.height)>1,visualLabelProxy:proxy,disabled:!!e.disabled,...(e.matches('input,select,textarea')?{type:e.type||null,value:e.value,checked:e.type==='radio'||e.type==='checkbox'?e.checked:null}:{}),...(e.getAttribute('role')==='tab'?{selected:e.getAttribute('aria-selected'),target:e.getAttribute('data-bs-target')}:{}),...(e.tagName==='TABLE'?{rowCount:e.querySelectorAll('tbody tr').length}: {})}];
  });
}"""


def main():
    doc = load_json(MAPPING)
    plan_digest = digest(ROOT / doc["sourcePlan"])
    assert plan_digest == doc["sourcePlanSha256"]
    overrides = {
        "current-set": (source("own-set-copy2089358-twin-current-20261110.html"), "#itemTwinModal"),
        "add-search": (source("qa-twin-add-candidates-20261109.html"), "#itemTwinModal"),
        "copy-set": (source("own-set2089242-approved-twin-dialog-20261110.html"), "#twinGenerateModal"),
    }
    renders = []
    failures = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        context = browser.new_context(viewport={"width": 1810, "height": 1600}, device_scale_factor=1)
        context.route(re.compile(r"^https?://"), lambda route: route.abort())
        for modal in doc["modals"]:
            for var in modal["variants"]:
                slug = modal["modalId"].lower() + "--" + var["id"]
                comp = doc["components"][var["componentRef"]]
                src, selector = overrides.get(var["id"], (comp["html"], comp["selector"]))
                try:
                    markup, css, removed, info = make_document(src, selector, var["id"])
                    htmlpath = OUT / (slug + ".html")
                    htmlpath.write_text(markup, encoding="utf-8")
                    page = context.new_page()
                    page.goto(htmlpath.as_uri(), wait_until="load")
                    page.evaluate("document.fonts.ready")
                    page.wait_for_timeout(100)
                    locator = page.locator(selector + " .modal-content")
                    box = locator.bounding_box()
                    if not box:
                        raise ValueError("modal content has no bounding box")
                    viewport = page.viewport_size
                    if box["height"] + box["y"] > viewport["height"]:
                        page.set_viewport_size({"width": 1810, "height": min(3000, int(box["height"] + box["y"] + 100))})
                        box = locator.bounding_box()
                    fullpath = OUT / (slug + "--full.png")
                    croppath = OUT / (slug + ".png")
                    page.screenshot(path=str(fullpath), full_page=True)
                    locator.screenshot(path=str(croppath))
                    elements = locator.evaluate(ELEMENTS_JS)
                    crop_size = Image.open(croppath).size
                    geometry = {"provenance": "preserved-dom-readonly", "fullPng": rel(fullpath), "modalPng": rel(croppath),
                                "coordinateSystem": "fullPng top-left origin, CSS pixels, deviceScaleFactor 1",
                                "viewport": page.viewport_size, "modalBBox": box,
                                "cropRasterSize": {"width": crop_size[0], "height": crop_size[1]}, "elements": elements}
                    bboxpath = OUT / (slug + "--bbox.json")
                    bboxpath.write_text(json.dumps(geometry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                    capture = {"id": slug, "provenance": "preserved-dom-readonly", **info,
                               "html": rel(htmlpath), "htmlSha256": digest(htmlpath),
                               "capture": rel(fullpath), "captureSha256": digest(fullpath),
                               "crop": rel(croppath), "cropSha256": digest(croppath),
                               "bboxJson": rel(bboxpath), "bbox": box,
                               "cropRasterSize": {"width": crop_size[0], "height": crop_size[1]}, "elementCount": len(elements),
                               "originalScriptsExecuted": False, "userBrowserConnection": False,
                               "css": css, "removed": removed, "directlyViewed": False,
                               "limitations": ["This is a local read-only reconstruction from preserved DOM, not a new CMS runtime capture.",
                                               "No data fetch, search, save, approval or deletion was executed. Preserved dynamic data may be empty or stale."]}
                    if selector in ("#productSearchModal", "#unitSearchModal"):
                        capture["limitations"].append("The preserved form contains the initial result container; original result-table screenshots remain the runtime evidence.")
                        capture["captureRole"] = "initial-state-layout"
                    elif selector in ("#twinHistoryModal", "#draftLoadModal"):
                        capture["captureRole"] = "template-layout-only"
                        capture["stateMatchesVariant"] = False
                        capture["limitations"].append("The preserved template lacks the dynamically inserted history rows or document title. Do not use this render as evidence for those runtime values.")
                    else:
                        capture["captureRole"] = "preserved-state-layout"
                        capture["stateMatchesVariant"] = True
                    renders.append(capture)
                    var["renderCapture"] = slug
                    var["renderSource"] = {"html": src, "selector": selector, "provenance": "preserved-dom-readonly"}
                    page.close()
                except Exception as exc:
                    failures.append({"modal": modal["modalId"], "variant": var["id"], "error": repr(exc)})
        browser.close()
    doc["renderedCaptures"] = renders
    doc["renderFailures"] = failures
    doc["styles"]["preservedLocalCssFiles"] = sorted({x["localPath"] for c in renders for x in c["css"]})
    doc["styles"]["localCssBytesAvailable"] = True
    doc["styles"]["retrieval"] = load_json(OUT / "css/static-css-provenance.json")
    doc["styles"]["limitation"] = "보존된 CSS 캐시와 원본 HTML의 해시 URL에서 받은 정적 CSS를 사용했습니다. 아이콘 CSS의 폰트 URL은 기존 로컬 캐시에 연결되어 있습니다. 브라우저에서는 외부 네트워크 요청을 모두 차단했습니다."
    doc["readOnlyRenderRecipe"]["browser"] = "A new standalone headless Chrome process with a temporary Playwright profile; no CDP or user-profile connection."
    doc["readOnlyRenderRecipe"]["interactiveElementGeometry"] = "Each bbox JSON lists visible button/input/select/textarea/tab/table elements with labels, tags, IDs and coordinates in the full PNG."
    doc["observedTabs"][0]["tabs"][0]["selector"] = '#itemTwinModal [role="tab"][data-bs-target="#twinCurrentPane"]'
    doc["observedTabs"][0]["tabs"][1]["selector"] = "#itemTwinModal #twinAddTabBtn"
    doc["observedTabs"][0]["tabs"][0]["renderCaptures"] = [c["id"] for c in renders if c["id"].endswith(("--current-single", "--current-set"))]
    doc["observedTabs"][0]["tabs"][1]["renderCaptures"] = [c["id"] for c in renders if c["id"].endswith("--add-search")]
    MAPPING.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"renders": len(renders), "failures": failures, "mapping": rel(MAPPING)}, ensure_ascii=True))


if __name__ == "__main__":
    main()
