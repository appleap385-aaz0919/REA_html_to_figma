(async () => {
  if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216')throw Error('Own QA item only');
  const paths=['/item/all/twin-histories.donga?itemId=2089216','/item/all/twins.donga?itemId=2089216'];
  return await Promise.all(paths.map(async path=>{
    const response=await fetch(path,{credentials:'same-origin'});
    if(!response.ok||response.redirected)throw Error('Readback failed '+response.status);
    if(path.includes('histories'))return {path,status:response.status,histories:await response.json()};
    const doc=new DOMParser().parseFromString(await response.text(),'text/html');doc.querySelectorAll('script,style,template').forEach(e=>e.remove());
    return {path,status:response.status,text:doc.body.textContent.trim(),links:[...doc.querySelectorAll('a[href]')].map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')})),forms:[...doc.querySelectorAll('form')].map(e=>({action:e.getAttribute('action'),'hx-post':e.getAttribute('hx-post')}))};
  }));
})()
