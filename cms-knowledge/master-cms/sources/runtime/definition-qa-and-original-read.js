(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Scope mismatch');
 const rows=[];
 for(const id of [661,530]){
  const path='/item/difi/detail.donga?examDocumentId='+id+'&curriculum=22&pageNum=1&pageSize=100';
  const response=await fetch(path,{signal:AbortSignal.timeout(15000)});
  if(!response.ok||response.redirected)throw Error('Read-only detail failed for '+id);
  const doc=new DOMParser().parseFromString(await response.text(),'text/html'),main=doc.querySelector('.page-wrapper');
  if(!main)throw Error('Detail content absent');
  const models=[...main.querySelectorAll('.qv-item script[type="application/json"]')].map(e=>JSON.parse(e.textContent));
  rows.push({examDocumentId:id,status:response.status,title:doc.title,header:main.textContent.replace(/\s+/g,' ').trim().slice(0,650),
   qaMarkerFound:main.textContent.includes('[QA-DIFI-20261109-01]'),
   itemLinks:[...main.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(e=>e.getAttribute('href')),
   judgeItemIds:[...main.querySelectorAll('[data-exam-judge]')].map(e=>e.dataset.itemIds),
   contentModels:models.map(m=>({prompt:m.content?.promptText,answer:m.content?.answerText,gradingMode:m.grading?.mode,outType:m.outType})),
   remark:main.querySelector('[name=remark]')?{value:main.querySelector('[name=remark]').value,readOnly:main.querySelector('[name=remark]').readOnly}:null});
 }
 return {method:'Read-only GET of two observed authorized Master detail URLs; inert DOM parse without executing returned scripts',rows};
})()
