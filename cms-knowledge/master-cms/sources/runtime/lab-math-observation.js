(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/math-demo.donga')throw Error('Math demo scope mismatch');
 const ids=['answerPlaceholder','blockSelect','sourceText','answerField','answerLatexOut','mathView3'];
 const editorIds=window.tinymce?.get?window.tinymce.get().map(e=>({id:e.id,initialized:e.initialized,mode:e.mode?.get?.(),html:e.getContent?.(),bodyTag:e.getBody?.()?.tagName})):[];
 return {url:location.href,visibility:document.visibilityState,readyState:document.readyState,tinyMceLoaded:!!window.tinymce,mathLiveLoaded:!!window.MathLive,editors:editorIds,
  fields:ids.map(id=>{const e=document.getElementById(id);return {id,exists:!!e,tag:e?.tagName,value:e?.value,text:e?.innerText,placeholder:e?.getAttribute('placeholder')};}),
  sections:[...document.querySelectorAll('.page-wrapper h3,.page-wrapper h2')].map(e=>e.innerText),
  buttons:[...document.querySelectorAll('button')].filter(e=>e.getBoundingClientRect().height>0).map(e=>({id:e.id,text:e.innerText,title:e.title,label:e.getAttribute('aria-label'),disabled:e.disabled})),
  outputs:[...document.querySelectorAll('.page-wrapper pre,.page-wrapper [id*=Output],.page-wrapper [id*=output]')].map(e=>({id:e.id,text:e.textContent,renderedText:e.innerText})),
  dialogs:[...document.querySelectorAll('[role=dialog],dialog,.modal.show')].filter(e=>e.getBoundingClientRect().height>0).map(e=>({id:e.id,text:e.innerText})),
  iframes:[...document.querySelectorAll('iframe')].map(e=>({id:e.id,src:e.getAttribute('src'),bodyText:(()=>{try{return e.contentDocument?.body?.innerText;}catch(_){return null;}})()})),
  scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight}))};
})()
