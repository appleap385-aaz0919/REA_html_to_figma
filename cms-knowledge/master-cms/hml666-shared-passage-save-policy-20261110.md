# HML666 공유 지문 저장의 프런트엔드 정책 검토

작성일은 2026-11-10이며 최종 근거 범위는 **phase39/cutoff2342**입니다. 기준2243·2252, 기본 OMR 차단2254~2258, HTML 공유 지문+OMR 저장2270~2275에 이어 **실제 HML 팝업 편집·벤더 임시저장·CMS 전체반영·자식/파일 재조회·현재 전체 세로 픽셀**을 추가했습니다. 이번 정적 작업은 보존 근거를 읽어 이 보고서만 갱신했으며 브라우저·네트워크·CMS API·원장·전역 인덱스를 조작하지 않았습니다. 정상 공유 HML 저장은 이 자체 초안 세트의 한 표본에서 확인했으며 모든 상태/자료/권한의 서버 정책을 완성했다고 주장하지 않습니다. [기준](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53), [HTML 최종 저장](evidence/2270-own-shared-html-full-apply-submit-once.json#L52), [HML CMS 최종 저장](evidence/2333-own-shared-hml-cms-final-save-once.json#L53), [phase39 범위](session-20261110-phase39.json#L1)

**핵심 판단**

- 한글 팝업의 Save는 HML과 미리보기 이미지를 기안기 임시 주소로 저장하고 부모 수정 화면에 통지하는 단계입니다. **CMS 문항 반영은 별도의 임시저장/전체반영**을 거쳐야 합니다. 부모 화면도 이 경계를 명시합니다. [webhwp 설명8행](sources/assets/webhwp-e082-current-20261110.js#L8), [Save174행](sources/assets/webhwp-e082-current-20261110.js#L174), [부모 통지202행](sources/assets/webhwp-e082-current-20261110.js#L202), [화면 안내6598행](sources/own-set2089242-modify-baseline-20261110.html#L6598)
- 팝업 저장 결과는 같은 origin·메시지 type과 **itemId+itemDetailId**가 현재 부모 화면의 신원과 일치할 때만 받습니다. 지문ID가 같다는 이유로 다른 자식/상세의 결과를 허용하는 코드가 아닙니다. [팝업 신원 고정19행](sources/assets/webhwp-e082-current-20261110.js#L19), [수신 검사33행](sources/own-set2089242-modify-save-inline-20261110.js#L33), [현재 소유자6593행](sources/own-set2089242-modify-baseline-20261110.html#L6593)
- 네 HML 슬롯은 슬롯당 HML/이미지 두 필드로 CMS에 전달됩니다. 이번 HML 저장은passage 두 결과만 수신하고 다른 여섯 결과칸은 비어 있었습니다. CMS 반영 후 네 자식이 같은 새1966/P 파일 경로를 참조했고 미변경Q/A 등20개 현행 자산은 유지됐습니다. null 계승의 이 정상 표본을 확인했지만 CMS 임시저장·다른 슬롯/앵커 충돌까지 확장하지 않습니다. [정의](sources/own-set2089242-modify-save-inline-20261110.js#L8), [실제 pending](evidence/2328-own-hml-shared-parent-pending-confirm.json#L53), [반영 후 비교](shared-hml-save-comparison-20261110.json#L1)
- 전체반영은 HML 변경 여부와 무관하게 필수 메타→HTML 문서 수집/검증→현재 OMR 검증→확인창 순서입니다.2254의 빈 SBSANM 정답은 실제로 차단됐습니다. 이후 HTML 저장으로 정답이 채워진 같은 자식은 HML 결과 수신 뒤에도 검증을 통과해2331 확인창·2333 최종 저장으로 진행했습니다. HML 수신 후 정답을 다시 비운 예외는 아직 시험하지 않았습니다. [코드426행](sources/own-set2089242-modify-save-inline-20261110.js#L426), [빈 정답 차단](evidence/2257-own-set-child-actual-apply-prevalidation.json#L52), [HML 확인창](evidence/2331-own-shared-hml-cms-apply-confirmation.json#L52), [최종 저장](evidence/2333-own-shared-hml-cms-final-save-once.json#L53)
- HTML 공유 지문에 [QA-SHARED-HTML-20261110]을 넣고 첫 자식의 빈 OMR 정답을 보완해 **전체반영을 한 번 실행**하자 네 자식의 상세ID와공유 HTML이 갱신됐습니다. OMR 정답은 첫 자식만 저장됐고 다른 세 자식/비교 단건은 null을 유지했습니다. 이 사례의 HTML 변경은 관측 HML/PNG 파일 변경으로 이어지지 않았습니다. [제출](evidence/2270-own-shared-html-full-apply-submit-once.json#L52), [네 자식 수정폼](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [선택 자식/형제 OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53), [22파일 비교](shared-html-save-comparison-20261110.json#L110)
- 후속 HML 지문에 [QA-SHARED-HML-20261110]을 실제 입력하고 편집기 Save1회·CMS 전체반영1회를 거치자 네 자식 상세가2088976~79로 갱신됐습니다. 공유 HTML·질문·5개 저장 OMR은 이전 상태를 유지하며 새 HML/PNG는 임시 결과와 해시가 같습니다. **벤더 임시저장1회는 확정 Master 업무43회에 더하지 않습니다.** [실제 입력](evidence/2318-own-hml-passage-marker-type.json#L1), [편집기 저장](evidence/2320-own-shared-hml-editor-save-once.json#L1), [CMS 저장](evidence/2333-own-shared-hml-cms-final-save-once.json#L53), [파일/문서 비교](shared-hml-save-comparison-20261110.json#L1), [작업 집계](session-20261110-phase39.json#L1)

이 문서에서 “소스 확인”은 선언된 실행 분기를 뜻하고, “실제 확인”은 지정 관찰 결과를 뜻합니다. 한 번의 HTML+OMR 저장에서 네 자식 상세가 함께 바뀐 결과는 확인 범위로 추가합니다. 이를 모든 세트·상태·HML 저장의 서버 규칙이나 물리 DB 트랜잭션 정책으로 일반화하지 않습니다. [최종 payload](sources/own-set2089242-modify-save-inline-20261110.js#L242), [이번 실제 결과](shared-html-save-comparison-20261110.json#L12), [관찰 한계](session-20261110-phase37.json#L19)

**자체 자료의 기준 신원과 공유 범위**

| 대상 | 기준 상세ID·상태 | 본문 정답·공유 관계 |
|---|---|---|
|2089242 |2088873·R |2×1행렬, 공유 지문2089241을 참조합니다. [상세 기준](evidence/2243-own-active-set-all5-server-baseline.json#L53), [수정폼 기준](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53) |
|2089243 |2088874·R |1×3행렬, 같은 공유 지문을 참조합니다. [2243](evidence/2243-own-active-set-all5-server-baseline.json#L53), [2252](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53) |
|2089244 |2088875·R |2×2행렬, 같은 공유 지문을 참조합니다. [2243](evidence/2243-own-active-set-all5-server-baseline.json#L53), [2252](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53) |
|2089245 |2088876·R |2×3행렬, 같은 공유 지문을 참조합니다. [2243](evidence/2243-own-active-set-all5-server-baseline.json#L53), [2252](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53) |
|2089246 |2088877·R |별도 단건이며 본문 정답은(1)1,(2)-3,(3)4입니다. passage 슬롯·passageEditorData가 없고 question의 passageKey는 비어 있습니다. 비교 대조군입니다. [2243](evidence/2243-own-active-set-all5-server-baseline.json#L53), [2252](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53) |

저장 전 네 자식 수정폼은 passageKey=passage:2089241, 지문 HTML “다음 행렬의 꼴을 말하시오.” 및 동일 HML 경로 **/passage/208/2089241/1933/hml/2089241_J.hml**을 참조했습니다. 당시2089242 팝업 소유자 신원은 itemId2089242/detail2088873이었습니다. 후속 HTML 저장 후에는 편집 URL의 소유자 상세ID가2088906으로 바뀌었지만 HML 경로는 그대로입니다. **1933은 유지된 HML 경로의 상세 구간이며, 현재 공유 지문 DB 상세ID를 직접 확인한 값이 아닙니다.** [저장 전 경로/URL](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53), [저장 후 경로/URL](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [DB 상세ID 미확정](session-20261110-phase37.json#L11)

저장 전 다섯 문항은 모두 SBSANM이고 상세의 저장 OMR/정답 속성이 없었으며,2089242 수정 화면은 빈 OMR 기본 폼을 표시했습니다. 본문 정답/HTML grading과 OMR 편집값은 별도입니다. 후속 저장 후에는 첫 자식2089242에만TEXT/ORDERED 정답이 생겼고 다른 세 자식과 단건은 저장 OMR/정답 null을 유지했습니다. 앞 네 자식은 난이도최하·행동영역이해, 단건은 난이도하·행동영역계산·평가지0개라는 비교 메타를 유지했습니다. [저장 전 상세](evidence/2243-own-active-set-all5-server-baseline.json#L53), [기본 빈 직렬화](evidence/2254-own-set-child-form-omr-baseline.json#L53), [저장 후 OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53), [저장 후 메타](evidence/2272-own-shared-html-all5-server-after.json#L53)

**Save라는 이름이 가리키는 서로 다른 단계**

| 동작 | 소스상 처리 | CMS 반영/검증 경계 |
|---|---|---|
|한글 팝업 Save |현재 슬롯의 filename을 이름으로 ctrl.SaveAs(HWPML2X)를 호출하고, 성공 시 이미지 생성으로 이어집니다. |기안기 임시 URL 생성 단계이며 CMS 업무 저장 호출이 아닙니다. [174행](sources/assets/webhwp-e082-current-20261110.js#L174), [기안기 임시 주소 설명8행](sources/assets/webhwp-e082-current-20261110.js#L8) |
|HTML 편집기 editor.save() |현재 question/passage 편집기를 검증하고 document를 반환합니다. |전체반영의 문서 수집 함수 내부 호출이며 CMS 서버 POST 자체가 아닙니다. [extractDoc116행](sources/own-set2089242-modify-save-inline-20261110.js#L116), [collectDocs160행](sources/own-set2089242-modify-save-inline-20261110.js#L160) |
|CMS 임시저장 |확인창의 최종 버튼 뒤 collectDocs(false), temp-save.donga로 JSON POST합니다. |필수 메타/HTML editor.save/OMR 유효성 검사를 생략합니다. 문서 추출·직렬화 실패나 서버 반려까지 성공을 보장하지는 않습니다. [413행](sources/own-set2089242-modify-save-inline-20261110.js#L413), [fetch/응답 처리304행](sources/own-set2089242-modify-save-inline-20261110.js#L304) |
|CMS 전체반영 |필수 메타와 HTML·OMR 검사를 통과하면 확인창을 열고, 최종 버튼 뒤 apply-all.donga로 JSON POST합니다. |확인창 열기와 최종 저장은 별개입니다.2257~2258은 확인창보다 앞에서 차단됐습니다. [421행](sources/own-set2089242-modify-save-inline-20261110.js#L421), [실제 음성 경로](evidence/2257-own-set-child-actual-apply-prevalidation.json#L52) |

임시저장/전체반영의 확인창은 각각 별도로 선언돼 있고, 취소는 모달을 닫는 버튼입니다. 메인 수정 취소도 별도 “저장하지 않고 이동” 확인창이며 변경 여부에 관계없이 묻도록 코드가 구성돼 있습니다. 팝업 Save의 결과를 받았다는 안내나 카드 이미지 교체만으로 이 최종 CMS 저장을 실행한 것으로 세지 않습니다. [CMS 저장 확인창6722행](sources/own-set2089242-modify-baseline-20261110.html#L6722), [전체반영 확인창6741행](sources/own-set2089242-modify-baseline-20261110.html#L6741), [수정 취소6762행](sources/own-set2089242-modify-baseline-20261110.html#L6762), [확인 콜백347행](sources/own-set2089242-modify-save-inline-20261110.js#L347), [취소 동작433행](sources/own-set2089242-modify-save-inline-20261110.js#L433)

**한글 팝업의 파일·이미지 저장과 부모 통지**

1. 팝업은 열릴 때 URL의 itemId/itemDetailId를 owner로 고정합니다. 각 슬롯을 열 때는 부모의 webhwpSlot(slot)을 다시 호출해 URL을 얻고, 저장된 임시 결과가 있으면 그쪽에서 재편집합니다. 원본 filename/path는 저장 이름의 기준으로 별도 유지됩니다. [owner19행](sources/assets/webhwp-e082-current-20261110.js#L19), [부모 조회69행](sources/assets/webhwp-e082-current-20261110.js#L69), [파일 열기82행](sources/assets/webhwp-e082-current-20261110.js#L82), [부모 우선 URL20행](sources/own-set2089242-modify-save-inline-20261110.js#L20)
2. Save는 filename이 없으면 경고하고 종료합니다. SaveAs 결과가 result=true일 때만 이미지 생성으로 진행합니다. 실패 안내는 CMS 서버 저장 실패가 아니라 이 기안기 단계의 결과입니다. [174행](sources/assets/webhwp-e082-current-20261110.js#L174)
3. 이미지 생성 함수는 임시 편집 문서를1단/이미지용 용지로 조정하고 높이를 최대200회 조절한 뒤 CreatePageImageEx를 호출합니다. 이미지 생성 성공 뒤에만 HML URL과 이미지 URL을 함께 부모에게 통지합니다. **HML SaveAs 성공만으로 부모에게 통지하는 분기는 아닙니다.** [이미지 생성216행](sources/assets/webhwp-e082-current-20261110.js#L216), [용지 조정245행](sources/assets/webhwp-e082-current-20261110.js#L245), [결과/통지283행](sources/assets/webhwp-e082-current-20261110.js#L283)
4. 부모 통지를 먼저 수행한 뒤 저장한 HML을 다시 열어 이미지용 레이아웃 변경을 되돌립니다. 다시 열기 실패 시에는 편집기를 비우고 “저장은 되었지만 파일을 다시 열지 못했습니다.”를 표시하는 코드입니다. 이때도 선행 부모 통지와 CMS 최종 저장 여부는 구분해야 합니다. [283행](sources/assets/webhwp-e082-current-20261110.js#L283)
5. 통지 메시지는 type,slot,itemId,itemDetailId,filePath,hmlUrl,imageUrl을 담고 같은 origin으로 보냅니다. opener가 없거나 닫혔으면 통지 함수는 반환합니다. 다운로드 액션은 별도의 SaveAs(download:true)이며 부모 통지를 호출하지 않습니다. [202행](sources/assets/webhwp-e082-current-20261110.js#L202), [download322행](sources/assets/webhwp-e082-current-20261110.js#L322)

위 단계 중 정상 지문 열기·실제 입력·Save/이미지 생성·부모 통지·저장 문서 재열기는 phase39에서 실행 결과를 확보했습니다. SaveAs/이미지 생성 실패·잘못된owner 거부·저장 후 재열기 실패는 여전히 코드 분기만 확인한 범위입니다.2254의 빈 결과칸과2324/2328의 passage 임시 결과 수신을 서로 다른 시점으로 기록합니다. [초기 빈 pending](evidence/2254-own-set-child-form-omr-baseline.json#L53), [저장 재조회](evidence/2324-own-shared-hml-save-reconcile-no-repeat.json#L53), [부모 pending](evidence/2328-own-hml-shared-parent-pending-confirm.json#L53), [재열린 문서](evidence/2325-own-shared-hml-saved-reconcile-text.json#L53)

**부모의 신원 검사·네 슬롯·null 계승 계약**

| 검사·처리 | 프런트엔드 선언 | 해석 범위 |
|---|---|---|
|origin/type |e.origin=location.origin, data 존재, type=webhwp-saved일 때만 처리합니다. |다른 origin/type 메시지는 무시합니다. [33행](sources/own-set2089242-modify-save-inline-20261110.js#L33) |
|owner 신원 |e.data.itemId와itemDetailId를 현재 data-editor-url 버튼의 dataset과 문자열로 엄격 비교합니다. |불일치면 hmlMismatchModal을 열고 반환합니다. 같은 공유 지문이어도 다른 자식/상세이면 이 검사를 통과하지 못합니다. [36행](sources/own-set2089242-modify-save-inline-20261110.js#L36), [현재 owner6593행](sources/own-set2089242-modify-baseline-20261110.html#L6593), [불일치 안내6783행](sources/own-set2089242-modify-baseline-20261110.html#L6783) |
|slot |HML_SLOTS에 등록된 passage/translation/question/explain만 받습니다. |알 수 없는 슬롯은 로그 후 무시합니다. [9행](sources/own-set2089242-modify-save-inline-20261110.js#L9), [45행](sources/own-set2089242-modify-save-inline-20261110.js#L45) |
|저장 버퍼 |webhwpSavedHml[slot],webhwpSavedImage[slot]에 먼저 저장합니다. |화면의 readonly 결과 input은 표시용입니다. payload의 출처는 이 버퍼이며 표시 input을 읽는 코드가 아닙니다. [16행](sources/own-set2089242-modify-save-inline-20261110.js#L16), [52행](sources/own-set2089242-modify-save-inline-20261110.js#L52), [213행](sources/own-set2089242-modify-save-inline-20261110.js#L213) |
|HML 카드 |결과 이미지로 해당 슬롯의 썸네일 영역을 다시 만듭니다. |HTML question/passage 모델 갱신 함수가 아니라 HML 미리보기 카드의 이미지 교체입니다. 원본 HML 미리보기 이미지가 표시되는 정상 사양과 부합합니다. [64행](sources/own-set2089242-modify-save-inline-20261110.js#L64), [기준 지문 미리보기6606행](sources/own-set2089242-modify-baseline-20261110.html#L6606) |

| 슬롯 | CMS payload의 두 필드 | 기준2089242의 원본 |
|---|---|---|
|passage |passageFilename·passageImageUrl |공유 지문2089241/1933의_J.hml입니다. [정의10행](sources/own-set2089242-modify-save-inline-20261110.js#L10), [기준6662행](sources/own-set2089242-modify-baseline-20261110.html#L6662) |
|translation |translationFilename·translationImageUrl |현재 path는 비어 있습니다. 이 표본의 파일 부재와 기능 지원 범위를 구분합니다. [정의11행](sources/own-set2089242-modify-save-inline-20261110.js#L11), [기준6663행](sources/own-set2089242-modify-baseline-20261110.html#L6663) |
|question |questionFilename·questionImageUrl |2089242/2088873의_Q.hml입니다. [정의12행](sources/own-set2089242-modify-save-inline-20261110.js#L12), [기준6664행](sources/own-set2089242-modify-baseline-20261110.html#L6664) |
|explain |explainFilename·explainImageUrl |2089242/2088873의_A.hml입니다. [정의13행](sources/own-set2089242-modify-save-inline-20261110.js#L13), [기준6665행](sources/own-set2089242-modify-baseline-20261110.html#L6665) |

hmlFilenames()은 수신한 URL을 해당 필드에 넣고, 값이 없거나 빈 문자열이면 ||null로 만듭니다. 예를 들어 passage만 받았다면 passage의 두 필드는 임시 URL, 나머지 여섯 필드는 null이 되는 구성입니다. 이 null은 코드 주석상 기존 로드 앵커의 경로를 계승시키는 값이며 **프런트에서 원본 파일을 삭제하라는 별도 요청을 만드는 것은 아닙니다.** 후속 phase39에서는passage만 받은 정상 전체반영에서 새공유P 게시와미변경Q/A 등20개 자산 유지가 확인됐습니다. 다른loadDraft/빈값/실패·충돌 조합의 서버 처리는 별도 검증이 필요합니다. [후속 비교](shared-hml-save-comparison-20261110.json#L1), [슬롯 합성212행](sources/own-set2089242-modify-save-inline-20261110.js#L212), [loadDraft=false·계승 주석98행](sources/own-set2089242-modify-save-inline-20261110.js#L98), [payload 합치기242행](sources/own-set2089242-modify-save-inline-20261110.js#L242)

여기서 “수정하지 않은 HML 슬롯=null”과 “수정하지 않은 HTML 문서=null”은 같은 규칙이 아닙니다. HTML 편집기가 미마운트라면 원본 JSON을 읽어 보내고, 마운트됐다면 현재 문서를 꺼냅니다. HML 버퍼는 원본 경로를 재전송하는 대신 null 계승 계약을 사용합니다. 실제로 지문이 없는 단건2089246의 passage 문서/슬롯 부재도 이와 구분해야 합니다. [원본 JSON fallback110행](sources/own-set2089242-modify-save-inline-20261110.js#L110), [currentDoc147행](sources/own-set2089242-modify-save-inline-20261110.js#L147), [HML 필드212행](sources/own-set2089242-modify-save-inline-20261110.js#L212), [단건 기준](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53)

메시지 수신 때의 itemDetailId 검사는 팝업 결과의 신원 검사입니다. 최종 CMS payload에는 itemId·loadDraft와문서/메타/OMR·HML8필드가 있고 명시적인 itemDetailId나네 자식ID 목록은 없습니다. HTML 저장 뒤 현재 편집 URL은 새 상세2088906을 사용하면서 Q/A HML 경로는 옛 상세2088873을 유지하므로 **팝업 소유자 상세ID와 HML 파일 경로의 상세 구간을 같다고 가정하면 안 됩니다.** passageData의passageKey만으로 서버의 낙관적 잠금·모든 자식 버전 정책을 확정할 수도 없습니다. [신원 검사38행](sources/own-set2089242-modify-save-inline-20261110.js#L38), [payload242행](sources/own-set2089242-modify-save-inline-20261110.js#L242), [실제 새 URL/옛 파일 경로](evidence/2273-own-shared-html-all5-edit-references-after.json#L53)

**HTML·HML·OMR의 변경과 동기화 범위**

| 변경 원천 | 프런트에서 갱신하는 대상 | 이 코드에서 자동으로 수행하지 않는 것 |
|---|---|---|
|HML 팝업 저장 결과 수신 |슬롯 HML/이미지 URL 버퍼·readonly 표시·HML 카드 이미지. |questionEditor/passageEditor 문서나 OMR 폼을 갱신하지 않습니다. HML을 파싱해 HTML로 다시 주입하는 호출도 이 수신 핸들러에는 없습니다. [33~62행의 수신 처리](sources/own-set2089242-modify-save-inline-20261110.js#L33) |
|HTML 문항/지문 편집 |현재 HTML editor의 document와promptText를 수집해 questionData/passageData 및 검색용 content로 보냅니다. |이 저장 경로가 webhwpSavedHml/Image를 채우거나 HML 파일을 새로 생성하는 것은 아닙니다. [collectDocs160행](sources/own-set2089242-modify-save-inline-20261110.js#L160), [prompt/payload238행](sources/own-set2089242-modify-save-inline-20261110.js#L238) |
|OMR 폼 편집 |현재 #omrSlot의 data-omr-code를 기준으로 serialize한omr/answer를 보냅니다. |HTML의answerText/grading을 그대로 OMR 정답으로 대체하는 payload 코드가 아닙니다. [serializeOmr198행](sources/own-set2089242-modify-save-inline-20261110.js#L198), [payload243행](sources/own-set2089242-modify-save-inline-20261110.js#L243), [실제 빈 직렬화](evidence/2254-own-set-child-form-omr-baseline.json#L53) |

프런트는 HML URL과HTML 문서를 따로 수집하며, 실제 두 방향의 저장에서도 분리가 관측됐습니다. HTML+OMR 저장2270은 공유 HTML을 바꾸고 관측HML/PNG22개를 유지했습니다. HML 저장2333은 공유P 파일/미리보기를 바꾸고 기존HTML 식별문구·질문·OMR을 유지했습니다. 이는 이 자체 세트의 표본 결과이며 모든 변환/후처리의 일반 동기화 규칙을 입증하지 않습니다. [수집148행](sources/own-set2089242-modify-save-inline-20261110.js#L148), [HML212행](sources/own-set2089242-modify-save-inline-20261110.js#L212), [HTML 저장 비교](shared-html-save-comparison-20261110.json#L12), [HML 저장 비교](shared-hml-save-comparison-20261110.json#L1)

2252는 저장 전 네 자식의 공통 HTML/HML 기준이며,2273은 저장 후 네 자식의 공유 HTML 식별문구와기존 HML 경로를 확인한 별도 시점입니다. 두 시점을 섞어 “공유 HTML이 변하지 않았다”거나 “HML 편집 후 전파가 끝났다”고 판단하지 않습니다. [기준 수정폼](evidence/2252-own-active-set-all5-edit-reference-baseline.json#L53), [저장 후 수정폼](evidence/2273-own-shared-html-all5-edit-references-after.json#L53)

**전체반영의 검사 순서와 현재 SBSANM 차단**

| 순서 | 코드상 검사/동작 | 실패 또는 통과의 범위 |
|---|---|---|
|1. 필수 메타 |ItemValidate.missing에난이도·단원코드·행동영역·문항형태를 전달합니다. 배열은1개 이상, 그 외는 truthy인지 판정합니다. |누락 목록을 알리고 첫 누락 필드의 탭/위치로 이동한 뒤 반환합니다. 성취기준·내용영역·교과역량·유형정보는 이 공통 필수4항목 목록에 없습니다. [공통 목록7행](sources/assets/itemValidate-7275b6d68481b3ac74a2f86ada386528.js#L7), [filled15행](sources/assets/itemValidate-7275b6d68481b3ac74a2f86ada386528.js#L15), [호출387행](sources/own-set2089242-modify-save-inline-20261110.js#L387) |
|2. HTML 문서 수집/검증 |collectDocs(true)가question와passage 문서를 얻습니다. 마운트된 편집기는 editor.save()를 호출하고, 미마운트는 원본 JSON fallback을 사용합니다. 문항형태가 선지 경계를 넘으면 임시 편집기로 맞추는 별도 분기도 있습니다. |둘 중 문서를 만들지 못하면 toast/HTML 탭 이동 후 확인창에 가지 않습니다. 여기서는 HTML 편집기 내부의 모든 세부 유효성 규칙까지 분석한 것은 아닙니다. [116행](sources/own-set2089242-modify-save-inline-20261110.js#L116), [132행](sources/own-set2089242-modify-save-inline-20261110.js#L132), [160행](sources/own-set2089242-modify-save-inline-20261110.js#L160) |
|3. 현재 OMR 검증 |OmrValidate.check가현재 리프의 serialize 결과를 validate에 전달합니다. 규칙 없는 리프는 통과시키는 코드이며, 예외가 나면 “OMR을 읽지 못했습니다.”를 반환합니다. |메시지가 있으면 토스트/OMR 탭 이동 후 반환합니다. 저장 JSON 부재를 직접 검사하는 상세 화면의checkData와 다릅니다. [check38행](sources/assets/omrMonitor-023b42ef6d70938f6d9e24d4cdb01e3f.js#L38), [checkData49행](sources/assets/omrMonitor-023b42ef6d70938f6d9e24d4cdb01e3f.js#L49), [호출402행](sources/own-set2089242-modify-save-inline-20261110.js#L402) |
|4. 최종 확인창 |앞선 필수 검사·문서 수집·OMR 검사에 모두 통과한 뒤 applyAllModal을 엽니다. |아직 CMS 저장 POST가 아닙니다. 취소할 수 있고 최종 저장 버튼 콜백에서만 apply-all을 호출합니다. [421~430행](sources/own-set2089242-modify-save-inline-20261110.js#L421), [확인 콜백347행](sources/own-set2089242-modify-save-inline-20261110.js#L347) |
|5. 서버 저장·결과 |JSON POST 뒤res.ok/redirect 여부와HX-Trigger.showToast를 읽습니다.200 응답이어도showToast가 있으면 반려로 처리하고 화면에 남습니다. 정상 처리로 간주하면 상세로 이동합니다. |HTTP200만으로 저장 성공을 판정하면 안 됩니다. 이 처리기의 존재가 실제 서버 규칙 전체를 보여주지는 않습니다. [save304행](sources/own-set2089242-modify-save-inline-20261110.js#L304), [saveAndLeave337행](sources/own-set2089242-modify-save-inline-20261110.js#L337) |

전체반영 확인창 전에 applyDocs에 보관하는 것은 question/passage의 HTML 문서입니다. 메타·OMR·HML URL은 최종 save()의 buildPayload()에서 다시 읽습니다. 따라서 “검증 시 전체 payload가 모두 고정된다”는 정책으로 해석하지 않습니다. 이는 수집 시점의 코드 차이이며 이 보고서에서 확인창 중간의 비동기 수신/변경을 실제로 시험했다는 뜻은 아닙니다. [applyDocs421행](sources/own-set2089242-modify-save-inline-20261110.js#L421), [최종 buildPayload 호출304행](sources/own-set2089242-modify-save-inline-20261110.js#L304), [동적 필드 수집242행](sources/own-set2089242-modify-save-inline-20261110.js#L242)

SBSANM의 박스 모드는 TEXT 필드와ORDERED→VALUE 정답을 직렬화합니다. 현재 정답 칸이 빈 문자열이면OmrValidate.field→box에서 “정답을 입력해주세요.”를 반환합니다. 범례 모드는 별도의2개 이상·빈값/중복·정답선택 규칙이며 앞/뒤 수식어는 이 리프의 유효성 검사 대상이 아닙니다. [현재 리프 직렬화6436행](sources/own-set2089242-modify-baseline-20261110.html#L6436), [현재 모드 검사6467행](sources/own-set2089242-modify-baseline-20261110.html#L6467), [field/box87행](sources/assets/omrMonitor-023b42ef6d70938f6d9e24d4cdb01e3f.js#L87)

| 실제 관찰 | 결과 | 해석 |
|---|---|---|
|2254 기본 폼 |HML 탭 활성·qtType=SBSANM·난이도1·OMR box 모드·정답 빈값, HML 결과8칸 빈값입니다. 직렬화는omr=[TEXT],answer=ORDERED[VALUE(value="")]입니다. [2254](evidence/2254-own-set-child-form-omr-baseline.json#L53). |본문에2×1행렬이라는 정답이 있어도 현재 OMR 정답은 비어 있습니다. |
|2257 전체반영 진입1회 |clickedEntryOnly=true,finalConfirmClicked=false, visibleModals=[]이며 “정답을 입력해주세요.”와OMR 탭 이동을 관측했습니다. [2257](evidence/2257-own-set-child-actual-apply-prevalidation.json#L52). |확인창보다 앞의 실제 음성 경로입니다. 최종 저장·서버 저장 반려·새 버전 생성 시험이 아닙니다. |
|2258 후속 관찰 |OMR 탭·같은 빈 box/직렬화·같은 경고·모달없음·HML 결과8칸 빈값을 확인했습니다. [2258](evidence/2258-own-set-child-apply-validation-result.json#L53). |순간 전환 결과만이 아니라 후속 상태도 확인했습니다. 실제 HML 결과를 받은 후의 재시험은 아닙니다. |

**남은 조건부 예외:** HML만 바꾸면 OMR 검증을 건너뛰는 분기는 없으며 HML 수신이 OMR 정답을 채우지도 않습니다. 빈 정답 상태의 일반 차단은2257에서, 기존 유효 정답을 보존한 HML 저장의 통과는2331~2333에서 확인했습니다. HML 결과 수신 후 정답을 다시 비웠을 때의 차단은 코드상 예상 경로이며 실제로 재실행하지 않았습니다. [검사426행](sources/own-set2089242-modify-save-inline-20261110.js#L426), [음성 경로](evidence/2257-own-set-child-actual-apply-prevalidation.json#L52), [양성 확인창](evidence/2331-own-shared-hml-cms-apply-confirmation.json#L52), [최종 저장](evidence/2333-own-shared-hml-cms-final-save-once.json#L53)

임시저장은 필수/HTML 검증/OMR 검사를 호출하지 않지만 현재 OMR을 직렬화해payload로 보내는 것은 같습니다. 빈 OMR을 검증 없이 보내는 코드와서버가 반드시 성공 저장하는 정책은 다릅니다. 이번 자체 세트는 **전체반영의 HTML+첫 자식 OMR 성공**을 확인했으며, 이 결과를 CMS 임시저장이나HML 편집 저장의 성공으로 바꾸어 기록하지 않습니다. [임시저장413행](sources/own-set2089242-modify-save-inline-20261110.js#L413), [payload243행](sources/own-set2089242-modify-save-inline-20261110.js#L243), [실제 전체반영](evidence/2270-own-shared-html-full-apply-submit-once.json#L52), [반영 후 OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53)

**실제 양성 경로: HTML 공유 지문+첫 자식 OMR 전체반영**

기본 빈 정답 차단 뒤,2089242의 HTML 공유 지문에 **[QA-SHARED-HTML-20261110]**을 입력하고 현재SBSANM 정답을2×1행렬로 보완했습니다. 정상 정답 뒤 전체반영 확인창을 열어 최종 저장을 **한 번** 눌렀습니다.2270은clickedOnce=true·hmlPendingEmpty=true를 기록합니다. HML 별도창을 열거나 새 HML 결과를 받는 조작은 이 성공 경로에 포함되지 않았습니다. [최종 저장](evidence/2270-own-shared-html-full-apply-submit-once.json#L52), [입력·검증·최종 처리 순서](session-20261110-phase37.json#L4)

| 문항 | 상세ID 전→후 | 공유 HTML 지문 | 저장 OMR/정답·상태 |
|---|---|---|---|
|2089242 |2088873→2088906 |식별문구가 있습니다. |TEXT·ORDERED→VALUE의2×1행렬 정답 저장, R 유지. [상세](evidence/2272-own-shared-html-all5-server-after.json#L53), [지문](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53) |
|2089243 |2088874→2088907 |식별문구가 있습니다. |savedOmrData/savedAnswerData는null, R 유지. [상세](evidence/2272-own-shared-html-all5-server-after.json#L53), [지문/OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53) |
|2089244 |2088875→2088908 |식별문구가 있습니다. |savedOmrData/savedAnswerData는null, R 유지. [상세](evidence/2272-own-shared-html-all5-server-after.json#L53), [지문/OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53) |
|2089245 |2088876→2088909 |식별문구가 있습니다. |savedOmrData/savedAnswerData는null, R 유지. [상세](evidence/2272-own-shared-html-all5-server-after.json#L53), [지문/OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53) |
|비교 단건2089246 |2088877→2088877 |passageEditorData가 없고식별문구도 없습니다. |savedOmrData/savedAnswerData는null, R 유지. [동일 상세](evidence/2272-own-shared-html-all5-server-after.json#L53), [문서/OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53) |

네 자식 수정폼의passageEditorData는passageKey=passage:2089241을 유지하면서 passageHtml/promptText에 식별문구를 포함합니다. 각questionEditorData는 저장 전과 같았습니다. 따라서 **공유 지문 Doc의 변경과 개별 질문 Doc의 불변을 분리**해야 합니다. 첫 자식의 OMR 정답이 저장돼도 질문 모델의 원래answerText/grading은 별도의 비교 대상입니다. [수정폼의 두 Doc](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [OMR 포함 후속 조회](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53), [비교 행](shared-html-save-comparison-20261110.json#L12)

비교 자료의questionViewerModelsUnchanged=true는 상세 관찰기가 **.qv-item 안의 JSON만** 수집한 결과입니다. 이 집합에는 공유 지문 Doc가 포함되지 않습니다. 그러므로 이를 “화면의 모든 HTML 모델이 그대로” 또는 “공유 지문이 저장되지 않음”으로 해석하면 안 됩니다. 공유 지문 변경은 별도로 추출한 passageEditorData에서 직접 확인됐습니다. [.qv-item 수집 범위7행](sources/runtime/hml666-own-items-baseline-read.js#L7), [수정폼 Doc 수집7행](sources/runtime/hml666-modify-reference-baseline-read.js#L7), [실제 공유 Doc](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [구분된 비교 결과](shared-html-save-comparison-20261110.json#L12)

기준 관측 자산은 서로 다른22개 URL, 즉HML11개·PNG11개입니다. 저장 후 다섯 수정폼의HML 슬롯 경로는 그대로이고, 이전과 같은22개 URL을 다시 읽은 기록은 모두HTTP200·동일SHA256입니다. 공유J의HML/PNG도1933 경로·동일 해시를 유지합니다. 이 정적 작업은 저장된 전후 비교의22개 URL·이전 해시가 기준 자료와 일치함을 검산했으며 원격 파일을 새로 요청하지 않았습니다. [수정폼 경로](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [저장 전 수집](hml666-pre-shared-edit-baseline-20261110.json#L1), [저장 후22개 수집·비교](shared-html-save-comparison-20261110.json#L110)

이 표본에서는 **새 공유 HTML과 이전 HML/PNG가 함께 유지**됐으므로 HTML 변경이 관측 HML 파일 변경으로 이어지지 않은 성공 사례입니다. 대상 자식의 현재 상세ID가2088906이어도 Q/A 파일 경로는2088873이고 공유J 파일 경로는1933입니다. 이 파일 경로의 숫자를 현재 문항/공유 지문 DB 상세ID와동일시할 수 없습니다. **현재 공유 지문 DB 상세ID는 미확인입니다.** [새 상세/옛 경로](evidence/2273-own-shared-html-all5-edit-references-after.json#L53), [파일 불변](shared-html-save-comparison-20261110.json#L110), [DB 상세ID 한계](session-20261110-phase37.json#L11)

한 번의 제출로 네 자식 상세가 갱신됐지만, 이번 개입은 **공유 HTML 변경과 첫 자식 OMR 보완을 함께 저장한 것**입니다. OMR만 바꾼 경우나 무변경 저장의 버전 생성 정책을 독립적으로 시험한 것은 아닙니다. 또한 다른 세 자식의 OMR은null이므로 이 성공을 “세트 전체의 OMR이 모두 준비됐다”거나 “모든 자식이 승인됐다”로 해석하지 않습니다. 네 자식의 상태는 계속R입니다. [한 번 제출](evidence/2270-own-shared-html-full-apply-submit-once.json#L52), [네 상세의R](evidence/2272-own-shared-html-all5-server-after.json#L53), [OMR 차이](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53)

phase37에는 새 전체 화면PNG가 없습니다. 실제 입력·최종 저장·독립 서버 재조회·파일 해시 비교는 확인했지만, 이를 HTML/HML 카드 전체의 새 픽셀 검토 완료로 세지 않습니다. 서버의모든 자료/역할/상태·HML→HTML 변환·HML 편집 후 전파 정책 역시 이번HTML 저장 한 사례를 넘어서 확정하지 않습니다. [단계별 실행](session-20261110-phase37.json#L4), [픽셀·일반화 한계](session-20261110-phase37.json#L19)

**실제 양성 경로: 공유 HML 편집·임시 결과·CMS 게시**

| 단계 | 실제 조작/결과 | 경계 |
|---|---|---|
|편집기 열기·슬롯 선택 |최신2088906 수정폼에서 실제 열기 버튼을 누르고 해당t57 편집기만 선택했습니다. 부모는2089242였고, 기본Q 다음 지문 버튼으로1933/J 파일을 열었습니다. 지문/문제/해답은 활성, 해석은 파일이 없어 비활성이었습니다. [열기](evidence/2303-own-set-shared-hml-open-actual-editor.json#L1), [부모/슬롯](evidence/2307-own-hml-editor-opener-and-slots.json#L53), [지문 열기](evidence/2309-own-hml-passage-slot-actual-open.json#L1), [슬롯 관찰](session-20261110-phase39.json#L1) |실제 편집기 창을 여는 동작이며 단순 URL/소스 수집과 구분합니다. |
|지문 입력 |수정 전GetTextFile(TEXT)는 원문·modified=false·1페이지였습니다. agent-browser의 페이지 안 pointer/Control+Home/keyboard type으로[QA-SHARED-HML-20261110]을 넣고 텍스트·modified=true를 확인했습니다. [전](evidence/2313-own-hml-passage-before-text-and-caret.json#L53), [포인터](evidence/2314-own-hml-passage-caret-move.json#L1), [문서 처음](evidence/2317-own-hml-passage-document-start.json#L1), [실제 키입력](evidence/2318-own-hml-passage-marker-type.json#L1), [후](evidence/2319-own-hml-passage-edited-text-read.json#L53) |파일 내용을 외부에서 대체해 편집한 것이 아니라 실제 열린 편집기의 입력 결과입니다. |
|벤더 Save1회 |실제 Save를 한 번 누른 뒤 읽기 재조회에서 임시HML/PNG·저장 안내·재열린 문서의표식/modified=false를 확인했습니다. [Save](evidence/2320-own-shared-hml-editor-save-once.json#L1), [결과 재조회](evidence/2324-own-shared-hml-save-reconcile-no-repeat.json#L53), [재열린 문서](evidence/2325-own-shared-hml-saved-reconcile-text.json#L53) |벤더 임시저장1회이며 CMS 임시저장이나 Master 최종반영이 아닙니다. |
|부모 수신·CMS 확인 |passage.hml/image만 채워지고 다른6칸은 비었습니다. 독립5개수정폼은 아직 게시 전 기준이었고, 이후 전체반영 검증을 통과해 확인창을 열었습니다. [pending](evidence/2328-own-hml-shared-parent-pending-confirm.json#L53), [게시 전 GET](evidence/2330-own-hml-shared-all5-precommit-reference.json#L53), [확인창](evidence/2331-own-shared-hml-cms-apply-confirmation.json#L52) |편집기 Save와 CMS 게시 사이의 미반영 구간을 실제로 구별했습니다. |
|CMS 최종 저장1회 |확인창의 최종 저장을 한 번 눌러 서버5문항/수정폼을 재조회했습니다. [제출](evidence/2333-own-shared-hml-cms-final-save-once.json#L53), [상세](evidence/2335-own-shared-hml-all5-server-after.json#L53), [수정폼](evidence/2336-own-shared-hml-all5-edit-reference-after.json#L53) |이번 단계의 확정 Master 업무 증가는1회입니다. 벤더 임시Save와 자식4개 버전 수를 더하지 않습니다. [집계](session-20261110-phase39.json#L1) |

2321의 후속 결과 관찰은 조작 전getURL 읽기에서 약30초 후연결응답 시간초과(os10060)로 중단됐습니다. 이때 Save를 다시 누르지 않았고,2323의 네이티브 대화상자없음 확인 후2324/2325 읽기 재조회로 벤더 저장 성공을 확정했습니다. **CMS 저장 실패·권한 미승인·재저장 사례로 분류하지 않습니다.**2322는 실행 근거가 없습니다. [관찰 연결 실패](evidence/2321-own-shared-hml-editor-temp-result.json#L1), [대화상자 상태](evidence/2323-own-hml-editor-native-dialog-status.json#L1), [재조회 성공](evidence/2324-own-shared-hml-save-reconcile-no-repeat.json#L53), [표식/미수정 상태](evidence/2325-own-shared-hml-saved-reconcile-text.json#L53)

| 문항 | HTML 저장 뒤 상세→HML 저장 뒤 상세 | HML 이후 결과 |
|---|---|---|
|2089242 |2088906→2088976 |R·공통 새passage1966/P, HTML/질문·첫 자식 OMR 유지. [비교](shared-hml-save-comparison-20261110.json#L1) |
|2089243 |2088907→2088977 |R·같은 새passage경로, HTML/질문·OMR null 유지. [비교](shared-hml-save-comparison-20261110.json#L1) |
|2089244 |2088908→2088978 |R·같은 새passage경로, HTML/질문·OMR null 유지. [비교](shared-hml-save-comparison-20261110.json#L1) |
|2089245 |2088909→2088979 |R·같은 새passage경로, HTML/질문·OMR null 유지. [비교](shared-hml-save-comparison-20261110.json#L1) |
|단건2089246 |2088877→2088877 |지문없음·질문/OMR·HML슬롯 유지. [비교](shared-hml-save-comparison-20261110.json#L1) |

네 자식의 새 공통 경로는 **/passage/208/2089241/1966/hml/2089241_P.hml**입니다. 편집기 슬롯명은passage이고 원본은1933/2089241_J.hml이었지만 게시된 이름은P입니다. 이 J→P 차이와1966은 관측한 파일 경로이며 모든 명명 규칙이나 현재공유지문 DB상세ID를 직접 확인한 결과로 확장하지 않습니다. [후속 수정폼](evidence/2336-own-shared-hml-all5-edit-reference-after.json#L53), [경로/한계](shared-hml-save-comparison-20261110.json#L1)

새HML은24490B, PNG는5415B·497×99이며 임시 결과와 게시파일의SHA256이 각각 같습니다. 현재 참조22개 중 기존Q/A/단건 자산20개는 동일 경로/해시이고, 새공유P의두파일이 추가됐습니다. 참조에서 교체된 구J 두파일도 별도로 재조회해 기존해시를 유지했습니다. **기존20+새P2의 현행 집합과 별도 구J2를 섞어22개 모두가 불변이라고 쓰지 않습니다.** [벤더 임시 결과](shared-passage-hml-temp-results-20261110.json#L1), [게시/구J 비교](shared-hml-save-comparison-20261110.json#L1)

공유 HTML의[QA-SHARED-HTML-20261110] 문구와passageDoc는 그대로이고, 새HML에는HML 표식과원문이 있으며HTML 표식은 없습니다. 질문 모델과다섯 문항의저장OMR도HML 저장 전후가 같습니다. 따라서 이번HML 편집이 공유 HTML을 덮어쓰거나 모든자식 OMR을 복제한 것은 아닙니다. [5문항 수정폼](evidence/2336-own-shared-hml-all5-edit-reference-after.json#L53), [모델/OMR/파일 비교](shared-hml-save-comparison-20261110.json#L1)

저장된편집기t57만2338에서 닫고 부모 조사탭을 유지했습니다. 이후 부모가 직접 검사한2339~2342 PNG는스크롤0/800/1600/1779,높이1015·총2794의 전체세로를 중첩해서덮습니다. 현재1810px폭의 이 세트상세에서 공유HTML/HML·네자식·하단상태/메타/목록버튼까지 확인됐고 이미지9개가 모두complete/양수크기였습니다. 이 정적 보고서는 부모의PNG 직접 검토 기록을 인용하며 다른 상태/뷰포트의 픽셀 완료로 확장하지 않습니다. [편집기 닫힘](evidence/2338-own-shared-hml-saved-editor-close.json#L1), [상단/이미지](evidence/2339-own-shared-set-persisted-top-pixels.json#L52), [800](evidence/2340-own-shared-set-pixels-800.json#L52), [1600](evidence/2341-own-shared-set-pixels-1600.json#L52), [하단1779](evidence/2342-own-shared-set-pixels-1779.json#L52), [직접 픽셀검토 범위](session-20261110-phase39.json#L1)

**남은 검증과 서버 정책의 한계**

| 확인해야 할 내용 | 현재 확정한 것 | 아직 확정하지 않은 것 |
|---|---|---|
|실제 HML Save→부모 수신 |지문 실제 편집·벤더Save1회·두URL 통지·같은 저장문서 재열기·CMS전체반영을 확인했습니다. |다른 슬롯의 수정저장·다른owner/오래된상세 거부·벤더실패/재열기실패·반복저장. [재조회](evidence/2324-own-shared-hml-save-reconcile-no-repeat.json#L53), [부모](evidence/2328-own-hml-shared-parent-pending-confirm.json#L53), [CMS](evidence/2333-own-shared-hml-cms-final-save-once.json#L53) |
|임시저장과 전체반영의 계승 |HTML 저장의22개 불변과 HML passage만 변경한 전체반영의20개 현행자산 불변·새P파일 게시를 확인했습니다. |CMS 임시저장·다른loadDraft/충돌·이미지 실패/부분 결과의 서버 처리. 벤더 임시Save를CMS 임시저장으로 세지 않습니다. [HTML 비교](shared-html-save-comparison-20261110.json#L110), [HML 비교](shared-hml-save-comparison-20261110.json#L1) |
|공유 지문 자식 전파 |HTML 저장으로2088906~09, 후속HML 저장으로2088976~79와 공통1966/P 경로를 확인했습니다. 단건2088877은 유지됐습니다. |다른세트·승인/폐기상태·동시성/복구·공유지문 현재DB상세ID/정확한 DB 트랜잭션 범위.1966은 여기서 게시 경로 버전으로만 확정합니다. [HTML](shared-html-save-comparison-20261110.json#L12), [HML](shared-hml-save-comparison-20261110.json#L1) |
|HTML/HML 동기화 |HTML 변경 시 기존파일 불변, HML 변경 시 기존HTML/질문/OMR 불변을 각각 확인했습니다. |다른자료/상태/버전·번역·후처리의 자동변환/동기화 전체 정책. [HTML](shared-html-save-comparison-20261110.json#L12), [HML](shared-hml-save-comparison-20261110.json#L1) |
|OMR 보완 후 양성 경로 |첫자식의 유효 정답으로HTML 저장과후속HML 저장을 통과했고 HML 후5개 OMR은 그대로입니다. |실제 채점 미리보기·다른유형/세트전체 검사·HML 수신후빈정답·CMS임시저장. [HTML 뒤 OMR](evidence/2275-own-shared-html-selected-and-sibling-omr-server-read.json#L53), [HML 비교](shared-hml-save-comparison-20261110.json#L1) |
|대조군과 다른권한 |두저장 뒤 단건2089246은상세2088877·질문/OMR·파일을 유지했습니다. |다른문서/역할/서비스 배포·동시편집의 영향. [HTML](shared-html-save-comparison-20261110.json#L12), [HML](shared-hml-save-comparison-20261110.json#L1) |

cutoff2342의 현재 자체 자식 상세는2088976~79, 비교단건은2088877이며 공유HML 경로는1966/2089241_P.hml입니다. 이 경로 숫자를 독립 확인한 현재공유지문 DB상세ID로 단정하지 않습니다. 정상 HTML/HML 지문 저장 두 표본의 자식 갱신은 완료 범위로 유지하고, 실제 번역 파일·다른슬롯·CMS임시저장·상태/권한·충돌/실패/복구 분기는 별도로 남깁니다. [HML 후 재조회](evidence/2336-own-shared-hml-all5-edit-reference-after.json#L53), [비교 범위](shared-hml-save-comparison-20261110.json#L1), [남은 분기](session-20261110-phase39.json#L1)
