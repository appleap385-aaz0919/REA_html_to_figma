(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('paperId')!=='1093')throw Error('Own paper detail only');
 const links=[...document.querySelectorAll('.page-wrapper a[href]')].filter(e=>e.innerText.includes('미배포 문항 1건 조회'));if(links.length!==2||links[0].getAttribute('href')!==links[1].getAttribute('href'))throw Error('Expected both observed diagnostic links');
 const href=links[0].getAttribute('href'),u=new URL(href,location.origin);if(u.pathname!=='/item/all/list.donga'||u.searchParams.get('keyword')!=='2089216')throw Error('Expected own item lookup');
 const response=await fetch(href,{credentials:'same-origin'});if(!response.ok||response.redirected)throw Error('Lookup unavailable');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');const rows=[...doc.querySelectorAll('.page-wrapper table tbody tr')].map(e=>({text:e.textContent.replace(/\s+/g,' ').trim(),links:[...e.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))}));
 return {observedLookupHref:href,httpStatus:response.status,keyword:doc.querySelector('[name=keyword]')?.value,keywordType:doc.querySelector('[name=keywordType]')?.value,rowCount:rows.length,rows:rows.filter(r=>r.text.includes('2089216')),serviceDeploymentSubmitted:false};
})()
