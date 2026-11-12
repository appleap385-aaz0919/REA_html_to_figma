(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089358'||!document.querySelector('#itemTwinModal.show')||document.getElementById('twinCountBadge').innerText.trim()!=='0')throw Error('Own unlinked copy set modal required');
 const button=document.getElementById('twinAddTabBtn'),result=document.getElementById('twinAddResult');if(!button||button.matches(':disabled'))throw Error('Actual Twin Add tab required');
 if(!button.classList.contains('active')){const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Twin Add tab not shown')),5000);button.addEventListener('shown.bs.tab',()=>{clearTimeout(timer);resolve();},{once:true});});button.click();await shown;}
 if(!result.querySelector('table')){await new Promise((resolve,reject)=>{const observer=new MutationObserver(()=>{if(result.querySelector('table')){observer.disconnect();clearTimeout(timer);resolve();}});const timer=setTimeout(()=>{observer.disconnect();reject(Error('Initial add list not returned; read state without repeating tab click'));},8000);observer.observe(result,{subtree:true,childList:true});});}
 return {active:true,resultTables:result.querySelectorAll('table').length,resultText:result.innerText.slice(0,3500)};
})()
