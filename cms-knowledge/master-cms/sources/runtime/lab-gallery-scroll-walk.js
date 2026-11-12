(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/omr.donga')throw Error('Gallery scope mismatch');
 const e=document.querySelector('.page-wrapper');if(!e)throw Error('Scroller absent');
 const max=e.scrollHeight-e.clientHeight;if(max>100000)throw Error('Unexpected scroll extent');
 const positions=[];let requested=0;
 while(true){e.scrollTop=requested;const frame=e.getBoundingClientRect();positions.push({requested,scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,visibleLeaves:[...document.querySelectorAll('.omr-live [data-omr-code]')].filter(x=>{const r=x.getBoundingClientRect();return r.height>0&&r.bottom>frame.top&&r.top<frame.bottom;}).map(x=>x.dataset.omrCode)});if(e.scrollTop+e.clientHeight>=e.scrollHeight-1)break;requested=Math.min(e.scrollTop+800,max);if(positions.length>130)throw Error('Unexpected scroll loop');}
 return {url:location.href,visibility:document.visibilityState,note:'Actual overlapping internal scroll positions and DOM intersections; pixel inspection remains unverified.',positions,visitedLeaves:[...new Set(positions.flatMap(p=>p.visibleLeaves))],atBottom:e.scrollTop+e.clientHeight>=e.scrollHeight-1};
})()
