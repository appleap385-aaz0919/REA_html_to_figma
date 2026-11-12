(async()=>{
 const id=Number(new URLSearchParams(location.search).get('itemId')),dims={2089243:[1,3],2089244:[2,2],2089245:[2,3]}[id];
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||!dims||document.querySelector('.modal.show'))throw Error('Only planned own sibling edit allowed');
 const slash=String.fromCharCode(92),answer=dims[0]+slash+'times'+dims[1]+slash+'text{행렬}',root=document.querySelector('#omrSlot [data-omr-code="SBSANM"]');
 if(window.omrSerializers.SBSANM.serialize(root).answer.nodes[0].allowed_answer[0].value!==answer||[...document.querySelectorAll('[data-webhwp-result]')].some(e=>e.value))throw Error('Only valid planned OMR; no HML edit');
 const modal=document.getElementById('applyAllModal'),button=[...document.querySelectorAll('button[onclick="itemApplyAll();"]')].find(e=>e.getClientRects().length);
 const shown=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Sibling FullApply confirmation not shown; inspect validation')),5000);modal.addEventListener('shown.bs.modal',()=>{clearTimeout(timer);resolve();},{once:true});});button.click();await shown;
 return {confirmationOnly:true,itemId:id,answer,modal:modal.id,text:modal.innerText};
})()
