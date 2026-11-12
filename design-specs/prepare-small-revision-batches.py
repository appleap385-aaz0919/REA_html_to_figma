import json
from pathlib import Path
root=Path(__file__).resolve().parent
code=(root/'revision-batches/batch-901.js').read_text(encoding='utf-8')
payload=code.split('const INPUT=',1)[1].split(';\nconst R=',1)[0];items=json.loads(payload)
assets={k:v for s in items for k,v in s['assets'].items()}
for s in items:s['assets']={}
groups=[];g={};size=0
for k,v in assets.items():
 if g and size+len(v)>180000:groups.append(g);g={};size=0
 g[k]=v;size+=len(v)
if g:groups.append(g)
out=root/'revision-small-batches';out.mkdir(exist_ok=True)
runtime='''
function decode(s){const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",out=[];let val=0,bits=0;for(const c of s){const v=chars.indexOf(c);if(v<0)continue;val=(val<<6)|v;bits+=6;if(bits>=8){bits-=8;out.push((val>>bits)&255);}}return new Uint8Array(out);}
const cache=JSON.parse(figma.root.getPluginData("cmsRevisionImages")||"{}");
for(const [key,value]of Object.entries(ASSETS)){if(!cache[key])cache[key]=figma.createImage(decode(value)).hash;}
figma.root.setPluginData("cmsRevisionImages",JSON.stringify(cache));
figma.notify("CMS 스토리보드 배치 "+BATCH+" 완료",{timeout:60000});
'''
for i,g in enumerate(groups):
 (out/f'assets-{920+i}.js').write_text('const BATCH='+str(920+i)+';\nconst ASSETS='+json.dumps(g)+';\n'+runtime,encoding='utf-8')
(out/'render-940.js').write_text('const BATCH=940;\nconst INPUT='+json.dumps(items,ensure_ascii=False)+';\n'+(root/'revision-runtime.js').read_text(encoding='utf-8'),encoding='utf-8')
print('Asset batches',len(groups),'render bytes',(out/'render-940.js').stat().st_size)
