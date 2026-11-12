(async()=>{
 const q=new URLSearchParams(location.search);if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/webhwp/editor.donga'||q.get('itemId')!=='2089358'||q.get('itemDetailId')!=='2089078'||window.__qaCopyHmlEditorSaveAttempted||document.querySelector('.modal.show')||!document.querySelector('[data-slot=passage].active'))throw Error('Own unsubmitted passage popup required');
 const c=document.getElementById('webhwpFrame').contentWindow.HwpCtrl,p=window.opener,o=p?.document.querySelector('[data-editor-url]'),b=document.querySelector('[data-webhwp-action=save]');
 if(!c.IsModified||c.PageCount!==1||b?.matches(':disabled')||new URL(p.location.href).searchParams.get('itemId')!=='2089358'||o?.dataset.itemDetailId!=='2089078'||[...p.document.querySelectorAll('[data-webhwp-result]')].some(e=>e.value))throw Error('Exact modified passage/parent/pending state required');
 const current=await new Promise((resolve,reject)=>{let done=false;const end=value=>{if(done)return;done=true;clearTimeout(timer);resolve(typeof value==='string'?value:typeof value?.data==='string'?value.data:null);};const timer=setTimeout(()=>reject(Error('Text verification callback timed out; no save sent')),8000);const returned=c.GetTextFile('TEXT','',end);if(typeof returned==='string'&&returned)end(returned);});
 const expected=__EXPECTED_TEXT_JSON__;
 if(current!==expected||current.split('[QA-COPY-SHARED-HML-20261110]').length!==2)throw Error('Exact single marker and preserved text required; no save sent');
 window.__qaCopyHmlEditorSaveAttempted=true;b.click();
 return {editorSaveClickedOnce:true,attemptCount:1,itemId:2089358,itemDetailId:2089078,slot:'passage',verifiedTextCharacters:current.length,cmsSaveSubmitted:false};
})()
