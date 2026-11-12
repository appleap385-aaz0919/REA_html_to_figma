(() => {
  if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show'))throw Error('Own current source modal required');
  return {count:document.getElementById('productCountText').innerText,visibility:document.visibilityState,rows:[...document.querySelectorAll('#productCurrent tbody tr')].map(row=>({text:row.innerText,fields:[...row.querySelectorAll('input')].map(e=>({name:e.name,value:e.value,disabled:e.matches(':disabled')})),actions:[...row.querySelectorAll('[hx-post]')].map(e=>({text:e.innerText,path:e.getAttribute('hx-post'),disabled:e.matches(':disabled')}))}))};
})()
