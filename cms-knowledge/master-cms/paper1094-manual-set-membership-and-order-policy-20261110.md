# 평가지 1094의 수동 세트 추가·그룹 순서·제외와 복구

이 보고서는 2026-11-10의 로컬 근거 2997~3062와 평가지 1094 실험 의도·복구 비교 파일을 다룹니다. 승인된 원본 세트의 자식 2089242 하나를 선택하자 네 자식 2089242~2089245 전체가 추가됐습니다. 단건 2089238을 앞에 두도록 순서를 바꿔 한 번 저장한 뒤, 세트를 전체 제외하고 다시 한 번 저장해 기준 구성을 복구했습니다. 상세 번호는1102→1176→1177이며 최종 문항은2089238 하나입니다. Master 업무 누계 82회에는 추가 저장·복구 저장 각 1회만 포함하고 Service 배포는 없습니다. 이 정적 작업은 로컬 자료를 읽어 이 보고서만 작성했으며 coverage·전역 인덱스·브라우저·네트워크를 변경하지 않았습니다. [의도와 최종 정리](paper1094-manual-set-membership-intent-20261110.json#L1), [복구 비교](paper1094-manual-set-restoration-comparison-20261110.json#L1)

**기준과 두 번의 실제 저장**

| 시점 | 평가지 상세 | 문항 순서·그룹 | 영속 저장 여부 |
|---|---|---|---|
|기준 |1094(1102) |단건 2089238 |기존 현재본 |
|세트 추가 직후 |아직 기존 현재본 |로컬: 세트242/243/244/245 → 단건 238 |아직 저장하지 않음 |
|순서 변경 후 3027 저장 |1094(1176) |단건 238 → 세트242/243/244/245 |최종 저장1회 |
|단건 제외 시험·취소 |1094(1176) |로컬4문항을 취소한 뒤 다시5문항 |이 시험의 저장0회 |
|세트 전체 제외 후 3059 저장 |1094(1177) |단건 2089238 |복구 저장1회 |

표의 짧은242~245·238은 각각2089242~2089245·2089238을 뜻합니다. 제목은 `QA-HML-20261109-02-SET4-SINGLE1`, 상태 R, 페이지 1~1, 용도 C를 두 저장 모두 유지했습니다. 서비스 표의 두 대상은 미배포 표시를 유지합니다. 평가지 상세 버전과 문항 자체의 버전을 같은 값으로 취급하지 않습니다. [기준 상세](evidence/2999-own-paper1094-current-baseline.json#L53), [추가 저장](evidence/3027-own-paper1094-save-added-set-once.json#L53), [5문항 현재본](evidence/3028-own-paper1094-set-saved-detail.json#L53), [복구 저장](evidence/3059-own-paper1094-save-baseline-restore-once.json#L53), [최종 현재본](evidence/3060-own-paper1094-restored-current-detail.json#L53)

**추가 후보의 안내·한 문항 선택과 세트 확장**

‘문항 추가’ 안내는 사용·미사용 문항만 추가 가능, 세트 단위 추가, 같은 출처의 문항만 표시한다고 설명합니다. 출처는 `22-H-MA-C1-1-0-DCL-KI-2025`로 고정된다고 표시합니다. 부모 연구자는3019 PNG에서 이 안내를 직접 확인했습니다. 정적 HTML의 숨은 안내 템플릿에 문구가 있다는 사실과 실제 팝오버가 보였다는 근거를 구분합니다. [수정 화면의 안내 템플릿·팝오버 코드](evidence/3003-own-paper1094-modify-source.json#L53), [중복 검색·안내가 보인 시점](evidence/3019-own-paper1094-duplicate243-result.json#L52), [3019 PNG](evidence/3019-own-paper1094-duplicate243-result.png)

실제 검색 2089242는 passageId2089241·4문항·승인(사용)인 선택 가능한 후보1개였습니다. 3012의 선택값은 2089242 하나이고 ‘추가’가 활성화됐습니다. 추가 후에는 같은 passageId의242~245 네 자식이 한 그룹으로 생기고 기존238 앞에 삽입됐습니다. 이 표본은 Y 후보의 정상 추가를 증명합니다. N 후보의 실제 추가나 R/F/D·다른 출처의 서버 거절을 각각 실행한 것은 아닙니다. 기존 R문항 238이 현재 평가지에 남는 것과 신규 추가 후보의 Y/N 안내도 구분합니다. [실제 후보](evidence/3010-own-paper1094-set242-search-result.json#L52), [선택값 하나](evidence/3012-own-paper1094-select-set242.json#L52), [로컬 추가](evidence/3013-own-paper1094-add-selected-set-local.json#L52), [네 자식으로 확장된 그룹](evidence/3014-own-paper1094-set-expanded-form.json#L53)

3003의 `result.html`을 LF로 나눈 정적 소스에는 다음 동작이 있습니다. 기존 행 ID를 `includedItemIds`로 모으고, 선택된 체크의 `selectedItemIds`를 GET `/paper/item-add.donga`에 전달합니다. 응답을 표의 thead 바로 뒤에 삽입하는 `swap:'afterend'`이므로 새 그룹이 기존 그룹 앞에 놓입니다. 같은 검색 결과 안에 동일 passageId의 체크가 여럿 있으면 선택을 함께 맞추는 코드도 있습니다. 이번 검색은 후보 하나였고, 네 자식 확장은 실제 반환 후 DOM에서 확인한 결과입니다. 모든 서버의 세트 선택 알고리즘을 클라이언트 코드만으로 확정하지 않습니다. [정적 소스: result.html 658~692행](evidence/3003-own-paper1094-modify-source.json#L53), [확장 후 실제 HTML](evidence/3015-own-paper1094-set-expanded-source.json#L53)

추가 후 형제 2089243을 다시 검색했을 때 입력된 포함 ID는 이미242~245와238이었습니다. 결과에는 ‘이미 포함됨’이 보이고 선택 가능한 후보 체크는0개, 추가 버튼은 disabled였습니다. 실제 중복 추가 요청으로 서버의 중복 방어를 우회 시험하지 않았습니다. [포함 ID를 넣은 재검색](evidence/3018-own-paper1094-duplicate243-search.json#L52), [중복 선택 불가](evidence/3019-own-paper1094-duplicate243-result.json#L52)

**그룹 단위의 순서·제외**

세트는 `tbody[data-sort-group][data-passage-id="2089241"]` 한 묶음으로 렌더됐습니다. 세트 내 제외 버튼은1개이며 자식 네 행의 액션 수는[1,0,0,0]입니다. 실제 제외 확인창은 ‘지문 ID2089241 · 4문항’을 보여 줬습니다. 관찰된 UI에는 개별 자식 하나만 제외하는 별도 버튼이 없습니다. 이것을 직접 API의 부분 구성 허용/거절 정책으로 확대하지 않습니다. [그룹·자식 액션 수](evidence/3021-own-paper1094-remove-set-dialog-open.json#L52), [세트 제외 확인창](evidence/3022-own-paper1094-remove-set-dialog-read.json#L52), [이 확인창은 취소](evidence/3023-own-paper1094-remove-set-dialog-cancel.json#L52)

정적 Sortable 설정은 `draggable:'tbody[data-sort-group]'`, `handle:'[data-sort-handle]'`, `onEnd:refresh`입니다. 실제 Sortable 인스턴스의 공개 sort API와 등록된 onEnd 콜백을 사용해 단건 그룹을 앞에 두었습니다. 결과는238→242→243→244→245, 표시 순서는1~5이며 세트 내부 자식 순서는 유지됐습니다. 이번 실행은 포인터 드래그·손잡이 hit area·터치 동작을 검증하지 않았습니다. [정적 소스: result.html 797~803행](evidence/3003-own-paper1094-modify-source.json#L53), [공개 정렬 계약 확인](evidence/3024-own-paper1094-sort-contract.json#L52), [실제 API 정렬 방식과 결과](evidence/3025-own-paper1094-sort-single-before-set.json#L53), [저장 전5문항 폼](evidence/3026-own-paper1094-presave-five-members.json#L53)

refresh는 전체 행 번호와 문항 수를 다시 계산하며, 제외 버튼 수가1개 이하이면 제외를 disabled로 만듭니다. 따라서 이 UI의 마지막 제외 방지는 문항 행 수가 아니라 남은 그룹 수에 대응합니다. 추가/제외 후에는 현재 행 ID로 GET `/paper/item-summary.donga`를 호출해 단원·문제 구성·문항 수를 갱신하는 코드입니다. 이 로컬 표와 요약의 변경을 평가지 현재본 저장과 동일시하지 않습니다. [정적 소스: result.html 723~771행](evidence/3003-own-paper1094-modify-source.json#L53)

**5문항 저장·재진입·로컬 제외 취소**

3027은 정확한 평가지 1094·메타·5개 ID 순서를 검사한 뒤 정상 저장 버튼을 한 번 클릭한 근거입니다. 후속 상세는1176이고 다섯 문항의 순서를 유지했습니다. 재수정3032에서도 같은 두 그룹과 같은 순서가 복원됐습니다. 이 R 상태 저장은 실제 처리된 결과이며 저장 요청의 DB 행 수나 모든 상태의 버전 정책을 뜻하지 않습니다. [최종 추가 저장](evidence/3027-own-paper1094-save-added-set-once.json#L53), [저장 후1176](evidence/3028-own-paper1094-set-saved-detail.json#L53), [같은 순서로 재수정](evidence/3032-own-paper1094-five-reloaded-form.json#L53)

이후 단건 238만 제외 확인해 로컬로는4문항 세트 한 그룹이 남았습니다. 그룹에 네 자식이 있어도 마지막 제외 버튼은 disabled였습니다. 이때 독립 GET3037의 서버 현재본은 여전히5문항이었습니다. 수정 화면의 취소를 눌러 ‘저장하지 않고 이동’을 확인하자5문항 현재본으로 복귀했고, 이 과정의 serverSave=false를 확인했습니다. [단건의 로컬 제외](evidence/3035-own-paper1094-confirm-single-local-remove.json#L52), [마지막 한 세트의 제외 disabled](evidence/3036-own-paper1094-four-last-set-remove-disabled.json#L53), [독립 현재본은5문항](evidence/3037-own-paper1094-current-independent-and-cancel-controls.json#L52), [취소 경고](evidence/3039-own-paper1094-cancel-warning-read.json#L52), [저장 없이 이동](evidence/3040-own-paper1094-discard-only-local-removal.json#L52), [취소 후5문항 유지](evidence/3041-own-paper1094-five-restored-after-cancel.json#L53)

**복구 과정의 모달 전환과 도구 guard**

정리 단계에서 세트 전체를 제외해 로컬 폼을238 하나로 만들었습니다. 정적 제외 콜백은 모달 hide를 호출한 다음 즉시 pendingGroup을 제거하고 refresh/요약 갱신을 수행합니다. 이번 기록은 모달의 열기 전환 중 너무 빨리 확인한 도구 속도 조건에서 로컬 제외는 반영됐지만 hide가 무시돼 모달이 남은 경우입니다. 의도 파일도 이를 그 조건으로 분류합니다. 이 사례를 정상 사용자 조작의 CMS 저장 실패나 서버 오류로 기록하지 않습니다. [세트 전체의 로컬 제외](evidence/3045-own-paper1094-cleanup-set-remove-confirm.json#L52), [단건만 남은 폼](evidence/3046-own-paper1094-cleanup-single-form.json#L53), [정적 소스: result.html 759~765행](evidence/3003-own-paper1094-modify-source.json#L53), [전환 조건 기록](paper1094-manual-set-membership-intent-20261110.json#L1)

3047과3052의 action은 `Invalid or duplicate submit`이라는 **연구용 도구 guard** 예외로 끝났습니다. 해당 스크립트7행은 `.modal.show` 존재, form.checkValidity(), 중복 제출 플래그를 검사하고8행에서야 저장 버튼을 클릭합니다. 3051은 폼 유효=true·중복 플래그=false지만 removeGroupModal이 남아 있음을 보여 줍니다. 따라서 이 두 번호는 저장 클릭 전 차단이며 실패한 서버 저장2회나 중복 제출2회가 아닙니다. [첫 클릭 전 거절](evidence/3047-own-paper1094-save-baseline-restore-once.json#L1), [남은 모달·유효 폼·중복 false](evidence/3051-own-paper1094-cleanup-ready-after-transition.json#L52), [두 번째 클릭 전 거절](evidence/3052-own-paper1094-save-baseline-restore-once.json#L1), [guard 조건](sources/runtime/paper1094-restore-baseline-save-once.js#L7), [저장 클릭은 다음 행](sources/runtime/paper1094-restore-baseline-save-once.js#L8)

3056에서 모달이 stable shown이고 transitioning=false인 것을 확인한 뒤3057에서 정상 dismiss 버튼을 눌렀습니다. 3058은 visibleModals=[]·valid=true·중복 플래그=false입니다. 이 상태에서3059를 한 번 실행했고1177로 복구됐습니다. 저장 시도3회 중 하나가 성공했다고 표현하지 않고, 클릭 전 guard 거절2회와 실제 복구 저장1회를 분리합니다. [안정된 열린 모달](evidence/3056-own-paper1094-remove-modal-state.json#L52), [정상 dismiss](evidence/3057-own-paper1094-dismiss-remove-modal.json#L52), [모달 없는 제출 준비](evidence/3058-own-paper1094-cleanup-final-ready.json#L52), [실제 복구 저장 한 번](evidence/3059-own-paper1094-save-baseline-restore-once.json#L53), [최종1177](evidence/3060-own-paper1094-restored-current-detail.json#L53)

**일반 저장 코드와 실제로 확인한 경계**

보존된 수정 HTML의 폼은 `#paperModifyForm`, POST `/paper/update.donga`이며 `hx-validate=true`·needs-validation을 사용합니다. 현재 폼에서 평가지명은 필수/maxLength255, 페이지 시작·끝은 필수/min1, 용도는 필수였습니다. 소스의 저장 버튼은 폐기D이고 form.checkValidity()가 통과하면 별도 폐기 확인창을 열고, 그 밖은 form.requestSubmit()을 호출합니다. D에서는 페이지 required를 해제하는 분기도 있습니다. 이번 정상 저장은 R 유지였으므로 D 저장·빈값/범위 역전·모든 서버 필수 검증을 실행한 근거로 쓰지 않습니다. [실제 폼 제약](evidence/3002-own-paper1094-modify-baseline.json#L53), [정적 소스: result.html 147·774~795행](evidence/3003-own-paper1094-modify-source.json#L53)

이 문서에서 ‘정적 소스의 n행’은 연결된 근거 JSON의 `action.data.result.html`을 LF 기준으로 나눈 위치입니다. 이번 작업은 원본 HTML을 새 파일로 내보내지 않았습니다. 연구 스크립트의 사전 guard는 CMS의 일반 유효성 검사·상태 정책과 별개입니다. [보존된 HTML 원문](evidence/3003-own-paper1094-modify-source.json#L53), [연구용 guard](sources/runtime/paper1094-restore-baseline-save-once.js#L1)

**복구 대조·시각 근거·남은 범위**

2999와3060의 평가지 표시 필드 차이는 ‘평가지 ID:1094(1102)→1094(1177)’ 하나입니다. 제목·상태·페이지·용도·출처·구성 등 나머지 표시값과 구성/순서/서비스 표는 정확히 같고 액션도 같았습니다. 성공 토스트와 URL의 검색 인자 순서 등 전체 페이지 문자열까지 같다는 뜻은 아닙니다. 원본 세트와 단건 대조는2985와3062의 result 전체가 정확히 같았습니다. 평가지 구성의 추가·복구와 문항 자체의 최종 보존을 별도로 검증했습니다. [복구 비교](paper1094-manual-set-restoration-comparison-20261110.json#L1), [기준](evidence/2999-own-paper1094-current-baseline.json#L53), [복구 후](evidence/3060-own-paper1094-restored-current-detail.json#L53), [문항 대조 기준2985](evidence/2985-copy-hml-fullapply-originals-after.json#L53), [문항 대조 후](evidence/3062-own-paper1094-restored-set-item-controls.json#L53)

부모 연구자는3019의 안내/중복 결과와3028 상단 PNG를 직접 확인했습니다. 3030은 실제 scroll top132·높이1015·전체1147과 DOM snapshot은 반환됐으나 screenshot은 연결 응답 시간초과였고 PNG 파일이 없습니다. 따라서 저장 후5문항 상세 하단의 직접 이미지 검토나 전체 세로 픽셀 완료를 주장하지 않습니다. 하단의 문항과 마지막245행은3028의 표 데이터·3029 보존 HTML·3032 재수정 DOM으로 확인한 범위입니다. [저장 후 표 데이터](evidence/3028-own-paper1094-set-saved-detail.json#L53), [직접 확인한 상단 PNG](evidence/3028-own-paper1094-set-saved-detail.png), [저장 후 전체 HTML](evidence/3029-own-paper1094-set-saved-source.json#L53), [하단 이동·스크린샷 한계](evidence/3030-own-paper1094-saved-five-bottom.json#L52), [재수정5문항](evidence/3032-own-paper1094-five-reloaded-form.json#L53)

로컬 대조 24항목이 통과했습니다. 미검증 범위는 실제 포인터 드래그·세트 내부 재정렬·다른 후보/출처/상태·N 후보 실제 추가·다중 세트·개별 자식 부분 제외의 서버 정책·마지막 그룹 직접 요청·동시 편집/오류·다른 역할·Service 수신입니다. 최종 평가지 1094/1177은 기준 단건 구성으로 복구했고 추가 정리 저장은 필요하지 않습니다. 이 보고서만으로 전체 CMS 완료율이나 모든 평가지 정책을 확정하지 않습니다. [최종 의도 상태](paper1094-manual-set-membership-intent-20261110.json#L1), [최종 복구 비교](paper1094-manual-set-restoration-comparison-20261110.json#L1)
