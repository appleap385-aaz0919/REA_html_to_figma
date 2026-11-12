(() => {
 if(location.hostname!=='dev-exambank.dongahub.com'||location.pathname!=='/paper/modify.donga')throw Error('Scope mismatch');
 const f=document.querySelector('#paperModifyForm');if(!f||new URL(f.action).pathname!=='/paper/update.donga')throw Error('Unexpected paper form');
 const expected={"paperId": "341", "paperName": "[MOCK-HML-M] \ud15c\ud50c\ub9bf_\uc2dc\ud5d8\uc9c02 (\ubcf5\uc81c10) [QA-PAPER-20261109]", "startPageNum": "3", "endPageNum": "22", "viewFlag": "R", "serviceUsage": "T"};
 for(const [name,value] of Object.entries(expected)){const e=f.querySelector('input[name="'+name+'"]'+(['viewFlag','serviceUsage'].includes(name)?':checked':''));if(!e||e.value!==value)throw Error('Unexpected '+name);}
 const ids=[...f.querySelectorAll('input[name=itemIds]')].map(e=>e.value);if(JSON.stringify(ids)!==JSON.stringify(["2087755", "2087758", "2087759", "2087760"]))throw Error('Member list changed');
 if(!f.checkValidity())throw Error('Invalid paper form');const b=f.querySelector('[data-paper-save]');if(!b||b.disabled)throw Error('Save unavailable');b.click();return {action:'Actual Save through observed paper Save control',expected,itemIds:ids};
})()