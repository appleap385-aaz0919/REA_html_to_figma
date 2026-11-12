(() => {
  const owner = document.querySelector('[data-editor-url]');
  const baseline = window.__qaCancel239ParentBaseline;
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/item/all/modify.donga' ||
      owner?.dataset.itemId !== '2089239' || owner.dataset.itemDetailId !== '2089104' || !baseline) throw Error('Expected original owned edit and baseline');
  const question = window.itemEditors.question.getDocument();
  const omr = window.omrSerializers.OBSACN.serialize(document.querySelector('#omrSlot [data-omr-code="OBSACN"]'));
  const slots = [...document.querySelectorAll('[data-webhwp-path]')].map(e => ({slot:e.dataset.webhwpPath,path:e.value}));
  const pending = [...document.querySelectorAll('[data-webhwp-result]')].filter(e=>e.value).map(e=>({slot:e.dataset.webhwpResult,path:e.value.split('?')[0]}));
  const same = {question:JSON.stringify(question)===JSON.stringify(baseline.question),
                omr:JSON.stringify(omr)===JSON.stringify(baseline.omr),
                slots:JSON.stringify(slots)===JSON.stringify(baseline.slots)};
  if (!Object.values(same).every(Boolean) || pending.map(e=>e.slot).join(',') !== 'explain.hml,explain.image') throw Error('Expected only the two pending explanation assets');
  return {url:location.href,ownerDetailId:owner.dataset.itemDetailId,same,pending,modal:document.querySelector('.modal.show')?.id??null};
})()
