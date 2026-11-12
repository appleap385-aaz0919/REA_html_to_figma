(() => {
  if (location.hostname !== 'dev-exambank.dongahub.com') throw new Error('Wrong scope');
  const form=Array.from(document.forms).find(f=>new URL(f.action).pathname==='/product/create.donga');
  if (!form) throw new Error('Expected source creation form');
  const expected={curriculum:'22',classType:'M',subjectCategory:'MA',subject:'T0',grade:'1',term:'1',
    productCategoryCode:'SMT',productCategorySubCode:'TP',publishYear:'2049',viewName:'QA-SOURCE-20261109',
    serviceUsage:'C',useFlag:'N',remark:'QA investigation source 2026-11-09; no mapped questions.'};
  for(const [name,value] of Object.entries(expected)) {
    if(form.elements.namedItem(name)?.value!==value) throw new Error('Unexpected field '+name);
  }
  if(!form.checkValidity()) throw new Error('Source form is invalid');
  const button=form.querySelector('button[type="submit"]');
  if(!button||button.disabled) throw new Error('Save control unavailable');
  button.click();
  return {requested:'Source creation through observed Save control',inputMethod:'DOM click in background tab',expected};
})()
