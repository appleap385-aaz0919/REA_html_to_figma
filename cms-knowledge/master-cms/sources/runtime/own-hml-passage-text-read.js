(async()=>{
 const query=new URLSearchParams(location.search);if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/webhwp/editor.donga'||query.get('itemId')!=='2089242'||query.get('itemDetailId')!=='2088906'||!document.querySelector('[data-slot=passage].active'))throw Error('Own shared passage editor only');
 const loader=document.getElementById('webhwpFrame'),control=loader.contentWindow.HwpCtrl,frame=loader.contentDocument.getElementById('hwpctrl_frame');
 const input=frame.contentDocument.getElementById('ImeWrapper_Elm');const outer=loader.getBoundingClientRect(),inner=frame.getBoundingClientRect(),r=input.getBoundingClientRect();
 const base={status:document.querySelector('[data-webhwp-status]').innerText,pageCount:control.PageCount,modified:control.IsModified,caretClick:{x:Math.round(outer.x+inner.x+r.x+r.width/2+15),y:Math.round(outer.y+inner.y+r.y+r.height/2)}};
 const text=await new Promise(resolve=>{let done=false;const finish=value=>{if(done)return;done=true;clearTimeout(timer);resolve(value);};const timer=setTimeout(()=>finish({method:'GetTextFile TEXT',callbackTimedOut:true}),5000);const returned=control.GetTextFile('TEXT','',value=>finish({method:'GetTextFile TEXT callback',value:typeof value==='string'?value:typeof value?.data==='string'?value.data:null,responseKeys:value&&typeof value==='object'?Object.keys(value):[]}));if(typeof returned==='string'&&returned)finish({method:'GetTextFile TEXT return',value:returned});});
 return {...base,text};
})()
