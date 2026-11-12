(async () => {
  if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show'))throw Error('Own current source modal required');
  const current=document.getElementById('productCurrent');
  const button=current.querySelector('[hx-post="/item/all/product-update.donga?productId=199"]');
  const row=button?.closest('tr'),page=row?.querySelector('[name="mapPageNum"]'),number=row?.querySelector('[name="mapQuestionNum"]');
  if(current.querySelectorAll('[data-product-row]').length!==2||!current.querySelector('[hx-post="/item/all/product-update.donga?productId=13"]')||!row?.innerText.includes('미사용')||page.value!=='1'||number.value!=='1'||button.matches(':disabled'))throw Error('Expected unused own source199 relation1/1 plus original13');
  for(const input of [page,number]){input.value='2';input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));}
  const events=[];
  const after=new Promise((resolve,reject)=>{
    const listener=e=>{if(e.detail.elt!==button)return;events.push({event:e.type,status:e.detail.xhr?.status,successful:e.detail.successful});};
    const swapped=e=>{if(e.target.id!=='productCurrent')return;const fresh=current.querySelector('[hx-post="/item/all/product-update.donga?productId=199"]')?.closest('tr');if(fresh?.querySelector('[name="mapPageNum"]')?.value==='2'&&fresh.querySelector('[name="mapQuestionNum"]')?.value==='2'){cleanup();resolve();}};
    const timer=setTimeout(()=>{cleanup();reject(Error('Outcome uncertain: reconcile independent GET before any retry'));},6000);
    function cleanup(){clearTimeout(timer);document.body.removeEventListener('htmx:afterRequest',listener);document.body.removeEventListener('htmx:afterSwap',swapped);}
    document.body.addEventListener('htmx:afterRequest',listener);document.body.addEventListener('htmx:afterSwap',swapped);
  });
  button.click();await after;
  return {clickedOnce:true,sourceId:199,itemId:2089216,page:'2',questionNum:'2',events,currentText:current.innerText,count:document.getElementById('productCountText').innerText};
})()
