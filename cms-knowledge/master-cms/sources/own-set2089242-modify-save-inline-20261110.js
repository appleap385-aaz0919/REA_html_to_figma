
            function openWebhwpEditor(url) {
                var win = window.open(url, 'webhwpEditor', 'width=1280,height=900,resizable=yes,scrollbars=yes');
                if (win) win.focus();
                else showToast('팝업이 차단되었습니다. 브라우저 설정에서 허용해 주세요.', 'danger');
            }

            // HML 슬롯 정의 — 수신·payload 가 이 목록 하나만 봄(슬롯이 1개든 4개든 코드 동일, 안 온 슬롯은 null = 서버가 기존 경로를 이어받음)
            window.HML_SLOTS = [
                { slot: 'passage', field: 'passageFilename', imageField: 'passageImageUrl' },
                { slot: 'translation', field: 'translationFilename', imageField: 'translationImageUrl' },
                { slot: 'question', field: 'questionFilename', imageField: 'questionImageUrl' },
                { slot: 'explain', field: 'explainFilename', imageField: 'explainImageUrl' }
            ];

            // 저장 payload 가 읽는 슬롯별 저장 결과 주소(표시용 input 이 아니라 이 값이 출처) — 이미지는 HML 과 다른 임시 주소라 서버가 유추할 수 없어 같이 넘김
            window.webhwpSavedHml = {};
            window.webhwpSavedImage = {};

            // 편집 팝업이 파일을 열 때마다 그 슬롯 하나만 물어봄(webhwp.js slotFromOpener) — 열 파일의 출처를 이 화면 하나로 두고, 저장 결과가 있으면 그쪽 우선(저장 전 재편집이 방금 고친 내용에서 이어지게)
            window.webhwpSlot = function (slot) {
                var el = document.querySelector('[data-webhwp-path="' + slot + '"]');
                if (!el) return null;

                return {
                    slot: slot,
                    path: el.value,
                    url: window.webhwpSavedHml[slot] || el.getAttribute('data-url')
                };
            };

            // 편집 창 저장 시 슬롯별 저장 결과 URL 2종이 넘어옴(webhwp.js notifyParent) — 기안기 서버 주소라 저장 때 서버가 우리 경로로 옮긴다
            window.addEventListener('message', function (e) {
                if (e.origin !== location.origin || !e.data || e.data.type !== 'webhwp-saved') return;

                // window.opener 는 문서가 아니라 창이라 팝업을 열어둔 채 화면만 다른 문항·앵커로 옮겨도 결과가 넘어옴 — 팝업 주소에 박힌 신원과 지금 화면 값을 문자열끼리 대조(URLSearchParams·dataset 모두 문자열)
                var owner = document.querySelector('[data-editor-url]');
                if (!owner || e.data.itemId !== owner.dataset.itemId
                        || e.data.itemDetailId !== owner.dataset.itemDetailId) {
                    console.warn('[webhwp] 다른 문항의 저장 결과라 버린다', e.data);
                    bootstrap.Modal.getOrCreateInstance(document.getElementById('hmlMismatchModal')).show();
                    return;
                }

                var slot = e.data.slot;
                var known = window.HML_SLOTS.some(function (s) { return s.slot === slot; });
                if (!known) {
                    console.warn('[webhwp] 알 수 없는 슬롯', slot, e.data);
                    return;
                }

                // 담는 게 먼저다. 아래 표시용 칸은 확인용이라 걷혀도 저장은 이어져야 한다
                window.webhwpSavedHml[slot] = e.data.hmlUrl || '';
                window.webhwpSavedImage[slot] = e.data.imageUrl || '';

                var hml = document.querySelector('[data-webhwp-result="' + slot + '.hml"]');
                var image = document.querySelector('[data-webhwp-result="' + slot + '.image"]');
                if (hml) hml.value = e.data.hmlUrl || '';
                if (image) image.value = e.data.imageUrl || '';
                showSavedHmlImage(slot, e.data.imageUrl);
                showToast('한글 편집 내용을 받았습니다. 임시 저장 또는 전체 반영을 눌러야 반영됩니다.');
            });

            // 슬롯 카드 이미지를 방금 저장한 것으로 바꿈 — 칸을 새로 그려 빈 슬롯·불러오기 실패 문구가 있던 슬롯도 같은 길로 간다. 주소는 기안기 임시 주소(전체 반영 때 서버가 우리 경로로 옮김)
            function showSavedHmlImage(slot, imageUrl) {
                var box = document.querySelector('[data-webhwp-image="' + slot + '"]');
                if (!box || !imageUrl) return;

                var thumb = document.createElement('div');
                var link = document.createElement('a');
                var img = document.createElement('img');

                thumb.className = 'hml-thumb';
                link.href = imageUrl;
                link.target = '_blank';
                img.className = 'img-fluid border rounded';
                img.src = imageUrl;
                // 실패 문구에 원본 주소를 data-src 로 남김(개발자 도구 확인용)
                img.onerror = function () {
                    var failed = document.createElement('div');

                    failed.className = 'text-secondary';
                    failed.dataset.src = imageUrl;
                    failed.textContent = '이미지를 불러오지 못했습니다.';
                    thumb.replaceChildren(failed);
                };

                link.appendChild(img);
                thumb.appendChild(link);
                box.replaceChildren(thumb);
            }
        

/* NEXT INLINE BLOCK */


        (function () {
            var itemId = 2089242;
            // 진입 때 어느 앵커를 로드했는지. 편집 안 한 HML 은 서버가 이 앵커의 경로를 이어받는다
            var loadDraft = false;
            // 저장·취소가 모두 상세로 복귀 — 목록에서 물고 온 검색조건을 그대로 되돌려야 이전/다음이 원래 결과 안에서 이어지고, draft 는 수정 진입 옵션이라 뺀다
            var detailUrl = (function () {
                var params = new URLSearchParams(location.search);
                params.delete('draft');
                params.set('itemId', itemId);

                return '/item/all/detail.donga?' + params.toString();
            })();

            // 진입 원본 문서. 편집기 미마운트 탭 fallback
            function readDoc(dataId) {
                var el = document.getElementById(dataId);
                if (!el || !el.textContent.trim()) return null;
                try { return JSON.parse(el.textContent); } catch (e) { return null; }
            }
            // 편집기에서 문서 꺼내기 — validate 면 save() 로 편집기 검증, 아니면 getDocument() 로 검증 없이
            function extractDoc(editor, validate) {
                if (validate) {
                    var result = editor.save();
                    return { ok: result.ok, doc: result.document };
                }
                var doc = editor.getDocument();
                return { ok: !!doc, doc: doc };
            }
            // 진입 형태와 지금 형태가 선지 경계(N지 선다 여부)를 사이에 두는지
            function choiceChanged() {
                var cur = document.getElementById('qtCurrent');
                var type = document.getElementById('qtType');
                if (!cur || !type || !window.isChoiceType) return false;
                return window.isChoiceType(cur.value) !== window.isChoiceType(type.value);
            }
            // 편집기 미마운트인데 경계를 넘은 문항 — 화면 밖 임시 편집기로 선지 영역만 맞춰 꺼내고 바로 버림(HTML 수정 탭 마운트와 별개라 레이아웃 무관)
            function syncedDocWithoutEditor(doc, validate) {
                var host = document.createElement('div');
                host.className = 'd-none';
                document.body.appendChild(host);
                var editor = null;
                try {
                    editor = window.createQuestionEditor(host, doc);
                    if (!editor.setMultipleChoice(window.isChoiceType(document.getElementById('qtType').value)).ok) return { ok: false, doc: null };
                    return extractDoc(editor, validate);
                } finally {
                    if (editor) editor.destroy();
                    host.remove();
                }
            }
            // 편집기의 현재 값(미마운트 탭이면 진입 원본, 문항이 선지 경계를 넘었으면 임시 편집기로 맞춘 원본). 문서를 못 만들면 ok=false(원본으로 대신 보내면 편집이 조용히 사라짐)
            function currentDoc(editorKey, dataId, validate) {
                var editor = window.itemEditors && window.itemEditors[editorKey];
                try {
                    if (editor) return extractDoc(editor, validate);
                    var original = readDoc(dataId);
                    if (editorKey !== 'question' || !original || !window.createQuestionEditor || !choiceChanged()) return { ok: true, doc: original };
                    return syncedDocWithoutEditor(original, validate);
                } catch (e) {
                    console.error(editorKey + ' 문서 생성 실패', e);
                    return { ok: false, doc: null };
                }
            }
            // 문항·지문 둘 다 — 하나라도 못 만들면 멈추고 그 편집기로 이동(검증 오류는 편집기가 띄우므로 토스트는 어디를 볼지만)
            function collectDocs(validate) {
                var question = currentDoc('question', 'questionEditorData', validate);
                var passage = currentDoc('passage', 'passageEditorData', validate);
                if (question.ok && passage.ok) return { question: question.doc, passage: passage.doc };

                showToast(validate ? '편집 내용에 오류가 있습니다 — 편집기 안내를 확인해주세요' : '편집 내용을 문서로 만들지 못했습니다', 'danger');
                moveTo({ tab: '#tabItem', target: passage.ok ? 'questionEditor' : 'passageEditor' });

                return null;
            }
            // OMR 탭 좌측 뷰어를 저장될 문서로 다시 그림 — 검증 없이 꺼내고 못 만들면 직전 화면 유지(오류 안내는 저장 때)
            function refreshOmrViewer() {
                if (!window.renderQuestionView) return;
                var question = currentDoc('question', 'questionEditorData', false);
                var passage = currentDoc('passage', 'passageEditorData', false);
                var questionBox = document.querySelector('#tabOmr .qv-item');
                var passageTarget = document.querySelector('#tabOmr .qv-passage .qv-render');

                if (question.ok && question.doc && questionBox) {
                    var target = questionBox.querySelector('.qv-render');
                    target.replaceChildren();
                    window.renderQuestionView(target, question.doc, questionBox.getAttribute('data-qv-layout'));
                }
                if (passage.ok && passage.doc && passageTarget) {
                    passageTarget.replaceChildren();
                    window.renderPassageView(passageTarget, passage.doc);
                }
            }
            // 탭이 보이기 전(show)에 그려 옛 내용이 비치지 않게, 형태 변경은 선지가 바뀔 수 있으므로 OMR 탭에 있을 때만
            var omrTabLink = document.querySelector('.nav-tabs a[href="#tabOmr"]');
            if (omrTabLink) omrTabLink.addEventListener('show.bs.tab', refreshOmrViewer);
            ['qtCategory', 'qtAnswer', 'qtType'].forEach(function (id) {
                var sel = document.getElementById(id);
                if (sel) sel.addEventListener('change', function () {
                    if (document.querySelector('#tabOmr.active')) refreshOmrViewer();
                });
            });
            // 현재 슬롯에 렌더된 유형 기준 serialize → {omr, answer}
            function serializeOmr() {
                var root = document.querySelector('#omrSlot [data-omr-code]');
                if (!root) return { omr: null, answer: null };
                var ser = (window.omrSerializers || {})[root.getAttribute('data-omr-code')];
                if (!ser || typeof ser.serialize !== 'function') return { omr: null, answer: null };
                try { return ser.serialize(root); }
                catch (e) { console.error('OMR 직렬화 실패', e); return { omr: null, answer: null }; }
            }
            function codes(listId) {
                return Array.prototype.map.call(
                    document.querySelectorAll('#' + listId + ' [data-code]'),
                    function (el) { return el.getAttribute('data-code'); });
            }
            // 편집 창이 postMessage 로 넘긴 저장 결과를 슬롯별 8필드로 묶음 — 편집 안 한 슬롯은 null(서버가 기존 경로 유지로 읽음), 이미지는 저장 컬럼이 없지만 HML 과 같은 이름으로 옮기려 함께 보냄
            function hmlFilenames() {
                return window.HML_SLOTS.reduce(function (acc, s) {
                    acc[s.field] = window.webhwpSavedHml[s.slot] || null;
                    acc[s.imageField] = window.webhwpSavedImage[s.slot] || null;

                    return acc;
                }, {});
            }
            function selVal(id) {
                var el = document.getElementById(id);
                return el ? el.value : null;
            }
            // 유형정보 = 반영(ON, 체크)된 것만 code 수집(OFF는 저장 대상 아님)
            function collectConcepts() {
                return Array.prototype.filter.call(
                    document.querySelectorAll('#conceptList [data-code]'),
                    function (el) {
                        var chk = el.querySelector('input[type="checkbox"]');
                        return chk && chk.checked;
                    }).map(function (el) { return el.getAttribute('data-code'); });
            }
            function behaviorCode() {
                var el = document.querySelector('#behaviorList [data-code]');
                return el ? el.getAttribute('data-code') : null;
            }
            // 검색용 content = 문서의 content.promptText(중간 key 없으면 null)
            function promptText(doc) {
                return (doc && doc.content && doc.content.promptText) || null;
            }
            function buildPayload(docs) {
                var omr = serializeOmr();
                // filename 4종은 슬롯 목록에서 한 번에 만들어 합친다
                return Object.assign({
                    itemId: itemId,
                    loadDraft: loadDraft,
                    // 임시저장은 검사를 안 거쳐 미선택이 그대로 오며 처리는 컬럼 제약이 가름 — difficulty 는 nullable 이라 null, question_type 은 NOT NULL 이라 빈 문자열
                    difficulty: selVal('mfDifficulty') || null,
                    questionType: selVal('qtType'),
                    thumbnailPath: selVal('thumbnailPath') || null,
                    questionData: docs.question,
                    questionContent: promptText(docs.question),
                    passageData: docs.passage,
                    passageContent: promptText(docs.passage),
                    omr: omr.omr,
                    answer: omr.answer,
                    unitCodes: codes('unitList'),
                    achievementCodes: codes('achievementList'),
                    domainCodes: codes('domainList'),
                    competencyCodes: codes('competencyList'),
                    behaviorCode: behaviorCode(),
                    conceptCodes: collectConcepts()
                }, hmlFilenames());
            }

            // 폼 밖 fetch 라 XSRF-TOKEN 쿠키를 헤더로 직접 부착(common.js htmx 전역과 동일 규칙)
            function csrfHeader() {
                var m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
                return m ? { 'X-XSRF-TOKEN': decodeURIComponent(m[1]) } : {};
            }

            // 고른 썸네일을 여기서 올림 — 경로가 버전 id 를 품어 저장 직전에야 번호가 정해지고(서버가 경로에서 되읽어 같은 값으로 INSERT), 올린 뒤 hidden 을 채워야 payload 에 새 경로가 실린다
            function uploadPendingThumbnail() {
                var file = window.pendingThumbnail;
                if (!file) return Promise.resolve();

                return fetch('/item/all/thumbnail-upload-url.donga', {
                    method: 'POST',
                    headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, csrfHeader()),
                    body: new URLSearchParams({ itemId: itemId, fileName: file.name })
                })
                    .then(function (res) {
                        if (!res.ok || res.redirected) throw new Error('thumbnail-upload-url ' + res.status);

                        // 발급 결과는 본문이 아니라 HX-Trigger 헤더로 온다(htmx 사용처와 같은 응답)
                        return JSON.parse(res.headers.get('HX-Trigger')).thumbnailUploadReady;
                    })
                    .then(function (issued) {
                        return putToPresigned(file, issued.uploadUrl, issued.contentType).then(function () {
                            document.getElementById('thumbnailPath').value = issued.filePath;
                            window.pendingThumbnail = null;
                        });
                    })
                    .catch(function () {
                        var failed = new Error('썸네일 업로드에 실패했습니다.');
                        failed.rejected = true;

                        throw failed;
                    });
            }

            // 성공/실패만 알리는 Promise. 성공 후 무엇을 할지는 호출부가 정한다
            function save(url, docs) {
                showLoadingOverlay();
                return uploadPendingThumbnail()
                    .then(function () {
                        return fetch(url, {
                            method: 'POST',
                            headers: Object.assign({ 'Content-Type': 'application/json' }, csrfHeader()),
                            body: JSON.stringify(buildPayload(docs))
                        });
                    })
                    .then(function (res) {
                        // 세션이 끊기면 302 를 따라가 로그인 HTML 을 200 으로 받는다. 성공으로 보면 저장 안 된 채 화면을 떠난다
                        if (!res.ok || res.redirected) throw new Error(url + ' ' + res.status);

                        // 검증 반려도 200(HxResponse.toast) 이라 상태코드로는 못 가림 — htmx 는 헤더가 토스트가 되지만 fetch 라 직접 읽는다
                        var trigger = res.headers.get('HX-Trigger');
                        if (!trigger) return;

                        var payload = JSON.parse(trigger);
                        if (!payload.showToast) return;

                        var rejected = new Error(payload.showToast.message);
                        rejected.rejected = true;
                        throw rejected;
                    })
                    .finally(function () { hideLoadingOverlay(); });
            }

            function leave() {
                showLoadingOverlay();
                location.href = detailUrl;
            }

            // 성공은 이동(이 화면의 토스트가 사라지므로 착지 화면에서 띄움), 실패는 잔류 — 반려는 서버 문구 그대로(무엇을 고칠지는 서버만 앎)
            function saveAndLeave(url, docs, doneMessage, failMessage) {
                save(url, docs)
                    .then(function () {
                        toastAfterMove(doneMessage);
                        leave();
                    })
                    .catch(function (e) { showToast(e.rejected ? e.message : failMessage, 'danger'); });
            }

            // 저장은 되돌릴 수 없어 실행 전에 한 번 묻는다. 취소는 닫기만 해서 화면이 유지된다
            function confirmThen(modalId, run) {
                var modalEl = document.getElementById(modalId);
                modalEl.querySelector('[data-action-ok]').addEventListener('click', function () {
                    bootstrap.Modal.getOrCreateInstance(modalEl).hide();
                    run();
                });

                return function () { bootstrap.Modal.getOrCreateInstance(modalEl).show(); };
            }

            // 전체반영 필수 검사(임시저장은 채우다 만 상태라 안 검) — 판정은 ItemValidate, 여기는 항목별 이동 자리
            var REQUIRED_PLACE = {
                difficulty: { tab: '#tabMeta', target: 'mfDifficulty' },
                unit: { tab: '#tabMeta', target: 'unitList' },
                behavior: { tab: '#tabMeta', target: 'behaviorList' },
                questionType: { tab: '#tabItem', target: 'qtType' }
            };

            // 다른 탭에 있으면 그 탭으로 이동(토스트만으로는 어느 탭인지 모름) — 전환이 fade 라 끝난 뒤에 스크롤해야 자리가 맞는다
            function moveTo(field) {
                var el = document.getElementById(field.target);
                if (!el) return;

                function reveal() {
                    if (typeof el.focus === 'function') el.focus({ preventScroll: true });
                    el.scrollIntoView({ block: 'center' });
                }

                var link = document.querySelector('.nav-tabs [href="' + field.tab + '"]');
                if (!link || link.classList.contains('active')) {
                    reveal();
                    return;
                }

                link.addEventListener('shown.bs.tab', reveal, { once: true });
                bootstrap.Tab.getOrCreateInstance(link).show();
            }

            // 문구는 빈 것을 모아 한 줄, 이동은 첫 항목으로
            function validateRequired() {
                var empty = window.ItemValidate.missing({
                    difficulty: selVal('mfDifficulty'),
                    unit: codes('unitList'),
                    behavior: behaviorCode(),
                    questionType: selVal('qtType')
                });
                if (!empty.length) return true;

                showToast(window.ItemValidate.message(empty), 'danger');
                moveTo(REQUIRED_PLACE[empty[0].key]);

                return false;
            }

            // 전체반영 OMR 검사 — 현재 슬롯 리프의 규칙(규칙 없는 유형은 통과), 걸리면 OMR 탭으로
            function validateOmr() {
                var msg = window.OmrValidate.check(document.querySelector('#omrSlot [data-omr-code]'));
                if (!msg) return true;

                showToast(msg, 'danger');
                moveTo({ tab: '#tabOmr', target: 'omrSlot' });

                return false;
            }

            // 임시저장은 채우다 만 상태를 담는 자리라 편집기 검증도 걸지 않는다
            window.itemTempSave = confirmThen('tempSaveModal', function () {
                var docs = collectDocs(false);
                if (!docs) return;

                saveAndLeave('/item/all/temp-save.donga', docs, '임시 저장 되었습니다.', '임시 저장에 실패했습니다.');
            });

            // 되돌릴 수 없는 저장이라 묻기 전에 거름(필수 누락·편집기 검증·OMR 검사 실패면 확인 모달까지 안 감, 순서는 탭 순서) — 모달이 떠 있는 동안은 편집 불가라 검증 때 꺼낸 문서를 그대로 보냄
            var applyDocs = null;
            var openApplyAll = confirmThen('applyAllModal', function () {
                saveAndLeave('/item/all/apply-all.donga', applyDocs, '문항에 반영 되었습니다.', '전체 반영에 실패했습니다.');
            });
            window.itemApplyAll = function () {
                if (!validateRequired()) return;

                applyDocs = collectDocs(true);
                if (applyDocs && validateOmr()) openApplyAll();
            };

            // 취소(탭 줄 · 하단 두 벌)는 변경 유무를 따지지 않고 항상 확인 모달을 거친다(화면 전체 변경감지 수단 없음). 새 탭으로 여는 건 이동이 아니라 묻지 않는다
            var cancelLinks = document.querySelectorAll('[data-cancel-link]');
            if (cancelLinks.length) {
                cancelLinks.forEach(function (cancelLink) {
                    // 새 탭에도 검색조건이 실리도록 복귀 주소로 맞춰 둔다
                    cancelLink.href = detailUrl;
                    cancelLink.addEventListener('click', function (e) {
                        if (isNewTabClick(e)) return;
                        e.preventDefault();
                        bootstrap.Modal.getOrCreateInstance(document.getElementById('saveConfirmModal')).show();
                    });
                });

                document.querySelector('#saveConfirmModal [data-action-ok]').addEventListener('click', leave);
            }
        })();
        