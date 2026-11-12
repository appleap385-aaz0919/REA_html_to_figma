({
  url: location.href,
  visibility: document.visibilityState,
  selectedTabs: Array.from(document.querySelectorAll('[role="tab"][aria-selected="true"]')).map(e => e.textContent.trim()),
  questionType: ['qtCategory', 'qtAnswer', 'qtType'].map(id => {
    const e = document.getElementById(id);
    return e ? {id, value: e.value, label: e.selectedOptions[0]?.textContent} : {id, missing: true};
  }),
  visibleMathFields: Array.from(document.querySelectorAll('math-field')).filter(e => e.getBoundingClientRect().width > 0).map(e => ({value: e.value, placeholder: e.getAttribute('placeholder')})),
  scrollers: Array.from(document.querySelectorAll('body, body *')).filter(e => {
    const s = getComputedStyle(e);
    return e.scrollHeight > e.clientHeight + 5 && e.clientHeight > 100 && /(auto|scroll)/.test(s.overflowY);
  }).map(e => ({tag: e.tagName, id: e.id, className: e.className, scrollTop: e.scrollTop, clientHeight: e.clientHeight, scrollHeight: e.scrollHeight})),
  viewport: {width: innerWidth, height: innerHeight, windowScrollY: scrollY, documentScrollTop: document.scrollingElement?.scrollTop}
})
