// 이 Tabler 빌드는 Bootstrap JS 를 window.tabler.bootstrap 에만 노출(전역 bootstrap 없음) — 표준 이름으로 되살려 window.bootstrap.Modal 을 그대로 쓰게 함
window.bootstrap = window.bootstrap || (window.tabler && window.tabler.bootstrap);

// 뒤로·앞으로는 저장해 둔 화면 대신 그 주소를 다시 읽는다 - 스냅샷은 JS 가 채운 값(날짜 칸 등)과 요소에 붙인 리스너를 잃어, 주소로 다시 그려야 검색 당시 상태가 돌아온다
htmx.config.historyCacheSize = 0;
htmx.config.refreshOnHistoryMiss = true;

// 새 탭으로 여는 클릭(보조키·가운데 버튼)은 이동이 아니다 - 현재 화면이 그대로 남으니 이탈 확인·로딩 오버레이 같은 가로채기를 모두 건너뛴다
function isNewTabClick(e) {
    return e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0;
}

document.addEventListener('DOMContentLoaded', () => {
    applyCheckAll(document);
    document.querySelectorAll('[data-date-range]').forEach(initDateRange);
    initCodeCascade();
    initFlashToast();
    initMovedToast();
    initSidebarToggle();
    initThemeToggle();
});

// 서버 HX-Trigger 신호 — 화면 유지한 채 즉시 토스트
document.body.addEventListener('showToast', e => showToast(e.detail.message, e.detail.variant));

// Σ 버튼 — 같은 input-group 형제 값을 수식입력기(MathFieldDialog)로 편집해 LaTeX 삽입
// .omr-sigma = OMR 편집의 텍스트 칸, .vt-math-open = 값 형태 셀(value-type-input)의 수식 칸(math-field)
document.addEventListener('click', e => {
    const sigma = e.target.closest('.omr-sigma, .vt-math-open');
    // Σ 는 span 이라 잠긴 fieldset 이 못 막아 직접 거름
    if (!sigma || sigma.closest('fieldset[disabled]')) return;
    const group = sigma.closest('.input-group');
    const input = group ? group.querySelector('math-field, .form-control') : null;
    if (!input) return;
    if (!window.MathFieldDialog) {
        showToast('수식 입력기를 불러오지 못했습니다.', 'danger');
        return;
    }
    window.MathFieldDialog.get().open(input.value || '', 'high', latex => {
        input.value = latex;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });
});

// math-field 공백 키 — MathLive 가상 키보드는 쓰지 않는다(키패드는 수식입력기 창 안에 있음)
document.addEventListener('focusin', e => {
    const mf = e.target.closest && e.target.closest('math-field');
    if (!mf) return;
    // [주의] mathModeSpace 는 포커스 시점에 프로퍼티로 대입(MathLive 0.110, attribute·생성 시점은 무시 — 기본 빈 문자열이면 스페이스가 moveAfterParent)
    if (window.MathConfig) mf.mathModeSpace = window.MathConfig.spaceLatex;
});

// 사이드바 햄버거 — 992px 이상 접기(Tabler data-bs-sidebar=folded, localStorage('sidebar') 로 기억 · 렌더 전 적용은 layout 의 head), 미만 메뉴 열닫. [주의] data-bs-toggle 미사용(큰 화면에서 collapse 가 같이 돌아 깜빡임), aria-expanded 는 작은 화면만 갱신
function initSidebarToggle() {
    const btn = document.getElementById('sidebarToggle');
    const menu = document.getElementById('sidebar-menu');
    if (!btn || !menu) return;

    const wide = window.matchMedia('(min-width: 992px)');
    const isFolded = () => document.documentElement.hasAttribute('data-bs-sidebar');
    const savedFolded = () => { try { return localStorage.getItem('sidebar') === 'folded'; } catch (e) { return false; } };

    btn.addEventListener('click', () => {
        if (wide.matches) {
            const folded = !isFolded();
            setSidebarFolded(menu, folded);
            try { localStorage.setItem('sidebar', folded ? 'folded' : 'default'); } catch (e) { /* 저장 실패는 무시(이번 화면만) */ }
            return;
        }
        const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
        const expanded = !menu.classList.contains('show');
        expanded ? collapse.show() : collapse.hide();
        btn.setAttribute('aria-expanded', String(expanded));
    });

    // 992px 경계 넘을 때 정리 — 작은 화면에서 연 메뉴(X)는 닫고, 접힘은 큰 화면 전용이라 작아지면 펼치고 커지면 저장값대로
    wide.addEventListener('change', e => {
        menu.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
        setSidebarFolded(menu, e.matches && savedFolded());
    });

    // head 가 접힌 채로 그렸으면 툴팁 · 열린 그룹을 맞춤
    if (isFolded()) setSidebarFolded(menu, true);
    initSidebarFlyoutHover(menu);
}

// 사이드바 그룹 열고 닫기 — 클래스만 바꿈(Dropdown.show() 는 토글에 포커스를 옮겨 테두리가 남음). data-bs-popper 는 Bootstrap 이 열 때 붙이는 것과 같게(Tabler 플라이아웃 위치가 이 속성 기준)
function setSidebarGroupOpen(item, open) {
    const toggle = item.querySelector(':scope > [data-bs-toggle="dropdown"]');
    const dropdownMenu = toggle.nextElementSibling;
    toggle.classList.toggle('show', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!dropdownMenu) return;
    dropdownMenu.classList.toggle('show', open);
    open ? dropdownMenu.setAttribute('data-bs-popper', 'static') : dropdownMenu.removeAttribute('data-bs-popper');
}

// 접기 · 펼치기 — 접을 때 열린 그룹을 닫고(안 닫으면 플라이아웃이 바로 뜸), 펼 때 지금 화면 그룹만 다시 연다. 잎 이름 툴팁은 접힌 동안만
function setSidebarFolded(menu, folded) {
    folded ? document.documentElement.setAttribute('data-bs-sidebar', 'folded') : document.documentElement.removeAttribute('data-bs-sidebar');

    menu.querySelectorAll('.nav-item.dropdown').forEach(item => setSidebarGroupOpen(item, !folded && item.classList.contains('active')));

    menu.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
        if (folded) {
            const title = link.querySelector('.nav-link-title');
            bootstrap.Tooltip.getOrCreateInstance(link, { title: title ? title.textContent : '', placement: 'right', trigger: 'hover' });
        } else {
            bootstrap.Tooltip.getInstance(link)?.dispose();
        }
    });
}

// 접힌 사이드바 플라이아웃 — 마우스를 올리면 열림(지나가는 마우스는 지연으로 거름, 레일과 플라이아웃 사이 틈은 닫힘 지연으로 건넘). 클릭은 열기만 — Bootstrap 토글이면 올려서 연 것을 클릭이 닫음
function initSidebarFlyoutHover(menu) {
    const OPEN_DELAY = 150;
    const CLOSE_DELAY = 250;
    const wide = window.matchMedia('(min-width: 992px)');
    const active = () => wide.matches && document.documentElement.hasAttribute('data-bs-sidebar');
    const groups = [...menu.querySelectorAll('.nav-item.dropdown')];
    let timer = null;

    const openOnly = item => groups.forEach(g => setSidebarGroupOpen(g, g === item));

    groups.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!active()) return;
            clearTimeout(timer);
            timer = setTimeout(() => openOnly(item), OPEN_DELAY);
        });
        item.addEventListener('mouseleave', () => {
            if (!active()) return;
            clearTimeout(timer);
            timer = setTimeout(() => setSidebarGroupOpen(item, false), CLOSE_DELAY);
        });
        item.querySelector(':scope > [data-bs-toggle="dropdown"]').addEventListener('click', e => {
            if (!active()) return;
            e.preventDefault();
            e.stopImmediatePropagation();
            clearTimeout(timer);
            openOnly(item);
        }, true);
    });
}

// 다크모드 토글 — data-bs-theme 속성 + localStorage('theme')로 기억, 아이콘은 다음 클릭 시 될 상태를 보여준다
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const syncIcon = () => {
        icon.className = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    };
    syncIcon();

    btn.addEventListener('click', () => {
        const toDark = document.documentElement.getAttribute('data-bs-theme') !== 'dark';
        // hover 용 transition 이 테마 색 변경에도 걸려 번쩍이는 것 방지 — 전환 찰나만 꺼둔다
        document.documentElement.classList.add('theme-transition-off');
        if (toDark) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-bs-theme');
        }
        try {
            localStorage.setItem('theme', toDark ? 'dark' : 'light');
        } catch (e) {
            // 저장 실패는 무시(새로고침 전까지만 유지)
        }
        syncIcon();
        requestAnimationFrame(() => requestAnimationFrame(() =>
            document.documentElement.classList.remove('theme-transition-off')));
    });
}

// 알림 토스트(상단 중앙 고정). 3초 후·클릭 시 닫히고 스스로 제거, 문구의 \n 은 줄바꿈(pre-line)
function showToast(message, variant = 'success') {
    let container = document.getElementById('appToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'appToastContainer';
        container.className = 'toast-container position-fixed top-0 start-50 translate-middle-x p-3';
        document.body.appendChild(container);
    }
    const icons = { success: 'ti-circle-check text-success', danger: 'ti-alert-triangle text-danger' };

    const el = document.createElement('div');
    el.className = 'toast align-items-center cursor-pointer';
    el.setAttribute('role', 'alert');
    el.innerHTML = `<div class="toast-body d-flex align-items-center">
            <i class="ti ${icons[variant] || icons.success} me-2 fs-3"></i><span style="white-space: pre-line;"></span>
        </div>`;
    el.querySelector('span').textContent = message;
    container.appendChild(el);

    const toast = window.tabler.bootstrap.Toast.getOrCreateInstance(el, { autohide: true, delay: 3000 });
    el.addEventListener('click', () => toast.hide());
    el.addEventListener('hidden.bs.toast', () => el.remove());
    toast.show();
}

// flash 성공 토스트 — 서버가 렌더한 #appToast 문구를 읽어 상단 showToast 로(위치 통합)
function initFlashToast() {
    const toastEl = document.getElementById('appToast');
    if (!toastEl) return;
    const message = toastEl.querySelector('span') ? toastEl.querySelector('span').textContent.trim() : '';
    const wrapper = toastEl.closest('.toast-container');
    if (wrapper) wrapper.remove();
    if (message) showToast(message, 'success');
}

// 화면 이동 후 띄울 토스트 — 보내는 쪽이 담고 착지 화면이 1회 꺼내 씀(fetch 뒤 location 이동 경로엔 서버 flash 가 안 걸려 클라이언트로 운반), 여러 번 담으면 담은 순서대로 모두 띄움
const MOVE_TOAST_KEY = 'appToastAfterMove';

function readMovedToasts() {
    const saved = sessionStorage.getItem(MOVE_TOAST_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [parsed];
}

function toastAfterMove(message, variant = 'success') {
    try {
        const toasts = readMovedToasts();
        toasts.push({ message, variant });
        sessionStorage.setItem(MOVE_TOAST_KEY, JSON.stringify(toasts));
    } catch (e) {
        // 저장 실패는 무시(토스트만 안 보이고 이동은 정상)
    }
}

function initMovedToast() {
    let toasts = [];
    try {
        toasts = readMovedToasts();
        sessionStorage.removeItem(MOVE_TOAST_KEY);
    } catch (e) {
        return;
    }

    toasts.forEach(toast => showToast(toast.message, toast.variant));
}

// needs-validation 폼 — 브라우저 기본 팝업 대신 테두리 + invalid-feedback 으로 표시
document.addEventListener('submit', e => {
    const form = e.target;
    if (!form.classList.contains('needs-validation')) return;
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        showToast('미입력 정보가 있습니다.', 'danger');
    }
    form.classList.add('was-validated');
});

// data-confirm-cancel — 확인 모달 확인 시에만 원래 동작 진행. [주의] capture 단계에서 가로채야 함(인라인 onclick 이 먼저 실행돼 bubble 의 preventDefault 로는 못 막음)
document.addEventListener('click', e => {
    const link = e.target.closest('[data-confirm-cancel]');
    if (!link || link.dataset.confirmSkip || isNewTabClick(e)) return;

    e.preventDefault();
    e.stopPropagation();
    const Modal = window.tabler.bootstrap.Modal;
    const modalEl = document.getElementById('cancelConfirmModal');
    modalEl.querySelector('[data-action-ok]').onclick = () => {
        Modal.getInstance(modalEl).hide();
        link.dataset.confirmSkip = 'true';
        link.click();
        delete link.dataset.confirmSkip;
    };
    Modal.getOrCreateInstance(modalEl).show();
}, true);

// 상단 로그아웃 확인 — 모달 [로그아웃] 시에만 폼 제출(제출 이벤트를 거쳐 로딩 표시)
document.querySelector('#logoutConfirmModal [data-action-ok]')?.addEventListener('click', () => {
    window.tabler.bootstrap.Modal.getInstance(document.getElementById('logoutConfirmModal')).hide();
    document.getElementById('logoutForm').requestSubmit();
});

// 확인·안내 모달이 열리면 [실행]/[확인] 에 포커스(엔터·스페이스가 바로 누름), 꺼진 버튼은 포커스를 못 받아 그대로
document.addEventListener('shown.bs.modal', e => {
    e.target.querySelector('[data-action-ok], [data-alert-ok]')?.focus();
});

// select 옵션 교체. placeholder 옵션은 항상 맨 앞에 유지, data-default-value 가 있으면 그 값을 선택(URL 복원은 이 뒤에 덮어씀)
function populateSelectOptions(select, items, placeholder) {
    select.innerHTML = '';
    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = '';
    placeholderOpt.textContent = placeholder;
    select.appendChild(placeholderOpt);
    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.text;
        select.appendChild(opt);
    });
    if (select.dataset.defaultValue) {
        resetSelect(select);
        select.dispatchEvent(new Event('change'));
    }
}

// select 를 첫 진입 값으로 — data-default-value, 없으면 placeholder(없으면 첫 옵션)
function resetSelect(select) {
    if (select.dataset.defaultValue) {
        select.value = select.dataset.defaultValue;
        return;
    }
    const hasBlank = [...select.options].some(o => o.value === '');
    select.value = hasBlank ? '' : select.options[0].value;
}

// keyFn 기준 첫 값만 남기고 중복 제거(순서 유지)
function distinctBy(arr, keyFn) {
    const seen = new Map();
    arr.forEach(item => {
        const key = keyFn(item);
        if (!seen.has(key)) seen.set(key, item);
    });
    return [...seen.values()];
}

// 공통코드 캐스케이딩(data-code-*) — 옵션은 서버가 전부 렌더하고 JS 는 안 맞는 것만 숨김. 값이 아니라 option 자체로 판정(코드가 부모별로 재사용돼 값 비교는 다른 부모 항목을 유효로 봄)
function refreshCodeChild(child, matchFn) {
    const currentOption = child.selectedOptions[0];
    let anyVisible = false;
    [...child.options].forEach(opt => {
        if (!opt.value) return; // placeholder(전체) 는 항상 유지
        const visible = matchFn(opt);
        opt.hidden = !visible;
        opt.disabled = !visible;
        if (visible) anyVisible = true;
    });
    if (currentOption && !currentOption.hidden) {
        currentOption.selected = true;
    } else {
        child.value = ''; // placeholder 는 하나뿐이라 값으로 집어도 안전
    }
    child.disabled = !anyVisible;
}

// 짝을 찾는 범위는 자기가 속한 [data-filter] 안 — 목록 + 모달처럼 필터가 둘이어도 안 섞인다
function cascadeScope(el) {
    return el.closest('[data-filter]') || document;
}

function initCodeCascade() {
    // A방식(단일 부모, codeinfo 계층) — data-code-parent <-> data-code-child
    document.querySelectorAll('[data-code-parent]').forEach(parent => {
        const group = parent.dataset.codeParent;
        const children = cascadeScope(parent).querySelectorAll(`[data-code-child="${group}"]`);
        const apply = () => {
            const parentValue = parent.value;
            children.forEach(child => {
                refreshCodeChild(child, opt => opt.dataset.codeParentValue === parentValue);
                // 이 자식이 또 다른 부모면(3뎁스 이상) 값이 바뀌었을 수 있으니 손자까지 이어서 갱신
                if (child.dataset.codeParent) child.dispatchEvent(new Event('change'));
            });
        };
        parent.addEventListener('change', apply);
        apply();
    });

    // B방식(다중 부모, subject 복합키) — data-code-multi-child <-> data-code-source 여러 개. 전부 일치(AND)해야 남는다
    document.querySelectorAll('[data-code-multi-child]').forEach(child => {
        const keys = child.dataset.codeMultiChild.split(',');
        const scope = cascadeScope(child);
        const sources = keys.map(k => scope.querySelector(`[data-code-source="${k}"]`));
        const apply = () => {
            const values = sources.map(src => src ? src.value : '');
            const allSelected = values.every(v => v);
            refreshCodeChild(child, opt => allSelected
                && keys.every((k, i) => opt.dataset['code' + k.charAt(0).toUpperCase() + k.slice(1)] === values[i]));
        };
        sources.forEach(src => src && src.addEventListener('change', apply));
        apply();
    });
}

// data-check-all 이 체크된 그룹은 하위를 전부 체크로 맞춤(첫 진입·초기화 공용)
function applyCheckAll(scope) {
    scope.querySelectorAll('[data-check-all]').forEach(el => {
        if (el.checked) {
            scope.querySelectorAll(`[data-check-group="${el.dataset.checkAll}"]`)
                .forEach(cb => cb.checked = true);
        }
    });
}

// data-date-range — 프리셋 버튼 + 달력 통합. 일수는 hidden 으로 URL 왕복, active 는 서버가 렌더
function initDateRange(container) {
    const displayEl = container.querySelector('[data-date-display]'); // 화면 표시용(서버 전송 안 함)
    const startEl = container.querySelector('[data-date-start]');     // 서버 전송용 hidden
    const endEl = container.querySelector('[data-date-end]');         // 서버 전송용 hidden
    const buttons = container.querySelectorAll('[data-date-days]');
    const daysInput = container.querySelector('[data-date-days-input]');
    let applyingPreset = false;

    // litepicker 생성 과정에서 input 이 비워질 수 있어 초기값을 먼저 캡처
    const initialStart = startEl.value;
    const initialEnd = endEl.value;

    const picker = new Litepicker({
        element: displayEl,
        singleMode: false,
        format: 'YYYY-MM-DD',
        lang: 'ko-KR',
        separator: ' ~ '
    });

    const clearActive = () => buttons.forEach(b => b.classList.remove('active'));
    const setDays = v => { if (daysInput) daysInput.value = v; };
    // litepicker 1.x 는 separator 옵션이 안 먹고 기본 구분자로 써넣어 직접 덮어쓴다
    const syncHidden = () => {
        const s = picker.getStartDate();
        const e = picker.getEndDate();
        const sv = s ? s.format('YYYY-MM-DD') : '';
        const ev = e ? e.format('YYYY-MM-DD') : '';
        startEl.value = sv;
        endEl.value = ev;
        displayEl.value = sv && ev ? `${sv} ~ ${ev}` : '';
    };

    // days>0: 오늘부터 n일 전 ~ 오늘 / days<=0(전체): 선택·입력값 모두 비움
    const applyPreset = days => {
        applyingPreset = true;
        if (days > 0) {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - days);
            picker.setDateRange(start, end);
        } else {
            picker.clearSelection();
            displayEl.value = '';
        }
        syncHidden();
        applyingPreset = false;
    };

    // selected 콜백 뒤에 litepicker 가 다시 써넣으므로 표시 덮어쓰기를 한 틱 미룬다
    picker.on('selected', () => {
        if (applyingPreset) return;
        setTimeout(syncHidden, 0);
        clearActive();
        setDays('custom');
    });

    buttons.forEach(btn => btn.addEventListener('click', () => {
        clearActive();
        btn.classList.add('active');
        setDays(btn.dataset.dateDays);
        applyPreset(Number(btn.dataset.dateDays));
    }));

    // 새로고침·뒤로가기 복원 — 서버 초기값을 picker 에 다시 반영
    if (initialStart && initialEnd) {
        applyingPreset = true;
        picker.setDateRange(initialStart, initialEnd);
        applyingPreset = false;
        displayEl.value = `${initialStart} ~ ${initialEnd}`; // 표시 보장(생성 중 비워지거나 파싱 어긋나도 텍스트 유지)
        startEl.value = initialStart;
        endEl.value = initialEnd;
    }

    // 초기화: 전체(data-date-days="0") 상태로 — 입력 비우고 전체 버튼 active + 프리셋값 0.
    container._resetDateRange = () => {
        clearActive();
        const zeroBtn = container.querySelector('[data-date-days="0"]');
        if (zeroBtn) zeroBtn.classList.add('active');
        setDays('0');
        applyPreset(0);
    };
}

document.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset.checkAll) {
        document.querySelectorAll(`[data-check-group="${el.dataset.checkAll}"]`)
            .forEach(cb => cb.checked = el.checked);
    } else if (el.dataset.checkGroup) {
        const group = el.dataset.checkGroup;
        const items = [...document.querySelectorAll(`[data-check-group="${group}"]`)];
        document.querySelector(`[data-check-all="${group}"]`).checked = items.every(cb => cb.checked);
    }
});

// 폼 밖 비GET 요청은 _csrf hidden 이 안 실림 → XSRF-TOKEN 쿠키를 헤더로 부착
document.body.addEventListener('htmx:configRequest', e => {
    if (e.detail.verb && e.detail.verb.toLowerCase() !== 'get') {
        const m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
        if (m) e.detail.headers['X-XSRF-TOKEN'] = decodeURIComponent(m[1]);
    }
});

// 전체선택·기간 전체면 파라미터를 요청에서 뺀다. 결과는 같고 URL 만 깨끗해짐
document.body.addEventListener('htmx:configRequest', e => {
    document.querySelectorAll('[data-check-all]').forEach(all => {
        if (!all.checked) return;
        const items = document.querySelectorAll(`[data-check-group="${all.dataset.checkAll}"]`);
        if (items.length) delete e.detail.parameters[items[0].name];
    });

    document.querySelectorAll('[data-date-range]').forEach(container => {
        const daysInput = container.querySelector('[data-date-days-input]');
        if (!daysInput || (daysInput.value !== '0' && daysInput.value !== '')) return;
        container.querySelectorAll('[data-date-days-input], [data-date-start], [data-date-end]')
            .forEach(el => el.name && delete e.detail.parameters[el.name]);
    });

    // 이번 요청에 실린 필터 영역만 훑음 — 문서 전체면 같은 이름의 남의 빈 칸(목록 + 모달)이 내 조건을 지운다
    const includeSelector = e.detail.elt.closest('[hx-include]')?.getAttribute('hx-include');
    const filterRoots = includeSelector
        ? [...document.querySelectorAll(includeSelector)]
        : [e.detail.elt.closest('[data-filter], [data-unit-filter]')].filter(Boolean);

    filterRoots.forEach(root => {
        // 텍스트는 앞뒤 공백 제거(입력칸·주소·서버 값 일치), 빈 값인 input·select 는 파라미터 자체를 뺀다(서버 <if> 도 어차피 생략)
        root.querySelectorAll('input[type="text"], select').forEach(el => {
            if (!el.name) return;
            if (el.type === 'text' && el.value !== el.value.trim()) {
                el.value = el.value.trim();
                e.detail.parameters[el.name] = el.value;
            }
            if (el.value === '') delete e.detail.parameters[el.name];
        });

        // keywordType 은 빈 옵션이 없어 항상 값이 있음 → keyword 가 비면 같이 뺀다
        const keywordEl = root.querySelector('[name="keyword"]');
        if (keywordEl && keywordEl.value === '') delete e.detail.parameters['keywordType'];
    });
});

// 메뉴 클릭 = 초기 상태 — 그 화면의 UI 상태 세션('{경로}::*')만 지움(드롭다운 펼침 href="#" 은 제외)
document.addEventListener('click', e => {
    const menu = document.getElementById('sidebar-menu');
    const link = e.target.closest('a[href]');
    if (!menu || !link || !menu.contains(link)) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    const path = new URL(link.href, location.origin).pathname;
    Object.keys(sessionStorage)
        .filter(k => k.startsWith(path + '::'))
        .forEach(k => sessionStorage.removeItem(k));
});

// data-reset 버튼 클릭 → 같은 data-filter 영역을 첫 진입 상태로 되돌린다.
document.addEventListener('click', e => {
    const btn = e.target.closest('[data-reset]');
    if (btn) resetFilter(btn.closest('[data-filter]') || document);
});

function resetFilter(scope) {
    scope.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.matches('[data-date-display], [data-date-start], [data-date-end]')) return; // 날짜는 picker 가 처리
        if (el.type === 'checkbox' || el.type === 'radio') {
            // 첫 진입 = 전체 체크. 서버가 렌더한 defaultChecked 는 검색결과를 반영해 신뢰할 수 없다
            el.checked = el.matches('[data-check-all], [data-check-group]') ? true : el.defaultChecked;
        } else if (el.tagName === 'SELECT') {
            // defaultSelected 도 같은 이유로 신뢰 불가 → data-default-value 또는 placeholder 로 강제
            resetSelect(el);
        } else {
            el.value = '';
        }
    });
    applyCheckAll(scope);
    scope.querySelectorAll('[data-date-range]').forEach(c => c._resetDateRange && c._resetDateRange());
    // 부모·소스 값이 초기화됐으니 change 로 자식 표시·비활성 상태를 다시 계산
    scope.querySelectorAll('[data-code-parent], [data-code-source]').forEach(el => el.dispatchEvent(new Event('change')));
}

// 로딩 오버레이 — htmx 요청 중 200ms 뒤에만 표시(짧은 요청의 딤 깜빡임 방지), 참조 카운트로 동시·연속 요청이 서로의 타이머를 취소하는 것을 막음
let loadingCount = 0;
let loadingTimer = null;
function showLoadingOverlay() {
    loadingCount++;
    if (loadingTimer === null) {
        loadingTimer = setTimeout(() => document.getElementById('loadingOverlay').classList.add('is-active'), 200);
    }
}
function hideLoadingOverlay() {
    if (loadingCount > 0) loadingCount--;
    if (loadingCount === 0) forceHideLoadingOverlay();
}
// 카운트와 무관하게 무조건 꺼야 하는 경로용(전체 이동·히스토리 복원)
function forceHideLoadingOverlay() {
    loadingCount = 0;
    clearTimeout(loadingTimer);
    loadingTimer = null;
    
    if (document.getElementById('loadingOverlay')) {
        document.getElementById('loadingOverlay').classList.remove('is-active');
    }    
}
document.body.addEventListener('htmx:beforeRequest', showLoadingOverlay);
document.body.addEventListener('htmx:afterRequest', hideLoadingOverlay);

// 프리사인 URL 로 파일 PUT — 발급받은 Content-Type 을 그대로 실어야 서명이 맞고, htmx 밖(브라우저→S3 직결)이라 로딩·에러 처리는 호출부
function putToPresigned(file, uploadUrl, contentType) {
    return fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file
    }).then(res => {
        if (!res.ok) throw new Error('presigned PUT ' + res.status);
    });
}

// data-download-url 버튼 — 공통 다운로드(/file/download.donga)를 fetch 로 받아 숨은 링크 클릭으로 저장. 새 탭 없이 실패는 토스트, 세션 만료는 로그인 화면
const DOWNLOAD_FAIL_MESSAGE = '파일을 받지 못했습니다. 잠시 후 다시 시도해 주세요.';

document.addEventListener('click', e => {
    const btn = e.target.closest('[data-download-url]');
    if (!btn) return;
    e.preventDefault();
    downloadFile(btn.dataset.downloadUrl, btn.dataset.downloadName);
});

function downloadFile(url, name) {
    const params = new URLSearchParams({ url });
    if (name) params.set('name', name);

    showLoadingOverlay();
    fetch('/file/download.donga?' + params)
        .then(async res => {
            // 세션 만료면 로그인 화면으로 302 → fetch 가 따라가 로그인 HTML 을 받음
            if (res.redirected) {
                location.href = res.url;
                return;
            }
            if (!res.ok) {
                // 문구는 서버가 text/plain 으로 줌, 그 외(500 화면 등)는 공통 문구
                const isText = (res.headers.get('Content-Type') || '').startsWith('text/plain');
                showToast(isText ? await res.text() : DOWNLOAD_FAIL_MESSAGE, 'danger');
                return;
            }
            saveBlob(await res.blob(), downloadFileName(res) || name || 'download');
        })
        .catch(() => showToast(DOWNLOAD_FAIL_MESSAGE, 'danger'))
        .finally(hideLoadingOverlay);
}

// Content-Disposition 의 filename*(UTF-8) 우선, 없으면 filename
function downloadFileName(res) {
    const header = res.headers.get('Content-Disposition') || '';
    const encoded = header.match(/filename\*=UTF-8''([^;]+)/i);
    if (encoded) return decodeURIComponent(encoded[1]);
    const plain = header.match(/filename="?([^";]+)"?/i);
    return plain ? plain[1] : '';
}

// 받은 내용을 숨은 링크 클릭으로 저장(blob 주소는 같은 출처라 download 이름이 먹음)
function saveBlob(blob, fileName) {
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // 클릭 직후 바로 해제하면 일부 브라우저가 저장 전에 끊김
    setTimeout(() => URL.revokeObjectURL(href), 1000);
}

// htmx 부분요청 실패 공통 처리 — 스왑 타겟 안에 오류를 렌더해 무한 로딩 방지(요소는 유지돼 재조회 가능, 문구는 data-error-msg, body/html 은 덮지 않음)
function showHtmxError(evt) {
    const target = evt.detail && evt.detail.target;
    if (!target || !target.tagName || target === document.body || target === document.documentElement) return;
    const msg = target.getAttribute('data-error-msg') || '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    target.innerHTML = '<div class="text-center text-danger py-5"><i class="ti ti-alert-triangle me-1"></i>' + msg + '</div>';
}
document.body.addEventListener('htmx:responseError', showHtmxError); // 4xx/5xx
document.body.addEventListener('htmx:sendError', showHtmxError);     // 네트워크 끊김
document.body.addEventListener('htmx:timeout', showHtmxError);       // 타임아웃

// data-loading 링크 클릭 = 전체 페이지 이동 → 오버레이. [주의] 끄는 코드가 없고 문서 교체로만 사라지므로 이동 없는 요소엔 붙이지 말 것, 폼은 submit 시점에만 로딩하므로 제외
document.addEventListener('click', e => {
    if (isNewTabClick(e)) return;
    const trigger = e.target.closest('[data-loading]');
    if (trigger && trigger.tagName !== 'FORM') showLoadingOverlay();
});

// data-loading 폼 제출도 전체 이동 → 로딩 표시(유효성 실패로 막히면 이동이 없어 안 꺼지므로 표시 안 함)
document.addEventListener('submit', e => {
    const form = e.target;
    if (form.matches('[data-loading]') && form.checkValidity()) showLoadingOverlay();
});

// bfcache 복원 시엔 스크립트가 안 돌아 이동 직전 켜둔 오버레이가 남는다 → 페이지 표시마다 해제
window.addEventListener('pageshow', forceHideLoadingOverlay);
