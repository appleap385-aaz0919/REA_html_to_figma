# 평가지 1094의 실제 브라우저 포인터 드래그와 로컬 변경 취소

2026-11-10 phase70의 근거 3259~3294를 검토했습니다. 평가지 1094의 수정 화면에서 단건을 세트 앞쪽으로 실제 드래그했고, 브라우저가 생성한 `isTrusted=true` 이벤트 9개와 Sortable 이벤트 4개를 확인했습니다. 결과는 단건 2089238 → 세트 2089242~2089245이며 세트 내부 순서도 유지됐습니다. 이후 정상 취소 절차로 나가자 현재본 1094(1177)·단건 2089238이 그대로 남았습니다. 이번 구간의 CMS 저장은 0회이며 Master 업무 누계는 91회, Service 배포는 0회입니다. [phase70](session-20261110-phase70.json#L1), [실험 의도와 정리 상태](paper1094-pointer-drag-local-intent-20261110.json#L1), [최종 비교](paper1094-native-pointer-drag-comparison-20261110.json#L1)

이 문서는 로컬 기록을 분석한 결과입니다. 이번 보고서 작성 중에는 브라우저·네트워크·CMS를 조작하지 않았으며, 전역 인덱스와 기존 보고서를 변경하지 않았습니다.

**범위와 실제 구성 변화**

아래의 짧은 238·242~245는 각각 2089238·2089242~2089245를 뜻합니다.

| 시점 | 수정 폼 또는 현재본의 구성 | 확인 수준 |
|---|---|---|
| 시작 | 현재본 1094(1177), 단건 238 하나 | 상세 읽기 결과를 보존했습니다. |
| 문항 추가 후 | 로컬 세트 242/243/244/245 → 단건 238 | 두 그룹·5문항이며 아직 저장하지 않았습니다. |
| 실제 드래그 후 | 로컬 단건 238 → 세트 242/243/244/245 | 이벤트·DOM 순서·표시 번호 1~5를 확인했습니다. |
| 저장 없이 이동 후 | 현재본 1094(1177), 단건 238 하나 | 상세 읽기 결과 전체가 시작 전과 정확히 같습니다. |

시작 현재본의 제목은 `QA-HML-20261109-02-SET4-SINGLE1`, 상태는 초안, 페이지는 1~1, 용도는 공통이었습니다. 3267은 ID 2089242·지문 2089241·후보 1개·선택 가능 여부를 검사한 후 체크를 클릭한 기록입니다. 3268은 정상 추가 버튼을 눌렀고, 3269는 지문 2089241의 네 자식과 단건이 두 그룹으로 표시된 것을 보여 줍니다. 이 추가는 수정 폼의 구성을 바꾸었으며 평가지 현재본 저장과는 구분됩니다. [시작 상세](evidence/3261-own-paper1094-pointer-test-current-baseline.json#L53), [후보 선택](evidence/3267-own-paper1094-pointer-test-select-set242.json#L1), [로컬 추가](evidence/3268-own-paper1094-pointer-test-add-set-local.json#L52), [두 그룹의 수정 폼](evidence/3269-own-paper1094-pointer-test-two-groups-form.json#L53)

**소스의 그룹 정렬 선언과 이번 실제 제스처**

드래그 후 보존한 수정 HTML은 `new Sortable(table, { draggable: 'tbody[data-sort-group]', handle: '[data-sort-handle]', animation: 150, ghostClass: 'opacity-50', onEnd: refresh })`를 선언합니다. `refresh`는 전체 `[data-seq]`를 1부터 다시 매기고 문항 수를 갱신합니다. 따라서 정적 선언상 드래그 대상은 문항 행 하나가 아니라 세트를 포함한 tbody 그룹입니다. 실제로도 이번 세트의 네 자식은 한 그룹으로 남았습니다. 아래 HTML 행 번호는 근거 JSON의 `action.data.result.html`을 LF로 나눈 위치이며 JSON 파일 자체의 행 번호와는 다릅니다. [정렬·갱신 소스: HTML 861~872·928~934행](evidence/3288-own-paper1094-real-pointer-reordered-source.json#L53), [실제 그룹 결과](evidence/3287-own-paper1094-scoped-drag-order-and-events.json#L52)

3285에서 정확한 평가지·5개 ID·열린 모달 없음·Sortable 인스턴스를 검사하고 이벤트 수집기를 설치했습니다. 3286의 실제 명령은 다음 손잡이에서 첫 세트의 순서 셀까지 브라우저 포인터 드래그를 수행했습니다. 이번 정렬에는 공개 `Sortable.sort()` 호출, `onEnd` 직접 호출 또는 연구 코드의 직접 DOM 재배치를 사용하지 않았습니다. 라이브러리가 드래그를 처리하면서 정렬과 후속 이벤트를 발생시켰습니다. [수집기와 사전 검사](evidence/3285-own-paper1094-scoped-drag-events-readiness.json#L1), [실제 drag 명령과 성공 응답](evidence/3286-own-paper1094-scoped-browser-pointer-drag.json#L1), [제스처·API 사용 구분](session-20261110-phase70.json#L1)

- 출발 손잡이: `#paperItemTable>tbody:last-of-type [data-sort-handle]`
- 도착 위치: `#paperItemTable>tbody:first-of-type tr:first-child [data-seq]`

3287에서 수집한 13개 이벤트는 다음과 같습니다. `start/update/sort/end`의 `isTrusted=false`는 Sortable이 생성한 이벤트라는 구분이며, 그 앞뒤에 기록된 브라우저 포인터·드래그 이벤트의 신뢰 여부와 혼동하지 않습니다. [이벤트 원문](evidence/3287-own-paper1094-scoped-drag-order-and-events.json#L52)

| 구분 | 기록된 이벤트 | 수·주요 값 |
|---|---|---|
| 브라우저 이벤트 | pointerdown, mousedown, dragstart, dragover ×4, drop, dragend | 9개 모두 `isTrusted=true`입니다. |
| Sortable 이벤트 | start, update, sort, end | 4개 모두 `isTrusted=false`입니다. update/sort/end는 `oldIndex=2, newIndex=1`입니다. |
| 최종 행·그룹 | [238] → [242,243,244,245] | 표시 번호는 1,2,3,4,5이고 두 번째 그룹의 passageId는 2089241입니다. |

이 근거는 브라우저 입력을 통한 실제 드래그 처리를 증명합니다. 운영체제의 물리 마우스를 직접 제어했다는 뜻은 아니며, 터치·키보드 정렬·세트 내부 자식 재정렬까지 검증한 것도 아닙니다. [드래그 명령](evidence/3286-own-paper1094-scoped-browser-pointer-drag.json#L1), [실제 이벤트·그룹](evidence/3287-own-paper1094-scoped-drag-order-and-events.json#L52)

**표시 상태와 입력 전 guard 거절**

3270과 3280의 연구용 guard는 `document.visibilityState !== 'visible'`, 포커스 없음, 열린 모달, ID 순서 불일치 또는 Sortable 부재를 한 조건문으로 검사했습니다. 해당 조건문은 이벤트 수집기 설치보다 앞에 있고 실제 포인터 명령도 뒤에 있으므로 두 예외는 입력 전 거절입니다. CMS가 드래그 입력을 받아 실패한 사례로 세지 않습니다. 3278의 별도 관찰은 hidden·focused=false였지만 ID 순서와 Sortable은 준비된 상태임을 보여 줍니다. 한꺼번에 검사한 모든 조건의 원인을 예외 문구 하나로 확정하지 않습니다. [첫 guard 거절](evidence/3270-own-paper1094-pointer-test-geometry-events-before.json#L1), [당시 상태 관찰](evidence/3278-own-paper1094-pointer-preflight-gate-observation.json#L52), [두 번째 guard 거절](evidence/3280-own-paper1094-pointer-test-geometry-events-before.json#L1)

그 뒤 범위를 평가지·구성·모달 상태로 제한한 3285와 실제 드래그 후 3287은 모두 `visibility='hidden'`, `focused=true`였습니다. 이 상태에서 드래그와 순서 변경이 성공했으므로 visible을 이 기능의 절대 전제나 제품 정책으로 쓰면 안 됩니다. 반대로 hidden 상태의 모든 브라우저·모든 입력에서 성공한다는 보장도 아닙니다. 이전 조사 제안의 visible/focused 조건은 사전 주의사항이었으며 이번 실행으로 그중 visible의 필수성은 성립하지 않음을 확인했습니다. [입력 직전 상태](evidence/3285-own-paper1094-scoped-drag-events-readiness.json#L52), [입력 직후 성공 상태](evidence/3287-own-paper1094-scoped-drag-order-and-events.json#L52), [이전 조사 제안](remaining-actionable-investigation-20261110-phase69.md)

**검색 결과 전환과 실패 분류**

3264에서 ID 2089242 검색을 클릭했지만 3265에는 검색 결과 10건이 남아 있었고, 3266의 ‘정확한 후보 1개 준비’ 대기는 시간 내 조건을 확인하지 못했습니다. 3266은 준비 확인의 예외이며 그 명령 자체는 선택이나 추가를 실행하지 않았습니다. 이후 3267의 정확한 단일 후보 guard는 통과했습니다. 3275의 별도 재관찰에서도 입력값은 ID 검색 2089242인데 결과는 10건이고 모달 전환은 끝난 상태였습니다. 이 전환의 원인은 기록만으로 확정할 수 없습니다. [초기 검색](evidence/3264-own-paper1094-pointer-test-set242-search.json#L1), [10건 표시](evidence/3265-own-paper1094-pointer-test-set242-candidate.json#L52), [준비 확인 시간초과](evidence/3266-own-paper1094-pointer-test-filtered-result-ready.json#L1), [단일 후보 선택 성공](evidence/3267-own-paper1094-pointer-test-select-set242.json#L1), [재관찰](evidence/3275-own-paper1094-pointer-filter-current-reobserve.json#L52)

안정된 열린 모달에서 정상 검색 버튼을 다시 누른 3276과 후속 3277에는 `beforeRequest`의 keyword=2089242·keywordType=itemId, `afterRequest`의 HTTP 200·successful=true, 결과 1건·후보 2089242가 함께 기록돼 있습니다. 따라서 10건이 남은 관찰·준비 대기 실패와 이 정상 검색 성공을 각각 보존합니다. 초기 현상을 확정된 CMS 검색 결함이나 서버 오류로 분류하지 않습니다. [정상 검색 클릭](evidence/3276-own-paper1094-pointer-filter-stable-normal-search.json#L52), [HTTP 200과 후보 1개](evidence/3277-own-paper1094-pointer-filter-response-result.json#L52)

**취소와 현재본 보존**

3289는 정확한 로컬 순서 238→242~245를 검사한 후 수정 화면의 취소 링크를 눌러 `shown.bs.modal`까지 기다렸습니다. 3290은 ‘평가지 수정 취소 / 저장하지 않고 이동하시겠습니까?’ 문구, shown=true·transitioning=false를 확인했습니다. 3291은 이 안정된 모달의 ‘저장 하지 않고 이동’을 정상 클릭했으며 CMS 저장을 실행하지 않았습니다. [취소 열기](evidence/3289-own-paper1094-real-pointer-cancel-open.json#L1), [안정된 취소 확인창](evidence/3290-own-paper1094-real-pointer-cancel-prompt-read.json#L52), [저장 없이 이동](evidence/3291-own-paper1094-real-pointer-leave-without-save.json#L52)

시작 3261과 복귀 후 3292의 `action.data.result` 전체를 비교한 결과가 정확히 같습니다. URL·표시 필드·액션·문항 순서와 서비스 표가 모두 비교에 포함됩니다. 현재 상세는 1177이고 구성은 2089238 하나입니다. 3294는 상세 화면으로 복귀했고 열린 모달이 없으며 수정 폼도 없음을 확인합니다. 이 결과는 관찰한 현재본과 화면 데이터의 보존이며, 모든 내부 DB 행이나 로그가 바이트 단위로 같다는 주장은 아닙니다. [시작 결과](evidence/3261-own-paper1094-pointer-test-current-baseline.json#L53), [복귀 후 결과](evidence/3292-own-paper1094-real-pointer-original-current-readback.json#L53), [전체 읽기 결과 대조](paper1094-native-pointer-drag-comparison-20261110.json#L1), [마지막 안전 상태](evidence/3294-own-paper1094-real-pointer-final-safe-state.json#L52)

**phase64와 구분되는 확인 범위**

phase64는 공개 Sortable API와 등록된 onEnd 콜백으로 순서를 바꾼 후 정상 저장해 5문항 순서가 상세 1176과 재수정 폼에 유지되는 것을 확인했고, 다시 저장해 현재본 1177·단건 238로 복구했습니다. phase70은 브라우저 포인터 제스처·손잡이·그룹 이동·로컬 번호 갱신을 실제로 확인한 뒤 저장 없이 취소했습니다. 두 구간을 합쳐 ‘정렬된 순서의 저장’과 ‘실제 드래그 입력’의 근거를 각각 갖지만, 이번 드래그 결과를 새로 저장한 것은 아닙니다. [phase64 보고서](paper1094-manual-set-membership-and-order-policy-20261110.md), [API 정렬](evidence/3025-own-paper1094-sort-single-before-set.json#L53), [그때의 저장](evidence/3027-own-paper1094-save-added-set-once.json#L53), [그때의 재수정 확인](evidence/3032-own-paper1094-five-reloaded-form.json#L53), [이번 구간의 저장 0회](session-20261110-phase70.json#L1)

phase70에는 새 PNG가 없습니다. 이벤트·DOM·보존 HTML과 정상 상세 재조회로 기능 결과를 확인한 범위이며, 새 전체 세로 픽셀 검토나 드래그 중 시각 효과 검토를 주장하지 않습니다. 다른 역할·브라우저·모바일·다중 세트·동시 수정·Service 수신도 이번 범위에 포함되지 않습니다. 최종 상태는 평가지 1094(1177)·단건 2089238이며 이번 로컬 변경을 정리하기 위한 추가 저장은 필요하지 않습니다. [근거 한계와 현재 상태](session-20261110-phase70.json#L1), [비교·PNG 범위](paper1094-native-pointer-drag-comparison-20261110.json#L1), [최종 상태](evidence/3294-own-paper1094-real-pointer-final-safe-state.json#L52)
