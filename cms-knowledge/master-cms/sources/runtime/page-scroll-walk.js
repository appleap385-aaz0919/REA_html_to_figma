(() => {
 if(location.hostname!=='dev-exambank.dongahub.com')throw Error('Master scope mismatch');const e=document.querySelector('.page-wrapper');if(!e)throw Error('Internal scroller absent');
 const max=e.scrollHeight-e.clientHeight;if(max>100000)throw Error('Unexpected scroll extent');const positions=[];let requested=0;
 while(true){e.scrollTop=requested;const f=e.getBoundingClientRect();positions.push({scrollTop:e.scrollTop,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,visibleHeadings:[...e.querySelectorAll('h1,h2,h3,h4')].filter(x=>{const r=x.getBoundingClientRect();return r.height>0&&r.bottom>f.top&&r.top<f.bottom;}).map(x=>x.innerText)});if(e.scrollTop+e.clientHeight>=e.scrollHeight-1)break;requested=Math.min(e.scrollTop+800,max);if(positions.length>130)throw Error('Unexpected loop extent');}
 return {url:location.href,visibility:document.visibilityState,note:'Actual overlapping internal scroll positions. DOM coverage is distinct from pixel inspection.',positions,atBottom:e.scrollTop+e.clientHeight>=e.scrollHeight-1};
})()
