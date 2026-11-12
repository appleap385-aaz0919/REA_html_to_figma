(async () => {
 const a=document.querySelector('a[href="#frameTabDirect"]');if(!a||location.pathname!=='/lab/view/question-frame.donga')throw Error('Expected frame test tab absent');
 if(a.getAttribute('aria-selected')==='true'&&document.querySelector('#frameTabDirect.active'))return {tab:'direct',alreadySelected:true};
 return await new Promise(resolve=>{let done=false;const finish=completed=>{if(done)return;done=true;resolve({tab:'direct',eventCompleted:completed,selected:a.getAttribute('aria-selected')});};document.addEventListener('shown.bs.tab',e=>{if(e.target===a)finish(true);},{once:true});a.click();setTimeout(()=>finish(false),2500);});
})()
