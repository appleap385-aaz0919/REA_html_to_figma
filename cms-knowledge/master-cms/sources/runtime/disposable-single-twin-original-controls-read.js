(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const ids=[2089216,2089239,2089240];
 return {method:'Three read-only current detail GETs for existing own QA single-family controls',items:await Promise.all(ids.map(async itemId=>{
 const r=await fetch('/item/all/detail.donga?itemId='+itemId,{credentials:'same-origin'});if(!r.ok||r.redirected)throw Error('Own control unavailable '+itemId);
 const d=new DOMParser().parseFromString(await r.text(),'text/html'),m=d.querySelector('.page-wrapper');
 return {itemId,httpStatus:r.status,viewFlag:d.querySelector('#statusForm input[name=viewFlag][checked]')?.value,values:[...m.querySelectorAll('dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})),models:[...m.querySelectorAll('.qv-item')].map(e=>({attributes:{...e.dataset},models:[...e.querySelectorAll('script[type="application/json"]')].map(s=>JSON.parse(s.textContent))})),omrPreviews:[...m.querySelectorAll('.omr-preview-btn')].map(e=>({attributes:{...e.dataset}})),images:[...m.querySelectorAll('img')].map(e=>({alt:e.alt,src:e.getAttribute('src')}))};
 }))};
})()
