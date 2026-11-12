// OMR 미리보기. 편집 중인(저장 전) OMR·정답을 프론트(douclass_exambank) /omr-preview 에 넘겨 그린다.
// 폼 없는 화면(문항 상세)은 버튼의 data-saved-omr · data-saved-answer(저장된 JSON)를 그대로 넘긴다.
// 흐름: 버튼 → 그 카드의 유형 폼 직렬화(누른 순간의 스냅샷) → 모달 iframe 로드
//       → iframe 'ready' → 'render' 전송 → iframe 'rendered' 높이 반영.
// 모달을 닫으면 iframe 을 지운다. 다시 누르면 그때 값으로 처음부터 그린다.
// 모달 마크업·주소는 templates/common/omr-preview.html (:: modal)
(function () {
    'use strict';
    if (window.__omrPreviewBound) return;
    window.__omrPreviewBound = true;

    var CHANNEL = 'donga-omr-preview'; // 프론트 pages/omr-preview.vue 와 같은 표식
    var READY_TIMEOUT = 15000; // 로컬 dev 서버는 첫 컴파일이 느리다
    var MIN_HEIGHT = 360; // 아래쪽 드롭다운이 iframe 밖으로 잘리지 않을 여유

    var frame = null; // 지금 모달의 iframe
    var origin = ''; // iframe 출처. 받을 때 검사하고 보낼 때 대상으로 쓴다
    var snapshot = null; // 버튼을 누른 순간의 { omr, answer }
    var timer = null;

    function modalEl() {
        return document.getElementById('omrPreviewModal');
    }

    function showAlert(msg) {
        var el = modalEl().querySelector('[data-omr-preview-alert]');
        el.textContent = msg || '';
        el.classList.toggle('d-none', !msg);
    }

    function reset() {
        clearTimeout(timer);
        timer = null;
        if (frame) frame.remove();
        frame = null;
        snapshot = null;
        showAlert('');
    }

    // 버튼이 든 카드의 유형 폼만 읽는다. document 전체에서 찾으면 숨김 소스(#omrSource)의 같은 폼이 먼저 잡힌다
    function serialize(btn) {
        var card = btn.closest('.card');
        var root = card && card.querySelector('[data-omr-code]');
        var ser = root && (window.omrSerializers || {})[root.getAttribute('data-omr-code')];
        if (!ser || typeof ser.serialize !== 'function') throw new Error('이 유형의 OMR 직렬화기가 없습니다.');
        return ser.serialize(root);
    }

    // 저장된 JSON(문항 상세) — 비면 null 로 두고 검사가 반려
    function readSaved(btn) {
        return {
            omr: JSON.parse(btn.getAttribute('data-saved-omr') || 'null'),
            answer: JSON.parse(btn.getAttribute('data-saved-answer') || 'null')
        };
    }

    function render() {
        if (!frame || !snapshot) return;
        // 정답이 실려 가므로 대상 출처를 못 박는다('*' 금지)
        frame.contentWindow.postMessage({
            source: CHANNEL,
            type: 'render',
            omr: snapshot.omr,
            answer: snapshot.answer
        }, origin);
    }

    function open(url, data) {
        var el = modalEl();
        reset();
        snapshot = data;
        origin = new URL(url).origin;

        frame = document.createElement('iframe');
        frame.className = 'd-block w-100 border-0';
        frame.style.height = MIN_HEIGHT + 'px';
        frame.title = 'OMR 미리보기';
        frame.src = url;
        el.querySelector('[data-omr-preview-stage]').appendChild(frame);

        // 늦게라도 'ready' 가 오면 안내를 걷고 그린다
        timer = setTimeout(function () {
            showAlert('미리보기 페이지가 응답하지 않습니다. 주소를 확인해 주세요: ' + url);
        }, READY_TIMEOUT);
        window.bootstrap.Modal.getOrCreateInstance(el).show();
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.omr-preview-btn');
        if (!btn) return;

        var el = modalEl();
        var url = el ? el.getAttribute('data-preview-url') : '';
        try {
            new URL(url);
        } catch (err) {
            showToast('OMR 미리보기 주소가 설정되지 않았습니다.', 'danger');
            return;
        }

        var saved = btn.hasAttribute('data-omr-saved');
        var data;
        try {
            data = saved ? readSaved(btn) : serialize(btn);
        } catch (err) {
            console.error('OMR 읽기 실패', err);
            showToast(saved ? '저장된 OMR 을 읽지 못했습니다.' : 'OMR 편집 내용을 읽지 못했습니다.', 'danger');
            return;
        }
        // 상세는 검사부터 — 저장된 OMR 이 비어도 「OMR 이 입력되지 않았습니다.」 사유로 반려
        var savedMsg = saved && window.OmrValidate ? window.OmrValidate.checkData(btn.getAttribute('data-question-type'), data) : null;
        if (savedMsg) {
            showToast('OMR 미리보기 불가\n' + savedMsg, 'danger');
            return;
        }
        if (!data || !Array.isArray(data.omr) || !data.omr.length) {
            showToast('미리 볼 OMR 항목이 없습니다.', 'danger');
            return;
        }
        // 유효성 검사 — 걸리면 모달을 열지 않고 사유만(문항 수정 · lab 공통, 규칙은 리프 validate)
        var msg = !saved && window.OmrValidate ? window.OmrValidate.check(btn.closest('.card').querySelector('[data-omr-code]')) : null;
        if (msg) {
            showToast('OMR 미리보기 불가\n' + msg, 'danger');
            return;
        }
        open(url, data);
    });

    window.addEventListener('message', function (e) {
        if (!frame || e.source !== frame.contentWindow || e.origin !== origin) return;
        var d = e.data;
        if (!d || d.source !== CHANNEL) return;

        if (d.type === 'ready') {
            // 새로고침으로 다시 와도 같은 스냅샷을 다시 보낸다
            clearTimeout(timer);
            showAlert('');
            render();
        } else if (d.type === 'rendered') {
            frame.style.height = Math.max(MIN_HEIGHT, Math.ceil(Number(d.height) || 0)) + 'px';
        }
        // 채점하기는 미리보기 페이지가 직접 채점 API 를 부른다(부모는 관여하지 않는다)
    });

    // 닫으면 비운다. 다음 열기는 그때의 편집 값으로 처음부터
    document.addEventListener('hidden.bs.modal', function (e) {
        if (e.target === modalEl()) reset();
    });
})();
