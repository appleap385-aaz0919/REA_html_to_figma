(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/product/modify.donga'||new URLSearchParams(location.search).get('id')!=='199'||document.querySelector('.modal.show')||window.__qaSource199ActivateAttempted)throw Error('Own source edit only');
 const form=[...document.forms].find(f=>new URL(f.action).pathname==='/product/update.donga');if(!form||form.elements.productId.value!=='199')throw Error('Own source form required');
 const expected={curriculum:'22',classType:'M',subjectCategory:'MA',subject:'T0',grade:'1',term:'1',productCategoryCode:'SMT',productCategorySubCode:'TP',publishYear:'2048',viewName:'QA-SOURCE-20261109-EDITED',serviceUsage:'T',useFlag:'Y',remark:'QA edited source 2026-11-09; unmapped and unused.'};
 for(const[name,value]of Object.entries(expected))if(form.elements.namedItem(name)?.value!==value)throw Error('Own source field mismatch '+name);
 if(!form.checkValidity())throw Error('Own source form invalid');window.__qaSource199ActivateAttempted=true;form.querySelector('button[type=submit]').click();
 return {clickedOnce:true,sourceId:199,useFlag:'Y',otherMetadataPreserved:true};
})()
