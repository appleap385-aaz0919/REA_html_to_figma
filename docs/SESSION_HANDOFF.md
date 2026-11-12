# 세션 인수인계

최종 갱신: 2026-11-12, Asia/Seoul

## 현재 상태와 다음 작업

Master CMS 조사 자료를 기반으로 Figma 스토리보드 v0.4를 수정했고, 사용자가 지적한 잘못된 모달 UI·탭 구분·요소 번호·화면 전환·중복 화면을 수정했습니다. 현재 상태는 **사용자 검토 대기**입니다. 사용자가 검토 의견을 주면 기존 수정본의 해당 노드를 수정합니다. 전체 도면을 다시 생성할 필요가 없습니다.

사용자는 새 세션에서도 작업 이력을 읽고 이어서 작업할 수 있도록 Git 커밋을 요청했습니다. 이 저장소의 AGENTS.md가 이 문서를 재개 진입점으로 지정합니다. 브라우저에 다시 연결하기 전에 사용자 요청이 문서 확인만으로 처리되는지 판단합니다.

## 반드시 먼저 확인할 파일

1. `design-specs/figma-storyboard-revision-delivery.json`: 최신 산출물, 링크, 사용자 코멘트별 수정, 미검증 범위입니다.
2. `design-specs/revision-resume-state.json`: 스토리보드 수정 완료 지점과 마지막 검증 상태입니다.
3. `design-specs/revision-figma-audit.json`: 확인한 수치와 검증 범위입니다.
4. `cms-knowledge/master-cms/resume-state.json`: 원래 CMS 조사 상태, 데이터 조작 내역의 연결, 다음 조사 범위입니다.
5. `cms-knowledge/master-cms/knowledge.json`: CMS 지식과 근거 색인입니다.

전체 이력은 `docs/WORK_HISTORY.md`와 `docs/investigation-history.json`에서 날짜와 단계별로 찾습니다. 지식·정책 문서가 참조하는 evidence, scenarios, sources 원본도 함께 보관합니다.

## Figma 위치

- 파일: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/
- 전체 목차: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id=9-20632
- 출처 관리 모달: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id=8-16776
- 임시본 선택 모달: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id=8-16922
- 메타정보 수정: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id=8-17074
- OMR 수정: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id=8-17928
- 수식입력기: https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id=8-18346

페이지는 홈·공통, 전체 문항, HML 등록, 디피니션 등록, 쌍둥이 그룹, 평가지, 출처, 랩의 8개로 구분되어 있습니다. 기본 화면 30개, 모달·팝업 컴포넌트 52개, UI 변형 71개입니다. UI 변형 중 2개는 원본 소스 기반 재현이며 실제 CMS 실행 캡처와 구분했습니다. 기존 상태 373개를 정책·예외로 매핑했고 명시적 화면 전환 44개를 연결했습니다.

## 사용자가 요구한 표현 방식

- 페이지 하단까지 전체 화면을 보여주고 캡처의 원래 비율을 유지합니다.
- 기본 화면의 실제 요소 위에 빨간 번호를 놓고 오른쪽 Description과 대응시킵니다.
- 모달은 실제 탭·검색 영역·표·행별 액션·버튼 배치를 따릅니다. 필드명을 일반 입력폼 템플릿에 넣어 대체하면 안 됩니다.
- 탭을 누를 때 모달 UI가 달라지면 변형을 따로 보여주고 탭에서 화살표를 연결합니다.
- 버튼에서 목적 화면·모달까지 전환 화살표를 연결합니다. 조건부 버튼과 취소·저장 결과도 설명합니다.
- 같은 화면의 일반 동작과 결과는 Description으로 합치고 불필요한 전체 화면 복제를 줄입니다.
- 쌍둥이 검색·추가, 출처 관리, 평가지 등 사용자가 예로 든 부분뿐 아니라 모든 메뉴에 같은 기준을 적용합니다.
- 개발 데이터 조작은 허용되어 있지만, 이미 끝난 검증을 반복 실행할 필요는 없습니다.

## 최종 검증 근거와 주의할 캡처

2026-11-12 실제 Figma 공개 플러그인 API로 30개 화면 섹션의 텍스트 경계·같은 프레임 내 설명문 겹침을 검사했습니다. 화면 30개, 정밀 모달 52개, 기본 Description 187개를 읽었고 프레임 밖 텍스트 0개, 설명문 겹침 0개였습니다. 모달 컨트롤 302개의 좌표가 각 실제 이미지 범위 안에 있는지 로컬 데이터로 확인했습니다. 이는 모든 정책과 모든 픽셀을 자동으로 완전 검증했다는 뜻은 아닙니다.

시각 확인에 사용한 파일:

- `design-specs/review-v4-source-precise.png`: 실제 출처 관리의 현재 출처·추가 탭과 정확한 번호입니다.
- `design-specs/review-v4-meta-final.png`: 실제 메타정보 수정 화면 전체입니다.
- `design-specs/review-v4-omr-final.png`: 실제 OMR 수정 화면과 수정된 번호입니다.
- `design-specs/review-v4-math-precise-final.png`: 2026-11-12 재연결 후 확인한 키보드·손글씨 탭과 버튼입니다.

`review-v4-math-final.png`는 정밀 번호 수정 전 자료입니다. `revision-meta-v4-reviewed.png`는 로딩 중 빈 화면이었고 `revision-source-detail-v4-reviewed.png`는 파일명과 다른 선택 화면을 캡처했습니다. 이런 과거 자료는 이력으로 보관하며 최신 검증 근거로 사용하지 않습니다. 이름의 final/reviewed만으로 최신성을 판단하지 않습니다.

## CMS 조사에서 아직 확인하지 못한 범위

1. 실제 해석 HML 파일의 편집·저장: 표본이 없습니다.
2. 정상 디피니션 세트 ZIP의 등록·검수: 정상 원본 표본이 없습니다.
3. 다른 계정 역할의 권한 차이와 일부 오류 상황입니다.
4. 배포 후 수신과 채점은 서비스 CMS에서 별도로 확인합니다. 서비스 CMS 환경은 아직 전달받지 않았습니다.

사용자가 알려준 정책: 문항 상세 오른쪽 HML 카드에는 원본 HML 미리보기 이미지가 표시되는 것이 정상입니다. 일부 이미지가 안 보이는 것은 현재 오류이며 미지원 기능으로 해석하지 않습니다.

개발 Master CMS 서버 변경 누계는 기존 조사 95건입니다. 스토리보드 수정 과정에서 새 서버 쓰기는 0건입니다. 변경 상세는 `cms-knowledge/master-cms/mutation-ledger.json`을 확인합니다. 마지막 조사 근거는 `3473-paper1094-reversed-range-final-independent-readback`이며 평가지 범위 검증 후 원래 값으로 복구한 상태입니다. 현재 브라우저 상태는 다시 관찰해야 합니다.

## 브라우저 연결을 다시 해야 할 때

연결 설정은 `cms-knowledge/master-cms/agent-browser-session.json`, 연결 유지 도구는 `design-specs/revision-root-broker.py`입니다. 사용자는 현재 로그인된 Chrome 연결 유지를 선택했습니다. 마우스·키보드를 점유하지 않는 브라우저 제어를 우선하고 반복 승인 요청을 피합니다.

세션을 종료하면 PTY 프로세스, WebSocket, CDP 세션, Scripter iframe 연결은 만료될 수 있습니다. 저장된 ID는 과거 관찰값입니다. 현재 살아 있다고 가정하지 않습니다.

1. 현재 제공되는 목적별 도구와 연결 상태를 먼저 확인합니다. 기존 브로커가 살아 있으면 재사용합니다.
2. 새 브로커가 필요하면 승인 요청 사실을 먼저 알리고 **한 번** 연결합니다. 기존 스크립트를 사용할 때는 `python -X utf8 design-specs/revision-root-broker.py`를 유지 가능한 PTY(`tty=true`)로 실행합니다. 일반 파이프는 stdin이 닫혀 연결이 즉시 종료될 수 있습니다.
3. 승인 대기 시간은 180초입니다. 시간 초과 후 자동 재시도 루프를 만들지 말고 결과를 알립니다. 최신 연결 주소는 Chrome의 DevToolsActivePort와 대조할 수 있습니다. 임의로 Chrome을 종료하거나 로그인 상태를 초기화하지 않습니다.
4. Figma 문서 제목과 URL을 확인합니다. Scripter는 열려 있는 동안만 현재 iframe target을 찾아 연결합니다. hidden 속성이 있거나 크기가 0인 잔여 dialog는 열린 플러그인이 아닙니다.
5. 공개 Monaco API로 `file:///scripter.*` 모델에 작성한 코드를 넣고 실제 Run 버튼을 누릅니다. 입력 후 Run은 순차 실행합니다. 코드 래퍼는 `(/*SCRIPTER*/async function __scripter_script_main(){ ... })()/*SCRIPTER*/`입니다.
6. 완료 toast·플러그인 데이터·실제 캡처로 결과를 확인합니다. 호출을 보냈다는 사실만으로 완료를 판단하지 않습니다. 끝나면 보이는 Scripter를 닫고 focus emulation을 false로 돌립니다.

2026-11-12 마지막 작업에서는 연결과 실제 검증이 성공했고 Scripter를 닫았습니다. 사용자 클립보드는 사용하지 않았습니다. 이후 실행 환경에 제공된 브라우저 도구의 최신 지침을 우선합니다.

## 수정 스크립트 재실행 주의

현재 도면을 읽고 필요한 노드만 수정합니다. 전체 빌드 스크립트는 기존 도면과 사용자 코멘트를 덮어쓸 수 있습니다.

- `revision-aligned-plan.json`: 기본 화면별 최종 계획입니다.
- `revision-precise-overlay-plan.json`: 모달별 실제 변형·컨트롤 좌표 302개입니다.
- `revision-precise-overlays.js`: 정확한 컨트롤 좌표를 적용한 마지막 모달 렌더러입니다. 통합 buttons 배열로 푸터를 추정하던 예전 방식은 제거했습니다.
- `revision-resume-audit.js`: export 없이 실제 프레임 텍스트를 검사한 마지막 경량 검사입니다.
- `revision-final-alignment.js`: 일부 이동이 누적되는 작업을 포함하므로 그대로 반복 실행하면 안 됩니다.
- `revision-final-audit.js`: 이미지 export를 포함한 이전 검사입니다. 마지막 실행 전체가 완료된 것으로 간주하지 않습니다. 최신 검증 결과는 audit JSON의 finalVerification을 확인합니다.

Figma root pluginData의 `cmsRevisionNodes`는 화면 키와 실제 노드 ID를 연결합니다. `cmsRevisionAudit`는 누적 수정 수치이고, `cmsRevisionFinalVerification`은 2026-11-12 경량 검사의 실제 결과입니다. 페이지/컴포넌트의 `cmsRevision*` 태그를 이용해 기존 노드를 찾습니다.

## 이력 보관의 범위

이 저장소에는 현재 작업 폴더에 남아 있는 조사 근거·단계별 기록·소스·정책·캡처·생성 스크립트가 포함됩니다. 대화 원문 전체를 별도로 내보낸 파일은 없으므로, 대화의 모든 문장이 저장되었다고 주장하지 않습니다. 중요한 사용자 요구와 알려진 오류·재개 제약은 이 문서에 기록했습니다.

Git은 로컬 이력입니다. 원격 push는 요청받지 않았습니다. 로그인 쿠키와 비밀번호를 재개 수단으로 저장하지 않으며 새 세션은 현재 사용자의 로그인된 브라우저와 승인 절차를 이용합니다.
