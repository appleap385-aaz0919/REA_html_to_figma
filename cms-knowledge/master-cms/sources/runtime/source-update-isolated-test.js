(() => {
  if(location.hostname!=='dev-exambank.dongahub.com')throw new Error('Wrong scope');
  const form=Array.from(document.forms).find(f=>new URL(f.action).pathname==='/product/update.donga');
  if(!form||form.elements.namedItem('productId')?.value!=='199')throw new Error('Expected isolated source199');
  const expected={curriculum:'22',classType:'M',subjectCategory:'MA',subject:'T0',grade:'1',term:'1',
    productCategoryCode:'SMT',productCategorySubCode:'TP',publishYear:'2048',viewName:'QA-SOURCE-20261109-EDITED',
    serviceUsage:'T',useFlag:'N',remark:'QA edited source 2026-11-09; unmapped and unused.'};
  for(const [name,value]of Object.entries(expected))if(form.elements.namedItem(name)?.value!==value)throw new Error('Unexpected field '+name);
  if(!form.checkValidity())throw new Error('Invalid source form');
  form.querySelector('button[type="submit"]').click();
  return{requested:'Update isolated source199 through Save control',inputMethod:'DOM click in background tab',expected};
})()
