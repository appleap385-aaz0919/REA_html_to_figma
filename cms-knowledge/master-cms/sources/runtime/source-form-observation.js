({url:location.href,forms:Array.from(document.forms).filter(f=>!/logout/i.test(f.action)).map(f=>({action:f.action,method:f.method,
 fields:Array.from(f.querySelectorAll('input,select,textarea')).filter(e=>!/csrf|password|token/i.test(e.name)).map(e=>({tag:e.tagName,type:e.type,
 id:e.id,name:e.name,value:e.value,disabled:e.disabled,required:e.required,maxLength:e.maxLength,
 label:e.tagName==='SELECT'?e.selectedOptions[0]?.textContent:undefined,valid:e.validity.valid,message:e.validationMessage,
 optionCount:e.tagName==='SELECT'?e.options.length:undefined
 }))})),
 autoFields:Array.from(document.querySelectorAll('input[placeholder="자동생성"]')).map(e=>({value:e.value,disabled:e.disabled}))})
