# Definition 다중문항 혼합 검수 사전점검

작성일은2026-11-10입니다. 이 문서는 기존661의 단건 검수/승인 근거와 보존 소스를 바탕으로, **새 다중JSON ZIP을 등록한 뒤 정상 UI로 S/F/D 혼합 검수를 수행하기 위한 사전 절차**를 정리합니다. 새 ZIP·새 문서·신규 결과를 검사하거나 생성하지 않았고 브라우저·네트워크·CMS API·원장·전역 파일·기존 보고서/맵을 조작하지 않았습니다. 새 문서ID·생성 수·파싱 순서·유형 변환·혼합 검수의 서버 결과는 아직 미확정입니다. [기존 등록 의도/실행](definition-qa-import-intent.json#L1), [기존 처리 결과](definition-qa-processing-review-20261109.md#L1), [초기 상태별 검토](definition-state-review-20261109.md#L1)

계획에 포함된 원본은430의ESSAY·529의FIVE_CHOICE·530의SHORT_ANSWER_ORDERED입니다. 이 작업에서는 그 새 조합 ZIP을 열거나 검토하지 않았습니다. 기존에 확정된 변환 대응은530 계열의 SHORT_ANSWER_ORDERED 입력이 QA661의 문항2089175에서 **SBMANM**으로 나타난 표본뿐입니다.430/529의 실제 CMS 유형은 부모의 후속 생성 문항 조회로 남깁니다. ZIP 안내의 “1개 파일=1문항”이나 기존 단건 결과만으로 새 ZIP의 생성 수를 예측하지 않습니다. [기존 입력/출력 대응](definition-qa-processing-review-20261109.md#L1), [실제 SBMANM 출력](sources/definition-qa-item2089175-detail-20261109.html#L425), [문항 검사 자료](sources/definition-qa-item2089175-detail-20261109.html#L1768), [등록 폼 안내](sources/definition-registration-form-current-20261109.html#L158)

**근거의 수준**

- **기존 실제 관찰**:661의 S/F/D 선택·가드/확인창·S 최종 승인과 P/R/M/Y 재조회입니다.1931의 정리된 관찰은 모달의 표시/숨김 완료를 기다렸으며 최종 승인/폐기를 제출하지 않았습니다. 앞선1911~1928의 겹친 모달 관찰은 정책 확정 근거에서 제외합니다. [정리된 가드 관찰](evidence/1931-definition661-clean-local-guards.json#L53), [후속 상태](evidence/1932-definition661-clean-guards-post-state.json#L53), [제외 범위](definition-qa-import-intent.json#L1)
- **소스에서만 확인한 범위**:다중ID 전개·W 분기·공통 평가지 조건·지문 렌더링 코드입니다. 이 코드가 있다는 사실만으로 새 다중/세트의 서버 결과를 확정하지 않습니다. [다중ID 전개](sources/definition661-draft-initial-20261109.html#L758), [W 검사](sources/definition661-draft-initial-20261109.html#L724), [지문 렌더링](sources/definition661-draft-initial-20261109.html#L837)
- 초기 상태 보고서의 “현재 목록에R/M이 없음”은 당시 목록 조건의 스냅샷입니다. 후속 QA661에서는 실제R/M/Y를 확인했으므로 그 문구를 기능 부재나 새 검수 불가의 근거로 사용하지 않습니다. [초기 검토](definition-state-review-20261109.md#L1), [실제R](evidence/1908-definition661-initial-state.json#L53), [실제M](evidence/1937-definition661-approval-fresh-state.json#L53), [실제Y](evidence/1943-definition661-approved-controls.json#L53)

**실제 필드와 셀렉터**

661의 초안R에는 검수 선택1개, 활성 비고, 하단 목록·폐기·승인 버튼이 있습니다. M/Y 소스에서는 검수 select와 승인/폐기 버튼이 없고 비고가disabled입니다. 새 문서에서 먼저 실제R 상태와 조작 가능 여부를 확인해야 합니다. [R 필드/버튼](sources/definition661-draft-initial-20261109.html#L439), [R 선택](sources/definition661-draft-initial-20261109.html#L484), [R 하단](sources/definition661-draft-initial-20261109.html#L518), [M 비고](sources/definition661-metadata-pending-20261109.html#L442), [Y 비고](sources/definition661-approved-20261109.html#L439)

| 대상 | 정확한 선택 기준 | 의미/경계 |
|---|---|---|
|검수 상태 | `select[data-exam-judge]` |각 select의 `data-block-no`와 `data-item-ids`를 함께 읽습니다.661은block1/2089175였습니다. |
|특정 단건의 select | `select[data-exam-judge][data-item-ids="<실제ID>"]` |ID가 하나일 때만 이 정확 일치를 사용합니다. 여러ID라면 각 dataset을 comma로 나눠 대상ID 포함 여부를 읽고 해당 select를 찾습니다. |
|비고 | `textarea[name="remark"]` |R 소스에서rows8·maxlength1000입니다. 승인에는 이 코드의 비고 필수 검사가 없고, 문서 폐기에는trim 공란 검사가 있습니다. |
|승인 진입 | `[data-exam-approve]` |하단 버튼입니다. 같은 “승인” 텍스트를 가진 모달 최종 버튼과 구분합니다. |
|승인 최종 제출 | `#examApproveModal [data-action-ok]` |확인창의 최종 승인입니다. 여기서 hidden 검수 필드를 만들고 실제 폼을 제출합니다. |
|승인 확인창 취소 | `#examApproveModal .modal-footer [data-bs-dismiss="modal"]` |이 취소는 최종 제출을 실행하지 않습니다. |
|문서 폐기 진입/최종 | `[data-exam-discard]` / `#examDiscardModal [data-action-ok]` |문항 일부의D 선택과 다른 전체 문서 폐기 경로입니다. |
|모두D 경고 닫기 | `#examAllDeleteModal [data-alert-ok]` |경고 닫기만 수행합니다. |
|W 경고 닫기 | `#examUnjudgedModal [data-alert-ok]` |모달이 숨겨진 뒤 첫W select로 스크롤/포커스합니다. |
|폐기 사유 경고 닫기 | `#examDiscardReasonModal [data-alert-ok]` |모달이 숨겨진 뒤 비고로 스크롤/포커스합니다. |
|실제 문서ID | R의 `#examApproveForm input[name="examDocumentId"]` 및 URL/기본 정보 |새로 생긴 실제ID를 서로 대조합니다. 기존661을 새 작업 대상으로 사용하지 않습니다. |

셀렉터는 보존 DOM과 핸들러에 근거합니다. 새 카드의 실제ID·블록순서·묶음은 등록 후 다시 읽어야 하며, 첫째/둘째/셋째 카드에 원본430/529/530이 순서대로 대응한다고 가정하지 않습니다. [속성과 옵션](sources/definition661-draft-initial-20261109.html#L484), [버튼과 승인 폼](sources/definition661-draft-initial-20261109.html#L518), [모달](sources/definition661-draft-initial-20261109.html#L531), [전체 문서 폐기](sources/definition661-draft-initial-20261109.html#L605), [가드/포커스](sources/definition661-draft-initial-20261109.html#L714), [폐기 사유/포커스](sources/definition661-draft-initial-20261109.html#L790)

**검수 코드와 클라이언트 검사 순서**

| 값 |표시 |기존 관찰/소스와 해석 |
|---|---|---|
|W |등록대기 |option이disabled입니다. 정상 UI로W를 새로 선택하는 레시피는 만들지 않습니다. 서버가W를 렌더한 경우의 승인 차단 코드는 있습니다. |
|S |등록성공 |661의 초기 선택값이며 기존 실제 최종 승인1935는S 하나였습니다. |
|F |등록실패 |실제 선택 가능했고1931에서 승인 확인창까지 열린 뒤 취소했습니다. 새 혼합F의 최종 처리/추천 여부는 미검증입니다. |
|D |삭제 |실제 선택 가능합니다.661의 단건을D로 둔 경우는 곧 모두D이므로 승인 차단 안내가 실제 열렸습니다. |

이 값들은 `loadFlags`로 제출하는 문항 처리 판정입니다. 문서R/M/Y, 개별 Master 문항의R/Y/N/F 상태와 구분합니다. [S/F/D/W 옵션](sources/definition661-draft-initial-20261109.html#L484), [기존 F/모두D 가드](evidence/1931-definition661-clean-local-guards.json#L53), [실제 S 최종 제출](evidence/1935-definition661-final-approval-submit.json#L52)

승인 진입 버튼은 다음 순서로 동작합니다.

1. 모든 검수 select 중값이W인 항목을 찾습니다. 있으면 `#examUnjudgedModal`에 블록번호를 나열해 “미검수입니다”를 표시하고 반환합니다. 확인창이 닫힌 뒤 첫W에 스크롤/포커스합니다. W 가드는 소스 분기이며,661에서 W를 강제로 만들어 실행한 결과로 기록하지 않습니다. [W 분기](sources/definition661-draft-initial-20261109.html#L724), [W 안내/닫기](sources/definition661-draft-initial-20261109.html#L550), [스크롤 처리](sources/definition661-draft-initial-20261109.html#L714)
2. select가 하나 이상이고 모두D이면 `#examAllDeleteModal`을 열고 반환합니다. 안내는 “모든 문항을 삭제로 선택해 승인할 수 없습니다”입니다. 이 분기에는 특정 필드로의 스크롤 대상을 잡지 않습니다.661에서 실제로 확인된 차단입니다. [모두D 검사](sources/definition661-draft-initial-20261109.html#L733), [실제 관찰](evidence/1931-definition661-clean-local-guards.json#L53)
3. `[data-paper-reg]` 컨테이너가 존재하는 경우에만 `paperRegYn` 선택을 검사합니다.661의 Definition에는 실제 컨테이너/입력란이 없어서 이 조건은 적용되지 않습니다. [선택적 검사](sources/definition661-draft-initial-20261109.html#L738), [실제 paperReg=null](evidence/1932-definition661-clean-guards-post-state.json#L53)
4. 앞선 차단이 없으면 `#examApproveModal`을 엽니다. 안내는 “AI 메타 추천이 시작되며 되돌릴 수 없습니다”입니다. 최종 버튼을 누르기 전까지는 승인 요청이 아닙니다. [확인창 진입](sources/definition661-draft-initial-20261109.html#L743), [안내](sources/definition661-draft-initial-20261109.html#L539), [실제 확인창](evidence/1933-definition661-final-approval-open.json#L52)

조사한 승인 핸들러에는 “S가 최소1개여야 함”이나 “F가 있으면 차단”이라는 조건, 개별 Master의 필수메타/OMR 검사, 비고 필수 검사가 없습니다. 별도의F 경고 문구도 이661 초안에서 찾지 못했습니다. **F의 클라이언트 허용 근거는 선택지·F 단건의 실제 일반 승인 확인창이며, F의 서버 최종 수용이나 추천/문항 상태까지 확인한 것은 아닙니다.** [승인 전체 가드](sources/definition661-draft-initial-20261109.html#L724), [F 실제 확인창/취소](evidence/1931-definition661-clean-local-guards.json#L53)

**승인 payload와 세트 전개**

승인 폼 경로는 **POST `/item/difi/approve.donga`**입니다. 폼은 `examDocumentId`를 갖고, 비고를 `hx-include`로 포함합니다. 최종 승인 버튼은 기존 `[data-judge-fields]`를 비운 다음, DOM의 select 순서대로 `data-item-ids.split(',')`를 순회합니다. 각ID마다 `itemIds`와 그 select 값인 `loadFlags`를 한 쌍씩append한 후 `form.requestSubmit()`을 호출합니다. 선택 변경만으로 이 요청을 보내지는 않습니다. [폼 선언](sources/definition661-draft-initial-20261109.html#L526), [변경 이벤트](sources/definition661-draft-initial-20261109.html#L708), [최종 필드 생성/제출](sources/definition661-draft-initial-20261109.html#L746)

세 독립 select가 실제로A/B/C라는 단일ID를 각각 포함하고S/F/D로 선택됐다면 **폼 필드의 예상 형태**는 아래와 같습니다. 이는 새 문서의 실제 요청 캡처가 아니라 코드에서 도출한 예시입니다.

```text
examDocumentId = <새 문서에서 확인한 실제 ID>
remark = <부모가 검토한 QA 비고>
itemIds = [A, B, C]
loadFlags = [S, F, D]
```

하나의 select가 `data-item-ids="A,B"`인 묶음이라면 해당 판정은A/B 모두에 반복됩니다. 따라서 select 수·문항 수·payload 쌍 수가 같다고 단정하면 안 됩니다. 이 코드는 comma 다중ID 전개를 지원하지만,661의 실제 초안은 단일ID 하나였고 새 ZIP의 그룹 구성은 아직 확인하지 않았습니다. 코드에는 여기서ID를deduplicate하거나 별도의지문ID 필드를 만드는 처리도 보이지 않습니다. [실제661 속성](sources/definition661-draft-initial-20261109.html#L484), [다중ID 전개](sources/definition661-draft-initial-20261109.html#L758)

세트/지문 **표시 코드**는 존재합니다. `.qv-passage` 노드를 찾아 `content.passageHtml`을 지문 뷰어에 전달하는 초기화가 있습니다. 하지만661 R/M/Y의 실제 HTML에는 해당 지문 노드가 없고 단건카드 하나만 있었습니다. 렌더링 초기화와 다중ID 전개 코드가 있다는 사실을 새 Definition ZIP의 서버 세트 인식/그룹 카드 생성 성공으로 올리지 않습니다. 새 다중JSON 세 문항도 실제 세트인지 독립 단건인지 먼저 확인해야 합니다. [지문 렌더 함수](sources/definition661-draft-initial-20261109.html#L837), [지문 노드 초기화](sources/definition661-draft-initial-20261109.html#L852), [실제661 단건](sources/definition661-draft-initial-20261109.html#L467)

**Definition의 paperReg와 HML의 구분**

661 R·M·Y 소스에서 실제 `name="paperRegYn"` 입력과 `[data-paper-reg]` 컨테이너는 모두0개였습니다. 실제 UI 관찰1932/1934도 `paperReg=null`입니다. 따라서 이 소스 범위의 Definition에는 HML에서 보던 평가지 등록여부 선택 절차를 넣지 않습니다. [실제 필드 관찰](evidence/1932-definition661-clean-guards-post-state.json#L53), [최종 승인 직전 관찰](evidence/1934-definition661-final-approval-before.json#L53)

다만 승인 폼의 `hx-include` 문자열에는 `[name='paperRegYn']`가 남아 있고, R HTML에는 공통 `#examPaperRegModal` 템플릿도 존재합니다. 코드 주석에는 “모달도 없다”고 적혀 있지만 실제 저장 HTML의 숨김 모달 존재와 구분해야 합니다. 실제입력 부재 때문에 적용되지 않는 조건을, 문자열/공통 모달이 보인다는 이유로 필수 UI라고 판단하지 않습니다. 모든 Definition 문서에서 자동 평가지 생성이 절대 없다는 서버 전역 정책도 이 근거로 확정하지 않습니다. [공통 include](sources/definition661-draft-initial-20261109.html#L526), [숨김 공통 안내 모달](sources/definition661-draft-initial-20261109.html#L586), [주석/컨테이너 검사](sources/definition661-draft-initial-20261109.html#L721)

**일부D 승인과 전체 문서 폐기**

일부 문항을D로 둔 혼합 승인은 `approve.donga`의 `itemIds/loadFlags` 경로입니다. 하단 “폐기”는 **POST `/item/difi/discard.donga`**라는 별도 경로이며, `examDocumentId`와 `remark`를 포함합니다. 이 폐기 폼에는 검수 `itemIds/loadFlags`를 만드는 코드가 없습니다. [승인 폼](sources/definition661-draft-initial-20261109.html#L526), [폐기 폼](sources/definition661-draft-initial-20261109.html#L605)

폐기 진입은 비고의 `trim()`이 비어 있으면 사유 안내 모달을 열고 반환합니다. 닫힌 뒤 비고로 이동합니다. 비고가 있으면 “모든 문항이 삭제 처리되며 되돌릴 수 없습니다”라는 최종 폐기 확인창을 열고, 그 안의 최종 버튼에서 폼을 제출합니다. trim은 사유 유무의 검사이며 textarea 값을trim한 문자열로 치환해 보내는 코드는 아닙니다.661에서 빈 사유 차단과 사유 입력 후 확인창 열기/취소는 실제 관찰됐지만, 그 문서의 폐기 최종 제출은 수행하지 않았습니다. [사유 검사/포커스](sources/definition661-draft-initial-20261109.html#L790), [최종 폐기 제출](sources/definition661-draft-initial-20261109.html#L803), [실제 가드와 취소](evidence/1931-definition661-clean-local-guards.json#L53)

새 혼합 검수 시나리오의 모두D 차단을 시험한다고 전체 문서의 최종 폐기를 눌러서는 안 됩니다. 두 경로의 목적과 제출 폼이 다릅니다. 새 문서에서 일부D의 실제 삭제/카드 보존/개별 Master 접근/물리DB 처리는 후속 조회로 확인해야 하며, 여기서 예상 결과를 확정하지 않습니다. [경로별 소스](sources/definition661-draft-initial-20261109.html#L724), [폐기 경로](sources/definition661-draft-initial-20261109.html#L790)

**정상 UI 실행을 위한 관찰 레시피**

| 순서 | 수행·기록할 내용 | 판정 경계 |
|---|---|---|
|1. 새 등록 결과 식별 |부모가 새 ZIP을 검토·등록한 뒤 목록에서 실제 파일명/표식·문서ID·상태를 확인합니다. 같은 문서ID 상세의 모든 블록과 실제 스크롤 하단까지 읽습니다. |세 JSON→세 카드/세 itemId·원본 파일순서·유형 매핑을 미리 가정하지 않습니다. 기존661의 P→R는 대조 표본입니다. |
|2. 묶음/유형 표 작성 |각 `data-block-no`, `data-item-ids`, 표시 본문/원본표식, 기본S/F/W/D, 개별 Master 유형을 대응시킵니다. |새430/529의 CMS 유형은 이 단계의 실제 결과로 확정합니다. 기존530→SBMANM만 앞선 표본으로 유지합니다. |
|3. 로컬 가드 확인 |정상 select로 모두D를 선택하고 승인 진입을 눌러 경고를 확인할 수 있습니다. 최종 제출은 없으며 경고를 닫은 뒤 부모가 정한S/F/D 조합으로 되돌립니다. |W는disabled이므로 강제DOM 조작으로 만들지 않습니다. 자연스러운W가 있으면 해당 분기의 실제 상태를 별도로 기록합니다. |
|4. 혼합 조합 검토 |원본/표식과 실제ID 대응을 기준으로 선택한S/F/D를 읽고, 비고를 확인합니다. DOM select별 값과 전개될ID 쌍 수를 기록합니다. |어느 원본에 어떤 판정을 줄지는 새 결과 확인 후 결정합니다. 단순한nth 순서로 묶지 않습니다. |
|5. 승인 확인창 |하단 `[data-exam-approve]`로 열고 `shown.bs.modal` 완료 뒤 정확히 `#examApproveModal`의 안내와 버튼을 확인합니다. |취소 시험은footer의취소를 누르고 `hidden.bs.modal` 완료를 기다립니다. 모달 전환 중 다른 케이스를 겹치지 않습니다. |
|6. 최종 승인1회 |부모가 검토한 조합으로 `#examApproveModal [data-action-ok]`를 한 번 누르고 실제요청/후속상태를 기록합니다. |hidden 검수 필드는 이 클릭 때 재생성됩니다. 관찰실패/timeout만으로 재승인하지 말고 같은ID를 먼저 재조회합니다. |
|7. M→Y 관찰 |같은 문서ID/파일표식으로 신선한 상세/목록을 다시 읽어 메타추천중 문구·잠긴 비고·문항구성, 이후 승인Y를 기록합니다. |M을 못 포착했다면 “M 미포착”입니다. 보지 않은 상태·소요시간·추천 성공을 추정하거나 최종승인을 반복하지 않습니다. |
|8. 자식별 후속 대조 |각S/F/D 대상의 문서 카드·loadFlag 표시·개별 Master 접근/상태/유형·메타·저장OMR·이미지·연결 관계를 대조합니다. |F의추천여부·D의실제처리·세트묶음·모든메타완성·물리삭제는 서버 후속값을 보기 전까지 미검증입니다. |

이 표는 후속 실행 레시피이며 이번 작업에서 수행한 새 테스트가 아닙니다. 등록 또는 승인 결과가 불명확하면 같은 파일/문서ID를 먼저 대조하고 재제출을 피한다는 기존 의도 규칙을 따릅니다. [기존 단발 제출/재조회 규칙](definition-qa-import-intent.json#L1), [깨끗한 모달 관찰 방식](evidence/1931-definition661-clean-local-guards.json#L53)

**자동 메타추천 M→Y의 기준**

기존661은 S 최종 승인1935 뒤1937에서M,1941/1943에서Y를 확인했습니다. 승인 핸들러는 응답 `HX-Trigger.examApproved`를 받으면 “승인 되었습니다” 토스트를 보관하고 새로고침합니다. 이 토스트 자체를 최종Y로 판정하지 않습니다. M 화면은 “AI 메타 추천 중입니다 / 완료되면 자동으로 승인 처리됩니다”라고 안내하며, Y에서는 해당 지연 안내가 사라지고 비고와 검수 UI가 잠긴 결과를 읽었습니다. [실제S 제출](evidence/1935-definition661-final-approval-submit.json#L52), [승인 응답 처리](sources/definition661-draft-initial-20261109.html#L768), [M 실제 조회](evidence/1937-definition661-approval-fresh-state.json#L53), [M 소스](sources/definition661-metadata-pending-20261109.html#L362), [M 안내](sources/definition661-metadata-pending-20261109.html#L370), [Y 실제 조회](evidence/1943-definition661-approved-controls.json#L53), [Y 소스](sources/definition661-approved-20261109.html#L362)

문서Y 뒤에도 기존 생성 문항2089175는MasterR이며 일부메타·저장OMR이 비어 있었습니다. 따라서 M→Y는 문서 처리 상태의 관찰이고 모든 메타 추천 완성·문항 승인·배포 완료의 보장이 아닙니다. 새 혼합S/F/D의 상태전이, 추천 대상/실패 처리, 선택삭제 반영은 새 결과로 별도 확정해야 합니다. [개별R/메타/OMR 자료](sources/definition-qa-item2089175-detail-20261109.html#L552), [실제 메타·이미지](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [실제 OMR누락 경고](evidence/1954-qa-item2089175-empty-omr-notice.json#L52), [기존 해석 한계](definition-qa-processing-review-20261109.md#L1)

**아직 확정하지 않은 결과**

새 문서ID·생성 문항수/순서·430/529 유형매핑·3문항 S/F/D 최종 수락·F 추천/문항상태·일부D의접근/삭제 결과·Definition세트 그룹 생성·새메타충족/OMR 생성·서버검증/권한·DB 물리처리·Service배포는 후속 검증 범위입니다. 이 보고서는 코드와 기존 단건 실행을 통한 사전점검이며 새 ZIP의 부모 검토나 실제 서버 결과를 대체하지 않습니다. [기존 서버/세트/매핑 한계](definition-qa-processing-review-20261109.md#L1), [기존 소스 범위](definition-state-review-20261109.md#L1)
