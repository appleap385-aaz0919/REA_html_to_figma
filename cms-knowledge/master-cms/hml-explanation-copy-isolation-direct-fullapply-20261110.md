# COPY 해답 HML의 편집과 직접 전체 반영, 원본 파일 격리

작성일은 2026-11-10이며, 범위는 phase68·69의 근거 3189~3258입니다. 문항 2089239의 해답 HML을 편집한 뒤 CMS 임시 저장 없이 직접 전체 반영했습니다. 상세 버전은 2089019에서 2089104로 바뀌었고, N 상태는 유지됐습니다. 새 해답은 COPY 문항의 경로로 게시됐으며, 문제 파일은 원본 문항의 경로를 계속 참조했습니다. HTML·OMR·메타와 원본 파일 4개의 바이트가 보존된 범위도 확인했습니다.

이 보고서는 저장된 로컬 근거와 바이너리만 읽어 새로 작성했습니다. 브라우저·네트워크·CMS·전역 원장 및 인덱스·기존 문서와 맵은 조작하지 않았습니다. 한 개의 N 상태 단건 COPY에서 해답 슬롯을 편집하고 직접 전체 반영한 사례이며, 다른 상태·역할·슬롯·실패 분기의 일반 정책을 확정한 결과는 아닙니다.

## 1. 편집 대상과 유효한 OMR 기준

[실행 intent](hml-explanation239-copy-isolation-intent-20261110.json)의 대상은 COPY 문항 2089239, 상세 버전 2089019, 상태 N입니다. 편집 전 문제와 해답 파일은 모두 원본 문항 2089216의 상세 버전 2088849 아래 경로를 참조했습니다. 서로 같은 파일 경로를 가리키던 조건에서 COPY의 해답만 바뀌는지 확인하는 조사입니다.

먼저 읽은 비교 단건 2089246의 조회 결과에서는 저장 OMR과 정답 JSON이 확인되지 않아 편집을 진행하지 않았습니다. [3192](evidence/3192-own-single246-explanation-baseline-detail-source.json)의 OMR 버튼에는 빈 `data-omr-saved` 표식은 있지만 `data-saved-omr`와 `data-saved-answer` 값이 없습니다. 이 단건은 읽기 전용으로 남겼습니다.

문항 2089239는 다릅니다. [3197](evidence/3197-own-copy239-explanation-family-baseline-controls.json)의 실제 저장값은 5개 선택지와 정답 ④를 담으며, 이를 JSON으로 파싱하면 [3204](evidence/3204-own-copy239-explanation-live-models-omr-baseline.json)의 라이브 직렬화 결과와 같습니다. 이 문항에서도 `data-omr-saved`는 빈 문자열이지만, 이는 표식 속성입니다. 실제 OMR JSON은 `data-saved-omr`, 정답 JSON은 `data-saved-answer`에 있으므로 빈 표식만 보고 저장 OMR이 없다고 판단하지 않았습니다.

[3202](evidence/3202-own-copy239-explanation-file-slot-baseline.json)에서 지문·해석 슬롯 경로는 비어 있고, 문제·해답은 원본 파일을 참조하며, 부모 화면의 대기 파일 8개는 모두 비어 있었습니다. 이 기준으로 해답 슬롯 이외의 변화를 분리했습니다.

## 2. 소유 팝업 열기와 슬롯 선택

합성 클릭 후 새 팝업이 생기지 않았고, 소유 CMS 탭이 숨겨진 상태에서 수행한 trusted click 뒤에도 팝업이 생성되지 않았습니다. 이후 소유 탭 `t21`을 선택하자 [3213](evidence/3213-own-copy239-explanation-tab-focus-state.json)에서 visible과 documentHasFocus=true를 확인했습니다. [3214](evidence/3214-own-copy239-explanation-selected-tab-editor-click.json)의 브라우저 범위 클릭 후 소유 팝업 `t71`이 열렸습니다.

이 과정은 해당 Windows·Chrome·자동화 연결 환경의 관측입니다. 팝업 미생성을 CMS 권한 거절로 분류하지 않았으며, 숨김 상태나 입력 방식에 대한 모든 환경의 일반 규칙으로 확대하지 않았습니다. 다른 탭이나 운영체제 입력 장치를 조작한 경로로 기록하지도 않았습니다.

[3218](evidence/3218-own-copy239-explanation-popup-initial-state-visual.json)의 팝업에는 지문·지문해석·문제·해답 제어가 모두 있습니다. 실제 파일이 없는 지문과 해석은 비활성이고 문제와 해답은 활성입니다. 기본으로 열린 문제 파일은 원본의 `2089216_Q.hml`이며 수정되지 않은 상태였습니다. 정상 해답 제어로 전환한 [3220](evidence/3220-own-copy239-explanation-loaded-slot-ui-visual.json)에서는 `2089216_A.hml`과 modified=false를 확인했습니다.

## 3. 표식 입력과 TEXT·XML 검증의 구분

[3221](evidence/3221-own-copy239-explanation-before-text-and-caret.json)에서 실제 해답의 GetTextFile TEXT 결과를 기준으로 보존했습니다. 브라우저 범위의 입력으로 문서 맨 앞에 `[QA-EXPLANATION-HML-20261110] `를 한 번 넣었고, [3228](evidence/3228-own-copy239-explanation-edited-text-verify.json)에서 표식 수가 1개이며 편집 후 TEXT가 접두사와 기존 TEXT 전체를 합친 값과 같음을 확인했습니다.

TEXT 결과에는 수식 문자열이 빠져 있습니다. 따라서 TEXT가 보존됐다는 사실만으로 수식까지 보존됐다고 판단하지 않았습니다. 아래 바이너리 대조에서는 해답 XML의 SCRIPT 문자열 8개가 순서와 내용까지 같고, CHAR 배열은 기존 배열 앞에 표식 문자열 한 개만 추가됐음을 별도로 확인했습니다.

이는 수식과 CHAR 본문에 대한 검증입니다. 원본 HML 파일 전체가 표식 바이트만 추가된 형태라는 뜻은 아닙니다. 벤더 저장 과정에서 생성된 새 HML의 전체 바이트와 크기는 원본과 다릅니다.

## 4. 편집기 저장은 CMS 현재 저장과 다름

[3231](evidence/3231-own-copy239-explanation-editor-save-once.json)은 해답 슬롯에서 편집기 저장을 한 번 실행했고, CMS 저장은 아직 실행하지 않았음을 기록합니다. [3232](evidence/3232-own-copy239-explanation-editor-save-outcome.json)에서 벤더의 해답 HML과 PNG가 부모 화면으로 전달됐습니다. 값이 생긴 대기 슬롯은 `explain.hml`과 `explain.image` 두 개뿐이며, 나머지 6개는 비어 있습니다. 이 시점의 editorModified는 false입니다.

저장 안내는 CMS에서 임시 저장 또는 전체 반영을 해야 문항에 반영된다고 설명합니다. 실제로 [3233](evidence/3233-own-explanation239-family-current-after-editor-save.json)의 문항 2089216·2089239·2089240 현재 조회는 기준 3197의 result 객체와 정확히 같습니다. [3234](evidence/3234-own-copy239-explanation-parent-pending-models-read.json)의 부모 HTML·OMR 모델과 기존 파일 경로도 기준값을 유지합니다.

[3237](evidence/3237-own-explanation239-family-drafts-after-editor-save.json)에서 세 문항의 hasDraft는 모두 false입니다. 벤더 임시 파일의 생성, 부모 화면의 대기 파일, CMS 현재 버전, CMS draft를 서로 구분할 수 있습니다. 편집기 저장은 새 CMS 현재 버전이나 CMS 임시본을 만든 동작으로 세지 않았습니다.

## 5. CMS 임시 저장 없이 직접 전체 반영

부모 탭으로 돌아온 [3240](evidence/3240-own-copy239-direct-fullapply-strict-preflight.json)은 문항 2089239의 현재 상세가 여전히 2089019이고 상태 N이며, draft가 없음을 확인합니다. HTML과 OMR은 기준값과 같고 대기 파일은 해답 2개뿐입니다. 문제 미리보기는 원본 경로를, 해답 미리보기는 벤더의 표식 포함 PNG를 가리킵니다.

정상 전체 반영 확인창을 연 동작과 최종 저장을 구분했습니다. [3244](evidence/3244-own-copy239-explanation-direct-fullapply-final-once.json)은 CMS 임시 저장을 사용하지 않고 최종 전체 반영을 한 번 실행한 기록입니다. 반영 직후의 이동 중 화면을 최종 상태로 사용하지 않고, [3246](evidence/3246-own-explanation239-family-after-direct-fullapply.json)의 후속 조회로 상세 버전 2089104와 N 상태를 확인했습니다.

| 항목 | 반영 전 | 직접 전체 반영 후 |
|---|---|---|
| 문항 / 상세 버전 | 2089239 / 2089019 | 2089239 / 2089104 |
| 상태 | N | N |
| 문제 HML | `/item/208/2089216/2088849/hml/2089216_Q.hml` | 같은 경로 유지 |
| 해답 HML | `/item/208/2089216/2088849/hml/2089216_A.hml` | `/item/208/2089239/2089104/hml/2089239_A.hml` |
| 해답 PNG | `/item/208/2089216/2088849/image/2089216_A.png` | `/item/208/2089239/2089104/image/2089239_A.png` |
| 지문·해석 슬롯 | 비어 있음 | 비어 있음 |

이 저장에서는 해답에만 COPY 소유 경로가 배정됐고, 문제 파일은 원본 경로를 계속 참조했습니다. 모든 파일 경로를 새 상세 버전으로 통일한 결과가 아닙니다. 이 사례의 경로 분리와 원본 바이트 보존을 확인했으며, 서버의 파일 복제 구현 전체를 확정하지는 않았습니다.

질문·정답·풀이를 담은 HTML 모델, 저장 OMR과 정답 JSON, 메타 값은 그대로입니다. 상세 값에서 달라진 라벨은 상세 버전이며 해답 이미지 참조도 새 경로로 바뀝니다. 편집한 HML에는 표식이 있지만 HTML 설명 모델에는 표식이 추가되지 않았습니다. 이번 해답 슬롯의 직접 반영은 HTML 모델을 자동으로 다시 쓴 동작으로 관측되지 않았습니다.

## 6. 실제 파일 바이트와 수식 보존

[원본 바이너리 기준](explanation239-original216-binary-baseline-20261110.json), [벤더 저장 후 대조](explanation239-editor-temp-and-original-binaries-20261110.json), [게시 후 대조](explanation239-published-and-original-binaries-20261110.json)의 로컬 파일을 다시 읽어 크기·SHA와 바이트 자체를 비교했습니다. 다운로드는 부모가 수행해 보존한 기록을 사용했으며, 이 하위 작업에서는 네트워크를 호출하지 않았습니다.

원본 문항 2089216의 다음 파일 4개는 편집 전, 벤더 저장 후, CMS 전체 반영 후에 모두 같은 바이트입니다.

| 원본 파일 | 바이트 수 | 세 시점에 동일한 SHA-256 |
|---|---|---|
| 문제 HML | 39538 | `54cd1eb4b8f85b94c83a91822b8ba73954e9d43970284321215e7021fa12845f` |
| 문제 PNG | 22308 | `f71a1a122d8e98f0487bee207f230c0a57b876d557739e07e5bcd884d57b1f08` |
| 해답 HML | 29580 | `daa432c79c0f339a8e8e946474967884c16d4920a9ee46f71dbd26854597e64c` |
| 해답 PNG | 9095 | `d97b376b663e1d3f863092577d569db1887967cb6b9b4cd320497886bf2c0e88` |

게시된 COPY 해답의 HML과 PNG는 각각 벤더 결과 파일과 정확히 같습니다.

| 새 해답 파일 | 바이트 수 | 벤더 결과 = 게시 결과의 SHA-256 |
|---|---|---|
| HML | 32094 | `90a7c154230c6a021a3fe334c1f4954978881c57e0d652a8a61aeaef33418cd0` |
| PNG | 23592 | `5230ed334e5340e75392e7831978bb041540b24b26a49da833a24cd846da87b9` |

원본과 벤더 HML을 XML로 읽어 SCRIPT 8개가 정확히 같고, 기존 CHAR 배열 앞에 표식 한 개만 추가된 결과를 확인했습니다. 최종 게시 HML이 벤더 HML과 같은 바이트이므로 이 수식·본문 검증은 게시 파일에도 연결됩니다. 새 해답 파일은 원본 경로를 덮어쓰지 않았고, 이 네 원본 파일에 대한 바이트 보존은 참조만 비교한 이전 검사보다 직접적인 근거입니다.

## 7. 원본·AI 문항, 관계·이력·draft와 팝업 정리

[최종 격리 비교](explanation239-direct-fullapply-isolation-comparison-20261110.json)와 실제 현재 조회를 대조했습니다. 기준 3197과 반영 후 3246에서 원본 문항 2089216과 AI 문항 2089240의 객체 전체가 같습니다. COPY 문항은 위에서 확인한 상세 버전과 해답 이미지 참조만 바뀌고 모델·OMR·상태·메타는 보존됐습니다.

[3250](evidence/3250-own-explanation239-family-memberships-history-after-fullapply.json)의 현재 쌍둥이 관계와 원본 생성 이력은 [기준 근거 3106](evidence/3106-own-single-family-merge-baseline-memberships-history.json)의 result 객체와 정확히 같습니다. [3249](evidence/3249-own-explanation239-family-drafts-after-fullapply.json)의 세 문항은 모두 hasDraft=false이며 savedAt와 savedUserId도 null입니다. 이 응답을 물리 DB의 모든 임시 행 삭제나 전체 사이트의 draft 부재로 확대하지 않습니다.

[3252](evidence/3252-own-copy239-explanation-popup-safe-close-preflight.json)는 소유 팝업의 editorModified=false, 반영된 부모 문항 2089239/상세 2089104, safeToClose=true를 확인합니다. 이후 [3254](evidence/3254-own-copy239-explanation-only-owned-popup-close.json)에서 소유 팝업 `t71`만 닫았습니다. 다른 탭을 닫거나 편집 결과를 다시 저장하지 않았습니다. [3255](evidence/3255-own-copy239-explanation-final-detail-loaded-state.json)의 최종 부모 화면은 N 상태, 현재 쌍둥이 3개이며 열린 모달이 없습니다. phase69의 종료 기록과 대조하면 저장 대기·CMS draft·남은 소유 팝업도 없습니다.

## 8. 직접 확인한 PNG 범위

부모는 팝업 초기 화면 3218, 해답 로드 화면 3220, 표식 입력 화면 3229, 벤더 저장 안내 3235, 전체 반영 전 부모 미리보기 3241의 PNG를 직접 확인했습니다. [원본 해답 PNG](fixtures/explanation239-copy-isolation-20261110/before-original216-explain.png)와 [벤더 결과 PNG](fixtures/explanation239-copy-isolation-20261110/vendor-temp-explain.png)도 확인했습니다. 이 하위 작업은 해당 파일의 형식·크기·해시를 검사했으며 픽셀을 새로 보지는 않았습니다.

최종 상세의 이미지 3개는 모두 로드됐고 양수 크기입니다. 부모는 아래 PNG 3개를 직접 확인해 표식이 있는 HML 해답과 그대로인 HTML 설명, 상태·메타·하단을 확인했습니다.

| 근거 | 실제 top | 내부 화면 높이 | 전체 스크롤 높이 | 덮는 구간 |
|---|---|---|---|---|
| [3256 상단](evidence/3256-own-copy239-explanation-final-detail-top-visual.png) | 0 | 1015 | 2297 | 0~1015 |
| [3257 중간](evidence/3257-own-copy239-explanation-final-detail-middle-visual.png) | 641 | 1015 | 2297 | 641~1656 |
| [3258 하단](evidence/3258-own-copy239-explanation-final-detail-bottom-visual.png) | 1282 | 1015 | 2297 | 1282~2297 |

구간이 겹쳐 현재 상세의 전체 세로 2297픽셀을 덮습니다. 최종 PNG는 1810×1075이고 팝업 PNG는 1290×875이므로 서로 다른 화면 범위입니다. 이미지 로딩 값만으로 픽셀 검토를 완료했다고 하지 않았으며, 이 범위를 다른 역할·화면폭·슬롯·오류 상태까지 확대하지 않았습니다.

## 9. 업무 수와 남은 검증 범위

[phase68](session-20261110-phase68.json)에서는 벤더 저장만 수행해 Master 업무가 90회로 유지됐습니다. [phase69](session-20261110-phase69.json)의 CMS 직접 전체 반영 한 번으로 총 91회가 됐습니다. 상태 N이 그대로여서 상태 복원 작업은 수행하지 않았습니다. Service 배포는 없습니다.

확인한 범위는 유효한 OMR이 있던 N 상태 단건 COPY에서 해답 슬롯을 편집하고, CMS 임시 저장 없이 직접 전체 반영한 경로입니다. 다른 역할에서의 저장, 동시 수정, 업로드 실패나 URL 만료, 다른 슬롯을 실제로 편집했을 때의 영향, 새 HML 결과를 포함한 CMS 임시 저장 경로는 별도 검증이 필요합니다. 팝업 열기 조건이나 해답만 바뀐 이번 결과를 모든 환경의 일반 규칙으로 해석하지 않습니다.

실제 서비스 채점·배포와 정상 Definition 세트·혼합 검수는 이 보고서의 완료 범위가 아닙니다. 해석 HML과 정상 Definition 세트 ZIP 표본은 현재 없다는 사용자 답변이 완료됐으며 응답 대기로 분류하지 않습니다. 전체 화면·기능 분모는 unknown이므로 전체 완료율은 계산하지 않았습니다.
