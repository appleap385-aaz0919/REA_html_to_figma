// 수식입력기 창 안에 그리는 키패드 정의 — 고등 PC 배치 (Figma 문제은행-디자인-최종 > 수식입력기 1744:40937)
// 프론트(douclass_exambank) utils/mathKeypadLayouts.ts 의 고등 PC 탭을 옮긴 것. CMS 는 고등 키패드 하나만 쓴다.
// label: 키 위에 그릴 LaTeX(빈칸은 \square), insert: MathLive 에 넣을 LaTeX
// insert 자리표시: #@(현재 선택 영역), #0(커서), #?(빈칸)
(function () {
  "use strict";

  // ── 키 생성 헬퍼 ──
  const k = (label, insert, opts) => Object.assign({ label: label, insert: insert == null ? label : insert }, opts || {});
  const num = (d) => k(d, d, { size: "lg" });
  const fn = (action, icon, opts) => Object.assign({ label: "", action: action, icon: icon, fn: true }, opts || {});

  const LEFT = fn("left", "left");
  const RIGHT = fn("right", "right");
  const ENTER = fn("enter", "enter");
  const BACKSPACE = fn("backspace", "backspace");

  // ── 공통 키 ──
  const PLUS = k("+", "+", { variants: [k("\\pm")] });
  const EQUAL = k("=", "=", { variants: [k("\\neq"), k("\\fallingdotseq")] });
  const CDOTS = k("\\cdots");
  const SIMILAR = k("\\backsim"); // 모양은 css/math/math-input.css 의 ∽ 글꼴
  // 평행: 시안과 교과서 표기대로 ‖ 대신 // (두 빗금을 붙여 한 기호로 묶는다)
  const PARALLEL = k("\\mathrel{/\\!\\!/}");
  const SIN = k("\\sin", "\\sin", { size: "sm" });
  const COS = k("\\cos", "\\cos", { size: "sm" });
  const TAN = k("\\tan", "\\tan", { size: "sm" });
  const SQUARE = k("\\square");
  const CIRCLE = k("\\bigcirc");
  const TRIANGLE = k("\\triangle");
  const DEGREE = k("{}^{\\circ}", "#@^{\\circ}");

  // 윗줄 (길게: 벡터 화살표 / 양방향 화살표 / 호)
  const OVERLINE = k("\\overline{\\square}", "\\overline{#@}", {
    variants: [
      k("\\overrightarrow{\\square}", "\\overrightarrow{#@}"),
      k("\\overleftrightarrow{\\square}", "\\overleftrightarrow{#@}"),
      k("\\overgroup{\\square}", "\\overgroup{#@}"),
    ],
  });

  // ── 숫자패드 (0이 두 칸) ──
  const NUMPAD = [
    [num("7"), num("8"), num("9"), LEFT],
    [num("4"), num("5"), num("6"), RIGHT],
    [num("1"), num("2"), num("3"), ENTER],
    [Object.assign(num("0"), { span: 2 }), num("."), BACKSPACE],
  ];

  // ── 연산 ──
  const OPERATORS = [
    [PLUS, k("-"), k("\\times"), k("<"), k(">")],
    [k("\\div"), EQUAL, k(":"), k("\\le"), k("\\ge")],
    [
      // 연립 (중괄호로 묶은 두 줄)
      k("\\left\\{\\begin{smallmatrix}\\square\\\\\\square\\end{smallmatrix}\\right.", "\\begin{cases}#0\\\\#?\\end{cases}"),
      k("|\\square|", "\\left|#0\\right|"),
      k("\\%"),
      k("("),
      k(")"),
    ],
    [
      k("\\dfrac{\\square}{\\square}", "\\frac{#@}{#?}", { size: "sm" }),
      k("\\square^{\\square}", "#@^{#?}"),
      k("\\square_{\\square}", "#@_{#?}"),
      k("["),
      k("]"),
    ],
    [
      k("\\sqrt{\\square}", "\\sqrt{#0}", { variants: [k("\\sqrt[\\square]{\\square}", "\\sqrt[#0]{#?}")] }),
      OVERLINE,
      // 행렬: 누르면 행/열 선택 팝업
      k("\\left(\\begin{smallmatrix}\\square&\\square\\\\\\square&\\square\\end{smallmatrix}\\right)", null, { action: "matrix" }),
      k("\\{", "\\{"),
      k("\\}", "\\}"),
    ],
  ];

  // ── 기호 ──
  const SYMBOLS = [
    [k("\\angle"), Object.assign({}, SQUARE, { variants: [CIRCLE, TRIANGLE] }), PARALLEL, SIMILAR, k("\\equiv")],
    [k("\\perp"), k("/", "/"), k("'", "'"), k(",", ","), k("\\pi")],
    // ∉: \notin 은 MathLive 가 글꼴에 없는 한 글자(U+2209)로 그려 깨지므로 ∈ 에 사선을 긋는 \not\in
    [k("\\in"), k("\\not\\in"), k("\\subset"), k("\\not\\subset"), k("i")],
    [k("\\cup"), k("\\cap"), k("\\varnothing"), k("\\circ"), DEGREE],
    [
      k("\\square^{c}", "#@^{c}"), // 여집합
      k("n(\\square)", "n(#0)"), // 원소의 개수
      k("\\to", "\\to", { variants: [k("\\Rightarrow"), k("\\Leftrightarrow")] }),
      k("\\sim", "\\sim", { variants: [k("\\nsim")] }),
      k("|", "\\mid"),
    ],
  ];

  // ── 대수·미적분 ──
  const CALCULUS = [
    [
      k("\\log\\square", "\\log{#0}", { size: "sm", span: 1.5 }),
      k("\\log_{\\square}\\square", "\\log_{#0}{#?}", { size: "sm", span: 1.5 }),
      k("e", "e", { span: 1.5 }),
      Object.assign({}, DEGREE, { span: 1.5 }),
    ],
    [
      Object.assign({}, SIN, { span: 2, variants: [k("\\csc", "\\csc", { size: "sm" })] }),
      Object.assign({}, COS, { span: 2, variants: [k("\\sec", "\\sec", { size: "sm" })] }),
      Object.assign({}, TAN, { span: 2, variants: [k("\\cot", "\\cot", { size: "sm" })] }),
    ],
    [
      k("\\Sigma", "\\sum_{#0}^{#?}"),
      k("\\lim", "\\lim_{#0\\to#?}", { size: "sm" }),
      k("\\infty"),
      k("\\int", "\\int"),
      k("\\int_{\\square}^{\\square}", "\\int_{#0}^{#?}", { size: "xs" }),
      k("dx", "\\,dx", { size: "sm" }),
    ],
    [
      k("f'(\\square)", "f'(#0)", { size: "sm", span: 2 }),
      k("\\dfrac{dy}{dx}", "\\frac{dy}{dx}", { size: "sm", span: 2 }),
      k("\\Delta", "\\Delta", { span: 2 }),
    ],
    [
      k("{}_{n}\\mathrm{P}_{r}", "{}_{#0}\\mathrm{P}_{#?}", { size: "sm" }),
      k("{}_{n}\\mathrm{C}_{r}", "{}_{#0}\\mathrm{C}_{#?}", { size: "sm" }),
      k("{}_{n}\\Pi_{r}", "{}_{#0}\\Pi_{#?}", { size: "sm" }),
      k("{}_{n}\\mathrm{H}_{r}", "{}_{#0}\\mathrm{H}_{#?}", { size: "sm" }),
      k("!"),
      CDOTS,
    ],
    [
      k("\\mathrm{P}(\\square)", "\\mathrm{P}(#0)", { size: "xs" }),
      k("\\mathrm{P}(\\square|\\square)", "\\mathrm{P}(#0|#?)", { size: "xs" }),
      k("\\mathrm{E}(\\square)", "\\mathrm{E}(#0)", { size: "xs" }),
      k("\\mathrm{V}(\\square)", "\\mathrm{V}(#0)", { size: "xs" }),
      k("\\sigma(\\square)", "\\sigma(#0)", { size: "xs" }),
      k("\\mathrm{N}(\\square,\\square^2)", "\\mathrm{N}(#0,#?^{2})", { size: "xs" }),
    ],
  ];

  // ── 알파벳·그리스 문자 (13칸 기준: 문자 1칸, 넓은 기능 키 3~4칸) ──
  // 키 표시를 실제 입력 모양에 맞춰 대·소문자 모두 기울임으로 그린다 (시안의 대문자 정자체는 따르지 않음)
  const letters = (s) =>
    s.split("").map((c) => k(c, c, { upper: c.toUpperCase(), upperLabel: c.toUpperCase() }));
  // 그리스 문자도 실제 입력 모양에 맞춰 수식 글꼴로 그린다 (시안의 소문자 본문 글꼴은 따르지 않음)
  const GREEK = [
    k("α", "\\alpha"),
    k("β", "\\beta"),
    k("γ", "\\gamma"),
    k("θ", "\\theta"),
    k("σ", "\\sigma"),
    k("μ", "\\mu"),
    k("λ", "\\lambda"),
    k("Δ", "\\Delta"),
    k("Σ", "\\Sigma"),
    k("Ω", "\\Omega"),
  ];
  const ALPHABET = [
    letters("qwertyuiop").concat([fn("backspace", "backspace", { span: 3, align: "end" })]),
    letters("asdfghjkl").concat([fn("enter", "enter", { span: 4, align: "end" })]),
    [fn("shift", "shift", { span: 3, align: "start" })]
      .concat(letters("zxcvbnm"))
      .concat([fn("shift", "shift", { span: 3, align: "end" })]),
    GREEK.concat([{ label: "스페이스", text: true, action: "space", span: 3 }]),
  ];

  // 행렬 크기 선택 범위 (행렬 선택 팝업과 공유)
  const MATRIX_MIN = 1;
  const MATRIX_MAX = 4;
  const clampMatrixSize = (n) => Math.min(MATRIX_MAX, Math.max(MATRIX_MIN, Math.floor(n) || MATRIX_MIN));

  window.MathKeypadLayouts = {
    // 창 폭 (시안 고등 화면 틀)
    width: 1000,
    // rowHeight: 행 높이(px), "fill" 이면 블록 높이를 행 수로 나눠 채움(숫자패드). width: 블록 폭(px, 시안)
    tabs: [
      {
        label: "숫자·연산·기호",
        gap: 8,
        blocks: [
          { rows: OPERATORS, rowHeight: 38, gap: 4, width: 226 },
          { rows: SYMBOLS, rowHeight: 38, gap: 4, width: 226 },
          { rows: CALCULUS, rowHeight: 38, gap: 4, width: 296 },
          { rows: NUMPAD, rowHeight: "fill", gap: 4, width: 148 },
        ],
      },
      {
        label: "알파벳·그리스 문자",
        gap: 0,
        blocks: [{ rows: ALPHABET, rowHeight: 56, gap: 6 }],
      },
    ],
    MATRIX_MIN: MATRIX_MIN,
    MATRIX_MAX: MATRIX_MAX,
    /** a×b 행렬 LaTeX 생성. 첫 칸은 커서(#0), 나머지는 Tab 이동용 빈칸(#?) */
    buildMatrixLatex: function (rows, cols) {
      const body = Array.from({ length: clampMatrixSize(rows) }, (_, i) =>
        Array.from({ length: clampMatrixSize(cols) }, (_, j) => (i === 0 && j === 0 ? "#0" : "#?")).join("&")
      ).join("\\\\");
      return "\\begin{pmatrix}" + body + "\\end{pmatrix}";
    },
  };
})();
