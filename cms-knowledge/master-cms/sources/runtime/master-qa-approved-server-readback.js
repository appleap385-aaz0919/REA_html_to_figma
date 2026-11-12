(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Authorized Master only');
 const r=await fetch('/item/all/detail.donga?itemId=2089216',{signal:AbortSignal.timeout(15000)});if(!r.ok||r.redirected)throw Error('Own approved-item read failed');
 const d=new DOMParser().parseFromString(await r.text(),'text/html'),f=d.getElementById('statusForm'),selected=f?.querySelector('[name=viewFlag]:checked'),main=d.querySelector('.page-wrapper');
 const actions=[...main.querySelectorAll('[data-twin-generate],button')].filter(e=>e.hasAttribute('data-twin-generate')||e.textContent.includes('배포하기')).map(e=>({text:e.textContent.trim(),disabled:e.disabled,classes:e.className,dataset:{...e.dataset}}));
 return {method:'Independent read-only server GET after actual status save',status:r.status,itemId:2089216,savedViewFlag:selected?.value,fieldsLocked:d.getElementById('statusFields')?.disabled,
  savedValues:{onlineFlag:f?.elements.onlineFlag?.value,serviceUsage:f?.elements.serviceUsage?.value},
  radioPolicy:[...f.querySelectorAll('[name=viewFlag]')].map(e=>({value:e.value,checked:e.checked,individualDisabled:e.disabled})),
  itemIdentity:[...main.querySelectorAll('dl dt')].filter(e=>e.textContent.includes('문항 ID')).map(e=>e.nextElementSibling?.textContent.trim()),actions};
})()
