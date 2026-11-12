(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216')throw Error('Own QA anchor only');
 const response=await fetch('/item/all/detail.donga?itemId=2089216',{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Anchor server read unavailable');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');const button=doc.querySelector('[data-twin-generate]');
 return {httpStatus:response.status,button:button?{text:button.textContent.trim(),disabled:button.matches(':disabled'),attributes:{...button.dataset}}:null,count:doc.getElementById('twinCountText')?.textContent.trim(),viewFlag:doc.querySelector('#statusForm input[name=viewFlag][checked]')?.value,visibleButton:document.querySelector('[data-twin-generate]')?{text:document.querySelector('[data-twin-generate]').innerText,attributes:{...document.querySelector('[data-twin-generate]').dataset}}:null,alerts:[...document.querySelectorAll('[role=alert]')].map(e=>e.innerText)};
})()
