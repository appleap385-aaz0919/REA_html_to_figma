(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||new URLSearchParams(location.search).get('itemId')!=='2089242'||document.querySelectorAll('.modal.show').length!==1||!document.querySelector('#applyAllModal.show')||window.__qaSharedHmlApplyAttempted)throw Error('Own validated HML confirmation required');
 const owner=document.querySelector('[data-editor-url]'),pending=[...document.querySelectorAll('[data-webhwp-result]')].filter(e=>e.value);
 if(owner.dataset.itemDetailId!=='2088906'||pending.length!==2||pending.some(e=>!e.dataset.webhwpResult.startsWith('passage.'))||!window.webhwpSavedHml.passage||!window.webhwpSavedImage.passage)throw Error('Only own passage pending results required');
 const passage=JSON.parse(document.getElementById('passageEditorData').textContent);if(!passage.content.promptText.includes('[QA-SHARED-HTML-20261110]'))throw Error('Existing shared HTML marker must be preserved');
 window.__qaSharedHmlApplyAttempted=true;document.querySelector('#applyAllModal [data-action-ok]').click();
 return {clickedOnce:true,itemId:2089242,itemDetailIdBefore:2088906,passageId:2089241,pendingSlots:pending.map(e=>e.dataset.webhwpResult),existingHtmlMarkerPreserved:true,serviceDeployment:false};
})()
