# Definition 단독 대조 등록과 F 단독 승인 결과

이 보고서는2026-11-10의 **문서694/695, 근거2650~2705**를 다룹니다. 다중JSON ZIP으로 만든694는 문서F·표시문항0개였고, 그 안의 ORDERED JSON을 바이트 그대로 단독 ZIP으로 등록한695는P→R·카드1개를 만들었습니다.695의 유일한 카드를F로 선택해 최종 승인하자 문서는M→Y, 개별 Master 문항2089375는F가 됐습니다. 확정 Master 업무는694 등록·695 등록·695 F 단독 최종 승인의3회로 누계 **65회**이며 서비스 배포는 없습니다. 이 정적 작업은 로컬 근거/소스/기존 ZIP을 읽기만 했고 브라우저·네트워크·CMS API·원장·전역 인덱스·기존 맵을 조작하지 않았습니다. [phase51](session-20261110-phase51.json#L1), [phase52](session-20261110-phase52.json#L1), [694 의도/결과](definition-multi3-import-intent-20261110.json#L1), [695 단독 대조](definition-ordered1-control-intent-20261110.json#L1), [F 승인 의도](definition695-f-only-approval-intent-20261110.json#L1)

**파일·메타정보와 문서 결과**

| 항목 |MULTI3→694 |ORDERED1→695 |
|---|---|---|
|ZIP |QA-DIFI-20261110-04-MULTI3.zip,2860B |QA-DIFI-20261110-06-ORDERED1.zip,978B |
|멤버 |ESSAY/FIVE_CHOICE/SHORT_ANSWER_ORDERED의3JSON |그중 `2116111032.json` 하나 |
|JSON 대조 |ORDERED 멤버1876B |같은 이름·같은1876B·바이트 동일 |
|등록 메타 |Source13,단원22MMAT0KOK1001020000,페이지1~3,C |동일한 값 |
|실제 제출 |2661에서1회 |2679에서1회 |
|등록 후 문서 |694/F·표시문항0 |695/P→R·카드2089375(2089082) 하나 |

두 제출 직전 브라우저 파일 해시와 폼 값을 확인했고, 같은 메타정보와 각 단발 클릭이 기록돼 있습니다.695가 한 카드를 만들었다는 사실과 혼합3JSON의 생성 수/지원 범위는 구분합니다. [694 제출 전](evidence/2660-definition-multi3-fresh-submit-preflight.json#L53), [694 제출](evidence/2661-definition-multi3-register-submit-once.json#L53), [695 제출 전](evidence/2678-definition-ordered1-before-submit-verified.json#L53), [695 제출](evidence/2679-definition-ordered1-register-submit-once.json#L53), [695 목록P](evidence/2681-definition-ordered1-list-readback.json#L53), [695 초안R](evidence/2684-definition695-control-detail-observation.json#L53)

로컬 두 ZIP을 읽어 대조한 ORDERED 멤버의 SHA-256은 `6cdf8bbc740a71162dd38309d81b65553947b1408c198ab4891a6ffe6fe601db`이고 바이트가 완전히 같았습니다. 두 ZIP의 SHA는 각각 `e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171`과 `95c54b6c52e7e4149121df71dd2a4e51cb88963e811f7c27564ba7c8e819ee56`입니다. 이번 작업에서 파일을 수정하거나 새 ZIP을 만들지 않았습니다. [두 ZIP 대조의 신원](definition-ordered1-control-intent-20261110.json#L1), [원래 멤버 명세](definition-multi3-fixture-manifest-20261110.json#L1)

**694의 실패에서 확정한 범위**

694는 실패F이고 분리 문항이 없습니다. 비고는disabled이며 승인·폐기 조작이 없습니다. 상단에는ZIP 오류로 파싱을 시작하지 못했다는 안내가 있고, 하단 빈 문항 보조문구는HML이라고 잘못 표시됩니다. 이 문구는 실제 표시이며 서버의 내부 실패 단계나 HML 처리 경로를 입증하지 않습니다. [실제 상세](evidence/2667-definition694-failed-detail-observation.json#L53), [상단ZIP 문구](sources/definition694-failed-20261110.html#L157), [하단HML 문구](sources/definition694-failed-20261110.html#L245)

발급과create는 보존된 수동 관찰 로그에서HTTP200입니다. 그 로그에는 PUT 행이 없지만,694의 실제 다운로드 원본은HTTP200·2860B이고 SHA가 제출한 MULTI3와 같았습니다. 따라서 PUT 행 미포착을 파일 전송 실패로 판정하지 않습니다. 저장 원본의 동일성과 파싱 성공도 별개입니다. [발급/create 로그](definition-multi3-network-result-20261110.json#L1), [원본 다운로드 무결성](evidence/2668-definition694-upload-integrity-read.json#L53)

694에 검수 카드가 생기지 않았으므로 계획했던 다중S/F/D 혼합 검수는 실행하지 못했습니다. 이를 “혼합 검수 반려”로 기록하거나 다중JSON 전체가 미지원이라고 확정하지 않습니다. 실제 서버 예외·스키마·유형별 파서·트랜잭션은 열람하지 않았습니다. [표시문항0과 경계](session-20261110-phase51.json#L1), [정적 실패 후보 검토](definition-multi3-failure-static-review-20261110.md#L1)

**단독 ORDERED 성공으로 좁혀진 가설**

단독 대조는 기존 검토가 제안한 구분 실험입니다. JSON 내용·ID·표지·이름을 유지한 채 나머지 두 JSON을 제외한 ZIP에서695가 성공했으므로, 아래 항목은 **이 단독 문맥에서 함께 수용된 조건**입니다. 개별 서버 규칙을 모두 증명한 것은 아닙니다. [기존 구분 실험의 경계](definition-multi3-failure-static-review-20261110.md#L1), [바이트 동일 대조 의도](definition-ordered1-control-intent-20261110.json#L1), [실제 단독R](evidence/2684-definition695-control-detail-observation.json#L53)

| 수용을 확인한 조건 | 좁혀진 범위 | 남는 한계 |
|---|---|---|
|ORDERED JSON 자체 |해당1876B가 현재 등록 경로에서 반드시 파싱 불가능하다는 설명은 성립하지 않습니다. |ESSAY/FIVE 개별 파싱·다중 수/혼합/순서/부분실패 정책은 분리되지 않았습니다. |
|questionId와masterId의 차이 |questionId2116111031과 문자열masterId“2116111032”가 다른 채로 성공했습니다. |모든 유형/경로에서 두ID가 달라도 된다는 전역 규칙은 아닙니다. |
|표지 p/span |같은 `<p><span>[QA-DIFI-20261110-04-ORDERED]</span></p>`을 포함하고 성공했습니다. |다른 HTML이나 ESSAY/FIVE의 표지를 모두 검증하지 않았습니다. |
|현재 메타정보 |같은Source13·20자리 단원·페이지1~3·C 조합으로 단독 등록이R까지 진행됐습니다. |문서 메타의 의미상 정합성·개별 문항 단원 매핑·다른 유형별 조건은 확정하지 않습니다. |
|실패694의 외부ID 재사용 |동일한 네 외부ID를 가진 JSON을695에서 수용했습니다. |694에서 내부 예약/부분쓰기/중복 처리가 전혀 없었다는 뜻은 아닙니다. |
|멤버명 |원본/대조 모두2116111032.json을 사용했습니다. |파일명=masterId의 필수 여부나 불일치 이름은 시험하지 않았습니다. |

단독 성공으로 “qId≠masterId 때문”, “표지span 때문”, “해당 메타정보 자체 때문”이라는 단독 원인 설명은 이 ORDERED 표본에서 약해집니다. **694의 정확한 실패 원인은 여전히 미확정**이며, 멤버 수·ESSAY/FIVE 개별 내용/유형·혼합·순서 등의 차이를 추가 대조해야 합니다. 이 보고서는 후속 ESSAY/FIVE 단독 등록 결과를 예상하지 않습니다. [새로 좁혀진 범위](session-20261110-phase52.json#L1), [입력 보존 범위](definition-multi3-fixture-manifest-20261110.json#L1)

**695의 승인 전 Master 접근과 도구 오류**

695/R 카드에는2089375(2089082)가 표시됐지만, 승인 전 이ID의 Master 상세와 수정 GET은 둘 다 최종 `/item/all/list.donga`로 리다이렉트됐습니다. HTTP200은 목록 착지 응답이며 직접 Master 접근 성공이 아니었습니다.2685의 helper는 이redirect를 “Own created item unavailable”로 던졌고,2686이 최종 경로를 분리해 기록했습니다. 이를 파싱 실패·권한 장애·CMS 저장 실패로 해석하지 않습니다. [R 카드](sources/definition695-control-draft-20261110.html#L484), [과도한throw](evidence/2685-definition695-created-item2089375-read.json#L1), [후속 정상 판별](evidence/2686-definition695-preapproval-master-item-availability.json#L53)

이것은 **이 문서의R 검수 전 시점에서 관찰한 접근 동작**입니다. 모든 문서/역할의 선행조건을 확정하지 않고, 카드에ID가 있다는 것을 그 시점의 독립 Master 조회 가능으로 올리지 않습니다. 승인 전 개별 Master 상태R을 직접 조회한 것처럼 기록하지도 않습니다. [관찰 범위](session-20261110-phase52.json#L1), [초안 실제 관찰](evidence/2684-definition695-control-detail-observation.json#L53)

**F 단독 최종 승인과 전환 타이밍**

유일한 select를F로 바꾸고 QA 비고를 입력했습니다.2693의 순간 관찰은F와 문서695를 확인했지만 열린 모달 목록은0개였습니다. 다음 진입 guard2694는 이미 존재한 모달 때문에 중단됐고,2695에서 `examApproveModal`의 shown 상태와 정확한F를 확인했습니다. 이 전환 관찰을 서버 오류나 권한 문제로 해석하거나, 최종 승인이 여러 번 실행됐다고 세지 않습니다. [전환 중 관찰](evidence/2693-definition695-f-approval-modal-state.json#L53), [진입guard](evidence/2694-definition695-f-approval-dom-entry.json#L1), [shown 확인](evidence/2695-definition695-f-modal-shown-verified.json#L53), [타이밍 해석](session-20261110-phase52.json#L1)

최종 승인2696은 한 번만 실행됐으며 생성 hidden은 `itemIds=2089375`, `loadFlags=F`였습니다. 선언된 경로는 `/item/difi/approve.donga`입니다. 이전 사전점검에서F는 확인창 진입까지만 확정됐지만, 이번에는 실제 서버 처리와 최종 문서/문항을 후속 조회했습니다. 모두D 차단과F 단독 승인을 구분하며, S가 반드시 하나 필요하다고 추정하지 않습니다. [실제 단발 최종 제출](evidence/2696-definition695-f-final-approval-submit-once.json#L53), [승인 폼 경로](sources/definition695-control-draft-20261110.html#L526), [이전 사전점검의 범위](definition-multi-review-preflight-20261110.md#L1)

| 순차 근거 |확인한 내용 |해석 |
|---|---|---|
|2697 |열린 상세는M·“AI 메타 추천 중입니다”, 카드 등록실패였습니다. |F 단독 승인 뒤 문서M을 실제 확인했습니다. |
|2698 |별도 신선한 목록은 같은695를승인Y로표시했습니다. |열린 페이지의M과조회시점이다른 목록Y를구분합니다. |
|2700~2701 |기존열린상세의보존소스/관찰은계속M이었습니다. |이를서버Y→M역전이나완료실패로단정하지않습니다. |
|2702~2704 |상세를새로진입하자문서Y와실패카드·상세/수정버튼을확인했습니다. |최종문서Y는신선한동일ID 상세로확정했습니다. |
|2705 |개별Master상세/수정은접근가능하며2089375/2089082·F입니다. |문서Y와문항F를각각확정했습니다. |

표의 근거는 [M 상세](evidence/2697-definition695-f-approval-post-state.json#L53), [목록Y](evidence/2698-definition695-f-approval-list-readback.json#L53), [기존M 화면](evidence/2701-definition695-f-approved-page-observation.json#L53), [신선한Y 화면](evidence/2704-definition695-approved-final-observation.json#L53), [신선한 Master F](evidence/2705-definition695-approved-failed-item-fresh-read.json#L53)입니다. 연속 서버 이벤트 로그나 정확한 추천 소요시간을 측정한 것은 아닙니다.

**최종 문서Y와 문항F·메타의 분리**

최종695는 승인Y이며 카드에 “등록실패”와 “실패(재등록)”를 함께 표시합니다. 문항 상세/수정 진입 버튼이 존재하고 독립 Master 조회도 가능해졌습니다. 비고는 저장된 QA 문구를disabled로 보여줍니다. 문항 처리 판정F, 문서 처리 상태Y, 개별 Master F는 각각 별도의 필드/결과입니다. [문서Y](sources/definition695-f-only-approved-final-20261110.html#L362), [비고](sources/definition695-f-only-approved-final-20261110.html#L439), [문항 링크/상태/처리 판정](sources/definition695-f-only-approved-final-20261110.html#L474), [실제 최종 관찰](evidence/2704-definition695-approved-final-observation.json#L53)

2705의 신선한 상세/수정 결과에서 다음 값을 확인했습니다. HTML 뷰어의 정답4·grading exact_match와 저장 OMR/OMR정답null은 별개의 자료입니다. 본문 정답이 보인다는 이유로 OMR이 완성됐다고 판정하지 않습니다. [모델/필드/메타 전체](evidence/2705-definition695-approved-failed-item-fresh-read.json#L53)

| 항목 |확인값 |
|---|---|
|신원/상태 |2089375(2089082),MasterF입니다. |
|형태 |주관식>다답형>일반형이며수정원본의qtCurrent는SBMANM입니다. |
|내용 |QA ORDERED표식·정답4·풀이·definition 뷰어모델이있습니다. |
|메타 |난이도·단원·성취기준·내용영역·행동영역·교과역량·유형정보·썸네일은공란/“-”입니다. 수정폼난이도값도빈값입니다. |
|OMR |수정폼의savedOmrData/savedAnswerData는둘다null입니다. |
|관계 |출처1개,평가지0개,쌍둥이0개,세트“-”,배포“-”입니다. |
|링크/접근 |최종문서의상세/수정버튼이있고,Master상세/수정GET이해당페이지를반환합니다. |

수정 GET은 스크립트를 실행하지 않은 inert DOM 읽기입니다. 수많은 숨김 OMR 템플릿의 기본 필드와 초기qtType값을 실제 현재 유형으로 혼동하지 않고, 표시 형태와qtCurrent=SBMANM을 사용했습니다. 이 범위에서 실제 수정 저장이나 OMR 미리보기/채점을 새로 실행하지 않았습니다. [읽기 방식과 필드](evidence/2705-definition695-approved-failed-item-fresh-read.json#L53)

이번F 단독 승인은 문서를Y로 끝낼 수 있지만, 현재 출력에는 추천 메타/저장 OMR이 채워지지 않았습니다. M 안내가 있었다는 사실로 AI 백엔드가 어떤 문항/분기에서 무엇을 실행했는지, 혹은F가 항상 추천 대상에서 제외되는지를 확정하지 않습니다. 문서 등록 메타에 단원이 있어도 개별 Master 단원은 공란이라는 점도 분리합니다. [문서M와 등록 메타](evidence/2697-definition695-f-approval-post-state.json#L53), [최종 메타/OMR](evidence/2705-definition695-approved-failed-item-fresh-read.json#L53), [AI 분기 미확인](session-20261110-phase52.json#L1)

**픽셀과 남은 범위**

부모는694의2669/2670 PNG를 직접 검토했고, 높이1049에서 상단0/뷰포트1014와 하단34/뷰포트1015가 전체 세로를 덮습니다.695/R은 상단2687과 하단2689를 직접 검토했고, 전체1400·상단0/높이1014·하단385/높이1015입니다.2688/2689는 동일 하단 위치이므로 다른 범위로 더하지 않습니다. 최종695/Y나 Master F의 새 전체페이지 PNG 검토로 이 범위를 확대하지 않습니다. 이 정적 작업은 부모의 검토 기록을 인용합니다. [694 상단](evidence/2669-definition694-failure-top-visual.json#L52), [694 하단](evidence/2670-definition694-failure-bottom-visual.json#L52), [695/R 상단](evidence/2687-definition695-top-visual.json#L52), [동일 하단2688](evidence/2688-definition695-middle-visual.json#L52), [695/R 하단](evidence/2689-definition695-bottom-visual.json#L52), [검토 범위51](session-20261110-phase51.json#L1), [검토 범위52](session-20261110-phase52.json#L1)

남은 범위는 ESSAY/FIVE의 동일 멤버 단독 대조, 정상 다중/세트 입력, 혼합S/F/D 최종 처리, 이미지자산 입력, 정확한 파싱 원인·외부ID 예약/중복/물리DB 정책, 다른 역할과Service입니다.694의 가시 문항0개나695의 성공만으로 숨은DB 작업을 판정하지 않습니다. 전체 완료 분모는 알 수 없으며 사이트100% 완료를 주장하지 않습니다. [미확인 범위](session-20261110-phase52.json#L1), [원인 미확정](session-20261110-phase51.json#L1)
