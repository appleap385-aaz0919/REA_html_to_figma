// value_type 입력 셀 — 인풋(text/math/image) + ⋮ 로 형태 전환(이전 값은 버림), config 는 data-vt-*(type·placeholder·allowed·maxlength·nospace), 허용 밖 ⋮ 항목은 숨기지 않고 disabled
(function () {
  "use strict";

  var ALL = ["text", "math", "image"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  // 형태별 인풋 마크업. math 는 data-placeholder 로 두고 전역 math.js 가 적용
  // math 칸은 바로 타이핑하고, 키패드가 필요하면 Σ 로 수식입력기를 연다(common.js 의 .vt-math-open 위임)
  function inputHtml(type, ph, maxlen) {
    var p = esc(ph);
    if (type === "math") {
      var dp = ph ? ' data-placeholder="' + p + '"' : "";
      return '<div class="input-group vt-math-group"><math-field class="math-answer-field" math-virtual-keyboard-policy="manual"' + dp + '></math-field>' +
        '<span class="input-group-text vt-math-open" role="button" title="수식입력기">Σ</span></div>';
    }
    if (type === "image") {
      return '<div class="input-group"><input type="url" class="form-control vt-image-url" placeholder="' + p + '">' +
        '<span class="input-group-text vt-image-hover" role="button" title="이미지 미리보기"><i class="ti ti-photo"></i></span></div>';
    }
    var ml = maxlen ? ' maxlength="' + esc(maxlen) + '"' : ""; // 길이 제한은 text 칸만
    return '<div class="input-group"><input type="text" class="form-control" placeholder="' + p + '"' + ml + '>' +
      '<span class="input-group-text" title="일반 텍스트 입력"><i class="ti ti-letter-t"></i></span></div>';
  }

  function allowedOf(cell) {
    var a = (cell.getAttribute("data-vt-allowed") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    return a.length ? a : ALL.slice();
  }

  function emitChange(cell) {
    cell.dispatchEvent(new Event("change", { bubbles: true }));       // 모니터/폼 호환
    cell.dispatchEvent(new CustomEvent("vt:change", { bubbles: true })); // 의미적 훅
  }

  // 형태 전환 = 인풋 교체. opts.emit=false 면 이벤트 생략(초기·복원용)
  function setType(cell, type, opts) {
    var allowed = allowedOf(cell);
    if (allowed.indexOf(type) < 0) type = allowed[0];
    cell.setAttribute("data-vt-type", type);
    cell.querySelector(".vt-input").innerHTML = inputHtml(type, cell.getAttribute("data-vt-placeholder"), cell.getAttribute("data-vt-maxlength"));
    cell.querySelectorAll(".vt-type-opt").forEach(function (o) {
      var t = o.getAttribute("data-type");
      var ok = allowed.indexOf(t) >= 0;
      o.disabled = !ok;                         // 비허용=못 누름
      o.classList.toggle("disabled", !ok);
      o.classList.toggle("active", t === type); // 현재 형태 표시
    });
    if (!opts || opts.emit !== false) emitChange(cell);
  }

  // ── 값 API ──
  function activeInput(cell) { return cell.querySelector(".vt-input math-field, .vt-input input"); }
  function getValue(cell) {
    var el = activeInput(cell);
    return { value: el ? (el.value || "") : "", value_type: cell.getAttribute("data-vt-type") || "text" };
  }
  function setValue(cell, data) {
    data = data || {};
    setType(cell, data.value_type || cell.getAttribute("data-vt-type") || "text", { emit: false });
    var el = activeInput(cell);
    if (el) el.value = data.value != null ? data.value : "";
    emitChange(cell);
  }

  function initCell(cell) {
    if (cell.dataset.vtReady === "1") return; // 이미 init — DOM 이동/재삽입(블록 스왑) 시 값·입력 보존
    cell.dataset.vtReady = "1";
    setType(cell, cell.getAttribute("data-vt-type") || "text", { emit: false });
    var iv = cell.getAttribute("data-vt-value"); // 서버렌더 초기값(선택). 있으면 현재 인풋에 주입
    if (iv != null && iv !== "") {
      var el = activeInput(cell);
      if (el) el.value = iv;
    }
  }
  function init(root) {
    (root || document).querySelectorAll(".vt-cell").forEach(initCell);
  }

  // ⋮ 항목 선택 → 전환(위임). disabled 는 무시
  document.addEventListener("click", function (e) {
    var opt = e.target.closest && e.target.closest(".vt-type-opt");
    if (!opt || opt.disabled || opt.classList.contains("disabled")) return;
    var cell = opt.closest(".vt-cell");
    if (cell) setType(cell, opt.getAttribute("data-type"));
  });

  // 공백 금지 셀(data-vt-nospace)의 text 칸. 아니면 null
  function nospaceInput(el) {
    var cell = el.closest && el.closest(".vt-cell");
    return cell && cell.hasAttribute("data-vt-nospace") && el.matches("input[type=text]") ? el : null;
  }
  // 공백 제거 + 커서 위치 유지
  function stripSpace(el) {
    var v = el.value, nv = v.replace(/\s/g, "");
    if (v === nv) return;
    var pos = v.slice(0, el.selectionStart).replace(/\s/g, "").length;
    el.value = nv;
    el.setSelectionRange(pos, pos);
  }

  // 값 입력 시 vt:change 알림(외부가 셀 단위로 받게). 공백 금지 칸은 한글 조합 중이 아닐 때 공백 제거
  document.addEventListener("input", function (e) {
    var cell = e.target.closest && e.target.closest(".vt-cell");
    if (!cell) return;
    if (!e.isComposing && nospaceInput(e.target)) stripSpace(e.target);
    cell.dispatchEvent(new CustomEvent("vt:change", { bubbles: true }));
  });
  document.addEventListener("compositionend", function (e) {
    if (nospaceInput(e.target)) stripSpace(e.target);
  });

  // 공백 금지 칸 붙여넣기 — 공백 뺀 글자를 maxlength 남은 자리만큼 삽입(그냥 두면 공백이 자리를 먹고 잘림)
  document.addEventListener("paste", function (e) {
    var el = nospaceInput(e.target);
    if (!el) return;
    e.preventDefault();
    var t = (e.clipboardData ? e.clipboardData.getData("text") : "").replace(/\s/g, "");
    var room = el.maxLength > 0 ? el.maxLength - (el.value.length - (el.selectionEnd - el.selectionStart)) : t.length;
    el.setRangeText(t.slice(0, Math.max(0, room)), el.selectionStart, el.selectionEnd, "end");
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });

  // 동적 추가된 .vt-cell 자동 init(리프 행 복제 대비)
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      for (var i = 0; i < m.addedNodes.length; i++) {
        var n = m.addedNodes[i];
        if (n.nodeType !== 1) continue;
        if (n.matches && n.matches(".vt-cell")) initCell(n);
        if (n.querySelectorAll) n.querySelectorAll(".vt-cell").forEach(initCell);
      }
    });
  });

  // 컴포넌트 CSS 1회 주입. 전환 시 높이가 안 바뀌게 인풋을 수식입력기에 맞춤
  function injectStyle() {
    var st = document.createElement("style");
    st.textContent =
      ".vt-input .form-control{min-height:var(--vt-input-h,48px)}" +
      ".vt-image-pop{position:fixed;z-index:1080;background:#fff;border:1px solid var(--tblr-border-color,#dee2e6);" +
      "border-radius:8px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,.18);pointer-events:none}" +
      ".vt-image-pop img{display:block;max-width:18rem;max-height:14rem}";
    document.head.appendChild(st);
  }

  // ── 이미지 URL hover 미리보기(팝업 요소는 필요 시 생성) ──
  var pop, popImg;
  function ensurePop() {
    if (pop) return;
    pop = document.createElement("div");
    pop.className = "vt-image-pop d-none";
    popImg = document.createElement("img");
    popImg.alt = "이미지 미리보기";
    pop.appendChild(popImg);
    document.body.appendChild(pop);
  }
  function positionPop(anchor) {
    var r = anchor.getBoundingClientRect();
    var left = Math.min(r.right - pop.offsetWidth, window.innerWidth - pop.offsetWidth - 8);
    var top = r.top - pop.offsetHeight - 8;
    if (top < 8) top = r.bottom + 8;
    pop.style.left = Math.max(8, left) + "px";
    pop.style.top = top + "px";
  }
  document.addEventListener("mouseover", function (e) {
    var icon = e.target.closest && e.target.closest(".vt-image-hover");
    if (!icon) return;
    var grp = icon.closest(".input-group");
    var input = grp && grp.querySelector(".vt-image-url");
    var url = input && input.value.trim();
    if (!url) return;
    ensurePop();
    popImg.src = url;
    pop.classList.remove("d-none");
    positionPop(icon);
    popImg.onload = function () { positionPop(icon); };
  });
  document.addEventListener("mouseout", function (e) {
    if (pop && e.target.closest && e.target.closest(".vt-image-hover")) pop.classList.add("d-none");
  });

  // 렌더된 math-field 높이를 실측해 --vt-input-h 로 노출 — 하드코딩하면 MathLive 버전·폰트 변경 시 text/image 인풋 높이가 어긋난다
  function measureHeight() {
    if (!(window.customElements && customElements.whenDefined)) return;
    customElements.whenDefined("math-field").then(function () {
      var probe = document.createElement("math-field");
      probe.className = "math-answer-field";
      probe.setAttribute("math-virtual-keyboard-policy", "manual");
      probe.style.cssText = "position:absolute;left:-9999px;visibility:hidden;width:200px";
      document.body.appendChild(probe);
      requestAnimationFrame(function () {
        var h = probe.offsetHeight;
        probe.remove();
        if (h) document.documentElement.style.setProperty("--vt-input-h", h + "px");
      });
    });
  }

  function boot() { injectStyle(); measureHeight(); init(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);

  window.ValueTypeInput = { setType: setType, getValue: getValue, setValue: setValue, init: init };
})();
