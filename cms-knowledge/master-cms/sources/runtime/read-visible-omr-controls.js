(() => {
  const roots = Array.from(document.querySelectorAll('[data-omr-code]')).filter(e => e.getBoundingClientRect().width > 0);
  if (roots.length !== 1) throw new Error('Expected one visible OMR form');
  const root = roots[0];
  return {code: root.getAttribute('data-omr-code'), controls: Array.from(root.querySelectorAll('input,textarea,select')).map(e => ({
    tag: e.tagName, type: e.type, name: e.name, placeholder: e.getAttribute('placeholder'),
    value: e.value, checked: e.checked, readOnly: e.readOnly, disabled: e.disabled, maxLength: e.maxLength
  }))};
})()
