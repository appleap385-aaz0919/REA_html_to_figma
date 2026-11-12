(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/product/list.donga')throw Error('Source list scope mismatch');
 const area=document.querySelector('#productTableArea');
 return {url:location.href,visibility:document.visibilityState,
  filters:[...document.querySelectorAll('[data-filter] input,[data-filter] select')].map(e=>({name:e.name,id:e.id,type:e.type,value:e.value,checked:e.type==='checkbox'?e.checked:undefined,disabled:e.disabled})),
  pageSize:document.querySelector('[name=pageSize]')?.value,
  headers:[...(area?.querySelectorAll('th')||[])].map(e=>e.textContent.trim()),
  rows:[...(area?.querySelectorAll('tbody tr')||[])].map(tr=>({cells:[...tr.querySelectorAll('td')].map(e=>e.innerText.trim()),href:tr.querySelector('a')?.getAttribute('href')})),
  pagination:[...(area?.querySelectorAll('.pagination a')||[])].map(e=>({text:e.textContent.trim(),label:e.getAttribute('aria-label'),request:e.getAttribute('hx-get'),disabled:e.closest('li')?.classList.contains('disabled'),active:e.closest('li')?.classList.contains('active')})),
  scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight})),
  tail:area?.innerText.slice(-220),
  nav:[...document.querySelectorAll('a[href]')].filter(a=>a.getAttribute('href').includes('/lab/')).map(a=>({text:a.innerText.trim(),href:a.getAttribute('href')}))};
})()
