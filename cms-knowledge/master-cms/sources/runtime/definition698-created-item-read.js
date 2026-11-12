(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const rows=[];
 for(const path of ['/item/all/detail.donga?itemId=2089378','/item/all/modify.donga?itemId=2089378']){
  const r=await fetch(path,{signal:AbortSignal.timeout(15000)});if(!r.ok||r.redirected){rows.push({path,status:r.status,redirected:r.redirected,finalPath:new URL(r.url).pathname,availableAsDirectMasterItem:false});continue;}
  const d=new DOMParser().parseFromString(await r.text(),'text/html'),m=d.querySelector('.page-wrapper'),saved={};
  for(const id of ['savedOmrData','savedAnswerData','questionEditorData','passageEditorData']){const s=d.getElementById(id);saved[id]=s?.textContent.trim()?JSON.parse(s.textContent):null;}
  rows.push({path,status:r.status,title:d.title,viewFlag:d.querySelector('#statusForm input[name=viewFlag][checked]')?.value,values:[...m.querySelectorAll('dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})),fields:[...m.querySelectorAll('input,select,textarea')].filter(e=>!/csrf|token|password/i.test(e.name+' '+e.id)&&!e.closest('.modal')).map(e=>({id:e.id,name:e.name,value:e.value,disabled:e.disabled})),saved,questionModels:[...m.querySelectorAll('.qv-item script[type="application/json"]')].map(e=>JSON.parse(e.textContent))});
 }
 return {itemId:2089378,method:'Read-only GET of newly observed own Master item detail/edit; inert DOM parse',rows};
})()
