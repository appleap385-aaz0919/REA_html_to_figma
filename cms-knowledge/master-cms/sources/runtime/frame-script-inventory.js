({
  url: location.href,
  scripts: Array.from(document.scripts).map(e => ({src: e.src, type: e.type, inlineLength: e.src ? 0 : e.textContent.length})),
  modulePreloads: Array.from(document.querySelectorAll('link[rel="modulepreload"]')).map(e => e.href),
  fileInputs: Array.from(document.querySelectorAll('input[type="file"]')).map(e => ({accept: e.accept, multiple: e.multiple, id: e.id, name: e.name})),
  buttons: Array.from(document.querySelectorAll('button')).filter(e => /답안 작성|파일 선택/.test(e.textContent)).map(e => ({text: e.textContent, disabled: e.disabled, type: e.type, attributes: Array.from(e.attributes).filter(a => /^(data-|aria-|class$)/.test(a.name)).map(a => [a.name, a.value])}))
})
