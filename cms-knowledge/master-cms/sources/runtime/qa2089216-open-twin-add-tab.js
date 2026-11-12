(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemTwinModal.show'))throw Error('Own QA current twins modal required');
 const container=document.getElementById('twinAddResult');const loadedBefore=!!container.textContent.trim();
 const ready=loadedBefore?Promise.resolve():new Promise((resolve,reject)=>{const timer=setTimeout(()=>{observer.disconnect();reject(Error('Add results load timeout'));},12000);const observer=new MutationObserver(()=>{if(container.textContent.trim()){clearTimeout(timer);observer.disconnect();resolve();}});observer.observe(container,{childList:true,subtree:true});});
 document.getElementById('twinAddTabBtn').click();await ready;
 return {loadedBefore,tabSelected:document.getElementById('twinAddTabBtn').getAttribute('aria-selected'),filter:[...document.querySelectorAll('#twinSearchFilter input,#twinSearchFilter select')].map(e=>({name:e.name,value:e.value,checked:e.checked,disabled:e.matches(':disabled')})),resultText:container.innerText,buttons:[...container.querySelectorAll('button')].map(e=>({text:e.innerText,disabled:e.matches(':disabled'),'hx-post':e.getAttribute('hx-post')}))};
})()
