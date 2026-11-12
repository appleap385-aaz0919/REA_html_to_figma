// 수식 컴포넌트 통합 검증 데모 페이지 와이어링. (pages/math-demo.vue 재작성)
// 4섹션: 하이브리드 에디터 / 단독 답안필드 / KaTeX 렌더 / 샘플 로드·라운드트립.
(function () {
  "use strict";

  const RICH_INIT = "<p>이차방정식의 근의 공식을 수식 버튼으로 삽입해 보세요.</p>";
  const ANSWER_INIT = "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}";

  const $ = (id) => document.getElementById(id);

  // HTML 에서 수식 노드별 {type, latex} 추출
  function extractMathNodes(html) {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    const nodes = doc.querySelectorAll('[data-type="inline-math"],[data-type="block-math"]');
    return Array.prototype.slice.call(nodes).map((el) => ({
      type: el.getAttribute("data-type") === "block-math" ? "block" : "inline",
      latex: el.getAttribute("data-latex") || "",
    }));
  }

  // 수식 노드 LaTeX 값 <-> KaTeX 렌더 비교 테이블 생성
  function buildMathNodesTable(host, html, emptyMsg) {
    const nodes = extractMathNodes(html);
    host.innerHTML = "";
    if (!nodes.length) {
      if (emptyMsg) {
        const p = document.createElement("p");
        p.className = "math-demo__empty";
        p.textContent = emptyMsg;
        host.appendChild(p);
      }
      return;
    }
    const table = document.createElement("table");
    table.className = "math-demo__table";
    table.innerHTML =
      "<thead><tr><th>LaTeX 값</th><th>실제 KaTeX 값 (렌더 결과)</th></tr></thead>";
    const tbody = document.createElement("tbody");
    nodes.forEach((n) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const code = document.createElement("code");
      code.textContent = n.latex;
      td1.appendChild(code);
      const td2 = document.createElement("td");
      window.MathView.render(td2, n.latex, n.type === "block");
      tr.append(td1, td2);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    host.appendChild(table);
  }

  // 읽기전용 렌더(MathHtmlView 대체): 수식 노드를 미리 렌더한 HTML 을 그대로 표시
  function renderHtmlView(host, html) {
    host.innerHTML = window.MathView.prerenderHtml(html || "");
  }

  function init() {
    // --- 1. 하이브리드 에디터 ---
    const mathNodes1 = $("mathNodes1");
    const richOut1 = $("richOut1");
    const htmlView1 = $("htmlView1");
    window.MathRichEditor.create($("mre1"), {
      content: RICH_INIT,
      onChange: function (html) {
        richOut1.textContent = html;
        buildMathNodesTable(mathNodes1, html, "에디터에 삽입된 수식이 없습니다.");
        renderHtmlView(htmlView1, html);
      },
    });

    // --- 2. 단독 답안 입력 + 3. 렌더 전용 ---
    const af = $("answerField");
    const answerLatexOut = $("answerLatexOut");
    const mathView3 = $("mathView3");
    const updateAnswer = (latex) => {
      answerLatexOut.textContent = latex;
      window.MathView.render(mathView3, latex, true);
    };
    const answerPlaceholder = $("answerPlaceholder");
    if (af) {
      af.addEventListener("input", () => updateAnswer(af.value));
      af.value = ANSWER_INIT;
      // placeholder 는 LaTeX 문자열(한글은 \text{} 로 감쌀 것). attribute 가 아니라
      // 프로퍼티로 대입해야 반영된다 (MathLive 0.110)
      if (answerPlaceholder) {
        af.placeholder = answerPlaceholder.value;
        answerPlaceholder.addEventListener("input", () => {
          af.placeholder = answerPlaceholder.value;
        });
      }
    }
    updateAnswer(ANSWER_INIT);

    // --- 4. 실제 문제 로드 -> 편집 -> 라운드트립 ---
    const blockSelect = $("blockSelect");
    const sourceText = $("sourceText");
    const sourceOut = $("sourceOut");
    const convertedOut = $("convertedOut");
    const loadedOut = $("loadedOut");
    const savedOut = $("savedOut");
    const loadedMathNodes = $("loadedMathNodes");
    const htmlView4 = $("htmlView4");

    const editor4 = window.MathRichEditor.create($("mre4"), {
      preserveSourceTags: true,
      onChange: function (html) {
        loadedOut.textContent = html || "(미로드)";
        savedOut.textContent = window.MathRoundtrip.htmlToLatexDelimiters(html) || "(미로드)";
        buildMathNodesTable(loadedMathNodes, html, "");
        renderHtmlView(htmlView4, html);
      },
    });

    const ROLE_LABEL = { question: "문제", answer: "정답", explanation: "해설" };
    const syncSource = (text) => {
      sourceText.value = text || "";
      sourceOut.textContent = text || "";
    };

    // 샘플 로드(static fetch). content.blocks 를 역할별 셀렉트로
    fetch(window.MathConfig.samplesUrl)
      .then((r) => r.json())
      .then((data) => {
        const blocks = (data.content && data.content.blocks) || [];
        blockSelect.innerHTML = "";
        blocks.forEach((b) => {
          const opt = document.createElement("option");
          opt.value = b.blockId;
          opt.textContent = ROLE_LABEL[b.role] || b.role;
          opt.dataset.text = b.text || "";
          blockSelect.appendChild(opt);
        });
        if (blocks.length) syncSource(blocks[0].text || "");
      })
      .catch(() => {
        sourceOut.textContent = "(샘플 로드 실패)";
      });

    blockSelect.addEventListener("change", function () {
      const opt = blockSelect.selectedOptions[0];
      if (opt) syncSource(opt.dataset.text || "");
    });
    sourceText.addEventListener("input", function () {
      sourceOut.textContent = sourceText.value;
    });

    $("loadBtn").addEventListener("click", function () {
      const converted = window.MathRoundtrip.latexDelimitersToHtml(sourceText.value);
      convertedOut.textContent = converted || "(변환 결과 없음)";
      editor4.setContent(converted);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
