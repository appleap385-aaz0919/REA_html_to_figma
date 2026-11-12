import hashlib,json,sys
from pathlib import Path
root=Path(__file__).resolve().parent
if sys.argv[1]=='emit':
 p=root/sys.argv[2];lines=p.read_text(encoding='utf-8').splitlines();print('\n'.join(lines[int(sys.argv[3]):int(sys.argv[4])]))
 sys.exit()
path=Path(sys.argv[1]);session=sys.argv[2]
body=path.read_text(encoding='utf-8');source='(/*SCRIPTER*/async function __scripter_script_main(){\n'+body+'\n})()/*SCRIPTER*/'
chunks=[source[i:i+12000]for i in range(0,len(source),12000)]
commands=[]
def send(expr,ident):
 commands.append({'op':'protocol','browser':True,'method':'Target.sendMessageToTarget','params':{'sessionId':session,'message':json.dumps({'id':ident,'method':'Runtime.evaluate','params':{'expression':expr,'returnByValue':True,'awaitPromise':True}},ensure_ascii=True)}})
send('window.__cmsRevisionTransfer=[];true',9000)
for i,c in enumerate(chunks):send('window.__cmsRevisionTransfer['+str(i)+']='+json.dumps(c,ensure_ascii=True)+';true',9001+i)
hash=hashlib.sha256(source.encode()).hexdigest()
send("(async()=>{try{const source=window.__cmsRevisionTransfer.join('');const b=new TextEncoder().encode(source);const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',b))].map(x=>x.toString(16).padStart(2,'0')).join('');if(hash!=="+json.dumps(hash)+")throw Error(hash);const m=monaco.editor.getModels().find(m=>String(m.uri).startsWith('file:///scripter.'));m.setValue(source);document.querySelector('textarea.inputarea').focus();window.top.postMessage({cmsUiProbe:'rev1121',data:{step:'comment-transfer',ready:true,hash}},'https://www.figma.com')}catch(e){window.top.postMessage({cmsUiProbe:'rev1121',data:{step:'comment-transfer',error:String(e)}},'https://www.figma.com')}})()",9900)
out=path.with_suffix('.jsonl');out.write_text('\n'.join(json.dumps(c,ensure_ascii=True)for c in commands)+'\n',encoding='utf-8')
print(json.dumps({'file':str(out),'commands':len(commands),'sourceBytes':len(source.encode()),'hash':hash}))
