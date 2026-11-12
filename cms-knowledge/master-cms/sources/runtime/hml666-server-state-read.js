(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const response=await fetch('/item/hml/detail.donga?examDocumentId=666&curriculum=22&pageNum=1&pageSize=100',{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own QA document unavailable');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');const main=doc.querySelector('.page-wrapper');const clean=main.cloneNode(true);clean.querySelectorAll('script,style,template').forEach(e=>e.remove());
 return {httpStatus:response.status,stateBadges:[...main.querySelectorAll('.badge')].map(e=>e.textContent.trim()),prefix:clean.textContent.replace(/\s+/g,' ').trim().slice(0,900),masterLinks:[...main.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')})),paperReg:[...main.querySelectorAll('[name=paperRegYn]')].map(e=>({value:e.value,checked:e.checked,disabled:e.matches(':disabled')})),currentPrefix:document.querySelector('.page-wrapper')?.innerText.slice(0,180)};
})()
