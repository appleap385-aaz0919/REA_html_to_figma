(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='530')throw Error('Expected Definition530');
 const b=document.querySelector('[data-download-url][data-download-name="750774.zip"]');
 if(!b)throw Error('Observed download control missing');
 const url='/file/download.donga?url='+encodeURIComponent(b.dataset.downloadUrl)+'&name='+encodeURIComponent(b.dataset.downloadName);
 const response=await fetch(url,{signal:AbortSignal.timeout(15000)});
 const type=response.headers.get('content-type');
 if(!response.ok||response.redirected||type?.includes('text/'))return {method:'Read-only GET to the exact proxy used by the rendered control',status:response.status,type,redirected:response.redirected,message:(await response.text()).slice(0,500)};
 const buf=await response.arrayBuffer(),bytes=new Uint8Array(buf);
 if(bytes.length>5*1024*1024)throw Error('File exceeds scoped capture limit; no body retained');
 const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buf))].map(x=>x.toString(16).padStart(2,'0')).join('');
 let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
 return {method:'Read-only GET to the exact proxy used by the rendered control; pointer-download outcome separate',status:response.status,type,redirected:response.redirected,size:bytes.length,magic:[...bytes.slice(0,4)],sha256:digest,fileBase64:btoa(binary)};
})()
