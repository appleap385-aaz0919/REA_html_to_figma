(() => {
 const id=new URLSearchParams(location.search).get('itemId');
 // Read-only metrics for retained items owned by QA documents664/665.
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/detail.donga'||!['2089215','2089216','2089238','2089239'].includes(id))throw Error('Expected own retained QA HML item');
 const main=document.querySelector('.page-wrapper'),preview=main.querySelector('.omr-preview-btn');
 return {url:location.href,visibility:document.visibilityState,headings:[...main.querySelectorAll('h2,h3,h4')].map(e=>e.innerText),
  values:[...main.querySelectorAll('dl dt')].map(e=>({label:e.innerText,value:e.nextElementSibling?.innerText})),
  selectedStatus:[...main.querySelectorAll('input[type=radio]:checked')].filter(e=>!e.closest('.modal')).map(e=>({name:e.name,value:e.value,disabled:e.matches(':disabled'),disabledProperty:e.disabled})),
  statusSelects:[...main.querySelectorAll('select')].filter(e=>!e.closest('.modal')).map(e=>({name:e.name,value:e.value,text:e.selectedOptions[0]?.text,disabled:e.matches(':disabled'),disabledProperty:e.disabled})),
  omr:preview?{type:preview.dataset.questionType,savedOmr:JSON.parse(preview.getAttribute('data-saved-omr')||'null'),savedAnswer:JSON.parse(preview.getAttribute('data-saved-answer')||'null')}:null,
  actions:[...main.querySelectorAll('a.btn,button')].filter(e=>!e.closest('.modal')).map(e=>({text:e.innerText,href:e.getAttribute('href'),disabled:e.matches(':disabled')||e.classList.contains('disabled'),visible:!!e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden',attributes:{...e.dataset}})),
  images:[...main.querySelectorAll('img')].map(e=>({alt:e.alt,src:e.getAttribute('src'),complete:e.complete,width:e.naturalWidth,height:e.naturalHeight})),
  modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText}))};
})()
