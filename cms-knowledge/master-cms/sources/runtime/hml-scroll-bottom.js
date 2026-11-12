(() => {
  const loader = document.querySelector('#webhwpFrame').contentDocument;
  const editor = loader.querySelector('#hwpctrl_frame').contentDocument;
  const scroll = editor.querySelector('#hcwoViewScroll');
  const before = scroll.scrollTop;
  scroll.scrollTop = scroll.scrollHeight;
  return {before, scrollTop: scroll.scrollTop, clientHeight: scroll.clientHeight,
    scrollHeight: scroll.scrollHeight, atBottom: scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 1};
})()
