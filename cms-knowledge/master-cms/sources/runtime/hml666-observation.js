(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/hml/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='666')throw Error('Expected own QA666');
 const main=document.querySelector('.page-wrapper');
 const groups=[...main.querySelectorAll('.card')].map(card=>({card,header:card.querySelector(':scope > .card-header')})).filter(x=>x.header&&/^#\d+(?!-)(?:\s|$)/.test(x.header.innerText.trim())).map(({card,header})=>({header:header.innerText,text:card.innerText,itemLinks:[...card.querySelectorAll('a[href*="/item/all/detail.donga"]')].map(e=>e.getAttribute('href')),modelCount:card.querySelectorAll('.qv-item script[type="application/json"]').length}));
 return {url:location.href,visibility:document.visibilityState,prefix:main.innerText.slice(0,750),reviewGroups:groups,
  paperReg:[...main.querySelectorAll('[name=paperRegYn]')].map(e=>({value:e.value,checked:e.checked,disabled:e.matches(':disabled')})),
  remark:{value:main.querySelector('[name=remark]')?.value,disabled:main.querySelector('[name=remark]')?.matches(':disabled')},
  actions:[...main.querySelectorAll('a.btn,button')].filter(e=>!e.closest('.modal')).map(e=>({text:e.innerText,href:e.getAttribute('href'),disabled:e.matches(':disabled')||e.classList.contains('disabled')})),scroll:{top:main.scrollTop,height:main.clientHeight,total:main.scrollHeight}};
})()
