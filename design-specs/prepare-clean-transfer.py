import hashlib,json,re,sys
from pathlib import Path
root=Path(__file__).resolve().parent
if len(sys.argv)>1:
 p=root/'revision-transfer.jsonl'
 if sys.argv[1]=='emit':sys.stdout.write(p.read_text(encoding='utf-8'))
 elif sys.argv[1]=='part':
  lines=p.read_text(encoding='utf-8').splitlines();sys.stdout.write('\n'.join(lines[int(sys.argv[2]):int(sys.argv[3])])+'\n')
 elif sys.argv[1]=='meta':print((root/'revision-transfer-meta.json').read_text(encoding='utf-8'))
 sys.exit()
code=(root/'revision-batches/batch-901.js').read_text(encoding='utf-8').replace('const BATCH=901;','const BATCH=1300;')
code=code.replace('figma.notify("CMS 스토리보드 배치 "+BATCH+" 완료",{timeout:60000});','')
d=json.loads((root/'revision-consolidated-plan.json').read_text(encoding='utf-8'))
for s in d['screens']:
 s.pop('assets',None)
 for n in s['notes']:n.pop('body',None)
 s.pop('modals',None);s.pop('variants',None)
final=(root/'revision-finalize.template.js').read_text(encoding='utf-8').replace('PLAN',json.dumps(d,ensure_ascii=False)).replace('CMS 스토리보드 배치 990 완료','CMS 스토리보드 배치 1300 완료')
source='(/*SCRIPTER*/async function __scripter_script_main(){\n'+code+'\n'+final+'\n})()/*SCRIPTER*/'
(root/'revision-complete-clean.js').write_text(source,encoding='utf-8')
sha=hashlib.sha256(source.encode('utf-8')).hexdigest();chunks=[source[i:i+5000]for i in range(0,len(source),5000)]
session='2731717F601A0A8DEFF614B295743690';commands=[]
def send(expr,ident):
 message={'id':ident,'method':'Runtime.evaluate','params':{'expression':expr,'returnByValue':True,'awaitPromise':True}}
 commands.append({'op':'protocol','browser':True,'method':'Target.sendMessageToTarget','params':{'sessionId':session,'message':json.dumps(message,ensure_ascii=True)}})
send('window.__cmsSourceParts=[];true',1000)
for i,chunk in enumerate(chunks):send('window.__cmsSourceParts['+str(i)+']='+json.dumps(chunk,ensure_ascii=True)+';true',1001+i)
last=r'''(async()=>{try{
 const missing=Array.from({length:COUNT},(_,i)=>i).filter(i=>typeof window.__cmsSourceParts[i]!=='string');
 if(missing.length){window.top.postMessage({cmsUiProbe:'rev1121',data:{step:'transfer',missing}},'https://www.figma.com');return;}
 const source=window.__cmsSourceParts.join('');const bytes=new TextEncoder().encode(source);
 const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(hash!==EXPECTED)throw Error('Source hash mismatch '+hash);
 const model=monaco.editor.getModels().find(m=>String(m.uri).startsWith('file:///scripter.'));model.setValue(source);document.querySelector('textarea.inputarea').focus();
 window.top.postMessage({cmsUiProbe:'rev1121',data:{step:'transfer',ready:true,bytes:bytes.length,hash}},'https://www.figma.com');
}catch(e){window.top.postMessage({cmsUiProbe:'rev1121',data:{step:'transfer',error:String(e)}},'https://www.figma.com')}})()'''
send(last.replace('COUNT',str(len(chunks))).replace('EXPECTED',json.dumps(sha)),2000)
text='\n'.join(json.dumps(c,ensure_ascii=True)for c in commands)+'\n';(root/'revision-transfer.jsonl').write_text(text,encoding='utf-8')
meta={'commands':len(commands),'characters':len(source),'utf8Bytes':len(source.encode('utf-8')),'hash':sha,'transferBytes':len(text),'chunks':len(chunks)}
(root/'revision-transfer-meta.json').write_text(json.dumps(meta),encoding='utf-8');print(json.dumps(meta))
