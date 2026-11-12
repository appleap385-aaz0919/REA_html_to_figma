(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const ids=[2089358,2089359,2089360,2089361,2089246];
 const items=await Promise.all(ids.map(async itemId=>{
  const path='/item/all/detail.donga?itemId='+itemId;const response=await fetch(path,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own fixture child unavailable '+itemId);
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');const main=doc.querySelector('.page-wrapper');
  const models=[...main.querySelectorAll('.qv-item')].map(e=>({attributes:{...e.dataset},models:[...e.querySelectorAll('script[type="application/json"]')].map(s=>JSON.parse(s.textContent))}));
  return {itemId,httpStatus:response.status,viewFlag:doc.querySelector('#statusForm input[name=viewFlag][checked]')?.value,values:[...main.querySelectorAll('dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})),omrPreviews:[...main.querySelectorAll('.omr-preview-btn')].map(e=>({attributes:{...e.dataset}})),models,images:[...main.querySelectorAll('img')].map(e=>({alt:e.alt,src:e.getAttribute('src')})),actions:[...main.querySelectorAll('a.btn')].filter(e=>!e.closest('.modal')).map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')}))};
 }));
 return {parentFixtureDocumentId:666,sharedPassageId:2089357,method:'Read-only parallel server GETs; no form submit',items};
})()
