(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('examDocumentId')!=='664')throw Error('Expected QA HML664');
 const link=[...document.querySelectorAll('a[href]')].find(a=>a.textContent.includes('평가지 관리'));if(!link)throw Error('Observed paper navigation absent');
 const url=new URL(link.getAttribute('href'),location.href);if(url.origin!==location.origin||url.pathname!=='/paper/list.donga')throw Error('Unexpected paper navigation');
 url.searchParams.set('curriculum','22');url.searchParams.set('pageSize','100');
 const r=await fetch(url,{signal:AbortSignal.timeout(15000)});if(!r.ok||r.redirected)throw Error('Observed paper list GET failed');
 const d=new DOMParser().parseFromString(await r.text(),'text/html');
 const tables=[...d.querySelectorAll('.page-wrapper table')].filter(t=>!t.closest('.modal'));
 const rows=tables.flatMap(t=>[...t.querySelectorAll('tbody tr')]).map(tr=>({cells:[...tr.querySelectorAll('td')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),links:[...tr.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))}));
 return {method:'Read-only GET of observed Master paper-list navigation with known curriculum/pageSize parameters',url:url.href,status:r.status,rowsOnPage:rows.length,matchingRows:rows.filter(row=>row.cells.some(s=>s.includes('QA-HML-20261109-01-SET'))),firstRows:rows.slice(0,2)};
})()
