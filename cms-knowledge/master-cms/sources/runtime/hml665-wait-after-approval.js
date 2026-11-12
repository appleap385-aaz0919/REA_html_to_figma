(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/hml/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='665')throw Error('Expected own QA665');
 const end=performance.now()+5000;
 while(performance.now()<end){
  const e=document.querySelector('.page-wrapper'),prefix=e?.innerText.slice(0,350)||'';
  const state=prefix.includes('HML 상세\n메타추천중')?'M':prefix.includes('HML 상세\n승인')?'Y':prefix.includes('HML 상세\n실패')?'F':null;
  if(state)return {url:location.href,state,visibility:document.visibilityState,prefix:e.innerText.slice(0,1100),alerts:[...document.querySelectorAll('[role=alert]')].map(x=>x.innerText),scroll:{top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight}};
  await new Promise(r=>setTimeout(r,150));
 }
 throw Error('Approval outcome DOM not yet settled; inspect fresh state without resubmitting');
})()
