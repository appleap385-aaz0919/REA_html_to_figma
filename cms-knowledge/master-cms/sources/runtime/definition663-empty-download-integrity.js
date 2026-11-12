(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='663')throw Error('Expected own empty QA663');
 const b=document.querySelector('[data-download-name="QA-DIFI-20261109-03-EMPTY.zip"]');if(!b)throw Error('Observed QA download control absent');
 const r=await fetch('/file/download.donga?url='+encodeURIComponent(b.dataset.downloadUrl)+'&name='+encodeURIComponent(b.dataset.downloadName),{signal:AbortSignal.timeout(15000)});
 if(!r.ok||r.redirected)throw Error('Download integrity GET failed');
 const buffer=await r.arrayBuffer();if(buffer.byteLength>1000)throw Error('Unexpected empty ZIP size');
 const sha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(x=>x.toString(16).padStart(2,'0')).join('');
 return {method:'Read-only GET through actual observed download proxy',status:r.status,type:r.headers.get('content-type'),bytes:buffer.byteLength,sha256,equalsSubmittedEmptyFixture:sha256==='8739c76e681f900923b900c9df0ef75cf421d39cabb54650c4b9ad19b6a76d85'};
})()
