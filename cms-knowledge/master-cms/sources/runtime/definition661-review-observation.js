(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='661')throw Error('Expected isolated QA Definition661');
 const main=document.querySelector('.page-wrapper');
 return {url:location.href,remark:document.querySelector('[name=remark]')?.value,
  judges:[...document.querySelectorAll('[data-exam-judge]')].map(e=>({block:e.dataset.blockNo,itemIds:e.dataset.itemIds,value:e.value,options:[...e.options].map(o=>({value:o.value,disabled:o.disabled}))})),
  paperReg:document.querySelector('[data-paper-reg]')?.innerText||null,
  forms:[...document.querySelectorAll('form[id^=exam]')].map(f=>({id:f.id,request:f.getAttribute('hx-post'),fields:[...f.querySelectorAll('input')].filter(e=>!/(csrf|token)/i.test(e.name)).map(e=>({name:e.name,value:e.value}))})),
  modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),
  actions:[...main.querySelectorAll('[data-exam-approve],[data-exam-discard]')].map(e=>({text:e.innerText,disabled:e.disabled})),
  prefix:main.innerText.slice(0,850),scroll:{top:main.scrollTop,height:main.clientHeight,total:main.scrollHeight}};
})()
