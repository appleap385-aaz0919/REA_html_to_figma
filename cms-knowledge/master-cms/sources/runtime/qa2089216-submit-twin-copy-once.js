(() => {
  if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089216')throw Error('Own QA item only');
  const modals=[...document.querySelectorAll('.modal.show')];const modal=document.getElementById('twinGenerateModal');
  if(modals.length!==1||modals[0]!==modal)throw Error('Exactly twin generation dialog required');
  const form=modal.querySelector('[data-twin-generate-form]');
  if(form.getAttribute('hx-post')!=='/item/all/twin-generate.donga'||form.querySelector('[name=itemId]').value!=='2089216'||form.querySelector('[name=sourceType]:checked')?.value!=='COPY')throw Error('Unexpected generation payload');
  const button=modal.querySelector('[data-twin-generate-start]');if(button.matches(':disabled')||window.__qa2089216TwinCopyAttempted)throw Error('Unavailable or already attempted');
  window.__qa2089216TwinCopyAttempted=true;
  const request={observed:false};
  const handler=e=>{if(e.target!==form)return;request.observed=true;request.path=e.detail.requestConfig?.path;request.verb=e.detail.requestConfig?.verb;request.values={};for(const key of ['itemId','sourceType'])request.values[key]=e.detail.requestConfig?.parameters?.[key];document.body.removeEventListener('htmx:beforeRequest',handler);};
  document.body.addEventListener('htmx:beforeRequest',handler);
  button.click();
  return {clickedOnce:true,sourceType:'COPY',itemId:2089216,request,serviceDeployment:false};
})()
