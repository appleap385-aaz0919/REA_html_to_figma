(() => {
  const id = new URL(location.href).searchParams.get('itemId');
  const form = document.querySelector('#statusForm');
  const fieldset = form?.querySelector('fieldset');
  const versionMatch = [...document.querySelectorAll('.page-wrapper dl dd')].some(e => e.textContent.trim() === '2089239 (2089104)');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/item/all/detail.donga' || id !== '2089239' || !versionMatch ||
    form?.getAttribute('hx-post') !== '/item/all/status-save.donga' || form.elements.itemId.value !== id ||
    form.elements.onlineFlag.value !== 'N' || form.elements.serviceUsage.value !== 'T') throw Error('Expected owned COPY239 detail9104 and original status form metadata');
  const previous = 'Y';
  const next = 'N';
  const modal = document.querySelector('#statusSaveModal.show');
  const ok = modal?.querySelector('[data-action-ok]');
  const selected = form.querySelector('[name="viewFlag"]:checked');
  const original = [...form.querySelectorAll('[name="viewFlag"]')].find(e=>e.defaultChecked);
  const key = previous + '-' + next;
  if (!ok || ok.matches(':disabled') || document.querySelectorAll('.modal.show').length !== 1 || original?.value !== previous || selected?.value !== next ||
      selected.matches(':disabled') || window.__qaCopy239StatusAttempt === key) throw Error('Exact COPY status confirmation required');
  window.__qaCopy239StatusAttempt = key;
  ok.click();
  return {id,previous,next,clicked:true};
})()
