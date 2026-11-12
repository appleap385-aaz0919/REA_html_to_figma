(async()=>{
 if(new URLSearchParams(location.search).get('itemId')!=='2089216')throw Error('Own item only');const modal=document.querySelector('#itemProductModal.show');if(!modal||document.querySelectorAll('.modal.show').length!==1)throw Error('Exact product modal required');
 const hidden=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Product modal hidden timeout')),5000);modal.addEventListener('hidden.bs.modal',()=>{clearTimeout(timer);resolve();},{once:true});});
 [...modal.querySelectorAll('[data-bs-dismiss=modal]')].find(e=>e.innerText.trim()==='닫기').click();await hidden;return {closed:true};
})()
