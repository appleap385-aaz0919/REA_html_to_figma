/* The same preserved editor in the host page and an independent local iframe. */
window.SourceIsolation=(()=>{
 let api=null,host=null,side=null;
 const state=()=>CMS.labIsolation;
 function capture(){const s=state();if(api&&side==='original'&&s.mounted.original)s.original=api.getDocument();}
 function output(value){const text=typeof value==='string'?value:JSON.stringify(value,null,2);state().apiOutput=text;const el=document.getElementById('isolation-api-output');if(el)el.textContent=text;}
 function draw(){const s=state(),doc=s[s.tab],target=document.getElementById('isolation-preview');if(!target)return;target.replaceChildren();if(!s.mounted[s.tab]||!doc)return;if(typeof doc.content?.passageHtml==='string')DongaQuestionViewer.renderPassage(target,doc);else DongaQuestionViewer.renderSection(target,DongaQuestionEditor.buildViewPayload(doc),'question');}
 function height(frame,value){if(frame)frame.style.height=state().frameHeight==='fixed'?'640px':Math.max(320,value||320)+'px';}
 function mount(){
  const next=document.getElementById('isolation-original');
  if(next!==host){capture();api?.destroy();api=null;host=next;side=state().tab;}
  if(next&&!api&&state().mounted.original)api=DongaQuestionEditor.create(next,state().original,{outputProfile:'html-only',showSaveButton:false,onChange:()=>capture()});
  const frame=document.getElementById('isolation-frame');if(frame&&!frame.getAttribute('src')){frame.src='isolation-frame.html';height(frame);}
  draw();
 }
 function load(){let doc;try{doc=JSON.parse(document.getElementById('isolation-json').value);if(!doc.content)throw Error('content가 있는 문서 JSON을 입력해 주세요.');const result=DongaQuestionEditor.validateDocument(doc);if(result?.valid===false)throw Error('문서 구조를 확인해 주세요.');}catch(e){CMS.alertBox('문서 로드 실패',e.message);return;}
  api?.destroy();api=null;host=null;const s=state();s.isolated=CMS.clone(doc);s.original=CMS.clone(doc);s.iframe=CMS.clone(doc);s.mounted={original:true,iframe:true};s.apiOutput='문서를 두 편집기에 불러왔습니다.';CMS.render();
 }
 function call(command,enabled){const s=state();capture();if(!s.mounted[s.tab])return output('편집기가 없습니다. 문서 JSON을 불러오세요.');
  if(s.tab==='iframe')document.getElementById('isolation-frame')?.contentWindow.postMessage({nativeIsolation:true,command,enabled},'*');
  else if(api){if(command==='objective'){api.setMultipleChoice(enabled);capture();output('setMultipleChoice('+enabled+')');}else if(command==='destroy'){api.destroy();api=null;}else output(command==='save'?api.save():api.getDocument());}
  if(command==='destroy'){s.mounted[s.tab]=false;output('destroy() · 완료');CMS.render();}
 }
 addEventListener('message',e=>{const frame=document.getElementById('isolation-frame');if(!frame||e.source!==frame.contentWindow||!e.data?.nativeIsolation)return;const s=state(),{kind,value}=e.data;height(frame,e.data.height);if(kind==='ready')frame.contentWindow.postMessage({nativeIsolation:true,command:'mount',doc:s.iframe},'*');if(kind==='change')s.iframe=value;if(kind==='output')output(value);});
 return {mount,capture,load,draw,call,height,compare(){capture();const s=state();output(!s.mounted.original||!s.mounted.iframe?'두 편집기를 모두 불러온 뒤 비교하세요.':JSON.stringify(s.original)===JSON.stringify(s.iframe)?'두 문서가 같습니다.':'두 문서가 다릅니다. 각 탭의 로컬 변경은 독립적입니다.');}};
})();
