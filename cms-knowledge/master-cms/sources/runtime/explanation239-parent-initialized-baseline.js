(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/all/modify.donga'||new URLSearchParams(location.search).get('itemId')!=='2089239'||document.querySelector('.modal.show'))throw Error('Own clean239 edit');
 const o=document.querySelector('[data-editor-url]'),q=window.itemEditors?.question?.getDocument(),root=document.querySelector('#omrSlot [data-omr-code=OBSACN]');
 if(o?.dataset.itemDetailId!=='2089019'||!q||!root||typeof window.omrSerializers?.OBSACN?.serialize!=='function'||[...document.querySelectorAll('[data-webhwp-result]')].some(e=>e.value))throw Error('Initialized clean own239 models required');
 const omr=window.omrSerializers.OBSACN.serialize(root);
 const b={ownerItemId:'2089239',ownerDetailId:'2089019',question:q,omr,slots:[...document.querySelectorAll('[data-webhwp-path]')].map(e=>({slot:e.dataset.webhwpPath,path:e.value}))};
 window.__qaExplain239ParentBaseline=structuredClone(b);return {baselineStored:true,...b};
})()
