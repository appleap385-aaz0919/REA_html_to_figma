# Definition 본문·선지 이미지의 입력과 승인 전후 보존

이 보고서는 2026-11-10의 **phase54~55, 근거 2760~2818**을 다룹니다. JSON 1개와 본문 PNG 1개인 BODY1, JSON 1개와 선지 PNG 5개인 CHOICE1을 각각 정상 UI로 등록하고 S 최종 승인을 한 번씩 실행했습니다. 두 문서는 최종 Y, 개별 Master는 R/OBSACN이고 저장 OMR/정답은 null입니다. 이 단계의 등록 2회·승인 2회를 더한 확정 Master 업무 누계는 **73회**이며 서비스 배포는 없습니다. 이 정적 작업은 로컬 근거·소스·ZIP을 읽기만 했고 브라우저·네트워크·CMS API·전역 원장/인덱스·기존 보고서/맵을 조작하지 않았습니다. [phase54](session-20261110-phase54.json#L1), [phase55](session-20261110-phase55.json#L1), [BODY1 의도](definition-body1-control-intent-20261110.json#L1), [CHOICE1 의도](definition-choice1-control-intent-20261110.json#L1)

**두 정상 입력과 실제 식별자**

| 항목 |BODY1 |CHOICE1 |
|---|---|---|
|ZIP |QA-DIFI-20261110-09-BODY1.zip, 14933B |QA-DIFI-20261110-10-CHOICE1.zip, 151387B |
|구성 |2116111102.json과 참조 PNG 1개 |2116111122.json과 참조 PNG 5개 |
|입력유형 |FIVE_CHOICE |FIVE_CHOICE |
|등록/승인 |2768/2781에서 각 1회 |2797/2811에서 각 1회 |
|문서 |698, P→R→최종 Y |699, P→R→최종 Y |
|문항/상세 |2089378(2089085) |2089379(2089086) |
|최종 Master |R·OBSACN·OMR/정답 null |R·OBSACN·OMR/정답 null |

두 단독 ZIP은 기존 로컬 ASSET3의 해당 JSON과 참조 PNG 바이트를 그대로 사용합니다. 로컬 ZIP을 읽어 각 멤버가 원본 ASSET3와 동일함을 다시 대조했습니다. ASSET3 전체 ZIP이 등록됐다는 뜻은 아니며, 현재 검증한 정상 입력은 두 단독 구성입니다. 등록 메타는 Source 13·단원 22MMAT0KOK1001020000·페이지 1~3·공통 C로 같았습니다. 이 조합의 수용과 학술적인 단원 정합성은 구분합니다. [본문 구성/메타](definition-body1-control-intent-20261110.json#L1), [선지 구성/메타](definition-choice1-control-intent-20261110.json#L1), [본문 제출 전](evidence/2767-definition-body1-before-submit-verified.json#L53), [선지 제출 전](evidence/2796-definition-choice1-before-submit-verified.json#L53)

BODY1 ZIP의 SHA-256은 `16e9351919f1ff55d76a15879a044b56694c13d29222e65227422a020bb3f020`, CHOICE1은 `4a8c9f66ceaccc74bb9dc8a2b2382e6f186319b328118e77acf977a29cbe1f93`입니다. 각 브라우저 파일 해시·실제 폼 유효성 확인 뒤 등록 버튼을 한 번만 눌렀습니다. [본문 검증/제출](evidence/2767-definition-body1-before-submit-verified.json#L53), [본문 단발 등록](evidence/2768-definition-body1-register-submit-once.json#L53), [선지 검증](evidence/2796-definition-choice1-before-submit-verified.json#L53), [선지 단발 등록](evidence/2797-definition-choice1-register-submit-once.json#L53)

**본문 이미지: 입력 참조→서버 자산→실제 로드**

본문 입력 JSON의 `questionResources` 한 항목의 외부·중첩 resourceId는 2116111106, resourceType=IMAGE, MIME=image/png, 파일 경로 `resource/image/2116111106/2116111106_750396_1.png`, fileSize=14018을 갖습니다. HTML의 img ID도 2116111106이고 같은 상대경로를 참조합니다. 이 입력 메타 정보는 로컬 JSON의 값이며, 서버 정규화 모델과 실제 로드/바이트 검증은 다음의 별도 근거입니다. [입력 멤버/보존 범위](definition-body1-control-intent-20261110.json#L1), [입력 ZIP](fixtures/QA-DIFI-20261110-09-BODY1.zip)

698/R의 정규화 모델은 `img-1`·role=question·MIME=image/png 자산을 만들고 경로를 **`/item/208/2089378/2089085/asset/image-1.png`**로 바꿨습니다. 원래 img ID 2116111106은 유지됩니다. 실제 이미지 관찰은 complete=true·자연크기 1175×467이며, 본문에서 수직선 그림이 로드됐습니다. 모델의 assets.width/height가 null인 것과 실제 이미지 자연크기가 존재하는 것을 구분합니다. [실제 모델/이미지](evidence/2774-definition698-body-image-load-observation.json#L53), [초안 소스 모델](sources/definition698-body-draft-20261110.html#L498)

최종 관측 URL을 별도 인증정보 없이 읽은 기존 HTTP 기록은 200·14018B이며 SHA-256은 **`ff5cc1481912007ed6b5919acb67977c405ab4938efb67f9935027f0640b6762`**입니다. 로컬 입력 PNG와 바이트 전체가 같았습니다. 이번 정적 작업에서도 그 원본 PNG의 길이/해시와 이 기록을 대조했지만 CDN 요청을 새로 보내지는 않았습니다. [본문 이미지 무결성](definition698-image-integrity-20261110.json#L1)

2777의 브라우저 JavaScript 직접 CDN fetch는 TypeError였고 readSucceeded=false였습니다. 같은 관찰은 displayLoaded=true이며, 실제 img의 성공 로드와 별도 HTTP 200/원본 SHA 일치가 확보돼 있습니다. 따라서 이를 이미지 미표시나 업로드 실패 정책으로 분류하지 않습니다. TypeError의 원인이 CORS·인증·브라우저 환경 중 무엇인지는 확인하지 않았습니다. [브라우저 읽기 한계](evidence/2777-definition698-image-byte-integrity-read.json#L53), [실제 img 로드](evidence/2774-definition698-body-image-load-observation.json#L53), [별도 HTTP 무결성](definition698-image-integrity-20261110.json#L1)

S 확인창을 거쳐 2781에서 최종 승인 1회를 실행했고, 신선한 문서 698은 Y·Master 2089378은 R/OBSACN입니다. 2788의 모델과 이미지 관측행은 초안 2774와 같고 본문 이미지도 계속 로드됐습니다. [S 최종 제출](evidence/2781-definition698-s-final-approval-once.json#L53), [문서Y](sources/definition698-body-s-approved-final-20261110.html#L362), [Master/OMR](evidence/2787-definition698-s-master-item-readback.json#L53), [승인 후 이미지](evidence/2788-definition698-approved-image-readback.json#L53)

**선지 이미지: 세 가지 순서의 대조**

CHOICE1의 입력에는 `questionResourceId`와 `resourceId`가 각각 있습니다. 아래 순서에서 사용한 ID는 **resourceId이자 HTML img ID**이며, questionResourceId와 혼동하지 않습니다. 입력 리소스 배열은 2116111126→2116111128→2116111130→2116111132→2116111134이지만, HTML 선지의 img 순서는 2116111130→2116111128→2116111126→2116111132→2116111134입니다. 로컬 JSON과 실제 모델/DOM을 각각 읽어 대조했습니다. [입력 ZIP/구성](definition-choice1-control-intent-20261110.json#L1), [로컬 ZIP](fixtures/QA-DIFI-20261110-10-CHOICE1.zip), [입력/관측 순서 대조](definition699-choice-image-integrity-20261110.json#L1), [실제 모델/이미지 행](evidence/2803-definition699-choice-image-load-observation.json#L53)

| HTML/표시 순번 |HTML img ID |입력 resource 배열의 위치 |서버 asset 파일 |원본/관측 바이트 |
|---|---|---:|---|---:|
|1 |2116111130 |3 |image-1.png |25362 |
|2 |2116111128 |2 |image-2.png |24965 |
|3 |2116111126 |1 |image-3.png |28438 |
|4 |2116111132 |4 |image-4.png |45721 |
|5 |2116111134 |5 |image-5.png |27028 |

실제 다섯 img ID와 순서는 입력 HTML과 같았고, 각 src는 `/item/208/2089379/2089086/asset/image-N.png`로 바뀌었습니다. 정규화 assets는 img-1~5와 role=question·MIME=image/png를 갖습니다. **이번 표본의 자산번호는 HTML 순서에 대응**합니다. 모든 파서 입력에서 같은 알고리즘을 쓴다는 서버 구현까지 읽은 것은 아닙니다. [실제 초안 모델/이미지](evidence/2803-definition699-choice-image-load-observation.json#L53), [초안 소스](sources/definition699-choice-draft-20261110.html#L498), [대응표](definition699-choice-image-integrity-20261110.json#L1)

다섯 이미지는 승인 전에 모두 complete=true·양수 자연크기로 로드됐습니다. 정확한 관측 CDN URL 5개를 인증정보 없이 읽은 기록은 모두 HTTP 200이며, 아래 SHA와 각 바이트가 대응 입력 PNG 전체와 같았습니다. 바이트 대조는 같은 순서의 파일명만 믿고 판정하지 않고, img ID와 원본 resource.file.filePath를 연결해 수행했습니다. [HTTP/전체 바이트 대조](definition699-choice-image-integrity-20261110.json#L1), [실제 로드](evidence/2803-definition699-choice-image-load-observation.json#L53)

- image-1 /2116111130: `78614401c3a9be3116273b5836ae91b675291ff5271b95760a281338c9d034be`
- image-2 /2116111128: `310d36359688e424c6d634a0ab1a0648f0e0be39b443388ba0f7d169f49355ee`
- image-3 /2116111126: `39faa3a6c6fc7aa45601788c9cd322774d345b932f2a3424ccdd3106b1137325`
- image-4 /2116111132: `809a5d5927348a3c059de8acf5ba6ef5606abee8141ef7d815e6ed5b58c7014b`
- image-5 /2116111134: `fdbcd0b789bd14304ba24550eb9a5c749cb5449d5d4c47f930375297ad5b7bb2`

입력의 중첩 resource.file에는 파일경로·크기·MIME이 있고 UDL 관련 메타도 존재합니다. 이번 결과는 이 정상 JSON/PNG 조합의 수용·src 정규화·순서·로드·바이트 일치입니다. MIME/크기 메타를 변조했을 때의 검증, UDL·alt·접근성 정보 전체의 변환, 외부 URL·다른 형식·누락/손상 파일의 실패 정책을 이 결과로 확정하지 않습니다. [입력 보존 범위](definition-choice1-control-intent-20261110.json#L1), [관측/한계](session-20261110-phase55.json#L1)

**선지 S 승인 후 보존과 상태**

2809는 확인창 전환 중 modals=0이었고 2810에서 정확한 shown 모달을 확인했습니다.2811의 최종 승인은 한 번이며 itemIds=2089379/loadFlags=S였습니다. 후속 신선한 문서는 699/Y, Master는 2089379(2089086)/R·OBSACN·저장 OMR/정답 null입니다. 모달 전환 관찰을 서버 실패나 재승인으로 세지 않습니다. [shown 확인](evidence/2810-definition699-s-modal-fresh-observation.json#L53), [최종 1회](evidence/2811-definition699-s-final-approval-once.json#L53), [최종 문서Y](sources/definition699-choice-s-approved-final-20261110.html#L362), [Master/저장 OMR](evidence/2817-definition699-s-master-item-readback.json#L53)

**초안 2803과 승인 후 2818의 models 및 images 배열 전체가 정확히 같습니다.** 이미지 행에는 ID·src/attributeSrc·complete·자연/렌더 크기가 포함됩니다. 승인 후 다섯 이미지도 모두 로드됐습니다. 문서 상태·검수 select 등 페이지 전체가 같다는 뜻은 아닙니다. [승인 전 관측](evidence/2803-definition699-choice-image-load-observation.json#L53), [승인 후 관측](evidence/2818-definition699-approved-five-image-readback.json#L53), [동일성 비교](definition699-choice-after-approval-comparison-20261110.json#L1)

선지 이미지의 원본 바이트/SHA 검증은 승인 전 기록입니다. 승인 후에는 같은 모델·같은 URL·같은 이미지 행과 로드를 대조했으며 파일 바이트를 다시 다운로드하지 않았습니다. 이 두 증거 수준을 구분해 정상 보존 범위를 기록합니다. 문서Y가 Master 문항 Y·저장 OMR/메타 완성·서비스 배포를 뜻하지 않는다는 기존 경계도 유지합니다. [검증 시점/한계](session-20261110-phase55.json#L1), [정확 비교](definition699-choice-after-approval-comparison-20261110.json#L1), [문항R/OMRnull](evidence/2817-definition699-s-master-item-readback.json#L53)

**픽셀 검토와 로컬 준비 오류의 구분**

부모는 본문 2775/2776과 선지 2804/2805/2806 PNG를 직접 열어 검토했습니다. 본문은 전체 1494px에서 0/479·높이 1015, 선지는 전체 2067px에서 0/750/1052·높이 1015로 전체 세로를 덮습니다. 본문 그림과 선지·정답/풀이·하단 액션, 선지 이미지 다섯 개와 카드의 상하단을 확인한 범위입니다. 이 정적 작업은 부모의 검토 기록을 인용하고 PNG 헤더/스크롤 구간을 검사했으며 이미지를 새로 직접 보지 않았습니다. [본문 상단](evidence/2775-definition698-body-image-top-visual.json#L52), [본문 하단](evidence/2776-definition698-body-image-bottom-visual.json#L52), [선지 상단](evidence/2804-definition699-choice-image-top-visual.json#L52), [선지 중간](evidence/2805-definition699-choice-image-middle-visual.json#L52), [선지 하단](evidence/2806-definition699-choice-image-bottom-visual.json#L52), [부모 검토54](session-20261110-phase54.json#L1), [부모 검토55](session-20261110-phase55.json#L1)

이 PNG들은 등록 후 초안 시점입니다. 승인 후에는 신선한 상태/모델/이미지 로드를 대조했지만 새 Y 전체 페이지 PNG까지 검토했다고 확대하지 않습니다. 다른 뷰포트/역할/형식의 시각 완료도 아닙니다. [캡처 시점과 최종 읽기](session-20261110-phase54.json#L1), [선지 전후 범위](session-20261110-phase55.json#L1)

로컬 분리 helper의 ZipInfo 재사용은 메모리의 source offset을 바꿔 검증용 재읽기에 문제를 냈으며 원본 디스크 파일은 보존됐습니다. ZipInfo 복사·원본 바이트 선읽기로 수정한 뒤 등록 전에 재검증했습니다. 2767의 첫 시도는 helper 파일 미생성으로 브라우저 명령 전에 중단돼 증거/커서가 생기지 않았고, 최종 보존 2767은 검증된 기록입니다. 등록 2768은 그 뒤 한 번입니다. 이 로컬 준비 실패를 CMS 등록/파싱 실패나 중복 제출로 기록하지 않습니다. [phase54 localPreparationNote](session-20261110-phase54.json#L1), [최종 검증된2767](evidence/2767-definition-body1-before-submit-verified.json#L53), [단발 제출2768](evidence/2768-definition-body1-register-submit-once.json#L53)

정상 본문/선지 PNG 범위는 완료됐으며, 자산누락/손상/MIME·크기 불일치·다른 형식/외부리소스·이미지 첨부 실패/복구·다중JSON/정상 Definition 세트·혼합 검수는 남아 있습니다. 해석 HML과 정상 Definition 세트는 현재 실행 가능한 정상 표본이 없는 미검증 범위이며, 다른 독립조사를 이어갈 대상입니다. 전체 사이트 완료 분모는 알 수 없고 100% 완료를 주장하지 않습니다. [남은 범위](session-20261110-phase55.json#L1)
