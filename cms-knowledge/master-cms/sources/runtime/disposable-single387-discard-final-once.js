(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089387'||window.__qaDisposable387DiscardSubmitted)throw Error('Own unsubmitted disposable required');
 const f=document.querySelector('#statusForm'),m=document.querySelector('#statusDiscardModal.modal.show'),b=m?.querySelector('[data-action-ok]'),d=f?.querySelector('[name=viewFlag]:checked');
 if(!m||document.querySelectorAll('.modal.show').length!==1||bootstrap.Modal.getInstance(m)?._isTransitioning||f?.getAttribute('hx-post')!=='/item/all/status-save.donga'||f.elements.itemId.value!=='2089387'||d?.value!=='D'||d.matches(':disabled')||b?.matches(':disabled'))throw Error('Exact stable disposable D confirmation required');
 window.__qaDisposable387DiscardSubmitted=true;b.click();return {finalDiscardClicked:true,attemptCount:1,itemId:2089387,viewFlag:'D',serviceDeployment:false};
})()
