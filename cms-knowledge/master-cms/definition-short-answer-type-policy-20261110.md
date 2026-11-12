# SHORT_ANSWER의 실제 Master 타입과 ORDERED 비교

작성일은 2026-11-10이며 신규 근거 범위는 phase56의2819~2845입니다. SHORT_ANSWER 단독 입력은 문서700, item2089380/detail2089087을 만들었고 S 최종 승인 후 문서Y·MasterR로 확인됐습니다. 실제 타입은 `qtCurrent=SBSANM`, 상세 표시는 `주관식 > 단답형 > 일반형`입니다. 기존695의 SHORT_ANSWER_ORDERED는 `SBMANM`, `주관식 > 다답형 > 일반형`이므로 두 표본의 결과 타입이 다르다는 사실은 확인됐습니다. 서버가 어떤 필드 조합으로 타입을 결정하는지는 확인하지 못했습니다.

이 작업은 로컬 파일만 읽고 이 보고서만 새로 작성했습니다. 브라우저·네트워크·CMS·전역 원장/인덱스·맵을 조작하지 않았으며 기존 문서와 fixture를 수정하지 않았습니다. 아래 관측은 전체 변환 규칙이나 학습자 채점 정책의 확정이 아닙니다.

## 1. SHORT1 등록과 승인 결과

[SHORT1 등록 intent](definition-short1-control-intent-20261110.json)에 따라 `QA-DIFI-20261110-11-SHORT1.zip`이 등록됐습니다. 파일은1029바이트이며 루트 JSON `2116111142.json` 한 개만 담고 PNG는 없습니다. 입력 메타는 Source13, 단원20자 코드 `22MMAT0KOK1001020000`, 페이지1~3, 공통(C)입니다. 이는 등록 때 수용된 조건이며 올바른 학문적 단원 배정이나 questionAttribute와의 대응 규칙을 증명하지 않습니다.

[2826](evidence/2826-definition-short1-before-submit-verified.json)은 파일 SHA와 입력 메타의 사전 확인, [2827](evidence/2827-definition-short1-register-submit-once.json)은 `attemptCount=1`인 등록 최종 클릭을 기록합니다. [2832](evidence/2832-definition700-short-draft-observation.json)에서 문서 초안R, 카드2089380/2089087 한 개, 문제·정답11·풀이를 확인했습니다.

[S 승인 intent](definition700-s-approval-intent-20261110.json)와 [2837](evidence/2837-definition700-s-modal-observation.json), [2838](evidence/2838-definition700-s-modal-fresh-observation.json)은 해당 문항의 검수S와 승인 확인창을 연결합니다. 최종 승인은 [2839](evidence/2839-definition700-s-final-approval-once.json)에서 한 번 실행됐습니다. 최종 목록·상세는 [2841](evidence/2841-definition700-s-list-readback.json), [2844](evidence/2844-definition700-approved-final-observation.json), Master 상세·수정 응답은 [2845](evidence/2845-definition700-s-master-item-readback.json)에서 확인했습니다.

| 항목 | 최종 관측 |
|---|---|
| Definition 문서 / 상태 | 700 / Y |
| Master itemId / detailId / 상태 | 2089380 / 2089087 / R |
| 실제 타입 | SBSANM, 주관식 > 단답형 > 일반형 |
| 표시 정답 / 생성 모델의 answerText | 11 / `"11"` |
| savedOmrData / savedAnswerData | `null` / `null` |
| 난이도·단원·성취기준·내용/행동영역·교과역량·유형정보 | 미입력 표시 |
| 출처 / 평가지 / 쌍둥이 | 1개 / 0개 / 0개 |
| Service 배포 | 실행하지 않음 |

문서Y는 MasterY나 OMR 준비 완료를 뜻하지 않습니다. [phase56 세션](session-20261110-phase56.json)에 기록된 업무 수는 등록 전73, 등록 후74, 최종 S 승인 후75입니다. 이 보고서 작성·조회·픽셀 확인을 추가 업무로 세지 않았으며 DB 변경 행 수는 확인하지 않았습니다.

## 2. 원본 → ASSET3 → SHORT1의 바이트 대조

SHORT1의 유일한 JSON은 ASSET3의 `2116111142.json`을 바이트 그대로 사용합니다. 이 JSON은 실제 원본299의 내부 `100701105.zip`에서 나온 SHORT_ANSWER를 기반으로 준비한 자료입니다. ASSET3 전체 ZIP과 SHORT1 전체 ZIP이 같은 것은 아니며, 단독으로 분리한 JSON 멤버의 바이트가 같다는 뜻입니다. 등록 intent는 ASSET3 전체를 업로드한 것으로 기록하지 않습니다.

| 대상 | 바이트 | SHA-256 |
|---|---|---|
| 원본 내부 `100701105.zip` | 997 | `a2e539fae949098a40403e9a76b82d3a609882cbe207a9d757aaf033dfe62cf5` |
| 원본 `100701105.json` | 1740 | `5a8ef45ccf72845d17e0b1f2a6e487547aeffc0c5e247bb66936b945d5867e37` |
| `QA-DIFI-20261110-05-ASSET3.zip` | 167305 | `fa80e0951f058d0dbbfa6037475c7c6ae5170d17dc718380f63be820b541a81d` |
| ASSET3와 SHORT1의 동일 JSON | 1803 | `030d280cc3753c84eb8c4de3613e2b031bb317cbc72c1f6a3e470dc1570d5aea` |
| `QA-DIFI-20261110-11-SHORT1.zip` | 1029 | `609d906c40d279409c8b004c36ea1734d5b36eff7a0418a3ad7028c89ac24f73` |

원본에서 ASSET3 입력으로 바뀐 leaf는 questionId, masterId, questionContent, questionGradingId, questionCorrectId의5개뿐입니다. 외부 ID는 다음과 같이 배정됐습니다.

| 필드 | 원본 | ASSET3 = SHORT1 |
|---|---|---|
| questionId | 31206 | 2116111141 |
| masterId(string) | `"100701105"` | `"2116111142"` |
| questionGradingId | 30638 | 2116111143 |
| questionCorrectId | 48643 | 2116111144 |

questionContent에는 기존 d-question 안의 단순 p/span으로 `[QA-DIFI-20261110-05-SHORT]`만 추가했습니다. ID와 표지 변경을 역으로 적용하면 원본 JSON1740바이트가 정확히 복원됩니다. 따라서 유형·문제·정답·그레이딩의 나머지 필드·UDL/자산 상태·questionAttribute·creatorId·날짜를 추가로 바꾸지 않았습니다. ASSET3에서 SHORT1을 분리할 때는 이 다섯 곳도 다시 바꾸지 않았습니다.

원본의 `YEAR_2025`, 생성 시각 `2025-11-26T14:05:00`, attribute 수정 시각 `2026-01-26T15:12:16`, 최상위 수정 시각 `2026-01-28T16:05:08.69791809`, 그레이딩 수정 시각 `2025-12-01T15:39:39`, 음수 연도의 lastModifiedDtmAtLinks를 모두 보존했습니다. 날짜 차이를 통일하거나 정답을 숫자 JSON 값으로 교정하지 않았습니다. `questionResources=[]`인 자산0개 입력이므로 이 사례를 이미지 자산 처리의 성공 근거로 사용하지 않습니다.

## 3. SHORT_ANSWER와 기존 ORDERED 입력 비교

ORDERED 비교군은 [기존 등록 intent](definition-ordered1-control-intent-20261110.json)의 문서695입니다. 입력은 원본530의 `750774.json`을 기반으로 한 MULTI3 멤버 `2116111032.json`과 바이트가 같은 단독 ZIP입니다. SHORT1과 등록 메타는 같지만 서로 다른 원본 문항입니다.

| legacy 입력 항목 | SHORT_ANSWER / 100701105 → 700 | SHORT_ANSWER_ORDERED / 750774 → 695 |
|---|---|---|
| questionType | `SHORT_ANSWER` | `SHORT_ANSWER_ORDERED` |
| gradeYn / correctYn | true / true | true / true |
| questionCorrects 개수 | 1 | 1 |
| gradingTypeCode | `[]` | `["IGNORE_SPACE"]` |
| inputTypeCode | `["MATH_FORMULA"]` | `[]` |
| equationEditorType | `"MATH_TYPE"` | `null` |
| correctValue | 문자열 `"11"` | 문자열 `"$4$"` |
| questionSimilarCorrects | `[]` | `[]` |
| correctContent의 정답 | `$11$` | `$4$` |
| d-input 개수 / key | 1 / `"1"` | 1 / `"1"` |
| d-input의 추가 속성 | height44, selectdata`---`, ismathedit true, matheditor MATH_TYPE | selectdata 빈 문자열, 위 수식 편집 속성 없음 |
| questionResources | `[]` | `[]` |
| 원본 attribute | MIDDLE_1/FIRST/chapter1/YEAR_2025 | MIDDLE_1/FIRST/chapter1/YEAR_2024 |

두 원본 모두 문제에서 수 여러 개를 다루지만 실제 응답칸과 정답 객체는 한 개입니다. ORDERED 문항은 세 조건의 합4를 입력받으며 입력칸 세 개를 가진 자료가 아닙니다. 따라서 실제 입력칸·정답 객체 개수만으로 다답형 매핑을 설명할 수 없습니다.

또한 questionType 이외에도 채점 코드·수식 입력 옵션·정답 문자열·HTML 속성·문제 내용·날짜 등이 다릅니다. 한 필드만 바꾼 대조 실험이 아니므로 이 비교로 타입 결정의 유일한 원인을 questionType이나 특정 수식 옵션 하나로 확정하지 않습니다.

## 4. 생성된 실제 타입과 정답 모델 비교

[2845](evidence/2845-definition700-s-master-item-readback.json)의700과 [2705](evidence/2705-definition695-approved-failed-item-fresh-read.json)의695를 대조했습니다.

| 생성 결과 | SHORT / 문서700 | ORDERED / 문서695 |
|---|---|---|
| itemId / detailId | 2089380 / 2089087 | 2089375 / 2089082 |
| 최종 문서 상태 | Y | Y |
| 최종 검수 선택 / Master 상태 | S / R | F / F |
| 상세의 형태 표시 | 주관식 > 단답형 > 일반형 | 주관식 > 다답형 > 일반형 |
| 수정 응답의 qtCurrent | `SBSANM` | `SBMANM` |
| outType / contentVersion | definition / v3 | definition / v3 |
| grading.mode | exact_match | exact_match |
| grading.answerValues | `["11"]` | `["$4$"]` |
| grading.value / answerText | `"11"` / `"11"` | `"4"` / `"4"` |
| 생성 content.choices | `[]` | `[]` |
| 생성 correctHtml | `$11$`를 포함 | `$4$`를 포함 |
| savedOmrData / savedAnswerData | null / null | null / null |

두 생성 모델 모두 exact_match이고 answerValues 배열 길이가1입니다. 따라서 생성 모델의 mode나 배열 길이가 다르기 때문에 두 타입이 달라졌다고 설명할 수는 없습니다. answerValues에서는 원래 correctValue의 수식 구분자 차이가 남고, 표시용 value/answerText에서는 숫자가 보입니다. 이것은 저장된 모델에서 확인한 표현 차이이며, 수식 동치·공백 무시·실제 채점 정규화 규칙을 검증한 결과는 아닙니다.

두 수정 응답은 스크립트를 실행하지 않은 inert DOM 파싱입니다. qtCategory/qtAnswer/qtType의 초기값은 각각 OB/OBSA/OBSACN으로 남아 있지만 이는 실제 타입의 근거가 아닙니다. 저장된 `qtCurrent`와 상세 형태 표시가 서로 일치하므로700은 SBSANM,695는 SBMANM으로 구분됐다고 기록할 수 있습니다. 초기 select가 OBSACN이라는 이유로 이 문항들을 객관식으로 분류하지 않았습니다.

700은 S 승인,695는 [F 단독 승인](definition695-f-only-approval-intent-20261110.json)을 거쳤습니다. 따라서 최종 상태와 AI/메타 후속 동작의 차이를 입력 유형만의 영향으로 돌릴 수 없습니다. 타입 결정이 파싱·검수·최종 승인 중 어느 단계에서 이루어졌는지와 S/F가 타입 결정에 영향을 주는지는 서버 코드나 단일 변수 대조가 없어 미확정입니다.

## 5. 관측할 수 있는 정책과 확인하지 못한 규칙

확인한 범위에서는 SHORT_ANSWER 입력 표본이 SBSANM/단답형으로, SHORT_ANSWER_ORDERED 입력 표본이 SBMANM/다답형으로 표현됐습니다. 입력 명칭의 차이와 출력 타입 차이가 대응한다는 관측은 가능합니다. 그러나 서버의 변환 테이블·분기 코드·전체 JSON 스키마를 확인하지 않았으므로 모든 SHORT_ANSWER와 ORDERED가 항상 같은 규칙으로 처리된다고 일반화하지 않습니다.

두 사례의 정답 모델과 본문이 보이고 문서Y에 도달했다는 사실은 저장 OMR·저장 정답 데이터·Master 승인·배포·학습자 제출 성공과 별개입니다. OMR과 answerData는 둘 다 null이며700의 Master는R입니다. 메타 공란의 원인, AI 요청·응답·완료 시점, 공백/수식 동치·다중 답·순서·부분 점수·유사 정답 정책은 실행하지 않았습니다. 이번 단답형 성공이 기존 다중 JSON ZIP 실패의 정확한 원인을 설명하거나 복합/세트 입력 전체 지원을 입증하지도 않습니다.

## 6. PNG와 보존 HTML의 범위

부모 연구자는 [2833 상단 PNG](evidence/2833-definition700-short-draft-top-visual.png)와 [2834 하단 PNG](evidence/2834-definition700-short-draft-bottom-visual.png)를 직접 확인했습니다. 이 정적 작업은 PNG 헤더와 스크롤 기록만 확인했습니다. 두 파일은1810×1075이며 내부 스크롤 구간은 다음과 같습니다.

| 근거 | 문서 상태 | 실제 top | clientHeight | scrollHeight | 덮는 구간 |
|---|---|---|---|---|---|
| 2833 | 승인 전700R | 0 | 1014 | 1220 | 0~1014 |
| 2834 | 승인 전700R | 205 | 1015 | 1220 | 205~1220 |

두 구간은 겹치며 전체 세로1220을 덮습니다. 이는 승인 전 초안R의 픽셀 범위입니다. 최종700Y·Master 상세/수정폼·승인 모달·다른 역할/화면폭의 픽셀 검토로 전이하지 않았습니다.

[700 초안 HTML](sources/definition700-short-draft-20261110.html)과 [700 최종 HTML](sources/definition700-short-s-approved-final-20261110.html)은 CRLF 줄바꿈으로 보존돼 있습니다. CRLF를 LF로만 정규화하면 각각 [2831](evidence/2831-definition700-short-draft-source.json), [2843](evidence/2843-definition700-approved-final-source.json)의 result.html 및 대응 schema의 크기·SHA와 완전히 일치합니다. 파일은 수정하지 않았습니다.

| 보존 소스 | 원시 바이트 / CRLF 수 | LF 정규화 바이트 | LF 정규화 SHA-256 |
|---|---|---|---|
| 초안 | 444624 / 868 | 443756 | `7a34a45fbac035718fc19d663d50649f00cb7175d06e86a79ed6ef0ce051a1b0` |
| 최종 | 435937 / 696 | 435241 | `35b3a7d37fa425afa52a7123438445f9393beeff3453b33e767353f604038fc1` |

로컬 ZIP 재개방·CRC·입력 멤버 바이트 일치·원본 JSON 복원·그레이딩/메타 보존·qtCurrent·정답 모델·근거 참조·UTF-8 검증을 완료했습니다. 새 보고서만 작성했으며 전체 사이트의 완료 분모나 완료율은 계산하지 않았습니다.
