const PLAN={
  "screenCount": 30,
  "modalCount": 52,
  "oldStateCount": 373,
  "oldStatesMapped": 373,
  "pages": [
    "00 홈 · 공통 기능",
    "01 문항 관리 · 전체 문항",
    "02 문항 관리 · HML 문항 등록",
    "03 문항 관리 · 디피니션 문항 등록",
    "04 문항 관리 · 쌍둥이 그룹",
    "05 평가지 관리",
    "06 문항 출처 관리",
    "07 랩"
  ],
  "screens": [
    {
      "id": "REV_HOME_01",
      "title": "홈·공통 메뉴",
      "menu": "홈",
      "kind": "base-page",
      "mergedScreens": [
        "MST_HOME_01",
        "MST_HOME_02",
        "MST_HOME_03",
        "MST_HOME_04"
      ],
      "screenshot": "design-specs/revision-captures/home.png",
      "html": null,
      "notes": [
        {
          "key": "01",
          "label": "접속 정보와 홈 안내",
          "body": "상단에 마스터 구분과 현재 접속자 ID를 표시합니다. 홈에서는 접속 안내와 ‘왼쪽 메뉴에서 작업을 선택해 주세요.’ 문구를 확인할 수 있습니다.",
          "sourceStates": [
            "MST_HOME_01_01",
            "MST_HOME_01_02"
          ],
          "anchor": {
            "x": 900,
            "y": 220,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "공통 업무 메뉴",
          "body": "문항 관리를 펼치면 전체 문항·HML 문항 등록·디피니션 문항 등록·쌍둥이 그룹 관리가 나타납니다. 평가지 관리·문항 출처 관리·랩은 별도 메뉴로 제공하며, 선택한 메뉴의 기본 화면으로 이동합니다.",
          "sourceStates": [
            "MST_HOME_02_01",
            "MST_HOME_02_02",
            "MST_HOME_02_03"
          ],
          "anchor": {
            "x": 110,
            "y": 180,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "로그아웃",
          "body": "상단 로그아웃 버튼을 누르면 현재 계정의 로그아웃 확인창을 엽니다. 다른 사용자의 세션을 대상으로 하는 랩의 역할별 로그아웃과 구분합니다.\n‘로그아웃하시겠습니까?’와 ‘로그인 화면으로 나갑니다.’를 안내합니다. 취소·닫기는 확인창을 닫고, 로그아웃은 최종 로그아웃 폼을 제출합니다. 실제 세션 종료 이후의 동작은 검증하지 않았습니다.",
          "sourceStates": [
            "MST_HOME_03_01",
            "MST_HOME_03_02"
          ],
          "anchor": {
            "x": 1720,
            "y": 28,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "로딩과 처리 결과 안내",
          "body": "조회·저장 요청 중에는 로딩 표시를 사용하고, 처리 결과에 따라 성공·반려·오류를 안내합니다. 일부 성공 안내는 이동한 상세 화면에서 표시됩니다. 통신이나 화면 수집의 시간 초과만으로 업무 처리 실패를 확정할 수 없습니다.",
          "sourceStates": [
            "MST_HOME_04_01",
            "MST_HOME_04_02"
          ],
          "anchor": {
            "x": 800,
            "y": 400,
            "w": 20,
            "h": 20
          },
          "number": 4
        }
      ],
      "modals": [
        {
          "id": "REV_HOME_LOGOUT",
          "title": "로그아웃",
          "triggerKey": "03",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "로그아웃"
          ],
          "body": "‘로그아웃하시겠습니까?’와 ‘로그인 화면으로 나갑니다.’를 안내합니다. 취소·닫기는 확인창을 닫고, 로그아웃은 최종 로그아웃 폼을 제출합니다. 실제 세션 종료 이후의 동작은 검증하지 않았습니다.",
          "sourceStates": [
            "MST_HOME_03_01",
            "MST_HOME_03_02"
          ],
          "anchor": {
            "x": 1720,
            "y": 28,
            "w": 20,
            "h": 20
          },
          "noteNumber": 3,
          "message": "로그아웃하시겠습니까?",
          "noteKey": "03"
        }
      ],
      "page": "00 홈 · 공통 기능",
      "order": 0,
      "preserve": false,
      "image": {
        "key": "829cc9db0d51f1bf7a6bf35af1d96507a8ed8035ec9b720638b910f1be74d6a0",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/home.png"
      },
      "geometry": "revision-captures/home.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "문항 관리 → 전체 문항",
          "target": "REV_ITM_01",
          "anchor": {
            "x": 8,
            "y": 116,
            "w": 240,
            "h": 44
          },
          "action": "문항 관리 펼침 후 전체 문항 선택"
        },
        {
          "label": "평가지 관리",
          "target": "REV_PAP_LIST",
          "anchor": {
            "x": 8,
            "y": 160,
            "w": 240,
            "h": 44
          },
          "action": "클릭"
        },
        {
          "label": "문항 출처 관리",
          "target": "REV_SRC_LIST",
          "anchor": {
            "x": 8,
            "y": 204,
            "w": 240,
            "h": 44
          },
          "action": "클릭"
        },
        {
          "label": "랩",
          "target": "REV_LAB_01",
          "anchor": {
            "x": 8,
            "y": 248,
            "w": 240,
            "h": 44
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_ITM_01",
      "title": "전체 문항 목록",
      "menu": "문항 관리 · 전체 문항",
      "kind": "preserve-approved-frame",
      "mergedScreens": [
        "MST_ITM_01",
        "MST_ITM_01_STATES"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/128-all-items-current.png",
      "html": null,
      "notes": [
        {
          "key": "01",
          "label": "전체 문항 목록",
          "body": "현재 검색 조건에 맞는 문항 목록과 조회 건수를 표시합니다. 문항의 문제 링크를 선택하면 해당 문항 상세로 이동합니다.",
          "sourceStates": [],
          "anchor": {
            "x": 300,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "분류·단원·검색 조건",
          "body": "교육과정·학교급·과목군과 단원을 선택해 검색 범위를 정하며, 선택한 단원 안에서 조회합니다. 검색 기준은 문항 ID·지문 ID·지문·문제·출처코드·등록자 ID·원본 파일명입니다. 난이도·생성 방식·형태·등록일·배포·상태 조건을 함께 사용할 수 있고, 형태의 하위 선택지는 상위 선택에 연동됩니다.",
          "sourceStates": [
            "MST_ITM_01_STATES_01",
            "MST_ITM_01_STATES_02"
          ],
          "anchor": {
            "x": 300,
            "y": 210,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "표시 개수·페이지·상세 이동",
          "body": "페이지당 표시 개수는10·30·50·100개이며, 페이지 이동 시 목록과 표시 구간을 갱신합니다. 문항 상세로 이동할 때 검색 조건과 페이지 정보를 함께 전달합니다.",
          "sourceStates": [
            "MST_ITM_01_STATES_03"
          ],
          "anchor": {
            "x": 300,
            "y": 250,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "빈 검색 결과",
          "body": "조건에 맞는 문항이 없으면 목록의 빈 결과 상태를 표시합니다. 전체 문항 화면의 고유 안내 문구와 빈 결과의 페이지 처리 규칙은 추가 확인이 필요합니다.",
          "sourceStates": [
            "MST_ITM_01_STATES_04"
          ],
          "anchor": {
            "x": 300,
            "y": 290,
            "w": 20,
            "h": 20
          },
          "number": 4
        }
      ],
      "modals": [],
      "page": "01 문항 관리 · 전체 문항",
      "order": 1,
      "preserve": true,
      "image": null,
      "captureLabel": "승인된 원형 유지",
      "flows": [
        {
          "label": "문제 링크",
          "target": "REV_ITM_02",
          "anchor": {
            "x": 850,
            "y": 570,
            "w": 20,
            "h": 20
          },
          "action": "문제 클릭 → 문항 상세"
        }
      ]
    },
    {
      "id": "REV_ITM_02",
      "title": "문항 상세",
      "menu": "문항 관리 · 전체 문항",
      "kind": "base-page-with-set-variant",
      "mergedScreens": [
        "MST_ITM_02",
        "MST_ITM_03",
        "MST_ITM_04",
        "MST_ITM_09",
        "MST_ITM_TWN_01",
        "MST_ITM_TWN_03",
        "MST_ITM_TWN_04",
        "MST_ITM_TWN_05",
        "MST_ITM_TWN_06",
        "MST_ITM_TWN_02"
      ],
      "screenshot": "design-specs/revision-captures/item-detail.png",
      "html": "cms-knowledge/master-cms/sources/own-copy239-after-explanation9104-20261110.html",
      "notes": [
        {
          "key": "01",
          "label": "단건·세트 상세",
          "body": "상하단에서 목록·이전 문항·다음 문항으로 이동할 수 있고, 본문에는 MASTER·상태 정보·기본 정보를 표시합니다. 단건은 문항 하나를, 세트는 공유 지문과 자식 문항 목록을 함께 표시합니다. 세트에서는 현재 문항을 강조하고 구성원 링크로 해당 문항 상세를 열 수 있습니다.",
          "sourceStates": [
            "MST_ITM_02_01",
            "MST_ITM_02_02"
          ],
          "anchor": {
            "x": 295,
            "y": 250,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "HTML·HML 표시",
          "body": "HTML 영역에는 문항의 문제·정답·풀이 등을 렌더링합니다. 오른쪽 HML 영역은 원본 HML의 미리보기 이미지를 표시하는 기능입니다. 일부 이미지가 비어 있거나 로드에 실패한 상태는 기능 미지원과 구분합니다.",
          "sourceStates": [
            "MST_ITM_02_04"
          ],
          "anchor": {
            "x": 1050,
            "y": 336,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "OMR 미리보기",
          "body": "현재 문항의 OMR 미리보기 버튼으로 저장된 응답 구성을 확인합니다. CMS 미리보기에서 확인한 응답·채점 결과는 실제 서비스의 채점 검증과 구분합니다.\n저장된 OMR과 정답을 이용해 유형별 응답 화면을 표시합니다. 응답·채점·정답 보기는 해당 유형이 제공하는 기능에 따라 달라집니다. 실제 서비스의 채점 결과까지 검증한 것은 아닙니다.",
          "sourceStates": [
            "MST_ITM_02_03"
          ],
          "anchor": {
            "h": 32,
            "w": 121.828125,
            "x": 848.671875,
            "y": 410.140625
          },
          "number": 3
        },
        {
          "key": "06",
          "label": "문항 수정과 임시본 선택",
          "body": "문항 수정을 선택하면 임시저장본의 존재 여부를 먼저 확인합니다. 임시본이 있으면 임시저장 수정하기와 검수완료 수정하기 중 편집할 버전을 선택합니다. 선택 후 메타정보·HML·HTML·OMR의 네 수정 탭으로 진입합니다.\n임시저장 시각과 함께 어느 버전을 수정할지 안내합니다. 임시저장 수정하기는 임시본을, 검수완료 수정하기는 확정본을 편집 대상으로 선택합니다. 취소·닫기는 버전 선택을 진행하지 않습니다.",
          "sourceStates": [
            "MST_ITM_09_02"
          ],
          "anchor": {
            "h": 40,
            "w": 112.921875,
            "x": 1635.078125,
            "y": 1366.140625
          },
          "number": 4
        },
        {
          "key": "T01",
          "label": "문항 상세 재사용·관계 관리",
          "body": "문항 상세의 쌍둥이 개수·관계 진입을 선택하면 쌍둥이 문항 관리 모달이 열립니다. 단건의 현재 멤버 수에는 자신이 포함되며 세트의 개수와 자식 행 수는 구분합니다.\n현재 쌍둥이와 쌍둥이 추가는 같은 모달의 탭이며 본인·등록된·폐기 후보와 단건/세트 혼합 후보는 추가가 비활성입니다. 다른 단건 그룹의 후보를 추가해 두 그룹이 합쳐진 사례가 있고 세트 해제는 지문 단위로 별도 확인창 없이 실행됩니다. 같은 지문 형제의 활성 추가에서 HTTP 500과 비활성 탭 내부 오류가 확인됐으며 닫기 시 검색 초기화 등 전체 상태 수명은 일부 미검증입니다.",
          "sourceStates": [
            "MST_ITM_TWN_01_01",
            "MST_ITM_TWN_01_02",
            "MST_ITM_TWN_01_03",
            "MST_ITM_TWN_01_04",
            "MST_ITM_TWN_01_05",
            "MST_ITM_TWN_02_01",
            "MST_ITM_TWN_02_02",
            "MST_ITM_TWN_02_03",
            "MST_ITM_TWN_02_04",
            "MST_ITM_TWN_02_05",
            "MST_ITM_TWN_02_06",
            "MST_ITM_TWN_02_07",
            "MST_ITM_TWN_02_08",
            "MST_ITM_TWN_02_09"
          ],
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1187.46875,
            "y": 1848.140625
          },
          "number": 5
        },
        {
          "key": "T02",
          "label": "생성 자격·진입",
          "body": "쌍둥이 문항 생성 제어는 자격에 따라 활성·비활성·미노출이 다릅니다. 세트 전원이 승인(사용)이 아니면 비활성이며 일부 COPY 문항은 N과 Y 모두 생성·이력 진입이 없었습니다. 미노출의 전체 자격 규칙은 미확정입니다.\n복제는 현재 문항을 그대로 복제하고 AI는 유사 문항을 생성한다는 안내를 표시하며 COPY가 기본 선택입니다. 세트 요청은 자식별 반복 요청과 구분하고 취소·선택 변경은 서버 생성을 요청하지 않습니다. 생성 시작 후 접수와 실제 완료는 다른 단계입니다.\nCOPY는 새 초안·현재 관계·생성 이력을 만들고 AI는 요청 접수 후 비동기로 완료됩니다. 단건과 세트의 COPY·AI 완료가 확인됐으며 한 세트 요청에서 새 지문과 자식 네 개가 생긴 사례가 있습니다. 물리 파일 복제 구현·AI 입력 우선순위·서비스 채점은 미확정입니다.\nworking=true인 생성 중 버튼은 생성 모달 대신 진행 팝오버를 엽니다. 팝오버에는 생성 방식·요청자·요청 시각과 완료 후 목록 추가 안내를 표시하며 세트에는 전체 문항 생성 안내를 더합니다. 진행 확인 클릭은 새 생성 요청이 아닙니다.",
          "sourceStates": [
            "MST_ITM_TWN_03_02",
            "MST_ITM_TWN_03_04",
            "MST_ITM_TWN_03_01",
            "MST_ITM_TWN_03_03",
            "MST_ITM_TWN_03_06",
            "MST_ITM_TWN_03_05",
            "MST_ITM_TWN_04_02",
            "MST_ITM_TWN_04_03",
            "MST_ITM_TWN_04_01"
          ],
          "anchor": {
            "h": 40,
            "w": 159.84375,
            "x": 293,
            "y": 1366.140625
          },
          "number": 6
        },
        {
          "key": "T05",
          "label": "생성 이력",
          "body": "생성 이력은 문항 상세의 모달로 열리며 현재 쌍둥이 관계와 다른 정보입니다. 수동 관계 해제·재추가·병합이 기존 이력을 만들거나 지우지 않은 사례가 확인됐습니다. 이력 데이터가 없는 상태와 진입 버튼 자체가 없는 상태는 구분합니다.\n빈 이력에는 아직 생성된 쌍둥이 문항이 없다는 안내를 표시하고 문항 ID는 상세 새 탭 링크입니다. 세트의 한 생성 묶음은 자식 ID별 행과 병합된 방식·요청자·시각으로 표시합니다. 조회 실패 토스트가 설정돼 있으나 실제 세션 실패 유발과 복구는 미검증입니다.",
          "sourceStates": [
            "MST_ITM_TWN_05_01",
            "MST_ITM_TWN_05_02",
            "MST_ITM_TWN_05_03",
            "MST_ITM_TWN_05_04"
          ],
          "anchor": {
            "h": 40,
            "w": 159.84375,
            "x": 460.84375,
            "y": 1366.140625
          },
          "number": 7
        },
        {
          "key": "REV_ITM_STATUS_SAVE",
          "label": "상태 정보 저장",
          "body": "수정을 누르면 On-line 전용·용도·상태값을 편집하고 취소·저장할 수 있습니다. 현재 문항에서 허용하지 않는 상태값은 비활성화되며, 취소하면 원래 값으로 복원하고 다시 잠급니다. 승인 검사 대상의 필수 메타정보나 OMR에 오류가 있으면 저장 확인창 전에 안내합니다.\n일반 저장에서는 ‘저장하시겠습니까?’를 안내하고 확인창의 저장 버튼으로 최종 제출합니다. 세트의 비폐기 저장에서는 세트 문항 전체의 상태값이 함께 변경된다고 안내합니다. On-line 전용·용도까지 전원 일괄 변경되는지는 확인하지 않았습니다.\n단건 폐기는 쌍둥이 문항에서 제외된다고 안내하고, 세트 폐기는 같은 세트 전체가 폐기된다고 안내합니다. 최종 저장 후 폐기 상태에서는 상세 조회는 가능하고 수정은 잠기는 사례를 확인했습니다. 현재 쌍둥이 관계에서 제외되는 것과 생성 이력이 보존되는 것은 별개입니다.\n폐기 시 쌍둥이 문항에서 제외됨을 안내한 뒤 저장 여부를 확인합니다. 이는 관계 해제의 삭제 확인이 아니라 상태 D의 최종 저장이며 새 단건 COPY의 실제 저장이 확인됐습니다.\n같은 세트 문항 전체가 폐기되고 쌍둥이에서 제외됨을 안내한 뒤 저장 여부를 확인합니다. 선택 자식의 논리 세트가 대상이며 다른 쌍둥이 세트 전체를 폐기하는 동작은 아닙니다.\n상태 D 최종 저장으로 현재 쌍둥이에서 제외돼도 내용·버전·논리 세트와 생성 이력을 유지한 사례가 있습니다. 새 단건 COPY와 전원 R인 네 문항 세트에서 이 동작이 확인됐습니다. 다른 쌍둥이 세트의 동시 폐기·물리 삭제·혼합 또는 배포된 세트·강제 복구는 미검증입니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1682,
            "y": 1464.140625
          },
          "sourceStates": [
            "MST_ITM_03_01",
            "MST_ITM_03_03",
            "MST_ITM_03_02",
            "MST_ITM_03_04",
            "MST_ITM_03_05",
            "MST_ITM_TWN_06_01",
            "MST_ITM_TWN_06_03",
            "MST_ITM_TWN_06_02",
            "MST_ITM_TWN_06_04"
          ],
          "number": 8
        },
        {
          "key": "REV_ITM_STATUS_LEAVE",
          "label": "이동",
          "body": "상태 정보가 변경된 채 지정된 목록·이전·다음·문항 수정 링크로 이동하면 미저장 변경이 사라진다는 확인창을 표시합니다. 이동을 확인하면 원래 선택한 링크의 동작을 진행하고, 취소하면 현재 화면에 머뭅니다. 편집을 열기만 하고 값이 같으면 변경된 상태로 판단하지 않습니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1682,
            "y": 1464.140625
          },
          "sourceStates": [
            "MST_ITM_03_06"
          ],
          "number": 9
        },
        {
          "key": "REV_ITM_PRODUCT",
          "label": "출처 관리",
          "body": "기본 정보의 목록 조회 버튼으로 연결된 출처와 평가지를 확인합니다. 배포하기를 누르면 배포 대상 선택창을 엽니다. 쌍둥이 문항의 현재 관계와 생성 이력은 별도 쌍둥이 기능에서 확인합니다.\n현재 연결된 출처를 조회하거나 출처 추가 탭에서 후보를 검색합니다. 연결할 때 페이지와 용도를 입력하며, 페이지가 비어 있으면 요청을 차단합니다. 마지막 출처 하나의 해제는 차단하고, 중복 연결과 출처의 사용 상태는 각각의 조건에 따라 처리합니다.",
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1187.46875,
            "y": 1768.140625
          },
          "sourceStates": [
            "MST_ITM_04_01",
            "MST_ITM_04_02"
          ],
          "number": 10
        },
        {
          "key": "REV_ITM_PAPERS",
          "label": "평가지 목록",
          "body": "연결된 평가지의 ID·명칭·생성 방식·상태·등록 정보를 조회합니다. 연결된 평가지가 없으면 ‘등록된 평가지가 없습니다.’를 표시합니다. 평가지 편성 변경은 평가지 관리에서 수행합니다.",
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1187.46875,
            "y": 1808.140625
          },
          "sourceStates": [
            "MST_ITM_04_03"
          ],
          "number": 11
        },
        {
          "key": "REV_ITM_DEPLOY",
          "label": "문항 배포",
          "body": "AI출제마법사 CMS와 개발 서비스 중 배포 대상을 선택합니다. 대상이 없으면 배포 버튼이 비활성화되고, 재배포 대상이 포함되면 재배포 안내를 표시합니다. 대상 선택과 안내는 확인했으나 최종 배포와 서비스 수신 결과는 검증하지 않았습니다.",
          "anchor": {
            "h": 40,
            "w": 108,
            "x": 862.5,
            "y": 1182.65625
          },
          "sourceStates": [
            "MST_ITM_04_04"
          ],
          "number": 12
        }
      ],
      "modals": [
        {
          "id": "REV_ITM_DETAIL_OMR",
          "title": "OMR 미리보기",
          "triggerKey": "03",
          "fields": [
            "유형별 응답 영역",
            "채점 결과",
            "정답 보기"
          ],
          "buttons": [
            "닫기"
          ],
          "body": "저장된 OMR과 정답을 이용해 유형별 응답 화면을 표시합니다. 응답·채점·정답 보기는 해당 유형이 제공하는 기능에 따라 달라집니다. 실제 서비스의 채점 결과까지 검증한 것은 아닙니다.",
          "sourceStates": [
            "MST_ITM_02_03"
          ],
          "anchor": {
            "h": 32,
            "w": 121.828125,
            "x": 848.671875,
            "y": 410.140625
          },
          "noteNumber": 3,
          "message": "",
          "actual": {
            "image": {
              "key": "27a8af297d61459a22c425731762974db456fbce6d9908cc9fa32d6d154c85f4",
              "width": 1785,
              "height": 1352,
              "path": "design-specs/revision-captures/modal-omr-preview.png"
            },
            "crop": {
              "h": 952,
              "w": 524,
              "x": 630.5,
              "y": 120
            },
            "controls": [
              {
                "box": {
                  "h": 32,
                  "w": 32,
                  "x": 16,
                  "y": 12
                },
                "href": null,
                "id": "sidebarToggle",
                "name": null,
                "tag": "BUTTON",
                "text": "메뉴",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 192.65625,
                  "x": 52,
                  "y": 18
                },
                "href": "/main.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문제은행 마스터 CMS",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 72
                },
                "href": "/main.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "홈",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 116
                },
                "href": "#menu-ITEM",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문항 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 160
                },
                "href": "/item/all/list.donga?unitCurriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "전체 문항",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 196
                },
                "href": "/item/hml/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "HML 문항 등록",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 232
                },
                "href": "/item/difi/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "디피니션 문항 등록",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 268
                },
                "href": "/item/twin/list.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "쌍둥이 그룹 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 304
                },
                "href": "/paper/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "평가지 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 348
                },
                "href": "/product/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문항 출처 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 392
                },
                "href": "/lab/index.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "랩",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 108,
                  "x": 1661,
                  "y": 8
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "로그아웃",
                "type": "button"
              },
              {
                "box": {
                  "h": 28,
                  "w": 1497,
                  "x": 272,
                  "y": 105.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H2",
                "text": "문항 수정"
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 127.625,
                  "x": 272,
                  "y": 239.296875
                },
                "href": "#tabMeta",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "메타정보 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 139.328125,
                  "x": 398.625,
                  "y": 239.296875
                },
                "href": "#tabHml",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "한글(HML) 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 106.109375,
                  "x": 536.953125,
                  "y": 239.296875
                },
                "href": "#tabItem",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "HTML 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 100.4375,
                  "x": 642.0625,
                  "y": 239.296875
                },
                "href": "#tabOmr",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "OMR 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1501.15625,
                  "y": 231.140625
                },
                "href": "/item/all/detail.donga?itemId=2089239",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "취소",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1571.15625,
                  "y": 231.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "임시 저장",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1674.078125,
                  "y": 231.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "전체 반영",
                "type": "button"
              },
              {
                "box": {
                  "h": 65,
                  "w": 472.328125,
                  "x": 294,
                  "y": 301.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "문항 형태 *"
              },
              {
                "box": {
                  "h": 24,
                  "w": 102.546875,
                  "x": 314,
                  "y": 321.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "문항 형태 *"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.765625,
                  "x": 314,
                  "y": 386.140625
                },
                "href": null,
                "id": "qtCategory",
                "name": null,
                "tag": "SELECT",
                "text": "객관식\n주관식\n서술형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.78125,
                  "x": 460.765625,
                  "y": 386.140625
                },
                "href": null,
                "id": "qtAnswer",
                "name": null,
                "tag": "SELECT",
                "text": "단답형\n다답형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.78125,
                  "x": 607.546875,
                  "y": 386.140625
                },
                "href": null,
                "id": "qtType",
                "name": null,
                "tag": "SELECT",
                "text": "N지 선다\nO/X 형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 65,
                  "w": 962.65625,
                  "x": 784.328125,
                  "y": 301.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "이미지 업로드\n업로드"
              },
              {
                "box": {
                  "h": 24,
                  "w": 121.625,
                  "x": 804.328125,
                  "y": 321.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "이미지 업로드"
              },
              {
                "box": {
                  "h": 32,
                  "w": 78,
                  "x": 1656.984375,
                  "y": 317.140625
                },
                "href": null,
                "id": "imageUploadBtn",
                "name": null,
                "tag": "BUTTON",
                "text": "업로드",
                "type": "button"
              },
              {
                "box": {
                  "h": 65,
                  "w": 472.328125,
                  "x": 294,
                  "y": 464.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "문항 2089239"
              },
              {
                "box": {
                  "h": 24,
                  "w": 123.3125,
                  "x": 314,
                  "y": 484.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "문항 2089239"
              },
              {
                "box": {
                  "h": 24,
                  "w": 392.328125,
                  "x": 334,
                  "y": 947.296875
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "정답"
              },
              {
                "box": {
                  "h": 24,
                  "w": 392.328125,
                  "x": 334,
                  "y": 1022.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "풀이"
              },
              {
                "box": {
                  "h": 73,
                  "w": 962.65625,
                  "x": 784.328125,
                  "y": 464.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "OMR 편집 (정답 설정)\nOMR 미리보기"
              },
              {
                "box": {
                  "h": 24,
                  "w": 182.640625,
                  "x": 804.328125,
                  "y": 488.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "OMR 편집 (정답 설정)"
              },
              {
                "box": {
                  "h": 32,
                  "w": 121.828125,
                  "x": 1605.15625,
                  "y": 484.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "OMR 미리보기",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 575.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 557.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 565.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 569.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 639.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 621.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 629.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 633.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 703.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 685.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 693.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 697.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 767.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 749.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 757.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 761.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 831.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 813.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 821.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 825.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 94.21875,
                  "x": 804.328125,
                  "y": 877.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "정답 추가",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1501.15625,
                  "y": 1312.390625
                },
                "href": "/item/all/detail.donga?itemId=2089239",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "취소",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1571.15625,
                  "y": 1312.390625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "임시 저장",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1674.078125,
                  "y": 1312.390625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "전체 반영",
                "type": "button"
              },
              {
                "box": {
                  "h": 22.84375,
                  "w": 127.9375,
                  "x": 655.5,
                  "y": 137.078125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H5",
                "text": "OMR 미리보기"
              },
              {
                "box": {
                  "h": 56,
                  "w": 56,
                  "x": 1097.5,
                  "y": 121
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "닫기",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1067.5,
                  "y": 556
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "닫기",
                "type": "button"
              }
            ]
          },
          "noteKey": "03"
        },
        {
          "id": "REV_ITM_STATUS_SAVE",
          "title": "상태 정보 저장",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "저장",
            "닫기(X)"
          ],
          "body": "일반 저장에서는 ‘저장하시겠습니까?’를 안내하고 확인창의 저장 버튼으로 최종 제출합니다. 세트의 비폐기 저장에서는 세트 문항 전체의 상태값이 함께 변경된다고 안내합니다. On-line 전용·용도까지 전원 일괄 변경되는지는 확인하지 않았습니다.\n단건 폐기는 쌍둥이 문항에서 제외된다고 안내하고, 세트 폐기는 같은 세트 전체가 폐기된다고 안내합니다. 최종 저장 후 폐기 상태에서는 상세 조회는 가능하고 수정은 잠기는 사례를 확인했습니다. 현재 쌍둥이 관계에서 제외되는 것과 생성 이력이 보존되는 것은 별개입니다.\n폐기 시 쌍둥이 문항에서 제외됨을 안내한 뒤 저장 여부를 확인합니다. 이는 관계 해제의 삭제 확인이 아니라 상태 D의 최종 저장이며 새 단건 COPY의 실제 저장이 확인됐습니다.\n같은 세트 문항 전체가 폐기되고 쌍둥이에서 제외됨을 안내한 뒤 저장 여부를 확인합니다. 선택 자식의 논리 세트가 대상이며 다른 쌍둥이 세트 전체를 폐기하는 동작은 아닙니다.",
          "sourceStates": [
            "MST_ITM_03_02",
            "MST_ITM_03_04",
            "MST_ITM_03_05",
            "MST_ITM_TWN_06_01",
            "MST_ITM_TWN_06_03"
          ],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1682,
            "y": 1464.140625
          },
          "noteNumber": 8,
          "message": "저장하시겠습니까?",
          "noteKey": "REV_ITM_STATUS_SAVE"
        },
        {
          "id": "REV_ITM_STATUS_LEAVE",
          "title": "이동",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "이동"
          ],
          "body": "상태 정보가 변경된 채 지정된 목록·이전·다음·문항 수정 링크로 이동하면 미저장 변경이 사라진다는 확인창을 표시합니다. 이동을 확인하면 원래 선택한 링크의 동작을 진행하고, 취소하면 현재 화면에 머뭅니다. 편집을 열기만 하고 값이 같으면 변경된 상태로 판단하지 않습니다.",
          "sourceStates": [
            "MST_ITM_03_06"
          ],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1682,
            "y": 1464.140625
          },
          "noteNumber": 9,
          "message": "저장하지 않은 상태 정보 변경사항이 사라집니다. 이동하시겠습니까?",
          "noteKey": "REV_ITM_STATUS_LEAVE"
        },
        {
          "id": "REV_ITM_PRODUCT",
          "title": "출처 관리",
          "triggerKey": "05",
          "fields": [
            "현재 출처",
            "출처 추가",
            "페이지",
            "용도",
            "출처코드/출처명",
            "교육과정",
            "학교급",
            "과목군",
            "과목",
            "학년",
            "학기"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "추가",
            "수정",
            "해제"
          ],
          "body": "현재 연결된 출처를 조회하거나 출처 추가 탭에서 후보를 검색합니다. 연결할 때 페이지와 용도를 입력하며, 페이지가 비어 있으면 요청을 차단합니다. 마지막 출처 하나의 해제는 차단하고, 중복 연결과 출처의 사용 상태는 각각의 조건에 따라 처리합니다.",
          "sourceStates": [
            "MST_ITM_04_01",
            "MST_ITM_04_02"
          ],
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1187.46875,
            "y": 1768.140625
          },
          "noteNumber": 10,
          "message": "",
          "noteKey": "REV_ITM_PRODUCT"
        },
        {
          "id": "REV_ITM_PAPERS",
          "title": "평가지 목록",
          "triggerKey": "05",
          "fields": [
            "평가지 ID",
            "평가지명",
            "생성 방식",
            "상태",
            "등록자 · 등록일"
          ],
          "buttons": [
            "닫기"
          ],
          "body": "연결된 평가지의 ID·명칭·생성 방식·상태·등록 정보를 조회합니다. 연결된 평가지가 없으면 ‘등록된 평가지가 없습니다.’를 표시합니다. 평가지 편성 변경은 평가지 관리에서 수행합니다.",
          "sourceStates": [
            "MST_ITM_04_03"
          ],
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1187.46875,
            "y": 1808.140625
          },
          "noteNumber": 11,
          "message": "등록된 평가지가 없습니다.",
          "noteKey": "REV_ITM_PAPERS"
        },
        {
          "id": "REV_ITM_DEPLOY",
          "title": "문항 배포",
          "triggerKey": "05",
          "fields": [
            "배포 대상",
            "AI출제마법사 CMS",
            "개발 서비스"
          ],
          "buttons": [
            "닫기",
            "취소",
            "배포"
          ],
          "body": "AI출제마법사 CMS와 개발 서비스 중 배포 대상을 선택합니다. 대상이 없으면 배포 버튼이 비활성화되고, 재배포 대상이 포함되면 재배포 안내를 표시합니다. 대상 선택과 안내는 확인했으나 최종 배포와 서비스 수신 결과는 검증하지 않았습니다.",
          "sourceStates": [
            "MST_ITM_04_04"
          ],
          "anchor": {
            "h": 40,
            "w": 108,
            "x": 862.5,
            "y": 1182.65625
          },
          "noteNumber": 12,
          "message": "선택한 서비스에 배포하시겠습니까?",
          "noteKey": "REV_ITM_DEPLOY"
        },
        {
          "id": "REV_ITM_DRAFT",
          "title": "임시 저장 확인",
          "triggerKey": "06",
          "fields": [
            "임시저장 시각"
          ],
          "buttons": [
            "닫기",
            "취소",
            "임시저장 수정하기",
            "검수완료 수정하기"
          ],
          "body": "임시저장 시각과 함께 어느 버전을 수정할지 안내합니다. 임시저장 수정하기는 임시본을, 검수완료 수정하기는 확정본을 편집 대상으로 선택합니다. 취소·닫기는 버전 선택을 진행하지 않습니다.",
          "sourceStates": [
            "MST_ITM_09_02"
          ],
          "anchor": {
            "h": 40,
            "w": 112.921875,
            "x": 1635.078125,
            "y": 1366.140625
          },
          "noteNumber": 4,
          "message": "어느 버전을 수정하시겠습니까?",
          "noteKey": "06"
        },
        {
          "id": "TWN_C03_CURRENT_ADD",
          "title": "쌍둥이 문항 관리",
          "triggerKey": "T01",
          "fields": [
            "문항 ID·세트 ID(세트일 때)",
            "현재 쌍둥이 / 쌍둥이 추가 탭",
            "현재 표: 문항 ID·문제·단원코드·형태/난이도·상태·해제",
            "검색 기준: 문항 ID/지문/문제/출처코드/등록자 ID/원본 파일명·검색어",
            "교육과정·학교급·과목군·과목·학년·학기·난이도·형태1/2/3",
            "세트 여부(단일/세트)·상태(R/F/Y/N/D)",
            "결과 표: 문항 ID·문제·형태/난이도·세트 ID(문항수)·상태·매핑 정보·추가"
          ],
          "buttons": [
            "닫기(X)",
            "현재 쌍둥이",
            "쌍둥이 추가",
            "초기화",
            "조회",
            "추가",
            "해제",
            "닫기"
          ],
          "body": "현재 쌍둥이와 쌍둥이 추가는 같은 모달의 탭이며 본인·등록된·폐기 후보와 단건/세트 혼합 후보는 추가가 비활성입니다. 다른 단건 그룹의 후보를 추가해 두 그룹이 합쳐진 사례가 있고 세트 해제는 지문 단위로 별도 확인창 없이 실행됩니다. 같은 지문 형제의 활성 추가에서 HTTP 500과 비활성 탭 내부 오류가 확인됐으며 닫기 시 검색 초기화 등 전체 상태 수명은 일부 미검증입니다.",
          "sourceStates": [
            "MST_ITM_TWN_01_01",
            "MST_ITM_TWN_01_02",
            "MST_ITM_TWN_01_03",
            "MST_ITM_TWN_01_04",
            "MST_ITM_TWN_01_05",
            "MST_ITM_TWN_02_01",
            "MST_ITM_TWN_02_02",
            "MST_ITM_TWN_02_03",
            "MST_ITM_TWN_02_04",
            "MST_ITM_TWN_02_05",
            "MST_ITM_TWN_02_06",
            "MST_ITM_TWN_02_07",
            "MST_ITM_TWN_02_08",
            "MST_ITM_TWN_02_09"
          ],
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1187.46875,
            "y": 1848.140625
          },
          "noteNumber": 5,
          "message": "",
          "noteKey": "T01"
        },
        {
          "id": "TWN_C03_GENERATE",
          "title": "쌍둥이 문항 생성",
          "triggerKey": "T02",
          "fields": [
            "생성 방식: 복제(COPY, 기본 선택) / AI 생성",
            "세트일 때: 세트에 속한 모든 문항이 함께 생성됨 안내"
          ],
          "buttons": [
            "닫기(X)",
            "취소",
            "생성 시작"
          ],
          "body": "복제는 현재 문항을 그대로 복제하고 AI는 유사 문항을 생성한다는 안내를 표시하며 COPY가 기본 선택입니다. 세트 요청은 자식별 반복 요청과 구분하고 취소·선택 변경은 서버 생성을 요청하지 않습니다. 생성 시작 후 접수와 실제 완료는 다른 단계입니다.",
          "sourceStates": [
            "MST_ITM_TWN_03_01",
            "MST_ITM_TWN_03_03",
            "MST_ITM_TWN_03_06"
          ],
          "anchor": {
            "h": 40,
            "w": 159.84375,
            "x": 293,
            "y": 1366.140625
          },
          "noteNumber": 6,
          "message": "현재 문항을 그대로 복제합니다",
          "noteKey": "T02"
        },
        {
          "id": "TWN_C03_HISTORY",
          "title": "쌍둥이 생성 이력",
          "triggerKey": "T05",
          "fields": [
            "문항 ID·방식·요청자·생성일시 표",
            "세트는 한 생성 묶음의 자식 ID별 행과 방식/요청자/일시 병합 셀"
          ],
          "buttons": [
            "닫기(X)",
            "닫기"
          ],
          "body": "빈 이력에는 아직 생성된 쌍둥이 문항이 없다는 안내를 표시하고 문항 ID는 상세 새 탭 링크입니다. 세트의 한 생성 묶음은 자식 ID별 행과 병합된 방식·요청자·시각으로 표시합니다. 조회 실패 토스트가 설정돼 있으나 실제 세션 실패 유발과 복구는 미검증입니다.",
          "sourceStates": [
            "MST_ITM_TWN_05_01",
            "MST_ITM_TWN_05_02",
            "MST_ITM_TWN_05_03",
            "MST_ITM_TWN_05_04"
          ],
          "anchor": {
            "h": 40,
            "w": 159.84375,
            "x": 460.84375,
            "y": 1366.140625
          },
          "noteNumber": 7,
          "message": "아직 생성된 쌍둥이 문항이 없습니다.",
          "noteKey": "T05"
        }
      ],
      "page": "01 문항 관리 · 전체 문항",
      "order": 2,
      "preserve": false,
      "image": {
        "key": "a0e7bc911ecfc4f832181cf3c4b4de856a20030adae7025a05b225462b1f367e",
        "width": 1785,
        "height": 2250,
        "path": "design-specs/revision-captures/item-detail.png"
      },
      "geometry": "revision-captures/item-detail.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "문항 수정",
          "target": "REV_ITM_03",
          "anchor": {
            "h": 40,
            "w": 112.921875,
            "x": 1635.078125,
            "y": 1366.140625
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_ITM_03",
      "title": "문항 수정 · 메타정보 수정",
      "menu": "문항 관리 · 전체 문항",
      "kind": "tab-page",
      "mergedScreens": [
        "MST_ITM_05",
        "MST_ITM_09"
      ],
      "screenshot": "design-specs/revision-captures/item-meta.png",
      "html": "cms-knowledge/master-cms/sources/item-edit.html",
      "notes": [
        {
          "key": "01",
          "label": "문항 수정과 네 탭",
          "body": "상단에 문항 ID·지문 ID·원본 파일·상태·배포 여부·생성 방식을 표시합니다. 메타정보 수정·한글(HML) 수정·HTML 수정·OMR 수정 탭으로 편집 영역을 전환합니다. 취소·임시 저장·전체 반영은 네 탭에서 공통으로 사용합니다.",
          "sourceStates": [
            "MST_ITM_05_01"
          ],
          "anchor": {
            "h": 40.84375,
            "w": 127.625,
            "x": 272,
            "y": 239.296875
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "기본 메타 정보",
          "body": "좌측에서 원문을 확인하면서 우측의 난이도와 썸네일을 편집합니다. 과목·학년·문제·세트 문항·세트 ID·평가지 등록 여부는 직접 변경하는 필드와 구분합니다. 썸네일은 등록·삭제를 제공하며 jpg·jpeg·png 형식 안내를 표시합니다.",
          "sourceStates": [
            "MST_ITM_05_05"
          ],
          "anchor": {
            "h": 24,
            "w": 127.25,
            "x": 1049.5,
            "y": 321.140625
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "학습·매핑 정보",
          "body": "단원코드·성취기준·내용영역·교과역량·행동영역을 추가하고 유형정보를 확인합니다. 단원코드와 행동영역은 필수이며 교과역량은 최대3개입니다. 단원 변경에 따라 과목·학년·유형정보가 연동되고, 분류마다 선택 수와 중복 처리 규칙이 다릅니다.",
          "sourceStates": [
            "MST_ITM_05_03",
            "MST_ITM_05_04",
            "MST_ITM_09_04"
          ],
          "anchor": {
            "h": 24,
            "w": 137.0625,
            "x": 1049.5,
            "y": 756.140625
          },
          "number": 3
        },
        {
          "key": "REV_ITM_UNIT",
          "label": "단원코드 추가 (검색)",
          "body": "단원 코드 또는 단원명과 교육과정·학교급·과목군·과목·학년·학기로 후보를 조회합니다. 선택한 단원을 추가하면 부모 폼의 과목·학년·유형정보를 갱신합니다. 단원은 여러 개 연결할 수 있으며 전체 반영에는1개 이상 필요합니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 821.140625
          },
          "sourceStates": [
            "MST_ITM_05_02"
          ],
          "number": 4
        },
        {
          "key": "REV_ITM_ACHIEVEMENT",
          "label": "성취기준 추가 (검색)",
          "body": "교육과정·학교급·과목군·과목·학년 조건으로 성취기준을 조회합니다. 선택한 결과를 부모 폼에 추가하며 같은 코드의 중복 추가를 막습니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 970.140625
          },
          "sourceStates": [],
          "number": 5
        },
        {
          "key": "REV_ITM_DOMAIN",
          "label": "내용영역 추가 (검색)",
          "body": "교육과정·학교급·과목군·과목·학년 조건으로 내용영역을 조회합니다. 선택한 내용영역을 부모 폼에 추가하며 성취기준과 별도의 코드로 관리합니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 1072.140625
          },
          "sourceStates": [],
          "number": 6
        },
        {
          "key": "REV_ITM_COMPETENCY",
          "label": "교과역량 추가 (검색)",
          "body": "교육과정·학교급·과목군 조건으로 교과역량을 조회합니다. 선택한 결과를 부모 폼에 추가하며 교과역량은 최대3개까지 연결할 수 있습니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 1174.140625
          },
          "sourceStates": [],
          "number": 7
        },
        {
          "key": "REV_ITM_BEHAVIOR",
          "label": "행동영역 추가 (검색)",
          "body": "과목군 조건으로 행동영역을 조회합니다. 행동영역은 단일 선택이며 전체 반영에 필요한 필수값입니다.",
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 1266.140625
          },
          "sourceStates": [],
          "number": 8
        },
        {
          "key": "REV_ITM_TEMP",
          "label": "임시 저장",
          "body": "임시 저장·전체 반영·취소는 각각 확인창을 거쳐 처리합니다. 공유 지문의 임시본과 전체 반영은 적용 범위가 다릅니다. 같은 계정의 오래된 수정폼이 이후 저장된 메타값을 덮어쓴 사례가 있어, 동시 편집 시 항상 충돌을 차단한다고 보장할 수 없습니다.\n‘임시 저장하시겠습니까?’를 확인한 뒤 임시 저장을 제출합니다. 난이도가 비어 있는 초안 복제 문항도 임시저장된 사례를 확인했습니다. 모든 HTML·OMR 오류가 허용되는 것으로 일반화할 수는 없습니다.",
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1571.15625,
            "y": 231.140625
          },
          "sourceStates": [
            "MST_ITM_09_06",
            "MST_ITM_09_07",
            "MST_ITM_09_01"
          ],
          "number": 9
        },
        {
          "key": "REV_ITM_APPLY",
          "label": "전체 반영",
          "body": "문서·필수 메타정보·OMR 검사를 통과하면 저장 확인창을 표시합니다. 최종 저장 후 새 상세 버전이 생성되고 임시본이 해소된 사례를 확인했습니다. 전체 반영은 승인 상태 변경이나 서비스 배포와 별도 처리입니다.",
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1674.078125,
            "y": 231.140625
          },
          "sourceStates": [
            "MST_ITM_09_03"
          ],
          "number": 10
        },
        {
          "key": "REV_ITM_CANCEL",
          "label": "문항 수정 취소",
          "body": "‘저장하지 않고 이동하시겠습니까?’를 안내합니다. 취소는 현재 편집 화면에 머물고, 저장 하지 않고 이동은 상세로 돌아갑니다. 이미 저장된 임시본과 현재 화면의 미저장 입력은 구분합니다.",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1501.15625,
            "y": 231.140625
          },
          "sourceStates": [
            "MST_ITM_09_05"
          ],
          "number": 11
        }
      ],
      "modals": [
        {
          "id": "REV_ITM_UNIT",
          "title": "단원코드 추가 (검색)",
          "triggerKey": "03",
          "fields": [
            "단원 코드/단원명",
            "교육과정",
            "학교급",
            "과목군",
            "과목",
            "학년",
            "학기",
            "조회 결과 선택"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "취소",
            "단원코드 추가"
          ],
          "body": "단원 코드 또는 단원명과 교육과정·학교급·과목군·과목·학년·학기로 후보를 조회합니다. 선택한 단원을 추가하면 부모 폼의 과목·학년·유형정보를 갱신합니다. 단원은 여러 개 연결할 수 있으며 전체 반영에는1개 이상 필요합니다.",
          "sourceStates": [
            "MST_ITM_05_02"
          ],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 821.140625
          },
          "noteNumber": 4,
          "message": "",
          "noteKey": "REV_ITM_UNIT"
        },
        {
          "id": "REV_ITM_ACHIEVEMENT",
          "title": "성취기준 추가 (검색)",
          "triggerKey": "03",
          "fields": [
            "교육과정",
            "학교급",
            "과목군",
            "과목",
            "학년",
            "조회 결과 선택"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "취소",
            "성취기준 추가"
          ],
          "body": "교육과정·학교급·과목군·과목·학년 조건으로 성취기준을 조회합니다. 선택한 결과를 부모 폼에 추가하며 같은 코드의 중복 추가를 막습니다.",
          "sourceStates": [],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 970.140625
          },
          "noteNumber": 5,
          "message": "",
          "noteKey": "REV_ITM_ACHIEVEMENT"
        },
        {
          "id": "REV_ITM_DOMAIN",
          "title": "내용영역 추가 (검색)",
          "triggerKey": "03",
          "fields": [
            "교육과정",
            "학교급",
            "과목군",
            "과목",
            "학년",
            "조회 결과 선택"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "취소",
            "내용영역 추가"
          ],
          "body": "교육과정·학교급·과목군·과목·학년 조건으로 내용영역을 조회합니다. 선택한 내용영역을 부모 폼에 추가하며 성취기준과 별도의 코드로 관리합니다.",
          "sourceStates": [],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 1072.140625
          },
          "noteNumber": 6,
          "message": "",
          "noteKey": "REV_ITM_DOMAIN"
        },
        {
          "id": "REV_ITM_COMPETENCY",
          "title": "교과역량 추가 (검색)",
          "triggerKey": "03",
          "fields": [
            "교육과정",
            "학교급",
            "과목군",
            "조회 결과 선택"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "취소",
            "교과역량 추가"
          ],
          "body": "교육과정·학교급·과목군 조건으로 교과역량을 조회합니다. 선택한 결과를 부모 폼에 추가하며 교과역량은 최대3개까지 연결할 수 있습니다.",
          "sourceStates": [],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 1174.140625
          },
          "noteNumber": 7,
          "message": "",
          "noteKey": "REV_ITM_COMPETENCY"
        },
        {
          "id": "REV_ITM_BEHAVIOR",
          "title": "행동영역 추가 (검색)",
          "triggerKey": "03",
          "fields": [
            "과목군",
            "조회 결과 선택"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "취소",
            "행동영역 추가"
          ],
          "body": "과목군 조건으로 행동영역을 조회합니다. 행동영역은 단일 선택이며 전체 반영에 필요한 필수값입니다.",
          "sourceStates": [],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1661,
            "y": 1266.140625
          },
          "noteNumber": 8,
          "message": "",
          "noteKey": "REV_ITM_BEHAVIOR"
        },
        {
          "id": "REV_ITM_TEMP",
          "title": "임시 저장",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "임시 저장"
          ],
          "body": "‘임시 저장하시겠습니까?’를 확인한 뒤 임시 저장을 제출합니다. 난이도가 비어 있는 초안 복제 문항도 임시저장된 사례를 확인했습니다. 모든 HTML·OMR 오류가 허용되는 것으로 일반화할 수는 없습니다.",
          "sourceStates": [
            "MST_ITM_09_01"
          ],
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1571.15625,
            "y": 231.140625
          },
          "noteNumber": 9,
          "message": "임시 저장하시겠습니까?",
          "noteKey": "REV_ITM_TEMP"
        },
        {
          "id": "REV_ITM_APPLY",
          "title": "전체 반영",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "저장"
          ],
          "body": "문서·필수 메타정보·OMR 검사를 통과하면 저장 확인창을 표시합니다. 최종 저장 후 새 상세 버전이 생성되고 임시본이 해소된 사례를 확인했습니다. 전체 반영은 승인 상태 변경이나 서비스 배포와 별도 처리입니다.",
          "sourceStates": [
            "MST_ITM_09_03"
          ],
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1674.078125,
            "y": 231.140625
          },
          "noteNumber": 10,
          "message": "저장하시겠습니까?",
          "noteKey": "REV_ITM_APPLY"
        },
        {
          "id": "REV_ITM_CANCEL",
          "title": "문항 수정 취소",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "저장 하지 않고 이동"
          ],
          "body": "‘저장하지 않고 이동하시겠습니까?’를 안내합니다. 취소는 현재 편집 화면에 머물고, 저장 하지 않고 이동은 상세로 돌아갑니다. 이미 저장된 임시본과 현재 화면의 미저장 입력은 구분합니다.",
          "sourceStates": [
            "MST_ITM_09_05"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1501.15625,
            "y": 231.140625
          },
          "noteNumber": 11,
          "message": "저장하지 않고 이동하시겠습니까?",
          "noteKey": "REV_ITM_CANCEL"
        }
      ],
      "page": "01 문항 관리 · 전체 문항",
      "order": 3,
      "preserve": false,
      "image": {
        "key": "5303ce2d95e5db12e79411c915f58fa540c54a09ef42bd190e6aee7fcc801f9c",
        "width": 1785,
        "height": 1750,
        "path": "design-specs/revision-captures/item-meta.png"
      },
      "geometry": "revision-captures/item-meta.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "한글(HML) 수정",
          "target": "REV_ITM_04",
          "anchor": {
            "h": 40.84375,
            "w": 139.328125,
            "x": 398.625,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "HTML 수정",
          "target": "REV_ITM_05",
          "anchor": {
            "h": 40.84375,
            "w": 106.109375,
            "x": 536.953125,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "OMR 수정",
          "target": "REV_ITM_06",
          "anchor": {
            "h": 40.84375,
            "w": 100.4375,
            "x": 642.0625,
            "y": 239.296875
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_ITM_04",
      "title": "문항 수정 · 한글(HML) 수정",
      "menu": "문항 관리 · 전체 문항",
      "kind": "tab-page",
      "mergedScreens": [
        "MST_ITM_08"
      ],
      "screenshot": "design-specs/revision-captures/item-hml.png",
      "html": "cms-knowledge/master-cms/sources/item-edit.html",
      "notes": [
        {
          "key": "01",
          "label": "HML 편집기 열기",
          "body": "한글(HML) 수정 탭의 한글 편집기 열기로 별도 편집창을 엽니다. 문제·해답을 확인하며 세트와 파일 연결 상태에 따라 지문·지문해석 카드가 추가됩니다. 편집기에서 저장한 내용은 CMS의 임시 저장 또는 전체 반영을 눌러야 반영됩니다.",
          "sourceStates": [
            "MST_ITM_08_01"
          ],
          "anchor": {
            "h": 32,
            "w": 118.4375,
            "x": 439.015625,
            "y": 321.140625
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "반영 대기와 취소",
          "body": "편집기에서 저장한 임시 HML과 이미지는 CMS에서 반영 대기 상태가 됩니다. CMS 취소 확인창에서 취소해 머물면 대기 참조가 남고, 저장 하지 않고 이동한 뒤 다시 진입하면 대기 참조가 없는 것을 확인했습니다. 확정 자산과 문항·관계는 비교 범위에서 유지됐으며 임시 파일의 물리 삭제 여부는 확인하지 않았습니다.",
          "sourceStates": [
            "MST_ITM_08_06"
          ],
          "anchor": {
            "x": 1049,
            "y": 465,
            "w": 20,
            "h": 20
          },
          "number": 2
        }
      ],
      "modals": [],
      "page": "01 문항 관리 · 전체 문항",
      "order": 4,
      "preserve": false,
      "image": {
        "key": "05e85394a97862b14452ecde6f9415fb9789caf525c631bfbc2a644120878769",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/item-hml.png"
      },
      "geometry": "revision-captures/item-hml.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "메타정보 수정",
          "target": "REV_ITM_03",
          "anchor": {
            "h": 40.84375,
            "w": 127.625,
            "x": 272,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "HTML 수정",
          "target": "REV_ITM_05",
          "anchor": {
            "h": 40.84375,
            "w": 106.109375,
            "x": 536.953125,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "OMR 수정",
          "target": "REV_ITM_06",
          "anchor": {
            "h": 40.84375,
            "w": 100.4375,
            "x": 642.0625,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "한글 편집기 열기",
          "target": "REV_ITM_07",
          "anchor": {
            "h": 32,
            "w": 118.4375,
            "x": 439.015625,
            "y": 321.140625
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_ITM_05",
      "title": "문항 수정 · HTML 수정",
      "menu": "문항 관리 · 전체 문항",
      "kind": "tab-page",
      "mergedScreens": [
        "MST_ITM_06"
      ],
      "screenshot": "design-specs/revision-captures/item-html.png",
      "html": "cms-knowledge/master-cms/sources/item-edit.html",
      "notes": [
        {
          "key": "01",
          "label": "HTML 수정 영역",
          "body": "HTML 수정 탭에서 문항 형태의 세 단계 선택과 이미지 업로드·문항 편집기를 제공합니다. 형태 선택은 선지와 OMR 구성에 연동됩니다. HTML 편집과 HML 편집은 별도의 문서 채널입니다.",
          "sourceStates": [
            "MST_ITM_06_01"
          ],
          "anchor": {
            "h": 65,
            "w": 472.328125,
            "x": 294,
            "y": 301.140625
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "편집기·미리보기·표 도구",
          "body": "문제·정답·풀이 등의 편집 내용은 우측 미리보기에서 확인합니다. 툴바는 실행취소·다시실행·정렬·문단·글자 서식·수식·이미지·표·글상자·d-box·d-input·특수문자·글자 겹치기를 제공합니다. 표 버튼은2×2 표를 즉시 삽입하고, 표 안에서는 행·열 추가/삭제·병합/분할·머리행/머리열·표삭제 등의 도구를 사용할 수 있습니다.",
          "sourceStates": [],
          "anchor": {
            "h": 24,
            "w": 89.625,
            "x": 314,
            "y": 484.140625
          },
          "number": 2
        },
        {
          "key": "REV_ITM_HTML_PARAGRAPH",
          "label": "문단 설정 (pt)",
          "body": "이미지는 전체 URL 입력창을 사용하고 특수문자는 문자 선택 즉시 삽입합니다. 글자 겹치기는 별도 설정창에서 문자와 모양을 지정합니다. 글상자는 기본240×100 크기로 삽입되며 핸들로 크기를 조절하거나 더블클릭해 본문과 크기를 편집합니다.\n왼쪽·오른쪽 여백, 첫 줄, 문단 앞·뒤, 줄간격을 설정합니다. 적용은 변경한 필드를 반영하고 취소는 설정을 반영하지 않습니다. 입력 범위와 편집한 필드만 적용하는 규칙은 코드로 확인했으며 모든 경계값을 실행 검증한 것은 아닙니다.",
          "anchor": {
            "h": 23.140625,
            "w": 38.75,
            "x": 622.3125,
            "y": 557.140625
          },
          "sourceStates": [
            "MST_ITM_06_04",
            "MST_ITM_06_02"
          ],
          "number": 3
        },
        {
          "key": "REV_ITM_HTML_MATH",
          "label": "수식 편집",
          "body": "비주얼 편집·LaTeX 소스·한글 크기·패턴 팔레트와 KaTeX 미리보기를 제공합니다. 확인이나 바깥 클릭은 적용을 시도하며, 취소하면 기존 수식은 보존되고 새 수식은 제거됩니다. 빈 값 확인도 수식 제거 경로이며 랩 수식입력기의 배경 닫기 동작과 다릅니다.",
          "anchor": {
            "h": 23.140625,
            "w": 49.28125,
            "x": 789.875,
            "y": 557.140625
          },
          "sourceStates": [
            "MST_ITM_06_03"
          ],
          "number": 4
        },
        {
          "key": "REV_ITM_HTML_IMAGE_URL",
          "label": "이미지 URL 입력 · 브라우저 prompt",
          "body": "브라우저 입력창에서 ‘추가할 이미지의 전체 URL을 입력하세요. (http:// 또는 https://)’를 안내합니다. 기본 입력은 https://이며 확인·취소로 입력을 마칩니다. 이 입력창은 파일 업로드나 그림 크기 설정을 수행하지 않습니다.",
          "anchor": {
            "h": 23.140625,
            "w": 64.125,
            "x": 845.15625,
            "y": 557.140625
          },
          "sourceStates": [],
          "number": 5
        },
        {
          "key": "REV_ITM_HTML_SYMBOL",
          "label": "특수문자 팔레트",
          "body": "원숫자·한글 원문자·도형·화살표·문장부호를 버튼으로 선택합니다. 문자 선택 시 즉시 삽입하므로 별도 확인·취소 버튼은 없습니다. Escape 닫기와 삽입 위치 제약은 코드로 확인한 범위입니다.",
          "anchor": {
            "h": 23.140625,
            "w": 59.484375,
            "x": 1139.109375,
            "y": 557.140625
          },
          "sourceStates": [],
          "number": 6
        },
        {
          "key": "REV_ITM_HTML_OVERLAP",
          "label": "글자 겹치기",
          "body": "겹칠 글자·모양·포개기 여부를 설정하고 미리보기로 확인합니다. 모양은 없음·원·사각형·둥근 사각형·삼각형·마름모 및 지원되는 채움 형태를 제공합니다. 입력은1~3자이고 모양 없음은2자 이상이어야 하는 코드 규칙이 있으며, 모든 경계 조합을 실행 검증한 것은 아닙니다.",
          "anchor": {
            "h": 23.140625,
            "w": 72.875,
            "x": 1204.59375,
            "y": 557.140625
          },
          "sourceStates": [],
          "number": 7
        },
        {
          "key": "REV_ITM_HTML_TEXTBOX",
          "label": "글상자 편집",
          "body": "글상자 내부 본문과 너비·높이·최소 높이를 편집합니다. 적용은 변경을 반영하고 취소는 원래 객체를 보존하며, 크기 편집을 지원하지 않는 원본의 입력은 비활성화됩니다. Enter는 새 줄, Shift+Enter는 줄바꿈, Ctrl+Enter는 적용, Escape는 취소로 동작하도록 안내합니다.",
          "anchor": {
            "h": 23.140625,
            "w": 49.125,
            "x": 964.671875,
            "y": 557.140625
          },
          "sourceStates": [
            "MST_ITM_06_05"
          ],
          "number": 8
        }
      ],
      "modals": [
        {
          "id": "REV_ITM_HTML_PARAGRAPH",
          "title": "문단 설정 (pt)",
          "triggerKey": "03",
          "fields": [
            "왼쪽 여백",
            "오른쪽 여백",
            "첫 줄 (음수: 내어쓰기)",
            "문단 앞",
            "문단 뒤",
            "줄간격 (배율)"
          ],
          "buttons": [
            "적용",
            "취소"
          ],
          "body": "왼쪽·오른쪽 여백, 첫 줄, 문단 앞·뒤, 줄간격을 설정합니다. 적용은 변경한 필드를 반영하고 취소는 설정을 반영하지 않습니다. 입력 범위와 편집한 필드만 적용하는 규칙은 코드로 확인했으며 모든 경계값을 실행 검증한 것은 아닙니다.",
          "sourceStates": [
            "MST_ITM_06_02"
          ],
          "anchor": {
            "h": 23.140625,
            "w": 38.75,
            "x": 622.3125,
            "y": 557.140625
          },
          "noteNumber": 3,
          "message": "",
          "noteKey": "REV_ITM_HTML_PARAGRAPH"
        },
        {
          "id": "REV_ITM_HTML_MATH",
          "title": "수식 편집",
          "triggerKey": "03",
          "fields": [
            "비주얼 편집",
            "LaTeX 소스",
            "한글 크기",
            "수식 본문",
            "미리보기 (KaTeX — 실서비스 렌더)"
          ],
          "buttons": [
            "⌨ 팔레트",
            "비주얼 편집",
            "LaTeX 소스",
            "취소",
            "확인"
          ],
          "body": "비주얼 편집·LaTeX 소스·한글 크기·패턴 팔레트와 KaTeX 미리보기를 제공합니다. 확인이나 바깥 클릭은 적용을 시도하며, 취소하면 기존 수식은 보존되고 새 수식은 제거됩니다. 빈 값 확인도 수식 제거 경로이며 랩 수식입력기의 배경 닫기 동작과 다릅니다.",
          "sourceStates": [
            "MST_ITM_06_03"
          ],
          "anchor": {
            "h": 23.140625,
            "w": 49.28125,
            "x": 789.875,
            "y": 557.140625
          },
          "noteNumber": 4,
          "message": "",
          "noteKey": "REV_ITM_HTML_MATH"
        },
        {
          "id": "REV_ITM_HTML_IMAGE_URL",
          "title": "이미지 URL 입력 · 브라우저 prompt",
          "triggerKey": "03",
          "fields": [
            "추가할 이미지의 전체 URL을 입력하세요. (http:// 또는 https://)"
          ],
          "buttons": [
            "확인",
            "취소"
          ],
          "body": "브라우저 입력창에서 ‘추가할 이미지의 전체 URL을 입력하세요. (http:// 또는 https://)’를 안내합니다. 기본 입력은 https://이며 확인·취소로 입력을 마칩니다. 이 입력창은 파일 업로드나 그림 크기 설정을 수행하지 않습니다.",
          "sourceStates": [],
          "anchor": {
            "h": 23.140625,
            "w": 64.125,
            "x": 845.15625,
            "y": 557.140625
          },
          "noteNumber": 5,
          "message": "",
          "noteKey": "REV_ITM_HTML_IMAGE_URL"
        },
        {
          "id": "REV_ITM_HTML_SYMBOL",
          "title": "특수문자 팔레트",
          "triggerKey": "03",
          "fields": [],
          "buttons": [
            "①",
            "②",
            "③",
            "④",
            "⑤",
            "⑥",
            "⑦",
            "⑧",
            "⑨",
            "⑩",
            "㉠",
            "㉡",
            "㉢",
            "㉣",
            "㉤",
            "㉥",
            "㉦",
            "㉧",
            "㉮",
            "㉯",
            "㉰",
            "㉱",
            "㉲",
            "□",
            "■",
            "○",
            "●",
            "△",
            "▲",
            "▽",
            "◇",
            "◆",
            "☆",
            "★",
            "→",
            "←",
            "↑",
            "↓",
            "↔",
            "⇒",
            "※",
            "·",
            "…",
            "～",
            "〈",
            "〉",
            "《",
            "》",
            "「",
            "」",
            "『",
            "』"
          ],
          "body": "원숫자·한글 원문자·도형·화살표·문장부호를 버튼으로 선택합니다. 문자 선택 시 즉시 삽입하므로 별도 확인·취소 버튼은 없습니다. Escape 닫기와 삽입 위치 제약은 코드로 확인한 범위입니다.",
          "sourceStates": [],
          "anchor": {
            "h": 23.140625,
            "w": 59.484375,
            "x": 1139.109375,
            "y": 557.140625
          },
          "noteNumber": 6,
          "message": "",
          "noteKey": "REV_ITM_HTML_SYMBOL"
        },
        {
          "id": "REV_ITM_HTML_OVERLAP",
          "title": "글자 겹치기",
          "triggerKey": "03",
          "fields": [
            "겹칠 글자",
            "모양",
            "글자를 한 자리에 포개기",
            "미리보기"
          ],
          "buttons": [
            "취소",
            "확인"
          ],
          "body": "겹칠 글자·모양·포개기 여부를 설정하고 미리보기로 확인합니다. 모양은 없음·원·사각형·둥근 사각형·삼각형·마름모 및 지원되는 채움 형태를 제공합니다. 입력은1~3자이고 모양 없음은2자 이상이어야 하는 코드 규칙이 있으며, 모든 경계 조합을 실행 검증한 것은 아닙니다.",
          "sourceStates": [],
          "anchor": {
            "h": 23.140625,
            "w": 72.875,
            "x": 1204.59375,
            "y": 557.140625
          },
          "noteNumber": 7,
          "message": "",
          "noteKey": "REV_ITM_HTML_OVERLAP"
        },
        {
          "id": "REV_ITM_HTML_TEXTBOX",
          "title": "글상자 편집",
          "triggerKey": "03",
          "fields": [
            "내부 본문 편집",
            "너비",
            "높이",
            "최소 높이"
          ],
          "buttons": [
            "취소",
            "적용"
          ],
          "body": "글상자 내부 본문과 너비·높이·최소 높이를 편집합니다. 적용은 변경을 반영하고 취소는 원래 객체를 보존하며, 크기 편집을 지원하지 않는 원본의 입력은 비활성화됩니다. Enter는 새 줄, Shift+Enter는 줄바꿈, Ctrl+Enter는 적용, Escape는 취소로 동작하도록 안내합니다.",
          "sourceStates": [
            "MST_ITM_06_05"
          ],
          "anchor": {
            "h": 23.140625,
            "w": 49.125,
            "x": 964.671875,
            "y": 557.140625
          },
          "noteNumber": 8,
          "message": "Enter=새 줄 · Shift+Enter=줄바꿈 · Ctrl+Enter=적용 · Esc=취소",
          "noteKey": "REV_ITM_HTML_TEXTBOX"
        }
      ],
      "page": "01 문항 관리 · 전체 문항",
      "order": 5,
      "preserve": false,
      "image": {
        "key": "9cf018ba9a058d8b3303fb2a43437057338d88ed2db1744e9b43e8037707d82d",
        "width": 1785,
        "height": 1716,
        "path": "design-specs/revision-captures/item-html.png"
      },
      "geometry": "revision-captures/item-html.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "메타정보 수정",
          "target": "REV_ITM_03",
          "anchor": {
            "h": 40.84375,
            "w": 127.625,
            "x": 272,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "한글(HML) 수정",
          "target": "REV_ITM_04",
          "anchor": {
            "h": 40.84375,
            "w": 139.328125,
            "x": 398.625,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "OMR 수정",
          "target": "REV_ITM_06",
          "anchor": {
            "h": 40.84375,
            "w": 100.4375,
            "x": 642.0625,
            "y": 239.296875
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_ITM_06",
      "title": "문항 수정 · OMR 수정",
      "menu": "문항 관리 · 전체 문항",
      "kind": "tab-page-with-compact-type-panels",
      "mergedScreens": [
        "MST_ITM_07",
        "MST_ITM_07_PREVIEW"
      ],
      "screenshot": "design-specs/revision-captures/item-omr.png",
      "html": "cms-knowledge/master-cms/sources/item-edit.html",
      "notes": [
        {
          "key": "01",
          "label": "OMR 수정 영역",
          "body": "OMR 수정 탭에서 문항 형태의 세 단계 선택과 이미지 업로드를 제공합니다. 좌측에는 현재 문항 뷰어를, 우측에는 유형에 맞는 정답 설정 폼을 표시합니다. 저장·취소는 문항 수정의 공통 확인 절차를 따릅니다.",
          "sourceStates": [],
          "anchor": {
            "h": 40.84375,
            "w": 100.4375,
            "x": 642.0625,
            "y": 239.296875
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "객관식 유형",
          "body": "OBSACN·OBSAOX·OBMACN·OBMAOX는 단답/다답과 N지/OX 구성을 구분합니다. 유형에 따라 선택지·정답 세트·쉼표 구분 설정이 달라집니다. 서로 다른 답형에 같은 정답 개수나 검증 규칙을 일괄 적용하지 않습니다.",
          "sourceStates": [
            "MST_ITM_07_01",
            "MST_ITM_07_02",
            "MST_ITM_07_03",
            "MST_ITM_07_04"
          ],
          "anchor": {
            "h": 65,
            "w": 472.328125,
            "x": 294,
            "y": 301.140625
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "주관식 유형",
          "body": "SBSANM·SBSADR·SBSAAS·SBMANM·SBMAAS·SBMALD·SBMADD는 일반형·그리기·영역 선택·선 연결·드래그 구성을 제공합니다. 대소·공백·쉼표 구분과 순서 설정은 해당 정답 트리 수준에 적용됩니다. 저장된 value_type에 따라 수식/텍스트 위젯을 구분하며 유형 변경 시 이전 값의 보존을 가정하지 않습니다.",
          "sourceStates": [
            "MST_ITM_07_05",
            "MST_ITM_07_06",
            "MST_ITM_07_07",
            "MST_ITM_07_08",
            "MST_ITM_07_09",
            "MST_ITM_07_10",
            "MST_ITM_07_11"
          ],
          "anchor": {
            "x": 314,
            "y": 371.14,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "서술형 유형",
          "body": "ESBA00·ESSA00·ESMA00은 기본·단답·다답 서술형 구성을 제공합니다. 수동채점 MANUAL/COMMENT 블록과 자동 정답 VALUE 블록은 구분합니다. 답안 입력과 범례·블록 순서는 해당 유형의 저장 구조를 따릅니다.",
          "sourceStates": [
            "MST_ITM_07_12",
            "MST_ITM_07_13",
            "MST_ITM_07_14"
          ],
          "anchor": {
            "x": 596,
            "y": 371.14,
            "w": 20,
            "h": 20
          },
          "number": 4
        },
        {
          "key": "05",
          "label": "경계·오류·값 형식",
          "body": "OBSACN은 선택지2~7개와 단답 정답1개를 사용합니다. 정답 미선택·중복·빈 값 오류로 미리보기를 차단한 사례를 확인했으며 다른 유형의 검증은 별도 규칙을 따릅니다. 값 형식 메뉴와 수식 입력은 해당 셀에서 사용할 수 있는 형식에 따라 제공합니다.",
          "sourceStates": [
            "MST_ITM_07_PREVIEW_01",
            "MST_ITM_07_PREVIEW_02",
            "MST_ITM_07_PREVIEW_04"
          ],
          "anchor": {
            "x": 1630,
            "y": 585,
            "w": 20,
            "h": 20
          },
          "number": 5
        },
        {
          "key": "06",
          "label": "OMR 미리보기",
          "body": "OMR 미리보기에서 유형별 학생 응답과 채점·정답 표시를 확인합니다. 그리기·영역 선택·선 연결·드래그는 각 유형이 제공하는 응답 방식으로 조작합니다.\n현재 OMR 구성으로 응답하고 정답·오답 결과와 정답 보기를 확인합니다. 그리기·영역·선·드래그 응답은 유형별 입력과 저장된 정답 구조를 따릅니다. 확인한 CMS 미리보기 결과는 실제 서비스 채점의 검증과 구분합니다.",
          "sourceStates": [
            "MST_ITM_07_PREVIEW_03",
            "MST_ITM_07_PREVIEW_05"
          ],
          "anchor": {
            "x": 1605.156,
            "y": 484.14,
            "w": 20,
            "h": 20
          },
          "number": 6
        }
      ],
      "modals": [
        {
          "id": "REV_ITM_OMR_PREVIEW",
          "title": "OMR 미리보기",
          "triggerKey": "06",
          "fields": [
            "유형별 학생 응답",
            "채점 결과",
            "정답 보기 상태"
          ],
          "buttons": [
            "닫기"
          ],
          "body": "현재 OMR 구성으로 응답하고 정답·오답 결과와 정답 보기를 확인합니다. 그리기·영역·선·드래그 응답은 유형별 입력과 저장된 정답 구조를 따릅니다. 확인한 CMS 미리보기 결과는 실제 서비스 채점의 검증과 구분합니다.",
          "sourceStates": [
            "MST_ITM_07_PREVIEW_03",
            "MST_ITM_07_PREVIEW_05"
          ],
          "anchor": {
            "h": 32,
            "w": 121.828125,
            "x": 1605.15625,
            "y": 484.140625
          },
          "noteNumber": 6,
          "message": "",
          "actual": {
            "image": {
              "key": "27a8af297d61459a22c425731762974db456fbce6d9908cc9fa32d6d154c85f4",
              "width": 1785,
              "height": 1352,
              "path": "design-specs/revision-captures/modal-omr-preview.png"
            },
            "crop": {
              "h": 952,
              "w": 524,
              "x": 630.5,
              "y": 120
            },
            "controls": [
              {
                "box": {
                  "h": 32,
                  "w": 32,
                  "x": 16,
                  "y": 12
                },
                "href": null,
                "id": "sidebarToggle",
                "name": null,
                "tag": "BUTTON",
                "text": "메뉴",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 192.65625,
                  "x": 52,
                  "y": 18
                },
                "href": "/main.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문제은행 마스터 CMS",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 72
                },
                "href": "/main.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "홈",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 116
                },
                "href": "#menu-ITEM",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문항 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 160
                },
                "href": "/item/all/list.donga?unitCurriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "전체 문항",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 196
                },
                "href": "/item/hml/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "HML 문항 등록",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 232
                },
                "href": "/item/difi/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "디피니션 문항 등록",
                "type": ""
              },
              {
                "box": {
                  "h": 36,
                  "w": 240,
                  "x": 8,
                  "y": 268
                },
                "href": "/item/twin/list.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "쌍둥이 그룹 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 304
                },
                "href": "/paper/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "평가지 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 348
                },
                "href": "/product/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문항 출처 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 392
                },
                "href": "/lab/index.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "랩",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 108,
                  "x": 1661,
                  "y": 8
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "로그아웃",
                "type": "button"
              },
              {
                "box": {
                  "h": 28,
                  "w": 1497,
                  "x": 272,
                  "y": 105.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H2",
                "text": "문항 수정"
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 127.625,
                  "x": 272,
                  "y": 239.296875
                },
                "href": "#tabMeta",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "메타정보 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 139.328125,
                  "x": 398.625,
                  "y": 239.296875
                },
                "href": "#tabHml",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "한글(HML) 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 106.109375,
                  "x": 536.953125,
                  "y": 239.296875
                },
                "href": "#tabItem",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "HTML 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40.84375,
                  "w": 100.4375,
                  "x": 642.0625,
                  "y": 239.296875
                },
                "href": "#tabOmr",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "OMR 수정",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1501.15625,
                  "y": 231.140625
                },
                "href": "/item/all/detail.donga?itemId=2089239",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "취소",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1571.15625,
                  "y": 231.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "임시 저장",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1674.078125,
                  "y": 231.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "전체 반영",
                "type": "button"
              },
              {
                "box": {
                  "h": 65,
                  "w": 472.328125,
                  "x": 294,
                  "y": 301.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "문항 형태 *"
              },
              {
                "box": {
                  "h": 24,
                  "w": 102.546875,
                  "x": 314,
                  "y": 321.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "문항 형태 *"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.765625,
                  "x": 314,
                  "y": 386.140625
                },
                "href": null,
                "id": "qtCategory",
                "name": null,
                "tag": "SELECT",
                "text": "객관식\n주관식\n서술형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.78125,
                  "x": 460.765625,
                  "y": 386.140625
                },
                "href": null,
                "id": "qtAnswer",
                "name": null,
                "tag": "SELECT",
                "text": "단답형\n다답형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.78125,
                  "x": 607.546875,
                  "y": 386.140625
                },
                "href": null,
                "id": "qtType",
                "name": null,
                "tag": "SELECT",
                "text": "N지 선다\nO/X 형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 65,
                  "w": 962.65625,
                  "x": 784.328125,
                  "y": 301.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "이미지 업로드\n업로드"
              },
              {
                "box": {
                  "h": 24,
                  "w": 121.625,
                  "x": 804.328125,
                  "y": 321.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "이미지 업로드"
              },
              {
                "box": {
                  "h": 32,
                  "w": 78,
                  "x": 1656.984375,
                  "y": 317.140625
                },
                "href": null,
                "id": "imageUploadBtn",
                "name": null,
                "tag": "BUTTON",
                "text": "업로드",
                "type": "button"
              },
              {
                "box": {
                  "h": 65,
                  "w": 472.328125,
                  "x": 294,
                  "y": 464.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "문항 2089239"
              },
              {
                "box": {
                  "h": 24,
                  "w": 123.3125,
                  "x": 314,
                  "y": 484.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "문항 2089239"
              },
              {
                "box": {
                  "h": 24,
                  "w": 392.328125,
                  "x": 334,
                  "y": 947.296875
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "정답"
              },
              {
                "box": {
                  "h": 24,
                  "w": 392.328125,
                  "x": 334,
                  "y": 1022.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "풀이"
              },
              {
                "box": {
                  "h": 73,
                  "w": 962.65625,
                  "x": 784.328125,
                  "y": 464.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "OMR 편집 (정답 설정)\nOMR 미리보기"
              },
              {
                "box": {
                  "h": 24,
                  "w": 182.640625,
                  "x": 804.328125,
                  "y": 488.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "OMR 편집 (정답 설정)"
              },
              {
                "box": {
                  "h": 32,
                  "w": 121.828125,
                  "x": 1605.15625,
                  "y": 484.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "OMR 미리보기",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 575.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 557.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 565.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 569.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 639.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 621.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 629.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 633.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 703.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 685.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 693.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 697.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 767.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 749.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 757.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 761.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 804.328125,
                  "y": 831.140625
                },
                "href": null,
                "id": "",
                "name": "live-OBSACN_ans",
                "tag": "INPUT",
                "text": "on",
                "type": "radio"
              },
              {
                "box": {
                  "h": 56,
                  "w": 741.65625,
                  "x": 832.328125,
                  "y": 813.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택지",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1628.984375,
                  "y": 821.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 50,
                  "x": 1676.984375,
                  "y": 825.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "삭제",
                "type": "button"
              },
              {
                "box": {
                  "h": 32,
                  "w": 94.21875,
                  "x": 804.328125,
                  "y": 877.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "정답 추가",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1501.15625,
                  "y": 1312.390625
                },
                "href": "/item/all/detail.donga?itemId=2089239",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "취소",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1571.15625,
                  "y": 1312.390625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "임시 저장",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 94.921875,
                  "x": 1674.078125,
                  "y": 1312.390625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "전체 반영",
                "type": "button"
              },
              {
                "box": {
                  "h": 22.84375,
                  "w": 127.9375,
                  "x": 655.5,
                  "y": 137.078125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H5",
                "text": "OMR 미리보기"
              },
              {
                "box": {
                  "h": 56,
                  "w": 56,
                  "x": 1097.5,
                  "y": 121
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "닫기",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1067.5,
                  "y": 556
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "닫기",
                "type": "button"
              }
            ]
          },
          "noteKey": "06"
        }
      ],
      "page": "01 문항 관리 · 전체 문항",
      "order": 6,
      "preserve": false,
      "image": {
        "key": "2b8486ca41348a2a66ae9d11364c2c98b2a6af563cac90eb66ceafce1e998bfa",
        "width": 1785,
        "height": 1352,
        "path": "design-specs/revision-captures/item-omr.png"
      },
      "geometry": "revision-captures/item-omr.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "메타정보 수정",
          "target": "REV_ITM_03",
          "anchor": {
            "h": 40.84375,
            "w": 127.625,
            "x": 272,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "한글(HML) 수정",
          "target": "REV_ITM_04",
          "anchor": {
            "h": 40.84375,
            "w": 139.328125,
            "x": 398.625,
            "y": 239.296875
          },
          "action": "클릭"
        },
        {
          "label": "HTML 수정",
          "target": "REV_ITM_05",
          "anchor": {
            "h": 40.84375,
            "w": 106.109375,
            "x": 536.953125,
            "y": 239.296875
          },
          "action": "클릭"
        }
      ],
      "variants": [
        {
          "code": "OBSACN",
          "title": "객관식 단답형 N지 선다 · OBSACN",
          "capture": "gallery-OBSACN",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 467
          },
          "image": {
            "key": "7966330cc516a119329f73705f0c59633b4c7cbdd9f034be6e0663bd9517d19f",
            "width": 1217,
            "height": 467,
            "path": "design-specs/revision-captures/gallery-OBSACN.png"
          }
        },
        {
          "code": "OBSAOX",
          "title": "객관식 단답형 O/X · OBSAOX",
          "capture": "gallery-OBSAOX",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 235
          },
          "image": {
            "key": "2c43b491a885e3e03d47e7fe8e90c83573a38e0aafc8ab4a2e08dc1a32e9fe78",
            "width": 1217,
            "height": 235,
            "path": "design-specs/revision-captures/gallery-OBSAOX.png"
          }
        },
        {
          "code": "OBMACN",
          "title": "객관식 다답형 N지 선다 · OBMACN",
          "capture": "gallery-OBMACN",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 467
          },
          "image": {
            "key": "6e8c2cb8aa87f5f5154d25fdd0a344e9b7c90ca4ddb70bd897bfb110c790aed0",
            "width": 1217,
            "height": 467,
            "path": "design-specs/revision-captures/gallery-OBMACN.png"
          }
        },
        {
          "code": "OBMAOX",
          "title": "객관식 다답형 O/X · OBMAOX",
          "capture": "gallery-OBMAOX",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 447
          },
          "image": {
            "key": "9337a3381657a0fbd7374536a66cd2b9edaf60151a7764de16ba10d30940a8ad",
            "width": 1217,
            "height": 447,
            "path": "design-specs/revision-captures/gallery-OBMAOX.png"
          }
        },
        {
          "code": "SBSANM",
          "title": "주관식 단답형 일반형 · SBSANM",
          "capture": "gallery-SBSANM",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 339
          },
          "image": {
            "key": "a4e5e96d794c45ee2f6ece24be9d05f19ed47acf5c8ba4fddedb901d5c46f91f",
            "width": 1217,
            "height": 339,
            "path": "design-specs/revision-captures/gallery-SBSANM.png"
          }
        },
        {
          "code": "SBSADR",
          "title": "주관식 단답형 그리기형 · SBSADR",
          "capture": "gallery-SBSADR",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 263
          },
          "image": {
            "key": "bd673c3acf1c865aa69bbe274118ba73717bf405e0f245d4e30d896b0cc6f668",
            "width": 1217,
            "height": 263,
            "path": "design-specs/revision-captures/gallery-SBSADR.png"
          }
        },
        {
          "code": "SBSAAS",
          "title": "주관식 단답형 영역 선택형 · SBSAAS",
          "capture": "gallery-SBSAAS",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 383
          },
          "image": {
            "key": "b5c2ed953ba317c2f68f129f216b7ebcf5eaf30eb08436725886bd42aa93eeff",
            "width": 1217,
            "height": 383,
            "path": "design-specs/revision-captures/gallery-SBSAAS.png"
          }
        },
        {
          "code": "SBMANM",
          "title": "주관식 다답형 일반형 · SBMANM",
          "capture": "gallery-SBMANM",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 555
          },
          "image": {
            "key": "b242ee401d23c261fca7520de596989d65ec062bb978b80b7ac396aabaa61674",
            "width": 1217,
            "height": 555,
            "path": "design-specs/revision-captures/gallery-SBMANM.png"
          }
        },
        {
          "code": "SBMAAS",
          "title": "주관식 다답형 영역 선택형 · SBMAAS",
          "capture": "gallery-SBMAAS",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 497
          },
          "image": {
            "key": "29e272a4bae147df6d19d60cfc16c09fc8a4cf6fe4c3e972851bca5fcd0b1e02",
            "width": 1217,
            "height": 497,
            "path": "design-specs/revision-captures/gallery-SBMAAS.png"
          }
        },
        {
          "code": "SBMALD",
          "title": "주관식 다답형 선그리기형 · SBMALD",
          "capture": "gallery-SBMALD",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 597
          },
          "image": {
            "key": "dc71a7a1145e034798496714039df0b39f1c122fa04b96a1aaf0730bb85cd013",
            "width": 1217,
            "height": 597,
            "path": "design-specs/revision-captures/gallery-SBMALD.png"
          }
        },
        {
          "code": "SBMADD",
          "title": "주관식 다답형 드래그앤드롭형 · SBMADD",
          "capture": "gallery-SBMADD",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 597
          },
          "image": {
            "key": "4f38bd79ff627f4d4190ecf38cf22bdd588fdd901ba769441d58a78d184467cb",
            "width": 1217,
            "height": 597,
            "path": "design-specs/revision-captures/gallery-SBMADD.png"
          }
        },
        {
          "code": "ESBA00",
          "title": "기본 서술형 · ESBA00",
          "capture": "gallery-ESBA00",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 255
          },
          "image": {
            "key": "67128e1b894f0a996f9054fe096a6eff40aeb5ba45775f9fee69f13a69cd1dcf",
            "width": 1217,
            "height": 255,
            "path": "design-specs/revision-captures/gallery-ESBA00.png"
          }
        },
        {
          "code": "ESSA00",
          "title": "단답 서술형 · ESSA00",
          "capture": "gallery-ESSA00",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 607
          },
          "image": {
            "key": "537d612da1777730eb311f651be08a9963b1596697c48811dcf67fae8a45cc67",
            "width": 1217,
            "height": 607,
            "path": "design-specs/revision-captures/gallery-ESSA00.png"
          }
        },
        {
          "code": "ESMA00",
          "title": "다답 서술형 · ESMA00",
          "capture": "gallery-ESMA00",
          "crop": {
            "x": 0,
            "y": 0,
            "w": 1217,
            "h": 883
          },
          "image": {
            "key": "07c19d1b7d79bd3e2ed4ec2fa5cfeba03d3bea2a578823ba2f21e95c69614f83",
            "width": 1217,
            "height": 883,
            "path": "design-specs/revision-captures/gallery-ESMA00.png"
          }
        }
      ]
    },
    {
      "id": "REV_ITM_07",
      "title": "별도 한글(HML) 편집기",
      "menu": "문항 관리 · 전체 문항",
      "kind": "external-editor-window-with-slot-variants",
      "mergedScreens": [
        "MST_ITM_08"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/3218-own-copy239-explanation-popup-initial-state-visual.png",
      "html": "cms-knowledge/master-cms/sources/hml-editor.html",
      "notes": [
        {
          "key": "01",
          "label": "별도 창과 문서 전환",
          "body": "별도 한글 편집창에서 지문 수정·지문해석 수정·문제 수정·해답 수정을 선택합니다. 각 버튼은 해당 문서를 열고 공통 저장 버튼으로 편집 결과를 저장합니다. 미저장 문제에서 해답으로 전환했다가 돌아올 때 경고 없이 입력이 사라진 사례를 확인했습니다.",
          "sourceStates": [
            "MST_ITM_08_02"
          ],
          "anchor": {
            "x": 195,
            "y": 20,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "공유 지문과 지문해석",
          "body": "세트의 지문은 같은 논리 세트가 공유하는 문서를 편집합니다. 원본 세트의 공유 변경과 COPY 세트의 별도 지문·파일 격리 결과를 구분합니다. 지문해석 파일이 없는 표본은 확인했으나 파일이 연결된 정상 편집·저장은 검증하지 못했습니다.",
          "sourceStates": [
            "MST_ITM_08_03",
            "MST_ITM_08_04"
          ],
          "anchor": {
            "x": 45,
            "y": 20,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "편집기 저장과 CMS 반영",
          "body": "편집기의 저장은 임시 HML·이미지 결과를 만들고 CMS에 반영 대기로 전달합니다. 확정 문항에 반영하려면 CMS의 임시 저장 또는 전체 반영을 이어서 실행해야 합니다.\n편집기 저장 후 ‘CMS 에서 ‘임시 저장’ 또는 ‘전체 반영’ 버튼을 눌러주세요’를 안내합니다. 확인을 누른 뒤 CMS에서 필요한 저장 절차를 진행합니다. 편집기 저장과 CMS의 최종 반영은 서로 다른 단계입니다.",
          "sourceStates": [
            "MST_ITM_08_05"
          ],
          "anchor": {
            "x": 378,
            "y": 20,
            "w": 20,
            "h": 20
          },
          "number": 3
        }
      ],
      "modals": [
        {
          "id": "REV_HML_SAVED",
          "title": "한글 편집",
          "triggerKey": "03",
          "fields": [],
          "buttons": [
            "닫기",
            "확인"
          ],
          "body": "편집기 저장 후 ‘CMS 에서 ‘임시 저장’ 또는 ‘전체 반영’ 버튼을 눌러주세요’를 안내합니다. 확인을 누른 뒤 CMS에서 필요한 저장 절차를 진행합니다. 편집기 저장과 CMS의 최종 반영은 서로 다른 단계입니다.",
          "sourceStates": [
            "MST_ITM_08_05"
          ],
          "anchor": {
            "x": 378,
            "y": 20,
            "w": 20,
            "h": 20
          },
          "noteNumber": 3,
          "message": "CMS 에서 ‘임시 저장",
          "noteKey": "03"
        }
      ],
      "page": "01 문항 관리 · 전체 문항",
      "order": 7,
      "preserve": false,
      "image": {
        "key": "e652f6df7a969d3eab4a2f6337b33df1fda57e57dfa055a8fcc61ccfc92586bd",
        "width": 1290,
        "height": 875,
        "path": "cms-knowledge/master-cms/evidence/3218-own-copy239-explanation-popup-initial-state-visual.png"
      },
      "captureLabel": "기존 편집기 전체 창 캡처",
      "flows": [
        {
          "label": "저장",
          "target": "REV_ITM_04",
          "anchor": {
            "x": 378,
            "y": 20,
            "w": 20,
            "h": 20
          },
          "action": "편집기 저장 후 부모 HML 탭에서 반영"
        }
      ]
    },
    {
      "id": "REV_LAB_01",
      "title": "랩 목차·관리자 도구",
      "menu": "랩",
      "kind": "base-page-with-three-admin-modals",
      "mergedScreens": [
        "MST_LAB_01",
        "MST_LAB_02",
        "MST_LAB_03",
        "MST_LAB_04"
      ],
      "screenshot": "design-specs/revision-captures/lab-index.png",
      "html": "cms-knowledge/master-cms/sources/lab-index-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "랩 목적과 배포 정보",
          "body": "랩은 개발·운영 보조 도구를 제공합니다. 배포 정보에는 서버 시작과 빌드 시각을 표시합니다. 현재 계정의 관리자 도구 노출은 확인했으나 다른 역할의 접근과 서버 권한은 검증하지 않았습니다.",
          "sourceStates": [
            "MST_LAB_01_01"
          ],
          "anchor": {
            "x": 293,
            "y": 173,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "데모 선택",
          "body": "수식 입력기 데모·OMR 전체 유형·OMR 복원 테스트·편집기 격리 테스트의 네 링크를 제공합니다. 값 유형과 드롭다운 테스트는 OMR 전체 유형 페이지의 하단에서 이용합니다.",
          "sourceStates": [],
          "anchor": {
            "x": 293,
            "y": 590,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "REV_LAB_BUNDLE",
          "label": "외부 번들 버전",
          "body": "캐시 reload·외부 번들 버전·역할별 로그아웃을 각각 별도 창에서 확인합니다. 캐시 대상과 역할 선택·취소는 확인했으나 실제 캐시 변경과 타인 세션 종료는 실행하지 않았습니다.\n처음 열 때 문항 뷰어와 편집기 번들을 불러와 버전을 표시합니다. 확인 당시 버전은 viewer1.13.6과 editor0.3.10이며, 로드 중·버전 미제공·로드 실패를 구분합니다. 같은 페이지에서 다시 열어도 자동으로 재요청하지 않습니다.",
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 359
          },
          "sourceStates": [
            "MST_LAB_02_01",
            "MST_LAB_02_02"
          ],
          "number": 3
        },
        {
          "key": "REV_LAB_CACHE",
          "label": "캐시 reload",
          "body": "전체·공통코드·단원·사이트 중 대상을 선택하며 미선택에서는 reload가 비활성화됩니다. 전체는 한 번의 전체 요청을, 개별 선택은 각 대상의 요청을 실행하도록 구성돼 있습니다. 모든 서버에 적용된다는 안내가 있으나 실제 reload와 성공·실패 결과는 실행 검증하지 않았습니다.",
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 288.5
          },
          "sourceStates": [
            "MST_LAB_03_01",
            "MST_LAB_03_02"
          ],
          "number": 4
        },
        {
          "key": "REV_LAB_SESSION",
          "label": "역할별 로그아웃",
          "body": "MASTER와 DOUCLASS의 관리자·사용자 중 세션 종료 대상을 선택합니다. 선택한 사이트의 세션만 종료하고 본인은 제외한다는 안내를 표시합니다. 선택·취소만 확인했으며 실제 종료·본인 제외·성공과 실패의 결과는 실행 검증하지 않았습니다.",
          "anchor": {
            "h": 69.5,
            "w": 1495,
            "x": 273,
            "y": 429.5
          },
          "sourceStates": [
            "MST_LAB_04_01",
            "MST_LAB_04_02"
          ],
          "number": 5
        }
      ],
      "modals": [
        {
          "id": "REV_LAB_BUNDLE",
          "title": "외부 번들 버전",
          "triggerKey": "03",
          "fields": [
            "번들",
            "버전",
            "donga-question-viewer",
            "donga-question-editor"
          ],
          "buttons": [
            "닫기"
          ],
          "body": "처음 열 때 문항 뷰어와 편집기 번들을 불러와 버전을 표시합니다. 확인 당시 버전은 viewer1.13.6과 editor0.3.10이며, 로드 중·버전 미제공·로드 실패를 구분합니다. 같은 페이지에서 다시 열어도 자동으로 재요청하지 않습니다.",
          "sourceStates": [
            "MST_LAB_02_01",
            "MST_LAB_02_02"
          ],
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 359
          },
          "noteNumber": 3,
          "message": "불러오기 실패",
          "noteKey": "REV_LAB_BUNDLE"
        },
        {
          "id": "REV_LAB_CACHE",
          "title": "캐시 reload",
          "triggerKey": "03",
          "fields": [
            "전체",
            "공통코드",
            "단원",
            "사이트"
          ],
          "buttons": [
            "닫기",
            "취소",
            "reload"
          ],
          "body": "전체·공통코드·단원·사이트 중 대상을 선택하며 미선택에서는 reload가 비활성화됩니다. 전체는 한 번의 전체 요청을, 개별 선택은 각 대상의 요청을 실행하도록 구성돼 있습니다. 모든 서버에 적용된다는 안내가 있으나 실제 reload와 성공·실패 결과는 실행 검증하지 않았습니다.",
          "sourceStates": [
            "MST_LAB_03_01",
            "MST_LAB_03_02"
          ],
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 288.5
          },
          "noteNumber": 4,
          "message": "다시 읽을 캐시를 고르세요.",
          "noteKey": "REV_LAB_CACHE"
        },
        {
          "id": "REV_LAB_SESSION",
          "title": "역할별 로그아웃",
          "triggerKey": "03",
          "fields": [
            "전체",
            "[MASTER] 관리자 (ADMIN)",
            "[MASTER] 사용자 (USER)",
            "[DOUCLASS] 관리자 (ADMIN)",
            "[DOUCLASS] 사용자 (USER)"
          ],
          "buttons": [
            "닫기",
            "취소",
            "로그아웃"
          ],
          "body": "MASTER와 DOUCLASS의 관리자·사용자 중 세션 종료 대상을 선택합니다. 선택한 사이트의 세션만 종료하고 본인은 제외한다는 안내를 표시합니다. 선택·취소만 확인했으며 실제 종료·본인 제외·성공과 실패의 결과는 실행 검증하지 않았습니다.",
          "sourceStates": [
            "MST_LAB_04_01",
            "MST_LAB_04_02"
          ],
          "anchor": {
            "h": 69.5,
            "w": 1495,
            "x": 273,
            "y": 429.5
          },
          "noteNumber": 5,
          "message": "로그아웃할 사이트 · 역할을 고르세요.",
          "noteKey": "REV_LAB_SESSION"
        }
      ],
      "page": "07 랩",
      "order": 8,
      "preserve": false,
      "image": {
        "key": "c56e20e1c08ab6d9fb9aa87728f06c9d363b2253cdb01c11e60733ad9dd5ab79",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/lab-index.png"
      },
      "geometry": "revision-captures/lab-index.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "수식 입력기 데모",
          "target": "REV_LAB_02",
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 582
          },
          "action": "클릭"
        },
        {
          "label": "OMR 전체 유형",
          "target": "REV_LAB_03",
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 652.5
          },
          "action": "클릭"
        },
        {
          "label": "OMR 복원 테스트",
          "target": "REV_LAB_04",
          "anchor": {
            "h": 70.5,
            "w": 1495,
            "x": 273,
            "y": 723
          },
          "action": "클릭"
        },
        {
          "label": "편집기 격리 테스트",
          "target": "REV_LAB_05",
          "anchor": {
            "h": 69.5,
            "w": 1495,
            "x": 273,
            "y": 793.5
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_LAB_02",
      "title": "수식 입력기 데모",
      "menu": "랩",
      "kind": "base-page-with-math-dialog-variants",
      "mergedScreens": [
        "MST_LAB_10",
        "MST_LAB_11",
        "MST_LAB_12"
      ],
      "screenshot": "design-specs/revision-captures/lab-math.png",
      "html": "cms-knowledge/master-cms/sources/lab-math-demo-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "데모 영역과 본문 편집",
          "body": "하이브리드 에디터·단독 답안·KaTeX 렌더·문제 데이터 변환의 네 영역을 제공합니다. 본문 툴바에는 굵게·기울임·수식·블록 수식이 있습니다. 인라인 삽입·기존 수식 수정·여러 줄 입력에 따른 HTML과 렌더 변화를 확인할 수 있습니다.",
          "sourceStates": [
            "MST_LAB_10_01",
            "MST_LAB_10_02"
          ],
          "anchor": {
            "x": 606,
            "y": 200,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "답안·빈 값·블록 출력",
          "body": "단독 답안은 placeholder·수식 필드·Σ·LaTeX 출력과 렌더를 제공합니다. 빈 값 적용은 단독 답안을 지우지만 본문 수식 추가에서는 노드를 만들지 않습니다. 블록9를 적용했을 때 편집기와 저장 HTML에 수식 하나가 생성된 것을 확인했습니다.",
          "sourceStates": [
            "MST_LAB_10_03",
            "MST_LAB_11_01"
          ],
          "anchor": {
            "x": 606,
            "y": 720,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "변환과 역변환 비교",
          "body": "문제·정답·해설 블록을 선택해 변환 + 로드하면 원본·입력 HTML·편집 출력 HTML·역변환 text를 비교할 수 있습니다. 확인한 표본에서 문제는 줄바꿈 차이, 해설은 공백 차이가 있었고 정답은 문자열이 같았습니다. 일부 상대 이미지 경로의 로드 실패를 확인했으며 저장될 HTML 출력은 CMS 서버 저장을 뜻하지 않습니다.",
          "sourceStates": [
            "MST_LAB_12_01",
            "MST_LAB_12_02"
          ],
          "anchor": {
            "h": 34,
            "w": 109.921875,
            "x": 720.484375,
            "y": 1237.265625
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "수식입력기 열기",
          "body": "Σ 또는 수식·블록 수식 버튼으로 수식입력기를 엽니다. 키보드·손글씨 탭을 전환하고 행렬 선택 하위창을 이용할 수 있습니다.",
          "sourceStates": [],
          "anchor": {
            "x": 800,
            "y": 820,
            "w": 20,
            "h": 20
          },
          "number": 4
        },
        {
          "key": "REV_LAB_MATH",
          "label": "수식입력기",
          "body": "입력한 수식은 적용할 때 대상 필드나 본문에 반영합니다. 취소·Escape·배경 클릭은 적용 전 값을 유지하고, 다시 열면 현재 대상 값에서 시작합니다. 단독 답안의 빈 값 적용과 본문 새 수식의 빈 값 적용은 결과가 다릅니다.\n손글씨 탭에서 획을 그리고 한 획 지우기·전체 지우기·인식하기를 사용합니다. 빈 캔버스에서는 세 동작이 비활성화되고 획을 그리면 활성화됩니다. 인식 실패 안내와 기존 답 보존은 확인했으나 정상 인식과 실패 원인은 검증하지 못했습니다.",
          "anchor": {
            "x": 800,
            "y": 820,
            "w": 20,
            "h": 20
          },
          "sourceStates": [
            "MST_LAB_11_02",
            "MST_LAB_11_03",
            "MST_LAB_11_05",
            "MST_LAB_11_06"
          ],
          "number": 5
        },
        {
          "key": "REV_LAB_MATRIX",
          "label": "행렬 선택",
          "body": "행과 열을 선택하고 추가하면 상위 수식입력기에 placeholder 행렬을 삽입합니다. 3행2열 삽입을 확인했으며 상위 입력을 적용하기 전에는 원래 답안이 유지됩니다.",
          "anchor": {
            "x": 800,
            "y": 820,
            "w": 20,
            "h": 20
          },
          "sourceStates": [
            "MST_LAB_11_04"
          ],
          "number": 6
        }
      ],
      "modals": [
        {
          "id": "REV_LAB_MATH",
          "title": "수식입력기",
          "triggerKey": "04",
          "fields": [
            "키보드",
            "손글씨",
            "수식 입력",
            "숫자·연산·기호",
            "알파벳·그리스 문자",
            "손글씨 캔버스",
            "인식 결과",
            "오류 안내"
          ],
          "buttons": [
            "닫기",
            "취소",
            "적용",
            "한 획 지우기",
            "전체 지우기",
            "인식하기"
          ],
          "body": "입력한 수식은 적용할 때 대상 필드나 본문에 반영합니다. 취소·Escape·배경 클릭은 적용 전 값을 유지하고, 다시 열면 현재 대상 값에서 시작합니다. 단독 답안의 빈 값 적용과 본문 새 수식의 빈 값 적용은 결과가 다릅니다.\n손글씨 탭에서 획을 그리고 한 획 지우기·전체 지우기·인식하기를 사용합니다. 빈 캔버스에서는 세 동작이 비활성화되고 획을 그리면 활성화됩니다. 인식 실패 안내와 기존 답 보존은 확인했으나 정상 인식과 실패 원인은 검증하지 못했습니다.",
          "sourceStates": [
            "MST_LAB_11_02",
            "MST_LAB_11_03",
            "MST_LAB_11_05",
            "MST_LAB_11_06"
          ],
          "anchor": {
            "x": 800,
            "y": 820,
            "w": 20,
            "h": 20
          },
          "noteNumber": 5,
          "message": "",
          "noteKey": "REV_LAB_MATH"
        },
        {
          "id": "REV_LAB_MATRIX",
          "title": "행렬 선택",
          "triggerKey": "04",
          "fields": [
            "행",
            "열"
          ],
          "buttons": [
            "닫기",
            "추가"
          ],
          "body": "행과 열을 선택하고 추가하면 상위 수식입력기에 placeholder 행렬을 삽입합니다. 3행2열 삽입을 확인했으며 상위 입력을 적용하기 전에는 원래 답안이 유지됩니다.",
          "sourceStates": [
            "MST_LAB_11_04"
          ],
          "anchor": {
            "x": 800,
            "y": 820,
            "w": 20,
            "h": 20
          },
          "noteNumber": 6,
          "message": "",
          "noteKey": "REV_LAB_MATRIX"
        }
      ],
      "page": "07 랩",
      "order": 9,
      "preserve": false,
      "image": {
        "key": "84244e16d6455cc97c0c2eeb95476c491f45aebdebf15de2e9527e3d06534919",
        "width": 1785,
        "height": 2133,
        "path": "design-specs/revision-captures/lab-math.png"
      },
      "geometry": "revision-captures/lab-math.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": []
    },
    {
      "id": "REV_LAB_03",
      "title": "OMR 전체 유형 갤러리",
      "menu": "랩",
      "kind": "base-page-with-component-panels",
      "mergedScreens": [
        "MST_LAB_06",
        "MST_LAB_08",
        "MST_LAB_09"
      ],
      "screenshot": "design-specs/revision-captures/lab-omr.png",
      "html": "cms-knowledge/master-cms/sources/lab-omr-gallery-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "유형 갤러리 열기·닫기",
          "body": "객관식·주관식·서술형으로 분류한14유형을 아코디언으로 제공합니다. 전체 또는 분류별로 열기·닫기를 실행할 수 있습니다. 코드 복사 제어는 아코디언 전환과 분리되며 클립보드 복사의 성공 여부는 실행 검증하지 않았습니다.",
          "sourceStates": [
            "MST_LAB_06_01"
          ],
          "anchor": {
            "x": 293,
            "y": 160,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "보기 방식과 잠긴 비교 폼",
          "body": "좁게·넓게·비활성화 보기 방식을 선택합니다. 비활성화에서는 왼쪽 편집 값으로 복원한 잠긴 비교 폼을 오른쪽에 표시하며 왼쪽은 편집할 수 있습니다. 값과 정답 변경의 동기화를 확인했고, 복원에 실패한 중간 값은 직전 비교 표시를 유지하도록 구성돼 있습니다.",
          "sourceStates": [
            "MST_LAB_06_02",
            "MST_LAB_06_03"
          ],
          "anchor": {
            "x": 1600,
            "y": 160,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "JSON·검증·미리보기",
          "body": "각 유형에서 JSON 모니터·초기화·유효성 검사·JSON 복사·OMR 미리보기를 제공합니다. 직렬화와 복원 결과를 확인할 수 있으나 이것만으로 외부 서비스의 실제 채점까지 검증되는 것은 아닙니다.",
          "sourceStates": [
            "MST_LAB_06_04"
          ],
          "anchor": {
            "x": 760,
            "y": 300,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "수식·값 유형 테스트",
          "body": "수식 입력과 LaTeX·렌더 출력, 세 가지 허용 범위의 값 유형 입력을 제공합니다. 허용하지 않는 형식은 메뉴에 표시하되 비활성화하고, 형식을 전환하면 이전 값을 버립니다. 이미지는 URL로 입력하며 각 셀의 value와 value_type을 확인할 수 있습니다.",
          "sourceStates": [
            "MST_LAB_08_01",
            "MST_LAB_08_02",
            "MST_LAB_08_03"
          ],
          "anchor": {
            "x": 293,
            "y": 2400,
            "w": 20,
            "h": 20
          },
          "number": 4
        },
        {
          "key": "05",
          "label": "드롭다운 참조와 항목 삭제",
          "body": "소스 행을 추가·수정·삭제하고 두 드롭다운의 참조와 실제 값을 확인합니다. 선택한 소스 값이 바뀌면 같은 참조의 표시값을 갱신하며, 선택된 행이 삭제되면 첫 남은 옵션으로 전환합니다. 소스는 최소1행을 유지하고 참조 ID와 표시 행 번호는 구분합니다.",
          "sourceStates": [
            "MST_LAB_09_01",
            "MST_LAB_09_02"
          ],
          "anchor": {
            "x": 293,
            "y": 2800,
            "w": 20,
            "h": 20
          },
          "number": 5
        }
      ],
      "modals": [],
      "page": "07 랩",
      "order": 10,
      "preserve": false,
      "image": {
        "key": "be3d27401902d144d257835609af8cbcfea3dd17ca8e8d951a0727dd6f4e8ab1",
        "width": 1785,
        "height": 3152,
        "path": "design-specs/revision-captures/lab-omr.png"
      },
      "geometry": "revision-captures/lab-omr.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": []
    },
    {
      "id": "REV_LAB_04",
      "title": "OMR 복원 테스트 (JSON → 화면)",
      "menu": "랩",
      "kind": "base-page-with-sample-variants",
      "mergedScreens": [
        "MST_LAB_07"
      ],
      "screenshot": "design-specs/revision-captures/lab-restore.png",
      "html": "cms-knowledge/master-cms/sources/lab-omr-restore-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "유형 선택·복원·초기화",
          "body": "유형 코드와 OMR·정답 JSON을 입력하고 복원·Pretty·폼 비우기·보기 폭 전환을 사용합니다. 유형을 선택하면 기본 폼과 JSON을 표시하고 미선택으로 돌아가면 모두 비웁니다.14유형의 기본값 왕복을 확인했지만 모든 실제 저장 데이터와 경계 조합을 검증한 것은 아닙니다.",
          "sourceStates": [
            "MST_LAB_07_01",
            "MST_LAB_07_04",
            "MST_LAB_07_05"
          ],
          "anchor": {
            "h": 40,
            "w": 352,
            "x": 361.921875,
            "y": 310
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "JSON·화면 동기화와 오류",
          "body": "JSON 입력 후250ms가 지나면 자동 복원을 시도하고 화면을 편집하면 JSON을 갱신합니다. 명시적 복원에서 파싱 오류는 기존 폼을 유지하고 구조 불일치는 새 기본 폼을 유지합니다. 선택지 값과 정답을 로컬에서 바꿨을 때 JSON도 갱신되는 것을 확인했습니다.",
          "sourceStates": [
            "MST_LAB_07_02",
            "MST_LAB_07_03"
          ],
          "anchor": {
            "h": 32,
            "w": 66,
            "x": 1177.65625,
            "y": 408
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "저장 데이터와 답안 값 유형",
          "body": "OBSACN과 SBSANM의 수식·텍스트 답안 등 실제 저장3표본을 구조·값·배열 순서까지 복원했습니다. 같은 TEXT OMR이라도 정답의 value_type에 따라 수식 필드와 일반 텍스트 입력이 달라집니다. 확인한 SBSANM 정답은 ORDERED의 nodes 안에 VALUE와 allowed_answer를 둔 구조입니다.",
          "sourceStates": [
            "MST_LAB_07_06",
            "MST_LAB_07_07"
          ],
          "anchor": {
            "x": 776,
            "y": 487,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "로컬 수정과 원본 보존",
          "body": "텍스트 답안의 접미와 대소·공백 구분 플래그를 바꾸면 JSON에 즉시 반영됩니다. 확인한 원본3개는 변경되지 않았고 랩은 미선택·빈 JSON·빈 폼으로 초기화했습니다. 랩의 로컬 편집은 CMS 저장이나 실제 서비스 채점과 구분합니다.",
          "sourceStates": [
            "MST_LAB_07_08"
          ],
          "anchor": {
            "h": 32,
            "w": 94.21875,
            "x": 1075.4375,
            "y": 408
          },
          "number": 4
        }
      ],
      "modals": [],
      "page": "07 랩",
      "order": 11,
      "preserve": false,
      "image": {
        "key": "c7280980a745557900c68ea132b6b88fad18fbb9017ec177a44bbb112fa161a2",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/lab-restore.png"
      },
      "geometry": "revision-captures/lab-restore.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": []
    },
    {
      "id": "REV_LAB_05",
      "title": "편집기 격리 테스트 (기존 ↔ iframe)",
      "menu": "랩",
      "kind": "base-page-with-two-tabs",
      "mergedScreens": [
        "MST_LAB_05"
      ],
      "screenshot": "design-specs/revision-captures/lab-frame.png",
      "html": "cms-knowledge/master-cms/sources/lab-editor-frame-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "JSON 입력과 두 탭 비교",
          "body": "문서 JSON을 불러와 기존·iframe 탭의 편집기와 문서를 비교합니다. 보이는 탭부터 편집기를 만들고 숨은 탭은 처음 진입할 때 생성합니다. 잘못된 JSON과 미마운트 상태를 안내하며 정상 문항의 양쪽 저장 검증과 동일 문서 비교를 확인했습니다.",
          "sourceStates": [
            "MST_LAB_05_01",
            "MST_LAB_05_02"
          ],
          "anchor": {
            "x": 293,
            "y": 245,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "편집기 API·높이·뷰어",
          "body": "save()·getDocument()·객관식 켜기/끄기·destroy()와 미리보기 다시 그리기를 제공합니다. iframe은 내용에 맞춘 자동 높이 또는640px 고정 높이를 선택합니다. save()는 편집기 결과를 검증하는 API이며 CMS 서버 저장이 아닙니다.",
          "sourceStates": [
            "MST_LAB_05_03"
          ],
          "anchor": {
            "h": 32,
            "w": 56.953125,
            "x": 1292.578125,
            "y": 591
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "탭별 변경·재로드·지문 호환",
          "body": "한쪽 편집기를 변경하면 문서 비교 결과가 달라지고 탭을 왕복해도 각 편집 상태가 유지됩니다. destroy 후에는 다시 불러오기가 필요하며 입력 JSON으로 양쪽 편집기를 복원할 수 있습니다. 초기 지문 표본의 마운트 실패와 정상화 후 성공을 각각 확인했으며 모든 지문이 지원되지 않는다는 결론으로 일반화하지 않습니다.",
          "sourceStates": [
            "MST_LAB_05_04",
            "MST_LAB_05_05"
          ],
          "anchor": {
            "x": 293,
            "y": 1296,
            "w": 20,
            "h": 20
          },
          "number": 3
        }
      ],
      "modals": [],
      "page": "07 랩",
      "order": 12,
      "preserve": false,
      "image": {
        "key": "f6462b610bbce6f9682d6c064476591b401ab4479c7a6936664ff973c8ae22cb",
        "width": 1785,
        "height": 1408,
        "path": "design-specs/revision-captures/lab-frame.png"
      },
      "geometry": "revision-captures/lab-frame.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": []
    },
    {
      "id": "MST_HML_C01",
      "title": "HML 문항 등록 목록",
      "menu": "HML 문항 등록",
      "kind": "list",
      "mergedScreens": [
        "HML-LIST"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/177-hml-registration-list.png",
      "html": "cms-knowledge/master-cms/sources/hml-list-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "검색과 목록 구성",
          "body": "시험지 ID·파일명·출처코드·등록자 ID로 검색할 수 있으며 교육과정·학교급·과목군·과목·학년·학기·등록일·상태 필터를 제공합니다. 목록에는 시험지 ID, 파일명, 출처, 과목, 학년·학기, 성공·실패·삭제 문항 수, 평가지 등록여부, 상태, 등록자·등록일을 표시합니다.",
          "sourceStates": [
            "HML-LIST_01"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "상태·보기 개수·페이지",
          "body": "W 등록대기, P 등록중, R 초안, M 메타추천중, Y 승인, D 폐기, F 실패를 구분하며 10·30·50·100개씩 보기와 페이지 이동을 제공합니다. 결과 건수는 조회 조건에 따라 달라지며 모든 필터 조합과 날짜 경계의 동작은 검증되지 않았습니다.",
          "sourceStates": [
            "HML-LIST_02",
            "HML-LIST_03"
          ],
          "anchor": {
            "x": 293,
            "y": 425,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "신규 등록",
          "body": "목록의 HML 등록을 선택하면 검색 문맥을 전달한 신규 등록 폼으로 이동합니다. 화면 이동만으로 파일이 업로드되거나 문서가 생성되지는 않습니다.",
          "sourceStates": [
            "HML-LIST_04"
          ],
          "anchor": {
            "h": 40,
            "w": 114.625,
            "x": 2054.375,
            "y": 351.140625
          },
          "number": 3
        }
      ],
      "modals": [],
      "page": "02 문항 관리 · HML 문항 등록",
      "order": 13,
      "preserve": false,
      "image": {
        "key": "776cee00a2394f69232f6f539923e6be3608e4bdcaffabdcc4cfd87f5ae6c3f5",
        "width": 2185,
        "height": 1131,
        "path": "design-specs/revision-captures/hml-list.png"
      },
      "geometry": "revision-captures/hml-list.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "HML 등록",
          "target": "MST_HML_C02",
          "anchor": {
            "h": 40,
            "w": 114.625,
            "x": 2054.375,
            "y": 351.140625
          },
          "action": "클릭"
        },
        {
          "label": "파일명",
          "target": "MST_HML_C04",
          "anchor": {
            "h": 18,
            "w": 316.953125,
            "x": 436.59375,
            "y": 456.140625
          },
          "action": "파일명 클릭 → 해당 상태의 상세"
        }
      ]
    },
    {
      "id": "MST_HML_C02",
      "title": "HML 신규 등록",
      "menu": "HML 문항 등록",
      "kind": "form",
      "mergedScreens": [
        "HML-REGISTER",
        "HML-FILE",
        "HML-SOURCE",
        "HML-UNIT",
        "HML-CANCEL",
        "HML-SUBMIT"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/180-hml-registration-form.png",
      "html": "cms-knowledge/master-cms/sources/hml-registration-form-current-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "파일 업로드",
          "body": "파일을 선택하면 이름·용량·진행률·제거 제어가 있는 행에 대기 상태로 표시하며 등록 시작 전에는 자동 전송하지 않습니다. 허용 형식은 .HML, 최대 개수는 1개, 용량 안내는 50MB입니다. 확장자·개수·50MiB 초과 검증이 설정돼 있으나 각 경계의 실제 반려 결과는 검증되지 않았습니다.",
          "sourceStates": [
            "HML-REGISTER_01",
            "HML-FILE_01",
            "HML-FILE_02",
            "HML-FILE_03"
          ],
          "anchor": {
            "h": 65,
            "w": 1495,
            "x": 273,
            "y": 150.140625
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "필수 메타정보",
          "body": "출처·단원 코드·페이지 시작과 끝·용도를 필수로 입력하며 등록자는 비활성 표시입니다. 단원 코드는 최대 20자이고 안내 길이는 학기 12자리·대단원 14자리·전체 20자리이며 페이지는 1 이상, 용도는 C 공통·T 교사용입니다. 모든 필수값 조합과 서버의 단원 존재·페이지 역전 검증은 확인되지 않았습니다.",
          "sourceStates": [
            "HML-REGISTER_02",
            "HML-REGISTER_04"
          ],
          "anchor": {
            "x": 295,
            "y": 600,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "파일 없음·등록 시작",
          "body": "허용된 파일이 없는 상태에서 등록 시작을 누르면 HML 파일을 선택해 달라는 안내로 제출을 중단하도록 설정돼 있습니다. 이 HML 폼의 무파일 차단 결과는 실제 실행으로 검증되지 않았습니다.",
          "sourceStates": [
            "HML-REGISTER_03"
          ],
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1008.03125,
            "y": 813.140625
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "출처 조회",
          "body": "출처 옆 조회를 누르면 출처 조회 모달이 열립니다. 선택한 출처는 부모 폼의 출처 값에만 적용하며 용도는 자동으로 선택하지 않습니다.\n사용 가능한 출처의 라디오를 고르고 선택을 누르면 모달이 닫히고 부모 폼의 출처 값에 적용됩니다. 미사용 행은 비활성으로 표시하며 모든 필터 조합과 직접 요청에 대한 서버 제한은 미검증입니다.",
          "sourceStates": [
            "HML-SOURCE_01",
            "HML-SOURCE_02",
            "HML-SOURCE_03"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 936.5,
            "y": 628.140625
          },
          "number": 4
        },
        {
          "key": "05",
          "label": "단원 조회·자동완성",
          "body": "단원 조회 모달과 입력란의 자동완성은 서로 다른 경로이며 조회 행 클릭으로 부모 값이 적용되지는 않았습니다. 실제 단원 값 적용은 3자 이상 입력한 뒤 자동완성 후보를 선택한 경로에서 확인됐습니다. 후보 요청은 300ms 지연·최대 20개로 설정돼 있으며 무결과·통신 실패의 전체 동작은 미검증입니다.\n단원 검색 결과를 조회하고 닫을 수 있으며 선택 버튼은 없습니다. 관측한 결과 행 클릭은 부모 단원 값을 적용하지 않았습니다.",
          "sourceStates": [
            "HML-UNIT_03",
            "HML-UNIT_04",
            "HML-UNIT_01",
            "HML-UNIT_02"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 1668,
            "y": 628.140625
          },
          "number": 5
        },
        {
          "key": "06",
          "label": "취소",
          "body": "취소를 누르면 등록 폼을 떠날지 확인합니다. 이 확인은 로컬 화면 이탈이며 서버 등록 취소나 업로드 객체 삭제를 뜻하지 않습니다. 다른 메뉴 이동·뒤로가기·탭 닫기의 동일 보호 여부는 검증되지 않았습니다.\n취소를 누르면 입력 폼에 남고 저장 하지 않고 이동을 누르면 목록으로 돌아갑니다. 이 동작은 화면 이탈이며 서버에 저장된 문서나 객체를 삭제하는 기능이 아닙니다.",
          "sourceStates": [
            "HML-CANCEL_01",
            "HML-CANCEL_02",
            "HML-CANCEL_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 938.03125,
            "y": 813.140625
          },
          "number": 6
        },
        {
          "key": "07",
          "label": "업로드와 처리 결과",
          "body": "유효한 입력으로 등록 시작을 누르면 업로드 주소 발급·파일 전송·문서 생성으로 이어지도록 설정돼 있으며 파일 진행률은 파싱이나 AI 추천 전체의 진행률이 아닙니다. 정상 파일의 등록과 분리 결과·후속 승인은 확인됐습니다. 단계별 실패·재시도·중복 제출·잔여 객체 정리는 검증되지 않았습니다.",
          "sourceStates": [
            "HML-SUBMIT_01",
            "HML-SUBMIT_02",
            "HML-SUBMIT_03"
          ],
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1008.03125,
            "y": 813.140625
          },
          "number": 7
        }
      ],
      "modals": [
        {
          "id": "HML_C02_SOURCE",
          "title": "출처 조회",
          "triggerKey": "04",
          "fields": [
            "검색 기준: 출처코드/출처명",
            "검색어",
            "교육과정·학교급·과목군·과목·학년·학기·용도",
            "선택 라디오와 출처 결과 표·페이지"
          ],
          "buttons": [
            "닫기(X)",
            "초기화",
            "조회",
            "취소",
            "선택"
          ],
          "body": "사용 가능한 출처의 라디오를 고르고 선택을 누르면 모달이 닫히고 부모 폼의 출처 값에 적용됩니다. 미사용 행은 비활성으로 표시하며 모든 필터 조합과 직접 요청에 대한 서버 제한은 미검증입니다.",
          "sourceStates": [
            "HML-SOURCE_01",
            "HML-SOURCE_02",
            "HML-SOURCE_03"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 936.5,
            "y": 628.140625
          },
          "noteNumber": 4,
          "message": "",
          "noteKey": "04"
        },
        {
          "id": "HML_C02_UNIT",
          "title": "단원 코드 조회",
          "triggerKey": "05",
          "fields": [
            "검색 기준: 단원 코드/단원명",
            "검색어",
            "교육과정·학교급·과목군·과목·학년·학기",
            "단원 코드·대/중/소/소소단원 결과 표·페이지"
          ],
          "buttons": [
            "닫기(X)",
            "초기화",
            "조회",
            "닫기"
          ],
          "body": "단원 검색 결과를 조회하고 닫을 수 있으며 선택 버튼은 없습니다. 관측한 결과 행 클릭은 부모 단원 값을 적용하지 않았습니다.",
          "sourceStates": [
            "HML-UNIT_01",
            "HML-UNIT_02"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 1668,
            "y": 628.140625
          },
          "noteNumber": 5,
          "message": "",
          "noteKey": "05"
        },
        {
          "id": "HML_C02_CANCEL",
          "title": "HML 등록 취소",
          "triggerKey": "06",
          "fields": [],
          "buttons": [
            "닫기(X)",
            "취소",
            "저장 하지 않고 이동"
          ],
          "body": "취소를 누르면 입력 폼에 남고 저장 하지 않고 이동을 누르면 목록으로 돌아갑니다. 이 동작은 화면 이탈이며 서버에 저장된 문서나 객체를 삭제하는 기능이 아닙니다.",
          "sourceStates": [
            "HML-CANCEL_01",
            "HML-CANCEL_02",
            "HML-CANCEL_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 938.03125,
            "y": 813.140625
          },
          "noteNumber": 6,
          "message": "저장하지 않고 이동하시겠습니까?",
          "noteKey": "06"
        }
      ],
      "page": "02 문항 관리 · HML 문항 등록",
      "order": 14,
      "preserve": false,
      "image": {
        "key": "71430d2d59f160ba90c9ef346830a47708137080a9cb13f791222d9365af4d4f",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/hml-form.png"
      },
      "geometry": "revision-captures/hml-form.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "등록 시작",
          "target": "MST_HML_C03",
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1008.03125,
            "y": 813.140625
          },
          "action": "파일·필수값 정상 등록 → 처리 후 초안 검수"
        }
      ]
    },
    {
      "id": "MST_HML_C03",
      "title": "HML 상세 · 초안 검수",
      "menu": "HML 문항 등록",
      "kind": "review",
      "mergedScreens": [
        "HML-REVIEW",
        "HML-DISCARD"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/2074-hml665-draft-top-pixels.png",
      "html": "cms-knowledge/master-cms/sources/hml665-set-draft-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "기본정보·분리 문항",
          "body": "기본정보에는 시험지 ID·원본 파일·출처·단원·페이지·용도·등록 및 수정 정보·비고를 표시합니다. 분리 결과는 단건 카드 또는 공유 지문과 자식을 묶은 세트 블록으로 표시하며 한 검수 선택이 여러 자식 문항에 대응할 수 있습니다.",
          "sourceStates": [
            "HML-REVIEW_01",
            "HML-REVIEW_02"
          ],
          "anchor": {
            "x": 293,
            "y": 621,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "검수·비고·평가지",
          "body": "검수값은 S 등록성공·F 등록실패·D 삭제이며 W 등록대기는 비활성 미검수 값입니다. 비고는 최대 1000자이고 평가지 등록여부는 등록 Y·미등록 N입니다. 선택과 비고 변경은 최종 승인 전까지 로컬 상태로 유지됩니다.",
          "sourceStates": [
            "HML-REVIEW_03"
          ],
          "anchor": {
            "x": 1036,
            "y": 235,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "승인 검사와 최종 처리",
          "body": "승인은 W 미검수·모두 D·평가지 선택 누락 순으로 검사한 뒤 최종 확인을 엽니다. S/F/D 혼합 승인과 세트 D·단건 S 승인은 실제 수용됐으며 세트의 판정은 자식 문항별로 펼쳐집니다. 지문 ID는 문항 승인 대상과 구분합니다.\n미검수 블록 번호를 안내하고 확인 후 첫 미검수 위치로 이동·포커스하도록 설정돼 있습니다. 관측한 초안의 W 선택지는 비활성이었으며 이 경고의 정상 UI 실행은 검증되지 않았습니다.\n모든 문항을 D로 선택하면 승인할 수 없다는 안내를 표시합니다. 이는 문서 전체 폐기가 아니라 승인 경로의 차단입니다.\n평가지 등록여부를 선택하지 않으면 선택을 요구하는 안내를 표시합니다. 확인 후 해당 항목으로 이동하며 평가지 항목이 없는 디피니션에는 이 검사를 적용하지 않습니다.\n승인 여부와 AI 메타 추천이 시작되며 되돌릴 수 없음을 안내합니다. 취소는 최종 제출을 하지 않고 승인 버튼만 서버 처리를 요청합니다.",
          "sourceStates": [
            "HML-REVIEW_08",
            "HML-REVIEW_09",
            "HML-REVIEW_04",
            "HML-REVIEW_05",
            "HML-REVIEW_06",
            "HML-REVIEW_07"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1059.5,
            "y": 1964.625
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "문서 폐기",
          "body": "비고가 비어 있으면 사유 입력 안내를 표시하고 사유가 있으면 전체 폐기 확인을 엽니다. HML 문서 전체 폐기는 확인창 취소까지 확인됐으며 최종 폐기 제출 결과는 미검증입니다. 승인 과정의 세트 D 처리와 문서 전체 폐기는 다른 동작입니다.\n비고의 공백을 제거한 값이 비어 있으면 폐기 사유를 입력하라는 안내를 표시합니다. 확인을 눌러 안내를 닫은 뒤 비고에서 사유를 입력합니다.\n모든 문항을 삭제 처리하고 되돌릴 수 없다는 내용을 확인합니다. 취소는 제출하지 않으며 폐기 버튼이 최종 처리를 요청하도록 설정돼 있습니다. 이 HML 문서 전체 폐기의 최종 성공 결과는 미검증입니다.",
          "sourceStates": [
            "HML-DISCARD_01",
            "HML-DISCARD_02",
            "HML-DISCARD_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 989.5,
            "y": 1964.625
          },
          "number": 4
        }
      ],
      "modals": [
        {
          "id": "HML_C03_UNJUDGED",
          "title": "시험지 승인",
          "triggerKey": "03",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "승인"
          ],
          "body": "미검수 블록 번호를 안내하고 확인 후 첫 미검수 위치로 이동·포커스하도록 설정돼 있습니다. 관측한 초안의 W 선택지는 비활성이었으며 이 경고의 정상 UI 실행은 검증되지 않았습니다.\n모든 문항을 D로 선택하면 승인할 수 없다는 안내를 표시합니다. 이는 문서 전체 폐기가 아니라 승인 경로의 차단입니다.\n평가지 등록여부를 선택하지 않으면 선택을 요구하는 안내를 표시합니다. 확인 후 해당 항목으로 이동하며 평가지 항목이 없는 디피니션에는 이 검사를 적용하지 않습니다.\n승인 여부와 AI 메타 추천이 시작되며 되돌릴 수 없음을 안내합니다. 취소는 최종 제출을 하지 않고 승인 버튼만 서버 처리를 요청합니다.",
          "sourceStates": [
            "HML-REVIEW_04",
            "HML-REVIEW_05",
            "HML-REVIEW_06",
            "HML-REVIEW_07"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1059.5,
            "y": 1964.625
          },
          "noteNumber": 3,
          "message": "승인하시겠습니까? AI 메타 추천이 시작되며 되돌릴 수 없습니다.",
          "noteKey": "03"
        },
        {
          "id": "HML_C03_REASON",
          "title": "시험지 폐기",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "폐기"
          ],
          "body": "비고의 공백을 제거한 값이 비어 있으면 폐기 사유를 입력하라는 안내를 표시합니다. 확인을 눌러 안내를 닫은 뒤 비고에서 사유를 입력합니다.\n모든 문항을 삭제 처리하고 되돌릴 수 없다는 내용을 확인합니다. 취소는 제출하지 않으며 폐기 버튼이 최종 처리를 요청하도록 설정돼 있습니다. 이 HML 문서 전체 폐기의 최종 성공 결과는 미검증입니다.",
          "sourceStates": [
            "HML-DISCARD_01",
            "HML-DISCARD_02",
            "HML-DISCARD_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 989.5,
            "y": 1964.625
          },
          "noteNumber": 4,
          "message": "폐기하시겠습니까? 모든 문항이 삭제 처리되며 되돌릴 수 없습니다.",
          "noteKey": "04"
        }
      ],
      "page": "02 문항 관리 · HML 문항 등록",
      "order": 15,
      "preserve": false,
      "image": {
        "key": "59f0bba47574c8c4c4a960a33b31b49b9ae3ccc743ef9ab81ef997cce7447202",
        "width": 1785,
        "height": 2045,
        "path": "design-specs/revision-captures/hml-review.png"
      },
      "geometry": "revision-captures/hml-review.json",
      "captureLabel": "보존 DOM을 읽기 전용으로 재현",
      "flows": [
        {
          "label": "승인",
          "target": "MST_HML_C04",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1059.5,
            "y": 1964.625
          },
          "action": "검사 통과 → 승인 확인 → 처리 결과"
        }
      ]
    },
    {
      "id": "MST_HML_C04",
      "title": "HML 상세 · 처리 결과 조회",
      "menu": "HML 문항 등록",
      "kind": "detail",
      "mergedScreens": [
        "HML-PROCESSING",
        "HML-APPROVED",
        "HML-DISCARD",
        "HML-ERROR"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/203-hml-approved-document.png",
      "html": "cms-knowledge/master-cms/sources/hml-approved-detail.html",
      "notes": [
        {
          "key": "01",
          "label": "상태별 안내",
          "body": "W는 파싱 대기, P는 파싱 진행과 페이지를 닫아도 처리가 계속된다는 안내를 표시합니다. M은 AI 메타 추천 중이며 완료 후 자동 승인된다는 안내를 표시합니다. 안내 문구와 내부 서버·AI 처리의 전체 검증은 구분합니다.",
          "sourceStates": [
            "HML-PROCESSING_01",
            "HML-PROCESSING_02",
            "HML-PROCESSING_03"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "승인 결과·평가지",
          "body": "Y에서는 비고와 평가지 값이 읽기 전용이며 분리 카드·원본 다운로드·목록을 제공합니다. 문서 Y, 검수 S/F/D, 개별 Master 상태는 별개입니다. 평가지 등록 Y의 관측 결과는 S/F를 포함하고 D를 제외했으며 미등록 N 승인도 확인됐습니다.",
          "sourceStates": [
            "HML-APPROVED_01",
            "HML-APPROVED_02",
            "HML-APPROVED_03",
            "HML-APPROVED_04"
          ],
          "anchor": {
            "x": 1036,
            "y": 235,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "문항 상세·수정·원본",
          "body": "남아 있는 문항에는 상세·수정 링크를 제공하고 삭제 항목에는 링크를 표시하지 않습니다. 원본 다운로드의 실제 파일 일치는 확인된 표본에서 검증됐습니다. 문항 수정의 임시본 선택과 차단·오류 전체 동작은 미검증입니다.\n저장된 임시본이 있으면 저장 시각과 수정할 버전을 선택하는 안내가 표시됩니다. 임시저장 수정하기와 검수완료 수정하기를 제공하고 임시본이 없으면 바로 수정 화면을 여는 구조입니다. 문서 카드에서 모든 선택·오류 분기의 실행은 검증되지 않았습니다.",
          "sourceStates": [
            "HML-APPROVED_05"
          ],
          "anchor": {
            "h": 32,
            "w": 78.21875,
            "x": 548.6875,
            "y": 893.984375
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "폐기·실패·재등록",
          "body": "D는 조회 전용·복원 불가 안내와 삭제된 카드·원본 다운로드·목록을 표시합니다. F는 파일 파싱 시작 실패와 메타추천 실패에 따라 분리 내용의 잔존 여부가 다릅니다. 실패 시 원본을 수정해 신규 등록하도록 안내하며 직접 재시도 버튼이나 물리 삭제를 의미하지 않습니다.",
          "sourceStates": [
            "HML-DISCARD_04",
            "HML-ERROR_01",
            "HML-ERROR_02",
            "HML-ERROR_03"
          ],
          "anchor": {
            "x": 293,
            "y": 115,
            "w": 20,
            "h": 20
          },
          "number": 4
        }
      ],
      "modals": [
        {
          "id": "HML_C04_DRAFT",
          "title": "임시 저장 확인",
          "triggerKey": "03",
          "fields": [
            "임시 저장 시각"
          ],
          "buttons": [
            "닫기(X)",
            "취소",
            "임시저장 수정하기",
            "검수완료 수정하기"
          ],
          "body": "저장된 임시본이 있으면 저장 시각과 수정할 버전을 선택하는 안내가 표시됩니다. 임시저장 수정하기와 검수완료 수정하기를 제공하고 임시본이 없으면 바로 수정 화면을 여는 구조입니다. 문서 카드에서 모든 선택·오류 분기의 실행은 검증되지 않았습니다.",
          "sourceStates": [
            "HML-APPROVED_05"
          ],
          "anchor": {
            "h": 32,
            "w": 78.21875,
            "x": 548.6875,
            "y": 893.984375
          },
          "noteNumber": 3,
          "message": "에 임시저장한 내용이 있습니다. 어느 버전을 수정하시겠습니까?",
          "noteKey": "03"
        }
      ],
      "page": "02 문항 관리 · HML 문항 등록",
      "order": 16,
      "preserve": false,
      "image": {
        "key": "f6cbe053a9108d377e8582e31da4c4ad9d1f26dbb211803fc0d986430c17279a",
        "width": 1785,
        "height": 2057,
        "path": "design-specs/revision-captures/hml-detail.png"
      },
      "geometry": "revision-captures/hml-detail.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "문항 상세",
          "target": "REV_ITM_02",
          "anchor": {
            "h": 32,
            "w": 78.21875,
            "x": 548.6875,
            "y": 893.984375
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "MST_DIFI_C01",
      "title": "디피니션 문항 등록 목록",
      "menu": "디피니션 문항 등록",
      "kind": "list",
      "mergedScreens": [
        "MST_DIFI_01_LIST"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/275-definition-list-settled.png",
      "html": "cms-knowledge/master-cms/evidence/1831-definition-current-all-source.json",
      "notes": [
        {
          "key": "01",
          "label": "검색과 목록 구성",
          "body": "시험지 ID·파일명·출처코드·등록자 ID 검색과 교육과정·학교급·과목군·과목·학년·학기·등록일·상태 필터를 제공합니다. 목록 열은 시험지 ID, 파일명, 출처, 과목, 학년·학기, 평가지 등록여부, 상태, 등록자·등록일이며 HML의 성공·실패·삭제 문항 수 열은 없습니다.",
          "sourceStates": [
            "MST_DIFI_01_LIST_01",
            "MST_DIFI_01_LIST_02"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "목록 정책·미검증",
          "body": "10·30·50·100개씩 보기와 페이지 이동을 제공합니다. 파일명에 포함된 M/D 같은 문자열과 실제 문서 상태는 다를 수 있으며 결과 건수는 조회 시점과 조건에 따라 달라집니다. 실제 0건 검색의 고유 문구는 검증되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_01_LIST_03",
            "MST_DIFI_01_LIST_04",
            "MST_DIFI_01_LIST_06"
          ],
          "anchor": {
            "x": 293,
            "y": 425,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "ZIP 등록·원본 근거",
          "body": "ZIP 등록을 선택하면 목록 문맥을 포함한 신규 등록 폼으로 이동합니다. 이 이동만으로 문서가 생성되지는 않습니다.",
          "sourceStates": [
            "MST_DIFI_01_LIST_05"
          ],
          "anchor": {
            "h": 40,
            "w": 104.859375,
            "x": 2064.140625,
            "y": 351.140625
          },
          "number": 3
        }
      ],
      "modals": [],
      "page": "03 문항 관리 · 디피니션 문항 등록",
      "order": 17,
      "preserve": false,
      "image": {
        "key": "01872e5016bedc10d57d2c84260f1db792b4e2d4ad62704be5424577c94212bf",
        "width": 2185,
        "height": 1131,
        "path": "design-specs/revision-captures/difi-list.png"
      },
      "geometry": "revision-captures/difi-list.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "ZIP 등록",
          "target": "MST_DIFI_C02",
          "anchor": {
            "h": 40,
            "w": 104.859375,
            "x": 2064.140625,
            "y": 351.140625
          },
          "action": "클릭"
        },
        {
          "label": "파일명",
          "target": "MST_DIFI_C04",
          "anchor": {
            "h": 18,
            "w": 217.796875,
            "x": 436.59375,
            "y": 456.140625
          },
          "action": "파일명 클릭 → 해당 상태의 상세"
        }
      ]
    },
    {
      "id": "MST_DIFI_C02",
      "title": "ZIP 신규 등록",
      "menu": "디피니션 문항 등록",
      "kind": "form",
      "mergedScreens": [
        "MST_DIFI_02_REGISTER",
        "MST_DIFI_03_SOURCE",
        "MST_DIFI_04_UNIT",
        "MST_DIFI_05_UPLOAD"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/251-definition-form.png",
      "html": "cms-knowledge/master-cms/sources/definition-registration-form-current-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "ZIP 파일과 메타정보",
          "body": "파일 영역·파일 선택·대기 파일 행과 출처·단원 조회, 페이지 시작·끝, 용도 C/T, 비활성 등록자를 표시합니다. 안내는 .ZIP·최대 50MB·1개 파일=1문항이며 선택한 파일은 등록 시작 전까지 대기합니다. 이 안내만으로 세트 입력 규격을 확정하지 않습니다.",
          "sourceStates": [
            "MST_DIFI_02_REGISTER_01",
            "MST_DIFI_02_REGISTER_02"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "파일 검증",
          "body": "파일 없이 등록 시작을 누르면 잘못된 HML 파일 선택 안내가 표시됩니다. TXT와 두 번째 ZIP은 반려되며 두 번째 파일 반려 시 첫 파일은 유지됩니다. 50MiB+1바이트는 거절됐고 반올림으로 현재 크기와 한도가 모두 50MB로 보였으며 정확한 경계·대문자 확장자·변조 MIME은 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_02_REGISTER_03",
            "MST_DIFI_02_REGISTER_04",
            "MST_DIFI_02_REGISTER_05",
            "MST_DIFI_02_REGISTER_06"
          ],
          "anchor": {
            "x": 293,
            "y": 300,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "필수값·입력 제약",
          "body": "출처·단원·페이지 시작과 끝·용도를 필수로 검사하며 누락 시 미입력 안내로 제출을 차단합니다. 단원 입력은 20자로 제한되고 페이지 0은 최소 1 오류로 처리됐습니다. 단원 서버 정합성·페이지 역전·소수 등의 검증은 확인되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_02_REGISTER_07",
            "MST_DIFI_02_REGISTER_08",
            "MST_DIFI_02_REGISTER_09"
          ],
          "anchor": {
            "x": 295,
            "y": 600,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "출처 조회",
          "body": "출처 옆 조회를 누르면 사용 가능한 출처를 선택하는 모달이 열립니다. 선택값은 출처에만 반영되며 등록 용도를 자동으로 선택하지 않습니다.\n활성 출처를 선택하고 선택 버튼을 누르면 부모 폼의 출처 값에 반영합니다. 실제 열기·라디오 선택·적용은 확인됐으며 모든 검색·무결과·취소 후 선택 유지·미사용 직접 제한은 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_03_SOURCE_01",
            "MST_DIFI_03_SOURCE_02",
            "MST_DIFI_03_SOURCE_03",
            "MST_DIFI_03_SOURCE_04",
            "MST_DIFI_03_SOURCE_05"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 936.5,
            "y": 628.140625
          },
          "number": 4
        },
        {
          "key": "05",
          "label": "단원 조회·자동완성",
          "body": "단원 조회 모달에는 별도의 선택 버튼이 없습니다. 입력 자동완성은 3자·300ms·최대 20후보로 설정돼 있으며 일치하는 코드가 없다는 안내는 실제 관측됐습니다. 정상 후보 선택·키보드·통신 오류의 전체 동작은 미검증입니다.\n단원 검색 결과를 조회하고 닫을 수 있으며 열기·닫기 동작이 확인됐습니다. 선택 버튼이나 행 클릭에 의한 부모 값 자동 대입은 확인되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_04_UNIT_03",
            "MST_DIFI_04_UNIT_04",
            "MST_DIFI_04_UNIT_01",
            "MST_DIFI_04_UNIT_02"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 1668,
            "y": 628.140625
          },
          "number": 5
        },
        {
          "key": "06",
          "label": "취소",
          "body": "취소 확인에서 취소를 누르면 선택 ZIP과 입력값을 유지합니다. 저장 하지 않고 이동을 누르면 목록으로 돌아가며 문서 폐기나 서버 객체 삭제를 수행한 것은 아닙니다.\n취소를 누르면 등록 폼의 입력을 보존하고 저장 하지 않고 이동을 누르면 목록으로 돌아갑니다. 다른 메뉴·탭 닫기의 동일 보호와 서버 업로드 취소는 검증되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_02_REGISTER_10",
            "MST_DIFI_02_REGISTER_11",
            "MST_DIFI_02_REGISTER_12"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 938.03125,
            "y": 813.140625
          },
          "number": 6
        },
        {
          "key": "07",
          "label": "제출·전송·처리",
          "body": "등록 시작은 파일·폼 검사 후 업로드 주소 발급·전송·문서 생성으로 이어집니다. 정상 단독 입력의 P→R 및 카드 생성은 확인됐으며 파일 진행 막대는 파싱·추천 전체 진행률이 아닙니다. 단계별 실패·재시도·중복·부분 생성은 미검증이고 전송 기록 미포착만으로 파일 전송 실패를 판정할 수 없습니다.",
          "sourceStates": [
            "MST_DIFI_05_UPLOAD_01",
            "MST_DIFI_05_UPLOAD_02",
            "MST_DIFI_05_UPLOAD_03",
            "MST_DIFI_05_UPLOAD_04",
            "MST_DIFI_05_UPLOAD_06"
          ],
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1008.03125,
            "y": 813.140625
          },
          "number": 7
        }
      ],
      "modals": [
        {
          "id": "DIFI_C02_SOURCE",
          "title": "출처 조회",
          "triggerKey": "04",
          "fields": [
            "출처코드/출처명·검색어",
            "교육과정·학교급·과목군·과목·학년·학기·용도",
            "라디오 선택·출처 결과 표·페이지"
          ],
          "buttons": [
            "닫기(X)",
            "초기화",
            "조회",
            "취소",
            "선택"
          ],
          "body": "활성 출처를 선택하고 선택 버튼을 누르면 부모 폼의 출처 값에 반영합니다. 실제 열기·라디오 선택·적용은 확인됐으며 모든 검색·무결과·취소 후 선택 유지·미사용 직접 제한은 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_03_SOURCE_01",
            "MST_DIFI_03_SOURCE_02",
            "MST_DIFI_03_SOURCE_03",
            "MST_DIFI_03_SOURCE_04",
            "MST_DIFI_03_SOURCE_05"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 936.5,
            "y": 628.140625
          },
          "noteNumber": 4,
          "message": "",
          "noteKey": "04"
        },
        {
          "id": "DIFI_C02_UNIT",
          "title": "단원 코드 조회",
          "triggerKey": "05",
          "fields": [
            "단원 코드/단원명·검색어",
            "교육과정·학교급·과목군·과목·학년·학기",
            "단원 코드·대/중/소/소소단원 결과 표·페이지"
          ],
          "buttons": [
            "닫기(X)",
            "초기화",
            "조회",
            "닫기"
          ],
          "body": "단원 검색 결과를 조회하고 닫을 수 있으며 열기·닫기 동작이 확인됐습니다. 선택 버튼이나 행 클릭에 의한 부모 값 자동 대입은 확인되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_04_UNIT_01",
            "MST_DIFI_04_UNIT_02"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 1668,
            "y": 628.140625
          },
          "noteNumber": 5,
          "message": "",
          "noteKey": "05"
        },
        {
          "id": "DIFI_C02_CANCEL",
          "title": "ZIP 등록 취소",
          "triggerKey": "06",
          "fields": [],
          "buttons": [
            "닫기(X)",
            "취소",
            "저장 하지 않고 이동"
          ],
          "body": "취소를 누르면 등록 폼의 입력을 보존하고 저장 하지 않고 이동을 누르면 목록으로 돌아갑니다. 다른 메뉴·탭 닫기의 동일 보호와 서버 업로드 취소는 검증되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_02_REGISTER_10",
            "MST_DIFI_02_REGISTER_11",
            "MST_DIFI_02_REGISTER_12"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 938.03125,
            "y": 813.140625
          },
          "noteNumber": 6,
          "message": "저장하지 않고 이동하시겠습니까?",
          "noteKey": "06"
        }
      ],
      "page": "03 문항 관리 · 디피니션 문항 등록",
      "order": 18,
      "preserve": false,
      "image": {
        "key": "9e3229d0ca658693167e78b4c98ffa99453866ce6d0d3986f9cc618653bcad6d",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/difi-form.png"
      },
      "geometry": "revision-captures/difi-form.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "등록 시작",
          "target": "MST_DIFI_C03",
          "anchor": {
            "h": 40,
            "w": 94.921875,
            "x": 1008.03125,
            "y": 813.140625
          },
          "action": "파일·필수값 정상 등록 → 처리 후 초안 검수"
        }
      ]
    },
    {
      "id": "MST_DIFI_C03",
      "title": "디피니션 상세 · 초안 검수",
      "menu": "디피니션 문항 등록",
      "kind": "review",
      "mergedScreens": [
        "MST_DIFI_06_DETAIL",
        "MST_DIFI_07_REVIEW",
        "MST_DIFI_08_DISCARD"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/2687-definition695-top-visual.png",
      "html": "cms-knowledge/master-cms/sources/definition695-control-draft-20261110.html",
      "notes": [
        {
          "key": "01",
          "label": "초안 기본정보·검수",
          "body": "초안에서는 기본정보·활성 비고·분리 문항 카드와 목록·폐기·승인을 표시합니다. 검수값은 S 등록성공·F 등록실패·D 삭제이고 W 등록대기는 비활성입니다. HML과 달리 평가지 등록여부 입력은 없습니다.",
          "sourceStates": [
            "MST_DIFI_06_DETAIL_04",
            "MST_DIFI_07_REVIEW_01"
          ],
          "anchor": {
            "x": 293,
            "y": 621,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "승인과 결과 구분",
          "body": "모두 D이면 승인을 차단하지만 F 단독 최종 승인은 수용돼 문서 M→Y와 Master F가 확인됐습니다. S 단독 승인도 문서 Y와 Master R로 완료됐습니다. 문서 승인을 저장 OMR·추천 메타·서비스 배포 완료와 동일시하지 않습니다.\n모든 문항이 D이면 승인할 수 없다는 안내를 표시합니다. 실제 한 카드 문서에서 차단을 확인했습니다.\n승인 여부와 AI 메타 추천 시작·되돌릴 수 없음을 안내합니다. S와 F 단독 모두 확인창에 진입했으며 최종 버튼 제출과 후속 결과 확인은 별도 단계입니다.",
          "sourceStates": [
            "MST_DIFI_07_REVIEW_05",
            "MST_DIFI_07_REVIEW_06",
            "MST_DIFI_07_REVIEW_02",
            "MST_DIFI_07_REVIEW_03",
            "MST_DIFI_07_REVIEW_04"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1059.5,
            "y": 1379.921875
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "카드 접근·복합 입력 경계",
          "body": "초안 카드에 문항 ID가 있어도 최종 승인 전 Master 상세·수정 조회가 목록으로 이동한 사례가 있으며 승인 후 접근이 가능해졌습니다. 다중 입력은 카드 생성 전에 실패해 정상 다중·세트 및 혼합 S/F/D 검수는 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_07_REVIEW_07",
            "MST_DIFI_07_REVIEW_08"
          ],
          "anchor": {
            "x": 293,
            "y": 707,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "문서 폐기",
          "body": "비고에 사유를 입력한 문서의 최종 폐기는 실제 완료됐습니다. D 조회는 본문과 삭제 배지를 유지하면서 문항 ID·상세·수정·승인·폐기 제어를 숨겼습니다. 정상 세트 전체 폐기와 물리 DB 삭제는 검증되지 않았습니다.\n비고가 비어 있으면 폐기 사유를 입력하라는 안내를 표시합니다. 사유를 보완하기 전에는 최종 폐기 확인으로 진행하지 않습니다.\n모든 문항을 삭제 처리하고 되돌릴 수 없다는 내용을 확인합니다. 취소는 제출하지 않고 폐기는 최종 처리를 요청하며 실제 문서 폐기와 D 재조회가 확인됐습니다.",
          "sourceStates": [
            "MST_DIFI_08_DISCARD_04",
            "MST_DIFI_08_DISCARD_01",
            "MST_DIFI_08_DISCARD_02",
            "MST_DIFI_08_DISCARD_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 989.5,
            "y": 1379.921875
          },
          "number": 4
        }
      ],
      "modals": [
        {
          "id": "DIFI_C03_ALL_D",
          "title": "시험지 승인",
          "triggerKey": "02",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "승인"
          ],
          "body": "모든 문항이 D이면 승인할 수 없다는 안내를 표시합니다. 실제 한 카드 문서에서 차단을 확인했습니다.\n승인 여부와 AI 메타 추천 시작·되돌릴 수 없음을 안내합니다. S와 F 단독 모두 확인창에 진입했으며 최종 버튼 제출과 후속 결과 확인은 별도 단계입니다.",
          "sourceStates": [
            "MST_DIFI_07_REVIEW_02",
            "MST_DIFI_07_REVIEW_03",
            "MST_DIFI_07_REVIEW_04"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1059.5,
            "y": 1379.921875
          },
          "noteNumber": 2,
          "message": "승인하시겠습니까? AI 메타 추천이 시작되며 되돌릴 수 없습니다.",
          "noteKey": "02"
        },
        {
          "id": "DIFI_C03_REASON",
          "title": "시험지 폐기",
          "triggerKey": "04",
          "fields": [],
          "buttons": [
            "닫기",
            "취소",
            "폐기"
          ],
          "body": "비고가 비어 있으면 폐기 사유를 입력하라는 안내를 표시합니다. 사유를 보완하기 전에는 최종 폐기 확인으로 진행하지 않습니다.\n모든 문항을 삭제 처리하고 되돌릴 수 없다는 내용을 확인합니다. 취소는 제출하지 않고 폐기는 최종 처리를 요청하며 실제 문서 폐기와 D 재조회가 확인됐습니다.",
          "sourceStates": [
            "MST_DIFI_08_DISCARD_01",
            "MST_DIFI_08_DISCARD_02",
            "MST_DIFI_08_DISCARD_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 989.5,
            "y": 1379.921875
          },
          "noteNumber": 4,
          "message": "폐기하시겠습니까? 모든 문항이 삭제 처리되며 되돌릴 수 없습니다.",
          "noteKey": "04"
        }
      ],
      "page": "03 문항 관리 · 디피니션 문항 등록",
      "order": 19,
      "preserve": false,
      "image": {
        "key": "7664390ac385d9080e90aeb17435307966e82ed3605357f71bc2734282268577",
        "width": 1785,
        "height": 1460,
        "path": "design-specs/revision-captures/difi-review.png"
      },
      "geometry": "revision-captures/difi-review.json",
      "captureLabel": "보존 DOM을 읽기 전용으로 재현",
      "flows": [
        {
          "label": "승인",
          "target": "MST_DIFI_C04",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1059.5,
            "y": 1379.921875
          },
          "action": "검사 통과 → 승인 확인 → 처리 결과"
        }
      ]
    },
    {
      "id": "MST_DIFI_C04",
      "title": "디피니션 상세 · 처리 결과 조회",
      "menu": "디피니션 문항 등록",
      "kind": "detail",
      "mergedScreens": [
        "MST_DIFI_06_DETAIL",
        "MST_DIFI_09_GENERATED",
        "MST_DIFI_10_FAILURE_BOUNDARIES",
        "MST_DIFI_05_UPLOAD"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/2755-definition696-approved-top-visual.png",
      "html": "cms-knowledge/master-cms/sources/definition696-s-approved-final-20261110.html",
      "notes": [
        {
          "key": "01",
          "label": "상태별 기본정보·읽기 전용",
          "body": "기본정보와 비고, 분리 문항 영역을 표시하며 상태에 따라 안내와 조작 가능 여부가 달라집니다. W는 대기, P는 진행, M은 AI 추천, Y는 읽기 전용 결과이고 D는 카드가 남거나 없는 경우, F는 문항이 없는 실패 사례가 있습니다. 안내 문구와 내부 처리 전체의 검증은 구분합니다.",
          "sourceStates": [
            "MST_DIFI_06_DETAIL_01",
            "MST_DIFI_06_DETAIL_02",
            "MST_DIFI_06_DETAIL_03",
            "MST_DIFI_06_DETAIL_05",
            "MST_DIFI_06_DETAIL_06",
            "MST_DIFI_06_DETAIL_07",
            "MST_DIFI_06_DETAIL_08",
            "MST_DIFI_06_DETAIL_09"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "유형별 문항 표현",
          "body": "유형별 표본에서 FIVE는 5개 선지와 정답 ④, ESSAY는 서술형 답안과 풀이 참조, ORDERED는 정답 4, SHORT는 정답 11을 표시했습니다. 채점 기준 표는 해당 콘텐츠가 있을 때 표시합니다. Master 타입 OBSACN·ESBA00·SBMANM·SBSANM의 대응은 확인됐으나 전체 변환·학습자 채점 규칙은 미확정입니다.",
          "sourceStates": [
            "MST_DIFI_09_GENERATED_01",
            "MST_DIFI_09_GENERATED_07",
            "MST_DIFI_09_GENERATED_08",
            "MST_DIFI_09_GENERATED_09",
            "MST_DIFI_09_GENERATED_10",
            "MST_DIFI_09_GENERATED_11"
          ],
          "anchor": {
            "x": 293,
            "y": 621,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "03",
          "label": "본문·선지 이미지와 OMR",
          "body": "본문 이미지 한 개와 선지 이미지 다섯 개의 정상 표시·원본 바이트 일치 및 승인 전후 모델 보존을 확인했습니다. 표시 정답·HTML 채점 모델과 저장 OMR은 별개이며 OMR이 없으면 미리보기 불가 안내로 차단된 사례가 있습니다. 저장 OMR 생성과 서비스 채점의 전체 정책은 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_09_GENERATED_02",
            "MST_DIFI_09_GENERATED_03",
            "MST_DIFI_09_GENERATED_04"
          ],
          "anchor": {
            "x": 293,
            "y": 750,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "04",
          "label": "문항 링크·현재 상태",
          "body": "문항 상세·수정 링크는 문서와 카드의 현재 상태에 따라 달라집니다. 문서 Y와 등록결과 F를 유지한 채 Master가 D로 바뀌자 상세 링크는 남고 수정은 비활성으로 바뀌었습니다. 문서 전체 폐기와 개별 Master 폐기는 서로 다른 동작입니다.\n저장된 임시본이 있으면 저장 시각과 수정할 버전을 선택하는 안내를 표시하는 구조입니다. 임시저장 수정하기·검수완료 수정하기를 제공하며 문서 카드에서 모든 선택 분기의 실제 실행은 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_09_GENERATED_05",
            "MST_DIFI_09_GENERATED_06"
          ],
          "anchor": {
            "h": 32,
            "w": 78.21875,
            "x": 514.78125,
            "y": 707.140625
          },
          "number": 4
        },
        {
          "key": "05",
          "label": "실패·원본 다운로드·지원 한계",
          "body": "빈 ZIP과 다중 JSON ZIP은 문항 없이 실패했지만 각 유형의 동일 JSON 단독 등록은 성공했습니다. 정상 세트·다중 성공·혼합 검수·정확한 실패 원인은 미확정이며 중첩 압축 구조만으로 원인을 단정할 수 없습니다. 실패 상세의 하단 HML 오표기와 원본 수정 후 신규 등록 안내는 남아 있으며 직접 재시도·파일 교체 제어는 확인되지 않았습니다.",
          "sourceStates": [
            "MST_DIFI_10_FAILURE_BOUNDARIES_01",
            "MST_DIFI_10_FAILURE_BOUNDARIES_02",
            "MST_DIFI_10_FAILURE_BOUNDARIES_03",
            "MST_DIFI_10_FAILURE_BOUNDARIES_04",
            "MST_DIFI_05_UPLOAD_05"
          ],
          "anchor": {
            "x": 293,
            "y": 275,
            "w": 20,
            "h": 20
          },
          "number": 5
        }
      ],
      "modals": [
        {
          "id": "DIFI_C04_DRAFT",
          "title": "임시 저장 확인",
          "triggerKey": "04",
          "fields": [
            "임시 저장 시각"
          ],
          "buttons": [
            "닫기(X)",
            "취소",
            "임시저장 수정하기",
            "검수완료 수정하기"
          ],
          "body": "저장된 임시본이 있으면 저장 시각과 수정할 버전을 선택하는 안내를 표시하는 구조입니다. 임시저장 수정하기·검수완료 수정하기를 제공하며 문서 카드에서 모든 선택 분기의 실제 실행은 미검증입니다.",
          "sourceStates": [
            "MST_DIFI_09_GENERATED_05"
          ],
          "anchor": {
            "h": 32,
            "w": 78.21875,
            "x": 514.78125,
            "y": 707.140625
          },
          "noteNumber": 4,
          "message": "에 임시저장한 내용이 있습니다. 어느 버전을 수정하시겠습니까?",
          "noteKey": "04"
        }
      ],
      "page": "03 문항 관리 · 디피니션 문항 등록",
      "order": 20,
      "preserve": false,
      "image": {
        "key": "e914f8637c882e02f76440e4b456c49e30b824de531d26d41b0e6e3b550d004d",
        "width": 1785,
        "height": 1256,
        "path": "design-specs/revision-captures/difi-detail.png"
      },
      "geometry": "revision-captures/difi-detail.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "문항 상세",
          "target": "REV_ITM_02",
          "anchor": {
            "h": 32,
            "w": 78.21875,
            "x": 514.78125,
            "y": 707.140625
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "MST_TWN_C01",
      "title": "쌍둥이 그룹 관리 목록",
      "menu": "쌍둥이 그룹 관리",
      "kind": "list",
      "mergedScreens": [
        "MST_TWN_01"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/1116-twin-all-rows-settled.png",
      "html": "cms-knowledge/master-cms/sources/twin-list-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "조회 중심 목록",
          "body": "그룹 ID·유형·대표 문제·개수·수정자·수정일시와 표시 개수·검색결과·페이지를 표시합니다. 대표 문제는 그룹 상세로 연결되며 별도 검색 필터나 그룹 생성·수정·삭제 제어는 확인되지 않았습니다.",
          "sourceStates": [
            "MST_TWN_01_01"
          ],
          "anchor": {
            "x": 290,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "페이지와 집계",
          "body": "10·30·50·100개씩 보기와 맨 앞·이전·숫자·다음·맨 뒤 이동을 제공합니다. 표시 개수 변경은 1페이지로 조회하도록 설정돼 있습니다. 모든 페이지 왕복과 빈 결과·조회 실패의 고유 화면은 미검증입니다.",
          "sourceStates": [
            "MST_TWN_01_02"
          ],
          "anchor": {
            "x": 800,
            "y": 1000,
            "w": 20,
            "h": 20
          },
          "number": 2
        }
      ],
      "modals": [],
      "page": "04 문항 관리 · 쌍둥이 그룹",
      "order": 21,
      "preserve": false,
      "image": {
        "key": "2d0d6fbf1d4409c0aaf1d0334329e18d03af4ed56127192008ad638e05786749",
        "width": 2200,
        "height": 1100,
        "path": "design-specs/revision-captures/twin-list.png"
      },
      "geometry": "revision-captures/twin-list.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "문제 링크",
          "target": "MST_TWN_C02",
          "anchor": {
            "x": 850,
            "y": 310,
            "w": 20,
            "h": 20
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "MST_TWN_C02",
      "title": "쌍둥이 그룹 상세",
      "menu": "쌍둥이 그룹 관리",
      "kind": "detail",
      "mergedScreens": [
        "MST_TWN_02"
      ],
      "screenshot": "cms-knowledge/master-cms/evidence/1123-twin-single-group-loaded.png",
      "html": "cms-knowledge/master-cms/sources/twin-single-detail-20261109.html",
      "notes": [
        {
          "key": "01",
          "label": "단일 그룹·세트 그룹 표시",
          "body": "그룹 ID·유형·개수·수정자·수정일시를 표시합니다. 단일 그룹은 문항 표를, 세트 그룹은 세트 ID별 카드와 자식 문항 표를 표시합니다. 세트 개수와 자식 문항 행 수는 별개입니다.",
          "sourceStates": [
            "MST_TWN_02_01",
            "MST_TWN_02_02"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "02",
          "label": "문항 이동·목록",
          "body": "문제 링크는 문항 상세를 새 탭으로 열고 단원 경로는 툴팁으로 제공하도록 설정돼 있습니다. 목록 버튼은 페이지·표시 개수 문맥을 보존합니다. 이 그룹 상세에는 관계 해제·그룹 삭제 제어가 없으며 연결 관리는 문항 상세의 쌍둥이 관리 모달에서 제공합니다.",
          "sourceStates": [
            "MST_TWN_02_01",
            "MST_TWN_02_02"
          ],
          "anchor": {
            "x": 400,
            "y": 425,
            "w": 20,
            "h": 20
          },
          "number": 2
        }
      ],
      "modals": [],
      "page": "04 문항 관리 · 쌍둥이 그룹",
      "order": 22,
      "preserve": false,
      "image": {
        "key": "dd23cd1e0e9f07323cb70f6bf0f65b4932506930edf761d34bf0be0efa1aaab7",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/twin-detail.png"
      },
      "geometry": "revision-captures/twin-detail.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "문제 링크",
          "target": "REV_ITM_02",
          "anchor": {
            "x": 850,
            "y": 425,
            "w": 20,
            "h": 20
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_PAP_LIST",
      "title": "평가지 관리",
      "menu": "평가지 관리",
      "kind": "list",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/paper-list-20261109.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/1150-paper-all-seventeen.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/1150-paper-all-seventeen.png",
          "cms-knowledge/master-cms/evidence/1153-paper-list-scroll-middle.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 1542,
          "scrollTops": [
            0,
            527
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/evidence/1152-paper-list-all-geometry.json",
            "cms-knowledge/master-cms/evidence/1154-paper-list-bottom-measure.json"
          ],
          "description": "30개 보기·17행의 캡처 시점 예시입니다. 하단 총건수·페이지 버튼까지 보입니다. 17건을 최신 고정 총계로 쓰지 않습니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 1602
      },
      "notes": [
        {
          "key": "PAP_L01",
          "label": "검색 기준·검색어",
          "body": "검색 기준은 평가지 ID·평가지명·등록자 ID입니다. 검색어를 입력하고 조회하면 조건에 맞는 목록을 표시합니다.",
          "sourceStates": [
            "MST_PAP_LIST_02"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "PAP_L02",
          "label": "교과·단원 필터",
          "body": "교육과정·학교급·과목군·과목·학년·학기·단원 코드로 목록을 필터링합니다. 상위 분류에 따라 하위 선택지가 변경되거나 비활성화될 수 있으며 모든 조합의 결과는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_LIST_02"
          ],
          "anchor": {
            "x": 800,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "PAP_L03",
          "label": "등록기간·상태",
          "body": "등록기간은 직접 입력하거나 7일·30일·90일·전체를 선택합니다. 상태는 전체·초안(R)·사용(Y)·미사용(N)·폐기(D)이며 평가지 상태와 포함 문항의 승인 상태는 별개입니다.",
          "sourceStates": [
            "MST_PAP_LIST_01",
            "MST_PAP_LIST_02"
          ],
          "anchor": {
            "x": 293,
            "y": 280,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "PAP_L04",
          "label": "초기화·조회",
          "body": "초기화는 검색 조건을 기본값으로 되돌리고 조회는 결과 목록을 갱신합니다. 모든 필터 조합과 등록기간 경계의 처리 결과는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_LIST_02",
            "MST_PAP_LIST_03"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 2068,
            "y": 274.140625
          },
          "number": 4
        },
        {
          "key": "PAP_L05",
          "label": "표시 개수·검색결과 수",
          "body": "10·30·50·100개씩 보기를 제공합니다. 검색결과 수와 표시 행은 조회 조건 및 데이터 시점에 따라 달라집니다.",
          "sourceStates": [
            "MST_PAP_LIST_03"
          ],
          "anchor": {
            "x": 293,
            "y": 375,
            "w": 20,
            "h": 20
          },
          "number": 5
        },
        {
          "key": "PAP_L06",
          "label": "목록 표",
          "body": "평가지 ID·평가지명·단원 코드·문항 수·생성 방식·상태·등록자 및 등록일을 표시합니다. HML 검수에서 평가지 등록을 선택해 자동 생성된 사례가 있으며 별도 수동 신규 등록 버튼은 확인되지 않았습니다.",
          "sourceStates": [
            "MST_PAP_LIST_01"
          ],
          "anchor": {
            "x": 293,
            "y": 430,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "PAP_L07",
          "label": "평가지명 링크",
          "body": "평가지명을 선택하면 해당 평가지의 상세로 이동합니다. 이동 링크에 검색 및 페이지 문맥이 포함될 수 있으며 평가지 ID와 상세 버전 ID는 서로 다릅니다.",
          "sourceStates": [
            "MST_PAP_LIST_04"
          ],
          "targetScreen": "REV_PAP_DETAIL",
          "anchor": {
            "x": 600,
            "y": 480,
            "w": 20,
            "h": 20
          },
          "number": 7
        },
        {
          "key": "PAP_L08",
          "label": "하단 페이지 조작부",
          "body": "총건수·현재 표시 범위와 맨 앞·이전·숫자·다음·맨 뒤 페이지 조작부를 제공합니다. 다른 페이지 수에서의 모든 이동 경계는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_LIST_03"
          ],
          "anchor": {
            "x": 1250,
            "y": 1070,
            "w": 20,
            "h": 20
          },
          "number": 8
        }
      ],
      "modals": [],
      "mergedScreenIds": [
        "MST_PAP_LIST"
      ],
      "page": "05 평가지 관리",
      "order": 23,
      "preserve": false,
      "image": {
        "key": "62c91c244ba4fb61bbc8f8c51332ac2d458b01169fce5e9f4a3f0aca9b3485da",
        "width": 2185,
        "height": 1123,
        "path": "design-specs/revision-captures/paper-list.png"
      },
      "geometry": "revision-captures/paper-list.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "평가지명",
          "target": "REV_PAP_DETAIL",
          "anchor": {
            "x": 650,
            "y": 480,
            "w": 20,
            "h": 20
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_PAP_DETAIL",
      "title": "평가지 상세",
      "menu": "평가지 관리",
      "kind": "detail",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/paper-mock-detail-20261109.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/1157-paper-mock-detail.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/1157-paper-mock-detail.png",
          "cms-knowledge/master-cms/evidence/1160-paper-detail-bottom.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 1649,
          "scrollTops": [
            0,
            634
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/evidence/1159-paper-detail-geometry.json",
            "cms-knowledge/master-cms/evidence/1161-paper-detail-bottom-measure.json"
          ],
          "description": "기본 프레임은341(374)의 단건+3자식 세트 예시를 그대로 사용합니다. 하단4행과 목록·수정까지 직접 확인했습니다. 최신 자체1094(1191) 값으로 과거 캡처를 덮어쓰지 않습니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 1709
      },
      "notes": [
        {
          "key": "PAP_D01",
          "label": "평가지 ID·평가지명",
          "body": "평가지 ID·평가지명·상태·생성 방식을 읽기 전용으로 표시합니다. 평가지 ID와 상세 버전 ID를 구분해 표시합니다.",
          "sourceStates": [
            "MST_PAP_DETAIL_01",
            "MST_PAP_DETAIL_02"
          ],
          "anchor": {
            "x": 414,
            "y": 240,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "PAP_D02",
          "label": "상태",
          "body": "초안은 수정할 수 있지만 배포하기는 비활성이고 ‘사용 평가지만 배포할 수 있습니다.’를 안내합니다. 확인한 폐기 상태에서는 수정과 배포가 비활성입니다.",
          "sourceStates": [
            "MST_PAP_DETAIL_05",
            "MST_PAP_STATUS_01"
          ],
          "anchor": {
            "x": 414,
            "y": 283,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "PAP_D03",
          "label": "단원·문제 구성·문항 수",
          "body": "포함 문항의 단원 목록·형태별 개수·문항 수를 표시합니다. 단건·세트·대형 평가지에서도 같은 정보 구조를 사용하며 구성에 따라 목록 길이가 달라집니다.",
          "sourceStates": [
            "MST_PAP_DETAIL_02",
            "MST_PAP_DETAIL_03",
            "MST_PAP_DETAIL_04"
          ],
          "anchor": {
            "x": 414,
            "y": 325,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "PAP_D04",
          "label": "등록·시험지·출처",
          "body": "등록자 및 등록일·원본 시험지·출처·페이지·용도를 표시합니다. 출처는 복수로 표시될 수 있고 용도는 공통(C)·교사용(T)입니다.",
          "sourceStates": [
            "MST_PAP_DETAIL_02"
          ],
          "anchor": {
            "x": 1150,
            "y": 235,
            "w": 20,
            "h": 20
          },
          "number": 4
        },
        {
          "key": "PAP_D05",
          "label": "시험지 원본 링크",
          "body": "시험지 ID와 파일명을 선택하면 연결된 HML 상세로 이동합니다. 해당 상세의 원본 다운로드 주소로 파일을 취득하고 원본과의 일치를 확인한 사례가 있습니다. 평가지 PDF 생성 기능과 다운로드 오류·권한별 처리는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_ORIGINAL_01",
            "MST_PAP_ORIGINAL_02",
            "MST_PAP_ORIGINAL_03"
          ],
          "externalTarget": "HML 문항 등록 > 문서 상세의 원본 다운로드",
          "anchor": {
            "x": 1150,
            "y": 275,
            "w": 20,
            "h": 20
          },
          "number": 5
        },
        {
          "key": "PAP_D06",
          "label": "서비스별 배포 표",
          "body": "AI출제마법사 CMS와 개발 서비스의 배포 버전·승인 여부·서비스 상태·최근 배포·배포 정보를 표시합니다. ‘미배포 문항 N건 조회’는 해당 문항 ID로 Master 전체 문항 목록을 여는 진단 링크입니다.",
          "sourceStates": [
            "MST_PAP_DEPLOY_01",
            "MST_PAP_DEPLOY_03"
          ],
          "externalTarget": "문항 관리 > 전체 문항",
          "anchor": {
            "x": 293,
            "y": 600,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "PAP_D07",
          "label": "배포하기",
          "body": "사용(Y) 상태에서 배포하기를 누르면 배포 모달을 엽니다. 사용 상태여도 대상별 조건에 따라 대상 선택과 최종 배포가 비활성일 수 있습니다.\n사용 상태에서 열리는 배포 확인창이며 포함 문항과 대상별 가능 여부를 표시합니다. 확인한 두 대상은 미배포 문항 때문에 선택할 수 없었고 최종 배포도 비활성이었습니다. 선택 가능한 대상·재배포 안내·응답 처리 분기는 소스만 확인했으며 실제 배포는 실행하지 않았습니다.",
          "sourceStates": [
            "MST_PAP_STATUS_01",
            "MST_PAP_DEPLOY_02",
            "MST_PAP_DEPLOY_04",
            "MST_PAP_DEPLOY_05",
            "MST_PAP_DEPLOY_06"
          ],
          "anchor": {
            "h": 40,
            "w": 108,
            "x": 1648,
            "y": 525.140625
          },
          "number": 7
        },
        {
          "key": "PAP_D08",
          "label": "포함 문항 표",
          "body": "순서·문항 ID·문제·형태·난이도·단원 코드·문항 상태를 표시합니다. 세트 자식은 여러 행으로 이어지며 지문 ID가 함께 표시됩니다. 문제를 선택하면 해당 문항 상세로 이동합니다.",
          "sourceStates": [
            "MST_PAP_DETAIL_02",
            "MST_PAP_DETAIL_03",
            "MST_PAP_DETAIL_04"
          ],
          "externalTarget": "문항 관리 > 문항 상세",
          "anchor": {
            "x": 293,
            "y": 790,
            "w": 20,
            "h": 20
          },
          "number": 8
        },
        {
          "key": "PAP_D09",
          "label": "목록",
          "body": "목록을 누르면 평가지 목록으로 돌아갑니다. 링크에 검색 조건과 페이지 문맥이 유지될 수 있습니다.",
          "sourceStates": [
            "MST_PAP_LIST_04"
          ],
          "targetScreen": "REV_PAP_LIST",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 877.140625
          },
          "number": 9
        },
        {
          "key": "PAP_D10",
          "label": "수정",
          "body": "수정을 누르면 수정 가능한 평가지의 수정 폼으로 이동합니다. 폐기 상태에서는 수정이 비활성 텍스트로 표시됩니다.",
          "sourceStates": [
            "MST_PAP_DETAIL_05"
          ],
          "targetScreen": "REV_PAP_EDIT",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 877.140625
          },
          "number": 10
        }
      ],
      "modals": [
        {
          "id": "REV_PAP_DEPLOY",
          "title": "평가지 배포",
          "triggerKey": "PAP_D07",
          "fields": [
            "포함 문항 수와 전체 배포 안내",
            "Master 폐기 문항 제외 안내",
            "배포 대상: AI출제마법사 CMS / 개발 서비스",
            "대상별 가능/불가 사유",
            "재배포 안내(소스 분기)"
          ],
          "buttons": [
            "닫기",
            "취소",
            "배포"
          ],
          "body": "사용 상태에서 열리는 배포 확인창이며 포함 문항과 대상별 가능 여부를 표시합니다. 확인한 두 대상은 미배포 문항 때문에 선택할 수 없었고 최종 배포도 비활성이었습니다. 선택 가능한 대상·재배포 안내·응답 처리 분기는 소스만 확인했으며 실제 배포는 실행하지 않았습니다.",
          "sourceStates": [
            "MST_PAP_DEPLOY_02",
            "MST_PAP_DEPLOY_04",
            "MST_PAP_DEPLOY_05",
            "MST_PAP_DEPLOY_06"
          ],
          "condition": "평가지 상태Y에서 진입. 대표 기본 캡처의R 비활성 버튼에는 ‘사용 상태일 때’ 조건을 붙인 화살표로 연결합니다.",
          "reference": {
            "html": "cms-knowledge/master-cms/sources/paper-used-deploy-dialog-20261109.html",
            "screenshot": "cms-knowledge/master-cms/evidence/1226-paper-used-deploy-dialog.png"
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 108,
            "x": 1648,
            "y": 525.140625
          },
          "noteNumber": 7,
          "message": "",
          "noteKey": "PAP_D07"
        }
      ],
      "mergedScreenIds": [
        "MST_PAP_DETAIL",
        "MST_PAP_STATUS",
        "MST_PAP_ORIGINAL",
        "MST_PAP_DEPLOY",
        "MST_PAP_LIST"
      ],
      "page": "05 평가지 관리",
      "order": 24,
      "preserve": false,
      "image": {
        "key": "fb0646ee11def866a4f0f070519e384c7a55c1e0ce9a524f40da8976d19879b8",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/paper-detail.png"
      },
      "geometry": "revision-captures/paper-detail.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "수정",
          "target": "REV_PAP_EDIT",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 877.140625
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_PAP_EDIT",
      "title": "평가지 수정",
      "menu": "평가지 관리",
      "kind": "edit",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/paper-mock-modify-20261109.html",
          "cms-knowledge/master-cms/sources/own-paper1094-modify-set-policy-20261110.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/1165-paper-modify-state.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/1165-paper-modify-state.png",
          "cms-knowledge/master-cms/evidence/1168-paper-modify-bottom.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 1480,
          "scrollTops": [
            0,
            465
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/evidence/1167-paper-modify-geometry.json",
            "cms-knowledge/master-cms/evidence/1168-paper-modify-bottom.json"
          ],
          "description": "대표341의4문항 폼입니다. 하단 문항 추가·단건/세트 손잡이·제외·취소·저장까지 직접 확인했습니다. 두 HTML을 서로 다른 데이터로 섞지 않고341의 구조를 기본으로 사용합니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 1540
      },
      "notes": [
        {
          "key": "PAP_E01",
          "label": "평가지명",
          "body": "평가지명은 필수이며 최대255자까지 입력합니다. 이름을 비우고 저장하면 ‘미입력 정보가 있습니다.’ 안내로 차단됩니다.",
          "sourceStates": [
            "MST_PAP_EDIT_01",
            "MST_PAP_VALIDATION_01"
          ],
          "anchor": {
            "h": 40,
            "w": 590.25,
            "x": 414.25,
            "y": 275.140625
          },
          "number": 1
        },
        {
          "key": "PAP_E02",
          "label": "상태",
          "body": "초안(R)·사용(Y)·미사용(N)·폐기(D)를 선택합니다. 실패 문항을 포함한 사용 전환은 실제로 반려됐고 승인 문항만 남긴 사용 저장은 성공했습니다. 미사용(N) 최종 저장과 새 평가지의 폐기(D) 최종 제출은 미검증입니다.",
          "sourceStates": [
            "MST_PAP_EDIT_02",
            "MST_PAP_STATUS_02",
            "MST_PAP_STATUS_03",
            "MST_PAP_STATUS_04"
          ],
          "anchor": {
            "h": 13,
            "w": 13,
            "x": 414.25,
            "y": 323.140625
          },
          "number": 2
        },
        {
          "key": "PAP_E03",
          "label": "페이지 시작·끝",
          "body": "시작·끝 페이지는 기본적으로 필수이며 최솟값은1입니다. 시작 페이지를 비우고 저장하면 안내 후 차단됩니다. 확인한 초안에서는2~1 역순 범위가 저장됐고 이후1~1로 복원됐습니다. 다른 상태·범위의 수용 정책은 미검증입니다.",
          "sourceStates": [
            "MST_PAP_VALIDATION_02",
            "MST_PAP_VALIDATION_03",
            "MST_PAP_VALIDATION_04"
          ],
          "anchor": {
            "h": 40,
            "w": 147.5625,
            "x": 1157.75,
            "y": 323.140625
          },
          "number": 3
        },
        {
          "key": "PAP_E04",
          "label": "용도",
          "body": "용도는 공통(C)·교사용(T) 중 필수로 선택합니다. 평가지 상태나 출처의 사용 여부와는 다른 값입니다.",
          "sourceStates": [
            "MST_PAP_EDIT_01"
          ],
          "anchor": {
            "h": 20,
            "w": 20,
            "x": 1157.75,
            "y": 377.140625
          },
          "number": 4
        },
        {
          "key": "PAP_E05",
          "label": "표시 전용 정보·요약",
          "body": "생성 방식·등록·시험지·출처는 표시 정보입니다. 단원·형태·문항 수는 현재 포함 문항으로 갱신되며 로컬 요약의 변화가 서버 저장 완료를 뜻하지는 않습니다.",
          "sourceStates": [
            "MST_PAP_EDIT_03"
          ],
          "anchor": {
            "x": 414,
            "y": 430,
            "w": 20,
            "h": 20
          },
          "number": 5
        },
        {
          "key": "PAP_E06",
          "label": "포함 문항 표·문제 링크",
          "body": "포함 문항 정보를 확인하고 문제를 선택해 개별 상세로 이동합니다. 세트에는 공용 손잡이와 제외 버튼이 한 개씩 있으며 자식별 부분 제외 버튼은 확인되지 않았습니다.",
          "sourceStates": [
            "MST_PAP_EDIT_01"
          ],
          "externalTarget": "문항 관리 > 문항 상세",
          "anchor": {
            "x": 293,
            "y": 600,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "PAP_E07",
          "label": "그룹 정렬 손잡이",
          "body": "손잡이로 단건 또는 세트 그룹을 이동하며 세트 내부 순서는 유지됩니다. 순서 저장·재진입·원복을 실제로 확인했습니다. 실제 포인터 드래그도 확인했으며 해당 드래그 결과는 저장하지 않고 취소했습니다.",
          "sourceStates": [
            "MST_PAP_ORDER_01",
            "MST_PAP_ORDER_02",
            "MST_PAP_ORDER_03",
            "MST_PAP_ORDER_04"
          ],
          "anchor": {
            "x": 305,
            "y": 645,
            "w": 20,
            "h": 20
          },
          "number": 7
        },
        {
          "key": "PAP_E08",
          "label": "문항 추가",
          "body": "문항 추가를 누르면 후보 검색·선택 모달을 엽니다. 선택한 후보가 없으면 추가 버튼은 비활성입니다.\n기본 상태는 승인(사용)·승인(미사용)이며 초기화와 조회는 별도입니다. 세트 자식 하나를 선택해도 전체 세트가 한 그룹으로 추가된 결과를 확인했습니다. 이미 포함된 단건·형제는 ‘이미 포함됨’으로 선택을 차단합니다. 추가는 로컬 변경이며 최종 저장 전까지 현재본은 유지됩니다.",
          "sourceStates": [
            "MST_PAP_ADD_01",
            "MST_PAP_ADD_02",
            "MST_PAP_ADD_03",
            "MST_PAP_ADD_04",
            "MST_PAP_ADD_05",
            "MST_PAP_ADD_06",
            "MST_PAP_ADD_07",
            "MST_PAP_ADD_08"
          ],
          "anchor": {
            "h": 40,
            "w": 112.921875,
            "x": 1643.078125,
            "y": 541.140625
          },
          "number": 8
        },
        {
          "key": "PAP_E09",
          "label": "그룹 제외",
          "body": "제외를 누르면 단건 또는 세트 전체의 제외 여부를 확인합니다. 확인 후에는 로컬 구성에서 빠지며 최소1그룹을 유지합니다. 마지막 그룹이 단건이든4문항 세트이든 제외 버튼은 비활성입니다.\n확인하면 단건 또는 세트 그룹 전체를 로컬 구성에서 제외하고 순서·요약을 갱신합니다. 취소하면 해당 그룹을 유지하며 마지막 그룹은 제외 버튼이 비활성입니다. 평가지 구성에서의 제외이며 Master 문항 삭제는 아닙니다.",
          "sourceStates": [
            "MST_PAP_REMOVE_04",
            "MST_PAP_REMOVE_05",
            "MST_PAP_REMOVE_01",
            "MST_PAP_REMOVE_02",
            "MST_PAP_REMOVE_03"
          ],
          "anchor": {
            "h": 40,
            "w": 40,
            "x": 1720.203125,
            "y": 639.140625
          },
          "number": 9
        },
        {
          "key": "PAP_E10",
          "label": "취소",
          "body": "취소를 누르면 저장하지 않고 이동할지 확인합니다. 로컬 제외·정렬을 취소해 저장된 현재본을 보존한 사례가 있습니다. 모든 브라우저 이탈에 동일한 보호가 적용되는지는 미검증입니다.\n‘저장 하지 않고 이동’을 선택하면 로컬 변경을 저장하지 않고 상세로 돌아갑니다. 실제 문항 제외·정렬을 취소한 뒤 현재본 보존을 확인했습니다. 취소·닫기로 머무는 경로는 소스에서 확인했으며 모든 값 보존과 모든 이탈 경로는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_CANCEL_04",
            "MST_PAP_CANCEL_01",
            "MST_PAP_CANCEL_02",
            "MST_PAP_CANCEL_03"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 708.140625
          },
          "number": 10
        },
        {
          "key": "PAP_E11",
          "label": "저장",
          "body": "일반 저장은 별도 확인창 없이 제출합니다. 폐기(D)는 폼 유효성 통과 후 ‘평가지 저장’ 확인창을 엽니다. 이름·페이지·문항 구성·순서의 저장과 복원을 실제 재조회로 확인했습니다. 값을 복원해도 새 상세 버전 이력은 남습니다.\n상태D를 선택하면 페이지 필수 조건을 해제하고 유효한 폼의 저장 시 ‘평가지 저장’ 확인창을 엽니다. ‘폐기한 평가지는 다시 수정할 수 없습니다.’를 안내합니다. 최종 폐기는 취소했으므로 새 폐기 저장 결과는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_SAVE_01",
            "MST_PAP_SAVE_02",
            "MST_PAP_SAVE_03",
            "MST_PAP_SAVE_04",
            "MST_PAP_STATUS_05"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 708.140625
          },
          "number": 11
        }
      ],
      "modals": [
        {
          "id": "REV_PAP_ADD",
          "title": "문항 추가",
          "triggerKey": "PAP_E08",
          "fields": [
            "문항 ID/지문/문제/등록자 ID/원본 파일명 검색",
            "교육과정·학교급·과목군·과목·학년·학기·난이도·형태1~3·상태 필터",
            "결과: 선택·문항 ID·문제·형태/난이도·단원 코드·문항 상태·선택 불가 사유",
            "후보 선택·전체 선택",
            "사용/미사용·같은 출처·세트 단위 추가 안내"
          ],
          "buttons": [
            "닫기",
            "초기화",
            "조회",
            "취소",
            "추가"
          ],
          "body": "기본 상태는 승인(사용)·승인(미사용)이며 초기화와 조회는 별도입니다. 세트 자식 하나를 선택해도 전체 세트가 한 그룹으로 추가된 결과를 확인했습니다. 이미 포함된 단건·형제는 ‘이미 포함됨’으로 선택을 차단합니다. 추가는 로컬 변경이며 최종 저장 전까지 현재본은 유지됩니다.",
          "sourceStates": [
            "MST_PAP_ADD_01",
            "MST_PAP_ADD_02",
            "MST_PAP_ADD_03",
            "MST_PAP_ADD_04",
            "MST_PAP_ADD_05",
            "MST_PAP_ADD_06",
            "MST_PAP_ADD_07",
            "MST_PAP_ADD_08"
          ],
          "reference": {
            "html": "cms-knowledge/master-cms/sources/paper-item-add-modal-20261109.html",
            "screenshot": "cms-knowledge/master-cms/evidence/3010-own-paper1094-set242-search-result.png"
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 112.921875,
            "x": 1643.078125,
            "y": 541.140625
          },
          "noteNumber": 8,
          "message": "이미 포함됨",
          "actual": {
            "image": {
              "key": "234c200061b78a3148ce2d520ff703961e4d1f4bb99d8563c8949ed61e9b2b6c",
              "width": 1800,
              "height": 1100,
              "path": "design-specs/revision-captures/modal-paper-add.png"
            },
            "crop": {
              "h": 1044,
              "w": 1140,
              "x": 330,
              "y": 28
            },
            "controls": [
              {
                "box": {
                  "h": 32,
                  "w": 32,
                  "x": 16,
                  "y": 12
                },
                "href": null,
                "id": "sidebarToggle",
                "name": null,
                "tag": "BUTTON",
                "text": "메뉴",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 192.65625,
                  "x": 52,
                  "y": 18
                },
                "href": "/main.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문제은행 마스터 CMS",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 72
                },
                "href": "/main.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "홈",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 116
                },
                "href": "#menu-ITEM",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문항 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 160
                },
                "href": "/paper/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "평가지 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 204
                },
                "href": "/product/list.donga?curriculum=22",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "문항 출처 관리",
                "type": ""
              },
              {
                "box": {
                  "h": 44,
                  "w": 240,
                  "x": 8,
                  "y": 248
                },
                "href": "/lab/index.donga",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "랩",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 108,
                  "x": 1676,
                  "y": 8
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "로그아웃",
                "type": "button"
              },
              {
                "box": {
                  "h": 28,
                  "w": 1497,
                  "x": 272,
                  "y": 105.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H2",
                "text": "평가지 수정"
              },
              {
                "box": {
                  "h": 65,
                  "w": 1495,
                  "x": 273,
                  "y": 150.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "기본 정보"
              },
              {
                "box": {
                  "h": 24,
                  "w": 69.625,
                  "x": 293,
                  "y": 170.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "기본 정보"
              },
              {
                "box": {
                  "h": 40,
                  "w": 590.25,
                  "x": 414.25,
                  "y": 275.140625
                },
                "href": null,
                "id": "",
                "name": "paperName",
                "tag": "INPUT",
                "text": "QA-HML-20261109-02-SET4-SINGLE1",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.0625,
                  "x": 414.25,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "초안"
              },
              {
                "box": {
                  "h": 13,
                  "w": 13,
                  "x": 414.25,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": "viewFlag",
                "tag": "INPUT",
                "text": "R",
                "type": "radio"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.0625,
                  "x": 560.3125,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "사용"
              },
              {
                "box": {
                  "h": 13,
                  "w": 13,
                  "x": 560.3125,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": "viewFlag",
                "tag": "INPUT",
                "text": "Y",
                "type": "radio"
              },
              {
                "box": {
                  "h": 40,
                  "w": 152.0625,
                  "x": 706.375,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "미사용"
              },
              {
                "box": {
                  "h": 13,
                  "w": 13,
                  "x": 706.375,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": "viewFlag",
                "tag": "INPUT",
                "text": "N",
                "type": "radio"
              },
              {
                "box": {
                  "h": 40,
                  "w": 138.0625,
                  "x": 866.4375,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "폐기"
              },
              {
                "box": {
                  "h": 13,
                  "w": 13,
                  "x": 866.4375,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": "viewFlag",
                "tag": "INPUT",
                "text": "D",
                "type": "radio"
              },
              {
                "box": {
                  "h": 20,
                  "w": 302.265625,
                  "x": 1157.75,
                  "y": 241.140625
                },
                "href": "/item/hml/detail.donga?examDocumentId=665",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "665 | QA-HML-20261109-02-SET4-SINGLE1.hml",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 147.5625,
                  "x": 1157.75,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": "startPageNum",
                "tag": "INPUT",
                "text": "예: 24",
                "type": "number"
              },
              {
                "box": {
                  "h": 40,
                  "w": 147.5625,
                  "x": 1331.125,
                  "y": 323.140625
                },
                "href": null,
                "id": "",
                "name": "endPageNum",
                "tag": "INPUT",
                "text": "예: 25",
                "type": "number"
              },
              {
                "box": {
                  "h": 20,
                  "w": 60,
                  "x": 1157.75,
                  "y": 377.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "공통"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 1157.75,
                  "y": 377.140625
                },
                "href": null,
                "id": "",
                "name": "serviceUsage",
                "tag": "INPUT",
                "text": "C",
                "type": "radio"
              },
              {
                "box": {
                  "h": 20,
                  "w": 74,
                  "x": 1233.75,
                  "y": 377.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "교사용"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 1233.75,
                  "y": 377.140625
                },
                "href": null,
                "id": "",
                "name": "serviceUsage",
                "tag": "INPUT",
                "text": "T",
                "type": "radio"
              },
              {
                "box": {
                  "h": 65,
                  "w": 1495,
                  "x": 273,
                  "y": 529.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "DIV",
                "text": "포함 문항 (1)\n문항 추가"
              },
              {
                "box": {
                  "h": 24,
                  "w": 96,
                  "x": 293,
                  "y": 549.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H3",
                "text": "포함 문항 (1)"
              },
              {
                "box": {
                  "h": 40,
                  "w": 112.921875,
                  "x": 1643.078125,
                  "y": 541.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "문항 추가",
                "type": "button"
              },
              {
                "box": {
                  "h": 18,
                  "w": 1269.984375,
                  "x": 554.09375,
                  "y": 650.140625
                },
                "href": "/item/all/detail.donga?itemId=2089238",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "행렬 $\\left(\\begin{gathered}2&amp;~4 \\\\ -3&amp;~0 \\\\ 5&amp;~1\\end{gathered}\\right)$에 대하여 다음을 구하시오.(1) $(3,~2)$ 성분(2) 제 $2$행의 모든 성분의 합(3) 제 $1$열의 모든 성분의 합",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 1720.203125,
                  "y": 639.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "제외",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 954.5,
                  "y": 708.140625
                },
                "href": "/paper/detail.donga?paperId=1094&pageNum=1&pageSize=10",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "취소",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1024.5,
                  "y": 708.140625
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "저장",
                "type": "button"
              },
              {
                "box": {
                  "h": 22.84375,
                  "w": 89.625,
                  "x": 355,
                  "y": 45.078125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "H5",
                "text": "문항 추가"
              },
              {
                "box": {
                  "h": 40,
                  "w": 40,
                  "x": 452.625,
                  "y": 36.5
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "안내",
                "type": "button"
              },
              {
                "box": {
                  "h": 56,
                  "w": 56,
                  "x": 1413,
                  "y": 29
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "Close",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 113.015625,
                  "x": 376,
                  "y": 130
                },
                "href": null,
                "id": "",
                "name": "keywordType",
                "tag": "SELECT",
                "text": "문항 ID\n지문\n문제\n등록자 ID\n원본 파일명",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 193.15625,
                  "x": 497.015625,
                  "y": 130
                },
                "href": null,
                "id": "",
                "name": "keyword",
                "tag": "INPUT",
                "text": "문항 ID / 지문 / 문제 / 등록자 / 원본 파일명",
                "type": "text"
              },
              {
                "box": {
                  "h": 40,
                  "w": 114.3125,
                  "x": 698.171875,
                  "y": 130
                },
                "href": null,
                "id": "paperItemCurriculumSelect",
                "name": "curriculum",
                "tag": "SELECT",
                "text": "교육과정 전체\n22\n15",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 114.296875,
                  "x": 820.484375,
                  "y": 130
                },
                "href": null,
                "id": "",
                "name": "classType",
                "tag": "SELECT",
                "text": "학교급 전체\n초등\n중학\n고등",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 114.3125,
                  "x": 942.78125,
                  "y": 130
                },
                "href": null,
                "id": "paperItemSubjectCategorySelect",
                "name": "subjectCategory",
                "tag": "SELECT",
                "text": "과목군 전체\n수학군",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 114.296875,
                  "x": 1065.09375,
                  "y": 130
                },
                "href": null,
                "id": "",
                "name": "subject",
                "tag": "SELECT",
                "text": "과목 전체\n수학\n수학\n공통수학1\n공통수학2\n기본수학1\n기본수학2\n수학1\n수학2\n대수\n미적분1\n미적분2\n확률과통계\n기하\n직무수학\n인공지능수학\n수학과 문화\n수학",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 114.3125,
                  "x": 1187.390625,
                  "y": 130
                },
                "href": null,
                "id": "",
                "name": "grade",
                "tag": "SELECT",
                "text": "학년 전체\n중학1\n고등1\n초등1\n중학2\n초등2\n고등2\n고등3\n중학3\n초등3\n고등 공통\n초등4\n초등5\n초등6",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 114.296875,
                  "x": 1309.703125,
                  "y": 130
                },
                "href": null,
                "id": "",
                "name": "term",
                "tag": "SELECT",
                "text": "학기 전체\n공통학기\n1학기\n2학기",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 136.234375,
                  "x": 376,
                  "y": 178
                },
                "href": null,
                "id": "",
                "name": "difficulty",
                "tag": "SELECT",
                "text": "난이도 전체\n최상\n상\n중\n하\n최하",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 136.234375,
                  "x": 520.234375,
                  "y": 178
                },
                "href": null,
                "id": "",
                "name": "questionTypeCategory",
                "tag": "SELECT",
                "text": "형태1 전체\n객관식\n주관식\n서술형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 136.234375,
                  "x": 664.46875,
                  "y": 178
                },
                "href": null,
                "id": "",
                "name": "questionAnswerType",
                "tag": "SELECT",
                "text": "형태2 전체\n단답형\n다답형\n단답형\n다답형\n기본형\n단답형\n다답형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 40,
                  "w": 136.234375,
                  "x": 808.703125,
                  "y": 178
                },
                "href": null,
                "id": "",
                "name": "questionType",
                "tag": "SELECT",
                "text": "형태3 전체\nN지 선다\nO/X 형\nN지 선다\nO/X 형\n일반형\n그리기형\n영역 선택형\n일반형\n영역선택형\n선그리기형\n드래그앤 드롭형\n기본 서술형\n단답 서술형\n다답 서술형",
                "type": "select-one"
              },
              {
                "box": {
                  "h": 20,
                  "w": 60,
                  "x": 416.5,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "전체"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 416.5,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "on",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 20,
                  "w": 60,
                  "x": 508.5,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "초안"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 508.5,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": "statuses",
                "tag": "INPUT",
                "text": "R",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 20,
                  "w": 110.53125,
                  "x": 600.5,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "실패(재등록)"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 600.5,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": "statuses",
                "tag": "INPUT",
                "text": "F",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 20,
                  "w": 96.53125,
                  "x": 743.03125,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "승인(사용)"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 743.03125,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": "statuses",
                "tag": "INPUT",
                "text": "Y",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 20,
                  "w": 110.53125,
                  "x": 871.5625,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "승인(미사용)"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 871.5625,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": "statuses",
                "tag": "INPUT",
                "text": "N",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 20,
                  "w": 60,
                  "x": 1014.09375,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "LABEL",
                "text": "폐기"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 1014.09375,
                  "y": 236
                },
                "href": null,
                "id": "",
                "name": "statuses",
                "tag": "INPUT",
                "text": "D",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 40,
                  "w": 94,
                  "x": 1245.078125,
                  "y": 226
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "초기화",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 80,
                  "x": 1344,
                  "y": 226
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "조회",
                "type": "button"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 340
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "전체 선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 399.703125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 605.78125,
                  "x": 552.609375,
                  "y": 399.5
                },
                "href": "/item/all/detail.donga?itemId=2089245",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "$\\left(\\begin{gathered}3&amp;~-2&amp;~0 \\\\ 1&amp;~5&amp;~-3\\end{gathered}\\right)$",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 479.703125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 474.21875,
                  "x": 552.609375,
                  "y": 479.5
                },
                "href": "/item/all/detail.donga?itemId=2089244",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "$\\left(\\begin{gathered}1&amp;~0 \\\\ 0&amp;~1\\end{gathered}\\right)$",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 559.703125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 148.96875,
                  "x": 552.609375,
                  "y": 559.5
                },
                "href": "/item/all/detail.donga?itemId=2089243",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "$\\left( -2~4~3\\right)$",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 639.703125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 354.140625,
                  "x": 552.609375,
                  "y": 639.5
                },
                "href": "/item/all/detail.donga?itemId=2089242",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "$\\left(\\begin{gathered}2 \\\\ 3\\end{gathered}\\right)$",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 712.203125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 629.671875,
                  "x": 552.609375,
                  "y": 712
                },
                "href": "/item/all/detail.donga?itemId=2087796",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "$x ^{3} +5x ^{2} +(k-5)x-k-1=0$의 근이 모두 실수가 되도록 하는 실수 $k$의 값의 범위를 구하시오.",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 777.203125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 796.59375,
                  "x": 552.609375,
                  "y": 777
                },
                "href": "/item/all/detail.donga?itemId=2087795",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "삼차방정식 $x^{3} -3x^{2} +ax +b=0$의 한 근이 $1+ \\sqrt{2}i$일 때, 두 실수 $a$, $b$의 값과 나머지 두 근을 각각 구하시오.",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 842.203125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 544.96875,
                  "x": 552.609375,
                  "y": 842
                },
                "href": "/item/all/detail.donga?itemId=2087789",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "사차방정식 $x^{4} + x^{3} -7x^{2} -x +6=0$의 모든 근의 곱은?$-12$$-6$$1$$6$$12$",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 907.203125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 808.203125,
                  "x": 552.609375,
                  "y": 907
                },
                "href": "/item/all/detail.donga?itemId=2087788",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "삼차방정식 $x^{3} -x^{2} +2x +4=0$의 두 허근을 $\\alpha$, $\\beta$라고 할 때, $\\alpha ^{2} + \\beta ^{2}$의 값을 구하시오.",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 972.203125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 914.328125,
                  "x": 552.609375,
                  "y": 972
                },
                "href": "/item/all/detail.donga?itemId=2087787",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "삼차방정식 $x^{3} - 4x^{2} +8=0$의 세 실근 중 가장 큰 근을 $\\alpha$, 가장 작은 근을 $\\beta$라고 할 때, $\\alpha - \\beta$의 값을 구하시오.",
                "type": ""
              },
              {
                "box": {
                  "h": 20,
                  "w": 20,
                  "x": 376,
                  "y": 1037.203125
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "INPUT",
                "text": "선택",
                "type": "checkbox"
              },
              {
                "box": {
                  "h": 18,
                  "w": 900.53125,
                  "x": 552.609375,
                  "y": 1037
                },
                "href": "/item/all/detail.donga?itemId=2087755",
                "id": "",
                "name": null,
                "tag": "A",
                "text": "$\\dfrac{5}{24} \\times n$, $\\dfrac{7}{30} \\times n$의 값이 모두 자연수가 되도록 하는 자연수 $n$의 값 중 가장 작은 수를 구하시오. [$6$점]+",
                "type": ""
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1309,
                  "y": 1122
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "취소",
                "type": "button"
              },
              {
                "box": {
                  "h": 40,
                  "w": 62,
                  "x": 1383,
                  "y": 1122
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "추가",
                "type": "button"
              },
              {
                "box": {
                  "h": 24.5,
                  "w": 24.5,
                  "x": 969.125,
                  "y": 98
                },
                "href": null,
                "id": "",
                "name": null,
                "tag": "BUTTON",
                "text": "닫기",
                "type": "button"
              }
            ]
          },
          "noteKey": "PAP_E08"
        },
        {
          "id": "REV_PAP_REMOVE",
          "title": "문항 제외",
          "triggerKey": "PAP_E09",
          "fields": [
            "제외 대상: 문항 ID 또는 지문 ID·문항 수"
          ],
          "buttons": [
            "닫기",
            "취소",
            "제외"
          ],
          "body": "확인하면 단건 또는 세트 그룹 전체를 로컬 구성에서 제외하고 순서·요약을 갱신합니다. 취소하면 해당 그룹을 유지하며 마지막 그룹은 제외 버튼이 비활성입니다. 평가지 구성에서의 제외이며 Master 문항 삭제는 아닙니다.",
          "sourceStates": [
            "MST_PAP_REMOVE_01",
            "MST_PAP_REMOVE_02",
            "MST_PAP_REMOVE_03",
            "MST_PAP_REMOVE_04",
            "MST_PAP_REMOVE_05"
          ],
          "reference": {
            "html": "cms-knowledge/master-cms/sources/own-paper1094-modify-set-policy-20261110.html",
            "screenshot": "cms-knowledge/master-cms/evidence/3022-own-paper1094-remove-set-dialog-read.png"
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 40,
            "x": 1720.203125,
            "y": 639.140625
          },
          "noteNumber": 9,
          "message": "",
          "noteKey": "PAP_E09"
        },
        {
          "id": "REV_PAP_CANCEL",
          "title": "평가지 수정 취소",
          "triggerKey": "PAP_E10",
          "fields": [
            "저장하지 않고 이동하시겠습니까?"
          ],
          "buttons": [
            "닫기",
            "취소",
            "저장 하지 않고 이동"
          ],
          "body": "‘저장 하지 않고 이동’을 선택하면 로컬 변경을 저장하지 않고 상세로 돌아갑니다. 실제 문항 제외·정렬을 취소한 뒤 현재본 보존을 확인했습니다. 취소·닫기로 머무는 경로는 소스에서 확인했으며 모든 값 보존과 모든 이탈 경로는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_CANCEL_01",
            "MST_PAP_CANCEL_02",
            "MST_PAP_CANCEL_03"
          ],
          "reference": {
            "html": "cms-knowledge/master-cms/sources/paper-mock-modify-20261109.html",
            "screenshot": "cms-knowledge/master-cms/evidence/1212-paper-original-detail-restored.png"
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 708.140625
          },
          "noteNumber": 10,
          "message": "",
          "noteKey": "PAP_E10"
        },
        {
          "id": "REV_PAP_DISCARD",
          "title": "평가지 저장",
          "triggerKey": "PAP_E11",
          "fields": [
            "폐기한 평가지는 다시 수정할 수 없습니다."
          ],
          "buttons": [
            "닫기",
            "취소",
            "저장"
          ],
          "body": "상태D를 선택하면 페이지 필수 조건을 해제하고 유효한 폼의 저장 시 ‘평가지 저장’ 확인창을 엽니다. ‘폐기한 평가지는 다시 수정할 수 없습니다.’를 안내합니다. 최종 폐기는 취소했으므로 새 폐기 저장 결과는 미검증입니다.",
          "sourceStates": [
            "MST_PAP_STATUS_05"
          ],
          "condition": "상태D이고 폼 유효성 통과",
          "reference": {
            "html": "cms-knowledge/master-cms/sources/paper-mock-modify-20261109.html",
            "screenshot": "cms-knowledge/master-cms/evidence/1180-paper-discard-confirm-state.png"
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 708.140625
          },
          "noteNumber": 11,
          "message": "평가지 저장",
          "noteKey": "PAP_E11"
        }
      ],
      "mergedScreenIds": [
        "MST_PAP_EDIT",
        "MST_PAP_VALIDATION",
        "MST_PAP_STATUS",
        "MST_PAP_ORDER",
        "MST_PAP_ADD",
        "MST_PAP_REMOVE",
        "MST_PAP_CANCEL",
        "MST_PAP_SAVE"
      ],
      "page": "05 평가지 관리",
      "order": 25,
      "preserve": false,
      "image": {
        "key": "0b18f13ad821d2f5debdf05baece0d652148acda2c27fd85cea0248cebb38c30",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/paper-edit.png"
      },
      "geometry": "revision-captures/paper-edit.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "저장",
          "target": "REV_PAP_DETAIL",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 708.140625
          },
          "action": "정상 저장 → 상세 재조회"
        }
      ]
    },
    {
      "id": "REV_SRC_LIST",
      "title": "문항 출처 관리",
      "menu": "문항 출처 관리",
      "kind": "list",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/source-all60-list-20261109.html",
          "cms-knowledge/master-cms/sources/source-list-20261109.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/2137-source-all60-visible-top-pixels.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/2137-source-all60-visible-top-pixels.png",
          "cms-knowledge/master-cms/evidence/2139-source-all60-pixels-0800.png",
          "cms-knowledge/master-cms/evidence/2140-source-all60-pixels-1600.png",
          "cms-knowledge/master-cms/evidence/2141-source-all60-pixels-2400.png",
          "cms-knowledge/master-cms/evidence/2142-source-all60-pixels-3200.png",
          "cms-knowledge/master-cms/evidence/2143-source-all60-pixels-bottom.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 4353,
          "scrollTops": [
            0,
            800,
            1600,
            2400,
            3200,
            3338
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/phase32-pixel-review-20261109.json"
          ],
          "description": "대표는100개 보기·60행의 동일 HTML/PNG 묶음입니다. 가장 마지막 출처1행·총건수·페이지 버튼까지 직접 확인했습니다. 보조 HTML은 과거10행 구조용이며60행 캡처에 섞지 않습니다. 간결한10행 재현을 선택한다면 푸터까지 HTML로 다시 구성하고 데이터 시점을 명시해야 합니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 4413
      },
      "notes": [
        {
          "key": "SRC_L01",
          "label": "검색 기준·검색어",
          "body": "출처코드·출처명으로 검색합니다. 입력값을 바꾸는 단계와 조회 후 결과가 갱신되는 단계를 구분하며 코드 완전값 검색을 실제로 확인했습니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_03"
          ],
          "anchor": {
            "x": 293,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "SRC_L02",
          "label": "교과·판형·용도 필터",
          "body": "교육과정·학교급·과목군·과목·학년·학기·판형·용도로 목록을 필터링합니다. 선행 분류에 따라 하위 선택지가 비활성일 수 있으며 모든 조합의 결과는 미검증입니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_02"
          ],
          "anchor": {
            "x": 800,
            "y": 170,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "SRC_L03",
          "label": "기간·사용 여부",
          "body": "등록기간과 빠른 기간, 전체·사용(Y)·미사용(N)을 선택합니다. 사용 여부와 매핑 수는 독립 정보이며 미사용 출처가 기존 매핑을 유지한 사례가 있습니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_02",
            "MST_SRC_01_LIST_04"
          ],
          "anchor": {
            "x": 293,
            "y": 280,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "SRC_L04",
          "label": "초기화·조회",
          "body": "초기화는 필터만 바꾸고 기존 결과와 주소를 즉시 재조회하지 않습니다. 초기화 후 조회를 눌러 정상 목록으로 복귀한 결과를 확인했습니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_08",
            "MST_SRC_01_LIST_09"
          ],
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 2068,
            "y": 282.140625
          },
          "number": 4
        },
        {
          "key": "SRC_L05",
          "label": "결과 수·표시 개수",
          "body": "10·30·50·100개씩 보기를 제공합니다. 표시 개수를 변경하면 첫 페이지로 이동하며 결과 수는 관찰 시점과 조회 조건에 따라 달라집니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_10"
          ],
          "anchor": {
            "x": 293,
            "y": 385,
            "w": 20,
            "h": 20
          },
          "number": 5
        },
        {
          "key": "SRC_L06",
          "label": "출처 목록·상세 링크",
          "body": "출처 ID·출처코드·출처명·과목·교육과정·판형·용도·학교급·학년·학기·상태·매핑문항·등록자 및 등록일을 표시합니다. 출처코드와 출처명은 같은 상세로 연결됩니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_01",
            "MST_SRC_01_LIST_12"
          ],
          "targetScreen": "REV_SRC_DETAIL",
          "anchor": {
            "x": 300,
            "y": 440,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "SRC_L07",
          "label": "페이지 이동·0건 표시",
          "body": "확인한 다음·이전은1↔6의 페이지 블록으로 이동했습니다. 무결과에는 ‘검색 결과가 없습니다.’와0∼0을 표시합니다. 방향 버튼은 비활성이지만 숫자0은 활성으로 남고 클릭 후에도 경고 없이0건 화면을 유지했습니다. 이 현상의 제품 의도는 미확정입니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_11",
            "MST_SRC_01_LIST_05",
            "MST_SRC_01_LIST_06",
            "MST_SRC_01_LIST_07"
          ],
          "anchor": {
            "x": 1250,
            "y": 1080,
            "w": 20,
            "h": 20
          },
          "number": 7
        },
        {
          "key": "SRC_L08",
          "label": "등록",
          "body": "등록을 누르면 출처 등록 폼으로 이동합니다. 별도 중복검사 버튼은 확인되지 않았습니다.",
          "sourceStates": [
            "MST_SRC_01_LIST_01"
          ],
          "targetScreen": "REV_SRC_FORM",
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 2089,
            "y": 359.140625
          },
          "number": 8
        }
      ],
      "modals": [],
      "mergedScreenIds": [
        "MST_SRC_01_LIST"
      ],
      "page": "06 문항 출처 관리",
      "order": 26,
      "preserve": false,
      "image": {
        "key": "e474b59698252234da3bbd00a3dac79f4b1f390319cdd51f0176766c3d9e73a9",
        "width": 2185,
        "height": 1139,
        "path": "design-specs/revision-captures/source-list.png"
      },
      "geometry": "revision-captures/source-list.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "등록",
          "target": "REV_SRC_FORM",
          "anchor": {
            "h": 40,
            "w": 80,
            "x": 2089,
            "y": 359.140625
          },
          "action": "클릭"
        },
        {
          "label": "출처코드·출처명",
          "target": "REV_SRC_DETAIL",
          "anchor": {
            "x": 650,
            "y": 480,
            "w": 20,
            "h": 20
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_SRC_FORM",
      "title": "출처 등록",
      "menu": "문항 출처 관리",
      "kind": "form",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/source-registration-form-20261109.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/2131-source-registration-visible-pixels.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/2131-source-registration-visible-pixels.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 1015,
          "scrollTops": [
            0
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/evidence/2131-source-registration-visible-pixels.json",
            "cms-knowledge/master-cms/phase32-pixel-review-20261109.json"
          ],
          "description": "한 장에서 기본 정보·비고 카드와 취소·저장까지 모두 보입니다. URL에curriculum=22가 있어도 초기 교육과정이 미선택인 실제 상태를 그대로 사용합니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 1075
      },
      "notes": [
        {
          "key": "SRC_F01",
          "label": "교육과정",
          "body": "교육과정은 필수 선택입니다. 확인한 초기 폼에서는 주소에 교육과정22가 있어도 값이 자동 선택되지 않았습니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_01",
            "MST_SRC_02_FORM_02"
          ],
          "anchor": {
            "h": 40,
            "w": 154.546875,
            "x": 293,
            "y": 263.140625
          },
          "number": 1
        },
        {
          "key": "SRC_F02",
          "label": "학교급·학년·학기",
          "body": "학교급·학년·학기는 필수 선택입니다. 학교급을 바꾸면 학년·학기 선택지를 다시 구성하고 초기화합니다. 대표 조합은 실제로 확인했으며 전체 카탈로그 조합은 미검증입니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_03"
          ],
          "anchor": {
            "h": 40,
            "w": 154.5625,
            "x": 455.546875,
            "y": 263.140625
          },
          "number": 2
        },
        {
          "key": "SRC_F03",
          "label": "과목군·과목",
          "body": "과목군·과목은 필수이며 교육과정·학교급과 연동됩니다. 유효한 상위 값을 고르기 전에는 하위 선택지가 비활성일 수 있습니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_02",
            "MST_SRC_02_FORM_03"
          ],
          "anchor": {
            "h": 40,
            "w": 154.546875,
            "x": 618.109375,
            "y": 263.140625
          },
          "number": 3
        },
        {
          "key": "SRC_F04",
          "label": "교재명·교재 세부명",
          "body": "교재명·교재 세부명은 필수 연동 선택입니다. 수매씽 유형에서 유형북(TP)·워크북(WB)이 표시된 사례를 확인했습니다. 모든 교재가 항상 한 목록에 표시되는 것은 아닙니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_04"
          ],
          "anchor": {
            "h": 40,
            "w": 154.546875,
            "x": 1268.328125,
            "y": 263.140625
          },
          "number": 4
        },
        {
          "key": "SRC_F05",
          "label": "판형",
          "body": "판형은 필수이며 선택값은2000~2050의 연도입니다. 이 필드는 종이 크기를 선택하는 항목과 구분됩니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_05"
          ],
          "anchor": {
            "h": 40,
            "w": 154.5625,
            "x": 1593.4375,
            "y": 263.140625
          },
          "number": 5
        },
        {
          "key": "SRC_F06",
          "label": "출처코드·출처명",
          "body": "출처코드·출처명은 저장 전에 ‘자동생성’으로 비활성 표시됩니다. 분류 선택 중 실시간 코드 미리보기는 확인되지 않았습니다. 저장 후 분류·판형에 따른 코드와 이름이 생성된 실제 결과가 있습니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_06",
            "MST_SRC_03_CREATE_02"
          ],
          "anchor": {
            "x": 293,
            "y": 347,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "SRC_F07",
          "label": "서비스 노출명",
          "body": "서비스 노출명은 선택 입력이며 최대50자입니다. 자동 생성되는 출처명과는 별도 필드입니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_08"
          ],
          "anchor": {
            "h": 40,
            "w": 723.5,
            "x": 293,
            "y": 431.140625
          },
          "number": 7
        },
        {
          "key": "SRC_F08",
          "label": "용도",
          "body": "용도는 공통(C)·교사용(T) 중 필수로 선택합니다. 사용 여부Y/N과 구분합니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_02",
            "MST_SRC_02_FORM_05"
          ],
          "anchor": {
            "h": 40,
            "w": 357.75,
            "x": 1024.5,
            "y": 431.140625
          },
          "number": 8
        },
        {
          "key": "SRC_F09",
          "label": "사용 여부",
          "body": "사용 여부는 사용(Y)·미사용(N)이며 초기값은Y입니다. 출처 사용 여부와 문항 승인 상태는 다른 값입니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_01",
            "MST_SRC_02_FORM_05"
          ],
          "anchor": {
            "h": 40,
            "w": 357.75,
            "x": 1390.25,
            "y": 431.140625
          },
          "number": 9
        },
        {
          "key": "SRC_F10",
          "label": "비고",
          "body": "비고는 선택 입력이며 최대100자이고 실제 길이 제한을 확인했습니다. 폼에 입력값이 남아 있는 것과 저장 완료를 구분합니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_08"
          ],
          "anchor": {
            "x": 293,
            "y": 585,
            "w": 20,
            "h": 20
          },
          "number": 10
        },
        {
          "key": "SRC_F11",
          "label": "저장",
          "body": "필수 분류10개가 비어 있으면 안내 후 저장을 차단합니다. 실제 신규 저장 후 코드·이름 생성과 상세를 확인했습니다. 같은 코드 조합은 용도·노출명이 달라도 ‘이미 등록된 출처입니다’로 반려됐으며 별도 중복검사 버튼은 없습니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_07",
            "MST_SRC_03_CREATE_01",
            "MST_SRC_03_CREATE_03",
            "MST_SRC_03_CREATE_04"
          ],
          "targetScreen": "REV_SRC_DETAIL",
          "navigationCondition": "정상 저장 성공 시",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 711.140625
          },
          "number": 11
        },
        {
          "key": "SRC_F12",
          "label": "취소",
          "body": "취소를 누르면 저장하지 않고 목록으로 이동할지 확인합니다. 최종 이동을 수락하기 전에는 폼에 남는 경로가 제공됩니다.\n취소·닫기를 선택하면 입력한 서비스 노출명과 비고를 유지한 채 폼에 남는 것을 확인했습니다. ‘저장 하지 않고 이동’을 선택하면 등록하지 않고 목록으로 돌아갑니다. 다른 메뉴·뒤로·새로고침·탭 닫기에 동일한 보호가 적용되는지는 미검증입니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_09",
            "MST_SRC_02_FORM_10",
            "MST_SRC_02_FORM_11"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 711.140625
          },
          "number": 12
        }
      ],
      "modals": [
        {
          "id": "REV_SRC_CREATE_CANCEL",
          "title": "출처 등록 취소",
          "triggerKey": "SRC_F12",
          "fields": [
            "저장하지 않고 이동하시겠습니까?"
          ],
          "buttons": [
            "닫기",
            "취소",
            "저장 하지 않고 이동"
          ],
          "body": "취소·닫기를 선택하면 입력한 서비스 노출명과 비고를 유지한 채 폼에 남는 것을 확인했습니다. ‘저장 하지 않고 이동’을 선택하면 등록하지 않고 목록으로 돌아갑니다. 다른 메뉴·뒤로·새로고침·탭 닫기에 동일한 보호가 적용되는지는 미검증입니다.",
          "sourceStates": [
            "MST_SRC_02_FORM_09",
            "MST_SRC_02_FORM_10",
            "MST_SRC_02_FORM_11"
          ],
          "reference": {
            "html": "cms-knowledge/master-cms/sources/source-registration-form-20261109.html",
            "screenshot": null
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 711.140625
          },
          "noteNumber": 12,
          "message": "",
          "noteKey": "SRC_F12"
        }
      ],
      "mergedScreenIds": [
        "MST_SRC_02_FORM",
        "MST_SRC_03_CREATE"
      ],
      "page": "06 문항 출처 관리",
      "order": 27,
      "preserve": false,
      "image": {
        "key": "16e6b5799eebed99594336c7598d865bcf2e6d1d9fb52646153e3c0057bc9187",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/source-form.png"
      },
      "geometry": "revision-captures/source-form.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "저장",
          "target": "REV_SRC_DETAIL",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 711.140625
          },
          "action": "필수값·중복 검사 통과 → 상세"
        }
      ]
    },
    {
      "id": "REV_SRC_DETAIL",
      "title": "출처 상세",
      "menu": "문항 출처 관리",
      "kind": "detail",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/source-test199-detail-updated-20261109.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/2133-source199-detail-visible-pixels.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/2133-source199-detail-visible-pixels.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 1015,
          "scrollTops": [
            0
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/evidence/2133-source199-detail-visible-pixels.json",
            "cms-knowledge/master-cms/phase32-pixel-review-20261109.json"
          ],
          "description": "캡처의199·미사용·매핑0건·2048 판형·비고·시각은 당시 값 그대로 유지합니다. 후속 최종N/0을 설명하되 과거 비고/시각을 최신으로 바꾸지 않습니다. 목록·수정까지 한 장에서 보입니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 1075
      },
      "notes": [
        {
          "key": "SRC_D01",
          "label": "출처 ID·기본 분류",
          "body": "출처 ID·교육과정·학교급·과목군·과목·학년·학기·교재명·교재 세부명·판형을 표시합니다. 상세에서는 이 정보를 읽기 전용으로 제공합니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_01"
          ],
          "anchor": {
            "x": 293,
            "y": 235,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "SRC_D02",
          "label": "출처코드·출처명",
          "body": "생성된 출처코드·출처명을 읽기 전용으로 표시합니다. 자동 코드·이름과 서비스 노출명은 서로 다른 정보입니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_01",
            "MST_SRC_03_CREATE_02"
          ],
          "anchor": {
            "x": 293,
            "y": 347,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "SRC_D03",
          "label": "서비스 노출명",
          "body": "저장된 서비스 표시용 이름을 별도 필드에 표시합니다. 실제 Service CMS의 이름이나 노출 변경까지 확인한 것은 아닙니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_03"
          ],
          "anchor": {
            "x": 293,
            "y": 431,
            "w": 20,
            "h": 20
          },
          "number": 3
        },
        {
          "key": "SRC_D04",
          "label": "용도·사용 여부",
          "body": "용도C/T와 사용 여부Y/N은 서로 다른 정보입니다. 미사용 저장 후에도 기존 매핑은 유지됐고 신규 HML·디피니션 등록 후보에서는 제외됐습니다. 다른 등록 폼의 출처 선택이 용도를 자동 동기화하지는 않습니다. 서비스 노출 유지는 화면 안내이며 실제 Service 검증은 아닙니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_03",
            "MST_SRC_08_INTEGRATION_01",
            "MST_SRC_08_INTEGRATION_02",
            "MST_SRC_08_INTEGRATION_03",
            "MST_SRC_08_INTEGRATION_04"
          ],
          "anchor": {
            "x": 1390,
            "y": 431,
            "w": 20,
            "h": 20
          },
          "number": 4
        },
        {
          "key": "SRC_D05",
          "label": "비고",
          "body": "저장된 비고를 비활성 필드로 표시합니다. 수정 이력에 따라 비고가 바뀐 사례가 있으므로 조회 시점의 값으로 확인합니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_01"
          ],
          "anchor": {
            "x": 293,
            "y": 585,
            "w": 20,
            "h": 20
          },
          "number": 5
        },
        {
          "key": "SRC_D06",
          "label": "등록·수정 시스템 정보",
          "body": "등록·수정 사용자와 시각을 읽기 전용으로 표시합니다. 수정 저장은 같은 출처 ID를 유지하는 갱신이며 신규 생성과 구분합니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_01"
          ],
          "anchor": {
            "x": 293,
            "y": 825,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "SRC_D07",
          "label": "매핑 문항 수",
          "body": "매핑 문항 수는 읽기 전용 숫자이며 이 위치에서 문항 목록을 여는 링크는 확인되지 않았습니다. 사용 여부와 독립적이며 확인한 출처는 미사용·매핑1건을 거쳐 최종 미사용·0건으로 남았습니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_02",
            "MST_SRC_04_DETAIL_03",
            "MST_SRC_04_DETAIL_04",
            "MST_SRC_06_USE_06"
          ],
          "anchor": {
            "x": 1268,
            "y": 825,
            "w": 20,
            "h": 20
          },
          "number": 7
        },
        {
          "key": "SRC_D08",
          "label": "관련 기능: 문항 상세의 출처 관리",
          "body": "연결 관리는 전체 문항의 문항 상세에서 ‘출처 관리’ 모달을 열어 현재 출처·출처 추가 탭으로 수행합니다. 미사용·미연결 출처는 추가할 수 없고 페이지 공란은 차단됩니다. 기존 미사용 관계는 수정·해제할 수 있으며 최소1개 출처를 유지합니다. 관계 추가·수정·해제 후 원래 관계만 보존한 결과를 실제로 확인했습니다.",
          "sourceStates": [
            "MST_SRC_07_RELATION_01",
            "MST_SRC_07_RELATION_02",
            "MST_SRC_07_RELATION_03",
            "MST_SRC_07_RELATION_04",
            "MST_SRC_07_RELATION_05",
            "MST_SRC_07_RELATION_06",
            "MST_SRC_07_RELATION_07",
            "MST_SRC_07_RELATION_08",
            "MST_SRC_07_RELATION_09",
            "MST_SRC_07_RELATION_10"
          ],
          "isVisibleControl": false,
          "drawArrowOnThisBase": false,
          "externalComponent": {
            "ownerMenu": "문항 관리 > 전체 문항",
            "ownerScreen": "문항 상세",
            "actualTriggerLabel": "출처 관리",
            "componentTitle": "출처 관리",
            "reuseExistingModal": true,
            "doNotInventTriggerOnSourceDetail": true
          },
          "anchor": {
            "x": 1268,
            "y": 825,
            "w": 20,
            "h": 20
          },
          "number": 8
        },
        {
          "key": "SRC_D09",
          "label": "목록",
          "body": "목록을 누르면 출처 목록으로 돌아갑니다. 링크에 검색 조건과 페이지 문맥이 포함될 수 있습니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_05"
          ],
          "targetScreen": "REV_SRC_LIST",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 902.140625
          },
          "number": 9
        },
        {
          "key": "SRC_D10",
          "label": "수정",
          "body": "수정을 누르면 출처 수정 폼으로 이동합니다. 수정 폼에서 기존 정보를 변경하는 단계와 저장 완료를 구분합니다.",
          "sourceStates": [
            "MST_SRC_04_DETAIL_05"
          ],
          "targetScreen": "REV_SRC_EDIT",
          "anchor": {
            "h": 20,
            "w": 479.671875,
            "x": 780.65625,
            "y": 797.140625
          },
          "number": 10
        }
      ],
      "modals": [],
      "mergedScreenIds": [
        "MST_SRC_04_DETAIL",
        "MST_SRC_03_CREATE",
        "MST_SRC_05_EDIT",
        "MST_SRC_08_INTEGRATION",
        "MST_SRC_06_USE",
        "MST_SRC_07_RELATION"
      ],
      "page": "06 문항 출처 관리",
      "order": 28,
      "preserve": false,
      "image": {
        "key": "546ce799b125ba8407f95d8eed70d5639fc8d44b5bc0456ac95576349da414a6",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/source-detail.png"
      },
      "geometry": "revision-captures/source-detail.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "수정",
          "target": "REV_SRC_EDIT",
          "anchor": {
            "h": 20,
            "w": 479.671875,
            "x": 780.65625,
            "y": 797.140625
          },
          "action": "클릭"
        }
      ]
    },
    {
      "id": "REV_SRC_EDIT",
      "title": "출처 수정",
      "menu": "문항 출처 관리",
      "kind": "edit",
      "reference": {
        "htmlPaths": [
          "cms-knowledge/master-cms/sources/source-mapped134-modify-20261109.html"
        ],
        "representativeCapture": "cms-knowledge/master-cms/evidence/2135-source134-mapped-modify-visible-pixels.png",
        "capturePaths": [
          "cms-knowledge/master-cms/evidence/2135-source134-mapped-modify-visible-pixels.png"
        ],
        "fullHeightReview": {
          "viewportWidth": 1810,
          "viewportHeight": 1075,
          "contentViewportHeight": 1015,
          "contentHeight": 1015,
          "scrollTops": [
            0
          ],
          "completeVertical": true,
          "bottomControlsReviewed": true,
          "reviewMethod": "보존된 전체 높이·스크롤 위치와 상단/하단 캡처를 대조했고 최하단 PNG를 이번 작업에서 직접 열어 확인했습니다.",
          "bottomEvidence": [
            "cms-knowledge/master-cms/evidence/2135-source134-mapped-modify-visible-pixels.json",
            "cms-knowledge/master-cms/phase32-pixel-review-20261109.json"
          ],
          "description": "대표는사용 출처134·매핑102건의 활성 수정 폼입니다. 기본 정보·비고·시스템 정보·취소/저장을 한 장에서 직접 확인했습니다. 활성 상태를 해당 분류 변경의 서버 성공으로 오인하지 않습니다."
        },
        "renderInstruction": "상단 고정 헤더60px와 본문 전체 높이를 함께 고려해 하단 표·페이지 조작부·최종 버튼까지 포함합니다. 기본 뷰포트 높이로 내용을 잘라내지 않습니다.",
        "minimumFrameHeight": 1075
      },
      "notes": [
        {
          "key": "SRC_E01",
          "label": "기본 분류·교재·판형",
          "body": "기존 교과 분류·교재·판형을 편집합니다. 매핑 문항이 있는 출처에서도 필드는 활성입니다. 실제 분류 변경 저장은 미매핑 출처에서 확인했으며 매핑 출처 분류 변경의 서버 영향은 미검증입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_01",
            "MST_SRC_05_EDIT_05"
          ],
          "anchor": {
            "x": 293,
            "y": 263,
            "w": 20,
            "h": 20
          },
          "number": 1
        },
        {
          "key": "SRC_E02",
          "label": "출처코드·출처명",
          "body": "출처코드·출처명은 자동 생성 표시 필드이며 직접 입력하지 않습니다. 미매핑 출처의 판형 변경 저장 후 같은 ID를 유지하면서 코드·이름이 갱신된 결과를 확인했습니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_02"
          ],
          "anchor": {
            "x": 293,
            "y": 347,
            "w": 20,
            "h": 20
          },
          "number": 2
        },
        {
          "key": "SRC_E03",
          "label": "서비스 노출명",
          "body": "기존 서비스 노출명을 편집합니다. 자동 출처명과 구분하며 실제 Service 표시 변경은 미검증입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_03"
          ],
          "anchor": {
            "h": 40,
            "w": 723.5,
            "x": 293,
            "y": 431.140625
          },
          "number": 3
        },
        {
          "key": "SRC_E04",
          "label": "용도",
          "body": "용도를 공통(C)·교사용(T)으로 수정합니다. 용도와 출처 사용 여부는 서로 다른 필드입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_03"
          ],
          "anchor": {
            "h": 40,
            "w": 357.75,
            "x": 1024.5,
            "y": 431.140625
          },
          "number": 4
        },
        {
          "key": "SRC_E05",
          "label": "사용 여부",
          "body": "사용 여부Y/N을 선택하고 저장합니다. 사용 저장 후 신규 후보와 수동 추가가 활성화됐고 미사용 저장 후에는 기존 관계를 유지하면서 신규 등록 후보에서 제외됐습니다. 영향 확인 수락은 로컬 선택이며 최종 저장과 구분합니다.\n사용 출처를 미사용으로 바꿀 때 출처 정보·매핑 수와 기존 관계 유지·신규 등록 후보 제외 안내를 표시합니다. 취소하면 닫힘 완료 후 사용Y를 복원합니다. ‘미사용(N)으로 변경’은 로컬 선택만 유지하며 이후 저장으로 서버 변경을 확정합니다. 매핑0건에서의 같은 경고와 실제 Service 노출은 미검증입니다.",
          "sourceStates": [
            "MST_SRC_06_USE_01",
            "MST_SRC_06_USE_05",
            "MST_SRC_06_USE_02",
            "MST_SRC_06_USE_03",
            "MST_SRC_06_USE_04"
          ],
          "anchor": {
            "h": 40,
            "w": 357.75,
            "x": 1390.25,
            "y": 431.140625
          },
          "number": 5
        },
        {
          "key": "SRC_E06",
          "label": "비고",
          "body": "기존 비고를 편집합니다. 사용 여부 변경과 함께 비고도 변경된 사례가 있으므로 사용 여부 외 모든 필드가 불변이었다고 단정하지 않습니다.",
          "sourceStates": [
            "MST_SRC_06_USE_05"
          ],
          "anchor": {
            "x": 293,
            "y": 585,
            "w": 20,
            "h": 20
          },
          "number": 6
        },
        {
          "key": "SRC_E07",
          "label": "시스템 정보·매핑 문항 수",
          "body": "등록·수정 사용자 및 시각과 매핑 문항 수를 읽기 전용으로 표시합니다. 매핑 수와 출처 사용 여부는 독립 정보입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_01",
            "MST_SRC_04_DETAIL_03"
          ],
          "anchor": {
            "x": 1268,
            "y": 825,
            "w": 20,
            "h": 20
          },
          "number": 7
        },
        {
          "key": "SRC_E08",
          "label": "저장",
          "body": "저장하면 같은 출처 ID의 정보를 갱신하고 상세에서 결과를 확인합니다. 미매핑 출처의 분류 변경 저장은 실제로 확인했습니다. 수정 중 코드 충돌·동시 수정·매핑 출처의 분류 변경·서버 오류 복구는 미검증입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_02",
            "MST_SRC_05_EDIT_05"
          ],
          "targetScreen": "REV_SRC_DETAIL",
          "navigationCondition": "정상 저장 성공 시",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 902.140625
          },
          "number": 8
        },
        {
          "key": "SRC_E09",
          "label": "취소",
          "body": "취소를 누르면 ‘출처 수정 취소’ 확인창을 사용하는 소스 경로가 있습니다. 등록 취소의 실제 입력 보존 결과가 수정 취소 전체의 실행을 증명하지는 않습니다.\n‘출처 수정 취소’ 확인창은 보존된 소스에 선언되어 있습니다. 이동 수락 시 변경을 저장하지 않고 돌아가는 경로이며 모든 입력값 보존·재열기·다른 이탈 경로는 미검증입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_04"
          ],
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 902.140625
          },
          "number": 9
        }
      ],
      "modals": [
        {
          "id": "REV_SRC_USE_IMPACT",
          "title": "영향 범위 확인",
          "triggerKey": "SRC_E05",
          "fields": [
            "출처코드·출처명",
            "매핑 문항 수",
            "기존 매핑 문항 정보 유지(서비스 노출 유지) 안내",
            "신규 문항 등록의 출처 선택에서 제외 안내"
          ],
          "buttons": [
            "닫기",
            "취소",
            "미사용(N)으로 변경"
          ],
          "body": "사용 출처를 미사용으로 바꿀 때 출처 정보·매핑 수와 기존 관계 유지·신규 등록 후보 제외 안내를 표시합니다. 취소하면 닫힘 완료 후 사용Y를 복원합니다. ‘미사용(N)으로 변경’은 로컬 선택만 유지하며 이후 저장으로 서버 변경을 확정합니다. 매핑0건에서의 같은 경고와 실제 Service 노출은 미검증입니다.",
          "sourceStates": [
            "MST_SRC_06_USE_02",
            "MST_SRC_06_USE_03",
            "MST_SRC_06_USE_04"
          ],
          "condition": "관측한 사용Y·매핑양수 출처에서N 선택",
          "reference": {
            "html": "cms-knowledge/master-cms/sources/source-mapped-impact-modal-20261109.html",
            "screenshot": null
          },
          "renderBesideBase": true,
          "arrowLabel": "사용 여부N 선택",
          "anchor": {
            "h": 40,
            "w": 357.75,
            "x": 1390.25,
            "y": 431.140625
          },
          "noteNumber": 5,
          "message": "미사용(N)으로 변경",
          "noteKey": "SRC_E05"
        },
        {
          "id": "REV_SRC_EDIT_CANCEL",
          "title": "출처 수정 취소",
          "triggerKey": "SRC_E09",
          "fields": [
            "저장하지 않고 이동하시겠습니까?"
          ],
          "buttons": [
            "닫기",
            "취소",
            "저장 하지 않고 이동"
          ],
          "body": "‘출처 수정 취소’ 확인창은 보존된 소스에 선언되어 있습니다. 이동 수락 시 변경을 저장하지 않고 돌아가는 경로이며 모든 입력값 보존·재열기·다른 이탈 경로는 미검증입니다.",
          "sourceStates": [
            "MST_SRC_05_EDIT_04"
          ],
          "reference": {
            "html": "cms-knowledge/master-cms/sources/source-mapped134-modify-20261109.html",
            "screenshot": null
          },
          "renderBesideBase": true,
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 954.5,
            "y": 902.140625
          },
          "noteNumber": 9,
          "message": "",
          "noteKey": "SRC_E09"
        }
      ],
      "mergedScreenIds": [
        "MST_SRC_05_EDIT",
        "MST_SRC_06_USE",
        "MST_SRC_04_DETAIL"
      ],
      "page": "06 문항 출처 관리",
      "order": 29,
      "preserve": false,
      "image": {
        "key": "95e107cb06dd04bf1ed62a61ef33d5be2ce01251ffc3f3848abc445e58669a8b",
        "width": 1800,
        "height": 1100,
        "path": "design-specs/revision-captures/source-edit.png"
      },
      "geometry": "revision-captures/source-edit.json",
      "captureLabel": "전체 페이지 재캡처",
      "flows": [
        {
          "label": "저장",
          "target": "REV_SRC_DETAIL",
          "anchor": {
            "h": 40,
            "w": 62,
            "x": 1024.5,
            "y": 902.140625
          },
          "action": "영향 확인이 있으면 확인 후 저장 → 상세"
        }
      ]
    }
  ],
  "commentRevision": {
    "commentsRead": 7,
    "duplicateNotesRemoved": 36,
    "removed": [
      {
        "screen": "REV_HOME_01",
        "key": "REV_HOME_LOGOUT"
      },
      {
        "screen": "REV_ITM_02",
        "key": "04"
      },
      {
        "screen": "REV_ITM_02",
        "key": "05"
      },
      {
        "screen": "REV_ITM_02",
        "key": "T03"
      },
      {
        "screen": "REV_ITM_02",
        "key": "T04"
      },
      {
        "screen": "REV_ITM_02",
        "key": "T06"
      },
      {
        "screen": "REV_ITM_02",
        "key": "REV_ITM_DETAIL_OMR"
      },
      {
        "screen": "REV_ITM_02",
        "key": "REV_ITM_DRAFT"
      },
      {
        "screen": "REV_ITM_02",
        "key": "TWN_C03_CURRENT_ADD"
      },
      {
        "screen": "REV_ITM_02",
        "key": "TWN_C03_GENERATE"
      },
      {
        "screen": "REV_ITM_02",
        "key": "TWN_C03_HISTORY"
      },
      {
        "screen": "REV_ITM_03",
        "key": "04"
      },
      {
        "screen": "REV_ITM_05",
        "key": "03"
      },
      {
        "screen": "REV_ITM_06",
        "key": "REV_ITM_OMR_PREVIEW"
      },
      {
        "screen": "REV_ITM_07",
        "key": "REV_HML_SAVED"
      },
      {
        "screen": "REV_LAB_01",
        "key": "03"
      },
      {
        "screen": "MST_HML_C02",
        "key": "HML_C02_SOURCE"
      },
      {
        "screen": "MST_HML_C02",
        "key": "HML_C02_UNIT"
      },
      {
        "screen": "MST_HML_C02",
        "key": "HML_C02_CANCEL"
      },
      {
        "screen": "MST_HML_C03",
        "key": "HML_C03_UNJUDGED"
      },
      {
        "screen": "MST_HML_C03",
        "key": "HML_C03_REASON"
      },
      {
        "screen": "MST_HML_C04",
        "key": "HML_C04_DRAFT"
      },
      {
        "screen": "MST_DIFI_C02",
        "key": "DIFI_C02_SOURCE"
      },
      {
        "screen": "MST_DIFI_C02",
        "key": "DIFI_C02_UNIT"
      },
      {
        "screen": "MST_DIFI_C02",
        "key": "DIFI_C02_CANCEL"
      },
      {
        "screen": "MST_DIFI_C03",
        "key": "DIFI_C03_ALL_D"
      },
      {
        "screen": "MST_DIFI_C03",
        "key": "DIFI_C03_REASON"
      },
      {
        "screen": "MST_DIFI_C04",
        "key": "DIFI_C04_DRAFT"
      },
      {
        "screen": "REV_PAP_DETAIL",
        "key": "REV_PAP_DEPLOY"
      },
      {
        "screen": "REV_PAP_EDIT",
        "key": "REV_PAP_ADD"
      },
      {
        "screen": "REV_PAP_EDIT",
        "key": "REV_PAP_REMOVE"
      },
      {
        "screen": "REV_PAP_EDIT",
        "key": "REV_PAP_CANCEL"
      },
      {
        "screen": "REV_PAP_EDIT",
        "key": "REV_PAP_DISCARD"
      },
      {
        "screen": "REV_SRC_FORM",
        "key": "REV_SRC_CREATE_CANCEL"
      },
      {
        "screen": "REV_SRC_EDIT",
        "key": "REV_SRC_USE_IMPACT"
      },
      {
        "screen": "REV_SRC_EDIT",
        "key": "REV_SRC_EDIT_CANCEL"
      }
    ]
  }
};
const R={family:'Inter',style:'Regular'},B={family:'Inter',style:'Bold'};await figma.loadFontAsync(R);await figma.loadFontAsync(B);
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function text(p,x,y,w,s,size=18,bold=false,color='#263548'){const n=figma.createText();p.appendChild(n);n.fontName=bold?B:R;n.fontSize=size;n.lineHeight={unit:'PERCENT',value:150};n.resize(w,1);n.textAutoResize='HEIGHT';n.characters=s;n.x=x;n.y=y;n.fills=[{type:'SOLID',color:rgb(color)}];return n}
function rect(p,x,y,w,h,c='#ffffff',border='#dbe0e6'){const n=figma.createRectangle();p.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=[{type:'SOLID',color:rgb(c)}];n.strokes=[{type:'SOLID',color:rgb(border)}];return n}
function cue(p,x,y,num){const n=figma.createEllipse();p.appendChild(n);n.x=x-17;n.y=y-17;n.resize(34,34);n.fills=[{type:'SOLID',color:rgb('#ed263a')}];n.strokes=[{type:'SOLID',color:rgb('#ffffff')}];n.strokeWeight=3;n.name='요소 번호 '+num;const t=text(p,x-17,y-13,34,String(num).padStart(2,'0'),16,true,'#ffffff');t.textAlignHorizontal='CENTER';t.name=n.name}
function freeze(n){if('constraints'in n)n.constraints={horizontal:'MIN',vertical:'MIN'};if('children'in n)for(const c of n.children)freeze(c)}
const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
for(const s of PLAN.screens){
 const f=figma.getNodeById(ix[s.id].frame);freeze(f);
 if(s.preserve){
  const imported=figma.createNodeFromSvg("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2300\" height=\"1657\" viewBox=\"0 0 2300 1657\">\n<rect x=\"0\" y=\"0\" width=\"2300\" height=\"1657\" rx=\"0\" fill=\"#fff\" stroke=\"#fff\"/>\n<rect x=\"40\" y=\"32\" width=\"2220\" height=\"70\" rx=\"0\" fill=\"#f2f3f5\" stroke=\"#f2f3f5\"/>\n<text x=\"60\" y=\"62\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#253348\">화면 ID   MST_ITM_01</text>\n<text x=\"370\" y=\"62\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#253348\">메뉴   문항 관리  /  전체 문항</text>\n<text x=\"60\" y=\"87\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">화면명   전체 문항 목록 · 기본 조회</text>\n<text x=\"1650\" y=\"62\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"400\" fill=\"#253348\">작성일   2026.11.11</text>\n<text x=\"1900\" y=\"62\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"400\" fill=\"#253348\">Ver   0.1</text>\n<text x=\"2080\" y=\"62\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"700\" fill=\"#253348\">검토용 시안</text>\n<text x=\"48\" y=\"145\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"28\" font-weight=\"700\" fill=\"#253348\">전체 문항</text>\n<text x=\"250\" y=\"144\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#6e7c8d\">기본 조회 상태</text>\n<text x=\"1580\" y=\"145\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"25\" font-weight=\"700\" fill=\"#253348\">화면 설명 · 동작 및 정책</text>\n<rect x=\"48\" y=\"175\" width=\"1490\" height=\"1040\" rx=\"0\" fill=\"#f8f9fb\" stroke=\"#b9c8d8\"/>\n<rect x=\"48\" y=\"175\" width=\"211\" height=\"1040\" rx=\"0\" fill=\"#0870cb\" stroke=\"#0870cb\"/>\n<text x=\"63\" y=\"208\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#fff\">문제은행 마스터 CMS</text>\n<text x=\"74\" y=\"270\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">홈</text>\n<text x=\"74\" y=\"310\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">문항 관리</text>\n<rect x=\"57\" y=\"327\" width=\"193\" height=\"34\" rx=\"5\" fill=\"#fff\" stroke=\"#fff\"/>\n<text x=\"91\" y=\"350\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#0870cb\">전체 문항</text>\n<text x=\"91\" y=\"387\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">HML 문항 등록</text>\n<text x=\"91\" y=\"424\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">디피니션 문항 등록</text>\n<text x=\"91\" y=\"461\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">쌍둥이 그룹 관리</text>\n<text x=\"74\" y=\"517\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">평가지 관리</text>\n<text x=\"74\" y=\"563\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">문항 출처 관리</text>\n<text x=\"74\" y=\"609\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"15\" font-weight=\"500\" fill=\"#e3f1ff\">랩</text>\n<rect x=\"260\" y=\"175\" width=\"1278\" height=\"49\" rx=\"0\" fill=\"#fff\" stroke=\"#fff\"/>\n<rect x=\"260\" y=\"224\" width=\"1278\" height=\"3\" rx=\"0\" fill=\"#0870cb\" stroke=\"#0870cb\"/>\n<text x=\"276\" y=\"205\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#0870cb\">마스터</text>\n<text x=\"1163\" y=\"205\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">접속자 jaehyuk.myung</text>\n<rect x=\"1408\" y=\"185\" width=\"112\" height=\"30\" rx=\"3\" fill=\"#0870cb\" stroke=\"#0870cb\"/>\n<text x=\"1423\" y=\"205\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#fff\">로그아웃</text>\n<text x=\"276\" y=\"253\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#667388\">시스템 관리  ›  문항 관리  ›  전체 문항</text>\n<text x=\"276\" y=\"282\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"21\" font-weight=\"700\" fill=\"#253348\">전체 문항</text>\n<rect x=\"276\" y=\"302\" width=\"286\" height=\"884\" rx=\"5\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<rect x=\"290\" y=\"319\" width=\"75\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"300\" y=\"340\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">22</text>\n<text x=\"348\" y=\"340\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"371\" y=\"319\" width=\"84\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"381\" y=\"340\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">학교급 선택</text>\n<text x=\"438\" y=\"340\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"461\" y=\"319\" width=\"87\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"471\" y=\"340\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">과목군 선택</text>\n<text x=\"531\" y=\"340\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"303\" y=\"374\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"305\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"321\" y=\"385\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">전체</text>\n<rect x=\"576\" y=\"302\" width=\"31\" height=\"32\" rx=\"4\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<text x=\"586\" y=\"324\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"400\" fill=\"#253348\">«</text>\n<text x=\"618\" y=\"324\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#0870cb\">선택한 단원 내에서 검색됩니다.</text>\n<rect x=\"576\" y=\"347\" width=\"944\" height=\"164\" rx=\"5\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<rect x=\"590\" y=\"363\" width=\"96\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"600\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">문항 ID</text>\n<text x=\"669\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"693\" y=\"363\" width=\"190\" height=\"32\" rx=\"4\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<text x=\"703\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#8a96a6\">문항 ID / 지문 ID / 지문 / 문제</text>\n<rect x=\"891\" y=\"363\" width=\"117\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"901\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">난이도 전체</text>\n<text x=\"991\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"1016\" y=\"363\" width=\"125\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1026\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">생성 방식 전체</text>\n<text x=\"1124\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"1149\" y=\"363\" width=\"110\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1159\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">형태1 전체</text>\n<text x=\"1242\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"1267\" y=\"363\" width=\"110\" height=\"32\" rx=\"4\" fill=\"#f3f4f6\" stroke=\"#dbe0e6\"/>\n<text x=\"1277\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#8390a0\">형태2 전체</text>\n<text x=\"1360\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<rect x=\"1385\" y=\"363\" width=\"119\" height=\"32\" rx=\"4\" fill=\"#f3f4f6\" stroke=\"#dbe0e6\"/>\n<text x=\"1395\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#8390a0\">형태3 전체</text>\n<text x=\"1487\" y=\"384\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<text x=\"592\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">등록일</text>\n<rect x=\"646\" y=\"402\" width=\"165\" height=\"32\" rx=\"4\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<text x=\"657\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#8a96a6\">시작일 ~ 종료일</text>\n<rect x=\"819\" y=\"402\" width=\"43\" height=\"32\" rx=\"0\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"829\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#344455\">7일</text>\n<rect x=\"862\" y=\"402\" width=\"43\" height=\"32\" rx=\"0\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"872\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#344455\">30일</text>\n<rect x=\"905\" y=\"402\" width=\"43\" height=\"32\" rx=\"0\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"915\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#344455\">90일</text>\n<rect x=\"948\" y=\"402\" width=\"43\" height=\"32\" rx=\"0\" fill=\"#f0f7ff\" stroke=\"#dbe0e6\"/>\n<text x=\"958\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">전체</text>\n<text x=\"1011\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">배포</text>\n<rect x=\"1053\" y=\"411\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"1055\" y=\"421\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"1071\" y=\"422\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">전체</text>\n<rect x=\"1112\" y=\"411\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"1114\" y=\"421\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"1130\" y=\"422\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">배포됨</text>\n<rect x=\"1186\" y=\"411\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"1188\" y=\"421\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"1204\" y=\"422\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">미배포</text>\n<rect x=\"1306\" y=\"402\" width=\"198\" height=\"32\" rx=\"4\" fill=\"#f3f4f6\" stroke=\"#dbe0e6\"/>\n<text x=\"1316\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#8390a0\">배포 대상 전체</text>\n<text x=\"1487\" y=\"423\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<text x=\"592\" y=\"478\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">상태</text>\n<rect x=\"632\" y=\"466\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"634\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"650\" y=\"477\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">전체</text>\n<rect x=\"690\" y=\"466\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"692\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"708\" y=\"477\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">초안</text>\n<rect x=\"749\" y=\"466\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"751\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"767\" y=\"477\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">실패(재등록)</text>\n<rect x=\"864\" y=\"466\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"866\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"882\" y=\"477\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">승인(사용)</text>\n<rect x=\"963\" y=\"466\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"965\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"981\" y=\"477\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">승인(미사용)</text>\n<rect x=\"1074\" y=\"466\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#0875d1\" stroke=\"#0875d1\"/>\n<text x=\"1076\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#fff\">✓</text>\n<text x=\"1092\" y=\"477\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">폐기</text>\n<rect x=\"1352\" y=\"455\" width=\"72\" height=\"32\" rx=\"4\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<text x=\"1366\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">초기화</text>\n<rect x=\"1432\" y=\"455\" width=\"72\" height=\"32\" rx=\"4\" fill=\"#0870cb\" stroke=\"#0870cb\"/>\n<text x=\"1452\" y=\"476\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"600\" fill=\"#fff\">조회</text>\n<rect x=\"576\" y=\"529\" width=\"108\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"586\" y=\"550\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#35465b\">10개씩 보기</text>\n<text x=\"667\" y=\"550\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"13\" font-weight=\"400\" fill=\"#8290a0\">⌄</text>\n<text x=\"696\" y=\"550\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#6b7788\">검색결과 · 35,566건</text>\n<rect x=\"576\" y=\"571\" width=\"944\" height=\"552\" rx=\"4\" fill=\"#ffffff\" stroke=\"#dbe0e6\"/>\n<rect x=\"576\" y=\"571\" width=\"944\" height=\"32\" rx=\"0\" fill=\"#f0f3f6\" stroke=\"#dbe0e6\"/>\n<text x=\"584\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">문항 ID</text>\n<text x=\"658\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">문제</text>\n<text x=\"887\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">출처</text>\n<text x=\"999\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">단원</text>\n<text x=\"1100\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">형태</text>\n<text x=\"1205\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">난이도</text>\n<text x=\"1257\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">쌍둥이</text>\n<text x=\"1308\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">상태</text>\n<text x=\"1383\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">배포</text>\n<text x=\"1423\" y=\"592\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#66758a\">등록자·등록일</text>\n<rect x=\"576\" y=\"603\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"624\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089392</text>\n<text x=\"584\" y=\"642\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"627\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"627\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"623\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"640\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"623\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"640\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"629\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"629\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"629\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">폐기</text>\n<text x=\"1389\" y=\"629\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"623\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"640\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"655\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"676\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089391</text>\n<text x=\"584\" y=\"694\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"679\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"679\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"675\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"692\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"675\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"692\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"681\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"681\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"681\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">폐기</text>\n<text x=\"1389\" y=\"681\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"675\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"692\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"707\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"728\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089390</text>\n<text x=\"584\" y=\"746\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"731\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"731\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"727\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"744\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"727\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"744\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"733\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"733\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"733\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">폐기</text>\n<text x=\"1389\" y=\"733\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"727\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"744\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"759\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"780\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089389</text>\n<text x=\"584\" y=\"798\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"783\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"783\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"779\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"796\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"779\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"796\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"785\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"785\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"785\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">폐기</text>\n<text x=\"1389\" y=\"785\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"779\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"796\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"811\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"832\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089387</text>\n<text x=\"658\" y=\"835\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"835\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"831\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"848\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"831\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"848\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"837\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"837\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"837\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">폐기</text>\n<text x=\"1389\" y=\"837\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"831\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"848\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"863\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"884\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089385</text>\n<text x=\"584\" y=\"902\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"887\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"887\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"883\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"900\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"883\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"900\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"889\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"889\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"889\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">초안</text>\n<text x=\"1389\" y=\"889\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"883\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"900\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"915\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"936\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089384</text>\n<text x=\"584\" y=\"954\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"939\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"939\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"935\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"952\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"935\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"952\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"941\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"941\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"941\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">초안</text>\n<text x=\"1389\" y=\"941\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"935\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"952\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"967\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"988\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089383</text>\n<text x=\"584\" y=\"1006\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"991\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"991\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"987\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"1004\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"987\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"1004\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"993\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"993\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"993\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">초안</text>\n<text x=\"1389\" y=\"993\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"987\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"1004\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"1019\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"1040\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089382</text>\n<text x=\"584\" y=\"1058\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#6e7d90\">지문 ID …</text>\n<text x=\"658\" y=\"1043\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"1043\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"1039\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"1056\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"1039\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"1056\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"1045\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"1045\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"1045\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">초안</text>\n<text x=\"1389\" y=\"1045\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"1039\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"1056\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<rect x=\"576\" y=\"1071\" width=\"944\" height=\"52\" rx=\"0\" fill=\"#fff\" stroke=\"#e3e7ec\"/>\n<text x=\"584\" y=\"1092\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">2089386</text>\n<text x=\"658\" y=\"1095\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">문항 내용 및 수식 미리보기 …</text>\n<text x=\"887\" y=\"1095\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">22-H-MA-…</text>\n<text x=\"999\" y=\"1091\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">행렬의 뜻</text>\n<text x=\"999\" y=\"1108\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">하위 단원</text>\n<text x=\"1100\" y=\"1091\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">주관식-단답형</text>\n<text x=\"1100\" y=\"1108\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">일반형</text>\n<text x=\"1212\" y=\"1097\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">하</text>\n<text x=\"1261\" y=\"1097\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0875d1\">0개</text>\n<text x=\"1308\" y=\"1097\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"11\" font-weight=\"400\" fill=\"#253348\">승인(사용)</text>\n<text x=\"1389\" y=\"1097\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#253348\">-</text>\n<text x=\"1421\" y=\"1091\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">jaehyuk.myung</text>\n<text x=\"1421\" y=\"1108\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"10\" font-weight=\"400\" fill=\"#253348\">2026-11-10</text>\n<text x=\"576\" y=\"1147\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#6b7788\">총 35,566건 중 1∼10 표시</text>\n<rect x=\"916\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"926\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">«</text>\n<rect x=\"950\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"960\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">‹</text>\n<rect x=\"984\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#0870cb\" stroke=\"#dbe0e6\"/>\n<text x=\"994\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#fff\">1</text>\n<rect x=\"1018\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1028\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">2</text>\n<rect x=\"1052\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1062\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">3</text>\n<rect x=\"1086\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1096\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">4</text>\n<rect x=\"1120\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1130\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">5</text>\n<rect x=\"1154\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1164\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">›</text>\n<rect x=\"1188\" y=\"1129\" width=\"31\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#dbe0e6\"/>\n<text x=\"1198\" y=\"1150\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"400\" fill=\"#0870cb\">»</text>\n<circle cx=\"61\" cy=\"314\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"61\" y=\"319\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">01</text>\n<circle cx=\"279\" cy=\"306\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"279\" y=\"311\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">02</text>\n<circle cx=\"577\" cy=\"303\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"577\" y=\"308\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">03</text>\n<circle cx=\"583\" cy=\"351\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"583\" y=\"356\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">04</text>\n<circle cx=\"894\" cy=\"350\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"894\" y=\"355\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">05</text>\n<circle cx=\"1152\" cy=\"351\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"1152\" y=\"356\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">06</text>\n<circle cx=\"578\" cy=\"400\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"578\" y=\"405\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">07</text>\n<circle cx=\"1011\" cy=\"399\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"1011\" y=\"404\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">08</text>\n<circle cx=\"580\" cy=\"450\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"580\" y=\"455\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">09</text>\n<circle cx=\"577\" cy=\"530\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"577\" y=\"535\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">10</text>\n<circle cx=\"577\" cy=\"605\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"577\" y=\"610\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">11</text>\n<circle cx=\"906\" cy=\"1129\" r=\"15\" fill=\"#ed263a\" stroke=\"white\" stroke-width=\"3\"/>\n<text text-anchor=\"middle\" x=\"906\" y=\"1134\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"white\">12</text>\n<rect x=\"1580\" y=\"175\" width=\"672\" height=\"42\" rx=\"0\" fill=\"#202832\" stroke=\"#202832\"/>\n<text x=\"1600\" y=\"203\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"700\" fill=\"#fff\">No.</text>\n<text x=\"1660\" y=\"203\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#fff\">Description</text>\n<rect x=\"1580\" y=\"217\" width=\"672\" height=\"127\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"217\" width=\"62\" height=\"127\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"247\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">01</text>\n<text x=\"1660\" y=\"245\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">업무 메뉴</text>\n<text x=\"1660\" y=\"271\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">문항 관리에서 전체 문항으로 진입합니다. 현재 메뉴를 선택</text>\n<text x=\"1660\" y=\"295\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">상태로 표시합니다. HML·디피니션 등록, 쌍둥이 그룹 관리는</text>\n<text x=\"1660\" y=\"319\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">별도 화면입니다.</text>\n<rect x=\"1580\" y=\"344\" width=\"672\" height=\"127\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"344\" width=\"62\" height=\"127\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"374\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">02</text>\n<text x=\"1660\" y=\"372\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">분류와 단원 범위</text>\n<text x=\"1660\" y=\"398\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">교육과정·학교급·과목군을 선택하고 단원 트리에서 검색 범위를</text>\n<text x=\"1660\" y=\"422\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">정합니다. 안내 문구는 ‘선택한 단원 내에서</text>\n<text x=\"1660\" y=\"446\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">검색됩니다.’입니다.</text>\n<rect x=\"1580\" y=\"471\" width=\"672\" height=\"103\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"471\" width=\"62\" height=\"103\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"501\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">03</text>\n<text x=\"1660\" y=\"499\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">단원 패널 접기</text>\n<text x=\"1660\" y=\"525\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">접기 버튼으로 단원 패널의 표시 영역을 조절합니다. 화면의</text>\n<text x=\"1660\" y=\"549\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">검색 조건과 목록을 함께 볼 때 사용합니다.</text>\n<rect x=\"1580\" y=\"574\" width=\"672\" height=\"103\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"574\" width=\"62\" height=\"103\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"604\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">04</text>\n<text x=\"1660\" y=\"602\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">키워드 검색</text>\n<text x=\"1660\" y=\"628\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">문항 ID·지문 ID·지문·문제·출처코드·등록자 ID·원본</text>\n<text x=\"1660\" y=\"652\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">파일명 중 검색 기준을 선택하고 키워드를 입력합니다.</text>\n<rect x=\"1580\" y=\"677\" width=\"672\" height=\"103\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"677\" width=\"62\" height=\"103\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"707\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">05</text>\n<text x=\"1660\" y=\"705\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">난이도·생성 방식</text>\n<text x=\"1660\" y=\"731\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">난이도는 최상·상·중·하·최하로 조회합니다. 생성 방식은</text>\n<text x=\"1660\" y=\"755\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">HML 변환·디피니션·AI생성·복제를 제공합니다.</text>\n<rect x=\"1580\" y=\"780\" width=\"672\" height=\"103\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"780\" width=\"62\" height=\"103\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"810\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">06</text>\n<text x=\"1660\" y=\"808\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">문항 형태의 연동</text>\n<text x=\"1660\" y=\"834\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">형태1은 객관식·주관식·서술형입니다. 초기에는 형태2·형태3이</text>\n<text x=\"1660\" y=\"858\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">비활성입니다. 상위 형태에 따라 하위 선택지를 갱신합니다.</text>\n<rect x=\"1580\" y=\"883\" width=\"672\" height=\"103\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"883\" width=\"62\" height=\"103\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"913\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">07</text>\n<text x=\"1660\" y=\"911\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">등록일 조건</text>\n<text x=\"1660\" y=\"937\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">기간 입력과 7일·30일·90일·전체 단축 버튼을 제공합니다.</text>\n<text x=\"1660\" y=\"961\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">기본 조회 화면은 전체 기간을 표시합니다.</text>\n<rect x=\"1580\" y=\"986\" width=\"672\" height=\"127\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"986\" width=\"62\" height=\"127\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"1016\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">08</text>\n<text x=\"1660\" y=\"1014\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">배포 조건</text>\n<text x=\"1660\" y=\"1040\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">전체·배포됨·미배포를 선택합니다. 배포 대상 선택은 현재</text>\n<text x=\"1660\" y=\"1064\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">조건에 따라 활성 상태가 달라집니다. 배포 상태와 문항 상태는</text>\n<text x=\"1660\" y=\"1088\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">별개입니다.</text>\n<rect x=\"1580\" y=\"1113\" width=\"672\" height=\"127\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"1113\" width=\"62\" height=\"127\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"1143\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">09</text>\n<text x=\"1660\" y=\"1141\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">상태 및 조회</text>\n<text x=\"1660\" y=\"1167\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">초안·실패(재등록)·승인(사용)·승인(미사용)·폐기로</text>\n<text x=\"1660\" y=\"1191\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">조회합니다. ‘조회’로 조건을 적용하고 ‘초기화’로 필터를</text>\n<text x=\"1660\" y=\"1215\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">초기화합니다.</text>\n<rect x=\"1580\" y=\"1240\" width=\"672\" height=\"103\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"1240\" width=\"62\" height=\"103\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"1270\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">10</text>\n<text x=\"1660\" y=\"1268\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">건수·표시 개수</text>\n<text x=\"1660\" y=\"1294\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">페이지당 10·30·50·100개 표시 옵션을 제공합니다.</text>\n<text x=\"1660\" y=\"1318\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">검색 건수와 표시 구간은 현재 조건의 조회 결과로 갱신합니다.</text>\n<rect x=\"1580\" y=\"1343\" width=\"672\" height=\"127\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"1343\" width=\"62\" height=\"127\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"1373\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">11</text>\n<text x=\"1660\" y=\"1371\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">문항 행과 상세 이동</text>\n<text x=\"1660\" y=\"1397\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">문제 링크를 누르면 해당 문항 상세로 이동합니다. 세트 문항은</text>\n<text x=\"1660\" y=\"1421\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">문항 ID와 지문 ID를 함께 표시합니다. 검색 조건·페이지</text>\n<text x=\"1660\" y=\"1445\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">정보를 상세 이동에 전달합니다.</text>\n<rect x=\"1580\" y=\"1470\" width=\"672\" height=\"127\" rx=\"0\" fill=\"#fff\" stroke=\"#d3d9e1\"/>\n<rect x=\"1580\" y=\"1470\" width=\"62\" height=\"127\" rx=\"0\" fill=\"#f5f6f8\" stroke=\"#d3d9e1\"/>\n<text x=\"1598\" y=\"1500\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#253348\">12</text>\n<text x=\"1660\" y=\"1498\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"#253348\">페이지 이동</text>\n<text x=\"1660\" y=\"1524\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">숫자 및 맨 앞·이전·다음·맨 뒤 버튼으로 이동합니다. 현재</text>\n<text x=\"1660\" y=\"1548\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">페이지를 구분하며 목록 아래에 전체 건수와 표시 구간을</text>\n<text x=\"1660\" y=\"1572\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"16\" font-weight=\"400\" fill=\"#253348\">보여줍니다.</text>\n<text x=\"48\" y=\"1265\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"23\" font-weight=\"700\" fill=\"#253348\">표시·해석 정책</text>\n<text x=\"48\" y=\"1303\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"400\" fill=\"#253348\">• 화면은 실제 CMS의 배치와 컨트롤을 기준으로 재현했습니다. 문항 행은 검토용 예시로 축약했습니다.</text>\n<text x=\"48\" y=\"1333\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"400\" fill=\"#253348\">• 문항 상태는 초안 R / 실패 F / 승인(사용) Y / 승인(미사용) N / 폐기 D입니다.</text>\n<text x=\"48\" y=\"1363\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"400\" fill=\"#253348\">• 쌍둥이 개수, 지문 ID, 배포 정보는 서로 다른 관계 정보입니다. 상태만으로 관계를 판단하지 않습니다.</text>\n<text x=\"48\" y=\"1393\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"17\" font-weight=\"400\" fill=\"#253348\">• 상세·수정·세트·쌍둥이 팝업은 후속 화면설계서에서 각각 작성합니다.</text>\n<text x=\"48\" y=\"1455\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"14\" font-weight=\"400\" fill=\"#6b7788\">확인 근거   개발 CMS 화면 · 전체 문항 목록 · 2026.11.11 확인</text>\n<text x=\"48\" y=\"1482\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"14\" font-weight=\"400\" fill=\"#6b7788\">경로   /item/all/list.donga?unitCurriculum=22</text>\n<text x=\"48\" y=\"1532\" font-family=\"Noto Sans KR, sans-serif\" font-size=\"14\" font-weight=\"400\" fill=\"#6b7788\">MST_ITM_01   ·   Master CMS 화면설계서   ·   1차 검토</text>\n</svg>");freeze(imported);
  for(const n of [...f.children])n.remove();
  for(const n of [...imported.children]){const x=n.x,y=n.y;f.appendChild(n);n.x=x;n.y=y}imported.remove();
  // Imported SVG children previously had SCALE constraints; changing the frame
  // height stretched them vertically. Keep original coordinates and sizes.
  for(const n of [...f.children])if(n.x>=1580&&n.y>=150)n.remove();
  s.displayNotes=[["업무 메뉴", "문항 관리에서 전체 문항으로 진입합니다. 현재 메뉴를 선택 상태로 표시합니다. HML·디피니션 등록, 쌍둥이 그룹 관리는 별도 화면입니다."], ["분류와 단원 범위", "교육과정·학교급·과목군을 선택하고 단원 트리에서 검색 범위를 정합니다. 안내 문구는 ‘선택한 단원 내에서 검색됩니다.’입니다."], ["단원 패널 접기", "접기 버튼으로 단원 패널의 표시 영역을 조절합니다. 화면의 검색 조건과 목록을 함께 볼 때 사용합니다."], ["키워드 검색", "문항 ID·지문 ID·지문·문제·출처코드·등록자 ID·원본 파일명 중 검색 기준을 선택하고 키워드를 입력합니다."], ["난이도·생성 방식", "난이도는 최상·상·중·하·최하로 조회합니다. 생성 방식은 HML 변환·디피니션·AI생성·복제를 제공합니다."], ["문항 형태의 연동", "형태1은 객관식·주관식·서술형입니다. 초기에는 형태2·형태3이 비활성입니다. 상위 형태에 따라 하위 선택지를 갱신합니다."], ["등록일 조건", "기간 입력과 7일·30일·90일·전체 단축 버튼을 제공합니다. 기본 조회 화면은 전체 기간을 표시합니다."], ["배포 조건", "전체·배포됨·미배포를 선택합니다. 배포 대상 선택은 현재 조건에 따라 활성 상태가 달라집니다. 배포 상태와 문항 상태는 별개입니다."], ["상태 및 조회", "초안·실패(재등록)·승인(사용)·승인(미사용)·폐기로 조회합니다. ‘조회’로 조건을 적용하고 ‘초기화’로 필터를 초기화합니다."], ["건수·표시 개수", "페이지당 10·30·50·100개 표시 옵션을 제공합니다. 검색 건수와 표시 구간은 현재 조건의 조회 결과로 갱신합니다."], ["문항 행과 상세 이동", "문제 링크를 누르면 해당 문항 상세로 이동합니다. 세트 문항은 문항 ID와 지문 ID를 함께 표시합니다. 검색 조건·페이지 정보를 상세 이동에 전달합니다."], ["페이지 이동", "숫자 및 맨 앞·이전·다음·맨 뒤 버튼으로 이동합니다. 현재 페이지를 구분하며 목록 아래에 전체 건수와 표시 구간을 보여줍니다."]].map((a,i)=>({key:String(i+1),number:i+1,label:a[0],body:a[1]}));
  s.displayNotes[10].body+=' 조건에 맞는 결과가 없으면 빈 목록을 표시합니다. 고유 안내 문구와 빈 결과의 페이지 처리 규칙은 추가 확인이 필요합니다.';
  // The original vector UI and its twelve corresponding callouts stay intact.
 }else{
  for(const n of [...f.children])if((n.x>=1580&&n.y>=220)||n.name.startsWith('요소 번호 '))n.remove();
  s.displayNotes=s.notes;
  const scale=1490/s.image.width;const used={};
  for(const n of s.notes){let x=48+n.anchor.x*scale,y=220+n.anchor.y*scale;const key=Math.round(x/30)+'/'+Math.round(y/30),idx=used[key]||0;used[key]=idx+1;x+=idx*38;cue(f,Math.max(65,Math.min(1520,x)),Math.max(238,y),n.number)}
 }
 const x=1980,w=872;let y=220;rect(f,x,y,w,46,'#202832','#202832');text(f,x+18,y+8,w-35,'No.     Description · 요소 / 동작 / 정책',20,true,'#ffffff');y+=46;
 for(const n of s.displayNotes){const start=y;const bg=rect(f,x,y,w,100),no=rect(f,x,y,62,100,'#f5f6f8');text(f,x+16,y+18,42,String(n.number).padStart(2,'0'),18,true);const h=text(f,x+80,y+16,w-110,n.label,21,true);const b=text(f,x+80,h.y+h.height+8,w-110,n.body);y=b.y+b.height+22;bg.resize(w,y-start);no.resize(62,y-start);bg.setPluginData('cmsRevisionNote',n.key);h.setPluginData('cmsRevisionNote',n.key);b.setPluginData('cmsRevisionNoteBody',n.key)}
 const bottom=Math.max(...f.children.filter(n=>n.x<1580).map(n=>n.y+n.height),1300);f.resize(2900,Math.max(bottom+60,y+60));
 const bg=f.children[0];if(bg.type==='RECTANGLE')bg.resize(f.width,f.height);
 const banner=f.children.find(n=>n.type==='RECTANGLE'&&Math.abs(n.x-40)<2&&Math.abs(n.y-32)<2);if(banner)banner.resize(2820,banner.height);
 f.setPluginData('cmsRevisionNotes',JSON.stringify(s.displayNotes));f.setPluginData('cmsRevisionCommentPass','primary-complete');
 const sec=figma.getNodeById(ix[s.id].section);sec.resizeWithoutConstraints(Math.max(sec.width,4400),Math.max(sec.height,f.y+f.height+120));
}
figma.root.setPluginData('cmsRevisionCommentPlan',JSON.stringify(PLAN));
figma.notify('CMS_COMMENT_PRIMARY_DONE '+JSON.stringify({screens:30,notes:PLAN.screens.reduce((a,s)=>a+s.displayNotes.length,0),duplicateNotesRemoved:PLAN.commentRevision.duplicateNotesRemoved}),{timeout:60000});
