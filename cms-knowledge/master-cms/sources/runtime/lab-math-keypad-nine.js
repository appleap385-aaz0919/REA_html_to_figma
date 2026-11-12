(() => {
 const d=window.MathFieldDialog.get();if(d.backdrop.style.display==='none')throw Error('Open dialog required');d.mf.value='';
 const b=[...d.backdrop.querySelectorAll('.keypad__key')].find(e=>e.getAttribute('aria-label')==='9');if(!b)throw Error('9 key absent');const r=b.getBoundingClientRect(),i={bubbles:true,pointerId:73,pointerType:'mouse',clientX:r.x+r.width/2,clientY:r.y+r.height/2};b.dispatchEvent(new PointerEvent('pointerdown',i));window.dispatchEvent(new PointerEvent('pointerup',i));return {action:'Clear field via MathLive property, press9 DOM keypad handlers',latex:d.mf.value};
})()
