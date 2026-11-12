(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemTwinModal.show #twinAddTabBtn.active'))throw Error('Own QA add tab required');
 const form=document.getElementById('twinSearchFilter');const container=document.getElementById('twinAddResult');
 form.querySelector('[name=keywordType]').value='itemId';form.querySelector('[name=keywordType]').dispatchEvent(new Event('change',{bubbles:true}));
 const input=form.querySelector('[name=keyword]');input.value='2089239';input.dispatchEvent(new Event('input',{bubbles:true}));
 const ready=new Promise((resolve,reject)=>{const timer=setTimeout(()=>{observer.disconnect();reject(Error('Exact clone search update timeout'));},12000);const observer=new MutationObserver(()=>{const rows=[...container.querySelectorAll('tbody tr')];if(rows.length===1&&rows[0].innerText.includes('2089239')){clearTimeout(timer);observer.disconnect();resolve();}});observer.observe(container,{childList:true,subtree:true});});
 form.querySelector('[data-twin-search]').click();await ready;
 return {keyword:input.value,resultText:container.innerText,buttons:[...container.querySelectorAll('button')].map(e=>({text:e.innerText,disabled:e.matches(':disabled'),'hx-post':e.getAttribute('hx-post'),'hx-include':e.getAttribute('hx-include')}))};
})()
