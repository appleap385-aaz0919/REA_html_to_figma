// 본문(TinyMCE inline) + 수식(MathLive 다이얼로그) 하이브리드 에디터 팩토리. (components/math/MathRichEditor.vue 재작성)
// 수식 노드 = contenteditable="false" 원자 span/div + data-latex(진실원본) + 내부 KaTeX(표시용).
// TipTap 의 insert/update/onClick 동작을 TinyMCE insertContent/클릭 핸들러로 매핑한다.
// iframe 회피 위해 inline 모드 사용(KaTeX 가 메인 document 에서 렌더되어 크로스도큐먼트 문제 없음).
(function () {
  "use strict";
  const MATH_SELECTOR = '[data-type="inline-math"],[data-type="block-math"]';

  const escAttr = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // 삽입용 수식 노드 HTML(빈 노드를 KaTeX 로 미리 채워 TinyMCE 가 제거하지 않게)
  function buildMathHtml(latex, isBlock) {
    const tag = isBlock ? "div" : "span";
    const type = isBlock ? "block-math" : "inline-math";
    const cls = isBlock ? "math-node math-block" : "math-node math-inline";
    const html =
      "<" + tag + ' data-type="' + type + '" data-latex="' + escAttr(latex) + '" contenteditable="false" class="' + cls + '"></' + tag + ">";
    return window.MathView.prerenderHtml(html);
  }

  // getContent 결과를 TipTap getHTML 과 의미동치인 깨끗한 HTML 로 정리:
  // 수식 노드는 data-type/data-latex 만 남기고(빈 노드), 에디터 부산물(data-mce-*, bogus) 제거.
  function cleanHtml(rawHtml) {
    const doc = new DOMParser().parseFromString(rawHtml, "text/html");
    doc.querySelectorAll(MATH_SELECTOR).forEach((el) => {
      const isBlock = el.getAttribute("data-type") === "block-math";
      const latex = el.getAttribute("data-latex") || "";
      while (el.firstChild) el.removeChild(el.firstChild);
      Array.prototype.slice.call(el.attributes).forEach((a) => {
        if (a.name !== "data-type" && a.name !== "data-latex") el.removeAttribute(a.name);
      });
      el.setAttribute("data-type", isBlock ? "block-math" : "inline-math");
      el.setAttribute("data-latex", latex);
    });
    doc.querySelectorAll("[data-mce-bogus]").forEach((el) => el.remove());
    doc.body.querySelectorAll("*").forEach((el) => {
      Array.prototype.slice.call(el.attributes).forEach((a) => {
        if (a.name.indexOf("data-mce-") === 0) el.removeAttribute(a.name);
      });
    });
    return doc.body.innerHTML;
  }

  // 에디터 1개 생성. opts: { content, preserveSourceTags, onChange(cleanHtml) }
  function create(targetEl, opts) {
    opts = opts || {};
    const onChange = opts.onChange || function () {};
    const dialog = window.MathFieldDialog.get();
    let editorRef = null;

    const config = {
      target: targetEl,
      inline: true,
      license_key: "gpl",
      base_url: window.MathConfig.tinymceBaseUrl,
      suffix: ".min",
      menubar: false,
      statusbar: false,
      branding: false,
      promotion: false,
      toolbar: "bold italic | mathInline mathBlock",
      plugins: "",
      setup: function (editor) {
        editorRef = editor;
        const renderAll = () => window.MathView.renderAllIn(editor.getBody());
        const emit = () => onChange(cleanHtml(editor.getContent()));

        // CMS 는 학교급과 관계없이 고등 키패드 수식입력기 하나를 쓴다
        const openInsert = (type) =>
          function () {
            dialog.open("", "high", function (latex) {
              if (!latex) return;
              // 신규 삽입 — 여러 줄 수식은 인라인 부적합이므로 블록으로 강제
              const isBlock = type === "block" || window.MathCompat.isMultilineLatex(latex);
              editor.insertContent(buildMathHtml(latex, isBlock));
              renderAll();
              emit();
            });
          };

        editor.ui.registry.addButton("mathInline", { text: "수식", tooltip: "수식 입력", onAction: openInsert("inline") });
        editor.ui.registry.addButton("mathBlock", { text: "블록 수식", tooltip: "블록(가운데) 수식 입력", onAction: openInsert("block") });

        editor.on("init", function () {
          if (opts.content) editor.setContent(window.MathView.prerenderHtml(opts.content));
          renderAll();
          emit();
        });
        editor.on("SetContent", function () {
          renderAll();
        });
        // 수식 노드 클릭 -> 다이얼로그로 수정(data-latex 교체 + 재렌더)
        editor.on("click", function (e) {
          const node = e.target && e.target.closest ? e.target.closest(MATH_SELECTOR) : null;
          if (!node) return;
          dialog.open(node.getAttribute("data-latex") || "", "high", function (latex) {
            if (!latex) return;
            node.setAttribute("data-latex", latex);
            window.MathView.renderNode(node);
            emit();
          });
        });
        editor.on("input change Undo Redo NodeChange", emit);
      },
    };

    if (opts.preserveSourceTags) {
      config.custom_elements = window.MathTinyConfig.custom_elements;
      config.extended_valid_elements = window.MathTinyConfig.extended_valid_elements;
      config.valid_children = window.MathTinyConfig.valid_children;
    } else {
      config.extended_valid_elements = window.MathTinyConfig.mathOnlyValidElements;
    }

    window.tinymce.init(config);

    return {
      // 프로그램적으로 콘텐츠 교체(수식 미리 렌더 후 주입). SetContent 핸들러가 렌더, 이어서 emit.
      setContent: function (html) {
        if (!editorRef) return;
        editorRef.setContent(window.MathView.prerenderHtml(html));
        window.MathView.renderAllIn(editorRef.getBody());
        onChange(cleanHtml(editorRef.getContent()));
      },
      getCleanHtml: function () {
        return editorRef ? cleanHtml(editorRef.getContent()) : "";
      },
    };
  }

  window.MathRichEditor = { create: create };
})();
