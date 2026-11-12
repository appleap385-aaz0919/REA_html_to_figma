# 복제 세트의 공유 HTML 임시저장과 반영 격리

이 보고서는2026-11-10의 **phase48~49, 근거2603~2643**을 다룹니다. 복제 세트의 첫 자식2089358에서 공유 HTML 지문에 식별문구를 입력해 **CMS 임시저장1회(누계61)**를 수행한 뒤, 실제 임시본을 선택해 **전체반영1회(누계62)**를 실행했습니다. 임시저장과 전체반영의 적용 범위는 서로 달랐고, 이 HTML 저장 표본에서는 원본 세트가 보존됐습니다. 이 정적 작업은 로컬 근거/보존 소스만 읽었으며 브라우저·네트워크·CMS API·원장·전역 파일을 조작하지 않았습니다. [phase48](session-20261110-phase48.json#L1), [phase49](session-20261110-phase49.json#L1), [실행 의도/결과](copied-set-shared-temp-isolation-intent-20261110.json#L1), [비교 결과](copied-set-shared-temp-isolation-comparison-20261110.json#L1)

**논리 지문ID와 계승된 문서 키**

복제 세트의 논리 지문ID는 **2089357**이고 자식은2089358~2089361/R입니다. 원본은 지문2089241·자식2089242~2089245/Y입니다. 그러나 복제 공유지문 모델의 내부 `passageKey`는 생성 당시 원본의 **`passage:2089241`**을 계승했고 이번 저장 전후에도 같았습니다. 실제 편집기 제목에도 원본 키가 표시된 장면을 부모가2612 PNG에서 검토했습니다. 화면 외곽의 지문ID2089357·내부 모델 키·편집기 제목을 구분해야 합니다. [실제 편집 전 모델](evidence/2608-own-copy2089358-shared-html-before-edit.json#L53), [논리ID/편집 후 모델](evidence/2612-own-copy2089358-shared-html-marker-verified-pixels.json#L53), [논리ID 표시 소스](sources/own-copy2089358-shared-temp-marker-20261110.html#L2287), [초기 내부 모델](sources/own-copy2089358-before-shared-temp-20261110.html#L6163), [편집 화면 PNG](evidence/2612-own-copy2089358-shared-html-marker-verified-pixels.png), [부모 검토 기록](session-20261110-phase48.json#L1)

내부 키가 같다는 사실만으로 두 논리 지문이 같은 DB 레코드이거나 저장이 원본까지 바꾼다고 추정하지 않았습니다. 실제 저장 범위는 아래의 원본/복제/비교 단건 후속 조회로 판정했습니다. 서버의 지문 선택 구현과 모든 `passageKey` 사용처는 열람하지 않았습니다. [실제 격리 결과와 한계](copied-set-shared-temp-isolation-comparison-20261110.json#L1), [phase49 한계](session-20261110-phase49.json#L1)

**임시저장61: 선택 자식에만 임시본**

시작 시 원본4개·복제4개·비교 단건2089246의 총9개 문항은 모두 `hasDraft=false`였습니다. 명시적 `draft=Y` GET도 모두 `loadDraft=false`로 각 현행 상세를 반환했습니다. [9개 draft-check](evidence/2603-own-original-copy-set-before-shared-temp-draft-checks.json#L53), [9개 명시Y 조회](evidence/2604-own-original-copy-set-before-shared-temp-explicit-draft-read.json#L53)

정상 수정 링크와 HTML 탭을 열고 공유지문의 실제 ProseMirror에 포커스해 끝으로 이동한 뒤 `[QA-COPY-SHARED-DRAFT-20261110]`을 덧붙였습니다. 질문과 OMR은 그대로였고 HML/이미지의8개 pending 값은 모두 비었습니다. 정상 임시저장 확인창을 연 뒤2615에서 최종 임시저장을 한 번 실행했습니다. [실제 탭](evidence/2607-own-copy2089358-shared-html-tab-open.json#L53), [입력 확인](evidence/2612-own-copy2089358-shared-html-marker-verified-pixels.json#L53), [확인창](evidence/2613-own-copy2089358-shared-temp-confirm-open.json#L53), [최종 임시저장](evidence/2615-own-copy2089358-shared-temp-submit-once.json#L53)

| 대상 |임시저장 후 draft-check |명시적 draftY/현행 결과 |
|---|---|---|
|선택 자식2089358 |true이며 저장시각은2026-11-10 11:41입니다. |임시 상세2089077/`loadDraft=true`에 새 공유 HTML 문구가 있었습니다. |
|다른 복제 자식2089359~2089361 |전부false였습니다. |각 기존 현행2089060~2089062/`loadDraft=false`를 반환했습니다. |
|원본2089242~2089245 |전부false였습니다. |기존2089052/2089053/2089054/2089051을 반환했습니다. |
|비교 단건2089246 |false였습니다. |기존2088877을 반환했습니다. |

표는9개 후속 draft-check와 명시Y 조회를 근거로 합니다. 임시2089077은 선택한 자식의 임시본이며 공유 세트의 모든 형제에 임시본이 생긴 것은 아닙니다. 서버에 저장된 임시본을 브라우저의 미저장 입력과도 구분합니다. [임시 존재 범위](evidence/2617-own-original-copy-set-after-temp-draft-checks.json#L53), [임시/현행의 실제 신원](evidence/2618-own-original-copy-set-after-temp-explicit-draft-read.json#L53)

임시저장 후에도 원본/복제의 **현행** 수정 참조와 상세 전체는 저장 전과 같았습니다. 복제 현행은2089059~2089062/R, 원본은 기존 네 상세/Y였고, 질문/공유지문·OMR·HML·그룹 표시도 유지됐습니다. 즉 새 문구가 임시본에 있다는 사실을 현행 게시 결과로 올리지 않았습니다. [현행 원본 참조](evidence/2619-own-original-set-after-copy-temp-current-reference-read.json#L53), [현행 복제 참조](evidence/2620-own-copied-set-after-temp-current-reference-read.json#L53), [원본 상세](evidence/2621-own-original-set-after-copy-temp-current-detail-read.json#L53), [복제 상세](evidence/2622-own-copied-set-after-temp-current-detail-read.json#L53), [기준 원본](evidence/2593-own-set-copy2089358-readd-original-reference-read.json#L53), [기준 복제](evidence/2594-own-set-copy2089358-readd-copy-reference-read.json#L53)

**실제 임시본 선택과 전체반영62**

정상 수정으로 재진입하자 저장시각과 두 버전 선택 버튼이 있는 `draftLoadModal`이 열렸습니다. 실제 “임시저장 수정하기”를 선택한 뒤 HTML 탭에서 임시2089077의 문구를 복원했고, 논리 지문ID는2089357·내부 키는2089241 그대로였습니다. 질문/OMR도 원래 값이며 HML pending은 비었습니다. “검수완료 수정하기”라는 대안 문구를 Master 승인Y와 같은 의미로 해석하지 않습니다. [실제 선택창](evidence/2623-own-copy2089358-shared-draft-gate-open.json#L53), [임시본 선택](evidence/2624-own-copy2089358-shared-draft-version-choose.json#L52), [선택 후 실제 값](evidence/2626-own-copy2089358-shared-draft-restored-review.json#L53)

정상 전체반영 확인창과 “저장하시겠습니까?” 안내를 확인하고2629에서 최종 저장을 한 번 실행했습니다. 확인창 열기2627/PNG2628과 최종 제출2629를 구분합니다. [확인창](evidence/2627-own-copy2089358-shared-draft-apply-confirm-open.json#L53), [확인 PNG](evidence/2628-own-copy2089358-shared-draft-apply-confirm-pixels.png), [최종 전체반영](evidence/2629-own-copy2089358-shared-draft-apply-submit-once.json#L53)

| 복제 자식 |적용 전 현행 |선택 임시본 |적용 후 현행 |상태 |
|---|---:|---:|---:|---|
|2089358 |2089059 |2089077 |2089078 |R |
|2089359 |2089060 |없음 |2089079 |R |
|2089360 |2089061 |없음 |2089080 |R |
|2089361 |2089062 |없음 |2089081 |R |

선택 자식의 저장된 임시본을 전체반영하자 복제 네 자식의 현행 상세가 함께 갱신됐습니다. 각 수정폼의 공유지문 모델에서 바뀐 경로는 **`content.promptText`와 `content.passageHtml` 두 개뿐**입니다. 다른 지문 필드와 네 질문 모델·저장 OMR/정답·HML 슬롯/URL은 기준과 같았습니다. 네 자식의 내부 `passageKey`도 계속 `passage:2089241`입니다. [복제 후속 참조](evidence/2634-own-copied-set-after-apply-current-reference-read.json#L53), [복제 후속 상세/R](evidence/2636-own-copied-set-after-apply-current-detail-read.json#L53), [변경 경로 대조](copied-set-shared-temp-isolation-comparison-20261110.json#L1), [공개된 공유지문 모델](sources/own-copy2089358-shared-html-published-20261110.html#L414)

원본 세트의 현재 수정 참조와 상세 전체는 기준2593/2595와 같았습니다. 원본4Y·기존 네 상세·기존 공유문구·HML/OMR과 비교 단건2089246도 유지됐습니다. 이 한 HTML 정상 저장 경로에서 복제 공유지문 변경의 격리를 실제로 확인한 것입니다. HML 실제 편집이나 모든 문서키 사용처/권한/서비스 저장으로 확대하지 않습니다. [기준 원본 참조](evidence/2593-own-set-copy2089358-readd-original-reference-read.json#L53), [기준 원본 상세](evidence/2595-own-set-copy2089358-readd-original-detail-read.json#L53), [적용 후 원본 참조](evidence/2633-own-original-set-after-copy-apply-current-reference-read.json#L53), [적용 후 원본 상세](evidence/2635-own-original-set-after-copy-apply-current-detail-read.json#L53)

전체반영 뒤9개 `draft-check`는 모두false였고, 명시적 `draft=Y`도 각 현행/`loadDraft=false`를 반환했습니다. 원본/복제8문항의 두 세트 관계와 생성 이력도 기준2592와 같았습니다. 임시본이 현재 조회되지 않는 것을 과거 DB 행의 물리삭제로 단정하지 않습니다. [9개 임시본 검사](evidence/2631-own-original-copy-set-after-apply-draft-checks.json#L53), [9개 명시Y fallback](evidence/2632-own-original-copy-set-after-apply-explicit-draft-read.json#L53), [관계/이력 보존](evidence/2637-own-original-copy-set-after-apply-membership-read.json#L53), [기준 관계/이력](evidence/2592-own-set-copy2089358-readd-eight-memberships-read.json#L53)

**프런트엔드 선언과 실제 결과의 구분**

보존한 수정 소스는 현재 편집기가 있으면 거기서 문서를 추출하고, 없으면 저장 모델을 읽습니다. 질문/지문을 함께 수집한 뒤 payload에 `itemId`, `loadDraft`, `questionData`, `passageData`, 검색용 content, 메타와 OMR을 구성합니다. 내부 `passageKey`는 이 문서 JSON의 값이고, 실제 논리 지문 선택의 서버 구현을 소스에서 확인한 것은 아닙니다. [문서 추출](sources/own-copy2089358-before-shared-temp-20261110.html#L7393), [질문/지문 수집](sources/own-copy2089358-before-shared-temp-20261110.html#L7406), [payload](sources/own-copy2089358-before-shared-temp-20261110.html#L7487)

임시저장은 `collectDocs(false)` 뒤 `temp-save.donga`로, 전체반영은 필수/문서/OMR 검사를 거친 확인창 이후 `apply-all.donga`로 진행합니다. HML 필드는 각 슬롯의 pending 값을 사용하며 비어 있으면null을 보냅니다. 이번 실행은 새 HML을 편집하거나 pending 파일을 만든 것이 아닙니다. 실제 후속 조회에서 HML 참조가 그대로였다는 결과와 프런트엔드 선언을 구분합니다. [HML 필드 구성](sources/own-copy2089358-before-shared-temp-20261110.html#L7458), [임시저장](sources/own-copy2089358-before-shared-temp-20261110.html#L7658), [전체반영](sources/own-copy2089358-before-shared-temp-20261110.html#L7666), [비어 있는 pending/실제 복원값](evidence/2626-own-copy2089358-shared-draft-restored-review.json#L53), [적용 후 참조](evidence/2634-own-copied-set-after-apply-current-reference-read.json#L53)

**픽셀·이미지와 hidden 상태**

부모 연구자는2612의 실제 편집 화면과2628의 저장 확인창 PNG를 직접 검토했습니다. 최종 상세는2640~2643의 위치0/800/1600/1779·뷰포트높이1015로 전체2794px를 겹쳐 덮습니다. 부모는 네 PNG를 직접 열어 새 복제 HTML 문구·기존 HML 지문 미리보기·네 자식·상태/메타/하단을 확인했습니다.9개 이미지는 모두 로드 완료이고 크기가 양수였으며 가로 넘침은 관측되지 않았습니다. [편집 PNG](evidence/2612-own-copy2089358-shared-html-marker-verified-pixels.png), [확인창 PNG](evidence/2628-own-copy2089358-shared-draft-apply-confirm-pixels.png), [최종 DOM](evidence/2638-own-copy2089358-after-shared-isolation-visual-state.json#L53), [상단/이미지](evidence/2640-own-copy2089358-after-shared-isolation-pixels-0.json#L52), [800](evidence/2641-own-copy2089358-after-shared-isolation-pixels-800.json#L52), [1600](evidence/2642-own-copy2089358-after-shared-isolation-pixels-1600.json#L52), [하단](evidence/2643-own-copy2089358-after-shared-isolation-pixels-bottom.json#L52), [직접 검토 기록](session-20261110-phase49.json#L1)

최종 캡처 당시 문서의 visibility는hidden이었습니다. **이번 네 캡처는 정상 반환됐고 실제 내용이 검토됐으므로 이 상태의 세로 픽셀 근거로 인정합니다.** 이전에 숨김 상태에서 실패한 캡처를 성공으로 바꾸거나, hidden이면 항상 캡처할 수 있다고 보장하지 않습니다. 이 정적 작업은 부모의 검토 기록을 인용했으며 이미지를 새로 직접 검사한 것은 아닙니다. [hidden 값/캡처 결과](evidence/2640-own-copy2089358-after-shared-isolation-pixels-0.json#L52), [성공 범위와 한계](session-20261110-phase49.json#L1)

이번 결과로 해소한 잔여 범위는 **복제된 공유 HTML의 CMS 임시저장→실제 임시본 선택→전체반영과 원본 보존**입니다. 실제 HML 파일을 편집한 복제 후 파일 격리·새 HML 결과를 가진 공유 임시저장·다른 HML 슬롯/번역 실파일·서버 실패/경합·DB 물리삭제·다른 권한/Service는 별도 미검증입니다. 세트AI·서로 다른 기존 그룹 병합·Definition 복합자료도 남아 있습니다. 새 문구는 자체 복제QA 세트에 남겼고 원본/서비스 변경으로 기록하지 않았습니다. 전체 완료율은 산정하지 않습니다. [남은 범위/제한](session-20261110-phase49.json#L1), [구체적인 비교 한계](copied-set-shared-temp-isolation-comparison-20261110.json#L1)
