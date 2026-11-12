(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const response=await fetch('/item/all/detail.donga?itemId=2089216',{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Own item unavailable');const doc=new DOMParser().parseFromString(await response.text(),'text/html');
 return {itemId:2089216,httpStatus:response.status,values:[...doc.querySelectorAll('.page-wrapper dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.replace(/\s+/g,' ').trim()})),viewFlag:doc.querySelector('#statusForm input[name=viewFlag][checked]')?.value,sourceCount:doc.getElementById('productCountText')?.textContent.trim(),omr:doc.querySelector('.omr-preview-btn')?.getAttribute('data-saved-omr'),answer:doc.querySelector('.omr-preview-btn')?.getAttribute('data-saved-answer')};
})()
