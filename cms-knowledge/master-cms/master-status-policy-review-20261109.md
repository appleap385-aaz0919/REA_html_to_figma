# Master 문항 상태 변경·승인 정책 검토

작성일: 2026-11-09. 근거 범위는 2104~2154이며, 상태 시험은 2106~2124의 JSON·접근성 TXT·캡처 HTML을 중심으로 검토했습니다. 기존 R 상태의 보존 HTML, itemValidate JS, 읽기 전용 재조회 관찰기와 mutation-ledger를 함께 대조했습니다. 이번 작업에서는 브라우저/UI/네트워크를 조작하지 않았고 이 보고서만 작성했습니다. PNG를 직접 검사하지 않았으므로 이 문서에서 이미지 검토 완료나 픽셀 커버리지 완료를 선언하지 않습니다.

**핵심 판단**

- 2089238의 R→Y 시도는 **클라이언트 승인 선행검사에서 OMR 누락으로 차단**됐습니다. 저장 확인창은 열리지 않았고, 로컬 편집 취소 후 독립 서버 GET에서도 R·저장 OMR null이었습니다. 서버에 최종 승인 요청을 보내 거절 응답을 받은 시험과는 다릅니다. [실제 저장 버튼·차단](evidence/2109-master-qa-missing-omr-save-blocked.json#L52), [접근성 경고](evidence/2109-master-qa-missing-omr-save-blocked.txt#L349), [후속 서버 조회](evidence/2115-master-qa-missing-omr-server-readback.json#L53)
- 2089216은 저장 OMR 검사 통과 후 확인창의 최종 저장을 실제 실행했고, UI와 독립 서버 GET에서 **R→Y(승인·사용)** 가 유지됐습니다. onlineFlag=N·serviceUsage=T와 내용 상세ID2088849도 유지됐습니다. [검사 통과](evidence/2118-master-qa-complete-select-approved.json#L52), [최종 제출](evidence/2121-master-qa-final-approved-status-submit.json#L52), [UI 결과](evidence/2122-master-qa-after-approved-status.json#L53), [독립 재조회](evidence/2123-master-qa-approved-server-readback.json#L53)
- Y 재조회 HTML에서 R/F는 개별 disabled이고 Y/N/D는 개별 disabled가 아닙니다. 단, 현재 폼은 fieldset 전체가 잠겨 있습니다. 이는 **현재 표본의 UI 선택 허용 선언**이며 Y→N/D 저장 성공이나 서버 전체 전이 규칙을 입증하지 않습니다. [재조회 정책 값](evidence/2123-master-qa-approved-server-readback.json#L53), [Y 캡처 HTML](evidence/2124-master-qa-approved-detail-source.json#L53)
- Y 승인 뒤 쌍둥이 문항 생성·배포하기 진입 버튼이 활성화됐습니다. 이 범위에서는 해당 대화상자 열기, 생성 최종 실행, 서비스 배포까지 확인한 것이 아닙니다. [활성 버튼 재조회](evidence/2123-master-qa-approved-server-readback.json#L53), [활성 배포 버튼 접근성](evidence/2122-master-qa-after-approved-status.txt#L336)

**문서 승인과 Master 문항 승인은 다른 상태입니다**

HML 문서664의 보존 상세는 문서 상단이 승인이고, 성공 문항2089216(2088849)의 카드는 초안으로 표시됩니다. HML 문서665도 승인 상태에서 남긴 문항2089238(2088870)을 초안으로 표시합니다. 이후 별도 Master 상태 폼에서 2089216만 Y로 바뀌었고, OMR이 없는 2089238은 R로 유지됐습니다. 따라서 문서 검수 S·문서 승인 Y·개별 Master 승인 Y/N을 같은 값으로 취급할 수 없습니다. [664 문서 Y](sources/hml664-approved-20261109.html#L570), [2089216 카드 R](sources/hml664-approved-20261109.html#L730), [665 문서 Y](sources/hml665-set-approved-20261109.html#L570), [2089238 카드 R](sources/hml665-set-approved-20261109.html#L797), [2089238 R 유지](evidence/2115-master-qa-missing-omr-server-readback.json#L53), [2089216 Y 유지](evidence/2123-master-qa-approved-server-readback.json#L53)

본문 정답이나 추천 메타가 있다는 사실도 저장 OMR 충족을 대신하지 않습니다. 2089238의 R 페이지가 렌더한 검사 자료는 difficulty="2", questionType="SBSANM", behaviorCode="MA02", unitCount=1이지만 omrData/answerData는 null입니다. 반면 2089216의 R 페이지는 OBSACN의 다섯 선택지와 VALUE 정답④를 저장 자료로 제공합니다. 이번 결과는 각 표본의 현재 자료에 대한 검사 결과이며 모든 주관식·모든 HML 변환의 규칙이 아닙니다. [2089238 검사 자료](sources/hml665-single2089238-20261109.html#L2009), [2089216 검사 자료](sources/hml664-success-item2089216-20261109.html#L1996), [실제 두 validator 결과](evidence/2109-master-qa-missing-omr-save-blocked.json#L52), [정상 결과](evidence/2118-master-qa-complete-select-approved.json#L52)

**실제 차단·취소 흐름: 2089238**

| 단계 | 확인한 결과 | 판단 범위 |
|---|---|---|
| 2107 초기 조회 | 헤더는 초안, R checked, fieldset locked=true입니다. 수정은 보이고 저장/취소는 숨겨져 있으며, hx-post 대상은 /item/all/status-save.donga입니다. | 저장 버튼의 disabled=false만 보고 항상 사용 가능한 UI라고 기록하면 안 됩니다. [2107](evidence/2107-master-qa-missing-omr-status-baseline.json#L53), [관찰기](sources/runtime/owned-item-status-observation.js#L1) |
| 2108 수정·Y 선택 | 실제 수정 버튼을 눌러 잠금을 풀고 Y를 선택했습니다. locked=false·selected=Y입니다. | 로컬 상태 선택이며 아직 서버 저장은 아닙니다. [2108](evidence/2108-master-qa-missing-omr-select-approved.json#L52) |
| 2109 저장 | 실제 저장 버튼을 누르자 “승인할 수 없습니다 / OMR · OMR 이 입력되지 않았습니다.”가 표시되고 modalIds=[]였습니다. 실제 OmrValidate.checkData 결과도 같은 누락 사유입니다. | 확인창보다 앞에서 차단된 실행 결과입니다. 최종 승인 폼을 제출한 뒤 서버가 거절한 사례가 아닙니다. [2109 JSON](evidence/2109-master-qa-missing-omr-save-blocked.json#L52), [TXT 경고](evidence/2109-master-qa-missing-omr-save-blocked.txt#L349) |
| 2110~2111 목록 이동 시도 | 목록 링크를 누르자 statusLeaveModal이 열리고 “저장하지 않은 상태 정보 변경사항이 사라집니다. 이동하시겠습니까?”가 표시됐습니다. 이때 로컬 Y가 선택돼 있고 편집 잠금은 해제 상태입니다. | 차단 뒤에도 로컬 변경이 남아 이탈 경고 대상이 된 표본입니다. [열기](evidence/2110-master-qa-dirty-leave-open.json#L52), [모달·선택 값](evidence/2111-master-qa-dirty-leave-state.json#L53) |
| 2112 이동 확인창 취소 | 모달의 취소를 누르고 hidden.bs.modal 완료를 기다렸습니다. | 페이지에 남는 취소입니다. 이 동작 자체를 서버 R 복원 또는 저장으로 세지 않습니다. [2112](evidence/2112-master-qa-dirty-leave-cancel.json#L52) |
| 2113~2114 상태 편집 취소 | 이어 상태 폼의 취소를 누르자 selected=R·locked=true가 반환됐습니다. 후속 관찰에서도 R, 수정만 표시, 저장/취소 숨김이었습니다. | 이동 모달 취소와 상태 편집 취소는 서로 다른 단계입니다. 후자는 로컬 기본값 복원·재잠금입니다. [2113](evidence/2113-master-qa-status-cancel-edit.json#L52), [2114](evidence/2114-master-qa-status-cancel-readback.json#L53) |
| 2115 독립 GET | 새 서버 GET은 HTTP200, savedViewFlag=R, savedOmr=null을 반환했습니다. | 원래 저장 상태가 유지된 후속 근거입니다. 모든 DB 필드 불변이나 전송 요청 수0을 직접 계측한 것은 아닙니다. [2115](evidence/2115-master-qa-missing-omr-server-readback.json#L53), [읽기 관찰 코드](sources/runtime/qa-missing-omr-server-status.js#L1) |

2112는 모달 닫힘과 페이지 잔류를 확인한 자료이며, 그 직후 Y 값을 따로 반환한 값 검사는 없습니다. Y는 2111에서 확인됐고, 상태 폼 취소에 따른 R 복원은 2113~2114에서 직접 확인됐습니다. 로컬 값 유지·초기화와 서버 저장 여부를 이 순서대로 구분했습니다. [2111](evidence/2111-master-qa-dirty-leave-state.json#L53), [2112](evidence/2112-master-qa-dirty-leave-cancel.json#L52), [2113](evidence/2113-master-qa-status-cancel-edit.json#L52)

**실제 승인 흐름: 2089216**

| 단계 | 확인한 결과 | 판단 범위 |
|---|---|---|
| 2117 초기 상태 | R·OBSACN·난이도 하, onlineFlag=N·serviceUsage=T, fieldset locked=true입니다. | 새 QA 문항의 승인 전 기준입니다. [2117](evidence/2117-master-qa-complete-status-baseline.json#L53) |
| 2118 실제 OMR 검사·선택 | 저장 JSON을 파싱해 실제 OmrValidate.checkData를 호출한 결과 null이었고, 수정 버튼 후 Y를 선택했습니다. | null은 이 데이터의 validator 통과입니다. 정답 의미나 모든 문항 품질을 보증하지 않습니다. [2118](evidence/2118-master-qa-complete-select-approved.json#L52) |
| 2119~2120 저장 확인창 | 상태 저장을 누르자 statusSaveModal의 “상태 정보 저장 / 저장하시겠습니까?”가 실제 열렸습니다. 최종 전에는 헤더가 아직 R이고 로컬 Y가 선택돼 있습니다. | 모달 열기는 최종 저장 성공과 다릅니다. [2119](evidence/2119-master-qa-complete-save-confirm-open.json#L52), [2120](evidence/2120-master-qa-complete-before-final-save.json#L53) |
| 2121 최종 저장 | 해당 itemId·Y·N·T와 확인창 하나를 검증한 뒤 실제 최종 저장을 한 번 눌렀습니다. | 확정 상태 변경 제출입니다. [2121](evidence/2121-master-qa-final-approved-status-submit.json#L52) |
| 2122 UI 후속 결과 | “저장 되었습니다.”, 승인(사용) 헤더, Y 기본 선택, 다시 잠긴 fieldset을 확인했습니다. | 제출 후 UI 성공 결과입니다. [2122 JSON](evidence/2122-master-qa-after-approved-status.json#L53), [승인 헤더 TXT](evidence/2122-master-qa-after-approved-status.txt#L74), [성공 안내 TXT](evidence/2122-master-qa-after-approved-status.txt#L495) |
| 2123~2124 독립 서버 재조회·원본 | 새 GET은 HTTP200·savedViewFlag=Y·onlineFlag=N·serviceUsage=T·2089216(2088849)를 반환했습니다. 캡처 HTML도 Y 선택과 활성 진입 버튼을 제공합니다. | Y 저장의 지속을 재조회로 확인했습니다. 내용 상세ID는 이 사례에서 바뀌지 않았으며, 모든 상태 저장의 버전 정책으로 일반화하지 않습니다. [2123](evidence/2123-master-qa-approved-server-readback.json#L53), [Y 캡처 HTML](evidence/2124-master-qa-approved-detail-source.json#L53), [승인 전 동일 상세ID](sources/hml664-success-item2089216-20261109.html#L794) |

**R/Y 상태별 UI 전이 선언**

아래 표는 현재 계정·단건 두 표본의 라디오 개별 disabled를 기준으로 합니다. 폼의 초기 fieldset 잠금은 별도로 적용됩니다.

| 현재 저장 상태 | R 초안 | F 실패(재등록) | Y 승인(사용) | N 승인(미사용) | D 폐기 |
|---|---|---|---|---|---|
| R 표본의 편집 잠금 해제 후 | 선택 가능·기본값 | 개별 비활성 | 선택 가능, 실제 시험 대상 | 선택 가능 선언, 최종 실행 미확인 | 선택 가능 선언, 최종 실행 미확인 |
| Y로 저장한 2089216의 후속 HTML | 개별 비활성 | 개별 비활성 | 개별 활성·기본값 | 개별 활성 선언, 실제 Y→N 미확인 | 개별 활성 선언, 실제 Y→D 미확인 |

R 쪽은 실제 잠금 해제 결과와 보존 소스를, Y 쪽은 독립 서버 HTML의 individualDisabled를 근거로 했습니다. [R 편집 상태](evidence/2111-master-qa-dirty-leave-state.json#L53), [R 라디오 선언](sources/hml665-single2089238-20261109.html#L775), [Y 개별 비활성/활성](evidence/2123-master-qa-approved-server-readback.json#L53), [Y 캡처 HTML](evidence/2124-master-qa-approved-detail-source.json#L53)

Y 재진입은 fieldsLocked=true이므로 Y/N/D도 즉시 클릭 가능한 편집 상태라는 뜻은 아닙니다. 수정으로 fieldset 잠금을 풀어도 R/F의 개별 disabled는 남도록 작성돼 있습니다. Y→R/F 직접 요청의 서버 반려나 Y→N/D 최종 저장은 이번 시험에 없으므로, 이 표를 서버 상태 전이표 전체로 사용하면 안 됩니다. [Y 잠금과 개별 속성](evidence/2123-master-qa-approved-server-readback.json#L53), [잠금 함수](sources/hml665-single2089238-20261109.html#L2024)

**소스에서 확인한 검사·저장 경계**

1. **공통 필수값은 네 항목입니다.** itemValidate의 REQUIRED는 난이도·단원코드·행동영역·문항 형태입니다. missing은 배열 길이 또는 그 외 값의 truthy 여부로 비어 있는 항목을 고릅니다. 이 함수 자체가 모든 메타 항목, 코드 실재 여부, 내용 의미·품질·서버 범위를 검증한다는 근거는 아닙니다. [itemValidate L7](sources/assets/itemValidate-7275b6d68481b3ac74a2f86ada386528.js#L7), [filled/missing L15](sources/assets/itemValidate-7275b6d68481b3ac74a2f86ada386528.js#L15)
2. **R→Y/N의 선행검사는 확인창보다 앞에 있습니다.** R 페이지의 approvalChecks에서 필수 메타와 저장 OMR/정답을 수집하고, 대상이 Y 또는 N일 때 ItemValidate.missing과 OmrValidate.checkData를 수행합니다. 사유를 모아 토스트를 띄우면 return하므로 확인창이 열리지 않습니다. 실제로 실행한 대상은 Y이며 R→N의 같은 가드는 소스 확인입니다. [2089238 검사 자료 L2009](sources/hml665-single2089238-20261109.html#L2009), [검사 L2048](sources/hml665-single2089238-20261109.html#L2048), [저장 버튼 분기 L2074](sources/hml665-single2089238-20261109.html#L2074)
3. **폼 잠금과 개별 상태 금지를 분리합니다.** 수정은 fieldset.disabled=false, 취소는 form.reset 후 다시 잠그고 수정/취소/저장의 표시를 바꿉니다. 개별 라디오 disabled를 지우지 않는 방식입니다. 관찰기는 :disabled와 visible을 따로 읽어 상속 비활성·숨은 버튼을 구분합니다. [잠금/취소 L2024](sources/hml665-single2089238-20261109.html#L2024), [관찰기](sources/runtime/owned-item-status-observation.js#L1)
4. **최종 확인 수락 시에만 폼 제출을 잇습니다.** 타깃 D는 폐기 확인창, 다른 경우는 세트 안내 또는 일반 저장 확인창을 고르고, 그 창의 data-action-ok에서 form.requestSubmit을 호출합니다. hx-post 대상은 /item/all/status-save.donga입니다. 이번에는 비세트의 일반 확인창 Y 저장만 최종 실행했습니다. 폐기·세트 전원 전파는 이 소스만으로 실행 완료로 올리지 않습니다. [폼 L749](sources/hml665-single2089238-20261109.html#L749), [확인·최종 제출 L2082](sources/hml665-single2089238-20261109.html#L2082), [실제 Y 최종 버튼](evidence/2121-master-qa-final-approved-status-submit.json#L52)
5. **성공 후 새 페이지를 읽도록 작성돼 있습니다.** htmx:afterRequest의 HX-Trigger를 파싱해 statusSaved가 있으면 성공 토스트를 이동 뒤에 표시하고 location.reload합니다. 실제 UI와 독립 GET의 Y가 이 흐름을 뒷받침합니다. 원시 응답 헤더 전체나 백엔드 트랜잭션을 직접 분석한 것은 아닙니다. [성공 처리 L2094](sources/hml665-single2089238-20261109.html#L2094), [UI 결과](evidence/2122-master-qa-after-approved-status.json#L53), [서버 재조회](evidence/2123-master-qa-approved-server-readback.json#L53)
6. **현재 Y 페이지의 approvalChecks는 빈 배열입니다.** 이는 이번 캡처의 R 전환용 검사 자료를 더 이상 싣지 않은 상태입니다. 이 사실만으로 이미 승인된 문항의 모든 후속 수정·서버 검사·영구적인 검증 면제를 단정하지 않습니다. [Y 캡처 HTML의 상태 스크립트](evidence/2124-master-qa-approved-detail-source.json#L53)
7. **상태 변경 이탈 가드는 지정 링크의 로컬 변경을 봅니다.** fieldset이 열려 있고 select의 defaultSelected 또는 radio의 defaultChecked와 현재 값이 다르면 목록·이전/다음 문항·문항 수정 링크를 캡처해 경고합니다. 새 탭 클릭은 건너뛰고, 이탈 확인을 수락하면 원래 링크를 다시 클릭하도록 되어 있습니다. 이번에는 목록 링크의 경고·취소만 실행했으며, 실제 수락 이동·브라우저 닫기/뒤로가기/새로고침 보호는 확인하지 않았습니다. [dirty 판정 L2107](sources/hml665-single2089238-20261109.html#L2107), [지정 링크·재개 L2121](sources/hml665-single2089238-20261109.html#L2121), [실제 경고/취소](evidence/2110-master-qa-dirty-leave-open.json#L52), [2112](evidence/2112-master-qa-dirty-leave-cancel.json#L52)

**승인 후 쌍둥이·배포 버튼 변화**

승인 전 2089216 R 원본의 배포하기와 쌍둥이 생성 버튼에는 disabled가 있었습니다. 승인 후 2123 독립 GET에서는 둘 다 disabled=false이고, 2124 HTML의 배포 버튼에는 #deployModal 연결이 생겨 있습니다. 쌍둥이 생성은 data-working=false를 유지한 활성 진입 버튼입니다. 이 한 표본에서 승인 저장 후 진입 가용성이 바뀐 것은 확인했지만, 상태 Y 하나만이 모든 버튼의 유일한 서버 조건이라는 주장은 아닙니다. [승인 전 배포 L645](sources/hml664-success-item2089216-20261109.html#L645), [승인 전 쌍둥이 L699](sources/hml664-success-item2089216-20261109.html#L699), [승인 후 실제 재조회](evidence/2123-master-qa-approved-server-readback.json#L53), [승인 후 캡처 HTML](evidence/2124-master-qa-approved-detail-source.json#L53)

해당 근거에서 다음은 미실행입니다. 활성 버튼 클릭 후 대화상자의 대상·검증·취소, 새 쌍둥이 생성/이력·중복/실패, 최종 배포/재배포·서비스 수신·서비스 버전입니다. 버튼 활성과 서비스 배포 완료를 분리합니다. 이번 원장 추가 작업도 상태 저장 한 건이며 serviceDeployment=false입니다. [추가 원장 항목](mutation-ledger.json#L877), [활성화 확인 범위](evidence/2123-master-qa-approved-server-readback.json#L53)

**확정 업무 변경 수 확인**

읽은 mutation-ledger에는 entries가 **34개**이며, submitEvidence가 2154 이하인 항목도 34개였습니다. 마지막 항목은 2121의 2089216 R→Y 상태 저장이고, 후속 근거는 2122·2123·2124입니다. 이번 추가 한 건은 UI 성공 및 독립 GET으로 교차 확인했습니다. 앞선 33개를 이번 작업에서 모두 새로 재감사한 것은 아니며, 34는 DB 행 수나 거부 시도·클릭·대화상자 수가 아닙니다. 2089238 차단·취소는 신규 확정 업무 변경으로 세지 않습니다. [원장 마지막 항목](mutation-ledger.json#L877), [최종 제출](evidence/2121-master-qa-final-approved-status-submit.json#L52), [UI/서버 후속 결과](evidence/2122-master-qa-after-approved-status.json#L53), [2123](evidence/2123-master-qa-approved-server-readback.json#L53)

이 보고서의 집계는 **cutoff 2154** 기준입니다. 이후 원장에 추가 항목이 생기더라도 이 범위의 판단과 구분해야 합니다. 커버리지·상태 인덱스·원장은 수정하지 않았습니다.

**남은 정책 검증**

| 구분 | 이번 확정 범위 | 남은 분기 |
|---|---|---|
| 승인 선행검사 | SBSANM OMR 누락 Y 차단, OBSACN 저장자료 통과 후 실제 Y 저장 | R→N, 다른 필수항목 누락, 깨진/상충 OMR·정답, 모든 유형·세트 전원 검사, 서버 직접 반려. [차단](evidence/2109-master-qa-missing-omr-save-blocked.json#L52), [성공](evidence/2123-master-qa-approved-server-readback.json#L53) |
| 상태 전이 | 현재 R 편집과 Y 후속 HTML의 개별 disabled 정책 | Y→N/D의 최종 저장·복원, R/F 직접 요청 반려, F/D/세트/다른 역할의 실제 정책. [Y 선언](evidence/2123-master-qa-approved-server-readback.json#L53), [저장 분기](sources/hml665-single2089238-20261109.html#L2074) |
| 취소·복구 | 상태 미저장 경고 취소, 폼 취소의 R 복원·잠금, 서버 R 유지 | 이탈 확인 수락, 변경 없이 이탈, 새 탭/브라우저 이동, 저장 오류·만료·동시편집·중복 제출. [2110~2115](evidence/2115-master-qa-missing-omr-server-readback.json#L53), [링크 범위](sources/hml665-single2089238-20261109.html#L2121) |
| 승인 후 업무 | 쌍둥이·배포 진입 활성 | 실제 대화상자·생성·배포·서비스 수신/실패와 권한별 조건. [2123](evidence/2123-master-qa-approved-server-readback.json#L53) |
| 품질·화면 | JSON/TXT·렌더된 소스·선택된 실제 동작과 서버 GET | PNG는 이 보고서에서 직접 검토하지 않았습니다. 모든 메타 정확성·백엔드 전체 규칙·DB·모든 역할·전체 CMS 완료를 확정하지 않습니다. [수집 관찰 범위](sources/runtime/owned-item-status-observation.js#L1), [독립 GET 관찰 범위](sources/runtime/master-qa-approved-server-readback.js#L1) |

