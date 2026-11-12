(async () => {
  const area = document.querySelector('#productTableArea');
  const button = document.querySelector('button[hx-get="/product/list.donga"]');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/product/list.donga' ||
      document.querySelector('#curriculumSelect')?.value !== '22' || !button) throw Error('Expected reset source filter');
  const r = await new Promise((resolve,reject) => {
    function cleanup() { clearTimeout(timer); document.body.removeEventListener('htmx:afterSwap', listener); }
    function listener(event) { if(event.target.id === area.id) { cleanup(); resolve(event.detail.xhr); } }
    const timer = setTimeout(() => { cleanup(); reject(Error('Source reset query fragment timeout')); }, 8000);
    document.body.addEventListener('htmx:afterSwap', listener);
    button.click();
  });
  const current = document.querySelector('#productTableArea');
  return {url:location.href,httpStatus:r.status,responseUrl:r.responseURL,ids:[...current.querySelectorAll('tbody tr')].map(e=>e.cells[0].innerText.trim()),
    row199:[...current.querySelectorAll('tbody tr')].find(e=>e.cells[0].innerText.trim()==='199')?.innerText,
    listTail:current.innerText.slice(-100)};
})()
