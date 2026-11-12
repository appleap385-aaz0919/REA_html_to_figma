(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show'))throw Error('Own product modal required');
 const result=document.getElementById('itemProductAddResult');const loadedBefore=!!result.textContent.trim();
 const ready=loadedBefore?Promise.resolve():new Promise((resolve,reject)=>{const timer=setTimeout(()=>{observer.disconnect();reject(Error('Product candidates load timeout'));},10000);const observer=new MutationObserver(()=>{if(result.textContent.trim()){observer.disconnect();clearTimeout(timer);resolve();}});observer.observe(result,{childList:true,subtree:true});});
 document.getElementById('productAddTabBtn').click();await ready;
 return {loadedBefore,text:result.innerText,fields:[...document.getElementById('itemProductFilter').querySelectorAll('input,select')].map(e=>({name:e.name,value:e.value,disabled:e.matches(':disabled')}))};
})()
