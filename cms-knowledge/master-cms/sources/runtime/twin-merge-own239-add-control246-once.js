(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089239'||!document.querySelector('#itemTwinModal.show')||window.__qa239Add246Attempted)throw Error('Own unsubmitted239 Add modal required');
 const f=document.querySelector('#twinSearchFilter');if(f.querySelector('[name=anchorItemId]').value!=='2089239'||f.querySelector('[name=keyword]').value!=='2089246'||document.querySelector('#twinAddTabBtn').getAttribute('aria-selected')!=='true')throw Error('Exact control246 filter required');
 const bs=[...document.querySelectorAll('#twinAddResult button[hx-post]')].filter(e=>{const u=new URL(e.getAttribute('hx-post'),location.origin);return u.pathname==='/item/all/twin-add.donga'&&u.searchParams.get('targetItemId')==='2089246';});if(bs.length!==1||bs[0].matches(':disabled'))throw Error('Expected enabled own control Add');
 window.__qa239Add246Attempted=true;bs[0].click();return {clickedOnce:true,anchorItemId:2089239,targetItemId:2089246,serviceDeployment:false};
})()
