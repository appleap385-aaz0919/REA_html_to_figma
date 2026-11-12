
        document.addEventListener('DOMContentLoaded', () => {
            const summaryUrl = "\/paper\/item-summary.donga";
            const table = document.getElementById('paperItemTable');
            const count = document.getElementById('paperItemCount');

            // 화면에 남은 문항으로 단원 · 문제 구성 · 문항 수 다시 계산. 응답은 세 칸 oob 라 swap 없음
            const recalcSummary = () => {
                const params = new URLSearchParams();
                table.querySelectorAll('tr[data-item-id]').forEach(row => params.append('itemIds', row.dataset.itemId));
                htmx.ajax('GET', summaryUrl + '?' + params, { swap: 'none' });
            };

            const refresh = () => {
                const seqCells = table.querySelectorAll('[data-seq]');
                seqCells.forEach((cell, index) => {
                    cell.textContent = index + 1;
                });
                count.textContent = seqCells.length;

                const removeButtons = table.querySelectorAll('[data-remove-group]');
                removeButtons.forEach(button => {
                    button.disabled = removeButtons.length <= 1;
                });
            };

            const removeModalEl = document.getElementById('removeGroupModal');
            const removeTarget = removeModalEl.querySelector('[data-remove-target]');
            let pendingGroup = null;

            table.addEventListener('click', e => {
                const button = e.target.closest('[data-remove-group]');
                if (!button) return;

                pendingGroup = button.closest('tbody');
                const rows = pendingGroup.querySelectorAll('tr');
                removeTarget.textContent = pendingGroup.dataset.passageId
                        ? '지문 ID ' + pendingGroup.dataset.passageId + ' · ' + rows.length + '문항'
                        : '문항 ID ' + rows[0].dataset.itemId;
                bootstrap.Modal.getOrCreateInstance(removeModalEl).show();
            });

            removeModalEl.querySelector('[data-action-ok]').addEventListener('click', () => {
                bootstrap.Modal.getOrCreateInstance(removeModalEl).hide();
                pendingGroup?.remove();
                pendingGroup = null;
                refresh();
                recalcSummary();
            });

            // 문항 추가 모달이 묶음을 표 맨 위에 붙인 뒤(서버 HX-Trigger-After-Swap)
            document.addEventListener('paperItemAdded', () => {
                table.querySelector('[data-empty-items]')?.remove();
                refresh();
                recalcSummary();
            });

            // 저장 — 폐기면 확인 모달 뒤 제출, 아니면 바로 제출(검사는 needs-validation · 서버). 폐기는 평가지명만 필수라 페이지 required 를 풂
            const form = document.getElementById('paperModifyForm');
            const pageInputs = form.querySelectorAll('[name="startPageNum"], [name="endPageNum"]');
            const discardModalEl = document.getElementById('paperDiscardModal');
            const isDiscard = () => form.querySelector('input[name="viewFlag"]:checked')?.value === 'D';
            const syncPageRequired = () => pageInputs.forEach(input => input.required = !isDiscard());

            form.addEventListener('change', e => {
                if (e.target.name === 'viewFlag') syncPageRequired();
            });
            form.querySelector('[data-paper-save]').addEventListener('click', () => {
                // 빈 칸이 있으면 확인 모달 전에 화면 검사 토스트부터
                if (isDiscard() && form.checkValidity()) {
                    bootstrap.Modal.getOrCreateInstance(discardModalEl).show();
                    return;
                }
                form.requestSubmit();
            });
            discardModalEl.querySelector('[data-action-ok]').addEventListener('click', () => {
                bootstrap.Modal.getOrCreateInstance(discardModalEl).hide();
                form.requestSubmit();
            });

            new Sortable(table, {
                draggable: 'tbody[data-sort-group]',
                handle: '[data-sort-handle]',
                animation: 150,
                ghostClass: 'opacity-50',
                onEnd: refresh
            });

            refresh();
            syncPageRequired();
        });
    