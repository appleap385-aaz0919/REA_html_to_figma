// 문항 필수 검사(공통) — 문항 수정 [전체 반영] · 상세 초안 → 승인 전환이 같은 판정을 씀. 값 모으기 · 알림은 부른 쪽, OMR 규칙은 리프(OmrValidate)
(function () {
    'use strict';
    if (window.ItemValidate) return;

    // 필수 항목(순서 = 수정 화면 탭 순서). 바꾸면 수정 화면 별표 · 이동 자리와 상세 검사 값(ItemApprovalCheckDto)도 같이
    var REQUIRED = [
        { key: 'difficulty', label: '난이도' },
        { key: 'unit', label: '단원코드' },
        { key: 'behavior', label: '행동영역' },
        { key: 'questionType', label: '문항 형태' }
    ];

    // 목록은 개수, 개수는 0 초과, 코드는 빈 문자열 아님
    function filled(value) {
        if (Array.isArray(value)) return value.length > 0;
        return !!value;
    }

    window.ItemValidate = {
        // 비어 있는 필수 항목({key, label}) 목록
        missing: function (values) {
            return REQUIRED.filter(function (f) { return !filled(values[f.key]); });
        },
        message: function (missing) {
            return '필수 항목을 입력해주세요 — ' + missing.map(function (f) { return f.label; }).join(', ');
        }
    };
})();
