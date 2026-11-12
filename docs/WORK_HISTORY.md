# 작업 이력

## 기존 조사와 제작 이력

Git 초기화 전에 수행된 작업은 원래 세션 JSON과 근거 파일로 보관합니다. 단계별 날짜·상태·요약·근거 범위는 `investigation-history.json`에서 원본 파일로 연결됩니다.

| 구간 | 작업 | 원본 기록 |
| --- | --- | --- |
| 2026-11-06 | 문항 상세·수정, HML/HTML 편집기, OMR 등 조사와 단계별 기록을 남겼습니다. | `../cms-knowledge/master-cms/session-20261106-*.json` |
| 2026-11-09 | 문항·HML·디피니션·쌍둥이·평가지·출처·랩의 동작과 정책을 조사하고 개발 데이터 조작 결과를 기록했습니다. | 같은 폴더의 `session-20261109-phase*.json` |
| 2026-11-10 | 공유 지문, 세트·단건 쌍둥이, 등록·검수, 복제·폐기, 저장과 원본 분리 등 추가 시나리오를 검증했습니다. | `session-20261110-phase37.json`부터 `phase71.json`, 각 정책 MD와 comparison JSON |
| 2026-11-11 | 추가 오류와 복구를 확인했고 조사 누계는 서버 변경 95건입니다. 마지막 평가지 범위 테스트를 원래 값으로 복구했습니다. | `session-20261111-phase72.json`부터 `phase77.json`, `mutation-ledger.json` |
| 제작 초기부터 v0.3 | 승인된 첫 목록 화면을 기준으로 메뉴별 Figma 도면을 제작했습니다. | `../design-specs/figma-item-management-delivery.json`, `figma-remaining-menus-delivery.json`, 기존 plans/scripts/captures |
| v0.4 수정 | 사용자 코멘트에 따라 잘못된 모달을 실제 UI로 교체하고 탭별 변형, 요소 번호, 조건부 버튼, 화살표, 중복과 비율 문제를 수정했습니다. | `../design-specs/figma-storyboard-revision-delivery.json`, `revision-*-plan.json`, `revision-precise-*.json` |

## 2026-11-12: 재개와 최종 검증

- 전날 중단한 상태에서 재개했습니다. 저장 자료의 모달 52개·기본 변형 69개·컨트롤 좌표 302개를 확인했고 이미지 범위를 벗어난 좌표는 0개였습니다.
- 첫 Chrome WebSocket 연결은 180초 후 시간 초과되었습니다. 사용자가 승인 재요청을 지시한 뒤 재연결했습니다. 유지 가능한 PTY를 사용해 연결을 유지했습니다.
- 현재 Figma에서 공개 플러그인 API로 기본 화면 30개, 정밀 모달 52개, Description 187개를 읽었습니다. 텍스트가 프레임 밖으로 벗어난 항목과 같은 프레임 내 설명문 겹침은 각각 0개였습니다.
- 수식입력기의 키보드·손글씨 UI를 실제 캡처로 확인했습니다. `../design-specs/review-v4-math-precise-final.png`에 남겼습니다.
- 최신 delivery·audit·resume-state·knowledge 색인을 갱신했습니다. 보이는 Scripter를 닫고 focus emulation을 해제했습니다. 상태는 사용자 검토 대기입니다.
- 스토리보드 수정 과정에서 CMS 서버 쓰기는 없었습니다. 원래 미검증 범위는 유지했습니다.

## 2026-11-12: 세션 간 보관과 최초 Git 커밋

- 사용자가 커밋과 다음 세션의 이력 확인·재개를 요청했습니다.
- 이 폴더가 Git 저장소가 아닌 것을 확인했습니다. 기존 조사 자료를 보관하는 첫 저장소로 초기화했습니다.
- 루트 AGENTS.md와 README.md, SESSION_HANDOFF.md를 추가했습니다. 최신 상태·Figma 링크·수정 원칙·미검증 범위·브라우저 재연결 절차·잘못 이름 붙은 과거 캡처를 기록했습니다.
- 단계별 조사 색인과 보관 파일 SHA-256 목록을 생성했습니다. 기존 자료는 삭제하거나 다시 작성하지 않았습니다.
- 커밋 ID는 자기참조를 피하기 위해 이 문서에 넣지 않습니다. `git log --oneline`으로 확인합니다. 원격 push는 하지 않습니다.
