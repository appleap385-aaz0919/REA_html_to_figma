(() => {
  const loader = document.querySelector('#webhwpFrame').contentDocument;
  const win = loader.querySelector('#hwpctrl_frame').contentWindow;
  const doc = win.document;
  return {
    url:win.location.href,
    editable:Array.from(doc.querySelectorAll('textarea,input,[contenteditable],canvas')).map(e => ({
      tag:e.tagName,id:e.id,name:e.name,type:e.type,role:e.getAttribute('role'),
      placeholder:e.getAttribute('placeholder'),editable:e.getAttribute('contenteditable'),
      rect:(() => {const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})()
    })),
    scriptSources:Array.from(doc.scripts).filter(e=>e.src).map(e=>e.src)
  };
})()
