({url:location.href,links:Array.from(document.querySelectorAll('.pagination a')).map(e=>({
  text:e.textContent.trim(),label:e.getAttribute('aria-label'),title:e.title,href:e.getAttribute('href'),
  hxGet:e.getAttribute('hx-get'),hxVals:e.getAttribute('hx-vals'),className:e.className,
  parentClass:e.parentElement.className,tabindex:e.getAttribute('tabindex'),ariaDisabled:e.getAttribute('aria-disabled')
}))})
