(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||new URLSearchParams(location.search).get('itemId')!=='2089216'||!document.querySelector('#itemTwinModal.show')||window.__qaMergeRemove246Attempted)throw Error('Own unsubmitted merged family required');
 const current=document.querySelector('#twinCurrent');if(!current.getClientRects().length||getComputedStyle(current).visibility==='hidden')throw Error('Current pane must be visible');
 const ids=[...current.querySelectorAll('tbody tr')].map(e=>e.querySelector('td')?.textContent.trim()).filter(e=>/^\d+$/.test(e)).sort();if(ids.join(',')!=='2089216,2089239,2089240,2089246')throw Error('Expected four-member merged family');
 const bs=[...current.querySelectorAll('button[hx-post]')].filter(e=>{const u=new URL(e.getAttribute('hx-post'),location.origin);return u.pathname==='/item/all/twin-remove.donga'&&u.searchParams.get('twinDataType')==='ITEM'&&u.searchParams.get('twinDataId')==='2089246';});if(bs.length!==1||bs[0].matches(':disabled'))throw Error('Expected enabled owned control Remove');
 window.__qaMergeRemove246Attempted=true;bs[0].click();return {clickedOnce:true,anchorItemId:2089216,removedControlItemId:2089246,serviceDeployment:false};
})()
