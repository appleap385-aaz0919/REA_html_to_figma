(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const items=await Promise.all([2089242,2089243,2089244,2089245,2089246].map(async itemId=>{
  const path='/item/all/modify.donga?itemId='+itemId;const response=await fetch(path,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own edit references unavailable '+itemId);
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');
  const saved={};for(const id of ['savedOmrData','savedAnswerData']){const e=doc.getElementById(id);const text=e?(e.value||e.textContent||''):'';saved[id]=text.trim()?JSON.parse(text):null;}
  return {itemId,httpStatus:response.status,editorUrl:doc.querySelector('[data-editor-url]')?.dataset.editorUrl,savedOMR:saved,slots:[...doc.querySelectorAll('[data-webhwp-path]')].map(e=>({slot:e.dataset.webhwpPath,path:e.value,url:e.dataset.url})),editorData:[...doc.querySelectorAll('script[type="application/json"]')].filter(e=>['questionEditorData','passageEditorData'].includes(e.id)).map(e=>({id:e.id,model:JSON.parse(e.textContent)}))};
 }));return {method:'Read-only GETs of own fixture edit forms; no UI navigation or save',items};
})()
