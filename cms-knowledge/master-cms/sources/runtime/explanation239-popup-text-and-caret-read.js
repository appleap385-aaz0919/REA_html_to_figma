(async()=>{
 const q=new URLSearchParams(location.search);if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/webhwp/editor.donga'||q.get('itemId')!=='2089239'||q.get('itemDetailId')!=='2089019'||!document.querySelector('[data-slot=explain].active'))throw Error('Own239 explanation popup required');
 const l=document.querySelector('#webhwpFrame'),c=l.contentWindow.HwpCtrl,f=l.contentDocument.getElementById('hwpctrl_frame'),input=f.contentDocument.getElementById('ImeWrapper_Elm');
 const outer=l.getBoundingClientRect(),inner=f.getBoundingClientRect(),r=input.getBoundingClientRect();
 const caretClick={x:Math.round(outer.x+inner.x+r.x+r.width/2+15),y:Math.round(outer.y+inner.y+r.y+r.height/2)};
 const text=await new Promise((resolve,reject)=>{let done=false;const finish=v=>{if(done)return;done=true;clearTimeout(timer);resolve(typeof v==='string'?v:typeof v?.data==='string'?v.data:null);};const timer=setTimeout(()=>reject(Error('Read-only text callback timeout')),7000);const v=c.GetTextFile('TEXT','',finish);if(typeof v==='string'&&v)finish(v);});
 if(typeof text!=='string')throw Error('Text unavailable');
 if(!c.IsModified&&!window.__qaExplain239BeforeText){if(text.includes('[QA-EXPLANATION-HML-20261110]'))throw Error('Unexpected existing marker');window.__qaExplain239BeforeText=text;window.__qaExplain239BeforeCaret=caretClick;}
 return {status:document.querySelector('[data-webhwp-status]').innerText,pageCount:c.PageCount,modified:c.IsModified,caretClick,text,beforeTextStored:typeof window.__qaExplain239BeforeText==='string',markerCount:text.split('[QA-EXPLANATION-HML-20261110]').length-1,preservedBeforeAfterPrefix:text==='[QA-EXPLANATION-HML-20261110] '+window.__qaExplain239BeforeText};
})()
