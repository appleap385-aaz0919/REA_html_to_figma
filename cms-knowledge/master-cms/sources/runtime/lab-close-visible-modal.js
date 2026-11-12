(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||!location.pathname.startsWith('/lab/'))throw Error('Lab scope mismatch');
 const modal=document.querySelector('.modal.show');if(!modal)throw Error('Visible modal absent');
 const button=modal.querySelector('.modal-footer [data-bs-dismiss="modal"]');if(!button)throw Error('Dismiss unavailable');
 return await new Promise(resolve=>{
  let finished=false;
  const finish=eventCompleted=>{if(finished)return;finished=true;resolve({action:'Dismiss visible lab modal without final operation',modalId:modal.id,eventCompleted,modalClass:modal.className});};
  modal.addEventListener('hidden.bs.modal',()=>finish(true),{once:true});button.click();setTimeout(()=>finish(false),2500);
 });
})()
