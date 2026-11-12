(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='694')throw Error('Expected own QA694');
 const b=document.querySelector('[data-download-name="QA-DIFI-20261110-04-MULTI3.zip"]');if(!b)throw Error('Observed QA download control absent');
 const r=await fetch('/file/download.donga?url='+encodeURIComponent(b.dataset.downloadUrl)+'&name='+encodeURIComponent(b.dataset.downloadName),{signal:AbortSignal.timeout(15000)});
 if(!r.ok||r.redirected)throw Error('Download integrity GET failed');
 const buffer=await r.arrayBuffer();if(buffer.byteLength>100000)throw Error('Unexpected QA ZIP size');
 const sha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(x=>x.toString(16).padStart(2,'0')).join('');
 return {method:'Read-only GET through actual observed download proxy',status:r.status,type:r.headers.get('content-type'),bytes:buffer.byteLength,sha256,equalsSubmittedFixture:sha256==='e53927cb286a91f50353b2f55b2dc8ff7d9c38a7d66fa8e606aa97a240f58171',fileUrlWithoutQuery:b.dataset.downloadUrl.split('?')[0],fileName:b.dataset.downloadName};
})()
