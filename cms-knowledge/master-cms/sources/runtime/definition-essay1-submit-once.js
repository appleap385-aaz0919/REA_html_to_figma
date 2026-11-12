(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/form.donga'||document.querySelector('.modal.show'))throw Error('Own Definition registration form only');
 const f=document.getElementById('examForm'),dz=window.Dropzone?.instances.find(x=>x.element?.id==='hmlDropzone'),files=dz?.getAcceptedFiles();
 if(window.__qaDifiEssay1Attempted||!f||f.getAttribute('hx-post')!=='/item/difi/upload-url.donga'||files?.length!==1||files[0].name!=='QA-DIFI-20261110-07-ESSAY1.zip'||files[0].size!==951||f.elements.examDocumentId.value||f.elements.productId.value!=='13'||f.elements.unitCode.value!=='22MMAT0KOK1001020000'||f.elements.startPageNum.value!=='1'||f.elements.endPageNum.value!=='3'||f.elements.serviceUsage.value!=='C'||!f.checkValidity()||f.querySelector('button[type="submit"]').matches(':disabled'))throw Error('Actual file/form mismatch or already attempted; do not retry');
 const bytes=await files[0].arrayBuffer(),hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(hash!=='9337c39d6b88c84efb57b6c9b19cc5ce3787ad9347fcfa420744ce34aabdad5e')throw Error('Browser-selected ZIP hash mismatch');
 window.__qaDifiEssay1Events=[];
 document.body.addEventListener('examUploadReady',e=>window.__qaDifiEssay1Events.push({type:'examUploadReady',examDocumentId:e.detail?.examDocumentId,filePath:e.detail?.filePath,contentType:e.detail?.contentType}));
 document.body.addEventListener('htmx:afterRequest',e=>{const p=e.detail?.pathInfo?.requestPath||e.detail?.requestConfig?.path||'';if(p.includes('/item/difi/'))window.__qaDifiEssay1Events.push({type:'afterRequest',path:p.split('?')[0],status:e.detail?.xhr?.status,successful:e.detail?.successful,failed:e.detail?.failed});});
 dz.on('success',file=>window.__qaDifiEssay1Events.push({type:'filePutSuccess',fileName:file.name}));
 window.__qaDifiEssay1Attempted=true;
 f.querySelector('button[type="submit"]').click();
 return {submitClicked:true,attemptCount:1,fileName:files[0].name,hash,events:window.__qaDifiEssay1Events};
})()
