(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089175')throw Error('Expected newly imported QA item');
 const main=document.querySelector('.page-wrapper');
 return {url:location.href,visibility:document.visibilityState,text:main.innerText,
  images:[...main.querySelectorAll('img')].map(e=>({alt:e.alt,src:e.getAttribute('src'),complete:e.complete,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight})),
  models:[...main.querySelectorAll('script[type="application/json"]')].map(e=>{const value=JSON.parse(e.textContent);return {keys:Object.keys(value),outType:value.outType,type:value.type,typeCode:value.typeCode,grading:value.grading};}),
  selects:[...main.querySelectorAll('select')].filter(e=>!e.closest('.modal:not(.show)')).map(e=>({name:e.name,value:e.value,disabled:e.disabled,selectedText:e.selectedOptions[0]?.text})),
  actions:[...main.querySelectorAll('a.btn,button')].filter(e=>!e.closest('.modal:not(.show)')).map(e=>({text:e.innerText,href:e.getAttribute('href'),disabled:e.disabled||e.classList.contains('disabled'),id:e.id})),
  modals:[...document.querySelectorAll('.modal.show')].map(m=>({id:m.id,text:m.innerText,controls:[...m.querySelectorAll('input,select,textarea')].filter(e=>!/(csrf|token|password)/i.test(e.name)).map(e=>({id:e.id,name:e.name,type:e.type,value:e.value,disabled:e.disabled,checked:e.checked}))}))};
})()
