(() => {
  if(location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/product/form.donga') throw Error('Scope/form mismatch');
  const form=document.querySelector('form[action="/product/create.donga"]');
  if(!form)throw Error('Create form missing');
  const expected={curriculum:'22',classType:'M',subjectCategory:'MA',subject:'T0',grade:'1',term:'1',productCategoryCode:'SMT',productCategorySubCode:'TP',publishYear:'2048',viewName:'QA-SOURCE-DUPLICATE-20261109',serviceUsage:'C',useFlag:'N',remark:'QA duplicate-code probe for isolated source199; unused and unmapped.'};
  for(const [name,value] of Object.entries(expected))if(form.elements.namedItem(name)?.value!==value)throw Error('Unexpected '+name);
  if(!form.checkValidity())throw Error('Invalid duplicate test form');
  const button=[...form.querySelectorAll('button')].find(b=>b.textContent.trim()==='저장');
  if(!button||button.disabled)throw Error('Save unavailable');
  button.click();
  return {requested:'Submit duplicate-code probe against isolated source199',inputMethod:'Observed Save button DOM click in background tab',expected};
})()
