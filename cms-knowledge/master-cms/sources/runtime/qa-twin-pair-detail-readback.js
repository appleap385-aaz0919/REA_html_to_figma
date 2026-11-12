(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 return await Promise.all([2089216,2089239].map(async id=>{
  const path='/item/all/detail.donga?itemId='+id;const response=await fetch(path,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own item detail unavailable '+id);
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');const omr=doc.querySelector('.omr-preview-btn');
  return {itemId:id,httpStatus:response.status,viewFlag:doc.querySelector('#statusForm input[name=viewFlag][checked]')?.value,displayedTwinCount:doc.getElementById('twinCountText')?.textContent.trim(),values:[...doc.querySelectorAll('.page-wrapper dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})),omr:omr?{type:omr.dataset.questionType,savedOmr:JSON.parse(omr.getAttribute('data-saved-omr')||'null'),savedAnswer:JSON.parse(omr.getAttribute('data-saved-answer')||'null')}:null};
 }));
})()
