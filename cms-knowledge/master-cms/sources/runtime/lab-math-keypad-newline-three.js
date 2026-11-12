(() => {
 const d=window.MathFieldDialog.get();if(d.backdrop.style.display==='none')throw Error('Open dialog required');const pressed=[];
 for(const label of ['줄바꿈','3']){const b=[...d.backdrop.querySelectorAll('.keypad__key')].find(e=>e.getAttribute('aria-label')===label);if(!b)throw Error('Missing key '+label);const r=b.getBoundingClientRect(),i={bubbles:true,pointerId:74,pointerType:'mouse',clientX:r.x+r.width/2,clientY:r.y+r.height/2};b.dispatchEvent(new PointerEvent('pointerdown',i));window.dispatchEvent(new PointerEvent('pointerup',i));pressed.push(label);}return {action:'Append linebreak and3 through DOM keypad handlers',pressed,latex:d.mf.value};
})()
