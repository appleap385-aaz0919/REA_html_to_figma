# Master 승인미사용 N·폐기 D의 실제 전환과 편집 경계

> 2026-11-19 후속 승인: 상태 정보의 초기 편집·저장 활성화·허용 전환은 [사용자 승인 정책](item-status-edit-approved-policy-20261119.md)을 따릅니다. 아래는 당시 실제 CMS 관찰 기록이며 보존합니다. 승인된 변경을 실제 CMS에 적용했다는 뜻은 아닙니다.

작성일은 2026-11-10이며, 이 보고서의 새 실행 범위는 phase58의 2864~2877과 phase60의 2903~2922입니다. 자체 단건 COPY2089239를 R→N으로, Definition에서 생성된 자체 F문항2089375를 F→D로 정상 상태 수정 UI에서 각각 한 번 저장했습니다. N 문항은 2089019, D 문항은 2089082라는 같은 상세 버전을 유지했습니다. 업무 누계는 78회이고 Service 배포는 없습니다. 이 작업은 로컬 근거·보존 소스만 읽어 새 보고서와 보충맵을 작성했습니다. [phase58](session-20261110-phase58.json#L1), [phase60](session-20261110-phase60.json#L1), [N 의도](own-single-copy-unused-approval-intent-20261110.json#L1), [D 의도](own-definition-failed-item375-discard-intent-20261110.json#L1)

**현재 계정에서 관찰한 전이 선택지**

아래 표는 서버가 렌더한 개별 라디오의 intrinsic disabled와 상태 수정 진입 가능 여부를 정리합니다. 페이지 진입 직후에는 fieldset 전체가 잠겨 있으므로, intrinsic disabled가 없는 선택지도 정상 ‘수정’ 버튼으로 잠금을 풀어야 선택할 수 있습니다. 허용 선택지가 있다는 사실과 최종 저장 성공은 구분합니다. [R 초기 폼](evidence/2867-own-single-copy2089239-status-controls.json#L53), [N 저장 후 폼](evidence/2873-own-single-copy239-unused-n-post-controls.json#L53), [F 초기 폼](evidence/2907-own-definition-failed-item-status-controls.json#L53), [D 저장 후 폼](evidence/2913-own-failed-item375-discard-post-controls.json#L53)

| 현재 표본 | 수정 진입 | 개별 라디오가 허용하는 값 | 개별 disabled | 이번 최종 실행 |
|---|---|---|---|---|
| R / COPY2089239 | 가능 | R, Y, N, D | F | R→N 성공 |
| N / COPY2089239 | 가능 | Y, N, D | R, F | N 유지. Y·D 전환은 미실행 |
| F / Definition문항2089375 | 가능 | R, F, D | Y, N | F→D 성공 |
| D / 문항2089375 | 상태 수정 버튼 disabled | D만 intrinsic disabled 없음. fieldset은 계속 잠김 | R, F, Y, N | 복구·재편집 미실행 |
| Y / 원본 세트2089242 | 가능 | Y, N, D | R, F | 이 구간에서는 상태 전환 미실행 |

Y 원본 세트의 선택지는 2847에 대응하는 보존 소스에서도 확인했습니다. 이 표를 모든 역할·문항 생성 경로·혼합 세트·서버 직접 요청의 전이 규칙으로 확대하지 않습니다. 특히 F의 R 선택 가능성은 이번 F→R 실행 증명이 아닙니다. [Y 세트 라디오](sources/own-set2089242-before-ai-20261110.html#L712), [R 라디오](sources/own-copy2089239-before-unused-n-20261110.html#L546), [N 라디오](sources/own-copy2089239-approved-unused-n-20261110.html#L546), [F 라디오](sources/own-item2089375-before-discard-f-20261110.html#L552), [D 잠금](sources/own-item2089375-discarded-d-20261110.html#L515)

**R→N: 승인 검사와 정상 저장**

COPY2089239의 상태 수정 잠금을 풀고 활성 N을 선택했습니다. 2870은 저장 검사·확인창 진입이며 최종 제출이 아닙니다. 2871에서 실제 `statusSaveModal`의 ‘저장하시겠습니까?’를 확인한 뒤 2872에서 한 번 저장했습니다. 최종 값은 itemId2089239 / viewFlag=N / onlineFlag=N / serviceUsage=T입니다. 상태의 N과 On-line 전용 여부의 N은 서로 다른 필드입니다. [잠금 해제](evidence/2868-own-single-copy239-status-edit-unlock.json#L53), [저장 진입](evidence/2870-own-single-copy239-unused-n-save-entry.json#L53), [실제 확인창](evidence/2871-own-single-copy239-unused-n-confirm-observation.json#L53), [최종 단발 저장](evidence/2872-own-single-copy239-unused-n-final-save-once.json#L53)

저장 후 안내와 N 상태를 확인하고 독립 detail/edit GET을 재조회했습니다. 2866→2874의 문항 모델, 저장 OMR/정답, HML 참조, 상세 표시값과 난이도3은 정확히 같았습니다. 상세는 2089019이고 정답은 ④인 기존 OMR을 유지합니다. HML 파일 바이트를 이번 구간에 다시 내려받아 대조했다는 뜻은 아닙니다. [저장 후 상태](evidence/2873-own-single-copy239-unused-n-post-controls.json#L53), [독립 재조회](evidence/2874-own-single-copy239-unused-n-persistent-readback.json#L53), [N 전후 비교](own-copy239-unused-n-comparison-20261110.json#L1)

단건 원본2089216은 Y, 기존 AI2089240은 R이며, 세 문항의 그룹과 생성 이력은 유지됐습니다. N 이후 R/F 라디오는 개별 disabled이고 Y/N/D는 선택지로 남습니다. COPY239는 N 검증 표본으로 유지했으며 금지된 R 전환을 강제로 복구하지 않았습니다. 이 COPY는 R일 때도 상단 생성 버튼이 없었으므로 N 화면에서 버튼이 없다는 사실만으로 N의 일반 쌍둥이 권한 정책을 추론하지 않습니다. [관계·이력 대조](evidence/2877-own-single-group-original-copy-ai-status-read.json#L53), [N 상태 소스](sources/own-copy2089239-approved-unused-n-20261110.html#L418), [범위와 한계](session-20261110-phase58.json#L1)

**F→D: 별도 폐기 확인과 조회/수정의 분리**

문항2089375는 Definition695의 F 단독 검수로 생성된 F 표본입니다. 실행 전 상세2089082, 저장 OMR null, 필수 메타 공란, 출처1개·쌍둥이0개·평가지0개를 확인했습니다. F 폼은 R/F/D를 허용하고 Y/N을 개별 disabled로 렌더했습니다. [실행 전 조회](evidence/2905-own-definition-failed-item-before-discard-read.json#L53), [F 선택지](evidence/2907-own-definition-failed-item-status-controls.json#L53), [기존 F 단독 정책](definition-single-control-and-f-only-policy-20261110.md)

정상 수정 잠금 해제 후 D를 선택하고 2910에서 저장 진입, 2911에서 실제 `statusDiscardModal`을 확인했습니다. 이 모달은 ‘폐기 시 쌍둥이 문항에서 제외됩니다.’를 안내합니다. 2912의 최종 저장은 한 번이며 viewFlag=D / onlineFlag=N / serviceUsage=C입니다. F의 빈 메타·OMR이 D 확인창을 막지 않았습니다. [D 진입](evidence/2910-own-failed-item375-discard-save-entry.json#L53), [실제 폐기 확인창](evidence/2911-own-failed-item375-discard-modal-observation.json#L53), [최종 단발 폐기](evidence/2912-own-failed-item375-discard-final-once.json#L53)

독립 재조회에서 D 상세는 HTTP200으로 계속 조회되며 같은 상세2089082와 문항 모델·기본 표시값을 유지했습니다. 반면 수정 GET은 redirect 후 `/item/all/detail.donga`로 돌아갑니다. 화면의 상태 수정 버튼은 disabled, fieldset은 잠금 상태이며 문항 수정 링크도 활성 링크 대신 disabled 표시가 됩니다. 이는 현재 계정·표본의 정상 조회/수정 경계이며, 서버 직접 요청·모든 역할의 복구 불가능이나 물리 DB 삭제를 입증하지 않습니다. [재조회](evidence/2914-own-failed-item375-discard-master-readback.json#L53), [D 전후 비교](own-item375-discard-comparison-20261110.json#L1), [수정 링크 대신 표시](sources/own-item2089375-discarded-d-20261110.html#L504), [잠긴 상태 폼](sources/own-item2089375-discarded-d-20261110.html#L529)

이번 문항은 쌍둥이0개였습니다. 따라서 폐기 모달의 관계 제외 안내는 실제 문구까지 확인했으나, 연결된 쌍둥이를 실제로 제외하는 양성 경로는 검증하지 못했습니다. 평가지/Service에 연결된 D의 영향도 미검증입니다. [실행 전 관계 수](evidence/2905-own-definition-failed-item-before-discard-read.json#L53), [폐기 안내](evidence/2911-own-failed-item375-discard-modal-observation.json#L53)

**Definition 문서·문항 상태·등록 결과는 별도 값**

Master F→D 후에도 Definition695 문서 상태는 Y입니다. 카드 문항 상태는 D ‘폐기’로 바뀌지만 기존 등록 결과 F ‘등록실패’는 유지됐습니다. 같은 모델·비고와 상세 링크를 유지하고 ‘문항 수정’ 버튼만 disabled로 바뀝니다. 문서가 승인됐다는 것, 문항의 현재 상태, 등록 결과를 하나의 상태로 합치면 안 됩니다. [문서 전후 비교](own-item375-discard-comparison-20261110.json#L1), [문서 승인](sources/definition695-approved-with-discarded-card-20261110.html#L362), [수정 disabled](sources/definition695-approved-with-discarded-card-20261110.html#L475), [폐기·등록실패 병기](sources/definition695-approved-with-discarded-card-20261110.html#L481), [최신 UI](evidence/2920-own-definition695-with-discarded-card-observation.json#L53)

**소스에 선언된 검사·잠금·취소/이탈 정책**

상태 폼은 `#statusForm`, POST 경로는 `/item/all/status-save.donga`이며 itemId와 On-line 전용·용도·viewFlag를 전달합니다. 편집기는 fieldset.disabled만 바꿔 잠금을 해제하고 개별 라디오의 disabled는 유지합니다. D는 editButton.disabled이면 초기화 함수가 즉시 반환하므로 잠금 해제·이탈 가드를 설치하는 코드까지 진행하지 않습니다. [폼](sources/own-copy2089239-before-unused-n-20261110.html#L520), [전체 잠금과 D 조기 반환](sources/own-copy2089239-before-unused-n-20261110.html#L1543)

승인 문제 수집은 **approvalChecks가 존재하고 목표가 Y 또는 N일 때만** 수행됩니다. R239 소스에는 난이도3·단원1·행동영역MA02·OBSACN·저장 OMR/정답을 담은 검사 항목이 있습니다. N239·F375·Y원본 세트의 현재 렌더는 approvalChecks가 빈 배열입니다. 따라서 모든 N/Y 저장에서 검사 데이터가 반드시 존재한다고 일반화하지 않습니다. [R 검사 데이터](sources/own-copy2089239-before-unused-n-20261110.html#L1530), [목표 Y/N 조건](sources/own-copy2089239-before-unused-n-20261110.html#L1570), [N 빈 배열](sources/own-copy2089239-approved-unused-n-20261110.html#L1531), [F 빈 배열](sources/own-item2089375-before-discard-f-20261110.html#L1768), [Y 세트 빈 배열](sources/own-set2089242-before-ai-20261110.html#L1966)

ItemValidate는 난이도·단원코드·행동영역·문항 형태를 순서대로 검사하며, 배열은 길이>0, 그 밖의 값은 truthy 여부를 봅니다. 이어 OmrValidate.checkData에 저장 JSON을 전달합니다. JSON이 없거나 파싱에 실패하면 null이며, 유형별 validate가 있으면 OMR/answer null을 거절하고 유형별 검사 예외는 형식 오류로 바꿉니다. 해당 유형 serializer/validate가 없으면 null을 반환하는 코드도 있으므로 모든 유형의 검사 강도를 같다고 단정하지 않습니다. [필수 검사](sources/assets/itemValidate-7275b6d68481b3ac74a2f86ada386528.js#L7), [저장 OMR 검사](sources/assets/omrMonitor-023b42ef6d70938f6d9e24d4cdb01e3f.js#L49), [JSON 파싱·검사 호출](sources/own-copy2089239-before-unused-n-20261110.html#L1564)

검사 문제가 있으면 토스트를 표시하고 확인창 전에 반환합니다. 통과하면 D는 폐기 모달, 그 밖은 세트 모달이 있으면 세트 모달, 없으면 일반 저장 모달을 엽니다. 모달의 최종 저장만 form.requestSubmit()을 호출합니다. statusSaved 응답 헤더를 받으면 안내를 보존하고 페이지를 재조회하는 코드입니다. R→N 성공과 F→D 성공은 실제 확인했지만, 모든 거절/서버 오류 분기와 세트 N/D 실행은 이번 범위에서 확인하지 않았습니다. [확인창 분기·제출](sources/own-copy2089239-before-unused-n-20261110.html#L1595), [저장 성공 재조회](sources/own-copy2089239-before-unused-n-20261110.html#L1616)

취소 버튼은 form.reset()으로 서버 렌더의 default 값으로 돌아가 fieldset을 다시 잠급니다. 이탈 가드는 option.selected/defaultSelected와 radio.checked/defaultChecked를 비교하며, 잠금 상태거나 수정만 열고 값이 같으면 경고하지 않습니다. 지정 문항 이동·수정·목록 링크의 같은 탭 클릭만 가로채 ‘저장하지 않은 상태 정보 변경사항’ 모달을 열고, 확인하면 원래 링크를 다시 클릭합니다. 새 탭 클릭은 제외합니다. 이는 소스 선언이며 N/D 구간에서 취소·변경 이탈을 새로 실행했다고 기록하지 않습니다. 기존 R 상태의 이탈 취소 관찰과는 범위를 구분합니다. [취소 reset](sources/own-copy2089239-before-unused-n-20261110.html#L1558), [dirty·링크 가드](sources/own-copy2089239-before-unused-n-20261110.html#L1629), [기존 승인 정책 보고서](master-status-policy-review-20261109.md)

**픽셀·검증 한계**

부모 연구자가 N 상태2876, D 상태2917과 Definition695의 2921/2922 PNG를 직접 검토했습니다. 2921의 top0/height1015와 2922의 top385/height1015는 전체1400px를 겹쳐 덮습니다. D 상태2917은 상태/수정 잠금의 시각 근거이며 Master 전체 세로 완료로 확대하지 않습니다. 이 정적 작업은 PNG 헤더·실제 스크롤 구간과 부모 검토 기록을 인용했습니다. [D 상태 PNG](evidence/2917-own-discarded-item375-status-visual.png), [문서 상단](evidence/2921-own-definition695-discarded-card-top-visual.json#L52), [문서 하단](evidence/2922-own-definition695-discarded-card-bottom-visual.json#L52), [부모 검토 기록](session-20261110-phase60.json#L1)

전후 모델·저장 OMR·HML 참조·상세 표시값·문서 모델/비고와 실제 최종 단발 제출을 로컬에서 대조했습니다. 남은 범위는 관계가 있는 문항의 실제 D 제외, N/Y/D 사이 다른 전이, F→R, 세트 N/D와 혼합 상태, 다른 역할·서비스 노출/수신·서버 정책·DB 물리 처리입니다. 새 세트 AI는 phase59에서 완료됐으며 더 이상 처리 대기로 기록하지 않습니다. 해석 HML·정상 Definition 세트 ZIP은 현재 정상 표본이 없는 미검증 범위이며 사용자 응답 대기가 아닙니다. 전체 사이트 완료율은 null로 유지합니다. [phase59 최종 AI 결과](set-ai-generation-lineage-and-content-20261110.md), [현재 범위](session-20261110-phase60.json#L1)
