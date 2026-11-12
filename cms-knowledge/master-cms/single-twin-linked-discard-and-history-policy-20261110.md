# 연결된 단건 COPY의 폐기·쌍둥이 제외·생성 이력 보존

작성일은 2026-11-10이며 범위는 phase65의 근거3063~3104입니다. 기존 단건 쌍둥이3개에 새 COPY2089387을 추가한 뒤, 새 문항만 정상 상태 UI에서 R→D로 폐기했습니다. 현재 관계는 기존3개로 복원됐고387 자신의 쌍둥이는0개가 됐습니다. 원본의 생성 이력에는 D가 된387의 행과 일반 상세 링크가 남았습니다. D 필터 검색에서도387이 표시되지만 추가 버튼은 비활성입니다.

이 보고서는 저장된 로컬 근거만 대조해 새로 작성했습니다. 브라우저·네트워크·CMS·전역 원장/인덱스·기존 문서는 조작하지 않았습니다. 실제로 연결된 단건 COPY 한 개의 사례이며 세트D·모든 상태/역할·강제 요청의 서버 정책까지 검증한 결과는 아닙니다.

## 1. 의도와 실행 범위

[실행 intent](disposable-single-twin-discard-intent-20261110.json)는 승인 원본2089216에서 새 일회성 COPY 한 개를 만들고 그 COPY만 폐기하도록 범위를 정했습니다. 기존 원본216/Y, COPY239/N, AI240/R의 관계·본문·OMR·이미지 참조·상세 버전은 보존 대상입니다. 이하216·239·240·387 표기는 각각 전체 itemId2089216·2089239·2089240·2089387을 뜻합니다.

| 문항 | 역할 | 실행 전 상태 | 실행 후 상태 | detailId |
|---|---|---|---|---|
| 2089216 | 원본/생성 anchor | Y | Y | 2088849 |
| 2089239 | 기존 COPY | N | N | 2089019 |
| 2089240 | 기존 AI | R | R | 2088872 |
| 2089387 | 이번 검증용 새 COPY | 생성 후R | D | 2089098 |

[phase65](session-20261110-phase65.json)의 신규 업무는 COPY 생성과 D 최종 저장2회이며 누계는84회입니다. 조회·검색·확인창·캡처와 이 보고서 작성은 추가 업무로 세지 않았습니다. 이번 조사에서 Service 배포는0회입니다. 새387은 의도한 폐기 상태로 남겼고 기존3문항의 상태는 바꾸지 않았습니다.

## 2. 실제 생성과 정상 D 최종 저장

[3071](evidence/3071-own-single216-disposable-copy-submit-once.json)은 승인 원본216의 정상 COPY 요청을 한 번 실행했음을 기록합니다. 실제 요청은 POST `/item/all/twin-generate.donga`, itemId2089216/sourceTypeCOPY입니다. [3073](evidence/3073-own-single216-disposable-copy-first-readback.json)의 새 생성 이력과 [3077](evidence/3077-own-disposable387-twin-family-readback.json)의 현재 관계에서387이 추가됐습니다. [3082](evidence/3082-own-disposable387-before-discard-current.json)은 새387/R·부모216·detail2089098을 확인합니다.

이후 정상 상태 잠금 해제3078, D 선택과 확인창 열기3080을 거쳤습니다. [3081](evidence/3081-own-disposable387-discard-confirm-read.json)의 확인 문구는 다음과 같습니다.

`폐기 시 쌍둥이 문항에서 제외됩니다.`

확인창을 연 동작과 최종 저장을 구분했습니다. [3083](evidence/3083-own-disposable387-discard-final-once.json)은 itemId2089387/viewFlagD, `attemptCount=1`, finalDiscardClicked=true를 기록합니다. [3086](evidence/3086-own-disposable387-after-discard-current.json)의 신선한 결과는 HTTP200·D를 보여 줍니다.

## 3. 현재 관계와 생성 이력의 변화

| 시점 | 기존 원본을 포함한 현재 관계 |387 자신의 현재 쌍둥이| 원본216의 생성 이력 |
|---|---|---|---|
| 새 COPY 전3067 | 216Y / 239N / 240R, 총3개 | 아직 생성 전 | 2행: 기존 AI240, COPY239 |
| 새 COPY 후3073·3077 | 위3개 + 387R, 총4개 | 총4개 | 3행: 새 COPY387 + 기존2행 |
|387 D 후3087 | 216Y / 239N / 240R, 총3개 | 0개 | 생성 직후와 같은3행,387 유지 |

[3087](evidence/3087-own-single-family-after-discard-memberships-history.json)은216·239·240 각각의 현재 관계에서 같은3개 ID를 확인합니다. 각 화면에서 자신을 먼저 표시하는 순서 차이는 멤버 차이로 세지 않았습니다.387의 응답에는 `쌍둥이 문항 그룹이 없습니다.`라는 안내행 하나만 있습니다. 이는 실제 문항행이 아니므로1개로 세지 않고0개로 판정했습니다. 상세의 쌍둥이0개 표시와도 일치합니다.

원본의 현재 관계3개는 [3098](evidence/3098-own-single216-post-discard-current-twins-ui.json)의 정상 현재 쌍둥이 모달에서도 확인됩니다. 단건 그룹 수는 현재 문항을 포함한 수입니다.

### 생성 이력은 현재 관계에서 제외된 뒤에도 남음

3073의 생성 직후 anchor 이력 배열과3087의 폐기 후 anchor 이력 배열은 정확히 같습니다. D 저장으로 새 이력행이 추가된 것도 아니고387의 생성 이력행이 제거된 것도 아닙니다. 생성 전 이력2행과 생성·폐기 후 이력3행을 구분해야 합니다.

[3095](evidence/3095-own-single216-post-discard-generation-history-ui.json)와 [3096](evidence/3096-own-single216-discarded387-history-row-details.json)의 실제 생성 이력 모달에는 다음 행이 남습니다.

| itemId | 생성 방식 | 표시 시각 | 상세 링크 |
|---|---|---|---|
| 2089387 | 복제 | 2026-11-10 15:43 | `/item/all/detail.donga?itemId=2089387` |
| 2089240 | AI생성 | 2026-11-09 19:56 | `/item/all/detail.donga?itemId=2089240` |
| 2089239 | 복제 | 2026-11-09 19:37 | `/item/all/detail.donga?itemId=2089239` |

387은 현재 D이지만 이력에는 일반 상세 링크가 보존됩니다. 해당 D 상세의 GET도 HTTP200입니다. 이 사실은 생성 이력의 존재와 현재 쌍둥이 관계가 같은 개념이 아님을 보여 줍니다. 이력행이 남았다는 이유로387이 현재 그룹에 여전히 포함돼 있다고 해석하지 않습니다. 이력의 전체 보존 기간이나 모든 폐기/세트 사례의 정책은 미확정입니다.

## 4. D 상세의 읽기·수정 경계

387의 폐기 후 상세는 읽을 수 있습니다. 생성 방식은 COPY/부모216, 문항 형태는 객관식>단답형>N지 선다, 난이도 하이며 원본 파일·출처는 `-`, 평가지0개입니다. [폐기 전 HTML](sources/own-disposable387-before-discard-20261110.html)과 [폐기 후 HTML](sources/own-disposable387-after-discard-20261110.html)을 보존했습니다.

3082→3086의 statusEditDisabled는 false→true로 바뀝니다. 이는 원래 화면의 일반적인 상태 필드 잠금과 구분한 상태 편집 제어의 비활성 관측입니다. [3089](evidence/3089-own-disposable387-discard-edit-redirect.json)의 정상 modify GET은 redirected=true이며 최종 경로가 동일 문항의 `/item/all/detail.donga`입니다. 목록으로 사라지거나 수정폼이 열린 결과가 아닙니다.

이 표본에서는 D 상세와 생성 이력의 조회는 유지되고 상태/문항 편집 경로는 잠겼습니다. D의 강제 복원·직접 상태 요청·다른 역할의 접근이나 물리 DB 삭제 여부는 시험하지 않았습니다. D 후에도 내용이 보인다는 사실만으로 내부 저장·삭제 구현을 확정하지 않습니다.

## 5. 내용·OMR·이미지 참조와 기존3개 보존

[폐기 비교 파일](disposable-single387-linked-discard-comparison-20261110.json)과 실제 근거를 대조했습니다.

- 387의3082→3086에서 detail 버전2089098, models, omrPreviews, images가 같습니다. 상세 값의 차이는 쌍둥이4개→0개이며 viewFlag와 상태 편집 제어는 위와 같이 바뀝니다.
- 기존216/239/240의3068→3088은 `action.data.result` 객체 전체가 정확히 같습니다. method와 세 문항의 HTTP 상태·상태값·상세 값·모델·OMR·이미지 참조가 같은 범위입니다.

두 번째 비교는 [3068](evidence/3068-own-single-family-before-disposable-copy-controls.json)과 [3088](evidence/3088-own-single-family-after-discard-control-content.json)의 기존3개 상세 control 응답입니다. 생성 이력 조회는 이 control 객체에 포함되지 않으므로, 원본의 이력이2행에서3행으로 증가한 사실과 모순되지 않습니다. 근거 JSON 파일의 수집 시각까지 같은 바이트라는 뜻도 아닙니다.

387의 저장 OMR은 기존5지 선택지와 정답④를 유지합니다. 폐기로 모델·저장 정답을 다시 변환하거나 새 버전을 만들었다는 변화는 이 비교에서 관측되지 않았습니다. 이미지 참조의 일치는 확인했지만 원격 이미지 파일을 다시 다운로드해 바이트를 비교한 것은 아닙니다. 따라서 이미지 파일의 물리적 불변이나 전체 DB/서비스 관계의 불변으로 확대하지 않습니다.

## 6. D 필터 검색 결과와 추가 비활성

[3100](evidence/3100-own-single216-discarded387-filter-search.json)은 정상 쌍둥이 추가 탭에서 keyword2089387, checkedStatuses=[D]로 검색한 결과를 연결합니다. [3101](evidence/3101-own-single216-discarded387-add-filter-result.json)에는387이 검색 결과로 표시되며 상태는 폐기, 추가 불가 사유는 `폐기 문항`입니다.

해당 결과의 추가 기능 버튼은 disabled=true이고 targetItemId2089387의 추가 경로 속성이 존재합니다. 경로가 HTML에 있다는 사실을 실제 추가 실행이나 서버 수용 근거로 세지 않았습니다. 비활성 제어를 강제로 활성화하거나 직접 Add 요청을 보내지 않았습니다.

따라서 확인된 경계는 **D 문항의 정상 검색 노출·상세 조회·생성 이력 보존은 가능하지만, 현재 쌍둥이 멤버에서는 제외되고 정상 UI 재추가는 비활성**이라는 이 단건 사례입니다. 직접 서버 요청의 거절 정책이나 모든 D 문항/역할의 결과는 미검증입니다.

## 7. 픽셀 확인과 캡처 컨트롤러 오류

[3091 메타](evidence/3091-own-disposable387-post-discard-visual-retry.json)와 [성공 PNG](evidence/3091-own-disposable387-post-discard-visual-retry.png)는 scoped direct CDP 캡처 결과입니다. 기록상 nativeInputUsed=false, activatedTab=false이며 대상은 hidden 상태의387 상세입니다. 부모 연구자가 실제 PNG를 직접 확인했습니다. 이 로컬 정리 작업은 파일 형식·크기·메타만 검사했습니다.

| 항목 | 확인된 범위 |
|---|---|
| PNG | 1810×1075, 99736바이트 |
| 내부 스크롤 | top0, clientHeight1015, 전체2214 |
| 이미지 로딩 | 3개 모두 loaded=true·양수 크기 |
| 픽셀 완료 | 현재 D 상세의 상단 캡처 범위 |

PNG의 SHA-256은 `af6c5805cf1a3e945e08884694f9683e5058b02078dbe97e4a7accec1d60f8e8`입니다. 전체 페이지 높이2214를 확인했다는 사실을 전체 세로 픽셀을 직접 봤다는 뜻으로 사용하지 않습니다.

[3092](evidence/3092-own-disposable387-post-discard-middle-visual.json)에서는 일반 agent-browser 경로의 action과 DOM snapshot은 성공했고 top904/client1015/전체2214를 읽었습니다. 그러나 screenshot은 os error10060·outcome_unknown으로 시간 초과했고 대응하는 성공 PNG 파일이 없습니다. 중간·하단의 직접 시각 검토는 미완료입니다.

이는 캡처 컨트롤러의 응답 실패이며 CMS 폐기 실패나 화면 기능 오류로 분류하지 않았습니다. 반대로3091의 직접 캡처 성공을 모든 hidden 탭·다른 캡처 경로의 성공 보장으로 확대하지 않았습니다.

## 8. 종료 상태·검증과 남은 범위

[3104](evidence/3104-own-single216-final-current-state.json)의 최종 소유 탭은 원본216/Y, 현재 쌍둥이3개, 상태 제어 잠금, generationWorking=false, visibleModals=[]입니다. 폐기 검증용387만 D로 남고 원본3개의 상태·모델·OMR·이미지 참조·상세 버전은 위 비교 범위에서 보존됐습니다.

보존 HTML 두 파일은 CRLF를 LF로만 정규화하면 각각 근거3075와3085의 result.html 및 대응 schema의 크기·SHA와 일치합니다. 파일은 수정하지 않았습니다. 새 보고서의 로컬 링크·UTF-8, 단건 그룹의 실제 ID 행 수, 생성 이력 보존, control 객체 동일성, D 검색의 비활성 추가 제어와 캡처 성공/실패 범위를 검증했습니다.

실제 세트D, 혼합 상태/역할, D 강제 복원·직접 추가 요청, 모든 관계/서비스 영향과 중하단 픽셀은 남은 범위입니다. 사용자에게 요청했던 해석 HML과 정상 Definition 세트 ZIP 표본은 현재 없다는 답변이 완료됐으며 응답 대기로 분류하지 않습니다. 전체 사이트의 화면·기능 분모는 unknown이고 이 사례로 전체 완료율을 계산하지 않습니다.
