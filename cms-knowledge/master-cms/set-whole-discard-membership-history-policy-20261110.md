# 세트 전체 폐기의 적용 범위와 쌍둥이·생성 이력 보존

작성일은 2026-11-10이며, 조사 범위는 phase67의 근거 3152~3188입니다. 새로 만든 COPY 세트에서 문항 2089389를 선택해 한 번 저장하자 자식 문항 4개가 모두 R에서 D로 바뀌었습니다. 폐기된 문항들은 현재 쌍둥이 그룹에서 제외됐지만, 지문과 자식으로 구성된 논리 세트 및 생성 이력은 남았습니다. 기존 원본 세트, COPY 세트, AI 세트의 상태와 내용을 보존한 결과도 확인했습니다.

이 보고서는 로컬 근거만 읽어 새로 작성했습니다. 브라우저·네트워크·CMS·전역 원장 및 인덱스·기존 문서는 조작하지 않았습니다. 여기서 ‘논리 세트’는 한 지문과 그 자식 문항의 구성을 뜻하며, ‘현재 쌍둥이 그룹’은 원본과 복제·AI 세트를 연결해 보여 주는 관계를 뜻합니다. 두 구성을 구분해야 폐기 결과를 정확히 설명할 수 있습니다.

## 1. 새 COPY 세트와 검증 범위

[실행 intent](disposable-set-discard-scope-intent-20261110.json)는 승인된 원본 문항 2089242에서 검증용 COPY 세트를 하나 만들고, 그 세트만 폐기하도록 범위를 정했습니다. 보존 대상은 원본 지문 2089241의 문항 4개, 기존 COPY 지문 2089357의 문항 4개, AI 지문 2089381의 문항 4개입니다.

[3158](evidence/3158-own-original-set-disposable-copy-submit-once.json)은 anchor 문항 2089242에서 세트 COPY를 한 번 실행했음을 기록합니다. 그 결과 새 논리 지문 2089388과 자식 문항 2089389~2089392가 생성됐습니다. [3159](evidence/3159-own-original-set-disposable-copy-history-readback.json)의 원본 조회에서는 새 COPY 이력과 함께 현재 쌍둥이가 4세트, 자식 행이 총 16개로 늘어난 결과를 확인했습니다.

[3162](evidence/3162-own-disposable-set-four-before-discard-baseline.json)는 새 문항 4개가 모두 R 상태임을 보여 줍니다. 이어서 문항 2089389의 정상 상태 UI에서 D를 선택했습니다. 기존 세트의 문항을 폐기 대상으로 선택한 것은 아닙니다.

## 2. 확인창과 한 번의 최종 저장

[3164](evidence/3164-own-disposable-set389-status-scope-controls.json)의 상태 제어에는 세트 전체의 상태를 변경한다는 안내가 있습니다. 폐기 확인창의 실제 문구는 다음과 같습니다.

`세트 문항 전체가 폐기되며, 쌍둥이 문항에서 제외됩니다.`

[3168](evidence/3168-own-disposable-set389-discard-confirm-scope-read.json)은 확인창이 열리는 도중에 수집돼 `shown=false`, `transitioning=true`로 기록됐습니다. 이를 열기 실패로 분류하지 않았습니다. [3169](evidence/3169-own-disposable-set389-stable-confirm-ready.json)에서 대상 문항 2089389, `shown=true`, `transitioning=false`와 같은 안내 문구를 확인한 뒤 최종 저장을 진행했습니다.

[3170](evidence/3170-own-disposable-set389-whole-discard-final-once.json)은 선택한 문항이 2089389이고 `attemptCount=1`, `finalDiscardClicked=true`, `viewFlag=D`임을 기록합니다. [3172](evidence/3172-own-disposable-four-after-whole-discard.json)에서 새 문항 4개를 각각 조회한 결과는 다음과 같습니다.

| 자식 문항 | 유지된 상세 버전 | 폐기 전 | 폐기 후 | 현재 쌍둥이 수 | 상태 편집 제어 |
|---|---|---|---|---|---|
| 2089389 | 2089100 | R | D | 0개 | 비활성 |
| 2089390 | 2089101 | R | D | 0개 | 비활성 |
| 2089391 | 2089102 | R | D | 0개 | 비활성 |
| 2089392 | 2089103 | R | D | 0개 | 비활성 |

선택한 자식 하나에서 실행한 정상 폐기가 새 논리 세트의 문항 4개에 적용됐습니다. 남은 자식을 따로 폐기하는 추가 저장은 필요하지 않았습니다. 이 사례는 자식 모두가 R이던 새 COPY 세트에 한정되며, 서로 다른 상태가 섞인 세트나 배포된 세트에도 같은 규칙이 적용된다고 확정하지 않습니다.

## 3. 논리 세트는 남고 현재 쌍둥이 관계에서는 제외됨

폐기 후에도 각 문항의 ‘세트 문항’ 표시에는 지문 ID 2089388과 자식 문항 4개가 그대로 나타납니다. 상세 버전, 모델, OMR 미리보기 데이터와 이미지 참조도 폐기 전후에 같습니다. 따라서 현재 쌍둥이 수가 0개라는 결과를 논리 세트 자체가 해체됐다는 뜻으로 해석할 수 없습니다.

네 문항의 현재 쌍둥이 응답은 모두 그룹이 없다는 안내와 빈 tables 배열을 반환합니다. 한편 [3176](evidence/3176-own-twelve-set-memberships-after-disposable-discard.json)에서 기존 문항 12개를 다시 조회하면, 원본·기존 COPY·AI의 3세트와 자식 행 12개가 기준 상태로 돌아와 있습니다. 폐기된 새 COPY 세트는 그 현재 관계에 포함되지 않습니다.

즉 이번 결과는 새 COPY 세트 안의 자식 연결을 유지하면서 해당 세트 전체를 쌍둥이 관계에서 제외한 동작입니다. ‘세트 전체’라는 범위가 원본과 다른 쌍둥이 세트까지 확대돼 모두 폐기된 결과는 아닙니다.

[3179](evidence/3179-own-disposable-four-edit-redirects-after-discard.json)의 정상 수정 페이지 GET은 네 문항 모두 각자의 읽을 수 있는 상세 페이지로 리다이렉트됐고, 최종 응답은 HTTP 200이었습니다. 상태 편집 제어는 잠겼습니다. 확인한 것은 상세와 논리 세트의 조회 유지 및 편집 경계이며, 물리 DB의 삭제 방식이나 강제 복원 정책은 조회하지 않았습니다.

## 4. 기존 자료와 생성 이력의 보존

[폐기 비교 파일](disposable-set389-whole-discard-comparison-20261110.json)과 실제 근거를 직접 대조했습니다. 기존 상세 control의 result 객체는 다음 세 쌍에서 각각 정확히 같습니다.

| 폐기 전 → 폐기 후 근거 | 대조한 자료 | 결과 |
|---|---|---|
| [3153](evidence/3153-own-original-set-before-disposable-copy-controls.json) → [3173](evidence/3173-own-original-set-after-disposable-discard-controls.json) | 원본 문항 4개와 비교 단건 2089246 | result 객체 전체가 같음 |
| [3154](evidence/3154-own-existing-copy-set-before-disposable-controls.json) → [3174](evidence/3174-own-existing-copy-after-disposable-discard-controls.json) | 기존 COPY 문항 4개와 비교 단건 2089246 | result 객체 전체가 같음 |
| [3155](evidence/3155-own-existing-ai-set-before-disposable-controls.json) → [3175](evidence/3175-own-existing-ai-after-disposable-discard-controls.json) | 기존 AI 문항 4개의 상세·수정 조회 | result 객체 전체가 같음 |

원본 문항 4개는 Y를 유지했고, 기존 COPY와 AI의 문항은 각각 모두 R을 유지했습니다. 비교한 내용·상태·버전·OMR·이미지 참조가 같은 범위입니다. 근거 파일의 수집 시각이나 전체 HTML 바이트까지 같다는 뜻은 아닙니다. 원격 자산을 새로 다운로드해 바이트를 대조한 검사도 아닙니다.

현재 관계 자료는 [3156](evidence/3156-own-twelve-set-memberships-before-disposable-copy.json)과 3176을 비교했습니다. 기존 COPY와 AI의 문항 8개는 결과 데이터 전체가 같고, 원본 문항 4개에서는 histories 필드만 달라졌습니다. 원본에는 새 COPY 세트의 생성 이력 한 행이 추가돼 이력 수가 2개에서 3개로 늘었으며, 기존 이력 두 행은 보존됐습니다. 그 밖의 그룹 수·멤버 행·표시 데이터는 기준으로 복원됐습니다.

또한 생성 직후 근거 3159의 history 객체와 폐기 후 [3177](evidence/3177-own-original-set-discarded-copy-history-retained.json)의 history 객체는 정확히 같습니다. 새 이력행은 자식 ID 2089389~2089392를 함께 담은 COPY 기록입니다. 원본 문항 4개에 같은 세트 생성 이력이 표시되지만 COPY 요청을 네 번 실행한 것은 아닙니다.

3159와 3177의 membership 객체까지 같다는 뜻은 아닙니다. 생성 직후의 현재 관계는 4세트였고 폐기 후에는 3세트입니다. 생성 이력이 유지된다는 사실과 현재 관계에서 제외됐다는 사실을 구분해야 합니다.

## 5. D 필터 검색과 추가 비활성

[3184](evidence/3184-own-original242-discarded-set389-filter-search.json)는 정상 쌍둥이 추가 탭에서 상태 D만 선택하고 문항 ID 2089389로 검색한 기록입니다. [3185](evidence/3185-own-original242-discarded-set389-add-disabled-result.json)의 결과 행에는 문항 2089389와 지문 ID 2089388, 자식 수 4가 함께 표시됩니다. 상태는 폐기이고 추가 불가 사유는 `폐기 문항`입니다.

이 결과의 추가 버튼은 disabled=true입니다. 검색 결과에 나타나고 논리 세트 정보가 표시된다는 사실을 정상 UI로 다시 추가할 수 있다는 뜻으로 바꾸지 않았습니다. 비활성 제어를 우회하거나 직접 Add 요청을 보내지 않았으므로 서버의 직접 요청 거절 정책은 미검증입니다.

## 6. 이미지 로딩과 픽셀 검토의 구분

[3180](evidence/3180-own-disposable-set389-final-source-ui-state.json)은 문항 2089389의 D 상태, 편집 잠금, 쌍둥이 0개, 표시된 모달 없음과 함께 이미지 9개가 모두 로드됐음을 기록합니다. 이미지 크기도 모두 양수입니다. 내부 스크롤 높이는 2794픽셀이고 화면 내부 높이는 1015픽셀입니다.

이번 phase에는 새 PNG가 없습니다. 이미지가 로드됐다는 DOM 상태와 페이지 높이를 읽은 것은 실제 이미지 내용·배치·전체 세로 화면을 직접 봤다는 증거와 다릅니다. 이 보고서의 기능 근거는 DOM·소스·독립 GET이며, 새 픽셀 검토를 완료한 것으로 기록하지 않았습니다.

## 7. 종료 상태와 검증 한계

[3188](evidence/3188-own-original242-final-post-set-discard-safe-state.json)의 소유 탭은 원본 문항 2089242의 Y 상태입니다. 현재 쌍둥이는 3개로 표시되고 상태 제어는 잠겨 있으며, generationWorking=false이고 열린 모달은 없습니다. 새 검증용 COPY 세트만 D로 남고 기존 원본·COPY·AI의 기준 자료는 위 대조 범위에서 보존됐습니다.

[phase67 세션](session-20261110-phase67.json) 기준 Master 업무는 총 90회입니다. 이번 단계에서는 세트 COPY 생성과 최종 폐기를 각각 한 번 수행해 업무가 2회 증가했습니다. 자동 전파된 자식의 상태 변경이나 이 보고서 작성은 별도 업무로 더하지 않았습니다. Service 배포는 수행하지 않았습니다.

확인된 범위는 새로 만든 4자식 COPY 세트가 모두 R이던 상태에서 정상 UI로 세트 전체를 폐기한 사례입니다. 혼합 상태·배포된 세트·다른 역할·부분 실패·강제 복원 및 물리 자산 처리 정책은 남은 범위입니다. 해석 HML과 정상 Definition 세트 ZIP 표본은 현재 없다는 사용자 답변이 완료됐으며 응답 대기로 분류하지 않습니다. 전체 화면·기능 분모는 unknown이므로 전체 완료율은 계산하지 않았습니다.
