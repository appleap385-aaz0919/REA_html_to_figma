(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/hml/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='664'||document.querySelector('.modal.show'))throw Error('Expected own clean QA664');
 const selects=[...document.querySelectorAll('select[data-exam-judge]')],expected=Array.from({length:18},(_,i)=>String(2089215+i));
 if(selects.length!==18||selects.some((e,i)=>e.dataset.itemIds!==expected[i]||e.value!=='S'))throw Error('Expected actual recorded18 own single blocks and original S values');
 selects.forEach((e,i)=>{e.value=i===0?'F':i===1?'S':'D';e.dispatchEvent(new Event('change',{bubbles:true}));});
 return {action:'Local actual judge controls changed; no final form submission',judges:selects.map(e=>({block:e.dataset.blockNo,itemIds:e.dataset.itemIds,value:e.value})),success:['2089216'],failed:['2089215'],deleted:expected.slice(2)};
})()
