(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const paths=['/paper/detail.donga?paperId=1093&curriculum=22&pageNum=1&pageSize=100','/paper/modify.donga?paperId=1093&curriculum=22&pageNum=1&pageSize=100'];
 const responses=await Promise.all(paths.map(path=>fetch(path,{credentials:'same-origin'})));
 const results=await Promise.all(responses.map(async(response,i)=>{
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');const main=doc.querySelector('.page-wrapper');
  return {path:paths[i],httpStatus:response.status,redirected:response.redirected,responsePath:new URL(response.url).pathname,values:main?[...main.querySelectorAll('dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})):[],savedViewFlag:doc.querySelector('#paperModifyForm [name=viewFlag][checked]')?.value,members:[...doc.querySelectorAll('#paperItemTable [name=itemIds]')].map(e=>e.value),fields:[...doc.querySelectorAll('#paperModifyForm input')].filter(e=>!/csrf|token/i.test(e.name)).map(e=>({name:e.name,value:e.value,checked:e.checked,disabled:e.matches(':disabled')})),actions:main?[...main.querySelectorAll('a.btn,button')].filter(e=>!e.closest('.modal')).map(e=>({text:e.textContent.trim(),href:e.getAttribute('href'),disabled:e.matches(':disabled')||e.classList.contains('disabled')})):[]};
 }));return {method:'Read-only own paper detail and edit GETs',results};
})()
