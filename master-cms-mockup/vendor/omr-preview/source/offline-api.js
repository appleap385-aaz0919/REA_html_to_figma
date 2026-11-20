
export const r=url=>url;
export async function t(url,options){
 if(url!='/api/omr-preview/check')throw {data:{data:{message:'오프라인 목업에서는 필기 인식 서버를 사용할 수 없습니다.'}}};
 return new Promise((resolve,reject)=>{
  const id=crypto.randomUUID();let timer;
  const receive=e=>{if(e.source!==parent||e.data?.source!=='donga-omr-preview'||e.data.type!=='grade-result'||e.data.id!==id)return;clearTimeout(timer);removeEventListener('message',receive);resolve(e.data.result);};
  addEventListener('message',receive);timer=setTimeout(()=>{removeEventListener('message',receive);reject(Error('Local grade response timed out'));},5000);
  parent.postMessage({source:'donga-omr-preview',type:'grade',id,value:options.body.value},'*');
 });
}
