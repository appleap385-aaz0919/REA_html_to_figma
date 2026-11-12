(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/hml/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='664')throw Error('Expected new QA HML664');
 const judges=[...document.querySelectorAll('select[data-exam-judge]')];if(!judges.length)throw Error('Expected draft judge controls');
 const blocks=judges.map(select=>{
  const card=select.closest('.card'),models=[...card.querySelectorAll('.qv-item script[type="application/json"]')].map(e=>JSON.parse(e.textContent));
  return {blockNo:select.dataset.blockNo,itemIds:select.dataset.itemIds.split(','),judge:select.value,header:card.querySelector('.card-header')?.innerText,
   models:models.map(m=>({outType:m.outType,prompt:m.content?.promptText,choices:m.content?.choices,answer:m.content?.answerText,grading:m.grading,assetCount:m.assets?.length})),
   links:[...card.querySelectorAll('a[href]')].map(e=>({text:e.innerText,href:e.getAttribute('href')})),
   visibleText:card.innerText.replace(/\s+/g,' ').slice(0,500)};
 });
 return {url:location.href,visibility:document.visibilityState,blockCount:blocks.length,questionCount:blocks.reduce((n,b)=>n+b.itemIds.length,0),blocks,paperReg:[...document.querySelectorAll('[name=paperRegYn]')].map(e=>({value:e.value,checked:e.checked})),remark:document.querySelector('[name=remark]')?.value,modals:[...document.querySelectorAll('.modal.show')].map(e=>e.id)};
})()
