(async () => {
  if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089216') throw Error('Own QA item only');
  if(document.querySelector('.modal.show')) throw Error('Existing modal');
  const button=document.querySelector('[data-bs-target="#deployModal"]');const modal=document.getElementById('deployModal');
  if(!button||button.matches(':disabled')||!modal) throw Error('Deploy unavailable');
  const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Deploy shown event timeout')),5000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve(true)},{once:true});});
  button.click();await shown;
  return {modal:modal.id,text:modal.innerText,targets:[...modal.querySelectorAll('[name="deployTargets"]')].map(e=>({value:e.value,checked:e.checked,disabled:e.matches(':disabled'),label:e.closest('label')?.innerText})),confirmDisabled:modal.querySelector('[data-action-ok]').matches(':disabled')};
})()
