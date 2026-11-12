(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const url='/item/all/detail.donga?itemId=2089240';const response=await fetch(url,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Observed AI child unavailable');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');
 for(const node of doc.querySelectorAll('input,meta'))if(/csrf|password|access.?token|refresh.?token/i.test(node.getAttribute('name')||''))node.remove();
 for(const node of doc.querySelectorAll('*'))for(const attr of [...node.attributes])if(/csrf|nonce|auth.?token/i.test(attr.name))node.removeAttribute(attr.name);
 const preview=doc.querySelector('.omr-preview-btn');
 return {url:new URL(url,location.origin).href,title:doc.title,html:'<!DOCTYPE html>\n'+doc.documentElement.outerHTML,redaction:'Password/CSRF/token nodes and nonce/token attributes removed; cookies/storage never read.',viewFlag:doc.querySelector('#statusForm input[name=viewFlag][checked]')?.value,values:[...doc.querySelectorAll('.page-wrapper dl dt')].map(e=>({label:e.textContent.trim(),value:e.nextElementSibling?.textContent.trim()})),omr:preview?{type:preview.dataset.questionType,savedOmr:JSON.parse(preview.getAttribute('data-saved-omr')||'null'),savedAnswer:JSON.parse(preview.getAttribute('data-saved-answer')||'null')}:null,images:[...doc.querySelectorAll('.page-wrapper img')].map(e=>({alt:e.alt,src:e.getAttribute('src')})),modelScripts:[...doc.querySelectorAll('.qv-item script[type="application/json"]')].map(e=>JSON.parse(e.textContent))};
})()
