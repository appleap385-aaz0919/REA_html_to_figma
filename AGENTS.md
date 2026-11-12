# 세션 재개 지침

이 폴더는 Master CMS 조사와 Figma 스토리보드의 작업 기록 저장소다.

새 세션에서 작업하거나 사용자가 재개를 요청하면 먼저 `docs/SESSION_HANDOFF.md`를 읽는다. 현재 상태, 근거, 미검증 범위, 브라우저 연결 복구 방법은 이 문서의 링크를 따라 확인한다.

- 작업 이력은 `docs/WORK_HISTORY.md`에서 찾는다. 세부 조사 기록은 `docs/investigation-history.json`과 각 원본 세션 파일을 확인한다.
- Figma 최신 산출물의 기준은 `design-specs/figma-storyboard-revision-delivery.json`이다. 이전 delivery 파일과 이름만 비슷한 캡처를 최신 결과로 취급하지 않는다.
- 재개할 때 현재 브라우저·화면을 새로 관찰한다. 저장된 PTY ID, CDP 세션, iframe ID, 요소 인덱스는 세션을 넘겨 재사용하지 않는다.
- 사용자가 중단을 요청하면 조작을 멈추고 재개 상태를 기록한다. 사용자가 재개하면 기록한 다음 작업부터 이어간다.
- 작업을 마칠 때 최신 상태 JSON, `docs/SESSION_HANDOFF.md`, `docs/WORK_HISTORY.md`를 갱신한다. 사용자 요청으로 커밋할 때는 `scripts/snapshot_history.py`로 이력 색인을 갱신하고, 스테이징 후 `scripts/snapshot_history.py --manifest`로 파일 목록과 해시를 만든다.
- 서버 데이터 조작은 개발 Master CMS에 대해 허용된 범위에서 수행하고 `cms-knowledge/master-cms/mutation-ledger.json`에 근거와 결과를 남긴다. 서비스 CMS 조사는 별도 환경을 전달받은 뒤 시작한다.

Git 커밋에는 로컬 조사 자료가 포함된다. 외부 원격 저장소로의 업로드는 별도 사용자 요청이 있을 때 수행한다.
