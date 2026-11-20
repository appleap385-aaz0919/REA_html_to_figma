/* Offline, opt-in visual review. This module never edits CMS data; the optional file bridge delivers review requests. */
window.CMSReview=(()=>{
 'use strict';
 const KEY='master-cms-visual-review-v2',SCHEMA='master-cms-review/1';
 const states={new:'전달 대기',queued:'요청 전달됨',working:'수정 중',needs_input:'답변 대기',ready:'확인해 주세요',done:'확인 완료',cancelled:'취소'};
 const kinds={layout:'화면·배치 수정',feature:'기능 수정',bug:'오류 수정'};
 const scopes={single:'이 화면의 이 요소',shared:'같은 공통 요소 전체'};
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clone=x=>JSON.parse(JSON.stringify(x)),time=()=>new Date().toISOString(),uid=()=>crypto.randomUUID();
 const blank=()=>({schema:SCHEMA,revision:0,items:[],draft:null,composers:{}});
 let data=blank(),raw=null,open=false,marking=false,hidden=false,filter='active',selected='',conflict=false,persisted=true,capturing=false,drawing=null,pendingAnchor='',notice='';
 let workerTools=false,bridgeSeen=0,reloadNeeded=false,historyFocus='';const pageLoadedAt=Date.now();const reworkOpen=new Set();
 let descriptionMode=false;const VIEW_KEY='master-cms-review-view-v1';let panelScroll=0,auxOpen=new Set(),restoredPageScroll=null;
 const tabScroll={requests:0,description:0};
 const expanded=new Set(),inertNodes=new Map(),modalOrigins=new WeakMap();let lastAction='';
 // The user explicitly requested deletion of all earlier review requests. CMS data is separate.
 try{localStorage.removeItem('master-cms-visual-review-v1');raw=localStorage.getItem(KEY);if(raw)data=validate(JSON.parse(raw));}catch(e){notice='저장된 검수 자료를 읽지 못했습니다. 원본 저장값을 유지합니다. JSON 내보내기 후 확인하세요.';persisted=false;}
 // Recover drafts mistakenly left in the editor by older versions after a rework was sent.
 for(const i of data.items){const last=i.messages.filter(m=>['comment','rework','answer'].includes(m.kind)).at(-1),c=data.composers[i.id];if(['new','queued','working'].includes(i.status)&&last&&c?.note.trim()===last.text.trim())c.note='';}
 try{const v=JSON.parse(sessionStorage.getItem(VIEW_KEY));if(v){open=v.open===true;descriptionMode=v.tab==='description';hidden=v.hidden===true;filter=['active','current','done','all'].includes(v.filter)?v.filter:'active';selected=typeof v.selected==='string'?v.selected:'';for(const id of v.expanded||[])if(data.items.some(i=>i.id===id))expanded.add(id);for(const id of v.reworkOpen||[])if(data.items.some(i=>i.id===id))reworkOpen.add(id);panelScroll=Math.max(0,Number(v.scroll)||0);tabScroll.requests=Math.max(0,Number(v.tabScroll?.requests)||0);tabScroll.description=Math.max(0,Number(v.tabScroll?.description)||0);tabScroll[descriptionMode?'description':'requests']=panelScroll;auxOpen=new Set((v.auxOpen||[]).filter(x=>typeof x==='string'));if(v.route===location.hash)restoredPageScroll=v.pageScroll;}else if(data.draft||data.items.some(i=>!terminal(i))){open=true;const latest=data.items.filter(i=>!terminal(i)).at(-1);if(latest){selected=latest.id;expanded.add(latest.id);}}}catch(e){}
 function detailKey(el){return (el.closest('.rv-card')?.dataset.id||'global')+'|'+(el.querySelector(':scope>summary')?.textContent||'').trim();}
 function rememberView(){
  const pane=ui.querySelector('.rv-scroll');if(pane){panelScroll=pane.scrollTop;auxOpen=new Set([...pane.querySelectorAll('details[open]:not(.rv-card)')].map(detailKey));}
  try{sessionStorage.setItem(VIEW_KEY,JSON.stringify({open,tab:descriptionMode?'description':'requests',tabScroll,hidden,filter,selected,expanded:[...expanded],reworkOpen:[...reworkOpen],scroll:panelScroll,auxOpen:[...auxOpen],route:location.hash,pageScroll:{x:scrollX,y:scrollY}}));}catch(e){}
 }
 const ui=document.createElement('div');ui.id='review-ui';ui.dataset.html2canvasIgnore='true';document.body.append(ui);
 const button=(text,act,extra='',cls='')=>`<button type="button" data-rv="${act}" ${extra} class="${cls}">${text}</button>`;
 const terminal=i=>i.status==='done'||i.status==='cancelled';
 const locked=()=>conflict?'disabled':'';
 function changeKinds(i,allowEmpty=false){
  const source=i.changeKinds===undefined?[i.kind||'layout']:i.changeKinds;
  if(!Array.isArray(source)||source.length>4||source.some(k=>!Object.hasOwn(kinds,k)&&k!=='policy'))throw Error('변경 구분을 확인하세요.');
  const chosen=Object.keys(kinds).filter(k=>source.map(x=>x==='policy'?'feature':x).includes(k));
  if(!allowEmpty&&!chosen.length)throw Error('변경 구분을 하나 이상 선택하세요.');return chosen;
 }
 function applyPolicy(i,value){
  if(typeof value!=='string'||value.length>12000)throw Error('변경된 정책 내용을 확인하세요.');
  i.policyChanges=value.trim();i.sync.policy={status:i.policyChanges?'pending':'na',evidence:i.policyChanges?'':'수정 내용을 검토한 결과 정책 변경 없음',at:time()};
 }
 function policyHtml(i){return i.policyChanges?`<section class="rv-policy-changes" aria-label="변경된 정책"><strong>변경된 정책</strong><p>${esc(i.policyChanges)}</p></section>`:'';}
 function validate(v){
  if(!v||v.schema!==SCHEMA||!Array.isArray(v.items)||v.items.length>500||!Number.isInteger(v.revision)||v.revision<0)throw Error('검수 파일 형식이 올바르지 않습니다.');
  const ids=new Set(),nums=new Set();
  function short(x,n=12000){if(typeof x!=='string'||x.length>n)throw Error('문자열 형식 또는 길이를 확인하세요.');return x;}
  function evidence(e){if(e===null||e===undefined)return null;if(typeof e!=='object')throw Error('캡처 형식 오류');return {image:short(e.image,900000),at:short(e.at,40),note:short(e.note,1000)};}
  function context(c){if(!c||typeof c!=='object'||!/^\/[-\w/]*$/.test(c.route)||!Array.isArray(c.modals)||!Array.isArray(c.fields))throw Error('화면 정보 오류');return {route:short(c.route,160),title:short(c.title,300),modals:c.modals.map(x=>short(x,300)),origin:short(c.origin||'',2000),tabs:short(c.tabs,1000),fields:c.fields.slice(0,100).map(x=>({label:short(x.label,200),value:short(x.value,1000)})),scroll:{x:Number(c.scroll?.x)||0,y:Number(c.scroll?.y)||0},viewport:{width:Number(c.viewport?.width)||0,height:Number(c.viewport?.height)||0}};}
  function anchor(a){if(!a)return null;if(typeof a!=='object'||!a.rel||!a.rect)throw Error('영역 형식 오류');const b={selector:short(a.selector,3000),text:short(a.text,300),rel:{},rect:{},tag:short(a.tag,40)};for(const k of ['x','y','w','h']){if(!Number.isFinite(a.rel[k])||!Number.isFinite(a.rect[k]))throw Error('영역 좌표 오류');b.rel[k]=a.rel[k];b.rect[k]=a.rect[k];}return b;}
  function imageSafe(e){if(e?.image&&!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(e.image))throw Error('PNG·JPEG·WebP 캡처만 허용합니다.');return e;}
  const items=v.items.map(i=>{
   if(!i||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(i.id)||ids.has(i.id)||nums.has(i.number)||!Number.isInteger(i.number)||i.number<1||!Object.hasOwn(states,i.status)||(!Object.hasOwn(kinds,i.kind)&&i.kind!=='policy')||!Object.hasOwn(scopes,i.scope))throw Error('요청 번호·상태가 올바르지 않습니다.');ids.add(i.id);nums.add(i.number);
   if(!Array.isArray(i.messages)||i.messages.length>1000)throw Error('대화 이력 오류');
   const sync={};for(const k of ['figma','policy']){const s=i.sync?.[k];if(!s||!['pending','done','na'].includes(s.status))throw Error('후속 반영 정보 오류');sync[k]={status:s.status,evidence:short(s.evidence),at:short(s.at,40)};}
   return {id:short(i.id,100),number:i.number,status:i.status,kind:changeKinds(i)[0],changeKinds:changeKinds(i),policyChanges:i.policyChanges==null?null:short(i.policyChanges),scope:i.scope,request:short(i.request),created:short(i.created,40),updated:short(i.updated,40),agent:i.agent?{token:short(i.agent.token,180),phase:short(i.agent.phase,30),state:short(i.agent.state,40),at:short(i.agent.at,40),error:short(i.agent.error||'',1000)}:null,captures:(i.captures||[]).slice(0,100).map(e=>imageSafe(evidence(e))),context:context(i.context),anchor:anchor(i.anchor),before:imageSafe(evidence(i.before)),after:imageSafe(evidence(i.after)),sync,messages:i.messages.map(m=>({kind:short(m.kind,40),text:short(m.text),at:short(m.at,40)}))};
  });
  let draft=null;if(v.draft){const d=v.draft;draft={request:short(d.request),kind:changeKinds(d,true)[0]||'layout',changeKinds:changeKinds(d,true),scope:Object.hasOwn(scopes,d.scope)?d.scope:'single',context:context(d.context),anchor:anchor(d.anchor),before:imageSafe(evidence(d.before))};}
  const composers={};for(const [id,c] of Object.entries(v.composers||{})){if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id))composers[id]={note:short(c.note||''),result:short(c.result||''),proof:short(c.proof||'')};}
  return {schema:SCHEMA,revision:v.revision,items,draft,composers};
 }
 function save(){
  if(conflict)return false;
  try{const latest=localStorage.getItem(KEY);if(latest!==raw){conflict=true;notice='다른 탭의 변경이 있습니다. 현재 내용을 내보낸 뒤 최신 자료를 불러오세요.';return false;}data.revision++;const next=JSON.stringify(data);localStorage.setItem(KEY,next);raw=next;persisted=true;return true;}
  catch(e){persisted=false;notice='브라우저 저장에 실패했습니다. 현재 탭의 자료를 JSON으로 내보내세요. 캡처가 많으면 저장 용량이 부족할 수 있습니다.';return false;}
 }
 function say(text){notice=text;const box=ui.querySelector('.rv-status');if(box)box.textContent=text;}
 function download(name,value){CMS.download(name,JSON.stringify(value,null,2),'application/json');}
 function archiveAfter(i){if(i.policyChanges)append(i,'system','이전 정책 변경 검토:\n'+i.policyChanges);i.policyChanges=null;i.sync.policy={status:'pending',evidence:'',at:''};if(i.after?.image){i.captures||=[];i.captures.push(i.after);}i.after=null;}
 function append(i,kind,text){i.messages.push({kind,text,at:time()});i.updated=time();}
 function ctx(){
  const modals=[...document.querySelectorAll('#modal-root [role=dialog]')].map(x=>x.getAttribute('aria-label')||x.querySelector('h2')?.textContent||'팝업');
  const root=document.querySelector('#modal-root .modal-overlay:last-child')||document.querySelector('main');
  return {origin:[...document.querySelectorAll('#modal-root .modal-overlay')].map(m=>modalOrigins.get(m)||'').join(' → '),route:CMS.current||location.hash.slice(1)||'/home',title:document.querySelector('h1')?.textContent||'',modals,tabs:[...document.querySelectorAll('main [role=tab][aria-selected=true],main .edit-tabs .active,main .tabs .active')].map(x=>x.textContent.trim()).join(' / '),fields:[...(root?.querySelectorAll('input:not([type=file]):not([type=password]),select,textarea')||[])].slice(0,100).filter(x=>x.type!=='hidden').map(x=>({label:(x.getAttribute('aria-label')||x.name||x.dataset.bind||x.id||x.tagName).slice(0,200),value:(x.type==='checkbox'||x.type==='radio'?(x.checked?'선택: ':'해제: '):'')+String(x.value).slice(0,950)})),scroll:{x:scrollX,y:scrollY},viewport:{width:innerWidth,height:innerHeight}};
 }
 const contextKey=c=>JSON.stringify([c.route,c.modals,c.tabs,c.origin]);
 const sameContext=i=>contextKey(i.context)===contextKey(ctx());
 function selector(el){
  const parts=[];for(let n=el;n&&n!==document.body;n=n.parentElement){
   if(n.id&&!/^field-|^modal-fn-/.test(n.id)){parts.unshift('#'+CSS.escape(n.id));break;}
   let part=n.tagName.toLowerCase();const attr=['data-judgment','data-action','data-bind','name'].find(k=>n.hasAttribute(k));
   if(attr)part+='['+attr+'='+JSON.stringify(n.getAttribute(attr))+']';
   const siblings=n.parentElement?[...n.parentElement.children].filter(x=>x.tagName===n.tagName):[];
   if(siblings.length>1)part+=`:nth-of-type(${siblings.indexOf(n)+1})`;parts.unshift(part);
  }return parts.join(' > ');
 }
 function targetAt(x,y){
  // Inert nodes are excluded from hit testing. Briefly unlock synchronously for lookup only.
  for(const el of inertNodes.keys())el.inert=false;
  try{return document.elementsFromPoint(x,y).find(e=>!ui.contains(e)&&e!==document.body&&e!==document.documentElement);}
  finally{for(const el of inertNodes.keys())el.inert=true;}
 }
 function makeAnchor(rect){
  let el=targetAt(rect.x+rect.w/2,rect.y+rect.h/2);if(!el)el=document.querySelector('main');
  const b=el.getBoundingClientRect();return {selector:selector(el),tag:el.tagName,text:(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,300),rel:{x:(rect.x-b.x)/(b.width||1),y:(rect.y-b.y)/(b.height||1),w:rect.w/(b.width||1),h:rect.h/(b.height||1)},rect};
 }
 function resolve(i){
  if(!i.anchor||!sameContext(i))return null;
  let el;try{el=document.querySelector(i.anchor.selector);}catch(e){return null;}
  if(!el||!el.getClientRects().length||el.tagName!==i.anchor.tag)return null;
  const t=(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,300);if(i.anchor.text&&t!==i.anchor.text)return null;
  const b=el.getBoundingClientRect(),r=i.anchor.rel;return {x:b.x+r.x*b.width,y:b.y+r.y*b.height,w:r.w*b.width,h:r.h*b.height};
 }
 function marks(){
  const layer=ui.querySelector('.rv-marks');if(!layer)return;layer.innerHTML='';
  layer.classList.toggle('rv-description-marks',descriptionMode);
  if(descriptionMode){layer.removeAttribute('aria-hidden');CMSDescriptions.paint(layer,hidden);return;}layer.setAttribute('aria-hidden','true');
  if(hidden)return;
  if(data.draft?.anchor){const r=resolve(data.draft);if(r){const m=document.createElement('div');m.className='rv-mark';Object.assign(m.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});m.innerHTML='<span class="rv-num">'+(Math.max(0,...data.items.map(x=>x.number))+1)+'</span>';layer.append(m);}}
  for(const i of data.items.filter(i=>!terminal(i)||filter==='done'||filter==='all'||i.id===historyFocus)){const r=resolve(i);if(!r)continue;const m=document.createElement('div');m.className='rv-mark'+(i.id===selected?' rv-selected':'')+(terminal(i)?' rv-completed-mark':'');m.dataset.id=i.id;Object.assign(m.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});m.innerHTML=`<button type="button" class="rv-num" data-rv="focus" data-id="${i.id}" aria-label="수정 요청 ${i.number}번 보기">${i.number}</button>${terminal(i)?'<span class="rv-mark-caption">완료한 요청</span>':''}`;layer.append(m);}
 }
 function mask(){
  if(marking){for(const el of [...document.body.children].filter(x=>x!==ui&&x.tagName!=='SCRIPT')){if(!inertNodes.has(el))inertNodes.set(el,el.inert);el.inert=true;}if(!ui.contains(document.activeElement))document.activeElement?.blur();}
  else{for(const [el,was]of inertNodes)el.inert=was;inertNodes.clear();}
 }
 function switchMark(value){notice='';marking=!!value&&!conflict;if(!marking)pendingAnchor='';if(marking)hidden=false;drawing=null;mask();render();}
 function snapshotHtml(e,label){return e?.image?`<button type="button" class="rv-snapshot" data-rv="image" aria-label="${label} 캡처 크게 보기"><img src="${esc(e.image)}" alt="${label} 화면 캡처"></button>`:'';}
 function evidenceHtml(i){const images=[['수정 전',i.before],['수정 후',i.after]].filter(([,e])=>e?.image);return images.length?`<details class="rv-evidence"><summary>화면 기록 보기</summary><div class="rv-evidence-grid">${images.map(([label,e])=>`<figure>${snapshotHtml(e,label)}<figcaption>${label} · ${esc(e.at.slice(0,16))}</figcaption></figure>`).join('')}</div><p class="rv-help">이미지를 누르면 크게 볼 수 있습니다. 자동 기록은 참고용입니다.</p></details>`:'';}
 function imageDialog(src,label,item,focus){
  const rect=item?.anchor?.rect,viewport=item?.context?.viewport,width=viewport?.width-(viewport?.width>1000?380:0),height=viewport?.height;
  const marked=rect&&width>0&&height>0;
  const area=marked?`<div class="rv-history-mark" style="left:${rect.x/width*100}%;top:${rect.y/height*100}%;width:${rect.w/width*100}%;height:${rect.h/height*100}%"><span class="rv-num">${item.number}</span><span class="rv-mark-caption">수정 전 표시 영역</span></div>`:'';
  const help=marked?'요청 당시 참고 화면입니다. 빨간 영역은 수정 전에 표시한 위치이며 현재 화면과 다를 수 있습니다.':item?.anchor?'요청 당시 참고 화면입니다. 화면 크기 기록이 없어 영역을 정확히 표시할 수 없습니다.':'요청 당시 참고 화면입니다. 별도 표시 영역이 없는 화면 전체 요청입니다.';
  const dialog=document.createElement('dialog');dialog.className='rv-image-viewer';dialog.setAttribute('aria-label',label);dialog.innerHTML=`<header><strong>${esc(label)}</strong>${button('닫기','close-image')}</header>${item?`<p class="rv-history-help">${help}</p>`:''}<div class="rv-image-scroll"><div class="rv-image-stage"><img src="${esc(src)}" alt="${esc(label)}">${area}</div></div>`;ui.append(dialog);dialog.addEventListener('close',()=>{dialog.remove();if(focus?.isConnected)focus.focus();},{once:true});dialog.showModal();dialog.querySelector('button').focus();
 }
 function showImage(b){const image=b.querySelector('img');if(!image)return;const i=find(b.closest('.rv-card')?.dataset.id);imageDialog(image.src,image.alt,image.alt==='수정 전 화면 캡처'?i:null,b);}
 function showRequestMark(i){
  selected=i.id;historyFocus=i.id;hidden=false;const r=resolve(i);
  if(r){scrollBy({top:r.y+r.h/2-innerHeight/2,behavior:'instant'});render();say('완료한 요청의 연결 영역을 표시했습니다.');}
  else if(i.before?.image){render();imageDialog(i.before.image,`요청 #${i.number} · 수정 전 표시 영역`,i,panelFor(i.id)?.querySelector('[data-rv=show-mark]'));}
  else{render();say('현재 연결된 요소와 수정 전 캡처가 없습니다. 위치·기록 보기에서 요청 당시 화면 정보를 확인해 주세요.');}
 }
 function options(values,current){return Object.entries(values).map(([k,v])=>`<option value="${k}" ${k===current?'selected':''}>${v}</option>`).join('');}
 function syncText(i){return ['figma','policy'].filter(k=>k!=='policy'||i.policyChanges).map(k=>`<li>${k==='figma'?'Figma':'정책·기록'} <span>${{pending:'반영 대기',done:'반영 완료',na:'변경 없음'}[i.sync[k].status]}</span></li>`).join('');}
 function card(i){
  const lastQuestion=i.messages.filter(m=>m.kind==='question').at(-1);
  const compose=data.composers[i.id]||{},editable=!terminal(i),lastResult=i.messages.filter(m=>m.kind==='result').at(-1),history=i.messages.filter(m=>m.kind!=='request'),needsPolicy=!!i.policyChanges;
  const waiting={new:Date.now()-bridgeSeen<25000?'요청을 전달하고 있습니다.':'작업 연결을 기다리고 있습니다.',queued:'이 대화로 요청을 전달했습니다. 제가 확인하고 수정합니다.',working:'제가 HTML과 동작을 수정하고 있습니다.'};
  const discussion=i.messages.filter(m=>['question','answer','comment','rework'].includes(m.kind)&&!(i.status==='needs_input'&&m===lastQuestion));
  const thread=discussion.length?`<section class="rv-clarification-thread" aria-label="추가 요청과 질문·답변"><strong>추가 요청과 확인 내용</strong>${discussion.map(m=>`<div class="rv-message" data-kind="${m.kind}"><small>${({question:'확인 질문',answer:'사용자 답변',comment:'추가 요청',rework:'재수정 요청'})[m.kind]} · ${esc(m.at.slice(0,16))}</small>${esc(m.text)}</div>`).join('')}</section>`:'';
  const attrs=`data-id="${i.id}" ${locked()}`;
  const more=`<details class="rv-more"><summary>위치·기록 보기</summary><p class="rv-meta">${esc(i.context.title)} · ${esc(i.context.route)}${i.context.modals.length?'\n팝업: '+esc(i.context.modals.join(' → ')):''}\n${scopes[i.scope]}</p><div class="rv-actions">${button('해당 화면 보기','locate',attrs)}</div><details><summary>요청 당시 화면 정보</summary><pre class="rv-meta">${esc(JSON.stringify(i.context,null,2))}</pre></details>${history.map(m=>`<div class="rv-message" data-kind="${esc(m.kind)}"><small>${esc(({question:'확인 질문',answer:'사용자 답변',comment:'보충 설명',result:'작업 결과',approval:'사용자 확인',rework:'재수정 요청',system:'이력'})[m.kind]||m.kind)} · ${esc(m.at.slice(0,16))}</small>${esc(m.text)}</div>`).join('')}${evidenceHtml(i)}<div class="rv-actions">${editable?button('영역 다시 그리기','detach',attrs)+button('요청 취소','cancel',attrs,'rv-danger'):button('다시 수정 요청','reopen',attrs)}</div></details>`;
  const worker=workerTools&&editable?`<details class="rv-result"><summary>작업자 결과 기록</summary><label>수정 내용<textarea data-result maxlength="12000">${esc(compose.result||'')}</textarea></label><label>확인 근거<textarea data-result-proof maxlength="12000">${esc(compose.proof||'')}</textarea></label><div class="rv-actions">${button('결과 기록','result',attrs)}${button('수정 시작 기록','start',attrs)}</div></details>`:'';
  const syncWorker=workerTools&&i.status==='done'?`<details><summary>작업자 문서 반영 기록</summary>${['figma','policy'].map(k=>`<label>${k==='figma'?'Figma':'정책'}<select data-sync="${k}">${options({pending:'반영 대기',done:'반영 완료',na:'변경 없음'},i.sync[k].status)}</select></label><input data-sync-proof="${k}" value="${esc(i.sync[k].evidence)}" aria-label="반영 근거">${button('기록','sync',`${attrs} data-kind="${k}"`)}`).join('')}</details>`:'';
  return `<details class="rv-card" data-id="${i.id}" ${expanded.has(i.id)?'open':''}><summary><span class="rv-num">${i.number}</span><span class="rv-summary"><strong>${esc(i.request.slice(0,56))}</strong><small>${changeKinds(i).map(k=>kinds[k]).join(' · ')} · ${states[i.status]}</small></span></summary><div class="rv-card-body">${i.request.length>56?`<p class="rv-request-text">${esc(i.request)}</p>`:''}${thread}
   ${['new','queued','working'].includes(i.status)?`<p class="rv-progress">${i.agent?.error?esc(i.agent.error):waiting[i.status]}</p><details class="rv-supplement"><summary>요청에 설명 더하기</summary><label>보충할 내용<textarea data-note maxlength="12000" placeholder="수정에 필요한 설명이 더 있을 때만 적어 주세요.">${esc(compose.note||'')}</textarea></label>${button('설명 전달','comment',attrs)}</details>`:''}
   ${i.status==='needs_input'?`<div class="rv-question"><strong>확인이 필요합니다</strong><p>${esc(lastQuestion?.text||'질문을 확인하고 답변해 주세요.')}</p><label>답변<textarea data-note maxlength="12000" placeholder="답변을 입력해 주세요.">${esc(compose.note||'')}</textarea></label>${button('답변 전달','answer',attrs,'rv-primary')}</div>`:''}
   ${i.status==='ready'?`<div class="rv-result-copy"><strong>수정했습니다</strong><p>${esc(lastResult?.text?.split('\n확인 근거:')[0]||'작업 결과를 확인하세요.')}</p></div>${policyHtml(i)}<p class="rv-help">HTML을 새로고침한 뒤 화면과 동작을 확인해 주세요. 완료하면 제가 Figma${needsPolicy?'와 관련 정책':''}를 이어서 반영합니다.</p><div class="rv-actions rv-main-actions">${button('확인 완료','approve',attrs,'rv-primary')}${button('수정이 더 필요해요','show-rework',attrs)}</div>${reworkOpen.has(i.id)?`<div class="rv-rework"><label>다시 수정할 내용<textarea data-note maxlength="12000" placeholder="아직 다른 부분을 알려 주세요.">${esc(compose.note||'')}</textarea></label>${button('재수정 요청 보내기','rework',attrs,'rv-primary')}</div>`:''}`:''}
   ${i.status==='done'?`<p class="rv-progress rv-approved">화면 확인을 마쳤습니다.</p><div class="rv-actions">${button('표기 보기','show-mark',attrs)}${i.before?.image?button('수정 전 표기 보기','before-mark',attrs):''}</div><ul class="rv-sync-list">${syncText(i)}</ul>${Object.values(i.sync).some(x=>x.status==='pending')?(i.agent?.phase==='sync'&&i.agent?.state==='error'?`<p class="rv-error" role="alert">문서 반영을 진행하지 못했습니다.<br>${esc(i.agent.error)}</p><p class="rv-help">이 대화에 ‘문서 반영 계속’이라고 알려 주시면 제가 연결 상태를 확인하고 이어갑니다.</p>`:'<p class="rv-help">'+(i.agent?.phase==='sync'&&i.agent?.state==='working'?'제가 문서에 반영하고 있습니다.':'문서 반영 요청을 이어서 처리합니다. 별도로 입력할 내용은 없습니다.')+'</p>'):''}`:''}
   ${i.status==='done'?policyHtml(i):''}${more}${worker}${syncWorker}</div></details>`;
 }
 function connection(){const el=ui.querySelector('.rv-connection');if(el){const connected=Date.now()-bridgeSeen<25000;el.textContent=connected?'작업 연결됨':'작업 연결 대기';el.classList.toggle('connected',connected);const help=ui.querySelector('.rv-connect-help');if(help)help.hidden=connected;}}
 function render(){
  const refreshNotice=reloadNeeded?`<div class="rv-reload-banner" role="alert"><div><strong>수정본이 준비되었습니다</strong><span>변경된 화면과 동작을 확인하려면 새로고침해 주세요.</span></div>${button('새로고침','reload-page','','rv-primary')}</div>`:'';
  const oldPane=ui.querySelector('.rv-scroll');if(oldPane){const oldTab=oldPane.querySelector('.rv-description-view')?'description':'requests';tabScroll[oldTab]=oldPane.scrollTop;panelScroll=tabScroll[descriptionMode?'description':'requests'];auxOpen=new Set([...oldPane.querySelectorAll('details[open]:not(.rv-card)')].map(detailKey));}
  document.body.classList.toggle('review-open',open);document.body.classList.toggle('review-marking',open&&marking);
  if(!open){ui.innerHTML=refreshNotice+`<button type="button" data-rv="open" class="rv-launch" aria-label="화면 검수 도구 열기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m15 4 5 5M4 20l5-1L21 7l-4-4L5 15zM4 20h16"/></svg>화면 검수</button>`;rememberView();return;}
  const active=data.items.filter(i=>!terminal(i)).length,done=data.items.filter(terminal).length;
  const list=data.items.filter(i=>filter==='all'||filter==='done'?filter==='all'||terminal(i):!terminal(i)&&(filter!=='current'||i.context.route===ctx().route));
  ui.innerHTML=refreshNotice+`<div class="rv-marks" aria-hidden="true"></div>${marking?'<div class="rv-blocker" aria-label="검수 영역을 드래그하여 지정" role="img"></div>':''}<aside class="rv-panel" aria-label="화면 검수 패널"><header class="rv-header"><div class="rv-title"><h2>화면 수정 요청</h2>${button('닫기','close','aria-label="검수 도구 닫기"')}</div><div class="rv-header-note"><span>${pendingAnchor?'같은 요청의 영역을 다시 그리세요.':marking?'수정할 부분을 드래그하세요.':'표시하고 설명하면 제가 수정합니다.'}</span><span class="rv-connection"></span></div><div class="rv-toolbar">${descriptionMode?'<span class="rv-description-mode">Figma 설명 번호</span>':button(marking?'영역 지정 끝내기':'펜으로 표시','mark',`aria-pressed="${marking}" ${data.draft?'disabled':locked()}`,'rv-primary')}${button(hidden?'표시 보기':'표시 숨김','hide',`aria-pressed="${hidden}"`)}</div></header>
   <p class="rv-status" role="status" aria-live="polite">${esc(!persisted?'저장하지 못했습니다. 아래 보관 메뉴에서 기록을 내보내 주세요.':notice)}</p>${conflict?`<div class="rv-header">${button('최신 기록 불러오기','reload')}</div>`:''}<div class="rv-scroll">
   ${descriptionMode?'':'<div class="rv-connect-help"><p>자동 전달을 처음 연결할 때 <b>검수 연결.cmd</b>를 실행하고, 아래 버튼에서 프로젝트의 <b>review-work</b> 폴더를 선택하세요.</p>'+button('작업 폴더 연결','connect-files')+'</div>'}
   ${data.draft&&!descriptionMode?`<section class="rv-draft"><h3>어떻게 바꾸면 될까요?</h3><label class="visually-hidden" for="rv-request">수정할 내용</label><textarea id="rv-request" data-draft="request" maxlength="12000" placeholder="예: 등록성공 선택을 문항 ID 바로 옆으로 옮겨 주세요." ${locked()}>${esc(data.draft.request)}</textarea><fieldset class="rv-kind-options"><legend>변경 구분 <span>(복수 선택)</span></legend>${Object.entries(kinds).map(([k,v])=>`<label><input type="checkbox" data-change-kind="${k}" ${changeKinds(data.draft,true).includes(k)?'checked':''} ${locked()}>${v}</label>`).join('')}</fieldset><details><summary>적용 범위 (선택)</summary><select aria-label="적용 범위" data-draft="scope" ${locked()}>${options(scopes,data.draft.scope)}</select></details><div class="rv-actions">${button('요청 등록','create',locked(),'rv-primary')}${button('취소','discard-draft',locked())}</div></section>`:''}
   <nav class="rv-list-tabs" aria-label="검수 패널 보기">${button(`진행 중 ${active}`,'active',`aria-pressed="${!descriptionMode&&filter!=='done'}"`)}${button(`완료 ${done}`,'completed',`aria-pressed="${!descriptionMode&&filter==='done'}"`)}${button('Description','descriptions',`aria-pressed="${descriptionMode}"`)}</nav>
   ${descriptionMode?CMSDescriptions.panel():`${list.length?list.map(card).join(''):'<div class="rv-empty"><strong>'+ (filter==='done'?'완료한 요청이 없습니다.':'수정할 곳을 표시해 주세요.')+'</strong>'+ (filter==='done'?'확인을 마친 요청은 여기에 보관됩니다.':'펜으로 영역을 그린 뒤 원하는 변경 내용을 적으면 됩니다.')+'</div>'}
   ${!data.draft?button('화면 전체에 대해 요청','page-request',locked(),'rv-text-button'):''}
   <details class="rv-management"><summary>기록 보관·기타</summary><div class="rv-actions">${button('내보내기','export')}${button('가져오기','import',locked())}</div><label>목록 범위<select data-filter>${options({active:'전체 진행 중',current:'현재 화면의 진행 중',done:'완료·취소',all:'모든 기록'},filter)}</select></label><div class="rv-actions">${button('작업 전달 파일 보관','packet',locked())}${button(workerTools?'작업자 도구 닫기':'작업자 도구','worker')}</div></details>
   `}</div></aside>`;
  for(const el of ui.querySelectorAll('.rv-scroll details:not(.rv-card)'))if(auxOpen.has(detailKey(el)))el.open=true;
  ui.querySelector('.rv-scroll').scrollTop=panelScroll;connection();marks();rememberView();
 }
 async function capture(){
  if(capturing)throw Error('캡처가 진행 중입니다.');capturing=true;
  const width=Math.max(1,innerWidth-(open&&innerWidth>1000?380:0)),height=innerHeight;
  try{
   const canvas=await html2canvas(document.body,{logging:false,scale:Math.min(1,1000/width),x:scrollX,y:scrollY,width,height,windowWidth:innerWidth,windowHeight:innerHeight,backgroundColor:'#fafafa',allowTaint:false,useCORS:false,imageTimeout:1200,ignoreElements:el=>el.id==='review-ui'||el.tagName==='SCRIPT',onclone:doc=>{
    doc.querySelectorAll('iframe,canvas,video,math-field').forEach(el=>{const d=doc.createElement('div'),r=el.getBoundingClientRect();d.textContent=el.tagName==='IFRAME'?'외부/격리 프레임 · 자동 화면 기록 미지원':'특수 편집 영역 · 자동 화면 기록 미지원';d.style.cssText=`width:${r.width}px;height:${r.height}px;background:#edf0f3;border:1px dashed #a7b2bf;color:#45596b;padding:12px;overflow:hidden`;el.replaceWith(d);});
    doc.querySelectorAll('img').forEach(img=>{if(/^https?:/.test(img.getAttribute('src')||''))img.removeAttribute('src');});
   }});
   return {image:canvas.toDataURL('image/jpeg',.72),at:time(),note:'자동 화면 기록입니다. 일부 편집 영역은 실제 화면에서 확인하세요.'};
  }catch(e){return {image:'',at:time(),note:'자동 캡처 실패: '+String(e.message).slice(0,200)+''};}
  finally{capturing=false;}
 }
 function find(id){return data.items.find(i=>i.id===id);}
 function panelFor(id){return [...ui.querySelectorAll('.rv-card')].find(x=>x.dataset.id===id);}
 async function act(act,b){
  const id=b?.dataset.id,i=find(id),p=panelFor(id);
  if(conflict&&!['export','reload','help','close','open','hide','locate','focus','completed','active','descriptions','description-focus','image','close-image','reload-page','show-mark','before-mark'].includes(act))return say('다른 탭의 변경을 먼저 확인하세요.');
  if(act==='descriptions'){descriptionMode=true;marking=false;pendingAnchor='';hidden=false;mask();render();return;}
  if(act==='description-focus'){CMSDescriptions.focus(b.dataset.description,b.classList.contains('rv-description-marker'));marks();rememberView();return;}
  if(act==='reload-page'){location.reload();return;}
  if(act==='image'){showImage(b);return;}
  if(act==='close-image'){b.closest('dialog')?.close();return;}
  if(act==='connect-files'){await window.CMSReviewFiles?.connect();return;}
  if(act==='open'){open=true;render();}
  else if(act==='close'){open=false;pendingAnchor='';switchMark(false);}
  else if(act==='mark'){if(data.draft)return;switchMark(!marking);}
   else if(act==='hide'){hidden=!hidden;if(hidden){marking=false;pendingAnchor='';}mask();render();if(!descriptionMode&&!hidden&&filter==='done'){const i=data.items.find(i=>i.id===selected&&terminal(i))||data.items.find(terminal);if(i&&!resolve(i))showRequestMark(i);}}
  else if(act==='active'){descriptionMode=false;filter='active';render();}
  else if(act==='worker'){workerTools=!workerTools;render();}
  else if(act==='show-rework'){reworkOpen.add(id);render();panelFor(id)?.querySelector('[data-note]')?.focus();}
  else if(act==='completed'){descriptionMode=false;filter='done';render();}
   else if(act==='focus'){descriptionMode=false;selected=id;expanded.add(id);filter=terminal(i)?'done':'active';render();panelFor(id)?.scrollIntoView({block:'nearest'});}
  else if(act==='help'){say('① 화면·팝업을 원하는 상태로 엽니다. ② 펜으로 영역을 그려 요청을 등록합니다. ③ 작업 전달 JSON을 이 대화에 첨부합니다. ④ 실제 수정 후 결과를 기록하고 화면을 검수합니다. ⑤ 완료하면 영역은 숨겨지고 이력은 보존됩니다. Figma·정책은 별도 근거로 반영 상태를 기록합니다.');}
  else if(act==='export'){download('master-cms-review-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json',data);}
  else if(act==='packet'){
   const items=data.items.filter(i=>!terminal(i));if(!items.length)return say('전달할 진행 중 요청이 없습니다.');
   download('master-cms-review-work.json',{schema:'master-cms-review-work/1',exported:time(),baseRevision:data.revision,instructions:'요청 번호와 ID를 유지하세요. 실제 소스 수정·검증 후 review_cli.py로 결과 파일을 생성하고 UI에서 가져옵니다. CMS 관찰 사실과 제안 정책을 구분하고 사용자 검수를 대신 완료하지 마세요.',items:clone(items)});say('작업 전달 파일을 내보냈습니다. 이 대화에 첨부하면 실제 파일 수정을 이어갈 수 있습니다.');
  }
  else if(act==='import'){const f=document.createElement('input');f.type='file';f.accept='.json,application/json';f.onchange=async()=>{if(f.files[0])await importFile(f.files[0]);};f.click();}
  else if(act==='reload'){if(!window.confirm('현재 탭의 검수 내용을 최신 저장값으로 바꾸시겠습니까? 필요한 내용은 먼저 내보내세요.'))return;try{const latest=localStorage.getItem(KEY),v=latest?validate(JSON.parse(latest)):blank();data=v;raw=latest;conflict=false;persisted=true;notice='최신 검수 자료를 불러왔습니다.';render();}catch(e){say(e.message);}}
  else if(act==='page-request'){data.draft={request:'',kind:'layout',changeKinds:['layout'],scope:'single',context:ctx(),anchor:null,before:await capture()};save();render();ui.querySelector('[data-draft=request]')?.focus();}
  else if(act==='discard-draft'){if(data.draft.request&&!window.confirm('작성 중인 요청을 취소하시겠습니까?'))return;data.draft=null;save();render();}
  else if(act==='create'){
   const d=data.draft;if(!d?.request.trim())return say('수정할 내용을 입력하세요.');
   if(!changeKinds(d,true).length)return say('변경 구분을 하나 이상 선택하세요.');
   const now=time(),number=Math.max(0,...data.items.map(x=>x.number))+1;
   const n={...clone(d),id:uid(),number,request:d.request.trim(),status:'new',created:now,updated:now,agent:null,policyChanges:null,after:null,captures:[],messages:[{kind:'request',text:d.request.trim(),at:now}],sync:{figma:{status:'pending',evidence:'',at:''},policy:{status:'pending',evidence:'',at:''}}};
   data.items.push(n);data.draft=null;expanded.add(n.id);selected=n.id;save();filter='active';notice=Date.now()-bridgeSeen<25000?'요청을 등록했습니다. 이 대화로 전달하고 있습니다.':'요청은 저장했습니다. 작업 연결이 되면 제가 받아 수정합니다.';render();
  }
  else if(i){
   if(act==='show-mark'){showRequestMark(i);return;}
   if(act==='before-mark'){if(i.before?.image)imageDialog(i.before.image,`요청 #${i.number} · 수정 전 표시 영역`,i,b);return;}
   if(act==='locate'){
    if(terminal(i)){showRequestMark(i);return;}
    selected=i.id;if(!sameContext(i)){if(i.context.route!==CMS.current)CMS.go(i.context.route);say('해당 페이지로 이동합니다. 기록된 팝업·탭·입력 상태는 화면 상태 목록을 보고 직접 맞춰 주세요. 미저장 CMS 입력의 확인 절차는 유지됩니다.');}
    else{let el;try{el=document.querySelector(i.anchor?.selector||'main');}catch(e){}el?.scrollIntoView({block:'center',behavior:'instant'});say(resolve(i)?'연결된 영역을 표시했습니다.':'연결된 요소를 찾지 못했습니다. 영역을 다시 지정할 수 있습니다.');}marks();return;
   }
   if(terminal(i)&&!['reopen','sync'].includes(act))return;
   if(act==='reanchor'){pendingAnchor=id;hidden=false;switchMark(true);say('새 영역을 드래그하세요. 이전 캡처와 요청 이력은 유지됩니다.');return;}
   if(act==='answer'){if(i.status!=='needs_input')return;const t=p.querySelector('[data-note]').value.trim();if(!t)return say('답변을 입력하세요.');append(i,'answer',t);i.status='new';if(data.composers[i.id])data.composers[i.id].note='';}
   else if(act==='comment'){const t=p.querySelector('[data-note]').value.trim();if(!t)return say('의견을 입력하세요.');append(i,'comment',t);i.status='new';if(data.composers[i.id])data.composers[i.id].note='';}
   else if(act==='start'){i.status='working';append(i,'system','작업 시작을 기록했습니다. 실제 코드 수정은 작업자가 수행합니다.');}
   else if(act==='result'){
    const summary=p.querySelector('[data-result]').value.trim(),proof=p.querySelector('[data-result-proof]').value.trim();if(!summary||!proof)return say('수정 내용과 확인 근거를 모두 입력하세요.');i.status='ready';append(i,'result',summary+'\n확인 근거: '+proof);archiveAfter(i);data.composers[i.id]={note:'',result:'',proof:''};
   }
   else if(act==='capture-after'){if(!sameContext(i))return say('요청 당시 페이지·탭·팝업 상태에서 캡처하세요.');say('수정 후 참고 화면을 캡처하고 있습니다.');archiveAfter(i);i.after=await capture();append(i,'system','수정 후 참고 화면을 캡처했습니다.');}
   else if(act==='approve'){
    if(i.status!=='ready')return;
    if(!window.confirm('실제 수정 화면과 동작을 확인했습니까? 완료하면 빨간 영역은 숨기고 요청·결과 이력은 보존합니다.'))return;
    i.status='done';append(i,'approval','사용자가 화면 수정을 확인했습니다. Figma와 관련 정책 반영을 이어서 요청합니다.');
   }
   else if(act==='rework'){
    const t=p.querySelector('[data-note]').value.trim();if(!t)return say('다시 수정할 내용을 입력해 주세요.');i.status='new';archiveAfter(i);append(i,'rework',t);if(data.composers[i.id])data.composers[i.id].note='';reworkOpen.delete(i.id);
   }
   else if(act==='detach'){i.anchor=null;append(i,'system','영역을 지웠습니다. 같은 요청의 영역을 다시 지정합니다.');save();pendingAnchor=id;selected=id;hidden=false;switchMark(true);say('#'+i.number+' 요청의 새 영역을 드래그하세요. Esc를 누르면 영역 없이 요청을 유지합니다.');return;}
   else if(act==='cancel'){if(!window.confirm('요청을 취소하시겠습니까? 이력은 보존됩니다.'))return;i.status='cancelled';append(i,'system','사용자가 요청을 취소했습니다.');}
   else if(act==='reopen'){i.status='new';archiveAfter(i);for(const s of Object.values(i.sync))if(s.status==='done')s.status='pending';append(i,'system','요청을 다시 열었습니다. 기존 반영 근거는 이력으로 유지하고 재검수가 필요합니다.');filter='active';}
   else if(act==='sync'){
    if(i.status!=='done')return;const k=b.dataset.kind,status=p.querySelector(`[data-sync=${k}]`).value,proof=p.querySelector(`[data-sync-proof=${k}]`).value.trim();
    if(status!=='pending'&&!proof)return say('반영 완료 또는 해당 없음의 근거를 입력하세요.');i.sync[k]={status,evidence:proof,at:time()};append(i,'system',`${k==='figma'?'Figma':'정책·기록 문서'}: ${{pending:'반영 대기',done:'반영 완료',na:'해당 없음'}[status]}\n근거: ${proof}`);
   }else return;
   save();render();
  }
 }
 async function importFile(file){
  try{
   if(file.size>16*1024*1024)throw Error('16MB 이하의 JSON을 선택하세요.');const v=JSON.parse(await file.text());
   if(v.schema==='master-cms-review-result/1'){
    if(!Array.isArray(v.results)||!v.results.length)throw Error('작업 결과가 없습니다.');const next=clone(data),seen=new Set();
    for(const r of v.results){const i=next.items.find(x=>x.id===r.id);if(!i||terminal(i)||seen.has(r.id)||r.baseUpdated!==i.updated)throw Error('대상 요청이 변경되었거나 완료됐습니다. 최신 작업 전달 파일로 다시 작성하세요.');if(typeof r.summary!=='string'||!r.summary.trim()||typeof r.evidence!=='string'||!r.evidence.trim()||r.summary.length+r.evidence.length>12000)throw Error('수정 요약과 확인 근거가 필요합니다.');seen.add(r.id);i.status='ready';archiveAfter(i);if(Object.hasOwn(r,'policyChanges'))applyPolicy(i,r.policyChanges);append(i,'result',r.summary+'\n확인 근거: '+r.evidence);}
    data=validate(next);save();notice=`작업 결과 ${v.results.length}건을 가져왔습니다. 실제 화면을 확인하고 완료하세요.`;
   }else{
    const incoming=validate(v),next=clone(data);if(data.draft&&incoming.draft)throw Error('현재 작성 중인 요청을 등록하거나 취소한 뒤 가져오세요.');
    const used=new Set(next.items.map(i=>i.number));for(const i of incoming.items){const old=next.items.find(x=>x.id===i.id);if(old){if(JSON.stringify(i)!==JSON.stringify(old))throw Error('같은 ID의 다른 이력이 있습니다. 병합으로 덮어쓰지 않습니다. 별도 파일로 보관해 비교하세요.');}else{if(used.has(i.number)){i.number=Math.max(0,...used)+1;}used.add(i.number);next.items.push(i);}}
    for(const [id,c]of Object.entries(incoming.composers)){
     const old=next.composers[id]||{};if(['note','result','proof'].some(k=>old[k]&&c[k]&&old[k]!==c[k]))throw Error('같은 요청의 미등록 입력이 다릅니다. 현재 입력을 별도로 내보내고 비교하세요.');
     next.composers[id]={note:old.note||c.note||'',result:old.result||c.result||'',proof:old.proof||c.proof||''};
    }
    if(incoming.draft)next.draft=incoming.draft;data=validate(next);save();notice='검수 자료를 병합했습니다. 기존 이력은 덮어쓰지 않았습니다.';
   }render();
  }catch(e){say('가져오기 실패: '+e.message);}
 }
 function reviewClick(e){const b=e.target.closest('[data-rv]');if(!b||b.disabled)return;e.preventDefault();act(b.dataset.rv,b).catch(err=>say('작업을 마치지 못했습니다: '+err.message));}
 ui.addEventListener('click',reviewClick);
 // The vendor listens in document capture. Handle panel clicks before that listener.
 window.addEventListener('click',e=>{if(ui.contains(e.target)&&document.querySelector('.qe-popover')){e.stopPropagation();reviewClick(e);}},true);
 ui.addEventListener('input',e=>{const t=e.target;if(!conflict&&t.matches('[data-note],[data-result],[data-result-proof]')){const id=t.closest('.rv-card').dataset.id;data.composers[id]||={note:'',result:'',proof:''};data.composers[id][t.hasAttribute('data-note')?'note':t.hasAttribute('data-result')?'result':'proof']=t.value;save();}if(e.target.dataset.draft&&data.draft&&!conflict){data.draft[e.target.dataset.draft]=e.target.value;save();}});
 ui.addEventListener('change',async e=>{
  if(e.target.matches('[data-filter]')){filter=e.target.value;render();}
  if(e.target.dataset.draft&&data.draft&&!conflict){data.draft[e.target.dataset.draft]=e.target.value;save();}
  if(e.target.dataset.changeKind&&data.draft&&!conflict){const chosen=[...ui.querySelectorAll('[data-change-kind]:checked')].map(x=>x.dataset.changeKind);data.draft.changeKinds=chosen;data.draft.kind=chosen[0]||'layout';save();}

 });
 ui.addEventListener('toggle',e=>{if(e.target.matches('.rv-card')){if(e.target.open)expanded.add(e.target.dataset.id);else expanded.delete(e.target.dataset.id);}rememberView();},true);
 ui.addEventListener('scroll',e=>{if(e.target.matches('.rv-scroll'))rememberView();},true);
 window.addEventListener('beforeunload',rememberView);window.addEventListener('pagehide',rememberView);
 window.addEventListener('load',()=>{if(restoredPageScroll)setTimeout(()=>{scrollTo(restoredPageScroll.x||0,restoredPageScroll.y||0);restoredPageScroll=null;},80);});
 ui.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&e.target.matches('[data-note]')){e.preventDefault();act(find(e.target.closest('.rv-card').dataset.id)?.status==='ready'?'rework':find(e.target.closest('.rv-card').dataset.id)?.status==='needs_input'?'answer':'comment',{dataset:{id:e.target.closest('.rv-card').dataset.id}});}});
 ui.addEventListener('pointerdown',e=>{
  if(!e.target.matches('.rv-blocker')||e.button!==0||data.draft||capturing)return;e.preventDefault();
  drawing={x:e.clientX,y:e.clientY,endX:e.clientX,endY:e.clientY,id:e.pointerId};e.target.setPointerCapture(e.pointerId);const box=document.createElement('div');box.className='rv-drawing';ui.append(box);
 });
 ui.addEventListener('pointermove',e=>{if(!drawing)return;drawing.endX=Math.max(0,Math.min(e.clientX,ui.querySelector('.rv-blocker').getBoundingClientRect().right));drawing.endY=Math.max(0,Math.min(e.clientY,innerHeight));const b=ui.querySelector('.rv-drawing');Object.assign(b.style,{left:Math.min(drawing.x,drawing.endX)+'px',top:Math.min(drawing.y,drawing.endY)+'px',width:Math.abs(drawing.x-drawing.endX)+'px',height:Math.abs(drawing.y-drawing.endY)+'px'});});
 ui.addEventListener('pointerup',async e=>{
  if(!drawing||drawing.id!==e.pointerId)return;const d=drawing;drawing=null;ui.querySelector('.rv-drawing')?.remove();const rect={x:Math.min(d.x,d.endX),y:Math.min(d.y,d.endY),w:Math.abs(d.x-d.endX),h:Math.abs(d.y-d.endY)};if(rect.w<8||rect.h<8)return say('가로·세로 8px 이상 드래그하세요.');
  const anchor=makeAnchor(rect),context=ctx();marking=false;mask();render();
  if(pendingAnchor){const i=find(pendingAnchor);pendingAnchor='';if(i&&!terminal(i)){i.anchor=anchor;i.context=context;append(i,'system','연결 영역과 화면 상태를 다시 지정했습니다. 최초 캡처는 유지합니다.');save();notice='같은 요청에 새 영역을 연결했습니다.';render();}return;}
  say('요청 당시 참고 화면을 캡처하고 있습니다.');const before=await capture();data.draft={request:'',kind:'layout',changeKinds:['layout'],scope:'single',context,anchor,before};save();notice='수정할 내용을 입력하고 요청을 등록하세요.';render();ui.querySelector('[data-draft=request]')?.focus();
 });
 ui.addEventListener('pointercancel',()=>{drawing=null;ui.querySelector('.rv-drawing')?.remove();});
 // Capture guard also stops CMS's delegated shortcuts while the review panel has focus.
 for(const type of ['click','dblclick','keydown','keyup','keypress','submit','dragstart','drop','paste'])window.addEventListener(type,e=>{
  if(!open)return;
  if(type==='keydown'&&e.key==='Escape'&&marking){e.preventDefault();e.stopImmediatePropagation();pendingAnchor='';switchMark(false);return;}
  if(ui.contains(e.target)){e.stopPropagation();return;}
  if(marking){e.preventDefault();e.stopImmediatePropagation();}
 },{capture:false});
 // CMS handlers are on document. A capture-phase fence prevents them from seeing panel events.
 document.addEventListener('keydown',e=>{if(ui.contains(e.target)){if(e.key==='Escape'&&marking){e.preventDefault();pendingAnchor='';switchMark(false);}e.stopPropagation();if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&e.target.matches('[data-note]')){e.preventDefault();act(find(e.target.closest('.rv-card').dataset.id)?.status==='ready'?'rework':find(e.target.closest('.rv-card').dataset.id)?.status==='needs_input'?'answer':'comment',{dataset:{id:e.target.closest('.rv-card').dataset.id}});} }else if(marking){if(e.key==='Escape'){pendingAnchor='';switchMark(false);}e.preventDefault();e.stopImmediatePropagation();}},true);
 let queued=false;function refresh(){if(!open||queued)return;queued=true;requestAnimationFrame(()=>{queued=false;mask();marks();});}
 document.addEventListener('click',e=>{if(ui.contains(e.target))return;const b=e.target.closest('[data-action]');if(b)lastAction=JSON.stringify({action:b.dataset.action,context:b.dataset.context||'',id:b.dataset.id||'',tab:b.dataset.tab||'',label:b.textContent.trim().slice(0,100)});},true);
 const observer=new MutationObserver(records=>{if(records.some(r=>!ui.contains(r.target))){for(const m of document.querySelectorAll('#modal-root .modal-overlay'))if(!modalOrigins.has(m))modalOrigins.set(m,lastAction);refresh();}});observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','hidden','aria-selected','aria-pressed','aria-expanded']});
 document.addEventListener('change',e=>{if(!ui.contains(e.target))refresh();});window.addEventListener('cms-descriptions-updated',refresh);window.addEventListener('cms-description-focus',refresh);window.addEventListener('scroll',refresh,true);window.addEventListener('resize',refresh);
 window.addEventListener('hashchange',()=>{marking=false;pendingAnchor='';mask();setTimeout(()=>{if(open)render();},60);});
 window.addEventListener('storage',e=>{if(e.key===KEY&&e.newValue!==raw){conflict=true;marking=false;mask();notice='다른 탭에서 검수 자료가 변경됐습니다. 현재 자료를 내보낸 뒤 최신 자료를 불러오세요.';render();}});
 function jobFor(i,phase){
  const source=phase==='sync'?i.messages.filter(m=>m.kind==='approval').at(-1):i.messages.filter(m=>['request','rework','comment','answer'].includes(m.kind)||(m.kind==='system'&&m.text.includes('다시 열'))).at(-1);
  if(!source)return null;let hash=2166136261;for(const c of source.text)hash=Math.imul(hash^c.charCodeAt(0),16777619);
  return {id:i.id,number:i.number,phase,token:phase+'-'+source.at+'-'+(hash>>>0).toString(16),item:clone(i)};
 }
 function agentOutbox(){
  if(conflict||!persisted)return [];
  return data.items.flatMap(i=>{
   if(['new','queued'].includes(i.status)){const j=jobFor(i,'html');return j?[j]:[];}
   if(i.status==='done'&&Object.values(i.sync).some(s=>s.status==='pending')){const j=jobFor(i,'sync');return j?[j]:[];}
   return [];
  });
 }
 function agentHeartbeat(){const was=Date.now()-bridgeSeen<25000;bridgeSeen=Date.now();if(notice==='요청은 저장했습니다. 작업 연결이 되면 제가 받아 수정합니다.')notice='작업이 연결되었습니다. 요청을 전달하고 있습니다.';connection();if(!was&&open&&!data.draft)render();return {revision:data.revision,connected:true};}
 function agentUpdate(update){
  if(conflict||!persisted)throw Error('검수 기록 저장 충돌을 먼저 해결하세요.');
  const original=find(update.id);if(!original)throw Error('요청을 찾지 못했습니다.');const i=clone(original);
  if(!['html','sync'].includes(update.phase))throw Error('잘못된 작업 단계입니다.');
  const expected=jobFor(i,update.phase);if(!expected||update.token!==expected.token)throw Error('요청이 변경되었습니다. 이전 작업 결과를 덮어쓰지 않습니다.');
  if(update.state==='sent'&&i.agent?.token===update.token&&['sent','working','question','result','synced','error'].includes(i.agent.state))return {applied:true,duplicate:true};
  if(update.phase==='html'&&i.status==='needs_input'&&i.agent?.token===update.token){
   if(['sent','working','error'].includes(update.state))return {applied:true,duplicate:true};
   if(update.state==='result')throw Error('사용자 답변을 받은 뒤 작업 결과를 기록하세요.');
  }
  if(update.phase==='html'&&i.status==='ready'&&i.agent?.token===update.token&&['sent','working','error'].includes(update.state))return {applied:true,duplicate:true};
  if(update.phase==='html'&&['done','cancelled'].includes(i.status))throw Error('이미 종료한 요청입니다.');
  if(update.phase==='sync'&&i.status!=='done')throw Error('사용자가 화면 확인을 마치지 않았습니다.');
  const agent={phase:update.phase,token:update.token,state:String(update.state),at:time(),error:''};
  if(update.state==='sent'){
   if(update.phase==='html'&&i.status==='new')i.status='queued';
  }else if(update.state==='working'){
   if(update.phase==='html')i.status='working';
  }else if(update.state==='question'){
   if(update.phase!=='html'||typeof update.question!=='string'||!update.question.trim()||update.question.length>12000)throw Error('확인할 질문을 입력하세요.');
   if(i.status==='needs_input'&&i.agent?.token===update.token&&i.agent?.state==='question'&&i.messages.at(-1)?.text===update.question.trim())return {applied:true,duplicate:true};
   i.status='needs_input';append(i,'question',update.question.trim());
  }else if(update.state==='result'){
   if(update.phase!=='html'||typeof update.summary!=='string'||!update.summary.trim()||typeof update.evidence!=='string'||!update.evidence.trim()||update.summary.length+update.evidence.length>12000)throw Error('실제 수정 내용과 확인 근거가 필요합니다.');
   if(i.agent?.token===update.token&&i.agent?.state==='result')return {applied:true,duplicate:true};
   archiveAfter(i);if(Object.hasOwn(update,'policyChanges'))applyPolicy(i,update.policyChanges);if(update.after){if(!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(update.after)||update.after.length>900000)throw Error('수정 후 이미지 형식을 확인하세요.');i.after={image:update.after,at:time(),note:'작업자가 수정 후 화면을 기록했습니다.'};}
   reloadNeeded=Date.parse(update.changedAt||time())>pageLoadedAt;
   i.status='ready';append(i,'result',update.summary+'\n확인 근거: '+update.evidence);
  }else if(update.state==='synced'){
   if(update.phase!=='sync')throw Error('잘못된 문서 반영 단계입니다.');
   const changes={};for(const key of ['figma','policy']){const value=update[key];if(!value||!['done','na','pending'].includes(value.status)||typeof value.evidence!=='string'||value.evidence.length>12000||(value.status!=='pending'&&!value.evidence.trim()))throw Error('각 문서의 실제 반영 근거가 필요합니다.');changes[key]={status:value.status,evidence:value.evidence,at:time()};}
   i.sync=changes;append(i,'system','후속 문서 반영\n'+['figma','policy'].map(k=>(k==='figma'?'Figma':'정책')+': '+changes[k].status+' · '+changes[k].evidence).join('\n'));
  }else if(update.state==='error'){agent.error=String(update.error||'작업 연결을 확인하고 있습니다.').slice(0,1000);}
  else throw Error('잘못된 작업 결과 상태입니다.');
  i.agent=agent;data.items[data.items.indexOf(original)]=i;const stored=save();if(stored)notice='';expanded.add(i.id);if(open){filter=i.status==='done'?filter:'active';render();}return {applied:stored,status:stored?i.status:'storage_error'};
 }
 setInterval(connection,5000);
 render();
 return {exportData:()=>clone(data),validate,importFile,agentOutbox,agentHeartbeat,agentUpdate,agentReferences:()=>data.items.filter(i=>i.status!=='cancelled').flatMap(i=>(i.status==='done'?['sync']:['html']).map(p=>jobFor(i,p)).filter(Boolean).map(j=>({id:j.id,phase:j.phase,token:j.token}))),notify:say,refresh:render,open:()=>{open=true;render();}};
})();
