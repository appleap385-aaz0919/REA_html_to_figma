(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const expected={"299": "\ub514\ud53c\ub2c8\uc158 \ubb38\ud56d \uc0d8\ud50c.zip"},limit=5*1024*1024;
 const documents=await Promise.all([299].map(async examDocumentId=>{
  const detail=await fetch('/item/difi/detail.donga?examDocumentId='+examDocumentId+'&curriculum=22',{credentials:'same-origin',signal:AbortSignal.timeout(15000)});if(!detail.ok||detail.redirected)throw Error('Observed original detail unavailable '+examDocumentId);
  const doc=new DOMParser().parseFromString(await detail.text(),'text/html'),button=[...doc.querySelectorAll('[data-download-url]')].find(e=>e.dataset.downloadName===expected[examDocumentId]);if(!button)throw Error('Exact observed original download control required '+examDocumentId);
  const fileUrl=new URL(button.dataset.downloadUrl,location.origin);if(fileUrl.origin!==location.origin||!fileUrl.pathname.endsWith('.zip')||fileUrl.search)throw Error('Expected observed same-origin ZIP file path');
  const proxy='/file/download.donga?url='+encodeURIComponent(button.dataset.downloadUrl)+'&name='+encodeURIComponent(button.dataset.downloadName),response=await fetch(proxy,{credentials:'same-origin',signal:AbortSignal.timeout(15000)}),type=response.headers.get('content-type');
  if(!response.ok||response.redirected||type?.includes('text/'))return {examDocumentId,name:expected[examDocumentId],httpStatus:response.status,type,redirected:response.redirected,message:(await response.text()).slice(0,500)};
  const declared=Number(response.headers.get('content-length'));if(declared>limit){await response.body?.cancel();return {examDocumentId,name:expected[examDocumentId],httpStatus:response.status,type,declaredBytes:declared,bodyRetained:false,reason:'Scoped5MiBcapturelimit'};}
  const reader=response.body.getReader(),chunks=[];let size=0;
  for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();return {examDocumentId,name:expected[examDocumentId],httpStatus:response.status,type,bodyRetained:false,reason:'Scoped5MiBcapturelimit'};}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}const sha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  return {examDocumentId,name:expected[examDocumentId],method:'Read-only exact UI file proxy GET',httpStatus:response.status,type,bytes:size,magic:[...bytes.slice(0,4)],sha256,fileBase64:btoa(binary)};
 }));return {method:'Read-only original299 archives; no CMS registration or modification',documents};
})()
