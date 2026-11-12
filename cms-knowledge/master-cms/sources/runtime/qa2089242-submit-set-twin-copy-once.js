(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089242')throw Error('Own approved QA set only');
 const modal=document.getElementById('twinGenerateModal'),modals=[...document.querySelectorAll('.modal.show')];
 if(modals.length!==1||modals[0]!==modal||modal.dataset.isSet!=='true'||document.querySelector('#statusForm [name="viewFlag"]:checked')?.value!=='Y'||document.getElementById('twinCountText').innerText.trim()!=='0개')throw Error('Own approved zero-group set COPY confirmation only');
 const form=modal.querySelector('[data-twin-generate-form]');if(form.getAttribute('hx-post')!=='/item/all/twin-generate.donga'||form.querySelector('[name="itemId"]').value!=='2089242'||form.querySelector('[name="sourceType"]:checked')?.value!=='COPY')throw Error('Unexpected set generation payload');
 const button=modal.querySelector('[data-twin-generate-start]');if(button.matches(':disabled')||window.__qa2089242SetTwinCopyAttempted)throw Error('Unavailable or already attempted');window.__qa2089242SetTwinCopyAttempted=true;
 const request={observed:false};const handler=e=>{if(e.target!==form)return;request.observed=true;request.path=e.detail.requestConfig?.path;request.verb=e.detail.requestConfig?.verb;request.values={};for(const key of ['itemId','sourceType'])request.values[key]=e.detail.requestConfig?.parameters?.[key];document.body.removeEventListener('htmx:beforeRequest',handler);};
 document.body.addEventListener('htmx:beforeRequest',handler);button.click();return {clickedOnce:true,itemId:2089242,sourceType:'COPY',isSet:true,request,serviceDeployment:false};
})()
