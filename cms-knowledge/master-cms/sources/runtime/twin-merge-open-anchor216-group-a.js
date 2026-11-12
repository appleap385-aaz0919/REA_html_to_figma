(async()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||document.querySelector('.modal.show'))throw Error('Clean own216 anchor required');
 const m=document.querySelector('#itemTwinModal'),r=document.querySelector('#twinCurrent');
 const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Twin modal show timeout')),7000);m.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve();},{once:true});});
 const loaded=new Promise((resolve,reject)=>{const timer=setTimeout(()=>{o.disconnect();reject(Error('GroupA load timeout'));},10000);const check=()=>{const t=r.innerText;if(t.includes('2089216')&&t.includes('2089240')&&!t.includes('2089239')){o.disconnect();clearTimeout(timer);resolve();}};const o=new MutationObserver(check);o.observe(r,{childList:true,subtree:true});check();});
 document.querySelector('[data-bs-target="#itemTwinModal"]').click();await Promise.all([shown,loaded]);return {shown:true,currentText:r.innerText};
})()
