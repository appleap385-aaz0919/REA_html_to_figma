# Definition 원본 입력 스키마 비교와 MULTI3 QA ZIP 검토

작성일은 2026-11-10입니다. 실제 원본 ZIP 3개에서 관측한 구조를 기록했습니다. 서버의 공식 입력 계약, 필수 필드, 허용 enum 전체나 검증 정책을 확정하는 문서는 아닙니다. 이 작업은 로컬 파일만 읽고 새 산출물을 만들었으며, 브라우저·네트워크·CMS API를 호출하거나 CMS에 업로드하지 않았습니다.

## 1. 원본과 근거

| Definition | 로컬 원본 ZIP | 유일한 JSON 멤버 | questionType | ZIP / JSON 바이트 |
|---|---|---|---|---|
| 430 | `fixtures/definition430-original-20261110.zip` | `108093600.json` | `ESSAY` | 922 / 1667 |
| 529 | `fixtures/definition529-original-20261110.zip` | `750772.json` | `FIVE_CHOICE` | 941 / 2064 |
| 530 | `fixtures/definition530-original-20261109.zip` | `750774.json` | `SHORT_ANSWER_ORDERED` | 942 / 1808 |

430과 529의 직접 다운로드 근거는 [2648](evidence/2648-definition430529-original-downloads-read.json)의 `action.data.result.documents`입니다. 각각 HTTP 200, `application/zip;charset=UTF-8`, ZIP magic `50 4b 03 04`를 기록했습니다. 530의 근거는 [1895](evidence/1895-definition530-proxy-file-read.json)의 `action.data.result`이며, 동일하게 status 200과 ZIP magic을 기록했습니다. 세 로컬 ZIP 모두 근거 파일의 `fileBase64`를 디코딩한 바이트와 완전히 일치하고, 근거의 SHA-256과도 일치합니다. 이는 과거에 수집한 근거를 로컬에서 대조한 결과이며 이번 작업에서 새 다운로드를 실행하지 않았습니다.

| Definition | 대상 | SHA-256 |
|---|---|---|
| 430 | ZIP | `187953660b497c9a96a9540ffd3b8bf8774a166ab5e42a7e49db5b8411473353` |
| 430 | JSON | `959d04bf115682a8238d75b9f8b46f47f1cbc7e79c2d6847add7bdb3c423ffc9` |
| 529 | ZIP | `789cb82386a718ae3ea3a6333045eac1ee67b5af3032340a77c943397c3049ec` |
| 529 | JSON | `eb532004007a740dbd69575d5f1b72de5afef6cfb170d699b52e6886bcbd588f` |
| 530 | ZIP | `11430149e0f5a8a297c0be75303461476099022fccc2b45ba68f8c38c5213b54` |
| 530 | JSON | `02f3c37d652cde7a0d67edf0751af6d264630002a1bc9fa536985bda5f8b5600` |

[definition-qa-import-intent.json](definition-qa-import-intent.json)은 530 원본을 유지한 채 별도 QA ZIP을 만들었던 과거 기록입니다. 기록에는 원본 근거 1895, 이전 QA 문서 661과 문항 2089175, 승인 후 문서와 문항 상태가 다를 수 있다는 관측이 있습니다. 이번 MULTI3 ZIP에는 그 이전 QA JSON을 재사용하지 않았습니다. 이전 단건 QA 기록으로 다중 JSON 지원이나 등록 메타의 우선순위를 추정하지 않습니다.

상위 조사자가 전달한 제외 조건도 적용했습니다. 근거 2644의 Master2088663은 원본 파일이 없는 seed fixture이므로 ZIP 세트 형식의 근거가 아닙니다. 근거 2645의 문서 171/172는 ZIP 표시와 달리 HML 주소를 사용하는 목 데이터이므로 정상 ZIP 형식의 근거에서 제외했습니다. 2644/2645 및 기존 조사 보고서는 이번 하위 작업에서 열람하지 않았습니다.

## 2. 공통 JSON 구조

세 ZIP은 각각 JSON 객체 한 개를 담은 JSON 파일 한 개로 구성됩니다. 최상위 키는 모두 다음 16개이며 순서와 구조도 같습니다. 배열 전체나 세트 객체를 최상위 값으로 사용하는 실제 원본은 관측하지 못했습니다.

| 최상위 필드 | 관측 JSON 타입 | 관측 내용과 경계 |
|---|---|---|
| `questionId` | integer | 원본 값은 21563 / 16856 / 16861입니다. 외부 식별자로 취급해 QA 값만 교체했습니다. |
| `masterId` | string | 원본 값은 `"108093600"` / `"750772"` / `"750774"`입니다. 숫자처럼 보여도 문자열입니다. |
| `questionType` | string | `ESSAY`, `FIVE_CHOICE`, `SHORT_ANSWER_ORDERED`만 실제로 관측했습니다. |
| `questionAttribute` | object | 아래 10개 문자열 필드를 공통으로 포함합니다. |
| `questionContent` | string | HTML과 Definition 사용자 정의 요소, 수식 문자열을 담습니다. |
| `correctContent` | string | 정답 표시용 HTML입니다. 그레이딩의 정답 값과 저장 형식이 다릅니다. |
| `explanationContent` | string | 풀이용 HTML입니다. |
| `scriptContent` | string | 세 원본 모두 빈 문자열입니다. 비어 있지 않은 경우의 정책은 미관측입니다. |
| `hintContent` | string | 세 원본 모두 빈 문자열입니다. |
| `wrongAnswerAvoidContent` | string | 세 원본 모두 빈 문자열입니다. |
| `creatorId` | integer | 430은 2, 529/530은 1이며 QA에서도 보존했습니다. |
| `createdDtm` | string | 시간대 표시가 없는 원본 날짜·시간 문자열을 담습니다. |
| `lastModifiedDtm` | string | 시간대 표시가 없는 원본 날짜·시간 문자열을 담습니다. |
| `questionResources` | array | 세 원본 모두 `[]`입니다. 항목 객체의 스키마는 미관측입니다. |
| `questionGrading` | object | 채점 플래그와 정답 객체 배열을 담습니다. 상세는 아래에 기록했습니다. |
| `lastModifiedDtmAtLinks` | string | 모두 `"-999999999-01-01T00:00:00"`입니다. 날짜 파서에 맞추려고 교정하지 않았습니다. |

문항 본문의 `d-question`은 본문 전체를 감싸는 유일한 루트 요소가 아닙니다. 기존 선택지·입력 요소 등은 `</d-question>` 뒤에도 존재합니다. 따라서 QA 표지를 추가하기 위해 HTML 전체를 파싱하거나 다시 직렬화하지 않고, 기존 `<d-question>` 바로 뒤에 단순한 `<p><span>표지</span></p>`만 삽입했습니다. 원본의 HTML 태그, 속성, 공백, 수식, 입력 `key`, `circleid`는 보존했습니다.

### questionAttribute

| 필드 | 430 | 529 / 530 | 관측 타입 |
|---|---|---|---|
| `questionStatus` | `WRITING` | `WRITING` | string |
| `subjectType` | `MAT` | `MAT` | string |
| `educationType` | `M` | `M` | string |
| `gradeType` | `MIDDLE_1` | `MIDDLE_1` | string |
| `semesterType` | `FIRST` | `FIRST` | string |
| `chapterType` | `"1"` | `"1"` | string |
| `submissionYearType` | `YEAR_2025` | `YEAR_2024` | string |
| `lastExportedDtm` | `2025-08-26T10:54:19` | `2025-05-29T09:54:07` | string |
| `createdDtm` | `2025-03-28T09:54:55` | `2025-03-14T09:22:09` | string |
| `lastModifiedDtm` | `2025-08-26T10:54:19` | `2025-05-29T09:54:07` | string |

최상위 `createdDtm`과 `lastModifiedDtm`은 해당 원본의 attribute 날짜와 같은 값을 담습니다. 그레이딩과 정답 객체 내부의 수정 시각은 이와 다를 수 있습니다. 이 중복이나 차이를 오류로 판단하거나 하나로 통일하지 않았습니다.

### questionGrading와 questionCorrects

| 경로 또는 필드 | 430 ESSAY | 529 FIVE_CHOICE | 530 SHORT_ANSWER_ORDERED |
|---|---|---|---|
| `questionGradingId` | integer 21557 | integer 16848 | integer 16853 |
| `gradeYn` | boolean `false` | boolean `true` | boolean `true` |
| `correctYn` | boolean `true` | boolean `true` | boolean `true` |
| `questionCorrects` | 객체 1개 배열 | 객체 1개 배열 | 객체 1개 배열 |
| `questionCorrects[0].questionCorrectId` | integer 30287 | integer 21810 | integer 21818 |
| `gradingTypeCode` | `["IGNORE_SPACE"]` | `["IGNORE_SPACE"]` | `["IGNORE_SPACE"]` |
| `inputTypeCode` | `["MATH_FORMULA"]` | `[]` | `[]` |
| `equationEditorType` | string `"MATH_TYPE"` | `null` | `null` |
| `correctValue` | 빈 문자열 `""` | 문자열 `"4"` | 문자열 `"$4$"` |
| `questionSimilarCorrects` | `[]` | `[]` | `[]` |
| grading와 correct의 `createdDtm` | `2025-03-28T09:54:55` | `2025-03-14T09:22:09` | `2025-03-14T09:22:09` |
| grading와 correct의 `lastModifiedDtm` | `2025-08-26T10:54:13` | `2025-03-14T09:22:09` | `2025-03-14T09:22:09` |

`questionGrading`은 `questionGradingId`, `gradeYn`, `correctYn`, `questionCorrects`, `createdDtm`, `lastModifiedDtm`의 6개 키를 가집니다. 각 correct 객체는 `questionCorrectId`, `gradingTypeCode`, `inputTypeCode`, `equationEditorType`, `correctValue`, `questionSimilarCorrects`, `createdDtm`, `lastModifiedDtm`의 8개 키를 가집니다. 코드 배열의 관측 항목은 문자열이며, 비어 있는 유사 정답 배열의 항목 구조는 알 수 없습니다.

플래그 이름과 코드만으로 자동 채점 동작, 정답 공개 여부, 수식 정규화, 부분 점수, 동치 인정이나 UI 상태 전이를 확정하지 않습니다. 위 표는 저장된 실제 값의 비교입니다. 특히 ESSAY의 빈 `correctValue`를 오류로 보고 채우거나, `false`를 `true`로 고치지 않았습니다.

## 3. 문제·정답·그레이딩의 유형별 차이

| 유형 | 문제와 응답 HTML | 정답 표시 | 풀이와 그레이딩의 관계 |
|---|---|---|---|
| ESSAY / 430 | 가장 큰 소수가 31인 조건에서 가능한 자연수의 개수를 묻습니다. `d-question` 뒤에 `d-textarea key="1" height="200" circleid="wisw0n0" ismathedit="true"`가 있습니다. | `correctContent`는 `풀이 참조`를 표시합니다. | 풀이에서는 32~37의 6개를 설명하지만, `correctValue`는 빈 문자열이고 `gradeYn=false`입니다. 숫자 6을 QA 정답에 새로 넣지 않았습니다. |
| FIVE_CHOICE / 529 | 소수·합성수의 잘못된 짝을 묻고 `d-choicewrapper` 안의 5개 `li.d-choice`와 `d-choicecount`를 사용합니다. 키는 1~5이며 첫 선택지의 `value` 속성은 원래 없습니다. | HTML에는 ④가 있고 그레이딩에는 `"4"`가 있습니다. | 27이 합성수라는 풀이입니다. 기존 선택지의 속성 차이를 교정하거나 선택지를 다시 만들지 않았습니다. |
| SHORT_ANSWER_ORDERED / 530 | 세 조건을 `d-box`에 표시하고 `d-input key="1" circleid="k1kteof" selectdata=""` 한 개로 합을 입력받는 구조입니다. | HTML과 `correctValue`에는 수식 구분자를 포함한 `$4$`가 있습니다. | 풀이에는 2+1+1=4가 있습니다. `ORDERED`라는 이름만으로 다중 입력의 순서 처리 정책을 확정할 수 없으며 실제 표본은 입력 한 개입니다. |

표시용 `correctContent`와 채점용 `correctValue`를 서로 변환하거나 일치시키지 않았습니다. ESSAY의 `inputTypeCode=["MATH_FORMULA"]`와 다른 두 유형의 빈 배열, `equationEditorType`의 문자열/`null` 차이도 그대로 유지했습니다.

## 4. 세트·자산·등록 메타의 미관측 경계

세 원본의 정확한 자산 필드명은 `questionResources`이고 값은 모두 `[]`입니다. 별도 `resources` 키는 없습니다. 비어 있는 배열만으로 이미지·파일·URL·리소스 ID·참조 관계나 ZIP 자산 경로의 스키마를 만들 수 없습니다. 원본 ZIP에 JSON 이외의 자산 멤버도 없으므로 이번 QA ZIP에 새 자산을 넣지 않았습니다.

세 원본의 최상위와 하위 객체에 세트용 입력 필드는 없습니다. 지문 부모, 자식 문항 배열, 세트 ID, 순서, 그룹, 공통 지문이나 연결 관계의 입력 스키마는 미관측입니다. 문서의 여러 JSON 멤버가 세트로 묶인다는 근거도 없습니다. 세트와 자산 스키마는 이 보고서나 QA JSON에서 추측해 정의하지 않았습니다.

상위 조사자가 검토 중인 등록 메타는 실제 존재하는 `Source13 / Y / 22-M-MA-T0-1-1-SMT-TP-2022`, 단원 `22MMAT0KOK1001020000`, 페이지 1~3, 공통(C)입니다. 이 하위 작업에서는 해당 화면이나 데이터를 재조회하지 않았습니다. 이 등록 메타와 원본 `questionAttribute`의 출처·학년·연도·단원 등이 어떻게 대응하는지, 어느 값이 우선하는지, CMS가 덮어쓰는지, 일치 여부를 검증하는지는 모두 미검증입니다. 따라서 원본 attribute를 등록 메타에 맞춰 수정하지 않았습니다. Source의 `Y` 상태를 문서 승인이나 문항 상태와 동일한 코드 체계로 해석하지 않습니다.

## 5. MULTI3 QA ZIP 명세

새 ZIP은 [fixtures/QA-DIFI-20261110-04-MULTI3.zip](fixtures/QA-DIFI-20261110-04-MULTI3.zip)이며 세 실제 JSON만 담습니다. 등록 전 상위 조사자의 명시적 검토 결정에 따라 새 ZIP의 멤버명을 각 QA `masterId` 문자열에 `.json`을 붙인 이름으로 맞췄습니다. 각 멤버는 기존 유형을 보존하며, 원본 JSON을 재직렬화하지 않고 외부 ID 토큰 4개와 문제 HTML의 표지 삽입만 바꿨습니다. 멤버명 변경 전후의 JSON 바이트는 같습니다. 원본과 이전 성공 QA 파일은 수정하지 않았습니다.

| 유형 | 멤버명 | questionId | masterId (string) | questionGradingId | questionCorrectId | 표지 |
|---|---|---|---|---|---|---|
| `ESSAY` | `2116111012.json` | 2116111011 | `"2116111012"` | 2116111013 | 2116111014 | `[QA-DIFI-20261110-04-ESSAY]` |
| `FIVE_CHOICE` | `2116111022.json` | 2116111021 | `"2116111022"` | 2116111023 | 2116111024 | `[QA-DIFI-20261110-04-FIVE]` |
| `SHORT_ANSWER_ORDERED` | `2116111032.json` | 2116111031 | `"2116111032"` | 2116111033 | 2116111034 | `[QA-DIFI-20261110-04-ORDERED]` |

12개 QA ID의 숫자 값은 서로 다르고, 모두 2116111011~2116111040 및 양의 Int32 범위 안에 있습니다. `masterId`는 원본처럼 문자열이고 나머지 세 ID는 정수입니다. 원본에는 각 외부 ID 필드가 한 곳씩 존재하며 추가 참조는 관측되지 않았습니다. `creatorId`, HTML 입력 키와 `circleid`는 외부 문항·정답 ID로 취급하지 않고 보존했습니다. 원본 멤버명 `108093600.json`, `750772.json`, `750774.json`은 새 QA ZIP에서 각각 `2116111012.json`, `2116111022.json`, `2116111032.json`으로 바꿨습니다. 서버가 파일명과 `masterId`의 일치를 필수로 요구한다는 뜻은 아니며, 불일치 변형은 이번 자료에서 제외한 별도 미검증 조건입니다.

상위 조사자의 추가 요청에 따라 이전 성공 QA 파일 [QA-DIFI-20261109-01.zip](fixtures/QA-DIFI-20261109-01.zip)의 멤버명과 외부 ID 관계를 대조했습니다. 해당 ZIP의 SHA-256은 `728377a7cb716dac95dd378d904cc8f494a788d1ce84d60db1b75958df27e3cf`이며 intent 기록과 일치합니다. 이전 멤버는 `2116110901.json`, `masterId`는 문자열 `"2116110901"`, `questionId`는 정수 2116110901이므로 파일명 stem과 두 ID의 숫자 값이 모두 같습니다. 이번 MULTI3도 파일명 stem과 masterId를 맞췄지만 questionId와 masterId에는 서로 다른 QA 값을 유지했습니다. 실제 원본 세 개도 파일명 stem과 masterId는 같지만 questionId는 다릅니다. 성공 표본만으로 파일명 일치의 필요조건이나 questionId까지 같은 값이어야 한다는 조건을 확정하지 않습니다.

각 JSON에서 변경한 leaf 경로는 정확히 다음 5개입니다.

- `$.questionId`
- `$.masterId`
- `$.questionContent`
- `$.questionGrading.questionGradingId`
- `$.questionGrading.questionCorrects[0].questionCorrectId`

각 `questionContent`의 기존 `<d-question>` 바로 뒤에 `<p><span>[해당 표지]</span></p>`를 삽입했습니다. 다른 기존 문항·정답·풀이·그레이딩·날짜·리소스·HTML은 모두 보존했습니다. ZIP 멤버는 JSON 3개뿐이며 스크립트, 실행 파일, 디렉터리 멤버, 새 자산은 없습니다. 원본의 빈 `scriptContent` 필드도 그대로 유지했습니다.

기대 결과는 JSON당 단건 문항 1개씩, 합계 3개입니다. 이는 아직 실행하지 않은 QA 기대치이며 CMS가 실제로 3개를 등록했다는 관측이 아닙니다. 다중 JSON 처리 지원, 처리 순서, 문항 상태, 중복 처리, 외부 ID와 CMS ID의 매핑, 멤버명 규칙은 서버에서 검증하지 않았습니다. 이번 ZIP으로 세트 파싱을 검증할 수 있다고 주장하지 않습니다.

## 6. 로컬 검증 결과

Python `zipfile`로 출력 ZIP을 다시 열어 멤버 목록이 지정한 JSON 3개와 정확히 같고 CRC 오류가 없음을 확인했습니다. 세 멤버를 다시 읽어 JSON으로 파싱한 뒤 아래 항목을 검증했습니다.

- 유형마다 표지가 정확히 1회 있고 기존 `d-question` 안의 단순 `p/span`에 들어 있습니다.
- QA ID 12개가 서로 다른 양의 Int32 값이고, 각 ID의 JSON 타입을 보존했습니다.
- 원본과의 재귀 비교에서 변경 leaf 경로가 지정한 5개뿐입니다. 배열 길이와 객체 키 순서도 보존했습니다.
- 표지와 ID 교체를 역으로 적용하면 원본 JSON 바이트가 완전히 복원됩니다. 따라서 기존 HTML의 공백과 escaping을 포함해 나머지 내용을 보존했습니다.
- 정답·풀이·그레이딩의 나머지 값, 빈 자산 배열과 모든 날짜를 보존했습니다.
- 세 원본 ZIP의 SHA-256은 작업 후에도 변하지 않았습니다.

출력 ZIP 바이트 수는 2860이고 SHA-256은 `e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171`입니다. 출력 멤버별 SHA-256, 원본/QA ID, 변경 경로와 검증 결과는 [definition-multi3-fixture-manifest-20261110.json](definition-multi3-fixture-manifest-20261110.json)에 기록했습니다. 새 ZIP을 다시 열어 세 멤버명이 각각 QA masterId와 일치하고, 멤버명 변경 전후의 JSON SHA-256이 같음을 확인했습니다.

문서 생성 과정에서 PowerShell의 기본 파이프 인코딩으로 한국어가 손상되는 문제를 발견했습니다. 보고서와 manifest의 한국어 문구를 UTF-8로 다시 저장하고 한글 코드포인트와 대체 문자 부재를 확인했습니다. 원본 JSON은 처음부터 파일에서 UTF-8로 직접 읽었고 내용 변경은 ASCII ID와 표지뿐이었으므로 JSON 바이트에는 문서 인코딩 문제의 영향이 없습니다. 이후 명시적으로 승인된 ZIP 멤버명 변경만 별도로 반영했습니다.

이번 검증은 로컬 구조와 변경 범위를 증명합니다. CMS 등록·서버 파싱·화면 렌더링·그레이딩 실행·메타 반영은 수행하지 않았으므로 그 성공 여부는 미검증입니다.
