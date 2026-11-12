(() => {
  function inspect(win, depth = 0) {
    try {
      const doc = win.document;
      return {
        url: win.location.href,
        title: doc.title,
        text: (doc.body?.innerText || '').slice(0, 15000),
        controlKeys: win.HwpCtrl ? Object.getOwnPropertyNames(win.HwpCtrl).slice(0, 100) : [],
        scrollers: Array.from(doc.querySelectorAll('body, body *')).filter(e => {
          const s = win.getComputedStyle(e);
          return e.scrollHeight > e.clientHeight + 5 && e.clientHeight > 100 && /(auto|scroll)/.test(s.overflowY);
        }).map(e => ({tag: e.tagName, id: e.id, className: e.className,
          scrollTop: e.scrollTop, height: e.clientHeight, scrollHeight: e.scrollHeight})),
        frames: depth < 3 ? Array.from(doc.querySelectorAll('iframe')).map(e => ({
          id: e.id, name: e.name, src: e.src, child: inspect(e.contentWindow, depth + 1)
        })) : []
      };
    } catch (e) { return {access: 'cross-origin', message: e.name}; }
  }
  return inspect(window);
})()
