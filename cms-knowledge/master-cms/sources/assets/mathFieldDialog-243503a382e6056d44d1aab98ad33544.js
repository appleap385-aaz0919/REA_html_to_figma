// 수식입력기 다이얼로그 (신규/수정 공용). (프론트 components/math/MathFieldDialog.vue 의 PC 화면을 옮긴 것)
// Figma 수식입력기(1744:40937) 고등 화면. CMS 는 학교급과 관계없이 고등 키패드 하나만 쓴다.
// body 직속 싱글톤. open(latex, level, onConfirm) 로 열고, 적용 시 KaTeX 호환 LaTeX 를 콜백으로 전달.
// level 인자는 예전 호출부 호환용으로만 받는다(무시).
(function () {
  "use strict";

  // MathLive 키캡이 insert 에 쓰는 옵션과 동일 — 삽입 후 포커스·스크롤 유지
  const INSERT_OPTIONS = { focus: true, feedback: true, scrollIntoView: true, mode: "math", format: "latex" };

  const UNDO_ICON =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.5 4 3 6.5 5.5 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 6.5H9a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  const TRASH_ICON =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 7v4M9 7v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  const CLOSE_ICON =
    '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 2 18 18M18 2 2 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  const CHEVRON =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  class MathFieldDialogImpl {
    constructor() {
      this._onConfirm = null;
      this.ink = null;
      this.tab = "keyboard";
      this._build();
    }

    _build() {
      const L = window.MathKeypadLayouts;
      const sizes = Array.from({ length: L.MATRIX_MAX - L.MATRIX_MIN + 1 }, (_, i) => L.MATRIX_MIN + i);
      const options = sizes.map((n) => '<option value="' + n + '">' + n + "</option>").join("");

      const backdrop = document.createElement("div");
      backdrop.className = "math-dialog-backdrop";
      backdrop.style.display = "none";
      backdrop.innerHTML =
        '<div class="math-dialog" role="dialog" aria-modal="true" style="width:' + L.width + 'px">' +
        '  <div class="math-dialog__titlebar">' +
        '    <p class="math-dialog__title">수식입력기</p>' +
        '    <button type="button" class="math-dialog__close" aria-label="닫기">' + CLOSE_ICON + "</button>" +
        "  </div>" +
        '  <div class="math-dialog__content">' +
        '    <div class="math-dialog__bar">' +
        '      <div class="math-dialog__tabs" role="tablist">' +
        '        <button type="button" role="tab" class="math-dialog__tab is-active" data-tab="keyboard">키보드</button>' +
        '        <button type="button" role="tab" class="math-dialog__tab" data-tab="ink">손글씨</button>' +
        "      </div>" +
        '      <p class="math-dialog__hint">텍스트·숫자는 키보드로 직접 입력, 수식 기호는 아래 키패드를 이용하세요</p>' +
        '      <div class="math-dialog__ink-actions" style="display:none">' +
        '        <button type="button" class="math-dialog__ink-btn" data-ink="undo" disabled>' + UNDO_ICON + "한 획 지우기</button>" +
        '        <button type="button" class="math-dialog__ink-btn" data-ink="clear" disabled>' + TRASH_ICON + "전체 지우기</button>" +
        '        <button type="button" class="math-dialog__ink-btn is-primary" data-ink="recognize" disabled>인식하기</button>' +
        "      </div>" +
        "    </div>" +
        '    <div class="math-dialog__keyboard">' +
        '      <math-field class="math-dialog__field" math-virtual-keyboard-policy="manual"></math-field>' +
        '      <div class="math-dialog__keypad"></div>' +
        "    </div>" +
        '    <div class="math-dialog__ink" style="display:none">' +
        '      <div class="math-dialog__ink-host"></div>' +
        '      <div class="math-dialog__result">' +
        '        <p class="math-dialog__result-label">인식 결과</p>' +
        '        <div class="math-dialog__result-box"></div>' +
        '        <span class="math-dialog__error"></span>' +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        '  <div class="math-dialog__actions">' +
        '    <button type="button" class="math-dialog__btn math-dialog__cancel">취소</button>' +
        '    <button type="button" class="math-dialog__btn is-primary math-dialog__confirm">적용</button>' +
        "  </div>" +
        "</div>" +
        // 키패드의 행렬 키가 여는 크기 선택 팝업 (시안 행렬선택-POP-PC)
        '<div class="matrix-dialog-backdrop" style="display:none">' +
        '  <div class="matrix-dialog" role="dialog" aria-modal="true">' +
        '    <div class="matrix-dialog__head">' +
        '      <p class="matrix-dialog__title">행렬 선택</p>' +
        '      <button type="button" class="math-dialog__close matrix-dialog__close" aria-label="닫기">' + CLOSE_ICON + "</button>" +
        "    </div>" +
        '    <div class="matrix-dialog__body">' +
        '      <label class="matrix-dialog__select"><span class="visually-hidden">행</span><select data-matrix="rows">' + options + "</select>" + CHEVRON + "</label>" +
        '      <label class="matrix-dialog__select"><span class="visually-hidden">열</span><select data-matrix="cols">' + options + "</select>" + CHEVRON + "</label>" +
        "    </div>" +
        '    <div class="matrix-dialog__actions"><button type="button" class="matrix-dialog__btn">추가</button></div>' +
        "  </div>" +
        "</div>";
      document.body.appendChild(backdrop);

      const $ = (sel) => backdrop.querySelector(sel);
      this.backdrop = backdrop;
      this.mf = $("math-field");
      this.hint = $(".math-dialog__hint");
      this.keyboardPane = $(".math-dialog__keyboard");
      this.inkPane = $(".math-dialog__ink");
      this.inkHost = $(".math-dialog__ink-host");
      this.inkActions = $(".math-dialog__ink-actions");
      this.resultBox = $(".math-dialog__result-box");
      this.errorEl = $(".math-dialog__error");
      this.tabs = Array.prototype.slice.call(backdrop.querySelectorAll(".math-dialog__tab"));
      this.matrix = {
        backdrop: $(".matrix-dialog-backdrop"),
        rows: $('[data-matrix="rows"]'),
        cols: $('[data-matrix="cols"]'),
      };

      this.keypad = new window.MathKeypad($(".math-dialog__keypad"), (key, upper) => this._onKey(key, upper));

      // 손글씨(잉크) 미로드 페이지는 손글씨 탭 숨김 → 키보드 전용
      if (!window.MathInkCanvas) $('.math-dialog__tab[data-tab="ink"]').style.display = "none";

      // 배경 자기 자신을 누르면 닫기(자식 클릭은 무시)
      backdrop.addEventListener("mousedown", (e) => {
        if (e.target === backdrop) this._cancel();
      });
      backdrop.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        e.stopPropagation();
        if (this.matrix.backdrop.style.display !== "none") this._closeMatrix();
        else this._cancel();
      });
      // 키보드 Enter = [적용], Shift+Enter = 키패드 [줄바꿈] (QITM-182)
      // capture 단계에서 MathLive 보다 먼저 받는다 (MathLive 는 Enter 를 여러 줄이면 행 추가, 아니면 change 이벤트로만 처리)
      backdrop.addEventListener(
        "keydown",
        (e) => {
          if (e.key !== "Enter" || e.isComposing || e.keyCode === 229) return; // 한글 조합 확정은 그대로
          if (e.altKey || e.ctrlKey || e.metaKey || this.matrix.backdrop.style.display !== "none") return;
          if (e.target.closest("button, select, a")) return; // 포커스된 버튼은 그 버튼이 눌리게
          const inField = e.target === this.mf;
          if (inField && this.mf.mode === "latex") return; // \명령 자동완성 확정은 그대로
          if (e.shiftKey && !inField) return;
          e.preventDefault();
          e.stopPropagation();
          if (e.shiftKey) this._insert("\\\\");
          else this._confirm();
        },
        true
      );
      $(".math-dialog__titlebar .math-dialog__close").addEventListener("click", () => this._cancel());
      $(".math-dialog__cancel").addEventListener("click", () => this._cancel());
      $(".math-dialog__confirm").addEventListener("click", () => this._confirm());
      this.tabs.forEach((t) => t.addEventListener("click", () => this._switchTab(t.getAttribute("data-tab"))));

      $('[data-ink="undo"]').addEventListener("click", () => this.ink && (this.ink.undo(), this._syncInkButtons()));
      $('[data-ink="clear"]').addEventListener("click", () => this.ink && (this.ink.clear(), this._syncInkButtons()));
      this.recognizeBtn = $('[data-ink="recognize"]');
      this.recognizeBtn.addEventListener("click", () => this._recognize());
      // 획을 그을 때마다 버튼 활성 상태 갱신
      this.inkHost.addEventListener("pointerup", () => this._syncInkButtons());

      this.matrix.backdrop.addEventListener("mousedown", (e) => {
        if (e.target === this.matrix.backdrop) this._closeMatrix();
      });
      $(".matrix-dialog__close").addEventListener("click", () => this._closeMatrix());
      $(".matrix-dialog__btn").addEventListener("click", () => this._insertMatrix());
    }

    open(latex, _level, onConfirm) {
      this._onConfirm = onConfirm;
      this.errorEl.textContent = "";
      this.resultBox.innerHTML = "";
      this.resultBox.classList.remove("is-filled");
      this.backdrop.style.display = "flex";
      this.keypad.reset();
      this._switchTab("keyboard");

      // 잉크 캔버스(손글씨)는 MathInkCanvas 로드 시에만 새로 생성. 미로드 페이지는 키보드 전용.
      if (window.MathInkCanvas) {
        this.inkHost.innerHTML = "";
        this.ink = new window.MathInkCanvas(this.inkHost);
        this._syncInkButtons();
      }

      // [주의] mathModeSpace 는 프로퍼티로만 반영(MathLive 0.110). 값 주입 + 포커스는 다음 틱
      const mf = this.mf;
      if (window.MathConfig) mf.mathModeSpace = window.MathConfig.spaceLatex;
      mf.value = latex || "";
      setTimeout(() => mf.focus(), 0);
    }

    close() {
      this._closeMatrix();
      this.backdrop.style.display = "none";
    }

    _switchTab(next) {
      this.tab = next;
      this.tabs.forEach((t) => t.classList.toggle("is-active", t.getAttribute("data-tab") === next));
      const keyboard = next === "keyboard";
      // math-field 는 탭 전환 시에도 값 유지 위해 display 토글만
      this.keyboardPane.style.display = keyboard ? "" : "none";
      this.inkPane.style.display = keyboard ? "none" : "";
      this.hint.style.display = keyboard ? "" : "none";
      this.inkActions.style.display = keyboard ? "none" : "";
      if (keyboard) setTimeout(() => this.mf.focus(), 0);
    }

    // ── 키패드 입력 ──
    _insert(latex) {
      this.mf.executeCommand(["insert", latex, INSERT_OPTIONS]);
    }

    _onKey(key, upper) {
      const mf = this.mf;
      switch (key.action) {
        case "left":
          mf.executeCommand("moveToPreviousChar");
          break;
        case "right":
          mf.executeCommand("moveToNextChar");
          break;
        case "backspace":
          mf.executeCommand("deleteBackward");
          break;
        case "enter":
          // MathLive 가 \\ 삽입을 멀티라인(\displaylines) 전환으로 처리함 (실측 확인)
          this._insert("\\\\");
          break;
        case "space":
          this._insert(window.MathConfig ? window.MathConfig.spaceLatex : "\\;");
          break;
        case "matrix":
          this._openMatrix();
          break;
        default:
          this._insert(upper && key.upper ? key.upper : key.insert != null ? key.insert : key.label);
      }
    }

    // ── 행렬 ──
    _openMatrix() {
      this.matrix.rows.value = "2";
      this.matrix.cols.value = "2";
      this.matrix.backdrop.style.display = "flex";
      this.matrix.rows.focus();
    }

    _closeMatrix() {
      if (this.matrix.backdrop.style.display === "none") return;
      this.matrix.backdrop.style.display = "none";
      this.mf.focus();
    }

    _insertMatrix() {
      const latex = window.MathKeypadLayouts.buildMatrixLatex(Number(this.matrix.rows.value), Number(this.matrix.cols.value));
      this.matrix.backdrop.style.display = "none";
      this._insert(latex);
    }

    // ── 손글씨 ──
    _syncInkButtons() {
      const empty = !this.ink || this.ink.isEmpty;
      this.inkActions.querySelectorAll("button").forEach((b) => {
        b.disabled = empty;
      });
    }

    // 손글씨를 줄 단위로 분리해 각각 OCR -> 여러 줄이면 gathered 로 결합. 결과는 입력창에도 넣어 키보드 탭에서 이어서 고칠 수 있게 한다
    async _recognize() {
      if (!this.ink || this.ink.isEmpty) return;
      const blobs = await this.ink.toLineBlobs();
      if (!blobs.length) return;

      this.recognizeBtn.textContent = "인식 중...";
      this.recognizeBtn.disabled = true;
      this.errorEl.textContent = "";
      try {
        const results = await Promise.all(
          blobs.map((blob) => {
            const fd = new FormData();
            fd.append("img", blob, "ink.png");
            // FormData 전송 시 Content-Type 미지정(boundary 자동) + CSRF 헤더만 부착
            return fetch(window.MathConfig.ocrEndpoint, {
              method: "POST",
              body: fd,
              headers: window.MathConfig.csrfHeaders(),
            }).then((r) => {
              if (!r.ok) throw new Error("ocr " + r.status);
              return r.json();
            });
          })
        );
        const latexes = results.map((r) => (r.latex || "").trim()).filter(Boolean);
        const merged =
          latexes.length > 1
            ? "\\begin{gathered}" + latexes.join("\\\\ ") + "\\end{gathered}"
            : latexes[0] || "";
        this.mf.value = merged;
        this.resultBox.innerHTML = merged ? window.MathLive.convertLatexToMarkup(merged) : "";
        this.resultBox.classList.toggle("is-filled", !!merged);
      } catch (e) {
        this.errorEl.textContent = "인식에 실패했습니다. OCR 서버 상태를 확인해 주세요.";
      } finally {
        this.recognizeBtn.textContent = "인식하기";
        this._syncInkButtons();
      }
    }

    _confirm() {
      // MathLive 의 \displaylines 는 KaTeX 미지원 -> gathered 로 변환해 방출 (적용은 입력창 값 기준)
      const latex = window.MathCompat.toKatexCompatLatex(this.mf.value || "");
      const cb = this._onConfirm;
      this.close();
      if (cb) cb(latex);
    }

    _cancel() {
      this.close();
    }
  }

  // 싱글톤 접근자: 첫 open 시점에 생성(MathLive <math-field> 정의 이후 보장)
  let instance = null;
  window.MathFieldDialog = {
    get: function () {
      if (!instance) instance = new MathFieldDialogImpl();
      return instance;
    },
  };
})();
