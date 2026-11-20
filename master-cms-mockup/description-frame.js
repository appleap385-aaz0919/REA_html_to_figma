/* Report local preview geometry through postMessage, including opaque file:// frames. */
(()=>{
 const selectors={answer:'.omr-preview__switch-field',response:'.omr-preview__frame',grade:'.omr-preview__submit'};
 window.addEventListener('message',e=>{
  if(e.source!==parent||e.data?.source!=='cms-description-probe'||typeof e.data.token!=='string')return;
  const rects={};for(const [key,selector] of Object.entries(selectors)){const el=document.querySelector(selector);if(!el||!el.getClientRects().length)continue;const r=el.getBoundingClientRect();rects[key]={x:r.x,y:r.y,w:r.width,h:r.height};}
  parent.postMessage({source:'cms-description-geometry',token:e.data.token,rects},'*');
 });
})();
