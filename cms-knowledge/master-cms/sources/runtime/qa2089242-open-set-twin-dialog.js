(async () => {
  if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||new URLSearchParams(location.search).get('itemId')!=='2089242') throw Error('Own QA set child only');
  const visible=[...document.querySelectorAll('.modal')].filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden');
  if(visible.length) throw Error('Existing modal; stop');
  const button=document.querySelector('[data-twin-generate]');
  const modal=document.getElementById('twinGenerateModal');
  if(!button||button.matches(':disabled')||!modal) throw Error('Twin action unavailable');
  const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Twin shown event timeout')),5000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve(true)},{once:true});});
  button.click(); await shown;
  return {url:location.href,modal:modal.id,text:modal.innerText,fields:[...modal.querySelectorAll('input,select,textarea')].filter(e=>!/csrf|token|password/i.test(e.name)).map(e=>({name:e.name,type:e.type,value:e.value,checked:e.checked,disabled:e.matches(':disabled')})),buttons:[...modal.querySelectorAll('button')].map(e=>({text:e.innerText||e.getAttribute('aria-label'),disabled:e.matches(':disabled')}))};
})()
