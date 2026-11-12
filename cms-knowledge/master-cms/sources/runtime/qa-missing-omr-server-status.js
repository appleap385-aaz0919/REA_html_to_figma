(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Authorized Master only');
 const r=await fetch('/item/all/detail.donga?itemId=2089238',{signal:AbortSignal.timeout(15000)});if(!r.ok||r.redirected)throw Error('Own negative-trial item unavailable');
 const d=new DOMParser().parseFromString(await r.text(),'text/html'),f=d.getElementById('statusForm'),selected=f?.querySelector('[name=viewFlag]:checked');
 if(selected?.value!=='R')throw Error('Negative approval trial unexpectedly changed saved status; inspect before continuing');
 return {method:'Independent read-only GET after blocked Save and local cancel',itemId:2089238,status:r.status,savedViewFlag:selected.value,statusRequest:f.getAttribute('hx-post'),savedOmr:d.querySelector('.omr-preview-btn')?.getAttribute('data-saved-omr')||null};
})()
