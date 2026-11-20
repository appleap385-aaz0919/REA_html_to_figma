/* Local mounting/persistence adapter for the preserved CMS editor bundle. */
window.SourceHtml=(()=>{
 let api=null,host=null,owner=null;
 function question(i){
  let html=i.html||`<p>${CMS.esc(i.stem)}</p>`;
  if(i.id===2100003&&!html.includes('반비례 그래프')){
   const svg='<svg xmlns="http://www.w3.org/2000/svg" width="250" height="175" viewBox="0 0 250 175"><path d="M15 85H235M125 10V165" stroke="#66717d" fill="none"/><path d="M132 12Q139 60 230 74M18 96Q110 100 118 161" stroke="#263b54" stroke-width="1.5" fill="none"/><text x="235" y="100">x</text><text x="133" y="15">y</text><text x="113" y="100">O</text></svg>';
   html+=`<p><img data-sample-graph="true" src="data:image/svg+xml,${encodeURIComponent(svg)}" alt="반비례 그래프" width="250" height="175"></p>`;
  }
  if(i.choices?.length&&!html.includes('<d-choicewrapper'))html+='<d-choicewrapper>'+i.choices.map((v,n)=>`<li class="d-choice"><d-choicecount key="${n+1}"></d-choicecount><p>${CMS.esc(v)}</p></li>`).join('')+'</d-choicewrapper>';
  return html;
 }
 function capture(){
  if(!api||!owner||CMS.edit!==owner)return;
  const content=api.getDocument().content,i=owner.data;
  i.html=content.questionHtml||'';
  for(const [key,source]of [['answerHtml','correctHtml'],['explanationHtml','explanationHtml'],['modelAnswerHtml','modelAnswerHtml'],['scoringCriteriaHtml','gradingCriteriaHtml']])i[key]=content[source]||'';
  const plain=html=>{const div=document.createElement('div');div.innerHTML=html;return div.textContent;};
  i.explanation=plain(i.explanationHtml);
  owner.dirty=api.isDirty()||owner.dirty;
 }
 function mountViewers(){document.querySelectorAll('[data-native-question]').forEach(host=>{if(host._nativeMounted)return;host._nativeMounted=true;const id=+host.dataset.nativeQuestion,i=CMS.edit?.kind==='item'&&CMS.edit.data.id===id?CMS.edit.data:CMS.item(id);if(!i)return;const questionHtml=question(i);const payload=DongaQuestionEditor.buildViewPayload({schemaVersion:'1.0',content:{questionHtml,correctHtml:i.answerHtml||`<p>${CMS.esc(i.answer)}</p>`,explanationHtml:i.explanationHtml||`<p>${CMS.esc(i.explanation)}</p>`}});DongaQuestionViewer.renderSection(host,payload,'question');});}
 function mount(){
  mountViewers();
  const next=document.getElementById('native-html-editor');
  if(next===host&&api)return;
  if(api){api.destroy();api=null;}host=next;owner=CMS.edit;
  if(!next||owner?.kind!=='item')return;
  const i=owner.data;const questionHtml=question(i);const doc={schemaVersion:'1.0',content:{questionHtml,correctHtml:i.answerHtml||`<p>${CMS.esc(i.answer)}</p>`,explanationHtml:i.explanationHtml||`<p>${CMS.esc(i.explanation)}</p>`,modelAnswerHtml:i.modelAnswerHtml||'',gradingCriteriaHtml:i.scoringCriteriaHtml||''}};
  api=DongaQuestionEditor.create(next,doc,{outputProfile:'html-only',showSaveButton:false,showWarnings:false,onChange:state=>{if(state.dirty&&api)capture();}});
 }
 function insertImage(src){if(!api)return;capture();const doc=api.getDocument();doc.content.questionHtml+=`<p><img src="${src}" alt="등록한 예시 그림"></p>`;api.setDocument(doc,{force:true});capture();owner.dirty=true;}
 return {mount,mountViewers,capture,insertImage,get api(){return api;}};
})();
