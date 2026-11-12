(() => {
  const id = new URL(location.href).searchParams.get('itemId');
  const form = document.querySelector('#statusForm');
  const fieldset = form?.querySelector('fieldset');
  const versionMatch = [...document.querySelectorAll('.page-wrapper dl dd')].some(e => e.textContent.trim() === '2089239 (2089104)');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/item/all/detail.donga' || id !== '2089239' || !versionMatch ||
    form?.getAttribute('hx-post') !== '/item/all/status-save.donga' || form.elements.itemId.value !== id ||
    form.elements.onlineFlag.value !== 'N' || form.elements.serviceUsage.value !== 'T') throw Error('Expected owned COPY239 detail9104 and original status form metadata');
  return {id,current:form.querySelector('[name="viewFlag"]:checked')?.value,
    defaultValue:[...form.querySelectorAll('[name="viewFlag"]')].find(e=>e.defaultChecked)?.value,
    permitted:[...form.querySelectorAll('[name="viewFlag"]')].filter(e=>!e.disabled).map(e=>e.value),
    generationOpeners:[...document.querySelectorAll('[data-twin-generate], [data-bs-target="#twinGenerateModal"]')].map(e=>({text:e.innerText,disabled:e.matches(':disabled'),visible:!!e.getClientRects().length})),
    historyOpeners:[...document.querySelectorAll('[data-twin-history]')].map(e=>({text:e.innerText,disabled:e.matches(':disabled'),visible:!!e.getClientRects().length})),
    generationModalPresent:!!document.querySelector('#twinGenerateModal'),currentTwinCount:document.querySelector('#twinCountBadge')?.innerText,
    modal:document.querySelector('.modal.show')?.id ?? null,visibility:document.visibilityState,locked:fieldset.disabled};
})()
