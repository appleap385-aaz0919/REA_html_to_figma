"""Build the preserved service preview as a classic offline script.
Run from the repository root; esbuild is a build-time tool only.
"""
from pathlib import Path
import re,json,hashlib,subprocess

ROOT=Path(__file__).resolve().parent
SOURCE=ROOT.parent/'cms-knowledge/master-cms/sources/omr-preview-assets'
DEST=ROOT/'vendor/omr-preview/source';DEST.mkdir(parents=True,exist_ok=True)
seen=set();records=[]
def copy(name):
    if name in seen:return
    seen.add(name)
    path=SOURCE/name;text=path.read_text(encoding='utf8');original=text
    dependencies=re.findall(r'(?:from|import)\s*["\x27]([^"\x27]+)',text)
    changes=[]
    if name=='CMo_b7JC.js':
        for old,new in [
          ('import{p as v}from"./CWT44DWd.js";','const v=()=>({query:{level:"high"}});'),
          ('import{t as te}from"./CzFqmaqM.js";','import{t as te}from"./offline-api.js";'),
          ('if(e.source===window)return!0;','if(e.source===window||location.protocol==="file:"&&e.source===window.parent)return!0;')]:
            assert old in text,old;text=text.replace(old,new)
        changes=['Router query replaced by the local high-school keypad setting.',
                 'Grade endpoint replaced by an explicit local adapter.',
                 'Allow the owning local parent to provide its click-time snapshot.']
    # The math OCR transport is unavailable offline. Preserve its own error UI.
    if name=='D0Ojt8zw.js':
        old='import{r as O,t as ee}from"./CzFqmaqM.js";'
        assert old in text;text=text.replace(old,'import{r as O,t as ee}from"./offline-api.js";')
        text=text.replace('/images/math-keypad/','vendor/omr-preview/images/math-keypad/')
        changes=['Math OCR transport reports an offline limitation through the original error UI.','Keypad SVG paths are local.']
    (DEST/name).write_text(text,encoding='utf8')
    records.append({'file':name,'source':str(path.relative_to(ROOT.parent)).replace('\\','/'),'sourceSha256':hashlib.sha256(original.encode()).hexdigest(),'adaptations':changes})
    for dep in dependencies:
        if dep.startswith('./'):copy(dep[2:])
copy('CMo_b7JC.js')
(DEST/'nuxt-shim.js').write_text('export const t=(component,props=[])=>{const target=component.__vccOpts||component;for(const [k,v]of props)target[k]=v;return target;};export const y=()=>{};',encoding='utf8')
(DEST/'offline-api.js').write_text('''
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
''',encoding='utf8')
(DEST/'entry.js').write_text('import Preview from "./CMo_b7JC.js";import {r as createApp} from "./Dn7CRAow.js";window.OmrPreviewApp=createApp(Preview);window.OmrPreviewApp.mount("#preview-root");',encoding='utf8')
command=['npx.cmd','--yes','esbuild@0.25.11',str(DEST/'entry.js'),'--bundle','--format=iife','--target=chrome110','--outfile='+str(ROOT/'vendor/omr-preview/runtime.js'),'--alias:#entry='+str(DEST/'nuxt-shim.js')]
subprocess.run(command,check=True)
(ROOT/'vendor/omr-preview/provenance.json').write_text(json.dumps({'date':'2026-11-17','files':records,'build':command,'scope':'Original service preview, OMR table, answer controls, math dialog, SVG links and dropdowns. No Nuxt app or backend required.'},ensure_ascii=False,indent=2),encoding='utf8')
