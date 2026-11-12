(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||!/^\/item\/(hml|difi)\/form\.donga$/.test(location.pathname))throw Error('Registration form scope mismatch');
 const f=document.querySelector('#examForm'),instances=window.Dropzone?.instances||[];
 return {url:location.href,uploadEvents:window.__cmsQaUploadEvents||[],dropzones:instances.map(d=>({elementId:d.element?.id,maxFiles:d.options?.maxFiles,maxFilesize:d.options?.maxFilesize,acceptedFiles:d.options?.acceptedFiles,files:(d.files||[]).map(x=>({name:x.name,size:x.size,type:x.type,status:x.status,accepted:x.accepted,previewText:x.previewElement?.innerText})),acceptedCount:d.getAcceptedFiles?.().length})),
  fileInputs:[...document.querySelectorAll('input[type=file]')].map(e=>({id:e.id,classes:e.className,accept:e.accept,multiple:e.multiple,disabled:e.disabled})),
  form:{action:f?.getAttribute('action'),request:f?.getAttribute('hx-post'),submitDisabled:f?.querySelector('button[type=submit]')?.disabled,documentId:f?.querySelector('[name=examDocumentId]')?.value,
   fields:[...(f?.querySelectorAll('input,select,textarea')||[])].filter(e=>!/(csrf|token|filePath|fileOrgName)/i.test(e.name)).map(e=>({id:e.id,name:e.name,type:e.type,value:e.value,required:e.required,disabled:e.disabled,valid:e.validity.valid,message:e.validationMessage,maxLength:e.maxLength,min:e.min,max:e.max,optionCount:e.tagName==='SELECT'?e.options.length:undefined}))},
  alerts:[...document.querySelectorAll('[role=alert]')].map(e=>e.innerText),modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),
  scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight}))};
})()
