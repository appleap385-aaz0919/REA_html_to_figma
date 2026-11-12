// math 데모 전역 설정: CSRF 토큰/헤더, OCR 엔드포인트, 벤더 경로, MathLive 폰트 경로, 닮음 기호 글꼴.
// 다른 모든 글루 모듈보다 먼저 로드된다(KaTeX/MathLive/TinyMCE 다음).
(function () {
  "use strict";
  const meta = (name) => {
    const el = document.querySelector('meta[name="' + name + '"]');
    return el ? el.getAttribute("content") || "" : "";
  };
  const csrfToken = meta("_csrf");
  // CookieCsrfTokenRepository.withHttpOnlyFalse() 기본 헤더명 = X-XSRF-TOKEN (서버가 meta 로 노출)
  const csrfHeader = meta("_csrf_header") || "X-XSRF-TOKEN";

  // MathLive 폰트 자체호스팅 경로 지정 (전역 MathfieldElement 로드 뒤). 미지정 시 폰트 404. 키 입력 소리는 프론트처럼 끈다.
  if (window.MathfieldElement) {
    try {
      window.MathfieldElement.fontsDirectory = "/js/vendor/mathlive/fonts";
      window.MathfieldElement.soundsDirectory = null;
    } catch (e) {
      /* 일부 버전은 정적 setter 가 없을 수 있음 — 무시 */
    }
  }

  // 닮음 기호 ∽(\backsim)를 교과서·시안 모양(양끝이 말린 누운 S)으로 — KaTeX_AMS 기본 모양은 작은 물결이다
  // Noto Sans KR(OFL)에서 이 한 글자만 뽑은 파일. 저장되는 LaTeX는 그대로 \backsim
  // KaTeX_AMS 는 ∽ 를 이미 갖고 있어 나중에 선언된 쪽이 쓰인다. 문항 뷰어·편집기 번들이 KaTeX 글꼴을 페이지 CSS 보다 뒤에 넣으므로
  // CSS @font-face 대신, 선언 순서와 무관하게 CSS 글꼴보다 앞서는 FontFace 로 등록한다
  document.fonts.add(
    new FontFace("KaTeX_AMS", 'url("/css/fonts/NotoSansKR-similar.woff") format("woff")', {
      style: "normal",
      weight: "400",
      display: "swap",
      unicodeRange: "U+223D",
    })
  );

  window.MathConfig = {
    csrfToken: csrfToken,
    csrfHeader: csrfHeader,
    ocrEndpoint: "/api/math-ocr",
    samplesUrl: "/js/math/samples.json",
    tinymceBaseUrl: "/js/vendor/tinymce",
    // 스페이스바·가상 키보드 공백 키가 삽입하는 값. math-field 의 mathModeSpace 로 대입한다.
    // 폭을 바꾸려면 여기만 고치면 된다 (\; 두꺼운 / \: 중간 / \, 얇은 / \quad 넓은 공백).
    spaceLatex: "\\;",
    // fetch 용 CSRF 헤더 객체. FormData 전송 시 Content-Type 은 넣지 않는다(boundary 자동).
    csrfHeaders: function () {
      return csrfToken ? { [csrfHeader]: csrfToken } : {};
    },
  };
})();
