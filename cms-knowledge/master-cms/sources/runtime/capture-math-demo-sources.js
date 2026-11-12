(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/math-demo.donga')throw Error('Math demo scope mismatch');
 const names=['mathDemoPage-','mathFieldDialog-','mathInkCanvas-','tinymceMathPlugin-','mathDelimiterRoundtrip-','mathConfig-','mathKeypad-','mathKeypadLayouts-'];
 const urls=[...document.scripts].map(s=>s.src).filter(src=>new URL(src,location.origin).origin===location.origin&&names.some(n=>src.split('/').pop().startsWith(n)));
 if(urls.length!==8)throw Error('Expected8 declared math sources, got'+urls.length);
 return {scope:location.origin,note:'Declared same-origin custom scripts only; cookies/storage not read or returned.',scripts:await Promise.all(urls.map(async url=>{const r=await fetch(url,{credentials:'same-origin'});const source=await r.text();if(r.redirected||!r.ok||!r.headers.get('content-type')?.includes('javascript'))throw Error('Unexpected source response '+url);return {url,status:r.status,source};}))};
})()
