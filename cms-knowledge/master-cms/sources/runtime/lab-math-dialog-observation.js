(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/lab/view/math-demo.donga')throw Error('Math demo scope mismatch');
 const d=window.MathFieldDialog?.get();if(!d)throw Error('Dialog unavailable');
 return {url:location.href,visibility:document.visibilityState,dialogOpen:d.backdrop.style.display!=='none',tab:d.tab,latex:d.mf.value,mathModeSpace:d.mf.mathModeSpace,
  tabs:[...d.backdrop.querySelectorAll('.math-dialog__tab')].map(e=>({tab:e.dataset.tab,selected:e.classList.contains('is-active'),display:e.style.display})),
  keyboardTabs:[...d.backdrop.querySelectorAll('.keypad__tab')].map(e=>({text:e.innerText,selected:e.getAttribute('aria-selected')})),
  keys:[...d.backdrop.querySelectorAll('.keypad__key')].map(e=>({label:e.getAttribute('aria-label'),text:e.innerText,disabled:e.disabled})),
  matrix:{open:d.matrix.backdrop.style.display!=='none',rows:d.matrix.rows.value,cols:d.matrix.cols.value},
  ink:{exists:!!d.ink,isEmpty:d.ink?.isEmpty,buttons:[...d.backdrop.querySelectorAll('[data-ink]')].map(e=>({action:e.dataset.ink,disabled:e.disabled,text:e.innerText})),canvases:[...d.inkHost.querySelectorAll('canvas')].map(e=>({width:e.width,height:e.height,clientWidth:e.clientWidth,clientHeight:e.clientHeight})),result:d.resultBox.innerText,error:d.errorEl.innerText},
  answerValue:document.querySelector('#answerField')?.value,answerPlaceholder:document.querySelector('#answerField')?.placeholder,answerLatexOut:document.querySelector('#answerLatexOut')?.innerText,
  mathNodes:[...document.querySelectorAll('#mre1 [data-latex],#mre4 [data-latex]')].map(e=>({editor:e.closest('[id^=mre]')?.id,type:e.dataset.type,latex:e.dataset.latex}))};
})()
