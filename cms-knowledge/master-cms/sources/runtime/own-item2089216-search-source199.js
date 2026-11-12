(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show #productAddTabBtn.active'))throw Error('Own product add tab required');
 const filter=document.getElementById('itemProductFilter'),result=document.getElementById('itemProductAddResult'),keyword=filter.querySelector('[name=keyword]');
 filter.querySelector('[name=keywordType]').value='productCode';keyword.value='22-M-MA-T0-1-1-SMT-TP-2048';keyword.dispatchEvent(new Event('input',{bubbles:true}));
 const ready=new Promise((resolve,reject)=>{const timer=setTimeout(()=>{observer.disconnect();reject(Error('Exact own source query timeout'));},10000);const observer=new MutationObserver(()=>{if(result.textContent.trim()){observer.disconnect();clearTimeout(timer);resolve();}});observer.observe(result,{childList:true,subtree:true});});
 filter.querySelector('button[hx-get]').click();await ready;
 return {keyword:keyword.value,text:result.innerText,rows:[...result.querySelectorAll('tbody tr')].map(e=>({text:e.innerText,fields:[...e.querySelectorAll('input,select')].map(e=>({name:e.name,value:e.value,required:e.required,min:e.min,max:e.max})),buttons:[...e.querySelectorAll('button')].map(e=>({text:e.innerText,path:e.getAttribute('hx-post'),disabled:e.matches(':disabled')}))})),addButtons:[...result.querySelectorAll('button[hx-post]')].map(e=>({path:e.getAttribute('hx-post'),disabled:e.matches(':disabled')}))};
})()
