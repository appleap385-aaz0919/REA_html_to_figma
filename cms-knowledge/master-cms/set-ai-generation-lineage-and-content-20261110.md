# 세트 AI 생성의 계보·문항 변형·공유 지문 입력 단서

작성일은 2026-11-10이며 생성 결과의 반영 범위는 근거2847~2902입니다. HML 원문 대조는 후속 바이너리 기준의 근거2924/2926으로 보완했습니다. 자체 승인 세트에 대한 AI 생성 요청1회가 완료돼 새 지문2089381과 자식2089382~2089385가 생겼습니다. 새4문항은 모두R이며 원본 각 자식과 부모 관계가 대응합니다. 행렬의 수치는 바뀌고 크기는 유지됐습니다. 새 공유 HTML에 별도 HML 편집본의 QA 표식이 들어간 점과, 저장 허용 정답에 일반 문자열 `TIMES`가 들어간 점은 확인됐습니다. 실제 AI 입력 경로와 서비스 채점 결과는 확인하지 못했습니다.

이 작업은 로컬 근거를 읽고 이 보고서만 새로 작성했습니다. 브라우저·네트워크·CMS·전역 원장/인덱스·기존 맵·기존 문서는 수정하지 않았습니다. PNG 직접 시각 검토는 부모 연구자의 기록을 인용하고, 이 하위 작업에서는 저장된 모델·정답·참조·행렬·스크롤 구간·파일 형식과 링크를 검증했습니다.

## 1. 요청과 비동기 완료의 연결

[AI 생성 intent](own-set-ai-generation-intent-20261110.json)와 [phase57](session-20261110-phase57.json)은 원본 지문2089241/anchor2089242의 정상 생성창에서 세트 전체 생성을 선택한 과정을 기록합니다. [2853](evidence/2853-own-set-ai-modal-exact-preflight.json)은 실제 세트 여부·선택값·활성 버튼의 사전 확인 근거이며, [2854](evidence/2854-own-set-ai-generation-submit-once.json)은 `attemptCount=1`과 POST `/item/all/twin-generate.donga`, itemId2089242/sourceTypeAI를 기록합니다.

요청 후 [2855](evidence/2855-own-set-ai-generation-post-observation.json)는 접수 안내와 `working="true"`, UI 표시 요청 시각13:46을 보여 줍니다. [2878](evidence/2878-own-set-ai-history-fresh-poll.json)에서 새4문항의 AI 이력과 UI 표시 생성 시각13:50을 발견했고, [2879](evidence/2879-own-set-ai-new-four-results-read.json)에서 실제 상세·수정 응답을 읽었습니다. [2885](evidence/2885-own-set-ai-original-finished-ui-observation.json)의 신선한 원본 화면에서는 `working="false"`와 일반 생성 버튼으로 돌아왔습니다. 표시 시각과 실제 내부 처리 시간·최초 발견 시각은 같은 개념으로 취급하지 않습니다.

[phase58](session-20261110-phase58.json)의 별도 업무77은 다른 단건COPY2089239의 R→승인미사용N 저장입니다. AI 요청은 업무76이며 자동 완료·새 ID 발견·이 보고서는 추가 업무로 세지 않았습니다. [phase59](session-20261110-phase59.json) 기준 누계는77회이고 이번 결과 확인 단계의 추가 업무는0회입니다. Service 배포는 실행하지 않았습니다.

## 2. 원본·COPY·AI 세트의 계보

| 구분 | 논리 지문ID | 자식 itemId | 현재 detailId | 상태 |
|---|---|---|---|---|
| 원본 | 2089241 | 2089242 / 2089243 / 2089244 / 2089245 | 2089052 / 2089053 / 2089054 / 2089051 | 모두Y |
| 기존 COPY | 2089357 | 2089358 / 2089359 / 2089360 / 2089361 | 2089078 / 2089079 / 2089080 / 2089081 | 모두R |
| 신규 AI | 2089381 | 2089382 / 2089383 / 2089384 / 2089385 | 2089088 / 2089089 / 2089090 / 2089091 | 모두R |

신규 상세의 생성 방식에는 AI생성과 다음 부모 문항ID가 직접 표시됩니다.

| 신규 AI 문항 | 대응하는 원본 부모 |
|---|---|
| 2089382 / 2089088 | 2089242 |
| 2089383 / 2089089 | 2089243 |
| 2089384 / 2089090 | 2089244 |
| 2089385 / 2089091 | 2089245 |

[2882](evidence/2882-own-set-ai-twelve-memberships-after-read.json)에서는12개 문항 각각의 현재 그룹을 읽었습니다. 모두 현재 세트를 포함한3세트·세트당4행·합계12행이며 동일한12개 문항으로 구성됩니다. 선택한 세트가 앞에 나타나는 표시 순서 차이는 그룹 구성의 차이로 세지 않았습니다.

원본 자식 네 개에는 각각 COPY와 AI의 생성 이력2개가 있습니다. COPY 네 개와 신규 AI 네 개의 생성 이력은 각각0개입니다. 생성 이력0개는 쌍둥이 관계가 없다는 뜻이 아닙니다. 네 원본 화면에 같은 세트 생성 이력이 표시된 것을 네 번의 별도 AI 요청으로 계산하지도 않았습니다. 실제 그룹의 물리 DB 식별자나 내부 관계 테이블은 조회하지 않았습니다.

신규 상세에는 주관식>단답형>일반형, SBSANM, 난이도 최하, 기존과 같은 행렬 단원·성취기준 등의 값이 보입니다. 원본 파일과 출처는 `-`, 평가지 등록은0개입니다. 이 표시만으로 모든 AI 생성의 출처 연결·메타 상속 정책을 일반화하지 않습니다.

## 3. 실제 수치·행렬 크기·표시 정답 비교

원본 내용은 [2880](evidence/2880-own-set-ai-original-control-after-read.json), 신규 내용은2879의 수정 응답 `questionEditorData`에서 비교했습니다. 표에서 세미콜론은 행 구분입니다.

| 원본 → AI | 원본 행렬 | 신규 행렬 | 유지된 크기 | 신규 correctHtml의 수식 |
|---|---|---|---|---|
| 2089242 → 2089382 | `[2; 3]` | `[4; 5]` | 2행1열 | `$2 \times 1$행렬` |
| 2089243 → 2089383 | `[-2, 4, 3]` | `[-5, 6, 5]` | 1행3열 | `$1 \times 3$행렬` |
| 2089244 → 2089384 | `[1,0; 0,1]` | `[2,0; 0,2]` | 2행2열 | `$2 \times 2$행렬` |
| 2089245 → 2089385 | `[3,-2,0; 1,5,-3]` | `[5,-4,2; 2,5,-3]` | 2행3열 | `$2 \times 3$행렬` |

저장된 수식 문자열에서 정수 행렬을 추출해 행·열 개수를 계산했고, 신규 네 행렬의 크기가 correctHtml의 곱셈 수식과 일치함을 확인했습니다. 마지막 문항은 신규 promptText에 `의 꼴을 말하시오.`라는 문장도 추가됐습니다. 다른 세 문항은 행렬 자체를 제시합니다.

이는 입력 원소를 바꾼 네 결과와 크기 답의 정합성을 확인한 범위입니다. 모든 수학적 변형의 품질, 문항 난이도 보정이나 서비스의 실제 정오답 판정을 검증한 것은 아닙니다.

## 4. 공유 HTML과 별도 HML을 구분한 입력 단서

### 현재 원본 공유 HTML

[2847](evidence/2847-own-set-ai-original-current-source.json)의 실제 `.qv-passage` 안에는 다음 HTML 모델과 렌더된 문장이 있습니다.

`[QA-SHARED-HTML-20261110]다음 행렬의 꼴을 말하시오.`

해당 passageHtml은 원래 공백과 HTML 표식을 보존하며 passageKey는 `passage:2089241`입니다. 이 공유 HTML에는 QA-SHARED-HML 표식이 없습니다. [실행 전 보존 HTML](sources/own-set2089242-before-ai-20261110.html)도2847과 대조했습니다.

### phase39의 별도 HML 편집본

[2313 GetTextFile](evidence/2313-own-hml-passage-before-text-and-caret.json)은 편집 전 실제 HML에서 표식 없는 `다음 행렬의 꼴을 말하시오.`를 읽었습니다. HML 편집·저장 후 [2325 GetTextFile](evidence/2325-own-shared-hml-saved-reconcile-text.json)은 다음 문자열을 기록했습니다.

```text
[QA-SHARED-HML-20261110]
다음 행렬의 꼴을 말하시오.
```

실제 반환값에는 표식 뒤 공백과 CRLF가 있습니다. 위 표시는 읽기 편하게 줄 구분만 나타낸 것입니다. [phase39 저장 비교](shared-hml-save-comparison-20261110.json)는 CMS 전체반영2333 후 공유 HML 경로가 `/passage/208/2089241/1966/hml/2089241_P.hml`로 바뀌었지만 공유 HTML 모델·질문 모델·저장 OMR은 그대로였음을 기록합니다. 따라서 HTML 표식과 HML 표식은 같은 필드의 이전·이후 값으로 합쳐 취급할 수 없습니다.

[보존된 HML 파일](fixtures/shared-passage-hml-persisted-20261110/2089241_P.hml)은24490바이트이며 SHA-256은 `5b887826732a8b792320e594268d7f2530354c55a1baca5f8670818b259f6cad`입니다. XML의 CHAR 텍스트에서도 HML 표식과 위 본문을 확인했습니다. 이는 phase39 보존 파일을 읽은 결과이며 이번 작업에서 현재 원격 HML을 재다운로드한 것은 아닙니다.

후속 [직접 바이너리 기준](copied-set-hml-binary-baseline-20261110.json)의 [원본 공유 HML](fixtures/copied-set-hml-isolation-20261110/before-original-shared.hml)도 같은 원본P URL,24490바이트, 같은 SHA를 기록합니다. 로컬 XML을 직접 읽으면 CHAR 노드는 끝 공백을 포함한 `[QA-SHARED-HML-20261110] `와 단수 문장 `다음 행렬의 꼴을 말하시오.`입니다. 기준 파일이 CHAR 텍스트를 공백으로 이어 표시한 값은 `[QA-SHARED-HML-20261110]  다음 행렬의 꼴을 말하시오.`이며 표식 뒤 공백이2칸입니다. GetTextFile의 공백·CRLF 표현과 이 XML 텍스트 표시를 구분해야 하며, 둘 다 원래 과제 문장은 단수라는 점은 같습니다. 이 보완도 저장된 로컬 바이너리의 대조이며 파일이나 CMS는 수정하지 않았습니다.

### 새 AI의 공유 HTML

2879의 신규4개 `passageEditorData`는 모두 같은 값을 담습니다.

`[QA-SHARED-HML-20261110] 다음 행렬들의 꼴을 각각 말하시오.`

공유 HTML은 p/span으로 저장됐고 passageKey는 새 논리 지문 `passage:2089381`입니다. 즉 새 HTML에서 원본 HTML 표식 대신 HML 편집본 표식이 관측됩니다. 실제 원본 HML의 단수 `행렬의 꼴을 말하시오`가 신규 AI의 복수·재표현 `행렬들의 꼴을 각각 말하시오`로 바뀌었습니다. 표식 계열은 같지만 전체 문장을 그대로 승계하거나 원본 HML 본문을 완전히 복제한 결과는 아닙니다. 이 차이의 생성 주체와 재표현 단계도 확인하지 못했습니다.

| 구분 | 확인 가능한 결론 |
|---|---|
| 관측 | 현재 원본 공유 HTML은 HTML 표식이고, 별도 HML 편집본과 신규 AI 공유 HTML은 HML 표식을 가집니다. 신규 네 공유 모델도 서로 같습니다. |
| 추론 | 이번 요청의 결과에는 HML 편집본 계열의 내용이 반영됐습니다. HML 원문·추출 텍스트·그 내용을 반영한 중간 표현 중 하나가 생성 과정에 관여했을 가능성을 뒷받침합니다. |
| 미확정 | 실제 AI 요청 payload, 읽은 파일/버전, 텍스트 추출·OCR·캐시·중간 HTML, HTML/HML 결합 여부와 선택 우선순위, 서버 코드·모델별 정책은 확인하지 못했습니다. |

이 결과를 모든 AI 백엔드가 항상 HML을 사용한다거나, HML을 HTML보다 우선한다는 일반 규칙으로 확대하지 않습니다. 신규 파일명이 J라는 사실만으로 입력 파일 종류나 선택 코드를 역으로 확정하지도 않습니다.

## 5. 신규 HML·이미지 참조와 연결 범위

네 신규 수정 응답의 지문 HML은 모두 다음 경로를 참조합니다.

`/passage/208/2089381/2004/hml/2089381_J.hml`

각 문항의 Q/A 경로는 자체 itemId와 detailId를 사용합니다.

| 신규 itemId / detailId | Q HML 경로 | A HML 경로 |
|---|---|---|
| 2089382 / 2089088 | `/item/208/2089382/2089088/hml/2089382_Q.hml` | `/item/208/2089382/2089088/hml/2089382_A.hml` |
| 2089383 / 2089089 | `/item/208/2089383/2089089/hml/2089383_Q.hml` | `/item/208/2089383/2089089/hml/2089383_A.hml` |
| 2089384 / 2089090 | `/item/208/2089384/2089090/hml/2089384_Q.hml` | `/item/208/2089384/2089090/hml/2089384_A.hml` |
| 2089385 / 2089091 | `/item/208/2089385/2089091/hml/2089385_Q.hml` | `/item/208/2089385/2089091/hml/2089385_A.hml` |

translation 슬롯 경로는 비어 있습니다. [2888](evidence/2888-own-set-ai-result2089382-dom-image-state.json)은 지문 이미지1개와 네 문항의 Q/A 이미지8개가 모두 로드됐고 naturalWidth/naturalHeight가 양수임을 기록합니다. 이는 현재 참조와 이미지 로딩의 확인입니다. HML/PNG의 물리 복제 방식, 원격 파일 바이트의 전후 불변이나 모든 파일명 규칙을 이 자료만으로 확정하지 않습니다.

## 6. OMR 컴포넌트와 허용 정답 타입의 실제 차이

신규 네 문항의 저장 OMR은 모두 `[{"type":"TEXT"}]`입니다. 원본 네 문항도 같은 TEXT 컴포넌트를 사용합니다. 실제 차이는 컴포넌트의 신규 TEXT 생성 여부가 아니라, 허용 정답의 `value_type`과 값입니다.

| 크기 | 원본 allowed_answer의 value / value_type | 신규 AI value / value_type |
|---|---|---|
| 2×1 | `2\times1\text{행렬}` / math | `2 TIMES 1행렬` / text |
| 1×3 | `1\times3\text{행렬}` / math | `1 TIMES 3행렬` / text |
| 2×2 | `2\times2\text{행렬}` / math | `2 TIMES 2행렬` / text |
| 2×3 | `2\times3\text{행렬}` / math | `2 TIMES 3행렬` / text |

신규 savedAnswerData는 바깥 rule_type ORDERED, 내부 node의 rule_type VALUE이며, 각 allowed_answer는 case_sensitive=false·space_sensitive=false입니다. 첫 문항의 실제 저장값은 다음과 같습니다.

```json
{
  "savedOmrData": [{"type": "TEXT"}],
  "savedAnswerData": {
    "rule_type": "ORDERED",
    "nodes": [{
      "rule_type": "VALUE",
      "allowed_answer": [{
        "value": "2 TIMES 1행렬",
        "value_type": "text",
        "case_sensitive": false,
        "space_sensitive": false
      }]
    }]
  }
}
```

신규 questionEditorData의 answerText와 grading.value도 같은 TIMES 문자열이며 grading.mode는 exact_match입니다. 동시에 correctHtml은 `$2 \times 1$행렬` 등 곱셈 수식을 담습니다. 저장 표현 두 가지가 다르게 존재한다는 것은 확정할 수 있지만, 서비스가 곱셈 기호·LaTeX·TIMES를 어떻게 정규화해 비교하는지는 확인하지 않았습니다. 실제 학습자 제출이나 서비스 채점을 실행하지 않았으므로 채점 불일치·오답 처리 버그를 확정하지 않습니다.

### 실제 OMR 탭에서의 확인

처음 [2894](evidence/2894-own-set-ai-result2089382-visible-omr-controls.json)의 helper는 보이는 OMR 폼1개를 기대했지만, 당시 활성 탭은 메타정보였고 OMR 영역은 비활성이었습니다. [2896](evidence/2896-own-set-ai-edit-tabs-and-omr-ancestors.json)의 탭·조상 표시 상태가 이를 설명합니다. 이 helper의 범위 오류를 CMS 장애나 권한 오류로 세지 않았습니다.

정상 OMR 탭 선택2897 후 [2898](evidence/2898-own-set-ai-result-visible-omr-controls.json)에서 SBSANM의 실제 text input 값 `2 TIMES 1행렬`과 대소문자·공백 구분 미선택을 확인했습니다. [2899](evidence/2899-own-set-ai-result-visible-omr-serialization.json)의 serializer 결과는 저장된 TEXT/ORDERED/VALUE/text와 정확히 같습니다.

부모가 직접 확인한 [2900 PNG](evidence/2900-own-set-ai-result-omr-tab-top-visual.png)에는 왼쪽의 표시 정답2×1행렬과 오른쪽 OMR 정답 입력의 TIMES 문자열이 함께 보입니다. 2901은 같은 top0·전체1015의 중복 캡처이며 PNG 바이트 해시도2900과 같습니다. 별도 상태2개로 세지 않았습니다. 이 과정에서 정답 입력값 수정·임시저장·전체반영·서비스 배포는 실행하지 않았습니다.

[2902](evidence/2902-own-set-ai-results-no-draft-readback.json)의 신규 네 문항 응답은 모두 HTTP200, hasDraft=false, savedAt/savedUserId=null입니다. 이는 현재 draft 검사 결과이며 물리 DB에 임시 행이 전혀 없다는 증명은 아닙니다.

## 7. 원본·COPY·단건 대조에서 보존된 범위

[대조 비교 파일](own-set-ai-control-preservation-comparison-20261110.json)과 원본2848→2880, COPY2849→2881을 직접 대조했습니다. 각5개 응답에는 비교 단건2089246이 중복 포함되므로 합계10건의 비교, 고유 문항은9개입니다.

원본4개Y·COPY4개R·단건2089246R에서 버전ID 라벨, viewFlag, models, omrPreviews, 이미지 참조가 같습니다. detailId도 위 계보 표의 값을 유지합니다. 상세 값에서는 원본/COPY의 쌍둥이 표시가2개에서3개로 바뀌며, 단건 대조의 값은 그대로입니다. 따라서 관계 확장과 내용/버전 보존을 구분할 수 있습니다.

이 비교는 수집한 모델·저장 OMR·이미지 참조·현재 버전·상태의 불변 확인입니다. 원격 이미지 파일을 다시 받아 바이트를 대조한 것은 아니므로 원본 이미지 **참조 불변**으로 표현합니다. 전체 DB·객체·동시 작업이나 물리 저장 수명까지 불변이라고 주장하지 않습니다.

## 8. 현재 신규 세트의 전체 세로 픽셀

부모 연구자가 [2889 상단](evidence/2889-own-set-ai-result-detail-top-visual.png), [2890 중간](evidence/2890-own-set-ai-result-detail-middle-visual.png), [2891 하단](evidence/2891-own-set-ai-result-detail-bottom-visual.png)을 직접 확인했습니다. 저장된 스크롤 구간은 다음과 같습니다.

| 근거 | top | clientHeight | 전체 scrollHeight | 덮는 구간 |
|---|---|---|---|---|
| 2889 | 0 | 1015 | 2763 | 0~1015 |
| 2890 | 875 | 1015 | 2763 | 875~1890 |
| 2891 | 1748 | 1015 | 2763 | 1748~2763 |

구간이 겹쳐 현재 신규 세트 상세의 전체 세로2763을 덮습니다. 부모는 공유 지문·네 행렬/정답·HML 미리보기·상태·메타·하단을 확인했습니다. PNG 크기는 모두1810×1075이며 내부 wrapper 높이와 구별했습니다. 이 범위를 다른 역할·화면폭·다른 세트·수정 탭이나 실제 채점 화면의 완료로 확대하지 않습니다. OMR 탭은 위2900의 한 상태로 별도 기록했습니다.

## 9. 보존 소스와 남은 한계

아래 네 HTML export는 CRLF 줄바꿈을 LF로만 정규화하면 각각 연결된 evidence의 result.html 및 대응 schema의 크기·SHA와 정확히 일치합니다. 원시 파일은 다시 저장하지 않았습니다.

| 보존 소스 | 근거 | 원시 바이트 | LF 정규화 바이트 |
|---|---|---|---|
| [원본 실행 전](sources/own-set2089242-before-ai-20261110.html) | 2847 | 674091 | 669585 |
| [원본 완료 후](sources/own-set2089242-ai-finished-20261110.html) | 2884 | 674091 | 669585 |
| [신규 AI 상세](sources/own-set-ai2089382-result-detail-20261110.html) | 2887 | 654207 | 649947 |
| [신규 AI 수정](sources/own-set-ai2089382-result-edit-20261110.html) | 2893 | 929969 | 922232 |

요청1회와 비동기 결과의 연결, 부모/지문/문항/버전,12개 관계, 이력 수, 수치·행렬 크기, 공유 HTML/HML 표식, 저장/실제 OMR 표현, 대조 필드, PNG 구간, draft 응답과 링크를 검증했습니다.

AI 입력의 정확한 선택 코드·요청 payload·추출/캐시·서버 정규화와 서비스 채점 결과는 미확정입니다. 이 한 플로우를 모든 AI 백엔드나 모든 세트의 정책으로 일반화하지 않습니다. 사용자가 답한 해석 HML·정상 Definition 세트 ZIP 표본은 현재 없으며 사용자 응답 대기가 아닙니다. 전체 사이트의 화면·기능 분모도 unknown이므로 완료율은 계산하지 않았습니다.
