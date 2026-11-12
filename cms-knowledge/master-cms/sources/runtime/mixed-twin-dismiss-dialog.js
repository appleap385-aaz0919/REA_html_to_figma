(async () => {
  const modal = document.querySelector('#itemTwinModal.show');
  if (location.hostname !== 'dev-exambank.dongahub.com' || !['2089242','2089246'].includes(new URL(location.href).searchParams.get('itemId')) || !modal) throw Error('Expected fixture Twin modal');
  const closeButton = modal.querySelector('.modal-header [data-bs-dismiss="modal"]');
  if (!closeButton) throw Error('Modal close control missing');
  await new Promise((resolve,reject) => {
    const timer = setTimeout(() => reject(Error('Modal did not close')), 7000);
    modal.addEventListener('hidden.bs.modal', () => { clearTimeout(timer); resolve(); }, {once:true});
    closeButton.click();
  });
  return {url:location.href, modal:document.querySelector('.modal.show')?.id ?? null, backdrop:!!document.querySelector('.modal-backdrop')};
})()
