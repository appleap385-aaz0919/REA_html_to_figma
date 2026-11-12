(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Development only');
 const ids=[2089216,2089239,2089240,2089246];
 const memberships=await Promise.all(ids.map(async itemId=>{const r=await fetch('/item/all/twins.donga?itemId='+itemId,{credentials:'same-origin'});if(!r.ok||r.redirected)throw Error('Owned membership unavailable '+itemId);const d=new DOMParser().parseFromString(await r.text(),'text/html');d.querySelectorAll('script,style,template').forEach(e=>e.remove());return {itemId,httpStatus:r.status,text:d.body.textContent.trim(),rows:[...d.querySelectorAll('tbody tr')].map(e=>({text:e.textContent.trim(),links:[...e.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))}))};}));
 const histories=await Promise.all([2089216,2089239].map(async itemId=>{const r=await fetch('/item/all/twin-histories.donga?itemId='+itemId,{credentials:'same-origin'});if(!r.ok||r.redirected)throw Error('Owned history unavailable');return {itemId,histories:await r.json()};}));return {memberships,histories};
})()
