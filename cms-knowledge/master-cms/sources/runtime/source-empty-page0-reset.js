(async () => {
  const button = document.querySelector('button[data-reset]');
  if (location.hostname !== 'dev-exambank.dongahub.com' || location.pathname !== '/product/list.donga' || document.querySelector('#curriculumSelect')?.value !== '15' || !button) throw Error('Expected source empty filter');
  button.click();
  const search = document.querySelector('button[hx-get="/product/list.donga"]');
  const params = new URL(location.href).searchParams;
  return {url:location.href,curriculum:document.querySelector('#curriculumSelect').value,keyword:document.querySelector('[name="keyword"]').value,searchPresent:!!search,pageParam:params.get('pageNum')};
})()
