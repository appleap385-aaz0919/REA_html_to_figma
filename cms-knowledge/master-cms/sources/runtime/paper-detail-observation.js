(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/detail.donga')throw Error('Paper detail scope mismatch');
 const values=[...document.querySelectorAll('.page-wrapper dl dt')].map(e=>({label:e.innerText,value:e.nextElementSibling?.innerText}));
 return {url:location.href,values,tables:[...document.querySelectorAll('.page-wrapper table')].map(t=>({headers:[...t.querySelectorAll('th')].map(e=>e.innerText),rows:[...t.querySelectorAll('tbody tr')].map(tr=>({itemId:tr.dataset.itemId,cells:[...tr.querySelectorAll('td')].map(e=>e.innerText),links:[...tr.querySelectorAll('a[href]')].map(e=>({text:e.innerText,href:e.getAttribute('href')}))}))})),
  actions:[...document.querySelectorAll('.page-wrapper>a,.page-wrapper button,.page-wrapper .btn')].map(e=>({text:e.innerText,href:e.getAttribute('href'),disabled:e.matches(':disabled')||e.classList.contains('disabled')})),alerts:[...document.querySelectorAll('[role=alert]')].map(e=>e.innerText)};
})()
