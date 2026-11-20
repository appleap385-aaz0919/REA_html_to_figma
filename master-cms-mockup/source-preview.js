/* The preserved service preview runs in its own local frame, like the CMS. */
window.SourcePreview=(()=>{
 function show(o){
  const data=SourceOmr.dataFor(o),error=window.omrSerializers[o.type]?.validate(data);
  if(error)return CMS.alertBox('OMR 미리보기',error);
  let frame,overlay;
  const receive=e=>{
   if(!frame||e.source!==frame.contentWindow||e.data?.source!=='donga-omr-preview')return;
   if(e.data.type==='ready')frame.contentWindow.postMessage({source:'donga-omr-preview',type:'render',omr:data.omr,answer:data.answer},'*');
   if(e.data.type==='rendered')frame.style.height=Math.max(360,Math.ceil(+e.data.height||0))+'px';
   if(e.data.type==='grade'){
    const result=checkLocalAnswer(data.answer,e.data.value);
    frame.contentWindow.postMessage({source:'donga-omr-preview',type:'grade-result',id:e.data.id,result:{message:result==='manual'?'수동 채점이 필요한 답안입니다.':'ok',data:[{is_correct:result==='manual'?null:result}]}},'*');
   }
  };
  window.addEventListener('message',receive);
  overlay=CMS.modal('OMR 미리보기','<iframe class="native-omr-preview-frame" title="OMR 미리보기" src="omr-preview.html"></iframe>',[{label:'닫기',fn:(_,m)=>CMS.closeModal(m)}],{onClose(){window.removeEventListener('message',receive);frame?.remove();frame=null;}});
  overlay.classList.add('omr-preview-overlay');overlay.querySelector('.modal').classList.add('native-omr-preview-modal');
  frame=overlay.querySelector('iframe');return overlay;
 }
 function checkLocalAnswer(rule,value){
  // The service renderer supplies a flat response array. Keep each nested
  // ORDERED/UNORDERED group instead of flattening its grading semantics.
  const values=(Array.isArray(value)?value:[value]).flat(Infinity),size=r=>r?.nodes?.reduce((n,c)=>n+size(c),0)||1;
  const norm=(v,a)=>{let s=String(v??'');if(!a.case_sensitive)s=s.toLocaleLowerCase();if(!a.space_sensitive)s=s.replace(/\s/g,'');return s;};
  function grade(r,v){
   if(!r)return false;if(r.rule_type==='MANUAL')return 'manual';
   if(r.rule_type==='VALUE')return v.length===1&&(r.allowed_answer||[]).some(a=>norm(v[0],a)===norm(a.value,a));
   const children=r.nodes||[];if(v.length!==children.reduce((n,c)=>n+size(c),0))return false;
   if(r.rule_type==='UNORDERED'){
    function match(left,offset,manual){if(!left.length)return manual?'manual':true;for(let k=0;k<left.length;k++){const n=size(left[k]),result=grade(left[k],v.slice(offset,offset+n));if(result){const rest=match(left.filter((_,i)=>i!==k),offset+n,manual||result==='manual');if(rest)return rest;}}return false;}
    return match(children,0,false);
   }
   let offset=0,manual=false;for(const child of children){const n=size(child),result=grade(child,v.slice(offset,offset+n));if(!result)return false;manual||=result==='manual';offset+=n;}return manual?'manual':true;
  }
  return grade(rule,values);
 }
 return {show,checkLocalAnswer};
})();
