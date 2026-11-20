# Master CMS 로컬 목업

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

정적 HTML/CSS/JavaScript를 사용합니다. 사용자는 백엔드 서버 없이 파일을 직접 열기를 요청했습니다. 이에 따라 빌드, 패키지 설치, 모듈 로더, API 호출이 필요 없는 구성을 선택했습니다.

## Users

Master CMS의 문항·평가지·출처 관리 흐름을 검토하는 사용자입니다.

## Product Purpose

조사한 전체 메뉴와 화면 상태를 임의의 예시 데이터로 체험합니다. 기존 Master CMS 화면을 충실히 재현한다는 사용자 답변을 기준으로 합니다.

## Capabilities and Constraints

전체 문항, HML, 디피니션, 쌍둥이, 평가지, 출처, 랩을 제공합니다. 데이터 변경은 이 목업의 브라우저 저장소에만 적용합니다. HML/ZIP 변환, AI 생성, 배포, 벤더 편집기와 채점 서비스는 연결하지 않으며 모의 처리와 미지원 범위를 구분합니다. 단순 모의 채점은 서비스 채점과 다릅니다.

## Evidence on Hand

`../design-specs/revision-aligned-plan.json`, `../design-specs/revision-modal-plan.json`, `../docs/SESSION_HANDOFF.md`와 보존된 실제 화면 캡처가 기준입니다. 50문항 초과 평가지 등록 제한은 변경 예정 정책입니다.
