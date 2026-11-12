(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemTwinModal.show'))throw Error('Own QA modal only');
 const filter=document.getElementById('twinSearchFilter');if(filter.querySelector('[name=anchorItemId]').value!=='2089216'||filter.querySelector('[name=keyword]').value!=='2089239')throw Error('Exact own clone filter required');
 const buttons=[...document.querySelectorAll('#twinAddResult button[hx-post]')].filter(e=>{const u=new URL(e.getAttribute('hx-post'),location.origin);return u.pathname==='/item/all/twin-add.donga'&&u.searchParams.get('targetItemId')==='2089239';});
 if(buttons.length!==1||buttons[0].matches(':disabled')||window.__qaOwnCloneAddAttempted)throw Error('Unexpected/already attempted add');
 const button=buttons[0];const path=button.getAttribute('hx-post');window.__qaOwnCloneAddAttempted=true;button.click();
 return {clickedOnce:true,path,anchorItemId:2089216,targetItemId:2089239,serviceDeployment:false};
})()
