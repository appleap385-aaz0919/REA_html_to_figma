(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/hml/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='101')throw Error('Expected observed original HML101');
 const b=document.querySelector('[data-download-url]');if(!b)throw Error('Download control absent');
 const r=await fetch('/file/download.donga?url='+encodeURIComponent(b.dataset.downloadUrl)+'&name='+encodeURIComponent(b.dataset.downloadName),{signal:AbortSignal.timeout(15000)});
 if(!r.ok||r.redirected)return {status:r.status,type:r.headers.get('content-type'),redirected:r.redirected,error:(await r.text()).slice(0,300)};
 const buffer=await r.arrayBuffer(),bytes=new Uint8Array(buffer);if(bytes.length>10*1024*1024)throw Error('Scoped10MiB original-file capture limit exceeded');
 const sha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(x=>x.toString(16).padStart(2,'0')).join('');
 let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
 return {method:'Read-only exact download-proxy GET from original HML101 control',status:r.status,type:r.headers.get('content-type'),name:b.dataset.downloadName,path:b.dataset.downloadUrl,size:bytes.length,sha256,head:[...bytes.slice(0,32)],fileBase64:btoa(binary)};
})()
