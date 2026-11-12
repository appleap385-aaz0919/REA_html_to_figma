(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const paths=['/item/hml/form.donga?curriculum=22&pageNum=1&pageSize=100','/item/difi/form.donga?curriculum=22&pageNum=1&pageSize=100'];
 return {pickers:await Promise.all(paths.map(async path=>{const response=await fetch(path,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Observed registration picker unavailable');const doc=new DOMParser().parseFromString(await response.text(),'text/html'),select=doc.querySelector('select[name=productId]');if(!select)throw Error('Source picker missing');return {path,httpStatus:response.status,optionCount:select.options.length,ownSourceOptions:[...select.options].filter(e=>e.value==='199').map(e=>({value:e.value,text:e.textContent,disabled:e.disabled}))};}))};
})()
