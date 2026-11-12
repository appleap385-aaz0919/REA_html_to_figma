(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const results=await Promise.all(['/item/all/detail.donga?itemId=2089239','/item/all/modify.donga?itemId=2089239'].map(async path=>{
  const response=await fetch(path,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own copy read unavailable');
  const doc=new DOMParser().parseFromString(await response.text(),'text/html'),main=doc.querySelector('.page-wrapper'),saved={};
  for(const id of ['savedOmrData','savedAnswerData','questionEditorData','passageEditorData']){const s=doc.getElementById(id);saved[id]=s?.textContent.trim()?JSON.parse(s.textContent):null;}
  const script=[...doc.scripts].map(e=>e.textContent).join('\n');
  return {path,httpStatus:response.status,responsePath:new URL(response.url).pathname,viewFlag:doc.querySelector('#statusForm input[name=viewFlag][checked]')?.value,values:[...main.querySelectorAll('dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})),difficulty:doc.getElementById('mfDifficulty')?.value,difficultyDefault:doc.getElementById('mfDifficulty')?.getAttribute('data-default-value'),loadDraft:script.match(/var loadDraft = ([^;]+);/)?.[1],draftDeclarations:[...script.matchAll(/[^\n]*(?:[Dd]raft|draftEdit)[^\n]*/g)].map(e=>e[0].trim()).filter(s=>s.length<450).slice(-35),saved,questionModels:[...main.querySelectorAll('.qv-item script[type="application/json"]')].map(e=>JSON.parse(e.textContent)),hml:[...main.querySelectorAll('[data-webhwp-path]')].map(e=>({slot:e.dataset.webhwpPath,path:e.value})),draftActions:[...doc.querySelectorAll('[id*="draft"],[id*="Draft"]')].filter(e=>e.matches('button,.modal')).map(e=>({id:e.id,text:e.textContent.trim().slice(0,900)}))};
 }));return {itemId:2089239,method:'Read-only own detail/default edit GETs; inert forms not hydrated',results};
})()
