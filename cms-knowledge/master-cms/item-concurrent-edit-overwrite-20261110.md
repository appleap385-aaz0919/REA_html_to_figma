# 문항 동시 수정의 오래된 폼 덮어쓰기 재현

작성일은2026-11-10이며 범위는 **phase43/cutoff2494**입니다. 같은 계정으로 자체 R 복제문항 **2089239**의 정상 수정폼 두 개를 연 뒤 A→B 순서로 전체반영한 결과, **B에서 수정하지 않은 과거 난이도3이 A가 먼저 저장한 난이도4를 덮었습니다.** B의 실제 변경은 OMR 정답④→⑤였고, 저장 후 현행은2089013/R·난이도3·정답⑤였습니다. 관찰한 정상 저장 흐름에서는 충돌 안내가 나타나지 않았습니다. [단계 요약/범위](session-20261110-phase43.json#L1), [검증 의도/결과](own-copy2089239-concurrent-edit-intent-20261110.json#L1), [B의 변경 필드](evidence/2471-own-copy2089239-concurrent-b-omr-five-local.json#L53), [B 제출](evidence/2474-own-copy2089239-concurrent-b-stale-submit-once.json#L53), [저장 결과](evidence/2476-own-copy2089239-concurrent-b-stale-server-read.json#L53)

이번 정적 작업은 로컬 JSON의 실제 결과와 보존 HTML만 읽었습니다. 브라우저·네트워크·CMS API·원장·전역 파일을 조작하지 않았고, 기능 수정도 수행하지 않았습니다. phase43의 확정 Master 업무는 **A 전체반영·B 전체반영·정답 복원 전체반영의3회**이며 누계는53회입니다. 버전ID 증가량이나 DB 행 변경 수를 뜻하지 않습니다. [실행 범위/집계](session-20261110-phase43.json#L1)

**재현 전제와 화면 신원**

대상은 COPY로 만든 단건 복제문항2089239이며, Master 상태는R입니다. phase42가 끝난 현행2089006·난이도3/중·OBSACN 정답④를 기준으로 사용했습니다. 기존 조사탭A와 새 테스트탭B(`t60`)는 같은 계정의 정상 수정화면이었고, A의 편집기 URL과 B의 편집기 URL 모두 상세2089006을 가리켰습니다. A/B는 필수 누락이 없고 OMR 유효성 메시지도 없는 상태였습니다. [phase42 현행 기준](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53), [A 폼 기준](evidence/2457-own-copy2089239-concurrent-form-a-baseline.json#L53), [B 생성](evidence/2458-own-copy2089239-concurrent-form-b-new-tab.json#L36), [B 폼 기준](evidence/2459-own-copy2089239-concurrent-form-b-baseline.json#L53), [B 상세 신원](evidence/2460-own-copy2089239-concurrent-form-b-omr-controls.json#L52), [A 상세 신원](evidence/2462-own-copy2089239-concurrent-a-difficulty-local.json#L53)

두 폼을 동시에 열어 둔 뒤 저장은 A→B 순서로 수행했습니다. POST가 동시에 도착하는 부하 상황, 다른 계정의 경쟁, DB 트랜잭션 간 잠금 경쟁까지 실험한 것은 아닙니다. [재현 절차와 한계](session-20261110-phase43.json#L1)

**실제 실행 순서**

| 단계 | 폼에서 수행한 동작 | 독립 조회로 확인한 결과 |
|---|---|---|
| 1. 기준 | A/B 모두2089006·난이도3·정답④를 로드했습니다. | 같은 시작값의 두 정상 수정폼을 확인했습니다. [A](evidence/2457-own-copy2089239-concurrent-form-a-baseline.json#L53), [B](evidence/2459-own-copy2089239-concurrent-form-b-baseline.json#L53), [B 버전](evidence/2460-own-copy2089239-concurrent-form-b-omr-controls.json#L52) |
| 2. A 로컬 수정 | A에서 난이도만3→4/상으로 바꿨습니다. 정답④는 유지했습니다. | 아직 로컬 변경 단계입니다. [변경값](evidence/2462-own-copy2089239-concurrent-a-difficulty-local.json#L53) |
| 3. A 전체반영 | 정상 전체반영 확인창을 열고 최종 저장을 한 번 실행했습니다. | 현행2089011/R·난이도4·정답④가 됐고 임시본은 없었습니다. [확인창](evidence/2463-own-copy2089239-concurrent-a-confirm-open.json#L53), [제출2464](evidence/2464-own-copy2089239-concurrent-a-submit-once.json#L53), [서버 조회](evidence/2466-own-copy2089239-concurrent-a-server-read.json#L53), [임시본 없음](evidence/2467-own-copy2089239-concurrent-a-draft-check.json#L53) |
| 4. 오래된 B 유지 | B를 새로고침하지 않았습니다. B의 DOM은 여전히 난이도3·정답④였고, 이후 로컬 확인에서도 로드 상세2089006이었습니다. | 같은 B에서 별도로 조회한 서버 현행은2089011·난이도4였습니다. 화면에 남은 과거 값과 현행 값을 분리해 확인했습니다. [오래된 DOM](evidence/2469-own-copy2089239-concurrent-b-still-old-form.json#L53), [현행 독립 조회](evidence/2470-own-copy2089239-concurrent-b-latest-server-read.json#L53), [로드 상세/미수정 난이도](evidence/2471-own-copy2089239-concurrent-b-omr-five-local.json#L53) |
| 5. B의 별도 변경 | B의 OMR 탭에서 정답 라디오만④→⑤로 바꿨습니다. 난이도3은 건드리지 않았고 선택지 다섯 개도 같았습니다. 정상 전체반영 확인창이 열렸습니다. | 로컬 정답⑤·미수정 난이도3·로드 상세2089006을 확인했습니다. [변경과 유효성](evidence/2471-own-copy2089239-concurrent-b-omr-five-local.json#L53), [확인창](evidence/2472-own-copy2089239-concurrent-b-confirm-open.json#L53) |
| 6. B 전체반영 | 오래된 B에서 최종 저장을 한 번 실행했습니다. | 정상 반영 안내 후 현행2089013/R·난이도3·정답⑤가 됐고 임시본은 없었습니다. A가 먼저 저장한 난이도4가 유지되지 않았습니다. [제출2474](evidence/2474-own-copy2089239-concurrent-b-stale-submit-once.json#L53), [착지 UI](evidence/2475-own-copy2089239-concurrent-b-stale-post-ui.json#L250), [서버 결과](evidence/2476-own-copy2089239-concurrent-b-stale-server-read.json#L53), [임시본 없음](evidence/2477-own-copy2089239-concurrent-b-stale-draft-check.json#L53) |
| 7. 정답 복원 | 최신2089013에서 정상 수정으로 재진입해 시험용 정답⑤만④로 바꿨습니다. 난이도3은 유지하고 전체반영을 한 번 실행했습니다. | 현행2089019/R·난이도3·정답④가 됐습니다. 임시본도 없었습니다. [재진입 값](evidence/2480-own-copy2089239-concurrent-restore-live-state.json#L53), [복원 로컬값](evidence/2481-own-copy2089239-concurrent-omr-four-restore-local.json#L53), [확인창](evidence/2482-own-copy2089239-concurrent-restore-confirm-open.json#L53), [제출2483](evidence/2483-own-copy2089239-concurrent-restore-submit-once.json#L53), [저장 결과](evidence/2485-own-copy2089239-concurrent-restore-server-read.json#L53), [임시본 없음](evidence/2486-own-copy2089239-concurrent-restore-draft-check.json#L53) |

관측값을 필드별로 비교하면 다음과 같습니다. B가 난이도를 수정하지 않았다는 로컬 기록과 서버의 저장 결과를 함께 근거로 사용했습니다. [B 로컬 기록](evidence/2471-own-copy2089239-concurrent-b-omr-five-local.json#L53), [A 저장 후](evidence/2466-own-copy2089239-concurrent-a-server-read.json#L53), [B 저장 후](evidence/2476-own-copy2089239-concurrent-b-stale-server-read.json#L53), [복원 후](evidence/2485-own-copy2089239-concurrent-restore-server-read.json#L53)

| 상태 | 현행 상세ID | 난이도 | 저장 정답 | Master 상태 |
|---|---:|---|---|---|
| 시작 |2089006 |3/중 |④ |R |
| A 저장 후 |2089011 |4/상 |④ |R |
| B 저장 직전의 오래된 폼 |로드2089006 |3/중, 미수정 |⑤, B가 변경 |R 문항의 수정폼 |
| B 저장 후 |2089013 |3/중 |⑤ |R |
| 정답 복원 후 |2089019 |3/중 |④ |R |

B 저장 후 UI에는 “문항에 반영 되었습니다.”라는 정상 안내가 기록돼 있습니다. 해당 흐름에서 충돌 안내는 관측되지 않았습니다. 보존 상세 소스도2089013/R를 표시합니다. 이는 이번 저장이 과거 폼의 난이도를 포함해 수락됐다는 실측 근거이며, 모든 조건의 충돌 처리가 없다는 전역 보장은 아닙니다. [착지 안내](evidence/2475-own-copy2089239-concurrent-b-stale-post-ui.json#L250), [B 결과 상세ID](sources/own-copy2089239-concurrent-stale-result-20261110.html#L580), [B 결과R](sources/own-copy2089239-concurrent-stale-result-20261110.html#L546), [재현 범위](session-20261110-phase43.json#L1)

**클라이언트 payload와 버전 비교 필드**

보존한 오래된 B 수정 HTML의 `buildPayload(docs)`는 `itemId`·`loadDraft`와 현재 폼의 난이도·문항형태·썸네일·질문/지문 문서·OMR/정답·단원/성취/영역/역량/행동/개념 코드를 구성하고, HML/이미지 슬롯 필드를 합칩니다. 난이도는 변경 여부와 관계없이 `selVal('mfDifficulty') || null`로 읽습니다. 이 함수에는 수정된 필드만 보내는 목록이 없고, 기준 상세ID·예상 버전·수정시각을 비교하기 위한 필드도 보이지 않습니다. `loadDraft`는 기준 소스에서false이며, 확정/임시 선택 정보입니다. [payload 구성](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7252), [난이도 값](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7259), [HML 슬롯 합성](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7223), [loadDraft](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7108)

`save()`는 `JSON.stringify(buildPayload(docs))`를 POST body로 보내며, 조사한 헤더 구성은 JSON Content-Type과 CSRF 헤더입니다. 여기에 `If-Match`나 ETag를 전달하는 코드는 보이지 않습니다. 전체반영 진입은 필수 메타→HTML 문서 수집/검증→OMR 검사→확인창 순서이며, 조사한 저장 경로에서 현행 버전을 새로 읽어 비교하는 단계는 찾지 못했습니다. 이 설명은 보존한 프런트엔드 코드의 범위입니다. 실제 요청 전체의 헤더를 별도 패킷으로 수집하거나 서버 구현을 열람한 결과는 아닙니다. [CSRF 헤더 구성](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7277), [POST 구성](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7314), [필수 검사](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7397), [전체반영 순서](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7431)

폼에 상세2089006이 전혀 없는 것은 아닙니다. HML 편집기 버튼의 URL과 `data-item-detail-id`에는2089006이 들어 있고, 팝업 저장 메시지를 받을 때 문항/상세 신원을 대조합니다. 이 대조는 팝업 결과와 현재 화면의 신원을 맞추는 장치입니다. 같은 화면이 서버의 최신 현행본인지 비교하는 조건으로 `buildPayload`에 전달되지는 않습니다. 이번 재현은 HML 팝업을 조작하지 않았으며, 해당 신원 대조가 동시 저장을 차단했다는 결과도 없습니다. [편집기 상세 신원](sources/own-copy2089239-concurrent-stale-form-20261110.html#L6379), [팝업 신원 대조](sources/own-copy2089239-concurrent-stale-form-20261110.html#L6768), [CMS payload](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7252), [실제 변경 범위](own-copy2089239-concurrent-edit-intent-20261110.json#L1)

클라이언트는 HTTP 오류/redirect와 `HX-Trigger.showToast`의 서버 반려를 검사하고, 성공 시 상세로 이동해 반영 안내를 표시하도록 선언돼 있습니다. 이번 B 흐름은 정상 안내와 새 현행본을 함께 확인했습니다. **backend 코드·DB 잠금·트랜잭션 격리수준·서버의 모든 버전 검사 정책은 열람하지 않았습니다.** 따라서 “서버에 잠금이 전혀 없다”는 원인 판정 대신, 이 표본에서 오래된 정상 폼의 저장이 수락돼 선행 메타를 덮었다고 기록합니다. [응답 처리](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7324), [성공/실패 이동](sources/own-copy2089239-concurrent-stale-form-20261110.html#L7348), [실제 UI](evidence/2475-own-copy2089239-concurrent-b-stale-post-ui.json#L250), [독립 조회](evidence/2476-own-copy2089239-concurrent-b-stale-server-read.json#L53)

**복원과 통제 대상**

복원은 최신2089013에서 OMR 정답⑤만④로 바꾸는 한 번의 정상 전체반영이었습니다. A의 시험 난이도4는 B가 이미 기준값3으로 덮은 상태였으므로 복원에서 다시 수정하지 않았습니다. 최종2089019/R·난이도3·정답④는 phase42 현행2089006과 비교할 때 표시값·질문 문서/뷰어 모델·지문 값·HML 경로·저장 OMR/정답이 같고 문항 상세ID가 다릅니다. 이 단건의 지문 문서 값은 비교 전후 모두null입니다. [기준](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53), [복원 수정값](evidence/2481-own-copy2089239-concurrent-omr-four-restore-local.json#L53), [복원 제출](evidence/2483-own-copy2089239-concurrent-restore-submit-once.json#L53), [최종 재조회](evidence/2490-own-copy2089239-concurrent-final-server-read.json#L53), [보존 상세ID](sources/own-copy2089239-concurrent-restored-20261110.html#L580)

로컬 응답 대조에서 A 저장 후에는 난이도만4가 되고 질문/지문·OMR 선택지·정답④가 유지됐습니다. B 저장 후에는 질문/지문·OMR 선택지·HML 경로가 유지되고 정답만⑤가 됐습니다. 복원 후 기본 수정폼의 저장 문서/OMR 묶음은 phase42 기준과 같았습니다. 이는 모델/값/경로의 비교이며, 이 단계에서 원격 HML/PNG를 다시 내려받아 바이트를 검증한 것은 아닙니다. [기준](evidence/2446-own-copy2089239-draft-fullapply-server-read.json#L53), [A 결과](evidence/2466-own-copy2089239-concurrent-a-server-read.json#L53), [B 결과](evidence/2476-own-copy2089239-concurrent-b-stale-server-read.json#L53), [최종 결과](evidence/2490-own-copy2089239-concurrent-final-server-read.json#L53)

관련 원문2089216은2088849/Y·출처 한 개·기존 OMR/정답④를 유지했고, 평가지1093도1124/사용Y·멤버2089216 한 개를 유지했습니다. 원문 출처13의 보존은 phase43 통합 기록에도 명시돼 있습니다. [원문 대조](evidence/2491-own-copy2089239-concurrent-anchor-control-read.json#L53), [평가지 대조](evidence/2492-own-copy2089239-concurrent-paper-control-read.json#L53), [통합 기록](session-20261110-phase43.json#L1)

테스트 종료 시 연구에서 만든 B탭 `t60`만 닫았고 원래 조사탭을 남겼습니다. A를 현행2089019 상세로 다시 연 최종 DOM에는 열린 모달과 가로 넘침이 없었으며 문서높이는2214px였습니다. phase43에서는 새 PNG를 촬영하지 않았으므로 최종2089019의 전체 세로 픽셀 검토를 완료했다고 쓰지 않습니다. phase42의 PNG는 이전2089006 시점의 근거입니다. [B탭 닫기](evidence/2488-own-copy2089239-concurrent-close-owned-test-tab.json#L36), [현행 최종 읽기](evidence/2490-own-copy2089239-concurrent-final-server-read.json#L53), [최종 DOM 상태](evidence/2494-own-copy2089239-concurrent-final-visual-state.json#L53), [이미지 한계](session-20261110-phase43.json#L1)

**QA 회귀 시나리오와 기대 정책의 구분**

현재 재현으로 확정한 것은 “같은 계정의 R 복제 단건에서 오래된 정상 수정폼이 저장돼, B가 건드리지 않은 필드까지 과거 값으로 덮였다”는 동작입니다. 이것을 의도한 최종 저장 우선 정책으로 볼지, 충돌 차단이나 필드별 병합이 필요한 결함으로 볼지는 제품 정책의 확인이 필요합니다. 아래 기대 결과는 아직 구현되거나 재검증된 결과가 아닙니다. [확정된 재현 범위](session-20261110-phase43.json#L1), [재현 의도](own-copy2089239-concurrent-edit-intent-20261110.json#L1)

| 회귀 시나리오 | 준비/동작 | 확인할 결과와 상태 |
|---|---|---|
| 이번 재현 재검증 | 동일 기준으로 A/B를 열고 A의 난이도4 저장을 독립 조회합니다. B를 갱신하지 않은 채 정답⑤만 바꿔 저장합니다. | 현재 관찰값은 난이도3/정답⑤입니다. 정책 변경 후에는 합의한 충돌/병합 정책과 비교해야 합니다. |
| 충돌 차단을 채택할 경우 | 서버 현행과 다른 기준 버전의 B를 저장합니다. | 저장을 명확히 거절하고 A의 난이도4를 유지하며, B의 정답⑤를 잃지 않도록 재조회/재적용 절차를 제공하는지 확인해야 합니다. 이는 제안하는 기대 정책입니다. |
| 필드별 병합을 채택할 경우 | A는 난이도만, B는 정답만 변경합니다. | 합의된 조건에서 난이도4와 정답⑤를 함께 보존하는지 확인해야 합니다. 같은 필드를 양쪽에서 바꾸는 별도 충돌 정책도 필요합니다. 이는 미검증입니다. |
| 최신 폼의 정상 저장 | A 저장 후 새로 연 현행 폼에서 정답만 바꿉니다. | 충돌 처리 추가로 정상 저장이 막히지 않는지 확인합니다. 이번 오래된 B와 구분하는 후속 시나리오입니다. |
| 추가 경계 | 다른 계정/역할·R 외 상태·임시본·공유세트·HTML/HML 변경·실제 동시 POST를 각각 분리합니다. | 이번 한 표본으로 결과를 예상하지 않고 저장 응답·후속 현행값·관련 문항/자산을 대조해야 합니다. 모두 후속 검증 범위입니다. |

위 회귀표는 후속 QA 설계입니다. 본 작업에서는 수정·새 테스트·서비스 배포를 실행하지 않았고, 다른 상태/역할/세트/Service CMS의 전역 보장이나 전체 사이트 완료율을 주장하지 않습니다. [남은 범위](session-20261110-phase43.json#L1)
