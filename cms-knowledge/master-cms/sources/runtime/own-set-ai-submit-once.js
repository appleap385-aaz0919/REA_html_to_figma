(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089242'||window.__qa2089242SetAIAttempted)throw Error('Own unsubmitted approved set anchor only');
 const m=document.querySelector('#twinGenerateModal.modal.show'),f=m?.querySelector('[data-twin-generate-form]'),b=m?.querySelector('[data-twin-generate-start]');
 if(!m||document.querySelectorAll('.modal.show').length!==1||m.dataset.isSet!=='true'||f?.getAttribute('hx-post')!=='/item/all/twin-generate.donga'||f.querySelector('[name=itemId]')?.value!=='2089242'||f.querySelector('[name=sourceType]:checked')?.value!=='AI'||document.querySelector('#statusForm input[name=viewFlag]:checked')?.value!=='Y'||b?.matches(':disabled'))throw Error('Exact approved set AI form/modal mismatch');
 window.__qa2089242SetAIEvents=[];
 f.addEventListener('htmx:beforeRequest',e=>window.__qa2089242SetAIEvents.push({type:'beforeRequest',path:e.detail?.requestConfig?.path?.split('?')[0],method:e.detail?.requestConfig?.verb,itemId:e.detail?.requestConfig?.parameters?.itemId,sourceType:e.detail?.requestConfig?.parameters?.sourceType}));
 f.addEventListener('htmx:afterRequest',e=>{let payload={};try{payload=JSON.parse(e.detail.xhr.getResponseHeader('HX-Trigger')||'{}');}catch{}const g=payload.twinGenerated;window.__qa2089242SetAIEvents.push({type:'afterRequest',status:e.detail?.xhr?.status,successful:e.detail?.successful,triggerKeys:Object.keys(payload),generatedKeys:g&&typeof g==='object'?Object.keys(g):[],sourceType:g?.sourceType,itemIds:g?.itemIds});});
 window.__qa2089242SetAIAttempted=true;b.click();
 return {clickedOnce:true,anchorItemId:2089242,originalPassageId:2089241,isSet:true,sourceType:'AI',attemptCount:1,events:window.__qa2089242SetAIEvents,serviceDeployment:false};
})()
