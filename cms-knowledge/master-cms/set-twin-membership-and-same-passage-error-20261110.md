# 세트 쌍둥이 해제·재추가와 같은 지문 추가 오류

이 보고서는2026-11-10의 **phase47, 근거2567~2602**를 다룹니다. 자체 복제 세트의 연결을 정상 해제한 뒤, 같은 지문 형제의 활성 추가 버튼에서500 오류를 재현했습니다. 이후 서로 다른 원본 세트를 정상 추가해 두 세트8행의 관계를 복원했습니다. 확정 Master 업무는 **정상 해제1회와 정상 재추가1회로 누계60회**이며, 실패한 같은 지문 추가는 확정 변경 수에 포함하지 않았습니다. 이 정적 작업은 로컬 근거와 보존 소스만 읽었으며 브라우저·네트워크·CMS API·원장·전역 파일을 조작하지 않았습니다. **2603 이후의 복제 HTML 임시저장 조사는 포함하지 않습니다.** [범위/집계](session-20261110-phase47.json#L1), [실행 의도와 확정 결과](set-twin-membership-intent-20261110.json#L1), [오류 요약과 한계](set-twin-same-passage-add-error-20261110.json#L1)

**대상과 세 단계 결과**

앵커는 새 복제 자식2089358이며, 복제 지문2089357의 자식은2089358~2089361/R입니다. 원본 지문2089241의 자식은2089242~2089245/Y입니다. 시작 관계는 두 세트·각4행으로 총8개 문항이었고, 원본 각 문항의 생성 이력은1개·복제 각 문항은0개였습니다. [phase46 기준 관계/이력](evidence/2552-own-set-twin-original-copy-eight-memberships-read.json#L53), [phase47 시작 모달](evidence/2567-own-set-copy2089358-before-set-unlink-modal-open.json#L53), [시작 동작/개수](evidence/2568-own-set-copy2089358-before-set-unlink-inspect.json#L53)

| 실행 | 실제 요청과 관찰 | 후속 관계 |
|---|---|---|
| 정상 해제2569 | 복제 지문2089357의 PASSAGE 해제 버튼을 한 번 눌렀습니다. 앵커는2089358이었습니다. | 모든8개 문항에서 그룹0·표 없음이며, 기존 생성 이력은 유지됐습니다. [요청](evidence/2569-own-set-copy2089357-twin-unlink-once.json#L53), [8개 독립 조회](evidence/2571-own-set-copy2089357-twin-unlink-eight-memberships-read.json#L53) |
| 같은 지문 추가2580 | 지문2089357의 형제2089359가 “추가 가능”인 활성 후보였고, 정상 버튼을 한 번 눌렀습니다. XHR은500이고 HX-Trigger는 없었습니다. | 모든8개 문항은 계속 그룹0이었습니다. 현재 관계의 변경은 관측되지 않았습니다. [후보](evidence/2579-own-set-copy2089358-twin-add-default-candidate-actions.json#L52), [요청](evidence/2580-own-set-copy2089358-same-passage-add-probe-once.json#L53), [500 수신](evidence/2581-own-set-copy2089358-same-passage-add-probe-receipt.json#L52), [관계 유지](evidence/2583-own-set-copy2089358-same-passage-add-probe-membership-read.json#L53) |
| 다른 지문 재추가2590 | 원본 지문2089241의 자식2089242를 정확한 ID로 검색하고 정상 추가 버튼을 한 번 눌렀습니다. | 등록 안내·그룹2·모든8개 문항의 두 세트8행 복원을 확인했고, ResourceTiming은200을 기록했습니다. [후보 검색](evidence/2586-own-set-copy2089358-original-set-exact-search.json#L53), [요청](evidence/2590-own-set-copy2089358-readd-original-set-once.json#L53), [등록 안내](evidence/2591-own-set-copy2089358-readd-original-set-receipt.json#L52), [관계 복원](evidence/2592-own-set-copy2089358-readd-eight-memberships-read.json#L53), [응답 상태](evidence/2597-own-set-copy2089358-twin-add-resource-status-read.json#L52) |

해제 후 양쪽 세트의 모든 자식에서 그룹이0이 된 것을 확인했습니다. 이 결과만으로 물리 그룹ID가 삭제됐다거나 고아 레코드가 없다고 판단하지 않습니다. 재추가 후의 논리적인 두 세트 구성과 생성 이력 보존은 확인했지만, 이전 물리 groupId를 재사용했는지는 미확인입니다. [해제 후 조회](evidence/2571-own-set-copy2089357-twin-unlink-eight-memberships-read.json#L53), [복원 후 조회](evidence/2592-own-set-copy2089358-readd-eight-memberships-read.json#L53), [DB 미열람 한계](session-20261110-phase47.json#L1)

**후보의 표시 정책과 실제500**

추가 탭의 기본 목록은 앵커2089358을 “본인 문항”으로 표시하고 버튼을 비활성화했습니다. 비교 단건2089246도 “세트 문항 아님”으로 비활성화했습니다. 반면 같은 지문2089357의 형제2089359와 다른 원본 지문2089241의 문항2089242는 모두 “추가 가능”으로 표시되고 버튼이 활성화돼 있었습니다. 이 차이는 실제 후보 행과 버튼에서 관찰한 내용입니다. 모든 세트/상태/역할의 후보 허용 정책으로 확대하지 않습니다. [후보별 버튼](evidence/2579-own-set-copy2089358-twin-add-default-candidate-actions.json#L52)

| 후보 | 앵커와의 관계 | 표시/버튼 | 실제 실행 결과 |
|---|---|---|---|
|2089358 |앵커 본인 |본인 문항·비활성 |추가 요청을 실행하지 않았습니다. |
|2089246 |단건 |세트 문항 아님·비활성 |추가 요청을 실행하지 않았습니다. |
|2089359 |같은 지문2089357의 형제 |추가 가능·활성 |정상 버튼의 요청이500을 반환했고 그룹0이 유지됐습니다. |
|2089242 |다른 지문2089241의 자식 |추가 가능·활성 |정상 요청200과 두 세트8행 복원을 확인했습니다. |

같은 지문 요청은 `/item/all/twin-add.donga?targetItemId=2089359`이고, 관측된 앵커는2089358입니다. 버튼을 강제로 활성화하거나 직접 만든 CMS API 요청을 사용하지 않았습니다. 보존 HTML도 같은 후보 버튼에 활성 POST 경로를 선언합니다. [실제 버튼 요청](evidence/2580-own-set-copy2089358-same-passage-add-probe-once.json#L53), [보존 후보 버튼](sources/own-set-copy2089358-same-passage-add-error-20261110.html#L1178)

실제 수신 기록은 `httpStatus=500`, `received=true`, `trigger=null`입니다. 후속 ResourceTiming도 같은 target2089359의 XHR 응답 상태500을 확인합니다. 따라서 단순한 안내 문구나 관찰 도구의 timeout을 서버 오류로 오인한 사례가 아닙니다. 다만 backend 로그·스택·DB는 열람하지 않았으므로 중복 제약이나 같은 지문 병합 로직 등 **근본 원인과 내부 DB 쓰기 여부는 추정하지 않습니다.** [XHR 수신](evidence/2581-own-set-copy2089358-same-passage-add-probe-receipt.json#L52), [독립 ResourceTiming](evidence/2597-own-set-copy2089358-twin-add-resource-status-read.json#L52), [미확인 원인](set-twin-same-passage-add-error-20261110.json#L1)

**오류가 활성 추가 탭에서 보이지 않은 이유의 관찰 범위**

오류 문구는 “요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.”였으며 `#twinCurrent` 내부에 들어 있었습니다. 이때 추가 탭은 활성이고 현재 쌍둥이 탭은 비활성이었습니다. 실제 검사 값은 `activeAddTab=true`, `currentPaneActive=false`, `errorContainerVisible=false`, `visibleAlerts=[]`였습니다. 따라서 현재 탭의 DOM에 문구가 있다는 사실과 사용자가 활성 추가 탭에서 오류를 볼 수 있다는 사실을 구분합니다. [오류와 수신 상태](evidence/2581-own-set-copy2089358-same-passage-add-probe-receipt.json#L52), [실제 가시성](evidence/2585-own-set-copy2089358-probe-error-visibility.json#L52)

보존 HTML에는 비활성 `#twinCurrentPane` 안의 `#twinCurrent`에 오류 문구가 있고, `#twinAddPane`는 `active show`입니다. 같은 지문 후보의 버튼은 `hx-target="#twinCurrent"`로 선언돼 있습니다. 이 DOM 상태와 가시성 측정은 서로 대응합니다. 전체 오류 처리 구현이나 서버가 반환한 내부 원인까지 밝혔다는 뜻은 아닙니다. [비활성 현재 탭](sources/own-set-copy2089358-same-passage-add-error-20261110.html#L908), [오류 위치](sources/own-set-copy2089358-same-passage-add-error-20261110.html#L910), [활성 추가 탭](sources/own-set-copy2089358-same-passage-add-error-20261110.html#L912), [응답 교체 대상 선언](sources/own-set-copy2089358-same-passage-add-error-20261110.html#L1178)

부모 연구자는2582 PNG를 직접 열어 실패 후의 활성 추가 탭을 검토했습니다. 화면에 보이는 오류 알림이 없다는 측정과 이 검토 기록을 함께 사용합니다. [실제 추가 탭 PNG](evidence/2582-own-set-copy2089358-same-passage-add-probe-pixels.png), [부모의 검토 범위](session-20261110-phase47.json#L1)

새 파생R 복제의 상단 생성/생성 이력 버튼 미노출은 앞선 phase46의 별도 관찰입니다. 이번500은 쌍둥이 추가 탭 안에서 **활성으로 표시된 같은 지문 후보의 정상 추가 요청**에서 발생했습니다. 상단 버튼이 없어서 추가 요청이 실패했다는 인과관계나 공통 원인은 확인하지 않았습니다. [상단 버튼의 별도 관찰](evidence/2562-own-set-copy2089358-twin-current-modal-inspect.json#L53), [이번 활성 후보](evidence/2579-own-set-copy2089358-twin-add-default-candidate-actions.json#L52), [이번 실제 요청](evidence/2580-own-set-copy2089358-same-passage-add-probe-once.json#L53)

**다른 지문 재추가의 성공 근거**

원본2089242를 정확한 ID로 검색했을 때 지문2089241/4문항·승인Y·추가 가능 후보 한 건이 나왔습니다. 이 후보의 실제 버튼으로2590을 한 번 제출했습니다. `hx-target`은 같은 `#twinCurrent`이지만 targetItemId는2089242입니다. [검색/후보](evidence/2586-own-set-copy2089358-original-set-exact-search.json#L53), [활성 버튼](evidence/2587-own-set-copy2089358-original-set-candidate-actions.json#L52), [후보 소스](sources/own-set-copy2089358-original-candidate-20261110.html#L1134), [최종 제출](evidence/2590-own-set-copy2089358-readd-original-set-once.json#L53)

정상 추가의 body 위임 `afterRequest` 관찰 콜백은 수신하지 못했고 기록은 `received=false`입니다. 이를 성공/실패의 단독 근거로 사용하지 않았습니다. 실제 등록 안내와 그룹2 표시, 모든8개 문항의 독립 GET, ResourceTiming의 target2089242/200을 함께 확인했습니다. 관찰 콜백이 없다는 이유로 추가를 재제출하지 않았습니다. [등록 안내와 콜백 한계](evidence/2591-own-set-copy2089358-readd-original-set-receipt.json#L52), [8개 후속 조회](evidence/2592-own-set-copy2089358-readd-eight-memberships-read.json#L53), [서로 다른 두 응답 상태](evidence/2597-own-set-copy2089358-twin-add-resource-status-read.json#L52)

**콘텐츠·버전·상태·이력의 보존**

해제 전 원본 수정 참조2549와 복제 참조2551을 기준으로, 해제 후2572/2573 및 재추가 후2593/2594의 참조 전체가 같았습니다. 질문/공유지문 편집 모델·저장 OMR/정답·HML 슬롯/URL·상세 신원과 비교 단건 참조가 유지됐습니다. 원본 상세는2089052/2089053/2089054/2089051, 복제 상세는2089059~2089062로 그대로였습니다. 이는 모델/경로/저장값 비교이며 원격 파일 바이트를 다시 내려받은 검증은 아닙니다. [원본 기준](evidence/2549-own-set2089242-twin-copy-original-reference-read.json#L53), [복제 기준](evidence/2551-own-set-copy2089357-all-reference-read.json#L53), [해제 후 원본](evidence/2572-own-set-copy2089357-twin-unlink-original-reference-read.json#L53), [해제 후 복제](evidence/2573-own-set-copy2089357-twin-unlink-copy-reference-read.json#L53), [복원 후 원본](evidence/2593-own-set-copy2089358-readd-original-reference-read.json#L53), [복원 후 복제](evidence/2594-own-set-copy2089358-readd-copy-reference-read.json#L53)

원본4개는Y, 복제4개는R을 유지했습니다. 생성 이력은 해제 후·500 후·재추가 후 모두 원본 각1개/복제 각0개이며, 기존 이력의 반환 내용도 같았습니다. 재추가가 새 쌍둥이 생성 이력을 만든 것으로 기록하지 않습니다. 현재 관계8행의 내용도 기준과 같았습니다. [해제 후 원본/상태](evidence/2574-own-set-copy2089357-twin-unlink-original-detail-read.json#L53), [해제 후 복제/상태](evidence/2575-own-set-copy2089357-twin-unlink-copy-detail-read.json#L53), [500 후 관계/이력](evidence/2583-own-set-copy2089358-same-passage-add-probe-membership-read.json#L53), [복원 후 관계/이력](evidence/2592-own-set-copy2089358-readd-eight-memberships-read.json#L53), [복원 후 원본Y](evidence/2595-own-set-copy2089358-readd-original-detail-read.json#L53), [복원 후 복제R](evidence/2596-own-set-copy2089358-readd-copy-detail-read.json#L53)

부모는2589의 다른 지문 후보와2599의 복원된 그룹 PNG도 직접 검토했습니다. 현재 쌍둥이 탭을 실제로 열어 두 세트8행을 확인한 뒤 모달을 닫았고, 최종 열린 모달/미저장 작업은 없습니다. 이 단계의 세 PNG는 해당 후보/실패/그룹 상태에 한정합니다. 내용 상세의 전체 세로 PNG는 phase46의 이전 상태 근거입니다. [다른 지문 후보 PNG](evidence/2589-own-set-copy2089358-original-set-candidate-pixels.png), [현재 탭 열기](evidence/2598-own-set-copy2089358-restored-current-tab-open.json#L52), [복원 그룹 PNG](evidence/2599-own-set-copy2089358-restored-two-set-pixels.png), [복원된 소스](sources/own-set-copy2089358-restored-twin-group-20261110.html#L908), [닫기](evidence/2601-own-set-copy2089358-restored-group-modal-close.json#L52), [최종 DOM](evidence/2602-own-set-copy2089358-membership-final-visual-state.json#L53)

**확정 결과와 후속 검증**

확정한 문제는 이 표본에서 같은 지문 형제가 추가 가능으로 표시된 뒤500을 반환하고, 오류 문구가 비활성 탭에 있어 활성 탭에서 보이지 않았다는 점입니다. 후속 QA에서는 같은 지문 후보를 허용해야 하는지의 기대 정책, 후보의 비활성/제외 또는 명시적인 서버 거절, 실패 안내가 활성 탭에서 보이는지, 실패 뒤 데이터/관계가 보존되는지를 나눠 검증해야 합니다. 기능 수정이나 추가 재현은 이 작업에서 수행하지 않았습니다. [확정 오류 범위](set-twin-same-passage-add-error-20261110.json#L1), [후속 범위](session-20261110-phase47.json#L1)

서버 로그/DB·다른 계정/역할·다른 세트 수/상태·서로 다른 기존 그룹 병합·세트AI·복제 후 편집 격리·공유 임시저장·Service CMS와 실제 배포는 별도 남아 있습니다.500 후 조회 가능한 현재 관계가0으로 유지됐다는 사실로 내부 DB 쓰기 전체가 없었다고 단정하지 않습니다. 정리 시나리오의 로컬 문법오류는 브라우저 실행 전에 발생했고, 수정 후2597부터 처음 실행했으므로 사이트 추가를 재제출한 기록도 아닙니다. 전체 사이트 완료율은 산정하지 않습니다. [검증 한계/기록 보정](session-20261110-phase47.json#L1)
