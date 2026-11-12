(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Authorized CMS only');
 const query='22MMAT0',path='/learning/unit/codes.donga?q='+encodeURIComponent(query);
 const r=await fetch(path,{signal:AbortSignal.timeout(15000)});if(!r.ok||r.redirected)throw Error('Observed unit autocomplete GET failed');
 const values=await r.json();return {method:'Read-only actual unit autocomplete endpoint from registration source',query,status:r.status,values};
})()
