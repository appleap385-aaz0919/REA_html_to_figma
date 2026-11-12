(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||!location.pathname.startsWith('/lab/'))throw Error('Lab scope mismatch');
 const map=e=>({tag:e.tagName,id:e.id,name:e.name,type:e.type,text:(e.innerText||e.textContent||'').trim().slice(0,300),value:e.value,disabled:e.disabled,checked:e.type==='checkbox'?e.checked:undefined,target:e.dataset.bsTarget,href:e.getAttribute('href'),dataGroup:e.dataset.checkGroup});
 return {url:location.href,title:document.title,visibility:document.visibilityState,
  visibleText:document.querySelector('.page-wrapper')?.innerText,
  controls:[...document.querySelectorAll('.page-wrapper button,.page-wrapper a,.page-wrapper input,.page-wrapper select,.page-wrapper textarea')].filter(e=>!e.closest('.modal:not(.show)')).map(map),
  visibleModals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText,controls:[...e.querySelectorAll('button,input,select')].map(map)})),
  scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight})),
  iframes:[...document.querySelectorAll('iframe')].map(e=>({id:e.id,src:e.getAttribute('src')}))};
})()
