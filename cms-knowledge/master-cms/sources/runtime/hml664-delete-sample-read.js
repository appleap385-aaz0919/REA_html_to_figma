(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Authorized Master only');
 const r=await fetch('/item/all/detail.donga?itemId=2089217',{signal:AbortSignal.timeout(15000)});
 const d=new DOMParser().parseFromString(await r.text(),'text/html');d.querySelectorAll('script,style,template').forEach(e=>e.remove());
 return {method:'Read-only direct detail GET of one own item selectedD',itemId:2089217,status:r.status,redirected:r.redirected,responsePath:new URL(r.url).pathname,title:d.title,mainPrefix:d.querySelector('.page-wrapper')?.textContent.replace(/\s+/g,' ').trim().slice(0,500),limit:'One sample of16Ditems; no physical DB deletion assertion'};
})()
