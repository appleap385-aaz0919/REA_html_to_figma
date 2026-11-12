(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/modify.donga'||new URL(location.href).searchParams.get('paperId')!=='341')throw Error('Paper341 edit required');
 const t=document.querySelector('#paperItemTable'),before=[...t.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId);
 if(JSON.stringify(before)!==JSON.stringify(["2087758", "2087759", "2087760", "2087755"]))throw Error('Unexpected initial member order');
 const s=window.Sortable?.get?.(t);if(!s||typeof s.sort!=='function'||typeof s.option('onEnd')!=='function')throw Error('Observed sorting API unavailable');
 s.sort(s.toArray().slice().reverse(),false);s.option('onEnd').call(s,{from:t,to:t});
 const after=[...t.querySelectorAll('tr[data-item-id]')].map(e=>e.dataset.itemId);if(JSON.stringify(after)!==JSON.stringify(["2087755", "2087758", "2087759", "2087760"]))throw Error('Unexpected reordered members');
 return {inputMethod:'Observed Sortable.sort API and registered onEnd callback; pointer drag remains unverified',before,after,sequences:[...t.querySelectorAll('[data-seq]')].map(e=>e.innerText)};
})()