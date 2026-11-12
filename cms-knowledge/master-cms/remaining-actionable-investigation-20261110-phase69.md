# phase69 기준: 지금 실행 가능한 조사와 남은 범위

판단 기준은 근거3258까지의 phase69와 읽기 당시 knowledge.currentEvidenceIndex입니다. 확정 Master 업무는91회입니다. 현재 자체 COPY2089239는 N/detail2089104이며 Q는 원본216/8849 참조, A는 자체239/9104 파일을 사용합니다. 팝업·미저장 입력·임시본·대기 작업은 정리됐습니다. 아래는 **제안이며 아직 실행하지 않은 분기**입니다. 이후 작업을 시작할 때에는 현재 상태를 다시 읽어 기준을 잡습니다. [최신 단계](session-20261110-phase69.json#L1), [현재 근거 인덱스](knowledge.json), [A 전후 비교](explanation239-direct-fullapply-isolation-comparison-20261110.json#L1)

**이미 끝나서 반복하지 않을 것**

| 범위 | 실제로 확인한 수준 | 이번 판단 |
|---|---|---|
|문제 Q 저장 |2088985에서 표식 입력→편집기 Save1077→question 임시 HML/PNG 수신1079→CMS 최종1087→2088701/Q 새 경로·pending 소거1095→PNG/재개방 표식 유지1101/1103 |단순 열기가 아니라 저장·반영까지 완료. A/P와 같은 전체 바이트·SHA 대조 증거가 없는 것은 한계로만 남기며 같은 정상 저장을 다시 하지 않음 |
|미저장 Q→A→Q 전환 |1064 입력 후1067 해답 전환,1069 문제 복귀에서 경고 없이 표식 유실을 관측 |행위 관측은 완료. 모든 탭·문서의 일반 규칙이나 의도된 기획인지까지 확정한 것은 아님 |
|공유 P 저장 |원본 공유 반영, COPY의 편집기 Save→CMS 임시9093→전체반영9094~97·원본/복사 파일 격리 |정상 저장·임시·복사 격리 완료 |
|해답 A 저장 |239/N에서 편집기 Save3231→직접 FullApply3244→9104/N. A만 자체 경로로 바뀌고 Q·HTML·OMR·원본4파일 바이트 보존, 게시 A는 벤더 결과와 동일 |91번째 업무로 완료. phase67의 ‘해답은 열기만 확인’은 현재 상태가 아님 |

Q와 미저장 전환의 원본 근거는 [phase16](session-20261109-phase16.json#L1), [실제 Save](evidence/1077-hml-editor-save.json#L1), [부모 pending](evidence/1079-hml-parent-pending-results.json#L1), [CMS 최종 클릭](evidence/1087-hml-cms-save-submit.json#L1), [게시 후 슬롯](evidence/1095-hml-committed-slot-readback.json#L1), [미저장 복귀](evidence/1070-hml-unsaved-return-loaded.json#L1)입니다. P는 [복사 파일 격리 보고서](copied-set-shared-hml-file-isolation-20261110.md), A는 [phase68](session-20261110-phase68.json#L1)·[phase69](session-20261110-phase69.json#L1)로 닫습니다.

현재 보존 e082 glue의 CRLF를 LF로만 정규화한 값은18032B·SHA256 `48c4aff20257ca91cc7641022149ff75fa063338fd6d599091181d24c1132cf6`로 phase16의1110 기록과 같습니다. 슬롯 클릭이 openFile→ctrl.Open으로 이어지는 코드는 있지만, 벤더 Open 내부 경고까지 소스만으로 단정하지 않습니다. 무경고 유실의 근거는 위 실제 실행입니다. [현재 슬롯 핸들러](sources/assets/webhwp-e082-current-20261110.js#L369), [Open 호출](sources/assets/webhwp-e082-current-20261110.js#L120), [과거와 현재 경계](coverage-supplement-20261110-phase67.json#L3488)

또한 OMR14의 정상 저장, 랩14 기본폼 왕복과 기본 파싱오류/빈 JSON, 두 단건 그룹 병합·복구, 신규4R세트 전체D, 평가지의 API 정렬 저장·기준 복구, 출처199의 사용 전환·연결 생애주기는 완료 범위를 유지합니다. 옛 remaining 문장만 보고 재시험하지 않습니다. [phase67 맵](coverage-supplement-20261110-phase67.json), [평가지 보고서](paper1094-manual-set-membership-and-order-policy-20261110.md), [두 그룹 병합](two-single-twin-groups-merge-policy-20261110.md)

**현재 실행 가능한 우선순위8개**

1~3을 먼저 진행합니다. 4~8은 그 뒤 선택할 분기입니다. 활성 정상 제어와 복구 경로를 확인한 뒤에만 변경하고, 비활성이면 그 UI 정책을 관측한 것으로 종료합니다. 아래 어느 항목도 Service 배포를 포함하지 않습니다.

| 순위 | 새로 확인할 행위·전제와 자체 표본 | 정리 방법·완료 근거 |
|---|---|---|
|**1. 실제 평가지 드래그** |1094/R 현재 단건238에 승인세트242~245를 정상 추가해 로컬2그룹을 만듭니다. 탭이 visible/focused인지 확인한 뒤 실제 손잡이에 trusted CDP pointer로 drag/drop하고 순번·세트 내부 순서·그룹을 봅니다. 기존3025는 Sortable API/onEnd였으므로 다른 입력 분기입니다. |이번에는 로컬 드래그→정상 취소를 우선해 서버의1177/단건238을 보존합니다. 캡처/입력이 불확실하면 먼저 DOM을 다시 읽습니다. 저장 자체는 이미 별도 검증돼 있습니다. [기존 방식/복구](paper1094-manual-set-membership-and-order-policy-20261110.md), [포인터 미확인 범위](coverage-supplement-20261110-phase67.json#L4766) |
|**2. 실제 저장 정답의 랩 복원** |/lab/view/omr-render.donga에239의 실제 OBSACN 정답 JSON, 이어 기존 AI2089382의 SBSANM/TIMES JSON을 사용합니다. 유형·OMR·정답을 맞춰 복원→폼 한 값 수정→serialize를 비교합니다. 기본폼14개 왕복이나 이미 시험한 빈 JSON을 반복하지 않습니다. |랩의 기본폼 초기화/재로드로 끝냅니다. Master 문항을 저장하지 않습니다. 저장값은 data-saved-omr/data-saved-answer의 값이며 빈 data-omr-saved 표식을 JSON으로 쓰지 않습니다. 필드/값형식의 유지와 정규화 차이를 구분하고 Service 채점을 추정하지 않습니다. [기존 복원 범위](coverage-supplement-20261110-phase67.json#L5560), [실제 컨트롤](sources/lab-omr-restore-runtime-20261109.html#L4633), [현재 저장값 비교](explanation239-direct-fullapply-isolation-comparison-20261110.json#L1) |
|**3. 단건+세트 혼합 Twin** |Twin0인 자체246/R과 원본242/Y의3세트·12멤버를 기준으로 정상 Add 검색을 봅니다. 단건246의 정상 해제 경로가 확보되고 후보가 활성인 경우에만 혼합 추가를 검증합니다. 비활성이면 사유를 기록하고 제출하지 않습니다. 두 단건 그룹 병합과 세트D는 이미 완료했습니다. |추가했다면246만 정상 해제해 원래3세트/12멤버와246/Twin0을 복구합니다. 내용·상태·버전·생성이력도 비교합니다. 해제 단위가 불명확하면 최종 Add 전 멈춥니다. [기존246 복원](two-single-twin-groups-merge-restoration-comparison-20261110.json#L1), [현재12관계 기준](disposable-set389-whole-discard-comparison-20261110.json#L1) |
|4. N 생성 버튼 조건 분리 |현재239/N/COPY의 Y 선택 가능 여부를 새로 확인합니다. 가능하면 같은 COPY를 정상 N→Y로 바꿔 버튼의 존재/활성을 비교하고, 쌍둥이 생성은 누르지 않습니다. N과 COPY가 함께 있던3123만으로 N 일반 금지를 말할 수 없습니다. |정상 Y→N으로 복귀하고9104의 모델/OMR/Q·A 참조·가족3을 대조합니다. Y에서도 버튼이 없으면 N만의 조건이라는 가설을 좁힐 뿐 COPY 원인을 확정하지 않습니다. 복귀N이 정상 제어로 가능한 경우에만 시행합니다. [조건 미분리](two-single-twin-groups-merge-policy-20261110.md), [현재 N의 Y/N 제어](sources/own-copy239-after-explanation9104-20261110.html#L546) |
|5. 출처 빈결과의0페이지 링크 |/product/list.donga에서 빈결과 조건을 현재 조회로 다시 확인합니다. 예전 교육과정15 빈결과에 보인 pageNum0 링크가 여전히 있으면 정상 클릭해 주소·응답·복귀를 확인합니다. 링크가 달라졌다면 표시 변화 자체를 기록합니다. |조회/이동만 수행하고 초기화 후 정상 목록·QA199 검색으로 돌아옵니다. 출처 등록/수정은 하지 않습니다. 이미 확인한 다음1→6/이전6→1 블록 이동을 반복하지 않습니다. [표시만 확인된 분기](coverage-supplement-20261110-phase67.json#L4875) |
|6. 랩 수식의 빈 입력·닫기 |수식 데모에서 빈 수식의 적용 상태, Escape/배경 닫기의 원문 유지, 직접 블록 삽입을 각각 봅니다. 기존1+2 적용/취소·3×2행렬 취소와 구분합니다. |랩 문서만 바꾸고 재로드로 초기화합니다. 전체 페이지를 CMS 저장하거나 OCR 서비스 성공으로 확대하지 않습니다. [남은 정확한 분기](coverage-supplement-20261110-phase67.json#L5391), [기존 수식 화면](sources/lab-math-demo-20261109.html) |
|7. 벤더 결과를 받은 뒤 CMS 취소 |239/N 같은 자체 단건에서 별도 임시 표식으로 explain 벤더 파일만 받은 상태를 만들고, 부모 ‘취소’의 남기기/저장하지 않고 이동을 시험합니다. Q 정상저장이나 기존 미저장 Q→A→Q 유실의 재시험이 아닙니다. |CMS 임시/전체반영은 누르지 않습니다. 부모의 기존9104/N·슬롯/HTML/OMR·draft 부재를 확인하고 저장된 벤더 문서의 자체 팝업만 닫습니다. 미참조 벤더 파일의 물리 삭제를 가정하지 않습니다. [부모 취소 제어](sources/copy-hml-draft2089093-before-fullapply-20261110.html#L7699), [확인창 문구](sources/copy-hml-draft2089093-before-fullapply-20261110.html#L6776), [벤더와 CMS 분리](session-20261110-phase68.json#L1) |
|8. 평가지 페이지 역전 검증 |1094/R에서 구성·제목·용도는 유지하고 시작2/끝1을 정상 UI로 입력해 저장의 차단/수용을 봅니다. 각 필드의 min1/required 확인과 시작≤끝의 서버 판정은 다른 분기입니다. |차단이면 기존1~1이 유지됐는지 확인합니다. 수용됐다면 정상 수정으로1~1을 즉시 복구하고 구성/서비스 표를 대조합니다. 상태Y/D나 배포는 시험하지 않습니다. [기준 폼·저장/복구](paper1094-manual-set-membership-and-order-policy-20261110.md), [기준 비교](paper1094-manual-set-restoration-comparison-20261110.json#L1) |

**표본·접근이 없어 지금의 실행 목록에서 뺀 것**

- **정상 Definition 세트/다중·혼합 S/F/D 검수:** 현재 사용자에게 정상 등록된 세트 ZIP이 없습니다. 기존 단독 ESSAY/FIVE/SHORT/ORDERED와 정상 본문·선지 PNG는 검증됐지만, MULTI3의 F/0카드는 실패 원인이나 다중/세트 미지원의 확정 근거가 아닙니다. 원인 미확정인 같은 실패 ZIP을 다시 올려 정상 혼합 검수를 했다고 세지 않습니다. [사용자 답변](user-sample-availability-20261110.json#L1), [MULTI3/단독 대조](definition-single-control-and-f-only-policy-20261110.md), [단독 유형 대조](definition-type-single-controls-mapping-20261110.md)
- **실파일이 연결된 해석 HML:** 현재 표본이 없고 버튼 비활성만 관측했습니다. 지원 불가가 아니라 입력 부족이며, 사용자 응답 대기가 아닙니다. [사용자 답변](user-sample-availability-20261110.json#L1)
- **Service 수신·실제 배포·학습자 채점:** Service CMS가 제공되지 않았고 실제 배포는 이번 범위에서 금지합니다. Master 배포 모달/선행 조건의 관측을 서비스 반영으로 바꾸지 않습니다. AI의 TIMES 저장값도 실제 오답 처리라고 확정하지 않습니다. [범위](session-20261110-phase69.json#L1), [AI 표현/채점 한계](set-ai-generation-lineage-and-content-20261110.md)
- **다른 역할·실제 캐시 reload·역할별 세션 종료:** 격리 계정/대상 범위가 없는 상태에서 현재 연결 사용자에게 영향을 주는 실행은 우선 목록에 넣지 않습니다. 로컬 선택·취소와 실제 서버 실행은 별개입니다. [기존 역할/캐시 범위](coverage-supplement-20261110-phase67.json)

**‘모든 기능 완료’까지 남는 다른 종류의 공백**

행위는 관측됐지만 기대 정책이 정해지지 않은 항목도 있습니다. 미저장 전환 유실의 경고 요구, 같은 지문 후보의500/숨은 오류, 오래된 수정폼의 선행 메타 덮어쓰기는 단순 미방문과 다릅니다. 원인·기획 기준이나 수정 후 회귀 근거가 필요하며 같은 조작을 반복한다고 정책이 확정되지는 않습니다. [미저장 관측](session-20261109-phase16.json#L1), [같은 지문 오류](set-twin-membership-and-same-passage-error-20261110.md), [동시 수정 덮어쓰기](item-concurrent-edit-overwrite-20261110.md)

시각 근거도 별도입니다. 최신 A 상세2297px의 세 PNG는 실제 검토됐지만, 이전3030 평가지 하단·3092 단건D 중간/하단과 새 그룹 병합·세트D의 PNG 공백을 자동으로 해소하지 않습니다. 로드된9개 이미지나 DOM 전체 조회를 직접 본 픽셀로 세지 않습니다. [A 전체 시각 범위](session-20261110-phase69.json#L1), [기존 시각 한계](coverage-supplement-20261110-phase67.json)

현재는 정상 표본 흐름, 일부 예외, 입력 부족, 역할/서비스 범위와 시각 공백을 구분해 배운 상태입니다. 남은 모든 분기·역할·서버 규칙을 확인한 상태가 아니며 사이트 전체 기능 분모도 확정되지 않았습니다. 전체 완료율은 계산하지 않습니다. 이 보고서는 새 조사와 정리 방법을 제안했을 뿐 해당8개를 실행한 증거가 아닙니다.
