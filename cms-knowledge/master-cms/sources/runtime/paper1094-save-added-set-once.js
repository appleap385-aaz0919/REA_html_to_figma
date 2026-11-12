(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/modify.donga'||new URLSearchParams(location.search).get('paperId')!=='1094')throw Error('Own paper1094 required');
 const f=document.querySelector('#paperModifyForm');if(new URL(f.action).pathname!=='/paper/update.donga')throw Error('Unexpected save endpoint');
 const expected={paperId:'1094',paperName:'QA-HML-20261109-02-SET4-SINGLE1',startPageNum:'1',endPageNum:'1',viewFlag:'R',serviceUsage:'C'};
 for(const [n,v] of Object.entries(expected)){const e=f.querySelector('[name="'+n+'"]'+(['viewFlag','serviceUsage'].includes(n)?':checked':''));if(!e||e.value!==v)throw Error('Changed '+n);}
 const ids=[...f.querySelectorAll('[name=itemIds]')].map(e=>e.value);if(ids.join(',')!=='2089238,2089242,2089243,2089244,2089245')throw Error('Unexpected members');
 if(document.querySelector('.modal.show')||!f.checkValidity()||window.__qaPaper1094SetSaved)throw Error('Invalid or duplicate submit');
 const b=f.querySelector('[data-paper-save]');if(!b||b.disabled)throw Error('Save unavailable');window.__qaPaper1094SetSaved=true;b.click();return {clicked:true,expected,itemIds:ids};
})()
