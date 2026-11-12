(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||new URLSearchParams(location.search).get('itemId')!=='2089358'||document.querySelector('.modal.show'))throw Error('Own copied set HTML editor required');
 const host=document.getElementById('passageEditor'),passage=window.itemEditors?.passage?.getDocument(),question=window.itemEditors?.question?.getDocument(),root=document.querySelector('#omrSlot [data-omr-code]'),serialized=window.omrSerializers.SBSANM.serialize(root);
 if(!host||host.querySelectorAll('.ProseMirror[contenteditable="true"]').length!==1||!passage?.content?.promptText?.includes('[QA-SHARED-HTML-20261110]')||passage.content.promptText.includes('[QA-COPY-SHARED-DRAFT-20261110]')||!question||[...document.querySelectorAll('[data-webhwp-result]')].some(e=>e.value))throw Error('Expected untouched copied passage and no HML change');
 window.__qaCopySharedHtmlBaseline=structuredClone({passage,question,serializedOmr:serialized});
 return {passage,question,serializedOmr:serialized,editable:[...host.querySelectorAll('[contenteditable]')].map(e=>({tag:e.tagName,className:e.className,editable:e.getAttribute('contenteditable'),text:e.innerText})),pending:[...document.querySelectorAll('[data-webhwp-result]')].map(e=>({slot:e.dataset.webhwpResult,value:e.value}))};
})()
