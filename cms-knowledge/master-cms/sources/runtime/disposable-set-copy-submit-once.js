(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089242'||window.__qaDisposableSetCopyAttempted)throw Error('Own approved original set required');
 const m=document.querySelector('#twinGenerateModal.modal.show'),f=m?.querySelector('[data-twin-generate-form]'),b=m?.querySelector('[data-twin-generate-start]');
 if(!m||document.querySelectorAll('.modal.show').length!==1||bootstrap.Modal.getInstance(m)?._isTransitioning||m.dataset.isSet!=='true'||f?.getAttribute('hx-post')!=='/item/all/twin-generate.donga'||f.querySelector('[name=itemId]')?.value!=='2089242'||f.querySelector('[name=sourceType]:checked')?.value!=='COPY'||document.querySelector('#statusForm input[name=viewFlag]:checked')?.value!=='Y'||b?.matches(':disabled'))throw Error('Exact stable four-child COPY dialog required');
 window.__qaDisposableSetCopyAttempted=true;b.click();return {clickedOnce:true,anchorItemId:2089242,originalPassageId:2089241,sourceType:'COPY',isSet:true,serviceDeployment:false};
})()
