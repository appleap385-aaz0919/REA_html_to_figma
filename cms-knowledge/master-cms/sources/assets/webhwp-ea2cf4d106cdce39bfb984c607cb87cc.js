// 한컴 웹한글기안기 V2 글루. item/webhwp-editor.html 의 .webhwp-host 를 배선한다.
// window.open 으로 뜨는 편집 창에서만 돈다.
//
// 구조: 이 창 → /webhwpctrl/resources/hwpctrlframe.html(동일 오리진) → 기안기 서버 프레임.
// 로더 프레임이 동일 오리진이라 frame.contentWindow.HwpCtrl 로 API 를 직접 호출할 수 있다.
//
// 편집기는 이 창에 1벌뿐이다. 파일 전환은 인스턴스를 새로 만들지 않고 Open 으로 문서만 교체한다.
// 저장하면 기안기가 벤더 서버의 임시 주소를 돌려준다. 그 주소를 부모 창에 넘기는 데까지가 이 파일의 몫이고,
// 우리 저장소로 옮기는 것은 문항 저장 때 서버가 한다.
(function () {
    'use strict';

    var FRAME_PATH = '/webhwpctrl/resources/hwpctrlframe.html';
    // HML(HWPML 2.x) 파일이라 저장 포맷도 HWP 가 아닌 HWPML2X 여야 확장자와 내용이 맞는다
    var HML_FORMAT = 'HWPML2X';

    var hosts = {};

    // 이 창이 어느 문항 것인지. 주소는 열릴 때 한 번 고정이라, 부모가 다른 문항으로 옮겨가도 따라 변하지 않는다
    var owner = new URLSearchParams(location.search);

    function toast(message, variant) {
        if (window.showToast) window.showToast(message, variant || 'success');
        else console.log('[webhwp] ' + message);
    }

    function ctrlOf(host) {
        try {
            return host.frame.contentWindow.HwpCtrl;
        } catch (e) {
            return null;
        }
    }

    function setBusy(host, busy) {
        host.busy = busy;
        host.buttons.forEach(function (btn) {
            // 파일이 없어 애초에 비활성인 버튼은 계속 비활성으로 둔다
            if (btn.dataset.webhwpEmpty === 'true') return;
            btn.disabled = busy || !host.ready;
        });
    }

    function setStatus(host, text, variant) {
        if (!host.status) return;
        host.status.textContent = text || '';
        host.status.className = 'text-secondary small mb-2' + (variant ? ' text-' + variant : '');
    }

    // iframe 은 한 번만 띄운다. 숨은 상태로 로드하면 기안기가 크기를 0 으로 잡는다.
    function mount(host) {
        if (host.mounted) return;
        host.mounted = true;

        setStatus(host, '기안기를 불러오는 중입니다...');
        host.frame.src = FRAME_PATH + '?frameId=' + encodeURIComponent(host.frame.id);
    }

    // 열 파일의 출처는 부모 창이다. 이 창은 문항을 조회하지 않아 단독으로는 열 파일을 알 수 없다.
    function hasOpener() {
        try {
            return !!window.opener && !window.opener.closed
                && typeof window.opener.webhwpSlot === 'function';
        } catch (e) {
            return false;
        }
    }

    function slotFromOpener(slot) {
        try {
            if (!window.opener || window.opener.closed) return null;
            if (typeof window.opener.webhwpSlot !== 'function') return null;

            return window.opener.webhwpSlot(slot);
        } catch (e) {
            return null;    // 오리진이 다르면 접근 자체가 막힌다
        }
    }

    // 기안기가 URL 을 직접 받아 스스로 가져온다. 포맷을 HWPML2X 로 명시해야 HML 로 해석한다.
    // 주소는 부모가 cdnBaseUrl 과 합쳐 넘겨준 값을 그대로 쓴다(JS 재조립 금지).
    // 클릭할 때마다 부모에게 다시 묻는다 — 저장 직후 재편집이면 방금 결과를 열어야 한다.
    function openFile(host, btn) {
        var ctrl = ctrlOf(host);
        if (!ctrl) return;

        var source = slotFromOpener(btn.dataset.slot);
        var url = source && source.url;
        if (!url && source && btn.hasAttribute('data-webhwp-new')) {
            openBlank(host, btn);
            return;
        }
        if (!url) {
            toast('열 파일을 찾지 못했습니다.', 'warning');
            return;
        }
        
        // 기안기 내 파일은 localhost로 접근
        url = url.replaceAll("https://dev-webhwp.dongahub.com/", "http://localhost:8080/");

        host.current = btn;
        // 되저장할 원본 경로. 주소가 아니라 저장값이라 부모의 path 를 그대로 쓴다
        host.filename = source.path || '';
        // 저장 결과를 부모 창의 어느 칸에 넣을지 가르는 키(지문/지문해석/문제/해답)
        host.slot = btn.dataset.slot || '';
        markCurrent(host);

        var name = url.split('?')[0].split('/').pop();

        setBusy(host, true);
        setStatus(host, name + ' 을(를) 여는 중입니다...');

        var opened = ctrl.Open(url, HML_FORMAT, 'lock:false', function (res) {
            // 성공 표시가 있을 때만 성공으로 본다(SaveAs·CreatePageImageEx 와 같은 방침)
            if (res && res.result === true) {
                setBusy(host, false);
                setStatus(host, name + ' 을(를) 열었습니다.');
            } else {
                failOpen(host, name, res);
                return;
            }
        });

        // Open 은 내부 예외를 삼키고 false 를 돌려준다(webhwpctrl.js HwpCtrl.prototype.Open)
        if (opened === false) failOpen(host, name, opened);
    }

    // 창이 처음 뜨면 문제 파일부터 연다(가장 자주 고치는 파일). 파일이 없으면 열지 않는다 —
    // 빈 문서를 문제 슬롯으로 잡아두면 의도 없이 누른 저장이 새 문제 파일을 만든다
    function openInitial(host) {
        var btn = host.fileButtons.filter(function (b) { return b.dataset.slot === 'question'; })[0];
        var source = btn && slotFromOpener('question');
        if (!source || !source.url) return;

        openFile(host, btn);
    }

    // 파일이 없는 문제/해답은 빈 문서에서 새로 쓴다. 저장 경로는 서버가 itemId 로 새로 만들므로
    // filename 은 SaveAs·이미지에 쓸 이름일 뿐이다
    function openBlank(host, btn) {
        var ctrl = ctrlOf(host);
        if (!ctrl) return;

        ctrl.Clear(1);

        host.current = btn;
        host.slot = btn.dataset.slot || '';
        host.filename = host.slot + '.hml';
        markCurrent(host);

        setStatus(host, '새 문서입니다. 작성 후 저장하세요.');
    }

    function failOpen(host, name, res) {
        setBusy(host, false);
        setStatus(host, '파일을 열지 못했습니다.', 'danger');
        console.error('[webhwp] 파일 열기 실패', name, res);
        toast('파일을 불러오지 못했습니다.', 'danger');
    }

    function markCurrent(host) {
        host.fileButtons.forEach(function (btn) {
            btn.classList.toggle('active', btn === host.current);
        });
    }

    // 저장 대상은 지금 열려 있는 파일이다. 내 PC 파일을 연 상태면 되저장할 원본 경로가 없다.
    function save(host) {
        var ctrl = ctrlOf(host);
        if (!ctrl) return;

        if (!host.filename) {
            toast('저장할 원본 파일 경로가 없습니다.', 'warning');
            return;
        }
        
        setBusy(host, true);
        setStatus(host, '저장 중입니다...');

        var name = host.filename.split('/').pop();

        // 저장 결과는 벤더 서버의 임시 다운로드 주소로 온다. 이미지까지 만든 뒤 함께 부모 창으로 넘긴다.
        ctrl.SaveAs(name, HML_FORMAT, '', function (res) {
            if (res && res.result === true) {
                saveImage(host, res.downloadUrl);
            } else {
                setBusy(host, false);
                setStatus(host, '저장 결과를 읽지 못했습니다.', 'danger');
                console.error('[webhwp] SaveAs 실패', res);
                toast('저장에 실패했습니다.', 'danger');
            }
        });
    }

    // 편집 창은 부모(all-modify.html)가 window.open 으로 띄운 팝업이다. 단독으로 열면 opener 가 없다.
    function notifyParent(host, hmlUrl, imageUrl) {
        if (!window.opener || window.opener.closed) return;
        
        window.opener.postMessage({
            type: 'webhwp-saved',
            slot: host.slot,
            itemId: owner.get('itemId'),
            itemDetailId: owner.get('itemDetailId'),
            filePath: host.filename,
            hmlUrl: hmlUrl,
            imageUrl: imageUrl
        }, location.origin);
    }

    function saveImage(host, hmlUrl) {
        var ctrl = ctrlOf(host);
        if (!ctrl) return;

        if (!host.filename) {
            toast('저장할 원본 파일 경로가 없습니다.', 'warning');
            return;
        }

        setBusy(host, true);
        setStatus(host, '저장 중입니다...');

        // 이미지 파일명은 원본 HML 이름을 따른다(벤더가 결과 파일명으로 그대로 쓴다)
        var imageName = host.filename.split('/').pop().replace(/\.[^.]*$/, '') + '.png';

        var hwp_Ctrl = ctrl.HeadCtrl; // 문서 내 최상위 컨트롤
        var hwp_ColDefSet = ctrl.CreateSet("ColDef");
        
        hwp_ColDefSet.SetItem("Count", 1);  // 다단 설정 (단 설정 1)
        hwp_ColDefSet.SetItem("ApplyTo", 6);  // 문서 전체
        
        while (hwp_Ctrl != null) {
            if (hwp_Ctrl.CtrlID == "cold") {
                hwp_Ctrl.Properties = hwp_ColDefSet;
            }
            
            hwp_Ctrl = hwp_Ctrl.Next;
        }
        
        var hwp_PageSetupAction = ctrl.CreateAction("PageSetup");
        
        var hwp_SecDefSet = hwp_PageSetupAction.CreateSet();
        
        hwp_PageSetupAction.GetDefault(hwp_SecDefSet);
        
        hwp_SecDefSet.SetItem("ApplyTo", 3);   // 문서전체 용지 설정
        
        var hwp_PageDefSet = hwp_SecDefSet.CreateItemSet("PageDef", "PageDef");
        
        hwp_PageDefSet.SetItem("TopMargin", 0);
        hwp_PageDefSet.SetItem("BottomMargin", 600);
        hwp_PageDefSet.SetItem("LeftMargin", 600);
        hwp_PageDefSet.SetItem("RightMargin", 800);
        
        hwp_PageDefSet.SetItem("HeaderLen", 0);
        hwp_PageDefSet.SetItem("FooterLen", 0);
        hwp_PageDefSet.SetItem("GutterLen", 0);
        
        hwp_PageDefSet.SetItem("PaperWidth", 25000);
        hwp_PageDefSet.SetItem("PaperHeight", 2835);
        
        hwp_PageSetupAction.Execute(hwp_SecDefSet);
        
        var resizingCount = 0;
        var pageCount = 0;
        var paperHeight = 0;
        
        while ((pageCount = ctrl.PageCount) > 1 && resizingCount < 200) {
            paperHeight += 500;
            
            hwp_PageDefSet.SetItem("PaperHeight", paperHeight);
            
            hwp_PageSetupAction.Execute(hwp_SecDefSet);
            
            resizingCount ++;
        }
        
        ctrl.CreatePageImageEx(imageName, 0, 143, 24, "png", "", function(res) {
            if (res && res.result === true) {
                // clear() 가 slot 을 비우므로 부모 통지가 먼저다
                notifyParent(host, hmlUrl, res.downloadUrl);

                setBusy(host, false);
                setStatus(host, '파일이 임시 저장되었습니다.');

                clear(host);

                var savedModal = document.getElementById('webhwpSavedModal');
                if (savedModal) bootstrap.Modal.getOrCreateInstance(savedModal).show();
            } else {
                setBusy(host, false);
                setStatus(host, '저장 결과를 읽지 못했습니다.', 'danger');
                console.error('[webhwp] CreatePageImageEx 저장 오류', res);
                toast('저장에 실패했습니다.', 'danger');
            }
        });
    }
    
    // 현재 편집중인 문서의 내용을 닫고 빈문서 편집 상태로 돌아간다.
    function clear(host) {
        var ctrl = ctrlOf(host);
        if (!ctrl) return;

        ctrl.Clear(1);

        // 빈 문서로 돌아갔으니 저장 대상과 파일 버튼 선택 표시도 함께 푼다
        host.filename = '';
        host.slot = '';
        host.current = null;
        markCurrent(host);
    }

    function download(host) {
        var ctrl = ctrlOf(host);
        if (!ctrl) return;

        var name = host.filename ? host.filename.split('/').pop() : 'document.hml';
        ctrl.SaveAs(name, HML_FORMAT, 'download:true;', function () {}, { tempUrl: location.href });
    }

    function openLocal(host) {
        host.fileInput.click();
    }

    function bind(el) {
        var frame = el.querySelector('.webhwp-frame');
        if (!frame || !frame.id) return;

        var fileButtons = Array.prototype.slice.call(el.querySelectorAll('[data-webhwp-open]'));
        var actionButtons = Array.prototype.slice.call(el.querySelectorAll('[data-webhwp-action]'));

        var host = {
            el: el,
            frame: frame,
            // 지금 열려 있는 파일의 CDN 상대경로(새 문서면 임시 이름). 저장 파일명으로만 쓴다 — 저장 경로는 서버가 만든다.
            filename: '',
            // 지금 열려 있는 파일의 슬롯 키(passage/translation/question/explain)
            slot: '',
            current: null,
            fileButtons: fileButtons,
            buttons: fileButtons.concat(actionButtons),
            status: el.querySelector('[data-webhwp-status]'),
            fileInput: el.querySelector('[data-webhwp-file]'),
            // 부모 창 없이 이 주소로 직접 들어온 상태. 열 파일도 저장할 곳도 없다
            detached: !hasOpener(),
            mounted: false,
            ready: false,
            busy: false
        };

        var actions = { local: openLocal, save: save, download: download };

        // 문항이 갖고 있지 않은 슬롯은 준비 완료 후에도 계속 비활성이어야 한다(새로 작성 가능한 문제/해답 제외).
        // 판정 기준을 부모에게 물어보므로 슬롯마다 한 번씩만 조회한다
        fileButtons.forEach(function (btn) {
            var source = slotFromOpener(btn.dataset.slot);
            var creatable = !!source && btn.hasAttribute('data-webhwp-new');
            if (!creatable && (!source || !source.url)) btn.dataset.webhwpEmpty = 'true';

            btn.addEventListener('click', function () {
                if (host.busy || !host.ready) return;
                openFile(host, btn);
            });
        });

        actionButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (host.busy || !host.ready) return;
                var fn = actions[btn.getAttribute('data-webhwp-action')];
                if (fn) fn(host);
            });
        });

        // 부모가 없으면 저장까지 할 일이 없다 — 준비가 끝나도 풀리지 않게 잠근다
        if (host.detached) {
            host.buttons.forEach(function (btn) { btn.dataset.webhwpEmpty = 'true'; });
        }

        // 준비 완료(webhwp-ready) 전까지는 전부 잠근다. webhwpEmpty 인 것만 그 뒤로도 안 풀린다
        host.buttons.forEach(function (btn) { btn.disabled = true; });

        if (host.fileInput) {
            host.fileInput.addEventListener('change', function () {
                var ctrl = ctrlOf(host);
                var file = this.files && this.files[0];
                if (!ctrl || !file) return;

                // 내 PC 파일은 되저장할 원본 경로가 없다 → 저장 대상 해제
                host.filename = '';
                host.slot = '';
                host.current = null;
                markCurrent(host);

                setBusy(host, true);
                ctrl.Open(file, '', 'lock:false', function () {
                    setBusy(host, false);
                    setStatus(host, file.name + ' 을(를) 열었습니다.');
                });
                // 같은 파일을 다시 골라도 change 가 뜨도록 초기화
                this.value = '';
            });
        }

        hosts[frame.id] = host;

        // 편집기 전용 창이라 숨겨진 상태가 없다 → 바로 띄운다
        mount(host);
    }

    window.addEventListener('message', function (e) {
        if (e.origin !== location.origin || !e.data) return;

        var host = hosts[e.data.frameId];
        if (!host) return;

        if (e.data.type === 'webhwp-ready') {
            host.ready = true;
            setBusy(host, false);
            setStatus(host, host.detached
                ? '문항 수정 화면에서 [한글 편집기 열기]로 열어야 파일을 편집할 수 있습니다.'
                : '준비되었습니다. 편집할 파일을 선택하세요.', host.detached ? 'warning' : null);
            if (!host.detached) openInitial(host);
        } else if (e.data.type === 'webhwp-error') {
            host.ready = false;
            setStatus(host, e.data.message || '기안기를 불러오지 못했습니다.', 'danger');
            console.error('[webhwp] ' + e.data.message);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.webhwp-host').forEach(bind);
    });
})();
