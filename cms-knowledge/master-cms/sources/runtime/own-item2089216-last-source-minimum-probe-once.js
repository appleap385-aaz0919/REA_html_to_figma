(() => {
  if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show'))throw Error('Own source modal required');
  const current=document.getElementById('productCurrent'),button=current.querySelector('[hx-post="/item/all/product-remove.donga?productId=13"]');
  if(current.querySelectorAll('[data-product-row]').length!==1||!button||button.matches(':disabled'))throw Error('Only one original source13 expected for client minimum guard probe');
  const observed=[];const listener=e=>{if(e.detail.elt===button)observed.push(e);};
  document.addEventListener('htmx:beforeRequest',listener,true);
  try {button.click();} finally {document.removeEventListener('htmx:beforeRequest',listener,true);}
  return {clickedOnce:true,expectedRejected:true,beforeRequestEvents:observed.map(e=>({defaultPrevented:e.defaultPrevented})),alerts:[...document.querySelectorAll('[role="alert"],.toast')].map(e=>e.innerText),retainedRowCount:current.querySelectorAll('[data-product-row]').length,count:document.getElementById('productCountText').innerText};
})()
