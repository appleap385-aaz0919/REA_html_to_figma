(() => {
 const id=Number(new URLSearchParams(location.search).get('itemId')),dims={2089243:[1,3],2089244:[2,2],2089245:[2,3]}[id];
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||!dims||!document.querySelector('#applyAllModal.show')||window.__qaSetSiblingOmrSubmitAttempted)throw Error('Only planned one-shot sibling confirm');
 const slash=String.fromCharCode(92),answer=dims[0]+slash+'times'+dims[1]+slash+'text{행렬}';
 if(window.omrSerializers.SBSANM.serialize(document.querySelector('#omrSlot [data-omr-code="SBSANM"]')).answer.nodes[0].allowed_answer[0].value!==answer||[...document.querySelectorAll('[data-webhwp-result]')].some(e=>e.value))throw Error('Only intended OMR may be saved');
 window.__qaSetSiblingOmrSubmitAttempted=id;document.querySelector('#applyAllModal [data-action-ok]').click();return {clickedOnce:true,itemId:id,answer,operation:'Complete missing own sibling OMR only',serviceDeployment:false};
})()
