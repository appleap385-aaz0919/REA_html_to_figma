(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const ids=[2089216,2089239,2089240,2089387];
 const memberships=await Promise.all(ids.map(async itemId=>{const path='/item/all/twins.donga?itemId='+itemId,r=await fetch(path,{credentials:'same-origin'});if(!r.ok||r.redirected)throw Error('Membership unavailable '+itemId);const d=new DOMParser().parseFromString(await r.text(),'text/html');d.querySelectorAll('script,style,template').forEach(e=>e.remove());return {itemId,path,httpStatus:r.status,text:d.body.textContent.trim(),rows:[...d.querySelectorAll('tbody tr')].map(e=>({text:e.textContent.trim(),attributes:{...e.dataset},links:[...e.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))}))};}));
 const r=await fetch('/item/all/twin-histories.donga?itemId=2089216',{credentials:'same-origin'});if(!r.ok||r.redirected)throw Error('Anchor history unavailable');return {memberships,anchorHistories:await r.json()};
})()
