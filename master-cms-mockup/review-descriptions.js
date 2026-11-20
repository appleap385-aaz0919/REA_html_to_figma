/* Route-aware reader for exported Figma descriptions. Never mutates service/review data. */
window.CMSDescriptions=(()=>{
 'use strict';
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const CACHE='master-cms-figma-descriptions-v1';let data=window.CMSDescriptionData,selected='',currentKey='',lastHtml='';
 const clean=x=>String(x||'').replace(/\s+/g,' ').trim();
 function validate(v){
  if(!v||v.schema!=='master-cms-descriptions/1'||v.fileKey!=='xCjdhdFkSbToMiRVlXVN2V'||!/^[a-f0-9]{64}$/.test(v.revision)||!Number.isFinite(Date.parse(v.capturedAt))||!Array.isArray(v.screens)||v.screens.length!==30||!Array.isArray(v.modals)||v.modals.length!==52)throw Error('Description 동기화 파일을 확인해 주세요. 기존 설명을 유지합니다.');
  const ids=new Set();
  const text=(x,max)=>{if(typeof x!=='string'||x.length>max)throw Error('Description 문자열 형식을 확인해 주세요.');};
  function notes(ns){if(!Array.isArray(ns)||!ns.length||ns.length>100)throw Error('Description 번호를 확인해 주세요.');const seen=new Set(),keys=new Set();for(const n of ns){text(n.key,200);text(n.label,1000);text(n.body,30000);if(!Number.isInteger(n.number)||n.number<1||n.number>99||seen.has(n.number)||keys.has(n.key))throw Error('Description 번호나 연결 키가 중복되거나 올바르지 않습니다.');seen.add(n.number);keys.add(n.key);}}
  for(const s of [...v.screens,...v.modals]){text(s.id,200);if(ids.has(s.id))throw Error('Description 화면이 중복되었습니다.');ids.add(s.id);if(!/^\d+:\d+$/.test(s.frame))throw Error('Figma 화면 링크를 확인해 주세요.');text(s.title,1000);if(s.notes)notes(s.notes);else{if(!v.screens.some(x=>x.id===s.screen)||!Array.isArray(s.variants)||!s.variants.length||s.variants.length>30)throw Error('팝업 설명을 확인해 주세요.');text(s.body,30000);for(const variant of s.variants){text(variant.label,1000);notes(variant.notes);}}}
  return JSON.parse(JSON.stringify(v));
 }
 data=validate(data);
 try{const saved=validate(JSON.parse(localStorage.getItem(CACHE)));if(Date.parse(saved.capturedAt)>Date.parse(data.capturedAt))data=saved;}catch(e){}
 const q=(selector,root=document)=>{try{return [...root.querySelectorAll(selector)];}catch(e){return [];}};
 const visible=e=>e?.virtual?visible(e.element):!!e?.isConnected&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('[hidden]');
 const first=(selector,root)=>q(selector,root).find(visible);
 const action=(name,extra='')=>({selector:`[data-action="${name}"]${extra}`});
 const field=name=>({selector:`[name="${name}"],[data-bind="${name}"]`,closest:'.field,.paper-control,.kv'});
 const panel=title=>({panel:title});
 const css=selector=>({selector});
 const kv=title=>({kv:title});
 const nav={selector:'.page-actions,.item-navigation'};
 const list={selector:'.table-wrap'};
 const result={selector:'.table-toolbar'};
 const footer={selector:'.list-footer'};
 const search={selector:'.filter-form'};
 const anchors={
  REV_HOME_01:[css('.home-welcome'),css('#sidebar'),action('logout')],
  REV_ITM_01:[css('#sidebar a[href="#/items"]'),css('.tree-panel'),action('tree-collapse'),css('.search-line [name=q]'),field('difficulty'),field('category'),css('.date-filter'),css('.publish-filter'),css('.search-last'),result,list,footer],
  REV_ITM_02:[css('.item-identity'),css('.master-panel>.panel-body'),action('omr-preview'),action('item-edit'),action('item-twins'),action('twin-generate'),action('twin-history'),action('status-save'),css('.item-navigation'),action('item-sources'),action('item-papers'),action('item-deploy')],
  REV_ITM_03:[css('.tabs'),panel('기본 메타 정보'),panel('학습 · 매핑 정보'),action('mapping-add','[data-key=unitCodes]'),action('mapping-add','[data-key=achievement]'),action('mapping-add','[data-key=domain]'),action('mapping-add','[data-key=competency]'),action('mapping-add','[data-key=behavior]'),action('item-temp'),action('item-apply'),action('cancel-edit')],
  REV_ITM_04:[action('hml-open'),action('cancel-edit')],
  REV_ITM_05:[css('#native-html-editor'),css('.editor-type-header'),{text:'문단',selector:'button'}, {text:'수식',selector:'button'}, {text:'이미지',selector:'button'}, {text:'특수문자',selector:'button'}, {text:'글자 겹치기',selector:'button'}, {text:'글상자',selector:'button'}],
  REV_ITM_06:[css('.omr-editor-columns'),css('.editor-type-header'),css('#editor-omr'),{text:'추가',selector:'#editor-omr button'},css('#editor-omr .vt-cell'),action('omr-preview')],
  REV_ITM_07:[css('.tabs'),action('hml-slot','[data-slot=passage]'),{text:'저장',selector:'.modal-foot button'}],
  REV_LAB_01:[action('lab-build-info'),panel('테스트 · 확인'),action('lab-bundle'),action('lab-cache'),action('lab-session')],
  REV_LAB_02:[css('#lab-math-body'),css('.standalone-answer'),action('lab-convert'),action('lab-math-open')],
  REV_LAB_03:[action('gallery-open'),css('[data-gallery-width]'),css('.omr-gallery'),{text:'value_type 입력 형태 테스트',selector:'h3'}, {text:'value-type-dropdown 테스트',selector:'h3'}],
  REV_LAB_04:[css('[data-restore-type]'),css('#restore-json'),css('#restore-form'),action('restore-clear')],
  REV_LAB_05:[css('#isolation-json'),action('isolation-api'),css('.isolation-page>.tabs')],
  MST_HML_C01:[search,result,css('.list-add')],
  MST_HML_C02:[css('.upload-zone'),panel('메타정보 입력'),css('[data-form=document-submit] button[type=submit]'),action('registration-source'),action('registration-unit'),action('cancel-edit')],
  MST_HML_C03:[panel('분리 문항 리스트'),panel('기본 정보'),action('doc-approve'),action('doc-discard')],
  MST_HML_C04:[css('.heading'),panel('기본 정보'),action('item-edit'),css('.heading')],
  MST_DIFI_C01:[search,result,css('.list-add')],
  MST_DIFI_C02:[css('.upload-zone'),css('.upload-zone'),panel('메타정보 입력'),action('registration-source'),action('registration-unit'),action('cancel-edit'),css('[data-form=document-submit] button[type=submit]')],
  MST_DIFI_C03:[panel('기본 정보'),action('doc-approve'),panel('분리 문항 리스트'),action('doc-discard')],
  MST_DIFI_C04:[panel('기본 정보'),panel('분리 문항 리스트'),css('.review-child'),action('item-edit'),action('download-doc')],
  MST_TWN_C01:[list,footer],MST_TWN_C02:[panel('그룹 정보'),css('.question-cell a')],
  REV_PAP_LIST:[field('q'),field('curriculum'),css('.search-second'),css('.filter-form button[type=submit]'),result,list,css('.question-cell a'),footer],
  REV_PAP_DETAIL:[kv('평가지명'),kv('상태'),kv('단원 코드'),kv('등록'),kv('시험지'),panel('배포'),action('paper-deploy'),css('.paper-items'),css('.page-actions a[href="#/papers"]'),css('.page-actions a[href$="/edit"]')],
  REV_PAP_EDIT:[field('name'),field('status'),field('start'),field('usage'),kv('문항 수'),css('.paper-items'),css('.handle'),action('paper-add'),action('paper-remove'),action('cancel-edit'),action('paper-save')],
  REV_SRC_LIST:[field('q'),field('curriculum'),css('.search-second'),css('.filter-form button[type=submit]'),result,list,footer,css('.list-add')],
  REV_SRC_FORM:[field('curriculum'),field('school'),field('subjectGroup'),field('book'),field('year'),css('.source-codes'),field('display'),field('usage'),field('status'),field('remark'),css('[data-form=source-save] button[type=submit]'),action('cancel-edit')],
  REV_SRC_DETAIL:[css('.source-classification'),css('.source-codes'),field('display'),field('status'),panel('비고'),css('.source-system'),field('mapped'),css('.page-actions a[href="#/sources"]'),css('.page-actions a[href$="/edit"]')],
  REV_SRC_EDIT:[css('.source-classification'),css('.source-codes'),field('display'),field('usage'),field('status'),field('remark'),css('.source-system'),css('[data-form=source-save] button[type=submit]'),action('cancel-edit')]
 };
 // Stable Figma note keys keep anchors correct when description rows are reordered.
 const anchorKeys={"REV_HOME_01":{"01":0,"02":1,"03":2},"REV_ITM_01":{"1":0,"2":1,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11},"REV_ITM_02":{"01":0,"02":1,"03":2,"06":3,"T01":4,"T02":5,"T05":6,"REV_ITM_STATUS_SAVE":7,"REV_ITM_STATUS_LEAVE":8,"REV_ITM_PRODUCT":9,"REV_ITM_PAPERS":10,"REV_ITM_DEPLOY":11},"REV_ITM_03":{"01":0,"02":1,"03":2,"REV_ITM_UNIT":3,"REV_ITM_ACHIEVEMENT":4,"REV_ITM_DOMAIN":5,"REV_ITM_COMPETENCY":6,"REV_ITM_BEHAVIOR":7,"REV_ITM_TEMP":8,"REV_ITM_APPLY":9,"REV_ITM_CANCEL":10},"REV_ITM_04":{"01":0,"02":1},"REV_ITM_05":{"01":0,"02":1,"REV_ITM_HTML_PARAGRAPH":2,"REV_ITM_HTML_MATH":3,"REV_ITM_HTML_IMAGE_URL":4,"REV_ITM_HTML_SYMBOL":5,"REV_ITM_HTML_OVERLAP":6,"REV_ITM_HTML_TEXTBOX":7},"REV_ITM_06":{"01":0,"02":1,"03":2,"04":3,"05":4,"06":5},"REV_ITM_07":{"01":0,"02":1,"03":2},"REV_LAB_01":{"01":0,"02":1,"REV_LAB_BUNDLE":2,"REV_LAB_CACHE":3,"REV_LAB_SESSION":4},"REV_LAB_02":{"01":0,"02":1,"03":2,"04":3},"REV_LAB_03":{"01":0,"02":1,"03":2,"04":3,"05":4},"REV_LAB_04":{"01":0,"02":1,"03":2,"04":3},"REV_LAB_05":{"01":0,"02":1,"03":2},"MST_HML_C01":{"01":0,"02":1,"03":2},"MST_HML_C02":{"01":0,"02":1,"03":2,"04":3,"05":4,"06":5},"MST_HML_C03":{"01":0,"02":1,"03":2,"04":3},"MST_HML_C04":{"01":0,"02":1,"03":2,"04":3},"MST_DIFI_C01":{"01":0,"02":1,"03":2},"MST_DIFI_C02":{"01":0,"02":1,"03":2,"04":3,"05":4,"06":5,"07":6},"MST_DIFI_C03":{"01":0,"02":1,"03":2,"04":3},"MST_DIFI_C04":{"01":0,"02":1,"03":2,"04":3,"05":4},"MST_TWN_C01":{"01":0,"02":1},"MST_TWN_C02":{"01":0,"02":1},"REV_PAP_LIST":{"PAP_L01":0,"PAP_L02":1,"PAP_L03":2,"PAP_L04":3,"PAP_L05":4,"PAP_L06":5,"PAP_L07":6,"PAP_L08":7},"REV_PAP_DETAIL":{"PAP_D01":0,"PAP_D02":1,"PAP_D03":2,"PAP_D04":3,"PAP_D05":4,"PAP_D06":5,"PAP_D07":6,"PAP_D08":7,"PAP_D09":8,"PAP_D10":9},"REV_PAP_EDIT":{"PAP_E01":0,"PAP_E02":1,"PAP_E03":2,"PAP_E04":3,"PAP_E05":4,"PAP_E06":5,"PAP_E07":6,"PAP_E08":7,"PAP_E09":8,"PAP_E10":9,"PAP_E11":10},"REV_SRC_LIST":{"SRC_L01":0,"SRC_L02":1,"SRC_L03":2,"SRC_L04":3,"SRC_L05":4,"SRC_L06":5,"SRC_L07":6,"SRC_L08":7},"REV_SRC_FORM":{"SRC_F01":0,"SRC_F02":1,"SRC_F03":2,"SRC_F04":3,"SRC_F05":4,"SRC_F06":5,"SRC_F07":6,"SRC_F08":7,"SRC_F09":8,"SRC_F10":9,"SRC_F11":10,"SRC_F12":11},"REV_SRC_DETAIL":{"SRC_D01":0,"SRC_D02":1,"SRC_D03":2,"SRC_D04":3,"SRC_D05":4,"SRC_D06":5,"SRC_D07":6,"SRC_D09":7,"SRC_D10":8},"REV_SRC_EDIT":{"SRC_E01":0,"SRC_E02":1,"SRC_E03":2,"SRC_E04":3,"SRC_E05":4,"SRC_E06":5,"SRC_E07":6,"SRC_E08":7,"SRC_E09":8}};
 function baseScreen(){
  const route=CMS.current||location.hash.slice(1)||'/home',p=route.split('/').filter(Boolean),[key,id,mode,tab]=p;
  if(document.querySelector('main h1')?.textContent==='화면 안내')return '';
  if(key==='items')return !id?'REV_ITM_01':mode==='edit'?({meta:'REV_ITM_03',hml:'REV_ITM_04',html:'REV_ITM_05',omr:'REV_ITM_06'}[tab||'meta']||''):'REV_ITM_02';
  if(key==='hml'||key==='definition')return (key==='hml'?'MST_HML_C':'MST_DIFI_C')+(!id?'01':id==='new'?'02':CMS.doc(id)?.status==='R'?'03':'04');
  if(key==='papers')return !id?'REV_PAP_LIST':mode==='edit'?'REV_PAP_EDIT':'REV_PAP_DETAIL';
  if(key==='sources')return !id?'REV_SRC_LIST':id==='new'?'REV_SRC_FORM':mode==='edit'?'REV_SRC_EDIT':'REV_SRC_DETAIL';
  if(key==='twins')return !id?'MST_TWN_C01':'MST_TWN_C02';
  if(key==='lab')return ({'':'REV_LAB_01',math:'REV_LAB_02',omr:'REV_LAB_03',restore:'REV_LAB_04',isolation:'REV_LAB_05'})[id||'']||'';
  return key==='home'?'REV_HOME_01':'';
 }
 const modalAliases={'저장':'상태 정보 저장','단원코드 추가':'단원코드 추가 (검색)'};
 function context(){
  let id=baseScreen(),screen=data.screens.find(s=>s.id===id),root=document.querySelector('main');
  const popover=q('.qe-popover').filter(visible).at(-1),dialog=popover||[...document.querySelectorAll('#modal-root .modal')].at(-1);
  if(!dialog)return {key:id,screen,root,notes:screen?.notes||[],title:screen?.title||document.querySelector('main h1')?.textContent||'현재 화면'};
  const title=clean(dialog.getAttribute('aria-label')||dialog.querySelector('.qe-dialog__header strong')?.textContent||dialog.innerText.split('\n')[0]),alias=title==='등록 취소'?(id.startsWith('MST_DIFI')?'ZIP 등록 취소':'HML 등록 취소'):modalAliases[title]||title;
  if(title.startsWith('별도 한글(HML) 편집기')){screen=data.screens.find(s=>s.id==='REV_ITM_07');return {key:screen.id,screen,root:dialog,notes:screen.notes,title:screen.title};}
  let candidates=data.modals.filter(m=>m.screen===id&&(clean(m.title)===alias||clean(m.title)===title));
  if(!candidates.length&&title==='OMR 미리보기')candidates=data.modals.filter(m=>m.title===title&&m.screen===(id==='REV_ITM_06'?id:'REV_ITM_02'));
  if(!candidates.length&&title==='이동')candidates=data.modals.filter(m=>m.id==='REV_ITM_STATUS_LEAVE');
  if(!candidates.length&&/상태 정보|저장 확인|폐기 확인/.test(title)&&id==='REV_ITM_02')candidates=data.modals.filter(m=>m.id==='REV_ITM_STATUS_SAVE');
  const m=candidates[0];if(!m)return {key:id+'|unknown|'+title,screen:null,root:dialog,notes:[],title,unknown:true};
  const tab=clean(dialog.querySelector('.tabs .active,.qe-tab--active,[role=tab][aria-selected=true]')?.textContent),body=clean(dialog.textContent);
  let vi=0;if(tab){const i=m.variants.findIndex(v=>v.label.includes(tab));if(i>=0)vi=i;}
  if(m.id.startsWith('TWN_C03_')){const item=CMS.item((CMS.current||'').split('/')[2]),set=!!item?.passageId;
   const wanted=m.id==='TWN_C03_HISTORY'?(set?'세트 생성 이력':'단건 생성 이력'):m.id==='TWN_C03_CURRENT_ADD'?(tab==='쌍둥이 추가'?'쌍둥이 추가':set?'세트 · 현재 쌍둥이':'단건 · 현재 쌍둥이'):(set?'세트 · 복제 선택':dialog.querySelector('[name=generate]:checked')?.value==='AI'?'단건 · AI 생성 선택':'단건 · 복제 선택');
   const i=m.variants.findIndex(v=>v.label===wanted);if(i>=0)vi=i;
  }
  if(m.id==='REV_ITM_STATUS_SAVE'){const item=CMS.item((CMS.current||'').split('/')[2]),set=!!item?.passageId,discard=body.includes('폐기');const wanted=set?(discard?'세트 전체 폐기':'세트 상태 저장'):(discard?'단건 폐기':'단건 저장');const i=m.variants.findIndex(v=>v.label===wanted);if(i>=0)vi=i;}
  return {key:id+'|'+m.id+'|'+vi,screen:m,root:dialog,notes:m.variants[vi]?.notes||[],title:m.title,variant:m.variants.length>1?m.variants[vi].label:'',policy:m.body};
 }
 const frameGeometry=new WeakMap();
 function probeFrame(frame){if(!frame)return;let state=frameGeometry.get(frame);if(!state){state={token:crypto.randomUUID(),rects:{},at:0};frameGeometry.set(frame,state);}if(Date.now()-state.at<100)return;state.at=Date.now();frame.contentWindow?.postMessage({source:'cms-description-probe',token:state.token},'*');}
 function frameTarget(note,c){
  const frame=c.root.querySelector('iframe.native-omr-preview-frame');if(!frame)return null;
  const name=/정답 보기/.test(note.label)?'answer':/답란/.test(note.label)?'response':/채점/.test(note.label)?'grade':'';
  const box=frameGeometry.get(frame)?.rects[name];if(!box)return null;
  return {virtual:true,element:frame,getBoundingClientRect(){const r=frame.getBoundingClientRect();return {x:r.x+box.x,y:r.y+box.y,left:r.x+box.x,top:r.y+box.y,right:r.x+box.x+box.w,bottom:r.y+box.y+box.h,width:box.w,height:box.h};},scrollIntoView(){frame.scrollIntoView({block:'center'});}};
 }
 window.addEventListener('message',e=>{
  const frame=q('iframe.native-omr-preview-frame').find(f=>f.contentWindow===e.source);if(!frame)return;
  const state=frameGeometry.get(frame);if(!state)return;
  if(e.data?.source==='donga-omr-preview'&&e.data.type==='rendered'){state.at=0;probeFrame(frame);return;}
  if(e.data?.source!=='cms-description-geometry'||e.data.token!==state.token)return;
  const rects={};for(const k of ['answer','response','grade']){const r=e.data.rects?.[k];if(r&&['x','y','w','h'].every(n=>Number.isFinite(r[n])&&Math.abs(r[n])<100000)&&r.w>0&&r.h>0)rects[k]=r;}
  if(JSON.stringify(rects)!==JSON.stringify(state.rects)){state.rects=rects;lastHtml='';window.dispatchEvent(new Event('cms-description-focus'));}
 });
 function target(note,c){
  const map=anchors[c.screen?.id];if(map){const a=map[anchorKeys[c.screen.id]?.[note.key]];if(!a)return null;
   let e;if(a.panel)e=q('.panel',c.root).find(x=>clean(x.querySelector(':scope>.panel-head h2')?.textContent).startsWith(a.panel));
   else if(a.kv)e=q('.kv',c.root).find(x=>clean(x.querySelector('strong')?.textContent)===a.kv);
   else{const scope=a.selector.startsWith('#sidebar')||a.selector.includes('logout')?document:c.root;e=q(a.selector,scope).filter(visible).find(x=>!a.text||clean(x.textContent).includes(a.text));}
   return e?.closest(a.closest||'__no_such_element__')||e||null;
  }
  const framed=frameTarget(note,c);if(framed)return framed;
  const label=note.label;
  if(label==='Close')return first('.modal-close',c.root);
  if(/검색 조건/.test(label))return first('form',c.root);
  if(/결과 목록|검색 결과|평가지 목록/.test(label))return first('.table-wrap,[data-picker-results],[data-add-results]',c.root);
  if(/확인 내용|확인·|조건 안내|이동 확인/.test(label))return first('.modal-body>p,.modal-body>.notice,.modal-body',c.root);
  if(/현재 출처 \/ 출처 추가/.test(label))return first('.tabs',c.root);
  if(label==='페이지')return first('input[name=start]',c.root)?.closest('.inline');
  if(/수식 입력/.test(label))return first('math-field,.qe-dialog__source,#math-input',c.root);
  if(/자주 쓰는 패턴/.test(label))return first('.qe-snippets',c.root);
  if(/^행[1-9]/.test(label))return first('[name=rows]',c.root);
  if(/^열[1-9]/.test(label))return first('[name=cols]',c.root);
  if(/문단 수치/.test(label))return first('.qe-popover__body,.qe-paragraphpanel',c.root)||first('input',c.root)?.parentElement;
  if(/특수문자 선택 영역/.test(label))return first('.qe-symbols,.qe-symbol-grid,.palette',c.root)||c.root;
  if(/번들 버전/.test(label))return first('table',c.root);
  const fieldNames={'교육과정':'curriculum','학교급':'school','과목군':'subjectGroup','과목':'subject','학년':'grade','학기':'semester','용도':'usage','난이도':'difficulty'};
  const fieldName=Object.entries(fieldNames).find(([title])=>label.startsWith(title))?.[1];
  if(fieldName){const el=first(`[name="${fieldName}"]`,c.root);if(el)return el.closest('.field')||el;}
  if(/단원 코드 단원명|출처코드 출처명/.test(label))return first('[name=criterion]',c.root);
  if(/단원 코드 \/ 단원명|출처코드 \/ 출처명|검색 기준·검색어|코드 · 표준코드 검색/.test(label))return first('[name=q]',c.root);
  if(/배포 대상/.test(label))return first('[name=deployTarget]',c.root)?.closest('label')||first('table',c.root);
  if(/정답 보기/.test(label))return first('[data-preview-answer],.answer-toggle',c.root)||q('label,button',c.root).find(e=>visible(e)&&clean(e.textContent)==='정답 보기');
  if(/답란/.test(label))return first('.source-omr-response,.omr-response,[data-preview-response],input:not([type=checkbox]),textarea',c.root);
  if(/닫기|닫기·X/.test(label))return first(note.number===1?'.modal-close':'.modal-foot button',c.root)||first('.modal-close',c.root);
  const exact=q('button,a,label,summary,[role=tab],[aria-label]',c.root).filter(visible).find(e=>clean(e.textContent)===label||clean(e.getAttribute('aria-label'))===label);
  if(exact)return exact;
  return q('button,label,.field>label,th',c.root).filter(visible).find(e=>clean(e.textContent).includes(label))?.closest('.field,label,th,button')||null;
 }
 function link(screen){return 'https://www.figma.com/design/'+data.fileKey+'/?node-id='+screen.frame.replace(':','-');}
 function panelHtml(c=context()){
  const stamp=new Date(data.capturedAt).toLocaleString('ko-KR',{hour12:false});
  return `<section class="rv-description-view" aria-label="현재 화면의 Figma Description" data-description-context="${esc(c.key)}"><div class="rv-description-heading"><h3>${esc(c.title)}</h3>${c.variant?`<p>${esc(c.variant)}</p>`:''}${c.screen?`<a href="${link(c.screen)}" target="_blank" rel="noopener noreferrer">Figma에서 보기</a>`:''}<p class="rv-description-updated">설명 동기화 · ${esc(stamp)}</p></div>${c.notes.length?`<p class="rv-help">번호를 누르면 해당 위치를 확인할 수 있습니다.</p>${c.policy?`<details class="rv-description-policy" open><summary>동작·정책·예외</summary><p>${esc(c.policy)}</p></details>`:''}<ol class="rv-description-list">${c.notes.map(n=>`<li data-description-key="${esc(n.key)}" class="${selected===c.key+'|'+n.key?'rv-description-selected':''}"><h4><button type="button" data-rv="description-focus" data-description="${esc(n.key)}" aria-label="${String(n.number).padStart(2,'0')}번 ${esc(n.label)} 위치 보기"><span>${String(n.number).padStart(2,'0')}</span>${esc(n.label)}</button></h4><p>${esc(n.body)}</p><small data-description-location>${visible(target(n,c))?'':'현재 화면 조건에서는 해당 요소가 표시되지 않습니다.'}</small></li>`).join('')}</ol>`:`<div class="rv-empty"><strong>등록된 Figma 설명이 없습니다.</strong>${c.unknown?'현재 팝업의 설명은 아직 등록되지 않았습니다. 팝업을 닫으면 기본 화면 설명으로 돌아갑니다.':'설명이 등록된 CMS 화면으로 이동하면 표시됩니다.'}</div>`}</section>`;
 }
 function syncPanel(c){
  const host=document.querySelector('.rv-description-view');if(!host)return;
  const html=panelHtml(c),changed=host.dataset.descriptionContext!==c.key;
  if(html===lastHtml&&!changed)return;
  const scroll=document.querySelector('.rv-scroll'),before=scroll?.scrollTop||0,active=document.activeElement,key=active?.dataset.description;
  host.outerHTML=html;lastHtml=html;if(scroll)scroll.scrollTop=changed?0:before;
  if(key&&active&&!active.isConnected)q('[data-rv=description-focus]').find(e=>e.dataset.description===key)?.focus({preventScroll:true});
 }
 function paint(layer,hidden=false){
  const c=context();probeFrame(c.root?.querySelector('iframe.native-omr-preview-frame'));if(c.key!==currentKey){currentKey=c.key;selected='';}syncPanel(c);
  if(hidden)return;
  const bounds=layer.getBoundingClientRect(),occupied=[];
  for(const n of c.notes){const el=target(n,c);if(!visible(el))continue;const r=el.getBoundingClientRect();if(r.bottom<2||r.top>innerHeight-2||r.right<0||r.left>=bounds.right)continue;
   const top=c.root===document.querySelector('main')&&!el.closest?.('.topbar')?(document.querySelector('.topbar')?.getBoundingClientRect().bottom||0)+4:2;
   let x=Math.max(2,Math.min(r.left-29,bounds.right-29)),y=Math.max(top,Math.min(r.top-10,innerHeight-29));
   for(let i=0;i<20&&occupied.some(p=>Math.abs(p.x-x)<29&&Math.abs(p.y-y)<28);i++)y+=29;
   occupied.push({x,y});const b=document.createElement('button');b.type='button';b.className='rv-description-marker';b.dataset.rv='description-focus';b.dataset.description=n.key;b.textContent=String(n.number).padStart(2,'0');b.setAttribute('aria-label',`${b.textContent}번 ${n.label} 설명 보기`);b.title=n.label;Object.assign(b.style,{left:x+'px',top:y+'px'});if(selected===c.key+'|'+n.key)b.classList.add('selected');layer.append(b);
   if(selected===c.key+'|'+n.key){const box=document.createElement('div');box.className='rv-description-outline';Object.assign(box.style,{left:r.x+'px',top:r.y+'px',width:r.width+'px',height:r.height+'px'});layer.prepend(box);}
  }
 }
 function focus(key,fromMarker=false){const c=context(),n=c.notes.find(n=>n.key===key);if(!n)return;selected=c.key+'|'+key;const el=target(n,c);if(visible(el)&&!fromMarker)el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});lastHtml='';syncPanel(c);const row=q('[data-description-key]').find(e=>e.dataset.descriptionKey===key);row?.scrollIntoView({block:'start'});if(fromMarker)row?.querySelector('button')?.focus({preventScroll:true});window.dispatchEvent(new Event('cms-description-focus'));}
 function receive(value){const fresh=validate(value);if(fresh.revision===data.revision||Date.parse(fresh.capturedAt)<Date.parse(data.capturedAt))return false;data=fresh;lastHtml='';try{localStorage.setItem(CACHE,JSON.stringify(data));}catch(e){}window.dispatchEvent(new Event('cms-descriptions-updated'));return true;}
 // Reading the review panel should not dismiss a vendor editor's open popover.
 for(const event of ['pointerdown','mousedown'])window.addEventListener(event,e=>{if(e.target.closest('#review-ui')&&q('.qe-popover').some(visible))e.stopPropagation();},true);
 return {panel:panelHtml,paint,focus,receive,context,revision:()=>data.revision,validate};
})();
