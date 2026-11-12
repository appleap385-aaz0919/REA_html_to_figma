(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089245'||document.querySelector('.modal.show'))throw Error('Own reviewed final sibling detail required');
 const fields=document.getElementById('statusFields'),form=document.getElementById('statusForm'),edit=document.querySelector('[data-status-edit]'),save=document.querySelector('[data-status-save]'),modal=document.getElementById('statusSetModal');
 if(!fields.disabled||fields.querySelector('[name="viewFlag"]:checked')?.value!=='R'||form.querySelector('[name="itemId"]').value!=='2089245'||edit.matches(':disabled')||!modal)throw Error('Own set normal R status edit required');
 edit.click();const radio=fields.querySelector('[name="viewFlag"][value="Y"]');if(radio.matches(':disabled'))throw Error('Y unavailable');radio.click();
 const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Set approval confirmation not shown; inspect validation without submitting')),5000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve();},{once:true});});save.click();await shown;
 return {confirmationOnly:true,itemId:2089245,id:modal.id,text:modal.innerText,fields:[...fields.querySelectorAll('select,input:checked')].map(e=>({name:e.name,value:e.value}))};
})()
