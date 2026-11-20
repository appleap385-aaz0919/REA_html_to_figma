/* Preserved value-input/dropdown demo markup and source listeners. */
window.SourceValueDemo={html:()=>'<div id="source-value-demos" class="source-omr">'+"<div class=\"card\">\n<div class=\"card-header bg-secondary-lt\">\n<h3 class=\"card-title mb-0\"><i class=\"ti ti-forms me-1\"></i>value_type 입력 형태 테스트</h3>\n</div>\n<div class=\"card-body\" id=\"vtInputCard\">\n<div class=\"text-secondary mb-3\">실제 전환 컴포넌트 — 앞 라벨은 외부 고정(룰), config(placeholder·allowed) 주입. <span class=\"text-warning\">비허용 타입은 ⋮에서 회색(못 누름)</span>, 전환 시 값 버림.</div>\n<div class=\"row g-2 align-items-center mb-2\">\n<div class=\"col-2 text-secondary\">정답 <span class=\"small text-secondary\">(text·math)</span></div>\n<div class=\"col\">\n<div class=\"vt-cell d-flex align-items-center gap-2\" data-vt-allowed=\"text,math\" data-vt-placeholder=\"정답 입력\" data-vt-type=\"text\">\n<div class=\"vt-input flex-fill\"><div class=\"input-group\"><input class=\"form-control\" placeholder=\"정답 입력\" type=\"text\"/><span class=\"input-group-text\" title=\"일반 텍스트 입력\"><i class=\"ti ti-letter-t\"></i></span></div></div>\n<div class=\"dropdown\">\n<button aria-expanded=\"false\" class=\"btn btn-icon rounded-circle btn-ghost-secondary\" data-bs-toggle=\"dropdown\" title=\"입력 형태 선택\" type=\"button\"><i class=\"ti ti-dots-vertical\"></i></button>\n<div class=\"dropdown-menu dropdown-menu-end\">\n<button class=\"dropdown-item vt-type-opt active\" data-type=\"text\" type=\"button\"><i class=\"ti ti-letter-t me-2\"></i>일반 텍스트</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"math\" type=\"button\"><i class=\"ti ti-math-function me-2\"></i>수식입력기</button>\n<button class=\"dropdown-item vt-type-opt disabled\" data-type=\"image\" disabled=\"\" type=\"button\"><i class=\"ti ti-photo me-2\"></i>이미지 URL</button>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div class=\"row g-2 align-items-center mb-2\">\n<div class=\"col-2 text-secondary\">범례 <span class=\"small text-secondary\">(전체)</span></div>\n<div class=\"col\">\n<div class=\"vt-cell d-flex align-items-center gap-2\" data-vt-allowed=\"text,math,image\" data-vt-placeholder=\"범례 입력\" data-vt-type=\"text\">\n<div class=\"vt-input flex-fill\"><div class=\"input-group\"><input class=\"form-control\" placeholder=\"범례 입력\" type=\"text\"/><span class=\"input-group-text\" title=\"일반 텍스트 입력\"><i class=\"ti ti-letter-t\"></i></span></div></div>\n<div class=\"dropdown\">\n<button aria-expanded=\"false\" class=\"btn btn-icon rounded-circle btn-ghost-secondary\" data-bs-toggle=\"dropdown\" title=\"입력 형태 선택\" type=\"button\"><i class=\"ti ti-dots-vertical\"></i></button>\n<div class=\"dropdown-menu dropdown-menu-end\">\n<button class=\"dropdown-item vt-type-opt active\" data-type=\"text\" type=\"button\"><i class=\"ti ti-letter-t me-2\"></i>일반 텍스트</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"math\" type=\"button\"><i class=\"ti ti-math-function me-2\"></i>수식입력기</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"image\" type=\"button\"><i class=\"ti ti-photo me-2\"></i>이미지 URL</button>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div class=\"row g-2 align-items-center mb-3\">\n<div class=\"col-2 text-secondary\">기호 <span class=\"small text-secondary\">(text만)</span></div>\n<div class=\"col\">\n<div class=\"vt-cell d-flex align-items-center gap-2\" data-vt-allowed=\"text\" data-vt-placeholder=\"기호\" data-vt-type=\"text\">\n<div class=\"vt-input flex-fill\"><div class=\"input-group\"><input class=\"form-control\" placeholder=\"기호\" type=\"text\"/><span class=\"input-group-text\" title=\"일반 텍스트 입력\"><i class=\"ti ti-letter-t\"></i></span></div></div>\n<div class=\"dropdown\">\n<button aria-expanded=\"false\" class=\"btn btn-icon rounded-circle btn-ghost-secondary\" data-bs-toggle=\"dropdown\" title=\"입력 형태 선택\" type=\"button\"><i class=\"ti ti-dots-vertical\"></i></button>\n<div class=\"dropdown-menu dropdown-menu-end\">\n<button class=\"dropdown-item vt-type-opt active\" data-type=\"text\" type=\"button\"><i class=\"ti ti-letter-t me-2\"></i>일반 텍스트</button>\n<button class=\"dropdown-item vt-type-opt disabled\" data-type=\"math\" disabled=\"\" type=\"button\"><i class=\"ti ti-math-function me-2\"></i>수식입력기</button>\n<button class=\"dropdown-item vt-type-opt disabled\" data-type=\"image\" disabled=\"\" type=\"button\"><i class=\"ti ti-photo me-2\"></i>이미지 URL</button>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div>\n<div class=\"text-secondary small mb-1\">getValue (실시간)</div>\n<pre class=\"small border rounded bg-secondary-lt p-2 mb-0\" id=\"vtDumpOut\" style=\"min-height:4rem;\">[\n  {\n    \"value\": \"\",\n    \"value_type\": \"text\"\n  },\n  {\n    \"value\": \"\",\n    \"value_type\": \"text\"\n  },\n  {\n    \"value\": \"\",\n    \"value_type\": \"text\"\n  }\n]</pre>\n</div>\n</div>\n</div><div class=\"card\">\n<div class=\"card-header bg-secondary-lt\">\n<h3 class=\"card-title mb-0\"><i class=\"ti ti-list me-1\"></i>value-type-dropdown 테스트 (select 대체)</h3>\n</div>\n<div class=\"card-body\" id=\"vtdCard\">\n<div class=\"text-secondary mb-3\">위 = 옵션 소스(value-type-input 행, 추가/삭제). 아래 dropdown 이 이를 미러링 — <span class=\"text-body\">text=글자 · math=수식렌더 · image=썸네일</span>. 선택값 = 행 참조(select 와 동일 계약, 소스 값 바뀌면 자동 반영).</div>\n<div id=\"vtdSrcList\">\n<div class=\"vtd-src-row d-flex align-items-center gap-2 mb-2\" data-optid=\"0\">\n<span class=\"text-secondary small vtd-src-label\" style=\"width:2.5rem;\">1</span>\n<div class=\"flex-fill\">\n<div class=\"vt-cell d-flex align-items-center gap-2\" data-vt-allowed=\"text,math,image\" data-vt-placeholder=\"항목 입력\" data-vt-type=\"text\">\n<div class=\"vt-input flex-fill\"><div class=\"input-group\"><input class=\"form-control\" placeholder=\"항목 입력\" type=\"text\"/><span class=\"input-group-text\" title=\"일반 텍스트 입력\"><i class=\"ti ti-letter-t\"></i></span></div></div>\n<div class=\"dropdown\">\n<button aria-expanded=\"false\" class=\"btn btn-icon rounded-circle btn-ghost-secondary\" data-bs-toggle=\"dropdown\" title=\"입력 형태 선택\" type=\"button\"><i class=\"ti ti-dots-vertical\"></i></button>\n<div class=\"dropdown-menu dropdown-menu-end\">\n<button class=\"dropdown-item vt-type-opt active\" data-type=\"text\" type=\"button\"><i class=\"ti ti-letter-t me-2\"></i>일반 텍스트</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"math\" type=\"button\"><i class=\"ti ti-math-function me-2\"></i>수식입력기</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"image\" type=\"button\"><i class=\"ti ti-photo me-2\"></i>이미지 URL</button>\n</div>\n</div>\n</div>\n</div>\n<button class=\"btn btn-sm btn-outline-danger vtd-src-del\" type=\"button\">삭제</button>\n</div>\n<div class=\"vtd-src-row d-flex align-items-center gap-2 mb-2\" data-optid=\"1\">\n<span class=\"text-secondary small vtd-src-label\" style=\"width:2.5rem;\">2</span>\n<div class=\"flex-fill\">\n<div class=\"vt-cell d-flex align-items-center gap-2\" data-vt-allowed=\"text,math,image\" data-vt-placeholder=\"항목 입력\" data-vt-type=\"text\">\n<div class=\"vt-input flex-fill\"><div class=\"input-group\"><input class=\"form-control\" placeholder=\"항목 입력\" type=\"text\"/><span class=\"input-group-text\" title=\"일반 텍스트 입력\"><i class=\"ti ti-letter-t\"></i></span></div></div>\n<div class=\"dropdown\">\n<button aria-expanded=\"false\" class=\"btn btn-icon rounded-circle btn-ghost-secondary\" data-bs-toggle=\"dropdown\" title=\"입력 형태 선택\" type=\"button\"><i class=\"ti ti-dots-vertical\"></i></button>\n<div class=\"dropdown-menu dropdown-menu-end\">\n<button class=\"dropdown-item vt-type-opt active\" data-type=\"text\" type=\"button\"><i class=\"ti ti-letter-t me-2\"></i>일반 텍스트</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"math\" type=\"button\"><i class=\"ti ti-math-function me-2\"></i>수식입력기</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"image\" type=\"button\"><i class=\"ti ti-photo me-2\"></i>이미지 URL</button>\n</div>\n</div>\n</div>\n</div>\n<button class=\"btn btn-sm btn-outline-danger vtd-src-del\" type=\"button\">삭제</button>\n</div>\n</div>\n<button class=\"btn btn-sm\" id=\"vtdRowAdd\" type=\"button\"><i class=\"ti ti-plus me-1\"></i>항목 추가</button>\n<template id=\"vtdRowTpl\">\n<div class=\"vtd-src-row d-flex align-items-center gap-2 mb-2\">\n<span class=\"text-secondary small vtd-src-label\" style=\"width:2.5rem;\"></span>\n<div class=\"flex-fill\">\n<div class=\"vt-cell d-flex align-items-center gap-2\" data-vt-allowed=\"text,math,image\" data-vt-placeholder=\"항목 입력\" data-vt-type=\"text\">\n<div class=\"vt-input flex-fill\"></div>\n<div class=\"dropdown\">\n<button aria-expanded=\"false\" class=\"btn btn-icon rounded-circle btn-ghost-secondary\" data-bs-toggle=\"dropdown\" title=\"입력 형태 선택\" type=\"button\"><i class=\"ti ti-dots-vertical\"></i></button>\n<div class=\"dropdown-menu dropdown-menu-end\">\n<button class=\"dropdown-item vt-type-opt\" data-type=\"text\" type=\"button\"><i class=\"ti ti-letter-t me-2\"></i>일반 텍스트</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"math\" type=\"button\"><i class=\"ti ti-math-function me-2\"></i>수식입력기</button>\n<button class=\"dropdown-item vt-type-opt\" data-type=\"image\" type=\"button\"><i class=\"ti ti-photo me-2\"></i>이미지 URL</button>\n</div>\n</div>\n</div>\n</div>\n<button class=\"btn btn-sm btn-outline-danger vtd-src-del\" type=\"button\">삭제</button>\n</div>\n</template>\n<hr class=\"my-4\"/>\n<div class=\"row g-2 align-items-center mb-2\">\n<div class=\"col-3 text-secondary\">연결 A</div>\n<div class=\"col\"><div class=\"vtd-cell dropdown\" data-vtd-value=\"0\">\n<button aria-expanded=\"false\" class=\"btn btn-outline-secondary w-100 text-start d-flex align-items-center dropdown-toggle vtd-toggle\" data-bs-toggle=\"dropdown\" type=\"button\">\n<span class=\"vtd-current flex-fill text-secondary\"><span class=\"text-secondary\">(빈 값)</span></span>\n</button>\n<div class=\"dropdown-menu w-100 vtd-menu\"><button class=\"dropdown-item vtd-opt active\" data-value=\"0\" type=\"button\"><span class=\"text-secondary\">(빈 값)</span></button><button class=\"dropdown-item vtd-opt\" data-value=\"1\" type=\"button\"><span class=\"text-secondary\">(빈 값)</span></button></div>\n</div></div>\n</div>\n<div class=\"row g-2 align-items-center mb-3\">\n<div class=\"col-3 text-secondary\">연결 B</div>\n<div class=\"col\"><div class=\"vtd-cell dropdown\" data-vtd-value=\"0\">\n<button aria-expanded=\"false\" class=\"btn btn-outline-secondary w-100 text-start d-flex align-items-center dropdown-toggle vtd-toggle\" data-bs-toggle=\"dropdown\" type=\"button\">\n<span class=\"vtd-current flex-fill text-secondary\"><span class=\"text-secondary\">(빈 값)</span></span>\n</button>\n<div class=\"dropdown-menu w-100 vtd-menu\"><button class=\"dropdown-item vtd-opt active\" data-value=\"0\" type=\"button\"><span class=\"text-secondary\">(빈 값)</span></button><button class=\"dropdown-item vtd-opt\" data-value=\"1\" type=\"button\"><span class=\"text-secondary\">(빈 값)</span></button></div>\n</div></div>\n</div>\n<div>\n<div class=\"text-secondary small mb-1\">getValue (실시간) — 선택 value(참조) + 해석값</div>\n<pre class=\"small border rounded bg-secondary-lt p-2 mb-0\" id=\"vtdDumpOut\" style=\"min-height:4rem;\">[\n  {\n    \"dd\": 0,\n    \"value\": \"0\",\n    \"resolved\": {\n      \"value\": \"\",\n      \"value_type\": \"text\"\n    }\n  },\n  {\n    \"dd\": 1,\n    \"value\": \"0\",\n    \"resolved\": {\n      \"value\": \"\",\n      \"value_type\": \"text\"\n    }\n  }\n]</pre>\n</div>\n</div>\n</div>"+ '</div>',mount(){
const root=document.getElementById('source-value-demos');if(!root||root._mounted)return;root._mounted=true;ValueTypeInput.init(root);ValueTypeDropdown.init(root);
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
        root.addEventListener('vt:change', vtRefresh); // 전환 + 입력(값 셀 자체 이벤트)
        vtRefresh();

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
            rebuild();
        })();
}};
(()=>{const old=CMS.afterRender;CMS.afterRender=parts=>{old?.(parts);SourceValueDemo.mount();};})();
