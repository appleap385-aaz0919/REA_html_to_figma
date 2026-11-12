(async () => {
  const id = new URL(location.href).searchParams.get('itemId');
  const form = document.querySelector('#statusForm');
  const fieldset = form?.querySelector('fieldset');
  const versionMatch = [...document.querySelectorAll('.page-wrapper dl dd')].some(e => e.textContent.trim() === '2089239 (2089104)');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/item/all/detail.donga' || id !== '2089239' || !versionMatch ||
    form?.getAttribute('hx-post') !== '/item/all/status-save.donga' || form.elements.itemId.value !== id ||
    form.elements.onlineFlag.value !== 'N' || form.elements.serviceUsage.value !== 'T') throw Error('Expected owned COPY239 detail9104 and original status form metadata');
  const previous = 'Y';
  const next = 'N';
  const active = form.querySelector('[name="viewFlag"]:checked');
  const target = form.querySelector('[name="viewFlag"][value="'+next+'"]');
  const edit = document.querySelector('[data-status-edit]');
  if (!fieldset.disabled || active?.value !== previous || !active.defaultChecked || !target || target.disabled ||
      !edit || edit.matches(':disabled') || document.querySelector('.modal.show')) throw Error('Expected clean current status and permitted target');
  edit.click();
  if (fieldset.disabled || target.matches(':disabled')) throw Error('Status editor did not unlock');
  target.click();
  if (!target.checked) throw Error('Target status not selected');
  const modal = document.querySelector('#statusSaveModal');
  await new Promise((resolve,reject) => {
    const timer = setTimeout(() => reject(Error('Normal status confirmation not shown')), 7000);
    modal.addEventListener('shown.bs.modal', () => { clearTimeout(timer); resolve(); }, {once:true});
    document.querySelector('[data-status-save]').click();
  });
  return {id, previous, next, modal:modal.id, text:modal.innerText, confirmed:false};
})()
