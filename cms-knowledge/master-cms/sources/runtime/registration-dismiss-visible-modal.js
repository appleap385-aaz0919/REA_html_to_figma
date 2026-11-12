(async () => {
 if(location.hostname!=='dev-exambank.dongahub.com'||!/^\/item\/(hml|difi)\//.test(location.pathname))throw Error('Registration scope mismatch');
 const shown=[...document.querySelectorAll('.modal.show')];if(shown.length!==1)throw Error('Expected exactly one exam modal; re-observe rather than dismiss an arbitrary stacked modal');
 const m=shown[0];if(!m.id.startsWith('exam'))throw Error('Expected exam modal absent');
 const b=m.querySelector('.modal-footer [data-bs-dismiss="modal"]');if(!b)throw Error('Non-submitting dismiss control absent');
 return await new Promise((resolve,reject)=>{let finished=false;const timer=setTimeout(()=>{if(finished)return;finished=true;reject(Error('Modal did not finish hiding; stop subsequent actions and re-observe'));},2500);m.addEventListener('hidden.bs.modal',()=>{if(finished)return;finished=true;clearTimeout(timer);if(m.classList.contains('show'))return reject(Error('Hidden event retained show class'));resolve({action:'Dismiss exam notice/confirmation without submitting business form',modalId:m.id,eventCompleted:true,modalClass:m.className});},{once:true});b.click();});
})()
