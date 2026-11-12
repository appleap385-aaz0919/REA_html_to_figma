(() => {
  const form=document.querySelector('#paperModifyForm');
  return {url:location.href,fields:Array.from(form.querySelectorAll('input')).filter(e=>!/csrf/i.test(e.name)).map(e=>({
    name:e.name,type:e.type,value:e.value,checked:e.checked,required:e.required,min:e.min,max:e.max,maxLength:e.maxLength,valid:e.validity.valid,
    message:e.validationMessage})),
    groups:Array.from(document.querySelectorAll('#paperItemTable>tbody')).map(e=>({passageId:e.dataset.passageId,
      itemIds:Array.from(e.querySelectorAll('tr[data-item-id]')).map(r=>r.dataset.itemId),
      removeDisabled:e.querySelector('[data-remove-group]')?.disabled,
      handle:!!e.querySelector('[data-sort-handle]')})),
    count:document.querySelector('#paperSummaryCount')?.innerText,
    types:document.querySelector('#paperSummaryTypes')?.innerText,
    units:document.querySelector('#paperSummaryUnits')?.innerText,
    scroller:(()=>{const e=document.querySelector('.page-wrapper');return {top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight};})()
  };
})()
