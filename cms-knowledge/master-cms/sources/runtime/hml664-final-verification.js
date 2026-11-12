(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/hml/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='664')throw Error('Expected approved own QA664');
 const main=document.querySelector('.page-wrapper'),download=main.querySelector('[data-download-url]'),list=main.querySelector('a[href^="/item/hml/list.donga"]');
 if(!download||!list)throw Error('Observed download/list controls absent');
 const visibleBlocks=[...new Set([...main.querySelectorAll('.qv-item')].map(e=>e.closest('.card')))].filter(Boolean).map(c=>({header:c.querySelector('.card-header')?.innerText,links:[...c.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(e=>e.getAttribute('href'))}));
 const [file,listResponse,original]=await Promise.all([
  fetch('/file/download.donga?url='+encodeURIComponent(download.dataset.downloadUrl)+'&name='+encodeURIComponent(download.dataset.downloadName),{signal:AbortSignal.timeout(15000)}),
  fetch(list.getAttribute('href'),{signal:AbortSignal.timeout(15000)}),
  fetch('/item/hml/detail.donga?examDocumentId=101&curriculum=22&pageNum=1&pageSize=100',{signal:AbortSignal.timeout(15000)})
 ]);
 if([file,listResponse,original].some(r=>!r.ok||r.redirected))throw Error('Scoped read-only final verification failed');
 const [buffer,listHtml,originalHtml]=await Promise.all([file.arrayBuffer(),listResponse.text(),original.text()]);
 if(buffer.byteLength>1024*1024)throw Error('Unexpected QA HML file size');
 const sha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(x=>x.toString(16).padStart(2,'0')).join('');
 const listDoc=new DOMParser().parseFromString(listHtml,'text/html'),originalDoc=new DOMParser().parseFromString(originalHtml,'text/html');
 const rows=[...listDoc.querySelectorAll('.page-wrapper table tbody tr')].map(tr=>[...tr.querySelectorAll('td')].map(e=>e.textContent.replace(/\s+/g,' ').trim()));
 const originalMain=originalDoc.querySelector('.page-wrapper');
 return {method:'Actual current DOM plus parallel read-only GETs to observed controls/known original',visibleBlocks,
  uploadedFile:{status:file.status,bytes:buffer.byteLength,sha256,equalsSubmittedAndOriginal:sha256==='8c8904ebea48b0bcd1bdcb68040479e55ca88d24bf3d9e0cd4a36918ec1e419a'},
  currentListQaRows:rows.filter(row=>row[0]==='664'),
  original101:{status:original.status,itemLinks:[...originalMain.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(a=>a.getAttribute('href')),questionModels:originalMain.querySelectorAll('.qv-item script[type="application/json"]').length,paperReg:[...originalMain.querySelectorAll('[name=paperRegYn]')].map(e=>({value:e.value,checked:e.checked,disabled:e.disabled}))},
  scroll:{top:main.scrollTop,height:main.clientHeight,total:main.scrollHeight}};
})()
