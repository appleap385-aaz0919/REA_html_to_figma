/* Adapt the preserved 14 OMR leaves to the offline CMS store.
 * Markup, leaf interactions, serializers and validation come from source evidence;
 * persistence, preview transport and the math-dialog entry stay local.
 */
window.SourceOmr=(()=>{
 const clone=x=>JSON.parse(JSON.stringify(x));
 let mounting=false,queued=false;
 const roots=()=>[...document.querySelectorAll('.source-omr [data-omr-code]')];
 const model=root=>CMS.OMR?.get(root.closest('.source-omr').dataset.sourceContext.replace(/-locked$/,''));
 function form(o,context='editor',locked=false){
  let markup=context.startsWith('gallery-')&&!locked?SourceOmrCards[o.type]:SourceOmrTemplates[o.type];
  if(context.startsWith('gallery-')&&!locked)markup=markup.replace('class="btn btn-sm flex-shrink-0 omr-preview-btn"',`class="btn btn-sm flex-shrink-0 omr-preview-btn" data-action="gallery-preview" data-context="${context}"`).replace('class="btn btn-sm omr-reset"',`class="btn btn-sm omr-reset" data-action="gallery-reset" data-context="${context}"`);
  return `<div class="source-omr omr-form" data-source-context="${CMS.esc(context)}" data-source-type="${o.type}" ${locked?'data-source-locked':''}>${markup||''}</div>`;
 }
 function collectAnswers(rule){if(!rule||typeof rule!=='object')return [];if(rule.rule_type==='VALUE')return (rule.allowed_answer||[]).map(a=>String(a.value??''));return Object.values(rule).flatMap(v=>Array.isArray(v)?v.flatMap(collectAnswers):typeof v==='object'?collectAnswers(v):[]);}
 function project(root,o,out){
  o.sourceData=clone(out);o.sourceError=null;
  if(o.type==='OBSACN'||o.type==='OBMACN'){
   const rows=[...root.querySelectorAll(`.omr-${o.type.toLowerCase()}-row`)];
   o.count=rows.length;o.labels=rows.map(r=>ValueTypeInput.getValue(r.querySelector('.vt-cell')).value);
   o.answers=rows.flatMap((r,n)=>r.querySelector('input[type=radio],input[type=checkbox]')?.checked?[String(n+1)]:[]);
  }else o.answers=collectAnswers(out.answer).filter(v=>v!=='');
  o.manual=['SBSADR','ESBA00'].includes(o.type);
 }
 function snapshot(root,dirty=true){
  if(mounting||root?._sourceInitializing||!root?.isConnected)return;
  const wrap=root.closest('.source-omr');if(wrap.hasAttribute('data-source-locked'))return;
  const o=model(root),ser=window.omrSerializers[root.dataset.omrCode];if(!o||!ser)return;
  const out=ser.serialize(root);project(root,o,out);
  if(dirty&&wrap.dataset.sourceContext==='editor'&&CMS.edit){CMS.edit.dirty=true;CMS.edit.data.type=o.type;}
  const json=document.querySelector('#editor-omr-json');if(json&&wrap.dataset.sourceContext==='editor')json.textContent=JSON.stringify(out,null,2);
  const labJson=document.querySelector(`[data-gallery-json="${wrap.dataset.sourceContext}"]`);if(labJson)labJson.textContent=JSON.stringify(out,null,2);
 }
 function seed(root,o){
  const code=o.type.toLowerCase();
  let sequence=0;
  root.querySelectorAll('.vt-cell').forEach(cell=>{
   if(cell.closest('.d-none'))return;
   const affix=cell.closest(`[class*="-pre"],[class*="-post"]`);
   let value=affix?'':(o.answers[0]||String(++sequence));
   if(o.type==='OBSACN'||o.type==='OBMACN'){
    const row=cell.closest(`.omr-${code}-row`),rows=[...root.querySelectorAll(`.omr-${code}-row`)];
    value=o.labels?.[rows.indexOf(row)]||String(rows.indexOf(row)+1);
   }else if(o.type==='OBSAOX'||o.type==='OBMAOX')value=cell.dataset.vtValue||'O';
   else if(['SBSAAS','SBMAAS','SBMALD','SBMADD'].includes(o.type)&&!affix)value=String(++sequence);
   ValueTypeInput.setValue(cell,{value,value_type:cell.dataset.vtType||cell.dataset.vtAllowed?.split(',')[0]||'text'});
  });
  if(o.type==='OBSACN'||o.type==='OBMACN')root.querySelectorAll(`.omr-${code}-row`).forEach((row,n)=>{row.querySelector('input[type=radio],input[type=checkbox]').checked=o.answers.includes(String(n+1));});
  if(o.type==='OBMAOX')root.querySelectorAll('.omr-obmaox-row').forEach(row=>{const radio=row.querySelector('input[type=radio]');if(radio)radio.checked=true;});
  if(o.type==='SBSAAS'||o.type==='SBMAAS'){const groups=root.querySelectorAll(o.type==='SBSAAS'?'.omr-sbsaas-opts':'.omr-sbmaas-opts');groups.forEach(g=>{const radio=g.querySelector('input[type=radio]');if(radio)radio.checked=true;});}
  if(['SBMALD','SBMADD'].includes(o.type)){const choices=[...root.querySelectorAll('.omr-'+code+'-leg')].map(e=>({value:e.dataset.legid,label:ValueTypeInput.getValue(e.querySelector('.vt-cell'))}));root.querySelectorAll('.vtd-cell').forEach((c,n)=>{if(choices.length)ValueTypeDropdown.setValue(c,choices[n%choices.length].value);});}
  if(o.type==='OBSAOX')root.querySelectorAll('input[type=radio]').forEach((input,n)=>input.checked=(o.answers[0]||'O')===(n===0?'O':'X'));
  root.querySelectorAll('textarea').forEach(t=>t.value='');
 }
 function mount(){
  mounting=true;
  try{for(const root of roots()){
   if(root._sourceMounted)continue;root._sourceMounted=true;root._sourceInitializing=true;
   const wrap=root.closest('.source-omr'),o=model(root);if(!o)continue;
   ValueTypeInput.init(root);ValueTypeDropdown.init(root);root.querySelectorAll('math-field[data-placeholder]').forEach(m=>m.placeholder=m.dataset.placeholder);
   const ser=window.omrSerializers[o.type];
   if(o.sourceData){if(!ser.hydrate(root,clone(o.sourceData))){o.sourceError='저장된 OMR 형식이 문항 유형과 맞지 않습니다.';wrap.insertAdjacentHTML('afterbegin',`<p class="error-text">${o.sourceError}</p>`);}}
   else seed(root,o);
   // Each simultaneous gallery/locked form owns its radio group.
   namespaceRadios(root);
   if(wrap.hasAttribute('data-source-locked'))root.querySelectorAll('input,select,textarea,button,math-field').forEach(input=>{input.disabled=true;if(input.tagName==='MATH-FIELD')input.readOnly=true;});
   else if(!o.sourceError)project(root,o,ser.serialize(root));
   if(contextIsGallery(wrap))window.omrMonitorRefresh(root);
   setTimeout(()=>{root._sourceInitializing=false;},0);
  }}finally{mounting=false;}
 }
 const contextIsGallery=wrap=>wrap.dataset.sourceContext.startsWith('gallery-');
 window.showToast=message=>CMS.toast(message);
 function namespaceRadios(root){const context=root.closest('.source-omr').dataset.sourceContext;root.querySelectorAll('input[type=radio]').forEach(input=>{if(!input.name.startsWith(context+'-'))input.name=context+'-'+input.name;});}
 function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;mount();});}
 document.addEventListener('input',e=>{const root=e.target.closest?.('.source-omr [data-omr-code]');if(root)snapshot(root);});
 document.addEventListener('change',e=>{const root=e.target.closest?.('.source-omr [data-omr-code]');if(root)queueMicrotask(()=>snapshot(root));});
 document.addEventListener('vt:change',e=>{const root=e.target.closest?.('.source-omr [data-omr-code]');if(root)queueMicrotask(()=>snapshot(root));});
 // A native delete handler detaches its button before the bubble listener runs.
 // Keep the owning root while it is still connected, then serialize after it runs.
 document.addEventListener('click',e=>{const root=e.target.closest?.('.source-omr [data-omr-code]');if(root)setTimeout(()=>{namespaceRadios(root);snapshot(root);},0);},true);
 document.addEventListener('click',e=>{
  const wrap=e.target.closest?.('.source-omr');if(!wrap)return;
  const dropdown=e.target.closest('[data-bs-toggle="dropdown"]');
  if(dropdown){e.preventDefault();const menu=dropdown.parentElement.querySelector('.dropdown-menu');if(menu){const open=menu.classList.contains('show');document.querySelectorAll('.source-omr .dropdown-menu.show').forEach(m=>m.classList.remove('show'));menu.classList.toggle('show',!open);}}
  else if(e.target.closest('.dropdown-item'))wrap.querySelectorAll('.dropdown-menu.show').forEach(m=>m.classList.remove('show'));
  const math=e.target.closest('.vt-math-open');
  if(math){e.preventDefault();const cell=math.closest('.vt-cell');CMS.openMath(ValueTypeInput.getValue(cell).value,value=>{ValueTypeInput.setValue(cell,{value,value_type:'math'});snapshot(cell.closest('[data-omr-code]'));});}
  const root=e.target.closest('[data-omr-code]');if(root)queueMicrotask(()=>{ValueTypeInput.init(root);ValueTypeDropdown.init(root);namespaceRadios(root);root.querySelectorAll('math-field[data-placeholder]').forEach(m=>m.placeholder=m.dataset.placeholder);snapshot(root);});
 });
 document.addEventListener('click',e=>{if(!e.target.closest?.('.source-omr .dropdown'))document.querySelectorAll('.source-omr .dropdown-menu.show').forEach(m=>m.classList.remove('show'));});
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 function dataFor(o){
  if(o.sourceData)return clone(o.sourceData);
  const host=document.createElement('div');host.innerHTML=SourceOmrTemplates[o.type];const root=host.querySelector('[data-omr-code]');
  if(!root)throw Error('지원하지 않는 OMR 유형입니다.');
  ValueTypeInput.init(root);ValueTypeDropdown.init(root);seed(root,o);
  const out=omrSerializers[o.type].serialize(root);return clone(out);
 }
 return {form,mount,snapshot,collectAnswers,dataFor,validate:o=>o.sourceError||(o.sourceData?window.omrSerializers[o.type]?.validate(o.sourceData):null)};
})();
