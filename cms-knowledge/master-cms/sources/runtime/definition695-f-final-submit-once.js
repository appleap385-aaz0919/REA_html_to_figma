(()=>{
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/item/difi/detail.donga'||new URLSearchParams(location.search).get('examDocumentId')!=='695'||window.__qa695FSubmitted)throw Error('Own unsubmitted Definition695 required');
 const f=document.getElementById('examApproveForm'),ss=[...document.querySelectorAll('[data-exam-judge]')],modal=document.querySelector('#examApproveModal.modal.show'),remark=document.querySelector('textarea[name=remark]');
 if(f?.getAttribute('hx-post')!=='/item/difi/approve.donga'||f.elements.examDocumentId.value!=='695'||ss.length!==1||ss[0].dataset.itemIds!=='2089375'||ss[0].value!=='F'||!modal||document.querySelectorAll('.modal.show').length!==1||remark?.value!=='QA-DIFI-20261110-06-ORDERED1 F-only review acceptance and final item-state check; development research.')throw Error('Exact F-only review/form/modal mismatch');
 window.__qa695FEvents=[];
 f.addEventListener('htmx:afterRequest',e=>{let approved=false;try{approved=!!JSON.parse(e.detail.xhr.getResponseHeader('HX-Trigger')||'{}').examApproved;}catch{}window.__qa695FEvents.push({status:e.detail?.xhr?.status,successful:e.detail?.successful,examApproved:approved});});
 window.__qa695FSubmitted=true;modal.querySelector('[data-action-ok]').click();
 return {finalApprovalClicked:true,attemptCount:1,documentId:695,judge:'F',generatedJudgeFields:[...f.querySelectorAll('[data-judge-fields] input')].map(e=>({name:e.name,value:e.value})),events:window.__qa695FEvents};
})()
