(async()=>{
 const q=new URLSearchParams(location.search);if(location.hostname!=='dev-exambank.dongahub.com'||q.get('itemId')!=='2089242'||q.get('itemDetailId')!=='2088906'||!document.querySelector('[data-slot=passage].active'))throw Error('Own passage editor only');
 const parent=window.opener;if(!parent||new URLSearchParams(parent.location.search).get('itemId')!=='2089242')throw Error('Own opener required');
 const end=performance.now()+20000;
 while(performance.now()<end){
  const hml=parent.webhwpSavedHml?.passage,image=parent.webhwpSavedImage?.passage;
  if(hml&&image)return {outcome:'vendor_temp_save_confirmed_cms_commit_pending',status:document.querySelector('[data-webhwp-status]').innerText,modal:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),parentUrl:parent.location.href,parentPending:[...parent.document.querySelectorAll('[data-webhwp-result]')].map(e=>({slot:e.dataset.webhwpResult,value:e.value})),hml,image,editorModified:document.getElementById('webhwpFrame').contentWindow.HwpCtrl.IsModified};
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 return {outcome:'not_confirmed_within_observation_window_do_not_repeat_save',status:document.querySelector('[data-webhwp-status]').innerText,modals:[...document.querySelectorAll('.modal.show')].map(e=>({id:e.id,text:e.innerText})),parentPending:[...parent.document.querySelectorAll('[data-webhwp-result]')].map(e=>({slot:e.dataset.webhwpResult,value:e.value}))};
})()
