(async () => {
 const m=document.querySelector('#mappingImpactModal.show'),s=document.querySelector('#useFlagSelect');
 if(location.hostname!=='dev-exambank.dongahub.com'||!m||!s)throw Error('Expected impact dialog missing');
 const before=s.value;
 return await new Promise(resolve=>{
  let finished=false;
  const done=(eventCompleted)=>{if(finished)return;finished=true;resolve({action:'Cancel impact dialog, no form Save',before,after:s.value,eventCompleted,modalClass:m.className});};
  m.addEventListener('hidden.bs.modal',()=>done(true),{once:true});
  m.querySelector('.modal-footer [data-bs-dismiss]').click();
  setTimeout(()=>done(false),2500);
 });
})()
