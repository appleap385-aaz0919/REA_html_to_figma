# Definition QA 문서 661 처리 결과 검토

작성일: 2026-11-09. 이 보고서는 개발 CMS에서 이미 확보한 증거 1941~1954, 앞선 상태 근거 1906·1908·1937, 지정된 HTML·OMR 미리보기 JS를 정적으로 검토한 결과입니다. 입력 유형 대조에는 로컬 QA ZIP을, 원본 비교에는 기존 530 HTML을 보충했습니다. 이번 검토에서는 브라우저·네트워크·전역 상태 파일을 조작하지 않았고 이 보고서만 작성했습니다.

**확정 수준**

- **실제 표시·동작 확인**: 기존 증거가 포착한 DOM/접근성 값과 클릭 직후의 결과입니다. 이 검토에서 새로 실행한 작업은 아닙니다.
- **재조회 확인**: 같은 식별자를 다시 조회한 HTML/DOM에서도 해당 값이 확인된 경우입니다. DB 직접 검증이나 모든 데이터의 동일성을 뜻하지 않습니다.
- **소스 확인**: 보존된 HTML·JS 또는 ZIP 내부 JSON의 값·분기입니다. 서버 내부 변환 규칙이나 실행 원인은 별도로 입증하지 않습니다.
- 스크롤 증거는 실제 scrollTop과 하단 도달을 기록하지만 픽셀 검사의 대체물은 아닙니다. [문서 스크롤](evidence/1945-definition661-approved-scroll.json#L53), [문항 스크롤](evidence/1949-definition-qa-item2089175-scroll.json#L53)

**핵심 결론**

문서 661은 P→R→M→Y의 순서로 조회되었고 후속 상세에서도 승인 상태가 확인됩니다. 그러나 생성 문항 2089175(2088808)는 **초안 R**, 난이도·단원 등 일부 메타정보는 미입력, 저장 OMR/OMR 정답은 null입니다. OMR 미리보기는 실제 누락 경고로 차단됩니다. 한편 HTML 본문·정답·풀이와 문제/해답 이미지 로드는 확인됐습니다. 이 표본에서 문서 승인, 문항 승인, 메타 충족, OMR 준비는 같은 결과가 아닙니다. [P 목록](evidence/1906-definition-qa-registration-fresh-state.json#L53), [R 상세](evidence/1908-definition661-initial-state.json#L53), [M 상세](evidence/1937-definition661-approval-fresh-state.json#L53), [Y 재조회·문항 초안](evidence/1943-definition661-approved-controls.json#L53), [메타·이미지](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [OMR 차단](evidence/1954-qa-item2089175-empty-omr-notice.json#L52)

**문서 661의 상태 전후**

시각은 각 증거의 수집 시작 UTC에 9시간을 더한 한국 시각입니다. 상태가 실제로 바뀐 정확한 시각이나 처리 소요시간은 아닙니다.

| 수집 시각·근거 | 실제로 확인한 상태와 구성 | 확정할 수 있는 범위 |
|---|---|---|
| 16:58:49 · 1906 | 목록의 661, 파일 QA-DIFI-20261109-01.zip, 등록중(P). 기존 530도 별도 행으로 존재합니다. | 새 QA 식별자가 목록에 있고 P로 표시된 조회 결과입니다. 이 자료만으로 발급·PUT·create 각각의 HTTP 응답을 검증한 것은 아닙니다. [1906](evidence/1906-definition-qa-registration-fresh-state.json#L53) |
| 17:00:10 · 1908 | 같은 661 상세가 초안(R). #1 문항 2089175(2088808), QA 표식, 문제·정답4·풀이가 있습니다. 비고는 활성, 문항 처리 선택값은 S(등록성공), W 선택지는 disabled이며 S/F/D가 선택 가능합니다. 하단 목록·폐기·승인 버튼이 표시됩니다. | R 상태의 문서와 분리 문항 1개를 실제로 확인했습니다. 처리 선택값 S는 문항 사용 승인 Y/N과 다른 값입니다. 이 조회가 선택값 변경·폐기·승인을 실행했다는 뜻은 아닙니다. [1908 필드·액션·본문](evidence/1908-definition661-initial-state.json#L53) |
| 17:14:29 · 1937 | 같은 661이 메타추천중(M). “AI 메타 추천 중입니다.” / “완료되면 자동으로 승인 처리됩니다. 그때까지 편집·배포는 할 수 없습니다.”가 표시됩니다. 문항은 등록성공으로 남고 본문·정답·풀이가 유지됩니다. | M의 실제 표시와 편집/배포 제한 **안내**를 확인했습니다. 실제 AI 서비스 호출·모델 응답·진행률·모든 제한 우회 경로까지 검증한 것은 아닙니다. [1937](evidence/1937-definition661-approval-fresh-state.json#L53) |
| 17:19:19 · 1941 | 보존된 읽기 전용 재조회 결과의 문서 661은 승인(Y), item 링크는 2089175, 카드 배지는 초안·등록성공입니다. QA 비고가 저장된 값으로 읽힙니다. | 반환 HTML에서 Y와 문항 초안이 동시에 확인됩니다. 이 기록은 inert DOM 파싱이므로 브라우저에서 스크립트를 실행한 결과와 구분합니다. [1941](evidence/1941-definition-qa-and-original-read.json#L53) |
| 17:20:44 · 1943 | 실제 상세로 다시 진입한 661도 승인. 비고 disabled, 문항 상세·문항 수정·다운로드·목록이 표시되고 승인·폐기 버튼은 없습니다. 카드의 초안·등록성공과 QA 본문도 유지됩니다. | Y와 비고·연결 문항을 후속 UI 재조회에서도 확인했습니다. 문서 본문 전체는 상·하단 스크롤 근거가 있습니다. [1943](evidence/1943-definition661-approved-controls.json#L53), [1945](evidence/1945-definition661-approved-scroll.json#L53), [문서 승인 배지 L570](sources/definition661-approved-20261109.html#L570), [비고 L647](sources/definition661-approved-20261109.html#L647), [문항 배지 L681](sources/definition661-approved-20261109.html#L681) |

같은 문서 661에 대한 순차 조회에서 P/R/M/Y를 확인했으므로 상태별 기존 모의 문서를 나열한 경우보다 강한 전후 근거입니다. 다만 연속 서버 이벤트 로그가 아니므로 모든 중간 상태, 정확한 상태 전이 시점, 재시도 횟수, AI 작업의 실제 내부 수행을 알 수는 없습니다. W는 이 순서에서 포착하지 않았습니다. M 안내와 뒤이은 Y는 문서 처리 완료 표시와 일치하지만 **모든 메타 추천 성공 또는 문항 자동 승인을 보장하지 않습니다.** [P](evidence/1906-definition-qa-registration-fresh-state.json#L53), [R](evidence/1908-definition661-initial-state.json#L53), [M](evidence/1937-definition661-approval-fresh-state.json#L53), [Y](evidence/1943-definition661-approved-controls.json#L53)

**생성 문항 2089175의 상태와 메타정보**

| 확인 대상 | 실제 표시와 소스 | 판단 |
|---|---|---|
| 문서와 문항의 승인 구분 | 661 상단은 승인이고 #1 카드는 초안·등록성공입니다. 2089175 개별 상세에도 초안 배지와 viewFlag=R checked가 있습니다. | 문서 Y와 문항 R을 각각 확인했습니다. “등록성공”이나 문서 Y를 문항 승인으로 기록하면 안 됩니다. [문서 카드 L681](sources/definition661-approved-20261109.html#L681), [문항 배지 L623](sources/definition-qa-item2089175-detail-20261109.html#L623), [상태값 L737](sources/definition-qa-item2089175-detail-20261109.html#L737), [실제 접근성 결과](evidence/1947-definition-qa-item2089175-detail.json) |
| 비어 있는 메타 | 난이도·단원코드·성취기준·내용영역·행동영역·교과역량·유형정보와 썸네일이 “-”로 표시됩니다. 서버가 렌더한 승인 검사 자료도 difficulty=null, behaviorCode=null, unitCount=0입니다. | 나열한 필드의 현재 표시와 승인 검사 입력값이 미충족입니다. 모든 메타가 없다고 일반화하지 않습니다. [실제 값](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [난이도 L821](sources/definition-qa-item2089175-detail-20261109.html#L821), [단원 등 L877](sources/definition-qa-item2089175-detail-20261109.html#L877), [approvalChecks L1976](sources/definition-qa-item2089175-detail-20261109.html#L1976) |
| 존재하는 정보 | 문항 ID2089175/상세ID2088808, 생성 방식 디피니션, QA 원본파일, 문항 형태 주관식>다답형>일반형, 출처1개, 용도 공통(C), 온오프 전체(N)가 있습니다. 쌍둥이0개·평가지0개·세트“-”·배포“-”입니다. | 일부 식별·연결·형태·용도 정보는 존재합니다. 출처1개의 상세 연결 데이터 전체나 배포 이력을 직접 열어 검증한 것은 아닙니다. [실제 값](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [기본 정보 L794](sources/definition-qa-item2089175-detail-20261109.html#L794), [용도 L742](sources/definition-qa-item2089175-detail-20261109.html#L742), [관계 수 L840](sources/definition-qa-item2089175-detail-20261109.html#L840) |
| 문서의 단원과 문항의 단원 | 문서661에는 단원22EMAT0NGS31, 페이지1~1, 용도 공통, 출처 코드22-E-MA-T0-3-2-DCL-FB-2025가 남습니다. 하지만 개별 문항의 단원코드는“-”이고 승인 검사 unitCount=0입니다. | 문서 입력값이 보존된 것과 문항의 단원 매핑 충족은 별개입니다. 누락의 원인이 AI·파싱·정책·저장 중 어디에 있는지는 이 증거로 결정할 수 없습니다. [문서 L608](sources/definition661-approved-20261109.html#L608), [문항 L877](sources/definition-qa-item2089175-detail-20261109.html#L877), [검사 값 L1976](sources/definition-qa-item2089175-detail-20261109.html#L1976) |
| 실제 버튼 가용성 | OMR 미리보기·문항 수정·상태 수정은 표시됩니다. 배포하기와 쌍둥이 문항 생성은 disabled입니다. | 현재 문항의 UI 가용성입니다. 배포/생성 금지 원인을 특정 메타 한 항목으로 확정하거나 우회 실행 여부를 추정하지 않습니다. 상태 폼은 fieldset disabled로 잠겨 있으므로 관찰기의 개별 select.disabled=false만 보고 편집 활성으로 해석하면 안 됩니다. [실제 버튼](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [잠긴 상태 폼 L737](sources/definition-qa-item2089175-detail-20261109.html#L737), [생성 버튼 L699](sources/definition-qa-item2089175-detail-20261109.html#L699), [실제 접근성 disabled](evidence/1947-definition-qa-item2089175-detail.json) |

소스상 문항의 R→Y/N 전환에는 별도 검사가 있습니다. difficulty/unit/behavior/questionType을 ItemValidate.missing에 전달하고 저장된 OMR/정답을 OmrValidate.checkData로 검사하며, 사유가 있으면 “승인할 수 없습니다” 토스트 후 확인 모달을 열지 않습니다. **이번 범위에서는 이 문항의 승인을 직접 시도하거나 이 가드의 실제 경고를 포착하지 않았습니다.** 따라서 “소스상 현재 값으로 승인 검사에 필요한 항목이 없다”와 “실제 문항 승인 시도가 거절됐다”를 구분합니다. [검사 자료·함수 L1975](sources/definition-qa-item2089175-detail-20261109.html#L1975), [실행 경계 L2041](sources/definition-qa-item2089175-detail-20261109.html#L2041)

**SHORT_ANSWER_ORDERED와 SBMANM의 대응**

로컬 입력 ZIP [QA-DIFI-20261109-01.zip](fixtures/QA-DIFI-20261109-01.zip)은 974B이고 내부 파일은 `2116110901.json` 1개(비압축1855B)입니다. 해당 JSON은 `questionType: "SHORT_ANSWER_ORDERED"`이며 QA 표식이 있는 문제, correctContent의 `$4$`, questionGrading.questionCorrects의 correctValue `$4$`를 포함합니다. 현재 보존 ZIP의 SHA-256은 `728377a7cb716dac95dd378d904cc8f494a788d1ce84d60db1b75958df27e3cf`입니다. 이는 로컬 파일의 이번 정적 확인값이며 원격 업로드 객체와의 바이트 일치를 새로 검증한 것은 아닙니다. [입력 ZIP](fixtures/QA-DIFI-20261109-01.zip)

생성 문항 상세의 OMR 버튼에는 `data-question-type="SBMANM"`가 있고, 승인 검사 자료도 questionType=SBMANM입니다. 실제 문항 형태 표시는 “주관식 > 다답형 > 일반형”입니다. QA 파일명·표식·문항 연결을 함께 대조하면 **이 표본에서 SHORT_ANSWER_ORDERED 입력이 SBMANM 결과로 나타났다는 대응**은 확인할 수 있습니다. 서버 매핑 구현을 직접 읽은 것은 아니므로 모든 SHORT_ANSWER_ORDERED의 일반 규칙, 다른 유형, 세트 구조, 이 분류의 적정성까지 확정하지 않습니다. [입력 ZIP](fixtures/QA-DIFI-20261109-01.zip), [출력 코드 L633](sources/definition-qa-item2089175-detail-20261109.html#L633), [검사 코드 L1976](sources/definition-qa-item2089175-detail-20261109.html#L1976), [문항 연결·QA 표식](evidence/1943-definition661-approved-controls.json#L53), [실제 형태](evidence/1950-qa-item2089175-metadata-and-images.json#L53)

문항의 viewer JSON에는 outType=definition, contentVersion=v3, content.answerText="4", grading.mode=exact_match, grading.value="4", grading.answerValues=["$4$"]가 있습니다. 이것은 HTML 뷰어의 정답·채점 모델이며, 아래의 저장 OMR omrData/answerData와 별도 자료입니다. “정답4가 보인다” 또는 “exact_match가 있다”를 저장 OMR이 완성됐다는 근거로 바꾸면 안 됩니다. [뷰어 JSON L638](sources/definition-qa-item2089175-detail-20261109.html#L638), [실제 모델 요약](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [OMR 자료 L1976](sources/definition-qa-item2089175-detail-20261109.html#L1976)

**저장 OMR 부재와 미리보기 차단**

1. **자료 부재는 소스와 실제 DOM이 일치합니다.** 버튼은 data-omr-saved와 SBMANM만 있고 data-saved-omr/data-saved-answer 속성이 없습니다. approvalChecks에도 omrData=null/answerData=null입니다. 1953의 버튼 dataset에도 해당 저장 속성이 없고, 1954의 getAttribute 결과 역시 savedOmr=null/savedAnswer=null입니다. 이는 현재 상세에 저장된 OMR·정답 자료가 제공되지 않았다는 강한 근거입니다. DB의 다른 버전이나 다른 저장소에도 절대 없다는 증명은 아닙니다. [버튼 L633](sources/definition-qa-item2089175-detail-20261109.html#L633), [자료 L1976](sources/definition-qa-item2089175-detail-20261109.html#L1976), [1953](evidence/1953-qa-item2089175-omr-fresh-state.json#L52), [1954](evidence/1954-qa-item2089175-empty-omr-notice.json#L52)
2. **1951은 검사 실패입니다.** 실제 버튼 클릭 뒤 shown.bs.modal 이벤트를 3500ms 기다렸으나 “OMR modal did not finish showing”으로 timeout이 났습니다. 모달이 반드시 열려야 한다는 검사 기대가 맞지 않았습니다. 이 자료에는 그때의 실제 경고 스냅샷이 없으므로 차단 문구의 직접 근거로 쓰지 않습니다. 또한 이 3500ms는 검사 대기시간이며 OMR 프런트의 15000ms ready timeout과 다릅니다. [1951 명령·오류](evidence/1951-qa-item2089175-omr-preview-open.json), [실제 프런트 READY_TIMEOUT L13](sources/assets/omrPreview-c59d76018482dcb8bfb460b8d8e6698c.js#L13)
3. **1953은 미열림 상태, 1954는 실제 차단 사유입니다.** 1953에서 모달 display=none, iframe=null, 경고 본문은 빈값입니다. 1954는 저장 속성 부재와 모달이 없는 조건을 확인한 뒤 다시 클릭했고, “OMR 미리보기 불가 / OMR 이 입력되지 않았습니다.”를 textContent로 포착했습니다. 동시에 modalCount=0, previewFrameCount=0입니다. 이 표본의 실제 결과는 OMR 누락 경고 후 미리보기 미생성입니다. [1953](evidence/1953-qa-item2089175-omr-fresh-state.json#L52), [1954](evidence/1954-qa-item2089175-empty-omr-notice.json#L52)
4. **소스상 정상 차단 순서와 대응합니다.** readSaved는 없는 속성을 JSON null로 읽습니다. 저장 모드에서는 OmrValidate.checkData를 먼저 호출하고, 사유가 있으면 “OMR 미리보기 불가” 토스트 후 return합니다. 모달 iframe 생성과 show는 이 검사들을 통과한 뒤의 open에 있습니다. 해당 페이지는 검토한 동일 해시의 omrPreview JS를 선언합니다. 따라서 누락 자료가 모달 열기 전에 차단되는 흐름은 소스와 실제 1954가 일치합니다. 이 근거로 프런트 서버 장애·CORS·iframe 지연을 원인으로 추정하지 않습니다. [readSaved L49](sources/assets/omrPreview-c59d76018482dcb8bfb460b8d8e6698c.js#L49), [검사·return L101](sources/assets/omrPreview-c59d76018482dcb8bfb460b8d8e6698c.js#L101), [iframe·show L68](sources/assets/omrPreview-c59d76018482dcb8bfb460b8d8e6698c.js#L68), [페이지 선언 L4470](sources/definition-qa-item2089175-detail-20261109.html#L4470)

상세 HTML에 여러 OMR 유형의 숨은 템플릿·직렬화 코드가 포함되어 있다는 사실도 해당 문항의 저장 OMR을 의미하지 않습니다. 실제 미리보기는 data-omr-saved 버튼의 저장 JSON 경로를 사용했고 null로 확인됐습니다. [저장/편집 경로 선택 L101](sources/assets/omrPreview-c59d76018482dcb8bfb460b8d8e6698c.js#L101), [숨은 코드와 별개인 실제 버튼 L633](sources/definition-qa-item2089175-detail-20261109.html#L633), [실제 null 결과](evidence/1954-qa-item2089175-empty-omr-notice.json#L52)

**실제 문제·해답 이미지 로드**

1950은 img.complete뿐 아니라 자연 크기를 읽었습니다. 문제 Q 이미지는 **492×218**, 해답 A 이미지는 **492×277**이고 두 이미지 모두 complete=true입니다. URL은 해당 문항/상세 버전 경로 `.../2089175/2088808/image/2089175_Q.png`, `.../2089175_A.png`입니다. 소스에 URL만 있는 수준을 넘어, 그 시점 브라우저에서 비어 있지 않은 이미지 리소스가 로드된 것으로 확인할 수 있습니다. [실제 이미지 상태](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [문제 슬롯 L671](sources/definition-qa-item2089175-detail-20261109.html#L671), [해답 슬롯 L678](sources/definition-qa-item2089175-detail-20261109.html#L678)

이는 사용자가 정정한 “오른쪽 HML 카드에는 원본 미리보기 이미지가 표시된다”는 사양과 일치하는 정상 표시 표본입니다. 이 검토에서는 이미지 픽셀을 새로 열어 내용·누락·수식 품질을 비교하지 않았으며, 모든 문항의 이미지 오류가 복구됐다고 주장하지 않습니다. 또한 이미지 로드 성공은 OMR 생성·문항 승인·모든 메타 충족의 증거가 아닙니다. [HML 슬롯 원본](sources/definition-qa-item2089175-detail-20261109.html#L666), [실제 이미지와 메타·문항 상태](evidence/1950-qa-item2089175-metadata-and-images.json#L53)

**원본 문서 530의 비변경을 어디까지 확인했는가**

1941의 두 URL 읽기는 반환 HTML을 inert DOM으로 파싱한 결과입니다. QA661과 원본530을 각각 조회했고 둘 다 status=200입니다. 원본530은 파일750774.zip, 문서승인, 연결 문항2087992(2087125)·승인(사용)·등록성공, 등록/수정자 hari.im·2026-10-15, 비고 빈값으로 읽혔습니다. 원본 prompt에는 QA 표식이 없고 qaMarkerFound=false입니다. QA661은 다른 문서·파일명·문항 ID와 QA 표식·비고를 가지고 있습니다. [1941 두 조회 결과](evidence/1941-definition-qa-and-original-read.json#L53)

기존 보존된 [530 모델 L293](sources/definition-approved-detail.html#L293)에서 outType/prompt/answer/gradingMode만 추출하여 1941의 원본530 contentModels와 대조하면 네 값은 일치합니다. 따라서 **비교한 원본의 표시 필드·식별자·본문 요약에 QA 변경이 섞이지 않았고, 원본은 기존 모습으로 조회된다**는 범위까지 확인했습니다. QA 입력 ZIP도 원본 ZIP과 별도 로컬 파일이고, 원본 ZIP의 JSON은 masterId750774/questionId16861, QA ZIP은 masterId2116110901/questionId2116110901입니다. 이 로컬 파일 비교는 원격 원본 전체의 불변 검증과는 다릅니다. [기존 모델](sources/definition-approved-detail.html#L293), [후속 원본 재조회](evidence/1941-definition-qa-and-original-read.json#L53), [원본 보존 ZIP](fixtures/definition530-original-20261109.zip), [QA ZIP](fixtures/QA-DIFI-20261109-01.zip)

다음은 이 범위에서 확정하지 않았습니다.

- 원본530의 모든 DB 열·버전·관계·배포 이력·객체 저장소 파일이 비트 단위로 불변인지 여부. 1941은 선택된 표시값과 모델 요약이며 전체 DB 감사나 전후 원격 파일 해시가 아닙니다. [1941 수집 항목](evidence/1941-definition-qa-and-original-read.json#L53)
- QA ZIP의 업로드 바이트와 보존 ZIP의 동일성 전체, 원격 원본ZIP의 전후 바이트 동일성. 이번 추가 검토는 로컬 파일 정적 비교이며 원격 재다운로드를 하지 않았습니다. [QA ZIP](fixtures/QA-DIFI-20261109-01.zip), [원본 ZIP](fixtures/definition530-original-20261109.zip)
- 원본 문항의 모든 메타·OMR·현재 미리보기 결과. 이번 원본 재조회 대상은 문서530이며 그 문항 상세까지 새로 검증하지 않았습니다. [1941 조회 URL과 itemLinks](evidence/1941-definition-qa-and-original-read.json#L53)

**후속 검증이 필요한 분기**

| 대상 | 이번에 확인한 것 | 남은 것 |
|---|---|---|
| 문서 처리·AI 추천 | 동일661의 P/R/M/Y 표시, Y 후속 조회 | 실제 AI 요청·응답, 추천 항목별 성공/실패, 상태 전이 시각·재시도·M 실패/정체 원인. [상태 근거](evidence/1937-definition661-approval-fresh-state.json#L53), [결과](evidence/1943-definition661-approved-controls.json#L53) |
| 생성 문항 승인·메타 | 문항 R, 일부 필드“-”, 검사 자료 null/0 | 정책상 기대값과의 대조, 문항 승인 실제 시도, 누락 보완 후 저장·재조회·배포 검증. [실제 메타](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [승인 검사 소스](sources/definition-qa-item2089175-detail-20261109.html#L1975) |
| 유형 변환·정답 보존 | 한 입력 SHORT_ANSWER_ORDERED→SBMANM, 뷰어 정답4·exact_match | 전체 매핑 규칙, 다른 단답/다답·순서·유사정답·IGNORE_SPACE 규칙의 실제 보존, 문항형태의 기획상 적정성. 입력의 gradingTypeCode가 존재하는 것만으로 OMR 보존을 인정하지 않습니다. [입력 ZIP](fixtures/QA-DIFI-20261109-01.zip), [출력 모델](sources/definition-qa-item2089175-detail-20261109.html#L638), [OMR null](evidence/1954-qa-item2089175-empty-omr-notice.json#L52) |
| OMR 복구 | 누락 자료에 대한 실제 경고와 미리보기 미생성 | OMR 편집·저장·재진입 복원 후 미리보기·채점, 생성 시 누락 원인. 1951은 프런트 장애 증거가 아닙니다. [1951](evidence/1951-qa-item2089175-omr-preview-open.json), [1954](evidence/1954-qa-item2089175-empty-omr-notice.json#L52) |
| 이미지 품질·원본 보존 | Q/A 이미지의 비영 크기 로드, 원본530 선택 필드 일치 | 이미지 픽셀/수식 품질, HML 원본과 시각 대조, 원본 전체 데이터·원격 객체의 전후 동일성. [이미지](evidence/1950-qa-item2089175-metadata-and-images.json#L53), [원본 비교](evidence/1941-definition-qa-and-original-read.json#L53) |

현재 증거는 문서 처리 완료와 개별 문항 준비 상태 사이의 차이를 보여 주는 한 QA 표본입니다. 모든 Definition 문서에서 같은 결과가 난다거나, AI 추천 자체가 전부 실패했다거나, 반대로 문서 승인만으로 모든 품질 조건이 충족됐다고 결론 내리지 않습니다.

