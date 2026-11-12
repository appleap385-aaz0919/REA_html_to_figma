(() => {
  const clone = document.documentElement.cloneNode(true);
  for (const node of clone.querySelectorAll('input,meta')) {
    if (/csrf|password|access.?token|refresh.?token/i.test(node.getAttribute('name') || '')) node.remove();
  }
  for (const node of clone.querySelectorAll('*')) {
    for (const attr of Array.from(node.attributes)) {
      if (/csrf|nonce|auth.?token/i.test(attr.name)) node.removeAttribute(attr.name);
    }
  }
  return {url:location.href, title:document.title, html:'<!DOCTYPE html>\n'+clone.outerHTML,
    redaction:'Password and CSRF/token-named input/meta nodes and nonce/token attributes removed; cookies/storage never read.'};
})()
