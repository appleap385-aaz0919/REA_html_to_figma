(async () => {
  if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216') throw Error('Own QA item only');
  const visible=[...document.querySelectorAll('.modal.show')].filter(e=>e.getClientRects().length);
  if(visible.length!==1||!['twinGenerateModal','deployModal','twinHistoryModal','itemTwinModal'].includes(visible[0].id)) throw Error('Unexpected modal');
  const modal=visible[0];const button=[...modal.querySelectorAll('[data-bs-dismiss="modal"]')].find(e=>e.getClientRects().length&&e.innerText.trim()==='취소')||modal.querySelector('[data-bs-dismiss="modal"]');
  if(!button||button.matches(':disabled')) throw Error('Dismiss unavailable');
  const hidden=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Modal hidden event timeout')),5000);modal.addEventListener('hidden.bs.modal',()=>{clearTimeout(timer);resolve(true)},{once:true});});
  button.click();await hidden;
  return {dismissed:modal.id,remainingVisible:[...document.querySelectorAll('.modal.show')].map(e=>e.id)};
})()
