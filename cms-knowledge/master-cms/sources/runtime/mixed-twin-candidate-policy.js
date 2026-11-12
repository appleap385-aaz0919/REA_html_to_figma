(async () => {
  const pair = {'2089246':'2089242', '2089242':'2089246'};
  const anchor = new URL(location.href).searchParams.get('itemId');
  const target = pair[anchor];
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/item/all/detail.donga' || !target || document.querySelector('.modal.show')) {
    throw Error('Expected clean owned fixture detail');
  }
  const modal = document.querySelector('#itemTwinModal');
  const opener = document.querySelector('[data-bs-target="#itemTwinModal"]');
  const result = document.querySelector('#twinAddResult');
  const addTab = document.querySelector('#twinAddTabBtn');
  const current = document.querySelector('#twinCurrent');
  if (![modal, opener, result, addTab, current].every(Boolean) || opener.matches(':disabled')) throw Error('Twin controls unavailable');
  const triggerAndObserve = (event, root, predicate, trigger) => new Promise((resolve, reject) => {
    const listener = e => {
      if (!predicate(e)) return;
      cleanup();
      resolve(e);
    };
    const cleanup = () => {
      clearTimeout(timer);
      root.removeEventListener(event, listener);
    };
    const timer = setTimeout(() => { cleanup(); reject(Error(event + ' timeout')); }, 10000);
    root.addEventListener(event, listener);
    trigger();
  });
  await triggerAndObserve('shown.bs.modal', modal, e => e.target === modal, () => opener.click());
  const removalActions = [...current.querySelectorAll('button[hx-post]')].map(b => ({text:b.textContent.trim(), post:b.getAttribute('hx-post'), disabled:b.matches(':disabled')}));
  if (result.textContent.trim()) addTab.click();
  else await triggerAndObserve('htmx:afterSwap', document.body, e => e.target === result && !!result.textContent.trim(), () => addTab.click());
  const filter = document.querySelector('#twinSearchFilter');
  const kind = filter.querySelector('[name="keywordType"]');
  const keyword = filter.querySelector('[name="keyword"]');
  const search = filter.querySelector('[data-twin-search]');
  if (filter.querySelector('[name="anchorItemId"]').value !== anchor || !search || search.matches(':disabled')) throw Error('Twin anchor/search mismatch');
  kind.value = 'itemId';
  keyword.value = target;
  for (const field of [kind, keyword]) {
    field.dispatchEvent(new Event('input', {bubbles:true}));
    field.dispatchEvent(new Event('change', {bubbles:true}));
  }
  const response = await triggerAndObserve('htmx:afterSwap', document.body, e => e.target === result, () => search.click());
  return {
    anchor, target,
    currentCount:document.querySelector('#twinCountBadge')?.textContent.trim(),
    removalActions,
    checkedSetTypes:[...filter.querySelectorAll('[name="setTypes"]:checked')].map(e => e.value),
    checkedStatuses:[...filter.querySelectorAll('[name="statuses"]:checked')].map(e => e.value),
    httpStatus:response.detail.xhr.status,
    searchResult:result.innerText,
    rows:[...result.querySelectorAll('tbody tr')].map(row => ({
      cells:[...row.cells].map(cell => cell.innerText.trim()),
      buttons:[...row.querySelectorAll('button')].map(b => ({
        text:b.innerText, title:b.title, disabled:b.matches(':disabled'), post:b.getAttribute('hx-post'),
        outerHTML:b.outerHTML
      }))
    }))
  };
})()
