# Definition 이미지 리소스 입력 구조와 ASSET3 QA ZIP

작성일은 2026-11-10입니다. 실제 원본299의 내부 ZIP 세 개를 읽어 관측한 리소스 구조와 로컬 QA 준비물을 기록했습니다. 이번 작업은 로컬 파일만 사용했으며 브라우저·네트워크·CMS API를 호출하거나 CMS에 업로드하지 않았습니다. 이전 MULTI3 ZIP·manifest·보고서와 모든 원본 파일은 보존했습니다.

## 1. 원본과 조사 범위

원본은 [definition299-original-20261110.zip](fixtures/definition299-original-20261110.zip)이며, SHA-256은 `973fbdf6f1d031cc1333d95c9dcef02a9c4a5a0367673383f146c0228c0cc139`입니다. 바깥 ZIP의 멤버는 개별 ZIP 13개이며 루트 JSON은 없습니다. 아래 세 내부 ZIP의 로컬 바이트가 바깥 ZIP의 해당 멤버 및 [원본 목록](definition299-nested-inventory-20261110.json)의 SHA-256과 일치함을 확인했습니다. 다운로드 근거 번호는 상위 조사자가 수집한 2649이며, 이 하위 작업에서는 새 다운로드를 실행하지 않았습니다.

기존 문서299의 상태가 F라는 사실은 상위 조사자가 전달했습니다. 바깥 ZIP의 중첩 구조가 실패 원인이라는 인과관계는 확인하지 않았으며 이 보고서에서도 단정하지 않습니다.

| 선택한 내부 ZIP | 문항 유형 | JSON 바이트 | PNG 수 | 내부 ZIP SHA-256 |
|---|---|---|---|---|
| `750396.zip` | `FIVE_CHOICE` | 3427 | 1 | `ebacf7caf80cb80cafb552fba9d4f671c01f17e05b83630958f3755abe29a7b4` |
| `752815.zip` | `FIVE_CHOICE` | 7643 | 5 | `16b891da42633bdb2aa7985d72ec28ba99d8a468a25155b7e0eb7bfabb171ef8` |
| `100701105.zip` | `SHORT_ANSWER` | 1740 | 0 | `a2e539fae949098a40403e9a76b82d3a609882cbe207a9d757aaf033dfe62cf5` |

| 원본 JSON | SHA-256 |
|---|---|
| `750396.json` | `b3c6c45d84d6b7c4456c37853c1a283f47084047e2f08846650c8233cb5553a1` |
| `752815.json` | `48e64c5adc00a4a825ee80ac08d6bc7d62a0ed3341f3d73b1448c6d9ee68b361` |
| `100701105.json` | `5a8ef45ccf72845d17e0b1f2a6e487547aeffc0c5e247bb66936b945d5867e37` |

원본 목록과 상위 조사자의 관측에 따르면 `750342.zip`은 PNG의 `fileSize` 메타가3967이고 실제 바이트 수는6544입니다. 이 차이를 임의로 보정하지 않고 이번 fixture에서 해당 자료를 제외했습니다. 선택한 여섯 PNG는 모두 원본 메타와 실제 바이트 수가 일치합니다.

## 2. 실제 questionResources 구조

세 JSON의 최상위 구조는 앞서 관측한 16개 필드와 같습니다. 이번 원본에서는 `questionResources`가 비어 있지 않은 두 문항을 실제로 확인했습니다. 정확한 필드명은 `questionResources`이며 별도 `resources` 키를 추가하지 않았습니다. 아래 구조는 이 표본에 실제로 존재하는 필드이며 서버의 전체 스키마나 필수 여부를 확정하는 명세는 아닙니다.

`questionResources`는 연결 객체를 담는 배열입니다. `750396`은1개, `752815`는5개, `100701105`는0개입니다. 각 연결 객체는 다음 5개 필드를 가집니다.

| 필드 | 관측 타입 | 실제 역할과 관측 경계 |
|---|---|---|
| `questionResourceId` | integer | 문항과 리소스 연결 객체의 식별자입니다. QA에서 새 값으로 바꿨습니다. |
| `resourceId` | integer | 중첩된 `resource.resourceId` 및 HTML `img id`와 같은 숫자입니다. |
| `resource` | object | 리소스 정보와 파일·UDL 객체를 담습니다. |
| `createdDtm` | string | `T` 구분자를 쓰는 원본 날짜·시간 문자열입니다. |
| `lastModifiedDtm` | string | 원본 날짜·시간 문자열을 보존했습니다. |

중첩된 `resource` 객체에는 다음 11개 필드가 있습니다.

| 필드 | 관측 타입 | 실제 값 또는 차이 |
|---|---|---|
| `resourceId` | integer | 바깥 연결 객체의 `resourceId`와 같습니다. |
| `resourceName` | string | 본문 이미지는 `750396`, 선지 이미지는 원래의 무작위 PNG 파일명 문자열입니다. |
| `resourceType` | string | 여섯 자산 모두 `IMAGE`입니다. 다른 유형은 미관측입니다. |
| `file` | object | 아래 4개 파일 메타 필드를 담습니다. |
| `udl` | object | 아래 4개 접근성·대체 표현 필드를 담습니다. |
| `createdId` | integer | 본문 이미지는26, 선지 이미지는1입니다. 외부 리소스 ID로 취급하지 않았습니다. |
| `lastModifierId` | integer | 본문 이미지는26, 선지 이미지는1입니다. 그대로 보존했습니다. |
| `deleteYn` | boolean | 여섯 자산 모두 `false`입니다. |
| `createdDtm` | string | 공백 구분자의 `YYYY-MM-DD HH:mm` 형식입니다. |
| `lastModifiedDtm` | string | 원본 형식을 그대로 보존했습니다. |
| `fileName` | string | 이 표본에서는 `file.fileName`과 같습니다. |

| file의 필드 | 관측 타입 | 실제 관계 |
|---|---|---|
| `fileName` | string | ID 접두사를 제외한 원래 PNG 파일명입니다. |
| `filePath` | string | `resource/image/{resourceId}/{resourceId}_{fileName}` 형태이며 HTML `src`와 ZIP 멤버 경로가 같습니다. |
| `fileSize` | integer | 원래 PNG 바이트 수입니다. 이번 fixture에서 수정하지 않았습니다. |
| `fileContentType` | string | 여섯 자산 모두 `image/png`입니다. |

`udl`에는 `altTextContent`, `irScript`, `scriptContent`, `subtitleUrl`이 있습니다. 본문 이미지의 `altTextContent`는 빈 문자열이고 `irScript`에는 한국어 설명이 있습니다. 선지 이미지 다섯 개의 `altTextContent`에는 한국어 설명이 있고 `irScript`는 `null`입니다. 여섯 자산의 `scriptContent`와 `subtitleUrl`은 모두 `null`입니다. UDL의 문구·공백·빈 문자열·`null`을 모두 보존했으며, HTML `alt`와 서로 덮어쓰거나 맞추지 않았습니다.

본문 이미지의 원래 HTML `alt`는 `750396`, 선지 이미지의 `alt`는 `이미지 설명`입니다. `width`, `height`, 본문 이미지의 `alignments` 등 기존 HTML 속성도 유지했습니다. 파일명이나 대체 설명이 QA masterId와 달라도 이를 오류라고 판단해 고치지 않았습니다.

## 3. 문항·선지 배치와 그레이딩

| 원본 | 원래 구조와 보존 사항 | 원래 정답·그레이딩 |
|---|---|---|
| 750396 | 수직선 그림으로 설명되는 덧셈식을 묻는 객관식입니다. 이미지 한 개는 실제 HTML에서 `</d-question>` 뒤, `d-choicewrapper` 앞에 있습니다. 본문용 이미지라는 이유로 `d-question` 안으로 옮기지 않았습니다. | 표시 정답은③이고 `correctValue`는 문자열 `"3"`입니다. |
| 752815 | 집과 우체국을 오간 시간·거리 그래프를 묻는 객관식이며 선지마다 PNG 한 개가 있습니다. 원래 선지 순서, `d-choicecount key`, `circleid`와 공백을 유지했습니다. | 표시 정답은④이고 `correctValue`는 문자열 `"4"`입니다. |
| 100701105 | 252의 소인수분해에서 지수와 소수의 합을 묻는 `SHORT_ANSWER`입니다. 자산이 없으며 원래 `d-input`을 보존했습니다. 유형을 `SHORT_ANSWER_ORDERED`로 바꾸지 않았습니다. | 표시 정답은 `$11$`이고 `correctValue`는 문자열 `"11"`입니다. |

세 문항의 `gradeYn`과 `correctYn`은 모두 `true`입니다. 두 객관식의 `gradingTypeCode`는 `["IGNORE_SPACE"]`, `inputTypeCode`는 `[]`, `equationEditorType`은 `null`입니다. 단답형은 각각 `[]`, `["MATH_FORMULA"]`, `"MATH_TYPE"`입니다. 이 차이를 원래대로 유지했습니다. 날짜도 교정하지 않았으며, 단답형의 최상위 수정 시각과 attribute 수정 시각의 차이 및 `lastModifiedDtmAtLinks`의 음수 연도 문자열도 보존했습니다.

752815의 리소스 배열 순서는 HTML 선지 순서와 다릅니다. 원본 배열을 선지 순서로 재정렬하지 않고 각 이미지의 기존 `id`와 `src`를 기준으로 매핑했습니다.

## 4. ASSET3 QA ID와 파일 구성

새 ZIP은 [QA-DIFI-20261110-05-ASSET3.zip](fixtures/QA-DIFI-20261110-05-ASSET3.zip)입니다. 루트 JSON3개와 실제 PNG6개, 합계9개 멤버로 구성했습니다. 개별 ZIP을 중첩하지 않았으며, PNG는 기존 `resource/image/ID/ID_파일명` 디렉터리 구조를 유지하면서 QA 리소스 ID만 반영했습니다. 별도 디렉터리 멤버나 스크립트·실행 파일·새 자산은 추가하지 않았습니다.

| 원본 | 루트 JSON | QA questionId | QA masterId(string) | QA grading ID | QA correct ID | 추가한 표지 |
|---|---|---|---|---|---|---|
| 750396 | `2116111102.json` | 2116111101 | `"2116111102"` | 2116111103 | 2116111104 | `[QA-DIFI-20261110-05-BODYIMG]` |
| 752815 | `2116111122.json` | 2116111121 | `"2116111122"` | 2116111123 | 2116111124 | `[QA-DIFI-20261110-05-CHOICEIMG]` |
| 100701105 | `2116111142.json` | 2116111141 | `"2116111142"` | 2116111143 | 2116111144 | `[QA-DIFI-20261110-05-SHORT]` |

각 표지는 기존 `<d-question>` 바로 뒤에 `<p><span>[해당 ASCII 표지]</span></p>`로 한 번만 삽입했습니다. 그 외 문제·정답·풀이·문항 유형·그레이딩·UDL·날짜·사용자 ID 등은 그대로입니다. 기존 문제 HTML에서는 승인된 리소스 ID와 `src` 경로만 추가로 교체했습니다.

| 문항 / 기존 배열 인덱스 | 실제 위치 | 원본 연결 ID → QA 연결 ID | 원본 resourceId → QA resourceId |
|---|---|---|---|
| 750396 / 0 | 본문용 이미지 | 11894 → 2116111105 | 10692 → 2116111106 |
| 752815 / 0 | 선지3 | 3482 → 2116111125 | 6205 → 2116111126 |
| 752815 / 1 | 선지2 | 3483 → 2116111127 | 7039 → 2116111128 |
| 752815 / 2 | 선지1 | 3484 → 2116111129 | 9152 → 2116111130 |
| 752815 / 3 | 선지4 | 3485 → 2116111131 | 2882 → 2116111132 |
| 752815 / 4 | 선지5 | 3486 → 2116111133 | 7151 → 2116111134 |

논리적 식별자는 문항·master·grading·correct의12개와 연결 객체6개, 리소스6개의 합계24개입니다. 24개 숫자는 서로 다르고 모두2116111101~2116111199 및 양의 Int32 범위 안에 있습니다. 동일 리소스를 가리키는 바깥 `resourceId`, 중첩 `resource.resourceId`, HTML `img id`는 같은 새 ID를 반복 참조하며 이는 중복 식별자 배정과 구별됩니다. `masterId`만 원본처럼 문자열이고 나머지 ID는 정수입니다.

리소스마다 아래 여섯 위치가 동일한 매핑을 사용합니다.

1. `questionResources[i].resourceId`
2. `questionResources[i].resource.resourceId`
3. HTML `img id`
4. HTML `img src`
5. `questionResources[i].resource.file.filePath`
6. 실제 ZIP의 PNG 멤버 경로

첫 세 위치는 같은 QA 리소스 ID를, 마지막 세 위치는 같은 QA PNG 경로를 가집니다. 리소스명과 `file.fileName`, 중첩 리소스의 `fileName`은 전부 원본 그대로이며, 변경한 파일 경로는 manifest에 원본 경로와 함께 정확히 기록했습니다. 파일명 접미사나 무작위 이름을 QA 이름으로 바꾸지 않았습니다.

| 자산 | 새 HTML src = filePath = ZIP 경로 |
|---|---|
| 본문 / 10692 | `resource/image/2116111106/2116111106_750396_1.png` |
| 선지3 / 6205 | `resource/image/2116111126/2116111126_T3woyHuKGcGVD8uri8eNhd.png` |
| 선지2 / 7039 | `resource/image/2116111128/2116111128_N7PWU76ortr6B9nmp2uH4s.png` |
| 선지1 / 9152 | `resource/image/2116111130/2116111130_MYULDQdE8PmPAmfNpxZNbU.png` |
| 선지4 / 2882 | `resource/image/2116111132/2116111132_dvgUEhDTUfhjBzQhigjmd7.png` |
| 선지5 / 7151 | `resource/image/2116111134/2116111134_fsJonqK29t5b7sR4TbLf9p.png` |

## 5. PNG 바이트 보존과 검토용 복사본

PNG는 원본에서 읽은 바이트를 그대로 ZIP에 넣고 복사했습니다. 편집·크기 조절·재인코딩을 하지 않았습니다. 각 PNG의 원본 바이트, 출력 ZIP 바이트, 검토용 복사본 바이트의 SHA-256이 모두 같습니다. `fileSize` 메타도 원본 값을 유지했습니다.

| 자산 | 원본 fileSize = 실제 바이트 | SHA-256 |
|---|---|---|
| 본문 / 10692 | 14018 | `ff5cc1481912007ed6b5919acb67977c405ab4938efb67f9935027f0640b6762` |
| 선지3 / 6205 | 28438 | `39faa3a6c6fc7aa45601788c9cd322774d345b932f2a3424ccdd3106b1137325` |
| 선지2 / 7039 | 24965 | `310d36359688e424c6d634a0ab1a0648f0e0be39b443388ba0f7d169f49355ee` |
| 선지1 / 9152 | 25362 | `78614401c3a9be3116273b5836ae91b675291ff5271b95760a281338c9d034be` |
| 선지4 / 2882 | 45721 | `809a5d5927348a3c059de8acf5ba6ef5606abee8141ef7d815e6ed5b58c7014b` |
| 선지5 / 7151 | 27028 | `fdbcd0b789bd14304ba24550eb9a5c749cb5449d5d4c47f930375297ad5b7bb2` |

검토용 복사본은 [definition-asset3-source-pixels-20261110](fixtures/definition-asset3-source-pixels-20261110/)에 있습니다. 파일명은 ASCII 안전 문자만 사용했으며 실제 경로도 manifest에 기록했습니다.

- [본문 이미지](fixtures/definition-asset3-source-pixels-20261110/750396_body_resource10692.png)
- [선지1 이미지](fixtures/definition-asset3-source-pixels-20261110/752815_choice01_resource9152.png)
- [선지2 이미지](fixtures/definition-asset3-source-pixels-20261110/752815_choice02_resource7039.png)
- [선지3 이미지](fixtures/definition-asset3-source-pixels-20261110/752815_choice03_resource6205.png)
- [선지4 이미지](fixtures/definition-asset3-source-pixels-20261110/752815_choice04_resource2882.png)
- [선지5 이미지](fixtures/definition-asset3-source-pixels-20261110/752815_choice05_resource7151.png)

## 6. 로컬 검증과 미검증 경계

출력 ZIP을 다시 열어 CRC, 루트 JSON3개·PNG6개, 전체9개 멤버, 중첩 ZIP 및 기타 멤버 부재를 확인했습니다. JSON을 다시 파싱해 masterId와 루트 파일명 stem이 같고 각 표지가 정확히1회 존재함을 확인했습니다. 모든 HTML 이미지 참조가 실제 멤버로 해석되며, 리소스 ID·메타 경로·파일 크기와 PNG 해시가 일관됩니다.

원본과의 재귀 비교에서 바뀐 leaf는 750396이9개, 752815가25개, 단답형이5개입니다. 기본 변경은 문항·master·grading·correct ID와 `questionContent`의5개이며, 리소스마다 연결 ID·바깥 resourceId·중첩 resourceId·filePath의4개가 추가됩니다. `questionContent` 안에서는 표지와 img id/src만 변경했습니다. 이 변경들을 역으로 적용하면 세 원본 JSON 바이트가 완전히 복원되므로 나머지 HTML·공백·escaping·정답·풀이·그레이딩·UDL·날짜는 보존되었습니다.

출력 ZIP은 **167305바이트**이며 SHA-256은 `fa80e0951f058d0dbbfa6037475c7c6ae5170d17dc718380f63be820b541a81d`입니다. 자세한 원본·출력 JSON 해시, 모든 ID와 경로 변경, 원본 PNG 크기와 검증 결과는 [definition-asset3-fixture-manifest-20261110.json](definition-asset3-fixture-manifest-20261110.json)에 기록했습니다.

JSON당 단건1개씩 총3개 생성은 실행 전 기대치입니다. 평탄한 다중 JSON 및 자산의 실제 서버 지원 성공, 세트 지원 성공, 렌더링과 그레이딩 실행을 관측한 것은 아닙니다. 이 원본들에서 세트용 필드는 발견하지 못했으며 전체 세트 입력 스키마를 추측해 추가하지 않았습니다. 문서299의 기존 실패 원인도 확인하지 않았습니다.

상위 조사자는 Source13의 중학1, 공통(C), 학년·단원 prefix12자리 사용을 검토하고 있습니다. 이 하위 작업에서는 등록 메타의 실제 선택이나 서버 반영을 확인하지 않았습니다. 등록 메타와 원본 `questionAttribute` 사이의 우선순위·덮어쓰기·검증 관계는 미검증이며 원본 attribute를 메타에 맞춰 고치지 않았습니다.
