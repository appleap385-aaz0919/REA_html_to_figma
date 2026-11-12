# 복사 세트 공유 HML의 파일 격리와 임시저장·전체반영

이 보고서는 2026-11-10의 phase61~63, 근거2923~2996을 다룹니다. COPY 논리 지문2089357의 첫 자식2089358에서 공유 HML을 편집한 뒤 편집기 Save, CMS 임시저장, 임시본 선택과 전체반영을 순서대로 실행했습니다. 최종 복사본 네 문항은 새 상세2089094~2089097에서 복사본 전용 HML/PNG를 공유합니다. 원본 파일 바이트와 원본4개·단건 대조·AI4개·12개 쌍둥이 관계/이력은 지정 비교 범위에서 유지됐습니다. Master 업무는 80회이고 Service 배포는 없습니다. 이 정적 작업은 로컬 근거와 보존 파일만 읽고 새 보고서·보충맵만 작성했습니다. [phase61](session-20261110-phase61.json#L1), [phase62](session-20261110-phase62.json#L1), [phase63](session-20261110-phase63.json#L1), [실험 의도와 최종 상태](copied-set-shared-hml-isolation-intent-20261110.json#L1)

**시작 상태: 논리 복사본과 실제 파일 별칭**

원본 논리 지문은2089241이고 자식2089242~2089245는 Y, 상세는2089052/2089053/2089054/2089051입니다. COPY 논리 지문은2089357이고 자식2089358~2089361은 R, 상세는2089078~2089081이었습니다. 단건 대조2089246은 R/2088877입니다. 원본/COPY 양쪽에 단건 대조가 중복 포함되므로 읽기10행을 고유10문항으로 계산하지 않습니다. 고유9개 현재 문항과 9개 임시본 부재를 확인한 시점입니다. [원본 기준](evidence/2924-copy-hml-isolation-originals-before.json#L53), [COPY 기준](evidence/2925-copy-hml-isolation-copy-before.json#L53), [기준 슬롯](evidence/2926-copy-hml-isolation-copy-file-refs-before.json#L53), [phase61](session-20261110-phase61.json#L1)

COPY의 공유 HML은 실행 전 원본 경로를 그대로 참조했습니다. HML은 `/passage/208/2089241/1966/hml/2089241_P.hml`, PNG는 같은1966의 `image/2089241_P.png`입니다. 이 파일 별칭과 HTML 내부 `passageKey=passage:2089241`, 논리 COPY 지문2089357은 서로 다른 식별 값입니다. ‘원본 파일을 참조한다’는 사실만으로 편집 시 원본까지 덮어쓴다고 단정하지 않고 실제 저장 경계를 시험했습니다. [COPY의 실제 파일 참조](evidence/2926-copy-hml-isolation-copy-file-refs-before.json#L53), [바이너리 기준](copied-set-hml-binary-baseline-20261110.json#L1), [의도](copied-set-shared-hml-isolation-intent-20261110.json#L1)

**정상 팝업에서의 지문 편집**

정상 COPY2089358/2089078의 HML 탭에서 편집기 버튼을 눌러 자체 팝업t61을 열었습니다. 기본 열린 파일은 원본 질문 파일명2089242_Q.hml이었으며, controlReady=true·PageCount1·modified=false를 확인했습니다. 팝업의 소유자는 복사본2089358/2089078이고, 기본 질문 파일명이 원본 ID인 것과 편집 대상 소유자를 혼동하지 않았습니다. 지문·문제·해답 버튼은 사용할 수 있고 지문해석은 파일 없음으로 disabled였습니다. [정상 팝업 열기](evidence/2932-copy-hml-editor-normal-popup-open.json#L1), [초기 실제 상태](evidence/2935-copy-hml-popup-initial-ui-state.json#L53), [팝업의 네 영역](sources/copy-hml-editor9358-initial-20261110.html#L18)

지문 탭으로 바꾼 뒤 실제 HML의 기존 문장과 수정되지 않은 상태를 읽었습니다. 문서 처음에 `[QA-COPY-SHARED-HML-20261110]`와 공백을 한 번 추가했고, GetTextFile에서 ‘새 표식+기존 본문 전체’와 modified=true를 검증했습니다. 기록된 입력은 브라우저의 편집기 이벤트 경로이며 실제 OS 마우스·키보드 제어와 구분합니다. [편집 전 실제 HML](evidence/2938-copy-hml-passage-before-text-and-caret.json#L53), [표식 입력](evidence/2944-copy-hml-passage-marker-type-once.json#L1), [편집 후 실제 HML](evidence/2945-copy-hml-passage-edited-text-read.json#L53), [phase62 입력 방식](session-20261110-phase62.json#L1)

**세 저장 경계**

| 단계 | 실제 실행과 서버/CMS 결과 | 당시 현재본·임시본 |
|---|---|---|
| 편집기 Save2946 | 편집기 임시 HML·PNG를 만들고 부모의 passage.hml / passage.image로 전달 | 현재 원본/COPY·기본 슬롯 참조·9개 임시본 부재가 유지됨 |
| CMS 임시저장2960 | 선택 자식2089358의 임시 상세2089093과 COPY9357/2005/P 파일을 저장 | 현재본 네 COPY는 여전히9078~9081이며 다른8문항의 임시본은 없음 |
| 임시본 선택 후 전체반영2982 | 임시2089093을 불러와 최종 한 번 반영 | COPY 네 상세가9094~9097/R로 바뀌고 같은 COPY9357/2005/P를 사용함.13개 임시본 검사 모두 false |

각 단계는 실행 당시 관측과 후속 독립 읽기를 연결했습니다. 편집기 Save는 Master 업무에 더하지 않았고, CMS 임시저장과 전체반영만 각1회로 78→79→80입니다. 브라우저 탭 선택·모달·재조회·파일 검증은 추가 업무로 세지 않았습니다. [편집기 단발 Save](evidence/2946-copy-hml-editor-save-once.json#L53), [부모 pending 전달](evidence/2947-copy-hml-editor-save-outcome-no-repeat.json#L53), [CMS 임시저장 단발 제출](evidence/2960-copy-hml-cms-temp-save-final-once.json#L53), [전체반영 단발 제출](evidence/2982-copy-hml-draft-fullapply-final-once.json#L53), [업무 집계](session-20261110-phase63.json#L1)

편집기 Save 후 안내는 CMS에서 임시저장 또는 전체반영하라는 내용입니다. 실제 현재 원본·COPY를 다시 읽고 기본 수정 GET의 슬롯과 9개 임시본 검사를 대조해, 편집기 Save만으로 CMS 현재본이나 임시본이 바뀌지 않았음을 확인했습니다. 여기서 임시주소는 편집기 서버의 파일 결과이며 CMS 임시 상세와 같지 않습니다. 이 정상 경로를 모든 실패·만료·재시도 경우의 원자성이나 임시파일 수명 정책으로 일반화하지 않습니다. [Save 결과](evidence/2947-copy-hml-editor-save-outcome-no-repeat.json#L53), [원본 현재본](evidence/2949-copy-hml-editor-saved-originals-published-read.json#L53), [COPY 현재본](evidence/2950-copy-hml-editor-saved-copies-published-read.json#L53), [기본 파일 참조](evidence/2951-copy-hml-editor-saved-copies-file-refs-read.json#L53), [9개 임시본 검사](evidence/2952-copy-hml-editor-saved-nine-draft-checks.json#L53)

CMS 임시저장 후 선택 자식만 hasDraft=true였고 나머지 원본4개·COPY 형제3개·단건 대조는 false였습니다. 명시적 draft GET에서도 선택 자식만 loadDraft=true와 새 공유 HML을 가졌습니다. HTML 편집 모델·저장 OMR·질문/해답/번역 슬롯은 그대로이며, 현재본은 아직 원본1966 별칭을 사용했습니다. 새 COPY 파일이 임시 단계에서 저장된 것과 현재 네 자식에게 반영된 것을 구분합니다. [임시 격리 비교](copied-set-hml-temp-isolation-comparison-20261110.json#L1), [COPY 현재본 유지](evidence/2964-copy-hml-temp-saved-copies-published-read.json#L53), [기본 참조 유지](evidence/2965-copy-hml-temp-saved-copies-default-file-refs.json#L53), [명시적 draft 범위](evidence/2966-copy-hml-temp-saved-nine-explicit-draft-refs.json#L53), [선택 자식만 임시본](evidence/2968-copy-hml-after-temp-nine-draft-checks.json#L53), [임시 상세·새 HML](sources/copy-hml-draft2089093-before-fullapply-20261110.html#L6676)

**임시본 선택과 네 자식의 전체반영**

정상 수정 진입의 임시저장 안내에서 임시저장 수정하기를 선택했습니다. draft=Y/2089093, 논리 지문2089357, 저장 모델/OMR/슬롯을 대조한 뒤 정상 전체반영 확인창을 열었습니다. 이 시점에는 새 편집기 pending 파일이 없었습니다. 즉 저장된 CMS 임시본을 적용한 경로입니다. [불러온 임시본](evidence/2975-copy-hml-saved-draft9093-verified-review.json#L53), [loadDraft=true](sources/copy-hml-draft2089093-before-fullapply-20261110.html#L7365), [실제 전체반영 확인창](evidence/2981-copy-hml-saved-draft-fullapply-modal-state.json#L53), [최종 한 번 반영](evidence/2982-copy-hml-draft-fullapply-final-once.json#L53)

| COPY 문항 | 이전 현재 상세 | 선택 임시 상세 | 전체반영 후 현재 상세 |
|---|---|---|---|
|2089358 |2089078 |2089093 |2089094 |
|2089359 |2089079 |없음 |2089095 |
|2089360 |2089080 |없음 |2089096 |
|2089361 |2089081 |없음 |2089097 |

네 자식은 R을 유지하며 공유 HML을 모두 `/passage/208/2089357/2005/hml/2089357_P.hml`로 참조합니다. 공유 PNG도 같은2005의 `image/2089357_P.png`입니다. 질문·해답 HML 참조, 번역의 빈 경로, 저장 OMR, 공유/개별 HTML 모델과 비공유 이미지 참조는 그대로입니다. [전체반영 격리 비교](copied-set-hml-fullapply-isolation-comparison-20261110.json#L1), [COPY 현재 네 버전](evidence/2986-copy-hml-fullapply-copies-after.json#L53), [실제 수정 모델·슬롯](evidence/2987-copy-hml-fullapply-copy-file-refs-after.json#L53), [현재 상세 식별자](sources/copy-hml-current2089094-after-fullapply-20261110.html#L742)

HTML 모델의 `passageKey=passage:2089241`도 그대로입니다. 그럼에도 공유 HML 파일은 논리 복사 지문2089357의 경로로 격리됐고 원본 파일은 바뀌지 않았습니다. 따라서 이번 정상 UI 경로는 HTML 내부 키가 원본값인 상태에서도 파일 격리를 달성했습니다. 서버가 항상 어떤 키로 저장 대상을 고르는지, 내부 DB에서 지문 상세를 어떻게 연결하는지까지 확정한 것은 아닙니다. [임시 HTML 키](sources/copy-hml-draft2089093-before-fullapply-20261110.html#L6183), [최종 HTML 키](sources/copy-hml-current2089094-after-fullapply-20261110.html#L414), [최종 파일/HTML/OMR 비교](copied-set-hml-fullapply-isolation-comparison-20261110.json#L1)

**바이트 검증과 실제 내용**

| 파일 | 바이트 | SHA-256 |
|---|---:|---|
|기존 원본 HML |24490 |`5b887826732a8b792320e594268d7f2530354c55a1baca5f8670818b259f6cad` |
|기존 원본 PNG |5415 |`7e77ba42ab137a00dba6dacbc84bf6bf6b00b9a3b8be41c7f667b00da36afa75` |
|COPY 임시/반영 HML |24520 |`fbe6af38a28adafaf238d23b781e3ca9739ef5d96b1446cd229915dba32f0e62` |
|COPY 임시/반영 PNG |8851 |`cc7f3ae2ec971df24e40c6a294686a5d4dad370920a66b8d5bc2549e5362a400` |

기록된 정확한 원본 URL의 HTTP 읽기는 편집기 Save 후·CMS 임시저장 후·전체반영 후 모두200이고 원본 바이트와 같습니다. 최종 COPY의 URL·바이트·SHA도 CMS 임시저장 때 보존한 파일과 정확히 같았습니다. 이는 파일 경로 문자열만 비교한 결과가 아닙니다. 이번 정적 작업에서는 보존된 기준/임시 HML·PNG4개를 다시 읽어 길이·SHA와 HML XML CHAR 텍스트를 검증했고, 새 네트워크 요청은 보내지 않았습니다. [기준](copied-set-hml-binary-baseline-20261110.json#L1), [편집기 Save 후 원본](copied-set-hml-original-binaries-after-editor-save-20261110.json#L1), [CMS 임시 후 원본](copied-set-hml-original-binaries-after-temp-save-20261110.json#L1), [전체반영 후 원본](copied-set-hml-original-binaries-after-fullapply-20261110.json#L1), [COPY 임시](copied-set-hml-temp-draft-binaries-20261110.json#L1), [COPY 최종](copied-set-hml-applied-binaries-20261110.json#L1)

새 HML XML에는 COPY 표식1개와 기존 HML 표식1개·기존 본문이 있습니다. 이전 HML에는 COPY 표식이 없습니다. 부모 연구자는 실제 편집기의 HML 텍스트와 전후 PNG를 확인했습니다. 이 작업은 보존 XML과 검토 기록을 확인한 것이며 HML 문서를 새로 편집하거나 이미지를 새로 직접 열어 본 것은 아닙니다. [이전 HML](fixtures/copied-set-hml-isolation-20261110/before-original-shared.hml), [COPY HML](fixtures/copied-set-hml-isolation-20261110/after-temp-copy.hml), [이전 PNG](fixtures/copied-set-hml-isolation-20261110/before-original-shared.png), [COPY PNG](fixtures/copied-set-hml-isolation-20261110/after-temp-copy.png), [부모 확인](session-20261110-phase62.json#L1)

**보존된 대조 범위와 최종 안전 재개 상태**

원본4개와 단건 대조의 버전·상태·모델·저장 OMR 미리보기·이미지 참조는 그대로입니다. AI4개의 읽기 결과 전체와 12개 문항의 쌍둥이 멤버십·생성 이력도 이전 수집값과 정확히 같았습니다. 원본 공유 HML/PNG는 별도로 직접 바이트를 비교했고, 다른 Q/A/AI 파일은 수집한 참조/읽기 결과 보존 범위입니다. 모든 자산의 원격 바이트나 DB 전체를 대조했다고 확대하지 않습니다. [최종 대조](copied-set-hml-fullapply-isolation-comparison-20261110.json#L1), [원본·단건 현재본](evidence/2985-copy-hml-fullapply-originals-after.json#L53), [AI4개 대조](evidence/2989-copy-hml-fullapply-ai-four-controls-after.json#L53), [12개 관계·이력](evidence/2990-copy-hml-fullapply-twelve-memberships-after.json#L53)

13개 hasDraft=false는 현재 임시본 검사 결과이며 물리 DB 삭제 증명은 아닙니다. 편집기 팝업t61은2969에서 닫았습니다. 최종2996 시점의 t21은 COPY2089358/2089094 현재 상세 하단이며 열린 모달/팝오버, 미저장 입력, 선택 임시본, pending 서버 작업이나 검증 대기가 없습니다. 이전 phase62의 임시본 대기 상태는 이력이며 현재 재개 지점으로 쓰지 않습니다. [13개 임시본 검사](evidence/2988-copy-hml-fullapply-thirteen-draft-checks.json#L53), [자체 팝업 닫기](evidence/2969-copy-hml-saved-popup-t61-close.json#L1), [phase63 resume](session-20261110-phase63.json#L1)

**시각 확인과 제외한 관측**

현재 상세의 이미지9개는 complete=true이고 자연크기가 양수입니다. 부모 연구자가2994/2995/2996 PNG를 직접 검토했습니다. 실제 top0/904/1809, viewport1015가 전체2824px를 겹쳐 덮으며, HTML의 기존 표식과 HML의 새 COPY 표식, 네 자식 질문·정답/미리보기·상태·메타·하단을 확인했습니다. 이 범위를 다른 상태·화면폭·역할·Service의 완료로 전이하지 않습니다. [현재 이미지 로드](evidence/2993-copy-hml-fullapply-current9358-page-state.json#L53), [전체 상단](evidence/2994-copy-hml-final-current-detail-visual-0.json#L52), [전체 중간](evidence/2995-copy-hml-final-current-detail-visual-1.json#L52), [전체 하단](evidence/2996-copy-hml-final-current-detail-visual-2.json#L52), [부모 시각 검토](session-20261110-phase63.json#L1)

2930은 라벨과 달리 현재 선언된 편집기 페이지·glue JS를 읽은 근거입니다. 이 번호만으로 부모 화면/슬롯/모델 관측을 했다고 세지 않습니다. 보존된 e082 glue와 같은 코드였다는 정적 비교 범위입니다. 또한2955의 samePassage/Question=false는 HTML 편집기가 아직 초기화되지 않아 모델이 없었던 관측입니다. 정상 HTML 탭2956을 선택한 뒤2957에서 실제 모델이 기준과 같음을 재검증했으므로 이를 데이터 손상으로 기록하지 않습니다. [실제 glue 읽기](evidence/2930-copy-hml-isolation-parent-hml-pane-state.json#L53), [초기화 전 한계](evidence/2955-copy-hml-parent-pending-live-baseline.json#L53), [정상 HTML 탭 선택](evidence/2956-copy-hml-parent-html-tab-normal-open.json#L1), [초기화 후 실제 모델](evidence/2957-copy-hml-parent-live-models-after-html-init.json#L53), [보정 기록](session-20261110-phase62.json#L1)

2979는2978과 같은 top0/전체1015의 중복 캡처이며 별도 새 상태로 세지 않습니다. 지문해석 파일은 없고 버튼도 disabled입니다. 이 실험은 복사 세트의 공유 지문 HML 정상 편집→CMS 임시저장→임시본 전체반영에 한정됩니다. 다른 슬롯의 실제 저장, 해석 실파일, 실패/만료/동시 편집·다른 권한·모든 복사본, 저장소/DB 내부 정책, 정상 Definition 세트/다중 검수와 Service 실제 채점·배포는 남아 있습니다. 해석 HML·정상 Definition 세트는 현재 정상 표본이 없는 범위이며 사용자 응답 대기가 아닙니다. 전체 완료율은 null입니다. [phase63 한계](session-20261110-phase63.json#L1)
