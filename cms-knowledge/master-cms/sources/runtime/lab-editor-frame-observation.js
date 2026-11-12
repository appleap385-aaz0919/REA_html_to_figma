(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/question-frame.donga')throw Error('Frame test scope mismatch');
 return {url:location.href,visibility:document.visibilityState,inputLength:document.querySelector('#frameDocInput')?.value.length,heightMode:document.querySelector('#frameHeightMode')?.value,
  tabs:[...document.querySelectorAll('[data-bs-toggle="tab"]')].map(e=>({text:e.innerText,href:e.getAttribute('href'),selected:e.getAttribute('aria-selected')})),
  panes:[...document.querySelectorAll('[data-side]')].map(e=>({side:e.dataset.side,active:e.classList.contains('active'),output:e.querySelector('[data-output]')?.innerText,editorCount:e.querySelectorAll('[contenteditable=true]').length,viewer:e.querySelector('[data-title-viewer]')?.parentElement?.innerText})),
  iframes:[...document.querySelectorAll('iframe')].map(e=>{try{const d=e.contentDocument;return {id:e.id,height:e.style.height,bodyScrollHeight:d?.body?.scrollHeight,text:d?.body?.innerText,contenteditable:[...d.querySelectorAll('[contenteditable=true]')].map(x=>({tag:x.tagName,role:x.getAttribute('role'),html:x.innerHTML})),viewerLoaded:!!e.contentWindow.DongaQuestionViewer,editorLoaded:!!e.contentWindow.DongaQuestionEditor};}catch(err){return {error:String(err)};}}),
  alerts:[...document.querySelectorAll('[role=alert]')].map(e=>e.innerText),scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight}))};
})()
