(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/omr-render.donga')throw Error('Restore test scope mismatch');
 const code=document.querySelector('#omrTypeSel')?.value,slot=document.querySelector('#omrSlot'),root=slot?.querySelector('[data-omr-code]');
 let serialization=null,error=null;try{if(root&&window.omrSerializers?.[code])serialization=window.omrSerializers[code].serialize(root);}catch(e){error=String(e);}
 return {url:location.href,visibility:document.visibilityState,code,omrJson:document.querySelector('#omrJsonIn')?.value,answerJson:document.querySelector('#ansJsonIn')?.value,message:document.querySelector('#omrRestoreMsg')?.innerText,messageClass:document.querySelector('#omrRestoreMsg')?.className,
  wrapClass:document.querySelector('#omrRenderWrap')?.className,wideButton:document.querySelector('#omrNarrowToggle')?.innerText,serialization,error,
  liveFields:[...(slot?.querySelectorAll('input,select,textarea')||[])].map(e=>({tag:e.tagName,type:e.type,name:e.name,value:e.value,checked:['checkbox','radio'].includes(e.type)?e.checked:undefined,disabled:e.disabled})),
  cells:[...(slot?.querySelectorAll('.vt-cell')||[])].map(e=>({value:e.dataset.vtValue,valueType:e.dataset.vtType,allowed:e.dataset.vtAllowed,text:e.innerText})),
  liveText:slot?.innerText,scroll:[...document.querySelectorAll('.page-wrapper')].map(e=>({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight}))};
})()
