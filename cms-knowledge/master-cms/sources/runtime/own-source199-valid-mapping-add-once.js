(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show')||window.__qaSource199ValidAddAttempted)throw Error('Own mapping Add only');
 const buttons=[...document.querySelectorAll('#itemProductAddResult button[hx-post]')].filter(e=>new URL(e.getAttribute('hx-post'),location.origin).searchParams.get('productId')==='199');if(buttons.length!==1||buttons[0].matches(':disabled'))throw Error('One eligible own source required');const button=buttons[0],row=button.closest('tr');
 if(row.querySelector('[name=mapPageNum]').value!=='1'||row.querySelector('[name=mapQuestionNum]').value!=='1'||document.querySelector('#itemProductFilter [name=anchorItemId]').value!=='2089216')throw Error('Own mapping page/number mismatch');
 window.__qaSource199ValidAddAttempted=true;let request=null;
 const observe=e=>{const c=e.detail.requestConfig;if(c?.path?.startsWith('/item/all/product-add.donga'))request={path:c.path,verb:c.verb,values:Object.fromEntries(['anchorItemId','mapPageNum','mapQuestionNum'].map(k=>[k,c.parameters?.[k]]))};};
 document.body.addEventListener('htmx:beforeRequest',observe);button.click();document.body.removeEventListener('htmx:beforeRequest',observe);
 return {clickedOnce:true,itemId:2089216,sourceId:199,mapPageNum:'1',mapQuestionNum:'1',request};
})()
