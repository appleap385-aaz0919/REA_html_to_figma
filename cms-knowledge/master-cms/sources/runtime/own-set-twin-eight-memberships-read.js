(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const ids=[2089242,2089243,2089244,2089245,2089358,2089359,2089360,2089361],results=[];
 for(let i=0;i<ids.length;i+=2){const batch=await Promise.all(ids.slice(i,i+2).map(async itemId=>{
  const [historyResponse,groupResponse]=await Promise.all([fetch('/item/all/twin-histories.donga?itemId='+itemId,{credentials:'same-origin'}),fetch('/item/all/twins.donga?itemId='+itemId,{credentials:'same-origin'})]);
  if(!historyResponse.ok||historyResponse.redirected||!groupResponse.ok||groupResponse.redirected)throw Error('Own set twin membership read unavailable '+itemId);
  const histories=await historyResponse.json(),doc=new DOMParser().parseFromString(await groupResponse.text(),'text/html');doc.querySelectorAll('script,style,template').forEach(e=>e.remove());
  return {itemId,histories,groupText:doc.body.textContent.replace(/\s+/g,' ').trim(),countNodes:[...doc.querySelectorAll('#twinCountText,#twinCountBadge')].map(e=>({id:e.id,text:e.textContent.trim()})),tables:[...doc.querySelectorAll('table')].map(table=>({heading:table.closest('.card')?.querySelector('.card-header')?.textContent.replace(/\s+/g,' ').trim(),rows:[...table.querySelectorAll('tbody tr')].map(row=>({cells:[...row.querySelectorAll('td')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),actions:[...row.querySelectorAll('button')].map(e=>({text:e.textContent.trim(),disabled:e.matches(':disabled'),attributes:{...e.dataset},post:e.getAttribute('hx-post')}))}))}))};
 }));results.push(...batch);}return {method:'Read-only GETs, four requests maximum in flight, original and new four-child sets',results};
})()
