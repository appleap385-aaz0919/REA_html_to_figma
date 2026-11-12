(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/omr-render.donga')throw Error('Restore test scope mismatch');
 const select=document.querySelector('#omrTypeSel'),button=document.querySelector('#omrRestoreBtn');
 const codes=[...select.options].map(o=>o.value).filter(Boolean);if(codes.length!==14)throw Error('Expected14 observed type options');
 const canonical=v=>Array.isArray(v)?v.map(canonical):(v&&typeof v==='object')?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
 const results=[];
 for(const code of codes){
  select.value=code;select.dispatchEvent(new Event('change',{bubbles:true}));
  const slot=document.querySelector('#omrSlot'),root=slot.querySelector('[data-omr-code]'),ser=window.omrSerializers?.[code];
  const omrJson=document.querySelector('#omrJsonIn').value,answerJson=document.querySelector('#ansJsonIn').value;
  const before=ser?.serialize&&root?ser.serialize(root):null;
  button.click();
  const afterRoot=slot.querySelector('[data-omr-code]'),after=ser?.serialize&&afterRoot?ser.serialize(afterRoot):null;
  results.push({code,hasSerialize:typeof ser?.serialize==='function',hasHydrate:typeof ser?.hydrate==='function',omrJson,answerJson,message:document.querySelector('#omrRestoreMsg').innerText,
   rootCode:afterRoot?.dataset.omrCode,roundtripEqual:JSON.stringify(canonical(before))===JSON.stringify(canonical(after)),before,after,
   fields:[...slot.querySelectorAll('input,select')].map(e=>({type:e.type,name:e.name,value:e.value,checked:['checkbox','radio'].includes(e.type)?e.checked:undefined})),html:afterRoot?.outerHTML});
 }
 select.value='';select.dispatchEvent(new Event('change',{bubbles:true}));
 return {note:'Actual Lab select-change and Restore button handlers exercised on each generated default form. Blank defaults are not normal saved-question fixtures or all policy branches.',results,finalType:select.value};
})()
