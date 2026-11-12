(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||!/^\/item\/(hml|difi)\//.test(location.pathname))throw Error('Registration page scope mismatch');
 return {url:location.href,title:document.title,visibility:document.visibilityState,
  headings:[...document.querySelectorAll('.page-wrapper h1,.page-wrapper h2,.page-wrapper h3,.page-wrapper h4')].map(e=>e.innerText),
  fields:[...document.querySelectorAll('.page-wrapper input,.page-wrapper select,.page-wrapper textarea')].filter(e=>!/csrf|token|password/i.test(e.name+' '+e.id)).map(e=>({id:e.id,name:e.name,type:e.type,value:e.type==='hidden'&&!/id$|days$|start$|end$/i.test(e.name)?undefined:e.value,checked:['checkbox','radio'].includes(e.type)?e.checked:undefined,disabled:e.disabled,readOnly:e.readOnly,required:e.required,maxLength:e.maxLength,options:e.tagName==='SELECT'?[...e.options].map(o=>({value:o.value,text:o.text,disabled:o.disabled,hidden:o.hidden})):undefined})),
  tables:[...document.querySelectorAll('.page-wrapper table')].filter(t=>!t.closest('.modal:not(.show)')).map(t=>({id:t.id,headers:[...t.querySelectorAll('th')].map(e=>e.innerText),rows:[...t.querySelectorAll('tbody tr')].map(tr=>({data:{...tr.dataset},cells:[...tr.querySelectorAll('td')].map(e=>e.innerText),links:[...tr.querySelectorAll('a[href]')].map(e=>({text:e.innerText,href:e.getAttribute('href')}))}))})),
  actions:[...document.querySelectorAll('.page-wrapper button,.page-wrapper a.btn')].filter(e=>!e.closest('.modal:not(.show)')).map(e=>({text:e.innerText,id:e.id,href:e.getAttribute('href'),disabled:e.matches(':disabled')||e.classList.contains('disabled'),target:e.dataset.bsTarget,request:e.getAttribute('hx-get')})),
  modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),
  scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight})),
  tail:document.querySelector('.page-wrapper')?.innerText.slice(-1800)};
})()
