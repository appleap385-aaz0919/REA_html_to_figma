/* 14 source OMR controllers, unchanged. Provenance: vendor/provenance.json. */

    (function () {
        if (window.__omrObsacnBound) return;
        window.__omrObsacnBound = true;

        var MIN = 2, MAX = 7;

        // 직렬화기 등록(자족) — OMR = 선택지 1필드(옵션 = 값 셀 {value, value_type}), 정답 = 체크된 라벨 1개(VALUE, value 만), value_type 은 값 셀이 주는 대로(하드코딩 아님)
        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.OBSACN = {
            serialize: function (root) {
                var options = [], picked = null;
                root.querySelectorAll('.omr-obsacn-row').forEach(function (row) {
                    var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                    if (row.querySelector('input[type="radio"]').checked) picked = v; // {value, value_type}
                });
                var allowed = picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)];
                return { omr: [{ options: options }], answer: window.OmrJson.value(allowed) };
            },
            // 유효성 검사 — 선택지 1세트
            validate: function (out) {
                return window.OmrValidate.set(out.omr[0].options.map(function (o) { return o.value; }), out.answer.allowed_answer.length);
            },
            // serialize 역방향. 모양(구조)만 검사 → 통과해야만 일괄 채움(all-or-nothing). 불일치=false → 빈 폼 유지.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                // OMR = [{options:[...]}], 정답 = VALUE. 개수는 MIN~MAX 안이어야 폼과 맞음.
                if (!Array.isArray(omr) || !omr[0] || !Array.isArray(omr[0].options)) return false;
                if (!answer || answer.rule_type !== 'VALUE' || !Array.isArray(answer.allowed_answer)) return false;
                var options = omr[0].options;
                if (options.length < MIN || options.length > MAX) return false;

                var box = root.querySelector('.omr-obsacn-rows');
                var tpl = root.querySelector('.omr-obsacn-row-tpl');

                // 행 개수를 JSON 에 맞춤(넘치면 뒤에서 제거, 모자라면 template 클론)
                var cur = box.querySelectorAll('.omr-obsacn-row');
                for (var i = cur.length - 1; i >= options.length; i--) cur[i].remove();
                while (box.querySelectorAll('.omr-obsacn-row').length < options.length) {
                    box.appendChild(tpl.content.firstElementChild.cloneNode(true));
                }

                // 값 셀 init 선점 — MutationObserver 의 비동기 init 이 아래 setValue 를 덮어쓰지 않게(가드 vtReady 확정)
                window.ValueTypeInput.init(root);

                // 값·정답 채움. 정답 = allowed_answer[0].value 와 같은 첫 선택지에 radio
                var picked = answer.allowed_answer.length ? answer.allowed_answer[0].value : null;
                var pickedDone = false;
                box.querySelectorAll('.omr-obsacn-row').forEach(function (row, idx) {
                    var opt = options[idx] || {};
                    window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: opt.value, value_type: opt.value_type });
                    var radio = row.querySelector('input[type="radio"]');
                    var hit = picked != null && !pickedDone && opt.value === picked;
                    radio.checked = hit;
                    if (hit) pickedDone = true;
                });

                sync(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        function rows(box) { return box.querySelectorAll('.omr-obsacn-row'); }

        function sync(box) {
            var n = rows(box).length;
            box.querySelectorAll('.omr-obsacn-del').forEach(function (b) { b.disabled = n <= MIN; });
            var add = box.querySelector('.omr-obsacn-add');
            if (add) add.disabled = n >= MAX;
        }

        document.addEventListener('click', function (e) {
            var add = e.target.closest('.omr-obsacn-add');
            if (add) {
                var box = add.closest('.omr-obsacn');
                if (rows(box).length >= MAX) return;
                var clone = box.querySelector('.omr-obsacn-row-tpl').content.firstElementChild.cloneNode(true);
                clone.querySelector('input[type="radio"]').checked = false;
                box.querySelector('.omr-obsacn-rows').appendChild(clone);
                sync(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            var del = e.target.closest('.omr-obsacn-del');
            if (del) {
                var box2 = del.closest('.omr-obsacn');
                if (rows(box2).length <= MIN) return;
                del.closest('.omr-obsacn-row').remove();
                sync(box2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box2);
            }
        });

        document.querySelectorAll('.omr-obsacn').forEach(sync);
    })();
    

    (function () {
        if (window.__omrObsaoxBound) return;
        window.__omrObsaoxBound = true;

        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.OBSAOX = {
            serialize: function (root) {
                var t = root.querySelector('.omr-obsaox-title');
                var title = t ? t.value.trim() : '';
                var options = [], picked = null;
                root.querySelectorAll('.omr-obsaox-row').forEach(function (row) {
                    var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                    if (row.querySelector('input[type="radio"]').checked) picked = v; // {value, value_type}
                });
                var field = { type: 'BUTTON' };
                if (title) field.title = title;
                field.options = options;
                var allowed = picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)];
                return { omr: [field], answer: window.OmrJson.value(allowed) };
            },
            // 유효성 검사 — O/X 1세트(기호는 안 봄)
            validate: function (out) {
                return window.OmrValidate.set(out.omr[0].options.map(function (o) { return o.value; }), out.answer.allowed_answer.length);
            },
            // serialize 역방향. O/X 2행 고정 → options 개수 안 맞으면 스킵. 정답 = 체크된 1개(VALUE).
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0] || omr[0].type !== 'BUTTON' || !Array.isArray(omr[0].options)) return false;
                if (!answer || answer.rule_type !== 'VALUE' || !Array.isArray(answer.allowed_answer)) return false;
                var field = omr[0];
                var rowEls = root.querySelectorAll('.omr-obsaox-row'); // 2행 고정
                if (field.options.length !== rowEls.length) return false;

                var t = root.querySelector('.omr-obsaox-title');
                if (t) t.value = field.title || ''; // title 은 표시용(value_type 없음)

                window.ValueTypeInput.init(root); // 값 셀 init 선점

                var picked = answer.allowed_answer.length ? answer.allowed_answer[0].value : null;
                var pickedDone = false;
                rowEls.forEach(function (row, idx) {
                    var opt = field.options[idx] || {};
                    window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: opt.value, value_type: opt.value_type });
                    var radio = row.querySelector('input[type="radio"]');
                    var hit = picked != null && !pickedDone && opt.value === picked;
                    radio.checked = hit;
                    if (hit) pickedDone = true;
                });

                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };
    })();
    

    (function () {
        if (window.__omrObmacnBound) return;
        window.__omrObmacnBound = true;

        var MIN = 2, MAX = 7;

        // 직렬화기 등록(자족) — OMR = 선택지 1필드(옵션 = 값 셀), 정답 = 체크된 보기들 UNORDERED[VALUE...](다답이라 1개여도 UNORDERED)
        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.OBMACN = {
            serialize: function (root) {
                var options = [], nodes = [];
                root.querySelectorAll('.omr-obmacn-row').forEach(function (row) {
                    var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                    if (row.querySelector('input[type="checkbox"]').checked) {
                        nodes.push(window.OmrJson.value([window.OmrJson.allowed(v.value, v.value_type, false, false)]));
                    }
                });
                return { omr: [{ options: options }], answer: window.OmrJson.unordered(nodes) };
            },
            // 유효성 검사 — 선택지 1세트
            validate: function (out) {
                return window.OmrValidate.set(out.omr[0].options.map(function (o) { return o.value; }), out.answer.nodes.length);
            },
            // serialize 역방향. 모양만 검사 → all-or-nothing. 정답 = UNORDERED nodes 의 값 집합에 든 선택지 체크.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0] || !Array.isArray(omr[0].options)) return false;
                if (!answer || answer.rule_type !== 'UNORDERED' || !Array.isArray(answer.nodes)) return false;
                var options = omr[0].options;
                if (options.length < MIN || options.length > MAX) return false;

                var box = root.querySelector('.omr-obmacn-rows');
                var tpl = root.querySelector('.omr-obmacn-row-tpl');
                var cur = box.querySelectorAll('.omr-obmacn-row');
                for (var i = cur.length - 1; i >= options.length; i--) cur[i].remove();
                while (box.querySelectorAll('.omr-obmacn-row').length < options.length) {
                    box.appendChild(tpl.content.firstElementChild.cloneNode(true));
                }

                window.ValueTypeInput.init(root); // 값 셀 init 선점(MutationObserver 덮어쓰기 방지)

                // 정답 = 각 VALUE 노드의 allowed_answer[0].value 집합
                var picked = {};
                answer.nodes.forEach(function (n) {
                    if (n && n.rule_type === 'VALUE' && Array.isArray(n.allowed_answer) && n.allowed_answer.length) {
                        picked[n.allowed_answer[0].value] = true;
                    }
                });
                box.querySelectorAll('.omr-obmacn-row').forEach(function (row, idx) {
                    var opt = options[idx] || {};
                    window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: opt.value, value_type: opt.value_type });
                    row.querySelector('input[type="checkbox"]').checked = !!picked[opt.value];
                });

                sync(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        function rows(box) { return box.querySelectorAll('.omr-obmacn-row'); }

        function sync(box) {
            var n = rows(box).length;
            box.querySelectorAll('.omr-obmacn-del').forEach(function (b) { b.disabled = n <= MIN; });
            var add = box.querySelector('.omr-obmacn-add');
            if (add) add.disabled = n >= MAX;
        }

        document.addEventListener('click', function (e) {
            var add = e.target.closest('.omr-obmacn-add');
            if (add) {
                var box = add.closest('.omr-obmacn');
                if (rows(box).length >= MAX) return;
                var clone = box.querySelector('.omr-obmacn-row-tpl').content.firstElementChild.cloneNode(true);
                clone.querySelector('input[type="checkbox"]').checked = false;
                box.querySelector('.omr-obmacn-rows').appendChild(clone);
                sync(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            var del = e.target.closest('.omr-obmacn-del');
            if (del) {
                var box2 = del.closest('.omr-obmacn');
                if (rows(box2).length <= MIN) return;
                del.closest('.omr-obmacn-row').remove();
                sync(box2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box2);
            }
        });

        document.querySelectorAll('.omr-obmacn').forEach(sync);
    })();
    

    (function () {
        if (window.__omrObmaoxBound) return;
        window.__omrObmaoxBound = true;

        var MIN = 2, uid = 0;

        // 직렬화기 등록(자족) — OMR = SET별 BUTTON 필드 배열, 정답 = SET별 VALUE(체크된 O/X)를 SET 순서대로 ORDERED(nodes ↔ fields 위치 대응)
        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.OBMAOX = {
            serialize: function (root) {
                var fields = [], nodes = [];
                root.querySelectorAll('.omr-obmaox-row').forEach(function (row) {
                    var t = row.querySelector('.omr-obmaox-title');
                    var title = t ? t.value.trim() : '';
                    var options = [], picked = null;
                    row.querySelectorAll('.omr-obmaox-ox').forEach(function (ox) {
                        var v = window.ValueTypeInput.getValue(ox.querySelector('.vt-cell')); // {value, value_type}
                        options.push({ value: v.value, value_type: v.value_type });
                        if (ox.querySelector('input[type="radio"]').checked) picked = v; // {value, value_type}
                    });
                    var comma = row.querySelector('.omr-obmaox-comma');
                    var field = { type: 'BUTTON' };
                    if (title) field.title = title;
                    if (comma && comma.checked) field.delimiter = ',';
                    field.options = options;
                    fields.push(field);
                    var allowed = picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)];
                    nodes.push(window.OmrJson.value(allowed));
                });
                return { omr: fields, answer: window.OmrJson.ordered(nodes) };
            },
            // 유효성 검사 — SET 마다 O/X 1세트(기호는 안 봄, SET 사이 같은 값은 허용)
            validate: function (out) {
                for (var i = 0; i < out.omr.length; i++) {
                    var msg = window.OmrValidate.set(out.omr[i].options.map(function (o) { return o.value; }), out.answer.nodes[i].allowed_answer.length);
                    if (msg) return (i + 1) + '번 SET · ' + msg;
                }
                return null;
            },
            // serialize 역방향. SET 배열 ↔ ORDERED nodes 위치 대응. 각 SET = O/X 2옵션 고정.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || omr.length < MIN) return false;
                for (var k = 0; k < omr.length; k++) {
                    if (!omr[k] || omr[k].type !== 'BUTTON' || !Array.isArray(omr[k].options) || omr[k].options.length !== 2) return false;
                }
                if (!answer || answer.rule_type !== 'ORDERED' || !Array.isArray(answer.nodes) || answer.nodes.length !== omr.length) return false;

                var box = root.querySelector('.omr-obmaox-rows');
                var tpl = root.querySelector('.omr-obmaox-row-tpl');
                var cur = box.querySelectorAll('.omr-obmaox-row');
                for (var i = cur.length - 1; i >= omr.length; i--) cur[i].remove();
                while (box.querySelectorAll('.omr-obmaox-row').length < omr.length) {
                    var clone = tpl.content.firstElementChild.cloneNode(true);
                    regroup(clone); // 새 SET 라디오 그룹 독립
                    box.appendChild(clone);
                }

                window.ValueTypeInput.init(root); // 값 셀 init 선점

                box.querySelectorAll('.omr-obmaox-row').forEach(function (row, idx) {
                    var field = omr[idx] || {}, node = answer.nodes[idx] || {};
                    var opts = field.options || [];
                    var t = row.querySelector('.omr-obmaox-title');
                    if (t) t.value = field.title || ''; // title 은 표시용(value_type 없음)
                    var comma = row.querySelector('.omr-obmaox-comma');
                    if (comma) comma.checked = field.delimiter === ',';
                    var picked = (node.rule_type === 'VALUE' && Array.isArray(node.allowed_answer) && node.allowed_answer.length) ? node.allowed_answer[0].value : null;
                    var pickedDone = false;
                    row.querySelectorAll('.omr-obmaox-ox').forEach(function (ox, oi) {
                        var opt = opts[oi] || {};
                        window.ValueTypeInput.setValue(ox.querySelector('.vt-cell'), { value: opt.value, value_type: opt.value_type });
                        var radio = ox.querySelector('input[type="radio"]');
                        var hit = picked != null && !pickedDone && opt.value === picked;
                        radio.checked = hit;
                        if (hit) pickedDone = true;
                    });
                });

                sync(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        function rows(box) { return box.querySelectorAll('.omr-obmaox-row'); }

        function sync(box) {
            var n = rows(box).length;
            box.querySelectorAll('.omr-obmaox-del').forEach(function (b) { b.disabled = n <= MIN; });
        }

        // 복제 SET 의 라디오 쌍에 새 그룹명 부여. 기존 name 의 마지막 _토큰만 갈아 컨테이너 프리픽스(live- 포함) 보존
        function regroup(row) {
            var rds = row.querySelectorAll('input[type="radio"]');
            if (!rds.length) return;
            var base = rds[0].name.replace(/_[^_]*$/, '');
            var name = base + '_a' + (++uid);
            rds.forEach(function (r) { r.name = name; r.checked = false; });
        }

        document.addEventListener('click', function (e) {
            var add = e.target.closest('.omr-obmaox-add');
            if (add) {
                var box = add.closest('.omr-obmaox');
                var clone = box.querySelector('.omr-obmaox-row-tpl').content.firstElementChild.cloneNode(true);
                regroup(clone); // 라디오 그룹 새로(O/X 값·기호는 템플릿 기본 유지)
                box.querySelector('.omr-obmaox-rows').appendChild(clone);
                sync(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            var del = e.target.closest('.omr-obmaox-del');
            if (del) {
                var box2 = del.closest('.omr-obmaox');
                if (rows(box2).length <= MIN) return;
                del.closest('.omr-obmaox-row').remove();
                sync(box2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box2);
            }
        });

        document.querySelectorAll('.omr-obmaox').forEach(sync);
    })();
    

    (function () {
        if (window.__omrSbsanmBound) return;
        window.__omrSbsanmBound = true;

        function applyMode(box) {
            var legend = box.querySelector('.omr-sbsanm-mode').value === 'legend';
            box.querySelector('.omr-sbsanm-box').classList.toggle('d-none', legend);
            box.querySelector('.omr-sbsanm-legend').classList.toggle('d-none', !legend);
        }
        function syncLegend(box) {
            var n = box.querySelectorAll('.omr-sbsanm-legend-row').length;
            box.querySelectorAll('.omr-sbsanm-legend-del').forEach(function (b) { b.disabled = n <= 1; });
        }

        // 직렬화기 등록(자족) — 박스형 OMR=TEXT·정답 ORDERED[VALUE(정답+유사)], 범례형 OMR=SELECT·정답 VALUE(선택 범례), value_type 은 OMR 쪽에만
        window.omrSerializers = window.omrSerializers || {};
        function readAllowed(row) {
            var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type} — value 만 사용
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            var caseSensitive = checks[0] ? checks[0].checked : false;
            var spaceSensitive = checks[1] ? checks[1].checked : false;
            return window.OmrJson.allowed(v.value, v.value_type, caseSensitive, spaceSensitive); // value_type 도 함께(복구용), 둘 다 체크=true 직결
        }
        function setAffix(cell, affix) { // 앞/뒤 수식어 복원: {value, value_type} 있으면 주입
            if (cell && affix && typeof affix === 'object') {
                window.ValueTypeInput.setValue(cell, { value: affix.value, value_type: affix.value_type });
            }
        }
        function fillAllowedRow(row, allowed) { // 정답/유사정답 행: 값 셀 + 대소/공백 체크 복원
            if (!row || !allowed) return;
            window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: allowed.value, value_type: allowed.value_type });
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            if (checks[0]) checks[0].checked = !!allowed.case_sensitive;
            if (checks[1]) checks[1].checked = !!allowed.space_sensitive;
        }
        window.omrSerializers.SBSANM = {
            serialize: function (root) {
                var pre = window.ValueTypeInput.getValue(root.querySelector('.omr-sbsanm-pre .vt-cell'));   // {value, value_type}
                var post = window.ValueTypeInput.getValue(root.querySelector('.omr-sbsanm-post .vt-cell'));
                var legend = root.querySelector('.omr-sbsanm-mode').value === 'legend';

                function applyAffix(field) { // 값 있을 때만 {value, value_type} 방출
                    if (pre.value) field.pre_text = { value: pre.value, value_type: pre.value_type };
                    if (post.value) field.post_text = { value: post.value, value_type: post.value_type };
                }

                if (!legend) {
                    var field = { type: 'TEXT' };
                    applyAffix(field);
                    var allowed = [readAllowed(root.querySelector('.omr-sbsanm-answer-row'))];
                    root.querySelectorAll('.omr-sbsanm-sim-row').forEach(function (row) { allowed.push(readAllowed(row)); });
                    return { omr: [field], answer: window.OmrJson.ordered([window.OmrJson.value(allowed)]) };
                }

                var options = [], picked = null;
                root.querySelectorAll('.omr-sbsanm-legend-row').forEach(function (row) {
                    var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                    if (row.querySelector('input[type="radio"]').checked) picked = v; // {value, value_type}
                });
                var field2 = { type: 'SELECT' };
                applyAffix(field2);
                field2.options = options;
                var allowed2 = picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)];
                return { omr: [field2], answer: window.OmrJson.value(allowed2) };
            },
            // 유효성 검사 — 지금 모드만(저장도 그 모드만). 박스형 = 정답·유사정답 빈값 금지(같은 값 허용), 범례형 = 범례 1세트(2개 이상). 앞/뒤 수식어·대소/공백 체크는 안 봄
            validate: function (out) {
                return window.OmrValidate.field(out.omr[0], out.omr[0].type === 'TEXT' ? out.answer.nodes[0] : out.answer);
            },
            // serialize 역방향. TEXT=박스형(ORDERED[VALUE(정답+유사)]) / SELECT=범례형(VALUE). field.type 으로 모드 판정.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0]) return false;
                var field = omr[0];
                if (field.type !== 'TEXT' && field.type !== 'SELECT') return false;
                var legend = field.type === 'SELECT';

                var valueNode = null;
                if (!legend) {
                    if (!answer || answer.rule_type !== 'ORDERED' || !Array.isArray(answer.nodes) || !answer.nodes[0]) return false;
                    valueNode = answer.nodes[0];
                    if (valueNode.rule_type !== 'VALUE' || !Array.isArray(valueNode.allowed_answer) || !valueNode.allowed_answer.length) return false;
                } else {
                    if (!answer || answer.rule_type !== 'VALUE' || !Array.isArray(answer.allowed_answer)) return false;
                    if (!Array.isArray(field.options) || !field.options.length) return false;
                }

                root.querySelector('.omr-sbsanm-mode').value = legend ? 'legend' : 'box';
                applyMode(root);

                window.ValueTypeInput.init(root); // pre/post·정답행·원본 범례 셀 선점

                setAffix(root.querySelector('.omr-sbsanm-pre .vt-cell'), field.pre_text);
                setAffix(root.querySelector('.omr-sbsanm-post .vt-cell'), field.post_text);

                if (!legend) {
                    var allowed = valueNode.allowed_answer;
                    fillAllowedRow(root.querySelector('.omr-sbsanm-answer-row'), allowed[0]); // 정답
                    var simBox = root.querySelector('.omr-sbsanm-sim-rows');
                    var simTpl = root.querySelector('.omr-sbsanm-sim-tpl');
                    for (var i = 1; i < allowed.length; i++) { // 유사정답
                        var simRow = simTpl.content.firstElementChild.cloneNode(true);
                        simBox.appendChild(simRow);
                        window.ValueTypeInput.init(simRow);
                        fillAllowedRow(simRow, allowed[i]);
                    }
                } else {
                    var options = field.options;
                    var legBox = root.querySelector('.omr-sbsanm-legend-rows');
                    var legTpl = root.querySelector('.omr-sbsanm-legend-tpl');
                    var cur = legBox.querySelectorAll('.omr-sbsanm-legend-row');
                    for (var j = cur.length - 1; j >= options.length; j--) cur[j].remove();
                    while (legBox.querySelectorAll('.omr-sbsanm-legend-row').length < options.length) {
                        legBox.appendChild(legTpl.content.firstElementChild.cloneNode(true)); // 라디오 name(SBSANM_legend) 공유
                    }
                    window.ValueTypeInput.init(root); // 새 범례 셀 선점
                    var picked = answer.allowed_answer.length ? answer.allowed_answer[0].value : null;
                    var pickedDone = false;
                    legBox.querySelectorAll('.omr-sbsanm-legend-row').forEach(function (row, idx) {
                        var o = options[idx] || {};
                        window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                        var radio = row.querySelector('input[type="radio"]');
                        var hit = picked != null && !pickedDone && o.value === picked;
                        radio.checked = hit;
                        if (hit) pickedDone = true;
                    });
                    syncLegend(root);
                }

                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        document.addEventListener('change', function (e) {
            var sel = e.target.closest('.omr-sbsanm-mode');
            if (sel) applyMode(sel.closest('.omr-sbsanm'));
        });

        document.addEventListener('click', function (e) {
            var t;
            if ((t = e.target.closest('.omr-sbsanm-sim-add'))) {
                var b = t.closest('.omr-sbsanm');
                var tpl = b.querySelector('.omr-sbsanm-sim-tpl');
                var simRow = tpl.content.firstElementChild.cloneNode(true);
                b.querySelector('.omr-sbsanm-sim-rows').appendChild(simRow);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(b);
                return;
            }
            if ((t = e.target.closest('.omr-sbsanm-sim-del'))) {
                var b2 = t.closest('.omr-sbsanm');
                t.closest('.omr-sbsanm-sim-row').remove(); // 0개 허용
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(b2);
                return;
            }
            if ((t = e.target.closest('.omr-sbsanm-legend-add'))) {
                var b3 = t.closest('.omr-sbsanm'); // 라디오 name(SBSANM_legend) 공유 = 한 정답 그룹
                var legRow = b3.querySelector('.omr-sbsanm-legend-tpl').content.firstElementChild.cloneNode(true);
                b3.querySelector('.omr-sbsanm-legend-rows').appendChild(legRow);
                syncLegend(b3);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(b3);
                return;
            }
            if ((t = e.target.closest('.omr-sbsanm-legend-del'))) {
                var b4 = t.closest('.omr-sbsanm');
                if (b4.querySelectorAll('.omr-sbsanm-legend-row').length <= 1) return;
                t.closest('.omr-sbsanm-legend-row').remove();
                syncLegend(b4);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(b4);
                return;
            }
        });

        document.querySelectorAll('.omr-sbsanm').forEach(function (box) {
            applyMode(box); syncLegend(box);
        });
    })();
    

    (function () {
        if (window.__omrSbsadrBound) return;
        window.__omrSbsadrBound = true;

        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.SBSADR = {
            serialize: function (root) {
                var title = root.querySelector('.omr-sbsadr-title').value.trim();
                var field = { type: 'COMMENT' };
                if (title) field.title = title;
                return { omr: [field], answer: window.OmrJson.manual() };
            },
            // 유효성 검사 — 수동 채점이라 정답이 없고 타이틀은 선택 입력이라 검사할 것 없음(규칙을 정한 유형으로 표시하려고 둠)
            validate: function () {
                return null;
            },
            // serialize 역방향. 값 없음(수동채점) → 타이틀만 복원 + MANUAL 검사.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0] || omr[0].type !== 'COMMENT') return false;
                if (!answer || answer.rule_type !== 'MANUAL') return false;
                var t = root.querySelector('.omr-sbsadr-title');
                if (t) t.value = omr[0].title || '';
                return true;
            }
        };
    })();
    

    (function () {
        if (window.__omrSbsaasBound) return;
        window.__omrSbsaasBound = true;

        function opts(box) { return box.querySelectorAll('.omr-sbsaas-opt'); }

        function sync(box) {
            var n = opts(box).length;
            box.querySelectorAll('.omr-sbsaas-opt-del').forEach(function (b) { b.disabled = n <= 1; });
        }

        // 직렬화기 등록(자족) — OMR = SELECT(앞/뒤 수식어 + 선택지 옵션 값 셀), 정답 = VALUE 단독(선택된 선택지 값), 대소/공백 없음 → false/false
        window.omrSerializers = window.omrSerializers || {};
        // 앞/뒤 수식어 복원: {value, value_type} 있으면 값 셀에 주입(없으면 빈 기본 유지)
        function setAffix(cell, affix) {
            if (cell && affix && typeof affix === 'object') {
                window.ValueTypeInput.setValue(cell, { value: affix.value, value_type: affix.value_type });
            }
        }
        window.omrSerializers.SBSAAS = {
            serialize: function (root) {
                var pre = window.ValueTypeInput.getValue(root.querySelector('.omr-sbsaas-pre .vt-cell'));   // {value, value_type}
                var post = window.ValueTypeInput.getValue(root.querySelector('.omr-sbsaas-post .vt-cell'));
                var options = [], picked = null;
                root.querySelectorAll('.omr-sbsaas-opt').forEach(function (opt) {
                    var v = window.ValueTypeInput.getValue(opt.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                    if (opt.querySelector('input[type="radio"]').checked) picked = v;
                });
                var field = { type: 'SELECT' };
                if (pre.value) field.pre_text = { value: pre.value, value_type: pre.value_type };
                if (post.value) field.post_text = { value: post.value, value_type: post.value_type };
                field.options = options;
                var allowed = picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)];
                return { omr: [field], answer: window.OmrJson.value(allowed) };
            },
            // 유효성 검사 — 선택지 1세트, 2개 이상(1개면 고를 게 없음). 앞/뒤 수식어는 선택 입력이라 안 봄
            validate: function (out) {
                return window.OmrValidate.set(out.omr[0].options.map(function (o) { return o.value; }), out.answer.allowed_answer.length, 2);
            },
            // serialize 역방향. SELECT 1필드 + 정답 VALUE. 모양만 검사 → all-or-nothing.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0] || omr[0].type !== 'SELECT' || !Array.isArray(omr[0].options)) return false;
                if (!answer || answer.rule_type !== 'VALUE' || !Array.isArray(answer.allowed_answer)) return false;
                var field = omr[0], options = field.options;
                if (!options.length) return false;

                // 선택지 개수 맞춤(MIN 1)
                var box = root.querySelector('.omr-sbsaas-opts');
                var tpl = root.querySelector('.omr-sbsaas-opt-tpl');
                var cur = box.querySelectorAll('.omr-sbsaas-opt');
                for (var i = cur.length - 1; i >= options.length; i--) cur[i].remove();
                while (box.querySelectorAll('.omr-sbsaas-opt').length < options.length) {
                    box.appendChild(tpl.content.firstElementChild.cloneNode(true)); // 라디오 name(SBSAAS_ans) 공유
                }

                window.ValueTypeInput.init(root); // 값 셀 init 선점

                setAffix(root.querySelector('.omr-sbsaas-pre .vt-cell'), field.pre_text);
                setAffix(root.querySelector('.omr-sbsaas-post .vt-cell'), field.post_text);

                var picked = answer.allowed_answer.length ? answer.allowed_answer[0].value : null;
                var pickedDone = false;
                box.querySelectorAll('.omr-sbsaas-opt').forEach(function (opt, idx) {
                    var o = options[idx] || {};
                    window.ValueTypeInput.setValue(opt.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                    var radio = opt.querySelector('input[type="radio"]');
                    var hit = picked != null && !pickedDone && o.value === picked;
                    radio.checked = hit;
                    if (hit) pickedDone = true;
                });

                sync(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        document.addEventListener('click', function (e) {
            var t;
            if ((t = e.target.closest('.omr-sbsaas-opt-add'))) {
                var b = t.closest('.omr-sbsaas');
                var opt = b.querySelector('.omr-sbsaas-opt-tpl').content.firstElementChild.cloneNode(true); // 라디오 name(SBSAAS_ans) 공유
                b.querySelector('.omr-sbsaas-opts').appendChild(opt);
                sync(b);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(b);
                return;
            }
            if ((t = e.target.closest('.omr-sbsaas-opt-del'))) {
                var b2 = t.closest('.omr-sbsaas');
                if (opts(b2).length <= 1) return;
                t.closest('.omr-sbsaas-opt').remove();
                sync(b2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(b2);
                return;
            }
        });

        document.querySelectorAll('.omr-sbsaas').forEach(sync);
    })();
    

    (function () {
        if (window.__omrSbmanmBound) return;
        window.__omrSbmanmBound = true;

        var uid = 0;

        function sets(box) { return box.querySelectorAll('.omr-sbmanm-set'); }
        function anses(setEl) { return setEl.querySelectorAll('.omr-sbmanm-ans'); }

        function syncSetDel(box) {
            var n = sets(box).length;
            box.querySelectorAll('.omr-sbmanm-set-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncAnsDel(setEl) {
            var n = anses(setEl).length;
            setEl.querySelectorAll('.omr-sbmanm-ans-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncLegendDel(ansEl) {
            var n = ansEl.querySelectorAll('.omr-sbmanm-legend-row').length;
            ansEl.querySelectorAll('.omr-sbmanm-legend-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function applyMode(ansEl) {
            var legend = ansEl.querySelector('.omr-sbmanm-mode').value === 'legend';
            ansEl.querySelector('.omr-sbmanm-box').classList.toggle('d-none', legend);
            ansEl.querySelector('.omr-sbmanm-legend').classList.toggle('d-none', !legend);
        }
        // 새 정답 SET 의 범례 라디오에 고유 그룹명(정답 SET마다 독립 정답)
        function freshLegend(ansEl) {
            var name = 'SBMANM_leg_' + (++uid);
            ansEl.querySelectorAll('.omr-sbmanm-legend-row input[type="radio"]').forEach(function (r) { r.name = name; r.checked = false; });
        }
        function tpl(box, sel) { return box.querySelector(sel).content.firstElementChild.cloneNode(true); }

        // 직렬화기(자족) — OMR fields = 정답SET마다 1필드(box=TEXT / legend=SELECT) 평면 배열, delimiter=정답SET별 쉼표구분
        window.omrSerializers = window.omrSerializers || {};
        function readAllowed(row) {
            var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            var cs = checks[0] ? checks[0].checked : false;
            var ss = checks[1] ? checks[1].checked : false;
            return window.OmrJson.allowed(v.value, v.value_type, cs, ss);
        }
        function ansValue(ansEl) {
            if (ansEl.querySelector('.omr-sbmanm-mode').value !== 'legend') {
                var allowed = [readAllowed(ansEl.querySelector('.omr-sbmanm-answer-row'))];
                ansEl.querySelectorAll('.omr-sbmanm-sim-row').forEach(function (r) { allowed.push(readAllowed(r)); });
                return window.OmrJson.value(allowed);
            }
            var picked = null;
            ansEl.querySelectorAll('.omr-sbmanm-legend-row').forEach(function (r) {
                if (r.querySelector('input[type="radio"]').checked) picked = window.ValueTypeInput.getValue(r.querySelector('.vt-cell')); // {value, value_type}
            });
            return window.OmrJson.value(picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)]);
        }
        function ansFieldObj(ansEl, delimiter) {
            var legend = ansEl.querySelector('.omr-sbmanm-mode').value === 'legend';
            var pre = window.ValueTypeInput.getValue(ansEl.querySelector('.omr-sbmanm-pre .vt-cell'));   // {value, value_type}
            var post = window.ValueTypeInput.getValue(ansEl.querySelector('.omr-sbmanm-post .vt-cell'));
            var field = { type: legend ? 'SELECT' : 'TEXT' };
            if (pre.value) field.pre_text = { value: pre.value, value_type: pre.value_type };
            if (post.value) field.post_text = { value: post.value, value_type: post.value_type };
            if (delimiter) field.delimiter = delimiter;
            if (legend) {
                var options = [];
                ansEl.querySelectorAll('.omr-sbmanm-legend-row').forEach(function (r) {
                    var v = window.ValueTypeInput.getValue(r.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                });
                field.options = options;
            }
            return field;
        }
        function setAffix(cell, affix) { // 앞/뒤 수식어 복원
            if (cell && affix && typeof affix === 'object') {
                window.ValueTypeInput.setValue(cell, { value: affix.value, value_type: affix.value_type });
            }
        }
        function fillAllowedRow(row, allowed) { // 정답/유사정답 행: 값 셀 + 대소/공백 체크 복원
            if (!row || !allowed) return;
            window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: allowed.value, value_type: allowed.value_type });
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            if (checks[0]) checks[0].checked = !!allowed.case_sensitive;
            if (checks[1]) checks[1].checked = !!allowed.space_sensitive;
        }
        window.omrSerializers.SBMANM = {
            serialize: function (root) {
                var omr = [], setNodes = [];
                root.querySelectorAll('.omr-sbmanm-sets > .omr-sbmanm-set').forEach(function (setEl) {
                    var setChk = setEl.querySelector('.omr-sbmanm-set-ordered');
                    var ordered = setChk ? setChk.checked : false;
                    var ansNodes = [];
                    setEl.querySelectorAll('.omr-sbmanm-ans').forEach(function (ansEl) {
                        var delChk = ansEl.querySelector('.omr-sbmanm-ans-delimiter');
                        var delimiter = (delChk && delChk.checked) ? ',' : '';
                        ansNodes.push(ansValue(ansEl));
                        omr.push(ansFieldObj(ansEl, delimiter));
                    });
                    setNodes.push(ordered ? window.OmrJson.ordered(ansNodes) : window.OmrJson.unordered(ansNodes));
                });
                var topChk = root.querySelector('.omr-sbmanm-top-ordered');
                var topOrdered = topChk ? topChk.checked : false;
                // 단일 SET도 항상 감쌈(순서고정 체크 상태 보존, 특수처리 없음)
                var answer = topOrdered ? window.OmrJson.ordered(setNodes) : window.OmrJson.unordered(setNodes);
                return { omr: omr, answer: answer };
            },
            // 유효성 검사 — 정답 SET 마다 지금 모드만(박스형 = 빈값 금지·같은 값 허용, 범례형 = 범례 1세트 2개 이상). 순서 고정·쉼표 구분·앞/뒤 수식어·대소/공백 체크·SET 사이 같은 값은 안 봄, SET 개수는 화면이 1개 이상 보장
            validate: function (out) {
                var fi = 0;
                for (var s = 0; s < out.answer.nodes.length; s++) {
                    var ansNodes = out.answer.nodes[s].nodes;
                    for (var a = 0; a < ansNodes.length; a++, fi++) {
                        var msg = window.OmrValidate.field(out.omr[fi], ansNodes[a]);
                        if (msg) return (s + 1) + '번 OMR SET · ' + (a + 1) + '번 정답 SET · ' + msg;
                    }
                }
                return null;
            },
            // serialize 역방향. 정답 트리(top>set>ans VALUE) 가 SET/정답SET 개수를 정의, OMR flat fields 는 정답SET 순서대로 대응.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr.length) return false;
                for (var k = 0; k < omr.length; k++) {
                    if (!omr[k] || (omr[k].type !== 'TEXT' && omr[k].type !== 'SELECT')) return false;
                }
                if (!answer || (answer.rule_type !== 'ORDERED' && answer.rule_type !== 'UNORDERED') || !Array.isArray(answer.nodes)) return false;
                var setNodes = answer.nodes;
                if (!setNodes.length) return false;
                var flat = 0;
                for (var s = 0; s < setNodes.length; s++) {
                    var sn = setNodes[s];
                    if (!sn || (sn.rule_type !== 'ORDERED' && sn.rule_type !== 'UNORDERED') || !Array.isArray(sn.nodes) || !sn.nodes.length) return false;
                    for (var a = 0; a < sn.nodes.length; a++) { if (!sn.nodes[a] || sn.nodes[a].rule_type !== 'VALUE') return false; }
                    flat += sn.nodes.length;
                }
                if (flat !== omr.length) return false; // flat fields ↔ 트리 VALUE 위치대응(개수 일치)

                var topChk = root.querySelector('.omr-sbmanm-top-ordered');
                if (topChk) topChk.checked = answer.rule_type === 'ORDERED';

                // OMR SET 개수 맞춤
                var setsBox = root.querySelector('.omr-sbmanm-sets');
                var curSet = setsBox.querySelectorAll(':scope > .omr-sbmanm-set');
                for (var i = curSet.length - 1; i >= setNodes.length; i--) curSet[i].remove();
                while (setsBox.querySelectorAll(':scope > .omr-sbmanm-set').length < setNodes.length) {
                    setsBox.appendChild(tpl(root, '.omr-sbmanm-set-tpl'));
                }

                // 각 SET: 정답 SET 개수 맞춤
                var setEls = setsBox.querySelectorAll(':scope > .omr-sbmanm-set');
                setEls.forEach(function (setEl, si) {
                    var sn2 = setNodes[si];
                    var setChk = setEl.querySelector('.omr-sbmanm-set-ordered');
                    if (setChk) setChk.checked = sn2.rule_type === 'ORDERED';
                    var ansList = setEl.querySelector('.omr-sbmanm-ans-list');
                    var curAns = ansList.querySelectorAll('.omr-sbmanm-ans');
                    for (var j = curAns.length - 1; j >= sn2.nodes.length; j--) curAns[j].remove();
                    while (ansList.querySelectorAll('.omr-sbmanm-ans').length < sn2.nodes.length) {
                        var ansEl0 = tpl(root, '.omr-sbmanm-ans-tpl');
                        freshLegend(ansEl0); // 정답 SET마다 독립 범례 라디오 그룹
                        ansList.appendChild(ansEl0);
                    }
                });

                window.ValueTypeInput.init(root); // 전체 값 셀 선점(원본+클론 SET/ans)

                // 값 채움(flat 순서로 field 소비)
                var fi = 0;
                setEls.forEach(function (setEl, si) {
                    var sn3 = setNodes[si];
                    setEl.querySelectorAll('.omr-sbmanm-ans').forEach(function (ansEl, ai) {
                        var field = omr[fi], ansNode = sn3.nodes[ai];
                        fi++;
                        var legend = field.type === 'SELECT';
                        var mode = ansEl.querySelector('.omr-sbmanm-mode');
                        if (mode) mode.value = legend ? 'legend' : 'box';
                        applyMode(ansEl);
                        var delChk = ansEl.querySelector('.omr-sbmanm-ans-delimiter');
                        if (delChk) delChk.checked = field.delimiter === ',';
                        setAffix(ansEl.querySelector('.omr-sbmanm-pre .vt-cell'), field.pre_text);
                        setAffix(ansEl.querySelector('.omr-sbmanm-post .vt-cell'), field.post_text);
                        if (!legend) {
                            var allowed = Array.isArray(ansNode.allowed_answer) ? ansNode.allowed_answer : [];
                            fillAllowedRow(ansEl.querySelector('.omr-sbmanm-answer-row'), allowed[0]); // 정답
                            var simBox = ansEl.querySelector('.omr-sbmanm-sim-rows');
                            for (var x = 1; x < allowed.length; x++) { // 유사정답
                                var simRow = tpl(root, '.omr-sbmanm-sim-tpl');
                                simBox.appendChild(simRow);
                                window.ValueTypeInput.init(simRow);
                                fillAllowedRow(simRow, allowed[x]);
                            }
                        } else {
                            var options = Array.isArray(field.options) ? field.options : [];
                            var legRows = ansEl.querySelector('.omr-sbmanm-legend-rows');
                            var exRadio = legRows.querySelector('.omr-sbmanm-legend-row input[type="radio"]');
                            var exName = exRadio ? exRadio.name : ('SBMANM_leg_' + (++uid));
                            var curL = legRows.querySelectorAll('.omr-sbmanm-legend-row');
                            for (var y = curL.length - 1; y >= options.length; y--) curL[y].remove();
                            while (legRows.querySelectorAll('.omr-sbmanm-legend-row').length < options.length) {
                                var lr = tpl(root, '.omr-sbmanm-legend-tpl');
                                lr.querySelector('input[type="radio"]').name = exName; // 같은 정답 SET 그룹
                                legRows.appendChild(lr);
                            }
                            window.ValueTypeInput.init(ansEl);
                            var picked = (Array.isArray(ansNode.allowed_answer) && ansNode.allowed_answer.length) ? ansNode.allowed_answer[0].value : null;
                            var pickedDone = false;
                            legRows.querySelectorAll('.omr-sbmanm-legend-row').forEach(function (row, li) {
                                var o = options[li] || {};
                                window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                                var radio = row.querySelector('input[type="radio"]');
                                var hit = picked != null && !pickedDone && o.value === picked;
                                radio.checked = hit;
                                if (hit) pickedDone = true;
                            });
                            syncLegendDel(ansEl);
                        }
                    });
                    syncAnsDel(setEl);
                });

                syncSetDel(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        document.addEventListener('change', function (e) {
            var sel = e.target.closest('.omr-sbmanm-mode');
            if (sel) applyMode(sel.closest('.omr-sbmanm-ans'));
        });

        document.addEventListener('click', function (e) {
            var box = e.target.closest('.omr-sbmanm');
            if (!box) return;
            var t;

            if ((t = e.target.closest('.omr-sbmanm-set-add'))) {
                var setEl = tpl(box, '.omr-sbmanm-set-tpl');
                var ansEl = tpl(box, '.omr-sbmanm-ans-tpl');
                freshLegend(ansEl);
                setEl.querySelector('.omr-sbmanm-ans-list').appendChild(ansEl);
                box.querySelector('.omr-sbmanm-sets').appendChild(setEl);
                syncSetDel(box); syncAnsDel(setEl); syncLegendDel(ansEl); applyMode(ansEl);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-set-del'))) {
                if (sets(box).length <= 1) return;
                t.closest('.omr-sbmanm-set').remove(); syncSetDel(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-ans-add'))) {
                var set2 = t.closest('.omr-sbmanm-set');
                var ans2 = tpl(box, '.omr-sbmanm-ans-tpl');
                freshLegend(ans2);
                set2.querySelector('.omr-sbmanm-ans-list').appendChild(ans2);
                syncAnsDel(set2); syncLegendDel(ans2); applyMode(ans2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-ans-del'))) {
                var set3 = t.closest('.omr-sbmanm-set');
                if (anses(set3).length <= 1) return;
                t.closest('.omr-sbmanm-ans').remove(); syncAnsDel(set3);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-sim-add'))) {
                var simRow = tpl(box, '.omr-sbmanm-sim-tpl');
                t.closest('.omr-sbmanm-box').querySelector('.omr-sbmanm-sim-rows').appendChild(simRow);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-sim-del'))) {
                t.closest('.omr-sbmanm-sim-row').remove(); // 0개 허용
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-legend-add'))) {
                var ans4 = t.closest('.omr-sbmanm-ans');
                var row = tpl(box, '.omr-sbmanm-legend-tpl');
                var ex = ans4.querySelector('.omr-sbmanm-legend-row input[type="radio"]');
                if (ex) row.querySelector('input[type="radio"]').name = ex.name; // 같은 정답 그룹 유지
                row.querySelector('input[type="radio"]').checked = false;
                ans4.querySelector('.omr-sbmanm-legend-rows').appendChild(row);
                syncLegendDel(ans4);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmanm-legend-del'))) {
                var ans5 = t.closest('.omr-sbmanm-ans');
                if (ans5.querySelectorAll('.omr-sbmanm-legend-row').length <= 1) return;
                t.closest('.omr-sbmanm-legend-row').remove(); syncLegendDel(ans5);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
        });

        document.querySelectorAll('.omr-sbmanm').forEach(function (box) {
            sets(box).forEach(function (s) { syncSetDel(box); syncAnsDel(s); });
            box.querySelectorAll('.omr-sbmanm-ans').forEach(function (a) { syncLegendDel(a); applyMode(a); });
        });
    })();
    

    (function () {
        if (window.__omrSbmaasBound) return;
        window.__omrSbmaasBound = true;

        var uid = 0;

        function sets(box) { return box.querySelectorAll('.omr-sbmaas-set'); }
        function opts(setEl) { return setEl.querySelectorAll('.omr-sbmaas-opt'); }

        function syncSetDel(box) {
            var n = sets(box).length;
            box.querySelectorAll('.omr-sbmaas-set-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncOptDel(setEl) {
            var n = opts(setEl).length;
            setEl.querySelectorAll('.omr-sbmaas-opt-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        // 새 정답 SET 의 선택지 라디오에 고유 그룹명(SET마다 독립 정답)
        function freshRadio(setEl) {
            var name = 'SBMAAS_ans_' + (++uid);
            setEl.querySelectorAll('.omr-sbmaas-opt input[type="radio"]').forEach(function (r) { r.name = name; r.checked = false; });
        }
        function tpl(box, sel) { return box.querySelector(sel).content.firstElementChild.cloneNode(true); }

        // 직렬화기(자족) — SET마다 OMR SELECT 필드 평면 배열, 정답 = SET별 VALUE(단일 SET이면 직접, 다중이면 UNORDERED 위치 대응)
        window.omrSerializers = window.omrSerializers || {};
        function setAffix(cell, affix) { // 앞/뒤 수식어 복원: {value, value_type} 있으면 주입
            if (cell && affix && typeof affix === 'object') {
                window.ValueTypeInput.setValue(cell, { value: affix.value, value_type: affix.value_type });
            }
        }
        window.omrSerializers.SBMAAS = {
            serialize: function (root) {
                var omr = [], nodes = [];
                root.querySelectorAll('.omr-sbmaas-set').forEach(function (setEl) {
                    var symbol = setEl.querySelector('.omr-sbmaas-symbol').value.trim();
                    var delChk = setEl.querySelector('.omr-sbmaas-delimiter');
                    var delimiter = (delChk && delChk.checked) ? ',' : '';
                    var pre = window.ValueTypeInput.getValue(setEl.querySelector('.omr-sbmaas-pre .vt-cell'));   // {value, value_type}
                    var post = window.ValueTypeInput.getValue(setEl.querySelector('.omr-sbmaas-post .vt-cell'));
                    var options = [], picked = null;
                    setEl.querySelectorAll('.omr-sbmaas-opt').forEach(function (opt) {
                        var v = window.ValueTypeInput.getValue(opt.querySelector('.vt-cell')); // {value, value_type}
                        options.push({ value: v.value, value_type: v.value_type });
                        if (opt.querySelector('input[type="radio"]').checked) picked = v;
                    });
                    var field = { type: 'SELECT' };
                    if (symbol) field.title = symbol;
                    if (delimiter) field.delimiter = delimiter;
                    if (pre.value) field.pre_text = { value: pre.value, value_type: pre.value_type };
                    if (post.value) field.post_text = { value: post.value, value_type: post.value_type };
                    field.options = options;
                    omr.push(field);
                    var allowed = picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)];
                    nodes.push(window.OmrJson.value(allowed));
                });
                var answer = nodes.length === 1 ? nodes[0] : window.OmrJson.unordered(nodes);
                return { omr: omr, answer: answer };
            },
            // 유효성 검사 — 정답 SET 마다 선택지 1세트(2개 이상, SET 사이 같은 값 허용). 기호·쉼표 구분·앞/뒤 수식어는 안 봄, SET 개수는 화면이 1개 이상 보장
            validate: function (out) {
                var nodes = out.omr.length === 1 ? [out.answer] : out.answer.nodes;
                for (var i = 0; i < out.omr.length; i++) {
                    var msg = window.OmrValidate.set(out.omr[i].options.map(function (o) { return o.value; }), nodes[i].allowed_answer.length, 2);
                    if (msg) return (i + 1) + '번 SET · ' + msg;
                }
                return null;
            },
            // serialize 역방향. SET배열 ↔ 정답(단일=VALUE 직접, 다중=UNORDERED nodes 위치대응).
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr.length) return false;
                for (var k = 0; k < omr.length; k++) {
                    if (!omr[k] || omr[k].type !== 'SELECT' || !Array.isArray(omr[k].options)) return false;
                }
                var nodes;
                if (omr.length === 1) {
                    if (!answer || answer.rule_type !== 'VALUE') return false;
                    nodes = [answer];
                } else {
                    if (!answer || answer.rule_type !== 'UNORDERED' || !Array.isArray(answer.nodes) || answer.nodes.length !== omr.length) return false;
                    nodes = answer.nodes;
                }

                // SET 개수 맞춤(MIN 1)
                var setsBox = root.querySelector('.omr-sbmaas-sets');
                var cur = setsBox.querySelectorAll('.omr-sbmaas-set');
                for (var i = cur.length - 1; i >= omr.length; i--) cur[i].remove();
                while (setsBox.querySelectorAll('.omr-sbmaas-set').length < omr.length) {
                    var s = tpl(root, '.omr-sbmaas-set-tpl');
                    freshRadio(s); // SET마다 독립 라디오 그룹
                    setsBox.appendChild(s);
                }

                window.ValueTypeInput.init(root); // 원본+클론 SET 값 셀 선점

                setsBox.querySelectorAll('.omr-sbmaas-set').forEach(function (setEl, idx) {
                    var field = omr[idx] || {}, node = nodes[idx] || {};
                    var opts = field.options || [];
                    var sym = setEl.querySelector('.omr-sbmaas-symbol');
                    if (sym) sym.value = field.title || ''; // 기호(표시용)
                    var delChk = setEl.querySelector('.omr-sbmaas-delimiter');
                    if (delChk) delChk.checked = field.delimiter === ',';
                    setAffix(setEl.querySelector('.omr-sbmaas-pre .vt-cell'), field.pre_text);
                    setAffix(setEl.querySelector('.omr-sbmaas-post .vt-cell'), field.post_text);

                    // 선택지 개수 맞춤(같은 SET 라디오 그룹 유지)
                    var optBox = setEl.querySelector('.omr-sbmaas-opts');
                    var optTpl = root.querySelector('.omr-sbmaas-opt-tpl');
                    var curOpt = optBox.querySelectorAll('.omr-sbmaas-opt');
                    for (var j = curOpt.length - 1; j >= opts.length; j--) curOpt[j].remove();
                    var exRadio = optBox.querySelector('.omr-sbmaas-opt input[type="radio"]');
                    var exName = exRadio ? exRadio.name : '';
                    while (optBox.querySelectorAll('.omr-sbmaas-opt').length < opts.length) {
                        var row = optTpl.content.firstElementChild.cloneNode(true);
                        if (exName) row.querySelector('input[type="radio"]').name = exName;
                        optBox.appendChild(row);
                    }
                    window.ValueTypeInput.init(setEl); // 새 선택지 셀 선점

                    var picked = (node.rule_type === 'VALUE' && Array.isArray(node.allowed_answer) && node.allowed_answer.length) ? node.allowed_answer[0].value : null;
                    var pickedDone = false;
                    optBox.querySelectorAll('.omr-sbmaas-opt').forEach(function (opt, oi) {
                        var o = opts[oi] || {};
                        window.ValueTypeInput.setValue(opt.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                        var radio = opt.querySelector('input[type="radio"]');
                        var hit = picked != null && !pickedDone && o.value === picked;
                        radio.checked = hit;
                        if (hit) pickedDone = true;
                    });
                    syncOptDel(setEl);
                });

                syncSetDel(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        document.addEventListener('click', function (e) {
            var box = e.target.closest('.omr-sbmaas');
            if (!box) return;
            var t;

            if ((t = e.target.closest('.omr-sbmaas-set-add'))) {
                var s = tpl(box, '.omr-sbmaas-set-tpl');
                freshRadio(s);
                box.querySelector('.omr-sbmaas-sets').appendChild(s);
                syncSetDel(box); syncOptDel(s);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmaas-set-del'))) {
                if (sets(box).length <= 1) return;
                t.closest('.omr-sbmaas-set').remove(); syncSetDel(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmaas-opt-add'))) {
                var set2 = t.closest('.omr-sbmaas-set');
                var row = tpl(box, '.omr-sbmaas-opt-tpl');
                var ex = set2.querySelector('.omr-sbmaas-opt input[type="radio"]');
                if (ex) row.querySelector('input[type="radio"]').name = ex.name; // 같은 SET 정답 그룹 유지
                row.querySelector('input[type="radio"]').checked = false;
                set2.querySelector('.omr-sbmaas-opts').appendChild(row);
                syncOptDel(set2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmaas-opt-del'))) {
                var set3 = t.closest('.omr-sbmaas-set');
                if (opts(set3).length <= 1) return;
                t.closest('.omr-sbmaas-opt').remove(); syncOptDel(set3);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
        });

        document.querySelectorAll('.omr-sbmaas').forEach(function (box) {
            syncSetDel(box); sets(box).forEach(syncOptDel);
        });
    })();
    

    (function () {
        if (window.__omrSbmaldBound) return;
        window.__omrSbmaldBound = true;

        var legUid = 1; // 정적 legid 0,1 → 다음 2

        function legs(box) { return box.querySelectorAll('.omr-sbmald-leg'); }
        function items(box) { return box.querySelectorAll('.omr-sbmald-item'); }
        function links(itemEl) { return itemEl.querySelectorAll('.omr-sbmald-link'); }

        function syncLegDel(box) {
            var n = legs(box).length;
            box.querySelectorAll('.omr-sbmald-leg-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncItemDel(box) {
            var n = items(box).length;
            box.querySelectorAll('.omr-sbmald-item-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncLinks(itemEl) {
            var n = links(itemEl).length;
            itemEl.querySelectorAll('.omr-sbmald-link-del').forEach(function (b) { b.disabled = n <= 1; });
            var add = itemEl.querySelector('.omr-sbmald-link-add');
            if (add) add.disabled = n >= 3;
        }
        // 2열 범례(값 셀) → 1열 모든 값 드롭다운 옵션 재구성(legid 값 + value_type 보존)
        function syncSelects(box) {
            if (!window.ValueTypeInput || !window.ValueTypeDropdown) return; // 컴포넌트 로드 전(리프 인라인이 먼저 파싱) 방어
            var opts = [];
            legs(box).forEach(function (l) {
                var v = window.ValueTypeInput.getValue(l.querySelector('.vt-cell')); // {value, value_type}
                opts.push({ value: l.dataset.legid, label: v.value, value_type: v.value_type });
            });
            box.querySelectorAll('.vtd-cell').forEach(function (cell) {
                window.ValueTypeDropdown.setOptions(cell, opts); // 현재 선택 legid 는 setOptions 가 유지/리셋
            });
        }
        function tpl(box, sel) { return box.querySelector(sel).content.firstElementChild.cloneNode(true); }

        // 직렬화기(자족) — OMR = {left_fields(기호), right_fields(범례), multi_flag:"Y"}, 정답 = ORDERED[1열 항목별](연결 다수=UNORDERED)
        window.omrSerializers = window.omrSerializers || {};
        // 정답 노드 → 연결된 값 배열([value...]). VALUE(빈값=연결없음) / UNORDERED(다수 연결) 처리.
        function nodeToValues(node) {
            if (!node) return [];
            if (node.rule_type === 'VALUE') {
                var v = (Array.isArray(node.allowed_answer) && node.allowed_answer.length) ? node.allowed_answer[0].value : '';
                return (v === '' || v == null) ? [] : [v];
            }
            if (node.rule_type === 'UNORDERED' && Array.isArray(node.nodes)) {
                return node.nodes.map(function (n) {
                    return (n && n.rule_type === 'VALUE' && Array.isArray(n.allowed_answer) && n.allowed_answer.length) ? n.allowed_answer[0].value : '';
                }).filter(function (v) { return v !== '' && v != null; });
            }
            return [];
        }
        window.omrSerializers.SBMALD = {
            serialize: function (root) {
                var legMap = {}, right = [];
                legs(root).forEach(function (l) {
                    var v = window.ValueTypeInput.getValue(l.querySelector('.vt-cell')); // {value, value_type}
                    legMap[l.dataset.legid] = v;
                    right.push({ value: v.value, value_type: v.value_type });
                });
                var left = [], nodes = [];
                items(root).forEach(function (it) {
                    var sym = window.ValueTypeInput.getValue(it.querySelector('.vt-cell')); // 기호(item 직속 값 셀)
                    left.push({ value: sym.value, value_type: sym.value_type });
                    var vals = [];
                    it.querySelectorAll('.vtd-cell').forEach(function (cell) {
                        var legid = window.ValueTypeDropdown.getValue(cell);
                        if (legid !== '') vals.push(legMap[legid] != null ? legMap[legid] : { value: '', value_type: '' });
                    });
                    if (vals.length <= 1) {
                        var one = vals[0] || { value: '', value_type: '' };
                        nodes.push(window.OmrJson.value([window.OmrJson.allowed(one.value, one.value_type, false, false)]));
                    } else {
                        nodes.push(window.OmrJson.unordered(vals.map(function (vv) {
                            return window.OmrJson.value([window.OmrJson.allowed(vv.value, vv.value_type, false, false)]);
                        })));
                    }
                });
                var omr = [{ left_fields: left, right_fields: right, multi_flag: 'Y' }];
                return { omr: omr, answer: nodes.length === 1 ? nodes[0] : window.OmrJson.ordered(nodes) };
            },
            // 유효성 검사 — 1열 기호 · 2열 범례 각각 빈값·중복 금지, 한 항목 안 같은 범례 두 번 연결 금지(다른 항목끼리 같은 범례는 1:N 이라 허용). 미연결은 드롭다운이 2열 첫 항목으로 채워 생기지 않음
            validate: function (out) {
                var f = out.omr[0];
                var msg = window.OmrValidate.list(f.left_fields.map(function (o) { return o.value; }));
                if (msg) return '1열 · ' + msg;
                msg = window.OmrValidate.list(f.right_fields.map(function (o) { return o.value; }));
                if (msg) return '2열 · ' + msg;
                var nodes = f.left_fields.length === 1 ? [out.answer] : out.answer.nodes;
                for (var i = 0; i < nodes.length; i++) {
                    var linked = nodes[i].rule_type === 'UNORDERED' ? nodes[i].nodes : [nodes[i]];
                    msg = window.OmrValidate.links(linked.map(function (n) { return n.allowed_answer[0].value; }));
                    if (msg) return '1열 ' + f.left_fields[i].value + ' · ' + msg;
                }
                return null;
            },
            // serialize 역방향. 2열(범례)·1열(기호) 복원 후, 정답 값 → legid 역매핑(첫 매칭)으로 드롭다운 연결 복원.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0] || !Array.isArray(omr[0].left_fields) || !Array.isArray(omr[0].right_fields)) return false;
                var left = omr[0].left_fields, right = omr[0].right_fields;
                if (!left.length || !right.length) return false;

                var itemNodes;
                if (left.length === 1) {
                    if (!answer) return false;
                    itemNodes = [answer]; // 단일 항목이면 VALUE/UNORDERED 직접
                } else {
                    if (!answer || answer.rule_type !== 'ORDERED' || !Array.isArray(answer.nodes) || answer.nodes.length !== left.length) return false;
                    itemNodes = answer.nodes;
                }

                // 2열 범례 개수 맞춤 + legid 재부여(0-based, right 인덱스와 일치)
                var c2 = root.querySelector('.omr-sbmald-c2-list');
                var legTpl = root.querySelector('.omr-sbmald-leg-tpl');
                var curLeg = c2.querySelectorAll('.omr-sbmald-leg');
                for (var i = curLeg.length - 1; i >= right.length; i--) curLeg[i].remove();
                while (c2.querySelectorAll('.omr-sbmald-leg').length < right.length) c2.appendChild(legTpl.content.firstElementChild.cloneNode(true));
                c2.querySelectorAll('.omr-sbmald-leg').forEach(function (l, idx) { l.dataset.legid = String(idx); });

                // 1열 항목 개수 맞춤
                var c1 = root.querySelector('.omr-sbmald-c1-list');
                var itemTpl = root.querySelector('.omr-sbmald-item-tpl');
                var curItem = c1.querySelectorAll('.omr-sbmald-item');
                for (var j = curItem.length - 1; j >= left.length; j--) curItem[j].remove();
                while (c1.querySelectorAll('.omr-sbmald-item').length < left.length) c1.appendChild(itemTpl.content.firstElementChild.cloneNode(true));

                // 각 항목 연결(드롭다운) 개수 = 정답 노드의 연결 수(1~3)
                var itemEls = c1.querySelectorAll('.omr-sbmald-item');
                itemEls.forEach(function (it, idx) {
                    var vals = nodeToValues(itemNodes[idx]);
                    var n = Math.max(1, Math.min(3, vals.length || 1));
                    var linksBox = it.querySelector('.omr-sbmald-links');
                    var linkTpl = root.querySelector('.omr-sbmald-link-tpl');
                    var curLink = linksBox.querySelectorAll('.omr-sbmald-link');
                    for (var k = curLink.length - 1; k >= n; k--) curLink[k].remove();
                    while (linksBox.querySelectorAll('.omr-sbmald-link').length < n) linksBox.appendChild(linkTpl.content.firstElementChild.cloneNode(true));
                });

                window.ValueTypeInput.init(root);    // 기호·범례 값 셀 선점
                window.ValueTypeDropdown.init(root); // 드롭다운 셀 선점

                // 범례 값 채움
                c2.querySelectorAll('.omr-sbmald-leg').forEach(function (l, idx) {
                    var o = right[idx] || {};
                    window.ValueTypeInput.setValue(l.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                });
                // 기호 값 채움
                itemEls.forEach(function (it, idx) {
                    var o = left[idx] || {};
                    window.ValueTypeInput.setValue(it.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                });

                syncSelects(root); // 드롭다운 옵션 배선(범례값 기준)

                // 값 → legid 역매핑(첫 매칭). 범례값 유일 시 정확, 중복 시 첫 항목으로 귀속(구조적 한계)
                var valToLeg = {};
                right.forEach(function (o, idx) { if (!(o.value in valToLeg)) valToLeg[o.value] = String(idx); });

                itemEls.forEach(function (it, idx) {
                    var vals = nodeToValues(itemNodes[idx]);
                    var cells = it.querySelectorAll('.vtd-cell');
                    cells.forEach(function (cell, ci) {
                        var v = vals[ci];
                        var legid = (v != null && v !== '' && (v in valToLeg)) ? valToLeg[v] : '';
                        window.ValueTypeDropdown.setValue(cell, legid);
                    });
                    syncLinks(it);
                });

                legUid = right.length - 1; // 이후 2열 추가 시 legid 충돌 방지
                syncLegDel(root); syncItemDel(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        // 범례 값(값 셀) 변경 즉시 드롭다운 옵션 라벨 동기화
        document.addEventListener('vt:change', function (e) {
            var leg = e.target.closest && e.target.closest('.omr-sbmald-leg');
            if (leg) { var box = leg.closest('.omr-sbmald'); if (box) syncSelects(box); }
        });

        document.addEventListener('click', function (e) {
            var box = e.target.closest('.omr-sbmald');
            if (!box) return;
            var t;

            if ((t = e.target.closest('.omr-sbmald-leg-add'))) {
                var l = tpl(box, '.omr-sbmald-leg-tpl');
                l.dataset.legid = String(++legUid);
                box.querySelector('.omr-sbmald-c2-list').appendChild(l);
                syncLegDel(box); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmald-leg-del'))) {
                if (legs(box).length <= 1) return;
                t.closest('.omr-sbmald-leg').remove();
                syncLegDel(box); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmald-item-add'))) {
                var it = tpl(box, '.omr-sbmald-item-tpl');
                box.querySelector('.omr-sbmald-c1-list').appendChild(it);
                syncItemDel(box); syncLinks(it); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmald-item-del'))) {
                if (items(box).length <= 1) return;
                t.closest('.omr-sbmald-item').remove(); syncItemDel(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmald-link-add'))) {
                var it2 = t.closest('.omr-sbmald-item');
                if (links(it2).length >= 3) return;
                it2.querySelector('.omr-sbmald-links').appendChild(tpl(box, '.omr-sbmald-link-tpl'));
                syncLinks(it2); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmald-link-del'))) {
                var it3 = t.closest('.omr-sbmald-item');
                if (links(it3).length <= 1) return;
                t.closest('.omr-sbmald-link').remove(); syncLinks(it3);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
        });

        function initBoxes() {
            document.querySelectorAll('.omr-sbmald').forEach(function (box) {
                syncLegDel(box); syncItemDel(box);
                items(box).forEach(syncLinks);
                syncSelects(box); // 컴포넌트 로드 후(DOMContentLoaded) 초기 옵션 배선
            });
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBoxes);
        else initBoxes();
    })();
    

    (function () {
        if (window.__omrSbmaddBound) return;
        window.__omrSbmaddBound = true;

        var legUid = 1; // 정적 legid 0,1 → 다음 2

        function legs(box) { return box.querySelectorAll('.omr-sbmadd-leg'); }
        function items(box) { return box.querySelectorAll('.omr-sbmadd-item'); }

        function syncLegDel(box) {
            var n = legs(box).length;
            box.querySelectorAll('.omr-sbmadd-leg-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncItemDel(box) {
            var n = items(box).length;
            box.querySelectorAll('.omr-sbmadd-item-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        // 2열 보기(값 셀) → 1열 모든 값 드롭다운 옵션 재구성(legid 값 + value_type 보존)
        function syncSelects(box) {
            if (!window.ValueTypeInput || !window.ValueTypeDropdown) return; // 컴포넌트 로드 전(리프 인라인이 먼저 파싱) 방어
            var opts = [];
            legs(box).forEach(function (l) {
                var v = window.ValueTypeInput.getValue(l.querySelector('.vt-cell')); // {value, value_type}
                opts.push({ value: l.dataset.legid, label: v.value, value_type: v.value_type });
            });
            box.querySelectorAll('.vtd-cell').forEach(function (cell) {
                window.ValueTypeDropdown.setOptions(cell, opts); // 현재 선택 legid 는 setOptions 가 유지/리셋
            });
        }
        function tpl(box, sel) { return box.querySelector(sel).content.firstElementChild.cloneNode(true); }

        // 직렬화기(자족) — OMR = {left_fields(기호, 쉼표구분 시 delimiter:","), right_fields(보기), multi_flag:"N"}(1:1), 정답 = ORDERED[VALUE(연결된 보기값) per 항목]
        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.SBMADD = {
            serialize: function (root) {
                var legMap = {}, right = [];
                legs(root).forEach(function (l) {
                    var v = window.ValueTypeInput.getValue(l.querySelector('.vt-cell')); // {value, value_type}
                    legMap[l.dataset.legid] = v;
                    right.push({ value: v.value, value_type: v.value_type });
                });
                var left = [], nodes = [];
                items(root).forEach(function (it) {
                    var sym = window.ValueTypeInput.getValue(it.querySelector('.vt-cell')); // 기호(item 직속 값 셀)
                    var field = { value: sym.value, value_type: sym.value_type };
                    var delChk = it.querySelector('.omr-sbmadd-delimiter');
                    if (delChk && delChk.checked) field.delimiter = ',';
                    left.push(field);
                    var cell = it.querySelector('.vtd-cell');
                    var legid = cell ? window.ValueTypeDropdown.getValue(cell) : '';
                    var v = (legid !== '' && legMap[legid] != null) ? legMap[legid] : { value: '', value_type: '' };
                    nodes.push(window.OmrJson.value([window.OmrJson.allowed(v.value, v.value_type, false, false)]));
                });
                var omr = [{ left_fields: left, right_fields: right, multi_flag: 'N' }];
                return { omr: omr, answer: nodes.length === 1 ? nodes[0] : window.OmrJson.ordered(nodes) };
            },
            // 유효성 검사 — 1열 기호 · 2열 보기 각각 빈값·중복 금지. 연결은 항목마다 1개 고정이라 안 보고, 다른 항목끼리 같은 보기는 허용(SBMALD 와 같음). 쉼표 구분은 안 봄
            validate: function (out) {
                var f = out.omr[0];
                var msg = window.OmrValidate.list(f.left_fields.map(function (o) { return o.value; }));
                if (msg) return '1열 · ' + msg;
                msg = window.OmrValidate.list(f.right_fields.map(function (o) { return o.value; }));
                return msg ? '2열 · ' + msg : null;
            },
            // serialize 역방향 — 2열(보기)·1열(기호) 복원 후 정답 값 → legid 역매핑(첫 매칭)으로 드롭다운 1:1 연결·쉼표구분 복원
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr[0] || !Array.isArray(omr[0].left_fields) || !Array.isArray(omr[0].right_fields)) return false;
                var left = omr[0].left_fields, right = omr[0].right_fields;
                if (!left.length || !right.length) return false;

                var itemNodes;
                if (left.length === 1) {
                    if (!answer) return false;
                    itemNodes = [answer];
                } else {
                    if (!answer || answer.rule_type !== 'ORDERED' || !Array.isArray(answer.nodes) || answer.nodes.length !== left.length) return false;
                    itemNodes = answer.nodes;
                }

                // 2열 보기 개수 맞춤 + legid 재부여(0-based)
                var c2 = root.querySelector('.omr-sbmadd-c2-list');
                var legTpl = root.querySelector('.omr-sbmadd-leg-tpl');
                var curLeg = c2.querySelectorAll('.omr-sbmadd-leg');
                for (var i = curLeg.length - 1; i >= right.length; i--) curLeg[i].remove();
                while (c2.querySelectorAll('.omr-sbmadd-leg').length < right.length) c2.appendChild(legTpl.content.firstElementChild.cloneNode(true));
                c2.querySelectorAll('.omr-sbmadd-leg').forEach(function (l, idx) { l.dataset.legid = String(idx); });

                // 1열 항목 개수 맞춤(1:1 = 드롭다운 1개 고정)
                var c1 = root.querySelector('.omr-sbmadd-c1-list');
                var itemTpl = root.querySelector('.omr-sbmadd-item-tpl');
                var curItem = c1.querySelectorAll('.omr-sbmadd-item');
                for (var j = curItem.length - 1; j >= left.length; j--) curItem[j].remove();
                while (c1.querySelectorAll('.omr-sbmadd-item').length < left.length) c1.appendChild(itemTpl.content.firstElementChild.cloneNode(true));

                window.ValueTypeInput.init(root);
                window.ValueTypeDropdown.init(root);

                c2.querySelectorAll('.omr-sbmadd-leg').forEach(function (l, idx) {
                    var o = right[idx] || {};
                    window.ValueTypeInput.setValue(l.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                });
                var itemEls = c1.querySelectorAll('.omr-sbmadd-item');
                itemEls.forEach(function (it, idx) {
                    var o = left[idx] || {};
                    window.ValueTypeInput.setValue(it.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                    var delChk = it.querySelector('.omr-sbmadd-delimiter');
                    if (delChk) delChk.checked = o.delimiter === ',';
                });

                syncSelects(root);

                var valToLeg = {};
                right.forEach(function (o, idx) { if (!(o.value in valToLeg)) valToLeg[o.value] = String(idx); });

                itemEls.forEach(function (it, idx) {
                    var node = itemNodes[idx];
                    var v = (node && node.rule_type === 'VALUE' && Array.isArray(node.allowed_answer) && node.allowed_answer.length) ? node.allowed_answer[0].value : '';
                    var legid = (v !== '' && v != null && (v in valToLeg)) ? valToLeg[v] : '';
                    var cell = it.querySelector('.vtd-cell');
                    if (cell) window.ValueTypeDropdown.setValue(cell, legid);
                });

                legUid = right.length - 1; // 이후 2열 추가 시 legid 충돌 방지
                syncLegDel(root); syncItemDel(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        // 보기 값(값 셀) 변경 즉시 드롭다운 옵션 라벨 동기화
        document.addEventListener('vt:change', function (e) {
            var leg = e.target.closest && e.target.closest('.omr-sbmadd-leg');
            if (leg) { var box = leg.closest('.omr-sbmadd'); if (box) syncSelects(box); }
        });

        document.addEventListener('click', function (e) {
            var box = e.target.closest('.omr-sbmadd');
            if (!box) return;
            var t;

            if ((t = e.target.closest('.omr-sbmadd-leg-add'))) {
                var l = tpl(box, '.omr-sbmadd-leg-tpl');
                l.dataset.legid = String(++legUid);
                box.querySelector('.omr-sbmadd-c2-list').appendChild(l);
                syncLegDel(box); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmadd-leg-del'))) {
                if (legs(box).length <= 1) return;
                t.closest('.omr-sbmadd-leg').remove();
                syncLegDel(box); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmadd-item-add'))) {
                var it = tpl(box, '.omr-sbmadd-item-tpl');
                box.querySelector('.omr-sbmadd-c1-list').appendChild(it);
                syncItemDel(box); syncSelects(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-sbmadd-item-del'))) {
                if (items(box).length <= 1) return;
                t.closest('.omr-sbmadd-item').remove(); syncItemDel(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
        });

        function initBoxes() {
            document.querySelectorAll('.omr-sbmadd').forEach(function (box) {
                syncLegDel(box); syncItemDel(box);
                syncSelects(box); // 컴포넌트 로드 후(DOMContentLoaded) 초기 옵션 배선
            });
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBoxes);
        else initBoxes();
    })();
    

    (function () {
        if (window.__omrEsba00Bound) return;
        window.__omrEsba00Bound = true;

        window.omrSerializers = window.omrSerializers || {};
        window.omrSerializers.ESBA00 = {
            serialize: function (root) {
                var t1 = root.querySelector('.omr-esba00-title').value.trim();
                var f1 = { type: 'COMMENT' }; if (t1) f1.title = t1;
                return { omr: [f1], answer: window.OmrJson.manual() };
            },
            // 유효성 검사 — 수동 채점이라 정답이 없고 타이틀은 선택 입력이라 검사할 것 없음(규칙을 정한 유형으로 표시하려고 둠)
            validate: function () {
                return null;
            },
            // serialize 역방향. 수동채점이라 타이틀 1개만 복원
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || omr.length !== 1 || !omr[0] ||
                    omr[0].type !== 'COMMENT') return false;
                if (!answer || answer.rule_type !== 'MANUAL') return false;
                var t1 = root.querySelector('.omr-esba00-title');
                if (t1) t1.value = omr[0].title || '';
                return true;
            }
        };
    })();
    

    (function () {
        if (window.__omrEssaBound) return;
        window.__omrEssaBound = true;

        function blocks(box) { return box.querySelectorAll('.omr-essa-block'); }
        function applyMode(blk) {
            var sel = blk.querySelector('.omr-essa-mode');
            if (!sel) return;
            var legend = sel.value === 'legend';
            blk.querySelector('.omr-essa-box').classList.toggle('d-none', legend);
            blk.querySelector('.omr-essa-legend').classList.toggle('d-none', !legend);
        }
        function syncLegendDel(blk) {
            var n = blk.querySelectorAll('.omr-essa-legend-row').length;
            blk.querySelectorAll('.omr-essa-legend-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function tpl(box, sel) { return box.querySelector(sel).content.firstElementChild.cloneNode(true); }

        // 직렬화기(자족) — 풀이과정 블록(mode 없음)=COMMENT/MANUAL, 정답 블록(mode 있음)=TEXT|SELECT/VALUE, 최상위는 블록 순서대로 ORDERED
        window.omrSerializers = window.omrSerializers || {};
        function readAllowed(row) {
            var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            var cs = checks[0] ? checks[0].checked : false;
            var ss = checks[1] ? checks[1].checked : false;
            return window.OmrJson.allowed(v.value, v.value_type, cs, ss);
        }
        function setAffix(cell, affix) { // 앞/뒤 수식어 복원
            if (cell && affix && typeof affix === 'object') {
                window.ValueTypeInput.setValue(cell, { value: affix.value, value_type: affix.value_type });
            }
        }
        function fillAllowedRow(row, allowed) { // 정답/유사정답 행: 값 셀 + 대소/공백 체크 복원
            if (!row || !allowed) return;
            window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: allowed.value, value_type: allowed.value_type });
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            if (checks[0]) checks[0].checked = !!allowed.case_sensitive;
            if (checks[1]) checks[1].checked = !!allowed.space_sensitive;
        }
        window.omrSerializers.ESSA00 = {
            serialize: function (root) {
                var omr = [], nodes = [];
                root.querySelectorAll('.omr-essa-blocks > .omr-essa-block').forEach(function (blk) {
                    var title = blk.querySelector('.omr-essa-title-input').value.trim();
                    var modeSel = blk.querySelector('.omr-essa-mode');
                    if (!modeSel) { // 풀이과정 = 수동 채점
                        var fc = { type: 'COMMENT' };
                        if (title) fc.title = title;
                        omr.push(fc);
                        nodes.push(window.OmrJson.manual());
                        return;
                    }
                    var legend = modeSel.value === 'legend';
                    var pre = window.ValueTypeInput.getValue(blk.querySelector('.omr-essa-pre .vt-cell'));   // {value, value_type}
                    var post = window.ValueTypeInput.getValue(blk.querySelector('.omr-essa-post .vt-cell'));
                    var field = { type: legend ? 'SELECT' : 'TEXT' };
                    if (title) field.title = title;
                    if (pre.value) field.pre_text = { value: pre.value, value_type: pre.value_type };
                    if (post.value) field.post_text = { value: post.value, value_type: post.value_type };
                    if (!legend) {
                        var allowed = [readAllowed(blk.querySelector('.omr-essa-answer-row'))];
                        blk.querySelectorAll('.omr-essa-sim-row').forEach(function (r) { allowed.push(readAllowed(r)); });
                        omr.push(field);
                        nodes.push(window.OmrJson.value(allowed));
                    } else {
                        var options = [], picked = null;
                        blk.querySelectorAll('.omr-essa-legend-row').forEach(function (r) {
                            var v = window.ValueTypeInput.getValue(r.querySelector('.vt-cell')); // {value, value_type}
                            options.push({ value: v.value, value_type: v.value_type });
                            if (r.querySelector('input[type="radio"]').checked) picked = v;
                        });
                        field.options = options;
                        omr.push(field);
                        nodes.push(window.OmrJson.value(picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)]));
                    }
                });
                return { omr: omr, answer: nodes.length === 1 ? nodes[0] : window.OmrJson.ordered(nodes) };
            },
            // 유효성 검사 — 정답 블록만 SBSANM 규칙(블록 순서와 무관하게 COMMENT 아닌 필드). 풀이 블록 · 블록 타이틀은 안 봄
            validate: function (out) {
                var nodes = out.omr.length === 1 ? [out.answer] : out.answer.nodes;
                for (var i = 0; i < out.omr.length; i++) {
                    if (out.omr[i].type !== 'COMMENT') return window.OmrValidate.field(out.omr[i], nodes[i]);
                }
                return null;
            },
            // serialize 역방향. 블록 2개(풀이 COMMENT + 정답 TEXT/SELECT), 최상위 ORDERED. omr[0].type 으로 스왑 판정.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || omr.length !== 2) return false;
                var comCount = 0, ansCount = 0;
                for (var k = 0; k < 2; k++) {
                    if (!omr[k]) return false;
                    if (omr[k].type === 'COMMENT') comCount++;
                    else if (omr[k].type === 'TEXT' || omr[k].type === 'SELECT') ansCount++;
                }
                if (comCount !== 1 || ansCount !== 1) return false;
                if (!answer || answer.rule_type !== 'ORDERED' || !Array.isArray(answer.nodes) || answer.nodes.length !== 2) return false;

                var descFirst = omr[0].type === 'COMMENT'; // 풀이 블록이 먼저?
                var descIdx = descFirst ? 0 : 1, ansIdxJ = descFirst ? 1 : 0;
                var descField = omr[descIdx], ansField = omr[ansIdxJ], ansNode = answer.nodes[ansIdxJ];
                var legend = ansField.type === 'SELECT';
                if (!ansNode || ansNode.rule_type !== 'VALUE' || !Array.isArray(ansNode.allowed_answer)) return false;
                if (legend && !Array.isArray(ansField.options)) return false;

                // 블록 판정(mode 없음=풀이 / 있음=정답)
                var wrap = root.querySelector('.omr-essa-blocks');
                var descBlk = null, ansBlk = null;
                wrap.querySelectorAll('.omr-essa-block').forEach(function (b) {
                    if (b.querySelector('.omr-essa-mode')) ansBlk = b; else descBlk = b;
                });
                if (!descBlk || !ansBlk) return false;

                // 검사 통과 후 DOM 조작 — 순서 재배치(appendChild = 이동): [firstBlk, swap, secondBlk]
                var swap = wrap.querySelector('.omr-essa-swap');
                var firstBlk = descFirst ? descBlk : ansBlk, secondBlk = descFirst ? ansBlk : descBlk;
                wrap.appendChild(firstBlk);
                if (swap) wrap.appendChild(swap);
                wrap.appendChild(secondBlk);

                var dTitle = descBlk.querySelector('.omr-essa-title-input');
                if (dTitle) dTitle.value = descField.title || '';
                var aTitle = ansBlk.querySelector('.omr-essa-title-input');
                if (aTitle) aTitle.value = ansField.title || '';
                var modeSel = ansBlk.querySelector('.omr-essa-mode');
                if (modeSel) modeSel.value = legend ? 'legend' : 'box';
                applyMode(ansBlk);

                window.ValueTypeInput.init(root); // 값 셀 선점
                setAffix(ansBlk.querySelector('.omr-essa-pre .vt-cell'), ansField.pre_text);
                setAffix(ansBlk.querySelector('.omr-essa-post .vt-cell'), ansField.post_text);

                if (!legend) {
                    var allowed = ansNode.allowed_answer;
                    fillAllowedRow(ansBlk.querySelector('.omr-essa-answer-row'), allowed[0]); // 정답
                    var simBox = ansBlk.querySelector('.omr-essa-sim-rows');
                    for (var i = 1; i < allowed.length; i++) { // 유사정답
                        var simRow = tpl(root, '.omr-essa-sim-tpl');
                        simBox.appendChild(simRow);
                        window.ValueTypeInput.init(simRow);
                        fillAllowedRow(simRow, allowed[i]);
                    }
                } else {
                    var options = ansField.options;
                    var legRows = ansBlk.querySelector('.omr-essa-legend-rows');
                    var cur = legRows.querySelectorAll('.omr-essa-legend-row');
                    for (var j = cur.length - 1; j >= options.length; j--) cur[j].remove();
                    var exRadio = legRows.querySelector('.omr-essa-legend-row input[type="radio"]');
                    var exName = exRadio ? exRadio.name : 'ESSA_leg';
                    while (legRows.querySelectorAll('.omr-essa-legend-row').length < options.length) {
                        var lr = tpl(root, '.omr-essa-legend-tpl');
                        lr.querySelector('input[type="radio"]').name = exName;
                        legRows.appendChild(lr);
                    }
                    window.ValueTypeInput.init(ansBlk);
                    var picked = ansNode.allowed_answer.length ? ansNode.allowed_answer[0].value : null;
                    var pickedDone = false;
                    legRows.querySelectorAll('.omr-essa-legend-row').forEach(function (row, idx) {
                        var o = options[idx] || {};
                        window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                        var radio = row.querySelector('input[type="radio"]');
                        var hit = picked != null && !pickedDone && o.value === picked;
                        radio.checked = hit;
                        if (hit) pickedDone = true;
                    });
                    syncLegendDel(ansBlk);
                }

                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        document.addEventListener('change', function (e) {
            var sel = e.target.closest('.omr-essa-mode');
            if (sel) applyMode(sel.closest('.omr-essa-block'));
        });

        document.addEventListener('click', function (e) {
            var box = e.target.closest('.omr-essa');
            if (!box) return;
            var t;

            if ((t = e.target.closest('.omr-essa-swap-btn'))) {
                var wrap = box.querySelector('.omr-essa-blocks');
                var blks = wrap.querySelectorAll('.omr-essa-block');
                var swap = wrap.querySelector('.omr-essa-swap');
                if (blks.length === 2) { // DOM 이동(값 셀 init 가드로 값 보존). 스왑 후 구분선 가운데 재배치
                    wrap.insertBefore(blks[1], blks[0]);
                    if (swap) wrap.insertBefore(swap, blks[0]);
                    if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                }
                return;
            }
            if ((t = e.target.closest('.omr-essa-sim-add'))) {
                var simRow = tpl(box, '.omr-essa-sim-tpl');
                t.closest('.omr-essa-box').querySelector('.omr-essa-sim-rows').appendChild(simRow);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-essa-sim-del'))) {
                t.closest('.omr-essa-sim-row').remove(); // 0개 허용
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-essa-legend-add'))) {
                var blk = t.closest('.omr-essa-block');
                var row = tpl(box, '.omr-essa-legend-tpl');
                var ex = blk.querySelector('.omr-essa-legend-row input[type="radio"]');
                if (ex) row.querySelector('input[type="radio"]').name = ex.name;
                row.querySelector('input[type="radio"]').checked = false;
                blk.querySelector('.omr-essa-legend-rows').appendChild(row);
                syncLegendDel(blk);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-essa-legend-del'))) {
                var blk2 = t.closest('.omr-essa-block');
                if (blk2.querySelectorAll('.omr-essa-legend-row').length <= 1) return;
                t.closest('.omr-essa-legend-row').remove(); syncLegendDel(blk2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
        });

        document.querySelectorAll('.omr-essa').forEach(function (box) {
            blocks(box).forEach(function (b) { applyMode(b); syncLegendDel(b); });
        });
    })();
    

    (function () {
        if (window.__omrEsmaBound) return;
        window.__omrEsmaBound = true;

        var uid = 0;

        function sets(box) { return box.querySelectorAll('.omr-esma-set'); }
        function anses(setEl) { return setEl.querySelectorAll('.omr-esma-ans'); }

        function syncSetDel(box) {
            var n = sets(box).length;
            box.querySelectorAll('.omr-esma-set-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncAnsDel(setEl) {
            var n = anses(setEl).length;
            setEl.querySelectorAll('.omr-esma-ans-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function syncLegendDel(ansEl) {
            var n = ansEl.querySelectorAll('.omr-esma-legend-row').length;
            ansEl.querySelectorAll('.omr-esma-legend-del').forEach(function (b) { b.disabled = n <= 1; });
        }
        function applyMode(ansEl) {
            var legend = ansEl.querySelector('.omr-esma-mode').value === 'legend';
            ansEl.querySelector('.omr-esma-box').classList.toggle('d-none', legend);
            ansEl.querySelector('.omr-esma-legend').classList.toggle('d-none', !legend);
        }
        function freshLegend(ansEl) {
            var name = 'ESMA_leg_' + (++uid);
            ansEl.querySelectorAll('.omr-esma-legend-row input[type="radio"]').forEach(function (r) { r.name = name; r.checked = false; });
        }
        function tpl(box, sel) { return box.querySelector(sel).content.firstElementChild.cloneNode(true); }

        // 직렬화기(자족) — 2블록을 블록 순서(스왑 반영)로 ORDERED 결합, 서술 블록=COMMENT/MANUAL, 정답 블록(SBMANM 중첩)=정답SET별 평면필드 + 정답 트리
        window.omrSerializers = window.omrSerializers || {};
        function readAllowed(row) {
            var v = window.ValueTypeInput.getValue(row.querySelector('.vt-cell')); // {value, value_type}
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            var cs = checks[0] ? checks[0].checked : false;
            var ss = checks[1] ? checks[1].checked : false;
            return window.OmrJson.allowed(v.value, v.value_type, cs, ss);
        }
        function ansValue(ansEl) {
            if (ansEl.querySelector('.omr-esma-mode').value !== 'legend') {
                var allowed = [readAllowed(ansEl.querySelector('.omr-esma-answer-row'))];
                ansEl.querySelectorAll('.omr-esma-sim-row').forEach(function (r) { allowed.push(readAllowed(r)); });
                return window.OmrJson.value(allowed);
            }
            var picked = null;
            ansEl.querySelectorAll('.omr-esma-legend-row').forEach(function (r) {
                if (r.querySelector('input[type="radio"]').checked) picked = window.ValueTypeInput.getValue(r.querySelector('.vt-cell')); // {value, value_type}
            });
            return window.OmrJson.value(picked == null ? [] : [window.OmrJson.allowed(picked.value, picked.value_type, false, false)]);
        }
        function ansFieldObj(ansEl, delimiter) {
            var legend = ansEl.querySelector('.omr-esma-mode').value === 'legend';
            var pre = window.ValueTypeInput.getValue(ansEl.querySelector('.omr-esma-pre .vt-cell'));   // {value, value_type}
            var post = window.ValueTypeInput.getValue(ansEl.querySelector('.omr-esma-post .vt-cell'));
            var field = { type: legend ? 'SELECT' : 'TEXT' };
            if (pre.value) field.pre_text = { value: pre.value, value_type: pre.value_type };
            if (post.value) field.post_text = { value: post.value, value_type: post.value_type };
            if (delimiter) field.delimiter = delimiter;
            if (legend) {
                var options = [];
                ansEl.querySelectorAll('.omr-esma-legend-row').forEach(function (r) {
                    var v = window.ValueTypeInput.getValue(r.querySelector('.vt-cell')); // {value, value_type}
                    options.push({ value: v.value, value_type: v.value_type });
                });
                field.options = options;
            }
            return field;
        }
        // 정답 블록(SBMANM 중첩) → {fields, node}
        function serializeAnswerBlock(blk) {
            var fields = [], setNodes = [];
            blk.querySelectorAll('.omr-esma-sets > .omr-esma-set').forEach(function (setEl) {
                var setChk = setEl.querySelector('.omr-esma-set-ordered');
                var ordered = setChk ? setChk.checked : false;
                var ansNodes = [];
                setEl.querySelectorAll('.omr-esma-ans').forEach(function (ansEl) {
                    var delChk = ansEl.querySelector('.omr-esma-ans-delimiter');
                    var delimiter = (delChk && delChk.checked) ? ',' : '';
                    ansNodes.push(ansValue(ansEl));
                    fields.push(ansFieldObj(ansEl, delimiter));
                });
                setNodes.push(ordered ? window.OmrJson.ordered(ansNodes) : window.OmrJson.unordered(ansNodes));
            });
            var topChk = blk.querySelector('.omr-esma-top-ordered');
            var topOrdered = topChk ? topChk.checked : false;
            // 단일 SET도 항상 감쌈(순서고정 체크 상태 보존, 특수처리 없음)
            var node = topOrdered ? window.OmrJson.ordered(setNodes) : window.OmrJson.unordered(setNodes);
            return { fields: fields, node: node };
        }
        function setAffix(cell, affix) { // 앞/뒤 수식어 복원
            if (cell && affix && typeof affix === 'object') {
                window.ValueTypeInput.setValue(cell, { value: affix.value, value_type: affix.value_type });
            }
        }
        function fillAllowedRow(row, allowed) { // 정답/유사정답 행: 값 셀 + 대소/공백 체크 복원
            if (!row || !allowed) return;
            window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: allowed.value, value_type: allowed.value_type });
            var checks = row.querySelectorAll('input[type="checkbox"]'); // [0]=대소구분, [1]=공백구분
            if (checks[0]) checks[0].checked = !!allowed.case_sensitive;
            if (checks[1]) checks[1].checked = !!allowed.space_sensitive;
        }
        window.omrSerializers.ESMA00 = {
            serialize: function (root) {
                var omr = [], nodes = [];
                root.querySelectorAll('.omr-esma-blocks > .omr-esma-block').forEach(function (blk) {
                    var title = blk.querySelector('.omr-esma-title-input').value.trim();
                    if (blk.querySelector('.omr-esma-sets')) { // 정답 블록(SBMANM 중첩)
                        var res = serializeAnswerBlock(blk);
                        if (title && res.fields.length) res.fields[0].title = title; // 블록 타이틀=첫 정답SET 필드 title
                        omr = omr.concat(res.fields);
                        nodes.push(res.node);
                    } else { // 서술 블록 = 수동 채점
                        var fc = { type: 'COMMENT' };
                        if (title) fc.title = title;
                        omr.push(fc);
                        nodes.push(window.OmrJson.manual());
                    }
                });
                return { omr: omr, answer: nodes.length === 1 ? nodes[0] : window.OmrJson.ordered(nodes) };
            },
            // 유효성 검사 — 정답 블록만 SBMANM 규칙(정답 SET 마다 지금 모드). 블록 순서에 따라 정답 필드 시작 위치가 갈림(풀이가 앞이면 1). 풀이 블록 · 블록 타이틀은 안 봄
            validate: function (out) {
                var descFirst = out.answer.nodes[0].rule_type === 'MANUAL';
                var tree = out.answer.nodes[descFirst ? 1 : 0], fi = descFirst ? 1 : 0;
                for (var s = 0; s < tree.nodes.length; s++) {
                    var ansNodes = tree.nodes[s].nodes;
                    for (var a = 0; a < ansNodes.length; a++, fi++) {
                        var msg = window.OmrValidate.field(out.omr[fi], ansNodes[a]);
                        if (msg) return (s + 1) + '번 OMR SET · ' + (a + 1) + '번 정답 SET · ' + msg;
                    }
                }
                return null;
            },
            // serialize 역방향. 블록 2개(서술 COMMENT + 정답 SBMANM중첩). nodes 의 MANUAL/트리로 판정, flat fields 를 블록별 분배.
            hydrate: function (root, data) {
                var omr = data && data.omr, answer = data && data.answer;
                if (!Array.isArray(omr) || !omr.length) return false;
                if (!answer || answer.rule_type !== 'ORDERED' || !Array.isArray(answer.nodes) || answer.nodes.length !== 2) return false;
                var nodes = answer.nodes;
                // 정확히 하나 MANUAL(서술) + 하나 트리(정답)
                var descNodeIdx = -1, ansNodeIdx = -1;
                for (var n = 0; n < 2; n++) {
                    var nd = nodes[n];
                    if (!nd) return false;
                    if (nd.rule_type === 'MANUAL') descNodeIdx = n;
                    else if (nd.rule_type === 'ORDERED' || nd.rule_type === 'UNORDERED') ansNodeIdx = n;
                }
                if (descNodeIdx < 0 || ansNodeIdx < 0) return false;
                var descFirst = descNodeIdx === 0;

                // 정답 트리 검사 + flat VALUE 총수
                var ansTree = nodes[ansNodeIdx], setNodes = ansTree.nodes;
                if (!Array.isArray(setNodes) || !setNodes.length) return false;
                var flatCount = 0;
                for (var s = 0; s < setNodes.length; s++) {
                    var sn = setNodes[s];
                    if (!sn || (sn.rule_type !== 'ORDERED' && sn.rule_type !== 'UNORDERED') || !Array.isArray(sn.nodes) || !sn.nodes.length) return false;
                    for (var a = 0; a < sn.nodes.length; a++) { if (!sn.nodes[a] || sn.nodes[a].rule_type !== 'VALUE') return false; }
                    flatCount += sn.nodes.length;
                }
                if (omr.length !== 1 + flatCount) return false; // COMMENT 1 + 정답 flat

                // omr 분배(블록 순서대로)
                var descField, ansFields;
                if (descFirst) { descField = omr[0]; ansFields = omr.slice(1); }
                else { ansFields = omr.slice(0, flatCount); descField = omr[flatCount]; }
                if (!descField || descField.type !== 'COMMENT') return false;
                for (var f = 0; f < ansFields.length; f++) {
                    if (!ansFields[f] || (ansFields[f].type !== 'TEXT' && ansFields[f].type !== 'SELECT')) return false;
                }

                // 블록 판정(sets 없음=서술 / 있음=정답)
                var wrap = root.querySelector('.omr-esma-blocks');
                var descBlk = null, ansBlk = null;
                wrap.querySelectorAll('.omr-esma-block').forEach(function (b) {
                    if (b.querySelector('.omr-esma-sets')) ansBlk = b; else descBlk = b;
                });
                if (!descBlk || !ansBlk) return false;

                // --- 검사 통과, DOM 조작 ---
                var swap = wrap.querySelector('.omr-esma-swap');
                var firstBlk = descFirst ? descBlk : ansBlk, secondBlk = descFirst ? ansBlk : descBlk;
                wrap.appendChild(firstBlk);
                if (swap) wrap.appendChild(swap);
                wrap.appendChild(secondBlk);

                var dTitle = descBlk.querySelector('.omr-esma-title-input');
                if (dTitle) dTitle.value = descField.title || '';
                var aTitle = ansBlk.querySelector('.omr-esma-title-input');
                if (aTitle) aTitle.value = (ansFields[0] && ansFields[0].title) || ''; // 블록 타이틀=첫 필드 title
                var topChk = ansBlk.querySelector('.omr-esma-top-ordered');
                if (topChk) topChk.checked = ansTree.rule_type === 'ORDERED';

                // OMR SET 개수 맞춤
                var setsBox = ansBlk.querySelector('.omr-esma-sets');
                var curSet = setsBox.querySelectorAll(':scope > .omr-esma-set');
                for (var i = curSet.length - 1; i >= setNodes.length; i--) curSet[i].remove();
                while (setsBox.querySelectorAll(':scope > .omr-esma-set').length < setNodes.length) {
                    setsBox.appendChild(tpl(root, '.omr-esma-set-tpl'));
                }
                // 각 SET: 정답 SET 개수 맞춤
                var setEls = setsBox.querySelectorAll(':scope > .omr-esma-set');
                setEls.forEach(function (setEl, si) {
                    var sn2 = setNodes[si];
                    var setChk = setEl.querySelector('.omr-esma-set-ordered');
                    if (setChk) setChk.checked = sn2.rule_type === 'ORDERED';
                    var ansList = setEl.querySelector('.omr-esma-ans-list');
                    var curAns = ansList.querySelectorAll('.omr-esma-ans');
                    for (var j = curAns.length - 1; j >= sn2.nodes.length; j--) curAns[j].remove();
                    while (ansList.querySelectorAll('.omr-esma-ans').length < sn2.nodes.length) {
                        var ansEl0 = tpl(root, '.omr-esma-ans-tpl');
                        freshLegend(ansEl0);
                        ansList.appendChild(ansEl0);
                    }
                });

                window.ValueTypeInput.init(root); // 전체 값 셀 선점

                // 값 채움(flat 순서로 정답 field 소비)
                var fi = 0;
                setEls.forEach(function (setEl, si) {
                    var sn3 = setNodes[si];
                    setEl.querySelectorAll('.omr-esma-ans').forEach(function (ansEl, ai) {
                        var field = ansFields[fi], ansNode = sn3.nodes[ai];
                        fi++;
                        var legend = field.type === 'SELECT';
                        var mode = ansEl.querySelector('.omr-esma-mode');
                        if (mode) mode.value = legend ? 'legend' : 'box';
                        applyMode(ansEl);
                        var delChk = ansEl.querySelector('.omr-esma-ans-delimiter');
                        if (delChk) delChk.checked = field.delimiter === ',';
                        setAffix(ansEl.querySelector('.omr-esma-pre .vt-cell'), field.pre_text);
                        setAffix(ansEl.querySelector('.omr-esma-post .vt-cell'), field.post_text);
                        if (!legend) {
                            var allowed = Array.isArray(ansNode.allowed_answer) ? ansNode.allowed_answer : [];
                            fillAllowedRow(ansEl.querySelector('.omr-esma-answer-row'), allowed[0]);
                            var simBox = ansEl.querySelector('.omr-esma-sim-rows');
                            for (var y = 1; y < allowed.length; y++) {
                                var simRow = tpl(root, '.omr-esma-sim-tpl');
                                simBox.appendChild(simRow);
                                window.ValueTypeInput.init(simRow);
                                fillAllowedRow(simRow, allowed[y]);
                            }
                        } else {
                            var options = Array.isArray(field.options) ? field.options : [];
                            var legRows = ansEl.querySelector('.omr-esma-legend-rows');
                            var exRadio = legRows.querySelector('.omr-esma-legend-row input[type="radio"]');
                            var exName = exRadio ? exRadio.name : ('ESMA_leg_' + (++uid));
                            var curL = legRows.querySelectorAll('.omr-esma-legend-row');
                            for (var z = curL.length - 1; z >= options.length; z--) curL[z].remove();
                            while (legRows.querySelectorAll('.omr-esma-legend-row').length < options.length) {
                                var lr = tpl(root, '.omr-esma-legend-tpl');
                                lr.querySelector('input[type="radio"]').name = exName;
                                legRows.appendChild(lr);
                            }
                            window.ValueTypeInput.init(ansEl);
                            var picked = (Array.isArray(ansNode.allowed_answer) && ansNode.allowed_answer.length) ? ansNode.allowed_answer[0].value : null;
                            var pickedDone = false;
                            legRows.querySelectorAll('.omr-esma-legend-row').forEach(function (row, li) {
                                var o = options[li] || {};
                                window.ValueTypeInput.setValue(row.querySelector('.vt-cell'), { value: o.value, value_type: o.value_type });
                                var radio = row.querySelector('input[type="radio"]');
                                var hit = picked != null && !pickedDone && o.value === picked;
                                radio.checked = hit;
                                if (hit) pickedDone = true;
                            });
                            syncLegendDel(ansEl);
                        }
                    });
                    syncAnsDel(setEl);
                });

                syncSetDel(root);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(root);
                return true;
            }
        };

        document.addEventListener('change', function (e) {
            var sel = e.target.closest('.omr-esma-mode');
            if (sel) applyMode(sel.closest('.omr-esma-ans'));
        });

        document.addEventListener('click', function (e) {
            var box = e.target.closest('.omr-esma');
            if (!box) return;
            var t;

            if ((t = e.target.closest('.omr-esma-swap-btn'))) {
                var wrap = box.querySelector('.omr-esma-blocks');
                var blks = wrap.querySelectorAll('.omr-esma-block');
                var swap = wrap.querySelector('.omr-esma-swap');
                if (blks.length === 2) { // DOM 이동(값 셀 init 가드로 값 보존). 스왑 후 구분선 가운데 재배치
                    wrap.insertBefore(blks[1], blks[0]);
                    if (swap) wrap.insertBefore(swap, blks[0]);
                    if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                }
                return;
            }
            if ((t = e.target.closest('.omr-esma-set-add'))) {
                var setEl = tpl(box, '.omr-esma-set-tpl');
                var ansEl = tpl(box, '.omr-esma-ans-tpl');
                freshLegend(ansEl);
                setEl.querySelector('.omr-esma-ans-list').appendChild(ansEl);
                box.querySelector('.omr-esma-sets').appendChild(setEl);
                syncSetDel(box); syncAnsDel(setEl); syncLegendDel(ansEl); applyMode(ansEl);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-set-del'))) {
                if (sets(box).length <= 1) return;
                t.closest('.omr-esma-set').remove(); syncSetDel(box);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-ans-add'))) {
                var set2 = t.closest('.omr-esma-set');
                var ans2 = tpl(box, '.omr-esma-ans-tpl');
                freshLegend(ans2);
                set2.querySelector('.omr-esma-ans-list').appendChild(ans2);
                syncAnsDel(set2); syncLegendDel(ans2); applyMode(ans2);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-ans-del'))) {
                var set3 = t.closest('.omr-esma-set');
                if (anses(set3).length <= 1) return;
                t.closest('.omr-esma-ans').remove(); syncAnsDel(set3);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-sim-add'))) {
                var simRow = tpl(box, '.omr-esma-sim-tpl');
                t.closest('.omr-esma-box').querySelector('.omr-esma-sim-rows').appendChild(simRow);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-sim-del'))) {
                t.closest('.omr-esma-sim-row').remove(); // 0개 허용
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-legend-add'))) {
                var ans4 = t.closest('.omr-esma-ans');
                var row = tpl(box, '.omr-esma-legend-tpl');
                var ex = ans4.querySelector('.omr-esma-legend-row input[type="radio"]');
                if (ex) row.querySelector('input[type="radio"]').name = ex.name;
                row.querySelector('input[type="radio"]').checked = false;
                ans4.querySelector('.omr-esma-legend-rows').appendChild(row);
                syncLegendDel(ans4);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
            if ((t = e.target.closest('.omr-esma-legend-del'))) {
                var ans5 = t.closest('.omr-esma-ans');
                if (ans5.querySelectorAll('.omr-esma-legend-row').length <= 1) return;
                t.closest('.omr-esma-legend-row').remove(); syncLegendDel(ans5);
                if (window.omrMonitorRefresh) window.omrMonitorRefresh(box);
                return;
            }
        });

        document.querySelectorAll('.omr-esma').forEach(function (box) {
            sets(box).forEach(function (s) { syncSetDel(box); syncAnsDel(s); });
            box.querySelectorAll('.omr-esma-ans').forEach(function (a) { syncLegendDel(a); applyMode(a); });
        });
    })();
    