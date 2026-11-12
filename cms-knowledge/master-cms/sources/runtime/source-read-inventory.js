(async()=>{
 const url=new URL('/product/list.donga?curriculum=22&pageSize=100&pageNum=1',location.origin);
 const response=await fetch(url,{credentials:'same-origin'});
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');
 const rows=Array.from(doc.querySelectorAll('tr')).map(row=>({cells:Array.from(row.querySelectorAll('td')).map(e=>e.textContent.trim()),
   href:row.querySelector('a[href]')?.getAttribute('href')})).filter(row=>row.cells.length===13&&/^\d+$/.test(row.cells[0]));
 return {url:url.href,status:response.status,rows,count:rows.length,
   note:'Read-only list GET using observed page-size100 UI contract; rendered DOM fields only.'};
})()
