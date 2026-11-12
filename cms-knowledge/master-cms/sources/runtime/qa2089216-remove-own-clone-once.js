(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216')throw Error('Own QA anchor only');
 const modal=document.querySelector('#itemTwinModal.show');if(!modal||document.querySelectorAll('.modal.show').length!==1)throw Error('Current twins modal required');
 const buttons=[...modal.querySelectorAll('#twinCurrent button[hx-post]')].filter(e=>{const u=new URL(e.getAttribute('hx-post'),location.origin);return u.pathname==='/item/all/twin-remove.donga'&&u.searchParams.get('twinDataType')==='ITEM'&&u.searchParams.get('twinDataId')==='2089239';});
 if(buttons.length!==1||buttons[0].matches(':disabled')||window.__qaOwnCloneRemoveAttempted)throw Error('Unexpected/remove already attempted');
 const button=buttons[0];window.__qaOwnCloneRemoveAttempted=true;
 const response=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Remove outcome unknown; never repeat')),15000);const handler=e=>{if(e.detail.elt!==button)return;clearTimeout(timer);document.body.removeEventListener('htmx:afterRequest',handler,true);resolve({httpStatus:e.detail.xhr.status,trigger:e.detail.xhr.getResponseHeader('HX-Trigger'),successful:e.detail.successful});};document.body.addEventListener('htmx:afterRequest',handler,true);});
 button.click();const result=await response;
 return {...result,currentText:document.getElementById('twinCurrent')?.innerText,count:document.getElementById('twinCountText')?.innerText,modal:modal.id,clickedOnce:true};
})()
