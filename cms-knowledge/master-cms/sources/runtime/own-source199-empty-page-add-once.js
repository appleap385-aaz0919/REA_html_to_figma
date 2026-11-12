(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemProductModal.show')||window.__qaSource199EmptyAddAttempted)throw Error('Own source add modal only');
 const buttons=[...document.querySelectorAll('#itemProductAddResult button[hx-post]')].filter(e=>new URL(e.getAttribute('hx-post'),location.origin).searchParams.get('productId')==='199');
 if(buttons.length!==1||buttons[0].matches(':disabled'))throw Error('Own source eligible Add required');const button=buttons[0],row=button.closest('tr');
 if(row.querySelector('[name=mapPageNum]').value||document.querySelector('#itemProductFilter [name=anchorItemId]').value!=='2089216')throw Error('Expected own blank page probe');
 window.__qaSource199EmptyAddAttempted=true;let request=null;
 const observe=e=>{const c=e.detail.requestConfig;if(c?.path?.startsWith('/item/all/product-add.donga'))request={path:c.path,verb:c.verb,values:Object.fromEntries(['anchorItemId','mapPageNum','mapQuestionNum'].map(k=>[k,c.parameters?.[k]]))};};
 document.body.addEventListener('htmx:beforeRequest',observe);button.click();document.body.removeEventListener('htmx:beforeRequest',observe);
 return {clickedOnce:true,itemId:2089216,sourceId:199,mapPageNum:'',request};
})()
