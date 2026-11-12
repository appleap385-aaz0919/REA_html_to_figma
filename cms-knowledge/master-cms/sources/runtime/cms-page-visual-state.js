(() => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Authorized Master only');
 const e=document.querySelector('.page-wrapper');if(!e)throw Error('CMS scroller absent');
 return {url:location.href,title:document.title,visibility:document.visibilityState,
  headings:[...e.querySelectorAll('h1,h2,h3,h4')].map(x=>x.innerText),
  scroll:{top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight,width:e.clientWidth,contentWidth:e.scrollWidth},
  horizontal:[...e.querySelectorAll('.table-responsive')].filter(x=>x.scrollWidth>x.clientWidth+1).map((x,i)=>({index:i,id:x.id,left:x.scrollLeft,width:x.clientWidth,totalWidth:x.scrollWidth})),
  displayedFormFields:[...e.querySelectorAll('input,select,textarea')].filter(x=>x.getClientRects().length&&!x.closest('.modal')).length,
  visibleModalIds:[...document.querySelectorAll('.modal.show')].map(x=>x.id)};
})()
