// 수식입력기 창 안의 키패드 (프론트 components/math/MathKeypad.vue 의 고등 PC 배치를 옮긴 것)
// new MathKeypad(container, onKey) — onKey(key, upper) 로 누른 키만 알리고, 실제 삽입은 다이얼로그가 한다.
// 키를 눌러도 입력창 포커스를 뺏지 않도록 pointerdown 기본 동작을 막는다.
(function () {
  "use strict";

  const LONG_PRESS_MS = 400;
  const KEY_PADDING = 6; // 라벨 맞춤 시 키 안쪽 여유
  const ICON_DIR = "/images/math-keypad/";
  const ICON_FILE = { left: "arrow-left", right: "arrow-right", enter: "enter", backspace: "delete", shift: "shift" };
  const ARIA = { left: "왼쪽", right: "오른쪽", enter: "줄바꿈", backspace: "지우기", shift: "대문자", space: "스페이스", matrix: "행렬" };

  // 라벨은 프론트(MathView.vue)와 같은 KaTeX 로 그려 모양을 맞춘다. MathLive 정적 렌더는 중괄호·행렬을 다르게 그린다
  const toMarkup = (latex) => window.katex.renderToString(latex, { throwOnError: false });

  // span칸 키 = span개 칸 + 그 사이 간격(span-1개)과 같은 폭이 되도록 basis 에 간격을 더한다
  const flexOf = (span, gap) => span + " " + span + " " + Math.max(0, gap * (span - 1)) + "px";

  class MathKeypad {
    constructor(container, onKey) {
      this.onKey = onKey;
      this.tabs = window.MathKeypadLayouts.tabs;
      this.tabIndex = 0;
      this.upper = false;
      this.popup = null;
      this.pressTimer = null;

      this.root = document.createElement("div");
      this.root.className = "keypad";
      container.appendChild(this.root);

      // 목록 밖을 누르면 닫기 / 창 크기가 바뀌면 라벨 다시 맞춤
      this._onOutside = (ev) => {
        if (this.popup && !this.popup.el.contains(ev.target)) this._closePopup();
      };
      document.addEventListener("pointerdown", this._onOutside, true);
      this._resizeObserver = new ResizeObserver(() => this._fitLabels());

      this.render();
    }

    /** 다이얼로그를 다시 열 때 첫 탭·소문자로 */
    reset() {
      this.tabIndex = 0;
      this.upper = false;
      this._closePopup();
      this.render();
    }

    render() {
      const tab = this.tabs[this.tabIndex];
      this.root.innerHTML = "";

      const tabBar = document.createElement("div");
      tabBar.className = "keypad__tabs";
      tabBar.setAttribute("role", "tablist");
      this.tabs.forEach((t, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "keypad__tab" + (i === this.tabIndex ? " is-active" : "");
        b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", String(i === this.tabIndex));
        b.textContent = t.label;
        b.addEventListener("pointerdown", (e) => e.preventDefault());
        b.addEventListener("click", () => {
          this.tabIndex = i;
          this.render();
        });
        tabBar.appendChild(b);
      });
      this.root.appendChild(tabBar);

      const body = document.createElement("div");
      body.className = "keypad__body";
      body.style.gap = (tab.gap || 0) + "px";
      tab.blocks.forEach((block) => body.appendChild(this._block(block)));
      this.root.appendChild(body);

      this._resizeObserver.disconnect();
      this._resizeObserver.observe(body);
      requestAnimationFrame(() => this._fitLabels());
    }

    _block(block) {
      const el = document.createElement("div");
      const fill = block.rowHeight === "fill";
      el.className = "keypad__block" + (fill ? " is-fill" : "") + (fill || block.rowHeight >= 56 ? " is-tall" : "");
      el.style.gap = block.gap + "px";
      el.style.flex = block.width ? "0 1 " + block.width + "px" : "1 1 0";
      block.rows.forEach((row) => {
        const r = document.createElement("div");
        r.className = "keypad__row";
        r.style.gap = block.gap + "px";
        if (!fill) r.style.height = block.rowHeight + "px";
        row.forEach((key) => r.appendChild(this._key(key, block.gap)));
        el.appendChild(r);
      });
      return el;
    }

    _key(key, gap) {
      const b = document.createElement("button");
      b.type = "button";
      b.className =
        "keypad__key" +
        (key.fn ? " is-fn" : "") +
        (key.size ? " is-" + key.size : "") +
        (key.align ? " is-" + key.align : "");
      b.style.flex = flexOf(key.span || 1, gap);
      const label = this.upper && key.upperLabel ? key.upperLabel : key.label;
      b.setAttribute("aria-label", ARIA[key.action] || label);

      if (key.icon) {
        const img = document.createElement("img");
        img.className = "keypad__icon is-" + key.icon;
        img.alt = "";
        img.src = ICON_DIR + (key.icon === "shift" && this.upper ? "shift-press" : ICON_FILE[key.icon]) + ".svg";
        b.appendChild(img);
      } else if (key.text) {
        const s = document.createElement("span");
        s.className = "keypad__text";
        s.textContent = label;
        b.appendChild(s);
      } else {
        const s = document.createElement("span");
        s.className = "keypad__label";
        s.innerHTML = toMarkup(label);
        b.appendChild(s);
      }
      if (key.variants) {
        const mark = document.createElement("img");
        mark.className = "keypad__mark";
        mark.alt = "";
        mark.src = ICON_DIR + "variant-mark.svg";
        b.appendChild(mark);
      }
      b.addEventListener("pointerdown", (ev) => this._onKeyDown(ev, key, b));
      return b;
    }

    // ── 누르기 / 길게 누르기 ──
    _press(key) {
      if (key.action === "shift") {
        this.upper = !this.upper;
        this.render();
        return;
      }
      this.onKey(key, this.upper);
    }

    _onKeyDown(ev, key, target) {
      ev.preventDefault();
      this._closePopup();
      this._stopTracking();
      if (key.variants && key.variants.length) {
        this.pressTimer = setTimeout(() => this._openPopup(key, target), LONG_PRESS_MS);
      }
      this._moveHandler = (e) => {
        if (!this.popup) return;
        const i = this._variantIndexAt(e);
        if (i >= 0) this._hover(i);
      };
      // 길게 누른 채 변형 위로 끌어와 놓으면 그 변형 입력. 제자리에서 놓으면 목록을 띄운 채 탭 선택을 기다린다
      this._upHandler = (e) => {
        this._stopTracking();
        if (!this.popup) {
          this._press(key);
          return;
        }
        const i = this._variantIndexAt(e);
        if (i >= 0) this._pick(this.popup.items[i]);
      };
      window.addEventListener("pointermove", this._moveHandler);
      window.addEventListener("pointerup", this._upHandler);
    }

    _stopTracking() {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
      if (this._moveHandler) window.removeEventListener("pointermove", this._moveHandler);
      if (this._upHandler) window.removeEventListener("pointerup", this._upHandler);
      this._moveHandler = this._upHandler = null;
    }

    _variantIndexAt(ev) {
      const hit = document.elementFromPoint(ev.clientX, ev.clientY);
      const el = hit && hit.closest("[data-variant]");
      return el ? Number(el.dataset.variant) : -1;
    }

    _openPopup(key, target) {
      const r = target.getBoundingClientRect();
      target.classList.add("is-pressed");
      const el = document.createElement("div");
      el.className = "keypad__variants";
      el.style.left = r.left + r.width / 2 + "px";
      el.style.top = r.top - 4 + "px";
      el.addEventListener("pointerdown", (e) => e.preventDefault());
      key.variants.forEach((v, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "keypad__variant" + (i === 0 ? " is-hover" : ""); // 시안: 첫 변형이 선택된 상태로 뜬다
        b.dataset.variant = String(i);
        b.style.width = r.width + "px";
        b.style.height = Math.min(r.height, 38) + "px";
        const s = document.createElement("span");
        s.className = "keypad__label";
        s.innerHTML = toMarkup(v.label);
        b.appendChild(s);
        b.addEventListener("click", () => this._pick(v));
        el.appendChild(b);
      });
      this.root.appendChild(el);
      this.popup = { el: el, items: key.variants, target: target };
    }

    _hover(i) {
      this.popup.el.querySelectorAll(".keypad__variant").forEach((b, j) => b.classList.toggle("is-hover", i === j));
    }

    _closePopup() {
      if (!this.popup) return;
      this.popup.target.classList.remove("is-pressed");
      this.popup.el.remove();
      this.popup = null;
    }

    _pick(v) {
      this._closePopup();
      this.onKey(v, false);
    }

    // 조밀한 키(N(□,□²)·행렬 등)나 좁은 창에서 라벨이 키보다 넓으면 비율대로 줄여 잘리지 않게 한다
    _fitLabels() {
      this.root.querySelectorAll(".keypad__body .keypad__label").forEach((label) => {
        label.style.transform = "";
        const key = label.parentElement;
        if (!key) return;
        const scale = Math.min(1, (key.clientWidth - KEY_PADDING) / label.offsetWidth);
        if (scale > 0 && scale < 1) label.style.transform = "scale(" + scale + ")";
      });
    }
  }

  window.MathKeypad = MathKeypad;
})();
