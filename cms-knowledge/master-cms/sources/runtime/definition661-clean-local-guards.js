(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='661')throw Error('Expected isolated QA661');
 const select=document.querySelector('select[data-exam-judge]'),remark=document.querySelector('[name=remark]');
 if(!select||select.dataset.itemIds!=='2089175'||select.value!=='S'||remark.value||document.querySelector('.modal.show'))throw Error('Expected clean QA draft; do not replay over local state');
 const results=window.__cmsQaCleanGuardResults=[];
 const waitEvent=(element,name,action)=>new Promise((resolve,reject)=>{
  let done=false;const listener=()=>{if(done)return;done=true;clearTimeout(timer);resolve();};
  const timer=setTimeout(()=>{if(done)return;done=true;element.removeEventListener(name,listener);reject(Error(name+' did not complete; stop and inspect '+element.id));},3500);
  element.addEventListener(name,listener,{once:true});action();
 });
 const open=async(selector,id)=>{
  if(document.querySelector('.modal.show'))throw Error('Another modal is still open');
  const m=document.getElementById(id),button=document.querySelector(selector);
  if(!m||!button)throw Error('Expected review control absent');
  await waitEvent(m,'shown.bs.modal',()=>button.click());
  if(document.querySelectorAll('.modal.show').length!==1||!m.classList.contains('show'))throw Error('Expected single completed modal');
  results.push({case:id,judge:select.value,reason:remark.value,text:m.innerText,shownCompleted:true});
  await waitEvent(m,'hidden.bs.modal',()=>m.querySelector('.modal-footer [data-bs-dismiss=modal]').click());
  if(document.querySelector('.modal.show'))throw Error('Review modal did not fully close');
  results.at(-1).hiddenCompleted=true;
 };
 const choose=value=>{select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));};
 choose('D');await open('[data-exam-approve]','examAllDeleteModal');
 choose('F');await open('[data-exam-approve]','examApproveModal');
 choose('S');await open('[data-exam-discard]','examDiscardReasonModal');
 remark.value='QA-DIFI-20261109-01 import and review validation; isolated development test.';
 remark.dispatchEvent(new Event('input',{bubbles:true}));
 await open('[data-exam-discard]','examDiscardModal');
 await open('[data-exam-approve]','examApproveModal');
 return {url:location.href,visibility:document.visibilityState,results,finalJudge:select.value,finalRemark:remark.value,modalCount:document.querySelectorAll('.modal.show').length,finalApprovalSubmitted:false,finalDiscardSubmitted:false};
})()
