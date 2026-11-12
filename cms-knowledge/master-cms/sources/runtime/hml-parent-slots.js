(() => {
  const doc = window.opener?.document || document;
  return {
    parentUrl: doc.location.href,
    editorUrl: doc.querySelector('[data-editor-url]')?.dataset.editorUrl,
    slots: Array.from(doc.querySelectorAll('[data-webhwp-path]')).map(e => ({
      slot: e.dataset.webhwpPath, path: e.value, url: e.dataset.url
    })),
    pending: Array.from(doc.querySelectorAll('[data-webhwp-result]')).map(e => ({slot:e.dataset.webhwpResult, value:e.value}))
  };
})()
