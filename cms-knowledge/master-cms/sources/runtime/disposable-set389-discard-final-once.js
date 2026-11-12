(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089389'||window.__qaDisposableSet389DiscardSubmitted)throw Error('Own unsubmitted disposable set required');
 const f=document.querySelector('#statusForm'),m=document.querySelector('#statusDiscardModal.modal.show'),b=m?.querySelector('[data-action-ok]'),d=f?.querySelector('[name=viewFlag]:checked');
 if(!m||document.querySelectorAll('.modal.show').length!==1||bootstrap.Modal.getInstance(m)?._isTransitioning||f?.getAttribute('hx-post')!=='/item/all/status-save.donga'||f.elements.itemId.value!=='2089389'||d?.value!=='D'||d.matches(':disabled')||b?.matches(':disabled')||!m.textContent.includes('세트 문항 전체가 폐기'))throw Error('Exact stable whole-set D confirmation required');
 window.__qaDisposableSet389DiscardSubmitted=true;b.click();return {finalDiscardClicked:true,attemptCount:1,selectedItemId:2089389,newSetChildIds:[2089389,2089390,2089391,2089392],viewFlag:'D',serviceDeployment:false};
})()
