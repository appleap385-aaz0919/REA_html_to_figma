# 쌍둥이 생성·그룹 연결 정책 검토

최초 작성일은 2026-11-09, 갱신일은 2026-11-10이며 근거 범위는 phase33~36, **cutoff2235**입니다. phase35의 cutoff2209에서는 AI가 처리 중이었고, 후속2225~2227에서 완료를 확인한 시간순서를 유지했습니다. cutoff2235의 확정 Master 업무 변경 **40회는 HML666 등록·승인을 포함한 전체 조사 누계이며 쌍둥이 작업 수가 아닙니다.** 이번 작업은 저장된 JSON·HTML·관찰기·이미지 수집 기록을 읽어 이 보고서만 갱신한 정적 조사이며 브라우저·네트워크·원장·전역 상태/인덱스를 조작하지 않았습니다. [phase33 집계](session-20261109-phase33.json#L91), [phase34 집계](session-20261109-phase34.json#L12), [phase35 집계](session-20261109-phase35.json#L10), [phase36의 작업·집계](session-20261109-phase36.json#L12)

**확인한 결과와 해석 범위**

COPY는 자체 승인 원문2089216에서 한 번 실행돼 새 문항2089239/상세2088871 **초안 R**을 만들었고, 원문Y와 복제본R이 함께 **2멤버**로 표시됐습니다. 이후 복제본 연결을 해제하자 원문은 그룹 없음/0개가 됐으며, 정확한 복제본 ID로 수동 재추가한 뒤 두 문항은 다시2개였습니다. 생성 이력은 이 과정 전체에서 COPY1건을 유지했습니다. [COPY 제출](evidence/2170-own-qa-twin-copy-submit-once.json#L53), [생성 뒤 그룹·이력](evidence/2172-own-qa-twin-copy-independent-readback.json#L53), [해제 뒤 독립 조회](evidence/2186-own-qa-clone-remove-independent-readback.json#L53), [재추가 뒤 독립 조회](evidence/2196-own-qa-clone-add-independent-readback.json#L53)

AI는 실제 요청1회의 접수 뒤 phase35에서는 working=true였지만, phase36의 독립 GET2225에서 **working=false·그룹3**,2226에서 AI2089240과 COPY2089239의 **생성 이력2건**,2227에서 새 AI 문항2089240/상세2088872 **초안 R**을 확인했습니다. AI 결과는 원문과 다른 선택지·정답⑤·저장 OMR·자체 이미지 경로를 가집니다. 생성 중 버튼의 disabled=false·팝오버/추가 htmx 요청0은 처리 중이던 시점의 결과로 보존합니다. [처리 중 버튼](evidence/2206-own-qa-ai-working-button-popover.json#L52), [마지막 초기 진행 조회](evidence/2208-own-qa-ai-first-progress-server-read.json#L53), [완료 후 작업 상태](evidence/2225-own-qa-ai-background-server-progress.json#L53), [그룹·이력](evidence/2226-own-qa-ai-background-histories.json#L53), [AI 결과 상세](evidence/2227-own-ai-child2089240-background-source.json#L53)

| 구간 | 실제 업무 결과 | 이 구간의 확정 작업 증가·누계 |
|---|---|---|
| phase33 | COPY1회 →2089239 R, 원문 포함 그룹2. | +1·35회. [제출](evidence/2170-own-qa-twin-copy-submit-once.json#L53), [결과](evidence/2172-own-qa-twin-copy-independent-readback.json#L53), [집계](session-20261109-phase33.json#L91) |
| phase34 | 복제본 연결 해제1회·정확ID 수동 재추가1회. | +2·37회. [해제 결과](evidence/2186-own-qa-clone-remove-independent-readback.json#L53), [추가 제출](evidence/2195-own-qa-clone-add-once.json#L53), [추가 결과](evidence/2196-own-qa-clone-add-independent-readback.json#L53), [집계](session-20261109-phase34.json#L12) |
| phase35 | AI 생성 요청1회 접수, 생성 완료 미확인. | +1·38회. [제출](evidence/2203-own-qa-ai-generation-submit-once.json#L53), [접수 결과](evidence/2204-own-qa-ai-generation-server-state.json#L53), [집계](session-20261109-phase35.json#L10) |
| phase36 | 앞선 AI 요청의 결과2089240 R·그룹3·이력2를 후속 조회로 확인했습니다. 별도의 AI 재제출은 없습니다. | AI 비동기 완료 자체는 +0회입니다. 이 구간의 +2·전체40회는 HML666 등록·승인이며 쌍둥이 작업에 포함하지 않습니다. [AI 후속 결과](evidence/2226-own-qa-ai-background-histories.json#L53), [생성 상세](evidence/2227-own-ai-child2089240-background-source.json#L53), [phase36 집계](session-20261109-phase36.json#L12) |

위 누계는 확정된 Master 업무 작업 수이며 DB 변경 행 수·생성 문항 수·클릭 수가 아닙니다. 이 보고서 범위에서 쌍둥이 관련 확정 제출은 COPY1회·해제1회·수동 추가1회·AI 요청1회의 **4회**입니다. 선택/취소·읽기 조회·생성 중 팝오버 클릭·AI의 비동기 완료를 추가 업무 제출로 더하지 않습니다. [COPY](evidence/2170-own-qa-twin-copy-submit-once.json#L53), [해제 결과](evidence/2186-own-qa-clone-remove-independent-readback.json#L53), [수동 추가](evidence/2195-own-qa-clone-add-once.json#L53), [AI 요청](evidence/2203-own-qa-ai-generation-submit-once.json#L53), [클릭 중 추가 요청0](evidence/2206-own-qa-ai-working-button-popover.json#L52), [완료 집계 경계](session-20261109-phase36.json#L7)

**생성 모달: 코드 선언과 실제 실행**

현재 단건 생성 폼은 hidden itemId와 COPY/AI 라디오를 가지며, COPY가 기본입니다. 생성 수·모델·프롬프트 입력란은 이 폼에 없습니다. 실제 AI 선택 후 취소·재열기에서 COPY 초기화를 확인했습니다. 이는 현재 단건 폼의 범위이며 세트 폼이나 모든 생성 설정에 일반화하지 않습니다. [폼 선언995행](sources/qa-twin-ai-processing-20261109.html#L995), [COPY/AI 선언1005행](sources/qa-twin-ai-processing-20261109.html#L1005), [실제 모달 필드](evidence/2157-approved-qa-twin-generate-dialog.json#L53), [AI 선택](evidence/2158-twin-ai-choice-local-only.json#L52), [재열기 초기화](evidence/2160-twin-generate-reopen-after-cancel.json#L53)

생성 시작 코드는 모달을 닫고 form.requestSubmit()을 호출하며, 폼의 hx-post는 /item/all/twin-generate.donga입니다. 실제 COPY와 AI 제출에서 각각 itemId=2089216 및 sourceType=COPY/AI인 POST를 관측했습니다. 응답의 twinGenerated 트리거를 받으면 COPY에는 생성 완료, AI에는 요청 접수 문구를 남기고 페이지를 다시 읽는 코드입니다. 생성 수락/완료를 같은 사건으로 해석하면 안 됩니다. [제출 코드1200행](sources/qa-twin-ai-processing-20261109.html#L1200), [응답 분기1208행](sources/qa-twin-ai-processing-20261109.html#L1208), [COPY 실제 요청](evidence/2170-own-qa-twin-copy-submit-once.json#L53), [AI 실제 요청](evidence/2203-own-qa-ai-generation-submit-once.json#L53), [AI 접수 결과](evidence/2204-own-qa-ai-generation-server-state.json#L53)

코드 주석의 로딩 오버레이·이미 작업 중/승인 아님 반려 설명은 선언상 의도입니다. 이번 표본은 정상 COPY·정상 AI 접수/비동기 결과 생성 및 working=true의 버튼 경로를 확인했으며, 직접 요청으로 승인 조건을 우회하거나 동시 요청을 보내 서버 반려 정책을 시험하지 않았습니다. [제출·반려 선언1200행](sources/qa-twin-ai-processing-20261109.html#L1200), [COPY1회](evidence/2170-own-qa-twin-copy-submit-once.json#L53), [AI1회](evidence/2203-own-qa-ai-generation-submit-once.json#L53), [현재 버튼 보호 경로](evidence/2206-own-qa-ai-working-button-popover.json#L52), [AI 후속 결과](evidence/2226-own-qa-ai-background-histories.json#L53)

**COPY의 유지 값과 유지되지 않은 표시·연결**

다음 비교는 생성 전 원문2156과 생성 후 복제본2179 및 재추가 후 양쪽 독립 GET2198을 기준으로 합니다. 원문의 생성 전 그룹0과 복제본 생성 후 그룹2는 서로 다른 시점이므로 “원문은 그룹에 포함되지 않는다”는 근거가 아닙니다. 실제 생성 직후 그룹 조회에는 두 문항이 함께 있습니다. [비교 시점·필드](twin-copy-comparison-20261109.json#L1), [두 멤버](evidence/2172-own-qa-twin-copy-independent-readback.json#L53), [복제 상세](evidence/2179-own-created-twin2089239-observation.json#L53), [양쪽 최종 GET](evidence/2198-own-qa-pair-detail-server-readback.json#L53)

| 항목 | 원문2089216 | 복제2089239 | 확인 수준·근거 |
|---|---|---|---|
| 식별자·상태·생성 방식 | 상세2088849, Y, HML변환. | 새 상세2088871, R, 복제·부모2089216. | 실제 상세/재조회 값입니다. 원문의 승인Y는 복제본에 그대로 적용되지 않았습니다. [생성 뒤 복제 상세](evidence/2179-own-created-twin2089239-observation.json#L53), [두 문항](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 저장 OMR·정답 | OBSACN, 선택지①~⑤, VALUE정답④. | 같은 유형·선택지·정답 JSON. | 현재 두 저장값의 동일성을 확인했습니다. 새 복제본의 실제 채점 미리보기까지 실행한 것은 아닙니다. [저장 자료](evidence/2179-own-created-twin2089239-observation.json#L53), [최종 양쪽 저장 자료](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 비교한 분류 메타 | 난이도하·단원22MMAT0KOK1004040000·성취기준9수02-07·내용영역22MMAT01020000·행동영역계산·교과역량문제해결·유형MA146100. | 비교한 값이 같습니다. | 표시된 주요 필드의 유지이며 모든 DB 필드의 완전 복사를 뜻하지 않습니다. [복제 메타](evidence/2179-own-created-twin2089239-observation.json#L53), [양쪽 비교](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 원본 파일 | QA-HML-20261109-01-SET.hml 및 다운로드. | “-”. | 원본 파일 표시/다운로드 연결은 복제본에서 보이지 않았습니다. 물리 파일 삭제·복사 여부는 미확인입니다. [양쪽 원본 표시](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 출처·평가지 | 출처1·평가지1. | 출처“-”·평가지0. | 해당 표본의 표시/매핑 조회 결과입니다. 다른 복제 조합의 일반 정책은 미확인입니다. [초기 복제 관계](evidence/2179-own-created-twin2089239-observation.json#L53), [재추가 후 관계](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 이미지 | 원문의 자산/문제/해답 경로. | 3개 이미지가 complete=true·비영 크기이며 URL은2089216/2088849 경로를 참조합니다. | 원본 파일 표시가 없어도 Q/A 미리보기 리소스는 로드됐습니다. 독립 파일 복사 구현이나 원문 변경 후 영향은 미확인입니다. [이미지 URL·크기](evidence/2179-own-created-twin2089239-observation.json#L53), [비교 기록](twin-copy-comparison-20261109.json#L1). |
| 쌍둥이 수 | 생성 뒤2. | 생성 뒤2. | 새로 생성된 문항은1개이고 그룹 표시 수2에는 원문을 포함합니다. [그룹 구성](evidence/2172-own-qa-twin-copy-independent-readback.json#L53), [양쪽 수](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |

생성 이력 모달은2089239·복제·요청자·생성일시를 표시하고 해당 ID에 상세 링크를 제공합니다. 코드상 이력 조회는 버튼을 누를 때 fetch 후 렌더하며, 여러 itemIds를 받으면 한 문항씩 행을 만들고 방식/요청자/일시는 묶음의 첫 행에서 rowspan으로 표시합니다. 이 다중 ID/세트 렌더 분기는 소스로 확인했으며 이번 단건COPY에서 실제 여러 생성문항을 만든 결과는 아닙니다. [실제 생성 이력](evidence/2173-own-qa-copy-history-modal.json#L53), [이력 렌더1139행](sources/qa-twin-ai-processing-20261109.html#L1139), [버튼 조회1183행](sources/qa-twin-ai-processing-20261109.html#L1183)

**그룹 해제·재추가와 생성 이력의 분리**

| 단계 | 실제 결과 | 확정할 수 없는 범위 |
|---|---|---|
| 해제 전 | 원문Y·복제R의2행과 각 해제 버튼이 있습니다. 복제본 버튼은 twinDataType=ITEM, twinDataId=2089239인 twin-remove POST를 선언합니다. [원문/복제 행·버튼](sources/qa-twin-membership-final-20261109.html#L773), [복제 해제 버튼806행](sources/qa-twin-membership-final-20261109.html#L806). | 버튼의 대상과 폼 선언이며 모든 그룹의 해제 규칙은 아닙니다. |
| 복제본 해제 한 번 | 관찰기는 지정 버튼을 한 번 클릭한 후 htmx:afterRequest를15초 기다렸고 “Remove outcome unknown; never repeat”로 종료됐습니다. [관찰 시간 초과](evidence/2185-own-qa-clone-remove-once.json#L39), [한 번 클릭·응답 관찰 코드4행](sources/runtime/qa2089216-remove-own-clone-once.js#L4). | 서버 실패·해제 거부로 판정하지 않습니다. 해당 이벤트의 HTTP 상태/응답을 이 helper가 확보한 것도 아닙니다. |
| 해제 후 독립 GET·화면 | 다시 누르지 않은 상태에서 원문의 twins GET은200·그룹 없음/0개였고 실제 모달도0개였습니다. COPY 생성 이력2089239는 유지됐습니다. [독립 조회](evidence/2186-own-qa-clone-remove-independent-readback.json#L53), [모달 결과](evidence/2187-own-qa-remove-current-dialog-readback.json#L52). | 물리 그룹 레코드 삭제·원래 groupId 소멸·복제본의 해제 직후 별도 GET 상태는 이 자료로 확정하지 않습니다. |
| 정확 ID 검색 | 추가 탭에서 itemId=2089239로 조회해 초안 한 행·“추가 가능”·활성 추가 버튼을 확인했습니다. [정확 ID 조회](evidence/2192-own-qa-twin-search-exact-clone.json#L53), [정확 후보 POST 선언1000행](sources/qa-twin-add-exact2089239-20261109.html#L1000). | 모든 ID 검색의 부분일치/불법값·빈결과·세트 검색은 미검증입니다. |
| 수동 재추가 한 번 | 정확히2089239의 추가 버튼을 한 번 눌렀고, 독립 GET에서 원문Y+복제R의2개가 복원됐습니다. 이력은 기존COPY1건입니다. [실제 추가](evidence/2195-own-qa-clone-add-once.json#L53), [독립 결과](evidence/2196-own-qa-clone-add-independent-readback.json#L53). | 멤버 구성 복원과 동일 물리 groupId 복원을 구분합니다. 이전 groupId 유지/재생성은 미확인입니다. |
| 재추가 후 중복 UI | “쌍둥이 문항으로 등록되었습니다.” 안내와 “등록된 문항” 표기, 해당 후보의 추가 버튼 disabled=true를 확인했습니다. [후보 갱신](evidence/2197-own-qa-clone-add-candidate-after.json#L52). | 비활성 버튼을 우회한 중복 POST의 서버 거부·동시성 정책은 시험하지 않았습니다. |
| 양쪽 최종 상세 | 두 문항은 수2, 원문Y/2088849·복제R/2088871 및 OBSACN/①~⑤/④를 유지했습니다. [양쪽 서버 GET](evidence/2198-own-qa-pair-detail-server-readback.json#L53). | 해제/재추가로 모든 DB 필드가 불변이었다는 증명은 아닙니다. |

따라서 이 표본에서 **현재 그룹 연결과 생성 이력은 별도로 변화**합니다. 해제는 이력을 지우지 않았고 수동 추가는 새 생성 이력을 만들지 않았습니다. 이를 생성 문항의 물리 삭제나 이력 보존기간·모든 그룹 정책으로 확대하지 않습니다. [해제 후 이력·그룹](evidence/2186-own-qa-clone-remove-independent-readback.json#L53), [재추가 후 이력·그룹](evidence/2196-own-qa-clone-add-independent-readback.json#L53)

**추가 후보의 상태와 코드상 검색 동작**

관찰한 기본 검색은 교육과정22, 단일/세트 모두, 상태R/F/Y/N 선택·D 미선택,10행 표시였습니다. 화면에 나타난32506건은 그때의 후보 검색 결과 수이며 쌍둥이 그룹 수나 전체 CMS 문항 총수가 아닙니다. [실제 기본 필터·결과](evidence/2190-own-qa-twin-add-tab-populated.json#L53)

| 후보 표시 | 현재 사례 | 버튼 상태·해석 |
|---|---|---|
| 추가 가능 | 해제된2089239 R,2089238 R. | 활성입니다.2089239만 실제 추가했습니다. 다른 후보의 적격성을 모두 시험하지 않았습니다. [기본 결과](evidence/2190-own-qa-twin-add-tab-populated.json#L53), [정확 후보](evidence/2192-own-qa-twin-search-exact-clone.json#L53), [실제 대상](evidence/2195-own-qa-clone-add-once.json#L53). |
| 본인 문항 | 원문2089216 Y. | disabled입니다. 현재 자기 자신 추가를 막는 표시이며 서버 직접 요청 검증은 아닙니다. [본인 표시1036행](sources/qa-twin-add-candidates-20261109.html#L1036), [버튼1038행](sources/qa-twin-add-candidates-20261109.html#L1038), [실제 DOM](evidence/2190-own-qa-twin-add-tab-populated.json#L53). |
| 다른 쌍둥이 문항 그룹 |2088985 등. | 활성 추가 버튼이 선언/관찰됐습니다. **다른 그룹 합치기·이동·전체 멤버 편입은 실행하지 않았으므로 결과 정책을 확정할 수 없습니다.** [다른 그룹 표시1055행](sources/qa-twin-add-candidates-20261109.html#L1055), [버튼1057행](sources/qa-twin-add-candidates-20261109.html#L1057), [실제 후보](evidence/2190-own-qa-twin-add-tab-populated.json#L53). |
| 등록된 문항 |2089239 재추가 뒤. | disabled=true로 바뀌었습니다. 이는 중복 추가의 현재 UI 차단입니다. [추가 뒤 상태](evidence/2197-own-qa-clone-add-candidate-after.json#L52). |

추가 버튼은 targetItemId를 쿼리에 두고 검색 필터·현재 pageNum을 포함해 twinCurrent를 교체하는 hx-post를 선언합니다. 별도의 추가 폼에서 서버가 단일/세트 판단을 맡는다는 주석은 있지만, 이 코드는 다른 그룹 처리·세트 호환성·트랜잭션 범위를 보여주지 않습니다. [추가 선언1000행](sources/qa-twin-add-candidates-20261109.html#L1000), [현재 목록 선언752행](sources/qa-twin-membership-final-20261109.html#L752), [현재 단건 실행](evidence/2195-own-qa-clone-add-once.json#L53)

탭 첫 진입의1회 기본 조회, 탭 왕복의 검색/결과 유지, 모달 닫힘 시 필터·결과 초기화/첫 탭 복귀는 클라이언트 코드에 선언돼 있습니다. 초기화 버튼 자체는 입력을 기본값으로 되돌리며 조회를 자동으로 실행하지 않는 코드입니다. 이 전체 왕복/초기화 조합을 이번 phase34에서 반복 실증한 것으로 기록하지 않습니다. [탭 수명1237행](sources/qa-twin-add-candidates-20261109.html#L1237), [초기화 코드](sources/qa-twin-ai-processing-20261109.html#L926)

2188은 추가 결과가 이미 채워져 있다는 관찰기의 방어 조건에서 중단됐고, 실제 탭 클릭을 다시 수행한 성공 근거가 아닙니다.2189는 실행 근거 파일이 없으므로 완료 단계로 세지 않습니다.2190은 로딩 오버레이가 잡힌 순간이어서 추가 탭 전체의 정착된 픽셀 완료 근거로 쓰지 않으며, 정확ID 한 행의 픽셀 검토는 부모의2193/2197 기록 범위로 제한합니다. [자동화 중단](evidence/2188-own-qa-twin-add-tab-default.json#L39), [phase34 근거 한계·픽셀 기록](session-20261109-phase34.json#L1)

**AI 접수·작업 중 버튼·후속 완료의 시간순서**

| 단계 | 실제 근거와 결과 | 판단 |
|---|---|---|
|2201~2203 | COPY 기본 모달에서 AI를 선택하고 생성 시작을 한 번 눌렀습니다. htmx POST의 itemId2089216/sourceTypeAI가 관측됐습니다. [한 번 제출](evidence/2203-own-qa-ai-generation-submit-once.json#L53). | 실제 AI 요청이며 이전 phase33의 AI 선택·취소와 구분합니다. |
|2204~2205 | 독립 상세 GET은200·원문Y·수2, data-working=true·AI생성·요청자jaehyuk.myung·2026-11-09 19:53·생성 중 버튼을 반환했습니다. UI에는 요청 접수 안내, 이력에는 기존COPY1건만 있습니다. [접수·서버 상태](evidence/2204-own-qa-ai-generation-server-state.json#L53), [즉시 이력/그룹](evidence/2205-own-qa-ai-generation-initial-history.json#L53). | 접수/작업중 표시를 확인했으며 AI 결과 생성 완료는 아닙니다. |
|2206 | 생성 중 버튼의 disabled=false/working=true 상태에서 클릭하자 모달 없이 진행 팝오버가 열렸습니다. “완료되면 생성된 문항이 문항 리스트에 추가됩니다.”와 방식/요청자/시각이 표시됐고 동기 클릭 중 htmx 요청0회였습니다. [실제 클릭 결과](evidence/2206-own-qa-ai-working-button-popover.json#L52). | HTML disabled 속성이 아닌 현재 working 분기의 동작으로 재요청 진입을 막았습니다. 모든 네트워크/서버 중복 방지의 증명은 아닙니다. |
|2208~2209 | 첫 독립 진행 재조회에서도 working=true·그룹2·기존COPY1건이며 새 AI결과 ID는 확보되지 않았습니다. [상세 재조회](evidence/2208-own-qa-ai-first-progress-server-read.json#L53), [이력·그룹 재조회](evidence/2209-own-qa-ai-first-progress-histories.json#L53). | **cutoff2209 당시** 완료·실패는 미확정이었습니다. 이후 완료 근거를 이 앞선 관찰에 소급하지 않습니다. |
|2225 | 후속 독립 GET이 HTTP200·원문Y·그룹3, 버튼 data-working=false·일반 생성 문구를 반환했습니다. visibleButton=null이므로 다른 탭의 현재 화면을 본 결과와 구분합니다. [완료 후 서버 상태](evidence/2225-own-qa-ai-background-server-progress.json#L53). | 같은 요청의 후속 서버 렌더 값이며 새 생성 요청이 아닙니다. |
|2226 | 이력은 AI생성2089240·복제2089239의2건이며, 현재 그룹은 원문2089216 Y·복제2089239 R·AI2089240 R의3행입니다. [독립 이력·그룹 조회](evidence/2226-own-qa-ai-background-histories.json#L53). | 원문을 포함한3멤버입니다. AI가3개를 새로 만들었다는 뜻이 아닙니다. |
|2227 | 새 AI 상세2089240/2088872에 부모2089216·초안R·변형 문제/선택지·저장 OMR/정답⑤·새 이미지 경로를 확인했습니다. [결과 상세](evidence/2227-own-ai-child2089240-background-source.json#L53). | 요청 접수에 그치지 않고 실제 결과 문항이 생겼음을 확인했습니다. Master 개별 승인/채점 미리보기·서비스 배포는 실행하지 않았습니다. |

관찰기의 조회 시작 시각은 AI 요청2203이 2026-11-09 19:53:19 KST, 처리 중 조회2208이19:56:21, 완료 후 조회2225가20:03:42, AI 상세2227이20:05:20입니다. 이는 관찰 순서/간격이며 서버의 정확한 처리 시작·완료 시각이나 소요 시간 측정이 아닙니다. 이력의 “19:56” 표시도 정확한 완료 시각으로 단정하지 않습니다. [요청 시각](evidence/2203-own-qa-ai-generation-submit-once.json#L1), [처리 중 시각](evidence/2208-own-qa-ai-first-progress-server-read.json#L1), [완료 후 조회 시각](evidence/2225-own-qa-ai-background-server-progress.json#L1), [상세 조회 시각](evidence/2227-own-ai-child2089240-background-source.json#L1), [이력 표시](evidence/2226-own-qa-ai-background-histories.json#L53), [phase36 시각 한계](session-20261109-phase36.json#L21)

클라이언트는 버튼 data-working이true면 팝오버를 열고 return하므로 생성 모달을 열지 않습니다. false면 COPY를 선택한 생성 모달을 엽니다. 팝오버는 같은 버튼을 다시 누르면 토글하고 외부 클릭/닫기로 해제하는 코드입니다. working=true 분기의 모달 미개방과 현재 클릭의 추가 htmx 요청0은 실제로 대응됐지만, 외부 클릭·닫기·반복 토글의 모든 분기는 코드 확인 범위입니다. [working 분기1172행](sources/qa-twin-ai-processing-20261109.html#L1172), [팝오버 수명1084행](sources/qa-twin-ai-processing-20261109.html#L1084), [런타임 대응](evidence/2206-own-qa-ai-working-button-popover.json#L52)

코드 주석은 작업 중을 W·P라고 설명하지만 보존된 서버 렌더 값은working=true 하나입니다. 따라서 이 문서에서는 W와P를 구별하거나 특정 내부 큐 단계·서버 에러 코드로 해석하지 않습니다. 세트라면 “세트에 속한 모든 문항의 쌍둥이가 함께 생성됩니다.”를 덧붙이는 분기도 소스에만 있으며 현재 모달은 data-is-set=false입니다. [서버 렌더 관련 주석1074행](sources/qa-twin-ai-processing-20261109.html#L1074), [세트 팝오버 분기1128행](sources/qa-twin-ai-processing-20261109.html#L1128), [현재 단건 선언987행](sources/qa-twin-ai-processing-20261109.html#L987), [실제 단일 작업 표시](evidence/2208-own-qa-ai-first-progress-server-read.json#L53)

**완료된 AI 문항2089240의 내용·메타·이미지**

AI 결과의 원문 관계와 저장값은 배경 독립 GET/보존 상세로 확인했습니다. 현재 열린 HML666 탭의 화면을 AI 상세로 오인하지 않으며, 결과 문항의 개별 Master 승인이나 OMR 미리보기 채점은 이 자료에서 실행하지 않았습니다. [원문 서버 조회의 visibleButton=null](evidence/2225-own-qa-ai-background-server-progress.json#L53), [AI 상세 수집 결과](evidence/2227-own-ai-child2089240-background-source.json#L53), [초안 R 선언329행](sources/qa-ai2089240-result-20261109.html#L329)

| 항목 | 실제 완료 결과 | 확인 범위·근거 |
|---|---|---|
| 식별자·상태·관계 | 새 문항2089240/상세2088872·AI생성·부모2089216·R이며, 그룹은 원문2089216 Y·COPY2089239 R·AI2089240 R의3개입니다. | 원문의 승인Y를 AI 결과가 자동 승계한 것은 아닙니다. [이력·3행](evidence/2226-own-qa-ai-background-histories.json#L53), [식별·부모363행](sources/qa-ai2089240-result-20261109.html#L363), [상태329행](sources/qa-ai2089240-result-20261109.html#L329). |
| 문제·선택지·해설 | 반비례 문제 문장이 변형됐고 선택지는(4,5),(2,10),(5,4),(-5,-4),(-4,4)입니다. 본문 정답⑤·해설a=20·grading.choices=[5]가 저장됐습니다. | 원문/COPY의 본문·선택지/정답④와 구분되는 새 결과입니다. [새 모델213행](sources/qa-ai2089240-result-20261109.html#L213), [원문/COPY 정답④](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 저장 OMR·정답 JSON | OBSACN·①~⑤의5선택지이며 VALUE.allowed_answer의 값은⑤입니다. | 모델 본문 정답⑤와 저장 OMR의 정답⑤가 대응합니다. OMR 생성의 내부 방식이나 실제 채점 UI 동작까지 검증한 것은 아닙니다. [저장 자료208행](sources/qa-ai2089240-result-20261109.html#L208), [결과 관찰](evidence/2227-own-ai-child2089240-background-source.json#L53). |
| 주요 메타 | 난이도하·단원22MMAT0KOK1004040000·성취기준9수02-07·내용영역22MMAT01020000·행동영역계산·교과역량문제해결·유형MA146100입니다. | 비교한 원문/COPY의 주요 메타는 유지됐습니다. 모든 필드의 상속 규칙은 아닙니다. [AI 실제 값](evidence/2227-own-ai-child2089240-background-source.json#L53), [단원/분류438행](sources/qa-ai2089240-result-20261109.html#L438), [원문/COPY 값](evidence/2198-own-qa-pair-detail-server-readback.json#L53). |
| 원본·출처·평가지·배포 | 원본파일“-”·출처“-”·평가지0·배포“-”입니다. | COPY처럼 원본 파일/연결의 표시를 비워 둔 현재 표본이며, 실제 관계 테이블/모든 생성형 정책을 확정하지 않습니다. [원본372행](sources/qa-ai2089240-result-20261109.html#L372), [평가지/출처416행](sources/qa-ai2089240-result-20261109.html#L416), [배포394행](sources/qa-ai2089240-result-20261109.html#L394). |
| 이미지 자산 | 모델의 본문 자산은/2089240/2088872/asset/twin-1.png, Q/A는 같은 새 문항/상세 경로의2089240_Q.png·2089240_A.png입니다. | 원문 경로를 참조하던 COPY의 이미지와 구분됩니다. 경로·수집된 파일은 확인했으며 서버의 물리 자산 생성/복사 구현은 미확인입니다. [모델 자산213행](sources/qa-ai2089240-result-20261109.html#L213), [Q/A249행](sources/qa-ai2089240-result-20261109.html#L249), [COPY 이미지 관찰](evidence/2179-own-created-twin2089239-observation.json#L53). |

수집 기록상 Q는492×371·32708B, A는492×422·9613B이고 두 파일 모두 수집 당시 HTTP200입니다. 부모 연구자는 실제 Q/A 이미지를 직접 검토했으며, 이 정적 갱신은 저장 파일 두 개의 바이트 수와SHA256이 기록과 일치하는 것을 확인했습니다. 이 결과는 현재 원격 URL을 다시 조회한 검증이 아닙니다. [수집 크기·해시·검토 기록](qa-ai2089240-preview-assets-20261109.json#L1), [보존 Q](evidence/ai2089240-Q-original-preview.png), [보존 A](evidence/ai2089240-A-original-preview.png)

부모의 이미지 검토 기록은 그래프 점(5,4)·a=20과 정답⑤의 대응을 확인했습니다. 별도로 저장된 선택지를 정적으로 계산하면 각 x·y는20,20,20,20,-16이므로⑤만y=20/x에 맞지 않습니다. 이는 이 표본의 단순 검산이며 실제 OMR 채점 실행이나 모든 AI 문항의 수학적 정확성을 보증하지 않습니다. [직접 이미지 검토 범위](session-20261109-phase36.json#L11), [모델 선택지·해설·정답](sources/qa-ai2089240-result-20261109.html#L213), [저장 OMR/정답](sources/qa-ai2089240-result-20261109.html#L208)

phase35에는 새 PNG가 없으며 처리 중 버튼 경로의 근거는 DOM·관찰 결과·보존 HTML입니다. phase36에서는 Q/A **이미지 파일 자체**의 HTTP200·크기·해시 및 부모 연구자의 직접 이미지 검토가 기록됐지만 새 페이지 스크린샷은 없습니다. 따라서 AI 상세의 전체 세로/레이아웃 픽셀 검사까지 완료됐다고 주장하지 않습니다. 이 정적 갱신은 부모의 이미지 검토 기록을 인용하고 저장된 두 파일의 크기·SHA256 일치만 다시 확인했습니다. [phase35 한계](session-20261109-phase35.json#L1), [이미지 수집·검토 기록](qa-ai2089240-preview-assets-20261109.json#L1), [phase36 픽셀 범위](session-20261109-phase36.json#L11)

**남은 서버 정책과 다음 검증**

| 우선순위 | 아직 확정하지 않은 내용 | 다음 검증·현재 한계 근거 |
|---|---|---|
|P1 | AI 실패/취소·여러 결과·결과 문항의 실제 편집/채점·최종 승인·후속 작업중 버튼 복귀의 화면 동작. | 이번 요청의 단일 결과2089240과 서버 working=false는 완료 범위로 유지합니다. 다른 실패/부분 결과나 최종 Master 승인까지 확장하지 않습니다. [완료 상태](evidence/2225-own-qa-ai-background-server-progress.json#L53), [단일 AI 결과](evidence/2226-own-qa-ai-background-histories.json#L53), [결과R·저장OMR](evidence/2227-own-ai-child2089240-background-source.json#L53). |
|P1 | 서버의 중복 생성·미승인 생성·동시성/재시도 정책. | 현재 작업 중 버튼의 return과 htmx0은 확인했지만 서버 직접 반려 시험은 하지 않았습니다. [현재 클라이언트 분기](sources/qa-twin-ai-processing-20261109.html#L1172), [반려 의도 주석](sources/qa-twin-ai-processing-20261109.html#L1208), [관측 범위](evidence/2206-own-qa-ai-working-button-popover.json#L52). |
|P2 | 다른 그룹 합치기/이동·원래 그룹/대표/마지막 멤버 수명·물리 groupId 유지. | 활성으로 표시된 다른 그룹 후보는 누르지 않았고, 해제 뒤 원문의0과 재추가 뒤2만 확정했습니다. [다른 그룹 후보](evidence/2190-own-qa-twin-add-tab-populated.json#L53), [0개](evidence/2186-own-qa-clone-remove-independent-readback.json#L53), [2개](evidence/2196-own-qa-clone-add-independent-readback.json#L53). |
|P2 | 세트 COPY/AI·단일/세트 연결 호환성·폐기 시 그룹 처리. | 수동 연결 변경 대상은 원문/복제 단건 두 문항이었고, 후속 AI도 단건1개입니다. 세트 안내/한 요청의 다중 itemIds 렌더는 소스 분기입니다. [세트 안내](sources/qa-twin-ai-processing-20261109.html#L1133), [다중 이력 렌더](sources/qa-twin-ai-processing-20261109.html#L1139), [실제 단건3멤버](evidence/2226-own-qa-ai-background-histories.json#L53). |
|P2 | COPY의 모든 DB 필드·파일 복사/참조 구현·원문 변경/삭제의 복제 자산 영향. | 주요 표시/저장OMR과 원문 경로 이미지 로드만 확인했습니다. [관측 이미지/메타](evidence/2179-own-created-twin2089239-observation.json#L53), [재조회](evidence/2198-own-qa-pair-detail-server-readback.json#L53), [비교 한계](twin-copy-comparison-20261109.json#L1). |
|P2 | 검색 필터 전체 조합·빈결과·페이지 왕복·모달 수명과 역할별 접근. | 정확ID 한 행/기본10행과 일부 UI 상태만 실행했고, 나머지 선언/자료를 정상 완료로 확장하지 않습니다. [기본 목록](evidence/2190-own-qa-twin-add-tab-populated.json#L53), [정확ID](evidence/2192-own-qa-twin-search-exact-clone.json#L53), [탭/모달 코드](sources/qa-twin-add-candidates-20261109.html#L1237). |

전체 CMS 완료율과 전체 페이지/기능 총수는 이 문서에서 산정하지 않습니다. 서비스 최종 배포도 이 범위에서는 실행하지 않았습니다. cutoff2235의 전체 업무40회 중 HML666 등록·승인2회는 별도 문서 처리이며, 쌍둥이 관련 제출4회나 새 쌍둥이 문항2개와 같은 수치가 아닙니다. [쌍둥이 COPY/연결/AI 범위](session-20261109-phase33.json#L91), [해제·재추가](session-20261109-phase34.json#L12), [AI1회 접수](session-20261109-phase35.json#L10), [전체40회·HML2회·AI 후속 완료](session-20261109-phase36.json#L12)
