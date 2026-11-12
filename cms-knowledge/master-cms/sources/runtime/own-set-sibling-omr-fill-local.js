(async()=>{
 const id=Number(new URLSearchParams(location.search).get('itemId')),dims={2089243:[1,3],2089244:[2,2],2089245:[2,3]}[id];
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||!dims||document.querySelector('.modal.show'))throw Error('Only planned own sibling edit allowed');
 const saved=id=>{const text=document.getElementById(id)?.textContent.trim();return text?JSON.parse(text):null;};
 if(document.getElementById('qtType')?.value!=='SBSANM'||saved('savedOmrData')!=null||saved('savedAnswerData')!=null)throw Error('Expected own sibling missing saved OMR');
 const link=document.querySelector('.nav-tabs a[href="#tabOmr"]');if(!link)throw Error('Actual OMR tab required');
 if(!link.classList.contains('active')){const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Sibling OMR tab not shown')),5000);link.addEventListener('shown.bs.tab',()=>{clearTimeout(timer);resolve();},{once:true});});link.click();await shown;}
 const root=document.querySelector('#omrSlot [data-omr-code="SBSANM"]'),fields=[...root.querySelectorAll('math-field')].filter(e=>e.dataset.placeholder==='정답 입력');
 if(fields.length!==1||fields[0].value)throw Error('Only one empty actual answer field expected');
 const slash=String.fromCharCode(92),answer=dims[0]+slash+'times'+dims[1]+slash+'text{행렬}';
 fields[0].value=answer;fields[0].dispatchEvent(new Event('input',{bubbles:true}));fields[0].dispatchEvent(new Event('change',{bubbles:true}));
 const serialized=window.omrSerializers.SBSANM.serialize(root);if(serialized.answer.nodes[0].allowed_answer[0].value!==answer||answer.includes(String.fromCharCode(9)))throw Error('Math value must serialize correctly');
 return {localOnly:true,itemId:id,answer,answerCodePoints:[...answer].map(e=>e.charCodeAt(0)),serialized,omrValidity:window.OmrValidate.check(root)};
})()
