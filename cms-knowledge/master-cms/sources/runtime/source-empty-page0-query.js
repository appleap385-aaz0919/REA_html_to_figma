(async () => {
  const area = document.querySelector('#productTableArea');
  const curriculum = document.querySelector('#curriculumSelect');
  const search = document.querySelector('button[hx-get="/product/list.donga"]');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/product/list.donga' || !area || curriculum?.value !== '15' || !search) throw Error('Expected source search with curriculum15');
  const response = await new Promise((resolve,reject) => {
    const listener = e => {
      if (e.target.id !== 'productTableArea') return;
      cleanup();
      resolve(e.detail.xhr);
    };
    const cleanup = () => {
      clearTimeout(timer);
      document.body.removeEventListener('htmx:afterSwap', listener);
    };
    const timer = setTimeout(() => {cleanup(); reject(Error('Source search fragment timeout'));}, 10000);
    document.body.addEventListener('htmx:afterSwap', listener);
    search.click();
  });
  const list = document.querySelector('#productTableArea');
  return {
    url:location.href, curriculum:curriculum.value, httpStatus:response.status, responseUrl:response.responseURL,
    rows:[...list.querySelectorAll('tbody tr')].map(tr=>tr.innerText),
    listSummary:list.innerText.slice(-180),
    pagination:[...list.querySelectorAll('.pagination a')].map(e=>({
      label:e.getAttribute('aria-label'), href:e.getAttribute('href'), hxGet:e.getAttribute('hx-get'),
      ariaDisabled:e.getAttribute('aria-disabled'), tabindex:e.getAttribute('tabindex'),
      disabledClass:!!e.closest('.disabled'), pointerEvents:getComputedStyle(e).pointerEvents,
      visible:!!e.getClientRects().length
    })),
    resetControls:[...document.querySelectorAll('button[data-filter-reset],button[data-reset]')].map(e=>({text:e.innerText,outerHTML:e.outerHTML})),
    scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight}))
  };
})()
