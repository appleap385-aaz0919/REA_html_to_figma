# Definition ESSAY·FIVE 단독 대조와 Master 타입 매핑

작성일은 2026-11-10이며 반영 범위는 근거2706~2759입니다. 기존 MULTI3 멤버를 바이트 그대로 단독 ZIP에 넣은 ESSAY와 FIVE_CHOICE가 각각 정상 등록됐고, S 최종 승인 후 문서696/697은 Y, 생성 Master 문항은 각각 R로 확인됐습니다. 실제 타입은 ESSAY→ESBA00, FIVE_CHOICE→OBSACN입니다. 이는 확인한 두 표본의 매핑이며 전체 enum·모든 유형의 일반 변환 규칙을 확정한 결과는 아닙니다.

이 보고서와 phase53 보완 맵만 새로 작성했습니다. 브라우저·네트워크·CMS API·전역 원장/인덱스는 조작하지 않았으며 기존 보고서·맵·fixture를 보존했습니다. 실행 결과는 저장된 로컬 근거와 intent를 대조했고 PNG 직접 시각 검토는 부모 연구자의 기록을 인용했습니다.

## 1. 입력 바이트와 등록 조건

[ESSAY intent](definition-essay1-control-intent-20261110.json)와 [FIVE intent](definition-five1-control-intent-20261110.json)에 적힌 단독 ZIP을 실제로 다시 열어 MULTI3의 해당 JSON과 바이트가 같은지 확인했습니다. 두 ZIP 모두 루트 JSON 한 개뿐이고 CRC 검사를 통과했습니다. JSON ID·표지·문제·정답·그레이딩·날짜를 새로 바꾸지 않았습니다.

| 입력 | 단독 ZIP | ZIP 바이트 | JSON 멤버 / 바이트 | ZIP SHA-256 |
|---|---|---|---|---|
| ESSAY | `QA-DIFI-20261110-07-ESSAY1.zip` | 951 | `2116111012.json` / 1730 | `9337c39d6b88c84efb57b6c9b19cc5ce3787ad9347fcfa420744ce34aabdad5e` |
| FIVE_CHOICE | `QA-DIFI-20261110-08-FIVE1.zip` | 975 | `2116111022.json` / 2129 | `219abd302ca0bd4c72adb7ca734bdc73831a15a2973fed604108e83ce32314ad` |

ESSAY JSON의 SHA-256은 `fa4297c0d54e0d7ced9e3bca5a72369a1be66ffef19140e9c808671462c02c44`, FIVE JSON은 `c0ac64210a205b523d5b94edaa8075ade3228f14bbac3fc13f03f786d76a7d73`입니다. 실패한 문서694에서 사용한 외부 ID도 그대로 재사용했습니다. 따라서 이 두 단독 성공은 questionId≠masterId, 기존 p/span 표지, 같은 외부 ID가 이 실행에서 수용됐다는 근거입니다. 모든 중복·예약 정책이나 실패 단계의 내부 쓰기 유무를 증명하지는 않습니다.

두 입력은 Source13, 단원20자 코드 `22MMAT0KOK1001020000`, 페이지1~3, 공통(C)을 동일하게 사용했습니다. 사전 확인은 [2713](evidence/2713-definition-essay1-before-submit-verified.json)과 [2727](evidence/2727-definition-five1-before-submit-verified.json), 등록 최종 클릭은 [2714](evidence/2714-definition-essay1-register-submit-once.json)와 [2728](evidence/2728-definition-five1-register-submit-once.json)에 각각 `attemptCount=1`로 기록돼 있습니다. 이 메타를 수용한 사실을 원본 questionAttribute와의 전체 필드 대응이나 덮어쓰기 규칙으로 확대하지 않습니다.

## 2. 생성 문항과 최종 승인

| 입력 | 생성 문서 | 생성 itemId / detailId | 등록 후 상태 | 최종 S 승인 근거 | 최종 문서 / Master |
|---|---|---|---|---|---|
| ESSAY | 696 | 2089376 / 2089083 | 문서 초안R, 검수 초기S, 카드1개 | 2748, 최종1회 | Y / R |
| FIVE_CHOICE | 697 | 2089377 / 2089084 | 문서 초안R, 검수 초기S, 카드1개 | 2737, 최종1회 | Y / R |

[2719](evidence/2719-definition696-essay-draft-observation.json)와 [2733](evidence/2733-definition697-five-draft-observation.json)은 각각 초안 문서·카드·문제/정답/풀이를 보여 줍니다. 카드 검수값 S는 문서 초안R이나 Master 문항 상태와 다른 축입니다.

[승인 intent](definition-type-controls-s-approval-intent-20261110.json)에 따라 FIVE 문서697을 먼저 승인하고 ESSAY 문서696을 승인했습니다. [2737](evidence/2737-definition697-s-final-approval-once.json)은 itemIds2089377/loadFlagsS, [2748](evidence/2748-definition696-s-final-approval-once.json)은 itemIds2089376/loadFlagsS를 생성했으며 각 `attemptCount=1`입니다. 확인창을 연 동작과 최종 승인을 구분했습니다.

문서697의 최종 목록·상세는 [2739](evidence/2739-definition697-s-list-readback.json), [2742](evidence/2742-definition697-approved-final-observation.json), 문서696은 [2750](evidence/2750-definition696-s-list-readback.json), [2753](evidence/2753-definition696-approved-final-observation.json)에서 확인했습니다. 문서 승인Y는 개별 Master 승인Y나 OMR·메타 준비 완료를 뜻하지 않습니다. 두 문항을 별도로 Master 승인하거나 배포하지 않았습니다.

이번 네 업무는 ESSAY 등록66, FIVE 등록67, FIVE S 승인68, ESSAY S 승인69입니다. 등록 전 누계65에서 최종69로4회 증가했으며 조회·모달 열기·PNG·이 로컬 정리 작업은 업무 수에 더하지 않았습니다. DB 변경 행 수는 알 수 없습니다.

## 3. 실제 타입은 qtCurrent로 구분

최종 Master의 상세·수정 응답은 각각 [2743](evidence/2743-definition697-s-master-item-readback.json)과 [2754](evidence/2754-definition696-s-master-item-readback.json)에 저장돼 있습니다. 수정 응답은 스크립트를 실행하지 않은 inert DOM 파싱이므로 초기 select 값과 저장된 현재 타입을 구분해야 합니다.

| 입력 | 상세의 문항 형태 | 수정 응답의 `#qtCurrent` | 채택한 실제 타입 |
|---|---|---|---|
| FIVE_CHOICE | 객관식 > 단답형 > N지 선다 | `OBSACN` | OBSACN |
| ESSAY | 서술형 > 기본형 > 기본 서술형 | `ESBA00` | ESBA00 |

두 inert 수정 응답의 `qtCategory`, `qtAnswer`, `qtType`은 모두 초기 `OB`, `OBSA`, `OBSACN`을 담습니다. 특히 ESSAY 응답에서도 이 기본값이 남으므로 이를 ESSAY의 실제 객관식 타입 근거로 사용하지 않았습니다. 상세의 형태 표시와 `qtCurrent=ESBA00`이 ESSAY 타입 근거입니다. FIVE는 `qtCurrent=OBSACN`을 채택했으며 다른 잠정 코드는 최종 매핑에 사용하지 않았습니다. 전역 원장의 과거 정정이나 현재 파일은 이 작업에서 수정하지 않았습니다.

| 항목 | FIVE 생성 모델 | ESSAY 생성 모델 |
|---|---|---|
| `outType` / `contentVersion` | definition / v3 | definition / v3 |
| `grading.mode` | choice | exact_match |
| `grading.answerValues` | `["4"]` | `[""]` |
| `grading.choices` | `[4]` | 해당 필드 없음 |
| `grading.value` / 표시 정답 | ④ | 풀이 참조 |
| HTML 선택지 | 원래5개 | 빈 배열 |

생성 v3 HTML은 원본 legacy HTML의 복사본 자체와 같지 않습니다. 관측 모델에서는 글자 클래스가 font-s20으로 바뀌었고, ESSAY의 d-textarea는 `[서술형 답안]` 표시로 변환됐습니다. 이를 입력 ZIP 바이트 변경으로 혼동하지 않습니다. ESSAY의 빈 answerValues와 exact_match 표시는 저장된 생성 모델을 읽은 결과이며 실제 학생 채점이나 서술형 채점 정책을 검증한 것은 아닙니다.

## 4. 문서 승인 후에도 남은 메타·OMR 공란

두 Master 상세의 viewFlag는 R이며 저장된 `savedOmrData`와 `savedAnswerData`는 모두 `null`입니다. 수정 응답의 `questionEditorData`에는 위 v3 본문/그레이딩 모델이 들어 있습니다. 따라서 표시 정답이나 v3 grading의 존재를 저장 OMR·정답 데이터의 존재와 동일시하지 않습니다.

두 문항 모두 난이도·단원코드·성취기준·내용영역·행동영역·교과역량·유형정보는 미입력 표시이며 출처1개, 평가지0개, 쌍둥이0개입니다. 이 관측은 S 승인 후의 해당 두 표본에 한정됩니다. AI 내부 요청·응답·추천 실패·제외 정책이나 최종 완료 시점은 확인하지 않았으므로 메타가 비어 있는 원인을 단정하지 않습니다. 새 OMR 미리보기·보완 저장·학생 제출·개별 문항 승인·서비스 배포도 수행한 결과로 기록하지 않습니다.

## 5. 현재 승인 문서의 픽셀 범위

부모 연구자가 지정 PNG 네 개의 실제 화면을 직접 확인했습니다. 이 정적 정리 작업에서는 PNG 헤더와 저장된 스크롤 구간만 검사했습니다. 네 PNG는 모두1810×1075이며 이 파일 크기와 내부 스크롤 높이는 서로 다른 값입니다.

| 문서 | 상단 근거 / 실제 top·height | 하단 근거 / 실제 top·height | 전체 scrollHeight |
|---|---|---|---|
| 696 Y | 2755 / 0·1015 | 2756 / 265·1015 | 1280 |
| 697 Y | 2758 / 0·1014 | 2759 / 297·1015 | 1312 |

696의 구간은0~1015와265~1280, 697은0~1014와297~1312로 전체 세로를 덮습니다. 근거2757은697 승인 화면을 여는 동작이며 PNG 완료는2758/2759에 연결했습니다.

- [696 상단](evidence/2755-definition696-approved-top-visual.png), [696 하단](evidence/2756-definition696-approved-bottom-visual.png)
- [697 상단](evidence/2758-definition697-approved-top-visual.png), [697 하단](evidence/2759-definition697-approved-bottom-visual.png)

이 완료 범위는 현재 두 승인 문서의 해당 뷰포트 전체 세로입니다. 별도 Master 상세/수정폼·승인 모달·등록폼·다른 문서/상태/역할/화면폭의 픽셀 완료로 확대하지 않았습니다.

## 6. 보존 소스의 줄바꿈과 해시

다음 HTML 소스와 schema 파일을 대조했습니다. HTML 파일은 CRLF 줄바꿈으로 보존되어 원시 바이트 해시가 schema의 LF 기준 HTML 해시와 다릅니다. CRLF만 LF로 정규화하면 네 파일 모두 해당 1차 evidence의 `result.html`과 바이트가 완전히 같고 schema의 크기·SHA와 일치합니다. 원본 파일을 다시 저장하거나 수정하지 않았습니다.

| 보존 소스 | 원시 UTF-8 바이트 | LF 정규화 바이트 / CRLF 수 | 연결된 1차 근거 |
|---|---|---|---|
| [696 초안](sources/definition696-essay-draft-20261110.html) | 436197 | 435329 / 868 | 2718 |
| [696 최종](sources/definition696-s-approved-final-20261110.html) | 427512 | 426816 / 696 | 2752 |
| [697 초안](sources/definition697-five-draft-20261110.html) | 439030 | 438162 / 868 | 2732 |
| [697 최종](sources/definition697-s-approved-final-20261110.html) | 430344 | 429648 / 696 | 2741 |

원시 해시와 정규화 해시는 phase53 맵의 source provenance에 따로 기록했습니다. 이 차이를 CMS 데이터 변조나 한국어 손상으로 분류하지 않습니다.

## 7. MULTI3 실패 후보에서 좁혀진 범위

선행 [phase52 맵](coverage-supplement-20261110-phase52.json)과 [phase52 세션](session-20261110-phase52.json)은 MULTI3의 ORDERED JSON을 단독으로 등록한695의 정상 파싱을 기록합니다. 이번에는 나머지 ESSAY와 FIVE도 동일 멤버 바이트의 단독 등록으로 정상 파싱됐습니다. 따라서 MULTI3의 세 JSON은 각각 단독 문맥에서 정상 등록된 대조군을 갖게 됐습니다.

이 결과는 ESSAY 자체가 전혀 지원되지 않는다거나 빈 correctValue/gradeYn=false 때문에 이 바이트가 항상 실패한다는 설명의 범위를 좁힙니다. FIVE와 ORDERED도 해당 바이트 자체의 필연적인 단독 파싱 실패로 설명할 수 없습니다. questionId≠masterId, 표지 span, 현재 등록 메타 역시 이 단독 문맥에서는 수용됐습니다.

그러나694의 정확한 실패 원인은 여전히 미확정입니다. 멤버 수·혼합·순서·ZIP 전체 처리·부분 실패/트랜잭션·내부 중복/예약·서비스 환경을 서로 분리하지 못했습니다. 정상 다중 JSON, Definition 세트, 첨부 자산, 혼합 S/F/D 최종 처리나 모든 형식 지원 성공을 이번 결과로 주장하지 않습니다. 앞선 정적 실패 분석 보고서는 당시 근거의 역사적 기록으로 보존하고 이 후속 결과를 덧붙였습니다.

## 8. 사용자 표본 답변과 남은 조사 범위

[사용자 표본 답변 기록](user-sample-availability-20261110.json)의 답변은 `둘 다 현재는 없어`입니다. 현재 사용할 수 있는 해석 HML 실파일 표본과 정상 Definition 세트 ZIP 표본이 모두 없다는 뜻으로 기록했습니다. 사용자 응답은 도착했으며 더 이상 응답 대기나 재질문 필요 상태로 분류하지 않습니다.

해석 HML의 실제 파일 편집·저장과 정상 세트 ZIP의 입력 스키마는 표본 부족으로 미검증입니다. 이 기능이 지원되지 않는다거나 사이트 전체에 그런 표본이 없다는 뜻은 아닙니다. 원본 파일이 없는 seed 세트로 입력 스키마를 만들어 내지도 않습니다. 기존 근거를 이용한 독립 조사는 계속할 수 있으며 현재 사용자에게 추가 답변을 요구하지 않습니다.

## 9. 보완 맵과 검증 범위

[phase53 보완 맵](coverage-supplement-20261110-phase53.json)은 완성된 phase52 맵을 복사해 이번 결과를 추가했습니다. 작성 도중 phase52 맵의 생성이 확인돼 phase49 직접 상속 대안을 사용하지 않았습니다. 기존 phase49/52 파일은 수정하지 않았습니다. 선행 맵의 옛 미검증 문구는 당시 시점의 역사적 기록이며 현재 ESSAY/FIVE 단독 성공 및 사용자 답변 상태는 phase53 항목으로 갱신했습니다.

입력 ZIP/JSON 해시, 등록/승인 각1회, 최종 문서·Master 상태, qtCurrent, OMR/메타, source의 줄바꿈 대조, PNG 구간, 로컬 참조와 UTF-8을 검증했습니다. 전체 사이트의 화면·기능 분모는 unknown이며 완료율은 null입니다. 업무69회나 보완 맵의 레코드 수를 전체 완료율로 바꾸지 않았습니다.
