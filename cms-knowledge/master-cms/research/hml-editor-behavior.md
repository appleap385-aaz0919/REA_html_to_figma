2026-11-09 업데이트: 최신 런타임 조사와 소스 변경 내역은 `../session-20261109-phase16.json`과 `../sources/hml-glue-20261109.manifest.json`에 기록했습니다. 아래 본문은 11월 6일의 정적 조사 기록이므로 최신 결과가 우선합니다.

세트 문항 2088355에서 공통 지문·문제·해답 HML을 실제로 열고, 각 문서의 내부 스크롤 끝까지 확인했습니다. 지문해석 파일은 이 표본에 없어 해당 버튼은 비활성 상태였습니다. 문항 2088663처럼 HML이 전혀 없는 표본에서는 문제·해답의 새 문서 기능을 확인했습니다.

복제 테스트 문항 2088985에서 `[QA-HML-20261109]`를 입력했습니다. 저장하지 않고 해답으로 이동한 뒤 문제로 돌아오면 경고 없이 입력 내용이 사라졌습니다. 문구를 다시 입력하여 편집기 저장, CMS 전체 반영, 수정 화면 재진입, 새 편집기 열기를 차례로 실행했고, 상세 버전 2088701과 저장된 문구의 복원을 확인했습니다. 편집기 저장 직후에는 부모의 대기 결과에 HML·PNG 임시 URL만 들어오며 CMS에서 한 번 더 저장해야 반영됩니다. 이 흐름에서 HTML 문제 본문은 HML 문구로 자동 교체되지 않았습니다. 의도된 동기화 정책은 미확인입니다.

현재 연결 스크립트는 `webhwp-e082bada3ae14916759b8d44db43d953.js`입니다. 이미지 생성 후 문서를 비운다는 아래의 과거 설명과 달리, 최신 소스는 이미지용 레이아웃 변경 전에 저장한 HML을 같은 슬롯에 다시 엽니다. 다시 열기에 실패할 때만 문서를 비우고 경고합니다. 성공 경로는 실제 화면에서도 확인했으며 실패 경로는 소스만 확인했습니다. 지문해석의 실제 파일 로드, 지문·해답 저장, 공유 지문의 반영 범위, 기안기 내부 명령 전체는 아직 확인하지 않았습니다.

---

# HML 편집 팝업 동작 조사

2026-11-06에 `sources/hml-editor.html`, 그 HTML에 실제 선언된 `webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js`, 부모 수정 화면 원본과 기존 evidence/061·063~075를 대조했습니다. 브라우저·GUI·클립보드를 제어하거나 문서 저장·업로드·CMS 변경 요청을 하지 않았습니다. JavaScript는 실행하지 않고 읽었습니다.

## 1. 원본과 증거의 의미

**H**는 팝업 HTML, **W**는 webhwp 연결 JS, **P**는 부모의 `item-edit.html`, **E번호**는 해당 접근성 txt를 뜻합니다. 핵심 규칙의 링크는 실제 로컬 파일과 줄 번호를 가리킵니다. vendor 기안기 내부 코드와 서버 저장 구현은 이번 원본에 포함되지 않습니다.

W의 선언 경로는 `/js/webhwp/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js`입니다. 공개 GET 결과는 HTTP 200, `text/javascript;charset=UTF-8`, 17,324바이트였으며 요청 URL 그대로 응답했고 로그인 HTML이 아니었습니다. 원본을 `sources/assets`에 보존했습니다. 팝업 HTML은 68줄, W는 432줄입니다. [H:64](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:64>)

| 증거 | 확인한 화면·동작 범위 | 확인되지 않은 범위 |
|---|---|---|
| E061·E063·E064 | 팝업 URL의 문항/상세ID는 2088806/2088127입니다. `2088806_Q.hml 을(를) 열었습니다.` 상태, 문제 슬롯의 파란 선택 표시, 문제·그래프·5개 보기가 렌더링됩니다. 지문/지문해석 버튼은 PNG에서 흐리게 표시됩니다. [E063:20](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:20>) [E063:27](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:27>) [E061 PNG](../evidence/061-hml-editor-window.png) [E063 PNG](../evidence/063-hml-popup-fresh.png) | 빈 지문 슬롯 클릭의 실제 차단, 파일 수정·저장 성공은 확인하지 않았습니다. E064의 `question-end`라는 파일명만으로 문서 끝까지 조사했다고 판정하지 않습니다. |
| E065→E066 | AX는 해답을 “여는 중”→“열었습니다”로 기록합니다. PNG에는 해답 슬롯 선택과 정답 ⑤·풀이가 표시됩니다. E065의 PNG는 이미 로드된 모습이므로 AX와 PNG가 완전히 같은 순간이라고 가정하지 않습니다. [E065:32](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/065-hml-answer-slot.txt:32>) [E066:32](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/066-hml-answer-end.txt:32>) [E066 PNG](../evidence/066-hml-answer-end.png) | 수정 후 슬롯 왕복·미저장 경고·실패 복원은 확인하지 않았습니다. |
| E067~E073 | 파일/편집/보기/입력/서식/쪽/표 메뉴가 펼쳐진 모습과 항목·단축키 표시를 확인했습니다. 아래 메뉴 표에 분리했습니다. | 메뉴 안 명령 클릭, 하위 메뉴, 다이얼로그 확정·취소, 문서에 실제 적용된 결과는 미검증입니다. |
| E074 | 표 메뉴가 계속 펼쳐진 화면입니다. [E074:42](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/074-hml-close-menu.txt:42>) [E074 PNG](../evidence/074-hml-close-menu.png) | `close-menu` 파일명은 닫힘 성공의 근거가 아닙니다. 팝업 창 닫기 검증도 아닙니다. |
| E075 | 메뉴가 없는 상태와 편집 화면 하단의 빈 용지·스크롤 위치를 확인했습니다. [E075:32](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/075-hml-scrollbar-end.txt:32>) [E075 PNG](../evidence/075-hml-scrollbar-end.png) | 빈 용지 화면만으로 문서 전체 내용이나 모든 페이지 조사 완료를 판정하지 않습니다. |

이 범위의 JSON은 모두 `ok:true`, `truncation.truncated:false`였지만 이는 접근성 읽기 성공을 뜻합니다. 메뉴는 다수가 `텍스트`로만 노출되고 본문은 PaperCanvas/EditCanvas 이미지이므로 키보드 접근성·실제 활성 상태·문서 내용 전체를 AX만으로 판정할 수 없습니다. [E063:35](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:35>) [E063:164](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:164>) [E063 JSON](../evidence/063-hml-popup-fresh.json)

## 2. 외부 CMS 버튼과 기안기 메뉴

### 2.1 팝업이 직접 제공하는 버튼

HTML의 외부 툴바에는 지문 수정(passage), 지문해석 수정(translation), 문제 수정(question), 해답 수정(explain), 저장이 있습니다. question/explain에만 `data-webhwp-new`가 있어 부모 슬롯은 존재하지만 URL이 없을 때 새 문서를 만들 수 있습니다. passage/translation에는 새 문서 표시가 없습니다. [H:18](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:18>)

“내 PC 파일 열기”, “다운로드” 버튼은 HTML **주석 안**에 있으므로 현재 DOM의 노출 버튼이 아닙니다. 숨은 파일 input은 `.hml,.hwp,.hwpx`를 accept로 선언하고 연결 코드도 있지만, 주석 처리된 버튼을 실제 사용 가능한 기능으로 기록하면 안 됩니다. 기안기 내부 파일 메뉴에도 현재 캡처에서는 파일 열기/저장 항목이 보이지 않습니다. [H:29](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:29>) [H:36](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:36>) [W:350](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:350>) [E067 PNG](../evidence/067-hml-file-menu.png)

저장 완료 안내 모달은 “CMS 에서 ‘임시 저장’ 또는 ‘전체 반영’ 버튼을 눌러주세요”이며 X와 확인으로 닫도록 선언되어 있습니다. 모달 표시·확인 버튼 실제 동작은 저장을 실행하지 않았으므로 미검증입니다. [H:42](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:42>)

### 2.2 펼쳐진 메뉴에서 확인한 항목

다음은 **메뉴 표시 확인** 목록입니다. 지원 의도나 명령의 존재와 실제 실행·저장 성공을 구분합니다. PNG의 흐린 항목은 당시 선택 상태에서 비활성처럼 표시되었음을 뜻하며 모든 문서에서 영구 비활성이라고 단정하지 않습니다.

| 메뉴 | 표시된 항목·단축키 | 당시 표시 상태·근거 |
|---|---|---|
| 파일 | 편집 용지(F7), 인쇄(Ctrl+P), 도움말, 웹한글 기안기 정보 | 메뉴 표시 확인입니다. 인쇄·용지·도움말 실행은 미검증입니다. [E067:35](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/067-hml-file-menu.txt:35>) [PNG](../evidence/067-hml-file-menu.png) |
| 편집 | 되돌리기(Ctrl+Z), 다시 실행(Ctrl+Shift+Z), 오려 두기(Ctrl+X), 복사하기(Ctrl+C), 붙이기(Ctrl+V), 모양 복사(Ctrl+Alt+C), 빠른 교정, 지우기(Ctrl+E), 조판 부호 지우기, 모두 선택(Ctrl+A), 찾기(Ctrl+F), 찾아 바꾸기(Ctrl+H) | 되돌리기/다시 실행/오려두기/복사하기/지우기는 당시 흐리게 표시됩니다. 클립보드·명령 실행은 미검증입니다. [E068:38](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/068-hml-edit-menu.txt:38>) [PNG](../evidence/068-hml-edit-menu.png) |
| 보기 | 확대(Shift+Num +), 축소(Shift+Num -), 배율, 쪽 모양, 쪽 윤곽(Ctrl+G+L), 조판 부호(Ctrl+G+C), 문단 부호(Alt+G+T), 투명 선, 격자 보기, 도구 상자, 메모 | 쪽 윤곽에 체크가 보이며 배율/쪽 모양/도구 상자는 하위 메뉴 화살표가 있습니다. 하위 내용·배율 변경 결과는 미검증입니다. [E069:38](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/069-hml-view-menu.txt:38>) [PNG](../evidence/069-hml-view-menu.png) |
| 입력 | 도형, 그림(Alt+N+I), 글상자(Alt+N+B), 문자표(Ctrl+F10), 수식(Alt+N+M), 필드 입력(Ctrl+K+E), 문단 띠(Alt+N+L), 주석, 캡션 넣기, 메모, 하이퍼링크(Ctrl+K+H) | 도형/주석 등 하위 메뉴가 있고 캡션 넣기는 당시 흐립니다. 삽입 다이얼로그·수식 문법·파일 업로드는 미검증입니다. [E070:39](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/070-hml-input-menu.txt:39>) [PNG](../evidence/070-hml-input-menu.png) |
| 서식 | 글자 모양(Alt+L), 문단 모양(Alt+T), 글머리표 모양, 문단 번호 모양(Alt+K+N), 한 수준 증가(Ctrl+Num -), 한 수준 감소(Ctrl+Num +), 스타일(F6), 개체 속성(P) | 개체 속성은 당시 흐립니다. 서식 적용·값 제한·취소 보존은 미검증입니다. [E071:40](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/071-hml-format-menu.txt:40>) [PNG](../evidence/071-hml-format-menu.png) |
| 쪽 | 편집 용지(F7), 머리말, 꼬리말, 새 번호로 시작, 현재 쪽만 감추기(Alt+N+S), 쪽 나누기(Ctrl+Enter), 단 나누기(Ctrl+Shift+Enter), 단, 다단 설정 나누기(Ctrl+Alt+Enter) | 머리말/꼬리말/단의 하위 메뉴 표시를 확인합니다. 문서 쪽·구역을 실제 변경하지 않았습니다. [E072:41](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/072-hml-page-menu.txt:41>) [PNG](../evidence/072-hml-page-menu.png) |
| 표 | 표 만들기(Alt+N+T), 표/셀 속성, 셀 테두리/배경, 줄/칸 추가하기, 줄/칸 지우기, 셀 나누기(S), 셀 합치기(M), 셀 높이를 같게(H), 셀 너비를 같게(W), 블록 계산식, 1,000 단위 구분 쉼표 | 표 만들기 외 대부분은 당시 흐립니다. 표 선택 후 활성화·행/열 개수 제한·합치기·계산식은 미검증입니다. [E073:42](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/073-hml-table-menu.txt:42>) [PNG](../evidence/073-hml-table-menu.png) |

일반 툴바에는 조판/문단 부호, 격자 보기, 글자/문단 모양, 표·도형·그림·개체 속성·문자표·하이퍼링크·각주·미주·머리말·꼬리말·찾기 등이 보입니다. 스타일 `문제-텍스트`, 언어군/폰트 관련 `대표`, `맑은 고딕`, `10.0 pt`, 툴바의 150% 값과 하단 100% 표시가 있습니다. 두 % 표시를 같은 배율 설정으로 합치지 않습니다. 이 툴바 구현과 명령 제한은 W의 직접 구현이 아니라 내부 기안기 영역입니다. [E063:45](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:45>) [E063:126](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:126>) [E063:155](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:155>) [E063:179](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:179>) [E063 PNG](../evidence/063-hml-popup-fresh.png)

## 3. 프레임 구성과 준비 상태

DOMContentLoaded에서 `.webhwp-host`별 bind를 호출합니다. 각 host는 iframe ID, 현재 filename/slot/current, 버튼 목록, 상태 영역, 숨은 file input, detached/mounted/ready/busy를 보관합니다. 초기 filename/slot은 빈 값, current는 null, ready/busy는 false입니다. [W:324](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:324>) [W:429](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:429>)

iframe은 한 번만 mount하며 src를 `/webhwpctrl/resources/hwpctrlframe.html?frameId=webhwpFrame`으로 설정하고 “기안기를 불러오는 중입니다...”를 표시합니다. bind가 완료되면 즉시 mount합니다. 기안기 인스턴스에 대한 접근은 `frame.contentWindow.HwpCtrl`이며 이 접근 예외만 ctrlOf에서 잡아 null로 돌립니다. [H:37](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:37>) [W:27](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:27>) [W:51](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:51>) [W:403](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:403>)

AX에는 위 로더 프레임 아래 `hwpctrlmain.html?baseurl=https%3A%2F%2Fdev-webhwp.dongahub.com%2Fwebhwpctrl%2F&skin=default`가 나타납니다. 실제 내부 구조가 로드되어 문서가 표시된 표본은 확인되지만 이 프레임·vendor 라이브러리 원본은 내려받거나 실행하지 않았습니다. [E063:33](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/063-hml-popup-fresh.txt:33>)

준비 메시지는 same-origin이고 data가 있으며 `data.frameId`에 대응 host가 있을 때 처리합니다. `webhwp-ready`면 ready=true, busy 해제, 준비 상태 표시 후 연결된 부모가 있으면 최초 문제 파일 열기를 시도합니다. 메시지의 `e.source`가 해당 iframe Window인지 확인하는 조건은 없습니다. 알 수 없는 frameId나 다른 type은 무시합니다. [W:409](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:409>)

`webhwp-error`면 ready=false, 전달 message 또는 기본 오류를 상태에 쓰고 console.error를 남깁니다. 이 분기는 `setBusy`를 다시 호출하지 않으므로 이미 보이는 버튼의 disabled 속성을 즉시 모두 바꾸지는 않습니다. 다만 클릭 핸들러는 ready=false면 반환합니다. 재시도 버튼, ready 타임아웃, iframe 재마운트·자동 재접속은 W에 없습니다. 실제 로더/vendor의 재시도는 미확인입니다. [W:359](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:359>) [W:365](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:365>) [W:422](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:422>)

## 4. 부모 의존성과 슬롯 가능 여부

hasOpener는 opener 존재·열려 있음·`webhwpSlot` 함수 접근 가능 여부를 검사하며 예외면 false입니다. bind 시점의 결과를 detached에 한 번 저장합니다. 단독 주소 진입은 모든 외부 버튼에 empty 표시를 주고 disabled로 시작합니다. 준비 완료 후에도 “문항 수정 화면에서 [한글 편집기 열기]로 열어야 파일을 편집할 수 있습니다.”를 상태에 표시하며 자동 문제 열기를 하지 않습니다. [W:60](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:60>) [W:343](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:343>) [W:373](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:373>) [W:415](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:415>)

각 슬롯 버튼은 bind 시점에 부모에 한 번 물어 활성화 가능 여부를 정합니다. source가 있고 new 속성이 있으면 URL이 없어도 생성 가능, 그 외 source 또는 URL이 없으면 `data-webhwp-empty=true`로 유지합니다. setBusy는 이 empty 버튼을 건너뛰고 나머지만 `busy || !ready`로 disabled 처리합니다. 실제 클릭할 때도 부모에 다시 물으므로 문서를 여는 URL은 초기 응답에 고정되지 않습니다. [W:35](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:35>) [W:69](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:69>) [W:354](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:354>)

부모의 `webhwpSlot(slot)`은 `{slot,path,url}`을 반환하며 url은 이번 부모 화면에서 수신한 최신 HML 결과를 우선합니다. 팝업은 별도의 문항 조회 API를 직접 호출하지 않습니다. source를 못 읽으면 null이고 원래 source의 path는 저장 시 파일명을 만드는 근거로 보관합니다. [P:6431](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6431>) [W:69](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:69>) [W:87](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:87>)

주의할 경계는 **부모 슬롯은 클릭할 때의 현재 문서에서 읽고, 결과 메시지의 itemId/detailId는 팝업 URL을 처음 읽은 owner에서 고정한다**는 점입니다. 부모 창을 다른 문항으로 이동한 후 팝업을 재사용하면 파일 출처와 소유자 값이 엇갈릴 수 있습니다. 부모 수신기는 신원 불일치를 거절하지만, 팝업에서 어떤 문서를 열게 되는지까지 이 코드가 신원을 대조하지는 않습니다. 런타임 재현은 하지 않았습니다. [W:20](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:20>) [W:74](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:74>) [W:202](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:202>) [P:6447](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6447>)

## 5. 기존 파일·새 문서·전환

### 5.1 기존 파일 열기

1. busy 또는 준비 전 클릭은 반환합니다. HwpCtrl이 없으면 별도 토스트 없이 반환합니다. 부모에 현재 slot을 물어 URL을 읽습니다. [W:83](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:83>) [W:359](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:359>)
2. URL이 없지만 source가 존재하고 question/explain의 new 속성이 있으면 빈 문서를 만듭니다. 그 외 URL 없음은 “열 파일을 찾지 못했습니다.” 토스트입니다. [W:87](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:87>)
3. URL 안의 `https://dev-webhwp.dongahub.com/` 문자열을 `http://localhost:8080/`로 모두 치환합니다. 다른 CDN URL은 이 replace 대상이 아닙니다. 이는 실제 실행 코드이며 localhost가 어느 서버를 뜻하는지, 환경별 정상 동작 여부는 확인되지 않았습니다. [W:98](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:98>)
4. **Open 성공 전에** current·filename·slot을 대상 버튼/부모 path로 바꾸고 active 표시를 갱신합니다. 파일명 표시는 URL의 query를 제거한 마지막 경로 조각을 사용합니다. [W:101](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:101>)
5. busy=true와 “파일명 을(를) 여는 중입니다...”를 설정하고 `ctrl.Open(url,'HWPML2X','lock:false',callback)`을 호출합니다. callback의 `res && res.result === true`만 성공이며 버튼을 풀고 “열었습니다.”를 표시합니다. Open의 동기 반환값이 정확히 false여도 failOpen을 부릅니다. [W:110](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:110>)

failOpen은 busy 해제, “파일을 열지 못했습니다.” 상태, console.error, “파일을 불러오지 못했습니다.” 토스트입니다. current/filename/slot을 이전 값으로 되돌리거나 저장 버튼을 별도로 금지하지 않습니다. Open 실패 후 vendor가 이전 문서를 남기는지/비우는지는 미확인입니다. 따라서 “다른 슬롯 표시인데 이전 문서를 저장하는 상황이 가능한가”는 우선 QA가 필요하며 현재 재현 결함으로 단정하지 않습니다. [W:154](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:154>) [W:101](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:101>)

### 5.2 최초 열기와 빈 문서

준비 완료 직후에는 question 버튼을 찾고 부모 question URL이 있을 때만 openFile을 호출합니다. question URL이 없으면 자동 빈 문서를 만들지 않고 filename은 빈 상태로 남습니다. 다른 슬롯 URL이 있어도 그 슬롯을 자동으로 먼저 열지는 않습니다. [W:130](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:130>)

사용자가 생성 가능한 빈 question/explain 버튼을 누르면 `ctrl.Clear(1)` 후 current/slot을 정하고 filename을 `question.hml` 또는 `explain.hml`로 만들며 “새 문서입니다. 작성 후 저장하세요.”를 표시합니다. Clear 반환/완료를 검사하지 않고 busy 상태로 전환하지 않습니다. 이 이름을 실제 CMS 영구 저장 경로라고 해석하면 안 됩니다. [W:140](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:140>)

slot 전환 핸들러에는 dirty 비교·미저장 변경 경고·자동 임시 저장이 없습니다. 같은 인스턴스에서 Open 또는 Clear를 호출합니다. Open/Clear가 vendor 내부에서 자체 확인창을 띄우는지는 원본 범위 밖이며 기존 E065→066은 수정하지 않은 슬롯 전환만 보여 줍니다. [W:83](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:83>) [W:140](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:140>) [E065:32](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/065-hml-answer-slot.txt:32>) [E066:32](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/066-hml-answer-end.txt:32>)

## 6. 저장과 이미지 생성

### 6.1 현재 슬롯 HML 저장

외부 저장 버튼은 busy/ready 가드를 거친 뒤 save를 부릅니다. ctrl이 없으면 반환, filename이 빈 값이면 “저장할 원본 파일 경로가 없습니다.” 토스트 후 중단합니다. **filename 유무**를 검사하며 문서 본문·owner ID·slot·편집 여부를 별도로 유효성 검사하지 않습니다. [W:168](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:168>) [W:365](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:365>)

busy=true, “저장 중입니다...”로 바꾼 후 filename의 마지막 조각을 사용하여 `ctrl.SaveAs(name,'HWPML2X','',callback)`을 호출합니다. `res.result === true`면 `res.downloadUrl`을 saveImage로 넘깁니다. false/누락 결과는 busy 해제, “저장 결과를 읽지 못했습니다.” 상태와 “저장에 실패했습니다.” 토스트입니다. 성공이라고 받은 downloadUrl의 존재·URL 형식을 추가 검사하지는 않습니다. [W:177](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:177>)

W에는 SaveAs의 동기 false 반환 처리, 예외 catch, 응답 타임아웃·재시도가 없습니다. callback이 오지 않거나 호출 중 예외가 나면 이 연결 코드만으로 busy를 정리한다고 보장할 수 없습니다. setBusy는 외부 슬롯/저장 버튼만 막고 iframe 본문·vendor 메뉴 전체를 disabled 처리하지는 않습니다. 저장 중 실제 편집 가능 여부와 HML/이미지의 같은 내용 보장은 별도 확인이 필요합니다. [W:35](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:35>) [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) [W:340](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:340>)

### 6.2 이미지 직전 문서 설정 변경

saveImage는 같은 ctrl과 filename을 다시 확인한 뒤 PNG 이름을 HML basename에서 확장자를 제거해 만듭니다. 예를 들어 `2088806_Q.hml`이면 `2088806_Q.png`입니다. 다음은 주석의 설명만이 아니라 **실제 실행되는 설정 코드**입니다. 수치의 단위·enum 의미는 vendor API 문서가 없으므로 추정하지 않습니다. [W:210](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:210>) [W:223](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:223>)

| 단계 | 호출·대입 |
|---|---|
| 단 설정 | `CreateSet('ColDef')`, Count=1, ApplyTo=6을 설정하고 HeadCtrl→Next를 순회하여 CtrlID가 `cold`인 컨트롤의 Properties에 대입합니다. “문서 전체”라는 enum 설명은 코드 주석에 있습니다. [W:225](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:225>) |
| 용지 설정 | PageSetup action의 기본 set을 얻고 ApplyTo=3, PageDef에 TopMargin=0, BottomMargin=600, LeftMargin=600, RightMargin=800, HeaderLen/FooterLen/GutterLen=0, PaperWidth=25000, PaperHeight=2835를 지정한 뒤 Execute합니다. [W:239](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:239>) |
| 높이 반복 | 별도 paperHeight 변수를 **0**으로 시작합니다. PageCount>1이고 반복<200이면 500씩 늘려 PaperHeight와 Execute를 다시 적용합니다. 최초 반복은 2835+500이 아니라 **500**이며 최대 반복의 값은 100000입니다. [W:263](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:263>) |
| 이미지 API | 반복 종료 후 `CreatePageImageEx(imageName,0,143,24,'png','',callback)`를 호출합니다. 숫자 0/143/24의 의미는 이 소스에 정의되어 있지 않아 페이지·해상도·비트수로 단정하지 않습니다. [W:277](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:277>) |

**HML SaveAs가 먼저이고 위 문서 설정 변경과 이미지 생성은 그 뒤입니다.** 변경한 단/용지 설정으로 HML을 다시 SaveAs하거나 원래 편집 설정으로 되돌리는 코드는 없습니다. 따라서 저장 HML과 생성 PNG의 레이아웃이 같은지 또는 의도적으로 다른지는 실제 파일 비교가 필요합니다. 이미지 생성 실패 시에는 Clear가 호출되지 않아 변경한 편집 문서 설정이 화면에 남을 수 있습니다. [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) [W:225](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:225>) [W:289](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:289>)

200회 후에도 PageCount>1인 경우를 별도 반려하지 않고 이미지 생성으로 진행합니다. PageCount가 비정상 값이거나 용지 action이 실패한 경우의 검사도 없습니다. “항상 한 페이지 PNG가 완성된다”는 성공 보장은 이 코드만으로 할 수 없습니다. [W:267](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:267>) [W:277](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:277>)

### 6.3 이미지 성공·실패·성공 후 초기화

이미지 callback에서 `res.result === true`일 때만 부모 통지를 먼저 합니다. 그 다음 busy 해제→“파일이 임시 저장되었습니다.”→clear(host)→저장 완료 모달 표시 순서입니다. clear는 Clear(1), filename/slot 빈 값, current=null, active 표시 해제입니다. 팝업 창이나 iframe을 닫지는 않습니다. 같은 상태에서 저장을 다시 누르면 원본 경로 없음 안내 대상입니다. [W:277](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:277>) [W:299](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:299>) [H:42](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:42>)

이미지 결과 실패는 busy 해제와 저장 실패 안내이며 부모 통지·Clear·성공 모달은 실행하지 않습니다. 앞 단계 HML SaveAs는 이미 성공했을 수 있으므로 이를 전체 저장의 원자적 rollback으로 해석하면 안 됩니다. 임시 파일 삭제·재사용·만료와 이미지 파일 다중 페이지 처리는 vendor/서버 확인 대상입니다. [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) [W:289](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:289>)

## 7. 부모 postMessage와 실제 문항 반영

부모가 있고 닫히지 않았으면 다음 payload를 부모의 targetOrigin=`location.origin`으로 postMessage합니다. owner ID는 팝업이 로드될 때 읽은 URLSearchParams에서 얻으므로 문자열 또는 null입니다. [W:20](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:20>) [W:196](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:196>)

| 키 | 값 |
|---|---|
| type | webhwp-saved |
| slot | 현재 host.slot |
| itemId, itemDetailId | 팝업 최초 URL의 owner 값 |
| filePath | host.filename; 기존 부모 path 또는 새 문서 임시 이름 |
| hmlUrl | SaveAs 결과 downloadUrl |
| imageUrl | CreatePageImageEx 결과 downloadUrl |

부모 수신기는 same-origin·type·문항/상세ID 문자열 일치·알려진 네 slot을 검사한 후 hmlUrl/imageUrl을 메모리에 저장하고 이미지 카드·표시값을 갱신합니다. 부모에서는 메시지의 filePath를 문항 저장값으로 직접 읽지 않으며, 각 slot의 filename 필드에 수신한 HML URL을 넣습니다. 실제 문항 반영은 별도의 `/item/all/temp-save.donga` 또는 `/item/all/apply-all.donga` 경로입니다. [P:6443](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6443>) [P:6463](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6463>) [P:6901](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6901>) [P:7102](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:7102>) [P:7111](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:7111>)

팝업은 부모의 수신·신원검사 통과·최종 CMS 저장을 확인하는 ack를 기다리지 않습니다. 부모가 이미 닫혔으면 notifyParent는 조용히 반환하지만 이후 Clear와 성공 모달은 계속 진행합니다. 부모가 다른 문항으로 이동하여 결과를 거절해도 팝업에는 자동으로 거절이 전달되지 않습니다. 이 때문에 팝업의 “임시 저장되었습니다”는 **vendor 결과 생성과 통지 시도**를 뜻하며 부모 수신 성공이나 CMS 영구 반영 성공과 구분해야 합니다. [W:197](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:197>) [W:280](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:280>) [P:6447](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6447>)

창이 뜰 때의 detached 판정만으로 이후 부모 닫힘·다른 origin 이동을 모두 통제하지는 않습니다. postMessage 자체 예외를 잡는 try/catch도 notifyParent에는 없습니다. 예외가 발생하면 그 아래 busy 해제·Clear·모달이 실행되지 않을 수 있으며 실제 브라우저 조건은 미검증입니다. [W:196](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:196>) [W:280](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:280>)

## 8. 내 PC 파일·다운로드·닫기 경계

숨은 file input의 change 핸들러는 ctrl와 첫 파일이 있으면 filename/slot/current를 비우고 busy=true로 한 뒤 `ctrl.Open(file,'','lock:false',callback)`을 호출합니다. 이 callback은 결과 성공 여부를 검사하지 않고 busy를 풀고 “파일명 을(를) 열었습니다.”를 표시합니다. 기존 URL 열기와 성공 판정이 다릅니다. 같은 파일 재선택을 위해 input을 비웁니다. accept 외의 파일 크기·확장자·MIME 검사와 동기 false 처리·timeout은 없습니다. **현재 외부 버튼은 주석 처리되어 있어 이 경로를 실제 노출 기능으로 검증한 것은 아닙니다.** [H:29](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:29>) [H:36](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:36>) [W:381](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:381>)

내 PC 파일을 이 경로로 열면 저장 대상이 비므로 외부 저장은 원본 경로 없음으로 중단합니다. download 함수는 filename basename 또는 document.hml 이름으로 `SaveAs(name,'HWPML2X','download:true;',emptyCallback,{tempUrl:location.href})`를 호출하지만 이 버튼도 주석 안입니다. 다운로드 성공·실패·형식 선택을 구현했다고 확대하지 않습니다. [W:168](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:168>) [W:312](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:312>) [W:387](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:387>)

W와 H에는 팝업 자체 닫기 버튼, window.close(), beforeunload, dirty tracking, 브라우저 X에서 저장 확인을 강제하는 핸들러가 없습니다. 성공 모달의 X/확인은 모달만 dismiss합니다. 내부 기안기나 브라우저의 별도 확인·단축키 Ctrl+S 처리·인쇄창·창 재사용 동작은 이 연결 코드 밖입니다. 메뉴의 “파일”이 보인다는 이유로 이 기능을 지원한다고 추정하지 않습니다. [H:42](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/hml-editor.html:42>) [W:299](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:299>) [W:429](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:429>)

## 9. 오류와 검증 잔여 범위

| 조건 | 연결 코드의 처리 | 실제 UI 검증 상태 |
|---|---|---|
| HwpCtrl 접근 예외/부재 | ctrlOf는 null, 호출부 다수는 조용히 반환합니다. [W:27](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:27>) | 미검증 |
| 부모 없음·접근불가 | 최초 detached이면 외부 버튼을 계속 잠그고 준비 후 안내합니다. [W:60](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:60>) [W:373](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:373>) | 미검증 |
| source URL 없음 | 생성 가능한 question/explain이면 Clear 새문서, 그 외 열 파일 없음 토스트입니다. [W:87](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:87>) | 미검증; 현재 표본 지문 버튼 흐림만 확인 |
| URL Open 실패 | 결과false/비정상 callback에 실패 상태·토스트, 대상 metadata rollback 없음입니다. [W:113](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:113>) [W:154](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:154>) | 미검증 |
| SaveAs 실패 | callback의 엄격한 result true 외에는 저장 실패 안내, 이미지 단계 진행 안 함입니다. [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) | 저장 미실행·미검증 |
| 이미지 실패 | 실패 안내, 부모 미통지·Clear 없음, 앞선 HML 임시 결과는 존재할 수 있습니다. [W:277](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:277>) | 저장 미실행·미검증 |
| 콜백 없음·API throw | 연결 코드의 공통 timeout/catch/finally가 없습니다. busy 잔류와 재시도는 런타임 확인 대상입니다. [W:113](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:113>) [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) [W:277](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:277>) | 미검증 |
| webhwp-error | ready=false·상태/console, 외부 클릭은 ready 가드로 중단합니다. [W:422](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:422>) | 미검증 |
| 부모 종료·신원 불일치 | 통지 생략 또는 부모 반려와 팝업의 성공·Clear 흐름이 별개입니다. [W:197](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:197>) [P:6447](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6447>) | 미검증 |
| 세션 만료 | W에 HTTP 상태·로그인 리다이렉트 분류가 없습니다. vendor/로더/부모 API마다 다를 수 있습니다. [W:51](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:51>) [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) | 미검증·응답 기준 필요 |

후속 QA는 다음 순서로 나누어 수행해야 합니다. 이 조사에서는 실행하지 않았으며 **파일 생성·저장·CMS 반영·실패 응답·세션 조작이 필요한 항목은 허용된 테스트 대상이 필요합니다.**

1. 기존 단건/지문/번역 표본에서 네 slot 활성화·최초 question 자동 열기·URL 없는 question/explain 새 문서·직접 주소 진입 잠금을 확인합니다. [W:130](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:130>) [W:354](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:354>)
2. 미저장 편집 후 같은/다른 slot 전환, 로드 실패 후 저장 대상/본문 일치, 부모 문항 이동 후 재열기, 부모 닫힘을 확인합니다. [W:83](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:83>) [W:154](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:154>) [W:196](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:196>)
3. 메뉴 표시만 확인한 항목을 실제 실행·확정·취소·undo/redo·키보드 접근성·활성 조건으로 나누어 시험합니다. 인쇄·클립보드·파일선택은 별도 영향도 함께 기록합니다. [E067:35](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/067-hml-file-menu.txt:35>) [E073:42](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/evidence/073-hml-table-menu.txt:42>)
4. HML SaveAs와 PNG의 본문·단·여백·용지·페이지수·수식·이미지를 비교합니다. 1쪽·다쪽·매우 긴 문서, 200회 종료, 이미지 실패 후 재시도·저장 중 편집도 확인합니다. [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) [W:225](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:225>) [W:267](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:267>)
5. SaveAs/이미지의 성공·실패·false 반환·콜백 미도착·예외를 나누고 버튼·busy·status·파일 잔존을 확인합니다. [W:113](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:113>) [W:183](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:183>) [W:277](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:277>)
6. 부모의 origin/type/frameId/slot/itemId/detailId·문자열/숫자 불일치와 결과 수신·거절·빈 URL을 확인합니다. 팝업 성공 모달, 부모 수신 토스트, 최종 CMS 저장을 각각 따로 판정합니다. [W:409](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:409>) [W:196](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:196>) [P:6443](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6443>)
7. 최종 CMS 임시/전체 반영의 버전·파일 복사·기존 슬롯 유지/삭제·권한·세션·실패 정리 정책은 서버 또는 승인된 시험으로 확정합니다. “서버가 저장소로 옮긴다”는 W 주석은 서버 검증 근거가 아닙니다. [W:8](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/assets/webhwp-ea2cf4d106cdce39bfb984c607cb87cc.js:8>) [P:6900](<D:/jaehyuk.myung/claude_demo/Demo_21_출제 마법사_v2_REA/cms-knowledge/master-cms/sources/item-edit.html:6900>)

