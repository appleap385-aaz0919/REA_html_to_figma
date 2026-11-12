(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||document.querySelector('.modal.show'))throw Error('Own QA item without modal required');
 const modal=document.getElementById('itemTwinModal');const button=document.querySelector('[data-bs-target="#itemTwinModal"]');
 const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Twin modal timeout')),5000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve()},{once:true});});
 const loaded=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Twin current load timeout')),7000);const observer=new MutationObserver(()=>{if(modal.querySelector('#twinCurrent')?.innerText.includes('2089239')){observer.disconnect();clearTimeout(timer);resolve();}});observer.observe(modal,{childList:true,subtree:true});});
 button.click();await shown;await loaded;
 return {modal:modal.id,text:modal.innerText,links:[...modal.querySelectorAll('a[href]')].filter(e=>e.getClientRects().length).map(e=>({text:e.innerText,href:e.getAttribute('href')})),buttons:[...modal.querySelectorAll('button')].filter(e=>e.getClientRects().length).map(e=>({text:e.innerText||e.getAttribute('aria-label'),disabled:e.matches(':disabled'),attributes:{...e.dataset}}))};
})()
