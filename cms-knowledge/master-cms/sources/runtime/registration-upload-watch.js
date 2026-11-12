(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/form.donga')throw Error('ZIP registration scope mismatch');
 const d=window.Dropzone?.instances?.find(x=>x.element?.id==='hmlDropzone');
 if(!d)throw Error('Expected live upload Dropzone');
 if(window.__cmsQaUploadEvents)throw Error('Event observer already attached; do not duplicate');
 window.__cmsQaUploadEvents=[];
 for(const name of ['addedfile','error','removedfile','maxfilesexceeded','success'])d.on(name,(file,message)=>{
  const row={event:name,name:file?.name,size:file?.size,status:file?.status,accepted:file?.accepted};
  if(name==='error')row.message=typeof message==='string'?message:'Non-string upload error';
  window.__cmsQaUploadEvents.push(row);
 });
 return {observer:'Non-mutating Dropzone event listener attached',events:window.__cmsQaUploadEvents,acceptedFiles:d.options.acceptedFiles};
})()
