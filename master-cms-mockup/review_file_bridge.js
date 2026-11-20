/* File System Access bridge for an ordinary Chrome/Edge file:// window. No server. */
window.CMSReviewFiles=(()=>{
 'use strict';
 const EPOCH='review-reset-20261119-1',PROJECT='master-cms-demo21-review',DB='cms-review-directory';
 let directory=null,busy=false,connected=false,client=sessionStorage.getItem('cms-review-client');
 if(!client){client=crypto.randomUUID();sessionStorage.setItem('cms-review-client',client);}
 function database(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore('handles');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
 async function handleStore(value){const db=await database();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('handles',value?'readwrite':'readonly'),store=tx.objectStore('handles'),r=value?store.put(value,'directory'):store.get('directory');let result;r.onsuccess=()=>{result=r.result;};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);});}finally{db.close();}}
 const retryable=e=>['NotReadableError','InvalidStateError','NoModificationAllowedError'].includes(e.name);
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function read(dir,name){
  for(let attempt=0;;attempt++){
   try{const handle=await dir.getFileHandle(name),file=await handle.getFile();return JSON.parse(await file.text());}
   catch(e){if(!retryable(e)||attempt===3)throw e;await pause(40*(attempt+1));}
  }
 }
 async function write(dir,name,value){const h=await dir.getFileHandle(name,{create:true}),w=await h.createWritable();try{await w.write(JSON.stringify(value));await w.close();}catch(e){await w.abort().catch(()=>{});throw e;}}
 async function claim(root){
  const identity=await read(root,'runtime-project.json');
  if(identity.project!==PROJECT||identity.epoch!==EPOCH)throw Error('검수 연결.cmd를 실행한 뒤 이 프로젝트의 review-work 폴더를 선택하세요.');
  const dir=await root.getDirectoryHandle('runtime-browser',{create:true});
  await write(dir,'session.json',{project:PROJECT,epoch:EPOCH,client});directory=dir;connected=true;
 }
 async function connect(){
  if(!window.showDirectoryPicker){CMSReview.notify('자동 연결은 Chrome 또는 Edge에서 지원합니다.');return;}
  try{
   // Permission is requested only inside this user click, never by a timer.
   const root=await window.showDirectoryPicker({id:'cms-review-work',mode:'readwrite'});
   await claim(root);await handleStore(root);await tick();
  }catch(e){if(e.name!=='AbortError')CMSReview.notify('연결하지 못했습니다: '+e.message);}
 }
 async function tick(){
  if(!directory||!connected||busy)return;busy=true;
  try{
   const owner=await read(directory,'session.json');
   if(owner.client!==client||owner.epoch!==EPOCH){connected=false;CMSReview.notify('다른 창이 작업 폴더에 연결되었습니다. 이 창에서 계속하려면 작업 폴더를 다시 연결하세요.');CMSReview.refresh();return;}
   const heartbeat=await read(directory,'heartbeat.json');
   if(heartbeat.epoch!==EPOCH)throw Error('검수 연결 프로그램을 다시 실행하세요.');
   const live=Date.now()-Date.parse(heartbeat.at)<25000;
   if(live)CMSReview.agentHeartbeat();
   // Read-only descriptions are updated independently of request/approval state.
   try{const descriptions=await read(directory,'descriptions.json');window.CMSDescriptions?.receive(descriptions);}catch(e){if(e.name!=='NotFoundError'&&!retryable(e))CMSReview.notify('Description을 갱신하지 못했습니다. 기존 설명을 유지합니다.');}
   let inbox;try{inbox=await read(directory,'inbox.json');}catch(e){if(e.name!=='NotFoundError')throw e;}
   const ack=[];
   if(inbox?.client===client&&inbox.epoch===EPOCH){
    for(const entry of inbox.updates||[]){
     try{const result=CMSReview.agentUpdate(entry.value);if(result.applied)ack.push({key:entry.key,status:'applied'});}
     catch(e){if(!CMSReview.agentReferences().some(r=>r.id===entry.value.id&&r.phase===entry.value.phase&&r.token===entry.value.token))ack.push({key:entry.key,status:'obsolete'});else CMSReview.notify(e.message);}
    }
   }
   await write(directory,'outbox.json',{project:PROJECT,epoch:EPOCH,client,at:new Date().toISOString(),ack,references:CMSReview.agentReferences(),jobs:CMSReview.agentOutbox()});
   if(!live)CMSReview.notify('검수 연결.cmd를 실행하면 저장된 요청을 대화로 전달합니다.');
  }catch(e){
   if(!retryable(e))CMSReview.notify(e.name==='NotAllowedError'?'작업 폴더 접근 권한이 없습니다. 작업 폴더를 다시 연결해 주세요.':'작업 폴더 연결을 확인하고 있습니다. 문제가 계속되면 작업 폴더를 다시 연결해 주세요.');
   // A replaced file snapshot is retried on the next tick; it is not a lost request or revoked permission.
  }
  finally{busy=false;}
 }
 async function resume(){
  try{const root=await handleStore();if(root&&await root.queryPermission({mode:'readwrite'})==='granted'){const dir=await root.getDirectoryHandle('runtime-browser');const owner=await read(dir,'session.json');if(owner.client===client&&owner.epoch===EPOCH){directory=dir;connected=true;await tick();}}}
  catch(e){/* A new browser permission must be granted through the connect button. */}
 }
 setInterval(tick,2000);resume();
 return {connect};
})();
