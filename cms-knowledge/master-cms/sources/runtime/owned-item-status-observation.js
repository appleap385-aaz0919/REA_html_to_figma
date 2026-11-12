(() => {
 const id=new URLSearchParams(location.search).get('itemId');
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||!['2089238','2089216'].includes(id))throw Error('Own QA status scope mismatch');
 const f=document.getElementById('statusForm'),fs=document.getElementById('statusFields'),main=document.querySelector('.page-wrapper');
 if(!f||!fs)throw Error('Status controls absent');
 return {url:location.href,visibility:document.visibilityState,header:main.querySelector('.qv-item')?.closest('.card')?.querySelector('.card-header')?.innerText,
  statusForm:{request:f.getAttribute('hx-post'),action:f.getAttribute('action'),locked:fs.disabled,fields:[...f.querySelectorAll('input,select')].filter(e=>!/(csrf|token|password)/i.test(e.name)).map(e=>({name:e.name,type:e.type,value:e.value,checked:e.checked,defaultChecked:e.defaultChecked,defaultSelected:e.selectedOptions?.[0]?.defaultSelected,disabled:e.matches(':disabled')}))},
  buttons:[...main.querySelectorAll('[data-status-edit],[data-status-cancel],[data-status-save]')].map(e=>({text:e.innerText,disabled:e.matches(':disabled'),visible:!!e.getClientRects().length})),
  alerts:[...document.querySelectorAll('[role=alert]')].map(e=>e.innerText),modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),
  requestElements:[...document.querySelectorAll('.htmx-request')].map(e=>({id:e.id,path:e.getAttribute('hx-post')})),scroll:{top:main.scrollTop,height:main.clientHeight,total:main.scrollHeight}};
})()
