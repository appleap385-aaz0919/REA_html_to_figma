(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/modify.donga'||new URLSearchParams(location.search).get('paperId')!=='1094')throw Error('Own paper1094 required');
 const t=document.querySelector('#paperItemTable'),before=[...t.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId);
 if(before.join(',')!=='2089242,2089243,2089244,2089245,2089238')throw Error('Unexpected before order');
 const s=window.Sortable?.get?.(t);if(!s||typeof s.sort!=='function'||typeof s.option('onEnd')!=='function'||s.toArray().length!==2)throw Error('Observed sorting API unavailable');
 s.sort(s.toArray().slice().reverse(),false);s.option('onEnd').call(s,{from:t,to:t});
 const after=[...t.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId);if(after.join(',')!=='2089238,2089242,2089243,2089244,2089245')throw Error('Unexpected after order');
 return {inputMethod:'Observed Sortable.sort API and registered onEnd callback; pointer drag unverified in this run',before,after,sequences:[...t.querySelectorAll('[data-seq]')].map(e=>e.textContent),groups:[...t.querySelectorAll(':scope>tbody')].map(g=>({passageId:g.dataset.passageId,itemIds:[...g.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId)}))};
})()
