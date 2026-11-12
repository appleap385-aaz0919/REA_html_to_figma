(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Authorized Master only');
 const path='/item/hml/detail.donga?examDocumentId=664&curriculum=22&pageNum=1&pageSize=100';
 const r=await fetch(path,{signal:AbortSignal.timeout(15000)});if(!r.ok||r.redirected)throw Error('Own HML read failed');
 const d=new DOMParser().parseFromString(await r.text(),'text/html'),main=d.querySelector('.page-wrapper');
 const cards=[...new Set([...main.querySelectorAll('.qv-item')].map(e=>e.closest('.card')))];
 const blocks=cards.filter(Boolean).map(c=>{
  const head=c.querySelector('.card-header');return {header:head?.textContent.replace(/\s+/g,' ').trim(),badges:[...head?.querySelectorAll('.badge')||[]].map(e=>({text:e.textContent.trim(),class:e.className})),
   itemLinks:[...c.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(e=>e.getAttribute('href')),
   hiddenIdNodes:[...head?.querySelectorAll('.d-none')||[]].map(e=>e.textContent.trim())};
 });
 const clean=main.cloneNode(true);clean.querySelectorAll('script,style,template').forEach(e=>e.remove());
 return {method:'Fresh read-only same-document GET and inert DOM parse',url:new URL(path,location.href).href,status:r.status,prefix:clean.textContent.replace(/\s+/g,' ').trim().slice(0,700),
  paperReg:[...main.querySelectorAll('[name=paperRegYn]')].map(e=>({value:e.value,checked:e.checked,disabled:e.disabled})),
  remark:main.querySelector('[name=remark]')?.value,judgeControlCount:main.querySelectorAll('[data-exam-judge]').length,blocks};
})()
