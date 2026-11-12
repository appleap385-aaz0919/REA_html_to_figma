(() => {
 const d=window.MathFieldDialog?.get();if(location.pathname!=='/lab/view/math-demo.donga'||d?.backdrop.style.display==='none')throw Error('Math dialog must be open');
 d.mf.value='';
 const pressed=[];for(const label of ['1','+','2']){const b=[...d.backdrop.querySelectorAll('.keypad__key')].find(e=>e.getAttribute('aria-label')===label);if(!b)throw Error('Key absent '+label);const r=b.getBoundingClientRect(),init={bubbles:true,pointerId:71,pointerType:'mouse',button:0,clientX:r.x+r.width/2,clientY:r.y+r.height/2};b.dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointerup',init));pressed.push(label);}
 return {inputMethod:'MathLive value cleared through its public property, then actual DOM keypad pointerdown/up handlers',pressed,latex:d.mf.value};
})()
