(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Scope mismatch');const m=document.querySelector('#cancelConfirmModal.show');if(!m)throw Error('Cancel confirmation missing');
 const b=m.querySelector('.modal-footer [data-bs-dismiss="modal"]');if(!b)throw Error('Modal Cancel absent');
 return await new Promise(resolve=>{let done=false;const finish=eventCompleted=>{if(done)return;done=true;resolve({action:'Cancel navigation confirmation; keep current inputs',eventCompleted,modalClass:m.className});};m.addEventListener('hidden.bs.modal',()=>finish(true),{once:true});b.click();setTimeout(()=>finish(false),2500);});
})()
