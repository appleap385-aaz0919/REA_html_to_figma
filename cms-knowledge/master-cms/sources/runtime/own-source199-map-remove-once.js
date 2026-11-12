(async()=>{
  if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show'))throw Error('Own source modal required');
  const current=document.getElementById('productCurrent'),button=current.querySelector('[hx-post="/item/all/product-remove.donga?productId=199"]'),row=button?.closest('tr');
  if(current.querySelectorAll('[data-product-row]').length!==2||!current.querySelector('[hx-post="/item/all/product-update.donga?productId=13"]')||!row?.innerText.includes('미사용')||row.querySelector('[name="mapPageNum"]').value!=='2'||row.querySelector('[name="mapQuestionNum"]').value!=='2'||button.matches(':disabled'))throw Error('Only own199 unused2/2 may be removed; source13 must exist');
  const after=new Promise((resolve,reject)=>{
    const listener=e=>{if(e.target.id==='productCurrent'&&current.querySelectorAll('[data-product-row]').length===1&&!current.querySelector('[hx-post="/item/all/product-remove.donga?productId=199"]')&&current.querySelector('[hx-post="/item/all/product-remove.donga?productId=13"]')){cleanup();resolve();}};
    const timer=setTimeout(()=>{cleanup();reject(Error('Outcome uncertain; reconcile independent GET before retry'));},6000);
    function cleanup(){clearTimeout(timer);document.body.removeEventListener('htmx:afterSwap',listener);}
    document.body.addEventListener('htmx:afterSwap',listener);
  });
  button.click();await after;return {clickedOnce:true,removedOwnSourceId:199,retainedSourceId:13,currentText:current.innerText,count:document.getElementById('productCountText').innerText};
})()
