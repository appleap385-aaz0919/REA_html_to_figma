# 세트 승인과 쌍둥이 COPY 정책 검토

이 보고서는2026-11-10의 **phase44~46, 근거2495~2566**을 다룹니다. 자체 공유세트의 자식2089242~2089245에 대해 OMR 보완3회·그룹 승인1회·세트 COPY1회를 실제로 실행했고, 새 지문2089357과 자식2089358~2089361을 확인했습니다. phase44는 업무 변경0회, phase45는4회, phase46은1회이며 확정 Master 누계는 **58회**입니다. 이 정적 작업은 로컬 1차 근거·보존 소스만 읽었고 브라우저·네트워크·CMS API·원장·전역 파일을 조작하지 않았습니다. [phase44](session-20261110-phase44.json#L1), [phase45](session-20261110-phase45.json#L1), [phase46](session-20261110-phase46.json#L1), [검증 의도/확정값](own-set2089242-review-and-twin-intent-20261110.json#L1)

**승인 전 차단과 세트 생성 조건**

시작 시 네 자식은 모두R였고 상세는2088976~2088979였습니다. 비교 단건2089246은2088877/R였으며, 첫 자식2089242만 저장 OMR이 있었습니다. 선택 원본의 생성 이력은 빈 배열이고 쌍둥이 그룹은0개였습니다. [기준 상세](evidence/2496-own-set2089242-before-twin-all-items-read.json#L53), [OMR/수정폼 기준](evidence/2501-own-set2089242-before-approval-all-edit-reference-read.json#L53), [그룹/이력 기준](evidence/2497-own-set2089242-before-twin-history-group-read.json#L53)

R 상태의 생성 버튼은 실제로 비활성이었습니다. 보존된 숨김 모달은 “세트에 승인(사용)이 아닌 문항이 있어 생성할 수 없습니다”라고 안내하며 `data-is-set=true`입니다. 따라서 **표시된 생성 정책은 세트 전원 승인Y**이고, 실제로는 전원R의 비활성과 이후 전원Y의 활성을 확인했습니다. 숨김 모달의 문구 확인을 모달 열기 성공이나 서버 생성 거절로 세지 않습니다. 2498은 버튼 비활성을 확인한 조사 스크립트가 클릭 전에 중단된 기록입니다. [버튼/숨김 템플릿 관찰](evidence/2500-own-set2089242-twin-action-availability.json#L52), [비활성 버튼 소스](sources/own-set2089242-before-twin-20261110.html#L653), [전원 승인 안내](sources/own-set2089242-before-twin-20261110.html#L1170), [클릭 전 중단](evidence/2498-own-set2089242-twin-generation-dialog-open.json#L1)

상태 수정을 실제로 열어Y를 선택하고 저장 진입을 시도하자2089243·2089244·2089245의 OMR 누락을 각 문항ID와 함께 안내했고, 확인창은 열리지 않았습니다. 로컬 선택은 실제 취소로R로 되돌렸고 독립 조회에서 상태/버전이 유지됐습니다. 이것은 확인창 전의 승인 검사이며 최종 상태 저장은 실행하지 않았습니다. [실제 누락 안내](evidence/2502-own-set2089242-incomplete-approval-ui-probe.json#L53), [실제 취소](evidence/2504-own-set2089242-incomplete-approval-cancel-local.json#L53), [변경 없음](evidence/2505-own-set2089242-after-approval-guard-server-read.json#L53)

보존 소스의 승인 검사는 각 자식의 렌더된 메타와 저장 OMR/정답을 순회해 필수 메타와 `OmrValidate.checkData`를 검사합니다. 문제가 있으면 문항ID별 안내를 표시하고 확인창 전에 반환합니다. 세트 상태 확인창은 전체 상태가 함께 바뀐다고 안내하며, 최종 확인 버튼에서 폼을 제출합니다. 이 클라이언트 선언과 실제 누락 차단은 대응하지만 서버의 모든 승인/역할 규칙까지 확인한 것은 아닙니다. [승인 검사](sources/own-set2089242-before-twin-20261110.html#L2007), [확인창 전 차단](sources/own-set2089242-before-twin-20261110.html#L2032), [세트 확인 안내](sources/own-set2089242-before-twin-20261110.html#L1830), [최종 제출 코드](sources/own-set2089242-before-twin-20261110.html#L2046)

**OMR 보완3회와 그룹 승인1회의 차이**

세 자식의 SBSANM 입력란에 기존 문서의 정답을 TeX로 입력했습니다. 각각 `1\times3\text{행렬}`, `2\times2\text{행렬}`, `2\times3\text{행렬}`이며 코드포인트와 직렬화 값도 확인했습니다. 각 로컬 입력과 확인창을 거쳐 최종 전체반영을 한 번씩 실행했습니다. [2089243 입력](evidence/2509-own-set-child2089243-omr-answer-local.json#L53), [저장2511](evidence/2511-own-set-child2089243-omr-submit-once.json#L53), [2089244 입력](evidence/2518-own-set-child2089244-omr-answer-local.json#L53), [저장2520](evidence/2520-own-set-child2089244-omr-submit-once.json#L53), [2089245 입력](evidence/2527-own-set-child2089245-omr-answer-local.json#L53), [저장2529](evidence/2529-own-set-child2089245-omr-submit-once.json#L53)

| 확인 시점 |2089242의 상세 |2089243의 상세 |2089244의 상세 |2089245의 상세 |동작/상태 |
|---|---:|---:|---:|---:|---|
| 기준2501 |2088976 |2088977 |2088978 |2088979 |전원R이며 첫 자식만 OMR이 있었습니다. |
|2089243 보완 후2513 |2089044 |2089043 |2089045 |2089046 |이 자식의 OMR만 추가됐고 네 상세가 바뀌었습니다. |
|2089244 보완 후2522 |2089048 |2089049 |2089047 |2089050 |이 자식의 OMR만 추가됐고 네 상세가 바뀌었습니다. |
|2089245 보완 후2531 |2089052 |2089053 |2089054 |2089051 |이 자식의 OMR만 추가됐고 네 상세가 바뀌었습니다. 전원R였습니다. |
|그룹 승인 후2537 |2089052 |2089053 |2089054 |2089051 |한 번의 상태 저장으로 전원Y가 됐고 상세 번호는 같았습니다. |

표의 신원과 OMR은 각 단계의 독립 수정폼/상세 조회에서 확인했습니다. 세 번의 전체반영마다 바뀐 OMR은 해당 자식 하나였으며, 모든 질문/공유지문 편집 모델·HML 슬롯/URL·다른 자식 OMR 및 비교 단건2089246의 참조는 유지됐습니다. 이는 이 세 표본의 실제 결과이고, 모든 세트/저장 경로의 보편적인 버전 규칙은 아닙니다. [기준 참조](evidence/2501-own-set2089242-before-approval-all-edit-reference-read.json#L53), [첫 보완](evidence/2513-own-set-child2089243-omr-all-reference-read.json#L53), [둘째 보완](evidence/2522-own-set-child2089244-omr-all-reference-read.json#L53), [셋째 보완](evidence/2531-own-set-child2089245-omr-all-reference-read.json#L53)

네 자식의 OMR이 준비된 뒤 마지막 자식2089245에서Y를 선택했습니다. 실제 확인창은 “세트 문항 전체의 상태값이 함께 변경됩니다”라고 안내했습니다. 최종 상태 저장2535 한 번으로 네 자식 모두Y가 됐고, 저장 전2531과 저장 후2537의 수정폼 참조 전체가 같았습니다. 즉 이 상태 저장은 OMR 보완의 전체반영과 달리 상세 번호·OMR·모델·HML 경로를 바꾸지 않았습니다. 비교 단건2089246도R/2088877을 유지했습니다. Master 승인Y는 서비스 배포를 뜻하지 않습니다. [확인창](evidence/2533-own-set2089245-reviewed-set-approval-confirm-open.json#L53), [최종 상태 제출](evidence/2535-own-set2089245-reviewed-set-approval-submit-once.json#L53), [참조 유지](evidence/2537-own-set2089245-approved-all-reference-read.json#L53), [전원Y 상세](evidence/2538-own-set2089245-approved-all-detail-read.json#L53)

**실제 세트 COPY와 상속 정보**

전원Y가 된 첫 자식으로 돌아왔을 때 그룹0개·작업중false·생성 버튼 활성 상태였습니다. 정상 버튼으로 연 모달은 세트의 모든 문항이 함께 생성된다고 안내했고 COPY/AI가 모두 활성화됐습니다. 기본 선택은COPY였습니다. phase45는 이 확인창까지만 관찰했고, 실제 생성은 다음 단계2545에서 한 번 제출했습니다. 관측 POST는 `itemId=2089242`, `sourceType=COPY`였습니다. 세트AI는 제출하지 않았습니다. [활성 조건](evidence/2540-own-set2089242-approved-twin-button-availability.json#L52), [실제 모달](evidence/2541-own-set2089242-approved-twin-dialog-open.json#L53), [세트 생성 안내 소스](sources/own-set2089242-approved-twin-dialog-20261110.html#L1169), [COPY 최종 제출](evidence/2545-own-set2089242-twin-copy-submit-once.json#L53)

새 지문은2089357이고 새 자식 네 개는 아래와 같습니다. 각 새 자식은 대응하는 원본을 부모로 표시하고 전원R로 생성됐습니다. [새 상세/부모](evidence/2550-own-set-copy2089357-all-detail-read.json#L53), [새 수정폼](evidence/2551-own-set-copy2089357-all-reference-read.json#L53), [대조 결과](set-twin-copy-comparison-20261110.json#L1)

| 원본 자식 |원본 현행 상세 |새 자식 |새 상세 |새 상태 |
|---|---:|---:|---:|---|
|2089242 |2089052 |2089358 |2089059 |R |
|2089243 |2089053 |2089359 |2089060 |R |
|2089244 |2089054 |2089360 |2089061 |R |
|2089245 |2089051 |2089361 |2089062 |R |

네 대응 쌍의 질문/공유지문 편집 모델·저장 OMR/정답·HML 슬롯과 참조URL은 원본과 같았습니다. 새 자식의 원본 파일/출처 링크는 없고 평가지 수는0개입니다. 원본 네 자식은Y와 기존 상세/모델/OMR/HML을 유지했고 비교 단건도 바뀌지 않았습니다. HML URL 동일성은 관측한 참조의 동일성입니다. 새 물리 파일 할당·저장소 복제 여부·복제 후 편집 격리·파일 바이트 재다운로드 해시는 이 단계에서 확인하지 않았습니다. [원본 유지 참조](evidence/2549-own-set2089242-twin-copy-original-reference-read.json#L53), [원본 유지 상세](evidence/2548-own-set2089242-twin-copy-original-detail-read.json#L53), [복제 상세](evidence/2550-own-set-copy2089357-all-detail-read.json#L53), [복제 참조](evidence/2551-own-set-copy2089357-all-reference-read.json#L53), [비교 범위/한계](set-twin-copy-comparison-20261110.json#L1)

**그룹 수·생성 이력·해제 단위**

“쌍둥이2개”는 이번 세트 문항에서 **원본 지문2089241과 새 지문2089357의 두 세트**를 뜻했습니다. 실제 목록은 각 세트4행씩 총8개 자식ID를 표시합니다. 원본/복제의 모든8개 문항을 조회해 같은 두 세트 구성을 확인했습니다. 단건 쌍둥이의 멤버 수와 같은 의미로 세면 안 됩니다. [생성 후 그룹](evidence/2547-own-set2089242-twin-copy-history-group-read.json#L53), [8개 문항의 관계 조회](evidence/2552-own-set-twin-original-copy-eight-memberships-read.json#L53), [실제 모달](evidence/2562-own-set-copy2089358-twin-current-modal-inspect.json#L53)

원본 네 자식은 각각 생성 이력1개를 반환했으며, 모두 같은 새 자식ID 네 개와 복제/등록자/표시시각을 가리켰습니다. 새 네 자식의 생성 이력은 각각0개였습니다. 원본의 이력1개를 서로 다른 COPY4회로 더하지 않으며, 새 자식의 빈 이력을 그룹 관계가 없다는 뜻으로 해석하지 않습니다. [원본 선택 이력](evidence/2547-own-set2089242-twin-copy-history-group-read.json#L53), [원본/복제8개 이력](evidence/2552-own-set-twin-original-copy-eight-memberships-read.json#L53)

실제 현재 그룹 모달은 **세트당 해제 버튼 하나**를 표시했습니다. 두 버튼의 경로는 `twinDataType=PASSAGE`와 각각의 지문ID2089357/2089241을 사용합니다. 이는 표시된 실행 단위와 주소의 근거입니다. cutoff2566에서는 버튼을 실행하지 않았으므로 세트 해제·정상 재추가·이력 유지 결과는 미검증입니다. phase47의 후속 실행을 이 보고서에 섞지 않습니다. [버튼/경로 관찰](evidence/2562-own-set-copy2089358-twin-current-modal-inspect.json#L53), [새 지문 해제 선언](sources/own-set-copy2089358-twin-current-20261110.html#L954), [원본 지문 해제 선언](sources/own-set-copy2089358-twin-current-20261110.html#L1048), [cutoff의 남은 작업](session-20261110-phase46.json#L1)

새R 복제의 상단에는 생성/생성 이력 진입 버튼이 없음을2562에서 명시적으로 확인했습니다. 생성 이력 데이터 조회의 빈 배열과 상단 진입 버튼 미노출은 다른 관찰입니다. 미노출의 전체 렌더 조건이나 모든 파생문항/승인 상태의 정책은 확정하지 않았습니다. 2556 뒤 로컬 출력의 KeyError는 undefined 버튼 키가 JSON에서 생략된 데서 발생했으며, 후속2562가 `exists=false`를 명시했습니다. 이를 CMS 저장/조회 실패로 기록하지 않습니다. [미노출 재관찰](evidence/2562-own-set-copy2089358-twin-current-modal-inspect.json#L53), [기록 한계 설명](session-20261110-phase46.json#L1)

**픽셀과 기록 보정의 범위**

부모 연구자는2534의 그룹 승인 확인창,2543의 활성 생성 모달,2557~2560의 새 복제 상세,2563의 현재 그룹 모달 PNG를 직접 열어 검토했습니다. 새 상세의 실제 위치0/800/1600/1779와 화면높이1015는 전체2794px를 겹쳐 덮습니다. 현재9개 이미지는 모두 로드 완료이고 자연 크기가 양수였습니다. 그룹 모달 본문은 높이/전체높이 모두818px이며 두 세트8행·세트당 해제1개가 한 화면에 들어갔습니다. 이는 부모의 검토 기록을 인용한 것이며 다른 상태/역할/화면폭의 픽셀 완료를 뜻하지 않습니다. [승인 확인 PNG](evidence/2534-own-set2089245-reviewed-set-approval-confirm-pixels.png), [생성 모달 PNG](evidence/2543-own-set2089242-approved-twin-dialog-pixels.png), [이미지 로드](evidence/2556-own-set-copy2089358-current-image-load-state.json#L52), [상단0](evidence/2557-own-set-copy2089358-pixels-0.json#L52), [800](evidence/2558-own-set-copy2089358-pixels-800.json#L52), [1600](evidence/2559-own-set-copy2089358-pixels-1600.json#L52), [하단1779](evidence/2560-own-set-copy2089358-pixels-1779.json#L52), [모달 크기](evidence/2562-own-set-copy2089358-twin-current-modal-inspect.json#L53), [그룹 모달 PNG](evidence/2563-own-set-copy2089358-twin-current-modal-top-pixels.png)

2499/2500은 같은 상태의 읽기를 같은 번호로 다시 실행한 기록 보정 대상입니다. phase44는2499 HTML 해시와2500 반환값이 같고 관찰시각/타이밍만 후속 기록으로 대체됐다고 명시합니다. 기록 도구는 기존 라벨을 브라우저 명령 전에 거절하도록 보완됐습니다. 이 중복 읽기를 추가 CMS 변경 제출이나 실패 후 생성 재시도로 세지 않습니다. [recordingCorrection](session-20261110-phase44.json#L1)

남은 범위는 세트 단위 실제 해제/재추가, 세트AI, 다른 그룹 병합, 복제 후 공유 HTML/HML 편집 격리, 공유세트 CMS 임시저장, 다른 상태/역할·서비스 배포와 서버 전체 규칙입니다. 모달에 수식 요약이 TeX 문자열로 보이는 현재 모습도 기록했지만 요구 정책이 확인되지 않아 오류로 단정하지 않았습니다. 전체 사이트 완료율은 산정하지 않습니다. [남은 범위/한계](session-20261110-phase46.json#L1)
