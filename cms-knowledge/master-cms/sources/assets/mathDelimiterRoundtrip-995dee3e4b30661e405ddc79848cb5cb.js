// $...$ LaTeX 구분자 <-> 수식 노드 마크업 양방향 변환. (utils/mathDelimiterToTipTap.ts 직번역, server 가드 제거)
// 수식 노드 DOM 계약: 인라인 <span data-type="inline-math" data-latex>, 블록 <div data-type="block-math" data-latex>.
(function () {
  "use strict";
  const compat = window.MathCompat;

  // HTML 엔티티 디코드(수식 안의 &lt; 등을 실제 LaTeX 문자로). &amp; 는 이중 디코드 방지 위해 마지막.
  const decodeEntities = (s) =>
    s
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0*39;|&apos;/g, "'")
      .replace(/&#x([0-9a-fA-F]+);/g, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)))
      .replace(/&amp;/g, "&");

  // LaTeX 를 data-latex 속성값으로 안전하게 이스케이프. & 먼저.
  const escapeAttr = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // 캡처한 LaTeX 한 조각을 수식 노드 마크업으로. 멀티라인이면 block-math, 아니면 inline-math.
  const toMathNode = (rawLatex) => {
    const decoded = decodeEntities(rawLatex);
    if (!decoded.trim()) return ""; // 공백뿐이면 무시
    const latex = compat.toKatexCompatLatex(decoded);
    const attr = escapeAttr(latex);
    return compat.isMultilineLatex(latex)
      ? '<div data-type="block-math" data-latex="' + attr + '"></div>'
      : '<span data-type="inline-math" data-latex="' + attr + '"></span>';
  };

  // $$...$$(블록) 먼저, 그다음 $...$(인라인) 치환. 주변 HTML 은 그대로 둔다.
  const latexDelimitersToHtml = (sourceHtml) => {
    if (!sourceHtml) return "";
    return sourceHtml
      .replace(/\$\$([^$]+?)\$\$/g, (_m, inner) => toMathNode(inner))
      .replace(/\$([^$]+?)\$/g, (_m, inner) => toMathNode(inner));
  };

  // (역변환) 수식 노드를 다시 $...$/$$...$$ 텍스트로 복원. 커스텀 태그는 그대로 직렬화.
  const htmlToLatexDelimiters = (html) => {
    if (!html) return html || "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll('[data-type="block-math"]').forEach((el) => {
      el.replaceWith(doc.createTextNode("$$" + (el.getAttribute("data-latex") || "") + "$$"));
    });
    doc.querySelectorAll('[data-type="inline-math"]').forEach((el) => {
      el.replaceWith(doc.createTextNode("$" + (el.getAttribute("data-latex") || "") + "$"));
    });
    return doc.body.innerHTML;
  };

  window.MathRoundtrip = {
    latexDelimitersToHtml: latexDelimitersToHtml,
    htmlToLatexDelimiters: htmlToLatexDelimiters,
  };
})();
