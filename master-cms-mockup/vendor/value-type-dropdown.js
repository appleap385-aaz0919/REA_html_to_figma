// value_type 드롭다운 — native <select> 대체, 옵션은 setOptions 로 외부 주입, 선택값 = 옵션 value(select 와 동일 계약)이고 표시만 value_type 대로 렌더(수식·이미지). 개수 제한은 사용처
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // 값 1개를 value_type 대로 HTML 렌더
  function renderVal(label, vt) {
    var v = label == null ? "" : String(label);
    if (vt === "math") {
      if (v && window.MathLive && MathLive.convertLatexToMarkup) {
        try { return MathLive.convertLatexToMarkup(v); } catch (e) { return esc(v); }
      }
      return v ? esc(v) : '<span class="text-secondary">(빈 값)</span>';
    }
    if (vt === "image") {
      if (!v) return '<span class="text-secondary">(빈 이미지)</span>';
      return '<img class="vtd-thumb" src="' + esc(v) + '" alt="">'; // 깨지면 엑박 그대로(폴백 없음)
    }
    return v ? esc(v) : '<span class="text-secondary">(빈 값)</span>';
  }

  function optionsOf(cell) { return cell._vtdOptions || []; }
  function findOpt(cell, val) {
    var opts = optionsOf(cell);
    for (var i = 0; i < opts.length; i++) if (String(opts[i].value) === val) return opts[i];
    return null;
  }

  // 토글(현재 선택) 표시 갱신
  function renderToggle(cell) {
    var cur = cell.querySelector(".vtd-current");
    if (!cur) return;
    var val = cell.dataset.vtdValue || "";
    var o = val === "" ? null : findOpt(cell, val);
    cur.innerHTML = o ? renderVal(o.label, o.value_type) : '<span class="text-secondary">--</span>';
  }

  // 미선택 상태 없음 — 값이 비었거나 목록에 없으면 첫 옵션으로(옵션이 하나도 없을 때만 '' 로 남아 토글 '--')
  function ensureValue(cell) {
    var opts = optionsOf(cell);
    var val = cell.dataset.vtdValue || "";
    if (val !== "" && findOpt(cell, val)) return;
    cell.dataset.vtdValue = opts.length ? String(opts[0].value) : "";
  }

  // 옵션 목록 재구성. 주입된 옵션만(2026-10-15 "선택 안 함" 제거 — 미선택 뜻은 작성자가 옵션으로 직접 만듦)
  function renderMenu(cell) {
    var menu = cell.querySelector(".vtd-menu");
    if (!menu) return;
    var val = cell.dataset.vtdValue || "";
    var html = "";
    optionsOf(cell).forEach(function (o) {
      var v = String(o.value);
      html += '<button type="button" class="dropdown-item vtd-opt' + (v === val ? " active" : "") +
        '" data-value="' + esc(v) + '">' + renderVal(o.label, o.value_type) + "</button>";
    });
    menu.innerHTML = html;
  }

  // API — 옵션 주입(비었거나 현재 선택이 목록에서 사라지면 첫 옵션으로)
  function setOptions(cell, options) {
    cell._vtdOptions = (options || []).map(function (o) {
      return { value: o.value, label: o.label, value_type: o.value_type || "text" };
    });
    ensureValue(cell);
    renderMenu(cell); renderToggle(cell);
  }
  function getValue(cell) { return cell.dataset.vtdValue || ""; }
  function setValue(cell, v) {
    cell.dataset.vtdValue = v == null ? "" : String(v);
    ensureValue(cell);
    renderMenu(cell); renderToggle(cell);
  }

  function initCell(cell) {
    if (!cell._vtdOptions) cell._vtdOptions = [];
    if (cell.dataset.vtdValue == null) cell.dataset.vtdValue = "";
    renderMenu(cell); renderToggle(cell);
  }
  function init(root) { (root || document).querySelectorAll(".vtd-cell").forEach(initCell); }

  // 옵션 선택(위임). 닫기는 Bootstrap 이 처리
  document.addEventListener("click", function (e) {
    var opt = e.target.closest && e.target.closest(".vtd-opt");
    if (!opt) return;
    var cell = opt.closest(".vtd-cell");
    if (!cell) return;
    cell.dataset.vtdValue = opt.getAttribute("data-value") || "";
    renderMenu(cell); renderToggle(cell);
    cell.dispatchEvent(new Event("change", { bubbles: true }));
    cell.dispatchEvent(new CustomEvent("vtd:change", { bubbles: true }));
  });

  // 동적 추가된 .vtd-cell 자동 init
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      for (var i = 0; i < m.addedNodes.length; i++) {
        var n = m.addedNodes[i];
        if (n.nodeType !== 1) continue;
        if (n.matches && n.matches(".vtd-cell")) initCell(n);
        if (n.querySelectorAll) n.querySelectorAll(".vtd-cell").forEach(initCell);
      }
    });
  });

  // 컴포넌트 CSS 1회 주입. 토글 높이는 value-type-input 과 같은 --vt-input-h
  function injectStyle() {
    var st = document.createElement("style");
    st.textContent =
      // 토글은 form 컨트롤처럼 — 모든 상태에서 배경·글자·테두리 유지(회색 채움·그림자 없음)
      ".vtd-toggle{min-height:var(--vt-input-h,48px);border-color:var(--tblr-border-color,#dee2e6)}" +
      ".vtd-toggle:hover,.vtd-toggle:focus,.vtd-toggle:focus-visible,.vtd-toggle.show,.vtd-toggle:active,.vtd-toggle:not(:disabled):active" +
      "{background-color:var(--tblr-bg-forms,#fff)!important;color:inherit!important;border-color:var(--tblr-border-color,#dee2e6)!important;box-shadow:none!important}" +
      ".vtd-menu{max-height:20rem;overflow-y:auto}" +
      ".vtd-thumb{max-height:2rem;max-width:8rem;object-fit:contain;vertical-align:middle}" +
      ".vtd-opt .vtd-thumb{max-height:2.5rem}";
    document.head.appendChild(st);
  }

  function boot() { injectStyle(); init(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);

  window.ValueTypeDropdown = { setOptions: setOptions, getValue: getValue, setValue: setValue, init: init };
})();
