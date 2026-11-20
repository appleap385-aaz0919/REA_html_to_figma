// OMR·정답 JSON 직렬화 모니터 엔진(공통) — 리프가 등록한 window.omrSerializers[code] 를 [data-omr-code] 컨테이너의 input·change 마다 serialize 해 <pre> 에 출력
(function () {
    'use strict';
    if (window.__omrMonitorBound) return;
    window.__omrMonitorBound = true;

    window.omrSerializers = window.omrSerializers || {};

    // 정답 rule_type 트리 공통 빌더. 리프 serialize 에서 재사용
    window.OmrJson = {
        allowed: function (value, valueType, caseSensitive, spaceSensitive) {
            return { value: value, value_type: valueType, case_sensitive: !!caseSensitive, space_sensitive: !!spaceSensitive };
        },
        value: function (allowedList) {
            return { rule_type: 'VALUE', allowed_answer: allowedList || [] };
        },
        ordered: function (nodes) {
            return { rule_type: 'ORDERED', nodes: nodes || [] };
        },
        unordered: function (nodes) {
            return { rule_type: 'UNORDERED', nodes: nodes || [] };
        },
        manual: function () {
            return { rule_type: 'MANUAL' };
        },
        pretty: function (obj) {
            return JSON.stringify(obj, null, 2);
        }
    };

    // OMR 유효성 검사 — 리프 validate({omr, answer}) 결과(사유 문자열, 통과면 null). 규칙 없는 유형은 통과, 알림은 부른 쪽
    window.OmrValidate = {
        has: function (editor) {
            var ser = editor && window.omrSerializers[editor.getAttribute('data-omr-code')];
            return !!(ser && typeof ser.validate === 'function');
        },
        // 편집 중인 폼 — 직렬화한 JSON 으로 검사
        check: function (editor) {
            if (!window.OmrValidate.has(editor)) return null;
            try {
                var ser = window.omrSerializers[editor.getAttribute('data-omr-code')];
                return ser.validate(ser.serialize(editor));
            } catch (err) {
                console.error('OMR 유효성 검사 실패', err);
                return 'OMR 을 읽지 못했습니다.';
            }
        },
        // 저장된 JSON(폼 없는 화면) — 비었으면 반려, 모양이 유형과 달라 읽다 깨지면 형식 오류
        checkData: function (code, data) {
            var ser = window.omrSerializers[code];
            if (!ser || typeof ser.validate !== 'function') return null;
            if (!data || data.omr == null || data.answer == null) return 'OMR 이 입력되지 않았습니다.';
            try {
                return ser.validate(data);
            } catch (err) {
                console.error('OMR 유효성 검사 실패', err);
                return 'OMR 형식이 문항 형태와 맞지 않습니다.';
            }
        },
        // 값 목록 공통 규칙 — 빈값 금지 · 값 중복 금지. 값 형태(text·math·image)와 무관하게 입력 그대로 비교(trim 없음, 공백도 값)
        list: function (values) {
            var seen = {};
            for (var i = 0; i < values.length; i++) {
                var v = values[i] == null ? '' : String(values[i]);
                if (!v) return '빈 값이 있습니다.';
                if (seen[v]) return '같은 값이 있습니다(' + v + ').';
                seen[v] = true;
            }
            return null;
        },
        // SET 1개 공통 규칙 — (1) 최소 개수(minCount 있을 때) (2) 값 목록 규칙 (3) 정답 1개 이상
        set: function (values, answerCount, minCount) {
            if (minCount && values.length < minCount) return '항목을 ' + minCount + '개 이상 입력해주세요.';
            var msg = window.OmrValidate.list(values);
            if (msg) return msg;
            return answerCount > 0 ? null : '정답을 선택해주세요.';
        },
        // 매칭형 한 항목의 연결 — 같은 2열 항목에 두 번 연결 금지
        links: function (values) {
            var seen = {};
            for (var i = 0; i < values.length; i++) {
                if (seen[values[i]]) return '같은 항목에 두 번 연결했습니다(' + values[i] + ').';
                seen[values[i]] = true;
            }
            return null;
        },
        // 박스형(정답 + 유사정답) 공통 규칙 — 빈값만 금지, 같은 값은 허용(정답·유사정답 중 하나만 맞으면 되는 채점이라 결과 같음)
        box: function (values) {
            if (!values.length || values[0] == null || values[0] === '') return '정답을 입력해주세요.';
            for (var i = 1; i < values.length; i++) {
                if (values[i] == null || values[i] === '') return '유사정답에 빈 값이 있습니다.';
            }
            return null;
        },
        // 정답 칸 하나(필드 + 그 VALUE 노드) — 지금 모드 규칙: 박스형(TEXT) = box, 범례형(SELECT) = 범례 1세트 2개 이상
        field: function (field, node) {
            var values = node.allowed_answer.map(function (a) { return a.value; });
            if (field.type === 'TEXT') return window.OmrValidate.box(values);
            return window.OmrValidate.set(field.options.map(function (o) { return o.value; }), values.length, 2);
        }
    };

    // 편집 컨테이너 기준으로 같은 아코디언·컬럼 스코프 안의 모니터 <pre> 탐색
    function findMonitor(editor) {
        var node = editor;
        while (node && node !== document) {
            var omrPre = node.querySelector ? node.querySelector('.omr-json-omr') : null;
            if (omrPre) {
                return { omr: omrPre, answer: node.querySelector('.omr-json-answer') };
            }
            node = node.parentNode;
        }
        return null;
    }

    function refresh(editor) {
        // 잠근 사본(비교 보기)은 옆 입력 폼의 모니터를 덮지 않게 건너뜀
        if (editor.closest('fieldset[disabled]')) return;
        var mon = findMonitor(editor);
        if (!mon) return;
        var code = editor.getAttribute('data-omr-code');
        var ser = window.omrSerializers[code];
        if (!ser || typeof ser.serialize !== 'function') {
            mon.omr.textContent = '(직렬화 미구현)';
            if (mon.answer) mon.answer.textContent = '(직렬화 미구현)';
            return;
        }
        try {
            var out = ser.serialize(editor) || {};
            mon.omr.textContent = window.OmrJson.pretty(out.omr);
            if (mon.answer) mon.answer.textContent = window.OmrJson.pretty(out.answer);
        } catch (err) {
            mon.omr.textContent = '(직렬화 오류) ' + err.message;
            if (mon.answer) mon.answer.textContent = '(직렬화 오류) ' + err.message;
        }
    }

    function onEvent(e) {
        if (!e.target || !e.target.closest) return;
        var editor = e.target.closest('[data-omr-code]');
        if (editor) refresh(editor);
    }

    document.addEventListener('input', onEvent);
    document.addEventListener('change', onEvent);

    // JSON 복사 버튼 — <pre> 텍스트를 클립보드로(화면 복원 테스트용)
    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (err) { /* noop */ }
        document.body.removeChild(ta);
    }
    function copyFeedback(btn) {
        var i = btn.querySelector('i');
        if (!i) return;
        var prev = i.className;
        i.className = 'ti ti-check text-green';
        setTimeout(function () { i.className = prev; }, 1200);
    }
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.omr-json-copy');
        if (!btn) return;
        var card = btn.closest('.card');
        var which = btn.getAttribute('data-omr-copy');
        var pre = card && card.querySelector(which === 'answer' ? '.omr-json-answer' : '.omr-json-omr');
        if (!pre) return;
        var text = pre.textContent || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { copyFeedback(btn); }, function () { fallbackCopy(text); copyFeedback(btn); });
        } else {
            fallbackCopy(text); copyFeedback(btn);
        }
    });

    // 모니터 기준으로 같은 아코디언·컬럼 스코프 안의 편집 컨테이너 탐색(findMonitor 역방향)
    function findEditor(el) {
        var node = el;
        while (node && node !== document) {
            var editor = node.querySelector ? node.querySelector('[data-omr-code]') : null;
            if (editor) return editor;
            node = node.parentNode;
        }
        return null;
    }

    // 모니터 [유효성 검사] — lab 테스트용, 결과는 토스트
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.omr-validate');
        if (!btn) return;
        var editor = findEditor(btn);
        if (!window.OmrValidate.has(editor)) {
            showToast('이 유형은 아직 검사 규칙이 없습니다.', 'danger');
            return;
        }
        var msg = window.OmrValidate.check(editor);
        showToast(msg || '유효성 검사를 통과했습니다.', msg ? 'danger' : 'success');
    });

    // 모니터 [초기화] — 로드 때 떠 둔 리프 카드로 갈아 끼움(lab 재테스트용). 떠 두는 건 모니터가 붙은 리프뿐이라 문항 수정 화면은 해당 없음
    var pristine = {};
    function snapshotAll() {
        document.querySelectorAll('[data-omr-code]').forEach(function (editor) {
            var card = editor.closest('.card');
            if (card && findMonitor(editor)) pristine[editor.getAttribute('data-omr-code')] = card.outerHTML;
        });
    }
    // 값 셀·값 드롭다운 재초기화는 문항 수정 renderOmr 와 같은 처리(떠 둔 data-vt-ready 제거 후 init, vt:change 로 드롭다운 옵션 배선)
    function resetEditor(editor) {
        var html = editor && pristine[editor.getAttribute('data-omr-code')];
        if (!html) return;
        var wrap = document.createElement('div');
        wrap.innerHTML = html;
        var card = wrap.firstElementChild;
        editor.closest('.card').replaceWith(card);
        if (window.ValueTypeInput) {
            card.querySelectorAll('.vt-cell').forEach(function (c) { c.removeAttribute('data-vt-ready'); });
            window.ValueTypeInput.init(card);
        }
        if (window.ValueTypeDropdown) {
            window.ValueTypeDropdown.init(card);
            card.querySelectorAll('.vt-cell').forEach(function (c) { c.dispatchEvent(new CustomEvent('vt:change', { bubbles: true })); });
        }
        refresh(card.querySelector('[data-omr-code]'));
    }
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.omr-reset');
        if (btn) resetEditor(findEditor(btn));
    });

    // 최초 1회: 화면에 이미 있는 모든 편집 컨테이너 렌더 + 초기화용 처음 모습 떠 두기
    function refreshAll() {
        document.querySelectorAll('[data-omr-code]').forEach(refresh);
        snapshotAll();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshAll);
    } else {
        refreshAll();
    }

    // 행 추가/삭제 등 DOM 변경 후 외부에서 수동 갱신할 수 있게 노출.
    window.omrMonitorRefresh = function (el) {
        (el ? [el] : Array.prototype.slice.call(document.querySelectorAll('[data-omr-code]'))).forEach(refresh);
    };
})();
