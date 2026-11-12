(() => {
  const form = document.querySelector('#paperModifyForm');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/paper/modify.donga' ||
      new URL(location.href).searchParams.get('paperId') !== '1094' || !form || new URL(form.action).pathname !== '/paper/update.donga' ||
      ![...form.querySelectorAll('dd')].some(e=>e.textContent.trim()==='1094 (1177)') || window.__qaPaper1094ReverseAttempt ||
      document.querySelector('.modal.show')) throw Error('Expected own paper1094 detail1177');
  const expected = {paperId:'1094',paperName:'QA-HML-20261109-02-SET4-SINGLE1',startPageNum:'2',endPageNum:'1',viewFlag:'R',serviceUsage:'C'};
  for (const [name,value] of Object.entries(expected)) {
    const field = form.querySelector('[name="'+name+'"]'+(['viewFlag','serviceUsage'].includes(name)?':checked':''));
    if (field?.value !== value) throw Error('Unexpected field '+name);
  }
  if ([...form.querySelectorAll('[name="itemIds"]')].map(e=>e.value).join(',') !== '2089238' || !form.checkValidity()) throw Error('Member or validation mismatch');
  const button = form.querySelector('[data-paper-save]');
  if (!button || button.matches(':disabled')) throw Error('Save button unavailable');
  const probe = window.__qaPaper1094ReverseAttempt = {clicked:false,request:null,result:null};
  form.addEventListener('htmx:beforeRequest', event => {
    const xhr = event.detail.xhr;
    probe.request = {verb:event.detail.requestConfig.verb,path:event.detail.requestConfig.path};
    xhr.addEventListener('loadend', () => {
      probe.result = {status:xhr.status,url:xhr.responseURL,hxTrigger:xhr.getResponseHeader('HX-Trigger'),hxRedirect:xhr.getResponseHeader('HX-Redirect')};
    }, {once:true});
  }, {once:true});
  probe.clicked=true;
  button.click();
  return {clicked:true,paperId:1094,version:1177,start:2,end:1,request:probe.request};
})()
