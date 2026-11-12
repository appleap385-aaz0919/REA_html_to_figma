(() => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Scope mismatch');
 const e=document.querySelector('.page-wrapper');if(!e)throw Error('Scroller missing');
 const before={scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight};
 e.scrollTop=Math.min(e.scrollTop+800,e.scrollHeight-e.clientHeight);
 return {url:location.href,visibility:document.visibilityState,before,after:{scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight},atBottom:e.scrollTop+e.clientHeight>=e.scrollHeight-1,visibleRows:[...document.querySelectorAll('tbody tr')].filter(tr=>{const r=tr.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}).map(tr=>tr.innerText.trim())};
})()
