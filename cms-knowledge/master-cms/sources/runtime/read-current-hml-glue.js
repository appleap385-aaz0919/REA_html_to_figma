(async () => {
  const editorUrl = new URL(document.querySelector('[data-editor-url]').dataset.editorUrl, location.href);
  if (editorUrl.origin !== location.origin) throw new Error('Unexpected editor origin');
  const response = await fetch(editorUrl, {credentials:'same-origin'});
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  const src = Array.from(doc.querySelectorAll('script[src]')).map(e => e.getAttribute('src'))
    .find(s => /^\/js\/webhwp\/webhwp-[a-f0-9]+\.js$/.test(s));
  if (!src) throw new Error('No declared HML glue source');
  const assetUrl = new URL(src, location.origin);
  const asset = await fetch(assetUrl, {credentials:'same-origin'});
  return {pageUrl:editorUrl.href,pageStatus:response.status,assetUrl:assetUrl.href,
    assetStatus:asset.status,contentType:asset.headers.get('content-type'),source:await asset.text()};
})()
