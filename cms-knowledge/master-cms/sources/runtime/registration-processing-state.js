(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||!/^\/item\/(hml|difi)\//.test(location.pathname))throw Error('Registration scope mismatch');
 const main=document.querySelector('.page-wrapper'),overlay=document.querySelector('#loadingOverlay');
 return {url:location.href,visibility:document.visibilityState,title:document.title,
  text:main?.innerText.slice(0,3500),
  requests:[...document.querySelectorAll('.htmx-request')].map(e=>({id:e.id,tag:e.tagName,method:e.getAttribute('hx-post')?'POST':e.getAttribute('hx-get')?'GET':null,path:e.getAttribute('hx-post')||e.getAttribute('hx-get')})),
  overlay:overlay?{class:overlay.className,display:getComputedStyle(overlay).display}:null,
  alerts:[...document.querySelectorAll('[role=alert],[role=status]')].map(e=>e.innerText),
  modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),
  resources:performance.getEntriesByType('resource').filter(e=>/^\/item\/(hml|difi)\/(approve|discard|create)\.donga$/.test(new URL(e.name,location.href).pathname)).map(e=>({path:new URL(e.name,location.href).pathname,duration:e.duration,responseStatus:e.responseStatus}))};
})()
