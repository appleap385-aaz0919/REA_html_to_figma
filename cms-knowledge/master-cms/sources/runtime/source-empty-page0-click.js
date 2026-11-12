(async () => {
  const area = document.querySelector('#productTableArea');
  const selector = '#productTableArea .pagination a[hx-get="/product/list.donga?pageNum=0&pageSize=10"]';
  const link = [...document.querySelectorAll(selector)].find(e => e.textContent.trim() === '0');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/product/list.donga' ||
      document.querySelector('#curriculumSelect')?.value !== '15' || !link ||
      link.closest('.disabled') || getComputedStyle(link).pointerEvents === 'none' || !link.getClientRects().length) {
    throw Error('Expected visible enabled numeric 0 link with curriculum15');
  }
  const beforeUrl = location.href;
  const response = await new Promise((resolve,reject) => {
    const listener = e => {
      if (e.detail.elt !== link && e.target !== link && e.detail.requestConfig?.elt !== link) return;
      cleanup();
      resolve(e.detail.xhr);
    };
    const cleanup = () => {
      clearTimeout(timer);
      document.body.removeEventListener('htmx:afterRequest', listener);
      link.removeEventListener('htmx:afterRequest', listener);
    };
    const timer = setTimeout(() => {cleanup(); reject(Error('Page0 response not observed'));}, 8000);
    document.body.addEventListener('htmx:afterRequest', listener);
    link.addEventListener('htmx:afterRequest', listener);
    link.click();
  });
  const result = document.querySelector('#productTableArea');
  return {
    beforeUrl, afterUrl:location.href, httpStatus:response.status, responseUrl:response.responseURL,
    rows:[...result.querySelectorAll('tbody tr')].map(tr=>tr.innerText),
    text:result.innerText.slice(-230),
    activePage:result.querySelector('.pagination .active')?.innerText.trim() ?? null,
    alerts:[...document.querySelectorAll('.toast.show,[role="alert"]')].map(e=>e.innerText)
  };
})()
