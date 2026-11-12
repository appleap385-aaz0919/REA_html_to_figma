(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('examDocumentId')!=='662')throw Error('Expected discarded QA662');
 const path='/item/all/detail.donga?itemId=2089204';
 const response=await fetch(path,{signal:AbortSignal.timeout(15000)});
 const doc=new DOMParser().parseFromString(await response.text(),'text/html'),main=doc.querySelector('.page-wrapper');
 return {method:'Read-only existing Master item detail route for our own discarded test item',status:response.status,redirected:response.redirected,responsePath:new URL(response.url).pathname,title:doc.title,mainText:main?.textContent.replace(/\s+/g,' ').trim().slice(0,1800)||null,statusFields:[...doc.querySelectorAll('input[name=viewFlag]')].map(e=>({value:e.value,checked:e.checked})),note:'HTTP/page availability does not establish physical database deletion.'};
})()
