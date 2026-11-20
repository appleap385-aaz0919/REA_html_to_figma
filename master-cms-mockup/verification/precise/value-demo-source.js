
    (function () {
        // 아코디언 열기/닫기 (전체 or 대분류). bootstrap 은 common.js 에서 window 별칭, 클릭 시점엔 로드됨
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-omr-toggle]');
            if (!btn) return;
            var open = btn.dataset.omrToggle === 'open';
            var scope = btn.dataset.omrTarget === 'all' ? document : document.querySelector(btn.dataset.omrTarget);
            if (!scope) return;
            scope.querySelectorAll('.accordion-collapse').forEach(function (el) {
                bootstrap.Collapse.getOrCreateInstance(el, { toggle: false })[open ? 'show' : 'hide']();
            });
        });
        // 유형 코드 복사 — 아이콘이 아코디언 버튼 안이고 Bootstrap 위임도 document 캡처라 그보다 앞선 window 캡처에서 받아 펼침을 막음
        function copyText(text) {
            if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (err) { /* noop */ }
            document.body.removeChild(ta);
            return Promise.resolve();
        }
        window.addEventListener('click', function (e) {
            var btn = e.target.closest && e.target.closest('.omr-code-copy');
            if (!btn) return;
            e.preventDefault();
            e.stopPropagation();
            var i = btn.querySelector('i');
            copyText(btn.closest('.badge').textContent.trim()).then(function () {
                i.className = 'ti ti-check text-green';
                setTimeout(function () { i.className = 'ti ti-copy'; }, 1200);
            });
        }, true);

        var narrowCol = document.getElementById('omrNarrowCol');
        var locked = false;

        // 비활성화 보기 — 왼쪽 입력 폼의 JSON 으로 오른쪽에 같은 리프를 따로 그려 잠금(서비스 상세 OMR 비교와 같은 경로)
        var lockSource = document.getElementById('omrLockSource');

        // 오른쪽 라디오 그룹을 왼쪽과 가르는 접두 — template 안까지(문항 수정 prefixNames 와 같은 이유)
        function prefixNames(scope) {
            scope.querySelectorAll('[name]').forEach(function (el) { el.name = 'lock-' + el.name; });
            scope.querySelectorAll('template').forEach(function (t) { prefixNames(t.content); });
        }

        // 한 유형의 오른쪽 다시 그리기. 채우기가 거부되면(입력 도중 값이 덜 참) 직전 모습 유지
        function renderLock(liveRoot) {
            var code = liveRoot.getAttribute('data-omr-code');
            var ser = (window.omrSerializers || {})[code];
            var col = liveRoot.closest('.accordion-body').querySelector('.omr-lock');
            var src = lockSource && lockSource.content.querySelector('[data-omr-src="' + code + '"]');
            if (!ser || typeof ser.hydrate !== 'function' || !col || !src) return;
            var data;
            try { data = JSON.parse(JSON.stringify(ser.serialize(liveRoot))); } catch (err) { return; }

            var wrap = document.createElement('div');
            wrap.className = 'd-none';
            wrap.innerHTML = src.innerHTML;
            prefixNames(wrap);
            // 본문을 잠금
            var body = wrap.querySelector('[data-omr-code]');
            var fieldset = document.createElement('fieldset');
            fieldset.disabled = true;
            body.parentNode.insertBefore(fieldset, body);
            fieldset.appendChild(body);
            col.appendChild(wrap);

            // 값 셀 · 값 드롭다운 초기화는 문항 수정 renderOmr 와 같음
            if (window.ValueTypeInput) {
                wrap.querySelectorAll('.vt-cell').forEach(function (c) { c.removeAttribute('data-vt-ready'); });
                window.ValueTypeInput.init(wrap);
            }
            if (window.ValueTypeDropdown) {
                window.ValueTypeDropdown.init(wrap);
                wrap.querySelectorAll('.vt-cell').forEach(function (c) { c.dispatchEvent(new CustomEvent('vt:change', { bubbles: true })); });
            }

            var ok;
            try { ok = ser.hydrate(body, data) !== false; } catch (err) { ok = false; }
            if (!ok) { wrap.remove(); return; }
            // 수식 칸은 fieldset 잠금을 안 따라 직접(MathLive 자체 disabled 속성)
            wrap.querySelectorAll('math-field').forEach(function (mf) { mf.setAttribute('disabled', ''); });
            Array.prototype.slice.call(col.children).forEach(function (c) { if (c !== wrap) c.remove(); });
            wrap.classList.remove('d-none');
        }

        // 왼쪽 입력 · 행 추가 삭제마다 오른쪽 갱신(한 틱에 한 번). 오른쪽에서 난 이벤트는 무시
        function scheduleLock(liveRoot) {
            if (liveRoot.__lockQueued) return;
            liveRoot.__lockQueued = true;
            setTimeout(function () {
                liveRoot.__lockQueued = false;
                if (locked && liveRoot.isConnected) renderLock(liveRoot);
            }, 0);
        }
        ['input', 'change', 'click', 'vt:change', 'vtd:change'].forEach(function (type) {
            document.addEventListener(type, function (e) {
                if (!locked || !e.target.closest) return;
                var root = e.target.closest('.omr-live [data-omr-code]');
                if (root) scheduleLock(root);
            });
        });
        // 모니터 [초기화] 는 왼쪽 카드를 통째로 갈아 끼워서, 끝난 뒤 새 카드로 다시 그림
        document.addEventListener('click', function (e) {
            if (!locked) return;
            var btn = e.target.closest && e.target.closest('.omr-reset');
            if (!btn) return;
            var accBody = btn.closest('.accordion-body');
            setTimeout(function () {
                var root = accBody && accBody.querySelector('.omr-live [data-omr-code]');
                if (root) renderLock(root);
            }, 0);
        });

        // 보기 방식: 좁게 = col-lg-8, 넓게 · 비활성화 = col-12(갤러리 + 하단 테스트 카드 함께). 좁게 · 넓게로 가면 비활성화는 꺼짐
        function setViewMode(mode) {
            var full = mode !== 'narrow';
            narrowCol.classList.toggle('col-lg-8', !full);
            narrowCol.classList.toggle('col-12', full);
            var wasLocked = locked;
            locked = mode === 'lock';
            document.querySelectorAll('.omr-lock').forEach(function (col) {
                col.classList.toggle('d-none', !locked);
                if (!locked) col.innerHTML = '';
            });
            if (locked && !wasLocked) document.querySelectorAll('.omr-live [data-omr-code]').forEach(renderLock);
        }
        document.querySelectorAll('input[name="omrViewMode"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                if (radio.checked && narrowCol) setViewMode(radio.value);
            });
        });

        // 수식 테스트 칸 값 출력(LaTeX + 렌더). Σ 적용도 input 이벤트로 들어옴
        var mf = document.getElementById('mfAnswer');
        var out = document.getElementById('mfAnswerLatex');
        var rendered = document.getElementById('mfAnswerRender');
        if (mf && out) mf.addEventListener('input', function () {
            out.textContent = mf.value;
            rendered.innerHTML = mf.value && window.MathLive ? window.MathLive.convertLatexToMarkup(mf.value) : '';
        });

        // value_type 컴포넌트 getValue 실시간 출력(하단 dropdown 카드 제외한 셀만). pretty JSON.
        var dumpOut = document.getElementById('vtDumpOut');
        function vtRefresh() {
            if (!dumpOut || !window.ValueTypeInput) return;
            var card = document.getElementById('vtInputCard');
            if (!card) return;
            var vals = [];
            card.querySelectorAll('.vt-cell').forEach(function (c) { // 자기 카드 컴포넌트 셀만(갤러리·dropdown 카드 제외)
                vals.push(window.ValueTypeInput.getValue(c));
            });
            dumpOut.textContent = JSON.stringify(vals, null, 2);
        }
        document.addEventListener('vt:change', vtRefresh); // 전환 + 입력(값 셀 자체 이벤트)
        window.addEventListener('load', vtRefresh);

        // value-type-dropdown 테스트: 옵션 소스(vt 행)를 dropdown 이 미러링
        (function () {
            var srcList = document.getElementById('vtdSrcList');
            var card = document.getElementById('vtdCard');
            if (!srcList || !card) return;
            var rowTpl = document.getElementById('vtdRowTpl');
            var addBtn = document.getElementById('vtdRowAdd');
            var ddDumpOut = document.getElementById('vtdDumpOut');
            var uid = 2; // 시드 optid 0,1 → 다음 2

            function ddCells() { return card.querySelectorAll('.vtd-cell'); }
            // 각 dropdown 선택값(참조) + 소스 행에서 해석한 실제 값. 실시간 pretty JSON.
            function ddRefresh() {
                if (!ddDumpOut || !window.ValueTypeDropdown) return;
                var out = [];
                ddCells().forEach(function (c, i) {
                    var id = window.ValueTypeDropdown.getValue(c);
                    var row = id ? srcList.querySelector('.vtd-src-row[data-optid="' + id + '"]') : null;
                    out.push({ dd: i, value: id, resolved: row ? window.ValueTypeInput.getValue(row.querySelector('.vt-cell')) : null });
                });
                ddDumpOut.textContent = JSON.stringify(out, null, 2);
            }
            function relabel() {
                srcList.querySelectorAll('.vtd-src-row').forEach(function (r, i) {
                    var l = r.querySelector('.vtd-src-label'); if (l) l.textContent = (i + 1);
                });
            }
            function syncDelDisable() {
                var rows = srcList.querySelectorAll('.vtd-src-row');
                rows.forEach(function (r) { r.querySelector('.vtd-src-del').disabled = rows.length <= 1; });
            }
            // 소스 행 → 옵션 목록 [{value:optid, label, value_type}] → 모든 dropdown 갱신
            function rebuild() {
                if (!window.ValueTypeInput || !window.ValueTypeDropdown) return;
                var opts = [];
                srcList.querySelectorAll('.vtd-src-row').forEach(function (r) {
                    var cell = r.querySelector('.vt-cell');
                    if (!cell) return;
                    var v = window.ValueTypeInput.getValue(cell); // {value, value_type}
                    opts.push({ value: r.dataset.optid, label: v.value, value_type: v.value_type });
                });
                ddCells().forEach(function (c) { window.ValueTypeDropdown.setOptions(c, opts); });
                ddRefresh();
            }

            // 소스 값/형태 변경 → 옵션 갱신, 선택 변경 → 덤프 갱신
            srcList.addEventListener('vt:change', rebuild);
            srcList.addEventListener('input', rebuild);
            card.addEventListener('vtd:change', ddRefresh);

            addBtn.addEventListener('click', function () {
                var row = rowTpl.content.firstElementChild.cloneNode(true);
                row.dataset.optid = String(uid++);
                srcList.appendChild(row);
                relabel(); syncDelDisable(); rebuild();
            });
            srcList.addEventListener('click', function (e) {
                var del = e.target.closest('.vtd-src-del');
                if (!del) return;
                if (srcList.querySelectorAll('.vtd-src-row').length <= 1) return;
                del.closest('.vtd-src-row').remove();
                relabel(); syncDelDisable(); rebuild();
            });

            syncDelDisable();
            // 초기 옵션 반영은 컴포넌트 boot(DOMContentLoaded) 이후 = load 시점
            window.addEventListener('load', rebuild);
        })();
    })();
    