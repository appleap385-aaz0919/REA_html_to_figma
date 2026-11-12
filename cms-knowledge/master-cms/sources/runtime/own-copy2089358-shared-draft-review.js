(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||new URLSearchParams(location.search).get('itemId')!=='2089358'||new URLSearchParams(location.search).get('draft')!=='Y'||document.querySelector('.modal.show'))throw Error('Own selected copied shared draft required');
 const editorUrl=document.querySelector('[data-editor-url]')?.dataset.editorUrl,passage=window.itemEditors?.passage?.getDocument(),question=window.itemEditors?.question?.getDocument(),omr=window.omrSerializers.SBSANM.serialize(document.querySelector('#omrSlot [data-omr-code]'));
 if(!editorUrl?.endsWith('itemDetailId=2089077')||!passage?.content?.promptText?.includes('[QA-COPY-SHARED-DRAFT-20261110]')||!question||[...document.querySelectorAll('[data-webhwp-result]')].some(e=>e.value)||window.OmrValidate.check(document.querySelector('#omrSlot [data-omr-code]')))throw Error('Saved marker draft9077 and valid original OMR/no HML change required');
 window.__qaCopiedSharedDraftReviewed=structuredClone({editorUrl,passage,question,omr});return {itemId:2089358,logicalPassageId:2089357,editorUrl,passage,question,omr,pendingHmlEmpty:true};
})()
