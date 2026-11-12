(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089358'||document.querySelector('.modal.show'))throw Error('Own copy set detail required');
 const modal=document.getElementById('itemTwinModal'),button=document.querySelector('button[data-bs-target="#itemTwinModal"]');if(!modal||!button||button.matches(':disabled'))throw Error('Actual group list action required');
 const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Set group modal not shown')),5000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve();},{once:true});});button.click();await shown;
 if(modal.querySelectorAll('#twinCurrent table').length!==2){await new Promise((resolve,reject)=>{const observer=new MutationObserver(()=>{if(modal.querySelectorAll('#twinCurrent table').length===2){observer.disconnect();clearTimeout(timer);resolve();}});const timer=setTimeout(()=>{observer.disconnect();reject(Error('Set group content unavailable'));},5000);observer.observe(modal,{subtree:true,childList:true});});}
 return {id:modal.id,text:modal.innerText,tables:modal.querySelectorAll('#twinCurrent table').length};
})()
