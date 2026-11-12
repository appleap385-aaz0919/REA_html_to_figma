(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('examDocumentId')!=='665')throw Error('Expected own QA665');
 const main=document.querySelector('.page-wrapper'),download=main.querySelector('[data-download-url]');if(!download)throw Error('Observed own download missing');
 const childIds=['2089234','2089235','2089236','2089237'];
 const paths=[
  '/item/hml/detail.donga?examDocumentId=665&curriculum=22&pageNum=1&pageSize=100',
  '/paper/list.donga?curriculum=22&pageNum=1&pageSize=100',
  '/file/download.donga?url='+encodeURIComponent(download.dataset.downloadUrl)+'&name='+encodeURIComponent(download.dataset.downloadName),
  ...childIds.map(id=>'/item/all/detail.donga?itemId='+id)
 ];
 const responses=await Promise.all(paths.map(path=>fetch(path,{signal:AbortSignal.timeout(15000)})));
 if(responses.slice(0,3).some(r=>!r.ok||r.redirected))throw Error('Read-only QA outcome verification failed');
 const [docHtml,paperHtml,buffer]=await Promise.all([responses[0].text(),responses[1].text(),responses[2].arrayBuffer()]);
 if(buffer.byteLength>100000)throw Error('Unexpected bounded set fixture size');
 const sha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(x=>x.toString(16).padStart(2,'0')).join('');
 const d=new DOMParser().parseFromString(docHtml,'text/html'),p=new DOMParser().parseFromString(paperHtml,'text/html'),content=d.querySelector('.page-wrapper');
 const cards=[...new Set([...content.querySelectorAll('.qv-item')].map(e=>e.closest('.card')))].filter(Boolean);
 const blocks=cards.map(card=>{const clone=card.cloneNode(true);clone.querySelectorAll('script,style,template').forEach(e=>e.remove());return {header:card.querySelector('.card-header')?.textContent.replace(/\s+/g,' ').trim(),text:clone.textContent.replace(/\s+/g,' ').trim().slice(0,1600),itemLinks:[...card.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(e=>e.getAttribute('href'))};});
 const clean=content.cloneNode(true);clean.querySelectorAll('script,style,template').forEach(e=>e.remove());
 const rows=[...p.querySelectorAll('.page-wrapper table tbody tr')].map(tr=>({cells:[...tr.querySelectorAll('td')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),links:[...tr.querySelectorAll('a[href]')].map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')}))}));
 const deletedItemReads=responses.slice(3).map((r,i)=>({itemId:childIds[i],status:r.status,redirected:r.redirected,responsePath:new URL(r.url).pathname}));
 await Promise.all(responses.slice(3).map(r=>r.body?.cancel()));
 return {method:'Parallel read-only verification of observed/known own QA routes; returned HTML parsed inertly',document:{prefix:clean.textContent.replace(/\s+/g,' ').trim().slice(0,900),blocks,paperReg:[...content.querySelectorAll('[name=paperRegYn]')].map(e=>({value:e.value,checked:e.checked,disabled:e.disabled}))},
  generatedPaperRows:rows.filter(row=>row.cells.some(s=>s.includes('QA-HML-20261109-02-SET4-SINGLE1'))),paperRowsOnPage:rows.length,
  deletedItemReads,uploadedFile:{bytes:buffer.byteLength,sha256,equalsSubmittedFixture:sha256==='97b8d8d0a4e6649c2b7375ea82ccd86bad6595e2ec76ffabb96b4b3401590701'},
  limit:'Deleted-child route behavior does not establish physical deletion of shared passage or database records.'};
})()
