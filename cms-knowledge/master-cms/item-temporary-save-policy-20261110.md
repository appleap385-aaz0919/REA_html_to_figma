# 문항 CMS 임시저장과 확정본 선택 정책 검토

이 보고서는 자체 R 복제문항 **2089239**를 대상으로 한 phase42의 근거 **2412~2455**를 다룹니다. 난이도만 변경한 표본에서 CMS 임시저장과 전체반영을 실제로 실행했고, 확정본·임시본·새 현행본을 각각 조회했습니다. 이 단계의 확정 Master 업무는 **CMS 임시저장 1회(누계49)와 전체반영 1회(누계50)**입니다. 이 정적 조사에서는 브라우저·네트워크·CMS API·원장·전역 상태/인덱스를 조작하지 않았습니다. [단계 범위와 결과](session-20261110-phase42.json#L1), [검증 의도와 기록](own-copy2089239-temp-save-intent-20261110.json#L1)

**확인한 정책**

- 난이도 공란은 전체반영 확인창을 열기 전에 차단됐지만, 같은 상태의 CMS 임시저장은 성공했습니다. 별도 임시본 **2089005**가 생겼고 확정본 **2088871·난이도2/하·Master R**는 유지됐습니다. [전체반영 차단](evidence/2421-own-copy2089239-incomplete-fullapply-guard.json#L53), [임시저장 제출](evidence/2425-own-copy2089239-temp-submit-once.json#L53), [확정본 유지](evidence/2427-own-copy2089239-temp-published-read.json#L53), [임시본 조회](evidence/2429-own-copy2089239-after-temp-explicit-draft-read.json#L53)
- 실제 버전 선택창에서 “검수완료 수정하기”는 확정본의 `draft=N/난이도2`를, “임시저장 수정하기”는 `draft=Y/난이도공란`을 열었습니다. **“검수완료”는 이 선택창의 문구이며 Master 승인Y를 뜻하지 않습니다.** [선택창](evidence/2430-own-copy2089239-existing-draft-gate-open.json#L53), [확정본 선택 결과](evidence/2433-own-copy2089239-confirmed-version-live-state.json#L53), [임시본 선택 결과](evidence/2439-own-copy2089239-draft-version-live-state.json#L53)
- 확정본 편집을 저장하지 않고 취소해도 임시본은 남았습니다. 이후 임시본의 난이도를 **3/중**으로 보완해 전체반영하자 새 현행 **2089006/R**가 됐습니다. `hasDraft=false`가 반환됐고, 명시적 `draft=Y` GET도 현행2089006/`loadDraft=false`로 돌아갔습니다. **현재 임시본이 조회되지 않는 것과 DB 과거 행의 물리삭제는 구분합니다.** [취소 후 유지](evidence/2436-own-copy2089239-draft-retained-after-cancel.json#L53), [최종 제출](evidence/2444-own-copy2089239-draft-fullapply-submit-once.json#L53), [새 현행](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53), [임시본 검사](evidence/2447-own-copy2089239-draft-fullapply-draft-check.json#L53), [명시적 draftY 조회](evidence/2448-own-copy2089239-draft-fullapply-explicit-draft-read.json#L53)

**실제 실행 순서와 버전**

| 단계 | 확인한 값 | 근거와 해석 |
|---|---|---|
| 기준 | 확정2088871/R·난이도2/하, 기본 수정폼 `loadDraft=false`, `hasDraft=false`였습니다. | [확정/수정 조회](evidence/2417-own-copy2089239-before-temp-server-read.json#L53), [임시본 없음](evidence/2419-own-copy2089239-before-temp-draft-check.json#L53) |
| 공란 전체반영 | 난이도를 지운 뒤 “필수 항목을 입력해주세요 — 난이도” 안내와 메타 탭 이동을 확인했습니다. 확인창은 열리지 않았습니다. | 서버 저장 반려가 아니라 확인창 전의 폼 차단입니다. [실제 결과](evidence/2421-own-copy2089239-incomplete-fullapply-guard.json#L53) |
| CMS 임시저장 | 공란 상태에서 임시저장 확인창을 열고 최종 임시저장을 한 번 실행했습니다. | 확인창 열기와 최종 제출을 구분합니다. [확인창](evidence/2423-own-copy2089239-temp-save-confirm-open.json#L53), [제출](evidence/2425-own-copy2089239-temp-submit-once.json#L53) |
| 임시저장 후 | 확정2088871/R·하와 기본 수정값2는 그대로였습니다. `hasDraft=true`, 저장시각 `2026-11-10 10:20`이 표시됐습니다. 명시적 `draft=Y`는 임시2089005·난이도공란·`loadDraft=true`였습니다. | [확정본](evidence/2427-own-copy2089239-temp-published-read.json#L53), [저장시각](evidence/2428-own-copy2089239-after-temp-draft-check.json#L53), [임시본 신원](evidence/2429-own-copy2089239-after-temp-explicit-draft-read.json#L53) |
| 확정본 선택과 취소 | 실제 확정본 버튼으로 `draft=N/난이도2`를 열었습니다. 수정 취소 확인창에서 저장하지 않고 이동한 뒤에도 임시본은 같은 저장시각으로 남았습니다. | [선택](evidence/2432-own-copy2089239-choose-confirmed-version.json#L52), [복원](evidence/2433-own-copy2089239-confirmed-version-live-state.json#L53), [취소창](evidence/2434-own-copy2089239-confirmed-cancel-confirmation.json#L53), [이동](evidence/2435-own-copy2089239-confirmed-leave-without-save.json#L53), [임시본 유지](evidence/2436-own-copy2089239-draft-retained-after-cancel.json#L53) |
| 임시본 선택과 보완 | 실제 임시본 버튼으로 `draft=Y/공란`을 복원한 뒤 난이도3/중을 입력했습니다. 필수 누락 목록은 비었고 OMR 유효성 메시지도 없었습니다. | [선택](evidence/2438-own-copy2089239-choose-draft-version.json#L52), [공란 복원](evidence/2439-own-copy2089239-draft-version-live-state.json#L53), [로컬 보완](evidence/2441-own-copy2089239-draft-difficulty-complete-local.json#L53) |
| 전체반영 | 확인창을 열고 최종 저장을 한 번 실행했습니다. 현행2089006/R·난이도3/중, 기본 수정폼 `loadDraft=false`를 확인했습니다. | [확인창](evidence/2442-own-copy2089239-draft-fullapply-confirm-open.json#L53), [제출](evidence/2444-own-copy2089239-draft-fullapply-submit-once.json#L53), [현행 조회](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53) |
| 적용 후 임시본 검사 | `hasDraft=false`이고 저장시각/사용자는 null이었습니다. 명시적 `draft=Y` 요청도 현행2089006·난이도3·`loadDraft=false`를 반환했습니다. | 논리적인 조회 결과이며 임시 DB 행의 삭제 증거는 아닙니다. [검사](evidence/2447-own-copy2089239-draft-fullapply-draft-check.json#L53), [현행 fallback](evidence/2448-own-copy2089239-draft-fullapply-explicit-draft-read.json#L53) |

저장시각10:20은 서버가 표시한 값입니다. 초 단위 실행시간이나 DB 처리시간을 측정한 결과가 아닙니다. 버전ID의 번호 차이로 DB 행 변경 수나 다른 사용자 작업을 추정하지 않습니다. [검증 의도/결과](own-copy2089239-temp-save-intent-20261110.json#L1)

**소스에서 확인한 프런트엔드 정책**

| 정책 | 보존 소스의 선언 | 실제 결과와 한계 |
|---|---|---|
| 임시저장 검사 | 확인창 이후 `collectDocs(false)`를 수행하고 `/item/all/temp-save.donga`로 저장합니다. | 난이도 하나를 비운 표본의 임시저장은 성공했습니다. 모든 누락·HTML 오류·OMR 유형·세트의 허용을 시험한 것은 아닙니다. [임시저장 코드](sources/own-copy2089239-before-temp-20261110.html#L7423), [실제 제출](evidence/2425-own-copy2089239-temp-submit-once.json#L53) |
| 전체반영 검사 | 필수 메타 검사→`collectDocs(true)`→OMR 검사를 통과한 뒤 전체반영 확인창을 엽니다. 최종 저장 경로는 `apply-all.donga`입니다. | 난이도 공란은 확인창 전에서 차단됐고 보완 후 정상 저장됐습니다. [전체반영 코드](sources/own-copy2089239-before-temp-20261110.html#L7431), [공란 차단](evidence/2421-own-copy2089239-incomplete-fullapply-guard.json#L53), [보완 후 저장](evidence/2444-own-copy2089239-draft-fullapply-submit-once.json#L53) |
| 공란 난이도와 payload | `difficulty: selVal('mfDifficulty') || null`로 구성하며 문항/지문·OMR·메타·HML 필드를 함께 수집합니다. | 임시본에서 난이도 공란 복원은 확인했습니다. DB 컬럼값이나 전체 스키마를 직접 확인한 것은 아닙니다. [payload 구성](sources/own-copy2089239-before-temp-20261110.html#L7252), [공란 복원](evidence/2429-own-copy2089239-after-temp-explicit-draft-read.json#L53) |
| 실제 버전 선택 | 기준 수정 소스는 `loadDraft=false`, 저장한 임시본 소스는 `true`를 렌더합니다. | URL의 `draft=Y`만으로 임시본 신원을 판정하면 안 됩니다. 적용 후 같은 요청은 현행본으로 돌아갔습니다. [기준](sources/own-copy2089239-before-temp-20261110.html#L7110), [임시본](sources/own-copy2089239-saved-draft-20261110.html#L7112), [적용 후 조회](evidence/2448-own-copy2089239-draft-fullapply-explicit-draft-read.json#L53) |
| 필수 메타 범위 | 난이도·단원·행동영역·문항형태를 검사하며, 이 목록에 출처 수는 없습니다. | 출처 연결이 없는 R 복제도 보완 후 전체반영에 성공했습니다. 이것은 승인Y나 서비스 노출의 모든 필수조건을 증명하지 않습니다. [필수 메타 검사](sources/own-copy2089239-before-temp-20261110.html#L7397), [실제 저장 결과](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53) |

임시저장에서도 문서 수집과 직렬화 및 공통 저장 단계는 수행합니다. 이번 기준 OMR은 OBSACN/정답④로 유효했고, 난이도 외의 필수 메타는 유지했습니다. 따라서 난이도 공란 허용을 “모든 오류가 무조건 저장된다”는 정책으로 일반화하지 않습니다. [payload](sources/own-copy2089239-before-temp-20261110.html#L7252), [임시저장 분기](sources/own-copy2089239-before-temp-20261110.html#L7423), [기준 폼](evidence/2418-own-copy2089239-before-temp-live-inspect.json#L53), [임시본 폼](evidence/2439-own-copy2089239-draft-version-live-state.json#L53)

**선택창과 취소, 두 fallback의 구분**

상세의 수정 링크는 `draft-check`를 먼저 요청합니다. 임시본이 없으면 일반 수정으로 이동하고, 있으면 저장시각과 버전 선택창을 표시합니다. 두 선택 버튼은 각각 `draft=Y`와 `draft=N`을 붙입니다. 조회 실패 시 토스트를 표시하고 일반 수정으로 가는 catch도 있지만, 이는 소스로만 확인한 분기이며 이번 정상 선택 흐름의 실패로 기록하지 않습니다. 새 탭의 `openModify=Y` 처리 역시 별도 코드 분기입니다. [수정 링크](sources/own-copy2089239-after-draft-apply-20261110.html#L497), [검사와 선택](sources/own-copy2089239-after-draft-apply-20261110.html#L1480), [오류 fallback](sources/own-copy2089239-after-draft-apply-20261110.html#L1498), [선택 버튼](sources/own-copy2089239-after-draft-apply-20261110.html#L1512), [새 탭 처리](sources/own-copy2089239-after-draft-apply-20261110.html#L1515)

이번에 실제로 실행한 취소는 **확정본 수정화면에서 저장하지 않고 이동하는 동작**입니다. 버전 선택창 자체의 취소 버튼은 닫기 동작으로 선언돼 있지만, 이를 실행 완료한 것으로 세지 않습니다. 적용 후 명시적 `draft=Y`가 현행본을 반환한 것은 독립 서버 GET의 결과이며, 앞서 설명한 프런트엔드 조회실패 catch와도 다릅니다. [선택창 취소 선언](sources/own-copy2089239-after-draft-apply-20261110.html#L1333), [실제 수정 취소](evidence/2434-own-copy2089239-confirmed-cancel-confirmation.json#L53), [저장 없이 이동](evidence/2435-own-copy2089239-confirmed-leave-without-save.json#L53), [임시본 유지](evidence/2436-own-copy2089239-draft-retained-after-cancel.json#L53), [서버의 현행 fallback](evidence/2448-own-copy2089239-draft-fullapply-explicit-draft-read.json#L53)

“검수완료 수정하기”와 Master 상태는 별개입니다. 기준·임시저장 후·전체반영 후의 현행 상태는 모두R이었고, 적용 후 보존 소스도R이 선택돼 있습니다. 이번 전체반영 성공을 승인Y나 서비스 배포로 확대하지 않습니다. [기준R](evidence/2417-own-copy2089239-before-temp-server-read.json#L53), [임시 후R](evidence/2427-own-copy2089239-temp-published-read.json#L53), [적용 후R](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53), [R 선택 소스](sources/own-copy2089239-after-draft-apply-20261110.html#L546)

**보존 대조와 출처 정책**

로컬 응답을 비교한 결과, 임시저장 후 확정본과 기본 수정값은 기준과 같았습니다. 임시본·적용 후 현행·적용 후 명시Y 조회에서도 문서JSON·질문뷰어 모델·HML 참조 경로·저장 OMR/정답은 기준과 같았습니다. 이번에는 원격 HML/PNG를 다시 내려받아 바이트 해시를 비교하지 않았습니다. [기준](evidence/2417-own-copy2089239-before-temp-server-read.json#L53), [확정본 유지](evidence/2427-own-copy2089239-temp-published-read.json#L53), [임시본](evidence/2429-own-copy2089239-after-temp-explicit-draft-read.json#L53), [적용 결과](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53), [명시Y 결과](evidence/2448-own-copy2089239-draft-fullapply-explicit-draft-read.json#L53)

관련 원문2089216은 상세2088849/Y·출처13 한 개·기존 OBSACN/정답④를 유지했습니다. 평가지1093도 상세1124/사용Y·멤버2089216 한 개 및 관측 메타를 유지했습니다. 복제본2089239의 출처 표시는 전후 모두 “-”였습니다. [원문 대조](evidence/2450-own-copy2089239-anchor2089216-control-read.json#L53), [평가지 대조](evidence/2451-own-copy2089239-paper1093-control-read.json#L53), [복제본 기준](evidence/2417-own-copy2089239-before-temp-server-read.json#L53), [복제본 저장 후](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53)

마지막 출처 하나를 남기도록 한 보호는 **기존 연결을 해제하는 `product-remove` 경로의 클라이언트 규칙**입니다. 출처0인 R 복제의 `apply-all` 성공과 다른 작업입니다. 두 결과를 합쳐 “모든 문항은 출처가 반드시 하나 있어야 한다”거나 “전체반영으로 마지막 출처를 없앨 수 있다”고 해석하지 않습니다. [해제 조건](sources/own-source199-final-mapped-unused-modal-20261110.html#L1553), [실제 최소1개 차단](evidence/2405-own-item2089216-last-source-minimum-probe.json#L53), [R 복제 저장 결과](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53)

**픽셀 검토와 남은 범위**

부모 연구자는 임시저장 확인2424·버전 선택2431·전체반영 확인2443 PNG를 직접 열어 검토했습니다. 현재 상세2453~2455의 실제 위치0/800/1199와 화면높이1015는 전체2214px를 겹쳐 덮습니다. 이 정적 작업은 부모의 검토 기록을 인용하며, 다른 수정폼·취소 확인창·역할·화면폭까지 픽셀 검토를 완료했다고 주장하지 않습니다. [임시저장 확인 PNG](evidence/2424-own-copy2089239-temp-save-confirm-pixels.png), [선택 PNG](evidence/2431-own-copy2089239-existing-draft-gate-pixels.png), [전체반영 PNG](evidence/2443-own-copy2089239-draft-fullapply-confirm-pixels.png), [상단](evidence/2453-own-copy2089239-current-pixels-0.json#L52), [중간](evidence/2454-own-copy2089239-current-pixels-800.json#L52), [하단](evidence/2455-own-copy2089239-current-pixels-1199.json#L52), [검토 기록](session-20261110-phase42.json#L1)

남은 범위는 난이도 외 누락·HTML/OMR 오류의 임시저장, 공유세트/새 HML의 CMS 임시저장, 반복 임시저장·오래된 폼·동시 편집·서버 실패/권한, 임시 DB 행의 물리삭제와 과거 상세 직접조회입니다. 단건의 정상 임시저장을 공유세트 저장으로 대체하지 않으며, 전체 사이트 완료율도 산정하지 않습니다. [공유 저장의 별도 범위](hml666-shared-passage-save-policy-20261110.md#L1), [이번 단계의 남은 범위](session-20261110-phase42.json#L1)
