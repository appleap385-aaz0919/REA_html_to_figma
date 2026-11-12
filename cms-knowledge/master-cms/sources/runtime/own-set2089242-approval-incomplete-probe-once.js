(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089242'||document.querySelector('.modal.show'))throw Error('Own set current detail required');
 const fields=document.getElementById('statusFields'),edit=document.querySelector('[data-status-edit]'),save=document.querySelector('[data-status-save]');
 if(!fields?.disabled||fields.querySelector('[name="viewFlag"]:checked')?.value!=='R'||edit?.matches(':disabled'))throw Error('Own set locked R baseline required');
 edit.click();const radio=fields.querySelector('[name="viewFlag"][value="Y"]');if(radio.matches(':disabled'))throw Error('Normal Y choice unavailable');radio.click();save.click();
 const modals=[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText}));
 return {attemptedOnlyLocalSaveGate:true,selectedLocalViewFlag:fields.querySelector('[name="viewFlag"]:checked').value,modals,alerts:[...document.querySelectorAll('[role="alert"],.toast')].map(e=>e.innerText),stateSubmissionConfirmed:false};
})()
