(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||document.querySelector('.modal.show'))throw Error('Own QA item without modal required');
 const modal=document.getElementById('twinHistoryModal');const button=document.querySelector('[data-twin-history]');
 const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('History display timeout')),7000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve()},{once:true});});
 button.click();await shown;
 return {modal:modal.id,text:modal.innerText,rows:[...modal.querySelectorAll('tbody tr')].map(e=>e.innerText),links:[...modal.querySelectorAll('a')].map(e=>({text:e.innerText,href:e.getAttribute('href')}))};
})()
