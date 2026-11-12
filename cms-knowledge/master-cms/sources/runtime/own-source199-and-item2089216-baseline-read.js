(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const paths=['/product/modify.donga?id=199&curriculum=22&pageNum=1&pageSize=100','/product/detail.donga?id=199&curriculum=22&pageNum=1&pageSize=100','/item/all/products.donga?itemId=2089216'];
 const results=await Promise.all(paths.map(async path=>{
  const response=await fetch(path,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own source baseline unavailable');
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');doc.querySelectorAll('script,style,template').forEach(e=>e.remove());
  const main=doc.querySelector('.page-wrapper')||doc.body;
  return {path,httpStatus:response.status,fields:[...main.querySelectorAll('input,select,textarea')].filter(e=>!/csrf|token|password/i.test(e.name)).map(e=>({name:e.name,id:e.id,value:e.value,disabled:e.matches(':disabled')})),text:main.textContent.replace(/\s+/g,' ').trim(),rows:[...main.querySelectorAll('tbody tr')].map(e=>({text:e.textContent.replace(/\s+/g,' ').trim(),fields:[...e.querySelectorAll('input')].filter(e=>!/csrf|token/i.test(e.name)).map(e=>({name:e.name,value:e.value})),actions:[...e.querySelectorAll('[hx-post]')].map(b=>({path:b.getAttribute('hx-post'),disabled:b.matches(':disabled')}))})),links:[...main.querySelectorAll('a[href]')].map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')}))};
 }));return {results};
})()
